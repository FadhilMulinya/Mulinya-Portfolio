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
  Icon,
  Link,
  Flex,
  Center,
} from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';
import Resume from './Resume';

const skills = [
  'Infrastructure',
  'Developer Experience',
];

const Home = () => {
  const bgGradient = useColorModeValue(
    'linear(to-r, brand.50, brand.100)',
    'linear(to-r, brand.900, brand.800)'
  );

  return (
    <Box>
      {/* Hero Section with Centered Content */}
      <Box
        bg={bgGradient}
        py={20}
        px={4}
        mb={12}
        borderRadius="lg"
      >
        <Container maxW="container.md" textAlign="center">
          <VStack spacing={8}>
            <Center>
              <Image
                src="/fadhil.png"
                alt="Fadhil Mulinya"
                borderRadius="full"
                boxSize="250px"
                objectFit="cover"
                border="4px solid"
                borderColor="brand.800"
                mb={4}
              />
            </Center>
            
            <VStack spacing={4}>
              <Heading as="h1" size="2xl">
                Hi, I'm Fadhil Mulinya
              </Heading>
              
              <Text fontSize="lg" maxW="700px">
                Software Engineer building{' '}
                <Link
                  href="https://en.wikipedia.org/wiki/Free_and_open-source_software"
                  isExternal
                  color="blue.500"
                >
                  FLOSS
                </Link>{' '}
                softwares. In my spare time, I do technical writing and research mostly about protocol design and systems architecture.
              </Text>
              
              <Flex justify="center" wrap="wrap" gap={2}>
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
              </Flex>
              
              <HStack spacing={4} pt={4}>
                <Link
                  href="https://calendly.com/mulinyafadhil/coffee-chat-s-with-fadhil"
                  isExternal
                  bg="white"
                  color="brand.800"
                  px={5}
                  py={2}
                  borderRadius="full"
                  shadow="md"
                  _hover={{
                    textDecoration: 'none',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.2s',
                  }}
                  display="flex"
                  alignItems="center"
                >
                  Call <Icon as={FaArrowRight} ml={2} />
                </Link>
                
                <Resume />
              </HStack>
            </VStack>
          </VStack>
        </Container>
      </Box>

      {/* About Me Section with Centered Content */}
      <Container maxW="container.md" textAlign="center" mb={12}>
        <VStack spacing={8} align="center">
          <Heading as="h2" size="xl">
            About Me
          </Heading>
          
          <Text fontSize="lg" color="brand.600" lineHeight="tall">
            <strong>Fadhil Mulinya</strong> is a software engineer based in Nairobi, Kenya, specializing in blockchain infrastructure and decentralized systems. His expertise spans developing secure and scalable smart contracts, decentralized applications, and driving Web3 ecosystems. Fadhil's work focuses on decentralizing identity, trustless systems, and digital public goods, pushing the boundaries of how blockchain technologies can foster inclusion and open access across emerging markets.
          </Text>

          <Text fontSize="lg" color="brand.600" lineHeight="tall">
            In addition to his engineering work, Fadhil runs <Link href="https://www.buidlabz.com/" isExternal color="blue.500"><strong>Buidlabz</strong></Link>, a Web3 R&D studio that helps clients move from ideation to MVP in just 4-6 weeks. Buidlabz also develops developer tools, infrastructure, and open-source solutions designed to empower the next wave of blockchain-based applications. The studio's approach focuses on rapid iteration, security, and scalability, helping startups bring their innovative Web3 projects to life quickly and effectively.
          </Text>

          <Text fontSize="lg" color="brand.600" lineHeight="tall">
            Fadhil is the <strong>co-founder of <Link href="https://crefy-co.vercel.app/" isExternal color="blue.500">Crefy</Link></strong>, a zk-appchain focused on the issuance of decentralized identities and verifiable credentials. Crefy's mission is to advance self-sovereign identity frameworks that allow individuals and organizations to securely manage and share their digital identities across platforms, empowering users with full control over their personal data.
          </Text>

          <Text fontSize="lg" color="brand.600" lineHeight="tall">
            In his exploration of decentralized governance, Fadhil co-founded <strong>Unicircle</strong>, a working group committed to researching Web3 governance models, cryptoeconomics, and game theory. Unicircle delves into new funding mechanisms and governance structures to build sustainable and decentralized ecosystems. The group is actively engaged in contributing to DAOs and diverse ecosystems, helping shape the future of decentralized coordination and decision-making.
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default Home;