import { WeatherData } from "@shared/schema";
import { Eye, Droplets, Wind } from "lucide-react";

interface WeatherMetricsProps {
  data: WeatherData;
}

export function WeatherMetrics({ data }: WeatherMetricsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <Eye className="h-5 w-5 text-primary" />
          <div>
            <div className="text-sm text-muted-foreground">Visibility</div>
            <div className="font-semibold text-foreground" data-testid="text-visibility">
              {data.current.vis_miles} mi
            </div>
          </div>
        </div>
      </div>

      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <Droplets className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <div>
            <div className="text-sm text-muted-foreground">Humidity</div>
            <div className="font-semibold text-foreground" data-testid="text-humidity">
              {data.current.humidity}%
            </div>
          </div>
        </div>
      </div>

      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <Wind className="h-5 w-5 text-muted-foreground" />
          <div>
            <div className="text-sm text-muted-foreground">Wind Speed</div>
            <div className="font-semibold text-foreground" data-testid="text-wind-speed">
              {Math.round(data.current.wind_mph)} mph
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
