import React from "react";
import { useHistory } from "react-router";
import { concertComplete } from "../modules/ConcertManager";
import "./Concert.css"

export const ConcertCard = ({ concert, reload, handleDeleteConcert }) => {
    const history = useHistory();

    const handleCheckboxComplete = (event) => {
        concertComplete(concert).then(reload)
    }

    const currentUser = parseInt(sessionStorage.getItem("yaheard_user"))

    //return displays concert card to the DOM
    return (

        <div className="card">
            <h3>Concert: {(concert.name)}</h3>
            <p>Date: {concert.date}</p>
            <p>Location: {concert.location}</p>
            {concert.userId === currentUser && <div className="complete"><label htmlFor="complete">complete?
            <input onChange={handleCheckboxComplete}type="checkbox" name="complete" id="complete"></input>
            </label></div> }
            {concert.userId === currentUser && <div>
                <button className="editbutton" type="button" onClick={() => history.push(`/concerts/${concert.id}/edit`)}>Edit</button>
                <button className="deletebutton" type="button" onClick={() => handleDeleteConcert(concert.id)}>Delete</button>
                </div>}
        </div>
    );
}