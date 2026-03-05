# Wholesaile Integrations Research

> Sprint 5-6 Research: Skip Tracing, CRM, Comp Data, Voicemail, and Dashboard Options
> Date: 2026-03-05

---

## 📊 Executive Summary

| Category | Top Recommendation | Runner-Up | Budget Option |
|----------|-------------------|-----------|---------------|
| **Skip Tracing** | BatchSkipTracing | REISkip | Tracerfy |
| **CRM** | REsimpli | InvestorFuse | FreedomSoft |
| **Comp Data API** | ATTOM Data | BatchData | Estated |
| **Voicemail Drop** | Call Loop | FallbackAI | Skipify |
| **Deal Dashboard** | AutomationSuite | Custom (Retool) | Google Sheets |

---

## 1️⃣ Skip Tracing Services

### Comparison Matrix

| Service | Price/Match | Hit Rate | DNC Scrub | API | Best For |
|---------|-------------|----------|-----------|-----|----------|
| **BatchSkipTracing** | $0.15-0.20 | 60-80% | ✅ Yes | ✅ Yes | High-volume wholesalers |
| **SkipForce** | $0.04-0.06 | 70-85% | ✅ Free | ✅ Yes | Budget-conscious users |
| **Skip Genie** | $0.17/result | 70% | ✅ Yes | ✅ Yes | Real estate specific |
| **REISkip** | $0.08-0.12 | 85-90% | ✅ Yes | ✅ Yes | High accuracy needs |
| **Tracerfy** | ~$0.02 | 60-70% | ✅ Yes | ✅ Yes | Ultra-cheap bulk |
| **IDI / TLOxp** | $0.25-0.50 | 85-95% | ✅ Yes | ✅ Yes | Premium tier, pros only |
| **DealMachine** | Credits | 70-80% | ✅ Yes | ✅ Yes | Mobile D4D workflows |
| **PropStream** | Included | 60-70% | ✅ Free flag | ❌ No | All-in-one platform |
| **Lead Sherpa** | $0.12-0.15 | 70-80% | ✅ TCPA | ✅ Yes | SMS campaigns |
| **Accurate Append** | $0.10-0.15 | 75-85% | ✅ Yes | ✅ Yes | Quality-focused |

### Detailed Reviews

#### BatchSkipTracing ⭐⭐⭐⭐⭐
- **Website:** https://batchskiptracing.com
- **Pricing:** $0.15-0.20 per match (volume discounts)
- **Hit Rate:** 60-80%
- **Features:**
  - DNC scrubbing included
  - Phone + email + relatives
  - Bulk upload (CSV)
  - API available
  - Popular on BiggerPockets/Reddit
- **Integration:** REST API, Zapier
- **Verdict:** Best overall for wholesalers doing high volume

#### SkipForce ⭐⭐⭐⭐
- **Website:** https://skipforce.com
- **Pricing:** 4-6 cents per match (bulk: 100k for $4k)
- **Hit Rate:** 70-85%
- **Features:**
  - Number quality score
  - Optimal call window
  - Free DNC indicator
  - Lead Max packages (done-for-you calling)
- **Verdict:** Best value for money

#### REISkip ⭐⭐⭐⭐⭐
- **Website:** https://reiskip.com
- **Pricing:** $0.08-0.12 per match
- **Hit Rate:** 85-90%
- **Features:**
  - Real estate investor focused
  - Quick bulk processing
  - Property owner verification
- **Verdict:** Best accuracy for the price

#### Tracerfy ⭐⭐⭐
- **Website:** https://tracerfy.com
- **Pricing:** ~$0.02 per trace (ultra-cheap)
- **Hit Rate:** 60-70%
- **Features:**
  - Volume leader
  - Fast turnaround
  - High coverage
- **Verdict:** Best for testing/budget campaigns

#### IDI / TLOxp / LexisNexis ⭐⭐⭐⭐⭐
- **Pricing:** $0.25-0.50+ per search
- **Hit Rate:** 85-95%
- **Features:**
  - Premium-tier data
  - Deep background checks
  - Contract-based pricing
- **Verdict:** For professionals who need absolute best accuracy

### Recommended Integration

```typescript
// workspace/integrations/skip-tracing.ts
interface SkipTraceResult {
  address: string;
  owner: {
    name: string;
    phones: Array<{
      number: string;
      type: 'mobile' | 'landline' | 'voip';
      quality: 'high' | 'medium' | 'low';
      dnc: boolean;
    }>;
    emails: string[];
    relatives?: Array<{name: string; phone: string}>;
  };
  confidence: number;
}

// Primary: BatchSkipTracing
// Backup: REISkip for high-accuracy needs
```

