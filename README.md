[![npm version](https://img.shields.io/npm/v/@youki_/omp-cli)](https://www.npmjs.com/package/@youki_/omp-cli)

# omp-cli

A minimal command-line tool for scaffolding [open.mp](https://open.mp) gamemode projects.

## Installation

npm install -g @youki_/omp-cli

## Usage

### Create a new project

omp init <project-name>

Generates a ready-to-compile open.mp project in a new directory named after `<project-name>`.

Project names may contain lowercase letters, numbers, hyphens, and underscores, and must start with a letter or number.

Generated structure:

<project-name>/
├── gamemodes/
│ └── main.pwn
├── filterscripts/
├── components/
├── scriptfiles/
├── config.json
├── README.md
├── .gitignore
└── LICENSE

### Other commands

omp --version # print the installed version
omp --help # show usage information

## Roadmap

Version 0.1.0 intentionally covers only `init`, `--version`, and `--help`. These commands are planned for future releases and are not implemented yet:

- `omp build`
- `omp run`
- `omp plugin add`
- `omp plugin remove`
- `omp update`
- `omp doctor`
- `omp test`
- `omp docs`
- `omp config`

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](./CONTRIBUTING.md) for how to get started, [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) for community expectations, and [docs/DECISIONS.md](./docs/DECISIONS.md) for the reasoning behind notable technical choices already made.

## License

MIT — see [LICENSE](./LICENSE).
