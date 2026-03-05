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


---

## 9️⃣ All-in-One Platforms (Updated Research)

### Comparison Matrix

| Platform | Price | Skip Trace | CRM | D4D | SMS | Dialer | AI Features |
|----------|-------|------------|-----|-----|-----|--------|-------------|
| **XLeads** | $97/mo | ✅ Unlimited | ✅ Full | ✅ Yes | ✅ Yes | ✅ Yes | ✅ AI Agents |
| **PropStream** | $99/mo | ✅ Built-in | ⭐ Basic | ❌ No | ✅ Email | ❌ No | ✅ Higher plans |
| **DealMachine** | $49-99/mo | ✅ Credits | ⭐ Basic | ✅ Yes | ✅ Yes | ❌ No | ⭐ Limited |
| **BatchLeads** | $99-199/mo | ✅ Free | ✅ Yes | ✅ Yes | ✅ RVM | ❌ No | ✅ BatchRank |
| **REsimpli** | $149-299/mo | ✅ Credits | ✅ Full | ✅ Yes | ✅ Yes | ✅ Yes | ✅ AI Agents |

### Detailed Reviews

#### XLeads ⭐⭐⭐⭐⭐ (New Contender!)
- **Website:** https://xleads.com
- **Pricing:** ~$97/month (with aggressive promos)
- **Positioning:** "Best value" all-in-one, cheaper/faster alternative to PropStream/DealMachine combos
- **Features:**
  - **Unlimited FREE skip tracing** (major differentiator!)
  - AI-powered property search & list stacking
  - Distressed property detection
  - Full CRM with deal pipeline
  - Built-in dialer
  - SMS blasting
  - E-signing
  - Workflows/automation
  - Driving for Dollars mobile app
  - AI agents for communication
  - Disposition tools
- **Best For:** Virtual wholesalers scaling volume
- **Verdict:** 🔥 HOT - Best value for money, unlimited skip tracing is game-changer

#### PropStream ⭐⭐⭐⭐
- **Website:** https://propstream.com
- **Pricing:** ~$99/month
- **Features:**
  - **160M+ properties** (largest database)
  - Nationwide filters: absentee owners, vacancies, equity
  - Built-in skip tracing
  - Comps/ARV calculators
  - Marketing suite (emails, postcards, landing pages)
  - AI features in higher tiers
- **Best For:** List pulling + basic outreach
- **Stack With:** Often paired with dedicated CRM
- **Verdict:** Classic choice, but may need additional tools

#### DealMachine ⭐⭐⭐⭐
- **Website:** https://dealmachine.com
- **Pricing:** $49-99/month
- **Features:**
  - **Mobile-first D4D king** (spot properties on the go)
  - Auto-capture property data
  - Skip tracing
  - Lead lists
  - Automated direct mail
  - Follow-up sequences
  - Basic CRM
- **Best For:** Boots-on-the-ground local sourcing
- **Limitation:** Less emphasis on massive nationwide data pulls
- **Verdict:** Best for field work, mobile-driven wholesaling

#### BatchLeads ⭐⭐⭐⭐⭐
- **Website:** https://batchleads.io
- **Pricing:** $99-199/month
- **Features:**
  - **1-click lists** with 130+ filters
  - **BatchRank AI** for lead prioritization
  - **FREE/included skip tracing**
  - High right-party contact rates
  - Outbound campaigns (SMS/email/RVM)
  - CRM features
  - Strong nationwide coverage
  - Team support
- **Best For:** Bulk/wholesale operations, teams
- **Verdict:** Often wins head-to-heads on data quality & skip accuracy vs PropStream

#### REsimpli ⭐⭐⭐⭐⭐
- **Website:** https://resimpli.com
- **Pricing:** $149-299/month
- **Features:**
  - **True end-to-end CRM replacement**
  - Built-in list builder
  - Skip tracing (free credits included)
  - Deal pipeline & tasks
  - AI agents for communications
  - Dialer/SMS/email/direct mail automation
  - Bookkeeping
  - Workflows
  - **No integrations needed**
