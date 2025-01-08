// client/src/components/Whiteboard.tsx

import React, { useRef, useEffect, useState } from 'react';
import socketService from '../services/socketService';

interface WhiteboardProps {
  boardId: string;
  color: string;
}

const Whiteboard: React.FC<WhiteboardProps> = ({ boardId, color }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    // Join the board (room) when the component mounts
    socketService.joinBoard(boardId);

    // Listen for draw events from other users
    socketService.onDraw((drawData) => {
      drawOnCanvas(drawData.x, drawData.y, drawData.color);
    });

    // Cleanup the socket listeners (best practice)
    return () => {
      // If needed, remove event listeners here
    };
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

  const startDrawing = () => setIsDrawing(true);
  const endDrawing = () => setIsDrawing(false);

  // Called whenever the mouse moves on the canvas
  const handleDraw = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const { x, y } = getCoordinates(e);

    // Send the draw event to the server
    socketService.draw({ boardId, x, y, color });

    // Optional: draw immediately on local canvas
    drawOnCanvas(x, y, color);
  };

  // Actually draw on the local canvas
  const drawOnCanvas = (x: number, y: number, strokeColor: string) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = strokeColor;
    ctx.fillRect(x, y, 2, 2); // Simple "pixel" effect
  };

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      style={{ border: '1px solid #000' }}
      onMouseDown={startDrawing}
      onMouseUp={endDrawing}
      onMouseMove={handleDraw}
    />
  );
};

export default Whiteboard;
