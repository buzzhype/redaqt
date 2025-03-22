'use client';

import Link from 'next/link';

export default function SessionExpiredPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-gray-400 rounded-full"></div>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-4">Account Activation Session Expired</h2>
        <p className="text-center text-red-600 mb-6">
          The account setup was not completed in time and the session has expired. You must create account.
        </p>
        
        <Link 
          href="/account/create-account"
          className="block w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-center font-medium rounded-md"
        >
          Back to Create Account
        </Link>
      </div>
    </div>
  );
}