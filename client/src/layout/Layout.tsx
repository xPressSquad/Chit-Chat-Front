import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import ConversationList from '../components/chat/ConversationList'
import { DarkModeToggle } from '@/components/layout/DarkModeToggle'
import Sidebar from '@/components/layout/SideBar'
import { Outlet } from 'react-router-dom'


const Layout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <div className="flex h-screen flex-col">
            <header className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 border-b">
                <div className="flex items-center">
                    <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle sidebar</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0">
                            <Sidebar />
                        </SheetContent>
                    </Sheet>
                    <h1 className="text-xl font-bold ml-2">Chit Chat</h1>
                </div>
                <DarkModeToggle />
            </header>
            <div className="flex flex-1 overflow-hidden">
                <aside className="hidden md:block w-[400px] border-r">
                    <ConversationList />
                </aside>
                <main className="flex-1 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Layout