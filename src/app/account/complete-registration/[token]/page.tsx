'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CompleteRegistrationPage() {
  const [token, setToken] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // For static demo purposes - would handle token verification in a real app
    if (!token.trim()) {
      setErrorMessage('Please enter the token from your email');
    } else if (token === 'demo-error') {
      // Just for demo purposes to show error state
      setErrorMessage('Incorrect token, please retry');
    } else {
      // Would redirect to dashboard or confirmation page in a real app
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-8">
          <Link href="/" className="block">
            <div className="w-16 h-16 bg-gray-400 rounded-full"></div>
          </Link>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-6">Complete Registration</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Token"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errorMessage && (
              <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
            )}
          </div>
          
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Complete
          </button>
        </form>
      </div>
    </div>
  );
}