---
name: deploy
description: Commit, push and confirm a change is live on rethinkorg.com. Use when the user says "commit", "push", "deploy", "đẩy lên", or reports that production still shows the old version.
---

# Commit, push, verify live

## Rules
- **"commit" ≠ "push".** "commit" alone → commit only, then offer to push. "commit push" / "push luôn" → both. Never push on your own initiative.
- `web/` is the git root (remote `TaoRory/ReThink`, branch `main`). Pushing `main` deploys via Vercel in ~30–60s.
- Commit messages: imperative subject, a body explaining *why*, and end with the attribution line the harness specifies.

## Verify on the real domain
`rethink-vinuni.vercel.app` 307-redirects to **https://rethinkorg.com** — curl the vercel URL and you read an empty redirect body. Always check rethinkorg.com.

Poll until a marker string from your change appears:

```bash
for i in $(seq 1 24); do
  curl -s https://rethinkorg.com/<page> | grep -q '<marker>' && { echo "live after ~$((i*15))s"; break; }
  echo "attempt $i: still old"; sleep 15
done
```

Then re-run the checks that mattered for the change against production
(`node scripts/cdp/eval.js https://rethinkorg.com/... "<expr>"`).

## When the user says "it's still broken on the site"
Before touching code, compare production HTML with the local build. Several
times the fix was correct but only committed locally, or the user's browser
was cached (tell them Ctrl+Shift+R).
