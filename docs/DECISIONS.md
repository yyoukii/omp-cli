# Decisions

This file records notable technical decisions made during the development of omp-cli — the reasoning behind them, the alternatives considered, and when they might be worth revisiting. It is not a full history of every choice, just the ones that are not obvious from reading the code alone.

## CLI version is read from `package.json` at runtime

**Status:** Accepted (Milestone 1)

**Context**

The CLI needs to report its own version through `omp --version`. Three realistic options were considered:

1. Read `package.json` at runtime and use its `version` field.
2. Hardcode the version as a constant in the source code.
3. Import `package.json` directly using JSON module import attributes: `import packageJson from '../package.json' with { type: 'json' }`.

**Decision**

Option 1 was chosen. `src/index.ts` resolves the path to `package.json` relative to its own location and reads it with `node:fs`'s `readFileSync` at startup.

**Alternatives considered**

- **Hardcoding the version** was rejected because it creates two sources of truth. `package.json` is what `npm version` and `npm publish` read and write; a separate hardcoded value can drift from it as more contributors join and cut releases. A stale hardcoded version is a confusing bug for end users comparing `omp --version` against what is published on npm.
- **JSON import attributes** (`with { type: 'json' }`) were attractive: they keep a single source of truth like option 1, while also giving TypeScript an accurate, automatically-inferred type for the imported JSON, instead of an unverified type assertion. This option was rejected for now because it requires Node.js 22 or newer. This project commits to Node.js 20+ through its `engines` field, and raising that floor just to use this syntax was not judged worth it for v0.1.0.

**Consequences**

- Every CLI invocation performs one synchronous file read and `JSON.parse` before Commander processes anything. This is negligible for a CLI invoked by a human from a terminal.
- The code assumes `package.json` is always exactly one directory above the file that is running (`src/index.ts` in development, `dist/index.js` after build). This holds today because `src/` and `dist/` are both direct children of the project root. If the folder layout changes — for example, a deeper `outDir` — this will break at runtime rather than at compile time, since TypeScript cannot verify a relative file path that only exists on disk.

**When to revisit**

If the project's minimum supported Node.js version is ever raised to 22+, switch to the JSON import attributes approach. It removes the folder-layout assumption above and gives TypeScript real type-checking against the actual file contents, rather than an asserted interface.

## Author name in the generated LICENSE is left as a manual placeholder

**Status:** Accepted (Milestone 4)

**Context**

`templates/license.ts` generates an MIT License for the scaffolded project. A license needs a copyright holder name, but the CLI has no way to know who is running it.

**Decision**

The generated LICENSE uses `[fullname]` as the copyright holder, following the same bracketed-placeholder convention as the official MIT License template text. The year is filled in automatically from the system clock; the name is left for the user to fill in.

**Alternatives considered**

- **Prompting for the author's name interactively** was rejected because it would require adding Inquirer, which this project has already decided to avoid for v0.1.0 (see the `init` command's argument design).
- **Reading the name from `git config user.name`** was not implemented for v0.1.0. It was not part of the original feature scope, and auto-detecting values the user has not explicitly provided runs against this release's preference for minimal, predictable behavior.

**When to revisit**

If a future version adds any form of user input beyond the project name (interactive prompts, config files, flags), reading the author's name from `git config user.name` as a default — while still allowing an explicit override — would be a natural, low-complexity addition.
