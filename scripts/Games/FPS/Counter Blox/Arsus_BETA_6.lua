
_G.darktheme =  true
_G.menukey = Enum.KeyCode.Insert

local zuhnmode = Instance.new("ColorCorrectionEffect", workspace.CurrentCamera)
local currentlight = {ambient = game.Lighting.Ambient, brightness = game.Lighting.Brightness, colorBottom = game.Lighting.ColorShift_Bottom, colorTop = game.Lighting.ColorShift_Top,outdoor = game.Lighting.OutdoorAmbient}
function resetl() game.Lighting.Ambient = currentlight.ambient game.Lighting.Brightness = 1 game.Lighting.ColorShift_Bottom = currentlight.colorBottom game.Lighting.ColorShift_Top = currentlight.colorTop game.Lighting.GlobalShadows = true game.Lighting.OutdoorAmbient = currentlight.outdoor end

--http://finity.vip/scripts/finity_lib.lua
local Finity = loadstring(game:HttpGet("https://pastebin.com/raw/dX6nnWth"))()
local FinityWindow = Finity.new(_G.darktheme)
FinityWindow.ChangeToggleKey(_G.menukey)

local runser = game:GetService("RunService")
local lplr = game.Players.LocalPlayer
local mouse = lplr:GetMouse()
local plrs = game:GetService("Players")
local uis = game:GetService("UserInputService")
local bhop = false
local mouse = game.Players.LocalPlayer:GetMouse()
local bfolder = Instance.new("Folder", workspace)
bfolder.Name = "bfolder"

local Legitbot = FinityWindow:Category("Legit")
local LegitbotMain = Legitbot:Sector("Main")
local LegitbotOther = Legitbot:Sector("Other")
local LegitbotBacktrack = Legitbot:Sector("Backtrack")

local LegitAimbotBool = false
local LegitAimAt

local LegitEnableAimbot = LegitbotMain:Cheat("Checkbox", "Enable Aimbot", function(State) end)
local LegitAimKeybind = LegitbotMain:Cheat("Textbox", "Keybind", function(State) end)
local LegitAimKeybindType = LegitbotMain:Cheat("Dropdown", "Keybind Type", function(Option) end, {options = {"Hold","Toggle","Always On"}})
local LegitTargetSelection = LegitbotMain:Cheat("Dropdown", "Target Selection", function(Option) end, {options = {"Closest to Crosshair"}})
local LegitPriority = LegitbotMain:Cheat("Dropdown", "Priority", function(Option) end, {options = {"Head","UpperTorso"}})
local LegitEnableVisibleCheck = LegitbotMain:Cheat("Checkbox", "Visible Check", function(State) end)
local LegitSmoothness = LegitbotMain:Cheat("Slider", "Smoothness", function(Value) end, {min = 0.1, max = 30, suffix = " smooth"})
local LegitFovCheck = LegitbotMain:Cheat("Checkbox", "Fov Check", function(State) end)
local LegitDrawFov = LegitbotMain:Cheat("Checkbox", "Draw Fov", function(State) end)
local LegitFovAmount = LegitbotMain:Cheat("Slider", "Fov Amount", function(Value) end, {min = 1, max = 900, suffix = "°"})

local LegitTriggerbotBool = false
local LegitTriggerDelay = false

local LegitEnableTriggerbot = LegitbotOther:Cheat("Checkbox", "Enable Triggerbot", function(State) end)
local LegitTriggerKeybind = LegitbotOther:Cheat("Textbox", "Keybind", function(State) end)
local LegitTriggerKeybindType = LegitbotOther:Cheat("Dropdown", "Keybind Type", function(Option) end, {options = {"Hold","Toggle","Always On"}})
local LegitTriggerEnableFFA = LegitbotOther:Cheat("Checkbox", "FFA Mode", function(State) end)
local LegitShotDelay = LegitbotOther:Cheat("Slider", "Shot Delay", function(Value) end, {min = 1, max = 800, suffix = " ms"})

local LegitBacktrack = LegitbotBacktrack:Cheat("Checkbox", "Backtrack", function(State) if State then else bfolder:ClearAllChildren() end end)
local LegitBacktrackLength = LegitbotBacktrack:Cheat("Slider", "Backtrack Length", function(Value) end, {min = 0, max = 2, suffix = " seconds"})

local Ragebot = FinityWindow:Category("Ragebot")

local RagebotAimbot = Ragebot:Sector("Aimbot")
local AA = Ragebot:Sector("Anti Aim")

local RagebotEnable = RagebotAimbot:Cheat("Checkbox", "Enable Ragebot", function(State) end)
local RagebotTargetSelection = RagebotAimbot:Cheat("Dropdown", "Target Selection", function(Option) end, {options = {"Closest to Crosshair", "Lowest Health", "Closest to Player"}})
local RagebotRaycastSelection = RagebotAimbot:Cheat("Dropdown", "Raycast Selection", function(Option) end, {options = {"Head","UpperTorso"}})
local RagebotPriority = RagebotAimbot:Cheat("Dropdown", "Bodypart Priority", function(Option) end, {options = {"Head", "UpperTorso"}})
local RagebotAutoshoot = RagebotAimbot:Cheat("Checkbox", "Autoshoot", function(State) end)
local RagebotAutoshootType = RagebotAimbot:Cheat("Dropdown", "Autoshoot Type", function(Option) end, {options = {"Client","Mouse"}})
local RagebotAwpBaim = RagebotAimbot:Cheat("Checkbox", "Awp Baim :D", function(State) end)
local RagebotSilentAim = RagebotAimbot:Cheat("Checkbox", "Silent Aim", function(State) end)
local RagebotDoubleTap = RagebotAimbot:Cheat("Checkbox", "Double Tap", function(State) end)
local RagebotWallbang = RagebotAimbot:Cheat("Checkbox", "Wallbang", function(State) end)


local zeroaa = 0
local upaa = 0.98480743169785
local downaa = -0.98480802774429
local leftaa = CFrame.new(-150,0,0)
local rightaa = CFrame.new(150,0,0)
local backaa = CFrame.new(0,0,0)
local lastmanual = "left"
local jitter = false
local controlturn = game:GetService("ReplicatedStorage").Events:FindFirstChild("ControlTurn")
local anim = Instance.new("Animation", workspace)
anim.AnimationId = "rbxassetid://0"
local hitsoundid = "rbxassetid://152515669"

local AAEnable = AA:Cheat("Checkbox", "Enable Anti-Aim", function(State) end)
local AAPitch = AA:Cheat("Dropdown", "Pitch", function() end, {options = {"None", "Up", "Down", "Zero", "Custom"}})
local AAPitchCustom = AA:Cheat("Slider", "Custom Pitch", function(Value) end, {min = -0.98, max = 0.98, suffix = " pitch"})
local AAYaw = AA:Cheat("Dropdown", "Yaw", function(Option) end, {options = {"None", "Left", "Right", "Back", "Custom", "Manual"}})
local AAYawCustom = AA:Cheat("Slider", "Custom Yaw", function(Value) end, {min = -60, max = 60, suffix = " yaw"})
local AAYawType = AA:Cheat("Dropdown", "Yaw Type", function(Option) end, {options = {"Static", "Jitter", "Spin"}})
local AAJitterRange = AA:Cheat("Slider", "Jitter Range", function(Value) end, {min = -150, max = 150, suffix = "°"})
local AATurnVelocity = AA:Cheat("Slider", "Turn Velocity", function(Value) end, {min = 1, max = 100000, suffix = " speed"})
local AAJitterSpeed = AA:Cheat("Slider", "Jitter Speed", function(Value) end, {min = 0.01, max = 2, suffix = " speed"})
local AAReverseJitter = AA:Cheat("Textbox", "Reverse Jitter Keybind", function(State) end)
local AANoAnimations = AA:Cheat("Checkbox", "No Animations", function(State) end)
local AANoHeadDesync = AA:Cheat("Checkbox", "Break Head", function(State) end)
local AALeftBind = AA:Cheat("Textbox", "Left Keybind", function(State) end)
local AARightBind = AA:Cheat("Textbox", "Right Keybind", function(State) end)
local AABackBind = AA:Cheat("Textbox", "Back Keybind", function(State) end)

AATurnVelocity.value = 3334

local Visuals = FinityWindow:Category("Visuals")

local VisualsMain = Visuals:Sector("Main")
local VisualsOther = Visuals:Sector("Others")

local VisualsEnable = VisualsMain:Cheat("Checkbox", "Enable Visuals", function(State) end)
local VisualsVisualize = VisualsMain:Cheat("Dropdown", "Visualize", function(Option) end, {options = {"Enemy", "Team", "Both"}})
local VisualsBoxESP = VisualsMain:Cheat("Checkbox", "Box ESP", function(State) if State == false then removeesp("All", "boxesp") end end)
local VisualsNameESP = VisualsMain:Cheat("Checkbox", "Name ESP", function(State) end)
local VisualsHealthESP = VisualsMain:Cheat("Checkbox", "Health ESP", function(State) end)
local VisualsDistanceESP = VisualsMain:Cheat("Checkbox", "Distance ESP", function(State) end)
local VisualsWeaponESP = VisualsMain:Cheat("Checkbox", "Weapon ESP", function(State) end)
local VisualsESPColors = VisualsMain:Cheat("Dropdown", "ESP Colors", function(Option) end, {options = {"White", "Red", "Green", "Yellow", "Blue"}})
local VisualsEnableChams = VisualsMain:Cheat("Checkbox", "Enable Chams", function(State) end)

