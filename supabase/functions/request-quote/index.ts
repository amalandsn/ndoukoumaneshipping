
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface QuoteRequest {
  fullName: string;
  email: string;
  phone: string;
  services: string[];
  from: string;
  to: string;
  volume: string;
  message?: string;
  language: 'fr' | 'en';
  file?: string; // base64 encoded file
  fileName?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const resendApiKey = Deno.env.get('RESEND_API_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const resend = new Resend(resendApiKey);

    const quoteData: QuoteRequest = await req.json();
    console.log('Received quote request:', {
      name: quoteData.fullName,
      email: quoteData.email,
      services: quoteData.services,
      hasFile: !!quoteData.file
    });

    // Generate unique quote ID
    const quoteId = `QTE-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    let fileUrl = null;

    // Handle file upload if present
    if (quoteData.file && quoteData.fileName) {
      try {
        // Remove the data URL prefix if present
        const base64Data = quoteData.file.replace(/^data:[^;]+;base64,/, '');
        const fileBuffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
        
        const filePath = `quotes/${quoteId}/${quoteData.fileName}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('quote-files')
          .upload(filePath, fileBuffer, {
            contentType: quoteData.fileName.endsWith('.pdf') ? 'application/pdf' : 'image/jpeg'
          });

        if (uploadError) {
          console.error('File upload error:', uploadError);
        } else {
          const { data: publicUrlData } = supabase.storage
            .from('quote-files')
            .getPublicUrl(filePath);
          fileUrl = publicUrlData.publicUrl;
        }
      } catch (fileError) {
        console.error('Error processing file:', fileError);
      }
    }

    // Insert quote into database
    const { data: insertData, error: insertError } = await supabase
      .from('quotes')
      .insert({
        id: quoteId,
        full_name: quoteData.fullName,
        email: quoteData.email,
        phone: quoteData.phone,
        services: quoteData.services,
        origin_location: quoteData.from,
        destination: quoteData.to,
        volume_weight: quoteData.volume,
        message: quoteData.message || '',
        file_url: fileUrl,
        language: quoteData.language
      })
      .select()
      .single();

    if (insertError) {
      throw new Error(`Database error: ${insertError.message}`);
    }

    // Send notification email to company
    const internalEmailHtml = `
      <h2>Nouvelle demande de devis</h2>
      <p><strong>Référence:</strong> ${quoteId}</p>
      <p><strong>Client:</strong> ${quoteData.fullName}</p>
      <p><strong>Email:</strong> ${quoteData.email}</p>
      <p><strong>Téléphone:</strong> ${quoteData.phone}</p>
      <p><strong>Services:</strong> ${quoteData.services.join(', ')}</p>
      <p><strong>Origine:</strong> ${quoteData.from}</p>
      <p><strong>Destination:</strong> ${quoteData.to}</p>
      <p><strong>Volume/Poids:</strong> ${quoteData.volume}</p>
      ${quoteData.message ? `<p><strong>Message:</strong> ${quoteData.message}</p>` : ''}
      ${fileUrl ? `<p><strong>Pièce jointe:</strong> <a href="${fileUrl}">Télécharger</a></p>` : ''}
      <p><strong>Langue:</strong> ${quoteData.language === 'fr' ? 'Français' : 'English'}</p>
    `;

    await resend.emails.send({
      from: 'Devis Ndoukoumane <no-reply@send.ndoukoumaneshipping.sn>',
      to: ['dionedieynaba@ndoukoumaneshipping.sn'],
      subject: `Nouvelle demande de devis - ${quoteId}`,
      html: internalEmailHtml,
    });

    // Send confirmation email to client
    const clientEmailHtml = quoteData.language === 'fr' ? `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e40af;">Demande de devis reçue</h2>
        <p>Bonjour ${quoteData.fullName},</p>
        <p>Nous avons bien reçu votre demande de devis avec la référence <strong>${quoteId}</strong>.</p>
        <p>Notre équipe va analyser votre demande et vous répondra dans les <strong>24 heures</strong>.</p>
        <div style="background-color: #f3f4f6; padding: 20px; margin: 20px 0; border-radius: 8px;">
          <h3 style="margin-top: 0;">Récapitulatif de votre demande :</h3>
          <p><strong>Services :</strong> ${quoteData.services.join(', ')}</p>
          <p><strong>Origine :</strong> ${quoteData.from}</p>
          <p><strong>Destination :</strong> ${quoteData.to}</p>
          <p><strong>Volume/Poids :</strong> ${quoteData.volume}</p>
        </div>
        <p>En attendant, n'hésitez pas à nous contacter au <strong>+221 77 402 18 25</strong> pour toute question urgente.</p>
        <p>Cordialement,<br>L'équipe Ndoukoumane Shipping & Services</p>
      </div>
    ` : `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e40af;">Quote request received</h2>
        <p>Hello ${quoteData.fullName},</p>
        <p>We have received your quote request with reference <strong>${quoteId}</strong>.</p>
        <p>Our team will analyze your request and respond within <strong>24 hours</strong>.</p>
        <div style="background-color: #f3f4f6; padding: 20px; margin: 20px 0; border-radius: 8px;">
          <h3 style="margin-top: 0;">Summary of your request:</h3>
          <p><strong>Services:</strong> ${quoteData.services.join(', ')}</p>
          <p><strong>Origin:</strong> ${quoteData.from}</p>
          <p><strong>Destination:</strong> ${quoteData.to}</p>
          <p><strong>Volume/Weight:</strong> ${quoteData.volume}</p>
        </div>
        <p>In the meantime, feel free to contact us at <strong>+221 77 402 18 25</strong> for any urgent questions.</p>
        <p>Best regards,<br>The Ndoukoumane Shipping & Services team</p>
      </div>
    `;

    await resend.emails.send({
      from: 'Ndoukoumane Shipping <no-reply@send.ndoukoumaneshipping.sn>',
      to: [quoteData.email],
      subject: quoteData.language === 'fr' ? 
        `Demande de devis reçue - ${quoteId}` : 
        `Quote request received - ${quoteId}`,
      html: clientEmailHtml,
    });

    console.log('Quote processed successfully:', quoteId);

    return new Response(JSON.stringify({ 
      success: true, 
      quoteId: quoteId,
      message: 'Quote request processed successfully'
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error("Error in request-quote function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
