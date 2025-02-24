import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Flex, Input, Text, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Select, useToast, Tooltip } from '@chakra-ui/react';
import { FaDownload, FaTrash, FaEraser, FaPaintBrush, FaSave } from 'react-icons/fa';

type Tool = 'brush' | 'eraser';
type BrushType = 'normal' | 'round' | 'square' | 'spray' | 'calligraphy' | 'pattern' | 'neon';

export const DrawingCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState<Tool>('brush');
  const [brushType, setBrushType] = useState<BrushType>('normal');
  const toast = useToast();

  // Auto-save functionality
  useEffect(() => {
    const loadSavedDrawing = () => {
      const savedData = localStorage.getItem('drawing');
      if (savedData && canvasRef.current) {
        const img = new Image();
        img.onload = () => {
          const ctx = canvasRef.current?.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
          }
        };
        img.src = savedData;
      }
    };

    loadSavedDrawing();
  }, []);

  const autoSave = () => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL();
      localStorage.setItem('drawing', dataUrl);
    }
  };

  // Initialize canvas only once
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    const container = canvas.parentElement;
    if (!container) return;
    
    const { width, height } = container.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;

    // Initialize context
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(1, 1);
    ctx.lineCap = "round";
    contextRef.current = ctx;

    // Add resize observer
    const resizeObserver = new ResizeObserver(() => {
      const { width: newWidth, height: newHeight } = container.getBoundingClientRect();
      
      // Save current drawing
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      
      // Resize canvas
      canvas.width = newWidth;
      canvas.height = newHeight;
      
      // Restore context properties
      ctx.scale(1, 1);
      ctx.lineCap = "round";
      
      // Restore drawing
      ctx.putImageData(imageData, 0, 0);
    });
    
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []); // Empty dependency array - only run once on mount

  // Update context properties when color or brush size changes
  useEffect(() => {
    const ctx = contextRef.current;
    if (!ctx) return;

    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = brushSize;
  }, [color, brushSize]);

  const startDrawing = (event: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas || !contextRef.current) return;

    setIsDrawing(true);

    // Get coordinates
    let x, y;
    if ("touches" in event) {
      const rect = canvas.getBoundingClientRect();
      x = event.touches[0].clientX - rect.left;
      y = event.touches[0].clientY - rect.top;
    } else {
      const mouseEvent = event as React.MouseEvent;
      const rect = canvas.getBoundingClientRect();
      x = mouseEvent.clientX - rect.left;
      y = mouseEvent.clientY - rect.top;
    }

    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
  };

  const applyBrushEffect = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    switch (brushType) {
      case 'normal':
        ctx.lineTo(x, y);
        ctx.stroke();
        break;
      case 'round':
        ctx.beginPath();
        ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
        ctx.fill();
        break;
      case 'square':
        ctx.fillRect(x - brushSize / 2, y - brushSize / 2, brushSize, brushSize);
        break;
      case 'spray':
        for (let i = 0; i < brushSize * 2; i++) {
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * brushSize;
          const sprayX = x + radius * Math.cos(angle);
          const sprayY = y + radius * Math.sin(angle);
          ctx.fillRect(sprayX, sprayY, 1, 1);
        }
        break;
      case 'calligraphy':
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.PI / 4);
        ctx.fillRect(-brushSize / 4, -brushSize, brushSize / 2, brushSize * 2);
        ctx.restore();
        break;
      case 'pattern':
        const size = brushSize;
        const spacing = size * 2;
        const offsetX = x - (x % spacing);
        const offsetY = y - (y % spacing);
        ctx.beginPath();
        ctx.arc(offsetX, offsetY, size / 2, 0, Math.PI * 2);
        ctx.fill();
        break;
      case 'neon':
        ctx.save();
        ctx.shadowBlur = brushSize;
        ctx.shadowColor = color;
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.restore();
        break;
    }
  };

  const draw = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !contextRef.current || !canvasRef.current) return;

    // Get coordinates
    let x, y;
    if ("touches" in event) {
      const rect = canvasRef.current.getBoundingClientRect();
      x = event.touches[0].clientX - rect.left;
      y = event.touches[0].clientY - rect.top;
    } else {
      const mouseEvent = event as React.MouseEvent;
      const rect = canvasRef.current.getBoundingClientRect();
      x = mouseEvent.clientX - rect.left;
      y = mouseEvent.clientY - rect.top;
    }

    const ctx = contextRef.current;

    if (tool === 'brush') {
      applyBrushEffect(ctx, x, y);
    } else {
      // Enhanced eraser
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, brushSize, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const stopDrawing = () => {
    if (!contextRef.current) return;
    contextRef.current.closePath();
    setIsDrawing(false);
    autoSave(); // Auto-save when stopping drawing
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    autoSave(); // Auto-save when clearing canvas
  };

  const downloadDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = dataUrl;
    link.click();
  };

  const manualSave = () => {
    autoSave();
    toast({
      title: "Drawing saved",
      description: "Your drawing has been manually saved",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box h="100%" display="flex" flexDirection="column">
      <Flex p={4} borderBottom="1px" borderColor="gray.200" gap={4} alignItems="center" flexWrap="wrap">
        <Flex alignItems="center" gap={2}>
          <Text>Tool:</Text>
          <Select
            value={tool}
            onChange={(e) => setTool(e.target.value as Tool)}
            width="32"
          >
            <option value="brush">Brush</option>
            <option value="eraser">Eraser</option>
          </Select>
        </Flex>
        {tool === 'brush' && (
          <Flex alignItems="center" gap={2}>
            <Text>Brush Type:</Text>
            <Select
              value={brushType}
              onChange={(e) => setBrushType(e.target.value as BrushType)}
              width="32"
            >
              <option value="normal">Normal</option>
              <option value="round">Round</option>
              <option value="square">Square</option>
              <option value="spray">Spray</option>
              <option value="calligraphy">Calligraphy</option>
              <option value="pattern">Pattern</option>
              <option value="neon">Neon</option>
            </Select>
          </Flex>
        )}
        <Flex alignItems="center" gap={2}>
          <Text>Color:</Text>
          <Input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            width="16"
            height="10"
            padding={1}
            isDisabled={tool === 'eraser'}
          />
        </Flex>
        <Flex alignItems="center" gap={2}>
          <Text>{tool === 'eraser' ? 'Eraser' : 'Brush'} Size:</Text>
          <Slider
            value={brushSize}
            onChange={(val) => setBrushSize(val)}
            min={1}
            max={50}
            step={1}
            width="32"
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Flex>
        <Tooltip label="Clear Canvas">
          <Button
            leftIcon={<FaTrash />}
            onClick={clearCanvas}
            variant="outline"
          >
            Clear
          </Button>
        </Tooltip>
        <Tooltip label="Save Drawing">
          <Button
            leftIcon={<FaSave />}
            onClick={manualSave}
            variant="outline"
            colorScheme="green"
          >
            Save
          </Button>
        </Tooltip>
        <Tooltip label="Download as PNG">
          <Button
            leftIcon={<FaDownload />}
            onClick={downloadDrawing}
            variant="outline"
          >
            Download
          </Button>
        </Tooltip>
      </Flex>
      <Box flex="1" position="relative">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          style={{
            touchAction: 'none',
            width: '100%',
            height: '100%',
            cursor: tool === 'eraser' ? 'crosshair' : 'default'
          }}
        />
      </Box>
    </Box>
  );
}; 