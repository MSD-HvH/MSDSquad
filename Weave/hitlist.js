var players = []; //Made by mased
var screen = render.get_screen_size();

ui.add_slider("Position x", "x", 10, screen[0])
ui.add_slider("Position y", "y", 10, screen[1])

function get_player() {
    var userid = entity.get_player_for_user_id(current_event.get_int("userid"))
    var attacker = entity.get_player_for_user_id(current_event.get_int("attacker"))
    var userid_info = entity.get_player_info(userid); 
    var hitgroup = current_event.get_int("hitgroup");
    var hitboxes = {
        1: "head",
        2: "chest",
        3: "stomach",
        4: "left arm",
        5: "right arm",
        6: "right leg",
        7: "left leg"
    }

    for(i in hitboxes) {
        if(hitgroup == i) { 
             hitgroup = hitboxes[i] 
        } else {
             hitgroup = "generic"
        }
    }

    function dmg_check(){
        if(current_event.get_int("dmg_health") >= 100) { return "fatal" } else { return current_event.get_int("dmg_health")}
    }

    if (attacker == entity.get_local_player() && userid != entity.get_local_player()) {
        players.push([
        userid_info.name, 
        hitgroup, 
        dmg_check()])
    }

    if(players.length > 7) { players.length = 0 }
}

function hitlogList() {
    var text = ["id", "target", "hitbox", "dmg"]
    var hitlogPos = [vars.get_uint("js.x"), vars.get_uint("js.y")]
    var hitlogSize = [270, 14]

    render.line([hitlogPos[0], hitlogPos[1] - 1], [hitlogPos[0] + hitlogSize[0], hitlogPos[1] - 1], [182, 79, 255, 255], 1.5)
    render.filled_rect(hitlogPos, hitlogSize, [40, 40, 40, 200], 1)
    
    render.text([hitlogPos[0] + 8, hitlogPos[1] + 6], [255, 255, 255, 255], 5, 2, text[0])
    render.text([hitlogPos[0] + 40, hitlogPos[1] + 6], [255, 255, 255, 255], 5, 2, text[1])
    render.text([hitlogPos[0] + 123, hitlogPos[1] + 6], [255, 255, 255, 255], 5, 2, text[2])
    render.text([hitlogPos[0] + 245, hitlogPos[1] + 6], [255, 255, 255, 255], 5, 2, text[3])

    for(var i in players){
        render.line([hitlogPos[0] + 2, hitlogPos[1] + 25 + (12 * i)], [hitlogPos[0] + 2, hitlogPos[1] + 16 + (12 * i)], [84, 220, 120, 255], 1.5)
        render.text([hitlogPos[0] + 8, hitlogPos[1] + 20 + (12 * i)], [255, 255, 255, 255], 5, 2, (i + "         " + players[i][0]))
        render.text([hitlogPos[0] + 123, hitlogPos[1] + 20 + (12 * i)], [255, 255, 255, 255], 5, 2, (players[i][1]))
        render.text([hitlogPos[0] + 245, hitlogPos[1] + 20 + (12 * i)], [255, 255, 255, 255], 5, 2, (players[i][2].toString()))
    }
}

register_callback("player_hurt", get_player)
register_callback("render", hitlogList)
register_callback('round_end', function(){
    players.length = 0
})
