/**
 * Цвет в палитре RGB
 * 
 * @type {[number, number, number]}
 * @since 1.0.0
 */
type ColorRGB = [number, number, number];

/**
 * Цвет в палитре RGBA
 * 
 * @type {[number, number, number, number]}
 * @since 1.0.0
 */
type ColorRGBA = [number, number, number, number];

/**
 * Индекс Entity
 * 
 * @type {number}
 * @since 1.0.0
 */
type EntityID = number;

/**
 * Информация об игроке
 * 
 * @type {object}
 * @since 1.0.1
 */
type PlayerInfo = {
	fakeplayer: string,
	steam_id: string,
	name: string,
	xuid_high: string,
	xuid_low: string
}

/**
 * Список каллбэков
 * 
 * @see https://wiki.alliedmods.net/Counter-Strike:_Global_Offensive_Events
 * @type {string}
 * @since 1.0.0
 */
type CallbackName =
	| "render"
	| "createmove"
	| "ragebot_fire"
	| "ragebot_miss"
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
	/**
	 * Функция для вывода текста в консоль
	 * 
	 * ---
	 * @example
	 * ```ts
	 * cheat.log("Hello world! \n"); // Hello world
	 * ```
	 * ---
	 * 
	 * @param {string} text Текст для вывода в консоль
	 * @returns {void}
	 * @since 1.0.0
	 */
    function log <M extends string> (text: M): void;

	/**
	 * Функция которая возвращает имя в чите
	 * 
	 * ---
	 * @example
	 * ```ts
	 * const name = cheat.get_username();
	 * 
	 * cheat.log(name + "\n"); // user
	 * ```
	 * ---
	 * 
	 * @returns {string}
	 * @since 1.0.0
	 */
    function get_username(): string;

	/**
	 * Функция для получения количества задержанных команд.
	 * 
	 * ---
	 * @example
	 * ```ts
	 * const choked_commands = cheat.get_choked_commands();
	 * 
	 * cheat.log(choked_commands + "\n"); // 0
	 * ```
	 * ---
	 * 
	 * @returns {number}
	 */
    function get_choked_commands(): number;

	/**
	 * Функция для выполнения консольных команд.
	 * 
	 * ---
	 * @example
	 * ```ts
	 * cheat.execute_command("say Hello World!"); // Hello World!
	 * ```
	 * ---
	 * 
	 * @param {string} command Выполняемая команда
	 * @returns {void}
	 * @since 1.0.0
	 */
	function execute_command <C extends string> (command: C): void;
    
	/**
	 * Функция для получения угла десинка.
	 * 
	 * ---
	 * @example
	 * ```ts
	 * const desync_amount = cheat.get_desync_amount();
	 * 
	 * cheat.log(desync_amount + "\n"); // 0
	 * ```
	 * ---
	 * 
	 * @returns {number}
	 */
    function get_desync_amount(): number;


	/**
	 * Функция для вывода цветного текста в консоль.
	 * 
	 * ---
	 * @example
	 * ```ts
	 * cheat.log("Hello world! \n", [100, 100, 100]); // Hello world
	 * ```
	 * ---
	 * 
	 * @param {string} text Текст для вывода в консоль
	 * @param {ColorRGB} color Цвет выводимого в консоль текста
	 * @returns {void}
	 */
    function print_to_console <M extends string, C extends ColorRGB> (text: M, color: C): void;
    
	
	/**
	 * Функция для изменения клантега.
	 * 
	 * ---
	 * @example
	 * ```ts
	 * cheat.set_clantag("Hello world!");
	 * ```
	 * ---
	 * 
	 * @param {string} clantag Новый клантег
	 * @returns {void}
	 */
    function set_clantag <C extends string> (clantag: C): void;
}

declare namespace math {
	/**
	 * Функция для получения случайного целого числа в указанных рамках.
	 * 
	 * ---
	 * @example
	 * ```ts
	 * const random_num = math.random_int(0, 255);
	 * 
	 * cheat.log(random_num + "\n"); // 83
	 * ```
	 * ---
	 * 
	 * @param {number} min Минимальное значение
	 * @param {number} max Максимальное значение
	 * @returns {number}
	 */
    function random_int <F extends number, S extends number> (min: F, max: S): number;

