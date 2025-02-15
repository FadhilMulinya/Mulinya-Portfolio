import { Box, Button, HStack, Text, useClipboard, Link, useColorModeValue, Icon } from '@chakra-ui/react';
import { CopyIcon, CheckIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import PastebinShare from './PastebinShare';
import { Link as RouterLink } from 'react-router-dom';
import { FaExternalLinkAlt, FaBook } from 'react-icons/fa';

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
  showLineNumbers?: boolean;
  blogPostSlug?: string;
  blogPostTitle?: string;
}

const CodeBlock = ({
  code,
  language,
  filename,
  showLineNumbers = true,
  blogPostSlug,
  blogPostTitle,
}: CodeBlockProps) => {
  const { hasCopied, onCopy } = useClipboard(code);
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const customStyle = {
    padding: '1.5rem',
    borderRadius: '0.5rem',
    fontSize: '0.9rem',
    backgroundColor: '#1a1a1a',
  };

  return (
    <Box mb={6}>
      {filename && (
        <HStack
          bg={bgColor}
          p={2}
          borderTopRadius="md"
          borderBottom="1px"
          borderColor={borderColor}
          justify="space-between"
        >
          <Text fontSize="sm" fontFamily="mono">
            {filename}
          </Text>
          {blogPostSlug && (
            <Link
              as={RouterLink}
              to={`/blog/${blogPostSlug}`}
              color="brand.600"
              fontSize="sm"
              display="flex"
              alignItems="center"
              _hover={{ color: 'brand.500' }}
            >
              <Icon as={FaBook} mr={2} />
              Read Full Article
              <Icon as={FaExternalLinkAlt} ml={2} boxSize={3} />
            </Link>
          )}
        </HStack>
      )}
      <Box
        position="relative"
        borderRadius={filename ? 'none' : 'md'}
        borderBottomRadius="md"
        overflow="hidden"
      >
        {!filename && (
          <HStack
            position="absolute"
            top={2}
            right={2}
            zIndex={1}
            spacing={2}
          >
            {blogPostSlug && (
              <Link
                as={RouterLink}
                to={`/blog/${blogPostSlug}`}
                bg="gray.800"
                color="brand.200"
                fontSize="sm"
                px={3}
                py={1}
                borderRadius="md"
                display="flex"
                alignItems="center"
                _hover={{ bg: 'gray.700', color: 'brand.100' }}
              >
                Read Full Article <ExternalLinkIcon mx={1} />
              </Link>
            )}
            <PastebinShare code={code} language={language} filename={filename} />
            <Button
              size="sm"
              variant="ghost"
              colorScheme="whiteAlpha"
              leftIcon={hasCopied ? <CheckIcon /> : <CopyIcon />}
              onClick={onCopy}
            >
              {hasCopied ? 'Copied!' : 'Copy'}
            </Button>
          </HStack>
        )}
        <SyntaxHighlighter
          language={language}
          style={atomDark}
          customStyle={customStyle}
          showLineNumbers={showLineNumbers}
          wrapLines={true}
          wrapLongLines={true}
        >
          {code.trim()}
        </SyntaxHighlighter>
      </Box>
      {blogPostTitle && !filename && (
        <Text mt={2} fontSize="sm" color="gray.500">
          From article: {blogPostTitle}
        </Text>
      )}
    </Box>
  );
};

export default CodeBlock; 