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
]]
ffi.C.CreateDirectoryA("nl\\GrenadeHelper", nil)
print("Grenade Helper | Fixed by injuan & TIEPCUK")
local Menu_elements =
{
     autostrafe = Menu.FindVar("Miscellaneous", "Main", "Movement", "Auto Strafe"),
     autostrafe_smooth = Menu.FindVar("Miscellaneous", "Main", "Movement", "Smoothing"),
     thirdpeson = Menu.FindVar("Visuals", "View", "Thirdperson", "Enable Thirdperson"),

     fake_angle = Menu.FindVar("Aimbot", "Anti Aim", "Fake Angle", "Enable Fake Angle"),
     double_tap = Menu.FindVar("Aimbot", "Ragebot", "Exploits", "Double Tap"),
     fakelag = Menu.FindVar("Aimbot", "Anti Aim", "Fake Lag", "Enable Fake Lag"),
}
local lua_elements =
{
     nade_helper = Menu.Switch("Grenade Helper", "Grenade Helper", false),
     nade_helper_nades = Menu.MultiCombo("Grenade Helper", "Нейды", {"HeGrenade", "Molotov", "Smoke", "FlashBang"}, 0),
     nade_helper_types = Menu.MultiCombo("Grenade Helper", "Пресеты", {"Custom: Alpha", "Original", "Custom: Bravo", "Custom: Charlie", "Custom: Delta", "Custom: Echo", "Custom: Foxtrot", "Custom: Golf", "Custom: Hotel", "Custom: India", "Custom: Juliet"}, 0),
     nade_helper_fov = Menu.SliderInt("Grenade Helper", "Фов", 15, 1, 160),

     create_nade = Menu.Button("Конструктор гранат", "Создать гранату"),

     pitch_slider = Menu.SliderFloat("Конструктор гранат", "Питч", 0, -89, 89),
     yaw_slider = Menu.SliderFloat("Конструктор гранат", "Яв", 0, -180, 180),
     throw_strengh = Menu.SliderFloat("Конструктор гранат", "Сила броска", 100, 0, 100),

     properties = Menu.MultiCombo("Конструктор гранат", "Характеристики", {"Бежать", "Прыгать", "Приседать"}, 0),

     run_duration = Menu.SliderInt("Конструктор гранат", "Продолжительность бега", 0, 0, 64),
     run_velocity = Menu.SliderFloat("Конструктор гранат", "Скорость бега", 0, 0, 450),
     run_direction = Menu.Combo("Конструктор гранат", "Направление бега", {"Вперед", "Назад", "Влево", "Вправо"}, 0),
     extend_forward_strenght = Menu.Switch("Конструктор гранат", "Внешняя передняя сила", false),
     backup_direction = Menu.Combo("Конструктор гранат", "Backup Direction", {"Нету", "Вперед", "Назад", "Влево", "Вправо"}, 0),
     backup_strafe_duration = Menu.SliderInt("Конструктор гранат", "Продолжительность резервного копирования", 1, 1, 64),

     jump_duration = Menu.SliderInt("Конструктор гранат", "Задержка прыжка", 0, 0, 64),
     jump_thresthold = Menu.SliderInt("Конструктор гранат", "Сила прыжка", 0, 0, 6),

     nade_name = Menu.TextBox("Конструктор гранат", "Название позиции", 64, ""),
     nade_description = Menu.TextBox("Конструктор гранат", "Описание", 64, ""),

     nade_teleport = Menu.Button("Конструктор гранат", "Телепортация к позиции"),
     nade_update_pos_ang = Menu.Button("Конструктор гранат", "Выбрать новую позицию"),

     save_nade_cfg = Menu.Combo("Конструктор гранат", "Сохранить в пресет  ", {"Custom: Alpha", "Custom: Bravo", "Custom: Charlie", "Custom: Delta", "Custom: Echo", "Custom: Foxtrot", "Custom: Golf", "Custom: Hotel", "Custom: India", "Custom: Juliet"}, 0),
     save_nade = Menu.Button("Конструктор гранат", "Сохранить"),
     remove_nade = Menu.Button("Конструктор гранат", "Отмена"),

     nade_helper_theme = Menu.Combo("Главная", "Тема", {"Черно-синий", "Светлый", "Черный"}, 0),


     user_name = Cheat.GetCheatUserName(),
     screensize = EngineClient:GetScreenSize(),
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
          return math.floor(time / GlobalVars.interval_per_tick + 0.5)
     end,

     TICKS_TO_TIME = function(self, tick)
          return tick * GlobalVars.interval_per_tick
     end,
}
local target_selection =
{
      distance = function(self, localplayer)
            local origin = localplayer:GetProp("DT_BaseEntity", "m_vecOrigin")
            local bestdistance = 8192.0
            local bestplayer = nil
            for i = 1, 64 do
                  local player = EntityList:GetClientEntity(i)
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
     --icon = Render:LoadImageFromFile("nl/image.png", Vector2.new(32, 32)),
     in_run = false,
     closest_spot = nil,
     render_stuff = {},
     cmd_number = 1,
     init_size = Vector2.new(36, 36),
     --movement_list = nil
     on_draw = function(self)
          local localplayer = EntityList.GetLocalPlayer()
          if(localplayer == nil) then return end
          localplayer = localplayer:GetPlayer()
          local weapon = localplayer:GetActiveWeapon()
          if(weapon == nil) then return end
          local isknife = weapon:IsKnife()
          local map = EngineClient:GetLevelNameShort()
          local origin = localplayer:GetProp("DT_BaseEntity", "m_vecOrigin")
          local eyepos = localplayer:GetEyePosition()
          local movement_size = Render.CalcTextSize("movement", 16)
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
                    local trace = EngineTrace.TraceRay(eyepos, startspot.pos, localplayer, 0x200400B)
                    local name_size = Render.CalcTextSize(startspot.name, 15)
                    local length = math.max(name_size.x, movement_size.x) + self.init_size.x + 8
                    if(trace.fraction > 0.96) then
                         self.render_stuff[startname].global_alpha = 1.0
                         if(distance <= 250.0) then
                              self.render_stuff[startname].box_length = math_helpers:lerp(self.render_stuff[startname].box_length, length, GlobalVars.frametime * 15.0)
                              if(math.abs(length - self.render_stuff[startname].box_length) < 1) then
                                   self.render_stuff[startname].text_alpha = math_helpers:lerp(self.render_stuff[startname].text_alpha, 1.0, GlobalVars.frametime * 15.0)
                              end
                         else
                              self.render_stuff[startname].text_alpha = math_helpers:lerp(self.render_stuff[startname].text_alpha, 0.0, GlobalVars.frametime * 15.0)
                              if(self.render_stuff[startname].text_alpha < 0.01) then
                                   self.render_stuff[startname].box_length = math_helpers:lerp(self.render_stuff[startname].box_length, self.init_size.x, GlobalVars.frametime * 15.0)
                              end
                         end
                    else
                         self.render_stuff[startname].text_alpha = math_helpers:lerp(self.render_stuff[startname].text_alpha, 0.0, GlobalVars.frametime * 15.0)
                         if(self.render_stuff[startname].text_alpha < 0.01) then
                              self.render_stuff[startname].box_length = math_helpers:lerp(self.render_stuff[startname].box_length, self.init_size.x, GlobalVars.frametime * 15.0)
                              if(math.abs(self.init_size.x - self.render_stuff[startname].box_length) < 1) then
                                   self.render_stuff[startname].global_alpha = 0.0
                              end
                         end
                    end
                    if(isknife == false or self.render_stuff[startname].global_alpha == 0.0) then goto continue end
                    local screenpos = Render.WorldToScreen(Vector.new(startspot.pos.x, startspot.pos.y, startspot.pos.z + 16.0))

                    Render.BoxFilled(Vector2.new(screenpos.x - self.render_stuff[startname].box_length / 2, screenpos.y - self.render_stuff[startname].box_height / 2), Vector2.new(screenpos.x + self.render_stuff[startname].box_length / 2, screenpos.y + self.render_stuff[startname].box_height / 2), Color.new(0.1, 0.1, 0.1, self.render_stuff[startname].global_alpha))
                    Render:Image(self.icon, Vector2.new(screenpos.x - self.render_stuff[startname].box_length / 2 + 2, screenpos.y - self.render_stuff[startname].box_height / 2 + 2), Vector2.new(32, 32))
                    Render.Text("Movement", Vector2.new(screenpos.x - self.render_stuff[startname].box_length / 2 + self.init_size.x + 3, screenpos.y - self.render_stuff[startname].box_height / 2 + 4), Color.new(1.0, 1.0, 1.0, self.render_stuff[startname].text_alpha), 16)
                    Render.Text(startspot.name, Vector2.new(screenpos.x - self.render_stuff[startname].box_length / 2 + self.init_size.x + 4, screenpos.y + self.render_stuff[startname].box_height / 2 - 4 - name_size.y), Color.new(1.0, 1.0, 1.0, self.render_stuff[startname].text_alpha), 15)
                    ::continue::
               end
          end
     end,

     on_prediction = function(self, cmd)
          local localplayer = EntityList.GetLocalPlayer()
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
                    local viewangles = EngineClient:GetViewAngles()
                    local direction = Cheat.VectorToAngle(vecdelta)
                    direction.yaw = viewangles.yaw - direction.yaw
                    local move = Cheat.AngleToForward(direction)
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
     maps = loadstring("return {" .. Http.Get("https://pastebin.com/raw/BcY3RTma") .. "}")(),
     custom_maps = {},
     nade_type =
     {
          ["44"] = "HeGrenade",
          ["46"] = "Molotov",
          ["45"] = "Smoke",
          ["43"] = "FlashBang",
     },
     Menu_nades =
     {
          ["44"] = 1,
          ["46"] = 2,
          ["45"] = 3,
          ["43"] = 4,
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

     load_time = Utils.UnixTime(),

     strafe_backup_direction = 0,
     strafe_backup_button = 0,
     strafe_backup_tick = 0,
     strafe_backup_duration = 0,

     force_forward = false,
     force_forward_yaw_direction = 0.0,

     extend_forward = function(self, cmd)
          if(self.force_forward == true) then
               local localplayer = EntityList.GetLocalPlayer()
               if(localplayer == nil) then return end
               localplayer = localplayer:GetPlayer()
               local weapon = localplayer:GetActiveWeapon()
               if(weapon == nil) then return end
               if(weapon:IsGrenade() == false) then return end
               local throwtime = weapon:GetProp("DT_BaseCSGrenade", "m_fThrowTime")
               local curtime = localplayer:GetProp("DT_BasePlayer", "m_nTickBase") * GlobalVars.interval_per_tick
               local direction = 0
               if(self.closest_nade.movedirection == 2) then
                    direction = -45
               elseif(self.closest_nade.movedirection == 3) then
                    direction = 45
               end
               local movedirection = cmd.viewangles.yaw - (self.closest_nade.ang.yaw + direction)
               local move = Cheat.AngleToForward(QAngle.new(0, movedirection, 0))
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
          if(lua_elements.properties:GetBool(1) == true) then
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
          if(lua_elements.properties:GetBool(2) == true) then
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
               local move = Cheat.AngleToForward(QAngle.new(0, cmd.viewangles.yaw - movedirection, 0))
               cmd.forwardmove = move.x * 450.0
               cmd.sidemove = move.y * 450.0
               if(cmd.tick_count - self.strafe_backup_tick == self.strafe_backup_duration) then
                    Menu_elements.autostrafe_smooth:SetInt(self.old_autostrafe_smooth)
               end
          end
     end,

     setup_backup_strafe = function(self, cmd)
          if(self.closest_nade.backupdirection ~= 0) then
               self.old_autostrafe_smooth = Menu_elements.autostrafe_smooth:GetInt()
               Menu_elements.autostrafe_smooth:SetInt(0)
               self.strafe_backup_tick = cmd.tick_count
               self.strafe_backup_duration = self.closest_nade.backupduration
               self.strafe_backup_direction = (self.closest_nade.ang.yaw + self.movedirections[self.closest_nade.backupdirection - 1])
          end
     end,

     on_nade_update = function(self)
          local localplayer = EntityList.GetLocalPlayer()
          if(localplayer == nil) then return end
          localplayer = localplayer:GetPlayer()
          local origin = localplayer:GetProp("DT_BaseEntity", "m_vecOrigin")
          local viewangles = EngineClient:GetViewAngles()
          self.init_pos = Vector.new(origin.x, origin.y, origin.z)
          lua_elements.pitch_slider:SetFloat(viewangles.pitch)
          lua_elements.yaw_slider:SetFloat(viewangles.yaw)
     end,
    
     update_configs = function(self)
          if(Utils.UnixTime() - self.load_time >= 2000 ) then
               self.load_time = Utils.UnixTime()
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
          local result = string.format("[\"%s\"] =\n{\n\tpos = Vector.new(%s, %s, %s),\n\tmap = \"%s\",\n\ttype = \"%s\",\n\t[\"%s\"] = \n\t{\n\t\tang = QAngle.new(%s, %s, 0.0),\n\t\trunduration = %s,\n\t\tjumpduration = %s,\n\t\tspeed = %s,\n\t\tduck = %s,\n\t\tjump = %s,\n\t\tstrength = %s,\n\t\tjumpthresthold = %s,\n\t\tdescription = \"%s\",\n\t\tmovedirection = %s,\n\t\tbackupdirection = %s,\n\t\tbackupduration = %s,\n\t\textendforward = %s,\n\t},\n},\n", Utils.UnixTime(), self.init_pos.x, self.init_pos.y, self.init_pos.z, self.create_nade_map, self.create_nade_weaponid, lua_elements.nade_name:GetString(), nade.ang.pitch, nade.ang.yaw, nade.runduration, nade.jumpduration, nade.speed, nade.duck, nade.jump, nade.strength, nade.jumpthresthold, nade.description, nade.movedirection, nade.backupdirection, nade.backupduration, nade.extendforward)
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
          local localplayer = EntityList.GetLocalPlayer()
          if(localplayer == nil) then return end
          localplayer = localplayer:GetPlayer()
          local weapon = localplayer:GetActiveWeapon()
          if(weapon == nil) then return end
          if(weapon:IsGrenade() == false) then return end
          local weapon_id = weapon:GetWeaponID()
          if(weapon_id == 48) then weapon_id = 46 end
          local origin = localplayer:GetProp("DT_BaseEntity", "m_vecOrigin")
          local viewangles = EngineClient:GetViewAngles()

          self.create_nade_map = EngineClient:GetLevelNameShort()
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
          for i = 1, 3 do
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
          EngineClient:ClientCmd("setpos " .. self.init_pos.x .. " " .. self.init_pos.y .. " " .. self.init_pos.z)
          EngineClient:ClientCmd("setang " .. self.init_ang.pitch .. " " .. self.init_ang.yaw .. " 0.0")
     end,

     on_draw = function(self)
        
          if(self.maps[self.create_nade_map] and self.maps[self.create_nade_map][self.create_nade_weaponid] and self.maps[self.create_nade_map][self.create_nade_weaponid][1]) then
               self.init_ang.pitch = lua_elements.pitch_slider:GetFloat()
               self.init_ang.yaw = lua_elements.yaw_slider:GetFloat()
               self.maps[self.create_nade_map][self.create_nade_weaponid][1] = {pos = self.init_pos, [lua_elements.nade_name:GetString()] = {ang = self.init_ang, runduration = lua_elements.run_duration:GetInt(), speed = lua_elements.run_velocity:GetFloat(), jumpduration = lua_elements.jump_duration:GetInt(), jumpthresthold = lua_elements.jump_thresthold:GetInt(), strength = lua_elements.throw_strengh:GetFloat() / 100.0, duck = lua_elements.properties:GetBool(3), jump = lua_elements.properties:GetBool(2), description = lua_elements.nade_description:GetString(), movedirection = lua_elements.run_direction:GetInt(), backupdirection = lua_elements.backup_direction:GetInt(), backupduration = lua_elements.backup_strafe_duration:GetInt(), extendforward = lua_elements.extend_forward_strenght:GetBool(),}}
          end
          local localplayer = EntityList.GetLocalPlayer()
          if(localplayer == nil) then return end

          local map = EngineClient:GetLevelNameShort()
          self.closest_nade_position = nil
          if(self.should_throw == false) then self.closest_nade = nil end

          localplayer = localplayer:GetPlayer()
          local vecOrigin = localplayer:GetProp("DT_BaseEntity", "m_vecOrigin")
          local vecEyePosition = localplayer:GetEyePosition()
          local angViewAngles = EngineClient:GetViewAngles()
          local weapon = localplayer:GetActiveWeapon()
          local screencenter = Vector2.new(lua_elements.screensize.x / 2, lua_elements.screensize.y / 2)
          if(weapon == nil) then return end
          local weapon_id = weapon:GetWeaponID()
          if(weapon_id == 48) then weapon_id = 46 end
          if(weapon_id == 47) then return end

          local map_list = self.maps[map]
          local nade_list = nil
          if(map_list) then nade_list = map_list[tostring(weapon_id)] end
          --for i=1, #self.maps do
            
          --end
          if(weapon:IsGrenade() == false) then
               if(self.should_throw == true) then
                    Menu_elements.autostrafe:SetBool(self.old_autostrafe)
                    Menu_elements.autostrafe_smooth:SetInt(self.old_autostrafe_smooth)
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
                    if(self.custom_maps[i] and lua_elements.nade_helper_types:GetBool(i) == true ) then
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
                    if((lua_elements.nade_helper_types:GetBool(2) == false or lua_elements.nade_helper_nades:GetBool(self.Menu_nades[tostring(weapon_id)]) == false) and startname ~= 1) then goto continue end
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
                         if(tostring(weapon_id) == startspot.type and lua_elements.nade_helper_nades:GetBool(self.Menu_nades[startspot.type]) == true) then
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
                    if((lua_elements.nade_helper_types:GetBool(2) == false or lua_elements.nade_helper_nades:GetBool(self.Menu_nades[tostring(weapon_id)]) == false) and startname ~= 1) then goto continue end
                    if(self.render_stuff[startname] == nil) then self.render_stuff[startname] = {} end
                    if(self.render_stuff[startname].global_alpha == nil) then self.render_stuff[startname].global_alpha = 0.0 end
                    if(self.render_stuff[startname].box_length == nil) then self.render_stuff[startname].box_length = 30.0 end
                    if(self.render_stuff[startname].box_height == nil) then self.render_stuff[startname].box_height = 30.0 end
                    if(self.render_stuff[startname].text_alpha == nil) then self.render_stuff[startname].text_alpha = 0.0 end
                    if(self.render_stuff[startname].icon_alpha == nil) then self.render_stuff[startname].icon_alpha = 0.0 end
                    if(self.render_stuff[startname].box_additions_alpha == nil) then self.render_stuff[startname].box_additions_alpha = 0.0 end

                    local distance = vecOrigin:DistTo(startspot.pos)
                    if(distance > 1750.0) then
                         self.render_stuff[startname].global_alpha = math_helpers:lerp(self.render_stuff[startname].global_alpha, 0.0, GlobalVars.frametime * 20.0)
                    else
                         local trace = EngineTrace.TraceRay(vecEyePosition, startspot.pos, localplayer, 0x200400B)
                         if(trace.fraction > 0.98) then
                              if(distance > 1250.0) then
                                   self.render_stuff[startname].global_alpha = math_helpers:lerp(self.render_stuff[startname].global_alpha, 0.4, GlobalVars.frametime * 20.0)
                              elseif(distance < 5.0) then
                                   self.render_stuff[startname].global_alpha = math_helpers:lerp(self.render_stuff[startname].global_alpha, 1.0, GlobalVars.frametime * 20.0)
                              else
                                   self.render_stuff[startname].global_alpha = math_helpers:lerp(self.render_stuff[startname].global_alpha, 0.8, GlobalVars.frametime * 20.0)
                              end
                         else
                              self.render_stuff[startname].global_alpha = math_helpers:lerp(self.render_stuff[startname].global_alpha, 0.0, GlobalVars.frametime * 20.0)
                         end
                    end

                    if(self.render_stuff[startname].global_alpha < 0.01) then goto continue end

                    local screenpos = Render.WorldToScreen(Vector.new(startspot.pos.x, startspot.pos.y, startspot.pos.z + 10.0))
                    local nade_type_size = Render.CalcTextSize(self.nade_type[tostring(weapon_id)], 14)
                    local bestlength = 0
                    local num_spots = 0
                    local temp_fov_nade = nil
                    local temp_fov_name = nil
                    local bestfov = lua_elements.nade_helper_fov:GetInt()

                    for endname, endspot in pairs(startspot) do
                         if(type(endspot) == "table") then
                         local name_size = Render.CalcTextSize(endname, 14)
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
                              local forward = Cheat.AngleToForward(endspot.ang)
                              local vecEnd = Vector.new(vecStart.x + 800.0 * forward.x, vecStart.y + 800.0 * forward.y, vecStart.z + 800.0 * forward.z)
                              local trace = EngineTrace.TraceRay(vecStart, vecEnd, localplayer, 0x46004003)
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
        
                         local screenpos = Render.WorldToScreen(endspot.endposition)
                         local name_size = Render.CalcTextSize(endname, 14)
        
                         local r = math_helpers:lerp(self.render_stuff[startname][endname].circle_color.r, 0.3, GlobalVars.frametime * 15.0)
                         local g = math_helpers:lerp(self.render_stuff[startname][endname].circle_color.g, 0.3, GlobalVars.frametime * 15.0)
                         local b = math_helpers:lerp(self.render_stuff[startname][endname].circle_color.b, 0.3, GlobalVars.frametime * 15.0)

                         local desired_box_length = name_size.x + 20

                         if(endspot.description and string.len(endspot.description) > 0) then
                         local desc_size = Render.CalcTextSize(endspot.description, 11)
                         desired_box_height = 16
                         if(self.render_stuff[startname][endname].description_text_alpha > 0.01) then desired_box_length = math.max(desired_box_length, desc_size.x) end
                         end

                         self.render_stuff[startname][endname].description_text_alpha = math_helpers:lerp(self.render_stuff[startname][endname].description_text_alpha, 0.0, GlobalVars.frametime * 60.0)

                         if(distance > 50.0 or startspot ~= temp_nade) then
                         self.render_stuff[startname][endname].text_alpha = math_helpers:lerp(self.render_stuff[startname][endname].text_alpha, 0.0, GlobalVars.frametime * 60.0)
                         if(self.render_stuff[startname][endname].text_alpha < 0.01) then
                              self.render_stuff[startname][endname].box_length = math_helpers:lerp(self.render_stuff[startname][endname].box_length, 10.0, GlobalVars.frametime * 30.0)
                              self.render_stuff[startname][endname].description_box_height = math_helpers:lerp(self.render_stuff[startname][endname].description_box_height, 0.0, GlobalVars.frametime * 30.0)
                              if(self.render_stuff[startname][endname].box_length - 10.0 < 0.1 and self.render_stuff[startname][endname].description_box_height < 0.1) then
                                   self.render_stuff[startname][endname].global_alpha = math_helpers:lerp(self.render_stuff[startname][endname].global_alpha, 0.0, GlobalVars.frametime * 60.0)
                              end
                         end
                         else
                         if(screenpos.x + self.render_stuff[startname][endname].box_length + 2 > lua_elements.screensize.x or screenpos.x < 12 or screenpos.y + 10 > lua_elements.screensize.y or screenpos.y < 10) then
                              self.render_stuff[startname][endname].global_alpha = math_helpers:lerp(self.render_stuff[startname][endname].global_alpha, 1.0, GlobalVars.frametime * 60.0)
                         else
                              self.render_stuff[startname][endname].global_alpha = math_helpers:lerp(self.render_stuff[startname][endname].global_alpha, 0.6, GlobalVars.frametime * 60.0)
                         end
                         if(self.render_stuff[startname][endname].global_alpha > 0.58) then
                              self.render_stuff[startname][endname].box_length = math_helpers:lerp(self.render_stuff[startname][endname].box_length, desired_box_length, GlobalVars.frametime * 30.0)
                              if(desired_box_length - self.render_stuff[startname][endname].box_length < 0.1) then
                                   self.render_stuff[startname][endname].text_alpha = math_helpers:lerp(self.render_stuff[startname][endname].text_alpha, self.render_stuff[startname][endname].global_alpha, GlobalVars.frametime * 60.0)
                                   if(self.render_stuff[startname][endname].description_text_alpha < 0.01) then
                                        self.render_stuff[startname][endname].description_box_height = math_helpers:lerp(self.render_stuff[startname][endname].description_box_height, 0.0, GlobalVars.frametime * 60.0)
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
                         Render.BoxFilled(Vector2.new(screenpos.x - 10, screenpos.y - 8), Vector2.new(screenpos.x + self.render_stuff[startname][endname].box_length, screenpos.y + 8), Color.new(color_set.target_r, color_set.target_g, color_set.target_b, self.render_stuff[startname][endname].global_alpha))
                         Render.Text(endname, Vector2.new(screenpos.x + 10, screenpos.y - name_size.y / 2), Color.new(color_set.text_color_r, color_set.text_color_g, color_set.text_color_b, self.render_stuff[startname][endname].text_alpha), 14)
                         Render.BoxFilled(Vector2.new(screenpos.x - 10, screenpos.y + 8), Vector2.new(screenpos.x + self.render_stuff[startname][endname].box_length, screenpos.y + 8 + self.render_stuff[startname][endname].description_box_height), Color.new(color_set.body_r, color_set.body_g, color_set.body_b, self.render_stuff[startname][endname].global_alpha))

                         Render.CircleFilled(screenpos, 5, 15, self.render_stuff[startname][endname].circle_color)
                         Render.Circle(screenpos, 5, 15, Color.new(0.1, 0.1, 0.1, self.render_stuff[startname][endname].global_alpha))
        
                         ::continue::
                    end

                    if(temp_fov_nade) then
                         local screenpos = Render.WorldToScreen(temp_fov_nade.endposition)
                         local name_size = Render.CalcTextSize(temp_fov_name, 14)
            
                         local r = math_helpers:lerp(self.render_stuff[startname][temp_fov_name].circle_color.r, 0.01, GlobalVars.frametime * 15.0)
                         local g = math_helpers:lerp(self.render_stuff[startname][temp_fov_name].circle_color.g, 0.65, GlobalVars.frametime * 15.0)
                         local b = math_helpers:lerp(self.render_stuff[startname][temp_fov_name].circle_color.b, 0.96, GlobalVars.frametime * 15.0)

                         self.render_stuff[startname][temp_fov_name].global_alpha = math_helpers:lerp(self.render_stuff[startname][temp_fov_name].global_alpha, 0.9, GlobalVars.frametime * 30.0)
                         self.render_stuff[startname][temp_fov_name].circle_color = Color.new(r, g, b, self.render_stuff[startname][temp_fov_name].global_alpha)

                         local desired_box_length = name_size.x + 20
                         local desired_box_height = 0
                      
                         if(temp_fov_nade.description and string.len(temp_fov_nade.description) > 0) then
                              local desc_size = Render.CalcTextSize(temp_fov_nade.description, 11)
                              desired_box_height = 16
                              if(desc_size.x > desired_box_length) then desired_box_length = math.max(desired_box_length, desc_size.x) end
                         end

                         if(self.render_stuff[startname][temp_fov_name].global_alpha > 0.88) then
                              self.render_stuff[startname][temp_fov_name].box_length = math_helpers:lerp(self.render_stuff[startname][temp_fov_name].box_length, desired_box_length, GlobalVars.frametime * 30.0)
                              self.render_stuff[startname][temp_fov_name].description_box_height = math_helpers:lerp(self.render_stuff[startname][temp_fov_name].description_box_height, desired_box_height, GlobalVars.frametime * 30.0)
                              if(desired_box_length - self.render_stuff[startname][temp_fov_name].box_length < 0.1 and desired_box_height - self.render_stuff[startname][temp_fov_name].description_box_height < 0.1) then
                                   self.render_stuff[startname][temp_fov_name].text_alpha = math_helpers:lerp(self.render_stuff[startname][temp_fov_name].text_alpha, 1.0, GlobalVars.frametime * 30.0)
                                   self.render_stuff[startname][temp_fov_name].description_text_alpha = math_helpers:lerp(self.render_stuff[startname][temp_fov_name].description_text_alpha, 1.0, GlobalVars.frametime * 30.0)
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

                         Render.BoxFilled(Vector2.new(screenpos.x - 10, screenpos.y - 8), Vector2.new(screenpos.x + self.render_stuff[startname][temp_fov_name].box_length, screenpos.y + 8), Color.new(color_set.target_r, color_set.target_g, color_set.target_b, self.render_stuff[startname][temp_fov_name].global_alpha))
                         Render.Text(temp_fov_name, Vector2.new(screenpos.x + 10, screenpos.y - name_size.y / 2), Color.new(color_set.text_color_r, color_set.text_color_g, color_set.text_color_b, self.render_stuff[startname][temp_fov_name].text_alpha), 14)
                         Render.BoxFilled(Vector2.new(screenpos.x - 10, screenpos.y + 8), Vector2.new(screenpos.x + self.render_stuff[startname][temp_fov_name].box_length, screenpos.y + 8 + self.render_stuff[startname][temp_fov_name].description_box_height), Color.new(color_set.body_r, color_set.body_g, color_set.body_b, self.render_stuff[startname][temp_fov_name].global_alpha))

                         if(temp_fov_nade.description and string.len(temp_fov_nade.description) > 0) then
                              local desc_size = Render.CalcTextSize(temp_fov_nade.description, 11)
                              Render.BoxFilled(Vector2.new(screenpos.x - 10, screenpos.y + 8), Vector2.new(screenpos.x + self.render_stuff[startname][temp_fov_name].box_length, screenpos.y + 9), Color.new(color_set.gradient_line_r, color_set.gradient_line_g, color_set.gradient_line_b, self.render_stuff[startname][temp_fov_name].global_alpha))
                              Render.Text(temp_fov_nade.description, Vector2.new(screenpos.x - 5, screenpos.y + 8 + self.render_stuff[startname][temp_fov_name].description_box_height / 2 - desc_size.y / 2), Color.new(color_set.text_color_r, color_set.text_color_g, color_set.text_color_b, self.render_stuff[startname][temp_fov_name].description_text_alpha), 11)
                         end

                         Render.CircleFilled(screenpos, 5, 15, self.render_stuff[startname][temp_fov_name].circle_color)
                         Render.Circle(screenpos, 5, 15, Color.new(0.1, 0.1, 0.1, self.render_stuff[startname][temp_fov_name].global_alpha))
                    end

                    if(bestlength < nade_type_size.x) then bestlength = nade_type_size.x end

                    if(distance < 400.0 and (temp_nade and temp_nade == startspot or temp_nade == nil or lua_elements.nade_helper:GetBool() == false)) then
                         self.render_stuff[startname].box_length = math_helpers:lerp(self.render_stuff[startname].box_length, bestlength, GlobalVars.frametime * 20.0)
                         self.render_stuff[startname].box_height = math_helpers:lerp(self.render_stuff[startname].box_height, num_spots * 16 + 12, GlobalVars.frametime * 20.0)
                         self.render_stuff[startname].icon_alpha = math_helpers:lerp(self.render_stuff[startname].icon_alpha, 0.0, GlobalVars.frametime * 20.0)
                         self.render_stuff[startname].box_additions_alpha = math_helpers:lerp(self.render_stuff[startname].box_additions_alpha, self.render_stuff[startname].global_alpha, GlobalVars.frametime * 20.0)
                         if(bestlength - self.render_stuff[startname].box_length < 0.1) then
                         self.render_stuff[startname].box_additions_alpha = math_helpers:lerp(self.render_stuff[startname].box_additions_alpha, self.render_stuff[startname].global_alpha, GlobalVars.frametime * 20.0)
                         self.render_stuff[startname].text_alpha = math_helpers:lerp(self.render_stuff[startname].text_alpha, self.render_stuff[startname].global_alpha, GlobalVars.frametime * 20.0)
                         end
                    elseif(distance > 400 or (temp_nade and temp_nade ~= startspot)) then
                         self.render_stuff[startname].text_alpha = math_helpers:lerp(self.render_stuff[startname].text_alpha, 0.0, GlobalVars.frametime * 20.0)
                         if(self.render_stuff[startname].text_alpha < 0.01) then
                         self.render_stuff[startname].box_additions_alpha = math_helpers:lerp(self.render_stuff[startname].box_additions_alpha, 0.0, GlobalVars.frametime * 20.0)
                         self.render_stuff[startname].icon_alpha = math_helpers:lerp(self.render_stuff[startname].icon_alpha, self.render_stuff[startname].global_alpha, GlobalVars.frametime * 20.0)
                         self.render_stuff[startname].box_length = math_helpers:lerp(self.render_stuff[startname].box_length, 16, GlobalVars.frametime * 20.0)
                         self.render_stuff[startname].box_height = math_helpers:lerp(self.render_stuff[startname].box_height, 16, GlobalVars.frametime * 20.0)
                         end
                    end

                    Render.BoxFilled(Vector2.new(screenpos.x - self.render_stuff[startname].box_length / 2 - 3, screenpos.y + 1), Vector2.new(screenpos.x + self.render_stuff[startname].box_length / 2 + 3, screenpos.y - self.render_stuff[startname].box_height - 3), Color.new(color_set.body_r, color_set.body_g, color_set.body_b, 0.95 * self.render_stuff[startname].global_alpha)) -- С‚РµР»Рѕ
                    Render.BoxFilled(Vector2.new(screenpos.x - self.render_stuff[startname].box_length / 2 - 3, screenpos.y - self.render_stuff[startname].box_height + 12), Vector2.new(screenpos.x + self.render_stuff[startname].box_length / 2 + 3, screenpos.y - self.render_stuff[startname].box_height - 4), Color.new(color_set.head_r, color_set.head_g, color_set.head_b, self.render_stuff[startname].box_additions_alpha)) -- СЂР°РјРєР°
                    Render.Text(self.nade_type[tostring(weapon_id)], Vector2.new(screenpos.x - nade_type_size.x / 2, screenpos.y - self.render_stuff[startname].box_height + 12 - nade_type_size.y), Color.new(color_set.text_color_r, color_set.text_color_g, color_set.text_color_b, self.render_stuff[startname].text_alpha), 14)
                    Render.BoxFilled(Vector2.new(screenpos.x - self.render_stuff[startname].box_length / 2 - 3, screenpos.y - self.render_stuff[startname].box_height + 12), Vector2.new(screenpos.x + self.render_stuff[startname].box_length / 2 + 3, screenpos.y - self.render_stuff[startname].box_height + 13), Color.new(color_set.gradient_line_r, color_set.gradient_line_g, color_set.gradient_line_b, self.render_stuff[startname].box_additions_alpha)) -- РіСЂР°РґРёРµРЅС‚

                    Render.Box(Vector2.new(screenpos.x - self.render_stuff[startname].box_length / 2 - 3, screenpos.y + 1), Vector2.new(screenpos.x + self.render_stuff[startname].box_length / 2 + 3, screenpos.y - self.render_stuff[startname].box_height - 3), Color.new(0.1, 0.15, 0.2, self.render_stuff[startname].global_alpha))

                    local icon_size = Render.CalcWeaponIconSize(weapon_id, 20)
                    Render.WeaponIcon(weapon_id, Vector2.new(screenpos.x - icon_size.x / 2, screenpos.y - icon_size.y - 1), Color.new(color_set.text_color_r, color_set.text_color_g, color_set.text_color_b, self.render_stuff[startname].icon_alpha), 20)
                  
                    num_spots = 0
                    for endname, endspot in pairs(startspot) do
                         if(type(endspot) == "table") then
                         local name_size = Render.CalcTextSize(endname, 14)
                         Render.Text(endname, Vector2.new(screenpos.x - name_size.x / 2, screenpos.y - (15 * num_spots) - name_size.y), Color.new(color_set.text_color_r, color_set.text_color_g, color_set.text_color_b, self.render_stuff[startname].text_alpha), 14)
                         num_spots = num_spots + 1
                         end
                    end
                    ::continue::
               end
          end

          for i = 1, 10 do
               if(self.custom_maps[i] and lua_elements.nade_helper_types:GetBool(i) == true) then
                    for startname, startspot in pairs(self.custom_maps[i]) do
                         if(lua_elements.nade_helper_types:GetBool(i) == false or lua_elements.nade_helper_nades:GetBool(self.Menu_nades[tostring(weapon_id)]) == false or startspot.map ~= map or tostring(weapon_id) ~= startspot.type) then goto continue end
                         if(self.render_stuff[startname] == nil) then self.render_stuff[startname] = {} end
                         if(self.render_stuff[startname].global_alpha == nil) then self.render_stuff[startname].global_alpha = 0.0 end
                         if(self.render_stuff[startname].box_length == nil) then self.render_stuff[startname].box_length = 30.0 end
                         if(self.render_stuff[startname].box_height == nil) then self.render_stuff[startname].box_height = 30.0 end
                         if(self.render_stuff[startname].text_alpha == nil) then self.render_stuff[startname].text_alpha = 0.0 end
                         if(self.render_stuff[startname].icon_alpha == nil) then self.render_stuff[startname].icon_alpha = 0.0 end
                         if(self.render_stuff[startname].box_additions_alpha == nil) then self.render_stuff[startname].box_additions_alpha = 0.0 end
  
                         local distance = vecOrigin:DistTo(startspot.pos)
                         if(distance > 1750.0) then
                              self.render_stuff[startname].global_alpha = math_helpers:lerp(self.render_stuff[startname].global_alpha, 0.0, GlobalVars.frametime * 20.0)
                         else
                            
                              local trace = EngineTrace.TraceRay(vecEyePosition, startspot.pos, localplayer, 0x200400B)
                              if(trace.fraction > 0.98) then
                                   if(distance > 1250.0) then
                                        self.render_stuff[startname].global_alpha = math_helpers:lerp(self.render_stuff[startname].global_alpha, 0.4, GlobalVars.frametime * 20.0)
                                   elseif(distance < 5.0) then
                                        self.render_stuff[startname].global_alpha = math_helpers:lerp(self.render_stuff[startname].global_alpha, 1.0, GlobalVars.frametime * 20.0)
                                   else
                                        self.render_stuff[startname].global_alpha = math_helpers:lerp(self.render_stuff[startname].global_alpha, 0.8, GlobalVars.frametime * 20.0)
                                   end
                              else
                                   self.render_stuff[startname].global_alpha = math_helpers:lerp(self.render_stuff[startname].global_alpha, 0.0, GlobalVars.frametime * 20.0)
                              end
                         end
  
                         if(self.render_stuff[startname].global_alpha < 0.01) then goto continue end
  
                         local screenpos = Render.WorldToScreen(Vector.new(startspot.pos.x, startspot.pos.y, startspot.pos.z + 10.0))
                         local nade_type_size = Render.CalcTextSize(self.nade_type[tostring(weapon_id)], 14)
                         local bestlength = 0
                         local num_spots = 0
                         local temp_fov_nade = nil
                         local temp_fov_name = nil
                         local bestfov = lua_elements.nade_helper_fov:GetInt()
  
                         for endname, endspot in pairs(startspot) do
                              if(type(endspot) == "table") then
                              local name_size = Render.CalcTextSize(endname, 14)
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
                                   local forward = Cheat.AngleToForward(endspot.ang)
                                   local vecEnd = Vector.new(vecStart.x + 800.0 * forward.x, vecStart.y + 800.0 * forward.y, vecStart.z + 800.0 * forward.z)
                                   local trace = EngineTrace.TraceRay(vecStart, vecEnd, localplayer, 0x46004003)
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
            
                              local screenpos = Render.WorldToScreen(endspot.endposition)
                              local name_size = Render.CalcTextSize(endname, 14)
            
                              local r = math_helpers:lerp(self.render_stuff[startname][endname].circle_color.r, 0.3, GlobalVars.frametime * 15.0)
                              local g = math_helpers:lerp(self.render_stuff[startname][endname].circle_color.g, 0.3, GlobalVars.frametime * 15.0)
                              local b = math_helpers:lerp(self.render_stuff[startname][endname].circle_color.b, 0.3, GlobalVars.frametime * 15.0)
  
                              local desired_box_length = name_size.x + 20
  
                              if(endspot.description and string.len(endspot.description) > 0) then
                              local desc_size = Render.CalcTextSize(endspot.description, 11)
                              desired_box_height = 16
                              if(self.render_stuff[startname][endname].description_text_alpha > 0.01) then desired_box_length = math.max(desired_box_length, desc_size.x) end
                              end
  
                              self.render_stuff[startname][endname].description_text_alpha = math_helpers:lerp(self.render_stuff[startname][endname].description_text_alpha, 0.0, GlobalVars.frametime * 60.0)
  
                              if(distance > 50.0 or startspot ~= temp_nade) then
                              self.render_stuff[startname][endname].text_alpha = math_helpers:lerp(self.render_stuff[startname][endname].text_alpha, 0.0, GlobalVars.frametime * 60.0)
                              if(self.render_stuff[startname][endname].text_alpha < 0.01) then
                                   self.render_stuff[startname][endname].box_length = math_helpers:lerp(self.render_stuff[startname][endname].box_length, 10.0, GlobalVars.frametime * 30.0)
                                   self.render_stuff[startname][endname].description_box_height = math_helpers:lerp(self.render_stuff[startname][endname].description_box_height, 0.0, GlobalVars.frametime * 30.0)
                                   if(self.render_stuff[startname][endname].box_length - 10.0 < 0.1 and self.render_stuff[startname][endname].description_box_height < 0.1) then
                                        self.render_stuff[startname][endname].global_alpha = math_helpers:lerp(self.render_stuff[startname][endname].global_alpha, 0.0, GlobalVars.frametime * 60.0)
                                   end
                              end
                              else
                              if(screenpos.x + self.render_stuff[startname][endname].box_length + 2 > lua_elements.screensize.x or screenpos.x < 12 or screenpos.y + 10 > lua_elements.screensize.y or screenpos.y < 10) then
                                   self.render_stuff[startname][endname].global_alpha = math_helpers:lerp(self.render_stuff[startname][endname].global_alpha, 1.0, GlobalVars.frametime * 60.0)
                              else
                                   self.render_stuff[startname][endname].global_alpha = math_helpers:lerp(self.render_stuff[startname][endname].global_alpha, 0.6, GlobalVars.frametime * 60.0)
                              end
                              if(self.render_stuff[startname][endname].global_alpha > 0.58) then
                                   self.render_stuff[startname][endname].box_length = math_helpers:lerp(self.render_stuff[startname][endname].box_length, desired_box_length, GlobalVars.frametime * 30.0)
                                   if(desired_box_length - self.render_stuff[startname][endname].box_length < 0.1) then
                                        self.render_stuff[startname][endname].text_alpha = math_helpers:lerp(self.render_stuff[startname][endname].text_alpha, self.render_stuff[startname][endname].global_alpha, GlobalVars.frametime * 60.0)
                                        if(self.render_stuff[startname][endname].description_text_alpha < 0.01) then
                                             self.render_stuff[startname][endname].description_box_height = math_helpers:lerp(self.render_stuff[startname][endname].description_box_height, 0.0, GlobalVars.frametime * 60.0)
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
                              Render.BoxFilled(Vector2.new(screenpos.x - 10, screenpos.y - 8), Vector2.new(screenpos.x + self.render_stuff[startname][endname].box_length, screenpos.y + 8), Color.new(color_set.target_r, color_set.target_g, color_set.target_b, self.render_stuff[startname][endname].global_alpha))
                              Render.Text(endname, Vector2.new(screenpos.x + 10, screenpos.y - name_size.y / 2), Color.new(color_set.text_color_r, color_set.text_color_g, color_set.text_color_b, self.render_stuff[startname][endname].text_alpha), 14)
                              Render.BoxFilled(Vector2.new(screenpos.x - 10, screenpos.y + 8), Vector2.new(screenpos.x + self.render_stuff[startname][endname].box_length, screenpos.y + 8 + self.render_stuff[startname][endname].description_box_height), Color.new(color_set.body_r, color_set.body_g, color_set.body_b, self.render_stuff[startname][endname].global_alpha))
  
                              Render.CircleFilled(screenpos, 5, 15, self.render_stuff[startname][endname].circle_color)
                              Render.Circle(screenpos, 5, 15, Color.new(0.1, 0.1, 0.1, self.render_stuff[startname][endname].global_alpha))
            
                              ::continue::
                         end
  
                         if(temp_fov_nade) then
                              local screenpos = Render.WorldToScreen(temp_fov_nade.endposition)
                              local name_size = Render.CalcTextSize(temp_fov_name, 14)
                  
                              local r = math_helpers:lerp(self.render_stuff[startname][temp_fov_name].circle_color.r, 0.01, GlobalVars.frametime * 15.0)
                              local g = math_helpers:lerp(self.render_stuff[startname][temp_fov_name].circle_color.g, 0.65, GlobalVars.frametime * 15.0)
                              local b = math_helpers:lerp(self.render_stuff[startname][temp_fov_name].circle_color.b, 0.96, GlobalVars.frametime * 15.0)
  
                              self.render_stuff[startname][temp_fov_name].global_alpha = math_helpers:lerp(self.render_stuff[startname][temp_fov_name].global_alpha, 0.9, GlobalVars.frametime * 30.0)
                              self.render_stuff[startname][temp_fov_name].circle_color = Color.new(r, g, b, self.render_stuff[startname][temp_fov_name].global_alpha)
  
                              local desired_box_length = name_size.x + 20
                              local desired_box_height = 0
                            
                              if(temp_fov_nade.description and string.len(temp_fov_nade.description) > 0) then
                                   local desc_size = Render.CalcTextSize(temp_fov_nade.description, 11)
                                   desired_box_height = 16
                                   if(desc_size.x > desired_box_length) then desired_box_length = math.max(desired_box_length, desc_size.x) end
                              end
  
                              if(self.render_stuff[startname][temp_fov_name].global_alpha > 0.88) then
                                   self.render_stuff[startname][temp_fov_name].box_length = math_helpers:lerp(self.render_stuff[startname][temp_fov_name].box_length, desired_box_length, GlobalVars.frametime * 30.0)
                                   self.render_stuff[startname][temp_fov_name].description_box_height = math_helpers:lerp(self.render_stuff[startname][temp_fov_name].description_box_height, desired_box_height, GlobalVars.frametime * 30.0)
                                   if(desired_box_length - self.render_stuff[startname][temp_fov_name].box_length < 0.1 and desired_box_height - self.render_stuff[startname][temp_fov_name].description_box_height < 0.1) then
                                        self.render_stuff[startname][temp_fov_name].text_alpha = math_helpers:lerp(self.render_stuff[startname][temp_fov_name].text_alpha, 1.0, GlobalVars.frametime * 30.0)
                                        self.render_stuff[startname][temp_fov_name].description_text_alpha = math_helpers:lerp(self.render_stuff[startname][temp_fov_name].description_text_alpha, 1.0, GlobalVars.frametime * 30.0)
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
  
                              Render.BoxFilled(Vector2.new(screenpos.x - 10, screenpos.y - 8), Vector2.new(screenpos.x + self.render_stuff[startname][temp_fov_name].box_length, screenpos.y + 8), Color.new(color_set.target_r, color_set.target_g, color_set.target_b, self.render_stuff[startname][temp_fov_name].global_alpha))
                              Render.Text(temp_fov_name, Vector2.new(screenpos.x + 10, screenpos.y - name_size.y / 2), Color.new(color_set.text_color_r, color_set.text_color_g, color_set.text_color_b, self.render_stuff[startname][temp_fov_name].text_alpha), 14)
                              Render.BoxFilled(Vector2.new(screenpos.x - 10, screenpos.y + 8), Vector2.new(screenpos.x + self.render_stuff[startname][temp_fov_name].box_length, screenpos.y + 8 + self.render_stuff[startname][temp_fov_name].description_box_height), Color.new(color_set.body_r, color_set.body_g, color_set.body_b, self.render_stuff[startname][temp_fov_name].global_alpha))
  
                              if(temp_fov_nade.description and string.len(temp_fov_nade.description) > 0) then
                                   local desc_size = Render.CalcTextSize(temp_fov_nade.description, 11)
                                   Render.BoxFilled(Vector2.new(screenpos.x - 10, screenpos.y + 8), Vector2.new(screenpos.x + self.render_stuff[startname][temp_fov_name].box_length, screenpos.y + 9), Color.new(color_set.gradient_line_r, color_set.gradient_line_g, color_set.gradient_line_b, self.render_stuff[startname][temp_fov_name].global_alpha))
                                   Render.Text(temp_fov_nade.description, Vector2.new(screenpos.x - 5, screenpos.y + 8 + self.render_stuff[startname][temp_fov_name].description_box_height / 2 - desc_size.y / 2), Color.new(color_set.text_color_r, color_set.text_color_g, color_set.text_color_b, self.render_stuff[startname][temp_fov_name].description_text_alpha), 11)
                              end
  
                              Render.CircleFilled(screenpos, 5, 15, self.render_stuff[startname][temp_fov_name].circle_color)
                              Render.Circle(screenpos, 5, 15, Color.new(0.1, 0.1, 0.1, self.render_stuff[startname][temp_fov_name].global_alpha))
                         end
  
                         if(bestlength < nade_type_size.x) then bestlength = nade_type_size.x end
  
                         if(distance < 400.0 and (temp_nade and temp_nade == startspot or temp_nade == nil or lua_elements.nade_helper:GetBool() == false)) then
                              self.render_stuff[startname].box_length = math_helpers:lerp(self.render_stuff[startname].box_length, bestlength, GlobalVars.frametime * 20.0)
                              self.render_stuff[startname].box_height = math_helpers:lerp(self.render_stuff[startname].box_height, num_spots * 16 + 12, GlobalVars.frametime * 20.0)
                              self.render_stuff[startname].icon_alpha = math_helpers:lerp(self.render_stuff[startname].icon_alpha, 0.0, GlobalVars.frametime * 20.0)
                              self.render_stuff[startname].box_additions_alpha = math_helpers:lerp(self.render_stuff[startname].box_additions_alpha, self.render_stuff[startname].global_alpha, GlobalVars.frametime * 20.0)
                              if(bestlength - self.render_stuff[startname].box_length < 0.1) then
                              self.render_stuff[startname].box_additions_alpha = math_helpers:lerp(self.render_stuff[startname].box_additions_alpha, self.render_stuff[startname].global_alpha, GlobalVars.frametime * 20.0)
                              self.render_stuff[startname].text_alpha = math_helpers:lerp(self.render_stuff[startname].text_alpha, self.render_stuff[startname].global_alpha, GlobalVars.frametime * 20.0)
                              end
                         elseif(distance > 400 or (temp_nade and temp_nade ~= startspot)) then
                              self.render_stuff[startname].text_alpha = math_helpers:lerp(self.render_stuff[startname].text_alpha, 0.0, GlobalVars.frametime * 20.0)
                              if(self.render_stuff[startname].text_alpha < 0.01) then
                              self.render_stuff[startname].box_additions_alpha = math_helpers:lerp(self.render_stuff[startname].box_additions_alpha, 0.0, GlobalVars.frametime * 20.0)
                              self.render_stuff[startname].icon_alpha = math_helpers:lerp(self.render_stuff[startname].icon_alpha, self.render_stuff[startname].global_alpha, GlobalVars.frametime * 20.0)
                              self.render_stuff[startname].box_length = math_helpers:lerp(self.render_stuff[startname].box_length, 16, GlobalVars.frametime * 20.0)
                              self.render_stuff[startname].box_height = math_helpers:lerp(self.render_stuff[startname].box_height, 16, GlobalVars.frametime * 20.0)
                              end
                         end
  
                         Render.BoxFilled(Vector2.new(screenpos.x - self.render_stuff[startname].box_length / 2 - 3, screenpos.y + 1), Vector2.new(screenpos.x + self.render_stuff[startname].box_length / 2 + 3, screenpos.y - self.render_stuff[startname].box_height - 3), Color.new(color_set.body_r, color_set.body_g, color_set.body_b, 0.95 * self.render_stuff[startname].global_alpha)) -- С‚РµР»Рѕ
                         Render.BoxFilled(Vector2.new(screenpos.x - self.render_stuff[startname].box_length / 2 - 3, screenpos.y - self.render_stuff[startname].box_height + 12), Vector2.new(screenpos.x + self.render_stuff[startname].box_length / 2 + 3, screenpos.y - self.render_stuff[startname].box_height - 4), Color.new(color_set.head_r, color_set.head_g, color_set.head_b, self.render_stuff[startname].box_additions_alpha)) -- СЂР°РјРєР°
                         Render.Text(self.nade_type[tostring(weapon_id)], Vector2.new(screenpos.x - nade_type_size.x / 2, screenpos.y - self.render_stuff[startname].box_height + 12 - nade_type_size.y), Color.new(color_set.text_color_r, color_set.text_color_g, color_set.text_color_b, self.render_stuff[startname].text_alpha), 14)
                         Render.BoxFilled(Vector2.new(screenpos.x - self.render_stuff[startname].box_length / 2 - 3, screenpos.y - self.render_stuff[startname].box_height + 12), Vector2.new(screenpos.x + self.render_stuff[startname].box_length / 2 + 3, screenpos.y - self.render_stuff[startname].box_height + 13), Color.new(color_set.gradient_line_r, color_set.gradient_line_g, color_set.gradient_line_b, self.render_stuff[startname].box_additions_alpha)) -- РіСЂР°РґРёРµРЅС‚
  
                         Render.Box(Vector2.new(screenpos.x - self.render_stuff[startname].box_length / 2 - 3, screenpos.y + 1), Vector2.new(screenpos.x + self.render_stuff[startname].box_length / 2 + 3, screenpos.y - self.render_stuff[startname].box_height - 3), Color.new(0.1, 0.15, 0.2, self.render_stuff[startname].global_alpha))
  
                         local icon_size = Render.CalcWeaponIconSize(weapon_id, 20)
                         Render.WeaponIcon(weapon_id, Vector2.new(screenpos.x - icon_size.x / 2, screenpos.y - icon_size.y - 1), Color.new(color_set.text_color_r, color_set.text_color_g, color_set.text_color_b, self.render_stuff[startname].icon_alpha), 20)
                      
                         num_spots = 0
                         for endname, endspot in pairs(startspot) do
                              if(type(endspot) == "table") then
                              local name_size = Render.CalcTextSize(endname, 14)
                              Render.Text(endname, Vector2.new(screenpos.x - name_size.x / 2, screenpos.y - (15 * num_spots) - name_size.y), Color.new(color_set.text_color_r, color_set.text_color_g, color_set.text_color_b, self.render_stuff[startname].text_alpha), 14)
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
          local localplayer = EntityList.GetLocalPlayer()
          if(localplayer == nil) then return end
          localplayer = localplayer:GetPlayer()
          local velocity = Vector.new(localplayer:GetProp("DT_BasePlayer", "m_vecVelocity[0]"), localplayer:GetProp("DT_BasePlayer", "m_vecVelocity[1]"), localplayer:GetProp("DT_BasePlayer", "m_vecVelocity[2]"))
          local weapon = localplayer:GetActiveWeapon()
          if(weapon == nil) then return end
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
                    local move = Cheat.AngleToForward(QAngle.new(0, movedirection, 0))
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
               if(throwtime > 0.0 and throwtime < GlobalVars.curtime) then
                    self:setup_backup_strafe(cmd)
                    self.closest_nade = nil
                    self.closest_nade_position = nil
                    self.should_throw = false
                    self.run_tick = 0
                    self.jump_tick = 0
                    self.force_forward = false
                    Menu_elements.autostrafe:SetBool(self.old_autostrafe)
                    FakeLag.ForceSend()
               end
          elseif(self.closest_nade_position and lua_elements.nade_helper:GetBool() == true) then
               cmd.buttons = bit.band(cmd.buttons, bit.bnot(2048))
               local origin = localplayer:GetProp("DT_BaseEntity", "m_vecOrigin")
               local onground = (bit.band(localplayer:GetProp("DT_BasePlayer", "m_fFlags"), 1) == 1)
               local delta = (self.closest_nade_position - origin)
               local length = #delta
               if(onground == true and length < 100.0) then
                    local viewangles = EngineClient:GetViewAngles()
                    local direction = Cheat.VectorToAngle(delta)
                    direction.yaw = viewangles.yaw - direction.yaw
                    local move = Cheat.AngleToForward(direction)
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
                    elseif(weapon:GetProp("DT_BaseCSGrenade", "m_bPinPulled")  and self.closest_nade and velocity:Length2D() < 10.0) then
                         self.should_throw = true
                         self.old_autostrafe = Menu_elements.autostrafe:GetBool()
                         Menu_elements.autostrafe:SetBool(false)
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
     lua_elements.screensize = EngineClient:GetScreenSize()
     grenade_helper:on_draw()
     --movement_helper:on_draw()
end

local function on_createmove(cmd)
     --movement_helper:on_createmove(cmd)
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
    Cheat.RegisterCallback("createmove", on_createmove)
    Cheat.RegisterCallback("draw", on_draw)
    Cheat.RegisterCallback("override_view", on_overrideview)
    Cheat.RegisterCallback("fire_bullet", on_firebullet)
    Cheat.RegisterCallback("ragebot_shot", on_ragebotshot)
    Cheat.RegisterCallback("events", on_event)
    Cheat.RegisterCallback("pre_prediction", on_pre_prediction)
    Cheat.RegisterCallback("prediction", on_prediction)
    Cheat.RegisterCallback("registered_shot", on_registered_shot)
    Cheat.RegisterCallback("destroy", on_destroy)
    lua_elements.create_nade:RegisterCallback(on_create_button)
    lua_elements.remove_nade:RegisterCallback(on_remove_button)
    lua_elements.save_nade:RegisterCallback(on_save_button)
    lua_elements.nade_teleport:RegisterCallback(on_teleport_button)
    lua_elements.nade_update_pos_ang:RegisterCallback(on_nade_update_button)
    lua_elements.properties:RegisterCallback(on_properties_combo)
    lua_elements.backup_direction:RegisterCallback(on_backupdirection_combo)
    lua_elements.run_direction:RegisterCallback(on_run_direction_combo)
end
