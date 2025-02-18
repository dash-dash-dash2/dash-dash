import { io } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  withCredentials: true,
  transports: ['websocket', 'polling']
});

socket.on('connect', () => {
  console.log('Connected to socket server');
});

socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error);
  
});

socket.on('disconnect', () => {
  console.log('Disconnected from socket server');
}); 