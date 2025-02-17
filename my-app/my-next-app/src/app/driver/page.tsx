"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useChat } from '../../context/ChatContext';
import { FaBox, FaComments } from 'react-icons/fa'; // Import FaBox for orders tab
import ChatSidebar from '../../components/chat/ChatSideBar';
import ChatWindow from '../../components/chat/ChatWindow';
import Navbar from '../../components/Navbarr/Navbar'; // Ensure Navbar is correctly imported
import Orders from '../../components/orders/Orders'; // Uncomment when implementing Orders component
import OrdersList from '@/components/OrdersList';
import { OrderProvider } from '@/context/OrderContext';

export default function HomePage() {
    const { user } = useAuth();
    const { activeChat } = useChat();
    const [error] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'chat' | 'orders'>('orders'); // Default to orders tab

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            {/* Tab Navigation */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`py-4 px-2 flex items-center space-x-2 border-b-2 font-medium transition-colors ${
                                activeTab === 'orders'
                                    ? 'border-yellow-500 text-yellow-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            <FaBox />
                            <span>Orders</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('chat')}
                            className={`py-4 px-2 flex items-center space-x-2 border-b-2 font-medium transition-colors ${
                                activeTab === 'chat'
                                    ? 'border-yellow-500 text-yellow-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            <FaComments />
                            <span>Chat</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="container mx-auto px-4 py-6">
                {activeTab === 'chat' ? (
                    <div className="flex h-[calc(100vh-180px)]">
                        <ChatSidebar />
                        <div className="flex-1 flex flex-col">
                            {activeChat ? (
                                <ChatWindow chatId={activeChat} />
                            ) : (
                                <div className="flex-1 flex items-center justify-center bg-gray-100">
                                    <div className="text-center">
                                        <h3 className="text-xl font-medium text-gray-600">Select a conversation</h3>
                                        <p className="text-gray-500 mt-2">Choose a chat from the sidebar to start messaging</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="container mx-auto px-4">
                        <h1 className="text-2xl font-bold mb-6">Available Orders</h1>
                        <OrderProvider>
                            <OrdersList />
                        </OrderProvider>
                    </div>
                )}
            </div>
        </div>
    );
}
