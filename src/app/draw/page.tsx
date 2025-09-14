'use client';

import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/header';
import Canvas, { type CanvasHandle, type Tool } from '@/components/canvas';
import { Toolbar } from '@/components/toolbar';

const backgroundColors = [
  '#111111',
  '#2c3e50',
  '#34495e',
  '#2c2c54',
  '#474787',
  '#227093',
  '#3498db',
];

export default function DrawPage() {
  const [tool, setTool] = useState<Tool>('pen');
  const [color, setColor] = useState('#FFFFFF');
  const [brushSize, setBrushSize] = useState(5);
  const [brushOpacity, setBrushOpacity] = useState(1);
  const [pageBackgroundColor, setPageBackgroundColor] = useState(backgroundColors[0]);
  const [canvasBackgroundColor, setCanvasBackgroundColor] = useState('#111111');

  const canvasRef = useRef<CanvasHandle>(null);
  const { toast } = useToast();

  useEffect(() => {
    let colorIndex = 0;
    const intervalId = setInterval(() => {
      colorIndex = (colorIndex + 1) % backgroundColors.length;
      setPageBackgroundColor(backgroundColors[colorIndex]);
    }, 5000); // Change color every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  const handleClear = () => canvasRef.current?.clear();
  const handleDownload = () => canvasRef.current?.download();
  
  const handleBackgroundColorChange = () => {
    setCanvasBackgroundColor(prev => prev === '#111111' ? '#FFFFFF' : '#111111');
  };

  return (
    <div 
      className="relative h-screen w-screen overflow-hidden flex flex-col transition-colors duration-[2000ms] ease-in-out"
      style={{ backgroundColor: pageBackgroundColor }}
    >
      <Header />
      <main className="flex-grow pt-16 pb-24 flex items-center justify-center">
        <div className="w-[95%] h-[95%] max-w-7xl max-h-[1200px] md:aspect-video">
           <Canvas
            ref={canvasRef}
            tool={tool}
            color={color}
            brushSize={brushSize}
            brushOpacity={brushOpacity}
            backgroundColor={canvasBackgroundColor}
          />
        </div>
      </main>
      <Toolbar
        tool={tool}
        onToolChange={setTool}
        color={color}
        onColorChange={setColor}
        brushSize={brushSize}
        onBrushSizeChange={setBrushSize}
        brushOpacity={brushOpacity}
        onBrushOpacityChange={setBrushOpacity}
        onClear={handleClear}
        onDownload={handleDownload}
        onBackgroundColorChange={handleBackgroundColorChange}
      />
    </div>
  );
}
