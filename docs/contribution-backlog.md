# Contribution task index

This index maps the initial **70 contributor tasks**, including **17 good first issues**, to their GitHub discussions. Issue status, assignments and active PRs can change; the linked issue is the source of truth. Existing work is preserved, and these are distinct proposed contributions rather than committed delivery dates.

[All open issues](https://github.com/himanshu748/devswarm/issues?q=is%3Aissue%20is%3Aopen) · [Good first issues](https://github.com/himanshu748/devswarm/issues?q=is%3Aissue%20is%3Aopen%20label%3A%22good%20first%20issue%22) · [Help wanted](https://github.com/himanshu748/devswarm/issues?q=is%3Aissue%20is%3Aopen%20label%3A%22help%20wanted%22)

## Choose a task

- **P1:** correctness problems to prioritize. **P2:** reliability and contributor improvements. **P3:** follow-up usability, tooling and feature work. Priorities are planning guidance, not severity ratings or deadlines.
- **Starter:** bounded task with clear entry points. **Intermediate:** cross-function behavior or focused integration work. **Advanced:** agree on a design and compatibility policy first.
- Check linked dependencies and recent PRs before beginning. Comment with your approach on larger tasks. Do not create a duplicate implementation when someone is already working on it.
- Follow [CONTRIBUTING.md](../CONTRIBUTING.md). Default checks must not require model credits or SigNoz; use synthetic fixtures and temporary directories. Preserve the existing ESM/no-build architecture.

The new issue descriptions identify the inspected source revision. Code observations are not claims of a live reproduction; proposed features and audit tasks must establish the intended behavior before implementation.

## Start with correctness

- [#7: Validate build plans and critic results before downstream use](https://github.com/himanshu748/devswarm/issues/7) (Agent contracts, intermediate).
- [#21: Preserve 400 and 413 responses for JSON request parsing errors](https://github.com/himanshu748/devswarm/issues/21) (API, intermediate).
- [#71: Recover form controls and timers after failed generation requests](https://github.com/himanshu748/devswarm/issues/71) (UI, intermediate).

## Browse by area

| Area | Tasks | Starter tasks |
| --- | ---: | ---: |
| [API](#api) | 6 | 3 |
| [Agent contracts](#agent-contracts) | 3 | 0 |
| [Artifacts](#artifacts) | 10 | 2 |
| [Configuration](#configuration) | 3 | 2 |
| [Contributor docs](#contributor-docs) | 2 | 2 |
| [Developer tooling](#developer-tooling) | 1 | 0 |
| [Doctor](#doctor) | 3 | 0 |
| [Evaluation](#evaluation) | 1 | 0 |
| [Model configuration](#model-configuration) | 2 | 0 |
| [Model transport](#model-transport) | 4 | 1 |
| [Observability](#observability) | 1 | 0 |
| [Observability tooling](#observability-tooling) | 5 | 1 |
| [Orchestration](#orchestration) | 5 | 2 |
| [Preview proxy](#preview-proxy) | 3 | 0 |
| [Preview runtime](#preview-runtime) | 5 | 0 |
| [Telemetry](#telemetry) | 6 | 1 |
| [Testing](#testing) | 2 | 0 |
| [UI](#ui) | 8 | 3 |

## API

| Issue and task | Priority | Difficulty |
| --- | --- | --- |
| [#21: Preserve 400 and 413 responses for JSON request parsing errors](https://github.com/himanshu748/devswarm/issues/21) | P1 | intermediate |
| [#4: Test SSE delivery and cleanup when a client disconnects](https://github.com/himanshu748/devswarm/issues/4) | P2 | starter |
| [#20: Handle HTTP server bind failures with actionable startup diagnostics](https://github.com/himanshu748/devswarm/issues/20) | P2 | starter |
| [#22: Reject blank prompts and document bounded instruction sizes](https://github.com/himanshu748/devswarm/issues/22) | P2 | intermediate |
| [#23: Return consistent client errors for invalid or missing refinement apps](https://github.com/himanshu748/devswarm/issues/23) | P2 | intermediate |
| [#26: Add a lightweight health endpoint that performs no paid work](https://github.com/himanshu748/devswarm/issues/26) | P2 | starter |

## Agent contracts

| Issue and task | Priority | Difficulty |
| --- | --- | --- |
| [#7: Validate build plans and critic results before downstream use](https://github.com/himanshu748/devswarm/issues/7) | P1 | intermediate |
| [#38: Validate generated HTML and JavaScript before accepting builder output](https://github.com/himanshu748/devswarm/issues/38) | P2 | intermediate |
| [#47: Align planner and backend prompts on supported HTTP update semantics](https://github.com/himanshu748/devswarm/issues/47) | P2 | intermediate |

## Artifacts

| Issue and task | Priority | Difficulty |
| --- | --- | --- |
| [#9: Make failed refinements preserve the previous usable artifacts](https://github.com/himanshu748/devswarm/issues/9) | P2 | advanced |
| [#27: Keep generation history available when one artifact folder is unreadable](https://github.com/himanshu748/devswarm/issues/27) | P2 | intermediate |
| [#29: Make generation card review counts reflect the displayed verdict](https://github.com/himanshu748/devswarm/issues/29) | P2 | starter |
| [#50: Verify generated dependency metadata matches the preview runtime](https://github.com/himanshu748/devswarm/issues/50) | P2 | intermediate |
| [#28: Paginate generation history before loading large artifact collections](https://github.com/himanshu748/devswarm/issues/28) | P3 | intermediate |
| [#31: Include human-readable app names and summaries in generation history](https://github.com/himanshu748/devswarm/issues/31) | P3 | starter |
| [#32: Add an explicit local generation cleanup workflow](https://github.com/himanshu748/devswarm/issues/32) | P3 | advanced |
| [#33: Export a selected generated app as a standalone project](https://github.com/himanshu748/devswarm/issues/33) | P3 | advanced |
| [#44: Save a reproducibility manifest beside each generated app](https://github.com/himanshu748/devswarm/issues/44) | P3 | intermediate |
| [#48: Refresh generated dashboard metadata after a contract refinement](https://github.com/himanshu748/devswarm/issues/48) | P3 | intermediate |

## Configuration

| Issue and task | Priority | Difficulty |
| --- | --- | --- |
| [#5: Validate fallback TTL configuration and cover invalid values](https://github.com/himanshu748/devswarm/issues/5) | P2 | starter |
| [#18: Report unreadable .env files instead of silently ignoring every load error](https://github.com/himanshu748/devswarm/issues/18) | P2 | starter |
| [#19: Validate server and preview port configuration at startup](https://github.com/himanshu748/devswarm/issues/19) | P2 | intermediate |

## Contributor docs

| Issue and task | Priority | Difficulty |
| --- | --- | --- |
| [#2: Add runnable API examples and sanitized response fixtures](https://github.com/himanshu748/devswarm/issues/2) | P3 | starter |
| [#75: Document Windows PowerShell setup and local command equivalents](https://github.com/himanshu748/devswarm/issues/75) | P3 | starter |

## Developer tooling

| Issue and task | Priority | Difficulty |
| --- | --- | --- |
| [#77: Provide an explicit synthetic event replay for no-token UI development](https://github.com/himanshu748/devswarm/issues/77) | P3 | intermediate |

## Doctor

| Issue and task | Priority | Difficulty |
| --- | --- | --- |
| [#24: Validate and bound the Doctor health-query time window](https://github.com/himanshu748/devswarm/issues/24) | P2 | intermediate |
| [#25: Serialize manual and webhook Doctor diagnoses through one guard](https://github.com/himanshu748/devswarm/issues/25) | P2 | intermediate |
| [#62: Bound ClickHouse HTTP and Docker query execution](https://github.com/himanshu748/devswarm/issues/62) | P2 | intermediate |

## Evaluation

| Issue and task | Priority | Difficulty |
| --- | --- | --- |
| [#46: Build an opt-in critic quality evaluation harness](https://github.com/himanshu748/devswarm/issues/46) | P3 | advanced |

## Model configuration

| Issue and task | Priority | Difficulty |
| --- | --- | --- |
| [#40: Allow local model routing overrides without editing tracked source](https://github.com/himanshu748/devswarm/issues/40) | P3 | advanced |
| [#41: Add an opt-in model availability preflight command](https://github.com/himanshu748/devswarm/issues/41) | P3 | intermediate |

## Model transport

| Issue and task | Priority | Difficulty |
| --- | --- | --- |
| [#6: Preserve the final SSE data line when a model stream closes](https://github.com/himanshu748/devswarm/issues/6) | P2 | intermediate |
| [#34: Make model request deadlines configurable and deterministically testable](https://github.com/himanshu748/devswarm/issues/34) | P2 | intermediate |
| [#36: Classify provider failures before selecting fallback behavior](https://github.com/himanshu748/devswarm/issues/36) | P2 | intermediate |
| [#39: Cover code fence variants without selecting explanatory snippets](https://github.com/himanshu748/devswarm/issues/39) | P2 | starter |

## Observability

| Issue and task | Priority | Difficulty |
| --- | --- | --- |
| [#66: Align fallback alert aggregation with its stated 15-minute threshold](https://github.com/himanshu748/devswarm/issues/66) | P2 | intermediate |

## Observability tooling

| Issue and task | Priority | Difficulty |
| --- | --- | --- |
| [#3: Validate dashboard layout references and unique widget IDs](https://github.com/himanshu748/devswarm/issues/3) | P2 | starter |
| [#64: Normalize SigNoz dashboard list responses before matching titles](https://github.com/himanshu748/devswarm/issues/64) | P2 | intermediate |
| [#65: Make repeated alert-rule imports idempotent](https://github.com/himanshu748/devswarm/issues/65) | P2 | intermediate |
| [#67: Bound dashboard provisioning and report best-effort failures](https://github.com/himanshu748/devswarm/issues/67) | P2 | intermediate |
| [#63: Add a no-write dry-run mode for SigNoz pack imports](https://github.com/himanshu748/devswarm/issues/63) | P3 | intermediate |

## Orchestration

| Issue and task | Priority | Difficulty |
| --- | --- | --- |
| [#8: Apply generation structural checks to refinement reviews](https://github.com/himanshu748/devswarm/issues/8) | P2 | intermediate |
| [#11: Correlate generation events and bound concurrent model work](https://github.com/himanshu748/devswarm/issues/11) | P2 | advanced |
| [#35: Propagate explicit cancellation through active agent workflows](https://github.com/himanshu748/devswarm/issues/35) | P2 | advanced |
| [#42: Keep regeneration counts within the actual retry budget](https://github.com/himanshu748/devswarm/issues/42) | P2 | starter |
| [#43: Share viewport normalization between generation and refinement](https://github.com/himanshu748/devswarm/issues/43) | P2 | starter |

## Preview proxy

| Issue and task | Priority | Difficulty |
| --- | --- | --- |
| [#56: Clean up upstream preview requests when clients disconnect](https://github.com/himanshu748/devswarm/issues/56) | P2 | intermediate |
| [#57: Handle compressed HTML correctly before injecting the preview shim](https://github.com/himanshu748/devswarm/issues/57) | P2 | advanced |
| [#58: Preserve fetch Request semantics in the preview API shim](https://github.com/himanshu748/devswarm/issues/58) | P2 | intermediate |

## Preview runtime

| Issue and task | Priority | Difficulty |
| --- | --- | --- |
| [#51: Use socket-aware preview port allocation instead of HTTP-only probing](https://github.com/himanshu748/devswarm/issues/51) | P2 | advanced |
| [#52: Bound each preview readiness probe so startup deadlines actually apply](https://github.com/himanshu748/devswarm/issues/52) | P2 | intermediate |
| [#53: Limit the number of simultaneously running preview children](https://github.com/himanshu748/devswarm/issues/53) | P2 | advanced |
| [#54: Handle preview child spawn errors and preserve lifecycle invariants](https://github.com/himanshu748/devswarm/issues/54) | P2 | intermediate |
| [#55: Add a Stop preview action without deleting generated files](https://github.com/himanshu748/devswarm/issues/55) | P3 | intermediate |

## Telemetry

| Issue and task | Priority | Difficulty |
| --- | --- | --- |
| [#37: Count failed model attempts and their latency in LLM metrics](https://github.com/himanshu748/devswarm/issues/37) | P2 | intermediate |
| [#49: Keep generated app tracing optional when no collector is configured](https://github.com/himanshu748/devswarm/issues/49) | P2 | intermediate |
| [#59: Drain traces, metrics and logs during graceful server shutdown](https://github.com/himanshu748/devswarm/issues/59) | P2 | advanced |
| [#60: Add configurable prompt and instruction capture for telemetry privacy](https://github.com/himanshu748/devswarm/issues/60) | P2 | advanced |
| [#68: Make collector endpoint precedence consistent with reported export status](https://github.com/himanshu748/devswarm/issues/68) | P2 | intermediate |
| [#61: Use one source of truth for telemetry service version metadata](https://github.com/himanshu748/devswarm/issues/61) | P3 | starter |

## Testing

| Issue and task | Priority | Difficulty |
| --- | --- | --- |
| [#45: Exercise the full generation pipeline with synthetic agents](https://github.com/himanshu748/devswarm/issues/45) | P2 | intermediate |
| [#76: Syntax-check inline UI scripts in the default verification command](https://github.com/himanshu748/devswarm/issues/76) | P2 | intermediate |

## UI

| Issue and task | Priority | Difficulty |
| --- | --- | --- |
| [#71: Recover form controls and timers after failed generation requests](https://github.com/himanshu748/devswarm/issues/71) | P1 | intermediate |
| [#10: Audit Mission Control keyboard access and reduced motion](https://github.com/himanshu748/devswarm/issues/10) | P2 | intermediate |
| [#30: Expose saved review details for inspection in Mission Control](https://github.com/himanshu748/devswarm/issues/30) | P2 | intermediate |
| [#69: Show planner API descriptions in the plan inspector](https://github.com/himanshu748/devswarm/issues/69) | P2 | starter |
| [#70: Show SSE connection loss and recovery without losing run state](https://github.com/himanshu748/devswarm/issues/70) | P2 | intermediate |
| [#72: Distinguish hangar loading, empty history and request failure](https://github.com/himanshu748/devswarm/issues/72) | P2 | starter |
| [#74: Render zero-valued live statistics instead of stale fallback numbers](https://github.com/himanshu748/devswarm/issues/74) | P2 | starter |
| [#73: Add client-side search and verdict filtering to the generation hangar](https://github.com/himanshu748/devswarm/issues/73) | P3 | intermediate |
