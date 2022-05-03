// Made by Mased & ScorpySter - thx for helping
var screen = render.get_screen_size();
var anim = 0;
var drg = 0
var enabled = {
    "log": { state: false, anim: 0 }, 
    "rect": { state: false, anim: 0 },
    "rect2": { state: false, anim: 0 },
    "RectColor": { color: [255, 255, 255, 255], cached: [0, 0, 0, 255], anim: 0, enabled: false },
    "RectColor2": { color: [255, 255, 255, 255], cached: [0, 0, 0, 255], anim: 0, enabled: false },
    "RectColor3": { color: [255, 255, 255, 255], cached: [0, 0, 0, 255], anim: 0, enabled: false },
    "rect3": { state: false, anim: 0 },
    "slider": { current: 30, anim: 0 },
    "combobox": { current: 0, anim: 0, enabled: false, height: 20, elements: [] }
}
var cache2 = {}
var cache = [0, 0]
var size = [480, 360];
var Render = {
    Lerp: function(a, b, percentage) { return a + (b - a) * percentage; },
    CursorBox: function(mouse_pos, x, y, x2, y2) { return (mouse_pos[0] > x) && (mouse_pos[1] > y) && (mouse_pos[0] < x2) && (mouse_pos[1] < y2) }
}

function Drag(pos, x, y, x2, y2, item) {
    if(ui.is_mouse_down()) {
        if(Render.CursorBox(pos, x, y, x2, y2) && drg == 0) {
            cache[0] = x - pos[0]
            cache[1] = y - pos[1]
            drg = 1
        }
    }
    if (!ui.is_mouse_down()) drg = 0
    if(ui.get_menu_alpha() > 0 && drg == 1) {
        vars.set_uint(item + "_x", pos[0] + cache[0])
        vars.set_uint(item + "_y", pos[1] + cache[1])
    }
}

function AddCheckbox(pos, x, y, name, varname) {
    var alpha = ui.get_menu_alpha()
    if(alpha < 0.9) return

    if(ui.is_mouse_down()) {
        if(Render.CursorBox(pos, x, y, x + 20, y + 20)) {
            enabled[varname].state = true
        }

        if(Render.CursorBox(pos, x + 25, y, x + 45, y + 20)) {
            enabled[varname].state = false
        }
    }

    enabled[varname].anim = Render.Lerp(enabled[varname].anim, enabled[varname].state ? 3 : 0, 8 * global_vars.frametime())

    render.text([x, y - 10], [255, 255, 255, 255], 5, 2, name)
    render.filled_rect([x, y], [40, 15], [30, 30, 30, 155], 5)
    render.rect([x, y], [40, 15], [55, 55, 55, 155], 5)
    render.filled_circle([x + 8 + (8 * enabled[varname].anim), y + 7.5], 6, enabled[varname].state ? [77, 255, 79, 155] : [255, 255, 255, 155], 10)
}

