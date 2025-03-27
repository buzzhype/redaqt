'use client';

import Link from 'next/link';
import { XCircle, UserX } from 'lucide-react';

export default function AccountUnavailablePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <Link href="/" className="block w-16 h-16 bg-gray-400 rounded-full"></Link>
        </div>
        
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center">
            <UserX size={40} className="text-yellow-600" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-4">Account Unavailable</h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
          <div className="flex">
            <XCircle size={20} className="text-yellow-600 mr-2 flex-shrink-0" />
            <p className="text-yellow-700">
              The account you requested is not available for use. This email address may already be registered.
            </p>
          </div>
        </div>
        
        <div className="text-center mb-6">
          <Link 
            href="/account/forgot-password"
            className="text-blue-600 hover:underline font-medium"
          >
            Forgot password?
          </Link>
        </div>
        
        <Link 
          href="/login"
          className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white text-center font-medium rounded-md transition-colors"
        >
          Back to Login
        </Link>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Need a new account? {' '}
            <Link 
              href="/account/create-account"
              className="text-blue-600 hover:underline"
            >
              Create account with different email
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}