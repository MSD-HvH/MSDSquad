--PREDICTION LUA V2
local checkhitbox = {0,11,12,13,14}
local username = cheat.GetCheatUserName()
local ideal_yaw
local right_side
local left_side
local dt_charging 
print("" .. username .. " if you have any questions feel free to dm Gt_Tohtty#1899")
local version = "1643"

local ffi = require('ffi')

ffi.cdef[[
    void* CreateFileA(
        const char*                lpFileName,
        unsigned long                 dwDesiredAccess,
        unsigned long                 dwShareMode,
        unsigned long lpSecurityAttributes,
        unsigned long                 dwCreationDisposition,
        unsigned long                 dwFlagsAndAttributes,
        void*                hTemplateFile
        );
    bool ReadFile(
            void*       hFile,
            char*       lpBuffer,
            unsigned long        nNumberOfBytesToRead,
            unsigned long*      lpNumberOfBytesRead,
            int lpOverlapped
          );
    bool WriteFile(
            void*       hFile,
            char*      lpBuffer,
            unsigned long        nNumberOfBytesToWrite,
            unsigned long*      lpNumberOfBytesWritten,
            int lpOverlapped
        );

    unsigned long GetFileSize(
        void*  hFile,
        unsigned long* lpFileSizeHigh
    );
    bool CloseHandle(void* hFile);

    typedef unsigned long ULONG_PTR;
    typedef unsigned long DWORD;
    typedef unsigned short WORD;

    typedef struct tagKEYBDINPUT {
        WORD      wVk;
        WORD      wScan;
        DWORD     dwFlags;
        DWORD     time;
        ULONG_PTR dwExtraInfo;
      } KEYBDINPUT, *PKEYBDINPUT, *LPKEYBDINPUT;

    typedef struct tagMOUSEINPUT {
        long      dx;
        long      dy;
        DWORD     mouseData;
        DWORD     dwFlags;
        DWORD     time;
        ULONG_PTR dwExtraInfo;
      } MOUSEINPUT, *PMOUSEINPUT, *LPMOUSEINPUT;

      typedef struct tagHARDWAREINPUT {
        DWORD uMsg;
        WORD  wParamL;
        WORD  wParamH;
      } HARDWAREINPUT, *PHARDWAREINPUT, *LPHARDWAREINPUT;

    typedef struct tagINPUT {
        DWORD type;
          MOUSEINPUT    mi;
          KEYBDINPUT    ki;
          HARDWAREINPUT hi;
      } INPUT, *PINPUT, *LPINPUT;
]]

local pfile = ffi.cast("void*", ffi.C.CreateFileA("nl/username.txt", 0xC0000000, 0x00000003, 0, 0x4, 0x80, nil))
--local cfile = ffi.cast("void*", ffi.C.CreateFileA("nl/settings.txt", 0xC0000000, 0x00000003, 0, 0x4, 0x80, nil))

cheat.RegisterCallback("destroy", function()
ffi.C.CloseHandle(pfile)
--ffi.C.CloseHandle(cfile)
end)

local size = ffi.C.GetFileSize(pfile, nil)
local buff = ffi.new("char[" ..(size + 1).. "]")

ffi.C.ReadFile(pfile, buff, size, nil, 0)
buff = ffi.string(buff)
local username = buff

local function initlua()

menu.Text("Prediction LUA V2", "Hello "..username.."!")

local vers = http.Get("https://pastebin.com/raw/bHXD56yW")

local ok = ""
if version == vers then ok = "Version: UP 2 DATE!" else ok = "Version: Outdated!" end

if ok then
    menu.Text("STATUS", ok)
else
    menu.Text("STATUS", "ERROR")
end

cheat.AddNotify("test lua", "Welcome to prediction lua " .. username .. " ")

ffi.cdef[[
    typedef uintptr_t (__thiscall* GetClientEntity_4242425_t)(void*, int);
    typedef void (__thiscall* UpdateCSA_t)(void*);
    typedef struct { float id; } poses_t;
	typedef struct 
	{
		float x;
		float y;
		float z;
    } Vector_t;
    
    typedef struct
    {
        float			flAnimationTime;		//0x00
        float			flFadeOut;				//0x04
        void*			pStudioHdr;				//0x08
        int				nDispatchedSrc;			//0x0C
        int				nDispatchedDst;			//0x10
        int				iOrder;					//0x14
        int nSequence;				//0x18
        float			flPrevCycle;			//0x1C
        float			flWeight;				//0x20
        float			flWeightDeltaRate;		//0x24
        float			flPlaybackRate;			//0x28
        float			flCycle;				//0x2C
        void*			pOwner;					//0x30
        int				nInvalidatePhysicsBits;	//0x34
    } animlayer_t;
	
	typedef struct
	{
		void* pThis;
		char pad2[91];
		void* pBaseEntity; //0x60
		void* pActiveWeapon; //0x64
		void* pLastActiveWeapon; //0x68
		float m_flLastClientSideAnimationUpdateTime; //0x6C
		int m_iLastClientSideAnimationUpdateFramecount; //0x70
		float m_flEyePitch; //0x74
		float m_flEyeYaw; //0x78
		float m_flPitch; //0x7C
		float m_flGoalFeetYaw; //0x80
		float m_flCurrentFeetYaw; //0x84
		float m_flCurrentTorsoYaw; //0x88
		float m_flUnknownVelocityLean; //0x8C //changes when moving/jumping/hitting ground
		float m_flLeanAmount; //0x90
		char pad4[4]; //NaN
		float m_flFeetCycle; //0x98 0 to 1
		float m_flFeetYawRate; //0x9C 0 to 1
		float m_fUnknown2;
		float m_fDuckAmount; //0xA4
		float m_fLandingDuckAdditiveSomething; //0xA8
		float m_fUnknown3; //0xAC
		Vector_t m_vOrigin; //0xB0, 0xB4, 0xB8
		Vector_t m_vLastOrigin; //0xBC, 0xC0, 0xC4
		float m_vVelocityX; //0xC8
		float m_vVelocityY; //0xCC
		char pad5[4];
		float m_flUnknownFloat1; //0xD4 Affected by movement and direction
		char pad6[8];
		float m_flUnknownFloat2; //0xE0 //from -1 to 1 when moving and affected by direction
		float m_flUnknownFloat3; //0xE4 //from -1 to 1 when moving and affected by direction
		float m_unknown; //0xE8
		float speed_2d; //0xEC
		float flUpVelocity; //0xF0
		float m_flSpeedNormalized; //0xF4 //from 0 to 1
		float m_flFeetSpeedForwardsOrSideWays; //0xF8 //from 0 to 2. something  is 1 when walking, 2.something when running, 0.653 when crouch walking
		float m_flFeetSpeedUnknownForwardOrSideways; //0xFC //from 0 to 3. something
		float m_flTimeSinceStartedMoving; //0x100
		float m_flTimeSinceStoppedMoving; //0x104
		unsigned char m_bOnGround; //0x108
		unsigned char m_bInHitGroundAnimation; //0x109
		char pad7[10];
		float m_flLastOriginZ; //0x114
		float m_flHeadHeightOrOffsetFromHittingGroundAnimation; //0x118 from 0 to 1, is 1 when standing
		float m_flStopToFullRunningFraction; //0x11C from 0 to 1, doesnt change when walking or crouching, only running
		char pad8[4]; //NaN
		float m_flUnknownFraction; //0x124 affected while jumping and running, or when just jumping, 0 to 1
		char pad9[4]; //NaN
		float m_flUnknown3;
		char pad10[528];
    } CCSGOPlayerAnimationState_534535_t;
]]

