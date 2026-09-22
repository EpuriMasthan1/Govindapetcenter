import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { CTASection } from '@/components/Sections';
import { BUSINESS } from '@/lib/constants';

const FAQS = [
  {
    q: 'What pets do you care for?',
    a: 'We currently provide services for dogs and cats.',
  },
  {
    q: 'How can I book pet care?',
    a: 'You can submit the online booking form or contact us through WhatsApp or phone.',
  },
  {
    q: 'How many days can I book pet care for?',
    a: 'You can enter the number of days required in the booking form. Our team will confirm availability.',
  },
  {
    q: 'Do you provide pet pickup and drop?',
    a: 'Yes, pickup and drop services are available for eligible bookings.',
  },
  {
    q: 'Do you provide pet transport?',
    a: 'Yes, we provide place-to-place pet transport support within our service area.',
  },
  {
    q: 'Is pet care available 24/7?',
    a: 'We provide 24/7 pet-care assistance. Contact us to confirm availability for your specific requirement.',
  },
  {
    q: 'Do new customers get free pickup and drop?',
    a: 'New customers may receive FREE pickup and drop for their first eligible pet-care booking. Contact us for applicable terms and availability.',
  },
  {
    q: 'Do you provide free food for pets?',
    a: 'Eligible pet-care bookings include free curd rice for pets.',
  },
  {
    q: 'Where is Govinda Pet Center located?',
    a: BUSINESS.address,
  },
  {
    q: 'How can I contact Govinda Pet Center?',
    a: `WhatsApp: ${BUSINESS.whatsapp}\nPhone: ${BUSINESS.phone}\nEmail: ${BUSINESS.email}`,
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card overflow-hidden p-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
      >
        <span className="font-semibold text-stone-800">{q}</span>
        <ChevronDown
          className={`h-5 w-5 flex-shrink-0 text-green-600 transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      {open && (
        <div className="px-6 pb-4 text-stone-600 whitespace-pre-line">{a}</div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-green-50 to-stone-50 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
          <h1 className="text-3xl font-bold text-stone-800 sm:text-4xl">FAQ</h1>
          <p className="mt-4 text-lg text-stone-600">
            Frequently asked questions about Govinda Pet Center
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl space-y-4 px-4 lg:px-8">
          {FAQS.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
