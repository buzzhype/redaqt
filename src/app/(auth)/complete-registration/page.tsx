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