local hitboxesused = {18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,0}

local hitboxes = {
    "Head", 
    "Upper Chest",
    "Chest",
    "Body",
    "Stomach",
    "Pelvis",
    "Legs & Feet",
    "Arms"
}

local types = {
    "2D Filled Circle",
    "2D Circle"
}
--VARS
local miss_counter = 0
local menu_invert_side = g_Config:FindVar("Aimbot", "Anti Aim", "Fake Angle", "Inverter")
local menu_left_limit = g_Config:FindVar("Aimbot", "Anti Aim", "Fake Angle", "Left Limit")
local menu_fake_options = g_Config:FindVar("Aimbot", "Anti Aim", "Fake Angle", "LBY Mode")
local menu_right_limit = g_Config:FindVar("Aimbot", "Anti Aim", "Fake Angle", "Right Limit")
local menu_leg_movement = g_Config:FindVar("Aimbot", "Anti Aim", "Misc", "Leg Movement")
local menu_fakelag_limit = g_Config:FindVar("Aimbot", "Anti Aim", "Fake Lag", "Limit")
local menu_fakelag_enable = g_Config:FindVar("Aimbot", "Anti Aim", "Fake Lag", "Enable Fake Lag")
--local menu_fakelag_triggers = g_Config:FindVar("Aimbot", "Anti Aim", "Fake Lag", "Triggers")

local menu_safe_point = g_Config:FindVar("Aimbot", "Ragebot", "Accuracy", "Safe Points")
local menu_fakeduck = g_Config:FindVar("Aimbot", "Anti Aim", "Misc", "Fake Duck")
local menu_antiaim_manual = g_Config:FindVar("Aimbot", "Anti Aim", "Main", "Yaw Base")
local var_arrow_fonts = g_Render:InitFont("Verdana",55)

--VARS END--

--LUA MENU
menu.Text("Anti-Aim", "Anti Bruteforce Customization")
local c_menu_anti_brute = menu.Switch("Anti-Aim", "Anti Brute", false, "Will enable Lua Script Anti-BruteForce!")
local c_menu_anti_brute_fov_slider = menu.SliderFloat("Anti-Aim", "Anti Brute FOV", 175.0, 50.0, 250.0, "Limit FOV between bullet and your modelll (Recomended Default Value)")

local c_menu_anti_brute_debug_mode = menu.Switch("Anti-Aim", "Debug Mode", false, "Will print on console which angle has been overrided etc...")
local c_menu_anti_brute_1stshot = menu.SliderInt("Anti-Aim", "1st shot angle", 45, 0, 60, "Fake Limit for 1st enemy shot (Recomended using default values if you don't know what you're doing!)")
local c_menu_anti_brute_2ndshot = menu.SliderInt("Anti-Aim", "2nd shot angle", 45, 0, 60, "Fake Limit for 2nd enemy shot (Recomended using default values if you don't know what you're doing!)")
local c_menu_anti_brute_3rdshot = menu.SliderInt("Anti-Aim", "3rd shot angle", 5, 0, 60, "Fake Limit for 3rd enemy shot (Recomended using default values if you don't know what you're doing!)")

menu.Text("Anti-Aim", "Body Lean Customization")
local c_menu_custom_body_lean = menu.Switch("Anti-Aim", "Custom Bodylean", false, "Will enable customized BodyLean can be modified using the sliders below!")
local c_menu_body_lean_left = menu.SliderFloat("Anti-Aim", "Body Lean Left", 16.4, -180.0, 180.0, "Adjusts your BodyLean")
local c_menu_body_lean_right = menu.SliderFloat("Anti-Aim", "Body Lean Right", -20.0, -180.0, 180.0, "Adjusts your BodyLean")



menu.Text("FakeLags", "FakeLags Customization")
local c_menu_custom_fakelag = menu.Switch("FakeLags", "Custom Fakelag", false, "Will enable customized Fakelags")
local c_menu_fakelag_modes = menu.Combo("FakeLags", "Modes", {"Adaptive", "Fluctuate"}, 0, "Multiple Fakelag modes!")
local c_menu_fakelag_fluctuate_timing = menu.SliderFloat("FakeLags", "Fluctuate Timing", 12.9, 0.0, 20.0, "Fluctuate timing (Recomended Default values!)!")

menu.Text("Exploits", "Exploits Customization")
local c_menu_doubletap = menu.Switch("Exploits", "Customized Doubletap", true, "")
local c_menu_doubletap_clockcr = menu.Switch("Exploits", "Disable Correction", false, "Will make your DoubleTap innacurate but faster!")
local c_menu_doubletap_modes = menu.Combo("Exploits", "Modes", {"Instant", "Fast", "Slow", "Sonic"}, 0, "Multiple DoubleTap speed modes!")
local c_menu_doubletap_debug_mode = menu.Switch("Exploits", "Debug Mode", false, "Will print info about doubletap, ticks etc...")
local c_menu_doubletap_instant_recharge = menu.Switch("Exploits", "Instant Recharge", false, "Will recharge doubletap as soon as possible (Not recommended tho!)!")

local c_menu_exploits_legs = menu.Switch("Exploits", "Smart Legs", false, "Will swap your model legs between normal/sliding asap!")
local c_menu_air_stuck = menu.Switch("Exploits", "Airstuck", false, "")

menu.Text("Visuals", "Visuals Customization")
local c_menu_text_indicators = menu.Switch("Visuals", "Enable text indicators", false, "Draw Text indicators (Use the multicombo tho!)!")
local c_menu_x = menu.SliderFloat("Visuals", "Text x position", 973.0, 0.0, 2000.0, "x pos")
local c_menu_y = menu.SliderFloat("Visuals", "Text y position", 484.0, 0.0, 2000.0, "y pos")
local c_menu_arrows = menu.Switch("Visuals", "Anti-Aim Arrows", false, "Draw AntiAim direction arrows!")
local c_menu_arrow_color = menu.ColorEdit("Visuals", "Arrow color", Color.new(1,1,1,1), "")
local c_menu_arrows_type = menu.Combo("Visuals", "Arrow Type", {")", ">", "Triangles", "Circle"}, 0, "Multiple Arrow types!")
local c_menu_custom_impacts = menu.Switch("Visuals", "Custom Bullet Impacts", false, "")
local c_menu_visuals_impacts = menu.SliderInt("Visuals", "Bullet Impacts size", 5, 1, 50, "")
local c_menu_visuals_beam_color = menu.ColorEdit("Visuals", "Beam Color", Color.new(1,1,1,1), "")
local c_menu_visuals_impact_color = menu.ColorEdit("Visuals", "Impacts Color", Color.new(1,1,1,1), "")
local c_menu_watermarker = menu.Switch("Visuals", "Watermarker", false, "Enables simple Watermarker!")

menu.Text("Misc", "Miscellaneous")
local c_menu_kill_say = menu.Switch("Misc", "Custom Kill Say", false, "Says something on the chat once you kill someone (Words can be edited on the textbox below!)!")
local c_menu_kill_say_words = menu.TextBox("Misc", "Kill Say Words", 64, "Say something...", "Says something on the chat once you kill someone (If Kill Say checkbox is enabled!)!")
local c_menu_hurt_say = menu.Switch("Misc", "Custom Hurt Say", false, "Says something on the chat once you hurt someone (Words can be edited on the textbox below!)!")
local c_menu_hurt_say_words = menu.TextBox("Misc", "Hurt Say Words", 64, "Say something...", "Says something on the chat once you hurt someone (If Hurt Say checkbox is enabled!)!")

menu.Text("Aimbot", "Advanced Aimbot")
--local c_menu_safepoint_hitboxes = menu.MultiCombo("Aimbot", "Safe point Hitboxes", hitboxes, 0, "")
local c_menu_draw_only_priority_hitboxe = menu.SwitchColor("Aimbot", "Draw only priority hitbox", false, Color.new(1.0,1.0,1.0,1.0), "")
local c_menu_circle_customization = menu.Combo("Aimbot", "Circle Customization", types, 0, "")
local c_menu_scale_circle = menu.SliderFloat("Aimbot", "Scale circle", 1, 0, 20, "")
local c_menu_hitboxes_color = menu.ColorEdit("Aimbot", "Intersacted points Color", Color.new(1,1,1,1), "")


local c_menu_anti_aim_helpers = menu.Switch("Anti-Aim", "Auto direction", false, "")
local c_menu_anti_aim_helpers_types = menu.Combo("Anti-Aim", "Auto direction Types", {"Peek with Fake", "Peek with Real"}, 0, "Multiple Auto direction types!")
local c_menu_anti_aim_helpers_desync = menu.Switch("Anti-Aim", "Desync Modifications", false, "")
local c_menu_anti_aim_helpers_desync_mod = menu.Combo("Anti-Aim", "Desync Mods", {"Smart", "Prefer Low Delta", "Multiple"}, 0, "Multiple Auto direction types!")
local menu_freestand_desync = g_Config:FindVar("Aimbot", "Anti Aim", "Fake Angle", "Freestanding Desync")
local menu_fake_option = g_Config:FindVar("Aimbot", "Anti Aim", "Fake Angle", "Fake Options")

--LUA MENU

local function antiaim_helpers() 

  if (c_menu_anti_aim_helpers:GetBool()) then
        if (c_menu_anti_aim_helpers_types:GetInt() == 0) then --Peek fake
            menu_freestand_desync:SetInt(1)
        else if (c_menu_anti_aim_helpers_types:GetInt() == 1) then --Peek real
            menu_freestand_desync:SetInt(2)
        end 
    end
  end

  local local_idx = g_EngineClient:GetLocalPlayer()
  local local_entity = g_EntityList:GetClientEntity(local_idx)

  if local_entity == nil then
    return
  end
  
  local local_player = local_entity:GetPlayer();
  local speed_x = local_player:GetProp("DT_BasePlayer", "m_vecVelocity[0]")
  local speed_y = local_player:GetProp("DT_BasePlayer", "m_vecVelocity[1]")
  local speed = math.sqrt(speed_x * speed_x + speed_y * speed_y)
  local speed_per_tick = math.sqrt(speed_x * speed_x + speed_y * speed_y) *  g_GlobalVars.interval_per_tick
    if (c_menu_anti_aim_helpers_desync:GetBool()) then

        if (c_menu_anti_aim_helpers_desync_mod:GetInt() == 0) then --smart
            menu_fake_option:SetInt(1)
            menu_freestand_desync:SetInt(2)
            antiaim.OverrideLimit(math.random(45, 80))
              menu_left_limit:SetInt(math.random(30, 80))
              menu_right_limit:SetInt(math.random(30, 80))
           
        
        end
        if (c_menu_anti_aim_helpers_desync_mod:GetInt() == 2) then --Multiple
            menu_fake_option:SetInt(utils.RandomInt(2, 3))
            menu_fake_options:SetInt(utils.RandomInt(1, 2))
              menu_left_limit:SetInt(utils.RandomInt(35, 60))
              menu_right_limit:SetInt(utils.RandomInt(35, 60))
        end
       if (c_menu_anti_aim_helpers_desync_mod:GetInt() == 1) then --prefer low delta 
          menu_fake_option:SetInt(1)
          menu_freestand_desync:SetInt(2)
          antiaim.OverrideLimit(math.random(15, 15))
          menu_left_limit:SetInt(math.random(15, 35))
          menu_right_limit:SetInt(math.random(15, 35))
        
        end     
    end
end






--AIMBOT 

local safety_hitboxes = {}
local best_hitbox = {}
local best_damage = {}

local predict_ticks = 7
local force_off = false
local force_off_tick = 0

local function normalizeangles(ang)
    if(ang.pitch > 180.0) then ang.pitch = ang.pitch - 360.0 end
    if(ang.yaw > 180.0) then ang.yaw = ang.yaw - 360.0 end
    return ang
end

local function calcangle(src, dst)
    local vecdelta = Vector.new(dst.x - src.x, dst.y - src.y, dst.z - src.z)
    local angles = QAngle.new(math.atan2(-vecdelta.z, vecdelta:Length2D()) * 180.0 / math.pi, (math.atan2(vecdelta.y, vecdelta.x) * 180.0 / math.pi), 0.0)
    angles = normalizeangles(angles)
    return angles
end

local function canseeentity(localplayer, entity)
    if not entity or not localplayer then return false end
    local canhit = false
    for k,v in pairs(checkhitbox) do
        local damage = cheat.FireBullet(localplayer, localplayer:GetEyePosition(), entity:GetPlayer():GetHitboxCenter(v))
        if damage > 0 then 
            canhit = true
            break 
        end
    end
    return canhit
end

cheat.RegisterCallback("events", function(event)
    if event:GetName() == "player_death" then
       
        if true then
            for i = 1, 64 do
                best_hitbox[i] = -1
                best_damage[i] = 0
            end
        end
    end
end)
local lines = {}
local results = {}

local function impacts_events(event)
    if event:GetName() == "bullet_impact" and event:GetInt("userid") == g_EngineClient:GetPlayerInfo(g_EngineClient:GetLocalPlayer()).userId then
        local localplayer = g_EntityList:GetClientEntity(g_EngineClient:GetLocalPlayer())
        if localplayer then localplayer = localplayer:GetPlayer() else return end
        local position = localplayer:GetEyePosition()
        local destination = Vector.new(event:GetFloat("x"), event:GetFloat("y"), event:GetFloat("z"))
        table.insert(lines, {pos = position, destination = destination, time = 250, curtime = g_GlobalVars.curtime})
    end

    if event:GetName() == "player_hurt" then
        if event:GetInt("attacker") == g_EngineClient:GetPlayerInfo(g_EngineClient:GetLocalPlayer()).userId then
            for k,v in pairs(lines) do
                if v.curtime == g_GlobalVars.curtime then
                    table.insert(results, lines[k])
                    table.remove(lines, k)
                end
            end
        end
    end
end
local function draw_impacts()
    local localplayer = g_EntityList:GetClientEntity(g_EngineClient:GetLocalPlayer())
    if localplayer then localplayer = localplayer:GetPlayer() else return end
    local position = localplayer:GetEyePosition()

    for k,v in pairs(results) do
        v.time = v.time - 1
        if g_Render:ScreenPosition(v.pos).x ~= g_Render:ScreenPosition(v.destination).x and g_Render:ScreenPosition(v.pos).y ~= g_Render:ScreenPosition(v.destination).y then
            if g_Render:ScreenPosition(v.pos).x ~= g_Render:ScreenPosition(position).x and g_Render:ScreenPosition(v.pos).y ~= g_Render:ScreenPosition(position).y then
                g_Render:Line(g_Render:ScreenPosition(v.pos), g_Render:ScreenPosition(v.destination), c_menu_visuals_beam_color:GetColor())
            end
        end
        if v.time == 0 then table.remove(results, k) end
    end
    
    for k,v in pairs(results) do
        for i = 1,c_menu_visuals_impacts:GetInt() do
            local position1 = g_Render:ScreenPosition(v.destination)
            local position2 = g_Render:ScreenPosition(v.destination)
            local position3 = g_Render:ScreenPosition(v.destination)
            local position4 = g_Render:ScreenPosition(v.destination)
            position1.x = position1.x+i
            position2.x = position2.x-i
            position3.y = position3.y+i
            position4.y = position4.y-i
            g_Render:Box(position1, position2, c_menu_visuals_impact_color:GetColor())
            g_Render:Box(position3, position4, c_menu_visuals_impact_color:GetColor())
        end
    end
end

function C_BaseEntity:m_iHealth()
    return self:GetProp("DT_BasePlayer", "m_iHealth")
end
function C_BaseEntity:m_vecVelocity()
    return self:GetProp("DT_BasePlayer", "m_vecVelocity")
end

local ENTITY_LIST_POINTER = ffi.cast("void***", utils.CreateInterface("client.dll", "VClientEntityList003")) or error("Failed to find VClientEntityList003!")
local GET_CLIENT_ENTITY_FN = ffi.cast("GetClientEntity_4242425_t", ENTITY_LIST_POINTER[0][3])
local UpdateClientSideAnims = ffi.cast("UpdateCSA_t", utils.PatternScan("client.dll", "55 8B EC 51 56 8B F1 80 BE ? ? ? ? 00 74 ? 8B 06 FF"))

local ffi_helpers = {
get_animstate_offset = function()
    return 14612
end,

get_entity_address = function(entity_index)
    local addr = GET_CLIENT_ENTITY_FN(ENTITY_LIST_POINTER, entity_index)
    return addr
end
}

local original_goal_feet_yaw = {}


local function aimbot(cmd)
    local localplayer = g_EntityList:GetClientEntity(g_EngineClient:GetLocalPlayer())
    local oldlocalplayer = localplayer
    if localplayer then
		--local entity_animation_state = ffi.cast("int**", ffi_helpers.get_entity_address(2) + 45952)[0]
		--entity_animation_state = 100
        localplayer = localplayer:GetPlayer()
    else
        return
    end

    safety_hitboxes = {}
    for i = 0,10 do
        if c_menu_safepoint_hitboxes:GetBool(i) then
            if i == 0 then table.insert( safety_hitboxes, 0 )
            elseif i == 1 then table.insert( safety_hitboxes, 6 )
            elseif i == 2 then table.insert( safety_hitboxes, 5 )
            elseif i == 3 then table.insert( safety_hitboxes, 4 )
            elseif i == 4 then table.insert( safety_hitboxes, 3 )
            elseif i == 5 then table.insert( safety_hitboxes, 2 )
            elseif i == 6 then 
                for i = 7,12 do
                    table.insert( safety_hitboxes, i )
                end
            elseif i == 7 then
                for i = 13,18 do
                    table.insert( safety_hitboxes, i )
                end
            end
        end
    end

    for i = 1,64 do

        local entity = g_EntityList:GetClientEntity(i)
        if not entity then break end
        if entity and entity:GetPlayer():m_iHealth() > 0 and not entity:GetPlayer():IsTeamMate() and canseeentity(localplayer:GetPlayer(), entity:GetPlayer()) then
            
            --UpdateClientSideAnims(ffi.cast("void***", ffi_helpers.get_entity_address(entity:EntIndex())))
            for k,v in pairs(safety_hitboxes) do
                ragebot.ForceHitboxSafety(entity:EntIndex(), v)
            end

            local biggestdamage = 0
            local health = entity:GetPlayer():m_iHealth()
            local besthitboxfound = -1
            for k,v in pairs(hitboxesused) do
                local damage = cheat.FireBullet(localplayer, localplayer:GetEyePosition(), entity:GetPlayer():GetHitboxCenter(v))
                if damage > biggestdamage then
                    biggestdamage = damage
                    besthitboxfound = v
                end

                if damage >= health then
                    biggestdamage = damage
                    besthitboxfound = v
                    break
                end
            end
            
            best_hitbox[entity:EntIndex()] = besthitboxfound
            best_damage[entity:EntIndex()] = biggestdamage

            for i = 1, 18 do
                ragebot.SetHitboxPriority(entity:EntIndex(), i, 1)
            end

            ragebot.SetHitboxPriority(entity:EntIndex(), besthitboxfound, 10000)
        else
            best_damage[entity:EntIndex()] = 0
            best_hitbox[entity:EntIndex()] = -1
        end
    end

    --peeking:handle()
end


function toint(n)
    local s = tostring(n)
    local i, j = s:find('%.')
    if i then
        return tonumber(s:sub(1, i-1))
    else
        return n
    end
end

local function aimbot_draw()   
    local localplayer = g_EntityList:GetClientEntity(g_EngineClient:GetLocalPlayer())
    if localplayer then
        localplayer = localplayer:GetPlayer()
    else
        return
    end

    if localplayer:m_iHealth() < 1 then
        return
    end


    for i = 1,64 do
        local entity = g_EntityList:GetClientEntity(i)
        local nentity = entity
        if entity then
            entity = entity:GetPlayer()
        end
        if entity and entity:m_iHealth() > 0 and not entity:IsTeamMate() and not entity:IsDormant() then
            for k,v in pairs(hitboxesused) do
                local color = Color.new(1,0,0,1)
                local red = false
                    if best_hitbox[nentity:EntIndex()] == v then
                        color = c_menu_draw_only_priority_hitboxe:GetColor()
                    else
                        color = c_menu_hitboxes_color:GetColor()
                        red = true
                    end
                if c_menu_draw_only_priority_hitboxe:GetBool() and not red then
                    if c_menu_circle_customization:GetInt() == 1 then              
                        g_Render:Circle(g_Render:ScreenPosition(Vector.new(entity:GetHitboxCenter(v).x, entity:GetHitboxCenter(v).y, entity:GetHitboxCenter(v).z)), toint(7*c_menu_scale_circle:GetFloat()), toint(58*c_menu_scale_circle:GetFloat()/4), color)
                    elseif c_menu_circle_customization:GetInt() == 0 then
                        g_Render:CircleFilled(g_Render:ScreenPosition(Vector.new(entity:GetHitboxCenter(v).x, entity:GetHitboxCenter(v).y, entity:GetHitboxCenter(v).z)), toint(7*c_menu_scale_circle:GetFloat()), toint(58*c_menu_scale_circle:GetFloat()/4), color)
                    end
                elseif not c_menu_draw_only_priority_hitboxe:GetBool() then
                    if c_menu_circle_customization:GetInt() == 1 then              
                        g_Render:Circle(g_Render:ScreenPosition(Vector.new(entity:GetHitboxCenter(v).x, entity:GetHitboxCenter(v).y, entity:GetHitboxCenter(v).z)), toint(7*c_menu_scale_circle:GetFloat()), toint(58*c_menu_scale_circle:GetFloat()/4), color)
                    elseif c_menu_circle_customization:GetInt() == 0 then
                        g_Render:CircleFilled(g_Render:ScreenPosition(Vector.new(entity:GetHitboxCenter(v).x, entity:GetHitboxCenter(v).y, entity:GetHitboxCenter(v).z)), toint(7*c_menu_scale_circle:GetFloat()), toint(58*c_menu_scale_circle:GetFloat()/4), color)
                    end
                end
            end
        end
    end
end


--AIMBOT


--PREDICTION CALLBACK FUNCTIONS 
local function body_lean()
     local r_right = c_menu_body_lean_right:GetFloat()
     local r_left = c_menu_body_lean_left:GetFloat()

    if (c_menu_custom_body_lean:GetBool()) then
        if (menu_invert_side:GetBool()) then
            antiaim.OverrideYawOffset(r_right)
        else 
            antiaim.OverrideYawOffset(r_left)
        end
    end
end
--PREDICTION CALLBACK FUNCTIONS 


--EXPLOITS
local function instant_recharge()
    
    if (c_menu_doubletap_instant_recharge:GetBool()) then
        exploits.ForceCharge()
    end

end

local function exploits_func()
        --Speed modes
    local instant = 15
    local fast = 14
    local default = 13

    --Preserve modes
    local insecure = 0
    local secure = 1
    local safe = 2

    local cl_clock_correction = g_CVar:FindVar("cl_clock_correction") --clock correction OOPS: I think soufiw already manages with this but whatever...
    local sv_maxusrcmdprocessticks = g_CVar:FindVar("sv_maxusrcmdprocessticks") --sv_maxusrcmdprocessticks

    if (c_menu_doubletap_clockcr:GetBool()) then
        g_CVar:FindVar("cl_clock_correction"):SetInt(0)
        g_CVar:FindVar("cl_clock_correction_adjustment_max_amount"):SetInt(450)
    end

    if (c_menu_doubletap_modes:GetInt() == 0) then --Instant mode
        exploits.OverrideDoubleTapSpeed(instant)
        

        if (c_menu_doubletap_debug_mode:GetBool()) then
           print("[DOUBLETAP] TICKS: MAX | PRESERVE: INSECURE | CORRECTION: DISABLED ")
        end

    else if (c_menu_doubletap_modes:GetInt() == 1) then --Fast mode
        exploits.OverrideDoubleTapSpeed(fast)
        

        if (c_menu_doubletap_debug_mode:GetBool()) then
        print("[DOUBLETAP] TICKS: MAX | PRESERVE: SECURE | CORRECTION: DISABLED ")
        end

    else if (c_menu_doubletap_modes:GetInt() == 2) then --Slow mode
        exploits.OverrideDoubleTapSpeed(default)
        

        if (c_menu_doubletap_debug_mode:GetBool()) then
        print("[DOUBLETAP] TICKS: 13 | PRESERVE: SAFETY | CORRECTION: ENABLED ")
        end
    else if (c_menu_doubletap_modes:GetInt() == 3) then --Sonic mode
        local localplayer = g_EntityList:GetClientEntity(g_EngineClient:GetLocalPlayer())
        local getplayer = localplayer:GetPlayer()
        local active_weapon = getplayer:GetActiveWeapon()
        
        exploits.OverrideDoubleTapSpeed(14)
        g_CVar:FindVar("cl_clock_correction"):SetInt(0)
        g_CVar:FindVar("cl_clock_correction_adjustment_max_amount"):SetInt(450)
        if active_weapon:GetProp("DT_BaseAttributableItem", "m_iItemDefinitionIndex") == 38 or active_weapon:GetProp("DT_BaseAttributableItem", "m_iItemDefinitionIndex") == 11 then
            if g_Config:FindVar("Aimbot", "Ragebot", "Exploits", "Double Tap"):GetBool() then g_Config:FindVar("Aimbot", "Anti Aim", "Fake Lag", "Enable Fake Lag"):SetBool(false) else g_Config:FindVar("Aimbot", "Anti Aim", "Fake Lag", "Enable Fake Lag"):SetBool(true) end
        else
            g_Config:FindVar("Aimbot", "Anti Aim", "Fake Lag", "Enable Fake Lag"):SetBool(true)
        end
   
        g_Config:FindVar("Aimbot", "Anti Aim", "Fake Lag", "Enable Fake Lag"):SetBool(true)

        if (c_menu_doubletap_debug_mode:GetBool()) then
        print("[DOUBLETAP] TICKS: SONIC | PRESERVE: -1 | CORRECTION: DISABLED ")
        end
    else
        g_Config:FindVar("Aimbot", "Anti Aim", "Fake Lag", "Enable Fake Lag"):SetBool(true)
    end
    end
    end
    end   
end

local function air_stuck(cmd)

    if c_menu_air_stuck:GetBool() then --Air stuck xDDD
        cmd.tick_count = 0x7FFFFFFF
        cmd.command_number = 0x7FFFFFFF
    end

end
--EXPLOITS

--FAKELAG

local function adaptive_fakelag()
    local local_idx = g_EngineClient:GetLocalPlayer()
    local local_entity = g_EntityList:GetClientEntity(local_idx)
    local sent_packets_num = fakelag.SentPackets()
    local oldOrigin
    if local_entity == nil then
      return
    end
    local is_key_pressed = cheat.IsKeyDown(0x45)
    local local_player = local_entity:GetPlayer();
    local wish_ticks = 0
    local adaptive_ticks = 2
    local speed_x = local_player:GetProp("DT_BasePlayer", "m_vecVelocity[0]")
    local GetAbsOrigin = local_player:GetProp("DT_BasePlayer", "m_vecAbsOrigin")
    local speed_y = local_player:GetProp("DT_BasePlayer", "m_vecVelocity[1]")
    local speed_per_tick = math.sqrt(speed_x * speed_x + speed_y * speed_y) *  g_GlobalVars.interval_per_tick
 
    while (wish_ticks * speed_per_tick) <= 68.0 do
        if (((adaptive_ticks - 1) * speed_per_tick) > 68.0) then
          wish_ticks = wish_ticks + 1;
          break
        end
        
        if ((adaptive_ticks * speed_per_tick) > 68.0) then
          wish_ticks = wish_ticks + 2;
          break
        end
        
        if ((adaptive_ticks + 1) * speed_per_tick) > 68.0 then
          wish_ticks = wish_ticks + 3;
          break
        end
        
        if ((adaptive_ticks + 2) * speed_per_tick) > 68.0 then
          wish_ticks = wish_ticks + 4;
          break
        end
        
        adaptive_ticks = adaptive_ticks + 5;
        wish_ticks = wish_ticks + 5;
   
        if adaptive_ticks > 15 then
          break
        end
    end

    local weapon = local_player:GetActiveWeapon();
    if weapon ~= nil then
      if weapon:GetWeaponID() == 64 then
        if wish_ticks > 15  then
          wish_ticks = 15
        end
      end
    end
    if is_key_pressed then
        fakelag.SetState(false)
    end
    if g_ClientState.m_choked_commands < wish_ticks then
      fakelag.SetState(false)
    end
