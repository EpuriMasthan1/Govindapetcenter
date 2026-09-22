import { useState, useMemo } from 'react';
import {
  CalendarPlus,
  Calendar,
  MapPin,
  Loader2,
  CheckCircle,
  MessageCircle,
  Phone,
  Mail,
  AlertCircle,
  Navigation,
} from 'lucide-react';
import { PET_SERVICES, BUSINESS } from '@/lib/constants';
import type { PetType, PetService, Booking } from '@/lib/types';
import { supabase } from '@/lib/supabase';
import { validateIndianPhone, addDays, formatDate } from '@/lib/utils';
import {
  buildWhatsAppUrl,
  buildTelUrl,
  buildMailUrl,
  buildAdminWhatsAppUrls,
} from '@/lib/notifications';
import LocationMap from '@/components/LocationMap';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

interface FormData {
  customer_name: string;
  phone: string;
  whatsapp_number: string;
  email: string;
  pet_name: string;
  pet_type: PetType | '';
  breed: string;
  num_pets: number;
  num_days: number;
  start_date: string;
  services: PetService[];
  pickup_required: boolean;
  drop_required: boolean;
  pickup_address: string;
  drop_address: string;
  customer_address: string;
  additional_requirements: string;
  consent: boolean;
}

const EMPTY_FORM: FormData = {
  customer_name: '',
  phone: '',
  whatsapp_number: '',
  email: '',
  pet_name: '',
  pet_type: '',
  breed: '',
  num_pets: 1,
  num_days: 1,
  start_date: '',
  services: [],
  pickup_required: false,
  drop_required: false,
  pickup_address: '',
  drop_address: '',
  customer_address: '',
  additional_requirements: '',
  consent: false,
};

