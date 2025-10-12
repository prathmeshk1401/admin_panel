import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout from admin panel?")) {
      // Clear all stored data
      localStorage.removeItem("verdure_token");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      
      // Redirect to user app login
      window.location.href = "http://localhost:3000/login";
    }
  };

  return (
    <header className="navbar">
      <Link to={"/dashboard"} className='logo'> <img src="./VERDURE-logo.png" alt="logo" className='logo'/></Link>
      <div className="profile">
        <button onClick={toggleDropdown} className="profile-btn">
          Profile ▼
        </button>
        {dropdownOpen && (
          <ul className="dropdown">
            <li>My Profile</li>
            <li>Settings</li>
            <li onClick={handleLogout} style={{ cursor: 'pointer', color: '#dc3545' }}>
              Logout
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};

export default Navbar;