-- * library
local Library = {
  urlmon  = ffi.load 'UrlMon',
  wininet = ffi.load 'WinInet',
}

-- * library interaction
ffi.cdef[[
   // typedefs
  typedef void VOID;
  typedef bool BOOL;
  typedef int INT;
  typedef long LONG;
  typedef float FLOAT;
  typedef char CHAR;

  typedef VOID *PVOID;
  typedef PVOID HANDLE;
  typedef const VOID *LPCVOID;
  typedef unsigned int SIZE_T;
  typedef INT *FARPROC;
  typedef unsigned long DWORD;
  typedef DWORD ULONG_PTR;
  typedef unsigned char BYTE;
  typedef const CHAR *LPCSTR;

   // structures
  typedef struct {
    uint8_t r, g, b, a;
  } color_t;

  typedef struct {
    CHAR  pad[8];
    FLOAT m_flStart;
    FLOAT m_flEnd;
    FLOAT m_flState;
  } poseparameter_t;

   // fn (winuser)
  BOOL CreateDirectoryA(LPCSTR lpPathName, HANDLE lpSecurityAttributes);
  BOOL DeleteUrlCacheEntryA(LPCSTR lpszUrlName);
  HANDLE URLDownloadToFileA(HANDLE pCaller, LPCSTR szURL, LPCSTR szFileName, INT dwReserved, INT lpfnCB);
]]

-- * engine stuff
local engine_stuff = {
  type = {
    interface = ffi.typeof('uintptr_t**') -- * same as PVOID*
  },

  interfaces = {
    client = {
      entitylist = Utils.CreateInterface('client.dll', 'VClientEntityList003') or error('[DrainYaw - Debug] Can\'t create interface: VClientEntityList003'),
    },
    vstdlib = {
      enginecvar = Utils.CreateInterface('vstdlib.dll', 'VEngineCvar007') or error('[DrainYaw - Debug] Can\'t create interface: VEngineCvar007'),
    },
  },

  patterns = {
    client = {
      poseparameter = Utils.PatternScan('client.dll', '55 8B EC 8B 45 08 57 8B F9 8B 4F 04 85 C9 75 15') or error('[DrainYaw - Debug] Can\'t find: Poseparameter pattern'),
    },
  },
};


-- * virtual method table
local vmt = {
  entry = function(self, instance, index, typestring)
    local interface = ffi.cast(engine_stuff.type.interface, instance)[0];
    return ffi.cast(typestring, interface[index]);
  end,

  thunk = function(self, index, typestring)
    local typeof = ffi.typeof(typestring);

    return function(instance, ...)
      assert(instance ~= nil);

      local fnptr = self:entry(instance, index, typeof) or error('invalid vtable');
      return fnptr(instance, ...)
    end
  end,

  bind = function(self, instance, index, typestring)
    local fnptr = self:thunk(index, typestring);

    return function(...)
      return fnptr(instance, ...)
    end
  end,
};

-- * ffi helpers
local FFI_Helpers = {
  Client = {
    Cvar = (function()
      local enginecvar = ffi.cast(engine_stuff.type.interface, engine_stuff.interfaces.vstdlib.enginecvar);
      local color_print = vmt:bind(enginecvar, 25, 'HANDLE(__cdecl*)(HANDLE, const color_t&, LPCSTR, ...)')

      local color_print = function(color, text)
        if color == nil then
          return end

        local color_t = ffi.new('color_t')
        color_t.r, color_t.g, color_t.b, color_t.a = color.r * 255, color.g * 255, color.b * 255, color.a * 255

        color_print(color_t, text)
      end

      local mutli_color_print = function(...)
        local arguments = {...};
        local length = #arguments
        if length % 2 ~= 0 then
          error 'PEDIC'
        end

        length = length /2
        for index = 1, length do
          local text = arguments[index]
          local color = arguments[length + index]

          color_print(color, text)
        end
      end

      return {
        color_print = color_print,
        mutli_color_print = mutli_color_print,
      }
    end)(),

    EntityList = (function()
      local entitylist = ffi.cast(engine_stuff.type.interface, engine_stuff.interfaces.client.entitylist);

      return {
        get_client_entity = vmt:bind(entitylist, 3, 'HANDLE(__thiscall*)(HANDLE, INT)')
      }
    end)(),

    get_poseparameter = ffi.cast('poseparameter_t*(__thiscall*)(HANDLE, INT)', engine_stuff.patterns.client.poseparameter)
  },

  Explorer = {
    CreateFolder = function(self, Path)
      ffi.C.CreateDirectoryA(Path, NULL)
    end,
   
    DownloadUrlToFile = function(self, URL, Path)
      Library.wininet.DeleteUrlCacheEntryA(URL); -- * Clean cache
      Library.urlmon.URLDownloadToFileA(nil, URL, Path, 0, 0); -- * Download
    end,
  },
}

FFI_Helpers.Explorer:CreateFolder('./nl/DrainYaw/')
FFI_Helpers.Explorer:CreateFolder('./nl/DrainYaw/Fonts/')

local Math_Helpers = {
  normalize_yaw = function(self, Yaw)
    while (Yaw > 180.0) do
      Yaw = Yaw - 360.0 end

    while (Yaw < -180.0) do
      Yaw = Yaw + 360.0 end

    return Yaw
  end,

  linear_interpolation = function(self, Start, End, Value)
    return Start + (End - Start) * Value
  end,

  closest_point = function(self, position, start, _end)
    local To  = position - start
    local Dir = _end - start
    local Length = #Dir

    Dir = Dir / Length

    local rangeAlong = Dir:Dot(To)
    if rangeAlong < 0.0 then
      return start end

    if rangeAlong > Length then
      return _end end

    return start + (Dir * Vector.new(rangeAlong, rangeAlong, rangeAlong))
  end,

  breathe = function(self, speed)
    speed = speed or 2.0

    local Speed = GlobalVars.realtime * speed
    local Anim  = Speed % (math.pi * 2.0)
    Anim        = math.abs(-math.pi + Anim)

    return math.sin(Anim)
  end,
}

