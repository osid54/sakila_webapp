import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Landing = () => {
    const [films, setFilms] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setFilms(response.data);
                } else {
                    console.error("Expected an array but got:", response.data);
                }
            })
            .catch(error => {
                console.error("There was an error fetching films:", error);
            });
    }, []);

    return (
        <div>
            <h1>Welcome to the Movie Store</h1>
            {films.length === 0 ? (
                <p>Loading films...</p>
            ) : (
                <table border="1" cellSpacing="0" cellPadding="10">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {films.map(film => (
                            <tr key={film.ID}>
                                <td>{film.ID}</td>
                                <td>{film.TITLE}</td>
                                <td>{film.GENRE}</td>
                                <td>{film.DESC}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Landing;