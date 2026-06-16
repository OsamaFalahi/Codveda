import React, { createContext, useContext, useEffect, useState } from 'react';
import { initSocket, getSocket } from '../services/socket';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [socketId, setSocketId] = useState(null);

  useEffect(() => {
    const socket = initSocket(
      (id) => {
        setConnected(true);
        setSocketId(id);
      },
      () => {
        setConnected(false);
        setSocketId(null);
      }
    );

    return () => {
      socket.disconnect();
    };
  }, []);

  const value = {
    connected,
    socketId,
    socket: getSocket()
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};