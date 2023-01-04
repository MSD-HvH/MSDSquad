/*

	name: Holo hud
    author: Klient#1690

*/

var lerp = function(a, b, percentage) {return a + (b - a) * percentage;}
var get_desync = function() {var RealYaw = Local.GetRealYaw();var FakeYaw = Local.GetFakeYaw();var delta = Math.min(Math.abs(RealYaw - FakeYaw) / 2, 58).toFixed(1);return delta;}
var outline_string = function(x, y, alignid, text, color, font) {Render.String(x - 1, y - 1, alignid, text, [0, 0, 0, color[3]], font);Render.String(x - 1, y, alignid, text, [0, 0, 0, color[3]], font);Render.String(x - 1, y + 1, alignid, text, [0, 0, 0, color[3]], font);Render.String(x, y + 1, alignid, text, [0, 0, 0, color[3]], font);Render.String(x, y - 1, alignid, text, [0, 0, 0, color[3]], font);Render.String(x + 1, y - 1, alignid, text, [0, 0, 0, color[3]], font);Render.String(x + 1, y, alignid, text, [0, 0, 0, color[3]], font);Render.String(x + 1, y + 1, alignid, text, [0, 0, 0, color[3]], font);Render.String(x, y, alignid, text, color, font);}
var normalize_yaw = function(yaw) {while (yaw > 180) { yaw = yaw - 360 };while (yaw < -180) { yaw = yaw + 360 };return yaw;}
var calc_angle = function(local_x, local_y, enemy_x, enemy_y) {var ydelta = local_y - enemy_y;var xdelta = local_x - enemy_x; var relativeyaw = Math.atan(ydelta / xdelta);relativeyaw = normalize_yaw(relativeyaw * 180 / Math.PI);if (xdelta >= 0) {relativeyaw = normalize_yaw(relativeyaw + 180);} return relativeyaw;}
var circle_outline = function(x, y, color, radius, start_angle, percent, thickness) {var precision = (2 * Math.PI) / 30;var step = Math.PI / 180;var inner = radius - thickness;var end_angle = (start_angle + percent) * step;var start_angle = (start_angle * Math.PI) / 180;for (; radius > inner; --radius) {for (var angle = start_angle; angle < end_angle; angle += precision) {var cx = Math.round(x + radius * Math.cos(angle));var cy = Math.round(y + radius * Math.sin(angle));var cx2 = Math.round(x + radius * Math.cos(angle + precision));var cy2 = Math.round(y + radius * Math.sin(angle + precision));Render.Line(cx, cy, cx2, cy2, color);};};}
var normalize_angle = function(angle) {while (angle > 180) { angle = angle - 360 };while (angle < -180) { angle = angle + 360 };return angle;}
var input_mouse_on_object = function(x, y, length, height) {var cursor = Input.GetCursorPosition();if (cursor[0] > x && cursor[0] < x + length && cursor[1] > y && cursor[1] < y + height) {return true;}return false;}

var menu_path = ["Visuals", "Holo hud", "Holo hud"]
UI.AddSubTab(["Visuals", "SUBTAB_MGR"], "Holo hud")

var active = UI.AddCheckbox(menu_path, "Enable Anti-aim box")
var color_picker = UI.AddColorPicker(menu_path, "Anti-aim box color picker"); UI.SetColor(color_picker, [142, 165, 229, 55])
var add_x = UI.AddSliderInt(menu_path, "Anti-aim box add x", -1000, 1000)
var add_y = UI.AddSliderInt(menu_path, "Anti-aim box add y", -1000, 1000)

