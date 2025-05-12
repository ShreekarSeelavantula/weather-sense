import { WeatherData } from "@shared/schema";
import { getWeatherIcon } from "@/lib/weather-icons";
import { Card, CardContent } from "@/components/ui/card";

interface CurrentWeatherProps {
  data: WeatherData;
  lastUpdated: string;
}

export function CurrentWeather({ data, lastUpdated }: CurrentWeatherProps) {
  const iconClass = getWeatherIcon(data.current.condition.code);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-foreground" data-testid="text-location">
              {data.location.name}, {data.location.region}
            </h2>
            <p className="text-sm text-muted-foreground" data-testid="text-last-updated">
              Last updated: {lastUpdated}
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-light text-foreground" data-testid="text-temperature">
              {Math.round(data.current.temp_f)}°F
            </div>
            <div className="text-sm text-muted-foreground" data-testid="text-feels-like">
              Feels like {Math.round(data.current.feelslike_f)}°F
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <div className="flex items-center space-x-3">
            <i className={`${iconClass} text-3xl`} data-testid="icon-weather-condition" />
            <div>
              <div className="font-medium text-foreground" data-testid="text-condition">
                {data.current.condition.text}
              </div>
              <div className="text-sm text-muted-foreground" data-testid="text-condition-description">
                {data.current.condition.text}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
