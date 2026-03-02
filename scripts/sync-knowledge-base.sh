#!/usr/bin/env bash
# Wholesaile Knowledge Base Sync Script
# Pulls latest knowledge base from GitHub and rebuilds QMD index
#
# Usage:
#   bash scripts/sync-knowledge-base.sh
#
# Options:
#   --no-index    Skip QMD index rebuild
#   --force       Force re-clone even if directory exists

set -euo pipefail

# ─── Configuration ────────────────────────────────────────────────────────────
KB_DIR="${WHOLESALE_KB_DIR:-$HOME/Documents/wholesale-kb}"
REPO_URL="${WHOLESALE_KB_REPO:-https://github.com/Dbillionaer/real-estate-knowledge}"
SKIP_INDEX=false
FORCE_CLONE=false
LOG_PREFIX="[sync-kb $(date '+%Y-%m-%d %H:%M:%S')]"

# ─── Parse Arguments ──────────────────────────────────────────────────────────
for arg in "$@"; do
  case $arg in
    --no-index) SKIP_INDEX=true ;;
    --force) FORCE_CLONE=true ;;
    --help)
      echo "Usage: $0 [--no-index] [--force]"
      echo ""
      echo "Options:"
      echo "  --no-index    Skip QMD index rebuild after sync"
      echo "  --force       Force re-clone (deletes existing directory)"
      echo ""
      echo "Environment variables:"
      echo "  WHOLESALE_KB_DIR   Knowledge base directory (default: ~/Documents/wholesale-kb)"
      echo "  WHOLESALE_KB_REPO  Repository URL (default: https://github.com/Dbillionaer/real-estate-knowledge)"
      exit 0
      ;;
  esac
done

# ─── Clone or Update ──────────────────────────────────────────────────────────
echo "$LOG_PREFIX Syncing Wholesale Knowledge Base..."
echo "$LOG_PREFIX Repository: $REPO_URL"
echo "$LOG_PREFIX Local path: $KB_DIR"

if [ "$FORCE_CLONE" = true ] && [ -d "$KB_DIR" ]; then
  echo "$LOG_PREFIX Force re-clone: removing existing directory..."
  rm -rf "$KB_DIR"
fi

if [ ! -d "$KB_DIR" ]; then
  echo "$LOG_PREFIX Cloning knowledge base (first time)..."
  git clone "$REPO_URL" "$KB_DIR"
  echo "$LOG_PREFIX Clone complete."
else
  echo "$LOG_PREFIX Updating existing knowledge base..."
  cd "$KB_DIR"

  # Check for uncommitted local changes
  if ! git diff --quiet 2>/dev/null; then
    echo "$LOG_PREFIX WARNING: Local changes detected. Stashing before pull..."
    git stash push -m "auto-stash before sync $(date +%Y-%m-%d)"
  fi

  # Pull latest
  git pull origin main 2>&1 | while IFS= read -r line; do
    echo "$LOG_PREFIX   $line"
  done

  echo "$LOG_PREFIX Update complete."
  cd - > /dev/null
fi

# ─── Show What Changed ────────────────────────────────────────────────────────
echo "$LOG_PREFIX Knowledge base contents:"
echo "$LOG_PREFIX   $(find "$KB_DIR" -name "*.md" | wc -l | tr -d ' ') markdown files"
echo "$LOG_PREFIX   $(find "$KB_DIR" -name "*.pdf" 2>/dev/null | wc -l | tr -d ' ') PDF files"
echo "$LOG_PREFIX   $(du -sh "$KB_DIR" 2>/dev/null | cut -f1) total size"

# ─── Rebuild QMD Index ────────────────────────────────────────────────────────
if [ "$SKIP_INDEX" = false ]; then
  if command -v qmd &> /dev/null; then
    echo "$LOG_PREFIX Rebuilding QMD semantic index..."
    qmd index "$KB_DIR" 2>&1 | while IFS= read -r line; do
      echo "$LOG_PREFIX   $line"
    done
    echo "$LOG_PREFIX QMD index rebuilt successfully."
  else
    echo "$LOG_PREFIX WARNING: QMD not found. Install with: bun install -g https://github.com/tobi/qmd"
    echo "$LOG_PREFIX Skipping index rebuild."
  fi
else
  echo "$LOG_PREFIX Skipping QMD index rebuild (--no-index flag)."
fi

# ─── Done ─────────────────────────────────────────────────────────────────────
echo "$LOG_PREFIX Knowledge base sync complete."
echo "$LOG_PREFIX Path: $KB_DIR"
