Render.Arc = function (x, y, radius, radius_inner, start_angle, end_angle, segments, color) {
    segments = 360 / segments;
    for (var i = start_angle; i < start_angle + end_angle; i = i + segments) {
        var rad = i * Math.PI / 180; var rad2 = (i + segments) * Math.PI / 180; var rad_cos = Math.cos(rad); var rad_sin = Math.sin(rad); var rad2_cos = Math.cos(rad2); var rad2_sin = Math.sin(rad2);
        var x1_inner = x + rad_cos * radius_inner; var y1_inner = y + rad_sin * radius_inner; var x1_outer = x + rad_cos * radius; var y1_outer = y + rad_sin * radius; var x2_inner = x + rad2_cos * radius_inner; var y2_inner = y + rad2_sin * radius_inner; var x2_outer = x + rad2_cos * radius; var y2_outer = y + rad2_sin * radius;
        Render.Polygon([[ x1_outer, y1_outer ], [ x2_outer, y2_outer ], [ x1_inner, y1_inner ]], color);
        Render.Polygon([[ x1_inner, y1_inner ], [ x2_outer, y2_outer ], [ x2_inner, y2_inner ]], color);
    }
}

var screen = Render.GetScreenSize()

UI.AddColorPicker(['Rage', 'General', 'General'], 'color')
UI.AddSliderInt(['Rage', 'General', 'General'], 'keybinds_x', 0, 5000)
UI.AddSliderInt(['Rage', 'General', 'General'], 'keybinds_y', 0, 5000)
UI.AddSliderInt(['Rage', 'General', 'General'], 'spectators_x', 0, 5000)
UI.AddSliderInt(['Rage', 'General', 'General'], 'spectators_y', 0, 5000)

var bind = [
    [["Rage", "Exploits", "Keys", "Key assignment", "Double tap"], "Double tap"],
    [["Rage", "Exploits", "Keys", "Key assignment", "Hide shots"], "On-shot assist"],
    [["Rage", "General", "Key assignment", "Force body aim"], "Force body aim"],
    [["Rage", "General", "Key assignment", "Force safe point"], "Force safe point"],
    [["Rage", "General", "Key assignment", "Damage override"], "Damage override"],
    [["Rage", "General", "Key assignment", "Hitbox override"], "Hitbox override"],
    [["Rage", "Anti Aim", "General", "Key assignment", "Left direction"], "Manual Left"],
    [["Rage", "Anti Aim", "General", "Key assignment", "Back direction"], "Manual back"],
    [["Rage", "Anti Aim", "General", "Key assignment", "Right direction"], "Manual right"],
    [["Rage", "Anti Aim", "General", "Key assignment", "Mouse direction"], "Mouse direction"],
    [["Rage", "Anti Aim", "General", "Key assignment", "AA direction inverter"], "AA inverter"],
    [["Rage", "Anti Aim", "General", "Key assignment", "Slow walk"], "Slow motion"],
    [["Rage", "Anti Aim", "General", "Key assignment", "Fake duck"], "Duck peek assist"],
    [["Misc.", "Keys", "Keys", "Key assignment", "Edge jump"], "Edge jump"],
    [["Misc.", "Keys", "Keys", "Key assignment", "Auto peek"], "Quick peek assist"],
    [["Misc.", "Keys", "Keys", "Key assignment", "Thirdperson"], "Third person"]
]
//масед спасибо за то что хуйню эту писал //@Mased незачто :D
Render.FilledRectRounded = function(x, y, w, h, color, round_offset) {
    var seg = 12
    var round = Math.min(round_offset, h / 2 )
    Render.FilledRect(x + round, y, w - round * 2, h, color)
    Render.FilledRect(x, y + round, round, h - round * 2, color)
    Render.FilledRect(x + w - round, y + round, round, h - round * 2, color)
    Render.Arc(x + round - 0.5, y + round - 0.5, round, 0, 180, 90, seg, color)
    Render.Arc(x + w - round - 0.5, y + round - 0.5, round, 0, 270, 90, seg, color)
    Render.Arc(x + round - 0.5, y + h - 0.5 - round, round, 0, 90, 90, seg, color)
    Render.Arc(x + w - round - 0.5, y + h - 0.5 - round, round, 0, 0, 90, seg, color)
}

