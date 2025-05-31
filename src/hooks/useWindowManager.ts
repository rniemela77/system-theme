import { useState, useEffect } from 'react';
import type { MouseEvent } from 'react';

interface WindowPosition {
  x: number;
  y: number;
}

interface WindowSize {
  width: number;
  height: number;
}

interface UseWindowManagerProps {
  initialPosition?: WindowPosition;
  initialSize?: WindowSize;
  minWidth?: number;
  minHeight?: number;
}

interface UseWindowManagerReturn {
  position: WindowPosition;
  size: WindowSize;
  isDragging: boolean;
  isResizing: boolean;
  handleWindowMouseDown: (e: MouseEvent) => void;
  handleResizeMouseDown: (e: MouseEvent) => void;
}

export const useWindowManager = ({
  initialPosition = { x: 20, y: 20 },
  initialSize = { width: 800, height: 600 },
  minWidth = 600,
  minHeight = 400
}: UseWindowManagerProps = {}): UseWindowManagerReturn => {
  const [position, setPosition] = useState<WindowPosition>(initialPosition);
  const [size, setSize] = useState<WindowSize>(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
      if (isResizing) {
        const newWidth = Math.max(minWidth, resizeStart.width + (e.clientX - resizeStart.x));
        const newHeight = Math.max(minHeight, resizeStart.height + (e.clientY - resizeStart.y));
        setSize({ width: newWidth, height: newHeight });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, resizeStart, minWidth, minHeight]);

  const handleWindowMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleResizeMouseDown = (e: MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height
    });
  };

  return {
    position,
    size,
    isDragging,
    isResizing,
    handleWindowMouseDown,
    handleResizeMouseDown
  };
}; 