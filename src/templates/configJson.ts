import type { ProjectContext } from '../types/index.js';

const PAWN_MAIN_SCRIPT = 'main 1';

export function getConfigJsonTemplate(context: ProjectContext): string {
  const config = {
    name: context.projectName,
    network: {
      port: 7777,
    },
    max_players: 50,
    rcon: {
      enable: false,
      password: 'changeme',
    },
    pawn: {
      main_scripts: [PAWN_MAIN_SCRIPT],
      legacy_plugins: [],
      side_scripts: [],
    },
  };

  return JSON.stringify(config, null, 2) + '\n';
}