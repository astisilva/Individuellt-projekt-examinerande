import { ReactElement, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login(): ReactElement {
  const {login} = useAuth()
  const [username,setUsername] = useState('')
  const [password, setPassword] = useState('')

const handleLogin = (event:React.FormEvent) => { 
  event.preventDefault()

  login(username, password)
 

}

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Användarnamn"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Lösenord"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      <button type="submit">Logga in</button>
    </form>
  );
}
