var screen = render.get_screen_size()
ui.add_slider("Position X", "x", 5, screen[0])
ui.add_slider("Position Y", "y", 5, screen[1])

const in_bounds = function(vec, x, y, x2, y2) {
    return (vec[0] > x) && (vec[1] > y) && (vec[0] < x2) && (vec[1] < y2)
}

register_callback("render", function() {
    var x = vars.get_uint("js.x")
    var y = vars.get_uint("js.y")

    render.filled_rect([x, y], [100, 100], [55, 55, 55, 155], 3)
    render.text([x + 40, y + 40], [255, 255, 255, 255], 7, 2, "Hello world")

    if(ui.is_mouse_down()) {
        var pos = ui.get_cursor_position()
        if(in_bounds(pos, x, y, x + 320, y + 320)) {
            if(ui.get_menu_alpha() < 1) return

            vars.set_uint("js.x", pos[0] - 50)
            vars.set_uint("js.y", pos[1] - 50)
        }
    }
})
