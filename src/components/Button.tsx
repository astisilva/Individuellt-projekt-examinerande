import { MouseEventHandler } from 'react';

interface IButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({ onClick, children }: IButtonProps) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
