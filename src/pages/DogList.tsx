import { ReactElement, useEffect, useState } from 'react';
import '../styles/DogList.css';
import DogCard from '../components/DogCard';
import { Dog } from '../models/Dog';
import { useAuth } from '../context/AuthContext';

export default function DogList(): ReactElement {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedDogs = localStorage.getItem('dogs');

        // om det finns hunddata i localstorage
        if (storedDogs) {
          console.log('Dogs from localStorage:', JSON.parse(storedDogs));
          setDogs(JSON.parse(storedDogs));
        } else {
          const response = await fetch('https://majazocom.github.io/Data/dogs.json');
          // kontrollerar att svaret är OK status 200
          if (!response.ok) {
            const message = `An error has ocurred: ${response.status}`;
            throw new Error(message);
          }

          const dogsData: Dog[] = await response.json();
          localStorage.setItem('dogs', JSON.stringify(dogsData));
          setDogs(dogsData);
        }
      } catch (error) {
        console.error('Error fetching dogs:', error.message);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (chipNumber: string) => {
    const confirmDelete = window.confirm('Är du säker på att du vill ta bort hunden?');

    if (confirmDelete) {
      const storedDogs = JSON.parse(localStorage.getItem('dogs') || '[]');
      const updatedDogs = storedDogs.filter((dog: Dog) => dog.chipNumber !== chipNumber);
      localStorage.setItem('dogs', JSON.stringify(updatedDogs));
      setDogs(updatedDogs);
      alert('Hunden har tagits bort!');
    }
  };

  const handleDogArrived = (chipNumber: string) => {
    // Hämtar de hundar som redan har markerats som "ankommit" från localStorage.
    const storedArrivedDogs = JSON.parse(localStorage.getItem('arrivedDogs') || '[]');

    // Hittar den hund som har ankommit, genom att matcha på chipNumber.
    const arrivedDog = dogs.find((dog: Dog) => dog.chipNumber === chipNumber);

    if (arrivedDog && !storedArrivedDogs.some((dog: Dog) => dog.chipNumber === chipNumber)) {
      const updatedArrivedDogs = [...storedArrivedDogs, arrivedDog];

      // Spara hundarna som ankommit i localstorage
      localStorage.setItem('arrivedDogs', JSON.stringify(updatedArrivedDogs));
      alert(`${arrivedDog.name} har ankommit till dagis!`);
    } else {
      alert(`${arrivedDog.name} är redan ankommen.`);
    }
    
  };

  return (
    <article className="product-list">
      <h1>Våra hundar</h1>
      <ul>
        {dogs.map((dog) => (
          <DogCard
            dog={dog}
            key={dog.chipNumber}
            isAuthenticated={isAuthenticated}
            onDelete={isAuthenticated ? () => handleDelete(dog.chipNumber) : undefined}
            onArrive={isAuthenticated ? () => handleDogArrived(dog.chipNumber) : undefined}
          />
        ))}
      </ul>
      {!isAuthenticated && <p>Du måste logga in för att kunna ta bort hundar.</p>}
    </article>
  );
}
