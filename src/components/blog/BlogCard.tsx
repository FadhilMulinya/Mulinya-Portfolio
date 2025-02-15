import {
  Box,
  Heading,
  Text,
  Image,
  Tag,
  HStack,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

interface BlogCardProps {
  title: string;
  date: string;
  readingTime: string;
  slug: string;
  coverImage?: string;
  tags: string[];
  author: string;
}

const BlogCard = ({
  title,
  date,
  readingTime,
  slug,
  coverImage,
  tags,
  author,
}: BlogCardProps) => {
  return (
    <LinkBox
      as="article"
      p={6}
      borderRadius="lg"
      bg="white"
      shadow="sm"
      transition="all 0.2s"
      _hover={{
        transform: 'translateY(-4px)',
        shadow: 'md',
      }}
    >
      {coverImage && (
        <Box mb={4} borderRadius="md" overflow="hidden">
          <Image
            src={coverImage}
            alt={title}
            width="100%"
            height="200px"
            objectFit="cover"
          />
        </Box>
      )}
      <HStack spacing={2} mb={2}>
        {tags.map((tag) => (
          <Tag key={tag} size="sm" colorScheme="brand">
            {tag}
          </Tag>
        ))}
      </HStack>
      <Heading as="h3" size="md" mb={2}>
        <LinkOverlay as={RouterLink} to={`/blog/${slug}`}>
          {title}
        </LinkOverlay>
      </Heading>
      <HStack spacing={4} color="gray.500" fontSize="sm">
        <Text>{date}</Text>
        <Text>·</Text>
        <Text>{author}</Text>
        <Text>·</Text>
        <Text>{readingTime}</Text>
      </HStack>
    </LinkBox>
  );
};

export default BlogCard; 