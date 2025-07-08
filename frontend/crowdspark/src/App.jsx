import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';

import Campaign from './pages/Campaign';
import Notification from './pages/Notification';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import StartCampaign from './pages/StartCampaign';
import BankDetails from './pages/BankDetails';
import SecurePayments from './pages/SecurePayments';
import RealTimeUpdates from './pages/RealTimeUpdates';
import GlobalImpact from './pages/GlobalImpact';
import Donation from './pages/Donation';
import Payment from './pages/Payment';
import Chat from './pages/Chat';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const hideNavbarPrefixes = [
    '/login',
    '/signup',
    '/notification',
    '/campaigns',
    '/start-campaign',
    '/bank-details',
    '/secure-payments',
    '/real-time-updates',
    '/global-impact',
    '/Donation',
    '/Payment',
    '/Contact',
    '/chat',
    '/Dashboard',
    '/admin-dashboard' // ✅ Hide navbar on admin-dashboard
  ];

  const shouldHideNavbar = hideNavbarPrefixes.some((prefix) =>
    location.pathname.startsWith(prefix)
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  if (loading) return null; // Or a loading spinner

  return (
    <div>
      {!shouldHideNavbar && <Navbar user={user} handleLogout={handleLogout} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campaigns" element={<Campaign />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />

        <Route
          path="/notification"
          element={user ? <Notification /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/start-campaign"
          element={user ? <StartCampaign /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/bank-details"
          element={user ? <BankDetails /> : <Navigate to="/login" replace />}
        />
        <Route path="/secure-payments" element={<SecurePayments />} />
        <Route path="/real-time-updates" element={<RealTimeUpdates />} />
        <Route path="/global-impact" element={<GlobalImpact />} />
        <Route path="/Donation/:campaignId" element={<Donation />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/Chat" element={<Chat />} />
        <Route path="/chat/:campaignId/:organizerId" element={<Chat />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Payment/:campaignId" element={<Payment />} />

        {/* ✅ Admin dashboard route */}
        <Route
          path="/admin-dashboard"
          element={user?.isAdmin ? <AdminDashboard /> : <Navigate to="/" replace />}
        />
      </Routes>
    </div>
  );
};

export default App;
