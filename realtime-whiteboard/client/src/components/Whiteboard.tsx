// client/src/components/Whiteboard.tsx

import React, { useRef, useEffect, useState } from 'react';
import socketService from '../services/socketService';

interface WhiteboardProps {
  boardId: string;
  color: string;          // user-selected color
  strokeWidth: number;    // user-selected brush size
  tool: 'brush' | 'eraser';
}

const Whiteboard: React.FC<WhiteboardProps> = ({ boardId, color, strokeWidth, tool }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const lastPosition = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    socketService.joinBoard(boardId);

    socketService.onDraw((drawData) => {
      drawOnCanvas(
        drawData.prevX,
        drawData.prevY,
        drawData.x,
        drawData.y,
        drawData.color,
        drawData.strokeWidth
      );
    });
  }, [boardId]);

  const getCoordinates = (e: React.MouseEvent) => {
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
    lastPosition.current = null;
  };

  const handleDraw = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const newPos = getCoordinates(e);
    const prevPos = lastPosition.current;
    if (!prevPos) return;

    // Decide actual stroke color based on the tool
    const strokeColor = tool === 'eraser' ? '#ffffff' : color;

    // Emit to server
    socketService.draw({
      boardId,
      prevX: prevPos.x,
      prevY: prevPos.y,
      x: newPos.x,
      y: newPos.y,
      color: strokeColor,
      strokeWidth: strokeWidth,
    });

    // Draw locally
    drawOnCanvas(prevPos.x, prevPos.y, newPos.x, newPos.y, strokeColor, strokeWidth);

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
      width={1000}
      height={600}
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
