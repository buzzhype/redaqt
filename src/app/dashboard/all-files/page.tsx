'use client';

import { useState } from 'react';
import { FolderClosed, Upload, Download, FileText } from 'lucide-react';
import DocumentList from '../components/DocumentList';
import FileUploader from '../components/FileUploader';
import { useDocuments, Document } from '../contexts/DocumentContext';

export default function AllFilesPage() {
  const { documents, updateDocument } = useDocuments();
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  const handleDocumentUpdate = (updatedDocument: Document) => {
    updateDocument(updatedDocument);
  };

  // Count files by type
  const getFileTypeStats = () => {
    const stats: Record<string, number> = {};
    documents.forEach(doc => {
      const type = doc.type.includes('Word') ? 'Word' : 
                 doc.type.includes('Excel') ? 'Excel' : 
                 doc.type.includes('PDF') ? 'PDF' : 
                 doc.type.includes('Image') ? 'Image' : 'Other';
      
      if (!stats[type]) stats[type] = 0;
      stats[type]++;
    });
    return stats;
  };

  const fileTypeStats = getFileTypeStats();

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm mb-6 p-4 border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
              <FolderClosed size={20} className="text-gray-700" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">All Files</h1>
              <p className="text-sm text-gray-500">Manage all your documents in one place</p>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button 
              onClick={() => setShowUploadModal(true)}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md flex items-center"
            >
              <Upload size={16} className="mr-1" />
              Upload Files
            </button>
            
            <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md flex items-center border border-gray-300">
              <Download size={16} className="mr-1" />
              Export
            </button>
          </div>
        </div>
        
        {/* File Type Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
          {Object.entries(fileTypeStats).map(([type, count]) => (
            <div key={type} className="bg-gray-50 border border-gray-200 rounded-md p-3 flex items-center">
              <FileText size={18} className="text-gray-500 mr-2" />
              <div>
                <div className="text-xs text-gray-500">{type} Files</div>
                <div className="text-sm font-medium">{count}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Documents List */}
      <DocumentList 
        documents={documents} 
        onDocumentUpdate={handleDocumentUpdate}
        title="Your Files"
        emptyMessage="No files found. Upload files to get started."
      />

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