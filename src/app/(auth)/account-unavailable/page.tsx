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
