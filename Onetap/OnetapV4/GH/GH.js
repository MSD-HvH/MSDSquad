function CreateErrorHandler(fnCallback) {
    Duktape.errCreate = function(e) {
        if(!(e instanceof Error) || 'thrown' in e || !Object.isExtensible(e))
            return e;
        e = fnCallback(e);
        return e;
    }
}
CreateErrorHandler(function(e) {
    e.time = new Date();
    Cheat.PrintChat("　\x0E" + "[GHelper]\x02 Whoops, looks like something went wrong. Please check your console.\n");
    Cheat.ExecuteCommand("playvol resource/warning.wav 100");
    Cheat.Print(e.fileName + "\n\n\n");
    if (e.fileName.includes("GHelper_Data") == true) {
        Cheat.PrintColor([255, 0, 255, 255], "[GHelper DEBUG]\n");
        Cheat.PrintColor([255, 0, 0, 255], "    The data file has a parse error (line " + e.lineNumber + ")\n");
        Cheat.PrintColor([255, 0, 255, 255], "[GHelper DEBUG]\n");
    } else {
        Cheat.PrintColor([255, 0, 255, 255], "[GHelper DEBUG]\n");
        Cheat.PrintColor([255, 0, 0, 255], "    " + e.name + ": " + e.message + " at line " + e.lineNumber + "\n");
        Cheat.PrintColor([255, 0, 0, 255], "    Send this information to ");
        Cheat.PrintColor([0, 255, 0, 255], "TIEPCUK ");
        Cheat.PrintColor([255, 0, 0, 255], "on onetap forum\n");
        Cheat.PrintColor([255, 0, 255, 255], "[GHelper DEBUG]\n");
    }
    return e;
});
var Required_Locations = require("GHelper\\GHelper_Data.js")["locations"];
var Loaded_Grenades = [];
var Render_Grenades = [];
var Render_Position_Indexes = [];
var DEBUG_Render_Uncombined = false;
UI.AddSubTab(["Misc.", "SUBTAB_MGR"], "Grenade Helper");
UI.AddHotkey(["Misc.", "Keys", "Keys", "Key assignment"], "Grenade Throw", "Throw");
UI.AddMultiDropdown(["Misc.", "Grenade Helper", "Grenade Helper"], "Grenades", ["HE Grenade", "Molotov", "Smoke", "Flashbang"]);
UI.AddCheckbox(["Misc.", "Grenade Helper", "Grenade Helper"], "Render Whole Map [FPS]");
UI.AddColorPicker(["Misc.", "Grenade Helper", "Grenade Helper"], "Accent color");
UI.AddSubTab(["Misc.", "SUBTAB_MGR"], "Location Manager");
UI.AddCheckbox(["Misc.", "Location Manager", "Location Manager"], "Add Location");
UI.AddCheckbox(["Misc.", "Location Manager", "Location Manager"], "Set Location");
UI.AddCheckbox(["Misc.", "Location Manager", "Location Manager"], "Goto Location");
UI.AddSliderFloat(["Misc.", "Location Manager", "Location Manager"], "Pitch", -90, 90);
UI.AddSliderFloat(["Misc.", "Location Manager", "Location Manager"], "Yaw", -180, 180);
UI.AddSliderFloat(["Misc.", "Location Manager", "Location Manager"], "POS_X", -100000, 100000);
UI.AddSliderFloat(["Misc.", "Location Manager", "Location Manager"], "POS_Y", -100000, 100000);
UI.AddSliderFloat(["Misc.", "Location Manager", "Location Manager"], "POS_Z", -100000, 100000);
UI.AddTextbox(["Misc.", "Location Manager", "Location Manager"], "Name");
UI.AddTextbox(["Misc.", "Location Manager", "Location Manager"], "Description");
UI.AddDropdown(["Misc.", "Location Manager", "Location Manager"], "Throw Strength", ["Left", "Left + Right", "Right"], 0);
UI.AddMultiDropdown(["Misc.", "Location Manager", "Location Manager"], "Location Settings", ["Run", "Jump", "Duck"]);
UI.AddCheckbox(["Misc.", "Location Manager", "Location Manager"], "Walk (Shift)");
UI.AddSliderInt(["Misc.", "Location Manager", "Location Manager"], "Run Duration", 0, 64);
UI.AddSliderInt(["Misc.", "Location Manager", "Location Manager"], "Run Yaw", -180, 180);
UI.AddSliderInt(["Misc.", "Location Manager", "Location Manager"], "Jump Delay", 0, 64);
UI.AddCheckbox(["Misc.", "Location Manager", "Location Manager"], "Print Location");
function Get_Dropdown_Value(Value, Index) {
    var Mask = 1 << Index;
    return Value & Mask ? true : false;
}
var Adding_Weapon = "";
function Menu_Handler() {
    UI.SetEnabled(["Misc.", "Location Manager", "Location Manager", "POS_X"], 0);
    UI.SetEnabled(["Misc.", "Location Manager", "Location Manager", "POS_Y"], 0);
    UI.SetEnabled(["Misc.", "Location Manager", "Location Manager", "POS_Z"], 0);
    if (UI.GetValue(["Misc.", "Location Manager", "Location Manager", "Add Location"])) {
        UI.SetEnabled(["Misc.", "Location Manager", "Location Manager", "Pitch"], 1);
        UI.SetEnabled(["Misc.", "Location Manager", "Location Manager", "Yaw"], 1);
        UI.SetEnabled(["Misc.", "Location Manager", "Location Manager", "Set Location"], 1);
        if (UI.GetValue(["Misc.", "Location Manager", "Location Manager", "Set Location"]) == 1) {
            UI.SetValue(["Misc.", "Location Manager", "Location Manager", "Set Location"], 0)
            if (World.GetMapName().toString != "") {
                UI.SetValue(["Misc.", "Location Manager", "Location Manager", "Pitch"], Local.GetViewAngles()[0]);
                UI.SetValue(["Misc.", "Location Manager", "Location Manager", "Yaw"], Local.GetViewAngles()[1]);
                var Position = [0, 0, 0]
                if (Entity.GetProp(Entity.GetLocalPlayer(), "DT_BaseEntity", "m_vecOrigin")[0] != undefined) {
                    Position[0] = Entity.GetProp(Entity.GetLocalPlayer(), "DT_BaseEntity", "m_vecOrigin")[0]
                }
                if (Entity.GetProp(Entity.GetLocalPlayer(), "DT_BaseEntity", "m_vecOrigin")[1] != undefined) {
                    Position[1] = Entity.GetProp(Entity.GetLocalPlayer(), "DT_BaseEntity", "m_vecOrigin")[1]
                }
                if (Entity.GetProp(Entity.GetLocalPlayer(), "DT_BaseEntity", "m_vecOrigin")[2] != undefined) {
                    Position[2] = Entity.GetProp(Entity.GetLocalPlayer(), "DT_BaseEntity", "m_vecOrigin")[2]
                }
                UI.SetValue(["Misc.", "Location Manager", "Location Manager", "POS_X"], Position[0]);
                UI.SetValue(["Misc.", "Location Manager", "Location Manager", "POS_Y"], Position[1]);
                UI.SetValue(["Misc.", "Location Manager", "Location Manager", "POS_Z"], Position[2]);
            }
        }
        UI.SetEnabled(["Misc.", "Location Manager", "Location Manager", "Goto Location"], 1);
        if (UI.GetValue(["Misc.", "Location Manager", "Location Manager", "Goto Location"]) == 1) {
            UI.SetValue(["Misc.", "Location Manager", "Location Manager", "Goto Location"], 0)
            if (World.GetMapName().toString != "") {
                Cheat.ExecuteCommand("setpos " + UI.GetValue(["Misc.", "Location Manager", "Location Manager", "POS_X"]) + " " + UI.GetValue(["Misc.", "Location Manager", "Location Manager", "POS_Y"]) + " " + UI.GetValue(["Misc.", "Location Manager", "Location Manager", "POS_Z"]))
                Cheat.ExecuteCommand("setang " + UI.GetValue(["Misc.", "Location Manager", "Location Manager", "Pitch"]) + " " + UI.GetValue(["Misc.", "Location Manager", "Location Manager", "Yaw"]))
            }
        }
        UI.SetEnabled(["Misc.", "Location Manager", "Location Manager", "Name"], 1);
        UI.SetEnabled(["Misc.", "Location Manager", "Location Manager", "Description"], 1);
        UI.SetEnabled(["Misc.", "Location Manager", "Location Manager", "Throw Strength"], 1);
        UI.SetEnabled(["Misc.", "Location Manager", "Location Manager", "Location Settings"], 1);
        if (Get_Dropdown_Value(UI.GetValue(["Misc.", "Location Manager", "Location Manager", "Location Settings"]), 0)) {
            UI.SetEnabled(["Misc.", "Location Manager", "Location Manager", "Run Duration"], 1);
            UI.SetEnabled(["Misc.", "Location Manager", "Location Manager", "Run Yaw"], 1);
            UI.SetEnabled(["Misc.", "Location Manager", "Location Manager", "Walk (Shift)"], 1);
        } else {
            UI.SetValue(["Misc.", "Location Manager", "Location Manager", "Run Duration"], 0);
            UI.SetValue(["Misc.", "Location Manager", "Location Manager", "Run Yaw"], 0);
            UI.SetEnabled(["Misc.", "Location Manager", "Location Manager", "Run Duration"], 0);
            UI.SetEnabled(["Misc.", "Location Manager", "Location Manager", "Run Yaw"], 0);
            UI.SetEnabled(["Misc.", "Location Manager", "Location Manager", "Walk (Shift)"], 0);
            UI.SetValue(["Misc.", "Location Manager", "Location Manager", "Walk (Shift)"], 0);
        }
        if (Get_Dropdown_Value(UI.GetValue(["Misc.", "Location Manager", "Location Manager", "Location Settings"]), 1)) {
            UI.SetEnabled(["Misc.", "Location Manager", "Location Manager", "Jump Delay"], 1);
        } else {
            UI.SetValue(["Misc.", "Location Manager", "Location Manager", "Jump Delay"], 0);
            UI.SetEnabled(["Misc.", "Location Manager", "Location Manager", "Jump Delay"], 0);
        }
        UI.SetEnabled(["Misc.", "Location Manager", "Location Manager", "Print Location"], 1);
        var Pre_Strenght = 1;
        if (UI.GetValue(["Misc.", "Location Manager", "Location Manager", "Throw Strength"]) == 0) {
            Pre_Strenght = 1;
        } else var Pre_Strenght = 1;
        if (UI.GetValue(["Misc.", "Location Manager", "Location Manager", "Throw Strength"]) == 1) {
            Pre_Strenght = 0.5;
        } else var Pre_Strenght = 1;
        if (UI.GetValue(["Misc.", "Location Manager", "Location Manager", "Throw Strength"]) == 2) {
            Pre_Strenght = 0;
        }
        var Pre_Weapon = Entity.GetProp(Entity.GetWeapon(Entity.GetLocalPlayer()), "CBaseAttributableItem", "m_iItemDefinitionIndex");
        switch (Pre_Weapon) {
            case 44:
                Pre_Weapon = "weapon_hegrenade";
                break;
            case 48:
                Pre_Weapon = "weapon_incgrenade";
                break;
            case 45:
                Pre_Weapon = "weapon_smokegrenade";
                break;
            case 46:
                Pre_Weapon = "weapon_molotov";
                break;
            case 43:
                Pre_Weapon = "weapon_flashbang";
                break;
            default:
                Pre_Weapon = "weapon_unknown";
                break;
        }
        if (Pre_Weapon == "weapon_incgrenade") {
            Pre_Weapon = "weapon_molotov";
        }
        if (Adding_Weapon == "") {
            Adding_Weapon = Pre_Weapon;
        }
        var Prepared_Grenade = {
            "name" : ["UNNAMED", UI.GetString(["Misc.", "Location Manager", "Location Manager", "Name"])],
            //"description" : UI.GetString(["Misc.", "Location Manager", "Location Manager", "Description"]),
            "weapon" : Adding_Weapon,
            "position" : [UI.GetValue(["Misc.", "Location Manager", "Location Manager", "POS_X"]), UI.GetValue(["Misc.", "Location Manager", "Location Manager", "POS_Y"]), UI.GetValue(["Misc.", "Location Manager", "Location Manager", "POS_Z"])],
            "viewangles" : [UI.GetValue(["Misc.", "Location Manager", "Location Manager", "Pitch"]), UI.GetValue(["Misc.", "Location Manager", "Location Manager", "Yaw"])],
            //"duck" : Get_Dropdown_Value(UI.GetValue(["Misc.", "Location Manager", "Location Manager", "Location Settings"]), 2),
            //"grenade": {
                //"strength" : Pre_Strenght,
                //"run" : UI.GetValue(["Misc.", "Location Manager", "Location Manager", "Run Duration"]),
                //"run_yaw" : UI.GetValue(["Misc.", "Location Manager", "Location Manager", "Run Yaw"]),
                //"jump" : Get_Dropdown_Value(UI.GetValue(["Misc.", "Location Manager", "Location Manager", "Location Settings"]), 1),
                //"run_speed" : Run_Speed,
                //"delay" : UI.GetValue(["Misc.", "Location Manager", "Location Manager", "Jump Delay"])
            //}
        }
        var Prepared_Grenade_Print = {};
        if (UI.GetString(["Misc.", "Location Manager", "Location Manager", "Description"]) != "") {
            Prepared_Grenade.description = UI.GetString(["Misc.", "Location Manager", "Location Manager", "Description"]);
        }
        if (Get_Dropdown_Value(UI.GetValue(["Misc.", "Location Manager", "Location Manager", "Location Settings"]), 2) == true) {
            Prepared_Grenade.duck = Get_Dropdown_Value(UI.GetValue(["Misc.", "Location Manager", "Location Manager", "Location Settings"]), 2);
        }
        if (Pre_Strenght != 1 || UI.GetValue(["Misc.", "Location Manager", "Location Manager", "Run Duration"]) != 0 || UI.GetValue(["Misc.", "Location Manager", "Location Manager", "Run Yaw"]) != 0 || Get_Dropdown_Value(UI.GetValue(["Misc.", "Location Manager", "Location Manager", "Location Settings"]), 1) == true || UI.GetValue(["Misc.", "Location Manager", "Location Manager", "Jump Delay"]) != 0 || UI.GetValue(["Misc.", "Location Manager", "Location Manager", "Walk (Shift)"]) == 1) {
            Prepared_Grenade.grenade = new Array();
        }
        if (Pre_Strenght != 1) {
            Prepared_Grenade.grenade.strength = Pre_Strenght;
            Prepared_Grenade_Print.strength = Pre_Strenght;
        }
        if (UI.GetValue(["Misc.", "Location Manager", "Location Manager", "Run Duration"]) != 0) {
            Prepared_Grenade.grenade.run = UI.GetValue(["Misc.", "Location Manager", "Location Manager", "Run Duration"]);
            Prepared_Grenade_Print.run = UI.GetValue(["Misc.", "Location Manager", "Location Manager", "Run Duration"]);
        }
        if (UI.GetValue(["Misc.", "Location Manager", "Location Manager", "Walk (Shift)"]) == 1 && UI.GetValue(["Misc.", "Location Manager", "Location Manager", "Run Duration"]) != 0) {
            Run_Speed = false
            if (UI.GetValue(["Misc.", "Location Manager", "Location Manager", "Walk (Shift)"]) == 1) {
                Run_Speed = true
            }
            if (Run_Speed == true) {
                Prepared_Grenade_Print.run_speed = Run_Speed;
                Prepared_Grenade.grenade.run_speed = Run_Speed;
            }
        }
        if (UI.GetValue(["Misc.", "Location Manager", "Location Manager", "Run Yaw"]) != 0 && UI.GetValue(["Misc.", "Location Manager", "Location Manager", "Run Duration"]) != 0) {
            Prepared_Grenade.grenade.run_yaw = UI.GetValue(["Misc.", "Location Manager", "Location Manager", "Run Yaw"]);
            Prepared_Grenade_Print.run_yaw = UI.GetValue(["Misc.", "Location Manager", "Location Manager", "Run Yaw"]);
        }
        if (Get_Dropdown_Value(UI.GetValue(["Misc.", "Location Manager", "Location Manager", "Location Settings"]), 1) == true) {
            Prepared_Grenade.grenade.jump = Get_Dropdown_Value(UI.GetValue(["Misc.", "Location Manager", "Location Manager", "Location Settings"]), 1);
            Prepared_Grenade_Print.jump = Get_Dropdown_Value(UI.GetValue(["Misc.", "Location Manager", "Location Manager", "Location Settings"]), 1);
        }
        if (UI.GetValue(["Misc.", "Location Manager", "Location Manager", "Jump Delay"]) != 0 && Get_Dropdown_Value(UI.GetValue(["Misc.", "Location Manager", "Location Manager", "Location Settings"]), 1) == true) {
            Prepared_Grenade.grenade.delay = UI.GetValue(["Misc.", "Location Manager", "Location Manager", "Jump Delay"]);
            Prepared_Grenade_Print.delay = UI.GetValue(["Misc.", "Location Manager", "Location Manager", "Jump Delay"]);
        }
        Prepared_Grenade_Print = JSON.stringify(Prepared_Grenade_Print, null, 8)
        var Prepared_Description = ""
        if (typeof Prepared_Grenade.description !== "undefined") {
            Prepared_Description = Prepared_Grenade.description
        }
        Render_Grenades.temp_render = [[Prepared_Grenade.position, Prepared_Grenade.name[1], Prepared_Description, Prepared_Grenade.weapon, Prepared_Grenade.viewangles]];
        Render_Grenades.temp_render.Alpha = 0
        Render_Grenades.temp_render.Expand1 = 0
        Render_Grenades.temp_render.Expand2 = 0
        Loaded_Grenades.temp_grenade = Prepared_Grenade;
        if (UI.GetValue(["Misc.", "Location Manager", "Location Manager", "Print Location"]) == 1) {
            UI.SetValue(["Misc.", "Location Manager", "Location Manager", "Print Location"], 0);
            //cringe printnade
            Cheat.PrintColor([200, 255, 0, 255], '\n[GHelper] ');
            Cheat.PrintColor([255, 255, 255, 255], 'Here is your grenade: \n \n');
            Cheat.PrintColor([255, 255, 255, 255], '{ \n');
            Cheat.PrintColor([255, 255, 255, 255], '  "name" : ["UNNAMED", "' + Prepared_Grenade.name[1] + '"], \n');
            Cheat.PrintColor([255, 255, 255, 255], '  "weapon" : "' + Prepared_Grenade.weapon + '", \n');
            if (typeof Prepared_Grenade.description !== "undefined") {
                Cheat.PrintColor([255, 255, 255, 255], '  "description" : "' + Prepared_Grenade.description + '", \n');
            }
            Cheat.PrintColor([255, 255, 255, 255], '  "position" : [' + Prepared_Grenade.position[0] + ', ' + Prepared_Grenade.position[1] + ', ' + Prepared_Grenade.position[2] + '], \n');
            Cheat.PrintColor([255, 255, 255, 255], '  "viewangles" : [' + Prepared_Grenade.viewangles[0] + ', ' + Prepared_Grenade.viewangles[1] + ']');
            if (typeof Prepared_Grenade.duck !== "undefined") {
                Cheat.PrintColor([255, 255, 255, 255], ',\n  "duck" : "' + Prepared_Grenade.duck + '"');
            }
            if (Prepared_Grenade_Print.length > 2) {
                Cheat.PrintColor([255, 255, 255, 255], ',\n  "grenade" : {');
                Cheat.PrintColor([255, 255, 255, 255], Prepared_Grenade_Print.slice(1, Prepared_Grenade_Print.length - 1));
                Cheat.PrintColor([255, 255, 255, 255], '  }');
            }
            Cheat.PrintColor([255, 255, 255, 255], '\n},\n\n');
        }
    } else {
        UI.SetEnabled(["Misc.", "Location Manager", "Location Manager", "Pitch"], 0);
        UI.SetEnabled(["Misc.", "Location Manager", "Location Manager", "Yaw"], 0);
        UI.SetEnabled(["Misc.", "Location Manager", "Location Manager", "Set Location"], 0);
        UI.SetEnabled(["Misc.", "Location Manager", "Location Manager", "Goto Location"], 0);
        UI.SetEnabled(["Misc.", "Location Manager", "Location Manager", "Name"], 0);
        UI.SetEnabled(["Misc.", "Location Manager", "Location Manager", "Description"], 0);
        UI.SetEnabled(["Misc.", "Location Manager", "Location Manager", "Throw Strength"], 0);
        UI.SetEnabled(["Misc.", "Location Manager", "Location Manager", "Location Settings"], 0);
        UI.SetEnabled(["Misc.", "Location Manager", "Location Manager", "Run Duration"], 0);
        UI.SetEnabled(["Misc.", "Location Manager", "Location Manager", "Run Yaw"], 0);
        UI.SetEnabled(["Misc.", "Location Manager", "Location Manager", "Jump Delay"], 0);
        UI.SetEnabled(["Misc.", "Location Manager", "Location Manager", "Print Location"], 0);
        UI.SetEnabled(["Misc.", "Location Manager", "Location Manager", "Walk (Shift)"], 0);
        UI.SetValue(["Misc.", "Location Manager", "Location Manager", "Pitch"], 0);
        UI.SetValue(["Misc.", "Location Manager", "Location Manager", "Yaw"], 0);
        UI.SetValue(["Misc.", "Location Manager", "Location Manager", "Set Location"], 0);
        UI.SetValue(["Misc.", "Location Manager", "Location Manager", "Goto Location"], 0);
        UI.SetValue(["Misc.", "Location Manager", "Location Manager", "Throw Strength"], 0);
        UI.SetValue(["Misc.", "Location Manager", "Location Manager", "Location Settings"], false & ~(1 << 0));
        UI.SetValue(["Misc.", "Location Manager", "Location Manager", "Location Settings"], false & ~(1 << 1));
        UI.SetValue(["Misc.", "Location Manager", "Location Manager", "Location Settings"], false & ~(1 << 2));
        UI.SetValue(["Misc.", "Location Manager", "Location Manager", "Run Duration"], 0);
        UI.SetValue(["Misc.", "Location Manager", "Location Manager", "Walk (Shift)"], 0);
        UI.SetValue(["Misc.", "Location Manager", "Location Manager", "Run Yaw"], 0);
        UI.SetValue(["Misc.", "Location Manager", "Location Manager", "Jump Delay"], 0);
        UI.SetValue(["Misc.", "Location Manager", "Location Manager", "Print Location"], 0);
        Adding_Weapon = "";
        Render_Grenades.temp_render = [[[0, 0, 0], "UNNAMED", "", "weapon_unknown", [0, 0]]];
        Loaded_Grenades.temp_grenade = {"name" : ["UNNAMED", "UNNAMED"], "weapon" : "weapon_unknown", "position" : [0, 0, 0], "viewangles" : [0, 0]}
    }
}
function Vector_Subtract(Vector_1, Vector_2) {
    return([Vector_1[0] - Vector_2[0], Vector_1[1] - Vector_2[1], Vector_1[2] - Vector_2[2]]);
}
function Vector_Length(Forward) {
    return Math.sqrt(Forward[0] * Forward[0] + Forward[1] * Forward[1] + Forward[2] * Forward[2]);
}
function Vector_Length_2D(Forward) {
    return Math.sqrt(Forward[0] * Forward[0] + Forward[1] * Forward[1]);
}
function Vector_Distance(Vector_1, Vector_2) {
    var Vector_X = Vector_1[0] - Vector_2[0]
    var Vector_Y = Vector_1[1] - Vector_2[1]
    var Vector_Z = Vector_1[2] - Vector_2[2]
    return Math.sqrt(Vector_X * Vector_X + Vector_Y * Vector_Y + Vector_Z * Vector_Z)
}
function Vector_Distance_2D(Vector_1, Vector_2) {
    var Vector_X = Vector_1[0] - Vector_2[0]
    var Vector_Y = Vector_1[1] - Vector_2[1]
    return Math.sqrt(Vector_X * Vector_X + Vector_Y * Vector_Y)
}
function Normalize_Angles(Angle) {
    while (Angle[0] > 89.00) Angle[0] -= 180.00;
    while (Angle[0] < -89.00) Angle[0] += 180.00;
    while (Angle[1] > 180.00) Angle[1] -= 360.00;
    while (Angle[1] < -180.00) Angle[1] += 360.00;
    return Angle;
}
function Clamp_Value(Value, Min, Max) {
    if (Value > Max) {
         Value = Max
     } else if (Value < Min) {
         Value = Min
     }
     return Value
}
function Lerp_Value(Start, End, Speed) {
    return Start + (End - Start) * Speed * Globals.Frametime();
}
function DEG2RAD(Degree) {
    return Degree * (Math.PI / 180);
}
function RAD2DEG(Radians) {
    return Radians * (180 / Math.PI);
}
function Angle_To_Vector(Angle) {
    return [Math.cos(DEG2RAD(Angle[0])) * Math.cos(DEG2RAD(Angle[1])), Math.cos(DEG2RAD(Angle[0])) * Math.sin(DEG2RAD(Angle[1])), -Math.sin(DEG2RAD(Angle[0]))];
}
function Rotate_Angle(I_X, I_Y, Degree, Distance) {
    var View_Angles = Local.GetViewAngles()
    Degree = DEG2RAD(Degree - View_Angles[1]);
    return [I_X - Math.sin(Degree) * Distance, I_Y - Math.cos(Degree) * Distance]
}
function Calculate_Yaw(Vector_1, Vector_2) {
    var Delta = [Vector_1[0] - Vector_2[0], Vector_1[1] - Vector_2[1]]
    var Yaw = Math.atan(Delta[1] / Delta[0])
    Yaw = Normalize_Angles(RAD2DEG(Yaw))
    if (Delta[0] >= 0) {
        Yaw = Normalize_Angles(Yaw + 180)
    }
    return Yaw
}
function OOF_Arrow(Angle, Color) {
    const Pulse = Clamp_Value((Math.floor(Math.sin(Globals.Realtime() * 5) * 127) + 128) + 20, 20, 255)
    var Point = Rotate_Angle(Render.GetScreenSize()[0] / 2, Render.GetScreenSize()[1] / 2, Angle, 150)
    Render.Polygon([Rotate_Angle(Point[0], Point[1], Angle, 50), Rotate_Angle(Point[0], Point[1], Angle - (50 / 2), 50 / 2), Rotate_Angle(Point[0], Point[1], Angle + (50 / 2), 50 / 2)], [Color[0], Color[1], Color[2], Pulse]);     
}
function GetDropdownValue(Path, Index) {
    var Current = 1 << Index;
    return Path & Current ? true : false
}
function Vector_To_Angle(Forward){
    var    Temp, Yaw, Pitch;
    if (Forward[1] == 0 && Forward[0] == 0) {
        Yaw = 0;
        if (Forward[2] > 0) {
            Pitch = 270;
        } else {
            Pitch = 90;
        }
    } else {
        Yaw = Math.atan2(Forward[1], Forward[0]) * 180 / Math.PI;
        if (Yaw < 0) {
            Yaw += 360;
        }
        Temp = Math.sqrt(Forward[0] * Forward[0] + Forward[1] * Forward[1]);
        Pitch = Math.atan2(-Forward[2], Temp) * 180 / Math.PI;
        if (Pitch < 0){
            Pitch += 360;
        }
    }
    return ([Pitch, Yaw]);
}
function Move_To_Point(Position) {
    var Local_Player = Entity.GetLocalPlayer();
    var Local_Player_Origin = Entity.GetProp(Local_Player, "DT_BaseEntity", "m_vecOrigin");
    //var Local_Player_Origin = Entity.GetRenderOrigin(Local_Player);
    var Delta = Vector_Subtract(Position, Local_Player_Origin);
    var Length = Vector_Length(Delta);
    var Direction = Vector_To_Angle(Delta);
    Direction[1] = Local.GetViewAngles()[1] - Direction[1]
    var Move = Angle_To_Vector(Direction)
    var Forward = Move[0] * (450 * (Math.exp(Clamp_Value(Length, 0, 5) - 5)) + 1)
    var Side = Move[1] * (450 * (Math.exp(Clamp_Value(Length, 0, 5) - 5)) + 1) // hi jeepiex
    var Duck_Factor = 1
    if (Entity.GetProp(Local_Player, "DT_BasePlayer", "m_flDuckAmount") == 1) {
        Duck_Factor = 2.93
    }
    UserCMD.SetMovement([Forward * Duck_Factor, Side * Duck_Factor, 0]);
}
var Move_Weapon = "weapon_unknown";
var Update_Weapon = "weapon_unknown";
var Last_Wpn_Anim_Reset = "weapon_unknown";
var Update_Weapon_Time = Globals.Realtime();
function On_Draw() {
    var Local_Player = Entity.GetLocalPlayer();
    var Weapon = Entity.GetProp(Entity.GetWeapon(Local_Player), "CBaseAttributableItem", "m_iItemDefinitionIndex");
    var Color_Picker = UI.GetColor(["Misc.", "Grenade Helper", "Grenade Helper", "Accent color"]);
    var Font = {
        Pixel : Render.GetFont("GHelper\\Smallest_Pixel_7.ttf", 10, false),
        Verdana : Render.GetFont("Verdana.ttf", 10, true),
        Icons : Render.GetFont("GHelper\\Undefeated.ttf", 24, false)
    }
    switch (Weapon) {
        case 44:
            Weapon = "weapon_hegrenade";
            break;
        case 48:
            Weapon = "weapon_incgrenade";
            break;
        case 45:
            Weapon = "weapon_smokegrenade";
            break;
        case 46:
            Weapon = "weapon_molotov";
            break;
        case 43:
            Weapon = "weapon_flashbang";
            break;
        default:
            Weapon = "weapon_unknown";
            break;
    }
    var Weapon_Icon = "";
    switch (Weapon) {
        case "weapon_incgrenade":
            Weapon_Icon = "n";
            break;
        case "weapon_hegrenade":
            Weapon_Icon = "j";
            break;
        case "weapon_smokegrenade":
            Weapon_Icon = "k";
            break;
        case "weapon_molotov":
            Weapon_Icon = "l";
            break;
        case "weapon_flashbang":
            Weapon_Icon = "i";
            break;
        default:
            Weapon_Icon = "";
            break;
    }
    if (Weapon == "weapon_incgrenade") {
        Weapon = "weapon_molotov";
    }
    Move_Weapon = Weapon
    var Path = UI.GetValue(["Misc.", "Grenade Helper", "Grenade Helper", "Grenades"])
    if (Weapon == "weapon_hegrenade"){
        if (!GetDropdownValue(Path, 0)) {
            Weapon = "weapon_unknown"
        }
    }
    if (Weapon == "weapon_molotov"){
        if (!GetDropdownValue(Path, 1)) {
            Weapon = "weapon_unknown"
        }
    }
    if (Weapon == "weapon_smokegrenade"){
        if (!GetDropdownValue(Path, 2)) {
            Weapon = "weapon_unknown"
        }
    }
    if (Weapon == "weapon_flashbang"){
        if (!GetDropdownValue(Path, 3)) {
            Weapon = "weapon_unknown"
        }
    }
    if (Last_Wpn_Anim_Reset != Weapon) {
        for (var d in Render_Grenades) {
            Render_Grenades[d].Alpha = 0
            Render_Grenades[d].Expand1 = 0
            Render_Grenades[d].Expand2 = 0
        }
        Last_Wpn_Anim_Reset = Weapon
    }
    if (Update_Weapon != Weapon && Update_Weapon_Time + 0.1 < Globals.Realtime()) {
        Update_Weapon = Weapon;
        Update_Weapon_Time = Globals.Realtime();
    }
    if (World.GetMapName() == "") {
        Update_Weapon = "weapon_unknown"
    }
    //dogshit render, needs recode
    if (Update_Weapon != "weapon_unknown") {
        var Local_Player_Pos = Entity.GetProp(Local_Player, "DT_BaseEntity", "m_vecOrigin");
        var View_Angles_To_Draw = new Array();
        for (var i in Render_Grenades) {
            var Positon = Render_Grenades[i][0][0]
            var Distance_2D = Vector_Distance_2D(Positon, Local_Player_Pos);
            if (UI.GetValue(["Misc.", "Grenade Helper", "Grenade Helper", "Render Whole Map [FPS]"]) || Distance_2D < 800) {
                if (Render_Grenades[i].Alpha < 254) {
                    Render_Grenades[i].Alpha = Lerp_Value(Render_Grenades[i].Alpha, 255, 8);
                }
                if (Render_Grenades[i].Alpha > 0.9 && Distance_2D < 600) {
                    if (Render_Grenades[i].Expand1 < 0.99) {
                        Render_Grenades[i].Expand1 = Lerp_Value(Render_Grenades[i].Expand1, 1, 8);
                    }
                    if (Render_Grenades[i].Expand1 > 0.9) {
                        if (Render_Grenades[i].Expand2 < 0.99) {
                            Render_Grenades[i].Expand2 = Lerp_Value(Render_Grenades[i].Expand2, 1, 8);
                        }
                    } else {
                        if (Render_Grenades[i].Expand2 > 0.01) {
                            Render_Grenades[i].Expand2 = Lerp_Value(Render_Grenades[i].Expand2, 0, 8);
                        }
                    }
                } else {
                    if (Render_Grenades[i].Expand1 > 0.01) {
                        Render_Grenades[i].Expand1 = Lerp_Value(Render_Grenades[i].Expand1, 0, 8);
                    }
                    if (Render_Grenades[i].Expand2 > 0.01) {
                        Render_Grenades[i].Expand2 = Lerp_Value(Render_Grenades[i].Expand2, 0, 8);
                    }
                }
            } else {
                if (Render_Grenades[i].Alpha > 1) {
                    Render_Grenades[i].Alpha = Lerp_Value(Render_Grenades[i].Alpha, 0, 8);
                    Render_Grenades[i].Expand1 = Lerp_Value(Render_Grenades[i].Expand1, 0, 8);
                    Render_Grenades[i].Expand2 = Lerp_Value(Render_Grenades[i].Expand2, 0, 8);
                }
            }
            if (Vector_Distance_2D(Positon, Local_Player_Pos) < 850 || UI.GetValue(["Misc.", "Grenade Helper", "Grenade Helper", "Render Whole Map [FPS]"])) {
                var Names = [];
                var Descriptions = [];
                var Weapons = [];
                var Viewangles = [];
                var Longest_Name = 0
                for (var j in Render_Grenades[i]) {
                    if (Render_Grenades[i][j][3] == Update_Weapon) {
                        Names.push(Render_Grenades[i][j][1])
                        if (Render.TextSize(Render_Grenades[i][j][1], Font.Verdana)[0] > Longest_Name) {
                            Longest_Name = Render.TextSize(Render_Grenades[i][j][1], Font.Verdana)[0]
                        }
                        Descriptions.push(Render_Grenades[i][j][2])
                        Weapons.push(Render_Grenades[i][j][3])
                        Viewangles.push(Render_Grenades[i][j][4])
                    }
                }
                if (Weapons[0] == Update_Weapon) {
                    if (Render_Grenades[i].Alpha > 2) {
                        var Screen_Pos = Render.WorldToScreen(Positon);
                        var Should_Render = false
                        if (Screen_Pos[0] > -100 && Screen_Pos[0] < Render.GetScreenSize()[0] + 100 && Screen_Pos[1] > -100 && Screen_Pos[1] < Render.GetScreenSize()[1] + 100) {
                            Should_Render = true
                        }
                        if (Should_Render) {
                            var Icon_Size = Render.TextSize(Weapon_Icon, Font.Icons);
                            var Vertical_Expand = 0
                            if (Names.length > 1) {
                                Vertical_Expand = Names.length - 1
                            }
                            Render.FilledRect(Screen_Pos[0] - Icon_Size[0] / 2 - 5, Screen_Pos[1] - 2 - (Vertical_Expand * 12 * Render_Grenades[i].Expand1) / 2, Icon_Size[0] + 10 * Render_Grenades[i].Expand2 + Longest_Name * Render_Grenades[i].Expand2 + 10, Icon_Size[1] + 4 + Vertical_Expand * 12 * Render_Grenades[i].Expand1, [18, 18, 18, Render_Grenades[i].Alpha * 0.5]);
                            Render.Rect(Screen_Pos[0] - Icon_Size[0] / 2 - 5, Screen_Pos[1] - 2 - (Vertical_Expand * 12 * Render_Grenades[i].Expand1) / 2, Icon_Size[0] + 10 * Render_Grenades[i].Expand2 + Longest_Name * Render_Grenades[i].Expand2 + 10, Icon_Size[1] + 4 + Vertical_Expand * 12 * Render_Grenades[i].Expand1, [18, 18, 18, Render_Grenades[i].Alpha * 0.375]);
                            if (Color_Picker[3] > 0) {
                                Render.Line(Screen_Pos[0] + Icon_Size[0] / 2 + 5 + 1, Screen_Pos[1] + 2 - (Vertical_Expand * 12 * Render_Grenades[i].Expand1) / 2 + 1, Screen_Pos[0] + Icon_Size[0] / 2 + 5 + 1, Screen_Pos[1] - 2 - (Vertical_Expand * 12 * Render_Grenades[i].Expand1) / 2 + 1 + Icon_Size[1] + Vertical_Expand * 12 * Render_Grenades[i].Expand1, [0, 0, 0, Render_Grenades[i].Expand2 * Color_Picker[3]]); // shadow
                            }
                            Render.Line(Screen_Pos[0] + Icon_Size[0] / 2 + 5, Screen_Pos[1] + 2 - (Vertical_Expand * 12 * Render_Grenades[i].Expand1) / 2, Screen_Pos[0] + Icon_Size[0] / 2 + 5, Screen_Pos[1] - 2 - (Vertical_Expand * 12 * Render_Grenades[i].Expand1) / 2 + Icon_Size[1] + Vertical_Expand * 12 * Render_Grenades[i].Expand1, [Color_Picker[0], Color_Picker[1], Color_Picker[2], Render_Grenades[i].Expand2 * 255]);
                            for (var g in Names) {
                                if (Color_Picker[3] > 0) {
                                    Render.String(Screen_Pos[0] + Icon_Size[0] / 2 + 11 + 1 - Icon_Size[0] * (1.0 - Render_Grenades[i].Expand2), Screen_Pos[1] + Render.TextSize(Names[g], Font.Verdana)[1] / 2 + 1 + 13.5 * g - (Vertical_Expand * 14) / 2, 0, Names[g].substr(0, Math.ceil(Names[g].length * Render_Grenades[i].Expand2)), [0, 0, 0, Render_Grenades[i].Expand2 * Color_Picker[3]], Font.Verdana) //shadow
                                }
                                Render.String(Screen_Pos[0] + Icon_Size[0] / 2 + 11 - Icon_Size[0] * (1.0 - Render_Grenades[i].Expand2), Screen_Pos[1] + Render.TextSize(Names[g], Font.Verdana)[1] / 2 + 13.5 * g - (Vertical_Expand * 14) / 2, 0, Names[g].substr(0, Math.ceil(Names[g].length * Render_Grenades[i].Expand2)), [Color_Picker[0], Color_Picker[1], Color_Picker[2], Render_Grenades[i].Expand2 * 255], Font.Verdana)
                            }
                            if (Color_Picker[3] > 0) {
                                Render.String(Screen_Pos[0] + 1, Screen_Pos[1] + 1, 1, Weapon_Icon, [0, 0, 0, Render_Grenades[i].Alpha / 255 * Color_Picker[3]], Font.Icons) // shadow
                            }
                            Render.String(Screen_Pos[0], Screen_Pos[1], 1, Weapon_Icon, [Color_Picker[0], Color_Picker[1], Color_Picker[2], Render_Grenades[i].Alpha], Font.Icons)
                        }
                        if (Vector_Distance(Positon, Local_Player_Pos) <= 50) {
                            for (var b in Viewangles) {
                                var Prepared_Data = [Viewangles[b], Positon, Names[b], Descriptions[b]];
                                View_Angles_To_Draw.push(Prepared_Data)
                            }
                        }
                    }
                }
            }
        }
        if (View_Angles_To_Draw.length > 0) {
            var Closest_View = -1
            for (var x in View_Angles_To_Draw) {
                var Screen_Position = Angle_To_Vector(View_Angles_To_Draw[x][0]);
                var World_Position = [View_Angles_To_Draw[x][1][0] + Screen_Position[0] * 400, View_Angles_To_Draw[x][1][1] + Screen_Position[1] * 400, View_Angles_To_Draw[x][1][2] + Screen_Position[2] * 400 + 64];
                Screen_Position = Render.WorldToScreen(World_Position);
                if (Closest_View == -1) {
                    Closest_View = Screen_Position
                } else {
                    if (Vector_Distance_2D([Render.GetScreenSize()[0] / 2, Render.GetScreenSize()[1] / 2], Screen_Position) < Vector_Distance_2D([Render.GetScreenSize()[0] / 2, Render.GetScreenSize()[1] / 2], Closest_View)) {
                        Closest_View = Screen_Position
                    }
                }
            }
            for (var q in View_Angles_To_Draw) {
                var Screen_Position = Angle_To_Vector(View_Angles_To_Draw[q][0]);
                var World_Position = [View_Angles_To_Draw[q][1][0] + Screen_Position[0] * 400, View_Angles_To_Draw[q][1][1] + Screen_Position[1] * 400, View_Angles_To_Draw[q][1][2] + Screen_Position[2] * 400 + 64];
                Screen_Position = Render.WorldToScreen(World_Position);
                if (Screen_Position[0] > -100 && Screen_Position[0] < Render.GetScreenSize()[0] + 100 && Screen_Position[1] > -100 && Screen_Position[1] < Render.GetScreenSize()[1] + 100) {
                    var Circle_Color = [255, 255, 0, 255]
                    if (Screen_Position[0] == Closest_View[0] && Screen_Position[1] == Closest_View[1]) {
                        Circle_Color = [0, 255, 0, 255]
                    }
                    var Description_Expand = 0
                    if (View_Angles_To_Draw[q][3] != "") {
                        Description_Expand = 1
                    }
                    var Width_Size = 0
                    if (Render.TextSize(View_Angles_To_Draw[q][2], Font.Verdana)[0] > Width_Size) {
                        Width_Size = Render.TextSize(View_Angles_To_Draw[q][2], Font.Verdana)[0]
                    }
                    if (Render.TextSize(View_Angles_To_Draw[q][3], Font.Pixel)[0] > Width_Size) {
                        Width_Size = Render.TextSize(View_Angles_To_Draw[q][3], Font.Pixel)[0]
                    }
                    Render.FilledRect(Screen_Position[0] - 12, Screen_Position[1] - 12 - 5 * Description_Expand, 25 + Width_Size + 11, 25 + 10 * Description_Expand, [18, 18, 18, 255 * 0.5]);
                    Render.Rect(Screen_Position[0] - 12, Screen_Position[1] - 12 - 5 * Description_Expand, 25 + Width_Size + 11, 25 + 10 * Description_Expand, [18, 18, 18, 255 * 0.375]);
                    if (Color_Picker[3] > 0) {
                        Render.Line(Screen_Position[0] + 12 + 1, Screen_Position[1] - 8 - 5 * Description_Expand + 1, Screen_Position[0] + 12 + 1, Screen_Position[1] + 9 + 5 * Description_Expand + 1, [0, 0, 0, Color_Picker[3]]);
                    }
                    Render.Line(Screen_Position[0] + 12, Screen_Position[1] - 8 - 5 * Description_Expand, Screen_Position[0] + 12, Screen_Position[1] + 9 + 5 * Description_Expand, [Color_Picker[0], Color_Picker[1], Color_Picker[2], 255]);
                    if (Color_Picker[3] > 0) {
                        Render.String(Screen_Position[0] + 18 + 1, Screen_Position[1] - Render.TextSize(View_Angles_To_Draw[q][2], Font.Verdana)[1] / 2 - 3 - (Render.TextSize(View_Angles_To_Draw[q][2], Font.Verdana)[1] / 2) * Description_Expand + 1, 0, View_Angles_To_Draw[q][2], [0, 0, 0, Color_Picker[3]], Font.Verdana)
                    }
                    Render.String(Screen_Position[0] + 18, Screen_Position[1] - Render.TextSize(View_Angles_To_Draw[q][2], Font.Verdana)[1] / 2 - 3 - (Render.TextSize(View_Angles_To_Draw[q][2], Font.Verdana)[1] / 2) * Description_Expand, 0, View_Angles_To_Draw[q][2], [Color_Picker[0], Color_Picker[1], Color_Picker[2], 255], Font.Verdana)
                    if (Description_Expand == 1) {
                        Render.String(Screen_Position[0] + 18 + 1, Screen_Position[1] - Render.TextSize(View_Angles_To_Draw[q][3], Font.Verdana)[1] / 2 + 2 + (Render.TextSize(View_Angles_To_Draw[q][3], Font.Verdana)[1] / 2) * Description_Expand + 1, 0, View_Angles_To_Draw[q][3], [0, 0, 0, 255], Font.Pixel)
                        Render.String(Screen_Position[0] + 18 - 1, Screen_Position[1] - Render.TextSize(View_Angles_To_Draw[q][3], Font.Verdana)[1] / 2 + 2 + (Render.TextSize(View_Angles_To_Draw[q][3], Font.Verdana)[1] / 2) * Description_Expand + 1, 0, View_Angles_To_Draw[q][3], [0, 0, 0, 255], Font.Pixel)
                        Render.String(Screen_Position[0] + 18 + 1, Screen_Position[1] - Render.TextSize(View_Angles_To_Draw[q][3], Font.Verdana)[1] / 2 + 2 + (Render.TextSize(View_Angles_To_Draw[q][3], Font.Verdana)[1] / 2) * Description_Expand - 1, 0, View_Angles_To_Draw[q][3], [0, 0, 0, 255], Font.Pixel)
                        Render.String(Screen_Position[0] + 18 - 1, Screen_Position[1] - Render.TextSize(View_Angles_To_Draw[q][3], Font.Verdana)[1] / 2 + 2 + (Render.TextSize(View_Angles_To_Draw[q][3], Font.Verdana)[1] / 2) * Description_Expand - 1, 0, View_Angles_To_Draw[q][3], [0, 0, 0, 255], Font.Pixel)
                        Render.String(Screen_Position[0] + 18, Screen_Position[1] - Render.TextSize(View_Angles_To_Draw[q][3], Font.Verdana)[1] / 2 + 2 + (Render.TextSize(View_Angles_To_Draw[q][3], Font.Verdana)[1] / 2) * Description_Expand, 0, View_Angles_To_Draw[q][3], [Color_Picker[0], Color_Picker[1], Color_Picker[2], 255], Font.Pixel)
                    }
                    //Render.FilledCircle(Screen_Position[0], Screen_Position[1], 5, [Circle_Color[0], Circle_Color[1], Circle_Color[2], 255]);
                    Render.Circle(Screen_Position[0], Screen_Position[1], 5 + 1, [16, 16, 16, 255 * 0.6])
                    Render.FilledCircle(Screen_Position[0], Screen_Position[1], 5, [Circle_Color[0], Circle_Color[1], Circle_Color[2], 255])
                    Render.Circle(Screen_Position[0], Screen_Position[1], 5 + 1, [16, 16, 16, 255 * 0.3])
                    Render.Circle(Screen_Position[0], Screen_Position[1], 5, [16, 16, 16, 255 * 0.2])
                    Render.Circle(Screen_Position[0], Screen_Position[1], 5 - 1, [16, 16, 16, 255 * 0.1])
                } else {
                    OOF_Arrow(Calculate_Yaw(Local.GetCameraPosition(), World_Position), [Color_Picker[0], Color_Picker[1], Color_Picker[2], 255])
                }
            }
        }
    }
}
function Is_In_Air() {
    var Fall_Velocity = Entity.GetProp(Entity.GetLocalPlayer(), "CBasePlayer", "m_flFallVelocity");
    if (Fall_Velocity < -1 || Fall_Velocity > 1) {
        return true;
    }
    return false;
}
var Closest_Nade_Update = Globals.Realtime();
var Closest_Nade_By_Fov = 0;
var Should_Throw = false;
var Throwing = false;
var Throw_Start = 0;
var Frozen_Nade = 0;
var Throw_Nade = false;
var Jumped = 0;
var Strength_Set = false;
var Strength_Set_Executed = false;
var Ducked = false;
var Grenade_Restart = Globals.Realtime();
var Cached_Strafe = UI.GetValue(["Misc.", "Movement", "Movement", "Auto strafe"]);
var Cached_Fake_Lag = UI.GetValue(["Rage", "Fake Lag", "Fake Lag", "Enabled"]);
var Cached_Hide_Shots = UI.GetValue(["Rage", "Exploits", "Keys", "Key assignment", "Double tap"]);
var Cached_Doubletap = UI.GetValue(["Rage", "Exploits", "Keys", "Key assignment", "Hide shots"]);
function On_Create_Move() {
    var Local_Player = Entity.GetLocalPlayer();
    if (Move_Weapon == "weapon_unknown") {
        if (Should_Throw) {
            UI.SetValue(["Misc.", "Movement", "Movement", "Auto strafe"], Cached_Strafe)
            UI.SetValue(["Rage", "Fake Lag", "Fake Lag", "Enabled"], Cached_Fake_Lag)
            Exploit.EnableRecharge()
            Cheat.ExecuteCommand("-attack")
            Cheat.ExecuteCommand("-attack2")
        }
        Should_Throw = false
        Throw_Start = 0
        Frozen_Nade = 0
        Throw_Nade = false
        Jumped = 0
        Did_Duck = false
        Strength_Set_Executed = false
        Strength_Set = false
        Should_Recover = false;
        Recovery_Active = 0;
        Recovery_Jumped = 0;
    }
    if (Globals.Realtime() > Closest_Nade_Update + 0.25) {
        var Closest_Nades_By_Pos_Cache = [];
        for (var p in Loaded_Grenades) {
            if (Move_Weapon != "weapon_unknown" && Loaded_Grenades[p].weapon == Move_Weapon && Vector_Distance(Loaded_Grenades[p].position, Entity.GetProp(Local_Player, "DT_BaseEntity", "m_vecOrigin")) <= 50) {
                Closest_Nades_By_Pos_Cache.push(Loaded_Grenades[p]);
            }
        }
        var Closest_View_H = -1
        Closest_Nade_By_Fov = 0
        for (var f in Closest_Nades_By_Pos_Cache) {
            var Screen_Position = Angle_To_Vector(Closest_Nades_By_Pos_Cache[f].viewangles);
            var World_Position = [Closest_Nades_By_Pos_Cache[f].position[0] + Screen_Position[0] * 400, Closest_Nades_By_Pos_Cache[f].position[1] + Screen_Position[1] * 400, Closest_Nades_By_Pos_Cache[f].position[2] + Screen_Position[2] * 400 + 64];
            Screen_Position = Render.WorldToScreen(World_Position);
            if (Closest_View_H == -1) {
                Closest_View_H = Screen_Position
                Closest_Nade_By_Fov = Closest_Nades_By_Pos_Cache[f]
            } else {
                if (Vector_Distance_2D([Render.GetScreenSize()[0] / 2, Render.GetScreenSize()[1] / 2], Screen_Position) < Vector_Distance_2D([Render.GetScreenSize()[0] / 2, Render.GetScreenSize()[1] / 2], Closest_View_H)) {
                    Closest_View_H = Screen_Position
                    Closest_Nade_By_Fov = Closest_Nades_By_Pos_Cache[f]
                }
            }
        }
        Closest_Nades_By_Pos_Cache = []
        Closest_Nade_Update = Globals.Realtime();
    }
    G_Duck = false
    G_Jump = false
    G_Delay = 0
    G_Strength = 1
    G_Run = 0
    G_RunSpeed = false
    G_RunYaw = 0
    G_RecoveryYaw = 420
    G_RecoveryJump = false
    if (typeof Frozen_Nade.duck !== "undefined") {
        G_Duck = Frozen_Nade.duck
    }
    if (typeof Frozen_Nade.grenade !== "undefined") {
        if (typeof Frozen_Nade.grenade.jump !== "undefined") {
            G_Jump = Frozen_Nade.grenade.jump
        }
        if (typeof Frozen_Nade.grenade.delay !== "undefined") {
            G_Delay = Frozen_Nade.grenade.delay
        }
        if (typeof Frozen_Nade.grenade.strength !== "undefined") {
            G_Strength = Frozen_Nade.grenade.strength
        }
        if (typeof Frozen_Nade.grenade.run !== "undefined") {
            G_Run = Frozen_Nade.grenade.run
            if (G_Run > 1) {
                G_Run = G_Run - 1
            }
        }
        if (typeof Frozen_Nade.grenade.run_speed !== "undefined") {
            G_RunSpeed = Frozen_Nade.grenade.run_speed
        }
        if (typeof Frozen_Nade.grenade.run_yaw !== "undefined") {
            G_RunYaw = Frozen_Nade.grenade.run_yaw
        }
        if (typeof Frozen_Nade.grenade.recovery_yaw !== "undefined") {
            G_RecoveryYaw = Frozen_Nade.grenade.recovery_yaw
        }
        if (typeof Frozen_Nade.grenade.recovery_jump !== "undefined") {
            G_RecoveryJump = Frozen_Nade.grenade.recovery_jump
        }
    }
    if (Should_Throw == true) {
        UI.SetValue(["Misc.", "Helpers", "General", "Straight throw"], 0)
        if (UI.GetValue(["Misc.", "Movement", "Movement", "Auto strafe"]) != 0) {
            Cached_Strafe = UI.GetValue(["Misc.", "Movement", "Movement", "Auto strafe"])
            UI.SetValue(["Misc.", "Movement", "Movement", "Auto strafe"], 0)
        }
        if (UI.GetValue(["Rage", "Fake Lag", "Fake Lag", "Enabled"]) != 0) {
            Cached_Fake_Lag = UI.GetValue(["Rage", "Fake Lag", "Fake Lag", "Enabled"])
            UI.SetValue(["Rage", "Fake Lag", "Fake Lag", "Enabled"], 0)
        }
        var Run_Mult = 1
        if (G_RunSpeed) {
            Run_Mult = 0.17744444444;
        }
        if (Strength_Set_Executed == false) {
            if (G_Strength == 1) {
                Cheat.ExecuteCommand("+attack")
                Cheat.ExecuteCommand("-attack2")
            }
            if (G_Strength == 0.5) {
                Cheat.ExecuteCommand("+attack")
                Cheat.ExecuteCommand("+attack2")
            }
            if (G_Strength == 0) {
                Cheat.ExecuteCommand("-attack")
                Cheat.ExecuteCommand("+attack2")
            }
            Strength_Set_Executed = true;
        }
        if (Entity.GetProp(Entity.GetWeapon(Local_Player), "CBaseCSGrenade", "m_flThrowStrength") == G_Strength) {
            Strength_Set = true
        }
        if (G_Duck) {
            Cheat.ExecuteCommand("+duck")
        }
        var Ducked = false;
        if (Entity.GetProp(Local_Player, "DT_BasePlayer", "m_flDuckAmount") == 1 && G_Duck == true) {
            Ducked = true;
        }
        if (Entity.GetProp(Local_Player, "DT_BasePlayer", "m_flDuckAmount") == 0 && G_Duck == false) {
            Ducked = true;
        }
        UserCMD.SetViewAngles([Frozen_Nade.viewangles[0], Frozen_Nade.viewangles[1], 0], true)
        if (Strength_Set == true && Ducked == true) {
            if (Throwing == false) {
                Throwing = true;
                Throw_Start = Globals.Tickcount();
            }
            if (G_Run == 0 && G_Jump == false) {
                Cheat.ExecuteCommand("-attack")
                Cheat.ExecuteCommand("-attack2")
            } else if (G_Run > 0 && G_Jump == false) {
                var Move_yaw = Angle_To_Vector([0, Normalize_Angles(Local.GetViewAngles()[1] - (Frozen_Nade.viewangles[1] + G_RunYaw))])
                UserCMD.SetMovement([Move_yaw[0] * 450 * Run_Mult, Move_yaw[1] * 450 * Run_Mult, 0]);
                if (Globals.Tickcount() - Throw_Start >= G_Run) {
                    Cheat.ExecuteCommand("-attack")
                    Cheat.ExecuteCommand("-attack2")
                }
            } else if (G_Run == 0 && G_Jump == true) {
                if (Jumped == 0) {
                    Cheat.ExecuteCommand("+jump")
                    Jumped = 1
                }
                if (Jumped == 1 && Is_In_Air()) {
                    Cheat.ExecuteCommand("-jump")
                    Jumped == 2
                }
                if (G_Delay > 0) {
                    if (Globals.Tickcount() - Throw_Start >= G_Delay) {
                        Cheat.ExecuteCommand("-attack")
                        Cheat.ExecuteCommand("-attack2")
                    }
                } else {
                    Cheat.ExecuteCommand("-attack")
                    Cheat.ExecuteCommand("-attack2")
                }
            } else if (G_Run > 0 && G_Jump == true) {
                var Move_yaw = Angle_To_Vector([0, Normalize_Angles(Local.GetViewAngles()[1] - (Frozen_Nade.viewangles[1] + G_RunYaw))])
                UserCMD.SetMovement([Move_yaw[0] * 450 * Run_Mult, Move_yaw[1] * 450 * Run_Mult, 0]);
                if (Globals.Tickcount() - Throw_Start >= G_Run) {
                    if (Jumped == 0) {
                        Cheat.ExecuteCommand("+jump")
                        Jumped = 1
                    }
                    if (Jumped == 1 && Is_In_Air()) {
                        Cheat.ExecuteCommand("-jump")
                        Jumped == 2
                    }
                    if (G_Delay > 0) {
                        if (Globals.Tickcount() - Throw_Start - G_Run >= G_Delay) {
                            Cheat.ExecuteCommand("-attack")
                            Cheat.ExecuteCommand("-attack2")
                        }
                    } else {
                        Cheat.ExecuteCommand("-attack")
                        Cheat.ExecuteCommand("-attack2")
                    }
                }
            }
        }
    }
    if (UI.GetValue(["Misc.", "Keys", "Keys", "Key assignment", "Grenade Throw"]) && Closest_Nade_By_Fov != 0) {
        if (Should_Throw == false && Input.IsChatOpen() == false && Input.IsConsoleOpen() == false && UI.IsMenuOpen() == false) {
            if (!Input.IsKeyPressed(0x57) && !Input.IsKeyPressed(0x53) && !Input.IsKeyPressed(0x41) && !Input.IsKeyPressed(0x44)) {
                Move_To_Point(Closest_Nade_By_Fov.position)
            }
            var Velocity = Entity.GetProp(Entity.GetLocalPlayer(), "CBasePlayer", "m_vecVelocity[0]");
            var Pin_Is_Pulled = Entity.GetProp(Entity.GetWeapon(Local_Player), "CBaseCSGrenade", "m_bPinPulled");
            if (Pin_Is_Pulled && Vector_Distance_2D(Closest_Nade_By_Fov.position, Entity.GetProp(Local_Player, "DT_BaseEntity", "m_vecOrigin")) < 0.2 && Vector_Length_2D([Velocity[0], Velocity[1]]) == 0 && Grenade_Restart + 1 < Globals.Realtime()) {
                Frozen_Nade = Closest_Nade_By_Fov
                Should_Throw = true
                Throw_Start = 0
                Jumped = 0
                Strength_Set = false
                Throwing = false
            }
        }
    }
}
function After_Throw() {
    if (Entity.GetEntityFromUserID(Event.GetInt("userid")) == Entity.GetLocalPlayer() && Should_Throw == true) {
        Closest_Nade_By_Fov = 0
        Should_Throw = false
        Throw_Start = 0
        Frozen_Nade = 0
        Throw_Nade = false
        Jumped = 0
        Strength_Set_Executed = false
        Strength_Set = false
        Throwing = false
        Grenade_Restart = Globals.Realtime()
        Cheat.ExecuteCommand("-attack")
        Cheat.ExecuteCommand("-attack2")
        Cheat.ExecuteCommand("-duck")
        Cheat.ExecuteCommand("-jump")
        UI.SetValue(["Misc.", "Movement", "Movement", "Auto strafe"], Cached_Strafe)
        UI.SetValue(["Rage", "Fake Lag", "Fake Lag", "Enabled"], Cached_Fake_Lag)
    }
}
function On_ItemEquip() {
    if (Entity.GetEntityFromUserID(Event.GetInt("userid")) == Entity.GetLocalPlayer() && Should_Throw == true) {
        Closest_Nade_By_Fov = 0
        Should_Throw = false
        Throw_Start = 0
        Frozen_Nade = 0
        Throw_Nade = false
        Jumped = 0
        Strength_Set_Executed = false
        Strength_Set = false
        Throwing = false
        Grenade_Restart = Globals.Realtime()
        Cheat.ExecuteCommand("-attack")
        Cheat.ExecuteCommand("-attack2")
        Cheat.ExecuteCommand("-duck")
        Cheat.ExecuteCommand("-jump")
        UI.SetValue(["Misc.", "Movement", "Movement", "Auto strafe"], Cached_Strafe)
        UI.SetValue(["Rage", "Fake Lag", "Fake Lag", "Enabled"], Cached_Fake_Lag)
    }
}
function On_Unload() {
    UI.SetValue(["Misc.", "Movement", "Movement", "Auto strafe"], Cached_Strafe)
    UI.SetValue(["Rage", "Fake Lag", "Fake Lag", "Enabled"], Cached_Fake_Lag)
}
var Search_Maps = [
    "train",
    "shoots",
    "blacksite",
    "inferno",
    "mirage",
    "dust",
    "sugarcane",
    "canals",
    "tulip",
    "apollo",
    "guard",
    "frostbite",
    "dust2",
    "italy",
    "monastery",
    "baggage",
    "aztec",
    "stmarc",
    "overpass",
    "lake",
    "sirocco",
    "ancient",
    "bank",
    "safehouse",
    "office",
    "dizzy",
    "militia",
    "engage",
    "assault",
    "vertigo",
    "agency",
    "nuke",
    "dust2_old",
    "anubis",
    "cache",
    "elysion",
    "cbble",
    "rialto"
]
var Map_Names = [
    "de_train",
    "ar_shoots",
    "dz_blacksite",
    "de_inferno",
    "de_mirage",
    "de_dust",
    "de_sugarcane",
    "de_canals",
    "de_tulip",
    "cs_apollo",
    "de_guard",
    "dz_frostbite",
    "de_dust2",
    "cs_italy",
    "ar_monastery",
    "ar_baggage",
    "de_aztec",
    "de_stmarc",
    "de_overpass",
    "de_lake",
    "dz_sirocco",
    "de_ancient",
    "de_bank",
    "de_safehouse",
    "cs_office",
    "ar_dizzy",
    "cs_militia",
    "de_engage",
    "cs_assault",
    "de_vertigo",
    "cs_agency",
    "de_nuke",
    "de_dust2_old",
    "de_anubis",
    "de_cache",
    "de_elysion",
    "de_cbble",
    "gd_rialto"
]
var Last_Loaded_Map = ""
var Allow_Draw = true
function Load_Grenades() {
    var Cur_Map_Name = World.GetMapName()
    if (Cur_Map_Name != "") {
        if (Map_Names.indexOf(Cur_Map_Name) == -1) {
            for (var m in Search_Maps) {
                if (Cur_Map_Name.includes(Search_Maps[m])) {
                    Cur_Map_Name = Map_Names[m]
                }
            }
        }
    }
    if (Cur_Map_Name != "" && Last_Loaded_Map != Cur_Map_Name) {
        Allow_Draw = false
        Last_Loaded_Map = Cur_Map_Name
        Required_Locations = require("GHelper\\GHelper_Data.js")["locations"];
        if (typeof Required_Locations[Cur_Map_Name] !== "undefined") {
            Loaded_Grenades = Required_Locations[Cur_Map_Name];
            Render_Grenades = [];
            Render_Position_Indexes = [];
        } else {
            Render_Grenades = [];
            Render_Position_Indexes = [];
            Loaded_Grenades = [{
                "name": ["UNNAMED", "UNNAMED"],
                "weapon": "weapon_wrong",
                "position": [0, 0, 0],
                "viewangles": [0, 0]
            }]
        }
        if (DEBUG_Render_Uncombined == false) {
            for (var k in Loaded_Grenades) {
                var Short_Pos_Ind = JSON.stringify(Loaded_Grenades[k].position)
                for (var e in Render_Position_Indexes) {
                    if (Vector_Distance(JSON.parse(Render_Position_Indexes[e]), Loaded_Grenades[k].position) < 2) {
                        Short_Pos_Ind = Render_Position_Indexes[e]
                    }
                }
                if (Render_Position_Indexes.indexOf(Short_Pos_Ind) == -1) {
                    Render_Position_Indexes.push(Short_Pos_Ind)
                }
                if (typeof Render_Grenades[Render_Position_Indexes.indexOf(Short_Pos_Ind)] === "undefined") {
                    Render_Grenades.splice(Render_Position_Indexes.indexOf(Short_Pos_Ind), 0, new Array());
                }
                var Description = ""
                if (typeof Loaded_Grenades[k].description !== "undefined") {
                    Description = Loaded_Grenades[k].description
                }
                var Formatted_Data = [Loaded_Grenades[k].position, Loaded_Grenades[k].name[1], Description, Loaded_Grenades[k].weapon, Loaded_Grenades[k].viewangles];
                Render_Grenades[Render_Position_Indexes.indexOf(Short_Pos_Ind)].push(Formatted_Data);
                Render_Grenades[Render_Position_Indexes.indexOf(Short_Pos_Ind)].Alpha = 0
                Render_Grenades[Render_Position_Indexes.indexOf(Short_Pos_Ind)].Expand1 = 0
                Render_Grenades[Render_Position_Indexes.indexOf(Short_Pos_Ind)].Expand2 = 0
            }
        } else {
            for (var u in Loaded_Grenades) {
                var Description = ""
                if (typeof Loaded_Grenades[u].description !== "undefined") {
                    Description = Loaded_Grenades[u].description
                }
                var Formatted_Data = [Loaded_Grenades[u].position, Loaded_Grenades[u].name[1], Description, Loaded_Grenades[u].weapon, Loaded_Grenades[u].viewangles];
                Render_Grenades.push(new Array());
                Render_Grenades[u].push(Formatted_Data);
            }
        }
        Closest_Nade_Update = Globals.Realtime()
        Closest_Nade_By_Fov = 0
        Should_Throw = false
        Throw_Start = 0
        Frozen_Nade = 0
        Throw_Nade = false
        Throwing = false
        Jumped = 0
        Strength_Set = false
        Grenade_Restart = Globals.Realtime()
        Cheat.ExecuteCommand("-attack")
        Cheat.ExecuteCommand("-attack2")
        Cheat.ExecuteCommand("-duck")
        Cheat.ExecuteCommand("-jump")
        Render_Grenades.temp_render = [[[0, 0, 0], "UNNAMED", "", "weapon_unknown", [0, 0]]]
        Loaded_Grenades.temp_grenade = {"name" : ["UNNAMED", "UNNAMED"], "weapon" : "weapon_unknown", "position" : [0, 0, 0], "viewangles" : [0, 0]}
        Move_Weapon = "weapon_unknown";
        Local_Player_Pos = Globals.Realtime();
        Local_Player_Origin_UPD = Globals.Realtime();
        Update_Weapon = "weapon_unknown";
        Last_Wpn_Anim_Reset = "weapon_unknown";
        Update_Weapon_Time = Globals.Realtime();
        Required_Locations = {}
    }
    Allow_Draw = true
}
UI.SetValue(["Misc.", "Location Manager", "Location Manager", "Add Location"], 0);
Menu_Handler();
Load_Grenades();
function Draw_Check() {
    if (Allow_Draw == true) {
        On_Draw()
    }
}
//Cheat.Print(123); //test crash
UI.RegisterCallback(["Misc.", "Location Manager", "Location Manager", "Add Location"], "Menu_Handler");
UI.RegisterCallback(["Misc.", "Location Manager", "Location Manager", "Location Settings"], "Menu_Handler");
UI.RegisterCallback(["Misc.", "Location Manager", "Location Manager", "Goto Location"], "Menu_Handler");
UI.RegisterCallback(["Misc.", "Location Manager", "Location Manager", "Set Location"], "Menu_Handler");
UI.RegisterCallback(["Misc.", "Location Manager", "Location Manager", "Pitch"], "Menu_Handler");
UI.RegisterCallback(["Misc.", "Location Manager", "Location Manager", "Yaw"], "Menu_Handler");
UI.RegisterCallback(["Misc.", "Location Manager", "Location Manager", "Name"], "Menu_Handler");
UI.RegisterCallback(["Misc.", "Location Manager", "Location Manager", "Description"], "Menu_Handler");
UI.RegisterCallback(["Misc.", "Location Manager", "Location Manager", "Throw Strength"], "Menu_Handler");
UI.RegisterCallback(["Misc.", "Location Manager", "Location Manager", "Walk (Shift)"], "Menu_Handler");
UI.RegisterCallback(["Misc.", "Location Manager", "Location Manager", "Run Duration"], "Menu_Handler");
UI.RegisterCallback(["Misc.", "Location Manager", "Location Manager", "Run Yaw"], "Menu_Handler");
UI.RegisterCallback(["Misc.", "Location Manager", "Location Manager", "Jump Delay"], "Menu_Handler");
UI.RegisterCallback(["Misc.", "Location Manager", "Location Manager", "Print Location"], "Menu_Handler");
Cheat.RegisterCallback("Unload", "On_Unload");
Cheat.RegisterCallback("grenade_thrown", "After_Throw");
Cheat.RegisterCallback("switch_team", "Load_Grenades");
Cheat.RegisterCallback("item_equip", "On_ItemEquip");
Cheat.RegisterCallback("Draw", "Draw_Check");
Cheat.RegisterCallback("CreateMove", "On_Create_Move");