local CheatVars = {
  ['Aimbot'] = {
    Ragebot = {
      ['Main'] = {
        Enable           = Menu.FindVar('Aimbot', 'Ragebot', 'Main', 'Enable Ragebot'),
        SilentAim        = Menu.FindVar('Aimbot', 'Ragebot', 'Main', 'Silent Aim'),
        Fov              = Menu.FindVar('Aimbot', 'Ragebot', 'Main', 'FOV'),
        OverrideResolver = Menu.FindVar('Aimbot', 'Ragebot', 'Main', 'Override Resolver'),
      },

      ['Accuracy'] = {
        Autowall         = Menu.FindVar('Aimbot', 'Ragebot', 'Accuracy', 'Autowall'),
        HitChance        = Menu.FindVar('Aimbot', 'Ragebot', 'Accuracy', 'Hit Chance'),
        MinimumDamage    = Menu.FindVar('Aimbot', 'Ragebot', 'Accuracy', 'Minimum Damage'),
        StaticPointScale = Menu.FindVar('Aimbot', 'Ragebot', 'Accuracy', 'Static Point Scale'),
        HeadScale        = Menu.FindVar('Aimbot', 'Ragebot', 'Accuracy', 'Head Scale'),
        BodyScale        = Menu.FindVar('Aimbot', 'Ragebot', 'Accuracy', 'Body Scale'),
      },

      ['Exploits'] = {
        HideShots = Menu.FindVar('Aimbot', 'Ragebot', 'Exploits', 'Hide Shots'),
        DoubleTap = Menu.FindVar('Aimbot', 'Ragebot', 'Exploits', 'Double Tap'),
      },

      ['Misc'] = {
        BodyAim    = Menu.FindVar('Aimbot', 'Ragebot', 'Misc', 'Body Aim'),
        SafePoints = Menu.FindVar('Aimbot', 'Ragebot', 'Misc', 'Safe Points'),
      },
    },

    AntiAim = {
      ['Main'] = {
        Enable      = Menu.FindVar('Aimbot', 'Anti Aim', 'Main', 'Enable Anti Aim'),
        Pitch       = Menu.FindVar('Aimbot', 'Anti Aim', 'Main', 'Pitch'),
        YawBase     = Menu.FindVar('Aimbot', 'Anti Aim', 'Main', 'Yaw Base'),
        YawAdd      = Menu.FindVar('Aimbot', 'Anti Aim', 'Main', 'Yaw Add'),
        YawModifier    = Menu.FindVar('Aimbot', 'Anti Aim', 'Main', 'Yaw Modifier'),
        ModifierDegree = Menu.FindVar('Aimbot', 'Anti Aim', 'Main', 'Modifier Degree'),
      },

      ['FakeLag'] = {
        Enable = Menu.FindVar('Aimbot', 'Anti Aim', 'Fake Lag', 'Enable Fake Lag'),
        Limit  = Menu.FindVar('Aimbot', 'Anti Aim', 'Fake Lag', 'Limit'),
        Random = Menu.FindVar('Aimbot', 'Anti Aim', 'Fake Lag', 'Randomization'),
      },

      ['FakeAngle'] = {
        Enable             = Menu.FindVar('Aimbot', 'Anti Aim', 'Fake Angle', 'Enable Fake Angle'),
        Inverter           = Menu.FindVar('Aimbot', 'Anti Aim', 'Fake Angle', 'Inverter'),
        LeftLimit          = Menu.FindVar('Aimbot', 'Anti Aim', 'Fake Angle', 'Left Limit'),
        RightLimit         = Menu.FindVar('Aimbot', 'Anti Aim', 'Fake Angle', 'Right Limit'),
        FakeOptions        = Menu.FindVar('Aimbot', 'Anti Aim', 'Fake Angle', 'Fake Options'),
        LBYMode            = Menu.FindVar('Aimbot', 'Anti Aim', 'Fake Angle', 'LBY Mode'),
        FreestandingDesync = Menu.FindVar('Aimbot', 'Anti Aim', 'Fake Angle', 'Freestanding Desync'),
        DesyncOnShot       = Menu.FindVar('Aimbot', 'Anti Aim', 'Fake Angle', 'Desync On Shot'),
      },

      ['Misc'] = {
        SlowWalk    = Menu.FindVar('Aimbot', 'Anti Aim', 'Misc', 'Slow Walk'),
        LegMovement = Menu.FindVar('Aimbot', 'Anti Aim', 'Misc', 'Leg Movement'),
        FakeDuck    = Menu.FindVar('Aimbot', 'Anti Aim', 'Misc', 'Fake Duck'),
      },
    },
  },
}

local _Cheat = {
  Patterns = {
    Clantag = ffi.cast('INT(__fastcall*)(LPCSTR, LPCSTR)', Utils.PatternScan('engine.dll', '53 56 57 8B DA 8B F9 FF 15') or error('Missing clantag interface.')),
  },

  Fonts = {
    VerdanaBold = {
      [11] = Render.InitFont('Verdana', 11, {'b'}),
    },
   
    SmallestPixel7 = {
      [10] = Render.InitFont('Smallest Pixel-7', 10),
    },

    ActaSymbolsW95Arrows = (function()
      local File = './nl/DrainYaw/Fonts/Acta Symbols W95 Arrows.ttf'
      FFI_Helpers.Explorer:DownloadUrlToFile(
        'https://raw.githubusercontent.com/qhouz/Fonts/main/DrainYaw/Acta Symbols W95 Arrows.ttf',
        File
      )

      return {
        [21] = Render.InitFont(File, 21),
      }
    end)(),
  },

  Stuff = {
    Screen = EngineClient.GetScreenSize(),

    Status = 'BETA',
    Build = 'alpha',
    Version = 2.4,
    Username = Cheat.GetCheatUserName(),
  },

  Flags = {
    Player = {
      FL_ONGROUND   = bit.lshift(1, 0),
      FL_DUCKING    = bit.lshift(1, 1),
      FL_WATERJUMP  = bit.lshift(1, 3),
      FL_ONTRAIN    = bit.lshift(1, 4),
      FL_INRAIN     = bit.lshift(1, 5),
      FL_FROZEN     = bit.lshift(1, 6),
      FL_ATCONTROLS = bit.lshift(1, 7),
      FL_CLIENT     = bit.lshift(1, 8),
      FL_FAKECLIENT = bit.lshift(1, 9),
      FL_INWATER    = bit.lshift(1, 10),
    },

    States = {
      IN_ATTACK    = bit.lshift(1, 0),
      IN_JUMP      = bit.lshift(1, 1),
      IN_DUCK      = bit.lshift(1, 2),
      IN_FORWARD   = bit.lshift(1, 3),
      IN_BACK      = bit.lshift(1, 4),
      IN_USE       = bit.lshift(1, 5),
      IN_CANCEL    = bit.lshift(1, 6),
      IN_LEFT      = bit.lshift(1, 7),
      IN_RIGHT     = bit.lshift(1, 8),
      IN_MOVELEFT  = bit.lshift(1, 9),
      IN_MOVERIGHT = bit.lshift(1, 10),
      IN_ATTACK2   = bit.lshift(1, 11),
      IN_RUN       = bit.lshift(1, 12),
      IN_RELOAD    = bit.lshift(1, 13),
      IN_ALT1      = bit.lshift(1, 14),
      IN_ALT2      = bit.lshift(1, 15),
      IN_SCORE     = bit.lshift(1, 16),
      IN_SPEED     = bit.lshift(1, 17),
      IN_WALK      = bit.lshift(1, 18),
      IN_ZOOM      = bit.lshift(1, 19),
      IN_WEAPON1   = bit.lshift(1, 20),
      IN_WEAPON2   = bit.lshift(1, 21),
      IN_BULLRUSH  = bit.lshift(1, 22),
    },
  },

  Helpers = {
    RollAngle2Vector = function(self, QAngle)
      local forward, right = Vector.new(), Vector.new()

      local pitch, yaw, roll = math.rad(QAngle.pitch), math.rad(QAngle.yaw), math.rad(QAngle.roll)

      local cp, sp = math.cos(pitch), math.sin(pitch)
      local cy, sy = math.cos(yaw), math.sin(yaw)
      local cr, sr = math.cos(roll), math.sin(roll)

      forward.x = cp * cy
      forward.y = cp * sy
      forward.z = -sp

      right.x = (-1 * sr * sp * cy) + (-1 * cr * -sy)
      right.y = (-1 * sr * sp * sy) + (-1 * cr * cy)
      right.z = -1 * sr * cp

      return forward, right
    end,

    RollMovementFix = function(self, cmd)
      local frL, riL = self:RollAngle2Vector(QAngle.new(0, cmd.viewangles.yaw, 0))
      local frC, riC = self:RollAngle2Vector(cmd.viewangles)

      frL.z = 0
      riL.z = 0
      frC.z = 0
      riC.z = 0

      frL = frL / frL:Length()
      riL = riL / riL:Length()
      frC = frC / frC:Length()
      riC = riC / riC:Length()

      local Move = Vector2.new(cmd.forwardmove, cmd.sidemove)
      local Coord = (frL * Move.x) + (riL * Move.y);

      cmd.sidemove = (frC.x * Coord.y - frC.y * Coord.x) / (riC.y * frC.x - riC.x * frC.y)
      cmd.forwardmove = (riC.y * Coord.x - riC.x * Coord.y) / (riC.y * frC.x - riC.x * frC.y)
    end,

    CreateClantag = function(self, Text)
      local Animation = {};

      local Length = #Text
      for index = 1, Length do
        local Left = Text:sub(index, Length)

        local index = index - 1
        local Right = Text:sub(0, index)

        local Text = Left .. ' ' .. Right
        table.insert(Animation, Text)
      end

      return Animation
    end,

    GetCurtime = function(self, Offset)
      return GlobalVars.curtime - (Offset * GlobalVars.interval_per_tick)
    end,

    CanFire = function(self)
      local Player = EntityList.GetLocalPlayer()
      local Weapon = Player:GetActiveWeapon()

      if not Player or not Weapon then
        return false end

      if self:GetCurtime(-16) < Player:GetProp('m_flNextAttack') then
        return false end
     
      if self:GetCurtime(0) < Weapon:GetProp('m_flNextPrimaryAttack') then
        return false end

      return true
    end,

    GetPlayerState = function(self)
      local Player = EntityList.GetLocalPlayer()
      if not Player then
        return end

      -- return -1;

      if bit.band(Player:GetProp('m_fFlags'), 1) == 0 then
        return 4
      end

      if Player:GetProp('m_flDuckAmount') == 1.0 then
        return 2
      end

      if #Player:GetProp('m_vecVelocity') > 10.0 then
        if CheatVars.Aimbot.AntiAim.Misc.SlowWalk:Get() then
          return 5
        end
        return 1
      end

      return 3
    end,
  },
}

