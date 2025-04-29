
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';

const PDVLoginPage = () => {
  const [cnpj, setCnpj] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Format CNPJ as user types (XX.XXX.XXX/XXXX-XX)
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 14) value = value.slice(0, 14);
    
    // Format with masks
    if (value.length > 12) {
      value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
    } else if (value.length > 8) {
      value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d+)$/, '$1.$2.$3/$4');
    } else if (value.length > 5) {
      value = value.replace(/^(\d{2})(\d{3})(\d+)$/, '$1.$2.$3');
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d+)$/, '$1.$2');
    }
    
    setCnpj(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cnpj.trim()) return;
    
    setIsLoading(true);
    try {
      const success = await login(cnpj);
      if (success) {
        navigate('/pdv/campaigns');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminLogin = () => {
    navigate('/admin/login');
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
            <CardTitle>Acesso PDV</CardTitle>
            <CardDescription>Digite o CNPJ do seu ponto de venda para continuar</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="cnpj" className="text-sm font-medium">
                    CNPJ
                  </label>
                  <Input
                    id="cnpj"
                    placeholder="XX.XXX.XXX/XXXX-XX"
                    value={cnpj}
                    onChange={handleCnpjChange}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || cnpj.length < 14}
              >
                {isLoading ? "Carregando..." : "Entrar"}
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                className="w-full text-gray-500" 
                onClick={handleAdminLogin}
              >
                Área do Administrador
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default PDVLoginPage;
