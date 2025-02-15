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
} from '@chakra-ui/react';
import { FaShare, FaCopy, FaCheck } from 'react-icons/fa';

interface PastebinShareProps {
  code: string;
  language: string;
  filename?: string;
}

const PastebinShare = ({ code, language, filename }: PastebinShareProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const encodedCode = btoa(code);
  const shareUrl = `${window.location.origin}/shared/${encodedCode}`;
  const { hasCopied: hasUrlCopied, onCopy: onUrlCopy } = useClipboard(shareUrl);

  return (
    <>
      <Button
        size="sm"
        leftIcon={<Icon as={FaShare} />}
        colorScheme="brand"
        variant="ghost"
        onClick={onOpen}
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