Render.RectRounded = function(x, y, w, h, color, round_offset) {
    var seg = 12
    var round = Math.min(round_offset, h / 2 )
    Render.Arc(x + round - 0.5, y + round - 0.5, round, round - 1, 180, 90, seg, color)
    Render.Arc(x + w - round - 0.5, y + round - 0.5, round, round - 1, 270, 90, seg, color)
    Render.Arc(x + round - 0.5, y + h - 0.5 - round, round, round - 1, 90, 90, seg, color)
    Render.Arc(x + w - round - 0.5, y + h - 0.5 - round, round, round - 1, 0, 90, seg, color)
    Render.FilledRect(x, y + round, 1, h - round * 2, color)
    Render.FilledRect(x + w, y + round, 1, h - round * 2, color)
    Render.FilledRect(x + round, y, w - round * 2, 1, color)
    Render.FilledRect(x + round, y + h, w - round * 2, 1, color)
}

Render.Шапка_Ушанка_Хуй_сосите_короче = function(x, y, w, h, color, round_offset) {
    var seg = 12
    var round = Math.min(round_offset, h / 2 )
    Render.Arc(x + round - 0.5, y + round - 0.5, round, round - 1, 180, 90, seg, color)
    Render.Arc(x + w - round - 0.5, y + round - 0.5, round, round - 1, 270, 90, seg, color)
    Render.FilledRect(x + round, y, w - round * 2, 1, color)
}

Render.Text = function(x, y, center, string, color, font) {
    x = center == 1 ? x - Render.TextSize(string, font)[0]/2 : x
    y = center == 1 ? y - Render.TextSize(string, font)[1]/2 : y
    Render.String(x + 1, y + 1, 0, string, [0, 0, 0, color[3]], font)
    Render.String(x, y, 0, string, color, font)
}

Render.OverrideAlpha = function(color, float) {
    return [color[0], color[1], color[2], Math.round(float * 255)]
}

Render.Box = function(x, y, w, h, w_alpha, text) {
    var font = Render.GetFont('Verdana.ttf', 10, true)
    var alpha = UI.GetColor(['Rage', 'General', 'General', 'color'])[3] / 255
    var color = UI.GetColor(['Rage', 'General', 'General', 'color'])

    Render.FilledRectRounded(x, y, w, h, Render.OverrideAlpha([0, 0, 0, 0], alpha * w_alpha), 5)
    Render.RectRounded(x, y, w, h, Render.OverrideAlpha(color, w_alpha * 0.2), 5)
    Render.Шапка_Ушанка_Хуй_сосите_короче(x, y, w, h, Render.OverrideAlpha(color, w_alpha), 5)
    Render.GradientRect(x, y + 5, 1, h - 8, 0, Render.OverrideAlpha(color, w_alpha), Render.OverrideAlpha(color, 0))
    Render.GradientRect(x + w - 1, y + 5, 1, h - 8, 0, Render.OverrideAlpha(color, w_alpha), Render.OverrideAlpha(color, 0))
    Render.Text(x + w / 2, y + h / 2 - 2, 1, text, Render.OverrideAlpha([255, 255, 255, 255], w_alpha), font)
}

var binds = []
var width = {}
var drag = {}
var current_dragging_item = undefined

function is_in_bounds(mouse, vec_start, vec_end) {
    return mouse[0] > vec_start[0] && mouse[0] < vec_end[0] && mouse[1] > vec_start[1] && mouse[1] < vec_end[1]
}

