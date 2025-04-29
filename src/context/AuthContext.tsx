
import { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '@/types/types';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  login: (identifier: string, password?: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Persistência do usuário autenticado
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('heinekenhub_user');
    if (stored) {
      try {
        return JSON.parse(stored) as User;
      } catch {
        return null;
      }
    }
    return null;
  });
  const { toast } = useToast();

  const loginPdv = async (cnpj: string): Promise<boolean> => {
    // In a real app, validate the CNPJ with an API call
    // For now, we'll just accept any input for demo purposes
    if (!cnpj.trim()) {
      toast({
        title: 'Erro de autenticação',
        description: 'Por favor, insira um CNPJ válido.',
        variant: 'destructive',
      });
      return false;
    }
    
    // Mock user creation for PDV role
    const pdvUser = {
      id: 'pdv-' + Date.now(),
      role: 'pdv',
      cnpj
    };
    setUser(pdvUser);
    localStorage.setItem('heinekenhub_user', JSON.stringify(pdvUser));
    return true;
  };

  const loginAdmin = async (email: string, password: string): Promise<boolean> => {
    // In a real app, authenticate against an API
    if (!email || !password) {
      toast({
        title: 'Erro de autenticação',
        description: 'E-mail e senha são obrigatórios.',
        variant: 'destructive',
      });
      return false;
    }

    // Mock admin authentication (accept any valid email/password for demo)
    const isAdmin = email.includes('admin');
    const isSuperAdmin = email.includes('super');
    
    const role: UserRole = isSuperAdmin ? 'superadmin' : (isAdmin ? 'admin' : 'pdv');
    
    const adminUser = {
      id: role + '-' + Date.now(),
      role,
      email
    };
    setUser(adminUser);
    localStorage.setItem('heinekenhub_user', JSON.stringify(adminUser));
    
    return true;
  };

  const login = async (identifier: string, password?: string): Promise<boolean> => {
    try {
      // Determine login type by presence of password
      if (!password) {
        return loginPdv(identifier);
      } else {
        return loginAdmin(identifier, password);
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Erro de autenticação',
        description: 'Ocorreu um erro durante o login. Por favor, tente novamente.',
        variant: 'destructive',
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('heinekenhub_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
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
