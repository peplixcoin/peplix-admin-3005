import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Track error state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/home');
      setError(null);
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <div className="max-w-md mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent mb-4">
            Admin Login
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Sign in to manage your application
          </p>
        </div>

        {/* Form Section */}
        <div className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
          <form onSubmit={handleSubmit} className="relative bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <div className="mb-4">
              <input 
                type="text" 
                placeholder="Username" 
                className="w-full bg-slate-900/30 border border-white/10 rounded-xl p-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
              />
            </div>
            <div className="mb-6">
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full bg-slate-900/30 border border-white/10 rounded-xl p-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            <button 
              type="submit" 
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 px-6 w-full rounded-xl font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 hover:scale-105 flex items-center justify-center space-x-2"
            >
             
              <span>Login</span>
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
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

        {/* Bottom Gradient Line */}
        <div className="h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 rounded-full opacity-50 mt-8"></div>
      </div>
    </div>
  );
};

export default Login;