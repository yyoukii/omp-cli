#include <a_samp>

public OnGameModeInit()
{
    SetGameModeText("my-server");
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
