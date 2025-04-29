
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-heineken-light to-white p-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-heineken-green mb-4">Heineken Hub</h1>
          <p className="text-lg text-gray-700">Sistema de Gerenciamento de Ativações</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <div>
            <h2 className="text-xl font-medium mb-4">Selecione seu tipo de acesso</h2>
          </div>

          <Button 
            className="w-full text-lg py-6 bg-heineken-green hover:bg-heineken-green/90"
            onClick={() => navigate('/')}
          >
            Acesso PDV
          </Button>
          
          <Button 
            variant="outline"
            className="w-full text-lg py-6 border-heineken-green text-heineken-green hover:bg-heineken-green/10"
            onClick={() => navigate('/admin/login')}
          >
            Acesso Administrativo
          </Button>
          
          <div className="pt-4 text-sm text-gray-500">
            <p>Heineken Hub - Sistema de Centralização de Pontos Extras</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
