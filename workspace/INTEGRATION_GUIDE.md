# 🔗 Knowledge Base Integration Guide

> How to connect the wholesale real estate knowledge base (Obsidian vault) to the OpenClaw agent system via QMD.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                    KNOWLEDGE BASE (Obsidian Vault)                  │
│              ~/Documents/wholesale-kb/                              │
│                                                                     │
│  📚 Playbooks    📞 Transcripts    🧠 Reference    📄 Contracts     │
│  (22 guides)     (56+ calls)       (6 guides)      (7 templates)    │
│                                                                     │
│  🆕 agent-lessons/   market-data/   buyer-profiles/                 │
│     (grows with      (grows with    (grows with                     │
│      every deal)      every comp)    every buyer)                   │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                    QMD indexes vault
                    (BM25 + vector search)
                    watches for changes
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    OPENCLAW GATEWAY                                 │
│              ~/.openclaw/  (wholesaile repo)                        │
│                                                                     │
│  memory_search("seller objection price too low")                    │
│       → Returns: Seller Finance Pitch 19, Pitch 23, etc.           │
│                                                                     │
│  memory_get("seller_finance_playbook.md")                           │
│       → Returns: Full playbook content                              │
│                                                                     │
│  write to: ~/Documents/wholesale-kb/agent-lessons/...               │
│       → QMD auto-indexes new file within 5 minutes                 │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                    Agents query & write
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
        ▼                      ▼                      ▼
┌─────────────┐      ┌─────────────────┐    ┌──────────────────┐
│ ACQUISITION │      │ MARKET ANALYST  │    │  DISPOSITIONS    │
│   MANAGER   │      │                 │    │    MANAGER       │
│             │      │ Queries comps   │    │                  │
│ Queries     │      │ Writes market   │    │ Queries buyers   │
│ pitch       │      │ data back       │    │ Writes buyer     │
│ transcripts │      │                 │    │ profiles back    │
│ Writes      │      │                 │    │                  │
│ lessons     │      │                 │    │                  │
└─────────────┘      └─────────────────┘    └──────────────────┘
```

## Setup Instructions

### Step 1: Clone the Knowledge Base

```bash
# Clone the knowledge base as an Obsidian vault
git clone https://github.com/Dbillionaer/wholesaile-kb ~/Documents/wholesale-kb

# Or if it's part of this repo:
cp -r /path/to/knowledge-base ~/Documents/wholesale-kb
```

### Step 2: Open as Obsidian Vault

1. Open Obsidian
2. File → Open Vault
3. Select `~/Documents/wholesale-kb`
4. Obsidian will recognize the `.obsidian/` config automatically

### Step 3: Install QMD

```bash
# Install QMD for local-first semantic search
bun install -g https://github.com/tobi/qmd

# Verify installation
qmd --version
```

### Step 4: Install OpenClaw

```bash
npm install -g openclaw@latest
# or
pnpm add -g openclaw@latest
```

### Step 5: Copy Workspace Files

```bash
# Copy the workspace configuration
cp -r workspace/* ~/.openclaw/workspace/

# Copy the updated openclaw.json (with knowledge base paths)
cp wholesaile-workspace-patch/openclaw.json ~/.openclaw/openclaw.json

# Copy updated skill definitions
for skill in acquisition dispositions lead-scout market-analysis title-research transaction-coord; do
  cp wholesaile-workspace-patch/skills/$skill/SKILL.md ~/.openclaw/workspace/skills/$skill/SKILL.md
done
```

### Step 6: Configure Your Settings

Edit `~/.openclaw/workspace/USER.md`:
- Add your name, company, phone, email
- Set your target markets (ZIP codes)
- Set your investment criteria
- Add your Telegram bot token to `openclaw.json`

### Step 7: Start the Gateway

```bash
openclaw onboard --install-daemon
openclaw gateway --port 18789 --verbose
```

### Step 8: Verify Knowledge Base is Indexed

```bash
# Test a search
openclaw agent --message "Search the knowledge base for seller finance pitch techniques"
```

---

## How the Knowledge Base Grows

### Automatic Growth (Agent-Written)

Every time an agent completes a task, it writes back to the vault:

| Agent | Writes To | When |
|-------|-----------|------|
| Acquisition Manager | `agent-lessons/` | After every call |
| Market Analyst | `market-data/` | After every comp analysis |
| Dispositions Manager | `buyer-profiles/` | After every buyer interaction |
| Transaction Coordinator | `agent-lessons/` | After every closing |

QMD watches for file changes and re-indexes within 5 minutes.

### Manual Growth (You Add)

1. **New call recordings** → Transcribe and add to `cash_deals/`, `seller_finance/`, or `creative_finance/` with proper YAML frontmatter
2. **New strategies** → Add playbook files to root
3. **Market research** → Add to `market-data/`
4. **New buyers** → Add to `buyer-profiles/`

### Weekly KB Review (Automated)

Every Sunday at 9 AM, the orchestrator runs a knowledge base review:
- Checks for deals closed without lessons written
- Flags stale market data (>30 days)
- Suggests buyer profile updates

---

## Query Patterns for Agents

### Semantic Search (Natural Language)
```
memory_search("seller objection price too low response")
memory_search("ARV calculation comparable sales method")
memory_search("buyer cash investor single family under 200k")
```

### Direct File Access
```
memory_get("seller_finance_playbook.md")
memory_get("comprehensive_decision_tree.md")
memory_get("Closing_Process_Checklist.md")
```

### Frontmatter-Aware Search
QMD indexes YAML frontmatter fields, so these work:
```
memory_search("demonstrates_technique: Morby Method")
memory_search("outcome: accepted subject to")
memory_search("seller_profile: sophisticated investor")
memory_search("objections_handled: due on sale")
```

---

## Keeping the Vault in Sync

The knowledge base is a Git repo. To keep it updated:

```bash
# Pull latest knowledge base updates
cd ~/Documents/wholesale-kb && git pull

# Push your agent-written lessons back
cd ~/Documents/wholesale-kb
git add agent-lessons/ market-data/ buyer-profiles/
git commit -m "Agent lessons: [date]"
git push
```

This creates a feedback loop where every deal makes the system smarter.
