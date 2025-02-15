import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Tag,
  Container,
  Image,
  useColorModeValue,
  SimpleGrid,
  Icon,
  Link,
} from '@chakra-ui/react';
import { FaGithub, FaTwitter, FaLinkedin, FaArrowRight } from 'react-icons/fa';

const skills = [
  'Solidity',
  'Yul',
  'Inline Assembly',
  'TypeScript',
  'Smart Contracts',
  'DeFi',
  'Web3',
  'Gas Optimization'
];

const Home = () => {
  const bgGradient = useColorModeValue(
    'linear(to-r, brand.50, brand.100)',
    'linear(to-r, brand.900, brand.800)'
  );

  return (
    <Box>
      <Box
        bg={bgGradient}
        py={20}
        px={4}
        mb={12}
        borderRadius="lg"
      >
        <Container maxW="container.lg">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} alignItems="center">
            <VStack spacing={6} align="flex-start">
              <Heading as="h1" size="2xl">
                Hi, I'm Fadhil Mulinya
              </Heading>
              <Text fontSize="xl" maxW="2xl">
                Smart Contract Developer & Developer Advocate passionate about building secure and efficient blockchain solutions.
              </Text>
              <HStack wrap="wrap" spacing={2}>
                {skills.map((skill) => (
                  <Tag
                    key={skill}
                    size="lg"
                    variant="solid"
                    bg="brand.800"
                    color="white"
                    borderRadius="full"
                    px={4}
                    py={2}
                  >
                    {skill}
                  </Tag>
                ))}
              </HStack>
            </VStack>
            <Box position="relative">
              <Box display="flex" justifyContent="center">
                <Image
                  src="/fadhil.png"
                  alt="Fadhil Mulinya"
                  borderRadius="full"
                  boxSize="300px"
                  objectFit="cover"
                  border="4px solid"
                  borderColor="brand.800"
                />
              </Box>
              <Link
                href="https://calendly.com/mulinyafadhil/coffee-chat-s-with-fadhil"
                isExternal
                position="absolute"
                top="50%"
                right="-20px"
                transform="translateY(-50%)"
                bg="white"
                color="brand.800"
                px={4}
                py={2}
                borderRadius="full"
                shadow="md"
                _hover={{
                  textDecoration: 'none',
                  transform: 'translateY(-50%) translateX(5px)',
                  transition: 'all 0.2s',
                }}
                display="flex"
                alignItems="center"
              >
                Chat <Icon as={FaArrowRight} ml={2} />
              </Link>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      <Container maxW="container.lg">
        <VStack spacing={12} align="stretch">
          <Box>
            <Heading as="h2" size="xl" mb={6}>
              About Me
            </Heading>
            <Text fontSize="lg" color="brand.600" lineHeight="tall">
              I specialize in developing secure and efficient smart contracts using Solidity, Yul, and Inline Assembly. 
              With a deep understanding of blockchain technology and DeFi protocols, I focus on creating robust solutions 
              that prioritize security and gas optimization. As a Developer Advocate, I bridge the gap between complex 
              blockchain technologies and developer communities through technical content and documentation.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="xl" mb={6}>
              Featured Work
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
              <Box p={6} bg="white" borderRadius="lg" shadow="md">
                <Heading as="h3" size="md" mb={4}>
                  Smart Contract Development
                </Heading>
                <Text color="brand.600">
                  Expertise in writing secure, gas-efficient smart contracts for DeFi protocols and blockchain applications.
                  Proficient in Solidity, Yul, and low-level optimization techniques.
                </Text>
              </Box>
              <Box p={6} bg="white" borderRadius="lg" shadow="md">
                <Heading as="h3" size="md" mb={4}>
                  Technical Writing & Advocacy
                </Heading>
                <Text color="brand.600">
                  Creating comprehensive technical documentation, tutorials, and educational content for blockchain developers.
                  Active contributor to the web3 community.
                </Text>
              </Box>
            </SimpleGrid>
          </Box>

          <Box>
            <Heading as="h2" size="xl" mb={6}>
              Connect
            </Heading>
            <HStack spacing={6}>
              <a href="https://github.com/fadhilmulinyaf" target="_blank" rel="noopener noreferrer">
                <Icon as={FaGithub} w={8} h={8} color="brand.800" />
              </a>
              <a href="https://twitter.com/mulinyafadhil" target="_blank" rel="noopener noreferrer">
                <Icon as={FaTwitter} w={8} h={8} color="brand.800" />
              </a>
              <a href="https://www.linkedin.com/in/fadhil-mulinya-35464b238/" target="_blank" rel="noopener noreferrer">
                <Icon as={FaLinkedin} w={8} h={8} color="brand.800" />
              </a>
            </HStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Home; 