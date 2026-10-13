import type { Metadata } from 'next';
import { Be_Vietnam_Pro, Space_Grotesk } from 'next/font/google';

// Outfit (the site-wide body font) has no Vietnamese subset, so this route
// re-points the font CSS variables to fonts that ship Vietnamese glyphs.
// Scoped to this route only; the rest of the site is unchanged.
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
});

const spaceGroteskVi = Space_Grotesk({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Gói chăm sóc website',
  description:
    'Gói chăm sóc website hằng tháng: theo dõi web còn hoạt động, gia hạn SSL, nhắc hạn tên miền, kiểm tra nút gọi/Zalo/email, sao lưu và báo cáo mỗi tháng. Từ 300.000đ/tháng, dừng bất cứ lúc nào.',
  openGraph: {
    title: 'Gói chăm sóc website',
    description:
      'Web luôn chạy, nút gọi luôn đúng, khách luôn liên lạc được. Từ 300.000đ/tháng.',
    locale: 'vi_VN',
    type: 'website',
  },
};

export default function ChamSocWebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      lang="vi"
      className={`${beVietnamPro.variable} ${spaceGroteskVi.variable} font-sans`}
    >
      {children}
    </div>
  );
}
