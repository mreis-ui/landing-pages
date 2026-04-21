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
      const tags = data.tags 
        ? data.tags.split(',').map(t => t.trim())
        : ['src_google_ads', 'stage_1_chaos'];
      if (kiConsent && !tags.includes('optin_ki_call_consent')) {
        tags.push('optin_ki_call_consent');
      } else if (!kiConsent && !tags.includes('synthflow_disabled')) {
        tags.push('synthflow_disabled');
      }

      // Build custom fields — maps to GHL fieldKeys (contact.<name>)
      const customFields = [];
      const attrMap = {
        gclid:              'contact.gclid',
        utm_source:         'contact.utm_source',
        utm_medium:         'contact.utm_medium',
        utm_campaign:       'contact.utm_campaign',
        utm_content:        'contact.utm_content',
        utm_term:           'contact.utm_term',
        first_landing_page: 'contact.first_landing_page',
        first_touch_at:     'contact.first_touch_at',
        ads_campaign_name:  'contact.ads_campaign_name',
        ads_ad_group_name:  'contact.ads_ad_group_name'
      };
      for (const [incoming, fieldKey] of Object.entries(attrMap)) {
        if (data[incoming]) {
          customFields.push({ key: fieldKey, field_value: data[incoming] });
        }
      }
      if (data.source) {
        customFields.push({ key: 'contact.lead_source_detail', field_value: data.source });
      }

      // Create contact in GHL
      const ghlPayload = {
        locationId: env.GHL_LOCATION_ID,
        firstName: data.first_name || '',
        lastName: data.last_name || '',
        email: data.email || '',
        phone: data.phone || '',
        companyName: data.company || '',
        tags: tags,
        source: data.source || 'Landing Page'
      };

      // Add custom fields if present
      if (customFields.length > 0) {
        ghlPayload.customFields = customFields;
      }

      const ghlResponse = await fetch('https://services.leadconnectorhq.com/contacts/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.GHL_TOKEN}`,
          'Content-Type': 'application/json',
          'Version': '2021-07-28'
        },
        body: JSON.stringify(ghlPayload)
      });

      const result = await ghlResponse.json();
      const contactId = result.contact?.id;

      // Create pipeline opportunity for new contacts
      if (contactId && ghlResponse.status === 201) {
        const PIPELINE_ID = 'evhEdrasKMND8pvvAYpT';
        const NEW_LEAD_STAGE = '639449f8-2206-4181-9972-efad55ad2ba1';
        const contactName = `${data.first_name || ''} ${data.last_name || ''}`.trim();
        
        fetch('https://services.leadconnectorhq.com/opportunities/', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.GHL_TOKEN}`,
            'Content-Type': 'application/json',
            'Version': '2021-07-28'
          },
          body: JSON.stringify({
            pipelineId: PIPELINE_ID,
            locationId: env.GHL_LOCATION_ID,
            name: `${contactName} - ${data.company || 'Neuer Lead'}`,
            pipelineStageId: NEW_LEAD_STAGE,
            contactId: contactId,
            status: 'open',
            monetaryValue: 2388
          })
        }).catch(() => {}); // Fire and forget — don't block response
      }
      
      return new Response(JSON.stringify({ 
        success: true, 
        contactId: contactId 
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