- **Best For:** Wholesalers wanting lead-to-close in one place
- **Verdict:** Frequently ranked #1 alternative to PropStream in 2026 comparisons

---

### All-in-One Platform Decision Matrix

| If You Need... | Choose | Why |
|----------------|--------|-----|
| **Best value + unlimited skip trace** | XLeads | $97/mo, AI agents, everything included |
| **Largest property database** | PropStream | 160M+ properties |
| **Mobile D4D focus** | DealMachine | Best mobile app for field work |
| **Best data quality + team** | BatchLeads | Wins on accuracy, team features |
| **True end-to-end CRM** | REsimpli | Lead to close in one place |

---

### Cost Comparison (Annual)

| Platform | Monthly | Annual | Skip Trace | Total w/ 10K Traces/mo |
|----------|---------|--------|------------|------------------------|
| XLeads | $97 | $1,164 | ✅ Unlimited | **$1,164** |
| PropStream | $99 | $1,188 | ⚠️ Extra | ~$3,000+ |
| DealMachine | $99 | $1,188 | ⚠️ Credits | ~$2,500+ |
| BatchLeads | $149 | $1,788 | ✅ Free | **$1,788** |
| REsimpli | $199 | $2,388 | ⚠️ Credits | ~$3,000+ |

**💡 Winner for Cost-Effectiveness:** XLeads with unlimited skip tracing

---

### Updated Recommendations

#### Option A: Single Platform (Simplest)
```
XLeads ($97/mo)
├── Skip Tracing (Unlimited)
├── CRM
├── SMS/Dialer
├── D4D App
├── AI Agents
└── Disposition Tools
```

#### Option B: Best-in-Class Stack
```
BatchSkipTracing ($0.15/match) + BatchData API + Call Loop ($29/mo)
└── Total: ~$200-400/mo depending on volume
   - More control
   - Better for scaling
   - Custom integrations with Wholesaile
```

#### Option C: Hybrid Approach
```
XLeads ($97/mo) + Wholesaile Agents
├── Use XLeads for data + skip tracing
├── Use Wholesaile for AI agent orchestration
└── Sync via API
```

---

### Integration Priority (Revised)

| Priority | Integration | Service | Reason |
|----------|-------------|---------|--------|
| 🔴 **1** | All-in-One Platform | XLeads | Best value, unlimited skip trace |
| 🔴 **2** | Property Data API | BatchData | Backup for XLeads |
| 🟡 **3** | SMS/Voicemail | Call Loop | Multi-channel outreach |
| 🟢 **4** | Dashboard | Retool | Deal visualization |


---

## 🔌 CRITICAL: API Availability Analysis

> **Updated 2026-03-05** - After deeper research, most all-in-one platforms are **closed ecosystems** without public APIs.

### API Availability Matrix

| Service | Public API | Webhooks | Browser Automation | Integration Difficulty |
|---------|------------|----------|-------------------|----------------------|
| **BatchData** | ✅ Full REST API | ✅ Yes | N/A | 🟢 Easy |
| **BatchSkipTracing** | ✅ REST API | ✅ Yes | N/A | 🟢 Easy |
| **ATTOM Data** | ✅ Full REST API | ✅ Yes | N/A | 🟢 Easy |
| **Call Loop** | ✅ REST API | ✅ Yes | N/A | 🟢 Easy |
| **SkipForce** | ✅ REST API | ⚠️ Limited | N/A | 🟢 Easy |
| **Estated** | ✅ REST API | ✅ Yes | N/A | 🟢 Easy |
| **XLeads** | ❌ No public API | ❌ No | ✅ Possible | 🔴 Hard |
| **PropStream** | ❌ No public API | ❌ No | ✅ Possible | 🔴 Hard |
| **REsimpli** | ❌ No public API | ❌ No | ✅ Possible | 🔴 Hard |
| **DealMachine** | ⚠️ Limited | ❌ No | ✅ Possible | 🟡 Medium |
| **BatchLeads** | ⚠️ Limited | ⚠️ Limited | ✅ Possible | 🟡 Medium |

### Integration Approaches

