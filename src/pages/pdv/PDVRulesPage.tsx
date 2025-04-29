
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PDVLayout from '@/components/Layout/PDVLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { mockCampaigns } from '@/utils/mockData';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Loader2, ArrowLeft, Calendar, Check, X } from 'lucide-react';

const PDVRulesPage = () => {
  const { campaignId } = useParams<{ campaignId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [campaign, setCampaign] = useState(campaignId ? null : mockCampaigns[0]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!campaignId) {
      // If no campaign ID is specified, use the first active campaign
      const activeOne = mockCampaigns.find(c => c.status === 'active');
      setCampaign(activeOne || mockCampaigns[0]);
      setIsLoading(false);
      return;
    }
    
    // Simulate API fetch
    setIsLoading(true);
    const timer = setTimeout(() => {
      const foundCampaign = mockCampaigns.find(c => c.id === campaignId);
      setCampaign(foundCampaign || null);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [campaignId]);

  const formatDate = (date: Date) => {
    return format(new Date(date), "d 'de' MMMM 'de' yyyy", { locale: ptBR });
  };

  if (isLoading) {
    return (
      <PDVLayout title="Regras da Campanha">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-heineken-green" />
        </div>
      </PDVLayout>
    );
  }

  if (!campaign) {
    return (
      <PDVLayout title="Regras da Campanha">
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
    <PDVLayout title="Regras da Campanha">
      <div className="max-w-3xl mx-auto">
        <Button 
          variant="outline" 
          className="mb-6"
          onClick={() => navigate('/pdv/campaigns')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para campanhas
        </Button>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{campaign.name}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <Calendar className="mr-2 h-4 w-4" />
              {formatDate(campaign.startDate)} até {formatDate(campaign.endDate)}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Sobre a Campanha</h3>
              <p>{campaign.rules}</p>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium mb-2">Diretrizes Gerais</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-heineken-green mr-2 mt-0.5" />
                  <span>As fotos devem ser tiradas com boa iluminação e nitidez</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-heineken-green mr-2 mt-0.5" />
                  <span>Certifique-se que o material promocional esteja completo conforme o kit enviado</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-heineken-green mr-2 mt-0.5" />
                  <span>A marca Heineken deve estar bem visível na exposição</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-heineken-green mr-2 mt-0.5" />
                  <span>Os produtos devem estar organizados e alinhados</span>
                </li>
                <li className="flex items-start">
                  <X className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                  <span>Evite incluir pessoas ou clientes nas fotos</span>
                </li>
                <li className="flex items-start">
                  <X className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                  <span>Não posicione próximo a produtos de outras marcas de cerveja</span>
                </li>
              </ul>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium mb-2">Categorias para Upload</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="font-medium">Check Stand</p>
                  <p className="text-sm text-gray-500">Materiais promocionais próximos ao caixa</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">Cooler</p>
                  <p className="text-sm text-gray-500">Refrigeradores e freezers personalizados</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">Ilha Promocional</p>
                  <p className="text-sm text-gray-500">Displays isolados nos corredores</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">Prateleira</p>
                  <p className="text-sm text-gray-500">Organização na gondola principal</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">Vitrine/Janela</p>
                  <p className="text-sm text-gray-500">Adesivação de vitrines e janelas</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">Outro</p>
                  <p className="text-sm text-gray-500">Outras categorias de exposição</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Button 
                onClick={() => navigate(`/pdv/upload/${campaign.id}`)}
                disabled={campaign.status !== 'active'}
              >
                {campaign.status === 'active' 
                  ? 'Enviar Foto para esta Campanha' 
                  : 'Campanha Encerrada'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PDVLayout>
  );
};

export default PDVRulesPage;
