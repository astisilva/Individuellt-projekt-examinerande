import { Link } from 'react-router-dom';
import { Button } from './Button';
import { Dog } from '../models/Dog';

interface DogCardProps {
  dog: Dog;
  onDelete: (chipNumber: string) => void;
}

export default function DogCard({ onDelete, dog }: DogCardProps) {
  return (
    <li key={dog.chipNumber}>
      <img src={dog.img} alt={dog.name} />
      <span className="dog-name">{dog.name}</span>
      <p className="dog-breed">Ras: {dog.breed}</p>
      <p className="dog-age">Ålder: {dog.age} år</p>
      <Link to={`/dogdetails/${dog.chipNumber}`}>
        <Button>Se detaljer </Button>
      </Link>
      <Button onClick={() => onDelete(dog.chipNumber)}>Ta bort </Button>
    </li>
  );
}
