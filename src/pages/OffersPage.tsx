import { Link } from 'react-router-dom';
import { Gift, Utensils, Car, Clock, ChevronRight } from 'lucide-react';
import { CTASection } from '@/components/Sections';

const OFFERS = [
  {
    icon: Gift,
    emoji: '🎉',
    title: 'First Pickup & Drop FREE',
    desc: 'New customers can enjoy FREE pickup and drop for their first eligible pet-care booking.',
    note: 'Offer subject to service availability and applicable terms. Call us for details.',
    cta: 'Book Your First Service',
  },
  {
    icon: Utensils,
    emoji: '🍚',
    title: 'Free Curd Rice for Pets',
    desc: 'Eligible pet-care bookings include free curd rice for your pet.',
  },
  {
    icon: Car,
    emoji: '🚗',
    title: 'Convenient Pet Pickup & Drop',
    desc: 'Convenient pickup and drop support for eligible bookings.',
  },
  {
    icon: Clock,
    emoji: '🕐',
    title: '24/7 Pet Care Assistance',
    desc: 'Pet-care support available around the clock.',
  },
];

export default function OffersPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-amber-50 to-stone-50 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
          <h1 className="text-3xl font-bold text-stone-800 sm:text-4xl">Special Offers</h1>
          <p className="mt-4 text-lg text-stone-600">
            Enjoy these benefits when you book pet care with Govinda Pet Center
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {OFFERS.map((offer) => (
              <div key={offer.title} className="card flex flex-col">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-3xl">
                  {offer.emoji}
                </div>
                <h3 className="text-xl font-bold text-stone-800">{offer.title}</h3>
                <p className="mt-2 flex-1 text-stone-600">{offer.desc}</p>
                {offer.note && (
                  <p className="mt-3 rounded-lg bg-stone-50 px-3 py-2 text-xs text-stone-500">
                    {offer.note}
                  </p>
                )}
                {offer.cta && (
                  <Link
                    to="/book"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-green-600 hover:text-green-700"
                  >
                    {offer.cta}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
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
