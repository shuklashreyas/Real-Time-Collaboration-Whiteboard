import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import app from '../app';
import registerWhiteboardSocketHandlers from '../sockets/whiteboardSocket';

dotenv.config();

const PORT = process.env.PORT || 3001;

// Create an HTTP server from our Express app
const httpServer = createServer(app);

// Create Socket.IO server
const io = new Server(httpServer, {
  cors: {
    origin: '*', // or your client URL, e.g. "http://localhost:3000"
    methods: ['GET', 'POST'],
  },
});

// Register the whiteboard socket event handlers
registerWhiteboardSocketHandlers(io);

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
