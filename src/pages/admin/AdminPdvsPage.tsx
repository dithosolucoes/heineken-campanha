import { useState, useEffect } from 'react';
import AdminLayout from '@/components/Layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BadgeCheck, Plus, Search, Loader2 } from 'lucide-react';

// Mock data for PDVs
const mockPdvs = [
  { id: '1', name: 'Super Mercado Exemplo', cnpj: '12.345.678/0001-00', city: 'São Paulo', state: 'SP', campaigns: 2, uploads: 15, status: 'Ativo' },
  { id: '2', name: 'Mercado Central', cnpj: '98.765.432/0001-11', city: 'Rio de Janeiro', state: 'RJ', campaigns: 1, uploads: 9, status: 'Inativo' },
  { id: '3', name: 'Mercadinho do Bairro', cnpj: '11.222.333/0001-44', city: 'Salvador', state: 'BA', campaigns: 3, uploads: 22, status: 'Ativo' },
];

const statusColors = {
  'Ativo': 'bg-heineken-green text-white',
  'Inativo': 'bg-gray-400 text-white',
};

import ModalPDV from '@/components/admin/ModalPDV';
import PainelDetalhePDV from '@/components/admin/PainelDetalhePDV';

const AdminPdvsPage = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [pdvs, setPdvs] = useState([]);
  const [showNewPDV, setShowNewPDV] = useState(false);
  const [editPDV, setEditPDV] = useState<any | null>(null);
  const [detailPDV, setDetailPDV] = useState<any | null>(null);

  function handleCreatePDV(newPDV: any) {
    setPdvs((prev: any[]) => [...prev, newPDV]);
    setShowNewPDV(false);
  }

  function handleEditPDV(pdv: any) {
    setEditPDV(pdv);
  }

  function handleUpdatePDV(updated: any) {
    setPdvs((prev: any[]) => prev.map(p => p.id === updated.id ? updated : p));
    setEditPDV(null);
  }

  function handleDetailPDV(pdv: any) {
    setDetailPDV(pdv);
  }

  useEffect(() => {
    setTimeout(() => {
      setPdvs(mockPdvs);
      setLoading(false);
    }, 800);
  }, []);

  const filtered = pdvs.filter(p =>
    (status === 'all' || p.status === status) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.cnpj.includes(search))
  );

  return (
    <AdminLayout title="PDVs">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-heineken-green">PDVs</h2>
        <Button className="flex gap-2 bg-heineken-green hover:bg-heineken-green/90" onClick={() => setShowNewPDV(true)}>
          <Plus size={18} /> Novo PDV
        </Button>
      </div>

      {/* Cards-resumo no padrão dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <Card className="relative shadow-md border-0 bg-white p-0 flex flex-col items-stretch justify-between min-h-[120px]">
          <div className="absolute top-4 right-4"><BadgeCheck className="w-6 h-6 text-heineken-green" /></div>
          <CardContent className="flex flex-col items-center justify-center py-7">
            <span className="text-4xl font-bold text-heineken-green mb-1">{pdvs.length}</span>
            <span className="text-sm text-gray-500 font-medium">Total de PDVs</span>
          </CardContent>
        </Card>
        <Card className="relative shadow-md border-0 bg-white p-0 flex flex-col items-stretch justify-between min-h-[120px]">
          <div className="absolute top-4 right-4"><BadgeCheck className="w-6 h-6 text-green-600" /></div>
          <CardContent className="flex flex-col items-center justify-center py-7">
            <span className="text-4xl font-bold text-green-600 mb-1">{pdvs.filter(p => p.status === 'Ativo').length}</span>
            <span className="text-sm text-gray-500 font-medium">Ativos</span>
          </CardContent>
        </Card>
        <Card className="relative shadow-md border-0 bg-white p-0 flex flex-col items-stretch justify-between min-h-[120px]">
          <div className="absolute top-4 right-4"><BadgeCheck className="w-6 h-6 text-gray-400" /></div>
          <CardContent className="flex flex-col items-center justify-center py-7">
            <span className="text-4xl font-bold text-gray-400 mb-1">{pdvs.filter(p => p.status === 'Inativo').length}</span>
            <span className="text-sm text-gray-500 font-medium">Inativos</span>
          </CardContent>
        </Card>
        <Card className="relative shadow-md border-0 bg-white p-0 flex flex-col items-stretch justify-between min-h-[120px]">
          <div className="absolute top-4 right-4"><BadgeCheck className="w-6 h-6 text-yellow-500" /></div>
          <CardContent className="flex flex-col items-center justify-center py-7">
            <span className="text-4xl font-bold text-yellow-500 mb-1">{pdvs.reduce((acc, p) => acc + (p.campaigns || 0), 0)}</span>
            <span className="text-sm text-gray-500 font-medium">Participando</span>
          </CardContent>
        </Card>
      </div>

      {/* Filtros avançados */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Buscar PDV..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="max-w-xs"
          />
        </div>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="Ativo">Ativos</SelectItem>
            <SelectItem value="Inativo">Inativos</SelectItem>
          </SelectContent>
        </Select>
        <Button className="bg-heineken-green text-white">Filtrar</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="h-48 flex items-center justify-center text-gray-400 text-lg font-medium">[Gráfico Distribuição por Cidade/Estado]</Card>
        <Card className="h-48 flex items-center justify-center text-gray-400 text-lg font-medium">[Gráfico Ranking de Envios]</Card>
      </div>

      {/* Listagem de PDVs com CardPDV */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="text-heineken-green text-left">
              <th className="py-3 px-4">Nome</th>
              <th className="py-3 px-4">CNPJ</th>
              <th className="py-3 px-4">Cidade/UF</th>
              <th className="py-3 px-4">Campanhas</th>
              <th className="py-3 px-4">Envios</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="py-8 text-center"><Loader2 className="mx-auto animate-spin text-heineken-green" size={32} /></td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={7} className="py-8 text-center text-gray-400">Nenhum PDV encontrado</td></tr>
            ) : (
              filtered.map(p => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{p.name}</td>
                  <td className="py-3 px-4">{p.cnpj}</td>
                  <td className="py-3 px-4">{p.city}/{p.state}</td>
                  <td className="py-3 px-4">{p.campaigns}</td>
                  <td className="py-3 px-4">{p.uploads}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[p.status]}`}>{p.status}</span>
                  </td>
                  <td className="py-3 px-4 flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEditPDV(p)}>Editar</Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDetailPDV(p)}>Detalhes</Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de Novo PDV */}
      {showNewPDV && (
        <ModalPDV
          open={showNewPDV}
          onClose={() => setShowNewPDV(false)}
          onSave={handleCreatePDV}
        />
      )}
      {/* Modal de Editar PDV */}
      {editPDV && (
        <ModalPDV
          open={!!editPDV}
          onClose={() => setEditPDV(null)}
          pdv={editPDV}
          onSave={handleUpdatePDV}
        />
      )}
      {/* Modal de Detalhes PDV */}
      {detailPDV && (
        <PainelDetalhePDV
          open={!!detailPDV}
          pdv={detailPDV}
          onClose={() => setDetailPDV(null)}
        />
      )}
    </AdminLayout>
  );
};

export default AdminPdvsPage;
