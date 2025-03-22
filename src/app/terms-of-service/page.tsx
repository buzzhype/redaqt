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
