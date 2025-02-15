import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import BlogCard from '../components/blog/BlogCard';
import { getAllBlogPosts } from '../content/blog';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const blogPosts = getAllBlogPosts();

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading as="h1" size="2xl" mb={4}>
            Blog
          </Heading>
          <Text fontSize="xl" color="gray.600">
            Thoughts on blockchain development, smart contracts, and web3 technology.
          </Text>
        </Box>

        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="lg"
            variant="filled"
          />
        </InputGroup>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Blog; 