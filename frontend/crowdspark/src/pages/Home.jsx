import React from 'react';
import './homes.css';
import heroImage from '../assets/hero.png';
import lockIcon from '../assets/lock.png';
import clockIcon from '../assets/clock.png';
import globeIcon from '../assets/globe.png';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="hero">
        <div className="hero-content">
          <h1>Fuel Ideas. Fund Dreams. <br /> Be the Spark.</h1>
          <p>
            CrowdSpark is a platform where people can raise money for their projects,
            startups, and causes.
          </p>
          <div className="hero-buttons">
            <button
              className="primary-btn hover:bg-teal-800 hover:text-white hover:scale-105 transition duration-200 ease-in-out"
              onClick={() => navigate('/start-campaign')}
            >
              Start a Campaign
            </button>
            <Link to="/Dashboard" 
            className="bg-white text-teal-900 font-semibold py-3 px-8 rounded-md shadow text-center hover:bg-teal-800 hover:text-white hover:scale-105 transition duration-200 ease-in-out">View Dashboard</Link>
          </div>
        </div>

        <div className="hero-image">
          <img src={heroImage} alt="Hero" />
        </div>
      </div>

      <section className="features-row">
        <div
          className="feature-card"
          onClick={() => navigate('/secure-payments')}
        >
          <img src={lockIcon} alt="Secure Payments" className="feature-img" />
          <h3>Secure Payments</h3>
          <p>Ensure safe and protected transactions.</p>
        </div>

        <div
          className="feature-card"
          onClick={() => navigate('/real-time-updates')}
        >
          <img src={clockIcon} alt="Real-Time Updates" className="feature-img" />
          <h3>Real-Time Updates</h3>
          <p>Track projects and donations easily.</p>
        </div>

        <div
          className="feature-card"
          onClick={() => navigate('/global-impact')}
        >
          <img src={globeIcon} alt="Global Impact" className="feature-img" />
          <h3>Global Impact</h3>
          <p>Reach a worldwide community.</p>
        </div>
      </section>
    </>
  );
};

export default Home;
