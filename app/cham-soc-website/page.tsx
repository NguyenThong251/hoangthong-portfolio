'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Navbar } from '../components/navbar';
import { Transition } from '../components/transition';
import { Offcanvas, OffcanvasProvider } from '../components/offcanvas';
import { MarqueeText } from '../components/marquee-text';
import { personalInfo, socialMedias } from '../data';
import {
  ShieldAlert,
  PhoneOff,
  ServerCrash,
  CalendarClock,
  Check,
  Minus,
  MessageCircle,
  Mail,
  Gift,
  CircleOff,
  ChevronDown,
  ArrowUpRight,
} from 'lucide-react';

const ZALO_URL = 'https://zalo.me/0383326547';
const ZALO_LABEL = 'Nhắn Zalo 0383 326 547';
const EASE = [0.33, 1, 0.68, 1] as const;
// Matches the 2s preloader in <Transition>, same as the other pages.
const HERO_DELAY = 2.1;

const problems = [
  {
    icon: ShieldAlert,
    title: 'Chứng chỉ SSL hết hạn',
    description:
      'Trình duyệt báo “không an toàn”, khách thấy là thoát ra ngay.',
    color: '#EF4444',
  },
  {
    icon: PhoneOff,
    title: 'Nút gọi, Zalo, email gắn sai',
    description:
      'Sai số, sai địa chỉ: khách bấm nhưng không liên lạc được.',
    color: '#F59E0B',
  },
  {
    icon: ServerCrash,
    title: 'Web sập mà chủ không biết',
    description:
      'Lỗi 500/503 hoặc trang mặc định của hosting hiện ra thay cho website.',
    color: '#8B5CF6',
  },
  {
    icon: CalendarClock,
    title: 'Tên miền sắp hết hạn, web nặng dần',
    description:
      'Quên gia hạn tên miền; ảnh mới đăng chưa nén làm trang chậm dần theo thời gian.',
    color: '#3B82F6',
  },
];

type Plan = {
  name: string;
  price: string;
  yearly: string;
  highlight?: boolean;
  summary: string;
  features: string[];
};

const plans: Plan[] = [
  {
    name: 'Cơ bản',
    price: '300.000đ',
    yearly: '3.000.000đ / 12 tháng (tặng 2 tháng)',
    summary: 'Trông web mỗi ngày cho trang giới thiệu nhỏ.',
    features: [
      'Theo dõi web còn hoạt động mỗi ngày',
      'Theo dõi + gia hạn SSL',
      'Nhắc hạn tên miền, hosting',
      'Kiểm tra nút gọi, Zalo, email, form mỗi tháng',
      'Sao lưu mỗi tháng',
      'Báo cáo 1 trang / tháng',
      'Phản hồi trong 48 giờ',
    ],
  },
  {
    name: 'Tiêu chuẩn',
    price: '600.000đ',
    yearly: '6.000.000đ / 12 tháng (tặng 2 tháng)',
    highlight: true,
    summary: 'Đủ cho đa số website doanh nghiệp, có cập nhật và sửa nội dung.',
    features: [
      'Theo dõi mỗi giờ, báo sập trong 1 giờ',
      'Kiểm tra nút gọi, Zalo, email, form mỗi tuần',
      'Sao lưu mỗi tuần',
      'Cập nhật WordPress, plugin mỗi tháng (có backup trước)',
      'Nén ảnh mới đăng, quét mã độc mỗi tháng',
      'Sửa nội dung nhỏ 1 giờ / tháng',
      'Báo cáo chi tiết, phản hồi trong 24 giờ',
    ],
  },
  {
    name: 'Nâng cao',
    price: '1.200.000đ',
    yearly: '12.000.000đ / 12 tháng (tặng 2 tháng)',
    summary: 'Cho web bán hàng, web cần chạy liên tục.',
    features: [
      'Theo dõi mỗi 15 phút, báo sập + xử lý ngay',
      'Sao lưu mỗi ngày',
      'Cập nhật WordPress, plugin mỗi tuần',
      'Đo PageSpeed mỗi tháng + tối ưu nhẹ',
      'Quét mã độc, link lạ mỗi tuần',
      'Sửa nội dung nhỏ 3 giờ / tháng',
      'Báo cáo + gọi trao đổi 15 phút, phản hồi 4 giờ',
    ],
  },
];

