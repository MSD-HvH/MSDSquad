//GUI Library Definition
(function CreateErrorHandler(fnCallback) {
	Duktape.errCreate = function (e) {
		if (!(e instanceof Error) || 'thrown' in e || !Object.isExtensible(e)) return e;
		e = fnCallback(e);
		return e;
	}
})(function (e) {
	e.time = new Date();
	Cheat.Print("Found error in the script code, please send next message to the developer: \n");
	Cheat.PrintColor([255, 74, 74, 255], "Information for the developer: error at line " + e.lineNumber + "\n");
	return e;
});
//Better Cheat.Print
const to_print = [
    [[124, 129, 252, 255], "\n ▒█████  ▄▄▄█████▓ ▄████▄    ██████ ▓██   ██▓ ███▄    █  ▄████▄   \n"],
    [[124, 129, 252, 255], "▒██▒  ██▒▓  ██▒ ▓▒▒██▀ ▀█  ▒██    ▒  ▒██  ██▒ ██ ▀█   █ ▒██▀ ▀█   \n"],
	[[124, 129, 252, 255], "▒██░  ██▒▒ ▓██░ ▒░▒▓█    ▄ ░ ▓██▄     ▒██ ██░▓██  ▀█ ██▒▒▓█    ▄  \n"],
	[[124, 129, 252, 255], "▒██   ██░░ ▓██▓ ░ ▒▓▓▄ ▄██▒  ▒   ██▒  ░ ▐██▓░▓██▒  ▐▌██▒▒▓▓▄ ▄██▒ \n"],
	[[124, 129, 252, 255], "░ ████▓▒░  ▒██▒ ░ ▒ ▓███▀ ░▒██████▒▒  ░ ██▒▓░▒██░   ▓██░▒ ▓███▀ ░ \n"],
	[[124, 129, 252, 255], "░ ▒░▒░▒░   ▒ ░░   ░ ░▒ ▒  ░▒ ▒▓▒ ▒ ░   ██▒▒▒ ░ ▒░   ▒ ▒ ░ ░▒ ▒  ░ \n"],
	[[124, 129, 252, 255], "  ░ ▒ ▒░     ░      ░  ▒   ░ ░▒  ░ ░ ▓██ ░▒░ ░ ░░   ░ ▒░  ░  ▒    \n"],
	[[124, 129, 252, 255], "░ ░ ░ ▒    ░      ░        ░  ░  ░   ▒ ▒ ░░     ░   ░ ░ ░         \n"],
	[[124, 129, 252, 255], "    ░ ░           ░ ░            ░   ░ ░              ░ ░ ░       v8.3 [DEV BUILD] \n"],
	[[163, 191, 115, 255], "\nWelcome, " + Cheat.GetUsername() + "!\n"],
	[[255, 0, 0, 255], "Thanks for choosing us! \n"],
	[[255, 0, 0, 255], "Official discord:"],
	[[217, 217, 217, 255], " discord.gg/U7GhZ2GP46 \n"],
	[[255, 0, 0, 255], "Dev Discords: \n"],
	[[217, 217, 217, 255], " Sleebu#0090 - Sleebu \n Soon - MoonX \n Mased#2459 - Mased \n"],
	[[255, 0, 0, 255], "You"],
	[[255, 255, 255, 255], "Game: "],
	[[217, 217, 217, 255], "Soon \n"],
	[[255, 255, 255, 255], "Broken"],
	[[97, 136, 227, 255], "core:"],
	[[217, 217, 217, 255], " Soon \n"],
	[[163, 191, 115, 255], "\n [ UPDATE LOG SOON ] \n"],
];

