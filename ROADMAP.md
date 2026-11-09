# Contributor roadmap

DevSwarm is an experimental local app generator. This roadmap describes proposed
work, not committed release dates. [Open issues](https://github.com/himanshu748/devswarm/issues)
hold acceptance criteria and current ownership. Add an approach there before
starting a large change.

## Available today

- Planner, parallel frontend/backend builders and a critic regeneration loop.
- Hugging Face streaming calls, fallback promotion and recovery TTL.
- Mission Control, generation history, scoped refinement and child-process previews.
- OpenTelemetry traces, metrics and logs, with importable SigNoz dashboards.
- No-token contributor checks and a Node test suite.

## Now: confidence and contributor experience

| Work | Scope | Entry level |
| --- | --- | --- |
| [#10: Accessibility audit of Mission Control](https://github.com/himanshu748/devswarm/issues/10) | Keyboard focus, live announcements, contrast and reduced motion | Frontend familiarity |
| [#2: Curl examples and response fixtures](https://github.com/himanshu748/devswarm/issues/2) | Runnable local examples with paid actions clearly marked | Good first issue |
| [#4: SSE disconnect coverage](https://github.com/himanshu748/devswarm/issues/4) | Verify listener removal and event delivery | Good first issue |
| [#3: Dashboard consistency checks](https://github.com/himanshu748/devswarm/issues/3) | Validate widget IDs/layout references and alert JSON relationships | Good first issue |
| [#5: Validate fallback TTL configuration](https://github.com/himanshu748/devswarm/issues/5) | Finite, predictable routing override lifetimes | Good first issue |

## Next: correctness and resilience

| Work | Why it matters |
| --- | --- |
| [#7: Validate structured agent outputs](https://github.com/himanshu748/devswarm/issues/7) | Parseable JSON can still violate the build-plan or review contract |
| [#8: Apply structural checks to refinements](https://github.com/himanshu748/devswarm/issues/8) | Generation and refinement currently enforce different review checks |
| [#6: Finish streaming parser edge cases](https://github.com/himanshu748/devswarm/issues/6) | Unterminated final SSE data lines should not lose model output |
| [#9: Transactional refinement writes](https://github.com/himanshu748/devswarm/issues/9) | A rejected or failed edit should not damage a previously usable app |
| [#11: Correlate and limit concurrent runs](https://github.com/himanshu748/devswarm/issues/11) | The global feed mixes work and unbounded requests can spend credits |

## Later: safer execution and evaluation

- Design isolated preview execution with explicit filesystem, process, network
  and browser-origin boundaries before considering shared hosting.
- Build a reproducible, opt-in generation/critic evaluation set with recorded
  models, timestamps, token counts and failure cases.
- Add provider capability checks and a documented model-configuration interface.

Large dependency additions, provider migrations, public deployment and arbitrary
plugin execution need design discussion first. Keep the existing lightweight
ESM architecture unless evidence supports a change.

## How tasks are classified

`good first issue` means a bounded change with clear starting files and checks.
`help wanted` welcomes a contribution but can require design or broader testing.
`bug`, `documentation` and `enhancement` describe the type of work. Labels are
triage aids, not promises of assignment, reward or merge.
