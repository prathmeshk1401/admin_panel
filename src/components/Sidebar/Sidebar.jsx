import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Sidebar.css';
const Sidebar = () => {
  return (
    <aside className="sidebar">
      
      <nav className="nav">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Dashboard
        </NavLink>
        <NavLink to="/users" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Users
        </NavLink>
        <NavLink to="/farmers" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Farmers
        </NavLink>
        <NavLink to="/crops" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Crops
        </NavLink>
        {/* <NavLink to="/payments" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Payments
        </NavLink> */}
        <NavLink to="/settings" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Settings
        </NavLink>
      </nav>
    </aside>
  );
};
export default Sidebar;
