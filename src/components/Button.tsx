import { MouseEventHandler } from 'react';

interface IButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

export function Button({ onClick, children }: IButtonProps) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
