import {
  VStack,
  IconButton,
  Tooltip,
  Box,
} from '@chakra-ui/react';
import { FaPlus, FaMinus } from 'react-icons/fa';

interface SizeControlsProps {
  label: string;
  value: number;
  setValue: (value: number) => void;
  min: number;
  max: number;
  step: number;
}

export const SizeControls = ({
  label,
  value,
  setValue,
  min,
  max,
  step,
}: SizeControlsProps) => {
  return (
    <Tooltip label={`${label}: ${value}`} placement="right">
      <VStack spacing={0.5}>
        <IconButton
          aria-label={`Increase ${label}`}
          icon={<FaPlus />}
          size="xs"
          variant="ghost"
          onClick={() => setValue(Math.min(value + step, max))}
        />
        <Box fontSize="xs" fontWeight="bold" color="gray.600">
          {value}
        </Box>
        <IconButton
          aria-label={`Decrease ${label}`}
          icon={<FaMinus />}
          size="xs"
          variant="ghost"
          onClick={() => setValue(Math.max(value - step, min))}
        />
      </VStack>
    </Tooltip>
  );
}; 