function lerp(time, a, b) {
    return a * (1 - time) + b * time
}
function drag_handle(x, y, w, h, item) {
    if (!drag[item]) {
        drag[item] = {}
        drag[item].drag_position = [0, 0]
        drag[item].is_dragging = false
    }

    if (is_in_bounds(Input.GetCursorPosition(), [x, y], [x + w, y + h])) {
        if (Input.IsKeyPressed(0x01) && drag[item].is_dragging == false && (current_dragging_item == undefined || current_dragging_item == item)) {
            drag[item].is_dragging = true
            current_dragging_item = item
            drag[item].drag_position = [x - Input.GetCursorPosition()[0], y - Input.GetCursorPosition()[1]]
        }
    }
    
    if (!Input.IsKeyPressed(0x01)) {
        drag[item].is_dragging = false
        current_dragging_item = undefined
    }

    if (drag[item].is_dragging == true && UI.IsMenuOpen()) {
        UI.SetValue(['Rage', 'General', 'General', item + '_x'], Input.GetCursorPosition()[0] + drag[item].drag_position[0])
        UI.SetValue(['Rage', 'General', 'General', item + '_y'], Input.GetCursorPosition()[1] + drag[item].drag_position[1])
    }
}

function GetBinds() {
    var time = Globals.Frametime() * 12
    var active_binds = []

    for (i = 0; i < bind.length; i++) {
        var bind_path = bind[i][0]
        var bind_name = bind[i][1]

        if (!binds[bind_name]) {
            binds[bind_name] = {}
            binds[bind_name].active = 0
        }

        var bind_value = UI.GetValue(bind_path)
        var mode = UI.GetHotkeyState(bind_path).toLowerCase()

        binds[bind_name].active = lerp(time, binds[bind_name].active, bind_value ? 1 : 0)

        if (binds[bind_name].active > 0.09 || bind_value) {
            active_binds[active_binds.length] = {
                name : bind_name,
                is_active : bind_value,
                mode : mode,
                alpha : binds[bind_name].active,
            }
        }
    }

    return active_binds
}

width['keybinds'] = {}
width['keybinds'].default = 120
var keybinds_alpha = 0
function fff () {
    var x = UI.GetValue(['Rage', 'General', 'General', 'keybinds_x'])
    var y = UI.GetValue(['Rage', 'General', 'General', 'keybinds_y'])
    var keybinds = GetBinds()
    var y_add = 0
    var time = Globals.Frametime() * 12
    var active_binds = 0
    var font = Render.GetFont('Verdana.ttf', 10, true)

    width['keybinds'].cache = 120

    for (i = 0; i < keybinds.length; i++ ) {
        var current_bind = keybinds[i]
        var keybinds_alpha = current_bind.alpha
        var mode = '[' + current_bind.mode + ']'

        var bind_size = {
            name : Render.TextSize(current_bind.name, font),
            mode : Render.TextSize(mode, font)
        }

        if (bind_size.name[0] + bind_size.mode[0] + 15 > width['keybinds'].cache) {
            width['keybinds'].cache = bind_size.name[0] + bind_size.mode[0] + 15
        }

        Render.String(x + 6, y + 24 + y_add, 0, current_bind.name, Render.OverrideAlpha([0, 0, 0, 0], keybinds_alpha), font)
        Render.String(x + 5, y + 23 + y_add, 0, current_bind.name, Render.OverrideAlpha([255, 255, 255, 255], keybinds_alpha), font)

        Render.String(x - 4 + width['keybinds'].default - bind_size.mode[0], y + 24 + y_add, 0, mode, Render.OverrideAlpha([0, 0, 0, 0], keybinds_alpha), font)
        Render.String(x - 5 + width['keybinds'].default - bind_size.mode[0], y + 23 + y_add, 0, mode, Render.OverrideAlpha([255, 255, 255, 255], keybinds_alpha), font)

        if (current_bind.is_active) {
            active_binds = active_binds + 1
        }
        y_add = y_add + 15 * keybinds_alpha
    }
   
    width['keybinds'].default = lerp(time, width['keybinds'].default, width['keybinds'].cache)

    Render.Box(x, y, width['keybinds'].default, 20, 1, 'keybinds')
    drag_handle(x, y, width['keybinds'].default, 20, 'keybinds')
}

function get_spectators() {
    var specs = [];
    const players = Entity.GetPlayers();
    for (i = 0; i < players.length; i++) {
        const cur = players[i];
        if (Entity.GetProp(cur, "CBasePlayer", "m_hObserverTarget") != "m_hObserverTarget") {
            const obs = Entity.GetProp(cur, "CBasePlayer", "m_hObserverTarget")
            if (obs === Entity.GetLocalPlayer()) {
                const name = Entity.GetName(cur);
                specs.push(name);
            }
        }
    }

    return specs;
}

