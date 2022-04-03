var logs = [];
var logsTime = [];
var anim = 0;
lerp = function(start, end, time, do_extraanim) { if(!do_extraanim && Math.floor(start) == end) return end; time = global_vars.frametime() * (time * 175); if(time < 0) time = 0.01; else if(time > 1) time = 1; return (end - start) * time + start }
var screen = render.get_screen_size();

ui.add_slider("Adding y", "adding_y", screen[1] / 2, screen[1])

function get_player() {
    var userid = entity.get_player_for_user_id(current_event.get_int("userid"))
    var attacker = entity.get_player_for_user_id(current_event.get_int("attacker"))
    var userid_info = entity.get_player_info(userid); 
    var attacker_info = entity.get_player_info(attacker);
    var hitgroup = current_event.get_int("hitgroup");
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

    logsTime.push(global_vars.curtime());

    for(i in hitboxes) {
        if(hitgroup == i) { hitgroup = hitboxes[i] }
    }

    function dmg_check(){
        if(current_event.get_int("dmg_health") >= 100) { return "fatal" } else { return current_event.get_int("dmg_health")}
    }

    if (attacker == entity.get_local_player() && userid != entity.get_local_player()) {
        logs.push(["[weave.su] Hit: " +
        userid_info.name + "'s in " +
        hitgroup + " for " +
        dmg_check() + " ( " + current_event.get_int("health") + " )" +" damage"])
    } else if(userid == entity.get_local_player() && attacker != entity.get_local_player()) {
        logs.push(["[weave.su] Hurt from: " +
        attacker_info.name + " for " +
        dmg_check() + " damage"])
    }

}

function hitlogs() {

    if (logs.length > 8) {
        logs.shift();
        logsTime.shift();
    }

    if (logsTime[0] + 6.5 < global_vars.curtime()) {
        logs.shift();
        logsTime.shift();
    }

    for(i in logs){
        render.text([screen[0] / 2, vars.get_uint("js.adding_y") + (12 * i)], [255, 255, 255, 255 * (anim / 255)], 7, 1, logs[i] == null ? "" : logs[i].toString())
    }

    anim = lerp(anim, (logs.length != 0) ? 255 : 0, 0.03)

}

register_callback("player_hurt", get_player) 
register_callback("render", hitlogs);
register_callback("round_end", function() {
    logs.length = 0
}) 
