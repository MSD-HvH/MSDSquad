//OTC3 CORD MADE BY @ZXSLEEBU
//UKRAINE THE BEST BLYAT
//SALO SALO SALO UKRAINSKE SALO

//pls, if you have the source code and seeing this comment,
//don't remove any comments, cuz i wanna to be in a history
//if you will obfuscate it pls specify me in comment before a code
//huge thanks
//i think this cord will be popular asf
//but rn it's only my dreams

//yes, i pasted, but many features were created and modded by me
//when i created it, i thougt, would it be free, or paid

//if you paid me even 1$, very big thanks to you
//i wanna buy a new pc
//
//@zxsleebu
//29.01.2020

var name_text = "otc3 cord";
var last_upd = "08.03.20";
var version = "0.2.0 RELEASE";
var width = 438;
var height = 500;

//Positioning and UI look
var subtabs_width = width - (14 * 2);
const tab_margin = 5;
const tab_width = 84;
const header_radius = 3;
const element_margin_bottom = 11;
const checkbox_height = 13;
const checkbox_width = 12;
const box_margin_top = 22;
const box_margin_bottom = 3;
const box_margin_x = 8;
const box_text_margin_x = 29;
const slider_height = 8;
const slider_text_margin = 9;
const list_height = 18;

//Colors
const line_color = [55, 59, 66, 255];
const bright_line_color = [227, 186, 105, 255];
const subtab_text_color = [78, 81, 88, 255];
const background_color = [44, 48, 55, 255];
const tab_active_color = [34, 37, 42, 255];
const text_color = [220, 223, 230, 255];
const element_color = [31, 33, 37, 255];
const element_border_color = [37, 39, 44, 255];
const element_border_color2 = [56, 60, 67, 255];
const element_active_color = [217, 157, 86, 255];
const hintbox_color = [32, 34, 39, 255];
const white_color = [255, 255, 255, 255];
const list_text_color = [239, 239, 239, 255];
const shadow_color = [0, 0, 0, 150];

//Fonts
var menu_font = 0;
var icon_font = 0;
var subtabs_font = 0;
var text_icon_font = 0;
var list_font = 0;

//Predefining variables
var screen_size = Render.GetScreenSize();
var cursor_pos = Input.GetCursorPosition();
var selected_tab = 0;
var tab_start = 0;
var box_offsets = [0, 0];
var box_width = 0;
var subtab_start = 0;
var subtab_text_pos = 0;
var tab_colors = [0, 0, 0];
var old_cursor = [0, 0];
var is_pressed = false;
var is_moving = false;
var click_block = false;
var subtabs_names = {};
var checkbox_states = {};
var slider_values = {};
var selected_subtabs = {};
var checkbox_alpha = {};
var hint_text = "";
var hint_x = 0;
var hint_y = 0;
var hint_size = 0;
var show_items = false;
var slider_changing = false;

//To-Do list
//Rage: Safe after x miss, Autoscope fix (don't scope if cannot shoot)
//Anti-Aim:
//Local Player: 
//World: Nade tracer on all nades
//Visual Other: Custom out of fov, Custom autopeek color, Global position for hitmarker if impact didn't hit the wall
//Misc Other: Clantag with custom animation, Killsay, Custom Theme Color, Meme Mode, Tetris
var menu_elements = {
	"Rage": {
		"General": {
			"General": [
				{"type": "checkbox", "name": "Safe AWP", "id": "safe_awp", "hint": "Bind \"Force safe point\" to toggle on any key\nto make this function work"},
				{"type": "checkbox", "name": "Safe point on limbs", "id": "safe_limbs"},
				{"type": "checkbox", "name": "Jumpscout", "id": "jumpscout", "hint": "Sets scout hitchance to 40 in air"},
				{"type": "checkbox", "name": "Adaptive noscope", "id": "adaptive_noscope", "hint": "No auto scope on auto and scout\nif target is less than 7 meters away"},
				{"type": "checkbox", "name": "Predictive autoscope", "id": "predictive_autoscope"},
				{"type": "checkbox", "name": "Lethal safety", "id": "lethal_safety", "hint": "Forces baim or safe points when target is lethal"},
			],
			"Min-DMG bind": [
				{"type": "checkbox", "name": "Enabled", "id": "mindamage"},
				{"type": "slider", "name": "Min damage override", "id": "mindamage_hp", "min": 1, "max": 130, "default": 5}
			],
			"Other": [
				{"type": "checkbox", "name": "Force backshoot bind", "id": "force_backshoot"},
				{"type": "checkbox", "name": "Ping spike bind", "id": "ping_spike"},
				{"type": "checkbox", "name": "Custom zeus hitchance", "id": "zeus_hitchance_enabled"},
				{"type": "slider", "name": "Hitchance", "id": "zeus_hitchance", "min": 0, "max": 100, "append": "%", "default": 70}
			],
			"Doubletap": [
				{"type": "checkbox", "name": "DT recharge boost", "id": "doubletap_boost"},
				{"type": "checkbox", "name": "Matchmaking DT", "id": "mm_dt", "hint": "Makes doubletap register better\non official Valve servers.\nYou can just turn it on,\nit will work only on Valve servers"},
				{"type": "checkbox", "name": "Safe point on DT", "id": "dt_safepoint"},
				{"type": "checkbox", "name": "Prefer baim on DT", "id": "prefer_baim_on_dt", "hint": "Will turn on \"Prefer body aim\"\nif doubletap is active and charged"},
			]
		},
		"Anti-Aim": {
			"General": [
				{"type": "checkbox", "name": "Lowdelta", "id": "lowdelta"},
				{"type": "checkbox", "name": "Opposite on exploits", "id": "opposite_on_exploits", "hint": "Makes opposite AA type works on active exploits.\nMakes DT register a bit worse"},
				/*{"type": "checkbox", "name": "Pitch 0 on land", "id": "pitch_zero_on_land"},*/
				{"type": "checkbox", "name": "Legit AA on knife", "id": "antiaim_fix"},
				{"type": "checkbox", "name": "Legit AA on key", "id": "legit_aa"},
				{"type": "checkbox", "name": "Freestanding on key", "id": "freestanding"}
			],
			"Fake-Lag": [
				{"type": "checkbox", "name": "Alternative fake-lag", "id": "alternative_fakelag"},
				{"type": "slider", "name": "Alternative limit", "id": "alternative_limit", "min": 1, "max": 16, "default": 16},
				{"type": "checkbox", "name": "No revolver fake-lag", "id": "fakelag_fix", "hint": "Helps to prevent R8 shooting at floor"}
			],
			"Auto invert": [
				{"type": "checkbox", "name": "Invert on shot", "id": "invert_on_shot"},
				{"type": "checkbox", "name": "Ideal yaw", "id": "ideal_yaw", "hint": "Ideal yaw makes you peek\nwith your desync turned to enemy.\nIf \"Anti bruteforce\" is on, ideal yaw will be turned off\nafter 1st enemy miss for 3 seconds"},
				{"type": "checkbox", "name": "Standing auto inverter", "id": "standing_auto_invert"},
				{"type": "checkbox", "name": "Anti bruteforce", "id": "anti_brute", "hint": "Inverts your AA when enemy miss a shot"}
			],
			"Animations": [
				{"type": "checkbox", "name": "Slowmotion", "id": "slowmotion"},
				{"type": "checkbox", "name": "Slowmotion legbreaker", "id": "slowmotion_legbreaker", "hint": "Jitters your legs and body on slowmotion.\nBreaks enemy's animfix.\nLess speed = more jitter"},
				{"type": "slider", "name": "Slowmotion speed", "id": "slowmotion_speed", "min": 5, "max": 70, "default": 45},
				{"type": "checkbox", "name": "Legbreaker", "id": "legbreaker", "hint": "Spams \"Slide walk\" to make your legs unpredictable\nWorks better with alternative fake-lag"},
				{"type": "checkbox", "name": "Matchmaking FD", "id": "mm_fd", "hint": "Fakeduck created from a sketch.\nTurns off built-in desync\nbut uses written from a sketch (lowdelta)\nto work properly.\nThe best preset for MM is Lower Rage"}
			]
		}
	},
	"Visual": {
		"World": {
			"General": [
				{"type": "checkbox", "name": "Skeleton on hit", "id": "skeleton_on_hit"},
				{"type": "checkbox", "name": "Damage marker", "id": "damage_marker"},
				{"type": "checkbox", "name": "Enemy eye tracers", "id": "eye_tracers"}
			],
			"Local player": [
				{"type": "checkbox", "name": "Bullet tracer", "id": "bullet_tracer"},
				{"type": "checkbox", "name": "Trail", "id": "trail"}
			],
			"Bloom & FX": [
				{"type": "checkbox", "name": "World color", "id": "world_color"},
				{"type": "slider", "name": "World brightness", "id": "world_brightness", "min": -50, "max": 25},
				{"type": "slider", "name": "Model brightness", "id": "model_brightness", "min": 0, "max": 100, "append": "%"},
				{"type": "slider", "name": "Bloom scale", "id": "bloom_scale", "min": 0, "max": 100, "append": "%"}
			],
			"Custom fog": [
				{"type": "checkbox", "name": "Enabled", "id": "custom_fog"},
				{"type": "slider", "name": "Distance", "id": "fog_distance", "min": 0, "max": 3000},
				{"type": "slider", "name": "Distance third person", "id": "fog_distance_3rd", "min": 0, "max": 2500, "visible": false},
				{"type": "slider", "name": "Density", "id": "fog_density", "min": 0, "max": 100}
			]
		},
		"Models": {
			"Better Glow Chams": [
				{"type": "checkbox", "name": "Enabled", "id": "better_glow_chams"},
				{"type": "checkbox", "name": "Hollow", "id": "better_glow_chams_hollow"},
				{"type": "checkbox", "name": "Pulse", "id": "better_glow_chams_pulse"},
				{"type": "checkbox", "name": "Rainbow", "id": "better_glow_chams_rainbow"},
				{"type": "checkbox", "name": "Wireframe", "id": "better_glow_chams_wireframe"},
				{"type": "slider", "name": "Vibrancy", "id": "better_glow_chams_vibrancy", "min": 0, "max": 100, "append": "%", "default": 85}
			],
			"Model changer": [
				{"type": "checkbox", "name": "Agent changer", "id": "agent_changer"},
				{"type": "checkbox", "name": "Arms color", "id": "arms_color"}
			]
		},
		"Other": {
			"General": [
				{"type": "checkbox", "name": "Effect on kill", "id": "effect_on_kill"},
				{"type": "checkbox", "name": "Rainbow bar", "id": "rainbow_bar"},
				//{"type": "checkbox", "name": "Custom out of FOV", "id": "custom_out_of_fov"}
			],
			"Crosshair": [
				{"type": "checkbox", "name": "Better scope", "id": "better_scope"},
				{"type": "checkbox", "name": "Better crosshair", "id": "better_crosshair"},
				{"type": "checkbox", "name": "Better hitmarker", "id": "hitmarker"}
			],
			"Nades": [
				{"type": "checkbox", "name": "Nade circle", "id": "nade_circle", "hint": "Draws molotov and smoke radius,\nHE grenade explosion visualisation"},
				{"type": "checkbox", "name": "Nade tracer", "id": "nade_tracer"},
				{"type": "checkbox", "name": "Nade warning", "id": "nade_warning"},
				{"type": "checkbox", "name": "Molotov timer", "id": "molotov_timer"},
				{"type": "checkbox", "name": "Transparency on nade", "id": "transparency_on_nade", "hint": "Wall and prop transparency\nwhen throwing nade"},
			],
			"Miscellaneous": [
				{"type": "slider", "name": "Aspect ratio", "id": "aspect_ratio", "min": 0, "max": 300, "append": "%"},
				{"type": "checkbox", "name": "Dark menu background", "id": "dark_menu"}
			]
		}
	},
	"Misc": {
		"General": {
			"Miscellaneous": [
				{"type": "checkbox", "name": "FPS boost", "id": "fps_boost"},
				{"type": "checkbox", "name": "Autostrafe fix", "id": "autostrafe_fix"},
				{"type": "checkbox", "name": "Zoom fix", "id": "zoom_fix"},
				{"type": "checkbox", "name": "Location spammer", "id": "enemy_location", "hint": "Sends enemy location in team chat"},
				{"type": "checkbox", "name": "Party mode", "id": "party_mode"},
				{"type": "checkbox", "name": "Custom music kit", "id": "music_kit"},
				{"type": "checkbox", "name": "Clantag on peek", "id": "clantag_on_peek", "hint": "Turns on clantag when enemy is peeking"},
				{"type": "checkbox", "name": "Clantag", "id": "clantag"},
				{"type": "checkbox", "name": "Killsay", "id": "killsay"},
				{"type": "checkbox", "name": "Show useless features", "id": "useless_features"}
			],
			"Information": [
				{"type": "checkbox", "name": "Buy list", "id": "buy_list"},
				{"type": "checkbox", "name": "Vote revealer", "id": "vote_revealer"},
				{"type": "checkbox", "name": "Watermark", "id": "watermark"},
				{"type": "checkbox", "name": "Indicators", "id": "indicators"},
			],
		}
	}
};
var subtabs_icons = {
	"Rage": {
		"General": "A",
		"Anti-Aim": "B"
	},
	"Visual": {
		"World": "C",
		"Models": "D",
		"Other": "E"
	},
	"Misc": {
		"General": "F"
	}
};
var subtabs_text_icons = {
	"Rage": {
		"General": "",
		"Anti-Aim": ""
	},
	"Visual": {
		"World": "",
		"Models": "",
		"Other": "",
	},
	"Misc": {
		"General": ""
	}
};

//Calculating variables
UI.AddSliderInt(name_text + "_x", -width, screen_size[0]);
UI.AddSliderInt(name_text + "_y", -28, screen_size[1]);
UI.SetEnabled("Script items", name_text + "_x", false);
UI.SetEnabled("Script items", name_text + "_y", false);
var x = UI.GetValue("Script items", name_text + "_x");
var y = UI.GetValue("Script items", name_text + "_y");
//UI.AddLabel("Reload " + name_text + " after first load");
UI.AddCheckbox("Show " + name_text + " items");



