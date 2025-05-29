import React, { useState, useEffect } from 'react';
import type { MouseEvent } from 'react';
import { DrawingCanvas } from './DrawingCanvas';
import { TextEditor } from './TextEditor';
import type { File } from '../types/file';
import { loadFiles, saveFiles } from '../utils/storage';

const Window: React.FC = () => {
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [files, setFiles] = useState<File[]>(() => loadFiles());
  const [selectedFileName, setSelectedFileName] = useState(files[0].name);
  const selectedFile = files.find(f => f.name === selectedFileName)!;

  // Save files to localStorage whenever they change
  useEffect(() => {
    saveFiles(files);
  }, [files]);

  const updateFileContent = (newContent: string) => {
    setFiles(prevFiles => 
      prevFiles.map(f => 
        f.name === selectedFileName ? { ...f, content: newContent } : f
      )
    );
  };

  const handleWindowMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleWindowMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  };

  const handleWindowMouseUp = () => {
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
      onMouseMove={handleWindowMouseMove}
      onMouseUp={handleWindowMouseUp}
      onMouseLeave={handleWindowMouseUp}
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
        onMouseDown={handleWindowMouseDown}
      >
        {selectedFile.type === 'drawing' ? 'Drawing Editor' : 'Text Editor'}
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
                  backgroundColor: file.name === selectedFileName ? '#e3f2fd' : 'transparent',
                  borderRadius: '4px',
                  marginBottom: '0.25rem',
                  fontSize: '0.9rem'
                }}
                onClick={() => setSelectedFileName(file.name)}
              >
                {file.name}
              </div>
            ))}
          </div>
        </div>
        
        {/* Content Area */}
        <div style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          padding: '1rem'
        }}>
          {selectedFile.type === 'drawing' ? (
            <DrawingCanvas
              content={selectedFile.content}
              onContentChange={updateFileContent}
            />
          ) : (
            <TextEditor
              content={selectedFile.content}
              onContentChange={updateFileContent}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Window; 