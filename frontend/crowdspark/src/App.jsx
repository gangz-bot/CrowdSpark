import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HowItWorks from './pages/HowItWorks';
import Features from './pages/Features';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import StartCampaign from './pages/StartCampaign'; //  importing it  here

const App = () => {
  const location = useLocation();

  const hideNavbarRoutes = ['/login', '/signup', '/features', '/How-it-works','/start-campaign'];
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
        <Route path="/start-campaign" element={<StartCampaign />} /> {/*added the  route */}
      </Routes>
    </div>
  );
};

export default App;
