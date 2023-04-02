type ColorRGB = [number, number, number];
type ColorRGBA = [number, number, number, number];
type EntityID = number;

type CallbackName =
        | "render"
        | "createmove"
	| "player_death"
	| "other_death"
	| "player_hurt"
	| "item_purchase"
	| "bomb_beginplant"
	| "bomb_abortplant"
	| "bomb_planted"
	| "bomb_defused"
	| "bomb_exploded"
	| "bomb_dropped"
	| "bomb_pickup"
	| "defuser_dropped"
	| "defuser_pickup"
	| "announce_phase_end"
	| "cs_intermission"
	| "bomb_begindefuse"
	| "bomb_abortdefuse"
	| "hostage_follows"
	| "hostage_hurt"
	| "hostage_killed"
	| "hostage_rescued"
	| "hostage_stops_following"
	| "hostage_rescued_all"
	| "hostage_call_for_help"
	| "vip_escaped"
	| "vip_killed"
	| "player_radio"
	| "bomb_beep"
	| "weapon_fire"
	| "weapon_fire_on_empty"
	| "grenade_thrown"
	| "weapon_outofammo"
	| "weapon_reload"
	| "weapon_zoom"
	| "silencer_detach"
	| "inspect_weapon"
	| "weapon_zoom_rifle"
	| "player_spawned"
	| "item_pickup"
	| "item_pickup_slerp"
	| "item_pickup_failed"
	| "item_remove"
	| "ammo_pickup"
	| "item_equip"
	| "enter_buyzone"
	| "exit_buyzone"
	| "buytime_ended"
	| "enter_bombzone"
	| "exit_bombzone"
	| "enter_rescue_zone"
	| "exit_rescue_zone"
	| "silencer_off"
	| "silencer_on"
	| "buymenu_open"
	| "buymenu_close"
	| "round_prestart"
	| "round_poststart"
	| "round_start"
	| "round_end"
	| "grenade_bounce"
	| "hegrenade_detonate"
	| "flashbang_detonate"
	| "smokegrenade_detonate"
	| "smokegrenade_expired"
	| "molotov_detonate"
	| "decoy_detonate"
	| "decoy_started"
	| "tagrenade_detonate"
	| "inferno_startburn"
	| "inferno_expire"
	| "inferno_extinguish"
	| "decoy_firing"
	| "bullet_impact"
	| "player_footstep"
	| "player_jump"
	| "player_blind"
	| "player_falldamage"
	| "door_moving"
	| "round_freeze_end"
	| "mb_input_lock_success"
	| "mb_input_lock_cancel"
	| "nav_blocked"
	| "nav_generate"
	| "player_stats_updated"
	| "achievement_info_loaded"
	| "spec_target_updated"
	| "spec_mode_updated"
	| "hltv_changed_mode"
	| "cs_game_disconnected"
	| "cs_win_panel_round"
	| "cs_win_panel_match"
	| "cs_match_end_restart"
	| "cs_pre_restart"
	| "show_freezepanel"
	| "hide_freezepanel"
	| "freezecam_started"
	| "player_avenged_teammate"
	| "achievement_earned"
	| "achievement_earned_local"
	| "item_found"
	| "items_gifted"
	| "repost_xbox_achievements"
	| "match_end_conditions"
	| "round_mvp"
	| "player_decal"
	| "teamplay_round_start"
	| "show_survival_respawn_status"
	| "client_disconnect"
	| "gg_player_levelup"
	| "ggtr_player_levelup"
	| "assassination_target_killed"
	| "ggprogressive_player_levelup"
	| "gg_killed_enemy"
	| "gg_final_weapon_achieved"
	| "gg_bonus_grenade_achieved"
	| "switch_team"
	| "gg_leader"
	| "gg_team_leader"
	| "gg_player_impending_upgrade"
	| "write_profile_data"
	| "trial_time_expired"
	| "update_matchmaking_stats"
	| "player_reset_vote"
	| "enable_restart_voting"
	| "sfuievent"
	| "start_vote"
	| "player_given_c4"
	| "player_become_ghost"
	| "gg_reset_round_start_sounds"
	| "tr_player_flashbanged"
	| "tr_mark_complete"
	| "tr_mark_best_time"
	| "tr_exit_hint_trigger"
	| "bot_takeover"
	| "tr_show_finish_msgbox"
	| "tr_show_exit_msgbox"
	| "reset_player_controls"
	| "jointeam_failed"
	| "teamchange_pending"
	| "material_default_complete"
	| "cs_prev_next_spectator"
	| "cs_handle_ime_event"
	| "nextlevel_changed"
	| "seasoncoin_levelup"
	| "tournament_reward"
	| "start_halftime"
	| "ammo_refill"
	| "parachute_pickup"
	| "parachute_deploy"
	| "dronegun_attack"
	| "drone_dispatched"
	| "loot_crate_visible"
	| "loot_crate_opened"
	| "open_crate_instr"
	| "smoke_beacon_paradrop"
	| "survival_paradrop_spawn"
	| "survival_paradrop_break"
	| "drone_cargo_detached"
	| "drone_above_roof"
	| "choppers_incoming_warning"
	| "firstbombs_incoming_warning"
	| "dz_item_interaction"
	| "snowball_hit_player_face"
	| "survival_teammate_respawn"
	| "survival_no_respawns_warning"
	| "survival_no_respawns_final"
	| "player_ping"
	| "player_ping_stop"
	| "guardian_wave_restart";

