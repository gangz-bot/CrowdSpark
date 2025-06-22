import React from 'react'
import './loginSignup.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';

import user_icon from '../assets/person.png'
import email_icon from '../assets/email.png'
import password_icon from '../assets/password.png'

const Login = () => {
  const [formData, setFormData] = useState({
    email:'',
    password:''
  });
  const [errors, setErrors] = useState({});

  const handleChange=(e)=>{
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      validateField(name, value);
  };

    const validateField = (name, value) => {
    let error = '';

    //EMAIL
    if (name === 'email') {
      if (!value) error = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(value)) error = 'Invalid Email';
    }

    //PASSWORD
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

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(validateAll()){
      //YAHA PR FORM DATA KO BACKEND MAI BHEJNE KA CODE
      alert('Form Submited Successfully');
    }
  };


  return (
    <div style={{background: 'linear-gradient(to right, #004e64, #00a6a6)',height: '100vh',display: 'flex', justifyContent: 'center', padding: '40px 0', alignItems: 'center'}}>
      
      <div className="container">

        <div className="header">
          <div className="text">Log in to CrowdSpark</div>
          <div className="underline"></div>
        </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">

          {/*EMAIL*/}
          <div className="input">
            <img src={email_icon} alt=""/>
            <input type="email" name='email' placeholder='Email' value={formData.email} onChange={handleChange}/>
          </div>
          {errors.email && <p className="error">{errors.email}</p>}

          {/*PSWD*/}
          <div className="input">
            <img src={password_icon} alt=""/>
            <input type="password" name='password' placeholder='Password' value={formData.password} onChange={handleChange}/>
          </div>
          {errors.password && <p className="error">{errors.password}</p>}

        </div>

        <div className="navigate">
          <p>
            Don't have an account?{' '}
            <Link to="/signup">Sign Up</Link>
          </p>
        </div>

        <div className="submit-container"> 
          <button type="submit" className="submit">Log In</button>
        </div>
      </form>


        

      </div>
    </div>
    

    
  )
}

export default Login