(function(obj){
    for (var i in obj){
        //obj[i][0] == color
        //obj[i][1] == text
        Cheat.PrintColor(obj[i][0], obj[i][1]);
    	}
})(to_print)
const si = "Script items";
var GUI = Duktape.compact({
	BackgroundOpacity: 0,
	TextOpacity: 0,
	AnimationSpeed: 90,
	X: 100,
	Y: 100,
	Width: 510,
	Height: 325,
	Radius: 10,
	SubtabListWidth: 150,
	SubtabListWidthScaled: 150,
	_MenuElements: {},
	_TabIcons: {},
	_TabAnimations: {},
	_SubtabAnimations: {},
	_MenuAnimation: [0, 0, 0, 0, 0],
	_HeaderAnimation: [0],
	_ElementAnimation: {},
	_HotkeyMenuAnimation: [0, 0, [0, 0, 0, 0]],
	_ColorPickerAnimation: [0, 0],
	_ColorMenuAnimation: [0, 0, [0, 0]],
	_DropdownAnimation: [0, 0, [0]],
	_CopiedColor: null,
	_MenuIsMoving: false,
	_OldCursor: [0, 0],
	_AnimatingBack: false,
	_AnimatingElements: false,
	_AfterLineY: 0,
	_ClickBlock: false,
	_SliderChanging: false,
	_HotkeyIsChanging: false,
	_HotkeyMenuOpened: false,
	_HotkeyMenuPos: [0, 0],
	_ColorPickerOpened: false,
	_ColorPickerActive: false,
	_ColorPickerPos: [0, 0],
	_ColorMenuOpened: false,
	_ColorMenuPos: [0, 0],
	_DropdownOpened: false,
	_DropdownActive: false,
	_DropdownPos: [0, 0],
	_DropdownWidth: 100,
	_DropdownSelectingElement: false,
	_ElementOffsets: {"checkbox": 30, "slider": 38, "hotkey": 30, "color": 30, "dropdown": 50, "label": 30, "multidropdown": 50},
	_SubmenuTriggerAnimations: {},
	_SubmenuAnimations: [0, 0],
	_LoadedCount: 0,
	ElementProto: {},
	ContainerWidth: 270, //in gui.subtablistdraw
	Render: [],
	Paths: [],
	Fonts: [],
	ActiveTab: "",
	ActiveSubtab: "",
	NewActiveSubtab: "",
	_Scale: 1,
	Checkboxes: [],
	Hotkeys: [],
	OverridenHotkeys: [],
	ColorPickers: [],
	HotkeyToggle: {},
	ScriptIsLoaded: false,
	DrawTime: 0,
	NOT_VISIBLE: (1 << 0),
	SAME_LINE: (1 << 1),
	NOT_SAVEABLE: (1 << 2),
	CHECKBOX_VIEW: (1 << 3),
	NO_DEFAULT: (1 << 4),
});
GUI.Init = function(name){
	GUI.LogoText = name;
}
GUI.InitElements = function(){
	UI.AddCheckbox("loaded");
	UI.SetEnabled(si, "loaded", 0);
	for(TabName in GUI._MenuElements){
		for(SubtabName in GUI._MenuElements[TabName]){
			for(Element in GUI._MenuElements[TabName][SubtabName]){
				var Elem = GUI._MenuElements[TabName][SubtabName][Element];
				switch (Elem.Type) {
					case "checkbox":
						if(Elem.Color !== undefined){
							GUI.ColorPickers.push(Element);
							UI.AddColorPicker(Element);
							UI.SetEnabled(si, Element, 0);
						}
						else if(Elem.Submenu !== undefined) GUI._SubmenuTriggerAnimations[Element] = 0;
						GUI.Checkboxes[Elem.Index] = Element;
						break;
					case "slider":
						UI.AddSliderInt(Element, Elem.Min, Elem.Max);
						UI.SetEnabled(si, Element, 0);
						if(Elem.Flags & GUI.NO_DEFAULT) break;
						UI.AddCheckbox(Element + "_not_def")
						UI.SetEnabled(si, Element + "_not_def", 0);
						if (!UI.GetValue(si, Element + "_not_def")) UI.SetValue(si, Element, Elem.Value);
						break;
					case "hotkey": {
						GUI.Hotkeys.push(Element);
						UI.AddSliderInt(Element, 0, 3000);
						UI.SetEnabled(si, Element, 0);
						GUI.HotkeyToggle[Element] = [false, false];
						break;
					}
					case "color": {
						GUI.ColorPickers.push(Element);
						UI.AddColorPicker(Element);
						UI.SetEnabled(si, Element, 0);
						//UI.SetColor(si, Element, GUI.Colors.ActiveElement);
						break;
					}
					case "dropdown": {
						if(Elem.Flags & GUI.NOT_SAVEABLE) break;
						UI.AddDropdown(Element, Elem.Elements);
						UI.SetEnabled(si, Element, 0);
						break;
					}
					case "multidropdown": {
						UI.AddMultiDropdown(Element, Elem.Elements);
						UI.SetEnabled(si, Element, 0);
						break;
					}
				}
			}
		}
	}

	for(Checkbox = 0; Checkbox < GUI.Checkboxes.length; Checkbox++){
		if(Checkbox % 8 === 0){
			var Checkboxes = GUI.Checkboxes.slice(Checkbox).slice(0, 8);
			var name = ("gui_checkboxes" + Checkbox / 8);
			UI.AddMultiDropdown(name, Checkboxes);
			UI.SetEnabled(si, name, 0);
		}
	}

	//var ScreenSize = Render.GetScreenSize();
	//UI.AddSliderInt("gui_x", -GUI.Scale(GUI.Width), ScreenSize[0]);
	//UI.AddSliderInt("gui_y", 0, ScreenSize[1]);
	//UI.SetEnabled(si, "gui_x", 0);
	//UI.SetEnabled(si, "gui_y", 0);

	GUI.LoadElements();
}
GUI.LoadElements = function(){
	if(GUI._LoadedCount > 32) return true;
	for(TabName in GUI._MenuElements){
		for(SubtabName in GUI._MenuElements[TabName]){
			for(Element in GUI._MenuElements[TabName][SubtabName]){
				var Elem = GUI._MenuElements[TabName][SubtabName][Element];
				switch (Elem.Type) {
					case "checkbox":
						if(Elem.Color !== undefined){
							var color = GUI.GetColor(TabName, SubtabName, Elem.Name, false);
							Elem.Color = color[0];
							Elem.ColorHSV = color[1];
						}
						Elem.State = GUI.GetValue(TabName, SubtabName, Elem.Name, false);
						break;
					case "slider":
						if (UI.GetValue(si, Element + "_not_def")) Elem.Value = GUI.GetValue(TabName, SubtabName, Elem.Name, false);
						break;
					case "hotkey":
						var HotkeySettings = GUI.GetValue(TabName, SubtabName, Elem.Name, false);
						Elem.Mode = HotkeySettings[0];
						Elem.Key = HotkeySettings[1];
						Elem.KeyName = HotkeySettings[2];
						break;
					case "color":
						var color = GUI.GetColor(TabName, SubtabName, Elem.Name, false);
						Elem.Color = color[0];
						Elem.ColorHSV = color[1];
						break;
					case "dropdown": 
						if(Elem.Flags & GUI.NOT_SAVEABLE) break;
						var val = UI.GetValue(si, Element);
						if(Elem.Elements[val] === undefined) UI.SetValue(si, Element, val = 0);
						Elem.Value = val;
						break;
					case "multidropdown": 
						Elem.Value = UI.GetValue(si, Element);
						break;
				}
			}
		}
	}

	if(GetVal("loaded")) GUI.ScriptIsLoaded = true;
	UI.SetValue(si, "loaded", 1);

	GUI._LoadedCount++;
}
GUI.Draw = function(){
	if(!GUI.LoadElements()) return;
	GUI.CacheVariables();
	if(GUI.ProcessAnimations()){
		GUI.InitFonts();
		GUI.DrawMenu();
		if (!GUI.ScriptIsLoaded) return;
		GUI.DrawHeader();
		GUI.DrawSubtabList();
		GUI.DrawElements();
		GUI.DrawTabList();
		GUI.ProcessDrag();
	}
	GUI.ResetHotkeyOverride();
}
GUI.DrawMenu = function(){
	var MenuX = Easing(GUI.X + GUI.Scale(GUI.Width) / 2, GUI.X, GUI._MenuAnimation[0]);
	var MenuY = Easing(GUI.Y + GUI.Scale(GUI.Height) / 2, GUI.Y, GUI._MenuAnimation[0]);
	var MenuHeight = Easing(0, GUI.Scale(GUI.Height), GUI._MenuAnimation[0]);
	var MenuWidth = Easing(0, GUI.Scale(GUI.Width), GUI._MenuAnimation[0]);
	Render.RoundedRect(MenuX, MenuY, MenuWidth, MenuHeight, GUI.Radius, GUI.Colors.Background);
	var logo = GUI.LogoText;
	if(!GUI.ScriptIsLoaded) logo = "Reload the script!";
	var LogoSize = Render.TextSizeCustom(logo, GUI.Fonts.Logo);
	var LogoColor = GUI.Colors.AnimateBackground(GUI.Colors.Logo);
	if(GUI.ActiveTab !== "" && !GUI._AnimatingBack) return;
	
	Render.StringCustom(GUI.X + (GUI.Scale(GUI.Width) / 2) - (LogoSize[0] / 2), GUI.Y + 70 + (!GUI.ScriptIsLoaded * 30), 0, logo, LogoColor, GUI.Fonts.Logo);
	if(!GUI.ScriptIsLoaded){
		var text = 'Press "Reload all" button in Scripts';
		var TextSize = Render.TextSizeCustom(text, GUI.Fonts.TabText);
		var TextColor = GUI.Colors.AnimateBackground(GUI.Colors.TabText);
		Render.StringCustom(GUI.X + (GUI.Scale(GUI.Width) / 2) - (TextSize[0] / 2), GUI.Y + 140, 0, text, TextColor, GUI.Fonts.TabText);
	}
}
GUI.DrawTabList = function(){
	var adapt = Globals.Frametime() * GUI.AnimationSpeed;
	var TabNames = Object.keys(GUI._MenuElements);
	var TabY = GUI.Y + GUI.Scale(GUI.Height * 0.45);
	var TabWidth = GUI.Scale(80);
	var TabHeight = TabWidth;
	var TabMargin = GUI.Scale(18);
	var TabStart = (GUI.Scale(GUI.Width) - ((TabWidth + TabMargin) * TabNames.length)) / 2;
	var TabFadeSpeed = 0.04 * adapt;
	for(TabName in GUI._MenuElements){
		if(GUI._MenuAnimation[2] >= 0.95) break;
		if (TabName === GUI.ActiveTab) continue;
		var Index = TabNames.indexOf(TabName);
		var TabX = GUI.X + TabStart + TabMargin / 2 + ((TabWidth + TabMargin) * Index);
		
		GUI.DrawTab(TabX, TabY, TabWidth, TabHeight, TabName);
		Render.FilledRect(TabX - 1, TabY, 1, TabHeight, GUI.Colors.AnimateBackground(GUI.Colors.Background));
		if(UI.IsCursorInBox(TabX, TabY, TabWidth, TabHeight)){
			if(Input.IsKeyPressed(1) && !GUI.IsAnimating() && !GUI._MenuIsMoving){
				GUI._MenuAnimation[4] = 0;
				GUI.ActiveTab = TabName;
				GUI.ActiveSubtab = Object.keys(GUI._MenuElements[TabName])[0];
			}
			GUI._TabAnimations[TabName][0] += TabFadeSpeed;
			GUI._TabAnimations[TabName][1] += TabFadeSpeed;
		}
		else{
			GUI._TabAnimations[TabName][0] -= TabFadeSpeed;
			GUI._TabAnimations[TabName][1] -= TabFadeSpeed;
			if (GUI._TabAnimations[TabName][0] < 0.20){
				GUI._TabAnimations[TabName][0] += TabFadeSpeed / 2.75;
			}
			if (GUI._TabAnimations[TabName][1] < 0.20) {
				GUI._TabAnimations[TabName][1] += TabFadeSpeed / 2.75;
			}
		}

		GUI._TabAnimations[TabName][0] = Clamp(GUI._TabAnimations[TabName][0], 0, 1);
		GUI._TabAnimations[TabName][1] = Clamp(GUI._TabAnimations[TabName][0], 0, 1);
	}

	//Render active tab animation
	var EasingType = +(GUI.ActiveTab === "" || GUI._AnimatingBack);
	if(GUI.ActiveTab !== ""){
		var Index = TabNames.indexOf(GUI.ActiveTab);
		var TabX = GUI.X + TabStart + TabMargin / 2 + ((TabWidth + TabMargin) * Index);
		var ActiveTabX = Easing(TabX, GUI.X, GUI._MenuAnimation[2], EasingType);
		var ActiveTabY = Easing(TabY, GUI.Y, GUI._MenuAnimation[2], EasingType);
		var ActiveTabWidth = Easing(TabWidth, GUI.Scale(GUI.Width), GUI._MenuAnimation[2], EasingType);
		var ActiveTabHeight = Easing(TabHeight, GUI.Scale(GUI.Height), GUI._MenuAnimation[2], EasingType);
		if(!GUI._AnimatingBack){
			GUI._TabAnimations[GUI.ActiveTab][0] = Clamp(GUI._TabAnimations[GUI.ActiveTab][0] + TabFadeSpeed * 2, 0, 1);
			GUI._TabAnimations[GUI.ActiveTab][1] = Clamp(GUI._TabAnimations[GUI.ActiveTab][1] + TabFadeSpeed * 2, 0, 1);
			if(GUI._MenuAnimation[2] >= 1) GUI._MenuAnimation[3] += 0.05 * adapt;
			else GUI._MenuAnimation[2] += 0.05 * adapt;
		}
		if(GUI._MenuAnimation[3] < 1) GUI.DrawTab(ActiveTabX, ActiveTabY, ActiveTabWidth, ActiveTabHeight, GUI.ActiveTab);
	}
	if(GUI._AnimatingBack){
		GUI._MenuAnimation[3] -= 0.05 * adapt;
		if(GUI._MenuAnimation[3] <= 0) GUI._MenuAnimation[2] -= 0.05 * adapt;
	}
	GUI._MenuAnimation[2] = Clamp(GUI._MenuAnimation[2], 0, 1);
	GUI._MenuAnimation[3] = Clamp(GUI._MenuAnimation[3], 0, 1);
	if(GUI._MenuAnimation[2] <= 0 && GUI.ActiveTab !== ""){
		GUI._AnimatingBack = false;
		GUI.ActiveTab = "";
	}
}
GUI.DrawHeader = function(){
	if(GUI.ActiveTab === "" || GUI._MenuAnimation[2] < 1) return;
	var adapt = Globals.Frametime() * GUI.AnimationSpeed;
	var HeaderLogoColor = GUI.Colors.AnimateBackground(GUI.Colors.FadeColor(GUI.Colors.Logo, GUI.Colors.Text, GUI._HeaderAnimation[0]));
	var HeaderLogoSize = Render.TextSizeCustom(GUI.LogoText, GUI.Fonts.HeaderLogo);
	HeaderLogoSize[1] -= 12;
	var HeaderLogoX = GUI.X + 6;
	var HeaderLogoY = GUI.Y;
	var HeaderLineY = HeaderLogoY + HeaderLogoSize[1] + 10;
	GUI._AfterLineY = HeaderLineY;
	var LineColor = GUI.Colors.AnimateBackground(GUI.Colors.Line);
	Render.StringCustom(HeaderLogoX, HeaderLogoY - 2, 0, GUI.LogoText, HeaderLogoColor, GUI.Fonts.HeaderLogo);

	var ArrowAfterLogoX = HeaderLogoX + HeaderLogoSize[0] + 5;
	var ArrowAfterLogoY = HeaderLogoY + HeaderLogoSize[1] / 2 + 2;
	var ArrowAfterLogoWidth = GUI.Scale(4);
	var ArrowAfterLogoHeight = GUI.Scale(6);
	var ArrowColor = GUI.Colors.AnimateBackground(GUI.Colors.ArrowColor);
	GUI.DrawRightArrow(ArrowAfterLogoX, ArrowAfterLogoY, ArrowAfterLogoWidth, ArrowAfterLogoHeight, ArrowColor);

	var TabNameColor = GUI.Colors.AnimateBackground(GUI.Colors.Logo);

	var IconMarginY = (GUI._Scale > 1) ? 1 : (GUI._Scale < 1) ? -1 : 0;
	Render.StringCustom(ArrowAfterLogoX + ArrowAfterLogoWidth + 5, HeaderLogoY + GUI.Scale(5 + IconMarginY), 0, GUI._TabIcons[GUI.ActiveTab], TabNameColor, GUI.Fonts.HeaderTabIcon);
	Render.StringCustom(ArrowAfterLogoX + ArrowAfterLogoWidth + GUI.Scale(22), HeaderLogoY + GUI.Scale(2) - 1, 0, GUI.ActiveTab, TabNameColor, GUI.Fonts.HeaderTabText);

	Render.Line(GUI.X, HeaderLineY, GUI.X + Math.floor(GUI.Width * GUI._Scale), HeaderLineY, LineColor);

	if (UI.IsCursorInBox(HeaderLogoX, HeaderLogoY + GUI.Scale(4), HeaderLogoSize[0], HeaderLogoSize[1]) && !GUI._ColorPickerOpened && !GUI._HotkeyMenuOpened && !GUI._ColorMenuOpened){
		if(Input.IsKeyPressed(1) && !GUI.IsAnimating() && !GUI._MenuIsMoving && GUI._SliderChanging === false) GUI._AnimatingBack = true;
		GUI._HeaderAnimation[0] += 0.06 * adapt;
	}
	else GUI._HeaderAnimation[0] -= 0.06 * adapt;

	GUI._HeaderAnimation[0] = Clamp(GUI._HeaderAnimation[0], 0, 1);

	var Username = Cheat.GetUsername();
	var Username = rusToEng(Username.charAt(0).toUpperCase() + Username.slice(1));
	//if(!mustDisplayString(Username, GUI.Fonts.Username, GUI.Scale(11))) return;
	var UsernameTextSize = Render.TextSizeCustom(Username, GUI.Fonts.Username);
	var UsernameX = GUI.X + GUI.Scale(GUI.Width) - 6 - UsernameTextSize[0];
	var UsernameColor = GUI.Colors.AnimateBackground(GUI.Colors.Username);

	Render.StringCustom(UsernameX, GUI.Y + 2, 0, Username, UsernameColor, GUI.Fonts.Username);

	/*var AvatarColor = GUI.Colors.StringToColor(Username);
	var AvatarLetter = Username.charAt(0);
	var AvatarLetterColor = GUI.Colors.GetContrastColor(AvatarColor, [255, 255, 255, 255], [0, 0, 0, 255]);
	var AvatarLetterTextSize = Render.TextSizeCustom(AvatarLetter, GUI.Fonts.AvatarLetter);
	Render.Arc(UsernameX - 14, GUI.Y + 13, 11, 11, 0, 300, GUI.Colors.HexToRgb(AvatarColor));
	Render.FilledCircle(UsernameX - 14, GUI.Y + 14, 11, GUI.Colors.Checkbox);
	Render.Circle(UsernameX - 14, GUI.Y + 14, 11, GUI.Colors.CheckboxBorder);
	Render.StringCustom(UsernameX - 14 - AvatarLetterTextSize[0] / 2, GUI.Y + 1, 0, AvatarLetter, AvatarLetterColor, GUI.Fonts.AvatarLetter);*/
}
GUI.DrawSubtabList = function(){
	if(GUI.ActiveTab === "" || GUI._MenuAnimation[2] < 1) return;
	var adapt = Globals.Frametime() * GUI.AnimationSpeed;
	GUI.SubtabListWidthScaled = GUI.Scale(GUI.SubtabListWidth);
	GUI.ContainerWidth = GUI.Scale(GUI.Width - GUI.SubtabListWidth) - 44;

	var SubtabListColor = GUI.Colors.AnimateBackground(GUI.Colors.SubtabList);
	var SubtabHeight = GUI.Scale(40);
	var LineColor = GUI.Colors.AnimateBackground(GUI.Colors.Line);
	var TopOffset = GUI._AfterLineY - GUI.Y + 1;
	Render.FilledRect(GUI.X + GUI.Radius, GUI.Y + TopOffset, GUI.SubtabListWidthScaled - GUI.Radius, GUI.Scale(GUI.Height) - TopOffset, SubtabListColor);
	Render.FilledRect(GUI.X, GUI.Y + TopOffset, GUI.SubtabListWidthScaled, GUI.Scale(GUI.Height) - TopOffset - GUI.Radius, SubtabListColor);
	Render.FilledCircle(GUI.X + GUI.Radius, GUI.Y + GUI.Scale(GUI.Height) - GUI.Radius - 1, GUI.Radius + 1, SubtabListColor);
	Render.Line(GUI.X + GUI.SubtabListWidthScaled, GUI.Y + TopOffset, GUI.X + GUI.SubtabListWidthScaled, GUI.Y + GUI.Scale(GUI.Height), LineColor);
	var CurrentTab = GUI._MenuElements[GUI.ActiveTab];
	var SubtabNames = Object.keys(CurrentTab);

	for(SubtabName in CurrentTab){
		var Index = SubtabNames.indexOf(SubtabName);
		var SubtabY = GUI.Y + TopOffset + (SubtabHeight * Index);
		var SubtabTextColor = GUI.Colors.AnimateBackground(GUI.Colors.FadeColor(GUI.Colors.SubtabText, GUI.Colors.Text, ((GUI.ActiveSubtab === SubtabName) ? GUI._MenuAnimation[4] : GUI._SubtabAnimations[SubtabName])));
		if(GUI.ActiveSubtab === SubtabName){
			var SubtabActiveColor = GUI.Colors.AnimateBackground(GUI.Colors.FadeColor(GUI.Colors.SubtabList, GUI.Colors.SubtabListActive, GUI._MenuAnimation[4]));
			Render.FilledRect(GUI.X, SubtabY, GUI.SubtabListWidthScaled, SubtabHeight, SubtabActiveColor);
		}
		Render.StringCustom(GUI.X + GUI.Scale(14), SubtabY + GUI.Scale(10), 0, SubtabName, SubtabTextColor, GUI.Fonts.SubtabText);
		if (UI.IsCursorInBox(GUI.X, SubtabY, GUI.SubtabListWidthScaled, SubtabHeight) && !GUI._ColorPickerOpened && !GUI._ColorMenuOpened && !GUI._HotkeyMenuOpened){
			GUI._SubtabAnimations[SubtabName] += 0.04 * adapt;
			if(Input.IsKeyPressed(1) && !GUI.IsAnimating() && !GUI._SliderChanging){
				if(GUI.ActiveSubtab !== SubtabName){
					GUI._AnimatingElements = true;
					GUI.NewActiveSubtab = SubtabName;
					GUI._SubtabAnimations[SubtabName] = 0;
				}
			}
		}
		else GUI._SubtabAnimations[SubtabName] -= 0.04 * adapt;
		GUI._SubtabAnimations[SubtabName] = Clamp(GUI._SubtabAnimations[SubtabName], 0, 1);
		
	}

	if(GUI._AnimatingElements){
		GUI._MenuAnimation[4] -= 0.06 * adapt;
		if(GUI._MenuAnimation[4] <= 0){
			GUI._AnimatingElements = false;
			GUI._SubtabAnimations[GUI.NewActiveSubtab] = 0;
			GUI.ActiveSubtab = GUI.NewActiveSubtab;
		}
	}
	else if(GUI._MenuAnimation[3] >= 1) GUI._MenuAnimation[4] += 0.06 * adapt;
	GUI._MenuAnimation[4] = Clamp(GUI._MenuAnimation[4], 0, 1);
}
GUI.DrawElements = function(){
	if(GUI.ActiveTab === "" || GUI._MenuAnimation[2] < 1) return;
	var CurrentSubtab = GUI._MenuElements[GUI.ActiveTab][GUI.ActiveSubtab];
	var ElementIds = Object.keys(CurrentSubtab);
	var TopOffset = GUI._AfterLineY - GUI.Y + 1;
	var ElementOffsetY = 0;
	for(i = 0; i < ElementIds.length; i++){
		var ElementId = ElementIds[i];
		var Element = CurrentSubtab[ElementId];
		if (Element.Flags & GUI.NOT_VISIBLE){
			GUI._ElementAnimation[ElementId] = 0;
			continue;
		}
		var Visible = true;
		function checkMaster(E){
			if(!E.Master) return;
			var Master = GUI._MenuElements[GUI.ActiveTab][GUI.ActiveSubtab][(E.Master[0] === "!") ? E.Master.slice(1) : E.Master];
			Visible = GUI.GetMasterState(GUI.ActiveTab, GUI.ActiveSubtab, E.Master);
			if(Master.Master && Visible) checkMaster(Master.Master);
			if(E.Type === "checkbox" && !Visible) GUI._ElementAnimation[ElementId] = !E.SetValue(false);
		}
		checkMaster(Element);
		if(!Visible) continue;

		var ElementX = GUI.X + GUI.SubtabListWidthScaled + 16;
		if(Element.Flags & GUI.SAME_LINE){
			ElementX = GUI.X + ((GUI.Scale(GUI.Width) + GUI.SubtabListWidthScaled) / 2);
			ElementOffsetY -= GUI.Scale(GUI._ElementOffsets[Element.Type]);
		}
		var ElementY = GUI.Y + TopOffset + ElementOffsetY + Easing(0, 30, 1 - GUI._MenuAnimation[4], 1);
		var PreviousElement = CurrentSubtab[ElementIds[i - 1]] || null;
		GUI.RenderElement(Element, ElementX, ElementY, ElementId, PreviousElement);
		ElementOffsetY += GUI.Scale(GUI._ElementOffsets[Element.Type]);
	}
	GUI.DrawHotkeyMenu();
	GUI.DrawColorPicker();
	GUI.DrawColorMenu();
	GUI.DrawDropdownSelector();
}
GUI.RenderElement = function(E, x, y, id, prev){
	switch(E.Type){
		case "checkbox":
			GUI.DrawCheckbox(x, y, E.Name, id, E.State);
			break;
		case "slider":
			GUI.DrawSlider(x, y, E.Name, id);
			break;
		case "hotkey":
			GUI.DrawHotkey(x, y, E.Name, id);
			break;
		case "color":
			GUI.DrawColor(x, y, E.Name, id);
			break;
		case "multidropdown":
		case "dropdown":
			GUI.DrawDropdown(x, y, E.Name, id, prev);
			break;
		case "label":
			GUI.DrawLabel(x, y, E.Name);
			break;
	}
}
GUI.DrawTab = function(x, y, width, height, name){
	var Animation = GUI._MenuAnimation[1] - ((GUI._MenuAnimation[2] >= 1) ? ((GUI._MenuAnimation[3] - 0.3) / 0.7) : 0);
	var EasingType = +(GUI.ActiveTab === "" || GUI._AnimatingBack);
	var Radius = Math.ceil(Easing(7, GUI.Radius, GUI._MenuAnimation[3], !EasingType));
	Animation = Clamp(Animation, 0, 1);
	var TabTextSize = Render.TextSizeCustom(name, GUI.Fonts.TabText);
	var TabColor = GUI.Colors.Animate(GUI.Colors.Background, GUI.Colors.FadeColor(GUI.Colors.TabButton, GUI.Colors.TabButtonHover, GUI._TabAnimations[name][0]), Animation, (Animation < 0.05) ? 0 : 255);
	var TabTextColor = GUI.Colors.GetColor(GUI.Colors.Animate(GUI.Colors.Background, GUI.Colors.FadeColor(GUI.Colors.TabText, GUI.Colors.Text, GUI._TabAnimations[name][1]), Animation, Animation * 255), GUI._TabAnimations[name][0] * 255)
	var TabIconColor = GUI.Colors.Animate(GUI.Colors.Background, GUI.Colors.FadeColor(GUI.Colors.TabText, GUI.Colors.Text, GUI._TabAnimations[name][1]), Animation, Animation * 255);
	if (name == GUI.ActiveTab) TabTextColor = TabIconColor;
	Render.RoundedRect(x, y, width, height, Radius, TabColor);
	Render.StringCustom(x + (width / 2) - (TabTextSize[0] / 2), y + (height / 2) + GUI.Scale(20) - Easing(0, GUI.Scale(20), GUI._TabAnimations[name][0]), 0, name, TabTextColor, GUI.Fonts.TabText);
	var IconSize = Render.TextSizeCustom(GUI._TabIcons[name], GUI.Fonts.TabIcon);
	Render.StringCustom(x + (width / 2) - (IconSize[0] / 2), y + (height / 2) - GUI.Scale(18) - Easing(0, GUI.Scale(14), GUI._TabAnimations[name][0]), 0, GUI._TabIcons[name], TabIconColor, GUI.Fonts.TabIcon);
}
GUI.DrawRightArrow = function(x, y, width, height, color){
	Render.Line(x, y - 1, x + width, y + height / 2, color);
	Render.Line(x + 1, y - 1, x + 1 + width, y + height / 2, color);
	Render.Line(x, y + height + 1, x + width, y + height / 2, color);
	Render.Line(x + 1, y + height + 1, x + 1 + width, y + height / 2, color);
}
GUI.Scale = function(int){
	return Math.ceil(int * GUI._Scale);
}
GUI.DrawCheckbox = function(x, y, name, id, state){
	var adapt = Globals.Frametime() * GUI.AnimationSpeed;
	var CheckboxWidth = GUI.Scale(14);
	var CheckboxHeight = CheckboxWidth;
	var Element = GUI._MenuElements[GUI.ActiveTab][GUI.ActiveSubtab][id];
	var CheckboxState = state || Element.State;
	if(CheckboxState) GUI._ElementAnimation[id] = 1;
	var Animation = (GUI._MenuAnimation[1] < 1) ? GUI._MenuAnimation[1] : GUI._MenuAnimation[4];
	var CheckboxColor = ((CheckboxState) ? GUI.Colors.ActiveElement : GUI.Colors.Checkbox);
	var CheckboxColorAnimated = GUI.Colors.Animate(GUI.Colors.Background, CheckboxColor, Animation, GUI._MenuAnimation[1] * 255);
	var CheckboxBorderColor = GUI.Colors.FadeColor(GUI.Colors.CheckboxBorder, GUI.Colors.ActiveElement, GUI._ElementAnimation[id]);
	var CheckboxBorderColorAnimated = GUI.Colors.Animate(GUI.Colors.Background, CheckboxBorderColor, Animation, GUI._MenuAnimation[1] * 255);
	var CheckboxTextColor = GUI.Colors.Animate(GUI.Colors.Background, GUI.Colors.Text, Animation, GUI._MenuAnimation[1] * 255);
	var CheckboxTextSize = Render.TextSizeCustom(name, GUI.Fonts.Menu);
	var CheckboxTextX = x + CheckboxWidth + 4;
	Render.SmoothRect(x, y + GUI.Scale(18), CheckboxWidth, CheckboxHeight, CheckboxBorderColorAnimated);
	Render.SmoothRect(x + 1, y + GUI.Scale(18) + 1, CheckboxWidth - 2, CheckboxHeight - 2, CheckboxColorAnimated);
	Render.StringCustom(CheckboxTextX, y + GUI.Scale(12) + 2.6, 0, name, CheckboxTextColor, GUI.Fonts.Menu);

	if (UI.IsCursorInBox(x, y + GUI.Scale(17), CheckboxWidth + 4 + CheckboxTextSize[0], CheckboxHeight + 2) && GUI._SliderChanging == false && !GUI._ColorPickerOpened && GUI._DropdownAnimation[0] === 0&& !GUI._ColorMenuOpened && !GUI._HotkeyMenuOpened && GUI._HotkeyMenuAnimation[0] === 0 && GUI._ColorMenuAnimation[0] === 0){
		GUI._ElementAnimation[id] += 0.06 * adapt;
		if(Input.IsKeyPressed(1) && !GUI.IsAnimating()){
			if(!GUI._ClickBlock){
				GUI._ClickBlock = true;
				Element.SetValue(!CheckboxState);
			}
		}
		else GUI._ClickBlock = false;
	}
	else GUI._ElementAnimation[id] -= 0.06 * adapt;
	GUI._ElementAnimation[id] = Clamp(GUI._ElementAnimation[id], 0, 1);
	if(CheckboxState){
		var CheckboxTextX2 = x + 18;
		var ElementEndX = Clamp(CheckboxTextX2 + CheckboxTextSize[0] + 8, CheckboxTextX2 + GUI.ContainerWidth - CheckboxWidth, CheckboxTextX2 + GUI.Scale(GUI.Width));
		if(Element.Color !== undefined) GUI.DrawColor(ElementEndX, y, name, id, true);
		else if(Element.Submenu !== undefined){
			var x = ElementEndX + GUI.Scale(4);
			var y = y + 21;
			//GUI.DrawSubmenu(x, y, id);
		}
	}
}
GUI.DrawSlider = function(x, y, name, id){
	var Animation = (GUI._MenuAnimation[1] < 1) ? GUI._MenuAnimation[1] : GUI._MenuAnimation[4];
	var SliderTextColor = GUI.Colors.Animate(GUI.Colors.Background, GUI.Colors.Text, Animation, GUI._MenuAnimation[1] * 255);
	var SliderColorAnimated = GUI.Colors.Animate(GUI.Colors.Background, GUI.Colors.Checkbox, Animation, GUI._MenuAnimation[1] * 255);
	var SliderBorderColor = GUI.Colors.FadeColor(GUI.Colors.CheckboxBorder, GUI.Colors.ActiveElement, GUI._ElementAnimation[id]);
	var SliderBorderColorAnimated = GUI.Colors.Animate(GUI.Colors.Background, SliderBorderColor, Animation, GUI._MenuAnimation[1] * 255);
	var SliderProgressColor = GUI.Colors.Animate(GUI.Colors.Background, GUI.Colors.ActiveElement, Animation, GUI._MenuAnimation[1] * 255);
	var SliderHeight = GUI.Scale(10);
	var SliderWidth = GUI.ContainerWidth;
	var SliderX = x + 18;
	var SliderY = y + GUI.Scale(32);
	Render.SmoothRect(SliderX, SliderY, SliderWidth, SliderHeight, SliderBorderColorAnimated);
	Render.SmoothRect(SliderX + 1, SliderY + 1, SliderWidth - 2, SliderHeight - 2, SliderColorAnimated);
	var Slider = GUI._MenuElements[GUI.ActiveTab][GUI.ActiveSubtab][id];
	var Value = Clamp(Slider.Value, Slider.Min, Slider.Max);
	var ValueStart = 1;
	var Percent = (SliderWidth - ValueStart) / Math.abs(Slider.Min - Slider.Max);
	var Progress = Value * Percent - (Slider.Min * Percent);
	Progress = (Value == Slider.Max) ? SliderWidth : Clamp(Progress, 2, SliderWidth);
	if ((UI.IsCursorInBox(SliderX, SliderY, SliderWidth, SliderHeight + 2) && GUI._SliderChanging == false && GUI._HotkeyMenuOpened == false && GUI._DropdownAnimation[0] === 0 && GUI._HotkeyMenuAnimation[0] === 0 && !GUI._ColorPickerOpened) || GUI._SliderChanging == id){
		if(Input.IsKeyPressed(1)){
			GUI._SliderChanging = id;
			Value = Clamp(Math.round(((CursorPos[0] - SliderX) / Percent) + Slider.Min), Slider.Min, Slider.Max);
			
			Progress = Value * Percent - (Slider.Min * Percent);
			Progress = (Value == Slider.Max) ? SliderWidth : Clamp(Progress, 2, SliderWidth);
			Slider.SetValue(Value);
		}
		else{
			GUI._SliderChanging = false;
		}
	}

	Render.StringCustom(SliderX, y + GUI.Scale(10), 0, name, SliderTextColor, GUI.Fonts.Menu);
	if(Progress < 4) Render.Rect(SliderX + 1, SliderY, 2, SliderHeight, SliderProgressColor);

	Progress = Clamp(Easing(0, Progress, Animation), 2, SliderWidth);
	Render.SmoothRect(SliderX, SliderY, Progress, SliderHeight, SliderProgressColor);

	var ValueTextSize = Render.TextSizeCustom(Value + "", GUI.Fonts.Menu);
	var ValueTextX = Clamp(SliderX + Progress - (ValueTextSize[0] / 2) + 2, SliderX + 3, SliderX + SliderWidth - (ValueTextSize[0] * 0.7) - 2);
	var ValueTextShadowColor = GUI.Colors.Animate(GUI.Colors.Background, [0, 0, 0, 100], Animation, 255);

	var SliderValueMargin = 1 + (2 * +(GUI._Scale > 1));

	Render.StringCustom(ValueTextX + 1, SliderY - SliderValueMargin, 0, Value + "", ValueTextShadowColor, GUI.Fonts.SliderValue);
	Render.StringCustom(ValueTextX, SliderY - SliderValueMargin - 1, 0, Value + "", SliderTextColor, GUI.Fonts.SliderValue);
	//Render.FilledRect(SliderX - 8, SliderY, 8, SliderHeight, GUI.Colors.Background);
}
GUI.DrawHotkey = function(x, y, name, id){
	var adapt = Globals.Frametime() * GUI.AnimationSpeed;
	var Animation = (GUI._MenuAnimation[1] < 1) ? GUI._MenuAnimation[1] : GUI._MenuAnimation[4];
	var HotkeyTextColor = GUI.Colors.Animate(GUI.Colors.Background, GUI.Colors.Text, Animation, GUI._MenuAnimation[1] * 255);
	var HotkeyColorAnimated = GUI.Colors.Animate(GUI.Colors.Background, GUI.Colors.Checkbox, Animation, GUI._MenuAnimation[1] * 255);
	var HotkeyBorderColor = GUI.Colors.FadeColor(GUI.Colors.CheckboxBorder, GUI.Colors.ActiveElement, GUI._ElementAnimation[id]);
	var HotkeyBorderColorAnimated = GUI.Colors.Animate(GUI.Colors.Background, HotkeyBorderColor, Animation, GUI._MenuAnimation[1] * 255);
	var Hotkey = GUI._MenuElements[GUI.ActiveTab][GUI.ActiveSubtab][id];
	var HotkeyTextX = x + GUI.Scale(18);
	var HotkeyHeight = GUI.Scale(16);
	//var HotkeyMinX = GUI.ContainerWidth;
	//var HotkeyTextSize = Render.TextSizeCustom(name, GUI.Fonts.Menu);
	Render.StringCustom(HotkeyTextX, y + 14, 0, name, HotkeyTextColor, GUI.Fonts.Menu);

	var KeyName = Hotkey.KeyName || "none";

	if(Hotkey.Mode === "always") KeyName = "on";
	if(Hotkey.Mode === "none") KeyName = "none";

	if(GUI._HotkeyIsChanging === id){
		KeyName = "...";
		var PressedKeys = GUI.GetAllPressedKeys();
		if(!Input.IsKeyPressed(1)) GUI._ClickBlock = false;
		if(PressedKeys.length && !GUI._ClickBlock){
			var mode = (Hotkey.Mode === "none") ? Hotkey.DefaultMode : Hotkey.Mode;
			var pressedkey = PressedKeys[0][0];

			//genius code ikr
			if(pressedkey == 27) pressedkey = !+(mode = Hotkey.Mode = "none");
			else Hotkey.SetValue([mode, pressedkey]);
			GUI._HotkeyIsChanging = false;
			GUI._ClickBlock = false;
		}
	}
	if (Element.Key == 0) KeyName = "none";
	var HotkeyKeyNameTextSize = Render.TextSizeCustom(KeyName, GUI.Fonts.HotkeyKeyName);
	var HotkeyWidth = GUI.Scale(Clamp(HotkeyKeyNameTextSize[0] / (GUI._Scale / 1.1) + 2, 14, 100));
	var HotkeyX = HotkeyTextX + GUI.ContainerWidth - HotkeyWidth;

	var HotkeyMenuWidth = GUI.Scale(40);
	var HotkeyMenuElementsHeight = GUI.Scale(14);
	var HotkeyMenuElementsMargin = GUI.Scale(4);
	var HotkeyMenuElements = ["none", "hold", "toggle", "always"];
	var HotkeyMenuHeight = (HotkeyMenuElements.length * HotkeyMenuElementsHeight) + ((HotkeyMenuElements.length - 1) * HotkeyMenuElementsMargin) + 4;

	if (GUI._HotkeyMenuOpened === id || GUI._HotkeyIsChanging === id) GUI._ElementAnimation[id] += 0.06 * adapt;

	if (UI.IsCursorInBox(HotkeyX, y + GUI.Scale(16), HotkeyWidth, HotkeyHeight)){
		GUI._ElementAnimation[id] += 0.06 * adapt;
		if (!GUI._HotkeyIsChanging && GUI._HotkeyMenuOpened === false && GUI._SliderChanging === false && GUI._HotkeyMenuAnimation[0] === 0 && !GUI._ColorPickerOpened && GUI._DropdownAnimation[0] === 0){
			if(Input.IsKeyPressed(1) && Hotkey.Mode !== "always"){
				if(!GUI._ClickBlock){
					GUI._ClickBlock = true;
					GUI._HotkeyIsChanging = id;
				}
			}
			if(Input.IsKeyPressed(2)){
				if(!GUI._ClickBlock){
					GUI._ClickBlock = true;
					GUI._HotkeyMenuOpened = id;
					GUI._HotkeyMenuPos = CursorPos;
				}
			}
		}
	}
	else{
		GUI._ElementAnimation[id] -= 0.06 * adapt;
		if(!UI.IsCursorInBox(GUI._HotkeyMenuPos[0], GUI._HotkeyMenuPos[1], HotkeyMenuWidth, HotkeyMenuHeight) && GUI._HotkeyMenuOpened){
			if(Input.IsKeyPressed(1)){
				GUI._HotkeyMenuOpened = false;
				GUI._ClickBlock = false;
			}
		}
	}
	GUI._ElementAnimation[id] = Clamp(GUI._ElementAnimation[id], 0, 1);

	Render.SmoothRect(HotkeyX, y + 16, HotkeyWidth, HotkeyHeight, HotkeyBorderColorAnimated);
	Render.SmoothRect(HotkeyX + 1, y + 17, HotkeyWidth - 2, HotkeyHeight - 2, HotkeyColorAnimated);

	Render.StringCustom(HotkeyX + (HotkeyWidth / 2) - (HotkeyKeyNameTextSize[0] / 2) / 1.05, y + 16, 0, KeyName, HotkeyTextColor, GUI.Fonts.HotkeyKeyName);
}
GUI.DrawHotkeyMenu = function(){
	var adapt = Globals.Frametime() * GUI.AnimationSpeed;
	var HotkeyMenuWidth = GUI.Scale(40);
	var HotkeyMenuElementsHeight = GUI.Scale(14);
	var HotkeyMenuElementsMargin = GUI.Scale(4);
	var HotkeyMenuElements = ["none", "hold", "toggle", "always"];
	var HotkeyMenuHeight = (HotkeyMenuElements.length * HotkeyMenuElementsHeight) + ((HotkeyMenuElements.length - 1) * HotkeyMenuElementsMargin) + 4;

	if(GUI._HotkeyMenuOpened !== false){
		GUI._HotkeyMenuAnimation[0] += 0.06 * adapt;
		if(GUI._HotkeyMenuAnimation[0] >= 0.8) GUI._HotkeyMenuAnimation[1] += 0.06 * adapt;
	}
	else{
		GUI._HotkeyMenuAnimation[1] -= 0.06 * adapt;
		if(GUI._HotkeyMenuAnimation[1] <= 0.2) GUI._HotkeyMenuAnimation[0] -= 0.06 * adapt;
	}

	GUI._HotkeyMenuAnimation[0] = Clamp(GUI._HotkeyMenuAnimation[0], 0, 1);
	GUI._HotkeyMenuAnimation[1] = Clamp(GUI._HotkeyMenuAnimation[1], 0, 1);

	if(GUI._HotkeyMenuAnimation[0] === 0) return;

	var HotkeyMenuAnimation = (GUI._MenuAnimation[1] < 1) ? GUI._MenuAnimation[1] : GUI._HotkeyMenuAnimation[0];
	var HotkeyMenuTextAnimation = (GUI._MenuAnimation[1] < 1) ? GUI._MenuAnimation[1] : GUI._HotkeyMenuAnimation[1];
	var HotkeyMenuHeightAnimated = Easing(0, HotkeyMenuHeight, HotkeyMenuAnimation);
	var HotkeyMenuColorAnimated = GUI.Colors.GetColor(GUI.Colors.Checkbox, Lerp(0, 255, HotkeyMenuAnimation));
	var HotkeyMenuBorderColor = GUI.Colors.GetColor(GUI.Colors.ActiveElement, Lerp(0, 255, HotkeyMenuTextAnimation));
	var Hotkey = GUI._MenuElements[GUI.ActiveTab][GUI.ActiveSubtab][GUI._HotkeyMenuOpened];
	Render.SmoothRect(GUI._HotkeyMenuPos[0] - 1, GUI._HotkeyMenuPos[1] - 1, HotkeyMenuWidth + 2, HotkeyMenuHeightAnimated + 2, HotkeyMenuBorderColor);
	Render.SmoothRect(GUI._HotkeyMenuPos[0], GUI._HotkeyMenuPos[1], HotkeyMenuWidth, HotkeyMenuHeightAnimated, HotkeyMenuColorAnimated);
	Render.Line(GUI._HotkeyMenuPos[0] - 1, GUI._HotkeyMenuPos[1] + 2, GUI._HotkeyMenuPos[0] - 1, GUI._HotkeyMenuPos[1] + HotkeyMenuHeightAnimated - 2, HotkeyMenuBorderColor);
	for(Index in HotkeyMenuElements){
		var HotkeyMenuTextColorAnimated = GUI.Colors.GetColor(GUI.Colors.FadeColor(GUI.Colors.HotkeyMenuText, GUI.Colors.HotkeyMenuTextActive, GUI._HotkeyMenuAnimation[2][Index]), Lerp(0, 255, HotkeyMenuTextAnimation));
		var MenuElement = HotkeyMenuElements[Index];
		var MenuElementX = GUI._HotkeyMenuPos[0] + 3;
		var IsNotLast = (Index !== HotkeyMenuElements.length - 1);
		var IsActive = (GUI._HotkeyMenuOpened !== false) ? (GUI._MenuElements[GUI.ActiveTab][GUI.ActiveSubtab][GUI._HotkeyMenuOpened].Mode === MenuElement) : false;
		var MenuElementY = GUI._HotkeyMenuPos[1] + ((HotkeyMenuElementsHeight + ((IsNotLast) ? HotkeyMenuElementsMargin : 0)) * Index);
		var MenuElementHeight = HotkeyMenuElementsHeight + ((IsNotLast) ? HotkeyMenuElementsMargin : 0);
		Render.StringCustom(MenuElementX, MenuElementY, 0, MenuElement, HotkeyMenuTextColorAnimated, GUI.Fonts.HotkeyKeyName);
		if(IsActive) GUI._HotkeyMenuAnimation[2][Index] += 0.06 * adapt;
		if(UI.IsCursorInBox(MenuElementX, MenuElementY, HotkeyMenuWidth, MenuElementHeight)){
				if(Input.IsKeyPressed(1) && GUI._HotkeyMenuOpened !== false){
					Hotkey.SetValue([MenuElement, Hotkey.Key]);
					GUI._HotkeyMenuOpened = false;
					GUI._ClickBlock = true;
				}
				else{
					GUI._ClickBlock = false;
				}
				GUI._HotkeyMenuAnimation[2][Index] += 0.06 * adapt;
			}
			else if(!IsActive) GUI._HotkeyMenuAnimation[2][Index] -= 0.06 * adapt;
		
		GUI._HotkeyMenuAnimation[2][Index] = Clamp(GUI._HotkeyMenuAnimation[2][Index], 0, 1);
	}
}
GUI.DrawColor = function(x, y, name, id, isAdditional){
	var ColorBoxWidth = GUI.Scale(14);
	var ColorBoxHeight = ColorBoxWidth;
	var Animation = (GUI._MenuAnimation[1] < 1) ? GUI._MenuAnimation[1] : GUI._MenuAnimation[4];
	var ColorBoxColor = GUI._MenuElements[GUI.ActiveTab][GUI.ActiveSubtab][id].Color;
	var ColorBoxColorAnimated = GUI.Colors.Animate(GUI.Colors.Background, ColorBoxColor, Animation, Clamp(ColorBoxColor[3] - (255 - GUI._MenuAnimation[1] * 255), 0, 255));
	var ColorBoxTextColor = GUI.Colors.Animate(GUI.Colors.Background, GUI.Colors.Text, Animation, GUI._MenuAnimation[1] * 255);
	var ColorBoxTextSize = Render.TextSizeCustom(name, GUI.Fonts.Menu);
	var ColorBoxTextX = x + GUI.Scale(18);
	var ColorBoxY = y + GUI.Scale(18);
	if(!isAdditional){
		Render.StringCustom(ColorBoxTextX, y + 14, 0, name, ColorBoxTextColor, GUI.Fonts.Menu);
		var ColorBoxTextX2 = x + 18;
		var ColorBoxX = Clamp(ColorBoxTextX2 + ColorBoxTextSize[0] + 8, ColorBoxTextX2 + GUI.ContainerWidth - ColorBoxWidth, ColorBoxTextX2 + GUI.Scale(GUI.Width));
	}
	else{
		var ColorBoxX = x;
	}

	if(ColorBoxColor[3] !== 255){
		Render.FilledRect(ColorBoxX, ColorBoxY, ColorBoxWidth / 2, ColorBoxHeight / 2, [255, 255, 255, Animation * 255]);
		Render.FilledRect(ColorBoxX + ColorBoxWidth / 2, ColorBoxY, ColorBoxWidth / 2, ColorBoxHeight / 2, [155, 155, 155, Animation * 255]);
		Render.FilledRect(ColorBoxX, ColorBoxY + ColorBoxHeight / 2, ColorBoxWidth / 2, ColorBoxHeight / 2, [155, 155, 155, Animation * 255]);
		Render.FilledRect(ColorBoxX + ColorBoxWidth / 2, ColorBoxY + ColorBoxHeight / 2, ColorBoxWidth / 2, ColorBoxHeight / 2, [255, 255, 255, Animation * 255]);
	}
	

	Render.FilledRect(ColorBoxX, ColorBoxY, ColorBoxWidth, ColorBoxHeight, ColorBoxColorAnimated);

	//add some smoothness because it looks cool :)
	var BackgroundColor = GUI.Colors.AnimateBackground(GUI.Colors.Background);
	Render.FilledRect(ColorBoxX, ColorBoxY, 1, 1, BackgroundColor);
	Render.FilledRect(ColorBoxX + ColorBoxWidth - 1, ColorBoxY, 1, 1, BackgroundColor);
	Render.FilledRect(ColorBoxX, ColorBoxY + ColorBoxHeight - 1, 1, 1, BackgroundColor);
	Render.FilledRect(ColorBoxX + ColorBoxWidth - 1, ColorBoxY + ColorBoxHeight - 1, 1, 1, BackgroundColor);

	var ColorPickerMargin = 5;
	var ColorPickerWidth = (ColorPickerMargin * 2) + 255;
	var ColorPickerHeight = (ColorPickerMargin * 9) + 255 + 30 + 30;
	var Activate = (GUI._ColorPickerPos[0] >= ColorBoxX && GUI._ColorPickerPos[0] <= ColorBoxX + ColorBoxWidth && GUI._ColorPickerPos[1] >= ColorBoxY && GUI._ColorPickerPos[1] <= ColorBoxY + ColorBoxHeight);

	var ColorMenuWidth = 40;
	var ColorMenuElementsHeight = 14;
	var ColorMenuElementsMargin = 4;
	var ColorMenuElements = ["copy", "paste"];
	var ColorMenuHeight = (ColorMenuElements.length * ColorMenuElementsHeight) + ((ColorMenuElements.length - 1) * ColorMenuElementsMargin) + 4;

	if (UI.IsCursorInBox(ColorBoxX, ColorBoxY, ColorBoxWidth, ColorBoxHeight)){
		if (!GUI._HotkeyIsChanging && GUI._HotkeyMenuOpened === false && GUI._ColorMenuOpened === false && GUI._SliderChanging === false && GUI._HotkeyMenuAnimation[0] === 0 && GUI._ColorPickerAnimation[0] === 0 && GUI._ColorMenuAnimation[0] === 0 && GUI._DropdownAnimation[0] === 0){
			if(Input.IsKeyPressed(1)){
				if(!GUI._ClickBlock){
					GUI._ClickBlock = true;
					GUI._ColorPickerPos = CursorPos;
					GUI._ColorPickerOpened = id;
					GUI._ColorPickerActive = id;
				}
			}
			if (Input.IsKeyPressed(2)) {
				if (!GUI._ClickBlock) {
					GUI._ClickBlock = true;
					GUI._ColorMenuOpened = id;
					GUI._ColorMenuPos = CursorPos;
				}
			}
		}
		return;
	}
	else if(!UI.IsCursorInBox(GUI._ColorPickerPos[0], GUI._ColorPickerPos[1], ColorPickerWidth + 1, ColorPickerHeight + 1) && Activate && GUI._ColorPickerOpened && !GUI._ColorPickerIsChanging){
		if(Input.IsKeyPressed(1)){
			GUI._ColorPickerOpened = false;
			GUI._ClickBlock = false;
		}
	}
	else if (!UI.IsCursorInBox(GUI._ColorMenuPos[0], GUI._ColorMenuPos[1], ColorMenuWidth, ColorMenuHeight) && GUI._ColorMenuOpened) {
		if (Input.IsKeyPressed(1)) {
			GUI._ColorMenuOpened = false;
			GUI._ClickBlock = false;
		}
	}
}
GUI.DrawColorPicker = function(){
	var ColorPickerMargin = 5;
	var ColorPickerWidth = (ColorPickerMargin * 2) + 255;
	var ColorPickerHeight = (ColorPickerMargin * 9) + 255 + 30 + 30;
	var adapt = Globals.Frametime() * GUI.AnimationSpeed;

	if(GUI._ColorPickerOpened !== false){
		GUI._ColorPickerAnimation[0] += 0.07 * adapt;
		if(GUI._ColorPickerAnimation[0] >= 0.95) GUI._ColorPickerAnimation[1] += 0.07 * adapt;
	}
	else{
		GUI._ColorPickerAnimation[1] -= 0.07 * adapt;
		if(GUI._ColorPickerAnimation[1] <= 0.05) GUI._ColorPickerAnimation[0] -= 0.07 * adapt;
	}	

	GUI._ColorPickerAnimation[0] = Clamp(GUI._ColorPickerAnimation[0], 0, 1);
	GUI._ColorPickerAnimation[1] = Clamp(GUI._ColorPickerAnimation[1], 0, 1);

	if(GUI._ColorPickerAnimation[0] === 0) return;
	if(!(GUI._ColorPickerActive in GUI._MenuElements[GUI.ActiveTab][GUI.ActiveSubtab])) return;

	var ColorPickerAnimation = (GUI._MenuAnimation[1] < 1) ? GUI._MenuAnimation[1] : GUI._ColorPickerAnimation[0];
	var ColorPickerSecondaryAnimation = (GUI._MenuAnimation[1] < 1) ? GUI._MenuAnimation[1] : GUI._ColorPickerAnimation[1];
	var ColorPickerColorAnimated = GUI.Colors.GetColor(GUI.Colors.Checkbox, Lerp(0, 255, ColorPickerAnimation));
	var ColorPickerHeightAnimated = Easing(0, ColorPickerHeight, ColorPickerAnimation);
	var ColorPickerX = GUI._ColorPickerPos[0] + ColorPickerMargin;
	var ColorPickerY = GUI._ColorPickerPos[1] + ColorPickerMargin;
	Render.SmoothRect(GUI._ColorPickerPos[0], GUI._ColorPickerPos[1], ColorPickerWidth, ColorPickerHeightAnimated, ColorPickerColorAnimated);
	var Element = GUI._MenuElements[GUI.ActiveTab][GUI.ActiveSubtab][GUI._ColorPickerActive];
	var Color = Element.ColorHSV;
	var ColorRGB = Element.Color;
	for(v = 0; v < 255; v++){
		var opacity = Clamp(ColorPickerSecondaryAnimation * 255 * 2 - v, 0, 255);
		Render.GradientRect(ColorPickerX, ColorPickerY + v, 255, 1, 1, GUI.Colors.GetColor(GUI.Colors.HSVToRGB(Color[0], 1, 1 - (v / 255)), opacity), GUI.Colors.GetColor(GUI.Colors.HSVToRGB(Color[0], 0, 1 - (v / 255)), opacity));
	}

	var HueSliderY = GUI._ColorPickerPos[1] + ColorPickerMargin * 4 + 255;
	var SliderColor = [255, 255, 255, ColorPickerSecondaryAnimation * 255];
	for(h = 0; h < 3; h++){
		Render.GradientRect(ColorPickerX + (h * ((1 / 3) * 255)), HueSliderY, 255 * (1 / 3), 30, 1, GUI.Colors.GetColor(GUI.Colors.HSVToRGB(h * (1 / 3), 1, 1), ColorPickerSecondaryAnimation * 255), GUI.Colors.GetColor(GUI.Colors.HSVToRGB((h + 1) * (1 / 3), 1, 1), ColorPickerSecondaryAnimation * 255));
	}
	
	Render.SmoothRect(ColorPickerX + (Color[0] * 255) - 4, HueSliderY - 1, 6, 32, SliderColor);

	var AlphaSliderY = HueSliderY + 30 + ColorPickerMargin * 3;

	Render.GradientRect(ColorPickerX, AlphaSliderY, 255, 30, 1, [ColorRGB[0], ColorRGB[1], ColorRGB[2], 7], GUI.Colors.GetColor(ColorRGB, ColorPickerSecondaryAnimation * 255));

	Render.SmoothRect(ColorPickerX + Color[3] - 4, AlphaSliderY - 1, 6, 32, SliderColor);

	var CircleColor = [255, 255, 255, ColorPickerSecondaryAnimation * 255];

	Render.Circle(ColorPickerX + ((1 - Color[1]) * 255), ColorPickerY + ((1 - Color[2]) * 255), 4, CircleColor);

	if((UI.IsCursorInBox(ColorPickerX - 1, ColorPickerY - 1, 255 + 2, 255 + 2) && !GUI._ColorPickerIsChanging) || GUI._ColorPickerIsChanging === "color"){
		if(Input.IsKeyPressed(1)){
			Color[1] = Clamp(1 - ((CursorPos[0] - ColorPickerX) / 255), 0, 1);
			Color[2] = Clamp(1 - ((CursorPos[1] - ColorPickerY) / 255), 0, 1);
			Element.SetColor([GUI.Colors.HSVToRGB(Color), Color]);
			GUI._ColorPickerIsChanging = "color";
		}
	}
	else if((UI.IsCursorInBox(ColorPickerX - 1, HueSliderY, 255 + 2, 30) && !GUI._ColorPickerIsChanging) || GUI._ColorPickerIsChanging === "hue"){
		if(Input.IsKeyPressed(1)){
			Color[0] = Clamp((CursorPos[0] - ColorPickerX) / 255, 0, 1);
			Element.SetColor([GUI.Colors.HSVToRGB(Color), Color]);
			GUI._ColorPickerIsChanging = "hue";
		}
	}
	else if((UI.IsCursorInBox(ColorPickerX - 1, AlphaSliderY, 255 + 2, 30) && !GUI._ColorPickerIsChanging) || GUI._ColorPickerIsChanging === "alpha"){
		if(Input.IsKeyPressed(1)){
			Color[3] = Clamp((CursorPos[0] - ColorPickerX), 0, 255);
			Element.SetColor([GUI.Colors.HSVToRGB(Color), Color]);
			GUI._ColorPickerIsChanging = "alpha";
		}
	}

	if(!Input.IsKeyPressed(1)){
		GUI._ColorPickerIsChanging = false;
	}
}
GUI.DrawColorMenu = function(){
	var adapt = Globals.Frametime() * GUI.AnimationSpeed;
	var ColorMenuWidth = GUI.Scale(40);
	var ColorMenuElementsHeight = GUI.Scale(14);
	var ColorMenuElementsMargin = GUI.Scale(4);
	var ColorMenuElements = ["copy", "paste"];
	var ColorMenuHeight = (ColorMenuElements.length * ColorMenuElementsHeight) + ((ColorMenuElements.length - 1) * ColorMenuElementsMargin) + 4;

	if (GUI._ColorMenuOpened !== false) {
		GUI._ColorMenuAnimation[0] += 0.06 * adapt;
		if (GUI._ColorMenuAnimation[0] >= 0.8) GUI._ColorMenuAnimation[1] += 0.06 * adapt;
	}
	else {
		GUI._ColorMenuAnimation[1] -= 0.06 * adapt;
		if (GUI._ColorMenuAnimation[1] <= 0.2) GUI._ColorMenuAnimation[0] -= 0.06 * adapt;
	}

	GUI._ColorMenuAnimation[0] = Clamp(GUI._ColorMenuAnimation[0], 0, 1);
	GUI._ColorMenuAnimation[1] = Clamp(GUI._ColorMenuAnimation[1], 0, 1);

	if (GUI._ColorMenuAnimation[0] === 0) return;

	var ColorMenuAnimation = (GUI._MenuAnimation[1] < 1) ? GUI._MenuAnimation[1] : GUI._ColorMenuAnimation[0];
	var ColorMenuTextAnimation = (GUI._MenuAnimation[1] < 1) ? GUI._MenuAnimation[1] : GUI._ColorMenuAnimation[1];
	var ColorMenuHeightAnimated = Easing(0, ColorMenuHeight, ColorMenuAnimation);
	var ColorMenuColorAnimated = GUI.Colors.GetColor(GUI.Colors.Checkbox, Lerp(0, 255, ColorMenuAnimation));
	var ColorMenuBorderColor = GUI.Colors.GetColor(GUI.Colors.ActiveElement, Lerp(0, 255, ColorMenuTextAnimation));
	
	Render.SmoothRect(GUI._ColorMenuPos[0] - 1, GUI._ColorMenuPos[1] - 1, ColorMenuWidth + 2, ColorMenuHeightAnimated + 2, ColorMenuBorderColor);
	Render.SmoothRect(GUI._ColorMenuPos[0], GUI._ColorMenuPos[1], ColorMenuWidth, ColorMenuHeightAnimated, ColorMenuColorAnimated);

	for (Index in ColorMenuElements) {
		var ColorMenuTextColorAnimated = GUI.Colors.GetColor(GUI.Colors.FadeColor(GUI.Colors.HotkeyMenuText, GUI.Colors.HotkeyMenuTextActive, GUI._ColorMenuAnimation[2][Index]), Lerp(0, 255, ColorMenuTextAnimation));
		var MenuElement = ColorMenuElements[Index];
		var MenuElementX = GUI._ColorMenuPos[0] + 3;
		var IsNotLast = (Index !== ColorMenuElements.length - 1);
		var MenuElementY = GUI._ColorMenuPos[1] + ((ColorMenuElementsHeight + ((IsNotLast) ? ColorMenuElementsMargin : 0)) * Index);
		var MenuElementHeight = ColorMenuElementsHeight + ((IsNotLast) ? ColorMenuElementsMargin : 0);
		Render.StringCustom(MenuElementX, MenuElementY, 0, MenuElement, ColorMenuTextColorAnimated, GUI.Fonts.HotkeyKeyName);
		if (UI.IsCursorInBox(MenuElementX, MenuElementY, ColorMenuWidth, MenuElementHeight)) {
			if (Input.IsKeyPressed(1) && GUI._ColorMenuOpened !== false) {
				if(Index == 0){
					var Element = GUI._MenuElements[GUI.ActiveTab][GUI.ActiveSubtab][GUI._ColorMenuOpened];
					GUI._CopiedColor = Element.Color;
				} else if (Index == 1) {
					if (GUI._CopiedColor !== null) {
						GUI._MenuElements[GUI.ActiveTab][GUI.ActiveSubtab][GUI._ColorMenuOpened].SetColor(GUI._CopiedColor);
					}
				}
				GUI._ColorMenuOpened = false;
				GUI._ClickBlock = true;
			}
			else {
				GUI._ClickBlock = false;
			}
			GUI._ColorMenuAnimation[2][Index] += 0.06 * adapt;
		}
		else {
			GUI._ColorMenuAnimation[2][Index] -= 0.06 * adapt;
		}

		GUI._ColorMenuAnimation[2][Index] = Clamp(GUI._ColorMenuAnimation[2][Index], 0, 1);
	}
}
GUI.DrawDropdown = function (x, y, name, id, PreviousElement){
	var adapt = Globals.Frametime() * GUI.AnimationSpeed;
	var ElementsWidths = [GUI.Scale(100)];
	var Element = GUI._MenuElements[GUI.ActiveTab][GUI.ActiveSubtab][id];
	var IsMultiDropdown = Element.Type == "multidropdown";
	var DropdownElements = Element.Elements;
	var DropdownHeight = GUI.Scale(26);
	for (DropdownElement in DropdownElements){
		var Text = DropdownElements[DropdownElement];
		ElementsWidths.push(Render.TextSizeCustom(Text, GUI.Fonts.Menu)[0]);
	}
	var DropdownWidth = Math.max.apply(null, ElementsWidths) + 20;
	var Animation = (GUI._MenuAnimation[1] < 1) ? GUI._MenuAnimation[1] : GUI._MenuAnimation[4];
	var DropdownColor = GUI.Colors.Checkbox;
	var DropdownColorAnimated = GUI.Colors.Animate(GUI.Colors.Background, DropdownColor, Animation, GUI._MenuAnimation[1] * 255);
	var DropdownBorderColor = GUI.Colors.FadeColor(GUI.Colors.CheckboxBorder, GUI.Colors.ActiveElement, GUI._ElementAnimation[id]);
	var DropdownBorderColorAnimated = GUI.Colors.Animate(GUI.Colors.Background, DropdownBorderColor, Animation, GUI._MenuAnimation[1] * 255);
	var DropdownTextColor = GUI.Colors.Animate(GUI.Colors.Background, GUI.Colors.Text, Animation, GUI._MenuAnimation[1] * 255);
	var DropdownY = y + GUI.Scale(32);
	var PreviousIsDropdown = PreviousElement ? (PreviousElement.Type === "dropdown" || PreviousElement.Type === "multidropdown") : false;
	if (!(Element.Flags & GUI.SAME_LINE) || (Element.Flags & GUI.SAME_LINE && PreviousIsDropdown)){
		Render.StringCustom(x, y + GUI.Scale(12), 0, name, DropdownTextColor, GUI.Fonts.Menu);
	}
	Render.SmoothRect(x, DropdownY, DropdownWidth, DropdownHeight, DropdownBorderColorAnimated);
	Render.SmoothRect(x + 1, DropdownY + 1, DropdownWidth - 2, DropdownHeight - 2, DropdownColorAnimated);
	var Val = DropdownElements[Element.Value];
	if(IsMultiDropdown){
		var elements = DropdownElements.filter(function(e, i){return Element.Value & (1 << i)});
		var OriginalVal = elements.join(", ");
		Val = OriginalVal.slice(0, Math.floor((DropdownWidth / GUI.Scale(6.33)) - 5));
		if (OriginalVal !== Val) Val += "...";
		Val = Val || "None";
	}
	Render.StringCustom(x + 5, DropdownY + 2, 0, Val, DropdownTextColor, GUI.Fonts.Menu);
	Render.Polygon([[x + DropdownWidth - 5 - 6, DropdownY + DropdownHeight / 2 - 2], [x + DropdownWidth - 5 + 1, DropdownY + DropdownHeight / 2 - 2], [x + DropdownWidth - 5 - 3, DropdownY + DropdownHeight / 2 + 2]], DropdownBorderColorAnimated);
	var OtherElementsActive = !GUI._SliderChanging && !GUI._ColorPickerOpened && !GUI._ColorMenuOpened && !GUI._HotkeyMenuOpened && GUI._HotkeyMenuAnimation[0] === 0 && GUI._ColorMenuAnimation[0] === 0;
	if (UI.IsCursorInBox(x, DropdownY, DropdownWidth, DropdownHeight) && OtherElementsActive && !GUI._DropdownOpened && GUI._DropdownAnimation[0] === 0){
		GUI._ElementAnimation[id] += 0.06 * adapt;
		if (Input.IsKeyPressed(1)) {
			if (!GUI._ClickBlock) {
				GUI._ClickBlock = true;
				GUI._DropdownPos = [x, DropdownY];
				GUI._DropdownOpened = id;
				GUI._DropdownActive = id;
				var arr = []; for (DropdownElement in DropdownElements) arr.push(0);
				GUI._DropdownAnimation = [0, 0, arr];
				GUI._DropdownWidth = DropdownWidth;
			}
		}
	}
	else{
		GUI._ElementAnimation[id] -= 0.06 * adapt;
		if (!UI.IsCursorInBox(GUI._DropdownPos[0], GUI._DropdownPos[1], DropdownWidth, Math.ceil(DropdownHeight * DropdownElements.length)) && GUI._DropdownOpened && !GUI._DropdownSelectingElement){
			if (Input.IsKeyPressed(1)) {
				GUI._DropdownOpened = false;
				GUI._ClickBlock = false;
			}
		}
	}
	GUI._ElementAnimation[id] = Clamp(GUI._ElementAnimation[id], 0, 1);
}
GUI.DrawDropdownSelector = function(){
	var adapt = Globals.Frametime() * GUI.AnimationSpeed;
	if (GUI._DropdownOpened !== false) {
		GUI._DropdownAnimation[0] += 0.06 * adapt;
		if (GUI._DropdownAnimation[0] >= 0.8) GUI._DropdownAnimation[1] += 0.06 * adapt;
	}
	else {
		GUI._DropdownAnimation[1] -= 0.06 * adapt;
		if (GUI._DropdownAnimation[1] <= 0.2) GUI._DropdownAnimation[0] -= 0.06 * adapt;
	}

	GUI._DropdownAnimation[0] = Clamp(GUI._DropdownAnimation[0], 0, 1);
	GUI._DropdownAnimation[1] = Clamp(GUI._DropdownAnimation[1], 0, 1);

	if (GUI._DropdownAnimation[0] === 0) return;
	if (!(GUI._DropdownActive in GUI._MenuElements[GUI.ActiveTab][GUI.ActiveSubtab])) return;

	if (GUI._ClickBlock && !Input.IsKeyPressed(1)) GUI._ClickBlock = false;


	var Element = GUI._MenuElements[GUI.ActiveTab][GUI.ActiveSubtab][GUI._DropdownActive];
	var DropdownElements = Element.Elements;
	var ElementHeight = GUI.Scale(26);
	var ElementWidth = GUI._DropdownWidth;
	var DropdownHeight = ElementHeight * DropdownElements.length;
	var DropdownAnimation = (GUI._MenuAnimation[1] < 1) ? GUI._MenuAnimation[1] : GUI._DropdownAnimation[0];
	var DropdownTextAnimation = (GUI._MenuAnimation[1] < 1) ? GUI._MenuAnimation[1] : GUI._DropdownAnimation[1];
	var DropdownHeightAnimated = Easing(0, DropdownHeight, DropdownAnimation);
	var DropdownColorAnimated = GUI.Colors.GetColor(GUI.Colors.Checkbox, Lerp(0, 255, DropdownAnimation));
	var DropdownBorderColor = GUI.Colors.GetColor(GUI.Colors.ActiveElement, Lerp(0, 255, DropdownTextAnimation));
	var IsMultiDropdown = Element.Type == "multidropdown";

	Render.SmoothRect(GUI._DropdownPos[0], GUI._DropdownPos[1], ElementWidth, DropdownHeightAnimated, DropdownBorderColor);
	Render.SmoothRect(GUI._DropdownPos[0] + 1, GUI._DropdownPos[1] + 1, ElementWidth - 2, DropdownHeightAnimated - 2, DropdownColorAnimated);
	Render.Line(GUI._DropdownPos[0], GUI._DropdownPos[1] + 2, GUI._DropdownPos[0], GUI._DropdownPos[1] + DropdownHeightAnimated - 2, DropdownBorderColor);

	GUI._DropdownSelectingElement = false;

	var ActiveColor = GUI.Colors.FadeColor(GUI.Colors.HotkeyMenuTextActive, GUI.Colors.ActiveElement, 0.33);
	for(Index in DropdownElements){
		var ElementY = GUI._DropdownPos[1] + (ElementHeight * Index);
		var IsActive = (!IsMultiDropdown) ? (Element.Value == Index) : (Element.Value & (1 << Index));
		if (IsActive) GUI._DropdownAnimation[2][Index] += 0.08 * adapt;
		var DropdownTextColor = GUI.Colors.GetColor(GUI.Colors.FadeColor(GUI.Colors.HotkeyMenuText, IsActive ? ActiveColor : GUI.Colors.HotkeyMenuTextActive, GUI._DropdownAnimation[2][Index]), Lerp(0, 255, DropdownTextAnimation));

		Render.StringCustom(GUI._DropdownPos[0] + GUI.Scale(5), ElementY + GUI.Scale(2), 0, DropdownElements[Index], DropdownTextColor, GUI.Fonts.Menu);
		if (UI.IsCursorInBox(GUI._DropdownPos[0] + 1, ElementY, ElementWidth, ElementHeight) && GUI._DropdownAnimation[0] === 1 && GUI._DropdownOpened){
			GUI._DropdownSelectingElement = true;
			GUI._DropdownAnimation[2][Index] += 0.066 * adapt;
			if (Input.IsKeyPressed(1) && !GUI._ClickBlock){
				if(!IsMultiDropdown){
					Element.SetValue(Index);
					GUI._DropdownOpened = false;
					GUI._DropdownSelectingElement = false;
				} 
				else{
					Element.SetValue(IsActive ? (Element.Value & ~(1 << Index)) : (Element.Value | (1 << Index)));
					GUI._ClickBlock = true;
				}
			}
		}
		else{
			GUI._DropdownAnimation[2][Index] -= 0.066 * adapt;
		}
		GUI._DropdownAnimation[2][Index] = Clamp(GUI._DropdownAnimation[2][Index], 0, 1);
	}

	if(!Input.IsKeyPressed(1)){
		GUI._ClickBlock = false;
	}
}
GUI.DrawLabel = function(x, y, name){
	var Animation = (GUI._MenuAnimation[1] < 1) ? GUI._MenuAnimation[1] : GUI._MenuAnimation[4];
	var TextColor = GUI.Colors.Animate(GUI.Colors.Background, GUI.Colors.Text, Animation, GUI._MenuAnimation[1] * 255);
	Render.StringCustom(x, y + GUI.Scale(12) + 2.6, 0, name, TextColor, GUI.Fonts.Menu);
}
GUI.ProcessDrag = function(){
	if(!UI.IsMenuOpen()) return;
	var HeaderLogoSize = Render.TextSizeCustom(GUI.LogoText, GUI.Fonts.HeaderLogo);
	if (!Input.IsKeyPressed(0x01) || GUI.IsAnimating() || GUI._AnimatingElements || keybind_list_is_moving || spectator_list_is_moving){
		GUI._MenuIsMoving = false;
		GUI._OldCursor = CursorPos;
		return;
	}

	if ((UI.IsCursorInBox(GUI.X + (6 + HeaderLogoSize[0]) * +(GUI.ActiveTab !== ""), GUI.Y, GUI.Scale(GUI.Width) - 6 - (HeaderLogoSize[0] * +(GUI.ActiveTab !== "")), 30) && GUI._SliderChanging == false && !GUI._ColorPickerOpened && !GUI._HotkeyMenuOpened && GUI._DropdownAnimation[0] == 0) || GUI._MenuIsMoving){
		GUI._MenuIsMoving = true;
		GUI.X = CursorPos[0] - GUI._OldCursor[0] + GUI.X;
		GUI.Y = CursorPos[1] - GUI._OldCursor[1] + GUI.Y;
		GUI._OldCursor = CursorPos;
	}

	GUI.X = Clamp(GUI.X, -GUI.Scale(GUI.Width) + 5, ScreenSize[0] - 5);
	GUI.Y = Clamp(GUI.Y, -28, ScreenSize[1] - 5);
}
GUI.ProcessAnimations = function(){
	var adapt = Globals.Frametime() * GUI.AnimationSpeed;
	if(UI.IsMenuOpen()){
		if(GUI._MenuAnimation[0] > 0.8) GUI._MenuAnimation[1] += 0.07 * adapt;
		GUI._MenuAnimation[0] += ((GUI._MenuAnimation[0] < 0.75) ? 0.04 : 0.02) * adapt;
	}
	else{
		if(GUI._MenuAnimation[1] < 0.2) GUI._MenuAnimation[0] -= ((GUI._MenuAnimation[0] < 0.2) ? 0.05 : 0.07) * adapt;
		GUI._MenuAnimation[1] -= 0.07 * adapt;
	}
	GUI._MenuAnimation[0] = Clamp(GUI._MenuAnimation[0], 0, 1);
	GUI._MenuAnimation[1] = Clamp(GUI._MenuAnimation[1], 0, 1);
	if(GUI._MenuAnimation[0] === 0) return false;
	return true;
}
GUI.IsAnimating = function(){
	function check(variable){
		return (variable > 0 && variable < 1);
	}
	return (GUI._AnimatingBack || check(GUI._MenuAnimation[0]) ||
		check(GUI._MenuAnimation[1]) || check(GUI._MenuAnimation[2]) ||
		check(GUI._MenuAnimation[3]));
}
GUI.ResetHotkeyOverride = function(){
	for (hotkey in GUI.OverridenHotkeys){
		hotkey = GUI.OverridenHotkeys[hotkey];
		GUI._MenuElements[hotkey[0]][hotkey[1]][hotkey[2]].State = null;
	}
	GUI.OverridenHotkeys = [];
}
const keys = {
	"1": "mouse 1",
	"2": "mouse 2",
	"4": "mouse 3",
	"5": "mouse 4",
	"6": "mouse 5",
	"8": "backspace",
	"9": "tab",
	"13": "enter",
	"16": "shift",
	"17": "ctrl",
	"18": "alt",
	"19": "break",
	"20": "caps",
	"27": "esc",
	"32": "space",
	"33": "pg up",
	"34": "pg down",
	"35": "end",
	"36": "home",
	"37": "left arr",
	"38": "up arr",
	"39": "right arr",
	"40": "down arr",
	"45": "insert",
	"46": "delete",
	"48": "0",
	"49": "1",
	"50": "2",
	"51": "3",
	"52": "4",
	"53": "5",
	"54": "6",
	"55": "7",
	"56": "8",
	"57": "9",
	"65": "a",
	"66": "b",
	"67": "c",
	"68": "d",
	"69": "e",
	"70": "f",
	"71": "g",
	"72": "h",
	"73": "i",
	"74": "j",
	"75": "k",
	"76": "l",
	"77": "m",
	"78": "n",
	"79": "o",
	"80": "p",
	"81": "q",
	"82": "r",
	"83": "s",
	"84": "t",
	"85": "u",
	"86": "v",
	"87": "w",
	"88": "x",
	"89": "y",
	"90": "z",
	"93": "select",
	"96": "n0",
	"97": "n1",
	"98": "n2",
	"99": "n3",
	"100": "n4",
	"101": "n5",
	"102": "n6",
	"103": "n7",
	"104": "n8",
	"105": "n9",
	"106": "n. *",
	"107": "n. +",
	"109": "n. -",
	"110": "n. .",
	"111": "n. /",
	"112": "f1",
	"113": "f2",
	"114": "f3",
	"115": "f4",
	"116": "f5",
	"117": "f6",
	"118": "f7",
	"119": "f8",
	"120": "f9",
	"121": "f10",
	"122": "f11",
	"123": "f12",
	"144": "num lock",
	"145": "scroll lock",
	"192": "`",
	"220": "\\",
};
GUI.GetAllPressedKeys = function(){
	var pressed = [];
	for(key in keys){
		if(Input.IsKeyPressed(+key)){
			if(Array.isArray(keys[key])){
				pressed.push(keys[key]);
				continue;
			}
			pressed.push([+key, keys[key]]);
		}
	}
	return pressed;
}
var local = Entity.GetLocalPlayer(), isAlive;
var CursorPos = Input.GetCursorPosition();
var ScreenSize = Render.GetScreenSize();
GUI.CacheVariables = function(){
	ScreenSize = Render.GetScreenSize();
	CursorPos = Input.GetCursorPosition();
	local = Entity.GetLocalPlayer();
	isAlive = Entity.IsAlive(local);
}
GUI.Performance = function(fn){
	var time = performance.now();
	var args = [].concat(arguments).shift();
	fn.apply(null, args);
	Render.String(2, 2, 0, (performance.now() - time).toFixed(3) + "", [255, 255, 255, 255]);
}
GUI.CreateMove = function(){
}
GUI.AddTab = function(name, icon){
	GUI._MenuElements[name] = {};
	GUI._TabIcons[name] = icon;
	GUI._TabAnimations[name] = [0, 0];
}
GUI.AddSubtab = function(name){
	var tabs = Object.keys(GUI._MenuElements);
	GUI._MenuElements[tabs[tabs.length - 1]][name] = [];
	GUI._SubtabAnimations[name] = [0];
}
GUI.Element = function(name, type){
	var tabs = Object.keys(GUI._MenuElements);
	this.Name = name;
	this.Tab = tabs[tabs.length - 1];
	var subtabs = Object.keys(GUI._MenuElements[this.Tab]);
	this.Subtab = subtabs[subtabs.length - 1];
	this.Id = this.Name + this.Tab[0] + this.Subtab[0];
	this.Type = type;
	this.Flags = 0;
	if(type !== "label") GUI._ElementAnimation[this.Id] = 0;
}
GUI.Element.prototype.GetValue = function(){
	return GUI.GetValue(this.Tab, this.Subtab, this.Name);
}
GUI.Element.prototype.SetValue = function(value){
	GUI.SetValue(this.Tab, this.Subtab, this.Name, value);
	return this;
}
GUI.Element.prototype.SetColor = function(color){
	if(this.Type === "color" || this.Type === "checkbox")
	GUI.SetColor(this.Tab, this.Subtab, this.Name, color);
	return this;
}
GUI.Element.prototype.GetColor = function(){
	if(this.Type === "color" || this.Type === "checkbox")
	return GUI.GetColor(this.Tab, this.Subtab, this.Name);
}
GUI.Element.prototype.master = function(master){
	this.Master = master + this.Tab[0] + this.Subtab[0];
	return this;
}
GUI.Element.prototype.submenu = function(id){
	this.SubmenuMaster = id + this.Tab[0] + this.Subtab[0];
	return this;
}
GUI.Element.prototype.additional = function(type){
	if(this.Type === "checkbox"){
		if(type === "color"){
			this.Color = [255, 255, 255, 255];
			this.ColorHSV = [0, 0, 1, 255];
		}
		else if(type === "submenu"){
			this.Submenu = true;
		}
	}
	return this;
}
GUI.Element.prototype.flags = function(flags){
	this.Flags = flags;
	return this;
}
GUI.AddCheckbox = function(name, index){
	var E = new GUI.Element(name, "checkbox");
	E.Index = index;
	E.State = false;
	return (GUI._MenuElements[E.Tab][E.Subtab][E.Id] = E);
}
GUI.AddSlider = function(name, min, max, value){
	var E = new GUI.Element(name, "slider");
	E.Value = value || min;
	E.Min = min;
	E.Max = max;
	return (GUI._MenuElements[E.Tab][E.Subtab][E.Id] = E);
}
GUI.AddHotkey = function(name, defaultMode){
	var E = new GUI.Element(name, "hotkey");
	E.State = null;
	E.DefaultMode = defaultMode;
	E.Mode = defaultMode || "hold";
	E.Key = 0;
	E.KeyName = "none";
	return (GUI._MenuElements[E.Tab][E.Subtab][E.Id] = E);
}
GUI.AddColor = function(name){
	var E = new GUI.Element(name, "color");
	E.Color = [255, 255, 255, 255];
	E.ColorHSV = [0, 0, 1, 255];
	return (GUI._MenuElements[E.Tab][E.Subtab][E.Id] = E);
}
GUI.AddDropdown = function (name, elements) {
	var E = new GUI.Element(name, "dropdown");
	E.Elements = elements;
	E.Value = 0;
	return (GUI._MenuElements[E.Tab][E.Subtab][E.Id] = E);
}
GUI.AddMultiDropdown = function (name, elements) {
	var E = new GUI.Element(name, "multidropdown");
	E.Elements = elements;
	E.Value = 0;
	return (GUI._MenuElements[E.Tab][E.Subtab][E.Id] = E);
}
GUI.AddLabel = function (name) {
	var E = new GUI.Element(name, "label");
	return (GUI._MenuElements[E.Tab][E.Subtab][E.Id] = E);
}
GUI.GetMasterState = function(tab, subtab, name){
	var Id = name + tab[0] + subtab[0];
	Reversed = false;
	if(Id[0] === "!"){
		Reversed = true;
		Id = Id.slice(1);
	}
	if(!(Id in GUI._MenuElements[tab][subtab])){
		Id = name;
		if(Id[0] === "!"){
			Reversed = true;
			Id = Id.slice(1);
		}
	}
	State = true;
	var Master = GUI._MenuElements[tab][subtab][Id];
	if(Master.Type === "checkbox") State = Master.State;
	if(Master.Type === "hotkey") State = (Master.Mode !== "none" && Master.KeyName !== "none" && Master.Key !== 0) || (Master.Mode === "always");
	if(Master.Type === "dropdown") State = (Master.Value == Master.Elements.indexOf(DropdownElement));
	if(Reversed) return !State;
	else return State;
}
GUI.SetValue = function(tab, subtab, name, value, setnotdef){
	if (setnotdef === null || (typeof setnotdef) === "undefined") setnotdef = true;
	var Id = name + tab[0] + subtab[0];
	var Element = GUI._MenuElements[tab][subtab][Id];
	switch(Element.Type){
		case "checkbox": {
			var i = GUI.Checkboxes.indexOf(Id);
			var DropdownId = Math.ceil((i + 1) / 8) - 1;
			var CheckboxesStates = GetVal("gui_checkboxes" + DropdownId);
			var i = i - (8 * DropdownId);
			var state = !!(CheckboxesStates & (1 << i));
			if(state !== value){
				UI.SetValue(si, "gui_checkboxes" + DropdownId, CheckboxesStates + ((1 << i) * (value ? 1 : -1)));
			}
			GUI._MenuElements[tab][subtab][Id].State = value;
			break;
		}
		case "slider": {
			GUI._MenuElements[tab][subtab][Id].Value = value;
			UI.SetValue(si, Id, value);
			if (setnotdef) UI.SetValue(si, Id + "_not_def", 1);
			break;
		}
		case "hotkey": {
			var modes = {
				"hold": "1",
				"toggle": "2"
			};
			GUI._MenuElements[tab][subtab][Id].Key = value[1];
			GUI._MenuElements[tab][subtab][Id].KeyName = keys[value[1] + ""];
			GUI._MenuElements[tab][subtab][Id].Mode = value[0];
			switch(value[0]){
				case "none":
					UI.SetValue(si, Id, 0);
					return;
				case "always":
					UI.SetValue(si, Id, 3000);
					return;
			}
			UI.SetValue(si, Id, +(modes[value[0]] + "0".repeat(3 - value[1].toString().length) + value[1]));
			break;
		}
		case "dropdown": {
			GUI._MenuElements[tab][subtab][Id].Value = value;
			if (Element.Flags & GUI.NOT_SAVEABLE) return;
			UI.SetValue(si, Id, value);
		}
		case "multidropdown": {
			GUI._MenuElements[tab][subtab][Id].Value = value;
			UI.SetValue(si, Id, value);
		}
	}
}
GUI.GetValue = function(tab, subtab, name, cache){
	if(cache === null || (typeof cache) === "undefined") var cache = false;
	var Id = name + tab[0] + subtab[0];
	if(!(tab in GUI._MenuElements) || !(subtab in GUI._MenuElements[tab])) return Cheat.Print("Cannot find element [" + tab + ", " + subtab + ", " + name + "]\n");
	var Element = GUI._MenuElements[tab][subtab][Id];
	if(typeof Element === "undefined") return Cheat.Print("Cannot find element [" + tab + ", " + subtab + ", " + name + "]\n");
	switch(Element.Type){
		case "checkbox": {
			if(cache){
				return Element.State;
			}
			if(typeof Element.Index === "string"){
				Cheat.Print("\n\n!!! IDIOT! YOU MESSED UP THE INDEX. IT MUST BE AN INTEGER, NOT THE FUCKING STRING !!!\n\n\n");
			}
			var DropdownId = Math.ceil((Element.Index + 1) / 8) - 1;
			var CheckboxesStates = GetVal("gui_checkboxes" + DropdownId);
			var i = Element.Index - (8 * DropdownId);
			var state = !!(CheckboxesStates & (1 << i));
			return state;
		}
		case "slider": {
			if(cache){
				//return Element.Value;
			}
			var value = GetVal(Id);
			return value;
		}
		case "hotkey": {
			if(cache){
				return [Element.Mode, Element.Key, Element.KeyName];
			}
			var modes = [
				"none",
				"hold",
				"toggle",
				"always"
			];
			var temp = GetVal(Id) + "";
			var mode = temp.charAt(0);
			var key = (+(temp.slice(1, 4))).toString();
			if(key === "0"){
				return ["none", 0, "none"];
			}
			switch(mode){
				case "0":
					return [modes[mode], 0, "none"];
				case "3":
					return [modes[mode], 0, "on"];
			}
			return [modes[mode], +key, keys[key]];
		}
		case "dropdown": {
			if (Element.Flags & GUI.NOT_SAVEABLE) return GUI._MenuElements[tab][subtab][Id].Value;
			return UI.GetValue(si, Id);
		}
		case "multidropdown": {
			return UI.GetValue(si, Id);
		}
	}
}
GUI.GetColor = function(tab, subtab, name, cache, hsv){
	var Id = name + tab[0] + subtab[0];
	var Element = GUI._MenuElements[tab][subtab][Id];
	if(cache === null || (typeof cache) === "undefined") cache = true;
	if(hsv === null || (typeof hsv) === "undefined") hsv = false;
	if(cache){
		if(hsv) return [Element.Color, Element.ColorHSV]; 
		return [].concat(Element.Color); 
	}
	var RGBToHSV = function(col) {
		var g = col[1], b = col[2], a = col[3], r = col[0];
		var max = Math.max(r, g, b), min = Math.min(r, g, b),
			d = max - min,
			h,
			s = (max === 0 ? 0 : d / max),
			v = max / 255;
	
		switch (max) {
			case min: h = 0; break;
			case r: h = (g - b) + d * (g < b ? 6: 0); h /= 6 * d; break;
			case g: h = (b - r) + d * 2; h /= 6 * d; break;
			case b: h = (r - g) + d * 4; h /= 6 * d; break;
		}
	
		return [h, s, v, a];
	}
	var color = UI.GetColor(si, Id);
	return [color, RGBToHSV(color)];
}
GUI.SetColor = function(tab, subtab, name, value){
	var Id = name + tab[0] + subtab[0];
	if(value.length !== 2){
		var color = value;
		var hsv = GUI.Colors.RGBToHSV(color);
	}
	else{
		var color = value[0];
		var hsv = value[1];
	}
	var Element = GUI._MenuElements[tab][subtab][Id];
	Element.Color = color;
	Element.ColorHSV = hsv;
	UI.SetColor(si, Id, color);
}
GUI.IsHotkeyActive = function(tab, subtab, name){
	var Id = name + tab[0] + subtab[0];
	var Element = GUI._MenuElements[tab][subtab][Id];
	if (Element.State !== null) return Element.State;
	if (Element.Key === 0) return false;
	var menuopen = UI.IsMenuOpen();
	var pressed = Input.IsKeyPressed(Element.Key);
	switch (Element.Mode) {
		case "hold":
			return !menuopen && pressed;
		case "toggle":
			if(!GUI.HotkeyToggle[Id][1]){
				if(!menuopen && pressed){
					GUI.HotkeyToggle[Id][1] = true;
					GUI.HotkeyToggle[Id][0] = !GUI.HotkeyToggle[Id][0];
				}
			}
			else if(!menuopen && !pressed){
				GUI.HotkeyToggle[Id][1] = false;
			}
			return GUI.HotkeyToggle[Id][0];
		case "always":
			return true;
		case "none":
			return false;
	}
}
GUI.GetDropdownValue = function(tab, subtab, name, elementName){
	var Id = name + tab[0] + subtab[0];
	var Element = GUI._MenuElements[tab][subtab][Id];
	return !!(Element.Value & (1 << Element.Elements.indexOf(elementName)));
}
GUI.OverrideState = function (tab, subtab, name, state){
	var Id = name + tab[0] + subtab[0];
	var Element = GUI._MenuElements[tab][subtab][Id];
	Element.State = state;
	GUI.OverridenHotkeys.push([tab, subtab, Id]);
}
Render.RoundedRect = function(x, y, width, height, radius, color, experimental){
	if(experimental === null || experimental === undefined){
		experimental = false;
	}
	var diameter = radius * 2;
	//Rects
	Render.FilledRect(x + radius, y, width - diameter, height, color);
	Render.FilledRect(x, y + radius, width, height - diameter, color);

	//Left
	Render.FilledCircle(x + radius, y + radius, radius + 1, color);
	Render.FilledCircle(x + radius, y + height - radius - 1,  radius + 1, color);

	//Right
	if(experimental){
		Render.FilledCircle(x + width - radius - 2, y + radius, radius + 1, color);
		Render.FilledCircle(x + width - radius - 2, y + height - radius - 2,  radius + 2, color);
	}
	else{
		Render.FilledCircle(x + width - radius - 1, y + radius, radius + 1, color);
		Render.FilledCircle(x + width - radius - 1, y + height - radius - 1,  radius + 1, color);
	}
}
Render.SmoothRect = function(x, y, width, height, color){
	Render.FilledRect(x, y + 1, width, height - 2, color);
	Render.FilledRect(x + 1, y, width - 2, height, color);
}
Render.Arc = function(x, y, r1, r2, s, d, col){
	for (var i = s; i < s + d; i++){
		const rad = i * Math.PI / 180;
		Render.Line(x + Math.cos(rad) * r1, y + Math.sin(rad) * r1, x + Math.cos(rad) * r2, y + Math.sin(rad) * r2, col);
	}
}
//x, y, radius, radius_inner, start_angle, end_angle, segments, color
Render.ArcPolygon = function (x, y, radius, inner, start, end, seg, col) {
	while (360 % seg != 0) seg++;
	seg = 360 / seg;
	for (var i = start; i < start + end; i = i + seg) {
		var rad = i * Math.PI / 180;
		var rad2 = (i + seg) * Math.PI / 180;
		var rad_cos = Math.cos(rad);
		var rad_sin = Math.sin(rad);
		var rad2_cos = Math.cos(rad2);
		var rad2_sin = Math.sin(rad2);
		var x1 = x + rad2_cos * radius;
		var y1 = y + rad2_sin * radius;
		var x2 = x + rad_cos * inner;
		var y2 = y + rad_sin * inner;
		Render.Polygon([[x + rad_cos * radius, y + rad_sin * radius], [x1, y1], [x2, y2]], col);
		Render.Polygon([[x2, y2], [x1, y1], [x + rad2_cos * inner, y + rad2_sin * inner]], col);
	}
}
UI.IsCursorInBox = function(x, y, width, height) {
	var cursor = Input.GetCursorPosition()
	if (cursor[0] > x && cursor[0] < x + width && cursor[1] > y && cursor[1] < y + height)
		return true
	return false
}
function Clamp(value, min, max){
	return Math.max(Math.min(value, max), min);
}