declare namespace cheat {
    function log <M extends string> (text: M): void;
    function get_username(): string;
    function get_choked_commands(): number;
    function get_desync_amount(): number;
    function print_to_console <M extends string, C extends ColorRGB> (text: M, color: C): void;
    function set_clantag <C extends string> (clantag: C): void;
}

declare namespace math {
    function random_int <F extends number, S extends number> (min: F, max: S): number;
    function random_float <F extends number, S extends number> (min: F, max: S): number;
}

declare namespace render {
    function text <X extends number, Y extends number, C extends ColorRGBA, F extends number, S extends number, T extends string > (x: X, y: Y, color: C, flags: F, size: S, text: T): void;
    function rect(x: number, y: number, w: number, h: number, color: ColorRGBA, rounding: number): void;
    function filled_rect(x: number, y: number, w: number, h: number, color: ColorRGBA, rounding: number): void;
    function filled_rect_gradient(x: number, y: number, w: number, h: number, col_upr_left: ColorRGBA, col_upr_right: ColorRGBA, col_bot_right: ColorRGBA, col_bot_left: ColorRGBA): void;
    function arc(x: number, y: number, radius: number, angle_min: number, angle_max: number, segments: number, color: ColorRGBA, closed: boolean, thickness: number): void;
    function arc_filled(x: number, y: number, radius: number, angle_min: number, angle_max: number, segments: number, color: ColorRGBA, closed: boolean, thickness: number): void;
    function enable_aa(): void;
    function disable_aa(): void;
    function line(x: number, y: number, x2: number, y2: number, color: ColorRGBA, thickness: number): void;
    function circle(x: number, y: number, radius: number, color: ColorRGBA, segments: number): void;
    function filled_circle(x: number, y: number, radius: number, color: array[4], segments: number): void;
    function get_screen_size(): [number, number];
    function world_to_screen(x: number, y: number, z: number): [number, number];
    function picture(path: string, x: number, y: number, w: number, h: number, thickness: number): void;
}

declare namespace global_vars {
    function realtime(): number;
    function frame_count(): number;
    function curtime(): number;
    function frametime(): number;
    function max_clients(): number;
    function tick_count(): number;
    function interval_per_tick(): number;
}

declare namespace user_cmd {
    function get_buttons(): number;
    function set_buttons(button: number): void;
    function get_command_number(): number;
    function set_command_number(command: number): void;
    function get_view_angles(): [number, number, number];
    function set_view_angles(coordinates: [number, number, number]): void;
    function set_forwardmove(speed: number): void;
    function set_sidemove(speed: number): void;
}

declare namespace entity {
    function get_local_player(): EntityID;
    function get_valid_players(): EntityID[];
    function get_velocity(index: EntityID): number;
    function get_flags(index: EntityID): any;
    function get_origin(index: EntityID): [number, number, number];
    function get_player_for_user_id(index: EntityID): any;
    function get_weapon_id(index: EntityID): number;
    function get_enemies(): EntityID[];
    function get_teammates(): EntityID[];
    function get_player_info(index: EntityID): any;
}

declare namespace vars {
    function set_bool(varname: string, value: boolean): void;
    function get_bool(varname: string): boolean;
    function set_int(varname: string, value: number): void;
    function get_int(varname: string): number;
    function set_uint(varname: string, value: number): void;
    function get_uint(varname: string): number;
    function is_bind_active(varname: string): boolean;
    function set_bind_active(varname: string, value: boolean): void;
    function set_bind_type(varname: string, value: number): void;
}

declare namespace current_event {
    function get_int(varname: string): number;
    function get_float(varname: string): number;
    function get_bool(varname: string): boolean;
}

declare namespace antiaim {
    function get_send_packet(): boolean;
    function override_of_pitch(): void;
    function override_off_yaw(): void;
    function override_body_lean(value: number): void;
}

declare namespace utils {
    function play_sound(path: string): void;
    function to_clipboard(data: string): void;
    function from_clipboard(): string;
}

declare function register_callback(type: Callback, callableFn: Function): void;

declare namespace ui {
    function add_checkbox(name: string, varname: string): void;
    function add_slider(name: string, varname: string, min_value: number, max_value: number): void;
    function add_combo(name: string, varname: string, elements: string[]): void;
    function get_menu_alpha(): number;
    function get_menu_position(): [number, number];
    function get_menu_size(): [number, number];
    function get_cursor_position(): [number, number];
    function is_mouse_down(): boolean;
}
