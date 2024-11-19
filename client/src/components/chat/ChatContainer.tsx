import React, { useEffect, useState } from 'react';
import MessageList from '@/components/chat/MessageList';
import MessageInput from '@/components/chat/MessageInput';
import { useParams } from 'react-router-dom';
import * as io from 'socket.io-client'
import { getLocalStorage } from '@/helpers/LocalStorage';

interface Message {
    _id: string;
    user_id: string;
    server_id: string;
    message: string;
    date: Date;
    deleted: string
}

interface Conversation {
    id: string;
    name: string;
    lastMessage: string;
    unreadCount: number;
    messages: Message[];
}

const ChatContainer: React.FC = () => {
    const { conversation } = useParams<{ conversation: string }>();
    const [messages, setMessages] = useState<Message[]>([])
    const token = getLocalStorage('token');

    useEffect(() => {
        if (!token) {
            console.log('No token found');
            return;
        }

        const ws = io.connect('http://localhost:4000');

        ws.on('messages', (messages: Message[]) => {
            setMessages(messages);
        });
        ws.disconnect();
    }, []);
    console.log(messages);


    const handleSendMessage = (message: string) => {
        if (message.trim()) {
            const newMessage = {
                server_id: conversation,
                messages: message,
            }

            const ws = io.connect('http://localhost:4000', {
                query: {
                    token
                }
            });
            ws.emit('sendMessage', newMessage)
        }
        console.log(message);
    }


    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4">
                <MessageList messages={messages || []} />
            </div>
            <div className="p-4 bg-white dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                <MessageInput onSendMessage={handleSendMessage} />
            </div>
        </div>
    );
};

export default ChatContainer;