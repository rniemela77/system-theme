import { useRef, useEffect, useState } from 'react';
import type { MouseEvent } from 'react';

interface UseCanvasDrawingProps {
  content: string;
  onContentChange: (newContent: string) => void;
}

interface DrawingCoordinates {
  x: number;
  y: number;
}

export const useCanvasDrawing = ({ content, onContentChange }: UseCanvasDrawingProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState<DrawingCoordinates>({ x: 0, y: 0 });

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear the canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Save the cleared state
    const imageData = canvas.toDataURL('image/png');
    onContentChange(imageData);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      const displayWidth = rect.width - 32;
      const displayHeight = rect.height - 32;

      canvas.width = displayWidth;
      canvas.height = displayHeight;

      // Fill with white background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // If there's existing content, load it
      if (content) {
        const img = new Image();
        img.onload = () => {
          const scale = Math.min(
            canvas.width / img.width,
            canvas.height / img.height
          );
          const x = (canvas.width - img.width * scale) / 2;
          const y = (canvas.height - img.height * scale) / 2;
          
          ctx.drawImage(
            img,
            x, y,
            img.width * scale,
            img.height * scale
          );
        };
        img.src = content;
      }
    };

    updateCanvasSize();

    const resizeObserver = new ResizeObserver(updateCanvasSize);
    resizeObserver.observe(canvas.parentElement!);

    return () => {
      resizeObserver.disconnect();
    };
  }, [content]);

  const getCanvasCoordinates = (e: MouseEvent<HTMLCanvasElement>): DrawingCoordinates => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e: MouseEvent<HTMLCanvasElement>) => {
    const coords = getCanvasCoordinates(e);
    setIsDrawing(true);
    setLastPos(coords);
  };

  const draw = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const coords = getCanvasCoordinates(e);

    ctx.beginPath();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();

    setLastPos(coords);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const imageData = canvas.toDataURL('image/png');
    onContentChange(imageData);
  };

  return {
    canvasRef,
    startDrawing,
    draw,
    stopDrawing,
    clearCanvas
  };
}; 