//Lowdelta
var jitter_bak = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset");
var yaw_bak = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset");
var block_set = false;
var lowdelta_active = false;
var mmFDActive = false;
function lowdelta(){
	if(!checkbox_states["lowdelta"]) return;
	var FDState = (GetValue("Lowdelta on FD") && UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck"));
	if(legitAAactive) return;
	if(GetValue("Lowdelta") == 1){
		block_set = false;
		UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", 10);
        UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", 0);
        AntiAim.SetOverride(1);
        AntiAim.SetFakeOffset(0);
        AntiAim.SetRealOffset(-26);
        lowdelta_active = true;
        return;
	}
	if ((isSlowwalking() && !mmFDActive) || FDState){
		block_set = false;
		UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", 10);
        UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", 0);
        AntiAim.SetOverride(1);
        AntiAim.SetFakeOffset(0);
        AntiAim.SetRealOffset(-26);
        lowdelta_active = true;
	}
	if(!isSlowwalking() && !mmFDActive && !FDState){
		lowdelta_active = false;
		if(!block_set){
			UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", yaw_bak);
        	UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", jitter_bak);
        	AntiAim.SetOverride(0);
			block_set = true;
		}
		yaw_bak = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset");
		jitter_bak = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset");
	}
}

//Safe AWP
var safePbak = false;
function safeAWP(){
	if(!checkbox_states["safe_awp"]) return;
    weapon = getWeaponName();

    if(weapon == "awp"){
        forceSafePoint = UI.IsHotkeyActive('Rage', 'GENERAL', 'General', 'Force safe point');
        if (!forceSafePoint){
            UI.ToggleHotkey('Rage', 'GENERAL', 'General', 'Force safe point');
            safePbak = true;
        }
    }
    else if (safePbak){
        UI.ToggleHotkey('Rage', 'GENERAL', 'General', 'Force safe point');
        safePbak = false;
    }
}

//Safe limbs
function safeLimbs(){
	if(!checkbox_states["safe_limbs"]) return;
    Ragebot.ForceHitboxSafety(7);
    Ragebot.ForceHitboxSafety(8);
    Ragebot.ForceHitboxSafety(9);
    Ragebot.ForceHitboxSafety(10);
    Ragebot.ForceHitboxSafety(11);
    Ragebot.ForceHitboxSafety(12);
}

//Jumpscout
var hitchanceBak = UI.GetValue("Rage", "SCOUT", "Accuracy", "Hitchance");
var block_set2 = false;
var scoutInAir = 40;
function jumpscout(){
	if(!checkbox_states["jumpscout"]) return;
	if(getWeaponName() !== "ssg 08"){
		if(UI.GetValue("Rage", "SCOUT", "Accuracy", "Hitchance") !== scoutInAir){
			hitchanceBak = UI.GetValue("Rage", "SCOUT", "Accuracy", "Hitchance");
		}
		if(block_set2) return;
		UI.SetValue("Rage", "SCOUT", "Accuracy", "Hitchance", hitchanceBak);
		block_set2 = true;
		return;
	}

	if (isInAir()){
		block_set2 = false;
		UI.SetValue("Rage", "SCOUT", "Accuracy", "Hitchance", scoutInAir);
	}
    else{
		if(UI.GetValue("Rage", "SCOUT", "Accuracy", "Hitchance") !== scoutInAir){
			hitchanceBak = UI.GetValue("Rage", "SCOUT", "Accuracy", "Hitchance");
		}
		if(block_set2) return;
		UI.SetValue("Rage", "SCOUT", "Accuracy", "Hitchance", hitchanceBak);
		block_set2 = true;
    }
}

//Opposite LBY on Exploits
var block_set3 = false;
function oppositeOnExploits(){
	if(checkbox_states["lowdelta"] && isSlowwalking()) return;
	if(!checkbox_states["opposite_on_exploits"] || !exploitsActive("all")){
		if(block_set3) return;
        AntiAim.SetOverride(0);
        block_set3 = true;
        return;
	}
	if(UI.GetValue("Anti-Aim", "Fake angles", "LBY mode") == 1){
        AntiAim.SetOverride(1);
        block_set3 = false;
        var fake_direction = UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter") == 1 ? 1 : -1;
        if(UI.GetValue("Anti-Aim", "Fake angles", "Fake desync")){
        	fake_direction = fake_direction * -1;
        }
        var real_yaw_offset = 60 * fake_direction;
        var lower_body_offset = -60 * fake_direction;
        var current_fake_yaw = Local.GetFakeYaw();
        var current_real_yaw = Local.GetRealYaw();
        if(Math.abs(angle_diff(current_fake_yaw, current_real_yaw)) > 100)
        {
            lower_body_offset = 180;
        }
        AntiAim.SetFakeOffset(0);
        AntiAim.SetRealOffset(real_yaw_offset);
        AntiAim.SetLBYOffset(lower_body_offset);
    }
    else{	
    	if(block_set3) return;
        AntiAim.SetOverride(0);
        block_set3 = true;
    }
}

//Adaptive noscope and predictive autoscope
var noscope_target = -1;
var noscope_dist = {
	"ssg 08": 4,
	"scar 20": 7,
	"g3sg1" : 7
};
var stop_attack2 = false;
function autoscope(){
	if(stop_attack2){
		stop_attack2 = false;
		Cheat.ExecuteCommand("-attack2");
	}
	local = Entity.GetLocalPlayer();
	if(checkbox_states["adaptive_noscope"]){
		if((getWeaponName() !== "ssg 08" && getWeaponName() !== "scar 20" && getWeaponName() !== "g3sg1") || isInAir()){
			UI.SetValue("Rage", "GENERAL", "General", "Auto scope", true);
    	    return;
		};
		if(!Ragebot.GetTarget())
    	    noscope_target = closestTarget();
    	else
    	    noscope_target = Ragebot.GetTarget();
    	if(!Entity.IsAlive(noscope_target)){
    	    UI.SetValue("Rage", "GENERAL", "General", "Auto scope", true);
    	    return;
    	}
    	if(get_metric_distance(Entity.GetRenderOrigin(local), Entity.GetRenderOrigin(noscope_target)) < noscope_dist[getWeaponName()]){
    	    UI.SetValue("Rage", "GENERAL", "General", "Auto scope", false);
    	}
    	else{
    	    UI.SetValue("Rage", "GENERAL", "General", "Auto scope", true);
    	}
	}
    if(checkbox_states["predictive_autoscope"]){
    	switch(getWeaponName()){
    		case "ssg 08":
    		case "scar 20":
    		case "g3sg1":
    		case "awp":
    			break;
    		default:
    			return;
    	}
    	var enemies = Entity.GetEnemies();
		var local_pos = ExtrapolateTick(15);
		var auto_scope = false;
		var is_scoped = Entity.GetProp(local, "CCSPlayer", "m_bIsScoped");
		for(var i = 0; i < enemies.length;i++){
			var enemy = enemies[i];
			if (!Entity.IsAlive(enemy) || Entity.IsDormant(enemy) || !Entity.IsValid(enemy)) continue;
			var pos = Entity.GetHitboxPosition(enemy, 2)
			var result = Trace.Bullet(local, enemy, local_pos, pos);
			if(result[1] > 1){ // aka damage
				if(get_metric_distance(Entity.GetRenderOrigin(local), Entity.GetRenderOrigin(enemy)) > noscope_dist[getWeaponName()]){
					auto_scope = true;
					break;
				}
			}
		}
		if(!is_scoped && auto_scope && !stop_attack2 && Entity.GetProp(local, "CCSPlayer", "m_iShotsFired") === 0){
    		Cheat.ExecuteCommand("+attack2");
    		stop_attack2 = true;
    	}
	}
}

//Bullet tracer
var tracer_x = 0, tracer_y = 0, tracer_z = 0;
var eye_angles = [0, 0, 0];
var wts_impact = [0, 0, 0];
var render_time = 0;
function bulletTracer() {
    if(!checkbox_states["bullet_tracer"]) return;
    local = Entity.GetLocalPlayer();
    if(!local || !Entity.IsValid(local)) return;

    var player = Event.GetInt("userid");
    var player_id = Entity.GetEntityFromUserID(player);
    var impact_x = Event.GetFloat("x"), impact_y = Event.GetFloat("y"), impact_z = Event.GetFloat("z");

    local = Entity.GetLocalPlayer();
    if (local !== player_id) return;

    tracer_x = impact_x;
    tracer_y = impact_y;
    tracer_z = impact_z;

    eye_angles = Entity.GetEyePosition(local);
    render_time = Globals.Curtime();
}
function bulletTracer2() {
    if(!checkbox_states["bullet_tracer"]) return;
    local = Entity.GetLocalPlayer();
    if(!local || !Entity.IsValid(local)) return;

    wts_impact = Render.WorldToScreen([tracer_x, tracer_y, tracer_z]);
    wts_eye_angles = Render.WorldToScreen([eye_angles[0], eye_angles[1], eye_angles[2]]);

    if (wts_impact[2] === 1 && //some useless shit
    	wts_eye_angles[2] === 1 && (Globals.Curtime() - render_time) < 4)
        Render.Line(wts_eye_angles[0], wts_eye_angles[1], wts_impact[0], wts_impact[1], UI.GetColor("Script items", "Bullet tracer"));
}

//Force backshoot
var enemies = Entity.GetEnemies();
var last_shot_time = []
function forceBackshoot(){
	if(!checkbox_states["force_backshoot"] || !UI.IsHotkeyActive("Script items", "Force backshoot")) return;
	local = Entity.GetLocalPlayer();
	if(!Entity.IsAlive(Entity.GetLocalPlayer())) return;
	enemies = Entity.GetEnemies();

	for(var i = 0; i < enemies.length; i++){
		var enemy = enemies[i];
		var dif = Globals.Tickcount() - last_shot_time[enemy]
		var has_shot = dif >= 0 && dif <= 12;
		if(!has_shot)
			Ragebot.IgnoreTarget(enemy)
	}
}

var baim_state_bak = UI.IsHotkeyActive('Rage', 'GENERAL', 'Force body aim');
var block_set13 = false;
var block_set14 = false;
var forcedBaim = false;
//Baim or safe points on lethal
function lethalSafety(){
	if(!checkbox_states["lethal_safety"]) return;
	enemies = Entity.GetEnemies();
	for (i = 0; i < enemies.length; i++) {
        if (!Entity.IsValid(enemies[i])) continue;
        if (!Entity.IsAlive(enemies[i])) continue;
        if (Entity.IsDormant(enemies[i])) continue;
        var target = Ragebot.GetTarget();
        if (IsLethal(enemies[i])) {
        	if(GetValue("Lethal safety") & (1 << 0)){
        		Ragebot.ForceTargetSafety(enemies[i]);
        	}
        	if(GetValue("Lethal safety") & (1 << 1)){
        		if (target == enemies[i]) forceBaim(enemies[i]);
        		block_set13 = false;
        		block_set14 = false;
        	}
            continue;
        }
        if(!baim_state_bak && GetValue("Lethal safety") & (1 << 1)){
        	if(!block_set14){
        		DisableBaim();
        		block_set14 = true;
        	}
        	forcedBaim = false;
        }
    }
    if(!forcedBaim && GetValue("Lethal safety") & (1 << 1)){
    	if(!block_set13){
    		if(UI.IsHotkeyActive('Rage', 'GENERAL', 'Force body aim') !== baim_state_bak) UI.ToggleHotkey('Rage', 'GENERAL', 'Force body aim');
    		block_set13 = true;
    	}
    	baim_state_bak = UI.IsHotkeyActive('Rage', 'GENERAL', 'Force body aim');
    }
}

//Pitch 0 on land
var block_set4 = 0;
var block_set17 = false;
var groundCounter = 0;
function pitchZeroOnLand(){
	if(!checkbox_states["pitch_zero_on_land"]) return;
	if(legitAAactive) return;

    local = Entity.GetLocalPlayer();
    var localPlayerFlags = Entity.GetProp(local, "CBasePlayer", "m_fFlags");
    if(localPlayerFlags == 256){
    	block_set4 = 0;
    	groundCounter = 25;
    }
	if(groundCounter > 0 && localPlayerFlags === 257){
		UI.SetValue("Misc", "PERFORMANCE & INFORMATION", "Information", "Restrictions", 0);
        UI.SetValue("Anti-Aim", "Extra", "Pitch", 0);
        block_set17 = false;
        groundCounter--;
    }
    if(groundCounter === 0){
    	if(block_set4 >= 5){
    		if(!block_set17){
    			UI.SetValue("Misc", "PERFORMANCE & INFORMATION", "Information", "Restrictions", restrictions_bak);
        		UI.SetValue("Anti Aim", "Extra", "Pitch", pitch_bak);
    			block_set17 = true;
    		}
    		pitch_bak = UI.GetValue("Anti-Aim", "Extra", "Pitch");
			restrictions_bak = UI.GetValue("Misc", "PERFORMANCE & INFORMATION", "Information", "Restrictions");
			return;
    	}
        block_set4++;
    }
}

//Better scope
var scope_animation = 0;
var scope_animation_step = 22;
var block_set17 = false;
var block_set18 = false;
var betterScopeActive = false;
var penetration_dot_bak = UI.GetValue("Visuals", "World", "Entities", "Penetration dot");
var penetration_crosshair_bak = UI.GetValue("Visuals", "World", "Entities", "Penetration crosshair");
function betterScope(){
	if(!checkbox_states["better_scope"]) return;
	local = Entity.GetLocalPlayer();
	var scoped = Entity.GetProp(local, 'DT_CSPlayer', 'm_bIsScoped');
	if (!Entity.IsAlive(local) || !World.GetServerString()) {
        return;
    }
	if(Entity.IsAlive(local) && scoped){
		scope_animation += scope_animation_step;
		scope_animation = clamp(scope_animation, 0, 255);
		if(GetValue("Better scope hide GUI")){
			Convar.SetString('cl_draw_only_deathnotices', '1');
		}
		var startX = screen_size[0] / 2 + GetValue("Better scope position");
		var startY = screen_size[1] / 2 + GetValue("Better scope position");
		var sizeX = 150;
    	var sizeY = GetValue("Better scope thickness");
    	var off = sizeX / 2 + GetValue("Better scope start");
    	var c2 = UI.GetColor("Script items", "Better scope color 1"); //[150, 200, 255, scope_animation]
    	var c1 = UI.GetColor("Script items", "Better scope color 2"); //[150,0, 200, 0]
    	c2[3] = scope_animation;
    	c1[3] = 0;
		renderScopeLine(startX - off, startY, sizeX, sizeY, 1, c1, c2);
        renderScopeLine(startX + off, startY, sizeX, sizeY, 1, c2, c1);
        renderScopeLine(startX, startY - off, sizeY, sizeX, 0, c1, c2);
        renderScopeLine(startX, startY + off, sizeY, sizeX, 0, c2, c1);
	}
	else{
		scope_animation = 0;
		Convar.SetString('cl_draw_only_deathnotices', '0');
	}
}
function renderScopeLine(x, y, w, h, dir, color1, color2){
	return Render.GradientRect(x - Math.round(w/2), y - Math.round(h/2), w, h, dir, color1, color2);
}
function betterScope2(){
	if(!checkbox_states["better_scope"]) return;
	if(Cheat.FrameStage() != 5) return;
	local = Entity.GetLocalPlayer();
	var scoped = Entity.GetProp(local, 'DT_CSPlayer', 'm_bIsScoped');
	if (!Entity.IsAlive(local) || !World.GetServerString()) {
        Convar.SetFloat("r_drawvgui", 1);
        Convar.SetInt("fov_cs_debug", 0);
        block_set18 = false;
        return;
    }
    if(!GetValue("Better scope viewmodel")){
		Convar.SetString("r_drawvgui", "1");
	}
	if(Entity.IsAlive(local) && scoped){
		betterScopeActive = true;
		if(GetValue("Better scope viewmodel")){
			Convar.SetString("r_drawvgui", "0");
        	if (!UI.IsHotkeyActive("Visual", "WORLD", "View", "Thirdperson") && !block_set18) {
        	    Cheat.ExecuteCommand("fov_cs_debug 90");
        	    UI.SetValue("Visual", "WORLD", "View", "FOV while scoped", 0);
        	    block_set18 = true;
        	}
		}
	}
	else{
		//if(!block_set17){
		//	UI.SetValue("Visuals", "World", "Entities", "Penetration dot", penetration_dot_bak);
		//	UI.GetValue("Visuals", "World", "Entities", "Penetration crosshair", penetration_crosshair_bak);
		//}
		//penetration_dot_bak = UI.GetValue("Visuals", "World", "Entities", "Penetration dot");
 		//penetration_crosshair_bak = UI.GetValue("Visuals", "World", "Entities", "Penetration crosshair");
		betterScopeActive = false;
		block_set18 = false;
		Convar.SetString("r_drawvgui", "1");
		Convar.SetInt("fov_cs_debug", 0);
	}
}

//Legbreaker
var legbreaker_speed = 2;
var legbreaker_old_tick_count = Globals.Tickcount();
var fakelag_leg = false;
function legBreaker(){
	if(!checkbox_states["legbreaker"]) return;
	if((Globals.Tickcount() - legbreaker_old_tick_count) > legbreaker_speed && (!checkbox_states["alternative_fakelag"] || exploitsActive("all"))){
        if (UI.GetValue("Misc", "GENERAL", "Movement", "Slide walk"))
            UI.SetValue("Misc", "GENERAL", "Movement", "Slide walk", 0);
        else
            UI.SetValue("Misc", "GENERAL", "Movement", "Slide walk", 1);
        legbreaker_old_tick_count = Globals.Tickcount();
    }
    if(checkbox_states["alternative_fakelag"] && !exploitsActive("all")){
    	if(!fakelag_leg && fakelag_flip){
    		UI.SetValue("Misc", "GENERAL", "Movement", "Slide walk", 1);
    		fakelag_leg = true;
    	}
    	else{
    		UI.SetValue("Misc", "GENERAL", "Movement", "Slide walk", 0);
    	}
    	if(fakelag_flip){
    		fakelag_leg = false;
    	}
    }
}

var accurate_walk_bak = UI.GetValue("Misc", "GENERAL", "Movement", "Accurate walk");
var block_set7 = false;
function slowmotion(){
	if(!checkbox_states["slowmotion"]) return;
	if(!isSlowwalking()){
		if(!block_set7){
			UI.SetValue("Misc", "GENERAL", "Movement", "Accurate walk", accurate_walk_bak);
			block_set7 = true;
		}
		accurate_walk_bak = UI.GetValue("Misc", "GENERAL", "Movement", "Accurate walk");
		return;
	}
	if(UI.IsHotkeyActive("Visual", "SELF", "Freecam", "Enable")) return;
	block_set7 = false;
	UI.SetValue("Misc", "GENERAL", "Movement", "Accurate walk", false);
	var slowmotion_speed = slider_values["slowmotion_speed"];
	if(checkbox_states["slowmotion_legbreaker"]){
		slowmotion_speed += 10;
	}
    var sSpeed = (slowmotion_speed * (((getVelocity(Entity.GetLocalPlayer()) >= slowmotion_speed) && checkbox_states["slowmotion_legbreaker"]) ? -1 : 1));
    var dir = [0, 0, 0];
    if(Input.IsKeyPressed(0x57)){
        dir[0] += sSpeed;
    }
    if(Input.IsKeyPressed(0x44)){
        dir[1] += sSpeed;
    }
    if(Input.IsKeyPressed(0x41)){
        dir[1] -= sSpeed
    }
    if(Input.IsKeyPressed(0x53)){
        dir[0] -= sSpeed;
    }
    UserCMD.SetMovement(dir);
}

//Standing auto invert
var standingAutoInvert_wait = 0;
var standingAutoInvert_speed = 2;
function standingAutoInvert(){
	if(!checkbox_states["standing_auto_invert"]) return;
	if(getVelocity(Entity.GetLocalPlayer()) > 3) return;
	if(standingAutoInvert_wait++ === standingAutoInvert_speed){
		UI.ToggleHotkey("Anti-Aim", "Fake angles", "Inverter");
		standingAutoInvert_wait = 0;
	}
}

//Skeleton on hit and kill
var skeleton_draw_time = 4;
var hitlist = [[], [], []];
function skeletonOnHit(){
	if(!checkbox_states["skeleton_on_hit"]) return;
	var attackerplayer = Entity.GetEntityFromUserID(Event.GetString("attacker"));
    if (attackerplayer == Entity.GetLocalPlayer()){
        var victimplayer = Entity.GetEntityFromUserID(Event.GetString("userid"))
        var color = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "Skeleton Hit Color");
        if (Event.GetInt("health") < 1) {
            color = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "Skeleton Kill Color");
        }
        var hitboxPos = [];
        for (var i = 0; i < 19; i++) {
            var p = Entity.GetHitboxPosition(victimplayer, i);
            hitboxPos.push(p);
        }
        hitlist[0].push(Global.Curtime() + skeleton_draw_time);
        hitlist[1].push(hitboxPos);
        hitlist[2].push(color);
    }
}
function skeletonOnHit2(){
	if (!checkbox_states["skeleton_on_hit"] || hitlist[0].length == 0) return;
    for(var i = 0; i < hitlist[0].length; i++){
        if(Global.Curtime() < hitlist[0][i]){
            skeletonOnHit3(hitlist[1][i], hitlist[2][i]);
        }
		else{
            hitlist[0].splice(i, 1);
            hitlist[1].splice(i, 1);
            hitlist[2].splice(i, 1);
        }
    }
}
function skeletonOnHit3(hitboxPos, color){
    var skelMesh = [
        [0, 1],
        [1, 6],
        [6, 5],
        [5, 4],
        [4, 3],
        [3, 2],
        [2, 7],
        [2, 8],
        [8, 10],
        [10, 12],
        [7, 9],
        [9, 11],
        [6, 15],
        [15, 16],
        [16, 13],
        [6, 17],
        [17, 18],
        [18, 14]
    ];
    for (var i = 0; i < skelMesh.length; i++){
        var p1 = Render.WorldToScreen(hitboxPos[skelMesh[i][0]]);
        var p2 = Render.WorldToScreen(hitboxPos[skelMesh[i][1]]);
        Render.Line(p1[0], p1[1], p2[0], p2[1], color);
    }
}

//Min damage override on key
function minDamageOverride(){
	if(!checkbox_states["mindamage"] || !UI.IsHotkeyActive('Script items', 'Min damage override')) return;
	enemies = Entity.GetEnemies();
	for(i = 0; i < enemies.length; i++){
        if (!Entity.IsValid(enemies[i])) continue;
        if (!Entity.IsAlive(enemies[i])) continue;
        Ragebot.ForceTargetMinimumDamage(enemies[i], slider_values["mindamage_hp"]);
    }
}

//Trail
var trails = [];
var trail_rgb_speed = 15;
var trail_timer = 200;
function trail(){
	if(!checkbox_states["trail"]) return;
	local = Entity.GetLocalPlayer();
    if (Entity.IsValid(local)){
        var position = Entity.GetHitboxPosition(local, 6);
        if(Array.isArray(position)){
            trails.push({remove:Global.Tickcount() + trail_timer, location: position});

            trails.forEach(function(x, y){
                var location = trails[y]["location"];
                var rainbow = rgb(trail_rgb_speed / 500);
                rainbow[3] = 50;
                if (!GetValue("Trail rainbow")) {
                    var color = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "Trail");
                    rainbow = color;
                }
                var position = Render.WorldToScreen([location[0], location[1], location[2]-50.0]);
                Render.FilledRect(position[0], position[1], 15, 15, rainbow);

                var time = Global.Tickcount();
                if (trails[y]["remove"] <= time){
                    trails.splice(y, 1);
                }
            });
        }
    }
}

function rgb(speed) {
    var timer = Global.Tickcount();
    var result = [0, 0, 0, 255];

    result[0] = Math.floor(Math.sin(timer * speed + 0) * 127 + 128);
    result[1] = Math.floor(Math.sin(timer * speed + 2) * 127 + 128);
    result[2] = Math.floor(Math.sin(timer * speed + 4) * 127 + 128);
    return result;
}

function fps_boost(){
    if (checkbox_states["fps_boost"]){
		UI.SetValue("Misc", "GENERAL", "Misc", "Force sv_cheats", true);
		UI.SetValue("Misc", "GENERAL", "Misc", "Hidden cvars", true);
        Convar.SetString("r_shadows", "0");
        Convar.SetString("cl_csm_static_prop_shadows", "0");
        Convar.SetString("cl_csm_shadows", "0");
        Convar.SetString("cl_csm_world_shadows", "0");
        Convar.SetString("cl_foot_contact_shadows", "0");
        Convar.SetString("cl_csm_viewmodel_shadows", "0");
        Convar.SetString("cl_csm_rope_shadows", "0");
        Convar.SetString("cl_csm_sprite_shadows", "0");
		Convar.SetString("cl_csm_world_shadows_in_viewmodelcascade", "0");
		Convar.SetString("cl_csm_translucent_shadows", "0");
		Convar.SetString("cl_csm_entity_shadows", "0");
        Convar.SetString("violence_hblood", "0");
        Convar.SetString("r_3dsky", "0");
        Convar.SetString("r_drawdecals", "0");
        Convar.SetString("r_drawrain", "0");
        Convar.SetString("r_drawropes", "0");
        Convar.SetString("r_drawsprites", "0");
        Convar.SetString("fog_enable_water_fog", "0");
		Convar.SetString("@panorama_disable_blur", "1");
		Convar.SetString("dsp_slow_cpu", "1");
		Convar.SetString("cl_disable_ragdolls", "1");
		Convar.SetString("mat_disable_bloom", "1");
    }
    else{
        Convar.SetString("r_shadows", "1");
        Convar.SetString("cl_csm_static_prop_shadows", "1");
        Convar.SetString("cl_csm_shadows", "1");
        Convar.SetString("cl_csm_world_shadows", "1");
        Convar.SetString("cl_foot_contact_shadows", "1");
        Convar.SetString("cl_csm_viewmodel_shadows", "1");
        Convar.SetString("cl_csm_rope_shadows", "1");
        Convar.SetString("cl_csm_sprite_shadows", "1");
        Convar.SetString("cl_csm_world_shadows_in_viewmodelcascade", "1");
		Convar.SetString("cl_csm_translucent_shadows", "1");
		Convar.SetString("cl_csm_entity_shadows", "1");
        Convar.SetString("violence_hblood", "1");
        Convar.SetString("r_3dsky", "1");
        Convar.SetString("r_drawdecals", "1");
        Convar.SetString("r_drawrain", "1");
        Convar.SetString("r_drawropes", "1");
        Convar.SetString("r_drawsprites", "1");
        Convar.SetString("fog_enable_water_fog", "1");
		Convar.SetString("@panorama_disable_blur", "0");
		Convar.SetString("dsp_slow_cpu", "0");
		Convar.SetString("cl_disable_ragdolls", "0");
		Convar.SetString("mat_disable_bloom", "0");
    }
}

//Transparent walls and props when nading
var block_set5 = 0;
var wallTransparencyBak = UI.GetValue("Visual", "Map", "Wall transparency");
var propTransparencyBak = UI.GetValue("Visual", "Map", "Prop transparency");
function transparencyOnNade(){
	if(!checkbox_states["transparency_on_nade"]) return;
	var weapon = getWeaponName();
	local = Entity.GetLocalPlayer();
	if((weapon.indexOf("grenade") !== -1 /*|| weapon === "flashbang"*/  || weapon === "molotov") && weapon !== "decoy grenade" && Entity.IsAlive(local) && Input.IsKeyPressed(0x01)){
		block_set5 = 0;
		UI.SetValue("Visual", "Map", "Wall transparency", (GetValue("Wall transparency") / 100));
		UI.SetValue("Visual", "Map", "Prop transparency", (GetValue("Prop transparency") / 100));
	}
	else{
		if(block_set5 < 3){
			UI.SetValue("Visual", "Map", "Wall transparency", wallTransparencyBak);
			UI.SetValue("Visual", "Map", "Prop transparency", propTransparencyBak);
			block_set5++;
		}
		propTransparencyBak = UI.GetValue("Visual", "Map", "Prop transparency");
		wallTransparencyBak = UI.GetValue("Visual", "Map", "Wall transparency");
	}
}

//Force safe point on DT
function safePointOnDT(){
	if(!checkbox_states["dt_safepoint"]) return;
	if(!exploitsActive("dt")) return;
	enemies = Entity.GetEnemies();
	for(i = 0; i < enemies.length; i++) {
        if (!Entity.IsValid(enemies[i])) continue;
        if (!Entity.IsAlive(enemies[i])) continue;
        Ragebot.ForceTargetSafety(enemies[i]);
    }
}

