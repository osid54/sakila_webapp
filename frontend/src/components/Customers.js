import { useState, useEffect } from 'react';
import axios from 'axios';

function Cust() {
    const [customers, setCust] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [searchFilter, setSearchFilter] = useState('FIRST');

    useEffect(() => {
        axios.get('http://localhost:5000/customers')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setCust(response.data);
                } else {
                    console.error("Expected an array but got:", response.data);
                }
            })
            .catch(error => {
                console.error("There was an error fetching customers:", error);
            });
    }, []);

    return (
        <div>
            <SearchBar
                filterText={filterText}
                searchFilter={searchFilter}
                onFilterTextChange={setFilterText}
                onSearchFilterChange={setSearchFilter}
            />
            <CustTable
                customers={customers}
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
                placeholder={`Search customers...`}
                onChange={(e) => onFilterTextChange(e.target.value)}
            />
            {" Filter By: "}
            <select onChange={(e) => onSearchFilterChange(e.target.value)} value={searchFilter}>
                <option value="ID">ID</option>
                <option value="FIRST">First Name</option>
                <option value="LAST">Last Name</option>
                <option value="EMAIL">Email</option>
            </select>
        </form>
    );
}
function CustTable({ customers, filterText, searchFilter }) {
    const filteredCust = customers.filter((cust) => {
        if (!cust[searchFilter]) return false; 

        if (searchFilter === "ID") {
            return cust.ID.toString().includes(filterText);
        }

        return cust[searchFilter].toString().toLowerCase().includes(filterText.toLowerCase());
    });

    return (
        <table border="1" cellSpacing="0" cellPadding="10">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {filteredCust.map((cust) => (
                    <CustRow cust={cust} key={cust.ID} />
                ))}
            </tbody>
        </table>
    );
}
function CustRow({ cust }) {
    return (
        <tr>
            <td>{cust.ID}</td>
            <td>{cust.FIRST}</td>
            <td>{cust.LAST}</td>
            <td>{cust.EMAIL}</td>
        </tr>
    );
}
export default Cust;