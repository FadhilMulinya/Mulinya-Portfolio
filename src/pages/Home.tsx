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
          <strong>Fadhil Mulinya</strong> is a software engineer and blockchain builder , passionate about the intersection of technology, decentralization, and human coordination. His work centers on blockchain infrastructure, decentralized identity systems, and trustless frameworks that enable open collaboration. Fadhil’s expertise spans designing secure and scalable smart contracts, building developer tools, and creating infrastructure that empowers communities and ecosystems across the Web3 space. His focus lies in digital identities, public goods, governance, and DAOs , exploring how blockchain can drive inclusion, transparency, and opportunity across emerging markets.
        </Text>

        <Text fontSize="lg" color="brand.600" lineHeight="tall">
          Before transitioning fully into engineering, Fadhil served as a <strong>Developer Advocate</strong>, collaborating with leading blockchain ecosystems such as <strong>Arbitrum</strong>, <strong>Cartesi</strong>, <strong>Avalanche</strong>, and <strong>ICP</strong>. During this time, he helped train and onboard thousands of new developers into the blockchain space , running workshops, hackathons, and educational programs that demystified Web3 development. Fadhil also worked  with communities and collectives like <Link href="https://www.onedev.club/" isExternal color="blue.500"><strong>OneDev Africa</strong></Link>, <Link href="https://web3clubs.xyz/" isExternal color="blue.500"><strong>Web3 Clubs</strong></Link>, <Link href="https://icphubkenya.io/" isExternal color="blue.500"><strong>ICPHub Kenya</strong></Link>, <Link href="https://w3-zetech.vercel.app/" isExternal color="blue.500"><strong>W3Zetech</strong></Link>, and <Link href="https://metametaclub.com/" isExternal color="blue.500"><strong>Metameta Club</strong></Link> , where he played a key role in community growth, technical mentorship, and creating pathways for the next generation of African Web3 builders.
        </Text>

        <Text fontSize="lg" color="brand.600" lineHeight="tall">
          In addition to his advocacy and engineering work, Fadhil co-founded <Link href="https://www.buidlabz.com/" isExternal color="blue.500"><strong>Buidlabz</strong></Link>, a Web3 R&D studio that turns bold ideas into working products within 4–6 weeks. Buidlabz builds developer tools, infrastructure, and open-source solutions that accelerate innovation and make Web3 development more accessible. The studio emphasizes rapid iteration, scalability, and security , helping teams bring their  products to life with confidence and speed.
        </Text>

        <Text fontSize="lg" color="brand.600" lineHeight="tall">
          Continuing his exploration of decentralized coordination, Fadhil co-founded <Link href="https://unicircle-five.vercel.app/" isExternal color="blue.500"> <strong>Unicircle</strong> </Link>, a working group researching Web3 governance, cryptoeconomics, mechanism design and  game-theoretic models for sustainable digital ecosystems. Unicircle experiments with novel funding mechanisms and participatory governance models to shape the next generation of decentralized communities. Through this initiative, Fadhil continues to contribute to DAOs and open ecosystems that push the boundaries of collective ownership, collaboration, and innovation.
        </Text>


        </VStack>
      </Container>
    </Box>
  );
};

export default Home;