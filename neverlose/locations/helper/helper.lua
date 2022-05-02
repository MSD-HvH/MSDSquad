local ffi = require("ffi")
local g_entity_list = utils.CreateInterface("client.dll", "VClientEntityList003")
local g_model_infot = utils.CreateInterface("engine.dll", "VModelInfoClient004")
local g_client_string = utils.CreateInterface("engine.dll","VEngineClientStringTable001")
local FRAME_NET_UPDATE_POSTDATAUPDATE_START = 2
local FRAME_RENDER_START = 5
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
             void* lpOverlapped
        );

   unsigned long GetFileSize(
        void*  hFile,
        unsigned long* lpFileSizeHigh
   );
   bool CreateDirectoryA(
        const char*                lpPathName,
        void* lpSecurityAttributes
   );
   void* CloseHandle(void *hFile);
   typedef int(__fastcall* clantag_t)(const char*, const char*);

   typedef struct _OVERLAPPED {
        unsigned long* Internal;
        unsigned long* InternalHigh;
        union {
             struct {
             unsigned long Offset;
             unsigned long OffsetHigh;
             } DUMMYSTRUCTNAME;
             void* Pointer;
        } DUMMYUNIONNAME;
        void*    hEvent;
        } OVERLAPPED, *LPOVERLAPPED;

   typedef struct _class
   {
        void** this;
   }aclass;



    typedef void*(__thiscall* get_client_entity_t)(void*, int);
    typedef void(__thiscall* find_or_load_model_fn_t)(void*, const char*);
    typedef const int(__thiscall* get_model_index_fn_t)(void*, const char*);
    typedef const int(__thiscall* add_string_fn_t)(void*, bool, const char*, int, const void*);
    typedef void*(__thiscall* find_table_t)(void*, const char*);
    typedef void(__thiscall* full_update_t)();
    typedef int(__thiscall* get_player_idx_t)();
    typedef void*(__thiscall* get_client_networkable_t)(void*, int);
    typedef void(__thiscall* pre_data_update_t)(void*, int);
]]
ffi.C.CreateDirectoryA("nl\\GrenadeHelper", nil)
ffi.C.CreateDirectoryA("nl\\MovementHelper", nil)

--local full_update_ptr = utils.PatternScan("engine.dll", "A1 ? ? ? ? B9 ? ? ? ? 56 FF 50 14 8B 34 85")
--local full_update = ffi.cast("full_update_t", full_update_ptr)
local ientitylist = ffi.cast(ffi.typeof("void***"), g_entity_list) or error("rawientitylist is nil", 2)
local get_client_entity = ffi.cast("get_client_entity_t", ientitylist[0][3]) or error("get_client_entity is nil", 2)
local g_model_info = ffi.cast(ffi.typeof("void***"), g_model_infot) or error("model info is nil", 2)
local get_model_index_fn = ffi.cast("get_model_index_fn_t", g_model_info[0][2]) or error("Getmodelindex is nil", 2)
local find_or_load_model_fn = ffi.cast("find_or_load_model_fn_t", g_model_info[0][43]) or error("findmodel is nil", 2)
local clientstring = ffi.cast(ffi.typeof("void***"), g_client_string) or error("clientstring is nil", 2)
local find_table = ffi.cast("find_table_t", clientstring[0][3]) or error("find table is nil", 2)
local get_client_networkable = ffi.cast("get_client_networkable_t", ientitylist[0][0]) or error("get networkable is nil", 2)



local function precache(path)
    local precachetable = ffi.cast(ffi.typeof("void***"), find_table(clientstring, "modelprecache"))
    if precachetable~= nil then
        find_or_load_model_fn(g_model_info, path)
        local addstring = ffi.cast("add_string_fn_t", precachetable[0][8]) or error("addstring nil", 2)
        local add_string_to_path = addstring(precachetable, false, path, -1, nil)
        if add_string_to_path == -1 then print("failed")
            return false
        end
    end
    return true
end







local clantag = menu.Switch("Misc", "Clan Tag", false, "enable")
local fn_change_clantag = utils.PatternScan("engine.dll", "53 56 57 8B DA 8B F9 FF 15")
local set_clantag = ffi.cast("clantag_t", fn_change_clantag)

local animation = {
"G",
"Gt",
"Gt_",
"Gt_A",
"Gt_An",
"Gt_Ant",
"Gt_Anti",
"Gt_Antia",
"Gt_Antiai",
"Gt_Antiaim",
"Gt_Antiaim_",
"Gt_Antiaim_Y",
"Gt_Antiaim_Ya",
"Gt_Antiaim_Yaw",
"Gt_Antiaim_Yaw ",
"Gt_Antiaim_Yaw",
"Gt_Antiaim_Ya",
"Gt_Antiaim_Y",
"Gt_Antiaim_",
"Gt_Antiaim",
"Gt_Antiai",
"Gt_Antia",
"Gt_Anti",
"Gt_Ant",
"Gt_An",
"Gt_A",
"Gt_",
"Gt",
"G",
"",
}
local old_time = 3








local skin_colors = menu.Combo("Skin Color", "Color", {"White", "Black", "Brown", "Asia", "Mexico", "Tatto"}, 0)
local skin_color = g_CVar:FindVar("r_skin")
local skin_choice = 0

local image_size = Vector2.new(1046 / 5, 1270 / 5)
local url = "https://i.imgur.com/t9xUvtr.png"
local bytes = http.Get(url)
local image_loaded = g_Render:LoadImage(bytes, image_size)
local premium_img = menu.Switch("Misc", "Premium Stuff$$$", false, "enable")




local screen_size = g_EngineClient:GetScreenSize() -- get the screen size
local ctx = screen_size.x / 2    -- getting center x and y by dividing screen_size to 2--
local cty = screen_size.y/2

local color_active      = Color.new(0, 1, 0, 1) -- The color we use for rendering if the keybind is active
local color_inactive    = Color.new(1, 0, 0, 1) -- The color we use for rendering if the keybind is inactive
local render_position   = Vector2.new(ctx, cty+10)  -- The position our indicators will be rendered at
local render_indicators = menu.Switch("Misc", "Indicators", false, "enable")



local custom_models = menu.Switch("Advanced", "Enable Custom Models", false)
local custom_path = menu.TextBox("Advanced", "Model Path", 128, "Path", "needs to be precise")
--local megumin_arms = menu.Switch("Advanced", "Megumin Arms", false)


local paths = {
-- leet
"models/player/custom_player/legacy/tm_leet_variantf.mdl",
"models/player/custom_player/legacy/tm_leet_varianti.mdl",
"models/player/custom_player/legacy/tm_leet_varianth.mdl",
"models/player/custom_player/legacy/tm_leet_variantg.mdl",

-- fbi
"models/player/custom_player/legacy/ctm_fbi_variantb.mdl",
"models/player/custom_player/legacy/ctm_fbi_varianth.mdl",
"models/player/custom_player/legacy/ctm_fbi_variantg.mdl",
"models/player/custom_player/legacy/ctm_fbi_variantf.mdl",

-- st6
"models/player/custom_player/legacy/ctm_st6_variante.mdl",
"models/player/custom_player/legacy/ctm_st6_variantm.mdl",
"models/player/custom_player/legacy/ctm_st6_variantg.mdl",
"models/player/custom_player/legacy/ctm_st6_variantk.mdl",
"models/player/custom_player/legacy/ctm_st6_varianti.mdl",
"models/player/custom_player/legacy/ctm_st6_variantj.mdl",
"models/player/custom_player/legacy/ctm_st6_variantl.mdl",

-- swat
"models/player/custom_player/legacy/ctm_swat_variante.mdl",
"models/player/custom_player/legacy/ctm_swat_variantf.mdl",
"models/player/custom_player/legacy/ctm_swat_variantg.mdl" ,
"models/player/custom_player/legacy/ctm_swat_varianth.mdl",
"models/player/custom_player/legacy/ctm_swat_varianti.mdl",
"models/player/custom_player/legacy/ctm_swat_variantj.mdl",

-- balkan
"models/player/custom_player/legacy/tm_balkan_varianti.mdl",
"models/player/custom_player/legacy/tm_balkan_variantf.mdl",
"models/player/custom_player/legacy/tm_balkan_varianth.mdl",
"models/player/custom_player/legacy/tm_balkan_variantg.mdl",
"models/player/custom_player/legacy/tm_balkan_variantj.mdl",
"models/player/custom_player/legacy/tm_balkan_variantk.mdl",
"models/player/custom_player/legacy/tm_balkan_variantl.mdl",

-- sas
"models/player/custom_player/legacy/ctm_sas_variantf.mdl",

-- phoenix
"models/player/custom_player/legacy/tm_phoenix_varianth.mdl",
"models/player/custom_player/legacy/tm_phoenix_variantf.mdl",
"models/player/custom_player/legacy/tm_phoenix_variantg.mdl",
"models/player/custom_player/legacy/tm_phoenix_varianti.mdl",

-- proffesional
"models/player/custom_player/legacy/tm_professional_varf.mdl",
"models/player/custom_player/legacy/tm_professional_varf1.mdl",
"models/player/custom_player/legacy/tm_professional_varf2.mdl",
"models/player/custom_player/legacy/tm_professional_varf3.mdl",
"models/player/custom_player/legacy/tm_professional_varf4.mdl",
"models/player/custom_player/legacy/tm_professional_varg.mdl",
"models/player/custom_player/legacy/tm_professional_varh.mdl",
"models/player/custom_player/legacy/tm_professional_vari.mdl",
"models/player/custom_player/legacy/tm_professional_varj.mdl",
}



local names = {
-- leet
"The Elite Mr. Muhlik | Elite Crew",
"Prof. Shahmat | Elite Crew",
"Osiris | Elite Crew",
"Ground Rebel | Elite Crew",

-- fbi
"Special Agent Ava | FBI",
"Michael Syfers | FBI Sniper",
"Markus Delrow | FBI HRT",
"Operator | FBI SWAT",

-- st6
"Seal Team 6 Soldier | NSWC SEAL",
"'Two Times' McCoy | USAF TACP",
"Buckshot | NSWC SEAL",
"3rd Commando Company | KSK",
"Lt. Commander Ricksaw | NSWC SEAL",
"'Blueberries' Buckshot | NSWC SEAL",
"'Two Times' McCoy | TACP Cavalry",

-- swat
"Cmdr. Mae 'Dead Cold' Jamison | SWAT",
"1st Lieutenant Farlow | SWAT",
"John 'Van Healen' Kask | SWAT",
"Bio-Haz Specialist | SWAT",
"Sergeant Bombson | SWAT",
"Chem-Haz Specialist | SWAT",

-- balkan
"Maximus | Sabre",
"Dragomir | Sabre",
"'The Doctor' Romanov | Sabre",
"Rezan The Ready | Sabre",
"Blackwolf | Sabre",
"Rezan the Redshirt | Sabre",
"Dragomir | Sabre Footsoldier",

-- sas
"B Squadron Officer | SAS",

-- phoenix
"Soldier | Phoenix",
"Enforcer | Phoenix",
"Slingshot | Phoenix",
"Street Soldier | Phoenix",

-- proffesional
"Sir Bloody Miami Darryl | The Professionals",
"Sir Bloody Silent Darryl | The Professionals",
"Sir Bloody Skullhead Darryl | The Professionals",
"Sir Bloody Darryl Royale | The Professionals",
"Sir Bloody Loudmouth Darryl | The Professionals",
"Safecracker Voltzmann | The Professionals",
"Little Kev | The Professionals",
"Number K | The Professionals",
"Getaway Sally | The Professionals",

}

local agent_menu = menu.Combo("agent", "Agent", names, 0)

cheat.RegisterCallback("frame_stage", function(stage)

    --if stage ~= FRAME_NET_UPDATE_POSTDATAUPDATE_START and stage ~= FRAME_RENDER_START then return end-- todo:figure out why this causes crashes
 
    local local_player = g_EntityList:GetClientEntity(g_EngineClient:GetLocalPlayer())
    if local_player == nil
        then return
    end

 
    local player_address = get_client_entity(ientitylist, g_EngineClient:GetLocalPlayer())
    local index = local_player:GetProp("DT_BaseEntity", "m_nModelIndex")
    local newpath = string.gsub(custom_path:GetString(), [[\]], [[/]]) --to get rid of c escape sequences before passing string to ffi, doesn't seem to matter, but lets do it anyways
    if custom_models:GetBool() then
        if precache(newpath) then
            local model_idx = get_model_index_fn(g_model_info, newpath)
            if model_idx ~= -1 and model_idx ~= index then
                local_player:SetModelIndex(model_idx)
            end
        end

    else
        local model_idx = get_model_index_fn(g_model_info, paths[agent_menu:GetInt() + 1])
        if model_idx ~= index then
        local_player:SetModelIndex(model_idx)
        end
    end
 
end)




