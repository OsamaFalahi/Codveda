import { io } from 'socket.io-client';

const socket = io({
  withCredentials: true,
  transports: ['websocket', 'polling']
});

export const initSocket = (onConnect, onDisconnect) => {
  socket.on('connect', () => {
    console.log('Connected to socket:', socket.id);
    if (onConnect) onConnect(socket.id);
  });

  socket.on('disconnect', (reason) => {
    console.log('Disconnected from socket:', reason);
    if (onDisconnect) onDisconnect(reason);
  });

  return socket;
};

export const getSocket = () => socket;

export const emitEvent = (eventName, data) => {
  return socket.emit(eventName, data);
};

export const onEvent = (eventName, callback) => {
  socket.on(eventName, callback);
};

export const offEvent = (eventName, callback) => {
  socket.off(eventName, callback);
};

export default socket;