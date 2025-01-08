// server/src/sockets/whiteboardSocket.ts

import { Server, Socket } from 'socket.io';

interface DrawData {
  boardId: string;
  x: number;
  y: number;
  color: string;
  // Add other properties if needed (pen size, shape, etc.)
}

export default function registerWhiteboardSocketHandlers(io: Server) {
  io.on('connection', (socket: Socket) => {
    console.log('New client connected:', socket.id);

    // Join a specific board
    socket.on('joinBoard', (boardId: string) => {
      socket.join(boardId);
      console.log(`Socket ${socket.id} joined board ${boardId}`);
    });

    // Handle draw events
    socket.on('draw', (drawData: DrawData) => {
      // Broadcast the drawing action to everyone else on the same board
      io.to(drawData.boardId).emit('onDraw', drawData);
    });

    // Handle image uploads (optional step for later)
    socket.on('uploadImage', (uploadData) => {
      io.to(uploadData.boardId).emit('onUploadImage', uploadData);
    });

    // Client disconnect
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
}
