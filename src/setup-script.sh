#!/bin/bash

# RedaQt Setup Script
# This script creates the necessary files for the RedaQt web application
# based on the design document v2.1.0

echo "🚀 Starting RedaQt setup process..."

# Create directories
mkdir -p src/app/"(auth)"
mkdir -p src/app/"(auth)"/login
mkdir -p src/app/"(auth)"/create-account
mkdir -p src/app/"(auth)"/forgot-password
mkdir -p src/app/"(auth)"/complete-registration
mkdir -p src/app/"(auth)"/account-unavailable
mkdir -p src/app/"(auth)"/session-expired
mkdir -p src/app/"(dashboard)"
mkdir -p src/app/404
mkdir -p src/app/terms-of-service
mkdir -p src/app/privacy-policy
mkdir -p src/components/auth
mkdir -p src/lib/auth
mkdir -p src/lib/utils
mkdir -p src/lib/email
mkdir -p src/contexts

echo "📁 Created directory structure"

# Create the main layout file for auth pages
cat > "src/app/(auth)/layout.tsx" << 'EOF'
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
EOF

# Create login page
cat > "src/app/(auth)/login/page.tsx" << 'EOF'
"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would call an API endpoint
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Username or password entered is incorrect");
      }

      // Redirect to dashboard on success
      window.location.href = "/dashboard";
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="rounded-lg border bg-white p-8 shadow-sm">
      <div className="mb-5 flex justify-center">
        <Link href="/">
          <div className="h-12 w-12 bg-gray-400">
            {/* This would be replaced with the actual logo */}
          </div>
        </Link>
      </div>
      
      <h1 className="mb-6 text-center text-2xl font-semibold">Sign in to RedaQt</h1>
      
      {error && (
        <div className="mb-5 rounded bg-red-50 p-4 text-red-600">
          <p>{error}</p>
          <Button 
            variant="link" 
            className="p-0 text-red-600" 
            onClick={() => setError(null)}
          >
            Try again
          </Button>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="text-right">
            <Link 
              href="/forgot-password" 
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>
      
      <div className="mt-6 text-center text-sm">
        <p>
          New to RedaQt?{" "}
          <Link href="/create-account" className="text-blue-600 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
EOF

# Create create account page
cat > "src/app/(auth)/create-account/page.tsx" << 'EOF'
"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" }),
  confirmPassword: z.string(),
  agreeTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the Terms of Service and Privacy Policy",
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function CreateAccountPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would call an API endpoint
      const response = await fetch("/api/auth/create-account", {
        method: "POST",
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          agreement_terms: values.agreeTerms,
          agreement_policy: values.agreeTerms,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const data = await response.json();
        if (response.status === 409) {
          // Account already exists
          window.location.href = "/account-unavailable";
          return;
        }
        throw new Error(data.message || "Failed to create account");
      }

      // Redirect to email verification notice page
      window.location.href = "/complete-registration";
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="rounded-lg border bg-white p-8 shadow-sm">
      <div className="mb-5 flex justify-center">
        <Link href="/">
          <div className="h-12 w-12 bg-gray-400">
            {/* This would be replaced with the actual logo */}
          </div>
        </Link>
      </div>
      
      <h1 className="mb-6 text-center text-2xl font-semibold">Create your RedaQt account</h1>
      
      {error && (
        <div className="mb-5 rounded bg-red-50 p-4 text-red-600">
          <p>{error}</p>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                    type="password" 
                    placeholder="Password" 
                    {...field} 
                  />
                </FormControl>
                <div className="text-xs text-gray-500">
                  Password must be at least 8 characters.
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                    type="password" 
                    placeholder="Confirm Password" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="agreeTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="text-sm">
                  By creating this account, you agree to RedaQt's{" "}
                  <Link href="/terms-of-service" className="text-blue-600 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy-policy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </Link>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
      </Form>
      
      <div className="mt-6 text-center text-sm">
        <p>
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
EOF

# Create forgot password page
cat > "src/app/(auth)/forgot-password/page.tsx" << 'EOF'
"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    try {
      // In a real implementation, this would call an API endpoint
      await fetch("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      // Always show success regardless of whether email exists for security
      setIsSubmitted(true);
    } catch (error) {
      // Still show success even on error for security
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="rounded-lg border bg-white p-8 shadow-sm">
      <div className="mb-5 flex justify-center">
        <Link href="/">
          <div className="h-12 w-12 bg-gray-400">
            {/* This would be replaced with the actual logo */}
          </div>
        </Link>
      </div>
      
      <h1 className="mb-6 text-center text-2xl font-semibold">RedaQt</h1>
      
      {!isSubmitted ? (
        <>
          <p className="mb-6 text-center text-gray-600">
            A recovery link will be sent to the email address on file
          </p>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Email Link"}
              </Button>
            </form>
          </Form>
        </>
      ) : (
        <div className="text-center">
          <h2 className="mb-4 text-xl font-medium text-green-600">Recovery Link Sent</h2>
          <p className="mb-6 text-gray-600">
            If an account exists with this email, we've sent instructions to reset your password.
          </p>
        </div>
      )}
      
      <div className="mt-6 text-center">
        <Link 
          href="/login" 
          className="text-sm text-blue-600 hover:underline"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}
EOF

# Create complete registration page
cat > "src/app/(auth)/complete-registration/page.tsx" << 'EOF'
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CompleteRegistrationPage() {
  const searchParams = useSearchParams();
  const routing = searchParams.get("routing");
  
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Check if the token is expired
  useEffect(() => {
    const checkRouting = async () => {
      if (!routing) return;
      
      try {
        const response = await fetch(`/api/auth/check-routing?routing=${routing}`);
        if (!response.ok && response.status === 410) {
          // Routing expired
          window.location.href = "/session-expired";
        }
      } catch (error) {
        console.error("Error checking routing", error);
      }
    };
    
    checkRouting();
  }, [routing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch("/api/auth/complete-registration", {
        method: "POST",
        body: JSON.stringify({ token, routing }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const data = await response.json();
        if (response.status === 410) {
          // Token expired
          window.location.href = "/session-expired";
          return;
        }
        throw new Error(data.message || "Invalid token, please try again");
      }

      setIsCompleted(true);
      // Redirect to login after a short delay
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!routing) {
    return (
      <div className="rounded-lg border bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-center text-2xl font-semibold">Invalid Registration Link</h1>
        <p className="mb-6 text-center text-gray-600">
          The registration link is invalid. Please try creating an account again.
        </p>
        <div className="text-center">
          <Link href="/create-account">
            <Button>Back to Create Account</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-white p-8 shadow-sm">
      <div className="mb-5 flex justify-center">
        <Link href="/">
          <div className="h-12 w-12 bg-gray-400">
            {/* This would be replaced with the actual logo */}
          </div>
        </Link>
      </div>
      
      <h1 className="mb-6 text-center text-2xl font-semibold">Complete Registration</h1>
      
      {error && (
        <div className="mb-5 rounded bg-red-50 p-4 text-red-600">
          <p>{error}</p>
        </div>
      )}

      {isCompleted ? (
        <div className="text-center">
          <h2 className="mb-4 text-xl font-medium text-green-600">Account Activated!</h2>
          <p className="mb-6 text-gray-600">
            Your account has been successfully activated. Redirecting to login...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? "Completing..." : "Complete"}
          </Button>
        </form>
      )}
    </div>
  );
}
EOF

# Create account unavailable page
cat > "src/app/(auth)/account-unavailable/page.tsx" << 'EOF'
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AccountUnavailablePage() {
  return (
    <div className="rounded-lg border bg-white p-8 shadow-sm">
      <div className="mb-5 flex justify-center">
        <Link href="/">
          <div className="h-12 w-12 bg-gray-400">
            {/* This would be replaced with the actual logo */}
          </div>
        </Link>
      </div>
      
      <h1 className="mb-6 text-center text-2xl font-semibold">Account Unavailable</h1>
      
      <p className="mb-6 text-center text-gray-600">
        The account you requested is not available for use.
      </p>
      
      <div className="space-y-4">
        <Link href="/forgot-password">
          <Button variant="link" className="w-full">
            Forgot password?
          </Button>
        </Link>
        
        <Link href="/login">
          <Button className="w-full">
            Back to Login
          </Button>
        </Link>
      </div>
      
      <div className="mt-6 text-center text-sm">
        <p>
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
EOF

# Create session expired page
cat > "src/app/(auth)/session-expired/page.tsx" << 'EOF'
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SessionExpiredPage() {
  return (
    <div className="rounded-lg border bg-white p-8 shadow-sm">
      <div className="mb-5 flex justify-center">
        <Link href="/">
          <div className="h-12 w-12 bg-gray-400">
            {/* This would be replaced with the actual logo */}
          </div>
        </Link>
      </div>
      
      <h1 className="mb-6 text-center text-2xl font-semibold">Account Activation Session Expired</h1>
      
      <p className="mb-6 text-center text-gray-600">
        The account setup was not completed in time and the session has expired. You must create account again.
      </p>
      
      <Link href="/create-account">
        <Button className="w-full">
          Back to Create Account
        </Button>
      </Link>
    </div>
  );
}
EOF

# Create 404 page
cat > src/app/404/page.tsx << 'EOF'
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Custom404Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50">
      <div className="w-full max-w-md rounded-lg border bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-center text-9xl font-bold text-gray-800">404</h1>
        <p className="mb-6 text-center text-2xl font-semibold">Page Not Found!</p>
        
        <div className="flex justify-center">
          <Link href="/">
            <Button>
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
EOF

# Create terms of service page
cat > src/app/terms-of-service/page.tsx << 'EOF'
import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-center">
        <Link href="/" className="mr-4">
          <div className="h-8 w-8 bg-gray-400">
            {/* This would be replaced with the actual logo */}
          </div>
        </Link>
        <h1 className="text-3xl font-bold">Terms of Service</h1>
      </div>
      
      <div className="prose max-w-none">
        <p>Version Date: March 15, 2024</p>
        
        <h2>1. Introduction</h2>
        <p>
          Welcome to RedaQt. By using our service, you agree to these Terms of Service. 
          Please read them carefully.
        </p>
        
        <h2>2. Using our Services</h2>
        <p>
          You must follow any policies made available to you within the Services.
          Don't misuse our Services. For example, don't interfere with our Services or try to access them using a method other than the interface and the instructions that we provide.
        </p>
        
        <h2>3. Your Account</h2>
        <p>
          You may need an account to use some of our Services. You are responsible for safeguarding your account.
        </p>
        
        <h2>4. Privacy and Copyright Protection</h2>
        <p>
          Our privacy policies explain how we treat your personal data and protect your privacy when you use our Services.
        </p>
        
        <h2>5. Modifying and Terminating our Services</h2>
        <p>
          We are constantly changing and improving our Services. We may add or remove functionalities or features, and we may suspend or stop a Service altogether.
        </p>
        
        <h2>6. Liability for our Services</h2>
        <p>
          When permitted by law, RedaQt will not be responsible for lost profits, revenues, or data, financial losses or indirect, special, consequential, exemplary, or punitive damages.
        </p>
        
        <h2>7. Business uses of our Services</h2>
        <p>
          If you are using our Services on behalf of a business, that business accepts these terms.
        </p>
        
        <h2>8. About these Terms</h2>
        <p>
          We may modify these terms or any additional terms that apply to a Service. You should look at the terms regularly.
        </p>
      </div>
    </div>
  );
}
EOF

# Create privacy policy page
cat > src/app/privacy-policy/page.tsx << 'EOF'
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-center">
        <Link href="/" className="mr-4">
          <div className="h-8 w-8 bg-gray-400">
            {/* This would be replaced with the actual logo */}
          </div>
        </Link>
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
      </div>
      
      <div className="prose max-w-none">
        <p>Version Date: March 15, 2024</p>
        
        <h2>1. Introduction</h2>
        <p>
          This Privacy Policy explains how RedaQt collects, uses, and shares your information when you use our service.
        </p>
        
        <h2>2. Information We Collect</h2>
        <p>
          We collect information you provide directly to us, such as your name, email address, and any other information you choose to provide.
        </p>
        
        <h2>3. How We Use Information</h2>
        <p>
          We use the information we collect to provide, maintain, and improve our services, to process transactions, send communications, and for other purposes.
        </p>
        
        <h2>4. Sharing of Information</h2>
        <p>
          We do not share your personal information with companies, organizations, or individuals outside of RedaQt except in the following cases: with your consent, for legal reasons, or to service providers.
        </p>
        
        <h2>5. Security</h2>
        <p>
          We use reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.
        </p>
        
        <h2>6. Your Choices</h2>
        <p>
          You may update, correct, or delete your account information at any time by logging into your account.
        </p>
        
        <h2>7. Changes to this Privacy Policy</h2>
        <p>
          We may change this Privacy Policy from time to time. We will post any changes on this page.
        </p>
        
        <h2>8. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at privacy@redaqt.co.
        </p>
      </div>
    </div>
  );
}
EOF

# Create dashboard page
cat > "src/app/(dashboard)/dashboard/page.tsx" << 'EOF'
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto flex justify-between p-4">
          <div className="flex items-center">
            <div className="mr-2 h-8 w-8 bg-gray-400">
              {/* This would be replaced with the actual logo */}
            </div>
            <h1 className="text-xl font-semibold">RedaQt Dashboard</h1>
          </div>
          
          <div>
            <Link href="/api/auth/logout">
              <Button variant="outline">Logout</Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">Welcome to Your Dashboard</h2>
            <p className="text-gray-600">
              This is a placeholder for the RedaQt dashboard. Additional features and content would be added here.
            </p>
          </div>
          
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">Recent Activity</h2>
            <p className="text-gray-600">
              Your recent activity would appear here.
            </p>
          </div>
          
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">Quick Actions</h2>
            <div className="space-y-2">
              <Button className="w-full">Create New Item</Button>
              <Button variant="outline" className="w-full">View Reports</Button>
              <Button variant="outline" className="w-full">Account Settings</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
EOF

# Create API login route
cat > src/app/api/auth/login/route.ts << 'EOF'
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // This is a mock implementation
    // In a real app, you would:
    // 1. Check if the user exists in your database
    // 2. Verify the password hash matches
    // 3. Create a session or JWT token
    
    // Simulating authentication check
    if (email === "test@example.com" && password === "Password123!") {
      // Successful login
      const response = NextResponse.json(
        { message: "Login successful" },
        { status: 200 }
      );
      
      // Set secure HTTP-only cookie (simulated)
      response.cookies.set({
        name: "auth_token",
        value: "mocked_jwt_token",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      });
      
      return response;
    }

    // Failed login
    return NextResponse.json(
      { message: "Username or password entered is incorrect" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "An error occurred during login" },
      { status: 500 }
    );
  }
}
EOF

# Create API create-account route
cat > src/app/api/auth/create-account/route.ts << 'EOF'
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password, agreement_terms, agreement_policy } = await request.json();

    // This is a mock implementation
    // In a real app, you would:
    // 1. Check if the user already exists
    // 2. Hash the password
    // 3. Store the user in your database
    // 4. Generate a verification token
    // 5. Send a verification email
    
    // Simulation: Check if email already exists
    if (email === "existing@example.com") {
      return NextResponse.json(
        { message: "Account already exists" },
        { status: 409 }
      );
    }

    // Simulating successful account creation
    return NextResponse.json(
      { 
        message: "Account created successfully", 
        routing: "mocked_routing_token"
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Account creation error:", error);
    return NextResponse.json(
      { message: "An error occurred during account creation" },
      { status: 500 }
    );
  }
}
EOF

# Create API forgot-password route
cat > src/app/api/auth/forgot-password/route.ts << 'EOF'
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // This is a mock implementation
    // In a real app, you would:
    // 1. Check if the user exists (but don't reveal this)
    // 2. Generate a reset token
    // 3. Store the token with an expiration time
    // 4. Send a password reset email
    
    // For security, always return success regardless of whether the email exists
    return NextResponse.json(
      { message: "If an account with that email exists, a password reset link has been sent" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Password reset error:", error);
    // Still return 200 for security reasons
    return NextResponse.json(
      { message: "If an account with that email exists, a password reset link has been sent" },
      { status: 200 }
    );
  }
}
EOF

# Create API check-routing route
cat > src/app/api/auth/check-routing/route.ts << 'EOF'
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const routing = searchParams.get("routing");

    // This is a mock implementation
    // In a real app, you would:
    // 1. Verify the routing token exists in your database
    // 2. Check if it has expired
    
    // Simulation: Expired token
    if (routing === "expired_token") {
      return NextResponse.json(
        { message: "Routing token has expired" },
        { status: 410 }
      );
    }

    // Valid token
    return NextResponse.json(
      { message: "Routing token is valid" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Check routing error:", error);
    return NextResponse.json(
      { message: "An error occurred checking the routing token" },
      { status: 500 }
    );
  }
}
EOF

# Create API complete-registration route
cat > src/app/api/auth/complete-registration/route.ts << 'EOF'
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { token, routing } = await request.json();

    // This is a mock implementation
    // In a real app, you would:
    // 1. Verify the routing and token combination
    // 2. Activate the user account
    // 3. Remove the token from the database
    
    // Simulation: Invalid token
    if (token === "invalid") {
      return NextResponse.json(
        { message: "Invalid token, please try again" },
        { status: 400 }
      );
    }

    // Simulation: Expired token
    if (token === "expired") {
      return NextResponse.json(
        { message: "Token has expired" },
        { status: 410 }
      );
    }

    // Valid token
    return NextResponse.json(
      { message: "Account activated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Complete registration error:", error);
    return NextResponse.json(
      { message: "An error occurred during account activation" },
      { status: 500 }
    );
  }
}
EOF

