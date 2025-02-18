'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '@/lib/axios';
import { useAuth } from "@/context/AuthContext";
import axios from 'axios';
import { io, Socket } from 'socket.io-client';

export interface Message {
  id: number;
  message: string;
  sender: string;
  createdAt: string;
  updatedAt: string;
  userId?: number;
  deliverymanId?: number;
  orderId: number;
  user?: {
    name: string;
  };
}

export interface Participant {
  id: string;
  name: string;
  imageUrl?: string;
}

export interface Chat {
  id: number;
  orderId: number;
  messages: Message[];
  user?: {
    name: string;
  };
  deliveryman?: {
    user?: {
      name: string;
    }
  };
}

interface ChatContextType {
  chats: Chat[];
  activeChat: string | null;
  setActiveChat: (chatId: string) => void;
  sendMessage: (chatId: string, content: string) => Promise<void>;
  fetchMessages: (chatId: string) => Promise<void>;
  fetchChats: () => Promise<void>;
}

const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const { token, user } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);

  const fetchChats = async () => {
    if (!token) return;
    
    try {
      const response = await axios.get('http://localhost:5000/api/chat/history', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Only update if data has changed
      if (JSON.stringify(response.data) !== JSON.stringify(chats)) {
        setChats(response.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNREFUSED') {
          console.error('Server is not running or unreachable');
        }
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/auth';
        }
      }
      console.error('Error fetching chats:', error);
    }
  };

  const fetchMessages = async (orderId: string) => {
    if (!token) return;

    try {
      const response = await axios.get(`http://localhost:5000/api/chat/order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Update only the messages for this specific chat
      setChats(prevChats => {
        const chatIndex = prevChats.findIndex(c => c.orderId.toString() === orderId);
        if (chatIndex === -1) {
          // If chat doesn't exist, add it
          return [...prevChats, { orderId: parseInt(orderId), messages: response.data }];
        }
        // Update existing chat messages
        const updatedChats = [...prevChats];
        updatedChats[chatIndex] = {
          ...updatedChats[chatIndex],
          messages: response.data
        };
        return updatedChats;
      });
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  };

  // Initialize socket connection
  useEffect(() => {
    if (token) {
      const newSocket = io('http://localhost:5000', {
        auth: { token },
        transports: ['websocket']
      });
      
      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, [token]);

  // Handle incoming messages
  useEffect(() => {
    if (!socket) return;

    socket.on("receive_message", (newMessage: Message) => {
      setChats(prevChats => {
        const chatIndex = prevChats.findIndex(
          chat => chat.orderId === newMessage.orderId
        );
        
        if (chatIndex === -1) {
          return [...prevChats, {
            id: newMessage.orderId,
            orderId: newMessage.orderId,
            messages: [newMessage]
          }];
        }

        const updatedChats = [...prevChats];
        updatedChats[chatIndex] = {
          ...updatedChats[chatIndex],
          messages: [...updatedChats[chatIndex].messages, newMessage]
        };
        return updatedChats;
      });
    });

    return () => {
      socket.off("receive_message");
    };
  }, [socket]);

  // Join chat room when activeChat changes
  useEffect(() => {
    if (socket && activeChat) {
      socket.emit("join_chat", activeChat);
    }
  }, [socket, activeChat]);

  // Update sendMessage function to use socket
  const sendMessage = async (orderId: string, content: string) => {
    if (!socket || !token || !user) return;

    try {
      socket.emit("send_message", {
        orderId: parseInt(orderId),
        message: content,
        userId: user.id,
        role: user.role
      });
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  };

  return (
    <ChatContext.Provider value={{ 
      chats, 
      activeChat, 
      setActiveChat, 
      sendMessage, 
      fetchMessages, 
      fetchChats 
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}; 