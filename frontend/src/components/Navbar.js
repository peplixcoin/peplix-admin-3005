import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 backdrop-blur-xl border-b border-white/10 shadow-2xl w-full sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 group">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-slate-800 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Peplix Admin
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-1">
              <Link to="/home" className="bg-purple-600/20 text-purple-300 px-4 py-2 rounded-lg text-sm font-medium border border-purple-500/30 shadow-lg backdrop-blur-sm">
                Dashboard
              </Link>
              <Link to="/stats" className="text-gray-300 hover:bg-white/10 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg hover:scale-105">
                Stats
              </Link>
              <Link to="/packagedetails" className="text-gray-300 hover:bg-white/10 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg hover:scale-105">
                Package Details
              </Link>
              <Link to="/withdraws" className="text-gray-300 hover:bg-white/10 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg hover:scale-105">
                Withdrawals
              </Link>
              <Link to="/userdetails" className="text-gray-300 hover:bg-white/10 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg hover:scale-105">
                User Details
              </Link>
              <Link to="/transactions" className="text-gray-300 hover:bg-white/10 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg hover:scale-105">
                Payments
              </Link>
              <Link to="/walletwithdraw" className="text-gray-300 hover:bg-white/10 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg hover:scale-105">
                Wallet Withdraw
              </Link>
              <Link to="/admin/notifications" className="text-gray-300 hover:bg-white/10 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg hover:scale-105">
                Notifications
              </Link>
              <Link to="/terms" className="text-gray-300 hover:bg-white/10 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg hover:scale-105">
                Terms & Conditions
              </Link>
              <Link to="/imageuploader" className="text-gray-300 hover:bg-white/10 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg hover:scale-105">
                QR Code Manager
              </Link>
              <Link to="/" className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-red-500/25 hover:scale-105">
                Logout
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="bg-slate-800/50 inline-flex items-center justify-center p-2 rounded-lg text-gray-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200 border border-white/10"
            >
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6 transition-transform duration-200`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6 transition-transform duration-200`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-4 pt-2 pb-6 space-y-2 bg-slate-900/95 backdrop-blur-xl border-t border-white/10">
          <Link 
            to="/home" 
            onClick={toggleMenu}
            className="block px-4 py-3 rounded-lg text-purple-300 bg-purple-600/20 border border-purple-500/30 font-medium transition-all duration-200"
          >
            Dashboard
          </Link>
          <Link 
            to="/stats" 
            onClick={toggleMenu}
            className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            Stats
          </Link>
          <Link 
            to="/packagedetails" 
            onClick={toggleMenu}
            className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            Package Details
          </Link>
          <Link 
            to="/withdraws" 
            onClick={toggleMenu}
            className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            Withdrawals
          </Link>
          <Link 
            to="/userdetails" 
            onClick={toggleMenu}
            className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            User Details
          </Link>
          <Link 
            to="/transactions" 
            onClick={toggleMenu}
            className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            Transactions
          </Link>
          <Link 
            to="/walletwithdraw" 
            onClick={toggleMenu}
            className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            Wallet Withdraw
          </Link>
          <Link 
            to="/admin/notifications" 
            onClick={toggleMenu}
            className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            Notifications
          </Link>
          <Link 
            to="/terms" 
            onClick={toggleMenu}
            className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            Terms & Conditions
          </Link>
          <Link 
            to="/imageuploader" 
            onClick={toggleMenu}
            className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            QR Code Manager
          </Link>
          <Link 
            to="/" 
            onClick={toggleMenu}
            className="block px-4 py-3 rounded-lg text-white bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 font-medium transition-all duration-200 mt-4"
          >
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;