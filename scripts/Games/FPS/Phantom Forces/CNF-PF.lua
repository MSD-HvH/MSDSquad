local rs = game:GetService("RunService")
local uis = game:GetService("UserInputService")

local Library = loadstring(game:HttpGet("https://raw.githubusercontent.com/xHeptc/Kavo-UI-Library/main/source.lua"))()
local Window = Library.CreateLib("CNF'S PF-Hack", "DarkTheme")

local AimbotTab = Window:NewTab("Aimbot")
local AimbotSection = AimbotTab:NewSection("Aimbot")

local EspTab = Window:NewTab("ESP")
local EspSection = EspTab:NewSection("ESP")

local ExperimentalTab = Window:NewTab("Experimental")
local SASection = ExperimentalTab:NewSection("Silent Aim")

local BindsTab = Window:NewTab("Binds")
local BindsSection = BindsTab:NewSection("Binds")

local ColorTab = Window:NewTab("Color")
local ColorSection = ColorTab:NewSection("Color")





local AbColor = Color3.fromRGB(255, 128, 128)
local EspColor = Color3.fromRGB(255, 128, 128)

ColorSection:NewColorPicker("Fov Ring Color", "", Color3.fromRGB(255,128,128), function(color)
    AbColor = color
end)

ColorSection:NewColorPicker("Esp Color", "", Color3.fromRGB(255,128,128), function(color)
    EspColor = color
end)



local smoothing = 1
local fov = 500
local wallCheck = false
local maxWalls = 0
local abTargetPart = "Head"
local FOVringList = {}

local function isPointVisible(targetForWallCheck, mw)
    local castPoints = {targetForWallCheck.PrimaryPart.Position}
    local ignoreList = {targetForWallCheck, game.Players.LocalPlayer.Character, game.Workspace.CurrentCamera}
    local result = workspace.CurrentCamera:GetPartsObscuringTarget(castPoints, ignoreList)
    
    return #result <= mw
end

