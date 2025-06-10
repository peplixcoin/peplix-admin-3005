import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Stats = () => {
  const [stats, setStats] = useState({
    tokenValue: '',
    tokenDescription: '',
  });
  
  const [arrowSelection, setArrowSelection] = useState({
    tokenArrow: '↗︎', // Default to up arrow
  });

  const [isUpdateClicked, setIsUpdateClicked] = useState(false);
  const [confirmationText, setConfirmationText] = useState('');
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;

  // Function to strip arrows from description
  const stripArrows = (description) => {
    return description.replace(/^[\↗︎↙︎]\s*/, '');
  };

  // Function to ensure tokenValue is numeric
  const ensureNumeric = (value) => {
    return String(value).replace(/[^0-9.]/g, ''); // Allow numbers and decimal point
  };

  // Function to ensure description has percentage if needed
  const ensurePercentage = (description) => {
    // If it's a number, add percentage, otherwise leave as is
    const num = parseFloat(description);
    return isNaN(num) ? description : `${num}%`;
  };

  // Fetch stats data on component mount
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${API_URL}/stats`);
        setStats({
          tokenValue: ensureNumeric(response.data.tokenValue),
          tokenDescription: stripArrows(response.data.tokenDescription),
        });
        
        // Detect arrow direction from description
        const desc = response.data.tokenDescription;
        if (desc.startsWith('↙︎')) {
          setArrowSelection({ tokenArrow: '↙︎' });
        } else {
          setArrowSelection({ tokenArrow: '↗︎' });
        }
        
        setError(null);
      } catch (error) {
        setError('Error fetching stats');
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, [API_URL]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'tokenValue') {
      // Enforce numeric input for tokenValue
      setStats({ ...stats, [name]: ensureNumeric(value) });
    } else {
      setStats({ ...stats, [name]: value });
    }
  };

  // Handle arrow selection change
  const handleArrowChange = (e) => {
    setArrowSelection({ ...arrowSelection, [e.target.name]: e.target.value });
  };

  // Handle update button click to show confirmation input
  const handleUpdateClick = () => {
    setIsUpdateClicked(true);
  };

  // Handle form submission to update stats after confirmation
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (confirmationText !== 'update') {
      setError('You must type "update" to confirm.');
      return;
    }

    // Prepend the selected arrow and ensure percentage if needed for description
    const updatedStats = {
      tokenValue: stats.tokenValue,
      tokenDescription: `${arrowSelection.tokenArrow} ${ensurePercentage(stats.tokenDescription.trim())}`,
    };

    try {
      await axios.put(`${API_URL}/stats`, updatedStats);
      setError(null);
      alert('Stats updated successfully');
      setIsUpdateClicked(false);
      setConfirmationText('');
    } catch (error) {
      setError('Error updating stats');
      console.error('Error updating stats:', error);
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent mb-4">
            Admin - Stats Dashboard
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Manage and update token statistics with precision
          </p>
        </div>

        {/* Form Section */}
        <div className="group relative max-w-lg mx-auto">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
          <div className="relative bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-slate-800/70 transition-all duration-300">
            <form onSubmit={handleSubmit}>
              {/* Token Value Field */}
              <div className="mb-6">
                <label className="block mb-2 text-gray-300 text-sm font-medium tracking-wide">Token Value</label>
                <div className="relative">
                  <input
                    type="number"
                    name="tokenValue"
                    value={stats.tokenValue}
                    onChange={handleChange}
                    className="w-full bg-slate-900/30 border border-white/10 rounded-xl p-3 pl-10 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                    placeholder="Enter token value"
                    required
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Token Description and Arrow Selection */}
              <div className="mb-6">
                <label className="block mb-2 text-gray-300 text-sm font-medium tracking-wide">Token Description</label>
                <div className="flex items-center space-x-4">
                  <div className="relative w-1/3">
                    <select
                      name="tokenArrow"
                      value={arrowSelection.tokenArrow}
                      onChange={handleArrowChange}
                      className="w-full bg-slate-900/30 border border-white/10 rounded-xl p-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 appearance-none"
                    >
                      <option value="↗︎">Up Arrow (↗︎)</option>
                      <option value="↙︎">Down Arrow (↙︎)</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="relative w-2/3">
                    <input
                      type="text"
                      name="tokenDescription"
                      value={stats.tokenDescription}
                      onChange={handleChange}
                      className="w-full bg-slate-900/30 border border-white/10 rounded-xl p-3 pl-10 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                      placeholder="Example: 6% or description"
                      required
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Update Button */}
              {!isUpdateClicked && (
                <button
                  type="button"
                  onClick={handleUpdateClick}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  <span>Update Stats</span>
                </button>
              )}

              {/* Confirmation Input */}
              {isUpdateClicked && (
                <>
                  <div className="mb-6">
                    <label className="block mb-2 text-gray-300 text-sm font-medium tracking-wide">Type "update" to confirm</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={confirmationText}
                        onChange={(e) => setConfirmationText(e.target.value)}
                        className="w-full bg-slate-900/30 border border-white/10 rounded-xl p-3 pl-10 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                        placeholder="Type 'update'"
                        required
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
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-4 rounded-xl font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-green-500/30 hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Confirm and Update</span>
                  </button>
                </>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Gradient Line */}
        <div className="h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 rounded-full opacity-50 mt-8"></div>
      </div>
    </div>
  );
};

export default Stats;