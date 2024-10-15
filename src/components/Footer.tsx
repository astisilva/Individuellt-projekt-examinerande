import { ReactElement } from 'react';
import '../styles/Footer.css';

function Footer(): ReactElement {
  return (
    <footer className="footer">
      <p>© 2024 Paw Place. All Rights Reserved.</p>
      <div className="social-links">
        <a href="#">Facebook</a>
        <a href="#">Instagram</a>
        <a href="#">Twitter</a>
      </div>
    </footer>
  );
}

export default Footer;
