import { Box, Button, Container, useToast } from '@chakra-ui/react';
import { FaDownload } from 'react-icons/fa';

const Resume = () => {
  const toast = useToast();

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/FADHILS-RESUME.odt';
    link.download = 'FADHILS-RESUME.odt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: 'Download started',
      description: 'Your resume download has started.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.sm" py={6}>
      <Box display="flex" justifyContent="center">
        <Button
          size="sm"
          variant="outline"
          colorScheme="gray"
          leftIcon={<FaDownload />}
          onClick={handleDownload}
          borderRadius="md"
          _hover={{ bg: 'gray.100' }}
        >
          Resume
        </Button>
      </Box>
    </Container>
  );
};

export default Resume;