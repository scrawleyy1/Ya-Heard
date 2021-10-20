import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

export const NavBar = () => {
    const history = useHistory();

    return (
        <nav>
        <ul>
            <li className="nav">
          <Link className="nav__link" to="/">Home</Link>
        </li>

        <li className="nav">
          <Link className="nav__link" to="/myUpcomingConcerts">My Upcoming Concerts</Link>
        </li>

        <li className="nav">
          <Link className="nav__link" to="/myPastConcerts">My Past Concerts</Link>
        </li>

        <li className="nav">
          <button className="nav__button" onClick={() => {
            sessionStorage.removeItem("yaheard_user");
            history.push("/login")
        }}>Logout</button>
        </li>
        </ul>
        </nav>
    
    )
}