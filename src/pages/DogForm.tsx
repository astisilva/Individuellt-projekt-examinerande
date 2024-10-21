import { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Dog } from '../models/Dog';
import { Button } from '../components/Button';
import '../styles/DogForm.css';

export default function DogForm(): ReactElement {
  const { chipNumber } = useParams();
  const navigate = useNavigate();
  const [dog, setDog] = useState({
    name: '',
    img: '',
    breed: '',
    age: 0,
    chipNumber: '',
    sex: '',
    present: false,
    owner: {
      name: '',
      lastName: '',
      phoneNumber: '',
    },
  });

  useEffect(() => {
    console.log('Current chip number:', chipNumber);
    // kollar om det finns ett chipnummer
    if (!chipNumber) {
      setDog({
        name: '',
        img: '',
        breed: '',
        age: 0,
        chipNumber: '',
        sex: '',
        present: false,
        owner: {
          name: '',
          lastName: '',
          phoneNumber: '',
        },
      });
    } else {
      const fetchData = async () => {
        try {
          const response = await fetch('https://majazocom.github.io/Data/dogs.json');
          // kontrollerar att svaret är OK status 200
          if (!response.ok) {
            const message = `An error has occurred: ${response.status}`;
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
                sex: '',
                present: false,
                owner: {
                  name: '',
                  lastName: '',
                  phoneNumber: '',
                },
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
    if (name.startsWith('owner')) {
      const ownerField = name.split('.')[1]; // Hämta fältnamn efter 'owner'
      setDog((prevDog) => ({
        ...prevDog,
        owner: { ...prevDog.owner, [ownerField]: value },
      }));
    } else {
      setDog((prevDog) => {
        return { ...prevDog, [name]: value };
      });
    }
  };

  // hanterar bilduppladdning
  const handleImagUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const reader = new FileReader();

      // Typa om event till ProgressEvent<FileReader>
      reader.onload = (loadEvent: ProgressEvent<FileReader>) => {
        if (loadEvent.target?.result) {
          // Kontrollera att result finns
          setDog((prevDog) => ({
            ...prevDog,
            img: loadEvent.target!.result as string, // Typa om result till string
          }));
        }
      };
      // Läsa in filen
      reader.readAsDataURL(file);
    }
  };

  // skicka formulärdata till servern efter submit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const storedDogs = JSON.parse(localStorage.getItem('dogs') || '[]');

    if (chipNumber) {
      const updatedDogs = storedDogs.map((storeDog: Dog) =>
        storeDog.chipNumber === chipNumber ? dog : storeDog
      );
      localStorage.setItem('dogs', JSON.stringify(updatedDogs));
    } else {
      localStorage.setItem('dogs', JSON.stringify([dog, ...storedDogs]));
    }
    navigate('/doglist');
    console.log(`Hund sparad: ${JSON.stringify(dog)}`);
  };

  return (
    <div className="dog-form-container">
      <form className="dog-form" onSubmit={handleSubmit}>
        <h1>{chipNumber ? 'Redigera hund' : 'Lägg till hund'}</h1>
        {chipNumber ? (
          <p>Chipnummer: {chipNumber}</p>
        ) : (
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
        )}
        <label>
          Bild:
          <input type="file" name="img" onChange={handleImagUpload} required={!chipNumber} />
        </label>
        <label>
          Namn:
          <input type="text" name="name" value={dog.name} onChange={handleChange} required />
        </label>
        <label>
          Ras:
          <input type="text" name="breed" value={dog.breed} onChange={handleChange} required />
        </label>

        <label>
          Ålder:
          <input type="number" name="age" value={dog.age} onChange={handleChange} required />
        </label>
        <h3>Ägarinformation</h3>
        <label>
          Förnamn:
          <input
            type="text"
            name="owner.name"
            value={dog.owner?.name || ''}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Efternamn:
          <input
            type="text"
            name="owner.lastName"
            value={dog.owner?.lastName || ''}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Telefonnummer:
          <input
            type="text"
            name="owner.phoneNumber"
            value={dog.owner?.phoneNumber || ''}
            onChange={handleChange}
            required
          />
        </label>

        <Button type="submit">Spara Ändringar</Button>
      </form>
    </div>
  );
}
