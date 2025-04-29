
import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PDVLayout from '@/components/Layout/PDVLayout';
import FileUploader from '@/components/pdv/FileUploader';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { mockCampaigns, uploadCategories } from '@/utils/mockData';
import { Campaign, UploadCategory } from '@/types/types';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const PDVUploadPage = () => {
  const { campaignId } = useParams<{ campaignId: string }>();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [category, setCategory] = useState<UploadCategory | ''>('');
  const [observation, setObservation] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API fetch
    setIsLoading(true);
    const timer = setTimeout(() => {
      const foundCampaign = mockCampaigns.find(c => c.id === campaignId);
      setCampaign(foundCampaign || null);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [campaignId]);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast({
        title: "Imagem necessária",
        description: "Por favor, selecione uma imagem para enviar.",
        variant: "destructive",
      });
      return;
    }
    
    if (!category) {
      toast({
        title: "Categoria necessária",
        description: "Por favor, selecione uma categoria.",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate upload
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Envio realizado com sucesso!",
        description: "Sua foto foi enviada e está aguardando análise.",
      });
      navigate('/pdv/history');
    }, 2000);
  };

  if (isLoading) {
    return (
      <PDVLayout title="Enviar Foto">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-heineken-green" />
        </div>
      </PDVLayout>
    );
  }

  if (!campaign) {
    return (
      <PDVLayout title="Enviar Foto">
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-500">Campanha não encontrada</h3>
          <Button 
            variant="link" 
            className="mt-4"
            onClick={() => navigate('/pdv/campaigns')}
          >
            Voltar para Campanhas
          </Button>
        </div>
      </PDVLayout>
    );
  }

  return (
    <PDVLayout title="Enviar Foto">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">Campanha: {campaign.name}</h3>
          <p className="text-gray-500">{campaign.rules}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select
              value={category}
              onValueChange={(value) => setCategory(value as UploadCategory)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {uploadCategories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Foto</Label>
            <FileUploader 
              onFileSelect={handleFileSelect}
              selectedFile={selectedFile}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="observation">Observação (opcional)</Label>
            <Textarea
              id="observation"
              placeholder="Descreva detalhes sobre a ativação..."
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="flex justify-end pt-4">
            <Button 
              type="button" 
              variant="outline" 
              className="mr-2"
              onClick={() => navigate('/pdv/campaigns')}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button 
              type="submit"
              disabled={!selectedFile || !category || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : "Enviar Foto"}
            </Button>
          </div>
        </form>
      </div>
    </PDVLayout>
  );
};

export default PDVUploadPage;