end

local function fluctuate_fakelag()
    
    local random1 = 0
    local random2 = 0
    local used = false

    if used then 
        random1 = math.random(1, c_menu_fakelag_fluctuate_timing:GetFloat())
        used = false
    else
        random1 = math.random(1, c_menu_fakelag_fluctuate_timing:GetFloat())
        used = true
    end

    if random1 == 1 then 
        menu_fakelag_limit:SetInt(0)
        
    else
        menu_fakelag_limit:SetInt(15)
    end 
    
end

local last = 0
local state = true
local function leg_fucker()
    local cur = g_GlobalVars.curtime
    local local_player = g_EntityList:GetClientEntity(g_EngineClient:GetLocalPlayer())
    local player = local_player:GetPlayer()

    if (c_menu_exploits_legs:GetBool()) then
     menu_leg_movement:SetInt(utils.RandomInt(1, 2))
    end
end

local function fake_lag()
    local local_idx = g_EngineClient:GetLocalPlayer()
    local local_entity = g_EntityList:GetClientEntity(local_idx)
    local local_player = local_entity:GetPlayer();

    if (c_menu_fakelag_modes:GetInt()) == 0 and dt_charging == false then --adaptive fakelag (AIMWARE_PASTED)
        adaptive_fakelag()
    
    else if (c_menu_fakelag_modes:GetInt()) == 1 then --fluctuate fakelag 
        fluctuate_fakelag()
    end 
end   
end
--FAKELAG

--VISUALS


local font1 = g_Render:InitFont("Verdana", 55)

local get_screen = g_EngineClient:GetScreenSize()
local FPLx = Vector2.new((get_screen.x /2) - 54, (get_screen.y /2) + 30)
local FPLy = Vector2.new((get_screen.x /2) - 30, (get_screen.y /2) + 56)
local FPLz = Vector2.new((get_screen.x /2) - 51, (get_screen.y /2) + 55)
local FPRx = Vector2.new((get_screen.x /2) + 54, (get_screen.y /2) + 30)
local FPRy = Vector2.new((get_screen.x /2) + 30, (get_screen.y /2) + 56)
local FPRz = Vector2.new((get_screen.x /2) + 51, (get_screen.y /2) + 55)
local FPLxx = Vector2.new((get_screen.x /2) - 56, (get_screen.y /2) + 29)
local FPLyy = Vector2.new((get_screen.x /2) - 32, (get_screen.y /2) + 55)
local FPLzz = Vector2.new((get_screen.x /2) - 53, (get_screen.y /2) + 54)
local FPRxx = Vector2.new((get_screen.x /2) + 53, (get_screen.y /2) + 29)
local FPRyy = Vector2.new((get_screen.x /2) + 29, (get_screen.y /2) + 55)
local FPRzz = Vector2.new((get_screen.x /2) + 50, (get_screen.y /2) + 54)
local LPx = Vector2.new((get_screen.x /2) - 43, (get_screen.y /2) + 13)
local LPy = Vector2.new((get_screen.x /2) - 43, (get_screen.y /2) - 7)
local LPz = Vector2.new((get_screen.x /2) - 63, (get_screen.y /2) + 3)
local RPx = Vector2.new((get_screen.x /2) + 42, (get_screen.y /2) + 13)
local RPy = Vector2.new((get_screen.x /2) + 42, (get_screen.y /2) - 7)
local RPz = Vector2.new((get_screen.x /2) + 62, (get_screen.y /2) + 3)
local LPxx = Vector2.new((get_screen.x /2) - 42, (get_screen.y /2) + 14)
local LPyy = Vector2.new((get_screen.x /2) - 42, (get_screen.y /2) - 6)
local LPzz = Vector2.new((get_screen.x /2) - 62, (get_screen.y /2) + 4)
local RPxx = Vector2.new((get_screen.x /2) + 42, (get_screen.y /2) + 14)
local RPyy = Vector2.new((get_screen.x /2) + 42, (get_screen.y /2) - 6)
local RPzz = Vector2.new((get_screen.x /2) + 62, (get_screen.y /2) + 4)
local BPx = Vector2.new((get_screen.x /2) + 9, (get_screen.y /2) + 47)
local BPy = Vector2.new((get_screen.x /2) - 11, (get_screen.y /2) + 47)
local BPz = Vector2.new((get_screen.x /2) - 1, (get_screen.y /2) + 67)
local BPxx = Vector2.new((get_screen.x /2) + 10, (get_screen.y /2) + 48)
local BPyy = Vector2.new((get_screen.x /2) - 10, (get_screen.y /2) + 48)
local BPzz = Vector2.new((get_screen.x /2), (get_screen.y /2) + 68)
local function indicators_visuals()

    local color_inactive2 = Color.new(0 / 255, 0 / 255 ,0 / 255, 150 / 255)
    local get_screen = g_EngineClient:GetScreenSize()
    local pos_start = Vector2.new(1010,get_screen.y -  558) 
    local text_size = 35
    local pos_add = Vector2.new(0, text_size)
    local cur_pos = 0
    local pos_start1 = Vector2.new(900,get_screen.y -  558) 
    local cur_pos1 = 0 
    if (c_menu_arrows_type:GetInt() == 2 and c_menu_arrows:GetBool()) then  

    g_Render:PolyFilled(color_inactive2, LPxx, LPyy, LPzz)
    g_Render:PolyFilled(color_inactive2, RPxx, RPyy, RPzz)
    g_Render:PolyFilled(color_inactive2, BPxx, BPyy, BPzz)

    if (menu_invert_side:GetBool()) then
        g_Render:PolyFilled(c_menu_arrow_color:GetColor(), FPRxx, FPRyy, FPRzz)
    end
    if (not menu_invert_side:GetBool()) then
        g_Render:PolyFilled(c_menu_arrow_color:GetColor(), FPLxx, FPLyy, FPLzz)
    end
    if menu_antiaim_manual:GetInt()==1 then
         g_Render:PolyFilled(c_menu_arrow_color:GetColor(), BPx, BPy, BPz) -- backwards
    elseif  menu_antiaim_manual:GetInt()==2 then
        g_Render:PolyFilled(c_menu_arrow_color:GetColor(), RPx, RPy, RPz) -- right

    elseif  menu_antiaim_manual:GetInt()==3 then
        g_Render:PolyFilled(c_menu_arrow_color:GetColor(), LPx, LPy, LPz) -- left

    end
