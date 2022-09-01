---@diagnostic disable: lowercase-global, unbalanced-assignments, deprecated, need-check-nil
ffi.cdef([[
    bool CreateDirectoryA(const char*, void*);
]])
ffi.C.CreateDirectoryA("nix/storm/", nil)
ffi.C.CreateDirectoryA("nix/storm/fonts/", nil)
ffi.C.CreateDirectoryA("nix/storm/flags/", nil)
local shell = ffi.load("Shell32")
local urlmon = ffi.load("UrlMon")
local wininet = ffi.load("WinInet")
local user32 = ffi.load("User32")
local kernel32 = ffi.load("Kernel32")
log = function(...)
    for i = 1, select("#", ...) do
        local v = select(i, ...)
        if type(v) == "table" then
            print(table.serialize(v))
        else print(tostring(v)) end
    end
end
printf = function(s, ...) print(s:format(...)) end
ffi.cdef([[
    typedef unsigned long DWORD;
    void* __stdcall ShellExecuteA(void*, const char*, const char*, const char*, const char*, int);
    DWORD __stdcall URLDownloadToFileA(void* LPUNKNOWN, const char* LPCSTR, const char* LPCSTR2, int a, int LPBINDSTATUSCALLBACK);        
    bool DeleteUrlCacheEntryA(const char* lpszUrlName);
    struct c_color { unsigned char clr[4]; };
    struct vec3{ float x; float y; float z; };
    typedef struct{ float x; float y; float z; } Vector_t;
    typedef struct{ float x; float y; } Vector2_t;
    typedef const char* LPCSTR;
    typedef unsigned short WORD;
    typedef unsigned long long int uint64_t;
    typedef unsigned char uint8_t;
    typedef unsigned short MDLHandle_t;
    typedef unsigned long ULONG_PTR;
    typedef ULONG_PTR SIZE_T;
    void* GetForegroundWindow();
    void* GetModuleHandleA(const char*);
    bool SetFileAttributesA(const char*, DWORD);  
    uintptr_t GetProcAddress(void*, const char*);
    typedef struct { long x; long y; } POINT;
    typedef struct {
        DWORD dwLowDateTime;
        DWORD dwHighDateTime;
    } FILETIME;
    typedef struct {
        DWORD    dwFileAttributes;
        FILETIME ftCreationTime;
        FILETIME ftLastAccessTime;
        FILETIME ftLastWriteTime;
        DWORD    nFileSizeHigh;
        DWORD    nFileSizeLow;
    } WIN32_FILE_ATTRIBUTE_DATA;
    bool GetFileAttributesExA(
        const char* lpFileName,
        int fInfoLevelId,
        void* lpFileInformation
    );
    typedef struct {
        char pad[8];
	    float m_start;
	    float m_end;
        float m_state;
    } m_flposeparameter_t;
    struct SteamAPIContext {
        void* Client;
        void* User;
        void* Friends;
        void* Utils;
    };
    struct tesla_info_t { 
        Vector_t m_pos; 
        Vector_t m_ang;
        int m_entindex;
        const char *m_spritename;
        float m_flbeamwidth;
        int m_nbeams;
        Vector_t m_color;
        float m_fltimevis;
        float m_flradius;
    };
    typedef struct {
        void*   BaseAddress;
        void*   AllocationBase;
        DWORD   AllocationProtect;
        WORD    PartitionId;
        SIZE_T  RegionSize;
        DWORD   State;
        DWORD   Protect;
        DWORD   Type;
    } MEMORY_BASIC_INFORMATION;
    typedef struct {
        union {
            DWORD dwOemId;
            struct {
                WORD wProcessorArchitecture;
                WORD wReserved;
            } DUMMYSTRUCTNAME;
        } DUMMYUNIONNAME;
        DWORD       dwPageSize;
        void*       lpMinimumApplicationAddress;
        void*       lpMaximumApplicationAddress;
        ULONG_PTR   dwActiveProcessorMask;
        DWORD       dwNumberOfProcessors;
        DWORD       dwProcessorType;
        DWORD       dwAllocationGranularity;
        WORD        wProcessorLevel;
        WORD        wProcessorRevision;
    } SYSTEM_INFO;
    void GetSystemInfo(SYSTEM_INFO*);
    void* GetCurrentProcess();
    int VirtualProtect(void*, DWORD, DWORD, DWORD*);
    size_t VirtualQueryEx(void*, const void*, MEMORY_BASIC_INFORMATION*, size_t);
    typedef struct {
    	Vector_t m_vecPosAnim;
    	Vector_t m_vecPosAnimLast;
    	Vector_t m_vecPosPlant;
    	Vector_t m_vecPlantVel;
    	float m_flLockAmount;
    	float m_flLastPlantTime;
    } procedural_foot_t;
    typedef struct{
    	bool		m_bInitialized;
    	int			m_nIndex;
    	const char* m_szName;
    } AnimstatePose_t;
    typedef struct{
        char pad0[0x78];
        float m_flEyeYaw;
        float m_flPitch;
        float m_flGoalFeetYaw;
        float m_flCurrentFeetYaw;
        float m_flCurrentTorsoYaw;
        float m_flUnknownVelocityLean;
        float m_flLeanAmount;
        char pad2[4];
        float m_flFeetCycle;
        float m_flFeetYawRate;
        char pad3[4];
        float m_fDuckAmount;
        float m_fLandingDuckAdditive;
        char pad4[4];
        Vector_t m_vOrigin;
        Vector_t m_vLastOrigin;
        Vector2_t m_vVelocity;
        char pad5[4];
        float m_flUnknownFloat1;
        char pad6[8];
        float m_flUnknownFloat2;
        float m_flUnknownFloat3;
        float m_flUnknown;
        float m_flSpeed2D;
        float m_flUpVelocity;
        float m_flSpeedNormalized;
        float m_flFeetSpeedForwardsOrSideWays;
        float m_flFeetSpeedUnknownForwardOrSideways;
        float m_flTimeSinceStartedMoving;
        float m_flTimeSinceStoppedMoving;
        bool m_bOnGround;
        bool m_bInHitGroundAnimation;
        float m_flJumpToFall;
        float m_flDurationInAir;
        float m_flLeftGroundHeight;
        float m_flLandAnimMultiplier;
        float m_flWalkToRunTransition;
        bool m_bLandedOnGroundThisFrame;
        bool m_bLeftTheGroundThisFrame;
        float m_flInAirSmoothValue;
        bool m_bOnLadder;
        float m_flLadderWeight;
        float m_flLadderSpeed;
        bool m_bWalkToRunTransitionState;
        bool m_bDefuseStarted;
        bool m_bPlantAnimStarted;
        bool m_bTwitchAnimStarted;
        bool m_bAdjustStarted;
        char m_ActivityModifiers[20];
        float m_flNextTwitchTime;
        float m_flTimeOfLastKnownInjury;
        float m_flLastVelocityTestTime;
        Vector_t m_vecVelocityLast;
        Vector_t m_vecTargetAcceleration;
        Vector_t m_vecAcceleration;
        float m_flAccelerationWeight;
        float m_flAimMatrixTransition;
        float m_flAimMatrixTransitionDelay;
        bool m_bFlashed;
        float m_flStrafeChangeWeight;
        float m_flStrafeChangeTargetWeight;
        float m_flStrafeChangeCycle;
        int	m_nStrafeSequence;
        bool m_bStrafeChanging;
        float m_flDurationStrafing;
        float m_flFootLerp;
        bool m_bFeetCrossed;
        bool m_bPlayerIsAccelerating;
        AnimstatePose_t	m_tPoseParamMappings[20];
        float m_flDurationMoveWeightIsTooHigh;
        float m_flStaticApproachSpeed;
        int m_nPreviousMoveState;
        float m_flStutterStep;
        float m_flActionWeightBiasRemainder;
        procedural_foot_t m_footLeft;
        procedural_foot_t m_footRight;
        float m_flCameraSmoothHeight;
        bool m_bSmoothHeightValid;
        float m_flLastTimeVelocityOverTen;
        float m_flAimYawMin;
        float m_flAimYawMax;
        float m_flAimPitchMin;
        float m_flAimPitchMax;
        int	 m_nAnimstateModelVersion;
    } c_animstate_t;
    struct WeaponInfo_t
    {
        char pad1[6];
        uint8_t class;
        char pad2[13];
        int max_clip;	
        char pad3[12];
        int max_ammo;
        char pad4[96];
        char* hud_name;			
        char* name;		
        char pad5[56];
        int type;
    };
    typedef struct {
        DWORD cbSize;
        DWORD flags;
        void* hCursor;
        POINT ptScreenPos;
    } CURSORINFO;
    bool GetCursorInfo(CURSORINFO*);
    typedef struct {
        DWORD    dwFileAttributes;
        FILETIME ftCreationTime;
        FILETIME ftLastAccessTime;
        FILETIME ftLastWriteTime;
        DWORD    nFileSizeHigh;
        DWORD    nFileSizeLow;
        DWORD    dwReserved0;
        DWORD    dwReserved1;
        wchar_t  cFileName[260];
        wchar_t  cAlternateFileName[14];
        DWORD    dwFileType;
        DWORD    dwCreatorType;
        WORD     wFinderFlags;
    } WIN32_FIND_DATA;
    void* FindFirstFileA(const char*, WIN32_FIND_DATA*);
    bool FindNextFileA(void* hFindFile, WIN32_FIND_DATA*);
    bool FindClose(void* hFindFile);
]])
local ffi_interface = function(module, name)
    local ptr = se.create_interface(module .. ".dll", name) or error("failed to get " .. name .. " interface")
    return ffi.cast("void***", ptr)
end
ffi_vmfunc = function(p, t, i)
    local fn = ffi.cast(t, p[0][i])
    return fn and function(...) return fn(p, ...) end or false
end
ffi_vmthunk = function(ct, i)
    local t = ffi.typeof(ct)
    return function(instance, ...)
        return ffi.cast(t, ffi.cast("void***", instance)[0][i])(instance, ...)
    end
