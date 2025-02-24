import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  VStack,
  Text,
  useColorModeValue,
  Icon,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  FaPaintBrush, 
  FaCode, 
  FaGraduationCap,
  FaChalkboardTeacher,
  FaBook,
  FaLaptopCode,
  FaQuestionCircle,
} from 'react-icons/fa';
import { Helmet } from 'react-helmet';

const tools = [
  {
    name: 'Drawing Board',
    description: 'Create illustrations, diagrams, and visual explanations',
    icon: FaPaintBrush,
    path: '/academy/drawing',
    color: 'blue.500',
  },
  {
    name: 'Code Sharing',
    description: 'Share and collaborate on code snippets',
    icon: FaCode,
    path: '/academy/pastebin',
    color: 'green.500',
  },
  {
    name: 'Live Sessions',
    description: 'Join interactive live coding sessions',
    icon: FaChalkboardTeacher,
    path: '/academy/live-sessions',
    color: 'red.500'
  },
  {
    name: 'Courses',
    description: 'Browse and enroll in blockchain development courses',
    icon: FaGraduationCap,
    path: '/academy/courses',
    color: 'purple.500',
    comingSoon: true,
  },
  {
    name: 'Resources',
    description: 'Access learning materials and documentation',
    icon: FaBook,
    path: '/academy/resources',
    color: 'orange.500',
    comingSoon: true,
  },
  {
    name: 'Playground',
    description: 'Practice coding in an interactive environment',
    icon: FaLaptopCode,
    path: '/academy/playground',
    color: 'teal.500',
    comingSoon: true,
  },
  {
    name: 'Q&A Forum',
    description: 'Ask questions, share knowledge, and learn from the blockchain community',
    icon: FaQuestionCircle,
    path: '/academy/qa',
    color: 'pink.500',
    comingSoon: true,
    features: [
      'Smart contract development Q&A',
      'Gas optimization discussions',
      'Security best practices',
      'DeFi protocol development',
      'Blockchain architecture',
      'Expert community answers'
    ]
  }
];

const Academy = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <>
      <Helmet>
        <title>Blockchain Academy - Learn Smart Contract Development & Web3</title>
        <meta name="description" content="Master blockchain development, smart contracts, and Web3 technologies through interactive courses, live sessions, and hands-on practice. Join our community of blockchain developers." />
        <meta name="keywords" content="blockchain courses, smart contract development, Web3 tutorials, DeFi development, Solidity programming, blockchain academy, ethereum development, gas optimization, blockchain security" />
        
        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content="Blockchain Academy - Learn Smart Contract Development & Web3" />
        <meta property="og:description" content="Master blockchain development through interactive courses and hands-on practice. Join our community of blockchain developers." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/academy" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blockchain Academy - Learn Smart Contract Development" />
        <meta name="twitter:description" content="Master blockchain development through interactive courses and hands-on practice." />
        
        {/* Schema.org markup for Google */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Blockchain Academy",
              "description": "Comprehensive blockchain development education platform offering interactive courses, live sessions, and hands-on practice.",
              "url": "https://yourdomain.com/academy",
              "sameAs": [
                "https://twitter.com/mulinyafadhil",
                "https://github.com/FadhilMulinya"
              ],
              "offers": {
                "@type": "Offer",
                "category": "Education"
              }
            }
          `}
        </script>
      </Helmet>

      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Box>
            <Heading as="h1" size="2xl" mb={4}>
              Blockchain Academy
            </Heading>
            <Text fontSize="xl" color="brand.600">
              Learn, practice, and master blockchain development with interactive tools and resources
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {tools.map((tool) => (
              <LinkBox
                key={tool.name}
                as="article"
                p={6}
                borderRadius="lg"
                bg={bgColor}
                border="1px solid"
                borderColor={borderColor}
                _hover={{
                  transform: 'translateY(-4px)',
                  shadow: 'md',
                }}
                transition="all 0.2s"
                position="relative"
              >
                {tool.comingSoon && (
                  <Text
                    position="absolute"
                    top={2}
                    right={2}
                    fontSize="xs"
                    bg="brand.500"
                    color="white"
                    px={2}
                    py={1}
                    borderRadius="md"
                  >
                    Coming Soon
                  </Text>
                )}
                <VStack align="flex-start" spacing={4}>
                  <Icon as={tool.icon} boxSize={8} color={tool.color} />
                  <Box>
                    <LinkOverlay 
                      as={tool.comingSoon ? Box : RouterLink} 
                      {...(!tool.comingSoon && { to: tool.path })}
                    >
                      <Heading size="md" mb={2}>
                        {tool.name}
                      </Heading>
                    </LinkOverlay>
                    <Text color="brand.600" mb={tool.features ? 4 : 0}>
                      {tool.description}
                    </Text>
                    {tool.features && (
                      <VStack align="start" spacing={1} fontSize="sm" color="gray.600">
                        {tool.features.map((feature, index) => (
                          <Text key={index}>• {feature}</Text>
                        ))}
                      </VStack>
                    )}
                  </Box>
                </VStack>
              </LinkBox>
            ))}
          </SimpleGrid>

          <Box mt={8}>
            <Heading as="h2" size="lg" mb={4}>
              Why Learn Here?
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              <Box p={6} bg={bgColor} borderRadius="lg" border="1px solid" borderColor={borderColor}>
                <Heading size="md" mb={4}>Interactive Learning</Heading>
                <Text color="brand.600">
                  Practice what you learn with the interactive tools and real-time feedback system.
                </Text>
              </Box>
              <Box p={6} bg={bgColor} borderRadius="lg" border="1px solid" borderColor={borderColor}>
                <Heading size="md" mb={4}>Expert Community</Heading>
                <Text color="brand.600">
                  Learn from experienced blockchain developers and connect with peers in our Q&A forum.
                </Text>
              </Box>
              <Box p={6} bg={bgColor} borderRadius="lg" border="1px solid" borderColor={borderColor}>
                <Heading size="md" mb={4}>Comprehensive Resources</Heading>
                <Text color="brand.600">
                  Access curated learning materials, from beginner tutorials to advanced blockchain concepts.
                </Text>
              </Box>
            </SimpleGrid>
          </Box>
        </VStack>
      </Container>
    </>
  );
};

export default Academy; 