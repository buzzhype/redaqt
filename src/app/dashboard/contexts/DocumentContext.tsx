'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define document interface
export interface Document {
  id: number;
  name: string;
  encrypted: boolean;
  lastModified: string;
  size: string;
  type: string;
  sharedWith: string[];
  classification: string;
  sharedBy?: string;
  sharedDate?: string;
  accessLevel?: string;
}

// Sample initial documents
const initialDocuments: Document[] = [
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

// Define context type
interface DocumentContextType {
  documents: Document[];
  addDocument: (document: Omit<Document, 'id'>) => void;
  updateDocument: (updatedDocument: Document) => void;
  removeDocument: (id: number) => void;
  encryptDocument: (id: number) => void;
  decryptDocument: (id: number) => void;
  shareDocument: (id: number, users: string[]) => void;
  getEncryptedDocuments: () => Document[];
  getDecryptedDocuments: () => Document[];
  getSharedWithMeDocuments: () => Document[];
  getSharedByMeDocuments: () => Document[];
  getSecurityRiskDocuments: () => Document[];
}

// Create context
const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

// Create provider component
export function DocumentProvider({ children }: { children: ReactNode }) {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);

  // Add new document
  const addDocument = (document: Omit<Document, 'id'>) => {
    const newId = Math.max(...documents.map(d => d.id), 0) + 1;
    setDocuments([...documents, { ...document, id: newId }]);
  };

  // Update existing document
  const updateDocument = (updatedDocument: Document) => {
    setDocuments(
      documents.map(doc => 
        doc.id === updatedDocument.id ? updatedDocument : doc
      )
    );
  };

  // Remove document
  const removeDocument = (id: number) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  // Encrypt document
  const encryptDocument = (id: number) => {
    setDocuments(
      documents.map(doc => 
        doc.id === id ? { ...doc, encrypted: true } : doc
      )
    );
  };

  // Decrypt document
  const decryptDocument = (id: number) => {
    setDocuments(
      documents.map(doc => 
        doc.id === id ? { ...doc, encrypted: false } : doc
      )
    );
  };

  // Share document with users
  const shareDocument = (id: number, users: string[]) => {
    setDocuments(
      documents.map(doc => 
        doc.id === id ? { ...doc, sharedWith: [...doc.sharedWith, ...users] } : doc
      )
    );
  };

  // Get encrypted documents
  const getEncryptedDocuments = () => {
    return documents.filter(doc => doc.encrypted);
  };

  // Get decrypted documents
  const getDecryptedDocuments = () => {
    return documents.filter(doc => !doc.encrypted);
  };

  // Get documents shared with me (placeholder - in a real app this would filter based on current user)
  const getSharedWithMeDocuments = () => {
    // Placeholder implementation - in a real app this would check against current user
    return documents.filter(doc => doc.sharedWith.includes('You') || doc.sharedWith.length > 0);
  };

  // Get documents I've shared (placeholder - in a real app this would filter based on current user)
  const getSharedByMeDocuments = () => {
    // Placeholder implementation - in a real app this would check against current user
    return documents.filter(doc => doc.sharedWith.length > 0);
  };

  // Get documents that are security risks (confidential/restricted but not encrypted)
  const getSecurityRiskDocuments = () => {
    return documents.filter(doc => 
      !doc.encrypted && (doc.classification === 'Confidential' || doc.classification === 'Restricted')
    );
  };

  return (
    <DocumentContext.Provider 
      value={{ 
        documents, 
        addDocument, 
        updateDocument, 
        removeDocument, 
        encryptDocument, 
        decryptDocument, 
        shareDocument,
        getEncryptedDocuments,
        getDecryptedDocuments,
        getSharedWithMeDocuments,
        getSharedByMeDocuments,
        getSecurityRiskDocuments
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
}

// Custom hook to use the document context
export function useDocuments() {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error('useDocuments must be used within a DocumentProvider');
  }
  return context;
}