import ChatContainer from '@/components/chat/ChatContainer'
import ChooseConversation from '@/components/chat/ChooseConversation'
import Layout from '@/layout/Layout'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <ChooseConversation />
            },
            {
                path: 'chat/with/:conversation',
                element: <ChatContainer />
            }
        ]
    },
])