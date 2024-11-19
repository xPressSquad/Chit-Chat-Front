import { MessageSquare } from "lucide-react";

const ChooseConversation: React.FC = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                <div className="w-full max-w-md">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold">Chit Chat</h1>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <div className="flex flex-col items-center space-y-4">
                            <MessageSquare className="h-16 w-16 text-blue-500 dark:text-blue-400" />
                            <h2 className="text-xl font-semibold text-center">Welcome to Chit Chat</h2>
                            <p className="text-center text-gray-600 dark:text-gray-400">
                                Choose a conversation to start messaging or create a new one.
                            </p>
                            <button className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                                Start a New Conversation
                            </button>
                        </div>
                    </div>
                    <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                        <p>Don't have any conversations yet?</p>
                        <p>Start by adding contacts or joining groups.</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChooseConversation;
