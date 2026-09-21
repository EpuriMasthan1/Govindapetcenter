import { PawPrint, Heart, Target, ShieldCheck } from 'lucide-react';
import { PET_IMAGES } from '@/lib/constants';
import { SectionHeading, CTASection } from '@/components/Sections';

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-green-50 to-stone-50 py-16">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <SectionHeading
            title="About Govinda Pet Center"
            subtitle="Caring pet care in Tirupati for dogs and cats"
            center
          />
          <p className="mt-6 text-lg leading-relaxed text-stone-600">
            Govinda Pet Center is a pet caring center in Tirupati providing convenient and caring services for dogs and cats. Our goal is to make pet care easier for pet parents by providing reliable support, pet transportation, pickup and drop services, pet food and supplies, pet sitting, boarding, and day-to-day pet care assistance.
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="card text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
                <Heart className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="mt-4 font-bold text-stone-800">Caring</h3>
              <p className="mt-2 text-sm text-stone-600">We treat every pet with love and attention.</p>
            </div>
            <div className="card text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100">
                <Target className="h-7 w-7 text-amber-600" />
              </div>
              <h3 className="mt-4 font-bold text-stone-800">Reliable</h3>
              <p className="mt-2 text-sm text-stone-600">Dependable support for pet parents in Tirupati.</p>
            </div>
            <div className="card text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
                <ShieldCheck className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="mt-4 font-bold text-stone-800">Safe</h3>
              <p className="mt-2 text-sm text-stone-600">Focus on pet safety and comfort at all times.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-16">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <div className="overflow-hidden rounded-3xl shadow-lg">
            <img
              src={PET_IMAGES.dogCat2}
              alt="A friendly dog and cat together at Govinda Pet Center"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="mt-8 flex items-start gap-3 rounded-2xl bg-amber-50 p-6">
            <PawPrint className="h-6 w-6 flex-shrink-0 text-amber-600" />
            <p className="text-sm text-stone-700">
              We do not provide veterinary treatment, surgery, diagnosis, or medical services. For medical concerns, please consult a qualified veterinarian.
            </p>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
