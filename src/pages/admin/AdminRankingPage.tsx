
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/Layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Loader2, Search, Filter, Trophy, Award, Medal } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

// Mock data for ranking
const mockRankingData = [
  { 
    id: 1, 
    name: 'Super Mercado Exemplo', 
    city: 'São Paulo', 
    points: 980, 
    approved: 42,
    rejected: 3,
    completion: 98,
  },
  { 
    id: 2, 
    name: 'Mercado Central', 
    city: 'Rio de Janeiro', 
    points: 910, 
    approved: 39,
    rejected: 5,
    completion: 92,
  },
  { 
    id: 3, 
    name: 'Supermercado Economia', 
    city: 'Belo Horizonte', 
    points: 850, 
    approved: 36,
    rejected: 2,
    completion: 95,
  },
  { 
    id: 4, 
    name: 'Mercadinho do Bairro', 
    city: 'Salvador', 
    points: 780, 
    approved: 33,
    rejected: 8,
    completion: 88,
  },
  { 
    id: 5, 
    name: 'Atacadão Preço Baixo', 
    city: 'Brasília', 
    points: 720, 
    approved: 31,
    rejected: 4,
    completion: 91,
  },
  { 
    id: 6, 
    name: 'Supermercado Vizinho', 
    city: 'Curitiba', 
    points: 650, 
    approved: 28,
    rejected: 6,
    completion: 85,
  },
  { 
    id: 7, 
    name: 'Mercado São José', 
    city: 'Recife', 
    points: 580, 
    approved: 25,
    rejected: 5,
    completion: 83,
  },
  { 
    id: 8, 
    name: 'Supermarket Express', 
    city: 'Porto Alegre', 
    points: 520, 
    approved: 22,
    rejected: 3,
    completion: 86,
  },
  { 
    id: 9, 
    name: 'Mercado Família', 
    city: 'Fortaleza', 
    points: 480, 
    approved: 20,
    rejected: 5,
    completion: 80,
  },
  { 
    id: 10, 
    name: 'Mini Mercado Praça', 
    city: 'Manaus', 
    points: 420, 
    approved: 18,
    rejected: 6,
    completion: 75,
  },
  { 
    id: 11, 
    name: 'Super Economia', 
    city: 'Goiânia', 
    points: 380, 
    approved: 16,
    rejected: 4,
    completion: 77,
  },
  { 
    id: 12, 
    name: 'Mercado Popular', 
    city: 'Belém', 
    points: 320, 
    approved: 14,
    rejected: 7,
    completion: 60,
  },
];

const chartData = [
  { pdv: 'Super Mercado Exemplo', points: 980, completion: 98 },
  { pdv: 'Mercado Central', points: 910, completion: 92 },
  { pdv: 'Supermercado Economia', points: 850, completion: 95 },
  { pdv: 'Mercadinho do Bairro', points: 780, completion: 88 },
  { pdv: 'Atacadão Preço Baixo', points: 720, completion: 91 },
];

