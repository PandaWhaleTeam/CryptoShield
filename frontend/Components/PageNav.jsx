import React, {Fragment} from "react";
import { NavLink } from "react-router-dom";
import HomePage from "./B.Homepage";


const UserNav = () => {
    return (
        <nav activeClassName='active'>
        <NavLink to='/home'>Home</NavLink>
        <NavLink to='/news'>News</NavLink>
        <NavLink to='/dashboard'>DashBoard</NavLink>
        <NavLink to='/about-us'>About Us</NavLink>
        </nav>
    )

}

export default UserNav;
