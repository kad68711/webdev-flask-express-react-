import React from 'react';
import './DashBoard.css';
import Navbar from './Navbar';

const DashBoard = () => {
  return (
    <div className="dashboard-container">
      <Navbar/>

      {/* Dashboard Content */}
      <div className="dashboard-content">
        <h1>Welcome Admin Panel</h1>
      </div>
    </div>
  );
};

export default DashBoard;