#### Option A: API-First Stack (Recommended for Wholesaile)
```
┌─────────────────────────────────────────────────────────────┐
│                    WHOLESAIL SYSTEM                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │ BatchData    │    │ BatchSkip    │    │  Call Loop   │  │
│  │ Property API │    │ Tracing API  │    │  SMS/VM API  │  │
│  └──────┬───────┘    └──────┬───────┘    └──────┬───────┘  │
│         │                   │                   │          │
│         └───────────────────┼───────────────────┘          │
│                             ▼                                │
│                    ┌──────────────┐                         │
│                    │  Wholesaile  │                         │
│                    │   Agents     │                         │
│                    └──────────────┘                         │
│                                                              │
└─────────────────────────────────────────────────────────────┘

Monthly Cost: ~$500-700 (BatchData) + $0.15/match skip + $29 Call Loop
Integration: Clean TypeScript modules, reliable webhooks
Maintenance: Low - API contracts are stable
```

#### Option B: Browser Automation Stack (For Closed Platforms)
```
┌─────────────────────────────────────────────────────────────┐
│                    WHOLESAIL SYSTEM                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐                                           │
│  │   XLeads /   │  ◄── browser_agent (Playwright)           │
│  │  PropStream  │      • Login automation                   │
│  │  REsimpli    │      • Screen scraping                    │
│  └──────────────┘      • Form filling                        │
│                        • Data extraction                     │
│                             │                                │
│                             ▼                                │
│                    ┌──────────────┐                         │
│                    │  Wholesaile  │                         │
│                    │   Agents     │                         │
│                    └──────────────┘                         │
│                                                              │
└─────────────────────────────────────────────────────────────┘

Monthly Cost: $97-299 (platform only)
Integration: Fragile - requires browser automation maintenance
Risks: 
  • Platform UI changes break automation
  • Session management complexity
  • Rate limiting / CAPTCHAs
  • Terms of Service concerns
Maintenance: HIGH - must update when platforms change
```

#### Option C: Hybrid Approach (Best of Both Worlds)
```
┌─────────────────────────────────────────────────────────────┐
│                    WHOLESAIL SYSTEM                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │ BatchData    │    │   XLeads     │    │  Call Loop   │  │
│  │ Property API │    │ (Browser)    │    │  SMS/VM API  │  │
│  │  (API) ✅    │    │ Skip Trace   │    │   (API) ✅   │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│                             │                                │
│                             ▼                                │
│                    ┌──────────────┐                         │
│                    │  Wholesaile  │                         │
│                    │   Agents     │                         │
│                    └──────────────┘                         │
│                                                              │
└─────────────────────────────────────────────────────────────┘

Use Browser Automation ONLY for:
  • Skip tracing (XLeads unlimited)
  • List building (once/week batch)
  
Use APIs for:
  • Property data (BatchData)
  • SMS/Voicemail (Call Loop)
  • Lead notifications (webhooks)
```

---

## 🏗️ Recommended Integration Architecture

### Primary Recommendation: API-First with Optional Browser Layer

```typescript
// workspace/integrations/config.ts
export const integrations = {
  // CORE: Always use APIs for reliability
  propertyData: {
    provider: 'batchdata',
    apiKey: process.env.BATCHDATA_API_KEY,
    features: ['comps', 'ownership', 'equity', 'vacancy']
  },
  
  skipTracing: {
    // Option 1: API (reliable)
    provider: 'batchskiptracing',
    apiKey: process.env.BATCH_SKIP_TRACING_API_KEY,
    pricePerMatch: 0.15,
    
    // Option 2: Browser automation (cheaper but fragile)
    // provider: 'xleads-browser',
    // requiresBrowserAgent: true
  },
  
  smsVoicemail: {
    provider: 'callloop',
    apiKey: process.env.CALLLOOP_API_KEY,
    features: ['sms', 'ringless-vm', 'drip-campaigns']
  },
  
  // OPTIONAL: Browser automation for closed platforms
  browserAutomation: {
    enabled: false, // Set true if using XLeads/PropStream
    platforms: ['xleads'],
    tasks: ['skip-tracing', 'list-building'],
    schedule: 'weekly' // Reduce automation fragility
  }
};
```

