'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Shield, 
  Folder,
  MessageSquare,
  Award,
  Users,
  Settings,
  Moon,
  Sun,
  Power,
  HelpCircle
} from 'lucide-react';
import { DocumentProvider } from './contexts/DocumentContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [accountType, setAccountType] = useState('Pro');
  const [username, setUsername] = useState('Demo User');
  
  useEffect(() => {
    const checkAuth = async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);
  
  const handleQuit = () => {
    // Handle application quit - in web context this could sign out
    window.location.href = '/login';
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleHelp = () => {
    window.open('https://redaqt.co/help', '_blank');
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading your secure workspace...</p>
        </div>
      </div>
    );
  }

  const sidebarItems = [
    { id: 'files', icon: Folder, href: '/dashboard', label: 'Files' },
    { id: 'messages', icon: MessageSquare, href: '/dashboard/messages', label: 'Messages' },
    { id: 'certificates', icon: Award, href: '/dashboard/certificates', label: 'Certificates' },
    { id: 'contacts', icon: Users, href: '/dashboard/contacts', label: 'Contacts' },
    { id: 'settings', icon: Settings, href: '/dashboard/settings', label: 'Settings' }
  ];

  const getAccountBadgeColor = () => {
    switch(accountType) {
      case 'Pro': return 'bg-green-500';
      case 'Basic': return 'bg-orange-500';
      case 'Trial': return 'bg-blue-500';
      case 'Guest': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <DocumentProvider>
      <div className="min-h-screen bg-gray-900 flex flex-col">
        {/* Header */}
        <header className="bg-gray-800 px-6 py-3 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <Shield size={16} className="text-white" />
              </div>
              <span 
                className="text-xl font-bold text-white" 
                style={{fontFamily: 'Orbitron, monospace'}}
              >
                RedaQt
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleDarkMode}
              className="flex items-center px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-full text-white text-sm transition-colors"
            >
              {isDarkMode ? <Sun size={14} className="mr-1" /> : <Moon size={14} className="mr-1" />}
              {isDarkMode ? 'LIGHTMODE' : 'DARKMODE'}
            </button>
            
            <button
              onClick={handleQuit}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors"
              title="Quit Application"
            >
              <Power size={20} />
            </button>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-20 bg-gray-800 flex flex-col items-center py-6 space-y-4 border-r border-gray-700">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || 
                              (item.id === 'files' && pathname === '/dashboard');
              
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors group relative ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                  }`}
                  title={item.label}
                >
                  <Icon size={20} />
                  
                  {/* Tooltip */}
                  <div className="absolute left-16 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                    {item.label}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            {/* Work Area */}
            <main className="flex-1 bg-gray-900 p-6 overflow-auto">
              {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 px-6 py-3 flex items-center justify-between border-t border-gray-700">
              <div className="flex items-center text-white text-sm">
                <span>Welcome: </span>
                <span className="font-medium ml-1">{username}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className={`px-3 py-1 rounded-md text-white text-sm font-medium ${getAccountBadgeColor()}`}>
                  {accountType}
                </div>
                
                <button
                  onClick={handleHelp}
                  className="flex items-center justify-center w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full text-white transition-colors"
                  title="Help"
                >
                  <HelpCircle size={16} />
                </button>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </DocumentProvider>
  );
}