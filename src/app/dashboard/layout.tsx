'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Shield, 
  Lock, 
  FolderClosed, 
  Users, 
  Share2, 
  Settings,
  Search,
  Bell,
  ChevronDown,
  LogOut,
  UserCircle2,
  HelpCircle,
  AlertTriangle
} from 'lucide-react';
import { DocumentProvider } from './contexts/DocumentContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Simulating auth check and data loading
  useEffect(() => {
    const checkAuth = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);
  
  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
    if (showNotifications) setShowNotifications(false);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showUserMenu) setShowUserMenu(false);
  };
  
  const handleSignOut = () => {
    // This would include API calls to sign out, etc.
    window.location.href = '/login';
  };
  
  // Placeholder for document count stats - would come from API/context in real app
  const encryptedCount = 2;
  const totalCount = 5;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your secure workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <DocumentProvider>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Mobile sidebar backdrop */}
        {showMobileSidebar && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={() => setShowMobileSidebar(false)}
          ></div>
        )}
        
        {/* Sidebar */}
        <div className={`w-64 bg-white shadow-md fixed inset-y-0 ${showMobileSidebar ? 'left-0' : '-left-64'} md:left-0 z-30 transition-all duration-300 md:static`}>
          <div className="p-6">
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center mr-2">
                <Shield size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">RedaQt</span>
            </Link>
          </div>
          
          <nav className="mt-6">
            <div className="px-4 mb-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Document Security
              </p>
            </div>
            <Link 
              href="/dashboard" 
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 ${
                pathname === '/dashboard' ? 'bg-blue-50 border-r-4 border-blue-600' : ''
              }`}
            >
              <Shield size={20} className={pathname === '/dashboard' ? 'text-blue-600' : 'text-gray-500'} />
              <span className={`mx-3 ${pathname === '/dashboard' ? 'font-medium' : ''}`}>Secure Documents</span>
            </Link>
            <Link 
              href="/dashboard/encrypted-files" 
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 ${
                pathname === '/dashboard/encrypted-files' ? 'bg-blue-50 border-r-4 border-blue-600' : ''
              }`}
            >
              <Lock size={20} className={pathname === '/dashboard/encrypted-files' ? 'text-blue-600' : 'text-gray-500'} />
              <span className={`mx-3 ${pathname === '/dashboard/encrypted-files' ? 'font-medium' : ''}`}>Encrypted Files</span>
            </Link>
            <Link 
              href="/dashboard/all-files" 
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 ${
                pathname === '/dashboard/all-files' ? 'bg-blue-50 border-r-4 border-blue-600' : ''
              }`}
            >
              <FolderClosed size={20} className={pathname === '/dashboard/all-files' ? 'text-blue-600' : 'text-gray-500'} />
              <span className={`mx-3 ${pathname === '/dashboard/all-files' ? 'font-medium' : ''}`}>All Files</span>
            </Link>

            <div className="px-4 mt-6 mb-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Collaboration
              </p>
            </div>
            <Link 
              href="/dashboard/shared-with-me" 
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 ${
                pathname === '/dashboard/shared-with-me' ? 'bg-blue-50 border-r-4 border-blue-600' : ''
              }`}
            >
              <Users size={20} className={pathname === '/dashboard/shared-with-me' ? 'text-blue-600' : 'text-gray-500'} />
              <span className={`mx-3 ${pathname === '/dashboard/shared-with-me' ? 'font-medium' : ''}`}>Shared with Me</span>
            </Link>
            <Link 
              href="/dashboard/my-shared-files" 
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 ${
                pathname === '/dashboard/my-shared-files' ? 'bg-blue-50 border-r-4 border-blue-600' : ''
              }`}
            >
              <Share2 size={20} className={pathname === '/dashboard/my-shared-files' ? 'text-blue-600' : 'text-gray-500'} />
              <span className={`mx-3 ${pathname === '/dashboard/my-shared-files' ? 'font-medium' : ''}`}>My Shared Files</span>
            </Link>

            <div className="px-4 mt-6 mb-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Settings
              </p>
            </div>
            <Link 
              href="/dashboard/security-settings" 
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 ${
                pathname === '/dashboard/security-settings' ? 'bg-blue-50 border-r-4 border-blue-600' : ''
              }`}
            >
              <Settings size={20} className={pathname === '/dashboard/security-settings' ? 'text-blue-600' : 'text-gray-500'} />
              <span className={`mx-3 ${pathname === '/dashboard/security-settings' ? 'font-medium' : ''}`}>Security Settings</span>
            </Link>
          </nav>
          
          <div className="absolute bottom-0 w-64 p-6">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h4 className="text-sm font-medium text-blue-800 mb-1">Security Status</h4>
              <p className="text-xs text-blue-700 mb-3">Document encryption protects your sensitive information.</p>
              <div className="flex justify-between text-xs text-blue-800 mb-1">
                <span>Encrypted Files</span>
                <span className="font-medium">{encryptedCount}/{totalCount}</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-1.5 mb-3">
                <div 
                  className="bg-blue-600 h-1.5 rounded-full" 
                  style={{ width: `${(encryptedCount / totalCount) * 100}%` }}
                ></div>
              </div>
              <Link
                href="/dashboard/security-settings"
                className="w-full px-3 py-2 text-xs text-blue-600 font-medium border border-blue-200 rounded-md hover:bg-blue-100 transition-colors flex items-center justify-center"
              >
                <HelpCircle size={14} className="mr-1" />
                Security Guidelines
              </Link>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white shadow-sm z-10">
            <div className="py-4 px-6 flex items-center justify-between">
              <div className="flex items-center md:w-72">
                <button 
                  className="md:hidden mr-3 text-gray-500"
                  onClick={() => setShowMobileSidebar(!showMobileSidebar)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search classified documents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button
                    onClick={toggleNotifications}
                    className="p-1 rounded-full text-gray-600 hover:bg-gray-100 relative"
                  >
                    <Bell size={20} />
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                  </button>
                  
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">Security Notifications</p>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        <div className="px-4 py-3 hover:bg-gray-50">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <AlertTriangle size={16} className="text-red-600 mt-1" />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm text-gray-700">
                                <span className="font-medium">Security Alert:</span> "Project Timeline.pdf" is classified as Confidential but is currently decrypted.
                              </p>
                              <p className="text-xs text-gray-500 mt-1">Just now</p>
                            </div>
                          </div>
                        </div>
                        <div className="px-4 py-3 hover:bg-gray-50">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <Lock size={16} className="text-blue-600 mt-1" />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm text-gray-700">Successfully encrypted "Q1 Marketing Strategy.docx"</p>
                              <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="relative">
                  <button
                    onClick={toggleUserMenu}
                    className="flex items-center text-sm rounded-full focus:outline-none"
                  >
                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                      DP
                    </div>
                    <span className="hidden md:flex md:items-center ml-2">
                      <span className="text-sm font-medium text-gray-700">Demo User</span>
                      <ChevronDown size={16} className="ml-1 text-gray-500" />
                    </span>
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">Demo User</p>
                        <p className="text-xs text-green-600">Security Clearance: Level 3</p>
                      </div>
                      <Link href="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                        <UserCircle2 size={16} className="mr-2" />
                        Your Profile
                      </Link>
                      <Link href="/dashboard/security-settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                        <Settings size={16} className="mr-2" />
                        Settings
                      </Link>
                      <div className="border-t border-gray-100"></div>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                      >
                        <LogOut size={16} className="mr-2" />
                        Secure Sign out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Main content area */}
          <main className="flex-1 overflow-auto bg-gray-50 p-6">
            {children}
          </main>
        </div>
      </div>
    </DocumentProvider>
  );
}