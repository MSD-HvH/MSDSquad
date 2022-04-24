function normalize_yaw(angle) {
    var adjusted_yaw = angle;

    if (adjusted_yaw < -180) adjusted_yaw += 360;
    if (adjusted_yaw > 180) adjusted_yaw -= 360;
    return adjusted_yaw;
}

function dsy_circle() {
    localplayer_index = entity.get_local_player()

    const real = (60 - cheat.get_desync_amount()) / 2; fake = (60 + cheat.get_desync_amount()) / 2;
    const delta = Math.abs(normalize_yaw(real % 360 - fake % 360)) / 2;
    const frac = delta / 58;

    screen = render.get_screen_size()
    x = screen[0]/2
    y = screen[1]/2

    render.arc([x, y], 10, 15, 1, 400, [0, 0, 0, 155], false, 3)
    render.arc([x, y], 10, 15 * frac, 1, 400, [69, 168, 255, 255], false, 2)
}

register_callback("render", dsy_circle) 
