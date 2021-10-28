import React, { useState, useEffect } from "react";
import { getAllConcerts, deleteConcert } from "../modules/ConcertManager";
import { ConcertCard } from "./ConcertCard";
import { useHistory, useParams } from "react-router";
import "./Concert.css"

export const ConcertList = () => {
    const [concerts, setConcerts] = useState([]);
    const history = useHistory();
    const { type } = useParams();

    const getConcerts = () => {
        return getAllConcerts().then(concertsFromAPI => {
            setConcerts(concertsFromAPI)
        })
    }

    const reload = () => {
        getConcerts()
    }


    //Function deletes a single concert and re-renders to display concerts still in API
    const handleDeleteConcert = (id) => {
        console.log(id)
        deleteConcert(id)
            .then(() => getAllConcerts().then(setConcerts));
    };

    const incompleteConcerts = concerts.filter(t => t.status === false)


    const startDate = new Date("2017-08-04");
    const endDate = new Date("2021-10-26");

    const pastConcerts = incompleteConcerts.filter(a => {
        const date = new Date(a.date);
        return (date >= startDate && date <= endDate);
    });

    const upcomingConcerts = incompleteConcerts.filter(a => {
        const date = new Date(a.date);
        return (date >= endDate);
    });


    //Clean up function
    // useEffect(() => {
        //     let isMounted = true
        //     getAllConcerts().then((concertsFromAPI) => {
            //         if (isMounted) {
                //                 setConcerts(concertsFromAPI);
                //         }
                //         else {
                    //             isMounted = false
                    //         }
                    //     })
                    // }, []);
                    
                 
                 
   //After the data comes back from the API we use setConcerts function to update state
    useEffect(() => {
        getConcerts();
    }, []);

    //Finally we use .map() to "loop over" the concerts array to show a list of concert cards
    //return shows a button to add a concert, displays the concert cards in a list, and shows a button to delete concerts

    return (
        <div className="card">
            <button className="addconcertbutton" type="button" onClick={() => { history.push("/concerts/create") }}>Add Concert</button>
            {type === "upcoming" ? upcomingConcerts.map(concert =>
                <ConcertCard reload={reload} key={concert.id} concert={concert} handleDeleteConcert={handleDeleteConcert} />) : ""}
            {type === "past" ? pastConcerts.map(concert =>
                <ConcertCard reload={reload} key={concert.id} concert={concert} handleDeleteConcert={handleDeleteConcert} />) : ""}
        </div>
    );
}