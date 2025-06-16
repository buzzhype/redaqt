'use client';
import React, { useState } from 'react';
import { Star, Award, X, Search, Plus } from 'lucide-react';

const CertificateDashboard = () => {
  // Simplified state management
  const [accountType] = useState('Pro'); // Simulate Pro account
  const [logoList, setLogoList] = useState([
    'Logo 1', 'Logo 2', 'Logo 3', 'RedaQt', 'Logo 5', 'Logo 6'
  ]);
  const [selectedLogo, setSelectedLogo] = useState('RedaQt');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddLogo, setShowAddLogo] = useState(false);
  const [newLogoName, setNewLogoName] = useState('');
  const [draggedFile, setDraggedFile] = useState(null);

  // Simplified certificate data
  const certificateData = {
    name: 'John Doe',
    company: 'Company name',
    certificateId: 'redaqt-2025-04-25-A1B2C3D4E5F6',
    originTime: 'YYYY-MM-DD: HH:MM:SS.ms',
    email: 'noname@webaddress.com'
  };

  // Filter logos
  const filteredLogos = logoList.filter(logo => 
    logo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => 
      file.type === 'image/jpeg' || file.type === 'image/png'
    );
    
    if (imageFile) {
      setDraggedFile(imageFile);
    } else {
      alert('Please drop a JPG or PNG image file (minimum 150x150px)');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Save logo
  const handleSaveLogo = () => {
    if (newLogoName.trim() && draggedFile) {
      setLogoList([...logoList, newLogoName.trim()]);
      setSelectedLogo(newLogoName.trim());
      setNewLogoName('');
      setDraggedFile(null);
      setShowAddLogo(false);
    }
  };

  // Certificate type display
  const CertificateTypeIcon = () => (
    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
      <Award className="w-8 h-8 text-white" fill="currentColor" />
    </div>
  );

  // RedaQt logo component
  const RedaQtLogo = () => (
    <div className="w-48 h-48 bg-gradient-to-br from-red-600 via-blue-600 to-red-800 rounded-lg flex items-center justify-center relative overflow-hidden">
      {/* Circuit pattern overlay */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <defs>
            <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="white" opacity="0.3"/>
              <path d="M2,2 L8,2 M8,2 L8,8 M8,8 L18,8" stroke="white" strokeWidth="0.5" opacity="0.3" fill="none"/>
              <circle cx="8" cy="8" r="1" fill="white" opacity="0.3"/>
              <circle cx="18" cy="8" r="1" fill="white" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)"/>
        </svg>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center">
        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mb-3 mx-auto">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
            <div className="w-4 h-4 bg-red-600 rounded-sm"></div>
          </div>
        </div>
        <div className="text-white font-bold text-xl tracking-wider">REDAQT</div>
        <div className="text-gray-200 text-xs tracking-widest mt-1">DATA SECURITY</div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-900 text-white m-0">
      {/* Left Sidebar - Logo List */}
      <div className="w-80  p-6 border-r border-gray-700">
        {/* Account Type */}
        <div className="mb-6">
          <div className="inline-block px-3 py-1 bg-green-600 text-white rounded text-sm font-medium">
            {accountType} Account
          </div>
        </div>

        <div className="mb-4">
          <span className="text-gray-400 text-sm">List of logos added to App</span>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-400"
          />
        </div>

        {/* Logo List */}
        <div className="space-y-2 mb-6">
          {filteredLogos.map((logo, index) => (
            <div
              key={index}
              onClick={() => setSelectedLogo(logo)}
              className={`p-3 rounded cursor-pointer transition-colors ${
                selectedLogo === logo 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {logo}
            </div>
          ))}
        </div>

        {/* Add Logo Button */}
        <button
          onClick={() => setShowAddLogo(true)}
          className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors"
        >
          <Plus className="w-6 h-6 text-gray-300" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <CertificateTypeIcon />
          <div className="ml-4">
            <h1 className="text-3xl font-bold text-white">{certificateData.name}</h1>
            <p className="text-gray-400 text-lg">{certificateData.company}</p>
          </div>
        </div>

        {/* Certificate Details */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-blue-400 text-sm mb-1">logo name</label>
              <div className="text-white text-lg">{selectedLogo}</div>
            </div>
            
            <div>
              <label className="block text-blue-400 text-sm mb-1">certificate id</label>
              <div className="text-white font-mono text-sm">{certificateData.certificateId}</div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-blue-400 text-sm mb-1">origin time</label>
              <div className="text-white">{certificateData.originTime}</div>
            </div>
            
            <div>
              <label className="block text-blue-400 text-sm mb-1">email</label>
              <div className="text-white">{certificateData.email}</div>
            </div>
          </div>
        </div>

        {/* Logo Display */}
        <div className="mb-8">
          <label className="block text-blue-400 text-sm mb-4">logo</label>
          <div className="bg-gray-800 rounded-lg p-8 flex items-center justify-center">
            {selectedLogo === 'RedaQt' ? (
              <RedaQtLogo />
            ) : (
              <div className="text-center">
                <div className="w-48 h-48 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-6xl text-gray-500">📷</span>
                </div>
                <div className="text-white text-lg">{selectedLogo}</div>
              </div>
            )}
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => window.history.back()}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg"
        >
          Close
        </button>
      </div>

      {/* Right Sidebar - Certificate Types */}
      <div className="w-80 p-6 border-l border-gray-700">
        <h3 className="text-white text-xl font-semibold mb-6">Certificate Types:</h3>
        
        <div className="space-y-6">
          {/* Blue Certificate */}
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Star className="w-6 h-6 text-white" fill="currentColor" />
            </div>
            <div>
              <h4 className="text-blue-400 font-semibold mb-2">Blue:</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Not a verified person or organization</li>
                <li>• Available with Pro account</li>
              </ul>
            </div>
          </div>
          
          {/* Gold Certificate */}
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6 text-white" fill="currentColor" />
            </div>
            <div>
              <h4 className="text-yellow-400 font-semibold mb-2">Gold:</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• A paid addition</li>
                <li>• A verified person or organization</li>
                <li>• Available with Pro account</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Add Logo Modal */}
      {showAddLogo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-white text-xl font-semibold mb-6">Add New Logo</h3>
            
            <div className="mb-6">
              <label className="block text-blue-400 text-sm mb-2">logo name</label>
              <input
                type="text"
                value={newLogoName}
                onChange={(e) => setNewLogoName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-400"
                placeholder="RedaQt Logo"
              />
            </div>
            
            <div className="mb-8">
              <label className="block text-blue-400 text-sm mb-2">logo</label>
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-gray-600 rounded-lg p-12 text-center hover:border-gray-500 transition-colors cursor-pointer"
              >
                {draggedFile ? (
                  <div className="text-green-400">
                    <div className="text-4xl mb-2">✓</div>
                    <p className="text-lg">File ready: {draggedFile.name}</p>
                  </div>
                ) : (
                  <div className="text-gray-400">
                    <div className="text-4xl mb-2">📁</div>
                    <p className="text-lg mb-1">Drop Logo Here</p>
                    <p className="text-sm">min logo size 150x150</p>
                    <p className="text-sm">jpg or png</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setShowAddLogo(false);
                  setNewLogoName('');
                  setDraggedFile(null);
                }}
                className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveLogo}
                disabled={!newLogoName.trim() || !draggedFile}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateDashboard;