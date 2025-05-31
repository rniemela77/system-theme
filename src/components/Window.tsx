import React from 'react';
import { DrawingCanvas } from './DrawingCanvas';
import { TextEditor } from './TextEditor';
import { Sidebar } from './Sidebar';
import { TitleBar } from './TitleBar';
import type { File } from '../types/file';
import { loadFiles, saveFiles } from '../utils/storage';
import { useWindowManager } from '../hooks/useWindowManager';
import { useState, useEffect } from 'react';

const Window: React.FC = () => {
  const {
    position,
    size,
    handleWindowMouseDown,
    handleResizeMouseDown
  } = useWindowManager();

  const [files, setFiles] = useState<File[]>(() => loadFiles());
  const [selectedFileName, setSelectedFileName] = useState(files[0].name);
  const selectedFile = files.find(f => f.name === selectedFileName)!;

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

  return (
    <div 
      style={{
        border: '1px solid #ccc',
        borderRadius: '4px',
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      <TitleBar 
        title={selectedFile.type === 'drawing' ? 'Drawing Editor' : 'Text Editor'}
        onMouseDown={handleWindowMouseDown}
      />
      <div style={{ 
        display: 'flex',
        flex: 1,
        backgroundColor: '#FFFFFF99',
        backdropFilter: 'blur(20px)',
        position: 'relative'
      }}>
        <Sidebar
          files={files}
          selectedFileName={selectedFileName}
          onFileSelect={setSelectedFileName}
          onFilesReorder={setFiles}
        />
        <div style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          padding: '1rem',
          position: 'relative'
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
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '15px',
          height: '15px',
          cursor: 'se-resize',
          background: `linear-gradient(135deg, transparent 50%, #ccc 50%)`,
          borderBottomRightRadius: '4px'
        }}
        onMouseDown={handleResizeMouseDown}
      />
    </div>
  );
};

export default Window; 