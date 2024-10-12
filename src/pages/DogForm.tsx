import { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Dog } from '../models/Dog';


export default function DogForm(): ReactElement {
  const { chipNumber } = useParams();
  const navigate = useNavigate();
  const [dog, setDog] = useState({
    name: '',
    img: '',
    breed: '',
    age: 0,
    chipNumber: '',
  });

  useEffect(() => {
    // kollar om det finns ett chipnummer
    if(!chipNumber){
      setDog({
        name: '',
        img: '',
        breed: '',
        age: 0,
        chipNumber: '',
      });
    }else{
    const fetchData = async () => {
      try {
        const response = await fetch('https://majazocom.github.io/Data/dogs.json');
        // kontrollerar att svaret är OK status 200
        if (!response.ok) {
          const message = `An error has ocurred: ${response.status}`;
          throw new Error(message);
        }

        const dogsData = await response.json();
        console.log('Dogsdata', dogsData);
        const selectedDog = dogsData.find((dog: Dog) => dog.chipNumber === chipNumber);
        if (selectedDog) {
          setDog(
            selectedDog || {
              name: '',
              img: '',
              breed: '',
              age: 0,
              chipNumber: '',
            }
          );
        } else {
          console.error('Det fanns ingen hund med detta chipnummer');
        }
      } catch (error) {
        console.error('Error fetching dog details:', error);
      }
    };
    fetchData();
  }
  }, [chipNumber]);

  // hämta värden från input fälten
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDog((prevDog) => {
      return { ...prevDog, [name]: value };
    });
  };

// hanterar bilduppladdning
  const handleImagUpload = (event:React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.files){
    const file = event.target.files[0];
    const reader = new FileReader();
    
     // Typa om event till ProgressEvent<FileReader>
     reader.onload = (loadEvent: ProgressEvent<FileReader>) => {
      if (loadEvent.target?.result) { // Kontrollera att result finns
        setDog((prevDog) => ({
          ...prevDog,
          img: loadEvent.target!.result as string, // Typa om result till string
        }));
      }
    };
    // Läsa in filen
    reader.readAsDataURL(file);
  }
}

  // skicka formulärdata till servern efter submit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Spara ändringarna till servern...
    console.log('Submit', dog);
    const storedDogs= JSON.parse(localStorage.getItem('dogs')|| '[]');
    if(chipNumber){
      const updatedDogs = storedDogs.map((storeDog:Dog) => storeDog.chipNumber===dog.chipNumber?dog :storeDog);
      localStorage.setItem('dogs', JSON.stringify(updatedDogs));
    }else{
      // lägg till hund
      localStorage.setItem('dogs',JSON.stringify([...storedDogs, dog]));

    }
    navigate('/doglist');
    console.log('Hund sparad:', dog);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>{chipNumber ? 'Redigera hund' : 'Lägg till hund'}</h1>

        <label>
          Bild:
          <input type="file" name="img"  onChange={handleImagUpload} required={!chipNumber} />
        </label>
        <label>
          Namn:
          <input type="text" name="name" value={dog.name || ''} onChange={handleChange} required />
        </label>
        <label>
          Ras:
          <input type="text" name="breed" value={dog.breed} onChange={handleChange} required />
        </label>

        <label>
          Ålder:
          <input type="number" name="age" value={dog.age} onChange={handleChange} required />
        </label>
        <label>
          Chipnummer:
          <input
            type="text"
            name="chipNumber"
            value={dog.chipNumber}
            onChange={handleChange}
            required 
          />
        </label>
        <button type="submit">Spara Ändringar</button>
      </form>
    </div>
  );
}
