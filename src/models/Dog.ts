export interface Owner {
  name: string;
  lastName: string;
  phoneNumber: string;
}

export interface Dog {
  id: number;
  name: string;
  img: string;
  chipNumber: string;
  breed: string;
  age: number;
  sex: string;
  present: boolean;
  owner?: Owner;
}

export interface DogCardProps {
  dog: Dog;
  isAuthenticated: boolean;
  onDelete?: (chipNumber: string) => void;
  onArrive?: (chipNumber: string) => void;
}