local menu_elements =
{
     autostrafe = g_Config:FindVar("Miscellaneous", "Main", "Movement", "Auto Strafe"),
     autostrafe_smooth = g_Config:FindVar("Miscellaneous", "Main", "Movement", "Smoothing"),
     thirdpeson = g_Config:FindVar("Visuals", "View", "Thirdperson", "Enable Thirdperson"),

     fake_angle = g_Config:FindVar("Aimbot", "Anti Aim", "Fake Angle", "Enable Fake Angle"),
     double_tap = g_Config:FindVar("Aimbot", "Ragebot", "Exploits", "Double Tap"),
     fakelag = g_Config:FindVar("Aimbot", "Anti Aim", "Fake Lag", "Enable Fake Lag"),
}
local lua_elements =
{
     nade_helper = menu.Switch("Grenade Helper", "Helper Bind", false),
     nade_helper_nades = menu.MultiCombo("Grenade Helper", "Nades", {"HeGrenade", "Molotov", "Smoke", "FlashBang"}, 0),
     nade_helper_types = menu.MultiCombo("Grenade Helper", "Presets", {"Original", "Custom: Alpha", "Custom: Bravo", "Custom: Charlie", "Custom: Delta", "Custom: Echo", "Custom: Foxtrot", "Custom: Golf", "Custom: Hotel", "Custom: India", "Custom: Juliet"}, 0),
     nade_helper_fov = menu.SliderInt("Grenade Helper", "FOV", 15, 1, 160),

     create_nade = menu.Button("Grenade Constructor", "Create Nade"),

     pitch_slider = menu.SliderFloat("Grenade Constructor", "Pitch", 0, -89, 89),
     yaw_slider = menu.SliderFloat("Grenade Constructor", "Yaw", 0, -180, 180),
     throw_strengh = menu.SliderFloat("Grenade Constructor", "Throw Strength", 100, 0, 100),

     properties = menu.MultiCombo("Grenade Constructor", "Properies", {"Run", "Jump", "Duck"}, 0),

     run_duration = menu.SliderInt("Grenade Constructor", "Run Duration", 0, 0, 64),
     run_velocity = menu.SliderFloat("Grenade Constructor", "Run Velocity", 0, 0, 450),
     run_direction = menu.Combo("Grenade Constructor", "Run Direction", {"Forward", "Backward", "Left", "Right"}, 0),
     extend_forward_strenght = menu.Switch("Grenade Constructor", "Extern Forward Strength", false),
     backup_direction = menu.Combo("Grenade Constructor", "Backup Direction", {"None", "Forward", "Backward", "Left", "Right"}, 0),
     backup_strafe_duration = menu.SliderInt("Grenade Constructor", "Backup Duration", 1, 1, 64),

     jump_duration = menu.SliderInt("Grenade Constructor", "Jump Delay", 0, 0, 64),
     jump_thresthold = menu.SliderInt("Grenade Constructor", "Jump Strength", 0, 0, 6),

     nade_name = menu.TextBox("Grenade Constructor", "Position Name", 64, ""),
     nade_description = menu.TextBox("Grenade Constructor", "Description", 64, ""),

     nade_teleport = menu.Button("Grenade Constructor", "Teleport to Location"),
     nade_update_pos_ang = menu.Button("Grenade Constructor", "Set new Location"),

     save_nade_cfg = menu.Combo("Grenade Constructor", "Save At", {"Custom: Alpha", "Custom: Bravo", "Custom: Charlie", "Custom: Delta", "Custom: Echo", "Custom: Foxtrot", "Custom: Golf", "Custom: Hotel", "Custom: India", "Custom: Juliet"}, 0),
     save_nade = menu.Button("Grenade Constructor", "Confirm"),
     remove_nade = menu.Button("Grenade Constructor", "Decline"),

     nade_helper_theme = menu.Combo("Main", "Theme", {"Dark Blue", "Light", "Dark"}, 0),

     user_name = cheat.GetCheatUserName(),
     screensize = g_EngineClient:GetScreenSize(),
}

