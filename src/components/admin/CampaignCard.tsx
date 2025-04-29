import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, UploadCloud, Calendar, ChevronRight } from "lucide-react";

interface CampaignCardProps {
  campaign: any;
  onDetail: (campaign: any) => void;
  onEdit: (campaign: any) => void;
  onClose: (campaign: any) => void;
}

const statusColors = {
  "Ativa": "bg-heineken-green text-white",
  "Agendada": "bg-yellow-400 text-white",
  "Encerrada": "bg-gray-400 text-white",
};

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, onDetail, onEdit, onClose }) => {
  return (
    <Card className="flex flex-col justify-between p-5 shadow-lg min-h-[220px]">
      <div className="flex items-center gap-3 mb-2">
        <h3 className="text-xl font-bold flex-1">{campaign.name}</h3>
        <Badge className={statusColors[campaign.status]}>{campaign.status}</Badge>
      </div>
      <div className="flex items-center gap-4 mb-4 text-heineken-green">
        <Calendar size={18} />
        <span className="font-medium">{campaign.start} - {campaign.end}</span>
      </div>
      <div className="flex items-center gap-6 mb-4">
        <div className="flex items-center gap-2"><Users size={18} /> <span>{campaign.pdvs} PDVs</span></div>
        <div className="flex items-center gap-2"><UploadCloud size={18} /> <span>{campaign.uploads} Envios</span></div>
      </div>
      <div className="flex gap-2 mt-auto">
        <Button size="sm" variant="outline" onClick={() => onEdit(campaign)}>Editar</Button>
        <Button size="sm" variant="ghost" onClick={() => onDetail(campaign)}>Detalhes <ChevronRight size={16} /></Button>
        {campaign.status !== "Encerrada" && (
          <Button size="sm" variant="destructive" onClick={() => onClose(campaign)}>Encerrar</Button>
        )}
      </div>
    </Card>
  );
};

export default CampaignCard;
