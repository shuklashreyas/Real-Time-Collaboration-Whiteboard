// client/src/components/Whiteboard.tsx
import React, { useRef, useEffect, useState } from 'react';
import socketService from '../services/socketService';

// Update the props to include strokeWidth if you plan to support brush size
interface WhiteboardProps {
  boardId: string;
  color: string;
  strokeWidth: number;
}

const Whiteboard: React.FC<WhiteboardProps> = ({ boardId, color, strokeWidth }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // We'll store the last mouse position to draw continuous lines
  const lastPosition = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    // Join the board (room) when the component mounts
    socketService.joinBoard(boardId);

    // Listen for draw events from other users
    socketService.onDraw((drawData) => {
      drawOnCanvas(drawData.prevX, drawData.prevY, drawData.x, drawData.y, drawData.color, drawData.strokeWidth);
    });

    // Cleanup (optionally remove event listeners)
    return () => {};
  }, [boardId]);

  // Convert mouse event to canvas coordinates
  const getCoordinates = (e: React.MouseEvent): { x: number; y: number } => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent) => {
    setIsDrawing(true);
    lastPosition.current = getCoordinates(e);
  };

  const endDrawing = () => {
    setIsDrawing(false);
    lastPosition.current = null; // reset
  };

  const handleDraw = (e: React.MouseEvent) => {
    if (!isDrawing) return;

    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    const newPos = getCoordinates(e);
    const prevPos = lastPosition.current;

    if (prevPos) {
      // Emit draw event with start and end points
      socketService.draw({
        boardId,
        prevX: prevPos.x,
        prevY: prevPos.y,
        x: newPos.x,
        y: newPos.y,
        color,
        strokeWidth,
      });

      // Draw on local canvas
      drawOnCanvas(prevPos.x, prevPos.y, newPos.x, newPos.y, color, strokeWidth);
    }

    lastPosition.current = newPos;
  };

  const drawOnCanvas = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    strokeColor: string,
    lineWidth: number
  ) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = strokeColor;

    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
  };

  return (
    <canvas
      ref={canvasRef}
      width={1000}    // bigger width
      height={600}   // bigger height
      style={{
        border: '2px solid #ccc',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
      }}
      onMouseDown={startDrawing}
      onMouseUp={endDrawing}
      onMouseMove={handleDraw}
    />
  );
};

export default Whiteboard;
