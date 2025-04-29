import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, UploadCloud, Calendar, FileText, Activity, MapPin } from "lucide-react";

const statusColors = {
  "Ativa": "bg-heineken-green text-white",
  "Agendada": "bg-yellow-400 text-white",
  "Encerrada": "bg-gray-400 text-white",
};

interface CampaignDetailPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaign: any;
}

const CampaignDetailPanel: React.FC<CampaignDetailPanelProps> = ({ open, onOpenChange, campaign }) => {
  const [tab, setTab] = useState("resumo");
  if (!campaign) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <DialogHeader className="p-6 border-b">
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <span>{campaign.name}</span>
            <Badge className={statusColors[campaign.status] + " ml-2"}>{campaign.status}</Badge>
          </DialogTitle>
        </DialogHeader>
        <Tabs value={tab} onValueChange={setTab} className="p-6 pt-0">
          <TabsList className="mb-6">
            <TabsTrigger value="resumo">Resumo</TabsTrigger>
            <TabsTrigger value="pdvs">PDVs</TabsTrigger>
            <TabsTrigger value="uploads">Uploads</TabsTrigger>
            <TabsTrigger value="regras">Regras</TabsTrigger>
            <TabsTrigger value="historico">Histórico</TabsTrigger>
            <TabsTrigger value="graficos">Gráficos</TabsTrigger>
          </TabsList>
          <TabsContent value="resumo">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2 text-heineken-green"><Calendar size={18}/> <span>Período:</span> <span className="font-medium">{campaign.start} - {campaign.end}</span></div>
                <div className="flex items-center gap-2 text-heineken-green"><Users size={18}/> <span>PDVs:</span> <span className="font-medium">{campaign.pdvs}</span></div>
                <div className="flex items-center gap-2 text-heineken-green"><UploadCloud size={18}/> <span>Envios:</span> <span className="font-medium">{campaign.uploads}</span></div>
              </Card>
              <Card className="p-4 flex flex-col gap-2">
                <div className="font-semibold text-heineken-green mb-1">Ações Rápidas</div>
                <div className="flex gap-2 flex-wrap">
                  <Button variant="outline">Editar</Button>
                  <Button variant="secondary">Duplicar</Button>
                  {campaign.status !== "Encerrada" ? (
                    <Button variant="destructive">Encerrar</Button>
                  ) : (
                    <Button variant="outline">Reabrir</Button>
                  )}
                  <Button variant="ghost">Exportar</Button>
                </div>
              </Card>
            </div>
            <Card className="p-4 mb-4">
              <div className="font-semibold text-heineken-green mb-2">Regras Principais</div>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Exemplo de regra 1 da campanha.</li>
                <li>Exemplo de regra 2 da campanha.</li>
                <li>Exemplo de regra 3 da campanha.</li>
              </ul>
            </Card>
          </TabsContent>
          <TabsContent value="pdvs">
            <Card className="p-4">
              <div className="font-semibold text-heineken-green mb-2 flex items-center gap-2"><Users size={18}/>PDVs Participantes</div>
              <div className="flex flex-wrap gap-4 mb-2">
                {/* Ranking e lista de PDVs */}
                <div className="flex-1 min-w-[200px]">
                  <div className="mb-2 text-sm text-gray-500">Ranking</div>
                  <ul className="space-y-1">
                    <li>1º Super Mercado Exemplo <Badge className="bg-heineken-green ml-1">42 envios</Badge></li>
                    <li>2º Mercado Central <Badge className="bg-gray-300 ml-1">39 envios</Badge></li>
                    <li>3º Mercadinho do Bairro <Badge className="bg-gray-200 ml-1">36 envios</Badge></li>
                  </ul>
                </div>
                <div className="flex-1 min-w-[200px]">
                  <div className="mb-2 text-sm text-gray-500">Mapa</div>
                  <div className="h-24 bg-gray-100 rounded flex items-center justify-center text-gray-400">[Mapa Placeholder]</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="mb-2 text-sm text-gray-500">Lista de PDVs</div>
                <ul className="list-disc pl-6 text-gray-700">
                  <li>Super Mercado Exemplo (SP) - Ativo</li>
                  <li>Mercado Central (RJ) - Ativo</li>
                  <li>Mercadinho do Bairro (BA) - Inativo</li>
                </ul>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="uploads">
            <Card className="p-4">
              <div className="font-semibold text-heineken-green mb-2 flex items-center gap-2"><UploadCloud size={18}/>Uploads</div>
              <div className="h-32 bg-gray-100 rounded flex items-center justify-center text-gray-400 mb-4">[Timeline de uploads]</div>
              <div className="h-32 bg-gray-100 rounded flex items-center justify-center text-gray-400">[Gráfico de uploads]</div>
            </Card>
          </TabsContent>
          <TabsContent value="regras">
            <Card className="p-4">
              <div className="font-semibold text-heineken-green mb-2 flex items-center gap-2"><FileText size={18}/>Regras Detalhadas</div>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Regra 1 detalhada da campanha.</li>
                <li>Regra 2 detalhada da campanha.</li>
                <li>Regra 3 detalhada da campanha.</li>
              </ul>
              <div className="text-sm text-gray-500">Anexos: <span className="underline cursor-pointer">documento.pdf</span></div>
            </Card>
          </TabsContent>
          <TabsContent value="historico">
            <Card className="p-4">
              <div className="font-semibold text-heineken-green mb-2 flex items-center gap-2"><Activity size={18}/>Histórico de Alterações</div>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Campanha criada por Admin em 01/12/2024</li>
                <li>Regra alterada em 10/12/2024</li>
                <li>PDV Mercado Central adicionado em 20/12/2024</li>
              </ul>
            </Card>
          </TabsContent>
          <TabsContent value="graficos">
            <Card className="p-4">
              <div className="font-semibold text-heineken-green mb-2 flex items-center gap-2"><MapPin size={18}/>Gráficos de Performance</div>
              <div className="h-40 bg-gray-100 rounded flex items-center justify-center text-gray-400 mb-4">[Gráfico de execução por cidade]</div>
              <div className="h-40 bg-gray-100 rounded flex items-center justify-center text-gray-400">[Gráfico de uploads por dia]</div>
            </Card>
          </TabsContent>
        </Tabs>
        <div className="flex justify-end p-4 border-t">
          <DialogClose asChild>
            <Button variant="ghost">Fechar</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignDetailPanel;
