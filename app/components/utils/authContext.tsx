// authContext.tsx
import { createContext, useState, useEffect, ReactNode } from 'react';
import Login from './Login';

interface User {
  username: string;
  id: number;
  dateCreated: string;
  dateUpdated: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {

  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    
    const token = localStorage.getItem('oh-user');

    if ( token ) {
      
      let userData = JSON.parse(token);
      setUser(userData);
      localStorage.setItem('oh-user',token);
    }
  }, []);



  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {user ? children : (
          <Login />
        )}
    </AuthContext.Provider>
  );
}

export default AuthContext;
