import React, { useState, useEffect } from 'react';
import type { MouseEvent } from 'react';
import { DrawingCanvas } from './DrawingCanvas';
import { TextEditor } from './TextEditor';
import { FileIcon } from './FileIcon';
import type { File } from '../types/file';
import { loadFiles, saveFiles } from '../utils/storage';

const Window: React.FC = () => {
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [files, setFiles] = useState<File[]>(() => loadFiles());
  const [selectedFileName, setSelectedFileName] = useState(files[0].name);
  const [draggedFile, setDraggedFile] = useState<string | null>(null);
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

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, fileName: string) => {
    setDraggedFile(fileName);
    e.dataTransfer.effectAllowed = 'move';
    // Add some transparency to the dragged element
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '0.5';
    }
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    setDraggedFile(null);
    // Restore opacity
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '1';
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetFileName: string) => {
    e.preventDefault();
    if (!draggedFile || draggedFile === targetFileName) return;

    setFiles(prevFiles => {
      const newFiles = [...prevFiles];
      const draggedIndex = newFiles.findIndex(f => f.name === draggedFile);
      const targetIndex = newFiles.findIndex(f => f.name === targetFileName);
      
      // Remove the dragged item and insert it at the new position
      const [draggedItem] = newFiles.splice(draggedIndex, 1);
      newFiles.splice(targetIndex, 0, draggedItem);
      
      return newFiles;
    });
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
                draggable
                onDragStart={(e) => handleDragStart(e, file.name)}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, file.name)}
                style={{
                  padding: '0.5rem 0.75rem',
                  cursor: 'grab',
                  backgroundColor: file.name === selectedFileName ? '#e3f2fd' : 'transparent',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  userSelect: 'none',
                  transition: 'transform 0.1s ease',
                  ...(draggedFile && draggedFile !== file.name ? {
                    transform: 'scale(1.02)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  } : {})
                }}
                onClick={() => setSelectedFileName(file.name)}
              >
                <FileIcon type={file.type} />
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