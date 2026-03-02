#!/usr/bin/env bash
# Wholesaile Deal Backup Script
# Backs up deal pipeline, workspace memory, and knowledge base
#
# Usage:
#   bash scripts/backup-deals.sh
#
# Add to crontab for daily backups:
#   0 2 * * * /path/to/wholesaile/scripts/backup-deals.sh >> ~/.openclaw/logs/backup.log 2>&1

set -euo pipefail

# ─── Configuration ────────────────────────────────────────────────────────────
BACKUP_DIR="${OPENCLAW_BACKUP_DIR:-$HOME/.openclaw/backups}"
OPENCLAW_HOME="${OPENCLAW_HOME:-$HOME/.openclaw}"
KNOWLEDGE_DIR="${WHOLESALE_KB_DIR:-$HOME/Documents/wholesale-kb}"
DATE=$(date +%Y-%m-%d)
RETENTION_DAYS="${BACKUP_RETENTION_DAYS:-30}"
LOG_PREFIX="[backup-deals $(date '+%Y-%m-%d %H:%M:%S')]"

# ─── Setup ────────────────────────────────────────────────────────────────────
mkdir -p "$BACKUP_DIR"
mkdir -p "$OPENCLAW_HOME/logs"

echo "$LOG_PREFIX Starting backup..."

# ─── Workspace Backup ─────────────────────────────────────────────────────────
WORKSPACE_BACKUP="$BACKUP_DIR/workspace-$DATE.tar.gz"

if [ -d "$OPENCLAW_HOME/workspace" ]; then
  echo "$LOG_PREFIX Backing up workspace..."
  tar -czf "$WORKSPACE_BACKUP" \
    -C "$OPENCLAW_HOME" \
    workspace/ \
    2>/dev/null || true
  echo "$LOG_PREFIX Workspace backup: $WORKSPACE_BACKUP ($(du -sh "$WORKSPACE_BACKUP" | cut -f1))"
else
  echo "$LOG_PREFIX WARNING: Workspace directory not found at $OPENCLAW_HOME/workspace"
fi

# ─── Knowledge Base Backup ────────────────────────────────────────────────────
if [ -d "$KNOWLEDGE_DIR" ]; then
  KB_BACKUP="$BACKUP_DIR/knowledge-base-$DATE.tar.gz"
  echo "$LOG_PREFIX Backing up knowledge base..."
  tar -czf "$KB_BACKUP" \
    -C "$(dirname "$KNOWLEDGE_DIR")" \
    "$(basename "$KNOWLEDGE_DIR")" \
    2>/dev/null || true
  echo "$LOG_PREFIX Knowledge base backup: $KB_BACKUP ($(du -sh "$KB_BACKUP" | cut -f1))"
else
  echo "$LOG_PREFIX INFO: Knowledge base not found at $KNOWLEDGE_DIR (skipping)"
fi

# ─── Config Backup (without secrets) ─────────────────────────────────────────
CONFIG_FILE="$OPENCLAW_HOME/openclaw.json"
if [ -f "$CONFIG_FILE" ]; then
  CONFIG_BACKUP="$BACKUP_DIR/config-$DATE.json"
  # Copy config but redact any inline secrets (lines with token/key/password)
  sed 's/\(".*[Tt]oken\|.*[Kk]ey\|.*[Pp]assword\|.*[Ss]ecret\)":\s*"[^$][^"]*"/\1: "[REDACTED]"/g' \
    "$CONFIG_FILE" > "$CONFIG_BACKUP" 2>/dev/null || cp "$CONFIG_FILE" "$CONFIG_BACKUP"
  echo "$LOG_PREFIX Config backup: $CONFIG_BACKUP"
fi

# ─── Cleanup Old Backups ──────────────────────────────────────────────────────
echo "$LOG_PREFIX Cleaning up backups older than $RETENTION_DAYS days..."
find "$BACKUP_DIR" -name "*.tar.gz" -mtime "+$RETENTION_DAYS" -delete 2>/dev/null || true
find "$BACKUP_DIR" -name "*.json" -mtime "+$RETENTION_DAYS" -delete 2>/dev/null || true

# ─── Summary ──────────────────────────────────────────────────────────────────
BACKUP_COUNT=$(find "$BACKUP_DIR" -name "*.tar.gz" -o -name "*.json" 2>/dev/null | wc -l | tr -d ' ')
BACKUP_SIZE=$(du -sh "$BACKUP_DIR" 2>/dev/null | cut -f1 || echo "unknown")

echo "$LOG_PREFIX Backup complete."
echo "$LOG_PREFIX Total backups: $BACKUP_COUNT files, $BACKUP_SIZE total"
echo "$LOG_PREFIX Backup location: $BACKUP_DIR"

# List recent backups
echo "$LOG_PREFIX Recent backups:"
ls -lht "$BACKUP_DIR"/*.tar.gz "$BACKUP_DIR"/*.json 2>/dev/null | head -10 || true
