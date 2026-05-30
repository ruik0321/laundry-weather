type City = {
  label: string;
  lat: number;
  lon: number;
};

type Props = {
  cities: City[];
  selectedCity: City;
  onCityChange: (city: City) => void;
  onSearch: () => void;
  geoError: string;
  currentLocationName: string | null;
};

export default function CitySelector({
  cities,
  selectedCity,
  onCityChange,
  onSearch,
  geoError,
  currentLocationName,
}: Props) {
  return (
    <div>
      <div className="flex gap-2 mb-4">
        <select
          value={selectedCity.label}
          onChange={(e) => {
            const city = cities.find((c) => c.label === e.target.value)!;
            onCityChange(city);
          }}
          className="flex-1 rounded-xl border border-blue-200 dark:border-gray-600 px-3 py-2 text-blue-900 dark:text-blue-100 bg-white/80 dark:bg-gray-700/80 text-sm"
        >
          {cities.map((city) => (
            <option
              key={city.label}
              value={city.label}
              className="dark:bg-gray-700"
            >
              {city.label}
            </option>
          ))}
        </select>
        <button
          onClick={onSearch}
          className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-xl px-4 py-2 text-sm font-medium transition-colors"
        >
          検索
        </button>
      </div>

      {geoError && (
        <p className="text-center text-red-400 text-sm mb-2">{geoError}</p>
      )}
      {currentLocationName && (
        <p className="text-center text-blue-400 dark:text-blue-300 text-sm mb-2">
          現在地：{currentLocationName}
        </p>
      )}
    </div>
  );
}