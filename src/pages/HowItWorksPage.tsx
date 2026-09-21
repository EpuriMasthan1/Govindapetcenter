import { Phone, FileText, CheckCircle, Heart } from 'lucide-react';
import { CTASection } from '@/components/Sections';

const STEPS = [
  {
    num: 1,
    icon: Phone,
    title: 'Contact Us',
    desc: 'Tell us what your pet needs.',
  },
  {
    num: 2,
    icon: FileText,
    title: 'Submit Booking',
    desc: 'Provide your pet and care details.',
  },
  {
    num: 3,
    icon: CheckCircle,
    title: 'We Confirm',
    desc: 'Our team contacts you to confirm availability.',
  },
  {
    num: 4,
    icon: Heart,
    title: 'We Care for Your Pet',
    desc: 'Your pet receives caring and responsible support.',
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-green-50 to-stone-50 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
          <h1 className="text-3xl font-bold text-stone-800 sm:text-4xl">How It Works</h1>
          <p className="mt-4 text-lg text-stone-600">
            Getting pet care with Govinda Pet Center is simple and easy
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, idx) => (
              <div key={step.num} className="relative text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-white shadow-lg">
                  <step.icon className="h-7 w-7" />
                </div>
                <div className="mx-auto mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">
                  {step.num}
                </div>
                <h3 className="mt-3 font-bold text-stone-800">{step.title}</h3>
                <p className="mt-2 text-sm text-stone-600">{step.desc}</p>
                {idx < STEPS.length - 1 && (
                  <div className="absolute top-8 -right-4 hidden text-stone-300 lg:block">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
