import { Box } from '@chakra-ui/react';
import { DrawingCanvas } from '../components/drawing/DrawingCanvas';

const Drawing = () => {
  return (
    <Box h="100vh" position="relative" overflow="hidden">
      <DrawingCanvas />
    </Box>
  );
};

export default Drawing; 