AimbotSection:NewToggle("Enabled", "", function(state)
    if state then
        FOVringList = {}
        abLoop = rs.RenderStepped:Connect(function()
            for i,v in pairs(FOVringList) do
                v:Remove()
            end
            
            FOVringList = {}
            
            local FOVring = Drawing.new("Circle")
            FOVring.Visible = true
            FOVring.Thickness = 2
            FOVring.Radius = fov / workspace.CurrentCamera.FieldOfView
            FOVring.Transparency = 1
            FOVring.Color = AbColor
            FOVring.Position = game.Workspace.CurrentCamera.ViewportSize/2
            
            FOVringList[#FOVringList+1] = FOVring
            
            local team
            if game.Players.LocalPlayer.Team.Name == "Ghosts" then team = "Phantoms" else team = "Ghosts" end
            
            local target = Vector2.new(math.huge, math.huge)
            local targetPos
            local targetPlayer
            if game.Workspace.Players:FindFirstChild(team) then
                for i,v in pairs(game.Workspace.Players:FindFirstChild(team):GetChildren()) do
                    local pos = v[abTargetPart].Position
                    local ScreenSpacePos, IsOnScreen = game.Workspace.CurrentCamera:WorldToViewportPoint(pos)
                    ScreenSpacePos = Vector2.new(ScreenSpacePos.X, ScreenSpacePos.Y) - game.Workspace.CurrentCamera.ViewportSize/2
                    
                    if IsOnScreen and ScreenSpacePos.Magnitude < target.Magnitude and (isPointVisible(v, maxWalls) or not wallCheck) then
                        target = ScreenSpacePos
                        targetPos = pos
                        targetPlayer = v
                    end
                end
            end
            
            if target.Magnitude <= fov / workspace.CurrentCamera.FieldOfView and uis:IsMouseButtonPressed(Enum.UserInputType.MouseButton2) then
                if target ~= Vector2.new(math.huge, math.huge) then
                    mousemoverel(target.X/smoothing, target.Y/smoothing)
                end
            end
        end)
    else
        abLoop:Disconnect()
        for i,v in pairs(FOVringList) do
            v:Remove()
        end
    end
end)
AimbotSection:NewToggle("Wall Check", "", function(state) wallCheck = state end)
AimbotSection:NewSlider("Max Wallbangs", "Inclusive", 50, 0, function(s) maxWalls = s end)
AimbotSection:NewSlider("Fov", "", 50000, 500, function(s) fov = s end)
AimbotSection:NewSlider("Smoothing", "", 300, 100, function(s) smoothing = s/100 end)
AimbotSection:NewDropdown("Target Part", "", {"Head", "Torso", "Right Arm", "Left Arm", "Right Leg", "Left Leg"}, function(currentOption) abTargetPart = currentOption end)



local saTargetPart = "Head"
local safov = 500
local panicMode = false
local panicDistance = 5
local saWallCheck = false
local saWallBangs = 0
local gunCF
local motor
local sa = false
local saFovRingList = {}

saLoop = rs.RenderStepped:Connect(function()
    for i,v in pairs(saFovRingList) do
        v:Remove()
    end
      
    saFovRingList = {}
    if not sa then return end        
    local FOVring = Drawing.new("Circle")
    FOVring.Visible = true
    FOVring.Thickness = 2
    FOVring.Radius = safov / workspace.CurrentCamera.FieldOfView
    FOVring.Transparency = 1
    FOVring.Color = AbColor
    FOVring.Position = game.Workspace.CurrentCamera.ViewportSize/2
            
    saFovRingList[#saFovRingList+1] = FOVring
    
    local team
    if game.Players.LocalPlayer.Team.Name == "Ghosts" then team = "Phantoms" else team = "Ghosts" end
                
    local targetPos
    local last = Vector2.new(math.huge, math.huge)
    if game.Workspace.Players:FindFirstChild(team) then
        for i,v in pairs(game.Workspace.Players:FindFirstChild(team):GetChildren()) do
            local pos = v[saTargetPart].Position
            local ScreenSpacePos, IsOnScreen = game.Workspace.CurrentCamera:WorldToViewportPoint(pos)
            ScreenSpacePos = Vector2.new(ScreenSpacePos.X, ScreenSpacePos.Y) - game.Workspace.CurrentCamera.ViewportSize/2
            
            if (v[saTargetPart].Position - Workspace.CurrentCamera.CFrame.Position).Magnitude <= panicDistance and panicMode then
                targetPos = pos
                break
            end
                    
            if IsOnScreen and ScreenSpacePos.Magnitude < last.Magnitude and ScreenSpacePos.Magnitude <= (safov / workspace.CurrentCamera.FieldOfView) and (isPointVisible(v, saWallBangs) or not saWallCheck) then
                last = ScreenSpacePos
                targetPos = pos
            end
        end
    end
    if targetPos then
        motor = Workspace.CurrentCamera:GetChildren()[3].Trigger.Motor6D
        local cf = motor.C0
                
        local cf2 = CFrame.new(motor.Part0.CFrame:ToWorldSpace(cf).Position, targetPos)
        gunCF = motor.Part0.CFrame:ToObjectSpace(cf2)
    else
        gunCF = nil
        motor = nil
    end
end)
local OldIndex
OldIndex = hookmetamethod(game, "__newindex", newcclosure(function(...)
    local Self, Key, Value = ...

    if sa and motor and gunCF and Self == motor and Key == "C0" then
        return OldIndex(Self, Key, gunCF)
    end

    return OldIndex(...)
end))

SASection:NewToggle("Silent Aim", "", function(state)
    sa = state
end)

SASection:NewToggle("Wall Check", "", function(state) saWallCheck = state end)
SASection:NewSlider("Max Wallbangs", "Inclusive", 50, 0, function(s) saWallBangs = s end)
SASection:NewSlider("Fov", "", 50000, 500, function(s) safov = s end)
SASection:NewDropdown("Target Part", "", {"Head", "Torso", "Right Arm", "Left Arm", "Right Leg", "Left Leg"}, function(currentOption)saTargetPart = currentOption end)
SASection:NewToggle("Panic Mode", "Will track closest player if they are within panic distance", function(state) panicMode = state end)
SASection:NewSlider("Panic Distance", "", 40, 5, function(s) panicDistance = s end)



local LineList = {}
local width = 3
local height = 5

EspSection:NewToggle("Enabled", "", function(state)
    if state then
        LineList = {}
        espLoop = rs.RenderStepped:Connect(function()
            for i,v in pairs(LineList) do
                if v then
                    v:Remove()
                end
            end
            
            local team
            if game.Players.LocalPlayer.Team.Name == "Ghosts" then team = "Phantoms" else team = "Ghosts" end
            
            LineList = {}
            if game.Workspace.Players:FindFirstChild(team) then
                for i,v in pairs(game.Workspace.Players:FindFirstChild(team):GetChildren()) do
                    local pos = v.PrimaryPart.Position
                    local ScreenSpacePos, IsOnScreen = game.Workspace.CurrentCamera:WorldToViewportPoint(pos)
                    
                    a = game.Workspace.CurrentCamera:WorldToViewportPoint(v.Torso.CFrame:PointToWorldSpace(Vector3.new(width/2, height/2, 0)))
                    b = game.Workspace.CurrentCamera:WorldToViewportPoint(v.Torso.CFrame:PointToWorldSpace(Vector3.new(-width/2, height/2, 0)))
                    c = game.Workspace.CurrentCamera:WorldToViewportPoint(v.Torso.CFrame:PointToWorldSpace(Vector3.new(-width/2, -height/2, 0)))
                    d = game.Workspace.CurrentCamera:WorldToViewportPoint(v.Torso.CFrame:PointToWorldSpace(Vector3.new(width/2, -height/2, 0)))
                    
                    a = Vector2.new(a.X, a.Y)
                    b = Vector2.new(b.X, b.Y)
                    c = Vector2.new(c.X, c.Y)
                    d = Vector2.new(d.X, d.Y)
                    
                    if IsOnScreen then
                        local Line = Drawing.new("Quad")
                        Line.Visible = true
                        Line.PointA = a
                        Line.PointB = b
                        Line.PointC = c
                        Line.PointD = d
                        Line.Color = EspColor
                        Line.Thickness = 2
                        Line.Transparency = 1
                        
                        LineList[#LineList+1] = Line
                    end
                end
            end
        end)
    else
        espLoop:Disconnect()
        for i,v in pairs(LineList) do
            v:Remove()
        end
        LineList = {}
    end
end)



BindsSection:NewKeybind("Toggle UI", "", Enum.KeyCode.F, function()
	Library:ToggleUI()
end)