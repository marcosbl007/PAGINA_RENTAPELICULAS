import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    dob: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        navigate('/signin');
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="register-left">
          <form className="register-form" onSubmit={handleSubmit}>
            <h1>Register</h1>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={formData.name} onChange={handleChange} placeholder="Name" />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="Email" />
            <div className="gender-container">
              <label htmlFor="gender">Gender</label>
              <div className="radio-buttons">
                <input type="radio" id="male" name="gender" value="male" onChange={handleChange} />
                <label htmlFor="male">Male</label>
                <input type="radio" id="female" name="gender" value="female" onChange={handleChange} />
                <label htmlFor="female">Female</label>
              </div>
            </div>
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" id="dob" value={formData.dob} onChange={handleChange} />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={formData.password} onChange={handleChange} placeholder="Password" />
            <div className="button-group">
              <button type="button" className="cancel-button" onClick={() => navigate('/signin')}>Cancel</button>
              <button type="submit" className="confirm-button">Confirm</button>
            </div>
          </form>
        </div>
        <div className="register-right">
          <h2>Create your account</h2>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

