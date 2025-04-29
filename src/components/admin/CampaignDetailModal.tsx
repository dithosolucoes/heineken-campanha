import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, UploadCloud, CheckCircle2, XCircle, Clock } from "lucide-react";

interface CampaignDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaign: any;
}

const statusColors = {
  "Ativa": "bg-heineken-green text-white",
  "Agendada": "bg-yellow-400 text-white",
  "Encerrada": "bg-gray-400 text-white",
};

const CampaignDetailModal: React.FC<CampaignDetailModalProps> = ({ open, onOpenChange, campaign }) => {
  if (!campaign) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <span>{campaign.name}</span>
            <Badge className={statusColors[campaign.status] + " ml-2"}>{campaign.status}</Badge>
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-heineken-green"><Calendar size={18}/> <span>Período:</span> <span className="font-medium">{campaign.start} - {campaign.end}</span></div>
          <div className="flex items-center gap-2 text-heineken-green"><Users size={18}/> <span>PDVs:</span> <span className="font-medium">{campaign.pdvs}</span></div>
          <div className="flex items-center gap-2 text-heineken-green"><UploadCloud size={18}/> <span>Envios:</span> <span className="font-medium">{campaign.uploads}</span></div>
        </div>
        <div className="mb-4">
          <h4 className="font-semibold mb-2 text-heineken-green">Regras da Campanha</h4>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Exemplo de regra 1 da campanha.</li>
            <li>Exemplo de regra 2 da campanha.</li>
            <li>Exemplo de regra 3 da campanha.</li>
          </ul>
        </div>
        <div className="flex gap-2 justify-end">
          <Button variant="outline">Editar</Button>
          {campaign.status !== "Encerrada" ? (
            <Button variant="destructive">Encerrar Campanha</Button>
          ) : (
            <Button variant="secondary">Reabrir</Button>
          )}
          <DialogClose asChild>
            <Button variant="ghost">Fechar</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignDetailModal;
