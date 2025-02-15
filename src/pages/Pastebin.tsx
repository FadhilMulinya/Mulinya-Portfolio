import {
  Box,
  Container,
  Heading,
  Text,
  Textarea,
  Button,
  VStack,
  HStack,
  Select,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CodeBlock from '../components/blog/CodeBlock';

const languages = [
  { value: 'typescript', label: 'TypeScript' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'solidity', label: 'Solidity' },
  { value: 'rust', label: 'Rust' },
  { value: 'go', label: 'Go' },
  { value: 'cpp', label: 'C++' },
  { value: 'text', label: 'Plain Text' },
];

const Pastebin = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('text');
  const [filename, setFilename] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const handleShare = () => {
    if (!code.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter some code to share',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const encodedCode = btoa(code);
    navigate(`/shared/${encodedCode}`);
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading as="h1" size="2xl" mb={4}>
            Code Sharing
          </Heading>
          <Text fontSize="xl" color="brand.600">
            Share your code snippets easily with others.
          </Text>
        </Box>

        <VStack spacing={4} align="stretch">
          <HStack>
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              maxW="200px"
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </Select>
            <input
              type="text"
              placeholder="Filename (optional)"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #E2E8F0',
                borderRadius: '6px',
                width: '200px',
              }}
            />
          </HStack>

          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here..."
            minH="300px"
            fontFamily="mono"
          />

          <Button colorScheme="brand" onClick={handleShare}>
            Share Code
          </Button>
        </VStack>

        {code && (
          <Box>
            <Heading as="h2" size="lg" mb={4}>
              Preview
            </Heading>
            <CodeBlock
              code={code}
              language={language}
              filename={filename || undefined}
            />
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Pastebin; 