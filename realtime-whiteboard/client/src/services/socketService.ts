// client/src/services/socketService.ts
import { io, Socket } from 'socket.io-client';

const SERVER_URL = 'http://localhost:3001'; // or your server address

interface DrawData {
  boardId: string;
  prevX: number;
  prevY: number;
  x: number;
  y: number;
  color: string;
  strokeWidth: number;
}

class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(SERVER_URL, {
      transports: ['websocket'],
    });
  }

  joinBoard(boardId: string) {
    this.socket.emit('joinBoard', boardId);
  }

  onDraw(callback: (data: DrawData) => void) {
    this.socket.on('onDraw', callback);
  }

  draw(data: DrawData) {
    this.socket.emit('draw', data);
  }
}

const socketService = new SocketService();
export default socketService;