//Svastica crosshair
//The best function in otc3 cord
var cnt = 0;
function betterCrosshair(){
	if(!checkbox_states["better_crosshair"]) return;
	local = Entity.GetLocalPlayer();
	if(!local || !Entity.IsValid(local)) return;
	if(betterScopeActive) return;
	var scr = Render.GetScreenSize();
    scr[0]/=2;
    scr[1]/=2;
   
    var col = UI.GetColor("Script Items", "Better crosshair");
    if(GetValue("Better crosshair rainbow")){
        var coll = hsv2rgb(cnt * .002,1,1);
        col = [coll.r,coll.g,coll.b,col[3]];
    }
    var range = GetValue("Better crosshair length");
    var topx = scr[0];
    var topy = scr[1]+range;
    var topxx = scr[0]-range;
    var topyy = scr[1]+range;
    var topp = rotateAroundPoint(scr,[topx,topy], cnt);
    var toppp = rotateAroundPoint(scr,[topxx,topyy], cnt);
    Render.Line(scr[0],scr[1],topp[0],topp[1],col);
    Render.Line(topp[0],topp[1],toppp[0],toppp[1],col);
    var botx = scr[0];
    var boty = scr[1]-range;
    var botxx = scr[0]+range;
    var botyy = scr[1]-range;
    var bott = rotateAroundPoint(scr,[botx,boty], cnt);
    var bottt = rotateAroundPoint(scr,[botxx,botyy],cnt);
    Render.Line(scr[0],scr[1],bott[0],bott[1],col);
    Render.Line(bott[0],bott[1],bottt[0],bottt[1],col);
    var rightx = scr[0]+range;
    var righty = scr[1];
    var rightxx = scr[0]+range;
    var rightyy = scr[1]+range;
    var rightt = rotateAroundPoint(scr,[rightx,righty],cnt);
    var righttt = rotateAroundPoint(scr,[rightxx,rightyy],cnt);
    Render.Line(scr[0],scr[1],rightt[0],rightt[1],col);
    Render.Line(rightt[0],rightt[1],righttt[0],righttt[1],col);
    var leftx = scr[0]-range;
    var lefty = scr[1];
    var leftxx = scr[0]-range;
    var leftyy = scr[1]-range;
    var leftt = rotateAroundPoint(scr,[leftx,lefty],cnt);
    var lefttt = rotateAroundPoint(scr,[leftxx,leftyy],cnt);
    Render.Line(scr[0],scr[1],leftt[0],leftt[1],col);
    Render.Line(leftt[0],leftt[1],lefttt[0],lefttt[1],col);
    cnt+= Globals.Frametime() * ((GetValue("Better crosshair speed") / 3)*100);
}

//Hitmarker
var hitShots = [];
const hitgroup_to_hitbox = {1: 0, 2: 5, 3: 2, 4: 13, 5: 14, 6: 12, 7: 11};
function hitShotsHandle(){
	if (!Entity.IsAlive(Entity.GetLocalPlayer())) return;
	var size = 7;
	var disableTime = 250;
	for(shot in hitShots){
		var w2s = Render.WorldToScreen(hitShots[shot][1]);
		var time = hitShots[shot][2];
		if(time > disableTime){
			hitShots.splice(shot, 1);
			continue;
		}
		var screenX = w2s[0];
		var screenY = w2s[1];
		var alpha = 255 * (1 - (time / disableTime));
		if(checkbox_states["hitmarker"]){
			var color = UI.GetColor("Script items", "Hitmarker");
			color[3] = alpha;
			if(GetValue("Hitmarker in screen center")){
				var screenX = screen_size[0] / 2;
				var screenY = screen_size[1] / 2;
			}
			Render.Line(screenX + size, screenY + size, screenX + (size / 3), screenY + (size / 3), color);
        	Render.Line(screenX + size, screenY - size, screenX + (size / 3), screenY - (size / 3), color);
        	Render.Line(screenX - size, screenY - size, screenX - (size / 3), screenY - (size / 3), color);
        	Render.Line(screenX - size, screenY + size, screenX - (size / 3), screenY + (size / 3), color);
		}
		if(checkbox_states["damage_marker"]){
			var color = UI.GetColor("Script items", "Damage marker");
			screenY = screenY - 16 - (time);
			screenX = screenX - 15 + hitShots[shot][3];
			color[3] = alpha;
			var font = Render.AddFont("Verdana", 8, 600);
			var damage = hitShots[shot][0].toString();
			if(GetValue("Damage marker outline")){
			    Render.StringCustom(screenX + 1, screenY, 0, damage, [0, 0, 0, alpha], font);
			    Render.StringCustom(screenX - 1, screenY, 0, damage, [0, 0, 0, alpha], font);
			    Render.StringCustom(screenX, screenY + 1, 0, damage, [0, 0, 0, alpha], font);
			    Render.StringCustom(screenX, screenY - 1, 0, damage, [0, 0, 0, alpha], font);
			}
			Render.StringCustom(screenX, screenY, 0, damage, color, font);
		}
		hitShots[shot][2]++;
	}
}
function addHitShot(){
	if(!checkbox_states["hitmarker"] && !checkbox_states["damage_marker"]) return;
	var uid = Entity.GetEntityFromUserID(Event.GetInt("userid"));
	if (Entity.GetEntityFromUserID(Event.GetString("attacker")) == Entity.GetLocalPlayer()) {
		hitShots.push([Event.GetInt("dmg_health"), Entity.GetHitboxPosition(uid, hitgroup_to_hitbox[Event.GetInt("hitgroup")] != undefined ? hitgroup_to_hitbox[Event.GetInt("hitgroup")] : 3), 0, Math.floor(Math.random() * Math.floor(30))]);
	}
}

//Aspect ratio
function aspectRatio(){
	Convar.SetString("r_aspectratio", (slider_values["aspect_ratio"] / 100).toString());
}

//Autostrafe fix
function autostrafeFix(){
	if(!checkbox_states["autostrafe_fix"]) return;
	var speed = 2;
    var velocity = parseFloat(getVelocity(Entity.GetLocalPlayer()));
    UI.SetValue("Misc", "GENERAL", "Movement", "Turn speed", (velocity / 1.5) / speed);
}

//World color, bloom and FX
var nightmode_value = 0.1;
var nightmode_modelBrightness = 1.5;
function worldColor(){
	var props = 0;
	if(!Entity.GetLocalPlayer()) return;
	if(checkbox_states["world_color"]){
		var worldColor = UI.GetColor("Script items", "World color");
		Convar.SetFloat('mat_ambient_light_r', worldColor[0] / 100);
    	Convar.SetFloat('mat_ambient_light_g', worldColor[1] / 100);
    	Convar.SetFloat('mat_ambient_light_b', worldColor[2] / 100);
	}
	else{
		Convar.SetFloat('mat_ambient_light_r', 0);
    	Convar.SetFloat('mat_ambient_light_g', 0);
    	Convar.SetFloat('mat_ambient_light_b', 0);	
	}
	var worldBrightness = slider_values["world_brightness"];
	if(worldBrightness < 0){
		worldBrightness = 1 / Math.abs(worldBrightness / 2);
	}
	if(Convar.GetString("mat_force_tonemap_scale") != worldBrightness){
		Convar.SetString("mat_force_tonemap_scale", worldBrightness + "");
	}
}
function worldColor2(entity){
	var props = 0;
	if(props == 0){
		Entity.SetProp(entity, 'CEnvTonemapController', 'm_bUseCustomAutoExposureMin', true);
		Entity.SetProp(entity, 'CEnvTonemapController', 'm_bUseCustomAutoExposureMax', true);
		Entity.SetProp(entity, 'CEnvTonemapController', 'm_bUseCustomBloomScale', true);
		props = 1;
	}
	if(props == 1){
		//Entity.SetProp(entity, 'CEnvTonemapController', 'm_flCustomAutoExposureMin', slider_values["world_brightness"]);
		//Entity.SetProp(entity, 'CEnvTonemapController', 'm_flCustomAutoExposureMax', slider_values["world_brightness"]);
		Entity.SetProp(entity, 'CEnvTonemapController', 'm_flCustomBloomScale', slider_values["bloom_scale"] / 10);
	}
	var nightmodeAddition = (checkbox_states["darker_nightmode"]) ? nightmode_modelBrightness : 0;
	Convar.SetFloat("r_modelAmbientMin", slider_values["model_brightness"] / 10 + nightmodeAddition);
}

//Matchmaking FD
var fd_choke = [8, 8, 7, 6, 11, 12];
var fd_min_height = [49, 46, 47, 47, 47, 46];
var fd_max_height = [59, 56, 55, 53, 59, 60];
var doubletap_bak = false;
var hideshots_bak = false;
var duck_bak = false;
var fakelag_state_bak = UI.GetValue("Anti-Aim", "Fake-Lag", "Enabled");
var fakelag_limit_bak = UI.GetValue("Anti-Aim", "Fake-Lag", "Limit");
var fakelag_jitter_bak = UI.GetValue("Anti-Aim", "Fake-Lag", "Jitter");
var fakelag_triggers_bak = UI.GetValue("Anti-Aim", "Fake-Lag", "Triggers");
var fakelag_trigger_limit_bak = UI.GetValue("Anti-Aim", "Fake-Lag", "Trigger limit");
var legitaa_state_bak = UI.GetValue("Anti-Aim", "Legit Anti-Aim", "Enabled");
var fakeangles_state_bak = UI.GetValue("Anti-Aim", "Fake angles", "Enabled");
var block_set6 = false;
var set_lock_camera = false;
function mmFD(){
	if(!checkbox_states["mm_fd"]) return;
	UI.SetValue("Misc", "GENERAL", "Movement", "Fast crouch", true);
	local = Entity.GetLocalPlayer();
	var height = Math.floor(Entity.GetEyePosition(local)[2] - Entity.GetHitboxPosition(local, 12)[2]);
	var fd_type = GetValue("Matchmaking FD type");
	if(UI.IsHotkeyActive("Script items", "Matchmaking FD")){
		mmFDActive = true;
		var lock_camera = UI.IsHotkeyActive("Visual", "WORLD", "Thirdperson") && getVelocity(local) < 10 && GetValue("Matchmaking FD lock camera");
		/*var weapons = Entity.GetProp(local, "CBasePlayer", "m_hMyWeapons");
		Cheat.Print(typeof weapons + "\n");
		var clip = weapon = Entity.GetProp(local, "CBaseEntity", "m_iAmmo");
		Cheat.Print(clip + "\n");*/
		block_set6 = false;
		duck_bak = true;
		if(exploitsActive("dt")){
			doubletap_bak = true;
			UI.ToggleHotkey("Rage", "GENERAL", "Exploits", "Doubletap");
		}
		if(exploitsActive("hs")){
			hideshots_bak = true;
			UI.ToggleHotkey("Rage", "GENERAL", "Exploits", "Hide shots");
		}

		UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", 0);
		UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", fd_choke[fd_type]);
		UI.SetValue("Anti-Aim", "Fake-Lag", "Jitter", 0);
		UI.SetValue("Anti-Aim", "Fake-Lag", "Triggers", /*(1 << 2) + (1 << 7) + */0);
		UI.SetValue("Anti-Aim", "Fake-Lag", "Trigger limit", 0);
		UI.SetValue("Anti-Aim", "Legit Anti-Aim", "Enabled", false);
		UI.SetValue("Anti-Aim", "Fake angles", "Enabled", false);
		
		if(height <= fd_min_height[fd_type]){
			//Convar.SetString('cl_lock_camera', '1');
			var fl_st = UI.GetValue("Anti-Aim", "Fake-Lag", "Enabled");
			UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", 21);
			fakelag(false);

			if(fl_st == false){
				Cheat.ExecuteCommand("-duck");
			}
			else{
				return;
			}
		}
		if(height > fd_min_height[fd_type] && height < fd_max_height[fd_type]){
			if(lock_camera)
				Convar.SetString('cl_lock_camera', '1');
			UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", 0);
			fakelag(true);
		}
		if(height >= fd_max_height[fd_type]){
			if(lock_camera){
				if(!set_lock_camera){
					Convar.SetString('cl_lock_camera', '0');
					set_lock_camera = true;
				}
				else{
					Convar.SetString('cl_lock_camera', '1');
					set_lock_camera = false;
				}
			}
			UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", 0);
			fakelag(true);
			Cheat.ExecuteCommand("+duck");
			return;
		}
		else{
			if(lock_camera){
				if(fd_max_height[fd_type] - height <= 3){
					if(!set_lock_camera){
						Convar.SetString('cl_lock_camera', '0');
						set_lock_camera = true;
					}
					else{
						Convar.SetString('cl_lock_camera', '1');
						set_lock_camera = false;
					}
				}
			}
			else{
				Convar.SetString('cl_lock_camera', '0');
			}
		}
		Local.SetViewAngles(Local.GetViewAngles());
	}
	else{
		mmFDActive = false;
		if(!block_set6 && !legitAAactive){
			//Convar.SetString('cl_lock_camera', '0');
			fakelag(fakelag_state_bak);
			UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", yaw_bak);
			UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", jitter_bak);
			UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", fakelag_limit_bak);
			UI.SetValue("Anti-Aim", "Fake-Lag", "Jitter", fakelag_jitter_bak);
			UI.SetValue("Anti-Aim", "Fake-Lag", "Triggers", fakelag_triggers_bak);
			UI.SetValue("Anti-Aim", "Fake-Lag", "Trigger limit", fakelag_trigger_limit_bak);
			UI.SetValue("Anti-Aim", "Legit Anti-Aim", "Enabled", legitaa_state_bak);
			UI.SetValue("Anti-Aim", "Fake angles", "Enabled", fakeangles_state_bak);
			Convar.SetString('cl_lock_camera', '0');
			block_set6 = true;
		}
		if(!lowdelta_active && !legitAAactive){
			yaw_bak = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset");
			jitter_bak = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset");
			if(!noFakeLagOnRevolver){
				fakelag_state_bak = UI.GetValue("Anti-Aim", "Fake-Lag", "Enabled");
			}
			fakelag_limit_bak = UI.GetValue("Anti-Aim", "Fake-Lag", "Limit");
			fakelag_jitter_bak = UI.GetValue("Anti-Aim", "Fake-Lag", "Jitter");
			fakelag_triggers_bak = UI.GetValue("Anti-Aim", "Fake-Lag", "Triggers");
			fakelag_trigger_limit_bak = UI.GetValue("Anti-Aim", "Fake-Lag", "Trigger limit");
			legitaa_state_bak = UI.GetValue("Anti-Aim", "Legit Anti-Aim", "Enabled");
			fakeangles_state_bak = UI.GetValue("Anti-Aim", "Fake angles", "Enabled");
		}
		if(doubletap_bak == true){
			UI.ToggleHotkey("Rage", "GENERAL", "Exploits", "Doubletap");
			doubletap_bak = false;
		}
		if(hideshots_bak == true){
			UI.ToggleHotkey("Rage", "GENERAL", "Exploits", "Hide shots");
			hideshots_bak = false;
		}
		if(duck_bak == true){
			Cheat.ExecuteCommand("-duck");
			duck_bak = false;
		}
	}
}

//Effect on kill
var effect_alpha = 0;
var effect_size = 0;
var effect_duration = 3;
function effectOnKill(){
	if(!checkbox_states["effect_on_kill"]) return;
    if (effect_alpha === 0)
        return;

    const inc_alpha = ((1 / effect_duration) * Global.Frametime()) * 255
    const inc_size = ((1 / effect_duration) * Global.Frametime()) * 360

    effect_alpha = clamp(effect_alpha - inc_alpha, 0, 255);
    effect_size = clamp(effect_size - inc_size, 0, 360);

    const x = Global.GetScreenSize()[0], y = Global.GetScreenSize()[1];

    Render.GradientRect(0, 0, x, effect_size, 0, [128, 195, 255, effect_alpha], [128, 195, 255, 0]);
    Render.GradientRect(0, y - effect_size, x, effect_size, 0, [128, 195, 255, 0], [128, 195, 255, effect_alpha]);
    Render.GradientRect(x - effect_size, 0, effect_size, y, 1, [128, 195, 255, 0], [128, 195, 255, effect_alpha]);
    Render.GradientRect(0, 0, effect_size, y, 1, [128, 195, 255, effect_alpha], [128, 195, 255, 0]);
}
function effectOnKill2(){
	if(!checkbox_states["effect_on_kill"]) return;
    const attacker = Entity.GetEntityFromUserID(Event.GetInt("attacker"));
    const userid = Entity.GetEntityFromUserID(Event.GetInt("userid"));
    local = Entity.GetLocalPlayer();
    if(attacker === local && userid != local){
        effect_alpha = 100;
        effect_size = 150;
    }
}

//Alternative fakelag
var fakelag_tickcount = 0;
var fakelag_flip = false;
function alternativeFakelag() {
	if(!checkbox_states["alternative_fakelag"]) return;
	if(checkbox_states["mm_fd"] && UI.IsHotkeyActive("Script items", "Matchmaking FD")) return;
	UI.SetValue("Anti-Aim", "Fake-Lag", "Jitter", 0);
	//UI.SetValue("Anti-Aim", "Fake-Lag", "Triggers", (1 << 2) + (1 << 7));
	//UI.SetValue("Anti-Aim", "Fake-Lag", "Trigger limit", 7);
    var fakelag_1 = 3;
    var fakelag_2 = slider_values["alternative_limit"];
    if (fakelag_tickcount >= fakelag_2 && !fakelag_flip) {
        fakelag_flip = true;
        fakelag_tickcount = 0
    };
    if (fakelag_tickcount >= fakelag_1 && fakelag_flip) {
        fakelag_flip = false;
        fakelag_tickcount = 0
    };
    UI.SetValue('Anti-Aim', 'Fake-Lag', 'Limit', !fakelag_flip ? fakelag_2 : 0);
    fakelag_tickcount++
}
function alternativeFakelag2(){
	fakelag_tickcount = 0;
}

//Prefer baim on DT
function preferBaimOnDT(){
	if(!checkbox_states["prefer_baim_on_dt"]) return;
	if(exploitsActive("dt") && Exploit.GetCharge() === 1){
		UI.SetValue("Rage", "AUTO", "Accuracy", "Prefer body aim", true);
	}
	else{
		UI.SetValue("Rage", "AUTO", "Accuracy", "Prefer body aim", false);
	}	
}

//Doubletap boost
function doubletapBoost(){
	if(!checkbox_states["doubletap_boost"] && !checkbox_states["mm_dt"]){
		Exploit.EnableRecharge();
		return;
	};
	var gamerules = Entity.GetGameRulesProxy();
	var is_scoped = Entity.GetProp(Entity.GetLocalPlayer(), 'CCSPlayer', 'm_bIsScoped');
	var boost_type = GetValue("Doubletap boost");
	var charge = Exploit.GetCharge();
	(charge != 1) ? Exploit.EnableRecharge() : Exploit.DisableRecharge();
	if(!Entity.GetProp(gamerules, "CCSGameRulesProxy", "m_bIsValveDS") && checkbox_states["doubletap_boost"]){
		switch(boost_type){
			case 0:
				if(can_shift_shot(14) && charge != 1){
					Exploit.DisableRecharge();
					Exploit.Recharge();
				}
				break;
			case 1:
				if(can_shift_shot(5) && charge != 1){
					Exploit.DisableRecharge();
					Exploit.Recharge();
				}
				break;
			case 2:
				if(getWeaponName() === "ssg 08"){
					Exploit.DisableRecharge();
					if(can_shift_shot(16) && charge != 1){
						Exploit.DisableRecharge();
						Exploit.Recharge();
					}
					break;
				}
				if(can_shift_shot(12) && charge != 1){
    	    		Exploit.DisableRecharge();
    	    		Exploit.Recharge();
    	    	}
				if(isSlowwalking()){
					if (can_shift_shot(10) && charge != 1){
    	    	    	Exploit.DisableRecharge();
    	    	    	Exploit.Recharge();
    	    		}
				}
				break;
			case 3:
				if(getWeaponName() === "ssg 08"){
					Exploit.DisableRecharge();
					if(can_shift_shot(16) && charge != 1){
						Exploit.DisableRecharge();
						Exploit.Recharge();
					}
					break;
				}
				if(can_shift_shot(10) && charge != 1){
    	    		Exploit.DisableRecharge();
    	    		Exploit.Recharge();
    	    	}
				if(isSlowwalking()){
					if (can_shift_shot(10) && charge != 1){
    	    	    	Exploit.DisableRecharge();
    	    	    	Exploit.Recharge();
    	    		}
				}
				break;
		}
	}
	else if(checkbox_states["mm_dt"]){
		if(can_shift_shot(64) && charge != 1){
			Exploit.DisableRecharge();
			Exploit.Recharge();
		}
	}
}

//Zoom fix
function zoomFix(){
    if (Cheat.FrameStage() == 5) {
        var zoom_sens = Convar.GetFloat("zoom_sensitivity_ratio_mouse");
        if (checkbox_states["zoom_fix"]) {
            var zoom_current_sens = Convar.GetFloat("sensitivity");
            var zoom_fov = UI.GetValue("Visual", "WORLD", "View", "Field of view");
            var fixed_zoom_sens = zoom_fov / 100 * zoom_current_sens;
            if (zoom_sens != fixed_zoom_sens) {
                Cheat.ExecuteCommand("zoom_sensitivity_ratio_mouse " + fixed_zoom_sens);
                Cheat.ExecuteCommand("zoom_sensitivity_ratio_joystick " + fixed_zoom_sens);
            }
        }
        else{
        	if(zoom_sens != 1.0){
            	Cheat.ExecuteCommand("zoom_sensitivity_ratio_mouse 1");
            	Cheat.ExecuteCommand("zoom_sensitivity_ratio_joystick 1");
        	}
        }
    }
}

//Rainbow bar
var rainbow_bar_speed = 0.1;
function rainbowBar(){
	if(!checkbox_states["rainbow_bar"]) return;
	local = Entity.GetLocalPlayer();
	if(!local || !Entity.IsValid(local)) return;

	var screen_width = Math.round(Global.GetScreenSize()[0]);
	var bar_type = GetValue("Rainbow bar");

	var rgb = hsv2rgb(Global.Realtime() * rainbow_bar_speed, 1, 1);
	switch(bar_type){
    	case 0:
    		Render.FilledRect(0, 0, screen_width, 4, [rgb.r, rgb.g, rgb.b, 255]);
    		break;
    	case 1:
    		Render.GradientRect(0, 0, screen_width / 2, 4, 1, [rgb.g, rgb.b, rgb.r, 255], [rgb.r, rgb.g, rgb.b, 255]);
    		Render.GradientRect(screen_width / 2, 0, screen_width / 2, 4, 1, [rgb.r, rgb.g, rgb.b, 255], [rgb.b, rgb.r, rgb.g, 255]);
    		break;
	}
}

