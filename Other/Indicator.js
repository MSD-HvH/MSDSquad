//Made by https://yougame.biz/members/548269/
//Remake by Mased
ui.add_checkbox('INDICATORS', 'indicators')

function indicators() {
    var ind = vars.get_int("js.indicators")
    if(ind){
        var size = render.get_screen_size();
        var binds = {
            'doubletap': [[(size[0] / 2) - 29, (size[1] / 2) + 11], 2, "DOUBLETAP"],
            'body_aim': [[(size[0] / 2) - 15, (size[1] / 2) + 35], 2, "BODY"],
            'override_damage': [[(size[0] / 2) - 12, (size[1] / 2) + 48], 1, "DMG"],
            'hide_shots': [[(size[0] / 2) - 25, (size[1] / 2) + 24], 1, "HIDESHOTS"],
            'manual_right': [[(size[0] / 2) - -35, (size[1] / 2) + 11], 2, ">"],
            'manual_left': [[(size[0] / 2) - 37, (size[1] / 2) + 11], 2, "<"]
        }

        for(i in binds) {
            if(vars.is_bind_active(i)) {
                render.text(binds[i][0], [255, 92, 119, 255], 1, binds[i][1], binds[i][2])
            } else {
                render.text(binds[i][0], [255, 255, 255, 255], 1, binds[i][1], binds[i][2])
            }
        }
    }
}

register_callback("render", indicators);