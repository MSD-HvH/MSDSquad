function yes() {
    if(!(user_cmd.get_buttons() & (1 << 1))){
        cheat.log("On ground")
    } else {
        cheat.log("In air")
    }   

    // (1 << 1) in air
    // (1 << 2) in ctrl
}

register_callback('render', yes)
