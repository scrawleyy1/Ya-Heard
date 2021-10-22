import React, { useState, useEffect} from "react";
import { getConcertById, update } from "../modules/ConcertManager";
import { useHistory, useParams } from "react-router";

export const ConcertEditForm = () => {
    const [concert, setConcert] = useState({ name:"", date:"", location:""});
    const [isLoading, setIsLoading] = useState(false);

    const {concertId} = useParams();
    const history = useHistory();

    const handleFieldChange = event => {
        const stateToChange = { ...concert };
        stateToChange[event.target.id] = event.target.value;
        setConcert(stateToChange);
    };

    const updateExistingConcert = event => {
        event.preventDefault()
        setIsLoading(true);

    const editedConcert = {
        id: concertId,
        name: concert.name,
        date: concert.date,
        status: false,
        userId: parseInt(sessionStorage.getItem("yaheard_user"))
    };

    update(editedConcert)
    .then(() => history.push("/concerts")
    )
}
    useEffect(() => {
    getConcertById(concertId)
     .then(concert => {
        setConcert(concert);
        setIsLoading(false);
        });
    }, [concertId]);

    return (
     <form>
        <fieldset>
          <div>
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="name"
              value={concert.name}
            />
            <label htmlFor="name">Concert Name</label>

            <input
              type="date"
              required
              onChange={handleFieldChange}
              id="date"
              value={concert.date}
            />
            <label htmlFor="date">Concert Date</label>

            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="location"
              value={concert.location}
            />
            <label htmlFor="name">Concert Location</label>
          </div>
          <div>
            <button
              type="button" disabled={isLoading}
              onClick={updateExistingConcert}
            >Submit</button>
          </div>
        </fieldset>
      </form>
);
}