local ragebot_helpers =
{
     DisableTargets = function(self)
          for i = 1, 64 do
               ragebot.IgnoreTarget(i)
          end
     end,

     ForceHead = function(self, index)
          for i = 1, 64 do
               if(i ~= index) then
                    ragebot.IgnoreTarget(i)
               else
                    for j = 2, 18 do
                         ragebot.EnableHitbox(i, j, false)
                    end
               end
          end
     end,
}
local math_helpers =
{
     normalizeangles = function(self, ang)
          if(ang.pitch > 180.0) then ang.pitch = ang.pitch - 360.0 end
          if(ang.yaw > 180.0) then ang.yaw = ang.yaw - 360.0 end
          return ang
     end,

     normalizefloat = function(self, ang)
          if(ang > 180.0) then ang = ang - 360.0 end
          if(ang < -180.0) then ang = ang + 360.0 end
          return ang
     end,

     calcangle = function(self, src, dst)
          local vecdelta = Vector.new(dst.x - src.x, dst.y - src.y, dst.z - src.z)
          local angles = QAngle.new(math.atan2(-vecdelta.z, vecdelta:Length2D()) * 180.0 / math.pi, (math.atan2(vecdelta.y, vecdelta.x) * 180.0 / math.pi), 0.0)
          return angles
     end,

     lerp = function(self, start, vend, time)
          return start + (vend - start) * time
     end,

     clamp = function(self, val, min, max)
          if(val > max) then
               val = max
          elseif(val < min) then
               val = min
          end
          return val
     end,

     pointinscreen = function(self, point)
          if(point.x > 0 and point.x < lua_elements.screensize.x and point.y > 0 and point.y < lua_elements.screensize.x) then
               return true
          else
               return false
          end
     end,

     boxinscreen = function(self, max, min)
          if(min.x > 0 and min.x < lua_elements.screensize.x and min.y > 0 and max.y < lua_elements.screensize.x and max.x > 0 and max.x < lua_elements.screensize.x and max.y > 0 and max.y < lua_elements.screensize.x) then
               return true
          else
               return false
          end
     end,

     TIME_TO_TICKS = function(self, time)
          return math.floor(time / g_GlobalVars.interval_per_tick + 0.5)
     end,

     TICKS_TO_TIME = function(self, tick)
          return tick * g_GlobalVars.interval_per_tick
     end,
}
local target_selection =
{
      distance = function(self, localplayer)
            local origin = localplayer:GetProp("DT_BaseEntity", "m_vecOrigin")
            local bestdistance = 8192.0
            local bestplayer = nil
            for i = 1, 64 do
                  local player = g_EntityList:GetClientEntity(i)
                  if(player == nil) then goto continue end
                  player = player:GetPlayer()
                  if(player:IsTeamMate() == true or player:m_lifeState() == 0 or player:IsDormant() == true) then goto continue end

                  local distance = origin:DistTo(player:GetProp("DT_BaseEntity", "m_vecOrigin"))
                  if(distance < bestdistance) then
                        bestdistance = distance
                        bestplayer = player
                  end
                  ::continue::
            end
            return bestplayer
      end,

      fov = function(self)

      end,
}
local movement_helper =
{
     --icon = g_Render:LoadImageFromFile("nl/image.png", Vector2.new(32, 32)),
     in_run = false,
     closest_spot = nil,
     render_stuff = {},
     cmd_number = 1,
     init_size = Vector2.new(36, 36),
     --movement_list = nil
     on_draw = function(self)
          local localplayer = g_EntityList:GetClientEntity(g_EngineClient:GetLocalPlayer())
          if(localplayer == nil) then return end
          localplayer = localplayer:GetPlayer()
          local weapon = localplayer:GetActiveWeapon()
          if(weapon == nil) then return end
          local isknife = weapon:IsKnife()
          local map = g_EngineClient:GetLevelNameShort()
          local origin = localplayer:GetProp("DT_BaseEntity", "m_vecOrigin")
          local eyepos = localplayer:GetEyePosition()
          local movement_size = g_Render:CalcTextSize("movement", 16)
          local bestdistance = 200.0
          if(self.in_run == false) then self.closest_spot = nil end
          for startname, startspot in pairs(self.movement_list) do
               if(startspot.map == map and isknife == true) then
                    local distance = #(startspot.pos - origin)
                    if(distance < bestdistance) then
                         distance = bestdistance
                         if(self.in_run == false) then self.closest_spot = startspot end
                    end
               end
          end
          for startname, startspot in pairs(self.movement_list) do
               if(startspot.map == map) then
                    if(self.render_stuff[startname] == nil) then self.render_stuff[startname] = {} end
                    if(self.render_stuff[startname].global_alpha == nil) then self.render_stuff[startname].global_alpha = 0.0 end
                    if(self.render_stuff[startname].box_length == nil) then self.render_stuff[startname].box_length = self.init_size.x end
                    if(self.render_stuff[startname].box_height == nil) then self.render_stuff[startname].box_height = self.init_size.y end
                    if(self.render_stuff[startname].text_alpha == nil) then self.render_stuff[startname].text_alpha = 0.0 end
                    local distance = #(startspot.pos - origin)
                    local trace = g_EngineTrace:TraceRay(eyepos, startspot.pos, localplayer, 0x200400B)
                    local name_size = g_Render:CalcTextSize(startspot.name, 15)
                    local length = math.max(name_size.x, movement_size.x) + self.init_size.x + 8
                    if(trace.fraction > 0.96) then
                         self.render_stuff[startname].global_alpha = 1.0
                         if(distance <= 250.0) then
                              self.render_stuff[startname].box_length = math_helpers:lerp(self.render_stuff[startname].box_length, length, g_GlobalVars.frametime * 15.0)
                              if(math.abs(length - self.render_stuff[startname].box_length) < 1) then
                                   self.render_stuff[startname].text_alpha = math_helpers:lerp(self.render_stuff[startname].text_alpha, 1.0, g_GlobalVars.frametime * 15.0)
                              end
                         else
                              self.render_stuff[startname].text_alpha = math_helpers:lerp(self.render_stuff[startname].text_alpha, 0.0, g_GlobalVars.frametime * 15.0)
                              if(self.render_stuff[startname].text_alpha < 0.01) then
                                   self.render_stuff[startname].box_length = math_helpers:lerp(self.render_stuff[startname].box_length, self.init_size.x, g_GlobalVars.frametime * 15.0)
                              end
                         end
                    else
                         self.render_stuff[startname].text_alpha = math_helpers:lerp(self.render_stuff[startname].text_alpha, 0.0, g_GlobalVars.frametime * 15.0)
                         if(self.render_stuff[startname].text_alpha < 0.01) then
                              self.render_stuff[startname].box_length = math_helpers:lerp(self.render_stuff[startname].box_length, self.init_size.x, g_GlobalVars.frametime * 15.0)
                              if(math.abs(self.init_size.x - self.render_stuff[startname].box_length) < 1) then
                                   self.render_stuff[startname].global_alpha = 0.0
                              end
                         end
                    end
                    if(isknife == false or self.render_stuff[startname].global_alpha == 0.0) then goto continue end
                    local screenpos = g_Render:ScreenPosition(Vector.new(startspot.pos.x, startspot.pos.y, startspot.pos.z + 16.0))

                    g_Render:BoxFilled(Vector2.new(screenpos.x - self.render_stuff[startname].box_length / 2, screenpos.y - self.render_stuff[startname].box_height / 2), Vector2.new(screenpos.x + self.render_stuff[startname].box_length / 2, screenpos.y + self.render_stuff[startname].box_height / 2), Color.new(0.1, 0.1, 0.1, self.render_stuff[startname].global_alpha))
                    g_Render:Image(self.icon, Vector2.new(screenpos.x - self.render_stuff[startname].box_length / 2 + 2, screenpos.y - self.render_stuff[startname].box_height / 2 + 2), Vector2.new(32, 32))
                    g_Render:Text("Movement", Vector2.new(screenpos.x - self.render_stuff[startname].box_length / 2 + self.init_size.x + 3, screenpos.y - self.render_stuff[startname].box_height / 2 + 4), Color.new(1.0, 1.0, 1.0, self.render_stuff[startname].text_alpha), 16)
                    g_Render:Text(startspot.name, Vector2.new(screenpos.x - self.render_stuff[startname].box_length / 2 + self.init_size.x + 4, screenpos.y + self.render_stuff[startname].box_height / 2 - 4 - name_size.y), Color.new(1.0, 1.0, 1.0, self.render_stuff[startname].text_alpha), 15)
                    ::continue::
               end
          end
     end,

     on_prediction = function(self, cmd)
          local localplayer = g_EntityList:GetClientEntity(g_EngineClient:GetLocalPlayer())
          if(localplayer == nil or self.closest_spot == nil) then return end
          localplayer = localplayer:GetPlayer()
          local origin = localplayer:GetProp("DT_BaseEntity", "m_vecOrigin")
          local vecdelta = (self.closest_spot.pos - origin)
          local distance = #vecdelta
          local v1 = bit.band(cmd.buttons, 8) == 8
          local v2 = bit.band(cmd.buttons, 16) == 16
          local v3 = bit.band(cmd.buttons, 512) == 512
          local v4 = bit.band(cmd.buttons, 1024) == 1024
          local in_move = (v1 or v2 or v3 or v4)
          if(in_move == false and self.in_run == false) then
               if(distance > 0.01) then
                    local viewangles = g_EngineClient:GetViewAngles()
                    local direction = cheat.VectorToAngle(vecdelta)
                    direction.yaw = viewangles.yaw - direction.yaw
                    local move = cheat.AngleToForward(direction)
                    cmd.forwardmove = move.x * (450.0 * (math.exp(math_helpers:clamp(distance, 0.0, 5.0) - 5.0)) - 2.0)
                    cmd.sidemove = move.y * (450.0 * (math.exp(math_helpers:clamp(distance, 0.0, 5.0) - 5.0)) - 2.0)
               else
                    self.in_run = true
                    self.cmd_number = 1
               end
          end
     end,

     on_createmove = function(self, cmd)
          if(self.in_run == true) then
               cmd.buttons = self.closest_spot[self.cmd_number].bb
               cmd.forwardmove = self.closest_spot[self.cmd_number].fwd
               cmd.sidemove = self.closest_spot[self.cmd_number].sd
               cmd.viewangles.pitch = self.closest_spot[self.cmd_number].pitch
               cmd.viewangles.yaw = self.closest_spot[self.cmd_number].yaw
               cmd.weaponselect = self.closest_spot[self.cmd_number].wpnslt
               self.cmd_number = self.cmd_number + 1
               if(self.cmd_number > #self.closest_spot) then
                    self.in_run = false
               end    
          end
     end,
}
local grenade_helper =
{
     maps = loadstring("return {" .. http.Get("https://pastebin.com/raw/iNjyR6zT") .. "}")(),
     custom_maps = {},
     nade_type =
     {
          ["44"] = "HeGrenade",
          ["46"] = "Molotov",
          ["45"] = "Smoke",
          ["43"] = "FlashBang",
     },
     menu_nades =
     {
          ["44"] = 0,
          ["46"] = 1,
          ["45"] = 2,
          ["43"] = 3,
     },
     theme_colors =
     {
          [0] = --dark blue
          {
               head_r = 0.03,
               head_g = 0.03,
               head_b = 0.05,
               body_r = 0.05,
               body_g = 0.07,
               body_b = 0.12,
               target_r = 0.03,
               target_g = 0.03,
               target_b = 0.05,
               gradient_line_r = 0.027,
               gradient_line_g = 0.2,
               gradient_line_b = 0.3,
               text_color_r = 1,
               text_color_g = 1,
               text_color_b = 1,
          },
          [1] = --light
          {
               head_r = 1,
               head_g = 1,
               head_b = 1,
               body_r = 0.8,
               body_g = 0.8,
               body_b = 0.8,
               target_r = 1,
               target_g = 1,
               target_b = 1,
               gradient_line_r = 0.34,
               gradient_line_g = 0.32,
               gradient_line_b = 0.3,
               text_color_r = 0,
               text_color_g = 0,
               text_color_b = 0,
          },
          [2] = --dark
          {
               head_r = 0.03,
               head_g = 0.03,
               head_b = 0.03,
               body_r = 0.06,
               body_g = 0.06,
               body_b = 0.06,
               target_r = 0.03,
               target_g = 0.03,
               target_b = 0.03,
               gradient_line_r = 0.24,
               gradient_line_g = 0.23,
               gradient_line_b = 0.23,
               text_color_r = 1,
               text_color_g = 1,
               text_color_b = 1,
          },
     },
     config_names =
     {
          "Alpha",
          "Bravo",
          "Charlie",
          "Delta",
          "Echo",
          "Foxtrot",
          "Golf",
          "Hotel",
          "India",
          "Juliet",
     },
     movedirections =
     {
          [0] = 0,
          [1] = 180,
          [2] = 90,
          [3] = -90,
     },
     closest_nade = nil,
     closest_nade_position = Vector.new(0, 0, 0),
     render_stuff = {},
     should_throw = false,

     run_tick = 0,
     jump_tick = 0,

     old_autostrafe_smooth = 0,
     old_autostrafe = false,
     doubletap_call = true,
     old_doubletap = false,

     create_nade_map = "",
     create_nade_weaponid = "",

     init_ang = QAngle.new(0, 0, 0),
     init_pos = Vector.new(0, 0, 0),

     load_time = utils.UnixTime(),

     strafe_backup_direction = 0,
     strafe_backup_button = 0,
     strafe_backup_tick = 0,
     strafe_backup_duration = 0,

     force_forward = false,
     force_forward_yaw_direction = 0.0,

     extend_forward = function(self, cmd)
          if(self.force_forward == true) then
               local localplayer = g_EntityList:GetClientEntity(g_EngineClient:GetLocalPlayer())
               if(localplayer == nil) then return end
               localplayer = localplayer:GetPlayer()
               local weapon = localplayer:GetActiveWeapon()
               if(weapon == nil) then return end
               if(weapon:IsGrenade() == false) then return end
               local throwtime = weapon:GetProp("DT_BaseCSGrenade", "m_fThrowTime")
               local curtime = localplayer:GetProp("DT_BasePlayer", "m_nTickBase") * g_GlobalVars.interval_per_tick
               local direction = 0
               if(self.closest_nade.movedirection == 2) then
                    direction = -45
               elseif(self.closest_nade.movedirection == 3) then
                    direction = 45
               end
               local movedirection = cmd.viewangles.yaw - (self.closest_nade.ang.yaw + direction)
               local move = cheat.AngleToForward(QAngle.new(0, movedirection, 0))
               cmd.forwardmove = move.x * 450.0
               cmd.sidemove = move.y * 450.0
          end
     end,

     on_backupstrafe = function(self)
          if(lua_elements.backup_direction:GetInt() > 0) then
               lua_elements.backup_strafe_duration:SetVisible(true)
          else
               lua_elements.backup_strafe_duration:SetVisible(false)
          end
     end,

     on_properties = function(self)
          if(lua_elements.properties:GetBool(0) == true) then
               lua_elements.run_duration:SetVisible(true)
               lua_elements.run_velocity:SetVisible(true)
               lua_elements.run_direction:SetVisible(true)
               lua_elements.backup_direction:SetVisible(true)
          else
               lua_elements.run_duration:SetVisible(false)
               lua_elements.run_velocity:SetVisible(false)
               lua_elements.run_direction:SetVisible(false)
               lua_elements.backup_direction:SetVisible(false)
               lua_elements.backup_strafe_duration:SetVisible(false)

               lua_elements.run_duration:SetInt(0)
               lua_elements.run_velocity:SetFloat(0)
               lua_elements.run_direction:SetInt(0)
               lua_elements.backup_direction:SetInt(0)
               lua_elements.backup_strafe_duration:SetInt(0)
          end
          if(lua_elements.properties:GetBool(1) == true) then
               lua_elements.jump_duration:SetVisible(true)
               lua_elements.jump_thresthold:SetVisible(true)
          else
               lua_elements.jump_duration:SetVisible(false)
               lua_elements.jump_thresthold:SetVisible(false)

               lua_elements.jump_duration:SetInt(0)
               lua_elements.jump_thresthold:SetInt(0)
          end
     end,

     backup_strafe = function(self, cmd)
          if(cmd.tick_count - self.strafe_backup_tick <= self.strafe_backup_duration and cmd.tick_count - self.strafe_backup_tick >= 0) then
               local movedirection = self.strafe_backup_direction
               local move = cheat.AngleToForward(QAngle.new(0, cmd.viewangles.yaw - movedirection, 0))
               cmd.forwardmove = move.x * 450.0
               cmd.sidemove = move.y * 450.0
               if(cmd.tick_count - self.strafe_backup_tick == self.strafe_backup_duration) then
                    menu_elements.autostrafe_smooth:SetInt(self.old_autostrafe_smooth)
               end
          end
     end,

     setup_backup_strafe = function(self, cmd)
          if(self.closest_nade.backupdirection ~= 0) then
               self.old_autostrafe_smooth = menu_elements.autostrafe_smooth:GetInt()
               menu_elements.autostrafe_smooth:SetInt(0)
               self.strafe_backup_tick = cmd.tick_count
               self.strafe_backup_duration = self.closest_nade.backupduration
               self.strafe_backup_direction = (self.closest_nade.ang.yaw + self.movedirections[self.closest_nade.backupdirection - 1])
          end
     end,

     on_nade_update = function(self)
          local localplayer = g_EntityList:GetClientEntity(g_EngineClient:GetLocalPlayer())
          if(localplayer == nil) then return end
          localplayer = localplayer:GetPlayer()
          local origin = localplayer:GetProp("DT_BaseEntity", "m_vecOrigin")
          local viewangles = g_EngineClient:GetViewAngles()
          self.init_pos = Vector.new(origin.x, origin.y, origin.z)
          lua_elements.pitch_slider:SetFloat(viewangles.pitch)
          lua_elements.yaw_slider:SetFloat(viewangles.yaw)
     end,

     update_configs = function(self)
          if(utils.UnixTime() - self.load_time >= 2) then
               self.load_time = utils.UnixTime()
               for i = 1, 10 do
                    if(lua_elements.nade_helper_types:GetBool(i) == false) then goto continue end
                    local pfile = ffi.cast("void*", ffi.C.CreateFileA("nl\\GrenadeHelper\\" .. self.config_names[i] .. ".txt", 0xC0000000, 0x3, 0, 0x4, 0x80, nil))
                    local size = ffi.C.GetFileSize(pfile, nil)
                    local buff = ffi.new("char[" ..(size + 1).. "]")
                    ffi.C.ReadFile(pfile, buff, size, nil, 0)
                    ffi.C.CloseHandle(pfile)
                    buff = ffi.string(buff)
                    buff = "{"..buff.."}"
                    self.custom_maps[i] = loadstring("return " .. buff)()
                    ::continue::
               end
          end
     end,

     on_save_nade = function(self)
          local nade = self.maps[self.create_nade_map][self.create_nade_weaponid][1][lua_elements.nade_name:GetString()]
          local result = string.format("[\"%s\"] =\n{\n\tpos = Vector.new(%s, %s, %s),\n\tmap = \"%s\",\n\ttype = \"%s\",\n\t[\"%s\"] = \n\t{\n\t\tang = QAngle.new(%s, %s, 0.0),\n\t\trunduration = %s,\n\t\tjumpduration = %s,\n\t\tspeed = %s,\n\t\tduck = %s,\n\t\tjump = %s,\n\t\tstrength = %s,\n\t\tjumpthresthold = %s,\n\t\tdescription = \"%s\",\n\t\tmovedirection = %s,\n\t\tbackupdirection = %s,\n\t\tbackupduration = %s,\n\t\textendforward = %s,\n\t},\n},\n", utils.UnixTime(), self.init_pos.x, self.init_pos.y, self.init_pos.z, self.create_nade_map, self.create_nade_weaponid, lua_elements.nade_name:GetString(), nade.ang.pitch, nade.ang.yaw, nade.runduration, nade.jumpduration, nade.speed, nade.duck, nade.jump, nade.strength, nade.jumpthresthold, nade.description, nade.movedirection, nade.backupdirection, nade.backupduration, nade.extendforward)
          local pfile = ffi.cast("void*", ffi.C.CreateFileA("nl\\GrenadeHelper\\" .. self.config_names[lua_elements.save_nade_cfg:GetInt() + 1] .. ".txt", 0xC0000000, 0x00000003, 0, 0x4, 0x80, nil))
          local overlapped = ffi.new("OVERLAPPED")
          overlapped.DUMMYUNIONNAME.DUMMYSTRUCTNAME.Offset = 0xFFFFFFFF
          overlapped.DUMMYUNIONNAME.DUMMYSTRUCTNAME.OffsetHigh = 0xFFFFFFFF
          ffi.C.WriteFile(pfile, ffi.cast("char*", result), string.len(result), nil, ffi.cast("void*", overlapped))
          ffi.C.CloseHandle(pfile)

          lua_elements.pitch_slider:SetVisible(false)
          lua_elements.yaw_slider:SetVisible(false)
          lua_elements.run_duration:SetVisible(false)
          lua_elements.run_velocity:SetVisible(false)
          lua_elements.jump_duration:SetVisible(false)
          lua_elements.jump_thresthold:SetVisible(false)
          lua_elements.properties:SetVisible(false)
          lua_elements.throw_strengh:SetVisible(false)
          lua_elements.nade_name:SetVisible(false)
          lua_elements.nade_description:SetVisible(false)
          lua_elements.remove_nade:SetVisible(false)
          lua_elements.save_nade_cfg:SetVisible(false)
          lua_elements.save_nade:SetVisible(false)
          lua_elements.create_nade:SetVisible(true)
          lua_elements.nade_teleport:SetVisible(false)
          lua_elements.nade_update_pos_ang:SetVisible(false)
          lua_elements.run_direction:SetVisible(false)
          lua_elements.backup_direction:SetVisible(false)
          lua_elements.backup_strafe_duration:SetVisible(false)
          lua_elements.extend_forward_strenght:SetVisible(false)
          table.remove(self.maps[self.create_nade_map][self.create_nade_weaponid], 1)
     end,

     on_create_nade = function(self)
          local localplayer = g_EntityList:GetClientEntity(g_EngineClient:GetLocalPlayer())
          if(localplayer == nil) then return end
          localplayer = localplayer:GetPlayer()
          local weapon = localplayer:GetActiveWeapon()
          if(weapon == nil) then return end
          if(weapon:IsGrenade() == false) then return end
          local weapon_id = weapon:GetWeaponID()
          if(weapon_id == 48) then weapon_id = 46 end
          local origin = localplayer:GetProp("DT_BaseEntity", "m_vecOrigin")
          local viewangles = g_EngineClient:GetViewAngles()

          self.create_nade_map = g_EngineClient:GetLevelNameShort()
          self.create_nade_weaponid = tostring(weapon_id)

          self.init_ang = QAngle.new(viewangles.pitch, viewangles.yaw, 0.0)
          self.init_pos = Vector.new(origin.x, origin.y, origin.z)

          lua_elements.pitch_slider:SetVisible(true)
          lua_elements.yaw_slider:SetVisible(true)
          lua_elements.properties:SetVisible(true)
          lua_elements.throw_strengh:SetVisible(true)
          lua_elements.nade_name:SetVisible(true)
          lua_elements.nade_description:SetVisible(true)
          lua_elements.create_nade:SetVisible(false)
          lua_elements.save_nade_cfg:SetVisible(true)
          lua_elements.save_nade:SetVisible(true)
          lua_elements.remove_nade:SetVisible(true)
          lua_elements.nade_teleport:SetVisible(true)
          lua_elements.nade_update_pos_ang:SetVisible(true)

          lua_elements.pitch_slider:SetFloat(viewangles.pitch)
          lua_elements.yaw_slider:SetFloat(viewangles.yaw)
          lua_elements.run_duration:SetInt(0)
          lua_elements.run_velocity:SetFloat(450)
          lua_elements.jump_duration:SetInt(0)
          lua_elements.jump_thresthold:SetInt(0)
          for i = 0, 2 do
               lua_elements.properties:SetBool(i, false)
          end
          lua_elements.throw_strengh:SetFloat(100)
          lua_elements.nade_name:SetString("")
          lua_elements.nade_description:SetString("")
          lua_elements.run_direction:SetInt(0)
          lua_elements.backup_direction:SetInt(0)
          lua_elements.backup_strafe_duration:SetInt(1)
          lua_elements.extend_forward_strenght:SetBool(false)

          if(self.maps[self.create_nade_map] == nil) then
               self.maps[self.create_nade_map] = {}
          end
          if(self.maps[self.create_nade_map][self.create_nade_weaponid] == nil) then
               self.maps[self.create_nade_map][self.create_nade_weaponid] = {}
          end

          table.insert(self.maps[self.create_nade_map][self.create_nade_weaponid], {pos = self.init_pos, [""] = {ang = self.init_ang, runduration = 0, jumpduration = 0, speed = 0, duck = false, jump = false, strength = 1, description = "", movedirection = 0, backupdirection = 0,}})
     end,

     on_remove_nade = function(self)
          lua_elements.pitch_slider:SetVisible(false)
          lua_elements.yaw_slider:SetVisible(false)
          lua_elements.run_duration:SetVisible(false)
          lua_elements.run_velocity:SetVisible(false)
          lua_elements.jump_duration:SetVisible(false)
          lua_elements.jump_thresthold:SetVisible(false)
          lua_elements.properties:SetVisible(false)
          lua_elements.throw_strengh:SetVisible(false)
          lua_elements.nade_name:SetVisible(false)
          lua_elements.nade_description:SetVisible(false)
          lua_elements.remove_nade:SetVisible(false)
          lua_elements.save_nade_cfg:SetVisible(false)
          lua_elements.save_nade:SetVisible(false)
          lua_elements.create_nade:SetVisible(true)
          lua_elements.nade_teleport:SetVisible(false)
          lua_elements.nade_update_pos_ang:SetVisible(false)
          lua_elements.run_direction:SetVisible(false)
          lua_elements.backup_direction:SetVisible(false)
          lua_elements.backup_strafe_duration:SetVisible(false)
          lua_elements.extend_forward_strenght:SetVisible(false)

          table.remove(self.maps[self.create_nade_map][self.create_nade_weaponid], 1)
     end,

     on_teleport_nade = function(self)
          g_EngineClient:ClientCmd("setpos " .. self.init_pos.x .. " " .. self.init_pos.y .. " " .. self.init_pos.z)
          g_EngineClient:ClientCmd("setang " .. self.init_ang.pitch .. " " .. self.init_ang.yaw .. " 0.0")
     end,

     on_draw = function(self)
          if(self.maps[self.create_nade_map] and self.maps[self.create_nade_map][self.create_nade_weaponid] and self.maps[self.create_nade_map][self.create_nade_weaponid][1]) then
               self.init_ang.pitch = lua_elements.pitch_slider:GetFloat()
               self.init_ang.yaw = lua_elements.yaw_slider:GetFloat()
               self.maps[self.create_nade_map][self.create_nade_weaponid][1] = {pos = self.init_pos, [lua_elements.nade_name:GetString()] = {ang = self.init_ang, runduration = lua_elements.run_duration:GetInt(), speed = lua_elements.run_velocity:GetFloat(), jumpduration = lua_elements.jump_duration:GetInt(), jumpthresthold = lua_elements.jump_thresthold:GetInt(), strength = lua_elements.throw_strengh:GetFloat() / 100.0, duck = lua_elements.properties:GetBool(2), jump = lua_elements.properties:GetBool(1), description = lua_elements.nade_description:GetString(), movedirection = lua_elements.run_direction:GetInt(), backupdirection = lua_elements.backup_direction:GetInt(), backupduration = lua_elements.backup_strafe_duration:GetInt(), extendforward = lua_elements.extend_forward_strenght:GetBool(),}}
          end
          local localplayer = g_EntityList:GetClientEntity(g_EngineClient:GetLocalPlayer())
          if(localplayer == nil) then return end

          local map = g_EngineClient:GetLevelNameShort()
          self.closest_nade_position = nil
          if(self.should_throw == false) then self.closest_nade = nil end

          localplayer = localplayer:GetPlayer()
          local vecOrigin = localplayer:GetProp("DT_BaseEntity", "m_vecOrigin")
          local vecEyePosition = localplayer:GetEyePosition()
          local angViewAngles = g_EngineClient:GetViewAngles()
          local weapon = localplayer:GetActiveWeapon()
          local screencenter = Vector2.new(lua_elements.screensize.x / 2, lua_elements.screensize.y / 2)
          if(weapon == nil) then return end
          local weapon_id = weapon:GetWeaponID()
          if(weapon_id == 48) then weapon_id = 46 end
          if(weapon_id == 47) then return end

          local map_list = self.maps[map]
          local nade_list = nil
          if(map_list) then nade_list = map_list[tostring(weapon_id)] end

          if(weapon:IsGrenade() == false) then
               if(self.should_throw == true) then
                    menu_elements.autostrafe:SetBool(self.old_autostrafe)
                    menu_elements.autostrafe_smooth:SetInt(self.old_autostrafe_smooth)
               end
               self.closest_nade = nil
               self.closest_nade_position = nil
               self.should_throw = false
               self.has_strength = false
               self.has_duck = true
               self.run_tick = 0
               self.jump_tick = 0
               if(map_list) then
                    for nade_type, list in pairs(map_list) do
                         for startname, startspot in pairs(list) do
                         if(self.render_stuff[startname]) then
                              self.render_stuff[startname].global_alpha = 0.0
                              self.render_stuff[startname].text_alpha = 0.0
                              self.render_stuff[startname].icon_alpha = 0.0
                              self.render_stuff[startname].box_length = 16.0
                              self.render_stuff[startname].box_height = 16.0
                              self.render_stuff[startname].box_additions_alpha = 0.0
                         end
                         for endname, endspot in pairs(startspot) do
                              if(type(endspot) == "table") then
                                   if(self.render_stuff[startname] and self.render_stuff[startname][endname]) then
                                        self.render_stuff[startname][endname].global_alpha = 0.0
                                        self.render_stuff[startname][endname].text_alpha = 0.0
                                        self.render_stuff[startname][endname].box_length = 10.0
                                        self.render_stuff[startname][endname].description_box_height = 0.0
                                        self.render_stuff[startname][endname].description_text_alpha = 0.0
                                   end
                              end
                         end
                         end
                    end
               end
               for i = 1, 10 do
                    if(self.custom_maps[i] and lua_elements.nade_helper_types:GetBool(i) == true) then
                         for startname, startspot in pairs(self.custom_maps[i]) do
                         if(map == startspot.map) then
                              if(self.render_stuff[startname]) then
                                   self.render_stuff[startname].global_alpha = 0.0
                                   self.render_stuff[startname].text_alpha = 0.0
                                   self.render_stuff[startname].icon_alpha = 0.0
                                   self.render_stuff[startname].box_length = 16.0
                                   self.render_stuff[startname].box_height = 16.0
                                   self.render_stuff[startname].box_additions_alpha = 0.0                        
                              end
                              for endname, endspot in pairs(startspot) do
                                   if(type(endspot) == "table") then
                                        if(self.render_stuff[startname] and self.render_stuff[startname][endname]) then
                                             self.render_stuff[startname][endname].global_alpha = 0.0
                                             self.render_stuff[startname][endname].text_alpha = 0.0
                                             self.render_stuff[startname][endname].box_length = 10.0
                                             self.render_stuff[startname][endname].description_box_height = 0.0
                                             self.render_stuff[startname][endname].description_text_alpha = 0.0
                                        end
                                   end
                              end
                         end
                         end
                    end
               end  
               return
          end

          local color_set = self.theme_colors[lua_elements.nade_helper_theme:GetInt()]

          local bestdistance = 100.0
          local temp_nade = nil

          if(nade_list) then
               for startname, startspot in pairs(nade_list) do
                    if((lua_elements.nade_helper_types:GetBool(0) == false or lua_elements.nade_helper_nades:GetBool(self.menu_nades[tostring(weapon_id)]) == false) and startname ~= 1) then goto continue end
                    local distance = vecOrigin:DistTo(startspot.pos)
                    if(distance < 100.0 and distance < bestdistance) then
                         if(self.should_throw == false) then self.closest_nade_position = startspot.pos end
                         bestdistance = distance
                         temp_nade = startspot
                    end
                    ::continue::
               end
          end

          for i = 1, 10 do
               if(self.custom_maps[i] and lua_elements.nade_helper_types:GetBool(i) == true) then
                    for createtime, startspot in pairs(self.custom_maps[i]) do
                         if(map == startspot.map) then
                         if(tostring(weapon_id) == startspot.type and lua_elements.nade_helper_nades:GetBool(self.menu_nades[startspot.type]) == true) then
                              local distance = vecOrigin:DistTo(startspot.pos)
                              if(distance < 100.0 and distance < bestdistance) then
                                   if(self.should_throw == false) then self.closest_nade_position = startspot.pos end
                                   bestdistance = distance
                                   temp_nade = startspot
                              end
                         end
                         end
                    end
               end
          end
       
          if(nade_list) then
               for startname, startspot in pairs(nade_list) do
                    if((lua_elements.nade_helper_types:GetBool(0) == false or lua_elements.nade_helper_nades:GetBool(self.menu_nades[tostring(weapon_id)]) == false) and startname ~= 1) then goto continue end
                    if(self.render_stuff[startname] == nil) then self.render_stuff[startname] = {} end
                    if(self.render_stuff[startname].global_alpha == nil) then self.render_stuff[startname].global_alpha = 0.0 end
                    if(self.render_stuff[startname].box_length == nil) then self.render_stuff[startname].box_length = 30.0 end
                    if(self.render_stuff[startname].box_height == nil) then self.render_stuff[startname].box_height = 30.0 end
                    if(self.render_stuff[startname].text_alpha == nil) then self.render_stuff[startname].text_alpha = 0.0 end
                    if(self.render_stuff[startname].icon_alpha == nil) then self.render_stuff[startname].icon_alpha = 0.0 end
                    if(self.render_stuff[startname].box_additions_alpha == nil) then self.render_stuff[startname].box_additions_alpha = 0.0 end

                    local distance = vecOrigin:DistTo(startspot.pos)
                    if(distance > 1750.0) then
                         self.render_stuff[startname].global_alpha = math_helpers:lerp(self.render_stuff[startname].global_alpha, 0.0, g_GlobalVars.frametime * 20.0)
                    else
                         local trace = g_EngineTrace:TraceRay(vecEyePosition, startspot.pos, localplayer, 0x200400B)
                         if(trace.fraction > 0.98) then
                              if(distance > 1250.0) then
                                   self.render_stuff[startname].global_alpha = math_helpers:lerp(self.render_stuff[startname].global_alpha, 0.4, g_GlobalVars.frametime * 20.0)
                              elseif(distance < 5.0) then
                                   self.render_stuff[startname].global_alpha = math_helpers:lerp(self.render_stuff[startname].global_alpha, 1.0, g_GlobalVars.frametime * 20.0)
                              else
                                   self.render_stuff[startname].global_alpha = math_helpers:lerp(self.render_stuff[startname].global_alpha, 0.8, g_GlobalVars.frametime * 20.0)
                              end
                         else
                              self.render_stuff[startname].global_alpha = math_helpers:lerp(self.render_stuff[startname].global_alpha, 0.0, g_GlobalVars.frametime * 20.0)
                         end
                    end

                    if(self.render_stuff[startname].global_alpha < 0.01) then goto continue end

                    local screenpos = g_Render:ScreenPosition(Vector.new(startspot.pos.x, startspot.pos.y, startspot.pos.z + 10.0))
                    local nade_type_size = g_Render:CalcTextSize(self.nade_type[tostring(weapon_id)], 14)
                    local bestlength = 0
                    local num_spots = 0
                    local temp_fov_nade = nil
                    local temp_fov_name = nil
                    local bestfov = lua_elements.nade_helper_fov:GetInt()

                    for endname, endspot in pairs(startspot) do
                         if(type(endspot) == "table") then
                         local name_size = g_Render:CalcTextSize(endname, 14)
                         if(name_size.x > bestlength) then bestlength = name_size.x end

                         if(self.render_stuff[startname][endname] == nil) then self.render_stuff[startname][endname] = {} end
                         if(self.render_stuff[startname][endname].global_alpha == nil) then self.render_stuff[startname][endname].global_alpha = 0.0 end
                         if(self.render_stuff[startname][endname].box_length == nil) then self.render_stuff[startname][endname].box_length = 10.0 end
                         if(self.render_stuff[startname][endname].text_alpha == nil) then self.render_stuff[startname][endname].text_alpha = 0.0 end
                         if(self.render_stuff[startname][endname].circle_color == nil) then self.render_stuff[startname][endname].circle_color = Color.new(0.15, 0.15, 0.15, 0.0) end
                         if(self.render_stuff[startname][endname].description_box_height == nil) then self.render_stuff[startname][endname].description_box_height = 0.0 end
                         if(self.render_stuff[startname][endname].description_text_alpha == nil) then self.render_stuff[startname][endname].description_text_alpha = 0.0 end
           
                         if(endspot.endposition == nil) then
                              local vecStart = Vector.new(startspot.pos.x, startspot.pos.y, startspot.pos.z + 64.0)
                              local forward = cheat.AngleToForward(endspot.ang)
                              local vecEnd = Vector.new(vecStart.x + 800.0 * forward.x, vecStart.y + 800.0 * forward.y, vecStart.z + 800.0 * forward.z)
                              local trace = g_EngineTrace:TraceRay(vecStart, vecEnd, localplayer, 0x46004003)
                              endspot.endposition = Vector.new(trace.endpos.x, trace.endpos.y, trace.endpos.z)
                         end
                         if(endspot.jumpthresthold == nil) then
                              endspot.jumpthresthold = 0
                         end
                         if(endspot.movedirection == nil) then
                              endspot.movedirection = 0
                         end
                         if(endspot.backupdirection == nil) then
                              endspot.backupdirection = 0
                         end
                         if(endspot.backupduration == nil) then
                              endspot.backupduration = 1
                         end
                         if(endspot.extendforward == nil) then
                              endspot.extendforward = false
                         end
           
                         local angles = math_helpers:normalizeangles(math_helpers:calcangle(vecEyePosition, endspot.endposition))
                         local fov = math.sqrt((angles.pitch - angViewAngles.pitch) ^ 2 + (angles.yaw - angViewAngles.yaw) ^ 2)
                         fov = math_helpers:normalizefloat(fov)
                         fov = math.abs(fov)
           
                         if(fov < bestfov and distance <= 50.0 and startspot == temp_nade) then
                              bestfov = fov
                              temp_fov_nade = endspot
                              temp_fov_name = endname
                              if(self.should_throw == false) then self.closest_nade = endspot end
                         end
                         num_spots = num_spots + 1
                         end
                    end

                    for endname, endspot in pairs(startspot) do
                         if(type(endspot) ~= "table" or endspot == temp_fov_nade) then goto continue end
       
                         local screenpos = g_Render:ScreenPosition(endspot.endposition)
                         local name_size = g_Render:CalcTextSize(endname, 14)
       
                         local r = math_helpers:lerp(self.render_stuff[startname][endname].circle_color:r(), 0.3, g_GlobalVars.frametime * 15.0)
                         local g = math_helpers:lerp(self.render_stuff[startname][endname].circle_color:g(), 0.3, g_GlobalVars.frametime * 15.0)
                         local b = math_helpers:lerp(self.render_stuff[startname][endname].circle_color:b(), 0.3, g_GlobalVars.frametime * 15.0)

                         local desired_box_length = name_size.x + 20

                         if(endspot.description and string.len(endspot.description) > 0) then
                         local desc_size = g_Render:CalcTextSize(endspot.description, 11)
                         desired_box_height = 16
                         if(self.render_stuff[startname][endname].description_text_alpha > 0.01) then desired_box_length = math.max(desired_box_length, desc_size.x) end
                         end

                         self.render_stuff[startname][endname].description_text_alpha = math_helpers:lerp(self.render_stuff[startname][endname].description_text_alpha, 0.0, g_GlobalVars.frametime * 60.0)

                         if(distance > 50.0 or startspot ~= temp_nade) then
                         self.render_stuff[startname][endname].text_alpha = math_helpers:lerp(self.render_stuff[startname][endname].text_alpha, 0.0, g_GlobalVars.frametime * 60.0)
                         if(self.render_stuff[startname][endname].text_alpha < 0.01) then
                              self.render_stuff[startname][endname].box_length = math_helpers:lerp(self.render_stuff[startname][endname].box_length, 10.0, g_GlobalVars.frametime * 30.0)
                              self.render_stuff[startname][endname].description_box_height = math_helpers:lerp(self.render_stuff[startname][endname].description_box_height, 0.0, g_GlobalVars.frametime * 30.0)
                              if(self.render_stuff[startname][endname].box_length - 10.0 < 0.1 and self.render_stuff[startname][endname].description_box_height < 0.1) then
                                   self.render_stuff[startname][endname].global_alpha = math_helpers:lerp(self.render_stuff[startname][endname].global_alpha, 0.0, g_GlobalVars.frametime * 60.0)
                              end
                         end
                         else
                         if(screenpos.x + self.render_stuff[startname][endname].box_length + 2 > lua_elements.screensize.x or screenpos.x < 12 or screenpos.y + 10 > lua_elements.screensize.y or screenpos.y < 10) then
                              self.render_stuff[startname][endname].global_alpha = math_helpers:lerp(self.render_stuff[startname][endname].global_alpha, 1.0, g_GlobalVars.frametime * 60.0)
                         else
                              self.render_stuff[startname][endname].global_alpha = math_helpers:lerp(self.render_stuff[startname][endname].global_alpha, 0.6, g_GlobalVars.frametime * 60.0)
                         end
                         if(self.render_stuff[startname][endname].global_alpha > 0.58) then
                              self.render_stuff[startname][endname].box_length = math_helpers:lerp(self.render_stuff[startname][endname].box_length, desired_box_length, g_GlobalVars.frametime * 30.0)
                              if(desired_box_length - self.render_stuff[startname][endname].box_length < 0.1) then
                                   self.render_stuff[startname][endname].text_alpha = math_helpers:lerp(self.render_stuff[startname][endname].text_alpha, self.render_stuff[startname][endname].global_alpha, g_GlobalVars.frametime * 60.0)
                                   if(self.render_stuff[startname][endname].description_text_alpha < 0.01) then
                                        self.render_stuff[startname][endname].description_box_height = math_helpers:lerp(self.render_stuff[startname][endname].description_box_height, 0.0, g_GlobalVars.frametime * 60.0)
                                   end
                              end
                         end
                         end
                         self.render_stuff[startname][endname].circle_color = Color.new(r, g, b, self.render_stuff[startname][endname].global_alpha)
                         if(self.render_stuff[startname][endname].global_alpha < 0.01) then goto continue end

                         if(screenpos.x + self.render_stuff[startname][endname].box_length + 2 > lua_elements.screensize.x or screenpos.x < 12 or screenpos.y + 10 > lua_elements.screensize.y or screenpos.y < 10) then
                              local vecdelta = Vector2.new(screenpos.x - screencenter.x, screenpos.y - screencenter.y)
                              local length = #vecdelta
                              local cos = vecdelta.x / length
                              local sin = vecdelta.y / length
                              local max_legnth = #screencenter

                              local newpos = Vector2.new(screencenter.x + max_legnth * cos, screencenter.y + max_legnth * sin)
                              if(newpos.x + self.render_stuff[startname][endname].box_length > lua_elements.screensize.x) then newpos.x = lua_elements.screensize.x - self.render_stuff[startname][endname].box_length - 18
                              elseif(newpos.x < 16) then newpos.x = 28 end
                              if(newpos.y + 16 > lua_elements.screensize.y) then newpos.y = lua_elements.screensize.y - 28
                              elseif(newpos.y < 16) then newpos.y = 28 end

                              screenpos = newpos
                         end
                         g_Render:BoxFilled(Vector2.new(screenpos.x - 10, screenpos.y - 8), Vector2.new(screenpos.x + self.render_stuff[startname][endname].box_length, screenpos.y + 8), Color.new(color_set.target_r, color_set.target_g, color_set.target_b, self.render_stuff[startname][endname].global_alpha))
                         g_Render:Text(endname, Vector2.new(screenpos.x + 10, screenpos.y - name_size.y / 2), Color.new(color_set.text_color_r, color_set.text_color_g, color_set.text_color_b, self.render_stuff[startname][endname].text_alpha), 14)
                         g_Render:BoxFilled(Vector2.new(screenpos.x - 10, screenpos.y + 8), Vector2.new(screenpos.x + self.render_stuff[startname][endname].box_length, screenpos.y + 8 + self.render_stuff[startname][endname].description_box_height), Color.new(color_set.body_r, color_set.body_g, color_set.body_b, self.render_stuff[startname][endname].global_alpha))

                         g_Render:CircleFilled(screenpos, 5, 15, self.render_stuff[startname][endname].circle_color)
                         g_Render:Circle(screenpos, 5, 15, Color.new(0.1, 0.1, 0.1, self.render_stuff[startname][endname].global_alpha))
       
                         ::continue::
                    end

                    if(temp_fov_nade) then
                         local screenpos = g_Render:ScreenPosition(temp_fov_nade.endposition)
                         local name_size = g_Render:CalcTextSize(temp_fov_name, 14)
           
                         local r = math_helpers:lerp(self.render_stuff[startname][temp_fov_name].circle_color:r(), 0.01, g_GlobalVars.frametime * 15.0)
                         local g = math_helpers:lerp(self.render_stuff[startname][temp_fov_name].circle_color:g(), 0.65, g_GlobalVars.frametime * 15.0)
                         local b = math_helpers:lerp(self.render_stuff[startname][temp_fov_name].circle_color:b(), 0.96, g_GlobalVars.frametime * 15.0)

                         self.render_stuff[startname][temp_fov_name].global_alpha = math_helpers:lerp(self.render_stuff[startname][temp_fov_name].global_alpha, 0.9, g_GlobalVars.frametime * 30.0)
                         self.render_stuff[startname][temp_fov_name].circle_color = Color.new(r, g, b, self.render_stuff[startname][temp_fov_name].global_alpha)

                         local desired_box_length = name_size.x + 20
                         local desired_box_height = 0
                     
                         if(temp_fov_nade.description and string.len(temp_fov_nade.description) > 0) then
                              local desc_size = g_Render:CalcTextSize(temp_fov_nade.description, 11)
                              desired_box_height = 16
                              if(desc_size.x > desired_box_length) then desired_box_length = math.max(desired_box_length, desc_size.x) end
                         end

                         if(self.render_stuff[startname][temp_fov_name].global_alpha > 0.88) then
                              self.render_stuff[startname][temp_fov_name].box_length = math_helpers:lerp(self.render_stuff[startname][temp_fov_name].box_length, desired_box_length, g_GlobalVars.frametime * 30.0)
                              self.render_stuff[startname][temp_fov_name].description_box_height = math_helpers:lerp(self.render_stuff[startname][temp_fov_name].description_box_height, desired_box_height, g_GlobalVars.frametime * 30.0)
                              if(desired_box_length - self.render_stuff[startname][temp_fov_name].box_length < 0.1 and desired_box_height - self.render_stuff[startname][temp_fov_name].description_box_height < 0.1) then
                                   self.render_stuff[startname][temp_fov_name].text_alpha = math_helpers:lerp(self.render_stuff[startname][temp_fov_name].text_alpha, 1.0, g_GlobalVars.frametime * 30.0)
                                   self.render_stuff[startname][temp_fov_name].description_text_alpha = math_helpers:lerp(self.render_stuff[startname][temp_fov_name].description_text_alpha, 1.0, g_GlobalVars.frametime * 30.0)
                              end
                         end

                         if(screenpos.x + self.render_stuff[startname][temp_fov_name].box_length + 2 > lua_elements.screensize.x or screenpos.x < 12 or screenpos.y + 10 > lua_elements.screensize.y or screenpos.y < 10) then
                              local vecdelta = Vector2.new(screenpos.x - screencenter.x, screenpos.y - screencenter.y)
                              local length = #vecdelta
                              local cos = vecdelta.x / length
                              local sin = vecdelta.y / length
                              local max_legnth = #screencenter

                              local newpos = Vector2.new(screencenter.x + max_legnth * cos, screencenter.y + max_legnth * sin)
                              if(newpos.x + self.render_stuff[startname][temp_fov_name].box_length > lua_elements.screensize.x) then newpos.x = lua_elements.screensize.x - self.render_stuff[startname][temp_fov_name].box_length - 18
                              elseif(newpos.x < 16) then newpos.x = 28 end
                              if(newpos.y + 16 > lua_elements.screensize.y) then newpos.y = lua_elements.screensize.y - 28
                              elseif(newpos.y < 16) then newpos.y = 28 end

                              screenpos = newpos
                         end

                         g_Render:BoxFilled(Vector2.new(screenpos.x - 10, screenpos.y - 8), Vector2.new(screenpos.x + self.render_stuff[startname][temp_fov_name].box_length, screenpos.y + 8), Color.new(color_set.target_r, color_set.target_g, color_set.target_b, self.render_stuff[startname][temp_fov_name].global_alpha))
                         g_Render:Text(temp_fov_name, Vector2.new(screenpos.x + 10, screenpos.y - name_size.y / 2), Color.new(color_set.text_color_r, color_set.text_color_g, color_set.text_color_b, self.render_stuff[startname][temp_fov_name].text_alpha), 14)
                         g_Render:BoxFilled(Vector2.new(screenpos.x - 10, screenpos.y + 8), Vector2.new(screenpos.x + self.render_stuff[startname][temp_fov_name].box_length, screenpos.y + 8 + self.render_stuff[startname][temp_fov_name].description_box_height), Color.new(color_set.body_r, color_set.body_g, color_set.body_b, self.render_stuff[startname][temp_fov_name].global_alpha))

                         if(temp_fov_nade.description and string.len(temp_fov_nade.description) > 0) then
                              local desc_size = g_Render:CalcTextSize(temp_fov_nade.description, 11)
                              g_Render:BoxFilled(Vector2.new(screenpos.x - 10, screenpos.y + 8), Vector2.new(screenpos.x + self.render_stuff[startname][temp_fov_name].box_length, screenpos.y + 9), Color.new(color_set.gradient_line_r, color_set.gradient_line_g, color_set.gradient_line_b, self.render_stuff[startname][temp_fov_name].global_alpha))
                              g_Render:Text(temp_fov_nade.description, Vector2.new(screenpos.x - 5, screenpos.y + 8 + self.render_stuff[startname][temp_fov_name].description_box_height / 2 - desc_size.y / 2), Color.new(color_set.text_color_r, color_set.text_color_g, color_set.text_color_b, self.render_stuff[startname][temp_fov_name].description_text_alpha), 11)
                         end

                         g_Render:CircleFilled(screenpos, 5, 15, self.render_stuff[startname][temp_fov_name].circle_color)
                         g_Render:Circle(screenpos, 5, 15, Color.new(0.1, 0.1, 0.1, self.render_stuff[startname][temp_fov_name].global_alpha))
                    end

                    if(bestlength < nade_type_size.x) then bestlength = nade_type_size.x end

                    if(distance < 400.0 and (temp_nade and temp_nade == startspot or temp_nade == nil or lua_elements.nade_helper:GetBool() == false)) then
                         self.render_stuff[startname].box_length = math_helpers:lerp(self.render_stuff[startname].box_length, bestlength, g_GlobalVars.frametime * 20.0)
                         self.render_stuff[startname].box_height = math_helpers:lerp(self.render_stuff[startname].box_height, num_spots * 16 + 12, g_GlobalVars.frametime * 20.0)
                         self.render_stuff[startname].icon_alpha = math_helpers:lerp(self.render_stuff[startname].icon_alpha, 0.0, g_GlobalVars.frametime * 20.0)
                         self.render_stuff[startname].box_additions_alpha = math_helpers:lerp(self.render_stuff[startname].box_additions_alpha, self.render_stuff[startname].global_alpha, g_GlobalVars.frametime * 20.0)
                         if(bestlength - self.render_stuff[startname].box_length < 0.1) then
                         self.render_stuff[startname].box_additions_alpha = math_helpers:lerp(self.render_stuff[startname].box_additions_alpha, self.render_stuff[startname].global_alpha, g_GlobalVars.frametime * 20.0)
                         self.render_stuff[startname].text_alpha = math_helpers:lerp(self.render_stuff[startname].text_alpha, self.render_stuff[startname].global_alpha, g_GlobalVars.frametime * 20.0)
                         end
                    elseif(distance > 400 or (temp_nade and temp_nade ~= startspot)) then
                         self.render_stuff[startname].text_alpha = math_helpers:lerp(self.render_stuff[startname].text_alpha, 0.0, g_GlobalVars.frametime * 20.0)
                         if(self.render_stuff[startname].text_alpha < 0.01) then
                         self.render_stuff[startname].box_additions_alpha = math_helpers:lerp(self.render_stuff[startname].box_additions_alpha, 0.0, g_GlobalVars.frametime * 20.0)
                         self.render_stuff[startname].icon_alpha = math_helpers:lerp(self.render_stuff[startname].icon_alpha, self.render_stuff[startname].global_alpha, g_GlobalVars.frametime * 20.0)
                         self.render_stuff[startname].box_length = math_helpers:lerp(self.render_stuff[startname].box_length, 16, g_GlobalVars.frametime * 20.0)
                         self.render_stuff[startname].box_height = math_helpers:lerp(self.render_stuff[startname].box_height, 16, g_GlobalVars.frametime * 20.0)
                         end
                    end

                    g_Render:BoxFilled(Vector2.new(screenpos.x - self.render_stuff[startname].box_length / 2 - 3, screenpos.y + 1), Vector2.new(screenpos.x + self.render_stuff[startname].box_length / 2 + 3, screenpos.y - self.render_stuff[startname].box_height - 3), Color.new(color_set.body_r, color_set.body_g, color_set.body_b, 0.95 * self.render_stuff[startname].global_alpha)) -- тело
                    g_Render:BoxFilled(Vector2.new(screenpos.x - self.render_stuff[startname].box_length / 2 - 3, screenpos.y - self.render_stuff[startname].box_height + 12), Vector2.new(screenpos.x + self.render_stuff[startname].box_length / 2 + 3, screenpos.y - self.render_stuff[startname].box_height - 4), Color.new(color_set.head_r, color_set.head_g, color_set.head_b, self.render_stuff[startname].box_additions_alpha)) -- рамка
                    g_Render:Text(self.nade_type[tostring(weapon_id)], Vector2.new(screenpos.x - nade_type_size.x / 2, screenpos.y - self.render_stuff[startname].box_height + 12 - nade_type_size.y), Color.new(color_set.text_color_r, color_set.text_color_g, color_set.text_color_b, self.render_stuff[startname].text_alpha), 14)
                    g_Render:BoxFilled(Vector2.new(screenpos.x - self.render_stuff[startname].box_length / 2 - 3, screenpos.y - self.render_stuff[startname].box_height + 12), Vector2.new(screenpos.x + self.render_stuff[startname].box_length / 2 + 3, screenpos.y - self.render_stuff[startname].box_height + 13), Color.new(color_set.gradient_line_r, color_set.gradient_line_g, color_set.gradient_line_b, self.render_stuff[startname].box_additions_alpha)) -- градиент

                    g_Render:Box(Vector2.new(screenpos.x - self.render_stuff[startname].box_length / 2 - 3, screenpos.y + 1), Vector2.new(screenpos.x + self.render_stuff[startname].box_length / 2 + 3, screenpos.y - self.render_stuff[startname].box_height - 3), Color.new(0.1, 0.15, 0.2, self.render_stuff[startname].global_alpha))

                    local icon_size = g_Render:CalcWeaponIconSize(weapon_id, 20)
                    g_Render:WeaponIcon(weapon_id, Vector2.new(screenpos.x - icon_size.x / 2, screenpos.y - icon_size.y - 1), Color.new(color_set.text_color_r, color_set.text_color_g, color_set.text_color_b, self.render_stuff[startname].icon_alpha), 20)
                 
                    num_spots = 0
                    for endname, endspot in pairs(startspot) do
                         if(type(endspot) == "table") then
                         local name_size = g_Render:CalcTextSize(endname, 14)
                         g_Render:Text(endname, Vector2.new(screenpos.x - name_size.x / 2, screenpos.y - (15 * num_spots) - name_size.y), Color.new(color_set.text_color_r, color_set.text_color_g, color_set.text_color_b, self.render_stuff[startname].text_alpha), 14)
                         num_spots = num_spots + 1
                         end
                    end
                    ::continue::
               end
          end

          for i = 1, 10 do
               if(self.custom_maps[i] and lua_elements.nade_helper_types:GetBool(i) == true) then
                    for startname, startspot in pairs(self.custom_maps[i]) do
                         if(lua_elements.nade_helper_types:GetBool(i) == false or lua_elements.nade_helper_nades:GetBool(self.menu_nades[tostring(weapon_id)]) == false or startspot.map ~= map or tostring(weapon_id) ~= startspot.type) then goto continue end
                         if(self.render_stuff[startname] == nil) then self.render_stuff[startname] = {} end
                         if(self.render_stuff[startname].global_alpha == nil) then self.render_stuff[startname].global_alpha = 0.0 end
                         if(self.render_stuff[startname].box_length == nil) then self.render_stuff[startname].box_length = 30.0 end
                         if(self.render_stuff[startname].box_height == nil) then self.render_stuff[startname].box_height = 30.0 end
                         if(self.render_stuff[startname].text_alpha == nil) then self.render_stuff[startname].text_alpha = 0.0 end
                         if(self.render_stuff[startname].icon_alpha == nil) then self.render_stuff[startname].icon_alpha = 0.0 end
                         if(self.render_stuff[startname].box_additions_alpha == nil) then self.render_stuff[startname].box_additions_alpha = 0.0 end
 
                         local distance = vecOrigin:DistTo(startspot.pos)
                         if(distance > 1750.0) then
                              self.render_stuff[startname].global_alpha = math_helpers:lerp(self.render_stuff[startname].global_alpha, 0.0, g_GlobalVars.frametime * 20.0)
                         else
                              local trace = g_EngineTrace:TraceRay(vecEyePosition, startspot.pos, localplayer, 0x200400B)
                              if(trace.fraction > 0.98) then
                                   if(distance > 1250.0) then
                                        self.render_stuff[startname].global_alpha = math_helpers:lerp(self.render_stuff[startname].global_alpha, 0.4, g_GlobalVars.frametime * 20.0)
                                   elseif(distance < 5.0) then
                                        self.render_stuff[startname].global_alpha = math_helpers:lerp(self.render_stuff[startname].global_alpha, 1.0, g_GlobalVars.frametime * 20.0)
                                   else
                                        self.render_stuff[startname].global_alpha = math_helpers:lerp(self.render_stuff[startname].global_alpha, 0.8, g_GlobalVars.frametime * 20.0)
                                   end
                              else
                                   self.render_stuff[startname].global_alpha = math_helpers:lerp(self.render_stuff[startname].global_alpha, 0.0, g_GlobalVars.frametime * 20.0)
                              end
                         end
 
                         if(self.render_stuff[startname].global_alpha < 0.01) then goto continue end
 
                         local screenpos = g_Render:ScreenPosition(Vector.new(startspot.pos.x, startspot.pos.y, startspot.pos.z + 10.0))
                         local nade_type_size = g_Render:CalcTextSize(self.nade_type[tostring(weapon_id)], 14)
                         local bestlength = 0
                         local num_spots = 0
                         local temp_fov_nade = nil
                         local temp_fov_name = nil
                         local bestfov = lua_elements.nade_helper_fov:GetInt()
 
                         for endname, endspot in pairs(startspot) do
                              if(type(endspot) == "table") then
                              local name_size = g_Render:CalcTextSize(endname, 14)
                              if(name_size.x > bestlength) then bestlength = name_size.x end
 
                              if(self.render_stuff[startname][endname] == nil) then self.render_stuff[startname][endname] = {} end
                              if(self.render_stuff[startname][endname].global_alpha == nil) then self.render_stuff[startname][endname].global_alpha = 0.0 end
                              if(self.render_stuff[startname][endname].box_length == nil) then self.render_stuff[startname][endname].box_length = 10.0 end
                              if(self.render_stuff[startname][endname].text_alpha == nil) then self.render_stuff[startname][endname].text_alpha = 0.0 end
                              if(self.render_stuff[startname][endname].circle_color == nil) then self.render_stuff[startname][endname].circle_color = Color.new(0.15, 0.15, 0.15, 0.0) end
                              if(self.render_stuff[startname][endname].description_box_height == nil) then self.render_stuff[startname][endname].description_box_height = 0.0 end
                              if(self.render_stuff[startname][endname].description_text_alpha == nil) then self.render_stuff[startname][endname].description_text_alpha = 0.0 end
                 
                              if(endspot.endposition == nil) then
                                   local vecStart = Vector.new(startspot.pos.x, startspot.pos.y, startspot.pos.z + 64.0)
                                   local forward = cheat.AngleToForward(endspot.ang)
                                   local vecEnd = Vector.new(vecStart.x + 800.0 * forward.x, vecStart.y + 800.0 * forward.y, vecStart.z + 800.0 * forward.z)
                                   local trace = g_EngineTrace:TraceRay(vecStart, vecEnd, localplayer, 0x46004003)
                                   endspot.endposition = Vector.new(trace.endpos.x, trace.endpos.y, trace.endpos.z)
                              end
                              if(endspot.jumpthresthold == nil) then
                                   endspot.jumpthresthold = 0
                              end
                              if(endspot.movedirection == nil) then
                                   endspot.movedirection = 0
                              end
                              if(endspot.backupdirection == nil) then
                                   endspot.backupdirection = 0
                              end
                              if(endspot.backupduration == nil) then
                                   endspot.backupduration = 1
                              end
                              if(endspot.extendforward == nil) then
                                   endspot.extendforward = false
                              end
                 
                              local angles = math_helpers:normalizeangles(math_helpers:calcangle(vecEyePosition, endspot.endposition))
                              local fov = math.sqrt((angles.pitch - angViewAngles.pitch) ^ 2 + (angles.yaw - angViewAngles.yaw) ^ 2)
                              fov = math_helpers:normalizefloat(fov)
                              fov = math.abs(fov)
                 
                              if(fov < bestfov and distance <= 50.0 and startspot == temp_nade) then
                                   bestfov = fov
                                   temp_fov_nade = endspot
                                   temp_fov_name = endname
                                   if(self.should_throw == false) then self.closest_nade = endspot end
                              end
                              num_spots = num_spots + 1
                              end
                         end
 
                         for endname, endspot in pairs(startspot) do
                              if(type(endspot) ~= "table" or endspot == temp_fov_nade) then goto continue end
           
                              local screenpos = g_Render:ScreenPosition(endspot.endposition)
                              local name_size = g_Render:CalcTextSize(endname, 14)
           
                              local r = math_helpers:lerp(self.render_stuff[startname][endname].circle_color:r(), 0.3, g_GlobalVars.frametime * 15.0)
                              local g = math_helpers:lerp(self.render_stuff[startname][endname].circle_color:g(), 0.3, g_GlobalVars.frametime * 15.0)
                              local b = math_helpers:lerp(self.render_stuff[startname][endname].circle_color:b(), 0.3, g_GlobalVars.frametime * 15.0)
 
                              local desired_box_length = name_size.x + 20
 
                              if(endspot.description and string.len(endspot.description) > 0) then
                              local desc_size = g_Render:CalcTextSize(endspot.description, 11)
                              desired_box_height = 16
                              if(self.render_stuff[startname][endname].description_text_alpha > 0.01) then desired_box_length = math.max(desired_box_length, desc_size.x) end
                              end
 
                              self.render_stuff[startname][endname].description_text_alpha = math_helpers:lerp(self.render_stuff[startname][endname].description_text_alpha, 0.0, g_GlobalVars.frametime * 60.0)
 
                              if(distance > 50.0 or startspot ~= temp_nade) then
                              self.render_stuff[startname][endname].text_alpha = math_helpers:lerp(self.render_stuff[startname][endname].text_alpha, 0.0, g_GlobalVars.frametime * 60.0)
                              if(self.render_stuff[startname][endname].text_alpha < 0.01) then
                                   self.render_stuff[startname][endname].box_length = math_helpers:lerp(self.render_stuff[startname][endname].box_length, 10.0, g_GlobalVars.frametime * 30.0)
                                   self.render_stuff[startname][endname].description_box_height = math_helpers:lerp(self.render_stuff[startname][endname].description_box_height, 0.0, g_GlobalVars.frametime * 30.0)
                                   if(self.render_stuff[startname][endname].box_length - 10.0 < 0.1 and self.render_stuff[startname][endname].description_box_height < 0.1) then
                                        self.render_stuff[startname][endname].global_alpha = math_helpers:lerp(self.render_stuff[startname][endname].global_alpha, 0.0, g_GlobalVars.frametime * 60.0)
                                   end
                              end
                              else
                              if(screenpos.x + self.render_stuff[startname][endname].box_length + 2 > lua_elements.screensize.x or screenpos.x < 12 or screenpos.y + 10 > lua_elements.screensize.y or screenpos.y < 10) then
                                   self.render_stuff[startname][endname].global_alpha = math_helpers:lerp(self.render_stuff[startname][endname].global_alpha, 1.0, g_GlobalVars.frametime * 60.0)
                              else
                                   self.render_stuff[startname][endname].global_alpha = math_helpers:lerp(self.render_stuff[startname][endname].global_alpha, 0.6, g_GlobalVars.frametime * 60.0)
                              end
                              if(self.render_stuff[startname][endname].global_alpha > 0.58) then
                                   self.render_stuff[startname][endname].box_length = math_helpers:lerp(self.render_stuff[startname][endname].box_length, desired_box_length, g_GlobalVars.frametime * 30.0)
                                   if(desired_box_length - self.render_stuff[startname][endname].box_length < 0.1) then
                                        self.render_stuff[startname][endname].text_alpha = math_helpers:lerp(self.render_stuff[startname][endname].text_alpha, self.render_stuff[startname][endname].global_alpha, g_GlobalVars.frametime * 60.0)
                                        if(self.render_stuff[startname][endname].description_text_alpha < 0.01) then
                                             self.render_stuff[startname][endname].description_box_height = math_helpers:lerp(self.render_stuff[startname][endname].description_box_height, 0.0, g_GlobalVars.frametime * 60.0)
                                        end
                                   end
                              end
                              end
                              self.render_stuff[startname][endname].circle_color = Color.new(r, g, b, self.render_stuff[startname][endname].global_alpha)
                              if(self.render_stuff[startname][endname].global_alpha < 0.01) then goto continue end
 
                              if(screenpos.x + self.render_stuff[startname][endname].box_length + 2 > lua_elements.screensize.x or screenpos.x < 12 or screenpos.y + 10 > lua_elements.screensize.y or screenpos.y < 10) then
                                   local vecdelta = Vector2.new(screenpos.x - screencenter.x, screenpos.y - screencenter.y)
                                   local length = #vecdelta
                                   local cos = vecdelta.x / length
                                   local sin = vecdelta.y / length
                                   local max_legnth = #screencenter
 
                                   local newpos = Vector2.new(screencenter.x + max_legnth * cos, screencenter.y + max_legnth * sin)
                                   if(newpos.x + self.render_stuff[startname][endname].box_length > lua_elements.screensize.x) then newpos.x = lua_elements.screensize.x - self.render_stuff[startname][endname].box_length - 18
                                   elseif(newpos.x < 16) then newpos.x = 28 end
                                   if(newpos.y + 16 > lua_elements.screensize.y) then newpos.y = lua_elements.screensize.y - 28
                                   elseif(newpos.y < 16) then newpos.y = 28 end
 
                                   screenpos = newpos
                              end
                              g_Render:BoxFilled(Vector2.new(screenpos.x - 10, screenpos.y - 8), Vector2.new(screenpos.x + self.render_stuff[startname][endname].box_length, screenpos.y + 8), Color.new(color_set.target_r, color_set.target_g, color_set.target_b, self.render_stuff[startname][endname].global_alpha))
                              g_Render:Text(endname, Vector2.new(screenpos.x + 10, screenpos.y - name_size.y / 2), Color.new(color_set.text_color_r, color_set.text_color_g, color_set.text_color_b, self.render_stuff[startname][endname].text_alpha), 14)
                              g_Render:BoxFilled(Vector2.new(screenpos.x - 10, screenpos.y + 8), Vector2.new(screenpos.x + self.render_stuff[startname][endname].box_length, screenpos.y + 8 + self.render_stuff[startname][endname].description_box_height), Color.new(color_set.body_r, color_set.body_g, color_set.body_b, self.render_stuff[startname][endname].global_alpha))
 
                              g_Render:CircleFilled(screenpos, 5, 15, self.render_stuff[startname][endname].circle_color)
                              g_Render:Circle(screenpos, 5, 15, Color.new(0.1, 0.1, 0.1, self.render_stuff[startname][endname].global_alpha))
           
                              ::continue::
                         end
 
                         if(temp_fov_nade) then
                              local screenpos = g_Render:ScreenPosition(temp_fov_nade.endposition)
                              local name_size = g_Render:CalcTextSize(temp_fov_name, 14)
                 
                              local r = math_helpers:lerp(self.render_stuff[startname][temp_fov_name].circle_color:r(), 0.01, g_GlobalVars.frametime * 15.0)
                              local g = math_helpers:lerp(self.render_stuff[startname][temp_fov_name].circle_color:g(), 0.65, g_GlobalVars.frametime * 15.0)
                              local b = math_helpers:lerp(self.render_stuff[startname][temp_fov_name].circle_color:b(), 0.96, g_GlobalVars.frametime * 15.0)
 
                              self.render_stuff[startname][temp_fov_name].global_alpha = math_helpers:lerp(self.render_stuff[startname][temp_fov_name].global_alpha, 0.9, g_GlobalVars.frametime * 30.0)
                              self.render_stuff[startname][temp_fov_name].circle_color = Color.new(r, g, b, self.render_stuff[startname][temp_fov_name].global_alpha)
 
                              local desired_box_length = name_size.x + 20
                              local desired_box_height = 0
                           
                              if(temp_fov_nade.description and string.len(temp_fov_nade.description) > 0) then
                                   local desc_size = g_Render:CalcTextSize(temp_fov_nade.description, 11)
                                   desired_box_height = 16
                                   if(desc_size.x > desired_box_length) then desired_box_length = math.max(desired_box_length, desc_size.x) end
                              end
 
                              if(self.render_stuff[startname][temp_fov_name].global_alpha > 0.88) then
                                   self.render_stuff[startname][temp_fov_name].box_length = math_helpers:lerp(self.render_stuff[startname][temp_fov_name].box_length, desired_box_length, g_GlobalVars.frametime * 30.0)
                                   self.render_stuff[startname][temp_fov_name].description_box_height = math_helpers:lerp(self.render_stuff[startname][temp_fov_name].description_box_height, desired_box_height, g_GlobalVars.frametime * 30.0)
                                   if(desired_box_length - self.render_stuff[startname][temp_fov_name].box_length < 0.1 and desired_box_height - self.render_stuff[startname][temp_fov_name].description_box_height < 0.1) then
                                        self.render_stuff[startname][temp_fov_name].text_alpha = math_helpers:lerp(self.render_stuff[startname][temp_fov_name].text_alpha, 1.0, g_GlobalVars.frametime * 30.0)
                                        self.render_stuff[startname][temp_fov_name].description_text_alpha = math_helpers:lerp(self.render_stuff[startname][temp_fov_name].description_text_alpha, 1.0, g_GlobalVars.frametime * 30.0)
                                   end
                              end
 
                              if(screenpos.x + self.render_stuff[startname][temp_fov_name].box_length + 2 > lua_elements.screensize.x or screenpos.x < 12 or screenpos.y + 10 > lua_elements.screensize.y or screenpos.y < 10) then
                                   local vecdelta = Vector2.new(screenpos.x - screencenter.x, screenpos.y - screencenter.y)
                                   local length = #vecdelta
                                   local cos = vecdelta.x / length
                                   local sin = vecdelta.y / length
                                   local max_legnth = #screencenter
 
                                   local newpos = Vector2.new(screencenter.x + max_legnth * cos, screencenter.y + max_legnth * sin)
                                   if(newpos.x + self.render_stuff[startname][temp_fov_name].box_length > lua_elements.screensize.x) then newpos.x = lua_elements.screensize.x - self.render_stuff[startname][temp_fov_name].box_length - 18
                                   elseif(newpos.x < 16) then newpos.x = 28 end
                                   if(newpos.y + 16 > lua_elements.screensize.y) then newpos.y = lua_elements.screensize.y - 28
                                   elseif(newpos.y < 16) then newpos.y = 28 end
 
                                   screenpos = newpos
                              end
 
                              g_Render:BoxFilled(Vector2.new(screenpos.x - 10, screenpos.y - 8), Vector2.new(screenpos.x + self.render_stuff[startname][temp_fov_name].box_length, screenpos.y + 8), Color.new(color_set.target_r, color_set.target_g, color_set.target_b, self.render_stuff[startname][temp_fov_name].global_alpha))
                              g_Render:Text(temp_fov_name, Vector2.new(screenpos.x + 10, screenpos.y - name_size.y / 2), Color.new(color_set.text_color_r, color_set.text_color_g, color_set.text_color_b, self.render_stuff[startname][temp_fov_name].text_alpha), 14)
                              g_Render:BoxFilled(Vector2.new(screenpos.x - 10, screenpos.y + 8), Vector2.new(screenpos.x + self.render_stuff[startname][temp_fov_name].box_length, screenpos.y + 8 + self.render_stuff[startname][temp_fov_name].description_box_height), Color.new(color_set.body_r, color_set.body_g, color_set.body_b, self.render_stuff[startname][temp_fov_name].global_alpha))
 
                              if(temp_fov_nade.description and string.len(temp_fov_nade.description) > 0) then
                                   local desc_size = g_Render:CalcTextSize(temp_fov_nade.description, 11)
                                   g_Render:BoxFilled(Vector2.new(screenpos.x - 10, screenpos.y + 8), Vector2.new(screenpos.x + self.render_stuff[startname][temp_fov_name].box_length, screenpos.y + 9), Color.new(color_set.gradient_line_r, color_set.gradient_line_g, color_set.gradient_line_b, self.render_stuff[startname][temp_fov_name].global_alpha))
                                   g_Render:Text(temp_fov_nade.description, Vector2.new(screenpos.x - 5, screenpos.y + 8 + self.render_stuff[startname][temp_fov_name].description_box_height / 2 - desc_size.y / 2), Color.new(color_set.text_color_r, color_set.text_color_g, color_set.text_color_b, self.render_stuff[startname][temp_fov_name].description_text_alpha), 11)
                              end
 
                              g_Render:CircleFilled(screenpos, 5, 15, self.render_stuff[startname][temp_fov_name].circle_color)
                              g_Render:Circle(screenpos, 5, 15, Color.new(0.1, 0.1, 0.1, self.render_stuff[startname][temp_fov_name].global_alpha))
                         end
 
                         if(bestlength < nade_type_size.x) then bestlength = nade_type_size.x end
 
                         if(distance < 400.0 and (temp_nade and temp_nade == startspot or temp_nade == nil or lua_elements.nade_helper:GetBool() == false)) then
                              self.render_stuff[startname].box_length = math_helpers:lerp(self.render_stuff[startname].box_length, bestlength, g_GlobalVars.frametime * 20.0)
                              self.render_stuff[startname].box_height = math_helpers:lerp(self.render_stuff[startname].box_height, num_spots * 16 + 12, g_GlobalVars.frametime * 20.0)
                              self.render_stuff[startname].icon_alpha = math_helpers:lerp(self.render_stuff[startname].icon_alpha, 0.0, g_GlobalVars.frametime * 20.0)
                              self.render_stuff[startname].box_additions_alpha = math_helpers:lerp(self.render_stuff[startname].box_additions_alpha, self.render_stuff[startname].global_alpha, g_GlobalVars.frametime * 20.0)
                              if(bestlength - self.render_stuff[startname].box_length < 0.1) then
                              self.render_stuff[startname].box_additions_alpha = math_helpers:lerp(self.render_stuff[startname].box_additions_alpha, self.render_stuff[startname].global_alpha, g_GlobalVars.frametime * 20.0)
                              self.render_stuff[startname].text_alpha = math_helpers:lerp(self.render_stuff[startname].text_alpha, self.render_stuff[startname].global_alpha, g_GlobalVars.frametime * 20.0)
                              end
                         elseif(distance > 400 or (temp_nade and temp_nade ~= startspot)) then
                              self.render_stuff[startname].text_alpha = math_helpers:lerp(self.render_stuff[startname].text_alpha, 0.0, g_GlobalVars.frametime * 20.0)
                              if(self.render_stuff[startname].text_alpha < 0.01) then
                              self.render_stuff[startname].box_additions_alpha = math_helpers:lerp(self.render_stuff[startname].box_additions_alpha, 0.0, g_GlobalVars.frametime * 20.0)
                              self.render_stuff[startname].icon_alpha = math_helpers:lerp(self.render_stuff[startname].icon_alpha, self.render_stuff[startname].global_alpha, g_GlobalVars.frametime * 20.0)
                              self.render_stuff[startname].box_length = math_helpers:lerp(self.render_stuff[startname].box_length, 16, g_GlobalVars.frametime * 20.0)
                              self.render_stuff[startname].box_height = math_helpers:lerp(self.render_stuff[startname].box_height, 16, g_GlobalVars.frametime * 20.0)
                              end
                         end
 
                         g_Render:BoxFilled(Vector2.new(screenpos.x - self.render_stuff[startname].box_length / 2 - 3, screenpos.y + 1), Vector2.new(screenpos.x + self.render_stuff[startname].box_length / 2 + 3, screenpos.y - self.render_stuff[startname].box_height - 3), Color.new(color_set.body_r, color_set.body_g, color_set.body_b, 0.95 * self.render_stuff[startname].global_alpha)) -- тело
                         g_Render:BoxFilled(Vector2.new(screenpos.x - self.render_stuff[startname].box_length / 2 - 3, screenpos.y - self.render_stuff[startname].box_height + 12), Vector2.new(screenpos.x + self.render_stuff[startname].box_length / 2 + 3, screenpos.y - self.render_stuff[startname].box_height - 4), Color.new(color_set.head_r, color_set.head_g, color_set.head_b, self.render_stuff[startname].box_additions_alpha)) -- рамка
                         g_Render:Text(self.nade_type[tostring(weapon_id)], Vector2.new(screenpos.x - nade_type_size.x / 2, screenpos.y - self.render_stuff[startname].box_height + 12 - nade_type_size.y), Color.new(color_set.text_color_r, color_set.text_color_g, color_set.text_color_b, self.render_stuff[startname].text_alpha), 14)
                         g_Render:BoxFilled(Vector2.new(screenpos.x - self.render_stuff[startname].box_length / 2 - 3, screenpos.y - self.render_stuff[startname].box_height + 12), Vector2.new(screenpos.x + self.render_stuff[startname].box_length / 2 + 3, screenpos.y - self.render_stuff[startname].box_height + 13), Color.new(color_set.gradient_line_r, color_set.gradient_line_g, color_set.gradient_line_b, self.render_stuff[startname].box_additions_alpha)) -- градиент
 
                         g_Render:Box(Vector2.new(screenpos.x - self.render_stuff[startname].box_length / 2 - 3, screenpos.y + 1), Vector2.new(screenpos.x + self.render_stuff[startname].box_length / 2 + 3, screenpos.y - self.render_stuff[startname].box_height - 3), Color.new(0.1, 0.15, 0.2, self.render_stuff[startname].global_alpha))
 
                         local icon_size = g_Render:CalcWeaponIconSize(weapon_id, 20)
                         g_Render:WeaponIcon(weapon_id, Vector2.new(screenpos.x - icon_size.x / 2, screenpos.y - icon_size.y - 1), Color.new(color_set.text_color_r, color_set.text_color_g, color_set.text_color_b, self.render_stuff[startname].icon_alpha), 20)
                     
                         num_spots = 0
                         for endname, endspot in pairs(startspot) do
                              if(type(endspot) == "table") then
                              local name_size = g_Render:CalcTextSize(endname, 14)
                              g_Render:Text(endname, Vector2.new(screenpos.x - name_size.x / 2, screenpos.y - (15 * num_spots) - name_size.y), Color.new(color_set.text_color_r, color_set.text_color_g, color_set.text_color_b, self.render_stuff[startname].text_alpha), 14)
                              num_spots = num_spots + 1
                              end
                         end
                         ::continue::
                    end
               end
          end
     end,

     on_pre_prediction = function(self, cmd)
          self:backup_strafe(cmd)
          self:extend_forward(cmd)
          if(self.should_throw == true) then
               if(self.closest_nade.duck == true) then cmd.buttons = bit.bor(cmd.buttons, 4)
               else cmd.buttons = bit.band(cmd.buttons, bit.bnot(4)) end
          end
     end,

     on_prediction = function(self, cmd)
          self:update_configs()
          local localplayer = g_EntityList:GetClientEntity(g_EngineClient:GetLocalPlayer())
          if(localplayer == nil) then return end
          localplayer = localplayer:GetPlayer()
          local velocity = Vector.new(localplayer:GetProp("DT_BasePlayer", "m_vecVelocity[0]"), localplayer:GetProp("DT_BasePlayer", "m_vecVelocity[1]"), localplayer:GetProp("DT_BasePlayer", "m_vecVelocity[2]"))
          local weapon = localplayer:GetActiveWeapon()
          if(weapon == nil) then return end
          --print(self.old_doubletap, self.doubletap_call)
          if(weapon:IsGrenade() == false) then
               if(self.doubletap_call == true) then
                    self.old_doubletap = menu_elements.double_tap:GetBool()
                    menu_elements.double_tap:SetBool(false)
                    self.doubletap_call = false
               end
               return
          else
               if(self.doubletap_call == false) then
                    menu_elements.double_tap:SetBool(self.old_doubletap)
                    self.doubletap_call = true
               end
          end
          local throwtime = weapon:GetProp("DT_BaseCSGrenade", "m_fThrowTime")
          local duckamount = localplayer:GetProp("DT_BasePlayer", "m_flDuckAmount")
          local throwstrengh = weapon:GetProp("DT_BaseCSGrenade", "m_flThrowStrength")
          if(self.should_throw == true) then
               cmd.buttons = bit.bor(cmd.buttons, 1)
               if(self.closest_nade.duck == true and duckamount ~= 1.0) then return end
               if(self.closest_nade.duck == false and duckamount ~= 0.0) then return end
               if(self.closest_nade.strength ~= 1.0 and throwstrengh > self.closest_nade.strength) then cmd.buttons = bit.bor(cmd.buttons, 2048); cmd.buttons = bit.band(cmd.buttons, bit.bnot(1)); return end
               if(throwstrengh < self.closest_nade.strength) then cmd.buttons = bit.bor(cmd.buttons, 1) end
               if(self.run_tick == 0) then self.run_tick = cmd.tick_count end
               if(self.closest_nade.runduration > 0 and self.force_forward == false) then
                    local speedfactor = 1.0
                    if(self.closest_nade.duck) then speedfactor = 2.93 end
                    local movedirection = cmd.viewangles.yaw - (self.closest_nade.ang.yaw + self.movedirections[self.closest_nade.movedirection])
                    local move = cheat.AngleToForward(QAngle.new(0, movedirection, 0))
                    cmd.forwardmove = (move.x) * (self.closest_nade.speed * speedfactor)
                    cmd.sidemove = (move.y) * (self.closest_nade.speed * speedfactor)
               end
               if(cmd.tick_count - self.run_tick >= self.closest_nade.runduration) then
                    if(self.jump_tick == 0) then self.jump_tick = cmd.tick_count end
                    if(self.closest_nade.jump and self.closest_nade.jumpthresthold <= 0) then
                         cmd.buttons = bit.bor(cmd.buttons, 2)
                    end
                    if(cmd.tick_count - self.jump_tick >= self.closest_nade.jumpduration or self.closest_nade.jumpthresthold > 0) then
                         cmd.buttons = bit.band(cmd.buttons, bit.bnot(1))
                         cmd.buttons = bit.band(cmd.buttons, bit.bnot(2048))
                         cmd.viewangles = self.closest_nade.ang
                         self.force_forward = self.closest_nade.extendforward
                    end
                    if(self.closest_nade.jumpthresthold > 0 and cmd.tick_count - self.jump_tick >= self.closest_nade.jumpthresthold) then
                         cmd.buttons = bit.bor(cmd.buttons, 2)
                    end
               end
               if(throwtime > 0.0 and throwtime < g_GlobalVars.curtime) then
                    self:setup_backup_strafe(cmd)
                    self.closest_nade = nil
                    self.closest_nade_position = nil
                    self.should_throw = false
                    self.run_tick = 0
                    self.jump_tick = 0
                    self.force_forward = false
                    menu_elements.autostrafe:SetBool(self.old_autostrafe)
                    fakelag:ForceSend()
               end
          elseif(self.closest_nade_position and lua_elements.nade_helper:GetBool() == true) then
               cmd.buttons = bit.band(cmd.buttons, bit.bnot(2048))
               local origin = localplayer:GetProp("DT_BaseEntity", "m_vecOrigin")
               local onground = (bit.band(localplayer:GetProp("DT_BasePlayer", "m_fFlags"), 1) == 1)
               local delta = (self.closest_nade_position - origin)
               local length = #delta
               if(onground == true and length < 100.0) then
                    local viewangles = g_EngineClient:GetViewAngles()
                    local direction = cheat.VectorToAngle(delta)
                    direction.yaw = viewangles.yaw - direction.yaw
                    local move = cheat.AngleToForward(direction)
                    local v1 = bit.band(cmd.buttons, 8) == 8
                    local v2 = bit.band(cmd.buttons, 16) == 16
                    local v3 = bit.band(cmd.buttons, 512) == 512
                    local v4 = bit.band(cmd.buttons, 1024) == 1024
                    local in_duck = bit.band(cmd.buttons, 4) == 4
                    local in_move = (v1 or v2 or v3 or v4)
                    if(in_move == false and length > 0.1) then
                        cmd.forwardmove = move.x * (450.0 * (math.exp(math_helpers:clamp(length, 0.0, 5.0) - 5.0)) + 1.0)
                        cmd.sidemove = move.y * (450.0 * (math.exp(math_helpers:clamp(length, 0.0, 5.0) - 5.0)) + 1.0)
                        if(in_duck == true) then
                              cmd.forwardmove = cmd.forwardmove * 2.93
                              cmd.sidemove = cmd.sidemove * 2.93
                        end
                    elseif(weapon:GetProp("DT_BaseCSGrenade", "m_bPinPulled") == 1 and self.closest_nade and velocity:Length2D() < 10.0) then
                         self.should_throw = true
                         self.old_autostrafe = menu_elements.autostrafe:GetBool()
                         menu_elements.autostrafe:SetBool(false)
                    end
               end
          end
     end,
}

local function on_firebullet(shot)
end

local function on_ragebotshot(shot)
end

local function on_event(event)
end

local function on_pre_prediction(cmd)
     grenade_helper:on_pre_prediction(cmd)
end

local function on_overrideview(setup)

end

local function on_draw()
     lua_elements.screensize = g_EngineClient:GetScreenSize()
     grenade_helper:on_draw()


     if skin_colors:GetInt() == 0 then
          skin_choice = 0
      elseif skin_colors:GetInt() == 1 then
          skin_choice = 1
      elseif skin_colors:GetInt() == 2 then
          skin_choice = 2
      elseif skin_colors:GetInt() == 3 then
          skin_choice = 3
      elseif skin_colors:GetInt() == 4 then
          skin_choice = 4
      elseif skin_colors:GetInt() == 5 then
          skin_choice = 5
      end
      skin_color:SetInt(skin_choice)


     if premium_img:GetBool() then
             g_Render:Image(image_loaded, Vector2.new(10, 450), image_size)
     end


     if clantag:GetBool() then
          local curtime = math.floor(g_GlobalVars.curtime)
          if old_time ~= curtime then
              set_clantag(animation[curtime % #animation+1], animation[curtime % #animation+1])
          end
          old_time = curtime
   
     end







     if render_indicators:GetBool() then
          local local_player_index    = g_EngineClient:GetLocalPlayer()                   -- Get our local player index
          local local_player          = g_EntityList:GetClientEntity(local_player_index)  -- Get the entity object for our local player
   
          if not local_player then
              return -- No real point rendering keybinds if the local player is invalid
          end
   
          local render_offset     = 10                     --  An offset for our render positions so strings don't render on top of each other
   
          local render_keybind    = function(bind)        -- Define a helper function that will actually render our keybinds
              if not bind:IsActive() then
                  return -- No point rendering a keybind that's not active
              end
   
              local bind_name             = bind:GetName()        -- Whatever our keybind's name is
              local bind_value            = bind:GetValue()       -- The value our keybind has when toggled
   
              local render_string         = string.format("%s - %s", bind_name, bind_value)   -- Format the values into a string
   
              local new_render_position   = Vector2.new(render_position.x, render_position.y + render_offset)
   
              local render_color
   
              if bind_value == "off" or bind_value == "Disabled" or bind_value == "0" then    --  If the bind is inactive...
                  render_color = color_inactive   --  The color we render our binds with will be whatever we have as the inactive color
              else                                                                            --  Otherwise,
                  render_color = color_active     --  The bind is active and we will be using the active color
              end
   
              g_Render:Text(render_string, new_render_position, render_color, 14, true)       --  Actually render our string
   
              render_offset = render_offset + 20  --  Offset our render position a bit
          end
   
          local binds = cheat.GetBinds()
          for i = 1, #binds do --  Iterate over our binds...
              render_keybind(binds[i])   --  And handle them using our render_keybind function
          end
       
     end
     
 
     --movement_helper:on_draw()
end




local function on_prediction(cmd)
     grenade_helper:on_prediction(cmd)
     --movement_helper:on_prediction(cmd)
end

local function on_registered_shot(shot)
end

local function on_destroy()
end

local function on_create_button()
     grenade_helper:on_create_nade()
end

local function on_remove_button()
     grenade_helper:on_remove_nade()
end

local function on_save_button()
     grenade_helper:on_save_nade()
end

local function on_teleport_button()
     grenade_helper:on_teleport_nade()
end

local function on_nade_update_button()
     grenade_helper:on_nade_update()
end

local function on_properties_combo()
     grenade_helper:on_properties()
end

local function on_backupdirection_combo()
     grenade_helper:on_backupstrafe()
end

local function on_run_direction_combo()
     if(lua_elements.run_direction:GetInt() > 0) then
          lua_elements.extend_forward_strenght:SetVisible(true)
     else
          lua_elements.extend_forward_strenght:SetVisible(false)
     end
end

local function check_sub()
    for name, element in pairs(lua_elements) do
         if(name == "user_name" or name == "screensize") then goto continue end
         element:SetVisible(false)
         ::continue::
    end

    return 0
end

local sub_state = check_sub()

if(sub_state == 0) then
    for name, element in pairs(lua_elements) do
         if(string.find(name, "nade_helper") ~= nil or name == "create_nade") then
              element:SetVisible(true)
         end
    end
    menu.Text("Main", "This nade helper is selfcoded by xkzdeek umad?")
 
    local predict_improved = menu.Switch("Misc", "Prediction Fix", false, "Improve the cheat prediction, very p100!")
local function on_create_move()
    -- @note: setup local


    local localplayer = g_EntityList:GetClientEntity(g_EngineClient:GetLocalPlayer())
    local player = localplayer:GetPlayer()
    -- @note: setup variables
    local strafe = player:GetProp('DT_CSPlayer', 'm_bStrafing')
    local anim = player:GetProp('DT_BaseAnimating', 'm_bClientSideAnimation')
    local tickbase = player:GetProp('DT_BasePlayer', 'm_nTickBase')
    local scoped = player:GetProp('DT_CSPlayer', 'm_bIsScoped')
    local flags = player:GetProp('DT_BasePlayer', 'm_fFlags')
    local pose_parameter = player:GetProp('DT_BaseAnimating', 'm_flPoseParameter')
    local vel_mod_fix = player:GetProp('DT_CSPlayer', 'm_flVelocityModifier')
    local sim_time = player:GetProp('DT_BaseEntity', 'm_flSimulationTime')
    -- @note: source_sdk/game/shared/ccsplayer.cpp#L1337
    local speed = global_vars.tickcount % 2
 
    -- @note: time to fix cheat
    g_GlobalVars.tickcount = -1
    g_GlobalVars.curtime = -1
    g_GlobalVars.interval_per_tick = -1
 
    if predict_improved:GetBool() then
        if speed > 0 then
            strafe:SetBool(false)
            anim:SetBool(false)
            tickbase:SetInt(1337)
            scoped:SetBool(true)
            flags:SetInt(0)
            pose_parameter:SetFloat(-1337)
            sim_time:SetFloat(-1337)
            -- @note: thx es0 for this <3
            vel_mod_fix:SetFloat(-1337)
        else
            strafe:SetBool(true)
            anim:SetBool(true)
            tickbase:SetInt(-1337)
            scoped:SetBool(false)
            flags:SetInt(-1)
            pose_parameter:SetFloat(1337)
            sim_time:SetFloat(1337)
            -- @note: source_sdk/game/shared/ccsplayer.cpp#L1568
            vel_mod_fix:SetFloat(1337)
        end
    end
 
end

     cheat.RegisterCallback("createmove", on_createmove)
    cheat.RegisterCallback("draw", on_draw)
    cheat.RegisterCallback("override_view", on_overrideview)
    cheat.RegisterCallback("fire_bullet", on_firebullet)
    cheat.RegisterCallback("ragebot_shot", on_ragebotshot)
    cheat.RegisterCallback("events", on_event)
    cheat.RegisterCallback("pre_prediction", on_pre_prediction)
    cheat.RegisterCallback("prediction", on_prediction)
    cheat.RegisterCallback("registered_shot", on_registered_shot)
    cheat.RegisterCallback("destroy", on_destroy)
    lua_elements.create_nade:RegisterCallback(on_create_button)
    lua_elements.remove_nade:RegisterCallback(on_remove_button)
    lua_elements.save_nade:RegisterCallback(on_save_button)
    lua_elements.nade_teleport:RegisterCallback(on_teleport_button)
    lua_elements.nade_update_pos_ang:RegisterCallback(on_nade_update_button)
    lua_elements.properties:RegisterCallback(on_properties_combo)
    lua_elements.backup_direction:RegisterCallback(on_backupdirection_combo)
    lua_elements.run_direction:RegisterCallback(on_run_direction_combo)
end

cheat.AddNotify("[Helper]", " Welcome " .. cheat.GetCheatUserName())
cheat.AddEvent("glhf.exe Activated")