local Menu_Handler = {
  -- * Tab Control
  List = {},

  Text_1st = Menu.Text('drainyaw.technologies', '----------------------------------------------------'),
  Text_2nd = Menu.Text('drainyaw.technologies', '                             /drainyaw.lua/'),
  Text_3rd = Menu.Text('drainyaw.technologies', '                      [updated: 11.03.2022]'),
  Text_4th = Menu.Text('drainyaw.technologies', '----------------------------------------------------'),

  Enable_Controller = Menu.Switch('drainyaw.technologies', 'enable drainyaw - best anti-aim script', false),
  Combo_Controller = Menu.Combo('drainyaw.technologies', 'Tab', {''}, 0),
  Text_5th = Menu.Text('drainyaw.technologies', '----------------------------------------------------'),

  Grid_Separator   = Menu.Switch('', '', false):SetVisible(false),

  Reference = {},

  Update = function(self)
    -- * Force update all cheat variables
    for _, Tab in pairs(self.Reference) do
      for _, Table in pairs(Tab) do
        Table.Variable:SetVisible(Table.Condition());
      end
    end
  end,

  New = function(self, Tab, Name, CheatVar, Condition)
    -- * If condition is empty
    Condition = Condition or function(...)
      return true end

    -- * If tab not found
    if self.Reference[Tab] == nil then
      self.Reference[Tab] = {};

      -- * Updating Combo controller
      table.insert(self.List, Tab)
      self.Combo_Controller:UpdateList(self.List)
    end

    -- * If element already exist
    if self.Reference[Tab][Name] ~= nil then
      error(
        ('Already exist element in [%s] tab with [%s] name!'):format(Tab, Name),
        2
      )
    end

    -- * Creating reference
    self.Reference[Tab][Name] = {
      Variable  = CheatVar,
      Condition = function()
        return self.Enable_Controller:Get()
        and (Tab == self.List[self.Combo_Controller:Get() + 1])
        and Condition(self.Reference)
      end,
    }
   
    -- * Force update
    CheatVar:RegisterCallback(function()
      self:Update()
    end)
    self:Update()

    -- * Return cheat variable
    return CheatVar
  end,

  GetMultiCombo = function(self, _bit, index)
    local mask = bit.lshift(1, index) -- * 1 << index
    return bit.band(_bit, mask) ~= 0
  end,

  SetMultiCombo = function(self, ui, index)
    local bitwise = 0x0;
   
    if type(index) ~= 'table' then
      bitwise = index;
    else
      for _, value in pairs(index) do
        local mask = bit.lshift(1, value); -- 1 << index
        bitwise = bit.bor(bitwise, mask); -- bitwise | mask
      end
    end

    if type(ui) ~= 'number' then
      ui:Set(bitwise)
    end

    return bitwise
  end
}

local _Render = {
  Colors = {
    Transperent = Color.new(1.0, 1.0, 1.0, 0.25),

    Black = Color.new(0.05, 0.05, 0.05, 0.5),
    White = Color.new(1.0, 1.0, 1.0),
   
    Orange = Color.new(1.0, 0.53, 0.26),
  },

  Stuff = {
    Indicators = {
      Animations = {
        DT = {
          Value = 0.0,
        },
      },
      State = {
        {Preset = '/RUNNING/', Colored = false},
        {Preset = '/CROUCH/',  Colored = false},
        {Preset = '/T-34/',    Colored = false},
        {Preset = '/AEROBIC/', Colored = false},
        {Preset = '+BOSSAA+',  Colored = true},
      },
    },
  },

  Helpers = {
    -- * [Render] ColorCopy
    ColorCopy = function(self, Color)
      return Color.new(Color.r, Color.g, Color.b, Color.a)
    end,

    -- * [Render] MultiText
    CalcMultiTextSize = function(self, Table, ...)
      local Position = Vector2.new(0.0, 0.0)
      local arguments = {...}
      local fonts = {}

      if arguments[1] then
        table.insert(fonts, arguments[1])
      end

      if arguments[2] then
        table.insert(fonts, arguments[2])
      end

      for _, Key in pairs(Table) do
        local Size = Render.CalcTextSize(Key.Text, unpack(fonts))
        Position.x = Position.x + Size.x
        if Size.y > Position.y then
          Position.y = Size.y
        end
      end

      return Position
    end,

    -- * [Render] MultiText
    MultiText = function(self, Table, Position, ...)
      local arguments = {...}
      local fonts = {}

      if arguments[1] then
        table.insert(fonts, arguments[1])
      end

      if arguments[2] and type(arguments[2]) ~= 'boolean' then
        table.insert(fonts, arguments[2])
      end

      for _, Key in pairs(Table) do
        Render.Text(Key.Text, Position, Key.Color, ...)
        Position.x = Position.x + Render.CalcTextSize(Key.Text, unpack(fonts)).x
      end
    end,
  }
}