local VisualsChams = VisualsMain:Cheat("Checkbox", "Chams", function(State) end)
local VisualsChamsColor = VisualsMain:Cheat("Dropdown", "Color", function(Option) end, {options = {"Red", "White", "Green", "Yellow", "Blue"}})
local VisualsChamsVisible = VisualsMain:Cheat("Checkbox", "Through Walls", function(State) end)
local VisualsGlow = VisualsMain:Cheat("Checkbox", "Glow", function(State) end)
local VisualsGlowColor = VisualsMain:Cheat("Dropdown", "Color", function(Option) end, {options = {"Red", "White", "Green", "Yellow", "Blue"}})
local VisualsGlowVisible = VisualsMain:Cheat("Checkbox", "Through Walls", function(State) end)
local VisualsChamsTransparency = VisualsMain:Cheat("Slider", "Chams Transparency", function(Value) end, {min = 0, max = 1, suffix = "%"})
local VisualsTracers = VisualsMain:Cheat("Checkbox", "Snap Lines", function(State) end)


local VisualsFovChanger = VisualsOther:Cheat("Checkbox", "Fov Changer", function(State) if State then runser:BindToRenderStep("fovchange", 80, fovchange) else runser:UnbindFromRenderStep("fovchange") workspace.CurrentCamera.FieldOfView = 70 end end)
local VisualsOnScope = VisualsOther:Cheat("Checkbox", "On Scope", function(State) end)
local VisualsFovFov = VisualsOther:Cheat("Slider", "Fov Amount", function(Value) end, {min = 1, max = 120, suffix = " fov"})
local VisualsFilterMode = VisualsOther:Cheat("Dropdown", "World Filter Mode", function(Option) if Option == "Normal" then resetl() elseif Option == "Light" then game.Lighting.Ambient = Color3.fromRGB(255,255,255) game.Lighting.Brightness = 1.5 game.Lighting.GlobalShadows = false elseif Option == "Dark" then game.Lighting.Ambient = Color3.fromRGB(0,0,0) game.Lighting.Brightness = 0 game.Lighting.GlobalShadows = false end if Option == "Zuhn" then zuhnmode.Saturation = 1.2 else zuhnmode.Saturation = 0 end end, {options = {"Normal", "Light", "Dark", "Zuhn"}})
local VisualsThirdPerson = VisualsOther:Cheat("Checkbox", "Third Person", function(State) if State then runser:BindToRenderStep("thirdper", 80, thirdperson) else runser:UnbindFromRenderStep("thirdper") game.Players.LocalPlayer.CameraMaxZoomDistance = 0.5 game.Players.LocalPlayer.CameraMinZoomDistance = 0.5 end end)
local VisualsThirdPersonDistance = VisualsOther:Cheat("Slider", "Third Person Distance", function(Value) end, {min = 1, max = 120, suffix = " distance"})
local VisualsNoFlash = VisualsOther:Cheat("Checkbox", "No Flash", function(State) if State then game.Players.LocalPlayer.PlayerGui.Blnd.Blind.Visible = false else game.Players.LocalPlayer.PlayerGui.Blnd.Blind.Visible = true end end)
local VisualsNoSmoke = VisualsOther:Cheat("Checkbox", "No Smokes", function(State) end)
local VisualsNoSleeves = VisualsOther:Cheat("Checkbox", "No Sleeves", function(State) end)
local VisualsNoGloves = VisualsOther:Cheat("Checkbox", "No Gloves", function(State) end)
local VisualsArmsType = VisualsOther:Cheat("Dropdown", "Arms Type", function(Option) end, {options = {"Regular", "Transparent", "None"}})
local VisualsArmsTransparency = VisualsOther:Cheat("Slider", "Arms Transparency", function(Value) end, {min = 0, max = 1, suffix = "%"})
local VisualsArmColor = VisualsOther:Cheat("Dropdown", "Arm Color", function(Option) end, {options = {"Regular","Blue", "Red", "White", "Green", "Yellow"}})
local VisualsScopeRemover = VisualsOther:Cheat("Checkbox", "Scope Remover", function(State) end)

local Other = FinityWindow:Category("Other")

local OtherMain = Other:Sector("Gun Mods")
local OtherChat = Other:Sector("Chat")
local OtherOther = Other:Sector("Other")
local OtherExploits = Other:Sector("Exploits")
local OtherSounds = Other:Sector("Sounds")
local nadewalkdel = false

local OtherStoredAmmoAmount = OtherMain:Cheat("Slider", "Stored Ammo Amount", function(Value) changeMod("StoredAmmo", math.ceil(Value)) end, {min = 1, max = 999999, suffix = " ammo"})
local OtherMagAmmoAmount = OtherMain:Cheat("Slider", "Mag Ammo Amount", function(Value) changeMod("Ammo", math.ceil(Value)) end, {min = 1, max = 999999, suffix = " ammo"})
local OtherFirerateSpeed = OtherMain:Cheat("Slider", "Firerate Speed", function(Value) changeMod("FireRate", Value) end, {min = 0, max = 3, suffix = " speed"})
local OtherReloadSpeed = OtherMain:Cheat("Slider", "Reload Speed", function(Value) changeMod("ReloadTime", Value) end, {min = 0.25, max = 6, suffix = " seconds"})
local OtherEquipSpeed = OtherMain:Cheat("Slider", "Equip Speed", function(Value) changeMod("EquipTime", Value) end, {min = 0.25, max = 6, suffix = " seconds"})
local OtherBulletsPerShot = OtherMain:Cheat("Slider", "Bullets Per Shot", function(Value) changeMod("Bullets", math.ceil(Value)) changeMod("BulletsPerTrail", math.ceil(Value)) end, {min = 1, max = 20, suffix = " bullets"})
local OtherAuto = OtherMain:Cheat("Checkbox", "Automatic Guns", function(State) if State then changeMod("Auto", true) else changeMod("Auto", false) end end)

local chatdelay = false
local cheatspamtext = {"Oh no! Is that Counter Pepsi!","ACE! Arsus Killed the whole enemy team!","What does the Kill All Button do?","Get Good Get Arsus","MR. PRESIDENT GET DOWN! IT'S AUTO RESPAWN","Arsus > All","Arsus owns me and all","Get Tapped By Arsus","contact TaskManager #7996 to stop getting tapped by Arsus","contact TaskManager #7996 to become a tester",}
local OtherChatSpam = OtherChat:Cheat("Checkbox", "Enable Chat Spam", function(State) if State == true then runser:BindToRenderStep("chatspam", 80, chatSpam) else runser:UnbindFromRenderStep()("chatspam", 80, chatSpam) end end)
local OtherChatSpamType = OtherChat:Cheat("Dropdown", "Chat Type", function(Option) end, {options = {"Cheat Spam","Custom"}})
local OtherChatSpeed = OtherChat:Cheat("Slider", "Chat Speed", function(Value) end, {min = 0.1, max = 3, suffix = " seconds"})
local OtherCustomText = OtherChat:Cheat("Textbox", "Custom Text", function(State) end)
local OtherChatToAlive = OtherChat:Cheat("Button", "Chat To Alive", function() local A_1 = OtherCustomText.value local A_2 = false local A_3 = "Innocent" local A_4 = false local A_5 = false local Event = game:GetService("ReplicatedStorage").Events.PlayerChatted; Event:FireServer(A_1, A_2, A_3, A_4, A_5) end)

local OtherDefuseBomb = OtherOther:Cheat("Button", "Defuse Bomb", function() if lplr.Team == "Counter Terroist" then game.Players.LocalPlayer.Backpack.Defuse:FireServer(workspace.C4) end end)
local OtherAutoHop = OtherOther:Cheat("Checkbox", "Auto Hop", function(State) end)
local OtherTeams = OtherOther:Cheat("Dropdown", "Teams", function(Option) end, {options = {"T", "CT", "Spectator"}})
local OtherJoinTeam = OtherOther:Cheat("Button", "Join Team", function() game.ReplicatedStorage.Events:FindFirstChild("JoinTeam"):FireServer(OtherTeams.value) end)

