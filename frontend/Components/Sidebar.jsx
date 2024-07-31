import React from 'react'
import './sidebar.css';

function Sidebar() {
  return (
    <div className='sidebar' >
      <h2>CryptoShield</h2>
      <ul>
        <li>Home</li>
        <li>About Us</li>
        <li>News</li>
        <li>Settings</li>
        <li>Logout</li>
      </ul>
    </div>
  )
}

export default Sidebar