# Create API logout route
cat > src/app/api/auth/logout/route.ts << 'EOF'
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  // Clear the auth cookie
  cookies().delete("auth_token");
  
  // Redirect to login page
  return NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"));
}
EOF

# Create auth utilities
cat > src/lib/auth/token.ts << 'EOF'
import { randomBytes, createHash } from "crypto";

/**
 * Generate a secure random token
 * @returns The generated token
 */
export function generateToken(): string {
  return randomBytes(32).toString("hex");
}

/**
 * Hash a token for secure storage
 * @param token The token to hash
 * @returns The hashed token
 */
export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/**
 * Verify if a provided token matches a stored hash
 * @param token The token to verify
 * @param hash The hash to compare against
 * @returns Whether the token is valid
 */
export function verifyToken(token: string, hash: string): boolean {
  const tokenHash = hashToken(token);
  return tokenHash === hash;
}
EOF

# Create email utilities
cat > src/lib/email/send-email.ts << 'EOF'
/**
 * Send an email (mock implementation)
 * @param to Recipient email address
 * @param subject Email subject
 * @param text Plain text content
 * @param html HTML content
 * @returns Success status
 */
export async function sendEmail({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text: string;
  html: string;
}): Promise<{ success: boolean }> {
  // This is a mock implementation
  // In a real app, you would integrate with an email service like SendGrid, Mailgun, etc.
  
  console.log(`Email sent to: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Text: ${text}`);
  
  // Simulate successful email sending
  return { success: true };
}

