---
title: Frontmatter Schema Standard
description: Canonical YAML frontmatter schema for all operational docs in the Liflode Knowledge Platform.
---

<!-- agent: finn can update this doc -->

# Frontmatter Schema Standard

This document defines the canonical YAML frontmatter schema for all operational docs in the Liflode Operational Knowledge Platform. Frontmatter is the machine-readable layer that enables lifecycle tracking, semantic search, agent routing, and gap detection.

Every `.md` file in this site (except section index files) **must** include a valid frontmatter block.

---

## Full Schema Reference

```yaml
---
doc_id: unique-slug                  # required — maps to Neon operational_docs.doc_id
title: Human Readable Title          # required
doc_type: sop                        # required: sop | onboarding | training | runbook | process
department: Operations               # optional: Operations | HR | Finance | Marketing | Tech
owner: rachel@liflode.com            # optional: email address of document owner
status: draft                        # required: draft | active | archived | review_needed
audience:                            # optional array
  - staff
  - contractors
tools:                               # optional array — tools referenced in this doc
  - Linear
  - Windmill
roles:                               # optional array — roles this doc applies to
  - developer
  - admin
difficulty: beginner                 # optional: beginner | intermediate | advanced
estimated_time_minutes: 15           # optional: integer (estimated read/completion time)
review_cycle_days: 90                # optional: integer, default 90
version: "1.0"                       # optional: semver string
last_reviewed: 2026-01-01            # optional: ISO 8601 date (YYYY-MM-DD)
---
```

---

## Field Reference

### Required Fields

| Field | Type | Allowed Values | Description |
|---|---|---|---|
| `doc_id` | string | unique slug (kebab-case) | Stable unique identifier. Maps to `operational_docs.doc_id` in Neon. Never change after publish. |
| `title` | string | any | Human-readable document title. |
| `doc_type` | enum | `sop` `onboarding` `training` `runbook` `process` | Document category. Determines section and agent routing. |
| `status` | enum | `draft` `active` `archived` `review_needed` | Lifecycle state. `review_needed` is set automatically when `last_reviewed + review_cycle_days < today`. |

### Optional Fields

| Field | Type | Allowed Values / Format | Description |
|---|---|---|---|
| `department` | enum | `Operations` `HR` `Finance` `Marketing` `Tech` | Owning department. Used for filtering and gap detection. |
| `owner` | string | email address | Person responsible for keeping this doc accurate. |
| `audience` | string[] | e.g. `staff`, `contractors`, `managers` | Who this doc is written for. Used for search faceting. |
| `tools` | string[] | tool names | Tools referenced or required in this doc. Used for cross-linking and gap analysis. |
| `roles` | string[] | role names | Job roles this doc applies to. |
| `difficulty` | enum | `beginner` `intermediate` `advanced` | Complexity level. Used in onboarding path recommendations. |
| `estimated_time_minutes` | integer | positive integer | Estimated time to read or complete the procedure. |
| `review_cycle_days` | integer | positive integer | How often this doc should be reviewed. **Default: 90**. |
| `version` | string | semver (e.g. `"1.0"`, `"2.1.3"`) | Document version. Increment on significant changes. |
| `last_reviewed` | date | ISO 8601 (`YYYY-MM-DD`) | Date the doc was last reviewed for accuracy. |

---

## Field Details and Rules

### `doc_id`

- Must be **globally unique** across all docs.
- Use kebab-case: `onboard-new-developer`, `deploy-production-runbook`.
- Never rename a `doc_id` after a document is published — it is the stable key in the database and in any external links.
- Convention: `{doc_type}-{short-descriptor}`, e.g. `sop-expense-reporting`, `runbook-db-failover`.

### `doc_type`

Maps directly to the site section and the `doc_type` column in the Neon `operational_docs` table:

| Value | Site Section | Description |
|---|---|---|
| `sop` | `sops/` | Standard Operating Procedure — step-by-step routine task |
| `onboarding` | `onboarding/` | New hire or role onboarding guide |
| `training` | `training/` | Learning material, how-tos, skill development |
| `runbook` | `runbooks/` | Incident response or operational runbook |
| `process` | `process/` | Process definition or workflow overview |

### `status`

| Value | Meaning |
|---|---|
| `draft` | Work in progress, not ready for general use |
| `active` | Current, reviewed, safe to follow |
| `archived` | No longer in use, kept for reference |
| `review_needed` | Overdue for review; do not rely on without verification |

The platform agent (Finn) will automatically flag docs as `review_needed` when `last_reviewed + review_cycle_days` is in the past.

### `version`

Use [semantic versioning](https://semver.org/):
- Increment **patch** (`1.0` → `1.0.1`) for typo fixes and minor clarifications.
- Increment **minor** (`1.0` → `1.1`) for new sections or process additions.
- Increment **major** (`1.0` → `2.0`) for complete rewrites or process changes that invalidate previous guidance.

---

## Agent Comment Convention

Every operational doc should include an HTML comment immediately after the frontmatter block to declare agent routing instructions. This comment is machine-readable and invisible to end users in rendered output.

```html
<!-- agent: finn can update this doc -->
```

### Supported Agent Directives

| Directive | Meaning |
|---|---|
| `finn can update this doc` | Finn (the AI agent) is permitted to propose edits to keep content current |
| `finn can do this` | Finn can execute or automate the task described in this doc |
| `finn review only` | Finn should review and flag issues but not edit |
| `human review required` | Finn must not edit; a human must approve all changes |

Multiple directives may be placed on separate comment lines.

```html
<!-- agent: finn can update this doc -->
<!-- agent: finn review only -->
```

---

## Minimal Valid Example

```yaml
---
doc_id: sop-expense-reporting
title: Expense Reporting Process
doc_type: sop
status: active
---
```

## Full Example

```yaml
---
doc_id: onboard-new-developer
title: New Developer Onboarding Guide
doc_type: onboarding
department: Tech
owner: rachel@liflode.com
status: active
audience:
  - staff
tools:
  - Linear
  - GitHub
  - Windmill
roles:
  - developer
difficulty: beginner
estimated_time_minutes: 45
review_cycle_days: 90
version: "1.2"
last_reviewed: 2026-01-15
---
<!-- agent: finn can update this doc -->
```

---

## Database Mapping

These frontmatter fields map directly to columns in the Neon `operational_docs` table (defined in CORE-2693):

| Frontmatter Field | Neon Column | Notes |
|---|---|---|
| `doc_id` | `doc_id` | Primary key |
| `title` | `title` | |
| `doc_type` | `doc_type` | |
| `department` | `department` | |
| `owner` | `owner` | |
| `status` | `status` | |
| `audience` | `audience` | Stored as array |
| `tools` | `tools` | Stored as array |
| `roles` | `roles` | Stored as array |
| `difficulty` | `difficulty` | |
| `estimated_time_minutes` | `estimated_time_minutes` | |
| `review_cycle_days` | `review_cycle_days` | |
| `version` | `version` | |
| `last_reviewed` | `last_reviewed` | |

The sync agent reads frontmatter from each `.md` file and upserts into the `operational_docs` table on every deployment.
