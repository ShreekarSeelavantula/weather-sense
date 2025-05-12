import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { WeatherData, WeatherError } from "@shared/schema";
import { WeatherSearch } from "@/components/weather-search";
import { CurrentWeather } from "@/components/current-weather";
import { WeatherMetrics } from "@/components/weather-metrics";
import { AdditionalWeatherInfo } from "@/components/additional-weather-info";
import { HourlyForecast } from "@/components/hourly-forecast";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { CloudSun, Sun, Moon, RefreshCw, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function WeatherDashboard() {
  const [city, setCity] = useState<string>("San Francisco");
  const [searchError, setSearchError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [nextRefresh, setNextRefresh] = useState<string>("");
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();

  // Auto-refresh every 5 minutes
  const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds

  const {
    data: weatherData,
    isLoading,
    error,
    refetch,
  } = useQuery<WeatherData, Error>({
    queryKey: ["/api/weather", city],
    enabled: !!city,
    refetchInterval: REFRESH_INTERVAL,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (weatherData) {
      const now = new Date();
      setLastUpdated(now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }));
      
      const nextUpdate = new Date(now.getTime() + REFRESH_INTERVAL);
      setNextRefresh(nextUpdate.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }));
    }
  }, [weatherData]);

  useEffect(() => {
    if (error) {
      const errorData = error as any;
      if (errorData?.message?.includes("City not found")) {
        setSearchError("City not found. Please check the spelling and try again.");
      } else {
        setSearchError("Failed to fetch weather data. Please try again later.");
      }
      toast({
        title: "Weather Error",
        description: searchError || "Failed to fetch weather data",
        variant: "destructive",
      });
    } else {
      setSearchError(null);
    }
  }, [error, toast, searchError]);

  const handleSearch = (searchCity: string) => {
    setCity(searchCity);
    setSearchError(null);
  };

  const handleRetry = () => {
    refetch();
  };

  if (isLoading && !weatherData) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card shadow-sm border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <CloudSun className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-semibold text-foreground">Weather Dashboard</h1>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className="relative"
                data-testid="button-theme-toggle"
              >
                {theme === "light" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </header>

        {/* Loading State */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-12" data-testid="container-loading">
            <div className="flex items-center space-x-3">
              <RefreshCw className="h-8 w-8 animate-spin text-primary" />
              <span className="text-muted-foreground">Loading weather data...</span>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error && !weatherData) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card shadow-sm border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <CloudSun className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-semibold text-foreground">Weather Dashboard</h1>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className="relative"
                data-testid="button-theme-toggle"
              >
                {theme === "light" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </header>

        {/* Error State */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <WeatherSearch onSearch={handleSearch} isLoading={false} error={null} />
          
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center" data-testid="container-error">
            <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-destructive mb-2">Unable to load weather data</h3>
            <p className="text-destructive/80 mb-4" data-testid="text-error-message">
              {searchError || "Please check your internet connection and try again."}
            </p>
            <Button onClick={handleRetry} data-testid="button-retry">
              Try Again
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <CloudSun className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold text-foreground">Weather Dashboard</h1>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="relative"
              data-testid="button-theme-toggle"
            >
              {theme === "light" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <WeatherSearch 
          onSearch={handleSearch} 
          isLoading={isLoading} 
          error={searchError}
        />

        {/* Weather Display */}
        {weatherData && (
          <div className="grid gap-6" data-testid="container-weather-display">
            {/* Current Weather Card */}
            <div className="space-y-4">
              <CurrentWeather data={weatherData} lastUpdated={lastUpdated} />
              <WeatherMetrics data={weatherData} />
            </div>

            {/* Additional Weather Info */}
            <AdditionalWeatherInfo data={weatherData} />

            {/* Hourly Forecast */}
            <HourlyForecast data={weatherData} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <RefreshCw className="h-4 w-4" />
                <span>Auto-refresh: <span data-testid="text-refresh-interval">5 minutes</span></span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-clock" />
                <span>Next update: <span data-testid="text-next-refresh">{nextRefresh}</span></span>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              Powered by WeatherAPI
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
