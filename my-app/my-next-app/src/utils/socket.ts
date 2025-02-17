import { io } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000';

export const socket = io(SOCKET_URL, {
  autoConnect: true,
  reconnection: true,
  withCredentials: true,
  transports: ['websocket', 'polling']
});

socket.on('connect', () => {
  console.log('Connected to socket server');
});

socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error);
  // Attempt to reconnect with polling if websocket fails
  if (socket.io.opts.transports.includes('websocket')) {
    socket.io.opts.transports = ['polling'];
  }
});

socket.on('disconnect', () => {
  console.log('Disconnected from socket server');
}); 