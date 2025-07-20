'use client';

import {
  Pen,
  Eraser,
  Palette,
  Pipette,
  Trash2,
  Download,
  Minus,
  Plus,
  SunMoon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { type Tool } from './canvas';

interface ToolbarProps {
  tool: Tool;
  onToolChange: (tool: Tool) => void;
  color: string;
  onColorChange: (color: string) => void;
  brushSize: number;
  onBrushSizeChange: (size: number) => void;
  brushOpacity: number;
  onBrushOpacityChange: (opacity: number) => void;
  onClear: () => void;
  onDownload: () => void;
  onBackgroundColorChange: () => void;
}

export function Toolbar({
  tool,
  onToolChange,
  color,
  onColorChange,
  brushSize,
  onBrushSizeChange,
  brushOpacity,
  onBrushOpacityChange,
  onClear,
  onDownload,
  onBackgroundColorChange,
}: ToolbarProps) {
  return (
    <TooltipProvider delayDuration={100}>
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-20">
        <div className="flex items-center gap-1 sm:gap-2 rounded-lg bg-card p-2 shadow-lg border">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={tool === 'pen' ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => onToolChange('pen')}
                aria-label="Pen Tool"
              >
                <Pen />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Pen</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={tool === 'eraser' ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => onToolChange('eraser')}
                 aria-label="Eraser Tool"
              >
                <Eraser />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Eraser</TooltipContent>
          </Tooltip>

          <Separator orientation="vertical" className="h-8" />

          <Popover>
            <Tooltip>
              <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Color Picker">
                    <div className="h-6 w-6 rounded-full border-2" style={{ backgroundColor: color }} />
                  </Button>
                </PopoverTrigger>
              </TooltipTrigger>
              <TooltipContent>Color</TooltipContent>
            </Tooltip>
            <PopoverContent className="w-auto p-2">
               <input
                type="color"
                value={color}
                onChange={(e) => onColorChange(e.target.value)}
                className="h-10 w-10 cursor-pointer border-none bg-transparent p-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-md [&::-webkit-color-swatch]:border-none"
                aria-label="Select Color"
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <Tooltip>
              <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Brush Settings">
                    <Pipette />
                  </Button>
                </PopoverTrigger>
              </TooltipTrigger>
              <TooltipContent>Brush Settings</TooltipContent>
            </Tooltip>
            <PopoverContent className="w-56 p-4 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Brush Size ({brushSize}px)</label>
                <div className="flex items-center gap-2">
                  <Minus className="h-4 w-4 text-muted-foreground" />
                  <Slider
                    value={[brushSize]}
                    onValueChange={([val]) => onBrushSizeChange(val)}
                    min={1}
                    max={100}
                    step={1}
                    aria-label="Brush Size Slider"
                  />
                  <Plus className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Brush Opacity ({Math.round(brushOpacity*100)}%)</label>
                 <div className="flex items-center gap-2">
                  <Minus className="h-4 w-4 text-muted-foreground" />
                  <Slider
                    value={[brushOpacity]}
                    onValueChange={([val]) => onBrushOpacityChange(val)}
                    min={0.1}
                    max={1}
                    step={0.05}
                    aria-label="Brush Opacity Slider"
                  />
                  <Plus className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Separator orientation="vertical" className="h-8" />
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={onBackgroundColorChange} aria-label="Toggle Canvas Background">
                <SunMoon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Toggle Background</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={onClear} aria-label="Clear Canvas">
                <Trash2 />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Clear Canvas</TooltipContent>
          </Tooltip>

          <Separator orientation="vertical" className="h-8 hidden sm:block" />
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={onDownload} aria-label="Save as PNG">
                <Download />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Save PNG</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
