import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { useAuth } from '../context/AuthContext';
import { Button } from './Button';

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
        </li>  <li>
          <Link to="/arriveddogs">Ankomna hundar</Link>
        </li>
        <li>
          <Link to="/dogform">Lägga till hund</Link>
        </li>
      
        {isAuthenticated ? (
          <li>
            <Button onClick={logout}>Logga ut</Button>
          </li>
        ) : (
          <li>
            <Link to="/login">
              <Button>Logga in</Button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
