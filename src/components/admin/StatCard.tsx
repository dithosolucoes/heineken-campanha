
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  description?: string;
  icon: LucideIcon;
  color?: string;
  change?: number;
}

const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  color = "bg-heineken-green",
  change,
}: StatCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`${color} p-2 rounded-md`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
        {typeof change !== 'undefined' && (
          <div className={`flex items-center text-xs mt-1 ${
            change >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            <span>{change >= 0 ? '+' : ''}{change}%</span>
            <span className="ml-1">desde o mês anterior</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
