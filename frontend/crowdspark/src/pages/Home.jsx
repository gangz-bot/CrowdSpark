import React from 'react';
import './Home.css';
import heroImage from '../assets/hero.png';

// Import the navigation hook from react-router-dom
import { useNavigate } from 'react-router-dom';

const Home = () => {
  // Initialize the navigation hook
  const navigate = useNavigate();

  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Fuel Ideas. Fund Dreams. <br /> Be the Spark.</h1>
        <p>
          CrowdSpark is a platform where people can raise money for their projects,
          startups, and causes.
        </p>
        <div className="hero-buttons">
          {/* ✅ Add onClick to navigate to /start-campaign */}
          <button className="primary-btn" onClick={() => navigate('/start-campaign')}>
            Start a Campaign
          </button>

          
          <button className="secondary-btn">Learn More</button>
        </div>
      </div>

      <div className="hero-image">
        <img src={heroImage} alt="Hero" />
      </div>
    </div>
  );
};

export default Home;
