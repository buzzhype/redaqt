'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulating auth check
  useEffect(() => {
    // This would be replaced with an actual auth check
    const checkAuth = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // For demo purposes: 50% chance the user is "authenticated"
      const isAuthenticated = Math.random() > 0.5;
      
      if (!isAuthenticated) {
        // Redirect to login if not authenticated
        router.push('/login');
      } else {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [router]);
  
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-gray-800">RedaQt</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600 mr-4">Welcome, User</span>
            <button 
              onClick={() => router.push('/login')}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Dashboard Card 1 */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Documents</h2>
              <p className="text-gray-600">You have no recent documents.</p>
              <button 
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create Document
              </button>
            </div>
            
            {/* Dashboard Card 2 */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Storage Usage</h2>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-blue-600 h-4 rounded-full w-1/4"></div>
              </div>
              <p className="mt-2 text-gray-600">25% of 10GB used</p>
            </div>
            
            {/* Dashboard Card 3 */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Status</h2>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <p className="text-gray-600">Active</p>
              </div>
              <p className="mt-2 text-gray-600">Free Plan</p>
              <button 
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Upgrade Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}