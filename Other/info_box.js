var screen = render.get_screen_size();
var a = 0
var lerp = function(a, b, percentage) { return a + (b - a) * percentage; }
ui.add_slider("Position X", "x", 5, screen[0]);
ui.add_slider("Position Y", "y", 5, screen[1]);

register_callback("render", function() {
  	a = lerp(a, 1, global_vars.frametime() * 8)
  	var alpha = Math.floor(Math.sin(global_vars.realtime() * 3) * (200 / 2) + 200 / 2)
	var x = vars.get_uint("js.x"), y = vars.get_uint("js.y")
	var desync = cheat.get_desync_amount().toFixed(1)
	var info = entity.get_player_info(entity.get_local_player())
	var user = (info == undefined ? "User" : (info["name"].length > 15 ? info["name"].slice(0, info["name"].length - 12) + "..." : info["name"] + ""))
	var check = (vars.is_bind_active("doubletap") ? " | DT" : (vars.is_bind_active("hide_shots") ? " | OS" : ""))

	render.filled_rect([x, y], [180, 50], [20, 20, 20, 95], 5)
	render.rect([x, y], [180, 50], [255, 255, 255, a * alpha], 4)
	render.text([x + 8, y + 10], [255, 255, 255, 255], 12, 2, ">> $ MSD Company $")
	render.text([x + 8, y + 24], [255, 255, 255, 255], 12, 2, ">> Welcome, " + user)
	render.text([x + 8, y + 38], [255, 255, 255, 255], 12, 2, ">> Build: Beta | " + desync + check)
})
