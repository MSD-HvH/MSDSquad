---https://yougame.biz/threads/266379/

local a = {}
_DEBUG = true
ffi.cdef [[
    typedef struct
    {
        uint8_t r;
        uint8_t g;
        uint8_t b;
        uint8_t a;
    } color_struct_t;
    typedef void (__cdecl* console_color_print)(void*, color_struct_t&, const char* text, ...);
    typedef struct {
        char    pad_0x0000[4];
        char*   console_name;
        char    pad_0x0008[12];
        int     primary_clip_size;
        int     secondary_clip_size;
        int     primary_default_clip_size;
        int     secondary_default_clip_size;
        int     primary_reserve_ammo_max;
        int     secondary_reserve_ammo_max;
        char*   model_world;
        char*   model_player;
        char*   model_dropped;
        char*   sound_empty;
        char*   sound_single_shot;
        char*   sound_single_shot_accurate;
        char    pad_0x0044[12];
        char*   sound_burst;
        char*   sound_reload;
        char    pad_0x0058[16];
        char*   sound_special1;
        char*   sound_special2;
        char*   sound_special3;
        char    pad_0x0074[4];
        char*   sound_nearlyempty;
        char    pad_0x007c[4];
        char*   primary_ammo;
        char*   secondary_ammo;
        char*   item_name;
        char*   item_class;
        bool    itemflag_exhaustible;
        bool    model_right_handed;
        bool    is_melee_weapon;
        char    pad_0x0093[9];
        int     weapon_weight;
        char    pad_0x00a0[8];
        int     item_gear_slot_position;
        char    pad_0x00ac[28];
        int     weapon_type_int;
        char    pad_0x00cc[4];
        int     in_game_price;
        int     kill_award;
        char*   player_animation_extension;
        float   cycletime;
        float   cycletime_alt;
        float   time_to_idle;
        float   idle_interval;
        bool    is_full_auto;
        char    pad_0x00ed[3];
        int     damage;
        float   headshot_multiplier;
        float   armor_ratio;
        int     bullets;
        float   penetration;
        float   flinch_velocity_modifier_large;
        float   flinch_velocity_modifier_small;
        float   range;
        float   range_modifier;
        float   throw_velocity;
        char    pad_0x0114[12];
        int     has_silencer;
        char    pad_0x0124[4];
        int     crosshair_min_distance;
        int     crosshair_delta_distance;
        float   max_player_speed;
        float   max_player_speed_alt;
        float   attack_movespeed_factor;
        float   spread;
        float   spread_alt;
        float   inaccuracy_crouch;
        float   inaccuracy_crouch_alt;
        float   inaccuracy_stand;
        float   inaccuracy_stand_alt;
        float   inaccuracy_jump_initial;
        float   inaccuracy_jump_apex;
        float   inaccuracy_jump;
        float   inaccuracy_jump_alt;
        float   inaccuracy_land;
        float   inaccuracy_land_alt;
        float   inaccuracy_ladder;
        float   inaccuracy_ladder_alt;
        float   inaccuracy_fire;
        float   inaccuracy_fire_alt;
        float   inaccuracy_move;
        float   inaccuracy_move_alt;
        float   inaccuracy_reload;
        int     recoil_seed;
        float   recoil_angle;
        float   recoil_angle_alt;
        float   recoil_angle_variance;
        float   recoil_angle_variance_alt;
        float   recoil_magnitude;
        float   recoil_magnitude_alt;
        float   recoil_magnitude_variance;
        float   recoil_magnitude_variance_alt;
        int     spread_seed;
        float   recovery_time_crouch;
        float   recovery_time_stand;
        float   recovery_time_crouch_final;
        float   recovery_time_stand_final;
        int     recovery_transition_start_bullet;
        int     recovery_transition_end_bullet;
        bool    unzoom_after_shot;
        bool    hide_view_model_zoomed;
        char    pad_0x01ca[2];
        int     zoom_levels;
        int     zoom_fov_1;
        int     zoom_fov_2;
        int     zoom_time_0;
        int     zoom_time_1;
        int     zoom_time_2;
        char*   addon_location;
        char    pad_0x01e8[4];
        float   addon_scale;
        char*   eject_brass_effect;
        char*   tracer_effect;
        int     tracer_frequency;
        int     tracer_frequency_alt;
        char*   muzzle_flash_effect_1st_person;
        char*   muzzle_flash_effect_1st_person_alt;
        char*   muzzle_flash_effect_3rd_person;
        char*   muzzle_flash_effect_3rd_person_alt;
        char*   heat_effect;
        float   heat_per_shot;
        char*   zoom_in_sound;
        char*   zoom_out_sound;
        char    pad_0x0220[4];
        float   inaccuracy_alt_sound_threshold;
        float   bot_audible_range;
        char    pad_0x022c[12];
        bool    has_burst_mode;
        bool    is_revolver;
        char    pad_0x023a[2];
    } ccs_weapon_info_t;
]]
local function b(c, d, type)
    return ffi.cast(type, ffi.cast("void***", c)[0][d])
end
local function e(d, f)
    local g = ffi.typeof(f)
    return function(c, ...)
        assert(c ~= nil)
        if c then
            return b(c, d, g)(c, ...)
        end
    end
end
local h = {
    "console_name",
    "primary_clip_size",
    "secondary_clip_size",
    "primary_default_clip_size",
    "secondary_default_clip_size",
    "primary_reserve_ammo_max",
    "secondary_reserve_ammo_max",
    "model_world",
    "model_player",
    "model_dropped",
    "sound_empty",
    "sound_single_shot",
    "sound_single_shot_accurate",
    "sound_burst",
    "sound_reload",
    "sound_special1",
    "sound_special2",
    "sound_special3",
    "sound_nearlyempty",
    "primary_ammo",
    "secondary_ammo",
    "item_name",
    "item_class",
    "itemflag_exhaustible",
    "model_right_handed",
    "is_melee_weapon",
    "weapon_weight",
    "item_gear_slot_position",
    "weapon_type_int",
    "in_game_price",
    "kill_award",
    "player_animation_extension",
    "cycletime",
    "cycletime_alt",
    "time_to_idle",
    "idle_interval",
    "is_full_auto",
    "damage",
    "headshot_multiplier",
    "armor_ratio",
    "bullets",
    "penetration",
    "flinch_velocity_modifier_large",
    "flinch_velocity_modifier_small",
    "range",
    "range_modifier",
    "throw_velocity",
    "has_silencer",
    "crosshair_min_distance",
    "crosshair_delta_distance",
    "max_player_speed",
    "max_player_speed_alt",
    "attack_movespeed_factor",
    "spread",
    "spread_alt",
    "inaccuracy_crouch",
    "inaccuracy_crouch_alt",
    "inaccuracy_stand",
    "inaccuracy_stand_alt",
    "inaccuracy_jump_initial",
    "inaccuracy_jump_apex",
    "inaccuracy_jump",
    "inaccuracy_jump_alt",
    "inaccuracy_land",
    "inaccuracy_land_alt",
    "inaccuracy_ladder",
    "inaccuracy_ladder_alt",
    "inaccuracy_fire",
    "inaccuracy_fire_alt",
    "inaccuracy_move",
    "inaccuracy_move_alt",
    "inaccuracy_reload",
    "recoil_seed",
    "recoil_angle",
    "recoil_angle_alt",
    "recoil_angle_variance",
    "recoil_angle_variance_alt",
    "recoil_magnitude",
    "recoil_magnitude_alt",
    "recoil_magnitude_variance",
    "recoil_magnitude_variance_alt",
    "spread_seed",
    "recovery_time_crouch",
    "recovery_time_stand",
    "recovery_time_crouch_final",
    "recovery_time_stand_final",
    "recovery_transition_start_bullet",
    "recovery_transition_end_bullet",
    "unzoom_after_shot",
    "hide_view_model_zoomed",
    "zoom_levels",
    "zoom_fov_1",
    "zoom_fov_2",
    "zoom_time_0",
    "zoom_time_1",
    "zoom_time_2",
    "addon_location",
    "addon_scale",
    "eject_brass_effect",
    "tracer_effect",
    "tracer_frequency",
    "tracer_frequency_alt",
    "muzzle_flash_effect_1st_person",
    "muzzle_flash_effect_1st_person_alt",
    "muzzle_flash_effect_3rd_person",
    "muzzle_flash_effect_3rd_person_alt",
    "heat_effect",
    "heat_per_shot",
    "zoom_in_sound",
    "zoom_out_sound",
    "inaccuracy_alt_sound_threshold",
    "bot_audible_range",
    "has_burst_mode",
    "is_revolver"
}
local i = {
    [0] = "knife",
    [1] = "pistol",
    [2] = "smg",
    [3] = "rifle",
    [4] = "shotgun",
    [5] = "sniperrifle",
    [6] = "machinegun",
    [7] = "c4",
    [9] = "grenade",
    [11] = "stackableitem",
    [12] = "fists",
    [13] = "breachcharge",
    [14] = "bumpmine",
    [15] = "tablet",
    [16] = "melee",
    [19] = "equipment"
}
local j = ffi.typeof("char*")
local k = utils.opcode_scan("client.dll", "8B 35 ? ? ? ? FF 10 0F B7 C0") or error("IWeaponSystem signature invalid")
local l = ffi.cast("void****", ffi.cast("char*", k) + 0x2)[0]
local m = e(2, "ccs_weapon_info_t*(__thiscall*)(void*, unsigned int)") or error("invalid GetCSWeaponInfo index")
local n, o = {}, {}
for p = 1, 600 do
    local q = m(l, p)
    if q ~= nil then
        local r = {}
        for s = 1, #h do
            local t = h[s]
            local u = q[t]
            local v, w = pcall(ffi.typeof, u)
            r[t] = v and w == j and ffi.string(u) or u
        end
        r.idx = p
        r.type = p == 31 and "taser" or i[q.weapon_type_int]
        r.raw = q
        n[p] = r
        o[r.console_name] = r
    end
end
local function x(y, z)
    if y ~= n or type(z) ~= "number" or z < 0 or z > 8191 then
        return
    end
    local p = bit.band(z["m_iItemDefinitionIndex"], 0xFFFF)
    return n[p]
end
setmetatable(n, {__index = o, __metatable = false, __call = x})
local A = {}
function A.expo_in(u, c, d, e)
    if u == 0 then
        return c
    else
        return d * math.pow(2, 10 * (u / e - 1)) + c - d * 0.001
    end
end
function A.quad_in_out(u, c, d, e)
    u = u / e * 2
    if u < 1 then
        return d / 2 * math.pow(u, 2) + c
    else
        return -d / 2 * ((u - 1) * (u - 3) - 1) + c
    end
end
function A.sine_in_out(u, c, d, e)
    return -d / 2 * (math.cos(math.pi * u / e) - 1) + c
end
function A.quart_out(u, c, d, e)
    u = u / e - 1
    return -d * (math.pow(u, 4) - 1) + c
end
function A.sine_out(u, c, d, e)
    return d * math.sin(u / e * math.pi / 2) + c
end
function A.cubic_in(u, c, d, e)
    u = u / e
    return d * math.pow(u, 3) + c