### Implementation Priority

| Priority | Service | Type | Why |
|----------|---------|------|-----|
| 🔴 **1** | BatchData | API | Property data is core functionality |
| 🔴 **2** | Call Loop | API | Lead response automation |
| 🟡 **3** | BatchSkipTracing | API | Reliable skip tracing |
| 🟢 **4** | XLeads (Browser) | Browser | Optional cost savings |

---

## 💰 Cost Comparison: API vs Browser Automation

### API-First Stack (Recommended)
| Service | Monthly Cost | Notes |
|---------|--------------|-------|
| BatchData Property API | $500/mo | 155M+ properties |
| BatchSkipTracing | ~$150/mo | 1,000 matches @ $0.15 |
| Call Loop | $29/mo | SMS + Voicemail |
| **Total** | **~$679/mo** | Reliable, maintainable |

### Browser Automation Stack (Higher Risk)
| Service | Monthly Cost | Notes |
|---------|--------------|-------|
| XLeads | $97/mo | Unlimited skip tracing |
| Development | ~$2,000 | One-time browser automation |
| Maintenance | ~$500/mo | Fix broken automation |
| **Total** | **~$597/mo** | Fragile, requires constant updates |

### Break-Even Analysis
- API stack is more expensive but **10x more reliable**
- Browser automation requires **ongoing maintenance** (2-4 hrs/week)
- **Recommendation:** Start with API stack, add browser automation only if cost savings justify maintenance burden

---

## 🔧 Browser Automation Implementation (If Needed)

If you choose to use browser automation for closed platforms:

```typescript
// workspace/integrations/browser/xleads-agent.ts
import { browser_agent } from '../../tools';

export async function skipTraceWithXLeads(addresses: string[]) {
  const result = await browser_agent({
    message: `
      1. Log into XLeads at https://xleads.com/login
         - Email: {XLEADS_EMAIL}
         - Password: {XLEADS_PASSWORD}
      2. Navigate to Skip Tracing section
      3. Upload CSV with ${addresses.length} addresses
      4. Wait for processing (may take 5-10 minutes)
      5. Download results CSV
      6. Return the file path
      7. End task
    `,
    reset: true // New session each time
  });
  
  return result;
}
```

### Browser Automation Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Platform UI changes | Automation breaks | Schedule weekly tests |
| CAPTCHAs | Blocks automation | Use 2Captcha/DeathByCaptcha |
| Session timeouts | Login failures | Re-authentication logic |
| Rate limiting | Blocked account | Throttle requests |
| ToS violation | Account ban | Review terms carefully |

---

## ✅ Final Recommendation

### For Wholesaile, Use:

1. **BatchData API** - Property data ($500/mo)
2. **BatchSkipTracing API** - Skip tracing ($0.15/match)
3. **Call Loop API** - SMS/Voicemail ($29/mo)
4. **Skip browser automation** unless you have dedicated dev resources

### Why API-First?

- ✅ Reliable integration with OpenClaw agents
- ✅ Predictable costs and performance
- ✅ Easy debugging and monitoring
- ✅ Scales without maintenance burden
- ✅ No ToS concerns

### When to Consider Browser Automation?

- You process **10,000+ leads/month** and cost difference is significant
- You have **dedicated developers** to maintain automation
- You're willing to accept **fragility** for cost savings


---

## 📚 API Capabilities Documentation

### DealMachine API

**Base URL:** `https://api.dealmachine.com`
**Documentation:** https://docs.dealmachine.com/
**Authentication:** Bearer Token (find in Automation → API Docs section)
**Rate Limits:** 10 requests/second, 5,000 requests/day

#### Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/v1/leads` | Add a new lead |
| **GET** | `/v1/leads` | List all leads |
| **GET** | `/v1/leads/{id}` | Get lead by ID |
| **PUT** | `/v1/leads/{id}` | Update lead |
| **DELETE** | `/v1/leads/{id}` | Delete lead |
| **GET** | `/v1/lead-statuses` | Get all lead statuses |
| **GET** | `/v1/custom-fields` | Get all custom fields |
| **GET** | `/v1/teams` | Get team info |
| **GET** | `/v1/team-members` | Get team members |

