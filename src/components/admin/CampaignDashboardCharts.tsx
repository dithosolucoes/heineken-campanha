import React from "react";
import { Card } from "@/components/ui/card";
// Aqui você pode importar seu componente de gráfico real

const CampaignDashboardCharts = () => {
  // Use gráficos reais (ex: chart.js, recharts, nivo, etc) na integração
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <Card className="p-4">
        <h4 className="font-semibold mb-2 text-heineken-green">Uploads por Dia</h4>
        <div className="h-40 flex items-center justify-center text-gray-400">[Gráfico de Linha Placeholder]</div>
      </Card>
      <Card className="p-4">
        <h4 className="font-semibold mb-2 text-heineken-green">Funil de Status</h4>
        <div className="h-40 flex items-center justify-center text-gray-400">[Gráfico de Funil Placeholder]</div>
      </Card>
    </div>
  );
};

export default CampaignDashboardCharts;
