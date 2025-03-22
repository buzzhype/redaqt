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
