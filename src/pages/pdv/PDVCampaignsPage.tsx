
import { useState, useEffect } from 'react';
import PDVLayout from '@/components/Layout/PDVLayout';
import CampaignCard from '@/components/pdv/CampaignCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockCampaigns } from '@/utils/mockData';
import { Campaign } from '@/types/types';
import { useAuth } from '@/context/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';

const PDVCampaignsPage = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // Simulate API fetch with delay
    const timer = setTimeout(() => {
      // In a real app, you would filter campaigns by PDV/CNPJ
      setCampaigns(mockCampaigns);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [user]);

  const activeCampaigns = campaigns.filter(campaign => campaign.status === 'active');
  const inactiveCampaigns = campaigns.filter(campaign => campaign.status !== 'active');

  return (
    <PDVLayout title="Campanhas">
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="active">Ativas</TabsTrigger>
          <TabsTrigger value="inactive">Encerradas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-48 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : activeCampaigns.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeCampaigns.map(campaign => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-500">Não há campanhas ativas no momento</h3>
              <p className="mt-2 text-gray-400">Aguarde novas campanhas em breve</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="inactive">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-48 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : inactiveCampaigns.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inactiveCampaigns.map(campaign => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-500">Não há campanhas encerradas</h3>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </PDVLayout>
  );
};

export default PDVCampaignsPage;
