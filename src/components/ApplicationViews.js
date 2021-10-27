import React, { useState} from "react";
import { Route, Redirect } from "react-router";
import { Login } from "../auth/Login";
import { Register } from "../auth/Register";
import { ConcertForm } from "./concerts/ConcertForm";
import { ConcertList } from "./concerts/ConcertList";
import { ConcertEditForm } from "./concerts/ConcertEditForm";


export const ApplicationViews = () => {
  


    const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem("yaheard_user") !== null)
  
    const setAuthUser = (user) => {
      sessionStorage.setItem("yaheard_user", JSON.stringify(user))
      setIsAuthenticated(sessionStorage.getItem("yaheard_user") !== null)
    }
  
    return (
        <>
        <div>

        <Route exact path="/">
          <ConcertList />
        </Route>

        <Route exact path="/concerts">
        {isAuthenticated ? <ConcertList /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/concerts/:type">
        {isAuthenticated ? <ConcertList /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/concerts/create">
          <ConcertForm />
        </Route>

        <Route path="/concerts/:concertId(\d+)/edit">
        {isAuthenticated ? <ConcertEditForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
        <Login setAuthUser={setAuthUser} />
      </Route>

      <Route path="/register">
        <Register setAuthUser={setAuthUser} />
      </Route>
        </div>
        </>
    )
}