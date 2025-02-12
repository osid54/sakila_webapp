import { useState, useEffect } from 'react';
import axios from 'axios';

function Films() {
    const [films, setFilms] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);

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

    return (
        <div>
            <SearchBar
                filterText={filterText}
                inStockOnly={inStockOnly}
                onFilterTextChange={setFilterText}
                onInStockOnlyChange={setInStockOnly}
            />
            <FilmTable
                films={films}
                filterText={filterText}
                inStockOnly={inStockOnly}
            />
        </div>
    );
}
function SearchBar({
    filterText,
    inStockOnly,
    onFilterTextChange,
    onInStockOnlyChange
}) {
    return (
        <form>
            <input
                type="text"
                value={filterText}
                placeholder="Search films..."
                onChange={(e) => onFilterTextChange(e.target.value)}
            />
            <label>
                <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => onInStockOnlyChange(e.target.checked)}
                />
                {' '}
                Only show films in stock
            </label>
        </form>
    );
}
function FilmTable({ films, filterText, inStockOnly }) {
    const rows = [];

    films.forEach((film) => {
        if (
            film.TITLE.toLowerCase().indexOf(
                filterText.toLowerCase()
            ) === -1
        ) {
            return;
        }
        if (inStockOnly && !film.inStock) { // Assuming `inStock` is a property in your film data
            return;
        }
        rows.push(
            <FilmRow
                film={film}
                key={film.ID}
            />
        );
    });

    return (
        <table border="1" cellSpacing="0" cellPadding="10">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
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
        </tr>
    );
}
export default Films;