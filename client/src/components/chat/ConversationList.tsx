import React, { useEffect } from 'react';
import { User, Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux'
import { getUserContacts } from '@/redux/slices/contactsSlice';
import { Link } from 'react-router-dom';


interface Conversation {
    _id: string;
    cover?: string;
    name: string;
}

const ConversationList: React.FC = () => {

    const dispatch = useDispatch();
    const contacts = useSelector((state: RootState) => state.contacts.contacts.data);

    useEffect(() => {
        dispatch(getUserContacts());
    }, [])

    return (
        <div className="h-full bg-white dark:bg-gray-900 flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Chats</h2>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        className="w-full py-2 pl-10 pr-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
            </div>
            <ul className="flex-1 overflow-y-auto">
                {contacts?.map((conversation: Conversation) => (
                    <li key={conversation._id}>
                        <button
                            className="w-full text-left p-4 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out"
                        >
                            <Link to={`/chat/with/${conversation._id}`}>
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        {conversation.cover ? (
                                            <img src={conversation.cover} alt={conversation.name} className="w-12 h-12 rounded-full" />
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                                                <User className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="ml-4 flex-1">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">{conversation.name}</h3>

                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ConversationList;