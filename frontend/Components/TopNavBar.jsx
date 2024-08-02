
// import React, {Fragment} from "react";
// import PageNav from './PageNav.jsx';
// import { NavLink } from "react-router-dom";
// import { border } from "@mui/system";
// import cryptoLogo from "../images/cryptologo.png";
// import './TopNavBar.css';

// import React, {Fragment} from "react";
// import PageNav from './PageNav.jsx';
// import { NavLink } from "react-router-dom";
// import { border } from "@mui/system";
// import cryptoLogo from "../images/cryptologo.png"



// //our array for the navigation of page directories   
// const TopNavBar = () => {

//     let Links = [
//         {name:"Home", link:"/" },
//         {name:"News", link:"/news" },
//         {name:"Dashboard", link:"/dashboard" },
//         {name:"About Us", link:"/aboutus" },

//     ]
//     return (
//         <header>
//             <img src={cryptoLogo}/>
//             <nav>
//             <div flex justify-center h-full>
//             <ul style={{
//             display:'flex',
//             flexDirection: 'row'
//         }} >
//             {
//                 Links.map((Link, index) => (
//                     <li key={index} style={{margin:'10px', padding:'10px'}}>
//                         <a href={Link.link} className='text-lg'>{Link.name}</a>
//                     </li>
//                 ))
//             }
//         </ul>
//         </div>
//             </nav>
//             <div class="btton-container">
//             <a class='signUpbtton' href='/api/signUp'><button>Sign Up</button></a>
//             <a class='signInbtton' href='/api/signIn'><button>Sign In</button></a>
//             </div>

//         </header>



// // //our array for the navigation of page directories
// const TopNavBar = () => {
//     let Links = [
//         {name:"Home", link:"/" },
//         {name:"Dashboard", link:"/dashboard" },
//         {name:"News", link:"/news" },
//         {name:"About Us", link:"/aboutus" },

//     ]
//     return (
//         <header>
//             <img src={cryptoLogo} className="logo" alt="logo" />
//             <nav>
//             <ul>
//                 {Links.map((Link, index) => (
//                     <li key={index}>
//                         <NavLink to={Link.link} className="text-lg" activeClassName="active">
//                             {Link.name}
//                          </NavLink>
//                     </li>
//                 ))}
//                 </ul>
//             </nav>
//             <div className="button-container">
//             <a className='signUpButton' href='/api/signUp'><button>Sign Up</button></a>
//             <a className='signInButton' href='/api/signIn'><button>Sign In</button></a>
//             </div>
//         </header>
//     );
// };



// export default TopNavBar;

import React , {useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import cryptoLogo from "../images/cryptologo.png";
import './TopNavBar.css';
import logoutLogo from '/public/logout.png';

const TopNavBar = ({ showButtons = true, showLogo = true }) => {
    const navigate = useNavigate();
    //const [logged, setLogged] = useState(false); 
    const storedUserId = localStorage.getItem('userId');

    //if (storedUserId != "undefined"){setLogoutState(true)}
    const  logout = ()=>{
        
    localStorage.setItem('userId', undefined);
    localStorage.setItem('username', undefined);
    navigate('/login');
    // setLogged(false);
    // setLogoutState(Math.random())
        
    // if (location.pathname === '/homepage') {
        
    //     window.location.reload(); 
    //     // setLogoutState(Math.random())
    //     // window.location.reload(); 
    //   } else {
    //     navigate('/homepage');
    //   }

    }

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
          {storedUserId !== "undefined" && (
            <button onClick={logout}>Sign Out</button>
          )}
        </a>
      </div>
      )}
    </header>
  );
};


export default TopNavBar;
