import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../api/authApi';
import { userApi } from '../api/userApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('nexus_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('nexus_token') || null);
  const [loading, setLoading] = useState(true);

  // Initialize and verify user session
  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const profile = await userApi.getProfile();
          setUser(profile);
          localStorage.setItem('nexus_user', JSON.stringify(profile));
        } catch (err) {
          // If fetching profile fails but token exists, attempt to use stored user or stay in state
          console.warn('Session verification notice:', err.message);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, [token]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await authApi.login(credentials);
      // Response: { id, token, role, name, email }
      const tokenValue = response.token;
      const userData = {
        id: response.id,
        name: response.name,
        email: response.email,
        role: response.role || 'ALUMNI',
      };

      setToken(tokenValue);
      setUser(userData);
      localStorage.setItem('nexus_token', tokenValue);
      localStorage.setItem('nexus_user', JSON.stringify(userData));
      setLoading(false);
      return userData;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const register = async (registerData) => {
    setLoading(true);
    try {
      const response = await authApi.register(registerData);
      const tokenValue = response.token;
      const userData = {
        id: response.id,
        name: response.name,
        email: response.email,
        role: response.role || registerData.role || 'ALUMNI',
      };

      setToken(tokenValue);
      setUser(userData);
      localStorage.setItem('nexus_token', tokenValue);
      localStorage.setItem('nexus_user', JSON.stringify(userData));
      setLoading(false);
      return userData;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (err) {
      console.warn('Logout warning:', err);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('nexus_token');
      localStorage.removeItem('nexus_user');
    }
  };

  const updateUserProfile = (updatedData) => {
    const newUserData = { ...user, ...updatedData };
    setUser(newUserData);
    localStorage.setItem('nexus_user', JSON.stringify(newUserData));
  };

  const value = {
    user,
    token,
    role: user?.role || 'GUEST',
    isAuthenticated: !!token && !!user,
    loading,
    login,
    register,
    logout,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
