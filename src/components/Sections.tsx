import { Link } from 'react-router-dom';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export function SectionHeading({ title, subtitle, center }: SectionHeadingProps) {
  return (
    <div className={center ? 'text-center' : ''}>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}

interface CTASectionProps {
  title?: string;
  description?: string;
}

export function CTASection({
  title = 'Ready to Book Pet Care?',
  description = 'Get in touch with Govinda Pet Center today. We are here to help with your dog and cat care needs in Tirupati.',
}: CTASectionProps) {
  return (
    <section className="bg-gradient-to-br from-green-600 to-green-700 py-16">
      <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
        <p className="mt-4 text-lg text-green-50">{description}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/book"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-green-700 shadow-lg transition hover:bg-green-50"
          >
            Book Pet Care
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/40 px-8 py-4 text-base font-semibold text-white transition hover:bg-white/10"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
