import { stripe } from '../stripe';

export async function calculateChargebackVelocity(days: number = 30): Promise<{ rate: number; count: number; amount: number }> {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - (days * 24 * 60 * 60);
  
  const disputes = await stripe.disputes.list({ limit: 100, created: { gte: startDate } });
  const charges = await stripe.charges.list({ limit: 100, created: { gte: startDate } });
  
  const chargebackCount = disputes.data.filter(d => d.status === 'lost' || d.status === 'warning_needs_response').length;
  const totalCharges = charges.data.length;
  const chargebackAmount = disputes.data.reduce((sum, d) => sum + (d.amount || 0), 0);
  
  return {
    rate: totalCharges > 0 ? (chargebackCount / totalCharges) * 100 : 0,
    count: chargebackCount,
    amount: chargebackAmount,
  };
}

