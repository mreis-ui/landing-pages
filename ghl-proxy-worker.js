/**
 * FlowByte GHL Proxy Worker
 * 
 * Cloudflare Worker, der als sicherer Proxy zwischen den Landing Pages
 * und der GHL API fungiert. Der API-Token bleibt serverseitig.
 * 
 * Deployment:
 *   1. Cloudflare Dashboard → Workers → Create Worker
 *   2. Code einfügen
 *   3. Environment Variables setzen: GHL_TOKEN, GHL_LOCATION_ID
 *   4. Custom Domain oder Route konfigurieren
 */

export default {
  async fetch(request, env) {
    // CORS Headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders });
    }

    try {
      const data = await request.json();
      
      // Validate required fields
      if (!data.email && !data.phone) {
        return new Response(JSON.stringify({ error: 'Email or phone required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const kiConsent = data.ki_consent === true || data.ki_consent === 'true';
      
      // Build tags array
      const tags = ['src_google_ads', 'stage_1_chaos'];
      if (kiConsent) {
        tags.push('optin_ki_call_consent');
      } else {
        tags.push('synthflow_disabled');
      }

      // Create contact in GHL
      const ghlResponse = await fetch('https://services.leadconnectorhq.com/contacts/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.GHL_TOKEN}`,
          'Content-Type': 'application/json',
          'Version': '2021-07-28'
        },
        body: JSON.stringify({
          locationId: env.GHL_LOCATION_ID,
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          email: data.email || '',
          phone: data.phone || '',
          companyName: data.company || '',
          tags: tags,
          source: data.source || 'Landing Page'
        })
      });

      const result = await ghlResponse.json();
      
      return new Response(JSON.stringify({ 
        success: true, 
        contactId: result.contact?.id 
      }), {
        status: ghlResponse.status === 201 ? 201 : 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    } catch (err) {
      return new Response(JSON.stringify({ error: 'Internal error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
};
