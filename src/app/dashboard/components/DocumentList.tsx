'use client';

import { useState } from 'react';
import { 
  FileText, 
  FileSpreadsheet, 
  FileImage, 
  Clock, 
  Lock, 
  Unlock, 
  AlertTriangle, 
  CheckCircle
} from 'lucide-react';
import DocumentActions, { Document } from './DocumentActions';

interface DocumentListProps {
  documents: Document[];
  onDocumentUpdate: (updatedDocument: Document) => void;
  filterStatus?: string;
  sortBy?: string;
  searchQuery?: string;
  title?: string;
  emptyMessage?: string;
  showFilters?: boolean;
}

export default function DocumentList({
  documents,
  onDocumentUpdate,
  filterStatus = 'all',
  sortBy = 'name',
  searchQuery = '',
  title = 'Your Documents',
  emptyMessage = 'No documents found',
  showFilters = true
}: DocumentListProps) {
  const [localFilterStatus, setLocalFilterStatus] = useState(filterStatus);
  const [localSortBy, setLocalSortBy] = useState(sortBy);
  
  const handleEncrypt = (document: Document) => {
    onDocumentUpdate({ ...document, encrypted: true });
  };
  
  const handleDecrypt = (document: Document) => {
    onDocumentUpdate({ ...document, encrypted: false });
  };
  
  const handleView = (document: Document) => {
    // View functionality would go here
    console.log(`Viewing document: ${document.name}`);
  };
  
  const handleDownload = (document: Document) => {
    // Download functionality would go here
    console.log(`Downloading document: ${document.name}`);
  };
  
  const handleShare = (document: Document) => {
    // Share functionality would go here
    console.log(`Sharing document: ${document.name}`);
  };
  
  const handleDelete = (document: Document) => {
    // Delete functionality would go here
    console.log(`Deleting document: ${document.name}`);
  };
  
  const getFilteredDocuments = () => {
    // Make sure documents is defined and is an array
    if (!documents || !Array.isArray(documents)) {
      return [];
    }
    
    let filteredDocs = [...documents];
    
    // Apply status filter
    if (localFilterStatus === 'encrypted') {
      filteredDocs = filteredDocs.filter(doc => doc && doc.encrypted);
    } else if (localFilterStatus === 'decrypted') {
      filteredDocs = filteredDocs.filter(doc => doc && !doc.encrypted);
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
    switch (localSortBy) {
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
  
  const getFileIcon = (document: Document) => {
    if (document.type.includes('Word')) {
      return <FileText size={20} className="text-blue-500" />;
    } else if (document.type.includes('Excel') || document.type.includes('Spreadsheet')) {
      return <FileSpreadsheet size={20} className="text-green-500" />;
    } else if (document.type.includes('PDF')) {
      return <FileText size={20} className="text-red-500" />; // Using FileText for PDF as well
    } else if (document.type.includes('Image')) {
      return <FileImage size={20} className="text-purple-500" />;
    }
    return <FileText size={20} className="text-gray-500" />; // Using FileText as default
  };

  const filteredDocuments = getFilteredDocuments();
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-lg font-medium text-gray-900">{title}</h2>
          {showFilters && (
            <div className="mt-3 md:mt-0 flex flex-col md:flex-row gap-2">
              <div className="flex">
                <button 
                  onClick={() => setLocalFilterStatus('all')}
                  className={`px-3 py-1.5 text-sm rounded-l-md border ${
                    localFilterStatus === 'all' 
                      ? 'bg-gray-100 text-gray-800 border-gray-300' 
                      : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  All
                </button>
                <button 
                  onClick={() => setLocalFilterStatus('encrypted')}
                  className={`px-3 py-1.5 text-sm border-t border-b ${
                    localFilterStatus === 'encrypted' 
                      ? 'bg-blue-100 text-blue-800 border-blue-300' 
                      : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Encrypted
                </button>
                <button 
                  onClick={() => setLocalFilterStatus('decrypted')}
                  className={`px-3 py-1.5 text-sm rounded-r-md border ${
                    localFilterStatus === 'decrypted' 
                      ? 'bg-red-100 text-red-800 border-red-300' 
                      : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Decrypted
                </button>
              </div>
              
              <select
                value={localSortBy}
                onChange={(e) => setLocalSortBy(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-700"
              >
                <option value="name">Sort by: Name</option>
                <option value="type">Sort by: Type</option>
                <option value="classification">Sort by: Classification</option>
                <option value="status">Sort by: Security Status</option>
              </select>
            </div>
          )}
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
            {filteredDocuments.map((document) => (
              <tr key={document.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                      {getFileIcon(document)}
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
                  {document && (
                    <DocumentActions 
                      document={document}
                      onEncrypt={handleEncrypt}
                      onDecrypt={handleDecrypt}
                      onView={handleView}
                      onDownload={handleDownload}
                      onShare={handleShare}
                      onDelete={handleDelete}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredDocuments.length === 0 && (
        <div className="px-6 py-10 text-center">
          <FileText size={48} className="mx-auto text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No documents found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {localFilterStatus === 'encrypted' 
              ? "No encrypted documents match your criteria." 
              : localFilterStatus === 'decrypted' 
                ? "No decrypted documents match your criteria."
                : emptyMessage}
          </p>
        </div>
      )}
    </div>
  );
}