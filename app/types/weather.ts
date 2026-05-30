export type City = {
  label: string;
  lat: number;
  lon: number;
};

export type WeatherData = {
  temp: number;
  humidity: number;
  windspeed: number;
  precip: number;
  pollen: number;
  dust: number;
  score: number;
  comment: string;
};