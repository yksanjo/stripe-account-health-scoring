'use client';

interface MetricCardProps {
  title: string;
  value: string | number;
  score: number;
  subtitle?: string;
}

export function MetricCard({ title, value, score, subtitle }: MetricCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      {subtitle && <div className="text-sm text-gray-500 mb-3">{subtitle}</div>}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className={`${getScoreColor(score)} h-2 rounded-full`} style={{ width: `${score}%` }}></div>
      </div>
      <div className="text-xs text-gray-500 mt-1">Score: {score}/100</div>
    </div>
  );
}

