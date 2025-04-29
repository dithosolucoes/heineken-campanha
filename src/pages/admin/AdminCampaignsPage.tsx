import { useState, useEffect } from 'react';
import AdminLayout from '@/components/Layout/AdminLayout';
import CampaignSummaryCard from '@/components/admin/CampaignSummaryCard';
import CampaignDetailPanel from '@/components/admin/CampaignDetailPanel';
import CampaignWizard from '@/components/admin/CampaignWizard';
import CampaignCard from '@/components/admin/CampaignCard';
import CampaignDashboardCharts from '@/components/admin/CampaignDashboardCharts';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Plus, Loader2, Search, Users, UploadCloud, CheckCircle2, XCircle, Clock } from 'lucide-react';

// Mock data for Campanhas
interface Campaign {
  id: string;
  name: string;
  description: string;
  start: string;
  end: string;
  status: string;
  pdvs: number;
  uploads: number;
  rules?: string[];
}

const initialCampaigns: Campaign[] = [
  { id: 'c1', name: 'Verão Heineken', description: 'Campanha de verão', start: '2024-12-01', end: '2025-01-31', status: 'Ativa', pdvs: 4, uploads: 15, rules: ['Regra 1', 'Regra 2'] },
  { id: 'c2', name: 'Carnaval Verde', description: 'Campanha de carnaval', start: '2025-02-15', end: '2025-02-28', status: 'Agendada', pdvs: 2, uploads: 5, rules: ['Regra 1'] },
  { id: 'c3', name: 'Futebol e Churrasco', description: 'Campanha futebol', start: '2025-03-10', end: '2025-04-10', status: 'Encerrada', pdvs: 5, uploads: 22, rules: ['Regra 1', 'Regra 2', 'Regra 3'] },
];

const statusColors = {
  'Ativa': 'bg-heineken-green text-white',
  'Agendada': 'bg-yellow-400 text-white',
  'Encerrada': 'bg-gray-400 text-white',
};

const AdminCampaignsPage = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [loading, setLoading] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardEdit, setWizardEdit] = useState<Campaign | null>(null);

  // Adicionar/editar campanha
  const handleSaveCampaign = (data: Campaign) => {
    if (data.id) {
      // Editar existente
      setCampaigns(prev => prev.map(c => c.id === data.id ? { ...c, ...data } : c));
    } else {
      // Nova campanha
      const newCampaign: Campaign = { ...data, id: `c${Date.now()}`, status: 'Ativa', pdvs: 0, uploads: 0 };
      setCampaigns(prev => [newCampaign, ...prev]);
    }
  };

  // Encerrar campanha
  const handleCloseCampaign = (id: string) => {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, status: 'Encerrada' } : c));
    setSelectedCampaign((c) => c && c.id === id ? { ...c, status: 'Encerrada' } : c);
  };

  // Duplicar campanha
  const handleDuplicateCampaign = (c: Campaign) => {
    const copy: Campaign = { ...c, id: `c${Date.now()}`, name: `${c.name} (Cópia)`, status: 'Agendada' };
    setCampaigns(prev => [copy, ...prev]);
  };

  // Excluir campanha
  const handleDeleteCampaign = (id: string) => {
    setCampaigns(prev => prev.filter(c => c.id !== id));
    setDetailOpen(false);
  };


  // Cards summary
  const total = campaigns.length;
  const ativas = campaigns.filter(c => c.status === 'Ativa').length;
  const encerradas = campaigns.filter(c => c.status === 'Encerrada').length;
  const agendadas = campaigns.filter(c => c.status === 'Agendada').length;

  const filtered = campaigns.filter(c =>
    (status === 'all' || c.status === status) &&
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout title="Campanhas">
      {/* Cards-resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5 mb-8">
        <CampaignSummaryCard title="Total" value={total} icon={<Calendar />} color="bg-white" />
        <CampaignSummaryCard title="Ativas" value={ativas} icon={<CheckCircle2 />} color="bg-heineken-green/90 text-white" />
        <CampaignSummaryCard title="Agendadas" value={agendadas} icon={<Clock />} color="bg-yellow-400/90 text-white" />
        <CampaignSummaryCard title="Encerradas" value={encerradas} icon={<XCircle />} color="bg-gray-400/90 text-white" />
        <CampaignSummaryCard title="Expirando" value={0} icon={<Clock />} color="bg-orange-400/90 text-white" />
      </div>

      {/* Gráficos de dashboard */}
      <CampaignDashboardCharts />

      {/* Filtros avançados */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        <Input
          placeholder="Buscar campanha..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="Ativa">Ativas</SelectItem>
            <SelectItem value="Agendada">Agendadas</SelectItem>
            <SelectItem value="Encerrada">Encerradas</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="ghost" onClick={() => { setSearch(''); setStatus('all'); }}>Limpar Filtros</Button>
        <div className="flex-1" />
        <Button className="flex gap-2 bg-heineken-green hover:bg-heineken-green/90" onClick={() => { setWizardEdit(null); setWizardOpen(true); }}>
          <Plus size={18} /> Nova Campanha
        </Button>
      </div>

      {/* Cards de campanhas */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {loading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="h-56 bg-gray-100 rounded-lg animate-pulse" />
          ))
        ) : filtered.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 py-12">Nenhuma campanha encontrada</div>
        ) : (
          filtered.map(c => (
            <CampaignCard
              key={c.id}
              campaign={c}
              onDetail={c => { setSelectedCampaign(c); setDetailOpen(true); }}
              onEdit={c => { setWizardEdit(c); setWizardOpen(true); }}
              onClose={c => handleCloseCampaign(c.id)}
            />
          ))
        )}
      </div>

      {/* Painel detalhado da campanha */}
      <CampaignDetailPanel
        open={detailOpen}
        onOpenChange={setDetailOpen}
        campaign={selectedCampaign}
        onEdit={c => { setDetailOpen(false); setWizardEdit(c); setWizardOpen(true); }}
        onClose={c => handleCloseCampaign(c.id)}
        onDuplicate={handleDuplicateCampaign}
        onDelete={handleDeleteCampaign}
      />
      {/* Wizard de criação/edição de campanha */}
      <CampaignWizard
        open={wizardOpen}
        onOpenChange={setWizardOpen}
        campaign={wizardEdit}
        onSubmit={handleSaveCampaign}
      />
    </AdminLayout>
  );
};

export default AdminCampaignsPage;
