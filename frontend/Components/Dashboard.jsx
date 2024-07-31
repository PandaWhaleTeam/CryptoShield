import React from 'react';
import Sidebar from './Sidebar';
import './dashboard.css';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();

  return (
    <div className="dashboard-container">
            <Sidebar />
            <div className="dashboard-content">
           <button onClick={() => navigate('/')}></button>
                <h1>Dashboard</h1>
                <p>Welcome to the dashboard page!</p>
            </div>
        </div>
  )
}

export default Dashboard;
