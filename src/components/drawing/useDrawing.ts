import { useRef, useState, useEffect } from 'react';
import { Tool, Theme, BrushType } from './types';

export const useDrawing = (initialTheme: Theme) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(2);
  const [tool, setTool] = useState<Tool>('brush');
  const [eraserWidth, setEraserWidth] = useState(10);
  const [currentTheme, setCurrentTheme] = useState(initialTheme);
  const [brushType, setBrushType] = useState<BrushType>('normal');
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [drawingHistory, setDrawingHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = currentTheme.bgColor;
    ctx.fillRect(0, 0, width, height);
    
    // Draw star field if enabled
    if (currentTheme.starField) {
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = Math.random() * 2;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Set initial grid style
    ctx.strokeStyle = `${currentTheme.gridColor}${Math.floor(currentTheme.gridOpacity * 255).toString(16).padStart(2, '0')}`;
    ctx.lineWidth = 0.5;

    if (currentTheme.isDotted) {
      const dotSize = currentTheme.dotSize || 1;
      for (let x = 0; x <= width; x += currentTheme.gridSize) {
        for (let y = 0; y <= height; y += currentTheme.gridSize) {
          ctx.beginPath();
          ctx.arc(x, y, dotSize, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
    } else if (currentTheme.isIsometric) {
      // Draw isometric grid
      const iso = currentTheme.gridSize;
      const h = iso * Math.sin(Math.PI / 3);
      
      ctx.beginPath();
      for (let x = 0; x <= width + height; x += iso) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x - height, height);
      }
      ctx.stroke();

      ctx.beginPath();
      for (let x = 0; x <= width + height; x += iso) {
        ctx.moveTo(-x, 0);
        ctx.lineTo(-x + height, height);
      }
      ctx.stroke();

      if (currentTheme.secondaryGrid) {
        const secondaryColor = currentTheme.secondaryGridColor || currentTheme.gridColor;
        const secondaryOpacity = currentTheme.secondaryGridOpacity || 0.2;
        ctx.strokeStyle = `${secondaryColor}${Math.floor(secondaryOpacity * 255).toString(16).padStart(2, '0')}`;
        ctx.beginPath();
        for (let y = 0; y <= height; y += h) {
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
        }
        ctx.stroke();
      }
    } else if (currentTheme.patternType === 'honeycomb') {
      const size = currentTheme.gridSize;
      const h = size * Math.sin(Math.PI / 3);
      
      for (let y = 0; y <= height + h; y += h * 3) {
        for (let x = 0; x <= width + size; x += size * 2) {
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = i * Math.PI / 3;
            const px = x + size * Math.cos(angle);
            const py = y + size * Math.sin(angle);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.stroke();
        }
      }
    } else {
      // Draw regular grid
      for (let x = 0; x <= width; x += currentTheme.gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y <= height; y += currentTheme.gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw secondary grid
      if (currentTheme.secondaryGrid) {
        const secondaryColor = currentTheme.secondaryGridColor || currentTheme.gridColor;
        const secondaryOpacity = currentTheme.secondaryGridOpacity || 0.2;
        ctx.strokeStyle = `${secondaryColor}${Math.floor(secondaryOpacity * 255).toString(16).padStart(2, '0')}`;
        const secondarySize = currentTheme.gridSize / 5;
        
        for (let x = 0; x <= width; x += secondarySize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }

        for (let y = 0; y <= height; y += secondarySize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      }

      // Draw tertiary grid (for architect theme)
      if (currentTheme.tertiaryGrid && currentTheme.tertiaryGridSize) {
        const tertiaryColor = currentTheme.tertiaryGridColor || currentTheme.gridColor;
        const tertiaryOpacity = currentTheme.tertiaryGridOpacity || 0.2;
        ctx.strokeStyle = `${tertiaryColor}${Math.floor(tertiaryOpacity * 255).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = 1;
        
        for (let x = 0; x <= width; x += currentTheme.tertiaryGridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }

        for (let y = 0; y <= height; y += currentTheme.tertiaryGridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      }

      // Draw ruler lines
      if (currentTheme.rulerLines && currentTheme.rulerColor) {
        ctx.strokeStyle = currentTheme.rulerColor;
        ctx.lineWidth = 1;
        
        // Draw ruler markings
        for (let x = 0; x <= width; x += currentTheme.gridSize * 5) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, 10);
          ctx.stroke();
          
          // Add numbers
          ctx.fillStyle = currentTheme.rulerColor;
          ctx.font = '10px Arial';
          ctx.fillText(String(x), x + 2, 20);
        }

        for (let y = 0; y <= height; y += currentTheme.gridSize * 5) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(10, y);
          ctx.stroke();
          
          ctx.fillStyle = currentTheme.rulerColor;
          ctx.font = '10px Arial';
          ctx.fillText(String(y), 2, y + 10);
        }
      }
    }

    // Add glow effect for neon theme
    if (currentTheme.glowEffect) {
      ctx.shadowBlur = 15;
      ctx.shadowColor = currentTheme.gridColor;
    } else {
      ctx.shadowBlur = 0;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match container size
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      const { width, height } = container.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      
      // Draw grid first
      drawGrid(ctx, canvas.width, canvas.height);
      
      // Restore saved drawing if exists
      if (historyIndex >= 0 && drawingHistory[historyIndex]) {
        ctx.putImageData(drawingHistory[historyIndex], 0, 0);
      }
    };

    // Initial resize
    resizeCanvas();

    // Add resize observer
    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(resizeCanvas);
    });
    resizeObserver.observe(canvas.parentElement!);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
    };
  }, [currentTheme, historyIndex, drawingHistory]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setStartPos({ x, y });

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);
    
    if (tool === 'brush') {
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.globalCompositeOperation = 'source-over';
    } else if (tool === 'eraser') {
      ctx.strokeStyle = currentTheme.bgColor;
      ctx.lineWidth = eraserWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.globalCompositeOperation = 'source-over';
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (tool === 'brush') {
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.globalCompositeOperation = 'source-over';

      switch (brushType) {
        case 'normal':
          ctx.lineTo(x, y);
          ctx.stroke();
          break;
        case 'round':
          ctx.beginPath();
          ctx.arc(x, y, lineWidth / 2, 0, Math.PI * 2);
          ctx.fill();
          break;
        case 'square':
          ctx.fillRect(x - lineWidth / 2, y - lineWidth / 2, lineWidth, lineWidth);
          break;
        case 'calligraphy':
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(Math.PI / 4);
          ctx.fillRect(-lineWidth / 4, -lineWidth, lineWidth / 2, lineWidth * 2);
          ctx.restore();
          break;
        case 'spray':
          for (let i = 0; i < lineWidth * 2; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * lineWidth;
            const sprayX = x + radius * Math.cos(angle);
            const sprayY = y + radius * Math.sin(angle);
            ctx.fillRect(sprayX, sprayY, 1, 1);
          }
          break;
        case 'pattern':
          const size = lineWidth;
          const spacing = size * 2;
          const offsetX = x - (x % spacing);
          const offsetY = y - (y % spacing);
          ctx.beginPath();
          ctx.arc(offsetX, offsetY, size / 2, 0, Math.PI * 2);
          ctx.fill();
          break;
      }
    } else if (tool === 'eraser') {
      ctx.strokeStyle = currentTheme.bgColor;
      ctx.lineWidth = eraserWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (tool === 'eraser') {
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = lineWidth;

      switch (tool) {
        case 'rectangle':
          ctx.beginPath();
          ctx.rect(startPos.x, startPos.y, x - startPos.x, y - startPos.y);
          ctx.stroke();
          break;
        case 'circle':
          ctx.beginPath();
          const radius = Math.sqrt(Math.pow(x - startPos.x, 2) + Math.pow(y - startPos.y, 2));
          ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
          ctx.stroke();
          break;
        case 'line':
          ctx.beginPath();
          ctx.moveTo(startPos.x, startPos.y);
          ctx.lineTo(x, y);
          ctx.stroke();
          break;
        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(startPos.x, startPos.y);
          ctx.lineTo(x, y);
          ctx.lineTo(startPos.x - (x - startPos.x), y);
          ctx.closePath();
          ctx.stroke();
          break;
      }
    }

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const newHistory = drawingHistory.slice(0, historyIndex + 1);
    newHistory.push(imageData);
    setDrawingHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);

    setIsDrawing(false);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      setHistoryIndex(historyIndex - 1);
      const imageData = drawingHistory[historyIndex - 1];
      ctx.putImageData(imageData, 0, 0);
    }
  };

  const redo = () => {
    if (historyIndex < drawingHistory.length - 1) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      setHistoryIndex(historyIndex + 1);
      const imageData = drawingHistory[historyIndex + 1];
      ctx.putImageData(imageData, 0, 0);
    }
  };

  return {
    canvasRef,
    color,
    setColor,
    lineWidth,
    setLineWidth,
    tool,
    setTool,
    eraserWidth,
    setEraserWidth,
    currentTheme,
    setCurrentTheme,
    brushType,
    setBrushType,
    isSelectionMode,
    setIsSelectionMode,
    historyIndex,
    drawingHistory,
    startDrawing,
    draw,
    stopDrawing,
    undo,
    redo,
  };
}; 