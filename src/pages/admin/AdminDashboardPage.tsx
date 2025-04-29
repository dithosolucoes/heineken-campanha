
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/Layout/AdminLayout';
import StatCard from '@/components/admin/StatCard';
import StatusChart from '@/components/admin/StatusChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockDashboardStats, mockUploads } from '@/utils/mockData';
import { DashboardStats } from '@/types/types';
import { 
  FileText, 
  Users, 
  Image, 
  CheckCircle, 
  XCircle, 
  Clock,
  BarChart,
  ArrowRight,
} from 'lucide-react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setStats(mockDashboardStats);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Mock data for the recent activity chart
  const recentActivityData = [
    { name: 'Seg', uploads: 18, approved: 12 },
    { name: 'Ter', uploads: 25, approved: 20 },
    { name: 'Qua', uploads: 15, approved: 10 },
    { name: 'Qui', uploads: 30, approved: 22 },
    { name: 'Sex', uploads: 22, approved: 17 },
    { name: 'Sáb', uploads: 10, approved: 8 },
    { name: 'Dom', uploads: 5, approved: 3 }
  ];

  if (isLoading) {
    return (
      <AdminLayout title="Dashboard">
        <div className="animate-pulse space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg h-32" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg h-80" />
            <div className="bg-white rounded-lg h-80" />
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Campanhas Ativas" 
            value={stats?.totalCampaigns || 0} 
            icon={FileText}
            color="bg-heineken-green" 
          />
          <StatCard 
            title="PDVs Participantes" 
            value={stats?.totalPdvs || 0} 
            icon={Users}
            color="bg-heineken-gold" 
          />
          <StatCard 
            title="Total de Envios" 
            value={stats?.totalUploads || 0} 
            icon={Image}
            color="bg-blue-500" 
          />
          <StatCard 
            title="Taxa de Aprovação" 
            value={`${Math.round((stats?.approvedUploads || 0) / (stats?.totalUploads || 1) * 100)}%`} 
            icon={CheckCircle}
            color="bg-green-600" 
            change={5} 
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left chart - Status pie chart */}
          <StatusChart 
            approved={stats?.approvedUploads || 0}
            rejected={stats?.rejectedUploads || 0}
            pending={stats?.pendingUploads || 0}
          />
          
          {/* Right chart - Recent activity */}
          <Card>
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
            </CardHeader>
            <CardContent className="px-2">
              <ResponsiveContainer width="100%" height={240}>
                <RechartsBarChart
                  data={recentActivityData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="uploads" name="Total de Envios" fill="#00843d" />
                  <Bar dataKey="approved" name="Aprovados" fill="#d4af37" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent submissions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Envios Recentes</CardTitle>
            <Button 
              variant="outline"
              size="sm"
              onClick={() => window.location.href = '/admin/uploads'}
            >
              Ver Todos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-5 bg-muted/50 p-3 text-sm font-medium">
                <div>PDV</div>
                <div>Categoria</div>
                <div>Data</div>
                <div>Status</div>
                <div>Ação</div>
              </div>
              {mockUploads.slice(0, 5).map((upload, index) => (
                <div key={upload.id} className={`grid grid-cols-5 p-3 text-sm ${
                  index !== mockUploads.length - 1 && 'border-b'
                }`}>
                  <div className="font-medium">{upload.pdvName}</div>
                  <div>{upload.category.replace('_', ' ')}</div>
                  <div>{new Date(upload.createdAt).toLocaleDateString()}</div>
                  <div>
                    <div className="flex items-center">
                      {upload.status.status === 'approved' ? (
                        <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                      ) : upload.status.status === 'rejected' ? (
                        <XCircle className="mr-2 h-4 w-4 text-red-600" />
                      ) : (
                        <Clock className="mr-2 h-4 w-4 text-yellow-600" />
                      )}
                      {upload.status.status.charAt(0).toUpperCase() + upload.status.status.slice(1)}
                    </div>
                  </div>
                  <div>
                    <Button 
                      size="sm"
                      onClick={() => window.location.href = `/admin/uploads/${upload.id}`}
                    >
                      Revisar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