/**
 * Send a verification email
 * @param to Recipient email address
 * @param token Verification token
 * @param routing Routing token
 * @returns Success status
 */
export async function sendVerificationEmail(
  to: string,
  token: string,
  routing: string
): Promise<{ success: boolean }> {
  const subject = "RedaQt Account Setup";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const verificationUrl = `${appUrl}/complete-registration?routing=${routing}`;
  
  const text = `
    Complete Account Setup

    Thanks for creating a RedaQt account.
    
    Your verification token is: ${token}
    
    Please use this token at ${verificationUrl} to complete your registration.
    
    This link will expire in 24 hours.
    
    Thanks,
    The RedaQt Team
  `;
  
  const html = `
    <h1>Complete Account Setup</h1>
    
    <p>Thanks for creating a RedaQt account.</p>
    
    <p>Your verification token is: <strong>${token}</strong></p>
    
    <p>Please use this token at <a href="${verificationUrl}">this link</a> to complete your registration.</p>
    
    <p>This link will expire in 24 hours.</p>
    
    <p>Thanks,<br>The RedaQt Team</p>
  `;
  
  return sendEmail({ to, subject, text, html });
}

/**
 * Send a password reset email
 * @param to Recipient email address
 * @param token Reset token
 * @returns Success status
 */
export async function sendPasswordResetEmail(
  to: string,
  token: string
): Promise<{ success: boolean }> {
  const subject = "RedaQt Password Reset";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const resetUrl = `${appUrl}/reset-password?token=${token}`;
  
  const text = `
    Reset Your Password

    Someone requested a password reset for your RedaQt account.
    
    If this was you, please click the link below to reset your password:
    ${resetUrl}
    
    This link will expire in 1 hour.
    
    If you didn't request this, you can safely ignore this email.
    
    Thanks,
    The RedaQt Team
  `;
  
  const html = `
    <h1>Reset Your Password</h1>
    
    <p>Someone requested a password reset for your RedaQt account.</p>
    
    <p>If this was you, please click the link below to reset your password:</p>
    
    <p><a href="${resetUrl}">Reset Password</a></p>
    
    <p>This link will expire in 1 hour.</p>
    
    <p>If you didn't request this, you can safely ignore this email.</p>
    
    <p>Thanks,<br>The RedaQt Team</p>
  `;
  
  return sendEmail({ to, subject, text, html });
}
EOF

