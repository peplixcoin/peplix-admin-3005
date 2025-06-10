import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PackageDetails = () => {
  const [packages, setPackages] = useState([]);
  const [isUpdateClicked, setIsUpdateClicked] = useState(false);
  const [confirmationText, setConfirmationText] = useState('');
  const [newPackage, setNewPackage] = useState({
    name: '',
    price: 0,
    discount: 0,
    stacking_period: 0,
    feature1: '',
    feature2: '',
    feature3: '',
    feature4: '',
    min_tokens_req: 0
  });
  const [isAdding, setIsAdding] = useState(false);
  const [expandedPackage, setExpandedPackage] = useState(null);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(`${API_URL}/packages`);
        setPackages(response.data);
        setError(null);
      } catch (error) {
        setError('Error fetching packages');
        console.error('Error fetching packages:', error);
      }
    };
    fetchPackages();
  }, [API_URL]);

  const handleInputChange = (e, index) => {
    const updatedPackages = [...packages];
    updatedPackages[index][e.target.name] = e.target.value;
    setPackages(updatedPackages);
  };

  const handleNewPackageChange = (e) => {
    setNewPackage({ ...newPackage, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = async (e, packageId, index) => {
    e.preventDefault();
    if (confirmationText !== 'update') {
      setError('You must type "update" to confirm.');
      return;
    }
    try {
      await axios.put(`${API_URL}/packages/${packageId}`, packages[index]);
      setError(null);
      alert('Package updated successfully');
      setIsUpdateClicked(false);
      setConfirmationText('');
    } catch (error) {
      setError('Error updating package');
      console.error('Error updating package:', error);
    }
  };

  const handleAddPackageSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/packages`, newPackage);
      setError(null);
      alert('New package added successfully');
      setIsAdding(false);
      setNewPackage({
        name: '',
        price: 0,
        discount: 0,
        stacking_period: 0,
        feature1: '',
        feature2: '',
        feature3: '',
        feature4: '',
        min_tokens_req: 0
      });
    } catch (error) {
      setError('Error adding package');
      console.error('Error adding package:', error);
    }
  };

  const togglePackageDetails = (packageId) => {
    setExpandedPackage(expandedPackage === packageId ? null : packageId);
  };

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
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-slate-800/50 backdrop-blur-xl rounded-full p-3 border border-white/10">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                </svg>
              </div>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent mb-4">
            Admin - Package Management
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Create and manage investment packages with ease
          </p>
        </div>

        <div className="mb-8">
          <button
            className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 hover:scale-105 flex items-center justify-center space-x-2"
            onClick={() => setIsAdding(!isAdding)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <span>{isAdding ? 'Cancel' : 'Add New Package'}</span>
          </button>
        </div>

        {isAdding && (
          <div className="group relative mb-8">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-slate-800/70 transition-all duration-300">
              <h2 className="text-2xl font-semibold text-gray-200 mb-6">Add New Package</h2>
              <form onSubmit={handleAddPackageSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-gray-300 text-sm font-medium tracking-wide">Package Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={newPackage.name}
                        onChange={handleNewPackageChange}
                        className="w-full bg-slate-900/30 border border-white/10 rounded-xl p-3 pl-10 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                        placeholder="Enter package name"
                        required
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-300 text-sm font-medium tracking-wide">Price (USD)</label>
                    <div className="relative">
                      <input
                        type="number"
                        name="price"
                        value={newPackage.price}
                        onChange={handleNewPackageChange}
                        className="w-full bg-slate-900/30 border border-white/10 rounded-xl p-3 pl-10 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                        placeholder="Enter price"
                        required
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-300 text-sm font-medium tracking-wide">Discount (%)</label>
                    <div className="relative">
                      <input
                        type="number"
                        name="discount"
                        value={newPackage.discount}
                        onChange={handleNewPackageChange}
                        className="w-full bg-slate-900/30 border border-white/10 rounded-xl p-3 pl-10 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                        placeholder="Enter discount"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 17h.01M17 7h.01M17 17h.01M6 6l12 12"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-300 text-sm font-medium tracking-wide">Stacking Period (Days)</label>
                    <div className="relative">
                      <input
                        type="number"
                        name="stacking_period"
                        value={newPackage.stacking_period}
                        onChange={handleNewPackageChange}
                        className="w-full bg-slate-900/30 border border-white/10 rounded-xl p-3 pl-10 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                        placeholder="Enter stacking period"
                        required
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-300 text-sm font-medium tracking-wide">Feature 1</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="feature1"
                        value={newPackage.feature1}
                        onChange={handleNewPackageChange}
                        className="w-full bg-slate-900/30 border border-white/10 rounded-xl p-3 pl-10 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                        placeholder="Enter feature 1"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-300 text-sm font-medium tracking-wide">Feature 2</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="feature2"
                        value={newPackage.feature2}
                        onChange={handleNewPackageChange}
                        className="w-full bg-slate-900/30 border border-white/10 rounded-xl p-3 pl-10 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                        placeholder="Enter feature 2"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-300 text-sm font-medium tracking-wide">Feature 3</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="feature3"
                        value={newPackage.feature3}
                        onChange={handleNewPackageChange}
                        className="w-full bg-slate-900/30 border border-white/10 rounded-xl p-3 pl-10 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                        placeholder="Enter feature 3"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-300 text-sm font-medium tracking-wide">Feature 4</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="feature4"
                        value={newPackage.feature4}
                        onChange={handleNewPackageChange}
                        className="w-full bg-slate-900/30 border border-white/10 rounded-xl p-3 pl-10 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                        placeholder="Enter feature 4"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-300 text-sm font-medium tracking-wide">Minimum Tokens Required</label>
                    <div className="relative">
                      <input
                        type="number"
                        name="min_tokens_req"
                        value={newPackage.min_tokens_req}
                        onChange={handleNewPackageChange}
                        className="w-full bg-slate-900/30 border border-white/10 rounded-xl p-3 pl-10 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                        placeholder="Enter minimum tokens"
                        required
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
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-4 rounded-xl font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-green-500/30 hover:scale-105 flex items-center justify-center space-x-2 mt-6"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Submit New Package</span>
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg, index) => (
            <div key={pkg._id} className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-300">
                <div
                  className="cursor-pointer mb-4"
                  onClick={() => togglePackageDetails(pkg._id)}
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-200">{pkg.name}</h2>
                    <div className="p-2 bg-purple-500/20 rounded-full">
                      <svg
                        className={`w-5 h-5 text-purple-400 transition-transform duration-300 ${expandedPackage === pkg._id ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                  <p className="text-emerald-400 text-lg font-bold">${pkg.price.toLocaleString()}</p>
                  <p className="text-sm text-purple-400 mt-1">
                    {expandedPackage === pkg._id ? 'Collapse Details' : 'Expand Details'}
                  </p>
                </div>

                {expandedPackage === pkg._id && (
                  <form onSubmit={(e) => handleUpdateSubmit(e, pkg._id, index)}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block mb-2 text-gray-300 text-sm font-medium tracking-wide">Name</label>
                        <div className="relative">
                          <input
                            type="text"
                            name="name"
                            value={pkg.name || ''}
                            onChange={(e) => handleInputChange(e, index)}
                            className="w-full bg-slate-900/30 border border-white/10 rounded-xl p-3 pl-10 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                            placeholder="Enter package name"
                          />
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block mb-2 text-gray-300 text-sm font-medium tracking-wide">Price (USD)</label>
                        <div className="relative">
                          <input
                            type="number"
                            name="price"
                            value={pkg.price || 0}
                            onChange={(e) => handleInputChange(e, index)}
                            className="w-full bg-slate-900/30 border border-white/10 rounded-xl p-3 pl-10 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                            placeholder="Enter price"
                          />
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block mb-2 text-gray-300 text-sm font-medium tracking-wide">Discount (%)</label>
                        <div className="relative">
                          <input
                            type="number"
                            name="discount"
                            value={pkg.discount || 0}
                            onChange={(e) => handleInputChange(e, index)}
                            className="w-full bg-slate-900/30 border border-white/10 rounded-xl p-3 pl-10 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                            placeholder="Enter discount"
                          />
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 17h.01M17 7h.01M17 17h.01M6 6l12 12"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block mb-2 text-gray-300 text-sm font-medium tracking-wide">Stacking Period (Days)</label>
                        <div className="relative">
                          <input
                            type="number"
                            name="stacking_period"
                            value={pkg.stacking_period || 0}
                            onChange={(e) => handleInputChange(e, index)}
                            className="w-full bg-slate-900/30 border border-white/10 rounded-xl p-3 pl-10 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                            placeholder="Enter stacking period"
                          />
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block mb-2 text-gray-300 text-sm font-medium tracking-wide">Feature 1</label>
                        <div className="relative">
                          <input
                            type="text"
                            name="feature1"
                            value={pkg.feature1 || ''}
                            onChange={(e) => handleInputChange(e, index)}
                            className="w-full bg-slate-900/30 border border-white/10 rounded-xl p-3 pl-10 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                            placeholder="Enter feature 1"
                          />
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block mb-2 text-gray-300 text-sm font-medium tracking-wide">Feature 2</label>
                        <div className="relative">
                          <input
                            type="text"
                            name="feature2"
                            value={pkg.feature2 || ''}
                            onChange={(e) => handleInputChange(e, index)}
                            className="w-full bg-slate-900/30 border border-white/10 rounded-xl p-3 pl-10 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                            placeholder="Enter feature 2"
                          />
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block mb-2 text-gray-300 text-sm font-medium tracking-wide">Feature 3</label>
                        <div className="relative">
                          <input
                            type="text"
                            name="feature3"
                            value={pkg.feature3 || ''}
                            onChange={(e) => handleInputChange(e, index)}
                            className="w-full bg-slate-900/30 border border-white/10 rounded-xl p-3 pl-10 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                            placeholder="Enter feature 3"
                          />
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block mb-2 text-gray-300 text-sm font-medium tracking-wide">Feature 4</label>
                        <div className="relative">
                          <input
                            type="text"
                            name="feature4"
                            value={pkg.feature4 || ''}
                            onChange={(e) => handleInputChange(e, index)}
                            className="w-full bg-slate-900/30 border border-white/10 rounded-xl p-3 pl-10 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                            placeholder="Enter feature 4"
                          />
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block mb-2 text-gray-300 text-sm font-medium tracking-wide">Minimum Tokens Required</label>
                        <div className="relative">
                          <input
                            type="number"
                            name="min_tokens_req"
                            value={pkg.min_tokens_req || 0}
                            onChange={(e) => handleInputChange(e, index)}
                            className="w-full bg-slate-900/30 border border-white/10 rounded-xl p-3 pl-10 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                            placeholder="Enter minimum tokens"
                          />
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {!isUpdateClicked && (
                      <button
                        type="button"
                        onClick={() => setIsUpdateClicked(true)}
                        className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 hover:scale-105 flex items-center justify-center space-x-2 mt-6"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                        </svg>
                        <span>Update Package</span>
                      </button>
                    )}

                    {isUpdateClicked && (
                      <>
                        <div className="mt-6">
                          <label className="block mb-2 text-gray-300 text-sm font-medium tracking-wide">Type "update" to confirm</label>
                          <div className="relative">
                            <input
                              type="text"
                              value={confirmationText}
                              onChange={(e) => setConfirmationText(e.target.value)}
                              className="w-full bg-slate-900/30 border border-white/10 rounded-xl p-3 pl-10 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                              placeholder="Type 'update'"
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-4 rounded-xl font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-green-500/30 hover:scale-105 flex items-center justify-center space-x-2 mt-6"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span>Confirm and Update</span>
                        </button>
                      </>
                    )}
                  </form>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 rounded-full opacity-50 mt-8"></div>
      </div>
    </div>
  );
};

export default PackageDetails;