import React from 'react';
import './Home.css';
import heroImage from '../assets/hero.png';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  
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
          <button className="primary-btn hover:bg-teal-800 hover:text-white hover:scale-105 transition duration-200 ease-in-out" onClick={() => navigate('/start-campaign')}>
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
