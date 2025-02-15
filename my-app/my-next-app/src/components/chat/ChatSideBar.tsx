'use client'
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useChat } from '../../context/ChatContext';
import { FaComments, FaSearch, FaUser } from 'react-icons/fa';
// import { getFullImageUrl } from '../../utils/imageUtils';
import { format } from 'date-fns';

const ChatSidebar = () => {
  const { user } = useAuth();
  const { chats, activeChat, fetchChats, setActiveChat } = useChat();

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  const handleChatSelect = (chatId: string) => {
    setActiveChat(chatId);
  };

  const renderChatItem = (chat: any) => {
    const otherParticipant = chat.participants.find((p: any) => p.id !== user?.id);
    const lastMessage = chat.messages[chat.messages.length - 1];

    return (
      <div
        key={chat.id}
        onClick={() => handleChatSelect(chat.id)}
        className={`p-4 hover:bg-yellow-50 cursor-pointer transition-colors ${
          activeChat === chat.id ? 'bg-yellow-100' : ''
        }`}
      >
        <div className="flex items-center space-x-3">
          {/* User Avatar */}
          <div className="relative">
            {otherParticipant?.imageUrl ? (
              <img
                src={getFullImageUrl(otherParticipant.imageUrl)}
                alt={otherParticipant.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <FaUser className="text-gray-500 text-xl" />
              </div>
            )}
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
          </div>

          {/* Chat Info */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center">
              <h3 className="font-medium truncate">{otherParticipant?.name}</h3>
              {lastMessage && (
                <span className="text-xs text-gray-500">
                  {format(new Date(lastMessage.createdAt), 'HH:mm')}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 truncate">
              {lastMessage ? (
                <>
                  {lastMessage.senderId === user?.id && 'You: '}
                  {lastMessage.content}
                </>
              ) : (
                'No messages yet'
              )}
            </p>
          </div>

          {/* Unread Count */}
          {chat.unreadCount > 0 && (
            <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white">{chat.unreadCount}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-80 border-r border-gray-200 flex flex-col bg-white">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold flex items-center">
          <FaComments className="mr-2 text-yellow-500" />
          Messages
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {chats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
            <FaComments className="text-4xl mb-2" />
            <p>No conversations yet</p>
          </div>
        ) : (
          chats.map(renderChatItem)
        )}
      </div>
    </div>
  );
};

export default ChatSidebar; 
