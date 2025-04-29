
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartData {
  name: string;
  value: number;
  color: string;
}

const StatusChart = ({ 
  approved = 0,
  rejected = 0,
  pending = 0,
  title = "Status das Ativações"
}: {
  approved?: number;
  rejected?: number;
  pending?: number;
  title?: string;
}) => {
  const data: ChartData[] = [
    { name: "Aprovadas", value: approved, color: "#00843d" },
    { name: "Reprovadas", value: rejected, color: "#f44336" },
    { name: "Pendentes", value: pending, color: "#ffc107" },
  ].filter(item => item.value > 0);

  const total = approved + rejected + pending;
  const percentFormat = (value: number) => `${Math.round((value / total) * 100)}%`;

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        {total > 0 ? (
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                innerRadius={40}
                fill="#8884d8"
                dataKey="value"
                label={({ value }) => percentFormat(value)}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} (${percentFormat(value as number)})`, '']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[240px] flex items-center justify-center">
            <p className="text-gray-500 text-center">Sem dados para exibir</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatusChart;
