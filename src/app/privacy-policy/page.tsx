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
