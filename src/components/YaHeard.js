import React from 'react';
import { Route, Redirect  } from 'react-router';
import { ApplicationViews } from "./ApplicationViews"
import { Login } from "../auth/Login";
import { NavBar } from './NavBar';
import { Register } from '../auth/Register';
import "./YaHeard.css"

export const YaHeard = () => {
  return (
    <>
    <Route
      render={() => {
        if (sessionStorage.getItem("yaheard_user")) {
          return (
            <>
              <NavBar />
              <ApplicationViews />
            </>
          )
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
      <Login />
    </Route>

    <Route path="/register">
      <Register />
    </Route>

    </>
  )
}