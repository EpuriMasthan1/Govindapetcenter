import { createClient } from "npm:@supabase/supabase-js@2";

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

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const booking: BookingData = await req.json();

    const adminWhatsApp = "917337204484";
    const adminPhone = "917337242347";

    // Build WhatsApp notification message
    const waMessage = [
      "New Govinda Pet Center Booking",
      "",
      `Booking ID: ${booking.booking_id || "Pending"}`,
      `Customer Name: ${booking.customer_name}`,
      `Phone: ${booking.phone}`,
      `WhatsApp: ${booking.whatsapp_number}`,
      `Pet Name: ${booking.pet_name || "Not specified"}`,
      `Pet Type: ${booking.pet_type}`,
      `Breed: ${booking.breed}`,
      `Number of Pets: ${booking.num_pets}`,
      `Number of Care Days: ${booking.num_days}`,
      `Start Date: ${booking.start_date}`,
      `End Date: ${booking.end_date || "N/A"}`,
      `Services: ${booking.services.join(", ")}`,
      `Pickup: ${booking.pickup_required ? "Yes" : "No"}`,
      `Drop: ${booking.drop_required ? "Yes" : "No"}`,
      `Pickup Address: ${booking.pickup_address || "N/A"}`,
      `Drop Address: ${booking.drop_address || "N/A"}`,
      `Additional Requirements: ${booking.additional_requirements || "None"}`,
    ].join("\n");

    const waUrl = `https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(waMessage)}`;

    // Build SMS notification message
    const smsMessage = `New Govinda Pet Center booking received. Booking ID: ${booking.booking_id || "Pending"}. Customer: ${booking.customer_name}. Phone: ${booking.phone}. Pet: ${booking.pet_type}/${booking.breed}. Care days: ${booking.num_days}.`;

    // --- SMS sending ---
    // SMS provider credentials are configured as Supabase Edge Function secrets:
    //   SMS_API_KEY   - API key from your SMS provider (e.g. Twilio, MSG91, Fast2SMS)
    //   SMS_SENDER_ID - Sender ID registered with the SMS provider
    //   SMS_PROVIDER  - Which provider to use: "twilio", "msg91", or "fast2sms"
    //
    // To enable SMS, add these secrets in your Supabase dashboard under
    // Project Settings > Edge Functions > Secrets, then uncomment the sending code below.

    const smsApiKey = Deno.env.get("SMS_API_KEY");
    const smsSender = Deno.env.get("SMS_SENDER_ID");
    const smsProvider = Deno.env.get("SMS_PROVIDER");

    let smsSent = false;
    let smsError: string | null = null;

    if (smsApiKey && smsSender && smsProvider) {
      // --- MSG91 ---
      if (smsProvider === "msg91") {
        try {
          const resp = await fetch(`https://api.msg91.com/api/v2/sendsms`, {
            method: "POST",
            headers: {
              "authkey": smsApiKey,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              sender: smsSender,
              route: "4",
              country: "91",
              sms: [{ message: smsMessage, to: [adminPhone] }],
            }),
          });
          smsSent = resp.ok;
          if (!resp.ok) smsError = await resp.text();
        } catch (e) {
          smsError = e instanceof Error ? e.message : String(e);
        }
      }

      // --- Twilio ---
      if (smsProvider === "twilio") {
        try {
          const twilioSid = Deno.env.get("TWILIO_SID") || "";
          const twilioToken = Deno.env.get("TWILIO_TOKEN") || "";
          const twilioFrom = Deno.env.get("TWILIO_FROM") || smsSender;
          const auth = btoa(`${twilioSid}:${twilioToken}`);
          const resp = await fetch(
            `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`,
            {
              method: "POST",
              headers: {
                Authorization: `Basic ${auth}`,
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                From: twilioFrom,
                To: `+${adminPhone}`,
                Body: smsMessage,
              }),
            }
          );
          smsSent = resp.ok;
          if (!resp.ok) smsError = await resp.text();
        } catch (e) {
          smsError = e instanceof Error ? e.message : String(e);
        }
      }

      // --- Fast2SMS ---
      if (smsProvider === "fast2sms") {
        try {
          const resp = await fetch(
            `https://www.fast2sms.com/dev/bulkV2`,
            {
              method: "POST",
              headers: {
                authorization: smsApiKey,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                route: "q",
                message: smsMessage,
                numbers: adminPhone,
                sender_id: smsSender,
              }),
            }
          );
          smsSent = resp.ok;
          if (!resp.ok) smsError = await resp.text();
        } catch (e) {
          smsError = e instanceof Error ? e.message : String(e);
        }
      }
    } else {
      smsError = "SMS provider not configured. Set SMS_API_KEY, SMS_SENDER_ID, and SMS_PROVIDER secrets in Supabase.";
    }

    // Store the notification in the database for record
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    return new Response(
      JSON.stringify({
        success: true,
        whatsapp_url: waUrl,
        sms_sent: smsSent,
        sms_error: smsError,
        sms_message: smsMessage,
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
