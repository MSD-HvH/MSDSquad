var Lerp = function(a, b, percentage) { return a + (b - a) * percentage }
var screen = Render.GetScreenSize();
var data = new Object
var logs = new Array
var logs_time = new Array
var logs_anim_move = new Array
var logs_anim_alpha = new Array
var scopeCheck = 0

UI.AddSubTab(["Visuals", "SUBTAB_MGR"], "Logs")
UI.AddSliderInt(["Visuals", "Logs", "Logs"], "Y Offset", screen[1] / 2, screen[1])
UI.AddSliderInt(["Visuals", "Logs", "Logs"], "Text Size", 6, 14)
UI.AddCheckbox(["Visuals", "Logs", "Logs"], "Scope Check")

function get_player() {
    var hitgroup = Event.GetInt("hitgroup");
    var damage = Event.GetInt("dmg_health");
    var health = Event.GetInt("health");
    var local = Entity.GetLocalPlayer();
    var victim = Entity.GetEntityFromUserID(Event.GetInt('userid'));
    var attacker = Entity.GetEntityFromUserID(Event.GetInt('attacker'));
    var name = Entity.GetName(victim);
    var hitboxes = {
        0: "generic",
        1: "head",
        2: "chest",
        3: "stomach",
        4: "left arm",
        5: "right arm",
        6: "right leg",
        7: "left leg"
    }

    for(var i in hitboxes) {
        if(hitgroup == i) { hitgroup = hitboxes[i] }
    }

    if(attacker == local && victim !== local) {
        logs_time.push(Globals.Curtime())
        logs.push("[onetap] hit " + name + "'s " + hitgroup + " for " + damage + " (" + health + " remaining)")
        logs_anim_move.push(0)
        logs_anim_alpha.push(0)
    }
}

function on_render() {
    var textSize = UI.GetValue(["Visuals", "Logs", "Logs", "Text Size"])
    var scoped = UI.GetValue(["Visuals", "Logs", "Logs", "Scope Check"])
    var offset = UI.GetValue(["Visuals", "Logs", "Logs", "Y Offset"])
    var font = Render.GetFont("Verdanab.ttf", textSize, true)
    var IsScoped = Entity.GetProp(Entity.GetLocalPlayer(), "CCSPlayer", "m_bIsScoped");

    if(logs.length > 10) {
        logs.shift()
        logs_time.shift()
        logs_anim_move.shift()
        logs_anim_alpha.shift()
    }

    if(logs_time[0] + 3.5 < Globals.Curtime()) {
        logs.shift();
        logs_time.shift();
        logs_anim_move.shift()
        logs_anim_alpha.shift()
    }

    for(var i in logs) {
        logs_anim_alpha[i] = Lerp(logs_anim_alpha[i], (logs_time[0] + 3.45 > Globals.Curtime()) ? 255 : 0, 0.2)
        logs_anim_move[i] = Lerp(logs_anim_alpha[i], (logs_time[0] + 3.45 > Globals.Curtime()) ? 255 : 125, 0.2)
        if(scoped) scopeCheck = Lerp(scopeCheck, IsScoped ? 255 : 0, 0.2)

        Render.String(((screen[0] / 2 - 89) + 100 * (logs_anim_move[i] / 254)) + 140 * (scopeCheck / 255), offset + 1 + (14 * i), 1, logs[i], [0, 0, 0, 255 * (logs_anim_alpha[i] / 255)], font)
        Render.String(((screen[0] / 2 - 90) + 100 * (logs_anim_move[i] / 254)) + 140 * (scopeCheck / 255), offset + (14 * i), 1, logs[i], [255, 255, 255, 255 * (logs_anim_alpha[i] / 255)], font)
    }
}

Cheat.RegisterCallback("Draw", "on_render")
Cheat.RegisterCallback("player_hurt", "get_player")
