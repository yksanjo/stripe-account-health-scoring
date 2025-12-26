'use client';

interface HealthScoreProps {
  score: number;
}

export function HealthScore({ score }: HealthScoreProps) {
  const getColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className={`${getBgColor(score)} rounded-lg p-8 text-center`}>
      <div className={`text-6xl font-bold ${getColor(score)} mb-2`}>{score}</div>
      <div className="text-gray-700 text-lg">Account Health Score</div>
    </div>
  );
}

