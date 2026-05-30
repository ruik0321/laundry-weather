"use client";

import { useState, useEffect } from "react";
import { CITIES } from "@/app/constants/cities";
import { City, WeatherData } from "@/app/types/weather";
import { getAdvice } from "@/app/utils/laundry";
import { fetchWeatherByCoords, fetchLocationName } from "@/app/services/weatherApi";
import CitySelector from "./components/CitySelector";
import ScoreCard from "./components/ScoreCard";
import WeatherGrid from "./components/WeatherGrid";

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<City>(CITIES[0]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentLocationName, setCurrentLocationName] = useState<string | null>(null);
  const [geoError, setGeoError] = useState("");

  useEffect(() => {
  if (!navigator.geolocation) return;
  setLoading(true);
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      const locationName = await fetchLocationName(latitude, longitude);
      setCurrentLocationName(locationName);
      const data = await fetchWeatherByCoords(latitude, longitude);
      setWeather(data);
      setLoading(false);
    },
    () => {
      setLoading(false);
    }
  );
}, []);

  async function handleSearch() {
    setGeoError("");
    setCurrentLocationName(null);

    if (selectedCity.label === "現在地") {
      if (!navigator.geolocation) {
        setGeoError("このブラウザは位置情報に対応していません");
        return;
      }
      setLoading(true);
      setWeather(null);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const locationName = await fetchLocationName(latitude, longitude);
          setCurrentLocationName(locationName);
          const data = await fetchWeatherByCoords(latitude, longitude);
          setWeather(data);
          setLoading(false);
        },
        () => {
          setGeoError("位置情報の取得に失敗しました");
          setLoading(false);
        }
      );
      return;
    }

    setLoading(true);
    setWeather(null);
    const data = await fetchWeatherByCoords(selectedCity.lat, selectedCity.lon);
    setWeather(data);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
  <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl shadow-lg p-6 w-full max-w-sm">
      <p className="text-xs text-blue-400 dark:text-blue-300 text-center mb-1">
  {new Date().toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  })}
</p>
        <h1 className="text-xl font-medium text-blue-900 dark:text-blue-100 text-center mb-4">
          今日の洗濯どうする？
        </h1>

        <CitySelector
          cities={CITIES}
          selectedCity={selectedCity}
          onCityChange={(city) => {
            setSelectedCity(city);
            setCurrentLocationName(null);
            setGeoError("");
          }}
          onSearch={handleSearch}
          geoError={geoError}
          currentLocationName={currentLocationName}
        />

        {loading && (
          <p className="text-center text-blue-400 text-sm mt-2">取得中...</p>
        )}

        {weather && (
  <div className="space-y-4 mt-4 animate-fade-in-up">
    <ScoreCard
      score={weather.score}
      comment={weather.comment}
      tips={getAdvice(
        weather.temp,
        weather.humidity,
        weather.windspeed,
        weather.precip,
        weather.pollen,
        weather.score
      )}
    />
    <WeatherGrid
      temp={weather.temp}
      humidity={weather.humidity}
      windspeed={weather.windspeed}
      precip={weather.precip}
      pollen={weather.pollen}
      dust={weather.dust}
    />
  </div>
)}
      </div>
    </main>
  );
}