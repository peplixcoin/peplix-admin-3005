import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TermsPage = () => {
    const [terms, setTerms] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false); // Modal visibility
    const [error, setError] = useState(null); // Error state

    // Function to fetch the current terms and conditions
    const fetchTerms = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/terms`);
            return res.data;
        } catch (err) {
            console.error('Failed to fetch terms:', err);
            throw new Error('Failed to fetch terms');
        }
    };

    // Function to update the terms and conditions (use PUT)
    const updateTerms = async (paragraph) => {
        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/terms`, { paragraph });
            return res.data;
        } catch (err) {
            console.error('Failed to update terms:', err);
            throw new Error('Failed to update terms');
        }
    };

    useEffect(() => {
        const getTerms = async () => {
            try {
                const data = await fetchTerms();
                if (data) {
                    setTerms(data.paragraph);
                }
                setError(null);
            } catch (err) {
                setError('Failed to load terms and conditions');
            } finally {
                setLoading(false);
            }
        };

        getTerms();
    }, []);

    const handleSave = async () => {
        setShowConfirmModal(true);
    };

    const confirmSave = async () => {
        try {
            const response = await updateTerms(terms);
            if (response) {
                setMessage(response.message);
                setEditMode(false);
                setError(null);
            }
        } catch (err) {
            setError('Failed to update terms');
        } finally {
            setShowConfirmModal(false);
        }
    };

    // Render error state if there's a critical error
    if (error && !editMode) {
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

    // Render loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">
                <div className="relative group max-w-md mx-auto">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                    <div className="relative bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
                        <div className="w-12 h-12 mx-auto mb-4 animate-spin">
                            <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12a8 8 0 1116 0 8 8 0 01-16 0zm8-8v2m0 12v2m8-8h-2m-12 0H4"></path>
                            </svg>
                        </div>
                        <p className="text-gray-300 text-sm">Loading...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center space-x-3 mb-4">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                            <div className="relative bg-slate-800/50 backdrop-blur-xl rounded-full p-3 border border-white/10">
                                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent mb-4">
                        Terms and Conditions
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Manage and update the terms and conditions
                    </p>
                </div>

                {/* Terms Section */}
                <div className="group relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                    <div className="relative bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                        {editMode ? (
                            <div>
                                <textarea
                                    value={terms}
                                    onChange={(e) => setTerms(e.target.value)}
                                    rows={10}
                                    className="w-full bg-slate-900/30 border border-white/10 rounded-xl p-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                                    placeholder="Enter terms and conditions"
                                />
                                <div className="flex justify-end mt-4 space-x-3">
                                    <button
                                        onClick={handleSave}
                                        className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 px-6 rounded-xl font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 hover:scale-105 flex items-center space-x-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        <span>Save</span>
                                    </button>
                                    <button
                                        onClick={() => setEditMode(false)}
                                        className="bg-gradient-to-r from-gray-500 to-gray-600 text-white py-2 px-6 rounded-xl font-medium hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-gray-500/30 hover:scale-105 flex items-center space-x-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                        <span>Cancel</span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="mb-6">
                                <div className="bg-slate-900/30 p-6 rounded-xl border border-white/10 text-gray-200 whitespace-pre-line">
                                    {terms || 'No terms and conditions set.'}
                                </div>
                                <div className="flex justify-end mt-4">
                                    <button
                                        onClick={() => setEditMode(true)}
                                        className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 px-6 rounded-xl font-medium hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-yellow-500/30 hover:scale-105 flex items-center space-x-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                        </svg>
                                        <span>Edit</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Message Display */}
                {message && (
                    <div className="group relative mt-8">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                        <div className="relative p-4 rounded-2xl text-sm backdrop-blur-xl border border-white/10 bg-green-500/20 text-green-300">
                            <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>{message}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {error && editMode && (
                    <div className="group relative mt-8">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                        <div className="relative p-4 rounded-2xl text-sm backdrop-blur-xl border border-white/10 bg-red-500/20 text-red-300">
                            <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <span>{error}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Save Confirmation Modal */}
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
                                    Are you sure you want to save changes to the terms and conditions?
                                </p>
                                <div className="flex justify-center space-x-4">
                                    <button
                                        onClick={confirmSave}
                                        className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 px-6 rounded-xl font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 hover:scale-105 flex items-center space-x-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        <span>Yes, Save</span>
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
};

export default TermsPage;