local Lua_Elements = {
  ['Anti-aim'] = {
    Preset = Menu_Handler:New('Anti-aim', 'Preset', Menu.Combo('drainyaw.technologies', 'Preset', {'Stable', 'Alpha', 'Agressive'}, 0.0)),
    Global = Menu_Handler:New('Anti-aim', 'Global', Menu.MultiCombo('drainyaw.technologies', 'Anti-Aim', {'Adaptive Fake Lags', 'Manual Anti-aims', 'Anti-aim on use', 'Edge yaw', 'Teleport EX', 'Roll'}, 0.0)),
    InAir = Menu_Handler:New('Anti-aim', 'In Air', Menu.Combo('drainyaw.technologies', 'In Air Anti-Aim', {'Static', 'Jitter'}, 0.0)),
  },

  ['Anti-bruteforce'] = {
    Global = Menu_Handler:New('Anti-bruteforce', 'Global', Menu.MultiCombo('drainyaw.technologies', 'Anti-bruteforce on', {'Running', 'Crouch', 'Stand', 'Aerobic', 'Slow motion'}, 0.0)),
  },

  ['Visuals'] = {
    Global = Menu_Handler:New('Visuals', 'Global', Menu.MultiCombo('drainyaw.technologies', 'Visuals', {'Lua name', 'Anti-brute time', 'Anti-Aim Gradient', 'Anti-Aim Presets', 'Circles Arrows', 'Manual Arrows', 'Keybinds', 'Keybinds Always Show'}, 0.0)),
    _1st_Color = Menu_Handler:New('Visuals', 'Main Color', Menu.ColorEdit('drainyaw.technologies', 'Main Color', _Render.Colors.Orange)),
    _2nd_Color = Menu_Handler:New('Visuals', 'Second Color', Menu.ColorEdit('drainyaw.technologies', 'Second Color', _Render.Colors.White)),
    Keybinds = Menu_Handler:New('Visuals', 'Keybinds', Menu.MultiCombo('drainyaw.technologies', 'Keybinds', {'Roll', 'Double Tap', 'On shot anti-aim', 'Force Safe point', 'Force Body aim', 'Freestanding', 'Edge yaw'}, 0.0)),
  },

  ['Other'] = {
    Global = Menu_Handler:New('Other', 'Global', Menu.MultiCombo('drainyaw.technologies', 'Other', {'Clantag', 'Anim. Breaker', 'Kill Say'}, 0.0)),
    Config = Menu_Handler:New('Other', 'Config', Menu.Button('drainyaw.technologies', 'Load Default Config', 'Load Default Config')),
  },
}

local Memory = {
  Helpers = {
    AnimBreaker = {
      cache = {},
      set_parameter = function(self, pointer, layer, start, _end)
        local address = ffi.cast('SIZE_T', pointer)
        if address == 0x0 then
          return false end
   
        local studio_hdr = ffi.cast('PVOID*', address + 0x2950)[0]
        if studio_hdr == nil then
          return false end
   
        local poseparameter = FFI_Helpers.Client.get_poseparameter(studio_hdr, layer)
        if poseparameter == nil or poseparameter == 0x0 then
          return end

        -- * create backup array if not exist
        if self.cache[layer] == nil then
          self.cache[layer] = {};
   
          self.cache[layer].m_flStart = poseparameter.m_flStart
          self.cache[layer].m_flEnd = poseparameter.m_flEnd
   
          self.cache[layer].m_flState = poseparameter.m_flState
   
          self.cache[layer].installed = false
          return true
        end

        -- * setup anim. breaker
        if start ~= nil and not self.cache[layer].installed then

          poseparameter.m_flStart = start
          poseparameter.m_flEnd   = _end

          poseparameter.m_flState = (poseparameter.m_flStart + poseparameter.m_flEnd) /2

          self.cache[layer].installed = true
          return true
        end

        -- * backup
        if self.cache[layer].installed then
          poseparameter.m_flStart = self.cache[layer].m_flStart
          poseparameter.m_flEnd   = self.cache[layer].m_flEnd

          poseparameter.m_flState = self.cache[layer].m_flState

          self.cache[layer].installed = false
          return true
        end

        return false
      end,
    }
  },

  Stuff = {
    AntiAim = {
      Presets = function(self)
        return {
          yaw = {
            add = {
              left = {
                {-15, -20, -15, -7, -12},
                {-18, 0, -18, 0, 8},
                {0, 0, 0, 0, -8},
              },
              right = {
                {22, 20, 22, -12, 20},
                {8, 0, 8, 0, 8},
                {0, 0, 0, 0, -8},
              },
            },

            modifier = {
              type = {
                {1, 1, 1, 1, 1},
                {1, 1, 1, 1, 1},
                {1, 1, 1, 1, 1},
              },
              degree = {
                {48, 22, 22, 1, 30},
                {54, 64, 54, 43, 63},
                {80, 60, 43, 77, 60},
              },
            },
          },

          fake = {
            jitter = {
              {false, false, false, false, false},
              {false, false, false, false, false},
              {false, false, false, false, false},
            },
            left = {
              {60, 60, 60, 47, 60},
              {60, 60, 60, 60, 60},
              {60, 60, 60, 60, 60},
            },
            right = {
              {60, 60, 60, 47, 60},
              {60, 60, 60, 60, 60},
              {60, 60, 60, 60, 60}
            },
          },

          options = {
            fake = {
              {2, 2, 2, {0, 1}, 2},
              {2, 2, 2, 2, 2},
              {2, 2, 2, 2, 2},
            },
            lby = {
              {0, 1, 1, 1, 1},
              {0, 1, 1, 1, 1},
              {1, 1, 1, 1, 1},
            },
            freestand = {
              {0, 0, 0, 0, 0},
              {0, 0, 0, 0, 0},
              {0, 0, 0, 0, 0},
            },
            onshot = {
              {2, 1, 2, 2, 2},
              {0, 0, 0, 2, 2},
              {0, 0, 0, 0, 0},
            },
          },
        }
      end,

      EdgeYaw = {
        Vector = Vector.new(),
        Working = nil,
      },

      LegitAA = {
        Delay = nil,
      },

      AntiBruteforce = {
        Players = {},
        Time = nil,
      },

      Roll = {
        Working = nil,
      },
    },

    TeleportEX = {
      Delay = 0.0,
    },
   
    AdaptiveFakeLags = {
      Default = nil,
    },
  },

  Clantag = {
    Source = _Cheat.Helpers:CreateClantag('drainyaw.lua'),
    String = nil,
  },

  KillSay = {
    'get good get drainyaw.lua',
    'get drainyaw on : shoppy.gg/@sadboyzzz',
    '1',
    'gg = get good',
    'UFF YAAA 1 TAP :D',
    'nice rezolver bruh',
    'trash aa',
    'my mom is better than u!!!',
    'mad cuz black?',
    'mad mad mad??',
    'drainyaw.lua on top!',
    'you are really that bad?????',
    'bruhhh',
    '111111111',
    'die russians',
    'ez mapa',
    'UFFF',
    'get tapped 1 nn',
    'sit nn doggo',
    'kys',
    'idk i think you are just bad',
    'LOLLLL 1',
    'head shot 1',
    'ez 1 doggi',
    'get better cheat like gamesense and go to shoppy.gg/@sadboyzzz for best lua ',
    'shoppy.gg/@sadboyzzz 1 sit nn dogs',
    'youtube: https://www.youtube.com/c/sadboyzzz drainyaw.lua p1000',
  
  },
}

