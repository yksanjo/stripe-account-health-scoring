import './globals.css';
export const metadata = { title: 'Stripe Account Health Scoring', description: 'Account health score for Stripe accounts' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}

