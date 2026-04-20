import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card } from "@/components/ui/card";

export function KPICard({ label, value, change, trend, suffix, prefix, sparklineData }) {
  const getTrendIcon = () => {
    if (trend === "up") return <TrendingUp className="h-4 w-4" />;
    if (trend === "down") return <TrendingDown className="h-4 w-4" />;
    return <Minus className="h-4 w-4" />;
  };

  const getTrendColor = () => {
    if (trend === "up") return "text-success-color";
    if (trend === "down") return "text-danger-color";
    return "text-muted-foreground";
  };

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          <p className="text-3xl tabular-nums">
            {prefix}
            {value}
            {suffix}
          </p>
        </div>

        {change !== undefined && (
          <div className={`flex items-center gap-1 ${getTrendColor()}`}>
            {getTrendIcon()}
            <span className="text-sm tabular-nums">
              {Math.abs(change)}%
            </span>
          </div>
        )}
      </div>

      {sparklineData && (
        <div className="h-8">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 20"
            preserveAspectRatio="none"
          >
            <polyline
              points={sparklineData
                .map(
                  (val, i) =>
                    `${(i / (sparklineData.length - 1)) * 100},${
                      20 - (val / Math.max(...sparklineData)) * 20
                    }`
                )
                .join(" ")}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-primary"
            />
          </svg>
        </div>
      )}
    </Card>
  );
}