//Ideal yaw
function idealYaw(){
	if(!checkbox_states["ideal_yaw"]) return;
	if(lastHitTime + idealYawDelay > Global.Curtime()){
		return;
	}
	UI.SetValue("Anti-Aim", "Fake angles", "Hide real angle", true);
	const mode = 0;
	local = Entity.GetLocalPlayer();
    const origin = VectorNew(Entity.GetRenderOrigin(local));
    var yaw = Local.GetViewAngles()[1];
    var data = {left: 0, right: 0};
    for (var r = yaw - 90; r <= yaw + 90; r += 30){
        if (r === yaw)
            continue;
        const rad = degree_to_radian(r);
        const point = VectorOperate(
            origin,
            VectorNew([
                256 * Math.cos(rad),
                256 * Math.sin(rad),
                0
            ]),
            "+"
        );
        const line = Trace.Line(local, VectorToArray(origin), VectorToArray(point));
        const side = r < yaw ? "left" : "right";
        data[side] += line[1];
    }
    data.left /= 3;
    data.right /= 3;
    if (data.left > data.right){
    	update_anti_aim_state(_mode === 0 ? 0 : 1);
        return;
    }
    update_anti_aim_state(_mode === 0 ? 1 : 0)
}

//Nade circle
var he_positions = [];
var grenadeData = [];
var fadeOutSpeed = 5;
var sizeSpeed = 7;
function nadeCircle(){
	if(!checkbox_states["nade_circle"]) return;
    for (var i = 0; i < he_positions.length; i++) {
    	var circleColor = UI.GetColor("Script items", "HE circle");
        var wordLoc = he_positions[i];  
        var renderOrigin = Entity.GetRenderOrigin(Entity.GetLocalPlayer());
        var screenLoc = Render.WorldToScreen(wordLoc);
      
        var currentGrenadeData = grenadeData[i];

        var a = wordLoc[0] - renderOrigin[0];
        var b = wordLoc[1] - renderOrigin[1];
        var c = wordLoc[2] - renderOrigin[2];
      
        currentGrenadeData[0] += (sizeSpeed / 4) * 3 + ((sizeSpeed / 4) * (Math.sqrt(a * a + b * b + c * c) / 500)); //i know im genius :)
        currentGrenadeData[1] -= fadeOutSpeed * (Math.sqrt(a * a + b * b + c * c) / 250); //auto size mmmm

        //Fixing past braindead dev mistakes
        if(currentGrenadeData[1] < 0) currentGrenadeData[1] = 0;

        grenadeData[i] = currentGrenadeData;

        if (currentGrenadeData[1] < 1) {
            grenadeData.shift(i, 1);
            he_positions.shift(i, 1);
        }

        if (screenLoc[2] == 0) {
            return;
        }
      
        Render.Circle(screenLoc[0], screenLoc[1], currentGrenadeData[0], [circleColor[0], circleColor[1], circleColor[2], currentGrenadeData[1]]);
        Render.Circle(screenLoc[0], screenLoc[1], currentGrenadeData[0] + 1, [circleColor[0], circleColor[1], circleColor[2], currentGrenadeData[1]]);
    }
}

//Clantag on peek
function clantagOnPeek(){
	if(!checkbox_states["clantag_on_peek"]) return;
	if(exploitsActive("all")) return;
	var enemies = Entity.GetEnemies();
	var local_pos = ExtrapolateTick(15);
	for(var i = 0; i < enemies.length;i++){
		var enemy = enemies[i];
		if (!Entity.IsAlive(enemy) || Entity.IsDormant(enemy) || !Entity.IsValid(enemy)) continue;
		var pos = Entity.GetHitboxPosition(enemy, 2);
		var result = Trace.Bullet(Entity.GetLocalPlayer(), enemy, local_pos, pos);
		if(result[1] > 1){ // aka damage
			Local.SetClanTag("otc3 cord");
			return;
		}
	}
}

//Buy list made by @zxsleebu btw
var buy_list_width = 200;
var buy_list_hide = Globals.Curtime() + 20;
UI.AddSliderInt(name_text + "_buy_list_x", 0,screen_size[0]);
UI.AddSliderInt(name_text + "_buy_list_y", 0,screen_size[1]);
UI.SetEnabled("Script items", name_text + "_buy_list_x", false);
UI.SetEnabled("Script items", name_text + "_buy_list_y", false);
var buy_list_x = UI.GetValue("Script items", name_text + "_buy_list_x") || screen_size[0] - buy_list_width;
var buy_list_y = UI.GetValue("Script items", name_text + "_buy_list_y") || (screen_size[1] / 2) - (list_height / 2);
var buys = {};
var weapon_icons = {
	"weapon_deagle": "a",
	"weapon_elite": "b",
	"weapon_fiveseven": "c",
	"weapon_glock": "d",
	"weapon_ak47": "e",
	"weapon_aug": "f",
	"weapon_awp": "g",
	"weapon_famas": "h",
	"weapon_m249": "i",
	"weapon_g3sg1": "j",
	"weapon_galilar": "k",
	"weapon_m4a1": "l",
	"weapon_m4a1_silencer": "m",
	"weapon_mac10": "n",
	"weapon_hkp2000": "o",
	"weapon_mp5sd": "p",
	"weapon_ump45": "q",
	"weapon_xm1014": "r",
	"weapon_bizon": "s",
	"weapon_mag7": "t",
	"weapon_negev": "u",
	"weapon_sawedoff": "v",
	"weapon_tec9": "w",
	"weapon_taser": "x",
	"weapon_p250": "y",
	"weapon_mp7": "z",
	"weapon_mp9": "A",
	"weapon_nova": "B",
	"weapon_p90": "C",
	"weapon_scar20": "D",
	"weapon_sg556": "E",
	"weapon_ssg08": "F",
	"weapon_flashbang": "H",
	"weapon_hegrenade": "I",
	"weapon_smokegrenade": "J",
	"weapon_molotov": "K",
	"weapon_decoy": "L",
	"weapon_incgrenade": "M",
	"weapon_usp_silencer": "P",
	"weapon_cz75a": "Q",
	"weapon_revolver": "R",
	"item_assaultsuit": "S",
	"item_kevlar": "T",
	"item_defuser": "U",
};
var needToClearBuylist = false;
var buy_list_hide = 0;
function buyList(){
	if(!checkbox_states["buy_list"]) return;
	local = Entity.GetLocalPlayer();
	var gamerules = Entity.GetGameRulesProxy();
	if(!local || !Entity.IsValid(local) && !UI.IsMenuOpen()) return;
	if(Globals.Curtime() >= buy_list_hide && needToClearBuylist){
		clearBuyList();
	}
	var add_height = 0;
	Render.GradientRect(buy_list_x, buy_list_y, buy_list_width / 2, 2, 1, [218, 160, 87, 255], [255, 223, 150, 255]);
	Render.GradientRect(buy_list_x + buy_list_width / 2, buy_list_y, buy_list_width / 2, 2, 1, [255, 223, 150, 255], [218, 160, 87, 255]);
	Render.FilledRect(buy_list_x, buy_list_y + 2, buy_list_width, list_height - 2, [38, 40, 52, 90]);
	list_font = Render.AddFont("Segoe UI", 8, 900);
	var text_size = Render.TextSizeCustom("buy list", list_font);
	renderShadowText(buy_list_x + (buy_list_width / 2) - (text_size[0] / 2), buy_list_y + 2, "buy list", list_text_color, list_font);
	//Cheat.Print(Entity.GetProp(gamerules, "CCSGameRulesProxy", "m_bWarmupPeriod") + "\n");
	//if(Entity.GetProp(gamerules, "CCSGameRulesProxy", "m_bWarmupPeriod") == "true") return;
	var players = Object.keys(buys);
	for(i = 0; i < players.length; i++){
		var add_width = 0;
		var name = rus_to_latin(Entity.GetName(Entity.GetEntityFromUserID(players[i])));
		var name_size = Render.TextSizeCustom(name, list_font);
		renderShadowText(buy_list_x + 3, buy_list_y + list_height + add_height, name, list_text_color, list_font);
		for(a = 0; a < buys[players[i]].length; a++){
			var weapon = buys[players[i]][a];
			Render.String(buy_list_x + 2 + add_width, buy_list_y + list_height + add_height + 15, 0, weapon_icons[weapon], [0, 0, 0, 100], 5);
			Render.String(buy_list_x + 1 + add_width, buy_list_y + list_height + add_height + 14, 0, weapon_icons[weapon], list_text_color, 5);
			add_width += Render.TextSize(weapon_icons[weapon], 5)[0] - 1;
		}
		add_height += 32;
	}
}
function moveBuyList(){
	if(!checkbox_states["buy_list"]) return;
	if(!UI.IsMenuOpen()) return;
	if(is_moving) return;
	cursor_pos = Input.GetCursorPosition();
	if(!Input.IsKeyPressed(0x01)){
		buy_list_is_moving = false;
		buy_list_old_cursor = cursor_pos;
	}
	if((cursor_pos[0] >= buy_list_x && cursor_pos[0] <= buy_list_x + buy_list_width && cursor_pos[1] >= buy_list_y && cursor_pos[1] <= buy_list_y + list_height) || (buy_list_is_moving)){
		buy_list_is_moving = true;
		buy_list_x = clamp(cursor_pos[0] - buy_list_old_cursor[0] + buy_list_x, 0, screen_size[0] - buy_list_width);
		buy_list_y = clamp(cursor_pos[1] - buy_list_old_cursor[1] + buy_list_y, 0, screen_size[1] - list_height);
		buy_list_old_cursor = cursor_pos;
		UI.SetValue("Script items", name_text + "_buy_list_x", buy_list_x);
		UI.SetValue("Script items", name_text + "_buy_list_y", buy_list_y);
	}
}
function addWeaponInBuyList(){
	if(!checkbox_states["buy_list"]) return;

	if(Event.GetInt("team") === Entity.GetProp(Entity.GetLocalPlayer(), "CBaseEntity", "m_iTeamNum")) return;
	var weapon = Event.GetString("weapon");
	var player = Event.GetInt("userid");
	if(player in buys){
		buys[player].push(weapon);
	}
	else{
		buys[player] = [weapon];
	}
}
function clearBuyList(){
	buys = {};
	needToClearBuylist = false;
}
function hideBuyList(){
	needToClearBuylist = true;
	buy_list_hide = Globals.Curtime() + parseInt(Convar.GetString("mp_buytime")/* - Convar.GetString("mp_freezetime")*/) + 5;
}

//Vote revealer
var vote_options = [];
function voteRevealer(){
	if(!checkbox_states["vote_revealer"]) return;
	var entid = Event.GetInt("entityid");
	if(!entid) return;
	var team = Event.GetInt("team");
    var option = Event.GetInt("vote_option");
    var name = Entity.GetName(entid);
    var chTeam = "null";
    switch (team) {
        case 0: chTeam = "[N] "; break; case 1: chTeam = "[S] "; break;
        case 2: chTeam = "[T] "; break; case 3: chTeam = "[CT] "; break;
        default: chTeam = "[UNK] "; break;
    }
    
    var vote = vote_options[option];
    Global.PrintColor([217, 217, 217, 255], "[onetap] \0");
    Global.Print(chTeam + name + " voted " + vote + "\n");
    Global.PrintChat(chTeam + name + " voted " + vote);
}
function onVoteOptions() {
    vote_options[0] = Event.GetString("option1");
    vote_options[1] = Event.GetString("option2");
    vote_options[2] = Event.GetString("option3");
    vote_options[3] = Event.GetString("option4");
    vote_options[4] = Event.GetString("option5");
}

//Agent Changer
var agent_list = {
	"'TwoTimes' McCoy": "CT",
	"Seal Team 6 Soldier": "CT",
	"Buckshot": "CT",
	"Lt. Commander Ricksaw": "CT",
	"Dragomir": "T",
	"Rezan The Ready": "T",
	"Maximus": "T",
	"Blackwolf": "T",
	"The Doctor' Romanov": "T",
	"B Squadron Officer": "CT",
	"3rd Commando Company": "CT",
	"Special Agent Ava": "CT",
	"Operator": "CT",
	"Markus Delrow": "CT",
	"Michael Syfers": "CT",
	"Enforcer": "T",
	"Slingshot": "T",
	"Soldier": "T",
	"The Elite Mr. Muhlik": "T",
	"Ground Rebel": "T",
	"Osiris": "T",
	"Prof. Shahmat": "T"
};
var newAgents = {
	"'Blueberries' Buckshot": "CT",
	"New 'Two Times' McCoy": "CT",
	"'Dead Cold' Jamison": "CT",
	"1st Lieutenant Farlow": "CT",
	"John 'Van Healen' Kask": "CT",
	"Bio-Haz Specialist": "CT",
	"Sergeant Bombson": "CT",
	"Chem-Haz Specialist": "CT",
	"Rezan the Redshirt": "T",
	"Bloody Miami Darryl": "T",
	"Safecracker Voltzmann": "T",
	"Little Kev": "T",
	"Getaway Sally": "T",
	"Number K": "T",
	"Bloody Silent Darryl": "T",
	"Bloody Skullhead Darryl": "T",
	"Bloody Darryl Royale": "T",
	"Bloody Loudmouth Darryl": "T",
	"Street Soldier": "T",
	"New Dragomir": "T"
};
var agentsModels = {
	"'Blueberries' Buckshot": "ctm_st6_variantj",
	"New 'Two Times' McCoy": "ctm_st6_variantl",
	"'Dead Cold' Jamison": "ctm_swat_variante",
	"1st Lieutenant Farlow": "ctm_swat_variantf",
	"John 'Van Healen' Kask": "ctm_swat_variantg",
	"Bio-Haz Specialist": "ctm_swat_varianth",
	"Sergeant Bombson": "ctm_swat_varianti",
	"Chem-Haz Specialist": "ctm_swat_variantj",
	"Rezan the Redshirt": "tm_balkan_variantk",
	"Bloody Miami Darryl": "tm_professional_varf",
	"Safecracker Voltzmann": "tm_professional_varg",
	"Little Kev": "tm_professional_varh",
	"Getaway Sally": "tm_professional_varj",
	"Number K": "tm_professional_vari",
	"Bloody Silent Darryl": "tm_professional_varf1",
	"Bloody Skullhead Darryl": "tm_professional_varf2",
	"Bloody Darryl Royale": "tm_professional_varf3",
	"Bloody Loudmouth Darryl": "tm_professional_varf4",
	"Street Soldier": "tm_phoenix_varianti",
	"New Dragomir": "tm_balkan_variantl"
};
//Fix this if you want ↓↓↓ this code tries to change an agent to new from Broken Fang operation. idk why it throws an error
function agentChanger(){
	if(!checkbox_states["agent_changer"]) return;
    if(Cheat.FrameStage() != 2) return;
    local = Entity.GetLocalPlayer();
    var team = Entity.GetProp(local,"DT_BaseEntity", "m_iTeamNum")
    if(team == 2){ // T
        UI.SetValue("Misc", "SKINS", "Player", "Player model", getAgent("T", GetValue("T agent")));
        //setModel("T", GetValue("T agent"));
    }
    else if(team == 3){ // CT
        UI.SetValue("Misc", "SKINS", "Player", "Player model", getAgent("CT", GetValue("CT agent")));
        //setModel("CT", GetValue("CT agent"));
    }
}
function getAgents(team){
	var agents = ["None"];
	var agent_names = Object.keys(agent_list);
	for(i = 0; i < agent_names.length; i++){
		var name = agent_names[i];
		if(agent_list[name] !== team && team !== "all") continue;
		agents.push(agent_names[i]);
	}
	/*newAgents_names = Object.keys(newAgents);
	for(i = 0; i < newAgents_names.length; i++){
		var name = newAgents_names[i];
		if(newAgents[name] !== team && team !== "all") continue;
		agents.push(newAgents_names[i]);
	}*/
	return agents;
}
function getAgent(team, id){
	return getAgents("all").indexOf(getAgents(team)[id]);
}
/*function setModel(team, id){
	if(getAgents(team)[id] in agentsModels){
		Cheat.ExecuteCommand('script function ChangeAgent(n_class,p=null){{while((p=Entities.FindByClassname(p,n_class))!=null){p.SetModel("models/player/custom_player/legacy/'+getAgents(team)[id]+'.mdl")}}}')
		Cheat.ExecuteCommand('script ChangeAgent("player")');
	}
}*/

//Custom fog
function customFog(){
	if(!checkbox_states["custom_fog"]){
		if (Convar.GetString("fog_override") !== "0"){
            Convar.SetString("fog_override", "0");
        }
        return;
	}
	if (Convar.GetString("fog_override") !== "1"){
        Convar.SetString("fog_override", "1");
    }
    var color = UI.GetColor("Script items", "Fog color");
    var color_value = color[0] + " " + color[1] + " " + color[2];
    var distance = slider_values["fog_distance"].toString();
    var density = (slider_values["fog_density"] / 100).toString();

    if (Convar.GetString("fog_color") != color_value){
      Convar.SetString("fog_color", color_value);
    }
    if (Convar.GetString("fog_end") != distance){
      Convar.SetString("fog_start", "0");
      Convar.SetString("fog_end", distance);
    }
    if (Convar.GetString("fog_maxdensity") != density){
        Convar.SetString("fog_maxdensity", density);
    }
    if(checkbox_states["useless_features"] && UI.IsHotkeyActive("Visual", "WORLD", "Thirdperson")){
    	Convar.SetString("fog_end", slider_values["fog_distance_3rd"].toString());
    }
}

//Watermark
var last_fps = Math.floor(1 / Global.Frametime());
function watermark(){
	if(!checkbox_states["watermark"]) return;
	UI.SetValue("Misc", "PERFORMANCE & INFORMATION", "Watermark", false);
	var elements_count = 0;
	var watermark_width = 10;
	list_font = Render.AddFont("Segoe UI", 8, 900);
	var elements = GetValue("Watermark elements");
	var cheat_name = "onetap";
	var username = GetValue("Watermark custom name") || Cheat.GetUsername();
	var ping = Math.floor(Global.Latency() * 1000 / 1.6);
	var fps = Math.floor((1 / Global.Frametime() + last_fps) / 2);
	last_fps = fps;
	if((fps + "").length == 2) fps = "0" + fps;
	var today = new Date();
    var hours1 = today.getHours();
    var minutes1 = today.getMinutes();
	var seconds1 = today.getSeconds();
    var hours = hours1 <= 9 ? "0"+hours1+":" : hours1+":";
    var minutes = minutes1 <= 9 ? "0" + minutes1+":" : minutes1+":";
	var seconds = seconds1 <= 9 ? "0" + seconds1 : seconds1;
	var margin = 7;
	watermark_width += (cheat_name_width = Render.TextSizeCustom(cheat_name, list_font)[0]) + margin;
	if(elements & (1 << 0)){
		elements_count++;
		watermark_width += (username_width = Render.TextSizeCustom(username, list_font)[0]) + margin;
	}
	if(elements & (1 << 1)){
		elements_count++;
		watermark_width += (ping_width = Render.TextSizeCustom(ping + "ms", list_font)[0]) + margin;
	}
	if(elements & (1 << 2)){
		elements_count++;
		watermark_width += (fps_width = Render.TextSizeCustom(fps + "FPS", list_font)[0]) + margin;
	}
	if(elements & (1 << 3)){
		elements_count++;
		watermark_width += (tickrate_width = Render.TextSizeCustom(Globals.Tickrate() + " ticks", list_font)[0]) + margin;
	}
	if(elements & (1 << 4)){
		elements_count++;
		watermark_width += (version_width = Render.TextSizeCustom(version, list_font)[0]) + margin;
	}
	if(elements & (1 << 5)){
		elements_count++;
		watermark_width += (time_width = Render.TextSizeCustom(hours + minutes + seconds, list_font)[0]) + margin;
	}
	var watermark_x = screen_size[0] - margin - watermark_width;
	var watermark_y = 9;
	var watermark_text_y = watermark_y + 3;
	var render_offset = 0;
	var rendered_elements = 0;
	Render.GradientRect(screen_size[0] - margin - watermark_width, watermark_y, watermark_width / 2, 2, 1, [218, 160, 87, 255], [255, 223, 150, 255]);
	Render.GradientRect(watermark_x + watermark_width / 2, watermark_y, watermark_width / 2, 2, 1, [255, 223, 150, 255], [218, 160, 87, 255]);
	Render.FilledRect(watermark_x, watermark_y + 2, watermark_width, list_height - 2, [38, 40, 52, 90]);
	var render_x = watermark_x + margin + render_offset;
	renderShadowText(watermark_x + margin, watermark_text_y, cheat_name, white_color, list_font);
	render_offset += cheat_name_width + margin;
	if(rendered_elements < elements_count) renderShadowText(watermark_x + render_offset + 1, watermark_text_y, "|", white_color, list_font);
	if(elements & (1 << 0)){
		renderShadowText(watermark_x + margin + render_offset, watermark_text_y, username, white_color, list_font);
		render_offset += username_width + margin;
		rendered_elements++;
		if(rendered_elements < elements_count) renderShadowText(watermark_x + render_offset + 1, watermark_text_y, "|", white_color, list_font);
	}
	if(elements & (1 << 1)){
		renderShadowText(watermark_x + margin + render_offset, watermark_text_y, ping + "ms", white_color, list_font);
		render_offset += ping_width + margin;
		rendered_elements++;
		if(rendered_elements < elements_count) renderShadowText(watermark_x + render_offset + 1, watermark_text_y, "|", white_color, list_font);
	}
	if(elements & (1 << 2)){
		renderShadowText(watermark_x + margin + render_offset, watermark_text_y, fps + "FPS", white_color, list_font);
		render_offset += fps_width + margin;
		rendered_elements++;
		if(rendered_elements < elements_count) renderShadowText(watermark_x + render_offset + 1, watermark_text_y, "|", white_color, list_font);
	}
	if(elements & (1 << 3)){
		renderShadowText(watermark_x + margin + render_offset, watermark_text_y, Globals.Tickrate() + " ticks", white_color, list_font);
		render_offset += tickrate_width + margin;
		rendered_elements++;
		if(rendered_elements < elements_count) renderShadowText(watermark_x + render_offset + 1, watermark_text_y, "|", white_color, list_font);
	}
	if(elements & (1 << 4)){
		renderShadowText(watermark_x + margin + render_offset, watermark_text_y, version, white_color, list_font);
		render_offset += version_width + margin;
		rendered_elements++;
		if(rendered_elements < elements_count) renderShadowText(watermark_x + render_offset + 1, watermark_text_y, "|", white_color, list_font);
	}
	if(elements & (1 << 5)){
		renderShadowText(watermark_x + margin + render_offset, watermark_text_y, hours + minutes + seconds, white_color, list_font);
		render_offset += time_width + margin;
		rendered_elements++;
	}
}

