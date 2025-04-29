
import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  User
} from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isSuperAdmin = user?.role === 'superadmin';

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
            {!collapsed && <h2 className="font-bold text-heineken-green">Heineken Hub</h2>}
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-1" 
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </Button>
          </div>
          
          <nav className="flex-1 py-6">
            <ul className="space-y-2">
              <li>
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start ${collapsed ? 'px-2' : ''}`}
                  onClick={() => navigate('/admin/dashboard')}
                >
                  <Home className="mr-2" size={18} />
                  {!collapsed && <span>Dashboard</span>}
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start ${collapsed ? 'px-2' : ''}`}
                  onClick={() => navigate('/admin/campaigns')}
                >
                  <FileText className="mr-2" size={18} />
                  {!collapsed && <span>Campanhas</span>}
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start ${collapsed ? 'px-2' : ''}`}
                  onClick={() => navigate('/admin/pdvs')}
                >
                  <Users className="mr-2" size={18} />
                  {!collapsed && <span>PDVs</span>}
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start ${collapsed ? 'px-2' : ''}`}
                  onClick={() => navigate('/admin/uploads')}
                >
                  <Image className="mr-2" size={18} />
                  {!collapsed && <span>Auditar Envios</span>}
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start ${collapsed ? 'px-2' : ''}`}
                  onClick={() => navigate('/admin/ranking')}
                >
                  <Flag className="mr-2" size={18} />
                  {!collapsed && <span>Ranking</span>}
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start ${collapsed ? 'px-2' : ''}`}
                  onClick={() => navigate('/admin/reports')}
                >
                  <BarChart className="mr-2" size={18} />
                  {!collapsed && <span>Relatórios</span>}
                </Button>
              </li>
              
              {isSuperAdmin && (
                <li>
                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start ${collapsed ? 'px-2' : ''}`}
                    onClick={() => navigate('/admin/settings')}
                  >
                    <Settings className="mr-2" size={18} />
                    {!collapsed && <span>Configurações</span>}
                  </Button>
                </li>
              )}
              
              {isSuperAdmin && (
                <li>
                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start ${collapsed ? 'px-2' : ''}`}
                    onClick={() => navigate('/admin/users')}
                  >
                    <User className="mr-2" size={18} />
                    {!collapsed && <span>Usuários</span>}
                  </Button>
                </li>
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
        <header className="bg-white shadow-md p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">{title}</h1>
            <div className="flex items-center">
              <span className="mr-4 text-sm hidden md:inline">
                {user?.email || 'Administrador'}
              </span>
              <div className="h-8 w-8 rounded-full bg-heineken-green text-white flex items-center justify-center">
                {(user?.email?.charAt(0) || 'A').toUpperCase()}
              </div>
            </div>
          </div>
        </header>
        
        <main className="p-4">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
