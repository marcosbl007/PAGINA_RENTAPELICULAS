
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './SignInPage.css';

const SignInPage = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['user']);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setCookie('user', email, { path: '/' });
        alert(data.message);
        if (data.isAdmin) {
          navigate('/admin');
        } else {
          navigate('/movies');
        }
      } else {
        alert(data.error || 'Inicio de sesión fallido');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="left">
          <h1>Welcome Back!</h1>
        </div>
        <div className="right">
          <form className="auth-form" onSubmit={handleLogin}>
            <h2>Login</h2>
            <p>Welcome back! Please login to your account.</p>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="checkbox-container">
              <label className="remember-me">
                <input type="checkbox" />
                Remember Me
              </label>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>
            <button type="submit">Login</button>
            <div className="signup-link">
              <p>New User? <a href="#" onClick={() => navigate('/register')}>Signup</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
