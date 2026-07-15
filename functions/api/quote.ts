// Cloudflare Pages Function for handling quote form submissions
// This is a stub — wire up email service using Resend, SendGrid, or similar

export const onRequest: PagesFunction = async (context) => {
  if (context.request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const formData = await context.request.formData();

    // Extract form fields
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string | null;
    const service = formData.get('service') as string;
    const description = formData.get('description') as string;
    const area = formData.get('area') as string | null;

    // Validate required fields
    if (!name || !phone || !service) {
      return new Response('Missing required fields', { status: 400 });
    }

    // TODO: Wire up email service
    // Options:
    // 1. Resend (resend.com) — recommended for this use case
    // 2. SendGrid (sendgrid.com)
    // 3. Mailgun (mailgun.com)
    // 4. AWS SES

    // Example with Resend (requires RESEND_API_KEY environment variable):
    /*
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${context.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'quotes@parksvillehandyman.ca',
        to: 'info@parksvillehandyman.ca',
        reply_to: email || phone,
        subject: `New Quote Request: ${service}`,
        html: `
          <h2>New Quote Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          ${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
          <p><strong>Service:</strong> ${service}</p>
          ${area ? `<p><strong>Area:</strong> ${area}</p>` : ''}
          <p><strong>Description:</strong></p>
          <p>${description.replace(/\n/g, '<br>')}</p>
        `
      })
    });

    if (!response.ok) {
      console.error('Email send failed:', await response.text());
      return new Response('Failed to send quote request', { status: 500 });
    }
    */

    // TODO: Log to database for lead tracking
    // You may want to store leads in:
    // - D1 (Cloudflare's SQLite)
    // - Supabase
    // - Firebase
    // - Your own backend

    console.log('Quote request received:', { name, phone, service, area });

    // TODO: Remove this after email is wired up. For now, return success.
    // In production, you'll want to:
    // 1. Send email to business email
    // 2. Send confirmation email to customer (if email provided)
    // 3. Log to analytics/CRM

    // Redirect to thank you page or return JSON success
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Quote request submitted. We will contact you within 24 hours.'
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Form submission error:', error);
    return new Response('Internal server error', { status: 500 });
  }
};
