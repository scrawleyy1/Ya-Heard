import React, { useState, useEffect} from "react";
import { getConcertById, update } from "../modules/ConcertManager";
import { useHistory, useParams } from "react-router";
// import "./Concert.css"

export const ConcertEditForm = () => {
    const [concert, setConcert] = useState({ name:"", date:"", location:"", status: false, userId: parseInt(sessionStorage.getItem("yaheard_user")) });
    const [isLoading, setIsLoading] = useState(false);

    const {concertId} = useParams();
    const history = useHistory();
    //prepares data to be changed

    const handleFieldChange = event => {
        const stateToChange = { ...concert };
        stateToChange[event.target.id] = event.target.value;
        setConcert(stateToChange);
    };

  
    //processes changed data
    const updateExistingConcert = event => {
        event.preventDefault()
        setIsLoading(true);

    const editedConcert = {
        id: concertId,
        name: concert.name,
        date: concert.date,
        location: concert.location,
        status: false,
        userId: parseInt(sessionStorage.getItem("yaheard_user"))
    };

    update(editedConcert)
    .then(() => history.push("/concerts")
    )
}

    //takes the new info and updates the previous data to the new data
    useEffect(() => {
    getConcertById(concertId)
     .then(concert => {
        setConcert(concert);
        setIsLoading(false);
        });
    }, [concertId]);

    //return displays the edit form so a concert can be edited
    return (
     <form className="concerteditform">
        <fieldset>
          <div>
            <label htmlFor="name">Concert Name</label>
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="name"
              value={concert.name}
            />

            <label htmlFor="date">Concert Date</label>
            <input
              type="date"
              required
              onChange={handleFieldChange}
              id="date"
              value={concert.date}
            />

            <label htmlFor="name">Concert Location</label>
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="location"
              value={concert.location}
            />
          </div>
          <div>
            <button
              className="submitbutton" type="button" disabled={isLoading}
              onClick={updateExistingConcert}
            >Submit</button>
          </div>
        </fieldset>
      </form>
);
}