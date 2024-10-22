import { ReactElement, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import '../styles/Login.css'

export default function Login(): ReactElement {
  const {login} = useAuth()
  const [username,setUsername] = useState('')
  const [password, setPassword] = useState('')

const handleLogin = (event:React.FormEvent) => { 
  event.preventDefault()

  login(username, password)
 

}

  return (
    <section className='login-container'>
    <form onSubmit={handleLogin} >
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
      <Button type="submit">Logga in</Button>
    </form>
    </section>
  );
}
