import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  Stack,
  Container,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

const Links = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
];

const NavLink = ({ children, to }: { children: string; to: string }) => (
  <Link
    as={RouterLink}
    to={to}
    px={2}
    py={1}
    rounded="md"
    _hover={{
      textDecoration: 'none',
      bg: 'brand.100',
    }}
  >
    {children}
  </Link>
);

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="white" px={4} borderBottom="1px" borderColor="brand.200">
      <Container maxW="container.xl">
        <Flex h={16} alignItems="center" justifyContent="center">
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
            position="absolute"
            left="4"
          />
          <HStack spacing={8} alignItems="center">
            <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link.path} to={link.path}>
                  {link.name}
                </NavLink>
              ))}
            </HStack>
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as="nav" spacing={4} align="center">
              {Links.map((link) => (
                <NavLink key={link.path} to={link.path}>
                  {link.name}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Container>
    </Box>
  );
};

export default Navbar;