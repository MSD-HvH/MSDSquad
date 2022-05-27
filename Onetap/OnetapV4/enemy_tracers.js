var screen = Render.GetScreenSize();
function radians_to_degrees(radians) {
    var pi = Math.PI;
    return radians * (180/pi);
}

function updateEnemies() {
    var enemies = Entity.GetEnemies()
    var local = Entity.GetLocalPlayer()
    var localOrigin = Entity.GetRenderOrigin(local)
    var wtsLocal = Render.WorldToScreen(localOrigin)
    
    render:for(var i = 0; i < enemies.length; i++) {
        if(!Entity.IsAlive(enemies[i]) || !Entity.IsValid(enemies[i]) || Entity.IsDormant(enemies[i])) continue;
        var enemyPos = Entity.GetRenderOrigin(enemies[i])
        var wtsEnemy = Render.WorldToScreen(enemyPos)
        var world_to_screen = (localOrigin[0] - enemyPos[0] == 0 && localOrigin[1] - enemyPos[1] == 0) || radians_to_degrees(Math.atan2(localOrigin[1] - enemyPos[1], localOrigin[0] - enemyPos[0])) - Local.GetViewAngles()[1]
        var calculatedFov = Math.abs(world_to_screen)
        if(calculatedFov - 10 >= 120) {
            UI.GetValue(["Misc.", "Keys", "Keys", "Key assignment", "Thirdperson"])
            ? Render.Line(wtsLocal[0], wtsLocal[1], wtsEnemy[0], wtsEnemy[1], [255, 255, 255, 255])
            : Render.Line(screen[0] / 2,screen[1] / 2, wtsEnemy[0], wtsEnemy[1], [255, 255, 255, 255])
            break render
        }
    }
}

Cheat.RegisterCallback("Draw", "updateEnemies")
