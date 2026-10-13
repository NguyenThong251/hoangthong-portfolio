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
const ZALO_LABEL = 'Message on Zalo: +84 383 326 547';
const EASE = [0.33, 1, 0.68, 1] as const;
// Matches the 2s preloader in <Transition>, same as the other pages.
const HERO_DELAY = 2.1;

const problems = [
  {
    icon: ShieldAlert,
    title: 'Expired SSL certificate',
    description:
      'The browser shows a “Not secure” warning, and visitors leave right away.',
    color: '#EF4444',
  },
  {
    icon: PhoneOff,
    title: 'Broken call, Zalo and email buttons',
    description:
      'Wrong number or wrong address: customers tap, but can’t reach you.',
    color: '#F59E0B',
  },
  {
    icon: ServerCrash,
    title: 'Site down and the owner doesn’t know',
    description:
      'A 500/503 error or the host’s default page shows up instead of your website.',
    color: '#8B5CF6',
  },
  {
    icon: CalendarClock,
    title: 'Expiring domain, slower pages',
    description:
      'The domain is about to expire, and new uncompressed images make pages heavier over time.',
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
    name: 'Basic',
    price: '300,000 VND',
    yearly: '3,000,000 VND / year (2 months free)',
    summary: 'Daily checks for a small business website.',
    features: [
      'Daily uptime monitoring',
      'SSL monitoring + renewal',
      'Domain and hosting expiry reminders',
      'Monthly check of call, Zalo, email buttons and forms',
      'Monthly backup',
      '1-page monthly report',
      'Response within 48 hours',
    ],
  },
  {
    name: 'Standard',
    price: '600,000 VND',
    yearly: '6,000,000 VND / year (2 months free)',
    highlight: true,
    summary: 'Enough for most business websites, with updates and content edits.',
    features: [
      'Hourly monitoring, downtime alert within 1 hour',
      'Weekly check of call, Zalo, email buttons and forms',
      'Weekly backup',
      'Monthly WordPress and plugin updates (backup first)',
      'New image compression, monthly malware scan',
      'Small content edits: 1 hour / month',
      'Detailed report, response within 24 hours',
    ],
  },
  {
    name: 'Pro',
    price: '1,200,000 VND',
    yearly: '12,000,000 VND / year (2 months free)',
    summary: 'For online stores and sites that must stay up.',
    features: [
      'Monitoring every 15 minutes, downtime alert + immediate fix',
      'Daily backup',
      'Weekly WordPress and plugin updates',
      'Monthly PageSpeed test + light optimization',
      'Weekly scan for malware and injected links',
      'Small content edits: 3 hours / month',
      'Report + 15-minute call, 4-hour response',
    ],
  },
];

// true = included, false = not included, string = description
type Cell = boolean | string;
const comparison: { label: string; values: [Cell, Cell, Cell] }[] = [
  {
    label: 'Price / month',
    values: ['300,000 VND', '600,000 VND', '1,200,000 VND'],
  },
  {
    label: '12-month prepay',
    values: [
      '3,000,000 VND (2 months free)',
      '6,000,000 VND (2 months free)',
      '12,000,000 VND (2 months free)',
    ],
  },
  {
    label: 'Uptime monitoring',
    values: ['Daily', 'Hourly', 'Every 15 minutes'],
  },
  {
    label: 'Downtime alert',
    values: ['Same day', 'Within 1 hour', 'Within 15 minutes + immediate fix'],
  },
  {
    label: 'SSL certificate',
    values: ['Monitor + renew', 'Monitor + renew', 'Monitor + renew'],
  },
  { label: 'Domain and hosting expiry reminders', values: [true, true, true] },
  {
    label: 'Call, Zalo, email button and form checks',
    values: ['Monthly', 'Weekly', 'Weekly'],
  },
  { label: 'Backups', values: ['Monthly', 'Weekly', 'Daily'] },
  {
    label: 'WordPress, plugin and theme updates',
    values: [false, 'Monthly (backup first)', 'Weekly'],
  },
  {
    label: 'Google PageSpeed test',
    values: ['Quarterly', 'Monthly', 'Monthly + light optimization'],
  },
  { label: 'New image compression', values: [false, true, true] },
  {
    label: 'Small content edits (text, images, prices, phone numbers)',
    values: [false, '1 hour / month', '3 hours / month'],
  },
  {
    label: 'Malware and injected link scan',
    values: [false, 'Monthly', 'Weekly'],
  },
  {
    label: 'Report',
    values: ['1 page / month', 'Detailed / month', 'Detailed + 15-minute call'],
  },
  {
    label: 'Response time',
    values: ['48 hours', '24 hours', '4 hours (business hours)'],
  },
];

