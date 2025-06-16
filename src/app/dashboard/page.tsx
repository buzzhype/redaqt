'use client';

import { useState, useCallback, useRef } from 'react';
import { 
  FileText,
  Lock,
  X,
  Check,
  Shield,
  FolderOpen,
  Eye,
  AlertTriangle,
  CheckCircle,
  Award,
  Info,
  Upload,
  Clock,
  Smartphone,
  Calendar,
  KeyRound,
  Download,
  Settings,
  ChevronDown,
  Loader2,
  Sparkles,
  FileCheck,
  LockKeyhole,
  Unlock,
  CheckSquare
} from 'lucide-react';

interface EncryptedFileMetadata {
  originalName: string;
  classification: string;
  encryptedDate: string;
  smartPolicy: {
    type: string;
    requiresPassphrase: boolean;
    requiresMFA: boolean;
    hasTimeRestriction: boolean;
    isDeviceLocked: boolean;
  };
  certificate?: {
    type: 'gold' | 'blue' | 'none';
    id: string;
    issuer: string;
    name: string;
    organization: string;
    signingTime: string;
    expiresAfter: string;
  };
}

interface ProcessedFile {
  originalName: string;
  processedName: string;
  status: 'encrypted' | 'decrypted';
  date: string;
  classification: string;
  size: string;
  path: string;
}

