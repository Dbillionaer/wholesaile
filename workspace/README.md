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

### 2. Copy Workspace
```bash
cp -r workspace/* ~/.openclaw/workspace/
```

### 3. Configure
```bash
cp workspace/openclaw.json ~/.openclaw/openclaw.json
# Edit with your settings
```

### 4. Set Up Channels
```bash
openclaw channels login --channel whatsapp
```

### 5. Start Gateway
```bash
openclaw gateway
```

## 📁 Workspace Structure

```
~/.openclaw/workspace/
├── AGENTS.md              # Architecture overview
├── SOUL.md                # Core values
├── USER.md                # Your preferences
├── openclaw.json          # Configuration
└── skills/
    ├── lead-scout/SKILL.md
    ├── market-analysis/SKILL.md
    ├── acquisition/SKILL.md
    ├── title-research/SKILL.md
    ├── dispositions/SKILL.md
    └── transaction-coord/SKILL.md
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
```

## 📚 Documentation

- [OpenClaw Docs](https://docs.openclaw.ai)
- [Configuration Reference](https://docs.openclaw.ai/gateway/configuration)
- [Skills Platform](https://docs.openclaw.ai/tools/skills)

---

**Built with OpenClaw** 🦞
