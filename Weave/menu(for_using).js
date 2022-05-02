// Made by Mased & ScorpySter - thx for helping
var screen = render.get_screen_size();
var anim = 0;
var drg = 0
var enabled = {
	"menu_water": { state: false, anim: 0 }, 
    "info_box": { state: false, anim: 0 }, 
	"line": { state: false, anim: 0 }, 
	"info_x": { current: 5, anim: 0 },
	"info_y": { current: 5, anim: 0 },
	"height": { current: 3, anim: 0 },
    "info_color": { color: [255, 255, 255, 255], cached: [0, 0, 0, 255], anim: 0, enabled: false },
}
var cache = [0, 0]
var size = [480, 360];
var Render = {
    Lerp: function(a, b, percentage) { return a + (b - a) * percentage; },
    CursorBox: function(mouse_pos, x, y, x2, y2) { return (mouse_pos[0] > x) && (mouse_pos[1] > y) && (mouse_pos[0] < x2) && (mouse_pos[1] < y2) }
}

function HSVtoRGB(h,s,v){
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return [
        Math.round(r * 255),
        Math.round(g * 255),
        Math.round(b * 255),
        255
    ]
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
    render.filled_rect([x, y], [40, 15], [30, 30, 30, 155], 3)
    render.filled_circle([x + 8 + (8 * enabled[varname].anim), y + 7], 6, enabled[varname].state ? [77, 255, 79, 155] : [255, 255, 255, 155], 10)
}

function AddColorPicker(pos, x, y, name, varname) {
    var alpha = ui.get_menu_alpha()
    if(alpha < 0.9) return
    render.filled_rect([x, y], [20, 20], enabled[varname].color, 3)
    render.text([x, y - 10], [255, 255, 255, 255 * alpha], 5, 2, name)
    enabled[varname].anim = Render.Lerp(enabled[varname].anim, enabled[varname].enabled ? 3 : 0, 8 * global_vars.frametime())
    if(ui.is_mouse_down()) {
        if(Render.CursorBox(pos, x, y, x + 20, y + 20)) {
            enabled[varname].enabled = true
        }
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
        
        if(ui.is_mouse_down()) {
            if(Render.CursorBox(pos, x + 200, y - 40, x + 220, y - 20)) {
                enabled[varname].enabled = false
            }
        }
    }
}