local OtherGrenadeWalk = OtherExploits:Cheat("Checkbox", "Grenade Walk", function(State) if State then runser:BindToRenderStep("nadewalk", 44, grenadewalk) nadewalkdel = false else runser:UnbindFromRenderStep("nadewalk") end end)
local OtherGrenadeType = OtherExploits:Cheat("Dropdown", "Grenade Type", function(Option) end, {options = {"Flashbang", "Smoke Grenade", "Molotov", "HE Grenade", "Decoy Grenade"}})
local OtherThrowSpeed = OtherExploits:Cheat("Slider", "Throw Speed", function(Value) end, {min = 0.20, max = 2, suffix = " seconds"})
local OtherGrenadeCrash = OtherExploits:Cheat("Button", "Grenade Server Crasher", function() nadeservercrasher() end)
local OtherKillAll = OtherExploits:Cheat("Button", "Kill All", function() killall() end)
local OtherKillAllBind = OtherExploits:Cheat("Textbox", "Kill All Keybind", function(State) end)
local OtherKillAllBindType = OtherExploits:Cheat("Dropdown", "Keybind Type", function(Option) end, {options = {"Hold","Tap","Always On"}})
local OtherEnableWalkSpeed = OtherExploits:Cheat("Checkbox", "Enable WalkSpeed", function(State) end)
local OtherWalkSpeedAmount = OtherExploits:Cheat("Slider", "WalkSpeed", function(Value) end, {min = 12, max = 300, suffix = " walkspeed"})


local Credits = FinityWindow:Category("Credits")

local CreditsThanks = Credits:Sector("Thanks")
local CreditsCreator = Credits:Sector("Creator")
local CreditsOther = Credits:Sector("Other")


CreditsThanks:Cheat("Label", "Thank you for using Arsus BETA")
CreditsCreator:Cheat("Label", "Me")
CreditsOther:Cheat("Label", "detourious @ v3rmillion.net - UI Library creator")
CreditsCreator:Cheat("Button", "Copy Discord", function() setclipboard("discord.gg/DBBprbk") end)
CreditsOther:Cheat("Label", " - testing")
CreditsOther:Cheat("Label", "jeff - testing")
CreditsOther:Cheat("Label", "bob - testing")
CreditsOther:Cheat("Label", "jeff - testing")
CreditsOther:Cheat("Label", "bob - testing")
CreditsOther:Cheat("Label", "jeff - testing")
CreditsOther:Cheat("Label", "bob - testing")
CreditsOther:Cheat("Label", "jeff - testing")

print("Created GUI")

uis.InputBegan:Connect(function(key)
	if LegitAimKeybind.value ~= nil and LegitAimKeybind.value ~= '' then
		if key.KeyCode == Enum.KeyCode[LegitAimKeybind.value] then
			if tostring(LegitAimKeybindType.value) == "Hold" then
				LegitAimbotBool = true
				print("Hold Started "..tostring(LegitAimbotBool).." Legit Aimbot")
			elseif tostring(LegitAimKeybindType.value) == "Toggle" then
				LegitAimbotBool = not LegitAimbotBool
				print("Toggle "..tostring(LegitAimbotBool).." Legit Aimbot")
			elseif tostring(LegitAimKeybindType.value) == "Always On" then
				LegitAimbotBool = true
				print("Always On "..tostring(LegitAimbotBool).."Legit Aimbot")
			end
		end
	end
end)
uis.InputBegan:Connect(function(key)
	if OtherKillAllBind.value ~= nil and OtherKillAllBind.value ~= '' then
		if key.KeyCode == Enum.KeyCode[OtherKillAllBind.value] then
			if tostring(OtherKillAllBindType.value) == "Hold" then
				KillingAll = true
				print('killin all is true m8')
			elseif tostring(OtherKillAllBindType.value) == "Always On" then
				KillingAll = true
				print('killin all is always true m8')
			end
		end
	end
end)
uis.InputEnded:Connect(function(key)
	if OtherKillAllBind.value ~= nil and OtherKillAllBind.value ~= '' then
		if key.KeyCode == Enum.KeyCode[OtherKillAllBind.value] then
			if tostring(OtherKillAllBindType.value) == "Hold" then
				KillingAll = false
				print('killin all is false m8')
			elseif tostring(OtherKillAllBindType.value) == "Always On" then
				KillingAll = true
				print('killin all is always true false m8')
			end
		end
	end
end)
uis.InputEnded:Connect(function(key)
	if LegitAimKeybind.value ~= nil and LegitAimKeybind.value ~= '' then
		if key.KeyCode == Enum.KeyCode[LegitAimKeybind.value] then
			if tostring(LegitAimKeybindType.value) == "Hold" then
				LegitAimbotBool = false
				print("Hold Ended "..tostring(LegitAimbotBool).." Legit Aimbot")
			elseif tostring(LegitAimKeybindType.value) == "Toggle" then
				print("Toggle Ended ")
			elseif tostring(LegitAimKeybindType.value) == "Always On" then
				LegitAimbotBool = true
			end
		end
	end
end)


uis.InputBegan:Connect(function(key)
	if AALeftBind.value ~= nil and AALeftBind.value ~= "" then
		if key.KeyCode == Enum.KeyCode[tostring(AALeftBind.value)] then
			lastmanual = "left"
		end
	end
	if AARightBind.value ~= nil and AARightBind.value ~= "" then
		if key.KeyCode == Enum.KeyCode[tostring(AARightBind.value)] then
			lastmanual = "right"
		end
	end
	if AABackBind.value ~= nil and AABackBind.value ~= "" then
		if key.KeyCode == Enum.KeyCode[tostring(AABackBind.value)] then
			lastmanual = "back"
		end
	end
	if AAReverseJitter.value ~= nil and AAReverseJitter.value ~= "" then
		if key.KeyCode == Enum.KeyCode[tostring(AAReverseJitter.value)] then
			reversedjitter = not reversedjitter
		end
	end
end)

function getrealcolor(color)
	local realcolor
	if color == "Blue" then
		realcolor = BrickColor.new(0,0,1)
	elseif color == "Red" then
		realcolor = BrickColor.new(1,0,0)
	elseif color == "White" then
		realcolor = BrickColor.new(1,1,1)
	elseif color == "Green" then
		realcolor = BrickColor.new(0,1,0)
	elseif color == "Yellow" then
		realcolor = BrickColor.new(1,1,0)
	elseif color == "Regular" then
		realcolor = BrickColor.new(0.8, 0.55686274509, 0.41176470588)
		else realcolor = nil
	end
	return realcolor
end
function getcolor3color(color)
	local realcolor
	if color == "Blue" then
		realcolor = Color3.new(0,0,1)
	elseif color == "Red" then
		realcolor = Color3.new(1,0,0)
	elseif color == "White" then
		realcolor = Color3.new(1,1,1)
	elseif color == "Green" then
		realcolor = Color3.new(0,1,0)
	elseif color == "Yellow" then
		realcolor = Color3.new(1,1,0)
		else realcolor = nil
	end
	return realcolor
end
function getcolor3(color)
	local realcolor
	if color == "Blue" then
		realcolor = Color3.new(0,0,1)
	elseif color == "Red" then
		realcolor = Color3.new(1,0,0)
	elseif color == "White" then
		realcolor = Color3.new(1,1,1)
	elseif color == "Green" then
		realcolor = Color3.new(0,1,0)
	elseif color == "Yellow" then
		realcolor = Color3.new(1,1,0)
		else 
		realcolor = Color3.new(1,1,1)
	end
	return realcolor
end
function changeArms()
	if workspace.CurrentCamera:FindFirstChild("Arms") ~= nil then
		for _,part in pairs (game.workspace.CurrentCamera.Arms:GetDescendants()) do
			if VisualsNoSleeves.value == true then
				if part.Name == "Sleeve" then
					if part:IsA("Motor6D") == false then
						part.Transparency = 1
					end
				end
			elseif VisualsNoSleeves.value == false then
				if part.Name == "Sleeve" then
					if part:IsA("Motor6D") == false then
						part.Transparency = 0
					end
				end
			end
			if VisualsNoGloves.value == true then
				if part.Name == "Glove" then
					part.Transparency = 1
				end
			elseif VisualsNoGloves.value == false then
				if part.Name == "Glove" then
					part.Transparency = 0
				end
			end
			if VisualsArmsType.value == "Transparent" then
				if part.Name == "Left Arm" then
					if part:FindFirstChild("Glove") then
						part.Transparency = VisualsArmsTransparency.value
					end
				end
				if part.Name == "Right Arm" then
					if part:FindFirstChild("Glove") then
						part.Transparency = VisualsArmsTransparency.value
					end
				end
			elseif VisualsArmsType.value == "None" then
				if part.Name == "Left Arm" then
					if part:FindFirstChild("Glove") then
						part.Transparency = 1
					end
				end
				if part.Name == "Right Arm" then
					if part:FindFirstChild("Glove") then
						part.Transparency = 1
					end
				end
			end
			if part.Name == "Left Arm" then
				if part:FindFirstChild("Glove") then
					part.BrickColor = getrealcolor(VisualsArmColor.value)
				end
			end
			if part.name == "Right Arm" then
				if part:FindFirstChild("Glove") then
					part.BrickColor = getrealcolor(VisualsArmColor.value)
				end
			end
			if VisualsArmColor.value == "Regular" then
				if part.Name == "Left Arm" then
					if part:FindFirstChild("Glove") then
						part.BrickColor = BrickColor.new(0.8, 0.55686274509, 0.41176470588)
					end
				end
				if part.name == "Right Arm" then
					if part:FindFirstChild("Glove") then
						part.BrickColor = BrickColor.new(0.8, 0.55686274509, 0.41176470588)
					end
				end
			end
		end
	end
