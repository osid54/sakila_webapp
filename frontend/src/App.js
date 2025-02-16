import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Films from './components/Films.js';
import Cust from './components/Customers.js';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<h1>Welcome to the Movie Store</h1>} />
                <Route path="/films" element={<Films />} />
                <Route path="/customers" element={<Cust />} />

            </Routes>
        </Router>
    );
}

export default App;