//Fonts
GUI.InitFonts = function(){
	GUI.Fonts.Logo = Render.AddFont("Segoe UI", GUI.Scale(24), 700);
	GUI.Fonts.TabText = Render.AddFont("Segoe UI Light", GUI.Scale(15), 100);
	GUI.Fonts.TabIcon = Render.AddFont("OnetapFont", GUI.Scale(26), 100);
	GUI.Fonts.HeaderLogo = Render.AddFont("Segoe UI", GUI.Scale(14), 700);
	GUI.Fonts.HeaderTabText = Render.AddFont("Segoe UI Semibold", GUI.Scale(11), 500);
	GUI.Fonts.HeaderTabIcon = Render.AddFont("OnetapFont", GUI.Scale(11), 100);
	GUI.Fonts.Username = Render.AddFont("Segoe UI", GUI.Scale(11), 700);
	//GUI.Fonts.AvatarLetter = Render.AddFont("Segoe UI", 18, 700);
	GUI.Fonts.SubtabText = Render.AddFont("Segoe UI Semilight", GUI.Scale(11), 200);
	GUI.Fonts.Menu = Render.AddFont("Segoe UI Semilight", Math.ceil(11 * GUI._Scale), 200);
	GUI.Fonts.SliderValue = Render.AddFont("Segoe UI Light", GUI.Scale(8), 100);
	GUI.Fonts.HotkeyKeyName = Render.AddFont("Segoe UI Light", GUI.Scale(9), 100);
}

