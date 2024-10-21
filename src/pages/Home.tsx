import { ReactElement } from 'react';
import '../styles/Home.css'


export default function Home():ReactElement {
  return (
    <main className="container">
    <h1>Välkommen till Paw Place!</h1>
    <p>Här kan du hitta allt för din fyrbenta vän.</p>
    <div className="hero">
      <img src="path_to_your_image.jpg" alt="Hundar som leker" className="hero-image" />
      <p>Utforska våra tjänster för hundpassning och dagis!</p>
    </div>
 
  </main>
  );
}
