import React, {useState, useEffect} from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Campaign from './pages/Campaign';
import Features from './pages/Features';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import StartCampaign from './pages/StartCampaign'; 
import SecurePayments from './pages/SecurePayments';
import RealTimeUpdates from './pages/RealTimeUpdates';
import GlobalImpact from './pages/GlobalImpact';
import { Navigate } from 'react-router-dom';


const App = () => {
  const location = useLocation();
  const navigate= useNavigate();

  const[user, setUser]= useState(null);

  useEffect(()=>{
    const storedUser= localStorage.getItem('user');
    if(storedUser){
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const hideNavbarRoutes = ['/login', '/signup', '/features', '/campaigns','/start-campaign', '/secure-payments', '/real-time-updates', '/global-impact'];
  const shouldhideNavbar = hideNavbarRoutes.includes(location.pathname);

  const handleLogout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/')
  }

  return (
    <div>
      {!shouldhideNavbar && <Navbar user={user} handleLogout={handleLogout} />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/features' element={<Features />} />
        <Route path='/campaigns' element={<Campaign />} />
        <Route path='/login' element={<Login setUser={setUser}/>} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/start-campaign" element={user ? <StartCampaign /> : <Navigate to="/login" replace />} /> 
        <Route path="/secure-payments" element={<SecurePayments />} />
        <Route path="/real-time-updates" element={<RealTimeUpdates />} />
        <Route path="/global-impact" element={<GlobalImpact />} />
      </Routes>
    </div>
  );
};

export default App;