export default function BookNowPage() {
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<Booking | null>(null);
  const [locationError, setLocationError] = useState('');
  const [userLat, setUserLat] = useState<number | null>(null);
  const [userLng, setUserLng] = useState<number | null>(null);
  const [locating, setLocating] = useState(false);

  const endDate = useMemo(() => {
    if (form.start_date && form.num_days > 0) {
      return addDays(form.start_date, form.num_days);
    }
    return '';
  }, [form.start_date, form.num_days]);

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  }

  function toggleService(service: PetService) {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  }

  function shareLocation() {
    setLocating(true);
    setLocationError('');
    if (!navigator.geolocation) {
      setLocationError('Location is not supported by your browser. Please enter your address manually.');
      setLocating(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLat(pos.coords.latitude);
        setUserLng(pos.coords.longitude);
        setLocating(false);
      },
      () => {
        setLocationError('Location permission was not provided. Please enter your pickup/service address manually.');
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.customer_name.trim()) e.customer_name = 'Customer name is required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    else if (!validateIndianPhone(form.phone)) e.phone = 'Please enter a valid Indian phone number';
    if (!form.whatsapp_number.trim()) e.whatsapp_number = 'WhatsApp number is required';
    else if (!validateIndianPhone(form.whatsapp_number)) e.whatsapp_number = 'Please enter a valid WhatsApp number';
    if (!form.pet_type) e.pet_type = 'Please select pet type';
    if (!form.breed.trim()) e.breed = 'Breed is required';
    if (!form.num_pets || form.num_pets < 1) e.num_pets = 'At least 1 pet is required';
    if (!form.num_days || form.num_days < 1) e.num_days = 'At least 1 day is required';
    if (!form.start_date) e.start_date = 'Start date is required';
    if (endDate && form.start_date && endDate < form.start_date) e.end_date = 'End date cannot be earlier than the start date';
    if (form.services.length === 0) e.services = 'Please select at least one service';
    if (form.pickup_required && !form.pickup_address.trim()) e.pickup_address = 'Pickup address is required';
    if (form.drop_required && !form.drop_address.trim()) e.drop_address = 'Drop-off address is required';
    if (!form.consent) e.consent = 'Please agree to be contacted';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) {
      const firstError = document.querySelector('[data-error="true"]');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setSubmitting(true);
    try {
      const bookingPayload = {
        customer_name: form.customer_name.trim(),
        phone: form.phone.trim(),
        whatsapp_number: form.whatsapp_number.trim(),
        email: form.email.trim() || '',
        pet_name: form.pet_name.trim() || '',
        pet_type: form.pet_type,
        breed: form.breed.trim(),
        num_pets: form.num_pets,
        num_days: form.num_days,
        start_date: form.start_date,
        end_date: endDate || '',
        services: form.services,
        pickup_required: form.pickup_required,
        drop_required: form.drop_required,
        pickup_address: form.pickup_required ? form.pickup_address.trim() : '',
        drop_address: form.drop_required ? form.drop_address.trim() : '',
        customer_address: form.customer_address.trim() || '',
        latitude: userLat != null ? String(userLat) : '',
        longitude: userLng != null ? String(userLng) : '',
        additional_requirements: form.additional_requirements.trim() || '',
      };

      const { data, error } = await supabase.rpc('create_booking', {
        p_booking: bookingPayload,
      });

      if (error) throw error;
      const bookingResult = data as unknown as Booking;
      setSuccess(bookingResult);

      // Send notification to admin (WhatsApp) via edge function
      try {
        await fetch(`${SUPABASE_URL}/functions/v1/notify-booking`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify(bookingResult),
        });
      } catch {
        // Notification failure should not block the booking confirmation
      }

      // Open admin WhatsApp notification links with booking details
      const adminLinks = buildAdminWhatsAppUrls(bookingResult);
      adminLinks.forEach((url) => window.open(url, '_blank', 'noopener,noreferrer'));

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unable to submit booking. Please try again or contact us on WhatsApp.';
      setErrors({ submit: msg });
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <section className="bg-gradient-to-br from-green-50 to-stone-50 py-16">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          <div className="card text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="mt-6 text-3xl font-bold text-stone-800">
              Booking Request Received! <span className="text-red-500">&#10084;</span>
            </h1>
            <p className="mt-4 text-stone-600">
              Thank you for choosing Govinda Pet Center! We have received your pet-care booking request successfully.
            </p>
            <div className="mt-6 rounded-xl bg-green-50 px-6 py-4">
              <p className="text-sm text-stone-500">Your Booking ID</p>
              <p className="mt-1 text-2xl font-bold text-green-700">
                {success.booking_id}
              </p>
            </div>
            <p className="mt-4 text-sm text-stone-600">
              Your booking is not confirmed yet. Our team will check the availability based on your requested dates and service.
            </p>
            <p className="mt-2 text-sm text-stone-600">
              To confirm your booking and check availability, please contact us through WhatsApp using the button below. Our team will assist you with the next steps.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href={buildWhatsAppUrl(success)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Govinda Pet Center
              </a>
              <a href={buildTelUrl()} className="btn-call">
                <Phone className="h-5 w-5" />
                Call Govinda Pet Center
              </a>
            </div>
            <div className="mt-4">
              <a href={buildMailUrl()} className="text-sm font-medium text-green-600 hover:text-green-700">
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-stone-50 py-12">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-stone-800 sm:text-4xl">Book Pet Care</h1>
          <p className="mt-3 text-stone-600">
            Fill in the details below and our team will contact you to confirm your booking.
          </p>
        </div>

        {errors.submit && (
          <div className="mt-6 flex items-center gap-3 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" data-error="true">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Customer Details */}
          <div className="card">
            <h2 className="text-lg font-bold text-stone-800">Customer Details</h2>
            <div className="mt-4 space-y-4">
              <Field label="Customer Name" required error={errors.customer_name}>
                <input
                  className="input-field"
                  value={form.customer_name}
                  onChange={(e) => update('customer_name', e.target.value)}
                  placeholder="Your full name"
                />
              </Field>
              <Field label="Phone Number" required error={errors.phone}>
                <input
                  className="input-field"
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  placeholder="10-digit mobile number"
                  inputMode="tel"
                />
              </Field>
              <Field label="WhatsApp Number" required error={errors.whatsapp_number}>
                <input
                  className="input-field"
                  value={form.whatsapp_number}
                  onChange={(e) => update('whatsapp_number', e.target.value)}
                  placeholder="WhatsApp number"
                  inputMode="tel"
                />
              </Field>
              <Field label="Email (Optional)">
                <input
                  className="input-field"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  placeholder="your@email.com"
                  inputMode="email"
                />
              </Field>
            </div>
          </div>

          {/* Pet Details */}
          <div className="card">
            <h2 className="text-lg font-bold text-stone-800">Pet Details</h2>
            <div className="mt-4 space-y-4">
              <Field label="Pet Name (Optional)">
                <input
                  className="input-field"
                  value={form.pet_name}
                  onChange={(e) => update('pet_name', e.target.value)}
                  placeholder="Your pet's name"
                />
              </Field>
              <Field label="Pet Type" required error={errors.pet_type}>
                <div className="flex gap-3">
                  {(['Dog', 'Cat'] as PetType[]).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => update('pet_type', t)}
                      className={`flex-1 rounded-xl border-2 px-4 py-3 font-semibold transition ${
                        form.pet_type === t
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-stone-200 text-stone-600 hover:border-stone-300'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="Breed" required error={errors.breed}>
                <input
                  className="input-field"
                  value={form.breed}
                  onChange={(e) => update('breed', e.target.value)}
                  placeholder="e.g. Labrador, Persian, etc."
                />
              </Field>
              <Field label="Number of Pets" required error={errors.num_pets}>
                <input
                  type="number"
                  min={1}
                  className="input-field"
                  value={form.num_pets}
                  onChange={(e) => update('num_pets', parseInt(e.target.value) || 1)}
                />
              </Field>
            </div>
          </div>

          {/* Care Details */}
          <div className="card">
            <h2 className="text-lg font-bold text-stone-800">Care Details</h2>
            <div className="mt-4 space-y-4">
              <Field label="Number of Days for Pet Care" required error={errors.num_days}>
                <input
                  type="number"
                  min={1}
                  className="input-field"
                  value={form.num_days}
                  onChange={(e) => update('num_days', parseInt(e.target.value) || 1)}
                />
              </Field>
              <Field label="Preferred Start Date" required error={errors.start_date}>
                <div className="relative">
                  <Calendar className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-green-600" />
                  <input
                    type="date"
                    className="input-field pl-10"
                    value={form.start_date}
                    onChange={(e) => update('start_date', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </Field>
              <Field label="Preferred End Date (Auto-calculated)" error={errors.end_date}>
                <div className="relative">
                  <Calendar className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-green-600" />
                  <input
                    type="date"
                    className="input-field bg-stone-50 pl-10"
                    value={endDate}
                    readOnly
                  />
                </div>
                {endDate && (
                  <p className="mt-1 text-xs text-stone-500">
                    {formatDate(form.start_date)} to {formatDate(endDate)} ({form.num_days} {form.num_days === 1 ? 'day' : 'days'})
                  </p>
                )}
              </Field>
              <Field label="Services Required" required error={errors.services}>
                <div className="grid gap-2 sm:grid-cols-2">
                  {PET_SERVICES.map((service) => (
                    <label
                      key={service}
                      className={`flex cursor-pointer items-center gap-2 rounded-xl border-2 px-3 py-2.5 text-sm font-medium transition ${
                        form.services.includes(service)
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-stone-200 text-stone-600 hover:border-stone-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={form.services.includes(service)}
                        onChange={() => toggleService(service)}
                        className="h-4 w-4 accent-green-600"
                      />
                      {service}
                    </label>
                  ))}
                </div>
              </Field>
            </div>
          </div>

          {/* Pickup & Drop */}
          <div className="card">
            <h2 className="text-lg font-bold text-stone-800">Pickup &amp; Drop</h2>
            <div className="mt-4 space-y-4">
              <Field label="Do you need pickup?">
                <div className="flex gap-3">
                  {['Yes', 'No'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => update('pickup_required', opt === 'Yes')}
                      className={`flex-1 rounded-xl border-2 px-4 py-3 font-semibold transition ${
                        (form.pickup_required ? 'Yes' : 'No') === opt
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-stone-200 text-stone-600 hover:border-stone-300'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </Field>
              {form.pickup_required && (
                <Field label="Pickup Address" required error={errors.pickup_address}>
                  <textarea
                    className="input-field"
                    value={form.pickup_address}
                    onChange={(e) => update('pickup_address', e.target.value)}
                    rows={2}
                    placeholder="Your pickup address"
                  />
                </Field>
              )}
              <Field label="Do you need drop-off?">
                <div className="flex gap-3">
                  {['Yes', 'No'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => update('drop_required', opt === 'Yes')}
                      className={`flex-1 rounded-xl border-2 px-4 py-3 font-semibold transition ${
                        (form.drop_required ? 'Yes' : 'No') === opt
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-stone-200 text-stone-600 hover:border-stone-300'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </Field>
              {form.drop_required && (
                <Field label="Drop-off Address" required error={errors.drop_address}>
                  <textarea
                    className="input-field"
                    value={form.drop_address}
                    onChange={(e) => update('drop_address', e.target.value)}
                    rows={2}
                    placeholder="Your drop-off address"
                  />
                </Field>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="card">
            <h2 className="text-lg font-bold text-stone-800">Your Location</h2>
            <p className="mt-2 text-sm text-stone-600">
              Share your location so we can see the distance, or enter your address manually.
            </p>
            <button
              type="button"
              onClick={shareLocation}
              disabled={locating}
              className="btn-outline mt-4 w-full sm:w-auto"
            >
              {locating ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <MapPin className="h-5 w-5" />
              )}
              {locating ? 'Getting location...' : 'Share My Location'}
            </button>
            {locationError && (
              <div className="mt-3 flex items-start gap-2 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-700">
                <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                {locationError}
              </div>
            )}
            {userLat != null && userLng != null && (
              <div className="mt-4">
                <LocationMap userLat={userLat} userLng={userLng} height="280px" />
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${BUSINESS.mapsUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                >
                  <Navigation className="h-4 w-4" />
                  Get Directions
                </a>
              </div>
            )}
            <Field label="Service Address (Optional)">
              <textarea
                className="input-field mt-3"
                value={form.customer_address}
                onChange={(e) => update('customer_address', e.target.value)}
                rows={2}
                placeholder="Enter your address manually if needed"
              />
            </Field>
          </div>

          {/* Additional Requirements */}
          <div className="card">
            <h2 className="text-lg font-bold text-stone-800">Additional Requirements</h2>
            <textarea
              className="input-field mt-4"
              value={form.additional_requirements}
              onChange={(e) => update('additional_requirements', e.target.value)}
              rows={4}
              placeholder="Tell us anything else we should know about your pet or booking..."
            />
          </div>

          {/* Consent */}
          <div className="card">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => update('consent', e.target.checked)}
                className="mt-1 h-5 w-5 flex-shrink-0 accent-green-600"
              />
              <span className="text-sm text-stone-700">
                I agree to be contacted by Govinda Pet Center regarding my pet-care booking.
              </span>
            </label>
            {errors.consent && (
              <p className="mt-2 text-sm text-red-600">{errors.consent}</p>
            )}
            <p className="mt-3 text-xs text-stone-500">
              Your information is collected to process your booking request and contact you regarding your pet-care requirements. Location sharing is optional.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full text-lg"
          >
            {submitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Submitting your booking...
              </>
            ) : (
              <>
                <CalendarPlus className="h-5 w-5" />
                Submit Booking
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div data-error={!!error}>
      <label className="block text-sm font-semibold text-stone-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
