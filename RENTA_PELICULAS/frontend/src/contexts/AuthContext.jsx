import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const fetchUserData = async (email) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${email}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, fetchUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
