import React, {Fragment} from "react";
import { NavLink } from "react-router-dom";
import HomePage from "./B.Homepage";


const userNav = () => {
    return (
        <> 
        <NavLink>Home</NavLink>
        <NavLink>News</NavLink>
        <NavLink>DashBoard</NavLink>
        <NavLink>About Us</NavLink>
        </>
    )

}

//export default userNav;