import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import "./NavBar.css"

export const NavBar = () => {
    const history = useHistory();

    return (
        <nav className="navbar">
        <ul>

        <li className="nav">
          <Link className="nav" to="/">Home</Link>
        </li>

        <li className="nav">
          <Link className="nav" to="/concerts/upcoming">My Upcoming Concerts</Link>
        </li>

        <li className="nav">
          <Link className="nav" to="/concerts/past">My Past Concerts</Link>
        </li>

        <li className="nav">
          <button className="logoutbutton" onClick={() => {
            sessionStorage.removeItem("yaheard_user");
            history.push("/login")
        }}>Logout</button>
        </li>
        </ul>
        </nav>
    
    )
}