import React from 'react';
import './Home.css';
import heroImage from '../assets/hero.png';
import lockIcon from '../assets/lock.png';
import clockIcon from '../assets/clock.png';
import globeIcon from '../assets/globe.png';
import { useNavigate } from 'react-router-dom';

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
            <button className="secondary-btn">Learn More</button>
          </div>
        </div>

        <div className="hero-image">
          <img src={heroImage} alt="Hero" />
        </div>
      </div>

      <section className="features-horizontal">
        <div
          className="feature-card cursor-pointer"
          onClick={() => navigate('/secure-payments')}
        >
          <img src={lockIcon} alt="Secure Payments" className="feature-img" />
          <h2 className="feature-title">Secure Payments</h2>
          <p className="feature-subtitle">Ensure safe and protected transactions.</p>
        </div>

        <div
          className="feature-card cursor-pointer"
          onClick={() => navigate('/real-time-updates')}
        >
          <img src={clockIcon} alt="Real-Time Updates" className="feature-img" />
          <h2 className="feature-title">Real-Time Updates</h2>
          <p className="feature-subtitle">Track projects and donations easily.</p>
        </div>

        <div
          className="feature-card cursor-pointer"
          onClick={() => navigate('/global-impact')}
        >
          <img src={globeIcon} alt="Global Impact" className="feature-img" />
          <h2 className="feature-title">Global Impact</h2>
          <p className="feature-subtitle">Reach a worldwide community.</p>
        </div>
      </section>
    </>
  );
};

export default Home;
