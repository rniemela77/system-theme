import React, { useState } from 'react';
import type { MouseEvent } from 'react';

interface File {
  name: string;
  content: string;
}

const Window: React.FC = () => {
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [files] = useState<File[]>([
    { name: 'example.txt', content: 'This is an example file.' },
    { name: 'todo.txt', content: '1. Create file system\n2. Add more features' }
  ]);
  const [selectedFile, setSelectedFile] = useState<File>(files[0]);

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
        minWidth: '600px',
        minHeight: '400px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
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
        File Editor
      </div>
      <div style={{ 
        display: 'flex',
        flex: 1,
        backgroundColor: '#fff'
      }}>
        {/* Sidebar */}
        <div style={{
          width: '200px',
          borderRight: '1px solid #ccc',
          color: 'black',
          overflowY: 'auto'
        }}>
          <div style={{ padding: '0.5rem' }}>
            {files.map(file => (
              <div
                key={file.name}
                style={{
                  padding: '0.5rem 0.75rem',
                  cursor: 'pointer',
                  backgroundColor: file === selectedFile ? '#e3f2fd' : 'transparent',
                  borderRadius: '4px',
                  marginBottom: '0.25rem',
                  fontSize: '0.9rem'
                }}
                onClick={() => setSelectedFile(file)}
              >
                {file.name}
              </div>
            ))}
          </div>
        </div>
        
        {/* Content Area */}
        <div style={{
          flex: 1,
        }}>
          <textarea
            value={selectedFile.content}
            onChange={(e) => {
              const updatedFiles = files.map(f => 
                f === selectedFile ? { ...f, content: e.target.value } : f
              );
              const newSelectedFile = updatedFiles.find(f => f.name === selectedFile.name)!;
              setSelectedFile(newSelectedFile);
            }}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              padding: '1rem',
              resize: 'none',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              backgroundColor: '#f0f0f0',
              color: '#362E2E',
              outline: 'none'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Window; 