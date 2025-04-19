import { Box, Container, HStack, Link, Icon, Flex } from '@chakra-ui/react';
import { FaTwitter, FaLinkedin, FaGithub, FaEnvelope, FaHashtag, FaCalendar } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box bg="white" borderTop="1px" borderColor="brand.200">
      <Container maxW="container.xl" py={4}>
        <Flex justify="center" align="center">
          <HStack spacing={6}>
            <Link href="https://github.com/FadhilMulinya" isExternal>
              <Icon as={FaGithub} w={6} h={6} />
            </Link>
            <Link href="https://twitter.com/mulinyafadhil" isExternal>
              <Icon as={FaTwitter} w={6} h={6} />
            </Link>
            <Link href="https://www.linkedin.com/in/fadhil-mulinya-35464b238/" isExternal>
              <Icon as={FaLinkedin} w={6} h={6} />
            </Link>
            <Link href="https://warpcast.com/mulinya" isExternal>
              <Icon as={FaHashtag} w={6} h={6} />
            </Link>
            <Link href="mailto:mulinyafadhil@gmail.com" isExternal>
              <Icon as={FaEnvelope} w={6} h={6} />
            </Link>
            <Link href="https://calendly.com/mulinyafadhil/coffee-chat-s-with-fadhil" isExternal>
              <Icon as={FaCalendar} w={6} h={6} />
            </Link>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
