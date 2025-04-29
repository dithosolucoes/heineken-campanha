
import { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PhotoUpload } from '@/types/types';
import { uploadCategories } from '@/utils/mockData';

interface UploadHistoryProps {
  uploads: PhotoUpload[];
}

const UploadHistory = ({ uploads }: UploadHistoryProps) => {
  const [selectedUpload, setSelectedUpload] = useState<PhotoUpload | null>(null);

  const getCategoryLabel = (categoryValue: string) => {
    return uploadCategories.find(cat => cat.value === categoryValue)?.label || categoryValue;
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'approved':
        return <Badge className="bg-green-600">Aprovado</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Reprovado</Badge>;
      case 'pending':
      default:
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Pendente</Badge>;
    }
  };

  const formatDate = (date: Date) => {
    return format(new Date(date), "d 'de' MMM, yyyy 'às' HH:mm", { locale: ptBR });
  };

  return (
    <div>
      {uploads.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-gray-500">Você ainda não enviou nenhuma foto.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {uploads.map((upload) => (
            <Card key={upload.id} className="overflow-hidden">
              <div className={`h-1 ${
                upload.status.status === 'approved' ? 'bg-green-500' : 
                upload.status.status === 'rejected' ? 'bg-red-500' : 
                'bg-yellow-500'
              }`} />
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="text-lg">{getCategoryLabel(upload.category)}</CardTitle>
                  {getStatusBadge(upload.status.status)}
                </div>
                <CardDescription>{formatDate(upload.createdAt)}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                {upload.observation && (
                  <p className="text-sm text-gray-500 mb-2">{upload.observation}</p>
                )}
                {upload.status.feedback && (
                  <div className="border-l-4 border-heineken-green p-2 bg-heineken-green/10 mt-2">
                    <p className="text-sm italic">{upload.status.feedback}</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedUpload(upload)}
                >
                  Ver Detalhes
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      {/* Photo Detail Dialog */}
      <Dialog open={!!selectedUpload} onOpenChange={(open) => !open && setSelectedUpload(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Detalhes da Foto</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {selectedUpload && (
              <>
                <div className="rounded-md overflow-hidden">
                  <img 
                    src={selectedUpload.photoUrl} 
                    alt="Upload" 
                    className="w-full h-auto object-cover"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Categoria</p>
                    <p>{getCategoryLabel(selectedUpload.category)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Data</p>
                    <p>{formatDate(selectedUpload.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <p>{getStatusBadge(selectedUpload.status.status)}</p>
                  </div>
                </div>
                
                {selectedUpload.observation && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Observação</p>
                    <p>{selectedUpload.observation}</p>
                  </div>
                )}
                
                {selectedUpload.status.feedback && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Feedback</p>
                    <div className="border-l-4 border-heineken-green p-2 bg-heineken-green/10">
                      <p className="text-sm italic">{selectedUpload.status.feedback}</p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadHistory;
