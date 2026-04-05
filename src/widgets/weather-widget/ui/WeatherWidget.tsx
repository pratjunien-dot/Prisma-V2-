import { useState, useEffect } from "react";
import { CloudRain, Sun, Cloud, Snowflake, Loader2 } from "lucide-react";
import { Glass } from "../../../ui/Glass";

export const WeatherWidget = () => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async (lat: number, lon: number) => {
      try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&hourly=temperature_2m,weather_code&timezone=auto`);
        const data = await res.json();
        setWeather(data);
      } catch (e) {
        console.error("Failed to fetch weather", e);
      } finally {
        setLoading(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
        () => fetchWeather(48.8566, 2.3522) // Default to Paris if denied
      );
    } else {
      fetchWeather(48.8566, 2.3522);
    }
  }, []);

  const getWeatherIcon = (code: number, size = 24) => {
    if (code <= 3) return <Sun className="text-amber-400" size={size} />;
    if (code <= 48) return <Cloud className="text-gray-400" size={size} />;
    if (code <= 67 || code >= 80) return <CloudRain className="text-blue-400" size={size} />;
    if (code <= 77) return <Snowflake className="text-white" size={size} />;
    return <Sun className="text-amber-400" size={size} />;
  };

  const getWeatherCondition = (code: number) => {
    if (code <= 3) return "Ensoleillé";
    if (code <= 48) return "Nuageux";
    if (code <= 67 || code >= 80) return "Pluvieux";
    if (code <= 77) return "Neigeux";
    return "Clair";
  };

  if (loading || !weather) {
    return (
      <Glass level={2} className="p-6 flex items-center justify-center h-full">
        <Loader2 className="animate-spin text-accent" size={24} />
      </Glass>
    );
  }

  const current = weather.current;
  const hourly = weather.hourly;
  
  // Get next 4 hours
  const currentHourIndex = hourly.time.findIndex((t: string) => new Date(t).getTime() > Date.now());
  const nextHours = [0, 3, 6, 9].map(offset => {
    const idx = currentHourIndex + offset;
    return {
      time: new Date(hourly.time[idx]).getHours() + "h",
      temp: Math.round(hourly.temperature_2m[idx]),
      code: hourly.weather_code[idx]
    };
  });

  return (
    <Glass level={2} className="p-6 flex flex-col justify-between h-full group hover:border-accent/50 transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getWeatherIcon(current.weather_code)}
          <span className="text-white font-black text-xl">{Math.round(current.temperature_2m)}°C</span>
        </div>
        <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">Local</span>
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-white/60">Condition</span>
          <span className="text-white font-bold">{getWeatherCondition(current.weather_code)}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-white/60">Vent</span>
          <span className="text-white font-bold">{Math.round(current.wind_speed_10m)} km/h</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-white/60">Humidité</span>
          <span className="text-white font-bold">{current.relative_humidity_2m}%</span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/10 flex justify-between">
        {nextHours.map((hour, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span className="text-white/40 text-[10px]">{hour.time}</span>
            {getWeatherIcon(hour.code, 14)}
            <span className="text-white text-[10px] font-bold">{hour.temp}°</span>
          </div>
        ))}
      </div>
    </Glass>
  );
};
