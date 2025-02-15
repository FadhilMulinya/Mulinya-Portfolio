import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Container,
  Badge,
  LinkBox,
  LinkOverlay,
  useColorModeValue,
  Icon,
  Link,
} from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';

// Note: Replace with actual project data when available
const projects = [
  {
    title: 'Token-Creator',
    description: 'A decentralized application that enables users to create and deploy their own ERC20 tokens on the Polygon mainnet. Built with security and user-friendliness in mind, it simplifies the token creation process for both beginners and experienced developers.',
    tags: ['Solidity', 'Polygon', 'ERC20', 'Web3'],
    githubUrl: 'https://github.com/FadhilMulinya/Token-Creator',
    demoUrl: 'https://token-creator-navy.vercel.app/',
  },
  {
    title: 'DCN (Digital Certificate NFTs)',
    description: 'An innovative platform that allows educational institutions to issue and manage digital certificates as NFTs. This solution provides tamper-proof, verifiable credentials while reducing certificate fraud and simplifying the verification process.',
    tags: ['NFTs', 'Education', 'Smart Contracts', 'ERC721'],
    githubUrl: 'https://github.com/FadhilMulinya/DCN',
    demoUrl: 'https://dcnweb.vercel.app',
  }
];

const Projects = () => {
  const boxBg = useColorModeValue('white', 'brand.800');
  const boxShadow = useColorModeValue('sm', 'none');

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading as="h1" size="2xl" mb={4}>
            Projects
          </Heading>
          <Text fontSize="xl" color="brand.600" mb={4}>
            A collection of my work in blockchain development and smart contract engineering.
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          {projects.map((project, index) => (
            <LinkBox
              key={index}
              as="article"
              p={6}
              borderRadius="lg"
              bg={boxBg}
              shadow={boxShadow}
              transition="all 0.2s"
              _hover={{
                transform: 'translateY(-4px)',
                shadow: 'md',
              }}
            >
              <VStack align="flex-start" spacing={4}>
                <Heading as="h3" size="md">
                  <LinkOverlay href={project.demoUrl} isExternal>
                    {project.title}
                  </LinkOverlay>
                </Heading>
                <Text color="brand.600">{project.description}</Text>
                <Box>
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      mr={2}
                      mb={2}
                      colorScheme="brand"
                      variant="subtle"
                    >
                      {tag}
                    </Badge>
                  ))}
                </Box>
                <Link
                  href={project.githubUrl}
                  isExternal
                  color="brand.800"
                  display="flex"
                  alignItems="center"
                  fontSize="sm"
                  _hover={{ textDecoration: 'underline' }}
                >
                  <Icon as={FaGithub} mr={2} /> View on GitHub
                </Link>
              </VStack>
            </LinkBox>
          ))}
        </SimpleGrid>

        <Box
          mt={8}
          p={8}
          bg={boxBg}
          borderRadius="lg"
          shadow={boxShadow}
          textAlign="center"
        >
          <VStack spacing={4}>
            <Icon as={FaGithub} w={12} h={12} color="brand.800" />
            <Heading as="h3" size="lg">
              More Projects on GitHub
            </Heading>
            <Text color="brand.600" maxW="2xl">
              Explore more of my blockchain development work, including smart contracts, DeFi protocols, and technical tutorials on my GitHub profile.
            </Text>
            <Link
              href="https://github.com/FadhilMulinya"
              isExternal
              bg="brand.800"
              color="white"
              px={8}
              py={3}
              borderRadius="lg"
              fontWeight="bold"
              _hover={{
                bg: 'brand.700',
                textDecoration: 'none',
                transform: 'translateY(-2px)',
              }}
              transition="all 0.2s"
            >
              Visit GitHub Profile
            </Link>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Projects; 