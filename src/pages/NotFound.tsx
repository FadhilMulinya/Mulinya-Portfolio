import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  keyframes,
  Container,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-30px); }
  60% { transform: translateY(-15px); }
`;

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionButton = motion(Button);

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxW="container.md" centerContent>
      <VStack spacing={8} py={20} textAlign="center">
        <MotionBox
          animation={`${bounce} 2s ease infinite`}
          fontSize="6xl"
          mb={4}
        >
          🎨
        </MotionBox>
        <MotionHeading
          as="h1"
          fontSize="6xl"
          bgGradient="linear(to-r, blue.400, purple.500)"
          bgClip="text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Oops!
        </MotionHeading>
        <MotionText
          fontSize="xl"
          color="gray.600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          Looks like we've wandered off the canvas! This page doesn't exist.
        </MotionText>
        <MotionButton
          colorScheme="blue"
          size="lg"
          onClick={() => navigate('/academy')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Back to Academy
        </MotionButton>
      </VStack>
    </Container>
  );
};

export default NotFound; 