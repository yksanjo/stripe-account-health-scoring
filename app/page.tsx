'use client';

import { useEffect, useState } from 'react';
import { HealthScore } from '@/components/HealthScore';
import { MetricCard } from '@/components/MetricCard';
import { AlertPanel } from '@/components/AlertPanel';

interface HealthScoreData {
  overall: number;
  metrics: any;
  alerts: string[];
}

export default function Home() {
  const [data, setData] = useState<HealthScoreData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/health-score?days=30')
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>;
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Account Health Score</h1>
        <div className="mb-8"><HealthScore score={data.overall} /></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <MetricCard title="Chargeback Velocity" value={`${data.metrics.chargebackVelocity.rate.toFixed(2)}%`} score={data.metrics.chargebackVelocity.score} subtitle={`${data.metrics.chargebackVelocity.count} chargebacks`} />
          <MetricCard title="Refund Ratio" value={`${data.metrics.refundRatio.ratio.toFixed(2)}%`} score={data.metrics.refundRatio.score} subtitle={`${data.metrics.refundRatio.refunds} refunds`} />
          <MetricCard title="Volume Spikes" value={data.metrics.volumeSpikes.spike ? '⚠️ Spike' : '✅ Normal'} score={data.metrics.volumeSpikes.score} />
          <MetricCard title="Cross-Border Risk" value={`${data.metrics.crossBorderRisk.risk.toFixed(1)}%`} score={data.metrics.crossBorderRisk.score} />
          <MetricCard title="Webhook Failures" value={`${data.metrics.webhookFailures.rate.toFixed(1)}%`} score={data.metrics.webhookFailures.score} />
        </div>
        <AlertPanel alerts={data.alerts} />
      </div>
    </div>
  );
}

