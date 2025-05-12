import { WeatherData } from "@shared/schema";
import { getWeatherIcon } from "@/lib/weather-icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HourlyForecastProps {
  data: WeatherData;
}

export function HourlyForecast({ data }: HourlyForecastProps) {
  const hourlyData = data.forecast.forecastday[0]?.hour.slice(0, 8) || [];

  const formatTime = (timeStr: string) => {
    const date = new Date(timeStr);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      hour12: true 
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">24-Hour Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 overflow-x-auto pb-2" data-testid="container-hourly-forecast">
          {hourlyData.map((hour, index) => {
            const iconClass = getWeatherIcon(hour.condition.code);
            
            return (
              <div 
                key={hour.time} 
                className="flex-shrink-0 text-center p-3 min-w-[80px]"
                data-testid={`card-hourly-${index}`}
              >
                <div className="text-sm text-muted-foreground mb-2" data-testid={`text-hour-time-${index}`}>
                  {formatTime(hour.time)}
                </div>
                <i className={`${iconClass} text-xl mb-2`} data-testid={`icon-hour-condition-${index}`} />
                <div className="font-semibold text-foreground" data-testid={`text-hour-temp-${index}`}>
                  {Math.round(hour.temp_f)}°
                </div>
                <div className="text-xs text-muted-foreground mt-1" data-testid={`text-hour-rain-${index}`}>
                  {hour.chance_of_rain}%
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
