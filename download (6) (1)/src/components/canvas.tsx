'use client';

import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { useToast } from '@/hooks/use-toast';

export type Tool = 'pen' | 'eraser';

interface CanvasProps {
  tool: Tool;
  color: string;
  brushSize: number;
  brushOpacity: number;
  backgroundColor: string;
}

export interface CanvasHandle {
  clear: () => void;
  download: () => void;
  getCanvasData: () => string;
}

const Canvas = forwardRef<CanvasHandle, CanvasProps>(
  ({ tool, color, brushSize, brushOpacity, backgroundColor }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const isDrawing = useRef(false);
    const { toast } = useToast();
    
    const fillCanvasBackground = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
        const dpr = window.devicePixelRatio || 1;
        context.save();
        context.setTransform(dpr, 0, 0, dpr, 0, 0);
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.restore();
    }

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext('2d');
      if (!context) return;
      context.lineCap = 'round';
      context.lineJoin = 'round';
      contextRef.current = context;

      const setCanvasDimensions = () => {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        const existingData = context.getImageData(0,0, canvas.width, canvas.height);
        
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        
        context.scale(dpr, dpr);
        
        fillCanvasBackground(context, canvas);
        context.putImageData(existingData, 0, 0);
      };

      const resizeObserver = new ResizeObserver(setCanvasDimensions);
      resizeObserver.observe(canvas);
      
      setCanvasDimensions();

      return () => {
        resizeObserver.disconnect();
      };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = contextRef.current;
        if(canvas && context) {
            // This is a simple way to redraw the background without losing the drawing
            // A better way would be to store drawing paths and re-render
            const existingData = context.getImageData(0, 0, canvas.width, canvas.height);
            fillCanvasBackground(context, canvas);
            context.putImageData(existingData, 0, 0);
        }
    }, [backgroundColor]);

    useEffect(() => {
      if (contextRef.current) {
        contextRef.current.strokeStyle = color;
        contextRef.current.lineWidth = brushSize;
        contextRef.current.globalAlpha = brushOpacity;
      }
    }, [color, brushSize, brushOpacity]);

    const getCoords = (e: MouseEvent | TouchEvent): { x: number; y: number } | null => {
        const canvas = canvasRef.current;
        if (!canvas) return null;
        const rect = canvas.getBoundingClientRect();
        const event = 'touches' in e ? e.touches[0] : e;
        if (!event) return null;
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    };

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      const context = contextRef.current;
      if (!context) return;
      
      const coords = getCoords(e.nativeEvent);
      if (!coords) return;
      const { x, y } = coords;

      context.beginPath();
      context.moveTo(x, y);
      isDrawing.current = true;
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDrawing.current) return;
      e.preventDefault();
      const context = contextRef.current;
      if (!context) return;

      const coords = getCoords(e.nativeEvent);
      if (!coords) return;
      const { x, y } = coords;
      
      context.lineTo(x, y);

      if (tool === 'eraser') {
        context.globalCompositeOperation = 'destination-out';
        context.fillStyle = backgroundColor;
        const tempStroke = context.strokeStyle;
        context.strokeStyle = backgroundColor;
        context.stroke();
        context.strokeStyle = tempStroke;
      } else {
        context.globalCompositeOperation = 'source-over';
        context.strokeStyle = color;
        context.stroke();
      }
    };

    const stopDrawing = () => {
      const context = contextRef.current;
      if (!context) return;
      context.closePath();
      isDrawing.current = false;
      context.globalCompositeOperation = 'source-over';
    };
    
    useImperativeHandle(ref, () => ({
      clear() {
        const canvas = canvasRef.current;
        const context = contextRef.current;
        if (canvas && context) {
          context.clearRect(0,0, canvas.width, canvas.height);
          fillCanvasBackground(context, canvas);
        }
      },
      download() {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'doodle.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast({ title: 'Success', description: 'Your masterpiece is saved!' });
      },
      getCanvasData() {
        const canvas = canvasRef.current;
        if (!canvas) return '';
        const context = contextRef.current;
        if (!context) return '';
        const pixelBuffer = new Uint32Array(context.getImageData(0, 0, canvas.width, canvas.height).data.buffer);
        const isBlank = !pixelBuffer.some(color => color !== 0);
        
        return isBlank ? '' : canvas.toDataURL('image/png');
      },
    }));

    return (
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className="h-full w-full touch-none cursor-crosshair rounded-lg shadow-lg"
        style={{ backgroundColor }}
      />
    );
  }
);

Canvas.displayName = 'Canvas';

export default Canvas;
