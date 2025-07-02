import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL; // Replace hardcoded URL
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('authUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${baseUrl}/api/login`, { email, password });

      if (response.data.userId) {
        const loggedInUser = { id: response.data.userId, email };
        setUser(loggedInUser);
        localStorage.setItem('authUser', JSON.stringify(loggedInUser));
        console.log('Logged in user:', loggedInUser);
      } else {
        throw new Error('Login failed: Invalid response from server.');
      }
    } catch (err) {
      console.error('Login failed:', err.message, err.response?.data);
      throw new Error(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
    console.log('User logged out');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser && !user) {
      setUser(JSON.parse(storedUser));
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
