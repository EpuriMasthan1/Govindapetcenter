import { BUSINESS } from './constants';
import type { Booking } from './types';

export function buildWhatsAppMessage(b: Partial<Booking>): string {
  const lines = [
    'New Govinda Pet Center Booking',
    '',
    `Booking ID: ${b.booking_id || 'Pending'}`,
    `Customer Name: ${b.customer_name || ''}`,
    `Phone: ${b.phone || ''}`,
    `WhatsApp: ${b.whatsapp_number || ''}`,
    `Pet Name: ${b.pet_name || 'Not specified'}`,
    `Pet Type: ${b.pet_type || ''}`,
    `Breed: ${b.breed || ''}`,
    `Number of Pets: ${b.num_pets || ''}`,
    `Number of Care Days: ${b.num_days || ''}`,
    `Start Date: ${b.start_date || ''}`,
    `End Date: ${b.end_date || 'N/A'}`,
    `Services: ${(b.services || []).join(', ')}`,
    `Pickup: ${b.pickup_required ? 'Yes' : 'No'}`,
    `Drop: ${b.drop_required ? 'Yes' : 'No'}`,
    `Pickup Address: ${b.pickup_address || 'N/A'}`,
    `Drop Address: ${b.drop_address || 'N/A'}`,
    `Additional Requirements: ${b.additional_requirements || 'None'}`,
  ];
  return lines.join('\n');
}

export function buildWhatsAppUrl(b: Partial<Booking>): string {
  const msg = encodeURIComponent(buildWhatsAppMessage(b));
  return `https://wa.me/${BUSINESS.whatsappRaw}?text=${msg}`;
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
