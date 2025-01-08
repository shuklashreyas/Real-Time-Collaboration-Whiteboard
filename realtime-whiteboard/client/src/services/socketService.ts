// client/src/services/socketService.ts
import { io, Socket } from 'socket.io-client';

const SERVER_URL = 'http://localhost:3001'; // match your server port

class SocketService {
  private socket: Socket;

  constructor() {
    // Initialize a Socket.io client connection
    this.socket = io(SERVER_URL, {
      transports: ['websocket'],
    });
  }

  // Join a specific board (room)
  joinBoard(boardId: string) {
    this.socket.emit('joinBoard', boardId);
  }

  // Listen for draw events from the server
  onDraw(callback: (data: any) => void) {
    this.socket.on('onDraw', callback);
  }

  // Emit a draw event to the server
  draw(data: any) {
    this.socket.emit('draw', data);
  }

  // Image uploads, etc.
  onUploadImage(callback: (data: any) => void) {
    this.socket.on('onUploadImage', callback);
  }
  uploadImage(data: any) {
    this.socket.emit('uploadImage', data);
  }

  // ...
}

const socketService = new SocketService();
export default socketService;
