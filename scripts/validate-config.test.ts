/**
 * Wholesaile Configuration Validation Tests
 *
 * Validates that workspace/openclaw.json has the correct structure,
 * all required agents, valid cron schedules, and no hardcoded secrets.
 */

import { describe, it, expect, beforeAll } from "vitest";
import fs from "fs";
import path from "path";
import JSON5 from "json5";

const CONFIG_PATH = path.join(__dirname, "../workspace/openclaw.json");

// ─── Load Config ──────────────────────────────────────────────────────────────

let configContent: string;
let config: Record<string, unknown>;

beforeAll(() => {
  configContent = fs.readFileSync(CONFIG_PATH, "utf-8");
  // openclaw.json uses JSON5 (allows comments)
  config = JSON5.parse(configContent) as Record<string, unknown>;
});

// ─── Structure Tests ──────────────────────────────────────────────────────────

describe("openclaw.json structure", () => {
  it("should be valid JSON5", () => {
    expect(() => JSON5.parse(configContent)).not.toThrow();
  });

  it("should have agents section", () => {
    expect(config).toHaveProperty("agents");
  });

  it("should have memory section", () => {
    expect(config).toHaveProperty("memory");
  });

  it("should have channels section", () => {
    expect(config).toHaveProperty("channels");
  });

  it("should have automation section", () => {
    expect(config).toHaveProperty("automation");
  });
});

// ─── Agent Tests ──────────────────────────────────────────────────────────────

describe("agent configuration", () => {
  const REQUIRED_AGENTS = [
    "lead-scout",
    "market-analysis",
    "acquisition",
    "title-research",
    "dispositions",
    "transaction-coord",
  ];

  it("should have all 6 required agents defined", () => {
    const agents = config.agents as { list?: Array<{ id: string }> };
    expect(agents).toHaveProperty("list");
    const agentIds = agents.list!.map((a) => a.id);

    for (const required of REQUIRED_AGENTS) {
      expect(agentIds).toContain(required);
    }
  });

  it("should have agent defaults configured", () => {
    const agents = config.agents as { defaults?: Record<string, unknown> };
    expect(agents).toHaveProperty("defaults");
    expect(agents.defaults).toHaveProperty("model");
    expect(agents.defaults).toHaveProperty("workspace");
  });

  it("each agent should have specific tool permissions (not wildcard)", () => {
    const agents = config.agents as {
      list?: Array<{ id: string; tools?: { allow?: string[] } }>;
    };

    for (const agent of agents.list ?? []) {
      if (agent.tools?.allow) {
        expect(agent.tools.allow).not.toContain("*");
        expect(agent.tools.allow.length).toBeGreaterThan(0);
      }
    }
  });

  it("each agent should have an emoji", () => {
    const agents = config.agents as {
      list?: Array<{ id: string; emoji?: string }>;
    };

    for (const agent of agents.list ?? []) {
      expect(agent.emoji).toBeTruthy();
    }
  });
});

// ─── Webhook Tests ────────────────────────────────────────────────────────────

describe("webhook configuration", () => {
  it("should have all 3 lead ingestion webhooks", () => {
    const automation = config.automation as {
      webhooks?: Array<{ path: string }>;
    };
    const paths = automation.webhooks?.map((w) => w.path) ?? [];

    expect(paths).toContain("/leads/dfd");
    expect(paths).toContain("/leads/mail");
    expect(paths).toContain("/leads/ppc");
  });

  it("each webhook should have an id and path", () => {
    const automation = config.automation as {
      webhooks?: Array<{ id?: string; path?: string }>;
    };

    for (const webhook of automation.webhooks ?? []) {
      expect(webhook.id).toBeTruthy();
      expect(webhook.path).toBeTruthy();
      expect(webhook.path).toMatch(/^\//); // Must start with /
    }
  });
});

// ─── Cron Job Tests ───────────────────────────────────────────────────────────

describe("cron job configuration", () => {
  it("should have cron jobs defined", () => {
    const automation = config.automation as {
      cron?: Array<{ id: string; schedule: string }>;
    };
    expect(automation.cron).toBeDefined();
    expect(automation.cron!.length).toBeGreaterThan(0);
  });

  it("each cron job should have a valid 5-part schedule", () => {
    const automation = config.automation as {
      cron?: Array<{ id: string; schedule: string; message: string }>;
    };

    for (const job of automation.cron ?? []) {
      expect(job.id).toBeTruthy();
      expect(job.schedule).toBeTruthy();
      expect(job.message).toBeTruthy();

      // Validate cron schedule format (5 space-separated parts)
      const parts = job.schedule.split(" ");
      expect(parts.length).toBe(5);
    }
  });
});

// ─── Security Tests ───────────────────────────────────────────────────────────

describe("security — no hardcoded secrets", () => {
  it("should not have hardcoded Telegram bot tokens", () => {
    // Should use ${TELEGRAM_BOT_TOKEN} env var syntax, not a real token
    expect(configContent).not.toMatch(/botToken:\s*"[a-zA-Z0-9]{20,}"/);
    // Should not have the old placeholder either
    expect(configContent).not.toContain("YOUR_TELEGRAM_BOT_TOKEN");
  });

  it("should not have hardcoded API keys", () => {
    // Real API keys are typically 20+ alphanumeric chars
    // This checks for patterns like: apiKey: "sk-ant-api03-..."
    expect(configContent).not.toMatch(/apiKey:\s*"sk-[a-zA-Z0-9-]{20,}"/);
    expect(configContent).not.toMatch(/apiKey:\s*"[a-zA-Z0-9]{32,}"/);
  });

  it("should use env var syntax for sensitive values", () => {
    // Telegram token should use ${...} syntax
    const channels = config.channels as {
      telegram?: { botToken?: string };
    };
    if (channels.telegram?.botToken) {
      expect(channels.telegram.botToken).toMatch(/^\$\{[A-Z_]+\}$/);
    }
  });
});

// ─── Memory Configuration Tests ───────────────────────────────────────────────

describe("memory configuration", () => {
  it("should use QMD backend", () => {
    const memory = config.memory as { backend?: string };
    expect(memory.backend).toBe("qmd");
  });

  it("should have knowledge base paths configured", () => {
    const memory = config.memory as {
      qmd?: { paths?: Array<{ name: string; path: string }> };
    };
    expect(memory.qmd?.paths).toBeDefined();
    expect(memory.qmd!.paths!.length).toBeGreaterThan(0);
  });

  it("should include deal pipeline in memory paths", () => {
    const memory = config.memory as {
      qmd?: { paths?: Array<{ name: string; path: string }> };
    };
    const pathNames = memory.qmd?.paths?.map((p) => p.name) ?? [];
    expect(pathNames).toContain("deals");
  });
});
