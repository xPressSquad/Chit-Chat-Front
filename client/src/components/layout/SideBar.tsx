import React from 'react';
import { User, Settings, Users, Phone, Bell, Shield, HelpCircle, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Sidebar: React.FC = () => {
    return (
        <div className="h-full flex flex-col bg-gray-100 dark:bg-gray-900">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-4">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">John Doe</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Online</p>
                    </div>
                </div>
            </div>
            <nav className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-2">
                    <li>
                        <Button variant="ghost" className="w-full justify-start">
                            <User className="mr-2 h-4 w-4" />
                            Profile
                        </Button>
                    </li>
                    <li>
                        <Button variant="ghost" className="w-full justify-start">
                            <Users className="mr-2 h-4 w-4" />
                            Groups
                        </Button>
                    </li>
                    <li>
                        <Button variant="ghost" className="w-full justify-start">
                            <Phone className="mr-2 h-4 w-4" />
                            Calls
                        </Button>
                    </li>
                    <li>
                        <Button variant="ghost" className="w-full justify-start">
                            <Settings className="mr-2 h-4 w-4" />
                            Settings
                        </Button>
                    </li>
                    <li>
                        <Button variant="ghost" className="w-full justify-start">
                            <Bell className="mr-2 h-4 w-4" />
                            Notifications
                        </Button>
                    </li>
                    <li>
                        <Button variant="ghost" className="w-full justify-start">
                            <Shield className="mr-2 h-4 w-4" />
                            Privacy
                        </Button>
                    </li>
                    <li>
                        <Button variant="ghost" className="w-full justify-start">
                            <HelpCircle className="mr-2 h-4 w-4" />
                            Help & Support
                        </Button>
                    </li>
                </ul>
            </nav>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                </Button>
            </div>
        </div>
    );
};

export default Sidebar;