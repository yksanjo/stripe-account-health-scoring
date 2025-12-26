import { stripe } from '../stripe';

export async function detectVolumeSpikes(days: number = 30): Promise<{ spike: boolean; current: number; average: number; increase: number }> {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - (days * 24 * 60 * 60);
  
  const charges = await stripe.charges.list({ limit: 100, created: { gte: startDate } });
  
  // Group by day
  const dailyVolume = new Map<number, number>();
  for (const charge of charges.data) {
    const day = Math.floor(charge.created / 86400) * 86400;
    dailyVolume.set(day, (dailyVolume.get(day) || 0) + charge.amount);
  }
  
  const volumes = Array.from(dailyVolume.values());
  const average = volumes.reduce((a, b) => a + b, 0) / volumes.length || 0;
  const current = volumes[volumes.length - 1] || 0;
  const increase = average > 0 ? ((current - average) / average) * 100 : 0;
  const spike = increase > 200; // 200% increase
  
  return { spike, current, average, increase };
}

