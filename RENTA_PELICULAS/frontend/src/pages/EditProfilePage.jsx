
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './EditProfilePage.css';

const EditProfilePage = () => {
  const [cookies] = useCookies(['user']);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserData = async () => {
      const email = cookies.user;
      if (email) {
        try {
          const response = await fetch(`http://localhost:5000/api/users/${email}`);
          const data = await response.json();
          setFormData({
            name: data?.name || '',
            email: data?.email || '',
            password: '', 
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    loadUserData();
  }, [cookies]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = cookies.user;

    try {
      const response = await fetch(`http://localhost:5000/api/users/${email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        navigate('/movies');
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
            <h1>Edit Profile</h1>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} disabled />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
            <div className="button-group">
              <button type="button" className="cancel-button" onClick={() => navigate('/movies')}>Cancel</button>
              <button type="submit" className="confirm-button">Save</button>
            </div>
          </form>
        </div>
        <div className="register-right">
          <h2>Update your account</h2>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
