
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormRequest {
  name: string;
  email: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message }: ContactFormRequest = await req.json();

    console.log('Received contact form submission:', { name, email, messageLength: message.length });

    // Send email to company using verified domain
    const emailResponse = await resend.emails.send({
      from: "Contact Form <contact@ndoukoumaneshipping.sn>",
      to: ["info@ndoukoumaneshipping.sn"],
      subject: `Nouveau message de contact - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">
            Nouveau message de contact
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #334155; margin-top: 0;">Informations du contact :</h3>
            <p><strong>Nom :</strong> ${name}</p>
            <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #334155;">Message :</h3>
            <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #1e40af; border-radius: 4px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 14px;">
            <p>Ce message a été envoyé depuis le formulaire de contact du site Ndoukoumane Shipping & Services.</p>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    // Send confirmation email to user using verified domain
    await resend.emails.send({
      from: "Ndoukoumane Shipping <noreply@ndoukoumaneshipping.sn>",
      to: [email],
      subject: "Confirmation de réception de votre message",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">
            Merci pour votre message
          </h2>
          
          <p>Bonjour ${name},</p>
          
          <p>Nous avons bien reçu votre message et nous vous remercions de nous avoir contactés.</p>
          
          <p>Notre équipe examinera votre demande et vous répondra dans les plus brefs délais.</p>
          
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Nos coordonnées :</h3>
            <p><strong>Téléphone bureau :</strong> +221 33 822 29 80</p>
            <p><strong>Urgence 24/7 :</strong> +221 77 402 18 25</p>
            <p><strong>Email :</strong> info@ndoukoumaneshipping.sn</p>
            <p><strong>Adresse :</strong> Central Park, face BNSP, Dakar</p>
          </div>
          
          <p>Cordialement,<br>
          <strong>L'équipe Ndoukoumane Shipping & Services</strong></p>
        </div>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
