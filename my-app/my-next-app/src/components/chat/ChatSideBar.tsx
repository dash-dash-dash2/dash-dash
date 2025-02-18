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
  }, []);

  const handleChatSelect = (chatId: string) => {
    setActiveChat(chatId);
  };

  const renderChatItem = (chat: any, index: number) => {
    // Determine the other party's name based on user role
    const otherPartyName = user?.role === 'DELIVERYMAN' 
      ? chat.user?.name 
      : chat.deliveryman?.user?.name;

    return (
      <div
        key={`chat-${chat.orderId}-${index}`}
        className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
          activeChat === chat.orderId ? 'bg-blue-50' : ''
        }`}
        onClick={() => handleChatSelect(chat.orderId.toString())}
      >
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <FaUser className="h-10 w-10 rounded-full bg-gray-200 p-2" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">
              {otherPartyName || 'Unknown User'}
            </p>
            <p className="text-sm text-gray-500 truncate">
              {chat.message}
            </p>
          </div>
          <div className="text-xs text-gray-400">
            {/* {format(new Date(chat.createdAt), 'HH:mm')} */}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full md:w-80 bg-white border-r">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-2">
          <FaComments className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-semibold">Chats</h2>
        </div>
        <div className="mt-4 relative">
          <input
            type="text"
            placeholder="Search chats..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>
      <div className="overflow-y-auto h-[calc(100vh-200px)]">
        {chats.map((chat, index) => renderChatItem(chat, index))}
      </div>
    </div>
  );
};

export default ChatSidebar; 