end
runser:BindToRenderStep("changeArms", 80, changeArms)
function fovchange()
	if VisualsFovChanger.value == true then
		if VisualsOnScope.value == true then
			workspace.CurrentCamera.FieldOfView = VisualsFovFov.value
		else
			if VisualsOnScope.value == false or VisualsOnScope.value == nil then
				if game.Players.LocalPlayer.PlayerGui.GUI.Crosshairs.Scope.Visible ~= true then
					workspace.CurrentCamera.FieldOfView = VisualsFovFov.value
				end
			end
		end
	else
		workspace.CurrentCamera.FieldOfView = 70
	end
end
function thirdperson()
	if VisualsThirdPerson.value == true then
		game.Players.LocalPlayer.CameraMaxZoomDistance = math.ceil(VisualsThirdPersonDistance.value)
		game.Players.LocalPlayer.CameraMinZoomDistance = math.ceil(VisualsThirdPersonDistance.value)
	else
		game.Players.LocalPlayer.CameraMaxZoomDistance = 0.5
		game.Players.LocalPlayer.CameraMinZoomDistance = 0.5
	end
end

function legitrecoilcomp()
	local client = getsenv(game.Players.LocalPlayer.PlayerGui.Client)
    client.RecoilX = client.RecoilX/math.ceil(LegitRecoilX.value)
    client.RecoilY = client.RecoilY/math.ceil(LegitRecoilY.value)
end
function changeMod(valuename, valueto)
	for _,mod in pairs(game.ReplicatedStorage.Weapons:GetDescendants()) do
		if mod.Name:match(valuename) then
			mod.RobloxLocked = false
			mod.Value = valueto
		end
	end
end
function grenadewalk()
	if OtherGrenadeWalk.value == true then
		if nadewalkdel == false then
			if lplr.Character and lplr.Character:FindFirstChild("Humanoid") then
				nadewalkdel = true
				local oh1 = game:GetService("ReplicatedStorage").Weapons[OtherGrenadeType.value].Model
				local oh3 = 25
				local oh4 = 35
				local oh6 = ""
				local oh7 = ""
				game:GetService("ReplicatedStorage").Events.ThrowGrenade:FireServer(oh1, nil, oh3, oh4, Vector3.new(0,-100,0), oh6, oh7)
				if OtherThrowSpeed == nil then
					wait(0.4)
					nadewalkdel = false
				else
					wait(OtherThrowSpeed.value)
					nadewalkdel = false
				end
			end
		end
	end
end
function nadeservercrasher()
	if lplr.Character then
		game:GetService("RunService").RenderStepped:Connect(function()
			local oh1 = game:GetService("ReplicatedStorage").Weapons[OtherGrenadeType.value].Model
			local oh3 = 25
			local oh4 = 35
			local oh6 = ""
			local oh7 = ""
			game:GetService("ReplicatedStorage").Events.ThrowGrenade:FireServer(oh1, nil, oh3, oh4, Vector3.new(0,-100,0), oh6, oh7)
			game:GetService("ReplicatedStorage").Events.ThrowGrenade:FireServer(oh1, nil, oh3, oh4, Vector3.new(0,-100,0), oh6, oh7)
			game:GetService("ReplicatedStorage").Events.ThrowGrenade:FireServer(oh1, nil, oh3, oh4, Vector3.new(0,-100,0), oh6, oh7)
		end)
	end
end

function killall()
	for _,plr in pairs(game.Players:GetPlayers()) do
		if plr.Character and plr.Name ~= lplr.Name then
			local oh1 = plr.Character.Head
			local oh2 = plr.Character.Head.CFrame.p
			local oh3 = "AWP"
			local oh4 = 4096
			local oh5 = game.Players.LocalPlayer.Character.Gun
			local oh8 = 15
			local oh9 = false
			local oh10 = false
			local oh11 = Vector3.new(-126.878326, 353.474854, 49.3892708)
			local oh12 = 16868
			local oh13 = Vector3.new(0, 0, -1)
			if plr.Team ~= lplr.Team then
				game:GetService("ReplicatedStorage").Events.HitPart:FireServer(oh1, oh2, oh3, oh4, oh5, oh6, oh7, oh8, oh9, oh10, oh11, oh12, oh13)
			end
		end
	end
end

function backtrack()
	for _,plr in pairs(game.Players:GetPlayers()) do
		if plr.Character and plr.Character:FindFirstChild("Head") then
			if plr.Team ~= lplr.Team then
				for _,part in pairs(plr.Character:GetChildren()) do
					if part:IsA("BasePart") and part.Name ~= "Gun" then
						spawn(function()
							local bpart = Instance.new("Part", bfolder)
							bpart.Size = part.Size
							bpart.Color = Color3.new(1,1,1)
							bpart.CanCollide = false
							bpart.Name = (plr.Name.."/"..part.Name)
							bpart.Anchored = true
							bpart.Orientation = part.Orientation
							bpart.Material = Enum.Material.Plastic
							spawn(function()
								if LegitBacktrackLength.value == nil then
									bpart:Destroy()
								else
									wait(LegitBacktrackLength.value)
									bpart:Destroy()
								end
							end)
						end)
					end
				end
			end
		end
	end
end

spawn(function()
	while wait(0.3) do
		if LegitBacktrack.value == true then
			backtrack()
		else
			bfolder:ClearAllChildren()
		end
	end
end)

uis.InputBegan:Connect(function(key)
	if key.UserInputType == Enum.UserInputType.MouseButton1 then
		if mouse.Target and mouse.Target.Parent == bfolder then
			if plrs[mouse.Target.Name] and plrs[mouse.Target.Name].Character:FindFirstChild("Humanoid") then
				print('kill player goes here')
			end
		end
	end
end)





function clearChams()
	for _,part in pairs(game.Players:GetDescendants()) do
		if part.Name == "VisChams" or part.Name == "InvisChams" then
			part:Destroy()
		end
	end
end


function createESP(part, onTop, color, name)
	if part:FindFirstChild(name) ~= nil then return end
	local handle = Instance.new("BoxHandleAdornment")
	handle.Size = part.Size + Vector3.new(0.1, 0.1, 0.1)
	handle.Name = name
	handle.Adornee = part
	handle.Color = color
	handle.AlwaysOnTop = onTop
	handle.ZIndex = 5
	handle.Transparency = VisualsChamsTransparency.value
	handle.Parent = part
end



function autoHop()
	if bhop == false then
		if lplr.Character and lplr.Character:FindFirstChild("Humanoid") then
			lplr.Character.Humanoid.StateChanged:Connect(function(new)
				if new == Enum.HumanoidStateType.Landed and game:GetService("UserInputService"):IsKeyDown(Enum.KeyCode.Space) and OtherAutoHop.value == true then
					lplr.Character.Humanoid:ChangeState(Enum.HumanoidStateType.Jumping)
				end
			end)
		end
	end
end

function boxesp(char)
	if not char:FindFirstChild("boxesp") then
		if char == lplr.Character then return end
		local boxesp = Instance.new("BillboardGui")
		local boxleft = Instance.new("Frame")
		local boxright = Instance.new("Frame")
		local boxtop = Instance.new("Frame")
		local boxbottom = Instance.new("Frame")
		boxesp.Name = "boxesp"
		boxesp.Parent = char
		boxesp.ZIndexBehavior = Enum.ZIndexBehavior.Sibling
		boxesp.Active = true
		boxesp.AlwaysOnTop = true
		boxesp.LightInfluence = 1.000
		boxesp.Size = UDim2.new(4.5, 0, 5.5, 0)
		boxesp.Adornee = char:FindFirstChild("HumanoidRootPart")

		boxleft.Name = "boxleft"
		boxleft.Parent = boxesp
		boxleft.BackgroundColor3 = getcolor3(VisualsESPColors.value)
		boxleft.BorderSizePixel = 0
		boxleft.Size = UDim2.new(0, 1, 1, 0)
		
		boxright.Name = "boxright"
		boxright.Parent = boxesp
		boxright.BackgroundColor3 = getcolor3(VisualsESPColors.value)
		boxright.BorderSizePixel = 0
		boxright.Position = UDim2.new(1, -1, 0, 0)
		boxright.Size = UDim2.new(0, 1, 1, 0)
		
		boxtop.Name = "boxtop"
		boxtop.Parent = boxesp
		boxtop.BackgroundColor3 = getcolor3(VisualsESPColors.value)
		boxtop.BorderSizePixel = 0
		boxtop.Size = UDim2.new(1, 0, 0, 1)

		boxbottom.Name = "boxbottom"
		boxbottom.Parent = boxesp
		boxbottom.BackgroundColor3 = getcolor3(VisualsESPColors.value)
		boxbottom.BorderSizePixel = 0
		boxbottom.Position = UDim2.new(0, 0, 1, -1)
		boxbottom.Size = UDim2.new(1, 0, 0, 1)
		spawn(function()
			while VisualsBoxESP.value == true do
				wait()
				for i,v in pairs(boxesp:GetChildren()) do
					v.BackgroundColor3 = getcolor3(VisualsESPColors.value)
				end
				if char.Humanoid.Health == 0 then
					boxesp:Destroy()
				end
			end 
			boxesp:Destroy()
		end)
	end
