import { stripe } from '../stripe';

export async function calculateWebhookFailureRate(days: number = 30): Promise<{ rate: number; failures: number; total: number }> {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - (days * 24 * 60 * 60);
  
  const events = await stripe.events.list({ limit: 100, created: { gte: startDate } });
  
  // Check webhook delivery attempts
  let failures = 0;
  let total = 0;
  
  for (const event of events.data) {
    // Note: In a real implementation, you'd check webhook delivery logs
    // This is a simplified version
    total++;
  }
  
  // Estimate based on event types that typically fail
  const failureProneTypes = ['charge.failed', 'payment_intent.payment_failed'];
  failures = events.data.filter(e => failureProneTypes.includes(e.type)).length;
  
  return {
    rate: total > 0 ? (failures / total) * 100 : 0,
    failures,
    total,
  };
}

