import { Link } from 'react-router-dom';
import { Button } from './Button';
import { DogCardProps } from '../models/Dog';
import '../styles/DogCard.css';


export default function DogCard({ onDelete, dog, isAuthenticated }: DogCardProps) {
  return (
    <li className='dog-card' key={dog.chipNumber}>
      <img src={dog.img} alt={dog.name} />
      <span className="dog-name">{dog.name}</span>
      <p className="dog-breed">Ras: {dog.breed}</p>
      <p className="dog-age">Ålder: {dog.age} år</p>

      {isAuthenticated ? (
        <div className="actions">
          <Link to={`/dogdetails/${dog.chipNumber}`}>
            <Button>Se detaljer</Button>
          </Link>
          {onDelete && (
            <Button onClic
            
            k={() => onDelete(dog.chipNumber)}>Ta bort</Button>
          )}
        </div>
      ) : (
        <p>Du måste logga in för att kunna se detaljer och ta bort hundar.</p>
      )}
    </li>
  );
}
