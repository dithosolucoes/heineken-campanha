import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Home, Upload, Clock, Book, LogOut } from 'lucide-react';
interface PDVLayoutProps {
  children: ReactNode;
  title: string;
}
const PDVLayout = ({
  children,
  title
}: PDVLayoutProps) => {
  const {
    logout
  } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return <div className="min-h-screen bg-heineken-light">
      {/* Top Navigation */}
      <header className="bg-heineken-green text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Heineken Hub</h1>
          <Button variant="outline" onClick={handleLogout} className="border-white hover:bg-white/10 text-teal-50">
            <LogOut size={16} className="mr-2" />
            Sair
          </Button>
        </div>
      </header>
      
      {/* Bottom Navigation for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] md:hidden z-10">
        <div className="flex justify-around py-3">
          <button onClick={() => navigate('/pdv/campaigns')} className="flex flex-col items-center text-xs">
            <Home size={24} className="text-heineken-green mb-1" />
            Campanhas
          </button>
          <button onClick={() => navigate('/pdv/upload')} className="flex flex-col items-center text-xs">
            <Upload size={24} className="text-heineken-green mb-1" />
            Enviar
          </button>
          <button onClick={() => navigate('/pdv/history')} className="flex flex-col items-center text-xs">
            <Clock size={24} className="text-heineken-green mb-1" />
            Histórico
          </button>
          <button onClick={() => navigate('/pdv/rules')} className="flex flex-col items-center text-xs">
            <Book size={24} className="text-heineken-green mb-1" />
            Regras
          </button>
        </div>
      </div>
      
      {/* Sidebar for Desktop */}
      <div className="flex">
        <aside className="hidden md:block w-64 bg-white h-[calc(100vh-64px)] shadow-md fixed">
          <div className="p-4">
            <h2 className="text-lg font-medium mb-6">Menu</h2>
            <nav className="space-y-1">
              <Button variant="ghost" className="w-full justify-start mb-1" onClick={() => navigate('/pdv/campaigns')}>
                <Home size={20} className="mr-2" />
                Campanhas
              </Button>
              <Button variant="ghost" className="w-full justify-start mb-1" onClick={() => navigate('/pdv/upload')}>
                <Upload size={20} className="mr-2" />
                Enviar Fotos
              </Button>
              <Button variant="ghost" className="w-full justify-start mb-1" onClick={() => navigate('/pdv/history')}>
                <Clock size={20} className="mr-2" />
                Histórico
              </Button>
              <Button variant="ghost" className="w-full justify-start mb-1" onClick={() => navigate('/pdv/rules')}>
                <Book size={20} className="mr-2" />
                Regras
              </Button>
            </nav>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 md:ml-64 p-4 pb-20 md:pb-4">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-6">{title}</h2>
            {children}
          </div>
        </main>
      </div>
    </div>;
};
export default PDVLayout;