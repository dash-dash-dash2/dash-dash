'use client'
import { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { FaUser, FaPaperPlane, FaImage, FaComments } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { Message, useChat } from '../../context/ChatContext';
// import { getFullImageUrl } from '../../utils/imageUtils';

interface ChatWindowProps {
  chatId: string;
}

const ChatWindow = ({ chatId }: ChatWindowProps) => {
  const { user } = useAuth();
  const { chats, sendMessage, fetchMessages } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const chat = chats.find(c => c.orderId.toString() === chatId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (chatId) {
      fetchMessages(chatId);
    }
  }, [chatId]);

  useEffect(() => {
    scrollToBottom();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);
    try {
      await sendMessage(chatId, newMessage.trim());
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSending(false);
    }
  };

  if (chats.length === 0) return null;

  const renderMessage = (message: Message) => {
    const isOwnMessage = user?.id === message.userId;
    
    return (
      <div
        key={message.id}
        className={`flex items-start space-x-2 ${isOwnMessage ? 'flex-row-reverse' : ''}`}
      >
        <div className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'}`}>
          <span className="text-xs text-gray-500 mb-1">
            {isOwnMessage ? user?.name : message.user?.name || 'Unknown'}
          </span>
          <div
            className={`px-4 py-2 rounded-lg max-w-xs lg:max-w-md ${
              isOwnMessage 
                ? 'bg-yellow-500 text-white' 
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            <p className="text-sm">{message.message}</p>
          </div>
          <span className="text-xs text-gray-400 mt-1">
            {/* {format(new Date(message.createdAt), 'HH:mm')} */}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center">
        <div className="flex items-center space-x-3">
          {/* {otherParticipant?.imageUrl ? (
            <img
              src={getFullImageUrl(otherParticipant.imageUrl)}
              alt={otherParticipant.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <FaUser className="text-gray-500 text-xl" />
            </div>
          )} */}
          <div>
            {/* <h3 className="font-medium text-lg">{otherParticipant?.name}</h3> */}
            <p className="text-sm text-gray-500">Active now</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {chat?.messages?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <FaComments className="text-4xl mb-2" />
            <p>No messages yet</p>
            <p className="text-sm">Start the conversation</p>
          </div>
        ) : (
          chat?.messages?.map(renderMessage)
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-yellow-500 transition-colors"
          >
            <FaImage className="text-xl" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || isSending}
            className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaPaperPlane className={`text-lg ${isSending ? 'opacity-50' : ''}`} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow; 