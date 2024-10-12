import { ReactElement, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Dog } from '../models/Dog';
import { Button } from '../components/Button';

export default function DogDetails(): ReactElement {
  const [dog, setDog] = useState<Dog | null>(null);
  const { chipNumber } = useParams();
  const navigate = useNavigate();

  
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

  const handleDelete = (chipNumber: string) => {
    // hämta hundarna som finns i localstorage och gör om de till array
    const storedDogs = JSON.parse(localStorage.getItem('dogs') || '[]');
    // Jämför varje hunds chipNumber med det givna chipNumber och tar bort hunden vars chipNumber matchar
    const upDatedDogs = storedDogs.filter((dog: Dog) => dog.chipNumber !== chipNumber);
    //
    // spara uppdaterade hundarna till localstorage
    localStorage.setItem('dogs', JSON.stringify(upDatedDogs));
    setDog(upDatedDogs);
    navigate('/doglist');
  };

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
              <Button>Redigera</Button>
            </Link>

            <Link to="/doglist">
              <Button>Tillbaka</Button>
            </Link>
            <Button onClick={() => handleDelete(dog.chipNumber)}>Ta bort</Button>
          </div>
        </>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}