//Nade tracer
var nade_positions = [];
var nade_tracer_max_dist = 50;
function nadeTracer(){
	if (!checkbox_states["nade_tracer"]) return;

	const length = 256, rate = 0.1;
    const color = UI.GetColor("Script", "Nade tracer");

    for (g in nade_positions){
        if (Globals.Curtime() - nade_positions[g][3] > 3 || !Entity.IsValid(nade_positions[g][0])){
            nade_positions.shift();
            continue;
        }

        if (Globals.Curtime() - nade_positions[g][1] > rate){
            if (nade_positions[g][2].length > length){
                nade_positions[g][2].shift();
                nade_positions[g][1] = Globals.Curtime();
            }

            nade_positions[g][2].push(Entity.GetRenderOrigin(nade_positions[g][0]));
        }

        const is_he = Entity.GetClassID(nade_positions[g][0]) === 9, is_inferno = Entity.GetClassID(nade_positions[g][0]) === 100;
        const owner = Entity.GetProp(nade_positions[g][0], "CBaseCSGrenadeProjectile", "m_hOwnerEntity");
    	if(!is_he && !is_inferno && owner) continue;

        for (l in nade_positions[g][2]){
            pos = Render.WorldToScreen(nade_positions[g][2][l]);

            if (l > 0) {
                last = Render.WorldToScreen(nade_positions[g][2][l - 1]);

                //why??
                //i wanna thin, not bold :)

                /*Render.Line(pos[0] - 1, pos[1] - 1, last[0] - 1, last[1] - 1, color);
                Render.Line(pos[0] - 1, pos[1] + 1, last[0] - 1, last[1] + 1, color);
                Render.Line(pos[0] + 1, pos[1] - 1, last[0] + 1, last[1] - 1, color);*/
                Render.Line(pos[0] + 1, pos[1] + 1, last[0] + 1, last[1] + 1, color);
                Render.Line(pos[0], pos[1], last[0], last[1], color);
            }

            last = Render.WorldToScreen(nade_positions[g][2][nade_positions[g][2].length - 1]);
        }
    }
}
function nadeTracer2(){
	if (!checkbox_states["nade_tracer"]) return;

    var grenades = Entity.GetEntitiesByClassID(9).concat(Entity.GetEntitiesByClassID(113)).concat(Entity.GetEntitiesByClassID(100));
    for (e in grenades) {

        var should_pass = false;
        for (g in nade_positions) {
            if (nade_positions[g][0] == grenades[e]) {
                should_pass = true;
                continue;
            }
        }

        if (should_pass) continue;

        nade_positions.push([grenades[e], Globals.Curtime(), [Entity.GetRenderOrigin(grenades[e])], Globals.Curtime()]);
    }
}

//Nade warning
function nadeWarning(){ 
    if(!checkbox_states["nade_warning"] && !checkbox_states["molotov_timer"]) return;
    var grenades = Entity.GetEntitiesByClassID(9).concat(Entity.GetEntitiesByClassID(113)).concat(Entity.GetEntitiesByClassID(100));

    local = Entity.GetLocalPlayer();
    if (!local) return;
    
    if (!Entity.IsAlive(local)){
        const obs = Entity.GetProp(local, "CBasePlayer", "m_hObserverTarget");

        if (!Entity.IsValid(obs)) return;
        
        local = obs;
    }

    const origin = Entity.GetEyePosition(local);

    for (var i = 0; i < grenades.length; i++){
        const g = grenades[i];

        const destination = Entity.GetRenderOrigin(g);
        const distance = get_metric_distance(origin, destination);
        const is_he = Entity.GetClassID(g) === 9, is_inferno = Entity.GetClassID(g) === 100;
        

        if (distance > nade_tracer_max_dist) continue;

        const screen = Render.WorldToScreen(destination);

        const trace = Trace.Line(local, origin, destination);

        const is_safe = distance > (is_inferno ? 4 : 8) || trace[1] < 0.61;

        if(!is_he && !is_inferno) continue;

        if(is_he && Entity.GetProp(g, "CBaseCSGrenadeProjectile", "m_nExplodeEffectTickBegin")) continue;
        if(is_he && Entity.GetProp(g, "CBaseCSGrenadeProjectile", "m_hThrower") === local) continue;

        //If it is flashbang we skip it
        if(is_he && Entity.GetProp(g, "CBaseGrenade", "m_flDamage") === 100) continue;

        Render.FilledCircle(screen[0], screen[1] - 50, 30, !is_safe ? [225, 20, 20, 175 ] : [20, 20, 20, 175]);
        Render.String(screen[0], screen[1] - 75, 1, "!", [255, 250, 175, 200], 4);
        if(is_he && checkbox_states["nade_warning"]){
        	var armor = Entity.GetProp(local, "CCSPlayerResource", "m_iArmor");
        	var health = Entity.GetProp(local, "CBasePlayer", "m_iHealth");
        	var x = origin[0] - destination[0];
        	var y = origin[1] - destination[1];
        	var z = origin[2] - destination[2];
        	const distance = Math.sqrt(x * x + y * y + z * z);
        	const a = 105.0;
        	const b = 25.0;
        	const c = 140.0;
        	const d = (distance - b) / (c+1);
        	var damage = (a - 18) * Math.exp(-d * d);
        	if(armor > 0) {
            	var newDmg = damage * 0.5;
            	var armorDmg = (damage - newDmg) * 0.5;
 
            	if(armorDmg > armor) {
        		    armor = armor * (1 / 0.5);
        		    newDmg = damage - armorDmg;
        		}
        		damage = newDmg;
        	}
        	damage = clamp(Math.ceil(damage) - 1, 0, 100);

        	Render.String(screen[0], screen[1] - 40, 1, damage + " dmg", [232, 232, 232, 200], 3);
        }

        if (is_inferno && checkbox_states["molotov_timer"]){
        	if(!checkbox_states["molotov_timer"]) return;
            const time = Entity.GetProp(g, "CInferno", "m_nFireEffectTickBegin") * Globals.TickInterval();
            const factor = clamp(((time + 7) - Globals.Curtime()) / 7, 0, 7);
            Render.String(screen[0], screen[1] - 40, 1, ((time + 7) - Globals.Curtime()).toFixed(1) + " s", [232, 232, 232, 200], 3);
            renderArc(screen[0], screen[1] - 50, 30, 32, -90, 360 * factor, [232, 232, 232, 200]);
        }
    }
}

//Anti bruteforce
var lastHitTime = 0.0;
var lastImpactTimes = [0.0];
var lastImpacts = [[0.0, 0.0, 0.0]];
var idealYawDelay = 3;
var idealYawBak = UI.GetValue("Anti-Aim", "Fake angles", "Hide real angle");
var block_set8 = false;
function antiBruteforce(){
	if (!checkbox_states["anti_brute"]) return;
	if (checkbox_states["lowdelta"] && isSlowwalking()) return;

    var curtime = Global.Curtime();
    if (Math.abs(lastHitTime - curtime) < 0.5) return;

    var entity = Entity.GetEntityFromUserID(Event.GetInt("userid"));
    var impact = [Event.GetFloat("x"), Event.GetFloat("y"), Event.GetFloat("z"), curtime];
    var source;
    if (Entity.IsValid(entity) && Entity.IsEnemy(entity)){
        if (!Entity.IsDormant(entity)){
            source = Entity.GetEyePosition(entity);
        }
        else if (Math.abs(lastImpactTimes[entity] - curtime) < 0.1){
            source = lastImpacts[entity];
        }
        else{
            lastImpacts[entity] = impact;
            lastImpactTimes[entity] = curtime;
            return;
        }
        local = Entity.GetLocalPlayer();
        var localEye = Entity.GetEyePosition(local);
        var localOrigin = Entity.GetProp(local, "CBaseEntity", "m_vecOrigin");
        var localBody = VectorMultiply(VectorAdd(localEye, localOrigin), [0.5, 0.5, 0.5]);

        var bodyVec = ClosestPointOnRay(localBody, source, impact);
        var bodyDist = VectorDistance(localBody, bodyVec);
        
        if (bodyDist < 128.0){	//he clearly shot at us!
            var realAngle = Local.GetRealYaw();
            var fakeAngle = Local.GetFakeYaw();

            var headVec = ClosestPointOnRay(localEye, source, impact);
            var headDist = VectorDistance(localEye, headVec);
            var feetVec = ClosestPointOnRay(localOrigin, source, impact);
            var feetDist = VectorDistance(localOrigin, feetVec);

            var closestRayPoint;
            var realPos;
            var fakePos;

            if (bodyDist < headDist && bodyDist < feetDist){	//that's a pelvis    
            	//pelvis direction = goalfeetyaw + 180 
                closestRayPoint = bodyVec;
                realPos = ExtendVector(bodyVec, realAngle + 180.0, 10.0);
                fakePos = ExtendVector(bodyVec, fakeAngle + 180.0, 10.0);
            }
            else if (feetDist < headDist){//ow my toe
            	//toe direction = goalfeetyaw -30 +- 90
                closestRayPoint = feetVec;
                var realPos1 = ExtendVector(bodyVec, realAngle - 30.0 + 90.0, 10.0);
                var realPos2 = ExtendVector(bodyVec, realAngle - 30.0 - 90.0, 10.0);
                var fakePos1 = ExtendVector(bodyVec, fakeAngle - 30.0 + 90.0, 10.0);
                var fakePos2 = ExtendVector(bodyVec, fakeAngle - 30.0 - 90.0, 10.0);
                if (VectorDistance(feetVec, realPos1) < VectorDistance(feetVec, realPos2)){
                    realPos = realPos1;
                }
                else{
                    realPos = realPos2;
                }
                if (VectorDistance(feetVec, fakePos1) < VectorDistance(feetVec, fakePos2)){
                    fakePos = fakePos1;
                }
                else{
                    fakePos = fakePos2;
                }
            }
            else{	//ow my head i feel like i slept for 2 days
                closestRayPoint = headVec;
                realPos = ExtendVector(bodyVec, realAngle, 10.0);
                fakePos = ExtendVector(bodyVec, fakeAngle, 10.0);
            }

            if (VectorDistance(closestRayPoint, fakePos) < VectorDistance(closestRayPoint, realPos)){	//they shot at our fake. they will probably not gonna shoot it again.
                lastHitTime = curtime;
                UI.SetValue("Anti-Aim", "Fake Angles", "Hide real angle", false);
                UI.ToggleHotkey("Anti-Aim", "Fake angles", "Inverter");
                block_set8 = false;
            }
            else{
            	if(!block_set8){
            		UI.SetValue("Anti-Aim", "Fake Angles", "Hide real angle", idealYawBak);
            		block_set8 = true;
            	}
            	idealYawBak = UI.GetValue("Anti-Aim", "Fake angles", "Hide real angle");
            }
        }

        lastImpacts[entity] = impact;
        lastImpactTimes[entity] = curtime;
    }
}
function antiBruteforce2(){
	if (!checkbox_states["anti_brute"]) return;
	if (checkbox_states["lowdelta"] && isSlowwalking()) return;
    if (Entity.GetEntityFromUserID(Event.GetInt("userid")) !== Entity.GetLocalPlayer()) return;
    var hitbox = Event.GetInt('hitgroup');

    if (hitbox == 1 || hitbox == 6 || hitbox == 7){	//head, both toe
        var curtime = Global.Curtime();
        if (Math.abs(lastHitTime - curtime) > 0.5){   //0.2s backtrack + 0.2 extand + 0.1 extra
            lastHitTime = curtime;
            block_set8 = false;
            UI.SetValue("Anti-Aim", "Fake Angles", "Hide real angle", false);
            UI.ToggleHotkey("Anti-Aim", "Fake angles", "Inverter");
        }
        else{
        	if(!block_set8){
            	UI.SetValue("Anti-Aim", "Fake Angles", "Hide real angle", idealYawBak);
            	block_set8 = true;
            }
        }
    }
}
function antiBruteforce3(){
	if (!checkbox_states["anti_brute"]) return;
	if(lastHitTime + idealYawDelay <= Global.Curtime()){
		if(!block_set8){
        	UI.SetValue("Anti-Aim", "Fake Angles", "Hide real angle", idealYawBak);
        	block_set8 = true;
        }
	}
	else{
		UI.SetValue("Anti-Aim", "Fake Angles", "Hide real angle", false);
		block_set8 = false;
	}
}

//Arms color changer
function armsColor(){
	if(!checkbox_states["arms_color"]) return;
    var team = Entity.GetProp(Entity.GetLocalPlayer(),"DT_BaseEntity", "m_iTeamNum");
    if(team == 2){ // T
    	if(Convar.GetString("r_skin") == GetValue("T arms color")) return;
    	Global.ExecuteCommand("r_skin " + GetValue("T arms color"));
    }
    else if(team == 3){ // CT
    	if(Convar.GetString("r_skin") == GetValue("CT arms color")) return;
    	Global.ExecuteCommand("r_skin " + GetValue("CT arms color"));
    }
}

//Better glow chams
function betterGlowChams(){
	var name = "Better glow chams";
    var mat_index = Material.Get(name);
    if (mat_index > 0){
        Material.SetKeyValue(mat_index, "$baseTexture", "vgui/white");
        var additive = checkbox_states["better_glow_chams_hollow"];
        Material.SetKeyValue(mat_index, "$additive", additive ? "1" : "0")
        Material.SetKeyValue(mat_index, "$envmap", "models/effects/cube_white")
        Material.SetKeyValue(mat_index, "$envmapfresnel", "1")
        
        var color = UI.GetColor("Script items", name);
        if(checkbox_states["better_glow_chams_rainbow"]){
        	/*color = hsv2rgb(Globals.Realtime() / 5 % 1, 1, 1);
            color = [color.r, color.g, color.b];
            color[0] /= 10;
            color[1] /= 10;
            color[2] /= 10;*/
            color = rgb(15 / 500);
        }
        if(checkbox_states["better_glow_chams_pulse"]){
            var speed = 7
            var additive = 5
            var intensity = 0.6
            var sine = (Math.sin(Globals.Realtime() * 7) + 5) * intensity
            color[0] *= sine
            color[1] *= sine
            color[2] *= sine
        }
        var wireframe = checkbox_states["better_glow_chams_wireframe"];
        Material.SetKeyValue(mat_index, "$wireframe", wireframe ? "1" : "0");
        var vibrancy = slider_values["better_glow_chams_vibrancy"] / 10;
        Material.SetKeyValue(mat_index, "$envmapfresnelminmaxexp",  "[0 " + (11-vibrancy) + " " + ((11-vibrancy) * 2) + "]");
        Material.SetKeyValue(mat_index, "$envmaptint", "[" + color[0]/255 + " " + color[1]/255 + " " + color[2]/255 + "]");
        Material.SetKeyValue(mat_index, "$alpha", color[3] / 255 + "");
        Material.Refresh(mat_index);
    }
}
var betterGlowChamsRegistered = false;
function registerBetterGlowChams(){
	if(!checkbox_states["better_glow_chams"]){
		betterGlowChamsRegistered = false;
        Material.Destroy("Better glow chams");
    	return;
	}
	if(!betterGlowChamsRegistered){
		Material.Create("Better glow chams");
		betterGlowChamsRegistered = true;
	}
}

//Ping spike on key
function pingSpikeOnKey(){
	if(!checkbox_states["ping_spike"]) return;
	UI.SetValue("Misc", "GENERAL", "Extended backtracking", UI.IsHotkeyActive("Script items", "Ping spike"));
}

//AA and fake-lag fixes
//bayonet, karambit, shadow daggers, knife
var pitch_bak = UI.GetValue("Anti-Aim", "Extra", "Pitch");
var restrictions_bak = UI.GetValue("Misc", "PERFORMANCE & INFORMATION", "Information", "Restrictions");
var legitAAactive = false;
var noFakeLagOnRevolver = false;
var block_set11 = false;
var block_set12 = false;
function fixes(){
	var weapon = getWeaponName();
	if(checkbox_states["fakelag_fix"]){
		if(weapon == "r8 revolver" && !mmFDActive){
			Cheat.Print("no fakelag");
			noFakeLagOnRevolver = true;
			block_set11 = false;
			UI.SetValue("Anti-Aim", "Fake-Lag", "Enabled", 0);
		}
		else if(!mmFDActive){
			noFakeLagOnRevolver = false;
			if(!block_set11){
				UI.SetValue("Anti-Aim", "Fake-Lag", "Enabled", fakelag_state_bak);
				block_set11 = true;
			}
			fakelag_state_bak = UI.GetValue("Anti-Aim", "Fake-Lag", "Enabled");
		}
	}
}

var generalHitchanceBak = UI.GetValue("Rage", "GENERAL", "Accuracy", "Hitchance");
var block_set15 = false;
function zeusHitchance(){
	if(!checkbox_states["zeus_hitchance_enabled"]) return;
	player = Entity.GetLocalPlayer(); weapon = Entity.GetWeapon(player); weaponName = Entity.GetName(weapon);
	if (weaponName.includes("zeus")){
		block_set15 = false;
		UI.SetValue("Rage", "GENERAL", "Accuracy", "Hitchance", slider_values["zeus_hitchance"]);
	}
	else{
		if(!block_set15){
			UI.SetValue("Rage", "GENERAL", "Accuracy", "Hitchance", generalHitchanceBak);
			block_set15 = true;
		}
		generalHitchanceBak = UI.GetValue("Rage", "GENERAL", "Accuracy", "Hitchance");
	}
}

//Enemy eye tracers
function eyeTracers(){
	if(!checkbox_states["eye_tracers"]) return;
	var color = UI.GetColor("Script Items", "Eye tracers");
    if(!Entity.GetLocalPlayer())
        return;

    var playerList = Entity.GetEnemies();
    for(var i = 0; i < playerList.length; i++){
        if(!Entity.IsAlive(playerList[i]) || Entity.IsDormant(playerList[i]))
            continue;

        var eyeAngles = Entity.GetProp(playerList[i], "CCSPlayer", "m_angEyeAngles");
        var e_V = angle_to_vec(eyeAngles[0], eyeAngles[1]);

        var entityHead = Entity.GetHitboxPosition(playerList[i], 0); //HITBOX_HEAD

        var stop = [entityHead[0] + e_V[0] * 8192, entityHead[1] + e_V[1] * 8192, entityHead[2] + e_V[2] * 8192];

        var traceResult = Trace.Line(playerList[i], entityHead, stop);

        if(traceResult[1] == 1.0)
            continue;

        stop = [entityHead[0] + e_V[0] * traceResult[1] * 8192, entityHead[1] + e_V[1] * traceResult[1] * 8192, entityHead[2] + e_V[2] * traceResult[1] * 8192];

        entityHead = Render.WorldToScreen(entityHead);
        stop = Render.WorldToScreen(stop);

        if(stop[2] != 1 || entityHead[2] != 1)
            continue;

        Render.Line(entityHead[0], entityHead[1], stop[0], stop[1], color);
    }
}

//Dark menu background
var menuBackgroundColor = [0, 0, 0, 0];
function darkMenu(){
	if(!checkbox_states["dark_menu"]) return;
	var maxAlpha = 150;
	var speed = 20;
    
    Render.FilledRect(0, 0, screen_size[0], screen_size[1], menuBackgroundColor);
    
    if(UI.IsMenuOpen()){
        menuBackgroundColor[3] = clamp(menuBackgroundColor[3] + speed, 0, maxAlpha);
    }
    else{
        menuBackgroundColor[3] = clamp(menuBackgroundColor[3] - speed, 0, maxAlpha);
    }
}

//Enemy location spammer
var locationLastTick = 0;
function enemyLocation(){
	if(!checkbox_states["enemy_location"]) return;
    if (locationLastTick == 0) {
        locationLastTick = Global.Tickcount();
        return;
    }

    var SpamDelay = 96;
    var CurrentTickcount = Global.Tickcount();
    if(CurrentTickcount - locationLastTick < SpamDelay){
        return;
    }
    else if(CurrentTickcount - locationLastTick > SpamDelay){
        locationLastTick = CurrentTickcount;
    }

    var enemies = Entity.GetEnemies();

    for(i = 0; i < enemies.length; i++){
		if(Entity.IsAlive(enemies[i])){
			var Name = Entity.GetName(enemies[i]);
			var Location = Entity.GetProp(enemies[i], "CBasePlayer", "m_szLastPlaceName");
			var Health = Entity.GetProp(enemies[i], "CBasePlayer", "m_iHealth");
			var Weapon =  Entity.GetName(Entity.GetWeapon(enemies[i]));

			var SendInfo = ("[onetap] Player " + Name + " with " + Health + " HP " + " is at " + Location + " with weapon " + Weapon);
			Cheat.ExecuteCommand("say_team " + SendInfo);
		}
    }
}

