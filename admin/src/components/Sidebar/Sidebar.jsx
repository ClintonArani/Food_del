import React from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaPlus, 
  FaList, 
  FaShoppingCart,
  FaTimes 
} from 'react-icons/fa';

const Sidebar = ({ sidebarOpen, closeSidebar }) => {
  return (
    <div className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <button className="sidebar-close-btn" onClick={closeSidebar}>
        <FaTimes />
      </button>
      <div className="sidebar-header">
        <h2 className="sidebar-title">Admin Panel</h2>
      </div>
      <div className="sidebar-options">
        <NavLink 
          to={'/dashboard'} 
          className="sidebar-option" 
          activeClassName="active"
          onClick={closeSidebar}
        >
          <FaTachometerAlt className="sidebar-icon" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink 
          to={'/add'} 
          className="sidebar-option" 
          activeClassName="active"
          onClick={closeSidebar}
        >
          <FaPlus className="sidebar-icon" />
          <span>Add Item</span>
        </NavLink>
        <NavLink 
          to={'/list'} 
          className="sidebar-option" 
          activeClassName="active"
          onClick={closeSidebar}
        >
          <FaList className="sidebar-icon" />
          <span>List Items</span>
        </NavLink>
        <NavLink 
          to={'/orders'} 
          className="sidebar-option" 
          activeClassName="active"
          onClick={closeSidebar}
        >
          <FaShoppingCart className="sidebar-icon" />
          <span>Orders</span>
        </NavLink>
      </div>
      <div className="sidebar-footer">
        <p className="sidebar-footer-text">© 2023 Food Admin</p>
      </div>
    </div>
  );
};

export default Sidebar;