#### Lead Object Structure

```typescript
interface DealMachineLead {
  id: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  status_id: string;
  custom_fields: Record<string, any>;
  tags: string[];
  notes: string;
  owner_name: string;
  owner_phone: string;
  owner_email: string;
  created_at: string;
  updated_at: string;
}
```

#### Example Request

```bash
curl -X POST "https://api.dealmachine.com/v1/leads" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "address": "123 Main St",
    "city": "Atlanta",
    "state": "GA",
    "zip": "30301"
  }'
```

#### Wholesaile Integration

```typescript
// workspace/integrations/dealmachine.ts
export class DealMachineClient {
  private baseUrl = 'https://api.dealmachine.com';
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async addLead(address: Address): Promise<Lead> {
    const response = await fetch(`${this.baseUrl}/v1/leads`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(address)
    });
    return response.json();
  }

  async updateLeadStatus(leadId: string, statusId: string): Promise<Lead> {
    const response = await fetch(`${this.baseUrl}/v1/leads/${leadId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status_id: statusId })
    });
    return response.json();
  }

  async getLeads(params: { status?: string; limit?: number }): Promise<Lead[]> {
    const url = new URL(`${this.baseUrl}/v1/leads`);
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
    const response = await fetch(url.toString(), {
      headers: { 'Authorization': `Bearer ${this.apiKey}` }
    });
    return response.json();
  }
}
```

---

### BatchLeads API (BatchService)

**Base URL:** `https://api.batchservice.com`
**Documentation:** https://developer.batchservice.com/docs/batchleads
**Authentication:** API Key

#### Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| **GET** | `/properties` | Search properties |
| **GET** | `/properties/{id}` | Get property details |
| **GET** | `/properties/saved` | Get saved properties |
| **POST** | `/properties/save` | Save property to list |
| **DELETE** | `/properties/{id}` | Remove saved property |
| **GET** | `/properties/{id}/tags` | Get property tags |
| **GET** | `/properties/{id}/activities` | Get property activities |
| **GET** | `/lists` | Get all lists |
| **POST** | `/lists` | Create new list |
| **GET** | `/statuses` | Get all statuses |
| **GET** | `/agents` | Get agents info |

#### Property Object Structure

```typescript
interface BatchLeadsProperty {
  id: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    county: string;
  };
  property_details: {
    beds: number;
    baths: number;
    sqft: number;
    lot_size: number;
    year_built: number;
    property_type: string;
  };
  ownership: {
    owner_name: string;
    mailing_address: string;
    ownership_type: string;
  };
  valuation: {
    estimated_value: number;
    arv: number;
    equity: number;
    equity_percent: number;
  };
  listing: {
    status: string;
    list_price: number;
    days_on_market: number;
  };
  tags: string[];
  status: string;
  notes: string;
  activities: Activity[];
}
```

#### Example Request

```bash
curl -X GET "https://api.batchservice.com/properties?city=Atlanta&state=GA" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

---

### BatchData API (Property Data + Skip Tracing)

**Base URL:** `https://api.batchdata.com`
**Documentation:** https://developer.batchdata.com/
**Pricing:** $500/mo property data, $2,000/mo skip tracing

#### Available Endpoints

| Category | Method | Endpoint | Description |
|----------|--------|----------|-------------|
| **Property** | GET | `/property/{address}` | Get property by address |
| **Property** | GET | `/property/{id}` | Get property by ID |
| **Property** | POST | `/property/search` | Search properties |
| **Property** | POST | `/property/batch` | Batch property lookup |
| **Ownership** | GET | `/ownership/{address}` | Get ownership info |
| **Ownership** | GET | `/ownership/{id}/history` | Ownership history |
| **Valuation** | GET | `/valuation/{address}` | Get property valuation |
| **Valuation** | GET | `/valuation/{address}/arv` | Get ARV estimate |
| **Skip Trace** | POST | `/skiptrace/phone` | Find phone numbers |
| **Skip Trace** | POST | `/skiptrace/email` | Find email addresses |
| **Skip Trace** | POST | `/skiptrace/batch` | Batch skip tracing |
| **Comps** | GET | `/comps/{address}` | Get comparables |
| **Comps** | GET | `/comps/{address}/radius` | Comps within radius |
| **Market** | GET | `/market/{zip}` | Market data by ZIP |
| **Market** | GET | `/market/{county}` | Market data by county |

