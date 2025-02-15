import { useParams } from 'react-router-dom';
import { Box, Container, Heading, VStack, Text, Button, useClipboard, HStack } from '@chakra-ui/react';
import { FaClipboard, FaCheck } from 'react-icons/fa';
import CodeBlock from '../components/blog/CodeBlock';

interface SharedCodeData {
  code: string;
  language: string;
  filename?: string;
  timestamp: string;
}

// Get snippet from localStorage
const getSnippet = (id: string): SharedCodeData | null => {
  const snippets = JSON.parse(localStorage.getItem('codeSnippets') || '{}');
  return snippets[id] || null;
};

const SharedCode = () => {
  const { code: snippetId } = useParams();
  
  if (!snippetId) {
    return (
      <Container maxW="container.lg" py={8}>
        <Heading>Code snippet not found</Heading>
      </Container>
    );
  }

  const snippet = getSnippet(snippetId);

  if (!snippet) {
    return (
      <Container maxW="container.lg" py={8}>
        <VStack spacing={4} align="stretch">
          <Heading>Code Snippet Not Found</Heading>
          <Text color="red.500">
            This code snippet may have expired or been deleted. Please make sure you have the correct URL.
          </Text>
        </VStack>
      </Container>
    );
  }

  const { hasCopied, onCopy } = useClipboard(window.location.href);
  
  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="lg" mb={4}>Shared Code Snippet</Heading>
          <HStack spacing={4} mb={4}>
            <Button
              leftIcon={hasCopied ? <FaCheck /> : <FaClipboard />}
              onClick={onCopy}
              size="sm"
              colorScheme="brand"
            >
              {hasCopied ? 'Copied!' : 'Copy Share Link'}
            </Button>
          </HStack>
          <Text fontSize="sm" color="gray.500">
            Shared on {new Date(snippet.timestamp).toLocaleString()}
          </Text>
        </Box>
        <Box>
          <CodeBlock
            code={snippet.code}
            language={snippet.language}
            filename={snippet.filename}
            showLineNumbers={true}
          />
        </Box>
      </VStack>
    </Container>
  );
};

export default SharedCode; 