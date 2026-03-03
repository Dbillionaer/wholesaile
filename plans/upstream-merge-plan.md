# Plan: Merge Upstream openclaw/openclaw into wholesaile

## Context

`Dbillionaer/wholesaile` is a fork of `openclaw/openclaw` customized for wholesale real estate investing. Current version: `2026.3.1`.

## Wholesale-Specific Customizations to Protect

| Location | What It Is |
|---|---|
| `workspace/` | Entire wholesale workspace — agents, skills, memory, deals |
| `workspace/AGENTS.md` | Multi-agent orchestrator architecture for real estate |
| `workspace/SOUL.md` | Core values and operating principles |
| `workspace/MEMORY.md` | Long-term memory template (buyers, criteria, formulas) |
| `workspace/openclaw.json` | Full agent config: 6 specialized agents + cron jobs + webhooks |
| `workspace/COMPLIANCE.md` | TCPA/data retention compliance policy |
| `workspace/INTEGRATION_GUIDE.md` | QMD knowledge base integration guide |
| `workspace/skills/*/SKILL.md` | 7 agent skill definitions |
| `workspace/deals/.deal-template.md` | Deal pipeline file template |
| `workspace/memory/` | Daily memory logs |
| `package.json` lines 5-14 | Wholesale keywords, homepage, bugs URL, repository URL |
| `Swabble/` | Custom Swift CLI tool (not in upstream) |

## Conflict Resolution Rules

| File/Area | Rule |
|---|---|
| `package.json` `name`, `keywords`, `homepage`, `bugs`, `repository` | **Keep wholesaile values** |
| `package.json` `version`, `dependencies`, `scripts` | **Take upstream** |
| `workspace/` | **Always keep wholesaile** — upstream has no `workspace/` dir |
| `Swabble/` | **Keep wholesaile** — custom addition not in upstream |
| `src/`, `extensions/`, `apps/` | **Take upstream** — no wholesale customizations here |
| `CHANGELOG.md` | **Merge** — prepend upstream entries |
| `AGENTS.md` (root) | **Take upstream** — root AGENTS.md is openclaw's |

## Execution Steps

### 1. Add upstream remote
```bash
git remote add upstream https://github.com/openclaw/openclaw.git
# (skip if already exists)
```

### 2. Fetch upstream
```bash
git fetch upstream
```

### 3. Merge upstream/main
```bash
git merge upstream/main --no-ff -m "chore: merge openclaw upstream to latest"
```

### 4. Resolve conflicts (if any)
- `package.json`: keep wholesaile `name`, `keywords`, `homepage`, `bugs.url`, `repository.url`; take upstream `version`, `dependencies`, `devDependencies`, `scripts`
- `workspace/` files: always keep wholesaile version (upstream has none, so no conflicts expected)
- `CHANGELOG.md`: accept merge (prepend upstream entries)

### 5. Install updated dependencies
```bash
pnpm install
```

### 6. Build to verify TypeScript compiles
```bash
pnpm build
```

### 7. Run tests
```bash
pnpm test
```

### 8. Commit the merge
```bash
scripts/committer "chore: merge openclaw upstream to latest" package.json pnpm-lock.yaml
```

## Architecture Diagram

```
wholesaile (fork)          openclaw/openclaw (upstream)
      │                              │
      │   git fetch upstream         │
      │◄─────────────────────────────┤
      │                              │
      │   git merge upstream/main    │
      │◄─────────────────────────────┤
      │                              │
      ▼
  Resolve conflicts:
  - package.json: keep wholesaile metadata, take upstream version/deps
  - workspace/: no conflicts (upstream has none)
  - src/: take upstream (no wholesale customizations)
      │
      ▼
  pnpm install → pnpm build → pnpm test → commit
```
