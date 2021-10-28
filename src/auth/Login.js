import React, {  useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Login.css"


export const Login = () => {
    const [loginUser, setLoginUser] = useState({ email: "" })
    const [existDialog, setExistDialog] = useState(false)

    const history = useHistory()

    const handleInputChange = (event) => {
        const newUser = { ...loginUser }
        newUser[event.target.id] = event.target.value
        setLoginUser(newUser)
    }


    const existingUserCheck = () => {
        // If your json-server URL is different, please change it below!
        return fetch(`http://localhost:8088/users?email=${loginUser.email}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists) {
                    sessionStorage.setItem("yaheard_user", exists.id)
                    history.push("/")
                } else {
                    setExistDialog(true)
                }
            })
    }

    return (
        <main className="login">
            <dialog open={existDialog}>
                <div>User does not exist</div>
                <button onClick={e => setExistDialog(false)}>Close</button>
            </dialog>
            <section className="main">
                <form className="topnav" onSubmit={handleLogin}>
                    <h1>Ya Heard?</h1>
                    <h4>Please sign in!</h4>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            id="email"
                            className="email"
                            placeholder="Email address"
                            required autoFocus
                            value={loginUser.email}
                            onChange={handleInputChange} />
                    </fieldset>
                    <fieldset className="loginbutton">
                        <button className= "signinbutton" type="submit">
                            Sign in!
                        </button>
                        <button className= "registerbutton" type="register">
                        <Link to="/register">Don't have an account? Register Here!</Link>
                        </button>
                    </fieldset>
                </form>
            </section>
        </main>
    )
}