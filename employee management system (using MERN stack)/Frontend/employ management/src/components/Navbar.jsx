import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import './Navbar.css'; // Optional: import a CSS file for styles

const Navbar = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');

    // Redirect to the login page
    navigate('/'); // Adjust the path as needed for your login page
  };

  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li><Link to="/dashboard">Dashboard</Link></li> {/* Route to Dashboard */}
        <li><Link to="/employee-list">Employee List</Link></li> {/* Route to Employee List */}
        <li><Link to="/create-employee">Add Employee</Link></li> {/* Route to Add Employee */}
      </ul>
      <div className="navbar-user">
        <span>admin</span>
        <button onClick={handleLogout} className="logout">Logout</button> {/* Logout button */}
      </div>
    </nav>
  );
};

export default Navbar;

