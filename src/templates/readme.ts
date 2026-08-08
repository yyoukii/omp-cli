import {
  CONFIG_JSON_FILE,
  GAMEMODES_DIR,
  MAIN_AMX_FILE,
  MAIN_PWN_FILE,
} from '../constants/index.js';
import type { ProjectContext } from '../types/index.js';

export function getReadmeTemplate(context: ProjectContext): string {
  return `# ${context.projectName}

An open.mp gamemode project.

## Getting started

1. Download the open.mp server from https://github.com/openmultiplayer/open.mp/releases
2. Compile \`${GAMEMODES_DIR}/${MAIN_PWN_FILE}\` into \`${GAMEMODES_DIR}/${MAIN_AMX_FILE}\` using a PAWN compiler (qawno or pawncc)
3. Run \`omp-server\` (Linux) or \`omp-server.exe\` (Windows) from this directory

Server settings live in \`${CONFIG_JSON_FILE}\`. See the [config.json reference](https://open.mp/docs/server/config.json) for all available options.
`;
}
