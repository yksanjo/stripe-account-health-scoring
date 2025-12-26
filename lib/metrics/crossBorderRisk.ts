import { stripe } from '../stripe';

export async function calculateCrossBorderRisk(days: number = 30): Promise<{ risk: number; crossBorderCount: number; totalCount: number }> {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - (days * 24 * 60 * 60);
  
  const charges = await stripe.charges.list({ limit: 100, created: { gte: startDate } });
  
  // Get account country
  const account = await stripe.account.retrieve();
  const accountCountry = account.country;
  
  let crossBorderCount = 0;
  for (const charge of charges.data) {
    const chargeCountry = charge.billing_details?.address?.country || 
                         charge.payment_method_details?.card?.country;
    if (chargeCountry && chargeCountry !== accountCountry) {
      crossBorderCount++;
    }
  }
  
  const risk = charges.data.length > 0 ? (crossBorderCount / charges.data.length) * 100 : 0;
  
  return { risk, crossBorderCount, totalCount: charges.data.length };
}

