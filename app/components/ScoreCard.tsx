type Props = {
  score: number;
  comment: string;
  tips: string[];
};

function getScoreColor(score: number): string {
  if (score >= 80) return "text-blue-500";
  if (score >= 60) return "text-green-500";
  if (score >= 40) return "text-yellow-500";
  return "text-red-500";
}

function getScoreBarColor(score: number): string {
  if (score >= 80) return "bg-blue-400";
  if (score >= 60) return "bg-green-400";
  if (score >= 40) return "bg-yellow-400";
  return "bg-red-400";
}

export default function ScoreCard({ score, comment, tips }: Props) {
  return (
    <div className="bg-white/80 dark:bg-gray-700/80 rounded-2xl p-4 text-center">
      <p className="text-xs text-blue-400 dark:text-blue-300 mb-1">洗濯スコア</p>
      <p className={`text-5xl font-medium ${getScoreColor(score)}`}>
        {score}
      </p>
      <p className="text-xs text-blue-300 dark:text-blue-400 mb-2">/ 100点</p>
      <div className="w-full bg-gray-100 dark:bg-gray-600 rounded-full h-2 mb-2">
        <div
          className={`h-2 rounded-full transition-all ${getScoreBarColor(score)}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <p className="text-sm text-blue-800 dark:text-blue-100 font-medium">{comment}</p>
      {tips.length > 0 && (
        <div className="bg-blue-50 dark:bg-gray-600 rounded-2xl p-3 space-y-1 mt-2">
          {tips.map((tip) => (
            <p key={tip} className="text-xs text-blue-600 dark:text-blue-300">
              💡 {tip}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}