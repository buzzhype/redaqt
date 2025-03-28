'use client';

import { useState } from 'react';
import { 
  Shield,
  Lock,
  Unlock,
  FileWarning,
  Upload,
  Download,
  AlertTriangle,
  ChevronDown
} from 'lucide-react';
import DocumentList from './components/DocumentList';
import FileUploader from './components/FileUploader';
import { useDocuments, Document } from './contexts/DocumentContext';

export default function DashboardPage() {
  const { 
    documents, 
    updateDocument,
    getEncryptedDocuments,
    getDecryptedDocuments,
    getSecurityRiskDocuments
  } = useDocuments();
  
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEncryptionHelp, setShowEncryptionHelp] = useState(false);
  

  const handleDocumentUpdate = (updatedDocument: Document) => {
    updateDocument(updatedDocument);
  };

  
  const countEncryptedDocuments = () => {
    return getEncryptedDocuments().length;
  };
  
  const countDecryptedDocuments = () => {
    return getDecryptedDocuments().length;
  };
  
  const countSecurityRisks = () => {
    return getSecurityRiskDocuments().length;
  };

  return (
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
            <button 
              onClick={() => setShowUploadModal(true)}
              className="px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm rounded-md flex items-center"
            >
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
                <h3 className="text-lg font-bold text-red-900">{countSecurityRisks()}</h3>
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
      <DocumentList 
        documents={documents} 
        onDocumentUpdate={handleDocumentUpdate}
      />
      
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

      {/* File Upload Modal */}
      {showUploadModal && (
        <FileUploader 
          showModal={true}
          onClose={() => setShowUploadModal(false)}
        />
      )}
    </div>
  );
}