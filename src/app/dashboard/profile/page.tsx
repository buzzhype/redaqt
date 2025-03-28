'use client';

import { useState } from 'react';
import { 
  User,
  Mail,
  Phone,
  Shield,
  Key,
  Bell,
  Clock,
  FileText,
  CheckCircle,
  AlertTriangle,
  Lock,
  Eye,
  UserCircle2,
  Building,
  Briefcase
} from 'lucide-react';

export default function ProfilePage() {
  // User profile state
  const [profileData, setProfileData] = useState({
    fullName: 'Demo User',
    email: 'demo@redaqt.co',
    phone: '+1 (555) 123-4567',
    department: 'Marketing',
    position: 'Content Manager',
    securityClearance: 'Level 3',
    lastLogin: 'Today at 9:45 AM',
    accountCreated: 'March 15, 2024',
    twoFactorEnabled: true,
    notificationsEnabled: true,
    securityAlerts: true,
    accessLogs: true
  });

  // Activity metrics
  const [activityMetrics, setActivityMetrics] = useState({
    documentsCreated: 12,
    documentsEncrypted: 8,
    documentsShared: 5,
    lastActivityDate: 'Today at 2:30 PM',
    lastDocumentAccessed: 'Q1 Marketing Strategy.docx'
  });

  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({ ...profileData });

  // Security log entries (would come from API in a real app)
  const securityLogs = [
    { id: 1, event: 'Account login', timestamp: 'Today at 9:45 AM', ip: '192.168.1.1', status: 'success' },
    { id: 2, event: 'Document encryption', timestamp: 'Today at 10:15 AM', document: 'Annual Budget Overview.xlsx', status: 'success' },
    { id: 3, event: 'Document shared', timestamp: 'Today at 11:30 AM', document: 'Project Timeline.pdf', sharedWith: 'Jane Smith', status: 'success' },
    { id: 4, event: 'Failed login attempt', timestamp: 'Yesterday at 3:45 PM', ip: '203.0.113.0', status: 'failed' },
    { id: 5, event: 'Password changed', timestamp: '2 days ago', status: 'success' }
  ];

  // Handle form field changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileData(editFormData);
    setIsEditing(false);
    // In a real app, this would include an API call to update the user profile
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    if (isEditing) {
      setEditFormData({ ...profileData }); // Reset form data to current profile data
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm mb-6 p-4 border border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
            <User size={20} className="text-blue-700" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">My Profile</h1>
            <p className="text-sm text-gray-500">Manage your account and security settings</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Information Section */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <UserCircle2 size={18} className="text-blue-600 mr-2" />
                Profile Information
              </h2>
              <button 
                onClick={toggleEditMode}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  isEditing 
                    ? 'bg-gray-200 text-gray-600 hover:bg-gray-300' 
                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                }`}
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            <div className="p-6">
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={editFormData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={editFormData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={editFormData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                      <input
                        type="text"
                        name="department"
                        value={editFormData.department}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                      <input
                        type="text"
                        name="position"
                        value={editFormData.position}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="h-20 w-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {profileData.fullName.split(' ').map(name => name[0]).join('')}
                    </div>
                    <div className="ml-6">
                      <h3 className="text-xl font-bold text-gray-900">{profileData.fullName}</h3>
                      <div className="flex items-center mt-1 text-sm text-blue-600">
                        <Shield size={14} className="mr-1" />
                        Security Clearance: {profileData.securityClearance}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{profileData.position} • {profileData.department}</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <Mail size={16} className="text-gray-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-sm font-medium text-gray-900">{profileData.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <Phone size={16} className="text-gray-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="text-sm font-medium text-gray-900">{profileData.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <Building size={16} className="text-gray-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-xs text-gray-500">Department</p>
                        <p className="text-sm font-medium text-gray-900">{profileData.department}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <Briefcase size={16} className="text-gray-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-xs text-gray-500">Position</p>
                        <p className="text-sm font-medium text-gray-900">{profileData.position}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <Clock size={16} className="text-gray-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-xs text-gray-500">Last Login</p>
                        <p className="text-sm font-medium text-gray-900">{profileData.lastLogin}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <Calendar size={16} className="text-gray-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-xs text-gray-500">Account Created</p>
                        <p className="text-sm font-medium text-gray-900">{profileData.accountCreated}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Security Settings Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <Shield size={18} className="text-blue-600 mr-2" />
                Security Settings
              </h2>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Two-factor authentication */}
              <div className="flex items-start justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900 flex items-center">
                    <Key size={16} className="text-gray-500 mr-2" />
                    Two-factor authentication
                  </label>
                  <p className="mt-1 text-xs text-gray-500 ml-6">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <div className="relative inline-block w-12 mr-2 align-middle select-none">
                  <input 
                    type="checkbox"
                    id="two-factor"
                    checked={profileData.twoFactorEnabled}
                    onChange={() => setProfileData({...profileData, twoFactorEnabled: !profileData.twoFactorEnabled})}
                    className="sr-only"
                  />
                  <label 
                    htmlFor="two-factor"
                    className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${
                      profileData.twoFactorEnabled ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span 
                      className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                        profileData.twoFactorEnabled ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    ></span>
                  </label>
                </div>
              </div>
              
              {/* Security notifications */}
              <div className="flex items-start justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900 flex items-center">
                    <Bell size={16} className="text-gray-500 mr-2" />
                    Security notifications
                  </label>
                  <p className="mt-1 text-xs text-gray-500 ml-6">
                    Receive alerts for security events and policy violations
                  </p>
                </div>
                <div className="relative inline-block w-12 mr-2 align-middle select-none">
                  <input 
                    type="checkbox"
                    id="security-notifications"
                    checked={profileData.securityAlerts}
                    onChange={() => setProfileData({...profileData, securityAlerts: !profileData.securityAlerts})}
                    className="sr-only"
                  />
                  <label 
                    htmlFor="security-notifications"
                    className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${
                      profileData.securityAlerts ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span 
                      className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                        profileData.securityAlerts ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    ></span>
                  </label>
                </div>
              </div>
              
              {/* Access logs */}
              <div className="flex items-start justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900 flex items-center">
                    <Eye size={16} className="text-gray-500 mr-2" />
                    Document access logging
                  </label>
                  <p className="mt-1 text-xs text-gray-500 ml-6">
                    Log all access and modification attempts on your documents
                  </p>
                </div>
                <div className="relative inline-block w-12 mr-2 align-middle select-none">
                  <input 
                    type="checkbox"
                    id="access-logs"
                    checked={profileData.accessLogs}
                    onChange={() => setProfileData({...profileData, accessLogs: !profileData.accessLogs})}
                    className="sr-only"
                  />
                  <label 
                    htmlFor="access-logs"
                    className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${
                      profileData.accessLogs ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span 
                      className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                        profileData.accessLogs ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    ></span>
                  </label>
                </div>
              </div>
              
              {/* Password section */}
              <div className="mt-4">
                <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors">
                  <div className="flex items-center">
                    <Lock size={16} className="text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-900">Change password</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-500" />
                </button>
              </div>
            </div>
          </div>

          {/* Security Logs Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <Clock size={18} className="text-blue-600 mr-2" />
                Recent Security Activity
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {securityLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{log.event}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.timestamp}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {log.document && <span>Document: {log.document}</span>}
                        {log.ip && <span>IP: {log.ip}</span>}
                        {log.sharedWith && <span>Shared with: {log.sharedWith}</span>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {log.status === 'success' ? (
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-green-100 text-green-800">
                            Success
                          </span>
                        ) : (
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-red-100 text-red-800">
                            Failed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-right">
              <button className="text-sm text-blue-600 font-medium hover:text-blue-800">
                View Full History
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Sections */}
        <div className="space-y-6">
          {/* Activity Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-md font-medium text-gray-900 flex items-center">
                <Activity size={16} className="text-blue-600 mr-2" />
                Activity Summary
              </h2>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                  <div className="text-xs text-blue-500 mb-1">Documents Created</div>
                  <div className="text-lg font-bold text-blue-800">{activityMetrics.documentsCreated}</div>
                </div>
                
                <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                  <div className="text-xs text-green-500 mb-1">Documents Encrypted</div>
                  <div className="text-lg font-bold text-green-800">{activityMetrics.documentsEncrypted}</div>
                </div>
                
                <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                  <div className="text-xs text-purple-500 mb-1">Documents Shared</div>
                  <div className="text-lg font-bold text-purple-800">{activityMetrics.documentsShared}</div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">Last Activity</div>
                  <div className="text-sm font-bold text-gray-800">{activityMetrics.lastActivityDate}</div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div className="text-xs text-gray-500 mb-1">Last Document Accessed</div>
                <div className="flex items-center">
                  <FileText size={14} className="text-gray-500 mr-1" />
                  <span className="text-sm font-medium text-gray-800">{activityMetrics.lastDocumentAccessed}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Security Status */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-md font-medium text-gray-900 flex items-center">
                <Shield size={16} className="text-blue-600 mr-2" />
                Security Status
              </h2>
            </div>
            
            <div className="p-4">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-900">Account Security: Good</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-0.5">
                    <CheckCircle size={14} className="text-green-600" />
                  </div>
                  <div className="text-xs text-gray-700">Strong password set</div>
                </div>
                
                {profileData.twoFactorEnabled ? (
                  <div className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full mr-3 mt-0.5">
                      <CheckCircle size={14} className="text-green-600" />
                    </div>
                    <div className="text-xs text-gray-700">Two-factor authentication enabled</div>
                  </div>
                ) : (
                  <div className="flex items-start">
                    <div className="bg-yellow-100 p-1 rounded-full mr-3 mt-0.5">
                      <AlertTriangle size={14} className="text-yellow-600" />
                    </div>
                    <div className="text-xs text-gray-700">Two-factor authentication disabled</div>
                  </div>
                )}
                
                <div className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-0.5">
                    <CheckCircle size={14} className="text-green-600" />
                  </div>
                  <div className="text-xs text-gray-700">Last login: {profileData.lastLogin}</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Help and Support */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-800 mb-3">Need Help?</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors text-sm text-gray-700">
                <FileText size={16} className="mr-2 text-blue-600" />
                View Security Documentation
              </button>
              
              <button className="w-full flex items-center px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors text-sm text-gray-700">
                <Mail size={16} className="mr-2 text-blue-600" />
                Contact Security Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Import these functions from lucide-react if they don't exist
const Calendar = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  );
};

const Activity = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
    </svg>
  );
};

const ChevronRight = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  );
};