	/**
	 * Функция для получения случайного плавающего числа в указанных рамках.
	 * 
	 * ---
	 * @example
	 * ```ts
	 * const random_num = math.random_float(0, 255);
	 * 
	 * cheat.log(random_num + "\n"); // 224.0639863376611
	 * ```
	 * ---
	 * 
	 * @param {number} min Минимальное значение
	 * @param {number} max Максимальное значение
	 * @returns {number}
	 */
    function random_float <F extends number, S extends number> (min: F, max: S): number;
}

declare namespace render {
    function text <X extends number, Y extends number, C extends ColorRGBA, F extends number, S extends number, T extends string> (x: X, y: Y, color: C, flags: F, size: S, text: T): void;
    function rect <X extends number, Y extends number, W extends number, H extends number, C extends ColorRGBA, R extends number> (x: X, y: Y, w: W, h: H, color: C, rounding: R): void;
    function filled_rect <X extends number, Y extends number, W extends number, H extends number, C extends ColorRGBA, R extends number> (x: X, y: Y, w: W, h: H, color: C, rounding: R): void;
    function filled_rect_gradient <X extends number, Y extends number, W extends number, H extends number, CUL extends ColorRGBA, CUR extends ColorRGBA, CBR extends ColorRGBA, CBL extends ColorRGBA> (x: X, y: Y, w: W, h: H, col_upr_left: CUL, col_upr_right: CUR, col_bot_right: CBR, col_bot_left: CBL): void;
    function arc <X extends number, Y extends number, R extends number, AN extends number, AX extends number, S extends number, CR extends ColorRGBA, CL extends boolean, T extends number> (x: X, y: Y, radius: R, angle_min: AN, angle_max: AX, segments: S, color: CR, closed: CL, thickness: T): void;
    function arc_filled <X extends number, Y extends number, R extends number, AN extends number, AX extends number, S extends number, CR extends ColorRGBA, CL extends boolean, T extends number> (x: X, y: Y, radius: R, angle_min: AN, angle_max: AX, segments: S, color: CL, closed: CL, thickness: T): void;
    function enable_aa(): void;
    function disable_aa(): void;
    function line <X extends number, Y extends number, X2 extends number, Y2 extends number, C extends ColorRGBA, T extends number> (x: X, y: Y, x2: X2, y2: Y2, color: C, thickness: T): void;
    function circle <X extends number, Y extends number, R extends number, C extends ColorRGBA, S extends number> (x: X, y: Y, radius: R, color: C, segments: S): void;
    function filled_circle <X extends number, Y extends number, R extends number, C extends ColorRGBA, S extends number> (x: X, y: Y, radius: R, color: C, segments: S): void;
    function get_screen_size(): [number, number];
    function world_to_screen <X extends number, Y extends number, Z extends number> (x: X, y: Y, z: Z): [number, number];
    function picture <P extends string, X extends number, Y extends number, W extends number, H extends number, T extends number> (path: P, x: X, y: Y, w: W, h: H, thickness: T): void;
}

declare namespace global_vars {
	/**
	 * Функция для получения времени со старта игры.
	 * 
	 * ---
	 * @example
	 * ```ts
	 * cheat.log(global_vars.realtime() + "\n"); // 66.8218765258789
	 * ```
	 * ---
	 * @returns {number}
	 */
    function realtime(): number;

	/**
	 * Функция для получения количества кадров со старта игры.
	 * 
	 * ---
	 * @example
	 * ```ts
	 * cheat.log(global_vars.frame_count() + "\n"); // 9377
	 * ```
	 * ---
	 * @returns {number}
	 */
    function frame_count(): number;

	/**
	 * Функция для получения игрового времени.
	 * 
	 * ---
	 * @example
	 * ```ts
	 * cheat.log(global_vars.curtime() + "\n"); // 113.8656005859375
	 * ```
	 * ---
	 * @returns {number}
	 */
    function curtime(): number;

	/**
	 * Функция для получения времени затраченного на рендер предыдущего кадра.
	 * 
	 * ---
	 * @example
	 * ```ts
	 * cheat.log(global_vars.frametime() + "\n"); // 0.004914899822324514
	 * ```
	 * ---
	 * @returns {number}
	 */
    function frametime(): number;

	/**
	 * Функция для получения максимального количества игроков.
	 * 
	 * ---
	 * @example
	 * ```ts
	 * cheat.log(global_vars.max_clients() + "\n"); // 0
	 * ```
	 * ---
	 * @returns {number}
	 */
    function max_clients(): number;

