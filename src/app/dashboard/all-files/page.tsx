'use client';

import { useState } from 'react';
import { FolderClosed, Upload, Download, FileIcon } from 'lucide-react';
import DocumentList from '../components/DocumentList';
import FileUploader from '../components/FileUploader';
import { useDocuments, Document } from '../contexts/DocumentContext';

// Sample document data
const initialDocuments = [
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
  },
  { 
    id: 6, 
    name: 'Office Inventory.xlsx', 
    encrypted: false, 
    lastModified: '3 weeks ago',
    size: '1.3 MB',
    type: 'Excel Spreadsheet',
    sharedWith: ['Admin Team'],
    classification: 'Internal'
  },
  { 
    id: 7, 
    name: 'Quarterly Report.pdf', 
    encrypted: true, 
    lastModified: '1 month ago',
    size: '3.7 MB',
    type: 'PDF Document',
    sharedWith: ['Executive Team'],
    classification: 'Confidential'
  }
];

export default function AllFilesPage() {
  const [documents, setDocuments] = useState(initialDocuments);
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  const handleDocumentUpdate = (updatedDocument: Document) => {
    updateDocument(updatedDocument);
  };
  };

  // Count files by type
  const getFileTypeStats = () => {
    const stats = {};
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
              <FileIcon size={18} className="text-gray-500 mr-2" />
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