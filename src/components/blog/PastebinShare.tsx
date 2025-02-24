import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  Text,
  useClipboard,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  useToast,
} from '@chakra-ui/react';
import { FaShare, FaCopy, FaCheck } from 'react-icons/fa';
import { useState } from 'react';

interface PastebinShareProps {
  code: string;
  language: string;
  filename?: string;
}

// Generate a random ID for the snippet
const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

const PastebinShare = ({ code, language, filename }: PastebinShareProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [shareUrl, setShareUrl] = useState('');
  const { hasCopied: hasUrlCopied, onCopy: onUrlCopy } = useClipboard(shareUrl);

  const handleShare = () => {
    try {
      const snippetId = generateId();
      const shareData = {
        code,
        language,
        filename,
        timestamp: new Date().toISOString(),
      };
      
      // Store in localStorage
      const snippets = JSON.parse(localStorage.getItem('codeSnippets') || '{}');
      snippets[snippetId] = shareData;
      localStorage.setItem('codeSnippets', JSON.stringify(snippets));
      
      const url = `${window.location.origin}/shared/${snippetId}`;
      setShareUrl(url);
      onOpen();
    } catch (error) {
      console.error('Error sharing code:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate share link',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button
        size="sm"
        leftIcon={<Icon as={FaShare} />}
        colorScheme="brand"
        variant="ghost"
        onClick={handleShare}
      >
        Share
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Share Code Snippet</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4} align="stretch">
              <Text>
                Share this URL to let others view your code snippet:
              </Text>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  value={shareUrl}
                  readOnly
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={onUrlCopy}
                    leftIcon={hasUrlCopied ? <FaCheck /> : <FaCopy />}
                  >
                    {hasUrlCopied ? 'Copied' : 'Copy'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {filename && (
                <Text fontSize="sm" color="gray.500">
                  Filename: {filename}
                </Text>
              )}
              <Text fontSize="sm" color="gray.500">
                Language: {language}
              </Text>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PastebinShare; 