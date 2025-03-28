'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { 
  Upload, 
  XCircle, 
  File, 
  FileText, 
  FileImage, 
  FileSpreadsheet, 
  AlertTriangle,
  Check,
  Lock,
  Shield,
  X,
  ArrowUpCircle
} from 'lucide-react';

interface FileWithPreview extends File {
  id: string;
  preview?: string;
  progress: number;
  error?: string;
  uploaded?: boolean;
  classification?: string;
  encrypted?: boolean;
}

interface FileUploaderProps {
  onFileUpload?: (files: File[]) => void;
  onClose?: () => void;
  maxFiles?: number;
  maxSize?: number; // in MB
  acceptedFileTypes?: string[];
  showModal?: boolean;
}

const DEFAULT_MAX_SIZE = 20; // 20MB
const DEFAULT_ACCEPTED_TYPES = [
  'application/pdf', 
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'image/jpeg',
  'image/png',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation'
];

export default function FileUploader({
  onFileUpload,
  onClose,
  maxFiles = 10,
  maxSize = DEFAULT_MAX_SIZE,
  acceptedFileTypes = DEFAULT_ACCEPTED_TYPES,
  showModal = false
}: FileUploaderProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [classification, setClassification] = useState('Internal');
  const [encryptAfterUpload, setEncryptAfterUpload] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  // Cleanup previews when component unmounts
  useEffect(() => {
    return () => {
      files.forEach(file => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files]);

  // Simulate upload progress
  useEffect(() => {
    if (!isUploading || files.length === 0) return;

    const uploadInterval = setInterval(() => {
      setFiles(prevFiles => {
        const updatedFiles = [...prevFiles];
        let allComplete = true;

        updatedFiles.forEach(file => {
          if (file.progress < 100) {
            file.progress += Math.random() * 15;
            if (file.progress > 100) file.progress = 100;
            allComplete = allComplete && file.progress === 100;
          }
        });

        if (allComplete) {
          clearInterval(uploadInterval);
          setTimeout(() => {
            setFiles(files => 
              files.map(file => ({ ...file, uploaded: true, encrypted: encryptAfterUpload }))
            );
            setIsUploading(false);
            setUploadComplete(true);
          }, 500);
        }

        return updatedFiles;
      });
    }, 300);

    return () => clearInterval(uploadInterval);
  }, [isUploading, files, encryptAfterUpload]);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      return { valid: false, error: `File size exceeds ${maxSize}MB limit` };
    }

    // Check file type
    if (acceptedFileTypes.length > 0 && !acceptedFileTypes.includes(file.type)) {
      return { valid: false, error: 'File type not supported' };
    }

    return { valid: true };
  };

  const processFiles = useCallback((fileList: FileList | null) => {
    if (!fileList) return;

    const newFiles: FileWithPreview[] = [];
    const fileArray = Array.from(fileList);

    // Don't exceed max files
    const filesCount = files.length;
    const remainingSlots = maxFiles - filesCount;
    const filesToProcess = fileArray.slice(0, remainingSlots);

    filesToProcess.forEach(file => {
      const validation = validateFile(file);
      const fileWithId: FileWithPreview = Object.assign(file, {
        id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        progress: 0,
        error: validation.valid ? undefined : validation.error
      });

      // Create preview for image files
      if (file.type.startsWith('image/')) {
        fileWithId.preview = URL.createObjectURL(file);
      }

      newFiles.push(fileWithId);
    });

    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  }, [files, maxFiles, acceptedFileTypes, maxSize]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    processFiles(e.dataTransfer.files);
  }, [processFiles]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
  }, [processFiles]);

  const handleRemoveFile = useCallback((fileId: string) => {
    setFiles(prevFiles => {
      const fileToRemove = prevFiles.find(f => f.id === fileId);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prevFiles.filter(f => f.id !== fileId);
    });
  }, []);

  const handleBrowseFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const startUpload = () => {
    if (files.length === 0 || isUploading) return;
    setIsUploading(true);
    
    // This would be where you'd call your API to upload the files
    // For now, we'll simulate the upload with the useEffect above
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return <FileImage size={28} className="text-purple-500" />;
    } else if (fileType.includes('spreadsheet') || fileType.includes('excel')) {
      return <FileSpreadsheet size={28} className="text-green-500" />;
    } else if (fileType.includes('document') || fileType.includes('pdf')) {
      return <FileText size={28} className="text-blue-500" />;
    }
    return <File size={28} className="text-gray-500" />;
  };

  const getClassificationColor = (classification: string) => {
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

  const resetUploader = () => {
    setFiles([]);
    setIsUploading(false);
    setUploadComplete(false);
    setEncryptAfterUpload(false);
    setClassification('Internal');
  };

  // If this is a modal version of the uploader
  if (!showModal) {
    return (
      <div 
        ref={dropZoneRef}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
        }`}
      >
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleInputChange}
          multiple
          className="hidden"
          accept={acceptedFileTypes.join(',')}
        />
        
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-4 bg-blue-100 rounded-full">
            <Upload size={28} className="text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">Upload your files</h3>
            <p className="text-sm text-gray-500 mt-1">
              Drag and drop files here or click to browse
            </p>
          </div>
          <button
            onClick={handleBrowseFiles}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
          >
            Select Files
          </button>
          <p className="text-xs text-gray-500">
            Supported formats: PDF, DOCX, XLSX, PPTX, JPG, PNG (Max {maxSize}MB)
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Upload size={20} className="text-blue-600 mr-2" />
            Upload Documents
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 flex-1 overflow-auto">
          {!uploadComplete ? (
            <>
              <div
                ref={dropZoneRef}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-6 text-center mb-6 transition-colors ${
                  isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
                } ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleInputChange}
                  multiple
                  className="hidden"
                  accept={acceptedFileTypes.join(',')}
                  disabled={isUploading}
                />
                
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Upload size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-md font-medium text-gray-900">Drag and drop files here</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      or <button 
                        onClick={handleBrowseFiles}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                        disabled={isUploading}
                      >
                        browse
                      </button> to select files
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">
                    Supported formats: PDF, DOCX, XLSX, PPTX, JPG, PNG (Max {maxSize}MB)
                  </p>
                </div>
              </div>

              {files.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Selected Files ({files.length}/{maxFiles})</h4>
                  <div className="space-y-3">
                    {files.map(file => (
                      <div key={file.id} className="bg-gray-50 rounded-md p-3 flex items-center">
                        <div className="flex-shrink-0 mr-3">
                          {getFileIcon(file.type)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                            {!isUploading && !file.uploaded && (
                              <button 
                                onClick={() => handleRemoveFile(file.id)}
                                className="ml-2 text-gray-400 hover:text-red-500"
                              >
                                <XCircle size={18} />
                              </button>
                            )}
                          </div>
                          <p className="text-xs text-gray-500">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                          {file.error && (
                            <div className="flex items-center mt-1 text-xs text-red-600">
                              <AlertTriangle size={12} className="mr-1" />
                              {file.error}
                            </div>
                          )}
                          {isUploading && (
                            <div className="mt-2">
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-gray-500">Uploading...</span>
                                <span className="text-gray-700">{Math.round(file.progress)}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div 
                                  className="bg-blue-600 h-1.5 rounded-full" 
                                  style={{ width: `${file.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                          {file.uploaded && (
                            <div className="flex items-center mt-1 text-xs text-green-600">
                              <Check size={12} className="mr-1" />
                              Uploaded {file.encrypted && "& Encrypted"}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t border-gray-200 pt-4">
                <div className="text-sm font-medium text-gray-700 mb-3">Document Security</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Classification
                    </label>
                    <select
                      value={classification}
                      onChange={(e) => setClassification(e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                      disabled={isUploading}
                    >
                      <option value="Public">Public</option>
                      <option value="Internal">Internal</option>
                      <option value="Confidential">Confidential</option>
                      <option value="Restricted">Restricted</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="encrypt-checkbox"
                      checked={encryptAfterUpload}
                      onChange={(e) => setEncryptAfterUpload(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      disabled={isUploading}
                    />
                    <label htmlFor="encrypt-checkbox" className="ml-2 block text-sm text-gray-700">
                      Encrypt after upload
                    </label>
                  </div>
                </div>

                {(classification === 'Confidential' || classification === 'Restricted') && !encryptAfterUpload && (
                  <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertTriangle size={20} className="text-yellow-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          <strong>Security recommendation:</strong> {classification} documents should be encrypted. 
                          Consider enabling encryption for these files.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check size={32} className="text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Complete!</h3>
              <p className="text-gray-600 mb-6">
                {files.length} file{files.length !== 1 ? 's' : ''} uploaded successfully.
                {files.some(f => f.encrypted) && ' Selected files have been encrypted.'}
              </p>
              
              <div className="bg-blue-50 border border-blue-100 rounded-md p-4 max-w-md mx-auto mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Shield size={20} className="text-blue-600" />
                  </div>
                  <div className="ml-3 text-left">
                    <h4 className="text-sm font-medium text-blue-800">Document Security</h4>
                    <p className="mt-1 text-xs text-blue-700">
                      Classification: <span className="font-medium">{classification}</span><br />
                      {encryptAfterUpload 
                        ? "Files encrypted for additional security." 
                        : "Files uploaded with standard security measures."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={resetUploader}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Upload More
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {!uploadComplete && (
          <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center bg-gray-50">
            <div className="text-sm text-gray-500">
              {files.length > 0 
                ? `${files.length} file${files.length !== 1 ? 's' : ''} selected` 
                : 'No files selected'}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                disabled={isUploading}
              >
                Cancel
              </button>
              <button
                onClick={startUpload}
                disabled={files.length === 0 || isUploading || files.some(f => f.error)}
                className={`px-4 py-2 rounded-md shadow-sm text-sm font-medium flex items-center ${
                  files.length === 0 || isUploading || files.some(f => f.error)
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isUploading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </>
                ) : (
                  <>
                    <ArrowUpCircle size={16} className="mr-1" />
                    Upload
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}