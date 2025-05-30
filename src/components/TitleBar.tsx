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
        background: 'linear-gradient(50deg, #55A2FF, #39B0FF)',
        backdropFilter: 'blur(20px)',
        height: '2rem',
        borderTopLeftRadius: '4px',
        borderTopRightRadius: '4px',
        cursor: 'move',
        display: 'flex',
        alignItems: 'center',
        padding: '1.5rem 2rem',
        color: 'white',
        fontSize: '1.1rem',
        userSelect: 'none',
        fontWeight: 'bold',
      }}
      onMouseDown={onMouseDown}
    >
      {title}
    </div>
  );
}; 