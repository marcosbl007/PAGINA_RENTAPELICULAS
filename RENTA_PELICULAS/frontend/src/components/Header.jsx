
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useCookies } from 'react-cookie';
import './Header.css';
import userIcon from '../assets/images/user-icon.png';
import logo from '../assets/images/logo.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cookies, , removeCookie] = useCookies(['user']);
  const user = cookies.user;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    removeCookie('user');
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="left-section">
          <Link to="/">
            <img src={logo} alt="Logo" className="site-logo" />
          </Link>
          <Link to="/" className="logo-link">
            <h1 className="logo">PopCornFlix</h1>
          </Link>
          <nav>
            <ul className="nav-links">
              <li><Link to="/movies">Movies</Link></li>
              <li><Link to="/contacts">Contact us</Link></li>
              <li><Link to="/rent-movie">Rent Movie</Link></li>
              <li><Link to="/rented-movies">Rented Movies</Link></li>
            </ul>
          </nav>
        </div>
        <SearchBar />
        <div className="auth-buttons">
          <img src={userIcon} alt="User" className="user-icon" onClick={toggleMenu} />
          {menuOpen && (
            <div className="dropdown-menu">
              {user ? (
                <>
                  <Link to="/edit-profile" onClick={() => setMenuOpen(false)}>Edit Profile</Link>
                  <button onClick={handleLogout}>Log Out</button>
                </>
              ) : (
                <>
                  <Link to="/signin" onClick={() => setMenuOpen(false)}>Sign In</Link>
                  <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
