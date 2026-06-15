/**
 * Werkstatt ONE — GHL Pipeline Manager
 * 
 * Serverless Functions / n8n Nodes für automatische Pipeline-Moves
 * Wird vom CF Worker oder n8n aufgerufen wenn Tags/Events eintreten
 */

const API = 'https://services.leadconnectorhq.com';
const PIPELINE_ID = 'evhEdrasKMND8pvvAYpT';

const STAGES = {
  NEW_LEAD:       '639449f8-2206-4181-9972-efad55ad2ba1',
  KI_CHAT:        '6fa5dca8-cc9d-434b-970b-83cad54750f9',
  VOICE_AI:       'db402abf-ae70-4353-8f83-ada93206bedd',
  CALLBACK_LATER: '742cda29-a8cc-4923-87c2-b38b3c836144',
  DEMO_BOOKED:    'a5e9b637-1971-4fea-98e9-96bfa80cb82a',
  NO_SHOW:        '6d56765c-917a-41c9-ab18-2b64d842c83b',
  DEMO_DONE:      'fdcd409c-b917-4131-b40b-1a29db50cf4b',
  CLOSED_WON:     '4c48881c-17e7-4be5-99e5-ee55ef0bf18b',
  CLOSED_LOST:    'f38fe7e7-f239-4960-b6d6-b9b02d1f3b5f',
};

const TAG_TO_STAGE = {
  'optin_ki_call_consent': STAGES.KI_CHAT,
  'synthflow_active':      STAGES.VOICE_AI,
  'demo_booked':           STAGES.DEMO_BOOKED,
  'no_show':               STAGES.NO_SHOW,
};

/**
 * Move opportunity to the correct pipeline stage based on contact tags
 */
async function moveOpportunityByTag(contactId, tag, env) {
  const targetStage = TAG_TO_STAGE[tag];
  if (!targetStage) return null;

  const headers = {
    'Authorization': `Bearer ${env.GHL_TOKEN}`,
    'Content-Type': 'application/json',
    'Version': '2021-07-28'
  };

  // Find the opportunity for this contact
  const searchRes = await fetch(
    `${API}/opportunities/search?locationId=${env.GHL_LOCATION_ID}&contactId=${contactId}&pipelineId=${PIPELINE_ID}`,
    { headers }
  );
  const searchData = await searchRes.json();
  const opportunities = searchData.opportunities || [];
  
  if (opportunities.length === 0) {
    // Create new opportunity if none exists
    const createRes = await fetch(`${API}/opportunities/`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        pipelineId: PIPELINE_ID,
        locationId: env.GHL_LOCATION_ID,
        name: 'New Lead',
        pipelineStageId: targetStage,
        contactId: contactId,
        status: 'open',
        monetaryValue: 2388 // Werkstatt ONE Jahres-Lizenz
      })
    });
    return createRes.json();
  }

  // Move existing opportunity
  const oppId = opportunities[0].id;
  const moveRes = await fetch(`${API}/opportunities/${oppId}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ pipelineStageId: targetStage })
  });
  return moveRes.json();
}

/**
 * Create initial opportunity when a new lead comes in
 */
async function createOpportunity(contactId, contactName, companyName, env) {
  const headers = {
    'Authorization': `Bearer ${env.GHL_TOKEN}`,
    'Content-Type': 'application/json',
    'Version': '2021-07-28'
  };

  const res = await fetch(`${API}/opportunities/`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      pipelineId: PIPELINE_ID,
      locationId: env.GHL_LOCATION_ID,
      name: `${contactName} - ${companyName}`,
      pipelineStageId: STAGES.NEW_LEAD,
      contactId: contactId,
      status: 'open',
      monetaryValue: 2388
    })
  });
  return res.json();
}

/**
 * Add tags to a contact
 */
async function addTags(contactId, tags, env) {
  const res = await fetch(`${API}/contacts/${contactId}/tags`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.GHL_TOKEN}`,
      'Content-Type': 'application/json',
      'Version': '2021-07-28'
    },
    body: JSON.stringify({ tags })
  });
  return res.json();
}

export { moveOpportunityByTag, createOpportunity, addTags, STAGES, TAG_TO_STAGE };
