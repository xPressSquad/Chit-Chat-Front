import React from 'react';
import MessageItem from '@/components/chat/MessageItem';

interface Message {
    _id: string;
    user_id: string;
    server_id: string;
    message: string;
    date: Date;
    deleted: string
}

interface MessageListProps {
    messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
    return (
        <div className="space-y-4">
            {messages.map((message) => (
                <MessageItem key={message._id} message={message} />
            ))}
        </div>
    );
};

export default MessageList;