import { stripe } from '../stripe';

export async function calculateRefundRatio(days: number = 30): Promise<{ ratio: number; refunds: number; charges: number }> {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - (days * 24 * 60 * 60);
  
  const refunds = await stripe.refunds.list({ limit: 100, created: { gte: startDate } });
  const charges = await stripe.charges.list({ limit: 100, created: { gte: startDate } });
  
  const refundAmount = refunds.data.reduce((sum, r) => sum + r.amount, 0);
  const chargeAmount = charges.data.filter(c => c.paid).reduce((sum, c) => sum + c.amount, 0);
  
  return {
    ratio: chargeAmount > 0 ? (refundAmount / chargeAmount) * 100 : 0,
    refunds: refunds.data.length,
    charges: charges.data.length,
  };
}

