# Wholesaile Data Retention & Compliance Policy

> **Disclaimer:** This policy provides general guidance. Consult a licensed attorney
> for legal advice specific to your jurisdiction and business structure.

---

## Data Retention Schedule

| Data Category | Retention Period | Reason | Storage Location |
|---------------|-----------------|--------|-----------------|
| Closed deal files | **7 years** | Tax/audit requirements (IRS) | `workspace/deals/` |
| Failed/dead deal files | **3 years** | Reference for lessons learned | `workspace/deals/` |
| Buyer profiles | **Indefinite** | Ongoing business relationship | `wholesale-kb/buyer-profiles/` |
| Seller contact info | **1 year** after last contact | TCPA compliance | Deal files |
| Consent records | **5 years** | Legal documentation | `wholesale-kb/consent/` |
| Do-not-contact list | **Indefinite** | TCPA compliance (never delete) | `wholesale-kb/do-not-contact/` |
| Call recordings | **2 years** | Training and dispute resolution | External storage |
| Market comp data | **1 year** | Relevance decay | `wholesale-kb/market-data/` |
| Agent lessons | **Indefinite** | Ongoing learning | `wholesale-kb/agent-lessons/` |
| Contract copies | **7 years** | Legal requirement | `workspace/deals/[deal]/` |

---

## Automated Cleanup (Cron Job)

Add this to your `openclaw.json` cron jobs to run monthly cleanup:

```json
{
  "id": "data-retention-cleanup",
  "schedule": "0 2 1 * *",
  "session": "main",
  "message": "Run monthly data retention cleanup. Review and archive: (1) Seller contact info in deal files older than 1 year with no activity — redact phone/email, keep property data. (2) Market comp data older than 1 year — archive to old-comps folder. (3) Failed deal files older than 3 years — move to archive. Log all actions taken."
}
```

---

## Data Deletion Procedure

When deleting or redacting seller personal data:

1. **Redact** phone numbers and email addresses from deal files (replace with `[REDACTED]`)
2. **Keep** property address, deal terms, and financial data (needed for tax records)
3. **Preserve** do-not-contact entry (required for TCPA protection — never delete)
4. **Log** the deletion: date, reason, what was deleted
5. **Do NOT** delete consent records (needed to prove compliance)

### Redaction Template

```markdown
## Seller Contact (REDACTED - [DATE])
- Name: [REDACTED per data retention policy]
- Phone: [REDACTED]
- Email: [REDACTED]
- Property: 123 Main St, Atlanta, GA 30318 (retained)
```

---

## Data Access Requests

If a seller or buyer requests their personal data:

1. Search all deal files for their name/phone/email
2. Compile a list of all files containing their information
3. Provide the list within **30 days** of request
4. If they request deletion:
   - Follow Data Deletion Procedure above
   - Confirm deletion in writing
   - Retain do-not-contact entry

---

## TCPA Compliance Summary

### Key Requirements

| Requirement | Rule |
|-------------|------|
| Marketing texts | Require prior express written consent |
| Marketing calls | Require prior express consent |
| Contact hours | 8 AM – 9 PM recipient's local time only |
| Opt-out response | Within 24 hours of request |
| Do-not-call registry | Check before cold calling |
| Opt-out confirmation | Send confirmation text when opted out |

### Penalties

- **$500** per unintentional violation
- **$1,500** per willful violation
- Class action lawsuits possible for bulk violations

### Safe Harbor

You are generally protected if:
- You have documented consent
- You honored opt-out requests promptly
- You maintained accurate do-not-contact records
- You contacted only during permitted hours

---

## State-Specific Compliance Notes

See [skills/compliance/SKILL.md](skills/compliance/SKILL.md) for detailed state-by-state requirements.

### Quick Reference

| State | Key Requirement |
|-------|----------------|
| Florida | Written disclosure of intent to assign |
| Texas | Disclose you're a principal, not agent |
| California | Principal status disclosure; DRE oversight |
| Illinois | May need license for >1 deal/year |
| Georgia | Attorney required at closing |
| South Carolina | Attorney required at closing |

---

## Privacy Policy for Sellers

When collecting seller information, disclose:

1. **What you collect:** Name, contact info, property details
2. **Why you collect it:** To evaluate and potentially purchase their property
3. **How you use it:** To make offers, conduct due diligence, coordinate closing
4. **Who you share it with:** Title companies, attorneys, end buyers (as needed)
5. **How long you keep it:** Per retention schedule above
6. **Their rights:** Request access or deletion at any time

---

## Backup and Security

### Data Backup

Run weekly backups of all deal data:

```bash
bash scripts/backup-deals.sh
```

Backups are stored in `~/.openclaw/backups/` and retained for 30 days.

### Access Control

- Gateway auth token required for all API access
- Webhook endpoints require authentication
- Do not share gateway token with unauthorized parties
- Rotate gateway token if compromised: `openclaw config set gateway.auth.token $(openssl rand -hex 32)`

### Sensitive Data Handling

- Never commit real API keys, tokens, or seller data to Git
- Use `${ENV_VAR}` syntax in `openclaw.json` for all secrets
- Keep `~/.openclaw/.env` out of version control (it's in `.gitignore`)

---

## Compliance Checklist (Monthly Review)

- [ ] Review do-not-contact list for completeness
- [ ] Verify consent records are up to date
- [ ] Run data retention cleanup cron job
- [ ] Check for any TCPA opt-out requests not yet processed
- [ ] Review any new state law changes in target markets
- [ ] Verify backup script ran successfully
- [ ] Confirm gateway auth token is secure

---

## Incident Response

If you suspect a data breach or compliance violation:

1. **Stop** the activity immediately
2. **Document** what happened, when, and what data was affected
3. **Consult** your attorney within 24 hours
4. **Notify** affected parties if required by law
5. **Fix** the root cause before resuming

---

*Last updated: 2026-03-02*
*Review annually or when laws change in your target markets.*