#### Property Data Response

```typescript
interface BatchDataProperty {
  id: string;
  address: {
    full: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    county: string;
    latitude: number;
    longitude: number;
  };
  property: {
    beds: number;
    baths: number;
    sqft: number;
    lot_sqft: number;
    year_built: number;
    property_type: string;
    style: string;
    stories: number;
    garage: boolean;
    pool: boolean;
  };
  ownership: {
    owner_name: string;
    owner_type: string;
    mailing_address: string;
    phone: string;
    email: string;
  };
  valuation: {
    estimated_value: number;
    confidence_score: number;
    value_low: number;
    value_high: number;
    last_updated: string;
  };
  tax: {
    assessed_value: number;
    tax_amount: number;
    tax_year: number;
  };
  last_sale: {
    date: string;
    price: number;
    deed_type: string;
  };
  equity: {
    amount: number;
    percent: number;
  };
  // 700+ additional data points available
}
```

#### Skip Trace Response

```typescript
interface SkipTraceResult {
  input: {
    address: string;
    owner_name: string;
  };
  matches: Array<{
    name: string;
    phones: Array<{
      number: string;
      type: 'mobile' | 'landline' | 'voip';
      quality_score: number;
      do_not_call: boolean;
    }>;
    emails: Array<{
      address: string;
      quality_score: number;
    }>;
    relatives: Array<{
      name: string;
      relationship: string;
    }>;
  }>;
  hit_rate: number;
  confidence: number;
}
```

#### Example Requests

```bash
# Property Search
curl -X POST "https://api.batchdata.com/property/search" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "city": "Atlanta",
    "state": "GA",
    "filters": {
      "equity_percent": { "min": 30 },
      "property_type": "single_family",
      "vacant": true
    }
  }'

# Skip Tracing
curl -X POST "https://api.batchdata.com/skiptrace/batch" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "records": [
      { "address": "123 Main St, Atlanta, GA 30301", "owner_name": "John Doe" }
    ]
  }'
```

---

### API Comparison Summary

| Feature | DealMachine | BatchLeads | BatchData |
|---------|-------------|------------|-----------|
| **Lead Management** | ✅ Full CRUD | ✅ Full CRUD | ❌ |
| **Property Search** | ❌ | ✅ | ✅ Full |
| **Skip Tracing** | ✅ Included | ✅ Included | ✅ $2K/mo |
| **Property Data** | Limited | ✅ Good | ✅ Best (700+ fields) |
| **ARV/Valuation** | ❌ | ✅ | ✅ |
| **Market Data** | ❌ | ✅ | ✅ |
| **Driving for Dollars** | ✅ Best | ❌ | ❌ |
| **Mobile App** | ✅ Yes | ❌ | ❌ |
| **API Maturity** | Early | Mature | Mature |
| **Rate Limits** | 10/sec | Higher | Higher |
| **Price** | $49-99/mo | $99-199/mo | $500-2,500/mo |

---

### Recommended Integration Strategy for Wholesaile

```typescript
// workspace/integrations/config.ts
export const integrationConfig = {
  // PRIMARY: BatchData for comprehensive property data
  propertyData: {
    provider: 'batchdata',
    baseUrl: 'https://api.batchdata.com',
    features: ['property', 'ownership', 'valuation', 'comps', 'market']
  },

  // SECONDARY: BatchLeads for lead management
  leadManagement: {
    provider: 'batchleads',
    baseUrl: 'https://api.batchservice.com',
    features: ['lists', 'tags', 'statuses', 'activities']
  },

  // OPTIONAL: DealMachine for D4D mobile workflows
  driving4Dollars: {
    provider: 'dealmachine',
    baseUrl: 'https://api.dealmachine.com',
    features: ['mobile-d4d', 'field-capture']
  }
};
```

