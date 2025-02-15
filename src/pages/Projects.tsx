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
  HStack,
} from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';

// Note: Replace with actual project data when available
const projects = [
  {
    title: 'Project 1',
    description: 'Project description will go here.',
    tags: ['Solidity', 'TypeScript'],
    githubUrl: 'https://github.com/FadhilMulinya/project1',
    demoUrl: '#',
  },
  {
    title: 'Project 2',
    description: 'Project description will go here.',
    tags: ['Yul', 'Inline Assembly'],
    githubUrl: 'https://github.com/FadhilMulinya/project2',
    demoUrl: '#',
  },
  {
    title: 'Project 3',
    description: 'Project description will go here.',
    tags: ['Solidity', 'TypeScript'],
    githubUrl: 'https://github.com/FadhilMulinya/project3',
    demoUrl: '#',
  },
  {
    title: 'Project 4',
    description: 'Project description will go here.',
    tags: ['Solidity', 'Yul'],
    githubUrl: 'https://github.com/FadhilMulinya/project4',
    demoUrl: '#',
  },
  {
    title: 'Project 5',
    description: 'Project description will go here.',
    tags: ['TypeScript', 'Smart Contracts'],
    githubUrl: 'https://github.com/FadhilMulinya/project5',
    demoUrl: '#',
  },
  {
    title: 'Project 6',
    description: 'Project description will go here.',
    tags: ['Solidity', 'DeFi'],
    githubUrl: 'https://github.com/FadhilMulinya/project6',
    demoUrl: '#',
  },
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
          <HStack spacing={2} align="center" color="brand.600">
            <Icon as={FaGithub} w={6} h={6} />
            <Text>
              Most of my projects are open source and available on{' '}
              <Link
                href="https://github.com/FadhilMulinya"
                isExternal
                color="brand.800"
                fontWeight="bold"
                _hover={{ textDecoration: 'underline' }}
              >
                GitHub
              </Link>
              . Feel free to explore, contribute, or use them as reference!
            </Text>
          </HStack>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
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
      </VStack>
    </Container>
  );
};

export default Projects; 