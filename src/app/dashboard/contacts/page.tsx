'use client';
import React, { useState } from 'react';
import { Search, Plus, Edit3, User } from 'lucide-react';

const ContactsDashboard = () => {
  const [accountType, setAccountType] = useState('Pro'); // Pro, Trial, Basic
  const [selectedContact, setSelectedContact] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample contacts data
  const [contacts, setContacts] = useState([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      company: 'JohnDoeCompany',
      alias: '@John-Doe-1234',
      mobile: '+1 (540) 555-1234',
      email: 'johndoe@JohnDoeCompany.com',
      initials: 'JD'
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      company: 'Tech Corp',
      alias: '@Jane-Smith-5678',
      mobile: '+1 (555) 123-4567',
      email: 'jane.smith@techcorp.com',
      initials: 'JS'
    },
    {
      id: 3,
      firstName: 'Mike',
      lastName: 'Johnson',
      company: 'Innovation Labs',
      alias: '@Mike-Johnson-9012',
      mobile: '+1 (555) 987-6543',
      email: 'mike@innovationlabs.com',
      initials: 'MJ'
    }
  ]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    alias: '',
    mobile: '',
    email: ''
  });

  const filteredContacts = contacts.filter(contact =>
    contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.alias.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
    setFormData({
      firstName: contact.firstName,
      lastName: contact.lastName,
      company: contact.company,
      alias: contact.alias,
      mobile: contact.mobile,
      email: contact.email
    });
    setIsEditing(false);
    setIsAdding(false);
  };

  const handleAddContact = () => {
    setIsAdding(true);
    setIsEditing(false);
    setSelectedContact(null);
    setFormData({
      firstName: '',
      lastName: '',
      company: '',
      alias: '',
      mobile: '',
      email: ''
    });
  };

  const handleEditContact = () => {
    setIsEditing(true);
    setIsAdding(false);
  };

  const handleAccept = () => {
    if (isAdding) {
      // Add new contact
      const newContact = {
        id: contacts.length + 1,
        ...formData,
        initials: formData.firstName.charAt(0) + formData.lastName.charAt(0)
      };
      setContacts([...contacts, newContact]);
      setSelectedContact(newContact);
    } else if (isEditing) {
      // Update existing contact
      const updatedContacts = contacts.map(contact =>
        contact.id === selectedContact.id ? { ...contact, ...formData } : contact
      );
      setContacts(updatedContacts);
      setSelectedContact({ ...selectedContact, ...formData });
    }
    setIsEditing(false);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsAdding(false);
    if (selectedContact) {
      setFormData({
        firstName: selectedContact.firstName,
        lastName: selectedContact.lastName,
        company: selectedContact.company,
        alias: selectedContact.alias,
        mobile: selectedContact.mobile,
        email: selectedContact.email
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        company: '',
        alias: '',
        mobile: '',
        email: ''
      });
    }
  };

  const getAccountTypeColor = (type) => {
    switch (type) {
      case 'Pro': return 'bg-green-600';
      case 'Trial': return 'bg-blue-500';
      case 'Basic': return 'bg-orange-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Account Type Selector (for demo) */}
      <div className="flex gap-2 p-4 border-b border-gray-700">
        {['Pro', 'Trial', 'Basic'].map(type => (
          <button
            key={type}
            onClick={() => setAccountType(type)}
            className={`px-4 py-2 rounded ${accountType === type ? getAccountTypeColor(type) : 'bg-gray-700'}`}
          >
            {type} Account
          </button>
        ))}
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar - Contact List */}
        <div className="w-1/3 bg-gray-800 border-r border-gray-700">
          <div className="p-4">
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Contact List */}
            <div className="space-y-2">
              {filteredContacts.map(contact => (
                <div
                  key={contact.id}
                  onClick={() => handleContactSelect(contact)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedContact?.id === contact.id 
                      ? 'bg-blue-600' 
                      : 'hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">
                      {contact.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">
                        {contact.firstName} {contact.lastName}
                      </div>
                      <div className="text-sm text-gray-400 truncate">
                        {contact.alias}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Contact Button */}
            <button
              onClick={handleAddContact}
              className="mt-4 w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Right Side - Contact Details */}
        <div className="flex-1 p-6">
          {(selectedContact || isAdding) ? (
            <div className="max-w-md">
              {/* Contact Header */}
              {selectedContact && !isAdding && (
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-xl font-bold">
                    {selectedContact.initials}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      {selectedContact.firstName} {selectedContact.lastName}
                    </h2>
                    <p className="text-blue-400">{selectedContact.alias}</p>
                  </div>
                  <button
                    onClick={handleEditContact}
                    className="ml-auto p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    <Edit3 className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-blue-400 mb-1">first name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    disabled={!isEditing && !isAdding}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white disabled:bg-gray-700 disabled:text-gray-300 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-blue-400 mb-1">last name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    disabled={!isEditing && !isAdding}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white disabled:bg-gray-700 disabled:text-gray-300 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-blue-400 mb-1">company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    disabled={!isEditing && !isAdding}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white disabled:bg-gray-700 disabled:text-gray-300 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Redaqt alias - only available for Pro accounts */}
                <div>
                  <label className="block text-sm text-blue-400 mb-1">
                    Redaqt alias
                    {accountType !== 'Pro' && <span className="text-gray-500"> (Pro only)</span>}
                  </label>
                  <input
                    type="text"
                    value={formData.alias}
                    onChange={(e) => setFormData({...formData, alias: e.target.value})}
                    disabled={!isEditing && !isAdding || accountType !== 'Pro'}
                    placeholder={accountType === 'Pro' ? '@alias' : '@FN-LN-4Digits'}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white disabled:bg-gray-700 disabled:text-gray-300 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-blue-400 mb-1">mobile</label>
                  <input
                    type="text"
                    value={formData.mobile}
                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                    disabled={!isEditing && !isAdding}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white disabled:bg-gray-700 disabled:text-gray-300 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-blue-400 mb-1">email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    disabled={!isEditing && !isAdding}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white disabled:bg-gray-700 disabled:text-gray-300 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              {(isEditing || isAdding) && (
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={handleCancel}
                    className="flex-1 py-2 px-4 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAccept}
                    className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
                  >
                    Accept
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <User className="w-16 h-16 mb-4" />
              <p className="text-xl">Select a contact to view details</p>
              <p className="text-sm mt-2">or add a new contact using the + button</p>
            </div>
          )}
        </div>
      </div>

      {/* Account Type Info Panel */}
      <div className="fixed bottom-4 right-4 p-4 bg-gray-800 rounded-lg border border-gray-700 max-w-xs">
        <h3 className="font-bold mb-2">Account Features:</h3>
        <div className="text-sm space-y-1">
          <p>• Contact User Name (first and Last)</p>
          <p>• Company Name</p>
          <p>• Mobile Number</p>
          <p>• Email Address</p>
          {accountType === 'Pro' && (
            <>
              <p className="text-green-400">• Alias Name</p>
              <p className="text-green-400">• Redaqt routing number</p>
              <p className="text-green-400">• Custom alias ($5 for special names)</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactsDashboard;