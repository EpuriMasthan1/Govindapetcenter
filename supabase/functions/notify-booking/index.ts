const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface BookingData {
  booking_id?: string;
  customer_name: string;
  phone: string;
  whatsapp_number: string;
  email?: string;
  pet_name?: string;
  pet_type: string;
  breed: string;
  num_pets: number;
  num_days: number;
  start_date: string;
  end_date?: string;
  services: string[];
  pickup_required: boolean;
  drop_required: boolean;
  pickup_address?: string;
  drop_address?: string;
  additional_requirements?: string;
}

const ADMIN_NUMBERS = ["917337204484", "917337242347"];

function buildWhatsAppMessage(b: BookingData): string {
  const services = (b.services || []).join(", ");
  const petDetails = [
    `Pet Name: ${b.pet_name || "Not specified"}`,
    `Pet Type: ${b.pet_type || ""}`,
    `Breed: ${b.breed || ""}`,
    `Number of Pets: ${b.num_pets || 1}`,
  ].join("\n");

  const bookingDetails = [
    `Service: ${services}`,
    `Preferred Start Date: ${b.start_date || ""}`,
    `Preferred End Date: ${b.end_date || "N/A"}`,
    `Number of Care Days: ${b.num_days || ""}`,
    `Pickup Required: ${b.pickup_required ? "Yes" : "No"}`,
    `Drop Required: ${b.drop_required ? "Yes" : "No"}`,
    `Pickup Address: ${b.pickup_address || "N/A"}`,
    `Drop Address: ${b.drop_address || "N/A"}`,
  ].join("\n");

  const additionalInfo = b.additional_requirements?.trim()
    ? b.additional_requirements.trim()
    : "None";

  return [
    "*New Pet Booking Request - Govinda Pet Center*",
    "",
    "*Customer Details*",
    `Name: ${b.customer_name || ""}`,
    `Phone: ${b.phone || ""}`,
    `WhatsApp: ${b.whatsapp_number || ""}`,
    b.email ? `Email: ${b.email}` : "",
    "",
    "*Pet Details*",
    petDetails,
    "",
    "*Booking Details*",
    bookingDetails,
    "",
    "*Additional Information*",
    additionalInfo,
    "",
    `Booking ID: ${b.booking_id || "Pending"}`,
  ]
    .filter((line) => line !== "")
    .join("\n");
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const booking: BookingData = await req.json();

    const message = buildWhatsAppMessage(booking);
    const encodedMessage = encodeURIComponent(message);

    // Generate wa.me links for both admin numbers
    const adminLinks = ADMIN_NUMBERS.map(
      (num) => `https://wa.me/${num}?text=${encodedMessage}`
    );

    return new Response(
      JSON.stringify({
        success: true,
        whatsapp_urls: adminLinks,
        whatsapp_message: message,
        admin_numbers: ADMIN_NUMBERS,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        success: false,
        error: err instanceof Error ? err.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
