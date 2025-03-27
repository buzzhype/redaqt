'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  FileText, 
  FolderClosed, 
  Users, 
  Settings, 
  Search, 
  Bell, 
  LogOut, 
  Plus, 
  ChevronDown, 
  Clock,
  UserCircle2,
  Lock,
  Unlock,
  Shield,
  FileCheck,
  Share2,
  X,
  Info,
  HelpCircle,
  AlertCircle,
  Eye,
  EyeOff,
  CheckCircle,
  FileWarning,
  ExternalLink,
  FileSpreadsheet,
  FileImage,
  MoreVertical,
  AlertTriangle,
  Download,
  Upload
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showEncryptionModal, setShowEncryptionModal] = useState(false);
  const [showDecryptionModal, setShowDecryptionModal] = useState(false);
  const [encryptionProgress, setEncryptionProgress] = useState(0);
  const [decryptionProgress, setDecryptionProgress] = useState(0);
  const [showEncryptionHelp, setShowEncryptionHelp] = useState(false);
  const [processingDocument, setProcessingDocument] = useState(null);
  const [documentActionMenuId, setDocumentActionMenuId] = useState(null);
  const [sortBy, setSortBy] = useState('name');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Sample document data
  const [documents, setDocuments] = useState([
    { 
      id: 1, 
      name: 'Q1 Marketing Strategy.docx', 
      encrypted: true, 
      lastModified: '2 hours ago',
      size: '2.4 MB',
      type: 'Word Document',
      sharedWith: [],
      classification: 'Confidential'
    },
    { 
      id: 2, 
      name: 'Annual Budget Overview.xlsx', 
      encrypted: true, 
      lastModified: 'Yesterday',
      size: '1.8 MB',
      type: 'Excel Spreadsheet',
      sharedWith: ['Jane Smith', 'Mark Taylor'],
      classification: 'Restricted'
    },
    { 
      id: 3, 
      name: 'Project Timeline.pdf', 
      encrypted: false, 
      lastModified: '3 days ago',
      size: '5.2 MB',
      type: 'PDF Document',
      sharedWith: ['Jane Smith', 'Mark Taylor', 'Sarah Johnson', 'David Brown'],
      classification: 'Confidential'
    },
    { 
      id: 4, 
      name: 'Client Meeting Notes.docx', 
      encrypted: false, 
      lastModified: '1 week ago',
      size: '1.1 MB',
      type: 'Word Document',
      sharedWith: [],
      classification: 'Internal'
    },
    { 
      id: 5, 
      name: 'Company Logo Design.png', 
      encrypted: false, 
      lastModified: '2 weeks ago',
      size: '4.5 MB',
      type: 'Image',
      sharedWith: [],
      classification: 'Public'
    }
  ]);
  
  // Simulating auth check and data loading
  useEffect(() => {
    const checkAuth = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      setIsLoading(false);
    };
    
    checkAuth();
  }, [router]);
  
  // Encryption process simulation
  useEffect(() => {
    if (showEncryptionModal && encryptionProgress < 100) {
      const timer = setTimeout(() => {
        setEncryptionProgress(prev => prev + 10);
      }, 300);
      return () => clearTimeout(timer);
    } else if (showEncryptionModal && encryptionProgress === 100) {
      setTimeout(() => {
        if (processingDocument) {
          setDocuments(documents.map(doc => 
            doc.id === processingDocument.id ? { ...doc, encrypted: true } : doc
          ));
        }
        setShowEncryptionModal(false);
        setEncryptionProgress(0);
        setProcessingDocument(null);
      }, 1000);
    }
  }, [showEncryptionModal, encryptionProgress, processingDocument, documents]);
  
  // Decryption process simulation
  useEffect(() => {
    if (showDecryptionModal && decryptionProgress < 100) {
      const timer = setTimeout(() => {
        setDecryptionProgress(prev => prev + 20);
      }, 300);
      return () => clearTimeout(timer);
    } else if (showDecryptionModal && decryptionProgress === 100) {
      setTimeout(() => {
        if (processingDocument) {
          setDocuments(documents.map(doc => 
            doc.id === processingDocument.id ? { ...doc, encrypted: false } : doc
          ));
        }
        setShowDecryptionModal(false);
        setDecryptionProgress(0);
        setProcessingDocument(null);
      }, 1000);
    }
  }, [showDecryptionModal, decryptionProgress, processingDocument, documents]);
  
  // Document click outside handler for closing the action menu
  useEffect(() => {
    const handleClickOutside = () => {
      setDocumentActionMenuId(null);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  
  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
    if (showNotifications) setShowNotifications(false);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showUserMenu) setShowUserMenu(false);
  };

  const handleSignOut = () => {
    router.push('/login');
  };
  
  const simulateEncryption = (document) => {
    setProcessingDocument(document);
    setShowEncryptionModal(true);
    setEncryptionProgress(0);
  };
  
  const simulateDecryption = (document) => {
    setProcessingDocument(document);
    setShowDecryptionModal(true);
    setDecryptionProgress(0);
  };
  
  const toggleDocumentActionMenu = (e, documentId) => {
    e.stopPropagation();
    if (documentActionMenuId === documentId) {
      setDocumentActionMenuId(null);
    } else {
      setDocumentActionMenuId(documentId);
    }
  };
  
  const getClassificationBadgeColor = (classification) => {
    switch (classification.toLowerCase()) {
      case 'restricted':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'confidential':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'internal':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'public':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  const countEncryptedDocuments = () => {
    return documents.filter(doc => doc.encrypted).length;
  };
  
  const countDecryptedDocuments = () => {
    return documents.filter(doc => !doc.encrypted).length;
  };
  
  const getFilteredDocuments = () => {
    let filteredDocs = [...documents];
    
    // Apply status filter
    if (filterStatus === 'encrypted') {
      filteredDocs = filteredDocs.filter(doc => doc.encrypted);
    } else if (filterStatus === 'decrypted') {
      filteredDocs = filteredDocs.filter(doc => !doc.encrypted);
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredDocs = filteredDocs.filter(doc => 
        doc.name.toLowerCase().includes(query) || 
        doc.classification.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'name':
        filteredDocs.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'type':
        filteredDocs.sort((a, b) => a.type.localeCompare(b.type));
        break;
      case 'classification':
        filteredDocs.sort((a, b) => a.classification.localeCompare(b.classification));
        break;
      case 'status':
        filteredDocs.sort((a, b) => Number(b.encrypted) - Number(a.encrypted));
        break;
      default:
        break;
    }
    
    return filteredDocs;
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your secure workspace...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-6">
          <Link href="/" className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center mr-2">
              <Shield size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">RedaQt</span>
          </Link>
        </div>
        
        <nav className="mt-6">
          <div className="px-4 mb-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Document Security
            </p>
          </div>
          <a href="#" className="flex items-center px-6 py-3 text-gray-700 bg-blue-50 border-r-4 border-blue-600">
            <Shield size={20} className="text-blue-600" />
            <span className="mx-3 font-medium">Secure Documents</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
            <Lock size={20} />
            <span className="mx-3">Encrypted Files</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
            <FolderClosed size={20} />
            <span className="mx-3">All Files</span>
          </a>

          <div className="px-4 mt-6 mb-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Collaboration
            </p>
          </div>
          <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
            <Users size={20} />
            <span className="mx-3">Shared with Me</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
            <Share2 size={20} />
            <span className="mx-3">My Shared Files</span>
          </a>

          <div className="px-4 mt-6 mb-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Settings
            </p>
          </div>
          <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
            <Settings size={20} />
            <span className="mx-3">Security Settings</span>
          </a>
        </nav>
        
        <div className="absolute bottom-0 w-64 p-6">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h4 className="text-sm font-medium text-blue-800 mb-1">Security Status</h4>
            <p className="text-xs text-blue-700 mb-3">Document encryption protects your sensitive information.</p>
            <div className="flex justify-between text-xs text-blue-800 mb-1">
              <span>Encrypted Files</span>
              <span className="font-medium">{countEncryptedDocuments()}/{documents.length}</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-1.5 mb-3">
              <div 
                className="bg-blue-600 h-1.5 rounded-full" 
                style={{ width: `${(countEncryptedDocuments() / documents.length) * 100}%` }}
              ></div>
            </div>
            <button
              onClick={() => setShowEncryptionHelp(true)} 
              className="w-full px-3 py-2 text-xs text-blue-600 font-medium border border-blue-200 rounded-md hover:bg-blue-100 transition-colors flex items-center justify-center"
            >
              <HelpCircle size={14} className="mr-1" />
              Security Guidelines
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="py-4 px-6 flex items-center justify-between">
            <div className="flex items-center md:w-72">
              <button className="md:hidden mr-3 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search classified documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={toggleNotifications}
                  className="p-1 rounded-full text-gray-600 hover:bg-gray-100 relative"
                >
                  <Bell size={20} />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">Security Notifications</p>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      <div className="px-4 py-3 hover:bg-gray-50">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <AlertTriangle size={16} className="text-red-600 mt-1" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">Security Alert:</span> "Project Timeline.pdf" is classified as Confidential but is currently decrypted.
                            </p>
                            <p className="text-xs text-gray-500 mt-1">Just now</p>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-3 hover:bg-gray-50">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <Lock size={16} className="text-blue-600 mt-1" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-gray-700">Successfully encrypted "Q1 Marketing Strategy.docx"</p>
                            <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-3 hover:bg-gray-50">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <Share2 size={16} className="text-green-600 mt-1" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-gray-700">Jane Smith requested access to encrypted documents</p>
                            <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center text-sm rounded-full focus:outline-none"
                >
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    DP
                  </div>
                  <span className="hidden md:flex md:items-center ml-2">
                    <span className="text-sm font-medium text-gray-700">Demo User</span>
                    <ChevronDown size={16} className="ml-1 text-gray-500" />
                  </span>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">Demo User</p>
                      <p className="text-xs text-green-600">Security Clearance: Level 3</p>
                    </div>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <UserCircle2 size={16} className="mr-2" />
                      Your Profile
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <Settings size={16} className="mr-2" />
                      Settings
                    </a>
                    <div className="border-t border-gray-100"></div>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut size={16} className="mr-2" />
                      Secure Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Encryption Progress Modal */}
        {showEncryptionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <Lock size={20} className="text-blue-600 mr-2" />
                  Encrypting Document
                </h3>
                <button onClick={() => setShowEncryptionModal(false)} className="text-gray-400 hover:text-gray-500">
                  <X size={20} />
                </button>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-md border border-blue-100 mb-4">
                <div className="flex items-start">
                  <AlertCircle size={20} className="text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">
                      Encrypting: {processingDocument?.name}
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      Classification: <span className="font-medium">{processingDocument?.classification}</span>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-700">Applying AES-256 Encryption</span>
                  <span className="text-sm font-medium text-gray-900">{encryptionProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
                    style={{ width: `${encryptionProgress}%` }}
                  ></div>
                </div>
                <div className="mt-2 text-xs text-gray-500 italic">
                  {encryptionProgress < 30 && "Initializing encryption process..."}
                  {encryptionProgress >= 30 && encryptionProgress < 60 && "Applying cryptographic algorithms..."}
                  {encryptionProgress >= 60 && encryptionProgress < 90 && "Securing document contents..."}
                  {encryptionProgress >= 90 && "Finalizing security measures..."}
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md border border-gray-200 mb-4">
                <div className="flex">
                  <Info size={18} className="text-gray-600 flex-shrink-0 mt-0.5" />
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-800">Encryption Information</h4>
                    <ul className="mt-1 text-xs text-gray-600 space-y-1">
                      <li>• Using AES-256 military-grade encryption</li>
                      <li>• Only authorized personnel can access this document</li>
                      <li>• Access attempts will be logged and monitored</li>
                      <li>• Classification level determines access requirements</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {encryptionProgress === 100 && (
                <div className="bg-green-50 p-3 rounded-md border border-green-200 mb-4 flex items-start">
                  <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-green-800">Encryption Complete!</h4>
                    <p className="mt-1 text-xs text-green-700">
                      "{processingDocument?.name}" has been securely encrypted and is now protected according to its {processingDocument?.classification} classification level.
                    </p>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end">
                <button
                  disabled={encryptionProgress !== 100}
                  onClick={() => setShowEncryptionModal(false)}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${encryptionProgress === 100 ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                >
                  {encryptionProgress === 100 ? 'Confirm' : 'Processing...'}
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Decryption Progress Modal */}
        {showDecryptionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <Unlock size={20} className="text-purple-600 mr-2" />
                  Decrypting Document
                </h3>
                <button onClick={() => setShowDecryptionModal(false)} className="text-gray-400 hover:text-gray-500">
                  <X size={20} />
                </button>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-md border border-yellow-100 mb-4">
                <div className="flex items-start">
                  <AlertCircle size={20} className="text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">
                      Security Notice: You are decrypting a {processingDocument?.classification} document
                    </p>
                    <p className="text-xs text-yellow-700 mt-1">
                      This action will be logged and the document will be vulnerable until re-encrypted.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-700">Verifying permissions and decrypting</span>
                  <span className="text-sm font-medium text-gray-900">{decryptionProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-purple-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
                    style={{ width: `${decryptionProgress}%` }}
                  ></div>
                </div>
                <div className="mt-2 text-xs text-gray-500 italic">
                  {decryptionProgress < 20 && "Verifying security clearance..."}
                  {decryptionProgress >= 20 && decryptionProgress < 40 && "Authenticating user credentials..."}
                  {decryptionProgress >= 40 && decryptionProgress < 60 && "Retrieving encryption keys..."}
                  {decryptionProgress >= 60 && decryptionProgress < 80 && "Decrypting document contents..."}
                  {decryptionProgress >= 80 && "Preparing document for access..."}
                </div>
              </div>
              
              <div className="text-sm text-gray-800 mb-4">
                <div className="font-medium mb-1">Document Information:</div>
                <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-500">Name:</span> {processingDocument?.name}
                    </div>
                    <div>
                      <span className="text-gray-500">Classification:</span> {processingDocument?.classification}
                    </div>
                    <div>
                      <span className="text-gray-500">Last Modified:</span> {processingDocument?.lastModified}
                    </div>
                    <div>
                      <span className="text-gray-500">Size:</span> {processingDocument?.size}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 p-3 rounded-md border border-purple-200 mb-4">
                <div className="flex">
                  <AlertTriangle size={18} className="text-purple-600 flex-shrink-0 mt-0.5" />
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-purple-800">Important Reminder</h4>
                    <p className="mt-1 text-xs text-purple-700">
                      Please re-encrypt this document when you're finished working with it to maintain security compliance.
                    </p>
                  </div>
                </div>
              </div>
              
              {decryptionProgress === 100 && (
                <div className="bg-green-50 p-3 rounded-md border border-green-200 mb-4 flex items-start">
                  <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-green-800">Decryption Complete</h4>
                    <p className="mt-1 text-xs text-green-700">
                      You now have temporary access to "{processingDocument?.name}". This access has been logged in the security system.
                    </p>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between">
                <div className="text-xs text-gray-500 flex items-center">
                  <Clock size={14} className="mr-1" />
                  Security log updated at {new Date().toLocaleTimeString()}
                </div>
                <button
                  disabled={decryptionProgress !== 100}
                  onClick={() => setShowDecryptionModal(false)}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${decryptionProgress === 100 ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                >
                  {decryptionProgress === 100 ? 'Access Document' : 'Verifying Access...'}
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Encryption Help Modal */}
        {showEncryptionHelp && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <Shield size={20} className="text-blue-600 mr-2" />
                  Classified Document Handling Guidelines
                </h3>
                <button onClick={() => setShowEncryptionHelp(false)} className="text-gray-400 hover:text-gray-500">
                  <X size={20} />
                </button>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-800 mb-2">Document Classification Levels</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  <div className="border border-red-200 rounded-lg p-3 bg-red-50">
                    <div className="flex items-center mb-1">
                      <div className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200 mr-2">
                        Restricted
                      </div>
                    </div>
                    <p className="text-xs text-red-800">
                      Highest level of classification. Access limited to specifically authorized personnel. Must remain encrypted at all times.
                    </p>
                  </div>
                  
                  <div className="border border-orange-200 rounded-lg p-3 bg-orange-50">
                    <div className="flex items-center mb-1">
                      <div className="px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200 mr-2">
                        Confidential
                      </div>
                    </div>
                    <p className="text-xs text-orange-800">
                      Sensitive information that requires protection. Only authorized users with proper clearance can access. Should be encrypted when not in active use.
                    </p>
                  </div>
                  
                  <div className="border border-yellow-200 rounded-lg p-3 bg-yellow-50">
                    <div className="flex items-center mb-1">
                      <div className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200 mr-2">
                        Internal
                      </div>
                    </div>
                    <p className="text-xs text-yellow-800">
                      Information for internal company use only. Not intended for external sharing. Encryption recommended but not required.
                    </p>
                  </div>
                  
                  <div className="border border-green-200 rounded-lg p-3 bg-green-50">
                    <div className="flex items-center mb-1">
                      <div className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200 mr-2">
                        Public
                      </div>
                    </div>
                    <p className="text-xs text-green-800">
                      Information that can be freely distributed. No security restrictions. Encryption not required.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
                <h4 className="text-sm font-medium text-blue-800 mb-2">Document Security Requirements</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="text-xs text-blue-700 space-y-2">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-xs font-medium text-blue-600">1</span>
                      </div>
                      <span><strong>Always encrypt Restricted and Confidential</strong> documents when not actively working with them.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-xs font-medium text-blue-600">2</span>
                      </div>
                      <span>Verify document classification before changing encryption status.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-xs font-medium text-blue-600">3</span>
                      </div>
                      <span>Only share encrypted documents with authorized personnel.</span>
                    </li>
                  </ul>
                  
                  <ul className="text-xs text-blue-700 space-y-2">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-xs font-medium text-blue-600">4</span>
                      </div>
                      <span>All document access is logged for audit and compliance purposes.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-xs font-medium text-blue-600">5</span>
                      </div>
                      <span>Decryption of classified documents requires appropriate security clearance.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-xs font-medium text-blue-600">6</span>
                      </div>
                      <span>Report any security concerns immediately to your security administrator.</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex justify-end">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 mr-4 flex items-center"
                >
                  View full security policy
                  <ExternalLink size={14} className="ml-1" />
                </a>
                <button
                  onClick={() => setShowEncryptionHelp(false)}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                >
                  Understood
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Security Alert Banner for Classified Documents */}
            {documents.some(doc => !doc.encrypted && (doc.classification === 'Confidential' || doc.classification === 'Restricted')) && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertTriangle size={24} className="text-red-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Security Alert: Unencrypted Classified Documents</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>
                        You have classified documents that are currently decrypted. Please encrypt them when not in use to maintain security compliance.
                      </p>
                    </div>
                    <div className="mt-3">
                      <button
                        type="button"
                        className="text-sm font-medium text-red-800 hover:text-red-900"
                      >
                        View documents →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Document Status Overview */}
            <div className="bg-white rounded-lg shadow-sm mb-6 p-4 border border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Classified Document Management</h1>
                  <p className="text-sm text-gray-500 mt-1">Manage document security based on classification level</p>
                </div>
                
                <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                  <button className="px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm rounded-md flex items-center">
                    <Upload size={14} className="mr-1" />
                    Upload File
                  </button>
                  <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-md flex items-center">
                    <Download size={14} className="mr-1" />
                    Export Report
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center mr-3">
                      <Lock size={20} className="text-blue-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-blue-900">{countEncryptedDocuments()}</h3>
                      <p className="text-sm text-blue-800">Encrypted Files</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center mr-3">
                      <Unlock size={20} className="text-purple-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-purple-900">{countDecryptedDocuments()}</h3>
                      <p className="text-sm text-purple-800">Decrypted Files</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-lg border border-red-200">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-red-200 flex items-center justify-center mr-3">
                      <FileWarning size={20} className="text-red-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-red-900">
                        {documents.filter(doc => !doc.encrypted && (doc.classification === 'Confidential' || doc.classification === 'Restricted')).length}
                      </h3>
                      <p className="text-sm text-red-800">Security Risks</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      <Shield size={20} className="text-gray-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{documents.length}</h3>
                      <p className="text-sm text-gray-700">Total Documents</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Document List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Your Documents</h2>
                  <div className="mt-3 md:mt-0 flex flex-col md:flex-row gap-2">
                    <div className="flex">
                      <button 
                        onClick={() => setFilterStatus('all')}
                        className={`px-3 py-1.5 text-sm rounded-l-md border ${
                          filterStatus === 'all' 
                            ? 'bg-gray-100 text-gray-800 border-gray-300' 
                            : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        All
                      </button>
                      <button 
                        onClick={() => setFilterStatus('encrypted')}
                        className={`px-3 py-1.5 text-sm border-t border-b ${
                          filterStatus === 'encrypted' 
                            ? 'bg-blue-100 text-blue-800 border-blue-300' 
                            : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        Encrypted
                      </button>
                      <button 
                        onClick={() => setFilterStatus('decrypted')}
                        className={`px-3 py-1.5 text-sm rounded-r-md border ${
                          filterStatus === 'decrypted' 
                            ? 'bg-red-100 text-red-800 border-red-300' 
                            : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        Decrypted
                      </button>
                    </div>
                    
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-700"
                    >
                      <option value="name">Sort by: Name</option>
                      <option value="type">Sort by: Type</option>
                      <option value="classification">Sort by: Classification</option>
                      <option value="status">Sort by: Security Status</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Classification
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Security Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Modified
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Shared With
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getFilteredDocuments().map((document) => (
                      <tr key={document.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                              {document.type.includes('Word') && (
                                <FileText size={20} className="text-blue-500" />
                              )}
                              {document.type.includes('Excel') && (
                                <FileSpreadsheet size={20} className="text-green-500" />
                              )}
                              {document.type.includes('PDF') && (
                                <FileText size={20} className="text-red-500" />
                              )}
                              {document.type.includes('Image') && (
                                <FileImage size={20} className="text-purple-500" />
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{document.name}</div>
                              <div className="text-xs text-gray-500">{document.size} • {document.type}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full items-center border ${getClassificationBadgeColor(document.classification)}`}>
                            {document.classification}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {document.encrypted ? (
                            <div className="flex items-center">
                              <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-md flex items-center mr-2">
                                <Lock size={12} className="mr-1" />
                                Encrypted
                              </div>
                              {document.classification === 'Confidential' || document.classification === 'Restricted' ? (
                                <CheckCircle size={16} className="text-green-500" />
                              ) : null}
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <div className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-md flex items-center mr-2">
                                <Unlock size={12} className="mr-1" />
                                Decrypted
                              </div>
                              {document.classification === 'Confidential' || document.classification === 'Restricted' ? (
                                <AlertTriangle size={16} className="text-red-500" />
                              ) : null}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 flex items-center">
                            <Clock size={14} className="mr-1 text-gray-400" />
                            {document.lastModified}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {document.sharedWith.length > 0 ? (
                            <div className="flex items-center">
                              <div className="flex -space-x-1">
                                {document.sharedWith.slice(0, 2).map((user, idx) => (
                                  <div key={idx} className="h-6 w-6 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs text-white">
                                    {user.split(' ').map(n => n[0]).join('')}
                                  </div>
                                ))}
                                {document.sharedWith.length > 2 && (
                                  <div className="h-6 w-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs text-gray-600">
                                    +{document.sharedWith.length - 2}
                                  </div>
                                )}
                              </div>
                              <span className="ml-2 text-sm text-gray-500">{document.sharedWith.length} users</span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">Only you</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end items-center space-x-3">
                            {document.encrypted ? (
                              <button
                                onClick={() => simulateDecryption(document)}
                                className="text-purple-600 hover:text-purple-900 p-1 rounded-md hover:bg-purple-50 transition-colors"
                                title="Decrypt Document"
                              >
                                <Unlock size={18} />
                              </button>
                            ) : (
                              <button
                                onClick={() => simulateEncryption(document)}
                                className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50 transition-colors"
                                title="Encrypt Document"
                              >
                                <Lock size={18} />
                              </button>
                            )}
                            
                            <div className="relative">
                              <button 
                                onClick={(e) => toggleDocumentActionMenu(e, document.id)}
                                className="text-gray-500 hover:text-gray-700 p-1 rounded-md hover:bg-gray-100 transition-colors"
                              >
                                <MoreVertical size={18} />
                              </button>
                              
                              {documentActionMenuId === document.id && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30 border border-gray-200">
                                  <a 
                                    href="#" 
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                  >
                                    <Eye size={14} className="mr-2" />
                                    View Details
                                  </a>
                                  <a 
                                    href="#" 
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                  >
                                    <Download size={14} className="mr-2" />
                                    Download
                                  </a>
                                  <a 
                                    href="#" 
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                  >
                                    <Share2 size={14} className="mr-2" />
                                    Share
                                  </a>
                                  <div className="border-t border-gray-100 my-1"></div>
                                  <a 
                                    href="#" 
                                    className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                                  >
                                    <X size={14} className="mr-2" />
                                    Remove
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {getFilteredDocuments().length === 0 && (
                <div className="px-6 py-10 text-center">
                  <FileText size={48} className="mx-auto text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No documents found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {filterStatus === 'encrypted' 
                      ? "No encrypted documents match your criteria." 
                      : filterStatus === 'decrypted' 
                        ? "No decrypted documents match your criteria."
                        : "Try adjusting your search or filters."}
                  </p>
                </div>
              )}
            </div>
            
            {/* Document Security Guidelines */}
            <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-sm border border-blue-100 p-4">
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 md:mb-0">
                  <Shield size={24} className="text-blue-600" />
                </div>
                <div className="md:ml-4 flex-grow">
                  <h3 className="text-lg font-medium text-gray-900">Document Security Reminder</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Remember to encrypt <strong>Confidential</strong> and <strong>Restricted</strong> documents when not in use. 
                    Document access is logged and monitored for compliance purposes.
                  </p>
                </div>
                <div className="mt-4 md:mt-0 md:ml-4">
                  <button 
                    onClick={() => setShowEncryptionHelp(true)}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    View security policy
                    <ChevronDown size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}