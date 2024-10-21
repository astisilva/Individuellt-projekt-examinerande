import { useEffect, useState } from 'react';
import { Dog } from '../models/Dog';
import { Button } from '../components/Button';
import '../styles/ArrivedDogs.css';

export default function ArrivedDogs() {
  const [arrivedDogs, setArrivedDogs] = useState<Dog[]>([]);

  useEffect(() => {
    const storedArrivedDogs = JSON.parse(localStorage.getItem('arrivedDogs') || '[]');
    setArrivedDogs(storedArrivedDogs);
  }, []);

  const handleGoneHome = (chipNumber: string) => {
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
