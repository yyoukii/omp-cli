# Contributing to omp-cli

Thanks for your interest in contributing.

## Development setup

Clone the repository, then install dependencies:
npm install

## Common tasks

npm run dev # run the CLI from source (e.g. npm run dev -- init my-server)
npm run build # compile TypeScript to dist/
npm run lint # check for lint errors
npm run format # auto-format the codebase
npm run format:check # check formatting without writing changes
`npm run dev -- init my-server` scaffolds into your _current_ directory. Note that `npm --prefix` does not help here — it still resolves relative to the prefixed directory, not your shell's actual location. To test from elsewhere, invoke the entry file directly instead: `node /path/to/omp-cli/node_modules/.bin/tsx /path/to/omp-cli/src/index.ts init my-server`. Otherwise, just remember to delete the generated folder afterward — it is not covered by `.gitignore`.

## Project structure

- `src/commands/` — CLI command implementations
- `src/templates/` — functions that generate the content of scaffolded files
- `src/utils/` — file system, validation, and error helpers
- `src/types/` — shared TypeScript types
- `src/constants/` — shared constant values (folder names, file names)

## Commit messages

This project uses [Conventional Commits](https://www.conventionalcommits.org/): `feat: ...`, `fix: ...`, `docs: ...`, `chore: ...`. Keep commits small and focused on one change.

## Before opening a pull request

- Run `npm run lint` and `npm run format:check` and make sure both pass.
- Run `npm run build` and make sure it compiles without errors.
- Keep pull requests focused on a single change.
- If your change involves a non-obvious technical trade-off, consider adding an entry to [docs/DECISIONS.md](./docs/DECISIONS.md) explaining your reasoning.

## Project philosophy

omp-cli aims to stay small. Before adding a new dependency, abstraction, or configuration option, consider whether it is solving a problem that actually exists yet. See [docs/DECISIONS.md](./docs/DECISIONS.md) for examples of trade-offs already considered and rejected.