end
local ffi_ptr = function(p) return ffi.cast("void*", p) end
local ffi_to_int = function(p) return tonumber(ffi.cast("uintptr_t", p)) end
ffp = {
    gamerules = ffi.cast("uintptr_t**", (client.find_pattern("client.dll", "8B EC 8B 0D ? ? ? ? 85 C9 74 07") or error("wrong gamerule sig")) + 4),
    weapon_data = ffi.cast("int*(__thiscall*)(void*)",
        client.find_pattern("client.dll", "55 8B EC 81 EC ? ? ? ? 53 8B D9 56 57 8D 8B ? ? ? ? 85 C9 75 04") or error("wrong weapon_data sig")),
    ent_list = ffi_interface("client", "VClientEntityList003"),
    engine_cvar = ffi_interface("vstdlib", "VEngineCvar007"),
    engine = ffi_interface("engine", "VEngineClient014"),
    player = ffi.cast("int*", (client.find_pattern("client.dll", "55 8B EC 83 E4 F8 83 EC 18 56 57 8B F9 89 7C 24 0C") or error("wrong player sig")) + 0x47),
    debug_overlay = ffi_interface("engine", "VDebugOverlay004"),
    models = {
        info = ffi_interface('engine', 'VModelInfoClient004'),
        netstrtable = ffi_interface('engine', 'VEngineClientStringTable001'),
    },
    material = {
        this = ffi_interface('materialsystem', 'VMaterialSystem080'),
    },
    client = ffi.C.GetModuleHandleA("client.dll"),
    SteamAPI = ffi.C.GetModuleHandleA("steam_api.dll"),
    SteamContext = {},
    Steam = {}
}

ffp.SteamContext = ffi_vmfunc(ffp.engine, "struct const SteamAPIContext*(*)(void*)", 185)()
ffp.Steam.Friends = {
    GetSmallFriendAvatar = "int(*)(void*, uint64_t)",
}
ffp.Steam.Utils = {
    GetImageRGBA = "bool(*)(void*, int, uint8_t*, int)",
}
for i_name, i in pairs(ffp.Steam) do
    for f_name, f_type in pairs(i) do
        i[f_name] = function (...)
            return ffi.cast(f_type, ffi.C.GetProcAddress(ffp.SteamAPI,
                "SteamAPI_ISteam"..i_name.."_"..f_name))(ffp.SteamContext[i_name], ...)
        end
    end
end
ffp.player = ffp.player[0]
ffp.get_abs_origin = ffi.cast("float*(__thiscall*)(int)", ffi.cast("int*", ffp.player + 0x28)[0])
ffp.get_ent_address = ffi_vmfunc(ffp.ent_list, "uintptr_t(__thiscall*)(void*, int)", 3)
ffp.get_ent_address_from_handle = ffi_vmfunc(ffp.ent_list, "void*(__thiscall*)(void*, void*)", 4)
ffp.color_print = ffi.cast("void(__cdecl*)(void*, const struct c_color&, const char*, ...)", ffp.engine_cvar[0][25])
ffp.m_flposeparameter = ffi.cast('m_flposeparameter_t*(__thiscall*)(void*, int)',
    client.find_pattern('client.dll', '55 8B EC 8B 45 08 57 8B F9 8B 4F 04 85 C9 75 15') or error("wrong poseparameter sig"))
ffp.add_box_overlay = ffi_vmfunc(ffp.debug_overlay, "void(__thiscall*)(void*, const Vector_t&, const Vector_t&, const Vector_t&, Vector_t const&, int, int, int, int, float)", 1)
ffp.add_line_overlay = ffi_vmfunc(ffp.debug_overlay, "void(__thiscall*)(void*, const Vector_t&, const Vector_t&, int, int, int, bool, float)", 5)
ffp.create_tesla = ffi.cast("void(__thiscall*)(struct tesla_info_t&)", client.find_pattern("client.dll", "55 8B EC 81 EC ? ? ? ? 56 57 8B F9 8B 47 18"))
ffp.models = {
    info = ffp.models.info,
    netstrtable = ffp.models.netstrtable,
    get_index = ffi.cast('int(__thiscall*)(void*, const char*)', ffp.models.info[0][2]),
    load_model = ffi.cast("void(__thiscall*)(void*, const char*)", ffp.models.info[0][43]),
    add_string = ffi_vmthunk("int*(__thiscall*)(void*, bool, const char*, int, const void*)", 8),
    find_table = ffi_vmthunk('void*(__thiscall*)(void*, const char*)', 3),
    set_index = ffi_vmthunk("void(__thiscall*)(void*,int)", 75),
    precache = function(path)
        if not path or path == "" then return end
        path = string.gsub(path, [[\]], [[/]])
        local precache_t = ffp.models.find_table(ffp.models.netstrtable, "modelprecache")
        if precache_t ~= nil then
            ffp.models.load_model(ffp.models.info, path)
            ffp.models.add_string(precache_t, false, path, -1, nil)
        end
    end,
    change = function(address, model)
        if not address then return end
        local idx = ffp.models.get_index(ffp.models.info, model)
        if idx == -1 and not ffp.models.precache(model) then
            return end
        local ptr = ffi.cast("void*", address)
        ffp.models.set_index(ptr, idx)
    end,
}
ffp.material = {
    this = ffp.material.this,
    first_material = ffi_vmfunc(ffp.material.this, "int(__thiscall*)(void*)", 86),
    next_material = ffi_vmfunc(ffp.material.this, "int(__thiscall*)(void*, int)", 87),
    invalid_material = ffi_vmfunc(ffp.material.this, "int(__thiscall*)(void*)", 88),
    find_material = ffi_vmfunc(ffp.material.this, "void*(__thiscall*)(void*, int)", 89),
    functions = {

    }
}
panorama = {
    engine_ptr = ffi_vmfunc(ffi_interface("panorama", "PanoramaUIEngine001"), "void*(__thiscall*)(void*, void)", 11)()
}
panorama.engine = ffi.cast("void***", panorama.engine_ptr)
panorama = {
    panels = {},
    run_script = ffi_vmfunc(panorama.engine, "int (__thiscall*)(void*, void*, char const*, char const*, int, int, bool, bool)", 113),
    is_valid_panel = ffi_vmfunc(panorama.engine, "bool(__thiscall*)(void*, void*)", 36),
    get_last_panel = ffi_vmfunc(panorama.engine, "void*(__thiscall*)(void*)", 56),
    get_panel_id = function(panel)
        local vtbl = panel[0] or error("panelptr is nil", 2)
        local func = vtbl[9] or error("panelptr_vtbl is nil", 2)
        return ffi.string(ffi.cast("const char*(__thiscall*)(void*, void)", func)(panel))
    end,
    get_parent = function(panel)
        local vtbl = panel[0] or error("panelptr is nil", 2)
        local func = vtbl[25] or error("panelptr_vtbl is nil", 2)
        return ffi.cast("void*(__thiscall*)(void*)", func)(panel)
    end,
    get_panel = function(custom)
        local last = panorama.get_last_panel()
        if last == nil then return end
        local main = nil
        while last ~= nil and panorama.is_valid_panel(last) do
            local panel = ffi.cast('void***', last)
            if custom then
                if panorama.get_panel_id(panel) == custom then
                    main = last break
                end
            else
                if ("CSGOMainMenu:CSGOHud"):find(panorama.get_panel_id(panel)) then
                    main = last
                    break
                end
            end
            last = panorama.get_parent(panel) or false
            if not last then return false end
        end
        return main
    end,
    eval = function(code, custompanel, file)
        local panel = panorama.root
        if custompanel then
            panel = custompanel
        elseif panel == nil then
            local try = 0
            while not panorama.root and try < 100 do
                panorama.root = panorama.get_panel()
                try = try + 1
            end
            panel = panorama.root
            if panel == nil then return end
        end
        return panorama.run_script(panel, ffi.string(code),
            file or "panorama/layout/base_mainmenu.xml", 8, 10, false, false)
    end,
    get_panels = function(s)
        for id, name in pairs({hud = "CSGOHud", menu = "CSGOMainMenu"}) do
            if not s.panels[id] or not pcall(s.eval, "", s.panels[id]) then
                s.panels[id] = s.get_panel(name)
                if s.panels[id] then
                    -- print("[PANORAMA] "..name.." found")
                end
            end
        end
    end,
}
panorama:get_panels()

function hex2rgb(h)
    h, n = h:gsub("#",""), tonumber
    return color_t.new(n("0x"..h:sub(1,2)), n("0x"..h:sub(3,4)), n("0x"..h:sub(5,6)), 255)
end
function col(r,g,b,a) return type(r) == "string" and hex2rgb(r) or color_t.new(r,g,b,a or 255) end
function v(x,y,z) return z and vec3_t.new(x,y,z) or vec2_t.new(x,y or 0) end
function clamp(a, mn, mx) return math.min(mx, math.max(a, mn)) end
function hasbit(val, b) return bit32.band(val, bit32.lshift(1, b)) ~= 0 end
math.round = function(a) return math.floor(a + 0.5) end
math.deg2rad = function(a) return a * math.pi / 180.0 end
math.rad2deg = function(a) return a * 180 / math.pi end
math.normalize_yaw = function(a)
    while a < -180 do a = a + 360 end
    while a > 180 do a = a - 360 end
    return a
end
table.fn_table = function(t, fn)
    local val = {0, 0}
    for k, v in pairs(t) do
        if fn(val[1], v) then
            val = {v, k}
        end
    end
    return val[1], val[2]
end
table.add = function(t, t2)
    for k, v in pairs(t2) do
        t[k] = v end
