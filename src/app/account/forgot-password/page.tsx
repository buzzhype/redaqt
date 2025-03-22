'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      // This would be replaced with an actual API call to your account service
      // Note: In a real implementation, we shouldn't reveal if an email exists or not
      // We should always show the same success message regardless
      await mockForgotPasswordApi(data.email);
      setSubmitted(true);
    } catch (error) {
      console.error('Forgot password request failed:', error);
      // Even on error we show success message for security reasons
      setSubmitted(true);
    }
  };

  // Mock API for demonstration
  const mockForgotPasswordApi = async (email: string) => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-8">
          <Link href="/" className="block w-16 h-16 bg-gray-400"></Link>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-6">RedaQt</h2>
        
        {submitted ? (
          <div className="text-center space-y-4">
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  type="email"
                  {...register('email')}
                  placeholder="Email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
              
              <p className="text-sm text-gray-600">
                A recovery link will be sent to the email address on file
              </p>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400"
              >
                {isSubmitting ? 'Sending...' : 'Email Link'}
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