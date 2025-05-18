
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Campus, User } from '@/lib/types';
import { campuses } from '@/lib/data';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  selectedCampus: Campus | null;
  setSelectedCampus: (campus: Campus) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [selectedCampus, setSelectedCampus] = useState<Campus | null>(null);

  const login = async (email: string, password: string) => {
    // In a real app, you'd verify with a backend
    if (!selectedCampus) return false;
    
    // Check if email ends with the correct extension
    if (!email.endsWith(selectedCampus.emailExtension)) {
      return false;
    }
    
    // Mock successful login
    if (password.length >= 6) {
      setIsAuthenticated(true);
      // Mock user creation
      setUser({
        id: Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0],
        email,
        campus: selectedCampus,
        profilePicture: '/assets/default-avatar.jpg'
      });
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        selectedCampus,
        setSelectedCampus,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
