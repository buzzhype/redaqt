'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

// Define schema for registration token validation
const tokenSchema = z.object({
  token: z.string().min(1, { message: 'Token is required' }),
});

type TokenFormData = z.infer<typeof tokenSchema>;

export default function CompleteRegistrationClient({ token }: { token: string }) {
  const router = useRouter();
  const [tokenStatus, setTokenStatus] = useState<'validating' | 'valid' | 'invalid' | 'expired'>('validating');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TokenFormData>({
    resolver: zodResolver(tokenSchema),
    defaultValues: {
      token: token || '',
    }
  });

  useEffect(() => {
    const validateToken = async () => {
      try {
        const result = await mockValidateTokenApi(token);

        if (result.valid) {
          setTokenStatus('valid');
          setValue('token', token);
        } else if (result.expired) {
          setTokenStatus('expired');
        } else {
          setTokenStatus('invalid');
        }
      } catch (error) {
        console.error('Token validation failed:', error);
        setTokenStatus('invalid');
      }
    };

    validateToken();
  }, [token, setValue]);

  const onSubmit = async (data: TokenFormData) => {
    try {
      const result = await mockCompleteRegistrationApi(data.token);

      if (result.success) {
        router.push('/login?activated=true');
      } else if (result.expired) {
        setTokenStatus('expired');
      } else {
        setErrorMessage('Incorrect token, please retry');
      }
    } catch (error) {
      console.error('Registration completion failed:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  // Mock APIs
  const mockValidateTokenApi = async (token: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));

    if (token?.startsWith('expired')) {
      return { valid: false, expired: true };
    }

    if (token?.startsWith('valid')) {
      return { valid: true, expired: false };
    }

    return { valid: false, expired: false };
  };

  const mockCompleteRegistrationApi = async (token: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));

    if (token.startsWith('valid')) {
      return { success: true };
    }

    if (token.startsWith('expired')) {
      return { success: false, expired: true };
    }

    return { success: false };
  };

  if (tokenStatus === 'validating') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Validating your token...</p>
        </div>
      </div>
    );
  }

  if (tokenStatus === 'expired') {
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

  if (tokenStatus === 'invalid') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle size={40} className="text-red-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-4">Invalid Registration Token</h2>
          <p className="text-center text-red-600 mb-6">
            The registration token is invalid or has been already used. Please check the link in your email or start over.
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
            <CheckCircle2 size={40} className="text-blue-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Complete Registration</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              {...register('token')}
              placeholder="Token"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.token && (
              <p className="mt-1 text-sm text-red-600">{errors.token.message}</p>
            )}
          </div>
          {errorMessage && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : 'Complete Registration'}
          </button>
        </form>
      </div>
    </div>
  );
}
