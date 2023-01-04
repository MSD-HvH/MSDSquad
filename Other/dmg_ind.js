var screen = Render.GetScreenSize();
UI.AddSliderInt(["Rage", "General", "General"], "Indicator | Position X", -200, 200)
UI.AddSliderInt(["Rage", "General", "General"], "Indicator | Position Y", -200, 200)

var csgo_weapons = {
	"0": "none", "1": "Deagle", "262145": "Deagle", "2": "Dualies", "3": "Five Seven", "4": "Glock", "5": "P228", "6": "USP", 
    "7": "AK47", "8": "AUG", "9": "AWP", "10": "FAMAS", "11": "G3SG1", "12": "GALIL", "13": "GALIL", "14": "M249", "15": "M3", "16": "M4A4",
	"17": "Mac10", "18": "MP5", "19": "P90", "20": "SSG08", "21": "SG550", "22": "SG552", "23": "TMP", "24": "UMP45", "25": "XM1014", "26": "PP-Bizon", 
    "27": "MAG7", "28": "Negev", "29": "Sawed off", "30": "Tec-9", "31": "Taser", "32": "P2000", "33": "MP7", "34": "MP9", "35": "Nova", "36": "P250", 
    "37": "SCAR17", "38": "SCAR20", "39": "SG556", "40": "SSG08", "60": "M4A1-S", "63": "CZ-75", "64": "Revolver",
    "262208": "Revolver", "262205": "USP",
};

function getWeaponName(){
	if(!Entity.GetLocalPlayer()) return "none";
	var weapon = Entity.GetProp(Entity.GetWeapon(Entity.GetLocalPlayer()), "CWeaponBaseItem", "m_iItemDefinitionIndex");
    return csgo_weapons[weapon];
}

function get_damage() {
    var check = getWeaponName() == undefined ? "General" : getWeaponName()
    var font = Render.GetFont("Verdanab.ttf", 9, true);
    var x = screen[0] / 2 + UI.GetValue(["Rage", "General", "General", "Indicator | Position X"])
    var y = screen[1] / 2 + UI.GetValue(["Rage", "General", "General", "Indicator | Position Y"])

    if(UI.GetValue(["Rage", "General", "Key assignment", "Damage override"])) {
        Render.String(x + 1, y + 1, 0, UI.GetValue(["Rage", "Overrides", check, "Minimum damage (on key)"]).toString(), [0, 0, 0, 255], font)
        Render.String(x, y, 0, UI.GetValue(["Rage", "Overrides", check, "Minimum damage (on key)"]).toString(), [255, 255, 255, 255], font)
    } else {
        Render.String(x + 1, y + 1, 0, UI.GetValue(["Rage", "Target", check, "Minimum damage"]).toString(), [0, 0, 0, 255], font)
        Render.String(x, y, 0, UI.GetValue(["Rage", "Target", check, "Minimum damage"]).toString(), [255, 255, 255, 255], font)
    }
}

Cheat.RegisterCallback("Draw", "get_damage")