function AddSlider(pos, x, y, name, varname, min, max) {
    var alpha = ui.get_menu_alpha()
    var numb = 200
    if(alpha < 0.9) return

    enabled[varname].anim = Render.Lerp(enabled[varname].anim, 3, 8 * global_vars.frametime())

    render.filled_rect([x, y], [140, 10], [30, 30, 30, 255], 3)
    render.filled_circle([(x + (enabled[varname].current - min) / (max - min) * 140), y + 5], 8, [255, 255, 255, 155], 10)
    render.text([x, y - 10], [255, 255, 255, 255], 5, 2, name)
    render.text([x + 130, y - 10], [255, 255, 255, 255], 7, 2, (enabled[varname].current).toString()) 

    if (Render.CursorBox(pos, x - 1, y - 4, x + 140.5, y + 10) && ui.is_mouse_down()){
        var cursor = pos
        var slider_x = Math.floor((max - min) * ((cursor[0] - x + 140 / ((max - min) / min)) / 140)); 
        current_slider = slider_x 
        enabled[varname].current = current_slider
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

    AddCheckbox(pos, x + 10, y + 65, "InfoBox", "info_box")
	AddCheckbox(pos, x + 165, y + 65, "Menu Watermark", "menu_water")
	AddCheckbox(pos, x + 305, y + 65, "Line", "line")
	AddSlider(pos, x + 15, y + 105, "InfoBox | X", "info_x", 5, screen[0])
	AddSlider(pos, x + 15, y + 145, "InfoBox | Y", "info_y", 5, screen[1])
	AddSlider(pos, x + 315, y + 105, "Height", "height", 3, 10)
	AddColorPicker(pos, x + 135, y + 60, "", "info_color")

    Drag(pos, x, y, x + size[0], y + 40, "js.pos")
}

var a = 0
function info_box() {
    if(enabled["info_box"].state) {
		a = Render.Lerp(a, 1, global_vars.frametime() * 8)
		var alpha = Math.floor(Math.sin(global_vars.realtime() * 3) * (200 / 2) + 200 / 2)
		var x = enabled["info_x"].current, y = enabled["info_y"].current
		var desync = cheat.get_desync_amount().toFixed(1)
		var info = entity.get_player_info(entity.get_local_player())
		var user = (info == undefined ? "User" : (info["name"].length > 15 ? info["name"].slice(0, info["name"].length - 12) + "..." : info["name"] + ""))
		var check = (vars.is_bind_active("doubletap") ? " | DT" : (vars.is_bind_active("hide_shots") ? " | OS" : ""))
		var color = [enabled["info_color"].color[0], enabled["info_color"].color[1], enabled["info_color"].color[2], a * alpha]
	
		render.filled_rect([x, y], [180, 50], [20, 20, 20, 95], 5)
		render.rect([x, y], [180, 50], color, 4)
		render.text([x + 8, y + 10], [255, 255, 255, 255], 12, 2, ">> $ MSD Company $")
		render.text([x + 8, y + 24], [255, 255, 255, 255], 12, 2, ">> Welcome, " + user)
		render.text([x + 8, y + 38], [255, 255, 255, 255], 12, 2, ">> Build: Beta | " + desync + check)
    }
}

var x = 0, y = 0, x_min = 0, y_min = 0
function menu_watermark() {
	if(enabled["menu_water"].state) {
		var time = new Date().toTimeString().substring(0, 5);
		var a = ui.get_menu_alpha()
		var pos = ui.get_menu_position()
		var size2 = ui.get_menu_size()
	
		x = Render.Lerp(x, pos[0] + 100, global_vars.frametime() * 6); 
		y = Render.Lerp(y, pos[1] + 150, global_vars.frametime() * 6)
	
		if (a > 0) {
			render.filled_rect([x - 80, y - 220], [size2[0], 40], [16,16,16, 255 * a], 5)
			render.rect([x - 80, y - 220], [size2[0], 40], [23, 98, 219, 255 * a], 4)
			render.text([x - 60, y - 200], [255, 255, 255, 255 * a], 12, 3, "Welcome back, Mased")
			render.text([x + size2[0] - 140, y - 200], [255, 255, 255, 255 * a], 12, 3, time)
	
			render.line([x - 80, y - 185], [pos[0], pos[1]], [255, 255, 255, 100 * a], 0.5)
			render.line([x + size2[0] - 80, y - 185], [pos[0] + size2[0], pos[1]], [255, 255, 255, 100 * a], 0.5)
		}

		if (a > 0) {
			x_min = Render.Lerp(x_min, vars.get_uint("js.pos_x"), global_vars.frametime() * 6); 
			y_min = Render.Lerp(y_min, vars.get_uint("js.pos_y"), global_vars.frametime() * 6); 
			var pos_min = [vars.get_uint("js.pos_x"), vars.get_uint("js.pos_y")]

			render.filled_rect([x_min, y_min - 60], [size[0], 40], [16,16,16, 255 * a], 5)
			render.rect([x_min, y_min - 60], [size[0], 40], [23, 98, 219, 255 * a], 4)
			render.text([x_min + 10, y_min - 40], [255, 255, 255, 255 * a], 12, 3, "Welcome back, Mased")
			render.text([x_min + size[0] - 60, y_min - 40], [255, 255, 255, 255 * a], 12, 3, "Nano")
	
			render.line([x_min, y_min - 27], [pos_min[0], pos_min[1] + 5], [255, 255, 255, 100 * a], 0.5)
			render.line([x_min + size[0], y_min - 27], [pos_min[0] + size[0], pos_min[1] + 5], [255, 255, 255, 100 * a], 0.5)
		}
	}
}

function skeet_line() {
	if(enabled["line"].state) {
		var c = HSVtoRGB(global_vars.realtime() * 0.4, 1, 1);
		var height = enabled["height"].current
		var ScreenSize = render.get_screen_size()
	
		render.filled_rect_gradient([0, 0], [ScreenSize[0] / 2, height], [c[2], c[1], c[0], 255], [c[0], c[1], c[2], 255], [c[0], c[1], c[2], 255], [c[2], c[1], c[0], 255])
		render.filled_rect_gradient([ScreenSize[0] / 2, 0], [ScreenSize[0], height], [c[0], c[1], c[2], 255], [c[1], c[0], c[2], 255], [c[1], c[0], c[2], 255], [c[0], c[1], c[2], 255])
	}
}

register_callback("render", menu)
register_callback("render", info_box)
register_callback("render", menu_watermark)
register_callback("render", skeet_line)
