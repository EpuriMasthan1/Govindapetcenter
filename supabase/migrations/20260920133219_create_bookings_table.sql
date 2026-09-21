/*
# Create bookings table for Govinda Pet Center

1. Purpose
- Stores pet-care booking requests submitted by customers through the website.
- Each booking gets a unique human-readable Booking ID (e.g., GPC-20260920-0001).
- Admin dashboard reads and updates these records after authenticating.

2. New Tables
- `bookings`
  - `id` (uuid, primary key)
  - `booking_id` (text, unique, human-readable ID like GPC-YYYYMMDD-XXXX)
  - `customer_name` (text, required)
  - `phone` (text, required)
  - `whatsapp_number` (text, required)
  - `email` (text, optional)
  - `pet_name` (text, optional)
  - `pet_type` (text, required: 'Dog' or 'Cat')
  - `breed` (text, required)
  - `num_pets` (integer, required, min 1)
  - `num_days` (integer, required, min 1)
  - `start_date` (date, required)
  - `end_date` (date, optional)
  - `services` (text array, required)
  - `pickup_required` (boolean, default false)
  - `drop_required` (boolean, default false)
  - `pickup_address` (text, optional)
  - `drop_address` (text, optional)
  - `customer_address` (text, optional)
  - `latitude` (double precision, optional)
  - `longitude` (double precision, optional)
  - `additional_requirements` (text, optional)
  - `status` (text, default 'New', one of: New, Contacted, Confirmed, In Progress, Completed, Cancelled)
  - `created_at` (timestamptz, default now())

3. Security
- Enable RLS on `bookings`.
- INSERT: allow anon (public booking form) — WITH CHECK true so anyone can submit a booking.
- SELECT/UPDATE/DELETE: restricted to authenticated (admin) users only.
  - Customer booking data is NEVER publicly readable.
  - Only authenticated admin users can view or manage bookings.

4. Notes
- Booking ID is generated server-side via a sequence + function to ensure uniqueness.
- A SECURITY DEFINER function `generate_booking_id()` produces IDs like GPC-20260920-0001.
- An INSERT trigger auto-populates `booking_id` if not provided.
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id text UNIQUE,
  customer_name text NOT NULL,
  phone text NOT NULL,
  whatsapp_number text NOT NULL,
  email text,
  pet_name text,
  pet_type text NOT NULL CHECK (pet_type IN ('Dog', 'Cat')),
  breed text NOT NULL,
  num_pets integer NOT NULL CHECK (num_pets >= 1),
  num_days integer NOT NULL CHECK (num_days >= 1),
  start_date date NOT NULL,
  end_date date,
  services text[] NOT NULL DEFAULT '{}',
  pickup_required boolean NOT NULL DEFAULT false,
  drop_required boolean NOT NULL DEFAULT false,
  pickup_address text,
  drop_address text,
  customer_address text,
  latitude double precision,
  longitude double precision,
  additional_requirements text,
  status text NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Confirmed', 'In Progress', 'Completed', 'Cancelled')),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Allow public (anon) to INSERT bookings (the booking form is public)
DROP POLICY IF EXISTS "anon_insert_bookings" ON bookings;
CREATE POLICY "anon_insert_bookings" ON bookings FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Only authenticated (admin) users can SELECT bookings
DROP POLICY IF EXISTS "auth_select_bookings" ON bookings;
CREATE POLICY "auth_select_bookings" ON bookings FOR SELECT
  TO authenticated USING (true);

-- Only authenticated (admin) users can UPDATE bookings
DROP POLICY IF EXISTS "auth_update_bookings" ON bookings;
CREATE POLICY "auth_update_bookings" ON bookings FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

-- Only authenticated (admin) users can DELETE bookings
DROP POLICY IF EXISTS "auth_delete_bookings" ON bookings;
CREATE POLICY "auth_delete_bookings" ON bookings FOR DELETE
  TO authenticated USING (true);

-- Sequence for daily booking numbering
CREATE SEQUENCE IF NOT EXISTS booking_daily_seq;

-- Function to generate human-readable booking ID: GPC-YYYYMMDD-XXXX
CREATE OR REPLACE FUNCTION generate_booking_id()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  today_str text;
  seq_val integer;
  new_id text;
BEGIN
  today_str := to_char(now() AT TIME ZONE 'Asia/Kolkata', 'YYYYMMDD');
  seq_val := nextval('booking_daily_seq');
  new_id := 'GPC-' || today_str || '-' || lpad(seq_val::text, 4, '0');
  RETURN new_id;
END;
$$;

-- Trigger to auto-generate booking_id on insert
CREATE OR REPLACE FUNCTION set_booking_id()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NEW.booking_id IS NULL THEN
    NEW.booking_id := generate_booking_id();
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_set_booking_id ON bookings;
CREATE TRIGGER trg_set_booking_id
  BEFORE INSERT ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION set_booking_id();

-- Index for common queries
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings (status);
CREATE INDEX IF NOT EXISTS idx_bookings_booking_id ON bookings (booking_id);
