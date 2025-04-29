
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/Layout/AdminLayout';
import ApprovalCard from '@/components/admin/ApprovalCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { mockUploads } from '@/utils/mockData';
import { PhotoUpload } from '@/types/types';
import { Loader2, Search, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminUploadsPage = () => {
  const [uploads, setUploads] = useState<PhotoUpload[]>([]);
  const [filteredUploads, setFilteredUploads] = useState<PhotoUpload[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setUploads(mockUploads);
      setFilteredUploads(mockUploads);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let result = [...uploads];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(upload => upload.status.status === statusFilter);
    }
    
    // Apply search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        upload => 
          upload.pdvName?.toLowerCase().includes(searchLower) ||
          upload.category.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredUploads(result);
  }, [statusFilter, searchTerm, uploads]);

  const handleApprove = (id: string, feedback: string) => {
    setUploads(prevUploads => 
      prevUploads.map(upload => 
        upload.id === id 
          ? { ...upload, status: { status: 'approved', feedback } } 
          : upload
      )
    );
  };

  const handleReject = (id: string, feedback: string) => {
    setUploads(prevUploads => 
      prevUploads.map(upload => 
        upload.id === id 
          ? { ...upload, status: { status: 'rejected', feedback } } 
          : upload
      )
    );
  };

  const pendingUploads = filteredUploads.filter(upload => upload.status.status === 'pending');
  const processedUploads = filteredUploads.filter(upload => upload.status.status !== 'pending');

  if (isLoading) {
    return (
      <AdminLayout title="Auditar Envios">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-heineken-green" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Auditar Envios">
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Buscar por PDV ou categoria..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-48">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <div className="flex items-center">
                  <Filter size={18} className="mr-2 text-gray-400" />
                  <SelectValue placeholder="Status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="approved">Aprovados</SelectItem>
                <SelectItem value="rejected">Reprovados</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button 
            variant="outline"
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
            }}
          >
            Limpar Filtros
          </Button>
        </div>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="pending">
            Pendentes ({pendingUploads.length})
          </TabsTrigger>
          <TabsTrigger value="processed">
            Processados ({processedUploads.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending">
          {pendingUploads.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {pendingUploads.map(upload => (
                <ApprovalCard 
                  key={upload.id}
                  upload={upload}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              ))}
            </div>
          ) : (
            <div className="text-center p-12 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-medium text-gray-500">Não há envios pendentes</h3>
              {statusFilter !== 'all' || searchTerm ? (
                <p className="mt-2 text-gray-400">Tente remover os filtros para ver mais resultados</p>
              ) : (
                <p className="mt-2 text-gray-400">Todos os envios foram processados</p>
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="processed">
          {processedUploads.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {processedUploads.map(upload => (
                <ApprovalCard 
                  key={upload.id}
                  upload={upload}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              ))}
            </div>
          ) : (
            <div className="text-center p-12 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-medium text-gray-500">Não há envios processados</h3>
              {statusFilter !== 'all' || searchTerm ? (
                <p className="mt-2 text-gray-400">Tente remover os filtros para ver mais resultados</p>
              ) : null}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminUploadsPage;
