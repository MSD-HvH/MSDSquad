ui.add_slider("Speed", "speed", 1, 10)

var text = [
    "M", "MS", "MSD", "MSDS", "MSDSq", "MSDSqu", "MSDSqua", "MSDSquad",
    "MSDSquad", "MSDSqua", "MSDSqu", "MSDSq", "MSDS", "MSD", "MS", "M" 
];
var lastTime = 0;

register_callback("render", function() {
    var time = parseInt((global_vars.curtime()) * vars.get_uint("js.speed"))

    if(time != lastTime) {
        for(i in text) {
            if((time % text.length) == i) cheat.set_clantag(text[i])
        }
    }
})