echo "📄 Created API routes"

# Enhancing the setup by adding an uninstall feature and better messages

cat > enhanced-setup-script.sh << 'EOF'
#!/bin/bash

# RedaQt Enhanced Setup Script
# This script will update and configure the RedaQt application

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 RedaQt Enhanced Setup${NC}"
echo -e "${YELLOW}This script will configure your RedaQt application with additional features${NC}"

# Check if setup-script.sh exists and is executable
if [ ! -f "src/setup-script.sh" ]; then
  echo -e "${RED}❌ Error: setup-script.sh not found in src/ directory${NC}"
  echo -e "Please run this script after placing setup-script.sh in the src/ directory"
  exit 1
fi

# Make sure the base setup script is executable
chmod +x src/setup-script.sh

# Run the base setup script
echo -e "${YELLOW}Running base setup script...${NC}"
cd src && ./setup-script.sh
cd ..

echo -e "${GREEN}✅ Base setup completed${NC}"

# Create the authentication context
echo -e "${BLUE}Creating authentication context...${NC}"

mkdir -p src/contexts

cat > src/contexts/auth-context.tsx << 'AUTH_CONTEXT_EOF'
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user is logged in
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("Authentication check failed", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed");
      }

      const data = await response.json();
      setUser(data.user);
      
      // Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    
    try {
      await fetch("/api/auth/logout");
      setUser(null);
      
      // Redirect to login
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      const response = await fetch("/api/auth/create-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, agreement_terms: true, agreement_policy: true }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Registration failed");
      }
      
      // Registration successful - the user will need to verify their email
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
AUTH_CONTEXT_EOF