---

## 2️⃣ CRM Platforms for Wholesaling

### Comparison Matrix

| CRM | Monthly Cost | Skip Trace | SMS | D4D | Automation |
|-----|--------------|------------|-----|-----|------------|
| **REsimpli** | $149-299 | ✅ Included | ✅ Yes | ✅ Yes | ✅ Advanced |
| **InvestorFuse** | $197-497 | ✅ Integrated | ✅ Yes | ❌ No | ✅ Advanced |
| **FreedomSoft** | $197-497 | ✅ Included | ✅ Yes | ✅ Yes | ✅ Moderate |
| **PropStream** | $99-149 | ✅ Built-in | ❌ No | ❌ No | ❌ Basic |
| **BatchLeads** | $99-199 | ✅ Included | ✅ Yes | ✅ Yes | ✅ Moderate |
| **DealMachine** | $49-199 | ✅ Per credit | ✅ Yes | ✅ Yes | ✅ Basic |

### Detailed Reviews

#### REsimpli ⭐⭐⭐⭐⭐
- **Website:** https://resimpli.com
- **Pricing:** $149-299/month
- **Features:**
  - **CRM** with deal pipeline
  - **Skip tracing** (free credits included)
  - **SMS campaigns** with automation
  - **Driving for Dollars** mobile app
  - **List stacking** capabilities
  - **Direct mail** integration
  - **AI lead scoring**
- **Best For:** End-to-end wholesaling operations
- **Verdict:** Top choice for serious wholesalers

#### InvestorFuse ⭐⭐⭐⭐
- **Website:** https://investorfuse.com
- **Pricing:** $197-497/month
- **Features:**
  - Workflow automation
  - Lead nurturing sequences
  - Deal pipeline management
  - Skip tracing integrated
  - SMS + email automation
- **Best For:** Teams needing workflow automation
- **Verdict:** Strong automation, higher price

#### FreedomSoft ⭐⭐⭐⭐
- **Website:** https://freedomsoft.com
- **Pricing:** $197-497/month
- **Features:**
  - All-in-one platform
  - Property data + comps
  - Skip tracing included
  - Marketing automation
  - Document generation
- **Best For:** Users wanting everything in one place
- **Verdict:** Good but can be overwhelming

### CRM Integration Notes

For Wholesaile, consider:
1. **REsimpli** - Best fit for wholesale workflow
2. **BatchLeads** - Good budget alternative
3. **Custom** - Build on OpenClaw's existing CRM capabilities

---

## 3️⃣ Comp Data & Property Valuation APIs

### Comparison Matrix

| API | Cost | Coverage | ARV | Rental Est | Docs |
|-----|------|----------|-----|------------|------|
| **ATTOM Data** | $$$ | 155M+ | ✅ Yes | ✅ Yes | ⭐⭐⭐⭐⭐ |
| **BatchData** | $$ | 150M+ | ✅ Yes | ✅ Yes | ⭐⭐⭐⭐⭐ |
| **Estated** | $$ | 140M+ | ✅ Yes | ✅ Yes | ⭐⭐⭐⭐ |
| **RentCast** | $ | 100M+ | ❌ No | ✅ Yes | ⭐⭐⭐⭐ |
| **Realty Mole** | $$ | 130M+ | ✅ Yes | ✅ Yes | ⭐⭐⭐⭐ |
| **Zillow (Unofficial)** | $ | 110M+ | ✅ Yes | ✅ Yes | ⭐⭐ |
| **Redfin** | ❌ No API | - | - | - | - |

### Detailed Reviews

#### ATTOM Data ⭐⭐⭐⭐⭐
- **Website:** https://attomdata.com
- **Pricing:** Enterprise pricing (contact sales)
- **Features:**
  - 155M+ properties
  - Property characteristics
  - Ownership info
  - Sales history
  - Valuation (AVM)
  - Rental estimates
  - Tax assessments
- **API Quality:** Excellent documentation
- **Verdict:** Industry standard, premium pricing

#### BatchData ⭐⭐⭐⭐⭐
- **Website:** https://batchdata.io
- **Pricing:** Pay-per-call, volume discounts
- **Features:**
  - Property search API
  - Owner data API
  - Skip tracing API
  - Valuation API
- **API Quality:** Excellent docs with examples
- **Verdict:** Best value for property data

#### Estated ⭐⭐⭐⭐
- **Website:** https://estated.com
- **Pricing:** Simple API pricing
- **Features:**
  - Property data
  - Owner information
  - Valuation
  - Clear API structure
