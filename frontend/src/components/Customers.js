import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Customers = () => {
    const [cust, setCust] = useState([]);

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
                console.error("There was an error fetching films:", error);
            });
    }, []);

    return (
        <div>
            <h1>All Customers</h1>
            {cust.length === 0 ? (
                <p>Loading customers...</p>
            ) : (
                <table border="1" cellSpacing="0" cellPadding="10">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>FIRST</th>
                            <th>LAST</th>
                            <th>EMAIL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cust.map(c => (
                            <tr key={c.ID}>
                                <td>{c.ID}</td>
                                <td>{c.FIRST}</td>
                                <td>{c.LAST}</td>
                                <td>{c.EMAIL}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Customers;