import React, { useState, useEffect } from "react";
import axios from "axios";
//import "./LandingPage.css"; // Optional styling

const Landing = () => {
    const [films5, setFilms5Data] = useState([]);
    const [actors5, setActors5Data] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/top5films')
            .then(response => setFilms5Data(response.data))
            .catch(error => console.error("Error fetching Table 1 data:", error));

        axios.get('http://localhost:5000/top5actors')
            .then(response => setActors5Data(response.data))
            .catch(error => console.error("Error fetching Table 2 data:", error));
    }, []);

    const handleRowClick = (data) => {
        setSelectedRow(data);
    };

    return (
        <div className="landing-container">
            <h1>Welcome to the Movie Store</h1>

            <div className="tables-container">
                <div className="table-box">
                    <h2>Top 5 Films</h2>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                            </tr>
                        </thead>
                        <tbody>
                            {films5.map((film) => (
                                <tr key={film.ID} onClick={() => handleRowClick(film)}>
                                    <td>{film.TITLE}</td>
                                    <td>
                                        <button>{film.RENTALS}</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="table-box">
                    <h2>Table 2</h2>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>FIRST</th>
                                <th>LAST</th>
                            </tr>
                        </thead>
                        <tbody>
                            {actors5.map((actor) => (
                                <tr key={actor.ID} onClick={() => handleRowClick(actor)}>
                                    <td>{actor.ID}</td>
                                    <td>
                                        <button>{actor.FILMCOUNT}</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Landing;
