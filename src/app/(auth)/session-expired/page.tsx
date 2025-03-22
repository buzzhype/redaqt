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
