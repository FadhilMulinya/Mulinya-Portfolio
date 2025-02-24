import {
  VStack,
  IconButton,
  Tooltip,
  Box,
  Wrap,
  WrapItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import {
  FaEraser,
  FaPaintBrush,
  FaDownload,
  FaTrash,
  FaSquare,
  FaCircle,
  FaDrawPolygon,
  FaMinus,
  FaUndo,
  FaRedo,
  FaPlus,
  FaMinus as FaMinusCircle,
  FaMousePointer,
} from 'react-icons/fa';
import { Tool, BrushType } from './types';
import { SizeControls } from './SizeControls';

interface DrawingToolbarProps {
  tool: Tool;
  setTool: (tool: Tool) => void;
  color: string;
  setColor: (color: string) => void;
  lineWidth: number;
  setLineWidth: (width: number) => void;
  eraserWidth: number;
  setEraserWidth: (width: number) => void;
  brushPresets: ReadonlyArray<{
    type: BrushType;
    name: string;
    icon: React.ComponentType;
  }>;
  colorPresets: Array<{
    color: string;
    name: string;
  }>;
  onClear: () => void;
  onDownload: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  isSelectionMode: boolean;
  setIsSelectionMode: (mode: boolean) => void;
  showBrushMenu: boolean;
  setShowBrushMenu: (show: boolean) => void;
  setBrushType: (type: BrushType) => void;
}

export const DrawingToolbar = ({
  tool,
  setTool,
  color,
  setColor,
  lineWidth,
  setLineWidth,
  eraserWidth,
  setEraserWidth,
  brushPresets,
  colorPresets,
  onClear,
  onDownload,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  isSelectionMode,
  setIsSelectionMode,
  showBrushMenu,
  setShowBrushMenu,
  setBrushType,
}: DrawingToolbarProps) => {
  return (
    <VStack 
      spacing={2} 
      p={1}
      bg="white" 
      borderRight="1px" 
      borderColor="gray.200" 
      minW="48px"
      w="48px"
      h="100%"
      position="sticky"
      left={0}
      top={0}
      zIndex={1}
    >
      <Menu isOpen={showBrushMenu} onClose={() => setShowBrushMenu(false)}>
        <Tooltip label="Brush Types" placement="right">
          <MenuButton
            as={IconButton}
            aria-label="Brush"
            icon={<FaPaintBrush />}
            colorScheme={tool === 'brush' ? 'blue' : 'gray'}
            onClick={() => {
              setTool('brush');
              setShowBrushMenu(true);
            }}
            size="sm"
            variant={tool === 'brush' ? 'solid' : 'ghost'}
          />
        </Tooltip>
        <MenuList>
          {brushPresets.map((preset) => (
            <MenuItem
              key={preset.type}
              onClick={() => {
                setBrushType(preset.type);
                setShowBrushMenu(false);
              }}
              icon={<preset.icon />}
            >
              {preset.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      <Tooltip label={`Brush Size: ${lineWidth}`} placement="right">
        <VStack spacing={0.5}>
          <IconButton
            aria-label="Increase brush size"
            icon={<FaPlus />}
            size="xs"
            variant="ghost"
            onClick={() => setLineWidth(Math.min(lineWidth + 1, 20))}
          />
          <Box fontSize="xs" fontWeight="bold" color="gray.600">
            {lineWidth}
          </Box>
          <IconButton
            aria-label="Decrease brush size"
            icon={<FaMinusCircle />}
            size="xs"
            variant="ghost"
            onClick={() => setLineWidth(Math.max(lineWidth - 1, 1))}
          />
        </VStack>
      </Tooltip>

      <Tooltip label="Eraser" placement="right">
        <IconButton
          aria-label="Eraser"
          icon={<FaEraser />}
          colorScheme={tool === 'eraser' ? 'blue' : 'gray'}
          onClick={() => setTool('eraser')}
          size="sm"
          variant={tool === 'eraser' ? 'solid' : 'ghost'}
        />
      </Tooltip>

      <Tooltip label={`Eraser Size: ${eraserWidth}`} placement="right">
        <VStack spacing={0.5}>
          <IconButton
            aria-label="Increase eraser size"
            icon={<FaPlus />}
            size="xs"
            variant="ghost"
            onClick={() => setEraserWidth(Math.min(eraserWidth + 2, 50))}
          />
          <Box fontSize="xs" fontWeight="bold" color="gray.600">
            {eraserWidth}
          </Box>
          <IconButton
            aria-label="Decrease eraser size"
            icon={<FaMinusCircle />}
            size="xs"
            variant="ghost"
            onClick={() => setEraserWidth(Math.max(eraserWidth - 2, 5))}
          />
        </VStack>
      </Tooltip>

      <Tooltip label="Rectangle" placement="right">
        <IconButton
          aria-label="Rectangle"
          icon={<FaSquare />}
          colorScheme={tool === 'rectangle' ? 'blue' : 'gray'}
          onClick={() => setTool('rectangle')}
          size="sm"
          variant={tool === 'rectangle' ? 'solid' : 'ghost'}
        />
      </Tooltip>

      <Tooltip label="Circle" placement="right">
        <IconButton
          aria-label="Circle"
          icon={<FaCircle />}
          colorScheme={tool === 'circle' ? 'blue' : 'gray'}
          onClick={() => setTool('circle')}
          size="sm"
          variant={tool === 'circle' ? 'solid' : 'ghost'}
        />
      </Tooltip>

      <Tooltip label="Line" placement="right">
        <IconButton
          aria-label="Line"
          icon={<FaMinus />}
          colorScheme={tool === 'line' ? 'blue' : 'gray'}
          onClick={() => setTool('line')}
          size="sm"
          variant={tool === 'line' ? 'solid' : 'ghost'}
        />
      </Tooltip>

      <Tooltip label="Triangle" placement="right">
        <IconButton
          aria-label="Triangle"
          icon={<FaDrawPolygon />}
          colorScheme={tool === 'triangle' ? 'blue' : 'gray'}
          onClick={() => setTool('triangle')}
          size="sm"
          variant={tool === 'triangle' ? 'solid' : 'ghost'}
        />
      </Tooltip>

      <Box h="1px" bg="gray.200" w="full" my={1} />

      <Tooltip label="Undo" placement="right">
        <IconButton
          aria-label="Undo"
          icon={<FaUndo />}
          onClick={onUndo}
          isDisabled={!canUndo}
          size="sm"
          variant="ghost"
        />
      </Tooltip>

      <Tooltip label="Redo" placement="right">
        <IconButton
          aria-label="Redo"
          icon={<FaRedo />}
          onClick={onRedo}
          isDisabled={!canRedo}
          size="sm"
          variant="ghost"
        />
      </Tooltip>

      <Box h="1px" bg="gray.200" w="full" my={1} />

      <Wrap spacing={0.5} justify="center">
        {colorPresets.map((preset) => (
          <WrapItem key={preset.color}>
            <Tooltip label={preset.name} placement="right">
              <Box
                w="18px"
                h="18px"
                bg={preset.color}
                border="1px solid"
                borderColor={color === preset.color ? 'blue.500' : 'gray.200'}
                borderRadius="sm"
                cursor="pointer"
                onClick={() => setColor(preset.color)}
                _hover={{ transform: 'scale(1.1)' }}
                transition="all 0.2s"
              />
            </Tooltip>
          </WrapItem>
        ))}
      </Wrap>

      <Box h="1px" bg="gray.200" w="full" my={1} />

      <Tooltip label="Clear" placement="right">
        <IconButton
          aria-label="Clear"
          icon={<FaTrash />}
          colorScheme="red"
          onClick={onClear}
          size="sm"
          variant="ghost"
        />
      </Tooltip>

      <Tooltip label="Download" placement="right">
        <IconButton
          aria-label="Download"
          icon={<FaDownload />}
          colorScheme="green"
          onClick={onDownload}
          size="sm"
          variant="ghost"
        />
      </Tooltip>

      <Tooltip label="Selection" placement="right">
        <IconButton
          aria-label="Selection"
          icon={<FaMousePointer />}
          colorScheme={isSelectionMode ? 'blue' : 'gray'}
          onClick={() => setIsSelectionMode(!isSelectionMode)}
          size="sm"
          variant={isSelectionMode ? 'solid' : 'ghost'}
        />
      </Tooltip>
    </VStack>
  );
}; 