import { WeatherData } from "@shared/schema";
import { getUVLevel, getAQILevel } from "@/lib/weather-icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sun, Leaf, Sunrise, Sunset, Clock } from "lucide-react";

interface AdditionalWeatherInfoProps {
  data: WeatherData;
}

export function AdditionalWeatherInfo({ data }: AdditionalWeatherInfoProps) {
  const uvLevel = getUVLevel(data.current.uv);
  // Mock AQI data since WeatherAPI free tier doesn't include it
  const mockAQI = Math.floor(Math.random() * 100) + 25;
  const aqiLevel = getAQILevel(mockAQI);

  const sunrise = data.forecast.forecastday[0]?.astro.sunrise || "6:42 AM";
  const sunset = data.forecast.forecastday[0]?.astro.sunset || "7:28 PM";

  // Calculate daylight hours
  const parseTime = (timeStr: string) => {
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    let totalMinutes = hours * 60 + minutes;
    if (period === 'PM' && hours !== 12) totalMinutes += 12 * 60;
    if (period === 'AM' && hours === 12) totalMinutes = minutes;
    return totalMinutes;
  };

  const sunriseMinutes = parseTime(sunrise);
  const sunsetMinutes = parseTime(sunset);
  const daylightMinutes = sunsetMinutes - sunriseMinutes;
  const daylightHours = Math.floor(daylightMinutes / 60);
  const daylightMins = daylightMinutes % 60;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* UV Index & Air Quality Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Air Quality & UV</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Sun className="h-5 w-5 text-amber-500" />
              <span className="text-muted-foreground">UV Index</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-foreground" data-testid="text-uv-index">
                {data.current.uv}
              </span>
              <Badge variant="secondary" className={uvLevel.color} data-testid="badge-uv-level">
                {uvLevel.level}
              </Badge>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Leaf className="h-5 w-5 text-green-500" />
              <span className="text-muted-foreground">Air Quality</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-foreground" data-testid="text-aqi">
                {mockAQI}
              </span>
              <Badge variant="secondary" className={aqiLevel.color} data-testid="badge-aqi-level">
                {aqiLevel.level}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sunrise & Sunset Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sun & Moon</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Sunrise className="h-5 w-5 text-amber-500" />
              <span className="text-muted-foreground">Sunrise</span>
            </div>
            <span className="font-semibold text-foreground" data-testid="text-sunrise">
              {sunrise}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Sunset className="h-5 w-5 text-muted-foreground" />
              <span className="text-muted-foreground">Sunset</span>
            </div>
            <span className="font-semibold text-foreground" data-testid="text-sunset">
              {sunset}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span className="text-muted-foreground">Daylight</span>
            </div>
            <span className="font-semibold text-foreground" data-testid="text-daylight">
              {daylightHours}h {daylightMins}m
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
