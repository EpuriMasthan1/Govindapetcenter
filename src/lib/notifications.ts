import { BUSINESS } from './constants';
import type { Booking } from './types';

const ADMIN_NUMBERS = ['917337204484', '917337242347'];

export function buildWhatsAppMessage(b: Partial<Booking>): string {
  const services = (b.services || []).join(', ');
  const petDetails = [
    `Pet Name: ${b.pet_name || 'Not specified'}`,
    `Pet Type: ${b.pet_type || ''}`,
    `Breed: ${b.breed || ''}`,
    `Number of Pets: ${b.num_pets || 1}`,
  ].join('\n');

  const bookingDetails = [
    `Service: ${services}`,
    `Preferred Start Date: ${b.start_date || ''}`,
    `Preferred End Date: ${b.end_date || 'N/A'}`,
    `Number of Care Days: ${b.num_days || ''}`,
    `Pickup Required: ${b.pickup_required ? 'Yes' : 'No'}`,
    `Drop Required: ${b.drop_required ? 'Yes' : 'No'}`,
    `Pickup Address: ${b.pickup_address || 'N/A'}`,
    `Drop Address: ${b.drop_address || 'N/A'}`,
  ].join('\n');

  const additionalInfo = b.additional_requirements?.trim()
    ? b.additional_requirements.trim()
    : 'None';

  return [
    '\uD83D\uDC3E *New Pet Booking Request \u2013 Govinda Pet Center*',
    '',
    '*Customer Details*',
    `Name: ${b.customer_name || ''}`,
    `Phone: ${b.phone || ''}`,
    `WhatsApp: ${b.whatsapp_number || ''}`,
    b.email ? `Email: ${b.email}` : '',
    '',
    '*Pet Details*',
    petDetails,
    '',
    '*Booking Details*',
    bookingDetails,
    '',
    '*Additional Information*',
    additionalInfo,
    '',
    `Booking ID: ${b.booking_id || 'Pending'}`,
  ]
    .filter((line) => line !== '')
    .join('\n');
}

export function buildWhatsAppUrl(b: Partial<Booking>): string {
  const msg = encodeURIComponent(buildWhatsAppMessage(b));
  return `https://wa.me/${BUSINESS.whatsappRaw}?text=${msg}`;
}

export function buildAdminWhatsAppUrls(b: Partial<Booking>): string[] {
  const msg = encodeURIComponent(buildWhatsAppMessage(b));
  return ADMIN_NUMBERS.map((num) => `https://wa.me/${num}?text=${msg}`);
}

export function buildSimpleWhatsAppUrl(): string {
  return `https://wa.me/${BUSINESS.whatsappRaw}`;
}

export function buildTelUrl(): string {
  return `tel:${BUSINESS.phoneRaw}`;
}

export function buildMailUrl(): string {
  return `mailto:${BUSINESS.email}`;
}

export function buildSmsMessage(b: Partial<Booking>): string {
  return `New Govinda Pet Center booking received. Booking ID: ${b.booking_id || 'Pending'}. Customer: ${b.customer_name || ''}. Phone: ${b.phone || ''}. Pet: ${b.pet_type || ''}/${b.breed || ''}. Care days: ${b.num_days || ''}.`;
}
