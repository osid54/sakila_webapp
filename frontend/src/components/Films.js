import { useState, useEffect } from 'react';
import axios from 'axios';

function Films() {
    const [films, setFilms] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [searchFilter, setSearchFilter] = useState('TITLE');

    useEffect(() => {
        axios.get('http://localhost:5000/films')
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

    console.log("FILMS: ", films)

    return (
        <div>
            <SearchBar
                filterText={filterText}
                searchFilter={searchFilter}
                onFilterTextChange={setFilterText}
                onSearchFilterChange={setSearchFilter}
            />
            <FilmTable
                films={films}
                filterText={filterText}
                searchFilter={searchFilter}
            />
        </div>
    );
}
function SearchBar({
    filterText,
    searchFilter,
    onFilterTextChange,
    onSearchFilterChange
}) {
    return (
        <form>
            <input
                type="text"
                value={filterText}
                placeholder={`Search films...`}
                onChange={(e) => onFilterTextChange(e.target.value)}
            />
            {" Filter By: "}
            <select onChange={(e) => onSearchFilterChange(e.target.value)} value={searchFilter}>
                <option value="ID">ID</option>
                <option value="TITLE">Title</option>
                <option value="GENRE">Genre</option>
                <option value="DESC">Description</option>
                <option value="ACTORS">Actor</option>
            </select>
        </form>
    );
}
function FilmTable({ films, filterText, searchFilter }) {
    const filteredFilms = films.filter((film) => {
        if (!film[searchFilter]) return false; 

        if (searchFilter === "ID") {
            return film.ID.toString().includes(filterText);
        }

        return film[searchFilter].toString().toLowerCase().includes(filterText.toLowerCase());
    });

    return (
        <table border="1" cellSpacing="0" cellPadding="10">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Length</th>
                    <th>Rating</th>
                    <th>Actors</th>
                </tr>
            </thead>
            <tbody>
                {filteredFilms.map((film) => (
                    <FilmRow film={film} key={film.ID} />
                ))}
            </tbody>
        </table>
    );
}
function FilmRow({ film }) {
    return (
        <tr>
            <td>{film.ID}</td>
            <td>{film.TITLE}</td>
            <td>{film.GENRE}</td>
            <td>{film.DESC}</td>
            <td>{film.PRICE}</td>
            <td>{film.LENGTH}</td>
            <td>{film.RATING}</td>
            <td>{film.ACTORS}</td>
        </tr>
    );
}
export default Films;