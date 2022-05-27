var Lerp = function(a, b, percentage) { return a + (b - a) * percentage }
var screen = Render.GetScreenSize();
var timer = Globals.Realtime();
var data = new Object
var logs = new Array
var logs_time = new Array
var logs_anim_move = new Array
var logs_anim_alpha = new Array
var scopeCheck = 0
var hitchance, exploit, safepoint;
Cheat.ExecuteCommand("con_filter_enable 1 ");
Cheat.ExecuteCommand("con_filter_text  out hajksddsnkjcakhkjash");
Cheat.ExecuteCommand("con_filter_text  hjkasdhjadskdhasjkasd 1");

UI.AddSubTab(["Visuals", "SUBTAB_MGR"], "Logs")
UI.AddMultiDropdown(["Visuals", "Logs", "Logs"], "Type", ["Console", "Draw on screen"])
UI.AddSliderInt(["Visuals", "Logs", "Logs"], "Y Offset", screen[1] / 2, screen[1])
UI.AddSliderInt(["Visuals", "Logs", "Logs"], "Text Size", 6, 14)
UI.AddCheckbox(["Visuals", "Logs", "Logs"], "Scope Check")

function rage() {
    hitchance = Event.GetInt("hitchance")
    safepoint = Event.GetInt("safepoint")
    exploit = Event.GetInt("exploit")
}

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
        logs.push(["[", "onetap", "] hit ", name + "'s ", hitgroup.toString(), " for ", damage, " (", health, ") ", hitchance, " hc", " (", safepoint, ":", exploit + 1, ")"])
        logs_anim_move.push(0)
        logs_anim_alpha.push(0)
    }

    if(UI.GetValue(["Visuals", "Logs", "Logs", "Type"]) & (1 << 0)) {
        Cheat.PrintColor([255, 255, 255, 255], logs[0][0]); Cheat.PrintColor([250, 166, 24, 255], logs[0][1]); Cheat.PrintColor([255, 255, 255, 255], logs[0][2]); Cheat.PrintColor([255, 255, 255, 255], logs[0][3]); Cheat.PrintColor([250, 166, 24, 255], logs[0][4]); Cheat.PrintColor([255, 255, 255, 255], logs[0][5]); Cheat.PrintColor([250, 166, 24, 255], logs[0][6].toString()); Cheat.PrintColor([255, 255, 255, 255], logs[0][7]); Cheat.PrintColor([250, 166, 24, 255], logs[0][8].toString()); Cheat.PrintColor([255, 255, 255, 255], logs[0][9]); Cheat.PrintColor([250, 166, 24, 255], logs[0][10].toString()); Cheat.PrintColor([255, 255, 255, 255], logs[0][11]); Cheat.PrintColor([255, 255, 255, 255], logs[0][12]); Cheat.PrintColor([250, 166, 24, 255], logs[0][13].toString()); Cheat.PrintColor([255, 255, 255, 255], logs[0][14]); Cheat.PrintColor([250, 166, 24, 255], logs[0][15].toString()); Cheat.PrintColor([255, 255, 255, 255], logs[0][16] + "\n")
    }
}

function on_render() {
    if(!(UI.GetValue(["Visuals", "Logs", "Logs", "Type"]) & (1 << 1))) return;
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

        Render.String(((screen[0] / 2 - 89) + 100 * (logs_anim_move[i] / 254)) + (Render.TextSize(logs[i].join(""), font)[0] / 2) * (scopeCheck / 255), offset + 1 + (14 * i), 1, logs[i].join(""), [0, 0, 0, 255 * (logs_anim_alpha[i] / 255)], font)
        Render.String(((screen[0] / 2 - 90) + 100 * (logs_anim_move[i] / 254)) + (Render.TextSize(logs[i].join(""), font)[0] / 2) * (scopeCheck / 255), offset + (14 * i), 1, logs[i].join(""), [255, 255, 255, 255 * (logs_anim_alpha[i] / 255)], font)
    }
}

Cheat.RegisterCallback("ragebot_fire", "rage")
Cheat.RegisterCallback("Draw", "on_render")
Cheat.RegisterCallback("player_hurt", "get_player")