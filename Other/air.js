register_callback("render", function() {
    var flags = entity.get_flags(entity.get_local_player())
    if(!(flags & (1 << 0))){
        cheat.log("in air")
    } else {
        cheat.log("On ground")
    }
})
