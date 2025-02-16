'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '@/lib/axios';
import { useAuth } from "@/context/AuthContext";

interface Message {
  id: string;
  content: string;
  senderId: string;
  createdAt: string;
  sender: {
    id: string;
    name: string;
    imageUrl?: string;
  };
}

interface Chat {
  id: string;
  orderId: string;
  participants: {
    id: string;
    name: string;
    imageUrl?: string;
  }[];
  messages: Message[];
  unreadCount: number;
}

interface ChatContextType {
  chats: Chat[];
  activeChat: Chat | null;
  setActiveChat: (chat: Chat | null) => void;
  sendMessage: (orderId: string, content: string) => Promise<void>;
  fetchMessages: (orderId: string) => Promise<void>;
  fetchChats: () => Promise<void>;
}

const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const { user } = useAuth();

  const fetchChats = async () => {
    try {
      const response = await api.get('/chat/history');
      setChats(response.data);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const fetchMessages = async (orderId: string) => {
    try {
      const response = await api.get(`/chat/order/${orderId}`);
      setChats(prevChats => 
        prevChats.map(chat => 
          chat.orderId === orderId 
            ? { ...chat, messages: response.data }
            : chat
        )
      );
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async (orderId: string, content: string) => {
    try {
      const response = await api.post('/chat/send', {
        orderId,
        message: content
      });

      setChats(prevChats =>
        prevChats.map(chat =>
          chat.orderId === orderId
            ? {
                ...chat,
                messages: [...chat.messages, response.data]
              }
            : chat
        )
      );
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (user) {
      fetchChats();
    }
  }, [user]);

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