- **Verdict:** Developer-friendly, good docs

### Zillow/Redfin Integration Notes

⚠️ **Important Legal Considerations:**

| Platform | Official API | ToS Scraping | Risk Level |
|----------|--------------|--------------|------------|
| Zillow | ❌ Deprecated | ❌ Prohibited | 🔴 High |
| Redfin | ❌ None | ❌ Prohibited | 🔴 High |
| Realtor.com | ❌ Limited | ❌ Prohibited | 🔴 High |

**Recommended Approach:**
1. Use official APIs (ATTOM, BatchData, Estated)
2. For scraping, use Bright Data MCP server (anti-detection)
3. Always respect robots.txt and rate limits
4. Consider legal implications

### Integration Code

```typescript
// workspace/integrations/property-data.ts

interface PropertyData {
  address: string;
  parcelId: string;
  owner: {
    name: string;
    mailingAddress: string;
    phone?: string;
    email?: string;
  };
  property: {
    beds: number;
    baths: number;
    sqft: number;
    lotSize: number;
    yearBuilt: number;
    propertyType: string;
  };
  valuation: {
    avm: number;
    arv?: number;
    confidence: number;
    comps: Comp[];
  };
  sales: {
    lastSaleDate: string;
    lastSalePrice: number;
    history: Sale[];
  };
  tax: {
    assessedValue: number;
    annualTax: number;
  };
}

// Primary: BatchData API
// Backup: ATTOM Data
```

---

## 4️⃣ Voicemail Drop & SMS Services

### Comparison Matrix

| Service | Type | Price | AI Voice | TCPA Compliant |
|---------|------|-------|----------|----------------|
| **Call Loop** | SMS + Voicemail | $29+/mo | ❌ No | ✅ Yes |
| **FallbackAI** | Ringless VM | Credits | ✅ Yes | ✅ Yes |
| **Skipify** | Skip Trace + VM | Custom | ❌ No | ✅ Yes |
| **AutomationSuite** | All-in-one | $97+/mo | ❌ No | ✅ Yes |
| **PhoneBurner** | Dialer + VM | $149+/mo | ❌ No | ✅ Yes |

### Detailed Reviews

#### Call Loop ⭐⭐⭐⭐⭐
- **Website:** https://callloop.com
- **Pricing:** $29/month (250 credits), pay-as-you-go
- **Features:**
  - SMS marketing
  - Ringless voicemail drops
  - Voice broadcasting
  - CRM integrations (HubSpot, ActiveCampaign, Keap)
  - Zapier integration (4000+ apps)
  - Toll-free texting
  - HIPAA compliant option
- **Verdict:** Best multi-channel option

#### FallbackAI ⭐⭐⭐⭐
- **Website:** https://fallbackai.com
- **Pricing:** Credit-based
- **Features:**
  - AI-generated ringless voicemail
  - Voice cloning (use your own voice)
  - Personalized messages
  - 20% average callback rate
- **Stats:**
  - 30k+ voicemails delivered
  - 2.3x increase in qualified leads
- **Verdict:** Best for AI voice personalization

### TCPA Compliance Notes

⚠️ **Critical Legal Requirements:**

1. **Ringless Voicemail** - Gray area, consult legal counsel
2. **SMS Marketing** - Requires:
   - Express written consent
   - Opt-out mechanism
   - No more than 2 proactive texts/24 hours (unless reply)
   - Quiet hours (9 PM - 8 AM recipient time)
3. **Auto-Dialing** - Must have consent

### Integration Code

```typescript
// workspace/integrations/voicemail.ts

interface VoicemailDrop {
  contactId: string;
  phone: string;
  message: string;
  scheduledTime?: Date;
  personalization?: {
    firstName: string;
    propertyAddress?: string;
  offerAmount?: number;
  };
}

interface SMSMessage {
  to: string;
  body: string;
  mediaUrl?: string;
  scheduledTime?: Date;
}

// Primary: Call Loop
// Backup: FallbackAI for AI voice
```

---

## 5️⃣ Deal Dashboard Options

### Comparison Matrix

| Option | Cost | Customization | Real-time | Mobile |
|--------|------|---------------|-----------|--------|
| **AutomationSuite** | $97+/mo | ⭐⭐⭐ | ✅ Yes | ✅ Yes |
| **Retool** | $10-50/user/mo | ⭐⭐⭐⭐⭐ | ✅ Yes | ❌ No |
| **Google Sheets** | Free | ⭐⭐ | ❌ No | ✅ Yes |
| **Notion** | $8-15/user/mo | ⭐⭐⭐⭐ | ❌ No | ✅ Yes |
| **Airtable** | $12-24/user/mo | ⭐⭐⭐⭐ | ✅ Yes | ✅ Yes |
| **Custom (React)** | Dev cost | ⭐⭐⭐⭐⭐ | ✅ Yes | ✅ Yes |

