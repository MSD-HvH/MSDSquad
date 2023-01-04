var script = {
    name: "game|sense",
    screensize: render.get_screen_size(),
    keybinds_position: [230, 690],
    rounding: 3,
    indent: 7,
};

var color = {
    text: [234, 234, 234, 255],
    primary: [255, 180, 146, 255],
    secondary: [10, 126, 228, 255],
    primary_dark: [60, 36, 44, 255],
    secondary_dark: [5, 12, 17, 255],
    background: [5, 5, 5, 255],
};

var user = {
    name: "magma_btw",
    calculation_error: 20,
};

var helpers = {
    get_text_size: function(text) {
        var lines = text.split("\n");
        var max_length = 0;
        if ((lines.length - 1) > 1) {
            for (var i = 0; i < lines.length; i++) {
                if (max_length < lines[i].length * 5.3)
                    max_length = lines[i].length * 5.3;
            }
        } else max_length = text.length * 5.3;
        return max_length;
    },
    lerp: function(a, b, c) {

       return a+(b-a)*c;
    },
    color_lerp: function(color, color2, ratio) {
        return [
            helpers.lerp(color[0], color2[0], ratio),
            helpers.lerp(color[1], color2[1], ratio),
            helpers.lerp(color[2], color2[2], ratio),
            helpers.lerp(color[3], color2[3], ratio),
        ];
    },
    gradient_filled_rect: function(start, end, color, color2, horizontal) {
        if (horizontal) {
            var step = end[1] / 6;
            end[1] = end[1] / step
            var maximum = end[1];

            for (var i = 0; i < maximum; i++) {
                var ratio = i / maximum;
                var new_color = helpers.color_lerp(color, color2, ratio);

                render.line([start[0], start[1] + step / 2 + i * step] , [start[0] + end[0], start[1] + step / 2 + i * step], new_color, step);
            }
        } else {
            var step = end[0] / 6;
            end[0] = end[0] / step
            var maximum = end[0];

            for (var i = 0; i < maximum; i++) {
                var ratio = i / maximum;
                var new_color = helpers.color_lerp(color, color2, ratio);

                render.line([start[0] + step / 2 + i * step, start[1]] , [start[0] + step / 2 + i * step, start[1] + end[1]], new_color, step);
            }
        }
    },
    override_alpha: function(color, alpha) {
        return [
            color[0],
            color[1],
            color[2],
            alpha
        ];
    },
    render_fade: function(start_pos, end_pos, clr, rounding, alpha, radius) {
        var color = [clr[0], clr[1], clr[2], 0];
        for (var i = 0; i < 10; i++) {
            render.rect([start_pos[0] - i, start_pos[1] - i], [end_pos[0] + i * 2, end_pos[1] + i * 2], helpers.override_alpha(color, (10 - (10 / radius) * i) * alpha), rounding);
        }
    },
    outline_gradient_rect: function(start, end, color1, color2, horizontal) {
        if (horizontal) {
            render.rect(start, end, color2, script.rounding);
            render.rect([start[0] + end[0] - 1, start[1] + script.rounding], [1, end[1] - script.rounding * 2], color1, 0);

            render.filled_circle([start[0] + end[0] - script.rounding, start[1] + end[1] - script.rounding], script.rounding, color1, 20);
            render.filled_circle([start[0] + end[0] - script.rounding, start[1] + script.rounding], script.rounding, color1, 20);

            helpers.gradient_filled_rect([start[0] + script.rounding, start[1]], [end[0] / 3 - script.rounding * 2, 1], color2, color1, false);
            render.filled_rect([start[0] + end[0] / 3 - script.rounding, start[1]], [end[0] - end[0] / 3 - script.rounding + 2, 1], color1, 0);

            helpers.gradient_filled_rect([start[0] + script.rounding, start[1] + end[1] - 1], [end[0] / 3 - script.rounding * 2, 1], color2, color1, false);
            render.filled_rect([start[0] + end[0] / 3 - script.rounding, start[1] + end[1] - 1], [end[0] - end[0] / 3 - script.rounding + 2, 1], color1, 0);

            helpers.render_fade(start, end, color2, 3, 1, 10)
        } else {
            render.rect(start, end, color2, script.rounding);
            render.rect([start[0] + script.rounding, start[1] + end[1] - 1], [end[0] - script.rounding * 2, 1], color1, 0);

            render.filled_circle([start[0] + script.rounding, start[1] + end[1] - script.rounding], script.rounding, color1, 20);
            render.filled_circle([start[0] + end[0] - script.rounding, start[1] + end[1] - script.rounding], script.rounding, color1, 20);

            helpers.gradient_filled_rect([start[0] - 1, start[1] + script.rounding], [1, end[1] - script.rounding * 2], color2, color1, true);
            helpers.gradient_filled_rect([start[0] + end[0] - 1, start[1] + script.rounding], [1, end[1] - script.rounding * 2], color2, color1, true);

            helpers.render_fade(start, end, color2, 3, 1, 10)
        }
    },
    create_window: function(start, end, color1, color2, horizontal) {
        helpers.outline_gradient_rect(start, end, color1, color2, horizontal);

        render.filled_rect([start[0] + 1, start[1] + 1], [end[0] - 2, end[1] - 2], color.background, script.rounding);
    },
};

var watermark = {
    header: function() {
        var words = [];
        words.push(user.name);
        words.push((new Date()).toTimeString().substring(0, 8));
        var text = words.join(" | ");

        var size = [helpers.get_text_size(script.name + "  " + text) + 10 + user.calculation_error, 20];
        var position = [script.screensize[0] - size[0] - script.indent, script.indent];

        helpers.create_window(position, size, color.primary_dark, color.primary, false);

        var text_indent = 5;
        render.text([position[0] + text_indent, position[1] + 9], color.text, 12, 0, script.name.split("|")[0]);
        text_indent += helpers.get_text_size(script.name.split("|")[0]) + 8;
        render.text([position[0] + text_indent, position[1] + 9], color.primary, 12, 0, script.name.split("|")[1]);
        text_indent += helpers.get_text_size(script.name.split("|")[1]);
        render.text([position[0] + text_indent, position[1] + 9], color.text, 12, 0, " | " + text);
    },
    footer: function() {
        var words = [];
        words.push("FL: " + cheat.get_choked_commands());
        if ((vars.is_bind_active("doubletap") || vars.is_bind_active("hide_shots")))
            words.push("SHIFTING ");
        var text = words.join(" | ");

        var size = [helpers.get_text_size(text) + 10, 20];
        var position = [script.screensize[0] - size[0] - script.indent, script.indent + 20 + script.indent];

        helpers.create_window(position, size, color.primary_dark, color.primary, false);
        render.text([position[0] + 5, position[1] + 9], color.text, 12, 0, text);


        var text = "FAKE (" + Math.floor(cheat.get_desync_amount()) + ")";

        var size_fake = [helpers.get_text_size(text) + 12, 20];
        var position = [script.screensize[0] - size[0] - script.indent - size_fake[0] - script.indent, script.indent + 20 + script.indent];
        var size = size_fake;

        helpers.create_window(position, size, color.secondary_dark, color.secondary, true);
        render.text([position[0] + 5, position[1] + 9], color.text, 12, 0, text);
    },
};

register_callback("render", function() {
    watermark.header();
    watermark.footer();
});
