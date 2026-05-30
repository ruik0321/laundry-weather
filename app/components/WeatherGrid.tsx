import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faCloudRain,
  faCloudSun,
  faFaceSmile,
  faFaceMeh,
  faFaceFrown,
  faFaceDizzy,
  faMaskFace,
} from "@fortawesome/free-solid-svg-icons";

type Props = {
  temp: number;
  humidity: number;
  windspeed: number;
  precip: number;
  pollen: number;
  dust: number;
};

function getPrecipIcon(precip: number) {
  if (precip < 20) return { icon: faSun, color: "text-yellow-400", label: `${precip}%` };
  if (precip < 50) return { icon: faCloudSun, color: "text-blue-300", label: `${precip}%` };
  return { icon: faCloudRain, color: "text-blue-500", label: `${precip}%` };
}

function getHumidityIcon(humidity: number) {
  if (humidity < 50) return { icon: faFaceSmile, color: "text-green-400", label: `${humidity}%` };
  if (humidity < 70) return { icon: faFaceMeh, color: "text-yellow-400", label: `${humidity}%` };
  return { icon: faFaceFrown, color: "text-red-400", label: `${humidity}%` };
}

function getPollenIcon(pollen: number) {
  if (pollen < 10) return { icon: faFaceSmile, color: "text-green-400", label: "少ない" };
  if (pollen < 30) return { icon: faFaceMeh, color: "text-yellow-400", label: "やや多い" };
  if (pollen < 80) return { icon: faFaceDizzy, color: "text-orange-400", label: "多い" };
  return { icon: faFaceDizzy, color: "text-red-500", label: "非常に多い" };
}

function getDustIcon(dust: number) {
  if (dust < 10) return { icon: faFaceSmile, color: "text-green-400", label: "少ない" };
  if (dust < 25) return { icon: faFaceMeh, color: "text-yellow-400", label: "普通" };
  if (dust < 75) return { icon: faMaskFace, color: "text-orange-400", label: "多い" };
  return { icon: faMaskFace, color: "text-red-500", label: "非常に多い" };
}

export default function WeatherGrid({ temp, humidity, windspeed, precip, pollen, dust }: Props) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white/80 dark:bg-gray-700/80 rounded-2xl p-3">
          <p className="text-xs text-blue-400 dark:text-blue-300 mb-1">気温</p>
          <p className="text-xl font-medium text-blue-900 dark:text-blue-100">{temp}℃</p>
        </div>
        <div className="bg-white/80 dark:bg-gray-700/80 rounded-2xl p-3">
          <p className="text-xs text-blue-400 dark:text-blue-300 mb-1">風速</p>
          <p className="text-xl font-medium text-blue-900 dark:text-blue-100">{windspeed}m/s</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {[
          { title: "降水確率", ...getPrecipIcon(precip) },
          { title: "湿度", ...getHumidityIcon(humidity) },
          { title: "花粉", ...getPollenIcon(pollen) },
          { title: "PM2.5", ...getDustIcon(dust) },
        ].map(({ title, icon, color, label }) => (
          <div key={title} className="bg-white/80 dark:bg-gray-700/80 rounded-2xl p-3 flex items-center gap-3">
            <FontAwesomeIcon icon={icon} className={`text-2xl ${color}`} />
            <div>
              <p className="text-xs text-blue-400 dark:text-blue-300">{title}</p>
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}