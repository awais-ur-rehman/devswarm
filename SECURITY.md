# Security policy

DevSwarm is experimental local development software. Security fixes target the
latest `main`; there are no maintained release branches or response-time promises.

## Deployment boundary

The server defaults to `127.0.0.1`. Its APIs have no authentication, rate limits
or per-user isolation. Keep it local and do not expose it through a public
tunnel. `HOST` can change the bind address for controlled environments, but it
does not add access control.

Generated previews execute model-written JavaScript as child processes with
the same OS user and filesystem access as DevSwarm. An allowlisted environment
reduces direct environment-secret exposure; it is **not a sandbox**. A critic
verdict is also not a security guarantee. Review generated files before opening
a preview, use a disposable environment without sensitive files, and do not
run untrusted prompts or generated code on a privileged machine.

Prompts, generated code and error text can reach model providers and telemetry.
Do not use production secrets or private data in a prompt. Restrict access to
SigNoz and ClickHouse separately. SigNoz webhook delivery to a loopback-bound
server needs a deliberately configured local path; do not expose the whole API
just to enable the Doctor.

## Report a vulnerability privately

Use GitHub's **Report a vulnerability** option in the repository's Security tab
if it is available:
https://github.com/himanshu748/devswarm/security/advisories/new

Availability depends on repository settings. If it is disabled, use a private
contact method published on [the maintainer's profile](https://github.com/himanshu748),
or open an issue asking for a private contact without including exploit details.
Do not put vulnerabilities, credentials or personal data in public issues.

Include the affected commit, a concise description, prerequisites, expected and
observed behavior, and a minimal sanitized reproduction in an environment you
control. There is no paid bug bounty or guaranteed acknowledgment window.
