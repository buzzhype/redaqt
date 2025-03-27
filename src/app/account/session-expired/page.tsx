'use client';

import Link from 'next/link';
import { Clock, AlertCircle } from 'lucide-react';

export default function SessionExpiredPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <Link href="/" className="block w-16 h-16 bg-gray-400 rounded-full"></Link>
        </div>
        
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
            <Clock size={40} className="text-red-600" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-4">Account Activation Session Expired</h2>
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <div className="flex">
            <AlertCircle size={20} className="text-red-600 mr-2 flex-shrink-0" />
            <p className="text-red-600">
              The account setup was not completed in time and the session has expired. You must create account again.
            </p>
          </div>
        </div>
        
        <Link 
          href="/account/create-account"
          className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white text-center font-medium rounded-md transition-colors"
        >
          Back to Create Account
        </Link>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account? {' '}
            <Link 
              href="/login"
              className="text-blue-600 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}