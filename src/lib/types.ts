import type { PET_SERVICES, BOOKING_STATUSES } from './constants';

export type PetService = typeof PET_SERVICES[number];
export type BookingStatus = typeof BOOKING_STATUSES[number];
export type PetType = 'Dog' | 'Cat';

export interface Booking {
  id?: string;
  booking_id?: string;
  customer_name: string;
  phone: string;
  whatsapp_number: string;
  email?: string | null;
  pet_name?: string | null;
  pet_type: PetType;
  breed: string;
  num_pets: number;
  num_days: number;
  start_date: string;
  end_date?: string | null;
  services: PetService[];
  pickup_required: boolean;
  drop_required: boolean;
  pickup_address?: string | null;
  drop_address?: string | null;
  customer_address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  additional_requirements?: string | null;
  status?: BookingStatus;
  created_at?: string;
}

export interface BookingInput {
  customer_name: string;
  phone: string;
  whatsapp_number: string;
  email?: string | null;
  pet_name?: string | null;
  pet_type: PetType;
  breed: string;
  num_pets: number;
  num_days: number;
  start_date: string;
  end_date?: string | null;
  services: PetService[];
  pickup_required: boolean;
  drop_required: boolean;
  pickup_address?: string | null;
  drop_address?: string | null;
  customer_address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  additional_requirements?: string | null;
}