// true = có, false = không, string = mô tả
type Cell = boolean | string;
const comparison: { label: string; values: [Cell, Cell, Cell] }[] = [
  { label: 'Giá / tháng', values: ['300.000đ', '600.000đ', '1.200.000đ'] },
  {
    label: 'Trả trước 12 tháng',
    values: [
      '3.000.000đ (tặng 2 tháng)',
      '6.000.000đ (tặng 2 tháng)',
      '12.000.000đ (tặng 2 tháng)',
    ],
  },
  {
    label: 'Theo dõi web còn hoạt động',
    values: ['Mỗi ngày', 'Mỗi giờ', 'Mỗi 15 phút'],
  },
  {
    label: 'Báo khi web sập',
    values: ['Trong ngày', 'Trong 1 giờ', 'Trong 15 phút + xử lý ngay'],
  },
  {
    label: 'Chứng chỉ bảo mật (SSL)',
    values: ['Theo dõi + gia hạn', 'Theo dõi + gia hạn', 'Theo dõi + gia hạn'],
  },
  { label: 'Nhắc hạn tên miền, hosting', values: [true, true, true] },
  {
    label: 'Kiểm tra nút gọi, Zalo, email, form',
    values: ['Mỗi tháng', 'Mỗi tuần', 'Mỗi tuần'],
  },
  { label: 'Sao lưu (backup)', values: ['Mỗi tháng', 'Mỗi tuần', 'Mỗi ngày'] },
  {
    label: 'Cập nhật WordPress, plugin, giao diện',
    values: [false, 'Mỗi tháng (có backup trước)', 'Mỗi tuần'],
  },
  {
    label: 'Đo tốc độ Google PageSpeed',
    values: ['Mỗi quý', 'Mỗi tháng', 'Mỗi tháng + tối ưu nhẹ'],
  },
  { label: 'Nén ảnh mới đăng', values: [false, true, true] },
  {
    label: 'Sửa nội dung nhỏ (chữ, ảnh, giá, số điện thoại)',
    values: [false, '1 giờ / tháng', '3 giờ / tháng'],
  },
  {
    label: 'Quét mã độc, link lạ bị chèn',
    values: [false, 'Mỗi tháng', 'Mỗi tuần'],
  },
  {
    label: 'Báo cáo',
    values: [
      '1 trang / tháng',
      'Chi tiết / tháng',
      'Chi tiết + gọi trao đổi 15 phút',
    ],
  },
  {
    label: 'Thời gian phản hồi',
    values: ['48 giờ', '24 giờ', '4 giờ (giờ hành chính)'],
  },
];

const exclusions = [
  {
    title: 'Làm lại giao diện, thêm trang/tính năng mới',
    detail:
      'Theo bảng giá làm web: landing 2.500.000đ, web 3–5 trang 5.000.000đ.',
  },
  {
    title: 'Tối ưu tốc độ chuyên sâu',
    detail: 'Gói riêng 700.000đ / 1.900.000đ.',
  },
  {
    title: 'Phí tên miền, hosting, plugin trả phí',
    detail:
      'Anh/chị tự thanh toán cho nhà cung cấp; em nhắc hạn và hướng dẫn.',
  },
  {
    title: 'Khôi phục web bị hack nặng trước khi đăng ký gói',
    detail: 'Báo giá sau khi xem.',
  },
];

const faqs = [
  {
    q: 'Có bị ràng buộc hợp đồng dài hạn không?',
    a: 'Không. Anh/chị dừng bất cứ lúc nào, chỉ cần báo trước 7 ngày. Em bàn giao lại toàn bộ bản sao lưu và quyền truy cập.',
  },
  {
    q: 'Em cần quyền truy cập gì? Có an toàn không?',
    a: 'Anh/chị tự tạo một tài khoản quản trị riêng cho em, không cần gửi mật khẩu tài khoản chính qua tin nhắn. Khi kết thúc, anh/chị chỉ cần xoá tài khoản đó.',
  },
  {
    q: 'Thanh toán thế nào? Trả 12 tháng có lợi gì?',
    a: 'Thanh toán đầu mỗi tháng bằng chuyển khoản. Trả trước 12 tháng được tặng 2 tháng. Giờ sửa nội dung không dùng hết không cộng dồn sang tháng sau.',
  },
  {
    q: 'Phí hosting, tên miền đã nằm trong gói chưa?',
    a: 'Chưa. Phí tên miền, hosting và plugin trả phí anh/chị thanh toán trực tiếp cho nhà cung cấp. Em theo dõi, nhắc hạn và hướng dẫn gia hạn.',
  },
  {
    q: 'Web không dùng WordPress thì sao?',
    a: 'Phần theo dõi web còn hoạt động, SSL, tên miền, nút gọi/Zalo/email, tốc độ và báo cáo áp dụng cho mọi website. Riêng mục cập nhật WordPress, plugin dành cho web WordPress; nền tảng khác anh/chị nhắn em để trao đổi cụ thể.',
  },
];