function AddColorPicker(pos, x, y, name, varname) {
    var alpha = ui.get_menu_alpha()
    if(alpha < 0.9) return
    render.filled_rect([x, y], [20, 20], enabled[varname].color, 3)
    render.text([x, y - 10], [255, 255, 255, 255 * alpha], 5, 2, name)
    enabled[varname].anim = Render.Lerp(enabled[varname].anim, enabled[varname].enabled ? 3 : 0, 8 * global_vars.frametime())
    
    if(Render.CursorBox(pos, x, y, x + 20, y + 20)) {
        col = enabled[varname].color.toString()
        if(ui.is_mouse_down()) enabled[varname].enabled = true
        render.text([pos[0] + 25, pos[1] + 10], [255, 255, 255, 255], 12, 2, col)
    }

    if(enabled[varname].enabled) {
        render.filled_rect([x + 40, y], [150 / (3 / enabled[varname].anim), 180 / (3 / enabled[varname].anim)], [55, 55, 55, 255 * alpha], 3)
        render.filled_rect([x + 200, y], [20, 20], [78, 59, 255, 255 / (3 / enabled[varname].anim)], 3); y += 40

        var color = enabled[varname].cached
        var color_non_cached = enabled[varname].color

        render.filled_rect_gradient([x + 50, y + 60], [65 / (3 / enabled[varname].anim), 20 / (3 / enabled[varname].anim)], [0, 0, 0, 255], color, color, [0, 0, 0, 255])
        render.filled_rect_gradient([x + 50 + 65, y + 60], [65 / (3 / enabled[varname].anim), 20 / (3 / enabled[varname].anim)], color, [255, 255, 255, 255], [255, 255, 255, 255], color)
        render.filled_rect_gradient([x + 50, y + 83], [130 / (3 / enabled[varname].anim), 20 / (3 / enabled[varname].anim)], [color_non_cached[0], color_non_cached[1], color_non_cached[2], 255], [color_non_cached[0], color_non_cached[1], color_non_cached[2], 0], [color_non_cached[0], color_non_cached[1], color_non_cached[2], 0], [color_non_cached[0], color_non_cached[1], color_non_cached[2], 255])
        
        //Hue
        if (Render.CursorBox(pos, x + 50, y + 60, x + 50 + 130, y + 80) && ui.is_mouse_down()){
            var cursor = pos
            var color_x = Math.floor(255 * (cursor[0] - x - 100) / 75)
            color_new = [color[0] + color_x, color[1] + color_x, color[2] + color_x, color[3]]
            if (color[2] + color_x < 0) color_new[2] = 0
            if (color[1] + color_x < 0) color_new[1] = 0
            if (color[0] + color_x < 0) color_new[0] = 0
            if (color[2] + color_x > 255) color_new[2] = 255
            if (color[1] + color_x > 255) color_new[1] = 255
            if (color[0] + color_x > 255) color_new[0] = 255
            enabled[varname].color = color_new
        }

        //Opacity
        if (Render.CursorBox(pos, x + 50, y + 83, x + 50 + 130, y + 83 + 20) && ui.is_mouse_down()){
            var cursor = pos
            var color_x = Math.floor(255 * (cursor[0] - x - 50) / 129)
            color_new_alpha = [color_non_cached[0], color_non_cached[1], color_non_cached[2], 255 - color_x]
            enabled[varname].cached = color_new_alpha
        }

        render.filled_rect_gradient([x + 50, y + 106], [21.5, 20], [0, 0, 255, 255], [0, 255, 255, 255], [0, 255, 255, 255], [0, 0, 255, 255])
        if (Render.CursorBox(pos, x + 50, y + 106, x + 50 + 21.5, y + 106 + 20) && ui.is_mouse_down()){
            var cursor = pos
            var color_x = Math.floor((255 * ((cursor[0] - (x + 50)) / 21.5)))
            color_new_color = [0, color_x, 255, color[3]]
            enabled[varname].cached = color_new_color
        }

        render.filled_rect_gradient([x + 50 + 21.5, y + 106], [21.5, 20], [0, 255, 255, 255], [0, 255, 0, 255], [0, 255, 0, 255], [0, 255, 255, 255])
        if (Render.CursorBox(pos, x + 50 + 21.5, y + 106, x + 50 + 21.5 * 2, y + 106 + 20) && ui.is_mouse_down()){
            var cursor = pos
            var color_x = Math.floor((255*((cursor[0] - (x + 50 + 21.5)) / 21.5)))
            color_new_color = [0, 255, 255-color_x, color[3]]
            enabled[varname].cached = color_new_color
        }

        render.filled_rect_gradient([x + 50 + 21.5 * 2, y + 106], [21.5, 20], [0, 255, 0, 255], [255, 255, 0, 255], [255, 255, 0, 255], [0, 255, 0, 255])
        if (Render.CursorBox(pos, x + 50 + 21.5 * 2, y + 106, x + 50 + 21.5 * 3, y + 126) && ui.is_mouse_down()){
            var cursor = pos
            var color_x = Math.floor((255*((cursor[0] - (x + 50 + 21.5 * 2)) / 21.5)))
            color_new_color = [color_x, 255, 0, color[3]]
            enabled[varname].cached = color_new_color
        }

        render.filled_rect_gradient([x + 50 + 21.5 * 3, y + 106], [21.5, 20], [255, 255, 0, 255], [255, 0, 0, 255], [255, 0, 0, 255], [255, 255, 0, 255])
        if (Render.CursorBox(pos, x + 50 + 21.5 * 3, y + 106, x + 50 + 21.5 * 4, y + 126) && ui.is_mouse_down()){
            var cursor = pos
            var color_x = Math.floor((255*((cursor[0] - (x + 50 + 21.5 * 3)) / 21.5)))
            color_new_color = [255, 255 - color_x, 0, color[3]]
            enabled[varname].cached = color_new_color
        }

        render.filled_rect_gradient([x + 50 + 21.5 * 4, y + 106], [21.5, 20], [255, 0, 0, 255], [255, 0, 255, 255], [255, 0, 255, 255], [255, 0, 0, 255])
        if (Render.CursorBox(pos, x + 50 + 21.5 * 4, y + 106, x + 50 + 21.5 * 5, y + 126) && ui.is_mouse_down()){
            var cursor = pos
            var color_x = Math.floor((255*((cursor[0] - (x + 50 + 21.5 * 4)) / 21.5)))
            color_new_color = [255, 0, color_x, color[3]]
            enabled[varname].cached = color_new_color
        }

        render.filled_rect_gradient([x + 50 + 21.5 * 5, y + 106], [21.5, 20], [255, 0, 255, 255], [0, 0, 255, 255], [0, 0, 255, 255], [255, 0, 255, 255])
        if (Render.CursorBox(pos, x + 50 + 21.5 * 5, y + 106, x + 50 + 21.5 * 6, y + 126) && ui.is_mouse_down()){
            var cursor = pos
            var color_x = Math.floor((255*((cursor[0] - x  - (x + 50 + 21.5 * 5)) / 21.5)))
            color_new_color = [255 - color_x, 0, 255, color[3]]
            enabled[varname].cached = color_new_color
        }
    
        render.filled_rect([x + 50, y - 30], [60, 80], enabled[varname].color, 3)
        render.filled_rect([x + 120, y - 30], [60, 80], enabled[varname].cached, 3)
        

        if(Render.CursorBox(pos, x + 200, y - 40, x + 220, y - 20)) {
            if(ui.is_mouse_down()) {
                enabled[varname].enabled = false
            }
        }
    }
}

