import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  Icon,
  useToast,
  Link,
} from '@chakra-ui/react';
import { FaDownload } from 'react-icons/fa';

const Resume = () => {
  const toast = useToast();

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/FADHILS-RESUME.odt';
    link.download = 'FADHILS-RESUME.odt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: 'Download started',
      description: 'Your resume download has started.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading as="h1" size="2xl" mb={4}>
            Resume
          </Heading>
          <Text fontSize="xl" color="brand.600" mb={8}>
            Download my resume to learn more about my experience and skills in blockchain development and developer advocacy.
          </Text>
        </Box>

        <Box
          p={8}
          bg="white"
          borderRadius="lg"
          shadow="sm"
          textAlign="center"
        >
          <VStack spacing={6}>
            <Icon as={FaDownload} w={12} h={12} color="brand.800" />
            <Button
              size="lg"
              colorScheme="brand"
              leftIcon={<FaDownload />}
              onClick={handleDownload}
            >
              Download Resume
            </Button>
            <Text color="brand.600">
              ODT format, optimized for viewing
            </Text>
          </VStack>
        </Box>

        <Box>
          <Heading as="h2" size="xl" mb={6}>
            Skills Overview
          </Heading>
          <VStack align="stretch" spacing={4}>
            <Box>
              <Heading as="h3" size="md" mb={2}>
                Smart Contract Development
              </Heading>
              <Text color="brand.600">
                Proficient in Solidity, Yul, and Inline Assembly for writing secure and gas-efficient smart contracts.
              </Text>
            </Box>
            <Box>
              <Heading as="h3" size="md" mb={2}>
                Developer Advocacy
              </Heading>
              <Text color="brand.600">
                Experience in creating technical content, documentation, and fostering developer communities in the blockchain space.
              </Text>
            </Box>
            <Box>
              <Heading as="h3" size="md" mb={2}>
                Technical Skills
              </Heading>
              <Text color="brand.600">
                TypeScript, Web3 Development, DeFi Protocols, Smart Contract Security, Gas Optimization
              </Text>
            </Box>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Resume; 