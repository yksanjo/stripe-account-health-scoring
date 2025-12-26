import { calculateChargebackVelocity } from './metrics/chargebackVelocity';
import { calculateRefundRatio } from './metrics/refundRatio';
import { detectVolumeSpikes } from './metrics/volumeSpikes';
import { calculateCrossBorderRisk } from './metrics/crossBorderRisk';
import { calculateWebhookFailureRate } from './metrics/webhookFailures';

export interface HealthScore {
  overall: number;
  metrics: {
    chargebackVelocity: { rate: number; count: number; amount: number; score: number };
    refundRatio: { ratio: number; refunds: number; charges: number; score: number };
    volumeSpikes: { spike: boolean; current: number; average: number; increase: number; score: number };
    crossBorderRisk: { risk: number; crossBorderCount: number; totalCount: number; score: number };
    webhookFailures: { rate: number; failures: number; total: number; score: number };
  };
  alerts: string[];
}

export async function calculateHealthScore(days: number = 30): Promise<HealthScore> {
  const [chargeback, refunds, volume, crossBorder, webhooks] = await Promise.all([
    calculateChargebackVelocity(days),
    calculateRefundRatio(days),
    detectVolumeSpikes(days),
    calculateCrossBorderRisk(days),
    calculateWebhookFailureRate(days),
  ]);

  const alerts: string[] = [];

  // Score each metric (0-100, higher is better)
  const chargebackScore = chargeback.rate > 1 ? 0 : chargeback.rate > 0.5 ? 50 : 100;
  const refundScore = refunds.ratio > 10 ? 0 : refunds.ratio > 5 ? 50 : 100;
  const volumeScore = volume.spike ? 30 : 100;
  const crossBorderScore = crossBorder.risk > 50 ? 50 : 100;
  const webhookScore = webhooks.rate > 10 ? 50 : 100;

  if (chargeback.rate > 1) alerts.push('High chargeback rate detected - Stripe may flag your account');
  if (refunds.ratio > 10) alerts.push('High refund ratio - may indicate product or service issues');
  if (volume.spike) alerts.push('Sudden volume spike detected - may trigger Stripe review');
  if (crossBorder.risk > 50) alerts.push('High cross-border transaction risk');
  if (webhooks.rate > 10) alerts.push('High webhook failure rate - may cause integration issues');

  const overall = Math.round(
    (chargebackScore * 0.3) +
    (refundScore * 0.25) +
    (volumeScore * 0.2) +
    (crossBorderScore * 0.15) +
    (webhookScore * 0.1)
  );

  return {
    overall,
    metrics: {
      chargebackVelocity: { ...chargeback, score: chargebackScore },
      refundRatio: { ...refunds, score: refundScore },
      volumeSpikes: { ...volume, score: volumeScore },
      crossBorderRisk: { ...crossBorder, score: crossBorderScore },
      webhookFailures: { ...webhooks, score: webhookScore },
    },
    alerts,
  };
}

