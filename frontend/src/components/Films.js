import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Films = () => {
    const [film, setFilms] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/films/top5')
            .then(response => setFilms(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Top 5 Rented Films</h1>
            <ul>
                {film.map(f => (
                    <li key={f.id}>{f.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default Films;
