export type Tool = 'brush' | 'eraser' | 'rectangle' | 'circle' | 'line' | 'triangle';
export type BrushType = 'normal' | 'round' | 'square' | 'calligraphy' | 'spray' | 'pattern';

export interface Theme {
  name: string;
  bgColor: string;
  gridColor: string;
  gridSize: number;
  gridOpacity: number;
  secondaryGrid?: boolean;
  secondaryGridColor?: string;
  secondaryGridOpacity?: number;
  tertiaryGrid?: boolean;
  tertiaryGridSize?: number;
  tertiaryGridColor?: string;
  tertiaryGridOpacity?: number;
  isDotted?: boolean;
  dotSize?: number;
  isIsometric?: boolean;
  glowEffect?: boolean;
  rulerLines?: boolean;
  rulerColor?: string;
  starField?: boolean;
  patternType?: 'honeycomb';
} 