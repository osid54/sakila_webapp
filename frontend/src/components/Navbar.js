import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <h2>Movie Store</h2>
            <div className="nav-links">
                <Link to="/films" className="nav-button">Films</Link>
                <Link to="/customers" className="nav-button">Customers</Link>
            </div>
        </nav>
    );
};

export default Navbar;
