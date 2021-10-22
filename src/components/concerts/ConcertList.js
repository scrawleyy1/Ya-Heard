import React, { useState, useEffect } from "react";
import { getAllConcerts, deleteConcert } from "../modules/ConcertManager";
import { ConcertCard } from "./ConcertCard";
import { useHistory } from "react-router";

export const ConcertList = () => {
    const [concerts, setConcerts] = useState([]);
    const history = useHistory();
    const getConcerts = () => {
        return getAllConcerts().then(concertsFromAPI => {
            setConcerts(concertsFromAPI);
        });
    };

    const reload = () => {
        getConcerts()
    }

    const handleDeleteConcert = (id) => {
        console.log(id)
        deleteConcert(id)
            .then(() => getAllConcerts().then(setConcerts));
    };

    const incompleteConcerts = concerts.filter(t => t.status === false)
    console.log(incompleteConcerts)
    useEffect(() => {
        getConcerts();
    }, []);

    return (
        <div className="card">
            <button type="button" onClick={() => {history.push("/concerts/create")}}>Add Concert</button>
            {incompleteConcerts.map(concert =>
                <ConcertCard reload={reload} key={concert.id} concert={concert} handleDeleteConcert={handleDeleteConcert} />)}

        </div>
    );
}