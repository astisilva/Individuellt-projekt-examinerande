import { createContext, useContext, useState, ReactNode, ReactElement } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
}

interface MyProviderProps {
  children: ReactNode;
}
const AuthContext = createContext<AuthContextType| undefined>(undefined);

export const AuthProvider = ({children}:MyProviderProps) : ReactElement =>{
  // Initialisera state med false eftersom användaren inte är autentiserad
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (username: string, password: string) => {
    if (username === 'admin' && password === 'password') {
      setIsAuthenticated(true);
    } else {
      alert('Fel användarnamn eller lösenord!');
    }
  }

  const logout = () => {
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}