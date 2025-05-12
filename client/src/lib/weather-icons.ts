export function getWeatherIcon(code: number, isDay: boolean = true): string {
  // WeatherAPI condition codes mapping to FontAwesome icons
  const iconMap: Record<number, { day: string; night: string; color: string }> = {
    1000: { day: "fas fa-sun", night: "fas fa-moon", color: "text-weather-sunny" }, // Sunny/Clear
    1003: { day: "fas fa-cloud-sun", night: "fas fa-cloud-moon", color: "text-weather-cloudy" }, // Partly cloudy
    1006: { day: "fas fa-cloud", night: "fas fa-cloud", color: "text-weather-cloudy" }, // Cloudy
    1009: { day: "fas fa-cloud", night: "fas fa-cloud", color: "text-weather-cloudy" }, // Overcast
    1030: { day: "fas fa-smog", night: "fas fa-smog", color: "text-weather-cloudy" }, // Mist
    1063: { day: "fas fa-cloud-sun-rain", night: "fas fa-cloud-moon-rain", color: "text-weather-rainy" }, // Patchy rain possible
    1066: { day: "fas fa-cloud-snow", night: "fas fa-cloud-snow", color: "text-weather-snowy" }, // Patchy snow possible
    1069: { day: "fas fa-cloud-rain", night: "fas fa-cloud-rain", color: "text-weather-rainy" }, // Patchy sleet possible
    1072: { day: "fas fa-cloud-rain", night: "fas fa-cloud-rain", color: "text-weather-rainy" }, // Patchy freezing drizzle possible
    1087: { day: "fas fa-bolt", night: "fas fa-bolt", color: "text-yellow-500" }, // Thundery outbreaks possible
    1114: { day: "fas fa-wind", night: "fas fa-wind", color: "text-weather-cloudy" }, // Blowing snow
    1117: { day: "fas fa-snowflake", night: "fas fa-snowflake", color: "text-weather-snowy" }, // Blizzard
    1135: { day: "fas fa-smog", night: "fas fa-smog", color: "text-weather-cloudy" }, // Fog
    1147: { day: "fas fa-smog", night: "fas fa-smog", color: "text-weather-cloudy" }, // Freezing fog
    1150: { day: "fas fa-cloud-drizzle", night: "fas fa-cloud-drizzle", color: "text-weather-rainy" }, // Patchy light drizzle
    1153: { day: "fas fa-cloud-drizzle", night: "fas fa-cloud-drizzle", color: "text-weather-rainy" }, // Light drizzle
    1168: { day: "fas fa-cloud-rain", night: "fas fa-cloud-rain", color: "text-weather-rainy" }, // Freezing drizzle
    1171: { day: "fas fa-cloud-rain", night: "fas fa-cloud-rain", color: "text-weather-rainy" }, // Heavy freezing drizzle
    1180: { day: "fas fa-cloud-rain", night: "fas fa-cloud-rain", color: "text-weather-rainy" }, // Patchy light rain
    1183: { day: "fas fa-cloud-rain", night: "fas fa-cloud-rain", color: "text-weather-rainy" }, // Light rain
    1186: { day: "fas fa-cloud-rain", night: "fas fa-cloud-rain", color: "text-weather-rainy" }, // Moderate rain at times
    1189: { day: "fas fa-cloud-rain", night: "fas fa-cloud-rain", color: "text-weather-rainy" }, // Moderate rain
    1192: { day: "fas fa-cloud-showers-heavy", night: "fas fa-cloud-showers-heavy", color: "text-weather-rainy" }, // Heavy rain at times
    1195: { day: "fas fa-cloud-showers-heavy", night: "fas fa-cloud-showers-heavy", color: "text-weather-rainy" }, // Heavy rain
    1198: { day: "fas fa-cloud-rain", night: "fas fa-cloud-rain", color: "text-weather-rainy" }, // Light freezing rain
    1201: { day: "fas fa-cloud-rain", night: "fas fa-cloud-rain", color: "text-weather-rainy" }, // Moderate or heavy freezing rain
    1204: { day: "fas fa-cloud-rain", night: "fas fa-cloud-rain", color: "text-weather-rainy" }, // Light sleet
    1207: { day: "fas fa-cloud-rain", night: "fas fa-cloud-rain", color: "text-weather-rainy" }, // Moderate or heavy sleet
    1210: { day: "fas fa-snowflake", night: "fas fa-snowflake", color: "text-weather-snowy" }, // Patchy light snow
    1213: { day: "fas fa-snowflake", night: "fas fa-snowflake", color: "text-weather-snowy" }, // Light snow
    1216: { day: "fas fa-snowflake", night: "fas fa-snowflake", color: "text-weather-snowy" }, // Patchy moderate snow
    1219: { day: "fas fa-snowflake", night: "fas fa-snowflake", color: "text-weather-snowy" }, // Moderate snow
    1222: { day: "fas fa-snowflake", night: "fas fa-snowflake", color: "text-weather-snowy" }, // Patchy heavy snow
    1225: { day: "fas fa-snowflake", night: "fas fa-snowflake", color: "text-weather-snowy" }, // Heavy snow
    1237: { day: "fas fa-cloud-hail", night: "fas fa-cloud-hail", color: "text-weather-snowy" }, // Ice pellets
    1240: { day: "fas fa-cloud-rain", night: "fas fa-cloud-rain", color: "text-weather-rainy" }, // Light rain shower
    1243: { day: "fas fa-cloud-showers-heavy", night: "fas fa-cloud-showers-heavy", color: "text-weather-rainy" }, // Moderate or heavy rain shower
    1246: { day: "fas fa-cloud-showers-heavy", night: "fas fa-cloud-showers-heavy", color: "text-weather-rainy" }, // Torrential rain shower
    1249: { day: "fas fa-cloud-rain", night: "fas fa-cloud-rain", color: "text-weather-rainy" }, // Light sleet showers
    1252: { day: "fas fa-cloud-rain", night: "fas fa-cloud-rain", color: "text-weather-rainy" }, // Moderate or heavy sleet showers
    1255: { day: "fas fa-snowflake", night: "fas fa-snowflake", color: "text-weather-snowy" }, // Light snow showers
    1258: { day: "fas fa-snowflake", night: "fas fa-snowflake", color: "text-weather-snowy" }, // Moderate or heavy snow showers
    1261: { day: "fas fa-cloud-hail", night: "fas fa-cloud-hail", color: "text-weather-snowy" }, // Light showers of ice pellets
    1264: { day: "fas fa-cloud-hail", night: "fas fa-cloud-hail", color: "text-weather-snowy" }, // Moderate or heavy showers of ice pellets
    1273: { day: "fas fa-thunderstorm", night: "fas fa-thunderstorm", color: "text-yellow-500" }, // Patchy light rain with thunder
    1276: { day: "fas fa-thunderstorm", night: "fas fa-thunderstorm", color: "text-yellow-500" }, // Moderate or heavy rain with thunder
    1279: { day: "fas fa-thunderstorm", night: "fas fa-thunderstorm", color: "text-yellow-500" }, // Patchy light snow with thunder
    1282: { day: "fas fa-thunderstorm", night: "fas fa-thunderstorm", color: "text-yellow-500" }, // Moderate or heavy snow with thunder
  };

  const iconData = iconMap[code] || { day: "fas fa-question", night: "fas fa-question", color: "text-muted-foreground" };
  return `${isDay ? iconData.day : iconData.night} ${iconData.color}`;
}

export function getUVLevel(uvIndex: number): { level: string; color: string } {
  if (uvIndex <= 2) return { level: "Low", color: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300" };
  if (uvIndex <= 5) return { level: "Moderate", color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300" };
  if (uvIndex <= 7) return { level: "High", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300" };
  if (uvIndex <= 10) return { level: "Very High", color: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300" };
  return { level: "Extreme", color: "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300" };
}

export function getAQILevel(aqi: number): { level: string; color: string } {
  if (aqi <= 50) return { level: "Good", color: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300" };
  if (aqi <= 100) return { level: "Moderate", color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300" };
  if (aqi <= 150) return { level: "Unhealthy for Sensitive", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300" };
  if (aqi <= 200) return { level: "Unhealthy", color: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300" };
  if (aqi <= 300) return { level: "Very Unhealthy", color: "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300" };
  return { level: "Hazardous", color: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300" };
}
