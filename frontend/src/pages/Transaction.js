import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [actionType, setActionType] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [expandedUTRs, setExpandedUTRs] = useState({}); // Track expanded UTRs
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllTransactions = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/all-transactions`);
        const sortedTransactions = res.data.sort((a, b) => {
          if (a.status === 'pending' && b.status !== 'pending') return -1;
          if (a.status !== 'pending' && b.status === 'pending') return 1;
          return 0;
        });
        setTransactions(sortedTransactions);
        setFilteredTransactions(sortedTransactions);
        setError(null);
      } catch (error) {
        setError('Error fetching transactions');
        console.error('Error fetching transactions:', error);
      }
    };
    fetchAllTransactions();
  }, []);

  const handleApprove = async (transactionId) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/users/approve-transaction`, { transactionId, action: 'approved' });
      setTransactions(transactions.filter(t => t._id !== transactionId));
      setFilteredTransactions(filteredTransactions.filter(t => t._id !== transactionId));
      setError(null);
    } catch (error) {
      setError('Error approving transaction');
      console.error('Error approving transaction:', error);
    } finally {
      setShowConfirmModal(false);
      setSelectedTransaction(null);
      setActionType('');
    }
  };

  const handleReject = async (transactionId) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/users/approve-transaction`, { transactionId, action: 'rejected' });
      setTransactions(transactions.filter(t => t._id !== transactionId));
      setFilteredTransactions(filteredTransactions.filter(t => t._id !== transactionId));
      setError(null);
    } catch (error) {
      setError('Error rejecting transaction');
      console.error('Error rejecting transaction:', error);
    } finally {
      setShowConfirmModal(false);
      setSelectedTransaction(null);
      setActionType('');
    }
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);
    const filtered = transactions.filter((transaction) =>
      transaction.userId?.username.toLowerCase().includes(searchValue)
    );
    setFilteredTransactions(filtered);
  };

  const getTransactionStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 inline-flex text-xs font-semibold rounded-full";
    if (status === 'approved') return <span className={`${baseClasses} bg-green-500/20 text-green-400`}>Approved</span>;
    if (status === 'pending') return <span className={`${baseClasses} bg-yellow-500/20 text-yellow-400`}>Pending</span>;
    if (status === 'rejected') return <span className={`${baseClasses} bg-red-500/20 text-red-400`}>Rejected</span>;
    return <span className={`${baseClasses} bg-gray-500/20 text-gray-400`}>Unknown</span>;
  };

  const handleActionClick = (transactionId, action) => {
    setSelectedTransaction(transactionId);
    setActionType(action);
    setShowConfirmModal(true);
  };

  const toggleUTR = (transactionId) => {
    setExpandedUTRs((prev) => ({
      ...prev,
      [transactionId]: !prev[transactionId],
    }));
  };

  const formatUTR = (utr, transactionId) => {
    if (!utr) return <span className="text-gray-500">N/A</span>;
    if (expandedUTRs[transactionId]) return utr;
    return `${utr.slice(0, 8)}...${utr.slice(-4)}`;
  };

  const formatTime = (dateandtime) => {
    return new Date(dateandtime).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                </svg>
              </div>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent mb-4">
            Admin - Transaction Management
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Review and manage user transactions efficiently
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-lg mx-auto">
            <input
              type="text"
              className="w-full bg-slate-900/30 border border-white/10 rounded-xl p-3 pl-10 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
              placeholder="Search by username"
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
          <div className="relative bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-gray-200">
                <thead className="bg-slate-900/50">
                  <tr>
                    <th className="py-4 px-6 text-left text-sm font-medium text-gray-300">User</th>
                    <th className="py-4 px-6 text-left text-sm font-medium text-gray-300">Package</th>
                    <th className="py-4 px-6 text-left text-sm font-medium text-gray-300">Amount (USD)</th>
                    <th className="py-4 px-6 text-left text-sm font-medium text-gray-300">Tokens</th>
                    <th className="py-4 px-6 text-left text-sm font-medium text-gray-300">UTR</th>
                    <th className="py-4 px-6 text-left text-sm font-medium text-gray-300">Date</th>
                    <th className="py-4 px-6 text-left text-sm font-medium text-gray-300">Time</th>
                    <th className="py-4 px-6 text-left text-sm font-medium text-gray-300">Status</th>
                    <th className="py-4 px-6 text-left text-sm font-medium text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction._id} className="border-b border-white/10 hover:bg-slate-700/30 transition-all duration-200">
                      <td className="py-4 px-6">{transaction.userId?.username || 'Unknown User'}</td>
                      <td className="py-4 px-6">{transaction.packageName}</td>
                      <td className="py-4 px-6">${transaction.packagePrice.toLocaleString()}</td>
                      <td className="py-4 px-6">{transaction.tokens}</td>
                      <td className="py-4 px-6 flex items-center space-x-2">
                        <span>{formatUTR(transaction.utr, transaction._id)}</span>
                        {transaction.utr && (
                          <button
                            onClick={() => toggleUTR(transaction._id)}
                            className="text-purple-400 hover:text-purple-300 text-xs font-medium flex items-center space-x-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              {expandedUTRs[transaction._id] ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                              ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
                              )}
                            </svg>
                            <span>{expandedUTRs[transaction._id] ? 'Hide' : 'Expand'}</span>
                          </button>
                        )}
                      </td>
                      <td className="py-4 px-6">{new Date(transaction.dateandtime).toLocaleDateString()}</td>
                      <td className="py-4 px-6">{formatTime(transaction.dateandtime)}</td>
                      <td className="py-4 px-6">{getTransactionStatusBadge(transaction.status)}</td>
                      <td className="py-4 px-6 flex space-x-3">
                        {transaction.status === 'pending' && (
                          <>
                            <button
                              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 px-4 rounded-xl font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-green-500/30 hover:scale-105 flex items-center space-x-2"
                              onClick={() => handleActionClick(transaction._id, 'approve')}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                              <span>Approve</span>
                            </button>
                            <button
                              className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 px-4 rounded-xl font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-red-500/30 hover:scale-105 flex items-center space-x-2"
                              onClick={() => handleActionClick(transaction._id, 'reject')}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                              </svg>
                              <span>Reject</span>
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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
                <p className="text-gray-200 text-lg mb-6">
                  Are you sure you want to {actionType} this transaction?
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => actionType === 'approve' ? handleApprove(selectedTransaction) : handleReject(selectedTransaction)}
                    className={`text-white py-2 px-6 rounded-xl font-medium transition-all duration-300 shadow-lg hover:scale-105 flex items-center space-x-2 ${
                      actionType === 'approve'
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 hover:shadow-green-500/30'
                        : 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 hover:shadow-red-500/30'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {actionType === 'approve' ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      )}
                    </svg>
                    <span>Yes, {actionType.charAt(0).toUpperCase() + actionType.slice(1)}</span>
                  </button>
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="bg-gradient-to-r from-gray-500 to-gray-600 text-white py-2 px-6 rounded-xl font-medium hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-gray-500/30 hover:scale-105 flex items-center space-x-2"
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
}

export default AdminDashboard;