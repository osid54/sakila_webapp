import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Films from './components/Films.js';
import Cust from './components/Customers.js';
import Navbar from './components/Navbar.js';
import Landing from './components/Landing.js';


function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/films" element={<Films />} />
                <Route path="/customers" element={<Cust />} />

            </Routes>
        </Router>
    );
}

export default App;