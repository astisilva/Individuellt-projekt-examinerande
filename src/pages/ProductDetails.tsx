import { ReactElement, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

interface Dog {
  id: number;
  name: string;
  img: string;
  chipNumber: string;
  breed: string;
  age: number;
}

export default function ProductDetails(): ReactElement {
  const [dog, setDog] = useState<Dog | null>(null);

  const { chipNumber } = useParams();
  console.log('chipNumber: ', chipNumber);

  useEffect(() => {
    const fetchDog = async () => {
      try {
        const response = await fetch(`https://majazocom.github.io/Data/dogs.json`);
        const dogsData = await response.json();
        const selectedDog = dogsData.find((dog: Dog) => dog.chipNumber === chipNumber);
        setDog(selectedDog);
      } catch (error) {
        console.error('Error fetching dog details:', error);
      }
    };

    fetchDog();
  }, [chipNumber]);

  return (
    <div className="product-details">
      {dog ? (
        <>
          <section>
            <h1>{dog.name}</h1>
            <img src={dog.img} alt={dog.name} />
            <p>Ras: {dog.breed}</p>
            <p>Ålder: {dog.age} år</p>
            <p>Chipnummer: {dog.chipNumber}</p>
          </section>
          <div className="buttons">
            <Link to={`/edit/${dog.chipNumber}`}>
              <button>Redigera</button>
            </Link>

            <Link to="/productlist">
              <button>Tillbaka</button>
            </Link>
          </div>
        </>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}