//Colors
GUI.Colors = [];
GUI.Colors.GetColor = function(color, opacity){
	var temp = [color[0], color[1], color[2]];
	temp[3] = opacity;
	return temp;
}
GUI.Colors.Background = [24, 24, 28, 255];
GUI.Colors.Text = [255, 255, 255, 255];
GUI.Colors.TabButton = [33, 33, 38, 255];
GUI.Colors.TabButtonHover = [50, 50, 55, 255];
GUI.Colors.TabIcon = [173, 173, 173, 255];
GUI.Colors.TabText = [216, 216, 216, 255];
GUI.Colors.HeaderTabText = [173, 173, 173, 255];
GUI.Colors.Username = [173, 173, 173, 255];
GUI.Colors.Line = [33, 33, 38, 255];
GUI.Colors.ArrowColor = [120, 120, 120, 255];
GUI.Colors.Logo = [150, 150, 150, 255];
GUI.Colors.SubtabList = [22, 22, 26, 255];
GUI.Colors.SubtabListActive = [24, 24, 28, 255];
GUI.Colors.SubtabText = [180, 180, 180, 255];
GUI.Colors.Checkbox = [22, 22, 26, 255];
GUI.Colors.CheckboxBorder = [33, 33, 38, 255];
GUI.Colors.ActiveElement = [124, 129, 252, 255];
GUI.Colors.HotkeyMenuText = [150, 150, 150, 255];
GUI.Colors.HotkeyMenuTextActive = [255, 255, 255, 255];
GUI.Colors.FadeColor = function(start, end, position){
	var r = Math.round(Easing(start[0], end[0], position));
	var g = Math.round(Easing(start[1], end[1], position));
	var b = Math.round(Easing(start[2], end[2], position));

	return [r, g, b, 255];
}
GUI.Colors.Animate = function(start, end, position, opacity){
	return GUI.Colors.GetColor(GUI.Colors.FadeColor(start, end, position), opacity);
}
GUI.Colors.AnimateBackground = function(color){
	return GUI.Colors.GetColor(GUI.Colors.FadeColor(GUI.Colors.Background, color, GUI._MenuAnimation[1]), GUI._MenuAnimation[1] * 255);
}
GUI.Colors.StringToColor = function(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
	hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var color = '';
  for (var i = 0; i < 3; i++) {
	var value = (hash >> (i * 8)) & 0xFF;
	color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
}
GUI.Colors.HexToRgb = function(hex){
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? [
	  parseInt(result[1], 16),
	  parseInt(result[2], 16),
	  parseInt(result[3], 16),
	  255
	] : null;
}
GUI.Colors.GetContrastColor = function(bgColor, lightColor, darkColor){
  var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
  var RGB = GUI.Colors.HexToRgb(color);
  var r = RGB[0];
  var g = RGB[1];
  var b = RGB[2];
  return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ?
	darkColor : lightColor;
}
GUI.Colors.HSVToRGB = function(h, s, v, a){
	var r, g, b, i, f, p, q, t, a = a || 255;
	if (arguments.length === 1) {
		s = h[1], v = h[2], a = h[3], h = h[0]
	}
	i = Math.floor(h * 6);
	f = h * 6 - i;
	p = v * (1 - s);
	q = v * (1 - f * s);
	t = v * (1 - (1 - f) * s);
	switch (i % 6) {
		case 0: r = v, g = t, b = p; break;
		case 1: r = q, g = v, b = p; break;
		case 2: r = p, g = v, b = t; break;
		case 3: r = p, g = q, b = v; break;
		case 4: r = t, g = p, b = v; break;
		case 5: r = v, g = p, b = q; break;
	}
	return [
		Math.round(r * 255),
		Math.round(g * 255),
		Math.round(b * 255),
		a
	]
}
GUI.Colors.RGBToHSV = function(r, g, b) {
	if (arguments.length === 1) {
		g = r[1], b = r[2], a = r[3], r = r[0];
	}
	var max = Math.max(r, g, b), min = Math.min(r, g, b),
		d = max - min,
		h,
		s = (max === 0 ? 0 : d / max),
		v = max / 255;

	switch (max) {
		case min: h = 0; break;
		case r: h = (g - b) + d * (g < b ? 6: 0); h /= 6 * d; break;
		case g: h = (b - r) + d * 2; h /= 6 * d; break;
		case b: h = (r - g) + d * 4; h /= 6 * d; break;
	}

	return [h, s, v, a];
}
function Lerp(a, b, u){
	return (1 - u) * a + u * b;
}
function Easing(a, b, u, t){
	if(t === null || t === undefined) t = 0;
	u = Clamp(u, 0, 1);
	if(!t) u = Math.sqrt(1 - Math.pow(u - 1, 2));
	else u = 1 - Math.sqrt(1 - Math.pow(u, 2));
	return (1 - u) * a + u * b;
}
function GetVal(name){
	return UI.GetValue("Script items", name);
}

//Script start
GUI = Duktape.compact(GUI);
Duktape.gc();

//Index you can use is 74
GUI.Init("OTC SYNC DEV");

GUI.AddTab("Rage", "A");

GUI.AddSubtab("General");
GUI.AddCheckbox("Auto peek helper", 0);
GUI.AddMultiDropdown("Auto peek settings", ["Enable Hide shots", "Decrease min-dmg"]).flags(GUI.SAME_LINE).master("Auto peek helper");
GUI.AddCheckbox("Jumpscout", 1);
GUI.AddCheckbox("Adaptive noscope", 43);
GUI.AddCheckbox("Faster autoscope", 44);
GUI.AddCheckbox("AWP switch after shot", 51);
GUI.AddCheckbox("Leg prediction", 56);
GUI.AddMultiDropdown("Safe point conditions", ["Lethal", "Slowwalking", "On AWP"]);
GUI.AddMultiDropdown("Safe point hitboxes", ["Head", "Body", "Chest", "Legs", "Feet"]).flags(GUI.SAME_LINE);

GUI.AddSubtab("Min-DMG");
GUI.AddCheckbox("Two shot on Auto", 4);
GUI.AddCheckbox("Force HP + value if HP < Min-DMG", 2);
GUI.AddSlider("HP + value", 0, 30, 5).master("Force HP + value if HP < Min-DMG");

GUI.AddSubtab("Min-DMG Override");
var dmg_el_name = GUI.AddHotkey("Min-damage override", "hold").Name;
GUI.AddHotkey("Min-damage override 2", "hold").master(dmg_el_name);
GUI.AddDropdown("Min-DMG weapon groups", ["General", "Pistol", "Heavy Pistol", "Scout", "AWP", "Auto"]).master(dmg_el_name).flags(GUI.NOT_SAVEABLE);
GUI.AddSlider("General Original Min-DMG", 1, 130, 1).master(dmg_el_name).flags(GUI.NO_DEFAULT);
GUI.AddSlider("Pistol Original Min-DMG", 1, 130, 1).master(dmg_el_name).flags(GUI.NO_DEFAULT);
GUI.AddSlider("Heavy Pistol Original Min-DMG", 1, 130, 1).master(dmg_el_name).flags(GUI.NO_DEFAULT);
GUI.AddSlider("Scout Original Min-DMG", 1, 130, 1).master(dmg_el_name).flags(GUI.NO_DEFAULT);
GUI.AddSlider("AWP Original Min-DMG", 1, 130, 1).master(dmg_el_name).flags(GUI.NO_DEFAULT);
GUI.AddSlider("Auto Original Min-DMG", 1, 130, 1).master(dmg_el_name).flags(GUI.NO_DEFAULT);
GUI.AddSlider("General Override Min-DMG", 1, 130, 1).master(dmg_el_name).flags(GUI.NO_DEFAULT);
GUI.AddSlider("Pistol Override Min-DMG", 1, 130, 1).master(dmg_el_name).flags(GUI.NO_DEFAULT);
GUI.AddSlider("Heavy Pistol Override Min-DMG", 1, 130, 1).master(dmg_el_name).flags(GUI.NO_DEFAULT);
GUI.AddSlider("Scout Override Min-DMG", 1, 130, 1).master(dmg_el_name).flags(GUI.NO_DEFAULT);
GUI.AddSlider("AWP Override Min-DMG", 1, 130, 1).master(dmg_el_name).flags(GUI.NO_DEFAULT);
GUI.AddSlider("Auto Override Min-DMG", 1, 130, 1).master(dmg_el_name).flags(GUI.NO_DEFAULT);
GUI.AddSlider("General Override 2 Min-DMG", 1, 130, 1).master(dmg_el_name + " 2").flags(GUI.NO_DEFAULT);
GUI.AddSlider("Pistol Override 2 Min-DMG", 1, 130, 1).master(dmg_el_name + " 2").flags(GUI.NO_DEFAULT);
GUI.AddSlider("Heavy Pistol Override 2 Min-DMG", 1, 130, 1).master(dmg_el_name + " 2").flags(GUI.NO_DEFAULT);
GUI.AddSlider("Scout Override 2 Min-DMG", 1, 130, 1).master(dmg_el_name + " 2").flags(GUI.NO_DEFAULT);
GUI.AddSlider("AWP Override 2 Min-DMG", 1, 130, 1).master(dmg_el_name + " 2").flags(GUI.NO_DEFAULT);
GUI.AddSlider("Auto Override 2 Min-DMG", 1, 130, 1).master(dmg_el_name + " 2").flags(GUI.NO_DEFAULT);

GUI.AddSubtab("Doubletap");

//хуй вам а не беттер дт))0)00)
//GUI.AddCheckbox("Rage", "Doubletap", "Better DT (addon only)", 51);
GUI.AddCheckbox("Recharge speed", 9);
GUI.AddSlider("Recharge ticks", 0, 16, 10).master("Recharge speed");
GUI.AddDropdown("DT Boost", ["None", "Speed boost", "Lag peek (pizdec)"]);
GUI.AddSlider("Extrapolate ticks", 4, 16, 4);

GUI.AddSubtab("Other");
GUI.AddHotkey("Extended backtracking", "hold");
//GUI.AddHotkey("Force head", "hold");
GUI.AddHotkey("Force backshoot", "hold");
GUI.AddCheckbox("Custom zeus hitchance", 10);
GUI.AddSlider("Hitchance", 0, 100, 90).master("Custom zeus hitchance");

GUI.AddTab("Anti-Aim", "B");

GUI.AddSubtab("General");
GUI.AddHotkey("Lowdelta", "hold");
GUI.AddHotkey("Freestanding", "toggle");
GUI.AddCheckbox("Legit AA on E", 11);
GUI.AddDropdown("Desync freestanding", ["None", "Peek fake", "Peek real", "Peek real (fake on autopeek)"]);
GUI.AddCheckbox("Auto invert", 49);
GUI.AddCheckbox("No desync on DT", 62);
GUI.AddHotkey("left manual", "toggle");
GUI.AddHotkey("right manual", "toggle");

GUI.AddSubtab("AA Presets");
GUI.AddDropdown("Preset", ["None", "Desync jitter", "Desync move", "Maximize delta"]);
GUI.AddCheckbox("Adaptive jitter", 58);
GUI.AddSlider("Strength", 1, 8, 6).master("Adaptive jitter");

GUI.AddSubtab("Slowwalk");
GUI.AddCheckbox("Custom slowwalk", 14);
GUI.AddSlider("Slowwalk speed", 5, 80, 60).master("Custom slowwalk");
GUI.AddCheckbox("Slowwalk jitter", 15).master("Custom slowwalk");

GUI.AddSubtab("Fake Lag");
GUI.AddCheckbox("Static legs", 47);
GUI.AddCheckbox("Slide break mode", 59).master("Static legs").flags(GUI.SAME_LINE);
GUI.AddSlider("Fake lag choke", 6, 15, 14).master("Static legs");
GUI.AddCheckbox("No fake lag on revolver", 17);
GUI.AddCheckbox("No fake lag on nades", 18);

//GUI.AddSubtab("Matchmaking FD");
//GUI.AddCheckbox("Matchmaking FD", 19);

GUI.AddSubtab("Other");
GUI.AddCheckbox("Legbreaker", 12);
GUI.AddSlider("Legbreaker speed", 2, 10, 6).master("Legbreaker");

GUI.AddTab("Visuals", "C");

GUI.AddSubtab("World");
//GUI.AddCheckbox("Custom Bloom", 20);
GUI.AddSlider("World brightness", -50, 0, 0);
GUI.AddCheckbox("Nade prediction", 27).additional("color");
GUI.AddCheckbox("Line tracer", 61).master("Nade prediction").flags(GUI.SAME_LINE);
GUI.AddCheckbox("Trail", 29).additional("color");
GUI.AddCheckbox("Rainbow", 66).master("Trail").flags(GUI.SAME_LINE)
GUI.AddSlider("Length", 0, 200, 25).master("Trail");
GUI.AddCheckbox("Party Zeus", 21);
GUI.AddCheckbox("Keystrokes", 73)
GUI.AddCheckbox("Rainbow Line", 68);
GUI.AddSlider("Height", 1, 5, 2).master("Rainbow Line");


GUI.AddSubtab("Players");
GUI.AddCheckbox("Hit marker", 63).additional("color");
GUI.AddCheckbox("Skeleton on hit", 22).additional("color");
GUI.AddCheckbox("Damage marker", 23).additional("color");
GUI.AddCheckbox("Outline", 23).flags(GUI.SAME_LINE);
GUI.AddCheckbox("History chams on extended backtrack", 24);
GUI.AddCheckbox("Better glow chams", 8).additional("color");
GUI.AddMultiDropdown("Glow settings", ["Hollow", "Pulse", "Wireframe"]).flags(GUI.SAME_LINE).master("Better glow chams");
GUI.AddSlider("Vibrancy", 0, 100, 80).master("Better glow chams");

GUI.AddSubtab("Local");
GUI.AddCheckbox("Agent changer", 26);
GUI.AddDropdown("T Agent", "Dragomir|Rezan The Ready|Maximus|Blackwolf|Doctor' Romanov|Enforcer|Slingshot|Soldier|The Elite Mr. Muhlik|Ground Rebel|Osiris|Prof. Shahmat".split("|")).master("Agent changer");
GUI.AddDropdown("CT Agent", "'TwoTimes' McCoy|Seal Team 6 Soldier|Buckshot|Lt. Comm. Ricksaw|B Squadron Officer|3rd Commando C.|Special Agent Ava|Operator|Markus Delrow|Michael Syfers".split("|")).master("Agent changer").flags(GUI.SAME_LINE);
GUI.AddCheckbox("Arms changer", 25);
GUI.AddDropdown("T Arms", "Default|Nigger|Brown|Asian|Red|Tatoo|White".split("|")).master("Arms changer");
GUI.AddDropdown("CT Arms", "Default|Nigger|Brown|Asian|Red|Tatoo|White".split("|")).master("Arms changer").flags(GUI.SAME_LINE);;
var knife_list = "Default|Bayonet|Flip knife|Gut knife|Karambit|M9 Bayonet|Butterfly|Falchion|Navaja|Shadow daggers|Stiletto|Bowie|Huntsman|Talon|Ursus|Classic|Paracord|Survival|Nomad|Skeleton".split("|");
GUI.AddCheckbox("Knife changer", 57);
GUI.AddDropdown("T Knife", knife_list).master("Knife changer");
GUI.AddDropdown("CT Knife", knife_list).master("Knife changer").flags(GUI.SAME_LINE);

GUI.AddSubtab("Other");
GUI.AddCheckbox("Better scope", 28).additional("color");
GUI.AddCheckbox("Reversed gradient", 64).flags(GUI.SAME_LINE).master("Better scope");
GUI.AddSlider("Better scope weight", 1, 6, 2).master("Better scope");
GUI.AddSlider("Better scope length", 0, 100, 14).master("Better scope");
GUI.AddSlider("Better scope offset", 0, 100, 12).master("Better scope");
GUI.AddCheckbox("Better 3rd person", 42);
GUI.AddLabel("Bind in Keybinds fixer").master("Better 3rd person").flags(GUI.SAME_LINE);
GUI.AddSlider("Thirdperson distance", 50, 150, 0).master("Better 3rd person");
GUI.AddSlider("Aspect ratio", 0, 250, 0);

GUI.AddSubtab("Indicators");
GUI.AddCheckbox("Indicators", 32);
GUI.AddDropdown("Indicators type", ['Default', 'Acidtech', 'Acidtech v2', 'Killaura', 'IDEAL YAW']).flags(GUI.SAME_LINE).master("Indicators");
GUI.AddCheckbox("Indicators centered", 45).master("Indicators")//.flags(GUI.SAME_LINE);
GUI.AddCheckbox("Inverter check", 50).master("Indicators").flags(GUI.SAME_LINE)
GUI.AddCheckbox("Desync line", 69).master("Indicators")
GUI.AddCheckbox("Indicators custom color", 16).master("Indicators").additional("color");
GUI.AddSlider("Indicators Y offset", 0, 75, 0).master("Indicators")

GUI.AddSubtab("GUI");
GUI.AddDropdown("Windows style", ['OTC SYNC', 'Solus UI', 'Solus UI w\\o icon']);
GUI.AddDropdown("Windows color type", ["Solid", "Fade left and right", "Fade to left", "Fade to right", "Sket" /* не изменять!! */, "Sket 2", "Rainbow", "More rainbow", "No line"]).flags(GUI.SAME_LINE);
GUI.AddCheckbox("Watermark", 31).additional("color");
GUI.AddMultiDropdown("Watermark elements", ["Username", "K/D", "IP", "Tickrate", "Ping", "FPS", "Time"]).flags(GUI.SAME_LINE).master("Watermark");
GUI.AddCheckbox("Info", 70).additional("color")
GUI.AddMultiDropdown("Info elements", ["FAKE", "FL", "IO", "MS/HZ"]).flags(GUI.SAME_LINE).master("Info")
GUI.AddCheckbox("Keybind list", 33).additional("color");
GUI.AddCheckbox("Spectator list", 34).additional("color");
GUI.AddCheckbox("Hitlogs under crosshair", 35).additional("color");
GUI.AddCheckbox("Manuals", 72).additional("color");
GUI.AddColor("Active inverter").master("Manuals");
GUI.AddColor("Menu accent/scale");
GUI.AddDropdown("GUI Scale", ['100%', '75%', '125%', '150%']).flags(GUI.SAME_LINE);


GUI.AddTab("Misc", "D");

GUI.AddSubtab("General");
GUI.AddCheckbox("FPS Boost", 36);
GUI.AddCheckbox("Better autostrafer", 37);
GUI.AddCheckbox("Auto crouch in air", 60).master("Better autostrafer").flags(GUI.SAME_LINE);
GUI.AddCheckbox("Name breaker", 38);
GUI.AddCheckbox("Vote revealer", 39);
GUI.AddCheckbox("View enemy chat (not working in MM)", 40);
GUI.AddCheckbox("Auto local server setup", 53);
GUI.AddCheckbox("Auto sv_lan 1", 67);
GUI.AddCheckbox("Clantag", 41);

GUI.AddSubtab("Keybinds fixer");

{
	var n = GUI.AddCheckbox("Enabled", 13).Name;
	GUI.AddLabel("Set otc3 binds to other keys and \"Toggle\"").master("Enabled");
	GUI.AddHotkey("Doubletap", "toggle").master(n);
	GUI.AddHotkey("Hide shots", "toggle").master(n);
	GUI.AddHotkey("Inverter", "toggle").master(n);
	GUI.AddHotkey("Thirdperson", "toggle").master(n);
	GUI.AddHotkey("Fake duck", "hold").master(n);
	GUI.AddHotkey("Force body aim", "toggle").master(n);
	GUI.AddHotkey("Force safe point", "toggle").master(n);
}

GUI.AddSubtab("Credits");
GUI.AddLabel("OTC SYNC brought to you by:\n\nSleebu\nmoonx (ber$$erker)\nMased\n\nThanks 5nu$ community for moral support\n\nDonate: qiwi.com/n/sleebu\nSite: otcsync.js.org");

GUI.InitElements();

var csgo_weapons = {
	"0": "none",
	"1": "Deagle",
	"2": "Dualies",
	"3": "Five Seven",
	"4": "Glock",
	"5": "P228",
	"6": "USP",
	"7": "AK47",
	"8": "AUG",
	"9": "AWP",
	"10": "FAMAS",
	"11": "G3SG1",
	"12": "GALIL",
	"13": "GALIL",
	"14": "M249",
	"15": "M3",
	"16": "M4A4",
	"17": "Mac10",
	"18": "MP5",
	"19": "P90",
	"20": "SSG08",
	"21": "SG550",
	"22": "SG552",
	"23": "TMP",
	"24": "UMP45",
	"25": "XM1014",
	"26": "PP-Bizon",
	"27": "MAG7",
	"28": "Negev",
	"29": "Sawed off",
	"30": "Tec-9",
	"31": "Taser",
	"32": "P2000",
	"33": "MP7",
	"34": "MP9",
	"35": "Nova",
	"36": "P250",
	"37": "SCAR17",
	"38": "SCAR20",
	"39": "SG556",
	"40": "SSG08",
	"41": "Knife",
	"42": "Knife",
	"43": "flashbang",
	"44": "hegrenade",
	"45": "smokegrenade",
	"46": "molotov",
	"47": "decoy",
	"48": "incgrenade",
	"49": "C4",
	"59": "Knife",
	"60": "M4A1-S",
	"63": "CZ-75",
	"64": "Revolver",
	"500" : "Knife",
	"505" : "Knife",
	"506" : "Knife",
	"507" : "Knife",
	"508" : "Knife",
	"509" : "Knife",
	"512" : "Knife",
	"514" : "Knife",
	"515" : "Knife",
	"516" : "Knife",
	"197108": "Knife",
	"197113": "Knife",
	"197114": "Knife",
	"197115": "Knife",
	"197116": "Knife",
	"197123": "Knife",
	"197120": "Knife",
	"197128": "Knife",
	"197124": "Knife",
	"197130": "Knife",
	"197122": "Knife",
	"197117": "Knife",
	"197131": "Knife",
	"197127": "Knife",
	"197111": "Knife",
	"197125": "Knife",
	"197126": "Knife",
	"197129": "Knife",
	"197133": "Knife",
	"262205": "USP",
	"262208": "Revolver"
};
function getWeaponName(){
	if(!local) return "none";
	var weapon = Entity.GetProp(Entity.GetWeapon(local), "DT_WeaponBaseItem", "m_iItemDefinitionIndex");
	return csgo_weapons[weapon];
}
function isInAir(){
	var fv = Entity.GetProp(local, "CBasePlayer", "m_flFallVelocity");
	return (fv < -1 || fv > 1);
}
function getVelocity(player){
	var velocity = Entity.GetProp(player, "CBasePlayer", "m_vecVelocity[0]");
	return Math.sqrt(velocity[0] * velocity[0] + velocity[1] * velocity[1]);
}
function ExtrapolateTick(player, ticks, hitbox) {
		var velocity = Entity.GetProp(player, 'CBasePlayer', 'm_vecVelocity[0]'),
		array = [];
	if(hitbox.length > 2) var pos = hitbox;
	else var pos = Entity.GetHitboxPosition(player, hitbox)
	return array[0] = pos[0] + velocity[0] * Globals.TickInterval() * ticks, array[1] = pos[1] + velocity[1] * Globals.TickInterval() * ticks, array[2] = pos[2] + velocity[2] * Globals.TickInterval() * ticks, array;
}
function IsLethal(player) {
	if (!local || !isAlive || !Entity.IsValid(player) || !Entity.IsAlive(player)) return false;
	var health = Entity.GetProp(player, 'CBasePlayer', 'm_iHealth');
	var thorax_pos = Entity.GetHitboxPosition(player, 4);
	var result_thorax = Trace.Bullet(local, player, Entity.GetEyePosition(local), thorax_pos);
	if (result_thorax[1] >= health) return true;
	var result_thorax_extrapolated = Trace.Bullet(local, player, ExtrapolateTick(local, 14, 0), thorax_pos);
	if (result_thorax_extrapolated[1] >= health) return true;
	return false;
}
function GetMaxDesync(player) {
	var velocity = Entity.GetProp(player, 'CBasePlayer', 'm_vecVelocity[0]'),
		idk = Math.sqrt(velocity[0] * velocity[0] + velocity[1] * velocity[1]);
	return 58 - 58 * idk / 580;
}
function VectorAdd(a, b){
	return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}
function VectorDot(a, b){
	return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
function VectorLength(x, y, z){
	return Math.sqrt(x * x + y * y + z * z);
}
function VectorNormalize(vec){
	var length = VectorLength(vec[0], vec[1], vec[2]);
	return [vec[0] / length, vec[1] / length, vec[2] / length];
}
function VectorSubtract(a, b){
	return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
} 
function VectorMultiply(a, b){
	return [a[0] * b[0], a[1] * b[1], a[2] * b[2]];
}
function VectorDistance(a, b){
	return VectorLength(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}
function calcDist(local, target) {
	var lx = local[0];
	var ly = local[1];
	var lz = local[2];
	var tx = target[0];
	var ty = target[1];
	var tz = target[2];
	var dx = lx - tx;
	var dy = ly - ty;
	var dz = lz - tz;

	return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
function exploitsActive(type){
	var hideshots = UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Hide shots");
	var doubletap = UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap");
	if(type == "hs") return hideshots;
	if(type == "dt") return doubletap;
	if(type == "all") return (hideshots || doubletap);
}
function closestTarget(){
	var enemies = Entity.GetEnemies();
	var dists = [];
	for(e in enemies) {
		var e = enemies[e];
		if(!Entity.IsAlive(e) || Entity.IsDormant(e) || !Entity.IsValid(e)) continue;
		dists.push([e, calcDist(Entity.GetHitboxPosition(local, 0), Entity.GetHitboxPosition(e, 0))]);
	}
	dists.sort(function(a, b){
		return a[1] - b[1];
	});
	if(dists.length == 0 || dists == []) return target = -1; 
	return dists[0][0];
}
function canShoot(player){
	var index = Entity.GetWeapon(player)
	var classid = Entity.GetClassID(index);
		
	var weapon =  classid == 107 || classid == 108 || classid == 96 || classid == 99 || classid == 112 || classid == 155 || classid == 47; //checking if the selected weapon is knife or nade
	var clip = Entity.GetProp(index, "DT_BaseCombatWeapon", "m_iClip1");
	var flags = Entity.GetProp(index, 'CBasePlayer', 'm_fFlags');
	var curtime = Global.Curtime();
	if(curtime < Entity.GetProp(local, "CCSPlayer", "m_flNextAttack") || curtime < Entity.GetProp(index, "CBaseCombatWeapon", "m_flNextPrimaryAttack"))
		return false;
	if(weapon || clip == 0 || flags & 1 << 1 )//check if player is jumping or as an empty mag // UserCMD.GetButtons() & (1 << 1)
		return false;
	return true;
}
function getMetricDistance(a, b){
	return Math.floor(Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2) + Math.pow(a[2] - b[2], 2)) * 0.0254);
}
function can_shift_shot(ticks_to_shift) {
	var wpn = Entity.GetWeapon(local);

	if (local == null || wpn == null)
		return false;

	var tickbase = Entity.GetProp(local, "CCSPlayer", "m_nTickBase");
	var curtime = Globals.TickInterval() * (tickbase - ticks_to_shift)

	if (curtime < Entity.GetProp(local, "CCSPlayer", "m_flNextAttack"))
		return false;

	if (curtime < Entity.GetProp(wpn, "CBaseCombatWeapon", "m_flNextPrimaryAttack"))
		return false;

	return true;
}
function angle_diff(a1, a2) {
	var delta = a1 - a2;
	delta %= 360;
	if (delta > 180) delta -= 360;
	if (delta < -180) delta += 360;
	return delta;
}
function renderScopeLine(x, y, w, h, dir, color1, color2) {
	return Render.GradientRect(x - Math.floor(w / 2) - 1, y - Math.floor(h / 2) - 1, w, h, dir, color1, color2);
}
function draw_circle_3d(x, y, z, radius, degrees, degrees_outline, start_at, clr, filled, fill_clr) {
	var accuracy = 5;
	var old_x, old_y;
	start_at = start_at + 1
	for (rot = start_at; rot < degrees + start_at + 1; rot += accuracy) {
		rot_r = rot * (Math.PI / 180)
		line_x = radius * Math.cos(rot_r) + x, line_y = radius * Math.sin(rot_r) + y
		var curr = Render.WorldToScreen([line_x, line_y, z]),
			cur = Render.WorldToScreen([x, y, z]);
		if (cur[0] != null && curr[0] != null && old_x != null) {
			if (filled) Render.Polygon([
				[curr[0], curr[1]],
				[old_x, old_y],
				[cur[0], cur[1]]
			], fill_clr)
		}
		old_x = curr[0], old_y = curr[1];
	}
	for (rot = start_at; rot < degrees_outline + start_at + 1; rot += accuracy) {
		rot_r = rot * (Math.PI / 180)
		line_x = radius * Math.cos(rot_r) + x, line_y = radius * Math.sin(rot_r) + y
		var curr = Render.WorldToScreen([line_x, line_y, z]),
			cur = Render.WorldToScreen([x, y, z]);
		if (cur[0] != null && curr[0] != null && old_x != null) {
			Render.Line(curr[0], curr[1], old_x, old_y, clr)
		}
		old_x = curr[0], old_y = curr[1];
	}
}
function occurrences(str, sub, overlap) {
    str += "";
    sub += "";
    if (sub.length <= 0) return (str.length + 1);
    var n = 0, pos = 0, step = overlap ? 1 : sub.length;
    while (true) {
        pos = str.indexOf(sub, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}
var russianToEng = {
    "1089": "c",
    "1057": "C",
    "1072": "a",
    "1040": "A",
    "1084": "m",
    "1052": "M",
    "1082": "k",
    "1050": "K",
    "1086": "o",
    "1054": "O",
    "1088": "p",
    "1056": "P",
    "1091": "y",
    "1059": "Y",
    "1077": "e",
    "1045": "E",
    "1090": "t",
    "1058": "T",
    "1079": "3",
    "1047": "3",
    "1093": "x",
    "1061": "X",
	"1042": "B",
	"1087": "n",
	"1025": "E",
	"1105": "e",
	"1096": "w",
	"1064": "W",
	"1080": "u",
	"1081": "u",
	"1073": "6",
	"1041": "6",
	"1053": "H",
	"1085": "H",
	"1068": "b",
	"1075": "r",
	"1076": "g"
}
function rusToEng(str){
	var rus = "";
    for(i = 0; i < str.length; i++){
        var letter = russianToEng[str.charCodeAt(i)];
        if(letter === undefined){rus += str[i]; continue}
		rus += letter;
    }
	var alphabet = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя", result = "", A = [];
    for(var i in alphabet) A[alphabet[i]] = "?"
    for(var i in rus) { var c = rus.charAt(i); result += A[c] || c }
    return result;
}
function ChokedCommands(){
	if(!World.GetServerString()) return 0;
	var flSimulationTime = Entity.GetProp(local, "CBaseEntity", "m_flSimulationTime");
	var flSimDiff = Globals.Curtime() - flSimulationTime;
	var latency = Local.Latency();
	return Math.ceil(0.5 + Math.max(0, flSimDiff - latency) / Globals.TickInterval()) - 1;
}
function mustDisplayString(str, font, size){
	var text_size = Render.TextSizeCustom(str, font);
	//removed these symbols to increase performance
	//ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿŒœŠšŸŽžƒ
	//nobody use them tho
	var symbols = "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ˆ–—‘’‚“”„†‡•…‰‹›€™";
	var count = 0;
	for(i = 0; i < symbols.length; i++){
		count += occurrences(str, symbols[i]);
	}
	return (count * size >= text_size[0] / 2);
}
function ExtendVector(vector, angle, extension){
    var radianAngle = degree_to_radian(angle);
    return [extension * Math.cos(radianAngle) + vector[0], extension * Math.sin(radianAngle) + vector[1], vector[2]];
}

function VectorAdd(a, b){
    return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function VectorDot(a, b){
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function VectorLength(x, y, z){
    return Math.sqrt(x * x + y * y + z * z);
}

function VectorNormalize(vec){
    var length = VectorLength(vec[0], vec[1], vec[2]);
    return [vec[0] / length, vec[1] / length, vec[2] / length];
}

function VectorSubtract(a, b){
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function VectorMultiply(a, b){
    return [a[0] * b[0], a[1] * b[1], a[2] * b[2]];
}

function VectorDistance(a, b){
    return VectorLength(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

function VectorAngles(forward){
    var angles;
    var tmp, yaw, pitch;
    
    if (forward[1] == 0 && forward[0] == 0){
        yaw = 0;
        if (forward[2] > 0) pitch = 270;
        else pitch = 90;
    }
    else{
        yaw = (Math.atan2(forward[1], forward[0]) * 180 / Math.PI);
        if (yaw < 0) yaw += 360;
        tmp = Math.sqrt (forward[0]*forward[0] + forward[1]*forward[1]);
        pitch = (Math.atan2(-forward[2], tmp) * 180 / Math.PI);
        if (pitch < 0) pitch += 360;
    }
    
    x = pitch;
    y = yaw;
    z = 0;
    angles = [x, y, z];
    
    return angles;
}

function DEG2RAD(degree) {
    return (Math.PI / 180) * degree;
}

function AnglesVector(angle) {
    pitch = angle[0];
    yaw = angle[1];
    return [Math.cos(DEG2RAD(pitch)) * Math.cos(DEG2RAD(yaw)), Math.cos(DEG2RAD(pitch)) * Math.sin(DEG2RAD(yaw)), -Math.sin(DEG2RAD(pitch))];
}

function getRandomInt(min, max) {
    return Math.floor(getRandomFloat(min, max));
}
function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}
function hitChance(target, hitchance, hitbox){
	target = Entity.GetEnemies()[0];
    maxSeed = 256;
	var start = Entity.GetRenderOrigin(local);
	start[2] = Entity.GetHitboxPosition(local, 0)[2];
    var aimangles = VectorAngles(VectorSubtract(Entity.GetHitboxPosition(target, hitbox), start));

    var hits = 0;
    const hitsNeed = maxSeed * hitchance / 100;

    const weapSpread = Local.GetSpread();
    const weapInaccuracy = Local.GetInaccuracy();

    for (i = 0; i < maxSeed; i++){
        var inaccuracy = getRandomFloat(0, 1);
        var spread = getRandomFloat(0, 1);
        const spreadX = getRandomFloat(0, 3 * Math.PI);
        const spreadY = getRandomFloat(0, 3 * Math.PI);

        inaccuracy *= weapInaccuracy;
        spread *= weapSpread;

        var spreadAngles = [(Math.cos(spreadX) * inaccuracy) + (Math.cos(spreadY) * spread), (Math.sin(spreadX) * inaccuracy) + (Math.sin(spreadY) * spread)];
		aimangles = [aimangles[0] + spreadAngles[0], aimangles[1] + spreadAngles[1]];
        var angles = AnglesVector(aimangles);
		end = [start[0] + angles[0] * 1000, start[1] + angles[1] * 1000, start[2] + angles[2] * 1000];
        var trace = Trace.Bullet(local, target, start, end);
		var w0 = Render.WorldToScreen(start);
		var w1 = Render.WorldToScreen(end);
		//Render.Line(w0[0], w0[1], w1[0], w1[1], [0, 255, 255, 255]);
		
		if (trace[0] == target)
		    hits++;

		if (hits >= hitsNeed)
		    return true;

		if ((maxSeed - i + hits) < hitsNeed)
		    return false;
    }
    return false;
}

function getWeaponGroup(){
	var group = "GENERAL";
	if(!isAlive) return group;
	var w = getWeaponName();
	if(w === "SSG08") group = "SCOUT"
	else if(w === "AWP") group = "AWP";
	switch(w){
		case "G3SG1":
		case "SCAR20":
			group = "AUTO"; break;
		case "Deagle":
		case "Revolver":
			group = "HEAVY PISTOL"; break;
		case "Dualies":
		case "Five Seven":
		case "Glock":
		case "USP":
		case "Tec-9":
		case "P2000":
		case "P250":
		case "CZ-75":
			group = "PISTOL"; break;
	}
	if(!UI.GetValue("Rage", group, "Override default")) group = "GENERAL";
	return group;
}

function isRealInverted() {
	var diff = Local.GetRealYaw() - Local.GetFakeYaw()
	while (diff > 180) diff -= 360;
	while (diff < 180) diff += 360;
	if(isLegitAAActive()) return Math.abs(diff) <= 360;
	else return Math.abs(diff) >= 360;
}

function getAntiaimDelta(){
	return Math.min(Math.abs(Local.GetRealYaw() - Local.GetFakeYaw()) / 2, 60).toFixed(0);
}



function enemies(){
	var enemies = Entity.GetEnemies();
	if(!isAlive) return;
	for(enemy in enemies){
		var enemy = enemies[enemy];
		if(!Entity.IsValid(enemy) || !Entity.IsAlive(enemy)) continue;
		jumpscout(enemy);
		safePoints(enemy);
		autoPeek2(enemy);
	}
}

Global.RegisterCallback("CreateMove", "enemies");

var ragebot_target = 0;
function getRagebotTarget(){
	ragebot_target = Ragebot.GetTarget();
}
Global.RegisterCallback("CreateMove", "getRagebotTarget");
var block_set7 = false;
var force_mindamage_override = false;
var original_mindmg_set = false;
var weapon_groups = ["General", "Pistol", "Heavy Pistol", "Scout", "AWP", "Auto"];
function mindamage(){
	if(!GUI.GetMasterState("Rage", "Min-DMG Override", "Min-damage override")) return;
	var active_group = weapon_groups[GUI.GetValue("Rage", "Min-DMG Override", "Min-DMG weapon groups")];
	mindamage_active = false;
	for(weapon in weapon_groups){
		//Tabbing min-damage sliders
		weapon = weapon_groups[weapon];
		var active = weapon == active_group;
		var mindmg = GUI._MenuElements["Rage"]["Min-DMG Override"];
		var orig = mindmg[weapon + " Original Min-DMGRM"];
		var over = mindmg[weapon + " Override Min-DMGRM"];
		var over2 = mindmg[weapon + " Override 2 Min-DMGRM"];
		var ot_dmg = UI.GetValue("Rage", weapon.toUpperCase(), "Targeting", "Minimum damage");

		//Setting default mindamage
		if(!original_mindmg_set && orig.GetValue() !== 1 && (ot_dmg !== over.Value && ot_dmg !== over2.Value)) orig.SetValue(ot_dmg);
	
		if(active) orig.Flags = over.Flags = over2.Flags &= ~GUI.NOT_VISIBLE;
		else orig.Flags = over.Flags = over2.Flags |= GUI.NOT_VISIBLE;
		

		//Overriding mindamage
		var mindamage = null;
		if (GUI.GetValue("Rage", "Min-DMG", "Force HP + value if HP < Min-DMG")){
			if(ragebot_target && ragebot_target !== null && ragebot_target !== undefined && Entity.IsAlive(ragebot_target)){
				var value = GUI.GetValue("Rage", "Min-DMG", "HP + value");
				if (Entity.GetProp(ragebot_target, 'CBasePlayer', 'm_iHealth') < orig.GetValue()) mindamage = 100 + value;
			}
		}
		if(force_mindamage_override !== false) mindamage = force_mindamage_override;
		if(GUI.IsHotkeyActive("Rage", "Min-DMG Override", "Min-damage override")) mindamage = over.GetValue();
		if (GUI.IsHotkeyActive("Rage", "Min-DMG Override", "Min-damage override 2")) mindamage = over2.GetValue();
		if(mindamage !== null && isAlive){
			mindamage_active = true;
			block_set7 = false;
			UI.SetValue("Rage", weapon.toUpperCase(), "Targeting", "Minimum damage", mindamage);
		}
		else if(!block_set7){
			UI.SetValue("Rage", weapon.toUpperCase(), "Targeting", "Minimum damage", orig.GetValue());
		}
	}

	if(!mindamage_active) block_set7 = true;
	original_mindmg_set = true;
	

}
function isMindamageActive(){
	return isAlive && (GUI.IsHotkeyActive("Rage", "Min-DMG Override", "Min-damage override") || GUI.IsHotkeyActive("Rage", "Min-DMG Override", "Min-damage override 2")) &&
		!~["Knife", "flashbang", "hegrenade", "smokegrenade", "molotov", "decoy", "incgrenade", "C4", "none"].indexOf(getWeaponName());
}
function mindamageGetIndicatorString(){
	return isMindamageActive() ? ("dmg: " + UI.GetValue("Rage", getWeaponGroup(), "Targeting", "Minimum damage")) : "dmg";
}

Global.RegisterCallback("Draw", "mindamage");

function jumpscout(enemy){
	if(isInAir()) Ragebot.ForceTargetHitchance(enemy, 40);
}

var trailpos = []
function trailCreateMove(){
	if(!local || !isAlive) return;
    trailpos.unshift(Entity.GetRenderOrigin(local));
    var length = GUI.GetValue("Visuals", "World", "Length")
    if(trailpos.length > length) trailpos.pop()
}
function renderTrail(){
    if(!isAlive) return
    if(!GUI.GetValue("Visuals", "World", "Trail")) return
	if(trailpos.length < 1) return
    var first = true, last = []
    var color = GUI.GetColor("Visuals", "World", "Trail");
    var rgb = GUI.GetValue("Visuals", "World", "Rainbow");
    for(i in trailpos){
        var w2s = Render.WorldToScreen(trailpos[i])
        if(rgb) rgbcolor = GUI.Colors.HSVToRGB([Globals.Realtime() + (i / 200) % 1, 1, 1]), rgbcolor[3] = color[3], color = rgbcolor;
        if(!first) Render.Line(w2s[0], w2s[1], last[0], last[1], color);
        first = false
        last = w2s
    }
}
Cheat.RegisterCallback("Draw", "renderTrail")
Cheat.RegisterCallback("CreateMove", "trailCreateMove")

function partyZeus(){
	if(GUI.GetValue("Visuals", "World", "Party Zeus")){
	Convar.SetString("sv_party_mode", "1")
    }else{
    Convar.SetString("sv_party_mode", "0")
    }
}

Cheat.RegisterCallback("CreateMove", "partyZeus")

function rainbowLine(){
	if(!GUI.GetValue("Visuals", "World", "Rainbow Line")) return;
	var c = GUI.Colors.HSVToRGB(Globals.Realtime() * 0.4, 1, 1);
	var height = GUI.GetValue("Visuals", "World", "Height");
	Render.GradientRect(0, 0, ScreenSize[0] / 2, height, 1, [c[2], c[1], c[0], 255], [c[0], c[1], c[2], 255]);
	Render.GradientRect(ScreenSize[0] / 2, 0, ScreenSize[0]/2, height, 1, [c[0], c[1], c[2], 255], [c[1], c[0], c[2], 255]);
}

Global.RegisterCallback("Draw", "rainbowLine")

var legbreaker_delay = 0;
var fakelag_leg = false;
function legbreaker(){
	if(!isAlive || (GUI.GetValue("Anti-Aim", "Fake Lag", "Static legs") && !exploitsActive("all"))) return;
	if(!GUI.GetValue("Anti-Aim", "Other", "Legbreaker")) return;
	if (UI.GetValue("Misc", "GENERAL", "Movement", "Accurate walk")) UI.SetValue("Misc", "GENERAL", "Movement", "Accurate walk", 0);
	if(legbreaker_delay++ > GUI.GetValue("Anti-Aim", "Other", "Legbreaker speed")){
		UI.SetValue("Misc", "GENERAL", "Movement", "Slide walk", (UI.GetValue("Misc", "GENERAL", "Movement", "Slide walk") === 0));
		legbreaker_delay = 0;
	}
}
Global.RegisterCallback("CreateMove", "legbreaker");

var yaw_bak = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset");
var jitter_bak = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset");
var block_set = false;
var lowdelta_active = false;
function lowdelta(){
	if(!isAlive || legit_aa_active) return;
	if(!GUI.IsHotkeyActive("Anti-Aim", "General", "Lowdelta")){
		lowdelta_active = false;
		if(!block_set){
			AntiAim.SetOverride(0);
			UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", yaw_bak);
			UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", jitter_bak);
			block_set = true;
		}
		yaw_bak = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset");
		jitter_bak = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset");
		return;
	}
	block_set = false;
	lowdelta_active = true;
	UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", 0);
	UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", 0);
	inv = (isInverted() && 1 || -1)
	AntiAim.SetOverride(1);
	AntiAim.SetRealOffset(20 * inv);
	AntiAim.SetLBYOffset(-18 * inv);
}

Global.RegisterCallback("CreateMove", "lowdelta");

function safePointsHitboxes(){
	var h = GUI.GetValue("Rage", "General", "Safe point hitboxes");
	var s = Ragebot.ForceHitboxSafety;
	if (h & (1 << 0)) s(0)
	if (h & (1 << 1)) s(3)
	if (h & (1 << 2)) s(5), s(6)
	if (h & (1 << 3)) s(9), s(10)
	if (h & (1 << 4)) s(11), s(12)
}

Global.RegisterCallback("CreateMove", "safePointsHitboxes");

function safePoints(enemy){
	if(GUI.GetDropdownValue("Rage", "General", "Safe point conditions", "Slowwalking")){
		var vel = getVelocity(enemy);
		if(vel > 10 && vel < 125) Ragebot.ForceTargetSafety(enemy);
	}
	if(GUI.GetDropdownValue("Rage", "General", "Safe point conditions", "Lethal")){
		//IsLethal is broken now, so...
		var w = getWeaponName();
		var h = Entity.GetProp(enemy, "CBasePlayer", "m_iHealth");
		if(	w == "SSG08" 	&& h <= 90 	||
			w == "Deagle" 	&& h <= 40 	||
			w == "Revolver" && h <= 50 	||
			w == "SCAR20" 	&& h <= 50 	||
			w == "G3SG1" 	&& h <= 50) Ragebot.ForceTargetSafety(enemy);
	}
}

function safeAWP(){
	if(!isAlive) return;
	if(GUI.GetDropdownValue("Rage", "General", "Safe point conditions", "On AWP")) return;
	if(getWeaponName() === "AWP") for(i = 0; i <= 12; i++) Ragebot.ForceHitboxSafety(i);
}

Global.RegisterCallback("CreateMove", "safeAWP");

function menuAccent(){
	var accent = GUI.GetColor("Visuals", "GUI", "Menu accent/scale");
	if (accent + "" == [0, 0, 0, 0] + "") GUI.SetColor("Visuals", "GUI", "Menu accent/scale", GUI.Colors.ActiveElement);
	accent = GUI.GetColor("Visuals", "GUI", "Menu accent/scale");	
	if(GUI.Colors.ActiveElement !== accent) GUI.Colors.ActiveElement = accent;
}

Global.RegisterCallback("Draw", "menuAccent");

function isSlowwalking(){
	return UI.IsHotkeyActive("Anti-Aim", "Extra", "Slow walk");
}
function isFD(){
	return UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck");
}
function isInverted() {
	return UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter");
}
function isAutopeeking(){
	return UI.IsHotkeyActive("Misc", "GENERAL", "Movement", "Auto peek");
}

function slowwalk(){
	if(!GUI.GetValue("Anti-Aim", "Slowwalk", "Custom slowwalk")) return;
	if(!World.GetServerString()) return;
	if(!isSlowwalking()) return;
	if (UI.GetValue("Misc", "GENERAL", "Movement", "Accurate walk")) UI.SetValue("Misc", "GENERAL", "Movement", "Accurate walk", 0);
	//if(UI.IsHotkeyActive("Visual", "SELF", "Freecam", "Enable")) return;
	var slowwalk_jitter = GUI.GetValue("Anti-Aim", "Slowwalk", "Slowwalk jitter");
	var slowwalk_speed = GUI.GetValue("Anti-Aim", "Slowwalk", "Slowwalk speed");
	if(slowwalk_jitter) slowwalk_speed += 10;
	var speed = (slowwalk_speed * (((getVelocity(local) >= slowwalk_speed) && slowwalk_jitter) ? -1 : 1));
	var dir = [0, 0, 0];
	//if(exploitsActive("all") && ChokedCommands() == 1){
	//	UserCMD.SetMovement([-1, 0, 0]);
	//	UI.SetValue("Misc", "GENERAL", "Movement", "Slide walk", 1);
	//	return;
	//}
	if(Input.IsKeyPressed(0x57)) dir[0] += speed;
	if(Input.IsKeyPressed(0x44)) dir[1] += speed;
	if(Input.IsKeyPressed(0x41)) dir[1] -= speed
	if(Input.IsKeyPressed(0x53)) dir[0] -= speed;
	UserCMD.SetMovement(dir);
}

Global.RegisterCallback("CreateMove", "slowwalk");

function worldBrightness(){
	var brightness = GUI.GetValue("Visuals", "World", "World brightness");
	if(brightness < 0){
		brightness = 1 / Math.abs(brightness / 2);
	}
	if(Convar.GetString("mat_force_tonemap_scale") != brightness){
		Convar.SetString("mat_force_tonemap_scale", brightness + "");
	}
}

Global.RegisterCallback("CreateMove", "worldBrightness");

function aspectRatio(){
	Convar.SetString("r_aspectratio", (GUI.GetValue("Visuals", "Other", "Aspect ratio") / 100).toString());
}

Global.RegisterCallback("Draw", "aspectRatio");

var thirdperson = 0, thirdperson_turned = 1;
function customThirdperson(){
	if(!GUI.GetValue("Visuals", "Other", "Better 3rd person")) return;
    var thirdperson_cache = GUI.GetValue("Visuals", "Other", "Thirdperson distance"),
    hotkey_state = GUI.IsHotkeyActive("Misc", "Keybinds fixer", "Thirdperson"),
    fade_factor = (((1 * (thirdperson_cache / 100))) / .0025) * Globals.Frametime()
    if(hotkey_state && thirdperson != 1 && isAlive)
	thirdperson = Clamp(thirdperson - fade_factor, 49, thirdperson_cache)
    if(!hotkey_state && thirdperson != 0 || !isAlive)
	thirdperson = Clamp(thirdperson + fade_factor, 49, thirdperson_cache)
    if(hotkey_state && thirdperson == 49 && thirdperson_turned) {
        UI.ToggleHotkey("Visuals", "WORLD", "View", "Thirdperson")
        thirdperson_turned = 0
    }

    if(!hotkey_state && thirdperson > 49 && !thirdperson_turned) {
        UI.ToggleHotkey("Visuals", "WORLD", "View", "Thirdperson")
        thirdperson_turned = 1
    }

    if(thirdperson_turned && !UI.IsHotkeyActive("Visuals", "WORLD", "View", "Thirdperson") || !thirdperson_turned && UI.IsHotkeyActive("Visuals", "WORLD", "View", "Thirdperson"))
        UI.ToggleHotkey("Visuals", "WORLD", "View", "Thirdperson")
    if(thirdperson != 0) UI.SetValue("Visuals", "WORLD", "View", "Thirdperson", thirdperson);
}

Global.RegisterCallback("CreateMove", "customThirdperson");

var noscope_dist = {
	"SSG08": 5,
	"SCAR20": 7,
	"G3SG1" : 7,
	"AWP" : 4
}
var stop_attack2 = false;
function autoscope(){
	if(stop_attack2){
		stop_attack2 = false;
		Cheat.ExecuteCommand("-attack2");
	}
	var weapon = getWeaponName();
	if(GUI.GetValue("Rage", "General", "Adaptive noscope")){
		if((weapon !== "SSG08" && weapon !== "SCAR20" && weapon !== "G3SG1" && weapon !== "AWP") || isInAir()) return;
		if(!ragebot_target)
			var noscope_target = closestTarget();
		else
			var noscope_target = ragebot_target;
		if(!Entity.IsAlive(noscope_target)){
			UI.SetValue("Rage", "GENERAL", "General", "Auto scope", 1);
			return;
		}
		if(getMetricDistance(Entity.GetRenderOrigin(local), Entity.GetRenderOrigin(noscope_target)) < noscope_dist[weapon]){
			UI.SetValue("Rage", "GENERAL", "General", "Auto scope", 0);
		}
		else{
			UI.SetValue("Rage", "GENERAL", "General", "Auto scope", 1);
		}
	}
	if(GUI.GetValue("Rage", "General", "Faster autoscope")){
		switch(weapon){
			case "SSG08":
			case "SCAR20":
			case "G3SG1":
			case "AWP":
				break;
			default:
				return;
		}
		var enemies = Entity.GetEnemies();
		var local_pos = ExtrapolateTick(local, 15, 0);
		var auto_scope = false;
		var is_scoped = Entity.GetProp(local, "CCSPlayer", "m_bIsScoped");
		for(var i = 0; i < enemies.length;i++){
			var enemy = enemies[i];
			if (!Entity.IsAlive(enemy) || Entity.IsDormant(enemy) || !Entity.IsValid(enemy)) continue;
			var pos = Entity.GetHitboxPosition(enemy, 2)
			var result = Trace.Bullet(local, enemy, local_pos, pos);
			if(result[1] > 1){ // aka damage
				if(getMetricDistance(Entity.GetRenderOrigin(local), Entity.GetRenderOrigin(enemy)) > noscope_dist[getWeaponName()]){
					auto_scope = true;
					break;
				}
			}
		}
		if(!is_scoped && auto_scope && !stop_attack2 && canShoot(local)){
    		Cheat.ExecuteCommand("+attack2");
    		stop_attack2 = true;
    	}
	}
}

Global.RegisterCallback("CreateMove", "autoscope");

function doubletap(){
	if(!isAlive || ragebot_target) return;
	if (!GUI.GetValue("Rage", "Doubletap", "Recharge speed") || getWeaponName() === "Revolver") return Exploit.EnableRecharge();
	//var enemies = Entity.GetEnemies();

	//Don't recharge if enemy is visible
	//for (enemy in enemies) if(Trace.Bullet(local, enemies[enemy], Entity.GetHitboxPosition(local, 0), Entity.GetHitboxPosition(enemies[enemy], 4))[1] > 0) return Exploit.DisableRecharge();
	var charge = Exploit.GetCharge();

	(charge != 1) ? Exploit.EnableRecharge() : Exploit.DisableRecharge();
	if (can_shift_shot(GUI.GetValue("Rage", "Doubletap", "Recharge ticks")) && charge != 1) {
		Exploit.DisableRecharge();
		Exploit.Recharge();
	}
}

Global.RegisterCallback("CreateMove", "doubletap");

var block_set2 = true;
var autopeek_active = false;
var freestanding_bak = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Auto direction");
function autopeek(){
	if(!isAlive){if(Globals.Tickcount() > hideshots_enable_time) hideshots_enable_time = hideshots_enable_time = false; return;}
	if(!GUI.GetValue("Rage", "General", "Auto peek helper")) return;
	autopeek_active = isAutopeeking();
	var dt = GUI.GetDropdownValue("Rage", "General", "Auto peek settings", "Enable Hide shots");
	if(hideshots_enable_time !== false && isAutopeeking()){
		var enabled = Globals.Tickcount() > hideshots_enable_time;
		if (UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Hide shots") && !enabled) UI.ToggleHotkey("Rage", "GENERAL", "Exploits", "Hide shots");
		GUI.OverrideState("Misc", "Keybinds fixer", "Hide shots", enabled);
		if(exploitsActive("hs")) hideshots_enable_time = false;
	}
	if(autopeek_active){
		block_set2 = false;
		if(GUI.GetDropdownValue("Rage", "General", "Auto peek settings", "Decrease min-dmg") && getWeaponName() !== "AWP") force_mindamage_override = 1;
		UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Auto direction", 1);
		if(!dt) return;
		if (!UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Hide shots")) UI.ToggleHotkey("Rage", "GENERAL", "Exploits", "Hide shots");
		GUI.OverrideState("Misc", "Keybinds fixer", "Hide shots", true);
	}
	else{
		if(!block_set2){
			force_mindamage_override = false;
			if (UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Hide shots") && dt) UI.ToggleHotkey("Rage", "GENERAL", "Exploits", "Hide shots");
			//GUI.OverrideState("Misc", "Keybinds fixer", "Doubletap", false);
			UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Auto direction", freestanding_bak);
			block_set2 = true;
			return;
		}
		freestanding_bak = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Auto direction");
		return;
	}
}

function autoPeek2(enemy){
	if(!autopeek_active) return;
	Ragebot.ForceTargetSafety(enemy);
}

Global.RegisterCallback("Draw", "autopeek");

function staticLegs(){
	if(!isAlive) return;
	if (!GUI.GetValue("Anti-Aim", "Fake Lag", "Static legs") || Input.IsKeyPressed(0x20) || isInAir() || exploitsActive("all")) return;
	var fakelag = GUI.GetValue("Anti-Aim", "Fake Lag", "Fake lag choke");
	UI.SetValue("Anti-Aim", "Fake-Lag", "Jitter", 0);
	UI.SetValue("Anti-Aim", "Extra", "Jitter move", 0);
	UI.SetValue("Misc", "GENERAL", "Movement", "Accurate walk", 0);
	var mov = [0, 0, 0];
	var breakmode = GUI.GetValue("Anti-Aim", "Fake Lag", "Slide break mode");
	if(breakmode) m = UserCMD.GetMovement(), mov = [-m[0] * 1.5, -m[1] * 1.5, -m[2]];
	switch (Globals.Tickcount() % fakelag) {
		case 0:
			UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", fakelag);
			UI.SetValue("Misc", "GENERAL", "Movement", "Slide walk", (1 * +!breakmode));
			break;
		case fakelag - 1:
			UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", 0);
			UI.SetValue("Misc", "GENERAL", "Movement", "Slide walk", 1);
			UserCMD.SetMovement(mov);
			break;
	}
}
Global.RegisterCallback("CreateMove", "staticLegs");

var preset3_yaw = -18;
function aaPresets() {
	var preset = GUI.GetValue("Anti-Aim", "AA Presets", "Preset");
	if (!preset || lowdelta_active || legit_aa_active || (GUI.GetValue("Anti-Aim", "General", "No desync on DT") && exploitsActive("dt"))) return;
	AntiAim.SetOverride(1);
	var inv = isInverted() && 1 || -1;
	if(preset === 1){
		AntiAim.SetOverride(1);
		var state = Globals.Tickcount() % 3;
		var desync = 40;
		if (state) desync *= -1;
		AntiAim.SetRealOffset(-desync);
		AntiAim.SetFakeOffset(desync / 2);
		AntiAim.SetLBYOffset(0);
	}
	if (preset === 2) {
		var desync = (Globals.Tickcount() % 48) * inv;
		var yaw = Math.floor(desync / 2)
		AntiAim.SetRealOffset(desync);
		AntiAim.SetFakeOffset(-yaw);
		AntiAim.SetLBYOffset(0);
	}
	if(preset === 3){
        if (preset3_yaw > 18) preset3_yaw = -18; else preset3_yaw += 1.5;
		AntiAim.SetRealOffset(60 * inv);
		AntiAim.SetFakeOffset(preset3_yaw * inv);

	}
}

Global.RegisterCallback("CreateMove", "aaPresets");

function shittymanual(){
if(!GUI.GetValue("Visuals", "GUI", "Manuals")) return;
	isleft = GUI.IsHotkeyActive("Anti-Aim", "General", "left manual")
	isright = GUI.IsHotkeyActive("Anti-Aim", "General", "right manual")
	arrow = GUI.GetColor("Visuals", "GUI", "Manuals")
	inver = GUI.GetColor("Visuals", "GUI", "Active inverter")
	arrown = [10, 10, 10, 118]
	var local_player = Entity.GetLocalPlayer();
	if (Entity.IsAlive(local_player)) {
		var a = 30, b = 44;
		Render.Polygon([
				[ScreenSize[0] / 2 + a, ScreenSize[1] / 2 - 7],
				[ScreenSize[0] / 2 + b, ScreenSize[1] / 2],
				[ScreenSize[0] / 2 + a, ScreenSize[1] / 2 + 7]
			], isright ? [arrow[0], arrow[1], arrow[2], arrow[3]] : arrown),
		Render.Polygon([
				[ScreenSize[0] / 2 - a, ScreenSize[1] / 2 + 7],
				[ScreenSize[0] / 2 - b, ScreenSize[1] / 2],
				[ScreenSize[0] / 2 - a, ScreenSize[1] / 2 - 7]
			], isleft ? [arrow[0], arrow[1], arrow[2], arrow[3]] : arrown)
		Render.FilledRect(ScreenSize[0] / 2 - 28, ScreenSize[1] / 2 - 6, 2, 13, isRealInverted() ? inver : arrown);
		Render.FilledRect(ScreenSize[0] / 2 + 26, ScreenSize[1] / 2 - 6, 2, 13, isRealInverted() ? arrown : inver);
	}
}

Cheat.RegisterCallback("Draw", "shittymanual")

var original_aa = true

function manual_aa() {
	left = GUI.IsHotkeyActive("Anti-Aim", "General", "left manual")
	right = GUI.IsHotkeyActive("Anti-Aim", "General", "right manual")
    var manualyaw = right ? 90 : left ? -90 : 0
    if (right || left) {
        if (original_aa) {
            yaw_offset_cache = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset");
			attarget_cache = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "At targets");
            original_aa = false;
        }
		UI.SetValue("Anti-Aim", "Rage Anti-Aim", "At targets", false);
        UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", manualyaw);
    }
    else {
        if (!original_aa) {
            UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", yaw_offset_cache);
			UI.SetValue("Anti-Aim", "Rage Anti-Aim", "At targets", attarget_cache);
            original_aa = true;
        }
    }
}

Cheat.RegisterCallback("CreateMove", "manual_aa")

var legit_aa_active = false;
var block_set3, block_set4, use_active = false;
var pitch_bak = UI.GetValue("Anti-Aim", "Extra", "Pitch");
var restrictions_bak = UI.GetValue("Misc", "PERFORMANCE & INFORMATION", "Information", "Restrictions");
var at_targets_bak = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "At targets");
function legitAA(){
	if(!isAlive) return;
	if(!GUI.GetValue("Anti-Aim", "General", "Legit AA on E")) return;
	function use() { Cheat.ExecuteCommand("+use"); use_active = true; }
	if (Input.IsKeyPressed(69)) {
		legit_aa_active = true;
		block_set3 = false;
		block_set4 = false;
		Cheat.ExecuteCommand("-use");
		AntiAim.SetOverride(1);
		UI.SetValue("Misc", "PERFORMANCE & INFORMATION", "Information", "Restrictions", 0);
		UI.SetValue("Anti-Aim", "Extra", "Pitch", 0);
		UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", 180);
		UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", 0);
		UI.SetValue("Anti-Aim", "Rage Anti-Aim", "At targets", 0)
		var fake_direction = UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter") == 1 ? 1 : -1;
		if (UI.GetValue("Anti-Aim", "Fake angles", "Fake desync")) fake_direction = fake_direction * -1;
		var real_yaw_offset = 60 * fake_direction;
		var lower_body_offset = -60 * fake_direction;
		var current_fake_yaw = Local.GetFakeYaw();
		var current_real_yaw = Local.GetRealYaw();
		if (Math.abs(angle_diff(current_fake_yaw, current_real_yaw)) > 100) lower_body_offset = 180;
		AntiAim.SetFakeOffset(0);
		AntiAim.SetRealOffset(real_yaw_offset);
		AntiAim.SetLBYOffset(lower_body_offset);
		if (getWeaponName() == "C4") return use();
		var eyepos = Entity.GetEyePosition(local);
		var C4 = Entity.GetEntitiesByClassID(129);
		if (C4 && C4[0] !== undefined && calcDist(Entity.GetRenderOrigin(C4[0]), eyepos) <= 100) return use();
		var hostages = Entity.GetEntitiesByClassID(97);
		if (hostages && hostages.length > 0) for (hostage in hostages) if (calcDist(Entity.GetRenderOrigin(hostages[hostage]), eyepos) <= 100) return use();
	}
	else {
		legit_aa_active = false;
		if (!lowdelta_active) {
			if (!block_set4) {
				UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", yaw_bak);
				UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", jitter_bak);
				block_set4 = true;
			}
			yaw_bak = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset");
			jitter_bak = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset");
		}
		if (!block_set3) {
			AntiAim.SetOverride(0);
			UI.SetValue("Anti-Aim", "Extra", "Pitch", pitch_bak);
			UI.SetValue("Misc", "PERFORMANCE & INFORMATION", "Information", "Restrictions", restrictions_bak);
			UI.SetValue("Anti-Aim", "Rage Anti-Aim", "At targets", at_targets_bak)
			block_set3 = true;
		}
		pitch_bak = UI.GetValue("Anti-Aim", "Extra", "Pitch");
		restrictions_bak = UI.GetValue("Misc", "PERFORMANCE & INFORMATION", "Information", "Restrictions");
		at_targets_bak = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "At targets");
		if (use_active) {
			Cheat.ExecuteCommand("-use");
			use_active = false;
		}
	}
}

Global.RegisterCallback("CreateMove", "legitAA");


function isLegitAAActive(){
	return legit_aa_active;
}

var last_inverter = false;
function autoInvert() {
	if(!GUI.GetValue("Anti-Aim", "General", "Auto invert") || legit_aa_active) return;
	if (UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter") && last_inverter) UI.ToggleHotkey("Anti-Aim", "Fake angles", "Inverter");
	GUI.OverrideState("Misc", "Keybinds fixer", "Inverter", !last_inverter)
	last_inverter = !last_inverter;
}

Global.RegisterCallback("Draw", "autoInvert");

var logs = [];

const log = function(text, time){
    this.text = text
    this.time = time
}

const hitboxes = [ "generic", "head", "chest", "stomach", "left arm", "right arm", "left leg", "right leg", "body" ];

const get_hitbox = function(i){ return hitboxes[i] || "Generic" };

function hitlogs(){
    const uid = Entity.GetEntityFromUserID(Event.GetInt("userid"));
    const attacker = Entity.GetEntityFromUserID(Event.GetInt("attacker"));
    const text = "hurt " + Entity.GetName(uid) + " for " + Event.GetInt("dmg_health") + " in " + get_hitbox(Event.GetInt("hitgroup"));

    if(Entity.IsLocalPlayer(attacker) && attacker != uid) logs.push(new log(text, Globals.Tickcount()));
}

function drawhurt(){
    const font = Render.AddFont("Calibri", 10, 100);
	if(!GUI.GetValue("Visuals", "GUI", "Hitlogs under crosshair")) return;
    for (var i in logs){
        Render.StringCustom(ScreenSize[0] /2, ScreenSize[1] /2 + 190 - (i * -15), 1, logs[i].text, GUI.GetColor("Visuals", "GUI", "Hitlogs under crosshair"), font);
        if (logs[i].time + 300 < Globals.Tickcount() || logs.length > 6) logs.shift();
    }
}

Cheat.RegisterCallback("Draw", "drawhurt");
Cheat.RegisterCallback("player_hurt", "hitlogs");

var mm_fakeduck_active = false;
var fd_crouch = true;
function mmFakeduck(){
	if(!isAlive) return;
	return;
	//if(!GUI.GetValue("Anti-Aim", "Matchmaking FD", "Matchmaking FD")) return;
	var buttons = UserCMD.GetButtons();
	if (!isFD()){
		mm_fakeduck_active = false;
		UserCMD.SetButtons(buttons | (1 << 22));
		return;
	}
	mm_fakeduck_active = true;
	var duckAmount = Entity.GetProp(local, "CCSPlayer", "m_flDuckAmount");
	var maxLevel = 31;
	UserCMD.Choke();
	if(duckAmount <= maxLevel / 100){
		fd_crouch = true;
	}
	if(duckAmount >= 0.8){
		fd_crouch = false;
		UserCMD.Send();
	}
	if(fd_crouch){
		UserCMD.SetButtons(buttons | (1 << 2));
	} else {
		UserCMD.SetButtons(buttons | (1 << 22));
	}
	return;
	eyePos = Entity.GetEyePosition(local);
	origin = Entity.GetRenderOrigin(local);
	eyePos[2] = origin[2] + 46 + (18 - (maxLevel + 1) / 100 * 18);
	cameraPos = Local.GetCameraPosition();
	if(!Input.IsKeyPressed(0x11)){
		if(UI.GetValue(["Misc.", "Keys", "General", "Key assignment", "Thirdperson"]) == 1){
			angles = Local.GetViewAngles();
			angles[0] = angles[0] * -1;
			if(angles[1] > 0){
				angles[1] = angles[1] - 180;
			}
			else{
				angles[1] = 180 + angles[1];
			}
			back = getWallDistance(local, angles);
			angles = ANGLE2VEC(angles);
			thirdDistance = (GUI.GetValue("Visuals", "Extra", "Custom thirdperson") ? GUI.GetValue("Visuals", "Extra", "Thirdperson distance") : UI.GetValue(["Misc.", "View", "General", "Thirdperson Distance"]));
			if(back < thirdDistance){
				thirdDistance = back - 10;
			}
			Local.SetCameraPosition([eyePos[0] + angles[0] * thirdDistance, eyePos[1] + angles[1] * thirdDistance, eyePos[2] + angles[2] * thirdDistance]);
		}
		else{
			Local.SetCameraPosition([eyePos[0], eyePos[1], eyePos[2]]);
		}
	}
}

Global.RegisterCallback("CreateMove", "mmFakeduck");

function noFakelag(){
	if(!isAlive) return;
	var weapon = getWeaponName();
	if(legit_aa_active) return;
	if(GUI.GetValue("Anti-Aim", "Fake Lag", "No fake lag on revolver")){
		if(weapon === "Revolver"){
			UserCMD.Send();
		}
	}
	if(GUI.GetValue("Anti-Aim", "Fake Lag", "No fake lag on nades")){
		if(~(["flashbang", "hegrenade", "smokegrenade", "molotov", "decoy", "incgrenade"].indexOf(weapon))){
			UserCMD.Send();
		}
	}
}

Global.RegisterCallback("CreateMove", "noFakelag");

function betterAutoStrafer(){
	if (!GUI.GetValue("Misc", "General", "Better autostrafer")) return;
	if (!isAlive) return;
	var speed = Clamp(Convar.GetString("sv_airaccelerate") * 12);
	UI.SetValue("Misc", "GENERAL", "Movement", "Turn speed", speed, 100, 400);
	if(!GUI.GetValue("Misc", "General", "Auto crouch in air") || speed < 400) return;
	UI.SetValue("Misc", "GENERAL", "Movement", "Crouch in air", (+!(Entity.GetProp(local, 'CBasePlayer', 'm_fFlags') & 1) && getVelocity(local) > 200));
}

Global.RegisterCallback("CreateMove", "betterAutoStrafer");

//Better scope
var block_set6 = false;
var betterScopeActive = false;
function betterScope() {
	if (!GUI.GetValue("Visuals", "Other", "Better scope") || !isAlive) return;
	var scoped = Entity.GetProp(local, 'DT_CSPlayer', 'm_bIsScoped');
	if (!isAlive || !World.GetServerString() || !scoped) return;
	var startX = Math.floor(ScreenSize[0] / 2 + 1);
	var startY = Math.floor(ScreenSize[1] / 2 + 1);
	var sizeX = GUI.GetValue("Visuals", "Other", "Better scope length");
	var sizeY = GUI.GetValue("Visuals", "Other", "Better scope weight");
	var off = Math.floor(sizeX / 2 + GUI.GetValue("Visuals", "Other", "Better scope offset"));
	var c2 = GUI.GetColor("Visuals", "Other", "Better scope");
	var c1 = [c2[0], c2[1], c2[2], 0];
	if(GUI.GetValue("Visuals", "Other", "Reversed gradient")){
		var temp = [].concat(c2);
		c2 = c1;
		c1 = temp;
	}
	renderScopeLine(startX - off, startY, sizeX, sizeY, 1, c1, c2);
	renderScopeLine(startX + off, startY, sizeX, sizeY, 1, c2, c1);
	renderScopeLine(startX, startY - off, sizeY, sizeX, 0, c1, c2);
	renderScopeLine(startX, startY + off, sizeY, sizeX, 0, c2, c1);
}
function betterScope2() {
	if (!GUI.GetValue("Visuals", "Other", "Better scope")) return;
	if (Cheat.FrameStage() != 5) return;
	if (!isAlive || !World.GetServerString()) {
		Convar.SetFloat("r_drawvgui", 1);
		block_set6 = false;
		return;
	}
	var scoped = Entity.GetProp(local, 'DT_CSPlayer', 'm_bIsScoped');
	UI.SetValue("Visual", "WORLD", "View", "FOV while scoped", /*UI.IsHotkeyActive("Visual", "WORLD", "View", "Thirdperson")*/false);
	UI.SetValue("Visual", "WORLD", "Entities", "Removals", UI.GetValue("Visual", "WORLD", "Entities", "Removals") &~ (1 << 2));
	if (scoped) {
		betterScopeActive = true;
		Convar.SetString("r_drawvgui", "0");
		if (!block_set6) {
			Cheat.ExecuteCommand("fov_cs_debug 90");
			block_set6 = true;
		}
	}
	else {
		betterScopeActive = false;
		block_set6 = false;
		Convar.SetString("r_drawvgui", "1");
	}
}
Global.RegisterCallback("Draw", "betterScope");
Global.RegisterCallback("FrameStageNotify", "betterScope2");

var lines = []
var hits = []
var pmolotov = []
var tracer_lines = []
var nade_id = 1

const vectorDistance = function (vec, vec2) {
	dx = vec[0] - vec2[0]
	dy = vec[1] - vec2[1]
	dz = vec[2] - vec2[2]
	return Math.abs(Math.sqrt(dx * dx + dy * dy + dz * dz));
}

function radians_to_degrees(radians) { return radians * (180 / Math.PI); }

function grenade_warning_tick() {
	if (!GUI.GetValue("Visuals", "World", "Nade prediction") || !isAlive) return;
	entities = Entity.GetEntitiesByClassID(9).concat(Entity.GetEntitiesByClassID(114));
	for (var i = 0; i < entities.length; i++) {
		entity = entities[i]
		if (Entity.GetProp(entity, 'CBaseCSGrenadeProjectile', 'm_nExplodeEffectTickBegin') == 0) {
			Entity.SetProp(entity, "CBaseCSGrenadeProjectile", "m_nBody", Entity.GetProp(entity, "CBaseCSGrenadeProjectile", "m_nBody") + 1)
		}
	}
	if (entities.length == 0) lines = [], pmolotov = [], hits = [];
	entities = Entity.GetEntitiesByClassID(9)
	for (var i = 0; i < entities.length; i++) {
		entity = entities[i]
		var vel = Entity.GetProp(entity, 'CBaseGrenade', 'm_vecVelocity');
		if (Entity.GetProp(entity, 'CBaseCSGrenadeProjectile', 'm_flAnimTime') != Math.round(vel[0]) && Entity.GetProp(entity, 'CBaseCSGrenadeProjectile', 'm_nExplodeEffectTickBegin') == 0) {
			Entity.SetProp(entity, 'CBaseCSGrenade', 'm_flAnimTime', Math.round(vel[0]))
			var mx = vel[0] * 0.015, my = vel[2] * 0.015, mz = vel[1] * 0.015
			Entity.SetProp(entity, 'CBaseCSGrenadeProjectile', "m_nForceBone", nade_id)
			nade_id++
			var x = Entity.GetProp(entity, 'CBaseCSGrenadeProjectile', 'm_vecOrigin')[0]
			var y = Entity.GetProp(entity, 'CBaseCSGrenadeProjectile', 'm_vecOrigin')[2]
			var z = Entity.GetProp(entity, 'CBaseCSGrenadeProjectile', 'm_vecOrigin')[1]
			var hittable = false
			for (var i = 0; i < 109 - Entity.GetProp(entity, "CBaseCSGrenadeProjectile", "m_nBody"); i++) {
				my = my - 0.0712
				var hit = []
				var hitbox = [
					[[x - 2, z - 2, y - 2], [x + mx - 2, z + mz - 2, y + my - 2]],
					[[x - 2, z - 2, y + 2], [x + mx - 2, z + mz - 2, y + my + 2]],
					[[x + 2, z + 2, y - 2], [x + mx + 2, z + mz + 2, y + my - 2]],
					[[x + 2, z + 2, y + 2], [x + mx + 2, z + mz + 2, y + my + 2]]
				];
				for (var v = 0; v < hitbox.length; v++) {
					var h = hitbox[v]
					var res = 0
					res = Trace.Line(entity, h[0], h[1])[1]
					if (res != 1) {
						var ny = h[0][2] + 10, nx = h[1][0], nz = h[1][1], fny = h[0][2], fnx = h[1][0], fnz = h[1][1]
						vres = Trace.Line(entity, [fnx, fnz, fny], [nx, nz, ny])[1]
						var start = [x, z, y]
						var end = [x - mx, z - mz, y - 30]
						vres1 = Trace.Line(entity, start, end)[1]
						if (vres == 1 && vres1 == 1) {
							hittable = true
							hit = [x + mx * (res), z + mz * (res), y + my * (res)]
							break;
						} else {
							my = my * -0.45, mx = mx * 0.45, mz = mz * 0.45;
							break
						}
					}
				}
				if (hit.length > 1) {
					hits.push([[hit[0], hit[1], hit[2]], Globals.Tickcount() + i, false, Entity.GetProp(entity, 'CBaseCSGrenadeProjectile', 'm_flAnimTime'), Globals.Tickcount()]);
					break;
				}
				lines.push([[x, z, y], [x + mx, z + mz, y + my], Globals.Tickcount() + i, Entity.GetProp(entity, 'CBaseCSGrenadeProjectile', 'm_flAnimTime')]);
				x = x + mx, y = y + my, z = z + mz
			}
			if (!hittable) hits.push([[x, z, y], Globals.Tickcount() + i, false, Entity.GetProp(entity, 'CBaseCSGrenadeProjectile', 'm_flAnimTime'), Globals.Tickcount()])
		}
	}
	entities = Entity.GetEntitiesByClassID(114)
	for (var i = 0; i < entities.length; i++) {
		entity = entities[i]

		var vel = Entity.GetProp(entity, 'CBaseGrenade', 'm_vecVelocity');
		if (Entity.GetProp(entity, 'CBaseCSGrenadeProjectile', 'm_flAnimTime') != Math.round(vel[0]) && Entity.GetProp(entity, 'CBaseCSGrenadeProjectile', 'm_nExplodeEffectTickBegin') == 0) {
			Entity.SetProp(entity, 'CBaseCSGrenade', 'm_flAnimTime', Math.round(vel[0]))
			var mx = vel[0] * 0.015, my = vel[2] * 0.015, mz = vel[1] * 0.015
			Entity.SetProp(entity, 'CBaseCSGrenadeProjectile', "m_nForceBone", nade_id)
			nade_id++

			var x = Entity.GetProp(entity, 'CBaseCSGrenadeProjectile', 'm_vecOrigin')[0]
			var y = Entity.GetProp(entity, 'CBaseCSGrenadeProjectile', 'm_vecOrigin')[2]
			var z = Entity.GetProp(entity, 'CBaseCSGrenadeProjectile', 'm_vecOrigin')[1]
			var hittable = false
			for (var i = 0; i < 130 - Entity.GetProp(entity, "CBaseCSGrenadeProjectile", "m_nBody"); i++) {
				my = my - 0.0712
				var hit = []
				var hitbox = [
					[[x - 2, z - 2, y - 2], [x + mx - 2, z + mz - 2, y + my - 2]],
					[[x - 2, z - 2, y + 2], [x + mx - 2, z + mz - 2, y + my + 2]],
					[[x + 2, z + 2, y - 2], [x + mx + 2, z + mz + 2, y + my - 2]],
					[[x + 2, z + 2, y + 2], [x + mx + 2, z + mz + 2, y + my + 2]]
				];
				for (var v = 0; v < hitbox.length; v++) {
					var h = hitbox[v]
					var res = 0
					res = Trace.Line(entity, h[0], h[1])[1]
					if (res != 1) {
						var ny = h[0][2] + 10, nx = h[1][0], nz = h[1][1], fny = h[0][2], fnx = h[1][0], fnz = h[1][1]
						vres = Trace.Line(entity, [fnx, fnz, fny], [nx, nz, ny])[1]
						var start = [x, z, y]
						var end = [x - mx, z - mz, y - 20]
						vres1 = Trace.Line(entity, start, end)[1]
						if (vres == 1 && vres1 == 1) {
							hittable = true
							hit = [x + mx * (res), z + mz * (res), y + my * (res)]
							break;
						}
						else {
							if (vres1 != 1) {
								pmolotov.push([[x, z, y], Globals.Tickcount(), Globals.Tickcount() + i, Entity.GetProp(entity, 'CBaseCSGrenadeProjectile', 'm_flAnimTime')])
								hits.push([[x, z, y], Globals.Tickcount() + i, true, Entity.GetProp(entity, 'CBaseCSGrenadeProjectile', 'm_flAnimTime')])
								return
							}
							my = my * -0.45, mx = mx * 0.45, mz = mz * 0.45
							break
						}
					}
				}
				if (hit.length > 1) {
					hits.push([[hit[0], hit[1], hit[2]], Globals.Tickcount() + i, true, Entity.GetProp(entity, 'CBaseCSGrenadeProjectile', 'm_flAnimTime'), Globals.Tickcount()])
					break;
				}
				lines.push([[x, z, y], [x + mx, z + mz, y + my], Globals.Tickcount() + i, Entity.GetProp(entity, 'CBaseCSGrenadeProjectile', 'm_flAnimTime')])
				x = x + mx, y = y + my, z = z + mz;
			}
			if (!hittable) hits.push([[x, z, y], Globals.Tickcount() + i, true, Entity.GetProp(entity, 'CBaseCSGrenadeProjectile', 'm_flAnimTime'), Globals.Tickcount()])
		}
	}
	const contains = function (arr, contain) {
		for (var i = 0; i < arr.length; i++) {
			var object = arr[i]
			if (object == contain) {
				return true
			}
		}
		return false;
	}
	entities = Entity.GetEntitiesByClassID(9).concat(Entity.GetEntitiesByClassID(114));
	var array = []
	for (var i = 0; i < entities.length; i++) {
		entity = entities[i]
		if (Entity.GetProp(entity, 'CBaseCSGrenadeProjectile', 'm_nExplodeEffectTickBegin') == 0) array.push(Entity.GetProp(entity, 'CBaseCSGrenadeProjectile', 'm_flAnimTime'))
	}
	for (var i = 0; i < hits.length; i++) {
		var object = hits[i]
		if (!contains(array, object[3]))hits[i][1] = 0;
	}
	for (var i = 0; i < lines.length; i++) {
		var object = lines[i]
		if (!contains(array, object[3])) lines[i][2] = 0;
	}
	for (var i = 0; i < pmolotov.length; i++) {
		var object = pmolotov[i]
		if (!contains(array, object[3])) {
			pmolotov[i][2] = 1;
			pmolotov[i][1] = -5;
		}
	}
}

function draw_warning(xzy) {
	var x = Render.WorldToScreen(xzy[0])[0];
	var y = Render.WorldToScreen(xzy[0])[1];
	var color = GUI.GetColor("Visuals", "World", "Nade prediction");
	const draw_ind = function (x, y, str, oof, xzy) {
		var distance = Math.round(vectorDistance(Entity.GetRenderOrigin(local), xzy) / 50)
		if (distance > 25) return;
		var radius = oof ? (18 + Globals.Tickcount() / 7 % 5) : 16
		if (str == "I"){
			var armor = Entity.GetProp(local, "CCSPlayerResource", "m_iArmor");
			const origin = Entity.GetEyePosition(local);
			var x1 = origin[0] - xzy[0];
			var y1 = origin[1] - xzy[1];
			var z1 = origin[2] - xzy[2];
			const distance = Math.sqrt(x1 * x1 + y1 * y1 + z1 * z1);
			const a = 105.0;
			const b = 25.0;
			const c = 140.0;
			const d = (distance - b) / (c + 1);
			var damage = (a - 18) * Math.exp(-d * d);
			if (armor > 0) {
				var newDmg = damage * 0.5;
				var armorDmg = (damage - newDmg) * 0.5;

				if (armorDmg > armor) {
					armor = armor * (1 / 0.5);
					newDmg = damage - armorDmg;
				}
				damage = newDmg;
			}
			damage = Clamp(Math.ceil(damage - 2), 0, 100);
			if (damage != 0) damage += 3
			Render.String(x, y + 4.6, 1, damage + "hp", [255, 255, 255, 255], 2)
		}
		else Render.String(x, y + 4.6, 1, distance + "m", [255, 255, 255, 255], 2)
        Render.FilledCircle(x, y, radius, [color[0], color[1], color[2], alpha && 50])
        if(!oof) Render.Circle(x, y, 18 + Globals.Tickcount() / 7 % 5, [color[0], color[1], color[2], alpha && 50])
        Render.Circle(x, y, radius, [color[0], color[1], color[2], alpha && 50 + 25])
        Render.StringCustom(x + 1, y - 16, oof ? (18 + Globals.Tickcount() / 7 % 5) : 10, str, [255, 255, 255, alpha && 255], 5);
	}
	var str = xzy[2] ? "K" : "I";
	var alpha = (xzy[1] - Globals.Tickcount()) * 2
	if (alpha < 1) return;

	if (x < 0 || x > ScreenSize[0] || y > ScreenSize[1] || y < 0) {
		var yaw = (Local.GetViewAngles()[1])
		var myorig = Entity.GetRenderOrigin(local)
		var orig = xzy[0]
		var x = orig[0] - myorig[0]
		var z = orig[1] - myorig[1]
		var atan = Math.atan2(z, x)
		var deg = atan * (180 / Math.PI);
		deg -= yaw + 90;
		atan = deg / 180 * Math.PI;
		var cos = Math.cos(atan) * -1
		var sin = Math.sin(atan)
		draw_ind(ScreenSize[0] / 2 + cos * 150, ScreenSize[1] / 2 + sin * 150, str, true, xzy[0])
	}
	else draw_ind(x, y, str, false, xzy[0]);
}

function nade_draw() {
	if (!GUI.GetValue("Visuals", "World", "Nade prediction") || !isAlive) return;
	var color = GUI.GetColor("Visuals", "World", "Nade prediction");
	if (GUI.GetValue("Visuals", "World", "Line tracer"))
	for (var i = 0; i < lines.length; i++) {
		var line = lines[i]
		var alpha = (line[2] - Globals.Tickcount())
		if (alpha > 0) {
			var w0 = Render.WorldToScreen(line[0]);
			var w1 = Render.WorldToScreen(line[1]);
			if (w1[1] > 0 && w0[1] > 0 && w1[1] < ScreenSize[1] && w0[1] < ScreenSize[1]) {
				Render.Line(w0[0] - 1, w0[1] - 1, w1[0] - 1, w1[1] - 1, GUI.Colors.GetColor(color, 190));
				Render.Line(w0[0], w0[1], w1[0], w1[1], color);
			}
		}
	}
	for (var i = 0; i < hits.length; i++) draw_warning(hits[i])


	for (var i = 0; i < pmolotov.length; i++) {
		var molotov = pmolotov[i]
		var xzy = molotov[0]
		var start_timer = molotov[1]
		var end_timer = molotov[2]
		var curr = Globals.Tickcount()
		var max = end_timer - start_timer
		var cur = end_timer - curr
		var proc = cur / max * 300
		if (proc > 0) draw_circle_3d(xzy[0], xzy[1], xzy[2], 130, 360, proc, 30, [color[0], color[1], color[2], 200], true, [color[0], color[1], color[2], 50]);
	}
}



Cheat.RegisterCallback('CreateMove', 'grenade_warning_tick')
Cheat.RegisterCallback('Draw', 'nade_draw')

function renderDtCircle(x, y, col){
	var s = 5;
	x += 3;
	y += 3;
	var adj = 0.33;
	var charge = (Exploit.GetCharge() - adj) / (1 - adj);
	var length = Math.floor(charge * 4 * s);
	var arr = [];
	for (i = 0; i < Math.floor(length / s); i++) arr.push(s);
	var mod = Math.floor(length % s);
	if(mod !== 0) arr.push(mod);
	if(arr[0]) Render.FilledRect(x + 1, y, arr[0], 2, col);
	if(arr[1]) Render.FilledRect(x + s, y + 1, 2, arr[1], col);
	if(arr[2]) Render.FilledRect(x - arr[2] + s + 1, y + s, arr[2], 2, col);
	if(arr[3]) Render.FilledRect(x, y - arr[3] + s + 1, 2, arr[3], col);
}

function renderDtAndCircle(x, y, centered, c, i){
	var text = "dt     ";
	var type = GUI.GetValue("Visuals", "Indicators", "Indicators type");
	if(type === 2 || type === 4) return "DT";
	if (!centered) x += (Render.TextSizeCustom(text, Render.AddFont("Segoe UI", 7, 600))[0] / 2) + 1;
	renderDtCircle(x, y + 1, [0, 0, 0, Clamp((i[4] / 1.5) * Exploit.GetCharge(), 0, 200)]);
	renderDtCircle(x, y, [c[0], c[1] * Exploit.GetCharge(), c[2], Clamp(i[4], 0, 225)]);
	return text;
}

var indicators_paths = [
//	0								1														2					3					4
	[renderDtAndCircle,				["Rage", "GENERAL", "Exploits", "Doubletap"],			UI.IsHotkeyActive,	[163, 213, 117],	0],
	["hide",						["Rage", "GENERAL", "Exploits", "Hide shots"],			UI.IsHotkeyActive,	[163, 213, 117],	0],
	[mindamageGetIndicatorString,	[],														isMindamageActive,	[241, 239, 214],	0],
	["backshoot",					["Rage", "Other", "Force backshoot"],					GUI.IsHotkeyActive,	[74, 207, 0],		0],
	["fd",							["Anti-Aim", "Extra", "Fake duck"],						UI.IsHotkeyActive,	[241, 239, 214],	0],
	["lowdelta", 					["Anti-Aim", "General", "Lowdelta"],					GUI.IsHotkeyActive,	[255, 255, 255],	0],
	["baim",						["Rage", "GENERAL", "General", "Force body aim"],		UI.IsHotkeyActive,	[141, 140, 197],	0],
	["safe",						["Rage", "GENERAL", "General", "Force safe point"],		UI.IsHotkeyActive,	[141, 140, 197],	0],
	["legit aa",					[],														isLegitAAActive,	[244, 205, 166],	0],
	["freestand",					["Anti-Aim", "General", "Freestanding"],				GUI.IsHotkeyActive,	[241, 239, 214],	0],
	["auto",						["Misc", "General", "Auto peek"],						UI.IsHotkeyActive,	[241, 239, 214],	0]
]	
function indicators(){
	if(!GUI.GetValue("Visuals", "Indicators", "Indicators") || !isAlive) return;
	if(Input.IsKeyPressed(27)) local_buymenu_opened = false;
	var lowdeltaActive = GUI.IsHotkeyActive("Anti-Aim", "General", "Lowdelta");
	var aa = (lowdeltaActive ? "LOW DELTA"
	: (isLegitAAActive() ? "LEGIT AA"
	: (UI.GetValue("Anti-Aim", "Auto direction") ? "FREESTANDING"
	: "DYNAMIC")));
	var fonts, anim, c1, margin = 10, speed = 14 * Globals.Frametime() * GUI.AnimationSpeed;
	var font = Render.AddFont("Segoe UI", 7, 600);
	var x = ScreenSize[0] / 2;
	var y = ScreenSize[1] / 2 + 9 + 10 + GUI.GetValue("Visuals", "Indicators", "Indicators Y offset");
	var centered = +GUI.GetValue("Visuals", "Indicators", "Indicators centered");
	var type = GUI.GetValue("Visuals", "Indicators", "Indicators type");
	var isDefault = !type, isAcidtech = type === 1, isKillaura = type === 2 || type === 3, isIdealYaw = type === 4;
	var inv = GUI.GetValue("Visuals", "Indicators", "Inverter check")
	var custom_color = (GUI.GetValue("Visuals", "Indicators", "Indicators custom color") ? GUI.GetColor("Visuals", "Indicators", "Indicators custom color") : false);
	var white = [255, 255, 255, 255];
	var delta = getAntiaimDelta() - 15;
	var des = GUI.GetValue("Visuals", "Indicators", "Desync line")
	
	x = (isAcidtech || isIdealYaw) ? x + (centered ? 0 : 5) : isKillaura ? x + (centered ? 0 : 2) : x;
	var isInverted = isRealInverted();
	var fonts = font;
	var addy = 0
	var c1 = (custom_color || [193, 199, 255, 255])

	//Animation and colors for Killaura and Acidtech
	if(isAcidtech || isKillaura){
		anim = Math.sin(Math.abs(-Math.PI + (Globals.Curtime() * (1 / 0.5)) % (Math.PI * 2))) * 255;
		def = [custom_color[0] || 193, custom_color[1] || 199, custom_color[2] || 255, anim];
	}
	if (isAcidtech) {
		Render.StringCustom(x, y + 1, centered, "OTCSYNC", [0, 0, 0, inv ? 255 : anim], font);
		if(inv){
			Render.StringCustom(x - 12 / (centered ? 1 : -20), y, centered, "OTC", (isInverted ? c1 : white), font);
			Render.StringCustom(x + 9 * (centered ? 1 : 2), y, centered, "SYNC", (isInverted ? white : c1), font);
		}
		else Render.StringCustom(x, y, centered, "OTCSYNC", def, font)
		Render.StringCustom(x, y + 11, centered, aa, [0, 0, 0, 255], font);
		Render.StringCustom(x, y + 10, centered, aa, custom_color || [193, 199, 255, 255], font);
		addy = des ? 10 : 0
 	}
	else if (isKillaura) {
		fonts = fonta = Render.AddFont("Segoe UI", 5, 600);
		Render.StringCustom(x, y + 1, centered, "otcsync", [0, 0, 0, inv ? 255 : anim], font);
		co1 = type === 2 ? custom_color || [189, 209, 126, 255] : c1
		if(inv){
			Render.StringCustom(x - 9 / (centered ? 1 : -17), y, centered, "otc", (isInverted ? co1 : white), font);
			Render.StringCustom(x + 6 * (centered ? 1.2 : 2.4), y, centered, "sync", (isInverted ? white : co1), font);
		} else Render.StringCustom(x, y, centered, "otcsync", def, font)
		if (type === 2) Render.Circle(x + (centered ? 18 : 34) + 1, y + 5, 1, [0, 0, 0, inv ? 255 : anim]), Render.Circle(x + (centered ? 18 : 34), y + 4, 1, inv ? (isInverted ? white : co1) : def);
		addy = des ? 0 : -5
	}
	else if (isIdealYaw) {
		fonts = idfont = Render.AddFont("Tahoma", 7, 500);
		Render.StringCustom(x, y + 2, centered, "IDEAL YAW", [0, 0, 0, 255], idfont);
		c3 = (custom_color ? custom_color : lowdeltaActive ? [29, 180, 29, 255] : delta < 14 ? [220, 0, 29, 200] : [220, 135, 49, 255]);
		if(inv){
			Render.StringCustom(x - 12 / (centered ? 1 : -20), y, centered, "IDEAL", (isInverted ? c3 : white), idfont);
			Render.StringCustom(x + 15.5 * (centered ? 1.05 : 2), y, centered, "YAW", (isInverted ? white : c3), idfont);
		}
		else Render.StringCustom(x, y, centered, "IDEAL YAW", c3, idfont);
		Render.StringCustom(x, y + 12, centered, aa, [0, 0, 0, 255], idfont);
		Render.StringCustom(x, y + 10, centered, aa, custom_color || [209, 159, 230, 255], idfont);
		Render.StringCustom(x, y + 22, centered, "DT", [0, 0, 0, 255], idfont);
		var ch = Exploit.GetCharge();
		Render.StringCustom(x, y + 20, centered, "DT", exploitsActive("dt") ? [163, 213 * ch, 117 * ch, 255] : [163, 0, 0, 255], idfont);
	}
	if(des){
	ay = isAcidtech ? 25 : isKillaura ? 14 : centered && isIdealYaw ? -3 : isIdealYaw ? -2 : 0
	c1 = isIdealYaw ? c3 : c1
	Render.FilledRect(x, y + ay, (45 / 60) * delta, 2, c1);
	if (centered) Render.FilledRect(x - (45 / 60) * delta + 1, y + ay, (45 / 60) * delta, 2, c1); 
	}
	for (indicator_path in indicators_paths) {
		var indicator = indicators_paths[indicator_path], color = custom_color || indicator[3], active = indicator[2].apply(null, indicator[1]) && !Input.IsKeyPressed(9);
		var not_draw = isAcidtech || isIdealYaw;
		if ((indicator[4] = Clamp(indicator[4] += speed * (active && 1 || -1), 0, 255)) <= 0) continue;
		var marginy = (isAcidtech ? 20 : isKillaura ? 15 : 0) + 1;
		var cY = y - margin + addy + (isIdealYaw ? 30 : 0) + Math.floor((indicator[4] / 255) * margin) + marginy;
		var text = ((typeof indicator[0] === "function") ? indicator[0](x, cY, centered, color, indicator) : indicator[0]);
		if (not_draw && ~("lowdelta|legit aa|freestand".split("|")).indexOf(text)) continue;
		if (isIdealYaw && text == "DT") continue;
		text = (!isDefault && text == "auto") ? "peek" : text;
		text = (isIdealYaw && text == "fd") ? "duck" : text;
		text = (!isDefault) ? text.toUpperCase() : text;

		Render.StringCustom(x, cY + (isIdealYaw || isKillaura ? 2 : 1), centered, text, [0, 0, 0, Math.floor(indicator[4] / 1.33)], fonts);
		Render.StringCustom(x, cY + (isKillaura ? 1 : 0), centered, text, [color[0], color[1], color[2], indicator[4]], fonts);

		y += (indicator[4] / 255) * margin;
	}
}


Global.RegisterCallback("Draw", "indicators");

var agent_list = [
	["'TwoTimes' McCoy", "CT"],
	["Seal Team 6 Soldier", "CT"],
	["Buckshot", "CT"],
	["Lt. Commander Ricksaw", "CT"],
	["Dragomir", "T"],
	["Rezan The Ready", "T"],
	["Maximus", "T"],
	["Blackwolf", "T"],
	["The Doctor' Romanov", "T"],
	["B Squadron Officer", "CT"],
	["3rd Commando Company", "CT"],
	["Special Agent Ava", "CT"],
	["Operator", "CT"],
	["Markus Delrow", "CT"],
	["Michael Syfers", "CT"],
	["Enforcer", "T"],
	["Slingshot", "T"],
	["Soldier", "T"],
	["The Elite Mr. Muhlik", "T"],
	["Ground Rebel", "T"],
	["Osiris", "T"],
	["Prof. Shahmat", "T"]
]
function agentChanger() {
	if (!GUI.GetValue("Visuals", "Local", "Agent changer")) return;
	if (!isAlive) return;
	var team = Entity.GetProp(local, "DT_BaseEntity", "m_iTeamNum")
	if (team == 2)
		UI.SetValue("Misc", "SKINS", "Player", "Player model", agent_list.indexOf(agent_list.filter(function(a){
			if(a[1] == "T") return true;
		})[GUI.GetValue("Visuals", "Local", "T Agent")]) + 1);
	else if (team == 3)
		UI.SetValue("Misc", "SKINS", "Player", "Player model", agent_list.indexOf(agent_list.filter(function(a){
			if(a[1] == "CT") return true;
		})[GUI.GetValue("Visuals", "Local", "CT Agent")]) + 1);
}

Global.RegisterCallback("Draw", "agentChanger");

function idealYaw(){
	var mode = GUI.GetValue("Anti-Aim", "General", "Desync freestanding");
	if (!mode) return;
	if (!Input.IsKeyPressed(65) && !Input.IsKeyPressed(68)) return;
	var direction = !Input.IsKeyPressed(65) && Input.IsKeyPressed(68)
	direction = (--mode === 1 || (mode === 2 && !isAutopeeking())) ? !direction : direction;
	if (UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter") && direction) UI.ToggleHotkey("Anti-Aim", "Fake angles", "Inverter");
	GUI.OverrideState("Misc", "Keybinds fixer", "Inverter", isLegitAAActive() ? direction : !direction)
}

Global.RegisterCallback("Draw", "idealYaw");

var keybinds = [
	[["Misc", "Keybinds fixer", "Doubletap"],	["Rage", "GENERAL", "Exploits", "Doubletap"]],
	[["Misc", "Keybinds fixer", "Hide shots"],	["Rage", "GENERAL", "Exploits", "Hide shots"]],
	[["Misc", "Keybinds fixer", "Inverter"],	["Anti-Aim", "Fake angles", "Inverter"]],
	[["Misc", "Keybinds fixer", "Thirdperson"], ["Visual", "WORLD", "View", "Thirdperson"]],
	[["Misc", "Keybinds fixer", "Force body aim"], ["Rage", "GENERAL", "General", "Force body aim"]],
	[["Misc", "Keybinds fixer", "Force safe point"], ["Rage", "GENERAL", "General", "Force safe point"]],
	[["Misc", "Keybinds fixer", "Fake duck"], ["Anti-Aim", "Extra", "Fake duck"]]
];
function keybindFixer() {
	if (!GUI.GetValue("Misc", "Keybinds fixer", "Enabled")) return;
	for (keybind in keybinds) {
		keybind = keybinds[keybind];
		if (!GUI.GetMasterState.apply(null, keybind[0])) continue;
		if(keybind[0][2] === "Thirdperson" && GUI.GetValue("Visuals", "Other", "Better 3rd person")) continue;
		var keybind_state = GUI.IsHotkeyActive.apply(null, keybind[0]);
		var original_state = UI.IsHotkeyActive.apply(null, keybind[1]);
		if ((!keybind_state && original_state) || (keybind_state && !original_state)) UI.ToggleHotkey.apply(null, keybind[1]);
	}
}

Global.RegisterCallback("Draw", "keybindFixer");

function drawColorLine(x, y, w, h, color, style, gStyle, isWatermark){
	isWatermark = isWatermark || false;
	var transparentColor = [color[0], color[1], color[2], isWatermark ? 75 : 0];
	isWatermark = (isWatermark && style == 0);
	var hw = w / 2;
	var gr = function(x, y, w, h, c1, c2){
		c2 = c2 || c1;
		Render.GradientRect(x, y + +isWatermark, w, isWatermark ? 1 : h, 1, c1, c2)
		if(isWatermark) Render.GradientRect(x + 1, y, w - 2, 1, 1, c1, c2)
	};
	if(gStyle == 6 || gStyle == 7) var rgb = GUI.Colors.HSVToRGB(Global.Realtime() / 6, 0.9, 1, color[3]);
	if (gStyle == 0) gr(x, y, w, h, color);
	else if (gStyle == 1){
		gr(x, y, hw, h, transparentColor, color);
		gr(x + hw, y, hw, h, color, transparentColor);
	}
	else if(gStyle == 2 || gStyle == 3 || gStyle == 6){
		var color1 = transparentColor, color2 = color;
		if(gStyle == 3) color1 = color, color2 = transparentColor;
		if(gStyle == 6) color1 = rgb, color2 = [rgb[2], rgb[0], rgb[1], color[3]];
		gr(x, y, w, h, color1, color2);
	}
	else if(gStyle == 4 || gStyle == 5 || gStyle == 7){
		var color1 = [59, 175, 222, 255], color2 = [202, 70, 205, 255], color3 = [201, 227, 58, 255];
		if(gStyle == 5) color1 = [70, 252, 255, 255], color2 = [255, 52, 255, 255], color3 = [254, 252, 0, 255];
		else if(gStyle == 7) color1 = rgb, color2 = [rgb[1], rgb[2], rgb[0], color[3]], color3 = [rgb[2], rgb[0], rgb[1], color[3]];
		gr(x, y, hw, h, color1, color2);
		gr(x + hw, y, hw, h, color2, color3);
	}
}

var info_window_width = 180;
var info_window_height = 19;
function drawInfoWindow(x, y, text, icon, alpha, color, font, style){
	var iconfont = Render.AddFont("OnetapFont", 13, 100);
	if (alpha == 0) return;
	const opacity = color[3];
	color[3] = alpha;
	var background = [0, 0, 0, alpha * (opacity / 255)];
	var showicon = style < 2;
	var IsSolus = style == 1 || style == 2;
	var colored_line_y = IsSolus ? info_window_height + 1 : 2;
	var gradientStyle = GUI.GetValue("Visuals", "GUI", "Windows color type");
	if(!IsSolus) Render.FilledRect(x + 1, y, info_window_width - 2, 1, background);
	Render.FilledRect(x, y + 1, info_window_width, info_window_height - 3, background);
	if(text !== null) Render.StringCustom(x + (IsSolus ? info_window_width / 2 : (showicon ? 25 : 4)), y + 1 + +IsSolus, +IsSolus, text, [255, 255, 255, alpha], font);
	drawColorLine(x, y + info_window_height - colored_line_y, info_window_width, 2, color, style, gradientStyle);
	//Render.FilledRect(x, y + info_window_height - colored_line_y, 180, 2, color);
	var isRGB = (gradientStyle == 6 || gradientStyle == 7);
	var iconColor = color;
	if (isRGB) iconColor = GUI.Colors.HSVToRGB(Global.Realtime() / 6, 0.9, 1, color[3]);
	if (icon !== null && showicon) Render.StringCustom(x + 6, y, 0, icon, iconColor, iconfont);
}

var keybind_list_alpha = 0;
UI.AddSliderInt("keybind_list_x", 0, ScreenSize[0] - info_window_width);
UI.AddSliderInt("keybind_list_y", 0, ScreenSize[1]);
UI.SetEnabled("keybind_list_x", 0);
UI.SetEnabled("keybind_list_y", 0);
var keybind_list_x = GetVal("keybind_list_x") || ScreenSize[0] - info_window_width - 1;
var keybind_list_y = GetVal("keybind_list_y") || 200;
var keybind_list_is_moving = false;
var keybind_list_old_cursor = [0, 0];
var keybinds_paths = [
//	Name					Path to keybind GUI or UI								GUI alternative for this bind					Method to get value		Alpha
//	0						1														2												3						4
	["Min-dmg override",	["Rage", "Min-DMG Override", "Min-damage override"],	true,											GUI.IsHotkeyActive,		0],
	["Min-dmg override 2",	["Rage", "Min-DMG Override", "Min-damage override 2"],	true,											GUI.IsHotkeyActive,		0],
	["Doubletap",			["Rage", "GENERAL", "Exploits", "Doubletap"],			["Misc", "Keybinds fixer", "Doubletap"],		UI.IsHotkeyActive,		0],
	["Hide shots",			["Rage", "GENERAL", "Exploits", "Hide shots"],			["Misc", "Keybinds fixer", "Hide shots"],		UI.IsHotkeyActive,		0],
	["Ping Spike",			["Rage", "Other", "Extended backtracking"],				true,											GUI.IsHotkeyActive,		0],
	["Force backshoot",		["Rage", "Other", "Force backshoot"],					true,											GUI.IsHotkeyActive,		0],
	["Fake duck",			["Anti-Aim", "Extra", "Fake duck"],						["Misc", "Keybinds fixer", "Fake duck"],		UI.IsHotkeyActive,		0],
	["Lowdelta", 			["Anti-Aim", "General", "Lowdelta"],					true,											GUI.IsHotkeyActive,		0],
	["Force body aim",		["Rage", "GENERAL", "General", "Force body aim"],		["Misc", "Keybinds fixer", "Force body aim"],	UI.IsHotkeyActive,		0],
	["Force safe point",	["Rage", "GENERAL", "General", "Force safe point"],		["Misc", "Keybinds fixer", "Force safe point"],	UI.IsHotkeyActive,		0],
	["Legit AA",			[],														null,											isLegitAAActive,		0],
	["Freestanding",		["Anti-Aim", "General", "Freestanding"],				true,											GUI.IsHotkeyActive,		0],
	["Auto peek",			["Misc", "General", "Auto peek"],						null,											UI.IsHotkeyActive,		0],
	["Thirdperson", 		["Visual", "World", "View", "Thirdperson"], 			["Misc", "Keybinds fixer", "Thirdperson"],		UI.IsHotkeyActive,		0],
	["Inverter", 			["Anti-Aim", "Fake angles", "Inverter"], 				["Misc", "Keybinds fixer", "Inverter"],			UI.IsHotkeyActive,		0],
	["Resolver override", 	["Rage", "GENERAL", "General", "Resolver override"],	null,											UI.IsHotkeyActive,		0],
	["Slow walk",			["Anti-Aim", "Extra", "Slow walk"],						null,											UI.IsHotkeyActive,		0]
];
function keybindList(){
	if(!GUI.GetValue("Visuals", "GUI", "Keybind list")) return;
	var style = GUI.GetValue("Visuals", "GUI", "Windows style");
	var visible = false;
	var speed = 14 * Globals.Frametime() * GUI.AnimationSpeed;
	var margin = 15;
	var binds_y = keybind_list_y + info_window_height + 1;
	var font = style ? Render.AddFont("Verdana", 8, 400) : Render.AddFont("Segoe UI Semilight", 9, 200);
	if(World.GetServerString() && isAlive)
	for (keybind_path in keybinds_paths) {
		var keybind = keybinds_paths[keybind_path];
		if (keybind[1] == null) continue;
		var active = keybind[3].apply(null, keybind[1]);
		var mode = "active";
		if (keybind[2] == true) mode = GUI.GetValue.apply(null, keybind[1])[0];
		if (keybind[2] !== true && keybind[2] !== null && GUI.GetMasterState.apply(null, keybind[2])) mode = GUI.GetValue.apply(null, keybind[2])[0];
		if(active) visible = true;
		mode = "[" + mode + "]";
		if ((keybind[4] = Clamp(keybind[4] += speed * (active && 1 || -1), 0, 255)) <= 0) continue;
		var bind_y = binds_y - margin + Math.floor((keybind[4] / 255) * margin);
		var text_size = Render.TextSizeCustom(mode, font);
		
		Render.StringCustom(keybind_list_x + 3, bind_y, 0, keybind[0], GUI.Colors.GetColor([255, 255, 255], keybind[4]), font);
		Render.StringCustom(keybind_list_x + info_window_width - text_size[0] - 1, bind_y, 0, mode, GUI.Colors.GetColor([255, 255, 255], keybind[4]), font);
		binds_y += (keybind[4] / 255) * margin;
	}
	visible = visible || UI.IsMenuOpen();
	keybind_list_alpha = Clamp(keybind_list_alpha += speed * (visible && 1 || -1), 0, 255);
	
	var color = GUI.GetColor("Visuals", "GUI", "Keybind list");
	drawInfoWindow(keybind_list_x, keybind_list_y, "keybinds", "H", keybind_list_alpha, color, font, style);
}

Global.RegisterCallback("Draw", "keybindList");

function keybindListDrag(){
	if(!UI.IsMenuOpen()) return;
	if (GUI._MenuIsMoving || spectator_list_is_moving) return;
	if(!GUI.GetValue("Visuals", "GUI", "Keybind list")) return;
	var cursor_pos = Input.GetCursorPosition();
	keybind_list_x = Clamp(keybind_list_x, 1, ScreenSize[0] - info_window_width);
	keybind_list_y = Clamp(keybind_list_y, 1, ScreenSize[1] - info_window_height);
	if (!Input.IsKeyPressed(0x01)) {
		keybind_list_is_moving = false;
		keybind_list_old_cursor = cursor_pos;
		return;
	}
	if (UI.IsCursorInBox(keybind_list_x, keybind_list_y, info_window_width, info_window_height) || keybind_list_is_moving) {
		keybind_list_is_moving = true;
		keybind_list_x = Clamp(cursor_pos[0] - keybind_list_old_cursor[0] + keybind_list_x, 1, ScreenSize[0] - info_window_width);
		keybind_list_y = Clamp(cursor_pos[1] - keybind_list_old_cursor[1] + keybind_list_y, 1, ScreenSize[1] - info_window_height);
		keybind_list_old_cursor = cursor_pos;
		UI.SetValue(si, "keybind_list_x", keybind_list_x);
		UI.SetValue(si, "keybind_list_y", keybind_list_y);
	}
}

Global.RegisterCallback("Draw", "keybindListDrag");

var spectator_list_alpha = 0;
UI.AddSliderInt("spectator_list_x", 0, ScreenSize[0] - info_window_width);
UI.AddSliderInt("spectator_list_y", 0, ScreenSize[1]);
UI.SetEnabled("spectator_list_x", 0);
UI.SetEnabled("spectator_list_y", 0);
var spectator_list_x = GetVal("spectator_list_x") || ScreenSize[0] - info_window_width - 1;
var spectator_list_y = GetVal("spectator_list_y") || 100;
var spectator_list_is_moving = false;
var spectator_list_old_cursor = [0, 0];
var spectators_alpha = [];
var spectator_modes = "none deathcam freezecam fixed 1st 3rd fly".split(" ");
function spectatorList(){
	if(!GUI.GetValue("Visuals", "GUI", "Spectator list")) return;
	var visible = false;
	var speed = 14 * Globals.Frametime() * GUI.AnimationSpeed;
	var margin = 15;
	var specs_y = spectator_list_y + 21;
	var players = Entity.GetPlayers();
	var style = GUI.GetValue("Visuals", "GUI", "Windows style");
	var font = style ? Render.AddFont("Verdana", 8, 400) : Render.AddFont("Segoe UI Semilight", 9, 200);
	
	if(World.GetServerString())
	for (player in players) {
		var player = players[player];
		if(!(player in spectators_alpha)) spectators_alpha[player] = 0;
		if(player === local) continue;
		var observer = Entity.GetProp(player, "DT_BasePlayer", "m_hObserverTarget");
		var active = player && !Entity.IsAlive(player) && !Entity.IsDormant(player) && (observer && observer !== "m_hObserverTarget" && Entity.IsValid(observer) && Entity.IsAlive(observer))
		&& (isAlive ? (observer === local) : (observer == Entity.GetProp(local,"DT_BasePlayer","m_hObserverTarget")));
		var specmode = spectator_modes[+Entity.GetProp(player, "DT_BasePlayer", "m_iObserverMode")];
		active = active && (specmode != "none");
		if(active) visible = true;
		if ((spectators_alpha[player] = Clamp(spectators_alpha[player] += speed * (active && 1 || -1), 0, 255)) <= 0) continue;
		var specs_y = specs_y - margin + Math.floor((spectators_alpha[player] / 255) * margin);
		var mode = "[" + specmode + "]";
		var text_size = Render.TextSizeCustom(mode, font);
		var name = rusToEng(Entity.GetName(player));
		Render.StringCustom(spectator_list_x + 3, specs_y, 0, name, GUI.Colors.GetColor([255, 255, 255], spectators_alpha[player]), font);
		Render.StringCustom(spectator_list_x + info_window_width - text_size[0] - 1, specs_y, 0, mode, GUI.Colors.GetColor([255, 255, 255], spectators_alpha[player]), font);
		specs_y += margin;
	}
	visible = visible || UI.IsMenuOpen();
	spectator_list_alpha = Clamp(spectator_list_alpha += speed * (visible && 1 || -1), 0, 255);
	if (spectator_list_alpha == 0) return;
	var rawcolor = GUI.GetColor("Visuals", "GUI", "Spectator list");
	var color = GUI.Colors.GetColor(rawcolor, spectator_list_alpha);
	drawInfoWindow(spectator_list_x, spectator_list_y, "spectators", null, spectator_list_alpha, rawcolor, font, style);
	var iconColor = color;
	var gradientStyle = GUI.GetValue("Visuals", "GUI", "Windows color type");
	if (gradientStyle == 6 || gradientStyle == 7) iconColor = GUI.Colors.HSVToRGB(Global.Realtime() / 6, 0.9, 1, color[3]);
	if(style < 2) Render.String(spectator_list_x + 2, spectator_list_y + (style ? 3 : 2), 0, "%", iconColor, 6);

	//Reset invalid players
	if(World.GetServerString())
	for(spec in spectators_alpha) if(spec && !Entity.IsValid(spectators_alpha[spec]) && !spectators_alpha[spec]) spectators_alpha[spec] = 0;

	//api issue, can't delete
	//tbh i can but im lazy to do a workaround :/
	
	//Sort by user id to make it less jittery
	//spectators_alpha = Object.keys(spectators_alpha).sort().reduce(function(obj, key){obj[key] = spectators_alpha[key]; return obj}, {});
}

Global.RegisterCallback("Draw", "spectatorList");

function spectatorListDrag(){
	if(!UI.IsMenuOpen()) return;
	if (GUI._MenuIsMoving || keybind_list_is_moving) return;
	if(!GUI.GetValue("Visuals", "GUI", "Spectator list")) return;
	var cursor_pos = Input.GetCursorPosition();
	spectator_list_x = Clamp(spectator_list_x, 1, ScreenSize[0] - info_window_width);
	spectator_list_y = Clamp(spectator_list_y, 1, ScreenSize[1] - info_window_height);
	if (!Input.IsKeyPressed(0x01)) {
		spectator_list_is_moving = false;
		spectator_list_old_cursor = cursor_pos;
		return;
	}
	if (UI.IsCursorInBox(spectator_list_x, spectator_list_y, info_window_width, info_window_height) || spectator_list_is_moving) {
		spectator_list_is_moving = true;
		spectator_list_x = Clamp(cursor_pos[0] - spectator_list_old_cursor[0] + spectator_list_x, 1, ScreenSize[0] - info_window_width);
		spectator_list_y = Clamp(cursor_pos[1] - spectator_list_old_cursor[1] + spectator_list_y, 1, ScreenSize[1] - info_window_height);
		spectator_list_old_cursor = cursor_pos;
		UI.SetValue(si, "spectator_list_x", spectator_list_x);
		UI.SetValue(si, "spectator_list_y", spectator_list_y);
	}
}

Global.RegisterCallback("Draw", "spectatorListDrag");

var fps_last_time = Globals.Realtime();
var frametimes = 0, latest_fps = 0, fps_count = 0, fps_delay = 0.33;
var watermark_elements = {
	"Username": function(){
		return rusToEng(Cheat.GetUsername());
	},
	"K/D": function(){
		if(!World.GetServerString()) return null;
		var kills = Entity.GetProp(local, "CPlayerResource", "m_iKills");
		var deaths = Entity.GetProp(local, "CPlayerResource", "m_iDeaths");
		var assists = Entity.GetProp(local, "CPlayerResource", "m_iAssists");
		if(deaths === 0) deaths = 1;
		return "K/D: " + ((kills + assists) / deaths).toFixed(2);
	},
	"IP": function(){
		if(!World.GetServerString()) return null;
		return World.GetServerString();
	},
	"Tickrate": function(){
		if(!World.GetServerString()) return null;
		return Globals.Tickrate() + " ticks";
	},
	"Ping": function(){
		if(!World.GetServerString()) return null;
		return "delay: " + ((World.GetServerString() == "local server") ? 0 : Math.floor(Global.Latency() * 1000 / 1)) + "ms";
	},
	"FPS": function(){
		frametimes += Globals.Frametime(), fps_count++;
		if(Globals.Realtime() > fps_last_time + fps_delay){
			latest_fps = Math.round(1 / (frametimes / ++fps_count));
			fps_last_time = Globals.Realtime(), fps_count = frametimes = 0;
		}
		return "FPS: " + latest_fps;
	},
	"Time": function(){
		var today = new Date();
		var hours = today.getHours(), mins = today.getMinutes(), secs = today.getSeconds();
		var time = [((hours <= 9) ? "0" + hours : hours), ((mins <= 9) ? "0" + mins : mins), ((secs <= 9) ? "0" + secs : secs)];
		return time.join(":");
	}
};
function watermark(){
	if(!GUI.GetValue("Visuals", "GUI", "Watermark")) return;
	var style = GUI.GetValue("Visuals", "GUI", "Windows style");
	var IsSolus = style == 1 || style == 2;
	var font = style ? Render.AddFont("Verdana", 7, 500) : Render.AddFont("Segoe UI Semilight", 9, 200);
	var font = IsSolus ? Render.AddFont("Verdana", 7, 500) : Render.AddFont("Segoe UI Semilight", 9, 200);
	var y = 8;
	var color = GUI.GetColor("Visuals", "GUI", "Watermark");
	var opacity = color[3];
	var elements = ["     " + GUI.LogoText.toLowerCase()];
	for(element in watermark_elements)
		if(GUI.GetDropdownValue("Visuals", "GUI", "Watermark elements", element) && (value = watermark_elements[element]()) !== null) elements.push(value);
	var text = elements.join(style ? " | " : " / ");
	var text_size = Render.TextSizeCustom(text, font);
	var icon = style < 2;
	var width = text_size[0] + (icon ? 9 : -6) - (5 * +IsSolus);
	var height = 19;
	var x = ScreenSize[0] - width - 4;
	var background = [0, 0, 0, opacity];
	var r = style == 0;
	var addw = IsSolus ? 2 : 0

	//Top line
	drawColorLine(x - 9, y, width + addw, 2, GUI.Colors.GetColor(color, 255), style, GUI.GetValue("Visuals", "GUI", "Windows color type"), true);

	//Background
	Render.FilledRect(x - 9, y + 2, width + addw, height - 2, background);
	Render.FilledRect(x - 9 + (1 * r), y + height, width + addw - (2 * r), 1, background);

	var iconColor = color;
	iconColor[3] = 255;
	var gradientStyle = GUI.GetValue("Visuals", "GUI", "Windows color type");
	if (gradientStyle == 6 || gradientStyle == 7) iconColor = GUI.Colors.HSVToRGB(Global.Realtime() / 6, 0.9, 1);
	icon && Render.String(x - 9, y + 2, 0, "!", iconColor, 5);
	var xAdd = (icon ? IsSolus ? 8 : 5 : -6) - (6 * +IsSolus);
	var yAdd = +IsSolus + 3;
	var a = IsSolus ? 7 : 9
	var b = IsSolus ? 4 : 2
	Render.StringCustom(x - 2 - a + xAdd + 1, y + b + yAdd - 2, 0, text, [0, 0, 0, 255], font);
	Render.StringCustom(x - 9 + xAdd, y + yAdd, 0, text, [255, 255, 255, 255], font);
}

Global.RegisterCallback("Draw", "watermark");

var fps_info = [];
var last_timee = Global.Curtime();

function Infoelements(){
if(!GUI.GetValue("Visuals", "GUI", "Info")) return;
var watermark = GUI.GetValue("Visuals", "GUI", "Watermark")
var font = Render.AddFont("Verdana", 7, 400)
var rawcolor = GUI.GetColor("Visuals", "GUI", "Info")
var col = [rawcolor[0],rawcolor[1],rawcolor[2], 255]
var x = ScreenSize
var y = 10
var addlow = World.GetServerString() && watermark ? 25 : 0
var hz = Convar.GetFloat("fps_max") == 0 ? "60" : Convar.GetFloat("fps_max")
var textfl = UI.IsHotkeyActive("Rage", "Doubletap") && Exploit.GetCharge() ? "1 | SHIFTING": UI.IsHotkeyActive("Rage", "Hide shots") ? "1 | ONSHOT" : UI.GetValue("Anti-Aim", "Limit")
var flsize = Render.TextSizeCustom("FL: " + textfl, font);
var fksize = Render.TextSizeCustom("FAKE (" + getAntiaimDelta() + ")", font)
var ms_text = Lerp(0, Math.abs((Globals.Frametime() * 1000)), Globals.Frametime() * 8)
var hzsize = Render.TextSizeCustom(ms_text.toFixed(1) + "ms/" + hz + "hz", font)
var delt = getAntiaimDelta() < 0 ? 0 : getAntiaimDelta();
var gr1 = [255 - (delt) * 4, (delt) * 4, 0, 25]
var gr2 = [255 - (delt) * 4, (delt) * 4, 0, 255]
	if(World.GetServerString()){
	if(GUI.GetDropdownValue("Visuals", "GUI", "Info elements", "FL")){
	Render.FilledRect(x[0] - flsize[0] - 18, y + addlow, flsize[0] + 7, 17, [10, 10, 10, rawcolor[3]])
	Render.GradientRect(x[0] - flsize[0] - 18, y + addlow + 17, flsize[0] / 2 + 5, 1, 1, [col[0], col[1], col[2], 0], col)
	Render.GradientRect(x[0] - flsize[0] / 2 - 13, y + addlow + 17, flsize[0] / 2 + 2, 1, 1, col, [col[0], col[1], col[2], 0])
	Render.StringCustom(x[0] - flsize[0] - 12, y + addlow + 4, 0, "FL: " + textfl, [0, 0, 0, 255], font)
	Render.StringCustom(x[0] - flsize[0] - 14, y + addlow + 2, 0, "FL: " + textfl, [255, 255, 255, 255], font) }

	if(GUI.GetDropdownValue("Visuals", "GUI", "Info elements", "FAKE")) {
	Render.FilledRect(x[0] - flsize[0] - 90, y + addlow, fksize[0] + 10, 17, [10, 10, 10, rawcolor[3]])
	Render.StringCustom(x[0] - flsize[0] - 83, y + addlow + 4, 0, "FAKE (" + delt + ")", [0, 0, 0, 255], font)
	Render.StringCustom(x[0] - flsize[0] - 85, y + addlow + 2, 0, "FAKE (" + delt + ")", [255, 255, 255, 255], font)
	Render.GradientRect(x[0] - flsize[0] - 92, y + addlow, 2, 8, 0, gr1, gr2)
	Render.GradientRect(x[0] - flsize[0] - 92, y + addlow + 8, 2, 8, 0, gr2, gr1) } }

	if(GUI.GetDropdownValue("Visuals", "GUI", "Info elements", "MS/HZ")){
	Render.FilledRect(x[0] - hzsize[0] - 18, y + addlow + 25, hzsize[0] + 7, 17, [10, 10, 10, rawcolor[3]])
	Render.GradientRect(x[0] - hzsize[0] - 18, y + addlow + 42, hzsize[0] / 2 + 5, 1, 1, [255, 255, 255, 25], [255, 255, 255, 255])
	Render.GradientRect(x[0] - hzsize[0] / 2 - 13, y + addlow + 42, hzsize[0] / 2, 1, 1, [255, 255, 255, 255], [255, 255, 255, 25])
	Render.StringCustom(x[0] - hzsize[0] - 12, y + addlow + 29, 0, ms_text.toFixed(1) + "ms/" + hz + "hz", [0, 0, 0, 255], font)
	Render.StringCustom(x[0] - hzsize[0] - 14, y + addlow + 27, 0, ms_text.toFixed(1) + "ms/" + hz + "hz", [255, 255, 255, 255], font) }

	if(GUI.GetDropdownValue("Visuals", "GUI", "Info elements", "IO")){
	Render.FilledRect(x[0] - hzsize[0] - 84, y + addlow + 25, 54, 17, [10, 10, 10, rawcolor[3]]);
	Render.StringCustom(x[0] - hzsize[0] - 78, y + addlow + 29, 0, "IO | ", [0, 0, 0, 255], font)
	Render.StringCustom(x[0] - hzsize[0] - 80, y + addlow + 27, 0, "IO | ", [255, 255, 255, 255], font)
	var avg = {
		'fps': 0
	};
	if (Global.Curtime() - last_timee > 0.5) {
		last_timee = Global.Curtime();
		fps_info.unshift(1 / Global.Frametime());
	}
	if (fps_info.length > 4)
		fps_info.pop();
	var fps_max = Convar.GetInt("fps_max") + 20 || 400 + 20;
	for (i = 0; i < fps_info.length; i++) {
		avg.fps += fps_info[i]
		Render.GradientRect(x[0] - i * 5 - hzsize[0] - 39, y + addlow + 40 - fps_info[i] / fps_max * 15, 5, fps_info[i] / fps_max * 15, 0, [col[0], col[1], col[2], 0], col);
		}
	}
}

Global.RegisterCallback("Draw", "Infoelements");

function wasdindicator()
{
	if(!GUI.GetValue("Visuals", "World", "Keystrokes")) return;
	var font = Render.AddFont("Verdana", 18, 600);
	var rgb = GUI.Colors.HSVToRGB(Globals.Realtime() + (i / 200) % 1, 1, 1);
        Render.FilledRect( 50, 400, 45, 45, Input.IsKeyPressed(0x57) ? [ 10, 10, 10, 113 ] : [ 10, 10, 10, 68 ]);
        Render.String( 73, 415, 3, "W", [rgb[2],rgb[0],rgb[1], 255] );

        Render.FilledRect( 5, 445, 45, 45, Input.IsKeyPressed(0x41) ? [ 10, 10, 10, 113 ] : [ 10, 10, 10, 68 ]);
        Render.String( 28.5, 460, 3, "A", [rgb[2],rgb[0],rgb[1], 255] );

        Render.FilledRect( 50, 445, 45, 45, Input.IsKeyPressed(0x53) ? [ 10, 10, 10, 113 ] : [ 10, 10, 10, 68 ]);
        Render.String( 73, 460, 3, "S", [rgb[2],rgb[0],rgb[1], 255] );

        Render.FilledRect( 95, 445, 45, 45, Input.IsKeyPressed(0x44) ? [ 10, 10, 10, 113 ] : [ 10, 10, 10, 68 ]);
        Render.String( 117, 460, 3, "D", [rgb[2],rgb[0],rgb[1], 255] );

        Render.FilledRect( 5, 490, 135, 45, Input.IsKeyPressed(0x20) ? [ 10, 10, 10, 113 ] : [ 10, 10, 10, 68 ]);
        Render.StringCustom( 71, 485, 3, "_____", [rgb[2],rgb[0],rgb[1], 255], font);
}

Cheat.RegisterCallback("Draw", "wasdindicator")

var should_switch = false;
function AWPswitch(){
	if(should_switch){
		Cheat.ExecuteCommand("slot1");
		should_switch = false;
	}
}

Global.RegisterCallback("CreateMove", "AWPswitch");

function AWPswitchShot(){
	if(GUI.GetValue("Rage", "General", "AWP switch after shot") && !isAutopeeking() && Entity.GetEntityFromUserID(Event.GetInt("userid")) == local && getWeaponName() == "AWP"){
		Cheat.ExecuteCommand("slot5"); Cheat.ExecuteCommand("slot4"); Cheat.ExecuteCommand("slot2"); Cheat.ExecuteCommand("slot3");
		should_switch = true;
	}
}

Global.RegisterCallback("weapon_fire", "AWPswitchShot");

var ticks_to_setup = null;
var ticks_to_setup_player = null;

function localServerSetupStart(){
	if(!GUI.GetValue("Misc", "General", "Auto local server setup") || Entity.GetEntityFromUserID(Event.GetInt("userid")) !== local || World.GetServerString() !== "local server") return;
	ticks_to_setup = Globals.Tickcount() + 32;
}

Global.RegisterCallback("player_spawn", "localServerSetupStart");

function localServerSetup(){
	if(ticks_to_setup === null || Globals.Tickcount() < ticks_to_setup) return;
	if(!GUI.GetValue("Misc", "General", "Auto local server setup")) return;
	ticks_to_setup = null;
	Cheat.ExecuteCommand("sv_cheats 1");
	Cheat.ExecuteCommand("sv_airaccelerate 9999");
	Cheat.ExecuteCommand("sv_accelerate 6");
	Cheat.ExecuteCommand("sv_infinite_ammo 1");
	Cheat.ExecuteCommand("mp_ignore_round_win_conditions 1");
	Cheat.ExecuteCommand("mp_freezetime 0");
	Cheat.ExecuteCommand("mp_maxmoney 65535");
	Cheat.ExecuteCommand("mp_startmoney 65535");
	Cheat.ExecuteCommand("mp_afterroundmoney 65535");
	Cheat.ExecuteCommand("mp_buytime 999999");
	Cheat.ExecuteCommand("mp_do_warmup_offine 0");
	Cheat.ExecuteCommand("mp_warmuptime 0");
	Cheat.ExecuteCommand("mp_buy_anywhere 1");
	Cheat.ExecuteCommand("mp_respawn_on_death_ct 1");
	Cheat.ExecuteCommand("mp_respawn_on_death_t 1");
	Cheat.ExecuteCommand("bot_kick");
	Cheat.ExecuteCommand("mp_warmup_end");
}

Global.RegisterCallback("Draw", "localServerSetup");

function localPlayerSetup(){
	if(!GUI.GetValue("Misc", "General", "Auto local server setup") || Entity.GetEntityFromUserID(Event.GetInt("userid")) !== local || World.GetServerString() !== "local server") return;
	Cheat.ExecuteCommand("god");
	Cheat.ExecuteCommand("give weapon_molotov");
    Cheat.ExecuteCommand("give weapon_hegrenade");
	Cheat.ExecuteCommand("impulse 101");
}

Global.RegisterCallback("player_spawn", "localPlayerSetup");

var otc_sync_clantag = [
	"[otc sync]",
	"[sleebu paster]",
	"[best script]",
	"[otc sync > nl]",
	"[magma lox]",
	"[5nu$ forever]",
	"[giv me a rubl]",
	"[neverpuss]",
	"[want up]",
	"[Xyu]",
	"[go sekc?]",
	"[yougay.fist]",
	"[brokenass.pog]",
	"[giper wipe]",
	"[555$]",
];
var last_clantag_time = 0;
function clantag(){
	if(!GUI.GetValue("Misc", "General", "Clantag")) return;
	var speed = 1;
	var time = parseInt((Globals.Curtime() * speed));
	if (time == last_clantag_time) return;
	Local.SetClanTag(otc_sync_clantag[(time) % otc_sync_clantag.length]);
}

Global.RegisterCallback("CreateMove", "clantag");

var defensive_pos = [];
var defensiveDTClantagState = false;
function defensiveDT(){
	if((GUI.GetValue("Rage", "Doubletap", "DT Boost") !== 2 || !exploitsActive("dt")) || isAutopeeking() || !local) return;
	var enemies = Entity.GetEnemies();
	var ticks = GUI.GetValue("Rage", "Doubletap", "Extrapolate ticks");
	var pos = Entity.GetHitboxPosition(local, 0);
	var predicted_pos = ExtrapolateTick(local, ticks, 0);
	var break_lc = false;
	var predictive_hit_possible = false;
	var hit_possible = false;
	for(enemy in enemies){
		if(break_lc) continue;
		enemy = enemies[enemy];
		if (!Entity.IsAlive(enemy) || Entity.IsDormant(enemy) || !Entity.IsValid(enemy)) continue;
		var hitbox_pos = [Entity.GetHitboxPosition(enemy, 0),	//Head
						Entity.GetHitboxPosition(enemy, 2),		//Pelvis
						Entity.GetHitboxPosition(enemy, 3),		//Body
						Entity.GetHitboxPosition(enemy, 6),		//Upper chest
						Entity.GetHitboxPosition(enemy, 16),	//Left forearm
						Entity.GetHitboxPosition(enemy, 18),	//Right forearm
						Entity.GetHitboxPosition(enemy, 13),	//Left hand
						Entity.GetHitboxPosition(enemy, 14),	//Right hand
						Entity.GetHitboxPosition(enemy, 7),		//Left leg
						Entity.GetHitboxPosition(enemy, 8),		//Right leg
						Entity.GetHitboxPosition(enemy, 9),		//Left leg
						Entity.GetHitboxPosition(enemy, 10),	//Right leg
						Entity.GetHitboxPosition(enemy, 11),	//Left foot
						Entity.GetHitboxPosition(enemy, 12),	//Right foot
		];
		for(hitbox in hitbox_pos) if(Trace.Bullet(local, enemy, predicted_pos, hitbox_pos[hitbox])[1] > 0) predictive_hit_possible = true;
		if(predictive_hit_possible) for(hitbox in hitbox_pos) if(Trace.Bullet(local, enemy, pos, hitbox_pos[hitbox])[1] > 0) hit_possible = true;
		if(predictive_hit_possible && !hit_possible) break_lc = true;
	}
	if(!break_lc) return;
	defensive_pos.push(Entity.GetRenderOrigin(local));
	if(defensiveDTClantagState){
		Local.SetClanTag("!|!|!|!|!|!|!|!");
		//Local.SetClanTag("...............");
		defensiveDTClantagState = false;
	}
	else{
		Local.SetClanTag("|!|!|!|!|!|!|!|");
		//Local.SetClanTag("..............");
		defensiveDTClantagState = true;
	}
}

Global.RegisterCallback("CreateMove", "defensiveDT");

function drawDefensive(){
	var enabled = GUI.GetValue("Rage", "Doubletap", "DT Boost") === 2;
	GUI._MenuElements["Rage"]["Doubletap"]["Extrapolate ticksRD"].Flags = GUI.NOT_VISIBLE * +!enabled;
	if(!enabled) return;
	if(defensive_pos.length > 64) defensive_pos.shift();
	var size = 6;
	for(pos in defensive_pos){
		pos = Render.WorldToScreen(defensive_pos[pos]);
		if(!pos) continue;
		Render.FilledRect(pos[0] - size / 2, pos[1] - size / 2, size, size, [0, 255, 0, 255]);
	}
}

Global.RegisterCallback("Draw", "drawDefensive");

var predict_shot = false;
var restore_viewangles = false;
function restore_shot() {
    if(predict_shot){
        Cheat.ExecuteCommand("-attack");
		//Local.SetViewAngles(viewangles_bak);
        predict_shot = false;
    }
}

Global.RegisterCallback("CreateMove", "restore_shot");

var last_leg_pos = [0, 0, 0];
var viewangles_bak = Local.GetViewAngles();
function legPrediction(){
	var shoot = true;
	if(!GUI.GetValue("Rage", "General", "Leg prediction") || !local) return;

	var innacuracy = Local.GetInaccuracy() * 100;
	innacuracy *= Local.GetSpread() * 450;
	if(!isAlive || getVelocity(local) > 50 || !canShoot(local) || GUI.IsHotkeyActive("Rage", "Other", "Force backshoot")) shoot = false;
	var enemies = Entity.GetEnemies();
	var local_pos = Entity.GetHitboxPosition(local, 0);
	var ticks = 1;
	for(enemy in enemies){
		enemy = enemies[enemy];
		if (Entity.IsDormant(enemy) || !Entity.IsAlive(enemy) || !Entity.IsValid(enemy) || !shoot || innacuracy > 1.4 || getVelocity(enemy) < 30) shoot = false;
		var predicted_leg_pos = [ExtrapolateTick(enemy, ticks, 11), ExtrapolateTick(enemy, ticks, 12)];
		var leg_pos = [Entity.GetHitboxPosition(enemy, 11), Entity.GetHitboxPosition(enemy, 12)];
		if(shoot) for(predicted_leg in predicted_leg_pos){
			if(Trace.Bullet(local, enemy, local_pos, leg_pos[predicted_leg])[1] > 0 /*&& hitChance(enemy, 50, hitboxes[predicted_leg])*/){
				var start = Entity.GetRenderOrigin(local);
				start[2] = Entity.GetHitboxPosition(local, 0)[2];
				var aimangles = VectorAngles(VectorSubtract(predicted_leg_pos[predicted_leg], ExtrapolateTick(local, 2, start)));
				last_leg_pos = predicted_leg_pos[predicted_leg];
				Cheat.ExecuteCommand("+attack");
				Local.SetViewAngles(aimangles);
				var mov = UserCMD.GetMovement();
				UserCMD.SetMovement([mov[0] * -1, mov[1] * -1, mov[2] * -1]);
    			predict_shot = true;
				break;
			}
			else shoot = false;
		}
	}
	if(!shoot) viewangles_bak = Local.GetViewAngles();
}

Global.RegisterCallback("CreateMove", "legPrediction");

var local_buymenu_opened = false;
function buymenuOpen(){
	local_buymenu_opened = !local_buymenu_opened;
}
Global.RegisterCallback("buymenu_open", "buymenuOpen");

function playerDeath(){
	var player = Entity.GetEntityFromUserID(Event.GetInt("userid"));
	if(player == local) local_buymenu_opened = false;
}
Global.RegisterCallback("player_death", "playerDeath");

function buytimeEnded(){
	local_buymenu_opened = false;
}
Global.RegisterCallback("buytime_ended", "buytimeEnded");


function legPredictionDraw(){
	if(!GUI.GetValue("Rage", "General", "Leg prediction")) return;
	var pos = Render.WorldToScreen(last_leg_pos);
	var size = 6;
	Render.FilledRect(pos[0] - size / 2, pos[1] - size / 2, size, size, [255, 0, 0, 255]);
}

Global.RegisterCallback("Draw", "legPredictionDraw");

function knifeChanger(){
	if (!GUI.GetValue("Visuals", "Local", "Knife changer") || !isAlive) return;
	var team = Entity.GetProp(local, "DT_BaseEntity", "m_iTeamNum")
	if (team == 2) UI.SetValue("Misc", "SKINS", "Knife", "Knife model", GUI.GetValue("Visuals", "Local", "T Knife"));
	else if (team == 3) UI.SetValue("Misc", "SKINS", "Knife", "Knife model", GUI.GetValue("Visuals", "Local", "CT Knife"));
}
Global.RegisterCallback("Draw", "knifeChanger");

function adaptiveJitter(){
	if(!GUI.GetValue("Anti-Aim", "AA Presets", "Adaptive jitter")) return;
	if (!isAlive) return;
	var f = UI.GetValue("Anti-Aim", "Fake angles", "Enabled") || AntiAim.GetOverride();
	var strength = GUI.GetValue("Anti-Aim", "AA Presets", "Strength");
	var s = 15 - strength;
	var min = strength + 5;
	var max = (f ? 45 : 60);
	var v = getVelocity(local);
	var t = (Math.ceil(Globals.Tickcount() / 3) % 2);
	var a = Clamp(Math.ceil(v / (f ? s : 4)), min, max);
	var d = (f ? 10 : 30);
	if(isSlowwalking()) a = Clamp(a + (d * Clamp(strength / 2, 1, 8)), min, max);
	if (isInAir() || Input.IsKeyPressed(0x20)) a = Clamp(a + d, min, max - (f ? 15 : 10));
	UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", t ? a : -a);
}
Global.RegisterCallback("CreateMove", "adaptiveJitter");

function viewEnemyChat(){
	if(!GUI.GetValue("Misc", "General", "View enemy chat (not working in MM)")) return;
    var user_id = Entity.GetEntityFromUserID(Event.GetInt("userid"));
	if (!Entity.IsEnemy(user_id)) return;

    var text = Event.GetString("text");
    var team = Entity.GetProp(user_id, "CBaseEntity", "m_iTeamNum");
    var name = rusToEng(Entity.GetName(user_id));
    var alive = Entity.IsAlive(user_id) ? " " : " *DEAD* ";
    var string;

	if(team === 2) string = " \x09" + alive +  name + " :\x01 " + text;
	else if (team === 3) string = " \x09\x0B " + alive + name + " :\x01 " + text;
	else return;
    Cheat.PrintChat(string + "\n");
}

Cheat.RegisterCallback("player_say", "viewEnemyChat");

function noDesync(){
	if (!GUI.GetValue("Anti-Aim", "General", "No desync on DT")) return;
	UI.SetValue("Anti-Aim", "Fake angles", "Enabled", !exploitsActive("dt"));
}

Cheat.RegisterCallback("CreateMove", "noDesync");

function guiScale(){
	var scale = GUI.GetValue("Visuals", "GUI", "GUI Scale");
	scale = (scale === 0) ? 1 : (scale === 1) ? 0 : scale;
	GUI._Scale = Math.min(0.8 + (scale * 0.2), 1.35);
}

Cheat.RegisterCallback("Draw", "guiScale");

var last_shot_time = [];
function forceBackshoot(){
	if(!GUI.IsHotkeyActive("Rage", "Other", "Force backshoot")) return;
	if(!isAlive) return;
	var enemies = Entity.GetEnemies();

	for(var i = 0; i < enemies.length; i++){
		var enemy = enemies[i];
		var diff = Globals.Tickcount() - last_shot_time[enemy];
		if(!(diff >= 0 && diff <= 12)) Ragebot.IgnoreTarget(enemy);
	}
}

Cheat.RegisterCallback("CreateMove", "forceBackshoot");

function forceBackshootRecord(){
	last_shot_time[Entity.GetEntityFromUserID(Event.GetInt("userid"))] = Globals.Tickcount();
}

Cheat.RegisterCallback("weapon_fire", "forceBackshootRecord");

function freestanding(){
	if(!GUI.GetMasterState("Anti-Aim", "General", "Freestanding")) return;
	UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Auto direction", GUI.IsHotkeyActive("Anti-Aim", "General", "Freestanding"));
}
Cheat.RegisterCallback("CreateMove", "freestanding");

function extendedBacktracking(){
	UI.SetValue("Misc", "GENERAL", "Miscellaneous", "Extended backtracking", GUI.IsHotkeyActive("Rage", "Other", "Extended backtracking"))
}

Cheat.RegisterCallback("CreateMove", "extendedBacktracking");

//Clean up
function resetVarsOnConnect(){
	if(Entity.GetEntityFromUserID(Event.GetInt("userid")) != local) return;
	last_leg_pos = [], spectators_alpha = [], defensive_pos = [], tracer_lines = [], pmolotov = [], hits = [], lines = [], last_shot_time = [], trailpos = [];
	hideshots_enable_time = false;
}
Global.RegisterCallback("player_connect_full", "resetVarsOnConnect");

function resetVarsOnDeath(){
	if(Entity.GetEntityFromUserID(Event.GetInt("userid")) != local) return;
	last_leg_pos = [], defensive_pos = [], tracer_lines = [], last_shot_time = [], trailpos = [];
	hideshots_enable_time = false;
}
Global.RegisterCallback("player_death", "resetVarsOnDeath");

function resetVarsOnNewRound(){
	last_leg_pos = [], defensive_pos = [], tracer_lines = [], pmolotov = [], hits = [], lines = [], last_shot_time = [], trailpos = [];
	hideshots_enable_time = false;
}
Global.RegisterCallback("round_start", "resetVarsOnNewRound")

function defensiveDTAfterShot(){
	if(GUI.GetValue("Rage", "Doubletap", "DT Boost") !== 1 || !local || !exploitsActive("dt") ||Entity.GetEntityFromUserID(Event.GetInt("userid")) != local) return;
	if(defensiveDTClantagState){
		Local.SetClanTag("!|!|!|!|!|!|!|!");
		defensiveDTClantagState = false;
	}
	else{
		Local.SetClanTag("|!|!|!|!|!|!|!|");
		defensiveDTClantagState = true;
	}
}
Cheat.RegisterCallback("weapon_fire", "defensiveDTAfterShot");

var skeleton_draw_time = 4;
var hitlist = [[], [], []];
function skeletonOnHit(){
	if(!GUI.GetValue("Visuals", "Players", "Skeleton on hit") || Entity.GetEntityFromUserID(Event.GetString("attacker")) !== local) return;
    var hitboxPos = [];
    for (var i = 0; i < 19; i++) hitboxPos.push(Entity.GetHitboxPosition(Entity.GetEntityFromUserID(Event.GetString("userid")), i));
    hitlist[0].push(Global.Curtime() + skeleton_draw_time), hitlist[1].push(hitboxPos);
}
function skeletonOnHit2(){
	if (!GUI.GetValue("Visuals", "Players", "Skeleton on hit") || hitlist[0].length == 0) return;
	var color = GUI.GetColor("Visuals", "Players", "Skeleton on hit");
    for(var i = 0; i < hitlist[0].length; i++)
    if(Global.Curtime() < hitlist[0][i]) skeletonOnHit3(hitlist[1][i], color);
	else hitlist[0].splice(i, 1), hitlist[1].splice(i, 1), hitlist[2].splice(i, 1);
}
function skeletonOnHit3(pos, col){
    var skel = [[0, 1],[1, 6],[6, 5],[5, 4],[4, 3],[3, 2],[2, 7],[2, 8],[8, 10],
	[10, 12],[7, 9],[9, 11],[6, 15],[15, 16],[16, 13],[6, 17],[17, 18],[18, 14]];
    for (var i = 0; i < skel.length; i++){
        var p1 = Render.WorldToScreen(pos[skel[i][0]]);
        var p2 = Render.WorldToScreen(pos[skel[i][1]]);
		if(!p1 || !p2) continue;
        Render.Line(p1[0], p1[1], p2[0], p2[1], col);
    }
}
Global.RegisterCallback("player_hurt", "skeletonOnHit");
Global.RegisterCallback("Draw", "skeletonOnHit2");

//Hitmarker
var hitShots = [];
const hitgroup_to_hitbox = {0: 3, 1: 0, 2: 5, 3: 2, 4: 13, 5: 14, 6: 12, 7: 11};
function hitShotsHandle(){
	var hitmarkerEnabled = GUI.GetValue("Visuals", "Players", "Hit marker");
	var damageMarkerEnabled = GUI.GetValue("Visuals", "Players", "Damage marker");
	if(!hitmarkerEnabled && !damageMarkerEnabled) return;
	var s = 7;
	var disableTime = 250;
	for(shot in hitShots){
		if(!shot) continue;
		var w2s = Render.WorldToScreen(hitShots[shot][1]);
		if(!w2s) continue;
		var time = hitShots[shot][2];
		if(time > disableTime){
			hitShots.splice(shot, 1);
			continue;
		}
		var x = w2s[0];
		var y = w2s[1];
		var alpha = 255 * (1 - (time / disableTime));
		if(hitmarkerEnabled){
			var col = GUI.GetColor("Visuals", "Players", "Hit marker");
			col[3] = alpha;
			Render.Line(x + s, y + s, x + (s / 3), y + (s / 3), col);
        	Render.Line(x + s, y - s, x + (s / 3), y - (s / 3), col);
        	Render.Line(x - s, y - s, x - (s / 3), y - (s / 3), col);
        	Render.Line(x - s, y + s, x - (s / 3), y + (s / 3), col);
		}
		if(damageMarkerEnabled){
			var col = GUI.GetColor("Visuals", "Players", "Damage marker");
			y = y - 16 - Math.floor((time / VectorDistance(Entity.GetRenderOrigin(local), hitShots[shot][1])) * 200);
			x = x - 15 + hitShots[shot][3];
			col[3] = alpha;
			var font = Render.AddFont("Verdana", 8, 600);
			var dmg = hitShots[shot][0] + "";
			if(GUI.GetValue("Visuals", "Players", "Outline")){
			    Render.StringCustom(x + 1, y, 0, dmg, [0, 0, 0, alpha], font);
			    Render.StringCustom(x - 1, y, 0, dmg, [0, 0, 0, alpha], font);
			    Render.StringCustom(x, y + 1, 0, dmg, [0, 0, 0, alpha], font);
			    Render.StringCustom(x, y - 1, 0, dmg, [0, 0, 0, alpha], font);
			}
			Render.StringCustom(x, y, 0, dmg, col, font);
		}
		hitShots[shot][2]++;
	}
}
function addHitShot(){
	if(!GUI.GetValue("Visuals", "Players", "Damage marker") && !GUI.GetValue("Visuals", "Players", "Hit marker")) return;
	var entity = Entity.GetEntityFromUserID(Event.GetInt("userid"));
	var group = Event.GetInt("hitgroup");
	var hitboxId = (hitgroup_to_hitbox[group] || hitgroup_to_hitbox[group] === 0) ? hitgroup_to_hitbox[group] : 3;
	var hitbox = Entity.GetHitboxPosition(entity, +hitboxId);
	if (Entity.GetEntityFromUserID(Event.GetString("attacker")) == Entity.GetLocalPlayer())
		hitShots.push([Event.GetInt("dmg_health"), hitbox, 0, Math.floor(Math.random() * Math.floor(30))]);
}
Global.RegisterCallback("player_hurt", "addHitShot");
Global.RegisterCallback("Draw", "hitShotsHandle");

var hideshots_enable_time = false;
function autoPeekHelperHSTP(){
	if(!GUI.GetValue("Rage", "General", "Auto peek helper") || !isAutopeeking()) return;
	if(!exploitsActive("hs") || Event.GetInt("exploit") !== 1) return;
	if (UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Hide shots")) UI.ToggleHotkey("Rage", "GENERAL", "Exploits", "Hide shots");
	GUI.OverrideState("Misc", "Keybinds fixer", "Hide shots", false);
	hideshots_enable_time = Globals.Tickcount() + 32;
}
Global.RegisterCallback("ragebot_fire", "autoPeekHelperHSTP");

function betterGlowChams(){
	if(!GUI.GetValue("Visuals", "Players", "Better glow chams")) return;
    var index = Material.Get("Better glow");
    if (index > 0){
        Material.SetKeyValue(index, "$baseTexture", "vgui/white");
        Material.SetKeyValue(index, "$additive", GUI.GetDropdownValue("Visuals", "Players", "Glow settings", "Hollow") ? "1" : "0")
        Material.SetKeyValue(index, "$envmap", "models/effects/cube_white")
        Material.SetKeyValue(index, "$envmapfresnel", "1")
        
		var color = GUI.GetColor("Visuals", "Players", "Better glow chams");
        if(GUI.GetDropdownValue("Visuals", "Players", "Glow settings", "Pulse")){
            var sine = (Math.sin(Globals.Realtime() * 7) + 5) * 0.6;
            color[0] *= sine
            color[1] *= sine
            color[2] *= sine
        }
        Material.SetKeyValue(index, "$wireframe", GUI.GetDropdownValue("Visuals", "Players", "Glow settings", "Wireframe") ? "1" : "0");
        var vibrancy = GUI.GetValue("Visuals", "Players", "Vibrancy") / 10;
        Material.SetKeyValue(index, "$envmapfresnelminmaxexp",  "[0 " + (11 - vibrancy) + " " + ((11 - vibrancy) * 2) + "]");
        Material.SetKeyValue(index, "$envmaptint", "[" + color[0] / 255 + " " + color[1] / 255 + " " + color[2] / 255 + "]");
        Material.SetKeyValue(index, "$alpha", color[3] / 255 + "");
        Material.Refresh(index);
    }
}
Global.RegisterCallback("Material", "betterGlowChams");
var betterGlowChamsRegistered = false;
function registerBetterGlowChams(){
	if(!GUI.GetValue("Visuals", "Players", "Better glow chams")){
		betterGlowChamsRegistered = false;
        Material.Destroy("Better glow");
    	return;
	}
	if(!betterGlowChamsRegistered){
		Material.Create("Better glow");
		betterGlowChamsRegistered = true;
	}
}
Global.RegisterCallback("Draw", "registerBetterGlowChams");

function autoSvLan(){
	if(!GUI.GetValue("Misc", "General", "Auto sv_lan 1")) return;
	if(Convar.GetInt("sv_lan") === 0) Cheat.ExecuteCommand("sv_lan 1");
}
Global.RegisterCallback("Draw", "autoSvLan");

//Clean up
Duktape.gc();

//Callbacks
Global.RegisterCallback("Draw", "GUI.Draw");
Global.RegisterCallback("CreateMove", "GUI.CreateMove");