//Party mode
var old_party_mode = false;
function partyMode(){
	var party_mode = checkbox_states["party_mode"];
    
    if(old_party_mode != party_mode){
        old_party_mode = party_mode;
        Convar.SetString("sv_party_mode", party_mode ? "1" : "0");
    }
}
function partyMode2(){
	var party_mode = checkbox_states["party_mode"];
    Convar.SetString("sv_party_mode", party_mode ? "1" : "0");
}

//Music kit changer
function musicKit(){
	if (Cheat.FrameStage() != 1 || !checkbox_states["music_kit"])
        return;
      
    Entity.SetProp(Entity.GetLocalPlayer(), "CCSPlayerResource", "m_nMusicID", GetValue("Music kit"));
}

//Indicator
var indicator_names = [
	["DMG", ["Script items", "Min damage override"], [255, 133, 0, 255]],
	["DT", ["Rage", "GENERAL", "Exploits", "Doubletap"], [74, 207, 0, 255]],
	["HIDE", ["Rage", "GENERAL", "Exploits", "Hide shots"], [199, 34, 53, 255]],
	["ONSHOT", ["Script items", "Force backshoot"], [74, 207, 0, 255]],
	["FAKEDUCK", ["Anti-Aim", "Extra", "Fake duck"], [157, 157, 157, 255]],
	["LOWDELTA", null, [0, 222, 222, 255]],
	["BAIM", ["Rage", "GENERAL", "General", "Force body aim"], [199, 34, 53, 255]],
	["SAFE POINTS", ["Rage", "GENERAL", "General", "Force safe point"], [0, 222, 222, 255]],
	["LEGIT AA", null, [0, 222, 222, 255]],
	["FREESTANDING", ["Script items", "Freestanding"], [0, 222, 222, 255]],
];
function indicators(){
	if(!checkbox_states["indicators"]) return;
	local = Entity.GetLocalPlayer();
	if(!local || !Entity.IsValid(local) || !Entity.IsAlive(local)) return;
	var active_binds = [];
	var binds_offset = 0;
	var font = Render.AddFont("Verdana", 7, 400);
	var crosshair_size = GetValue("Better crosshair length") || 0;
	if(GetValue("Desync strength indicator") && !betterScopeActive){
		var size = 1.25;
		var x = screen_size[0];
    	var y = screen_size[1];
		var col = UI.GetColor("Script items", "Desync strength");
		var real_yaw = Local.GetRealYaw();
    	var fake_yaw = Local.GetFakeYaw();
    	var delta = Math.min(Math.abs(real_yaw - fake_yaw) / 2, 60).toFixed(0);
    	Render.GradientRect(x / 2, y / 2 + 8 + crosshair_size, (size * delta), 5, 1, col, [0, 0, 0, 0]);
    	Render.GradientRect((x / 2 - size * delta) + 1, y / 2 + 8 + crosshair_size, (size * delta), 5, 1, [0, 0, 0, 0], col);
	}
	if(GetValue("Desync strength indicator")) binds_offset += 8;
	for(bind in indicator_names){
		var bind_name = indicator_names[bind][0];
		var bind_path = indicator_names[bind][1];
		if(bind_path != null && UI.IsHotkeyActive.apply(null, bind_path)){
			active_binds.push(bind);
		}
		if(bind_name == "FAKEDUCK" && mmFDActive && !(bind in active_binds)){
			active_binds.push(bind);
		}
		if(bind_name == "LOWDELTA" && (lowdelta_active || mmFDActive)){
			active_binds.push(bind);
		}
		if(bind_name == "LEGIT AA" && legitAAactive){
			active_binds.push(bind);
		}
	}
	for(active_bind in active_binds){
		var bind = active_binds[active_bind];
		var name = indicator_names[bind][0];
		var color = indicator_names[bind][2];
		var text_size = Render.TextSizeCustom(name, font);
		var text_height = text_size[1];
		Render.StringCustom(screen_size[0] / 2 - ((betterScopeActive) ? (-GetValue("Better scope thickness") - 4) : (text_size[0] / 2)), screen_size[1] / 2 + 6 + binds_offset + crosshair_size, 0, name, color, font);
		binds_offset = binds_offset + text_height;
	}
}

//Killsay
function killsay(){
	if(!checkbox_states["killsay"]) return;
	local = Entity.GetLocalPlayer();
	if(Entity.GetEntityFromUserID(Event.GetInt("userid")) === local) return;
	if(Entity.GetEntityFromUserID(Event.GetInt("attacker")) !== local) return;
	if(Event.GetInt("headshot") == 1 || GetValue("Killsay toxic mode")){
		Cheat.ExecuteCommand("say 1");
		return;
	}
	if(Event.GetInt("noscope") == 1){
		Cheat.ExecuteCommand("say EZ");
		return;
	}
	Cheat.ExecuteCommand("say *DEAD*");
}

//Legit AA on key and on knife
var block_set10 = false;
var block_set16 = false;
var legitAAactive = false;
function legitAA(){
	var weapon = getWeaponName();
	var local_isKnife = (weapon.indexOf("knife") !== -1 || weapon.indexOf("bayonet") !== -1 || weapon.indexOf("karambit") !== -1 || weapon.indexOf("shadow daggers") !== -1);
	var noAAonKnife = local_isKnife && checkbox_states["antiaim_fix"];
	if((checkbox_states["legit_aa"] && UI.IsHotkeyActive("Script items", "Legit AA")) || noAAonKnife){
		legitAAactive = true;
		block_set16 = false;
		block_set10 = false;
		UI.SetValue("Misc", "PERFORMANCE & INFORMATION", "Information", "Restrictions", 0);
		UI.SetValue("Anti-Aim", "Extra", "Pitch", 0);
		UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", 180);
		UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", 0);
	}
	else{
		legitAAactive = false;
		if(!lowdelta_active && !mmFDActive){
			if(!block_set10){
				UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", yaw_bak);
				UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", jitter_bak);
				block_set10 = true;
			}
			yaw_bak = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset");
			jitter_bak = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset");
		}
		if(!block_set16){
			UI.SetValue("Anti-Aim", "Extra", "Pitch", pitch_bak);
			UI.SetValue("Misc", "PERFORMANCE & INFORMATION", "Information", "Restrictions", restrictions_bak);
			block_set16 = true;
		}
    	pitch_bak = UI.GetValue("Anti-Aim", "Extra", "Pitch");
		restrictions_bak = UI.GetValue("Misc", "PERFORMANCE & INFORMATION", "Information", "Restrictions");
	}
}

function freestanding(){
	if(!checkbox_states["freestanding"]) return;
	UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Auto direction", UI.IsHotkeyActive("Script items", "Freestanding"));
}

var otc3_cord_clantag = [
	" ",
	"0",
	"o",
	"o7",
	"ot",
	"ot<",
	"otc",
	"otc3",
	"otc3 <",
	"otc3 c",
	"otc3 c0",
	"otc3 co",
	"otc3 co2",
	"otc3 cor",
	"otc3 cord",
	"-otc3 cord-",
	"--otc3 cord--",
	"--otc3 cord--",
	"--otc3 cord--",
	"--otc3 cord--",
	"--otc3 cord--",
	"-otc3 cord-",
	"otc3 cord",
	"-tc3 cor-",
	"--c3 co--",
	"---3 c---",
	"----------",
	"-------",
	"-----",
	"---",
	" ",
	" ",
	" ",
	" ",
];
var otc3_cord_clantag2 = [
	"^_^",
	"~_~",
	"^_^",
	"^_^",
	"^_^",
	"^_^",
	"^.^",
	"^.^",
	"^.^ 3",
	"^.^ <3",
	"^.^ <3",
	"^_^ <3",
	"^_^ <3",
	"^_^ <3",
	"^_^ <3",
	"^_^ <3",
	"^_^ <3",
	"^_^ <3",
	"^_^ <",
	"^_^ ",
	"^_^",
	"^_^",
	"^_^",
	"^_^",
	"^_^",
	"^_^",
];
var last_clantag_time = 0;
function clantag(){
	if(!checkbox_states["clantag"]) return;
	var speed = 4;
	var time = parseInt((Globals.Curtime() * speed));
	if (time == last_clantag_time) return;
	last_clantag_time = time;
	if(GetValue("Clantag")){
		Local.SetClanTag(otc3_cord_clantag2[(time) % otc3_cord_clantag2.length]);
		return;
	}
	Local.SetClanTag(otc3_cord_clantag[(time) % otc3_cord_clantag.length]);
}






//Script items
var script_items = {
	"lowdelta": [
		{"name": "Lowdelta", "type": "dropdown", "elements": ["Slowwalk", "Always"]},
		{"name": "Lowdelta on FD", "type": "checkbox"}
	],
	"mindamage": [{"name": "Min damage override", "type": "hotkey"}],
	"lethal_safety": [
		{"name": "Lethal safety", "type": "multi", "elements": ["Force safe point", "Force baim"]}
	],
	"mm_fd": [
		{"name": "Matchmaking FD", "type": "hotkey"},
		{"name": "Matchmaking FD type", "type": "dropdown", "elements": ["Legit (49-59)", "Semirage (46-56)", "Rage (47-55)", "Lower Rage (47-53)", "Semifull (47-59)", "Full (46-60)"]},
		{"name": "Matchmaking FD lock camera", "type": "checkbox"}
		//{"name": "Matchmaking FD forward yaw", "type": "checkbox"},
		//{"name": "Matchmaking FD lowdelta", "type": "checkbox"}
	],
	"doubletap_boost": [{"name": "Doubletap boost", "type": "dropdown", "elements": ["Faster recharge", "Fastest recharge", "Adaptive", "Adaptive agressive"]}],
	"force_backshoot": [{"name": "Force backshoot", "type": "hotkey"}],
	"ping_spike": [{"name": "Ping spike", "type": "hotkey"}],
	"freestanding": [{"name": "Freestanding", "type": "hotkey"}],
	"legit_aa": [{"name": "Legit AA", "type": "hotkey"}],
	"bullet_tracer": [{"name": "Bullet tracer", "type": "color"}],
	"damage_marker": [
		{"name": "Damage marker", "type": "color"},
		{"name": "Damage marker outline", "type": "checkbox"}
	],
	"skeleton_on_hit": [
		{"name": "Skeleton Hit Color", "type": "color"},
		{"name": "Skeleton Kill Color", "type": "color"}
	],
	"eye_tracers": [
		{"name": "Eye tracers", "type": "color"}
	],
	"trail": [
		{"name": "Trail", "type": "color"},
		{"name": "Trail rainbow", "type": "checkbox"}
	],
	"better_scope": [
		{"name": "Better scope hide GUI", "type": "checkbox"},
		{"name": "Better scope viewmodel", "type": "checkbox"},
		{"name": "Better scope position", "type": "slider", "min": -4, "max" : 4},
		{"name": "Better scope thickness", "type": "slider", "min": 0, "max" : 4},
		{"name": "Better scope start", "type": "slider", "min": 0, "max": 50},
		{"name": "Better scope color 1", "type": "color"},
		{"name": "Better scope color 2", "type": "color"}
	],
	"better_crosshair": [
		{"name": "Better crosshair", "type": "color"},
		{"name": "Better crosshair rainbow", "type": "checkbox"},
		{"name": "Better crosshair speed", "type": "slider", "min": 0, "max": 10},
		{"name": "Better crosshair length", "type": "slider", "min": 0, "max": 100}
	],
	"hitmarker": [
		{"name": "Hitmarker", "type": "color"},
		{"name": "Hitmarker in screen center", "type": "checkbox"}
	],
	"rainbow_bar": [{"name": "Rainbow bar", "type": "dropdown", "elements": ["Single color", "Gradient"]}],
	"nade_circle": [
		{"name": "Molotov circle fill", "type": "color"},
		{"name": "Molotov circle outline", "type": "color"},
		{"name": "Smoke circle fill", "type": "color"},
		{"name": "Smoke circle outline", "type": "color"},
		{"name": "HE circle", "type": "color"}
	],
	"nade_tracer": [{"name": "Nade tracer", "type": "color"}],
	"transparency_on_nade": [
		{"name": "Wall transparency", "type": "slider", "min": 0, "max": 25},
		{"name": "Prop transparency", "type": "slider", "min": 0, "max": 100}
	],
	"agent_changer": [
		{"name": "T agent", "type": "dropdown", "elements": getAgents("T")},
		{"name": "CT agent", "type": "dropdown", "elements": getAgents("CT")}
	],
	"arms_color": [
		{"name": "T arms color", "type": "dropdown", "elements": ["Default", "Nigger", "Brown", "Asian", "Red", "Tatoo", "White"]},
		{"name": "CT arms color", "type": "dropdown", "elements": ["Default", "Nigger", "Brown", "Asian", "Red", "Tatoo", "White"]}
	],
	"better_glow_chams": [
		{"name": "Better glow chams", "type": "color"},

	],
	"world_color": [{"name": "World color", "type": "color"}],
	"custom_fog": [{"name": "Fog color", "type": "color"}],
	"music_kit": [{"name": "Music kit", "type": "slider", "min": 1, "max": 41}],
	"killsay": [{"name": "Killsay toxic mode", "type": "checkbox"}],
	"indicators": [{"name": "Desync strength indicator", "type": "checkbox"}, {"name": "Desync strength", "type": "color"}],
	"watermark": [
		{"name": "Watermark elements", "type": "multi", "elements": ["Username", "Ping", "FPS", "Tickrate", name_text + " version", "Time"]},
		{"name": "Watermark custom name", "type": "textbox"}
	],
	"clantag": [
		{"name": "Clantag", "type": "dropdown", "elements": ["otc3 cord", "^_^"]}
	]
};

//OTHER FUNCTIONS
var world_pos1;
function entities(){
	var entities = Entity.GetEntities();
	for (var i = 0; i < entities.length; i++){
		var entity = entities[i];
		var name = Entity.GetClassName(entity);
		var world_pos = Entity.GetRenderOrigin(entities[i]);
		if (name === "CEnvTonemapController"){
			worldColor2(entity);
		}
		if (name === "CInferno"){
       		draw_circle_3d(world_pos[0], world_pos[1], world_pos[2], 180, 360, 0.150, UI.GetColor("Script items", "Molotov circle fill"), true, UI.GetColor("Script items", "Molotov circle outline"));
		}
		if(name === "CSmokeGrenadeProjectile"){ 
			var world_pos = Entity.GetRenderOrigin(entities[i]);
			draw_circle_3d(world_pos[0], world_pos[1], world_pos[2], 149, 360, 0.150, UI.GetColor("Script items", "Smoke circle fill"), true, UI.GetColor("Script items", "Smoke circle outline"));
		}
	}
}

function players(){
	var players = Entity.GetPlayers();
	for (var i = 0; i < players.length; i++){
		return;
		var player = players[i];
		var nickname = Entity.GetName(player);
		//if(player === local) continue;
		var clan = Entity.GetProp(player, "CCSPlayerResource", "m_szClan");
		if(Entity.IsBot(player)) continue;
		//if(clan == "" || !clan) continue;
		//Cheat.Print(clan);
		//Cheat.Print(nickname + "\n");
		//if(clan.length !== 9) continue;
		var command = clan[8];
		var nickname_length = nickname.length;
		nickname_length = clamp(nickname_length, 0, 9);
		if(clan[0] !== "!") continue;
		Cheat.Print(1 + "\n");
		if(clan[1] !== nickname_length) continue;
		Cheat.Print(2 + "\n");
		if(clan[2] !== "c" || clan[3] !== "r") continue;
		Cheat.Print(3 + "\n");
		if(clan[4] !== nickname[1]) continue;
		Cheat.Print(4 + "\n");
		if(clan[5] !== nickname[5]) continue;
		Cheat.Print(5 + "\n");
		if(clan[6] !== "." || (clan[7] !== "&" && clan[7] !== "$")) continue;
		//Cheat.Print(6 + "\n");
		//Cheat.Print(command);
	}
}

function updateVars(){
	screen_size = Render.GetScreenSize();
	cursor_pos = Input.GetCursorPosition();
}

function on_weapon_fire(){
	var shooter = Entity.GetEntityFromUserID(Event.GetInt("userid"));
	last_shot_time[shooter] = Globals.Tickcount();
	local = Entity.GetLocalPlayer();
	if(checkbox_states["invert_on_shot"] && shooter == local){
		UI.ToggleHotkey("Anti-Aim", "Fake angles", "Inverter");
	}
}

function on_player_connect(){
	var entity = Entity.GetEntityFromUserID(Event.GetInt("userid"));
	if(entity != Entity.GetLocalPlayer()) return;
	//Resetting vars
	last_shot_time = [];
	disableTime = 0; hitmarkerTime = 0; didKill = 0;
	buys = {};
	effect_alpha = 100; effect_size = 150;
	he_positions = []; grenadeData = [];
	nade_positions = [];
	lastHitTime = 0.0;
	lastImpactTimes = [0.0];
	lastImpacts = [[0.0, 0.0, 0.0]];
}

function resetVars(){
	var entity = Entity.GetEntityFromUserID(Event.GetInt("userid"));
	if(entity != Entity.GetLocalPlayer()) return;
	//Resetting vars
	last_shot_time = [];
	disableTime = 0; hitmarkerTime = 0; didKill = 0;
	buys = {};
	effect_alpha = 100; effect_size = 150;
	he_positions = []; grenadeData = [];
	nade_positions = [];
	if(Convar.GetString("cl_lock_camera") !== "0"){
		Convar.SetString('cl_lock_camera', '0');
	}
}

function on_hegrenade_detonate() {
    worldLocation = [Event.GetInt("x"), Event.GetInt("y"), Event.GetInt("z")];
	he_positions.push(worldLocation);
    grenadeData.push([2, 255]);
}

function renderShadowText(x, y, text, color, font){
	Render.StringCustom(x + 1, y + 1, 0, text, [0, 0, 0, 100], font);
	Render.StringCustom(x, y, 0, text, color, font);
}

function forceBaim(){
	forcedBaim = true;
	if(!UI.IsHotkeyActive('Rage', 'GENERAL', 'Force body aim')) UI.ToggleHotkey('Rage', 'GENERAL', 'Force body aim');
}
function DisableBaim(){
    if(UI.IsHotkeyActive('Rage', 'GENERAL', 'Force body aim')) UI.ToggleHotkey('Rage', 'GENERAL', 'Force body aim');
}

function ExtrapolateTick(ticks) {
	local = Entity.GetLocalPlayer();
    var head = Entity.GetHitboxPosition(local, 0),
        velocity = Entity.GetProp(local, 'CBasePlayer', 'm_vecVelocity[0]'),
        array = [];
    return array[0] = head[0] + velocity[0] * Globals.TickInterval() * ticks, array[1] = head[1] + velocity[1] * Globals.TickInterval() * ticks, array[2] = head[2] + velocity[2] * Globals.TickInterval() * ticks, array;
}

function IsLethal(player) {
    var health = Entity.GetProp(player, 'CBasePlayer', 'm_iHealth');
    pelvis_pos = Entity.GetHitboxPosition(player, 2),
    body_pos = Entity.GetHitboxPosition(player, 3),
    thorax_pos = Entity.GetHitboxPosition(player, 4);
    local = Entity.GetLocalPlayer();
    result_thorax = Trace.Bullet(local, player, Entity.GetEyePosition(local), thorax_pos);
    if (result_thorax[1] >= health) return true;
    result_thorax_extrapolated = Trace.Bullet(local, player, ExtrapolateTick(14), thorax_pos);
    if (result_thorax_extrapolated[1] >= health) return Ragebot.ForceTargetSafety(player), true;
    return false;
}

function isInAir(){
	var fv = Entity.GetProp(Entity.GetLocalPlayer(), "CBasePlayer", "m_flFallVelocity");
	if(fv < -1 || fv > 1){
		return true;
	}
	return false;
}

function angle_diff(angle_1, angle_2){
    var delta = angle_1 - angle_2;
    delta %= 360;
    if(delta > 180)
    {
        delta -= 360;
    }
    if(delta < -180)
    {
        delta += 360;
    }
    return delta;
}

function closestTarget(){
    var enemies = Entity.GetEnemies();
    var dists = [];
    var damage = [];
    for(e in enemies) {
        if(!Entity.IsAlive(enemies[e]) || Entity.IsDormant(enemies[e]) || !Entity.IsValid(enemies[e])) continue;
        dists.push([enemies[e], calcDist(Entity.GetHitboxPosition(Entity.GetLocalPlayer(), 0), Entity.GetHitboxPosition(enemies[e], 0))]);
    }
    dists.sort(function(a, b)
    {
        return a[1] - b[1];
    });
    if(dists.length == 0 || dists == []) return target = -1; 
    return dists[0][0];
}

// clean dist func, thanks rzr
function calcDist(a, b){
    var x = a[0] - b[0];
    var y = a[1] - b[1];
    var z = a[2] - b[2];
    return Math.sqrt(x * x + y * y + z * z);
}

function get_metric_distance(a, b){
    return Math.floor(Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2) + Math.pow(a[2] - b[2], 2)) * 0.0254);
}

function radians_to_degrees(radians) {
  return radians * (180 / Math.PI);
}

function angle_to_vec(pitch, yaw){
    var p = degree_to_radian(pitch);
    var y = degree_to_radian(yaw)

    var sin_p = Math.sin(p);
    var cos_p = Math.cos(p);
    var sin_y = Math.sin(y);
    var cos_y = Math.cos(y);

    return [cos_p*cos_y, cos_p*sin_y, -sin_p];
}


function rotateAroundPoint(center, point, angle){
    angle = angle / 180 * Math.PI;
    var x = Math.cos(angle) * (point[0] - center[0]) - Math.sin(angle) * (point[1] - center[1]) + center[0];
    var y = Math.sin(angle) * (point[0]-center[0]) + Math.cos(angle) * (point[1] - center[1]) + center[1];
    return [x, y];
}
function hsv2rgb(h, s, v){
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
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    }
}

