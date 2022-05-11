UI.AddDropdown(["Visuals", "World", "General"], "Medal Changer", ["Year", "Operation", "OFF"], 0);
UI.AddSliderInt(["Visuals", "World", "General"], "Years Changer", 2015, 2020);
UI.AddDropdown(["Visuals", "World", "General"], "Operation Changer", ["Payback", "Bravo", "Phoenix", "Breakout", "Vanguard", "Bloodhound", "Wildfire", "Hydra", "Shattered Web"], 0);
UI.AddSliderInt(["Visuals", "World", "General"], "Level Medal", 1, 6)
UI.AddSliderInt(["Visuals", "World", "General"], "Level Medal ", 1, 2)
UI.AddSliderInt(["Visuals", "World", "General"], "Lvl Medal", 1, 4)
UI.AddSliderInt(["Visuals", "World", "General"], "Level", 1, 40 );
UI.AddSliderInt(["Visuals", "World", "General"], "Rank", 0, 18);
medal = 0;antispam = 0;antispamlvl = 0;antispammedal = 0;

if (Convar.GetString("cl_detail_max_sway") == 5){
	Cheat.PrintColor([255,255,255,255], ("["));
	Cheat.PrintColor([60,255,60,255], ("SCRIPT"));
	Cheat.PrintColor([255,255,255,255], ("] By")); 
	Cheat.PrintColor([255,60,60,255], (" Zero Two \n"));
	Convar.SetString ("cl_detail_max_sway", "5.1");
}

function draw(){
    if (UI.GetValue(["Visuals", "World", "General", "Medal Changer"]) == 0){
        UI.SetEnabled(["Visuals", "World", "General", "Years Changer"], 1);
        if (UI.GetValue(["Visuals", "World", "General", "Years Changer"]) == 2020){
            medal = 4674 + (UI.GetValue(["Visuals", "World", "General", "Level Medal"]) - 1);
            UI.SetEnabled(["Visuals", "World", "General", "Level Medal"], 1);
        }
        if (UI.GetValue(["Visuals", "World", "General", "Years Changer"]) == 2019){
            medal = 1376 + (UI.GetValue(["Visuals", "World", "General", "Level Medal"]) - 1);
            UI.SetEnabled(["Visuals", "World", "General", "Level Medal"], 1);
        }
        if (UI.GetValue(["Visuals", "World", "General", "Years Changer"]) == 2018){
            medal = 1367 + (UI.GetValue(["Visuals", "World", "General", "Level Medal"]) - 1);
            UI.SetEnabled(["Visuals", "World", "General", "Level Medal"], 1);
        }
        if (UI.GetValue(["Visuals", "World", "General", "Years Changer"]) == 2017){
            medal = 1357 + (UI.GetValue(["Visuals", "World", "General", "Level Medal"]) - 1);
            UI.SetEnabled(["Visuals", "World", "General", "Level Medal"], 1);
        }
        if (UI.GetValue(["Visuals", "World", "General", "Years Changer"]) == 2016){
            medal = 1339 + (UI.GetValue(["Visuals", "World", "General", "Level Medal"]) - 1);
            UI.SetEnabled(["Visuals", "World", "General", "Level Medal"], 1);
        }
        if (UI.GetValue(["Visuals", "World", "General", "Years Changer"]) == 2015){
            medal = 1331 + (UI.GetValue(["Visuals", "World", "General", "Level Medal "]) - 1);
            UI.SetEnabled(["Visuals", "World", "General", "Level Medal"], 1);
            UI.SetEnabled(["Visuals", "World", "General", "Level Medal"], 1);
        }else{
            UI.SetEnabled(["Visuals", "World", "General", "Level Medal"], 1);
        }
    }else{
        UI.SetEnabled(["Visuals", "World", "General", "Level Medal"], 1);
        UI.SetEnabled(["Visuals", "World", "General", "Years Changer"], 1);
        UI.SetEnabled(["Visuals", "World", "General", "Level Medal"], 1);
        UI.SetEnabled(["Visuals", "World", "General", "Operation Changer"], 1);
        UI.SetEnabled(["Visuals", "World", "General", "Lvl Medal"], 1)
    }
    if (UI.GetValue(["Visuals", "World", "General", "Medal Changer"]) == 1){
        UI.SetEnabled(["Visuals", "World", "General"], "Operation Changer", 1);
        UI.SetEnabled(["Visuals", "World", "General"], "Lvl Medal", 1)
        if (UI.GetValue(["Visuals", "World", "General", "Operation Changer"]) == 0) medal = 1001 + (UI.GetValue(["Visuals", "World", "General", "Lvl Medal"]) - 1)

        if (UI.GetValue(["Visuals", "World", "General", "Operation Changer"]) == 1) medal = 1013 + (UI.GetValue(["Visuals", "World", "General", "Lvl Medal"]) - 1)
        if (UI.GetValue(["Visuals", "World", "General", "Operation Changer"]) == 2) medal = 1024 + (UI.GetValue(["Visuals", "World", "General", "Lvl Medal"]) - 1)
        if (UI.GetValue(["Visuals", "World", "General", "Operation Changer"]) == 3) medal = 1028 + (UI.GetValue(["Visuals", "World", "General", "Lvl Medal"]) - 1)
        if (UI.GetValue(["Visuals", "World", "General", "Operation Changer"]) == 4) medal = 1316 + (UI.GetValue(["Visuals", "World", "General", "Lvl Medal"]) - 1)
        if (UI.GetValue(["Visuals", "World", "General", "Operation Changer"]) == 5) medal = 1327 + (UI.GetValue(["Visuals", "World", "General", "Lvl Medal"]) - 1)
        if (UI.GetValue(["Visuals", "World", "General", "Operation Changer"]) == 6) medal = 1336 + (UI.GetValue(["Visuals", "World", "General", "Lvl Medal"]) - 1)
        if (UI.GetValue(["Visuals", "World", "General", "Operation Changer"]) == 7) medal = 4353 + (UI.GetValue(["Visuals", "World", "General", "Lvl Medal"]) - 1)
        if (UI.GetValue(["Visuals", "World", "General", "Operation Changer"]) == 8) medal = 4550 + (UI.GetValue(["Visuals", "World", "General", "Lvl Medal"]) - 1)
    } else {
        UI.SetEnabled(["Visuals", "World", "General", "Operation Changer"], 1);
        UI.SetEnabled(["Visuals", "World", "General", "Lvl Medal"], 1)
    }
    if (UI.GetValue(["Visuals", "World", "General", "Medal Changer"]) == 2) medal = 0;	
        
        if (antispammedal != medal) {
            Entity.SetProp(Entity.GetLocalPlayer(), "CCSPlayerResource", "m_nActiveCoinRank", medal);
            antispammedal = medal;
        }
        
    if (antispamlvl != UI.GetValue(["Visuals", "World", "General", "Level"])) {
        Entity.SetProp(Entity.GetLocalPlayer(), "CCSPlayerResource", "m_nPersonaDataPublicLevel", UI.GetValue(["Visuals", "World", "General", "Level"]));
        antispamlvl = UI.GetValue(["Visuals", "World", "General", "Level"]);
    }
        
    if (antispam != UI.GetValue(["Visuals", "World", "General", "Rank"])) {
        Entity.SetProp(Entity.GetLocalPlayer(), "CCSPlayerResource", "m_iCompetitiveRanking", UI.GetValue(["Visuals", "World", "General", "Rank"]));
        antispam = UI.GetValue(["Visuals", "World", "General", "Rank"]);
    }
}
Cheat.RegisterCallback("Draw", "draw")
