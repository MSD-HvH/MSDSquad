var playerFlags = entity.get_flags(entity.get_local_player());

function yes() {
    if(playerFlags & (1 << 0)){
        vars.set_int("ragebot.weapons[2].hitchance", 70)
    } else {
        vars.set_int("ragebot.weapons[2].hitchance", 40)
    }   
}

register_callback('createmove', yes)