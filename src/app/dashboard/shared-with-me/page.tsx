'use client';

import { useState } from 'react';
import { Users, User, Clock, Shield, FileText } from 'lucide-react';
import DocumentList from '../components/DocumentList';

// Sample documents shared with the current user
const initialDocuments = [
  { 
    id: 101, 
    name: 'Team Budget Proposal.xlsx', 
    encrypted: true, 
    lastModified: '1 day ago',
    size: '2.1 MB',
    type: 'Excel Spreadsheet',
    sharedWith: ['You', 'Management Team'],
    classification: 'Confidential',
    sharedBy: 'Jane Smith',
    sharedDate: '3 days ago',
    accessLevel: 'View & Comment'
  },
  { 
    id: 102, 
    name: 'Project Requirements.docx', 
    encrypted: true, 
    lastModified: '2 days ago',
    size: '1.5 MB',
    type: 'Word Document',
    sharedWith: ['You', 'Development Team'],
    classification: 'Internal',
    sharedBy: 'Mark Taylor',
    sharedDate: '1 week ago',
    accessLevel: 'View Only'
  },
  { 
    id: 103, 
    name: 'Marketing Campaign Assets.zip', 
    encrypted: false, 
    lastModified: '5 days ago',
    size: '15.8 MB',
    type: 'Archive',
    sharedWith: ['Marketing Department'],
    classification: 'Internal',
    sharedBy: 'Sarah Johnson',
    sharedDate: '2 weeks ago',
    accessLevel: 'Full Access'
  }
];

export default function SharedWithMePage() {
  const [documents, setDocuments] = useState(initialDocuments);
  
  const handleDocumentUpdate = (updatedDocument) => {
    setDocuments(documents.map(doc => 
      doc.id === updatedDocument.id ? updatedDocument : doc
    ));
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm mb-6 p-4 border border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
            <Users size={20} className="text-indigo-700" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Shared with Me</h1>
            <p className="text-sm text-gray-500">Documents other users have shared with you</p>
          </div>
        </div>
      </div>
      
      {/* Pending Invitations Section */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg mb-6 p-4">
        <h2 className="text-sm font-medium text-yellow-800 mb-3">Pending Share Invitations</h2>
        <div className="bg-white border border-yellow-100 rounded-md p-4 mb-2">
          <div className="flex items-start">
            <div className="bg-yellow-100 rounded-full p-2 mr-3">
              <FileText size={18} className="text-yellow-700" />
            </div>
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">Q4 Performance Review.docx</h3>
                <span className="text-xs text-gray-500">1 hour ago</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                <span className="font-medium">David Brown</span> has shared a <span className="text-yellow-700 font-medium">Confidential</span> document with you
              </p>
            </div>
            <div className="ml-4 flex-shrink-0">
              <button className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-md hover:bg-indigo-200 mr-2">
                Accept
              </button>
              <button className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md hover:bg-gray-200">
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom List Header for Shared Files */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Documents Shared with You</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Shared By
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
              {documents.map((document) => (
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
                      <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                        <User size={16} className="text-indigo-600" />
                      </div>
                      <span className="text-sm text-gray-900">{document.sharedBy}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 flex items-center">
                      <Clock size={14} className="mr-1 text-gray-400" />
                      {document.sharedDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                      document.accessLevel === 'Full Access' 
                        ? 'bg-green-100 text-green-800' 
                        : document.accessLevel === 'View & Comment'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                    }`}>
                      {document.accessLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Shield size={14} className="mr-1 text-gray-500" />
                      <span className="text-sm text-gray-700">{document.classification}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                      View
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {documents.length === 0 && (
            <div className="px-6 py-10 text-center">
              <Users size={48} className="mx-auto text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No shared documents</h3>
              <p className="mt-1 text-sm text-gray-500">
                No one has shared any documents with you yet.
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Sharing Guidelines */}
      <div className="bg-indigo-50 rounded-lg shadow-sm border border-indigo-100 p-4">
        <div className="flex flex-col md:flex-row">
          <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4 md:mb-0">
            <Shield size={24} className="text-indigo-600" />
          </div>
          <div className="md:ml-4">
            <h3 className="text-lg font-medium text-gray-900">Document Sharing Guidelines</h3>
            <p className="text-sm text-gray-600 mt-1">
              When accessing shared documents, please respect the document's classification level and the owner's sharing 
              intent. Documents classified as Confidential or Restricted should not be reshared without explicit permission 
              from the original owner.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}