'use client';

import { useState } from 'react';
import { Share2, Users, UserPlus, Clock, Shield, FileText, UserX, Settings } from 'lucide-react';
import DocumentList from '../components/DocumentList';
import { useDocuments, Document } from '../contexts/DocumentContext';

export default function MySharedFilesPage() {
  const { updateDocument, getSharedByMeDocuments } = useDocuments();
  const [showSharingModal, setShowSharingModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  
  const handleDocumentUpdate = (updatedDocument: Document) => {
    updateDocument(updatedDocument);
  };

  const openSharingSettings = (document: Document) => {
    setSelectedDocument(document);
    setShowSharingModal(true);
  };

  const getAccessLevelBadgeColor = (accessLevel: string) => {
    switch (accessLevel) {
      case 'Full Access':
        return 'bg-green-100 text-green-800';
      case 'View & Comment':
        return 'bg-blue-100 text-blue-800';
      case 'View Only':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const sharedDocuments = getSharedByMeDocuments();

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm mb-6 p-4 border border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
            <Share2 size={20} className="text-purple-700" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">My Shared Files</h1>
            <p className="text-sm text-gray-500">Manage documents you've shared with others</p>
          </div>
        </div>
      </div>
      
      {/* Share Requests Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg mb-6 p-4">
        <h2 className="text-sm font-medium text-blue-800 mb-3">Access Requests</h2>
        <div className="bg-white border border-blue-100 rounded-md p-4 mb-2">
          <div className="flex items-start">
            <div className="bg-blue-100 rounded-full p-2 mr-3">
              <UserPlus size={18} className="text-blue-700" />
            </div>
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">Marketing Campaign Assets.zip</h3>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                <span className="font-medium">Emily Wilson</span> is requesting access to your document
              </p>
            </div>
            <div className="ml-4 flex-shrink-0">
              <button className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-md hover:bg-green-200 mr-2">
                Approve
              </button>
              <button className="px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-md hover:bg-red-200">
                Deny
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom List Header for Shared Files */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Documents You've Shared</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Shared With
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Shared
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Access Level
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Security
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sharedDocuments.map((document) => (
                <tr key={document.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                        <FileText size={20} className="text-gray-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{document.name}</div>
                        <div className="text-xs text-gray-500">{document.size} • {document.type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                        <Users size={14} className="text-purple-600" />
                      </div>
                      <span className="text-sm text-gray-900">
                        {Array.isArray(document.sharedWith) 
                          ? document.sharedWith.length > 1 
                            ? `${document.sharedWith[0]} + ${document.sharedWith.length - 1} more` 
                            : document.sharedWith[0]
                          : 'No one'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 flex items-center">
                      <Clock size={14} className="mr-1 text-gray-400" />
                      {document.sharedDate || document.lastModified}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${getAccessLevelBadgeColor(document.accessLevel || 'View Only')}`}>
                      {document.accessLevel || 'View Only'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Shield size={14} className="mr-1 text-gray-500" />
                      <span className="text-sm text-gray-700">{document.classification}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => openSharingSettings(document)}
                      className="text-purple-600 hover:text-purple-900 mr-3"
                    >
                      <Settings size={16} />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <UserX size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {sharedDocuments.length === 0 && (
            <div className="px-6 py-10 text-center">
              <Share2 size={48} className="mx-auto text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No shared documents</h3>
              <p className="mt-1 text-sm text-gray-500">
                You haven't shared any documents with others yet.
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Sharing Management Tips */}
      <div className="bg-purple-50 rounded-lg shadow-sm border border-purple-100 p-4">
        <div className="flex flex-col md:flex-row">
          <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 md:mb-0">
            <Shield size={24} className="text-purple-600" />
          </div>
          <div className="md:ml-4">
            <h3 className="text-lg font-medium text-gray-900">Secure Sharing Best Practices</h3>
            <p className="text-sm text-gray-600 mt-1">
              Limit the number of people you share sensitive documents with and regularly review who has access.
              Consider encrypting confidential documents before sharing and set appropriate access permissions.
              Remember that document access is logged and monitored for security compliance.
            </p>
          </div>
        </div>
      </div>
      
      {/* Sharing Modal (placeholder - would be implemented with a proper component) */}
      {showSharingModal && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Sharing Settings</h3>
              <button 
                onClick={() => setShowSharingModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Document</h4>
              <div className="flex items-center bg-gray-50 p-3 rounded-md">
                <FileText size={20} className="text-gray-500 mr-3" />
                <span className="text-sm font-medium">{selectedDocument.name}</span>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Shared With</h4>
              <div className="border border-gray-200 rounded-md overflow-hidden">
                {Array.isArray(selectedDocument.sharedWith) && selectedDocument.sharedWith.map((user, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border-b border-gray-200 last:border-b-0">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <Users size={16} className="text-gray-600" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900">{user}</span>
                        <p className="text-xs text-gray-500">Added {selectedDocument.sharedDate || selectedDocument.lastModified}</p>
                      </div>
                    </div>
                    <select className="text-sm border border-gray-300 rounded-md p-1">
                      <option>View Only</option>
                      <option>View & Comment</option>
                      <option>Full Access</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowSharingModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowSharingModal(false)}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}