const AdminRankingPage = () => {
  const [rankingData, setRankingData] = useState<typeof mockRankingData>([]);
  const [filteredData, setFilteredData] = useState<typeof mockRankingData>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('points');
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setRankingData(mockRankingData);
      setFilteredData(mockRankingData);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let result = [...rankingData];
    
    // Apply city filter
    if (cityFilter !== 'all') {
      result = result.filter(item => item.city === cityFilter);
    }
    
    // Apply search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        item => item.name.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply sorting
    if (sortBy === 'points') {
      result = result.sort((a, b) => b.points - a.points);
    } else if (sortBy === 'approved') {
      result = result.sort((a, b) => b.approved - a.approved);
    } else if (sortBy === 'completion') {
      result = result.sort((a, b) => b.completion - a.completion);
    }
    
    setFilteredData(result);
  }, [cityFilter, searchTerm, sortBy, rankingData]);

  // Get unique cities for filter
  const cities = Array.from(new Set(rankingData.map(item => item.city)));

  const exportRanking = () => {
    toast({
      title: "Exportação iniciada",
      description: "O relatório de ranking será enviado para seu email."
    });
  };

  if (isLoading) {
    return (
      <AdminLayout title="Ranking">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-heineken-green" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Ranking de PDVs">
      <div className="space-y-6">
        {/* Top 3 PDVs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredData.slice(0, 3).map((pdv, index) => (
            <Card key={pdv.id} className={`
              overflow-hidden
              ${index === 0 ? 'border-heineken-gold border-2 bg-gradient-to-br from-white to-yellow-50' : ''}
              ${index === 1 ? 'border-gray-300 border-2 bg-gradient-to-br from-white to-gray-50' : ''}
              ${index === 2 ? 'border-amber-600 border-2 bg-gradient-to-br from-white to-amber-50' : ''}
            `}>
              <div className={`
                h-2 w-full
                ${index === 0 ? 'bg-heineken-gold' : ''}
                ${index === 1 ? 'bg-gray-300' : ''}
                ${index === 2 ? 'bg-amber-600' : ''}
              `}></div>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl font-bold">
                  {index === 0 && <Trophy className="inline mr-2 text-heineken-gold" size={20} />}
                  {index === 1 && <Medal className="inline mr-2 text-gray-400" size={20} />}
                  {index === 2 && <Award className="inline mr-2 text-amber-600" size={20} />}
                  {index + 1}º Lugar
                </CardTitle>
                <div className={`
                  text-xl font-bold px-3 py-1 rounded-full
                  ${index === 0 ? 'bg-heineken-gold text-white' : ''}
                  ${index === 1 ? 'bg-gray-300 text-gray-700' : ''}
                  ${index === 2 ? 'bg-amber-600 text-white' : ''}
                `}>
                  {pdv.points} pts
                </div>
              </CardHeader>
              <CardContent>
                <p className="font-bold text-lg text-heineken-dark">{pdv.name}</p>
                <p className="text-gray-500">{pdv.city}</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Ativações aprovadas:</span>
                    <span className="font-medium">{pdv.approved}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Taxa de execução:</span>
                    <span className="font-medium">{pdv.completion}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters and Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filtros</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Buscar por PDV..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div>
                  <Select value={cityFilter} onValueChange={setCityFilter}>
                    <SelectTrigger>
                      <div className="flex items-center">
                        <Filter size={18} className="mr-2 text-gray-400" />
                        <SelectValue placeholder="Cidade" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as cidades</SelectItem>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <div className="flex items-center">
                        <Filter size={18} className="mr-2 text-gray-400" />
                        <SelectValue placeholder="Ordenar por" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="points">Pontos</SelectItem>
                      <SelectItem value="approved">Ativações</SelectItem>
                      <SelectItem value="completion">Taxa de execução</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSearchTerm('');
                    setCityFilter('all');
                    setSortBy('points');
                  }}
                >
                  Limpar Filtros
                </Button>

                <Button 
                  className="w-full bg-heineken-gold hover:bg-heineken-gold/90 text-heineken-dark"
                  onClick={exportRanking}
                >
                  Exportar Ranking
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Desempenho Top 5 PDVs</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="points">
                  <TabsList className="mb-4">
                    <TabsTrigger value="points">Pontuação</TabsTrigger>
                    <TabsTrigger value="completion">Taxa de Execução</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="points">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={chartData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 70,
                          }}
                          barSize={40}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="pdv" 
                            angle={-45} 
                            textAnchor="end"
                            tickMargin={20}
                            height={70}
                          />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="points" name="Pontuação" fill="#00843d" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="completion">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={chartData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 70,
                          }}
                          barSize={40}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="pdv" 
                            angle={-45} 
                            textAnchor="end"
                            tickMargin={20}
                            height={70}
                          />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="completion" name="Taxa de Execução (%)" fill="#d4af37" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Ranking Table */}
        <Card>
          <CardHeader>
            <CardTitle>Classificação Geral</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <div className="grid grid-cols-6 bg-muted/50 p-3 text-sm font-medium">
                <div className="col-span-1">Posição</div>
                <div className="col-span-2">PDV</div>
                <div className="col-span-1">Cidade</div>
                <div className="col-span-1">Ativações</div>
                <div className="col-span-1">Pontuação</div>
              </div>
              {filteredData.map((pdv, index) => (
                <div 
                  key={pdv.id} 
                  className={`grid grid-cols-6 p-3 text-sm items-center ${
                    index !== filteredData.length - 1 && 'border-b'
                  } hover:bg-muted/20 transition-colors`}
                >
                  <div className="col-span-1 flex items-center">
                    {index === 0 && <Trophy className="mr-2 text-heineken-gold" size={16} />}
                    {index === 1 && <Medal className="mr-2 text-gray-400" size={16} />}
                    {index === 2 && <Award className="mr-2 text-amber-600" size={16} />}
                    <span className={`
                      ${index === 0 ? 'font-bold text-heineken-gold' : ''}
                      ${index === 1 ? 'font-bold text-gray-500' : ''}
                      ${index === 2 ? 'font-bold text-amber-600' : ''}
                    `}>
                      {index + 1}º
                    </span>
                  </div>
                  <div className="col-span-2 font-medium">{pdv.name}</div>
                  <div className="col-span-1">{pdv.city}</div>
                  <div className="col-span-1">{pdv.approved}</div>
                  <div className="col-span-1 font-bold">{pdv.points} pts</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminRankingPage;
