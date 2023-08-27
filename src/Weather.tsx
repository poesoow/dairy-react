import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Weather.css';

const API_KEY = 'cc7ab4ccbcbffef3d0d1e2af7257f18b';
const CITY = 'Daegu';

interface WeatherData {
  main: {
    temp: number;
  };
  weather: {
    description: string;
  }[];
  name: string;
}

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&lang=kr`)
      .then(response => setWeatherData(response.data));
  }, []);

  return (
    <div className="weather">
      {weatherData && (
        <div>
          <h2>Weather in {weatherData.name}</h2>
          <p>온도: {Math.round(weatherData.main.temp - 273.15)}°C</p>
          <p>날씨: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
