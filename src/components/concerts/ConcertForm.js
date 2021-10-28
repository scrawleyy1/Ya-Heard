import React, { useState } from "react";
import { useHistory } from "react-router";
import { addConcert } from "../modules/ConcertManager";
import "./Concert.css"

export const ConcertForm = () => {

    //useState will hold the event name, date, and location
    const [concert, setConcert] = useState({
        name: "",
        date: "",
        location: "",
        status: false
    });

    const history = useHistory();
    //makes a copy of object and allows us to add our concert, date, and location


    const handleControlledInputChange = (event) => {
        const newConcert = { ...concert }
        const currentUser = parseInt(sessionStorage.getItem("yaheard_user"))
        let selectedVal = event.target.value
        if (event.target.id.includes(" ")) {
            selectedVal = parseInt(selectedVal)
        }
        newConcert[event.target.id] = selectedVal
        newConcert.userId = currentUser
        // update state
        setConcert(newConcert)
    }


    //saves the concert and redirects user back to concert page to see concerts
    const handleClickSaveConcert = (event) => {
        event.preventDefault() //prevents the browser from submitting the form
        addConcert(concert)
            .then(() => history.push("/"))
    }

    //return gives us the concert form and allows user to add a concert
    return (
        <form className="concertform">
            <h2>New Concert</h2>
            <fieldset>
                <div>
                    <label htmlFor="name">Concert Name:</label>
                    <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus placeholder="Concert Name" value={concert.name} />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="date">Concert Date:</label>
                    <input type="date" id="date" onChange={handleControlledInputChange} required autoFocus placeholder="Concert Date" value={concert.date} />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="location">Concert Location:</label>
                    <input type="text" id="location" onChange={handleControlledInputChange} required autoFocus placeholder="Concert Location" value={concert.location} />
                </div>
            </fieldset>
            <button className="savebutton" onClick={handleClickSaveConcert}>Save Concert</button>
        </form>
    )

};