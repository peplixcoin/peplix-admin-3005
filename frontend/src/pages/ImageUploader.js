import React, { useState, useEffect } from "react";
import axios from "axios";

const ImageUploader = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(null); // null, 'upload', or 'delete'

    useEffect(() => {
        fetchImage();
    }, []);

    const fetchImage = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/image`, {
                responseType: "blob",
            });
            setPreview(URL.createObjectURL(res.data));
            setError(null);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setError("No image available");
            } else {
                setError("Error fetching image");
            }
            setPreview(null);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleUpload = async () => {
        if (!image) {
            setError("Please select an image first");
            return;
        }

        const formData = new FormData();
        formData.append("image", image);

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/image/upload`, formData);
            setError(null);
            fetchImage();
        } catch (error) {
            console.error("Error uploading image", error);
            setError("Image upload failed");
        } finally {
            setShowConfirmModal(null);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/image`);
            setPreview(null);
            setError("No image available");
        } catch (error) {
            console.error("Error deleting image", error);
            setError("Image deletion failed");
        } finally {
            setShowConfirmModal(null);
        }
    };

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
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent mb-4">
                        QR Code Manager
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Upload and manage your QR code image
                    </p>
                </div>

                {/* Main Content */}
                <div className="group relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                    <div className="relative bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                        <div className="mb-6">
                            <input
                                type="file"
                                onChange={handleImageChange}
                                accept="image/*"
                                className="w-full bg-slate-900/30 border border-white/10 rounded-xl p-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                            />
                        </div>
                        <div className="flex justify-end space-x-3 mb-6">
                            <button
                                onClick={() => setShowConfirmModal('upload')}
                                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 px-6 rounded-xl font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 hover:scale-105 flex items-center space-x-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                </svg>
                                <span>Upload Image</span>
                            </button>
                            <button
                                onClick={() => setShowConfirmModal('delete')}
                                className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 px-6 rounded-xl font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-red-500/30 hover:scale-105 flex items-center space-x-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a1 1 0 011 1v1H9V4a1 1 0 011-1zm-7 4h12"></path>
                                </svg>
                                <span>Delete Image</span>
                            </button>
                        </div>
                        {error ? (
                            <div className="relative p-4 rounded-2xl text-sm backdrop-blur-xl border border-white/10 bg-red-500/20 text-red-300">
                                <div className="flex items-center space-x-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <span>{error}</span>
                                </div>
                            </div>
                        ) : (
                            preview && (
                                <div className="relative p-6 rounded-xl border border-white/10 bg-slate-900/30">
                                    <h3 className="text-lg font-semibold text-gray-200 mb-2 text-center">Current Image:</h3>
                                    <div className="flex justify-center">
                                        <img
                                            src={preview}
                                            alt="QR Code Preview"
                                            className="max-w-full h-auto rounded-lg object-contain max-h-64"
                                        />
                                    </div>
                                </div>
                            )
                        )}
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
                                    {showConfirmModal === 'upload'
                                        ? 'Are you sure you want to upload/update the QR code image?'
                                        : 'Are you sure you want to delete the QR code image?'}
                                </p>
                                <div className="flex justify-center space-x-4">
                                    <button
                                        onClick={showConfirmModal === 'upload' ? handleUpload : handleDelete}
                                        className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 px-6 rounded-xl font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 hover:scale-105 flex items-center space-x-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        <span>{showConfirmModal === 'upload' ? 'Yes, Upload' : 'Yes, Delete'}</span>
                                    </button>
                                    <button
                                        onClick={() => setShowConfirmModal(null)}
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

export default ImageUploader;