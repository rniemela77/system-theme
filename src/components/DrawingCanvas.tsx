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
    stopDrawing,
    clearCanvas
  } = useCanvasDrawing({ content, onContentChange });

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      width: '100%', 
      height: '100%',
      position: 'relative',
      padding: '16px'
    }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          border: '1px solid #ccc',
          borderRadius: '4px',
          backgroundColor: 'white'
        }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
      <button
        onClick={clearCanvas}
        style={{
          position: 'absolute',
          bottom: '24px',
          padding: '8px 16px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          background: 'white',
          cursor: 'pointer',
          fontSize: '14px',
          transition: 'all 0.2s ease',
          color: '#333'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.backgroundColor = '#f5f5f5';
          e.currentTarget.style.borderColor = '#999';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.backgroundColor = 'white';
          e.currentTarget.style.borderColor = '#ccc';
        }}
      >
        Clear Canvas
      </button>
    </div>
  );
}; 