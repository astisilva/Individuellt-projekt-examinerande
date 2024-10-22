import { ReactElement } from 'react';
import '../styles/Home.css'


export default function Home():ReactElement {
  return (
    <main className="home-container">
    <h1>Välkommen till Paw Place!</h1>
    <p>Ditt hunddagisverktyg.</p>
      <p>Logga in för att hantera hundar, registrera ankomster och hemgång samt få åtkomst till viktiga informationer om våra hundar.</p>
      <p>Vi ser fram emot att hjälpa dig med en smidig och effektiv hunddagisupplevelse!</p>   
  </main>
  );
}
