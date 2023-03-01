ui.add_checkbox("Confirm choosing", "confirm")
ui.add_slider("Map Choosing | wow, it's working?\n\n\nMaps | Setup: \n   0: None\n   1: Nuke\n   2: Mirage\n   3: Dust2\n   4: Overpass\n   5: Office\n   6: Inferno\n   7: Cobblestone\n   8: Shortdust\n\n   9: Warmup Setup", "maps", 0, 9)
const maps = {
    1: 'de_nuke',
    2: 'de_mirage',
    3: 'de_dust2',
    4: 'de_overpass',
    5: 'cs_office',
    6: 'de_inferno', //Made by Mased
    7: 'de_cbble',
    8: 'de_shortdust',
}

const setup = [
    'sv_cheats 1',
    'mp_roundtime_defuse 60',
    'sv_infinite_ammo 1',
    'mp_freezetime 0',
    'mp_maxmoney 16000',
    'mp_startmoney 16000',
    'mp_maxrounds 999',
    'mp_buy_anywhere 1',
    'mp_buytime 9999999999999',
    'sv_airaccelerate 100',
    'mp_restartgame 1',
    'clear'
]


register_callback("createmove", function() {
    if (vars.get_uint("js.maps") == 9 && vars.get_bool("js.confirm")) {
        for(cmds in setup) {
            cheat.execute_command(setup[cmds])
        }
        vars.set_uint("js.confirm", 0);
    }
})

register_callback("render", function() {
    for(map in maps) {
        if(vars.get_uint("js.maps") == map && vars.get_bool("js.confirm")) {
            cheat.execute_command('map ' + maps[map])
            vars.set_uint("js.confirm", 0);
            vars.set_uint("js.maps", 0);
        }
    }
})
