import {
  Dog,
  Cat,
  Home,
  PawPrint,
  Car,
  Truck,
  ShoppingBag,
  HeartHandshake,
  Clock,
} from 'lucide-react';
import { CTASection } from '@/components/Sections';
import { PET_IMAGES } from '@/lib/constants';

const SERVICES = [
  { icon: Dog, name: 'Dog Care', desc: 'Friendly and responsible care for dogs with attention to comfort and safety.' },
  { icon: Cat, name: 'Cat Care', desc: 'Comfortable and caring support for cats.' },
  { icon: Home, name: 'Pet Sitting', desc: 'Care and supervision for pets when owners need support.' },
  { icon: PawPrint, name: 'Pet Boarding', desc: 'Boarding support based on availability and requirements.' },
  { icon: Car, name: 'Pet Pickup & Drop', desc: 'Convenient pickup and drop services for eligible pet-care requirements.' },
  { icon: Truck, name: 'Place-to-Place Pet Transport', desc: 'Transportation support for pets within the service area.' },
  { icon: ShoppingBag, name: 'Pet Food & Supplies', desc: 'Pet food and selected essential supplies for dogs and cats.' },
  { icon: HeartHandshake, name: 'Basic Pet Care Support', desc: 'General day-to-day pet care assistance.' },
  { icon: Clock, name: '24/7 Pet Care Assistance', desc: 'Round-the-clock pet-care assistance and contact support where available.' },
];

export default function ServicesPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-green-50 to-stone-50 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
          <h1 className="text-3xl font-bold text-stone-800 sm:text-4xl">Our Services</h1>
          <p className="mt-4 text-lg text-stone-600">
            Caring services for dogs and cats in Tirupati
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
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

          <div className="mt-10 rounded-2xl bg-amber-50 p-6">
            <p className="text-sm text-stone-700">
              <strong>Please note:</strong> Govinda Pet Center does not provide pet grooming, veterinary treatment, surgery, diagnosis, or medical treatment. For medical concerns, please consult a qualified veterinarian.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-16">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <div className="overflow-hidden rounded-3xl shadow-lg">
            <img
              src={PET_IMAGES.puppies}
              alt="Playful puppies at Govinda Pet Center"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