var ms_classes = {
	"hud": {
		"dragging": new Array(0, 0, 0),
		"table": {
			"alpha": 0,
			"x": 0, "y": 0,
			"height": 0,
			"sp_1": 0, "sp_2": 0,
		},

		g_paint_handler: function() {
            if (Entity.GetLocalPlayer() == null || !Entity.IsAlive(Entity.GetLocalPlayer())) return
            if (!UI.GetValue(active)) return
            	
			var verdana = Render.GetFont("Verdana.ttf", 10, true); var small = Render.GetFont("smallest_pixel-7.ttf", 9, true); var cn = 1
			var body_yaw = {"default": Math.abs(Math.max(-60, Math.min(60, Math.round(get_desync()))))}

			var p = Entity.GetHitboxPosition(Entity.GetLocalPlayer(), 2); var h = Entity.GetHitboxPosition(Entity.GetLocalPlayer(), 0)
            var yaw = normalize_yaw(calc_angle(p[0], p[1], h[0], h[1]) - Local.GetViewAngles()[1] + 120); var bodyyaw = Local.GetRealYaw() - Local.GetFakeYaw()
            var fakeangle = normalize_yaw(yaw + bodyyaw)

            var checkonshot = UI.GetValue(["Rage", "Exploits", "Keys", "Key assignment", "Hide shots"]); var checkdt = UI.GetValue(["Rage", "Exploits", "Keys", "Key assignment", "Double tap"])
            var onshot_color = (function(){
            	if (checkonshot) { return [124, 195, 13] }
            	return [255, 60, 80]
            })()

            var color_desync = [170 + (154 - 186) * body_yaw.default / 60, 0 + (255 - 0) * body_yaw.default / 60, 16 + (0 - 16) * body_yaw.default / 60, 255]
            var rs = color_desync[0]; var gs = color_desync[1]; var bs = color_desync[2]

			var w2s_pos = Render.GetScreenSize()
			if (UI.GetValue(["Misc.", "Keys", "Keys", "Key assignment", "Thirdperson"])) {
				w2s_pos = Render.WorldToScreen(Entity.GetHitboxPosition(Entity.GetLocalPlayer(), 3))
				this.table.x = lerp(this.table.x, w2s_pos[0] + 100 + UI.GetValue(add_x), Globals.Frametime() * 8); this.table.y = lerp(this.table.y, w2s_pos[1] - 150 + UI.GetValue(add_y), Globals.Frametime() * 8)
				this.table.alpha = lerp(this.table.alpha, 1, Globals.Frametime() * 8)
			} else { this.table.alpha = lerp(this.table.alpha, 0, Globals.Frametime() * 12) }
			if (UI.GetValue(["Rage", "Exploits", "Keys", "Key assignment", "Double tap"])) {
				this.table.height = lerp(this.table.height, 70, Globals.Frametime() * 12)
			} else { this.table.height = lerp(this.table.height, 60, Globals.Frametime() * 12) }

			var r = UI.GetColor(color_picker)[0]; var g = UI.GetColor(color_picker)[1]; var b = UI.GetColor(color_picker)[2]; var a = this.table.alpha
			var x = this.table.x; var y = this.table.y

			var w = 150; var h = this.table.height
            var body = Render.WorldToScreen(Entity.GetHitboxPosition(Entity.GetLocalPlayer(), 6))

            Render.Line(body[0], body[1], x, y, [255, 255, 255, a*125])

			Render.FilledRect(x, y, w, h, [17, 17, 17, a*55])
			Render.FilledRect(x, y, w, 2, [r, g, b, a*255])

			outline_string(x + 7, y + 7 + 1 * cn, 0, "ANTI-AIMBOTDEBUG", [255, 255, 255, a*255], small); cn=cn+1

            circle_outline(x + 133, y + 9 * cn, [20, 20, 20, a*125], 10, 0, 360, 2.5)
            circle_outline(x + 133, y + 9 * cn, [150, 150, 150, a*220], 10, (yaw * -1) - 15, 36, 2.5)
            circle_outline(x + 133, y + 9 * cn, [r, g, b, a*255], 10, (fakeangle * -1) - 15, 36, 2.5); 

			Render.GradientRect(x + 5, y + 11 * cn, 2, 9, 0, [0, 0, 0, a*0], [rs, gs, bs, a*255])
			Render.GradientRect(x + 5, y + 14 * cn + 3, 2, 9, 0, [rs, gs, bs, a*255], [0, 0, 0, a*0]); cn=cn+1
			Render.String(x + 10, y + 8 * cn, 0, "FAKE (" + get_desync() + ")", [255, 255, 255, a*255], verdana); cn=cn+1

			outline_string(x + 9, y + 11 * cn - 1, 0, "SP:", [255, 255, 255, a*255], small)
			Render.FilledRect(x + 25, y + 11 * cn, 21, 6, [0, 0, 0, a*150])
			Render.FilledRect(x + 50, y + 11 * cn, 21, 6, [0, 0, 0, a*150])
			this.table.sp_1 = lerp(this.table.sp_1, (body_yaw.default / 3) % 19, Globals.Frametime() * 8); this.table.sp_2 = lerp(this.table.sp_2, body_yaw.default % 19, Globals.Frametime() * 8)
			Render.FilledRect(x + 25, y + 11 * cn, this.table.sp_1, 6, [r, g, b, a*255])
			Render.FilledRect(x + 50, y + 11 * cn, this.table.sp_2, 6, [r, g, b, a*255]); cn=cn+1

			var realtime = Globals.Realtime() / 2
			var alpha = Math.floor(Math.sin(realtime * 4) * (200 / 2) + 200 / 2)
			if (checkdt) { outline_string(x + 9, y + 11 * cn + 1, 0, "SHIFTING TICKBASE", [255, 255, 255, a*alpha], small) }
			outline_string(x + 115, y + (checkdt ? 8.1 : 7.5) * cn + this.table.height - 55, 0, "OS:", [255, 255, 255, a*255], small)
			outline_string(x + 116 + Render.TextSize("OS:", small)[0], y + (checkdt ? 8.1 : 7.5) * cn + this.table.height - 55, 0, checkonshot ? "ON" : "OFF", [onshot_color[0], onshot_color[1], onshot_color[2], a*255], small)
		
            var cursor = Input.GetCursorPosition();
            if(input_mouse_on_object(x, y, w, h) && UI.IsMenuOpen()){
            	Render.Rect(x - 10, y - 10, w + 20, h + 20, [255, 255, 255, a*150])
                if ((Input.IsKeyPressed(0x01)) && (this.dragging[0] == 0)) {
                    this.dragging[0] = 1;
                    this.dragging[1] = UI.GetValue(add_x) - cursor[0];
                    this.dragging[2] = UI.GetValue(add_y) - cursor[1];
                }
            }
            if (!Input.IsKeyPressed(0x01)) this.dragging[0] = 0;
            if (this.dragging[0] == 1 && UI.IsMenuOpen()) {
                var q = Math.max(-1000, Math.min(1000 - w, cursor[0] + this.dragging[1]));
                var r = Math.max(-1000, Math.min(1000 - h, cursor[1] + this.dragging[2]));
                UI.SetValue(add_x, q)
                UI.SetValue(add_y, r)
            }
		}
	}
}

var callbacks = {
    g_paint_handler: function() {
        ms_classes.hud.g_paint_handler()
    }
}
Cheat.RegisterCallback("Draw", "callbacks.g_paint_handler")
