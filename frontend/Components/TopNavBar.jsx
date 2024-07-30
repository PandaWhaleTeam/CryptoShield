import React, {Fragment} from "react";
import PageNav from './PageNav.jsx';
import { NavLink } from "react-router-dom";
import { border } from "@mui/system";
import cryptoLogo from "../images/cryptologo.png"

// //our array for the navigation of page directories   
const topNavBar = () => {
    let Links = [
        {name:"Home", link:"" },
        {name:"News", link:"/news" },
        {name:"Dashboard", link:"/dashboard" },
        {name:"About Us", link:"/aboutus" },

    ]
    return (
        <header>
            <img src={cryptoLogo}/>
            <nav>
            <div flex justify-center h-full>
            <ul style={{
            display:'flex',
            flexDirection: 'row'
        }} >
            {
                Links.map((Link, index) => (
                    <li key={index} style={{margin:'10px', padding:'10px'}}>
                        <a href={Link.link} className='text-lg'>{Link.name}</a>
                    </li>
                ))
            }
        </ul>
        </div>
            </nav>
            <div class="btton-container">
            <a class='signUpbtton' href='/api/signUp'><button>Sign Up</button></a>
            <a class='signInbtton' href='/api/signIn'><button>Sign In</button></a>
            </div>

        </header>


    )
}

<div />
// const topNavbar = () => {
//     return (
//         <header className="bg-black">
//             <h1>Header</h1>
//         </header>
//     )
// }

export default topNavBar; 
