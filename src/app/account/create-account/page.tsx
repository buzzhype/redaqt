'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const createAccountSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[^a-zA-Z0-9]/, { message: 'Password must contain at least one special character' }),
  confirmPassword: z.string(),
  agreeTerms: z.boolean().refine(val => val === true, { 
    message: 'You must agree to the Terms of Service and Privacy Policy' 
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type CreateAccountFormData = z.infer<typeof createAccountSchema>;

export default function CreateAccountPage() {
  const router = useRouter();
  const [showUnavailable, setShowUnavailable] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAccountFormData>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      agreeTerms: false,
    }
  });

  const onSubmit = async (data: CreateAccountFormData) => {
    try {
      // This would be replaced with an actual API call to your account service
      const response = await mockCreateAccountApi(data.email, data.password);
      
      if (response.success) {
        // Redirect to login or another page indicating successful registration
        router.push('/login?registered=true');
      } else if (response.error === 'EMAIL_EXISTS') {
        // Show account unavailable page
        setShowUnavailable(true);
      }
    } catch (error) {
      console.error('Account creation failed:', error);
    }
  };

  // Mock API for demonstration
  const mockCreateAccountApi = async (email: string, password: string) => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // For demo purposes, consider test@example.com as already taken
    if (email === 'test@example.com') {
      return { success: false, error: 'EMAIL_EXISTS' };
    }
    return { success: true };
  };

  if (showUnavailable) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-gray-400 rounded-full"></div>
          </div>
          
          <h2 className="text-2xl font-bold text-center mb-4">Account Unavailable</h2>
          <p className="text-center mb-6">
            The account you requested is not available for use
          </p>
          
          <div className="text-center mb-4">
            <Link 
              href="/account/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          
          <Link 
            href="/login"
            className="block w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-center font-medium rounded-md"
          >
            Back to Login
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-8">
          <Link href="/" className="block w-16 h-16 bg-gray-400"></Link>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-6">Create your RedaQt account</h2>
        
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
            <p className="mt-1 text-xs text-gray-500">
              Password must be at least 8 characters with at least one number and one special character.
            </p>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>
          
          <div>
            <input
              type="password"
              {...register('confirmPassword')}
              placeholder="Confirm Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                {...register('agreeTerms')}
                className="w-4 h-4 border border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="text-gray-600">
                By creating this account, you agree to RedaQt's{' '}
                <Link href="/terms-of-service" className="text-blue-600 hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy-policy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
              </label>
              {errors.agreeTerms && (
                <p className="mt-1 text-sm text-red-600">{errors.agreeTerms.message}</p>
              )}
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Account
          </button>
        </form>
        
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