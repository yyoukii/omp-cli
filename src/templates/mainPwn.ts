import type { ProjectContext } from '../types/index.js';

export function getMainPwnTemplate(context: ProjectContext): string {
  return `#include <a_samp>

public OnGameModeInit()
{
    SetGameModeText("${context.projectName}");
    AddPlayerClass(0, 1958.3783, 1343.1572, 15.3746, 269.1425, 0, 0, 0, 0, 0, 0);
    return 1;
}

public OnGameModeExit()
{
    return 1;
}

public OnPlayerConnect(playerid)
{
    return 1;
}

public OnPlayerSpawn(playerid)
{
    return 1;
}
`;
}
