import React from 'react';
import { useCanvasDrawing } from '../hooks/useCanvasDrawing';

interface DrawingCanvasProps {
  content: string;
  onContentChange: (newContent: string) => void;
}

export const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ content, onContentChange }) => {
  const {
    canvasRef,
    startDrawing,
    draw,
    stopDrawing
  } = useCanvasDrawing({ content, onContentChange });

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: 'calc(100% - 32px)',
        height: 'calc(100% - 32px)',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: 'white'
      }}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
    />
  );
}; 