import { ReactElement, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Dog } from '../models/Dog';
import { Button } from '../components/Button';
import '../styles/DogDetails.css'

export default function DogDetails(): ReactElement {
  const [dog, setDog] = useState<Dog | null>(null);
  const { chipNumber } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
  const storedDogs = JSON.parse(localStorage.getItem('dogs') || '[]');
  const selectedDog = storedDogs.find((dog: Dog) => dog.chipNumber === chipNumber);
  setDog(selectedDog || null);
  }, [chipNumber]);

  const handleDelete = (chipNumber: string) => {
    // hämta hundarna som finns i localstorage och gör om de till array
    const storedDogs = JSON.parse(localStorage.getItem('dogs') || '[]');
    // Jämför varje hunds chipNumber med det givna chipNumber och tar bort hunden vars chipNumber matchar
    const upDatedDogs = storedDogs.filter((dog: Dog) => dog.chipNumber !== chipNumber);
    //
    // spara uppdaterade hundarna till localstorage
    localStorage.setItem('dogs', JSON.stringify(upDatedDogs));
  /*   setDog(upDatedDogs); */
    navigate('/doglist');
  };

  return (
    <div className="container">
    <div className="product-details">
      {dog ? (
        <>
          <section>
            <h1>{dog.name}</h1>
            <p>Chipnummer: {dog.chipNumber}</p>

            <img src={dog.img} alt={dog.name} />
            <p>Ras: {dog.breed}</p>
            <p>Ålder: {dog.age} år</p>
            
            <p>Närvarande: {dog.present ? 'Ja' : 'Nej'}</p>
            
            <h2>Ägarinformation</h2>
            {dog.owner ? (
              <>
                <p>Ägare: {dog.owner.name} {dog.owner.lastName}</p>
                <p>Telefonnummer: {dog.owner.phoneNumber}</p>
              </>
            ) : (
              <p>Ingen ägarinformation tillgänglig</p>
            )}
          </section>
          <div className="dog-details-buttons">
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
        <p>Loading...</p>
      )}
    </div>
    </div>
  );
}