const exclusions = [
  {
    title: 'Redesigns, new pages or new features',
    detail:
      'Per the web build price list: landing page 2,500,000 VND, 3–5 page site 5,000,000 VND.',
  },
  {
    title: 'In-depth speed optimization',
    detail: 'Separate packages: 700,000 VND / 1,900,000 VND.',
  },
  {
    title: 'Domain, hosting and paid plugin fees',
    detail:
      'You pay the providers directly; I send renewal reminders and guidance.',
  },
  {
    title: 'Recovering a badly hacked site from before you signed up',
    detail: 'Quoted after I take a look.',
  },
];

const faqs = [
  {
    q: 'Is there a long-term contract?',
    a: 'No. Cancel anytime with 7 days’ notice. I hand back all backups and access.',
  },
  {
    q: 'What access do you need? Is it safe?',
    a: 'You create a separate admin account for me, so you never send your main account password over chat. When we finish, you simply delete that account.',
  },
  {
    q: 'How does payment work? Why prepay 12 months?',
    a: 'Pay by bank transfer at the start of each month. Prepay 12 months and get 2 months free. Unused content edit hours don’t roll over to the next month.',
  },
  {
    q: 'Are hosting and domain fees included?',
    a: 'No. You pay domain, hosting and paid plugin fees directly to the providers. I track the dates, remind you before they expire and guide you through renewal.',
  },
  {
    q: 'What if my site isn’t on WordPress?',
    a: 'Uptime monitoring, SSL, domain, call/Zalo/email buttons, speed and reports work for any website. WordPress and plugin updates apply to WordPress sites only; for other platforms, message me and we’ll talk it through.',
  },
];

function CellValue({ value }: { value: Cell }) {
  if (value === true)
    return (
      <Check className="mx-auto h-5 w-5 text-primary" aria-label="Included" />
    );
  if (value === false)
    return (
      <Minus
        className="mx-auto h-5 w-5 text-muted-foreground/60"
        aria-label="Not included"
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

export default function WebsiteCarePage() {
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
                Monthly service
              </motion.div>

              <motion.h1
                className="mb-6 font-heading text-4xl font-bold leading-tight sm:text-5xl md:text-7xl lg:text-8xl"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: HERO_DELAY }}
              >
                Website
                <br />
                <span className="text-primary">care plans</span>
              </motion.h1>

              <motion.p
                className="mb-10 max-w-2xl text-lg text-secondary-foreground md:text-xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: HERO_DELAY + 0.1 }}
              >
                Your website, always on. Call buttons that work. Customers who
                can reach you.
              </motion.p>

              <motion.div
                className="flex flex-col gap-3 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: HERO_DELAY + 0.2 }}
              >
                <a
                  href="#pricing"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-background px-6 py-4 font-medium text-foreground transition-transform hover:scale-[1.03]"
                >
                  See pricing
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
            text="Website care"
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
                  Why it matters
                </p>
                <h2 className="mb-6 font-heading text-3xl font-bold md:text-5xl">
                  Common <span className="text-primary">problems</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  After checking 180 small business websites (October 2026),
                  the most common problem wasn’t speed. It was{' '}
                  <strong className="text-foreground">
                    websites nobody was looking after
                  </strong>
                  .
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
                Business owners don’t have time to check all this. A care plan
                does it every day and reports back every month.
              </motion.p>
            </div>
          </section>

          {/* Pricing */}
          <section id="pricing" className="scroll-mt-24 bg-muted py-20 md:py-28">
            <div className="container mx-auto px-5 md:px-8">
              <motion.div
                className="mb-12 max-w-3xl"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <p className="mb-4 text-sm uppercase tracking-widest text-muted-foreground">
                  Pricing
                </p>
                <h2 className="mb-4 font-heading text-3xl font-bold md:text-5xl">
                  3 plans, <span className="text-primary">billed monthly</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Prepay 12 months and get 2 months free. No lock-in, cancel
                  anytime.
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
                        Recommended
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
                        / month
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
                      Choose {plan.name}
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
                  Full comparison
                </p>
                <h2 className="font-heading text-3xl font-bold md:text-5xl">
                  What each plan <span className="text-primary">covers</span>
                </h2>
                <p className="mt-4 text-sm text-muted-foreground md:hidden">
                  Swipe to see all 3 plans.
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
                        Feature
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
                              recommended
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
                  First-month offer
                </h2>
                <p className="text-lg text-background/90">
                  Before you sign up, I check your website for free. The
                  issues I find (wrong call button, expired SSL, broken email
                  link, broken images…){' '}
                  <strong className="text-background">I fix for free</strong>{' '}
                  when you sign up for Standard or higher.
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
                  Not included
                </h2>
                <p className="mb-6 text-muted-foreground">Quoted separately.</p>
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
                    FAQ
                  </p>
                  <h2 className="font-heading text-3xl font-bold md:text-5xl">
                    The short <span className="text-primary">terms</span>
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
                  I look after your website,
                  <br />
                  <span className="text-primary">you focus on selling.</span>
                </h2>
                <p className="mb-10 text-lg text-secondary-foreground">
                  Send me your website address and the plan you’re interested
                  in. I’ll recommend the right fit and send you the steps to get
                  started.
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
