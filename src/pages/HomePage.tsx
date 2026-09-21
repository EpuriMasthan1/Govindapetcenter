import { Link } from 'react-router-dom';
import {
  MessageCircle,
  Phone,
  CalendarPlus,
  Clock,
  Gift,
  Car,
  Utensils,
  PawPrint,
  Dog,
  Cat,
  Home,
  Truck,
  ShoppingBag,
  HeartHandshake,
  ShieldCheck,
  MapPin,
  ChevronRight,
} from 'lucide-react';
import { BUSINESS, PET_IMAGES } from '@/lib/constants';
import {
  buildSimpleWhatsAppUrl,
  buildTelUrl,
} from '@/lib/notifications';
import { SectionHeading, CTASection } from '@/components/Sections';

const OFFERS = [
  {
    icon: Gift,
    emoji: '🎉',
    title: 'First Booking FREE for New Customers',
    desc: 'New customers can enjoy a free first eligible pet-care booking.',
    note: 'Offer subject to service availability and applicable terms. Call us for details.',
    cta: 'Book Your First Service',
    link: '/book',
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

const SERVICES_PREVIEW = [
  { icon: Dog, name: 'Dog Care', desc: 'Friendly and responsible care for dogs with attention to comfort and safety.' },
  { icon: Cat, name: 'Cat Care', desc: 'Comfortable and caring support for cats.' },
  { icon: Home, name: 'Pet Sitting', desc: 'Care and supervision for pets when owners need support.' },
  { icon: PawPrint, name: 'Pet Boarding', desc: 'Boarding support based on availability and requirements.' },
  { icon: Car, name: 'Pet Pickup & Drop', desc: 'Convenient pickup and drop services for eligible pet-care requirements.' },
  { icon: Truck, name: 'Place-to-Place Pet Transport', desc: 'Transportation support for pets within the service area.' },
  { icon: ShoppingBag, name: 'Pet Food & Supplies', desc: 'Pet food and selected essential supplies for dogs and cats.' },
  { icon: HeartHandshake, name: 'Basic Pet Care Support', desc: 'General day-to-day pet care assistance.' },
];

const WHY_CHOOSE = [
  '24/7 pet-care support',
  'Dog and cat care',
  'Easy online booking',
  'WhatsApp support',
  'Convenient pickup and drop',
  'Pet transportation',
  'Free curd rice for eligible bookings',
  'First booking offer for new customers',
  'Local service in Tirupati',
  'Focus on pet safety and comfort',
];

const STEPS = [
  { num: 1, title: 'Contact Us', desc: 'Tell us what your pet needs.' },
  { num: 2, title: 'Submit Booking', desc: 'Provide your pet and care details.' },
  { num: 3, title: 'We Confirm', desc: 'Our team contacts you to confirm availability.' },
  { num: 4, title: 'We Care for Your Pet', desc: 'Your pet receives caring and responsible support.' },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-stone-50 to-amber-50">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 lg:grid-cols-2 lg:px-8 lg:py-20">
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-1.5 text-sm font-medium text-green-700">
              <PawPrint className="h-4 w-4" />
              Dog &amp; Cat Care Center in Tirupati
            </span>
            <h1 className="mt-4 text-4xl font-bold text-stone-800 sm:text-5xl">
              24/7 Caring for Your Pets <span className="text-red-500">&#10084;</span>
            </h1>
            <p className="mt-3 text-xl font-semibold text-green-700">
              Trusted Dog &amp; Cat Care Center in Tirupati
            </p>
            <p className="mt-4 max-w-lg text-base text-stone-600">
              At Govinda Pet Center, we provide caring, convenient and reliable support for dogs and cats. Book pet care easily and let us take care of your pet with love and attention.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link to="/book" className="btn-primary">
                <CalendarPlus className="h-5 w-5" />
                Book Pet Care
              </Link>
              <a
                href={buildSimpleWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Us
              </a>
              <a href={buildTelUrl()} className="btn-call">
                <Phone className="h-5 w-5" />
                Call Us
              </a>
            </div>
          </div>
          <div className="relative animate-fade-in-up">
            <div className="overflow-hidden rounded-3xl shadow-2xl ring-4 ring-white/60">
              <img
                src={PET_IMAGES.hero}
                alt="A happy dog and cat together, representing pet care at Govinda Pet Center"
                className="h-full w-full object-cover"
                loading="eager"
                width={940}
                height={650}
              />
            </div>
            <div className="absolute -bottom-4 -left-4 hidden rounded-2xl bg-white p-4 shadow-lg sm:block">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-600" />
                <span className="text-sm font-semibold text-stone-700">Open 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 24/7 Pet Care Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100">
            <Clock className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-stone-800 sm:text-4xl">
            24/7 Pet Care &amp; Support
          </h2>
          <p className="mt-4 text-lg text-stone-600">
            Need pet care at any time? Govinda Pet Center provides 24/7 pet-care assistance so pet parents can contact us whenever they need support.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href={buildSimpleWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <MessageCircle className="h-5 w-5" />
              Chat on WhatsApp
            </a>
            <a href={buildTelUrl()} className="btn-call">
              <Phone className="h-5 w-5" />
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Offers */}
      <section className="bg-stone-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            title="Special Offers"
            subtitle="Enjoy these benefits when you book with Govinda Pet Center"
            center
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {OFFERS.map((offer) => (
              <div key={offer.title} className="card flex flex-col">
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-amber-100 text-2xl">
                  {offer.emoji}
                </div>
                <h3 className="text-lg font-bold text-stone-800">{offer.title}</h3>
                <p className="mt-2 flex-1 text-sm text-stone-600">{offer.desc}</p>
                {offer.note && (
                  <p className="mt-2 text-xs text-stone-400">{offer.note}</p>
                )}
                {offer.cta && offer.link && (
                  <Link
                    to={offer.link}
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

      {/* Services Preview */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            title="Our Services"
            subtitle="Caring services for dogs and cats in Tirupati"
            center
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES_PREVIEW.map((s) => (
              <div key={s.name} className="card flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-green-100">
                  <s.icon className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-800">{s.name}</h3>
                  <p className="mt-1 text-sm text-stone-600">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/services" className="btn-outline">
              View All Services
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-stone-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            title="How It Works"
            subtitle="Getting pet care is simple and easy"
            center
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <div key={step.num} className="card text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-xl font-bold text-white">
                  {step.num}
                </div>
                <h3 className="mt-4 font-bold text-stone-800">{step.title}</h3>
                <p className="mt-2 text-sm text-stone-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <SectionHeading
            title="Why Choose Govinda Pet Center"
            center
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {WHY_CHOOSE.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-xl bg-stone-50 px-4 py-3">
                <ShieldCheck className="h-5 w-5 flex-shrink-0 text-green-600" />
                <span className="text-sm font-medium text-stone-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Find Us Preview */}
      <section className="bg-stone-50 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
          <SectionHeading
            title="Find Govinda Pet Center"
            subtitle="Located in Tirupati, Andhra Pradesh"
            center
          />
          <div className="mt-6 flex items-center justify-center gap-2 text-stone-600">
            <MapPin className="h-5 w-5 text-green-600" />
            <span className="text-sm">{BUSINESS.address}</span>
          </div>
          <div className="mt-6">
            <a
              href={BUSINESS.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <MapPin className="h-5 w-5" />
              Open in Google Maps
            </a>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
