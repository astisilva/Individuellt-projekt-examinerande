import { useEffect, useState } from 'react';
import { Dog } from '../models/Dog';
import { Button } from '../components/Button';
import '../styles/ArrivedDogs.css';

export default function ArrivedDogs() {
  const [arrivedDogs, setArrivedDogs] = useState<Dog[]>([]);

  useEffect(() => {
     // Hämtar den sparade listan med 'arrivedDogs' från localStorage
     // Om det inte finns något i localStorage, returnerar '|| []' en tom array.
    const storedArrivedDogs = JSON.parse(localStorage.getItem('arrivedDogs') || '[]');
   // Uppdaterar tillståndet 'arrivedDogs' med den hämtade listan från localStorage.
    setArrivedDogs(storedArrivedDogs);
  }, []);


  // funktion för att ange att en hund har gått hem
  const handleGoneHome = (chipNumber: string) => {
    // En ny lista skapas genom att filtrera bort den hund som har det givna chipNumret. Om hundens chipnummer inte är samma, då behåller den hunden i listan.
    const updatedArrivedDogs = arrivedDogs.filter((dog) => dog.chipNumber !== chipNumber);
    localStorage.setItem('arrivedDogs', JSON.stringify(updatedArrivedDogs));
    setArrivedDogs(updatedArrivedDogs);
    alert('Hunden har gått hem!');
  };

  return (
    <div className="arrived-dogs-wrapper">
    <main className="arrived-dogs-container">
      <h1>Hundar som har ankommit</h1>
      <ul className="arrived-dogs-list">
        {arrivedDogs.map((dog: Dog) => (
          <li key={dog.chipNumber} className="arrived-dog-card">
            <img src={dog.img} alt={dog.name} className="arrived-dog-image" />
            <p className="arrived-dog-name">{dog.name}</p>
            <Button onClick={() => handleGoneHome(dog.chipNumber)}>Gå Hem</Button>
          </li>
        ))}
      </ul>
      {arrivedDogs.length === 0 && <p className="no-dogs-message">Inga hundar har ankommit än.</p>}
    </main>   
  </div>
  
  );
}
