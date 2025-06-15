import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { username: string; name: string } | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, name: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ username: string; name: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Configure axios defaults
  axios.defaults.baseURL = 'http://localhost:3000';
  axios.defaults.withCredentials = true;

  useEffect(() => {
    // Check if user is authenticated on mount
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // You might want to add an endpoint to verify the token
      const token = document.cookie.includes('access_token');
      setIsAuthenticated(token);
      setLoading(false);
    } catch (error) {
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post('/signin', { user_name: username, password });
      setIsAuthenticated(true);
      setUser({ username, name: '' }); // You might want to get the name from the backend
      navigate('/chat');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.detail || 'Login failed');
      }
      throw error;
    }
  };

  const signup = async (username: string, name: string, password: string) => {
    try {
      await axios.post('/signup', { user_name: username, name, password });
      await login(username, password);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.detail || 'Signup failed');
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post('/signout');
      setIsAuthenticated(false);
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear the local state even if the server request fails
      setIsAuthenticated(false);
      setUser(null);
      navigate('/');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 