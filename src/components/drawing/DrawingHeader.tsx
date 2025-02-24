import {
  Flex,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Box,
  Tooltip,
} from '@chakra-ui/react';
import { FaHome, FaVideo, FaCode, FaPalette } from 'react-icons/fa';
import { Theme } from './types';

interface DrawingHeaderProps {
  onNavigate: (path: string) => void;
  themes: Theme[];
  onThemeChange: (theme: Theme) => void;
}

export const DrawingHeader: React.FC<DrawingHeaderProps> = ({
  onNavigate,
  themes,
  onThemeChange,
}) => {
  return (
    <Flex
      bg="white"
      h="64px"
      borderBottom="1px"
      borderColor="gray.200"
      px={4}
      alignItems="center"
      justifyContent="space-between"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={2}
    >
      <HStack spacing={4}>
        <Heading size="md">Drawing Board</Heading>
        <HStack spacing={2}>
          <Tooltip label="Home">
            <IconButton
              icon={<FaHome />}
              aria-label="Home"
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('/academy')}
            />
          </Tooltip>
          <Tooltip label="Live Sessions">
            <IconButton
              icon={<FaVideo />}
              aria-label="Live Sessions"
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('/academy/live-sessions')}
            />
          </Tooltip>
          <Tooltip label="Code Sharing">
            <IconButton
              icon={<FaCode />}
              aria-label="Code Sharing"
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('/academy/pastebin')}
            />
          </Tooltip>
        </HStack>
      </HStack>

      <Menu>
        <Tooltip label="Change Theme">
          <MenuButton
            as={IconButton}
            icon={<FaPalette />}
            variant="ghost"
            aria-label="Change theme"
          />
        </Tooltip>
        <MenuList>
          {themes.map((theme) => (
            <MenuItem
              key={theme.name}
              onClick={() => onThemeChange(theme)}
              icon={
                <Box
                  w="20px"
                  h="20px"
                  bg={theme.bgColor}
                  borderRadius="sm"
                  border="1px solid"
                  borderColor="gray.200"
                />
              }
            >
              {theme.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Flex>
  );
}; 