
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Campaign } from '@/types/types';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface CampaignCardProps {
  campaign: Campaign;
}

const CampaignCard = ({ campaign }: CampaignCardProps) => {
  const navigate = useNavigate();

  const formatDate = (date: Date) => {
    return format(new Date(date), "d 'de' MMMM 'de' yyyy", { locale: ptBR });
  };
  
  const isActive = campaign.status === 'active';

  return (
    <Card className="overflow-hidden card-hover">
      <div className={`h-2 ${isActive ? 'bg-heineken-green' : 'bg-gray-400'}`} />
      <CardHeader>
        <CardTitle>{campaign.name}</CardTitle>
        <CardDescription>
          {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 line-clamp-3">{campaign.rules}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => navigate(`/pdv/rules/${campaign.id}`)}
        >
          Ver Regras
        </Button>
        <Button 
          onClick={() => navigate(`/pdv/upload/${campaign.id}`)}
          disabled={!isActive}
        >
          {isActive ? 'Enviar Foto' : 'Encerrada'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CampaignCard;
