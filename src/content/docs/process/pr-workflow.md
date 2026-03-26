---
doc_id: process-pr-workflow
title: PR Workflow for Doc Changes
doc_type: process
department: Operations
owner: rachel@liflode.com
status: active
audience:
  - staff
tools:
  - GitHub
  - Linear
roles:
  - developer
  - admin
review_cycle_days: 180
version: "1.0"
last_reviewed: 2026-03-27
---

<!-- agent: finn can update this doc -->

# PR Workflow for Doc Changes

All changes to operational docs in the Liflode Knowledge Platform go through a GitHub Pull Request before merging to main. This ensures every edit is reviewed before it reaches staff.

---

## Why PRs?

- **Audit trail** — every change is versioned and attributed
- **Review gate** — Rachel approves before publication
- **Preview** — Cloudflare Pages generates a preview URL on every PR
- **Validation** — automated checks catch frontmatter errors before review

---

## How Claude Creates a PR

When Finn (or another agent) needs to update a doc:

1. **Create a branch** from main:
   ```bash
   git -C /c/Users/accou/repos/liflode-docs-site checkout -b docs/CORE-XXXX-short-description
   ```

2. **Make changes** to the file(s) in `src/content/docs/`

3. **Commit and push**:
   ```bash
   git -C /c/Users/accou/repos/liflode-docs-site add .
   git -C /c/Users/accou/repos/liflode-docs-site commit -m "docs(CORE-XXXX): description"
   git -C /c/Users/accou/repos/liflode-docs-site push -u origin docs/CORE-XXXX-short-description
   ```

4. **Open a PR** via gh CLI:
   ```bash
   gh pr create \
     --repo Curious-Owl11/liflode-docs-site \
     --base main \
     --head docs/CORE-XXXX-short-description \
     --title "docs(CORE-XXXX): description" \
     --body "$(cat <<'EOF'
   ## Doc Change Summary

   **What doc(s) changed?**
   - src/content/docs/...

   **Why?**
   CORE-XXXX: reason

   **Review cycle confirmed?**
   - [x] review_cycle_days in frontmatter is correct
   EOF
   )"
   ```

5. **Add Linear comment** with the PR URL so Rachel can track it in-context.

---

## Automated Checks (CI)

On every PR, GitHub Actions runs:

| Check | What it validates |
|---|---|
| **Validate frontmatter** | Required fields present, valid enum values, no duplicate doc_ids |
| **Markdown lint** | Basic markdown formatting |
| **Build and Deploy** | Astro build succeeds + Cloudflare Pages preview deployed |

All checks must pass before Rachel can merge.

---

## How Rachel Reviews and Merges

1. **Receive notification** — GitHub notifies Rachel as CODEOWNER when a PR is opened
2. **Check the preview** — Cloudflare Pages posts a preview URL as a PR comment. Open it to verify the doc renders correctly in the site.
3. **Review the diff** — Check the frontmatter and content changes in the Files tab
4. **Approve and merge** — If correct, Approve the PR and use **Squash and merge** to keep main history clean
5. **Production deployment** — Merging to main triggers the deploy workflow automatically. The site updates within ~2 minutes.

---

## Branch Naming Convention

```
docs/CORE-XXXX-short-description     # agent-driven changes (linked to Linear)
docs/fix-DESCRIPTION                  # manual corrections
docs/new-DOCNAME                      # new doc additions
```

---

## Emergency Direct Push

Direct push to main is **blocked by branch protection**. If an urgent fix is needed:
1. Open a PR (even with just Rachel as author)
2. Self-approve (enforcement is not applied to admins — `enforce_admins: false`)
3. Merge immediately

This keeps the audit trail intact even for urgent changes.
