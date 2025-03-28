import Link from 'next/link';
import { Shield, Lock, Clock, Users, Search, FileText, BarChart } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 w-8 h-8 rounded-md flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">RedaQt</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              Features
            </Link>
            <Link href="#security" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              Security
            </Link>
            <Link href="#testimonials" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              Pricing
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              href="/login" 
              className="hidden md:inline-block text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              Log in
            </Link>
            <Link 
              href="/account/create-account" 
              className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:shadow-blue-700/20 transition-all"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute top-48 -left-24 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  <Lock className="w-4 h-4" />
                  <span>End-to-end Encryption</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                  Secure document management <span className="text-blue-600">simplified</span>
                </h1>
                <p className="mt-6 text-xl text-gray-500 max-w-xl">
                  Store, manage, and share your sensitive documents with military-grade security and intuitive workflows.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Link
                  href="/account/create-account"
                  className="px-8 py-4 rounded-lg text-center text-base font-medium text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 hover:shadow-blue-700/30 transition-all"
                >
                  Start Securely — It's Free
                </Link>
                <Link
                  href="#demo"
                  className="px-8 py-4 rounded-lg text-center text-base font-medium border-2 border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-700 transition-all"
                >
                  Watch Demo
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">99.9%</div>
                  <div className="text-sm text-gray-500">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">10k+</div>
                  <div className="text-sm text-gray-500">Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">AES-256</div>
                  <div className="text-sm text-gray-500">Encryption</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-400 transform rotate-3"></div>
              <div className="absolute -bottom-6 -right-6 w-full h-full rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 transform -rotate-3"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 p-2 rounded-md">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm text-gray-500">Document Classification</div>
                    <div className="text-lg font-semibold text-gray-900">Q1 Marketing Strategy.docx</div>
                  </div>
                  <div className="ml-auto">
                    <span className="px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">Confidential</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div className="flex items-center text-sm text-gray-600">
                      <Lock className="w-4 h-4 mr-2 text-green-500" />
                      Encrypted with AES-256
                    </div>
                    <div className="text-sm text-green-600 font-medium">Active</div>
                  </div>
                  
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2 text-blue-500" />
                      Shared with Team
                    </div>
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center border-2 border-white">JD</div>
                      <div className="w-6 h-6 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center border-2 border-white">MT</div>
                      <div className="w-6 h-6 rounded-full bg-green-500 text-white text-xs flex items-center justify-center border-2 border-white">KL</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-gray-500" />
                      Last modified
                    </div>
                    <div className="text-sm text-gray-700">2 hours ago</div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between">
                  <button className="px-3 py-2 bg-blue-50 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors">Access History</button>
                  <button className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">Open Document</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted By Section */}
      <div className="bg-white py-12 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-gray-500 uppercase tracking-wide mb-8">Trusted by companies worldwide</p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex justify-center items-center">
                <div className="h-8 w-32 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              Everything you need for document security
            </p>
            <p className="mt-4 text-xl text-gray-500">
              Our platform combines security with simplicity to give you the best document management experience.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Feature 1 */}
              <div className="group relative bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <div className="absolute -top-10 left-8 bg-blue-600 rounded-lg w-16 h-16 flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:bg-blue-700 transition-colors">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <div className="pt-8">
                  <h3 className="text-xl font-bold text-gray-900 mt-2">Military-grade Encryption</h3>
                  <p className="mt-4 text-gray-500 leading-relaxed">
                    AES-256 encryption ensures your documents are secure both at rest and in transit. Only authorized personnel can access classified content.
                  </p>
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <Link href="#" className="text-blue-600 font-medium flex items-center hover:text-blue-800 transition-colors">
                      Learn more
                      <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group relative bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <div className="absolute -top-10 left-8 bg-indigo-600 rounded-lg w-16 h-16 flex items-center justify-center shadow-lg shadow-indigo-600/30 group-hover:bg-indigo-700 transition-colors">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div className="pt-8">
                  <h3 className="text-xl font-bold text-gray-900 mt-2">Intelligent Version Control</h3>
                  <p className="mt-4 text-gray-500 leading-relaxed">
                    Track every change with automatic versioning. Compare versions and restore previous states with a single click.
                  </p>
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <Link href="#" className="text-blue-600 font-medium flex items-center hover:text-blue-800 transition-colors">
                      Learn more
                      <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group relative bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <div className="absolute -top-10 left-8 bg-purple-600 rounded-lg w-16 h-16 flex items-center justify-center shadow-lg shadow-purple-600/30 group-hover:bg-purple-700 transition-colors">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="pt-8">
                  <h3 className="text-xl font-bold text-gray-900 mt-2">Secure Collaboration</h3>
                  <p className="mt-4 text-gray-500 leading-relaxed">
                    Share documents with granular permissions. Control who can view, edit, or share your documents at any time.
                  </p>
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <Link href="#" className="text-blue-600 font-medium flex items-center hover:text-blue-800 transition-colors">
                      Learn more
                      <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div id="security" className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-base text-blue-300 font-semibold tracking-wide uppercase">Security First</h2>
            <p className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Your documents deserve the best protection
            </p>
            <p className="mt-4 text-xl text-blue-100">
              We've built RedaQt with security as the foundation, not as an afterthought.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
                <div className="flex items-center">
                  <Shield className="w-6 h-6 text-blue-300" />
                  <h3 className="text-lg font-bold ml-3">Classified Document Handling</h3>
                </div>
                <p className="mt-3 text-blue-100">
                  Four levels of classification from Public to Restricted, with automated security measures for each level.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
                <div className="flex items-center">
                  <Search className="w-6 h-6 text-blue-300" />
                  <h3 className="text-lg font-bold ml-3">Access Monitoring & Logging</h3>
                </div>
                <p className="mt-3 text-blue-100">
                  Full audit trails track who accessed documents, when, and what changes were made.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
                <div className="flex items-center">
                  <BarChart className="w-6 h-6 text-blue-300" />
                  <h3 className="text-lg font-bold ml-3">Compliance & Reporting</h3>
                </div>
                <p className="mt-3 text-blue-100">
                  Built-in compliance with GDPR, HIPAA, and other regulations with automated reporting.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl transform rotate-3 opacity-30 blur-lg"></div>
              <div className="relative bg-white/10 backdrop-blur-md text-white rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6">Security Classification Levels</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-red-900/30 rounded-lg">
                    <div className="w-4 h-4 rounded-full bg-red-500"></div>
                    <div className="ml-3">
                      <div className="font-semibold">Restricted</div>
                      <div className="text-sm text-blue-100">Highest level, limited to specific personnel</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-orange-900/30 rounded-lg">
                    <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                    <div className="ml-3">
                      <div className="font-semibold">Confidential</div>
                      <div className="text-sm text-blue-100">Sensitive information requiring protection</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-yellow-900/30 rounded-lg">
                    <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                    <div className="ml-3">
                      <div className="font-semibold">Internal</div>
                      <div className="text-sm text-blue-100">For internal company use only</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-green-900/30 rounded-lg">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    <div className="ml-3">
                      <div className="font-semibold">Public</div>
                      <div className="text-sm text-blue-100">Information that can be freely distributed</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/20">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-blue-200">Compliance certifications:</div>
                    <div className="flex space-x-3">
                      <div className="h-8 w-12 bg-white/20 rounded"></div>
                      <div className="h-8 w-12 bg-white/20 rounded"></div>
                      <div className="h-8 w-12 bg-white/20 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Ready to secure your documents?
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Start your free 14-day trial today. No credit card required.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link
              href="/account/create-account"
              className="px-8 py-3 rounded-lg bg-blue-600 text-white font-medium shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-medium hover:border-blue-600 hover:text-blue-700 transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2">
                <div className="bg-white w-8 h-8 rounded-md flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-xl font-bold text-white">RedaQt</span>
              </div>
              <p className="mt-4 text-gray-400">
                Secure document management for professionals and teams. Military-grade encryption with intuitive workflows.
              </p>
              <div className="mt-6 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858-.182-.466-.398-.8-.748-1.15-.35-.35-.683-.566-1.15-.748-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#features" className="text-gray-400 hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#security" className="text-gray-400 hover:text-white transition-colors">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-gray-400 hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#testimonials" className="text-gray-400 hover:text-white transition-colors">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="/changelog" className="text-gray-400 hover:text-white transition-colors">
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-gray-400 hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/security-policy" className="text-gray-400 hover:text-white transition-colors">
                    Security Policy
                  </Link>
                </li>
                <li>
                  <Link href="/gdpr" className="text-gray-400 hover:text-white transition-colors">
                    GDPR Compliance
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400">
                &copy; {new Date().getFullYear()} RedaQt. All rights reserved.
              </p>
              <div className="mt-4 md:mt-0">
                <div className="flex items-center space-x-4">
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Do Not Sell My Info
                  </Link>
                  <span className="text-gray-700">•</span>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Cookie Preferences
                  </Link>
                  <span className="text-gray-700">•</span>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Sitemap
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}