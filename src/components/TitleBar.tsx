import React from 'react';
import type { MouseEvent } from 'react';

interface TitleBarProps {
  title: string;
  onMouseDown: (e: MouseEvent) => void;
}

export const TitleBar: React.FC<TitleBarProps> = ({ title, onMouseDown }) => {
  return (
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
      onMouseDown={onMouseDown}
    >
      {title}
    </div>
  );
}; 