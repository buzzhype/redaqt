'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  FileText, 
  FolderClosed, 
  Users, 
  Settings, 
  Search, 
  Bell, 
  LogOut, 
  Plus, 
  ChevronDown, 
  PieChart, 
  Clock,
  CheckCircle2,
  UserCircle2
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Simulating auth check and data loading
  useEffect(() => {
    const checkAuth = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      setIsLoading(false);
    };
    
    checkAuth();
  }, [router]);
  
  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
    if (showNotifications) setShowNotifications(false);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showUserMenu) setShowUserMenu(false);
  };

  const handleSignOut = () => {
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your workspace...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-6">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">RedaQt</span>
          </Link>
        </div>
        
        <nav className="mt-6">
          <div className="px-4 mb-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Main
            </p>
          </div>
          <a href="#" className="flex items-center px-6 py-3 text-gray-700 bg-blue-50 border-r-4 border-blue-600">
            <LayoutDashboard size={20} className="text-blue-600" />
            <span className="mx-3 font-medium">Dashboard</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
            <FileText size={20} />
            <span className="mx-3">Documents</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
            <FolderClosed size={20} />
            <span className="mx-3">Folders</span>
          </a>

          <div className="px-4 mt-6 mb-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Team
            </p>
          </div>
          <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
            <Users size={20} />
            <span className="mx-3">Collaborators</span>
          </a>

          <div className="px-4 mt-6 mb-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Account
            </p>
          </div>
          <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
            <Settings size={20} />
            <span className="mx-3">Settings</span>
          </a>
        </nav>
        
        <div className="absolute bottom-0 w-64 p-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-medium text-blue-800">Free Plan</h4>
            <div className="mt-2 mb-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
            <p className="text-xs text-gray-600">2.5GB / 10GB used</p>
            <button className="mt-3 w-full px-3 py-2 text-xs text-blue-600 font-medium border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition-colors">
              Upgrade Plan
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="py-4 px-6 flex items-center justify-between">
            <div className="flex items-center md:w-72">
              <button className="md:hidden mr-3 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search documents..."
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
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">Notifications</p>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      <a href="#" className="px-4 py-3 hover:bg-gray-50 flex">
                        <p className="text-sm text-gray-700">Document "Q4 Report" has been shared with you.</p>
                        <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                      </a>
                      <a href="#" className="px-4 py-3 hover:bg-gray-50 flex">
                        <p className="text-sm text-gray-700">Your storage is at 25% capacity.</p>
                        <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                      </a>
                    </div>
                    <a href="#" className="block px-4 py-2 text-sm text-center text-blue-600 border-t border-gray-100">
                      View all notifications
                    </a>
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
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <UserCircle2 size={16} className="mr-2" />
                      Your Profile
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <Settings size={16} className="mr-2" />
                      Settings
                    </a>
                    <div className="border-t border-gray-100"></div>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back, Demo User</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm flex items-center hover:bg-blue-700">
              <Plus size={18} className="mr-1" />
              New Document
            </button>
          </div>
          
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-5">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Documents</p>
                  <p className="text-2xl font-bold text-gray-800">12</p>
                </div>
                <div className="bg-blue-100 p-2 rounded-md">
                  <FileText size={24} className="text-blue-600" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <span className="text-green-500 text-sm flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                  +3 this week
                </span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-5">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Storage Used</p>
                  <p className="text-2xl font-bold text-gray-800">2.5GB</p>
                </div>
                <div className="bg-blue-100 p-2 rounded-md">
                  <PieChart size={24} className="text-blue-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
              <div className="flex items-center mt-1">
                <span className="text-sm text-gray-600">25% of 10GB</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-5">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Active Shares</p>
                  <p className="text-2xl font-bold text-gray-800">7</p>
                </div>
                <div className="bg-blue-100 p-2 rounded-md">
                  <Users size={24} className="text-blue-600" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <span className="text-green-500 text-sm flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                  +2 external users
                </span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-5">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Account Status</p>
                  <p className="text-2xl font-bold text-gray-800">Active</p>
                </div>
                <div className="bg-green-100 p-2 rounded-md">
                  <CheckCircle2 size={24} className="text-green-600" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <span className="text-blue-600 text-sm">Free Plan</span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-gray-600 text-sm">Expires in 14 days</span>
              </div>
            </div>
          </div>
          
          {/* Recent Documents */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Recent Documents</h2>
                <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                  View all
                </a>
              </div>
            </div>
            
            <div className="divide-y divide-gray-200">
              <div className="px-6 py-4 flex items-center">
                <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center">
                  <FileText size={20} className="text-blue-600" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-sm font-medium text-gray-900">Q1 Marketing Strategy.docx</h3>
                  <p className="text-sm text-gray-500">Modified 2 hours ago</p>
                </div>
                <div className="ml-4 flex-shrink-0 flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500 mr-1">
                    DP
                  </div>
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                    +2
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 flex items-center">
                <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center">
                  <FileText size={20} className="text-blue-600" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-sm font-medium text-gray-900">Annual Budget Overview.xlsx</h3>
                  <p className="text-sm text-gray-500">Modified yesterday</p>
                </div>
                <div className="ml-4 flex-shrink-0 flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                    DP
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 flex items-center">
                <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center">
                  <FileText size={20} className="text-blue-600" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-sm font-medium text-gray-900">Project Timeline.pdf</h3>
                  <p className="text-sm text-gray-500">Modified 3 days ago</p>
                </div>
                <div className="ml-4 flex-shrink-0 flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500 mr-1">
                    DP
                  </div>
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                    +4
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 flex items-center">
                <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center">
                  <FileText size={20} className="text-blue-600" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-sm font-medium text-gray-900">Client Meeting Notes.docx</h3>
                  <p className="text-sm text-gray-500">Modified 1 week ago</p>
                </div>
                <div className="ml-4 flex-shrink-0 flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                    DP
                  </div>
                </div>
              </div>
            </div>
            
            {/* Empty state if no documents */}
            {false && (
              <div className="px-6 py-10 text-center">
                <FileText size={48} className="mx-auto text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No recent documents</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating a new document.</p>
                <div className="mt-6">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Create Document
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Activity Timeline */}
          <div className="mt-6 bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
            </div>
            
            <div className="p-6">
              <div className="flow-root">
                <ul className="-mb-8">
                  <li>
                    <div className="relative pb-8">
                      <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                            <FileText size={16} className="text-white" />
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-900">You uploaded <span className="font-medium">Q1 Marketing Strategy.docx</span></p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            <Clock size={14} className="inline mr-1" />
                            2 hours ago
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  
                  <li>
                    <div className="relative pb-8">
                      <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                            <Users size={16} className="text-white" />
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-900">You shared <span className="font-medium">Annual Budget Overview.xlsx</span> with 2 users</p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            <Clock size={14} className="inline mr-1" />
                            Yesterday
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  
                  <li>
                    <div className="relative pb-8">
                      <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-yellow-500 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-900">You edited <span className="font-medium">Project Timeline.pdf</span></p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            <Clock size={14} className="inline mr-1" />
                            3 days ago
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  
                  <li>
                    <div className="relative">
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                            <FolderClosed size={16} className="text-white" />
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-900">You created a new folder <span className="font-medium">Client Projects</span></p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            <Clock size={14} className="inline mr-1" />
                            1 week ago
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}