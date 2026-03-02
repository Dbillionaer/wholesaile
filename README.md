# 🏠 Wholesaile — Wholesale Real Estate AI Team

> A multi-agent AI system for wholesale real estate investors.
> Built on [OpenClaw](https://github.com/openclaw/openclaw) — the open-source multi-channel AI gateway.

[![OpenClaw](https://img.shields.io/badge/built%20on-OpenClaw-orange)](https://github.com/openclaw/openclaw)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## What Is Wholesaile?

Wholesaile is a specialized fork of [OpenClaw](https://github.com/openclaw/openclaw) configured for wholesale real estate investors. It runs a coordinated team of 6 AI agents that handle the full deal lifecycle — from finding distressed properties to closing assignments.

### The Agent Team

| Agent | Role | Key Tasks |
|-------|------|-----------|
| 🔍 **Lead Scout** | Find motivated sellers | Zillow scans, county records, expired listings, driving-for-dollars leads |
| 📊 **Market Analyst** | Calculate deal numbers | ARV comps, repair estimates, MAO calculation |
| 🤝 **Acquisition Manager** | Negotiate with sellers | Seller outreach, scripts, contract execution |
| 📋 **Title Researcher** | Verify clear title | Lien searches, probate checks, title verdict |
| 💰 **Dispositions Manager** | Market to buyers | Buyer blast emails, deal packaging, assignment |
| 📝 **Transaction Coordinator** | Manage closing | Document checklist, timeline tracking, title company coordination |

---

## Quick Start

### Prerequisites

- Node.js 22+ or Bun
- A Telegram bot token (from [@BotFather](https://t.me/BotFather)) or WhatsApp Business API
- An Anthropic API key (Claude Sonnet/Opus)

### 1. Install OpenClaw

```bash
npm install -g openclaw@latest
```

### 2. Clone the Knowledge Base

```bash
git clone https://github.com/Dbillionaer/real-estate-knowledge ~/Documents/wholesale-kb
```

### 3. Install QMD (Semantic Memory Search)

```bash
bun install -g https://github.com/tobi/qmd
```

### 4. Configure Your Environment

```bash
# Copy workspace files
cp -r workspace/ ~/.openclaw/workspace/

# Set up environment variables
cp workspace/.env.example ~/.openclaw/.env
# Edit ~/.openclaw/.env and fill in your API keys and bot tokens
```

### 5. Start the Gateway

```bash
openclaw gateway
```

### 6. Verify Setup

```bash
openclaw channels status --probe
```

For detailed setup instructions, see [workspace/SETUP.md](workspace/SETUP.md).

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    WHOLESAILE GATEWAY                        │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  Lead    │  │  Market  │  │Acquisition│  │  Title   │  │
│  │  Scout   │  │ Analyst  │  │ Manager  │  │Researcher│  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
│                                                             │
│  ┌──────────┐  ┌──────────┐                               │
│  │Dispositions│ │Transaction│                              │
│  │ Manager  │  │  Coord   │                               │
│  └──────────┘  └──────────┘                               │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │              QMD Memory Backend                      │  │
│  │  ~/Documents/wholesale-kb (Obsidian Vault)           │  │
│  │  ~/.openclaw/workspace/deals/ (Deal Pipeline)        │  │
│  └─────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
         │                    │                    │
    Telegram              WhatsApp              Webhooks
    (primary)           (optional)          (lead ingestion)
```

---

## Key Features

- **Automated Lead Generation** — Daily Zillow scans, county records checks, expired listing alerts
- **MAO Calculator** — Automatic Maximum Allowable Offer calculation using 70% rule
- **Deal Pipeline** — Markdown-based deal tracking with status automation
- **Knowledge Base** — Obsidian vault with playbooks, call transcripts, comp data, buyer profiles
- **Webhook Lead Ingestion** — Accept leads from driving-for-dollars apps, direct mail, PPC campaigns
- **Multi-Channel** — Communicate via Telegram, WhatsApp, or any OpenClaw-supported channel

---

## Repository Structure

```
wholesaile/
├── workspace/              # Wholesaile-specific configuration
│   ├── openclaw.json       # Agent config, channels, webhooks, cron jobs
│   ├── SOUL.md             # Agent personality and values
│   ├── MEMORY.md           # Long-term memory store
│   ├── AGENTS.md           # Agent rules and guidelines
│   ├── USER.md             # Your investor profile
│   ├── SETUP.md            # Detailed setup guide
│   ├── WEBHOOK_API.md      # Webhook payload documentation
│   ├── COMPLIANCE.md       # Data retention and legal policy
│   ├── .env.example        # Environment variable template
│   ├── skills/             # Agent skill definitions
│   │   ├── lead-scout/
│   │   ├── market-analysis/
│   │   ├── acquisition/
│   │   ├── title-research/
│   │   ├── dispositions/
│   │   ├── transaction-coord/
│   │   └── compliance/
│   └── deals/              # Active deal pipeline
├── Swabble/                # Voice/speech tool (Swift)
├── scripts/                # Utility scripts
│   ├── backup-deals.sh     # Backup deal data
│   ├── sync-knowledge-base.sh  # Sync KB from GitHub
│   └── mao-calculator.ts   # MAO calculation utility
└── src/                    # OpenClaw core (upstream)
```

---

## Knowledge Base

The knowledge base lives in a separate repository:
**[Dbillionaer/real-estate-knowledge](https://github.com/Dbillionaer/real-estate-knowledge)**

It contains:
- Strategy playbooks (cash deals, seller finance, creative finance)
- Call transcripts and scripts
- Market comp data by ZIP code
- Buyer profiles
- Contract templates
- Agent lessons from closed deals

---

## Upstream

Wholesaile syncs regularly with [openclaw/openclaw](https://github.com/openclaw/openclaw).

For core OpenClaw documentation, see [docs.openclaw.ai](https://docs.openclaw.ai).

To sync with the latest upstream:
```bash
git remote add upstream https://github.com/openclaw/openclaw
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

---

## Contributing

This is a private fork. For OpenClaw core contributions, see [openclaw/openclaw](https://github.com/openclaw/openclaw).

---

## License

MIT — see [LICENSE](LICENSE)
