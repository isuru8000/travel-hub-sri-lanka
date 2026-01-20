
import React, { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, CloudLightning, RefreshCw, ChevronDown, Droplets, Wind as WindIcon } from 'lucide-react';
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
    if (code === 0) return <Sun className="text-yellow-500" size={14} />;
    if (code >= 1 && code <= 3) return <Cloud className="text-blue-400" size={14} />;
    if (code >= 51 && code <= 67) return <CloudRain className="text-blue-500" size={14} />;
    if (code >= 80 && code <= 99) return <CloudLightning className="text-purple-500" size={14} />;
    return <Sun className="text-yellow-500" size={14} />;
  };

  return (
    <div className="relative group/weather">
      {/* Main Status Pill */}
      <button 
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full transition-all active:scale-95 shadow-sm"
      >
        <div className="relative flex items-center justify-center">
          {weather && getWeatherIcon(weather.code)}
          <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse border border-white"></span>
        </div>
        
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-black text-[#262626] font-mono leading-none">
            {loading ? '...' : `${weather?.temp}°C`}
          </span>
          <span className="hidden sm:inline-block w-px h-2.5 bg-gray-200"></span>
          <span className="hidden sm:inline-block text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none">
            {language === 'EN' ? selectedCity.name : selectedCity.si}
          </span>
          <ChevronDown size={10} className={`text-gray-300 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {/* Expanded Quick Info (Tooltip Style) */}
      {!showDropdown && weather && (
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover/weather:opacity-100 pointer-events-none transition-all duration-300 translate-y-2 group-hover/weather:translate-y-0 z-50">
          <div className="bg-white p-3 rounded-2xl shadow-2xl border border-gray-100 flex gap-4 whitespace-nowrap">
            <div className="flex items-center gap-1.5">
              <Droplets size={12} className="text-blue-400" />
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{weather.humidity}%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <WindIcon size={12} className="text-green-400" />
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">8 km/h</span>
            </div>
          </div>
        </div>
      )}

      {/* City Selector Dropdown */}
      {showDropdown && (
        <div className="absolute top-full mt-2 right-0 bg-white rounded-2xl shadow-2xl border border-gray-100 p-1 min-w-[140px] z-50 animate-in zoom-in-95 duration-200">
          <div className="px-3 py-2 border-b border-gray-50 mb-1 flex justify-between items-center">
             <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Select Node</span>
             <button onClick={() => fetchWeather(selectedCity)} className={loading ? 'animate-spin' : ''}>
               <RefreshCw size={10} className="text-gray-300 hover:text-[#E1306C]" />
             </button>
          </div>
          {CITIES.map((city) => (
            <button
              key={city.name}
              onClick={() => {
                setSelectedCity(city);
                setShowDropdown(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                selectedCity.name === city.name 
                  ? 'bg-[#E1306C] text-white' 
                  : 'text-[#262626] hover:bg-gray-50'
              }`}
            >
              {language === 'EN' ? city.name : city.si}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
