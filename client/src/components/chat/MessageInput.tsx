import { Paperclip, Send } from 'lucide-react';
import React, { useState } from 'react';
import InputEmoji from 'react-input-emoji'

interface MessageInputProps {
    onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
            <button
                type="button"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                aria-label="Attach file"
            >
                <Paperclip className="w-5 h-5" />
            </button>
            <div className="flex-1 relative">
                <InputEmoji
                    value={message}
                    onChange={setMessage}
                    placeholder="Type a message..."
                    cleanOnEnter
                    background='bg-gray-100 dark:bg-gray-700'
                />
            </div>
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200"
                aria-label="Send message"
            >
                <Send className="w-5 h-5" />
            </button>
        </form>
    );
};

export default MessageInput;