end
function nameesp(char)
	if not char:FindFirstChild("nameesp") then
		if char == lplr.Character then return end
		local nameesp = Instance.new("BillboardGui")
		local name = Instance.new("TextLabel")
		local textsize

		local plrname = game.Players:GetPlayerFromCharacter(char).Name


		nameesp.Name = "nameesp"
		nameesp.Parent = char
		nameesp.ZIndexBehavior = Enum.ZIndexBehavior.Sibling
		nameesp.Active = true
		nameesp.Adornee = char:FindFirstChild("HumanoidRootPart")
		nameesp.AlwaysOnTop = true
		nameesp.LightInfluence = 1.000
		nameesp.Size = UDim2.new(4, 0, 1, 0)
		nameesp.StudsOffset = Vector3.new(0, 3.29999995, 0)
		
		name.Name = "name"
		name.Parent = nameesp
		name.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
		name.BackgroundTransparency = 1.000
		name.Size = UDim2.new(1, 0, 1, 0)
		name.Font = Enum.Font.SourceSans
		name.Text = plrname
		name.TextColor3 = Color3.fromRGB(255, 255, 255)
		name.TextScaled = true
		name.TextSize = 20.000
		name.TextWrapped = true
		spawn(function()
			while VisualsNameESP.value == true do
				wait()
				for i,v in pairs(nameesp:GetChildren()) do
					v.TextColor3 = getcolor3(VisualsESPColors.value)
				end
				if char.Humanoid.Health == 0 then
					nameesp:Destroy()
				end
			end
			nameesp:Destroy()
		end)
	end
end
function healthesp(char)
	if not char:FindFirstChild("healthesp") then
		if char == lplr.Character then return end
		local healthesp = Instance.new("BillboardGui")
		local health = Instance.new("TextLabel")
		
		healthesp.Name = "healthesp"
		healthesp.Parent = char
		healthesp.ZIndexBehavior = Enum.ZIndexBehavior.Sibling
		healthesp.Active = true
		healthesp.Adornee = char:FindFirstChild("HumanoidRootPart")
		healthesp.AlwaysOnTop = true
		healthesp.LightInfluence = 1.000
		healthesp.Size = UDim2.new(1, 0, 1, 0)
		healthesp.StudsOffset = Vector3.new(-2.79999995, 2.52999997, 0)
		
		health.Name = "health"
		health.Parent = healthesp
		health.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
		health.BackgroundTransparency = 1.000
		health.Size = UDim2.new(1, 0, 1, 0)
		health.Font = Enum.Font.SourceSans
		health.Text = "100"
		health.TextColor3 = Color3.fromRGB(106, 255, 0)
		health.TextScaled = true
		health.TextSize = 30.000
		health.TextWrapped = true
		spawn(function()
			while VisualsHealthESP.value == true do
				wait()
				health.Text = math.ceil(char.Humanoid.Health)
				local humhealth = char.Humanoid.Health
				if humhealth >= 70 then
					health.TextColor3 = getcolor3("Green")
				elseif humhealth <= 70 then
					health.TextColor3 = getcolor3("Yellow")
				end
				if humhealth <= 30 then
					health.TextColor3 = getcolor3("Red")
				end
				if humhealth == 0 then
					health.TextColor3 = Color3.new()
				end
				if char.Humanoid.Health == 0 then
					healthesp:Destroy()
				end
			end
			healthesp:Destroy()
		end)
	end
end
function distanceesp(char)
	if not char:FindFirstChild("distanceesp") then
		if char == lplr.Character then return end
		local distanceesp = Instance.new("BillboardGui")
		local distance = Instance.new("TextLabel")

		distanceesp.Name = "distanceesp"
		distanceesp.Parent = char
		distanceesp.ZIndexBehavior = Enum.ZIndexBehavior.Sibling
		distanceesp.Active = true
		distanceesp.Adornee = char:FindFirstChild("HumanoidRootPart")
		distanceesp.AlwaysOnTop = true
		distanceesp.LightInfluence = 1.000
		distanceesp.Size = UDim2.new(2.4, 0, 0.7, 0)
		distanceesp.StudsOffset = Vector3.new(0, -3.1, 0)

		distance.Name = "distance"
		distance.Parent = distanceesp
		distance.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
		distance.BackgroundTransparency = 1.000
		distance.Size = UDim2.new(1, 0, 1, 0)
		distance.Font = Enum.Font.SourceSans
		distance.Text = "unknown studs"
		distance.TextColor3 = Color3.fromRGB(255, 255, 255)
		distance.TextScaled = true
		distance.TextSize = 14.000
		distance.TextWrapped = true
		spawn(function()
			while VisualsDistanceESP.value == true do
				wait()
				if char.Humanoid.Health == 0 then
					distanceesp:Destroy()
				end
				local dist = lplr:DistanceFromCharacter(char.Head.Position)
				if dist ~= 0 then
					distance.Text = (math.ceil(dist).." studs")
				end
				distance.TextColor3 = getcolor3(VisualsESPColors.value)
			end
			distanceesp:Destroy()
		end)
	end
end
function gunESP(char)
	if not char:FindFirstChild("gunesp") then
		if char == lplr.Character then return end
		local gunesp = Instance.new("BillboardGui")
		local gun = Instance.new("TextLabel")
		local plrname = game.Players:GetPlayerFromCharacter(char).Name
		
		gunesp.Name = "gunesp"
		gunesp.Parent = char
		gunesp.ZIndexBehavior = Enum.ZIndexBehavior.Sibling
		gunesp.Active = true
		gunesp.Adornee = char:FindFirstChild("HumanoidRootPart")
		gunesp.AlwaysOnTop = true
		gunesp.LightInfluence = 1.000
		gunesp.Size = UDim2.new(4, 0, 0.800000012, 0)
		gunesp.StudsOffset = Vector3.new(0, -3.70000005, 0)

		gun.Name = "gun"
		gun.Parent = gunesp
		gun.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
		gun.BackgroundTransparency = 1.000
		gun.Size = UDim2.new(1, 0, 1, 0)
		gun.Font = Enum.Font.SourceSans
		gun.Text = "unknown gun"
		gun.TextColor3 = Color3.fromRGB(255, 255, 255)
		gun.TextScaled = true
		gun.TextSize = 14.000
		gun.TextWrapped = true
		spawn(function()
			while VisualsWeaponESP.value == true do
				wait()
				if char.Humanoid.Health == 0 then
					gunesp:Destroy()
				end
				gun.TextColor3 = getcolor3(VisualsESPColors.value)
				if workspace:FindFirstChild(plrname) then
					if workspace:FindFirstChild(plrname).EquippedTool ~= nil then
						gun.Text = workspace[plrname].EquippedTool.Value
					end
				end
			end
			gunesp:Destroy()
		end)
	end
end

