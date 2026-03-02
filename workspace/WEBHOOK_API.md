# Webhook API Documentation

Wholesaile exposes webhook endpoints for lead ingestion from external sources.
These are configured in `openclaw.json` under `automation.webhooks`.

## Base URL

```
http://127.0.0.1:18789
```

> **Note:** The gateway must be running (`openclaw gateway`) for webhooks to be active.
> For remote access, use a tunnel (ngrok, Tailscale, Cloudflare Tunnel) or deploy to a VPS.

---

## Authentication

Webhooks use the gateway's standard auth token. Include it as a header:

```
Authorization: Bearer <your-gateway-token>
```

Or as a query parameter:

```
?token=<your-gateway-token>
```

Find your token in `~/.openclaw/openclaw.json` under `gateway.auth.token`.

---

## Endpoints

### POST `/leads/dfd`

**Purpose:** Receive leads from driving-for-dollars apps (e.g., DealMachine, PropStream, BatchDriven)

**Payload:**

```json
{
  "address": "123 Main St, Atlanta, GA 30318",
  "owner_name": "John Doe",
  "phone": "+15551234567",
  "email": "owner@example.com",
  "property_type": "single_family",
  "beds": 3,
  "baths": 2,
  "sqft": 1500,
  "year_built": 1965,
  "estimated_value": 250000,
  "notes": "Vacant, overgrown yard, broken windows",
  "source": "dealmachine",
  "lat": 33.7489,
  "lng": -84.3879,
  "photo_urls": ["https://..."]
}
```

**Required fields:** `address`

**Optional fields:** All others

**Response:** `202 Accepted`

```json
{
  "status": "queued",
  "message": "Lead received and queued for processing"
}
```

**What happens:** The Lead Scout agent receives the lead, qualifies it against your investment criteria, and creates a deal file in `~/.openclaw/workspace/deals/` if it meets your criteria.

---

### POST `/leads/mail`

**Purpose:** Receive responses from direct mail campaigns (yellow letters, postcards)

**Payload:**

```json
{
  "address": "456 Oak Ave, Atlanta, GA 30310",
  "owner_name": "Jane Smith",
  "caller_phone": "+15559876543",
  "call_recording_url": "https://recordings.example.com/call-123.mp3",
  "mail_piece": "yellow_letter_1",
  "campaign": "q1-2026-30310",
  "response_date": "2026-03-02T12:00:00Z",
  "notes": "Seller called back, interested in selling, inherited property"
}
```

**Required fields:** `caller_phone` or `address`

**Response:** `202 Accepted`

**What happens:** The Acquisition Manager agent receives the inbound lead, reviews any call recording notes, and initiates seller outreach using the appropriate script from the knowledge base.

---

### POST `/leads/ppc`

**Purpose:** Receive leads from PPC campaigns (Google Ads, Facebook Ads, landing pages)

**Payload:**

```json
{
  "name": "Robert Johnson",
  "email": "robert@example.com",
  "phone": "+15551112222",
  "property_address": "789 Pine Dr, Atlanta, GA 30314",
  "situation": "inherited_property",
  "timeline": "asap",
  "asking_price": 150000,
  "condition": "needs_work",
  "campaign": "google_search_inherited_homes",
  "landing_page": "/sell-my-inherited-home",
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "inherited-homes-atlanta",
  "submitted_at": "2026-03-02T14:30:00Z"
}
```

**Required fields:** `phone` or `email`, `property_address`

**Situation values:** `inherited_property`, `divorce`, `foreclosure`, `job_loss`, `relocation`, `tired_landlord`, `estate_sale`, `other`

**Timeline values:** `asap`, `1_month`, `3_months`, `6_months`, `flexible`

**Response:** `202 Accepted`

**What happens:** The Lead Scout agent qualifies the lead, the Market Analyst calculates ARV and MAO, and the Acquisition Manager initiates contact within the configured response window.

---

## Error Responses

| Code | Meaning | Action |
|------|---------|--------|
| `400 Bad Request` | Invalid payload format | Check JSON structure and required fields |
| `401 Unauthorized` | Missing or invalid auth token | Include `Authorization: Bearer <token>` header |
| `429 Too Many Requests` | Rate limited | Slow down requests; retry after delay |
| `500 Internal Server Error` | Gateway error | Check gateway logs: `openclaw logs` |

---

## Testing Webhooks

### Test DFD Lead

```bash
curl -X POST http://127.0.0.1:18789/leads/dfd \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_GATEWAY_TOKEN" \
  -d '{
    "address": "123 Test St, Atlanta, GA 30318",
    "owner_name": "Test Owner",
    "notes": "Test lead - vacant property, overgrown yard"
  }'
```

### Test Mail Response

```bash
curl -X POST http://127.0.0.1:18789/leads/mail \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_GATEWAY_TOKEN" \
  -d '{
    "caller_phone": "+15551234567",
    "address": "456 Test Ave, Atlanta, GA 30310",
    "notes": "Seller called back from yellow letter"
  }'
```

### Test PPC Lead

```bash
curl -X POST http://127.0.0.1:18789/leads/ppc \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_GATEWAY_TOKEN" \
  -d '{
    "name": "Test Seller",
    "phone": "+15559876543",
    "property_address": "789 Test Dr, Atlanta, GA 30314",
    "situation": "inherited_property",
    "timeline": "asap"
  }'
```

---

## Integrating External Apps

### DealMachine

In DealMachine settings → Integrations → Webhook:
- URL: `https://your-gateway-host/leads/dfd`
- Method: POST
- Auth: Bearer token

### BatchDriven / BatchLeads

Configure webhook export with the `/leads/dfd` endpoint.

### Zapier / Make (Integromat)

Use the webhook URL as the target for any Zap/scenario that generates real estate leads.

### Custom Landing Pages

Add a form submission handler that POSTs to `/leads/ppc` with the seller's information.

---

## Webhook Logs

View recent webhook activity:

```bash
openclaw logs --filter webhook
```

Or check the gateway log directly:

```bash
tail -f ~/.openclaw/logs/gateway.log | grep webhook
```