end
local base64 = {} base64.extract = function(v, from, width)     return bit.band(bit.shr(v, from), bit.shl(1, width) - 1) end function base64.makeencoder(alphabet)     local encoder, decoder = {}, {}     for i = 1, 65 do         local chr = string.byte(string.sub(alphabet, i, i)) or 32         if decoder[chr] ~= nil then             error("invalid alphabet: duplicate character " .. tostring(chr), 3)         end         encoder[i - 1] = chr         decoder[chr] = i - 1     end     return encoder, decoder end base64.encoders, base64.decoders = {}, {} base64.encoders["base64"], base64.decoders["base64"] = base64.makeencoder("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=") base64.encoders["base64url"], base64.decoders["base64url"] = base64.makeencoder("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_") local alphabet_mt = {__index = function(tbl, key)         if type(key) == "string" and key:len() == 64 or key:len() == 65 then             base64.encoders[key], base64.decoders[key] = base64.makeencoder(key)             return tbl[key]         end     end} setmetatable(base64.encoders, alphabet_mt) setmetatable(base64.decoders, alphabet_mt) function base64.encode(str, encoder)     encoder = base64.encoders[encoder or "base64"] or error("invalid alphabet specified", 2)     str = tostring(str)     local t, k, n = {}, 1, #str     local lastn = n % 3     local cache = {}     for i = 1, n - lastn, 3 do         local a, b, c = string.byte(str, i, i + 2)         local v = a * 0x10000 + b * 0x100 + c         local s = cache[v]         if not s then             s =                 string.char(                 encoder[base64.extract(v, 18, 6)],                 encoder[base64.extract(v, 12, 6)],                 encoder[base64.extract(v, 6, 6)],                 encoder[base64.extract(v, 0, 6)]             )             cache[v] = s         end         t[k] = s         k = k + 1     end     if lastn == 2 then         local a, b = string.byte(str, n - 1, n)         local v = a * 0x10000 + b * 0x100         t[k] = string.char(encoder[base64.extract(v, 18, 6)], encoder[base64.extract(v, 12, 6)], encoder[base64.extract(v, 6, 6)], encoder[64])     elseif lastn == 1 then         local v = string.byte(str, n) * 0x10000         t[k] = string.char(encoder[base64.extract(v, 18, 6)], encoder[base64.extract(v, 12, 6)], encoder[64], encoder[64])     end     return table.concat(t) end function base64.decode(b64, decoder)     decoder = base64.decoders[decoder or "base64"] or error("invalid alphabet specified", 2)     local pattern = "[^%w%+%/%=]"     if decoder then         local s62, s63         for charcode, b64code in pairs(decoder) do             if b64code == 62 then                 s62 = charcode             elseif b64code == 63 then                 s63 = charcode             end         end         pattern = string.format("[^%%w%%%s%%%s%%=]", string.char(s62), string.char(s63))     end     b64 = string.gsub(tostring(b64), pattern, "")     local cache = {}     local t, k = {}, 1     local n = #b64     local padding = string.sub(b64, -2) == "==" and 2 or string.sub(b64, -1) == "=" and 1 or 0     for i = 1, padding > 0 and n - 4 or n, 4 do         local a, b, c, d = string.byte(b64, i, i + 3)         local v0 = a * 0x1000000 + b * 0x10000 + c * 0x100 + d         local s = cache[v0]         if not s then             local v = decoder[a] * 0x40000 + decoder[b] * 0x1000 + decoder[c] * 0x40 + decoder[d]             s = string.char(base64.extract(v, 16, 8), base64.extract(v, 8, 8), base64.extract(v, 0, 8))             cache[v0] = s         end         t[k] = s         k = k + 1     end     if padding == 1 then         local a, b, c = string.byte(b64, n - 3, n - 1)         local v = decoder[a] * 0x40000 + decoder[b] * 0x1000 + decoder[c] * 0x40         t[k] = string.char(base64.extract(v, 16, 8), base64.extract(v, 8, 8))     elseif padding == 2 then         local a, b = string.byte(b64, n - 3, n - 2)         local v = decoder[a] * 0x40000 + decoder[b] * 0x1000         t[k] = string.char(base64.extract(v, 16, 8))     end     return table.concat(t) end
local http_library = {} do     if not pcall(ffi.sizeof, "SteamAPICall_t") then         ffi.cdef(             [[         typedef uint64_t SteamAPICall_t;         struct SteamAPI_callback_base_vtbl {             void(__thiscall *run1)(struct SteamAPI_callback_base *, void *, bool, uint64_t);             void(__thiscall *run2)(struct SteamAPI_callback_base *, void *);             int(__thiscall *get_size)(struct SteamAPI_callback_base *);         };         struct SteamAPI_callback_base {             struct SteamAPI_callback_base_vtbl *vtbl;             uint8_t flags;             int id;             uint64_t api_call_handle;             struct SteamAPI_callback_base_vtbl vtbl_storage[1];         };         ]]         )     end     http_library.ESteamAPICallFailure = {         [-1] = "No failure",         [0] = "Steam gone",         [1] = "Network failure",         [2] = "Invalid handle",         [3] = "Mismatched callback"     }     http_library.callback_base = ffi.typeof("struct SteamAPI_callback_base")     http_library.sizeof_callback_base = ffi.sizeof(http_library.callback_base)     http_library.callback_base_array = ffi.typeof("struct SteamAPI_callback_base[1]")     http_library.callback_base_ptr = ffi.typeof("struct SteamAPI_callback_base*")     http_library.uintptr_t = ffi.typeof("uintptr_t")     http_library.api_call_handlers = {}     http_library.pending_call_results = {}     http_library.registered_callbacks = {}     function http_library.pointer_key(p)         return tostring(tonumber(ffi.cast(http_library.uintptr_t, p)))     end     function http_library.callback_base_run_common(self, param, io_failure)         if io_failure then             io_failure = http_library.ESteamAPICallFailure[GetAPICallFailureReason(self.api_call_handle)] or "Unknown error"         end         self.api_call_handle = 0         xpcall(             function()                 local key = http_library.pointer_key(self)                 local handler = http_library.api_call_handlers[key]                 if handler ~= nil then                     xpcall(handler, print_raw, param, io_failure)                 end                 if http_library.pending_call_results[key] ~= nil then                     http_library.api_call_handlers[key] = nil                     http_library.pending_call_results[key] = nil                 end             end,             print_raw         )     end     function http_library.callback_base_run1(self, param, io_failure, api_call_handle)         if api_call_handle == self.api_call_handle then             http_library.callback_base_run_common(self, param, io_failure)         end     end     function http_library.callback_base_run2(self, param)         http_library.callback_base_run_common(self, param, false)     end     function http_library.callback_base_get_size(self)         return http_library.sizeof_callback_base     end     function http_library.call_result_cancel(self)         if self.api_call_handle ~= 0 then             http_library.SteamAPI_UnregisterCallResult(self, self.api_call_handle)             self.api_call_handle = 0             local key = http_library.pointer_key(self)             http_library.api_call_handlers[key] = nil             http_library.pending_call_results[key] = nil         end     end     pcall(ffi.metatype, http_library.callback_base, {__gc = http_library.call_result_cancel, __index = {cancel = http_library.call_result_cancel}})     http_library.callback_base_run1_ct = ffi.cast("void(__thiscall *)(struct SteamAPI_callback_base *, void *, bool, uint64_t)", http_library.callback_base_run1)     http_library.callback_base_run2_ct = ffi.cast("void(__thiscall *)(struct SteamAPI_callback_base *, void *)", http_library.callback_base_run2)     http_library.callback_base_get_size_ct = ffi.cast("int(__thiscall *)(struct SteamAPI_callback_base *)", http_library.callback_base_get_size)     function http_library.register_call_result(api_call_handle, handler, id)         assert(api_call_handle ~= 0)         local instance_storage = http_library.callback_base_array()         local instance = ffi.cast(http_library.callback_base_ptr, instance_storage)         instance.vtbl_storage[0].run1 = http_library.callback_base_run1_ct         instance.vtbl_storage[0].run2 = http_library.callback_base_run2_ct         instance.vtbl_storage[0].get_size = http_library.callback_base_get_size_ct         instance.vtbl = instance.vtbl_storage         instance.api_call_handle = api_call_handle         instance.id = id         local key = http_library.pointer_key(instance)         http_library.api_call_handlers[key] = handler         http_library.pending_call_results[key] = instance_storage         http_library.SteamAPI_RegisterCallResult(instance, api_call_handle)         return instance     end     function http_library.register_callback(id, handler)         assert(http_library.registered_callbacks[id] == nil)         local instance_storage = http_library.callback_base_array()         local instance = ffi.cast(http_library.callback_base_ptr, instance_storage)         instance.vtbl_storage[0].run1 = http_library.callback_base_run1_ct         instance.vtbl_storage[0].run2 = http_library.callback_base_run2_ct         instance.vtbl_storage[0].get_size = http_library.callback_base_get_size_ct         instance.vtbl = instance.vtbl_storage         instance.api_call_handle = 0         instance.id = id         local key = http_library.pointer_key(instance)         http_library.api_call_handlers[key] = handler         http_library.registered_callbacks[id] = instance_storage         http_library.SteamAPI_RegisterCallback(instance, id)     end     function http_library.find_sig(mdlname, pattern, typename, offset, deref_count)         local raw_match = utils.opcode_scan(mdlname, pattern) or error("signature not found", 2)         local match = ffi.cast("uintptr_t", raw_match)         if offset ~= nil and offset ~= 0 then             match = match + offset         end         if deref_count ~= nil then             for i = 1, deref_count do                 match = ffi.cast("uintptr_t*", match)[0]                 if match == nil then                     return error("signature not found")                 end             end         end         return ffi.cast(typename, match)     end     function http_library.vtable_entry(instance, index, type)         return ffi.cast(type, (ffi.cast("void***", instance)[0])[index])     end     http_library.SteamAPI_RegisterCallResult =         http_library.find_sig(         "steam_api.dll",         "55 8B EC 83 3D ? ? ? ? ? 7E 0D 68 ? ? ? ? FF 15 ? ? ? ? 5D C3 FF 75 10",         "void(__cdecl*)(struct SteamAPI_callback_base *, uint64_t)"     )     http_library.SteamAPI_UnregisterCallResult =         http_library.find_sig(         "steam_api.dll",         "55 8B EC FF 75 10 FF 75 0C",         "void(__cdecl*)(struct SteamAPI_callback_base *, uint64_t)"     )     http_library.SteamAPI_RegisterCallback =         http_library.find_sig(         "steam_api.dll",         "55 8B EC 83 3D ? ? ? ? ? 7E 0D 68 ? ? ? ? FF 15 ? ? ? ? 5D C3 C7 05",         "void(__cdecl*)(struct SteamAPI_callback_base *, int)"     )     http_library.steam_client_context = http_library.find_sig("client.dll", "B9 ? ? ? ? E8 ? ? ? ? 83 3D ? ? ? ? ? 0F 84", "uintptr_t", 1, 1)     http_library.steamutils = ffi.cast("uintptr_t*", http_library.steam_client_context)[3]     http_library.GetAPICallFailureReason = http_library.vtable_entry(http_library.steamutils, 12, "int(__thiscall*)(void*, SteamAPICall_t)")     function GetAPICallFailureReason(handle)         return http_library.GetAPICallFailureReason(http_library.steamutils, handle)     end     events.shutdown:set(         function()             for key, value in pairs(http_library.pending_call_results) do                 local instance = ffi.cast(http_library.callback_base_ptr, value)                 http_library.call_result_cancel(instance)             end             for key, value in pairs(http_library.registered_callbacks) do                 local instance = ffi.cast(http_library.callback_base_ptr, value)             end         end     ) end if not pcall(ffi.sizeof, "http_HTTPRequestHandle") then     ffi.cdef(         [[     typedef uint32_t http_HTTPRequestHandle;     typedef uint32_t http_HTTPCookieContainerHandle;     enum http_EHTTPMethod {         k_EHTTPMethodInvalid,         k_EHTTPMethodGET,         k_EHTTPMethodHEAD,         k_EHTTPMethodPOST,         k_EHTTPMethodPUT,         k_EHTTPMethodDELETE,         k_EHTTPMethodOPTIONS,         k_EHTTPMethodPATCH,     };     struct http_ISteamHTTPVtbl {         http_HTTPRequestHandle(__thiscall *CreateHTTPRequest)(uintptr_t, enum http_EHTTPMethod, const char *);         bool(__thiscall *SetHTTPRequestContextValue)(uintptr_t, http_HTTPRequestHandle, uint64_t);         bool(__thiscall *SetHTTPRequestNetworkActivityTimeout)(uintptr_t, http_HTTPRequestHandle, uint32_t);         bool(__thiscall *SetHTTPRequestHeaderValue)(uintptr_t, http_HTTPRequestHandle, const char *, const char *);         bool(__thiscall *SetHTTPRequestGetOrPostParameter)(uintptr_t, http_HTTPRequestHandle, const char *, const char *);         bool(__thiscall *SendHTTPRequest)(uintptr_t, http_HTTPRequestHandle, SteamAPICall_t *);         bool(__thiscall *SendHTTPRequestAndStreamResponse)(uintptr_t, http_HTTPRequestHandle, SteamAPICall_t *);         bool(__thiscall *DeferHTTPRequest)(uintptr_t, http_HTTPRequestHandle);         bool(__thiscall *PrioritizeHTTPRequest)(uintptr_t, http_HTTPRequestHandle);         bool(__thiscall *GetHTTPResponseHeaderSize)(uintptr_t, http_HTTPRequestHandle, const char *, uint32_t *);         bool(__thiscall *GetHTTPResponseHeaderValue)(uintptr_t, http_HTTPRequestHandle, const char *, uint8_t *, uint32_t);         bool(__thiscall *GetHTTPResponseBodySize)(uintptr_t, http_HTTPRequestHandle, uint32_t *);         bool(__thiscall *GetHTTPResponseBodyData)(uintptr_t, http_HTTPRequestHandle, uint8_t *, uint32_t);         bool(__thiscall *GetHTTPStreamingResponseBodyData)(uintptr_t, http_HTTPRequestHandle, uint32_t, uint8_t *, uint32_t);         bool(__thiscall *ReleaseHTTPRequest)(uintptr_t, http_HTTPRequestHandle);         bool(__thiscall *GetHTTPDownloadProgressPct)(uintptr_t, http_HTTPRequestHandle, float *);         bool(__thiscall *SetHTTPRequestRawPostBody)(uintptr_t, http_HTTPRequestHandle, const char *, uint8_t *, uint32_t);         http_HTTPCookieContainerHandle(__thiscall *CreateCookieContainer)(uintptr_t, bool);         bool(__thiscall *ReleaseCookieContainer)(uintptr_t, http_HTTPCookieContainerHandle);         bool(__thiscall *SetCookie)(uintptr_t, http_HTTPCookieContainerHandle, const char *, const char *, const char *);         bool(__thiscall *SetHTTPRequestCookieContainer)(uintptr_t, http_HTTPRequestHandle, http_HTTPCookieContainerHandle);         bool(__thiscall *SetHTTPRequestUserAgentInfo)(uintptr_t, http_HTTPRequestHandle, const char *);         bool(__thiscall *SetHTTPRequestRequiresVerifiedCertificate)(uintptr_t, http_HTTPRequestHandle, bool);         bool(__thiscall *SetHTTPRequestAbsoluteTimeoutMS)(uintptr_t, http_HTTPRequestHandle, uint32_t);         bool(__thiscall *GetHTTPRequestWasTimedOut)(uintptr_t, http_HTTPRequestHandle, bool *pbWasTimedOut);     };     ]]     ) end http_library.method_name_to_enum = {     get = ffi.C.k_EHTTPMethodGET,     head = ffi.C.k_EHTTPMethodHEAD,     post = ffi.C.k_EHTTPMethodPOST,     put = ffi.C.k_EHTTPMethodPUT,     delete = ffi.C.k_EHTTPMethodDELETE,     options = ffi.C.k_EHTTPMethodOPTIONS,     patch = ffi.C.k_EHTTPMethodPATCH } http_library.status_code_to_message = {     [100] = "Continue",     [101] = "Switching Protocols",     [102] = "Processing",     [200] = "OK",     [201] = "Created",     [202] = "Accepted",     [203] = "Non-Authoritative Information",     [204] = "No Content",     [205] = "Reset Content",     [206] = "Partial Content",     [207] = "Multi-Status",     [208] = "Already Reported",     [250] = "Low on Storage Space",     [226] = "IM Used",     [300] = "Multiple Choices",     [301] = "Moved Permanently",     [302] = "Found",     [303] = "See Other",     [304] = "Not Modified",     [305] = "Use Proxy",     [306] = "Switch Proxy",     [307] = "Temporary Redirect",     [308] = "Permanent Redirect",     [400] = "Bad Request",     [401] = "Unauthorized",     [402] = "Payment Required",     [403] = "Forbidden",     [404] = "Not Found",     [405] = "Method Not Allowed",     [406] = "Not Acceptable",     [407] = "Proxy Authentication Required",     [408] = "Request Timeout",     [409] = "Conflict",     [410] = "Gone",     [411] = "Length Required",     [412] = "Precondition Failed",     [413] = "Request Entity Too Large",     [414] = "Request-URI Too Long",     [415] = "Unsupported Media Type",     [416] = "Requested Range Not Satisfiable",     [417] = "Expectation Failed",     [418] = "I'm a teapot",     [420] = "Enhance Your Calm",     [422] = "Unprocessable Entity",     [423] = "Locked",     [424] = "Failed Dependency",     [424] = "Method Failure",     [425] = "Unordered Collection",     [426] = "Upgrade Required",     [428] = "Precondition Required",     [429] = "Too Many Requests",     [431] = "Request Header Fields Too Large",     [444] = "No Response",     [449] = "Retry With",     [450] = "Blocked by Windows Parental Controls",     [451] = "Parameter Not Understood",     [451] = "Unavailable For Legal Reasons",     [451] = "Redirect",     [452] = "Conference Not Found",     [453] = "Not Enough Bandwidth",     [454] = "Session Not Found",     [455] = "Method Not Valid in This State",     [456] = "Header Field Not Valid for Resource",     [457] = "Invalid Range",     [458] = "Parameter Is Read-Only",     [459] = "Aggregate Operation Not Allowed",     [460] = "Only Aggregate Operation Allowed",     [461] = "Unsupported Transport",     [462] = "Destination Unreachable",     [494] = "Request Header Too Large",     [495] = "Cert Error",     [496] = "No Cert",     [497] = "HTTP to HTTPS",     [499] = "Client Closed Request",     [500] = "Internal Server Error",     [501] = "Not Implemented",     [502] = "Bad Gateway",     [503] = "Service Unavailable",     [504] = "Gateway Timeout",     [505] = "HTTP Version Not Supported",     [506] = "Variant Also Negotiates",     [507] = "Insufficient Storage",     [508] = "Loop Detected",     [509] = "Bandwidth Limit Exceeded",     [510] = "Not Extended",     [511] = "Network Authentication Required",     [551] = "Option not supported",     [598] = "Network read timeout error",     [599] = "Network connect timeout error" } http_library.single_allowed_keys = {"params", "body", "json"} http_library.CALLBACK_HTTPRequestCompleted = 2101 http_library.CALLBACK_HTTPRequestHeadersReceived = 2102 http_library.CALLBACK_HTTPRequestDataReceived = 2103 function http_library.find_isteamhttp()     local steamhttp = ffi.cast("uintptr_t*", http_library.steam_client_context)[12]     if steamhttp == 0 or steamhttp == nil then         return error("http_library.find_isteamhttp failed")     end     local vmt = ffi.cast("struct http_ISteamHTTPVtbl**", steamhttp)[0]     if vmt == 0 or vmt == nil then         return error("http_library.find_isteamhttp failed")     end     return steamhttp, vmt end function http_library.func_bind(func, arg)     return function(...)         return func(arg, ...)     end end http_library.HTTPRequestCompleted_t_ptr = ffi.typeof([[ struct { http_HTTPRequestHandle m_hRequest; uint64_t m_ulContextValue; bool m_bRequestSuccessful; int m_eStatusCode; uint32_t m_unBodySize; } * ]]) http_library.HTTPRequestHeadersReceived_t_ptr = ffi.typeof([[ struct { http_HTTPRequestHandle m_hRequest; uint64_t m_ulContextValue; } * ]]) http_library.HTTPRequestDataReceived_t_ptr = ffi.typeof([[ struct { http_HTTPRequestHandle m_hRequest; uint64_t m_ulContextValue; uint32_t m_cOffset; uint32_t m_cBytesReceived; } * ]]) http_library.CookieContainerHandle_t = ffi.typeof([[ struct { http_HTTPCookieContainerHandle m_hCookieContainer; } ]]) http_library.SteamAPICall_t_arr = ffi.typeof("SteamAPICall_t[1]") http_library.unit8_ptr = ffi.typeof("uint8_t[?]") http_library.uint_ptr = ffi.typeof("unsigned int[?]") http_library.bool_ptr = ffi.typeof("bool[1]") http_library.float_ptr = ffi.typeof("float[1]") http_library.steam_http, http_library.steam_http_vtable = http_library.find_isteamhttp() http_library.CreateHTTPRequest = http_library.func_bind(http_library.steam_http_vtable.CreateHTTPRequest, http_library.steam_http) http_library.SetHTTPRequestNetworkActivityTimeout = http_library.func_bind(http_library.steam_http_vtable.SetHTTPRequestNetworkActivityTimeout, http_library.steam_http) http_library.SetHTTPRequestHeaderValue = http_library.func_bind(http_library.steam_http_vtable.SetHTTPRequestHeaderValue, http_library.steam_http) http_library.SetHTTPRequestGetOrPostParameter = http_library.func_bind(http_library.steam_http_vtable.SetHTTPRequestGetOrPostParameter, http_library.steam_http) http_library.SendHTTPRequest = http_library.func_bind(http_library.steam_http_vtable.SendHTTPRequest, http_library.steam_http) http_library.SendHTTPRequestAndStreamResponse = http_library.func_bind(http_library.steam_http_vtable.SendHTTPRequestAndStreamResponse, http_library.steam_http) http_library.DeferHTTPRequest = http_library.func_bind(http_library.steam_http_vtable.DeferHTTPRequest, http_library.steam_http) http_library.PrioritizeHTTPRequest = http_library.func_bind(http_library.steam_http_vtable.PrioritizeHTTPRequest, http_library.steam_http) http_library.GetHTTPResponseHeaderSize = http_library.func_bind(http_library.steam_http_vtable.GetHTTPResponseHeaderSize, http_library.steam_http) http_library.GetHTTPResponseHeaderValue = http_library.func_bind(http_library.steam_http_vtable.GetHTTPResponseHeaderValue, http_library.steam_http) http_library.GetHTTPResponseBodyData = http_library.func_bind(http_library.steam_http_vtable.GetHTTPResponseBodyData, http_library.steam_http) http_library.GetHTTPStreamingResponseBodyData = http_library.func_bind(http_library.steam_http_vtable.GetHTTPStreamingResponseBodyData, http_library.steam_http) http_library.ReleaseHTTPRequest = http_library.func_bind(http_library.steam_http_vtable.ReleaseHTTPRequest, http_library.steam_http) http_library.GetHTTPDownloadProgressPct = http_library.func_bind(http_library.steam_http_vtable.GetHTTPDownloadProgressPct, http_library.steam_http) http_library.SetHTTPRequestRawPostBody = http_library.func_bind(http_library.steam_http_vtable.SetHTTPRequestRawPostBody, http_library.steam_http) http_library.CreateCookieContainer = http_library.func_bind(http_library.steam_http_vtable.CreateCookieContainer, http_library.steam_http) http_library.ReleaseCookieContainer = http_library.func_bind(http_library.steam_http_vtable.ReleaseCookieContainer, http_library.steam_http) http_library.SetCookie = http_library.func_bind(http_library.steam_http_vtable.SetCookie, http_library.steam_http) http_library.SetHTTPRequestCookieContainer = http_library.func_bind(http_library.steam_http_vtable.SetHTTPRequestCookieContainer, http_library.steam_http) http_library.SetHTTPRequestUserAgentInfo = http_library.func_bind(http_library.steam_http_vtable.SetHTTPRequestUserAgentInfo, http_library.steam_http) http_library.SetHTTPRequestRequiresVerifiedCertificate = http_library.func_bind(http_library.steam_http_vtable.SetHTTPRequestRequiresVerifiedCertificate, http_library.steam_http) http_library.SetHTTPRequestAbsoluteTimeoutMS = http_library.func_bind(http_library.steam_http_vtable.SetHTTPRequestAbsoluteTimeoutMS, http_library.steam_http) http_library.GetHTTPRequestWasTimedOut = http_library.func_bind(http_library.steam_http_vtable.GetHTTPRequestWasTimedOut, http_library.steam_http) http_library.completed_callbacks, http_library.is_in_callback = {}, false http_library.headers_received_callback_registered, http_library.headers_received_callbacks = false, {} http_library.data_received_callback_registered, http_library.data_received_callbacks = false, {} http_library.cookie_containers = setmetatable({}, {__mode = "k"}) http_library.headers_request_handles, http_library.request_handles_headers = setmetatable({}, {__mode = "k"}), setmetatable({}, {__mode = "v"}) http_library.response_headers_mt = {__index = function(req_key, name)         local req = http_library.headers_request_handles[req_key]         if req == nil then             return         end         name = tostring(name)         if req.m_hRequest ~= 0 then             local header_size = http_library.uint_ptr(1)             if http_library.GetHTTPResponseHeaderSize(req.m_hRequest, name, header_size) then                 if header_size ~= nil then                     header_size = header_size[0]                     if header_size < 0 then                         return                     end                     local buffer = http_library.unit8_ptr(header_size)                     if http_library.GetHTTPResponseHeaderValue(req.m_hRequest, name, buffer, header_size) then                         req_key[name] = ffi.string(buffer, header_size - 1)                         return req_key[name]                     end                 end             end         end     end, __metatable = false} http_library.cookie_container_mt = {__index = {set_cookie = function(handle_key, host, url, name, value)             local handle = http_library.cookie_containers[handle_key]             if handle == nil or handle.m_hCookieContainer == 0 then                 return             end             http_library.SetCookie(handle.m_hCookieContainer, host, url, tostring(name) .. "=" .. tostring(value))         end}, __metatable = false} function http_library.cookie_container_gc(handle)     if handle.m_hCookieContainer ~= 0 then         http_library.ReleaseCookieContainer(handle.m_hCookieContainer)         handle.m_hCookieContainer = 0     end end function http_library.http_request_gc(req)     if req.m_hRequest ~= 0 then         http_library.ReleaseHTTPRequest(req.m_hRequest)         req.m_hRequest = 0     end end function http_library.http_request_error(req_handle, ...)     http_library.ReleaseHTTPRequest(req_handle)     return error(...) end function http_library.http_request_callback_common(req, callback, successful, data, ...)     local headers = http_library.request_handles_headers[req.m_hRequest]     if headers == nil then         headers = setmetatable({}, http_library.response_headers_mt)         http_library.request_handles_headers[req.m_hRequest] = headers     end     http_library.headers_request_handles[headers] = req     data.headers = headers     http_library.is_in_callback = true     xpcall(callback, print_raw, successful, data, ...)     http_library.is_in_callback = false end function http_library.http_request_completed(param, io_failure)     if param == nil then         return     end     local req = ffi.cast(http_library.HTTPRequestCompleted_t_ptr, param)     if req.m_hRequest ~= 0 then         local callback = http_library.completed_callbacks[req.m_hRequest]         if callback ~= nil then             http_library.completed_callbacks[req.m_hRequest] = nil             http_library.data_received_callbacks[req.m_hRequest] = nil             http_library.headers_received_callbacks[req.m_hRequest] = nil             if callback then                 local successful = io_failure == false and req.m_bRequestSuccessful                 local status = req.m_eStatusCode                 local response = {status = status}                 local body_size = req.m_unBodySize                 if successful and body_size > 0 then                     local buffer = http_library.unit8_ptr(body_size)                     if http_library.GetHTTPResponseBodyData(req.m_hRequest, buffer, body_size) then                         response.body = ffi.string(buffer, body_size)                     end                 elseif not req.m_bRequestSuccessful then                     local timed_out = http_library.bool_ptr()                     http_library.GetHTTPRequestWasTimedOut(req.m_hRequest, timed_out)                     response.timed_out = timed_out ~= nil and timed_out[0] == true                 end                 if status > 0 then                     response.status_message = http_library.status_code_to_message[status] or "Unknown status"                 elseif io_failure then                     response.status_message = string_format("IO Failure: %s", io_failure)                 else                     response.status_message = response.timed_out and "Timed out" or "Unknown error"                 end                 http_library.http_request_callback_common(req, callback, successful, response)             end             http_library.http_request_gc(req)         end     end end function http_library.http_request_headers_received(param, io_failure)     if param == nil then         return     end     local req = ffi.cast(http_library.HTTPRequestHeadersReceived_t_ptr, param)     if req.m_hRequest ~= 0 then         local callback = http_library.headers_received_callbacks[req.m_hRequest]         if callback then             http_library.http_request_callback_common(req, callback, io_failure == false, {})         end     end end function http_library.http_request_data_received(param, io_failure)     if param == nil then         return     end     local req = ffi.cast(http_library.HTTPRequestDataReceived_t_ptr, param)     if req.m_hRequest ~= 0 then         local callback = http_library.data_received_callbacks[req.m_hRequest]         if http_library.data_received_callbacks[req.m_hRequest] then             local data = {}             local download_percentage_prt = http_library.float_ptr()             if http_library.GetHTTPDownloadProgressPct(req.m_hRequest, download_percentage_prt) then                 data.download_progress = tonumber(download_percentage_prt[0])             end             local buffer = http_library.unit8_ptr(req.m_cBytesReceived)             if http_library.GetHTTPStreamingResponseBodyData(req.m_hRequest, req.m_cOffset, buffer, req.m_cBytesReceived) then                 data.body = ffi.string(buffer, req.m_cBytesReceived)             end             http_library.http_request_callback_common(req, callback, io_failure == false, data)         end     end end function http_library.http_request_new(method, url, options, callbacks) if type(options) == "function" and callbacks == nil then callbacks = options options = {} end options = options or {} local method = http_library.method_name_to_enum[string.lower(tostring(method))] if method == nil then return error("invalid HTTP method") end if type(url) ~= "string" then return error("URL has to be a string") end local completed_callback, headers_received_callback, data_received_callback if type(callbacks) == "function" then completed_callback = callbacks elseif type(callbacks) == "table" then completed_callback = callbacks.completed or callbacks.complete headers_received_callback = callbacks.headers_received or callbacks.headers data_received_callback = callbacks.data_received or callbacks.data if completed_callback ~= nil and type(completed_callback) ~= "function" then return error("callbacks.completed callback has to be a function") elseif headers_received_callback ~= nil and type(headers_received_callback) ~= "function" then return error("callbacks.headers_received callback has to be a function") elseif data_received_callback ~= nil and type(data_received_callback) ~= "function" then return error("callbacks.data_received callback has to be a function") end else return error("callbacks has to be a function or table") end local req_handle = http_library.CreateHTTPRequest(method, url) if req_handle == 0 then     return error("Failed to create HTTP request") end local set_one = false for i, key in ipairs(http_library.single_allowed_keys) do     if options[key] ~= nil then         if set_one then             return error("can only set options.params, options.body or options.json")         else             set_one = true         end     end end local json_body if options.json ~= nil then     local success     success, json_body = pcall(json.stringify, options.json)     if not success then         return error("options.json is invalid: " .. json_body)     end end local network_timeout = options.network_timeout if network_timeout == nil then     network_timeout = 10 end if type(network_timeout) == "number" and network_timeout > 0 then     if not http_library.SetHTTPRequestNetworkActivityTimeout(req_handle, network_timeout) then         return http_library.http_request_error(req_handle, "failed to set network_timeout")     end elseif network_timeout ~= nil then     return http_library.http_request_error(req_handle, "options.network_timeout has to be of type number and greater than 0") end local absolute_timeout = options.absolute_timeout if absolute_timeout == nil then     absolute_timeout = 30 end if type(absolute_timeout) == "number" and absolute_timeout > 0 then     if not http_library.SetHTTPRequestAbsoluteTimeoutMS(req_handle, absolute_timeout * 1000) then         return http_library.http_request_error(req_handle, "failed to set absolute_timeout")     end elseif absolute_timeout ~= nil then     return http_library.http_request_error(req_handle, "options.absolute_timeout has to be of type number and greater than 0") end local content_type = json_body ~= nil and "application/json" or "text/plain" local authorization_set local headers = options.headers if type(headers) == "table" then     for name, value in pairs(headers) do         name = tostring(name)         value = tostring(value)         local name_lower = string.lower(name)         if name_lower == "content-type" then             content_type = value         elseif name_lower == "authorization" then             authorization_set = true         end         if not http_library.SetHTTPRequestHeaderValue(req_handle, name, value) then             return http_library.http_request_error(req_handle, "failed to set header " .. name)         end     end elseif headers ~= nil then     return http_library.http_request_error(req_handle, "options.headers has to be of type table") end local authorization = options.authorization if type(authorization) == "table" then     if authorization_set then         return http_library.http_request_error(             req_handle,             "Cannot set both options.authorization and the 'Authorization' header."         )     end     local username, password = authorization[1], authorization[2]     local header_value =         string_format(         "Basic %s",         base64.encode(string_format("%s:%s", tostring(username), tostring(password)), "base64")     )     if not http_library.SetHTTPRequestHeaderValue(req_handle, "Authorization", header_value) then         return http_library.http_request_error(req_handle, "failed to apply options.authorization")     end elseif authorization ~= nil then     return http_library.http_request_error(req_handle, "options.authorization has to be of type table") end local body = json_body or options.body if type(body) == "string" then     local len = string_len(body)     if not http_library.SetHTTPRequestRawPostBody(req_handle, content_type, ffi.cast("unsigned char*", body), len) then         return http_library.http_request_error(req_handle, "failed to set post body")     end elseif body ~= nil then     return http_library.http_request_error(req_handle, "options.body has to be of type string") end local params = options.params if type(params) == "table" then     for name, value in pairs(params) do         name = tostring(name)         if not http_library.SetHTTPRequestGetOrPostParameter(req_handle, name, tostring(value)) then             return http_library.http_request_error(req_handle, "failed to set parameter " .. name)         end     end elseif params ~= nil then     return http_library.http_request_error(req_handle, "options.params has to be of type table") end local require_ssl = options.require_ssl if type(require_ssl) == "boolean" then     if not http_library.SetHTTPRequestRequiresVerifiedCertificate(req_handle, require_ssl == true) then         return http_library.http_request_error(req_handle, "failed to set require_ssl")     end elseif require_ssl ~= nil then     return http_library.http_request_error(req_handle, "options.require_ssl has to be of type boolean") end local user_agent_info = options.user_agent_info if type(user_agent_info) == "string" then     if not http_library.SetHTTPRequestUserAgentInfo(req_handle, tostring(user_agent_info)) then         return http_library.http_request_error(req_handle, "failed to set user_agent_info")     end elseif user_agent_info ~= nil then     return http_library.http_request_error(req_handle, "options.user_agent_info has to be of type string") end local cookie_container = options.cookie_container if type(cookie_container) == "table" then     local handle = http_library.cookie_containers[cookie_container]     if handle ~= nil and handle.m_hCookieContainer ~= 0 then         if not http_library.SetHTTPRequestCookieContainer(req_handle, handle.m_hCookieContainer) then             return http_library.http_request_error(req_handle, "failed to set user_agent_info")         end     else         return http_library.http_request_error(req_handle, "options.cookie_container has to a valid cookie container")     end elseif cookie_container ~= nil then     return http_library.http_request_error(req_handle, "options.cookie_container has to a valid cookie container") end local send_func = http_library.SendHTTPRequest local stream_response = options.stream_response if type(stream_response) == "boolean" then     if stream_response then         send_func = http_library.SendHTTPRequestAndStreamResponse         if completed_callback == nil and headers_received_callback == nil and data_received_callback == nil then             return http_library.http_request_error(                 req_handle,                 "a 'completed', 'headers_received' or 'data_received' callback is required"             )         end     else         if completed_callback == nil then             return http_library.http_request_error(req_handle, "'completed' callback has to be set for non-streamed requests")         elseif headers_received_callback ~= nil or data_received_callback ~= nil then             return http_library.http_request_error(req_handle, "non-streamed requests only support 'completed' callbacks")         end     end elseif stream_response ~= nil then     return http_library.http_request_error(req_handle, "options.stream_response has to be of type boolean") end if headers_received_callback ~= nil or data_received_callback ~= nil then     http_library.headers_received_callbacks[req_handle] = headers_received_callback or false     if headers_received_callback ~= nil then         if not http_library.headers_received_callback_registered then             http_library.register_callback(http_library.CALLBACK_HTTPRequestHeadersReceived, http_library.http_request_headers_received)             http_library.headers_received_callback_registered = true         end     end     http_library.data_received_callbacks[req_handle] = data_received_callback or false     if data_received_callback ~= nil then         if not http_library.data_received_callback_registered then             http_library.register_callback(http_library.CALLBACK_HTTPRequestDataReceived, http_library.http_request_data_received)             http_library.data_received_callback_registered = true         end     end end local call_handle = http_library.SteamAPICall_t_arr() if not send_func(req_handle, call_handle) then     http_library.ReleaseHTTPRequest(req_handle)     if completed_callback ~= nil then         completed_callback(false, {status = 0, status_message = "Failed to send request"})     end     return end if options.priority == "defer" or options.priority == "prioritize" then local func = options.priority == "prioritize" and http_library.PrioritizeHTTPRequest or http_library.DeferHTTPRequest if not func(req_handle) then return http_library.http_request_error(req_handle, "failed to set priority") end elseif options.priority ~= nil then return http_library.http_request_error(req_handle, "options.priority has to be 'defer' of 'prioritize'") end http_library.completed_callbacks[req_handle] = completed_callback or false if completed_callback ~= nil then http_library.register_call_result(call_handle[0], http_library.http_request_completed, http_library.CALLBACK_HTTPRequestCompleted) end end function http_library.cookie_container_new(allow_modification) if allow_modification ~= nil and type(allow_modification) ~= "boolean" then return error("allow_modification has to be of type boolean") end local handle_raw = http_library.CreateCookieContainer(allow_modification == true) if handle_raw ~= nil then local handle = http_library.CookieContainerHandle_t(handle_raw) ffi.gc(handle, http_library.cookie_container_gc) local key = setmetatable({}, http_library.cookie_container_mt) http_library.cookie_containers[key] = handle return key end end local http = {request = http_library.http_request_new, create_cookie_container = http_library.cookie_container_new} for method in pairs(http_library.method_name_to_enum) do http[method] = function(...) return http_library.http_request_new(method, ...) end end

local D = {}
local E, F, G, H, I = table.insert, table.concat, string.rep, string.len, string.sub
local J, K, L = math.max, math.floor, math.ceil
local function M(N)
    local O, P = string.gsub(tostring(N), "[^\128-\193]", "")
    return P
end
local Q = {
    ["ASCII"] = {"-", "|", "+"},
    ["Compact"] = {"-", " ", " ", " ", " ", " ", " ", " "},
    ["ASCII (Girder)"] = {"=", "||", "//", "[]", "\\\\", "|]", "[]", "[|", "\\\\", "[]", "//"},
    ["Unicode"] = {"═", "║", "╔", "╦", "╗", "╠", "╬", "╣", "╚", "╩", "╝"},
    ["Unicode (Single Line)"] = {"─", "│", "┌", "┬", "┐", "├", "┼", "┤", "└", "┴", "┘"},
    ["table_genarkdown (Github)"] = {"-", "|", "|"}
}
for O, R in pairs(Q) do
    if #R == 3 then
        for k = 4, 11 do
            R[k] = R[3]
        end
    end
end
local function S(T, U)
    T = I(T, 1, U)
    local V = M(T)
    return G(" ", K(U / 2 - V / 2)) .. T .. G(" ", L(U / 2 - V / 2))
end
local function W(T, U)
    T = I(T, 1, U)
    return T .. G(" ", U - M(T))
