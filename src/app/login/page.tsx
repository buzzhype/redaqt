'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showError, setShowError] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      // This would be replaced with an actual API call to your auth service
      const response = await mockLoginApi(data.email, data.password);
      
      if (response.success) {
        router.push('/dashboard');
      } else {
        setShowError(true);
      }
    } catch (error) {
      setShowError(true);
    }
  };

  const closeError = () => {
    setShowError(false);
  };

  // Mock API for demonstration
  const mockLoginApi = async (email: string, password: string) => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // For demo purposes, only accept test@example.com with password "password"
    if (email === 'test@example.com' && password === 'password') {
      return { success: true };
    }
    return { success: false };
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-8">
          <Link href="/" className="block w-16 h-16 bg-gray-400"></Link>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-6">Sign in to RedaQt</h2>
        
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
          
          <div>
            <input
              type="password"
              {...register('password')}
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>
          
          <div className="text-right">
            <Link 
              href="/account/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            New to RedaQt? {' '}
            <Link 
              href="/account/create-account"
              className="text-blue-600 hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
      
      {/* Error popup */}
      {showError && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md max-w-sm w-full relative">
            <button 
              onClick={closeError}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h3 className="text-lg font-medium text-center text-blue-600 mb-2">
              Username or password entered is incorrect
            </h3>
            <p className="text-center text-blue-500">
              Try again
            </p>
          </div>
        </div>
      )}
    </div>
  );
}