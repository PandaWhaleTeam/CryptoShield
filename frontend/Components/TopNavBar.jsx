
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import cryptoLogo from "../images/cryptologo.png";
import './TopNavBar.css';
import logoutLogo from '/public/logout.png';

const TopNavBar = ({ showButtons = true, showLogo = true }) => {
    const navigate = useNavigate();

  const links = [
    { name: "Home", link: "/" },
    { name: "Dashboard", link: "/dashboard" },
    { name: "News", link: "/news" },
    { name: "About Us", link: "/aboutus" },
  ];

  const handleLogout = () => {
    console.log('Logged out!');
    navigate('/');
  }

  return (
    <header>
      {showLogo && <img src={cryptoLogo} className="logo" alt="logo" />}
      <nav>
        <ul>
          {links.map((link, index) => (
            <li key={index}>
              <NavLink to={link.link} className="nav-link" activeClassName="active">
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {!showButtons && (
        <div className="logout-container">
          <img
          src={logoutLogo}
          alt="Logout"
          className='logout-icon'
          onClick={handleLogout}
          />
        </div>
      )}

      {showButtons && (
      <div className="button-container">
        <a href="/api/signUp">
          <button>Sign Up</button>
        </a>
        <a>
          <button onClick={() => navigate('/login')}>Sign In</button>
        </a>
      </div>
      )}
    </header>
  );
};


export default TopNavBar;
