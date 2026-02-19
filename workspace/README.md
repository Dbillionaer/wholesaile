# Wholesale Real Estate AI Team

A multi-agent AI system for wholesale real estate investing built on [OpenClaw](https://github.com/openclaw/openclaw).

## 🏠 Overview

This workspace configures a team of specialized AI agents:

1. **Lead Scout** 🔍 - Find distressed properties
2. **Market Analyst** 📊 - Calculate ARV and MAO
3. **Acquisition Manager** 🤝 - Negotiate with sellers
4. **Title Researcher** 📋 - Verify clear title
5. **Dispositions Manager** 💰 - Market to buyers
6. **Transaction Coordinator** 📝 - Manage closings

## 🚀 Quick Start

### 1. Install OpenClaw
```bash
npm install -g openclaw@latest
```

### 2. Install QMD (for memory search)
```bash
bun install -g https://github.com/tobi/qmd
```

### 3. Copy Workspace
```bash
cp -r workspace/* ~/.openclaw/workspace/
```

### 4. Configure
```bash
cp workspace/openclaw.json ~/.openclaw/openclaw.json
# Edit with your settings (add Telegram bot token, etc.)
```

### 5. Set Up Channels
```bash
openclaw channels login --channel whatsapp
openclaw channels login --channel telegram
```

### 6. Start Gateway
```bash
openclaw gateway
```

## 📁 Workspace Structure

```
~/.openclaw/workspace/
├── AGENTS.md              # Architecture overview
├── SOUL.md                # Core values
├── USER.md                # Your preferences
├── MEMORY.md              # Long-term memory (buyers, criteria)
├── openclaw.json          # Configuration
├── memory/                # Daily logs
├── deals/                 # Deal pipeline files
│   └── .deal-template.md  # Template for new deals
└── skills/
    ├── lead-scout/
    ├── market-analysis/
    ├── acquisition/
    ├── title-research/
    ├── dispositions/
    └── transaction-coord/
```

## 📊 Deal Pipeline Tracker

### Pipeline Stages
```
NEW LEAD → CONTACTED → UNDER CONTRACT → TITLE CLEAR → MARKETING → ASSIGNED → CLOSED
   🔍         📞            ✍️              📋            📢           🤝         💰
```

### Creating Deals
```
You: "New lead: 123 Main St, asking $180K, 3/2, needs work"
```
Creates `deals/2026-02-19-123-main-st.md` with all details.

### Checking Pipeline
```
You: "What's my pipeline?"
You: "What deals are stuck?"
```

## ⏰ Automated Lead Generation

The system runs automated scans:

| Schedule | Task |
|----------|------|
| Daily 7 AM | Zillow scan for listings & price drops |
| Daily 10 AM | Expired MLS listings check |
| Every 4 hours | Price drop alerts |
| Weekly Monday | County records (tax delinquent, code violations) |
| Daily 8 AM | Stale deal alerts |
| Daily 6 PM | Pipeline summary |

## 🧠 Memory System

All agents share memory via QMD semantic search:

- **MEMORY.md** - Buyer list, criteria, lessons learned
- **memory/YYYY-MM-DD.md** - Daily logs
- **deals/*.md** - Deal files (searchable)

### Using Memory
```
You: "Remember this buyer: John, cash buyer, likes 3/2s in 30318"
You: "What buyers do I have for properties under $200K?"
```

## 📊 Key Formula: MAO

```
MAO = ARV × 0.70 - Repair Costs - Assignment Fee - Closing Costs
```

## 🤖 Agent Commands

```
"Find deals in ZIP code 30318"
"Analyze deal at 123 Main St, asking $100K"
"Contact seller for 123 Main St"
"Research title for 123 Main St"
"Market deal at 123 Main St"
"Open escrow for 123 Main St"
"What's my pipeline?"
"What deals are stuck?"
```

## 📚 Documentation

- [OpenClaw Docs](https://docs.openclaw.ai)
- [Configuration Reference](https://docs.openclaw.ai/gateway/configuration)
- [Skills Platform](https://docs.openclaw.ai/tools/skills)
- [Memory System](https://docs.openclaw.ai/concepts/memory)

---

**Built with OpenClaw** 🦞
