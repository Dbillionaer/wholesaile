# Wholesaile Setup Guide

Step-by-step instructions to get your wholesale real estate AI team running.

---

## Prerequisites

- **Node.js 22+** or **Bun** installed
- **Git** installed
- A **Telegram bot token** (from [@BotFather](https://t.me/BotFather)) — or WhatsApp Business API
- An **Anthropic API key** (for Claude Sonnet/Opus) — get at [console.anthropic.com](https://console.anthropic.com/)

---

## Step 1: Install OpenClaw

```bash
npm install -g openclaw@latest
```

Verify installation:

```bash
openclaw --version
```

---

## Step 2: Clone the Knowledge Base

The knowledge base is an Obsidian vault with playbooks, scripts, comp data, and buyer profiles.

```bash
git clone https://github.com/Dbillionaer/real-estate-knowledge ~/Documents/wholesale-kb
```

Optional: Open it as an Obsidian vault for easy browsing:
1. Install [Obsidian](https://obsidian.md/)
2. File → Open Vault → `~/Documents/wholesale-kb`

---

## Step 3: Install QMD (Semantic Memory Search)

QMD indexes your knowledge base for semantic search by the agents.

```bash
bun install -g https://github.com/tobi/qmd
```

Verify:

```bash
qmd --version
```

---

## Step 4: Configure Environment Variables

```bash
# Copy the example env file to OpenClaw's config directory
cp workspace/.env.example ~/.openclaw/.env

# Edit and fill in your values
nano ~/.openclaw/.env
```

**Required variables:**

| Variable | Where to Get It |
|----------|----------------|
| `ANTHROPIC_API_KEY` | [console.anthropic.com](https://console.anthropic.com/) |
| `TELEGRAM_BOT_TOKEN` | Message [@BotFather](https://t.me/BotFather) on Telegram |

**Optional variables** (add as you need them):
- `OPENAI_API_KEY` — for GPT models
- `WHATSAPP_ACCESS_TOKEN` — for WhatsApp channel
- `BATCH_SKIP_TRACING_API_KEY` — for skip tracing

---

## Step 5: Copy Workspace Files

```bash
# Copy the workspace configuration to OpenClaw's home directory
cp -r workspace/ ~/.openclaw/workspace/
```

This copies:
- `openclaw.json` — agent config, channels, webhooks, cron jobs
- `SOUL.md` — agent personality
- `MEMORY.md` — long-term memory template
- `AGENTS.md` — agent rules
- `skills/` — all 6 agent skill definitions
- `deals/` — deal pipeline directory

---

## Step 6: Configure Your Profile

Edit `~/.openclaw/workspace/USER.md` to set your investment criteria:

```bash
nano ~/.openclaw/workspace/USER.md
```

Fill in:
- Your target ZIP codes/markets
- Price range (min/max purchase price)
- Property types you buy
- Minimum equity/spread requirements
- Your contact information

---

## Step 7: Configure Your Channels

Edit `~/.openclaw/workspace/openclaw.json` to set up your messaging channels:

```bash
nano ~/.openclaw/workspace/openclaw.json
```

For Telegram, add your phone number to `allowFrom`:

```json
"telegram": {
  "enabled": true,
  "botToken": "${TELEGRAM_BOT_TOKEN}",
  "dmPolicy": "allowlist",
  "allowFrom": ["+15551234567"]  // Your phone number
}
```

---

## Step 8: Start the Gateway

```bash
openclaw gateway
```

The gateway will start on port 18789 by default.

To run in the background:

```bash
openclaw daemon start
```

---

## Step 9: Verify Setup

Check that all channels are connected:

```bash
openclaw channels status --probe
```

Check gateway health:

```bash
openclaw health
```

---

## Step 10: Test Your First Agent

Send a message to your Telegram bot:

```
@your-bot-name Hello, what can you help me with?
```

Or use the CLI:

```bash
openclaw message send --agent lead-scout "Find distressed properties in ZIP 30318"
```

---

## Troubleshooting

### Gateway won't start

```bash
# Check for port conflicts
ss -ltnp | grep 18789

# Check logs
openclaw logs --tail 50

# Run doctor
openclaw doctor
```

### Telegram bot not responding

1. Verify `TELEGRAM_BOT_TOKEN` is set in `~/.openclaw/.env`
2. Check your phone number is in `allowFrom`
3. Run `openclaw channels status --probe`

### Memory search not working

1. Verify QMD is installed: `qmd --version`
2. Check knowledge base path exists: `ls ~/Documents/wholesale-kb`
3. Rebuild QMD index: `qmd index ~/Documents/wholesale-kb`

### Webhook not receiving leads

1. Verify gateway is running: `openclaw health`
2. Test with curl (see [WEBHOOK_API.md](WEBHOOK_API.md))
3. Check firewall allows port 18789

---

## Keeping Up to Date

### Update OpenClaw

```bash
npm install -g openclaw@latest
```

### Sync Knowledge Base

```bash
cd ~/Documents/wholesale-kb && git pull origin main
```

Or use the sync script:

```bash
bash scripts/sync-knowledge-base.sh
```

### Sync Wholesaile with Upstream OpenClaw

```bash
git remote add upstream https://github.com/openclaw/openclaw 2>/dev/null || true
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

---

## Backup Your Data

Run the backup script to protect your deal data:

```bash
bash scripts/backup-deals.sh
```

Add to cron for daily backups:

```bash
# Add to crontab: crontab -e
0 2 * * * /path/to/wholesaile/scripts/backup-deals.sh >> ~/.openclaw/logs/backup.log 2>&1
```

---

## Next Steps

1. **Add your buyer list** — Create buyer profile files in `~/Documents/wholesale-kb/buyer-profiles/`
2. **Add market data** — Add comp files to `~/Documents/wholesale-kb/market-data/`
3. **Configure cron jobs** — Review the automated tasks in `openclaw.json` under `automation.cron`
4. **Set up webhooks** — Connect your lead sources (see [WEBHOOK_API.md](WEBHOOK_API.md))
5. **Review compliance** — Read [COMPLIANCE.md](COMPLIANCE.md) for legal requirements