function draw_circle_3d(x, y, z, radius, degrees, start_at, fill_clr, filled, clr){
	var accuracy = 10;
	var old_x, old_y;
	start_at = start_at + 1;
	for(rot = start_at; rot < degrees + start_at + 1; rot += accuracy){
		rot_r = rot*(Math.PI/180)
		line_x = radius * Math.cos(rot_r) + x, line_y = radius * Math.sin(rot_r) + y
		var curr = Render.WorldToScreen([line_x, line_y, z]), cur = Render.WorldToScreen([x, y, z]);
		if(cur[0] != null && curr[0] != null && old_x != null){
			if (filled) Render.Polygon([[curr[0], curr[1]], [old_x, old_y], [cur[0], cur[1]]], fill_clr)
			Render.Line(curr[0], curr[1], old_x, old_y, clr);
			Render.Line(curr[0] - 1, curr[1] - 1, old_x - 1, old_y - 1, clr);
			//Render.Line(curr[0] - 2, curr[1] - 2, old_x - 2, old_y - 2, clr);
		}
		old_x = curr[0], old_y = curr[1];
	}
}

function renderArc(x, y, r1, r2, s, d, col){
    for (var i = s; i < s + d; i++){
        const rad = i * Math.PI / 180;
        Render.Line(x + Math.cos(rad) * r1, y + Math.sin(rad) * r1, x + Math.cos(rad) * r2, y + Math.sin(rad) * r2, col);
    }
}

function can_shift_shot(ticks_to_shift) {
	local = Entity.GetLocalPlayer();
    var wpn = Entity.GetWeapon(local);

    if (local == null || wpn == null)
        return false;

    var tickbase = Entity.GetProp(local, "CCSPlayer", "m_nTickBase");
    var curtime = Globals.TickInterval() * (tickbase-ticks_to_shift)

    if (curtime < Entity.GetProp(local, "CCSPlayer", "m_flNextAttack"))
        return false;

    if (curtime < Entity.GetProp(wpn, "CBaseCombatWeapon", "m_flNextPrimaryAttack"))
        return false;

    return true;
}

function rus_to_latin(str){
    var ru = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 
        'е': 'e', 'ё': 'e', 'ж': 'j', 'з': 'z', 'и': 'i', 
        'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 
        'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 
        'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 
        'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'u', 'я': 'ya'
    }, n_str = [];
    str = str.replace(/[ъь]+/g, '').replace(/й/g, 'i');
    for(var i = 0; i < str.length; ++i){
    	n_str.push(
    		ru[str[i]]
    	    || ru[str[i].toLowerCase()] == undefined && str[i]
    	    || ru[str[i].toLowerCase()].toUpperCase()
    	);
    }
    return n_str.join('');
}

function getWeaponName(){
	return Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer()));
}

function isSlowwalking(){
	return UI.IsHotkeyActive("Anti-Aim", "Extra", "Slow walk");
}

function getVelocity(player){
	var velocity = Entity.GetProp(player, "CBasePlayer", "m_vecVelocity[0]");
	return Math.sqrt(velocity[0] * velocity[0] + velocity[1] * velocity[1]);
}

function fakelag(state){
	UI.SetValue("Anti-Aim", "Fake-Lag", "Enabled", state);
}

function alp(c, a) {
  return [c[0], c[1], c[2], a]
}

function clamp(v, min_int, max_int){
    return Math.max(Math.min(v, max_int), min_int);
}

function VectorNew(array){
	return {
        x: array[0],
        y: array[1],
        z: array[2]
    }
}

function VectorToArray(vector) {
    return [vector['x'], vector['y'], vector['z']]
}

function VectorOperate(a, b, operation) {
    switch (operation){
	    case '+':
	        return {
	            x: a.x + b.x,
	            y: a.y + b.y,
	            z: a.z + b.z
	        };
	    case '-':
	        return {
	            x: a.x - b.x,
	            y: a.y - b.y,
	            z: a.z - b.z
	        };
	    case '*':
	        return {
	            x: a.x * b.x,
	            y: a.y * b.y,
	            z: a.z * b.z
	        };
	    case '/':
	        return {
	            x: a.x / b.x,
	            y: a.y / b.y,
	            z: a.z / b.z
	        };
	}
}

var meme_text = "CTACcord";

function degree_to_radian(degree){
    return degree * Math.PI / 180.0;
}

function ExtendVector(vector, angle, extension){
    var radianAngle = degree_to_radian(angle);
    return [extension * Math.cos(radianAngle) + vector[0], extension * Math.sin(radianAngle) + vector[1], vector[2]];
}

