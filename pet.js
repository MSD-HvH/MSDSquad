register_callback("render", function() {
    var pos = entity.get_origin(entity.get_local_player())
    var w2s = render.world_to_screen(pos)

    render.picture("C:/weave/pet.png", [w2s[0] - 100, w2s[1] - 50], [70, 70], 255);
})
