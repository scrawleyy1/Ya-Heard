const remoteURL = "http://localhost:8088/concerts"

export const getConcertById = (concertId) => {
    return fetch(`${remoteURL}/${concertId}`)
    .then(res => res.json())
}

export const getAllConcerts = () => {
    return fetch(`${remoteURL}?_sort=date`)
    .then(res => res.json())
}

export const deleteConcert = (id) => {
    return fetch(`${remoteURL}/${id}` , {
        method: "DELETE"
    }).then(result => result.json())
}

export const addConcert = (newConcert) => {
    return fetch(`${remoteURL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newConcert)
    }).then(data => data.json());
}

export const concertComplete = (completeConcert) => {
    completeConcert.status = true
	  return fetch(`${remoteURL}/${completeConcert.id}`, {
		  method: "PATCH",
		  headers: {
			  "Content-Type": "application/json"
		  },
		  body: JSON.stringify(completeConcert)
	  }).then(data => data.json());
  }

  export const update = (editedConcert) => {
	return fetch(`${remoteURL}/${editedConcert.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(editedConcert)
	}).then(data => data.json());
}