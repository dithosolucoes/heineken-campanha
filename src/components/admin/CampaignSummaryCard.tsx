import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CampaignSummaryCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

const CampaignSummaryCard: React.FC<CampaignSummaryCardProps> = ({ title, value, icon, color }) => {
  return (
    <Card className={`flex flex-col items-start p-4 shadow-md ${color}`}>
      <div className="flex items-center gap-2 mb-2 text-lg font-bold">{icon} {title}</div>
      <CardContent className="p-0">
        <span className="text-3xl font-extrabold">{value}</span>
      </CardContent>
    </Card>
  );
};

export default CampaignSummaryCard;
