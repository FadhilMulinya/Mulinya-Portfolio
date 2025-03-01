import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  HStack,
  Tag,
  VStack,
  Divider,
  UnorderedList,
  OrderedList,
  ListItem,
  Link,
  SimpleGrid,
  Card,
  CardBody,
  Icon,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import CodeBlock from '../components/blog/CodeBlock';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { getBlogPostBySlug } from '../content/blog';
import { FaBook, FaExternalLinkAlt } from 'react-icons/fa';

interface ContentSectionProps {
  section: {
    type: string;
    content?: string;
    items?: Array<string | { text: string; url: string }>;
    title?: string;
    language?: string;
    filename?: string;
  };
  blogPostSlug?: string;
  blogPostTitle?: string;
}

const ContentSection = ({ section, blogPostSlug, blogPostTitle }: ContentSectionProps) => {
  switch (section.type) {
    case 'heading':
      return (
        <Heading as="h2" size="lg" mt={8} mb={4}>
          {section.content}
        </Heading>
      );
    case 'subheading':
      return (
        <Heading as="h3" size="md" mt={6} mb={3}>
          {section.content}
        </Heading>
      );
    case 'text':
      return (
        <Text mb={4} lineHeight="tall">
          {section.content}
        </Text>
      );
    case 'code':
      return (
        <CodeBlock
          code={section.content || ''}
          language={section.language || 'text'}
          filename={section.filename}
          blogPostSlug={blogPostSlug}
          blogPostTitle={blogPostTitle}
        />
      );
    case 'list':
      return (
        <UnorderedList mb={4} pl={4} spacing={2}>
          {section.items?.map((item, index) => (
            <ListItem key={index}>
              {typeof item === 'string' ? item : item.text}
            </ListItem>
          ))}
        </UnorderedList>
      );
    case 'steps':
      return (
        <OrderedList mb={4} pl={4} spacing={2}>
          {section.items?.map((item, index) => (
            <ListItem key={index}>
              {typeof item === 'string' ? item : item.text}
            </ListItem>
          ))}
        </OrderedList>
      );
    case 'links':
      return (
        <Box mb={4}>
          {section.title && (
            <Heading as="h3" size="md" mb={3}>
              {section.title}
            </Heading>
          )}
          <VStack align="flex-start" spacing={2}>
            {section.items?.map((item: any, index) => (
              <Link
                key={index}
                href={item.url}
                isExternal
                color="blue.500"
                display="inline-flex"
                alignItems="center"
              >
                {item.text} <ExternalLinkIcon mx="2px" />
              </Link>
            ))}
          </VStack>
        </Box>
      );
    default:
      return null;
  }
};

const ExternalDocsSection = ({ docs }: { docs: Array<{ title: string; url: string; description?: string }> }) => {
  return (
    <Box mb={8}>
      <Heading as="h2" size="lg" mb={4}>
        <HStack>
          <Icon as={FaBook} />
          <Text>External Documentation</Text>
        </HStack>
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {docs.map((doc, index) => (
          <Card key={index} variant="outline" _hover={{ shadow: 'md' }}>
            <CardBody>
              <VStack align="start" spacing={2}>
                <Link
                  href={doc.url}
                  isExternal
                  fontSize="lg"
                  fontWeight="bold"
                  color="brand.600"
                  display="flex"
                  alignItems="center"
                >
                  {doc.title} <Icon as={FaExternalLinkAlt} ml={2} boxSize={3} />
                </Link>
                {doc.description && (
                  <Text color="gray.600" fontSize="sm">
                    {doc.description}
                  </Text>
                )}
              </VStack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

const BlogPost = () => {
  const { slug } = useParams();
  const blogPost = slug ? getBlogPostBySlug(slug) : undefined;

  if (!blogPost) {
    return (
      <Container maxW="container.lg" py={8}>
        <Heading>Blog post not found</Heading>
      </Container>
    );
  }

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <HStack spacing={2} mb={4}>
            {blogPost.tags.map((tag) => (
              <Tag key={tag} size="md" colorScheme="brand">
                {tag}
              </Tag>
            ))}
          </HStack>
          <Heading as="h1" size="2xl" mb={4}>
            {blogPost.title}
          </Heading>
          <HStack spacing={4} color="gray.500">
            <Text>{blogPost.date}</Text>
            <Text>·</Text>
            <Text>{blogPost.author}</Text>
            <Text>·</Text>
            <Text>{blogPost.readingTime}</Text>
          </HStack>
        </Box>

        {blogPost.coverImage && (
          <Box borderRadius="lg" overflow="hidden">
            <Image
              src={blogPost.coverImage}
              alt={blogPost.title}
              width="100%"
              height="400px"
              objectFit="cover"
            />
          </Box>
        )}

        <Divider />

        {blogPost.externalDocs && blogPost.externalDocs.length > 0 && (
          <ExternalDocsSection docs={blogPost.externalDocs} />
        )}

        <Box className="blog-content">
          {blogPost.sections.map((section, index) => (
            <ContentSection 
              key={index} 
              section={section} 
              blogPostSlug={blogPost.slug}
              blogPostTitle={blogPost.title}
            />
          ))}
        </Box>
      </VStack>
    </Container>
  );
};

export default BlogPost; 