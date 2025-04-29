
import { Campaign, PDV, PhotoUpload, DashboardStats } from '@/types/types';

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Verão 2025 - Heineken Puro Malte',
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-03-31'),
    rules: 'Ponto extra deve estar posicionado na entrada principal da loja. Utilize os materiais promocionais fornecidos no kit.',
    status: 'active',
    pdvIds: ['1', '2', '3']
  },
  {
    id: '2',
    name: 'Heineken Silver - Lançamento',
    startDate: new Date('2025-02-15'),
    endDate: new Date('2025-05-15'),
    rules: 'Coolers devem estar em área de alto fluxo. Comunique "Novo Heineken Silver - Mais Refrescante".',
    status: 'active',
    pdvIds: ['1', '4']
  },
  {
    id: '3',
    name: 'Copa do Mundo 2025 - Displays',
    startDate: new Date('2025-06-01'),
    endDate: new Date('2025-07-30'),
    rules: 'Monte displays em formato de troféu ou estádio com as garrafas. Use os materiais temáticos de Copa.',
    status: 'inactive',
    pdvIds: ['2', '3', '5']
  }
];

export const mockPdvs: PDV[] = [
  {
    id: '1',
    name: 'Supermercado Central',
    cnpj: '12345678000190',
    city: 'São Paulo',
    state: 'SP',
    campaignIds: ['1', '2']
  },
  {
    id: '2',
    name: 'Mercado Boa Vista',
    cnpj: '23456789000123',
    city: 'Rio de Janeiro',
    state: 'RJ',
    campaignIds: ['1', '3']
  },
  {
    id: '3',
    name: 'Adega do Zé',
    cnpj: '34567890000156',
    city: 'Belo Horizonte',
    state: 'MG',
    campaignIds: ['1', '3']
  },
  {
    id: '4',
    name: 'Bar do Chico',
    cnpj: '45678901000189',
    city: 'Salvador',
    state: 'BA',
    campaignIds: ['2']
  },
  {
    id: '5',
    name: 'Empório São José',
    cnpj: '56789012000112',
    city: 'Fortaleza',
    state: 'CE',
    campaignIds: ['3']
  }
];

export const mockUploads: PhotoUpload[] = [
  {
    id: '1',
    pdvId: '1',
    pdvName: 'Supermercado Central',
    campaignId: '1',
    category: 'island',
    photoUrl: '/placeholder.svg',
    observation: 'Ilha promocional montada na entrada da loja',
    createdAt: new Date('2025-01-10'),
    status: { status: 'approved', feedback: 'Excelente posicionamento!' }
  },
  {
    id: '2',
    pdvId: '1',
    pdvName: 'Supermercado Central',
    campaignId: '2',
    category: 'cooler',
    photoUrl: '/placeholder.svg',
    observation: 'Cooler posicionado no corredor central',
    createdAt: new Date('2025-02-20'),
    status: { status: 'pending' }
  },
  {
    id: '3',
    pdvId: '2',
    pdvName: 'Mercado Boa Vista',
    campaignId: '1',
    category: 'check_stand',
    photoUrl: '/placeholder.svg',
    observation: 'Material no checkout',
    createdAt: new Date('2025-01-15'),
    status: { status: 'rejected', feedback: 'Material está danificado, favor substituir.' }
  },
  {
    id: '4',
    pdvId: '3',
    pdvName: 'Adega do Zé',
    campaignId: '1',
    category: 'window',
    photoUrl: '/placeholder.svg',
    observation: 'Adesivação na vitrine principal',
    createdAt: new Date('2025-01-18'),
    status: { status: 'approved', feedback: 'Perfeito!' }
  },
  {
    id: '5',
    pdvId: '4',
    pdvName: 'Bar do Chico',
    campaignId: '2',
    category: 'shelf',
    photoUrl: '/placeholder.svg',
    observation: 'Produto exposto com destaque',
    createdAt: new Date('2025-02-25'),
    status: { status: 'pending' }
  }
];

export const mockDashboardStats: DashboardStats = {
  totalCampaigns: 3,
  totalPdvs: 5,
  totalUploads: 5,
  approvedUploads: 2,
  rejectedUploads: 1,
  pendingUploads: 2
};

export const uploadCategories = [
  { value: 'check_stand', label: 'Check Stand' },
  { value: 'cooler', label: 'Cooler' },
  { value: 'island', label: 'Ilha Promocional' },
  { value: 'shelf', label: 'Prateleira' },
  { value: 'window', label: 'Vitrine/Janela' },
  { value: 'other', label: 'Outro' }
];
