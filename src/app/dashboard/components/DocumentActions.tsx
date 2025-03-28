'use client';

import { useState } from 'react';
import { 
  Lock, 
  Unlock, 
  MoreVertical, 
  Eye, 
  Download, 
  Share2, 
  X, 
  AlertCircle, 
  CheckCircle,
  Info,
  Clock
} from 'lucide-react';

export interface Document {
  id: number;
  name: string;
  encrypted: boolean;
  lastModified: string;
  size: string;
  type: string;
  sharedWith: string[];
  classification: string;
}

interface DocumentActionsProps {
  document: Document;
  onEncrypt: (document: Document) => void;
  onDecrypt: (document: Document) => void;
  onShare?: (document: Document) => void;
  onDelete?: (document: Document) => void;
  onView?: (document: Document) => void;
  onDownload?: (document: Document) => void;
}

export default function DocumentActions({
  document,
  onEncrypt,
  onDecrypt,
  onShare,
  onDelete,
  onView,
  onDownload
}: DocumentActionsProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showEncryptionModal, setShowEncryptionModal] = useState(false);
  const [showDecryptionModal, setShowDecryptionModal] = useState(false);
  const [encryptionProgress, setEncryptionProgress] = useState(0);
  const [decryptionProgress, setDecryptionProgress] = useState(0);

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleEncrypt = () => {
    setShowMenu(false);
    setShowEncryptionModal(true);
    simulateEncryptionProgress();
  };

  const handleDecrypt = () => {
    setShowMenu(false);
    setShowDecryptionModal(true);
    simulateDecryptionProgress();
  };

  const simulateEncryptionProgress = () => {
    setEncryptionProgress(0);
    const timer = setInterval(() => {
      setEncryptionProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onEncrypt(document);
            setShowEncryptionModal(false);
          }, 800);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const simulateDecryptionProgress = () => {
    setDecryptionProgress(0);
    const timer = setInterval(() => {
      setDecryptionProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onDecrypt(document);
            setShowDecryptionModal(false);
          }, 800);
          return 100;
        }
        return prev + 20;
      });
    }, 300);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(false);
    if (onShare) onShare(document);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(false);
    if (onDelete) onDelete(document);
  };

  const handleView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(false);
    if (onView) onView(document);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(false);
    if (onDownload) onDownload(document);
  };

  const getClassificationBadgeColor = (classification: string) => {
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

  // Check if document is defined before rendering
  if (!document) {
    return null;
  }
  
  return (
    <div className="flex justify-end items-center space-x-3">
      {document.encrypted ? (
        <button
          onClick={handleDecrypt}
          className="text-purple-600 hover:text-purple-900 p-1 rounded-md hover:bg-purple-50 transition-colors"
          title="Decrypt Document"
        >
          <Unlock size={18} />
        </button>
      ) : (
        <button
          onClick={handleEncrypt}
          className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50 transition-colors"
          title="Encrypt Document"
        >
          <Lock size={18} />
        </button>
      )}
      
      <div className="relative">
        <button 
          onClick={toggleMenu}
          className="text-gray-500 hover:text-gray-700 p-1 rounded-md hover:bg-gray-100 transition-colors"
        >
          <MoreVertical size={18} />
        </button>
        
        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30 border border-gray-200">
            <button 
              onClick={handleView}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <Eye size={14} className="mr-2" />
              View Details
            </button>
            <button 
              onClick={handleDownload}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <Download size={14} className="mr-2" />
              Download
            </button>
            <button 
              onClick={handleShare}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <Share2 size={14} className="mr-2" />
              Share
            </button>
            <div className="border-t border-gray-100 my-1"></div>
            <button 
              onClick={handleDelete}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
            >
              <X size={14} className="mr-2" />
              Remove
            </button>
          </div>
        )}
      </div>

      {/* Encryption Modal */}
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
                    Encrypting: {document.name}
                  </p>
                  <p className="text-xs text-blue-700 mt-1">
                    Classification: <span className="font-medium">{document.classification}</span>
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
                    "{document.name}" has been securely encrypted and is now protected according to its {document.classification} classification level.
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

      {/* Decryption Modal */}
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
                    Security Notice: You are decrypting a {document.classification} document
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
                    <span className="text-gray-500">Name:</span> {document.name}
                  </div>
                  <div>
                    <span className="text-gray-500">Classification:</span> {document.classification}
                  </div>
                  <div>
                    <span className="text-gray-500">Last Modified:</span> {document.lastModified}
                  </div>
                  <div>
                    <span className="text-gray-500">Size:</span> {document.size}
                  </div>
                </div>
              </div>
            </div>
            
            {decryptionProgress === 100 && (
              <div className="bg-green-50 p-3 rounded-md border border-green-200 mb-4 flex items-start">
                <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-green-800">Decryption Complete</h4>
                  <p className="mt-1 text-xs text-green-700">
                    You now have temporary access to "{document.name}". This access has been logged in the security system.
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
    </div>
  );
}