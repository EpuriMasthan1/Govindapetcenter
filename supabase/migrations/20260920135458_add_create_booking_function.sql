/*
# Add create_booking SECURITY DEFINER function

## Purpose
- The public booking form inserts via the anon role, which has INSERT but NOT SELECT on the bookings table (correctly, to keep booking data private).
- The Supabase client's `.insert().select().single()` pattern requires both INSERT and SELECT policies, so it fails for anon.
- This SECURITY DEFINER function performs the insert server-side and returns the newly created row (including the auto-generated booking_id) to the caller.
- The caller only gets back their own just-created row — they cannot query arbitrary bookings.

## Changes
1. New function `create_booking(p_booking jsonb)` — SECURITY DEFINER, returns the inserted bookings row.
2. Grants EXECUTE to anon and authenticated.
3. No changes to existing RLS policies or table structure.
*/

CREATE OR REPLACE FUNCTION create_booking(p_booking jsonb)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  inserted_row bookings%ROWTYPE;
BEGIN
  INSERT INTO bookings (
    customer_name, phone, whatsapp_number, email,
    pet_name, pet_type, breed, num_pets, num_days,
    start_date, end_date, services,
    pickup_required, drop_required,
    pickup_address, drop_address, customer_address,
    latitude, longitude, additional_requirements
  ) VALUES (
    p_booking->>'customer_name',
    p_booking->>'phone',
    p_booking->>'whatsapp_number',
    NULLIF(p_booking->>'email', ''),
    NULLIF(p_booking->>'pet_name', ''),
    p_booking->>'pet_type',
    p_booking->>'breed',
    (p_booking->>'num_pets')::integer,
    (p_booking->>'num_days')::integer,
    (p_booking->>'start_date')::date,
    NULLIF(p_booking->>'end_date', '')::date,
    ARRAY(SELECT jsonb_array_elements_text(p_booking->'services')),
    (p_booking->>'pickup_required')::boolean,
    (p_booking->>'drop_required')::boolean,
    NULLIF(p_booking->>'pickup_address', ''),
    NULLIF(p_booking->>'drop_address', ''),
    NULLIF(p_booking->>'customer_address', ''),
    NULLIF(p_booking->>'latitude', '')::double precision,
    NULLIF(p_booking->>'longitude', '')::double precision,
    NULLIF(p_booking->>'additional_requirements', '')
  )
  RETURNING * INTO inserted_row;

  RETURN jsonb_build_object(
    'id', inserted_row.id,
    'booking_id', inserted_row.booking_id,
    'customer_name', inserted_row.customer_name,
    'phone', inserted_row.phone,
    'whatsapp_number', inserted_row.whatsapp_number,
    'email', inserted_row.email,
    'pet_name', inserted_row.pet_name,
    'pet_type', inserted_row.pet_type,
    'breed', inserted_row.breed,
    'num_pets', inserted_row.num_pets,
    'num_days', inserted_row.num_days,
    'start_date', inserted_row.start_date,
    'end_date', inserted_row.end_date,
    'services', inserted_row.services,
    'pickup_required', inserted_row.pickup_required,
    'drop_required', inserted_row.drop_required,
    'pickup_address', inserted_row.pickup_address,
    'drop_address', inserted_row.drop_address,
    'customer_address', inserted_row.customer_address,
    'latitude', inserted_row.latitude,
    'longitude', inserted_row.longitude,
    'additional_requirements', inserted_row.additional_requirements,
    'status', inserted_row.status,
    'created_at', inserted_row.created_at
  );
END;
$$;

GRANT EXECUTE ON FUNCTION create_booking(jsonb) TO anon, authenticated;
