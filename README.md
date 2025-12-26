# Stripe Account Health Scoring

A dashboard that calculates a "credit score" for your Stripe account based on chargeback velocity, refund ratios, volume spikes, cross-border risk, and webhook failures. Helps merchants understand what Stripe might flag next.

## Why Stripe Would Care

- **Early fraud detection** - Identifies problematic patterns before they escalate
- **Prevents last-minute account shutdowns** - Gives merchants time to fix issues
- **Helps Stripe intervene before disaster** - Reduces support burden
- **Fills the gap** - Stripe acts after problems escalate, this provides early warning

## Features

- 📊 **Health Score**: Overall account health score (0-100)
- 📈 **Multiple Metrics**: Chargebacks, refunds, volume spikes, cross-border risk, webhook failures
- 🚨 **Predictive Alerts**: Warns about issues Stripe might flag
- 📉 **Historical Trends**: Track health over time

## Installation

```bash
npm install
npm run dev
```

## Usage

Set `STRIPE_SECRET_KEY` in `.env.local` and visit `http://localhost:3000`.

## Metrics

- **Chargeback Velocity**: Rate of chargebacks vs total charges
- **Refund Ratio**: Percentage of revenue lost to refunds
- **Volume Spikes**: Detects sudden increases in transaction volume
- **Cross-Border Risk**: Percentage of transactions from different countries
- **Webhook Failures**: Rate of failed webhook deliveries

## License

MIT