export default function EnhancedDashboardPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [dragActive, setDragActive] = useState(false);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [showSmartPolicyModal, setShowSmartPolicyModal] = useState(false);
  const [accountType, setAccountType] = useState('Pro');
  
  // Processing states
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [processComplete, setProcessComplete] = useState(false);
  const [processedFileResult, setProcessedFileResult] = useState<ProcessedFile | null>(null);
  
  // Decryption states
  const [isDecryptionMode, setIsDecryptionMode] = useState(false);
  const [encryptedFileMetadata, setEncryptedFileMetadata] = useState<EncryptedFileMetadata | null>(null);
  const [showSmartPolicyInput, setShowSmartPolicyInput] = useState(false);
  const [smartPolicyInput, setSmartPolicyInput] = useState('');
  const [smartPolicyError, setSmartPolicyError] = useState('');
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  
  const [recentlyProtectedFiles, setRecentlyProtectedFiles] = useState([
    { name: '2025 Financial Report.xlsx.efp', originalName: '2025 Financial Report.xlsx', date: '2025-04-10', id: 1, classification: 'Confidential', status: 'encrypted' as const },
    { name: 'Wire Transfer Routing.docx.efp', originalName: 'Wire Transfer Routing.docx', date: '2025-04-09', id: 2, classification: 'Restricted', status: 'encrypted' as const }
  ]);
  
  // Smart Policy Settings for encryption
  const [smartPolicy, setSmartPolicy] = useState({
    type: 'None',
    passphrase: '',
    mfaContact: '',
    doNotOpenBefore: '',
    doNotOpenAfter: '',
    lockToDevice: false
  });
  
  const [requestReceipt, setRequestReceipt] = useState({
    onRequest: false,
    onDelivery: false
  });
  
  const [selectedCertificate, setSelectedCertificate] = useState('Default Cert Logo');

  // Simulate file size calculation
  const getFileSize = (file: File): string => {
    const bytes = file.size;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  // Simulate file path
  const getFilePath = (fileName: string): string => {
    return `/Users/username/Documents/${fileName}`;
  };

  // Simulate reading metadata from encrypted file
  const readEncryptedFileMetadata = (file: File): EncryptedFileMetadata => {
    const originalName = file.name.replace('.efp', '');
    
    const hasSmartPolicy = file.name.includes('Critical') || file.name.includes('Financial');
    const requiresPassphrase = hasSmartPolicy && file.name.includes('Critical');
    const requiresMFA = hasSmartPolicy && file.name.includes('Financial');
    
    const metadata: EncryptedFileMetadata = {
      originalName,
      classification: file.name.includes('Financial') ? 'Confidential' : 
                    file.name.includes('Critical') ? 'Restricted' : 'Internal',
      encryptedDate: '2025-04-10',
      smartPolicy: {
        type: requiresPassphrase ? 'Passphrase' : requiresMFA ? 'MFA' : 'None',
        requiresPassphrase,
        requiresMFA,
        hasTimeRestriction: false,
        isDeviceLocked: false
      },
      certificate: file.name.includes('Financial') ? {
        type: 'gold',
        id: 'redaqt-2025-04-25-A1B2C3D4E5F6',
        issuer: 'RedaQt',
        name: 'John Doe',
        organization: 'JohnDoeCompany',
        signingTime: '2025-04-25 10:30:15',
        expiresAfter: '2026-04-25'
      } : file.name.includes('Critical') ? {
        type: 'blue',
        id: 'redaqt-2025-04-20-B2C3D4E5F6A1',
        issuer: 'RedaQt',
        name: 'Jane Smith',
        organization: 'SmithCorp',
        signingTime: '2025-04-20 14:22:30',
        expiresAfter: '2025-10-20'
      } : {
        type: 'none',
        id: '',
        issuer: '',
        name: '',
        organization: '',
        signingTime: '',
        expiresAfter: ''
      }
    };

    return metadata;
  };

  // File Drop Zone Handlers
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setCurrentFile(file);
      
      if (file.name.endsWith('.efp')) {
        handleDecryption(file);
      } else {
        setShowSmartPolicyModal(true);
      }
    }
  }, []);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCurrentFile(file);
      if (file.name.endsWith('.efp')) {
        handleDecryption(file);
      } else {
        setShowSmartPolicyModal(true);
      }
    }
  };

  const handleDecryption = async (file: File) => {
    console.log('Starting decryption for:', file.name);
    
    const metadata = readEncryptedFileMetadata(file);
    setEncryptedFileMetadata(metadata);
    setIsDecryptionMode(true);
    setProcessComplete(false);
    setShowSmartPolicyInput(false);
    setSmartPolicyError('');
  };

  const simulateDecryptionProcess = async () => {
    setIsProcessing(true);
    
    // Step 1: Validating file
    setProcessingStep('Validating encrypted file...');
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Step 2: Checking policy
    setProcessingStep('Checking smart policy requirements...');
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Step 3: Decrypting
    setProcessingStep('Decrypting file contents...');
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Step 4: Verifying integrity
    setProcessingStep('Verifying file integrity...');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIsProcessing(false);
  };

  const handleAccessRequest = async () => {
    if (!encryptedFileMetadata || !currentFile) return;
    
    const smartPolicyReq = encryptedFileMetadata.smartPolicy;
    
    if (smartPolicyReq.requiresPassphrase || smartPolicyReq.requiresMFA) {
      setShowSmartPolicyInput(true);
    } else {
      await simulateDecryptionProcess();
      
      // Create result
      const result: ProcessedFile = {
        originalName: currentFile.name,
        processedName: encryptedFileMetadata.originalName,
        status: 'decrypted',
        date: new Date().toISOString().split('T')[0],
        classification: encryptedFileMetadata.classification,
        size: getFileSize(currentFile),
        path: getFilePath(encryptedFileMetadata.originalName)
      };
      
      setProcessedFileResult(result);
      setProcessComplete(true);
      
      // Add to recently protected files
      const newFile = {
        name: encryptedFileMetadata.originalName,
        originalName: encryptedFileMetadata.originalName,
        date: new Date().toISOString().split('T')[0],
        id: Date.now(),
        classification: encryptedFileMetadata.classification,
        status: 'decrypted' as const
      };
      setRecentlyProtectedFiles(prev => [newFile, ...prev.slice(0, 4)]);
    }
  };

  const handleSmartPolicySubmit = async () => {
    if (!smartPolicyInput.trim()) {
      setSmartPolicyError('Please enter the required passphrase or MFA token');
      return;
    }
    
    await simulateDecryptionProcess();
    
    const validPassphrases = ['ThisIsMySuperSecretPassphrase', 'MySecretKey123', 'password123'];
    const isValid = validPassphrases.includes(smartPolicyInput);
    
    if (isValid && encryptedFileMetadata && currentFile) {
      setShowSmartPolicyInput(false);
      setSmartPolicyError('');
      
      // Create result
      const result: ProcessedFile = {
        originalName: currentFile.name,
        processedName: encryptedFileMetadata.originalName,
        status: 'decrypted',
        date: new Date().toISOString().split('T')[0],
        classification: encryptedFileMetadata.classification,
        size: getFileSize(currentFile),
        path: getFilePath(encryptedFileMetadata.originalName)
      };
      
      setProcessedFileResult(result);
      setProcessComplete(true);
      
      // Add to recently protected files
      const newFile = {
        name: encryptedFileMetadata.originalName,
        originalName: encryptedFileMetadata.originalName,
        date: new Date().toISOString().split('T')[0],
        id: Date.now(),
        classification: encryptedFileMetadata.classification,
        status: 'decrypted' as const
      };
      setRecentlyProtectedFiles(prev => [newFile, ...prev.slice(0, 4)]);
    } else {
      setSmartPolicyError('Invalid passphrase or MFA token. Please try again.');
    }
  };

  const simulateEncryptionProcess = async () => {
    setIsProcessing(true);
    
    // Step 1: Preparing file
    setProcessingStep('Preparing file for encryption...');
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Step 2: Generating keys
    setProcessingStep('Generating encryption keys...');
    await new Promise(resolve => setTimeout(resolve, 900));
    
    // Step 3: Applying policy
    setProcessingStep('Applying smart policy settings...');
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Step 4: Encrypting
    setProcessingStep('Encrypting file contents...');
    await new Promise(resolve => setTimeout(resolve, 1100));
    
    // Step 5: Creating protected file
    setProcessingStep('Creating protected file package...');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIsProcessing(false);
  };

  const handleEncryption = async () => {
    if (!currentFile) return;
    
    console.log('Encrypting file:', currentFile.name);
    
    await simulateEncryptionProcess();
    
    // Create result
    const encryptedFileName = `${currentFile.name}.efp`;
    const result: ProcessedFile = {
      originalName: currentFile.name,
      processedName: encryptedFileName,
      status: 'encrypted',
      date: new Date().toISOString().split('T')[0],
      classification: 'Internal',
      size: getFileSize(currentFile),
      path: getFilePath(encryptedFileName)
    };
    
    setProcessedFileResult(result);
    setProcessComplete(true);
    
    // Add to recently protected files
    const newFile = {
      name: encryptedFileName,
      originalName: currentFile.name,
      date: new Date().toISOString().split('T')[0],
      id: Date.now(),
      classification: 'Internal',
      status: 'encrypted' as const
    };
    setRecentlyProtectedFiles(prev => [newFile, ...prev.slice(0, 4)]);
    
    setShowSmartPolicyModal(false);
    resetSmartPolicy();
  };

  const handleOpenFile = () => {
    if (processedFileResult) {
      console.log(`Opening file: ${processedFileResult.processedName}`);
      alert(`File "${processedFileResult.processedName}" opened successfully!\n\nLocation: ${processedFileResult.path}`);
    }
  };

  const handleOpenFolder = () => {
    if (processedFileResult) {
      console.log(`Opening folder containing: ${processedFileResult.processedName}`);
      alert(`Opened folder containing "${processedFileResult.processedName}"\n\nLocation: ${processedFileResult.path.split('/').slice(0, -1).join('/')}`);
    }
  };

  const resetToInitial = () => {
    setIsDecryptionMode(false);
    setCurrentFile(null);
    setEncryptedFileMetadata(null);
    setShowSmartPolicyInput(false);
    setProcessComplete(false);
    setProcessedFileResult(null);
    setSmartPolicyInput('');
    setSmartPolicyError('');
    setIsProcessing(false);
    setProcessingStep('');
  };

  const resetSmartPolicy = () => {
    setSmartPolicy({
      type: 'None',
      passphrase: '',
      mfaContact: '',
      doNotOpenBefore: '',
      doNotOpenAfter: '',
      lockToDevice: false
    });
    setRequestReceipt({
      onRequest: false,
      onDelivery: false
    });
    setSelectedCertificate('Default Cert Logo');
  };

  const handleOpenRecentFile = (fileId: number) => {
    const file = recentlyProtectedFiles.find(f => f.id === fileId);
    if (file && file.name.endsWith('.efp')) {
      const mockFile = new File([''], file.name, { type: 'application/octet-stream' });
      setCurrentFile(mockFile);
      handleDecryption(mockFile);
    } else if (file) {
      alert(`Opening "${file.name}"\n\nThis file has been ${file.status === 'encrypted' ? 'encrypted' : 'decrypted'} successfully.`);
    }
  };

  const isFeatureAvailable = (feature: string) => {
    const restrictedFeatures = ['mfa', 'timeRestriction', 'deviceLock', 'requestReceipt', 'certificates'];
    if (accountType === 'Basic' && restrictedFeatures.includes(feature)) {
      return false;
    }
    return true;
  };

  const getCertificateIcon = (certificateType: string) => {
    switch (certificateType) {
      case 'gold':
        return <Award size={20} className="text-yellow-500" />;
      case 'blue':
        return <Award size={20} className="text-blue-500" />;
      default:
        return <X size={20} className="text-red-500" />;
    }
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

  const smartPolicyOptions = [
    { id: 'None', label: 'None', icon: null, description: 'No additional security' },
    { id: 'Passphrase', label: 'Add Passphrase', icon: KeyRound, description: 'Require passphrase to access' },
    { id: 'MFA', label: 'Add MFA Pin', icon: Smartphone, description: 'Require MFA token', disabled: !isFeatureAvailable('mfa') },
    { id: 'TimeRestriction', label: 'Time Restriction', icon: Clock, description: 'Set access time limits', disabled: !isFeatureAvailable('timeRestriction') },
    { id: 'DeviceLock', label: 'Lock to Device', icon: Lock, description: 'Restrict to current device', disabled: !isFeatureAvailable('deviceLock') }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
     

      <div className="flex-1 p-8">
        {/* Main Drop Zone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative min-h-96 border-2 border-dashed rounded-xl transition-all duration-300 overflow-hidden ${
            dragActive 
              ? 'border-blue-400 bg-blue-900/20 scale-105' 
              : 'border-gray-600 hover:border-gray-500 bg-gray-800'
          }`}
        >
          {!currentFile || (!isDecryptionMode && !showSmartPolicyModal && !processComplete) ? (
            <div className="relative flex items-center justify-center h-96">
              <div className="text-center">
                <div className={`w-20 h-20 mx-auto mb-6 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  dragActive 
                    ? 'bg-blue-600 scale-110' 
                    : 'bg-gray-700'
                }`}>
                  {dragActive ? (
                    <Download className="w-10 h-10 text-white animate-bounce" />
                  ) : (
                    <FileText className="w-10 h-10 text-gray-300" />
                  )}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {dragActive ? 'Drop your file here' : 'File Drop Zone'}
                </h3>
                <p className="text-gray-400 text-lg mb-6 max-w-md mx-auto">
                  Drop files here to encrypt or decrypt them with advanced security policies
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileInput}
                  className="hidden"
                />
                <button
                  onClick={handleFileSelect}
                  className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto"
                >
                  <Upload className="w-5 h-5 group-hover:animate-bounce" />
                  <span>Browse Files</span>
                </button>
              </div>
            </div>
          ) : isProcessing ? (
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Loader2 className="w-10 h-10 text-white animate-spin" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {isDecryptionMode ? 'Decrypting File' : 'Encrypting File'}
                </h3>
                <p className="text-xl text-gray-300 mb-4">
                  {currentFile?.name}
                </p>
                <div className="max-w-md mx-auto">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                      <span className="text-gray-300">{processingStep}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : processComplete && processedFileResult ? (
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 bg-green-600 rounded-xl flex items-center justify-center relative">
                    <CheckCircle className="w-10 h-10 text-white" />
                    <div className="absolute -top-1 -right-1">
                      {encryptedFileMetadata?.certificate && encryptedFileMetadata.certificate.type !== 'none' && (
                        <button
                          onClick={() => setShowCertificateModal(true)}
                          className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                          title="View Certificate"
                        >
                          {getCertificateIcon(encryptedFileMetadata.certificate.type)}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {processedFileResult.status === 'encrypted' ? 'File Successfully Encrypted' : 'File Successfully Decrypted'}
                </h3>
                <p className="text-lg text-gray-300 mb-6">
                  {processedFileResult.processedName}
                </p>
                
                {/* File Result Details */}
                <div className="bg-gray-800 rounded-xl p-6 mb-6 max-w-lg mx-auto">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-left">
                      <span className="text-blue-400 font-medium">Original File:</span>
                      <p className="text-white">{processedFileResult.originalName}</p>
                    </div>
                    <div className="text-left">
                      <span className="text-blue-400 font-medium">Result File:</span>
                      <p className="text-white">{processedFileResult.processedName}</p>
                    </div>
                    <div className="text-left">
                      <span className="text-blue-400 font-medium">File Size:</span>
                      <p className="text-white">{processedFileResult.size}</p>
                    </div>
                    <div className="text-left">
                      <span className="text-blue-400 font-medium">Status:</span>
                      <div className="flex items-center space-x-2">
                        {processedFileResult.status === 'encrypted' ? (
                          <LockKeyhole className="w-4 h-4 text-green-400" />
                        ) : (
                          <Unlock className="w-4 h-4 text-green-400" />
                        )}
                        <span className="text-green-400 capitalize">{processedFileResult.status}</span>
                      </div>
                    </div>
                    <div className="col-span-2 text-left">
                      <span className="text-blue-400 font-medium">File Location:</span>
                      <p className="text-white font-mono text-xs break-all">{processedFileResult.path}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleOpenFile}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors flex items-center font-medium"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  Open File
                </button>
                <button
                  onClick={handleOpenFolder}
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl transition-colors flex items-center font-medium"
                >
                  <FolderOpen className="w-5 h-5 mr-2" />
                  Show in Folder
                </button>
                <button
                  onClick={resetToInitial}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors font-medium"
                >
                  Process Another File
                </button>
              </div>
            </div>
          ) : isDecryptionMode && !processComplete ? (
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Access Protected File
                </h3>
                <p className="text-xl text-gray-300 mb-4">
                  {encryptedFileMetadata?.originalName}
                </p>
                {encryptedFileMetadata && (
                  <div className="flex justify-center">
                    <span className={`px-4 py-2 inline-flex text-sm font-medium rounded-full border ${getClassificationColor(encryptedFileMetadata.classification)}`}>
                      {encryptedFileMetadata.classification}
                    </span>
                  </div>
                )}
              </div>

              {!showSmartPolicyInput ? (
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={resetToInitial}
                    className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAccessRequest}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors flex items-center font-medium"
                  >
                    <Shield className="w-5 h-5 mr-2" />
                    Request Access
                  </button>
                </div>
              ) : (
                <div className="max-w-md mx-auto">
                  <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-xl p-6 mb-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <AlertTriangle className="w-6 h-6 text-yellow-500" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-medium text-yellow-300 mb-2">
                          Smart Policy Protection
                        </h3>
                        <p className="text-yellow-200">
                          {encryptedFileMetadata?.smartPolicy.requiresPassphrase 
                            ? 'This document requires a passphrase to access'
                            : 'This document requires MFA verification to access'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {encryptedFileMetadata?.smartPolicy.requiresPassphrase 
                          ? 'Enter Passphrase' 
                          : 'Enter MFA Token'}
                      </label>
                      <input
                        type={encryptedFileMetadata?.smartPolicy.requiresPassphrase ? 'password' : 'text'}
                        placeholder={encryptedFileMetadata?.smartPolicy.requiresPassphrase 
                          ? 'Enter your passphrase' 
                          : 'Enter MFA token'}
                        value={smartPolicyInput}
                        onChange={(e) => {
                          setSmartPolicyInput(e.target.value);
                          setSmartPolicyError('');
                        }}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                      {smartPolicyError && (
                        <p className="mt-2 text-sm text-red-400 flex items-center">
                          <AlertTriangle className="w-4 h-4 mr-1" />
                          {smartPolicyError}
                        </p>
                      )}
                    </div>

                    <div className="flex justify-center space-x-4 pt-4">
                      <button
                        onClick={() => {
                          setShowSmartPolicyInput(false);
                          setSmartPolicyInput('');
                          setSmartPolicyError('');
                        }}
                        className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSmartPolicySubmit}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors flex items-center font-medium"
                      >
                        <Check className="w-5 h-5 mr-2" />
                        Verify & Access
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Secure Your File
                </h3>
                <p className="text-lg text-gray-300">
                  {currentFile?.name}
                </p>
              </div>

              {/* Enhanced Smart Policy Section */}
              <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
                <h4 className="text-white font-semibold mb-4 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-blue-400" />
                  Smart Security Policy
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {smartPolicyOptions.map((option) => (
                    <label
                      key={option.id}
                      className={`relative flex items-start space-x-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                        smartPolicy.type === option.id
                          ? 'border-blue-500 bg-blue-900/30'
                          : option.disabled
                          ? 'border-gray-600 bg-gray-700/30 opacity-50 cursor-not-allowed'
                          : 'border-gray-600 hover:border-gray-500 bg-gray-700/30'
                      }`}
                    >
                      <input
                        type="radio"
                        name="smartPolicy"
                        value={option.id}
                        checked={smartPolicy.type === option.id}
                        onChange={(e) => !option.disabled && setSmartPolicy({...smartPolicy, type: e.target.value})}
                        disabled={option.disabled}
                        className="sr-only"
                      />
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        smartPolicy.type === option.id
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-400'
                      }`}>
                        {smartPolicy.type === option.id && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          {option.icon && <option.icon className="w-4 h-4 text-gray-400" />}
                          <span className="text-white font-medium">{option.label}</span>
                          {option.disabled && (
                            <span className="text-xs text-orange-400 bg-orange-900/30 px-2 py-1 rounded-full">
                              Pro
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-400 mt-1">{option.description}</p>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Conditional inputs */}
                {smartPolicy.type === 'Passphrase' && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Secure Passphrase
                    </label>
                    <input
                      type="password"
                      placeholder="Enter a strong passphrase"
                      value={smartPolicy.passphrase}
                      onChange={(e) => setSmartPolicy({...smartPolicy, passphrase: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}

                {smartPolicy.type === 'MFA' && isFeatureAvailable('mfa') && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      MFA Contact
                    </label>
                    <input
                      type="email"
                      placeholder="Email or mobile number for MFA"
                      value={smartPolicy.mfaContact}
                      onChange={(e) => setSmartPolicy({...smartPolicy, mfaContact: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}
              </div>

              {/* Time Restrictions */}
              <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
                <h4 className="text-white font-semibold mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-400" />
                  Time Restrictions
                  {!isFeatureAvailable('timeRestriction') && (
                    <span className="ml-2 text-xs text-orange-400 bg-orange-900/30 px-2 py-1 rounded-full">
                      Pro Feature
                    </span>
                  )}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Do not open before
                    </label>
                    <input
                      type="datetime-local"
                      value={smartPolicy.doNotOpenBefore}
                      onChange={(e) => setSmartPolicy({...smartPolicy, doNotOpenBefore: e.target.value})}
                      disabled={!isFeatureAvailable('timeRestriction')}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-800 disabled:text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Do not open after
                    </label>
                    <input
                      type="datetime-local"
                      value={smartPolicy.doNotOpenAfter}
                      onChange={(e) => setSmartPolicy({...smartPolicy, doNotOpenAfter: e.target.value})}
                      disabled={!isFeatureAvailable('timeRestriction')}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-800 disabled:text-gray-500"
                    />
                  </div>
                </div>
              </div>

              {/* Request Receipt */}
              <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
                <h4 className="text-white font-semibold mb-4 flex items-center">
                  <Info className="w-5 h-5 mr-2 text-blue-400" />
                  Request Receipt
                  {!isFeatureAvailable('requestReceipt') && (
                    <span className="ml-2 text-xs text-orange-400 bg-orange-900/30 px-2 py-1 rounded-full">
                      Pro Feature
                    </span>
                  )}
                </h4>
                <div className="flex space-x-6">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={requestReceipt.onRequest}
                      onChange={(e) => setRequestReceipt({...requestReceipt, onRequest: e.target.checked})}
                      disabled={!isFeatureAvailable('requestReceipt')}
                      className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2 disabled:opacity-50"
                    />
                    <span className={`text-sm ${!isFeatureAvailable('requestReceipt') ? 'text-gray-500' : 'text-gray-300'}`}>
                      On request
                    </span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={requestReceipt.onDelivery}
                      onChange={(e) => setRequestReceipt({...requestReceipt, onDelivery: e.target.checked})}
                      disabled={!isFeatureAvailable('requestReceipt')}
                      className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2 disabled:opacity-50"
                    />
                    <span className={`text-sm ${!isFeatureAvailable('requestReceipt') ? 'text-gray-500' : 'text-gray-300'}`}>
                      On delivery
                    </span>
                  </label>
                </div>
              </div>

              {/* Certificate Selection */}
              <div className="bg-gray-800 rounded-xl p-6 mb-8 border border-gray-700">
                <h4 className="text-white font-semibold mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-blue-400" />
                  Digital Certificate
                  {!isFeatureAvailable('certificates') && (
                    <span className="ml-2 text-xs text-orange-400 bg-orange-900/30 px-2 py-1 rounded-full">
                      Pro Feature
                    </span>
                  )}
                </h4>
                <div className="relative">
                  <select
                    value={selectedCertificate}
                    onChange={(e) => setSelectedCertificate(e.target.value)}
                    disabled={!isFeatureAvailable('certificates')}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-800 disabled:text-gray-500 appearance-none"
                  >
                    <option value="Default Cert Logo">Default Certificate</option>
                    <option value="Company Certificate">Company Certificate</option>
                    <option value="Personal Certificate">Personal Certificate</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => {
                    setCurrentFile(null);
                    resetSmartPolicy();
                  }}
                  className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEncryption}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors flex items-center"
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Encrypt File
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Recently Protected Files */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Clock className="w-6 h-6 mr-2 text-blue-400" />
            Recently Protected Files
          </h3>
          <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
            {recentlyProtectedFiles.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                <p>No recently protected files</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-700">
                {recentlyProtectedFiles.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-6 hover:bg-gray-700/50 transition-colors group">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        file.status === 'encrypted' 
                          ? 'bg-green-600' 
                          : 'bg-blue-600'
                      }`}>
                        {file.status === 'encrypted' ? (
                          <LockKeyhole className="w-5 h-5 text-white" />
                        ) : (
                          <FileCheck className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div>
                        <span className="text-white font-medium block">{file.name}</span>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm text-gray-400">{file.date}</span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getClassificationColor(file.classification)}`}>
                            {file.classification}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            file.status === 'encrypted' 
                              ? 'bg-green-900 text-green-300' 
                              : 'bg-blue-900 text-blue-300'
                          }`}>
                            {file.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleOpenRecentFile(file.id)}
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-xl transition-colors opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0"
                    >
                      Open
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Certificate Modal */}
      {showCertificateModal && encryptedFileMetadata?.certificate && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-xl shadow-2xl max-w-lg w-full border border-gray-700 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Document Certification</h2>
                <button
                  onClick={() => setShowCertificateModal(false)}
                  className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-gray-700 rounded-xl flex items-center justify-center">
                  {getCertificateIcon(encryptedFileMetadata.certificate.type)}
                </div>
                <h3 className="text-lg font-medium text-white mb-2">
                  This document has been certified with a {encryptedFileMetadata.certificate.type === 'gold' ? 'Gold' : 'Blue'} certificate
                </h3>
              </div>

              <div className="bg-gray-700 rounded-xl p-6 mb-6">
                <div className="grid grid-cols-1 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-400 font-medium">Certificate ID</span>
                    <span className="text-white font-mono text-xs">{encryptedFileMetadata.certificate.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-400 font-medium">Signing Time</span>
                    <span className="text-white">{encryptedFileMetadata.certificate.signingTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-400 font-medium">Expires After</span>
                    <span className="text-white">{encryptedFileMetadata.certificate.expiresAfter}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-400 font-medium">Name</span>
                    <span className="text-white">{encryptedFileMetadata.certificate.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-400 font-medium">Organization</span>
                    <span className="text-white">{encryptedFileMetadata.certificate.organization}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setShowCertificateModal(false)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}