
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if the user is already logged in on mount
    const checkAuth = async () => {
      const storedUser = localStorage.getItem('espi_user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          localStorage.removeItem('espi_user');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // In a real application, this would call a backend API
      // Add a fixed "coordinateur" user for demo/simulation
      const sampleUsers: User[] = [
        { 
          id: '1', 
          email: 'admin@espi.fr', 
          password: 'admin123', 
          role: 'admin' 
        },
        { 
          id: '2', 
          email: 'formateur@espi.fr', 
          password: 'formateur123', 
          role: 'formateur' 
        },
        { 
          id: '3', 
          email: 'coordinateur@espi.fr', 
          password: 'coordinatorpwd', 
          role: 'coordinateur' 
        },
        { 
          id: '4', 
          email: 'apprenant@espi.fr', 
          password: 'apprenant123', 
          role: 'apprenant' 
        },
        // Fixed user for your demo:
        { 
          id: '42',
          email: 'coordinator@espi.fr',
          password: 'coordinatorpwd',
          role: 'coordinateur'
        }
      ];

      const matchedUser = sampleUsers.find(
        u => u.email === email && u.password === password
      );

      if (matchedUser) {
        // Remove password before storing
        const { password, ...userWithoutPassword } = matchedUser;
        setUser(userWithoutPassword);
        localStorage.setItem('espi_user', JSON.stringify(userWithoutPassword));
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('espi_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading
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
