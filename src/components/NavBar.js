import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import "./NavBar.css"
import logo from "../images/logo1.png"

export const NavBar = () => {
    const history = useHistory();

    return (
        <nav className="navbar">
          <img className="navbarlogo" src={logo} alt="Ya Heard Logo"/>
        <ul>

        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link  to="/concerts/upcoming">My Upcoming Concerts</Link>
        </li>

        <li>
          <Link to="/concerts/past">My Past Concerts</Link>
        </li>

        <li>
          <button className="logoutbutton" onClick={() => {
            sessionStorage.removeItem("yaheard_user");
            history.push("/login")
        }}>Logout</button>
        </li>
        </ul>
        </nav>
    
    )
}