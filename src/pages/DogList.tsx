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
    const storedDogs = JSON.parse(localStorage.getItem('dogs') || '[]');
    const updatedDogs = storedDogs.filter((dog: Dog) => dog.chipNumber !== chipNumber);
    localStorage.setItem('dogs', JSON.stringify(updatedDogs));
    setDogs(updatedDogs);
    console.log(
      'Dogs after deletion from localStorage:',
      JSON.parse(localStorage.getItem('dogs') || '[]')
    );
  };

  return (
    
    <article className="product-list">
      <h1>Våra hundar</h1>
      <ul>
        {dogs.map((dog) => (
          <DogCard dog={dog} key={dog.chipNumber} isAuthenticated={isAuthenticated}  onDelete={isAuthenticated ? () => handleDelete(dog.chipNumber):undefined} />
        ))}
      </ul>
      {!isAuthenticated && <p>Du måste logga in för att kunna ta bort hundar.</p>}
    </article>
  );
}
