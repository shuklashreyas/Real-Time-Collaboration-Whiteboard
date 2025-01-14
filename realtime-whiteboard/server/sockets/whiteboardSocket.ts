// server/src/sockets/whiteboardSocket.ts
import { Server, Socket } from 'socket.io';

interface DrawData {
  boardId: string;
  prevX: number;
  prevY: number;
  x: number;
  y: number;
  color: string;
  strokeWidth: number;
}

export default function registerWhiteboardSocketHandlers(io: Server) {
  io.on('connection', (socket: Socket) => {
    console.log('New client connected:', socket.id);

    socket.on('joinBoard', (boardId: string) => {
      socket.join(boardId);
      console.log(`Socket ${socket.id} joined board ${boardId}`);
    });

    socket.on('draw', (drawData: DrawData) => {
      // Broadcast to everyone else in the room
      io.to(drawData.boardId).emit('onDraw', drawData);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
}