spawn(function()
	while wait(0.2) do
		for _,plr in pairs(game.Players:GetPlayers()) do
			if plr.Character and plr.Character:FindFirstChild("Humanoid") and plr.Character.Humanoid.Health > 0 then
				if VisualsEnable.value == true then
					if VisualsBoxESP.value == true then
						if VisualsVisualize.value == "Team" then
							print('visualizing team')
							if plr.Team == lplr.Team then
								boxesp(plr.Character)
							else
								removeesp(plr.Character, "boxesp")
							end
						elseif VisualsVisualize.value == "Enemy" then
							if plr.Team ~= lplr.Team then
								boxesp(plr.Character)
							else
								removeesp(plr.Character, "boxesp")
							end
						else
							boxesp(plr.Character)
						end
					end
					if VisualsNameESP.value == true then
						if VisualsVisualize.value == "Team" then
							if plr.Team == lplr.Team then
								nameesp(plr.Character)
							else
								removeesp(plr.Character, "nameesp")
							end
						elseif VisualsVisualize.value == "Enemy" then
							if plr.Team ~= lplr.Team then
								nameesp(plr.Character)
							else
								removeesp(plr.Character, "nameesp")
							end
						else
							nameesp(plr.Character)
						end
					end
					if VisualsHealthESP.value == true then
						if VisualsVisualize.value == "Team" then
							if plr.Team == lplr.Team then
								healthesp(plr.Character)
							else
								removeesp(plr.Character, "healthesp")
							end
						elseif VisualsVisualize.value == "Enemy" then
							if plr.Team ~= lplr.Team then
								healthesp(plr.Character)
							else
								removeesp(plr.Character, "healthesp")
							end
						else
							healthesp(plr.Character)
						end
					end
					if VisualsDistanceESP.value == true then
						if VisualsVisualize.value == "Team" then
							if plr.Team == lplr.Team then
								distanceesp(plr.Character)
							else
								removeesp(plr.Character, "distanceesp")
							end
						elseif VisualsVisualize.value == "Enemy" then
							if plr.Team ~= lplr.Team then
								distanceesp(plr.Character)
							else
								removeesp(plr.Character, "distanceesp")
							end
						else
							distanceesp(plr.Character)
						end
					end
					if VisualsWeaponESP.value == true then
						if VisualsVisualize.value == "Team" then
							if plr.Team == lplr.Team then
								gunESP(plr.Character)
							else
								removeesp(plr.Character, "gunesp")
							end
						elseif VisualsVisualize.value == "Enemy" then
							if plr.Team ~= lplr.Team then
								gunESP(plr.Character)
							else
								removeesp(plr.Character, "gunesp")
							end
						else
							gunESP(plr.Character)
						end
					end
					if VisualsEnableChams.value == true then
						if VisualsChams.value == true then
							if VisualsVisualize.value == "Team" then
								if plr.Team == lplr.Team then
									for i,v in pairs(plr.Character:GetChildren()) do
										ichams(v)
									end
								else
									rchams(plr.Character, "ichams")
								end
							elseif VisualsVisualize.value == "Enemy" then
								if plr.Team ~= lplr.Team then
									for i,v in pairs(plr.Character:GetChildren()) do
										ichams(v)
									end
								else
									rchams(plr.Character, "ichams")
								end
							else
								for i,v in pairs(plr.Character:GetChildren()) do
									ichams(v)
								end
							end
						end
						if VisualsGlow.value == true then
							if VisualsVisualize.value == "Team" then
								if plr.Team == lplr.Team then
									for i,v in pairs(plr.Character:GetChildren()) do
										gchams(v)
									end
								else
									rchams(plr.Character, "gchams")
								end
							elseif VisualsVisualize.value == "Enemy" then
								if plr.Team ~= lplr.Team then
									for i,v in pairs(plr.Character:GetChildren()) do
										gchams(v)
									end
								else
									rchams(plr.Character, "gchams")
								end
							else
								for i,v in pairs(plr.Character:GetChildren()) do
									gchams(v)
								end
							end
						end
					end
					if VisualsEnable.value == true then
						if VisualsChams.value == true then
							if VisualsVisualize.value == "Team" then
								if plr.Team == lplr.Team then
									for i,v in pairs(plr.Character:GetChildren()) do
										ichams(v)
									end
								else
									rchams(plr.Character, "ichams")
								end
							elseif VisualsVisualize.value == "Enemy" then
								if plr.Team ~= lplr.Team then
									for i,v in pairs(plr.Character:GetChildren()) do
										ichams(v)
									end
								else
									rchams(plr.Character, "ichams")
								end
							else
								for i,v in pairs(plr.Character:GetChildren()) do
									ichams(v)
								end
							end
						end
					end
				else
					rchams(plr.Character, "All")
					removeesp(plr.Character, "nameesp")
					removeesp(plr.Character, "boxesp")
					removeesp(plr.Character, "healthesp")
					removeesp(plr.Character, "distanceesp")
					removeesp(plr.Character, "gunesp")
				end
			end
		end
	end
end)

function removeesp(char,type)
	if char == "All" then
		for _,plr in pairs(game.Players:GetPlayers()) do
			if plr.Character then
				if plr.Character:FindFirstChild(type) then
					plr.Character[type]:Destroy()
				end
			end
		end
	else
		if char:FindFirstChild(type) then
			char[type]:Destroy()
		end
	end
end

function ichams(part)
	if part:FindFirstChild("ichams") then
		part.ichams:Destroy()
	end
    if part:IsA("MeshPart") or part.Name == "Head" then
        local bha = Instance.new("BoxHandleAdornment", part)
    	bha.Name = "ichams"
    	bha.Adornee = part
        bha.Color3 = getcolor3(VisualsChamsColor.value)
        bha.AlwaysOnTop = VisualsChamsVisible.value
        bha.ZIndex = 5
    	bha.Transparency = VisualsChamsTransparency.value
        bha.Parent = part
        bha.Size = part.Size + Vector3.new(0.07,0.07,0.07)
     end
end
function gchams(part)
	if part:FindFirstChild("gchams") then
		part.gchams:Destroy()
	end
    if part:IsA("MeshPart") or part.Name == "Head" then
      local bha = Instance.new("BoxHandleAdornment", part)
        bha.Name = "gchams"
    	bha.Adornee = part
    	bha.Color3 = getcolor3(VisualsGlowColor.value)
		bha.AlwaysOnTop = VisualsGlowVisible.value
    	bha.ZIndex = 4
		bha.Transparency = VisualsChamsTransparency.value
    	bha.Parent = part
        bha.Size = part.Size + Vector3.new(0.2,0.2,0.2)
    end
end
function rchams(char, type)
    if type == "All" then
        for _,part in pairs(char:GetChildren()) do
            if part:FindFirstChild("gchams") then
                part.gchams:Destroy()
            end
            if part:FindFirstChild("ichams") then
                part.ichams:Destroy()
            end
        end
    else
        for _,part in pairs(char:GetChildren()) do
            if type == "gchams" then
                if part:FindFirstChild("gchams") then
                    part.gchams:Destroy()
                end
            elseif type == "ichams" then
                if part:FindFirstChild("ichams") then
                    part.ichams:Destroy()
                end
            end
        end
    end
end

local hitsound = true
function playsound() [nonamecall]
	if hitsound == true then
		local sound = Instance.new("Sound", workspace)
		sound.SoundId = 'rbxassetid://193171853'
		if not sound.IsLoaded then
			sound.Loaded:wait()
		end
		sound:Play()
		wait()
		sound:Destroy()
	end
end
function yaw(pos)
	if lplr.Character then
		if lplr.Character:FindFirstChild("Humanoid").Health > 0 then
			game.Players.LocalPlayer.Character.Humanoid.AutoRotate = false
			local gyro = Instance.new('BodyGyro', lplr.Character:FindFirstChild("UpperTorso"))
			gyro.D = 0
			gyro.P = math.ceil(AATurnVelocity.value or 0)
			gyro.MaxTorque = Vector3.new(0, 10000000, 0)
			gyro.CFrame = CFrame.new(gyro.Parent.Position,  pos)
			wait()
			gyro:Destroy()
		end
	end
end

