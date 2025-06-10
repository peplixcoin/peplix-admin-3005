import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Stats from './pages/Stats';
import PackageDetails from './pages/PackageDetails';
import UserDetails from './pages/UserDetails';
import ProtectedRoute from './components/ProtectedRoute';
import Withdraws from './pages/Withdraws';
import Transaction from './pages/Transaction';
import WalletWithdraw from './pages/WalletWithdraw';
import AdminNotificationPage from './pages/AdminNotificationPage';
import TermsPage from './pages/TermsPage';
import ImageUploader from './pages/ImageUploader'; // Import ImageUploader

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Navbar is accessible on all routes */}
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stats"
          element={
            <ProtectedRoute>
              <Stats />
            </ProtectedRoute>
          }
        />
        <Route
          path="/packagedetails"
          element={
            <ProtectedRoute>
              <PackageDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userdetails"
          element={
            <ProtectedRoute>
              <UserDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/withdraws"
          element={
            <ProtectedRoute>
              <Withdraws />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Transaction />
            </ProtectedRoute>
          }
        />
        <Route
          path="/walletwithdraw"
          element={
            <ProtectedRoute>
              <WalletWithdraw />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/notifications"
          element={
            <ProtectedRoute>
              <AdminNotificationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/terms"
          element={
            <ProtectedRoute>
              <TermsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/imageuploader"
          element={
            <ProtectedRoute>
              <ImageUploader />
            </ProtectedRoute>
          }
        /> {/* Added ImageUploader Route */}
      </Routes>
    </Router>
  );
};

export default App;
