import { z } from "zod";

// Weather API response schemas
export const weatherDataSchema = z.object({
  location: z.object({
    name: z.string(),
    country: z.string(),
    region: z.string(),
  }),
  current: z.object({
    temp_f: z.number(),
    temp_c: z.number(),
    condition: z.object({
      text: z.string(),
      icon: z.string(),
      code: z.number(),
    }),
    humidity: z.number(),
    wind_mph: z.number(),
    wind_kph: z.number(),
    vis_miles: z.number(),
    vis_km: z.number(),
    uv: z.number(),
    feelslike_f: z.number(),
    feelslike_c: z.number(),
  }),
  forecast: z.object({
    forecastday: z.array(z.object({
      date: z.string(),
      astro: z.object({
        sunrise: z.string(),
        sunset: z.string(),
      }),
      hour: z.array(z.object({
        time: z.string(),
        temp_f: z.number(),
        temp_c: z.number(),
        condition: z.object({
          text: z.string(),
          icon: z.string(),
          code: z.number(),
        }),
        chance_of_rain: z.number(),
      })),
    })),
  }),
});

export const weatherErrorSchema = z.object({
  error: z.object({
    code: z.number(),
    message: z.string(),
  }),
});

export type WeatherData = z.infer<typeof weatherDataSchema>;
export type WeatherError = z.infer<typeof weatherErrorSchema>;

// Search request schema
export const weatherSearchSchema = z.object({
  city: z.string().min(1, "City name is required").max(100, "City name too long"),
});

export type WeatherSearchRequest = z.infer<typeof weatherSearchSchema>;
