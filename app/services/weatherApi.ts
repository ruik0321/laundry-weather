import { WeatherData } from "@/app/types/weather";
import { calcLaundryScore, getComment } from "@/app/utils/laundry";

export async function fetchWeatherByCoords(
  lat: number,
  lon: number
): Promise<WeatherData> {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,precipitation_probability,birch_pollen,dust&timezone=Asia%2FTokyo&forecast_days=1`
  );
  const data = await res.json();
  const temp = data.hourly.temperature_2m[9];
  const humidity = data.hourly.relativehumidity_2m[9];
  const windspeed = data.hourly.windspeed_10m[9];
  const precip = data.hourly.precipitation_probability[9];
  const pollen = data.hourly.birch_pollen[9];
  const dust = data.hourly.dust[9];
  const score = calcLaundryScore(temp, humidity, windspeed, precip);
  return { temp, humidity, windspeed, precip, pollen, dust, score, comment: getComment(score) };
}

export async function fetchLocationName(
  lat: number,
  lon: number
): Promise<string> {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=ja`
  );
  const data = await res.json();
  return data.address?.city || data.address?.town || data.address?.village || "現在地";
}