end
if (c_menu_arrows_type:GetInt() == 3 and c_menu_arrows:GetBool()) then  

g_Render:CirclePart(Vector2.new(960.0, 541), 20.0, 58, Color.new(0, 0, 0, 100 / 255), math.rad(0), math.rad(360), 5.0)
 
if (menu_invert_side:GetBool()) then
    g_Render:CirclePart(Vector2.new(960.0, 541), 20.0, 58, c_menu_arrow_color:GetColor(), math.rad(810.3), math.rad(630.3), 5.0)
end
if (not menu_invert_side:GetBool()) then
    g_Render:CirclePart(Vector2.new(960.0, 541), 20.0, 58, c_menu_arrow_color:GetColor(), math.rad(90), math.rad(270), 5.0)
end
end

  local function GetColorFromBoolArrow(val)
     return val and c_menu_arrow_color:GetColor() or c_menu_arrow_color:GetColor() 
  end
  
  local function arrow(str, val)
    g_Render:Text(str, cur_pos,  GetColorFromBoolArrow(val),  text_size, font1)
    cur_pos = cur_pos - pos_add
  end
  local function arrow2(str, val)
    g_Render:Text(str, cur_pos1,  GetColorFromBoolArrow(val),  text_size, font1)
    cur_pos1 = cur_pos1 - pos_add
  end

  cur_pos = pos_start
  cur_pos1 = pos_start1

  if (c_menu_arrows_type:GetInt() == 0) then
  if c_menu_arrows:GetBool() and menu_invert_side:GetBool() then
      arrow(")", c_menu_arrows:GetBool() )
  end 
  if c_menu_arrows:GetBool() and not menu_invert_side:GetBool() then
      arrow2("(", c_menu_arrows:GetBool() )
  end 
end

if (c_menu_arrows_type:GetInt() == 1) then
    if c_menu_arrows:GetBool() and menu_invert_side:GetBool() then
        arrow(">", c_menu_arrows:GetBool() )
    end 
    if c_menu_arrows:GetBool() and not menu_invert_side:GetBool() then
        arrow2("<", c_menu_arrows:GetBool() )
    end 
  end
  
end

    

--VISUALS

--MISC


local function kill_say_function(event)

local words_kill = c_menu_kill_say_words:GetString()
local words_hurt = c_menu_hurt_say_words:GetString()

    if event:GetName() == "player_death" then

        local victim = g_EngineClient:GetPlayerForUserId(event:GetInt("userid"))
        local attacker = g_EngineClient:GetPlayerForUserId( event:GetInt("attacker"))

        if victim ~= attacker and attacker == g_EngineClient:GetLocalPlayer() and c_menu_kill_say:GetBool() then
            g_EngineClient:ExecuteClientCmd('say ' .. words_kill)
        end

    else if event:GetName() == "player_hurt" then

        local victim = g_EngineClient:GetPlayerForUserId(event:GetInt("userid"))
        local attacker = g_EngineClient:GetPlayerForUserId( event:GetInt("attacker"))

        if victim ~= attacker and attacker == g_EngineClient:GetLocalPlayer() and c_menu_hurt_say:GetBool() then
            g_EngineClient:ExecuteClientCmd('say ' .. words_hurt)
        end
    end
end
end



--MISC

--ANTIAIM
local function vec_distance(vec_one, vec_two)

    local delta_x, delta_y, delta_z = vec_one.x - vec_two.x, vec_one.y - vec_two.y

    return math.sqrt(delta_x * delta_x + delta_y * delta_y)

end

local function get_closest_enemy()
    local best_dist = c_menu_anti_brute_fov_slider:GetFloat()
    local best_enemy = nil
    local local_player = g_EntityList:GetClientEntity(g_EngineClient:GetLocalPlayer())
    local local_origin = local_player:GetProp("DT_BaseEntity", "m_vecOrigin")
    local local_screen_orig = g_Render:ScreenPosition(local_origin)
    local screen = g_EngineClient:GetScreenSize()

    for idx = 1, g_GlobalVars.maxClients + 1 do
        local ent = g_EntityList:GetClientEntity(idx)
        if ent and ent:IsPlayer() then
            local player = ent:GetPlayer()
            local health = player:GetProp("DT_BasePlayer", "m_iHealth")

            if not player:IsTeamMate() and health > 0 and not player:IsDormant() then
                local origin = ent:GetProp("DT_BaseEntity", "m_vecOrigin")
                local screen_orig = g_Render:ScreenPosition(origin)
                local temp_dist = vec_distance(Vector2.new(screen.x / 2, screen.y / 2), screen_orig)

                if(temp_dist < best_dist) then
                    best_dist = temp_dist
                    best_enemy = ent
                end
            end
        end
    end

    return best_enemy
end

local function AA_Anti_Brute_Force(e)

      if e:GetName() == "weapon_fire" and c_menu_anti_brute:GetBool() then --Weapon Fire event later we run FOV check so we can make sure the bullet is on our direction!
        local user_id = e:GetInt("userid", -1)
        local user = g_EntityList:GetClientEntity(g_EngineClient:GetPlayerForUserId(user_id)) --Get Enemy Entity
        local local_player = g_EntityList:GetClientEntity(g_EngineClient:GetLocalPlayer()) --Get Local Entity
        local player = local_player:GetPlayer()
        local health = player:GetProp("DT_BasePlayer", "m_iHealth")
       

        if(health > 0) then -- if our local player is alive we run the AntiBrute Logic!
          
            local closest_enemy = get_closest_enemy() --Get Closest enemy based on distance 
            if(closest_enemy ~= nil and user:EntIndex() == closest_enemy:EntIndex()) then 
              miss_counter = miss_counter + 1 --Basic so we calculate missed shots of enemy also some checks so if we get hit don't run the code!
             
                 if (miss_counter % 3 == 0) then --Logic 1
                  
                    menu_left_limit:SetInt(c_menu_anti_brute_1stshot:GetInt())
                    menu_invert_side:SetBool(true)    
                    left_side = true                   
                    if (c_menu_anti_brute_debug_mode:GetBool()) then
                        print("[ANTI-BRUTE] Angle overrided to (" .. c_menu_anti_brute_1stshot:GetInt() .. ") [INFO: PASST 3RD SIDE | NEXT ANGLE = (" .. c_menu_anti_brute_2ndshot:GetInt() ..") INVERTER:TRUE]" )
                    end
                else if (miss_counter % 3 == 1) then --Logic 2 
                    menu_right_limit:SetInt(c_menu_anti_brute_2ndshot:GetInt())
                    menu_invert_side:SetBool(false)
                    right_side = true
                    if (c_menu_anti_brute_debug_mode:GetBool()) then
                        print("[ANTI-BRUTE] Angle overrided to (" .. c_menu_anti_brute_2ndshot:GetInt() .. ") [INFO: PASST 1ST SIDE | NEXT ANGLE = (" .. c_menu_anti_brute_3rdshot:GetInt() ..") INVERTER:FALSE]" )
                    end

                else if (miss_counter % 3 == 2) then --Logic 3
                    menu_right_limit:SetInt(c_menu_anti_brute_3rdshot:GetInt())
                    menu_left_limit:SetInt(c_menu_anti_brute_3rdshot:GetInt())
         
                    ideal_yaw = true
                    if (c_menu_anti_brute_debug_mode:GetBool()) then
                        print("[ANTI-BRUTE] Angle overrided to (" .. c_menu_anti_brute_3rdshot:GetInt() .. ") [INFO: PASST 2ND SIDE | NEXT ANGLE = (" .. c_menu_anti_brute_1stshot:GetInt() ..") INVERTER:TRUE]" )
                    end
                end
                end
                end
            end
        end
    end
