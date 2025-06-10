
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [expandedUser, setExpandedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [error, setError] = useState(null); // Track errors

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/users`);
        setUsers(response.data);
        setFilteredUsers(response.data);
        setError(null); // Clear any previous errors
      } catch (error) {
        setError('Error fetching users');
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [API_URL]);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleInputChange = (e, index) => {
    const updatedUsers = [...filteredUsers];
    updatedUsers[index][e.target.name] = e.target.value;
    setFilteredUsers(updatedUsers);
  };

  const toggleUserDetails = (userId) => {
    setExpandedUser(expandedUser === userId ? null : userId);
  };

  const handleUpdateClick = (userId, index) => {
    setSelectedUserIndex(index);
    setSelectedUserId(userId);
    setShowConfirmModal(true);
  };

  const confirmUpdate = async () => {
    if (selectedUserId !== null && selectedUserIndex !== null) {
      try {
        await axios.put(`${API_URL}/users/${selectedUserId}`, filteredUsers[selectedUserIndex]);
        setError(null); // Clear any previous errors
        alert('User updated successfully');
      } catch (error) {
        setError('Error updating user');
        console.error('Error updating user:', error);
      } finally {
        setShowConfirmModal(false);
        setSelectedUserId(null);
        setSelectedUserIndex(null);
      }
    }
  };

  // Render error state if there's an error
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="relative group max-w-md mx-auto">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
          <div className="relative bg-slate-800/50 backdrop-blur-xl border border-red-500/20 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-red-400 mb-2">Error</h3>
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-slate-800/50 backdrop-blur-xl rounded-full p-3 border border-white/10">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent mb-4">
            Admin - User Management
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            View and update user details with precision
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-lg mx-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search by username"
              className="w-full bg-slate-900/30 border border-white/10 rounded-xl p-3 pl-10 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* User List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user, index) => (
            <div key={user._id} className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-300">
                <div
                  className="cursor-pointer mb-4"
                  onClick={() => toggleUserDetails(user._id)}
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-200">{user.username}</h2>
                    <div className="p-2 bg-purple-500/20 rounded-full">
                      <svg
                        className={`w-5 h-5 text-purple-400 transition-transform duration-300 ${expandedUser === user._id ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                  <p className="text-sm text-purple-400 mt-1">
                    {expandedUser === user._id ? 'Collapse Details' : 'Expand Details'}
                  </p>
                </div>

                {expandedUser === user._id && (
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block mb-2 text-gray-300 text-sm font-medium tracking-wide">Username</label>
                        <div className="relative">
                          <input
                            type="text"
                            name="username"
                            value={user.username || ''}
                            onChange={(e) => handleInputChange(e, index)}
                            className="w-full bg-slate-900/30 border border-white/10 rounded-xl p-3 pl-10 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                            placeholder="Enter username"
                          />
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block mb-2 text-gray-300 text-sm font-medium tracking-wide">Email</label>
                        <div className="relative">
                          <input
                            type="email"
                            name="email"
                            value={user.email || ''}
                            onChange={(e) => handleInputChange(e, index)}
                            className="w-full bg-slate-900/30 border border-white/10 rounded-xl p-3 pl-10 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                            placeholder="Enter email"
                          />
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block mb-2 text-gray-300 text-sm font-medium tracking-wide">Phone Number</label>
                        <div className="relative">
                          <input
                            type="text"
                            name="phoneNumber"
                            value={user.phoneNumber || ''}
                            onChange={(e) => handleInputChange(e, index)}
                            className="w-full bg-slate-900/30 border border-white/10 rounded-xl p-3 pl-10 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                            placeholder="Enter phone number"
                          />
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block mb-2 text-gray-300 text-sm font-medium tracking-wide">Wallet (USD)</label>
                        <div className="relative">
                          <input
                            type="number"
                            name="wallet"
                            value={user.wallet || 0}
                            onChange={(e) => handleInputChange(e, index)}
                            className="w-full bg-slate-900/30 border border-white/10 rounded-xl p-3 pl-10 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                            placeholder="Enter wallet amount"
                          />
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block mb-2 text-gray-300 text-sm font-medium tracking-wide">Total Amount Invested (USD)</label>
                        <div className="relative">
                          <input
                            type="number"
                            name="totalAmountInvested"
                            value={user.totalAmountInvested || 0}
                            onChange={(e) => handleInputChange(e, index)}
                            className="w-full bg-slate-900/30 border border-white/10 rounded-xl p-3 pl-10 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                            placeholder="Enter invested amount"
                          />
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block mb-2 text-gray-300 text-sm font-medium tracking-wide">Token Wallet</label>
                        <div className="relative">
                          <input
                            type="number"
                            name="tokenWallet"
                            value={user.tokenWallet || 0}
                            onChange={(e) => handleInputChange(e, index)}
                            className="w-full bg-slate-900/30 border border-white/10 rounded-xl p-3 pl-10 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                            placeholder="Enter token wallet"
                          />
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleUpdateClick(user._id, index)}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-4 rounded-xl font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-green-500/30 hover:scale-105 flex items-center justify-center space-x-2 mt-6"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Update User</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="relative group max-w-md mx-auto">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <p className="text-gray-200 text-lg mb-6">Are you sure you want to update the user?</p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={confirmUpdate}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 px-6 rounded-xl font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-green-500/30 hover:scale-105 flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Yes, Update</span>
                  </button>
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 px-6 rounded-xl font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-red-500/30 hover:scale-105 flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Gradient Line */}
        <div className="h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 rounded-full opacity-50 mt-8"></div>
      </div>
    </div>
  );
};

export default UserDetails;
