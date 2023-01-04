/*
	name: Holo hud from onetap v3
    author: Klient#1690

    name2: holohud for weave
    author2: Mased
*/

var lerp = function(a, b, percentage) {
    return a + (b - a) * percentage;
}

var realYaw = (60 - cheat.get_desync_amount()) / 2;
var fakeYaw = (60 + cheat.get_desync_amount()) / 2;

var normalize_yaw = function(yaw) {
    while (yaw > 180) { 
        yaw = yaw - 360 
    };
    while (yaw < -180) { 
        yaw = yaw + 360 
    };
    return yaw;
}

var calc_angle = function(local_x, local_y, enemy_x, enemy_y) {
    var ydelta = local_y - enemy_y;
    var xdelta = local_x - enemy_x; 
    var relativeyaw = Math.atan(ydelta / xdelta);
    relativeyaw = normalize_yaw(relativeyaw * 180 / Math.PI);
    if (xdelta >= 0) {
        relativeyaw = normalize_yaw(relativeyaw + 180);
    } 
    return relativeyaw;
}

var normalize_angle = function(angle) {
    while (angle > 180) { 
        angle = angle - 360 
    };
    while (angle < -180) { 
        angle = angle + 360 
    };
    return angle;
}

ui.add_checkbox("Enable Anti-aim box", "holohud")
ui.add_slider("Anti-aim box add x", "add_x", 0, 1000)
ui.add_slider("Anti-aim box add y", "add_y", 0, 1000)

var ms_classes = {
	"hud": {
		"table": {
			"alpha": 0,
			"x": 0, "y": 0,
			"height": 0,
			"sp_1": 0, "sp_2": 0,
		},

		g_paint_handler: function() {
            //if (entity.get_local_player() == null) return
            if (!vars.get_uint("js.holohud")) return
            var cn = 1
            var body_yaw = Math.abs(Math.max(-60, Math.min(60, Math.round(cheat.get_desync_amount()))))
 
			var p = entity.get_origin(entity.get_local_player()); 
            var h = entity.get_origin(entity.get_local_player())
            var yaw = normalize_yaw(calc_angle(p[0], p[1], h[0], h[1]) - user_cmd.get_view_angles()[1] + 120); 
            var bodyyaw = realYaw - fakeYaw
            var fakeangle = normalize_yaw(yaw + bodyyaw)

            var checkonshot = vars.is_bind_active("hide_shots"); 
            var checkdt = vars.is_bind_active("doubletap")
            var onshot_color = (function(){
            	if (checkonshot) { return [124, 195, 13] }
            	return [255, 60, 80]
            })()

            var color_desync = [170 + (154 - 186) * body_yaw / 60, 0 + (255 - 0) * body_yaw / 60, 16 + (0 - 16) * body_yaw / 60, 255]
            var rs = color_desync[0]; 
            var gs = color_desync[1]; 
            var bs = color_desync[2]

			var w2s_pos = render.get_screen_size()
			if (vars.is_bind_active("thirdperson")) {
				w2s_pos = render.world_to_screen(entity.get_origin(entity.get_local_player()))
				this.table.x = lerp(this.table.x, w2s_pos[0] + 100 + vars.get_uint("js.add_x"), global_vars.frametime() * 8); this.table.y = lerp(this.table.y, w2s_pos[1] - 150 + vars.get_uint("js.add_y"), global_vars.frametime() * 8)
				this.table.alpha = lerp(this.table.alpha, 1, global_vars.frametime() * 8)
			} else { this.table.alpha = lerp(this.table.alpha, 0, global_vars.frametime() * 12) }
			if (vars.is_bind_active("doubletap")) {
				this.table.height = lerp(this.table.height, 70, global_vars.frametime() * 12)
			} else { this.table.height = lerp(this.table.height, 60, global_vars.frametime() * 12) }

			var r = 92; var g = 154; var b = 255; var a = this.table.alpha
			var x = this.table.x; var y = this.table.y

			var w = 150; var h = this.table.height

			render.filled_rect([x, y], [w, h], [17, 17, 17, a*55], 0)
			render.filled_rect([x, y], [w, 2], [r, g, b, a*255], 0) 
            // /\ @Mased - вот эта хуйня отвечает за полоску сверху, 
            // для смены цвета - поменяйте значения r, g, b
            // Колорпикер к сожалению не завезли

            //render.line([w2s_pos[0] + 10, w2s_pos[1] - 200], [x, y], [255, 255, 255, 255], 1) 
            //@Mased - рендерит линию от вас до холо худа, 
            //мне лень её делать для разных разрешений. 
            //И ещё нету получения хитбокса лока плеера.

			render.text([x + 4, y + 8 + 1 * cn], [255, 255, 255, a*255], 5, 2, "ANTI-AIMBOTDEBUG"); cn=cn+1

            render.arc([x + 130, y + 14 * cn], 10, 0, 360, 200, [20, 20, 20, a*125], true, 1) 
            // @Mased - я честно хуй знает как сделать этот круг, пусть будет для вида *Типа работает*
            render.arc([x + 130, y + 14 * cn], 10, (yaw * -1), 36, 200, [150, 150, 150, a*220], false, 1)
            render.arc([x + 130, y + 14 * cn], 10, (fakeangle * -1), 36, 200, [r, g, b, a*255], false, 1); 

			//Render.GradientRect([x + 5, y + 11 * cn], 2, 9, 0, [0, 0, 0, a*0], [rs, gs, bs, a*255]) 
            //@Mased - Бля, а где апи?
			//Render.GradientRect([x + 5, y + 14 * cn + 3], 2, 9, 0, [rs, gs, bs, a*255], [0, 0, 0, a*0]); cn=cn+1
			
            render.text([x + 4, y + 11 * cn], [255, 255, 255, a*255], 5, 2, "FAKE (" + cheat.get_desync_amount().toPrecision(2) + ")"); cn=cn+1

			render.text([x + 4, y + 12 * cn], [255, 255, 255, a*255], 5, 2, "SP:")
			render.filled_rect([x + 25, y + 11 * cn], [21, 6], [0, 0, 0, a*150], 0)
			render.filled_rect([x + 50, y + 11 * cn], [21, 6], [0, 0, 0, a*150], 0)
			this.table.sp_1 = lerp(this.table.sp_1, (body_yaw / 3) % 19, global_vars.frametime() * 8); this.table.sp_2 = lerp(this.table.sp_2, body_yaw % 19, global_vars.frametime() * 8)
			render.filled_rect([x + 25, y + 11 * cn], [this.table.sp_1, 6], [r, g, b, a*255], 0)
			render.filled_rect([x + 50, y + 11 * cn], [this.table.sp_2, 6], [r, g, b, a*255], 0); cn=cn+1

			var realtime = global_vars.realtime() / 2
			var alpha = Math.floor(Math.sin(realtime * 4) * (200 / 2) + 200 / 2)
			if (checkdt) { render.text([x + 4, y + 12 * cn + 1], [255, 255, 255, a*alpha], 5, 2, "SHIFTING TICKBASE") }
			render.text([x + 108, y + (checkdt ? 8.1 : 7.5) * cn + this.table.height - 42], [255, 255, 255, a*255], 5, 2, "OS:")
			render.text([x + 125 + "OS:".length, y + (checkdt ? 8.1 : 7.5) * cn + this.table.height - 42], [onshot_color[0], onshot_color[1], onshot_color[2], a*255], 5, 2, checkonshot ? "ON" : "OFF")
		}
	}
}

function g_paint_handler() {
    ms_classes.hud.g_paint_handler()
}

register_callback("render", g_paint_handler)