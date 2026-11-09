# Contributing to DevSwarm

Welcome. You can contribute without buying model credits or running SigNoz.
Documentation, accessibility, tests, bug reproductions and observability work
are as useful as new agent features.

## Find a task

- [Good first issues](https://github.com/himanshu748/devswarm/issues?q=is%3Aissue%20is%3Aopen%20label%3A%22good%20first%20issue%22) are bounded tasks with starting files and acceptance criteria.
- [Help wanted](https://github.com/himanshu748/devswarm/issues?q=is%3Aissue%20is%3Aopen%20label%3A%22help%20wanted%22) includes larger work that benefits from a short approach before coding.
- [Roadmap](ROADMAP.md) explains priorities and current limitations.

Search existing issues and PRs first. Comment on an issue with your intended
approach before starting a large change, and check whether someone is already
working on it. Small fixes can go straight to a PR. Assignment is a coordination
aid, not a requirement to contribute. If you pause, leave a note so others can
continue. Do not submit duplicate placeholder PRs to reserve work.

## Set up a fork

Requires Git, Node.js 22 or newer and npm. `.nvmrc` selects Node 22 if you use nvm.

```sh
git clone https://github.com/YOUR-USERNAME/devswarm.git
cd devswarm
git remote add upstream https://github.com/himanshu748/devswarm.git
npm ci
git switch -c fix/describe-your-change
npm run verify
```

`npm run verify` checks JavaScript syntax, parses repository JSON, and runs the
Node test suite. Tests use synthetic responses and a temporary working directory.
They do not call Hugging Face, run generated code, or require SigNoz or secrets.
The Git dependency is pinned to a commit and uses HTTPS, so SSH keys are not
required. `npm ci` still needs network access for dependencies.

To inspect the UI, run `npm start` and open http://127.0.0.1:4100/app. The server
starts without a token. Dispatching, refining and Doctor diagnosis make real
model calls and need your own `HF_TOKEN`. Copy `.env.example` to `.env` only if
you need those features. See [development](docs/development.md) for troubleshooting.

## Make a focused change

- Keep plain JavaScript, ESM and the framework-free UI. There is no build step.
- Read [AGENTS.md](AGENTS.md) and [architecture](docs/architecture.md).
- Use two-space indentation and the surrounding file's conventions.
- Keep new dependencies minimal and explain any addition in the PR.
- Add regression coverage for behavior changes. Use `node:test` and synthetic
  fixtures; never require a contributor's paid account in the default tests.
- Span agent and model work, preserve `devswarm.role` and `gen_ai.*` attributes,
  and keep emitted events consistent with the UI.
- Keep prompts, tokens, private generated apps and raw sensitive traces out of
  issues, fixtures, screenshots and commits. Sanitize examples.
- Use simple punctuation, with no em or en dashes, including commit messages.
- AI-assisted contributions are welcome. Understand and review every change,
  verify it yourself, and follow the same quality bar as any other contribution.

## Open a pull request

```sh
npm run verify
git diff --check
git add path/to/changed-file
git commit -m "Fix a specific behavior"
git push -u origin fix/describe-your-change
```

Open a PR against `main` using the template. Link its issue, explain the
before/after behavior, and include the exact checks you ran. For UI changes,
include desktop and narrow-screen screenshots and keyboard/reduced-motion
checks. State when live model or SigNoz validation was not run. A small docs-only
change does not need new tests.

Keep commits focused with imperative subjects under 72 characters. Do not add
AI attribution or co-author trailers. Avoid unrelated formatting or lockfile
churn. If dependencies change, update both package files and run `npm ci` again.

The maintainer reviews scope, correctness, tests, telemetry and compatibility.
CI passing is a baseline, not a promise of merge. Review timing depends on
maintainer availability; there is no guaranteed response window. Use the PR
thread for follow-ups, and open draft PRs when you want early feedback.

## Community and security

Follow the [Code of Conduct](CODE_OF_CONDUCT.md). For usage questions, use the
[question form](https://github.com/himanshu748/devswarm/issues/new?template=question.yml).
For vulnerabilities, use the private route in [SECURITY.md](SECURITY.md).
Contributions are made under the [MIT license](LICENSE). Contribute only work
you have the right to share. There is no CLA, bounty or reward promise.