Cheat.RegisterCallback('Draw', 'fff')

width['spectators'] = {}
width['spectators'].default = 120
var spectators_alpha = 0
function fff2() {
    var x = UI.GetValue(['Rage', 'General', 'General', 'spectators_x'])
    var y = UI.GetValue(['Rage', 'General', 'General', 'spectators_y'])
    var spectators = get_spectators()
    var y_add = 0
    var time = Globals.Frametime() * 12
    var font = Render.GetFont('Verdana.ttf', 10, true); font2 = Render.GetFont("Verdana.ttf", 9, true)

    for (i = 0; i < spectators.length; i++ ) {
        Render.FilledRect(x + 5, y + 23 + (14 * i), 12, 12, [20, 20, 20, 255]);
        Render.String(x + 10, y + 23 + (14 * i), 1, "?", [255, 255, 255, 255 / 1.3], font2);
        Render.String(x + 23, y + 23 + (14 * i), 0, spectators[i], [0, 0, 0, 255], font)
        Render.String(x + 22, y + 22 + (14 * i), 0, spectators[i], [255, 255, 255, 255], font)
    }

    Render.Box(x, y, 100, 20, 1, 'spectators')
    drag_handle(x, y, width['spectators'].default, 20, 'spectators')
}

Cheat.RegisterCallback('Draw', 'fff2')

var text = ""
function fff3() {
    var font = Render.GetFont('Verdana.ttf', 10, true);
    var x = screen[0] - 10 - (Render.TextSize(text, font)[0] + 10);
    var y = 10;
    var cheat = "Chimera [user] | "
    var name = Cheat.GetUsername() + " | "
    var time = new Date().toTimeString().substring(0, 5)
    text = cheat + name + time

    Render.Box(x, y, Render.TextSize(text, font)[0] + 10, 20, 1, '')
    Render.String(x + 6, y + 4, 0, text, [0, 0, 0, 255], font)
    Render.String(x + 5, y + 3, 0, text, [255, 255, 255, 255], font)
}

Cheat.RegisterCallback('Draw', 'fff3')

var textHZ = ""
var hz = 60

function fff4() {
    var font = Render.GetFont('Verdana.ttf', 10, true);
    var x = screen[0] - 10 - (Render.TextSize(textHZ, font)[0] + 10);
    var y = 35;
    var ms = Math.abs((Globals.Frametime() * 1000))
    textHZ = ms.toFixed(2) + "ms / " + hz + "hz"

    Render.Box(x, y, Render.TextSize(textHZ, font)[0] + 10, 20, 1, '')
    Render.String(x + 6, y + 4, 0, textHZ, [0, 0, 0, 255], font)
    Render.String(x + 5, y + 3, 0, textHZ, [255, 255, 255, 255], font)
}

Cheat.RegisterCallback('Draw', 'fff4')
var fps_info = [];
var last_timee = Global.Curtime();

function fff5() {
    var font = Render.GetFont('Verdana.ttf', 10, true);
    var x = screen[0] - 15 - (Render.TextSize(textHZ, font)[0] * 2);
    var y = 35;
    var fps = 0
    var col = UI.GetColor(['Rage', 'General', 'General', 'color'])

	if (Global.Curtime() - last_timee > 0.5) {
		last_timee = Global.Curtime();
		fps_info.unshift(1 / Global.Frametime());
	}

	if (fps_info.length > 4)
		fps_info.pop();
	var fps_max = Convar.GetInt("fps_max") + 20 || 400 + 20;

	for (i = 0; i < fps_info.length; i++) {
        fps += fps_info[i]
        Render.GradientRect(x + Render.TextSize("IO | ", font)[0] + 25 - i * 5, y + 20 - fps_info[i] / fps_max * 15, 5, fps_info[i] / fps_max * 15, 0, [col[0], col[1], col[2], 0], col);
    }

    Render.String(x + 6, y + 4, 0, "IO | ", [0, 0, 0, 255], font)
    Render.String(x + 5, y + 3, 0, "IO | ", [255, 255, 255, 255], font)
}

Cheat.RegisterCallback('Draw', 'fff5')
