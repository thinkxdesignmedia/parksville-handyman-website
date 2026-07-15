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

    // Send email via Resend
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

    // Log quote to console (TODO: integrate with CRM/database later)
    console.log('Quote request received and emailed:', { name, phone, service, area });

    // Return success to user
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
