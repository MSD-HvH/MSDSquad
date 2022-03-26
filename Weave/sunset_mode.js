ui.add_checkbox("Sunset Mode", "sunsetMode") //Made by enQ
ui.add_slider("Sunset X", "X", -1, 100)
ui.add_slider("Sunset Y", "Y", -1, 100)
ui.add_slider("Sunset Z", "Z", -1, 100)

register_callback("createmove", function() {
    if(vars.get_bool("js.sunsetMode")) {
        convars.set_int("cl_csm_rot_override", 1)
        convars.set_int("cl_csm_rot_x", vars.get_uint("js.X"))
        convars.set_int("cl_csm_rot_y", vars.get_uint("js.Y"))
        convars.set_int("cl_csm_rot_z", vars.get_uint("js.Z"))
    } else {
        convars.set_int("cl_csm_rot_override", 0);
    }
})