	/**
	 * Функция для получения количества тиков со старта сервера.
	 * 
	 * ---
	 * @example
	 * ```ts
	 * cheat.log(global_vars.tick_count() + "\n"); // 7850
	 * ```
	 * ---
	 * @returns {number}
	 */
    function tick_count(): number;

	/**
	 * Функция для получения временного интервала между тиками.
	 * 
	 * ---
	 * @example
	 * ```ts
	 * cheat.log(global_vars.interval_per_tick() + "\n"); // 0.015625
	 * ```
	 * ---
	 * @returns {number}
	 */
    function interval_per_tick(): number;
}

declare namespace user_cmd {
    function get_buttons(): number;
    function set_buttons(button: number): void;
    function get_command_number(): number;
    function set_command_number(command: number): void;
    function get_view_angles(): [number, number, number];
    function set_view_angles(coordinates: [number, number, number]): void;

	/**
	 * Функция для изменения движения локального игрока по оси X.
	 * 
	 * ---
	 * @example
	 * ```ts
	 * user_cmd.set_forwardmove(450);
	 * ```
	 * ---
	 * @param {number} speed Новая скорость по оси X
	 * @returns {void}
	 */
    function set_forwardmove <S extends number> (speed: S): void;

	/**
	 * Функция для изменения движения локального игрока по оси Y.
	 * 
	 * ---
	 * @example
	 * ```ts
	 * user_cmd.set_sidemove(450);
	 * ```
	 * ---
	 * @param {number} speed Новая скорость по оси Y
	 * @returns {void}
	 */
    function set_sidemove <S extends number> (speed: S): void;
}

declare namespace entity {
    function get_local_player(): EntityID;
    function get_valid_players(): EntityID[];
    function get_velocity <I extends EntityID> (index: I): number;
    function get_flags <I extends EntityID> (index: I): number;
    function get_origin <I extends EntityID> (index: I): [number, number, number];
    function get_player_for_user_id<I extends EntityID> (index: I): EntityID;
    function get_weapon_id <I extends EntityID> (index: I): number;
    function get_enemies(): EntityID[];
    function get_teammates(): EntityID[];
    function get_player_info <I extends EntityID> (index: I): PlayerInfo;
}

declare namespace vars {
    function set_bool <N extends string, V extends boolean> (name: N, value: V): void;
    function get_bool <N extends string> (name: N): boolean;
    function set_int <N extends string, V extends number> (name: N, value: V): void;
    function get_int <N extends string> (name: N): number;
    function set_uint <N extends string, V extends number> (name: N, value: V): void;
    function get_uint <N extends string> (name: N): number;
    function is_bind_active <N extends string> (name: N): boolean;
    function set_bind_active <N extends string, V extends boolean> (name: N, value: V): void;
    function set_bind_type <N extends string, V extends number> (name: N, value: V): void;
}

declare namespace current_event {
    function get_int <N extends string> (name: N): number;
    function get_float <N extends string> (name: N): number;
    function get_bool <N extends string> (name: N): boolean;
}

declare namespace antiaim {
    function get_send_packet(): boolean;
    function override_of_pitch(): void;
    function override_off_yaw(): void;
    function override_body_lean <V extends number> (value: V): void;
}

declare namespace http {
	function get <U extends string> (url: U): unknown;
}

declare namespace utils {
    function play_sound	<P extends string> (path: P): void;
    function to_clipboard <D extends string> (data: D): void;
    function from_clipboard(): string;
}

declare function register_callback(type: CallbackName, callableFn: Function): void;

declare namespace ui {
    function add_checkbox <N extends string, V extends string> (name: N, varname: V): void;
    function add_slider <N extends string, V extends string, MN extends number, MX extends number> (name: N, varname: V, min_value: MN, max_value: MX): void;
    function add_combo <N extends string, V extends string, E extends string[]> (name: N, varname: V, elements: E): void;
    function get_menu_alpha(): number;
    function get_menu_position(): [number, number];
    function get_menu_size(): [number, number];
    function get_cursor_position(): [number, number];
    function is_mouse_down(): boolean;
}

/**
 * API Weave.su
 * 
 * @author Mased
 * @author undef033
 * @version 1.0.0
 * 
 * @see https://api.weave.su/weave-api
 */