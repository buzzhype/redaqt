'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // This would typically call an API to send a password reset email
    // For this static demo, we'll just simulate the success state
    setSubmitted(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-8">
          <Link href="/" className="block">
            <div className="w-16 h-16 bg-gray-400 rounded-full"></div>
          </Link>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-6">RedaQt</h2>
        
        {submitted ? (
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Mail size={32} className="text-green-600" />
              </div>
            </div>
            <p className="text-gray-600">
              A recovery link will be sent to the email address on file, if it exists.
            </p>
            <Link 
              href="/login"
              className="block w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-center font-medium rounded-md"
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <p className="text-sm text-gray-600">
                A recovery link will be sent to the email address on file
              </p>
              
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Email Link
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <Link 
                href="/login"
                className="text-sm text-blue-600 hover:underline"
              >
                Back to Login
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}