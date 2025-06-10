import React, { useState, useEffect } from 'react';

function AdminNotificationPage() {
    const [message, setMessage] = useState('');
    const [isImportant, setIsImportant] = useState(true);
    const [status, setStatus] = useState('');
    const [notifications, setNotifications] = useState([]);
    const [editId, setEditId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false); // Modal visibility
    const [deleteId, setDeleteId] = useState(null); // ID of notification to delete

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users/notifications`);
            const data = await response.json();
            setNotifications(Array.isArray(data) ? data : []);
            setStatus('');
        } catch (error) {
            setStatus('Error fetching notifications');
            console.error('Error fetching notifications:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const notification = { message, isImportant };

        try {
            const url = editId
                ? `${process.env.REACT_APP_API_URL}/users/notifications/${editId}`
                : `${process.env.REACT_APP_API_URL}/users/addnotification`;
            const method = editId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(notification),
            });

            const result = await response.json();
            if (response.ok) {
                setStatus(editId ? 'Notification updated successfully' : 'Notification added successfully');
                setMessage('');
                setIsImportant(true);
                setEditId(null);
                fetchNotifications();
            } else {
                setStatus(`Error: ${result.message}`);
            }
        } catch (error) {
            setStatus('Failed to add/update notification');
        }
    };

    const handleEdit = (notification) => {
        setMessage(notification.message);
        setIsImportant(notification.isImportant);
        setEditId(notification._id);
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users/notifications/${deleteId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setStatus('Notification deleted successfully');
                fetchNotifications();
            } else {
                setStatus('Failed to delete notification');
            }
        } catch (error) {
            setStatus('Error deleting notification');
        } finally {
            setShowDeleteModal(false);
            setDeleteId(null);
        }
    };

    const openDeleteModal = (id) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };

    // Render error state if there's a critical error
    if (status.includes('Error fetching notifications')) {
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
                        <p className="text-red-300 text-sm">{status}</p>
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
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent mb-4">
                        Notification Management
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Create, edit, and manage notifications for users
                    </p>
                </div>

                {/* Form Section */}
                <div className="group relative mb-12">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                    <div className="relative bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                        <h2 className="text-2xl font-semibold text-gray-200 mb-6">
                            {editId ? 'Edit Notification' : 'Add New Notification'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                    Notification Message
                                </label>
                                <input
                                    type="text"
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                    className="w-full bg-slate-900/30 border border-white/10 rounded-xl p-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                                    placeholder="Enter notification message"
                                />
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="isImportant"
                                    checked={isImportant}
                                    onChange={(e) => setIsImportant(e.target.checked)}
                                    className="h-5 w-5 text-purple-500 border-white/10 rounded bg-slate-900/30 focus:ring-purple-500"
                                />
                                <label htmlFor="isImportant" className="ml-3 text-sm text-gray-300">
                                    Mark as Important
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 hover:scale-105 flex items-center justify-center space-x-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                                </svg>
                                <span>{editId ? 'Update Notification' : 'Add Notification'}</span>
                            </button>
                        </form>
                    </div>
                </div>

                {/* Status Message */}
                {status && (
                    <div className="group relative mb-8">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                        <div className={`relative p-4 rounded-2xl text-sm backdrop-blur-xl border border-white/10 ${status.includes('Error') ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'}`}>
                            <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {status.includes('Error') ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    )}
                                </svg>
                                <span>{status}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Notifications List */}
                <div className="group relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                    <div className="relative bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                        <h3 className="text-xl font-semibold text-gray-200 mb-6">All Notifications</h3>
                        {notifications.length === 0 ? (
                            <p className="text-gray-400 text-center">No notifications found.</p>
                        ) : (
                            <div className="grid gap-4">
                                {notifications.map((notification) => (
                                    <div key={notification._id} className="p-4 bg-slate-900/30 rounded-xl border border-white/10 hover:bg-slate-700/30 transition-all duration-200">
                                        <p className="text-gray-200">{notification.message}</p>
                                        <p className={`text-sm ${notification.isImportant ? 'text-yellow-400' : 'text-gray-400'}`}>
                                            {notification.isImportant ? 'Important' : 'Not Important'}
                                        </p>
                                        <div className="flex space-x-4 mt-4">
                                            <button
                                                onClick={() => handleEdit(notification)}
                                                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-xl font-medium hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-yellow-500/30 hover:scale-105 flex items-center space-x-2"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                                </svg>
                                                <span>Edit</span>
                                            </button>
                                            <button
                                                onClick={() => openDeleteModal(notification._id)}
                                                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-xl font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-red-500/30 hover:scale-105 flex items-center space-x-2"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                </svg>
                                                <span>Delete</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
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
                                    Are you sure you want to delete this notification?
                                </p>
                                <div className="flex justify-center space-x-4">
                                    <button
                                        onClick={handleDelete}
                                        className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 px-6 rounded-xl font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-red-500/30 hover:scale-105 flex items-center space-x-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                        </svg>
                                        <span>Yes, Delete</span>
                                    </button>
                                    <button
                                        onClick={() => setShowDeleteModal(false)}
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

export default AdminNotificationPage;