import { Link } from 'react-router-dom';
import { Button } from './Button';
import { Dog } from '../models/Dog';

interface DogCardProps {
  dog: Dog;
  isAuthenticated: boolean;
  onDelete?: (chipNumber: string) => void;
}

export default function DogCard({ onDelete, dog, isAuthenticated }: DogCardProps) {
  return (
    <li key={dog.chipNumber}>
      <img src={dog.img} alt={dog.name} />
      <span className="dog-name">{dog.name}</span>
      <p className="dog-breed">Ras: {dog.breed}</p>
      <p className="dog-age">Ålder: {dog.age} år</p>

      {isAuthenticated ?(
        <>
        <Link to={`/dogdetails/${dog.chipNumber}`}>
        <Button>Se detaljer </Button>
      </Link>
      {onDelete && (
        <Button onClick={() => onDelete(dog.chipNumber)}>Ta bort</Button>
      )}
        </>
         ) : (
          <p>Du måste logga in för att kunna se detaljer och ta bort hundar.</p>
      )}
      
    </li>
  );
}