end
--ANTIAIM

--IND

local function text_indicators()

    local clr_green = Color.new(146.1, 255.1, 36.1, 0.9)
    local clr_orange = Color.new(255.1, 183.1, 0.1, 0.9)
    local clr_red = Color.new(255, 0, 0)
    local clr_blue = Color.new(36.1, 164.1, 255.1, 255.9)
    local screen = g_EngineClient:GetScreenSize()
    local pos_start = Vector2.new(c_menu_x:GetFloat(),screen.y -  c_menu_y:GetFloat())
    local text_size = 13
    local pos_add = Vector2.new(0, text_size)
    local cur_pos = Vector2.new(0, 0) -- current frame
    
    -------------------------------------------------------------FAKEDUCK
    local function GetColorFromBool(val)
        return val and clr_green or clr_red
    end
    
    local function RenderIndicator(str, val)
        g_Render:Text(str, cur_pos,  GetColorFromBool(val),  text_size, true)
        cur_pos = cur_pos - pos_add
    end
    
    -------------------------------------------------------------DOUBLETAP
    local function dtchargeind(str, r,g,b)
        g_Render:Text(str, cur_pos, Color.new(r,g,b),text_size, true)
        cur_pos = cur_pos - pos_add 
    end
    -------------------------------------------------------------------------------

     local ideal_ind_clr = Color.new(230 / 255, 184 / 255, 0 / 255, 0.9)

     local function ideal_indclr(val)
	    return val and ideal_ind_clr or ideal_ind_clr
     end

     local function ideal_ind(str, val)
	    g_Render:Text(str, cur_pos,  ideal_indclr(val),  text_size, true)
	    cur_pos = cur_pos - pos_add
    end

    local function GetColorFromBool1(val)
        return val and clr_red or clr_red
    end
    
    local function RenderIndicator1(str, val)
        g_Render:Text(str, cur_pos,  GetColorFromBool1(val),  text_size, true)
        cur_pos = cur_pos - pos_add
    end
  -------------------------------------------------------------
local prefer_color = Color.new(208 / 255, 187 / 255, 252 / 255, 0.9)
local function prefersafebool(val)
	return val and prefer_color or prefer_color
end

local function prefersafe(str, val)
	g_Render:Text(str, cur_pos,  prefersafebool(val),  text_size)
	cur_pos = cur_pos - pos_add
end
-------------------------------------------------------------------------------
-------------------------------------------------------------------------------- 
    cur_pos = pos_start
    
    if c_menu_text_indicators:GetBool() then
       

        if exploits.GetCharge() ~= 1  then
            dt_charging = false
           dtchargeind("DT", 255, 0,0)
        else
            dt_charging = true
           dtchargeind("DT", 146 / 255, 255 / 255, 36 / 255, 0.9) 
        end
      
        if menu_fakeduck:GetBool()  then --FD
            RenderIndicator("FD", menu_fakeduck:GetBool() )
        end
        if (ideal_yaw == true) then
            ideal_ind("IDEAL YAW")
        end
        
          prefersafe("PREDICTION")

          if (menu_safe_point:GetInt() > 0) then
            prefersafe("SAFETY")
          end
        if not menu_invert_side:GetBool() then
            RenderIndicator1("LEFT")
        end
        if (menu_invert_side:GetBool()) then
            RenderIndicator1("RIGHT")
        end
    end
 end       
    
    
        
    

--IND



local function watermarker() 
    g_Render:GradientBoxFilled(Vector2.new(1569.0, 30.0), Vector2.new(1918.0, 2.0), Color.new(0, 0, 0, 2 / 255), Color.new(0, 0, 0, 255 / 255), Color.new(0, 0, 0, 2 / 255), Color.new(0, 0, 0, 255 / 255))
    g_Render:Text("test lua", Vector2.new(1820.0, 9.0), Color.new(1.0, 1.0, 1.0, 1.0), 13, false)
    g_Render:Text("Welcome " .. username, Vector2.new(1599.3, 9.0), Color.new(1.0, 1.0, 1.0, 1.0), 14, false)
    g_Render:Text("[ALPHA BUILD] ", Vector2.new(1705.3, 9.0), Color.new(1.0, 1.0, 1.0, 1.0), 14, false)

end

--CALLBACKS
local function draw()
    local localplayer = g_EntityList:GetClientEntity(g_EngineClient:GetLocalPlayer())
    if localplayer then
        localplayer = localplayer:GetPlayer()
    else
        return
    end
    if (g_EngineClient:IsConnected()) then
        if (c_menu_watermarker:GetBool()) then
            watermarker()
        end

    end
    if localplayer:m_iHealth() > 0 then
        aimbot_draw()
        indicators_visuals()
        text_indicators()
        if (c_menu_custom_impacts:GetBool()) then
            draw_impacts()
        end
    end    


end
local function pre_prediction(cmd)

    
    air_stuck(cmd)
    --aimbot(cmd)
    instant_recharge()
    fake_lag()


end
local function prediction()
    body_lean()
  
end
local function createmove()
    antiaim_helpers()
    exploits_func()
    leg_fucker()
  

end
local function events(e)
    
    kill_say_function(e)
    AA_Anti_Brute_Force(e)
    impacts_events(e)
  

end

cheat.RegisterCallback("draw", draw)
cheat.RegisterCallback("pre_prediction", pre_prediction)
cheat.RegisterCallback("prediction", prediction)
cheat.RegisterCallback("createmove", createmove)
cheat.RegisterCallback("events", events)

end

if buff == "" then
    local textbox = menu.TextBox("Init", "Username", 64, "", "What username do you want to use?")
    local button = menu.Button("Init", "Confirm")

    --local done

    button:RegisterCallback(function()
        --if done == true then return end
        --done = true
        ffi.C.WriteFile(pfile, ffi.cast("char*", textbox:GetString()), #textbox:GetString(), nil, 0)
        username = textbox:GetString()
        menu.DestroyItem(textbox)
        menu.DestroyItem(button)
        initlua()
	end)
else
    local textbox = menu.TextBox("Init", "Username", 64, "", "What username do you want to use?")
        local button = menu.Button("Init", "Confirm")
        menu.DestroyItem(textbox)
        menu.DestroyItem(button)
    initlua()
end

--CALLBACKS