
import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Upload, 
  Clock, 
  Book, 
  LogOut,
  Star,
  Trophy
} from 'lucide-react';

interface PDVLayoutProps {
  children: ReactNode;
  title: string;
}

const PDVLayout = ({ children, title }: PDVLayoutProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActivePath = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-heineken-light">
      {/* Top Navigation */}
      <header className="bg-heineken-green text-white p-4 shadow-md relative overflow-hidden">
        <div className="absolute -right-10 top-0 bottom-0 w-48 bg-heineken-gold opacity-10 transform rotate-45"></div>
        <div className="absolute -left-10 top-0 bottom-0 w-24 bg-white opacity-10 transform -rotate-45"></div>
        <div className="container mx-auto flex justify-between items-center relative z-10">
          <div className="flex items-center">
            <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" fill="white" stroke="white" strokeWidth="0.5"/>
              <path d="M12 6L7 9V15L12 18L17 15V9L12 6Z" fill="#00843d" stroke="white" strokeWidth="0.2"/>
              <path d="M12 10L10 11V13L12 14L14 13V11L12 10Z" fill="white"/>
            </svg>
            <h1 className="text-2xl font-bold">Heineken Hub</h1>
          </div>
          <Button 
            variant="outline" 
            onClick={handleLogout} 
            className="border-white hover:bg-white/10 text-white hover:text-white transition-all"
          >
            <LogOut size={16} className="mr-2" />
            Sair
          </Button>
        </div>
      </header>
      
      {/* Bottom Navigation for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] md:hidden z-10">
        <div className="flex justify-around py-3">
          <button 
            onClick={() => navigate('/pdv/campaigns')} 
            className={`flex flex-col items-center text-xs ${isActivePath('/pdv/campaigns') ? 'text-heineken-green' : 'text-gray-500'}`}
          >
            <Home size={24} className={isActivePath('/pdv/campaigns') ? 'text-heineken-green mb-1' : 'text-gray-500 mb-1'} />
            Campanhas
          </button>
          <button 
            onClick={() => navigate('/pdv/upload')} 
            className={`flex flex-col items-center text-xs ${isActivePath('/pdv/upload') ? 'text-heineken-green' : 'text-gray-500'}`}
          >
            <Upload size={24} className={isActivePath('/pdv/upload') ? 'text-heineken-green mb-1' : 'text-gray-500 mb-1'} />
            Enviar
          </button>
          <button 
            onClick={() => navigate('/pdv/history')} 
            className={`flex flex-col items-center text-xs ${isActivePath('/pdv/history') ? 'text-heineken-green' : 'text-gray-500'}`}
          >
            <Clock size={24} className={isActivePath('/pdv/history') ? 'text-heineken-green mb-1' : 'text-gray-500 mb-1'} />
            Histórico
          </button>
          <button 
            onClick={() => navigate('/pdv/rules')} 
            className={`flex flex-col items-center text-xs ${isActivePath('/pdv/rules') ? 'text-heineken-green' : 'text-gray-500'}`}
          >
            <Book size={24} className={isActivePath('/pdv/rules') ? 'text-heineken-green mb-1' : 'text-gray-500 mb-1'} />
            Regras
          </button>
        </div>
      </div>
      
      {/* Sidebar for Desktop */}
      <div className="flex">
        <aside className="hidden md:block w-64 bg-white h-[calc(100vh-64px)] shadow-md fixed">
          <div className="p-6 flex flex-col h-full">
            <div className="flex items-center mb-8">
              <svg className="w-6 h-6 mr-2 text-heineken-green" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" fill="#00843d" stroke="#00843d" strokeWidth="0.5"/>
                <path d="M12 6L7 9V15L12 18L17 15V9L12 6Z" fill="white" stroke="#00843d" strokeWidth="0.2"/>
                <path d="M12 10L10 11V13L12 14L14 13V11L12 10Z" fill="#00843d"/>
              </svg>
              <h2 className="text-lg font-medium text-heineken-green">Menu</h2>
            </div>
            
            <nav className="space-y-2 flex-1">
              <Button 
                variant={isActivePath('/pdv/campaigns') ? "default" : "ghost"} 
                className={`w-full justify-start mb-1 ${isActivePath('/pdv/campaigns') ? 'bg-heineken-green hover:bg-heineken-green/90' : 'hover:bg-gray-100'}`} 
                onClick={() => navigate('/pdv/campaigns')}
              >
                <Home size={18} className="mr-2" />
                Campanhas
              </Button>
              <Button 
                variant={isActivePath('/pdv/upload') ? "default" : "ghost"} 
                className={`w-full justify-start mb-1 ${isActivePath('/pdv/upload') ? 'bg-heineken-green hover:bg-heineken-green/90' : 'hover:bg-gray-100'}`} 
                onClick={() => navigate('/pdv/upload')}
              >
                <Upload size={18} className="mr-2" />
                Enviar Fotos
              </Button>
              <Button 
                variant={isActivePath('/pdv/history') ? "default" : "ghost"} 
                className={`w-full justify-start mb-1 ${isActivePath('/pdv/history') ? 'bg-heineken-green hover:bg-heineken-green/90' : 'hover:bg-gray-100'}`} 
                onClick={() => navigate('/pdv/history')}
              >
                <Clock size={18} className="mr-2" />
                Histórico
              </Button>
              <Button 
                variant={isActivePath('/pdv/rules') ? "default" : "ghost"} 
                className={`w-full justify-start mb-1 ${isActivePath('/pdv/rules') ? 'bg-heineken-green hover:bg-heineken-green/90' : 'hover:bg-gray-100'}`} 
                onClick={() => navigate('/pdv/rules')}
              >
                <Book size={18} className="mr-2" />
                Regras
              </Button>
            </nav>
            
            <div className="mt-auto pt-4 border-t">
              <div className="bg-heineken-green/5 rounded-lg p-4 mb-4">
                <div className="flex items-center mb-2">
                  <Trophy size={16} className="text-heineken-gold mr-2" />
                  <h3 className="font-medium text-sm">Pontuação</h3>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex">
                    <Star size={14} className="text-heineken-gold" />
                    <Star size={14} className="text-heineken-gold" />
                    <Star size={14} className="text-heineken-gold" />
                  </div>
                  <span className="font-bold text-sm">125 pts</span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full border-heineken-green text-heineken-green hover:bg-heineken-green hover:text-white" 
                onClick={handleLogout}
              >
                <LogOut size={18} className="mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 md:ml-64 p-4 pb-20 md:pb-4">
          <div className="container mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-2xl font-bold text-heineken-dark flex items-center">
                {title}
                {title === 'Ranking' && (
                  <Trophy size={24} className="ml-2 text-heineken-gold" />
                )}
              </h2>
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PDVLayout;
