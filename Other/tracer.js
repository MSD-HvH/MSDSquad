ui.add_slider("Alpha", "alpha", 0, 255)

function on_render() {
    var enemies = entity.get_enemies()
    for(i = 0; i < enemies.length; i++) {
        var enemy = enemies[i]
        var screen = render.get_screen_size()
        var enemyPos = render.world_to_screen(entity.get_origin(enemy))
        var alpha = vars.get_uint("js.alpha")

        render.line([enemyPos[0], enemyPos[1]], [screen[0] / 2, screen[1] / 2], [255, 255, 255, alpha], 0.5)
    }
}

register_callback('render', on_render)