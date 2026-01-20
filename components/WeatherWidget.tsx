
import React, { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, CloudLightning, Wind, Droplets, Navigation, RefreshCw, ChevronDown } from 'lucide-react';
import { Language } from '../types.ts';

interface WeatherData {
  temp: number;
  humidity: number;
  isDay: boolean;
  code: number;
  city: string;
}

const CITIES = [
  { name: 'Colombo', lat: 6.9271, lon: 79.8612, si: 'කොළඹ' },
  { name: 'Kandy', lat: 7.2906, lon: 80.6337, si: 'මහනුවර' },
  { name: 'Galle', lat: 6.0535, lon: 80.2210, si: 'ගාල්ල' },
  { name: 'Sigiriya', lat: 7.9570, lon: 80.7603, si: 'සීගිරිය' },
  { name: 'Ella', lat: 6.8667, lon: 81.0466, si: 'ඇල්ල' }
];

const WeatherWidget: React.FC<{ language: Language }> = ({ language }) => {
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchWeather = async (city: typeof CITIES[0]) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,is_day,weather_code`
      );
      const data = await res.json();
      setWeather({
        temp: Math.round(data.current.temperature_2m),
        humidity: data.current.relative_humidity_2m,
        isDay: data.current.is_day === 1,
        code: data.current.weather_code,
        city: city.name
      });
    } catch (error) {
      console.error('Weather fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(selectedCity);
  }, [selectedCity]);

  const getWeatherIcon = (code: number) => {
    if (code === 0) return <Sun className="text-yellow-400" size={24} />;
    if (code >= 1 && code <= 3) return <Cloud className="text-blue-200" size={24} />;
    if (code >= 51 && code <= 67) return <CloudRain className="text-blue-400" size={24} />;
    if (code >= 80 && code <= 99) return <CloudLightning className="text-purple-400" size={24} />;
    return <Sun className="text-yellow-400" size={24} />;
  };

  const getWeatherText = (code: number, lang: Language) => {
    if (code === 0) return lang === 'EN' ? 'Clear Sky' : 'පැහැදිලි අහස';
    if (code >= 1 && code <= 3) return lang === 'EN' ? 'Partly Cloudy' : 'වලාකුළු සහිතයි';
    if (code >= 51 && code <= 67) return lang === 'EN' ? 'Rainy' : 'වැසි සහිතයි';
    if (code >= 80 && code <= 99) return lang === 'EN' ? 'Thunderstorm' : 'ගිගුරුම් සහිතයි';
    return lang === 'EN' ? 'Clear' : 'පැහැදිලියි';
  };

  return (
    <div className="absolute top-6 right-6 z-30 animate-in fade-in slide-in-from-right-4 duration-1000">
      <div className="relative">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-5 shadow-2xl min-w-[220px] group transition-all hover:bg-white/15">
          <div className="flex flex-col gap-4">
            {/* Header / City Selector */}
            <div className="flex items-center justify-between gap-4">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Navigation size={14} className="text-[#E1306C]" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 leading-none mb-1">
                    {language === 'EN' ? 'Island Live' : 'දිවයිනේ සජීවී'}
                  </p>
                  <p className="text-sm font-bold flex items-center gap-1">
                    {language === 'EN' ? selectedCity.name : selectedCity.si}
                    <ChevronDown size={14} className={`transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
                  </p>
                </div>
              </button>
              
              <button 
                onClick={() => fetchWeather(selectedCity)}
                className={`text-white/40 hover:text-white transition-all ${loading ? 'animate-spin' : ''}`}
              >
                <RefreshCw size={14} />
              </button>
            </div>

            {/* Main Content */}
            {weather && (
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-4xl font-heritage font-bold text-white tracking-tighter">
                    {weather.temp}°<span className="text-lg opacity-60">c</span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                    {getWeatherText(weather.code, language)}
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner scale-110">
                  {getWeatherIcon(weather.code)}
                </div>
              </div>
            )}

            {/* Footer Stats */}
            <div className="flex items-center gap-4 pt-3 border-t border-white/10">
              <div className="flex items-center gap-1.5">
                <Droplets size={12} className="text-blue-400" />
                <span className="text-[10px] font-bold text-white/70">{weather?.humidity}%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Wind size={12} className="text-green-400" />
                <span className="text-[10px] font-bold text-white/70">8 km/h</span>
              </div>
            </div>
          </div>
        </div>

        {/* City Dropdown */}
        {showDropdown && (
          <div className="absolute top-full mt-2 left-0 right-0 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-2 overflow-hidden animate-in zoom-in-95 duration-200 z-40">
            {CITIES.map((city) => (
              <button
                key={city.name}
                onClick={() => {
                  setSelectedCity(city);
                  setShowDropdown(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all ${
                  selectedCity.name === city.name 
                    ? 'bg-[#E1306C] text-white' 
                    : 'text-[#262626] hover:bg-gray-100'
                }`}
              >
                {language === 'EN' ? city.name : city.si}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherWidget;
