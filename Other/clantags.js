var clantags = {
    1: [
        "onetap.su ", "u onetap.s", "su onetap.", ".su onetap", "p.su oneta",
        "ap.su onet", "tap.su one", "etap.su on", "netap.su o", "onetap.su "
    ],

    2: [
        "", "M", "MS", "MSD", "MSDS", "MSDSq", "MSDSqu", "MSDSqua", "MSDSquad",
        "MSDSquad", "MSDSqua", "MSDSqu", "MSDSq", "MSDS", "MSD", "MS", "M", ""
    ],

    3: [
        " ", "N ", "N3 ", "Ne ", "Ne\\ ", "Ne\\/ ", "Nev ", "Nev3 ", "Neve ", "Neve| ", 
        "Neve|2 ", "Never| ", "Never|_ ", "Neverl ", "Neverl0 ", "Neverlo ", "Neverlo5 ", 
        "Neverlos ", "Neverlos3 ", "Neverlose ", "Neverlose. ", "Neverlose.< ", "Neverlose.c< ", 
        "Neverlose.cc ", "Neverlose.cc ", "Neverlose.c< ", "Neverlose.< ", "Neverlose. ", 
        "Neverlose ", "Neverlos3 ", "Neverlos ", "Neverlo_ ", "Neverlo5 ", "Neverlo ", "Neverl_ ", 
        "Never|0 ", "Never| ", "Neve|2 ", "Neve| ", "Neve ", "Nev3 ", "Nev ", "Ne\\/ ", "Ne\\ ", 
        "Ne ", "N3 ", "N ", " ",
    ],

    4: [
        "                  ", "                 g", "                ga", "               gam", "              game",
        "             games", "            gamese", "           gamesen", "          gamesens", "         gamesense",
        "        gamesense ", "       gamesense  ", "      gamesense   ", "     gamesense    ", "    gamesense     ",
        "   gamesense      ", "  gamesense       ", " gamesense        ", "gamesense         ", "amesense          ",
        "mesense           ", "esense            ", "sense             ", "sens              ", "sen               ",
        "se                ", "s                 ", "                  "
    ],

    5: [
        "AIMWARE.net", "t AIMWARE.ne", "et AIMWARE.n", ".net AIMWARE",
        "E.net AIMWAR", "RE.net AIMWA", "ARE.net AIMW", "WARE.net AIM",
        "MWARE.net AI", "IMWARE.net A", "AIMWARE.net", "AIMWARE.net"
    ],
    
    6: ["nemesis", "n3m3sis"],
    
    7: [
        "[]", "[R]", "[Ri]", "[Rif]", "[Rifk⁷]", 
        "[Rifk⁷]", "[Rifk⁷]", "[Rifk]", "[Rif]", 
        "[Ri]", "[R]", "[]"
    ],

    8: [
        "l " ,"le " ,"leg " ,"lege " ,"legen " ,"legend " ,"legendw " ,"legendwa " ,"legendwar " ,
        "legendware " ,"legendware " ,"legendwar " ,"legendwa " , "legendw " ,"legend " ,"legen " ,"lege " ,"leg " ,"le " ,"l "
    ],

    9: [
        ">|", ">>|", ">>>|", ">>> |", ">>> M|", ">>> MS|", ">>> MSD|", ">>> MSD |", ">>> MSD I|", ">>> MSD In|", ">>> MSD Inc|", ">>> MSD Inc. |", 
        ">>> MSD Inc. |", ">>> MSD Inc|", ">>> MSD In|", ">>> MSD I|", ">>> MSD |", ">>> MSD|", ">>> MS|", ">>> M|", ">>> |", ">>>|", ">>|", ">|"
    ],

    10: [
        " 〄 " , " R>|〄 " , " RA>|〄 " , " R4W>|〄 " , " RAWЭ>|〄 " , " R4W3T>|〄 " , " RAWΣTR>|〄 " , " Я4WETRI>|〄 " , " RAWETRIP>|〄 " ,
        " RAWETRIP<|〄 " , " R4WETRI<|〄 " , " RAWΣTR<|〄 " , " R4W3T<|〄 " , " RAWЭ<|〄 " , " R4W<|〄 " , " RA<|〄 " , " R<|〄 " , " 〄 " ,
    ]
}
var lastTime = 0;
UI.AddDropdown(["Misc.", "Helpers", "Client"], "Clantags Changer", ["None", "Onetap V2", "MSDSquad", "Neverlose", "Gamesense", "Aimware", "Nemesis", "Rifk7", "Legendware", "MSDSquad V2", "Rawetrip 〄"], 1)
UI.AddSliderInt(["Misc.", "Helpers", "Client"], "Clantag Speed", 1, 15)

function on_cm() {
    var value = UI.GetValue(["Misc.", "Helpers", "Client", "Clantags Changer"])
    var speed = UI.GetValue(["Misc.", "Helpers", "Client", "Clantag Speed"])
    var time = parseInt((Globals.Curtime()) * speed)

    for(var i in clantags) {
        for(var j in clantags[i]) {
            if(value == i) {
                if((time % clantags[i].length) == j) Local.SetClanTag(clantags[i][j])
            }
        }
    }
}

Cheat.RegisterCallback("CreateMove", "on_cm")
