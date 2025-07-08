import React, { useState } from 'react';
import './loginSignup.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isAdminLogin, setIsAdminLogin] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';
    if (name === 'email') {
      if (!value) error = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(value)) error = 'Invalid Email';
    }
    if (name === 'password') {
      if (!value) error = 'Password is required';
      else if (value.length < 5) error = 'At least 5 characters';
      else if (!/[0-9]/.test(value)) error = 'Include a number';
      else if (!/[!@#$%^&*]/.test(value)) error = 'Include a special character';
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const validateAll = () => {
    const fields = ['email', 'password'];
    let isValid = true;
    fields.forEach((field) => {
      validateField(field, formData[field]);
      if (!formData[field] || errors[field]) {
        isValid = false;
      }
    });
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateAll()) {
      try {
        const result = await axios.post('http://localhost:5000/api/auth/login', formData);
        alert('Login Successful');

        localStorage.setItem('token', result.data.token);
        localStorage.setItem('user', JSON.stringify(result.data.user));

        if (setUser) setUser(result.data.user);

        if (isAdminLogin) {
          if (!result.data.user.isAdmin) {
            alert('❌ You are not authorized as Admin');
            return;
          }
          navigate('/admin-dashboard');
        } else {
          if (result.data.user.isAdmin) {
            alert('⚠️ This account is an Admin. Please login as Admin.');
            return;
          }
          navigate('/');
        }
      } catch (error) {
        alert(error.response?.data?.msg || 'Login Failed!');
      }
    }
  };

  return (
    <div
      style={{
        background: 'linear-gradient(to right, #004e64, #00a6a6)',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        padding: '40px 0',
        alignItems: 'center'
      }}
    >
      <div className="container">
        <div className="header">
          <div className="text">
            {isAdminLogin ? 'Admin Login - CrowdSpark' : 'Log in to CrowdSpark'}
          </div>
          <div className="underline"></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <div className="input">
              <img src={email_icon} alt="" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            {errors.email && <p className="error">{errors.email}</p>}

            <div className="input">
              <img src={password_icon} alt="" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <div className="navigate">
            <p>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>

          <div className="submit-container">
            <button type="submit" className="submit">
              {isAdminLogin ? 'Log In as Admin' : 'Log In'}
            </button>
          </div>
        </form>

        {/* 👇 Toggle without underline */}
        <div
          className="admin-toggle"
          onClick={() => setIsAdminLogin(!isAdminLogin)}
        >
          {isAdminLogin ? 'Log in as User' : 'Log in as Admin'}
        </div>
      </div>
    </div>
  );
};

export default Login;
