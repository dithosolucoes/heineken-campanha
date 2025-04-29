
import { useState, useEffect } from 'react';
import PDVLayout from '@/components/Layout/PDVLayout';
import UploadHistory from '@/components/pdv/UploadHistory';
import { mockUploads } from '@/utils/mockData';
import { PhotoUpload } from '@/types/types';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';

const PDVHistoryPage = () => {
  const [uploads, setUploads] = useState<PhotoUpload[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      // In a real app, would filter by user's PDV
      setUploads(mockUploads);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [user]);

  const pendingUploads = uploads.filter(upload => upload.status.status === 'pending');
  const approvedUploads = uploads.filter(upload => upload.status.status === 'approved');
  const rejectedUploads = uploads.filter(upload => upload.status.status === 'rejected');

  if (isLoading) {
    return (
      <PDVLayout title="Histórico de Envios">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-heineken-green" />
        </div>
      </PDVLayout>
    );
  }

  return (
    <PDVLayout title="Histórico de Envios">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="pending">Pendentes</TabsTrigger>
          <TabsTrigger value="approved">Aprovados</TabsTrigger>
          <TabsTrigger value="rejected">Reprovados</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <UploadHistory uploads={uploads} />
        </TabsContent>
        
        <TabsContent value="pending">
          <UploadHistory uploads={pendingUploads} />
        </TabsContent>
        
        <TabsContent value="approved">
          <UploadHistory uploads={approvedUploads} />
        </TabsContent>
        
        <TabsContent value="rejected">
          <UploadHistory uploads={rejectedUploads} />
        </TabsContent>
      </Tabs>
    </PDVLayout>
  );
};

export default PDVHistoryPage;
