import React, { useState } from 'react';
import type { MouseEvent } from 'react';

const Window: React.FC = () => {
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div 
      style={{
        backgroundColor: '#f0f0f0',
        border: '1px solid #ccc',
        borderRadius: '4px',
        position: 'absolute',
        left: position.x,
        top: position.y,
        minWidth: '300px',
        minHeight: '300px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        style={{
          backgroundColor: '#2980b9',
          height: '2rem',
          borderTopLeftRadius: '4px',
          borderTopRightRadius: '4px',
          cursor: 'move',
          display: 'flex',
          alignItems: 'center',
          padding: '0 1rem',
          color: 'white',
          userSelect: 'none'
        }}
        onMouseDown={handleMouseDown}
      >
        Window Title
      </div>
      <div style={{ padding: '20px' }}>
        <h2>child window</h2>
      </div>
    </div>
  );
};

export default Window; 