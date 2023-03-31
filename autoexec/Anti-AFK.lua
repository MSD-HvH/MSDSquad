local VirtualUser = game:service'VirtualUser'

game:service'Players'.LocalPlayer.Idled:connect(function()
	VirtualUser:CaptureController()
	VirtualUser:ClickButton2(Vector2.new())
end)

warn("Anti-Afk has Loaded")