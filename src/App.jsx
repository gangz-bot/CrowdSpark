import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HowItWorks from './pages/HowItWorks';
import Features from './pages/Features';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import StartCampaign from './pages/StartCampaign'; 
import SecurePayments from './pages/SecurePayments';
import RealTimeUpdates from './pages/RealTimeUpdates';
import GlobalImpact from './pages/GlobalImpact';

const App = () => {
  const location = useLocation();

  const hideNavbarRoutes = ['/login', '/signup', '/features', '/How-it-works','/start-campaign', '/secure-payments', '/real-time-updates', '/global-impact'];
  const shouldhideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div>
      {!shouldhideNavbar && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/features' element={<Features />} />
        <Route path='/How-it-works' element={<HowItWorks />} />
        <Route path='/login' element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/start-campaign" element={<StartCampaign />} /> 
         <Route path='/secure-payments' element={<SecurePayments />} />
        <Route path='/real-time-updates' element={<RealTimeUpdates />} />
        <Route path='/global-impact' element={<GlobalImpact />} />
      </Routes>
    </div>
  );
};

export default App;