echo -e "${GREEN}✅ Authentication context created${NC}"

# Create middleware for auth protection
echo -e "${BLUE}Creating middleware for route protection...${NC}"

cat > src/middleware.ts << 'MIDDLEWARE_EOF'
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Paths that don't require authentication
const publicPaths = [
  "/login",
  "/create-account",
  "/forgot-password",
  "/reset-password",
  "/complete-registration",
  "/account-unavailable",
  "/session-expired",
  "/terms-of-service",
  "/privacy-policy",
  "/404",
];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Check if the path is public
  const isPublicPath = publicPaths.some(publicPath => 
    path === publicPath || path.startsWith("/api/auth/") || path.startsWith("/_next/")
  );
  
  // Get the authentication token from the cookies
  const authToken = request.cookies.get("auth_token")?.value;
  
  // If the path requires authentication and there's no token, redirect to login
  if (!isPublicPath && !authToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  // If the user is authenticated and trying to access a login page, redirect to dashboard
  if (authToken && (path === "/login" || path === "/create-account")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
MIDDLEWARE_EOF

echo -e "${GREEN}✅ Middleware created${NC}"

# Create an uninstall script
echo -e "${BLUE}Creating uninstall script...${NC}"

cat > uninstall-redaqt.sh << 'UNINSTALL_EOF'
#!/bin/bash

# RedaQt Uninstall Script
# This script will remove all RedaQt-specific files

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${YELLOW}⚠️  Warning: This will remove all RedaQt-specific files${NC}"
echo -e "${YELLOW}Are you sure you want to continue? (y/n)${NC}"
read -r response

if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
  echo -e "${BLUE}Starting uninstall process...${NC}"
  
  # Remove auth-related directories
  rm -rf src/app/"(auth)"
  rm -rf src/app/terms-of-service
  rm -rf src/app/privacy-policy
  rm -rf src/app/api/auth
  rm -rf src/contexts
  rm -rf src/lib/auth
  rm -rf src/lib/email
  
  # Remove setup scripts
  rm -f src/setup-script.sh
  rm -f enhanced-setup-script.sh
  rm -f src/middleware.ts
  
  echo -e "${GREEN}✅ RedaQt files have been removed${NC}"
else
  echo -e "${BLUE}Uninstall cancelled${NC}"
fi

# Remove this script itself
echo -e "${YELLOW}Do you want to remove this uninstall script as well? (y/n)${NC}"
read -r response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
  rm -- "$0"
  echo -e "${GREEN}✅ Uninstall script removed${NC}"
fi
UNINSTALL_EOF

chmod +x uninstall-redaqt.sh

echo -e "${GREEN}✅ Uninstall script created${NC}"

# Display completion message
echo -e "\n${GREEN}✅ RedaQt setup completed successfully!${NC}"
echo -e "${BLUE}Files created:${NC}"
echo -e "  - Authentication pages (login, create account, forgot password, etc.)"
echo -e "  - API routes for authentication"
echo -e "  - Authentication context"
echo -e "  - Middleware for route protection"
echo -e "  - Uninstall script (uninstall-redaqt.sh)"

echo -e "\n${YELLOW}Next steps:${NC}"
echo -e "1. Start your development server: ${BLUE}npm run dev${NC} or ${BLUE}yarn dev${NC}"
echo -e "2. Visit http://localhost:3000/login to view the login page"
echo -e "3. Customize the pages to match your design requirements"
echo -e "4. Implement actual backend functionality for the authentication API routes"

echo -e "\n${YELLOW}To remove RedaQt files, run:${NC} ${BLUE}./uninstall-redaqt.sh${NC}"
EOF

chmod +x enhanced-setup-script.sh

echo "🔧 Created enhanced setup script"

# Create additional utility files

# Create a common auth provider module
cat > src/lib/auth/provider.ts << 'EOF'
/**
 * Authentication provider types and utilities
 */

export type AuthProvider = "email" | "google" | "github" | "azureAD";

/**
 * Authentication session
 */
export interface AuthSession {
  user: {
    id: string;
    email: string;
    name?: string;
  };
  expires: Date;
}

/**
 * Auth user with additional metadata
 */
export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  emailVerified?: Date;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Check if a session is valid (not expired)
 */
export function isValidSession(session?: AuthSession | null): boolean {
  if (!session) return false;
  
  const now = new Date();
  return session.expires > now;
}
EOF

# Create a utility for password handling
cat > src/lib/auth/password.ts << 'EOF'
import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

/**
 * Generate a salt for password hashing
 */
export function generateSalt(): string {
  return randomBytes(16).toString("hex");
}

/**
 * Hash a password with a salt
 */
export function hashPassword(password: string, salt: string): string {
  return scryptSync(password, salt, 64).toString("hex");
}

/**
 * Verify a password against a hash and salt
 */
export function verifyPassword(
  password: string,
  hash: string,
  salt: string
): boolean {
  const inputHash = scryptSync(password, salt, 64);
  const storedHash = Buffer.from(hash, "hex");
  
  return storedHash.length === inputHash.length && 
    timingSafeEqual(inputHash, storedHash);
}

/**
 * Check if a password meets security requirements
 */
export function isStrongPassword(password: string): boolean {
  // At least 8 characters, one number, one special character
  const passwordRegex = /^(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/;
  return passwordRegex.test(password);
}
EOF

# Create zod validation schemas
cat > src/lib/validations/auth.ts << 'EOF'
import * as z from "zod";

/**
 * Login form schema
 */
export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

/**
 * Registration form schema
 */
export const registerSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" }),
  confirmPassword: z.string(),
  agreeTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the Terms of Service and Privacy Policy",
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

/**
 * Forgot password form schema
 */
export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

/**
 * Reset password form schema
 */
export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

/**
 * Complete registration form schema
 */
export const completeRegistrationSchema = z.object({
  token: z.string().min(1, { message: "Token is required" }),
});
EOF

echo "📚 Created additional auth utilities"

echo "🎉 Setup script completed successfully. You can now run the 'enhanced-setup-script.sh' to finish the configuration."
echo "   After running the enhanced script, start your application with 'npm run dev' or 'yarn dev'."