// server/src/sockets/whiteboardSocket.ts
import { Server, Socket } from 'socket.io';

interface DrawData {
  boardId: string;
  prevX: number;
  prevY: number;
  x: number;
  y: number;
  color: string;        // can be '#000000' or '#ffffff' for eraser
  strokeWidth: number;
}

export default function registerWhiteboardSocketHandlers(io: Server) {
  io.on('connection', (socket: Socket) => {
    socket.on('joinBoard', (boardId: string) => {
      socket.join(boardId);
    });

    socket.on('draw', (drawData: DrawData) => {
      // Re-broadcast to everyone except sender
      io.to(drawData.boardId).emit('onDraw', drawData);
    });
  });
}
