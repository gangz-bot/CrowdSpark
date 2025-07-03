import React from 'react'
import './loginSignup.css'
import { Link , useNavigate} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';



import user_icon from '../assets/person.png'
import email_icon from '../assets/email.png'
import password_icon from '../assets/password.png'


const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    dob:'',
    password:'',
    confirmPassword:''
  });
  const [errors, setErrors] = useState({});

  const handleChange=(e)=>{
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      validateField(name, value);
  };

    const validateField = (name, value) => {
    let error = '';

    //NAME
    if (name === 'name') {
      if (!value.trim()) error = 'Name is required';
      else if (!/^[A-Za-z\s]+$/.test(value)) error = 'Name must contain only letters';
    }

    //EMAIL
    if (name === 'email') {
      if (!value) error = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(value)) error = 'Invalid Email';
    }

    //DATE OF BIRTH
    if (name === 'dob') {
      if (!value) error = 'Date of Birth is required';
      else if (new Date(value) >= new Date()) error = 'Invalid Date of Birth';
    }

    //PASSWORD
    if (name === 'password') {
      if (!value) error = 'Password is required';
      else if (value.length < 5) error = 'At least 5 characters';
      else if (!/[0-9]/.test(value)) error = 'Include a number';
      else if (!/[!@#$%^&*]/.test(value)) error = 'Include a special character';
    }

    //CONFIRM PASSWORD
    if (name === 'confirmPassword') {
      if (!value) error = 'Please confirm password';
      else if (value !== formData.password) error = 'Passwords do not match';
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

   const validateAll = () => {
    const fields = ['name', 'email', 'dob', 'password', 'confirmPassword'];
    let isValid = true;
    fields.forEach((field) => {
      validateField(field, formData[field]);
      if (!formData[field] || errors[field]) {
        isValid = false;
      }
    });
    return isValid;
  };

  const handleSubmit= async (e)=>{
    e.preventDefault();
    if(validateAll()){
      try{
        const response= await axios.post('https://crowdspark-backend.onrender.com/api/auth/signup', formData);
        alert('Signup Successfull!' + response.data.user.name);
        navigate('/login');
      } catch(error){
        alert(error.response?.data?.msg || 'Signup failed!');
      }
    }
  };


  return (
    <div style={{background: 'linear-gradient(to right, #004e64, #00a6a6)',minheight: '100vh',display: 'flex', justifyContent: 'center', padding: '40px 0', alignItems: 'center'}}>
      
      <div className="container">

        <div className="header">
          <div className="text">Sign up to CrowdSpark</div>
          <div className="underline"></div>
        </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">

          {/*NAME*/}
          <div className="input">
            <img src={user_icon} alt=""/>
            <input type="text" name='name' placeholder='Name' value={formData.name} onChange={handleChange}/>
          </div>
          {errors.name && <p className="error">{errors.name}</p>}

          {/*EMAIL*/}
          <div className="input">
            <img src={email_icon} alt=""/>
            <input type="email" name='email' placeholder='Email' value={formData.email} onChange={handleChange}/>
          </div>
          {errors.email && <p className="error">{errors.email}</p>}

          {/*DOB*/}
          <div className="input">
            <img src={user_icon} alt=""/>
            <input type="text" name='dob' placeholder='Date Of Birth' value={formData.dob} onChange={handleChange}
              onFocus={(e) => (e.target.type = 'date')}
              onBlur={(e) => {
                if (!e.target.value) e.target.type = 'text';
              }}
            />
          </div>
          {errors.dob && <p className="error">{errors.dob}</p>}

          {/*PSWD*/}
          <div className="input">
            <img src={password_icon} alt=""/>
            <input type="password" name='password' placeholder='Password' value={formData.password} onChange={handleChange}/>
          </div>
          {errors.password && <p className="error">{errors.password}</p>}

          {/*CONFIRM_PSWD*/}
          <div className="input">
            <img src={password_icon} alt=""/>
            <input type="password" name='confirmPassword' placeholder='Confirm Password' value={formData.confirmPassword} onChange={handleChange}/>
          </div>
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

        </div>

        <div className="navigate">
          <p>
            Already have an account?{' '}
            <Link to="/login">Login</Link>
          </p>
        </div>

        <div className="submit-container"> 
          <button type="submit" className="submit">Sign Up</button>
        </div>
      </form>


        

      </div>
    </div>
    

    
  )
}

export default Signup
