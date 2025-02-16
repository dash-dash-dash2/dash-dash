'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '@/lib/axios';
import { useAuth } from "@/context/AuthContext"; // Adjust the path based on your directory structure


interface Message {
  id: string;
  content: string;
  senderId: string;
  createdAt: string;
  sender: {
    name: string;
    imageUrl?: string;
  };
}

interface Chat {
  id: string;
  participants: {
    id: string;
    name: string;
    imageUrl?: string;
  }[];
  messages: Message[];
  unreadCount: number;
  orderId: string;
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
  const { token } = useAuth();

  const fetchChats = async () => {
    try {
      const response = await api.get('/chat/history');
      setChats(response.data);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const fetchMessages = async (chatId: string) => {
    try {
      const response = await api.get(`/chat/order/${chatId}`);
      setChats(prev => prev.map(chat => 
        chat.id === chatId ? { ...chat, messages: response.data } : chat
      ));
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async (chatId: string, content: string) => {
    try {
      const response = await api.post('/chat/send', {
        orderId: chatId,
        message: content
      });
      
      setChats(prev => prev.map(chat => 
        chat.id === chatId 
          ? { ...chat, messages: [...chat.messages, response.data] }
          : chat
      ));
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    if (token) fetchChats();
  }, [token]);

  return (
    <ChatContext.Provider value={{ chats, activeChat, setActiveChat, sendMessage, fetchMessages, fetchChats }}>
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