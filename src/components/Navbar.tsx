import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { useAuth } from "../context/AuthContext";

export default function Navbar(): ReactElement {
  const { isAuthenticated, logout } = useAuth();
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Startsidan</Link>
        </li>
        <li className="hundar">
          <Link to="/doglist">Våra hundar</Link>
        </li>
        <li>
          <Link to="/dogform">Lägga till hund</Link>
        </li>
        {isAuthenticated ? (
          <li>
            <button onClick={logout}>Logga ut</button>
          </li>
        ) : (
          <li>
            <Link to="/login"> <button>Logga in</button></Link>
          </li>
        )}
        <li>
          
          <Link to="/contact">Kontakt</Link>
        </li>
        <li>
          <Link to="/about">Om Oss</Link>
        </li>
      </ul>
    </nav>
  );
}
