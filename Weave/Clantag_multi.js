ui.add_slider("Speed", "speed", 1, 10)
ui.add_slider("Clantag", "clantag", 1, 3)

var lastTime = 0;
var clantags = {
    1: [
        " ", "N ", "N3 ", "Ne ", "Ne\\ ", "Ne\\/ ", "Nev ", "Nev3 ", "Neve ", "Neve| ", 
        "Neve|2 ", "Never| ", "Never|_ ", "Neverl ", "Neverl0 ", "Neverlo ", "Neverlo5 ", 
        "Neverlos ", "Neverlos3 ", "Neverlose ", "Neverlose. ", "Neverlose.< ", "Neverlose.c< ", 
        "Neverlose.cc ", "Neverlose.cc ", "Neverlose.c< ", "Neverlose.< ", "Neverlose. ", 
        "Neverlose ", "Neverlos3 ", "Neverlos ", "Neverlo_ ", "Neverlo5 ", "Neverlo ", "Neverl_ ", 
        "Never|0 ", "Never| ", "Neve|2 ", "Neve| ", "Neve ", "Nev3 ", "Nev ", "Ne\\/ ", "Ne\\ ", 
        "Ne ", "N3 ", "N ", " ",
    ],

    2: [
        "M", "MS", "MSD", "MSDS", "MSDSq", "MSDSqu", "MSDSqua", "MSDSquad",
        "MSDSquad", "MSDSqua", "MSDSqu", "MSDSq", "MSDS", "MSD", "MS", "M"
    ],

    3: [
        "onetap.su ", "u onetap.s", "su onetap.", ".su onetap", "p.su oneta",
        "ap.su onet", "tap.su one", "etap.su on", "netap.su o", "onetap.su "
    ],

    4: [
        "                  ", "                 g", "                ga", "               gam", "              game",
        "             games", "            gamese", "           gamesen", "          gamesens", "         gamesense",
        "        gamesense ", "       gamesense  ", "      gamesense   ", "     gamesense    ", "    gamesense     ",
        "   gamesense      ", "  gamesense       ", " gamesense        ", "gamesense         ", "amesense          ",
        "mesense           ", "esense            ", "sense             ", "sens              ", "sen               ",
        "se                ", "s                 ", "                  "
    ]
}

register_callback("render", function() {
    var time = parseInt((global_vars.curtime()) * vars.get_uint("js.speed"))

    for(i in clantags) {
        for(j in clantags[i]){
            if(vars.get_uint("js.clantag") == i){  
                if((time % clantags[i].length) == j){
                    cheat.set_clantag(clantags[i][j])
                }
            }   
        }
    }
});
