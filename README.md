# Stripe Account Health Scoring 🏥

[![GitHub stars](https://img.shields.io/github/stars/yksanjo/stripe-account-health-scoring?style=social)](https://github.com/yksanjo/stripe-account-health-scoring)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Stripe](https://img.shields.io/badge/Stripe-635BFF?logo=stripe&logoColor=white)](https://stripe.com/)

A dashboard that calculates a "credit score" for your Stripe account based on chargeback velocity, refund ratios, volume spikes, cross-border risk, and webhook failures. Helps merchants understand what Stripe might flag next.

## 📸 Screenshots

### Health Score Dashboard
![Health Score Dashboard](https://via.placeholder.com/1200x800/1F2937/FFFFFF?text=Account+Health+Score+Dashboard)

*Main dashboard showing overall health score and metric breakdown*

### Metric Cards
![Metric Cards](https://via.placeholder.com/1200x600/10B981/FFFFFF?text=Health+Metrics+Breakdown)

*Individual metric cards showing chargeback velocity, refund ratio, volume spikes, etc.*

### Alert Panel
![Alert Panel](https://via.placeholder.com/1200x400/EF4444/FFFFFF?text=Predictive+Alerts+and+Warnings)

*Alerts showing what Stripe might flag next*

*Note: Add actual screenshots after running the dashboard*

## 🎯 Why Stripe Would Care

- **Early fraud detection** - Identifies problematic patterns before they escalate
- **Prevents last-minute account shutdowns** - Gives merchants time to fix issues
- **Helps Stripe intervene before disaster** - Reduces support burden
- **Fills the gap** - Stripe acts after problems escalate, this provides early warning

## ✨ Features

- 📊 **Health Score**: Overall account health score (0-100)
- 📈 **Multiple Metrics**: Chargebacks, refunds, volume spikes, cross-border risk, webhook failures
- 🚨 **Predictive Alerts**: Warns about issues Stripe might flag
- 📉 **Historical Trends**: Track health over time
- 🎨 **Modern UI**: Beautiful dashboard with Tailwind CSS

## 📦 Installation

```bash
git clone https://github.com/yksanjo/stripe-account-health-scoring.git
cd stripe-account-health-scoring
npm install
```

## 🚀 Quick Start

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Add your Stripe key:
```
STRIPE_SECRET_KEY=sk_test_...
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## 📊 Metrics

### Chargeback Velocity
Rate of chargebacks vs total charges. High rates indicate potential fraud or service issues.

### Refund Ratio
Percentage of revenue lost to refunds. High ratios may indicate product or service problems.

### Volume Spikes
Detects sudden increases in transaction volume that may trigger Stripe review.

### Cross-Border Risk
Percentage of transactions from different countries. High percentages may indicate fraud risk.

### Webhook Failures
Rate of failed webhook deliveries. High rates may cause integration issues.

## 🔐 Permissions

Requires Stripe API key with read permissions for:
- `charges:read`
- `disputes:read`
- `refunds:read`
- `events:read`
- `account:read`

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
stripe-account-health-scoring/
├── app/
│   ├── api/
│   │   └── health-score/
│   │       └── route.ts
│   ├── page.tsx
│   └── layout.tsx
├── components/
│   ├── HealthScore.tsx
│   ├── MetricCard.tsx
│   └── AlertPanel.tsx
├── lib/
│   ├── metrics/
│   │   ├── chargebackVelocity.ts
│   │   ├── refundRatio.ts
│   │   ├── volumeSpikes.ts
│   │   ├── crossBorderRisk.ts
│   │   └── webhookFailures.ts
│   ├── scoreCalculator.ts
│   └── stripe.ts
└── package.json
```

## 🤝 Contributing

Contributions welcome! This tool helps merchants maintain healthy Stripe accounts.

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

MIT License

## 🔗 Related Projects

- [Stripe Integration Risk Scanner](https://github.com/yksanjo/stripe-integration-risk-scanner)
- [Stripe Revenue Leak Detector](https://github.com/yksanjo/stripe-revenue-leak-detector)
- [Stripe Compliance-as-Code](https://github.com/yksanjo/stripe-compliance-as-code)

## 📧 Support

For issues, questions, or contributions, please open an issue on GitHub.

---

**Made with ❤️ for the Stripe ecosystem**
