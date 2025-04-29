
import { ReactNode, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Users, 
  FileText, 
  BarChart, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight, 
  Flag,
  Image,
  User,
  Trophy
} from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isSuperAdmin = user?.role === 'superadmin';
  
  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex bg-heineken-light">
      {/* Sidebar */}
      <aside 
        className={`bg-white shadow-md h-screen fixed transition-all duration-300 z-10 ${
          collapsed ? 'w-16' : 'w-64'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex justify-between items-center">
            {!collapsed && (
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" fill="#00843d" stroke="#00843d" strokeWidth="0.5"/>
                  <path d="M12 6L7 9V15L12 18L17 15V9L12 6Z" fill="white" stroke="#00843d" strokeWidth="0.2"/>
                  <path d="M12 10L10 11V13L12 14L14 13V11L12 10Z" fill="#00843d"/>
                </svg>
                <h2 className="font-bold text-heineken-green">Heineken Hub</h2>
              </div>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-1 text-heineken-green hover:bg-heineken-green/10" 
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </Button>
          </div>
          
          <nav className="flex-1 py-6 px-2">
            <ul className="space-y-2">
              <li>
                <Button 
                  variant={isActivePath('/admin/dashboard') ? "default" : "ghost"} 
                  className={`w-full justify-start ${collapsed ? 'px-2' : ''} ${isActivePath('/admin/dashboard') ? 'bg-heineken-green hover:bg-heineken-green/90' : ''}`}
                  onClick={() => navigate('/admin/dashboard')}
                >
                  <Home className="mr-2" size={18} />
                  {!collapsed && <span>Dashboard</span>}
                </Button>
              </li>
              <li>
                <Button 
                  variant={isActivePath('/admin/campaigns') ? "default" : "ghost"} 
                  className={`w-full justify-start ${collapsed ? 'px-2' : ''} ${isActivePath('/admin/campaigns') ? 'bg-heineken-green hover:bg-heineken-green/90' : ''}`}
                  onClick={() => navigate('/admin/campaigns')}
                >
                  <FileText className="mr-2" size={18} />
                  {!collapsed && <span>Campanhas</span>}
                </Button>
              </li>
              <li>
                <Button 
                  variant={isActivePath('/admin/pdvs') ? "default" : "ghost"} 
                  className={`w-full justify-start ${collapsed ? 'px-2' : ''} ${isActivePath('/admin/pdvs') ? 'bg-heineken-green hover:bg-heineken-green/90' : ''}`}
                  onClick={() => navigate('/admin/pdvs')}
                >
                  <Users className="mr-2" size={18} />
                  {!collapsed && <span>PDVs</span>}
                </Button>
              </li>
              <li>
                <Button 
                  variant={isActivePath('/admin/uploads') ? "default" : "ghost"} 
                  className={`w-full justify-start ${collapsed ? 'px-2' : ''} ${isActivePath('/admin/uploads') ? 'bg-heineken-green hover:bg-heineken-green/90' : ''}`}
                  onClick={() => navigate('/admin/uploads')}
                >
                  <Image className="mr-2" size={18} />
                  {!collapsed && <span>Auditar Envios</span>}
                </Button>
              </li>
              <li>
                <Button 
                  variant={isActivePath('/admin/ranking') ? "default" : "ghost"} 
                  className={`w-full justify-start ${collapsed ? 'px-2' : ''} ${isActivePath('/admin/ranking') ? 'bg-heineken-green hover:bg-heineken-green/90' : ''}`}
                  onClick={() => navigate('/admin/ranking')}
                >
                  <Trophy className="mr-2" size={18} />
                  {!collapsed && <span>Ranking</span>}
                </Button>
              </li>
              <li>
                <Button 
                  variant={isActivePath('/admin/reports') ? "default" : "ghost"} 
                  className={`w-full justify-start ${collapsed ? 'px-2' : ''} ${isActivePath('/admin/reports') ? 'bg-heineken-green hover:bg-heineken-green/90' : ''}`}
                  onClick={() => navigate('/admin/reports')}
                >
                  <BarChart className="mr-2" size={18} />
                  {!collapsed && <span>Relatórios</span>}
                </Button>
              </li>
              
              {isSuperAdmin && (
                <>
                  <li className="pt-2">
                    {!collapsed && <div className="px-3 py-1 text-xs font-medium text-gray-500">Administração</div>}
                    <Button 
                      variant={isActivePath('/admin/settings') ? "default" : "ghost"} 
                      className={`w-full justify-start ${collapsed ? 'px-2' : ''} ${isActivePath('/admin/settings') ? 'bg-heineken-green hover:bg-heineken-green/90' : ''}`}
                      onClick={() => navigate('/admin/settings')}
                    >
                      <Settings className="mr-2" size={18} />
                      {!collapsed && <span>Configurações</span>}
                    </Button>
                  </li>
                  <li>
                    <Button 
                      variant={isActivePath('/admin/users') ? "default" : "ghost"} 
                      className={`w-full justify-start ${collapsed ? 'px-2' : ''} ${isActivePath('/admin/users') ? 'bg-heineken-green hover:bg-heineken-green/90' : ''}`}
                      onClick={() => navigate('/admin/users')}
                    >
                      <User className="mr-2" size={18} />
                      {!collapsed && <span>Usuários</span>}
                    </Button>
                  </li>
                </>
              )}
            </ul>
          </nav>
          
          <div className="p-4 border-t">
            <Button 
              variant="ghost" 
              className={`w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50 ${collapsed ? 'px-2' : ''}`}
              onClick={handleLogout}
            >
              <LogOut className="mr-2" size={18} />
              {!collapsed && <span>Sair</span>}
            </Button>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${
        collapsed ? 'ml-16' : 'ml-64'
      }`}>
        <header className="bg-heineken-green shadow-md text-white">
          <div className="container mx-auto flex justify-between items-center p-4 relative overflow-hidden">
            <div className="absolute -right-10 top-0 bottom-0 w-48 bg-heineken-gold opacity-10 transform rotate-45"></div>
            <h1 className="text-2xl font-bold relative z-10">{title}</h1>
            <div className="flex items-center z-10">
              <span className="mr-4 text-sm hidden md:inline">
                {user?.email || 'Administrador'}
              </span>
              <div className="h-8 w-8 rounded-full bg-white text-heineken-green flex items-center justify-center font-bold shadow-md">
                {(user?.email?.charAt(0) || 'A').toUpperCase()}
              </div>
            </div>
          </div>
        </header>
        
        <main className="p-6">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
