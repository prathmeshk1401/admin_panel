import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './pages/Dashboard/Dashboard';
import Users from './pages/Users/Users';
import Farmers from './pages/Farmers/Farmers';
import Crops from './pages/Crops/Crops';
import Payments from './pages/Payments/Payments';
import Settings from './pages/Settings/Settings';
import './App.css';

function App() {
  // Protect all admin routes
  const token = localStorage.getItem('verdure_token');

  useEffect(() => {
    console.log("Admin app mounted");
    console.log("Token present:", !!token);
    console.log("Current URL:", window.location.href);
  }, [token]);

  if (!token) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div>
          <h2>Admin access requires a valid session</h2>
          <p>Please login from the user app with an admin account.</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Navbar />
          <div className="page-content">
            <Routes>
              <Route path="/" element={<Dashboard/>} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/farmers" element={<Farmers />} />
              <Route path="/crops" element={<Crops />} />
              {/* <Route path="/payments" element={<Payments />} /> */}
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<h2>404 - Page Not Found</h2>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
