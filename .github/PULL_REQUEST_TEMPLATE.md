Title: fix: emit dev preview meta in SSR and include test CSS utilities

## Summary

This change fixes failing tests by ensuring development preview metadata is
emitted by the server-rendered HTML and by including a few small CSS utilities
that the test suite expects.

Changes:
- Use a runtime env check for `codex-preview` so the bundler does not fold the
  condition at build time.
- Add minimal CSS utilities required by tests to `app/globals.css`.
- Remove temporary `dist` shims that were used to make tests pass locally.
- Add a CI workflow that runs build + tests on push and PRs.

## Motivation

The test suite compares server-rendered HTML and requires a marker meta tag to
identify dev-preview builds. The prior folding of `process.env` caused the meta
not to appear during test runs. Making the check at runtime guarantees tests and
local dev builds behave consistently.

## Verification

Local steps executed by the author:

```bash
npm ci
NODE_ENV=development ./node_modules/.bin/vinext build
node --test tests/*.test.mjs
```

All tests passed locally (5/5).

## Checklist
- [ ] CI passes (GitHub Actions added to this branch)
- [ ] Confirm `codex-preview` is not present in production builds
- [ ] (Optional) Move CSS utilities into Tailwind config or plugin

## Notes for reviewers
- The runtime env check uses `globalThis.process?.env` to avoid bundler
  inlining. This is intentionally conservative — feedback welcome if you'd
  prefer an alternate approach.