### Recommended Stack

**Option 1: Quick Start**
- Google Sheets + Zapier
- Cost: Free - $30/month
- Time to build: 1-2 days

**Option 2: Professional**
- Retool + OpenClaw API
- Cost: $50-100/month
- Time to build: 1-2 weeks

**Option 3: Custom**
- React Dashboard + OpenClaw WebSocket
- Cost: Development time
- Time to build: 2-4 weeks

### Dashboard Components Needed

```typescript
// Dashboard Widgets
const dashboardWidgets = [
  // Pipeline Overview
  'deals_by_stage',
  'deals_by_agent',
  'average_days_to_close',
  
  // Lead Metrics
  'leads_by_source',
  'response_time_avg',
  'contact_rate',
  
  // Financial
  'revenue_mtd',
  'average_assignment_fee',
  'projected_closing_volume',
  
  // Activity
  'calls_made_today',
  'texts_sent_today',
  'appointments_scheduled',
  
  // Market
  'active_buyers_count',
  'average_dom',
  'price_per_sqft_trend'
];
```

---

## 6️⃣ Integration Recommendations

### Phase 1: Essential (Implement First)

| Integration | Service | Priority | Effort |
|-------------|---------|----------|--------|
| Skip Tracing | BatchSkipTracing | 🔴 Critical | 2 days |
| Property Data | BatchData API | 🔴 Critical | 2 days |
| SMS | Call Loop | 🔴 Critical | 1 day |

### Phase 2: Important (Implement Second)

| Integration | Service | Priority | Effort |
|-------------|---------|----------|--------|
| CRM Sync | REsimpli or custom | 🟡 High | 1 week |
| Voicemail Drop | FallbackAI | 🟡 High | 2 days |
| Dashboard | Retool or custom | 🟡 High | 1 week |

### Phase 3: Nice-to-Have (Implement Later)

| Integration | Service | Priority | Effort |
|-------------|---------|----------|--------|
| Email Extension | Custom | 🟢 Medium | 3 days |
| KB Versioning | Git-based | 🟢 Medium | 1 day |
| AI Lead Scoring | Custom | 🟢 Medium | 1 week |

---

## 7️⃣ API Keys & Environment Variables

Add to `workspace/.env`:

```bash
# Skip Tracing
BATCH_SKIP_TRACING_API_KEY=your_key_here
SKIPFORCE_API_KEY=your_key_here

# Property Data
BATCHDATA_API_KEY=your_key_here
ATTOM_API_KEY=your_key_here

# SMS & Voicemail
CALLLOOP_API_KEY=your_key_here
FALLBACKAI_API_KEY=your_key_here

# CRM (if using external)
RESIMPLI_API_KEY=your_key_here
```

---

## 8️⃣ Next Steps

### Immediate Actions

1. **Sign up for BatchSkipTracing** - Get API access
2. **Sign up for BatchData** - Property data API
3. **Sign up for Call Loop** - SMS + voicemail
4. **Test integrations** - Build proof-of-concept

### Integration Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      WHOLESAIL SYSTEM                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐              │
│  │ Lead     │───▶│ Skip     │───▶│ Property │              │
│  │ Sources  │    │ Trace    │    │ Data     │              │
│  └──────────┘    └──────────┘    └──────────┘              │
│       │              │               │                      │
│       ▼              ▼               ▼                      │
│  ┌────────────────────────────────────────────┐            │
│  │              OpenClaw Agents                │            │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐      │            │
│  │  │Lead     │ │Market   │ │Acquisit │      │            │
│  │  │Scout    │ │Analysis │ │ion      │      │            │
│  │  └─────────┘ └─────────┘ └─────────┘      │            │
│  └────────────────────────────────────────────┘            │
│       │                                                     │
│       ▼                                                     │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐              │
│  │ SMS/VM   │    │ CRM      │    │Dashboard │              │
│  │ Outreach │    │ Sync     │    │ Display  │              │
│  └──────────┘    └──────────┘    └──────────┘              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 📚 Resources

- [BatchSkipTracing API Docs](https://batchskiptracing.com/api)
- [BatchData API Docs](https://batchdata.io/docs)
- [Call Loop API Docs](https://callloop.com/api)
- [ATTOM Developer Portal](https://api.attomdata.com)
- [TCPA Compliance Guide](https://www.fcc.gov/rules-political-calls-and-texts)

