import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Website Care Plans',
  description:
    'Monthly website care: uptime monitoring, SSL renewal, domain expiry reminders, call/Zalo/email button checks, backups and a monthly report. From 300,000 VND / month, cancel anytime.',
  openGraph: {
    title: 'Website Care Plans',
    description:
      'Your website, always on. Call buttons that work. Customers who can reach you. From 300,000 VND / month.',
    locale: 'en_US',
    type: 'website',
  },
};

export default function WebsiteCareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
