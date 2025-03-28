'use client';

import { useState } from 'react';
import { 
  Settings, 
  Shield, 
  Lock, 
  Key, 
  BellRing, 
  Eye, 
  Clock, 
  AlertTriangle,
  FileWarning,
  MailQuestion,
  CheckSquare,
  UserCog,
  ArrowRight,
  HelpCircle
} from 'lucide-react';

export default function SecuritySettingsPage() {
  const [autoEncryptClassified, setAutoEncryptClassified] = useState(true);
  const [showEncryptionHelp, setShowEncryptionHelp] = useState(false);
  const [securityNotifications, setSecurityNotifications] = useState(true);
  const [accessLogs, setAccessLogs] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [defaultClassification, setDefaultClassification] = useState('Internal');
  
  const handleSessionTimeoutChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSessionTimeout(e.target.value);
  };
  
  const handleDefaultClassificationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDefaultClassification(e.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm mb-6 p-4 border border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
            <Settings size={20} className="text-blue-700" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Security Settings</h1>
            <p className="text-sm text-gray-500">Configure your document security preferences</p>
          </div>
        </div>
      </div>
      
      {/* Security Settings Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Document Security Settings */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <Shield size={18} className="text-blue-600 mr-2" />
                Document Security
              </h2>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Auto-encrypt setting */}
              <div className="flex items-start justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900 flex items-center">
                    <Lock size={16} className="text-gray-500 mr-2" />
                    Auto-encrypt classified documents
                  </label>
                  <p className="mt-1 text-xs text-gray-500 ml-6">
                    Automatically encrypt Confidential and Restricted documents on upload
                  </p>
                </div>
                <div className="relative inline-block w-12 mr-2 align-middle select-none">
                  <input 
                    type="checkbox"
                    id="auto-encrypt"
                    checked={autoEncryptClassified}
                    onChange={() => setAutoEncryptClassified(!autoEncryptClassified)}
                    className="sr-only"
                  />
                  <label 
                    htmlFor="auto-encrypt"
                    className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${
                      autoEncryptClassified ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span 
                      className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                        autoEncryptClassified ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    ></span>
                  </label>
                </div>
              </div>
              
              {/* Default classification */}
              <div className="flex items-start justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900 flex items-center">
                    <FileWarning size={16} className="text-gray-500 mr-2" />
                    Default document classification
                  </label>
                  <p className="mt-1 text-xs text-gray-500 ml-6">
                    Set the default classification for new documents
                  </p>
                </div>
                <select
                  value={defaultClassification}
                  onChange={handleDefaultClassificationChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md p-2"
                >
                  <option value="Public">Public</option>
                  <option value="Internal">Internal</option>
                  <option value="Confidential">Confidential</option>
                  <option value="Restricted">Restricted</option>
                </select>
              </div>
              
              {/* Session timeout */}
              <div className="flex items-start justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900 flex items-center">
                    <Clock size={16} className="text-gray-500 mr-2" />
                    Session timeout
                  </label>
                  <p className="mt-1 text-xs text-gray-500 ml-6">
                    Automatically log out after a period of inactivity
                  </p>
                </div>
                <select
                  value={sessionTimeout}
                  onChange={handleSessionTimeoutChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md p-2"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                </select>
              </div>
              
              {/* Security notifications */}
              <div className="flex items-start justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900 flex items-center">
                    <BellRing size={16} className="text-gray-500 mr-2" />
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
                    checked={securityNotifications}
                    onChange={() => setSecurityNotifications(!securityNotifications)}
                    className="sr-only"
                  />
                  <label 
                    htmlFor="security-notifications"
                    className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${
                      securityNotifications ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span 
                      className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                        securityNotifications ? 'translate-x-6' : 'translate-x-0'
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
                    checked={accessLogs}
                    onChange={() => setAccessLogs(!accessLogs)}
                    className="sr-only"
                  />
                  <label 
                    htmlFor="access-logs"
                    className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${
                      accessLogs ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span 
                      className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                        accessLogs ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    ></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Account Security */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <UserCog size={18} className="text-blue-600 mr-2" />
                Account Security
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
                    checked={twoFactorAuth}
                    onChange={() => setTwoFactorAuth(!twoFactorAuth)}
                    className="sr-only"
                  />
                  <label 
                    htmlFor="two-factor"
                    className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${
                      twoFactorAuth ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span 
                      className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                        twoFactorAuth ? 'translate-x-6' : 'translate-x-0'
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
                  <ArrowRight size={16} className="text-gray-500" />
                </button>
              </div>
              
              {/* Login history */}
              <div className="mt-4">
                <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors">
                  <div className="flex items-center">
                    <Clock size={16} className="text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-900">View login history</span>
                  </div>
                  <ArrowRight size={16} className="text-gray-500" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Save button */}
          <div className="flex justify-end">
            <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
              Save Changes
            </button>
          </div>
        </div>
        
        {/* Security Info Panel */}
        <div className="space-y-6">
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
                    <CheckSquare size={14} className="text-green-600" />
                  </div>
                  <div className="text-xs text-gray-700">Strong password set</div>
                </div>
                
                {!twoFactorAuth && (
                  <div className="flex items-start">
                    <div className="bg-yellow-100 p-1 rounded-full mr-3 mt-0.5">
                      <AlertTriangle size={14} className="text-yellow-600" />
                    </div>
                    <div className="text-xs text-gray-700">Two-factor authentication disabled</div>
                  </div>
                )}
                
                <div className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-0.5">
                    <CheckSquare size={14} className="text-green-600" />
                  </div>
                  <div className="text-xs text-gray-700">Last login: Today at 9:45 AM</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Document Classification Guide */}
          <div className="bg-blue-50 rounded-lg shadow-sm border border-blue-100 p-4">
            <h3 className="text-sm font-medium text-blue-800 mb-3 flex items-center">
              <HelpCircle size={16} className="mr-2" />
              Document Classification Guide
            </h3>
            
            <div className="space-y-3">
              <div className="bg-white rounded-md p-3 border border-blue-100">
                <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full mb-1">Restricted</span>
                <p className="text-xs text-gray-700">
                  Highest level of classification. Access limited to specifically authorized personnel.
                </p>
              </div>
              
              <div className="bg-white rounded-md p-3 border border-blue-100">
                <span className="inline-block px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full mb-1">Confidential</span>
                <p className="text-xs text-gray-700">
                  Sensitive information requiring protection. Only authorized users with proper clearance.
                </p>
              </div>
              
              <div className="bg-white rounded-md p-3 border border-blue-100">
                <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full mb-1">Internal</span>
                <p className="text-xs text-gray-700">
                  For internal company use only. Not intended for external sharing.
                </p>
              </div>
              
              <div className="bg-white rounded-md p-3 border border-blue-100">
                <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full mb-1">Public</span>
                <p className="text-xs text-gray-700">
                  Information that can be freely distributed. No security restrictions.
                </p>
              </div>
            </div>
          </div>
          
          {/* Help and Support */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-800 mb-3">Need Help?</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors text-sm text-gray-700">
                <HelpCircle size={16} className="mr-2 text-blue-600" />
                View Security Documentation
              </button>
              
              <button className="w-full flex items-center px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors text-sm text-gray-700">
                <MailQuestion size={16} className="mr-2 text-blue-600" />
                Contact Security Team
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Encryption Help Modal (would be implemented with a proper component) */}
      {showEncryptionHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Shield size={20} className="text-blue-600 mr-2" />
                Classified Document Handling Guidelines
              </h3>
              <button onClick={() => setShowEncryptionHelp(false)} className="text-gray-400 hover:text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Document Classification Levels */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-800 mb-2">Document Classification Levels</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                <div className="border border-red-200 rounded-lg p-3 bg-red-50">
                  <div className="flex items-center mb-1">
                    <div className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200 mr-2">
                      Restricted
                    </div>
                  </div>
                  <p className="text-xs text-red-800">
                    Highest level of classification. Access limited to specifically authorized personnel. Must remain encrypted at all times.
                  </p>
                </div>
                
                <div className="border border-orange-200 rounded-lg p-3 bg-orange-50">
                  <div className="flex items-center mb-1">
                    <div className="px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200 mr-2">
                      Confidential
                    </div>
                  </div>
                  <p className="text-xs text-orange-800">
                    Sensitive information that requires protection. Only authorized users with proper clearance can access. Should be encrypted when not in active use.
                  </p>
                </div>
                
                <div className="border border-yellow-200 rounded-lg p-3 bg-yellow-50">
                  <div className="flex items-center mb-1">
                    <div className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200 mr-2">
                      Internal
                    </div>
                  </div>
                  <p className="text-xs text-yellow-800">
                    Information for internal company use only. Not intended for external sharing. Encryption recommended but not required.
                  </p>
                </div>
                
                <div className="border border-green-200 rounded-lg p-3 bg-green-50">
                  <div className="flex items-center mb-1">
                    <div className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200 mr-2">
                      Public
                    </div>
                  </div>
                  <p className="text-xs text-green-800">
                    Information that can be freely distributed. No security restrictions. Encryption not required.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Document Security Requirements */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
              <h4 className="text-sm font-medium text-blue-800 mb-2">Document Security Requirements</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="text-xs text-blue-700 space-y-2">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-xs font-medium text-blue-600">1</span>
                    </div>
                    <span><strong>Always encrypt Restricted and Confidential</strong> documents when not actively working with them.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-xs font-medium text-blue-600">2</span>
                    </div>
                    <span>Verify document classification before changing encryption status.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-xs font-medium text-blue-600">3</span>
                    </div>
                    <span>Only share encrypted documents with authorized personnel.</span>
                  </li>
                </ul>
                
                <ul className="text-xs text-blue-700 space-y-2">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-xs font-medium text-blue-600">4</span>
                    </div>
                    <span>All document access is logged for audit and compliance purposes.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-xs font-medium text-blue-600">5</span>
                    </div>
                    <span>Decryption of classified documents requires appropriate security clearance.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-xs font-medium text-blue-600">6</span>
                    </div>
                    <span>Report any security concerns immediately to your security administrator.</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={() => setShowEncryptionHelp(false)}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}