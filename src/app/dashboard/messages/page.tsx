'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  X,
  Mail,
  MailOpen,
  Archive,
  ArchiveX,
  Clock,
  AlertCircle,
  CheckCircle,
  Info,
  Bell,
  Trash2,
  Star,
  Filter,
  Search,
  Loader2,
  ChevronDown,
  RefreshCw,
  ArrowLeft,
  Shield,
  Download,
  ExternalLink,
  Calendar,
  FileText,
  Users,
  Settings,
  Award,
  BarChart3,
  Activity,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';

interface Message {
  id: string;
  subject: string;
  content: string;
  sender: string;
  timestamp: string;
  read: boolean;
  archived: boolean;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  category: 'system' | 'security' | 'account' | 'notification';
  hasActions?: boolean;
  actionData?: any;
}

interface MessageAPIResponse {
  new_messages: boolean;
  messages?: Message[];
  status: 'success' | 'error';
  error?: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingMessages, setIsCheckingMessages] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<'all' | 'unread' | 'archived'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [lastChecked, setLastChecked] = useState<Date>(new Date());
  const [hasNewMessages, setHasNewMessages] = useState(false);
  
  // Detail view states
  const [currentView, setCurrentView] = useState<'list' | 'detail'>('list');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  
  // Modal states for CTAs
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalData, setModalData] = useState<any>(null);
  const [actionInProgress, setActionInProgress] = useState(false);

  // Simulate initial messages with actionable content
  const initialMessages: Message[] = [
    {
      id: 'msg-001',
      subject: 'Security Policy Update Required',
      content: 'Your organization security policies need to be updated. Please review the new compliance requirements and update your smart policies accordingly.',
      sender: 'RedaQt Security Team',
      timestamp: '2025-04-10 14:30:15',
      read: false,
      archived: false,
      priority: 'high',
      category: 'security',
      hasActions: true,
      actionData: {
        type: 'policy_update',
        policies: ['Smart Policy v2.1', 'Certificate Management', 'Access Control'],
        deadline: '2025-04-25',
        complianceLevel: 'SOC 2 Type II'
      }
    },
    {
      id: 'msg-002',
      subject: 'Monthly Usage Report Available',
      content: 'Your monthly encryption/decryption usage report is now available for download. This month you processed 47 files with a total size of 2.3GB.',
      sender: 'RedaQt Analytics',
      timestamp: '2025-04-10 09:15:22',
      read: false,
      archived: false,
      priority: 'normal',
      category: 'account',
      hasActions: true,
      actionData: {
        type: 'usage_report',
        period: 'March 2025',
        stats: {
          filesProcessed: 47,
          totalSize: '2.3GB',
          encryptedFiles: 28,
          decryptedFiles: 19,
          topFileTypes: ['PDF', 'DOCX', 'XLSX'],
          peakUsageDay: 'March 15, 2025'
        }
      }
    },
    {
      id: 'msg-003',
      subject: 'File Access Request: Financial_Report_Q1.xlsx.efp',
      content: 'Jane Smith (jane@company.com) has requested access to your protected file. The request includes business justification and has been pending for 2 hours.',
      sender: 'RedaQt Access Control',
      timestamp: '2025-04-09 16:45:30',
      read: false,
      archived: false,
      priority: 'urgent',
      category: 'security',
      hasActions: true,
      actionData: {
        type: 'access_request',
        requester: {
          name: 'Jane Smith',
          email: 'jane@company.com',
          role: 'Financial Analyst',
          department: 'Finance'
        },
        fileName: 'Financial_Report_Q1.xlsx.efp',
        originalFile: 'Financial_Report_Q1.xlsx',
        requestTime: '2025-04-09 14:45:30',
        justification: 'Required for quarterly board presentation and compliance reporting.',
        urgency: 'High - Board meeting scheduled for tomorrow',
        classification: 'Confidential'
      }
    },
    {
      id: 'msg-004',
      subject: 'Certificate Expiration Warning',
      content: 'Your Gold certificate will expire in 30 days. Please renew your certificate to continue using advanced certification features.',
      sender: 'RedaQt Certificate Authority',
      timestamp: '2025-04-09 11:20:18',
      read: false,
      archived: false,
      priority: 'urgent',
      category: 'security',
      hasActions: true,
      actionData: {
        type: 'certificate_expiry',
        certificateType: 'Gold',
        certificateId: 'redaqt-2025-04-25-A1B2C3D4E5F6',
        expiryDate: '2025-05-09',
        daysRemaining: 30,
        features: ['Advanced Encryption', 'Multi-Factor Authentication', 'Audit Trails'],
        renewalCost: '$299/year'
      }
    },
    {
      id: 'msg-005',
      subject: 'System Maintenance Scheduled',
      content: 'Scheduled maintenance window: April 15, 2025, 2:00 AM - 4:00 AM UTC. Services may be temporarily unavailable during this time.',
      sender: 'RedaQt Operations',
      timestamp: '2025-04-08 13:10:45',
      read: true,
      archived: false,
      priority: 'normal',
      category: 'system',
      hasActions: true,
      actionData: {
        type: 'maintenance',
        startTime: '2025-04-15 02:00:00 UTC',
        endTime: '2025-04-15 04:00:00 UTC',
        affectedServices: ['Encryption API', 'Web Dashboard', 'File Processing'],
        impact: 'Service interruption expected',
        preparation: ['Download any pending files', 'Complete active encryption tasks']
      }
    }
  ];

  // Initialize messages on component mount
  useEffect(() => {
    setMessages(initialMessages);
  }, []);

  // Simulate periodic message checking (every 30 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      checkForNewMessages();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Simulate API call to check for new messages
  const checkForNewMessages = useCallback(async (): Promise<MessageAPIResponse> => {
    setIsCheckingMessages(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate random new messages (20% chance)
    const hasNew = Math.random() < 0.2;
    
    let newMessages: Message[] = [];
    if (hasNew) {
      const newMessageTemplates = [
        {
          subject: 'Bulk Encryption Task Completed',
          content: 'Your bulk encryption task for 15 files has been completed successfully. All files are now protected with AES-256 encryption.',
          sender: 'RedaQt Processing Engine',
          priority: 'normal' as const,
          category: 'notification' as const,
          hasActions: true,
          actionData: {
            type: 'bulk_task_complete',
            taskId: 'bulk-' + Date.now(),
            filesProcessed: 15,
            totalSize: '45.7MB',
            encryptionType: 'AES-256',
            completionTime: '3m 42s'
          }
        },
        {
          subject: 'New Login Detected',
          content: 'A new login to your RedaQt account was detected from Chrome on Windows. If this wasn\'t you, please secure your account immediately.',
          sender: 'RedaQt Security Monitor',
          priority: 'high' as const,
          category: 'security' as const,
          hasActions: true,
          actionData: {
            type: 'security_alert',
            loginTime: new Date().toISOString(),
            browser: 'Chrome 121.0.0.0',
            os: 'Windows 11',
            location: 'San Francisco, CA',
            ipAddress: '192.168.1.100'
          }
        }
      ];
      
      const template = newMessageTemplates[Math.floor(Math.random() * newMessageTemplates.length)];
      newMessages = [{
        id: `msg-${Date.now()}`,
        ...template,
        timestamp: new Date().toISOString().replace('T', ' ').split('.')[0],
        read: false,
        archived: false
      }];
    }
    
    setIsCheckingMessages(false);
    setLastChecked(new Date());
    
    if (hasNew && newMessages.length > 0) {
      setMessages(prev => [...newMessages, ...prev]);
      setHasNewMessages(true);
      
      // Auto-clear new message indicator after 5 seconds
      setTimeout(() => setHasNewMessages(false), 5000);
    }
    
    return {
      new_messages: hasNew,
      messages: hasNew ? newMessages : undefined,
      status: 'success'
    };
  }, []);

  // Simulate marking messages as read
  const markAsRead = useCallback(async (messageIds: string[]) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setMessages(prev => 
      prev.map(msg => 
        messageIds.includes(msg.id) ? { ...msg, read: true } : msg
      )
    );
    
    console.log('Marked as read:', messageIds);
  }, []);

  // Archive single message
  const archiveMessage = useCallback(async (messageId: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, archived: true, read: true } : msg
      )
    );
    
    setIsLoading(false);
    console.log('Archived message:', messageId);
  }, []);

  // Archive all messages
  const archiveAllMessages = useCallback(async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setMessages(prev => 
      prev.map(msg => ({ ...msg, archived: true, read: true }))
    );
    
    setSelectedMessages(new Set());
    setIsLoading(false);
    console.log('Archived all messages');
  }, []);

  // Archive selected messages
  const archiveSelectedMessages = useCallback(async () => {
    if (selectedMessages.size === 0) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const messageIds = Array.from(selectedMessages);
    setMessages(prev => 
      prev.map(msg => 
        messageIds.includes(msg.id) ? { ...msg, archived: true, read: true } : msg
      )
    );
    
    setSelectedMessages(new Set());
    setIsLoading(false);
    console.log('Archived selected messages:', messageIds);
  }, [selectedMessages]);

  // Handle message selection
  const toggleMessageSelection = useCallback((messageId: string) => {
    setSelectedMessages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(messageId)) {
        newSet.delete(messageId);
      } else {
        newSet.add(messageId);
      }
      return newSet;
    });
  }, []);

  // Select all visible messages
  const selectAllVisible = useCallback(() => {
    const visibleMessages = getFilteredMessages();
    const allSelected = visibleMessages.every(msg => selectedMessages.has(msg.id));
    
    if (allSelected) {
      setSelectedMessages(new Set());
    } else {
      setSelectedMessages(new Set(visibleMessages.map(msg => msg.id)));
    }
  }, [messages, filter, searchQuery, selectedMessages]);

  // Handle clicking on a message (mark as read and show detail)
  const handleMessageClick = useCallback(async (messageId: string) => {
    const message = messages.find(msg => msg.id === messageId);
    if (!message) return;
    
    // Mark as read if not already
    if (!message.read) {
      await markAsRead([messageId]);
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId ? { ...msg, read: true } : msg
        )
      );
    }
    
    // Show detail view
    setSelectedMessage(message);
    setCurrentView('detail');
  }, [messages, markAsRead]);

  // Handle back to list
  const handleBackToList = useCallback(() => {
    setCurrentView('list');
    setSelectedMessage(null);
  }, []);

  // Modal handlers
  const openModal = useCallback((modalType: string, data?: any) => {
    setActiveModal(modalType);
    setModalData(data);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setModalData(null);
    setActionInProgress(false);
  }, []);

  // Simulate various actions
  const handlePolicyUpdate = useCallback(async () => {
    setActionInProgress(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setActionInProgress(false);
    closeModal();
    // Show success message or update UI
  }, [closeModal]);

  const handleAccessDecision = useCallback(async (decision: 'grant' | 'deny', requestData: any) => {
    setActionInProgress(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setActionInProgress(false);
    closeModal();
    // Update message or show confirmation
  }, [closeModal]);

  const handleCertificateRenewal = useCallback(async () => {
    setActionInProgress(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    setActionInProgress(false);
    closeModal();
    // Show renewal success
  }, [closeModal]);

  const handleDownloadReport = useCallback(async () => {
    setActionInProgress(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setActionInProgress(false);
    closeModal();
    // Simulate download
  }, [closeModal]);

  // Filter messages based on current filter and search
  const getFilteredMessages = useCallback(() => {
    let filtered = messages;
    
    // Apply status filter
    switch (filter) {
      case 'unread':
        filtered = filtered.filter(msg => !msg.read);
        break;
      case 'archived':
        filtered = filtered.filter(msg => msg.archived);
        break;
      default: // 'all'
        filtered = filtered.filter(msg => !msg.archived);
    }
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(msg => 
        msg.subject.toLowerCase().includes(query) ||
        msg.content.toLowerCase().includes(query) ||
        msg.sender.toLowerCase().includes(query)
      );
    }
    
    // Sort by timestamp (newest first)
    return filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [messages, filter, searchQuery]);

  const filteredMessages = getFilteredMessages();
  const unreadCount = messages.filter(msg => !msg.read && !msg.archived).length;
  const selectedCount = selectedMessages.size;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-400 bg-red-900/30';
      case 'high': return 'text-orange-400 bg-orange-900/30';
      case 'normal': return 'text-blue-400 bg-blue-900/30';
      case 'low': return 'text-gray-400 bg-gray-900/30';
      default: return 'text-gray-400 bg-gray-900/30';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'security': return <Shield className="w-4 h-4" />;
      case 'system': return <Settings className="w-4 h-4" />;
      case 'account': return <Star className="w-4 h-4" />;
      case 'notification': return <Bell className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays === 0) {
      if (diffHours === 0) {
        const diffMins = Math.floor(diffMs / (1000 * 60));
        return `${diffMins}m ago`;
      }
      return `${diffHours}h ago`;
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // Render modal content based on type
  const renderModalContent = () => {
    if (!activeModal || !modalData) return null;

    switch (activeModal) {
      case 'access_decision':
        return (
          <div className="bg-gray-800 rounded-xl p-6 max-w-lg w-full border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">
              {modalData.decision === 'grant' ? 'Grant File Access' : 'Deny File Access'}
            </h3>
            <div className="mb-6">
              <p className="text-gray-300 mb-4">
                {modalData.decision === 'grant' 
                  ? `Grant access to "${modalData.originalFile}" for ${modalData.requester.name}?`
                  : `Deny access request from ${modalData.requester.name} for "${modalData.originalFile}"?`}
              </p>
              {modalData.decision === 'deny' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Reason for denial (optional)
                  </label>
                  <textarea
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Enter reason for denial..."
                  />
                </div>
              )}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                disabled={actionInProgress}
              >
                Cancel
              </button>
              <button
                onClick={() => handleAccessDecision(modalData.decision, modalData)}
                disabled={actionInProgress}
                className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center ${
                  modalData.decision === 'grant' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-red-600 hover:bg-red-700'
                } text-white`}
              >
                {actionInProgress ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  modalData.decision === 'grant' ? 'Grant Access' : 'Deny Access'
                )}
              </button>
            </div>
          </div>
        );

      case 'policy_update':
        return (
          <div className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full border border-gray-700 max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-white mb-4">Security Policy Update</h3>
            <div className="mb-6">
              <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-4 mb-4">
                <div className="flex items-center mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
                  <span className="text-red-300 font-medium">Action Required</span>
                </div>
                <p className="text-red-200 text-sm">
                  Updates must be completed by {new Date(modalData.deadline).toLocaleDateString()} to maintain {modalData.complianceLevel} compliance.
                </p>
              </div>
              
              <div className="space-y-4">
                {modalData.policies.map((policy: string, index: number) => (
                  <div key={index} className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-blue-400 mr-3" />
                        <div>
                          <h4 className="text-white font-medium">{policy}</h4>
                          <p className="text-gray-400 text-sm">Update required for compliance</p>
                        </div>
                      </div>
                      <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors">
                        Update
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                disabled={actionInProgress}
              >
                Cancel
              </button>
              <button
                onClick={handlePolicyUpdate}
                disabled={actionInProgress}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center"
              >
                {actionInProgress ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating Policies...
                  </>
                ) : (
                  'Update All Policies'
                )}
              </button>
            </div>
          </div>
        );

      case 'view_requirements':
        return (
          <div className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full border border-gray-700 max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-white mb-4">Compliance Requirements</h3>
            <div className="space-y-6">
              <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
                <h4 className="text-blue-300 font-medium mb-2">{modalData.complianceLevel} Requirements</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Multi-factor authentication enabled
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Regular security audits completed
                  </li>
                  <li className="flex items-center">
                    <AlertTriangle className="w-4 h-4 text-orange-400 mr-2" />
                    Smart policy configurations updated
                  </li>
                  <li className="flex items-center">
                    <AlertTriangle className="w-4 h-4 text-orange-400 mr-2" />
                    Certificate management policies reviewed
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">Implementation Timeline</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Policy Review</span>
                    <span className="text-blue-400">3-5 business days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Implementation</span>
                    <span className="text-blue-400">1-2 business days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Compliance Verification</span>
                    <span className="text-blue-400">1 business day</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        );

      case 'certificate_renewal':
        return (
          <div className="bg-gray-800 rounded-xl p-6 max-w-lg w-full border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Renew Certificate</h3>
            <div className="mb-6">
              <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4 mb-4">
                <div className="text-center">
                  <Award className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
                  <h4 className="text-yellow-300 font-medium">{modalData.certificateType} Certificate</h4>
                  <p className="text-yellow-200 text-sm">Valid for 1 year from renewal date</p>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Current Expiry:</span>
                  <span className="text-white">{new Date(modalData.expiryDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Renewal Cost:</span>
                  <span className="text-white font-medium">{modalData.renewalCost}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Auto-renewal:</span>
                  <span className="text-blue-400">Enabled</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                disabled={actionInProgress}
              >
                Cancel
              </button>
              <button
                onClick={handleCertificateRenewal}
                disabled={actionInProgress}
                className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium transition-colors flex items-center"
              >
                {actionInProgress ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Renew Now'
                )}
              </button>
            </div>
          </div>
        );

      case 'download_report':
        return (
          <div className="bg-gray-800 rounded-xl p-6 max-w-lg w-full border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Download Usage Report</h3>
            <div className="mb-6">
              <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4 mb-4">
                <h4 className="text-blue-300 font-medium mb-2">Report: {modalData.period}</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-blue-400">Files:</span>
                    <span className="text-white ml-2">{modalData.stats.filesProcessed}</span>
                  </div>
                  <div>
                    <span className="text-blue-400">Size:</span>
                    <span className="text-white ml-2">{modalData.stats.totalSize}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded" />
                  <span className="text-gray-300 text-sm">Include detailed analytics</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded" />
                  <span className="text-gray-300 text-sm">Include security metrics</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded" />
                  <span className="text-gray-300 text-sm">Include user activity logs</span>
                </label>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                disabled={actionInProgress}
              >
                Cancel
              </button>
              <button
                onClick={handleDownloadReport}
                disabled={actionInProgress}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center"
              >
                {actionInProgress ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Preparing...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </>
                )}
              </button>
            </div>
          </div>
        );

      case 'add_calendar':
        return (
          <div className="bg-gray-800 rounded-xl p-6 max-w-lg w-full border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Add to Calendar</h3>
            <div className="mb-6">
              <div className="bg-orange-900/20 border border-orange-600/30 rounded-lg p-4 mb-4">
                <h4 className="text-orange-300 font-medium mb-2">Maintenance Window</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-orange-400">Start:</span>
                    <span className="text-white">{new Date(modalData.startTime).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-orange-400">End:</span>
                    <span className="text-white">{new Date(modalData.endTime).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-orange-400">Duration:</span>
                    <span className="text-white">2 hours</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="block">
                  <span className="text-gray-300 text-sm">Calendar service:</span>
                  <select className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                    <option>Google Calendar</option>
                    <option>Outlook Calendar</option>
                    <option>Apple Calendar</option>
                    <option>Download .ics file</option>
                  </select>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded" />
                  <span className="text-gray-300 text-sm">Set reminder 1 hour before</span>
                </label>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setActionInProgress(true);
                  setTimeout(() => {
                    setActionInProgress(false);
                    closeModal();
                  }, 1000);
                }}
                disabled={actionInProgress}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center"
              >
                {actionInProgress ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4 mr-2" />
                    Add Event
                  </>
                )}
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-gray-800 rounded-xl p-6 max-w-lg w-full border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Action Completed</h3>
            <p className="text-gray-300 mb-6">The requested action has been processed successfully.</p>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        );
    }
  };
  const renderMessageDetail = () => {
    if (!selectedMessage) return null;

    const renderActionContent = () => {
      const { actionData } = selectedMessage;
      if (!actionData) return null;

      switch (actionData.type) {
        case 'access_request':
          return (
            <div className="space-y-6">
              <div className="bg-orange-900/20 border border-orange-600/30 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-orange-300 mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Access Request Details
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-orange-400 font-medium">Requester:</span>
                    <p className="text-white">{actionData.requester.name}</p>
                    <p className="text-gray-400">{actionData.requester.email}</p>
                  </div>
                  <div>
                    <span className="text-orange-400 font-medium">Role:</span>
                    <p className="text-white">{actionData.requester.role}</p>
                    <p className="text-gray-400">{actionData.requester.department}</p>
                  </div>
                  <div>
                    <span className="text-orange-400 font-medium">File:</span>
                    <p className="text-white">{actionData.originalFile}</p>
                    <p className="text-gray-400">{actionData.classification}</p>
                  </div>
                  <div>
                    <span className="text-orange-400 font-medium">Request Time:</span>
                    <p className="text-white">{new Date(actionData.requestTime).toLocaleString()}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-orange-400 font-medium">Justification:</span>
                    <p className="text-white mt-1">{actionData.justification}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-orange-400 font-medium">Urgency:</span>
                    <p className="text-white mt-1">{actionData.urgency}</p>
                  </div>
                </div>
                <div className="flex space-x-3 mt-6">
                  <button 
                    onClick={() => openModal('access_decision', { decision: 'deny', ...actionData })}
                    className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Deny Access
                  </button>
                  <button 
                    onClick={() => openModal('access_decision', { decision: 'grant', ...actionData })}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Grant Access
                  </button>
                  <button 
                    onClick={() => openModal('request_info', actionData)}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Request More Info
                  </button>
                </div>
              </div>
            </div>
          );

        case 'usage_report':
          return (
            <div className="space-y-6">
              <div className="bg-blue-900/20 border border-blue-600/30 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-blue-300 mb-4 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Usage Statistics - {actionData.period}
                </h4>
                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">{actionData.stats.filesProcessed}</div>
                    <div className="text-blue-400">Files Processed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">{actionData.stats.totalSize}</div>
                    <div className="text-blue-400">Total Data</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">{actionData.stats.encryptedFiles}</div>
                    <div className="text-blue-400">Encrypted</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-blue-400 font-medium">Peak Usage Day:</span>
                    <p className="text-white">{actionData.stats.peakUsageDay}</p>
                  </div>
                  <div>
                    <span className="text-blue-400 font-medium">Top File Types:</span>
                    <p className="text-white">{actionData.stats.topFileTypes.join(', ')}</p>
                  </div>
                </div>
                <div className="flex space-x-3 mt-6">
                  <button 
                    onClick={() => openModal('download_report', actionData)}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Full Report
                  </button>
                  <button 
                    onClick={() => openModal('analytics_dashboard', actionData)}
                    className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Analytics Dashboard
                  </button>
                </div>
              </div>
            </div>
          );

        case 'certificate_expiry':
          return (
            <div className="space-y-6">
              <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-yellow-300 mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Certificate Renewal Required
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                  <div>
                    <span className="text-yellow-400 font-medium">Certificate Type:</span>
                    <p className="text-white">{actionData.certificateType} Certificate</p>
                  </div>
                  <div>
                    <span className="text-yellow-400 font-medium">Expiry Date:</span>
                    <p className="text-white">{new Date(actionData.expiryDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="text-yellow-400 font-medium">Days Remaining:</span>
                    <p className="text-white">{actionData.daysRemaining} days</p>
                  </div>
                  <div>
                    <span className="text-yellow-400 font-medium">Renewal Cost:</span>
                    <p className="text-white">{actionData.renewalCost}</p>
                  </div>
                </div>
                <div>
                  <span className="text-yellow-400 font-medium">Features Included:</span>
                  <ul className="text-white mt-2 space-y-1">
                    {actionData.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex space-x-3 mt-6">
                  <button 
                    onClick={() => openModal('certificate_renewal', actionData)}
                    className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Renew Certificate
                  </button>
                  <button 
                    onClick={() => openModal('certificate_details', actionData)}
                    className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                  >
                    View Certificate Details
                  </button>
                </div>
              </div>
            </div>
          );

        case 'maintenance':
          return (
            <div className="space-y-6">
              <div className="bg-gray-800 border border-gray-600 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-300 mb-4 flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Maintenance Schedule
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                  <div>
                    <span className="text-blue-400 font-medium">Start Time:</span>
                    <p className="text-white">{new Date(actionData.startTime).toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-blue-400 font-medium">End Time:</span>
                    <p className="text-white">{new Date(actionData.endTime).toLocaleString()}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-blue-400 font-medium">Affected Services:</span>
                    <ul className="text-white mt-2">
                      {actionData.affectedServices.map((service: string, index: number) => (
                        <li key={index} className="flex items-center">
                          <AlertTriangle className="w-4 h-4 text-orange-400 mr-2" />
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-span-2">
                    <span className="text-blue-400 font-medium">Preparation Steps:</span>
                    <ul className="text-white mt-2 space-y-1">
                      {actionData.preparation.map((step: string, index: number) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex space-x-3 mt-6">
                  <button 
                    onClick={() => openModal('add_calendar', actionData)}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Add to Calendar
                  </button>
                  <button 
                    onClick={() => openModal('set_reminder', actionData)}
                    className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Set Reminder
                  </button>
                </div>
              </div>
            </div>
          );

        case 'policy_update':
          return (
            <div className="space-y-6">
              <div className="bg-red-900/20 border border-red-600/30 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-red-300 mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Security Policy Update
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                  <div>
                    <span className="text-red-400 font-medium">Compliance Level:</span>
                    <p className="text-white">{actionData.complianceLevel}</p>
                  </div>
                  <div>
                    <span className="text-red-400 font-medium">Update Deadline:</span>
                    <p className="text-white">{new Date(actionData.deadline).toLocaleDateString()}</p>
                  </div>
                </div>
                <div>
                  <span className="text-red-400 font-medium">Policies Requiring Updates:</span>
                  <ul className="text-white mt-2 space-y-2">
                    {actionData.policies.map((policy: string, index: number) => (
                      <li key={index} className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 text-blue-400 mr-3" />
                          {policy}
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex space-x-3 mt-6">
                  <button 
                    onClick={() => openModal('policy_update', actionData)}
                    className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Update Policies Now
                  </button>
                  <button 
                    onClick={() => openModal('view_requirements', actionData)}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    View Requirements
                  </button>
                </div>
              </div>
            </div>
          );

        default:
          return (
            <div className="bg-gray-800 border border-gray-600 rounded-xl p-6">
              <p className="text-gray-300">Additional details for this message type are not available.</p>
            </div>
          );
      }
    };

    return (
      <div className="space-y-6">
        {/* Detail Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleBackToList}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Messages</span>
          </button>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => archiveMessage(selectedMessage.id)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Archive className="w-4 h-4" />
              <span>Archive</span>
            </button>
          </div>
        </div>

        {/* Message Detail */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-white mb-2">{selectedMessage.subject}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>From: {selectedMessage.sender}</span>
                  <span>•</span>
                  <span>{new Date(selectedMessage.timestamp).toLocaleString()}</span>
                  <span>•</span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedMessage.priority)}`}>
                    {selectedMessage.priority}
                  </span>
                  <div className="text-gray-400">
                    {getCategoryIcon(selectedMessage.category)}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-300 text-lg leading-relaxed">{selectedMessage.content}</p>
            </div>
          </div>
          
          {selectedMessage.hasActions && (
            <div className="p-6">
              {renderActionContent()}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Show detail view if selected
  if (currentView === 'detail') {
    return (
      <div className="p-8">
        {renderMessageDetail()}
      </div>
    );
  }

  // Main messages list view
  return (
    <div className="p-8">
      {/* Messages Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Messages</h2>
              <p className="text-gray-400">
                {unreadCount > 0 ? `${unreadCount} unread message${unreadCount > 1 ? 's' : ''}` : 'All messages read'}
              </p>
            </div>
          </div>
          {hasNewMessages && (
            <div className="flex items-center space-x-2 px-3 py-2 bg-green-900/30 border border-green-600/50 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-green-300 text-sm">New messages received</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={checkForNewMessages}
            disabled={isCheckingMessages}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 text-white rounded-lg transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isCheckingMessages ? 'animate-spin' : ''}`} />
            <span>Check Now</span>
          </button>
          <div className="text-sm text-gray-400">
            Last checked: {formatTimestamp(lastChecked.toISOString().replace('T', ' ').split('.')[0])}
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          {/* Filter Tabs */}
          <div className="flex bg-gray-800 rounded-lg p-1">
            {[
              { key: 'all', label: 'All', count: messages.filter(m => !m.archived).length },
              { key: 'unread', label: 'Unread', count: unreadCount },
              { key: 'archived', label: 'Archived', count: messages.filter(m => m.archived).length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as any)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === tab.key
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {/* Bulk Actions */}
          {selectedCount > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">{selectedCount} selected</span>
              <button
                onClick={archiveSelectedMessages}
                disabled={isLoading}
                className="flex items-center space-x-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-lg transition-colors text-sm"
              >
                <Archive className="w-4 h-4" />
                <span>Archive Selected</span>
              </button>
            </div>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
          />
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-700 bg-gray-750">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filteredMessages.length > 0 && filteredMessages.every(msg => selectedMessages.has(msg.id))}
                  onChange={selectAllVisible}
                  className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-sm text-gray-300">Select All</span>
              </label>
              
              {filter !== 'archived' && (
                <button
                  onClick={archiveAllMessages}
                  disabled={isLoading || filteredMessages.length === 0}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:opacity-50 text-white rounded-lg transition-colors text-sm"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <ArchiveX className="w-4 h-4" />
                  )}
                  <span>Archive All</span>
                </button>
              )}
            </div>
            
            <div className="text-sm text-gray-400">
              {filteredMessages.length} message{filteredMessages.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="divide-y divide-gray-700">
          {filteredMessages.length === 0 ? (
            <div className="p-12 text-center">
              <Mail className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <h3 className="text-lg font-medium text-gray-300 mb-2">
                {filter === 'unread' ? 'No unread messages' : 
                 filter === 'archived' ? 'No archived messages' : 
                 searchQuery ? 'No messages found' : 'No messages'}
              </h3>
              <p className="text-gray-500">
                {searchQuery ? 'Try adjusting your search terms' : 
                 filter === 'unread' ? 'All your messages have been read' :
                 'Messages will appear here when received'}
              </p>
            </div>
          ) : (
            filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`px-6 py-4 hover:bg-gray-700/50 transition-colors cursor-pointer ${
                  !message.read ? 'bg-blue-900/20' : ''
                } ${selectedMessages.has(message.id) ? 'bg-blue-900/30' : ''}`}
                onClick={() => handleMessageClick(message.id)}
              >
                <div className="flex items-start space-x-4">
                  {/* Selection Checkbox */}
                  <label 
                    className="flex items-center mt-1 cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={selectedMessages.has(message.id)}
                      onChange={() => toggleMessageSelection(message.id)}
                      className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                    />
                  </label>

                  {/* Message Icon */}
                  <div className="flex-shrink-0 mt-1">
                    {message.read ? (
                      <MailOpen className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Mail className="w-5 h-5 text-blue-400" />
                    )}
                  </div>

                  {/* Message Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className={`text-sm font-medium truncate ${
                            message.read ? 'text-gray-300' : 'text-white'
                          }`}>
                            {message.subject}
                          </h4>
                          <div className="flex items-center space-x-1">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(message.priority)}`}>
                              {message.priority}
                            </span>
                            <div className="text-gray-400">
                              {getCategoryIcon(message.category)}
                            </div>
                            {message.hasActions && (
                              <div className="text-blue-400" title="Contains actionable content">
                                <Activity className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 line-clamp-2 mb-2">
                          {message.content}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>{message.sender}</span>
                          <span>•</span>
                          <span>{formatTimestamp(message.timestamp)}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2 ml-4">
                        {!message.archived && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              archiveMessage(message.id);
                            }}
                            disabled={isLoading}
                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded-lg transition-colors"
                            title="Archive message"
                          >
                            <Archive className="w-4 h-4" />
                          </button>
                        )}
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-between items-center mt-8">
        <div className="text-sm text-gray-400">
          Messages are automatically synced with your web account
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-medium transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}