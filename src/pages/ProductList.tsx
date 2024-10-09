import { ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/ProductList.css"

interface Dog {
  id: number;
  name: string;
  img: string;
  chipNumber: string;
  breed: string;
  age: number;
}

export default function ProductList(): ReactElement {
  const [dogs, setDogs] = useState<Dog[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://majazocom.github.io/Data/dogs.json');

        // kontrollerar att svaret är OK status 200
        if (!response.ok) {
          const message = `An error has ocurred: ${response.status}`;
          throw new Error(message);
        }

        // Sätta in hundarna i state
        const dogsData = await response.json();
        console.log('Dogsdata', dogsData);
        setDogs(dogsData);
      } catch (error) {
        // Hanterar fel
        console.error('Error fetching dogs:', error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <article className="product-list">
      <h1>Våra hundar</h1>
      <ul>
        {dogs.map((dog) => (
          <li key={dog.chipNumber}>
            <Link to={`/productdetails/${dog.chipNumber}`}>
              <img src={dog.img} alt={dog.name} />
            </Link>
            <span className='dog-name'>{dog.name}</span>
            <p className='dog-breed'>Ras: {dog.breed}</p> 
            <p className='dog-age'>Ålder: {dog.age} år</p>
          </li>
        ))}
      </ul>
    </article>
  );
}
