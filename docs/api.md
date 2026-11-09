# Local API reference

Base URL: `http://127.0.0.1:4100`. Start with `npm start` from the repository root.
These endpoints are unauthenticated and intended for local use. There is no
per-user event isolation. Do not expose this server publicly.

## Read-only checks, no token required

```sh
curl http://127.0.0.1:4100/api/models
curl http://127.0.0.1:4100/api/config
curl http://127.0.0.1:4100/api/generations
curl http://127.0.0.1:4100/api/apps
```

| Method | Route | Behavior |
| --- | --- | --- |
| GET | `/api/models` | `{roles, promoted}` with role config and current in-memory routing overrides |
| GET | `/api/config` | `{signozUrl, exporting}`; does not return API tokens |
| GET | `/api/generations` | `{apps: [...]}` newest first; a fresh clone returns `{apps: []}` |
| GET | `/api/generations/:id/plan` | Saved JSON plan; 400 for invalid ID, 404 if unavailable |
| GET | `/api/apps` | `{running: [...]}` with child IDs, ports and idle seconds |
| GET | `/api/events` | Process-wide SSE JSON events and periodic heartbeat comments |
| GET | `/api/stats` | Trace-derived statistics; needs ClickHouse access, returns 503 if unavailable |

Subscribe to the live feed, then press Ctrl+C to disconnect:

```sh
curl -N http://127.0.0.1:4100/api/events
```

SSE events use `data: <JSON>` records. Event families include `stage`,
`llm_start`, `llm_end`, `fallback`, `done`, `refined` and `generation_error`.
The payload shape varies by event. There is no replay cursor or stable
per-generation correlation on every stage yet; do not treat this as a versioned
external event protocol.

## Live model actions, paid

The following endpoints make real Hugging Face calls and require `HF_TOKEN`.
They can take several minutes. Run them deliberately with synthetic inputs.

| Method | Route | JSON request | Response |
| --- | --- | --- | --- |
| POST | `/api/generate` | `{prompt: string}` | ID, plan, verdict, regeneration count, catches, preview URL and collected stage events |
| POST | `/api/refine` | `{id: string, instruction: string}` | ID, targets, change summary, contract-change flag, verdict, catches, refinement count and preview URL |
| POST | `/api/doctor/run` | `{minutes: number}` optional, defaults to 180 | Trace health, diagnosis and applied routing actions; also needs ClickHouse |
| POST | `/api/doctor/webhook` | SigNoz alert payload | Immediate `{ok: true}` acknowledgment; diagnosis runs asynchronously |

Missing required generation/refinement fields return 400. Runtime/model errors
normally return 500 with an error message. A model-generated `fail` verdict is
different from an HTTP failure: a generation can return 200 with `verdict: fail`
and saved artifacts. Refinement currently writes output even when its critic
fails. Inspect the verdict and files before using them.

See [development](development.md) for a live generation request. Replace the ID
below with one from your local generation history. This refinement spends credits:

```sh
curl --max-time 1500 http://127.0.0.1:4100/api/refine \
  -H 'Content-Type: application/json' \
  --data '{"id":"YOUR-LOCAL-APP-ID","instruction":"Improve the empty state copy"}'
```

`GET /preview/:id/` starts generated code on demand and proxies traffic to its
child server. If startup fails, static files can be served instead. Opening a
preview executes model-written code on the host. Read [SECURITY.md](../SECURITY.md)
before doing this.