runser.RenderStepped:Connect(function()
	if AAEnable.value == true then
		if AAYaw.value == "None" then
			if lplr.Character and lplr.Character:FindFirstChild("Humanoid") and lplr.Character.Humanoid.Health > 0 then
				lplr.Character.Humanoid.AutoRotate = true
				if lplr.UpperTorso:FindFirstChild("BodyGyro") then
					lplr.UpperTorso.BodyGyro:Destroy()
				end
			end
		end
		if AAYaw.value ~= "None" then
			if lplr.Character and lplr.Character:FindFirstChild("Humanoid") and lplr.Character.Humanoid.Health > 0 then
				if AAYawType.value == "Static" then
					if AAYaw.value == "Left" then
						yaw((workspace.CurrentCamera.CFrame * leftaa).p)
					elseif AAYaw.value == "Right" then
						yaw((workspace.CurrentCamera.CFrame * rightaa).p)
					elseif AAYaw.value == "Back" then
						yaw((workspace.CurrentCamera.CFrame * backaa).p)
					elseif AAYaw.value == "Custom" then
						if AAYawCustom.value ~= nil then
							yaw((workspace.CurrentCamera.CFrame * CFrame.new(AAYawCustom.value, 0, 0)).p)
						end
					elseif AAYaw.value == "Manual" then
						if lastmanual == "left" then
							yaw((workspace.CurrentCamera.CFrame * leftaa).p)
						elseif lastmanual == "right" then
							yaw((workspace.CurrentCamera.CFrame * rightaa).p)
						elseif lastmanual == "back" then
							yaw((workspace.CurrentCamera.CFrame * backaa).p)
						end
					end
				elseif AAYawType.value == "Jitter" then
					if jitter == false then
						if AAYaw.value == "Left" then
							yaw((workspace.CurrentCamera.CFrame * leftaa).p)
							wait(AAJitterSpeed.value or 0.2)
							jitter = true
						elseif AAYaw.value == "Right" then
							yaw((workspace.CurrentCamera.CFrame * rightaa).p)
							wait(AAJitterSpeed.value or 0.2)
							jitter = true
						elseif AAYaw.value == "Back" then
							yaw((workspace.CurrentCamera.CFrame * backaa).p)
							wait(AAJitterSpeed.value or 0.2)
							jitter = true
						elseif AAYaw.value == "Custom" then
							yaw((workspace.CurrentCamera.CFrame * CFrame.new(AAYawCustom.value, 0, 0)).p)
							wait(AAJitterSpeed.value or 0.2)
							jitter = true
						elseif AAYaw.value == "Manual" then
							if lastmanual == "left" then
								yaw((workspace.CurrentCamera.CFrame * leftaa).p)
								wait(AAJitterSpeed.value or 0.2)
								jitter = true
							elseif lastmanual == "right" then
								yaw((workspace.CurrentCamera.CFrame * rightaa).p)
								wait(AAJitterSpeed.value or 0.2)
								jitter = true
							elseif lastmanual == "back" then
								yaw((workspace.CurrentCamera.CFrame * backaa).p)
								wait(AAJitterSpeed.value or 0.2)
								jitter = true
							end
						end
					elseif jitter == true then
						if AAYaw.value == "Left" then
							if reversedjitter == true then
								yaw((workspace.CurrentCamera.CFrame * CFrame.new(-AAJitterRange.value,0,0)).p)
							else
								yaw((workspace.CurrentCamera.CFrame * CFrame.new(AAJitterRange.value,0,0)).p)
							end
							wait(AAJitterSpeed.value or 0.2)
							jitter = false
						elseif AAYaw.value == "Right" then
							if reversedjitter == true then
								yaw((workspace.CurrentCamera.CFrame * CFrame.new(-AAJitterRange.value,0,0)).p)
							else
								yaw((workspace.CurrentCamera.CFrame * CFrame.new(AAJitterRange.value,0,0)).p)
							end
							wait(AAJitterSpeed.value or 0.2)
							jitter = false
						elseif AAYaw.value == "Back" then
							if reversedjitter == true then
								yaw((workspace.CurrentCamera.CFrame * CFrame.new(-AAJitterRange.value,0,0)).p)
							else
								yaw((workspace.CurrentCamera.CFrame * CFrame.new(AAJitterRange.value,0,0)).p)
							end
							wait(AAJitterSpeed.value or 0.2)
							jitter = false
						elseif AAYaw.value == "Custom" then
							if reversedjitter == true then
								yaw((workspace.CurrentCamera.CFrame * CFrame.new(-AAJitterRange.value,0,0)).p)
							else
								yaw((workspace.CurrentCamera.CFrame * CFrame.new(AAJitterRange.value,0,0)).p)
							end
							wait(AAJitterSpeed.value or 0.2)
							jitter = false
						elseif AAYaw.value == "Manual" then
							if reversedjitter == true then
								yaw((workspace.CurrentCamera.CFrame * CFrame.new(-AAJitterRange.value,0,0)).p)
							else
								yaw((workspace.CurrentCamera.CFrame * CFrame.new(AAJitterRange.value,0,0)).p)
							end
							wait(AAJitterSpeed.value or 0.2)
							jitter = false
						end
					end
				elseif AAYawType.value == "Spin" then
					
				end
			end
		end
	elseif lplr.Character and lplr.Character:FindFirstChild("Humanoid") and lplr.Character.Humanoid.Health > 0 then
		lplr.Character.Humanoid.AutoRotate = true
	end
	if AANoHeadDesync.value == true then
		if lplr.Character then
			if lplr.Character:FindFirstChild("FakeHead") then
				lplr.Character.FakeHead:Destroy()
			end
			if lplr.Character:FindFirstChild("HeadHB") then
				lplr.Character.HeadHB:Destroy()
			end
			if lplr.Character:FindFirstChild("Head") then
				lplr.Character.Head.Transparency = 0
			end
		end
	end
end)
runser.RenderStepped:Connect(function()
	local plrgui = lplr.PlayerGui
	if VisualsScopeRemover.value == true then
		game.Players.LocalPlayer.PlayerGui.GUI.Crosshairs.Scope.ImageTransparency = 1
		game.Players.LocalPlayer.PlayerGui.GUI.Crosshairs.Scope.Scope.ImageTransparency = 1
		game.Players.LocalPlayer.PlayerGui.GUI.Crosshairs.Scope.Scope.Blur.ImageTransparency = 1
		game.Players.LocalPlayer.PlayerGui.GUI.Crosshairs.Scope.Scope.Blur.Blur.ImageTransparency = 1
		game.Players.LocalPlayer.PlayerGui.GUI.Crosshairs.Frame1.Transparency = 1
		game.Players.LocalPlayer.PlayerGui.GUI.Crosshairs.Frame2.Transparency = 1
		game.Players.LocalPlayer.PlayerGui.GUI.Crosshairs.Frame3.Transparency = 1
		game.Players.LocalPlayer.PlayerGui.GUI.Crosshairs.Frame4.Transparency = 1
	end
end)
lplr.CharacterAdded:Connect(function()
	wait(1)
	lplr.Character.Humanoid.StateChanged:Connect(function(new)
		if new == Enum.HumanoidStateType.Landed and uis:IsKeyDown(Enum.KeyCode.Space) and OtherAutoHop.value == true then
			lplr.Character.Humanoid:ChangeState(Enum.HumanoidStateType.Jumping)
		end
	end)

end)

workspace.Ray_Ignore.Smokes.ChildAdded:Connect(function(child)
	if VisualsNoSmoke.value == true then
		child:Destroy()
		wait(1)
		if child then child:Destroy() end
	end
end)


function GetClosestToMouseLocation() [nonamecall]
	local ClosestPlayerToReturn = nil
	local ShortestDistance = math.huge
	for _,plr in pairs(game.Players:GetPlayers()) do
		if plr.Character and plr.Character:FindFirstChild("Head") and plr.Name ~= lplr.Name and plr.Character:FindFirstChild("Humanoid").Health ~= 0 and plr.Team ~= lplr.Team and plr.Character:FindFirstChild("HumanoidRootPart") then
			local vector = workspace.CurrentCamera:WorldToViewportPoint(plr.Character.HumanoidRootPart.Position)
			local magnitude = (Vector2.new(vector.X, vector.Y) - Vector2.new(mouse.X, mouse.Y)).magnitude
			local visible = CheckPlayerIfVisible(plr)
			if visible == true then
				if magnitude < ShortestDistance then
					ClosestPlayerToReturn = plr
					ShortestDistance = magnitude
				end
			end
		end
	end
	return ClosestPlayerToReturn or lplr
end
function GetLowestHealthPlayer() [nonamecall]
	local LowestHealthPlayerToReturn = nil
	local LeastHealth = math.huge
	for _,plr in pairs(game.Players:GetPlayers()) do
		if plr.Character and plr.Character:FindFirstChild("Head") and plr.Name ~= lplr.Name and plr.Character:FindFirstChild("Humanoid").Health ~= 0 and plr.Team ~= lplr.Team and plr.Character:FindFirstChild("HumanoidRootPart") then
			local visible = CheckPlayerIfVisible(plr)
			if visible == true then
				if plr.Character:FindFirstChild("Humanoid").Health < LeastHealth then
					LowestHealthPlayerToReturn = plr
					LeastHealth = plr.Character:FindFirstChild("Humanoid").Health
				end
			end
		end
	end
	return LowestHealthPlayerToReturn or lplr
end
function GetClosestToPlayer() [nonamecall]
	local ClosestPlayerToReturn = nil
	local ShortestDistance = math.huge
	for _,plr in pairs(game.Players:GetPlayers()) do
		if plr.Character and plr.Character:FindFirstChild("Head") and plr.Name ~= lplr.Name and plr.Character:FindFirstChild("Humanoid").Health ~= 0 and plr.Team ~= lplr.Team and plr.Character:FindFirstChild("HumanoidRootPart") then
			local magnitude = (plr.Character.HumanoidRootPart.Position - lplr.Character.HumanoidRootPart.Position).magnitude
			local visible = CheckPlayerIfVisible(plr)
			if visible == true then
				if magnitude < ShortestDistance then
					ClosestPlayerToReturn = plr
					ShortestDistance = magnitude
				end
			end
		end
	end
	return ClosestPlayerToReturn
end
function CheckPlayerIfVisible(plr) [nonamecall]
	local Vislble
	local ignore = {lplr.Character, workspace.Ray_Ignore}
	if RagebotWallbang.value == true then
		ignore = {lplr.Character, workspace.Ray_Ignore, workspace.Map}
	end
	if lplr.Character:FindFirstChild("Head") then
		local ray = Ray.new(lplr.Character[RagebotRaycastSelection.value].Position, (plr.Character[RagebotPriority.value].Position - lplr.Character[RagebotRaycastSelection.value].Position).unit*1000)
		local hit, pos = workspace:FindPartOnRayWithIgnoreList(ray, ignore, false, false)
		if hit and hit:FindFirstAncestor(plr.Name) then
			Visible = true
		else
			Visible = false
		end
	end

	return Visible
end

local mt = getrawmetatable(game)
local oldNamecall = mt.__namecall
if setreadonly then setreadonly(mt, false) else make_writeable(mt, true) end
local namecallMethod = getnamecallmethod or get_namecall_method
local newClose = newcclosure or function(f) return f end