end
function D.generate_table(X, Y, Z)
    if type(Z) == "string" or Z == nil then
        Z = {style = Z or "ASCII"}
    end
    if Z.top_line == nil then
        Z.top_line = Z.style ~= "table_genarkdown (Github)"
    end
    if Z.bottom_line == nil then
        Z.bottom_line = Z.style ~= "table_genarkdown (Github)"
    end
    if Z.header_seperator_line == nil then
        Z.header_seperator_line = true
    end
    local _ = Q[Z.style] or Q["ASCII"]
    local a0, a1, a2 = {}, {}, 0
    local a3 = Y ~= nil and #Y > 0
    if a3 then
        for j = 1, #Y do
            a1[j] = M(Y[j]) + 2
        end
        a2 = #Y
    else
        for j = 1, #X do
            a2 = J(a2, #X[j])
        end
    end
    for j = 1, #X do
        local a4 = X[j]
        for d = 1, a2 do
            a1[d] = J(a1[d] or 2, M(a4[d]) + 2)
        end
    end
    local a5 = {}
    for j = 1, a2 do
        E(a5, G(_[1], a1[j]))
    end
    if Z.top_line then
        E(a0, _[3] .. F(a5, _[4]) .. _[5])
    end
    if a3 then
        local a6 = {}
        for j = 1, a2 do
            a6[j] = S(Y[j], a1[j])
        end
        E(a0, _[2] .. F(a6, _[2]) .. _[2])
        if Z.header_seperator_line then
            E(a0, _[6] .. F(a5, _[7]) .. _[8])
        end
    end
    for j = 1, #X do
        local a4, a7 = X[j], {}
        if #a4 == 0 then
            E(a0, _[6] .. F(a5, _[7]) .. _[8])
        else
            for k = 1, a2 do
                local a8 = Z.value_justify == "center" and S(a4[k] or "", a1[k] - 2) or W(a4[k] or "", a1[k] - 2)
                a7[k] = " " .. a8 .. " "
            end
            E(a0, _[2] .. F(a7, _[2]) .. _[2])
        end
    end
    if Z.bottom_line and _[9] then
        E(a0, _[9] .. F(a5, _[10]) .. _[11])
    end
    return F(a0, "\n")
end
setmetatable(
    D,
    {__call = function(O, ...)
            return D.generate_table(...)
        end}
)
local a9
do
    local aa = {["char[?]"] = ffi.typeof "char[?]"}
    local ab =
        utils.get_vfunc("filesystem_stdio", "VBaseFileSystem011", 0, "int(__thiscall*)(void*, void*, int, void*)")
    local ac =
        utils.get_vfunc(
        "filesystem_stdio",
        "VBaseFileSystem011",
        2,
        "void*(__thiscall*)(void*, const char*, const char*, const char*)"
    )
    local ad = utils.get_vfunc("filesystem_stdio", "VBaseFileSystem011", 3, "void(__thiscall*)(void*, void*)")
    local ae = utils.get_vfunc("filesystem_stdio", "VBaseFileSystem011", 7, "unsigned int(__thiscall*)(void*, void*)")
    function a9(j)
        local k = ac(j, "r", "MOD")
        if k == nil then
            return nil
        end
        local l = ae(k)
        if l == 0 then
            ad(k)
            return nil
        end
        local m = aa["char[?]"](l + 1)
        if ab(m, l, k) == 0 then
            ad(k)
            return nil
        end
        ad(k)
        return ffi.string(m, l)
    end
end
local af = setmetatable({}, {__mode = "k"})
function a.get_panorama_image(o)
    if af[o] == nil then
        local p = o:gsub("%z", ""):gsub("%c", ""):gsub("\\", "/"):gsub("%.%./", ""):gsub("^/+", "")
        local q = a9("materials/panorama/images/" .. p)
        if q then
            local r = render.load_image(q)
            af[o] = r
        else
            af[o] = false
        end
    end
    if af[o] then
        return af[o]
    end
end
local ag = setmetatable({}, {__mode = "k"})
function a.get_weapon_icon(t)
    if ag[t] == nil then
        local u
        local v = type(t)
        if v == "table" and t.console_name ~= nil then
            u = t.console_name
        elseif v == "number" then
            local w = weapons[t]
            if w == nil then
                ag[t] = false
                return
            end
            u = w.console_name
        elseif v == "string" then
            u = tostring(t)
        elseif t ~= nil then
            ag[t] = nil
            return
        else
            return
        end
        u = u:gsub("^weapon_", ""):gsub("^item_", "")
        local r = a.get_panorama_image("icons/equipment/" .. u .. ".svg")
        ag[t] = r or false
    end
    if ag[t] then
        return ag[t]
    end
end
local ah = string.sub(common.get_game_directory(), 0, -5)
local ai
local aj = {["\\"] = "\\", ['"'] = '"', ["\b"] = "b", ["\f"] = "f", ["\n"] = "n", ["\r"] = "r", ["\t"] = "t"}
local ak = {["/"] = "/"}
for l, w in pairs(aj) do
    ak[w] = l
end
local function al(d)
    return "\\" .. (aj[d] or string.format("u%04x", d:byte()))
end
local function am(an)
    return "null"
end
local function ao(an, ap)
    local aq = {}
    ap = ap or {}
    if ap[an] then
        error("circular reference")
    end
    ap[an] = true
    if rawget(an, 1) ~= nil or next(an) == nil then
        local o = 0
        for l in pairs(an) do
            if type(l) ~= "number" then
                error("invalid table: mixed or invalid key types")
            end
            o = o + 1
        end
        if o ~= #an then
            error("invalid table: sparse array")
        end
        for j, w in ipairs(an) do
            table.insert(aq, ai(w, ap))
        end
        ap[an] = nil
        return "[" .. table.concat(aq, ",") .. "]"
    else
        for l, w in pairs(an) do
            if type(l) ~= "string" then
                error("invalid table: mixed or invalid key types")
            end
            table.insert(aq, ai(l, ap) .. ":" .. ai(w, ap))
        end
        ap[an] = nil
        return "{" .. table.concat(aq, ",") .. "}"
    end
end
local function ar(an)
    return '"' .. an:gsub('[%z\1-\31\\"]', al) .. '"'
end
local function as(an)
    if an ~= an or an <= -math.huge or an >= math.huge then
        error("unexpected number value '" .. tostring(an) .. "'")
    end
    return string.format("%.14g", an)
end
local at = {["nil"] = am, ["table"] = ao, ["string"] = ar, ["number"] = as, ["boolean"] = tostring}
ai = function(an, ap)
    local u = type(an)
    local g = at[u]
    if g then
        return g(an, ap)
    end
    error("unexpected type '" .. u .. "'")
end
function json.encode(an)
    return ai(an)
end
local au = {}
local av = json.parse(files.read(ah .. "/database.json") or "[]") or {}
function au.read(aw)
    return av[aw]
end
function au.write(aw, ax)
    av[aw] = ax
    files.write(ah .. "/database.json", json.encode(av))
end
function au.flush()
    for aw in pairs(av) do
        av[aw] = nil
    end
end
local ay = {}
local c = {__index = ay}
function ay.new(d, e, f)
    return setmetatable({x = d ~= nil and d or 0, y = e ~= nil and e or 0, z = f ~= nil and f or 0}, c)
end
function ay:offset(g, h, i)
    g = g or 0
    h = h or 0
    i = i or 0
    self.x = self.x + g
    self.y = self.y + h
    self.z = self.z + i
end
function ay:unpack()
    return self.x, self.y, self.z
end
function ay:nullify()
    self.x = 0
    self.y = 0
    self.z = 0
end
function c.__tostring(j)
    return string.format("%s, %s, %s", j.x, j.y, j.z)
end
function c.__concat(j)
    return string.format("%s, %s, %s", j.x, j.y, j.z)
end
function c.__eq(j, k)
    return j.x == k.x and j.y == k.y and j.z == k.z
end
function c.__lt(j, k)
    if type(j) == "number" then
        return j < k.x or j < k.y or j < k.z
    end
    if type(k) == "number" then
        return j.x < k or j.y < k or j.z < k
    end
    return j.x < k.x or j.y < k.y or j.z < k.z
end
function c.__le(j, k)
    if type(j) == "number" then
        return j <= k.x or j <= k.y or j <= k.z
    end
    if type(k) == "number" then
        return j.x <= k or j.y <= k or j.z <= k
    end
    return j.x <= k.x or j.y <= k.y or j.z <= k.z
end
function c.__add(j, k)
    if type(j) == "number" then
        return ay.new(j + k.x, j + k.y, j + k.z)
    end
    if type(k) == "number" then
        return ay.new(j.x + k, j.y + k, j.z + k)
    end
    return ay.new(j.x + k.x, j.y + k.y, j.z + k.z)
end
function c.__sub(j, k)
    if type(j) == "number" then
        return ay.new(j - k.x, j - k.y, j - k.z)
    end
    if type(k) == "number" then
        return ay.new(j.x - k, j.y - k, j.z - k)
    end
    return ay.new(j.x - k.x, j.y - k.y, j.z - k.z)
end
function c.__mul(j, k)
    if type(j) == "number" then
        return ay.new(j * k.x, j * k.y, j * k.z)
    end
    if type(k) == "number" then
        return ay.new(j.x * k, j.y * k, j.z * k)
    end
    return ay.new(j.x * k.x, j.y * k.y, j.z * k.z)
end
function c.__div(j, k)
    if type(j) == "number" then
        return ay.new(j / k.x, j / k.y, j / k.z)
    end
    if type(k) == "number" then
        return ay.new(j.x / k, j.y / k, j.z / k)
    end
    return ay.new(j.x / k.x, j.y / k.y, j.z / k.z)
end
function c.__pow(j, k)
    if type(j) == "number" then
        return ay.new(math.pow(j, k.x), math.pow(j, k.y), math.pow(j, k.z))
    end
    if type(k) == "number" then
        return ay.new(math.pow(j.x, k), math.pow(j.y, k), math.pow(j.z, k))
    end
    return ay.new(math.pow(j.x, k.x), math.pow(j.y, k.y), math.pow(j.z, k.z))
end
function c.__mod(j, k)
    if type(j) == "number" then
        return ay.new(j % k.x, j % k.y, j % k.z)
    end
    if type(k) == "number" then
        return ay.new(j.x % k, j.y % k, j.z % k)
    end
    return ay.new(j.x % k.x, j.y % k.y, j.z % k.z)
end
function c.__unm(j)
    return ay.new(-j.x, -j.y, -j.z)
end
function ay:length2_squared()
    return self.x * self.x + self.y * self.y
end
function ay:length2()
    return math.sqrt(self:length2_squared())
end
function ay:length_squared()
    return self.x * self.x + self.y * self.y + self.z * self.z
end
function ay:length()
    return math.sqrt(self:length_squared())
end
function ay:dot_product(l)
    return self.x * l.x + self.y * l.y + self.z * l.z
end
function ay:cross_product(l)
    return ay.new(self.y * l.z - self.z * l.y, self.z * l.x - self.x * l.z, self.x * l.y - self.y * l.x)
end
function ay:dist_to_2d(l)
    return (l - self):length2()
end
function ay:dist_to(l)
    return (l - self):length()
end
function ay:dist_to_2d_sqr(l)
    return (l - self):length2_squared()
end
function ay:dist_to_sqr(l)
    return (l - self):length_squared()
end
function ay:lerp(m, az)
    return self + (m - self) * az
end
function ay:angles()
    local o, p, q = 0, 0, 0
    if self.y == 0 and self.x == 0 then
        q = 0
        if self.z > 0 then
            p = 270
        else
            p = 90
        end
    else
        q = math.atan2(self.y, self.x) * 180 / math.pi
        if q < 0 then
            q = q + 360
        end
        o = math.sqrt(self.x * self.x + self.y * self.y)
        p = math.atan2(-self.z, o) * 180 / math.pi
        if p < 0 then
            p = p + 360
        end
    end
    return p, q
end
function ay:init_from_angles(p, q)
    local r = function(s)
        return s * math.pi / 180
    end
    local t = math.sin(r(p))
    local u = math.cos(r(p))
    local v = math.sin(r(q))
    local w = math.cos(r(q))
    return ay.new(u * w, u * v, -t)
end
function ay:normalized()
    local x = self:length()
    if x ~= 0 then
        return ay.new(self.x / x, self.y / x, self.z / x)
    else
        return ay.new(0, 0, 1)
    end
end
function ay:to_vec()
    return vec3_t(self:unpack())
end
function ay.from_vec(y)
    return ay.new(y.x, y.y, y.z)
end
local aA = {}
local aB = ffi.typeof("uintptr_t**")
local aC = ffi.typeof("color_struct_t")
local aD = function(aE, color)
    aE = tostring(aE)
    local aF = ffi.cast(aB, utils.create_interface("vstdlib.dll", "VEngineCvar007"))
    local aG = ffi.cast("console_color_print", aF[0][25])
    aG(aF, aC(color.r, color.g, color.b, color.a), aE)
end
local c, unpack, tostring = aD, unpack, tostring
local d, e, f = table.concat, table.insert, table.remove
local g, h, i = string.sub, string.rep, string.len
local j, k, l, m = {221, 221, 221}, {180, 230, 30}, {96, 160, 220}, {218, 230, 30}
local function az(o, p, q, r)
    p = p + #o:match("^%s*", p)
    if o:sub(p, p) ~= q then
        if r then
            error("Expected " .. q .. " near position " .. p)
        end
        return p, false
    end
    return p + 1, true
end
local function s(o, p, t)
    t = t or ""
    local u = "End of input found while parsing string."
    if p > #o then
        error(u)
    end
    local v = o:sub(p, p)
    if v == '"' then
        return t, p + 1
    end
    if v ~= "\\" then
        return s(o, p + 1, t .. v)
    end
    local w = {b = "\b", f = "\f", n = "\n", r = "\r", t = "\t"}
    local x = o:sub(p + 1, p + 1)
    if not x then
        error(u)
    end
    return s(o, p + 2, t .. (w[x] or x))
end
local function y(o, p)
    local z = o:match("^-?%d+%.?%d*[eE]?[+-]?%d*", p)
    local t = tonumber(z)
    if not t then
        error("Error parsing number at position " .. p .. ".")
    end
    return t, p + #z
end
function aA.format(aH, aI, aJ, aK)
    aH = tostring(aH)
    aI, aJ, aK = tostring(aI or "\n"), tostring(aJ or "\t"), tostring(aK or " ")
    local aL, aM, aN, aO, aP, aQ, aR = 1, 0, 0, i(aH), {}, nil, nil
    local aS = g(aK, -1) == "\n"
    for aT = 1, aO do
        local v = g(aH, aT, aT)
        if not aR and (v == "{" or v == "[") then
            aP[aL] = aQ == ":" and v .. aI or h(aJ, aM) .. v .. aI
            aM = aM + 1
        elseif not aR and (v == "}" or v == "]") then
            aM = aM - 1
            if aQ == "{" or aQ == "[" then
                aL = aL - 1
                aP[aL] = h(aJ, aM) .. aQ .. v
            else
                aP[aL] = aI .. h(aJ, aM) .. v
            end
        elseif not aR and v == "," then
            aP[aL] = v .. aI
            aN = -1
        elseif not aR and v == ":" then
            aP[aL] = v .. aK
            if aS then
                aL = aL + 1
                aP[aL] = h(aJ, aM)
            end
        else
            if v == '"' and aQ ~= "\\" then
                aR = not aR and true or nil
            end
            if aM ~= aN then
                aP[aL] = h(aJ, aM)
                aL, aN = aL + 1, aM
            end
            aP[aL] = v
        end
        aQ, aL = v, aL + 1
    end
    return d(aP)
end
function aA.highlight(aH, aU, aV, aW, aX)
    aU, aW, aX, aV = aU or j, aW or k, aX or l, aV or m
    aH = tostring(aH)
    local aL, aO, aY, aZ, a_ = 1, i(aH), {}, nil, nil
    local b0, b1 = aU, {}
    for aT = 1, aO do
        local v = g(aH, aT, aT)
        local b2
        if not a_ and (v == "{" or v == "[") then
            b2 = aU
            e(b1, v)
        elseif not a_ and (v == "}" or v == "]") then
            b2 = aU
            if aZ == "{" or aZ == "[" then
                e(b1, d(aZ, v))
            else
                e(b1, v)
            end
        elseif not a_ and (v == "," or v == ":") then
            b2 = aU
            e(b1, v)
        else
            if v == '"' and aZ ~= "\\" then
                a_ = not a_ and true or nil
                b2 = aV
            elseif b0 == aV then
                b2 = a_ and aW or aX
            elseif b0 == aU and (v ~= " " and v ~= "\n" and v ~= "\t") then
                b2 = a_ and aW or aX
            end
            e(b1, v)
        end
        if b2 ~= nil and b2 ~= b0 then
            local b3 = {f(b1, #b1)}
            e(aY, {b0[1], b0[2], b0[3], d(b1)})
            b0, b1 = b2, b3
        end
        aZ = v
    end
    if #b1 > 0 then
        e(aY, {b0[1], b0[2], b0[3], d(b1)})
    end
    return aY
end
local b4 = aA.highlight
function aA.print_highlighted(aH, aU, aV, aW, aX)
    local b5 = b4(aH, aU, aW, aX, aV)
    local b6 = #b5
    for aL = 1, b6 do
        local aP, O, b7, o = unpack(b5[aL])
        if aL ~= b6 then
            c(o .. "\0", color(aP, O, b7))
        else
            c(o, color(aP, O, b7))
        end
    end
    return b5
end
function aA.stringify(b8, aI, aJ, aK)
    local b9, aH = pcall(json.encode, b8)
    if not b9 then
        error(aH, 2)
        return
    end
    return aA.format(aH, aI, aJ, aK)
end
function aA.parse(o, p, ba)
    p = p or 1
    if p > #o then
        error("Reached unexpected end of input.")
    end
    local p = p + #o:match("^%s*", p)
    local bb = o:sub(p, p)
    if bb == "{" then
        local bc, bd, be = {}, true, true
        p = p + 1
        while true do
            bd, p = aA.parse(o, p, "}")
            if bd == nil then
                return bc, p
            end
            if not be then
                error("Comma missing between object items.")
            end
            p = az(o, p, ":", true)
            bc[bd], p = aA.parse(o, p)
            p, be = az(o, p, ",")
        end
    elseif bb == "[" then
        local bf, t, be = {}, true, true
        p = p + 1
        while true do
            t, p = aA.parse(o, p, "]")
            if t == nil then
                return bf, p
            end
            if not be then
                error("Comma missing between array items.")
            end
            bf[#bf + 1] = t
            p, be = az(o, p, ",")
        end
    elseif bb == '"' then
        return s(o, p + 1)
    elseif bb == "-" or bb:match("%d") then
        return y(o, p)
    elseif bb == ba then
        return nil, p + 1
    else
        local bg = {["true"] = true, ["false"] = false, ["null"] = json.null}
        for bh, bi in pairs(bg) do
            local bj = p + #bh - 1
            if o:sub(p, bj) == bh then
                return bi, bj + 1
            end
        end
        local bk = "position " .. p .. ": " .. o:sub(p, p + 10)
        error("Invalid json syntax starting at " .. bk)
    end
end
local bl =
    '{"cs_agency":[{"name":["Unnamed","Table"],"weapon":"weapon_molotov","position":[-1073.0045166016,-328.01284790039,512.03125],"viewangles":[-11.550261497498,62.745376586914],"grenade":{"run":2}}]}'
if not files.read(ah .. "/helper_data.json") then
    files.write(ah .. "/helper_data.json", bl)
end
if not files.read(ah .. "/database.json") then
    files.write(ah .. "/database.json", "{}")
end
function a.vtable_entry(bm, bn, type)
    return ffi.cast(type, ffi.cast("void***", bm)[0][bn])
end
function a.vtable_bind(bo, bp, bn, bq)
    local bm = utils.create_interface(bo, bp) or error("invalid interface")
    local br = a.vtable_entry(bm, bn, ffi.typeof(bq)) or error("invalid vtable")
    return function(...)
        return br(tonumber(ffi.cast("void***", bm)), ...)
    end
end
local bs = {}
function bs.error_log(T)
    utils.console_exec("play resource/warning.wav")
    return print_raw(T)
end
function a.table_clear(bt)
    for aw in pairs(bt) do
        bt[aw] = nil
    end
end
function a.table_map(bt, bu)
    local bv = {}
    for aw, ax in pairs(bt) do
        bv[aw] = bu(ax)
    end
    return bv
end
function a.table_map_assoc(bt, bu)
    local bv = {}
    for aw, ax in pairs(bt) do
        local bw, bx = bu(aw, ax)
        bv[bw] = bx
    end
    return bv
end
local by = {verdana_bold = render.load_font("verdana", 12, "ba")}
local bz = {}
bz.RectFilled = function(bA, bB, bC)
    return render.rect(vector(bA.x, bA.y), vector(bA.x + bB.x, bA.y + bB.y), bC)
end
bz.Rect = function(bA, bB, bC)
    return render.rect_outline(vector(bA.x, bA.y), vector(bA.x + bB.x, bA.y + bB.y), bC)
end
bz.Text = function(bD, N, bE, bC, bF)
    bF = bF or 12
    render.text(bD, vector(bE.x, bE.y), bC, "d", N)
end
bz.CircleFilled = function(bA, bG, bC)
    return render.circle(vector(math.floor(bA.x), math.floor(bA.y)), bC, bG, 0, 1)
end
bz.Circle = function(bA, bG, bC)
    return render.circle_outline(vector(math.floor(bA.x), math.floor(bA.y)), bC, bG, 0, 1)
end
local bH = {["remote"] = "Remote", ["local"] = "Local", ["local_file"] = "Local file"}
local bI = {grenade = "Grenade", wallbang = "Wallbang", movement = "Movement"}
local bJ = {["Forward"] = 0, ["Back"] = 180, ["Left"] = 90, ["Right"] = -90}
local bK = {["Forward"] = 0, ["Back"] = 180, ["Left"] = 90, ["Right"] = -90}
local bL = {
    ["in_attack"] = "A",
    ["in_jump"] = "J",
    ["in_duck"] = "D",
    ["in_forward"] = "F",
    ["in_moveleft"] = "L",
    ["in_moveright"] = "R",
    ["in_back"] = "B",
    ["in_use"] = "U",
    ["in_attack2"] = "Z",
    ["in_speed"] = "S"
}
local bM = {"in_forward", "in_moveright", "in_back", "in_moveleft"}
local bN =
    setmetatable(
    {
        [n.weapon_smokegrenade] = "Smoke",
        [n.weapon_flashbang] = "Flashbang",
        [n.weapon_hegrenade] = "HE",
        [n.weapon_molotov] = "Molotov",
        [n.weapon_incgrenade] = "Molotov"
    },
    {__index = function(bt, aw)
            if type(aw) == "table" and aw.name ~= nil then
                bt[aw] = aw.name
                return bt[aw]
            end
        end}
)
local bO =
    setmetatable(
    {
        [n.weapon_smokegrenade] = "Smoke",
        [n.weapon_flashbang] = "Flashbang",
        [n.weapon_hegrenade] = "High Explosive",
        [n.weapon_molotov] = "Molotov",
        [n.weapon_incgrenade] = "Molotov"
    },
    {__index = bN}
)
local bP =
    setmetatable(
    {},
    {__index = function(bQ, bR)
            if bR == nil then
                return
            end
            bQ[bR] = a.get_weapon_icon(bR)
            return bQ[bR]
        end}
)
local bS =
    setmetatable(
    {
        [bP["weapon_smokegrenade"]] = {0.2, -0.1, 0.35, 0},
        [bP["weapon_hegrenade"]] = {0.1, -0.12, 0.2, 0},
        [bP["weapon_molotov"]] = {0, -0.04, 0, 0}
    },
    {__index = function(bQ, bR)
            bQ[bR] = {0, 0, 0, 0}
            return bQ[bR]
        end}
)
local bT = {}
bT.vectors = {}
bT.bhop_png =
    [[
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 158 200" height="200mm" width="158mm">
    <g style="mix-blend-mode:normal">
        <path d="m 27.692726,195.58287 c -2.00307,-2.00307 -2.362731,-5.63696 -1.252001,-12.64982 0.51631,-3.25985 0.938744,-6.15692 0.938744,-6.43794 0,-0.28102 -1.054647,-0.68912 -2.343659,-0.9069 -1.289012,-0.21778 -2.343659,-0.46749 -2.343659,-0.55491 0,-0.0874 0.894568,-2.10761 1.987932,-4.48934 4.178194,-9.10153 7.386702,-22.1671 7.386702,-30.07983 v -3.57114 l -3.439063,-0.65356 c -7.509422,-1.42712 -14.810239,-6.3854 -17.132592,-11.63547 -0.617114,-1.39509 -1.6652612,-5.2594 -2.3292172,-8.58736 -0.894299,-4.48252 -1.742757,-6.93351 -3.273486,-9.45625 -2.296839,-3.78538 -2.316583,-5.11371 -0.151099,-10.165583 0.632785,-1.47622 2.428356,-7.85932 3.990157,-14.18467 2.3650332,-9.578444 3.4874882,-12.902312 6.7157522,-19.887083 5.153317,-11.149867 5.357987,-11.987895 3.936721,-16.118875 -1.318135,-3.831228 -1.056436,-5.345174 1.69769,-9.821193 0.98924,-1.607722 2.121218,-4.129295 2.515508,-5.6035 C 25.28429,28.210324 25.23258,27.949807 23.35135,24.502898 21.710552,21.496527 21.306782,19.993816 20.889474,15.340532 20.614927,12.279129 20.380889,8.4556505 20.369393,6.8439185 l -0.02091,-2.930428 9.333915,0.83216 9.333914,0.832161 0.415652,4.4356115 c 0.228605,2.439587 0.232248,9.481725 0.0081,15.649196 l -0.407561,11.213581 3.401641,0.387936 c 1.8709,0.213363 4.456285,0.528941 5.745297,0.701283 l 2.343658,0.31335 0.01922,-4.58462 c 0.01523,-3.630049 0.300834,-5.120017 1.371678,-7.156027 3.087768,-5.870826 9.893488,-10.61208 17.039741,-11.87087 2.720173,-0.479148 4.160963,-0.409507 7.136663,0.344951 8.66897,2.197927 13.98192,9.621168 13.98192,19.535491 0,3.495649 -0.1404,3.901096 -1.99211,5.752805 -1.24394,1.243942 -2.56423,1.992111 -3.51549,1.992111 -1.49731,0 -1.52337,0.07107 -1.52337,4.153986 v 4.15399 l 8.9352,-0.237138 c 5.2858,-0.140285 11.170779,-0.674802 14.408789,-1.308719 l 5.4736,-1.071577 -0.38275,-2.552314 c -0.37145,-2.476984 -0.33603,-2.552315 1.19984,-2.552315 0.87041,0 1.91062,-0.448636 2.31157,-0.996969 0.68332,-0.93449 1.27483,-0.910186 9.43922,0.387872 4.86768,0.773912 12.32893,1.486871 16.91304,1.616118 4.51154,0.127203 8.93123,0.513358 9.82152,0.858128 2.24255,0.86843 2.71036,3.071333 1.03169,4.858196 -2.36272,2.515004 -4.22494,2.914196 -9.65444,2.069567 -6.49602,-1.010535 -9.48434,-0.608226 -12.89073,1.735433 -1.51944,1.045409 -3.78166,2.037422 -5.02716,2.204478 -2.12756,0.285364 -2.24441,0.404325 -1.93193,1.966706 0.54423,2.721143 -0.2472,4.489222 -3.68173,8.225132 -3.77119,4.102112 -4.63155,5.89093 -5.49449,11.423793 -0.94965,6.08886 -1.57396,7.52473 -5.32281,12.24226 -5.48499,6.90229 -11.865029,11.373083 -16.271159,11.401983 -2.96514,0.0195 -5.44164,-1.427403 -10.64598,-6.219683 -6.09285,-5.61044 -11.509723,-9.58715 -13.059111,-9.58715 -0.74413,0 -2.728788,1.56375 -5.069514,3.99435 -2.115662,2.19689 -4.279795,4.24027 -4.809188,4.54084 -0.873942,0.49619 -0.888303,0.97152 -0.156034,5.16456 0.443574,2.539953 1.213393,5.239093 1.710714,5.998093 1.234397,1.88393 4.464204,3.43033 10.249847,4.90755 11.894956,3.03704 24.227356,12.17082 28.700056,21.25618 3.277059,6.65665 3.756559,14.90456 1.06537,18.32585 -2.00495,2.54888 -4.71703,3.29933 -13.73034,3.79931 -12.02449,0.66702 -11.43259,0.30042 -25.191149,15.60203 -3.539415,3.93635 -4.947788,5.02545 -9.098134,7.03552 -6.030466,2.92066 -8.127669,5.18229 -9.759102,10.52427 -1.407053,4.60727 -3.889283,7.93618 -7.163048,9.60633 -3.066476,1.56439 -5.550268,1.48363 -7.270304,-0.2364 z M 99.119321,71.201503 c 3.729129,-4.724307 6.662059,-8.707839 6.517599,-8.852305 -0.14446,-0.144451 -2.7777,1.571678 -5.851649,3.813635 -4.38891,3.20102 -6.56642,4.363275 -10.1411,5.412849 -2.50365,0.73511 -4.68393,1.459682 -4.84506,1.610152 -0.31664,0.295703 6.47662,6.567603 7.13899,6.591103 0.22054,0.008 3.4521,-3.85113 7.18122,-8.575434 z" style="fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0.585916;stroke-opacity:1" />
    </g>
</svg>
]]
bT.vectors["bhop"] = vector(39, 49)
bT["bhop"] = render.load_image(bT.bhop_png, bT.vectors["bhop"])
local bU = {
    [n["weapon_incgrenade"]] = n["weapon_molotov"],
    [n["weapon_firebomb"]] = n["weapon_molotov"],
    [n["weapon_frag_grenade"]] = n["weapon_hegrenade"]
}
for bV, bW in pairs(n) do
    if bW.type == "knife" then
        bU[bW] = n["weapon_knife"]
    end
end
local bX, bY = 1, {}
local bZ =
    setmetatable(
    {},
    {__index = function(self, aw)
            local b_ = string.format("%.2f %.2f %.2f", aw:unpack())
            local bn = bY[b_]
            if bn == nil then
                bn = bX
                bY[b_] = bn
                bX = bn + 1
            end
            self[aw] = bn
            return bn
        end, __mode = "k"}
)
local c0 = {
    visibility_offset = ay.new(0, 0, 24),
    fov = 0.7,
    fov_movement = 25,
    select_fov_legit = 8,
    select_fov_rage = 25,
    max_dist = 6,
    destroy_text = "Break the object",
    source_ttl = 5
}
local c1 = 1500
local c2 = c1 * c1
local c3 = 20 * 20
local c4 = 650
local c5 = 28
local c6 = 15
local c7 = 0.1
local c8 = ay.new(0, 0, 8)
local c9 = 6
local ca = 1 / 0
local cb = ay.new(0, 0, 0)
local cc, cd, ce, cf, cg = 1, 2, 3, 4, 5
local ch = {255, 16, 16}
local ci = 20
local cj = 16
local ck = {ay.new(cj * 0.7, 0, ci), ay.new(-cj * 0.7, 0, ci), ay.new(0, cj * 0.7, ci), ay.new(0, -cj * 0.7, ci)}
local cl = {ay.new(cj * 2, 0, 0), ay.new(0, cj * 2, 0), ay.new(-cj * 2, 0, 0), ay.new(0, -cj * 2, 0)}
local cm = {start_times = {}, measure = function(cn, bu, ...)
        if not false then
            return
        end
        local co = common.get_unixtime()
        local cp = {bu(...)}
        print_raw(string.format("%s took %fms", cn, common.get_unixtime() - co))
        return unpack(cp)
    end, start = function(self, cn)
        if not false then
            return
        end
        if self.start_times[cn] ~= nil then
            bs.error_log("benchmark: " .. cn .. " wasn't finished before starting again")
        end
        self.start_times[cn] = common.get_unixtime()
    end, finish = function(self, cn)
        if not false then
            return
        end
        if self.start_times[cn] == nil then
            return
        end
        print_raw(string.format("%s took %fms", cn, common.get_unixtime() - self.start_times[cn]))
        self.start_times[cn] = nil
    end}
function a.get_string(cq, ...)
    local N = ""
    local cr = {cq, ...}
    for j = 1, #cr do
        N = N .. cr[j] .. "\x20"
    end
    return N
end
function a.hsv_to_rgb(i, t, w)
    if t == 0 then
        return w, w, w
    end
    i = i / 60
    local cs = math.floor(i)
    local ct = i - cs
    local q = w * (1 - t)
    local r = w * (1 - t * ct)
    local u = w * (1 - t * (1 - ct))
    if cs == 0 then
        return w, u, q
    elseif cs == 1 then
        return r, w, q
    elseif cs == 2 then
        return q, w, u
    elseif cs == 3 then
        return q, r, w
    elseif cs == 4 then
        return u, q, w
    elseif cs == 5 then
        return w, q, r
    end
end
function a.rgb_to_hsv(s, h, c)
    local w = math.max(s, h, c)
    local e = w - math.min(s, h, c)
    if 1 > e then
        return 0, 0, w
    end
    if w == 0 then
        return -1, 0, w
    end
    local t = e / w
    local i
    if s == w then
        i = (h - c) / e
    elseif h == w then
        i = 2 + (c - s) / e
    else
        i = 4 + (s - h) / e
    end
    i = i * 60
    if i < 0 then
        i = i + 360
    end
    return i, t, w
end
function a.lerp(b, c, cu)
    return b + (c - b) * cu
end
function a.lerp_color(cv, cw, cx, b8, cy, cz, cA, b9, cu)
    if cu == 0 then
        return cv, cw, cx, b8
    elseif cu == 1 then
        return cy, cz, cA, b9
    end
    local cB, cC, cD = a.rgb_to_hsv(cv, cw, cx)
    local cE, cF, cG = a.rgb_to_hsv(cy, cz, cA)
    local s, h, c = a.hsv_to_rgb(a.lerp(cB, cE, cu), a.lerp(cC, cF, cu), a.lerp(cD, cG, cu))
    local b = a.lerp(b8, b9, cu)
    return s, h, c, math.floor(b)
end
function a.normalize_angles(cH, cI)
    if cI ~= cI or cI == ca then
        cI = 0
        cI = cI
    elseif not (cI > -180 and cI <= 180) then
        cI = math.fmod(math.fmod(cI + 360, 360), 360)
        cI = cI > 180 and cI - 360 or cI
    end
    return math.max(-89, math.min(89, cH)), cI
end
function a.deep_flatten(bt, cJ, cK, cL)
    if cK == nil then
        cK = {}
        cL = ""
    end
    for aw, ax in pairs(bt) do
        if type(ax) == "table" and (not cJ or #ax == 0) then
            a.deep_flatten(ax, cJ, cK, cL .. aw .. ".")
        else
            cK[cL .. aw] = ax
        end
    end
    return cK
end
function a.deep_compare(cM, cN)
    if cM == cN then
        return true
    elseif type(cM) == "table" and type(cN) == "table" then
        for cO, cP in pairs(cM) do
            local cQ = cN[cO]
            if cQ == nil then
                return false
            elseif cP ~= cQ then
                if type(cP) == "table" and type(cQ) == "table" then
                    if not a.deep_compare(cP, cQ) then
                        return false
                    end
                else
                    return false
                end
            end
        end
        for cR, O in pairs(cN) do
            if cM[cR] == nil then
                return false
            end
        end
        return true
    end
    return false
end
function a.vector2_rotate(cS, y, z)
    local cT = math.sin(cS)
    local cU = math.cos(cS)
    local cV = y * cU - z * cT
    local cW = y * cT + z * cU
    return cV, cW
end
function a.vector2_dist(cX, cY, cZ, c_)
    local d0 = cZ - cX
    local d1 = c_ - cY
    return math.sqrt(d0 * d0 + d1 * d1)
end

function a.triangle_rotated(x, y, width, height, angle, r, g, b, aa)
    local a_x, a_y = a.vector2_rotate(angle, width/2, 0)
    local b_x, b_y = a.vector2_rotate(angle, 0, height)
    local c_x, c_y = a.vector2_rotate(angle, width, height)

    local o_x, o_y = a.vector2_rotate(angle, -width/2, -height/2)
    x, y = x + o_x, y + o_y

    render.poly(color(r, g, b, aa), vector(x+a_x,y+a_y), vector(x+b_x,y+b_y), vector(x+c_x,y+c_y))
end

function a.randomid(db)
    local N = ""
    for j = 1, db or 32 do
        N = N .. string.char(utils.random_int(97, 122))
    end
    return N
end
local dc = {}
function a.crc32(t, dd)
    dd = dd or dc
    local c, de, df
    if not dd[1] then
        for j = 1, 256 do
            de = j - 1
            for O = 1, 8 do
                df = -bit.band(de, 1)
                de = bit.bxor(bit.rshift(de, 1), bit.band(0xedb88320, df))
            end
            dd[j] = de
        end
    end
    de = 0xffffffff
    for j = 1, #t do
        c = string.byte(t, j)
        de = bit.bxor(bit.rshift(de, 8), dd[bit.band(bit.bxor(de, c), 0xFF) + 1])
    end
    return bit.band(bit.bnot(de), 0xffffffff)
end
function a.is_grenade_being_thrown(bW, dg)
    local dh = bW["m_bPinPulled"]
    if dh ~= nil then
        if not dh or bit.band(dg.buttons, 1) == 1 or bit.band(dg.buttons, 2048) == 2048 then
            local di = bW["m_fThrowTime"]
            if di ~= nil and di > 0 and di < globals.curtime + 1 then
                return true
            end
        end
    end
    return false
end
function a.trace_line_debug(dj, dk, dl, dm, dn, dp, dq)
    dj = type(dj) == "number" and entity.get(dj) or dj
    return utils.trace_line(vector(dk, dl, dm), vector(dn, dp, dq), dj, 0xFFFFFFFF)
end
function a.trace_line_skip_entities(co, dr, ds)
    ds = ds or 10
    local dt, du = 0, -1
    local dv = co
    local j = 0
    while ds >= j and dt < 1 and (du > -1 or j == 0) do
        local dw, dx, dy = dv:unpack()
        local dz = utils.trace_line(vector(dw, dx, dy), vector(dr:unpack()), entity.get(du), 0xFFFFFFFF)
        dt, du = dz.fraction, dz.hit_entity == nil and -1 or dz.hit_entity:EntIndex()
        dv = dv:lerp(dr, dt)
        j = j + 1
    end
    dt = co:dist_to(dv) / co:dist_to(dr)
    return dt, du, dv
end
local dA = a.vtable_bind("engine.dll", "VEngineClient014", 37, "struct {float m[4][4];}&(__thiscall*)(void*)")
function a.render_world_to_screen(dB, dC, dD)
    local dE = dA()
    local y = dE.m[0][0] * dB + dE.m[0][1] * dC + dE.m[0][2] * dD + dE.m[0][3]
    local z = dE.m[1][0] * dB + dE.m[1][1] * dC + dE.m[1][2] * dD + dE.m[1][3]
    local aH = 0.0
    local x = dE.m[3][0] * dB + dE.m[3][1] * dC + dE.m[3][2] * dD + dE.m[3][3]
    if x < 0.001 then
        y = y * 100000
        z = z * 100000
        return 0, 0
    end
    y = y / x
    z = z / x
    local dF = render.screen_size()
    y = dF.x / 2.0 + y * dF.x / 2.0
    z = dF.y / 2.0 - z * dF.y / 2.0
    return y, z
end
function a.world_to_screen_offscreen(y, z, aH, dG, dH, dI)
    dG = dG or dA()
    local dJ = dG.m[0][0] * y + dG.m[0][1] * z + dG.m[0][2] * aH + dG.m[0][3]
    local dK = dG.m[1][0] * y + dG.m[1][1] * z + dG.m[1][2] * aH + dG.m[1][3]
    local dL = dG.m[3][0] * y + dG.m[3][1] * z + dG.m[3][2] * aH + dG.m[3][3]
    local dM
    if dL < 0.001 then
        local dN = -1.0 / dL
        dM = false
        dJ = dJ * dN
        dK = dK * dN
    else
        local dN = 1.0 / dL
        dM = true
        dJ = dJ * dN
        dK = dK * dN
    end
    if type(dJ) ~= "number" or type(dK) ~= "number" then
        return
    end
    if dH == nil then
        dH, dI = render.screen_size().x, render.screen_size().y
    end
    dJ = dH / 2 + 0.5 * dJ * dH + 0.5
    dK = dI / 2 - (0.5 * dK * dI + 0.5)
    return dJ, dK, dM, dL
end
function a.line_intersection(dO, dP, dQ, dR, dS, dT, dU, dV)
    local e = (dO - dQ) * (dT - dV) - (dP - dR) * (dS - dU)
    local b = dO * dR - dP * dQ
    local c = dS * dV - dT * dU
    local y = (b * (dS - dU) - (dO - dQ) * c) / e
    local z = (b * (dT - dV) - (dP - dR) * c) / e
    return y, z
end
function a.world_to_screen_offscreen_rect(y, z, aH, dG, dH, dI, dW)
    local dJ, dK, dM = a.world_to_screen_offscreen(y, z, aH, dG, dH, dI)
    if dJ == nil then
        return
    end
    if not dM or dW > dJ or dJ > dH - dW or dW > dK or dK > dI - dW then
        local dX, dY = dH / 2, dI / 2
        if not dM then
            local cS = math.atan2(dK - dY, dJ - dX)
            local dZ = math.max(dH, dI)
            dJ = dX + dZ * math.cos(cS)
            dK = dY + dZ * math.sin(cS)
        end
        local d_ = {
            dW,
            dW,
            dH - dW,
            dW,
            dH - dW,
            dW,
            dH - dW,
            dI - dW,
            dW,
            dW,
            dW,
            dI - dW,
            dW,
            dI - dW,
            dH - dW,
            dI - dW
        }
        for j = 1, #d_, 4 do
            local e0, e1, e2, e3 = d_[j], d_[j + 1], d_[j + 2], d_[j + 3]
            local e4, e5 = a.line_intersection(e0, e1, e2, e3, dX, dY, dJ, dK)
            if
                j == 1 and dK < dW and e4 >= dW and e4 <= dH - dW or
                    j == 5 and dJ > dH - dW and e5 >= dW and e5 <= dI - dW or
                    j == 9 and dJ < dW and e5 >= dW and e5 <= dI - dW or
                    j == 13 and dK > dI - dW and e4 >= dW and e4 <= dH - dW
             then
                return e4, e5, false
            end
        end
        return dJ, dK, false
    end
    return dJ, dK, true
end
local e6 =
    a.table_map_assoc(
    bL,
    function(l, w)
        return w, l
    end
)
function a.parse_buttons_str(N)
    local e7, e8 = {}, {}
    for d in N:gmatch(".") do
        if d:lower() == d then
            table.insert(e8, e6[d:upper()] or false)
        else
            table.insert(e7, e6[d] or false)
        end
    end
    return e7, e8
end
function a.sanitize_string(N)
    N = tostring(N)
    N = N:gsub("[%c]", "")
    return N
end
local e9 = {get_timestamp = function()
        return common.get_unixtime()
    end, format_timestamp = function(ea)
        local eb, ec, ed, ee = function(ef)
                return ef % 4 == 0 and (ef % 100 ~= 0 or ef % 400 == 0) and 366 or 365
            end, 1970, math.ceil(ea / 86400)
        while ed >= eb(ec) do
            ed = ed - eb(ec)
            ec = ec + 1
        end
        local eg = function(eh, table)
            for j = 1, #table do
                if eh - table[j] <= 0 then
                    return j, eh
                end
                eh = eh - table[j]
            end
        end
        ee, ed = eg(ed, {31, eb(ec) == 366 and 29 or 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31})
        local ei, ej, ek = math.floor(ea / 3600 % 24), math.floor(ea / 60 % 60), math.floor(ea % 60)
        local el = ei > 12 and "pm" or "am"
        return string.format("%d/%d/%04d %02d:%02d", ed, ee, ec, ei, ej)
    end}
local em =
    setmetatable(
    {},
    {__index = function(bt, en)
            bt[en] = e9.format_timestamp(en)
            return bt[en]
        end}
)
local eo = e9.get_timestamp() - globals.realtime
function a.format_duration(ep, eq, er)
    local es, et, eu = {"day", "hour", "minute"}, "", 1
    er = er or 4
    for j, w in ipairs({86400, 3600, 60}) do
        if eu > er then
            break
        end
        if ep >= w then
            et = et .. math.floor(ep / w) .. " " .. es[j] .. (math.floor(ep / w) > 1 and "s" or "") .. ", "
            ep = ep % w
            eu = eu + 1
        end
    end
    if ep == 0 or eq or eu > er then
        return et:sub(1, -3)
    else
        ep = math.floor(ep)
        return et .. ep .. (ep > 1 and " seconds" or " second")
    end
end
function a.get_unix_timestamp()
    return globals.realtime + eo
end
function a.format_unix_timestamp(ea, ev, eq, er)
    local ep = ea - a.get_unix_timestamp()
    if ep < 0 or ev then
        local ew = a.format_duration(math.abs(ep), eq, er)
        return ep > 0 and "In " .. ew or ew .. " ago"
    else
        return em[ea]
    end
end
local ex = a.vtable_bind("vgui2.dll", "VGUI_System010", 7, "int(__thiscall*)(void*)")
local ey = a.vtable_bind("vgui2.dll", "VGUI_System010", 9, "void(__thiscall*)(void*, const char*, int)")
local ez = a.vtable_bind("vgui2.dll", "VGUI_System010", 11, "int(__thiscall*)(void*, int, const char*, int)")
local eA = ffi.typeof("char[?]")
function a.get_clipboard_text()
    local M = ex()
    if M > 0 then
        local eB = eA(M)
        ez(0, eB, M)
        return ffi.string(eB, M - 1)
    end
end
function a.set_clipboard_text(T)
    ey(T, T:len())
end
function a.calculate_move(eC, eD)
    return eC and 450 or (eD and -450 or 0)
end
function a.compress_usercmds(eE)
    local eF = {}
    local eG = {viewangles = {pitch = eE[1].pitch, yaw = eE[1].yaw}, buttons = {}}
    for aw, eH in pairs(bL) do
        eG.buttons[aw] = false
    end
    local eI = 0
    for j, dg in ipairs(eE) do
        local eJ = ""
        for eK, eL in pairs(eG.buttons) do
            if dg[eK] and not eL then
                eJ = eJ .. bL[eK]
            elseif not dg[eK] and eL then
                eJ = eJ .. bL[eK]:lower()
            end
            eG.buttons[eK] = dg[eK]
        end
        local eM = {dg.pitch - eG.viewangles.pitch, dg.yaw - eG.viewangles.yaw, eJ, dg.forwardmove, dg.sidemove}
        eG.viewangles = {pitch = dg.pitch, yaw = dg.yaw}
        if eM[#eM] == a.calculate_move(dg.in_moveright, dg.in_moveleft) then
            eM[#eM] = nil
            if eM[#eM] == a.calculate_move(dg.in_forward, dg.in_back) then
                eM[#eM] = nil
                if eM[#eM] == "" then
                    eM[#eM] = nil
                    if eM[#eM] == 0 then
                        eM[#eM] = nil
                        if eM[#eM] == 0 then
                            eM[#eM] = nil
                        end
                    end
                end
            end
        end
        if #eM > 0 then
            if eI > 0 then
                table.insert(eF, eI)
                eI = 0
            end
            table.insert(eF, eM)
        else
            eI = eI + 1
        end
    end
    if eI > 0 then
        table.insert(eF, eI)
        eI = 0
    end
    return eF
end
function a.get_map_pattern()
    local eN = entity.get(0)
    if eN == nil then
        return
    end
    local eO = eN["m_WorldMins"]
    local eP = eN["m_WorldMaxs"]
    local N
    if eO ~= cb or eP ~= cb then
        N = string.format("bomb_%.2f_%.2f_%.2f %.2f_%.2f_%.2f", eO.x, eO.y, eO.z, eP.x, eP.y, eP.z)
    end
    if N ~= nil then
        return a.crc32(N)
    end
    return nil
end
local eQ = {
    [-2011174878] = "de_train",
    [-1890957714] = "ar_shoots",
    [-1768287648] = "dz_blacksite",
    [-1752602089] = "de_inferno",
    [-1639993233] = "de_mirage",
    [-1621571143] = "de_dust",
    [-1541779215] = "de_sugarcane",
    [-1439577949] = "de_canals",
    [-1411074561] = "de_tulip",
    [-1348292803] = "cs_apollo",
    [-1218081885] = "de_guard",
    [-923663825] = "dz_frostbite",
    [-768791216] = "de_dust2",
    [-692592072] = "cs_italy",
    [-542128589] = "ar_monastery",
    [-222265935] = "ar_baggage",
    [-182586077] = "de_aztec",
    [371013699] = "de_stmarc",
    [405708653] = "de_overpass",
    [549370830] = "de_lake",
    [790893427] = "dz_sirocco",
    [792319475] = "de_ancient",
    [878725495] = "de_bank",
    [899765791] = "de_safehouse",
    [1014664118] = "cs_office",
    [1238495690] = "ar_dizzy",
    [1364328969] = "cs_militia",
    [1445192006] = "de_engage",
    [1463756432] = "cs_assault",
    [1476824995] = "de_vertigo",
    [1507960924] = "cs_agency",
    [1563115098] = "de_nuke",
    [1722587796] = "de_dust2_old",
    [1850283081] = "de_anubis",
    [1900771637] = "de_cache",
    [1964982021] = "de_elysion",
    [2041417734] = "de_cbble",
    [2056138930] = "gd_rialto"
}
local eR = {
    de_shortnuke = "de_nuke",
    de_shortdust = "de_shortnuke",
    ["workshop/533515529/bot_aimtrain_textured_v1"] = "bot_aimtrain_textured_v1 "
}
local eS = {}
function a.get_mapname()
    if common.get_map_data() == nil then
        bs.error_log("Only available on the map")
        return
    end
    local eT = common.get_map_data()["shortname"]
    if eT == nil then
        return
    end
    if eS[eT] == nil then
        local eU = eT:gsub("_scrimmagemap$", "")
        if eR[eU] ~= nil then
            eU = eR[eU]
        else
            local eV = false
            for aw, ax in pairs(eQ) do
                if ax == eU then
                    eV = true
                    break
                end
            end
            if not eV then
                local eW = a.get_map_pattern()
                if eQ[eW] ~= nil then
                    eU = eQ[eW]
                end
            end
        end
        eS[eT] = eU
    end
    return eS[eT]
end
cm:start("db_read")
local av = au.read("helper_db") or {}
av.sources = av.sources or {}
cm:finish("db_read")
local eX = {
    {
        name = "HvH locations",
        id = "hvh_locations",
        type = "remote",
        url = "https://raw.githubusercontent.com/DarkLuny/helper-locations/main/HvH%20Locations.json",
        description = "HvH",
        builtin = false
    }
}
local eY = {builtin_local_file = true, builtin_hvh = true}
for j = 1, #eX do
    eY[eX[j].id] = true
end
for j = #av.sources, 1, -1 do
    local eZ = av.sources[j]
    if eZ ~= nil and eY[eZ.id] then
        table.remove(av.sources, j)
    end
end
for j = 1, #eX do
    if av.sources[j] == nil or av.sources[j].id ~= eX[j].id then
        table.insert(av.sources, j, eX[j])
    end
end
if files.read(ah .. "/helper_data.json") ~= "" and files.read(ah .. "/helper_data.json") then
    table.insert(
        av.sources,
        {
            name = "helper_data.json",
            id = "builtin_local_file",
            type = "local_file",
            filename = "helper_data.json",
            description = "Local file",
            builtin = true
        }
    )
    local e_ = au.read("helper_store") or {}
    e_.locations = e_.locations or {}
    e_.locations["builtin_local_file"] = {}
end
local f0 = {}
local f1, f2
local f3, f4 = {}
local http_lib = require("neverlose/http_lib")
function a.flush_active_locations(f5)
    f4 = nil
    a.table_clear(f3)
end
local f6 = {__index = function(bt, aw)
        if bt.tickrate ~= nil then
            return aw / bt.tickrate
        end
    end}
local f7 = {
    __index = {
        get_type_string = function(self)
            if self.type == "grenade" then
                local f8 =
                    a.table_map(
                    self.weapons,
                    function(bW)
                        return bN[bW]
                    end
                )
                return table.concat(f8, "/")
            else
                return bI[self.type] or self.type
            end
        end,
        get_export_tbl = function(self)
            local bt = {
                name = self.name == self.full_name and self.name or {self.full_name:match("^(.*) to (.*)$")},
                description = self.description,
                weapon = #self.weapons == 1 and self.weapons[1].console_name or
                    a.table_map(
                        self.weapons,
                        function(bW)
                            return bW.console_name
                        end
                    ),
                position = {self.position.x, self.position.y, self.position.z},
                viewangles = {self.viewangles.pitch, self.viewangles.yaw}
            }
            if getmetatable(self.tickrates) == f6 then
                if self.tickrates.tickrate_set then
                    bt.tickrate = self.tickrates.tickrate
                end
            elseif self.tickrates.orig ~= nil then
                bt.tickrate = self.tickrates.orig
            end
            if self.approach_accurate ~= nil then
                bt.approach_accurate = self.approach_accurate
            end
            if self.duckamount ~= 0 then
                bt.duck = self.duckamount == 1 and true or self.duckamount
            end
            if self.position_visibility_different then
                bt.position_visibility = {
                    self.position_visibility.x - self.position.x,
                    self.position_visibility.y - self.position.y,
                    self.position_visibility.z - self.position.z
                }
            end
            if self.type == "grenade" then
                bt.grenade = {
                    fov = self.fov ~= c0.fov and self.fov or nil,
                    jump = self.jump and true or nil,
                    strength = self.throw_strength ~= 1 and self.throw_strength or nil,
                    run = self.run_duration ~= nil and self.run_duration or nil,
                    run_yaw = self.run_yaw ~= self.viewangles.yaw and self.run_yaw - self.viewangles.yaw or nil,
                    run_speed = self.run_speed ~= nil and self.run_speed or nil,
                    recovery_yaw = self.recovery_yaw ~= nil and self.recovery_yaw - self.run_yaw or nil,
                    recovery_jump = self.recovery_jump and true or nil,
                    delay = self.delay > 0 and self.delay or nil
                }
                if next(bt.grenade) == nil then
                    bt.grenade = nil
                end
            elseif self.type == "movement" then
                local eF = {}
                bt.movement = {frames = a.compress_usercmds(self.movement_commands)}
            end
            if self.destroy_text ~= nil then
                bt.destroy = {
                    ["start"] = self.destroy_start and {self.destroy_start:unpack()} or nil,
                    ["end"] = {self.destroy_end:unpack()},
                    ["text"] = self.destroy_text ~= c0.destroy_text and self.destroy_text or nil
                }
            end
            return bt
        end,
        get_export = function(self, f9)
            local bt = self:get_export_tbl()
            local fa = "  "
            local fb
            if f9 then
                local fc, fd = {
                        "name",
                        "description",
                        "weapon",
                        "position",
                        "viewangles",
                        "position_visibility",
                        "grenade"
                    },
                    {["grenade"] = 1}
                local fe = {}
                for j = 1, #fc do
                    local aw = fc[j]
                    local ax = bt[aw]
                    if ax ~= nil then
                        local N = fd[aw] == 1 and aA.stringify(ax, "\n", fa) or json.encode(ax)
                        if
                            type(ax[1]) == "number" and type(ax[2]) == "number" and
                                (ax[3] == nil or type(ax[3]) == "number")
                         then
                            N = N:gsub(",", ", ")
                        else
                            N = N:gsub('","', '", "')
                        end
                        table.insert(fe, string.format('"%s": %s', aw, N))
                        bt[aw] = nil
                    end
                end
                for aw, ax in pairs(bt) do
                    table.insert(fe, string.format('"%s": %s', aw, aA.stringify(bt[aw], "\n", fa)))
                end
                fb = "{\n" .. fa .. table.concat(fe, ",\n"):gsub("\n", "\n" .. fa) .. "\n}"
            else
                fb = json.encode(bt)
            end
            return fb
        end
    }
}
function a.create_location(ff)
    if type(ff) ~= "table" then
        return "wrong type, expected table"
    end
    if getmetatable(ff) == f7 then
        return "trying to create an already created location"
    end
    local fg = {}
    if type(ff.name) == "string" and ff.name:len() > 0 then
        fg.name = a.sanitize_string(ff.name)
        fg.full_name = fg.name
    elseif type(ff.name) == "table" and #ff.name == 2 then
        fg.name = a.sanitize_string(ff.name[2])
        fg.full_name = a.sanitize_string(string.format("%s to %s", ff.name[1], ff.name[2]))
    else
        return "invalid name, expected string or table of length 2"
    end
    if type(ff.description) == "string" and ff.description:len() > 0 then
        fg.description = ff.description
    elseif ff.description ~= nil then
        return "invalid description, expected nil or non-empty string"
    end
    if type(ff.weapon) == "string" and n[ff.weapon] ~= nil then
        fg.weapons = {n[ff.weapon]}
        fg.weapons_assoc = {[ff.weapon] = true}
    elseif type(ff.weapon) == "table" and #ff.weapon > 0 then
        fg.weapons = {}
        fg.weapons_assoc = {}
        for j = 1, #ff.weapon do
            local bW = n[ff.weapon[j]]
            if bW ~= nil then
                if fg.weapons_assoc[bW] then
                    return "duplicate weapon: " .. ff.weapon[j]
                else
                    fg.weapons[j] = bW
                    fg.weapons_assoc[bW] = true
                end
            else
                return "invalid weapon: " .. ff.weapon[j]
            end
        end
    else
        return string.format("invalid weapon (%s)", tostring(ff.weapon))
    end
    if type(ff.position) == "table" and #ff.position == 3 then
        local y, z, aH = unpack(ff.position)
        if type(y) == "number" and type(z) == "number" and type(aH) == "number" then
            fg.position = ay.new(y, z, aH)
            fg.position_visibility = fg.position + c0.visibility_offset
            fg.position_id = bZ[fg.position]
        else
            return "invalid type in position"
        end
    else
        return "invalid position"
    end
    if type(ff.position_visibility) == "table" and #ff.position_visibility == 3 then
        local y, z, aH = unpack(ff.position_visibility)
        if type(y) == "number" and type(z) == "number" and type(aH) == "number" then
            local fh = fg.position
            fg.position_visibility = ay.new(fh.x + y, fh.y + z, fh.z + aH)
            fg.position_visibility_different = true
        else
            return "invalid type in position_visibility"
        end
    elseif ff.position_visibility ~= nil then
        return "invalid position_visibility"
    end
    if type(ff.viewangles) == "table" and #ff.viewangles == 2 then
        local cH, cI = unpack(ff.viewangles)
        if type(cH) == "number" and type(cI) == "number" then
            fg.viewangles = {pitch = cH, yaw = cI}
            fg.viewangles_forward = ay.new():init_from_angles(cH, cI)
        else
            return "invalid type in viewangles"
        end
    else
        return "invalid viewangles"
    end
    if type(ff.approach_accurate) == "boolean" then
        fg.approach_accurate = ff.approach_accurate
    elseif ff.approach_accurate ~= nil then
        return "invalid approach_accurate"
    end
    if ff.duck == nil or type(ff.duck) == "boolean" then
        fg.duckamount = ff.duck and 1 or 0
    else
        return string.format("invalid duck value (%s)", tostring(ff.duck))
    end
    fg.eye_pos = fg.position + ay.new(0, 0, 64 - fg.duckamount * 18)
    if type(ff.tickrate) == "number" and ff.tickrate > 0 or ff.tickrate == nil then
        fg.tickrates = setmetatable({tickrate = ff.tickrate or 64, tickrate_set = ff.tickrate ~= nil}, f6)
    elseif type(ff.tickrate) == "table" and #ff.tickrate > 0 then
        fg.tickrates = {orig = ff.tickrate}
        local fi
        for j = 1, #ff.tickrate do
            local fj = ff.tickrate[j]
            if type(fj) == "number" and fj > 0 then
                if fi == nil then
                    fi = fj
                    fg.tickrates[fj] = 1
                else
                    fg.tickrates[fj] = fi / fj
                end
            else
                return "invalid tickrate: " .. tostring(ff.tickrate[j])
            end
        end
    else
        return string.format("invalid tickrate (%s)", tostring(ff.tickrate))
    end
    if type(ff.target) == "table" then
        local y, z, aH = unpack(ff.target)
        if type(y) == "number" and type(z) == "number" and type(aH) == "number" then
            fg.target = ay.new(y, z, aH)
        else
            return "invalid type in target"
        end
    elseif ff.target ~= nil then
        return "invalid target"
    end
    local fk, fl
    for j = 1, #fg.weapons do
        if fg.weapons[j].type == "grenade" then
            fk = true
        else
            fl = true
        end
    end
    if fk and fl then
        return "can't have grenade and non-grenade in one location"
    end
    if ff.movement ~= nil then
        fg.type = "movement"
        fg.fov = c0.fov_movement
    elseif fk then
        fg.type = "grenade"
        fg.throw_strength = 1
        fg.fov = c0.fov
        fg.delay = 0
        fg.jump = false
        fg.run_yaw = fg.viewangles.yaw
    elseif fl then
        fg.type = "wallbang"
    else
        return "invalid type"
    end
    if fg.viewangles_forward ~= nil and fg.eye_pos ~= nil then
        local fm = fg.eye_pos + fg.viewangles_forward * 700
        local dt, du, fn = a.trace_line_skip_entities(fg.eye_pos, fm, 2)
        fg.viewangles_target = dt > 0.05 and fn or fm
    end
    if fg.type == "grenade" and type(ff.grenade) == "table" then
        local fo = ff.grenade
        if type(fo.strength) == "number" and fo.strength >= 0 and fo.strength <= 1 then
            fg.throw_strength = fo.strength
        elseif fo.strength ~= nil then
            return string.format("invalid grenade.strength (%s)", tostring(fo.strength))
        end
        if type(fo.delay) == "number" and fo.delay > 0 then
            fg.delay = fo.delay
        elseif fo.delay ~= nil then
            return string.format("invalid grenade.delay (%s)", tostring(fo.delay))
        end
        if type(fo.fov) == "number" and fo.fov >= 0 and fo.fov <= 180 then
            fg.fov = fo.fov
        elseif fo.fov ~= nil then
            return string.format("invalid grenade.fov (%s)", tostring(fo.fov))
        end
        if type(fo.jump) == "boolean" then
            fg.jump = fo.jump
        elseif fo.jump ~= nil then
            return string.format("invalid grenade.jump (%s)", tostring(fo.jump))
        end
        if type(fo.run) == "number" and fo.run > 0 and fo.run < 512 then
            fg.run_duration = fo.run
        elseif fo.run ~= nil then
            return string.format("invalid grenade.run (%s)", tostring(fo.run))
        end
        if type(fo.run_yaw) == "number" and fo.run_yaw >= -180 and fo.run_yaw <= 180 then
            fg.run_yaw = fg.viewangles.yaw + fo.run_yaw
        elseif fo.run_yaw ~= nil then
            return string.format("invalid grenade.run_yaw (%s)", tostring(fo.run_yaw))
        end
        if type(fo.run_speed) == "boolean" then
            fg.run_speed = fo.run_speed
        elseif fo.run_speed ~= nil then
            return "invalid grenade.run_speed"
        end
        if type(fo.recovery_yaw) == "number" then
            fg.recovery_yaw = fg.run_yaw + fo.recovery_yaw
        elseif fo.recovery_yaw ~= nil then
            return "invalid grenade.recovery_yaw"
        end
        if type(fo.recovery_jump) == "boolean" then
            fg.recovery_jump = fo.recovery_jump
        elseif fo.recovery_jump ~= nil then
            return "invalid grenade.recovery_jump"
        end
    elseif ff.grenade ~= nil then
        return "invalid grenade"
    end
    if fg.type == "movement" and type(ff.movement) == "table" then
        local fp = ff.movement
        if type(fp.fov) == "number" and fp.fov > 0 and fp.fov < 360 then
            fg.fov = fp.fov
        end
        if type(fp.frames) == "table" then
            local eF = {}
            for j, eM in ipairs(fp.frames) do
                if type(eM) == "number" then
                    if fp.frames[j] > 0 then
                        for k = 1, eM do
                            table.insert(eF, {})
                        end
                    else
                        return "invalid frame " .. tostring(j)
                    end
                elseif type(eM) == "table" then
                    table.insert(eF, eM)
                end
            end
            local eG = {viewangles = {pitch = fg.viewangles.pitch, yaw = fg.viewangles.yaw}, buttons = {}}
            for aw, eH in pairs(bL) do
                eG.buttons[aw] = false
            end
            for j, ax in ipairs(eF) do
                local cH, cI, eJ, fq, fr = unpack(ax)
                if cH ~= nil and type(cH) ~= "number" then
                    return string.format("invalid pitch in frame #%d", j)
                elseif cI ~= nil and type(cI) ~= "number" then
                    return string.format("invalid yaw in frame #%d", j)
                end
                eG.viewangles.pitch = eG.viewangles.pitch + (cH or 0)
                eG.viewangles.yaw = eG.viewangles.yaw + (cI or 0)
                if type(eJ) == "string" then
                    local e7, e8 = a.parse_buttons_str(eJ)
                    local fs = {}
                    for O, eK in ipairs(e7) do
                        if eK == false then
                            return string.format("invalid button in frame #%d", j)
                        elseif fs[eK] then
                            return string.format("invalid frame #%d: duplicate button %s", j, eK)
                        end
                        fs[eK] = true
                        eG.buttons[eK] = true
                    end
                    for O, eK in ipairs(e8) do
                        if eK == false then
                            return string.format("invalid button in frame #%d", j)
                        elseif fs[eK] then
                            return string.format("invalid frame #%d: duplicate button %s", j, eK)
                        end
                        fs[eK] = true
                        eG.buttons[eK] = false
                    end
                elseif eJ ~= nil then
                    return string.format("invalid buttons in frame #%d", j)
                end
                if type(fq) == "number" and fq >= -450 and fq <= 450 then
                    eG.forwardmove = fq
                elseif fq ~= nil then
                    return string.format("invalid forwardmove in frame #%d: %s", j, tostring(fq))
                else
                    eG.forwardmove = a.calculate_move(eG.buttons.in_forward, eG.buttons.in_back)
                end
                if type(fr) == "number" and fr >= -450 and fr <= 450 then
                    eG.sidemove = fr
                elseif fr ~= nil then
                    return string.format("invalid sidemove in frame #%d: %s", j, tostring(fr))
                else
                    eG.sidemove = a.calculate_move(eG.buttons.in_moveright, eG.buttons.in_moveleft)
                end
                eF[j] = {
                    pitch = eG.viewangles.pitch,
                    yaw = eG.viewangles.yaw,
                    move_yaw = eG.viewangles.yaw,
                    forwardmove = eG.forwardmove,
                    sidemove = eG.sidemove
                }
                for eK, ax in pairs(eG.buttons) do
                    eF[j][eK] = ax
                end
            end
            fg.movement_commands = eF
        else
            return "invalid movement.frames"
        end
    elseif ff.movement ~= nil then
        return "invalid movement"
    end
    if type(ff.destroy) == "table" then
        local ft = ff.destroy
        fg.destroy_text = "Break the object"
        if type(ft.start) == "table" then
            local y, z, aH = unpack(ft.start)
            if type(y) == "number" and type(z) == "number" and type(aH) == "number" then
                fg.destroy_start = ay.new(y, z, aH)
            else
                return "invalid type in destroy.start"
            end
        elseif ft.start ~= nil then
            return "invalid destroy.start"
        end
        if type(ft["end"]) == "table" then
            local y, z, aH = unpack(ft["end"])
            if type(y) == "number" and type(z) == "number" and type(aH) == "number" then
                fg.destroy_end = ay.new(y, z, aH)
            else
                return "invalid type in destroy.end"
            end
        else
            return "invalid destroy.end"
        end
        if type(ft.text) == "string" and ft.text:len() > 0 then
            fg.destroy_text = ft.text
        elseif ft.text ~= nil then
            return "invalid destroy.text"
        end
    elseif ff.destroy ~= nil then
        return "invalid destroy"
    end
    return setmetatable(fg, f7)
end
function a.parse_and_create_locations(fu, eU)
    local fv
    if type(fu) == "string" then
        local fw
        fw, fv = pcall(json.parse, fu)
        if not fw then
            error(fv)
            return
        end
    elseif type(fu) == "table" then
        fv = fu
    else
        assert(false)
    end
    if type(fv) ~= "table" then
        error(string.format("invalid type %s, expected table", type(fv)))
        return
    end
    local fx = {}
    for j = 1, #fv do
        local fg = a.create_location(fv[j])
        if type(fg) == "table" then
            table.insert(fx, fg)
        else
            error(fg or "failed to parse")
            return
        end
    end
    return fx
end
function a.export_locations(bt, f9)
    local fa = "  "
    local fe = {}
    for j = 1, #bt do
        local N = bt[j]:get_export(f9)
        if f9 then
            N = fa .. N:gsub("\n", "\n" .. fa)
        end
        table.insert(fe, N)
    end
    return (f9 and "[\n" or "[") .. table.concat(fe, f9 and ",\n" or ",") .. (f9 and "\n]" or "]")
end
function a.sort_by_distsqr(b, c)
    return b.distsqr > c.distsqr
end
function a.source_get_index_data(fy, bu)
    http.get(fy:gsub("^https://raw.githubusercontent.com/", "https://combinatronics.com/"), function(success, fz)
            local fA = {}
            if not success or fz.status ~= 200 or fz.body == "404: Not Found" then
                if fz.body == "404: Not Found" then
                    bu("404 - Not Found")
                    print_raw("404 - Not Found")
                else
                    bu(string.format("%s - %s", fz.status, fz.status_message))
                    print_raw(string.format("%s - %s", fz.status, fz.status_message))
                end
                return
            end
            local fB, fC = pcall(json.parse, fz.body)
            if not fB then
                bu("Invalid JSON: " .. fC)
                print_raw("Invalid JSON: " .. fC)
                return
            end
            if type(fC.name) == "string" then
                fA.name = fC.name
            else
                bu("Invalid name")
                print_raw("Invalid name")
                return
            end
            if fC.description == nil or type(fC.description) == "string" then
                fA.description = fC.description
            else
                bu("Invalid description")
                print_raw("Invalid description")
                return
            end
            if fC.update_timestamp == nil or type(fC.update_timestamp) == "number" then
                fA.update_timestamp = fC.update_timestamp
            else
                bu("Invalid update_timestamp")
                print_raw("Invalid update_timestamp")
                return
            end
            if fC.url_format ~= nil then
                if type(fC.url_format) ~= "string" or not fC.url_format:match("^https?://.+$") then
                    bu("Invalid url_format")
                    print_raw("Invalid url_format")
                    return
                end
                if not fC.url_format:find("%%map%%") then
                    bu("Invalid url_format - %map% is required")
                    print_raw("Invalid url_format - %map% is required")
                    return
                end
                fA.url_format = fC.url_format
            else
                fA.url_format = nil
            end
            fA.location_aliases = {}
            fA.locations = {}
            if type(fC.locations) == "table" then
                for fD, fE in pairs(fC.locations) do
                    if type(fD) ~= "string" then
                        bu("Invalid key in locations")
                        print_raw("Invalid key in locations")
                        return
                    end
                    if type(fE) == "string" then
                        fA.location_aliases[fD] = fE
                    elseif type(fE) == "table" then
                        fA.locations[fD] = fE
                    elseif fC.url_format ~= nil then
                        bu("Location data is forbidden for split locations")
                        return
                    end
                end
            elseif fC.locations ~= nil then
                bu("Invalid locations")
                print_raw("Invalid locations")
                return
            end
            if next(fA.location_aliases) == nil then
                fA.location_aliases = nil
            end
            if next(fA.locations) == nil then
                fA.locations = nil
            end
            fA.last_updated = a.get_unix_timestamp()
            bu(nil, fA)
        end
    )
end
local fF = math.floor(math.sin(globals.realtime * 2) * 127 + 128)
local fG = math.floor(math.sin(globals.realtime * 2 + 2) * 127 + 128)
local fH = math.floor(math.sin(globals.realtime * 2 + 4) * 127 + 128)
function render.gradient_text(fI, fJ, bf, a1, fK, fL, bg, a2, fM)
    local fN = ""
    local fO = #fM - 1
    local fP = (fK - fI) / fO
    local fQ = (fL - fJ) / fO
    local fR = (bg - bf) / fO
    local fS = (a2 - a1) / fO
    for i = 1, fO + 1 do
        fN = fN .. ("\a%02x%02x%02x%02x%s"):format(fI, fJ, bf, a1, fM:sub(i, i))
        fI = fI + fP
        fJ = fJ + fQ
        bf = bf + fR
        a1 = a1 + fS
    end
    return fN
end
ui.sidebar(render.gradient_text(249, 44, 75, 255, 75, 44, 249, 255, "Helper V3"), "bomb")
local fT = ui.create("Main", render.gradient_text(249, 44, 75, 255, 75, 44, 249, 255, "Helper"))
local fU = ui.create("Manager", "A")
local fV = ui.create("Manager", "B")
local fW = {
    __index = {
        update_remote_data = function(self)
            if not self.type == "remote" or self.url == nil then
                return
            end
            self.remote_status = "Loading index data..."
            a.source_get_index_data(
                self.url,
                function(fX, fA)
                    if fX ~= nil then
                        self.remote_status = string.format("Error: %s", fX)
                        f1()
                        return
                    end
                    self.last_updated = fA.last_updated
                    if self.last_updated == nil then
                        self.remote_status = "Index data refreshed"
                        f1()
                        self.remote_status = nil
                    else
                        self.remote_status = nil
                        f1()
                    end
                    local fY = {"name", "description", "update_timestamp", "url_format"}
                    for j = 1, #fY do
                        self[fY[j]] = fA[fY[j]]
                    end
                    if fA.url ~= nil and fA.url ~= self.url then
                        self.url = fA.url
                        self:update_remote_data()
                        return
                    end
                    local fZ = a.get_mapname()
                    f0[self] = nil
                    local f_, g0 = pcall(au.read("helper_store"))
                    local g1 = (au.read("helper_store") or {})["locations"]
                    if g1 ~= nil and type(g1[self.id]) == "table" then
                        g1[self.id] = {}
                    end
                    a.flush_active_locations("update_remote_data")
                    if fA.locations ~= nil then
                        f0[self] = {}
                        for fD, g2 in pairs(fA.locations) do
                            local fw, fx = pcall(a.parse_and_create_locations, g2, fD)
                            if not fw then
                                self.remote_status = string.format("Invalid map data: %s", fx)
                                bs.error_log(
                                    string.format("Failed to load map data for %s (%s): %s", self.name, fD, fx)
                                )
                                f1()
                                return
                            end
                            f0[self][fD] = fx
                            self:store_write(fD)
                            if fD == fZ then
                                a.flush_active_locations("B")
                            else
                                f0[self][fD] = nil
                            end
                        end
                    end
                end
            )
        end,
        store_read = function(self, eU)
            if eU == nil then
                local g1 = (au.read("helper_store") or {})["locations"]
                if g1 ~= nil and type(g1[self.id]) == "table" then
                    for eU, O in pairs(g1[self.id]) do
                        self:store_read(eU)
                    end
                end
                return
            end
            local g1 = (au.read("helper_store") or {})["locations"]
            if g1 ~= nil and type(g1[self.id]) == "table" and type(g1[self.id][eU]) == "string" then
                local fw, fx = pcall(a.parse_and_create_locations, g1[self.id][eU], eU)
                if not fw then
                    self.remote_status = string.format("Invalid map data for %s in database: %s", eU, fx)
                    bs.error_log(string.format("Invalid map data for %s (%s) in database: %s", self.name, eU, fx))
                    f1()
                else
                    f0[self][eU] = fx
                end
            end
        end,
        store_write = function(self, eU)
            if eU == nil then
                if f0[self] ~= nil then
                    for eU, O in pairs(f0[self]) do
                        self:store_write(eU)
                    end
                end
                return
            end
            local e_ = au.read("helper_store") or {}
            e_.locations = e_.locations or {}
            e_.locations[self.id] = e_.locations[self.id] or {}
            e_.locations[self.id][eU] = a.export_locations(f0[self][eU])
            au.write("helper_store", e_)
        end,
        get_locations = function(self, eU, g3)
            if f0[self] == nil then
                f0[self] = {}
            end
            if f0[self][eU] == nil then
                self:store_read(eU)
                local fx = f0[self][eU]
                if
                    self.type == "remote" and g3 and
                        (self.last_updated == nil or
                            a.get_unix_timestamp() - self.last_updated > (self.ttl or c0.source_ttl))
                 then
                    self:update_remote_data()
                end
                if self.type == "local_file" and eU ~= nil then
                    utils.execute_after(
                        0.5,
                        function()
                            cm:start("readfile")
                            local g4 = files.read(ah .. self.filename)
                            local g5 = "{}"
                            local g6, g7 = pcall(aA.parse, g4)
                            local g8, g9 = pcall(json.parse, g4)
                            if g6 then
                                g5 = g7
                            elseif g8 then
                                g5 = g9
                            end
                            g4 = json.encode(g5)
                            local ga = json.parse(g4)
                            if type(ga) ~= "table" then
                                return
                            end
                            local fZ = a.get_mapname()
                            for eU, f3 in pairs(ga) do
                                local fw, fx = pcall(a.parse_and_create_locations, f3, eU)
                                if not fw then
                                    self.remote_status = string.format("Invalid map data: %s", fx)
                                    bs.error_log(
                                        string.format("Failed to load map data for %s (%s): %s", self.name, eU, fx)
                                    )
                                    f1()
                                    return
                                end
                                f0[self][eU] = fx
                                a.flush_active_locations()
                                self:store_write(eU)
                                if eU ~= fZ then
                                    f0[self][eU] = nil
                                end
                            end
                            cm:finish("readfile")
                        end
                    )
                elseif fx == nil and g3 and self.type == "remote" and self.url_format ~= nil then
                    local fy =
                        self.url_format:gsub("%%map%%", eU):gsub(
                        "^https://raw.githubusercontent.com/",
                        "https://combinatronics.com/"
                    )
                    self.remote_status = string.format("Loading map data for %s...", eU)
                    f1()
                    http.get(fy, function(success, fz)
                            if not success or fz.status ~= 200 or fz.body == "404: Not Found" then
                                if fz.status == 404 or fz.body == "404: Not Found" then
                                    self.remote_status = string.format("No locations found for %s.", eU)
                                else
                                    self.remote_status =
                                        string.format("Failed to fetch %s: %s %s", eU, fz.status, fz.status_message)
                                end
                                f1()
                                return
                            end
                            local fw, fx = pcall(parse_and_create_locations, fz.body, eU)
                            if not fw then
                                self.remote_status = string.format("Invalid map data: %s", fx)
                                f1()
                                bs.error_log(
                                    string.format("Failed to load map data for %s (%s): %s", self.name, eU, fx)
                                )
                                return
                            end
                            f0[self][eU] = fx
                            self:store_write(eU)
                            self.remote_status = nil
                            f1()
                            flush_active_locations("C")
                        end
                    )
                end
                f0[self][eU] = fx or {}
            end
            return f0[self][eU]
        end,
        get_all_locations = function(self)
            local fx = {}
            local g1 = (au.read("helper_store") or {})["locations"]
            if g1 ~= nil and type(g1[self.id]) == "table" then
                for eU, O in pairs(g1[self.id]) do
                    fx[eU] = self:get_locations(eU)
                end
            end
            return fx
        end,
        cleanup = function(self)
            self.remote_status = nil
            setmetatable(self, nil)
        end
    }
}
for j = 1, #av.sources do
    setmetatable(av.sources[j], fW)
end
function a.get_sources_config()
    local gb = au.read("sources_config") or json.parse("{}")
    local gc = {}
    gb.enabled = gb.enabled or {}
    for j = 1, #av.sources do
        local eZ = av.sources[j]
        gc[eZ.id] = true
        if gb.enabled[eZ.id] == nil then
            gb.enabled[eZ.id] = true
        end
    end
    for b_, gd in pairs(gb.enabled) do
        if gc[b_] == nil then
            gb.enabled[b_] = nil
        end
    end
    return gb
end
function a.set_sources_config(gb)
    au.write("sources_config", gb)
end
function a.button_with_confirmation(ge, cn, bu, gf)
    local gg, gh, gi
    local gj
    gg =
        ge:button(
        cn,
        function()
            gg:set_visible(false)
            gh:set_visible(true)
            gi:set_visible(true)
            local gk = globals.realtime
            gj = gk
            utils.execute_after(
                5,
                function()
                    if gj == gk then
                        gg:set_visible(true)
                        gh:set_visible(false)
                        gi:set_visible(false)
                        if gf ~= nil then
                            gf()
                        end
                    end
                end
            )
        end
    )
    gh =
        ge:button(
        cn .. " (CANCEL)",
        function()
            gg:set_visible(true)
            gh:set_visible(false)
            gi:set_visible(false)
            if gf ~= nil then
                gf()
            end
            gj = nil
        end
    )
    gi =
        ge:button(
        cn .. " (CONFIRM)",
        function()
            gg:set_visible(true)
            gh:set_visible(false)
            gi:set_visible(false)
            gj = nil
            bu()
            if gf ~= nil then
                gf()
            end
        end
    )
    gh:set_visible(false)
    gi:set_visible(false)
    return gg, gh, gi
end
local gl = ui.find("Miscellaneous", "Main", "Movement", "Air Strafe")
local gm = ui.find("Miscellaneous", "Main", "Movement", "Infinite Duck")
local gn = ui.find("Aimbot", "Anti Aim", "Misc", "Slow Walk")
local go = ui.find("Miscellaneous", "Main", "Movement", "Quick Stop")
local gp = ui.find("Miscellaneous", "Main", "Movement", "Air Duck")
local gq = ui.find("Miscellaneous", "Main", "Movement", "Strafe Assist")
local gr = ui.find("Aimbot", "Anti Aim", "Angles", "Body Yaw")
local gs = ui.find("Aimbot", "Anti Aim", "Angles", "Pitch")
local gt = fT:switch("\aEAD1FFFFHelper", false)
local gu = gt:create():hotkey("Helper hotkey")
local gv = gt:create():color_picker("Helper Color", color(120, 120, 255, 255))
local fJ = gt:create():selectable("\nHelper types", {"Smoke", "Flashbang", "High Explosive", "Molotov", "Movement"}, 0)
local fL = fT:combo("Aim at locations", {"Off", "Legit", "Legit (Silent)", "Rage"}, 0)
local gw = fT:slider("Helper Aimbot FOV", 0, 200, 80, nil, "°")
local gx = fT:slider("Helper Aimbot Speed", 0, 100, 75, nil, "t")
local gy = fT:switch("Automatic disable dt", false)
local gz = fT:switch("Show locations behind walls", false)
local gA = {
    title = fU:switch("\aEAD1FFFFHelper: Manage sources", false),
    list = fU:list("Helper sources", {""}, 0),
    source_label1 = fU:label("Source label 1"),
    enabled = fU:switch("Enabled", false),
    source_label2 = fU:label("Source label 2"),
    source_label3 = fU:label("Source label 3"),
    name = fU:input("New source name")
}
local gB, gC, gD, gE, gF
local gG = {
    list = fU:list("Selected source", {""}, 0),
    show_all = fU:switch("Show all maps", false),
    sort_by = fU:combo("Sort by", {"Creation date", "Type", "Alphabetically"}, 0),
    type_label = fV:label("Creating new location"),
    type = fV:combo("Location Type", {"Grenade"}, 0),
    from = fV:input("From"),
    to = fV:input("To"),
    description_label = fV:label("Description (Optional)"),
    description = fV:input("Description"),
    grenade_properties = fV:selectable(
        "Grenade Properties",
        {
            "Jump",
            "Run",
            "Walk (Shift)",
            "Throw strength",
            "Force-enable recovery",
            "Tickrate dependent",
            "Destroy breakable object",
            "Delayed throw"
        },
        0
    ),
    throw_strength = fV:combo("Throw strength", {"Left Click", "Left / Right Click", "Right Click"}, 0),
    run_direction = fV:combo("Run direction", {"Forward", "Left", "Right", "Back", "Custom"}, 0),
    run_direction_custom = fV:slider("Custom run direction", -180, 180, 0),
    run_duration = fV:slider("Run duration", 1, 256, 20),
    delay = fV:slider("Throw delay", 1, 40, 1),
    recovery_direction = fV:combo("Recovery direction", {"Back", "Forward", "Left", "Right", "Custom"}, 0),
    recovery_direction_custom = fV:slider("Recovery direction", -180, 180, 0),
    recovery_jump = fV:switch("Recovery bunny-hop", false),
    set = fV:button(
        "Set location",
        function()
            gE()
        end
    ),
    set_hotkey = fV:switch("Helper set location hotkey", false),
    teleport = fV:button(
        "Teleport",
        function()
            gD()
        end
    ),
    teleport_hotkey = fV:switch("Helper teleport hotkey", false),
    export = fV:button(
        "Export to clipboard",
        function()
            gF()
        end
    ),
    save = fV:button(
        "Save",
        function()
            gB()
        end
    )
}
gG.delete, gG.delete_cancel, gG.delete_confirm =
    a.button_with_confirmation(
    fV,
    "Delete",
    function()
        gC()
    end,
    f1
)
gG.delete_hotkey = fV:switch("Helper delete hotkey", false)
local gH, gI, gJ = {}, false, false
local gK
local gL, gM, gN, gO, gP, gQ, gR
gA.edit =
    fU:button(
    "Edit",
    function()
        gL()
    end
)
gA.update =
    fU:button(
    "Update",
    function()
        gN()
    end
)
gA.delete, gA.delete_cancel, gA.delete_confirm =
    a.button_with_confirmation(
    fU,
    "Delete",
    function()
        gO()
    end,
    f1
)
gA.create =
    fU:button(
    "Create",
    function()
        gP()
    end
)
gA.import =
    fU:button(
    "Import from clipboard",
    function()
        gQ()
    end
)
gA.export =
    fU:button(
    "Export all to clipboard",
    function()
        gR()
    end
)
gA.back =
    fU:button(
    "Back",
    function()
        gM()
    end
)
gA.source_label4 = fU:label("Ready.")
local gS, gT = {}, false
local gU, gV, gW = false
local gX, gY = setmetatable({}, {__mode = "k"}), setmetatable({}, {__mode = "k"})
local gZ = {[gG.set_hotkey] = false, [gG.teleport_hotkey] = false, [gG.delete_hotkey] = false}
function a.set_source_selected(g_)
    g_ = g_ or "add_local"
    if g_ == gV then
        return false
    end
    for j = 1, #gS do
        if gS[j] == g_ then
            gA.list:set(j)
            gU = false
            return true
        end
    end
    return false
end
function a.add_source(h0, h1)
    local eZ
    if type(h0) == "string" then
        eZ = {name = h0, type = h1, id = a.randomid(8)}
    elseif type(h0) == "table" then
        eZ = h0
        eZ.type = h1
    else
        assert(false)
    end
    setmetatable(eZ, fW)
    local h2 =
        a.table_map_assoc(
        av.sources,
        function(aw, eZ)
            return eZ.id, true
        end
    )
    while h2[eZ.id] do
        eZ.id = a.randomid(8)
    end
    table.insert(av.sources, eZ)
    a.set_sources_config(a.get_sources_config())
    return eZ
end
function a.get_sorted_locations(fx, h3)
    if h3 == "Creation date" then
        return fx
    elseif h3 == "Type" or h3 == "Alphabetically" then
        local h4 = {}
        for j = 1, #fx do
            table.insert(h4, fx[j])
        end
        table.sort(
            h4,
            function(b, c)
                if h3 == "Type" then
                    return b:get_type_string() < c:get_type_string()
                elseif h3 == "Alphabetically" then
                    return b.name < c.name
                else
                    return true
                end
            end
        )
        return h4
    else
        return fx
    end
end
function f1()
    local h5 = {}
    for cn, h6 in pairs(gA) do
        if cn ~= "title" then
            h5[h6] = false
        end
    end
    gJ = true
    for cn, h6 in pairs(gG) do
        h5[h6] = false
    end
    if gt:get() and gA.title:get() then
        if gU and gV ~= nil then
            local eU = a.get_mapname()
            local h7 = gG.show_all:get()
            if eU == nil then
                h7 = true
            end
            h5[gA.source_label1] = true
            h5[gA.source_label2] = true
            gA.source_label1:set(string.format("Editing %s source: %s", (bH[gV.type] or gV.type):lower(), gV.name))
            gA.source_label2:set(h7 and "Locations on all maps: " or string.format("Locations on %s:", eU))
            h5[gA.import] = true
            h5[gA.export] = true
            h5[gA.back] = true
            h5[gG.list] = true
            h5[gG.show_all] = true
            h5[gG.sort_by] = true
            local h8, h9, ha = {}, {}
            a.table_clear(gH)
            local h3 = gG.sort_by:get()
            if h7 then
                local hb = gV:get_all_locations()
                local k = 1
                for fD, fx in pairs(hb) do
                    fx = a.get_sorted_locations(fx, h3)
                    for j = 1, #fx do
                        local fg = fx[j]
                        gH[k] = fg
                        local hc = fg:get_type_string()
                        h8[k] = string.format("[%s] %s: %s", fD, hc, fg.name)
                        h9[k] = fD
                        k = k + 1
                    end
                end
            else
                local fx = gV:get_locations(eU)
                fx = a.get_sorted_locations(fx, h3)
                for j = 1, #fx do
                    local fg = fx[j]
                    gH[j] = fg
                    local hc = fg:get_type_string()
                    h8[j] = string.format("%s: %s", hc, fg.full_name)
                    h9[j] = eU
                end
            end
            table.insert(h8, "+  Create new")
            table.insert(gH, "create_new")
            gG.list:update(h8)
            if gK == nil then
                gK = "create_new"
                f2(true)
            end
            if gK == "create_new" then
                gJ = false
            end
            for j = 1, #gH do
                if gH[j] == gK then
                    if h9[j] == eU and eU ~= nil then
                        gJ = false
                    end
                end
            end
            h5[gG.type] = true
            h5[gG.from] = true
            h5[gG.to] = true
            h5[gG.description] = true
            h5[gG.grenade_properties] = true
            h5[gG.set] = true
            h5[gG.set_hotkey] = true
            h5[gG.teleport] = true
            h5[gG.teleport_hotkey] = true
            h5[gG.export] = true
            h5[gG.save] = true
            local hd = gG.grenade_properties
            if hd:get("Run") then
                h5[gG.run_direction] = true
                h5[gG.run_duration] = true
                if gG.run_direction:get() == "Custom" then
                    h5[gG.run_direction_custom] = true
                end
            end
            if hd:get("Jump") or hd:get("Force-enable recovery") then
                h5[gG.recovery_direction] = true
                h5[gG.recovery_jump] = true
                if gG.recovery_direction:get() == "Custom" then
                    h5[gG.recovery_direction_custom] = true
                end
            end
            if hd:get("Delayed throw") then
                h5[gG.delay] = true
            end
            if hd:get("Throw strength") then
                h5[gG.throw_strength] = true
            end
            if gK ~= nil and gK ~= "create_new" then
                h5[gG.delete] = true
                h5[gG.delete_hotkey] = true
            end
        else
            local gb = a.get_sources_config()
            local he, hf = {}
            a.table_clear(gS)
            for j = 1, #av.sources do
                local eZ = av.sources[j]
                gS[j] = eZ
                table.insert(
                    he,
                    string.format("%s  %s: %s", gb.enabled[eZ.id] and "+" or "-", bH[eZ.type] or eZ.type, eZ.name)
                )
                if eZ == gV then
                    hf = j
                end
            end
            table.insert(he, "+  Add remote source")
            table.insert(gS, "add_remote")
            if gV == "add_remote" then
                hf = #gS
            end
            table.insert(he, "+  Create local")
            table.insert(gS, "add_local")
            if gV == "add_local" then
                hf = #gS
            end
            if hf == nil then
                gV = gS[1]
                hf = 1
            end
            gA.list:update(he)
            h5[gA.list] = true
            if gV ~= nil then
                h5[gA.source_label1] = true
                if gV == "add_remote" then
                    gA.source_label1:set("Add new remote source")
                    h5[gA.import] = true
                    if gW ~= nil then
                        gA.source_label4:set(gW)
                        h5[gA.source_label4] = true
                    end
                elseif gV == "add_local" then
                    gA.source_label1:set("New source name:")
                    h5[gA.name] = true
                    h5[gA.create] = true
                elseif gV ~= nil then
                    h5[gA.enabled] = true
                    h5[gA.edit] = gV.type == "local" and not gV.builtin
                    h5[gA.update] = gV.type == "remote"
                    h5[gA.delete] = not gV.builtin
                    gT = true
                    gA.source_label1:set(string.format("%s source: %s", bH[gV.type] or gV.type, gV.name))
                    if gV.description ~= nil then
                        h5[gA.source_label2] = true
                        gA.source_label2:set(string.format("%s", gV.description))
                    end
                    if gV.remote_status ~= nil then
                        h5[gA.source_label3] = true
                        gA.source_label3:set(gV.remote_status)
                    elseif gV.update_timestamp ~= nil then
                        h5[gA.source_label3] = true
                        gA.source_label3:set(
                            string.format(
                                "Last updated: %s",
                                a.format_unix_timestamp(gV.update_timestamp, false, false, 1)
                            )
                        )
                    end
                    gA.enabled:set(gb.enabled[gV.id] == true)
                    gT = false
                end
            end
        end
    end
    for h6, hg in pairs(h5) do
        h6:set_visible(hg)
    end
end
gA.title:set_callback(
    function()
        if not gA.title:get() then
            gU = false
        end
        f1()
    end
)
a.update_list = function()
    local hh = gV
    local j = gA.list:get()
    if j ~= nil then
        gV = gS[j]
        if gV ~= hh then
            gU = false
            gW = nil
            f1()
        end
    end
end
gA.list:set_callback(
    function()
        a.update_list()
    end
)
gA.enabled:set_callback(
    function()
        if type(gV) == "table" and not gT then
            local gb = a.get_sources_config()
            gb.enabled[gV.id] = gA.enabled:get()
            a.set_sources_config(gb)
            f1()
            a.flush_active_locations("D")
        end
    end
)
fJ:set_callback(a.flush_active_locations)
gG.show_all:set_callback(f1)
gG.sort_by:set_callback(f1)
local hi = {function(fy)
        local hj = fy:match("^https://pastebin.com/(%w+)/?$")
        if hj ~= nil then
            return string.format("https://pastebin.com/raw/%s", hj)
        end
    end, function(fy)
        local hk, hl, hm, hn = fy:match("^https://github.com/(%w+)/(%w+)/blob/(%w+)/(.+)$")
        if hk ~= nil then
            return string.format("https://github.com/%s/%s/raw/%s/%s", hk, hl, hm, hn)
        end
    end}
function gO()
    if type(gV) == "table" and not gV.builtin then
        for j = 1, #av.sources do
            if av.sources[j] == gV then
                table.remove(av.sources, j)
                break
            end
        end
        a.set_sources_config(a.get_sources_config())
        a.flush_active_locations("source deleted")
        a.set_source_selected()
        a.update_list()
    end
end
function gN()
    if type(gV) == "table" and gV.type == "remote" then
        gV:update_remote_data()
        f1()
    end
end
function gP()
    if gV == "add_local" then
        local cn = gA.name:get()
        if cn:gsub(" ", "") == "" then
            return
        end
        local ho =
            a.table_map_assoc(
            av.sources,
            function(j, eZ)
                return eZ.name, eZ.type == "local"
            end
        )
        local hp, j = cn, 2
        while ho[hp] do
            hp = string.format("%s (%d)", cn, j)
            j = j + 1
        end
        cn = hp
        local eZ = a.add_source(cn, "local")
        f1()
        a.set_source_selected(eZ)
        a.update_list()
    end
end
function a.source_import_arr(bt, eU)
    local fx = {}
    for j = 1, #bt do
        local fg = a.create_location(bt[j])
        if type(fg) ~= "table" then
            local fX = string.format("invalid location #%d: %s", j, fg)
            bs.error_log("Failed to import " .. tostring(eU) .. ", " .. fX)
            gW = fX
            f1()
            return
        end
        fx[j] = fg
    end
    if #fx == 0 then
        bs.error_log("Failed to import: No locations to import")
        gW = "No locations to import"
        f1()
        return
    end
    local hq = gV:get_locations(eU)
    if hq == nil then
        hq = {}
        f0[gV][eU] = hq
    end
    for j = 1, #fx do
        table.insert(hq, fx[j])
    end
    f1()
    gV:store_write()
    a.flush_active_locations()
end
function gQ()
    if gU and type(gV) == "table" and gV.type == "local" and a.get_clipboard_text then
        local T = a.get_clipboard_text()
        if T == nil then
            local fX = "No text copied to clipboard"
            bs.error_log("Failed to import: " .. fX)
            gW = fX
            f1()
            return
        end
        local fw, bt = pcall(json.parse, T)
        if fw and T:sub(1, 1) ~= "[" and T:sub(1, 1) ~= "{" then
            fw, bt = false, "Expected object or array"
        end
        if not fw then
            local fX = string.format("Invalid JSON: %s", bt)
            bs.error_log("Failed to import: " .. fX)
            gW = fX
            f1()
            return
        end
        local hr = T:sub(1, 1) == "["
        if not hr then
            if bt["name"] ~= nil or bt["grenade"] ~= nil or bt["location"] ~= nil then
                bt = {bt}
                hr = true
            end
        end
        if hr then
            local eU = a.get_mapname()
            if eU == nil then
                bs.error_log("Failed to import: You need to be in-game")
                gW = "You need to be in-game"
                f1()
                return
            end
            a.source_import_arr(bt, eU)
        else
            for eU, fx in pairs(bt) do
                if type(eU) ~= "string" or eU:find(" ") then
                    bs.error_log("Failed to import: Invalid map name")
                    gW = "Invalid map name"
                    f1()
                    return
                end
            end
            for eU, fx in pairs(bt) do
                a.source_import_arr(fx, eU)
            end
        end
    elseif gV == "add_remote" and a.get_clipboard_text then
        local T = a.get_clipboard_text()
        if T == nil then
            bs.error_log("Failed to import: Clipboard is empty")
            gW = "Clipboard is empty"
            f1()
            return
        end
        local fy = a.sanitize_string(T):gsub(" ", "")
        if not fy:match("^https?://.+$") then
            bs.error_log("Failed to import: Invalid URL")
            gW = "Invalid URL"
            f1()
            return
        end
        for j = 1, #hi do
            fy = hi[j](fy) or fy
        end
        for j = 1, #av.sources do
            local eZ = av.sources[j]
            if eZ.type == "remote" and eZ.url == fy then
                bs.error_log("Failed to import: A source with that URL already exists")
                gW = "A source with that URL already exists"
                f1()
                return
            end
        end
        f1()
        a.source_get_index_data(
            fy,
            function(fX, fA)
                if gV ~= "add_remote" then
                    return
                end
                if fX ~= nil then
                    bs.error_log(string.format("Failed to import: %s", fX))
                    gW = fX
                    f1()
                    return
                end
                local eZ = a.add_source(fA.name, "remote")
                eZ.url = fA.url or fy
                eZ.url_format = fA.url_format
                eZ.description = fA.description
                eZ.update_timestamp = fA.update_timestamp
                eZ.last_updated = fA.last_updated
                f1()
                gV = nil
                a.set_source_selected("add_remote")
                f1()
            end
        )
    end
end
function gR()
    if gU and type(gV) == "table" and gV.type == "local" then
        local fa = "  "
        local eU = a.get_mapname()
        local h7 = gG.show_all:get()
        if eU == nil then
            h7 = true
        end
        local hs
        if h7 then
            local hb = gV:get_all_locations()
            local ht = {}
            for fD, O in pairs(hb) do
                table.insert(ht, fD)
            end
            table.sort(ht)
            local bt = {}
            for j = 1, #ht do
                local fD = ht[j]
                local fx = hb[fD]
                local hu = {}
                for j = 1, #fx do
                    local N = fx[j]:get_export(true)
                    table.insert(hu, fa .. N:gsub("\n", "\n" .. fa .. fa))
                end
                table.insert(bt, json.encode(fD) .. ": [\n" .. fa .. table.concat(hu, ",\n" .. fa) .. "\n" .. fa .. "]")
            end
            hs = "{\n" .. fa .. table.concat(bt, ",\n" .. fa) .. "\n}"
        else
            local fx = gV:get_locations(eU)
            local bt = {}
            for j = 1, #fx do
                bt[j] = fx[j]:get_export(true):gsub("\n", "\n" .. fa)
            end
            hs = "[\n" .. fa .. table.concat(bt, ",\n" .. fa) .. "\n]"
        end
        if hs ~= nil then
            if a.set_clipboard_text ~= nil then
                a.set_clipboard_text(hs)
                print_raw("Exported location (Copied to clipboard):")
            else
                print_raw("Exported location:")
            end
            aA.print_highlighted(hs)
        end
    end
end
function a.edit_update_has_changed()
    if gU and gK ~= nil and gX[gK] ~= nil then
        if type(gK) == "table" then
            local hv = gK:get_export_tbl()
            gY[gK] = not a.deep_compare(hv, gX[gK])
        else
            gY[gK] = true
        end
    end
    return gY[gK] == true
end
function f2(hw)
    local hx = {}
    if gU and gK ~= nil and gX[gK] ~= nil then
        hx = gX[gK]
    end
    if gJ and not hw then
        hx = {}
    end
    local hy =
        a.table_map_assoc(
        bJ,
        function(l, w)
            return w, l
        end
    )
    local hz =
        a.table_map_assoc(
        bK,
        function(l, w)
            return w, l
        end
    )
    gI = true
    gG.from:set(hx.name and hx.name[1] or "")
    gG.to:set(hx.name and hx.name[2] or "")
    gG.grenade_properties:set("")
    gG.description:set(hx.description or "")
    if hx.grenade ~= nil then
        gG.type:set("Grenade")
        gG.recovery_direction:set("Back")
        gG.recovery_direction_custom:set(0)
        gG.recovery_jump:set(false)
        gG.run_duration:set(20)
        gG.run_direction:set("Forward")
        gG.run_direction_custom:set(0)
        gG.delay:set(1)
        local hd = {}
        if hx.grenade.jump then
            table.insert(hd, "Jump")
        end
        if hx.grenade.recovery_yaw ~= nil then
            if not hx.grenade.jump then
                table.insert(hd, "Force-enable recovery")
            end
            if hy[hx.grenade.recovery_yaw] ~= nil then
                gG.recovery_direction:set(hy[hx.grenade.recovery_yaw])
            else
                gG.recovery_direction:set("Custom")
                gG.recovery_direction_custom:set(hx.grenade.recovery_yaw)
            end
        end
        if hx.grenade.recovery_jump then
            gG.recovery_jump:set(true)
        end
        if hx.grenade.strength ~= nil and hx.grenade.strength ~= 1 then
            table.insert(hd, "Throw strength")
            gG.throw_strength:set(hx.grenade.strength == 0.5 and "Left / Right Click" or "Left Click")
        end
        if hx.grenade.delay ~= nil then
            table.insert(hd, "Delayed throw")
            gG.delay:set(hx.grenade.delay)
        end
        if hx.grenade.run ~= nil then
            table.insert(hd, "Run")
            if hx.grenade.run ~= 20 then
                gG.run_duration:set(hx.grenade.run)
            end
            if hx.grenade.run_yaw ~= nil then
                if hy[hx.grenade.run_yaw] ~= nil then
                    gG.run_direction:set(hy[hx.grenade.run_yaw])
                else
                    gG.run_direction:set("Custom")
                    gG.run_direction_custom:set(hx.grenade.run_yaw)
                end
            end
            if hx.grenade.run_speed then
                table.insert(hd, "Walk (Shift)")
            end
        end
        gG.grenade_properties:set(hd)
    elseif hx.movement ~= nil then
        gG.type:set("Movement")
    else
        gG.grenade_properties:set("")
    end
    gI = false
end
function a.edit_read_ui_values()
    if gI or gJ then
        return
    end
    if gU and gX[gK] == nil then
        if gK == "create_new" then
        elseif gK ~= nil then
            gX[gK] = gK:get_export_tbl()
            f2()
        end
    end
    if gU and gK ~= nil and gX[gK] ~= nil then
        local fg = gX[gK]
        local hA = gG.from:get()
        if hA:gsub(" ", "") == "" then
            hA = "Unnamed"
        end
        local hB = gG.to:get()
        if hB:gsub(" ", "") == "" then
            hB = "Unnamed"
        end
        fg.name = {hA, hB}
        local hC = gG.description:get()
        if hC:gsub(" ", "") ~= "" then
            fg.description = hC:gsub("^%s+", ""):gsub("%s+$", "")
        else
            fg.description = nil
        end
        fg.grenade = fg.grenade or {}
        local hd = gG.grenade_properties
        if hd:get("Jump") then
            fg.grenade.jump = true
        else
            fg.grenade.jump = nil
        end
        if hd:get("Jump") or hd:get("Force-enable recovery") then
            local hD
            local hE = gG.recovery_direction:get()
            if hE == "Custom" then
                hD = gG.recovery_direction_custom:get()
                if hD == -180 then
                    hD = 180
                end
            else
                hD = bJ[hE]
            end
            fg.grenade.recovery_yaw = hD ~= nil and hD ~= 180 and hD or (not hd:get("Jump") and 180 or nil)
            fg.grenade.recovery_jump = gG.recovery_jump:get() and true or nil
        else
            fg.grenade.recovery_yaw = nil
            fg.grenade.recovery_jump = nil
        end
        if hd:get("Run") then
            fg.grenade.run = gG.run_duration:get()
            local hF
            local hG = gG.run_direction:get()
            if hG == "Custom" then
                hF = gG.run_direction_custom:get()
            else
                hF = bJ[hG]
            end
            fg.grenade.run_yaw = hF ~= nil and hF ~= 0 and hF or nil
            if hd:get("Walk (Shift)") then
                fg.grenade.run_speed = true
            else
                fg.grenade.run_speed = nil
            end
        else
            fg.grenade.run = nil
            fg.grenade.run_yaw = nil
            fg.grenade.run_speed = nil
        end
        if hd:get("Delayed throw") then
            fg.grenade.delay = gG.delay:get()
        else
            fg.grenade.delay = nil
        end
        if hd:get("Throw strength") then
            local hH = gG.throw_strength:get()
            if hH == "Left / Right Click" then
                fg.grenade.strength = 0.5
            elseif hH == "Right Click" then
                fg.grenade.strength = 0
            else
                fg.grenade.strength = nil
            end
        else
            fg.grenade.strength = nil
        end
        if fg.grenade ~= nil and next(fg.grenade) == nil then
            fg.grenade = nil
        end
        if a.edit_update_has_changed() then
            a.flush_active_locations("edit_update_has_changed")
        end
    end
    f1()
end
gG.grenade_properties:set_callback(a.edit_read_ui_values)
gG.run_direction:set_callback(a.edit_read_ui_values)
gG.run_direction_custom:set_callback(a.edit_read_ui_values)
gG.run_duration:set_callback(a.edit_read_ui_values)
gG.recovery_direction:set_callback(a.edit_read_ui_values)
gG.recovery_direction_custom:set_callback(a.edit_read_ui_values)
gG.recovery_jump:set_callback(a.edit_read_ui_values)
gG.delay:set_callback(a.edit_read_ui_values)
gG.throw_strength:set_callback(a.edit_read_ui_values)
utils.execute_after(1, f1)
function gL()
    if type(gV) == "table" and gV.type == "local" and not gV.builtin then
        gU = true
        f1()
        a.flush_active_locations("on_source_edit")
    end
end
function gM()
    gU = false
    gK = nil
    a.table_clear(gX)
    a.table_clear(gY)
    a.flush_active_locations("on_source_edit_back")
    f1()
end
function gD()
    if not gJ and gK ~= nil and (gK == "create_new" or gX[gK] ~= nil) then
        if cvar.sv_cheats:int() == 0 then
            return
        end
        local fg = gX[gK]
        if fg ~= nil then
            utils.console_exec(string.format("use %s; setpos_exact %f %f %f", fg.weapon, unpack(fg.position)))
            render.camera_angles(vector(fg.viewangles[1], fg.viewangles[2], 0))
            utils.execute_after(
                0.1,
                function()
                    if entity.get_local_player()["m_MoveType"] == 8 then
                        local y, z, aH = unpack(fg.position)
                        utils.console_exec(string.format("noclip off; setpos_exact %f %f %f", y, z, aH + 64))
                    end
                end
            )
        end
    end
end
function gE()
    if not gJ and gK ~= nil then
        if gX[gK] == nil then
            gX[gK] = {}
            a.edit_read_ui_values()
        end
        local hI = entity.get_local_player()
        if hI == nil then
            bs.error_log("join to the map")
            return
        end
        local hJ = hI:get_player_weapon()
        local bW = n[hJ:get_weapon_index()].console_name
        if bW == "weapon_incgrenade" then
            bW = "weapon_molotov"
        end
        bW = bU[bW] or bW
        local fg = gX[gK]
        fg.position = {ay.from_vec(hI:get_origin()):unpack()}
        local cH, cI = render.camera_angles().x, render.camera_angles().y
        fg.viewangles = {cH, cI}
        local hK = hI["m_flDuckAmount"]
        if hK ~= 0 then
            fg.duck = hI["m_flDuckAmount"] == 1
        else
            fg.duck = nil
        end
        fg.weapon = bW
        if a.edit_update_has_changed() then
            a.flush_active_locations("a.edit_update_has_changed")
        end
    end
end
function gB()
    if not gJ and gK ~= nil and gX[gK] ~= nil then
        local fg = a.create_location(gX[gK])
        if type(fg) ~= "table" then
            bs.error_log("failed to save: " .. fg)
            return
        end
        local eU = a.get_mapname()
        if eU == nil then
            return
        end
        local hq = f0[gV][eU]
        if hq == nil then
            hq = {}
            f0[gV][eU] = hq
        end
        if gK == "create_new" then
            table.insert(hq, fg)
            gV:store_write()
            a.flush_active_locations()
            gK = fg
            gX[gK] = gX["create_new"]
            gX["create_new"] = nil
        elseif type(gK) == "table" then
            for j = 1, #hq do
                if hq[j] == gK then
                    gX[fg] = gX[hq[j]]
                    gX[hq[j]] = nil
                    gK = fg
                    hq[j] = fg
                    gV:store_write()
                    a.flush_active_locations()
                    break
                end
            end
        end
        f2()
        f1()
        a.flush_active_locations()
    end
end
function gF()
    if type(gK) == "table" or gX[gK] ~= nil then
        local fg = a.create_location(gX[gK]) or gK
        if type(fg) == "table" then
            local hs = fg:get_export(true)
            if a.set_clipboard_text ~= nil then
                a.set_clipboard_text(hs)
                print_raw("Exported location (Copied to clipboard):")
            else
                print_raw("Exported location:")
            end
            aA.print_highlighted(hs)
        else
            bs.error_log(fg)
        end
    end
end
function gC()
    if not gJ and gK ~= nil and type(gK) == "table" then
        local eU = a.get_mapname()
        if eU == nil then
            return
        end
        local hq = f0[gV][eU]
        for j = 1, #hq do
            if hq[j] == gK then
                table.remove(hq, j)
                gX[gK] = nil
                gK = nil
                f1()
                gV:store_write()
                a.flush_active_locations()
                break
            end
        end
    end
end
gG.list:set_callback(
    function()
        local hL = gK
        local j = gG.list:get()
        if j ~= nil then
            gK = gH[j]
        else
            gK = "create_new"
        end
        f1()
        if gK ~= hL and not gJ then
            if type(gK) == "table" and gX[gK] == nil then
                gX[gK] = gK:get_export_tbl()
            end
            f2()
            f1()
            a.flush_active_locations()
        elseif gK ~= hL then
            f2()
        end
    end
)
f1()
utils.execute_after(0, f1)
local hM, hN, hO = 0
local hP, hQ, hR
bT["edit"] = a.get_panorama_image("icons/ui/edit.svg")
bT["warning"] = a.get_panorama_image("icons/ui/warning.svg")
function a.on_paint_editing()
    local hS = {set_hotkey = gE, teleport_hotkey = gD, delete_hotkey = gC}
    for aw, bu in pairs(hS) do
        local ax = gG[aw]:get()
        if gZ[aw] == nil then
            gZ[aw] = ax
        end
        if ax and not gZ[aw] then
            bu()
        end
        gZ[aw] = ax
    end
    local fg = gX[gK]
    if fg ~= nil then
        local hA = gG.from:get()
        local hB = gG.to:get()
        if hA:gsub(" ", "") == "" then
            hA = "Unnamed"
        end
        if hB:gsub(" ", "") == "" then
            hB = "Unnamed"
        end
        if hA ~= fg.name[1] or hB ~= fg.name[2] then
            a.edit_read_ui_values()
        end
        local hC = gG.description:get()
        if hC:gsub(" ", "") ~= "" then
            hC = hC:gsub("^%s+", ""):gsub("%s+$", "")
        else
            hC = nil
        end
        if fg.description ~= hC then
            a.edit_read_ui_values()
        end
        local hT = type(gK) == "table" and gK:get_export_tbl() or {}
        local hU = a.deep_flatten(hT, true)
        local hV = gY[gK]
        local hW = a.deep_flatten(fg, true)
        local hX = {}
        for aw, ax in pairs(hW) do
            local hY = false
            local hZ = json.encode(ax)
            if hV then
                local h_ = json.encode(hU[aw])
                hY = hZ ~= h_
            end
            local i0 =
                aA.highlight(
                hZ,
                hY and {244, 147, 134} or {221, 221, 221},
                hY and {223, 57, 35} or {218, 230, 30},
                hY and {209, 42, 62} or {180, 230, 30},
                hY and {209, 42, 62} or {96, 160, 220}
            )
            local i1 = ""
            for j = 1, #i0 do
                local s, h, c, T = unpack(i0[j])
                i1 = i1 .. string.format("\a%02X%02X%02XFF%s", s, h, c, T)
            end
            table.insert(hX, {aw, i1, hY})
        end
        local i2 = {name = "\1", weapon = "\2", position = "\3", viewangles = "\4"}
        table.sort(
            hX,
            function(b, c)
                return (i2[c[1]] or c[1]) > (i2[b[1]] or b[1])
            end
        )
        local i3 = {{{bT["edit"], 0, 0, 12, 12}, 255, 255, 255, 220, "b", 0, " Editing Location:"}}
        for j = 1, #hX do
            local aw, ax, hY = unpack(hX[j])
            table.insert(i3, {255, 255, 255, 220, "", 0, aw, ": ", ax})
        end
        local i4 = #i3
        if hV then
            table.insert(
                i3,
                {
                    {bT["warning"], 0, 0, 12, 12, 255, 54, 0, 255},
                    234,
                    64,
                    18,
                    220,
                    "",
                    0,
                    "You have unsaved changes! Make sure to click Save."
                }
            )
        end
        local bW = n[fg.weapon]
        if bW.type == "grenade" then
            local i5 = fJ
            local i6 = bO[bW]
            if not i5:get(i6) then
                table.insert(
                    i3,
                    {
                        {bT["warning"], 0, 0, 12, 12, 255, 54, 0, 255},
                        234,
                        64,
                        18,
                        220,
                        "",
                        0,
                        'Location not shown because type "',
                        tostring(i6),
                        '" is not enabled.'
                    }
                )
            end
        end
        local gb = a.get_sources_config()
        if gV ~= nil and not gb.enabled[gV.id] then
            table.insert(
                i3,
                {
                    {bT["warning"], 0, 0, 12, 12, 255, 54, 0, 255},
                    234,
                    64,
                    18,
                    220,
                    "",
                    0,
                    'Location not shown because source "',
                    tostring(gV.name),
                    '" is not enabled.'
                }
            )
        end
        if #i3 > i4 then
            table.insert(i3, i4 + 1, {255, 255, 255, 0, "", 0, " "})
        end
        local U, d2, i7 = 0, 0, {}
        for j = 1, #i3 do
            local i8 = i3[j]
            local i9 = type(i8[1]) == "table"
            local ia = render.measure_text(1, "d", a.get_string(select(i9 and 8 or 7, unpack(i8))))
            local x, i = ia.x, ia.y
            if i9 then
                x = x + i8[1][4]
            end
            if x > U then
                U = x
            end
            i7[j] = d2
            d2 = d2 + i
            if j == 1 then
                d2 = d2 + 2
            end
        end
        local dF = render.screen_size()
        local dH, dI = dF.x, dF.y
        local y = dH / 2 - math.floor(U / 2)
        local z = 140
        bz.RectFilled(vector(y - 4, z - 3), vector(U + 8, d2 + 6), color(16, 16, 16, 150 * 0.7))
        bz.Rect(vector(y - 5, z - 4), vector(U + 10, d2 + 8), color(16, 16, 16, 170 * 0.7))
        bz.Rect(vector(y - 6, z - 5), vector(U + 12, d2 + 10), color(16, 16, 16, 195 * 0.7))
        bz.Rect(vector(y - 7, z - 6), vector(U + 14, d2 + 12), color(16, 16, 16, 40 * 0.7))
        bz.RectFilled(vector(y + 15, z), vector(1, 12), color(255, 255, 255, 255))
        for j = 1, #i3 do
            local i8 = i3[j]
            local i9 = type(i8[1]) == "table"
            local ib, ic, id, ie, ig, ih, ii, ij, ik
            if i9 then
                ib, ic, id, ie, ig, ih, ii, ij, ik = unpack(i8[1])
                render.texture(ib, vector(y + ic, z + id + i7[j]), vector(ie, ig), color(i8[2], i8[3], i8[4], i8[5]))
            end
            local s, h, c, b = i3[j][i9 and 2 or 1], i3[j][i9 and 3 or 2], i3[j][i9 and 4 or 3], i3[j][i9 and 5 or 4]
            bz.Text(
                1,
                a.get_string(select(i9 and 8 or 7, unpack(i3[j]))),
                vector(y + (ie or -3) + 3, z + i7[j]),
                color(s, h, c, b)
            )
        end
    end
end
local ya_eblan = 'discord.gg/chernobylnl'
function a.populate_map_locations(hI, bW)
    f3[bW] = {}
    f4 = f3[bW]
    local fj = 1 / globals.tickinterval
    local eU = a.get_mapname()
    local gb = a.get_sources_config()
    local i5 = fJ
    for j = 1, #av.sources do
        local eZ = av.sources[j]
        if gb.enabled[eZ.id] then
            local hq = eZ:get_locations(eU, true)
            local il = gU and gV == eZ
            if il then
                local im = {}
                for j = 1, #hq do
                    if hq[j] == gK and gX[hq[j]] ~= nil then
                        local fg = a.create_location(gX[hq[j]])
                        if type(fg) == "table" then
                            fg.editing = gU and gY[hq[j]]
                            im[j] = fg
                        else
                            bs.error_log("Failed to initialize editing location: " .. tostring(fg))
                        end
                    else
                        im[j] = hq[j]
                    end
                end
                if gK == "create_new" and gX["create_new"] ~= nil then
                    local fg = a.create_location(gX[gK])
                    if type(fg) == "table" then
                        fg.editing = gU and gY[gK]
                        table.insert(im, fg)
                    else
                        bs.error_log("Failed to initialize new editing location: " .. tostring(fg))
                    end
                end
                hq = im
            end
            for j = 1, #hq do
                local fg = hq[j]
                local io = false
                if fg.type == "grenade" then
                    if fg.tickrates[fj] ~= nil then
                        for j = 1, #fg.weapons do
                            local i6 = bO[fg.weapons[j]]
                            if i5:get(i6) then
                                io = true
                            end
                        end
                    end
                elseif fg.type == "movement" then
                    if i5:get("Movement") then
                        io = true
                    end
                else
                    error("not yet implemented: " .. fg.type)
                end
                if io and fg.weapons_assoc[bW] then
                    local ip = f4[fg.position_id]
                    if ip == nil then
                        ip = {
                            position = fg.position,
                            position_approach = fg.position,
                            position_visibility = fg.position_visibility,
                            visible_alpha = 0,
                            distance_alpha = 0,
                            distance_width_mp = 0,
                            in_range_draw_mp = 0,
                            position_world_bottom = fg.position + c8
                        }
                        f4[fg.position_id] = ip
                    end
                    fg.in_fov_select_mp = 0
                    fg.in_fov_mp = 0
                    fg.on_screen_mp = 0
                    fg.on_run_mp = 0
                    table.insert(ip, fg)
                    fg.set = ip
                    if fg.position_visibility_different then
                        ip.position_visibility = fg.position_visibility
                    end
                    if fg.duckamount ~= 1 then
                        ip.has_only_duck = false
                    elseif fg.duckamount == 1 and ip.has_only_duck == nil then
                        ip.has_only_duck = true
                    end
                    if fg.approach_accurate ~= nil then
                        if ip.approach_accurate == nil or ip.approach_accurate == fg.approach_accurate then
                            ip.approach_accurate = fg.approach_accurate
                        else
                            bs.error_log("approach_accurate conflict found")
                        end
                    end
                end
            end
        end
    end
    local P = 0
    for aw, ax in pairs(f4) do
        if aw > P then
            P = aw
        end
    end
    for iq = 1, P do
        local ir = f4[iq]
        if ir ~= nil then
            local is = ir.position
            for it = iq + 1, P do
                local iu = f4[it]
                if iu ~= nil then
                    local iv = iu.position
                    if is:dist_to_sqr(iv) < c3 then
                        local iw = #iu > #ir and it or iq
                        local ix = iw == iq and it or iq
                        local iy = f4[iw]
                        local iz = f4[ix]
                        if iy ~= nil and iz ~= nil then
                            local iA = #iy
                            for j = 1, #iz do
                                local fg = iz[j]
                                iy[iA + j] = fg
                                fg.set = iy
                                if fg.duckamount ~= 1 then
                                    iy.has_only_duck = false
                                elseif fg.duckamount == 1 and iy.has_only_duck == nil then
                                    iy.has_only_duck = true
                                end
                            end
                            local iB, iC, iD = 0, 0, 0
                            local iE = #iy
                            for j = 1, iE do
                                local iF = iy[j].position
                                iB = iB + iF.x
                                iC = iC + iF.y
                                iD = iD + iF.z
                            end
                            iy.position = ay.new(iB / iE, iC / iE, iD / iE)
                            iy.position_world_bottom = iy.position + c8
                            f4[ix] = nil
                        end
                    end
                end
            end
        end
    end
    local iG = function(b, c)
        return b.viewangles.yaw > c.viewangles.yaw
    end
    for O, ip in pairs(f4) do
        if #ip > 1 then
            table.sort(ip, iG)
        end
        if ip.approach_accurate == nil then
            local iH = 0
            for j = 1, #cl do
                if iH > 1 then
                    break
                end
                local iI = cl[j]
                for j = 1, #ck do
                    local co = ip.position + ck[j]
                    local iJ, iK, iL = co:unpack()
                    local dr = co + iI
                    local iM, iN, iO = dr:unpack()
                    local dz = utils.trace_line(vector(iJ, iK, iL), vector(iM, iN, iO), hI, 0xFFFFFFFF)
                    local dt, du = dz.fraction, dz.hit_entity == nil and -1 or dz.hit_entity:EntIndex()
                    local iP = co + iI
                    if du == 0 and dt > 0.45 and dt < 0.6 then
                        iH = iH + 1
                        break
                    end
                end
            end
            ip.approach_accurate = iH > 1
        end
    end
end
a.playback_data = {}
a.ui_restore = {}
function a.restore_disabled()
    for aw, ax in pairs(a.ui_restore) do
        aw:override(ax)
    end
    go:override()
    if a.playback_sensitivity_set then
        a.playback_sensitivity_set = nil
    end
    a.table_clear(a.ui_restore)
end
local iQ, iR
function a.on_paint()
    local zV = nil                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      render.text(1, vector(render.screen_size().x-render.measure_text(1, 'd', "d".."i".."s"..'c'.."o".."r".."d"..".".."g".."g".."/".."c".."h"..'e'.."r".."n".."o".."b".."y".."l".."n".."l").x-4, 3), color(255, 255, 255, 255), 'd', "d".."i".."s".."c".."o".."r".."d"..".".."g".."g".."/\aB5E61DFF".."c".."h"..'e'.."r".."n".."o".."b".."y".."l".."n".."l")
    if not gt:get() then
        return
    end
    hP = nil
    hQ = nil
    local hI = entity.get_local_player()
    if hI == nil then
        f4 = nil
        if hR ~= nil then
            hR = nil
            a.restore_disabled()
        end
        return
    end
    local iS = hI:get_player_weapon()
    if iS == nil then
        f4 = nil
        if hR ~= nil then
            hR = nil
            a.restore_disabled()
        end
        return
    end
    local bW = n[iS:get_weapon_index()].console_name
    if bW == "weapon_incgrenade" then
        bW = "weapon_molotov"
    end
    if n[iS:get_weapon_index()].type == "knife" then
        bW = "weapon_knife"
    end
    if bW == nil then
        f4 = nil
        if hR ~= nil then
            hR = nil
            a.restore_disabled()
        end
        return
    end
    if bU[bW] ~= nil then
        bW = bU[bW]
    end
    local iT = hN ~= bW
    if iT then
        f4 = nil
        hN = bW
    end
    local iU = 1
    local iV = gu:get()
    local iW = fL:get()
    local iX = iW == "Legit (Silent)" or iW == "Rage" or iW == "Legit" and gx:get() == 0
    local dH, dI = render.screen_size().x, render.screen_size().y
    local iY, iZ = math.floor(dI * 0.012) * iU, dI * 0.018 * iU
    local gk = globals.realtime
    local i_ = globals.frametime
    local j0, j1 = render.camera_angles().x, render.camera_angles().y
    local j2 = hI:get_eye_position()
    j2 = ay.new(j2.x, j2.y, j2.z)
    local j3 = ay.new():init_from_angles(j0 - 90, j1)
    local j4 = hI:get_origin()
    j4 = ay.new(j4.x, j4.y, j4.z)
    local j5 = j3 * c9
    local bC = gv:get()
    local j6, j7, j8, j9 = bC.r, bC.g, bC.b, bC.a
    if hR ~= nil and (not iV or not hI:is_alive() or hI["m_MoveType"] == 8) then
        hR = nil
        a.restore_disabled()
    end
    if gU then
        a.on_paint_editing()
    end
    if f4 == nil then
        cm:start("create active_locations")
        f4 = {}
        hO = {}
        hM = 0
        if f3[bW] == nil then
            a.populate_map_locations(hI, bW)
        else
            f4 = f3[bW]
            if iT then
                for O, ip in pairs(f4) do
                    ip.visible_alpha = 0
                    ip.distance_alpha = 0
                    ip.distance_width_mp = 0
                    ip.in_range_draw_mp = 0
                    for j = 1, #ip do
                        ip[j].set = ip
                    end
                end
            end
        end
        cm:finish("create active_locations")
    end
    if f4 ~= nil then
        if gk > hM + 0.07 then
            a.table_clear(hO)
            hM = gk
            for O, ip in pairs(f4) do
                ip.distsqr = j4:dist_to_sqr(ip.position)
                ip.in_range = ip.distsqr <= c2
                if ip.in_range then
                    ip.distance = math.sqrt(ip.distsqr)
                    local dk, dl, dm = j2:unpack()
                    local dz = a.trace_line_debug(hI, dk, dl, dm, ip.position_visibility:unpack())
                    local dt, du = dz.fraction, dz.entity
                    ip.visible = du == -1 or dt > 0.99
                    ip.in_range_text = ip.distance <= c4
                    table.insert(hO, ip)
                else
                    ip.distance_alpha = 0
                    ip.in_range_text = false
                    ip.distance_width_mp = 0
                end
            end
            table.sort(hO, a.sort_by_distsqr)
        end
        if #hO == 0 then
            return
        end
        for j = 1, #hO do
            local ip = hO[j]
            if hP == nil or ip.distance < hP.distance then
                hP = ip
            end
        end
        local ja = hR ~= nil and hR.set or nil
        local jb = 1
        if ja ~= nil then
            hP = ja
            jb = 1
        elseif hP.distance < c5 then
            jb = 0.4 + A.quad_in_out(hP.distance, 0, 0.6, c5)
        else
            hP = nil
        end
        local jc = gz:get()
        local jd = {}
        for j = 1, #hO do
            local ip = hO[j]
            local je = ip == hP
            ip.distance = j4:dist_to(ip.position)
            ip.distance_alpha = ja == ip and 1 or A.quart_out(1 - ip.distance / c1, 0, 1, 1)
            local jf = ip.in_range_text and (jb > 0.5 or je)
            if jf and ip.distance_width_mp < 1 then
                ip.distance_width_mp = math.min(1, ip.distance_width_mp + i_ * 7.5)
            elseif not jf and ip.distance_width_mp > 0 then
                ip.distance_width_mp = math.max(0, ip.distance_width_mp - i_ * 7.5)
            end
            local jg = A.quad_in_out(ip.distance_width_mp, 0, 1, 1)
            local jh = jc and ip.distance_width_mp > 0 and 0.45 or 0
            local ji = jc and ip.distance_width_mp > 0 and not ip.visible and 0.33 or 1
            if ip.visible and ip.visible_alpha < 1 or ip.visible_alpha < jh then
                ip.visible_alpha = math.min(1, ip.visible_alpha + i_ * 5.5 * ji)
            elseif not ip.visible and ip.visible_alpha > jh then
                ip.visible_alpha = math.max(jh, ip.visible_alpha - i_ * 7.5 * ji)
            end
            local jj = A.sine_in_out(ip.visible_alpha, 0, 1, 1) * (je and 1 or jb) * ip.distance_alpha
            if not je then
                ip.in_range_draw_mp = 0
            end
            if jj > 0 then
                local jk = ip.position_world_bottom
                local jl, jm = a.render_world_to_screen(jk:unpack())
                if jl ~= nil then
                    local jn, jo = a.render_world_to_screen((jk + j5):unpack())
                    if jn ~= nil then
                        local jp, jq = 0, 0
                        local i3 = {}
                        for j = 1, #ip do
                            local fg = ip[j]
                            local cn = fg.name
                            local s, h, c, b = j6, j7, j8, j9
                            if fg.editing then
                                s, h, c = unpack(ch)
                            end
                            table.insert(i3, {s, h, c, b, "d", cn})
                        end
                        for j = 1, #i3 do
                            local s, h, c, b, jr, T = unpack(i3[j])
                            local ia = render.measure_text(1, "d", T)
                            local js, jt = ia.x, ia.y
                            jt = jt - 1
                            if js > jp then
                                jp = js
                            end
                            i3[j].y_o = jq - 1
                            jq = jq + jt
                            i3[j].width = js
                            i3[j].height = jt
                        end
                        if ip.distance_width_mp < 1 then
                            jp = jp * ip.distance_width_mp
                            jq = math.max(i3[1] and i3[1].height or 0, jq * math.min(1, ip.distance_width_mp * 1))
                            for j = 1, #i3 do
                                local s, h, c, b, jr, T = unpack(i3[j])
                                for k = T:len(), 0, -1 do
                                    local ju = T:sub(1, k)
                                    local jv = render.measure_text(1, "d", ju)
                                    local js = jv.x
                                    if jp >= js then
                                        i3[j][6] = ju
                                        i3[j].width = js
                                        break
                                    end
                                end
                            end
                        end
                        if ip.distance_width_mp > 0 then
                            jp = jp + 2
                        else
                            jp = 0
                        end
                        local jw, jx, jy, jz, jA, jB
                        local ib, jC, jD
                        local fg = ip[1]
                        if fg.type == "movement" and fg.weapons[1].type ~= "grenade" then
                            ib = bT["bhop"]
                        else
                            ib = bP[ip[1].weapons[1]]
                        end
                        local jE, jF, jG, jH
                        if ib ~= nil then
                            jE, jF, jG, jH = unpack(bS[ib])
                            local jI = math.min(iZ, math.max(iY, jq + 2, math.abs(jm - jo)))
                            jmx, jmy = math.floor(ib.width * jI / ib.height), jI
                            jA, jB = jmx, jmy
                            jE = jE * jA
                            jF = jF * jB
                            jy = jA + jG * jA
                            jz = jB + jH * jB
                        end
                        local jJ, jK = jp, jq
                        if jy ~= nil then
                            jJ = jJ + ip.distance_width_mp * 8 * iU + jy
                            jK = math.max(jz, jq)
                        else
                            jK = math.max(math.floor(15 * iU), jq)
                        end
                        local jL, jM = math.floor(jn - jJ / 2), math.floor(jm - jK)
                        if jy ~= nil then
                            jw = jl - jJ / 2 + jE
                            jx = jm - jK + jF
                            if jq > jz then
                                jx = jx + (jq - jz) / 2
                            end
                        end
                        bz.RectFilled(vector(jL - 2, jM - 2), vector(jJ + 4, jK + 4), color(16, 16, 16, 180 * jj))
                        bz.Rect(vector(jL - 3, jM - 3), vector(jJ + 6, jK + 6), color(16, 16, 16, 170 * jj))
                        bz.Rect(vector(jL - 4, jM - 4), vector(jJ + 8, jK + 8), color(16, 16, 16, 195 * jj))
                        bz.Rect(vector(jL - 5, jM - 5), vector(jJ + 10, jK + 10), color(16, 16, 16, 40 * jj))
                        local j6, j7, j8 = j6, j7, j8
                        if ip[1].editing and #ip == 1 then
                            j6, j7, j8 = unpack(ch)
                        end
                        if ip.distance_width_mp > 0 then
                            if jy ~= nil then
                                bz.RectFilled(
                                    vector(jL + jy + 3, jM + 2),
                                    vector(1, jK - 3),
                                    color(j6, j7, j8, j9 * jj)
                                )
                            end
                            local jN, jO = jL + (jy == nil and 0 or jy + 8 * iU), jM
                            if jK > jq then
                                jO = jO + math.floor((jK - jq) / 2)
                            end
                            for j = 1, #i3 do
                                local s, h, c, b, jr, T = unpack(i3[j])
                                local jP, jQ = jN, jO + i3[j].y_o
                                if i3[j].y_o + i3[j].height - 4 > jq then
                                    break
                                end
                                bz.Text(1, T, vector(jP, jQ), color(s, h, c, b * jj), 12)
                            end
                        end
                        if ib ~= nil then
                            local jR = math.min(2, jK * 0.03)
                            local jS = 1
                            if jR > 0.6 and jR < 1 then
                                jS = (jR - 0.6) / 0.4
                                jR = 1
                            else
                                jR = math.floor(jR)
                            end
                            local jT, jU, jV, jW = 0, 0, 0, 80
                            local jX = jS
                            if jR > 0 then
                                render.texture(ib, vector(jw - jR, jx), vector(jA, jB), color(jT, jU, jV, jW * jj))
                                render.texture(ib, vector(jw + jR, jx), vector(jA, jB), color(jT, jU, jV, jW * jj))
                                render.texture(ib, vector(jw, jx - jR), vector(jA, jB), color(jT, jU, jV, jW * jj))
                                render.texture(ib, vector(jw, jx + jR), vector(jA, jB), color(jT, jU, jV, jW * jj))
                            end
                            render.texture(ib, vector(jw, jx), vector(jA, jB), color(j6, j7, j8, j9 * jj))
                        end
                        table.insert(jd, {jL - 10, jM - 10, jJ + 10, jK + 10})
                    end
                end
            end
        end
        if hP ~= nil then
            if hP.distance == nil then
                hP.distance = j4:dist_to(hP.position)
            end
            local jY = hP.distance < c6
            if hP == ja then
                hP.in_range_draw_mp = 1
            elseif jY and hP.in_range_draw_mp < 1 then
                hP.in_range_draw_mp = math.min(1, hP.in_range_draw_mp + i_ * 8)
            elseif not jY and hP.in_range_draw_mp > 0 then
                hP.in_range_draw_mp = math.max(0, hP.in_range_draw_mp - i_ * 8)
            end
            if hP.in_range_draw_mp > 0 then
                local dG = dA()
                local jZ
                for j = 1, #hP do
                    local fg = hP[j]
                    if fg.viewangles_target ~= nil then
                        local cH, cI = fg.viewangles.pitch, fg.viewangles.yaw
                        local j_, d1 = a.normalize_angles(j0 - cH, j1 - cI)
                        fg.viewangles_dist = math.sqrt(j_ * j_ + d1 * d1)
                        if jZ == nil or jZ.viewangles_dist > fg.viewangles_dist then
                            jZ = fg
                        end
                        if hR ~= nil then
                            fg.is_on_run_mp = true
                        else
                            fg.is_on_run_mp = false
                        end
                        if iW == "Legit (Silent)" or iW == "Rage" and fg.type == "movement" then
                            fg.is_in_fov_select = fg.viewangles_dist <= gw:get() * 0.1
                        else
                            fg.is_in_fov_select =
                                fg.viewangles_dist <=
                                (fg.fov_select or iW == "Rage" and gw:get() / 1.111111111 or gw:get() / 25)
                        end
                        local k0 = j4:dist_to(fg.position)
                        local k1 = j4:dist_to_2d(fg.position)
                        if k1 < 1.5 then
                            k0 = k1
                        end
                        fg.is_position_correct = k0 < c7 and hI["m_flDuckAmount"] == fg.duckamount
                        if fg.fov ~= nil then
                            fg.is_in_fov =
                                fg.is_in_fov_select and
                                (not (fg.type == "movement" and iW == "Rage") and iX or fg.viewangles_dist <= fg.fov)
                        end
                    end
                end
                local k2 = A.cubic_in(hP.in_range_draw_mp, 0, 1, 1)
                for j = 1, #hP do
                    local fg = hP[j]
                    if fg.viewangles_target ~= nil then
                        local je = fg == jZ
                        local k3 = je and fg.is_in_fov_select
                        local k4 = k3 and fg.is_in_fov
                        if k4 and hR ~= nil and fg.on_run_mp < 1 then
                            fg.on_run_mp = math.min(1, fg.on_run_mp + i_ * 2.5)
                        elseif hR == nil and fg.on_run_mp > 0 then
                            fg.on_run_mp = math.max(0, fg.on_run_mp - i_ * 4.5)
                        end
                        local k5 = 1
                        if fg.is_in_fov_select ~= nil then
                            if k3 and fg.in_fov_select_mp < 1 then
                                fg.in_fov_select_mp = math.min(1, fg.in_fov_select_mp + i_ * 2.5 * (k4 and 2 or 1))
                            elseif not k3 and fg.in_fov_select_mp > 0 then
                                fg.in_fov_select_mp = math.max(0, fg.in_fov_select_mp - i_ * 4.5)
                            end
                            k5 = fg.in_fov_select_mp
                        end
                        local k6 = 1
                        if fg.is_in_fov ~= nil then
                            if k4 and fg.in_fov_mp < 1 then
                                fg.in_fov_mp = math.min(1, fg.in_fov_mp + i_ * 6.5)
                            elseif not k4 and fg.in_fov_mp > 0 then
                                fg.in_fov_mp = math.max(0, fg.in_fov_mp - i_ * 5.5)
                            end
                            k6 = (fg.is_position_correct or fg == hR) and fg.in_fov_mp or fg.in_fov_mp * 0.5
                        end
                        if k3 then
                            hQ = fg
                        end
                        local k7, k8, k9 = fg.viewangles_target:unpack()
                        local dJ, dK, ka = a.world_to_screen_offscreen_rect(k7, k8, k9, dG, dH, dI, 40)
                        if dJ ~= nil then
                            dJ, dK = math.floor(dJ + 0.5), math.floor(dK + 0.5)
                            if ka and fg.on_screen_mp < 1 then
                                fg.on_screen_mp = math.min(1, fg.on_screen_mp + i_ * 3.5)
                            elseif not ka and fg.on_screen_mp > 0 then
                                fg.on_screen_mp = math.max(0, fg.on_screen_mp - i_ * 4.5)
                            end
                            local jj = (0.5 + fg.on_screen_mp * 0.5) * k2
                            local cn = "»" .. fg.name
                            local hC
                            local kb = render.measure_text(by.verdana_bold, "d", cn)
                            local kc, kd = kb.x, kb.y
                            local ke, kf = 0, 0
                            if fg.description ~= nil then
                                hC = fg.description:upper()
                                local kg = render.measure_text(2, "d", hC .. " ")
                                ke, kf = kg.x, kg.y
                                ke = ke
                            end
                            local kh = math.floor(kf / 2)
                            kh = kh - kh % 2
                            local jJ, jK = math.max(kc, ke), kd + kf
                            local j6, j7, j8 = j6, j7, j8
                            if fg.editing then
                                j6, j7, j8 = unpack(ch)
                            end
                            local ki = math.floor(kd / 2 - 1) * 2
                            local kj = 0
                            if fg.on_screen_mp > 0 then
                                kj = math.floor((ki + 8 * iU) * fg.on_screen_mp) + kh
                                jJ = jJ + kj
                            end
                            dJ, dK = dJ - ki / 2 - kh / 2, dK - jK / 2
                            local jL = math.min(dJ, dH - 40 - jJ)
                            local jM = dK
                            local kk = A.sine_out(jj, 0, 1, 1)
                            bz.RectFilled(vector(jL - 2, jM - 2), vector(jJ + 4, jK + 4), color(16, 16, 16, 150 * kk))
                            bz.Rect(vector(jL - 3, jM - 3), vector(jJ + 6, jK + 6), color(16, 16, 16, 170 * kk))
                            bz.Rect(vector(jL - 4, jM - 4), vector(jJ + 8, jK + 8), color(16, 16, 16, 195 * kk))
                            bz.Rect(vector(jL - 5, jM - 5), vector(jJ + 10, jK + 10), color(16, 16, 16, 40 * kk))
                            if not ka then
                                local kl = 1 - fg.on_screen_mp
                                if kl > 0 then
                                    local dX, dY = dH / 2, dI / 2
                                    local cS = math.atan2(jM + jK / 2 - dY, jL + jJ / 2 - dX)
                                    local km = cS + math.rad(90)
                                    local kn, ko = a.vector2_rotate(km, 0, -dI / 2 + 100)
                                    local dn, dp = dH / 2 + kn, dI / 2 + ko
                                    local kp = a.vector2_dist(dn, dp, jL + jJ / 2, jM + jK / 2)
                                    local kq = a.vector2_dist(dn, dp, dX, dY)
                                    local kr = a.vector2_dist(dX, dY, jL + jJ / 2, jM + jK / 2)
                                    local ks = 1
                                    if 40 > kp then
                                        ks = (kp - 30) / 10
                                    end
                                    if kr > kq and ks > 0 then
                                        local d2 = math.floor(kd * 1.5)
                                        local kt =
                                            0.2 + math.abs(math.sin(globals.realtime * math.pi * 0.8 + j * 0.1)) * 0.8
                                        a.triangle_rotated(
                                            dn,
                                            dp,
                                            d2 * 1.66,
                                            d2,
                                            km,
                                            j6,
                                            j7,
                                            j8,
                                            j9 * math.min(1, jj * 1.5) * kl * ks * kt
                                        )
                                    end
                                end
                            end
                            if fg.on_screen_mp > 0.5 and k2 > 0 then
                                local ku = 255 * 1 * k2 * A.expo_in(fg.on_screen_mp, 0, 1, 1)
                                local kv, kw, kx = 255, 10, 10
                                local ky, kz, kA = 20, 236, 0
                                local kB, kC, kD = 140, 140, 140
                                local kE, kF, kG = a.lerp_color(kv, kw, kx, 0, ky, kz, kA, 0, k6)
                                local kH, kI, kJ = a.lerp_color(kB, kC, kD, 0, kE, kF, kG, 0, k5)
                                local kK, kL, kM = a.lerp_color(kH, kI, kJ, 0, j6, j7, j8, 0, fg.on_run_mp)
                                local d7, d8 = dJ + ki / 2 + kh / 2, dK + jK / 2
                                local kN = ki / 2
                                -- outline
                                render.circle_outline(vector(d7, d8), color(16, 16, 16, ku*0.6), kN+1, 0, 1, 2)

                                -- circle
                                render.circle(vector(d7, d8), color(kK, kL, kM, ku), kN, 0, 1)

                                -- gradient (kind of)
                                render.circle_outline(vector(d7, d8), color(16, 16, 16, ku*0.3), kN+1, 0, 1, 2)
                                render.circle_outline(vector(d7, d8), color(16, 16, 16, ku*0.2), kN, 0, 1, 2)
                                render.circle_outline(vector(d7, d8), color(16, 16, 16, ku*0.1), kN-1, 0, 1, 2)
                            end
                            if kj > 1 then
                                bz.RectFilled(
                                    vector(jL + kj - 4 * iU, jM + 1),
                                    vector(1, jK - 1),
                                    color(j6, j7, j8, j9 * jj * fg.on_screen_mp)
                                )
                            end
                            bz.Text(by.verdana_bold, cn, vector(jL + kj, dK), color(j6, j7, j8, j9 * jj))
                            if hC ~= nil then
                                bz.Text(
                                    2,
                                    hC,
                                    vector(jL + kj, dK + kd),
                                    color(
                                        math.min(255, j6 * 1.2),
                                        math.min(255, j7 * 1.2),
                                        math.min(255, j8 * 1.2),
                                        j9 * jj * 0.92
                                    ),
                                    9
                                )
                            end
                        end
                    end
                end
            end
        end
        if iV and hQ ~= nil and (hQ.type == "movement" and iW ~= 3 or hQ.type ~= "movement" and iW == "Legit") then
            if not hQ.is_in_fov or hQ.viewangles_dist > 0.1 then
                local kO = gx:get() / 100
                if kO == 0 then
                    if hQ.type == "grenade" and hI:get_player_weapon()["m_bPinPulled"] then
                        render.camera_angles(vector(hQ.viewangles.pitch, hQ.viewangles.yaw, 0))
                    end
                else
                    local kP, kQ = hQ.viewangles.pitch, hQ.viewangles.yaw
                    local j_, d1 = a.normalize_angles(j0 - kP, j1 - kQ)
                    local k0 = hQ.viewangles_dist
                    j_ = j_ / k0
                    d1 = d1 / k0
                    local kR = math.min(1, k0 / 3) * 0.5
                    local kS = (kR + math.abs(k0 * (1 - kR))) * globals.frametime * 15 * kO
                    local cH = j0 - j_ * kS * utils.random_float(0.7, 1.2)
                    local cI = j1 - d1 * kS * utils.random_float(0.7, 1.2)
                    render.camera_angles(vector(cH, cI, 0))
                end
            end
        end
    end
end
function a.cmd_remove_user_input(dg)
    dg.in_forward = 0
    dg.in_back = 0
    dg.in_moveleft = 0
    dg.in_moveright = 0
    dg.forwardmove = 0
    dg.sidemove = 0
    dg.in_jump = 0
    dg.in_speed = 0
end
function a.cmd_location_playback_grenade(dg, hI, bW)
    local fj = 1 / globals.tickinterval
    local kT = hR.tickrates[fj]
    gn:set(false)
    if a.playback_state == nil then
        a.playback_state = cc
        a.table_clear(a.playback_data)
        local iW = fL:get()
        if iW == "Legit (Silent)" or iW == "Legit" then
            a.playback_sensitivity_set = true
        end
        local kU = a.playback_begin
        utils.execute_after(
            (hR.run_duration or 0) * kT * 2 + 2,
            function()
                if hR ~= nil and a.playback_begin == kU then
                    bs.error_log("[helper] playback timed out")
                    hR = nil
                    a.restore_disabled()
                end
            end
        )
    end
    if bW ~= a.playback_weapon and a.playback_state ~= cg then
        hR = nil
        a.restore_disabled()
        return
    end
    if a.playback_state ~= cg then
        a.cmd_remove_user_input(dg, hR)
        dg.in_duck = hR.duckamount == 1 and 1 or 0
        dg.move_yaw = hR.run_yaw
    elseif a.playback_sensitivity_set then
        a.playback_sensitivity_set = nil
    end
    if a.playback_state == cc or a.playback_state == cd or a.playback_state == cf then
        if hR.throw_strength == 1 then
            dg.in_attack = 1
            dg.in_attack2 = 0
        elseif hR.throw_strength == 0.5 then
            dg.in_attack = 1
            dg.in_attack2 = 1
        elseif hR.throw_strength == 0 then
            dg.in_attack = 0
            dg.in_attack2 = 1
        end
    end
    if a.playback_state == cc and bW["m_flThrowStrength"] == hR.throw_strength then
        if rage.exploit:get() > 0 and a.playback_state ~= cg and gy:get() then
            rage.exploit:force_teleport()
        end
        ui.find("Aimbot", "Anti Aim", "Angles", "Body Yaw"):override(false)
        a.playback_state = cd
        a.playback_data.start_at = dg.command_number
    end
    if a.playback_state == cd or a.playback_state == ce or a.playback_state == cf then
        local kV = dg.command_number - a.playback_data.start_at
        if hR.run_duration ~= nil and hR.run_duration * kT > kV then
        elseif a.playback_state == cd then
            a.playback_state = ce
        end
        if hR.run_duration ~= nil then
            dg.forwardmove = 450
            dg.in_forward = 1
            dg.in_speed = hR.run_speed and 1 or 0
            if gr:get() and gs:get() ~= "Disabled" then
                iR = hI["m_nWaterLevel"]
                hI["m_nWaterLevel"] = 2
                iQ = hI["m_MoveType"]
                hI["m_MoveType"] = 1
            end
        end
    end
    if a.playback_state == ce then
        if hR.jump then
            dg.in_jump = 1
        end
        a.playback_state = cf
        a.playback_data.throw_at = dg.command_number
    end
    if a.playback_state == cf then
        if dg.command_number - a.playback_data.throw_at >= hR.delay then
            go:override()
            dg.in_attack = 0
            dg.in_attack2 = 0
        end
    end
    if a.playback_state == cg then
        if hR.jump then
            local kW = bit.band(hI["m_fFlags"], 1) == 1
            if kW then
                playback_state = nil
                hR = nil
                a.restore_disabled()
            else
                local iW = fL:get()
                if
                    iW == "Rage" and bit.band(dg.buttons, 8) ~= 8 and bit.band(dg.buttons, 16) ~= 16 and
                        bit.band(dg.buttons, 512) ~= 512 and
                        bit.band(dg.buttons, 1024) ~= 1024
                 then
                    a.cmd_remove_user_input(dg)
                    dg.move_yaw = hR.recovery_yaw or hR.run_yaw - 180
                    dg.forwardmove = 450
                    dg.in_forward = 1
                    dg.in_jump = hR.recovery_jump and 1 or 0
                end
                if a.ui_restore[gl] then
                    a.ui_restore[gl] = nil
                    utils.execute_after(
                        cvar.sv_airaccelerate:float() > 50 and 0 or 0.05,
                        function()
                            gl:override(true)
                        end
                    )
                end
            end
        elseif hR.recovery_yaw ~= nil then
            local iW = fL:get()
            if
                iW == "Rage" and bit.band(dg.buttons, 8) ~= 8 and bit.band(dg.buttons, 16) ~= 16 and
                    bit.band(dg.buttons, 512) ~= 512 and
                    bit.band(dg.buttons, 1024) ~= 1024
             then
                if a.playback_data.recovery_start_at == nil then
                    a.playback_data.recovery_start_at = dg.command_number
                end
                local kX = math.min(32, hR.run_duration or 16) + 13 + (hR.recovery_jump and 10 or 0)
                if a.playback_data.recovery_start_at + kX >= dg.command_number then
                    dg.move_yaw = hR.recovery_yaw
                    dg.forwardmove = 450
                    dg.in_forward = 1
                    dg.in_jump = hR.recovery_jump and 1 or 0
                end
            else
                hR = nil
                a.restore_disabled()
            end
        end
    end
    if a.playback_state == cf then
        if hR.jump and gl:get() then
            a.ui_restore[gl] = true
            gl:override(false)
        end
        local iW = fL:get()
        local di = bW["m_fThrowTime"]
        if a.is_grenade_being_thrown(bW, dg) then
            a.playback_data.thrown_at = dg.command_number
            if iW == "Legit (Silent)" or iW == "Rage" then
                dg.view_angles = vector(hR.viewangles.pitch, hR.viewangles.yaw, 0)
            end
            utils.execute_after(0.8, a.restore_disabled)
        elseif
            bW["m_fThrowTime"] == 0 and a.playback_data.thrown_at ~= nil and
                a.playback_data.thrown_at > a.playback_data.throw_at
         then
            a.playback_state = cg
            local kU = a.playback_begin
            utils.execute_after(
                0.6,
                function()
                    if a.playback_state == cg and a.playback_begin == kU then
                        hR = nil
                        a.restore_disabled()
                    end
                end
            )
        end
    end
end
function a.cmd_location_playback_movement(dg, hI, bW)
    if a.playback_state == nil then
        a.playback_state = 1
        a.table_clear(a.playback_data)
        a.playback_data.start_at = dg.command_number
        a.playback_data.last_offset_swap = 0
    end
    local kY = hR.weapons[1].type == "grenade"
    local kZ = n[bit.band(bW["m_iItemDefinitionIndex"], 0xFFFF)]
    if bW ~= a.playback_weapon and not (kY and kZ.type == "knife") then
        hR = nil
        a.restore_disabled()
        return
    end
    local bn = dg.command_number - a.playback_data.start_at + 1
    local k_ = hR.movement_commands[bn]
    if k_ == nil then
        hR = nil
        a.restore_disabled()
        return
    end
    if gl:get() then
        a.ui_restore[gl] = true
        gl:override(false)
    end
    if gp:get() then
        a.ui_restore[gp] = true
        gp:override(false)
    end
    if gq:get() then
        a.ui_restore[gq] = true
        gq:override(false)
    end
    if gm:get() then
        a.ui_restore[gm] = true
        gm:override(false)
    end
    gn:set(false)
    local iW = fL:get()
    local l0 = iW == "Rage"
    if aa_enabled then
        iR = hI["m_nWaterLevel"]
        hI["m_nWaterLevel"] = 2
        iQ = hI["m_MoveType"]
        hI["m_MoveType"] = 1
    end
    for aw, ax in pairs(k_) do
        local l1 = true
        if aw == "pitch" or aw == "yaw" then
            l1 = false
        elseif aw == "in_use" and ax == false then
            l1 = false
        elseif aw == "in_attack" or aw == "in_attack2" then
            if kY and kZ.type == "grenade" then
                l1 = true
            elseif ax == false then
                l1 = false
            end
        end
        if l1 then
            dg[aw] = ax
        end
    end
    if iW == "Rage" and (kY or bit.band(dg.buttons, 1) ~= 1 and bit.band(dg.buttons, 2048) ~= 2048) and (not kY or kY and a.playback_data.thrown_at == nil) then
        if dg.command_number - a.playback_data.last_offset_swap > 16 then
            local O, l2 = a.normalize_angles(0, bit.band(dg.buttons, 32) ~= 32 and dg.view_angles.y or dg.view_angles.y - 180)
            a.playback_data.set_pitch = bit.band(dg.buttons, 32) == 32
            local l3, l4 = 90
            for p = -180, 180, 90 do
                local O, l5 = a.normalize_angles(0, k_.yaw + p)
                local l6 = math.abs(l5 - l2)
                if l3 > l6 then
                    l3 = l6
                    l4 = p
                end
            end
            if l4 ~= a.playback_data.last_offset then
                if DEBUG then
                    print_raw("offset switched from ", a.playback_data.last_offset, " to ", l4)
                end
                a.playback_data.last_offset = l4
                a.playback_data.last_offset_swap = dg.command_number
            end
        end
        if a.playback_data.last_offset ~= nil then
            dg.view_angles.y = k_.yaw + a.playback_data.last_offset
            if a.playback_data.set_pitch then
                dg.view_angles.x = 89
            end
        end
    end
    if not l0 then
        render.camera_angles(vector(k_.pitch, k_.yaw))
        if not aa_enabled then
            dg.view_angles.x = k_.pitch
            dg.view_angles.y = k_.yaw
        end
    elseif kY and kZ.type == "grenade" and iW == "Rage" and a.is_grenade_being_thrown(bW, dg) then
        dg.view_angles.x = k_.pitch
        dg.view_angles.y = k_.yaw
        dg.send_packet = false
        a.playback_data.thrown_at = dg.command_number
    end
end
function a.cmd_location_playback(dg, hI, bW)
    if hR.type == "grenade" then
        a.cmd_location_playback_grenade(dg, hI, bW)
        go:override(false)
    elseif hR.type == "movement" then
        a.cmd_location_playback_movement(dg, hI, bW)
        ui.find("Aimbot", "Anti Aim", "Angles", "Body Yaw"):override(false)
        go:override(false)
    end
end
function a.on_run_command(dg)
    if iQ ~= nil or iR ~= nil then
        local hI = entity.get_local_player()
        if iR ~= nil then
            hI["m_nWaterLevel"] = iR
            iR = 0
        end
        if iQ ~= nil then
            hI["m_MoveType"] = iQ
            iQ = nil
        end
    end
end
function a.on_setup_command(dg)
    local hI = entity.get_local_player()
    local iV = gu:get()
    local bW = hI:get_player_weapon()

    if hR ~= nil then
        a.cmd_location_playback(dg, hI, bW)
    elseif hQ ~= nil and iV and hQ.is_in_fov and hQ.is_position_correct then
        local kO = hI["m_vecVelocity"]:length()
        local dh = bW["m_bPinPulled"]
        if hQ.duckamount == 1 or hP.has_only_duck then
            dg.in_duck = 1
        end
        local kY = hQ.weapons[1].type == "grenade"
        local l7 = bit.band(dg.buttons, 1) == 1 or bit.band(dg.buttons, 2048) == 2048
        if
            hQ.type == "movement" and kO < 2 and (not kY or l7) or
                hQ.type == "grenade" and dh and kO < 2 and hQ.duckamount == hI["m_flDuckAmount"]
         then
            hR = hQ
            a.playback_state = nil
            a.playback_weapon = bW
            a.playback_begin = dg.command_number
            a.cmd_location_playback(dg, hI, bW)
        elseif not dh and (bit.band(dg.buttons, 1) == 1 or bit.band(dg.buttons, 2048) == 2048) then
            if hQ.throw_strength == 1 then
                dg.in_attack = 1
                dg.in_attack2 = 0
            elseif hQ.throw_strength == 0.5 then
                dg.in_attack = 1
                dg.in_attack2 = 1
            elseif hQ.throw_strength == 0 then
                dg.in_attack = 0
                dg.in_attack2 = 1
            end
        end
    elseif hP ~= nil and iV then
        local j4 = ay.from_vec(hI:get_origin())
        local l8 = hQ ~= nil and hQ.is_in_fov and hQ.position or hP.position_approach
        local l9 = j4:dist_to(l8)
        local la = j4:dist_to_2d(l8)
        if la < 0.5 and l9 > 0.08 and l9 < 5 or hP.inaccurate_position and l9 < 40 then
            l9 = la
        end
        if (hQ ~= nil and hQ.duckamount == 1 or hP.has_only_duck) and l9 < 10 then
            dg.in_duck = 1
        end
        if bit.band(dg.buttons, 8) ~= 8 and bit.band(dg.buttons, 16) ~= 16 and bit.band(dg.buttons, 512) ~= 512 and bit.band(dg.buttons, 1024) ~= 1024 then
            if l9 < 32 and l9 >= c7 * 0.5 then
                local lb = l8 - j4
                local lc = l8 + lb:normalized() * 10
                local ld = lc - j4
                local cH, cI = ld:angles()
                if cI == nil then
                    return
                end
                gn:set(false)
                dg.move_yaw = cI
                dg.in_speed = 0
                dg.in_moveleft, dg.in_moveright = 0, 0
                dg.sidemove = 0
                if hP.approach_accurate then
                    dg.in_forward, dg.in_back = 1, 0
                    dg.forwardmove = 450
                else
                    if l9 > 14 then
                        dg.forwardmove = 450
                    else
                        local le = math.min(450, math.max(1.1 + hI["m_flDuckAmount"] * 10, l9 * 9))
                        local lf =
                            vector(
                            math.abs(hI["m_vecVelocity[0]"]),
                            math.abs(hI["m_vecVelocity[1]"]),
                            math.abs(hI["m_vecVelocity[2]"])
                        ):length()
                        if lf >= math.min(250, le) + 15 then
                            dg.forwardmove = 0
                            dg.in_forward = 0
                        else
                            dg.forwardmove = math.max(6, lf >= math.min(250, le) and le * 0.9 or le)
                            dg.in_forward = 1
                        end
                    end
                end
            end
        end
    end
    if not iV then
        ui.find("Aimbot", "Anti Aim", "Angles", "Body Yaw"):override()
        go:override()
    end
end
function a.update_basic_ui()
    local gd = gt:get()
    gu:set_visible(gd)
    gy:set_visible(gd)
    fJ:set_visible(gd)
    gv:set_visible(gd)
    fL:set_visible(gd)
    gz:set_visible(gd)
    gA.title:set_visible(gd)
    f1()
    local iW = gd and fL:get()
    gw:set_visible(gd and iW ~= 0)
    gx:set_visible(gd and iW == "Legit")
end
gt:set_callback(a.update_basic_ui)
fL:set_callback(a.update_basic_ui)
a.update_basic_ui()
function a.on_console_input(T)
    if T == "helper" or T:match("^helper .*$") then
        if not gA.title:get() then
            return
        end
        local lg = false
        if T:match("^helper map_pattern%s*") then
            if common.get_map_data()["shortname"] ~= nil then
                print_raw("Raw map name: ", common.get_map_data()["shortname"])
                print_raw("Resolved map name: ", a.get_mapname())
                print_raw("Map pattern: ", a.get_map_pattern())
            else
                bs.error_log("You need to be in-game to use this command")
            end
        elseif T == "helper" or T:match("^helper %s*$") or T:match("^helper help%s*$") or T:match("^helper %?%s*$") then
            print_raw("Helper console command system")
            lg = true
        elseif T:match("^helper source stats%s*") then
            if type(gV) == "table" then
                local hb = gV:get_all_locations()
                local ht = {}
                for fD, lh in pairs(hb) do
                    table.insert(ht, fD)
                end
                table.sort(ht)
                local X = {}
                local Y = {"MAP", "Smoke", "Flash", "Molotov", "HE Grenade", "Movement", "Location", "Area", " TOTAL "}
                local li = {"TOTAL", 0, 0, 0, 0, 0, 0, 0, 0}
                for j = 1, #ht do
                    local a4 = {ht[j], 0, 0, 0, 0, 0, 0, 0, 0}
                    local f3 = hb[ht[j]]
                    for j = 1, #f3 do
                        local fg = f3[j]
                        local bn = 7
                        if fg.type == "grenade" then
                            for j = 1, #fg.weapons do
                                local bW = fg.weapons[j]
                                if bW.console_name == "weapon_smokegrenade" then
                                    bn = 2
                                elseif bW.console_name == "weapon_flashbang" then
                                    bn = 3
                                elseif bW.console_name == "weapon_molotov" then
                                    bn = 4
                                elseif bW.console_name == "weapon_hegrenade" then
                                    bn = 5
                                end
                            end
                        elseif fg.type == "movement" then
                            bn = 6
                        elseif fg.type == "location" then
                            bn = 7
                        elseif fg.type == "area" then
                            bn = 8
                        end
                        a4[bn] = a4[bn] + 1
                        li[bn] = li[bn] + 1
                        a4[9] = a4[9] + 1
                        li[9] = li[9] + 1
                    end
                    table.insert(X, a4)
                end
                table.insert(X, {})
                table.insert(X, li)
                for j = #li, 2, -1 do
                    if li[j] == 0 then
                        table.remove(Y, j)
                        for k = 1, #X do
                            table.remove(X[k], j)
                        end
                    end
                end
                local lj = D(X, Y, {style = "Unicode"})
                print_raw(
                    "Statistics for ",
                    gV.name,
                    gV.description ~= nil and string.format(" - %s", gV.description) or "",
                    ": \n",
                    lj,
                    "\n"
                )
            else
                bs.error_log("No source selected")
            end
        elseif T:match("^helper source export_repo%s*") then
            if type(gV) == "table" then
                if gV.type == "local" then
                    bs.error_log("Not yet implemented")
                else
                    bs.error_log("You can only export a local source")
                end
            else
                bs.error_log("No source selected")
            end
        elseif T:match("^helper source%s*$") then
            if type(gV) == "table" then
                print_raw("Selected source: ", gV.name, " (", gV.type, ")")
                print_raw("Description: ", tostring(gV.description))
                print_raw(
                    "Last updated: ",
                    gV.update_timestamp and
                        string.format(
                            "%s (unix ts: %s)",
                            a.format_unix_timestamp(gV.update_timestamp, false, false, 1),
                            gV.update_timestamp
                        ) or
                        "Not set"
                )
            else
                bs.error_log("No source selected")
            end
        else
            bs.error_log("Unknown helper command: " .. T:gsub("^helper ", ""))
            lg = true
        end
        if lg then
            local lk = {
                {"help", "Displays this help info"},
                {"map_pattern", "Displays map pattern debug info"},
                {"source", "Displays information about the current source"},
                {"source stats", "Displays statistics for the currently selected source"},
                {"source export_repo", "Exports a local source into a repository file structure"}
            }
            local T = "\tKnown commands:"
            for j = 1, #lk do
                local k_, ll = unpack(lk[j])
                T = T .. string.format("\n\thelper %s - %s", k_, ll)
            end
            print_raw(T)
        end
        return true
    end
end
events.console_input:set(a.on_console_input)
events.level_init:set(
    function()
        gV = nil
        gU = false
        gK = nil
        a.table_clear(gX)
        a.table_clear(gY)
        f1()
        a.flush_active_locations()
    end
)
events.switch_team:set(
    function(f)
        gV = nil
        gU = false
        gK = nil
        a.table_clear(gX)
        a.table_clear(gY)
        f1()
        a.flush_active_locations()
    end
)
events.round_end:set(
    function(f)
        hR = nil
    end
)
events.shutdown:set(
    function()
        for j = 1, #av.sources do
            if av.sources[j].cleanup ~= nil then
                av.sources[j]:cleanup()
            end
        end
        a.restore_disabled()
        cm:start("db_write")
        au.write("helper_db", av)
        cm:finish("db_write")
    end
)
events.render:set(a.on_paint)
events.createmove:set(a.on_setup_command)
events.createmove:set(a.on_run_command)
