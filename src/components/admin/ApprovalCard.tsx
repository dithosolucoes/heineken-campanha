
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PhotoUpload } from '@/types/types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Check, X, Maximize } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { uploadCategories } from '@/utils/mockData';

interface ApprovalCardProps {
  upload: PhotoUpload;
  onApprove: (id: string, feedback: string) => void;
  onReject: (id: string, feedback: string) => void;
}

const ApprovalCard = ({ upload, onApprove, onReject }: ApprovalCardProps) => {
  const [feedback, setFeedback] = useState('');
  const [isFullImage, setIsFullImage] = useState(false);
  const { toast } = useToast();
  
  const getCategoryLabel = (categoryValue: string) => {
    return uploadCategories.find(cat => cat.value === categoryValue)?.label || categoryValue;
  };
  
  const formatDate = (date: Date) => {
    return format(new Date(date), "d 'de' MMM, yyyy 'às' HH:mm", { locale: ptBR });
  };
  
  const handleApprove = () => {
    onApprove(upload.id, feedback);
    toast({
      title: "Foto aprovada",
      description: "A foto foi aprovada com sucesso.",
    });
  };
  
  const handleReject = () => {
    if (!feedback.trim()) {
      toast({
        title: "Feedback necessário",
        description: "Por favor, forneça um feedback para reprovação.",
        variant: "destructive",
      });
      return;
    }
    
    onReject(upload.id, feedback);
    toast({
      title: "Foto reprovada",
      description: "A foto foi reprovada.",
      variant: "destructive",
    });
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{upload.pdvName || 'PDV'}</CardTitle>
          <Badge>{getCategoryLabel(upload.category)}</Badge>
        </div>
        <p className="text-sm text-gray-500">{formatDate(upload.createdAt)}</p>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative">
          <img 
            src={upload.photoUrl} 
            alt="Upload" 
            className="w-full h-64 object-cover"
          />
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute bottom-2 right-2 bg-white rounded-full" 
            onClick={() => setIsFullImage(true)}
          >
            <Maximize size={16} />
          </Button>
        </div>
        
        {upload.observation && (
          <div className="p-4">
            <p className="text-sm font-medium">Observação:</p>
            <p className="text-sm">{upload.observation}</p>
          </div>
        )}
        
        <div className="p-4">
          <Textarea
            placeholder="Adicione um feedback..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="resize-none"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600" 
          onClick={handleReject}
        >
          <X size={16} className="mr-2" />
          Reprovar
        </Button>
        <Button 
          className="bg-heineken-green hover:bg-heineken-green/90" 
          onClick={handleApprove}
        >
          <Check size={16} className="mr-2" />
          Aprovar
        </Button>
      </CardFooter>
      
      {/* Full Image Dialog */}
      <Dialog open={isFullImage} onOpenChange={(open) => setIsFullImage(open)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Foto em tamanho completo</DialogTitle>
          </DialogHeader>
          <div className="overflow-hidden">
            <img 
              src={upload.photoUrl} 
              alt="Upload" 
              className="w-full h-auto object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ApprovalCard;