function AddSlider(pos, x, y, name, varname, min, max) {
    var alpha = ui.get_menu_alpha()
    if(alpha < 0.9) return

    render.filled_rect([x, y], [140, 10], [30, 30, 30, 255], 4)
    render.rect([x, y], [140, 10], [55, 55, 55, 155], 3)
    render.filled_circle([(x + (enabled[varname].current - min) / (max - min) * 140), y + 5], 6, [255, 255, 255, 155], 15)
    render.text([x, y - 10], [255, 255, 255, 255], 5, 2, name)
    render.text([x + 130, y - 10], [255, 255, 255, 255], 7, 2, (enabled[varname].current).toString()) 

    if (Render.CursorBox(pos, x - 1, y - 2, x + 140.5, y + 10) && ui.is_mouse_down()){
        var cursor = pos
        var slider_x = Math.floor((max - min) * ((cursor[0] - x + 140 / ((max - min) / min)) / 140)); 
        current_slider = slider_x 
        enabled[varname].current = current_slider
    }
}

function AddCombobox(pos, x, y, name, varname, elements) {
    var alpha = ui.get_menu_alpha()
    if(alpha < 0.9) return

    if(ui.is_mouse_down()) {
        if(Render.CursorBox(pos, x, y, x + 100, y + 20)) {
            enabled[varname].enabled = true
            enabled[varname].height = 20 + 20 * elements.length
        }

        if(Render.CursorBox(pos, x + 102, y, x + 135, y + 20)) {
            enabled[varname].enabled = false
            enabled[varname].height = 20
        }
    }

    enabled[varname].elements = elements
    enabled[varname].anim = Render.Lerp(enabled[varname].anim, enabled[varname].enabled ? 255 : 0, 8 * global_vars.frametime())

    render.filled_rect([x, y], [100, 20], [30, 30, 30, 255], 4)
    render.filled_rect([x, y + 21], [100, (enabled[varname].height - 20) / (255 / enabled[varname].anim)], [30, 30, 30, 255 / (255 / enabled[varname].anim)], 4)
    render.rect([x, y], [100, 20], [55, 55, 55, 155], 3)
    render.rect([x, y + 21], [100, enabled[varname].height / (255 / enabled[varname].anim) - 20], [55, 55, 55, 155 / (255 / enabled[varname].anim)], 3)
    render.text([x, y - 10], [255, 255, 255, 255], 5, 2, name)
    render.text([x + 5, y + 9], [255, 255, 255, 255], 5, 2, elements[enabled[varname].current])

    
    if(enabled[varname].enabled) {
        render.filled_rect([x, y + 20 + 20 * enabled[varname].current], [100, 20], [55, 55, 55, 55], 4)
        for(i in enabled[varname].elements) {
            if(ui.is_mouse_down()) {
                if(Render.CursorBox(pos, x, y + 20 + 20 * i, x + 100, y + 40 + 20 * i)) {
                    enabled[varname].current = Number(i)
                }
            }
            render.text([x + 5, y + 30 + 20 * i], [255, 255, 255, 255 / (255 / enabled[varname].anim)], 5, 2, enabled[varname].elements[i])
        }
    }
}