function CellValue({ value }: { value: Cell }) {
  if (value === true)
    return (
      <Check className="mx-auto h-5 w-5 text-primary" aria-label="Có" />
    );
  if (value === false)
    return (
      <Minus
        className="mx-auto h-5 w-5 text-muted-foreground/60"
        aria-label="Không"
      />
    );
  return <span>{value}</span>;
}

function ContactButtons({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <a
        href={ZALO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-medium transition-transform hover:scale-[1.03] ${
          dark ? 'bg-background text-foreground' : 'bg-foreground text-background'
        }`}
      >
        <MessageCircle className="h-5 w-5" />
        {ZALO_LABEL}
      </a>
      <a
        href={`mailto:${personalInfo.email}`}
        className={`inline-flex items-center justify-center gap-2 break-all rounded-full border px-6 py-4 text-base font-medium transition-colors ${
          dark
            ? 'border-background/40 text-background hover:border-background'
            : 'border-foreground text-foreground hover:bg-muted'
        }`}
      >
        <Mail className="h-5 w-5 shrink-0" />
        {personalInfo.email}
      </a>
    </div>
  );
}

export default function ChamSocWebsitePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <Transition>
      <OffcanvasProvider>
        <Offcanvas />
        <Navbar />
        <main className="min-h-screen" ref={containerRef}>
          {/* Hero */}
          <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-foreground pb-16 pt-32 text-background md:pb-20">
            <motion.div
              className="absolute right-0 top-40 h-64 w-64 rounded-full bg-primary/10 blur-3xl md:right-20"
              style={{ y }}
            />

            <div className="container relative mx-auto px-5 md:px-8">
              <motion.div
                className="mb-4 text-sm uppercase tracking-widest text-secondary-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: HERO_DELAY }}
              >
                Dịch vụ hằng tháng
              </motion.div>

              <motion.h1
                className="mb-6 font-heading text-4xl font-bold leading-tight sm:text-5xl md:text-7xl lg:text-8xl"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: HERO_DELAY }}
              >
                Gói chăm sóc
                <br />
                <span className="text-primary">website</span>
              </motion.h1>

              <motion.p
                className="mb-10 max-w-2xl text-lg text-secondary-foreground md:text-xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: HERO_DELAY + 0.1 }}
              >
                Web luôn chạy, nút gọi luôn đúng, khách luôn liên lạc được.
              </motion.p>

              <motion.div
                className="flex flex-col gap-3 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: HERO_DELAY + 0.2 }}
              >
                <a
                  href="#bang-gia"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-background px-6 py-4 font-medium text-foreground transition-transform hover:scale-[1.03]"
                >
                  Xem bảng giá
                  <ArrowUpRight className="h-5 w-5" />
                </a>
                <a
                  href={ZALO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-background/40 px-6 py-4 font-medium transition-colors hover:border-background"
                >
                  <MessageCircle className="h-5 w-5" />
                  {ZALO_LABEL}
                </a>
              </motion.div>
            </div>
          </section>

          <MarqueeText
            text="Chăm sóc website"
            bgColor="bg-primary"
            textColor="text-background"
          />

          {/* Problems */}
          <section className="py-20 md:py-28">
            <div className="container mx-auto px-5 md:px-8">
              <motion.div
                className="mb-12 max-w-3xl"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <p className="mb-4 text-sm uppercase tracking-widest text-muted-foreground">
                  Vì sao cần
                </p>
                <h2 className="mb-6 font-heading text-3xl font-bold md:text-5xl">
                  Vấn đề <span className="text-primary">thường gặp</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Khi kiểm tra 180 website doanh nghiệp nhỏ (10/2026), lỗi gặp
                  nhiều nhất không phải tốc độ mà là{' '}
                  <strong className="text-foreground">web không ai trông</strong>.
                </p>
              </motion.div>

              <div className="grid gap-5 sm:grid-cols-2">
                {problems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="rounded-2xl border border-border bg-background p-6 md:p-8"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <div
                      className="mb-5 inline-flex rounded-xl p-3"
                      style={{ backgroundColor: `${item.color}15` }}
                    >
                      <item.icon className="h-6 w-6" style={{ color: item.color }} />
                    </div>
                    <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </motion.div>
                ))}
              </div>

              <motion.p
                className="mt-10 max-w-3xl text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Chủ doanh nghiệp không có thời gian kiểm tra những thứ này. Gói
                chăm sóc làm việc đó mỗi ngày và báo lại mỗi tháng.
              </motion.p>
            </div>
          </section>

          {/* Pricing */}
          <section id="bang-gia" className="scroll-mt-24 bg-muted py-20 md:py-28">
            <div className="container mx-auto px-5 md:px-8">
              <motion.div
                className="mb-12 max-w-3xl"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <p className="mb-4 text-sm uppercase tracking-widest text-muted-foreground">
                  Bảng giá
                </p>
                <h2 className="mb-4 font-heading text-3xl font-bold md:text-5xl">
                  3 gói, <span className="text-primary">thu theo tháng</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Trả trước 12 tháng được tặng 2 tháng. Không ràng buộc, dừng
                  bất cứ lúc nào.
                </p>
              </motion.div>

              <div className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
                {plans.map((plan, index) => (
                  <motion.div
                    key={plan.name}
                    className={`relative flex flex-col rounded-2xl border p-6 md:p-8 ${
                      plan.highlight
                        ? 'border-foreground bg-foreground text-background shadow-xl lg:-my-4 lg:py-12'
                        : 'border-border bg-background'
                    }`}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {plan.highlight && (
                      <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-background md:left-8">
                        Khuyên dùng
                      </span>
                    )}
                    <h3 className="mb-2 font-heading text-2xl font-bold">
                      {plan.name}
                    </h3>
                    <p
                      className={`mb-6 ${
                        plan.highlight ? 'text-secondary-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      {plan.summary}
                    </p>
                    <div className="mb-1 flex flex-wrap items-baseline gap-x-2">
                      <span className="font-heading text-4xl font-bold sm:text-5xl lg:text-4xl xl:text-5xl">
                        {plan.price}
                      </span>
                      <span
                        className={
                          plan.highlight ? 'text-secondary-foreground' : 'text-muted-foreground'
                        }
                      >
                        / tháng
                      </span>
                    </div>
                    <p
                      className={`mb-8 text-sm ${
                        plan.highlight ? 'text-secondary-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      {plan.yearly}
                    </p>

                    <ul className="mb-8 space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex gap-3">
                          <Check
                            className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href={ZALO_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 font-medium transition-transform hover:scale-[1.03] ${
                        plan.highlight
                          ? 'bg-primary text-background'
                          : 'border border-foreground text-foreground'
                      }`}
                    >
                      Chọn gói {plan.name}
                      <ArrowUpRight className="h-5 w-5" />
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Comparison table */}
          <section className="py-20 md:py-28">
            <div className="container mx-auto px-5 md:px-8">
              <motion.div
                className="mb-10 max-w-3xl"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <p className="mb-4 text-sm uppercase tracking-widest text-muted-foreground">
                  So sánh chi tiết
                </p>
                <h2 className="font-heading text-3xl font-bold md:text-5xl">
                  Mỗi gói <span className="text-primary">làm những gì</span>
                </h2>
                <p className="mt-4 text-sm text-muted-foreground md:hidden">
                  Vuốt ngang bảng để xem đủ 3 gói.
                </p>
              </motion.div>

              <div className="max-w-full overflow-x-auto rounded-2xl border border-border">
                <table className="w-full min-w-[600px] md:min-w-[680px] border-collapse text-left text-sm md:text-base">
                  <thead>
                    <tr className="bg-muted">
                      <th
                        scope="col"
                        className="sticky left-0 z-10 w-36 bg-muted p-3 font-semibold md:w-[34%] md:p-4"
                      >
                        Quyền lợi
                      </th>
                      {plans.map((plan) => (
                        <th
                          key={plan.name}
                          scope="col"
                          className={`p-4 text-center font-heading font-bold ${
                            plan.highlight ? 'bg-foreground text-background' : ''
                          }`}
                        >
                          {plan.name}
                          {plan.highlight && (
                            <span className="block text-xs font-normal text-secondary-foreground">
                              khuyên dùng
                            </span>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((row) => (
                      <tr key={row.label} className="border-t border-border">
                        <th
                          scope="row"
                          className="sticky left-0 z-10 bg-background p-3 font-medium md:p-4"
                        >
                          {row.label}
                        </th>
                        {row.values.map((value, i) => (
                          <td
                            key={i}
                            className={`p-4 text-center ${
                              plans[i].highlight ? 'bg-primary/5 font-medium' : ''
                            }`}
                          >
                            <CellValue value={value} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* First month offer + exclusions */}
          <section className="pb-20 md:pb-28">
            <div className="container mx-auto grid gap-6 px-5 md:px-8 lg:grid-cols-2">
              <motion.div
                className="rounded-2xl bg-primary p-6 text-background md:p-10"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="mb-5 inline-flex rounded-xl bg-background/15 p-3">
                  <Gift className="h-6 w-6" />
                </div>
                <h2 className="mb-4 font-heading text-2xl font-bold md:text-4xl">
                  Ưu đãi tháng đầu
                </h2>
                <p className="text-lg text-background/90">
                  Trước khi đăng ký, em kiểm tra web của anh/chị miễn phí. Các
                  lỗi tìm thấy (nút gọi sai, SSL hết hạn, link email hỏng, ảnh
                  lỗi…){' '}
                  <strong className="text-background">em sửa miễn phí</strong>{' '}
                  khi anh/chị đăng ký gói từ Tiêu chuẩn trở lên.
                </p>
              </motion.div>

              <motion.div
                className="rounded-2xl border border-border bg-background p-6 md:p-10"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div className="mb-5 inline-flex rounded-xl bg-muted p-3">
                  <CircleOff className="h-6 w-6 text-muted-foreground" />
                </div>
                <h2 className="mb-2 font-heading text-2xl font-bold md:text-4xl">
                  Không bao gồm
                </h2>
                <p className="mb-6 text-muted-foreground">Báo giá riêng.</p>
                <ul className="space-y-4">
                  {exclusions.map((item) => (
                    <li key={item.title} className="border-b border-border pb-4 last:border-0 last:pb-0">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.detail}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-muted py-20 md:py-28">
            <div className="container mx-auto px-5 md:px-8">
              <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <p className="mb-4 text-sm uppercase tracking-widest text-muted-foreground">
                    Câu hỏi thường gặp
                  </p>
                  <h2 className="font-heading text-3xl font-bold md:text-5xl">
                    Điều khoản <span className="text-primary">ngắn gọn</span>
                  </h2>
                </motion.div>

                <div className="space-y-3">
                  {faqs.map((faq) => (
                    <details
                      key={faq.q}
                      className="group rounded-2xl border border-border bg-background p-5 md:p-6"
                    >
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-lg font-medium [&::-webkit-details-marker]:hidden">
                        {faq.q}
                        <ChevronDown className="mt-1 h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
                      </summary>
                      <p className="mt-4 text-muted-foreground">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="bg-foreground py-20 text-background md:py-28">
            <div className="container mx-auto px-5 md:px-8">
              <motion.div
                className="max-w-3xl"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="mb-6 font-heading text-3xl font-bold md:text-6xl">
                  Để em trông web,
                  <br />
                  <span className="text-primary">anh/chị lo bán hàng.</span>
                </h2>
                <p className="mb-10 text-lg text-secondary-foreground">
                  Nhắn em địa chỉ website và gói anh/chị quan tâm, em tư vấn gói
                  phù hợp và gửi hướng dẫn bắt đầu.
                </p>
                <ContactButtons dark />
              </motion.div>

              <div className="mt-16 flex flex-col gap-6 border-t border-secondary-foreground/20 pt-8 text-sm text-secondary-foreground md:flex-row md:items-center md:justify-between">
                <p>
                  © {new Date().getFullYear()} {personalInfo.name}
                </p>
                <div className="flex flex-wrap gap-4">
                  {socialMedias.map((social) => (
                    <a
                      key={social.title}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-offset-4 transition-colors hover:text-primary hover:underline"
                    >
                      {social.title}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </OffcanvasProvider>
    </Transition>
  );
}
