import { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
    const [withdrawals, setWithdrawals] = useState([]);
    const [utrNumbers, setUtrNumbers] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredWithdrawals, setFilteredWithdrawals] = useState([]);
    const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);
    const [actionType, setActionType] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all wallet withdrawal requests
    const fetchWithdrawals = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/walletwithdrawals`);
            setWithdrawals(res.data);
            setFilteredWithdrawals(res.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch withdrawals');
            console.error('Failed to fetch withdrawals:', err);
        }
    };

    useEffect(() => {
        fetchWithdrawals();
    }, []);

    // Handle UTR input change
    const handleUtrChange = (withdrawId, value) => {
        setUtrNumbers((prevUtrNumbers) => ({
            ...prevUtrNumbers,
            [withdrawId]: value,
        }));
    };

    // Handle approve or reject action with modal confirmation
    const handleUpdateWithdrawStatus = async (withdrawId, status) => {
        const utrNo = utrNumbers[withdrawId] || '';
        if (status === 'approved' && !utrNo) {
            setError('Please enter a TXID number before approving the withdrawal.');
            setShowConfirmModal(false);
            return;
        }
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/walletwithdrawals-yupdate`, {
                withdrawId,
                status,
                utrNo: status === 'approved' ? utrNo : null,
            });
            setError(null);
            fetchWithdrawals();
        } catch (err) {
            setError('Failed to update status');
            console.error('Failed to update status:', err);
        } finally {
            setShowConfirmModal(false);
            setSelectedWithdrawal(null);
            setActionType('');
        }
    };

    // Open confirmation modal
    const openConfirmModal = (withdrawId, status) => {
        setSelectedWithdrawal(withdrawId);
        setActionType(status);
        setShowConfirmModal(true);
    };

    // Handle search input and filter withdrawals by username
    const handleSearchChange = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = withdrawals.filter(withdrawal =>
            withdrawal.username.toLowerCase().includes(value)
        );
        setFilteredWithdrawals(filtered);
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
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent mb-4">
                        Wallet Withdrawals
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Manage and process user withdrawal requests
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
                            onChange={handleSearchChange}
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Withdrawals Table */}
                <div className="group relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                    <div className="relative bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-gray-200">
                                <thead className="bg-slate-900/50">
                                    <tr>
                                        <th className="py-4 px-6 text-left text-sm font-medium text-gray-300">Username</th>
                                        <th className="py-4 px-6 text-left text-sm font-medium text-gray-300">Amount (USD)</th>
                                        <th className="py-4 px-6 text-left text-sm font-medium text-gray-300">Wallet Adress</th>
                                        <th className="py-4 px-6 text-left text-sm font-medium text-gray-300">Status</th>
                                        <th className="py-4 px-6 text-left text-sm font-medium text-gray-300">TXID</th>
                                        <th className="py-4 px-6 text-left text-sm font-medium text-gray-300">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredWithdrawals.map((withdrawal) => (
                                        <tr key={withdrawal._id} className="border-b border-white/10 hover:bg-slate-700/30 transition-all duration-200">
                                            <td className="py-4 px-6">{withdrawal.username}</td>
                                            <td className="py-4 px-6">${withdrawal.withdrawAmount.toLocaleString()}</td>
                                            <td className="py-4 px-6">{withdrawal.upiId || 'N/A'}</td>
                                            <td className="py-4 px-6">
                                                <span
                                                    className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${
                                                        withdrawal.status === 'pending'
                                                            ? 'bg-yellow-500/20 text-yellow-400'
                                                            : withdrawal.status === 'approved'
                                                            ? 'bg-green-500/20 text-green-400'
                                                            : 'bg-red-500/20 text-red-400'
                                                    }`}
                                                >
                                                    {withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                {withdrawal.status === 'approved' ? (
                                                    <span className="text-green-400">{withdrawal.utrNo}</span>
                                                ) : (
                                                    <span className="text-gray-500">N/A</span>
                                                )}
                                            </td>
                                            <td className="py-4 px-6">
                                                {withdrawal.status === 'pending' && (
                                                    <div className="flex items-center space-x-3">
                                                        <div className="relative">
                                                            <input
                                                                type="text"
                                                                placeholder="Enter TXID"
                                                                className="bg-slate-900/30 border border-white/10 rounded-xl p-2 pl-8 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                                                                value={utrNumbers[withdrawal._id] || ''}
                                                                onChange={(e) => handleUtrChange(withdrawal._id, e.target.value)}
                                                            />
                                                            <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <button
                                                            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 px-4 rounded-xl font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-green-500/30 hover:scale-105 flex items-center space-x-2"
                                                            onClick={() => openConfirmModal(withdrawal._id, 'approved')}
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                            </svg>
                                                            <span>Approve</span>
                                                        </button>
                                                        <button
                                                            className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 px-4 rounded-xl font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-red-500/30 hover:scale-105 flex items-center space-x-2"
                                                            onClick={() => openConfirmModal(withdrawal._id, 'rejected')}
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                                            </svg>
                                                            <span>Reject</span>
                                                        </button>
                                                    </div>
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
                                    Are you sure you want to {actionType} the withdrawal
                                    {actionType === 'approved' && utrNumbers[selectedWithdrawal]
                                        ? ` for TXID No: ${utrNumbers[selectedWithdrawal]}`
                                        : ''}?
                                </p>
                                <div className="flex justify-center space-x-4">
                                    <button
                                        onClick={() => handleUpdateWithdrawStatus(selectedWithdrawal, actionType)}
                                        className={`text-white py-2 px-6 rounded-xl font-medium transition-all duration-300 shadow-lg hover:scale-105 flex items-center space-x-2 ${
                                            actionType === 'approved'
                                                ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 hover:shadow-green-500/30'
                                                : 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 hover:shadow-red-500/30'
                                        }`}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            {actionType === 'approved' ? (
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