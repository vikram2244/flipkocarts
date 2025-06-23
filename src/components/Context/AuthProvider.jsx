import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.post('https://flipko-springboot-1.onrender.com/api/login', { email, password });
      if (response.data.userId) {
        setUser({ id: response.data.userId });
        console.log('Logged in user:', { id: response.data.userId });
      }
    } catch (err) {
      console.error('Login failed:', err.message, err.response?.data);
      throw new Error(`Login failed: ${err.response?.data || 'Unknown error'}`);
    }
  };

  const logout = () => {
    setUser(null);
    console.log('User logged out');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};