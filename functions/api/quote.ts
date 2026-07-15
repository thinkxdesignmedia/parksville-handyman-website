// Cloudflare Pages Function for handling quote form submissions
// Features: Resend email, Turnstile CAPTCHA, honeypot, KV backup, BCC logging

export const onRequest: PagesFunction = async (context) => {
  if (context.request.method !== 'POST') {
    return new Response(JSON.stringify({ success: false, message: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
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
    const cfToken = formData.get('cf-turnstile-response') as string;
    const honeypot = formData.get('website') as string;

    // 1. Honeypot check (spam prevention)
    if (honeypot) {
      console.warn('Honeypot triggered - likely spam');
      // Return success to not reveal honeypot to bots
      return successResponse('Quote request submitted');
    }

    // 2. Validate required fields
    if (!name || !phone || !service) {
      return errorResponse('Missing required fields', 400);
    }

    // 3. Validate email format if provided
    if (email && !isValidEmail(email)) {
      return errorResponse('Invalid email address', 400);
    }

    // 4. Validate phone format (basic)
    if (!isValidPhone(phone)) {
      return errorResponse('Invalid phone number', 400);
    }

    // 5. Turnstile validation
    if (cfToken) {
      const turnstileValid = await validateTurnstile(cfToken, context.env.TURNSTILE_SECRET_KEY);
      if (!turnstileValid) {
        return errorResponse('CAPTCHA validation failed', 400);
      }
    }

    // 6. Prepare email content
    const emailHtml = `
      <h2>New Quote Request</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      ${email ? `<p><strong>Email:</strong> ${escapeHtml(email)}</p>` : ''}
      <p><strong>Service:</strong> ${escapeHtml(service)}</p>
      ${area ? `<p><strong>Area:</strong> ${escapeHtml(area)}</p>` : ''}
      <p><strong>Description:</strong></p>
      <p>${escapeHtml(description).replace(/\n/g, '<br>')}</p>
      <hr>
      <p style="font-size: 12px; color: #999;">Submitted at: ${new Date().toISOString()}</p>
    `;

    // 7. Send via Resend (primary notification)
    let emailSent = false;
    try {
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${context.env.RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: 'quotes@parksvillehandyman.ca',
          to: context.env.NOTIFY_EMAIL || 'info@parksvillehandyman.ca',
          bcc: context.env.BACKUP_EMAIL || 'backup@parksvillehandyman.ca',
          reply_to: email || phone,
          subject: `[Quote] ${service} - ${name}`,
          html: emailHtml
        })
      });

      if (resendResponse.ok) {
        emailSent = true;
      } else {
        console.error('Resend error:', await resendResponse.text());
      }
    } catch (e) {
      console.error('Resend fetch error:', e);
    }

    // 8. Backup to KV Store (redundancy)
    const kvKey = `quote-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const kvData = {
      timestamp: new Date().toISOString(),
      name,
      phone,
      email,
      service,
      area,
      description,
      emailSent
    };

    try {
      if (context.env.QUOTES_KV) {
        await context.env.QUOTES_KV.put(kvKey, JSON.stringify(kvData), {
          expirationTtl: 7776000 // 90 days
        });
      }
    } catch (e) {
      console.error('KV store error:', e);
    }

    // 9. Console log for monitoring
    console.log('Quote submitted:', { name, service, emailSent, kvKey });

    return successResponse('Quote request submitted. We will contact you within 24 hours.');
  } catch (error) {
    console.error('Form submission error:', error);
    return errorResponse('Internal server error', 500);
  }
};

// Helper functions
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  // Accept 10+ digits
  return /^\+?[\d\s\-().]{10,}$/.test(phone);
}

function escapeHtml(text: string): string {
  const htmlEscapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  return text.replace(/[&<>"']/g, (char) => htmlEscapeMap[char]);
}

async function validateTurnstile(token: string, secretKey: string): Promise<boolean> {
  if (!secretKey) {
    console.warn('Turnstile secret key not configured');
    return false;
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: secretKey, response: token })
    });

    const data = (await response.json()) as { success: boolean; error_codes?: string[] };
    return data.success === true;
  } catch (e) {
    console.error('Turnstile validation error:', e);
    return false;
  }
}

function successResponse(message: string) {
  return new Response(JSON.stringify({ success: true, message }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

function errorResponse(message: string, status: number) {
  return new Response(JSON.stringify({ success: false, message }), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}
