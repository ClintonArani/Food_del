import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { FaBars, FaBell, FaSearch } from 'react-icons/fa';

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className='navbar'>
      <div className="navbar-left">
        <FaBars className="menu-icon" onClick={toggleSidebar} />
        <p className="logo logo-name">Omarish<span>.</span></p>
      </div>
      
      <div className="navbar-center">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      
      <div className="navbar-right">
        <div className="notification-icon">
          <FaBell />
          <span className="notification-badge">3</span>
        </div>
        <div className="profile-container">
          <img className='profile' src={assets.profile_image} alt="Profile" />
          <div className="profile-info">
            <p className="profile-name">Clinton Allan</p>
            <p className="profile-role">Super Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;