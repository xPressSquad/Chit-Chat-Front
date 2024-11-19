import React from 'react';

interface Message {
    _id: string;
    user_id: string;
    server_id: string;
    message: string;
    date: Date;
    deleted: string
}

interface MessageItemProps {
    message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
    const isCurrentUser = message.user_id === 'User'; // In a real app, compare with the current user's ID

    return (
        <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
            <div
                className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${isCurrentUser ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white'
                    }`}
            >
                <p className="text-sm">{message.message}</p>
                <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                    {message.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
            </div>
        </div>
    );
};

export default MessageItem;