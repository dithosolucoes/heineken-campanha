
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !password.trim()) return;
    
    setIsLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/admin/dashboard');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePdvLogin = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-heineken-light p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img 
            src="/placeholder.svg" 
            alt="Logo Heineken Hub" 
            className="h-16 mx-auto"
          />
          <h1 className="text-3xl font-bold mt-4 text-heineken-green">Heineken Hub</h1>
          <p className="text-gray-600 mt-2">Sistema de Gerenciamento de Ativações</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Acesse o painel administrativo</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <Button variant="link" className="p-0 h-auto text-xs">
                    Esqueceu a senha?
                  </Button>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="text-xs text-gray-500 mt-1">
                  {/* For demo purposes */}
                  <p>Use 'admin@example.com' para acessar como administrador</p>
                  <p>Use 'super@example.com' para acessar como super admin</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Carregando..." : "Entrar"}
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                className="w-full text-gray-500" 
                onClick={handlePdvLogin}
              >
                Área do PDV
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AdminLoginPage;
