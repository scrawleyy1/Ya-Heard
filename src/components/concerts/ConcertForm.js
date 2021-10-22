import React, { useState } from "react";
import { useHistory } from "react-router";
import { addConcert } from "../modules/ConcertManager";

export const ConcertForm = () => {
    const [concert, setConcert] = useState({
        name: "",
        date: "",
        location: "",
        status: false
    });

    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newConcert = { ...concert }
        const currentUser = parseInt(sessionStorage.getItem("yaheard_user"))
        let selectedVal = event.target.value
        if (event.target.id.includes(" ")) {
            selectedVal = parseInt(selectedVal)
        }
        newConcert[event.target.id] = selectedVal
        newConcert.userId = currentUser
        setConcert(newConcert)
    }

    const handleClickSaveConcert = (event) => {
        event.preventDefault()
        addConcert(concert)
            .then(() => history.push("/"))
    }

    return (
        <form>
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
            <button onClick={handleClickSaveConcert}>Save Concert</button>
        </form>
    )

};