local Script = {
  Hooks = {
    destroy = {
      ['Adaptive Fake Lags'] = function(self)
        local Limit = CheatVars.Aimbot.AntiAim.FakeLag.Limit;
        if Memory.Stuff.AdaptiveFakeLags.Default ~= nil then
          Limit:Set(Memory.Stuff.AdaptiveFakeLags.Default);
          Memory.Stuff.AdaptiveFakeLags.Default = nil;
        end
      end,
    },

    prediction = {
      ['Anti-aim'] = function(self, cmd)
        if not Menu_Handler.Enable_Controller:Get() then
          return end

        Memory.Stuff.AntiAim.EdgeYaw.Working = nil;
        local Player = EntityList.GetLocalPlayer()
        if not Player then
          return end

        local Options = Lua_Elements['Anti-aim'].Global:Get()
        local AA = Memory.Stuff.AntiAim:Presets()

        local Preset = Lua_Elements['Anti-aim'].Preset:Get() + 1
        local State = _Cheat.Helpers:GetPlayerState() or 3
        if not State then
          return end

        local View = EngineClient.GetViewAngles()
        local Side = AntiAim.GetInverterState()
        local YawBase = CheatVars.Aimbot.AntiAim.Main.YawBase:Get()

        local LegitAA = (Menu_Handler:GetMultiCombo(Options, 2)) and (bit.band(cmd.buttons, _Cheat.Flags.States.IN_USE) == _Cheat.Flags.States.IN_USE)
        local Manual = (YawBase == 3.0 or YawBase == 2.0) -- Left or Right
       
        CheatVars.Aimbot.AntiAim.Main.YawAdd:Set(Side and AA.yaw.add.left[Preset][State] or AA.yaw.add.right[Preset][State])
        CheatVars.Aimbot.AntiAim.Main.YawModifier:Set(AA.yaw.modifier.type[Preset][State])
        CheatVars.Aimbot.AntiAim.Main.ModifierDegree:Set(AA.yaw.modifier.degree[Preset][State])

        local LeftLimit  = AA.fake.left[Preset][State]
        local RightLimit = AA.fake.right[Preset][State]

        if AA.fake.jitter[Preset][State] and GlobalVars.tickcount % 4.0 > 1.0 then
          LeftLimit  = 18.0
          RightLimit = 18.0
        end

        CheatVars.Aimbot.AntiAim.FakeAngle.LeftLimit:Set(LeftLimit)
        CheatVars.Aimbot.AntiAim.FakeAngle.RightLimit:Set(RightLimit)

        Menu_Handler:SetMultiCombo(CheatVars.Aimbot.AntiAim.FakeAngle.FakeOptions, AA.options.fake[Preset][State])

        if (Menu_Handler:GetMultiCombo(Options, 1) and Manual) or LegitAA then -- * Static
          CheatVars.Aimbot.AntiAim.Main.YawModifier:Set(0)
          CheatVars.Aimbot.AntiAim.FakeAngle.FakeOptions:SetBool(2, false)
        end

        if Lua_Elements['Anti-aim'].InAir:Get() == 0.0 and State == 4 then
          CheatVars.Aimbot.AntiAim.FakeAngle.FakeOptions:SetBool(2, false)
        end

        CheatVars.Aimbot.AntiAim.FakeAngle.LBYMode:Set(AA.options.lby[Preset][State])
        CheatVars.Aimbot.AntiAim.FakeAngle.FreestandingDesync:Set(AA.options.freestand[Preset][State])
        CheatVars.Aimbot.AntiAim.FakeAngle.DesyncOnShot:Set(AA.options.onshot[Preset][State])

        -- * Edge Yaw
        if Menu_Handler:GetMultiCombo(Options, 3) and not Manual then
          local Flags = Player:GetProp('m_fFlags')
          if bit.band(Flags, _Cheat.Flags.Player.FL_ONGROUND) ~= 0 then -- * if on ground
            if ClientState.m_choked_commands == 0 then
              Memory.Stuff.AntiAim.EdgeYaw.Vector = Player:GetEyePosition()
            end

            local TraceEnd = {};
            local Distance = {};

            for flYaw = 18, 360, 18 do
              flYaw = Math_Helpers:normalize_yaw(flYaw)
              local angEdge = QAngle.new(0, flYaw, 0)
     
              local vecTraceEnd = Memory.Stuff.AntiAim.EdgeYaw.Vector + Cheat.AngleToForward(angEdge) * 198
     
              local traceInfo = EngineTrace.TraceRay(Memory.Stuff.AntiAim.EdgeYaw.Vector, vecTraceEnd, Player, 0x46004003)
              table.insert(Distance, Memory.Stuff.AntiAim.EdgeYaw.Vector:DistTo(traceInfo.endpos))
     
              local flFraction = traceInfo.fraction
              local pEntity = traceInfo.hit_entity
     
              if pEntity and pEntity:GetClassName() == 'CWorld' and flFraction < 0.3 then
                TraceEnd[#TraceEnd+1] = {
                  vecTraceEnd = vecTraceEnd,
                  flYaw = flYaw,
                }
              end
            end

            table.sort(Distance)
            if Distance[1] > 30.0 then
              goto skip end
       
            table.sort(TraceEnd, function(a, b)
              return a.flYaw < b.flYaw
            end)
       
            table.remove(TraceEnd, #TraceEnd)
            local angEdge

            if #TraceEnd >= 3 then
              local vecTraceCenter = Math_Helpers:linear_interpolation(TraceEnd[1].vecTraceEnd, TraceEnd[#TraceEnd].vecTraceEnd, 0.5)
              angEdge = Cheat.VectorToAngle(Memory.Stuff.AntiAim.EdgeYaw.Vector - vecTraceCenter)
            end

            if angEdge then
              local flYaw = View.yaw
              local flEdgeYaw = angEdge.yaw
     
              local flDiff = Math_Helpers:normalize_yaw(flEdgeYaw - flYaw)
              if math.abs(flDiff) < 90.0 then
                flDiff = 0.0
                flYaw = Math_Helpers:normalize_yaw(flEdgeYaw + 180.0)
              end
     
              -- Static yaw
              local flNewYaw = -flYaw

              -- Apply edge yaw
              flNewYaw = Math_Helpers:normalize_yaw(flNewYaw + flEdgeYaw)
              flNewYaw = Math_Helpers:normalize_yaw(flNewYaw + flDiff + 180)
     
              AntiAim.OverrideYawOffset(flNewYaw)
              Memory.Stuff.AntiAim.EdgeYaw.Working = true;
            end

            ::skip::
          end
        end

        -- * Anti-aim on Use
        if not LegitAA then
          Memory.Stuff.AntiAim.LegitAA.Delay = nil; return end

        if Memory.Stuff.AntiAim.LegitAA.Delay == nil then
          Memory.Stuff.AntiAim.LegitAA.Delay = GlobalVars.tickcount
        end

    if Player:GetProp('m_bIsDefusing') or Player:GetProp('m_bIsGrabbingHostage') then
          return end
                                                                   
        if GlobalVars.tickcount - Memory.Stuff.AntiAim.LegitAA.Delay <= 5.0 then
          return end

        cmd.buttons = bit.band(cmd.buttons, bit.bnot(_Cheat.Flags.States.IN_USE))
     
        AntiAim.OverrideYawOffset(-180.0)
        AntiAim.OverridePitch(View.pitch)
      end,

      ['Teleport EX'] = function(self, cmd)
        if not Menu_Handler.Enable_Controller:Get() then
          return end
         
        local Options = Lua_Elements['Anti-aim'].Global:Get()
        if not Menu_Handler:GetMultiCombo(Options, 4) then
          return end

        local Player = EntityList.GetLocalPlayer()
        if not Player then
          return end
       
        local Flags = Player:GetProp('m_fFlags')
        if bit.band(Flags, _Cheat.Flags.Player.FL_ONGROUND) ~= 0 then
          return end

        if not CheatVars.Aimbot.Ragebot.Exploits.DoubleTap:Get() then
          return end

        if Exploits.GetCharge() < 0.5 then
          return end

        local PlayerList = EntityList.GetPlayers()
        if not PlayerList then
          return end

        if #PlayerList == 0 then
          return end

        local Stomach = Player:GetHitboxCenter(3)
        for _, Pointer in ipairs(PlayerList) do
          if Pointer:IsTeamMate() then
            goto skip end

          if Pointer:IsDormant() then
            return end

          if Pointer:GetProp('m_lifeState') then
            return end
         
          local Trace_t = Cheat.FireBullet(Pointer, Pointer:GetEyePosition(), Stomach)

          if Trace_t.damage > 0.0 then
            Exploits.ForceTeleport()
            Memory.Stuff.TeleportEX.Delay = GlobalVars.realtime
          end
          ::skip::
        end
      end,

      ['Roll'] = function(self, cmd)
        Memory.Stuff.AntiAim.Roll.Working = nil;

        if not Menu_Handler.Enable_Controller:Get() then
          return end
       
        local Options = Lua_Elements['Anti-aim'].Global:Get()
        if not Menu_Handler:GetMultiCombo(Options, 5) then
          return end

        local Player = EntityList.GetLocalPlayer()
        if not Player then
          return end

        local YawBase = CheatVars.Aimbot.AntiAim.Main.YawBase:Get()
        local Force = (YawBase == 3.0 or YawBase == 2.0) and Menu_Handler:GetMultiCombo(Options, 1)

        local Velocity = Player:GetProp('m_vecVelocity')
        if #Velocity > 10.0 and not CheatVars.Aimbot.AntiAim.Misc.SlowWalk:Get() and not Force then
          return end
       
        local Degree = 50.0
        if not AntiAim.GetInverterState() then
          Degree = -Degree;
        end

        cmd.viewangles.roll = Degree;
        CheatVars.Aimbot.AntiAim.Main.YawAdd:Set(0);
        Memory.Stuff.AntiAim.Roll.Working = true;
      end,

      ['Anim. Breaker'] = function(self, cmd)
        local Options = Lua_Elements.Other.Global:Get()
        if not Menu_Handler:GetMultiCombo(Options, 1) then
          return end

        -- * info
        local index = EngineClient.GetLocalPlayer()
       
        -- * client
        local player = FFI_Helpers.Client.EntityList.get_client_entity(index)
        if player == nil then
          return end

        -- * transform
        -- local address = ffi.cast('SIZE_T', player)
        -- if address == 0x0 then
        --   return end

        -- local animstate = ffi.cast('PVOID*', address + engine_stuff.offset.animstate)[0]
        -- if animstate == nil then
        --   return end
     
        -- animstate = ffi.cast('SIZE_T', animstate)
        -- if animstate == 0x0 then
        --   return end
         
        -- local land = ffi.cast('BOOL*', animstate + 0x109)[0]
        -- if land == nil then
        --   return end

        -- * setting poseparameter
        Memory.Helpers.AnimBreaker:set_parameter(player, 0, -100, -180) -- * STRAFE_YAW
        Memory.Helpers.AnimBreaker:set_parameter(player, 6, 0.999, 1.0) -- * JUMP_FALL
        -- memory_stuff.anim_breaker:set_parameter(player, 12, 0.999, 1) -- * BODY_PITCH
      end,
    },

    createmove = {
      ['Roll'] = function(self, cmd)
        if not Memory.Stuff.AntiAim.Roll.Working then
          return end
       
        _Cheat.Helpers:RollMovementFix(cmd)
      end,

      ['Anim. Breaker'] = function(self, cmd)
        local index = EngineClient.GetLocalPlayer()
       
        -- * client
        local player = FFI_Helpers.Client.EntityList.get_client_entity(index)
        if player == nil then
          return end

        for key, _ in pairs(Memory.Helpers.AnimBreaker.cache) do
          Memory.Helpers.AnimBreaker:set_parameter(player, key)
        end
      end,
    },

    Menu = {
      ['Adaptive Fake Lags'] = function(self)
        local Options = Lua_Elements['Anti-aim'].Global:Get()
        local Limit = CheatVars.Aimbot.AntiAim.FakeLag.Limit;

        if Menu_Handler.Enable_Controller:Get() and Menu_Handler:GetMultiCombo(Options, 0) and CheatVars.Aimbot.Ragebot.Exploits.HideShots:Get() and not CheatVars.Aimbot.Ragebot.Exploits.DoubleTap:Get() then
          Memory.Stuff.AdaptiveFakeLags.Default = Limit:Get();
          Limit:Set(1);
        else
          self.Hooks.destroy['Adaptive Fake Lags'](self)
        end
      end,
    },

    draw = {
      ['Indicators'] = function(self)
        if not EngineClient.IsInGame() then
          return end
     
        local Player = EntityList.GetLocalPlayer()
        if not Player then
          return end
       
        if not Player:IsAlive() then
          return end

        local Visuals = Lua_Elements['Visuals'].Global:Get()
        if Visuals == 0.0 then -- * if no one element
          return end

        local font = _Cheat.Fonts.VerdanaBold[11]
        local Position = Vector2.new(_Cheat.Stuff.Screen.x /2.0, _Cheat.Stuff.Screen.y /2.0 + 22.0)

        local Side = AntiAim.GetInverterState()
        local State = _Cheat.Helpers:GetPlayerState()
        State = _Render.Stuff.Indicators.State[State] or _Render.Stuff.Indicators.State[3] -- * Default

        local _1st_Color = Lua_Elements['Visuals']._1st_Color:GetColor()
        local _2nd_Color = Lua_Elements['Visuals']._2nd_Color:GetColor()
       
        local Left = Side and _2nd_Color or _1st_Color
        local Right = Side and _1st_Color or _2nd_Color

        -- * Circles Arrows
        if Menu_Handler:GetMultiCombo(Visuals, 4) then
          local Radius = 30.0
          local View = EngineClient.GetViewAngles()
          local Real = Math_Helpers:normalize_yaw(AntiAim.GetCurrentRealRotation() - View.yaw - 180.0)

          local LeftRad  = math.rad(Real - 1.0)
          local RightRad = math.rad(Real + 1.0)

          local Center = Vector2.new(_Cheat.Stuff.Screen.x /2.0, _Cheat.Stuff.Screen.y /2.0)
          local Size = 10.0
          local Sharpness = 4.0

          local Gap = math.rad(Size * 2)

          local Triangles = {
            Left = {
              Vector2.new(Center.x + (Radius * math.sin(LeftRad)),                   Center.y + (Radius * math.cos(LeftRad))),
              Vector2.new(Center.x + (Radius + Size) * math.sin(LeftRad),            Center.y + (Radius + Size) * math.cos(LeftRad)),
              Vector2.new(Center.x + (Radius - Sharpness) * math.sin(LeftRad - Gap), Center.y + (Radius - Sharpness) * math.cos(LeftRad - Gap)),
            },

            Right = {
              Vector2.new(Center.x + (Radius * math.sin(RightRad)),                   Center.y + (Radius * math.cos(RightRad))),
              Vector2.new(Center.x + (Radius + Size) * math.sin(RightRad),            Center.y + (Radius + Size) * math.cos(RightRad)),
              Vector2.new(Center.x + (Radius - Sharpness) * math.sin(RightRad + Gap), Center.y + (Radius - Sharpness) * math.cos(RightRad + Gap)),
            },
          }

          Render.PolyFilled(Left, unpack(Triangles.Left));
          Render.PolyFilled(Right, unpack(Triangles.Right));

          Position.y = Position.y + 25.0
        end

        -- * Lua name
        if Menu_Handler:GetMultiCombo(Visuals, 0) then
          local Text = {
            {Color = Left, Text = 'drai'},
            {Color = Right, Text = 'nyaw°'},
          }

          local TextSize = _Render.Helpers:CalcMultiTextSize(Text, 11, font)
          local NewPosition = Vector2.new(Position.x - TextSize.x /2.0 + 2.0, Position.y + 1.0)

          -- * Alpha Build
          local backup = _1st_Color.a
          _1st_Color.a = Math_Helpers:breathe(1) * backup

          Render.Text('ALPHA', Vector2.new(Position.x + 1.0, Position.y - 2.0), _1st_Color, 10, _Cheat.Fonts.SmallestPixel7[10], true, true)
          _1st_Color.a = backup

          Render.Text('drainyaw°', NewPosition + 1.0, _Render.Colors.Black, 11, font)
          _Render.Helpers:MultiText(Text, NewPosition, 11, font)

          Position.y = Position.y + TextSize.y + 1.0
        end

        local font = _Cheat.Fonts.SmallestPixel7[10]

        -- * Anti-brute time
        if Menu_Handler:GetMultiCombo(Visuals, 1) and Memory.Stuff.AntiAim.AntiBruteforce.Time ~= nil then
          local ResetTime = 5.0
          local AntiBrute_Time = ResetTime + Memory.Stuff.AntiAim.AntiBruteforce.Time

          local Ratio = 1.0
          if AntiBrute_Time > GlobalVars.realtime then
            Ratio = (AntiBrute_Time - GlobalVars.realtime) / ResetTime
          else
            Memory.Stuff.AntiAim.AntiBruteforce.Time = nil
          end

          Position.y = Position.y + 3.0

          local LineSize = Vector2.new(29.0, 3.0)

          Render.BoxFilled(
            Vector2.new(Position.x - LineSize.x, Position.y),
            Vector2.new(Position.x + LineSize.x, Position.y + LineSize.y),
            _Render.Colors.Black
          )

          Render.BoxFilled(
            Vector2.new(Position.x - LineSize.x + 1.0, Position.y + 1.0),
            Vector2.new(Position.x - LineSize.x + 1.0 + ((LineSize.x - 1.0) * 2.0) * Ratio, Position.y + LineSize.y - 1.0),
            _1st_Color
          )

          Position.y = Position.y + LineSize.y + 3.0
        end

        -- * Anti-Aim Gradient
        if Menu_Handler:GetMultiCombo(Visuals, 2) then
          Position.y = Position.y + 3.0

          local LineSize = Vector2.new(28.0, 1.0)
          local Deepness = 6.0

          Render.BoxFilled(
            Vector2.new(Position.x - LineSize.x, Position.y),
            Vector2.new(Position.x, Position.y + LineSize.y),
            Left
          )

          Render.BoxFilled(
            Vector2.new(Position.x + LineSize.x, Position.y),
            Vector2.new(Position.x, Position.y + LineSize.y),
            Right
          )

          local Fade = _Render.Helpers:ColorCopy(Left)
          Fade.a = 0.0

          Render.GradientBoxFilled(
            Vector2.new(Position.x - LineSize.x, Position.y),
            Vector2.new(Position.x - LineSize.x + LineSize.y, Position.y + Deepness),
            Left, Left,
            Fade, Fade
          )

          local Fade = _Render.Helpers:ColorCopy(Right)
          Fade.a = 0.0

          Render.GradientBoxFilled(
            Vector2.new(Position.x + LineSize.x, Position.y),
            Vector2.new(Position.x + LineSize.x - LineSize.y, Position.y + Deepness),
            Right, Right,
            Fade, Fade
          )

          Position.y = Position.y + 2.0
        end

        -- * Anti-Aim Preset
        if Menu_Handler:GetMultiCombo(Visuals, 3) then

          local TextSize = Render.CalcTextSize(State.Preset, 10, font)
          local NewPosition = Vector2.new(Position.x - TextSize.x /2.0, Position.y)

          Render.Text(State.Preset, NewPosition, State.Colored and _1st_Color or _2nd_Color, 10, font, true, false)
          Position.y = Position.y + 9.0
        end

        -- * Manaul Arrows
        if Menu_Handler:GetMultiCombo(Visuals, 5) then
          local YawBase = CheatVars.Aimbot.AntiAim.Main.YawBase:Get();
          local Center = Vector2.new(_Cheat.Stuff.Screen.x /2.0, _Cheat.Stuff.Screen.y /2.0);

          -- * Left
          local Text = 'w';
          local TextSize = Render.CalcTextSize(Text, 21, _Cheat.Fonts.ActaSymbolsW95Arrows[21])

          Render.Text(Text, Vector2.new(Center.x - 55.0 - TextSize.x, Center.y - TextSize.y /2.0 + 2.0), (YawBase == 3.0) and _1st_Color or _2nd_Color, 21, _Cheat.Fonts.ActaSymbolsW95Arrows[21])
         
          -- * Right
          local Text = 'x';
          local TextSize = Render.CalcTextSize(Text, 21, _Cheat.Fonts.ActaSymbolsW95Arrows[21])

          Render.Text(Text, Vector2.new(Center.x + 55.0, Center.y - TextSize.y /2.0 + 2.0), (YawBase == 2.0) and _1st_Color or _2nd_Color, 21, _Cheat.Fonts.ActaSymbolsW95Arrows[21])
        end

        -- * Keybinds
        if Menu_Handler:GetMultiCombo(Visuals, 6) then
          local AlwaysOn = Menu_Handler:GetMultiCombo(Visuals, 7)
          local Keys = Lua_Elements['Visuals'].Keybinds:Get()

          local AnimTime = GlobalVars.frametime * 4.0
          if _Cheat.Helpers:CanFire() then
            _Render.Stuff.Indicators.Animations.DT.Value = math.min(_Render.Stuff.Indicators.Animations.DT.Value + AnimTime, 1.0)
          else
            _Render.Stuff.Indicators.Animations.DT.Value = math.max(_Render.Stuff.Indicators.Animations.DT.Value - AnimTime, 0.0)
          end

          local Keybinds = {
            [0] = {Text = 'ROLL', Active = Memory.Stuff.AntiAim.Roll.Working},
            [1] = {Text = 'DT',   Active = CheatVars.Aimbot.Ragebot.Exploits.DoubleTap:Get(), Circle = _Render.Stuff.Indicators.Animations.DT.Value},
            [2] = {Text = 'OS',   Active = CheatVars.Aimbot.Ragebot.Exploits.HideShots:Get()},
            [3] = {Text = 'SP',   Active = CheatVars.Aimbot.Ragebot.Misc.SafePoints:Get() == 2.0},
            [4] = {Text = 'FB',   Active = CheatVars.Aimbot.Ragebot.Misc.BodyAim:Get() == 2.0},
            [5] = {Text = 'FS',   Active = CheatVars.Aimbot.AntiAim.Main.YawBase:Get() == 5.0},
            [6] = {Text = 'EDGE', Active = Memory.Stuff.AntiAim.EdgeYaw.Working},
          };
         
          for Index, Value in pairs(Keybinds) do
            if not Menu_Handler:GetMultiCombo(Keys, Index) then
              goto skip end
           
            if Value.Active == nil then
              goto skip end

            if not AlwaysOn and not Value.Active then
              goto skip end

            local TextSize = Render.CalcTextSize(Value.Text, 10, font)
            local NewPosition = Vector2.new(Position.x, Position.y)

            if Value.Active and Value.Circle ~= nil then
              local Size = 3.3
              local Gap = Size * 0.75

              Render.Circle(Vector2.new(NewPosition.x + TextSize.x /2.0 + Gap, NewPosition.y + TextSize.y /2.0), Size, 58.0, _2nd_Color, 1.8, -180, -180 + 360 * Value.Circle)
              NewPosition.x = NewPosition.x - Gap
            end

            NewPosition.x = NewPosition.x - TextSize.x /2.0

            Render.Text(Value.Text, NewPosition, Value.Active and _1st_Color or _Render.Colors.Transperent, 10, font, true, false)
            Position.y = Position.y + 9.0
            ::skip::
          end
        end
      end,

      ['Clan Tag'] = function(self)
        if not EngineClient.IsInGame() then
          return end
     
        local Player = EntityList.GetLocalPlayer()
        if not Player then
          return end
       
        local Team = Player:GetProp('m_iTeamNum')
        if not Team then
          return end
       
        if Team ~= 3 and Team ~= 2 then -- if not ct and not t
          return end

        local Options = Lua_Elements['Other'].Global:Get()
        if not Menu_Handler:GetMultiCombo(Options, 0) then
          return end
                     
        local Index = math.floor(GlobalVars.curtime *3% #Memory.Clantag.Source) + 1
        local Text = Memory.Clantag.Source[Index] or 'UNDEFINED'                                                                                                                                                                                                                                    

        if Text ~= Memory.Clantag.String then
          _Cheat.Patterns.Clantag(Text, Text)
          Memory.Clantag.String = Text
        end
      end,
    },

    events = {
      ['Anti-Bruteforce'] = function(self, event)
        if event:GetName() ~= 'bullet_impact' then
          return end
       
        local AntiBruteforce = Lua_Elements['Anti-bruteforce'].Global:Get()

        if AntiBruteforce == 0 then
          return end

        local State = _Cheat.Helpers:GetPlayerState()
        if not Menu_Handler:GetMultiCombo(AntiBruteforce, State - 1) then
          return end

        local Player = EntityList.GetLocalPlayer()
        if not Player then
          return end

        local userid  = event:GetInt('userid')
        local Pointer = EntityList.GetPlayerForUserID(userid)
        if Pointer:IsTeamMate() then
          return end

        local EntIndex = Pointer:EntIndex()

        local HeadPos   = Player:GetHitboxCenter(0)
        local StartLine = Pointer:GetEyePosition()
        local EndLine   = Vector.new(event:GetFloat('x'), event:GetFloat('y'), event:GetFloat('z'))

        local ClosestPoint = Math_Helpers:closest_point(HeadPos, StartLine, EndLine)
        local Distance = HeadPos:DistTo(ClosestPoint)

        if Distance < 3.0 or Distance > 40.0 then
          return end

        if Memory.Stuff.AntiAim.AntiBruteforce.Players[EntIndex] == nil then
          Memory.Stuff.AntiAim.AntiBruteforce.Players[EntIndex] = {
            Timer = 0.0,
            Shots = 0.0,
          }
        end
       
        local Target = Memory.Stuff.AntiAim.AntiBruteforce.Players[EntIndex]
        local Realtime = GlobalVars.realtime

        if Target.Timer > Realtime then
          return end

        Target.Timer = Realtime + 0.5
        Memory.Stuff.AntiAim.AntiBruteforce.Time = Realtime
      end,

      ['Kill Say'] = function(self, event)
        if event:GetName() ~= 'player_death' then
          return end

        local Options = Lua_Elements.Other.Global:Get()

        if not Menu_Handler:GetMultiCombo(Options, 2) then
          return end
       
        local player_t = EntityList.GetLocalPlayer();

        if not player_t then
          return end

        local userid   = event:GetInt('userid');
        local attacker = event:GetInt('attacker');

        if not userid or not attacker then
          return end

        local userid_t   = EntityList.GetPlayerForUserID(userid);
        local attacker_t = EntityList.GetPlayerForUserID(attacker);

        if not userid_t or not attacker_t then
          return end
       
        if (attacker_t ~= player_t) or (userid_t == player_t) then
          return end
       
        local Random = Utils.RandomInt(1, #Memory.KillSay);
        local Text = Memory.KillSay[Random];

        local Command = ('say %s'):format(Text);

        EngineClient.ExecuteClientCmd(Command)
      end,
    },
  },

  Startup = function(self)
    local function UpdateCombo(Value)
      Menu_Handler.Combo_Controller:SetVisible(Value)
      Menu_Handler.Text_5th:SetVisible(Value)
    end

    Menu_Handler.Enable_Controller:RegisterCallback(function(Value)
      UpdateCombo(Value)
      Menu_Handler:Update()
    end)
   
    Menu_Handler.Combo_Controller:RegisterCallback(function()
      Menu_Handler:Update()
    end)

    UpdateCombo(Menu_Handler.Enable_Controller:Get())

    Cheat.RegisterCallback('destroy', function(...)
      self.Hooks.destroy['Adaptive Fake Lags'](self, ...)
    end)

    Cheat.RegisterCallback('prediction', function(...)
      self.Hooks.prediction['Anti-aim'](self, ...)
      self.Hooks.prediction['Teleport EX'](self, ...)
      self.Hooks.prediction['Roll'](self, ...)
      self.Hooks.prediction['Anim. Breaker'](self, ...)
    end)

    Cheat.RegisterCallback('createmove', function(...)
      self.Hooks.createmove['Roll'](self, ...)
      self.Hooks.createmove['Anim. Breaker'](self, ...)
    end)

    Cheat.RegisterCallback('draw', function(...)
      self.Hooks.draw['Indicators'](self, ...)
      self.Hooks.draw['Clan Tag'](self, ...)
    end)

    Cheat.RegisterCallback('events', function(...)
      self.Hooks.events['Anti-Bruteforce'](self, ...)
      self.Hooks.events['Kill Say'](self, ...)
    end)

    -- ! Adjust Fakelags
    local RestoreFakelags = {
      Menu_Handler.Enable_Controller,
      Lua_Elements['Anti-aim'].Global,
      CheatVars.Aimbot.Ragebot.Exploits.HideShots,
      CheatVars.Aimbot.Ragebot.Exploits.DoubleTap,
    }

    for _, Element in pairs(RestoreFakelags) do
      Element:RegisterCallback(function()
        self.Hooks.Menu['Adaptive Fake Lags'](self)
      end)
    end

    Lua_Elements['Other'].Global:RegisterCallback(function(Value)
      if not Menu_Handler:GetMultiCombo(Value, 0) then
        _Cheat.Patterns.Clantag('', '')
      end
    end)

    Lua_Elements.Other.Config:RegisterCallback(function()
      local AntiAim = Lua_Elements['Anti-aim']
      local Antibrute = Lua_Elements['Anti-bruteforce']
      local Visuals = Lua_Elements['Visuals']
      local Other = Lua_Elements['Other']

      local Active = {true, false, true, false, true, false};
      for index = 1, #AntiAim.Global:GetList() do
        AntiAim.Global:Set(index, Active[index]);
      end
      AntiAim.InAir:Set(1);
     
      for index = 1, #Antibrute.Global:GetList() do
        Antibrute.Global:Set(index, true);
      end

      for index = 1, #Visuals.Global:GetList() do
        Visuals.Global:Set(index, true);
      end
     
      Visuals._1st_Color:SetColor(_Render.Colors.Orange);
      Visuals._2nd_Color:SetColor(_Render.Colors.White);

      local Active = {false, true, true, false, true, false, false};
      for index = 1, #Visuals.Keybinds:GetList() do
        Visuals.Keybinds:Set(index, Active[index]);
      end

      for index = 1, #Other.Global:GetList() do
        Other.Global:Set(index, true);
      end
    end)
  end,
}

Script:Startup()

FFI_Helpers.Client.Cvar.mutli_color_print(
  '[drainyaw] ', 'Attempting to connect the server, please wait patiently.\n',
  '[drainyaw] ', 'Successfully connected to the server, proceeding to authenticate.\n',
  '[drainyaw] ', 'Successfully authenticated! Attempting to load module(s), please wait patiently.\n',
  '[drainyaw] ', ('Successfully loaded module! Welcome back %s, thank you for choosing our script.\n'):format(Cheat.GetCheatUserName()),

  _Render.Colors.Orange, _Render.Colors.White,
  _Render.Colors.Orange, _Render.Colors.White,
  _Render.Colors.Orange, _Render.Colors.White,
  _Render.Colors.Orange, _Render.Colors.White
)
