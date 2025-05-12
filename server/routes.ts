import type { Express } from "express";
import { createServer, type Server } from "http";
import { weatherSearchSchema, weatherDataSchema, weatherErrorSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Weather API endpoint
  app.get("/api/weather/:city", async (req, res) => {
    try {
      const city = req.params.city;
      
      // Validate city parameter
      const validation = weatherSearchSchema.safeParse({ city });
      if (!validation.success) {
        return res.status(400).json({ 
          error: { 
            code: 400, 
            message: "Invalid city name provided" 
          } 
        });
      }

      // Get API key from environment variables
      const apiKey = process.env.OPENWEATHER_API_KEY || process.env.WEATHER_API_KEY || process.env.WEATHERAPI_KEY;
      if (!apiKey) {
        return res.status(500).json({ 
          error: { 
            code: 500, 
            message: "Weather API key not configured" 
          } 
        });
      }

      // Use WeatherAPI.com as it provides comprehensive data including forecast
      const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(city)}&days=1&aqi=yes&alerts=no`
      );

      if (!response.ok) {
        if (response.status === 400) {
          return res.status(404).json({ 
            error: { 
              code: 404, 
              message: "City not found. Please check the spelling and try again." 
            } 
          });
        }
        throw new Error(`Weather API error: ${response.status}`);
      }

      const data = await response.json();

      // Validate response data
      const weatherValidation = weatherDataSchema.safeParse(data);
      if (!weatherValidation.success) {
        console.error("Weather API response validation failed:", weatherValidation.error);
        return res.status(500).json({ 
          error: { 
            code: 500, 
            message: "Invalid response from weather service" 
          } 
        });
      }

      res.json(data);
    } catch (error) {
      console.error("Weather API error:", error);
      res.status(500).json({ 
        error: { 
          code: 500, 
          message: "Failed to fetch weather data. Please try again later." 
        } 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
