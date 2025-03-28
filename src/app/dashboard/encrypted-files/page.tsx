'use client';

import { useState } from 'react';
import { Lock, Shield, Upload } from 'lucide-react';
import DocumentList from '../components/DocumentList';
import FileUploader from '../components/FileUploader';
import { useDocuments, Document } from '../contexts/DocumentContext';


export default function EncryptedFilesPage() {
  const { updateDocument, getEncryptedDocuments } = useDocuments();
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  const handleDocumentUpdate = (updatedDocument: Document) => {
    updateDocument(updatedDocument);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm mb-6 p-4 border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <Lock size={20} className="text-blue-700" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Encrypted Files</h1>
              <p className="text-sm text-gray-500">Documents with enhanced security protection</p>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0">
            <button 
              onClick={() => setShowUploadModal(true)}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md flex items-center"
            >
              <Upload size={16} className="mr-2" />
              Upload & Encrypt
            </button>
          </div>
        </div>
      </div>
      
      {/* Documents List */}
      <DocumentList 
        documents={getEncryptedDocuments()} 
        onDocumentUpdate={handleDocumentUpdate}
        title="Encrypted Documents"
        filterStatus="encrypted"
        emptyMessage="No encrypted documents found. Encrypt documents to enhance their security."
      />
      
      {/* Security Info Panel */}
      <div className="mt-6 bg-blue-50 rounded-lg shadow-sm border border-blue-100 p-4">
        <div className="flex flex-col md:flex-row">
          <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 md:mb-0">
            <Shield size={24} className="text-blue-600" />
          </div>
          <div className="md:ml-4">
            <h3 className="text-lg font-medium text-gray-900">About Encrypted Files</h3>
            <p className="text-sm text-gray-600 mt-1">
              Encrypted files use AES-256 cryptography to protect sensitive information. Only authorized personnel with proper security clearance can access these documents. If a file is classified as Confidential or Restricted, it should remain encrypted when not in active use.
            </p>
          </div>
        </div>
      </div>

      {/* File Upload Modal */}
      {showUploadModal && (
        <FileUploader 
          showModal={true}
          onClose={() => setShowUploadModal(false)}
          encryptAfterUpload={true}
        />
      )}
    </div>
  );
}