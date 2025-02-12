import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Films = () => {
    const [films, setFilms] = useState([]);

    console.log("Films component rendered"); // Check if component is rendering

    useEffect(() => {
        console.log("useEffect is running"); // Check if useEffect is running
        axios.get('http://localhost:5000/films')
            .then(response => {
                console.log("API request successful"); // Check if request succeeded
                console.log(response.data); // Check the response structure
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
            <h1>All Films</h1>
            {films.length === 0 ? (
                <p>Loading films...</p> // Display loading if films data is empty
            ) : (
                <table border="1" cellSpacing="0" cellPadding="10">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Genre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {films.map(film => (
                            <tr key={film.ID}>
                                <td>{film.ID}</td>
                                <td>{film.TITLE}</td>
                                <td>{film.GENRE}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Films;