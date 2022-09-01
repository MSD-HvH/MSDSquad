---https://yougame.biz/threads/266379/
---@diagnostic disable: undefined-global, cast-local-type
local test_array = {}
_DEBUG = true
ffi.cdef[[
    typedef struct {
        uint8_t r;
        uint8_t g;
        uint8_t b;
        uint8_t a;
    } color_struct_t;

    typedef void (__cdecl* console_color_print)(void*,const color_struct_t&, const char*, ...);
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
local ya_typoy = "discord.gg/chernobylnl" -- убрать, если не хотите рекламу справа сверху
--- @region: libs
local function a(b,c,type)return ffi.cast(type,ffi.cast("void***",b)[0][c])end;local function d(c,e)local f=ffi.typeof(e)return function(b,...)assert(b~=nil)if b then return a(b,c,f)(b,...)end end end;local g={"console_name","primary_clip_size","secondary_clip_size","primary_default_clip_size","secondary_default_clip_size","primary_reserve_ammo_max","secondary_reserve_ammo_max","model_world","model_player","model_dropped","sound_empty","sound_single_shot","sound_single_shot_accurate","sound_burst","sound_reload","sound_special1","sound_special2","sound_special3","sound_nearlyempty","primary_ammo","secondary_ammo","item_name","item_class","itemflag_exhaustible","model_right_handed","is_melee_weapon","weapon_weight","item_gear_slot_position","weapon_type_int","in_game_price","kill_award","player_animation_extension","cycletime","cycletime_alt","time_to_idle","idle_interval","is_full_auto","damage","headshot_multiplier","armor_ratio","bullets","penetration","flinch_velocity_modifier_large","flinch_velocity_modifier_small","range","range_modifier","throw_velocity","has_silencer","crosshair_min_distance","crosshair_delta_distance","max_player_speed","max_player_speed_alt","attack_movespeed_factor","spread","spread_alt","inaccuracy_crouch","inaccuracy_crouch_alt","inaccuracy_stand","inaccuracy_stand_alt","inaccuracy_jump_initial","inaccuracy_jump_apex","inaccuracy_jump","inaccuracy_jump_alt","inaccuracy_land","inaccuracy_land_alt","inaccuracy_ladder","inaccuracy_ladder_alt","inaccuracy_fire","inaccuracy_fire_alt","inaccuracy_move","inaccuracy_move_alt","inaccuracy_reload","recoil_seed","recoil_angle","recoil_angle_alt","recoil_angle_variance","recoil_angle_variance_alt","recoil_magnitude","recoil_magnitude_alt","recoil_magnitude_variance","recoil_magnitude_variance_alt","spread_seed","recovery_time_crouch","recovery_time_stand","recovery_time_crouch_final","recovery_time_stand_final","recovery_transition_start_bullet","recovery_transition_end_bullet","unzoom_after_shot","hide_view_model_zoomed","zoom_levels","zoom_fov_1","zoom_fov_2","zoom_time_0","zoom_time_1","zoom_time_2","addon_location","addon_scale","eject_brass_effect","tracer_effect","tracer_frequency","tracer_frequency_alt","muzzle_flash_effect_1st_person","muzzle_flash_effect_1st_person_alt","muzzle_flash_effect_3rd_person","muzzle_flash_effect_3rd_person_alt","heat_effect","heat_per_shot","zoom_in_sound","zoom_out_sound","inaccuracy_alt_sound_threshold","bot_audible_range","has_burst_mode","is_revolver"}local h={[0]="knife",[1]="pistol",[2]="smg",[3]="rifle",[4]="shotgun",[5]="sniperrifle",[6]="machinegun",[7]="c4",[9]="grenade",[11]="stackableitem",[12]="fists",[13]="breachcharge",[14]="bumpmine",[15]="tablet",[16]="melee",[19]="equipment"}local i=ffi.typeof("char*")local j=utils.opcode_scan("client.dll","8B 35 ? ? ? ? FF 10 0F B7 C0")or error("IWeaponSystem signature invalid")local k=ffi.cast("void****",ffi.cast("char*",j)+0x2)[0]local l=d(2,"ccs_weapon_info_t*(__thiscall*)(void*, unsigned int)")or error("invalid GetCSWeaponInfo index")local weapons,n={},{}for o=1,600 do local p=l(k,o)if p~=nil then local q={}for r=1,#g do local s=g[r]local t=p[s]local u,v=pcall(ffi.typeof,t)q[s]=u and v==i and ffi.string(t)or t end;q.idx=o;q.type=o==31 and"taser"or h[p.weapon_type_int]q.raw=p;weapons[o]=q;n[q.console_name]=q end end;local function w(x,y)if x~=weapons or type(y)~="number"or y<0 or y>8191 then return end;local o=bit.band(y:GetProp("m_iItemDefinitionIndex"),0xFFFF)return weapons[o]end;setmetatable(weapons,{__index=n,__metatable=false,__call=w})
local easing = {} function easing.expo_in(t, b, c, d) if t == 0 then return b else return c * math.pow(2, 10 * (t / d - 1)) + b - c * 0.001 end end function easing.quad_in_out(t, b, c, d) t = t / d * 2 if t < 1 then return c / 2 * math.pow(t, 2) + b else return -c / 2 * ((t - 1) * (t - 3) - 1) + b end end function easing.sine_in_out(t, b, c, d)     return -c / 2 * (math.cos(math.pi * t / d) - 1) + b end function easing.quart_out(t, b, c, d) t = t / d - 1 return -c * (math.pow(t, 4) - 1) + b end function easing.sine_out(t, b, c, d) return c * math.sin(t / d * (math.pi / 2)) + b end function easing.cubic_in(t, b, c, d) t = t / d return c * math.pow(t, 3) + b end
local http_lib = require("neverlose/http_lib")

local http = http_lib.new({
    task_interval = 0.3, -- polling intervals
    enable_debug = true, -- print http request s to the console
    timeout = 10 -- request expiration time
})

local table_gen = {}

local table_insert, table_concat, string_rep, string_len, string_sub = table.insert, table.concat, string.rep, string.len, string.sub
local math_max, math_floor, math_ceil = math.max, math.floor, math.ceil

local function len(str)
    local _, count = string.gsub(tostring(str), "[^\128-\193]", "")
    return count
end

local styles = {
    --                     1    2     3    4    5     6    7    8     9    10   11
    ["ASCII"] = {"-", "|", "+"},
    ["Compact"] = {"-", " ", " ", " ", " ", " ", " ", " "},
    ["ASCII (Girder)"] = {"=", "||",  "//", "[]", "\\\\",  "|]", "[]", "[|",  "\\\\", "[]", "//"},
    ["Unicode"] = {"═", "║",  "╔", "╦", "╗",  "╠", "╬", "╣",  "╚", "╩", "╝"},
    ["Unicode (Single Line)"] = {"─", "│",  "┌", "┬", "┐",  "├", "┼", "┤",  "└", "┴", "┘"},
    ["table_genarkdown (Github)"] = {"-", "|", "|"}
}

--initialize missing style values (ascii etc)
for _, style in pairs(styles) do
    if #style == 3 then
        for j=4, 11 do
            style[j] = style[3]
        end
    end
end

local function justify_center(text, width)
    text = string_sub(text, 1, width)
    local length = len(text)
    return string_rep(" ", math_floor(width/2-length/2)) .. text .. string_rep(" ", math_ceil(width/2-length/2))
end

local function justify_left(text, width)
    text = string_sub(text, 1, width)
    return text .. string_rep(" ", width-len(text))
end

function table_gen.generate_table(rows, headings, options)
    if type(options) == "string" or options == nil then
        options = {
            style=options or "ASCII",
        }
    end

    if options.top_line == nil then
        options.top_line = options.style ~= "table_genarkdown (Github)"
    end

    if options.bottom_line == nil then
        options.bottom_line = options.style ~= "table_genarkdown (Github)"
    end

    if options.header_seperator_line == nil then
        options.header_seperator_line = true
    end

    local seperators = styles[options.style] or styles["ASCII"]

    local rows_out, columns_width, columns_count = {}, {}, 0
    local has_headings = headings ~= nil and #headings > 0

    if has_headings then
        for i=1, #headings do
            columns_width[i] = len(headings[i])+2
        end
        columns_count = #headings
    else
        for i=1, #rows do
            columns_count = math_max(columns_count, #rows[i])
        end
    end

    for i=1, #rows do
        local row = rows[i]
        for c=1, columns_count do
            columns_width[c] = math_max(columns_width[c] or 2, len(row[c])+2)
        end
    end

    local column_seperator_rows = {}
    for i=1, columns_count do
        table_insert(column_seperator_rows, string_rep(seperators[1], columns_width[i]))
    end
    if options.top_line then
        table_insert(rows_out, seperators[3] .. table_concat(column_seperator_rows, seperators[4]) .. seperators[5])
    end

    if has_headings then
        local headings_justified = {}
        for i=1, columns_count do
            headings_justified[i] = justify_center(headings[i], columns_width[i])
        end
        table_insert(rows_out, seperators[2] .. table_concat(headings_justified, seperators[2]) .. seperators[2])
        if options.header_seperator_line then
            table_insert(rows_out, seperators[6] .. table_concat(column_seperator_rows, seperators[7]) .. seperators[8])
        end
    end

    for i=1, #rows do
        local row, row_out = rows[i], {}
        if #row == 0 then
            table_insert(rows_out, seperators[6] .. table_concat(column_seperator_rows, seperators[7]) .. seperators[8])
        else
            for j=1, columns_count do
                local justified = options.value_justify == "center" and justify_center(row[j] or "", columns_width[j]-2) or justify_left(row[j] or "", columns_width[j]-2)
                row_out[j] = " " .. justified .. " "
            end
            table_insert(rows_out, seperators[2] .. table_concat(row_out, seperators[2]) .. seperators[2])
        end
    end

    if options.bottom_line and seperators[9] then
        table_insert(rows_out, seperators[9] .. table_concat(column_seperator_rows, seperators[10]) .. seperators[11])
    end

    return table_concat(rows_out, "\n")
end

setmetatable(table_gen, {
    __call = function(_, ...)
        return table_gen.generate_table(...)
    end
})


local game_dir = string.sub(common.get_game_directory(), 0 , -5)
local encode local escape_char_map = {   [ "\\" ] = "\\",   [ "\"" ] = "\"",   [ "\b" ] = "b",   [ "\f" ] = "f",   [ "\n" ] = "n",   [ "\r" ] = "r",   [ "\t" ] = "t", } local escape_char_map_inv = { [ "/" ] = "/" } for k, v in pairs(escape_char_map) do escape_char_map_inv[v] = k end local function escape_char(c) return "\\" .. (escape_char_map[c] or string.format("u%04x", c:byte())) end local function encode_nil(val) return "null" end local function encode_table(val, stack) local res = {} stack = stack or {} if stack[val] then error("circular reference") end stack[val] = true if rawget(val, 1) ~= nil or next(val) == nil then local n = 0 for k in pairs(val) do if type(k) ~= "number" then error("invalid table: mixed or invalid key types") end n = n + 1 end if n ~= #val then error("invalid table: sparse array") end for i, v in ipairs(val) do table.insert(res, encode(v, stack)) end stack[val] = nil return "[" .. table.concat(res, ",") .. "]" else for k, v in pairs(val) do if type(k) ~= "string" then error("invalid table: mixed or invalid key types") end table.insert(res, encode(k, stack) .. ":" .. encode(v, stack)) end stack[val] = nil return "{" .. table.concat(res, ",") .. "}" end end local function encode_string(val) return '"' .. val:gsub('[%z\1-\31\\"]', escape_char) .. '"' end local function encode_number(val) if val ~= val or val <= -math.huge or val >= math.huge then error("unexpected number value '" .. tostring(val) .. "'") end return string.format("%.14g", val) end local type_func_map = { [ "nil"     ] = encode_nil, [ "table"   ] = encode_table, [ "string"  ] = encode_string, [ "number"  ] = encode_number, [ "boolean" ] = tostring, } encode = function(val, stack) local t = type(val) local f = type_func_map[t] if f then return f(val, stack) end error("unexpected type '" .. t .. "'") end function json.encode(val) return( encode(val) ) end
local database = {} local db = json.parse(files.read(game_dir.."/database.json") or "[]") or {} function database.read(key) return db[key] end function database.write(key, value) db[key] = value files.write(game_dir.."/database.json", json.encode(db)) end function database.flush() for key in pairs(db) do db[key] = nil end end
local vectorlib={}local b={__index=vectorlib}function vectorlib.new(c,d,e)return setmetatable({x=c~=nil and c or 0,y=d~=nil and d or 0,z=e~=nil and e or 0},b)end;function vectorlib:offset(f,g,h)f=f or 0;g=g or 0;h=h or 0;self.x=self.x+f;self.y=self.y+g;self.z=self.z+h end;function vectorlib:unpack()return self.x,self.y,self.z end;function vectorlib:nullify()self.x=0;self.y=0;self.z=0 end;function b.__tostring(i)return string.format("%s, %s, %s",i.x,i.y,i.z)end;function b.__concat(i)return string.format("%s, %s, %s",i.x,i.y,i.z)end;function b.__eq(i,j)return i.x==j.x and i.y==j.y and i.z==j.z end;function b.__lt(i,j)if type(i)=="number"then return i<j.x or i<j.y or i<j.z end;if type(j)=="number"then return i.x<j or i.y<j or i.z<j end;return i.x<j.x or i.y<j.y or i.z<j.z end;function b.__le(i,j)if type(i)=="number"then return i<=j.x or i<=j.y or i<=j.z end;if type(j)=="number"then return i.x<=j or i.y<=j or i.z<=j end;return i.x<=j.x or i.y<=j.y or i.z<=j.z end;function b.__add(i,j)if type(i)=="number"then return vectorlib.new(i+j.x,i+j.y,i+j.z)end;if type(j)=="number"then return vectorlib.new(i.x+j,i.y+j,i.z+j)end;return vectorlib.new(i.x+j.x,i.y+j.y,i.z+j.z)end;function b.__sub(i,j)if type(i)=="number"then return vectorlib.new(i-j.x,i-j.y,i-j.z)end;if type(j)=="number"then return vectorlib.new(i.x-j,i.y-j,i.z-j)end;return vectorlib.new(i.x-j.x,i.y-j.y,i.z-j.z)end;function b.__mul(i,j)if type(i)=="number"then return vectorlib.new(i*j.x,i*j.y,i*j.z)end;if type(j)=="number"then return vectorlib.new(i.x*j,i.y*j,i.z*j)end;return vectorlib.new(i.x*j.x,i.y*j.y,i.z*j.z)end;function b.__div(i,j)if type(i)=="number"then return vectorlib.new(i/j.x,i/j.y,i/j.z)end;if type(j)=="number"then return vectorlib.new(i.x/j,i.y/j,i.z/j)end;return vectorlib.new(i.x/j.x,i.y/j.y,i.z/j.z)end;function b.__pow(i,j)if type(i)=="number"then return vectorlib.new(math.pow(i,j.x),math.pow(i,j.y),math.pow(i,j.z))end;if type(j)=="number"then return vectorlib.new(math.pow(i.x,j),math.pow(i.y,j),math.pow(i.z,j))end;return vectorlib.new(math.pow(i.x,j.x),math.pow(i.y,j.y),math.pow(i.z,j.z))end;function b.__mod(i,j)if type(i)=="number"then return vectorlib.new(i%j.x,i%j.y,i%j.z)end;if type(j)=="number"then return vectorlib.new(i.x%j,i.y%j,i.z%j)end;return vectorlib.new(i.x%j.x,i.y%j.y,i.z%j.z)end;function b.__unm(i)return vectorlib.new(-i.x,-i.y,-i.z)end;function vectorlib:length2_squared()return self.x*self.x+self.y*self.y end;function vectorlib:length2()return math.sqrt(self:length2_squared())end;function vectorlib:length_squared()return self.x*self.x+self.y*self.y+self.z*self.z end;function vectorlib:length()return math.sqrt(self:length_squared())end;function vectorlib:dot_product(k)return self.x*k.x+self.y*k.y+self.z*k.z end;function vectorlib:cross_product(k)return vectorlib.new(self.y*k.z-self.z*k.y,self.z*k.x-self.x*k.z,self.x*k.y-self.y*k.x)end;function vectorlib:dist_to_2d(k)return(k-self):length2()end;function vectorlib:dist_to(k)return(k-self):length()end;function vectorlib:dist_to_2d_sqr(k)return(k-self):length2_squared()end;function vectorlib:dist_to_sqr(k)return(k-self):length_squared()end;function vectorlib:lerp(l,m)return self+(l-self)*m end;function vectorlib:angles()local n,o,p=0,0,0;if self.y==0 and self.x==0 then p=0;if self.z>0 then o=270 else o=90 end else p=math.atan2(self.y,self.x)*180/math.pi;if p<0 then p=p+360 end;n=math.sqrt(self.x*self.x+self.y*self.y)o=math.atan2(-self.z,n)*180/math.pi;if o<0 then o=o+360 end end;return o,p end;function vectorlib:init_from_angles(o,p)local q=function(r)return r*math.pi/180 end;local s=math.sin(q(o))local t=math.cos(q(o))local u=math.sin(q(p))local v=math.cos(q(p))return vectorlib.new(t*v,t*u,-s)end;function vectorlib:normalized()local w=self:length()if w~=0 then return vectorlib.new(self.x/w,self.y/w,self.z/w)else return vectorlib.new(0,0,1)end end;function vectorlib:to_vec()return vec3_t(self:unpack())end;function vectorlib.from_vec(x)return vectorlib.new(x.x,x.y,x.z)end
local pretty_json={}local b,unpack,tostring=print,unpack,tostring;local c,d,e=table.concat,table.insert,table.remove;local f,g,h=string.sub,string.rep,string.len;local i,j,k,l={221,221,221},{180,230,30},{96,160,220},{218,230,30}local function m(n,o,p,q)o=o+#n:match('^%s*',o)if n:sub(o,o)~=p then if q then error('Expected '..p..' near position '..o)end;return o,false end;return o+1,true end;local function r(n,o,s)s=s or''local t='End of input found while parsing string.'if o>#n then error(t)end;local u=n:sub(o,o)if u=='"'then return s,o+1 end;if u~='\\'then return r(n,o+1,s..u)end;local v={b='\b',f='\f',n='\n',r='\r',t='\t'}local w=n:sub(o+1,o+1)if not w then error(t)end;return r(n,o+2,s..(v[w]or w))end;local function x(n,o)local y=n:match('^-?%d+%.?%d*[eE]?[+-]?%d*',o)local s=tonumber(y)if not s then error('Error parsing number at position '..o..'.')end;return s,o+#y end;function pretty_json.format(z,A,B,C)z=tostring(z)A,B,C=tostring(A or"\n"),tostring(B or"\t"),tostring(C or" ")local D,E,F,G,H,I,J=1,0,0,h(z),{},nil,nil;local K=f(C,-1)=="\n"for L=1,G do local u=f(z,L,L)if not J and(u=="{"or u=="[")then H[D]=I==":"and u..A or g(B,E)..u..A;E=E+1 elseif not J and(u=="}"or u=="]")then E=E-1;if I=="{"or I=="["then D=D-1;H[D]=g(B,E)..I..u else H[D]=A..g(B,E)..u end elseif not J and u==","then H[D]=u..A;F=-1 elseif not J and u==":"then H[D]=u..C;if K then D=D+1;H[D]=g(B,E)end else if u=='"'and I~="\\"then J=not J and true or nil end;if E~=F then H[D]=g(B,E)D,F=D+1,E end;H[D]=u end;I,D=u,D+1 end;return c(H)end;function pretty_json.highlight(z,M,N,O,P)M,O,P,N=M or i,O or j,P or k,N or l;z=tostring(z)local D,G,Q,R,S=1,h(z),{},nil,nil;local T,U=M,{}for L=1,G do local u=f(z,L,L)local V;if not S and(u=="{"or u=="[")then V=M;d(U,u)elseif not S and(u=="}"or u=="]")then V=M;if R=="{"or R=="["then d(U,c(R,u))else d(U,u)end elseif not S and(u==","or u==":")then V=M;d(U,u)else if u=='"'and R~="\\"then S=not S and true or nil;V=N elseif T==N then V=S and O or P elseif T==M and(u~=" "and u~="\n"and u~="\t")then V=S and O or P end;d(U,u)end;if V~=nil and V~=T then local W={e(U,#U)}d(Q,{T[1],T[2],T[3],c(U)})T,U=V,W end;R=u end;if#U>0 then d(Q,{T[1],T[2],T[3],c(U)})end;return Q end;local X=pretty_json.highlight;function pretty_json.print_highlighted(z,M,N,O,P)local Y=X(z,M,O,P,N)local Z=#Y;for D=1,Z do local H,_,a0,n=unpack(Y[D])if D~=Z then b(n..'\0')else b(n)end end;return Y end;function pretty_json.stringify(a1,A,B,C)local a2,z=pcall(json.encode,a1)if not a2 then error(z,2)return end;return pretty_json.format(z,A,B,C)end;function pretty_json.parse(n,o,a3)o=o or 1;if o>#n then error('Reached unexpected end of input.')end;local o=o+#n:match('^%s*',o)local a4=n:sub(o,o)if a4=='{'then local a5,a6,a7={},true,true;o=o+1;while true do a6,o=pretty_json.parse(n,o,'}')if a6==nil then return a5,o end;if not a7 then error('Comma missing between object items.')end;o=m(n,o,':',true)a5[a6],o=pretty_json.parse(n,o)o,a7=m(n,o,',')end elseif a4=='['then local a8,s,a7={},true,true;o=o+1;while true do s,o=pretty_json.parse(n,o,']')if s==nil then return a8,o end;if not a7 then error('Comma missing between array items.')end;a8[#a8+1]=s;o,a7=m(n,o,',')end elseif a4=='"'then return r(n,o+1)elseif a4=='-'or a4:match('%d')then return x(n,o)elseif a4==a3 then return nil,o+1 else local a9={['true']=true,['false']=false,['null']=json.null}for aa,ab in pairs(a9)do local ac=o+#aa-1;if n:sub(o,ac)==aa then return ab,ac+1 end end;local ad='position '..o..': '..n:sub(o,o+10)error('Invalid json syntax starting at '..ad)end end;
--- @endregion
local default_locations = '{"cs_agency":[{"name":["Unnamed","Table"],"weapon":"weapon_molotov","position":[-1073.0045166016,-328.01284790039,512.03125],"viewangles":[-11.550261497498,62.745376586914],"grenade":{"run":2}}]}'
if not files.read(game_dir.."/helper_data.json") then
    files.write(game_dir.."/helper_data.json", default_locations)
end

if not files.read(game_dir.."/database.json") then
    files.write(game_dir.."/database.json", "{}")
end

function test_array.vtable_entry(instance, index, type)
    return ffi.cast(type, (ffi.cast("void***", instance)[0])[index])
end

function test_array.vtable_bind(module, interface, index, typestring)
    local instance = utils.create_interface(module, interface) or error("invalid interface")
    local fnptr = test_array.vtable_entry(instance, index, ffi.typeof(typestring)) or error("invalid vtable")
    return function(...)
        return fnptr(tonumber(ffi.cast("void***", instance)), ...)
    end
end

local client = {}
function client.error_log(text)
    utils.console_exec("play resource/warning.wav")
    return print(text)--ffi_handler.color_print(color(255, 35, 35), text..'\n')
end

function test_array.table_clear(tbl)
    for key in pairs(tbl) do
        tbl[key] = nil
    end
end

function test_array.table_map(tbl, callback)
    local new = {}

    for key, value in pairs(tbl) do
        new[key] = callback(value)
    end

    return new
end

function test_array.table_map_assoc(tbl, callback)
    local new = {}

    for key, value in pairs(tbl) do
        local new_key, new_value = callback(key, value)

        new[new_key] = new_value
    end

    return new
end

local fonts = {
    verdana_bold = render.load_font("verdana", 12, 'ba')
}

local Paint = {}
Paint.RectFilled = function(xy, wh, clr)
    return render.rect(vector(xy.x, xy.y), vector(xy.x+wh.x, xy.y+wh.y), clr)
end

Paint.Rect = function(xy, wh, clr)
    return render.rect_outline(vector(xy.x, xy.y), vector(xy.x+wh.x, xy.y+wh.y), clr)
end

Paint.Text = function(font, str, vec, clr, font_size)
    font_size = font_size or 12
    render.text(font, vector(vec.x, vec.y), clr, 'd', str)
end

Paint.CircleFilled = function(xy, rad, clr)
    return render.circle(vector(math.floor(xy.x), math.floor(xy.y)), clr, rad, 0, 1)
end

Paint.Circle = function(xy, rad, clr)
    return render.circle_outline(vector(math.floor(xy.x), math.floor(xy.y)), clr, rad, 0, 1)
end

local SOURCE_TYPE_NAMES = {
    ["remote"] = "Remote",
    ["local"] = "Local",
    ["local_file"] = "Local file"
}

local LOCATION_TYPE_NAMES = {
    grenade = "Grenade",
    wallbang = "Wallbang",
    movement = "Movement"
}

local YAW_DIRECTION_OFFSETS = {
    ['Forward'] = 0,
    ['Back'] = 180,
    ['Left'] = 90,
    ['Right'] = -90
}
local YAW_DIRECTION_OFFSETS_RECOVERY = {
    ['Forward'] = 0,
    ['Back'] = 180,
    ['Left'] = 90,
    ['Right'] = -90
}

local MOVEMENT_BUTTONS_CHARS = {
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

local GRENADE_WEAPON_NAMES = setmetatable({
    [weapons.weapon_smokegrenade] = "Smoke",
    [weapons.weapon_flashbang] = "Flashbang",
    [weapons.weapon_hegrenade] = "HE",
    [weapons.weapon_molotov] = "Molotov",
    [weapons.weapon_incgrenade] = "Molotov",
}, {
    __index = function(tbl, key)
        if type(key) == "table" and key.name ~= nil then
            tbl[key] = key.name
            return tbl[key]
        end
    end
})

local GRENADE_WEAPON_NAMES_UI = setmetatable({
    [weapons.weapon_smokegrenade] = "Smoke",
    [weapons.weapon_flashbang] = "Flashbang",
    [weapons.weapon_hegrenade] = "High Explosive",
    [weapons.weapon_molotov] = "Molotov",
    [weapons.weapon_incgrenade] = "Molotov",
}, {
    __index = GRENADE_WEAPON_NAMES
})

local CUSTOM_ICONS = {}
CUSTOM_ICONS.vectors = {}

CUSTOM_ICONS.weapon_flashbang = '\x89\x50\x4E\x47\x0D\x0A\x1A\x0A\x00\x00\x00\x0D\x49\x48\x44\x52\x00\x00\x00\x50\x00\x00\x00\x64\x08\x06\x00\x00\x00\x11\xFA\xB7\x16\x00\x00\x00\x04\x73\x42\x49\x54\x08\x08\x08\x08\x7C\x08\x64\x88\x00\x00\x00\x09\x70\x48\x59\x73\x00\x00\x2E\x23\x00\x00\x2E\x23\x01\x78\xA5\x3F\x76\x00\x00\x00\x19\x74\x45\x58\x74\x53\x6F\x66\x74\x77\x61\x72\x65\x00\x77\x77\x77\x2E\x69\x6E\x6B\x73\x63\x61\x70\x65\x2E\x6F\x72\x67\x9B\xEE\x3C\x1A\x00\x00\x09\x11\x49\x44\x41\x54\x78\x9C\xED\x9D\x5B\x6C\x1D\x47\x19\xC7\x7F\x9F\x63\xA7\x49\x6D\x27\xB5\x73\x69\x13\xA7\x49\x7A\x8B\x43\x52\x25\x81\xA2\x42\x2F\x20\x24\xD4\xC2\x43\x1F\xCA\x45\x15\x14\x09\xA4\x4A\x40\x41\xBC\x20\x04\x42\x80\x04\x4F\x08\x09\x24\x9E\x10\x42\xCA\x13\x48\xF0\x80\x10\x15\x54\xE2\xAD\xA5\x11\x0A\x15\x05\x52\xA7\x6D\x20\xA4\x38\x4D\xDB\xC4\xB4\x4E\xEA\xE6\x62\x3B\xC1\x4E\xFE\x3C\xCC\x9C\x70\x72\x7C\xCE\x9E\xDD\x99\x39\xBB\xC7\xAE\x7F\xD2\xCA\xD6\x7A\x77\x66\xF6\xBF\x73\xFD\xBE\x6F\xD6\xB0\xCC\xE2\x46\xD2\x8D\x55\x97\x21\x86\x9E\x2A\x33\x97\xD4\x07\xBC\x57\xD2\x9A\x2A\xCB\x11\x43\xA5\x02\x02\xEB\x7C\x19\xDE\x23\x69\x45\xC5\x65\x09\xA2\x1B\x04\x04\x18\x04\x76\x55\x59\x90\x50\xAA\x16\x70\xB8\xEE\xF7\xED\x92\x6E\xAA\xAC\x24\x81\x54\x26\xA0\xA4\x5E\x60\x6D\xC3\xE9\x7D\x92\x56\x57\x51\x9E\x50\xAA\xAC\x81\x43\x80\x35\x9C\xEB\x03\xDE\x2D\xA9\xF1\x7C\xD7\x52\xA5\x80\xEB\x32\xCE\xDF\xDA\xC9\x8C\x25\xAD\x97\x74\x47\x8A\xB4\x7A\x53\x24\x12\x48\x2B\x01\x01\x76\x4A\x3A\x63\x66\x6F\xA7\xCC\x50\xD2\x30\x30\x0A\xAC\x07\x8E\xA7\x48\xB3\x12\x01\x25\xF5\x00\x37\x64\x5C\x52\x9B\xDA\x1C\x30\xB3\xF9\x04\xF9\x6D\xC0\x09\x37\x54\x77\xFA\x42\x6C\xBA\x50\x5D\x0D\x1C\xA2\x7D\xF7\xD1\x0F\xEC\x06\xC6\x42\x33\xF1\xAB\x9C\x1D\x34\x7F\x59\x8B\x5A\xC0\xE1\xF6\x97\x00\xB0\x55\xD2\xA4\x99\x9D\xCA\x9B\xB0\x1F\x80\x36\xE2\x6A\x5C\xE3\x28\x5F\xCF\x74\xDE\x34\xB3\xA8\x4A\xC0\xAC\xFE\xAF\x91\x3D\x92\xA6\xCC\x6C\x36\xEB\x22\x2F\xDC\x26\x9C\x70\x03\x6D\xD2\xBC\xDC\x2E\xBD\xBC\x94\x2E\xA0\x7F\xD0\xA1\xB6\x17\xFE\x9F\x3E\x5C\x7F\x78\xD0\xCC\xD4\x24\xBD\x1E\x60\x33\xAE\xA9\xF6\xE7\x4C\x33\x49\xED\x83\x16\x02\xFA\xC5\xFD\x65\x60\xD6\xCC\xAE\xA4\xCA\xCC\xB3\xB6\x55\xBE\x19\x0C\x03\xB7\x03\xC7\x6A\x27\xBC\x70\x37\xFB\xF3\xD7\x17\x4C\x2F\x49\xFF\x07\xAD\x1F\x64\x25\x70\x0F\x80\xA4\x39\xE0\xBC\x3F\x66\xFC\x31\x0D\xCC\x98\xD9\x5C\x40\x9E\x45\x9A\x6F\x3D\xA3\x92\x4E\x03\x67\x71\xC2\xED\x00\x56\x05\xA6\xD5\x59\x01\xCD\xEC\xB4\xA4\x57\x81\xAD\xB8\x26\x34\x4C\x93\x8E\x5F\xD2\x25\xEA\x04\xAD\xFF\x69\x66\x97\x5A\xE4\x99\x77\x00\x59\x50\x2C\xE0\x2E\xFF\x33\x54\xB8\x1A\x1D\xAF\x81\x00\x47\x80\x0D\x40\xD6\xDA\xF4\x3A\x7F\x2C\xE8\xD3\x24\xCD\x73\x6D\x8D\xAD\x89\x1B\x2A\x20\x6D\xCA\x52\x84\xCE\xF6\x81\x00\x66\x36\x27\x69\x0C\x78\x7F\x44\xDA\x6B\xFC\xD1\x6D\x24\xAB\x81\x99\x93\x59\x33\x9B\x04\x5E\x4D\x95\x59\x97\x70\x31\xC5\xEA\xA6\x46\x9E\xD1\xF0\x08\x6E\x62\x1A\xDB\xEF\x34\xE6\xFB\x2E\xDC\x0A\x21\x64\x2A\xF5\x1A\xF0\x72\x60\xDE\xC9\x9A\x2F\xE4\x28\x7C\x5D\x53\x7E\x5F\xA2\x3C\x57\x01\x3F\x20\xCE\xE2\x32\x05\x3C\x0E\x84\x4C\x86\x93\x35\x5F\xC8\x69\xCE\x32\xB3\x37\x71\x6F\x3D\x05\xBB\x88\x37\x57\x0D\x01\x9F\x0E\xBC\xB7\x7C\x01\x3D\x2F\x01\x17\x13\xE4\xF9\xDF\x04\x69\x00\x3C\x8C\x9B\x0B\x16\x65\xBD\xA4\xED\xDE\x26\x18\xDD\x2D\x15\xB2\xFC\x4A\xDA\x48\x7C\x53\x5E\x09\x7C\x9F\xB0\x87\x6F\xE4\x15\xE0\x6B\x40\xC8\x84\xBE\xC6\x3C\xAE\x5F\xBC\xE0\x8F\xAB\xBF\x9B\xD9\xE5\x76\x37\x17\x36\x9D\x4B\xDA\x87\x5B\x09\xC4\xD0\x03\xDC\x0B\x3C\x44\xBC\x37\x6E\x3F\xF0\xBB\xC8\x34\x5A\x31\xCB\xB5\xE2\xD6\x04\x9E\xAD\xAD\xCB\x43\x04\xEC\x03\x3E\x44\x9A\x51\xF9\x41\xE0\x2B\x91\x69\xCC\xFB\x34\x72\x9B\xBC\x12\x30\x0F\x8C\x99\xD9\xA9\xC2\x3E\x11\xBF\xFE\x0D\x36\x72\x76\x80\x5E\xDC\x88\x5C\x96\x7F\xE7\x02\xF0\xE7\x9A\x8D\x32\x28\xD3\xC4\xA3\x72\x0A\xF6\x01\xF7\x95\x90\xCF\x09\xE0\x40\xBD\xAF\x26\xE6\xAD\xA5\x1A\x95\x53\xF1\x38\xC5\xEC\x8C\x45\x98\x01\x0E\x9A\xD9\xE1\xC6\x81\x25\x58\x40\xDF\x94\x0F\x47\x16\x6C\x7D\xE4\xFD\xF5\x0C\x02\x8F\x26\x4C\xAF\xC6\x09\xE0\x19\x33\x3B\xD3\xEC\x8F\x51\xFD\x86\x99\xBD\x01\xBC\x1E\x72\x2B\xF0\x49\xE0\x53\x31\xF9\x37\xE1\x23\xB8\xE6\x9C\x82\x4B\xC0\x5F\x7C\xAD\x6B\xB9\x76\x8E\x8E\x00\x08\x18\x95\xFB\x80\x2F\xE2\x46\xE0\x4E\x70\x12\xF8\x2A\x71\xDD\xCB\x29\xE0\x70\x1E\x83\x71\x92\x10\x0A\xEF\x3E\xBC\x3B\xE3\x92\x11\x5C\x73\x35\xE0\xE3\xA4\xAB\x25\xAD\xF8\x95\x3F\x8A\x72\x09\x78\xC1\xCC\x26\xF2\xDE\x10\xED\x54\x92\xB4\x0E\x27\x90\x68\xFE\x42\x76\xE1\x56\x1E\x65\x86\x91\x3C\x02\x3C\x4B\xB1\xE8\x83\x09\x5C\xAD\x2B\xB4\xD4\x0C\x12\xD0\x37\xDB\x9B\x81\x6D\xB4\x77\x21\x6E\xA5\xFC\x18\x9C\x15\xC0\x17\x80\x6F\x03\xED\x9C\x62\x73\xB8\x5A\x77\x32\x24\xA3\x42\x02\x4A\x5A\x8B\x13\x6D\x8B\x2F\x64\x1E\x56\x16\x2D\x54\x22\x76\xE3\x06\x95\x3F\x64\x5C\x33\x09\x3C\x6F\x66\xC1\xFD\x65\x5B\x01\x7D\x1C\xDF\x08\xB0\x9D\x30\xF3\x7C\x5F\xC0\x3D\x45\x19\xC3\x99\xC8\x06\x1B\xCE\x7F\x16\x78\x0E\x38\xDD\x70\xFE\x32\xF0\x4F\x33\x1B\x8F\xCD\xB8\x65\xD3\x92\x74\x83\xA4\xBD\xB8\xD1\x72\x0F\xDD\xE9\xDB\xA8\x71\x00\xF8\x12\xF0\x6B\xAE\x6D\xB2\xFD\xC0\x27\x1A\xAE\x3D\x03\xFC\x31\x85\x78\xD0\x50\x03\xEB\x6A\xDB\x36\xB2\xE3\x4A\xBA\x0D\x01\xE7\x80\x5F\x00\xBF\x07\x3E\x07\x7C\xD8\xFF\xAD\x31\x5A\x61\xD2\xCC\x66\x52\x65\xDC\x0B\x57\x23\x11\xB6\xE3\xC4\xAB\x32\x66\x30\x94\xFA\x5A\xF7\x36\xF0\x63\x9C\x0B\xF4\xDE\x26\xD7\xEE\xF4\x7D\xF9\xF3\x29\x9C\x4B\xBD\x92\x6E\xC3\x39\x78\x16\x4D\x58\x6D\x13\x1A\x47\xDA\x1E\xB2\x8D\xAC\x9B\x80\x01\x49\xCF\x99\x59\x94\x93\xA9\xC7\xCC\xFE\x0D\x3C\x83\x9B\x7D\x2F\x08\xDE\x59\x24\x84\xC4\xEF\x0C\x02\x1F\x88\xDD\x29\xD5\x03\x60\x66\xE7\xCD\xEC\x6F\x38\x21\x4F\x92\x56\xC8\x83\xB8\xE9\x42\xA7\x18\x07\xFE\x1A\x78\x6F\x1F\x70\xB7\xA4\xD1\xD0\xC0\xF6\x6B\x46\x61\x2F\xE4\xDF\x81\xA7\x70\x56\x88\x14\x42\x4E\x00\xDF\xC4\xBD\x98\xD4\x1C\x05\xBE\x8B\x33\x37\xB5\x22\x8F\x30\x3B\x70\x42\x16\x9E\x72\x35\x9D\xC6\x98\xD9\x8C\x99\x1D\x06\x9E\xC6\x59\x5B\x62\x85\x9C\x04\xBE\x45\x5A\x11\x8F\xE0\xC4\x3B\x9B\x28\xBD\x8D\xB8\x26\xDD\x38\x97\xCC\xA4\x5D\x68\xC7\xB4\x99\x1D\x22\x4D\x8D\x9C\xC2\x79\xD1\x52\x71\x94\xEC\x9A\x17\x42\x3F\x70\xBF\xA4\xCD\x79\x6F\xC8\xEB\x58\xAF\xD5\xC8\xA7\x70\x0B\xF4\xD0\xA0\xCB\x94\x7D\x6B\x8C\x2B\x33\x8B\x5E\xE0\x2E\x49\x7B\xF2\xF4\x8B\x85\x16\xF9\x5E\xC8\x17\x09\x17\x32\x65\xB4\x6B\x2A\x07\x7D\x2B\xB6\x01\xF7\x48\xBA\x2E\xEB\xA2\x50\xA7\xD2\xAC\x17\xF2\x69\x8A\xB9\x13\x17\x93\x80\xE0\xA2\x69\xEF\xF7\x13\xEF\xA6\xC4\x9A\xF4\x67\x28\x16\x6B\x92\x52\xC0\xB2\x4C\x64\xD7\x03\xF7\x49\xDA\xD2\xA9\x42\x8C\x14\xB8\xF6\x09\xE0\x97\x09\xF2\x7C\x02\xE7\x15\x2C\x8B\x15\xB8\x4D\x90\x77\xFA\xE0\xF6\xAB\x44\x09\xE8\xF7\x9E\xE5\xDD\x5A\x00\x6E\x14\x7E\x25\x26\x4F\xCF\x0B\xB8\x51\xB8\x6C\x6E\xC1\xF5\x8B\x57\xFD\x3F\xB1\x86\x83\xA6\xD5\x7A\x89\x21\x9C\x83\x6A\xA6\xEE\x18\xF0\xE7\xC2\x05\xF4\x55\x79\x53\x82\x02\x76\x03\x57\x70\x82\xD4\x02\xE1\xEB\x83\xE3\x33\xA3\xB4\x62\x6A\xE0\x8D\x54\x67\xAE\x8F\x65\x1C\x37\xB1\xAF\x6D\xC9\x08\x9E\x53\xC6\x08\xB8\x98\x9B\xEF\x54\x91\x0D\x8C\x59\x04\x0D\x22\x92\x56\xE2\xD6\x8E\x45\x79\x0C\xE7\x54\x8F\xE5\xCB\x2C\x34\xD5\x17\x21\x99\x7B\x22\x74\x14\xDE\x1C\x78\xEF\x00\xE1\x5B\xBD\xEA\x59\x87\xDB\xE0\x13\x4A\xE5\x02\x76\x43\xF3\x6D\x1B\x7E\x9B\x41\x75\x02\x4A\xEA\x27\x3C\x8C\x2C\xE5\xEA\x21\xA6\x06\xAE\xF6\xDD\x50\x34\x21\x0F\x14\x53\xFB\x52\x0A\x18\xFB\xA9\xA8\x42\x76\xBF\x56\x2C\x66\x01\x63\x49\xD2\x8C\x0B\x3D\x90\x5F\xBA\x15\xDD\xDC\x0C\xCE\xE0\xF0\x12\xF0\x79\xE0\x3B\x01\xF7\x37\xF2\x53\x9C\xFF\x37\x86\x24\x02\x16\x9D\x07\x16\xA9\x7D\xC2\x85\x54\x1C\xF7\x81\x98\xEE\xA4\x94\xE2\x7B\x2D\x67\x58\x18\xAE\x51\x94\x72\x05\xAC\xFB\x36\x41\x3B\xE6\x70\x01\xE8\xC7\x53\x46\x00\x34\x30\x81\xB3\x07\xC6\x0C\x04\x83\x92\xAC\xD9\x77\x18\x8A\x50\xA4\x06\xDE\x44\x76\xA0\xD0\x34\x6E\x6B\xEC\x89\x98\xA5\x51\x4E\xDE\xC2\x59\xC5\x47\x71\x11\x15\x21\x2E\xC9\x15\x38\x4B\x52\xD4\xDE\xB9\x22\x02\xB6\x6A\xBE\x6F\xE1\xCC\xFB\x13\xB1\x6F\xB3\x08\xFE\x25\xBD\x28\xE9\x35\x5C\xF0\x53\xD6\x97\x90\x5A\xB1\x86\x32\x04\xF4\x73\xA6\x0D\x75\xA7\xAE\xE0\x4C\xF9\x2F\x9B\xD9\xF9\xBC\x99\x49\x1A\xA0\x98\xFD\xB0\x15\xFD\x92\x56\x7B\xD7\xC2\x59\x49\x7F\xC2\xD9\xEA\x46\x29\x56\x29\xD6\x10\xB9\xC3\x29\x6F\x66\x23\xB8\x11\xFB\x22\xAE\x99\x8E\x07\x36\xD3\x9F\x03\x1F\x0B\xB8\xAF\x91\xFD\xC0\x4E\xE0\xEB\x00\xBE\xE6\x8F\x4B\x3A\x85\x8B\xF3\xC9\x3B\xD8\x45\x0F\x24\x79\x05\x5C\x8D\x0B\x54\x7C\xA3\xCC\x66\x5A\x14\x1F\x69\x7A\x48\xD2\x49\xF2\x2D\xF5\xA2\x43\xF8\x72\x09\x68\x66\x47\x62\x33\x2A\x13\x33\x7B\x53\x52\x9E\xB0\xDD\x55\x92\xFA\x62\x06\xBD\x6E\x5A\x19\x74\x8A\x69\xE0\x5F\xB4\xF6\x08\x46\x35\xE3\x77\x82\x80\x32\xB3\xA3\xB8\x69\x4F\xB3\x5D\x55\x51\xCD\xB8\x6C\x01\x6B\x1F\xE0\x49\x91\x4E\xD3\x0F\x4E\x48\xBA\x45\xD2\x7E\xE0\x81\xFA\xF3\x7E\xC4\x3E\x84\x0B\xB7\x3B\x57\xF7\xA7\x24\x46\x85\xD2\x90\xF4\x19\xC5\xB3\x60\x8F\x9D\xA4\x55\x92\xBE\x27\x69\xB6\xE1\xDA\x27\x9B\x5C\x6B\x92\xB6\x48\x7A\x50\xD2\x07\x63\x9E\x67\x31\xC6\x43\x2F\x40\xD2\xAD\xC0\x6F\x58\xB8\x85\x6C\x8A\x26\x46\x07\x3F\x93\x78\x5D\xD2\x7F\x80\xDB\x62\x96\x74\x4B\x42\x40\x9C\x48\xF5\xDF\x5E\x98\xC4\x05\x9A\xFF\xC4\xCC\xCE\x35\xBF\x05\x7C\x90\x79\x94\x83\x7E\xA9\x08\x58\x5B\xDD\x4C\x00\x3F\x02\x7E\x16\x1B\x3C\x9E\x97\xA5\x22\xE0\x03\xC0\x5E\xE0\xC9\x98\x6D\x5B\x21\x94\x2A\xA0\xDC\xCE\xA7\xDD\x09\x92\xBA\x53\xD2\x1D\x66\x76\x0C\xC0\xFF\x3C\xD6\xE6\x9E\xC5\x8F\xA4\xDF\x26\x18\x81\x6B\xFC\xB0\xEA\xE7\x81\x77\xC6\x44\xBA\xA3\x2C\x0B\x18\xC9\xB2\x80\x91\x2C\x0B\x18\x49\x69\x02\xCA\x39\xA5\x6E\x4F\x98\xE4\xCE\x84\x69\x75\x3F\x92\x1E\x4B\x38\x02\xD7\xF8\x68\xD5\xCF\x55\xCA\x16\x57\x39\x5F\xC8\x51\xF2\xB9\x45\x8B\xF0\x0F\x60\x6F\x09\x5E\xC0\x96\x94\xD5\x84\xBF\x41\x7A\xF1\xC0\xF9\x3F\x62\x3F\x9F\x17\x45\xC7\x6B\xA0\xA4\x11\x5C\xED\x4B\xE1\x8D\x6B\xC6\x79\x60\xB4\xC8\xC7\x72\x52\x52\x46\x0D\x7C\x94\xCE\x89\x07\xCE\x20\xFA\x48\x07\xD3\xCF\xA4\x0C\x01\xCB\xF8\x8F\x85\x95\x19\x45\x96\xE7\x81\x91\x2C\x0B\x18\x49\x19\x02\x76\x2A\x42\xAB\xEC\x3C\xAA\x41\xD2\x56\x49\x63\x92\xE6\x3B\x30\x91\x9E\x97\x74\x48\x05\x76\x98\x2F\xB3\xCC\xD2\xE2\x7F\xCD\x81\x16\x07\xCA\x36\x8E\xBE\x00\x00\x00\x00\x49\x45\x4E\x44\xAE\x42\x60\x82'
CUSTOM_ICONS.vectors["weapon_flashbang"] = vector(80, 100)
CUSTOM_ICONS["weapon_flashbang"] = render.load_image(CUSTOM_ICONS.weapon_flashbang, CUSTOM_ICONS.vectors["weapon_flashbang"])

CUSTOM_ICONS.weapon_smokegrenade = '\x89\x50\x4E\x47\x0D\x0A\x1A\x0A\x00\x00\x00\x0D\x49\x48\x44\x52\x00\x00\x00\x27\x00\x00\x00\x64\x08\x06\x00\x00\x00\x05\x6F\x29\xF7\x00\x00\x00\x04\x73\x42\x49\x54\x08\x08\x08\x08\x7C\x08\x64\x88\x00\x00\x00\x09\x70\x48\x59\x73\x00\x00\x2E\x23\x00\x00\x2E\x23\x01\x78\xA5\x3F\x76\x00\x00\x00\x19\x74\x45\x58\x74\x53\x6F\x66\x74\x77\x61\x72\x65\x00\x77\x77\x77\x2E\x69\x6E\x6B\x73\x63\x61\x70\x65\x2E\x6F\x72\x67\x9B\xEE\x3C\x1A\x00\x00\x03\x20\x49\x44\x41\x54\x68\x81\xED\x9A\x3B\x68\x14\x41\x18\xC7\x7F\x5F\x8C\x1A\x0D\x3E\x52\x18\x5F\x84\x44\xC4\x98\xA0\x95\x45\x94\x80\x22\xF8\xC0\x26\x95\x28\x16\x1A\x7C\x14\xC1\x2E\x20\x62\x6B\x65\xAF\xD8\x0A\xD6\x36\x22\x82\x36\x5A\x18\x15\x6C\x15\x2D\x7C\x80\xC6\x58\xC4\x26\xA6\xD1\x18\x83\xFC\x2D\x66\x0F\xD7\xCB\xDE\xDD\xEE\x64\x2F\xBB\xEA\xFC\x60\xB8\x9D\x99\xEF\x66\x7F\xBB\x37\x3B\xB7\x30\x1F\x04\x02\x81\x40\x20\x10\x08\x04\x02\x81\xFF\x09\x49\x2B\x25\x3D\x93\x74\xBB\x68\x97\x79\x48\xBA\x25\xC7\x84\xA4\x3D\x59\xBF\x6F\x0D\x06\x3F\x01\x8C\x02\xAD\x59\xBD\x80\xE7\xC0\xB9\x58\xDB\x23\x33\xDB\x9F\x8B\x9C\xA4\x0E\xE0\x13\xB0\x32\xA3\x58\x3D\x76\x9A\xD9\xAB\xB4\xC1\x2D\x75\xFA\x86\xC8\x57\x0C\xE0\x44\x96\xE0\x7A\x72\x03\x0B\x14\x49\x62\x44\x52\x5B\xDA\xE0\x7A\x72\x1B\x73\x90\xA9\x66\x1D\x70\x34\xB7\xD1\x24\xAD\x90\x74\x57\xF9\xF1\x24\xED\xB9\xEB\xDD\x39\x00\xCC\x6C\x06\xF8\xB1\xA0\x2B\xFC\x93\x41\x49\x7B\xD3\x04\x36\x94\x6B\x02\x06\x1C\x4B\x13\x58\x84\x1C\xC0\xB0\xA4\x55\x8D\x82\x8A\x92\x5B\x03\x1C\x6E\x14\xD4\x50\x2E\x5A\x8C\x77\xE7\x61\x54\xC5\x85\x46\x01\x69\xEE\xDC\x10\xB0\x79\xE1\x2E\xF3\x18\x90\xD4\x55\x2F\xA0\xA6\x9C\xA4\x56\x49\xDB\x80\xED\xB9\x6B\x39\x96\x00\x67\xEA\x05\x98\xA4\x56\x60\x0F\x70\x10\xD8\x8A\x5B\x28\x37\x01\xBD\xC0\xF2\x26\x89\x55\xF8\x08\xF4\x45\xCB\xD5\x7C\x24\x5D\xCF\x71\x81\xF5\xE1\x64\x2D\x73\x93\x34\x09\xAC\x6F\xD2\x9D\x49\xC3\x63\x33\xDB\x97\xD4\xD1\x02\x7C\x58\x5C\x17\x00\x1E\xC4\x8E\xF7\x4A\x4A\x9C\x7B\x2D\xB8\x17\xC3\xC5\xE6\x0A\x30\x16\xAB\x9F\x4D\x0A\x2A\x6A\x11\x16\x70\x1C\x98\x8A\xEA\x9D\x92\x96\x54\x07\x15\x25\x87\x99\x7D\x06\x4E\x45\xD5\x5E\xE0\x74\x75\x4C\x61\x72\x00\x66\x76\x0F\xB8\x13\x55\xAF\x4A\xEA\x8F\xF7\x17\x2A\x17\x31\x02\xCC\x02\xED\xC0\x70\xBC\xA3\x70\xB9\xE8\xE7\xBD\x14\x55\x77\xC5\xFB\x0A\x97\x8B\x78\x9E\xD4\x58\x16\xB9\x44\x82\x9C\x2F\x41\xCE\x97\x20\xE7\x4B\x90\xF3\x25\xC8\xF9\x12\xE4\x7C\x09\x72\xBE\x04\x39\x5F\x82\x9C\x2F\x41\xCE\x97\x20\xE7\x4B\x90\xF3\x25\xC8\xF9\x12\xE4\x7C\x09\x72\xBE\x94\x5A\xAE\x92\x2F\x72\x19\xB8\x09\x74\x03\x3D\xB1\x52\xA9\x77\x01\x4B\x53\x8E\x39\x0B\x8C\x03\xEF\x6B\x94\x17\x59\xE5\x7E\x9A\xD9\x78\x34\xE8\x58\x75\x90\x24\x03\x3A\x80\xB5\xD1\x67\xE5\xD8\x80\x69\xE0\x4B\xBC\x98\x59\xCD\xBD\x0D\x29\xFD\xB6\x47\xAA\x4C\x9B\xE8\x64\x53\xFC\xDE\x37\x58\x14\xFE\x8A\x39\x77\x4E\xD2\x76\xE0\x75\x54\xDE\x00\x6F\x6A\x6E\x35\x66\x40\x6E\xC3\xB7\x2F\x2A\xFD\xB8\x29\x91\x49\xAE\x27\x2A\x55\xE3\xEA\x63\x45\x14\x37\x99\x27\x81\x09\xDC\xDC\xFA\x0A\x7C\xC3\xA5\x14\xAD\x06\x3A\x71\x89\x32\x5D\xB8\x1D\x99\x7E\xDC\x46\x72\xC3\x44\x83\x46\x72\x49\x18\xEE\x69\xED\x06\x0E\xF9\x9E\x60\x21\x94\x7A\xCE\x95\x45\x6E\x43\x52\x63\x59\xE4\xAE\x25\x35\x96\x45\x6E\x19\xEE\x41\x1B\x8D\x37\x66\x4D\x77\x6C\x16\x3D\xC0\x9C\x99\x7D\x8D\x37\x96\x42\xCE\xCC\xA6\x93\xDA\xCB\xF2\xB3\x26\x52\x7A\xB9\x6F\x8B\x7C\xCE\x39\x20\xDD\xDF\xA2\xA4\x36\x49\x17\x25\x7D\x6E\x72\xE6\xCD\xAC\xA4\x1B\x92\xFA\x32\x5F\x8E\xA4\x76\x49\xE7\x25\xBD\xCC\x59\xEA\x9D\xA4\x2B\x92\x32\x67\x92\x25\x26\x31\x4B\x1A\x04\x8E\x00\x07\x70\x29\xB9\x59\x9E\xEA\x19\xE0\x29\xF0\x10\xB8\x6F\x66\x89\x5B\xE4\xDE\x72\x71\xE4\xD2\x17\x77\x00\xDB\x70\x6F\x1B\x5B\xF8\x9D\xFB\xF4\x1D\x97\xC9\x35\x0E\xBC\x03\xDE\x02\xAF\xCD\x2C\xCF\x04\xD4\xC0\xBF\xC5\x2F\x20\x8E\x5A\xE8\x3C\x51\xB3\x6E\x00\x00\x00\x00\x49\x45\x4E\x44\xAE\x42\x60\x82'
CUSTOM_ICONS.vectors["weapon_smokegrenade"] = vector(39, 100)
CUSTOM_ICONS["weapon_smokegrenade"] = render.load_image(CUSTOM_ICONS.weapon_smokegrenade, CUSTOM_ICONS.vectors["weapon_smokegrenade"])

CUSTOM_ICONS.weapon_molotov = '\x89\x50\x4E\x47\x0D\x0A\x1A\x0A\x00\x00\x00\x0D\x49\x48\x44\x52\x00\x00\x00\x3B\x00\x00\x00\x64\x08\x06\x00\x00\x00\x38\xFD\x48\x91\x00\x00\x00\x04\x73\x42\x49\x54\x08\x08\x08\x08\x7C\x08\x64\x88\x00\x00\x00\x09\x70\x48\x59\x73\x00\x00\x2E\x23\x00\x00\x2E\x23\x01\x78\xA5\x3F\x76\x00\x00\x00\x19\x74\x45\x58\x74\x53\x6F\x66\x74\x77\x61\x72\x65\x00\x77\x77\x77\x2E\x69\x6E\x6B\x73\x63\x61\x70\x65\x2E\x6F\x72\x67\x9B\xEE\x3C\x1A\x00\x00\x05\xC2\x49\x44\x41\x54\x78\x9C\xED\x9C\x59\xCC\x5C\x53\x1C\xC0\x7F\xA7\xFA\xF5\xEB\xD7\x0A\x5A\x6A\x8D\x10\xAA\x25\x88\xA5\x09\x12\x62\x8F\x20\xB1\x34\xC4\x0B\x21\xB1\x3E\x94\x94\x44\x08\x6F\x9E\x08\x21\x95\x10\x09\x42\xEC\x6B\xC4\x12\xE1\x81\x90\xC6\x5E\xBB\xA4\x96\x07\xDA\xA2\x15\xAA\xB5\xD3\x6A\xBF\x9F\x87\x73\x27\x9D\x8E\xF9\x66\xEE\xCC\x77\xEE\x77\x8F\x98\xDF\xCB\x3D\xF7\xDE\x73\xFF\x73\x7E\x39\x77\xCE\x76\xEF\x0C\x0C\x18\x30\x60\xC0\x80\x01\x03\x06\x0C\x18\x30\x60\x40\x4E\xA8\x47\xA7\x8C\x37\x29\x65\xB0\x94\xA8\x33\x80\xD3\xD4\xA1\x54\x31\xB3\x95\x05\x76\x07\xA6\x01\x87\xA5\x0A\x98\xB3\xEC\xB6\xC5\x76\xBE\xBA\x5D\x8A\x80\x39\xCB\x4E\x2B\xB6\xD3\x81\xCB\xD5\xDD\xC7\x1B\x30\x67\xD9\xE6\xB2\xCD\x02\xAE\x51\xAF\x50\x0F\x57\xA7\xB7\xBB\x40\x9D\x5D\x36\x60\x6E\x6C\x68\x73\x6C\x6F\xE0\x5C\xE0\x26\xF5\x32\x75\x9F\xC6\x09\x75\x1A\xB0\x40\x3D\x68\xAC\x80\x39\xCB\xFE\xDD\xE1\xDC\x16\xC0\x7E\xC0\x42\x75\xBF\xE2\xD8\x5C\xE2\xAD\x7F\xBE\x3A\xA7\xDD\x45\x39\xCB\xFE\x5C\x22\x4F\x00\x8E\x29\xD2\x5B\x16\xDB\x29\xC0\xA5\xEA\x9E\xAD\x99\x73\x96\xFD\x8C\xF6\xB7\x72\x2B\x7B\xAB\x53\x81\xE5\x4D\xC7\x86\x81\xCB\xD4\xDD\x9A\x33\x66\x2B\x1B\x42\xF8\x09\x78\xA2\x44\xD6\xC9\xC0\x51\x21\x84\x15\xC0\xA7\x4D\xC7\x47\x88\xDF\xE1\xAD\x1A\x07\xB2\x95\x05\x08\x21\xBC\x0A\xBC\x55\x22\xEB\x29\xEA\x2E\xC0\x33\x80\x4D\xC7\xB7\x06\xCE\x6E\xEC\x64\x2D\x5B\xF0\x20\xF0\x75\x97\x3C\x43\xC0\xC5\xC0\x6A\x60\x55\xCB\xB9\x03\x1B\x7D\x74\x96\xB2\x45\x5F\x7A\x86\x3A\x2D\x84\xF0\x37\x70\x0F\x30\xDA\xE5\xB2\x1D\x81\xEB\x8A\x6D\x2B\xF3\x20\x53\x59\x60\x2D\x70\x02\x70\x95\x3A\x12\x42\x58\x09\xBC\x56\xE2\xBA\xE9\xB4\x77\xDA\x81\x31\x4E\xE4\xC0\x6F\xC5\x76\x27\xE0\x94\x22\xFD\x22\x9B\x7F\x1F\x7B\x21\x40\xBE\xB2\x5B\x37\xA5\x8F\x54\x87\x42\x08\x3F\x02\xEB\xFA\x8C\xF7\x1D\xC4\x66\x3B\x47\xE6\x35\xA5\x87\x80\x59\xEA\x24\x60\x6A\x9F\xF1\x96\x42\x86\xB2\xEA\xCE\xC0\xA1\x2D\x87\xA7\x00\x07\xF6\x19\x72\x19\x71\x80\x92\xE5\x6D\x3C\x9F\x7F\x97\x6B\x47\xE0\xD8\x22\x3D\x0A\x9C\x04\x1C\x4D\xAC\xE9\x8D\x1D\x62\xAD\x07\xEE\x0D\x21\x08\x99\xD5\x6C\x31\x73\xD9\xBF\xCD\xA9\xD3\x89\x43\x40\x88\x33\x9F\x5D\x8B\xF4\x1C\x62\xBF\xFA\x2C\x45\x23\xD4\xC2\xE2\x10\xC2\x77\x8D\x9D\xDC\x6A\x76\x1B\xDA\x17\x7A\x46\xB1\x1D\x26\xD6\x68\x33\x3B\x01\x97\x00\x33\xF9\x77\x6B\xBD\xD9\xD8\x3A\x37\xD9\xF5\x1D\xCE\x6D\x00\xCE\xEA\x70\xFE\x4C\xA0\x75\xA6\x73\x4C\xCE\x63\xE3\xB5\xB4\x9F\xE9\x48\x1C\x64\x8C\x74\xB9\xFE\x78\x36\xDD\xEE\x14\xE9\xB9\x8D\x9D\xAC\x64\x43\x08\x1B\x89\xAD\x67\x2B\xA3\x40\xC7\x25\x97\x26\x66\xB6\xEC\x7F\xDB\x48\x64\x25\x5B\xF0\x7E\xCB\xFE\x28\x9B\xF7\xBB\x9D\x58\xC5\xE6\x93\x86\xF7\x8B\xA1\x26\x90\xA7\xEC\xEB\xC0\x5F\x45\x5A\x60\x67\xE0\x90\x12\xD7\x8D\x02\x4F\xB3\xA9\x87\x59\x05\x3C\xD0\x9C\x21\x3B\xD9\x10\xC2\x5F\xC0\xCB\xC5\xEE\x54\xE0\xD4\x92\x97\x3E\x4A\x5C\x9B\x02\xF8\x15\xB8\x2D\x84\xF0\x47\x73\x86\xEC\x64\x0B\x5E\x20\x8E\x67\xCF\x29\x99\x7F\x09\x51\x10\x62\x03\x77\x47\x08\x61\x75\x6B\xA6\x76\x7D\x5A\xED\x14\x4B\xA4\x6F\x01\x5B\x75\xCB\x0B\x3C\x4F\x5C\x7F\x9A\x4C\xBC\xED\xEF\x0D\x21\xBC\xDD\x2E\x63\x56\x23\x28\x00\x75\x26\x71\x79\xA5\x8C\xE8\x4A\x60\x05\xD1\x63\x03\xF0\xC8\x58\xA2\x90\x99\xAC\x3A\x19\x78\x1C\xD8\xAB\xE4\x25\x4F\x03\xBF\x00\x9F\x00\x2F\x85\x10\xBE\xAF\xAA\x6C\xC9\x51\x6F\xB3\x3C\x2F\xA8\xC3\xDD\xA3\x66\x88\x7A\x7E\x0F\xA2\x7F\xA8\x7B\xD4\x5D\xE6\xBE\x50\x8F\x50\xD7\xF5\x20\x7B\x6D\xDD\x65\xEE\x0B\x75\x8E\xFA\x43\x0F\xA2\x4B\xD5\x29\x75\x97\xBB\x27\xD4\x49\xEA\x79\xEA\xEA\x1E\x44\x47\x4D\xFC\x9E\x45\xA5\xA8\x93\xD5\x73\xD4\x8F\x7B\x90\x6C\x70\x7F\xDD\xE5\x2F\x85\x3A\x62\x7C\xA6\xFA\x55\x1F\x92\xAA\x6B\xD4\xED\xEB\xF6\xE8\x88\x3A\x5C\x48\x7E\xDB\xA7\x64\x83\x4B\xEA\x76\xE9\x88\xB1\x95\x5D\x3A\x4E\x49\xD5\x77\x8C\x4B\xA9\xF9\xA1\x6E\xA1\xDE\x68\x6C\x50\xC6\xCB\xA8\x7A\x70\xDD\x4E\x6D\x31\x36\x40\xCF\x24\x90\x6C\xF0\x51\xAA\xB2\x55\x71\x6B\x2C\xA2\xFC\x1C\xB4\x0C\x1F\xA4\x0A\x94\x54\x56\x9D\x0F\x2C\x48\x19\x13\xF8\x32\x55\xA0\x64\xB2\xC6\x27\xDF\x77\xA5\x8A\xD7\xC4\xB2\x54\x81\x92\xC8\x1A\x5B\xCA\xFB\xD8\xF4\x0A\x5E\x4A\x96\x77\xCF\x52\x8E\x54\x35\x7B\x25\x70\x5C\xA2\x58\xAD\x24\x93\x1D\xF7\xB2\x4C\xD1\x2D\xBC\x49\x7C\xD2\x96\x9A\x75\xC0\xF4\x62\x3D\x79\xDC\x8C\xAB\x66\x8D\x0F\xA2\x1E\xA2\x1A\x51\x80\x2F\x52\x89\xC2\xF8\x6F\xE3\x5B\x88\x4F\xD5\xAA\xE2\xD3\xEE\x59\xCA\xD3\xB7\xAC\x7A\x1A\xF1\xE9\x59\x95\xBC\x91\x32\x58\x5F\xB2\xC6\xA7\xE3\x77\xA7\x2C\xC8\x18\x2C\x4E\x19\xAC\x67\x59\x35\x10\xFB\xD3\x24\x6F\x77\x77\x60\x19\xF0\x61\xCA\x80\xFD\xD4\xEC\x15\xC0\xC9\x29\x0B\x31\x06\xF7\x35\x5E\x0F\x48\x45\x4F\x5D\x8F\xF1\xDD\xDE\x25\xF4\xFF\xD6\x4A\x59\xD6\x02\xB3\x43\x08\x6B\x52\x06\x2D\x5D\xB3\xEA\x08\xF0\x18\xD5\x8B\x02\x5C\x95\x5A\xB4\x27\xD4\xDB\x13\x4E\xDB\x3A\xF1\x54\x6D\x92\x85\xE8\x89\xA6\x99\x88\x77\xE3\x1B\xB5\x8A\xF1\x75\x69\xD1\xED\xD5\x55\x13\x20\xBA\x51\xAD\x6A\x7C\x5D\x4A\x34\xA8\xCF\x4D\x80\xA8\xEA\x0D\xB5\x89\x16\xB2\x0B\x27\x48\xF4\x3D\xEB\x5C\xE5\x57\xF7\x35\x3E\x40\xAA\x9A\xDF\xD4\xB9\xDD\x4B\x54\x9D\xE8\xB0\xFA\xE1\x04\x88\xAA\x5E\x58\x9B\x68\x21\x7B\xEB\x04\x89\xD6\xDE\xCD\x9C\xE0\xFF\xA4\x9B\x99\xA5\xAE\x9C\x00\xD1\x2C\xBA\x99\x94\x8B\xDB\x9D\xA8\xBD\x9B\x59\x30\x41\xA2\xB5\x75\x33\xA1\x10\xDD\x07\x78\x97\x4D\x3F\xD0\xAD\x8A\xDF\x81\x79\x21\x84\xCF\x2B\xFE\x9C\xB6\x4C\x32\xBE\x71\xF2\x30\xD5\x8B\x02\x2C\xAC\x4B\x14\x00\xF5\xE6\x09\xBA\x7D\xEB\xED\x66\x80\xA0\xFE\x4E\xF5\xB5\xFA\x0D\x70\x40\xAD\x73\x54\xE2\xE4\xFD\x8B\x8A\x3F\x63\x14\x38\xB7\x6E\x51\x88\xB2\x77\x56\xFC\x19\x37\x85\x10\x5E\xA9\xF8\x33\xCA\xA1\x4E\x51\x3F\xAF\xE8\x7B\xBA\xC4\x84\xFF\x20\x92\x04\xF5\x10\x75\x7D\x62\xD1\x7A\x67\x33\x9D\x50\xAF\x4C\x2C\x7B\x41\xDD\x4E\x1D\x51\x17\x25\x12\x7D\xB2\x6E\x97\xAE\x18\xC7\xC7\x37\x8C\x53\xB4\xDE\xD9\x4C\xAF\xA8\x17\xA9\x7F\xF6\x21\xBA\xD1\xFF\xD2\xBB\x85\x0D\xD4\x83\xEC\x7D\xB5\xE2\xFA\xBA\xCB\xDD\x37\xEA\x90\xB1\xE1\x5A\x53\x42\x34\xBF\x6E\xA6\x1F\xD4\x19\xEA\xD5\xEA\xB2\x31\x44\x7F\x55\xCB\xBE\xD7\x5F\x1B\xBD\x3E\xD8\x0A\xC4\x5F\x2D\x9F\x44\xFC\x23\x9B\x1D\x88\x3F\xC6\x5F\x14\x42\x78\x31\x7D\xF1\x06\x0C\x28\xC3\x3F\x31\x7F\xDE\xB2\x9C\x4E\x05\xF8\x00\x00\x00\x00\x49\x45\x4E\x44\xAE\x42\x60\x82'
CUSTOM_ICONS.vectors["weapon_molotov"] = vector(59, 100)
CUSTOM_ICONS["weapon_molotov"] = render.load_image(CUSTOM_ICONS.weapon_molotov, CUSTOM_ICONS.vectors["weapon_molotov"])

CUSTOM_ICONS.weapon_hegrenade = '\x89\x50\x4E\x47\x0D\x0A\x1A\x0A\x00\x00\x00\x0D\x49\x48\x44\x52\x00\x00\x00\x3D\x00\x00\x00\x64\x08\x06\x00\x00\x00\x35\xE3\x38\xD6\x00\x00\x00\x04\x73\x42\x49\x54\x08\x08\x08\x08\x7C\x08\x64\x88\x00\x00\x00\x09\x70\x48\x59\x73\x00\x00\x2E\x23\x00\x00\x2E\x23\x01\x78\xA5\x3F\x76\x00\x00\x00\x19\x74\x45\x58\x74\x53\x6F\x66\x74\x77\x61\x72\x65\x00\x77\x77\x77\x2E\x69\x6E\x6B\x73\x63\x61\x70\x65\x2E\x6F\x72\x67\x9B\xEE\x3C\x1A\x00\x00\x05\xAD\x49\x44\x41\x54\x78\x9C\xED\x9C\x5B\x88\x16\x65\x18\xC7\x7F\x8F\x1A\x69\x16\x79\x48\x13\x2F\xC4\x15\x83\x4C\xC9\x53\x12\x81\x56\x28\x15\x76\xB8\xB0\x83\xA8\x24\x19\x45\x51\x5A\x92\x95\x17\x11\x11\x9D\xB4\x08\x89\xA2\x10\x0B\xEB\xAA\x13\xB5\x59\x94\x45\x17\x79\x8A\xCA\x4C\x63\x0B\x83\x0E\x6E\xA2\x59\x2A\x62\x69\xA6\xEB\x61\xF7\xDF\xC5\x3B\xE3\xCE\x8E\xDF\x7E\x87\x39\xED\xCE\xE7\xFC\x60\xC1\xEF\x79\xE7\x7D\xE7\xFF\x77\xBE\x99\xF7\xF4\xCC\x07\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\xA7\x37\xD6\xD5\x02\xC2\x48\xEA\x0D\x3C\x03\xF4\xF5\x42\x4F\x98\xD9\xAE\x2E\x94\x94\x3E\x92\x06\xA9\x23\x37\x26\x7D\x8E\x1E\x49\x37\x98\x02\x97\x25\xDD\x60\xAF\x24\x1B\x93\xD4\x13\x78\x0C\x18\x15\xA3\x99\x33\x43\x9F\x0F\x4B\xEA\x61\x66\x6D\x31\xDA\x4C\x16\x49\x83\x25\x35\x4A\xFA\x4E\xD2\x36\xA5\xC3\x2B\x49\x6A\x8E\xFD\x20\x93\xF4\x19\x70\x4D\x02\x5A\xCA\xD1\x06\xF4\x33\xB3\x7F\x93\x68\x2C\xD6\x3D\x2D\x69\x12\x30\x31\x09\x21\x15\x30\x60\x74\x52\x8D\x45\x36\x2D\xE9\x2C\x60\x0D\x70\x5E\x52\x62\xCA\x60\xC0\xED\x49\x35\x16\xF7\xE9\xDD\x9A\x88\x8A\xEA\xB8\x4B\xD2\xCC\x24\x1A\x8A\x75\x4F\x4B\x9A\x02\x2C\xC6\x5D\xED\xBD\xC0\x21\x60\x02\x70\x61\x7C\x69\x25\x59\x65\x66\x33\x52\x6A\x3B\x3A\x92\x56\xA4\xF4\x04\x97\xA4\x23\x92\x06\xC6\xD5\x98\x87\xC1\x49\x90\xDE\xB8\x71\x40\x2C\xF2\x66\x1A\x60\xBE\xA4\x61\x71\x1A\xC8\xA3\xE9\x9E\xC0\xA2\x38\x0D\xE4\xD1\x34\xC0\x3C\x49\xFD\xA3\x56\xCE\xAB\xE9\x73\x81\xFB\xA3\x56\xCE\xAB\x69\x80\xFB\x24\x85\x27\x27\x55\x91\x67\xD3\x03\x81\x05\x51\x2A\xE6\xD9\x34\xC0\x02\xB9\xE9\x6C\x4D\xE4\xDD\xF4\x70\xA0\xE6\x11\x5A\xDE\x4D\x03\xDC\x5D\x6B\x85\x7A\x30\x3D\x4D\x52\x4D\xF7\x76\x3D\x98\x36\xE0\x25\x49\x55\xCF\xEB\xEB\xC1\xB4\xCF\xAC\x6A\x0F\x4C\x7C\xDD\x5B\xD2\x4D\xC0\xEB\xC0\x39\x11\x9B\x38\xEC\xFD\x1D\x0C\x37\x0D\xFC\xE3\xFD\x7B\x34\x6E\xF2\x11\x64\x0F\xD0\x60\x66\x47\x22\x9E\x37\x1E\x92\xA6\xC6\x98\x3E\x5E\x59\x45\xFB\x77\x76\x52\xF7\x9E\x6A\xF4\xA5\xF5\xF5\x8E\xF3\xBF\x7D\xA2\xD2\x01\x66\xF6\x1A\xD0\x58\xA2\xE8\x61\xB9\x65\xAC\xB2\xA4\x65\x7A\x5F\x4A\xED\x06\xB9\x15\x68\x0A\xC5\x1A\xA8\x62\x2D\x2D\xB7\x0F\x32\xEF\xDE\xBD\x0D\x68\x09\x15\x2D\x96\xD4\xA7\x5C\xDD\xDC\x9A\x06\x30\xB3\x26\x60\x49\x28\x3C\x0C\xB8\xA3\x5C\xBD\x5C\x9B\xF6\x78\x0E\xD8\x12\x8A\xDD\x5B\xAE\x42\x6C\xD3\x92\x2E\x95\xF4\xB2\xA4\xCF\x25\x7D\x25\x69\x2B\xB0\x29\x46\x93\xE3\x6A\x59\x20\x30\xB3\x16\xE0\x11\x3A\x2E\x47\x8F\x92\x74\x7D\xA7\x75\x6A\x51\x23\x69\x08\x70\x39\x70\x15\xAE\xAF\xBC\x98\xF6\x7D\xE4\x24\x69\x05\x7E\xC5\xF5\xBD\xFB\x70\x9B\x0A\x4D\xC0\x26\x33\x3B\xDA\x89\xB6\xD5\xC0\xF4\x40\xE8\x03\x33\x8B\xB6\xCD\x2B\xC9\x24\x4D\x97\xF4\xB6\xA4\xB6\x18\xFD\x6F\x12\x1C\x91\xB4\x59\xD2\x22\x49\x63\x43\x3A\x27\xA8\xA3\xBE\xA3\x92\x06\x47\x31\x3C\x40\xD2\xDA\xCC\xAD\x55\xC7\x09\x49\x2B\xE5\xF6\xD3\x7C\xBD\x4B\x42\xC7\x3C\x5B\xAB\xE1\xC1\x92\x36\x64\xED\x24\x02\xC7\x25\xCD\xF0\x34\xF7\x95\xF4\x66\xA0\x6C\x9F\xAA\x18\xAC\xF8\x86\xCF\x96\xB4\xA9\x0B\x0C\x44\xA5\x4D\xD2\xE3\x9E\xF6\x3E\x92\xF6\x04\xCA\x2A\x6F\x0E\x48\x3A\x53\x52\x53\x57\x28\x4F\x80\xA5\x9E\x87\x47\x03\xB1\xDD\xAA\xB4\x15\x24\x69\x69\xD7\xE8\x4D\x8C\xE9\x72\xB7\xE6\xA1\x40\xEC\xF9\x72\x86\x27\xAA\xEB\x9F\xD0\x71\x59\xEF\x79\x59\x18\x88\x1D\x97\x34\xC0\xF7\x19\x1E\x9C\x2C\xA4\x1B\xE6\x96\xD5\xC8\x64\x49\x17\x01\xAF\xE2\xFA\x79\x70\x09\x45\x4F\xF9\x07\x9C\x34\x2D\x37\x0A\xBA\x2E\x53\x79\xE9\x60\xC0\x6C\x33\x3B\x0C\x7C\x11\x88\xCF\x96\x34\x1C\x3A\x5E\xE9\x79\xC0\x00\xEA\x03\x7F\x64\xF6\x7D\x20\xD6\x0F\x18\x0B\xDE\x57\x59\x52\x0F\x60\x23\x70\x49\xA6\xD2\xD2\xE3\x38\x6E\x6E\xDD\x0B\xD8\x1E\x88\x37\x98\xD9\x76\xFF\x4A\xF7\xA7\x7E\x0C\x03\x9C\x01\x5C\x0B\xFC\x01\xEC\x0E\xC4\xFF\x83\xF6\xAF\xF7\xC8\x8C\x45\x65\xC1\x2C\x33\x6B\x05\x7E\x0E\x17\xF8\xA6\xAF\xCE\x56\x4F\x26\x4C\x95\x34\x1A\xD8\x11\x2E\xF0\x4D\x8F\x0B\xC4\xBA\x4F\x0E\x66\x7C\x6E\x06\x7E\x0C\x07\x7D\xD3\xC1\xA7\xF6\xEF\x99\xC8\xC9\x86\x71\x78\xF7\x71\x10\xDF\xF4\xF8\x40\x6C\x44\x26\x72\xB2\x61\x7C\xA9\x60\xA9\xE5\xA2\xBC\x8F\xC8\x82\xF4\xA6\x44\x56\x63\x3D\x2C\x0C\x56\x22\xBC\x36\x7E\x5A\x98\x3E\x65\x4D\xED\x74\x30\x7D\x0A\xF5\x6E\xFA\x18\xD0\x4C\x68\x9B\xA9\xDE\x4D\x6F\x31\xB3\x03\xC0\xDF\xC1\xA0\x6F\xBA\x39\x7B\x3D\x99\xB0\x3F\xF4\x79\x10\xB4\x9B\x5E\x97\xAD\x96\xCC\xF8\x30\xF4\xF9\x02\x68\x37\xBD\x37\x5B\x2D\x99\xD0\x06\x7C\x5D\xAA\xC0\x37\xFD\x51\x76\x5A\x32\x63\xB5\x99\x95\xBC\x98\xBE\xE9\xDF\x08\xDD\xEC\x75\xC0\x3B\x25\x62\x0D\xE0\x99\xF6\x36\xC5\xDE\xCD\x52\x51\xCA\xEC\xA4\xB4\x9F\x21\xD0\xB1\xCB\x7A\x2B\x13\x39\xD9\xB0\xDC\xCC\x8E\x75\x56\x18\x34\xFD\x25\xF0\x57\xFA\x7A\x52\xA7\x05\x78\xA3\xDC\x01\x27\x4D\x7B\x4B\x2B\x2F\xA4\x2C\x28\x0B\x56\x99\xD9\x9F\xE5\x0E\x08\x8F\xC8\x96\x01\x07\xD2\xD3\x93\x3A\x6D\xC0\x93\x65\xCA\xCF\x87\x90\x69\x33\x3B\x01\xCC\xC6\x65\xE7\xE5\x91\xE5\x66\xF6\x53\x99\xF2\x11\x50\x62\xEC\x6D\x66\x9F\x02\xEF\xA5\xA5\x2A\x45\x76\xE1\x72\x4F\x2A\xD2\xD9\x84\xE3\x21\xDC\x9A\x71\x9E\x98\xEB\x4D\x2E\x2A\x52\xD2\xB4\x99\xED\x00\xE6\x02\x89\xBC\xAF\x9C\x01\x8B\xCC\x6C\x4D\x15\xC7\xB5\x42\x99\xA9\xA5\x99\xAD\x05\x6E\xA0\xFB\x8F\xCB\x1B\xA9\xBE\xD7\xF9\x01\x2A\xCC\xA7\xCD\x6C\x1D\x6E\xBB\xA7\x3B\xF6\xDF\xC2\xF5\x36\x33\xCD\xAC\xDA\x07\x6F\x0B\x54\xB1\x88\x60\x66\x3B\x81\x29\xC0\x86\xC8\xF2\x92\x67\x2B\x70\x8B\x99\x3D\xE8\x8D\x2F\x6A\xA2\xAA\x95\x13\x33\xDB\x06\x4C\x03\x5E\xAC\xF5\x04\x09\x73\x10\xD7\x0F\x4F\x32\xB3\xF7\x33\x3B\xAB\xA4\x2B\x24\x7D\xA2\x6C\xD3\x34\x5A\xE4\x92\xF7\x6A\xDE\x59\x95\x34\x46\xED\xD9\x46\x4F\xC7\x35\x3F\x52\xD2\x03\x92\x36\xA6\x64\xF4\x80\xA4\x65\x92\xE6\x28\x4A\xE6\x9F\xD3\xD8\x5F\x2E\x73\xD0\x67\x32\x24\xB4\x9B\x21\x97\xE3\x31\x07\x97\xBE\x31\x86\x68\x3F\x1A\xB3\x1F\x97\x0F\xBA\x19\xF8\x18\xF8\xC6\xCC\x62\xCD\xF1\xE5\xDE\xC5\x5C\x89\x7B\x45\xB1\xD1\xCC\x56\x40\x3A\x2F\xAE\x0C\x05\xE6\xE3\xD2\x39\x86\x96\x39\xF4\x5B\x5C\xA2\x6B\x33\xB0\x1E\xF8\x25\xAB\x5F\xAD\x49\x6D\xDF\x4A\x92\xE1\x7E\x10\x22\x9C\xA6\xD8\x0A\x34\x9B\x59\xF8\x6D\x9C\x82\x34\xF9\x1F\xC0\x26\xBB\xF6\xF1\xD9\xB5\x01\x00\x00\x00\x00\x49\x45\x4E\x44\xAE\x42\x60\x82'
CUSTOM_ICONS.vectors["weapon_hegrenade"] = vector(61, 100)
CUSTOM_ICONS["weapon_hegrenade"] = render.load_image(CUSTOM_ICONS.weapon_hegrenade, CUSTOM_ICONS.vectors["weapon_hegrenade"])
-- bhop icon
CUSTOM_ICONS.bhop_png = [[
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 158 200" height="200mm" width="158mm">
    <g style="mix-blend-mode:normal">
        <path d="m 27.692726,195.58287 c -2.00307,-2.00307 -2.362731,-5.63696 -1.252001,-12.64982 0.51631,-3.25985 0.938744,-6.15692 0.938744,-6.43794 0,-0.28102 -1.054647,-0.68912 -2.343659,-0.9069 -1.289012,-0.21778 -2.343659,-0.46749 -2.343659,-0.55491 0,-0.0874 0.894568,-2.10761 1.987932,-4.48934 4.178194,-9.10153 7.386702,-22.1671 7.386702,-30.07983 v -3.57114 l -3.439063,-0.65356 c -7.509422,-1.42712 -14.810239,-6.3854 -17.132592,-11.63547 -0.617114,-1.39509 -1.6652612,-5.2594 -2.3292172,-8.58736 -0.894299,-4.48252 -1.742757,-6.93351 -3.273486,-9.45625 -2.296839,-3.78538 -2.316583,-5.11371 -0.151099,-10.165583 0.632785,-1.47622 2.428356,-7.85932 3.990157,-14.18467 2.3650332,-9.578444 3.4874882,-12.902312 6.7157522,-19.887083 5.153317,-11.149867 5.357987,-11.987895 3.936721,-16.118875 -1.318135,-3.831228 -1.056436,-5.345174 1.69769,-9.821193 0.98924,-1.607722 2.121218,-4.129295 2.515508,-5.6035 C 25.28429,28.210324 25.23258,27.949807 23.35135,24.502898 21.710552,21.496527 21.306782,19.993816 20.889474,15.340532 20.614927,12.279129 20.380889,8.4556505 20.369393,6.8439185 l -0.02091,-2.930428 9.333915,0.83216 9.333914,0.832161 0.415652,4.4356115 c 0.228605,2.439587 0.232248,9.481725 0.0081,15.649196 l -0.407561,11.213581 3.401641,0.387936 c 1.8709,0.213363 4.456285,0.528941 5.745297,0.701283 l 2.343658,0.31335 0.01922,-4.58462 c 0.01523,-3.630049 0.300834,-5.120017 1.371678,-7.156027 3.087768,-5.870826 9.893488,-10.61208 17.039741,-11.87087 2.720173,-0.479148 4.160963,-0.409507 7.136663,0.344951 8.66897,2.197927 13.98192,9.621168 13.98192,19.535491 0,3.495649 -0.1404,3.901096 -1.99211,5.752805 -1.24394,1.243942 -2.56423,1.992111 -3.51549,1.992111 -1.49731,0 -1.52337,0.07107 -1.52337,4.153986 v 4.15399 l 8.9352,-0.237138 c 5.2858,-0.140285 11.170779,-0.674802 14.408789,-1.308719 l 5.4736,-1.071577 -0.38275,-2.552314 c -0.37145,-2.476984 -0.33603,-2.552315 1.19984,-2.552315 0.87041,0 1.91062,-0.448636 2.31157,-0.996969 0.68332,-0.93449 1.27483,-0.910186 9.43922,0.387872 4.86768,0.773912 12.32893,1.486871 16.91304,1.616118 4.51154,0.127203 8.93123,0.513358 9.82152,0.858128 2.24255,0.86843 2.71036,3.071333 1.03169,4.858196 -2.36272,2.515004 -4.22494,2.914196 -9.65444,2.069567 -6.49602,-1.010535 -9.48434,-0.608226 -12.89073,1.735433 -1.51944,1.045409 -3.78166,2.037422 -5.02716,2.204478 -2.12756,0.285364 -2.24441,0.404325 -1.93193,1.966706 0.54423,2.721143 -0.2472,4.489222 -3.68173,8.225132 -3.77119,4.102112 -4.63155,5.89093 -5.49449,11.423793 -0.94965,6.08886 -1.57396,7.52473 -5.32281,12.24226 -5.48499,6.90229 -11.865029,11.373083 -16.271159,11.401983 -2.96514,0.0195 -5.44164,-1.427403 -10.64598,-6.219683 -6.09285,-5.61044 -11.509723,-9.58715 -13.059111,-9.58715 -0.74413,0 -2.728788,1.56375 -5.069514,3.99435 -2.115662,2.19689 -4.279795,4.24027 -4.809188,4.54084 -0.873942,0.49619 -0.888303,0.97152 -0.156034,5.16456 0.443574,2.539953 1.213393,5.239093 1.710714,5.998093 1.234397,1.88393 4.464204,3.43033 10.249847,4.90755 11.894956,3.03704 24.227356,12.17082 28.700056,21.25618 3.277059,6.65665 3.756559,14.90456 1.06537,18.32585 -2.00495,2.54888 -4.71703,3.29933 -13.73034,3.79931 -12.02449,0.66702 -11.43259,0.30042 -25.191149,15.60203 -3.539415,3.93635 -4.947788,5.02545 -9.098134,7.03552 -6.030466,2.92066 -8.127669,5.18229 -9.759102,10.52427 -1.407053,4.60727 -3.889283,7.93618 -7.163048,9.60633 -3.066476,1.56439 -5.550268,1.48363 -7.270304,-0.2364 z M 99.119321,71.201503 c 3.729129,-4.724307 6.662059,-8.707839 6.517599,-8.852305 -0.14446,-0.144451 -2.7777,1.571678 -5.851649,3.813635 -4.38891,3.20102 -6.56642,4.363275 -10.1411,5.412849 -2.50365,0.73511 -4.68393,1.459682 -4.84506,1.610152 -0.31664,0.295703 6.47662,6.567603 7.13899,6.591103 0.22054,0.008 3.4521,-3.85113 7.18122,-8.575434 z" style="fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0.585916;stroke-opacity:1" />
    </g>
</svg>
]]
CUSTOM_ICONS.vectors["bhop"] = vector(1866, 2362)
CUSTOM_ICONS['bhop'] = render.load_image(CUSTOM_ICONS.bhop_png, CUSTOM_ICONS.vectors["bhop"])
--

local WEPAON_ICONS_OFFSETS = setmetatable({
    [CUSTOM_ICONS["weapon_smokegrenade"]] = {0.2, -0.1, 0.35, 0},
    [CUSTOM_ICONS["weapon_hegrenade"]] = {0.1, -0.12, 0.2, 0},
    [CUSTOM_ICONS["weapon_molotov"]] = {0, -0.04, 0, 0},
}, {
    __index = function(tbl, key)
        tbl[key] = {0, 0, 0, 0}
        return tbl[key]
    end
})

local WEAPON_ALIASES = {
    [weapons["weapon_incgrenade"]] = weapons["weapon_molotov"],
    [weapons["weapon_firebomb"]] = weapons["weapon_molotov"],
    [weapons["weapon_frag_grenade"]] = weapons["weapon_hegrenade"],
}
for idx, weapon in pairs(weapons) do
    if weapon.type == "knife" then
        WEAPON_ALIASES[weapon] = weapons["weapon_knife"]
    end
end

local vector_index_i, vector_index_lookup = 1, {}
local VECTOR_INDEX = setmetatable({}, {
    __index = function(self, key)
        local id = string.format("%.2f %.2f %.2f", key:unpack())
        local index = vector_index_lookup[id]

        -- first time we met this location
        if index == nil then
            index = vector_index_i
            vector_index_lookup[id] = index
            vector_index_i = index + 1
        end

        self[key] = index
        return index
    end,
    __mode = "k"
})

local DEFAULTS = {
    visibility_offset = vectorlib.new(0, 0, 24),
    fov = 0.7,
    fov_movement = 25,
    select_fov_legit = 8,
    select_fov_rage = 25,
    max_dist = 6,
    destroy_text = "Break the object",
    source_ttl = 5
}

local MAX_DIST_ICON = 1500
local MAX_DIST_ICON_SQR = MAX_DIST_ICON*MAX_DIST_ICON
local MAX_DIST_COMBINE_SQR = 20*20
local MAX_DIST_TEXT = 650
local MAX_DIST_CLOSE = 28
local MAX_DIST_CLOSE_DRAW = 15
local MAX_DIST_CORRECT = 0.1
local POSITION_WORLD_OFFSET = vectorlib.new(0, 0, 8)
local POSITION_WORLD_TOP_SIZE = 6
local INF = 1/0
local NULL_VECTOR = vectorlib.new(0, 0, 0)
local GRENADE_PLAYBACK_PREPARE, GRENADE_PLAYBACK_RUN, GRENADE_PLAYBACK_THROW, GRENADE_PLAYBACK_THROWN, GRENADE_PLAYBACK_FINISHED = 1, 2, 3, 4, 5

local CLR_TEXT_EDIT = {255, 16, 16}

local approach_accurate_Z_OFFSET = 20
local approach_accurate_PLAYER_RADIUS = 16
local approach_accurate_OFFSETS_START = {
    vectorlib.new(approach_accurate_PLAYER_RADIUS*0.7, 0, approach_accurate_Z_OFFSET),
    vectorlib.new(-approach_accurate_PLAYER_RADIUS*0.7, 0, approach_accurate_Z_OFFSET),
    vectorlib.new(0, approach_accurate_PLAYER_RADIUS*0.7, approach_accurate_Z_OFFSET),
    vectorlib.new(0, -approach_accurate_PLAYER_RADIUS*0.7, approach_accurate_Z_OFFSET),
}
local approach_accurate_OFFSETS_END = {
    vectorlib.new(approach_accurate_PLAYER_RADIUS*2, 0, 0),
    vectorlib.new(0, approach_accurate_PLAYER_RADIUS*2, 0),
    vectorlib.new(-approach_accurate_PLAYER_RADIUS*2, 0, 0),
    vectorlib.new(0, -approach_accurate_PLAYER_RADIUS*2, 0),
}

local benchmark = {
    start_times = {},

    measure = function(name, callback, ...)
        if not false then return end

        local start = common.get_unixtime()
        local values = {callback(...)}
        print(string.format("%s took %fms", name, common.get_unixtime()-start))

        return unpack(values)
    end,

    start = function(self, name)
        if not false then return end

        if self.start_times[name] ~= nil then
            client.error_log("benchmark: " .. name .. " wasn't finished before starting again")
        end
        self.start_times[name] = common.get_unixtime()
    end,

    finish = function(self, name)
        if not false then return end

        if self.start_times[name] == nil then
            return
        end

        print(string.format("%s took %fms", name, common.get_unixtime()-self.start_times[name]))
        self.start_times[name] = nil
    end
}

function test_array.get_string(msg, ...)
    local str = ""
    local args = {msg, ...}

    for i = 1, #args do
        str = str .. args[i] .. "\x20"
    end

    return str
end

function test_array.hsv_to_rgb(h, s, v)
    if s == 0 then
        return v, v, v
    end
    h = h / 60

    local hue_sector = math.floor(h)
    local hue_sector_offset = h - hue_sector

    local p = v * (1 - s)
    local q = v * (1 - s * hue_sector_offset)
    local t = v * (1 - s * (1 - hue_sector_offset))

    if hue_sector == 0 then
        return v, t, p
    elseif hue_sector == 1 then
        return q, v, p
    elseif hue_sector == 2 then
        return p, v, t
    elseif hue_sector == 3 then
        return p, q, v
    elseif hue_sector == 4 then
        return t, p, v
    elseif hue_sector == 5 then
        return v, p, q
    end
end

function test_array.rgb_to_hsv(r, g, b)
    local v = math.max(r, g, b)
    local d = v - math.min(r, g, b)

    if 1 > d then
        return 0, 0, v
    end

    if v == 0 then
        return -1, 0, v
    end

    local s = d / v

    local h
    if r == v then
        h = (g - b) / d
    elseif g == v then
        h = 2 + (b - r) / d
    else
        h = 4 + (r - g) / d
    end

    h = h * 60
    if h < 0 then
        h = h + 360
    end

    return h, s, v
end

function test_array.lerp(a, b, percentage)
    return a + (b - a) * percentage
end

function test_array.lerp_color(r1, g1, b1, a1, r2, g2, b2, a2, percentage)
    if percentage == 0 then
        return r1, g1, b1, a1
    elseif percentage == 1 then
        return r2, g2, b2, a2
    end

    local h1, s1, v1 = test_array.rgb_to_hsv(r1, g1, b1)
    local h2, s2, v2 = test_array.rgb_to_hsv(r2, g2, b2)

    local r, g, b = test_array.hsv_to_rgb(test_array.lerp(h1, h2, percentage), test_array.lerp(s1, s2, percentage), test_array.lerp(v1, v2, percentage))
    local a = test_array.lerp(a1, a2, percentage)

    return r, g, b, math.floor(a)
end

function test_array.normalize_angles(pitch, yaw)
    if yaw ~= yaw or yaw == INF then
        yaw = 0
        yaw = yaw
    elseif not (yaw > -180 and yaw <= 180) then
        yaw = math.fmod(math.fmod(yaw + 360, 360), 360)
        yaw = yaw > 180 and yaw-360 or yaw
    end

    return math.max(-89, math.min(89, pitch)), yaw
end

function test_array.deep_flatten(tbl, ignore_arr, out, prefix)
    if out == nil then
        out = {}
        prefix = ""
    end

    for key, value in pairs(tbl) do
        if type(value) == "table" and (not ignore_arr or #value == 0) then
            test_array.deep_flatten(value, ignore_arr, out, prefix .. key .. ".")
        else
            out[prefix .. key] = value
        end
    end

    return out
end

function test_array.deep_compare(tbl1, tbl2)
    if tbl1 == tbl2 then
        return true
    elseif type(tbl1) == "table" and type(tbl2) == "table" then
        for key1, value1 in pairs(tbl1) do
            local value2 = tbl2[key1]

            if value2 == nil then
                return false
            elseif value1 ~= value2 then
                if type(value1) == "table" and type(value2) == "table" then
                    if not test_array.deep_compare(value1, value2) then
                        return false
                    end
                else
                    return false
                end
            end
        end

        for key2, _ in pairs(tbl2) do
            if tbl1[key2] == nil then
                return false
            end
        end

        return true
    end

    return false
end

function test_array.vector2_rotate(angle, x, y)
    local sin = math.sin(angle)
    local cos = math.cos(angle)

    local x_n = x * cos - y * sin
    local y_n = x * sin + y * cos

    return x_n, y_n
end

function test_array.vector2_dist(x1, y1, x2, y2)
    local dx = x2-x1
    local dy = y2-y1

    return math.sqrt(dx*dx + dy*dy)
end

function test_array.triangle_rotated(x, y, width, height, angle, r, g, b, a)
    local a_x, a_y = test_array.vector2_rotate(angle, width / 2, 0)
    local b_x, b_y = test_array.vector2_rotate(angle, 0, height)
    local c_x, c_y = test_array.vector2_rotate(angle, width, height)

    local o_x, o_y = test_array.vector2_rotate(angle, -width / 2, -height / 2)
    x, y = x + o_x, y + o_y

    render.poly(color(r, g, b, math.floor(a*255)), vector(x + a_x, y + a_y), vector(x + b_x, y + b_y), vector(x + c_x, y + c_y))
end

function test_array.randomid(size)
    local str = ""
    for i=1, (size or 32) do
        str = str .. string.char(utils.random_int(97, 122))
    end
    return str
end

local crc32_lt = {}
function test_array.crc32(s, lt)
    lt = lt or crc32_lt
    local b, crc, mask
    if not lt[1] then -- setup table
        for i = 1, 256 do
            crc = i - 1
            for _ = 1, 8 do --eight times
                mask = -bit.band(crc, 1)
                crc = bit.bxor(bit.rshift(crc, 1), bit.band(0xedb88320, mask))
            end
            lt[i] = crc
        end
    end

    -- compute the crc
    crc = 0xffffffff
    for i = 1, #s do
        b = string.byte(s, i)
        crc = bit.bxor(bit.rshift(crc, 8), lt[bit.band(bit.bxor(crc, b), 0xFF) + 1])
    end
    return bit.band(bit.bnot(crc), 0xffffffff)
end

function test_array.is_grenade_being_thrown(weapon, cmd)
    local pin_pulled = weapon["m_bPinPulled"]

    if pin_pulled ~= nil then
        if not pin_pulled or bit.band(cmd.buttons, 1) == 1 or bit.band(cmd.buttons, 2048) == 2048 then
            local throw_time = weapon["m_fThrowTime"]
            if throw_time ~= nil and throw_time > 0 and throw_time < globals.curtime+1 then
                return true
            end
        end
    end
    return false
end

function test_array.trace_line_debug(entindex_skip, sx, sy, sz, tx, ty, tz)
    entindex_skip = type(entindex_skip) == "number" and entity.get(entindex_skip) or entindex_skip

    return utils.trace_line(vector(sx, sy, sz), vector(tx, ty, tz), entindex_skip, 0xFFFFFFFF)
end

function test_array.trace_line_skip_entities(start, target, max_traces)
    max_traces = max_traces or 10
    local fraction, entindex_hit = 0, -1
    local hit = start

    local i = 0
    while max_traces >= i and fraction < 1 and (entindex_hit > -1 or i == 0) do
        local hx, hy, hz = hit:unpack()
        local traced_line = utils.trace_line(vector(hx, hy, hz), vector(target:unpack()), entity.get(entindex_hit), 0xFFFFFFFF)

        fraction, entindex_hit = traced_line.fraction, traced_line.hit_entity == nil and -1 or traced_line.hit_entity:EntIndex()

        hit = hit:lerp(target, fraction)
        i = i + 1
    end

    fraction = start:dist_to(hit) / start:dist_to(target)

    return fraction, entindex_hit, hit
end

local native_GetWorldToScreenMatrix = test_array.vtable_bind("engine.dll", "VEngineClient014", 37, "struct {float m[4][4];}&(__thiscall*)(void*)")

function test_array.render_world_to_screen(w_x, w_y, w_z)
    local w2sMatrix = native_GetWorldToScreenMatrix()

    local x = w2sMatrix.m[0][0] * w_x + w2sMatrix.m[0][1] * w_y + w2sMatrix.m[0][2] * w_z + w2sMatrix.m[0][3]
    local y = w2sMatrix.m[1][0] * w_x + w2sMatrix.m[1][1] * w_y + w2sMatrix.m[1][2] * w_z + w2sMatrix.m[1][3]
    local z = 0.0

    local w = w2sMatrix.m[3][0] * w_x + w2sMatrix.m[3][1] * w_y + w2sMatrix.m[3][2] * w_z + w2sMatrix.m[3][3]

    if (w < 0.001) then
        x = x * 100000
        y = y * 100000

        return 0, 0
    end

    x = x / w
    y = y / w

    local screen = render.screen_size()

    x = (screen.x / 2.0) + (x * screen.x) / 2.0
    y = (screen.y / 2.0) - (y * screen.y) / 2.0

    return x, y
end

function test_array.world_to_screen_offscreen(x, y, z, matrix, screen_width, screen_height)
    matrix = matrix or native_GetWorldToScreenMatrix()

    local wx = matrix.m[0][0] * x + matrix.m[0][1] * y + matrix.m[0][2] * z + matrix.m[0][3]
    local wy = matrix.m[1][0] * x + matrix.m[1][1] * y + matrix.m[1][2] * z + matrix.m[1][3]
    local ww = matrix.m[3][0] * x + matrix.m[3][1] * y + matrix.m[3][2] * z + matrix.m[3][3]

    local in_front
    if ww < 0.001 then
        local invw = -1.0 / ww
        in_front = false
        wx = wx * invw
        wy = wy * invw
    else
        local invw = 1.0 / ww
        in_front = true
        wx = wx * invw
        wy = wy * invw
    end

    if type(wx) ~= "number" or type(wy) ~= "number" then
      return
    end

    if screen_width == nil then
        screen_width, screen_height = render.screen_size().x, render.screen_size().y
    end

    wx = screen_width / 2 + (0.5 * wx * screen_width + 0.5)
    wy = screen_height / 2 - (0.5 * wy * screen_height + 0.5)

    return wx, wy, in_front, ww
end

function test_array.line_intersection(a_s_x, a_s_y, a_e_x, a_e_y, b_s_x, b_s_y, b_e_x, b_e_y)
    local d = (a_s_x - a_e_x) * (b_s_y - b_e_y) - (a_s_y - a_e_y) * (b_s_x - b_e_x)
    local a = a_s_x * a_e_y - a_s_y * a_e_x
    local b = b_s_x * b_e_y - b_s_y * b_e_x
    local x = (a * (b_s_x - b_e_x) - (a_s_x - a_e_x) * b) / d
    local y = (a * (b_s_y - b_e_y) - (a_s_y - a_e_y) * b) / d
    return x, y
end

function test_array.world_to_screen_offscreen_rect(x, y, z, matrix, screen_width, screen_height, cd)
    local wx, wy, in_front = test_array.world_to_screen_offscreen(x, y, z, matrix, screen_width, screen_height)

    if wx == nil then
        return
    end

    if not in_front or cd > wx or wx > screen_width-cd or cd > wy or wy > screen_height-cd then
        local cx, cy = screen_width/2, screen_height/2
        if not in_front then
            local angle = math.atan2(wy-cy, wx-cx)
            local radius = math.max(screen_width, screen_height)
            wx = cx + radius * math.cos(angle)
            wy = cy + radius * math.sin(angle)
        end

        local border_vectors = {
            cd, cd, screen_width-cd, cd,
            screen_width-cd, cd, screen_width-cd, screen_height-cd,
            cd, cd, cd, screen_height-cd,
            cd, screen_height-cd, screen_width-cd, screen_height-cd
        }

        for i=1, #border_vectors, 4 do
            local s_x, s_y, e_x, e_y = border_vectors[i], border_vectors[i+1], border_vectors[i+2], border_vectors[i+3]
            local i_x, i_y = test_array.line_intersection(s_x, s_y, e_x, e_y, cx, cy, wx, wy)

            if (i == 1 and wy < cd and i_x >= cd and i_x <= screen_width-cd) or
                 (i == 5 and wx > screen_width-cd and i_y >= cd and i_y <= screen_height-cd) or
                 (i == 9 and wx < cd and i_y >= cd and i_y <= screen_height-cd) or
                 (i == 13 and wy > screen_height-cd and i_x >= cd and i_x <= screen_width-cd) then
                return i_x, i_y, false
            end
        end

        return wx, wy, false
    end

    return wx, wy, true
end

local MOVEMENT_BUTTONS_CHARS_INV = test_array.table_map_assoc(MOVEMENT_BUTTONS_CHARS, function(k, v) return v, k end)

function test_array.parse_buttons_str(str)
    local buttons_down, buttons_up = {}, {}

    for c in str:gmatch(".") do
        if c:lower() == c then
            table.insert(buttons_up, MOVEMENT_BUTTONS_CHARS_INV[c:upper()] or false)
        else
            table.insert(buttons_down, MOVEMENT_BUTTONS_CHARS_INV[c] or false)
        end
    end

    return buttons_down, buttons_up
end

function test_array.sanitize_string(str)
    str = tostring(str)
    str = str:gsub('[%c]', '')

    return str
end

local js_api = {
    get_timestamp = function()
        return common.get_unixtime()
    end,

    format_timestamp = function(timestamp)
        local day_count, year, days, month = function(yr) return (yr % 4 == 0 and (yr % 100 ~= 0 or yr % 400 == 0)) and 366 or 365 end, 1970, math.ceil(timestamp/86400)

        while days >= day_count(year) do
            days = days - day_count(year) year = year + 1
        end

        local tab_overflow = function(seed, table)
            for i = 1, #table do
                if seed - table[i] <= 0 then
                    return i, seed
                end

                seed = seed - table[i]
            end
        end

        month, days = tab_overflow(days, {31, (day_count(year) == 366 and 29 or 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31})

        local hours, minutes, seconds = math.floor(timestamp / 3600 % 24), math.floor(timestamp / 60 % 60), math.floor(timestamp % 60)
        local period = hours > 12 and "pm" or "am"

        return string.format("%d/%d/%04d %02d:%02d", days, month, year, hours, minutes)
    end
}

local format_timestamp = setmetatable({}, {
    __index = function(tbl, ts)
        tbl[ts] = js_api.format_timestamp(ts)
        return tbl[ts]
    end
})

local realtime_offset = js_api.get_timestamp() - globals.realtime

function test_array.format_duration(secs, ignore_seconds, max_parts)
    local units, dur, part = {"day", "hour", "minute"}, "", 1
    max_parts = max_parts or 4

    for i, v in ipairs({86400, 3600, 60}) do
        if part > max_parts then
            break
        end

        if secs >= v then
            dur = dur .. math.floor(secs / v) .. " " .. units[i] .. (math.floor(secs / v) > 1 and "s" or "") .. ", "
            secs = secs % v
            part = part + 1
        end
    end

    if secs == 0 or ignore_seconds or part > max_parts then
        return dur:sub(1, -3)
    else
        secs = math.floor(secs)
        return dur .. secs .. (secs > 1 and " seconds" or " second")
    end
end

function test_array.get_unix_timestamp()
    return globals.realtime + realtime_offset
end

function test_array.format_unix_timestamp(timestamp, allow_future, ignore_seconds, max_parts)
    local secs = timestamp - test_array.get_unix_timestamp()

    if secs < 0 or allow_future then
        local duration = test_array.format_duration(math.abs(secs), ignore_seconds, max_parts)
        return secs > 0 and ("In " .. duration) or (duration .. " ago")
    else
        return format_timestamp[timestamp]
    end
end

local native_GetClipboardTextCount = test_array.vtable_bind("vgui2.dll", "VGUI_System010", 7, "int(__thiscall*)(void*)")
local native_SetClipboardText = test_array.vtable_bind("vgui2.dll", "VGUI_System010", 9, "void(__thiscall*)(void*, const char*, int)")
local native_GetClipboardText = test_array.vtable_bind("vgui2.dll", "VGUI_System010", 11, "int(__thiscall*)(void*, int, const char*, int)")

local new_char_arr = ffi.typeof("char[?]")

function test_array.get_clipboard_text()
    local len = native_GetClipboardTextCount()
    if len > 0 then
        local char_arr = new_char_arr(len)
        native_GetClipboardText(0, char_arr, len)
        return ffi.string(char_arr, len-1)
    end
end

function test_array.set_clipboard_text(text)
    native_SetClipboardText(text, text:len())
end

function test_array.calculate_move(btn1, btn2)
    return btn1 and 450 or (btn2 and -450 or 0)
end

function test_array.compress_usercmds(usercmds)
    local frames = {}

    local current = {
        viewangles = {pitch=usercmds[1].pitch, yaw=usercmds[1].yaw},
        buttons = {}
    }

    -- initialize all buttons as false
    for key, char in pairs(MOVEMENT_BUTTONS_CHARS) do
        current.buttons[key] = false
    end

    local empty_count = 0
    for i, cmd in ipairs(usercmds) do
        local buttons = ""

        for btn, value_prev in pairs(current.buttons) do
            if cmd[btn] and not value_prev then
                buttons = buttons .. MOVEMENT_BUTTONS_CHARS[btn]
            elseif not cmd[btn] and value_prev then
                buttons = buttons .. MOVEMENT_BUTTONS_CHARS[btn]:lower()
            end
            current.buttons[btn] = cmd[btn]
        end

        local frame = {cmd.pitch-current.viewangles.pitch, cmd.yaw-current.viewangles.yaw, buttons, cmd.forwardmove, cmd.sidemove}
        current.viewangles = {pitch=cmd.pitch, yaw=cmd.yaw}

        if frame[#frame] == test_array.calculate_move(cmd.in_moveright, cmd.in_moveleft) then
            frame[#frame] = nil

            if frame[#frame] == test_array.calculate_move(cmd.in_forward, cmd.in_back) then
                frame[#frame] = nil

                if frame[#frame] == "" then
                    frame[#frame] = nil

                    if frame[#frame] == 0 then
                        frame[#frame] = nil

                        if frame[#frame] == 0 then
                            frame[#frame] = nil
                        end
                    end
                end
            end
        end

        if #frame > 0 then
            -- first frame after a bunch of empty frames
            if empty_count > 0 then
                table.insert(frames, empty_count)
                empty_count = 0
            end

            -- insert frame normally
            table.insert(frames, frame)
        else
            empty_count = empty_count + 1
        end
    end

    if empty_count > 0 then
        table.insert(frames, empty_count)
        empty_count = 0
    end

    return frames
end

function test_array.get_map_pattern()
    local world = entity.get(0)
    if world == nil then return end
    local mins = world["m_WorldMins"]
    local maxs = world["m_WorldMaxs"]

    local str
    if mins ~= NULL_VECTOR or maxs ~= NULL_VECTOR then
        str = string.format("bomb_%.2f_%.2f_%.2f %.2f_%.2f_%.2f", mins.x, mins.y, mins.z, maxs.x, maxs.y, maxs.z)
    end

    if str ~= nil then
        return test_array.crc32(str)
    end

    return nil
end

local MAP_PATTERNS = {
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
    [-923663825]  = "dz_frostbite",
    [-768791216]  = "de_dust2",
    [-692592072]  = "cs_italy",
    [-542128589]  = "ar_monastery",
    [-222265935]  = "ar_baggage",
    [-182586077]  = "de_aztec",
    [371013699]   = "de_stmarc",
    [405708653]   = "de_overpass",
    [549370830]   = "de_lake",
    [790893427]   = "dz_sirocco",
    [792319475]   = "de_ancient",
    [878725495]   = "de_bank",
    [899765791]   = "de_safehouse",
    [1014664118]  = "cs_office",
    [1238495690]  = "ar_dizzy",
    [1364328969]  = "cs_militia",
    [1445192006]  = "de_engage",
    [1463756432]  = "cs_assault",
    [1476824995]  = "de_vertigo",
    [1507960924]  = "cs_agency",
    [1563115098]  = "de_nuke",
    [1722587796]  = "de_dust2_old",
    [1850283081]  = "de_anubis",
    [1900771637]  = "de_cache",
    [1964982021]  = "de_elysion",
    [2041417734]  = "de_cbble",
    [2056138930]  = "gd_rialto",
}

local MAP_LOOKUP = {
    de_shortnuke = "de_nuke",
    de_shortdust = "de_shortnuke",
    ["workshop/533515529/bot_aimtrain_textured_v1"] = "bot_aimtrain_textured_v1 "
}

local mapname_cache = {}
function test_array.get_mapname()
    if common.get_map_data() == nil then
        client.error_log('Only available on the map')
        return
    end
    local mapname_raw = common.get_map_data()['shortname']

    if mapname_raw == nil then
        return
    end

    if mapname_cache[mapname_raw] == nil then
        -- clean up mapname
        local mapname = mapname_raw:gsub("_scrimmagemap$", "")

        if MAP_LOOKUP[mapname] ~= nil then
            -- we have a hardcoded alias for this map
            mapname = MAP_LOOKUP[mapname]
        else
            local is_first_party_map = false
            for key, value in pairs(MAP_PATTERNS) do
                if value == mapname then
                    is_first_party_map = true
                    break
                end
            end

            -- try and find mapname based on patterns if its not a first-party map
            if not is_first_party_map then
                local pattern = test_array.get_map_pattern()

                if MAP_PATTERNS[pattern] ~= nil then
                    mapname = MAP_PATTERNS[pattern]
                end
            end
        end

        mapname_cache[mapname_raw] = mapname
    end

    return mapname_cache[mapname_raw]
end

benchmark:start("db_read")
local db = database.read("helper_db") or {}
db.sources = db.sources or {}
benchmark:finish("db_read")

local default_sources = {
    {
        name = "HvH locations",
        id = "hvh_locations",
        type = "remote",
        url = "https://raw.githubusercontent.com/DarkLuny/helper-locations/main/HvH%20Locations.json",
        description = "HvH",
        builtin = false
    }
}

local removed_sources = {
    builtin_local_file = true,
    builtin_hvh = true
}

for i=1, #default_sources do
    removed_sources[default_sources[i].id] = true
end

for i=#db.sources, 1, -1 do
    local source = db.sources[i]

    if source ~= nil and removed_sources[source.id] then
        table.remove(db.sources, i)
    end
end

for i=1, #default_sources do
    if db.sources[i] == nil or db.sources[i].id ~= default_sources[i].id then
        table.insert(db.sources, i, default_sources[i])
    end
end

if files.read(game_dir.."/helper_data.json") ~= '' and files.read(game_dir.."/helper_data.json") then
    table.insert(db.sources, {
        name = "helper_data.json",
        id = "builtin_local_file",
        type = "local_file",
        filename = "helper_data.json",
        description = "Local file",
        builtin = true
    })

    local store_db = (database.read("helper_store") or {})
    store_db.locations = store_db.locations or {}
    store_db.locations["builtin_local_file"] = {}
end

local sources_locations = {}
local update_sources_ui, edit_set_ui_values
local map_locations, active_locations = {}

function test_array.flush_active_locations(reason)
    active_locations = nil
    test_array.table_clear(map_locations)
end

local tickrates_mt = {
    __index = function(tbl, key)
        if tbl.tickrate ~= nil then
            return key / tbl.tickrate
        end
    end
}

local location_mt = {
    __index = {
        get_type_string = function(self)
            if self.type == "grenade" then
                local names = test_array.table_map(self.weapons, function(weapon) return GRENADE_WEAPON_NAMES[weapon] end)
                return table.concat(names, "/")
            else
                return LOCATION_TYPE_NAMES[self.type] or self.type
            end
        end,
        get_export_tbl = function(self)
            local tbl = {
                name = (self.name == self.full_name) and self.name or {self.full_name:match("^(.*) to (.*)$")},
                description = self.description,
                weapon = #self.weapons == 1 and self.weapons[1].console_name or test_array.table_map(self.weapons, function(weapon) return weapon.console_name end),
                position = {self.position.x, self.position.y, self.position.z},
                viewangles = {self.viewangles.pitch, self.viewangles.yaw},
            }

            if getmetatable(self.tickrates) == tickrates_mt then
                if self.tickrates.tickrate_set then
                    tbl.tickrate = self.tickrates.tickrate
                end
            elseif self.tickrates.orig ~= nil then
                tbl.tickrate = self.tickrates.orig
            end

            if self.approach_accurate ~= nil then
                tbl.approach_accurate = self.approach_accurate
            end

            if self.duckamount ~= 0 then
                tbl.duck = self.duckamount == 1 and true or self.duckamount
            end

            if self.position_visibility_different then
                tbl.position_visibility = {
                    self.position_visibility.x-self.position.x,
                    self.position_visibility.y-self.position.y,
                    self.position_visibility.z-self.position.z
                }
            end

            if self.type == "grenade" then
                tbl.grenade = {
                    fov = self.fov ~= DEFAULTS.fov and self.fov or nil,
                    jump = self.jump and true or nil,
                    strength = self.throw_strength ~= 1 and self.throw_strength or nil,
                    run = self.run_duration ~= nil and self.run_duration or nil,
                    run_yaw = self.run_yaw ~= self.viewangles.yaw and self.run_yaw-self.viewangles.yaw or nil,
                    run_speed = self.run_speed ~= nil and self.run_speed or nil,
                    recovery_yaw = self.recovery_yaw ~= nil and self.recovery_yaw-self.run_yaw or nil,
                    recovery_jump = self.recovery_jump and true or nil,
                    delay = self.delay > 0 and self.delay or nil
                }

                if next(tbl.grenade) == nil then
                    tbl.grenade = nil
                end
            elseif self.type == "movement" then
                local frames = {}
                tbl.movement = {
                    frames = test_array.compress_usercmds(self.movement_commands)
                }
            end

            if self.destroy_text ~= nil then
                tbl.destroy = {
                    ["start"] = self.destroy_start and {self.destroy_start:unpack()} or nil,
                    ["end"] = {self.destroy_end:unpack()},
                    ["text"] = self.destroy_text ~= DEFAULTS.destroy_text and self.destroy_text or nil,
                }
            end

            return tbl
        end,
        get_export = function(self, fancy)
            local tbl = self:get_export_tbl()
            local indent = "  "

            local json_str
            if fancy then
                local default_keys, default_fancy = {"name", "description", "weapon", "position", "viewangles", "position_visibility", "grenade"}, {["grenade"] = 1}
                local result = {}

                for i=1, #default_keys do
                    local key = default_keys[i]
                    local value = tbl[key]
                    if value ~= nil then
                        local str = default_fancy[key] == 1 and pretty_json.stringify(value, "\n", indent) or json.encode(value)

                        if type(value[1]) == "number" and type(value[2]) == "number" and (value[3] == nil or type(value[3]) == "number") then
                            str = str:gsub(",", ", ")
                        else
                            str = str:gsub("\",\"", "\", \"")
                        end

                        table.insert(result, string.format("\"%s\": %s", key, str))
                        tbl[key] = nil
                    end
                end

                for key, value in pairs(tbl) do
                    table.insert(result, string.format("\"%s\": %s", key, pretty_json.stringify(tbl[key], "\n", indent)))
                end

                json_str = "{\n" .. indent .. table.concat(result, ",\n"):gsub("\n", "\n" .. indent) .. "\n}"
            else
                json_str = json.encode(tbl)
            end

            return json_str
        end
    }
}

function test_array.create_location(location_parsed)
    if type(location_parsed) ~= "table" then
        return "wrong type, expected table"
    end

    if getmetatable(location_parsed) == location_mt then
        return "trying to create an already created location"
    end

    local location = {}

    if type(location_parsed.name) == "string" and location_parsed.name:len() > 0 then
        location.name = test_array.sanitize_string(location_parsed.name)
        location.full_name = location.name
    elseif type(location_parsed.name) == "table" and #location_parsed.name == 2 then
        location.name = test_array.sanitize_string(location_parsed.name[2])
        location.full_name = test_array.sanitize_string(string.format("%s to %s", location_parsed.name[1], location_parsed.name[2]))
    else
        return "invalid name, expected string or table of length 2"
    end

    if type(location_parsed.description) == "string" and location_parsed.description:len() > 0 then
        location.description = location_parsed.description
    elseif location_parsed.description ~= nil then
        return "invalid description, expected nil or non-empty string"
    end

    if type(location_parsed.weapon) == "string" and weapons[location_parsed.weapon] ~= nil then
        location.weapons = {weapons[location_parsed.weapon]}
        location.weapons_assoc = {[location_parsed.weapon] = true}
    elseif type(location_parsed.weapon) == "table" and #location_parsed.weapon > 0 then
        location.weapons = {}
        location.weapons_assoc = {}

        for i=1, #location_parsed.weapon do
            local weapon = weapons[location_parsed.weapon[i]]

            if weapon ~= nil then
                if location.weapons_assoc[weapon] then
                    return "duplicate weapon: " .. location_parsed.weapon[i]
                else
                    location.weapons[i] = weapon
                    location.weapons_assoc[weapon] = true
                end
            else
                return "invalid weapon: " .. location_parsed.weapon[i]
            end
        end
    else
        return string.format("invalid weapon (%s)", tostring(location_parsed.weapon))
    end

    if type(location_parsed.position) == "table" and #location_parsed.position == 3 then
        local x, y, z = unpack(location_parsed.position)

        if type(x) == "number" and type(y) == "number" and type(z) == "number" then
            location.position = vectorlib.new(x, y, z)
            location.position_visibility = location.position + DEFAULTS.visibility_offset
            location.position_id = VECTOR_INDEX[location.position]
        else
            return "invalid type in position"
        end
    else
        return "invalid position"
    end

    if type(location_parsed.position_visibility) == "table" and #location_parsed.position_visibility == 3 then
        local x, y, z = unpack(location_parsed.position_visibility)

        if type(x) == "number" and type(y) == "number" and type(z) == "number" then
            local origin = location.position
            location.position_visibility = vectorlib.new(origin.x+x, origin.y+y, origin.z+z)
            location.position_visibility_different = true
        else
            return "invalid type in position_visibility"
        end
    elseif location_parsed.position_visibility ~= nil then
        return "invalid position_visibility"
    end

    if type(location_parsed.viewangles) == "table" and #location_parsed.viewangles == 2 then
        local pitch, yaw = unpack(location_parsed.viewangles)

        if type(pitch) == "number" and type(yaw) == "number" then
            location.viewangles = {
                pitch = pitch,
                yaw = yaw
            }
            location.viewangles_forward = vectorlib.new():init_from_angles(pitch, yaw)
        else
            return "invalid type in viewangles"
        end
    else
        return "invalid viewangles"
    end

    if type(location_parsed.approach_accurate) == "boolean" then
        location.approach_accurate = location_parsed.approach_accurate
    elseif location_parsed.approach_accurate ~= nil then
        return "invalid approach_accurate"
    end

    if location_parsed.duck == nil or type(location_parsed.duck) == "boolean" then
        location.duckamount = location_parsed.duck and 1 or 0
    else
        return string.format("invalid duck value (%s)", tostring(location_parsed.duck))
    end
    location.eye_pos = location.position + vectorlib.new(0, 0, 64-location.duckamount*18)

    if (type(location_parsed.tickrate) == "number" and location_parsed.tickrate > 0) or location_parsed.tickrate == nil then
        location.tickrates = setmetatable({
            tickrate = location_parsed.tickrate or 64,
            tickrate_set = location_parsed.tickrate ~= nil
        }, tickrates_mt)
    elseif type(location_parsed.tickrate) == "table" and #location_parsed.tickrate > 0 then
        location.tickrates = {
            orig = location_parsed.tickrate
        }

        local orig_tickrate

        for i=1, #location_parsed.tickrate do
            local tickrate = location_parsed.tickrate[i]
            if type(tickrate) == "number" and tickrate > 0 then
                if orig_tickrate == nil then
                    orig_tickrate = tickrate
                    location.tickrates[tickrate] = 1
                else
                    location.tickrates[tickrate] = orig_tickrate/tickrate
                end
            else
                return "invalid tickrate: " .. tostring(location_parsed.tickrate[i])
            end
        end
    else
        return string.format("invalid tickrate (%s)", tostring(location_parsed.tickrate))
    end

    if type(location_parsed.target) == "table" then
        local x, y, z = unpack(location_parsed.target)

        if type(x) == "number" and type(y) == "number" and type(z) == "number" then
            location.target = vectorlib.new(x, y, z)
        else
            return "invalid type in target"
        end
    elseif location_parsed.target ~= nil then
        return "invalid target"
    end

    -- ensure they're all a grenade or none a grenade, then determine type
    local has_grenade, has_non_grenade
    for i=1, #location.weapons do
        if location.weapons[i].type == "grenade" then
            has_grenade = true
        else
            has_non_grenade = true
        end
    end

    if has_grenade and has_non_grenade then
        return "can't have grenade and non-grenade in one location"
    end

    if location_parsed.movement ~= nil then
        location.type = "movement"
        location.fov = DEFAULTS.fov_movement
    elseif has_grenade then
        location.type = "grenade"
        location.throw_strength = 1
        location.fov = DEFAULTS.fov
        location.delay = 0
        location.jump = false
        location.run_yaw = location.viewangles.yaw
    elseif has_non_grenade then
        location.type = "wallbang"
    else
        return "invalid type"
    end

    if location.viewangles_forward ~= nil and location.eye_pos ~= nil then
        local viewangles_target = location.eye_pos + location.viewangles_forward * 700
        local fraction, entindex_hit, vec_hit = test_array.trace_line_skip_entities(location.eye_pos, viewangles_target, 2)
        location.viewangles_target = fraction > 0.05 and vec_hit or viewangles_target
    end

    if location.type == "grenade" and type(location_parsed.grenade) == "table" then
        local grenade = location_parsed.grenade
        if type(grenade.strength) == "number" and grenade.strength >= 0 and grenade.strength <= 1 then
            location.throw_strength = grenade.strength
        elseif grenade.strength ~= nil then
            return string.format("invalid grenade.strength (%s)", tostring(grenade.strength))
        end

        if type(grenade.delay) == "number" and grenade.delay > 0 then
            location.delay = grenade.delay
        elseif grenade.delay ~= nil then
            return string.format("invalid grenade.delay (%s)", tostring(grenade.delay))
        end

        if type(grenade.fov) == "number" and grenade.fov >= 0 and grenade.fov <= 180 then
            location.fov = grenade.fov
        elseif grenade.fov ~= nil then
            return string.format("invalid grenade.fov (%s)", tostring(grenade.fov))
        end

        if type(grenade.jump) == "boolean" then
            location.jump = grenade.jump
        elseif grenade.jump ~= nil then
            return string.format("invalid grenade.jump (%s)", tostring(grenade.jump))
        end

        if type(grenade.run) == "number" and grenade.run > 0 and grenade.run < 512 then
            location.run_duration = grenade.run
        elseif grenade.run ~= nil then
            return string.format("invalid grenade.run (%s)", tostring(grenade.run))
        end

        if type(grenade.run_yaw) == "number" and grenade.run_yaw >= -180 and grenade.run_yaw <= 180 then
            location.run_yaw = location.viewangles.yaw + grenade.run_yaw
        elseif grenade.run_yaw ~= nil then
            return string.format("invalid grenade.run_yaw (%s)", tostring(grenade.run_yaw))
        end

        if type(grenade.run_speed) == "boolean" then
            location.run_speed = grenade.run_speed
        elseif grenade.run_speed ~= nil then
            return "invalid grenade.run_speed"
        end

        if type(grenade.recovery_yaw) == "number" then
            location.recovery_yaw = location.run_yaw + grenade.recovery_yaw
        elseif grenade.recovery_yaw ~= nil then
            return "invalid grenade.recovery_yaw"
        end

        if type(grenade.recovery_jump) == "boolean" then
            location.recovery_jump = grenade.recovery_jump
        elseif grenade.recovery_jump ~= nil then
            return "invalid grenade.recovery_jump"
        end
    elseif location_parsed.grenade ~= nil then
        return "invalid grenade"
    end

    if location.type == "movement" and type(location_parsed.movement) == "table" then
        local movement = location_parsed.movement

        if type(movement.fov) == "number" and movement.fov > 0 and movement.fov < 360 then
            location.fov = movement.fov
        end

        if type(movement.frames) == "table" then
            local frames = {}

            for i, frame in ipairs(movement.frames) do
                if type(frame) == "number" then
                    if movement.frames[i] > 0 then
                        for j=1, frame do
                            table.insert(frames, {})
                        end
                    else
                        return "invalid frame " .. tostring(i)
                    end
                elseif type(frame) == "table" then
                    table.insert(frames, frame)
                end
            end

            local current = {
                viewangles = {pitch=location.viewangles.pitch, yaw=location.viewangles.yaw},
                buttons = {}
            }

            for key, char in pairs(MOVEMENT_BUTTONS_CHARS) do
                current.buttons[key] = false
            end

            for i, value in ipairs(frames) do
                local pitch, yaw, buttons, forwardmove, sidemove = unpack(value)

                if pitch ~= nil and type(pitch) ~= "number" then
                    return string.format("invalid pitch in frame #%d", i)
                elseif yaw ~= nil and type(yaw) ~= "number" then
                    return string.format("invalid yaw in frame #%d", i)
                end

                current.viewangles.pitch = current.viewangles.pitch + (pitch or 0)
                current.viewangles.yaw = current.viewangles.yaw + (yaw or 0)

                -- update buttons
                if type(buttons) == "string" then
                    local buttons_down, buttons_up = test_array.parse_buttons_str(buttons)

                    local buttons_seen = {}
                    for _, btn in ipairs(buttons_down) do
                        if btn == false then
                            return string.format("invalid button in frame #%d", i)
                        elseif buttons_seen[btn] then
                            return string.format("invalid frame #%d: duplicate button %s", i, btn)
                        end
                        buttons_seen[btn] = true
                        current.buttons[btn] = true
                    end

                    for _, btn in ipairs(buttons_up) do
                        if btn == false then
                            return string.format("invalid button in frame #%d", i)
                        elseif buttons_seen[btn] then
                            return string.format("invalid frame #%d: duplicate button %s", i, btn)
                        end
                        buttons_seen[btn] = true
                        current.buttons[btn] = false
                    end
                elseif buttons ~= nil then
                    return string.format("invalid buttons in frame #%d", i)
                end

                if type(forwardmove) == "number" and forwardmove >= -450 and forwardmove <= 450 then
                    current.forwardmove = forwardmove
                elseif forwardmove ~= nil then
                    return string.format("invalid forwardmove in frame #%d: %s", i, tostring(forwardmove))
                else
                    current.forwardmove = test_array.calculate_move(current.buttons.in_forward, current.buttons.in_back)
                end

                if type(sidemove) == "number" and sidemove >= -450 and sidemove <= 450 then
                    current.sidemove = sidemove
                elseif sidemove ~= nil then
                    return string.format("invalid sidemove in frame #%d: %s", i, tostring(sidemove))
                else
                    current.sidemove = test_array.calculate_move(current.buttons.in_moveright, current.buttons.in_moveleft)
                end

                frames[i] = {
                    pitch = current.viewangles.pitch,
                    yaw = current.viewangles.yaw,
                    move_yaw = current.viewangles.yaw,
                    forwardmove = current.forwardmove,
                    sidemove = current.sidemove
                }

                for btn, value in pairs(current.buttons) do
                    frames[i][btn] = value
                end
            end

            location.movement_commands = frames
        else
            return "invalid movement.frames"
        end
    elseif location_parsed.movement ~= nil then
        return "invalid movement"
    end

    if type(location_parsed.destroy) == "table" then
        local destroy = location_parsed.destroy
        location.destroy_text = "Break the object"

        if type(destroy.start) == "table" then
            local x, y, z = unpack(destroy.start)

            if type(x) == "number" and type(y) == "number" and type(z) == "number" then
                location.destroy_start = vectorlib.new(x, y, z)
            else
                return "invalid type in destroy.start"
            end
        elseif destroy.start ~= nil then
            return "invalid destroy.start"
        end

        if type(destroy["end"]) == "table" then
            local x, y, z = unpack(destroy["end"])

            if type(x) == "number" and type(y) == "number" and type(z) == "number" then
                location.destroy_end = vectorlib.new(x, y, z)
            else
                return "invalid type in destroy.end"
            end
        else
            return "invalid destroy.end"
        end

        if type(destroy.text) == "string" and destroy.text:len() > 0 then
            location.destroy_text = destroy.text
        elseif destroy.text ~= nil then
            return "invalid destroy.text"
        end
    elseif location_parsed.destroy ~= nil then
        return "invalid destroy"
    end

    return setmetatable(location, location_mt)
end

function test_array.parse_and_create_locations(table_or_json, mapname)
    local locations_parsed
    if type(table_or_json) == "string" then
        local success
        success, locations_parsed = pcall(json.parse, table_or_json)

        if not success then
            error(locations_parsed)
            return
        end
    elseif type(table_or_json) == "table" then
        locations_parsed = table_or_json
    else
        assert(false)
    end

    if type(locations_parsed) ~= "table" then
        error(string.format("invalid type %s, expected table", type(locations_parsed)))
        return
    end

    local locations = {}
    for i=1, #locations_parsed do
        local location = test_array.create_location(locations_parsed[i])

        if type(location) == "table" then
            table.insert(locations, location)
        else
            error(location or "failed to parse")
            return
        end
    end

    return locations
end

function test_array.export_locations(tbl, fancy)
    local indent = "  "
    local result = {}

    for i=1, #tbl do
        local str = tbl[i]:get_export(fancy)
        if fancy then
            str = indent .. str:gsub("\n", "\n" .. indent)
        end
        table.insert(result, str)
    end

    return (fancy and "[\n" or "[") .. table.concat(result, fancy and ",\n" or ",") .. (fancy and "\n]" or "]")
end

function test_array.sort_by_distsqr(a, b)
    return a.distsqr > b.distsqr
end

function test_array.source_get_index_data(url, callback)
    http:get(url:gsub("^https://raw.githubusercontent.com/", "https://combinatronics.com/"), function(response)
        local data = {}
    
        if not response:success() or response.status ~= 200 or response.body == "404: Not Found" then
            if response.body == "404: Not Found" then
                callback("404 - Not Found")
                print("404 - Not Found")
            else
                callback(string.format("%s - %s", response.status, response.status_message))
                print(string.format("%s - %s", response.status, response.status_message))
            end

            return
        end

        local valid_json, jso = pcall(json.parse, response.body)
    
        if not valid_json then
            callback("Invalid JSON: " .. jso)
            print("Invalid JSON: " .. jso)
            return
        end

        -- name is always required
        if type(jso.name) == "string" then
            data.name = jso.name
        else
            callback("Invalid name")
            print("Invalid name")
            return
        end

        -- description can be nil or string
        if jso.description == nil or type(jso.description) == "string" then
            data.description = jso.description
        else
            callback("Invalid description")
            print("Invalid description")
            return
        end

        -- update_timestamp can be nil or number
        if jso.update_timestamp == nil or type(jso.update_timestamp) == "number" then
            data.update_timestamp = jso.update_timestamp
        else
            callback("Invalid update_timestamp")
            print("Invalid update_timestamp")
            return
        end

        if jso.url_format ~= nil then
            if type(jso.url_format) ~= "string" or not jso.url_format:match("^https?://.+$") then
                callback("Invalid url_format")
                print("Invalid url_format")
                return
            end

            if not jso.url_format:find("%%map%%") then
                callback("Invalid url_format - %map% is required")
                print("Invalid url_format - %map% is required")
                return
            end

            data.url_format = jso.url_format
        else
            data.url_format = nil
        end
        data.location_aliases = {}
        data.locations = {}
        if type(jso.locations) == "table" then
            for map, map_data in pairs(jso.locations) do
                if type(map) ~= "string" then
                    callback("Invalid key in locations")
                    print("Invalid key in locations")
                    return
                end

                if type(map_data) == "string" then
                    -- this is an alias
                    data.location_aliases[map] = map_data
                elseif type(map_data) == "table" then
                    data.locations[map] = map_data
                elseif jso.url_format ~= nil then
                    callback("Location data is forbidden for split locations")
                    return
                end
            end
        elseif jso.locations ~= nil then
            callback("Invalid locations")
            print("Invalid locations")
            return
        end

        if next(data.location_aliases) == nil then
            data.location_aliases = nil
        end

        if next(data.locations) == nil then
            data.locations = nil
        end

        data.last_updated = test_array.get_unix_timestamp()

        callback(nil, data)
    end)
end
ui.sidebar('\aEAD1FFFF.gg/chernobylnl', 'bomb')

local group = ui.create('Main', "\a7878FFFFHelper")
local group1 = ui.create('Manager', "\a7878FFFFA")
local group2 = ui.create('Manager', "\a7878FFFFB")

local source_mt = {
    __index = {
        update_remote_data = function(self)
            if not self.type == "remote" or self.url == nil then
                return
            end
        
            self.remote_status = "Loading index data..."
            test_array.source_get_index_data(self.url, function(err, data)
                if err ~= nil then
                    self.remote_status = string.format("Error: %s", err)
                    update_sources_ui()
                    return
                end
                self.last_updated = data.last_updated

                if self.last_updated == nil then
                    self.remote_status = "Index data refreshed"
                    update_sources_ui()
                    self.remote_status = nil
                else
                    self.remote_status = nil
                    update_sources_ui()
                end

                local keys = {"name", "description", "update_timestamp", "url_format"}
                for i=1, #keys do
                    self[keys[i]] = data[keys[i]]
                end

                -- new url
                if data.url ~= nil and data.url ~= self.url then
                    self.url = data.url
                    self:update_remote_data()
                    return
                end

                local current_map_name = test_array.get_mapname()
                sources_locations[self] = nil
                local success1, message1 = pcall(database.read("helper_store"))

                local store_db_locations = (database.read("helper_store") or {})["locations"]
                if store_db_locations ~= nil and type(store_db_locations[self.id]) == "table" then
                    store_db_locations[self.id] = {}
                end
                test_array.flush_active_locations("update_remote_data")

                if data.locations ~= nil then
                    sources_locations[self] = {}
                    for map, locations_unparsed in pairs(data.locations) do
                        local success, locations = pcall(test_array.parse_and_create_locations, locations_unparsed, map)
                        if not success then
                            self.remote_status = string.format("Invalid map data: %s", locations)
                            client.error_log(string.format("Failed to load map data for %s (%s): %s", self.name, map, locations))
                            update_sources_ui()
                            return
                        end

                        sources_locations[self][map] = locations
                        self:store_write(map)

                        if map == current_map_name then
                            test_array.flush_active_locations("B")
                        else
                            sources_locations[self][map] = nil
                        end
                    end
                end
            end)
        end,
        store_read = function(self, mapname)
            if mapname == nil then
                local store_db_locations = (database.read("helper_store") or {})["locations"]
                if store_db_locations ~= nil and type(store_db_locations[self.id]) == "table" then
                    for mapname, _ in pairs(store_db_locations[self.id]) do
                        self:store_read(mapname)
                    end
                end
                return
            end

            local store_db_locations = (database.read("helper_store") or {})["locations"]
            if store_db_locations ~= nil and type(store_db_locations[self.id]) == "table" and type(store_db_locations[self.id][mapname]) == "string" then
                local success, locations = pcall(test_array.parse_and_create_locations, store_db_locations[self.id][mapname], mapname)

                if not success then
                    self.remote_status = string.format("Invalid map data for %s in database: %s", mapname, locations)
                    client.error_log(string.format("Invalid map data for %s (%s) in database: %s", self.name, mapname, locations))
                    update_sources_ui()
                else
                    sources_locations[self][mapname] = locations
                end
            end
        end,
        store_write = function(self, mapname)
            if mapname == nil then
                if sources_locations[self] ~= nil then
                    for mapname, _ in pairs(sources_locations[self]) do
                        self:store_write(mapname)
                    end
                end
                return
            end
            local store_db = (database.read("helper_store") or {})
            store_db.locations = store_db.locations or {}
            store_db.locations[self.id] = store_db.locations[self.id] or {}
            store_db.locations[self.id][mapname] = test_array.export_locations(sources_locations[self][mapname])

            database.write("helper_store", store_db)
        end,
        get_locations = function(self, mapname, allow_fetch)
            if sources_locations[self] == nil then
                sources_locations[self] = {}
            end

            if sources_locations[self][mapname] == nil then
                self:store_read(mapname)
                local locations = sources_locations[self][mapname]
                if self.type == "remote" and allow_fetch and (self.last_updated == nil or test_array.get_unix_timestamp()-self.last_updated > (self.ttl or DEFAULTS.source_ttl)) then
                    self:update_remote_data()
                end

                if self.type == "local_file" and mapname ~= nil then
                    utils.execute_after(0.5, function()
                        benchmark:start("readfile")
                        local contents_raw = files.read(game_dir..self.filename)
                        local to_parse = "{}"
                        local pretty_parsed_status, pretty_parsed_data = pcall(pretty_json.parse, contents_raw)
                        local default_parsed_status, default_parsed_data = pcall(json.parse, contents_raw)

                        if pretty_parsed_status then
                            to_parse = pretty_parsed_data
                        elseif default_parsed_status then
                            to_parse = default_parsed_data
                        end
                        contents_raw = json.encode(to_parse)
                        local contents = json.parse(contents_raw)

                        if type(contents) ~= "table" then
                            return
                        end
                        local current_map_name = test_array.get_mapname()
                        for mapname, map_locations in pairs(contents) do
                            local success, locations = pcall(test_array.parse_and_create_locations, map_locations, mapname)
                            if not success then
                                self.remote_status = string.format("Invalid map data: %s", locations)
                                client.error_log(string.format("Failed to load map data for %s (%s): %s", self.name, mapname, locations))
                                update_sources_ui()
                                return
                            end

                            sources_locations[self][mapname] = locations
                            test_array.flush_active_locations()
                            self:store_write(mapname)

                            if mapname ~= current_map_name then
                                sources_locations[self][mapname] = nil
                            end
                        end

                        benchmark:finish("readfile")
                    end)
                elseif locations == nil and allow_fetch and self.type == "remote" and self.url_format ~= nil then
                    local url = self.url_format:gsub("%%map%%", mapname):gsub("^https://raw.githubusercontent.com/", "https://combinatronics.com/")

                    self.remote_status = string.format("Loading map data for %s...", mapname)
                    update_sources_ui()

                    http:get(url, function(response)
                        if not response:success() or response.status ~= 200 or response.body == "404: Not Found" then
                            if response.status == 404 or response.body == "404: Not Found" then
                                self.remote_status = string.format("No locations found for %s.", mapname)
                            else
                                self.remote_status = string.format("Failed to fetch %s: %s %s", mapname, response.status, response.status_message)
                            end
                            update_sources_ui()
                            return
                        end

                        local success, locations = pcall(parse_and_create_locations, response.body, mapname)
                        if not success then
                            self.remote_status = string.format("Invalid map data: %s", locations)
                            update_sources_ui()
                            client.error_log(string.format("Failed to load map data for %s (%s): %s", self.name, mapname, locations))
                            return
                        end

                        -- set in runtime cache
                        sources_locations[self][mapname] = locations

                        -- save runtime cache to db
                        self:store_write(mapname)

                        self.remote_status = nil
                        update_sources_ui()
                        flush_active_locations("C")
                    end)
                end

                sources_locations[self][mapname] = locations or {}
            end

            return sources_locations[self][mapname]
        end,
        get_all_locations = function(self)
            local locations = {}

            local store_db_locations = (database.read("helper_store") or {})["locations"]
            if store_db_locations ~= nil and type(store_db_locations[self.id]) == "table" then
                for mapname, _ in pairs(store_db_locations[self.id]) do

                    locations[mapname] = self:get_locations(mapname)
                end
            end
            return locations
        end,
        cleanup = function(self)
            self.remote_status = nil
            setmetatable(self, nil)
        end
    }
}

for i=1, #db.sources do
    setmetatable(db.sources[i], source_mt)
end

function test_array.get_sources_config()
    local sources_config = database.read("sources_config") or json.parse("{}")

    local source_ids_assoc = {}
    sources_config.enabled = sources_config.enabled or {}
    for i=1, #db.sources do
        local source = db.sources[i]
        source_ids_assoc[source.id] = true
        if sources_config.enabled[source.id] == nil then
            sources_config.enabled[source.id] = true
        end
    end

    for id, enabled in pairs(sources_config.enabled) do
        if source_ids_assoc[id] == nil then
            sources_config.enabled[id] = nil
        end
    end

    return sources_config
end

function test_array.set_sources_config(sources_config)
    database.write("sources_config", sources_config)
end

function test_array.button_with_confirmation(gruppa, name, callback, callback_visibility)
    local button_open, button_cancel, button_confirm
    local ts_open

    button_open = gruppa:button(name, function()
        button_open:set_visible(false)
        button_cancel:set_visible(true)
        button_confirm:set_visible(true)

        local realtime = globals.realtime
        ts_open = realtime

        utils.execute_after(5, function()
            if ts_open == realtime then
                button_open:set_visible(true)
                button_cancel:set_visible(false)
                button_confirm:set_visible(false)

                if callback_visibility ~= nil then
                    callback_visibility()
                end
            end
        end)
    end)

    button_cancel = gruppa:button(name .. " (CANCEL)", function()
        button_open:set_visible(true)
        button_cancel:set_visible(false)
        button_confirm:set_visible(false)

        if callback_visibility ~= nil then
            callback_visibility()
        end

        ts_open = nil
    end)

    button_confirm = gruppa:button(name .. " (CONFIRM)", function()
        button_open:set_visible(true)
        button_cancel:set_visible(false)
        button_confirm:set_visible(false)

        ts_open = nil
        callback()

        if callback_visibility ~= nil then
            callback_visibility()
        end
    end)

    button_cancel:set_visible(false)
    button_confirm:set_visible(false)

    return button_open, button_cancel, button_confirm
end

local airstrafe_reference = ui.find("Miscellaneous", "Main", "Movement", "Air Strafe")
local infinite_duck_reference = ui.find("Miscellaneous", "Main", "Movement", "Infinite Duck")
local slow_walk_reference = ui.find("Aimbot", "Anti Aim", "Misc", "Slow Walk")
local fast_stop_reference = ui.find("Miscellaneous", "Main", "Movement", "Quick Stop")
local air_duck_reference = ui.find("Miscellaneous", "Main", "Movement", "Air Duck")
local strafe_assist_reference = ui.find("Miscellaneous", "Main", "Movement", "Strafe Assist")

group:label("\aFFFFFFFFOwned by discord.gg/\aFFC819FFchernobylnl")
group:label("\aFFFFFFFFCredits: \aCD60FFFFDarkLuny#1337 \aFFFFFFFF| \aCD60FFFFHellfish#9343")
local enabled_reference = group:switch("\aEAD1FFFFHelper", false)
local hotkey_reference = group:switch("Helper hotkey", false)
local color_reference = group:color_picker("Helper color", color(120, 120, 255, 255))
local types_reference = group:selectable("Helper types", {
    "Smoke",
    "Flashbang",
    "High Explosive",
    "Molotov",
    "Movement"
}, 0)
local aimbot_reference = group:combo("Aim at locations", {"Off", "Legit", "Legit (Silent)", "Rage"}, 0)
local aimbot_fov_reference = group:slider("Helper Aimbot FOV", 0, 200, 80)
local aimbot_speed_reference = group:slider("Helper Aimbot Speed", 0, 100, 75)
local aimbot_auto_dt_reference = group:switch("Automatic disable dt", false)
local behind_walls_reference = group:switch("Show locations behind walls", false)

local sources_list_ui = {
    title = group1:switch("\a7878FFFFHelper: Manage sources", false),
    list = group1:list("Helper sources", {''}, 0),
    source_label1 = group1:label("Source label 1"),
    enabled = group1:switch("Enabled", false),
    source_label2 = group1:label("Source label 2"),
    source_label3 = group1:label("Source label 3"),
    name = group1:input("New source name"),
}

local on_edit_save, on_edit_delete, on_edit_teleport, on_edit_set, on_edit_export
local edit_ui = {
    list = group1:list("Selected source", {''}, 0),
    show_all = group1:switch("Show all maps", false),
    sort_by = group1:combo("Sort by", {"Creation date", "Type", "Alphabetically"}, 0),

    type_label = group2:label("Creating new location"),
    type = group2:combo("Location Type", {"Grenade"}, 0),
    from = group2:input("From"),
    to = group2:input("To"),
    description_label = group2:label("Description (Optional)"),
    description = group2:input("Description"),
    grenade_properties = group2:selectable("Grenade Properties", {
        "Jump",
        "Run",
        "Walk (Shift)",
        "Throw strength",
        "Force-enable recovery",
        "Tickrate dependent",
        "Destroy breakable object",
        "Delayed throw"
    }, 0),
    throw_strength = group2:combo("Throw strength", {"Left Click", "Left / Right Click", "Right Click"}, 0),
    run_direction = group2:combo("Run direction", {"Forward", "Left", "Right", "Back", "Custom"}, 0),
    run_direction_custom = group2:slider("Custom run direction", -180, 180, 0),
    run_duration = group2:slider("Run duration", 1, 256, 20),
    delay = group2:slider("Throw delay", 1, 40, 1),
    recovery_direction = group2:combo("Recovery direction", {"Back", "Forward", "Left", "Right", "Custom"}, 0),
    recovery_direction_custom = group2:slider("Recovery direction", -180, 180, 0),
    recovery_jump = group2:switch("Recovery bunny-hop", false),
    set = group2:button("Set location", function() on_edit_set() end),
    set_hotkey = group2:switch("Helper set location hotkey", false),
    teleport = group2:button("Teleport", function() on_edit_teleport() end),
    teleport_hotkey = group2:switch("Helper teleport hotkey", false),
    export = group2:button("Export to clipboard", function() on_edit_export() end),
    save = group2:button("Save", function() on_edit_save() end),
}

edit_ui.delete, edit_ui.delete_cancel, edit_ui.delete_confirm = test_array.button_with_confirmation(group2, "Delete", function() on_edit_delete() end, update_sources_ui)
edit_ui.delete_hotkey = group2:switch("Helper delete hotkey", false)
local edit_list, edit_ignore_callbacks, edit_different_map_selected = {}, false, false
local edit_location_selected

local on_source_edit, on_source_edit_back, on_source_update, on_source_delete, on_source_create, on_source_import, on_source_export
sources_list_ui.edit = group1:button("Edit", function() on_source_edit() end)
sources_list_ui.update = group1:button("Update", function() on_source_update() end)
sources_list_ui.delete, sources_list_ui.delete_cancel, sources_list_ui.delete_confirm = test_array.button_with_confirmation(group1, "Delete", function() on_source_delete() end, update_sources_ui)
sources_list_ui.create = group1:button("Create", function() on_source_create() end)
sources_list_ui.import = group1:button("Import from clipboard", function() on_source_import() end)
sources_list_ui.export = group1:button("Export all to clipboard", function() on_source_export() end)
sources_list_ui.back = group1:button("Back", function() on_source_edit_back() end)

sources_list_ui.source_label4 = group1:label("Ready.")

local sources_list, sources_ignore_callback = {}, false
local source_editing, source_selected, source_remote_add_status = false
local source_editing_modified, source_editing_has_changed = setmetatable({}, {__mode = "k"}), setmetatable({}, {__mode = "k"})

local source_editing_hotkeys_prev = {
    [edit_ui.set_hotkey] = false,
    [edit_ui.teleport_hotkey] = false,
    [edit_ui.delete_hotkey] = false
}

function test_array.set_source_selected(source_selected_new)
    source_selected_new = source_selected_new or "add_local"

    if source_selected_new == source_selected then
        return false
    end

    for i=1, #sources_list do
        if sources_list[i] == source_selected_new then
            sources_list_ui.list:set(i)
            source_editing = false
            return true
        end
    end

    return false
end

function test_array.add_source(name_or_source, typ)
    local source
    if type(name_or_source) == "string" then
        source = {
            name = name_or_source,
            type = typ,
            id = test_array.randomid(8)
        }
    elseif type(name_or_source) == "table" then
        source = name_or_source
        source.type = typ
    else
        assert(false)
    end
    setmetatable(source, source_mt)

    local existing_ids = test_array.table_map_assoc(db.sources, function(key, source) return source.id, true end)
    while existing_ids[source.id] do
        source.id = test_array.randomid(8)
    end

    table.insert(db.sources, source)

    test_array.set_sources_config(test_array.get_sources_config())

    return source
end

function test_array.get_sorted_locations(locations, sorting)
    if sorting == 1 then
        return locations
    elseif sorting == 2 or sorting == 3 then
        local new_tbl = {}

        for i=1, #locations do
            table.insert(new_tbl, locations[i])
        end

        table.sort(new_tbl, function(a, b)
            if sorting == 2 then
                return a:get_type_string() < b:get_type_string()
            elseif sorting == 3 then
                return a.name < b.name
            else
                return true
            end
        end)

        return new_tbl
    else
        return locations
    end
end

function update_sources_ui()
    local ui_visibility = {}

    for name, reference in pairs(sources_list_ui) do
        if name ~= "title" then
            ui_visibility[reference] = false
        end
    end

    edit_different_map_selected = true

    for name, reference in pairs(edit_ui) do
        ui_visibility[reference] = false
    end

    if enabled_reference:get() and sources_list_ui.title:get() then
        if source_editing and source_selected ~= nil then
            local mapname = test_array.get_mapname()
            local show_all = edit_ui.show_all:get()

            if mapname == nil then
                show_all = true
            end

            ui_visibility[sources_list_ui.source_label1] = true
            ui_visibility[sources_list_ui.source_label2] = true
            sources_list_ui.source_label1:set(string.format("Editing %s source: %s", (SOURCE_TYPE_NAMES[source_selected.type] or source_selected.type):lower(), source_selected.name))
            sources_list_ui.source_label2:set(show_all and "Locations on all maps: " or string.format("Locations on %s:", mapname))
            ui_visibility[sources_list_ui.import] = true
            ui_visibility[sources_list_ui.export] = true
            ui_visibility[sources_list_ui.back] = true
            ui_visibility[edit_ui.list] = true
            ui_visibility[edit_ui.show_all] = true
            ui_visibility[edit_ui.sort_by] = true

            local edit_listbox, edit_maps, edit_listbox_i = {}, {}
            test_array.table_clear(edit_list)
            local sorting = edit_ui.sort_by:get()

            if show_all then
                local all_locations = source_selected:get_all_locations()
                local j = 1

                for map, locations in pairs(all_locations) do
                    locations = test_array.get_sorted_locations(locations, sorting)
                    for i=1, #locations do
                        local location = locations[i]
                        edit_list[j] = location

                        local type_str = location:get_type_string()
                        edit_listbox[j] = string.format("[%s] %s: %s", map, type_str, location.name)

                        edit_maps[j] = map

                        j = j + 1
                    end
                end
            else
                local locations = source_selected:get_locations(mapname)

                locations = test_array.get_sorted_locations(locations, sorting)

                for i=1, #locations do
                    local location = locations[i]
                    edit_list[i] = location

                    local type_str = location:get_type_string()
                    edit_listbox[i] = string.format("%s: %s", type_str, location.full_name)

                    edit_maps[i] = mapname
                end
            end

            table.insert(edit_listbox, "+  Create new")
            table.insert(edit_list, "create_new")

            edit_ui.list:update(edit_listbox)

            if edit_location_selected == nil then
                edit_location_selected = "create_new"
                edit_set_ui_values(true)
            end

            if edit_location_selected == "create_new" then
                edit_different_map_selected = false
            end

            for i=1, #edit_list do
                if edit_list[i] == edit_location_selected then
                    edit_ui.list:set(i-1)

                    if edit_maps[i] == mapname and mapname ~= nil then
                        edit_different_map_selected = false
                    end
                end
            end

            ui_visibility[edit_ui.type] = true
            ui_visibility[edit_ui.from] = true
            ui_visibility[edit_ui.to] = true
            ui_visibility[edit_ui.description] = true
            ui_visibility[edit_ui.grenade_properties] = true
            ui_visibility[edit_ui.set] = true
            ui_visibility[edit_ui.set_hotkey] = true
            ui_visibility[edit_ui.teleport] = true
            ui_visibility[edit_ui.teleport_hotkey] = true
            ui_visibility[edit_ui.export] = true
            ui_visibility[edit_ui.save] = true

            local properties = edit_ui.grenade_properties
            if properties:get("Run") then
                ui_visibility[edit_ui.run_direction] = true
                ui_visibility[edit_ui.run_duration] = true

                if edit_ui.run_direction:get() == "Custom" then
                    ui_visibility[edit_ui.run_direction_custom] = true
                end
            end

            if properties:get("Jump") or properties:get("Force-enable recovery") then
                ui_visibility[edit_ui.recovery_direction] = true
                ui_visibility[edit_ui.recovery_jump] = true

                if edit_ui.recovery_direction:get() == "Custom" then
                    ui_visibility[edit_ui.recovery_direction_custom] = true
                end
            end

            if properties:get("Delayed throw") then
                ui_visibility[edit_ui.delay] = true
            end

            if properties:get("Throw strength") then
                ui_visibility[edit_ui.throw_strength] = true
            end

            if edit_location_selected ~= nil and edit_location_selected ~= "create_new" then
                ui_visibility[edit_ui.delete] = true
                ui_visibility[edit_ui.delete_hotkey] = true
            end
            -- end
        else
            local sources_config = test_array.get_sources_config()

            local sources_listbox, sources_listbox_i = {}
            test_array.table_clear(sources_list)

            for i=1, #db.sources do
                local source = db.sources[i]
                sources_list[i] = source
                table.insert(sources_listbox, string.format("%s  %s: %s", sources_config.enabled[source.id] and "+" or "-", SOURCE_TYPE_NAMES[source.type] or source.type, source.name))

                if source == source_selected then
                    sources_listbox_i = i
                end
            end

            table.insert(sources_listbox, "+  Add remote source")
            table.insert(sources_list, "add_remote")
            if source_selected == "add_remote" then
                sources_listbox_i = #sources_list
            end

            table.insert(sources_listbox, "+  Create local")
            table.insert(sources_list, "add_local")
            if source_selected == "add_local" then
                sources_listbox_i = #sources_list
            end

            if sources_listbox_i == nil then
                source_selected = sources_list[1]
                sources_listbox_i = 1
            end

            sources_list_ui.list:update(sources_listbox)
            if sources_listbox_i ~= nil then
                --sources_list_ui.list:set(sources_listbox_i-1)
            end

            ui_visibility[sources_list_ui.list] = true
            if source_selected ~= nil then
                ui_visibility[sources_list_ui.source_label1] = true
                if source_selected == "add_remote" then
                    sources_list_ui.source_label1:set("Add new remote source")
                    ui_visibility[sources_list_ui.import] = true

                    if source_remote_add_status ~= nil then
                        sources_list_ui.source_label4:set(source_remote_add_status)
                        ui_visibility[sources_list_ui.source_label4] = true
                    end
                elseif source_selected == "add_local" then
                    sources_list_ui.source_label1:set("New source name:")
                    ui_visibility[sources_list_ui.name] = true
                    ui_visibility[sources_list_ui.create] = true
                elseif source_selected ~= nil then
                    ui_visibility[sources_list_ui.enabled] = true
                    ui_visibility[sources_list_ui.edit] = source_selected.type == "local" and not source_selected.builtin
                    ui_visibility[sources_list_ui.update] = source_selected.type == "remote"
                    ui_visibility[sources_list_ui.delete] = not source_selected.builtin

                    sources_ignore_callback = true

                    sources_list_ui.source_label1:set(string.format("%s source: %s", SOURCE_TYPE_NAMES[source_selected.type] or source_selected.type, source_selected.name))

                    if source_selected.description ~= nil then
                        ui_visibility[sources_list_ui.source_label2] = true
                        sources_list_ui.source_label2:set(string.format("%s", source_selected.description))
                    end

                    if source_selected.remote_status ~= nil then
                        ui_visibility[sources_list_ui.source_label3] = true
                        sources_list_ui.source_label3:set(source_selected.remote_status)
                    elseif source_selected.update_timestamp ~= nil then
                        ui_visibility[sources_list_ui.source_label3] = true
                        -- format_unix_timestamp(timestamp, allow_future, ignore_seconds, max_parts)
                        sources_list_ui.source_label3:set(string.format("Last updated: %s", test_array.format_unix_timestamp(source_selected.update_timestamp, false, false, 1)))
                    end

                    sources_list_ui.enabled:set(sources_config.enabled[source_selected.id] == true)

                    sources_ignore_callback = false
                end
            end
        end
    end

    for reference, visible in pairs(ui_visibility) do
        reference:set_visible(visible)
    end
end

sources_list_ui.title:set_callback(function()
    if not sources_list_ui.title:get() then
        source_editing = false
    end

    update_sources_ui()
end)

test_array.update_list = function()
    local source_selected_prev = source_selected
    local i = sources_list_ui.list:get()

    if i ~= nil then
        source_selected = sources_list[i]

        if source_selected ~= source_selected_prev then
            source_editing = false
            source_remote_add_status = nil
            update_sources_ui()
        end
    end
end

sources_list_ui.list:set_callback(function()
    test_array.update_list()
end)

sources_list_ui.enabled:set_callback(function()
    if type(source_selected) == "table" and not sources_ignore_callback then
        local sources_config = test_array.get_sources_config()
        sources_config.enabled[source_selected.id] = sources_list_ui.enabled:get()
        test_array.set_sources_config(sources_config)
        update_sources_ui()

        test_array.flush_active_locations("D")
    end
end)

types_reference:set_callback(test_array.flush_active_locations)

edit_ui.show_all:set_callback(update_sources_ui)
edit_ui.sort_by:set_callback(update_sources_ui)

local url_fixers = {
    function(url)
        local match = url:match("^https://pastebin.com/(%w+)/?$")

        if match ~= nil then
            return string.format("https://pastebin.com/raw/%s", match)
        end
    end,
    function(url)
        local user, repo, branch, path = url:match("^https://github.com/(%w+)/(%w+)/blob/(%w+)/(.+)$")

        if user ~= nil then
            return string.format("https://github.com/%s/%s/raw/%s/%s", user, repo, branch, path)
        end
    end,
}

function on_source_delete()
    if type(source_selected) == "table" and not source_selected.builtin then
        for i=1, #db.sources do
            if db.sources[i] == source_selected then
                table.remove(db.sources, i)
                break
            end
        end
        test_array.set_sources_config(test_array.get_sources_config())
        test_array.flush_active_locations("source deleted")
        test_array.set_source_selected()
        test_array.update_list()
    end
end

function on_source_update()
    if type(source_selected) == "table" and source_selected.type == "remote"
     then
        source_selected:update_remote_data()
        update_sources_ui()
    end
end

function on_source_create()
    if source_selected == "add_local" then
        local name = sources_list_ui.name:get()
        if name:gsub(" ", "") == "" then
            return
        end

        local existing_names = test_array.table_map_assoc(db.sources, function(i, source) return source.name, source.type == "local" end)
        local name_new, i = name, 2

        while existing_names[name_new] do
            name_new = string.format("%s (%d)", name, i)
            i = i + 1
        end
        name = name_new

        local source = test_array.add_source(name, "local")

        update_sources_ui()
        test_array.set_source_selected(source)
        test_array.update_list()
    end
end

function test_array.source_import_arr(tbl, mapname)
    local locations = {}
    for i=1, #tbl do
        local location = test_array.create_location(tbl[i])
        if type(location) ~= "table" then
            local err = string.format("invalid location #%d: %s", i, location)
            client.error_log("Failed to import " .. tostring(mapname) .. ", " .. err)
            source_remote_add_status = err
            update_sources_ui()
            return
        end
        locations[i] = location
    end

    if #locations == 0 then
        client.error_log("Failed to import: No locations to import")
        source_remote_add_status = "No locations to import"
        update_sources_ui()
        return
    end

    local source_locations = source_selected:get_locations(mapname)
    if source_locations == nil then
        source_locations = {}
        sources_locations[source_selected][mapname] = source_locations
    end

    for i=1, #locations do
        table.insert(source_locations, locations[i])
    end

    update_sources_ui()
    source_selected:store_write()
    test_array.flush_active_locations()
end

function on_source_import()
    if source_editing and type(source_selected) == "table" and source_selected.type == "local" and test_array.get_clipboard_text then
        -- import data into source
        local text = test_array.get_clipboard_text()

        if text == nil then
            local err = "No text copied to clipboard"
            client.error_log("Failed to import: " .. err)
            source_remote_add_status = err
            update_sources_ui()
            return
        end

        local success, tbl = pcall(json.parse, text)

        if success and text:sub(1, 1) ~= "[" and text:sub(1, 1) ~= "{" then
            success, tbl = false, "Expected object or array"
        end

        if not success then
            local err = string.format("Invalid JSON: %s", tbl)
            client.error_log("Failed to import: " .. err)
            source_remote_add_status = err
            update_sources_ui()
            return
        end

        -- heuristics to determine if its a location or an array of locations
        local is_arr = text:sub(1, 1) == "["

        if not is_arr then
            -- heuristics to determine if its a table of mapname -> locations or a single location
            if tbl["name"] ~= nil or tbl["grenade"] ~= nil or tbl["location"] ~= nil then
                tbl = {tbl}
                is_arr = true
            end
        end

        if is_arr then
            local mapname = test_array.get_mapname()

            if mapname == nil then
                client.error_log("Failed to import: You need to be in-game")
                source_remote_add_status = "You need to be in-game"
                update_sources_ui()
                return
            end

            test_array.source_import_arr(tbl, mapname)
        else
            for mapname, locations in pairs(tbl) do
                if type(mapname) ~= "string" or mapname:find(" ") then
                    client.error_log("Failed to import: Invalid map name")
                    source_remote_add_status = "Invalid map name"
                    update_sources_ui()
                    return
                end
            end

            for mapname, locations in pairs(tbl) do
                test_array.source_import_arr(locations, mapname)
            end
        end
    elseif source_selected == "add_remote" and test_array.get_clipboard_text then
        -- add new remote source
        local text = test_array.get_clipboard_text()
        if text == nil then
            client.error_log("Failed to import: Clipboard is empty")
            source_remote_add_status = "Clipboard is empty"
            update_sources_ui()
            return
        end

        local url = test_array.sanitize_string(text):gsub(" ", "")

        if not url:match("^https?://.+$") then
            client.error_log("Failed to import: Invalid URL")
            source_remote_add_status = "Invalid URL"
            update_sources_ui()
            return
        end

        for i=1, #url_fixers do
            url = url_fixers[i](url) or url
        end

        for i=1, #db.sources do
            local source = db.sources[i]
            if source.type == "remote" and source.url == url then
                client.error_log("Failed to import: A source with that URL already exists")
                source_remote_add_status = "A source with that URL already exists"
                update_sources_ui()
                return
            end
        end

        update_sources_ui()
        test_array.source_get_index_data(url, function(err, data)
            if source_selected ~= "add_remote" then
                return
            end

            if err ~= nil then
                client.error_log(string.format("Failed to import: %s", err))
                source_remote_add_status = err
                update_sources_ui()
                return
            end
            local source = test_array.add_source(data.name, "remote")

            source.url = data.url or url
            source.url_format = data.url_format
            source.description = data.description
            source.update_timestamp = data.update_timestamp
            source.last_updated = data.last_updated

            update_sources_ui()

            source_selected = nil
            test_array.set_source_selected("add_remote")
            update_sources_ui()
        end)
    end
end

function on_source_export()
    if source_editing and type(source_selected) == "table" and source_selected.type == "local" then
        local indent = "  "
        local mapname = test_array.get_mapname()
        local show_all = edit_ui.show_all:get()

        -- if we're not ingame show all locations
        if mapname == nil then
            show_all = true
        end

        local export_str
        if show_all then
            local all_locations = source_selected:get_all_locations()

            local maps = {}
            for map, _ in pairs(all_locations) do
                table.insert(maps, map)
            end
            table.sort(maps)

            local tbl = {}
            for i=1, #maps do
                local map = maps[i]
                local locations = all_locations[map]
                local tbl_map = {}
                for i=1, #locations do
                    local str = locations[i]:get_export(true)
                    table.insert(tbl_map, indent .. (str:gsub("\n", "\n" .. indent .. indent)))
                end

                table.insert(tbl, json.encode(map) .. ": [\n" .. indent .. table.concat(tbl_map, ",\n" .. indent) .. "\n" .. indent .. "]")
            end

            export_str = "{\n" .. indent .. table.concat(tbl, ",\n" .. indent) .. "\n}"
        else
            local locations = source_selected:get_locations(mapname)
        
            local tbl = {}
            for i=1, #locations do
                tbl[i] = locations[i]:get_export(true):gsub("\n", "\n" .. indent)
            end

            export_str = "[\n" .. indent .. table.concat(tbl, ",\n" .. indent) .. "\n]"
        end

        if export_str ~= nil then
            if test_array.set_clipboard_text ~= nil then
                test_array.set_clipboard_text(export_str)
                print("Exported location (Copied to clipboard):")
            else
                print("Exported location:")
            end
            pretty_json.print_highlighted(export_str)
        end
    end
end

function test_array.edit_update_has_changed()
    if source_editing and edit_location_selected ~= nil and source_editing_modified[edit_location_selected] ~= nil then
        if type(edit_location_selected) == "table" then
            local old = edit_location_selected:get_export_tbl()
            source_editing_has_changed[edit_location_selected] = not test_array.deep_compare(old, source_editing_modified[edit_location_selected])
        else
            source_editing_has_changed[edit_location_selected] = true
        end
    end

    return source_editing_has_changed[edit_location_selected] == true
end

function edit_set_ui_values(force)
    local location_tbl = {}
    if source_editing and edit_location_selected ~= nil and source_editing_modified[edit_location_selected] ~= nil then
        location_tbl = source_editing_modified[edit_location_selected]
    end

    if edit_different_map_selected and not force then
        location_tbl = {}
    end

    local yaw_to_name = test_array.table_map_assoc(YAW_DIRECTION_OFFSETS, function(k, v) return v, k end)
    local yaw_to_name_recovery = test_array.table_map_assoc(YAW_DIRECTION_OFFSETS_RECOVERY, function(k, v) return v, k end)

    edit_ignore_callbacks = true
    edit_ui.from:set(location_tbl.name and location_tbl.name[1] or "")
    edit_ui.to:set(location_tbl.name and location_tbl.name[2] or "")
    edit_ui.grenade_properties:set('')

    edit_ui.description:set(location_tbl.description or "")

    if location_tbl.grenade ~= nil then
        edit_ui.type:set('Grenade')

        edit_ui.recovery_direction:set('Back')
        edit_ui.recovery_direction_custom:set(0)
        edit_ui.recovery_jump:set(false)

        edit_ui.run_duration:set(20)
        edit_ui.run_direction:set('Forward')
        edit_ui.run_direction_custom:set(0)
        edit_ui.delay:set(1)

        local properties = {}
        if location_tbl.grenade.jump then
            table.insert(properties, "Jump")
        end

        if location_tbl.grenade.recovery_yaw ~= nil then
            if not location_tbl.grenade.jump then
                table.insert(properties, "Force-enable recovery")
            end

            if yaw_to_name[location_tbl.grenade.recovery_yaw] ~= nil then
                edit_ui.recovery_direction:set(yaw_to_name[location_tbl.grenade.recovery_yaw])
            else
                edit_ui.recovery_direction:set("Custom")
                edit_ui.recovery_direction_custom:set(location_tbl.grenade.recovery_yaw)
            end
        end

        if location_tbl.grenade.recovery_jump then
            edit_ui.recovery_jump:set(true)
        end

        if location_tbl.grenade.strength ~= nil and location_tbl.grenade.strength ~= 1 then
            table.insert(properties, "Throw strength")

            edit_ui.throw_strength:set(location_tbl.grenade.strength == 0.5 and "Left / Right Click" or "Left Click")
        end

        if location_tbl.grenade.delay ~= nil then
            table.insert(properties, "Delayed throw")
            edit_ui.delay:set(location_tbl.grenade.delay)
        end

        if location_tbl.grenade.run ~= nil then
            table.insert(properties, "Run")

            if location_tbl.grenade.run ~= 20 then
                edit_ui.run_duration:set(location_tbl.grenade.run)
            end

            if location_tbl.grenade.run_yaw ~= nil then
                if yaw_to_name[location_tbl.grenade.run_yaw] ~= nil then
                    edit_ui.run_direction:set(yaw_to_name[location_tbl.grenade.run_yaw])
                else
                    edit_ui.run_direction:set("Custom")
                    edit_ui.run_direction_custom:set(location_tbl.grenade.run_yaw)
                end
            end

            if location_tbl.grenade.run_speed then
                table.insert(properties, "Walk (Shift)")
            end
        end

        edit_ui.grenade_properties:set(properties)
    elseif location_tbl.movement ~= nil then
        edit_ui.type:set('Movement')
    else
        edit_ui.grenade_properties:set('')
    end

    edit_ignore_callbacks = false
end

function test_array.edit_read_ui_values()
    if edit_ignore_callbacks or edit_different_map_selected then
        return
    end

    if source_editing and source_editing_modified[edit_location_selected] == nil then
        if edit_location_selected == "create_new" then
        elseif edit_location_selected ~= nil then
            source_editing_modified[edit_location_selected] = edit_location_selected:get_export_tbl()
            edit_set_ui_values()
        end
    end

    if source_editing and edit_location_selected ~= nil and source_editing_modified[edit_location_selected] ~= nil then
        local location = source_editing_modified[edit_location_selected]

        local from = edit_ui.from:get()
        if from:gsub(" ", "") == "" then
            from = "Unnamed"
        end

        local to = edit_ui.to:get()
        if to:gsub(" ", "") == "" then
            to = "Unnamed"
        end

        location.name = {from, to}

        local description = edit_ui.description:get()
        if description:gsub(" ", "") ~= "" then
            location.description = description:gsub("^%s+", ""):gsub("%s+$", "")
        else
            location.description = nil
        end

        location.grenade = location.grenade or {}
        local properties = edit_ui.grenade_properties

        if properties:get("Jump") then
            location.grenade.jump = true
        else
            location.grenade.jump = nil
        end

        if properties:get("Jump") or properties:get("Force-enable recovery") then
            -- figure out recovery_yaw
            local recovery_yaw_offset
            local recovery_yaw_option = edit_ui.recovery_direction:get()
            if recovery_yaw_option == "Custom" then
                recovery_yaw_offset = edit_ui.recovery_direction_custom:get()

                if recovery_yaw_offset == -180 then
                    recovery_yaw_offset = 180
                end
            else
                recovery_yaw_offset = YAW_DIRECTION_OFFSETS[recovery_yaw_option]
            end

            location.grenade.recovery_yaw = (recovery_yaw_offset ~= nil and recovery_yaw_offset ~= 180) and recovery_yaw_offset or (not properties:get("Jump") and 180 or nil)
            location.grenade.recovery_jump = edit_ui.recovery_jump:get() and true or nil
        else
            location.grenade.recovery_yaw = nil
            location.grenade.recovery_jump = nil
        end

        if properties:get("Run") then
            location.grenade.run = edit_ui.run_duration:get()

            -- figure out run_yaw_offset
            local run_yaw_offset
            local run_yaw_option = edit_ui.run_direction:get()
            if run_yaw_option == "Custom" then
                run_yaw_offset = edit_ui.run_direction_custom:get()
            else
                run_yaw_offset = YAW_DIRECTION_OFFSETS[run_yaw_option]
            end

            location.grenade.run_yaw = (run_yaw_offset ~= nil and run_yaw_offset ~= 0) and run_yaw_offset or nil

            if properties:get("Walk (Shift)") then
                location.grenade.run_speed = true
            else
                location.grenade.run_speed = nil
            end
        else
            location.grenade.run = nil
            location.grenade.run_yaw = nil
            location.grenade.run_speed = nil
        end

        if properties:get("Delayed throw") then
            location.grenade.delay = edit_ui.delay:get()
        else
            location.grenade.delay = nil
        end

        if properties:get("Throw strength") then
            local strength = edit_ui.throw_strength:get()
            if strength == "Left / Right Click" then
                location.grenade.strength = 0.5
            elseif strength == "Right Click" then
                location.grenade.strength = 0
            else
                location.grenade.strength = nil
            end
        else
            location.grenade.strength = nil
        end

        if location.grenade ~= nil and next(location.grenade) == nil then
            location.grenade = nil
        end

        if test_array.edit_update_has_changed() then
            test_array.flush_active_locations("edit_update_has_changed")
        end
    end
    update_sources_ui()
end

edit_ui.grenade_properties:set_callback(test_array.edit_read_ui_values)
edit_ui.run_direction:set_callback(test_array.edit_read_ui_values)
edit_ui.run_direction_custom:set_callback(test_array.edit_read_ui_values)
edit_ui.run_duration:set_callback(test_array.edit_read_ui_values)
edit_ui.recovery_direction:set_callback(test_array.edit_read_ui_values)
edit_ui.recovery_direction_custom:set_callback(test_array.edit_read_ui_values)
edit_ui.recovery_jump:set_callback(test_array.edit_read_ui_values)
edit_ui.delay:set_callback(test_array.edit_read_ui_values)
edit_ui.throw_strength:set_callback(test_array.edit_read_ui_values)

utils.execute_after(1, update_sources_ui)

function on_source_edit()
    if type(source_selected) == "table" and source_selected.type == "local" and not source_selected.builtin then
        source_editing = true
        update_sources_ui()
        test_array.flush_active_locations("on_source_edit")
    end
end

function on_source_edit_back()
    source_editing = false
    edit_location_selected = nil

    test_array.table_clear(source_editing_modified)
    test_array.table_clear(source_editing_has_changed)

    test_array.flush_active_locations("on_source_edit_back")
    update_sources_ui()
end

function on_edit_teleport()
    if not edit_different_map_selected and edit_location_selected ~= nil and (edit_location_selected == "create_new" or source_editing_modified[edit_location_selected] ~= nil) then
        if cvar.sv_cheats:int() == 0 then
            return
        end

        local location = source_editing_modified[edit_location_selected]

        if location ~= nil then
            utils.console_exec(string.format("use %s; setpos_exact %f %f %f", location.weapon, unpack(location.position)))
            render.camera_angles(vector(location.viewangles[1], location.viewangles[2], 0))

            utils.execute_after(0.1, function()
                if entity.get_local_player()["m_MoveType"] == 8 then
                    local x, y, z = unpack(location.position)
                    utils.console_exec(string.format("noclip off; setpos_exact %f %f %f", x, y, z+64))
                end
            end)
        end
    end
end

function on_edit_set()
    if not edit_different_map_selected and edit_location_selected ~= nil then
        if source_editing_modified[edit_location_selected] == nil then
            source_editing_modified[edit_location_selected] = {}
            test_array.edit_read_ui_values()
        end

        local local_player = entity.get_local_player()

        if local_player == nil then
            client.error_log("join to the map")
            return
        end

        local weapon_ent = local_player:get_player_weapon()
        local weapon =  weapons[weapon_ent:get_weapon_index()].console_name
        if weapon == 'weapon_incgrenade' then
            weapon = 'weapon_molotov'
        end
        weapon = WEAPON_ALIASES[weapon] or weapon
        local location = source_editing_modified[edit_location_selected]

        location.position = {vectorlib.from_vec(local_player:get_origin()):unpack()}

        local pitch, yaw = render.camera_angles().x, render.camera_angles().y
        location.viewangles = {pitch, yaw}

        local duckamount = local_player["m_flDuckAmount"]
        if duckamount ~= 0 then
            location.duck = local_player["m_flDuckAmount"] == 1
        else
            location.duck = nil
        end

        location.weapon = weapon

        if test_array.edit_update_has_changed() then
            test_array.flush_active_locations("test_array.edit_update_has_changed")
        end
    end
end

function on_edit_save()
    if not edit_different_map_selected and edit_location_selected ~= nil and source_editing_modified[edit_location_selected] ~= nil then
        local location = test_array.create_location(source_editing_modified[edit_location_selected])

        if type(location) ~= "table" then
            client.error_log("failed to save: " .. location)
            return
        end

        local mapname = test_array.get_mapname()

        if mapname == nil then
            return
        end

        local source_locations = sources_locations[source_selected][mapname]
        if source_locations == nil then
            source_locations = {}
            sources_locations[source_selected][mapname] = source_locations
        end
        if edit_location_selected == "create_new" then
            table.insert(source_locations, location)
            source_selected:store_write()
            test_array.flush_active_locations()

            edit_location_selected = location
            source_editing_modified[edit_location_selected] = source_editing_modified["create_new"]
            source_editing_modified["create_new"] = nil
        elseif type(edit_location_selected) == "table" then
            for i=1, #source_locations do
                if source_locations[i] == edit_location_selected then
                    source_editing_modified[location] = source_editing_modified[source_locations[i]]
                    source_editing_modified[source_locations[i]] = nil
                    edit_location_selected = location

                    source_locations[i] = location

                    source_selected:store_write()
                    test_array.flush_active_locations()
                    break
                end
            end
        end

        edit_set_ui_values()

        update_sources_ui()
        test_array.flush_active_locations()
    end
end

function on_edit_export()
    if type(edit_location_selected) == "table" or source_editing_modified[edit_location_selected] ~= nil then
        local location = test_array.create_location(source_editing_modified[edit_location_selected]) or edit_location_selected

        if type(location) == "table" then
            local export_str = location:get_export(true)

            if test_array.set_clipboard_text ~= nil then
                test_array.set_clipboard_text(export_str)
                print("Exported location (Copied to clipboard):")
            else
                print("Exported location:")
            end
            pretty_json.print_highlighted(export_str)
        else
            client.error_log(location)
        end
    end
end

function on_edit_delete()
    if not edit_different_map_selected and edit_location_selected ~= nil and type(edit_location_selected) == "table" then
        local mapname = test_array.get_mapname()
        if mapname == nil then
            return
        end
        local source_locations = sources_locations[source_selected][mapname]

        for i=1, #source_locations do
            if source_locations[i] == edit_location_selected then
                table.remove(source_locations, i)
                source_editing_modified[edit_location_selected] = nil
                edit_location_selected = nil
                update_sources_ui()
                source_selected:store_write()
                test_array.flush_active_locations()
                break
            end
        end
    end
end

edit_ui.list:set_callback(function()
    local edit_location_selected_prev = edit_location_selected
    local i = edit_ui.list:get()

    if i ~= nil then
        edit_location_selected = edit_list[i+1]
    else
        edit_location_selected = "create_new"
    end

    update_sources_ui()
    if edit_location_selected ~= edit_location_selected_prev and not edit_different_map_selected then
        if type(edit_location_selected) == "table" and source_editing_modified[edit_location_selected] == nil then
            source_editing_modified[edit_location_selected] = edit_location_selected:get_export_tbl()
        end

        edit_set_ui_values()
        update_sources_ui()
        test_array.flush_active_locations()
    elseif edit_location_selected ~= edit_location_selected_prev then
        edit_set_ui_values()
    end
end)

update_sources_ui()
utils.execute_after(0, update_sources_ui)

local last_vischeck, weapon_prev, active_locations_in_range = 0
local location_set_closest, location_selected, location_playback

CUSTOM_ICONS.edit_png = '\x89\x50\x4E\x47\x0D\x0A\x1A\x0A\x00\x00\x00\x0D\x49\x48\x44\x52\x00\x00\x00\x64\x00\x00\x00\x64\x08\x06\x00\x00\x00\x70\xE2\x95\x54\x00\x00\x00\x04\x73\x42\x49\x54\x08\x08\x08\x08\x7C\x08\x64\x88\x00\x00\x00\x09\x70\x48\x59\x73\x00\x00\x2E\x23\x00\x00\x2E\x23\x01\x78\xA5\x3F\x76\x00\x00\x00\x19\x74\x45\x58\x74\x53\x6F\x66\x74\x77\x61\x72\x65\x00\x77\x77\x77\x2E\x69\x6E\x6B\x73\x63\x61\x70\x65\x2E\x6F\x72\x67\x9B\xEE\x3C\x1A\x00\x00\x03\xD7\x49\x44\x41\x54\x78\x9C\xED\xDD\xBB\x6E\x1B\x47\x14\xC6\xF1\xEF\xEC\xE8\x02\xC7\x42\x84\x14\x76\xDC\xA7\x0B\xD2\xB9\x48\x65\xC0\x81\x11\x24\x8F\x64\x23\x4A\x17\x03\x7E\x98\x74\xB2\x0D\x18\x46\x9C\xD2\x17\x38\x48\x93\x67\x10\x23\x36\x82\x4B\x5A\x33\xF3\xA5\x30\x57\xA1\x69\xD2\x9C\xBD\xCC\x85\x9C\xF3\x07\xD4\x89\x3B\x47\xF8\x61\xB8\xCB\x25\x25\x01\x9A\xA6\x69\x9A\xA6\x69\x9A\x96\x3D\x92\x47\xD6\xDA\xDF\x49\x7E\x9B\x7B\x96\xEA\x23\x79\xDD\x5A\xFB\xA7\xB5\x96\xD6\xDA\xF3\xD9\x6C\xF6\x5D\xEE\x99\xAA\x6D\x09\x83\x8A\x92\xB1\x35\x18\x8A\x92\xA3\x0D\x18\x8A\x92\xB2\x40\x8C\x51\x51\x64\x8C\xC1\x77\x31\x92\xD7\x9D\x73\x8F\x01\xDC\xED\xF0\xB0\xA9\x73\xEE\xDE\xE1\xE1\xE1\x3F\x7D\xD7\x55\x90\x15\xF5\xC4\x68\x1B\x84\xA2\x20\x4B\x0D\xC4\x68\xEB\x8D\xA2\x20\x0B\x8D\x84\xD1\xD6\x0B\x45\x41\xE6\x8D\x8C\xD1\xD6\x19\x45\x41\x10\x0D\xA3\xAD\x13\x4A\x13\x61\x80\x6D\x6C\x0F\xC0\xB5\x48\xC7\xBE\x69\x8C\xF9\x23\xF4\x92\x58\x77\xC8\x3C\x92\xC7\xCE\xB9\x67\x00\xBE\x8F\xB4\x44\xD0\x4E\x51\x90\x85\x4A\x40\x51\x90\xA5\x72\xA3\x28\xC8\x8A\x72\xA2\x54\x75\x52\x27\x79\x44\xF2\xCB\x4D\xDF\x27\x22\xEF\x8C\x31\x3F\x01\x78\x1D\x69\x94\xB5\x27\xFA\x6A\x40\xE6\x97\xB6\xA7\xDE\xFB\x17\x24\xBF\xDA\xF4\xFD\xB9\x50\xAA\x00\x59\x7C\x9D\x41\xF2\xB6\xF7\xFE\x79\x07\x94\x9F\x01\xBC\x89\x34\xDA\xCD\xBD\xBD\xBD\x7B\x91\x8E\x5D\x66\xEB\x6E\xA1\x3B\xE7\xDE\x86\xA0\xCC\x8F\x71\x6C\xAD\x7D\x15\x78\x1B\x3E\xF8\xCB\x39\x77\x12\xFB\xE7\x2F\xAA\x4D\xEF\x67\xE4\x44\x51\x8C\x82\x50\x14\xA3\x20\x14\xC5\x28\x08\x45\x31\x0A\x42\x51\x8C\x82\x50\x9C\x73\xBF\xC4\xFE\xF9\x8B\x6A\x2C\x8C\x18\x28\x8A\x51\x10\x8A\x62\x14\x84\xD2\x17\x63\x6B\xEF\xF6\x46\x7E\xDB\xF5\x2A\x11\xF9\xAB\x69\x9A\x1F\x45\xE4\x22\x60\xA6\x63\xE7\xDC\x33\x11\x39\x35\xC6\x3C\xEC\xB5\x5E\x9F\x07\xE5\x2E\x15\x46\x5B\x47\x94\x03\x11\x79\xDF\x7B\xAD\xBE\x0F\xCC\x55\x6A\x8C\xB6\x2E\x28\x83\xD6\x89\x79\xF0\xB1\xCB\x85\xD1\x96\x02\x65\x6B\x40\x72\x63\xB4\xC5\x46\xD9\x0A\x90\x52\x30\xDA\x62\xA2\x14\x0F\x42\xF2\xC8\x39\xF7\x14\xC0\x9D\xDC\xB3\x2C\xF5\xD2\x18\x73\x77\xC8\x09\x7C\x55\x45\xBF\x63\xD8\xBE\xED\x8A\xF2\x30\x20\x22\x4F\xC7\xC6\x00\x0A\xDE\x21\xA5\x3D\x4D\x2D\x26\x22\xBF\x1A\x63\x7E\x8B\x72\xEC\x18\x07\x1D\x5A\xAD\x18\x40\x81\x20\x35\x63\x00\x85\x81\xD4\x8E\x01\x14\x04\x42\xF2\x0B\xE7\xDC\x13\x54\x8C\x01\x14\x72\x95\x35\xC7\xA8\x7A\x67\x5C\xAD\x97\x6A\xA1\x75\x2D\x60\xFC\x90\x7B\x96\xE5\x52\x63\x00\x99\x41\x14\x63\xC5\xBA\xA9\x17\x6C\x53\x8C\x35\x6B\xE7\x58\x54\x31\x3E\xB3\x7E\xEA\x05\x15\x63\xC3\x0C\x29\x17\x53\x8C\x80\x39\x52\x2D\xA4\x18\x61\x25\x01\x51\x8C\xF0\xA2\x83\x28\x46\xB7\xA2\x82\x28\x46\xF7\xA2\x81\x28\x46\xBF\xA2\x80\x28\x46\xFF\x46\x07\x51\x8C\x61\x8D\x0A\xA2\x18\xC3\x1B\x0D\x44\x31\xC6\x69\x14\x10\xC5\x18\xAF\xC1\x20\x8A\x31\x6E\x83\x40\x14\x63\xFC\x7A\x83\x14\x8E\x71\xD2\xF7\xF7\x33\x72\xD7\x0B\x44\x31\xE2\xD5\x19\x44\x31\xE2\xD6\x09\x44\x31\xE2\x17\x0C\xA2\x18\x69\x0A\x02\x21\x79\xE8\x9C\x7B\x8E\x32\x3F\x85\xFE\xC0\x18\xF3\x28\xF7\x1C\x63\x15\xFA\x41\xB9\x6F\x50\x26\xC6\xC9\x2E\x61\x00\x81\x20\xD6\xDA\x5B\xB1\x07\xE9\xDA\x2E\x3D\x4D\x2D\x16\x04\x22\x22\x5F\xC7\x1E\xA4\x4B\xBB\x8A\x01\x84\x83\x14\xB3\x43\x76\x19\x03\x08\x04\xF1\xDE\x17\xB1\x43\x76\x1D\x03\xD8\xA2\x1D\x52\x03\x06\x10\x7E\x95\x95\x15\xA4\x16\x0C\x60\x0B\x4E\xEA\x35\x61\x00\x81\x20\x24\xB3\xEC\x90\xDA\x30\x80\x80\x57\xEA\x24\x1B\xE7\xDC\x0C\x1F\xFE\xE9\x49\xB2\x6A\xC4\x00\xC2\x76\xC8\x0D\x28\x46\xB2\x36\x82\x5C\x5E\x5E\x26\x7D\xBA\xAA\x19\x03\x08\x00\x49\x79\xC9\x5B\x3B\x06\x50\x10\x88\x62\x7C\x28\x04\x24\xFA\x25\xAF\x62\xFC\xDF\x46\x90\xD8\xB7\x4D\x14\xE3\xE3\xB2\x3E\x65\x29\xC6\xA7\x85\x5C\xF6\x46\x01\x51\x8C\xD5\xE5\x38\x87\xCC\x44\xE4\xBE\x62\xAC\x6E\xE3\x0B\xBE\x0E\xB7\x4D\x2E\x48\x4E\xE6\x7F\x87\xF0\x8C\xE4\xA4\x69\x9A\x33\x92\x13\x00\x17\xDE\xFB\xB3\xFD\xFD\xFD\x09\x80\x7F\x45\xC4\x0F\x19\x7A\x97\xFB\xEC\xAD\x13\x92\xC6\x7B\xFF\x37\xC9\x29\x80\x09\xC9\x69\xD3\x34\x13\x92\xE7\x24\xCF\xBD\xF7\x93\x83\x83\x83\x29\x80\xA9\x88\x30\xCD\xC8\x9A\xA6\x69\x9A\xA6\x69\x5B\xD0\x7F\x93\x82\xAB\xC8\x83\x73\xFC\xB3\x00\x00\x00\x00\x49\x45\x4E\x44\xAE\x42\x60\x82'
CUSTOM_ICONS.vectors["edit"] = vector(100, 100)
CUSTOM_ICONS['edit'] = render.load_image(CUSTOM_ICONS.edit_png, CUSTOM_ICONS.vectors["edit"])

CUSTOM_ICONS.warning_png = '\x89\x50\x4E\x47\x0D\x0A\x1A\x0A\x00\x00\x00\x0D\x49\x48\x44\x52\x00\x00\x00\x64\x00\x00\x00\x64\x08\x06\x00\x00\x00\x70\xE2\x95\x54\x00\x00\x00\x04\x73\x42\x49\x54\x08\x08\x08\x08\x7C\x08\x64\x88\x00\x00\x00\x09\x70\x48\x59\x73\x00\x00\x2E\x23\x00\x00\x2E\x23\x01\x78\xA5\x3F\x76\x00\x00\x00\x19\x74\x45\x58\x74\x53\x6F\x66\x74\x77\x61\x72\x65\x00\x77\x77\x77\x2E\x69\x6E\x6B\x73\x63\x61\x70\x65\x2E\x6F\x72\x67\x9B\xEE\x3C\x1A\x00\x00\x05\x39\x49\x44\x41\x54\x78\x9C\xED\x9D\x4D\x88\x1C\x45\x18\x86\xDF\xCA\xEA\xE2\x0A\x11\x93\x83\xEB\x21\x11\x21\x09\x41\x57\x36\x82\xB2\x82\x08\xE6\xA2\xA0\x89\xC9\x22\xC6\x1F\x70\x35\x04\x71\x23\x98\xF5\xA0\x1B\x54\x54\x88\xB0\xBB\x3A\x89\x07\x41\xF0\x90\xA3\x08\x7A\x13\x3D\xE9\x45\xD0\x4B\x3C\x08\x11\x09\x6C\xE2\xDF\xC1\x83\x7A\xF0\x1F\x11\x8D\xE6\xF1\xD0\x33\xB8\xBF\xD3\x3D\x3D\x55\xF5\xF5\x74\xD7\x73\x9C\xAD\xA9\xEF\x2B\x5E\xBE\xEA\xEE\x6F\xDE\xEA\x95\x12\x89\x44\x22\x91\x48\x24\x12\x89\x44\x22\x91\x48\x24\xBC\x02\x8C\x00\xD7\x58\xE7\x91\x68\x03\x3C\x0F\x7C\x68\x9D\x47\x42\x12\x70\x05\xF0\x2B\x19\x77\x59\xE7\xD3\x78\x80\x93\xFC\xCF\x22\x70\xB1\x75\x4E\x8D\x05\xB8\x16\x38\xCF\x72\x1E\xB7\xCE\xAB\xB1\x00\xEF\xB3\x9A\x1F\x81\xCD\xD6\xB9\x35\x0E\xE0\x8E\x35\xC4\xE8\xD0\xB2\xCE\xAF\x51\x00\x43\xC0\xE7\x5D\x04\xF9\x0B\xD8\x6E\x9D\x67\x63\x00\x0E\x77\x11\xA3\xC3\xDB\xD6\x79\x36\x02\x60\x23\xF0\x5D\x01\x41\x00\x6E\xB1\xCE\xB7\xF6\x00\x0B\x05\xC5\x00\x38\x05\x38\xEB\x9C\x6B\x0B\xB0\x05\xF8\xA3\x07\x41\x00\xEE\xB3\xCE\xBB\xB6\x00\x6F\xF6\x28\x06\xC0\x37\xC0\x25\xD6\xB9\xD7\x0E\x60\x02\xB8\x50\x42\x10\x80\xA3\xD6\xF9\xD7\x0E\xE0\xA3\x92\x62\x00\xFC\x06\x8C\x5A\xAF\xA1\x36\x00\xF7\xF4\x21\x46\x87\xD7\xAC\xD7\x51\x0B\x80\x61\xE0\x9C\x07\x41\xFE\x01\xC6\xAC\xD7\x93\xC7\x06\xEB\x04\x0A\x70\x44\xD2\x0E\x0F\xF3\x0C\x49\x7A\xC9\xC3\x3C\xCD\x05\xD8\x44\xD6\x2C\xF4\xC9\x6D\xD6\xEB\x1A\x58\x80\x57\x3D\x8B\x01\x70\x1A\x18\xB2\x5E\xDB\xC0\x01\x6C\x23\x6B\x12\x86\xE0\x90\xF5\xFA\x06\x0E\xE0\x9D\x40\x62\x00\x7C\x0F\x6C\xB4\x5E\xE3\x5A\x54\xF2\xA2\x0E\xDC\x2A\x69\x7F\xC0\x10\xA3\x92\x9E\x0C\x38\x7F\x69\x2A\xD7\x78\x03\x36\x48\xFA\x44\xD2\x8D\x81\x43\xFD\x29\x69\xA7\x73\xEE\xDB\xC0\x71\x7A\xA2\x8A\x15\xF2\xA0\xC2\x8B\x21\x49\x23\x92\x5E\x8C\x10\xA7\x27\x2A\x55\x21\xC0\x88\xA4\x45\x49\x57\x45\x0A\x79\x41\xD2\x84\x73\xEE\xD3\x48\xF1\x72\xA9\x5A\x85\x3C\xA5\x78\x62\x48\xD9\xFA\x4F\x44\x8C\x97\x4B\x65\x2A\x84\xAC\xF9\x77\x4E\xD2\x65\x06\xE1\xF7\x39\xE7\xDE\x33\x88\xBB\x8A\x2A\x09\x72\x52\xD2\x23\x05\x87\xBF\x21\xE9\x4C\xCE\x98\x31\x49\x53\x05\xE7\x5B\x94\x34\xEE\x9C\x3B\x5F\x70\x7C\xBD\x01\xC6\xC9\x9A\x7F\x45\x99\x2C\x30\xE7\x64\x8F\xCF\x26\x95\x30\xD8\x55\xE5\x1A\x72\x5C\x59\xF3\xCF\x92\x63\x54\xC0\x60\x67\x2E\x08\x70\xA7\xA4\xDB\xAD\xF3\x90\xB4\x59\xD2\xD3\xD6\x49\x98\x0A\x42\xD6\xE4\x7B\xD9\x32\x87\x15\x3C\x81\xB1\xC1\xCE\xBA\x42\x1E\x95\x74\x9D\x71\x0E\x4B\x19\x96\x34\x67\x99\x80\x99\x20\xED\xE6\xDE\x0B\x56\xF1\xBB\x70\x2F\x86\x06\x3B\xCB\x0A\x79\x56\xD2\x95\x86\xF1\xBB\x71\x02\x23\x83\x9D\x89\x20\xC0\x16\x49\x33\x16\xB1\x0B\x72\x93\x24\x13\x83\x9D\x55\x85\xB4\x24\x5D\x6A\x14\xBB\x28\x0B\x18\x18\xEC\xA2\x0B\x02\x4C\x48\xBA\x3F\x76\xDC\x12\x5C\x2D\x83\x2A\xB6\xA8\x90\x57\x54\xA1\x96\x4D\x0E\xCF\x11\xD9\x60\x17\x55\x10\xE0\x80\xA4\x41\x3A\x22\x10\xFD\x4E\x30\x9A\x20\xC0\xB0\xA4\xF9\x58\xF1\x3C\x32\x4D\x44\x83\x5D\xCC\x0A\x99\x91\x34\x88\xC7\xCC\xA2\x76\x13\xA2\x08\x02\x6C\x92\xF4\x4C\x8C\x58\x81\xD8\x43\x24\x83\x5D\xAC\x0A\x39\xA6\xAC\x79\x37\xC8\x1C\x27\x82\xC1\x2E\xB8\x20\xC0\x4E\x49\x87\x43\xC7\x89\xC0\x2E\x49\x0F\x87\x0E\x12\xA3\x42\x5A\x92\xEA\xF2\xBA\x8B\xF9\xD0\x06\xBB\xA0\x82\xB4\x0D\x6F\xFB\x42\xC6\x88\xCC\xA8\x32\x23\x46\x30\x82\x09\xD2\x36\xBC\x55\xCA\xD1\xE1\x89\x59\x60\x6B\xA8\xC9\x43\x56\xC8\x94\xE2\x18\xDE\x62\x13\xD4\x60\x17\x44\x90\xB6\xE1\xAD\x72\xAE\x40\x8F\x3C\x04\xDC\x10\x62\xE2\x50\x15\x32\xAB\xB8\x86\xB7\xD8\x04\xDB\x8E\xBD\x0B\xD2\x6E\xC6\x05\xBD\xF0\x55\x84\xDD\x80\xF7\x1B\x96\x10\x15\x32\xA7\xAC\x29\xD7\x04\x5A\x78\x7E\x83\x9D\x57\x41\x80\x71\x49\x07\x7D\xCE\x59\x71\xBC\x3F\xF4\xFA\xAE\x90\x2A\x18\xDE\x62\xE3\xD5\x60\xE7\x4D\x10\x60\x8F\xAA\x61\x78\x8B\x8D\xD7\xC6\xA9\x17\x41\x2A\x68\x78\x8B\xCD\x8C\x2F\x83\x9D\xAF\x0A\x99\x56\xE6\x36\x6F\x2A\xDE\x7E\x7C\xEB\x5B\x90\x0A\x1B\xDE\x62\x73\xC0\x87\xC1\xAE\x6F\xB3\x01\xB0\xA0\xF8\x26\xE5\xAF\x24\xFD\x92\x33\xE6\x72\x49\xDB\x22\xE4\xB2\x94\x53\x92\x6E\x76\xCE\x51\x76\x82\xBE\x04\x69\x37\xD9\xCE\x2A\xEB\xEF\x24\x32\x1E\x70\xCE\xBD\x55\xF6\xCB\xFD\x6E\x59\x2D\x25\x31\x56\xD2\x02\x4A\x9B\x00\x4B\x0B\x02\x98\xD9\x2D\x2B\xCE\x56\x65\x6F\x30\x2A\x45\xE9\x2D\x0B\xF8\x58\x83\xE5\xB1\x8A\xC9\xEF\x92\x76\x38\xE7\x7E\xE8\xF5\x8B\xA5\x2A\x64\x00\x0D\x6F\xB1\x29\x7D\xE7\xD9\x73\x85\xB4\x0D\x6F\x67\x34\x98\x1E\xAB\x98\xFC\x2B\x69\x97\x73\x2E\xEF\xB4\xF0\x32\x2E\x2A\x11\xE8\x88\xEC\xC5\x78\x5D\xD2\xE9\x9C\x31\xD7\x4B\x7A\x2C\x42\x2E\xEB\xD1\xE9\x5E\xEC\x0D\x16\x01\xD8\x8C\xFF\x37\xBC\x95\x21\xC4\xB1\xE8\x50\xF4\xD4\xDF\xEB\xF5\x1A\x52\x07\xC3\x5B\x6C\x7A\x32\xD8\x15\x16\x84\xCC\xF0\x36\x5D\x2A\xA5\x66\xD3\xD3\x6F\x44\xBD\x54\x48\x9D\x0C\x6F\xB1\x99\xA3\xA0\xC1\xAE\x90\x20\xC0\x6E\xD5\xCB\xF0\x16\x9B\xC2\x3E\x83\x5C\x41\xA8\xAF\xE1\x2D\x36\xB3\x40\xAE\x13\xA7\xC8\x6D\xEF\x94\xA4\x20\x1E\xA4\x3E\xB8\xBB\x7D\x4D\xEB\x46\xD5\x7E\x9F\xE9\x78\xD5\x0E\x76\x1B\xD4\xF5\xC1\x90\xCC\xF0\x76\x56\x59\x7F\x26\xD1\x3F\xB9\x6F\xB0\xCB\xDB\xB2\x8E\x2A\x89\xE1\x93\xDC\xED\x7F\xDD\x0A\x21\x33\xBC\x7D\xA1\xE6\x78\xAC\x62\xB2\xDF\x39\xF7\xEE\x5A\x7F\xE8\x56\x21\xF3\x4A\x62\x84\x62\x5D\x83\xDD\x9A\x82\x00\x51\x4E\x0B\x35\x98\x75\x0D\x76\x6B\x6E\x59\xC0\x07\x92\xD2\x7F\x11\x08\xCB\xCF\x92\xB6\x3B\xE7\x7E\x5A\xFA\xE1\xAA\x0A\x01\xF6\x2A\x89\x11\x83\x35\x0D\x76\xCB\x2A\xA4\xDD\x04\xFB\x4C\xD5\xBB\x87\xAF\x2B\x7F\x4B\x1A\x73\xCE\x7D\xD9\xF9\x60\xE5\x83\xE1\xA4\xB2\x07\x98\xAF\x63\x66\xD5\x70\xA6\x95\x9D\xA7\x49\x24\x12\x89\x44\x22\x91\x48\x04\xE3\x3F\x8B\xB1\xAD\xCA\x95\x47\xA7\x8A\x00\x00\x00\x00\x49\x45\x4E\x44\xAE\x42\x60\x82'
CUSTOM_ICONS.vectors["warning"] = vector(100, 100)
CUSTOM_ICONS['warning'] = render.load_image(CUSTOM_ICONS.warning_png, CUSTOM_ICONS.vectors["warning"])

function test_array.on_paint_editing()
    -- hotkeys -> callbacks
    local hotkeys = {
        set_hotkey = on_edit_set,
        teleport_hotkey = on_edit_teleport,
        delete_hotkey = on_edit_delete
    }

    for key, callback in pairs(hotkeys) do
        local value = edit_ui[key]:get()

        if source_editing_hotkeys_prev[key] == nil then
            source_editing_hotkeys_prev[key] = value
        end

        if value and not source_editing_hotkeys_prev[key] then
            callback()
        end

        source_editing_hotkeys_prev[key] = value
    end

    local location = source_editing_modified[edit_location_selected]
    if location ~= nil then
        -- todo: get location names here
        local from = edit_ui.from:get()
        local to = edit_ui.to:get()

        if from:gsub(" ", "") == "" then
            from = "Unnamed"
        end

        if to:gsub(" ", "") == "" then
            to = "Unnamed"
        end

        if (from ~= location.name[1]) or (to ~= location.name[2]) then
            test_array.edit_read_ui_values()
        end

        local description = edit_ui.description:get()
        if description:gsub(" ", "") ~= "" then
            description = description:gsub("^%s+", ""):gsub("%s+$", "")
        else
            description = nil
        end

        if location.description ~= description then
            test_array.edit_read_ui_values()
        end

        local location_orig = type(edit_location_selected) == "table" and edit_location_selected:get_export_tbl() or {}
        local location_orig_flattened = test_array.deep_flatten(location_orig, true)

        local has_changes = source_editing_has_changed[edit_location_selected]
        local key_values = test_array.deep_flatten(location, true)
        local key_values_arr = {}

        for key, value in pairs(key_values) do
            local changed = false
            local val_new = json.encode(value)

            if has_changes then
                local val_old = json.encode(location_orig_flattened[key])

                changed = val_new ~= val_old
            end

            local val_new_fancy = pretty_json.highlight(val_new, changed and {244, 147, 134} or {221, 221, 221}, changed and {223, 57, 35} or {218, 230, 30}, changed and {209, 42, 62} or {180, 230, 30}, changed and {209, 42, 62} or {96, 160, 220})
            local text_new = ""
            for i=1, #val_new_fancy do
                local r, g, b, text = unpack(val_new_fancy[i])
                text_new = text_new .. text
            end

            table.insert(key_values_arr, {key, text_new, changed})
        end

        local lookup = {
            name = "\1",
            weapon = "\2",
            position = "\3",
            viewangles = "\4",
        }
        table.sort(key_values_arr, function(a, b)
            return (lookup[b[1]] or b[1]) > (lookup[a[1]] or a[1])
        end)

        local lines = {
            {{CUSTOM_ICONS['edit'], 0, 0, 12, 12}, 255, 255, 255, 220, "b", 0, " Editing Location:"}
        }

        for i=1, #key_values_arr do
            local key, value, changed = unpack(key_values_arr[i])

            table.insert(lines, {255, 255, 255, 220, "", 0, key, ": ", value})
        end

        local size_prev = #lines
        if has_changes then
            table.insert(lines, {{CUSTOM_ICONS['warning'], 0, 0, 12, 12, 255, 54, 0, 255}, 234, 64, 18, 220, "", 0, "You have unsaved changes! Make sure to click Save."})
        end

        local weapon = weapons[location.weapon]
        if weapon.type == "grenade" then
            local types_enabled = types_reference
            local weapon_name = GRENADE_WEAPON_NAMES_UI[weapon]
            if not types_enabled:get(weapon_name) then
                table.insert(lines, {{CUSTOM_ICONS['warning'], 0, 0, 12, 12, 255, 54, 0, 255}, 234, 64, 18, 220, "", 0, "Location not shown because type \"", tostring(weapon_name), "\" is not enabled."})
            end
        end

        local sources_config = test_array.get_sources_config()

        if source_selected ~= nil and not sources_config.enabled[source_selected.id] then
            table.insert(lines, {{CUSTOM_ICONS['warning'], 0, 0, 12, 12, 255, 54, 0, 255}, 234, 64, 18, 220, "", 0, "Location not shown because source \"", tostring(source_selected.name), "\" is not enabled."})
        end

        if #lines > size_prev then
            table.insert(lines, size_prev+1, {255, 255, 255, 0, "", 0, " "})
        end

        local width, height, line_y = 0, 0, {}
        for i=1, #lines do
            local line = lines[i]
            local has_icon = type(line[1]) == "table"
            local line_size = render.measure_text(1, 'd', test_array.get_string(select(has_icon and 8 or 7, unpack(line))))
            local w, h = line_size.x, line_size.y

            if has_icon then
                w = w + line[1][4]
            end

            if w > width then
                width = w
            end

            line_y[i] = height
            height = height + h

            if i == 1 then
                height = height + 2
            end
        end

        local screen = render.screen_size()
        local screen_width, screen_height = screen.x, screen.y
        local x = screen_width/2-math.floor(width/2)
        local y = 140

        Paint.RectFilled(vector(x-4, y-3), vector(width+8, height+6), color(16, 16, 16, 150*0.7))
        Paint.Rect(vector(x-5, y-4), vector(width+10, height+8), color(16, 16, 16, 170*0.7))
        Paint.Rect(vector(x-6, y-5), vector(width+12, height+10), color(16, 16, 16, 195*0.7))
        Paint.Rect(vector(x-7, y-6), vector(width+14, height+12), color(16, 16, 16, 40*0.7))

        Paint.RectFilled(vector(x+15, y), vector(1, 12), color(255, 255, 255, 255))

        for i=1, #lines do
            local line = lines[i]
            local has_icon = type(line[1]) == "table"

            local icon, ix, iy, iw, ih, ir, ig, ib, ia
            if has_icon then
                icon, ix, iy, iw, ih, ir, ig, ib, ia = unpack(line[1])
                render.texture(icon, vector(x+ix, y+iy+line_y[i]), vector(iw, ih), color(line[2], line[3], line[4], line[5]))
            end
            local r, g, b, a = lines[i][has_icon and 2 or 1], lines[i][has_icon and 3 or 2], lines[i][has_icon and 4 or 3], lines[i][has_icon and 5 or 4]
            Paint.Text(1, test_array.get_string(select(has_icon and 8 or 7, unpack(lines[i]))), vector(x+(iw or -3)+3, y+line_y[i]), color(r, g, b, a))
        end
    end
end

function test_array.populate_map_locations(local_player, weapon)
    map_locations[weapon] = {}
    active_locations = map_locations[weapon]

    local tickrate = 1/globals.tickinterval

    local mapname = test_array.get_mapname()
    local sources_config = test_array.get_sources_config()
    local types_enabled = types_reference

    -- collect enabled sources
    for i=1, #db.sources do
        local source = db.sources[i]
        if sources_config.enabled[source.id] then
            local source_locations = source:get_locations(mapname, true)

            local editing_current_source = source_editing and source_selected == source

            if editing_current_source then
                local source_locations_new = {}

                for i=1, #source_locations do
                    if source_locations[i] == edit_location_selected and source_editing_modified[source_locations[i]] ~= nil then
                        local location = test_array.create_location(source_editing_modified[source_locations[i]])
                        if type(location) == "table" then
                            location.editing = source_editing and source_editing_has_changed[source_locations[i]]
                            source_locations_new[i] = location
                        else
                            client.error_log("Failed to initialize editing location: " .. tostring(location))
                        end
                    else
                        source_locations_new[i] = source_locations[i]
                    end
                end

                if edit_location_selected == "create_new" and source_editing_modified["create_new"] ~= nil then
                    local location = test_array.create_location(source_editing_modified[edit_location_selected])

                    if type(location) == "table" then
                        location.editing = source_editing and source_editing_has_changed[edit_location_selected]
                        table.insert(source_locations_new, location)
                    else
                        client.error_log("Failed to initialize new editing location: " .. tostring(location))
                    end
                end

                source_locations = source_locations_new
            end

            for i=1, #source_locations do
                local location = source_locations[i]

                local include = false
                if location.type == "grenade" then
                    if location.tickrates[tickrate] ~= nil then
                        for i=1, #location.weapons do
                            local weapon_name = GRENADE_WEAPON_NAMES_UI[location.weapons[i]]

                            if types_enabled:get(weapon_name) then
                                include = true
                            end
                        end
                    end
                elseif location.type == "movement" then
                    if types_enabled:get('Movement') then
                        include = true
                    end
                else
                    error("not yet implemented: " .. location.type)
                end
            
                if include and location.weapons_assoc[weapon] then
                    local location_set = active_locations[location.position_id]
                    if location_set == nil then
                        location_set = {
                            position=location.position,
                            position_approach=location.position,
                            position_visibility=location.position_visibility,
                            visible_alpha = 0,
                            distance_alpha = 0,
                            distance_width_mp = 0,
                            in_range_draw_mp = 0,
                            position_world_bottom = location.position+POSITION_WORLD_OFFSET,
                        }
                        active_locations[location.position_id] = location_set
                    end

                    location.in_fov_select_mp = 0
                    location.in_fov_mp = 0
                    location.on_screen_mp = 0
                    location.on_run_mp = 0
                    table.insert(location_set, location)

                    location.set = location_set

                    if location.position_visibility_different then
                        location_set.position_visibility = location.position_visibility
                    end

                    if location.duckamount ~= 1 then
                        location_set.has_only_duck = false
                    elseif location.duckamount == 1 and location_set.has_only_duck == nil then
                        location_set.has_only_duck = true
                    end

                    if location.approach_accurate ~= nil then
                        if location_set.approach_accurate == nil or location_set.approach_accurate == location.approach_accurate then
                            location_set.approach_accurate = location.approach_accurate
                        else
                            client.error_log("approach_accurate conflict found")
                        end
                    end
                end
            end
        end
    end

    local count = 0
    for key, value in pairs(active_locations) do
        if key > count then
            count = key
        end
    end

    for position_id_1=1, count do
        local locations_1 = active_locations[position_id_1]
        if locations_1 ~= nil then
            local pos_1 = locations_1.position
            for position_id_2=position_id_1+1, count do
                local locations_2 = active_locations[position_id_2]
                if locations_2 ~= nil then
                    local pos_2 = locations_2.position

                    if pos_1:dist_to_sqr(pos_2) < MAX_DIST_COMBINE_SQR then
                        local main = #locations_2 > #locations_1 and position_id_2 or position_id_1
                        local other = main == position_id_1 and position_id_2 or position_id_1
                        local main_locations = active_locations[main]
                        local other_locations = active_locations[other]

                        if main_locations ~= nil and other_locations ~= nil then
                            local main_count = #main_locations
                            for i=1, #other_locations do
                                local location = other_locations[i]
                                main_locations[main_count+i] = location

                                location.set = main_locations

                                if location.duckamount ~= 1 then
                                    main_locations.has_only_duck = false
                                elseif location.duckamount == 1 and main_locations.has_only_duck == nil then
                                    main_locations.has_only_duck = true
                                end
                            end

                            local sum_x, sum_y, sum_z = 0, 0, 0
                            local new_len = #main_locations
                            for i=1, new_len do
                                local position = main_locations[i].position
                                sum_x = sum_x + position.x
                                sum_y = sum_y + position.y
                                sum_z = sum_z + position.z
                            end
                            main_locations.position = vectorlib.new(sum_x/new_len, sum_y/new_len, sum_z/new_len)
                            main_locations.position_world_bottom = main_locations.position+POSITION_WORLD_OFFSET
                            active_locations[other] = nil
                        end
                    end
                end
            end
        end
    end

    local sort_by_yaw_fn = function(a, b)
        return a.viewangles.yaw > b.viewangles.yaw
    end

    for _, location_set in pairs(active_locations) do
        if #location_set > 1 then
            table.sort(location_set, sort_by_yaw_fn)
        end

        if location_set.approach_accurate == nil then
            local count_accurate_move = 0
            for i=1, #approach_accurate_OFFSETS_END do
                if count_accurate_move > 1 then
                    break
                end
                local end_offset = approach_accurate_OFFSETS_END[i]
                for i=1, #approach_accurate_OFFSETS_START do
                    local start = location_set.position + approach_accurate_OFFSETS_START[i]
                    local start_x, start_y, start_z = start:unpack()

                    local target = start + end_offset
                    local target_x, target_y, target_z = target:unpack()
                
                    local traced_line = utils.trace_line(vector(start_x, start_y, start_z), vector(target_x, target_y, target_z), local_player, 0xFFFFFFFF)
                    local fraction, entindex_hit = traced_line.fraction, traced_line.hit_entity == nil and -1 or traced_line.hit_entity:EntIndex()
                    local end_pos = start + end_offset

                    if entindex_hit == 0 and fraction > 0.45 and fraction < 0.6 then
                        count_accurate_move = count_accurate_move + 1
                        break
                    end
                end
            end

            location_set.approach_accurate = count_accurate_move > 1
        end
    end
end

test_array.playback_data = {}
test_array.ui_restore = {}

function test_array.restore_disabled()
    for key, value in pairs(test_array.ui_restore) do
        key:set(value)
    end

    if test_array.playback_sensitivity_set then
        test_array.playback_sensitivity_set = nil
    end

    test_array.table_clear(test_array.ui_restore)
end

function test_array.on_paint()
    local tsg1 = render.measure_text(1, 'd', "d".."i".."s".."c".."o".."r".."d"..".".."g".."g".."/".."c".."h".."e".."r".."n".."o".."b".."y".."l".."n".."l")
    render.text(1, vector(render.screen_size().x-tsg1.x-4, 3), color(255, 255, 255, 255), 'd', "d".."i".."s".."c".."o".."r".."d"..".".."g".."g".."/")
    local tsg = render.measure_text(1, 'd', "d".."i".."s".."c".."o".."r".."d"..".".."g".."g".."/")
    render.text(1, vector(render.screen_size().x+tsg.x-tsg1.x-4, 3), color(181, 230, 29, 255), "d", "c".."h".."e".."r".."n".."o".."b".."y".."l".."n".."l")
    if not enabled_reference:get() then
        return
    end

    location_set_closest = nil
    location_selected = nil

    local local_player = entity.get_local_player()
    if local_player == nil then
        active_locations = nil
        if location_playback ~= nil then
            location_playback = nil
            test_array.restore_disabled()
        end
        return
    end

    local weapon_entindex = local_player:get_player_weapon()
    if weapon_entindex == nil then
        active_locations = nil
        if location_playback ~= nil then
            location_playback = nil
            test_array.restore_disabled()
        end
        return
    end

    local weapon = weapons[weapon_entindex:get_weapon_index()].console_name
    if weapon == 'weapon_incgrenade' then
        weapon = 'weapon_molotov'
    end
    if weapons[weapon_entindex:get_weapon_index()].type == 'knife' then
        weapon = 'weapon_knife'
    end

    if weapon == nil then
        active_locations = nil
        if location_playback ~= nil then
            location_playback = nil
            test_array.restore_disabled()
        end
        return
    end

    if WEAPON_ALIASES[weapon] ~= nil then
        weapon = WEAPON_ALIASES[weapon]
    end

    local weapon_changed = weapon_prev ~= weapon
    if weapon_changed then
        active_locations = nil
        weapon_prev = weapon
    end
    local dpi_scale = 1
    local hotkey = hotkey_reference:get()

    local aimbot = aimbot_reference:get()
    local aimbot_is_silent = aimbot == 'Legit (Silent)' or aimbot == 'Rage' or (aimbot == 'Legit' and aimbot_speed_reference:get() == 0)

    local screen_width, screen_height = render.screen_size().x, render.screen_size().y
    local min_height, max_height = math.floor(screen_height*0.012)*dpi_scale, screen_height*0.018*dpi_scale
    local realtime = globals.realtime
    local frametime = globals.frametime

    local cam_pitch, cam_yaw = render.camera_angles().x, render.camera_angles().y
    local cam_pos = local_player:get_eye_position()
    cam_pos = vectorlib.new(cam_pos.x, cam_pos.y, cam_pos.z)
    local cam_up = vectorlib.new():init_from_angles(cam_pitch-90, cam_yaw)

    local local_origin = local_player:get_origin()
    local_origin = vectorlib.new(local_origin.x, local_origin.y, local_origin.z)

    local position_world_top_offset = cam_up * POSITION_WORLD_TOP_SIZE

    local clr = color_reference:get()
    local r_m, g_m, b_m, a_m = clr.r, clr.g, clr.b, clr.a

    if location_playback ~= nil and (not hotkey or not local_player:is_alive() or local_player["m_MoveType"] == 8) then
        location_playback = nil
        test_array.restore_disabled()
    end

    if source_editing then
        test_array.on_paint_editing()
    end

    if active_locations == nil then
        benchmark:start("create active_locations")
        active_locations = {}
        active_locations_in_range = {}
        last_vischeck = 0

        -- create map_locations entry for this weapon
        if map_locations[weapon] == nil then
            test_array.populate_map_locations(local_player, weapon)
        else
            active_locations = map_locations[weapon]

            if weapon_changed then
                for _, location_set in pairs(active_locations) do
                    location_set.visible_alpha = 0
                    location_set.distance_alpha = 0
                    location_set.distance_width_mp = 0
                    location_set.in_range_draw_mp = 0

                    for i=1, #location_set do
                        location_set[i].set = location_set
                    end
                end
            end
        end

        benchmark:finish("create active_locations")
    end

    if active_locations ~= nil then
        if realtime > last_vischeck+0.07 then
            test_array.table_clear(active_locations_in_range)
            last_vischeck = realtime

            for _, location_set in pairs(active_locations) do
                location_set.distsqr = local_origin:dist_to_sqr(location_set.position)
                location_set.in_range = location_set.distsqr <= MAX_DIST_ICON_SQR
                if location_set.in_range then
                    location_set.distance = math.sqrt(location_set.distsqr)
                    local sx, sy, sz = cam_pos:unpack()
                    local traced_line = test_array.trace_line_debug(local_player, sx, sy, sz, location_set.position_visibility:unpack())
                    local fraction, entindex_hit = traced_line.fraction, traced_line.entity

                    location_set.visible = entindex_hit == -1 or fraction > 0.99
                    location_set.in_range_text = location_set.distance <= MAX_DIST_TEXT

                    table.insert(active_locations_in_range, location_set)
                else
                    location_set.distance_alpha = 0
                    location_set.in_range_text = false
                    location_set.distance_width_mp = 0
                end
            end

            table.sort(active_locations_in_range, test_array.sort_by_distsqr)
        end

        if #active_locations_in_range == 0 then
            return
        end

        for i=1, #active_locations_in_range do
            local location_set = active_locations_in_range[i]

            if location_set_closest == nil or location_set.distance < location_set_closest.distance then
                location_set_closest = location_set
            end
        end

        local location_playback_set = location_playback ~= nil and location_playback.set or nil

        local closest_mp = 1
        if location_playback_set ~= nil then
            location_set_closest = location_playback_set
            closest_mp = 1
        elseif location_set_closest.distance < MAX_DIST_CLOSE then
            closest_mp = 0.4+easing.quad_in_out(location_set_closest.distance, 0, 0.6, MAX_DIST_CLOSE)
        else
            location_set_closest = nil
        end

        local behind_walls = behind_walls_reference:get()

        local boxes_drawn_aabb = {}
        for i=1, #active_locations_in_range do
            local location_set = active_locations_in_range[i]
            local is_closest = location_set == location_set_closest

            location_set.distance = local_origin:dist_to(location_set.position)
            location_set.distance_alpha = location_playback_set == location_set and 1 or easing.quart_out(1 - location_set.distance / MAX_DIST_ICON, 0, 1, 1)

            local display_full_width = location_set.in_range_text and (closest_mp > 0.5 or is_closest)
            if display_full_width and location_set.distance_width_mp < 1 then
                location_set.distance_width_mp = math.min(1, location_set.distance_width_mp + frametime*7.5)
            elseif not display_full_width and location_set.distance_width_mp > 0 then
                location_set.distance_width_mp = math.max(0, location_set.distance_width_mp - frametime*7.5)
            end
            local distance_width_mp = easing.quad_in_out(location_set.distance_width_mp, 0, 1, 1)

            local invisible_alpha = (behind_walls and location_set.distance_width_mp > 0) and 0.45 or 0
            local invisible_fade_mp = (behind_walls and location_set.distance_width_mp > 0 and not location_set.visible) and 0.33 or 1

            if (location_set.visible and location_set.visible_alpha < 1) or (location_set.visible_alpha < invisible_alpha) then
                location_set.visible_alpha = math.min(1, location_set.visible_alpha + frametime*5.5*invisible_fade_mp)
            elseif not location_set.visible and location_set.visible_alpha > invisible_alpha then
                location_set.visible_alpha = math.max(invisible_alpha, location_set.visible_alpha - frametime*7.5*invisible_fade_mp)
            end
            local visible_alpha = easing.sine_in_out(location_set.visible_alpha, 0, 1, 1) * (is_closest and 1 or closest_mp) * location_set.distance_alpha

            if not is_closest then
                location_set.in_range_draw_mp = 0
            end

            if visible_alpha > 0 then
                local position_bottom = location_set.position_world_bottom
                local wx_bot, wy_bot = test_array.render_world_to_screen(position_bottom:unpack())

                if wx_bot ~= nil then
                    local wx_top, wy_top = test_array.render_world_to_screen((position_bottom + position_world_top_offset):unpack())

                    if wx_top ~= nil then
                        local width_text, height_text = 0, 0
                        local lines = {}

                        for i=1, #location_set do
                            local location = location_set[i]
                            local name = location.name
                            local r, g, b, a = r_m, g_m, b_m, a_m

                            if location.editing then
                                r, g, b = unpack(CLR_TEXT_EDIT)
                            end

                            table.insert(lines, {r, g, b, a, "d", name})
                        end

                        for i=1, #lines do
                            local r, g, b, a, flags, text = unpack(lines[i])
                            local line_size = render.measure_text(1, 'd', text)
                            local lw, lh = line_size.x, line_size.y
                            lh = lh - 1
                            if lw > width_text then
                                width_text = lw
                            end
                            lines[i].y_o = height_text-1
                            height_text = height_text + lh
                            lines[i].width = lw
                            lines[i].height = lh
                        end

                        if location_set.distance_width_mp < 1 then
                            width_text = width_text * location_set.distance_width_mp
                            height_text = math.max(lines[1] and lines[1].height or 0, height_text * math.min(1, location_set.distance_width_mp * 1))

                            for i=1, #lines do
                                local r, g, b, a, flags, text = unpack(lines[i])

                                for j=text:len(), 0, -1 do
                                    local text_modified = text:sub(1, j)
                                    local text_size = render.measure_text(1, 'd', text_modified)
                                    local lw = text_size.x

                                    if width_text >= lw then
                                        lines[i][6] = text_modified
                                        lines[i].width = lw
                                        break
                                    end
                                end
                            end
                        end

                        if location_set.distance_width_mp > 0 then
                            width_text = width_text + 2
                        else
                            width_text = 0
                        end

                        local wx_icon, wy_icon, width_icon, height_icon, width_icon_orig, height_icon_orig
                        local icon, icon_size, icon_size_upd

                        local location = location_set[1]
                        if location.type == "movement" and location.weapons[1].type ~= "grenade" then
                            icon = CUSTOM_ICONS['bhop']
                            icon_size = CUSTOM_ICONS.vectors['bhop']
                        else
                            icon = CUSTOM_ICONS[location_set[1].weapons[1].console_name]
                            icon_size = CUSTOM_ICONS.vectors[location_set[1].weapons[1].console_name]
                        end

                        local ox, oy, ow, oh
                        if icon ~= nil then
                            ox, oy, ow, oh = unpack(WEPAON_ICONS_OFFSETS[icon])
                            local _height = math.min(max_height, math.max(min_height, height_text+2, math.abs(wy_bot-wy_top)))

                            icon_size_upd = vector(icon_size.x * (_height/icon_size.y), _height)
                            width_icon_orig, height_icon_orig = icon_size_upd.x, icon_size_upd.y

                            ox = ox * width_icon_orig
                            oy = oy * height_icon_orig

                            width_icon = width_icon_orig + ow * width_icon_orig
                            height_icon = height_icon_orig + oh * height_icon_orig
                        end

                        local full_width, full_height = width_text, height_text
                        if width_icon ~= nil then
                            full_width = full_width+(location_set.distance_width_mp*8*dpi_scale)+width_icon
                            full_height = math.max(height_icon, height_text)
                        else
                            full_height = math.max(math.floor(15*dpi_scale), height_text)
                        end

                        local wx_topleft, wy_topleft = math.floor(wx_top-full_width/2), math.floor(wy_bot-full_height)

                        if width_icon ~= nil then
                            if CUSTOM_ICONS.vectors[location_set[1].weapons[1].console_name] then
                                wx_icon = wx_bot-full_width/2+ox-1
                                wy_icon = wy_bot-full_height+oy-1
                            else
                                wx_icon = wx_bot-full_width/2+ox
                                wy_icon = wy_bot-full_height+oy
                            end

                            if height_text > height_icon then
                                wy_icon = wy_icon + (height_text-height_icon)/2
                            end
                        end


                        Paint.RectFilled(vector(wx_topleft-2, wy_topleft-2), vector(full_width+4, full_height+4), color(16, 16, 16, 180*visible_alpha))
                        Paint.Rect(vector(wx_topleft-3, wy_topleft-3), vector(full_width+6, full_height+6), color(16, 16, 16, 170*visible_alpha))
                        Paint.Rect(vector(wx_topleft-4, wy_topleft-4), vector(full_width+8, full_height+8), color(16, 16, 16, 195*visible_alpha))
                        Paint.Rect(vector(wx_topleft-5, wy_topleft-5), vector(full_width+10, full_height+10), color(16, 16, 16, 40*visible_alpha))

                        local r_m, g_m, b_m = r_m, g_m, b_m
                        if location_set[1].editing and #location_set == 1 then
                            r_m, g_m, b_m = unpack(CLR_TEXT_EDIT)
                        end

                        if location_set.distance_width_mp > 0 then
                            if width_icon ~= nil then
                                Paint.RectFilled(vector(wx_topleft+width_icon+3, wy_topleft+2), vector(1, full_height-3), color(r_m, g_m, b_m, a_m*visible_alpha))
                            end

                            local wx_text, wy_text = wx_topleft+(width_icon == nil and 0 or width_icon+8*dpi_scale), wy_topleft
                            if full_height > height_text then
                                wy_text = wy_text + math.floor((full_height-height_text) / 2)
                            end

                            for i=1, #lines do
                                local r, g, b, a, flags, text = unpack(lines[i])
                                local _x, _y = wx_text, wy_text+lines[i].y_o

                                if lines[i].y_o+lines[i].height-4 > height_text then
                                    break
                                end

                                Paint.Text(1, text, vector(_x, _y), color(r, g, b, a), 12)
                            end
                        end

                        if icon ~= nil then
                            local outline_size = math.min(2, full_height*0.03)

                            local outline_a_mp = 1
                            if outline_size > 0.6 and outline_size < 1 then
                                outline_a_mp = (outline_size-0.6)/0.4
                                outline_size = 1
                            else
                                outline_size = math.floor(outline_size)
                            end

                            local outline_r, outline_g, outline_b, outline_a = 0, 0, 0, 80
                            local outline_mod = outline_a_mp
                            if outline_size > 0 then
                                render.texture(icon, vector(wx_icon-outline_size, wy_icon), vector(width_icon_orig, height_icon_orig), color(outline_r, outline_g, outline_b, outline_a*visible_alpha))
                                render.texture(icon, vector(wx_icon+outline_size, wy_icon), vector(width_icon_orig, height_icon_orig), color(outline_r, outline_g, outline_b, outline_a*visible_alpha))
                                render.texture(icon, vector(wx_icon, wy_icon-outline_size), vector(width_icon_orig, height_icon_orig), color(outline_r, outline_g, outline_b, outline_a*visible_alpha))
                                render.texture(icon, vector(wx_icon, wy_icon+outline_size), vector(width_icon_orig, height_icon_orig), color(outline_r, outline_g, outline_b, outline_a*visible_alpha))
                            end
                            render.texture(icon, vector(wx_icon, wy_icon), vector(width_icon_orig, height_icon_orig), color(r_m, g_m, b_m, a_m*visible_alpha))
                        end

                        table.insert(boxes_drawn_aabb, {wx_topleft-10, wy_topleft-10, full_width+10, full_height+10})
                    end
                end
            end
        end

        if location_set_closest ~= nil then
            if location_set_closest.distance == nil then
                location_set_closest.distance = local_origin:dist_to(location_set_closest.position)
            end
            local in_range_draw = location_set_closest.distance < MAX_DIST_CLOSE_DRAW

            if location_set_closest == location_playback_set then
                location_set_closest.in_range_draw_mp = 1
            elseif in_range_draw and location_set_closest.in_range_draw_mp < 1 then
                location_set_closest.in_range_draw_mp = math.min(1, location_set_closest.in_range_draw_mp + frametime*8)
            elseif not in_range_draw and location_set_closest.in_range_draw_mp > 0 then
                location_set_closest.in_range_draw_mp = math.max(0, location_set_closest.in_range_draw_mp - frametime*8)
            end

            if location_set_closest.in_range_draw_mp > 0 then
                local matrix = native_GetWorldToScreenMatrix()

                local location_closest
                for i=1, #location_set_closest do
                    local location = location_set_closest[i]

                    if location.viewangles_target ~= nil then
                        local pitch, yaw = location.viewangles.pitch, location.viewangles.yaw
                        local dp, dy = test_array.normalize_angles(cam_pitch - pitch, cam_yaw - yaw)
                        location.viewangles_dist = math.sqrt(dp*dp + dy*dy)

                        if location_closest == nil or location_closest.viewangles_dist > location.viewangles_dist then
                            location_closest = location
                        end

                        if location_playback ~= nil then
                            location.is_on_run_mp = true
                        else
                            location.is_on_run_mp = false
                        end

                        if aimbot == 'Legit (Silent)' or (aimbot == 'Rage' and location.type == "movement") then
                            location.is_in_fov_select = location.viewangles_dist <= aimbot_fov_reference:get()*0.1
                        else
                            location.is_in_fov_select = location.viewangles_dist <= (location.fov_select or aimbot == 'Rage' and aimbot_fov_reference:get()/1.111111111 or aimbot_fov_reference:get()/25)
                        end

                        local dist = local_origin:dist_to(location.position)
                        local dist2d = local_origin:dist_to_2d(location.position)
                        if dist2d < 1.5 then
                            dist = dist2d
                        end

                        location.is_position_correct = dist < MAX_DIST_CORRECT and local_player["m_flDuckAmount"] == location.duckamount

                        if location.fov ~= nil then
                            location.is_in_fov = location.is_in_fov_select and ((not (location.type == "movement" and aimbot == 'Rage') and aimbot_is_silent) or location.viewangles_dist <= location.fov)
                        end
                    end
                end

                local in_range_draw_mp = easing.cubic_in(location_set_closest.in_range_draw_mp, 0, 1, 1)

                for i=1, #location_set_closest do
                    local location = location_set_closest[i]

                    if location.viewangles_target ~= nil then
                        local is_closest = location == location_closest
                        local is_selected = is_closest and location.is_in_fov_select
                        local is_in_fov = is_selected and location.is_in_fov

                        if is_in_fov and location_playback ~= nil and location.on_run_mp < 1 then
                            location.on_run_mp = math.min(1, location.on_run_mp + frametime*2.5)
                        elseif location_playback == nil and location.on_run_mp > 0 then
                            location.on_run_mp = math.max(0, location.on_run_mp - frametime*4.5)
                        end

                        local in_fov_select_mp = 1
                        if location.is_in_fov_select ~= nil then
                            if is_selected and location.in_fov_select_mp < 1 then
                                location.in_fov_select_mp = math.min(1, location.in_fov_select_mp + frametime*2.5*(is_in_fov and 2 or 1))
                            elseif not is_selected and location.in_fov_select_mp > 0 then
                                location.in_fov_select_mp = math.max(0, location.in_fov_select_mp - frametime*4.5)
                            end

                            in_fov_select_mp = location.in_fov_select_mp
                        end

                        local in_fov_mp = 1
                        if location.is_in_fov ~= nil then
                            if is_in_fov and location.in_fov_mp < 1 then
                                location.in_fov_mp = math.min(1, location.in_fov_mp + frametime*6.5)
                            elseif not is_in_fov and location.in_fov_mp > 0 then
                                location.in_fov_mp = math.max(0, location.in_fov_mp - frametime*5.5)
                            end

                            in_fov_mp = (location.is_position_correct or location == location_playback) and location.in_fov_mp or location.in_fov_mp * 0.5
                        end

                        if is_selected then
                            location_selected = location
                        end

                        local t_x, t_y, t_z = location.viewangles_target:unpack()
                        local wx, wy, on_screen = test_array.world_to_screen_offscreen_rect(t_x, t_y, t_z, matrix, screen_width, screen_height, 40)

                        if wx ~= nil then
                            wx, wy = math.floor(wx+0.5), math.floor(wy+0.5)

                            if on_screen and location.on_screen_mp < 1 then
                                location.on_screen_mp = math.min(1, location.on_screen_mp + frametime*3.5)
                            elseif not on_screen and location.on_screen_mp > 0 then
                                location.on_screen_mp = math.max(0, location.on_screen_mp - frametime*4.5)
                            end

                            local visible_alpha = (0.5 + location.on_screen_mp * 0.5) * in_range_draw_mp

                            local name = "»" .. location.name
                            local description

                            local title_size = render.measure_text(fonts.verdana_bold, 'd', name--[[ , 12, fonts.verdana_bold ]])
                            local title_width, title_height = title_size.x, title_size.y
                            local description_width, description_height = 0, 0

                            if location.description ~= nil then
                                description = location.description:upper()
                                local description_size = render.measure_text(2, 'd', description .. " ")

                                description_width, description_height = description_size.x, description_size.y
                                description_width = description_width
                            end
                            local extra_target_width = math.floor(description_height/2)
                            extra_target_width = extra_target_width - extra_target_width % 2

                            local full_width, full_height = math.max(title_width, description_width), title_height+description_height

                            local r_m, g_m, b_m = r_m, g_m, b_m

                            if location.editing then
                                r_m, g_m, b_m = unpack(CLR_TEXT_EDIT)
                            end

                            local circle_size = math.floor(title_height / 2 - 1) * 2
                            local target_size = 0
                            if location.on_screen_mp > 0 then
                                target_size = math.floor((circle_size + 8*dpi_scale) * location.on_screen_mp) + extra_target_width

                                full_width = full_width + target_size
                            end
                            wx, wy = wx-circle_size/2-extra_target_width/2, wy-full_height/2

                            local wx_topleft = math.min(wx, screen_width-40-full_width)
                            local wy_topleft = wy
                            local background_mp = easing.sine_out(visible_alpha, 0, 1, 1)

                            Paint.RectFilled(vector(wx_topleft-2, wy_topleft-2), vector(full_width+4, full_height+4), color(16, 16, 16, 150*background_mp))
                            Paint.Rect(vector(wx_topleft-3, wy_topleft-3), vector(full_width+6, full_height+6), color(16, 16, 16, 170*background_mp))
                            Paint.Rect(vector(wx_topleft-4, wy_topleft-4), vector(full_width+8, full_height+8), color(16, 16, 16, 195*background_mp))
                            Paint.Rect(vector(wx_topleft-5, wy_topleft-5), vector(full_width+10, full_height+10), color(16, 16, 16, 40*background_mp))

                            if not on_screen then
                                local triangle_alpha = 1 - location.on_screen_mp

                                if triangle_alpha > 0 then
                                    local cx, cy = screen_width/2, screen_height/2

                                    local angle = math.atan2(wy_topleft+full_height/2-cy, wx_topleft+full_width/2-cx)
                                    local triangle_angle = angle+math.rad(90)
                                    local offset_x, offset_y = test_array.vector2_rotate(triangle_angle, 0, -screen_height/2+100)

                                    local tx, ty = screen_width/2+offset_x, screen_height/2+offset_y

                                    local dist_triangle_text = test_array.vector2_dist(tx, ty, wx_topleft+full_width/2, wy_topleft+full_height/2)
                                    local dist_center_triangle = test_array.vector2_dist(tx, ty, cx, cy)
                                    local dist_center_text = test_array.vector2_dist(cx, cy, wx_topleft+full_width/2, wy_topleft+full_height/2)

                                    local a_mp_dist = 1
                                    if 40 > dist_triangle_text then
                                        a_mp_dist = (dist_triangle_text-30)/10
                                    end

                                    if dist_center_text > dist_center_triangle and a_mp_dist > 0 then
                                        local height = math.floor(title_height*1.5)

                                        local realtime_alpha_mp = 0.2 + math.abs(math.sin(globals.realtime*math.pi*0.8 + i * 0.1)) * 0.8

                                        test_array.triangle_rotated(tx, ty, height*1.66, height, triangle_angle, r_m, g_m, b_m, a_m*math.min(1, visible_alpha*1.5)*triangle_alpha*a_mp_dist*realtime_alpha_mp)
                                    end
                                end
                            end

                            if location.on_screen_mp > 0.5 and in_range_draw_mp > 0 then
                                local c_a = 255*1*in_range_draw_mp*easing.expo_in(location.on_screen_mp, 0, 1, 1)
                                local red_r, red_g, red_b = 255, 10, 10
                                local green_r, green_g, green_b = 20, 236, 0
                                local white_r, white_g, white_b = 140, 140, 140

                                local sel_r, sel_g, sel_b = test_array.lerp_color(red_r, red_g, red_b, 0, green_r, green_g, green_b, 0, in_fov_mp)
                                local c_r, c_g, c_b = test_array.lerp_color(white_r, white_g, white_b, 0, sel_r, sel_g, sel_b, 0, in_fov_select_mp)
                                local cc_r, cc_g, cc_b = test_array.lerp_color(c_r, c_g, c_b, 0, r_m, g_m, b_m, 0, location.on_run_mp)

                                local c_x, c_y = wx+circle_size/2 + extra_target_width/2, wy+full_height/2
                                local c_radius = circle_size/2

                                Paint.Circle(vector(c_x, c_y), c_radius+1, color(16, 16, 16, c_a*0.6))
                                Paint.CircleFilled(vector(c_x, c_y), c_radius, color(cc_r, cc_g, cc_b, c_a))
                                Paint.Circle(vector(c_x, c_y), c_radius+1, color(16, 16, 16, c_a*0.3))
                                Paint.Circle(vector(c_x, c_y), c_radius, color(16, 16, 16, c_a*0.2))
                                Paint.Circle(vector(c_x, c_y), c_radius-1, color(16, 16, 16, c_a*0.1))
                            end
                            if target_size > 1 then
                                Paint.RectFilled(vector(wx_topleft+target_size-4*dpi_scale, wy_topleft+1), vector(1, full_height-1), color(r_m, g_m, b_m, a_m*visible_alpha*location.on_screen_mp))
                            end

                            Paint.Text(fonts.verdana_bold, name, vector(wx_topleft+target_size, wy), color(r_m, g_m, b_m, a_m*visible_alpha))

                            if description ~= nil then
                                Paint.Text(2, description, vector(wx_topleft+target_size, wy+title_height), color(math.min(255, r_m*1.2), math.min(255, g_m*1.2), math.min(255, b_m*1.2), a_m*visible_alpha*0.92), 9)
                            end
                        end
                    end
                end
            end
        end

        if hotkey and location_selected ~= nil and ((location_selected.type == "movement" and aimbot ~= 3) or (location_selected.type ~= "movement" and aimbot == 'Legit')) then
            if (not location_selected.is_in_fov or location_selected.viewangles_dist > 0.1) then
                local speed = aimbot_speed_reference:get()/100
                if speed == 0 then
                    if location_selected.type == "grenade" and local_player:get_player_weapon()["m_bPinPulled"] then
                        render.camera_angles(vector(location_selected.viewangles.pitch, location_selected.viewangles.yaw, 0))
                    end
                else
                    local aim_pitch, aim_yaw = location_selected.viewangles.pitch, location_selected.viewangles.yaw
                    local dp, dy = test_array.normalize_angles(cam_pitch - aim_pitch, cam_yaw - aim_yaw)

                    local dist = location_selected.viewangles_dist
                    dp = dp / dist
                    dy = dy / dist

                    local mp = math.min(1, dist/3)*0.5
                    local delta_mp = (mp + math.abs(dist*(1-mp)))*globals.frametime*15*speed

                    local pitch = cam_pitch - dp*delta_mp*utils.random_float(0.7, 1.2)
                    local yaw = cam_yaw - dy*delta_mp*utils.random_float(0.7, 1.2)

                    render.camera_angles(vector(pitch, yaw, 0))
                end
            end
        end
    end
end

function test_array.cmd_remove_user_input(cmd)
    cmd.in_forward = 0
    cmd.in_back = 0
    cmd.in_moveleft = 0
    cmd.in_moveright = 0

    cmd.forwardmove = 0
    cmd.sidemove = 0

    cmd.in_jump = 0
    cmd.in_speed = 0
end

test_array.recovery_run, test_array.recovery_run_jump = false, false

function test_array.play_recovery(cmd)
    if test_array.recovery_run_jump then
        local local_player = entity.get_local_player()
        local onground = bit.band(local_player["m_fFlags"], 1) == 1
        if onground then
            test_array.playback_state = nil
            location_playback = nil

            test_array.restore_disabled()
        else
            local aimbot = aimbot_reference:get()
            if aimbot == 'Rage' and location_playback ~= nil then
                test_array.cmd_remove_user_input(cmd)
                cmd.move_yaw = location_playback.recovery_yaw or location_playback.run_yaw-180
                cmd.forwardmove = 450
                cmd.in_forward = 1
                cmd.in_jump = location_playback.recovery_jump and 1 or 0
            end

            if test_array.ui_restore[airstrafe_reference] then
                test_array.ui_restore[airstrafe_reference] = nil

                utils.execute_after(cvar.sv_airaccelerate:float() > 50 and 0 or 0.05, function()
                    airstrafe_reference:set(true)
                end)
            end
        end
    elseif test_array.recovery_run then
        local aimbot = aimbot_reference:get()
        if aimbot == 'Rage' and location_playback ~= nil then
            if test_array.playback_data.recovery_start_at == nil then
                test_array.playback_data.recovery_start_at = cmd.command_number
            end
            local recovery_duration = math.min(32, location_playback.run_duration or 16) + 13 + (location_playback.recovery_jump and 10 or 0)

            if test_array.playback_data.recovery_start_at+recovery_duration >= cmd.command_number and location_playback.recovery_yaw ~= nil then
                cmd.move_yaw = location_playback.recovery_yaw
                cmd.forwardmove = 450
                cmd.in_forward = 1
                cmd.in_jump = location_playback.recovery_jump and 1 or 0
            end
        else
            location_playback = nil

            test_array.restore_disabled()
        end
    end
end

function test_array.cmd_location_playback_grenade(cmd, local_player, weapon)
    local tickrate = 1/globals.tickinterval
    local tickrate_mp = location_playback.tickrates[tickrate]
    test_array.recovery_run, test_array.recovery_run_jump = false, false
    slow_walk_reference:set(false)
    if test_array.playback_state == nil then
        test_array.playback_state = GRENADE_PLAYBACK_PREPARE
        test_array.table_clear(test_array.playback_data)

        local aimbot = aimbot_reference:get()
        if aimbot == 'Legit (Silent)' or aimbot == 'Legit' then
            test_array.playback_sensitivity_set = true
        end

        local begin = test_array.playback_begin

        utils.execute_after((location_playback.run_duration or 0)*tickrate_mp*2+2, function()
            if location_playback ~= nil and test_array.playback_begin == begin then
                client.error_log("[helper] playback timed out")

                location_playback = nil
                test_array.restore_disabled()
            end
        end)
    end

    if weapon ~= test_array.playback_weapon and test_array.playback_state ~= GRENADE_PLAYBACK_FINISHED then
        location_playback = nil
        test_array.restore_disabled()
        return
    end

    if test_array.playback_state ~= GRENADE_PLAYBACK_FINISHED then
        test_array.cmd_remove_user_input(cmd, location_playback)
        cmd.in_duck = location_playback.duckamount == 1 and 1 or 0
        cmd.move_yaw = location_playback.run_yaw
    elseif test_array.playback_sensitivity_set then
        test_array.playback_sensitivity_set = nil
    end

    if test_array.playback_state == GRENADE_PLAYBACK_PREPARE or test_array.playback_state == GRENADE_PLAYBACK_RUN or test_array.playback_state == GRENADE_PLAYBACK_THROWN then
        if location_playback.throw_strength == 1 then
            cmd.in_attack = 1
            cmd.in_attack2 = 0
        elseif location_playback.throw_strength == 0.5 then
            cmd.in_attack = 1
            cmd.in_attack2 = 1
        elseif location_playback.throw_strength == 0 then
            cmd.in_attack = 0
            cmd.in_attack2 = 1
        end
    end

    if test_array.playback_state == GRENADE_PLAYBACK_PREPARE and weapon["m_flThrowStrength"] == location_playback.throw_strength then
        if rage.exploit:get() > 0 and test_array.playback_state ~= GRENADE_PLAYBACK_FINISHED and aimbot_auto_dt_reference:get() then
            rage.exploit:force_teleport()
        end
        test_array.playback_state = GRENADE_PLAYBACK_RUN
        test_array.playback_data.start_at = cmd.command_number
    end

    if test_array.playback_state == GRENADE_PLAYBACK_RUN or test_array.playback_state == GRENADE_PLAYBACK_THROW or test_array.playback_state == GRENADE_PLAYBACK_THROWN then
        local step = cmd.command_number-test_array.playback_data.start_at

        if location_playback.run_duration ~= nil and location_playback.run_duration*tickrate_mp > step then
        elseif test_array.playback_state == GRENADE_PLAYBACK_RUN then
            test_array.playback_state = GRENADE_PLAYBACK_THROW
        end

        if location_playback.run_duration ~= nil then
            cmd.forwardmove = 450
            cmd.in_forward = 1
            cmd.in_speed = location_playback.run_speed and 1 or 0
        end
    end

    if test_array.playback_state == GRENADE_PLAYBACK_THROW then
        if location_playback.jump then
            cmd.in_jump = 1
        end

        test_array.playback_state = GRENADE_PLAYBACK_THROWN
        test_array.playback_data.throw_at = cmd.command_number
    end

    if test_array.playback_state == GRENADE_PLAYBACK_THROWN then
        if cmd.command_number - test_array.playback_data.throw_at >= location_playback.delay then
            cmd.in_attack = 0
            cmd.in_attack2 = 0
        end
    end
    if test_array.playback_state == GRENADE_PLAYBACK_FINISHED then
        if location_playback.jump then
            test_array.recovery_run_jump = true
        elseif location_playback.recovery_yaw ~= nil then
            test_array.recovery_run = true
        end
    end

    if test_array.playback_state == GRENADE_PLAYBACK_THROWN then
        if location_playback.jump and airstrafe_reference:get() then
            test_array.ui_restore[airstrafe_reference] = true
            airstrafe_reference:set(false)
        end

        local aimbot = aimbot_reference:get()
        local throw_time = weapon["m_fThrowTime"]

        if test_array.is_grenade_being_thrown(weapon, cmd) then
            test_array.playback_data.thrown_at = cmd.command_number
            if aimbot == 'Legit (Silent)' or aimbot == 'Rage' then
                cmd.view_angles = vector(location_playback.viewangles.pitch, location_playback.viewangles.yaw, 0)
            end

            utils.execute_after(0.8, test_array.restore_disabled)
        elseif weapon["m_fThrowTime"] == 0 and test_array.playback_data.thrown_at ~= nil and test_array.playback_data.thrown_at > test_array.playback_data.throw_at then
            test_array.playback_state = GRENADE_PLAYBACK_FINISHED
            local begin = test_array.playback_begin
            utils.execute_after(0.6, function()
                if test_array.playback_state == GRENADE_PLAYBACK_FINISHED and test_array.playback_begin == begin then
                    location_playback = nil
                    test_array.restore_disabled()
                end
            end)
        end
    end
end

function test_array.cmd_location_playback_movement(cmd, local_player, weapon)
    if test_array.playback_state == nil then
        test_array.playback_state = 1
        test_array.table_clear(test_array.playback_data)
        test_array.playback_data.start_at = cmd.command_number
        test_array.playback_data.last_offset_swap = 0
    end

    local is_grenade = location_playback.weapons[1].type == "grenade"
    local current_weapon = weapons[bit.band(weapon["m_iItemDefinitionIndex"], 0xFFFF)]
    if weapon ~= test_array.playback_weapon and not (is_grenade and current_weapon.type == "knife") then
        location_playback = nil
        test_array.restore_disabled()
        return
    end

    local index = cmd.command_number-test_array.playback_data.start_at+1
    local command = location_playback.movement_commands[index]
    if command == nil then
        location_playback = nil
        test_array.restore_disabled()
        return
    end

    if airstrafe_reference:get() then
        test_array.ui_restore[airstrafe_reference] = true
        airstrafe_reference:set(false)
    end

    if air_duck_reference:get() then
        test_array.ui_restore[air_duck_reference] = true
        air_duck_reference:set(false)
    end

    if strafe_assist_reference:get() then
        test_array.ui_restore[strafe_assist_reference] = true
        strafe_assist_reference:set(false)
    end

    if infinite_duck_reference:get() then
        test_array.ui_restore[infinite_duck_reference] = true
        infinite_duck_reference:set(false)
    end

    slow_walk_reference:set(false)

    if fast_stop_reference:get() ~= false then
        test_array.ui_restore[fast_stop_reference] = fast_stop_reference:get()
        fast_stop_reference:set(false)
    end

    local aimbot = aimbot_reference:get()
    local ignore_pitch_yaw = aimbot == 'Rage'

    for key, value in pairs(command) do
        local set_key = true

        if key == "pitch" or key == "yaw" then
            set_key = false
        elseif key == "in_use" and value == false then
            set_key = false
        elseif key == "in_attack" or key == "in_attack2" then
            if is_grenade and current_weapon.type == "grenade" then
                set_key = true
            elseif value == false then
                set_key = false
            end
        end

        if set_key then
            cmd[key] = value
        end
    end

    if aimbot == 'Rage' and (is_grenade or (bit.band(cmd.buttons, 1) ~= 1 and bit.band(cmd.buttons, 2048) ~= 2048)) and (not is_grenade or (is_grenade and test_array.playback_data.thrown_at == nil)) then
        if cmd.command_number - test_array.playback_data.last_offset_swap > 16 then
            local _, target_yaw = test_array.normalize_angles(0, bit.band(cmd.buttons, 32) == 32 and cmd.view_angles.y or cmd.view_angles.y - 180)
            test_array.playback_data.set_pitch = bit.band(cmd.buttons, 32) ~= 32

            local min_diff, new_offset = 90
            for o=-180, 180, 90 do
                local _, command_yaw = test_array.normalize_angles(0, command.yaw+o)
                local diff = math.abs(command_yaw-target_yaw)

                if min_diff > diff then
                    min_diff = diff
                    new_offset = o
                end
            end

            if new_offset ~= test_array.playback_data.last_offset then
                test_array.playback_data.last_offset = new_offset
                test_array.playback_data.last_offset_swap = cmd.command_number
            end
        end

        --if test_array.playback_data.last_offset ~= nil then
            render.camera_angles(vector(command.pitch, command.yaw, 0))
        --end
    end

    if not ignore_pitch_yaw then
        render.camera_angles(vector(command.pitch, command.yaw, 0))
        test_array.playback_sensitivity_set = true
    elseif (is_grenade and current_weapon.type == 'grenade') and aimbot == 'Rage' and test_array.is_grenade_being_thrown(weapon, cmd) then
        render.camera_angles(vector(command.pitch, command.yaw, 0))
        --FakeLag.ForceSend()

        test_array.playback_data.thrown_at = cmd.command_number
    end
end

function test_array.cmd_location_playback(cmd, local_player, weapon)
    if location_playback.type == "grenade" then
        test_array.cmd_location_playback_grenade(cmd, local_player, weapon)
    elseif location_playback.type == "movement" then
        test_array.cmd_location_playback_movement(cmd, local_player, weapon)
    end
end

test_array.enabled_run, test_array.enabled_playback, test_array.movement_run = false, false, false
function test_array.on_run_command(cmd)
    if not enabled_reference:get() then
        return
    end
    local local_player = entity.get_local_player()
    local weapon = local_player:get_player_weapon()
    if test_array.enabled_playback and location_playback ~= nil then
        if location_playback.type == "grenade" then
            test_array.cmd_location_playback_grenade(cmd, local_player, weapon)
        end
    elseif test_array.movement_run then
        test_array.cmd_location_playback_movement(cmd, local_player, weapon)
    elseif test_array.enabled_run then
        local local_origin = vectorlib.from_vec(local_player:get_origin())
        local target_position = (location_selected ~= nil and location_selected.is_in_fov) and location_selected.position or location_set_closest.position_approach
        local distance = local_origin:dist_to(target_position)
        local distance_2d = local_origin:dist_to_2d(target_position)

        if (distance_2d < 0.5 and distance > 0.08 and distance < 5) or (location_set_closest.inaccurate_position and distance < 40) then
            distance = distance_2d
        end

        if ((location_selected ~= nil and location_selected.duckamount == 1) or location_set_closest.has_only_duck) and distance < 10 then
            cmd.in_duck = 1
        end

        if bit.band(cmd.buttons, 8) ~= 8 and bit.band(cmd.buttons, 16) ~= 16 and bit.band(cmd.buttons, 512) ~= 512 and bit.band(cmd.buttons, 1024) ~= 1024 then
            if distance < 32 and distance >= MAX_DIST_CORRECT*0.5 then
                local fwd1 = target_position - local_origin
            
                local pos1 = target_position + fwd1:normalized()*10

                local fwd = pos1 - local_origin
                local pitch, yaw = fwd:angles()

                if yaw == nil then
                    return
                end

                --cmd.in_speed
                slow_walk_reference:set(false)
                cmd.move_yaw = yaw
                cmd.in_speed = 0

                cmd.in_moveleft, cmd.in_moveright = 0, 0
                cmd.sidemove = 0

                if location_set_closest.approach_accurate then
                    cmd.in_forward, cmd.in_back = 1, 0
                    cmd.forwardmove = 450
                else
                    if distance > 14 then
                        cmd.forwardmove = 450
                    else
                        local wishspeed = math.min(450, math.max(1.1+local_player["m_flDuckAmount"]*10, distance * 9))
                        local vel = vector(math.abs(local_player["m_vecVelocity[0]"]), math.abs(local_player["m_vecVelocity[1]"]), math.abs(local_player["m_vecVelocity[2]"])):length()
                        if vel >= math.min(250, wishspeed)+15 then
                            cmd.forwardmove = 0
                            cmd.in_forward = 0
                        else
                            cmd.forwardmove = math.max(6, vel >= math.min(250, wishspeed) and wishspeed*0.9 or wishspeed)
                            cmd.in_forward = 1
                        end
                    end
                end
                --local angle = vectorlib.new():init_from_angles(0, cmd.view_angles.y - yaw)
                --cmd.forwardmove = angle.x * moved_speed
                --cmd.sidemove = angle.y * moved_speed
            end
        end
    end
end

function test_array.on_setup_command(cmd)
    test_array.play_recovery(cmd)
    local local_player = entity.get_local_player()
    local hotkey = hotkey_reference:get()
    local weapon = local_player:get_player_weapon()
    test_array.enabled_run = false
    test_array.enabled_playback = false
    test_array.movement_run = false
    if fast_stop_reference:get() and hotkey then
        test_array.ui_restore[fast_stop_reference] = true
        fast_stop_reference:set(false)
    end

    if location_playback ~= nil then
        test_array.enabled_playback = true
        if location_playback.type == "movement" then
            test_array.cmd_location_playback_movement(cmd, local_player, weapon)
        end
    elseif location_selected ~= nil and hotkey and location_selected.is_in_fov and location_selected.is_position_correct then
        local speed = vector(math.abs(local_player["m_vecVelocity[0]"]), math.abs(local_player["m_vecVelocity[1]"]), math.abs(local_player["m_vecVelocity[2]"])):length()
        local pin_pulled = weapon["m_bPinPulled"]

        if location_selected.duckamount == 1 or location_set_closest.has_only_duck then
            cmd.in_duck = 1
        end

        local is_grenade = location_selected.weapons[1].type == "grenade"
        local is_in_attack = bit.band(cmd.buttons, 1) == 1 or bit.band(cmd.buttons, 2048) == 2048
        if (location_selected.type == "movement" and speed < 2 and (not is_grenade or is_in_attack)) or (location_selected.type == "grenade" and pin_pulled and speed < 2) and location_selected.duckamount == local_player["m_flDuckAmount"] then
            location_playback = location_selected
            test_array.playback_state = nil
            test_array.playback_weapon = weapon
            test_array.playback_begin = cmd.command_number


            if location_playback.type == "grenade" then
                test_array.cmd_location_playback_grenade(cmd, local_player, weapon)
            elseif location_playback.type == "movement" then
                test_array.movement_run = true
            end
            --test_array.cmd_location_playback(cmd, local_player, weapon)
        elseif not pin_pulled and (bit.band(cmd.buttons, 1) == 1 or bit.band(cmd.buttons, 2048) == 2048) then
            if location_selected.throw_strength == 1 then
                cmd.in_attack = 1
                cmd.in_attack2 = 0
            elseif location_selected.throw_strength == 0.5 then
                cmd.in_attack = 1
                cmd.in_attack2 = 1
            elseif location_selected.throw_strength == 0 then
                cmd.in_attack = 0
                cmd.in_attack2 = 1
            end
        end
    elseif location_set_closest ~= nil and hotkey then
        test_array.enabled_run = true
    end
end

function test_array.update_basic_ui()
    local enabled = enabled_reference:get()

    hotkey_reference:set_visible(enabled)
    aimbot_auto_dt_reference:set_visible(enabled)
    types_reference:set_visible(enabled)
    color_reference:set_visible(enabled)
    aimbot_reference:set_visible(enabled)
    behind_walls_reference:set_visible(enabled)
    sources_list_ui.title:set_visible(enabled)

    update_sources_ui()

    local aimbot = enabled and aimbot_reference:get()
    aimbot_fov_reference:set_visible(enabled and aimbot ~= 0)
    aimbot_speed_reference:set_visible(enabled and aimbot == 'Legit')
end

enabled_reference:set_callback(test_array.update_basic_ui)
aimbot_reference:set_callback(test_array.update_basic_ui)
test_array.update_basic_ui()
function test_array.on_console_input(text)
    if text == "helper" or text:match("^helper .*$") then
        if not sources_list_ui.title:get() then
            return
        end

        local log_help = false
        if text:match("^helper map_pattern%s*") then
            if common.get_map_data()['shortname'] ~= nil then
                print("Raw map name: ", common.get_map_data()['shortname'])
                print("Resolved map name: ", test_array.get_mapname())
                print("Map pattern: ", test_array.get_map_pattern())
            else
                client.error_log("You need to be in-game to use this command")
            end
        elseif text == "helper" or text:match("^helper %s*$") or text:match("^helper help%s*$") or text:match("^helper %?%s*$") then
            print("Helper console command system")
            log_help = true
        elseif text:match("^helper source stats%s*") then
            if type(source_selected) == "table" then
                local all_locations = source_selected:get_all_locations()
                local maps = {}
                for map, map_spots in pairs(all_locations) do
                    table.insert(maps, map)
                end
                table.sort(maps)

                local rows = {}
                local headings = {"MAP", "Smoke", "Flash", "Molotov", "HE Grenade", "Movement", "Location", "Area", " TOTAL "}
                local total_row = {"TOTAL", 0, 0, 0, 0, 0, 0, 0, 0}

                for i=1, #maps do
                    local row = {maps[i], 0, 0, 0, 0, 0, 0, 0, 0}
                    local map_locations = all_locations[maps[i]]
                    for i=1, #map_locations do
                        local location = map_locations[i]
                        local index = 7

                        if location.type == "grenade" then
                            for i=1, #location.weapons do
                                local weapon = location.weapons[i]
                                if weapon.console_name == "weapon_smokegrenade" then
                                    index = 2
                                elseif weapon.console_name == "weapon_flashbang" then
                                    index = 3
                                elseif weapon.console_name == "weapon_molotov" then
                                    index = 4
                                elseif weapon.console_name == "weapon_hegrenade" then
                                    index = 5
                                end
                            end
                        elseif location.type == "movement" then
                            index = 6
                        elseif location.type == "location" then
                            index = 7
                        elseif location.type == "area" then
                            index = 8
                        end

                        row[index] = row[index] + 1
                        total_row[index] = total_row[index] + 1
                        row[9] = row[9] + 1
                        total_row[9] = total_row[9] + 1
                    end

                    table.insert(rows, row)
                end

                table.insert(rows, {})
                table.insert(rows, total_row)

                -- remove empty columns
                for i=#total_row, 2, -1 do
                    if total_row[i] == 0 then
                        table.remove(headings, i)
                        for j=1, #rows do
                            table.remove(rows[j], i)
                        end
                    end
                end

                local tbl_result = table_gen(rows, headings, {style="Unicode"})
                -- print("Locations loaded:")
                -- for s in tbl_result:gmatch("[^\r\n]+") do
                --     client_color_log(210, 210, 210, s)
                -- end

                print_raw("Statistics for ", source_selected.name, source_selected.description ~= nil and string.format(" - %s", source_selected.description) or "", ": \n", tbl_result, "\n")
            else
                client.error_log("No source selected")
            end
        elseif text:match("^helper source export_repo%s*") then
            if type(source_selected) == "table" then
                if source_selected.type == "local" then
                    client.error_log("Not yet implemented")
                else
                    client.error_log("You can only export a local source")
                end
            else
                client.error_log("No source selected")
            end
        elseif text:match("^helper source%s*$") then
            if type(source_selected) == "table" then
                print("Selected source: ", source_selected.name, " (", source_selected.type, ")")
                print("Description: ", tostring(source_selected.description))
                print("Last updated: ", source_selected.update_timestamp and string.format("%s (unix ts: %s)", test_array.format_unix_timestamp(source_selected.update_timestamp, false, false, 1), source_selected.update_timestamp) or "Not set")
            else
                client.error_log("No source selected")
            end
        else
            client.error_log("Unknown helper command: " .. text:gsub("^helper ", ""))
            log_help = true
        end

        if log_help then
            local commands = {
                {"help", "Displays this help info"},
                {"map_pattern", "Displays map pattern debug info"},
                {"source", "Displays information about the current source"},
                {"source stats", "Displays statistics for the currently selected source"},
                {"source export_repo", "Exports a local source into a repository file structure"}
            }

            local text = "\tKnown commands:"
            for i=1, #commands do
                local command, help = unpack(commands[i])
                text = text .. string.format("\n\thelper %s - %s", command, help)
            end

            print(text)
        end

        return true
    end
end

events.console_input:set(test_array.on_console_input)
events.level_init:set(function()
    source_selected = nil

    source_editing = false
    edit_location_selected = nil

    test_array.table_clear(source_editing_modified)
    test_array.table_clear(source_editing_has_changed)

    update_sources_ui()
    test_array.flush_active_locations()
end)

events.switch_team:set(function(e)
    source_selected = nil

    source_editing = false
    edit_location_selected = nil

    test_array.table_clear(source_editing_modified)
    test_array.table_clear(source_editing_has_changed)

    update_sources_ui()
    test_array.flush_active_locations()
end)

events.round_end:set(function(e)
    location_playback = nil
end)

events.shutdown:set(function()
    for i=1, #db.sources do
        if db.sources[i].cleanup ~= nil then
            db.sources[i]:cleanup()
        end
    end
    test_array.restore_disabled()
    benchmark:start("db_write")
    database.write("helper_db", db)
    benchmark:finish("db_write")
end)

events.render:set(test_array.on_paint)
events.createmove:set(test_array.on_setup_command)
events.createmove:set(test_array.on_run_command)
