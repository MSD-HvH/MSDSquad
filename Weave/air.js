function yes() {
    if(!(user_cmd.get_buttons() & (1 << 1))){
        cheat.log("On ground")
    } else {
        cheat.log("In air")
    }   
}

register_callback('render', yes)