mt.__namecall = newClose(function(...) [nonamecall]
	local method = namecallMethod()
	local args = {...}
	if tostring(method) == "FireServer" and tostring(args[1]) == "ControlTurn" then
		if AAEnable.value == true then
			if AAPitch.value == "Zero" then
				args[2] = tonumber(zeroaa)
				return oldNamecall(unpack(args))
			elseif AAPitch.value == "Up" then
				args[2] = tonumber(upaa)
				return oldNamecall(unpack(args))
			elseif AAPitch.value == "Down" then
				args[2] = tonumber(downaa)
				return oldNamecall(unpack(args))
			elseif AAPitch.value == "Custom" then
				if AAPitchCustom.value ~= nil then
					args[2] = tonumber(AAPitchCustom.value)
					return oldNamecall(unpack(args))
				end
			end
		end
	elseif tostring(method) == "LoadAnimation" then
		if AANoAnimations.value == true then
			args[2] = anim
			return oldNamecall(unpack(args))
		end
	elseif tostring(method) == "FireServer" and tostring(args[1]) == "BURNME" then
		if OtherNoFire.value == true then
			args[2] = nil
			args[3] = 0
			return oldNamecall(unpack(args))
		end
	elseif tostring(method) == "FireServer" and tostring(args[1]) == "HitPart" then
		if RagebotEnable.value == true then
			if RagebotSilentAim.value == true then
				if RagebotTargetSelection.value == "Closest to Crosshair" then
					if RagebotAwpBaim.value == true then
						if args[4] == "AWP" then
							args[2] = GetClosestToMouseLocation().Character.UpperTorso
							args[3] = GetClosestToMouseLocation().Character.UpperTorso.Position
						else
							args[2] = GetClosestToMouseLocation().Character[RagebotPriority.value]
							args[3] = GetClosestToMouseLocation().Character[RagebotPriority.value].Position
						end
					else
						args[2] = GetClosestToMouseLocation().Character[RagebotPriority.value]
						args[3] = GetClosestToMouseLocation().Character[RagebotPriority.value].Position
					end
				elseif RagebotTargetSelection.value == "Lowest Health" then
					if RagebotAwpBaim.value == true then
						if args[4] == "AWP" then
							args[2] = GetLowestHealthPlayer().Character.UpperTorso
							args[3] = GetLowestHealthPlayer().Character.UpperTorso.Position
						else
							args[2] = GetLowestHealthPlayer().Character[RagebotPriority.value]
							args[3] = GetLowestHealthPlayer().Character[RagebotPriority.value].Position
						end
					else
						args[2] = GetLowestHealthPlayer().Character[RagebotPriority.value]
						args[3] = GetLowestHealthPlayer().Character[RagebotPriority.value].Position
					end
				elseif RagebotTargetSelection.value == "Closest to Player" then
					if RagebotAwpBaim.value == true then
						if args[4] == "AWP" then
							args[2] = GetClosestToPlayer().Character.UpperTorso
							args[3] = GetClosestToPlayer().Character.UpperTorso.Position
						else
							args[2] = GetClosestToPlayer().Character[RagebotPriority.value]
							args[3] = GetClosestToPlayer().Character[RagebotPriority.value].Position
						end
					else
						args[2] = GetClosestToPlayer().Character[RagebotPriority.value]
						args[3] = GetClosestToPlayer().Character[RagebotPriority.value].Position
					end
				end
			end
			args[11] = false
		end
        return oldNamecall(unpack(args))
	end
	return oldNamecall(...)
end)
if setreadonly then setreadonly(mt, true) else make_writeable(mt, false) end


local debounce = false
runser.RenderStepped:Connect(function()
	if RagebotEnable.value == true then
		for _,plr in pairs(game.Players:GetPlayers()) do
			if plr.Character and plr.Name ~= lplr.Name and plr.Character:FindFirstChild("Head") and plr.Character:FindFirstChild("Humanoid").Health > 0 and lplr.Team ~= plr.Team then
				if RagebotAutoshoot.value == true then
					local visible = CheckPlayerIfVisible(plr)
					if visible == true then
						if debounce == false then
							local time = game.ReplicatedStorage.Weapons[lplr.Character.EquippedTool.Value].FireRate.Value
							debounce = true
							local senv = getsenv(game.Players.LocalPlayer.PlayerGui.Client)
							senv.firebullet()
							wait(time or 0.2)
							debounce = false
						end
					end
				end
			end
		end
	end
end)


--┏┓┏━┳━━┳━━┳━━┓
--┃┃┃┳┫┏━╋┃┃┻┓┏┛
--┃┗┫┻┫┗┓┣┃┃┓┃┃
--┗━┻━┻━━┻━━┛┗┛
function checkvisiblelegit(plr)
	local Visible
	ignore = {lplr.Character, workspace.Ray_Ignore, workspace.Map}
	if LegitEnableVisibleCheck.value == true then
		ignore = {lplr.Character, workspace.Ray_Ignore}
	end
	if lplr.Character:FindFirstChild("Head") then
		local ray = Ray.new(workspace.CurrentCamera.CFrame.Position, (plr.Character[LegitPriority.value].CFrame.p - workspace.CurrentCamera.CFrame.Position).unit*1000)
		local hit, pos = workspace:FindPartOnRayWithIgnoreList(ray, ignore, false, false)
		if hit and hit:FindFirstAncestor(plr.Name) then
			Visible = true
		else
			Visible = false
		end
	end

	return Visible
end
function checkfov(plr)
	local fov
	local vector = workspace.CurrentCamera:WorldToViewportPoint(plr.Character.HumanoidRootPart.Position)
	local magnitude = (Vector2.new(vector.X, vector.Y) - Vector2.new(mouse.X, mouse.Y)).magnitude
	if LegitFovCheck.value == true then
		local cfov = (LegitFovAmount.value or 100)
		if magnitude < cfov then
			fov = true
		else
			fov = false
		end
	else
		fov = true
	end
	return fov
end
function legitgettarget()
	local target
	local max = math.huge
	for _,plr in pairs(game.Players:GetPlayers()) do
		if plr.Character and plr.Character:FindFirstChild("Humanoid") and plr.Character:FindFirstChild("Humanoid").Health > 0 and plr.Name ~= lplr.Name then
			if checkvisiblelegit(plr) == true then
				if checkfov(plr) == true then
					if LegitTargetSelection.value == "Closest to Crosshair" then
						local vector = workspace.CurrentCamera:WorldToViewportPoint(plr.Character.HumanoidRootPart.Position)
						local magnitude = (Vector2.new(vector.X, vector.Y) - Vector2.new(mouse.X, mouse.Y)).magnitude
						if magnitude < max then
							target = plr
							max = magnitude
						end
					end
				end
			end
		end
	end

	return target
end

runser.RenderStepped:Connect(function()
	if LegitEnableAimbot.value == true and LegitAimbotBool == true then
		local target = legitgettarget()
		AimAt(target.Character[LegitPriority.value].Position)
	end
end)

function aimat(pos)
	local magX = ((Position.X - mouse.X) + 0) / LegitSmoothness.value
    local magY = ((Position.Y - mouse.Y - 36) + 0) / LegitSmoothness.value
    mousemoverel(AimX, AimY)
end



runser.RenderStepped:Connect(function()
	if KillingAll == true then
		killall()
	end
end)

function loadragecfg()
	RagebotEnable:SetValue(true)
	RagebotTargetSelection:SetValue("Lowest Health")
	RagebotRaycastSelection:SetValue("UpperTorso")
	RagebotPriority:SetValue("Head")
	RagebotAutoshoot:SetValue(true)
	RagebotAwpBaim:SetValue(true)
	RagebotSilentAim:SetValue(true)

	AAEnable:SetValue(true)
	AAPitch:SetValue("Down")
	AAYaw:SetValue("Manual")
	AATurnVelocity:SetValue(3333)
	AANoHeadDesync:SetValue(true)
	AALeftBind:SetValue("Z")
	AARightBind:SetValue("X")
	AABackBind:SetValue("C")

	VisualsEnable:SetValue(true)
	VisualsVisualize:SetValue("Enemy")
	VisualsBoxESP:SetValue(true)
	VisualsNameESP:SetValue(true)
	VisualsHealthESP:SetValue(true)
	VisualsDistanceESP:SetValue(true)
	VisualsWeaponESP:SetValue(true)
	VisualsEnableChams:SetValue(true)
	VisualsChams:SetValue(true)
	VisualsChamsColor:SetValue("White")
	VisualsChamsVisible:SetValue(true)
	VisualsGlow:SetValue(true)
	VisualsGlowColor:SetValue("Red")
	VisualsGlowVisible:SetValue(true)
	VisualsChamsTransparency:SetValue(0)

	VisualsFovChanger:SetValue(true)
	VisualsOnScope:SetValue(true)
	VisualsFovFov:SetValue(80)
	VisualsThirdPerson:SetValue(true)
	VisualsThirdPersonDistance:SetValue(13)
	VisualsNoFlash:SetValue(true)
	VisualsNoSmoke:SetValue(true)
	VisualsNoSleeves:SetValue(true)
	VisualsNoGloves:SetValue(true)
	VisualsArmsType:SetValue("Transparent")
	VisualsArmsTransparency:SetValue(0.85)
	VisualsArmColor:SetValue("Blue")
	VisualsScopeRemover:SetValue(true)
	OtherAutoHop:SetValue(true)
end
loadragecfg()

--if you see this and you are not taskmanager, please do not leak this code. instead, message me on disc (TaskManager#7996) and u will be awarded tester

local FOV_Color = Color3.fromRGB(0,0,255)
local FOV_Size = 250
local Client = game.Players.LocalPlayer
local Mouse = Client:GetMouse()

local FOVCircle = Drawing.new("Circle")
FOVCircle.Position = Vector2.new(0, 0)
FOVCircle.Radius = FOV_Size
FOVCircle.Thickness = .7
FOVCircle.Filled = false
FOVCircle.Transparency = 1
FOVCircle.Visible = true
FOVCircle.Color = FOV_Color

Mouse.Move:Connect(function()
	FOVCircle.Position = Vector2.new(Mouse.X, Mouse.Y + 36)
	FOVCircle.Radius = (LegitFovAmount.value or 150)
end)