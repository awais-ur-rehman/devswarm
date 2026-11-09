# DevSwarm

[![Contributor checks](https://github.com/himanshu748/devswarm/actions/workflows/ci.yml/badge.svg)](https://github.com/himanshu748/devswarm/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js 22+](https://img.shields.io/badge/Node.js-22%2B-43853d.svg)](package.json)
[![Good first issues](https://img.shields.io/github/issues/himanshu748/devswarm/good%20first%20issue)](https://github.com/himanshu748/devswarm/contribute)

**Build an app with specialist agents. See why each step succeeded or failed.**

DevSwarm turns a prompt into a full-stack app using open-weight models for
planning, frontend, backend and critic review. A fifth role, Swarm Doctor,
diagnoses routing health from telemetry. Every agent and model call is traced
with OpenTelemetry; generated apps also ship with instrumentation for SigNoz.

**Status: experimental local development software.** Generated code and critic
verdicts need human review. Live previews run model-written code with your OS
user's privileges. Read [SECURITY.md](SECURITY.md) before generating or previewing
an app, and keep the server local.

![DevSwarm Mission Control](docs/blog-images/mission-control.png)

## Contribute

New contributors are welcome. You can run checks and inspect the UI without a
model token or SigNoz account.

- **Start here:** [contributor guide](CONTRIBUTING.md) and [good first issues](https://github.com/himanshu748/devswarm/contribute).
- **Choose work:** the [contribution task index](docs/contribution-backlog.md), [open issues](https://github.com/himanshu748/devswarm/issues) and [roadmap](ROADMAP.md), covering tests, accessibility, agent contracts and observability.
- **Understand the code:** [architecture](docs/architecture.md), [local development](docs/development.md) and [API examples](docs/api.md).
- **Get help:** [support](SUPPORT.md), [Code of Conduct](CODE_OF_CONDUCT.md) and [private security reporting](SECURITY.md).

Built for the Agents of SigNoz hackathon by WeMakeDevs (July 20 to 26, 2026), Track 1: AI and Agent Observability.

The hackathon's two required files are [`observability/casting.yaml`](observability/casting.yaml) and [`observability/casting.yaml.lock`](observability/casting.yaml.lock): the Foundry config this project's SigNoz was actually installed from, so the whole telemetry stack is reproducible rather than described.

## Run it on your laptop

You need Git and Node 22 or newer. A Hugging Face token is needed for live
generation, refinement and Doctor diagnosis. SigNoz is optional for a first run.

```sh
git clone https://github.com/himanshu748/devswarm.git
cd devswarm
npm ci
npm run verify                # no token, no paid calls
cp .env.example .env          # optional until generation; set HF_TOKEN
npm start                     # http://localhost:4100
```

Open http://127.0.0.1:4100. The server binds to loopback by default. Without `SIGNOZ_OTLP_ENDPOINT` set, spans print to the console; dashboards, trace statistics and Doctor health queries need SigNoz. `npm start` loads `.env` automatically.

What you can do straight away:

- `/` the landing page. Its statistics come from SigNoz when it is connected, and fall back to static numbers when it is not.
- `/app` Mission Control: the swarm graph, a live span stream, the hangar of everything built so far, and the Swarm Doctor.
- Type a prompt and press Dispatch. Generation makes paid model calls. Historical runs took 4 to 20 minutes and roughly $0.20 to $0.60; current cost and latency depend on providers, token usage and retries.

Two things that need more than a token:

| feature | also needs |
| --- | --- |
| dashboards, `/api/stats`, Swarm Doctor | SigNoz running, plus Docker (or `CLICKHOUSE_HTTP_URL`) so the Doctor can read the trace store |
| per-app dashboards auto-created at generation time | `SIGNOZ_API_TOKEN` from SigNoz Settings, API keys |

To self-host SigNoz, this repo ships a Foundry config (`observability/casting.yaml` and its lock file) plus importable dashboards and alert rules. See [observability/README.md](observability/README.md).

## What a generation does

1. **Planner** turns the prompt into a typed build plan: entities, pages and a locked API contract. Every field carries a binding `rules` string (format, range, nullability) because most failed builds are the two builders disagreeing about exactly those details.
2. **Frontend and backend** generate in parallel against that contract, the frontend under a design system injected verbatim into its prompt.
3. **Critic** reviews both for contract conformance, security and runtime bugs. Catches route back to the agent that owns them, that agent patches its own file, and the critic re-reviews only the delta. Two regeneration rounds, then it ships with an honest verdict either way.
4. The result gets a live preview, a review report, its own `otel.mjs`, a `package.json`, and a SigNoz dashboard scoped to its service name.

## Refining what it shipped

Generated apps are not one-shot. `POST /api/refine` takes an instruction, and the planner decides which agents need to re-run and whether the API contract changes, so a copy tweak never rebuilds your backend. The critic still gates the result and the history is appended to the app's `review.json`.

In Mission Control, hit **Refine** on any card in the hangar.

## Model routing

| role | primary | fallback |
| --- | --- | --- |
| planner | GLM-5.2 | Qwen3.6-35B-A3B |
| frontend | GLM-5.2 (thinking disabled) | Kimi-K2.7-Code |
| backend | Qwen3-Coder-480B | Kimi-K2.7-Code |
| critic | Kimi-K2.7-Code | DeepSeek-V4-Flash |
| doctor | GLM-5.2 | Qwen3.6-35B-A3B |

The checked-in routing table uses open-weight models served through Hugging Face
Inference Providers. Provider availability, access and pricing can change.
`src/models.js` is the source of truth; its historical measurements are not a
current availability guarantee.

Two entries in `src/models.js` are load-bearing and worth reading the comments on. GLM-5.2 is **pinned to one provider** because the router load-balances it across seven whose `max_completion_tokens` ceilings disagree, from 16384 to over 200000, and an unpinned request fails outright whenever it lands on the strict one. Thinking is **disabled for the frontend role only**, because with it on GLM spends about two thirds of its budget reasoning and truncates full-page HTML.

The critic choice is measured, not assumed. On an app with three documented contract defects, three runs each, Kimi-K2.7-Code found 8 of 9 and the previous primary found 2 of 9.

## Observability

All three signals go to SigNoz:

- **Traces**: GenAI semconv attributes on every model call, plus `fallback_promotion` and `critic_catch` span events. Record the reason text; both of the worst bugs in this project were solved by reading it.
- **Metrics**: token, call, fallback, catch, generation and refinement counters, plus an LLM latency histogram, labelled by role and model.
- **Logs**: structured records for fallbacks, doctor diagnoses and generation verdicts.

Five dashboards and two alert rules live in `observability/`. The instrumentation layer is extracted as a standalone library, [otel-swarm](https://github.com/himanshu748/otel-swarm), which DevSwarm consumes as a real dependency.

### Self-healing

A SigNoz alert (fallback spike, or critic catch-rate flatline) posts to `/api/doctor/webhook`. The Swarm Doctor queries the swarm's own trace store for recent role health, diagnoses in plain English using the numbers it just read, and promotes a backup model or resets a recovered primary. Its own calls are traced, so the healer is as observable as the patient.

## API

| method | path | purpose |
| --- | --- | --- |
| POST | `/api/generate` | `{prompt}`, runs a full generation |
| POST | `/api/refine` | `{id, instruction}`, scoped edit to an existing app |
| GET | `/api/events` | SSE stream of everything the swarm is doing |
| GET | `/api/generations` | every app built, with verdict and refinement count |
| GET | `/api/stats` | lifetime stats, read live from SigNoz |
| GET | `/api/models` | current routing table and any active promotions |
| POST | `/api/doctor/run` | run a diagnosis on demand |
| GET | `/preview/:id/` | the generated app, running for real |

Previews are live. The generated Express server runs as a child process and requests are proxied to it. Children receive an allowlisted environment, but retain the host user's filesystem and network privileges. This is not process isolation. Previews also share the DevSwarm browser origin. See [the security boundary](SECURITY.md).

## Repo map

- `src/` server, orchestrator, LLM client with TTL-bound fallback promotion, `agents/` (planner, frontend, backend, critic, doctor), child-process preview runner, OTel setup
- `swarm/` the contracts the agents are held to: role contracts and the generated-app design system, both injected into prompts verbatim
- `ui/` landing page and Mission Control, no build step
- `observability/` Foundry casting file, dashboards, alert rules, ops notes
- `generated/` (gitignored) every app the swarm has built

## What we learned

The write-up is [BLOG.md](BLOG.md), and it is mostly about being wrong: a stale constant we blamed on a model, a provider limit we blamed on the model, a review gate we assumed was our strongest link, and a design system we were sure was helping that measurably was not. Every one of those was found by telemetry contradicting us rather than by reading the code again.

DevSwarm was built with Claude Code.

## License

DevSwarm is [MIT licensed](LICENSE). Third-party dependencies retain their own
licenses; see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Model weights and
provider services have separate terms. This repository's license does not grant
rights to provider services or guarantee the licensing of generated output.