function VectorAdd(a, b){
    return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function VectorDot(a, b){
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function VectorLength(x, y, z){
    return Math.sqrt(x * x + y * y + z * z);
}

function VectorNormalize(vec){
    var length = VectorLength(vec[0], vec[1], vec[2]);
    return [vec[0] / length, vec[1] / length, vec[2] / length];
}

function VectorSubtract(a, b){
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function VectorMultiply(a, b){
    return [a[0] * b[0], a[1] * b[1], a[2] * b[2]];
}

function VectorDistance(a, b){
    return VectorLength(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

function ClosestPointOnRay(target, rayStart, rayEnd){
    var to = VectorSubtract(target, rayStart);
    var dir = VectorSubtract(rayEnd, rayStart);
    var length = VectorLength(dir[0], dir[1], dir[2]);
    dir = VectorNormalize(dir);

    var rangeAlong = VectorDot(dir, to);
    if (rangeAlong < 0.0)
    {
        return rayStart;
    }
    if (rangeAlong > length)
    {
        return rayEnd;
    }
    return VectorAdd(rayStart, VectorMultiply(dir, [rangeAlong, rangeAlong, rangeAlong]));
}


function setHotkey(path, state){
	if(UI.IsHotkeyActive(path) !== state){
		UI.ToggleHotkey(path);
	}
}

function update_anti_aim_state(state) {
    if(UI.GetValue('Rage', 'GENERAL', 'General', 'Enabled')){
        if (UI.IsHotkeyActive('Anti-Aim', 'Fake angles', 'Inverter') !== state){
            UI.ToggleHotkey('Anti-Aim', 'Fake angles', 'Inverter');
        }
        return;
    }
}

function exploitsActive(type){
	var hideshots = UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Hide shots") && UI.GetValue("Rage", "GENERAL", "Exploits", "Hide shots");
	var doubletap = UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap") && UI.GetValue("Rage", "GENERAL", "Exploits", "Doubletap");
	if(type == "hs"){
		return hideshots;
	}
	if(type == "dt"){
		return doubletap;
	}
	if(type == "all"){
		return (hideshots || doubletap);
	}
}

for(var element in script_items){
	for(i = 0; i < script_items[element].length; i++){
		addScriptItem(script_items[element][i]);
	}
}
function addScriptItem(item){
	if(item["type"] == "color"){
		UI.AddColorPicker(item["name"]);
	}
	if(item["type"] == "hotkey"){
		UI.AddHotkey(item["name"]);
	}
	if(item["type"] == "checkbox"){
		UI.AddCheckbox(item["name"]);
	}
	if(item["type"] == "dropdown"){
		UI.AddDropdown(item["name"], item["elements"]);
	}
	if(item["type"] == "slider"){
		UI.AddSliderInt(item["name"], item["min"], item["max"]);
	}
	if(item["type"] == "multi"){
		UI.AddMultiDropdown(item["name"], item["elements"]);
	}
	if(item["type"] == "textbox"){
		UI.AddTextbox(item["name"]);
	}
}

function scriptItems(){
	show_items = GetValue("Show " + name_text + " items");
	for(var checkbox in checkbox_states){
		if(checkbox in script_items){
			if(checkbox_states[checkbox] == true){
				for(i = 0; i < script_items[checkbox].length; i++){
					UI.SetEnabled("Script items", script_items[checkbox][i]["name"], show_items);
				}
			}
			else{
				for(i = 0; i < script_items[checkbox].length; i++){
					UI.SetEnabled("Script items", script_items[checkbox][i]["name"], false);
				}
			}
		}
	}
}

UI.IsCursorInBox = function(x, y, width, height) {
    var cursor = Input.GetCursorPosition()
    if (cursor[0] > x && cursor[0] < x + width && cursor[1] > y && cursor[1] < y + height)
        return true
    return false
}


function GetValue(name){
	return UI.GetValue("Script items", name);
}

//dangerous. shitcode
//this script is a shitcode itself tbh
var tab_names = Object.keys(menu_elements);
var loadedSettings = 0;
function loadSettings(){
	if(loadedSettings > 128) return;
	for(i = 0; i < tab_names.length; i++){
		var tabname = tab_names[i];
		var subtab_names = Object.keys(menu_elements[tab_names[i]]);
		subtabs_names[tabname] = subtab_names;
		selected_subtabs[tab_names[i]] = subtabs_names[tab_names[i]][0];
		for(s = 0; s < subtab_names.length; s++){
			var subtab = subtab_names[s];
			var box_names = Object.keys(menu_elements[tabname][subtab]);
			var boxes = menu_elements[tabname][subtab];
			for(b = 0; b < box_names.length; b++){
				var box_name = box_names[b];
				var box = boxes[box_name];
				for(e = 0; e < box.length; e++){
					var element = box[e];
					var element_name = name_text + "_" + element["id"];
					switch(element["type"]){
						case "checkbox":
							if(!loadedSettings)
								UI.AddCheckbox(element_name);
							checkbox_states[element["id"]] = UI.GetValue("Script items", element_name);
							break;
						case "slider":
							if(!loadedSettings)
								UI.AddSliderInt(element_name, element["min"], element["max"]);
							if("default" in element){
								if(!loadedSettings)
									UI.AddCheckbox(element_name + "_not_def");
								if(!UI.GetValue("Script items", element_name + "_not_def"))
									UI.SetValue("Script items", element_name, element["default"]);
								UI.SetEnabled("Script items", element_name + "_not_def", false);	
							}
							var value = UI.GetValue("Script items", element_name);
							value = clamp(value, element["min"], element["max"]);
							UI.SetValue("Script items", element_name, value);
							slider_values[element["id"]] = value;
							break;
					}	
					UI.SetEnabled("Script items", element_name, false);			
				}
			}
		}
	}
	loadedSettings++;
}

scriptItems();
var block_set9 = false;
function drawMenu(){
	//OTC3 CORD MADE BY @ZXSLEEBU	
	if(UI.IsMenuOpen()){
		Cheat.ExecuteCommand("fps_max 99");
		block_set9 = false;
	}
	else{
		if(!block_set9){
			Cheat.ExecuteCommand("fps_max 400");
			block_set9 = true;
		}
		return;
	}

	//Fonts
	var logo_font = Render.AddFont("Segoe UI", 20, 800);
	icon_font = Render.AddFont("menu_font", 16, 300);
	text_icon_font = Render.AddFont("Segoe UI", 10, 800);
	menu_font = Render.AddFont("Segoe UI", 10, 300);
	subtabs_font = Render.AddFont("Segoe UI", 7, 800);
	
	//Gradient line
	Render.FilledCircle(x + header_radius, y + header_radius + 1, header_radius, [217, 157, 86, 255]);
	Render.FilledCircle(x + width - header_radius - 3, y + header_radius + 1, header_radius + 2, [217, 157, 86, 255]);
	Render.GradientRect(x, y + 4, (width / 2), 8, 1, [217, 157, 86, 255], [223, 174, 97, 255]);
	Render.GradientRect(x + (width / 2), y + 4, (width / 2), 8, 1, [223, 174, 97, 255], [217, 157, 86, 255]);
	Render.GradientRect(x + header_radius, y, (width / 2) - header_radius, 8, 1, [217, 157, 86, 255], [223, 174, 97, 255]);
	Render.GradientRect(x + (width / 2), y, (width / 2) - header_radius, 8, 1, [223, 174, 97, 255], [217, 157, 86, 255]);
	Render.Line(x + 3, y + 1, x + width - 3, y + 1, [217, 157, 86, 255]);

	//Top bright line
	Render.Line(x + 3, y, x + width - 3, y, bright_line_color);

	//Left bright lines
	Render.Line(x, y + 3, x + 2, y, bright_line_color);
	Render.Line(x, y + 2, x, y + 8, bright_line_color);
	Render.Line(x + 1, y + 3, x + 3, y, [217, 157, 86, 255]);

	//Right bright lines
	Render.Line(x + width - 1, y + 3, x + width - 3, y, bright_line_color);
	Render.Line(x + width - 1, y + 2, x + width - 1, y + 8, bright_line_color);

	//Bottom bright line
	Render.Line(x, y + 8, x + width - 1, y + 8, bright_line_color);
	
	//Background
	Render.FilledRect(x + 2, y + 8, width - 4, height - 12, background_color);
	Render.FilledRect(x + 6, y + height - 6, width - 12, 4, background_color);
	Render.Polygon([[x + 2, y + height - 5], [x + 6, y + height - 5], [x + 6, y + height - 1]], background_color);
	Render.Polygon([[x + width - 2, y + height - 5], [x + width - 6, y + height - 1], [x + width - 6, y + height - 5]], background_color);

	//Borders
	Render.Line(x, y + 8, x, y + height - 6, [31, 33, 37, 255]);
	Render.Line(x + width - 1, y + 8, x + width - 1, y + height - 6, [31, 33, 37, 255]);
	Render.Line(x, y + height - 5, x + 4, y + height - 1, [31, 33, 37, 255]);
	Render.Line(x + 4, y + height - 1, x + width - 5, y + height - 1, [31, 33, 37, 255]);
	Render.Line(x + width - 1, y + height - 5, x + width - 4, y + height - 2, [31, 33, 37, 255]);
	Render.Line(x + 1, y + 8, x + 1, y + height - 5, [77, 81, 88, 255]);
	Render.Line(x + width - 2, y + 8, x + width - 2, y + height - 6, [77, 81, 88, 255]);
	Render.Line(x + 1, y + height - 5, x + 4, y + height - 2, [77, 81, 88, 255]);
	Render.Line(x + 5, y + height - 2, x + width - 6, y + height - 2, [77, 81, 88, 255]);
	Render.Line(x + width - 2, y + height - 5, x + width - 6, y + height - 2, [77, 81, 88, 255]);
	
	//Header gradient transition
	Render.GradientRect(x + 1, y + 8, width - 2, 9, 0, [98, 86, 69, 255], [98, 86, 69, 0]);
	
	//Name
	Render.StringCustom(x + 14, y + 17, 0, name_text, text_color, logo_font);
	var text_size = Render.TextSizeCustom(name_text, logo_font);
	
	//Vertical line after name
	Render.Line(x + 14 + text_size[0] + 8, y + 22, x + 14 + text_size[0] + 8, y + 21 + text_size[1], line_color);

	//Horizontal line below header
	Render.Line(x + 10, y + 21 + text_size[1] + 8, x + width - 10, y + 21 + text_size[1] + 8, line_color);
	
	//Preparing variables
	tab_start = x + 14 + text_size[0] + 8 + 15;
	subtab_text_pos = y + 23 + text_size[1] + 8 + 8 + 50 - 8;
	subtab_start = y + 23 + text_size[1] + 8 + 8;
	hint_text = "";

	//Menu tabs
	renderTabs(tab_names);
	
	//Subtabs
	Render.FilledRect(x + 14, y + 23 + text_size[1] + 8 + 8, subtabs_width, 50, element_color);
	Render.Rect(x + 15, y + 23 + text_size[1] + 8 + 8 + 1, subtabs_width - 2, 48, element_border_color);
	
	renderSubtabs(subtabs_names);

	//Menu elements and boxes
	renderElements();
	
	//Footer
	Render.Line(x + 10, y + height - 28, x + width - 10, y + height - 28, line_color);

	var text_size2 = Render.TextSizeCustom("Made by @zxsleebu", menu_font);
	Render.StringCustom(x + width - 14 - text_size2[0], y + height - 26, 0, "Made by @zxsleebu", text_color, menu_font);
	Render.StringCustom(x + 15, y + height - 26, 0, "Last upd: " + last_upd + "; v" + version, text_color, menu_font);

	//Render hints on top of the all
	renderHints();
}

function moveMenu(){
	if(!UI.IsMenuOpen()) return;
	cursor_pos = Input.GetCursorPosition();
	if(!Input.IsKeyPressed(0x01)){
		is_moving = false;
		old_cursor = cursor_pos;
	}
	if((cursor_pos[0] >= x && cursor_pos[0] <= x + width && cursor_pos[1] >= y && cursor_pos[1] <= y + 30) || (is_moving)){
		is_moving = true;
		x = cursor_pos[0] - old_cursor[0] + x;
		y = cursor_pos[1] - old_cursor[1] + y;
		UI.SetValue("Script items", name_text + "_x", x);
		UI.SetValue("Script items", name_text + "_y", y);
		old_cursor = cursor_pos;
	}

	x = clamp(x, -width + 5, screen_size[0] - 5);
	y = clamp(y, -28, screen_size[1] - 5);
}

function renderTabs(tabs){
	for(i = 0; i < tabs.length; i++){
		var name = tabs[i];
		var color = tab_active_color;
		var animate_speed = 11;
		cursor_pos = Input.GetCursorPosition();
		var font = Render.AddFont("Segoe UI", 10, 900);
		var text_size = Render.TextSizeCustom(name, font);
		var x1 = tab_start + ((tab_margin + tab_width) * i);
		var y1 = y + 29;
		var x2 = tab_start + ((tab_margin + tab_width) * i) + tab_width;
		var y2 = y + 29 + 22;
		color[3] = tab_colors[i];

		//if(cursor_pos[0] >= x1 && cursor_pos[0] <= x2 && cursor_pos[1] >= y1 && cursor_pos[1] <= y2 || i == selected_tab){
		if(UI.IsCursorInBox(x1, y1, tab_width, 22) || i == selected_tab){
			if(Input.IsKeyPressed(0x01) && !is_moving){
				selected_tab = i;
			}
			color[3] += (color[3] > 100) ? (animate_speed / 1.5) : animate_speed;
		}
		else{
			color[3] -= animate_speed;
		}
		if(color[3] > 255){
			color[3] = 255;
		}
		else{
			if(color[3] < 0){
				color[3] = 0;
			}
		}
		tab_colors[i] = color[3];
		rounded_rect(x1, y1, tab_width, 22, 2, color);
		/*Render.FilledRect(x1, y1, tab_width, 22, color);*/
		Render.StringCustom(x1 + (tab_width / 2) - (text_size[0] / 2), y1 + 11 - (text_size[1] / 2), 0, name, text_color, font);
	}
}

function renderSubtabs(subtabs){
	//0TC3 C0RD M4D3 BY @Z X S L 3 3 B U
	var name = tab_names[selected_tab];
	var subtabs_count = subtabs[name].length;
	for(i = 0; i < subtabs_count; i++){
		var subtab = subtabs[name][i].toUpperCase();
		var icon = subtabs_icons[name][subtabs[name][i]];
		var text_icon = subtabs_text_icons[name][subtabs[name][i]];
		var text_size = Render.TextSizeCustom(subtab, subtabs_font);
		var icon_size = Render.TextSizeCustom(icon, icon_font);
		var text_icon_size = Render.TextSizeCustom(text_icon, text_icon_font);
		var color = subtab_text_color;
		cursor_pos = Input.GetCursorPosition();
		var x1 = x + 14 + ((subtabs_width / subtabs_count) * i);
		var y1 = subtab_start;
		var x2 = x + 14 + ((subtabs_width / subtabs_count) * (i + 1));
		var y2 = subtab_start + 50;
		//if(cursor_pos[0] >= x1 && cursor_pos[0] <= x2 && cursor_pos[1] >= y1 && cursor_pos[1] <= y2 || subtabs[name][i] == selected_subtabs[name]){
		if(UI.IsCursorInBox(x1, subtab_start, (subtabs_width / subtabs_count), 50) || subtabs[name][i] == selected_subtabs[name]){
			if(Input.IsKeyPressed(0x01) && !is_moving){
				selected_subtabs[name] = subtabs[name][i];
			}
			color = text_color;
		}
		var textX = x + 14 + ((subtabs_width / subtabs_count) / 2) - (text_size[0] / 2) + ((subtabs_width / subtabs_count) * i);
		var textY = subtab_text_pos - text_size[1] + 1;
		var iconX = x + 14 + ((subtabs_width / subtabs_count) / 2) - (icon_size[0] / 2) + ((subtabs_width / subtabs_count) * i);
		var iconY = subtab_text_pos - text_size[1] - 4 - icon_size[1];
		var text_iconX = x + 14 + ((subtabs_width / subtabs_count) / 2) - (text_icon_size[0] / 2) + ((subtabs_width / subtabs_count) * i);
		var text_iconY = subtab_text_pos - text_size[1] - 5 - text_icon_size[1];
		
		Render.StringCustom(textX, textY, 0, subtab, color, subtabs_font);
		Render.StringCustom(iconX, iconY, 0, icon, color, icon_font);
		Render.StringCustom(text_iconX, text_iconY, 0, text_icon, color, text_icon_font);
	}
}

function renderBox(name, height, right){
	box_width = ((width - (15 * 2)) / 2) - 12;
	var boxX = (right) ? x + 15 + box_width + 24 : x + 15;
	var boxY = subtab_start + box_offsets[(right) ? 1 : 0] + 50 + 13;

	Render.Line(boxX, boxY + height - 3, boxX + 3, boxY + height, line_color);
	Render.Line(boxX + box_width, boxY + height - 3, boxX + box_width - 3, boxY + height, line_color);

	Render.Line(boxX, boxY, boxX, boxY + height - 3, line_color);
	Render.Line(boxX + box_width, boxY, boxX + box_width, boxY + height - 3, line_color);
	Render.Line(boxX + 3, boxY + height, boxX + box_width - 4, boxY + height, line_color);
	
	var text_size = Render.TextSizeCustom(name, menu_font);
	
	var textX = boxX + (box_width / 2) - (text_size[0] / 2);
	Render.GradientRect(boxX, boxY, (box_width / 2) - (text_size[0] / 2) - 4, 1, 1, [217, 157, 86, 255], [246, 207, 135, 255]);
	Render.GradientRect(textX + text_size[0] + 4, boxY, (box_width / 2) - Math.floor(text_size[0] / 2) - 3, 1, 1, [246, 207, 135, 255], [217, 157, 86, 255]);
	Render.StringCustom(textX, boxY - (text_size[1] / 2) - 1, 0, name, text_color, menu_font);
	box_offsets[(right) ? 1 : 0] += height + 18;
}

function renderElements(){
	var selected_tab_name = tab_names[selected_tab];
	var selected_subtab = selected_subtabs[selected_tab_name];
	var subtab_boxes_names = Object.keys(menu_elements[selected_tab_name][selected_subtab]);
	var subtab_boxes = menu_elements[selected_tab_name][selected_subtab];

	for(i = 0; i < subtab_boxes_names.length; i++){
		var box_name = subtab_boxes_names[i];
		var box_height = box_margin_top;
		var side = i % 2;
		if(box_offsets[0] > 200){
			side = 1;
		}

		for(e = 0; e < subtab_boxes[box_name].length; e++){
			element_y = subtab_start + 50 + 13;
			var element = subtab_boxes[box_name][e];
			switch(element["type"]){
				case "checkbox":
					var visible = ("visible" in element) ? element["visible"] : true;
					if(!visible && !checkbox_states["useless_features"]) break;
					element_y += box_offsets[side] + box_height;
					var hint = ("hint" in element) ? element["hint"] : "";
					renderCheckbox(element["name"], element_y, side, element["id"], hint);
					box_height += element_margin_bottom + checkbox_height;
					break;
				case "slider":
					var visible = ("visible" in element) ? element["visible"] : true;
					if(!visible && !checkbox_states["useless_features"]) break;
					element_y += box_offsets[side] + box_height;
					var min = ("min" in element) ? element["min"] : 0;
					var max = ("max" in element) ? element["max"] : 0;
					var append = ("append" in element) ? element["append"] : "";
					renderSlider(element["name"], element_y, side, element["id"], min, max, append);
					box_height += element_margin_bottom + slider_height + 18;
					break;
			}
		}

		box_height += box_margin_bottom;
		renderBox(box_name, box_height, side);
	}

	height = Math.max.apply(null, box_offsets) + 164;

	//0TC3 (if) C0RD (you) M4D3 (remove) BY (this) @ Z Х S L 3 3 В U (you're gay)
	box_offsets = [0, 0];
}

function renderCheckbox(name, checkboxY, right, id, hint){
	var checkboxX = ((right) ? x + 15 + box_width + 24 : x + 15) + box_margin_x;
	var text_size = Render.TextSizeCustom(name, menu_font);
	var textX = ((right) ? x + 15 + box_width + 24 : x + 15) + box_text_margin_x;
	var color = element_color;
	var color2 = element_border_color2;
	var checkboxX2 = checkboxX + checkbox_width;
	var checkboxY2 = checkboxY + checkbox_height;
	var elementWidth = checkboxX + box_width - box_margin_x * 2;
	var animationSpeed = 12;

	if(checkbox_states[id]){
		color = [217, 157, 86, 255];
		color2 = [217, 157, 86, 255];
	}
	if(id in checkbox_alpha){
		checkbox_alpha[id] = clamp(checkbox_alpha[id], 0, 255);
	}
	if(checkbox_states[id]){
		checkbox_alpha[id] = 255;
	}
	//if(cursor_pos[0] >= checkboxX && cursor_pos[0] <= elementWidth && cursor_pos[1] >= checkboxY && cursor_pos[1] <= checkboxY2 && !slider_changing){
	if(UI.IsCursorInBox(checkboxX, checkboxY, box_width - box_margin_x * 2, checkbox_height) && !slider_changing){
		if(hint !== ""){
			var hint_icon_font = Render.AddFont("menu_font", 12, 300);
			Render.StringCustom(elementWidth - 16, checkboxY - 1, 0, "G", text_color, hint_icon_font);

			if(cursor_pos[0] >= elementWidth - 17 && cursor_pos[0] <= elementWidth + 1 && cursor_pos[1] >= checkboxY && cursor_pos[1] <= checkboxY2){
				hint_text = hint;
				hint_size = Render.TextSizeCustom(hint_text, menu_font);
				//hint_x = elementWidth - 16 - (hint_size[0] / 2) - 3;
				//hint_y = checkboxY - 16 - hint_size[1] + 6;
				hint_x = cursor_pos[0] + box_margin_x/*- (hint_size[0] / 2) - 3*/;
				if(hint_x + hint_size[0] + 3 > x + width + 50){
					hint_x = cursor_pos[0] - (box_margin_x * 2) - hint_size[0]/*- (hint_size[0] / 2) - 3*/;
				}
				hint_y = cursor_pos[1] + checkbox_height/* + hint_size[1] + 6*/;
			}			
		}
	}
	if(UI.IsCursorInBox(checkboxX - 1, checkboxY - 1, textX - checkboxX + text_size[0] + 1, checkbox_height + 3) && !slider_changing){
		if(Input.IsKeyPressed(0x01) && !is_moving){
			if(!click_block){
				checkbox_states[id] = !checkbox_states[id]; 
				UI.SetValue("Script items", name_text + "_" + id, checkbox_states[id]);
				click_block = true;
			}
			color = [217, 157, 86, 255];
		}
		else{
			click_block = false;
		}
		color2 = [217, 157, 86, 255];
		if(!(id in checkbox_alpha)){
			checkbox_alpha[id] = 0;
		}
		color2[3] = (checkbox_alpha[id] = clamp(checkbox_alpha[id] + animationSpeed, 0, 255));
	}
	else{
		if((id in checkbox_alpha) && checkbox_alpha[id] > 5 && !checkbox_states[id]){
			color2 = [217, 157, 86, 255];
			color2[3] = (checkbox_alpha[id] = clamp(checkbox_alpha[id] - animationSpeed, 0, 255));
		}
	}

	//Inactive border
	//Vertical
	Render.Line(checkboxX, checkboxY + 1, checkboxX, checkboxY + checkbox_height - 2, element_border_color2);
	Render.Line(checkboxX + checkbox_width - 1, checkboxY + 1, checkboxX + checkbox_width - 1, checkboxY + checkbox_height - 2, element_border_color2);
	//Horizontal
	Render.Line(checkboxX + 1, checkboxY, checkboxX + checkbox_width - 2, checkboxY, element_border_color2);
	Render.Line(checkboxX + 1, checkboxY + checkbox_height - 1, checkboxX + checkbox_width - 2, checkboxY + checkbox_height - 1, element_border_color2);
	//Fill
	Render.FilledRect(checkboxX + 1, checkboxY + 1, checkbox_width - 2, checkbox_height - 2, element_border_color2);

	//Active border
	//Vertical
	Render.Line(checkboxX, checkboxY + 1, checkboxX, checkboxY + checkbox_height - 2, color2);
	Render.Line(checkboxX + checkbox_width - 1, checkboxY + 1, checkboxX + checkbox_width - 1, checkboxY + checkbox_height - 2, color2);
	//Horizontal
	Render.Line(checkboxX + 1, checkboxY, checkboxX + checkbox_width - 2, checkboxY, color2);
	Render.Line(checkboxX + 1, checkboxY + checkbox_height - 1, checkboxX + checkbox_width - 2, checkboxY + checkbox_height - 1, color2);
	//Fill
	Render.FilledRect(checkboxX + 1, checkboxY + 1, checkbox_width - 2, checkbox_height - 2, color2);

	//Background
	//Vertical
	Render.Line(checkboxX + 1, checkboxY + 2, checkboxX + 1, checkboxY + checkbox_height - 3, color);
	Render.Line(checkboxX + checkbox_width - 2, checkboxY + 2, checkboxX + checkbox_width - 2, checkboxY + checkbox_height - 3, color);
	//Horizontal
	Render.Line(checkboxX + 2, checkboxY + 1, checkboxX + checkbox_width - 3, checkboxY + 1, color);
	Render.Line(checkboxX + 2, checkboxY + checkbox_height - 2, checkboxX + checkbox_width - 3, checkboxY + checkbox_height - 2, color);
	//Fill
	Render.FilledRect(checkboxX + 2, checkboxY + 2, checkbox_width - 4, checkbox_height - 4, color);

	//Checkbox name
	Render.StringCustom(textX, checkboxY - 2, 0, name, text_color, menu_font);

	//my nickname is numberless. like z x s l e e b u but without spaces
	//why i put so many comments in code?
	//i just wanna to be a bigname, you know :)
	//btw this mеnu іs crеаtеd bу @zхslееbu
}

function renderHints(){
	if(hint_text === "") return;
	hint_size = Render.TextSizeCustom(hint_text, menu_font);
	rounded_rect(hint_x, hint_y, hint_size[0] + 8, hint_size[1] + 4, 2, hintbox_color);
	Render.StringCustom(hint_x + 4, hint_y + 1, 0, hint_text, text_color, menu_font);
	//0TC3 C0RD M4D3 BY @Z X SL3E B U

}

function renderSlider(name, sliderY, right, id, min, max, append){
	var sliderX = ((right) ? x + 15 + box_width + 24 : x + 15) + box_text_margin_x - 6;
	var sliderWidth = box_width - box_text_margin_x * 2 + 14;
	var value = slider_values[id];
	var value_start = -1;
	var percent = (sliderWidth - value_start) / Math.abs(max - min);
	var progress = value * percent + value_start;
	value = (value > max) ? max : value;
	value = (value <= min) ? min : value;
	progress = value * percent + value_start - (min * percent);
	progress = (progress > sliderWidth) ? sliderWidth : progress;
	progress = (value == max) ? sliderWidth - 2 : progress;

	//if((cursor_pos[0] >= sliderX && cursor_pos[0] <= sliderX + sliderWidth - 1 && cursor_pos[1] >= sliderY + 16 && cursor_pos[1] <= sliderY + 16 + slider_height && slider_changing == false) || slider_changing == id){
	if((UI.IsCursorInBox(sliderX, sliderY + 16, sliderWidth - 1, slider_height) && slider_changing == false) || slider_changing == id){
		if(Input.IsKeyPressed(0x01) && !is_moving){
			value = clamp(Math.round(((cursor_pos[0] - sliderX) / percent) + min), min, max);
			slider_values[id] = value;
			UI.SetValue("Script items", name_text + "_" + id, value);
			progress = value * percent + value_start - (min * percent);
			progress = (progress > sliderWidth) ? sliderWidth : progress;
			progress = (value == max) ? sliderWidth - 2 : progress;
			slider_changing = id;
			UI.SetValue("Script items", name_text + "_" + id + "_not_def", true);
		}
		else{
			slider_changing = false;
		}

		var value_size = Render.TextSizeCustom(value + append, menu_font);

		var slider_hint_x = (cursor_pos[0] >= (sliderX + sliderWidth - value_size[0] - 8 - 12)) ? (sliderX + sliderWidth - value_size[0] - 9) : cursor_pos[0] + 12;
		slider_hint_x = (slider_hint_x <= sliderX) ? sliderX : slider_hint_x;
		var slider_hint_y = sliderY + 16 + slider_height + 2;
		hint_x = slider_hint_x;
		hint_y = slider_hint_y;
		hint_text = value + append;
		/*Render.FilledRect(slider_hint_x, slider_hint_y, value_size[0] + 8, value_size[1] + 4, hintbox_color);
		Render.StringCustom(slider_hint_x + 4, slider_hint_y + 1, 0, value + append, text_color, menu_font);*/
	}

	//Slider name
	Render.StringCustom(sliderX + 6, sliderY - 4, 0, name, text_color, menu_font);

	//Slider background
	Render.FilledRect(sliderX, sliderY + 16, sliderWidth, slider_height, element_color);

	//Slider border
	//Horizontal
	Render.Line(sliderX, sliderY + 16, sliderX + sliderWidth - 1, sliderY + 16, element_border_color2);
	Render.Line(sliderX, sliderY + 16 + slider_height - 1, sliderX + sliderWidth - 1, sliderY + 16 + slider_height - 1, element_border_color2);
	//Vertical
	Render.Line(sliderX - 1, sliderY + 17, sliderX - 1, sliderY + 17 + slider_height - 3, element_border_color2);
	Render.Line(sliderX + sliderWidth, sliderY + 17, sliderX + sliderWidth, sliderY + 17 + slider_height - 3, element_border_color2);
	//Curves
	Render.Line(sliderX - 1, sliderY + 17, sliderX + 5, sliderY + 16, element_border_color2);
	Render.Line(sliderX - 1, sliderY + 14 + slider_height, sliderX + 5, sliderY + 15 + slider_height, element_border_color2);
	Render.Line(sliderX + sliderWidth, sliderY + 17, sliderX + sliderWidth - 3, sliderY + 16, element_border_color2);
	Render.Line(sliderX + sliderWidth, sliderY + 14 + slider_height, sliderX + sliderWidth - 3, sliderY + 15 + slider_height, element_border_color2);


	//Slider progress
	Render.Line(sliderX + 1, sliderY + 17, sliderX + 1, sliderY + 16 + slider_height - 2, element_active_color);
	Render.Line(sliderX, sliderY + 18, sliderX, sliderY + 16 + slider_height - 3, element_active_color);
	Render.FilledRect(sliderX + 2, sliderY + 17, progress - 2, slider_height - 2, element_active_color);
	if(progress > 2){
		Render.Line(sliderX + progress, sliderY + 17, sliderX + progress, sliderY + 16 + slider_height - 2, element_active_color);
		Render.Line(sliderX + progress + 1, sliderY + 18, sliderX + progress + 1, sliderY + 16 + slider_height - 3, element_active_color);
	}
}

function rounded_rect (from_x, from_y, to_x, to_y, radius, color) {
	var diameter = radius * 2;

    Render.FilledRect(from_x + radius, from_y,          to_x - diameter, to_y,            color); // vertical
    Render.FilledRect(from_x,          from_y + radius, to_x,            to_y - diameter, color); // horizontal

    // top
    Render.FilledCircle(from_x + radius,        from_y + radius,         radius, color); // left
    if(radius < 5){
    	Render.FilledCircle(from_x + to_x - radius - 2, from_y + radius,         radius + 1, color); // right
	}
	else{
		Render.FilledCircle(from_x + to_x - radius, from_y + radius,         radius, color); // right
	}
    
    // bottom
    Render.FilledCircle(from_x + radius,        from_y + to_y - radius,  radius, color); // left
    if(radius < 5){
		Render.FilledCircle(from_x + to_x - radius - 2, from_y + to_y - radius - 2,  radius + 2, color); // right
	}
	else{
		Render.FilledCircle(from_x + to_x - radius, from_y + to_y - radius,  radius, color); // right
	}
}

function onUnload(){
	//cuz i luv you and appreciate your time :)
	Exploit.EnableRecharge();
	Exploit.Recharge();
	AntiAim.SetOverride(0);
	Convar.SetString("cl_lock_camera", "0");
	Cheat.ExecuteCommand("-attack2");
	Convar.SetString("fog_override", "0");
	Convar.SetFloat("mat_ambient_light_r", 0);
    Convar.SetFloat("mat_ambient_light_g", 0);
    Convar.SetFloat("mat_ambient_light_b", 0);
    Convar.SetString("mat_force_tonemap_scale", "0");
    Convar.SetFloat("r_modelAmbientMin", 0);
    Cheat.ExecuteCommand("fov_cs_debug 0");
    var entities = Entity.GetEntities();
	for (var i = 0; i < entities.length; i++){
		var entity = entities[i];
		var name = Entity.GetClassName(entity);
		if (name === "CEnvTonemapController"){
			var props = 0;
			if(props == 0){
				Entity.SetProp(entity, 'CEnvTonemapController', 'm_flCustomBloomScale', 0);
				props = 1;
			}
			if(props == 1){
				Entity.SetProp(entity, 'CEnvTonemapController', 'm_bUseCustomAutoExposureMin', false);
				Entity.SetProp(entity, 'CEnvTonemapController', 'm_bUseCustomAutoExposureMax', false);
				Entity.SetProp(entity, 'CEnvTonemapController', 'm_bUseCustomBloomScale', false);
			}
		}
	}
}

//Prioritizing rage functions to have better response time
//idc if it will not work :D

//Main
Global.RegisterCallback("Draw", "updateVars");

//Rage
Global.RegisterCallback("CreateMove", "safeAWP");
Global.RegisterCallback("CreateMove", "safeLimbs");
Global.RegisterCallback("CreateMove", "jumpscout");
Global.RegisterCallback("CreateMove", "minDamageOverride");
Global.RegisterCallback("CreateMove", "safePointOnDT");
Global.RegisterCallback("CreateMove", "autoscope");
Global.RegisterCallback("CreateMove", "forceBackshoot");
Global.RegisterCallback("CreateMove", "lethalSafety");
Global.RegisterCallback("CreateMove", "preferBaimOnDT");
Global.RegisterCallback("CreateMove", "doubletapBoost");
Global.RegisterCallback("weapon_fire", "on_weapon_fire");
Global.RegisterCallback("CreateMove", "zeusHitchance");

//Functions that can delay
Global.RegisterCallback("hegrenade_detonate", "on_hegrenade_detonate");
Global.RegisterCallback("player_hurt", "skeletonOnHit");
Global.RegisterCallback("player_hurt", "addHitShot");
Global.RegisterCallback("player_death", "effectOnKill2");
Global.RegisterCallback("item_purchase", "addWeaponInBuyList");

//Anti Aim
Global.RegisterCallback("CreateMove", "idealYaw");
Global.RegisterCallback("CreateMove", "lowdelta");
Global.RegisterCallback("CreateMove", "antiBruteforce3");
Global.RegisterCallback("CreateMove", "oppositeOnExploits");
//Global.RegisterCallback("CreateMove", "pitchZeroOnLand");
Global.RegisterCallback("CreateMove", "legBreaker");
Global.RegisterCallback("CreateMove", "slowmotion");
Global.RegisterCallback("CreateMove", "standingAutoInvert");
Global.RegisterCallback("CreateMove", "mmFD");
Global.RegisterCallback("CreateMove", "alternativeFakelag");
Global.RegisterCallback("bullet_impact", "antiBruteforce");
Global.RegisterCallback("player_hurt", "antiBruteforce2");
Global.RegisterCallback("round_start", "alternativeFakelag2");
Global.RegisterCallback("CreateMove", "pingSpikeOnKey");
Global.RegisterCallback("CreateMove", "fixes");
Global.RegisterCallback("Draw", "legitAA");
Global.RegisterCallback("CreateMove", "freestanding");

//Visuals
Global.RegisterCallback("Draw", "worldColor");
Global.RegisterCallback("Draw", "bulletTracer2");
Global.RegisterCallback("Draw", "betterScope");
Global.RegisterCallback("FrameStageNotify", "betterScope2");
Global.RegisterCallback("Draw", "skeletonOnHit2");
Global.RegisterCallback("Draw", "trail");
Global.RegisterCallback("Draw", "transparencyOnNade");
Global.RegisterCallback("Draw", "betterCrosshair");
Global.RegisterCallback("Draw", "effectOnKill");
Global.RegisterCallback("Draw", "eyeTracers");
Global.RegisterCallback("Draw", "rainbowBar");
Global.RegisterCallback("Draw", "customFog");
Global.RegisterCallback("Draw", "entities");
Global.RegisterCallback("Draw", "nadeWarning");
Global.RegisterCallback("Draw", "nadeTracer");
Global.RegisterCallback("Draw", "nadeTracer2");
Global.RegisterCallback("Draw", "nadeCircle");
Global.RegisterCallback("Draw", "registerBetterGlowChams");
Global.RegisterCallback("bullet_impact", "bulletTracer");
Global.RegisterCallback("player_connect_full", "on_player_connect");
Global.RegisterCallback("FrameStageNotify", "aspectRatio");
Global.RegisterCallback("FrameStageNotify", "agentChanger");
Global.RegisterCallback("Draw", "armsColor");
Global.RegisterCallback("Material", "betterGlowChams");
Global.RegisterCallback("Draw", "indicators");
Global.RegisterCallback("Draw", "hitShotsHandle");

//Misc
Global.RegisterCallback("Draw", "fps_boost");
Global.RegisterCallback("Draw", "moveBuyList");
Global.RegisterCallback("Draw", "watermark");
Global.RegisterCallback("Draw", "autostrafeFix");
Global.RegisterCallback("CreateMove", "enemyLocation");
Global.RegisterCallback("FrameStageNotify", "zoomFix");
Global.RegisterCallback("CreateMove", "clantagOnPeek");
Global.RegisterCallback("vote_options", "onVoteOptions");
Global.RegisterCallback("vote_cast", "voteRevealer");
Global.RegisterCallback("CreateMove", "players");
Global.RegisterCallback("round_end", "clearBuyList");
Global.RegisterCallback("round_freeze_end", "hideBuyList");
Global.RegisterCallback("player_death", "resetVars");
Global.RegisterCallback("player_death", "killsay");
Global.RegisterCallback("Draw", "partyMode");
Global.RegisterCallback("game_newmap", "partyMode2");
Global.RegisterCallback("FrameStageNotify", "musicKit");
Global.RegisterCallback("Draw", "clantag");

//Menu
Global.RegisterCallback("Draw", "scriptItems");
Global.RegisterCallback("Draw", "loadSettings");
Global.RegisterCallback("Draw", "buyList");
Global.RegisterCallback("Draw", "darkMenu");
Global.RegisterCallback("Draw", "drawMenu");
Global.RegisterCallback("Draw", "moveMenu");
Global.RegisterCallback("unload", "onUnload");