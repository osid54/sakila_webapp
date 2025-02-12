import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Films from './components/Films.js'; // Adjust the path

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<h1>Welcome to the Movie Store</h1>} />
                <Route path="/films" element={<Films />} /> {/* Pass the component itself */}
            </Routes>
        </Router>
    );
}

export default App;