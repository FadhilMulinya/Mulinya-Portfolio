import { useParams } from 'react-router-dom';
import { Box, Container, Heading, VStack } from '@chakra-ui/react';
import CodeBlock from '../components/blog/CodeBlock';

const SharedCode = () => {
  const { code } = useParams();
  
  if (!code) {
    return (
      <Container maxW="container.lg" py={8}>
        <Heading>Code snippet not found</Heading>
      </Container>
    );
  }

  try {
    const decodedCode = atob(code);
    
    return (
      <Container maxW="container.lg" py={8}>
        <VStack spacing={8} align="stretch">
          <Heading size="lg">Shared Code Snippet</Heading>
          <Box>
            <CodeBlock
              code={decodedCode}
              language="text"
              showLineNumbers={true}
            />
          </Box>
        </VStack>
      </Container>
    );
  } catch (error) {
    return (
      <Container maxW="container.lg" py={8}>
        <Heading>Invalid code snippet</Heading>
      </Container>
    );
  }
};

export default SharedCode; 