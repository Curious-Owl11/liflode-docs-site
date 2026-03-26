---
doc_id: runbook-REPLACE-ME
title: Runbook Title
doc_type: runbook
department: Tech
owner: owner@liflode.com
status: draft
audience:
  - staff
tools:
  - TOOL_NAME
roles:
  - developer
difficulty: intermediate
estimated_time_minutes: 20
review_cycle_days: 60
version: "1.0"
last_reviewed: 2026-01-01
---
<!-- agent: finn can update this doc -->

# Runbook Title

> **Purpose:** Step-by-step response procedure for [incident/scenario].
>
> **Severity:** P1 / P2 / P3 *(delete as appropriate)*
>
> **On-call contact:** [Name / PagerDuty link]

---

## Overview

Brief description of the scenario this runbook addresses. When should this runbook be used?

---

## Symptoms

Signs that indicate this runbook is applicable:

- Symptom one (e.g. error in logs, alert firing)
- Symptom two
- Symptom three

---

## Prerequisites

- [ ] Access to [system/tool]
- [ ] [Permission or credential] in hand

---

## Diagnosis Steps

Work through these before taking action:

### 1. Check [System / Log / Metric]

```bash
# Example command
kubectl get pods -n production
```

**What to look for:** Describe what normal vs. abnormal looks like.

### 2. Check [System / Log / Metric]

---

## Remediation Steps

### Option A: [Most common fix]

1. Step one
2. Step two
3. Verify: [how to confirm it worked]

### Option B: [Fallback / escalation path]

---

## Rollback Procedure

If the fix makes things worse, how do you revert?

1. Step one
2. Step two

---

## Escalation

If this runbook does not resolve the issue:

| Condition | Escalate To | Contact |
|---|---|---|
| Still unresolved after 30 min | [Team / Person] | [Email / Slack] |
| Data loss risk | [Team / Person] | [Email / Slack] |

---

## Post-Incident

- [ ] Update this runbook if steps were insufficient
- [ ] File incident report in [system]
- [ ] Schedule retrospective if P1/P2

---

## References

- [Related runbook](../runbooks/related)
- [System documentation](https://example.com)

---

*Owner: owner@liflode.com — Review every 60 days.*
