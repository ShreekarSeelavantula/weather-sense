import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface WeatherSearchProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
  error: string | null;
}

export function WeatherSearch({ onSearch, isLoading, error }: WeatherSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    const city = searchQuery.trim();
    if (city) {
      onSearch(city);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="mb-8">
      <div className="max-w-md mx-auto">
        <div className="relative">
          <Input
            type="text"
            placeholder="Enter city name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="pr-12"
            data-testid="input-city-search"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSearch}
            disabled={isLoading || !searchQuery.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-2 hover:bg-transparent"
            data-testid="button-search"
          >
            <Search className="h-4 w-4 text-muted-foreground hover:text-primary" />
          </Button>
        </div>
        
        {error && (
          <div className="mt-2 text-sm text-destructive" data-testid="text-search-error">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
