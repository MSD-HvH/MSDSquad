var colors = {
    head: [76, 255, 51, 255],
    body: [255, 255, 255, 255],
}
var hits = []
function lerp(a, b, c) {
    return a+(b-a)*c
}

function on_damage() {
    var attacker = Entity.GetEntityFromUserID(Event.GetInt('attacker'));
    var attacked = Entity.GetEntityFromUserID(Event.GetInt('userid'));
    var damage = Event.GetInt('dmg_health');
    var hitgroup = Event.GetInt('hitgroup');
    var color = colors.body
    if(hitgroup == 1) color = colors.head;
    if (attacker == Entity.GetLocalPlayer() && attacker != attacked) {
        for (var i = 0; i < hits.length; i++) {
            if(hits[i].ent == attacked){
                hits[i].damage += damage
                hits[i].alpha = 25550
                hits[i].color = color
                hits[i].offset = 0
                return;
            }
        }

        var pos = Entity.GetRenderOrigin(attacked)
        pos[2] += 64
        hits.push({
            ent: attacked,
            position: pos,
            alpha: 25550,
            damage: damage,
            color: color,
            offset: 0
        });
    }
}

Cheat.RegisterCallback('player_hurt', "on_damage")

function on_render() {
    var font = Render.GetFont("verdanai.ttf", 10, true)
    for (var i = 0; i < hits.length; i++) {
        hits[i].alpha = Math.floor(lerp(hits[i].alpha, 0, 2 * Globals.Frametime()))
        var position = Render.WorldToScreen(hits[i].position)
        hits[i].color[3] = Math.min(255, hits[i].alpha)
        hits[i].offset += 50 * Globals.Frametime()
        if(hits[i].alpha > 0){
            Render.String(position[0] + 1, position[1] + 1 - hits[i].offset, 0, '-' + hits[i].damage, [0, 0, 0, Math.min(255,hits[i].alpha)], font)
            Render.String(position[0], position[1]-hits[i].offset, 0, '-' + hits[i].damage, hits[i].color, font)
        }else{
            hits.shift()
        }
    }
}

Cheat.RegisterCallback("Draw", "on_render")