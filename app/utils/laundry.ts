export function calcLaundryScore(
  temp: number,
  humidity: number,
  windspeed: number,
  precip: number
): number {
  let score = 100;
  score -= precip * 0.8;
  const humidityPenalty = Math.max(0, (humidity - 60) * 0.5);
  const windBonus = Math.min(humidityPenalty, windspeed * 1.5);
  score -= humidityPenalty - windBonus;
  if (temp < 15) score -= (15 - temp) * 1.5;
  if (windspeed > 10) score -= (windspeed - 10) * 2;
  if (windspeed < 1) score -= 10;
  return Math.max(0, Math.round(score));
}

export function getComment(score: number): string {
  if (score >= 80) return "絶好の洗濯日和！外干しOKです";
  if (score >= 60) return "まあまあOK。午前中に干しましょう";
  if (score >= 40) return "室内干し推奨です";
  return "今日は洗濯やめておきましょう";
}

export function getAdvice(
  temp: number,
  humidity: number,
  windspeed: number,
  precip: number,
  pollen: number,
  score: number
): string[] {
  const tips: string[] = [];
  if (score >= 60) {
    if (windspeed > 8) tips.push("風が強いのでしっかり止めてね！");
    if (pollen > 30) tips.push("花粉が多いので外干し注意！");
    if (humidity > 70 && windspeed > 5) tips.push("湿度高めですが風があるので乾きます");
  } else {
    if (humidity > 70 && windspeed < 3) tips.push("湿度が高く風も弱いので乾きにくいです");
    if (precip > 50) tips.push("雨の可能性が高いです");
    if (temp < 10) tips.push("気温が低いので乾燥に時間がかかります");
    if (score < 40) tips.push("除湿機やサーキュレーターの活用がおすすめ");
  }
  return tips;
}