end
table.add_inc = function(t, t2)
    for k, v in pairs(t2) do
        t[#t+1] = v end
end
color_t.alpha = function(s, a) return col(s.r, s.g, s.b, a) end
color_t.alp = function(s, a) return s:alpha(a * 255) end
color_t.alp_self = function(s, a) return s:alpha((a * s.a / 255) * 255) end
color_t.__tostring = function(s) return "("..s.r..", "..s.g..", "..s.b..", "..s.a..")" end
color_t.__eq = function(s, o) return s.r == o.r and s.g == o.g and s.b == o.b and s.a == o.a end
vec2_t.__add = function(a, b) return v(a.x+b.x, a.y+b.y) end
vec2_t.__sub = function(a, b) return v(a.x-b.x, a.y-b.y) end
vec2_t.__mul = function(a, b)
    return type(b) == "number" and
    v(a.x * b, a.y * b) or
    v(a.x * b.x, a.y * b.y)
end
vec2_t.__div = function(a, b)
    return type(b) == "number" and
    v(a.x / b, a.y / b) or
    v(a.x / b.x, a.y / b.y)
end
vec2_t.__unm = function(a)
    return v(-a.x, -a.y)
end
vec2_t.each = function(s, f) return f(s.x) and f(s.y) end
vec2_t.func = function(s, f) return v(f(s.x), f(s.y)) end
vec2_t.table = function(s) return {s.x, s.y} end
vec2_t.pack = function(a) return v(a[1], a[2]) end
vec2_t.clamp = function(s, m, x) return v(clamp(s.x, m[1], x[1]), clamp(s.y, m[2], x[2])) end
vec2_t.by_i = function(s, i, v)
    if v ~= nil then
        if i == 1 then s.x = v else s.y = v end
        return s end
    if i == 1 then return s.x else return s.y end
end
vec2_t.to3 = function(s, z) return v(s.x, s.y, z or 0) end
vec2_t.__tostring = function(a)
    return "("..a.x..", "..a.y..")" end
vec3_t.__add = function(a, b) return v(a.x+b.x, a.y+b.y, a.z+b.z) end
vec3_t.__sub = function(a, b) return v(a.x-b.x, a.y-b.y, a.z-b.z) end
vec3_t.__mul = function(a, b)
    return type(b) == "number" and
    v(a.x * b, a.y * b, a.z * b) or
    v(a.x * b.x, a.y * b.y, a.z * b.z)
end
vec3_t.__div = function(a, b)
    return type(b) == "number" and
    v(a.x / b, a.y / b, a.z / b) or
    v(a.x / b.x, a.y / b.y, a.z / b.z)
end
vec3_t.angle_to = function(from, to)
    local a = to - from
    return angle_t.new(
        clamp(-math.asin(a.z / (a.x^2 + a.y^2 + a.z^2)^0.5) * 57.29578, -89.0, 89.0),
        math.normalize_yaw(math.atan2(a.y, a.x) * 57.29578),
        0
    )
end
vec3_t.remove_nan = function(s)
    if s.x ~= s.x then s.x = 0 end
    if s.y ~= s.y then s.y = 0 end
    if s.z ~= s.z then s.z = 0 end
    return s
end
vec3_t.func = function(s, f) return v(f(s.x), f(s.y), f(s.z)) end
vec3_t.to_angle = function(s)
    return angle_t.new(
        clamp(math.rad2deg(-math.asin(s.z / (s.x^2 + s.y^2 + s.z^2)^0.5)), -89.0, 89.0),
        math.normalize_yaw(math.rad2deg(math.atan2(s.y, s.x))),
        0
    )
end
vec3_t.table = function(s) return {s.x, s.y, s.z} end
vec3_t.length = function(s)
    return (s.x^2 + s.y^2 + s.z^2)^0.5
end
vec3_t.__tostring = function(a)
    return "("..a.x..", "..a.y..", "..a.z..")" end
dynamic_table = function(content, getter)
    local table = {__content = content, __mt = {}}
    table.__mt.__index = function (t, k)
        if getter(t, k) ~= nil then return getter(t, k) end
        return t.__content[k]
    end
    table.__mt.__newindex = function(t, i, v)
        t.__content[i] = v end
    setmetatable(table, table.__mt)
    return table
end
ss = engine.get_screen_size()
se.w2s = se.world_to_screen
se.hitbox_name = function(i)
    local hitboxes = {
        [0] = "head", "head",
        "pelvis", "body",
        "lower chest", "chest", "upper chest",
        "left leg", "right leg",
        "left leg", "right leg",
        "left foot", "right foot",
        "left arm", "right arm",
        "left arm", "left arm",
        "right arm", "right arm",
        "wtf"
    }
    return hitboxes[i]
end
se.hitgroup_name = function(i)
    local hitgroups = {
        [0] = "generic",
        "head",
        "chest", "stomach",
        "left arm", "right arm",
        "left leg", "right leg",
        "wtf"
    }
    return hitgroups[i]
end
se.hitgroup_to_hitbox = function(i)
    return ({
        [0] = 5, --generic
        0, --head
        6, --chest
        4, --stomach
        16, --left arm
        18, --right arm
        7, --left leg,
        8, --right leg
        3 -- gear (wtf)
    })[i] or 5
end
se.hitbox_to_hitgroup = function(i)
    local hitgroups = {
        [0] = 1,
        2, 3, 2, 2, 2,
        6, 7, 6, 7, 6, 7,
        4, 5, 4, 4, 5, 5
    }
    return hitgroups[i] or 0
end
se.player_hurt_check = function(e)
    local id = entitylist.lp():info().user_id
    local f = function(n) return e:get_int(n, 0) == id end
    if f("userid") then return -1 end
    if f("attacker") then return 1 end
    if f("assister") then return 2 end
    return 0
end
entitylist.by_userid = function(id)
    return entitylist.get_entity_by_index(engine.get_player_for_user_id(id))
end
se.time_to_ticks = function (time)
    return math.round(time / globalvars.get_interval_per_tick())
end

angle_t.to_vec = function (s)
    local pitch, yaw = math.deg2rad(s.pitch), math.deg2rad(s.yaw)
    local pcos = math.cos(pitch)
    return v(pcos * math.cos(yaw), pcos * math.sin(yaw), -math.sin(pitch)):remove_nan()
end

draggable = {
    widths = 0,
    list = {},
}
--#region render
render = {
    text_size = function(text, font)
        font = font or gui.fonts.main
        return renderer.get_text_size(font[1], font[2], text)
    end,
    rect_smoothed = function(f, t, bg, border)
        border = border or bg
        local w, h = t.x - f.x - 1, t.y - f.y - 1
        renderer.rect_filled(f + v(1, 0), t - v(1, h), border)
        renderer.rect_filled(f + v(1, h), t - v(1, 0), border)
        renderer.rect_filled(f + v(0, 1), t - v(w, 1), border)
        renderer.rect_filled(f + v(w, 1), t - v(0, 1), border)
        renderer.rect_filled(f + v(1, 1), t - v(1, 1), bg)
        return {hovered = render.hovered(f, t)}
    end,
    smoothing = function(a) return globalvars.get_absolute_frametime() * (a or 12) end,
    hovered = function(f, t)
        local c = renderer.get_cursor_pos()
        return (c - f):each(function(a) return a>0 end) and (c - t):each(function(a) return a<0 end)
    end,
    lerp = function(a, b, t)
        return a + (b - a) * t
    end,
    easing = function(x) return 1 - ((1 - x) ^ 4) end,
    easing_in = function(x) return x ^ 4 end,
    HSVToRGB = function(c)
        hue, sat, val, a = c[1], c[2], c[3], c[4]
        if sat == 0 then
            return col(val*255, val*255, val*255, a) end
        local i = math.floor(hue * 6);
        local o = hue * 6 - i;
        local p, q, t = val * (1 - sat), val * (1 - sat * o), val * (1 - sat * (1 - o));
        local c = {}
        local l = math.floor(i % 6)
        if l == 0 then c = {val, t, p}
        elseif l == 1 then c = {q, val, p}
        elseif l == 2 then c = {p, val, t}
        elseif l == 3 then c = {p, q, val}
        elseif l == 4 then c = {t, p, val}
        elseif l == 5 then c = {val, p, q} end
        return col(c[1] * 255, c[2] * 255, c[3] * 255, a)
    end,
    RBGtoHSV = function(c)
        r, g, b, a = c.r, c.g, c.b, c.a
        local min = math.min(r, g, b)
        local max = math.max(r, g, b)
        local d = max - min
        local val, hue, sat = max / 255, 0, max ~= 0 and d / max or 0
        if max == min then hue = 0
        elseif max == r then hue = (g - b) + d * (g < b and 6 or 0)
        elseif max == g then hue = (b - r) + d * 2
        else hue = (r - g) + d * 4 end
        if max ~= min then hue = hue / (6 * d) end
        return {hue, sat, val, a}
    end,
    pulsate = function(speed)
        local stage = ((globalvars.get_real_time() % speed) / speed) * 2
        return stage > 1 and 2 - stage or stage
    end,
    polygon_outline = function(pts, color, closed, smoothing)
        if smoothing == nil then smoothing = true end
        if closed or closed == nil then renderer.line(pts[#pts], pts[1], color) end
        for i = 1, #pts do
            if i % 2 == 1 or not smoothing then
                if pts[i-1] and smoothing then renderer.line(pts[i], pts[i-1], color) end
                if pts[i+1] then renderer.line(pts[i], pts[i+1], color) end
            end
        end
    end,
    dot = function(point, color)
        color = color or col(255,0,0)
        renderer.rect_filled(point - v(1, 1), point + v(1, 1), color)
    end,
    convex_hull = function(pts)
        local function isCCW(p, q, r) return ((q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y)) < 0 end
        local num = #pts
        if num < 3 then return end
        local left = 1
        for i = 1, num do if pts[i].x < pts[left].x then left = i end end
        local p = left
    
        local hull = {}
        repeat
            local q = pts[p + 1] and p + 1 or 1
            for i = 1, num, 1 do if isCCW(pts[p], pts[i], pts[q]) then q = i end end
            table.insert(hull, pts[q])
            p = q
        until (p == left)
        return hull
    end,
    rgba_rect = function(pos, data, size, stretch)
        stretch = stretch or v(1, 1)
        for i = 0, ffi.sizeof(data) - 1, 4 do
            local color = col(data[i], data[i+1], data[i+2], data[i+3])
            local from = v(((i / 4) % size.x) * stretch.x, math.floor((i / 4) / size.y) * stretch.y) + pos
            local to = from + stretch
            renderer.rect_filled(from, to, color)
        end
    end,
    add_box_overlay = function(pos, c, time)
        local p = ffi.new("Vector_t")
        p.x, p.y, p.z = pos.x, pos.y, pos.z
        local n = ffi.new("Vector_t")
        n.x, n.y, n.z = -2, -2, -2
        local x = ffi.new("Vector_t")
        x.x, x.y, x.z = 2, 2, 2
        local a = ffi.new("Vector_t")
        a.x, a.y, a.z = 0, 0, 0
        ffp.add_box_overlay(p, n, x, a, c.r, c.g, c.b, c.a, time)
    end,
    add_line_overlay = function(pos, dest, c, time)
        local p = ffi.new("Vector_t")
        p.x, p.y, p.z = pos.x, pos.y, pos.z
        local d = ffi.new("Vector_t")
        d.x, d.y, d.z = dest.x, dest.y, dest.z
        ffp.add_line_overlay(p, d, c.r, c.g, c.b, true, time)
    end,
    texture = function(id, from, to, color)
        if not id or id < 1 then return end
        renderer.texture(id, from, to, color)
    end,
    flags = {
        NoHinting = 1,
        NoAutoHint = 2,
        ForceAutoHint = 4,
        LightHinting = 8,
        MonoHinting = 16,
        Bold = 32,
        Oblique = 64,
        Monochrome = 128
    }
}
render.fonts = {}
render.font = function(path, size, flags)
    if render.fonts[path] and render.fonts[path][size] and render.fonts[path][size][flags] then
        return render.fonts[path][size][flags]
    end
    local font = {renderer.setup_font(path, size, flags), size}
    if not render.fonts[path] then render.fonts[path] = {} end
    if not render.fonts[path][size] then render.fonts[path][size] = {} end
    render.fonts[path][size][flags] = font
    return font
end
render.rounded_rect = function(from, to, r, n, color, outline)
    if color.a == 0 then return end
    local x, y = from.x, from.y
    local w, h = to.x - from.x, to.y - from.y
    n = n or 20
    if n % 4 > 0 then n = n + 4 - (n % 4) end
    local pts, c, d, i = {}, {x + w / 2, y + h / 2}, {w / 2 - r, r - h / 2}, 0
    local cos, sin, pi, ins = math.cos, math.sin, math.pi, table.insert
    local ii = 0
    while i < n do
        local cur = v(0,0)
        local a = i * 2 * pi / n
        local p = {r * cos(a), r * sin(a)}
        for j = 1, 2 do
            cur:by_i(j, c[j] + d[j] + p[j])
            if j == 2 then
                ins(pts, cur) end
            if p[j] * d[j] <= 0 and (p[1] * d[2] < p[2] * d[1]) then
                d[j] = d[j] * -1
                i = i - 1
            end
        end
        i = i + 1
        ii = ii + 1
    end
    if outline then
        return render.polygon_outline(pts, color, true) end
    renderer.filled_polygon(pts, color)
end
render.rounded_shadow = function(from, to, r, color, size)
    local round = render.rounded_rect
    if color.a ~= 0 then
        for i = 1, size do
            round(from - v(i*2, i*2 - 1), to + v(i*2, i*2), r + i*2, 40, color:alp_self((size - i) / size))
        end
    end
end
render.arc = function(pos, radius, rot, deg, filled, points, color, smooth)
    local pts = {}
    local a = math.rad(rot)
    local cos, sin, ins = math.cos, math.sin, table.insert
    local step = math.rad(deg) / (points - 1)
    for i = 0, points - 1 do
        local x = radius * cos(a)
        local y = radius * sin(a)
        ins(pts, v(x, y) + pos)
        a = a + step
    end
    if filled then
        renderer.filled_polygon(pts, color)
    else
        render.polygon_outline(pts, color, false, smooth)
    end
end
render.arc_width = function(pos, radius, rot, deg, width, color, smoothness, shadow, smooth)
    smooth = smooth == nil and true or false
    local arc = render.arc
    if shadow then
        arc(pos, radius + width / 2, rot, deg, false, radius + width + (width - 1 * (smoothness or 5)), shadow:alp_self(color.a / 255), smooth)
    end
    for i = 0, width - 1 do
        arc(pos, radius + i / 2, rot, deg, false, radius + width + (i * (smoothness or 5)), color, smooth) end
end
render.anim = function(s, state, a) return clamp(s + render.smoothing(a) * (state and 1 or -1), 0, 1) end
render.outline_alpha = function(a)
    return ((a*15)^2)/1.5
end
render.outline = function(t, p, f, c)
    c = type(c) == "boolean" and col(0,0,0,127) or (type(c) == "number" and col(0,0,0,render.outline_alpha(c)) or c)
    local text = renderer.text
    text(t, f[1], p - v( 1, 0), f[2], c) --left
    text(t, f[1], p - v( 0, 1), f[2], c) --top
    text(t, f[1], p + v( 1, 0), f[2], c) --right
    text(t, f[1], p + v( 0, 1), f[2], c) --bottom
    text(t, f[1], p - v( 1, 1), f[2], c) --left top
    text(t, f[1], p + v( 1, 1), f[2], c) --right bottom
    text(t, f[1], p + v(-1, 1), f[2], c) --left bottom
    text(t, f[1], p - v(-1, 1), f[2], c) --right top
end
render.text = function(text, pos, font, c, shadow, hovered_pos, outline, align)
    font = font or gui.fonts.main
    c = c or gui.colors.text:alp(gui.anim.main)
    hovered_pos = hovered_pos or {0, 0}
    if align == true then
        pos = pos - v(render.text_size(text, font).x / 2, 0) end
    if align == -1 then
        pos = pos - v(render.text_size(text, font).x, 0)
    end
    if shadow then
        local bool = type(shadow) == "boolean"
        renderer.text(text, font[1], pos + v(1, bool and 1 or 0), font[2], (bool and col(15,15,15,150*(c.a/255))) or shadow) end
    if outline then
        render.outline(text, pos, font, outline) end
    renderer.text(text, font[1], pos, font[2], c)

    local size = render.text_size(text, font)
    return {
        hovered = render.hovered(pos - v(1, -4 + hovered_pos[1]), pos + size + v(1, hovered_pos[2])),
        pos = pos,
        size = size
    }
end
render.text_shadow = function(text, pos, font, c, offset, shadow_c, center)
    local size = render.text_size(text, font).x
    if center then
        pos = pos - v(size / 2, 0) end
    renderer.text(text, font[1], pos + offset, font[2], shadow_c:alp_self(c.a / 255))
    renderer.text(text, font[1], pos, font[2], c)
    return {size = v(size, 0)}
end
render.contrast_color = function(c)
    return render.RBGtoHSV(c)[2] > 0.5 and col(255, 255, 255, c.a) or col(0, 0, 0, c.a)
end
render.smart_outline = function(text, pos, font, c)
    local x = 0
    for i = 1, #text do
        local char = text:sub(i, i)
        x = x + render.text_size(char, font).x + 0.5
        renderer.text(char, font[1], pos + v(x - 1, - 2), font[2] + 4, col(0,0,0))
        renderer.text(char, font[1], pos + v(x + 1, 1), font[2] - 2, col(0,0,0))
        renderer.text(char, font[1], pos + v(x + 1, 2), font[2] - 4, col(0,0,0))
        renderer.text(char, font[1], pos + v(x, 0), font[2], c)
    end
    return {size = v(x, 0)}
end
render.multi_color_text = function(text, font, pos, shadow, center, outline)
    if outline == nil then outline = false end
    if center then
        local str = ""
        for _, t in pairs(text) do
            str = str..t[1] end
        pos = pos - v(render.text_size(str, font).x / 2, 0)
    end
    local x = 0
    for i, t in pairs(text) do
        local result
        if shadow then
            result = render.text_shadow(t[1], pos + v(x, 0), font, t[2], v(1, 1), type(shadow) == "boolean" and col(0,0,0,200) or shadow)
        else
            result = render.text(t[1], pos + v(x, 0), font, t[2], shadow, nil, t[3] or outline)
        end
        x = x + result.size.x
    end
    return {size = v(x, 0)}
end
render.circle_3d = function(pos, points, radius, in_col, out_col)
    local step = math.pi * 2 / points
    local pts = {}
    local cos, sin, ins, w2s = math.cos, math.sin, table.insert, se.w2s
    for i = 0.0, math.pi * 2.0, step do
        local pos = w2s((v(cos(i), sin(i)) * radius + pos):to3(pos.z))
        if pos then ins(pts, pos) end
    end
    if in_col then renderer.filled_polygon(pts, in_col) end
    if out_col then render.polygon_outline(pts, out_col, true) end
end
render.fade_color = function(f, s, a)
    return col(render.lerp(f.r, s.r, a), render.lerp(f.g, s.g, a), render.lerp(f.b, s.b, a))
end
local render_skel_mesh = {{0, 1},{1, 6},{6, 5},{5, 4},{4, 3},{3, 2},{2, 7},{2, 8},{8, 10},
                    {10, 12},{7, 9},{9, 11},{6, 15},{15, 16},{16, 13},{6, 17},{17, 18},{18, 14}}
render.skeleton = function(skel, c)
    for i = 1, #render_skel_mesh do
        renderer.line(
            se.w2s(skel[render_skel_mesh[i][1] + 1]),
            se.w2s(skel[render_skel_mesh[i][2] + 1]), c)
    end
end
anim = {
    list = {},
    lerp = function(id, val, time)
        if type(anim.list[id]) ~= "number" then
            anim.list[id] = val end
        if type(val) == "number" then
            anim.list[id] = render.lerp(anim.list[id], val, render.smoothing(time)) end
        return math.ceil(anim.list[id])
    end
}
--#region game api extension
m_ = {
    vecOrigin = "BaseEntity",
    iTeamNum = "BaseEntity",
    flPoseParameter = "BaseAnimating",
    flDuckAmount = "BasePlayer",
    fFlags = "BasePlayer",
    hActiveWeapon = "BaseCombatCharacter",
    hMyWeapons = "BaseCombatCharacter",
    hCarriedHostage = "CSPlayer",
    fThrowTime = "BaseCSGrenade",
    flFallVelocity = "BasePlayer",
    nTickBase = "BasePlayer",
    iHealth = "BasePlayer",
    hWeaponWorldModel = "BaseCombatWeapon",
    bSilencerOn = "WeaponCSBase",
    bIsScoped = "CSPlayer",
    flDoneSwitchingSilencer = "WeaponCSBase",
    bDidSmokeEffect = "SmokeGrenadeProjectile",
    nSmokeEffectTickBegin = "SmokeGrenadeProjectile",
    flVelocityModifier = "CSPlayer",
    bFireIsBurning = "Inferno",
    fireCount = "Inferno",
    fireXDelta = "Inferno",
    fireYDelta = "Inferno",
    fireZDelta = "Inferno",
    iObserverMode = "BasePlayer",
    hObserverTarget = "BasePlayer",
    nFireEffectTickBegin = "Inferno",
    flC4Blow = "PlantedC4",
    hBombDefuser = "PlantedC4",
    bBombDefused = "PlantedC4",
    flTimerLength = "PlantedC4",
    flDefuseLength = "PlantedC4",
    flDefuseCountDown = "PlantedC4",
    flHealthShotBoostExpirationTime = "CSPlayer",
    angEyeAngles = "CSPlayer",
    iAddonBits = "CSPlayer",
    bIsDefusing = "CSPlayer",
    bIsGrabbingHostage = "CSPlayer",
    iPlayerState = "CSPlayer",
    bCanMoveDuringFreezePeriod = "CSPlayer",
    bFreezePeriod = "CSGameRulesProxy",
}
for k, v in pairs(m_) do
    m_[k] = se.get_netvar("DT_"..v, "m_"..k) end
m_.netMoveType = se.get_netvar("DT_BaseEntity", "m_nRenderMode") + 1
m_.hViewModel = se.get_netvar("DT_BasePlayer", "m_hLastWeapon") + 4
m_.vecVelocity = se.get_netvar("DT_BasePlayer", "m_vecVelocity[0]")
m_.flMaxSpeed = m_.fFlags + 4
m_.vecViewOffset = 264
entity_t.address = function(s)
    local address = ffp.get_ent_address(s:get_index()) or error("failed to get entity address")
    return address
end
entity_t.origin = function(s)
    return s:get_prop_vector(m_.vecOrigin)
end
entity_t.velocity = function(s, vec)
    local vel = s:get_prop_vector(m_.vecVelocity)
    if vec then return vel end
    return (vel.x ^ 2 + vel.y ^ 2) ^ 0.5
end
entity_t.flags = function(s, flag)
    local flags = s:get_prop_int(m_.fFlags)
    if not flag then return flags end
    return bit32.band(flags, flag) == flag
end
entity_t.abs_origin = function(s)
    if not s or not s:address() then return s:origin() end
    local origin = ffp.get_abs_origin(s:address())
    origin = v(origin[0], origin[1], origin[2])
    return origin and origin or s:origin()
end
entity_t.info = function(s) return engine.get_player_info(s:get_index()) end
entity_t.name = function(s) return s:info().name end
entity_t.user_id = function(s) return s:info().user_id end
entity_t.team = function (s) return s:get_prop_int(m_.iTeamNum) end
entity_t.in_air = function(s)
    return not s:flags(1)
end
entity_t.get_health = function(s) return s:get_prop_int(m_.iHealth) end
--https://www.unknowncheats.me/forum/2872552-post1.html
entity_t.weapon = function(s, i)
    local weapon
    if i then
        weapon = s:get_prop_int(m_.hMyWeapons + i * 4)
    else
        weapon = s:get_prop_int(m_.hActiveWeapon)
    end
    weapon = entitylist.get_entity_from_handle(weapon)
    if not weapon then return end
    local weapon_address = ffi.cast("void*", weapon:get_address() or error("failed to get weapon address"))
    local raw_data = ffp.weapon_data(weapon_address)
    local data = ffi.cast("struct WeaponInfo_t*", raw_data) or error("failed to get weapon data")
    local name = ffi.string(data.name):gsub("weapon_", "")
    local group = ({
        [0] = "knife",
        "pistols",
        "smg",
        "rifle",
        "shotguns",
        "sniper",
        "rifle",
        "c4",
        "placeholder",
        "grenade",
        "unknown"
    })[data.type]
    local group_by_name = {
        awp = "awp",
        ssg08 = "scout",
        g3sg1 = "auto",
        scar20 = "auto",
        deagle = "deagle",
        taser = "taser",
        c4 = "c4"
    }
    if group_by_name[name] then
        group = group_by_name[name] end
    if ffi.string(data.hud_name):find("REVOLVER") then
        group = "revolver" end
    return {
        entity = weapon,
        class = data.class,
        name = name,
        type = data.type,
        group = group,
    }
end
entity_t.is_throwing = function(s)
    return s:weapon().entity:get_prop_float(m_.fThrowTime) > 0.0
end
entity_t.studio_hdr = function(s)
    if not s then return end
    local addr = s:address()
    if not addr then return end
    local ptr = addr + 0x2950
    local studio_hdr = ffi.cast('void**', ptr) or error("failed to get studio_hdr")
    studio_hdr = studio_hdr[0] or error("failed to get studio_hdr")
    return studio_hdr
end
entity_t.get_poseparam = function(s, index)
    if not s or not s:address() then return end
    local studio_hdr = s:studio_hdr()
    if not studio_hdr then return end
    local param = ffp.m_flposeparameter(studio_hdr, index) or error("failed to get poseparam")
    return param
end
entity_t.set_poseparam = function(s, i, v)
    if not s then return end
    local t = s:get_poseparam(i)
    if not t then return end
    if t.m_start ~= v[1] then t.m_start = v[1] end
    if t.m_end ~= v[2] then t.m_end = v[2] end
    local state = v[3] or ((t.m_start + t.m_end) / 2)
    if t.m_state ~= state then t.m_state = state end
end
entity_t.restore_poseparam = function(s)
    s:set_poseparam(0, {-180, 180})
    s:set_poseparam(12, {-90, 90})
    s:set_poseparam(6, {0, 1, 0})
end
entity_t.skeleton = function(s)
    local skel = {}
    for i = 0, 18 do skel[#skel+1] = s:get_player_hitbox_pos(i) end
    return skel
end
entity_t.get_eye_pos = function(s)
    return s:abs_origin() + s:get_prop_vector(m_.vecViewOffset)
end
entity_t.get_animstate = function(s)
    if not s then return end
    local ptr = s:address()
    if not ptr then return end
    return ffi.cast("c_animstate_t**", ptr + 0x9960)[0] or error("failed to get animstate")
end
entity_t.get_eye_angles = function(s)
    return s:get_prop_angle(m_.angEyeAngles)
end
entity_t.get_direction = function(s, short)
    local vel = s:velocity(true)
    local animstate = s:get_animstate()
    if not animstate then return end
    if short then return animstate.m_flUnknownVelocityLean end
    local yaw = math.deg2rad(animstate.m_flEyeYaw)
    return v(vel.x * math.cos(yaw) + vel.y * math.sin(yaw),
            vel.y * math.cos(yaw) - vel.x * math.sin(yaw), 0):func(math.round)
end
entity_t.movement_type = function(s)
    local is_lp = s:get_index() == entitylist.lp():get_index()
    if s:in_air() or (is_lp and client.is_key_pressed(32) and extended:is_window_active()) then return 3 end
    if s:get_prop_float(m_.flDuckAmount) > 0.1 or
        (is_lp and fakeduck_bind:on()) then return 4 end
    if slowwalk_bind:is_active() and s:velocity() > 5 then return 1 end
    if s:velocity() < 5 then return 0 end
    return 2
end
entity_t.is_scoped = function(s)
    if s == entitylist.lp() and m_custom_scope.val() then
        return m_custom_scope.temp.scoped
    end
    return s:get_prop_bool(m_.bIsScoped)
end
entity_t.hittable = function(s, attacker, predict, accuracy, orig_pos)
    predict, accuracy = predict or 0, clamp(accuracy or math.floor(predict / 3), 1, 16)
    local to, orig_pos = s:predict_origin(predict, (s:get_eye_pos() + v(0, 0, 10)) or orig_pos)
    local t = trace.line(s:get_index(), 0x46004003, to, attacker:get_player_hitbox_pos(0))
    if t.hit_entity_index == attacker:get_index() then return true end
    if predict - accuracy > 0 then
        return s:hittable(attacker, predict - accuracy, accuracy, orig_pos)
    end
    return false
end
entity_t.distance_to_wall = function(s, yaw, pos)
    local pos = pos or s:abs_origin()
    local vec = angle_t.new(0, yaw, 0):to_vec()
    local dest = pos + vec * 8192
    local result = trace.line(s:get_index(), 0x46004003, pos, dest)
    if result.fraction ~= 1 then
        local wall = pos + (vec * (result.fraction * 8192))
        return (pos - wall):length()
    end
end
entity_t.change_model = function(s, model)
    ffp.models.change(s:address(), model)
end
entity_t.observing = function(s)
    return entitylist.get_entity_from_handle(s:get_prop_int(m_.hObserverTarget)) end
entity_t.get_steam_id = function(s)
    local id = ffi.new("SteamID")
    local id64 = engine.get_player_info(s:get_index()).steam_id64
    if id64 == 0 then return end
    local id64_part = string.match(id64, "^765("..string.rep("%d", 14).. ")$")
	if id64_part ~= nil then
		id.steamid64 = 76500000000000000ULL + tonumber(id64_part)
        return id
	end
end
entitylist.avatars = {}
entity_t.get_avatar = function(s)
    local info = s:info()
    local id = info.steam_id64
    if id == "0" or info.is_bot then return false end
    if entitylist.avatars[id] then
        return entitylist.avatars[id] end
    local id64_part = string.match(id, "^765("..("%d"):rep(14).. ")$")
    local id64 = 76500000000000000ULL + tonumber(id64_part)
    local avatar = ffp.Steam.Friends.GetSmallFriendAvatar(id64)
    local buff_size = 32 * 32 * 4
    local buff = ffi.new("uint8_t[?]", buff_size)
    ffp.Steam.Utils.GetImageRGBA(avatar, ffi_ptr(buff), buff_size)
    local texture = extended.rgba_to_texture(buff)
    entitylist.avatars[id] = texture
    return texture
end
entitylist.lp = entitylist.get_local_player
entitylist.get_number_of_ents = function(non_networkable)
    return ffp.get_num_of_ents(non_networkable)
end
entity_t.predict_origin = function(s, ticks, pos)
    if pos == nil then pos = s:abs_origin() end
    return pos + (s:velocity(true) * (globalvars.get_interval_per_tick() * ticks)), pos
end
entity_t.can_move = function(s)
    if s:flags(64) then return end
    -- if s:get_prop_int(m_.netMoveType) == 0 then return end
    -- local state = s:get_prop_int(m_.iPlayerState)
    -- if state ~= 0 and state ~= 1 then return end
    -- if s:get_prop_bool(m_.bIsDefusing) or s:get_prop_bool(m_.bIsGrabbingHostage) then return end
    if not s:get_prop_bool(m_.bCanMoveDuringFreezePeriod)
        and ffi.cast("bool*", ffp.gamerules[0][0] + m_.bFreezePeriod)[0] then return end
    return true
end
do
    local ticks = {}
    entity_t.dormant_ticks = function(s)
        local id = s:info().user_id
        if not ticks[id] then
            ticks[id] = 0 end
        return ticks[id]
    end
    entitylist.scan_dormant = {
        cm = function()
            entitylist.for_all_entities(function(ent)
                local id = ent:info().user_id
                if not ticks[id] then
                    ticks[id] = 0
                end
                if ent:is_dormant() then
                    ticks[id] = ticks[id] + 1
                else
                    ticks[id] = 0
                end
            end)
        end,
        round_prestart = function()
            for k, _ in pairs(ticks) do
                ticks[k] = math.huge
            end
        end
    }
end

ragelogs = {}
--#endregion

performance = {
    _start_time = {},
    list = {},
    top = {},
    enabled = false,
    slowdown = function()
        return globalvars.get_frame_count() % 60 ~= 1
    end,
    start = function(id)
        performance._start_time[id] = os.clock()
    end,
    stop = function(id)
        if not performance.enabled then return end
        local t = performance._start_time[id]
        if not t then return end
        local time = os.clock() - t
        if not performance.slowdown() then
            performance.list[id] = os.clock() - t
        end
        if not performance.top[id] then
            performance.top[id] = time
        else
            performance.top[id] = performance.top[id] + time
        end
        performance._start_time[id] = nil
    end,
    render = function()
        local index = 1
        local list = {}
        for name, time in pairs(performance.list) do
            if time ~= nil then
                list[index] = {name, time}
            end
            index = index + 1
        end
        table.sort(list, function(a, b) return a[2] > b[2] end)
        index = 0
        for i = 1, #list do
            if list[i][2] > 0 then
                render.text(list[i][1] .. ": " .. tostring(list[i][2]),
                    v(5, 10 + index * 10), gui.fonts.small, col(255,255,255))
                index = index + 1
            end
        end

        local top = {}
        index = 1
        for name, time in pairs(performance.top) do
            if time ~= nil then
                top[index] = {name, time}
            end
            index = index + 1
        end
        table.sort(top, function(a, b) return a[2] < b[2] end)
        index = 8
        for i = 1, #top do
            if top[i][2] > 0 then
                render.text(top[i][1] .. ": " .. tostring(top[i][2]),
                    v(5, ss.y - index * 10), gui.fonts.small, col(255,255,255))
                index = index + 1
            end
        end
    end,
}
--#region indicators
indicators = {
    list = {},
    -- fonts = {
    --     -- {"nix/storm/fonts/MuseoSansBlack.ttf", render.flags.LightHinting},
    --     -- {"C:/windows/fonts/trebucbd.ttf", render.flags.ForceAutoHint},
    --     -- {"C:/windows/fonts/courbd.ttf", render.flags.MonoHinting},
    --     {"nix/storm/fonts/smallest_pixel-7.ttf", render.flags.Monochrome},
    --     {"C:/Windows/Fonts/verdana.ttf", 0}
    -- },
    anim = 1,
    anim_orig = 1,
    add = function(s, fn, margin, condition)
        s.list[#s.list + 1] = {
            fn = fn,
            anim = 0,
            anim_orig = 0,
            margin = margin,
            condition = condition,
        }
    end,
    render = function(s)
        local lp = entitylist.lp()
        if not lp or not lp:is_alive() then return end
        s.anim_orig = render.anim(s.anim_orig, not lp:is_scoped(), 10)
        s.anim = render.easing_in(s.anim_orig)
        if not m_indicators.elems.centered.val() then
            s.anim = 0
        end
        local size = s.size * s.anim
        pos, _size, hint = s.drag:run(nil, v(size.x / 2, 0), v(-size.x / 2, 0))
        pos = v(ss.x / 2, pos.y)
        s.drag:set_pos(pos)
        local y = 0
        local x = (1 - s.anim) * 6
        for _, ind in pairs(s.list) do
            local active = ind.condition and ind.condition() or not ind.condition
            ind.anim_orig = render.anim(ind.anim_orig, active, 12)
            ind.anim = render.easing(ind.anim_orig)
            if ind.anim ~= 0 then
                ind:fn(pos + v(ind.margin.x * s.anim + x, y), ind.anim * 255)
                y = y + (ind.margin.y) * ind.anim
            end
        end
        hint()
    end,
}
indicators.text = function(pos, text, font, anim)
    local type = m_indicators.elems.optimization.val()
    if outline == nil then outline = true end
    local str = ""
    for _, t in pairs(text) do
        if type ~= 2 then
            t[3] = nil end
        str = str..t[1] end
    pos = pos - v((render.text_size(str, font).x / 2) * indicators.anim, 0)
    local shadow = col(0, 0, 0, anim and (anim * 255) or 255)
    if type ~= 1 then shadow = false end
    render.multi_color_text(text, font, pos, shadow, false)
end
--#endregion
info_box = {
    list = {},
    font = function()
        local font = info_box.styling.elems.font.val()
        return info_box.fonts[font + 1]
    end,
    fonts = {
        render.font("C:/windows/fonts/verdana.ttf", 12, 128 + 16),
        render.font("C:/windows/fonts/tahoma.ttf", 13, 128 + 16),
        render.font("C:/Windows/Fonts/verdana.ttf", 13, 0),
        render.font("C:/windows/fonts/verdana.ttf", 12, 0),
    },
    add = function(i, size, pos, fn, text, center)
        local t = draggable.new({
            anim = 0,
            text = text,
            center = center,
            render = function(s)
                s.draw = {}
                local hover = s.anim ~= 0
                if hover then hover = nil end
                local pos, _, hint = s.drag:run(hover)
                s.drag:set_pos(pos)
                local active, new_size = fn(s, s.pos, s.size)
                local size = s.size
                if new_size then
                    size = v(new_size.x, s.size.y)
                    s.size.x = new_size.x
                    if new_size and info_box.styling.elems["list background"].val() then
                        size.y = size.y + new_size.y
                    end
                end
                info_box.types[info_box.styling.elems.style.val() + 1](s, s.pos, size)
                if s.anim ~= 0 then
                    if s.draw then
                        for a = 1, #s.draw do s.draw[a](size) end end
                    hint()
                end
                return active
            end,
        }, size, pos)
        i.list[#i.list+1] = t
    end,
    render = function(s)
        for _, v in pairs(s.list) do
            v.anim = render.anim(v.anim, v:render())
        end
    end,
    types = {
        function(s, pos, size)
            if s.anim == 0 then return end
            local styling = info_box.styling
            local c = table.map({styling.elems["color 1"], styling.elems["color 2"], styling.elems["color 3"]},
                function(v) return v.col():alp_self(s.anim) end)
            local bg = styling.elems["background color"].col():alp_self(s.anim)
            local sz = styling.elems["glow size"].val()
            local dir = ({{0, 0}, {sz, 0}, {sz, sz}, {0, sz}})[styling.elems["glow direction"].val() + 1]
            local font = info_box.font()
            renderer.rect_filled(pos, pos + size, bg)
            renderer.rect_filled_fade(pos, pos + v(size.x / 2, 1), c[1], c[2], c[2], c[1])
            renderer.rect_filled_fade(pos + v(dir[1], 1), pos + v(size.x / 2, 2), c[1], c[2], c[2], c[1])
            renderer.rect_filled_fade(pos + v(size.x / 2, 0), pos + v(size.x, 1), c[2], c[3], c[3], c[2])
            renderer.rect_filled_fade(pos + v(size.x / 2, 1), pos + v(size.x - dir[2], 2), c[2], c[3], c[3], c[2])
            render.text(s.text(), pos + v(s.center and size.x / 2 or 0, 5),
            font, col(255, 255, 255, s.anim * 255), true, nil, nil, s.center)
        end,
        function(s, pos, size)
            if s.anim == 0 then return end
            local styling = info_box.styling
            local color = styling.elems["color 1"].col():alp_self(s.anim)
            local length = styling.elems["line length"].val()
            local w = styling.elems["line width"].val() - 1
            local cg = color:alp_self(w == 0 and 0.8 or 1)
            local arc, filled = render.arc_width, renderer.rect_filled
            local r = styling.elems.radius.val()
            local arc_w = math.max(1, w * 3)
            local font = info_box.font()
            filled(pos + v(r - 1, 1), pos + v(size.x - r + 1, -w), cg)
            arc(pos + v(r, r), r, 190, 70, arc_w, color, 1)
            arc(pos + v(size.x - r - 1, r), r, 280, 70, arc_w, color, 1)
            filled(pos + v(1, r - 1), pos + v(-w, r - 1 + length), cg)
            filled(pos + v(size.x - 1, r - 1), pos + v(size.x + w, r - 1 + length), cg)
            render.text(s.text(), pos + v(s.center and size.x / 2 or 0, 5),
            font, col(255, 255, 255, s.anim * 255), true, nil, nil, s.center)
        end,
        function(s, pos, size)
            if s.anim == 0 then return end
            local styling = info_box.styling
            local c = table.map({styling.elems["color 1"], styling.elems["color 2"], styling.elems["color 3"]},
                function(v) return v.col():alp_self(s.anim) end)
            local cg = table.map(c, function(e) return e:alp_self(0.8) end)
            local bg = styling.elems["background color"].col():alp_self(s.anim)
            local r = styling.elems.radius.val()
            local glow = styling.elems["glow size"].val()
            if glow ~= 0 then
                render.rounded_shadow(pos, pos + size, r, c[3], glow)
            end
            local font = info_box.font()
            local arc, filled, fade = render.arc, renderer.rect_filled, renderer.rect_filled_fade
            render.rounded_rect(pos, pos + size, r + 1, 45, bg)
            arc(pos + v(r, r), r, 190, 70, false, 16, c[1])
            arc(pos + v(size.x - r - 1, r), r, 280, 70, false, 16, c[1])
            if styling.elems["gradient bottom"].val() then
                local co = cg[1]:alp(0)
                fade(pos + v(r - 1, size.y - 1), pos + v(size.x / 2, size.y), co, cg[1], cg[1], co)
                fade(pos + v(size.x / 2, size.y - 1), pos + v(size.x - r + 1, size.y), cg[1], co, co, cg[1])
                cg[2] = co
            else
                arc(pos + v(r, size.y - r - 1), r, 100, 70, false, 16, c[2])
                arc(pos + v(size.x - r - 1, size.y - r - 1), r, 10, 70, false, 16, c[2])
                filled(pos + v(r - 1, size.y - 1), pos + v(size.x - r + 1, size.y), cg[2])
            end
            filled(pos + v(r - 1, 0), pos + v(size.x - r + 1, 1), cg[1])
            fade(pos + v(0, r - 1), pos + v(1, size.y - r + 1), cg[1], cg[1], cg[2], cg[2])
            fade(pos + v(size.x - 1, r - 1), pos + v(size.x, size.y - r + 1), cg[1], cg[1], cg[2], cg[2])
            render.text(s.text(), pos + v(s.center and size.x / 2 or 0, 5),
                font, col(255, 255, 255, s.anim * 255), true, nil, nil, s.center)
        end
    },
}
table.fill = function(count, el)
    local t = {}
    for i = 1, count do
        t[i] = el end
    return t
end
table.map = function(t, fn)
    local new = {}
    for k, v in pairs(t) do
        new[k] = fn(v) end
    return new
end
table.map_object = function(t, fn)
    local new = {}
    for k, v in pairs(t) do
        local nk, nv = fn(k, v)
        new[nk] = nv end
    return new
end
table.serialize = function(val, name, minify, depth)
    minify = minify or false
    depth = depth or 0
    local spacer, nl = not minify and string.rep(" ", depth) or "", (not minify and "\n" or "")
    local tmp = spacer
    if name and type(name) == "string" then
        tmp = tmp..name.."="
    end
    if type(val) == "table" then
        tmp = tmp .. "{" .. nl
        for k, v in pairs(val) do
            tmp =  tmp .. table.serialize(v, k, minify, depth + 1) .. "," .. nl
        end
        tmp = tmp .. spacer .. "}"
    elseif type(val) == "number" then
        tmp = tmp .. tostring(val)
    elseif type(val) == "string" then
        tmp = tmp .. string.format("%q", val)
    elseif type(val) == "boolean" then
        tmp = tmp .. (val and "true" or "false")
    else
        tmp = tmp .. "\"[inserializeable datatype:" .. type(val) .. "]\""
    end
    return tmp
end
set = function(elems)
    local t = {}
    for _, v in pairs(elems) do
        t[v] = true end
    return t
end
key_bind_t.on = function(s)
    local m, a = s:get_type(), s:is_active()
    if m == 1 or m == 2 then return s:get_key() ~= 0 and a else return a end
end
key_bind_t.get_mode = function(s)
    return ({"on", "hold", "toggle", "off"})[s:get_type() + 1]
end
multi_combo_box_t.values = function(s, length)
    local vals = {}
    for i = 0, length do vals[i+1] = s:get_value(i) end
    return vals
end
function cb(n, fn) return client.register_callback(n, fn) end
function paint(fn) return client.register_callback("paint", fn) end
function unload(fn) return client.register_callback("unload", fn) end
function create_move(fn) return client.register_callback("create_move", fn) end
function unload(fn) return client.register_callback("unload", fn) end
function frame_stage(fn, st)
    local f = fn
    if st ~= nil then f = function (stage) if stage ~= st then return end fn(st) end end
    return client.register_callback("frame_stage_notify", f)
end
function entitylist.get_entities(type, is_alive, indexes)
    if is_alive == nil then is_alive = false end
    if indexes == nil then indexes = false end
    local ents = entitylist.get_players(type or 0)
    local enemies = {}
    for i = 1, #ents do
        if is_alive and ents[i]:is_alive() or not is_alive then
            enemies[#enemies+1] = indexes and ents[i]:get_index() or ents[i]
        end
    end
    return enemies
end
function entitylist.for_enemies(fn, is_alive, indexes)
    local ents = entitylist.get_entities(0, is_alive, indexes)
    for i = 1, #ents do pcall(fn, ents[i]) end
end
function entitylist.for_players(fn, is_alive, indexes)
    local ents = entitylist.get_entities(2, is_alive, indexes)
    for i = 1, #ents do fn(ents[i]) end
end
function entitylist.for_entities(fn)
    for i = 0, entitylist.get_highest_entity_index() do
        local address = ffp.get_ent_address(ffp.ent_list, i)
        if address then
            fn(entitylist.get_entity_by_index(i), i, address)
        end
    end
end
function entitylist.for_all_entities(fn, only_enemy, is_alive)
    local lp = entitylist.lp()
    local team = lp:team()
    for i = 0, 64 do
        local player = entitylist.get_entity_by_index(i)
        if player then
            local player_team = player:team()
            if (only_enemy and (team ~= player_team and team ~= 1) or not only_enemy)
                and (is_alive and player:is_alive() or not is_alive) then
                fn(player, i)
            end
        end
    end
end
entitylist.by_i = entitylist.get_entity_by_index
function ragebot.force_hitboxes(hitboxes, health)
    if health == nil then health = false end
    entitylist.for_enemies(function(i)
        local ent = entitylist.by_i(i)
        if health and
            ent:get_health() > health or
            not ent:is_alive() then return end
        for h = 1, 6 do ragebot.override_hitscan(i, h-1, hitboxes[h]) end
    end, true, true)
end
function ragebot.force_safepoints(v, health)
    if health == nil then health = false end
    entitylist.for_enemies(function(i)
        local ent = entitylist.by_i(i)
        if health and
            ent:get_health() > health or
            not ent:is_alive() then return end
        ragebot.override_safe_point(i, v)
    end, true, true)
end
function ragebot.force_mindmg(dmg)
    entitylist.for_enemies(function(i)
        ragebot.override_min_damage(i, dmg) end, true, true)
end
extended = {
    ["delay"] = function(seconds)
        local start = os.clock()
        while os.clock() - start < seconds do end
    end,
    ["is_active_fn"] = function(el) return function() return el:on() end end,
    ["read_file"] = function(path, delete, wait)
        local i, file = 0
        if wait then
            while not file and i < 10000 do
                i = i + 1
                file = io.open(path, "r")
            end
        else file = io.open(path, "r") end
        return file:read("*all"), file:close(), delete and os.remove(path)
    end,
    ["file_exist"] = function(path)
        local file = io.open(path, "r")
        if file then file:close() return true else return false end
    end,
    ["write_file"] = function(path, text)
        local file = io.open(path, "w")
        file:write(text)
        file:close()
    end,
    ["exec"] = function(cmd, read)
        local command = "/C \""..cmd
        local tmp = os.tmpname()
        if read then command = command .. " > \"\"" .. tmp .. "\"\"\""
        else command = command .. "\"" end
        shell.ShellExecuteA(nil, "open", "cmd.exe", command, nil, 0)
        if not read then return end
        extended.delay(0.5)
        return extended.read_file(tmp, false, true)
    end,
    ["print_color"] = function(t, col)
        local c = ffi.new("struct c_color")
        c.clr[0], c.clr[1], c.clr[2], c.clr[3] = col.r, col.g, col.b, col.a
        ffp.color_print(ffp.engine_cvar, c, tostring(t))
    end,
    ["log"] = function(text, color)
        if type(color) == "string" then color = ({
            error = col(255, 100, 100),
            warning = col(255, 255, 0),
            info = col(255, 255, 255),
            success = col(0, 255, 0),
            debug = col(0, 0, 255)
        })[color] end
        extended.print_color("storm.lua | ", col(210, 210, 220))
        extended.print_color(text.."\n", color)
    end,
    ["log_multi"] = function(text, c)
        if c == nil then c = col(210, 210, 220) end
        extended.print_color("storm.lua | ", c)
        for i = 1, #text do extended.print_color(text[i][1], text[i][2]) end
        extended.print_color("\n", col(255, 255, 255))
    end,
    ["download"] = function(from, to, cache, preserve)
        if preserve and extended.file_exist(to) then return end
        local delete = false
        if to == nil then to, delete = os.tmpname(), true end
        if not cache then pcall(wininet.DeleteUrlCacheEntryA, from) end
        io.open(to, "w"):close()
        local success, code = pcall(urlmon.URLDownloadToFileA, nil, from, to, 0, 0)
        local err = "0x" .. ("%x"):format(tostring(code))
        return extended.read_file(to, delete), err
    end,
    ["get_exploit"] = function()
        local exploit = active_exploit:get_value()
        if m_defensive_dt.val() then
            local dt, hs = m_exploit_switch.elems.doubletap.on(), m_exploit_switch.elems.hideshots.on()
            if not dt and not hs then return false end
            return (dt and not hs) and "dt" or "hs"
        end
        if not exploit_bind:on() or exploit == 0 then return false end
        if exploit == 1 then return "hs" end
        return "dt"
    end,
    ["window_handle"] = user32.GetForegroundWindow(),
    ["is_cursor_visible"] = function()
        local cursor = ffi.new("CURSORINFO")
        cursor.cbSize = ffi.sizeof("CURSORINFO")
        user32.GetCursorInfo(ffi_ptr(cursor))
        return cursor.flags ~= 0
    end,
    ["is_window_active"] = function(s)
        local focused = user32.GetForegroundWindow() == s.window_handle
        local cursor = s.is_cursor_visible()
        local inter = ui.is_visible() or not cursor
        return focused and inter
    end,
    ["rgba_to_texture"] = function(data)
        local tmp = os.tmpname()
        local file = io.open(tmp, "w+b")
        local bytes = {}
        for i = 0, ffi.sizeof(data) - 1 do bytes[i+1] = data[i] end
        file:write(string.char(unpack(bytes))) file:close()
        extended.exec("\""..nix_path.."/storm/convert.exe\" \"\""..tmp.."\"\" \"\""..tmp..".png\"\"")
        return tmp..".png"
    end,
    ["file_size"] = function(path)
        local info = ffi.new("WIN32_FILE_ATTRIBUTE_DATA")
        kernel32.GetFileAttributesExA(path, 0, ffi_ptr(info))
        return info.nFileSizeLow, info.nFileSizeHigh
    end,
    ["build_tag"] = function(str)
        local t = {' '}
        for i = 1, #str do
            t[#t+1]=str:sub(1, i) end
        for i = 1, 3 do
            t[#t+1]=str end
        for i = #t - 1, 1, -1 do
            t[#t+1]=t[i] end
        return t
    end,
    ["char"] = function(val)
        local bm = { {0x7FF,192}, {0xFFFF,224}, {0x1FFFFF,240} }
        if val < 128 then return string.char(val) end
        local cbts = {}
        for bts, vals in ipairs(bm) do
            if val <= vals[1] then
                for b = bts+1, 2, -1 do
                    local mod = val % 64
                    val = (val - mod)/64
                    cbts[b] = string.char(128 + mod)
                end
                cbts[1] = string.char(vals[2] + val)
                break
            end
        end
        return table.concat(cbts)
    end,
    ["atob"] = function(str)
        local b = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
        str = string["gsub"](str, '[^'..b..'=]', '')
        return (str:gsub('.', function(x)
            if (x == '=') then return '' end
            local r,f='',(b:find(x)-1)
            for i=6,1,-1 do r=r..(f%2^i-f%2^(i-1)>0 and '1' or '0') end
            return r;
        end):gsub('%d%d%d?%d?%d?%d?%d?%d?', function(x)
            if (#x ~= 8) then return '' end
            local c=0
            for i=1,8 do c=c+(x:sub(i,i)=='1' and 2^(8-i) or 0) end
                return extended.char(c)
        end))
    end,
    ["dir"] = function(path, extension, removeExt)
        local files = {}
        function save_name(cFileName)
            local str = ffi.string(ffi.cast("char*", cFileName))
            if str == "." or str == ".." then return end
            if extension then
                local ext = str:sub(-#extension, -1)
                if ext ~= extension then return end
                if removeExt then
                    str = str:sub(1, -#extension-1)
                end
            end
            files[#files+1] = str
        end
        local file_data = ffi.new("WIN32_FIND_DATA")
        local handle = ffi.C.FindFirstFileA(path.."*", ffi_ptr(file_data))
        if handle == -1 then return false end
        save_name(file_data.cFileName)
        while kernel32.FindNextFileA(handle, ffi_ptr(file_data)) do
            save_name(file_data.cFileName)
        end
        kernel32.FindClose(handle)
        return files
    end,
    ["key_click"] = function(key)
        return (client.is_key_clicked(key) and client.is_key_pressed(key))
    end,
    ["split"] = function (inputstr, sep)
        if sep == nil then
            sep = "%s" end
        local t = {}
        for str in string.gmatch(inputstr, "([^"..sep.."]+)") do
            table.insert(t, str) end
        return t
    end,
    ["find_pattern"] = function(from, to, pattern)
        local ptr = ffi.cast("void*", from)
        local size = to - from
        local protect = ffi.new("DWORD[1]")
        if ffi.C.VirtualProtect(ptr, size, 4, protect) == 0 then return end
        local bytes = extended.split(pattern)
        for i = 1, #bytes do
            bytes[i] = tonumber(bytes[i], 16) end
        local buffer = ffi.new("unsigned char[?]", size)
        ffi.copy(buffer, ptr, size)
        ffi.C.VirtualProtect(ptr, size, protect[0], protect)
        local matched = 0
        for i = 0, size - 1 do
            if buffer[i] == bytes[matched + 1] then
                matched = matched + 1
                if matched == #bytes then
                    return from + i - #bytes + 1
                end
            else
                matched = 0
            end
        end
    end,
    desync_cache = 0,
    ["get_desync"] = function()
        local lp = entitylist.lp()
        if not lp or not lp:is_alive() then return end
        if clientstate.get_choked_commands() == 0 then
            local animstate = lp:get_animstate()
            if not animstate then return end
            extended.desync_cache = math.normalize_yaw(animstate.m_flEyeYaw - animstate.m_flGoalFeetYaw)
        end
        return extended.desync_cache
    end
}
resources = {
    ["build_date"] = "",
    ["release_notes"] = function()
        local data = {
        col(147, 183, 215),
[[
  ██████ ▄▄▄█████▓ ▒█████   ██▀███   ███▄ ▄███▓
▒██    ▒ ▓  ██▒ ▓▒▒██▒  ██▒▓██ ▒ ██▒▓██▒▀█▀ ██▒
░ ▓██▄   ▒ ▓██░ ▒░▒██░  ██▒▓██ ░▄█ ▒▓██    ▓██░
  ▒   ██▒░ ▓██▓ ░ ▒██   ██░▒██▀▀█▄  ▒██    ▒██ 
▒██████▒▒  ▒██▒ ░ ░ ████▓▒░░██▓ ▒██▒▒██▒   ░██▒
▒ ▒▓▒ ▒ ░  ▒ ░░   ░ ▒░▒░▒░ ░ ▒▓ ░▒▓░░ ▒░   ░  ░
░ ░▒  ░ ░    ░      ░ ▒ ▒░   ░▒ ░ ▒░░  ░      ░
░  ░  ░    ░      ░ ░ ░ ▒    ░░   ░ ░      ░   
      ░               ░ ░     ░            ░   
]],
        col(145, 197, 56),
        "welcome, ",
        col(255, 255, 255),
        client.get_username():lower(),
        col(145, 197, 56),
        "!\n",
        "fuck overprice, fuck useless pastes\n"..
        "with us, you can really enjoy the game\n",
        col(145, 197, 56),
        "\n[UPDATE 0.106.0]\n",
        col(147, 183, 215),
[[
$-improved  | gui
$-improved  | spectator list
$-fixed     | windows not rendering properly
$-fixed     | server probably
]],
            col(145, 197, 56),
            "\n[UPDATE 0.105.0]\n",
            col(147, 183, 215),
[[
$-added     | world indicators customization
$-added     | nade revealer
$-added     | "disable teleport fakelag" for defensive
$-fixed     | clantag
$-fixed     | doubletap on knife
$-fixed     | crashes
$-fixed     | right click on knife
$-improved  | indicators
$-improved  | molotov indicator
$-improved  | rage logs under crosshair
$-improved  | damage indicator
$-improved  | knife-bot.lua support
$-improved  | defensive behaviour
$-improved  | gui
$-removed   | freestand & at targets (temporary)
$-removed   | greeting
$-marked    | all non working functions with [!]
]],
            col(145, 197, 56),
            "\n[UPDATE 0.104.2]\n",
            col(147, 183, 215),
[[
$-changed   | discord link
$-improved  | state panel
$-improved  | rage logs
]],
            col(145, 197, 56),
            "\n[UPDATE 0.104.0]\n",
            col(147, 183, 215),
[[
$-added     | rage logs under crosshair
$-improved  | rage logs
]],
            col(145, 197, 56),
            "\n[UPDATE 0.103.0]\n",
            col(147, 183, 215),
[[
$-fixed     | outline text performance
$-removed   | ratnik
$-improved  | launch time
]],
        "\n"
        }
        local color = col(255, 255, 255, 255)
        for k, v in pairs(data) do
            if type(v) == "string" then
                extended.print_color(v, color)
            else color = v end
        end
    end,
}

local box, bind, combo, int = ui.get_check_box, ui.get_key_bind, ui.get_combo_box, ui.get_slider_int
fakeduck_bind = bind("antihit_extra_fakeduck_bind")
active_exploit = combo("rage_active_exploit")
exploit_bind = bind("rage_active_exploit_bind")
autopeek_bind = bind("antihit_extra_autopeek_bind")
autopeek_enable = box("antihit_extra_autopeek")
leg_movement = combo("antihit_extra_leg_movement")
desync_length = int("antihit_antiaim_desync_length")
desync_roll = int("antihit_antiaim_desync_roll")
desync_roll_pitch = int("antihit_antiaim_desync_roll_pitch")
at_targets = box("antihit_antiaim_at_targets")
antiaim_enable = box("antihit_antiaim_enable")
antiaim_pitch = combo("antihit_antiaim_pitch")
antiaim_yaw = combo("antihit_antiaim_yaw")
inverter_bind = bind("antihit_antiaim_flip_bind")
slowwalk_bind = bind("antihit_extra_slowwalk_bind")
thirdperson = box('visuals_other_thirdperson')
thirdperson_bind = bind('visuals_other_thirdperson_bind')
edgejump_bind = bind("misc_edge_jump_bind")
autostrafer = box("misc_autostrafer")
weapon_chams_enable = box("visuals_models_weapon_enable")
ping_spike_value = int("misc_ping_spike_amount")
fakelag_enable = box("antihit_fakelag_enable")
fakelag_limit = int("antihit_fakelag_limit")
grenade_esp_enable = box("visuals_esp_grenades_enable")
ct_agent = combo("skins_agent_ct")
t_agent = combo("skins_agent_t")
nightmode = box("visuals_other_nightmode")
nightmode_color = ui.get_color_edit("visuals_other_nightmode_color")
time_in_dormant = ui.get_slider_float("visuals_esp_enemy_dormant")
box, bind, combo, int = nil, nil, nil, nil