function Config(pos, x, y) {
    var alpha = ui.get_menu_alpha()
    if(alpha < 0.9) return

    render.filled_rect([x, y], [100, 20], [30, 30, 30, 255], 4)
    render.rect([x, y], [100, 20], [55, 55, 55, 155], 3)
    render.text([x + 5, y + 9], [255, 255, 255, 255], 5, 2, "Save config")

    render.filled_rect([x, y + 30], [100, 20], [30, 30, 30, 255], 4)
    render.rect([x, y + 30], [100, 20], [55, 55, 55, 155], 3)
    render.text([x + 5, y + 39], [255, 255, 255, 255], 5, 2, "Load config")

    if(ui.is_mouse_down()) {
        if(Render.CursorBox(pos, x, y, x + 100, y + 20)) {
            for(i in enabled) {
                if(enabled[i].state == undefined) continue
                cache2[i] = {
                    state: Number(enabled[i].state)
                }
            }

            for(i in enabled) {
                if(enabled[i].current == undefined) continue
                cache2[i] = {
                    current: enabled[i].current
                }
            }
        
            for(i in enabled) {
                if(enabled[i].color == undefined) continue
                cache2[i] = {
                    color: enabled[i].color
                }
            }

            utils.to_clipboard(JSON.stringify(cache2))
            cheat.log("Config successfully saved!")
        }

        if(Render.CursorBox(pos, x, y + 30, x + 100, y + 50)) {
            var cache = JSON.parse(utils.from_clipboard())
            for(i in cache) {
                if(cache[i].current == undefined) continue
                enabled[i].current = cache[i].current
            }

            for(i in cache) {
                if(cache[i].color == undefined) continue
                enabled[i].color = cache[i].color
            }

            for(i in cache) {
                if(cache[i].state == undefined) continue
                enabled[i].state = cache[i].state
            }
            cheat.log("Config successfully loaded!")
        }
    }
}

ui.add_slider("Position X", "pos_x", 5, screen[0])
ui.add_slider("Position Y", "pos_y", 5, screen[1])

function menu() {
    var x = vars.get_uint("js.pos_x");
    var y = vars.get_uint("js.pos_y");
    var pos = ui.get_cursor_position();
    var alpha = ui.get_menu_alpha()

    render.filled_rect([x, y], size, [20, 20, 20, 255 * alpha], 6)
    render.line([x, y + 40], [x + size[0], y + 40], [23, 98, 219, 255 * alpha], 2)
    render.text([x + size[0] / 2, y + 20], [255, 255, 255, 255 * alpha], 7, 4, "Mased")

    AddCheckbox(pos, x + 10, y + 65, "Console.log", "log")
    AddCheckbox(pos, x + 10, y + 105, "Rect", "rect")
    AddCheckbox(pos, x + 80, y + 65, "Rect2", "rect2")
    AddCheckbox(pos, x + 80, y + 105, "Rect3 + slider", "rect3")
    AddSlider(pos, x + 10, y + 230, "Slider for rect3", "slider", 30, screen[0])
    AddColorPicker(pos, x + 80, y + 145, "Color3", "RectColor3")
    AddColorPicker(pos, x + 10, y + 185, "Color2", "RectColor2")
    AddColorPicker(pos, x + 10, y + 145, "Color", "RectColor")
    AddCombobox(pos, x + 160, y + 65, "Combobox", "combobox", ["None", "White", "Purple", "Orange", "Pink"])

    Drag(pos, x, y, x + size[0], y + 40, "js.pos")
    Config(pos, x + 370, y + 300)
}

function log() {
    if(enabled["log"].state) {
        cheat.log("Hello, that's Mased")
    }
}

function to_rect() {
    if(enabled["rect"].state) {
        render.filled_rect([100, 100], [100, 100], enabled["RectColor"].color, 0)
    }
}

function to_rect2() {
    if(enabled["rect2"].state) {
        render.filled_rect([300, 300], [100, 100], enabled["RectColor2"].color, 0)
    }
}

function to_rect3() {
    if(enabled["rect3"].state) {
        render.filled_rect([enabled["slider"].current, 300], [50, 50], enabled["RectColor3"].color, 0)
    }
}

function to_combo() {
    switch (enabled["combobox"].current) {
        case 1:
            render.filled_rect([300, 300], [100, 100], [255, 255, 255, 255], 3)
        break;

        case 2:
            render.filled_rect([300, 300], [100, 100], [255, 92, 135, 255], 3)
        break;
    
        case 3:
            render.filled_rect([300, 300], [100, 100], [3, 119, 252, 255], 3)
        break;

        case 4:
            render.filled_rect([300, 300], [100, 100], [252, 92, 255, 255], 3)
        break;
    }
}

register_callback("render", menu)
register_callback("render", log)
register_callback("render", to_rect)
register_callback("render", to_rect2)
register_callback("render", to_rect3)
register_callback("render", to_combo)
