// @ts-nocheck

var _0x4165 = ['6044555ISeojd', '1307017EoKXLb', '7vgbAIh', '1507339SXzNbE', '866465nEcOEC', '4080suPDtF', '1IMUdGn', '69NfXvNU', '45136iNcOyK', '1vlzLKv', '166017QpRtXI'];

(function (_0x59ceed, _0x2865f3) {
    var _0xeb6ebf = _0x4349,
        _0x4a2f79 = _0x4349,
        _0x88d152 = _0x4349,
        _0x497bb4 = _0x4349;
    while (!![]) {
        try {
            var _0x3ed24c = -parseInt(_0xeb6ebf(0x1f1)) * parseInt(_0xeb6ebf(0x1ee)) + parseInt(_0x4a2f79(0x1f5)) * -parseInt(_0x497bb4(0x1ed)) + parseInt(_0x497bb4(0x1f3)) + -parseInt(_0x88d152(0x1f7)) + parseInt(_0x4a2f79(0x1ef)) * -parseInt(_0x88d152(0x1f4)) + -parseInt(_0x88d152(0x1f0)) * parseInt(_0x497bb4(0x1f2)) + parseInt(_0xeb6ebf(0x1f6));
            if (_0x3ed24c === _0x2865f3) break;
            else _0x59ceed['push'](_0x59ceed['shift']());
        } catch (_0x518658) {
            _0x59ceed['push'](_0x59ceed['shift']());
        }
    }
}(_0x4165, 0xeba6f));

function getDropdownValue(_0x247daa, _0x156fd5) {
    var _0x17ca4c = 0x1 << _0x156fd5;
    return _0x247daa & _0x17ca4c ? !![] : ![];
}
UI['AddLabel']('======================'), UI['AddLabel']('                      Main'), UI['AddHotkey']('Helper bind'), UI['AddSliderInt']('Render Distance', 0x320, 0x2710), UI['AddLabel']('--------------------------------------------'), UI['AddLabel']('                     Design'), UI['AddCheckbox']('Custom color'), UI['AddColorPicker']('Text color'), UI['AddColorPicker']('Icon color'), UI['AddColorPicker']('Active circle'), UI['AddColorPicker']('NonActive circle'), UI['AddLabel']('--------------------------------------------'), UI['AddLabel']('            Locations manager'), UI['AddCheckbox']('[location] manager'), UI['AddTextbox']('[location] name'), UI['AddTextbox']('[location] description'), UI['AddDropdown']('[location] weapon', ['molotov', 'hegrenade', 'flashbang', 'smokegrenade']), UI['AddMultiDropdown']('[location] options', ['run', 'jump', 'strength', 'delay', 'duck']), UI['AddMultiDropdown']('[location] run options', ['run yaw', 'recovery yaw', 'recovery jump', 'run_speed : slowwalk']), UI['AddSliderInt']('[location] run ticks', 0, 160), UI['AddSliderInt']('[location] run yaw', -0xb4, 0xb4), UI['AddSliderInt']('[location] recovery yaw', -0xb4, 0xb4), UI['AddDropdown']('[location] strength', ['left : 1', 'left + right : 0.5', 'right : 0']), UI['AddSliderInt']('[location] delay', 0, 160), UI['AddCheckbox']('[location] set location'), UI['AddSliderFloat']('x', -0x186a0, 0x186a0), UI['AddSliderFloat']('y', -0x186a0, 0x186a0), UI['AddSliderFloat']('z', -0x186a0, 0x186a0), UI['AddSliderFloat']('pitch', -0x5a, 0x5a), UI['AddSliderFloat']('yaw', -0xb4, 0xb4), UI['SetEnabled']('Misc', 'JAVASCRIPT', 'Script items', 'x', 0), UI['SetEnabled']('Misc', 'JAVASCRIPT', 'Script items', 'y', 0), UI['SetEnabled']('Misc', 'JAVASCRIPT', 'Script items', 'z', 0), UI['SetEnabled']('Misc', 'JAVASCRIPT', 'Script items', 'pitch', 0), UI['SetEnabled']('Misc', 'JAVASCRIPT', 'Script items', 'yaw', 0), UI['AddCheckbox']('[location] print : console'), UI['SetEnabled']('Misc', 'JAVASCRIPT', 'Script items', '[location] print : console', ![]);
var sideways, ticks_back_value, duck2, nade;

function androidNotigy(_0x44ed35, _0x29cdcc, _0x3d5996, _0x4d9539, _0x2f6d9a) {
    Render['FilledRect'](_0x44ed35 - _0x3d5996 / 0x2, _0x29cdcc - 0x2, _0x3d5996, 0x2, [107, 117, 255, _0x2f6d9a[0x3]]), Render['FilledRect'](_0x44ed35 - _0x3d5996 / 0x2, _0x29cdcc, _0x3d5996, _0x4d9539, _0x2f6d9a);
}
var alpha_main = 0,
    alpha_main2 = 0,
    alpha_text = 0,
    alpha_second = 0,
    alpha_notify_location = 0,
    alpha_notify_location_2 = 0,
    alpha_notify = 200,
    alpha_notify_2 = 255;

function animate_alpha() {
    weapon = Entity['GetName'](Entity['GetWeapon'](Entity['GetLocalPlayer']())), weapon_console_name[weapon] != undefined ? (alpha_main < 255 && (alpha_main = alpha_main + 12.75), alpha_main2 < 200 && (alpha_main2 = alpha_main + 10), alpha_second < 0x7a && (alpha_second = alpha_second + 6.1)) : (alpha_second = 0, alpha_main = 0, alpha_main2 = 0);
}

function menucontrol(){
UI.SetEnabled("Script items", "Text color", UI.GetValue("Script items", "Custom color"))
UI.SetEnabled("Script items", "Icon color", UI.GetValue("Script items", "Custom color"))
UI.SetEnabled("Script items", "Active circle", UI.GetValue("Script items", "Custom color"))
UI.SetEnabled("Script items", "NonActive circle", UI.GetValue("Script items", "Custom color"))
UI.SetEnabled('Script items', '[location] name', UI.GetValue("Script items", "[location] manager"))
UI.SetEnabled('Script items', '[location] description', UI.GetValue("Script items", "[location] manager"))
UI.SetEnabled('Script items', '[location] weapon', UI.GetValue("Script items", "[location] manager"))
UI.SetEnabled('Script items', '[location] options', UI.GetValue("Script items", "[location] manager"))
UI.SetEnabled('Script items', '[location] run options', UI.GetValue("Script items", "[location] manager"))
UI.SetEnabled('Script items', '[location] run ticks', UI.GetValue("Script items", "[location] manager"))
UI.SetEnabled('Script items', '[location] run yaw', UI.GetValue("Script items", "[location] manager"))
UI.SetEnabled('Script items', '[location] recovery yaw', UI.GetValue("Script items", "[location] manager"))
UI.SetEnabled('Script items', '[location] strength', UI.GetValue("Script items", "[location] manager"))
UI.SetEnabled('Script items', '[location] delay', UI.GetValue("Script items", "[location] manager"))
UI.SetEnabled('Script items', '[location] set location', UI.GetValue("Script items", "[location] manager"))
}
Cheat.RegisterCallback('Draw', 'menucontrol')
function draw_shadow(_0x46672a, _0x436480, _0xbd33ad, _10485b6, _0x2835fd, _0xb3bdd6) {
    Render['StringCustom'](_0x46672a + 1, _0x436480 + 1, _0xbd33ad, _10485b6, _0x2835fd, _0xb3bdd6), Render['StringCustom'](_0x46672a, _0x436480 + 1, _0xbd33ad, _10485b6, _0x2835fd, _0xb3bdd6), Render['StringCustom'](_0x46672a + 1, _0x436480, _0xbd33ad, _10485b6, _0x2835fd, _0xb3bdd6), Render['StringCustom'](_0x46672a - 1, _0x436480 - 1, _0xbd33ad, _10485b6, _0x2835fd, _0xb3bdd6), Render['StringCustom'](_0x46672a - 1, _0x436480, _0xbd33ad, _10485b6, _0x2835fd, _0xb3bdd6), Render['StringCustom'](_0x46672a, _0x436480 - 1, _0xbd33ad, _10485b6, _0x2835fd, _0xb3bdd6), Render['StringCustom'](_0x46672a + 1, _0x436480 - 1, _0xbd33ad, _10485b6, _0x2835fd, _0xb3bdd6), Render['StringCustom'](_0x46672a - 1, _0x436480 + 1, _0xbd33ad, _10485b6, _0x2835fd, _0xb3bdd6);
}

function location_manager() {
    if (!UI['GetValue']('Misc', 'JAVASCRIPT', 'Script items', '[location] manager')) return;
    var _0x330b08 = UI['GetString']('Misc', 'JAVASCRIPT', 'Script items', '[location] name'),
        _0x54e0ba = UI['GetString']('Misc', 'JAVASCRIPT', 'Script items', '[location] description'),
        _0x451a71 = UI['GetValue']('Misc', 'JAVASCRIPT', 'Script items', '[location] weapon'),
        _0x7d43cc = UI['GetValue']('Misc', 'JAVASCRIPT', 'Script items', '[location] options'),
        _0x24e0b5 = UI['GetValue']('Misc', 'JAVASCRIPT', 'Script items', '[location] run options'),
        _0x28fe8d = UI['GetValue']('Misc', 'JAVASCRIPT', 'Script items', '[location] run ticks'),
        _0x159690 = UI['GetValue']('Misc', 'JAVASCRIPT', 'Script items', '[location] run yaw'),
        _0x4123ab = UI['GetValue']('Misc', 'JAVASCRIPT', 'Script items', '[location] recovery yaw'),
        _0x30df12 = UI['GetValue']('Misc', 'JAVASCRIPT', 'Script items', '[location] strength'),
        _0x48f9b1 = UI['GetValue']('Misc', 'JAVASCRIPT', 'Script items', '[location] delay'),
        _0x527d98 = UI['GetValue']('Misc', 'JAVASCRIPT', 'Script items', '[location] set location'),
        _0x1a6347 = UI['GetValue']('Misc', 'JAVASCRIPT', 'Script items', 'x'),
        _0x4935db = UI['GetValue']('Misc', 'JAVASCRIPT', 'Script items', 'y'),
        _0x20725f = UI['GetValue']('Misc', 'JAVASCRIPT', 'Script items', 'z'),
        _0x5b3d29 = [_0x1a6347, _0x4935db, _0x20725f],
        _0x188202 = UI['GetValue']('Misc', 'JAVASCRIPT', 'Script items', 'pitch'),
        _0x4111d2 = UI['GetValue']('Misc', 'JAVASCRIPT', 'Script items', 'yaw'),
        _0x4d5434 = [_0x188202, _0x4111d2],
        _0x568537 = UI['GetValue']('Misc', 'JAVASCRIPT', 'Script items', '[location] print : console'),
        _0x1c2560 = Entity['GetLocalPlayer']();
    getDropdownValue(_0x7d43cc, 0) ? (UI['SetEnabled']('Misc', 'JAVASCRIPT', 'Script items', '[location] run options', !![]), UI['SetEnabled']('Misc', 'JAVASCRIPT', 'Script items', '[location] run ticks', !![]), getDropdownValue(_0x24e0b5, 0) ? UI['SetEnabled']('Misc', 'JAVASCRIPT', 'Script items', '[location] run yaw', !![]) : UI['SetEnabled']('Misc', 'JAVASCRIPT', 'Script items', '[location] run yaw', ![]), getDropdownValue(_0x24e0b5, 0x1) ? UI['SetEnabled']('Misc', 'JAVASCRIPT', 'Script items', '[location] recovery yaw', !![]) : UI['SetEnabled']('Misc', 'JAVASCRIPT', 'Script items', '[location] recovery yaw', ![])) : (UI['SetEnabled']('Misc', 'JAVASCRIPT', 'Script items', '[location] run options', ![]), UI['SetEnabled']('Misc', 'JAVASCRIPT', 'Script items', '[location] run ticks', ![]), UI['SetEnabled']('Misc', 'JAVASCRIPT', 'Script items', '[location] run yaw', ![]), UI['SetEnabled']('Misc', 'JAVASCRIPT', 'Script items', '[location] recovery yaw', ![]));
    getDropdownValue(_0x7d43cc, 0x2) ? UI['SetEnabled']('Misc', 'JAVASCRIPT', 'Script items', '[location] strength', !![]) : UI['SetEnabled']('Misc', 'JAVASCRIPT', 'Script items', '[location] strength', ![]);
    getDropdownValue(_0x7d43cc, 0x3) ? UI['SetEnabled']('Misc', 'JAVASCRIPT', 'Script items', '[location] delay', !![]) : UI['SetEnabled']('Misc', 'JAVASCRIPT', 'Script items', '[location] delay', ![]);
    _0x527d98 && (UI['SetValue']('Misc', 'JAVASCRIPT', 'Script items', 'x', Entity['GetEyePosition'](_0x1c2560)[0]), UI['SetValue']('Misc', 'JAVASCRIPT', 'Script items', 'y', Entity['GetEyePosition'](_0x1c2560)[0x1]), UI['SetValue']('Misc', 'JAVASCRIPT', 'Script items', 'z', Entity['GetEyePosition'](_0x1c2560)[0x2] - 0x40), UI['SetValue']('Misc', 'JAVASCRIPT', 'Script items', 'pitch', Local['GetViewAngles']()[0]), UI['SetValue']('Misc', 'JAVASCRIPT', 'Script items', 'yaw', Local['GetViewAngles']()[0x1]), UI['SetEnabled']('Misc', 'JAVASCRIPT', 'Script items', '[location] print : console', !![]), UI['SetValue']('Misc', 'JAVASCRIPT', 'Script items', '[location] set location', 0));
    if (_0x568537) {
        alpha_notify_location = 200, alpha_notify_location_2 = 255, UI['SetEnabled']('Misc', 'JAVASCRIPT', 'Script items', '[location] print : console', ![]), Cheat['Print']('\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a\x0a'), Cheat['PrintColor']([107, 117, 255, 255], '{\x0a'), Cheat['PrintColor']([107, 117, 255, 255], '\x09\"name\": \"' + _0x330b08 + ('\",\x0a'));
        _0x54e0ba != '' && Cheat['PrintColor']([107, 117, 255, 255], '\x09\"description\": \"' + _0x54e0ba + ('\",\x0a'));
        if (_0x451a71 == 0) Cheat['PrintColor']([107, 117, 255, 255], '\x09\"weapon\": \"weapon_molotov\",\x0a');
        else {
            if (_0x451a71 == 0x1) Cheat['PrintColor']([107, 117, 255, 255], '\x09\"weapon\": \"weapon_hegrenade\",\x0a');
            else _0x451a71 == 0x2 ? Cheat['PrintColor']([107, 117, 255, 255], '\x09\"weapon\": \"weapon_flashbang\",\x0a') : Cheat['PrintColor']([107, 117, 255, 255], '\x09\"weapon\": \"weapon_smokegrenade\",\x0a');
        }
        Cheat['PrintColor']([107, 117, 255, 255], '\x09\"position\": [' + _0x5b3d29['toString']() + ('],\x0a')), Cheat['PrintColor']([107, 117, 255, 255], '\x09\"viewangles\": [' + _0x4d5434['toString']() + ('],\x0a'));
        if (getDropdownValue(_0x7d43cc, 0) || getDropdownValue(_0x7d43cc, 0x1) || getDropdownValue(_0x7d43cc, 0x2) || getDropdownValue(_0x7d43cc, 0x3)) {
            Cheat['PrintColor']([107, 117, 255, 255], '\x09\"grenade\": {\x0a');
            getDropdownValue(_0x7d43cc, 0) && (Cheat['PrintColor']([107, 117, 255, 255], '\x09\x09\"run\": ' + _0x28fe8d + ',\x0a'), getDropdownValue(_0x24e0b5, 0) && Cheat['PrintColor']([107, 117, 255, 255], '\x09\x09\"run_yaw\": ' + _0x159690 + ',\x0a'), getDropdownValue(_0x24e0b5, 0x1) && Cheat['PrintColor']([107, 117, 255, 255], '\x09\x09\"recovery_yaw\": ' + _0x4123ab + ',\x0a'), getDropdownValue(_0x24e0b5, 0x2) && Cheat['PrintColor']([107, 117, 255, 255], '\x09\x09\"recovery_jump\": true,\x0a'), getDropdownValue(_0x24e0b5, 0x3) && Cheat['PrintColor']([107, 117, 255, 255], '\x09\x09\"run_speed\": true,\x0a'));
            getDropdownValue(_0x7d43cc, 0x1) && Cheat['PrintColor']([107, 117, 255, 255], '\x09\x09\"jump\": true,\x0a');
            if (getDropdownValue(_0x7d43cc, 0x2)) {
                if (getDropdownValue(_0x30df12, 0)) Cheat['PrintColor']([107, 117, 255, 255], '\x09\x09\"strength\": 0.5,\x0a');
                else getDropdownValue(_0x30df12, 0x1) ? Cheat['PrintColor']([107, 117, 255, 255], '\x09\x09\"strength\": 0,\x0a') : Cheat['PrintColor']([107, 117, 255, 255], '\x09\x09\"strength\": 1,\x0a');
            }
            getDropdownValue(_0x7d43cc, 0x3) && Cheat['PrintColor']([107, 117, 255, 255], '\x09\x09\"delay\": ' + _0x48f9b1 + ',\x0a'), Cheat['PrintColor']([107, 117, 255, 255], '\x09},\x0a');
        }
        getDropdownValue(_0x7d43cc, 0x4) && Cheat['PrintColor']([107, 117, 255, 255], '\x09\"duck\": true,\x0a'), Cheat['PrintColor']([107, 117, 255, 255], '},\x0a'), UI['SetValue']('Misc', 'JAVASCRIPT', 'Script items', '[location] print : console', 0);
    }
    var _0x2fd5f1 = Render['AddFont']('verdana', 0x8, 0),
        _0x26bc2d = '[ nade created, check cosnole ]',
        _0x5bb05a = Render['TextSizeCustom'](_0x26bc2d, _0x2fd5f1)[0] + 0x8;
    alpha_notify_location > 0 && (alpha_notify_location = alpha_notify_location - 0.5);
    alpha_notify_location_2 > 0 && (alpha_notify_location_2 = alpha_notify_location_2 - 0x1);
    androidNotigy(Render['GetScreenSize']()[0] / 0x2, Render['GetScreenSize']()[0x1] - 0x96, _0x5bb05a, 0x19, [0x1b, 0x1b, 0x1b, alpha_notify_location]), draw_shadow(Render['GetScreenSize']()[0] / 0x2, Render['GetScreenSize']()[0x1] - 0x91, 1, _0x26bc2d, [0, 0, 0, alpha_notify_location_2], _0x2fd5f1), Render['StringCustom'](Render['GetScreenSize']()[0] / 0x2, Render['GetScreenSize']()[0x1] - 0x91, 1, _0x26bc2d, [107, 117, 255, alpha_notify_location_2], _0x2fd5f1);
    var _0x53fa41 = Render['AddFont']('smallest_pixel-7', 0x6, 0),
        _0x4f0c85 = Render['AddFont']('undefeated', 0xe, 0),
        _0x151de0 = Entity['GetName'](Entity['GetWeapon'](_0x1c2560));
    _0x151de0 == 'incendiary grenade' && (_0x151de0 = 'molotov');
    if (!weapon_console_name[_0x151de0]) return;
    var _0x1ab6c9 = Entity['GetRenderOrigin'](_0x1c2560),
        _0x400952 = _0x330b08,
        _0x4a236e = calc_dist_notCamera(_0x1ab6c9, [_0x1a6347, _0x4935db, _0x20725f]),
        _0x422897 = Render['WorldToScreen']([_0x1a6347, _0x4935db, _0x20725f]);
    if (_0x4a236e >= 0x3e8) return;
    if (UI['GetValue']('Misc', 'JAVASCRIPT', 'Script items', 'Custom color')) var _0x749f27 = UI['GetColor']('Misc', 'JAVASCRIPT', 'Script items', 'Text color');
    else var _0x749f27 = [0x78, 0x78, 255, 255];
    if (_0x4a236e >= 0x226 == ![]) {
        text_size = Render['TextSizeCustom'](_0x400952, _0x2fd5f1);
        if (_0x4a236e >= 0x1c2 == ![]) var _0x43c26d = 255,
            _0xb551bf = 255;
        else {
            if (_0x4a236e >= 0x226 == ![]) var _0x43c26d = 0xc3,
                _0xb551bf = 0xc3;
        }
    } else {
        var _0x43c26d = 0,
            _0xb551bf = 0x41;
        text_size = [-0xc, 0xd];
    }
    var _0x341782 = [16, 16, 16, alpha_main2],
        _0x749f27 = [0x78, 0x78, 255, _0x43c26d],
        _0x4d154d = [255, 10, 10, alpha_main],
        _0x441d14 = [255, 10, 10, _0x43c26d],
        _0x2781fe = angle_to_vec(_0x188202, _0x4111d2),
        _0x1d871d = _0x5b3d29,
        _0x2781fe = Render['WorldToScreen']([_0x1d871d[0] + _0x2781fe[0] * 400, _0x1d871d[0x1] + _0x2781fe[0x1] * 400, _0x1d871d[0x2] + 0x41 + _0x2781fe[0x2] * 400]);
    Render['FilledRect'](_0x422897[0] + 0x8, _0x422897[0x1] - text_size[0x1] / 1.5 - 1, text_size[0] + 0x22, text_size[0x1] + 0xb, [_0x341782[0], _0x341782[0x1], _0x341782[0x2], alpha_main2]), Render['Rect'](_0x422897[0] + 0x8, _0x422897[0x1] - text_size[0x1] / 1.5 - 1, text_size[0] + 0x22, text_size[0x1] + 0xb, [_0x341782[0], _0x341782[0x1], _0x341782[0x2], 0x3c]), Render['StringCustom'](_0x422897[0] + 0x13, _0x422897[0x1] - 0x8, 0x6, get_icon(_0x151de0), [_0x4d154d[0], _0x4d154d[0x1], _0x4d154d[0x2], _0xb551bf], _0x4f0c85), Render['StringCustom'](_0x422897[0] + 0x1f, _0x422897[0x1] - 0x6, 0x6, '|', [_0x441d14[0], _0x441d14[0x1], _0x441d14[0x2], _0x43c26d], _0x2fd5f1), _0x4a236e > 0x16 == ![] && (_0x54e0ba != undefined ? (description = _0x54e0ba['toUpperCase'](), text_size_descrtption = Render['TextSizeCustom'](description, _0x53fa41), text_size_res = text_size[0] > text_size_descrtption[0] ? text_size : text_size_descrtption) : text_size_res = text_size, Render['FilledRect'](_0x2781fe[0] - 10, _0x2781fe[0x1] - text_size[0x1] / 0x1 + 0x2, text_size_res[0] + 0x20, _0x54e0ba != undefined ? text_size[0x1] + 0x14 : text_size[0x1] + 10, [_0x341782[0], _0x341782[0x1], _0x341782[0x2], alpha_main2]), Render['Rect'](_0x2781fe[0] - 10, _0x2781fe[0x1] - text_size[0x1] / 0x1 + 0x2, text_size_res[0] + 0x20, _0x54e0ba != undefined ? text_size[0x1] + 0x14 : text_size[0x1] + 10, [_0x341782[0], _0x341782[0x1], _0x341782[0x2], 0x3c]), _0x54e0ba != undefined && (Render['StringCustom'](_0x2781fe[0] + 0xc, _0x2781fe[0x1] + 0x4, 0x6, '|', _0x4d154d, _0x2fd5f1), Render['StringCustom'](_0x2781fe[0] + 0x12, _0x2781fe[0x1] + 0x9, 0, description, [0, 0, 0, 255], _0x53fa41), Render['StringCustom'](_0x2781fe[0] + 0x11, _0x2781fe[0x1] + 0x8, 0, description, [255, 255, 255, 255], _0x53fa41)), Render['StringCustom'](_0x2781fe[0] + 0xc, _0x2781fe[0x1] - 0x7, 0x6, '|', _0x4d154d, _0x2fd5f1), Render['StringCustom'](_0x2781fe[0] + 0x12, _0x2781fe[0x1] - 0x5, 0, _0x400952, [0, 0, 0, _0x43c26d], _0x2fd5f1), Render['StringCustom'](_0x2781fe[0] + 0x11, _0x2781fe[0x1] - 0x6, 0, _0x400952, _0x749f27, _0x2fd5f1), _0x4a236e > 0x2 == ![] ? Render['FadedCircle'](_0x2781fe[0], _0x2781fe[0x1], 0x8, Math['abs'](_0x2781fe[0] - Render['GetScreenSize']()[0] / 0x2) + Math['abs'](_0x2781fe[0x1] - Render['GetScreenSize']()[0x1] / 0x2) <= 0x28 ? [0x14, 0xec, 0, 255] : [255, 0xb9, 0x32, 255]) : Render['FadedCircle'](_0x2781fe[0], _0x2781fe[0x1], 0x8, [255, 10, 10, 255])), Render['StringCustom'](_0x422897[0] + 0x25, _0x422897[0x1] - 0x5, 0, _0x400952, [0, 0, 0, _0x43c26d], _0x2fd5f1), Render['StringCustom'](_0x422897[0] + 0x24, _0x422897[0x1] - 0x6, 0, _0x400952, [_0x749f27[0], _0x749f27[0x1], _0x749f27[0x2], _0x43c26d], _0x2fd5f1);
}
UI['AddLabel']('======================');
var weapon_console_name = {
    'incendiary grenade': 'weapon_molotov',
    'high explosive grenade': 'weapon_hegrenade',
    'molotov': 'weapon_molotov',
    'smoke grenade': 'weapon_smokegrenade',
    'flashbang': 'weapon_flashbang',
    '\x1706830B5;L=0O 3@0=0B0': 'weapon_molotov',
    '\x1eA:>;>G=0O 3@0=0B0': 'weapon_hegrenade',
    '\x1706830B5;L=0O 3@0=0B0': 'weapon_molotov',
    '\x14K<>20O 3@0=0B0': 'weapon_smokegrenade',
    '!25B>20O 3@0=0B0': 'weapon_flashbang'
};
Render['FadedCircle'] = function (_0x1c1082, _0x439107, _0x5afb13, _0x370879) {
    for (i = 0; i <= _0x5afb13; i++) {
        Render['FilledCircle'](_0x1c1082, _0x439107, i, [_0x370879[0], _0x370879[0x1], _0x370879[0x2], _0x370879[0x3] - _0x370879[0x3] / _0x5afb13 * i + 10]);
    }
};
var data = require('helper.data')['data'],
    map_cache = [],
    weapon = Entity['GetName'](Entity['GetWeapon'](Entity['GetLocalPlayer']()));
World['GetServerString']() ? soft_map = data[World['GetMapName']()['toLowerCase']()] : soft_map = [];
if (soft_map == undefined) soft_map = [];
map_cache = soft_map['filter'](function (_0x2d6db8) {
    return _0x2d6db8['weapon'] == weapon_console_name[weapon];
});

function get_icon(_0xbe6dfc) {
    var _0x194db5 = '';
    switch (_0xbe6dfc) {
    case 'high explosive grenade':
        _0x194db5 = 'j';
        break;
    case 'smoke grenade':
        _0x194db5 = 'k';
        break;
    case 'molotov':
        _0x194db5 = 'l';
        break;
    case 'incendiary grenade':
        _0x194db5 = 'l';
        break;
    case 'flashbang':
        _0x194db5 = 'i';
        break;
    case '\x1eA:>;>G=0O 3@0=0B0':
        _0x194db5 = 'j';
        break;
    case '\x14K<>20O 3@0=0B0':
        _0x194db5 = 'k';
        break;
    case '\x1706830B5;L=0O 3@0=0B0':
        _0x194db5 = 'l';
        break;
    case '!25B>20O 3@0=0B0':
        _0x194db5 = 'i';
        break;
    default:
        _0x194db5 = '';
        break;
    }
    return _0x194db5;
}
var a = !![];

function _0x4349(_0x4d1900, _0x1e19be) {
    return _0x4349 = function (_0x4165d3, _0x434973) {
        _0x4165d3 = _0x4165d3 - 0x1ed;
        var _0x42863b = _0x4165[_0x4165d3];
        return _0x42863b;
    }, _0x4349(_0x4d1900, _0x1e19be);
}

function draw() {
    var _0x29191d = Render['AddFont']('verdana', 0x8, 0),
        _0x158be2 = Render['AddFont']('smallest_pixel-7', 0x6, 0),
        _0x325137 = Render['AddFont']('undefeated', 0xe, 0);
    if (alpha_notify > 0 && alpha_notify_2 > 0) {
        var _0x4d5e37 = '[ moonhelper loaded ]',
            _0x34e9e9 = Render['TextSizeCustom'](_0x4d5e37, _0x29191d)[0] + 0x8;
        alpha_notify > 0 && (alpha_notify = alpha_notify - 0.5), alpha_notify_2 > 0 && (alpha_notify_2 = alpha_notify_2 - 0x1), androidNotigy(Render['GetScreenSize']()[0] / 0x2, Render['GetScreenSize']()[0x1] - 0x96, _0x34e9e9, 0x19, [0x1b, 0x1b, 0x1b, alpha_notify]), draw_shadow(Render['GetScreenSize']()[0] / 0x2, Render['GetScreenSize']()[0x1] - 0x91, 1, _0x4d5e37, [0, 0, 0, alpha_notify_2], _0x29191d), Render['StringCustom'](Render['GetScreenSize']()[0] / 0x2, Render['GetScreenSize']()[0x1] - 0x91, 1, _0x4d5e37, [107, 117, 255, alpha_notify_2], _0x29191d);
    }
    if (!World['GetServerString']()) return;
    var _0x266604 = Entity['GetLocalPlayer'](),
        _0x2e46e9 = Entity['GetName'](Entity['GetWeapon'](_0x266604));
    _0x2e46e9 == 'incendiary grenade' && (_0x2e46e9 = 'molotov');
    if (Globals['Tickcount']() % 10 >= 0x5) {
        World['GetServerString']() ? soft_map = data[World['GetMapName']()['toLowerCase']()] : soft_map = [];
        if (soft_map == undefined) soft_map = [];
        map_cache = soft_map['filter'](function (_0x12af95) {
            return _0x12af95['weapon'] == weapon_console_name[_0x2e46e9];
        });
    }
    if (map_cache != undefined) map_cache = map_cache;
    if (map_cache['length'] == 0) return;
    var _0x2f0ffa = Entity['GetRenderOrigin'](_0x266604);
    for (index in map_cache) {
        var _0x1c9dbc = map_cache[index]['name'];
        name = _0x1c9dbc['length'] == 0x2 ? _0x1c9dbc['splice'](0, 0x1)['toString']() : _0x1c9dbc['toString']();
        var _0x56afe4 = calc_dist_notCamera(_0x2f0ffa, map_cache[index]['position']),
            _0x38fb0d = Render['WorldToScreen']([map_cache[index]['position'][0], map_cache[index]['position'][0x1], map_cache[index]['position'][0x2]]);
        if (_0x56afe4 >= UI['GetValue']('Misc', 'JAVASCRIPT', 'Script items', 'Render Distance')) continue;
        var _0x24c8a1 = UI['GetValue']('Misc', 'JAVASCRIPT', 'Script items', 'Custom color') ? UI['GetColor']('Misc', 'JAVASCRIPT', 'Script items', 'Text color') : [0x78, 0x78, 255, 255];
        if (_0x56afe4 >= 0x2bc == ![]) {
            text_size = Render['TextSizeCustom'](name, _0x29191d);
            if (_0x56afe4 >= 0x1c2 == ![]) var _0x3df2ed = 255,
                _0x2ceb3e = 255;
            else {
                if (_0x56afe4 >= 0x2bc == ![]) var _0x3df2ed = 0x41,
                    _0x2ceb3e = 0x41;
                else {
                    if (_0x56afe4 >= 0x28a == ![]) var _0x3df2ed = 0x7d,
                        _0x2ceb3e = 0x7d;
                    else {
                        if (_0x56afe4 >= 0x226 == ![]) var _0x3df2ed = 0xc3,
                            _0x2ceb3e = 0xc3;
                    }
                }
            }
        } else {
            var _0x3df2ed = 0,
                _0x2ceb3e = 0x41;
            text_size = [-0xc, 0xd];
        }
        var circle = UI.GetColor("Script items", "Active circle")
        var noncirc = UI.GetColor("Script items", "NonActive circle")
        var _0x2accbf = [16, 16, 16, alpha_main2];
        if (UI['GetValue']('Misc', 'JAVASCRIPT', 'Script items', 'Custom color')) var _0x24c8a1 = UI['GetColor']('Misc', 'JAVASCRIPT', 'Script items', 'Text color'),
            _0x5f542d = UI['GetColor']('Misc', 'JAVASCRIPT', 'Script items', 'Icon color'),
            _0x189393 = UI['GetColor']('Misc', 'JAVASCRIPT', 'Script items', 'Icon color');
        else var _0x24c8a1 = [0x78, 0x78, 255, _0x3df2ed],
            _0x5f542d = [0x78, 0x78, 255, alpha_main],
            _0x189393 = [0x78, 0x78, 255, _0x3df2ed];
        var _0x271c17 = angle_to_vec(map_cache[index]['viewangles'][0], map_cache[index]['viewangles'][0x1]),
            _0x2e62f2 = map_cache[index]['position'],
            _0x271c17 = Render['WorldToScreen']([_0x2e62f2[0] + _0x271c17[0] * 400, _0x2e62f2[0x1] + _0x271c17[0x1] * 400, _0x2e62f2[0x2] + 0x41 + _0x271c17[0x2] * 400]);
        _0x56afe4 > 0x16 == ![] && (!(Math['abs'](_0x271c17[0] - Render['GetScreenSize']()[0] / 0x2) + Math['abs'](_0x271c17[0x1] - Render['GetScreenSize']()[0x1] / 0x2) <= Render['GetScreenSize']()[0] / 0x2 && Render['GetScreenSize']()[0x1] / 0x2) && Render['Line'](Render['GetScreenSize']()[0] / 0x2, Render['GetScreenSize']()[0x1] / 0x2, _0x271c17[0], _0x271c17[0x1], [255, 255, 255, 255]), map_cache[index]['description'] != undefined ? (description = map_cache[index]['description']['toUpperCase'](), text_size_descrtption = Render['TextSizeCustom'](description, _0x158be2), text_size_res = text_size[0] > text_size_descrtption[0] ? text_size : text_size_descrtption) : text_size_res = text_size, Render['FilledRect'](_0x271c17[0] - 10, _0x271c17[0x1] - text_size[0x1] / 0x1 + 0x2, text_size_res[0] + 0x20, map_cache[index]['description'] != undefined ? text_size[0x1] + 0x14 : text_size[0x1] + 10, [_0x2accbf[0], _0x2accbf[0x1], _0x2accbf[0x2], alpha_main2]), Render['Rect'](_0x271c17[0] - 10, _0x271c17[0x1] - text_size[0x1] / 0x1 + 0x2, text_size_res[0] + 0x20, map_cache[index]['description'] != undefined ? text_size[0x1] + 0x14 : text_size[0x1] + 10, [_0x2accbf[0], _0x2accbf[0x1], _0x2accbf[0x2], 0x3c]), map_cache[index]['description'] != undefined && (Render['StringCustom'](_0x271c17[0] + 0xc, _0x271c17[0x1] + 0x4, 0x6, '|', _0x5f542d, _0x29191d), Render['StringCustom'](_0x271c17[0] + 0x12, _0x271c17[0x1] + 0x9, 0, description, [0, 0, 0, 255], _0x158be2), Render['StringCustom'](_0x271c17[0] + 0x11, _0x271c17[0x1] + 0x8, 0, description, [255, 255, 255, 255], _0x158be2)), Render['StringCustom'](_0x271c17[0] + 0xc, _0x271c17[0x1] - 0x7, 0x6, '|', _0x5f542d, _0x29191d), Render['StringCustom'](_0x271c17[0] + 0x12, _0x271c17[0x1] - 0x5, 0, name, [0, 0, 0, _0x3df2ed], _0x29191d), Render['StringCustom'](_0x271c17[0] + 0x11, _0x271c17[0x1] - 0x6, 0, name, _0x24c8a1, _0x29191d), _0x56afe4 > 0x2 == ![] && Math['abs'](_0x271c17[0] - Render['GetScreenSize']()[0] / 0x2) + Math['abs'](_0x271c17[0x1] - Render['GetScreenSize']()[0x1] / 0x2) <= 0x28 ? Render['FadedCircle'](_0x271c17[0], _0x271c17[0x1], 0x8, circle /*: noncirc*/) : Render['FadedCircle'](_0x271c17[0], _0x271c17[0x1], 0x8, noncirc)), Render['FilledRect'](_0x38fb0d[0] + 0x8, _0x38fb0d[0x1] - text_size[0x1] / 1.5 - 1, text_size[0] + 0x22, text_size[0x1] + 0xb, [_0x2accbf[0], _0x2accbf[0x1], _0x2accbf[0x2], alpha_main2]), Render['Rect'](_0x38fb0d[0] + 0x8, _0x38fb0d[0x1] - text_size[0x1] / 1.5 - 1, text_size[0] + 0x22, text_size[0x1] + 0xb, [_0x2accbf[0], _0x2accbf[0x1], _0x2accbf[0x2], 0x3c]), Render['StringCustom'](_0x38fb0d[0] + 0x13, _0x38fb0d[0x1] - 0x8, 0x6, get_icon(_0x2e46e9), [_0x5f542d[0], _0x5f542d[0x1], _0x5f542d[0x2], _0x2ceb3e], _0x325137), Render['StringCustom'](_0x38fb0d[0] + 0x1f, _0x38fb0d[0x1] - 0x6, 0x6, '|', [_0x189393[0], _0x189393[0x1], _0x189393[0x2], _0x3df2ed], _0x29191d), Render['StringCustom'](_0x38fb0d[0] + 0x25, _0x38fb0d[0x1] - 0x5, 0, name, [0, 0, 0, _0x3df2ed], _0x29191d), Render['StringCustom'](_0x38fb0d[0] + 0x24, _0x38fb0d[0x1] - 0x6, 0, name, [_0x24c8a1[0], _0x24c8a1[0x1], _0x24c8a1[0x2], _0x3df2ed], _0x29191d);
    }
}

function fix_move(_0x4df129, _0x160d39, _0x83d3f2) {
    var _0x4de86a = function (_0x1c8f99) {
            return _0x1c8f99 / 0xb4 * Math['PI'];
        },
        _0x3c0063, _0x55e576, _0x4e8446;
    if (_0x160d39[0x1] < 0) _0x3c0063 = 0x168 + _0x160d39[0x1];
    else _0x3c0063 = _0x160d39[0x1];
    if (_0x4df129[0x1] < 0) _0x55e576 = 0x168 + _0x4df129[0x1];
    else _0x55e576 = _0x4df129[0x1];
    if (_0x55e576 < _0x3c0063) _0x4e8446 = Math['abs'](_0x55e576 - _0x3c0063);
    else _0x4e8446 = 0x168 - Math['abs'](_0x3c0063 - _0x55e576);
    return [Math['cos'](_0x4de86a(_0x4e8446)) * _0x83d3f2[0] + Math['cos'](_0x4de86a(_0x4e8446 + 0x5a)) * _0x83d3f2[0x1], Math['sin'](_0x4de86a(_0x4e8446)) * _0x83d3f2[0] + Math['sin'](_0x4de86a(_0x4e8446 + 0x5a)) * _0x83d3f2[0x1], 0];
}

function move_forward(_16be7e, _0x24bd10) {
    var _0x215769 = Local['GetViewAngles'](),
        _0x568933 = [_0x24bd10, 0, 0],
        _0x43ac3c = fix_move(_16be7e, _0x215769, _0x568933);
    UserCMD['SetMovement'](_0x43ac3c);
}

function move_sideways(_0x19f7ee, _0x18dd36, _0x373dc2) {
    var _0x144ebd = Local['GetViewAngles'](),
        _0xebc8c9 = _0x18dd36 ? _0x373dc2 : -_0x373dc2,
        _0x572889 = [0, _0xebc8c9, 0],
        _0xf1e695 = fix_move(_0x19f7ee, _0x144ebd, _0x572889);
    UserCMD['SetMovement'](_0xf1e695);
}

function on_grenade() {
    Entity['GetLocalPlayer']() == Entity['GetEntityFromUserID'](Event['GetInt']('userid')) && (grenade_thrown = !![]);;
}

function stop_attack() {
    Cheat['ExecuteCommand']('-attack'), Cheat['ExecuteCommand']('-attack2');
}

function duck(_16fcfb) {
    _16fcfb ? Cheat['ExecuteCommand']('+duck') : Cheat['ExecuteCommand']('-duck');
}

function move_on_key() {
    Convar['SetString']('sv_airaccelerate', '206'), UI['SetValue']('Misc', 'GENERAL', 'Movement', 'Turn speed', 160), UI['SetEnabled']('Misc', 'GENERAL', 'Movement', 'Turn speed', ![]);
    var _0x295f58 = Entity['GetLocalPlayer'](),
        _0x574fb2 = Entity['GetName'](Entity['GetWeapon'](_0x295f58));
    UI['IsHotkeyActive']('Misc', 'JAVASCRIPT', 'Script items', 'Helper bind') ? (set_Duck = !![], sideways == !![] ? (move_back_t && (back_start == 0 && (back_start = Globals['Tickcount']()), grenade_thrown && (move_forward(last_ang, 0x1c2), Globals['Tickcount']() - back_start > speed && (move_back_t = ![], back_start = 0, side = ![], speed = 0))), grenade_thrown && (back_start == 0 && (back_start = Globals['Tickcount']()), Globals['Tickcount']() - back_start > 0xe && (recovery_jump && UserCMD['ForceJump']()))) : (move_back_t && (back_start == 0 && (back_start = Globals['Tickcount']()), grenade_thrown && (move_sideways(last_ang, side, 0x1c2), Globals['Tickcount']() - back_start > speed && (move_back_t = ![], back_start = 0, side = ![], speed = 0))), grenade_thrown && (back_start == 0 && (back_start = Globals['Tickcount']()), Globals['Tickcount']() - back_start > 0xe && (recovery_jump && UserCMD['ForceJump']())))) : (UI['SetValue']('Anti-Aim', 'Fake-Lag', 'Enabled', 0x1), Cheat['ExecuteCommand']('bind mouse1 +attack'), set_Duck == !![] && (duck(![]), set_Duck = ![]));
    if (map_cache['length'] == 0) return;
    if (!UI['IsHotkeyActive']('Misc', 'JAVASCRIPT', 'Script items', 'Helper bind')) {
        UI['SetValue']('Anti-Aim', 'Fake-Lag', 'Enabled', 0x1), this['running'] = ![], this['run'] = ![], move_back_t = ![], back_start = 0, side = ![], speed = 0, grenade_thrown = ![], get_nade = 0, geting = ![], this['ignore_input'] = ![], this['next_tick_ang'] = [], this['attacked'] = ![], this['run_start'] = 0, this['closest'] = [];
        return;
    }
    this['next_tick_ang'] == null && (this['next_tick_ang'] = []);
    if (this['ignore_input']) {
        UserCMD['SetAngles'](this['next_tick_ang']);
        return;
    }
    this['next_tick_ang']['length'] && UserCMD['SetAngles'](this['next_tick_ang']), this['attacked'] == null && (this['attacked'] = ![]), this['running'] == null && (this['running'] = ![]), this['run'] == null && (this['run'] = ![]), this['closest'] == null && (this['closest'] = []), this['ignore_input'] == null && (this['ignore_input'] = ![]), this['run_start'] == null && (this['run_start'] = 0);
    var _0x3c7720 = Entity['GetRenderOrigin'](_0x295f58),
        _0x8c42cd = Local['GetViewAngles'](),
        _0x3a6d90 = data[World['GetMapName']()['toLowerCase']()];
    if (Globals['Tickcount']() % 0x6 >= 0x5) var _0x2df358 = map_cache['sort'](function (_0x34be8f, _0x1532e6) {
        var _0x52d397 = calc_dist_notCamera(_0x3c7720, _0x34be8f['position']) - calc_dist_notCamera(_0x3c7720, _0x1532e6['position']),
            _0xc4982b = calc_dist(_0x8c42cd, _0x34be8f['viewangles']) - calc_dist(_0x8c42cd, _0x1532e6['viewangles']);
        return _0x52d397 + _0xc4982b;
    })[0];
    _0x2df358 != undefined ? nade = _0x2df358 : '';
    var _0x43c901 = calc_dist(_0x3c7720, nade['position']);
    if (_0x43c901 > 0x64 && !this['running']) return;
    if (get_nade == 0x1) nade = this['closest'];
    nade['duck'] != undefined && nade['duck'] == !![] ? (duck2 = !![], duck(!![])) : duck2 = ![];
    if (move_to_target(nade['position']) || this['running']) {
        geting == ![] && (Cheat['ExecuteCommand']('unbind mouse1'), Input['IsKeyPressed'](0x1) && (geting = !![], Cheat['ExecuteCommand']('bind mouse1 +attack')));
        if (geting == ![]) return;
        get_nade == 0 && (this['closest'] = nade, get_nade = 0x1);
        this['next_tick_ang'] = [nade['viewangles'][0], nade['viewangles'][0x1], 0];
        if (nade['grenade'] != undefined) {
            if (nade['grenade']['run_yaw'] != undefined) var _0x5b6ef0 = nade['grenade']['run_yaw'];
            if (nade['grenade']['recovery_yaw'] != undefined) var _0x26514a = nade['grenade']['recovery_yaw'];
            run_yaw_r = _0x5b6ef0 != undefined ? _0x5b6ef0 : 0;
            _0x26514a != undefined ? (recovery_yaw = _0x26514a, move_back = !![]) : (recovery_yaw = 0, move_back = ![]);
            _0x5b6ef0 != undefined && _0x5b6ef0 > 0 ? (side_to = ![], recovery_yaw < _0x5b6ef0 ? recovery_yaw = -_0x26514a : recovery_yaw = _0x26514a) : (recovery_yaw < _0x5b6ef0 ? recovery_yaw = -_0x26514a : recovery_yaw = _0x26514a, side_to = !![]);
            sideways = _0x26514a != undefined && _0x5b6ef0 == undefined ? !![] : ![];
            if (nade['grenade']['strength'] == undefined || nade['grenade']['strength'] == 0x1) strength = 0x1;
            else {
                if (nade['grenade']['strength'] != undefined && nade['grenade']['strength'] == 0.5) strength = 0.5;
                else nade['grenade']['strength'] != undefined && nade['grenade']['strength'] == 0 && (strength = 0);
            }
            delay = nade['grenade']['delay'] != undefined ? nade['grenade']['delay'] : 0, hold_shift = nade['grenade']['run_speed'] != undefined && nade['grenade']['run_speed'] == !![] ? 69.85 : 0x1c2, recovery_jump = nade['grenade']['recovery_jump'] != undefined ? !![] : ![];
            if (!this['attacked']) {
                if (strength == 0x1) Cheat['ExecuteCommand']('+attack'), ticks_not_attack = nade['grenade']['run'], ticks = 0, ticks_back = 0x8, this['run'] = !![];
                else {
                    if (strength == 0.5) Cheat['ExecuteCommand']('+attack'), Cheat['ExecuteCommand']('+attack2'), ticks_not_attack = 0x1a, ticks = 0x1c, delay > 0 ? ticks_back = 0 : ticks_back = ticks_back_value;
                    else strength == 0 && (Cheat['ExecuteCommand']('+attack2'), ticks_not_attack = 0x1a, ticks = 0x1c, delay > 0 ? ticks_back = 0 : ticks_back = ticks_back_value);
                }
            }
            if (nade['grenade']['jump'] != undefined && nade['grenade']['run'] == undefined) {
                send = !![];
                send == !![] ? (UI['SetValue']('Anti-Aim', 'Fake-Lag', 'Enabled', 0), send = ![]) : UI['SetValue']('Anti-Aim', 'Fake-Lag', 'Enabled', 0x1);
                var _0x35cae1 = nade['grenade']['run'];
                jump = !![], ticks_back_value = 0, this['running'] = !![], this['run_start'] == 0 && (this['run_start'] = Globals['Tickcount']()), Globals['Tickcount']() - this['run_start'] > ticks && (jump && UserCMD['ForceJump'](), Globals['Tickcount']() - this['run_start'] > ticks + delay && stop_attack()), Globals['Tickcount']() - this['run_start'] > ticks_back + ticks + delay && (move_back_t = move_back, back_start = 0, side = side_to, last_ang = [nade['viewangles'][0], nade['viewangles'][0x1] + recovery_yaw, 0], speed = _0x35cae1 * 0x4, stop_attack(), this['running'] = ![], this['ignore_input'] = !![], this['run_start'] = 0);
            } else nade['grenade']['jump'] != undefined ? (jump = !![], ticks_back_value = 0) : (jump = ![], ticks_back_value = 0x8);
            if (nade['grenade']['run'] != undefined) {
                if (nade['grenade']['run'] > 0x1) var _0x35cae1 = nade['grenade']['run'] - 0x2;
                else var _0x35cae1 = nade['grenade']['run'];
                this['running'] = !![], this['run_start'] == 0 && (this['run_start'] = Globals['Tickcount']()), run && move_forward([nade['viewangles'][0], nade['viewangles'][0x1] + run_yaw_r, 0], hold_shift), this['running'] && Globals['Tickcount']() - this['run_start'] > ticks_not_attack && (this['run'] = !![]), Globals['Tickcount']() - this['run_start'] > _0x35cae1 + ticks && (jump && UserCMD['ForceJump'](), Globals['Tickcount']() - this['run_start'] > _0x35cae1 + ticks + delay && (this['attacked'] = !![], stop_attack())), Globals['Tickcount']() - this['run_start'] > _0x35cae1 + ticks_back + ticks + delay && (send = !![], send == !![] ? (UI['SetValue']('Anti-Aim', 'Fake-Lag', 'Enabled', 0), send = ![]) : UI['SetValue']('Anti-Aim', 'Fake-Lag', 'Enabled', 0x1), move_back_t = move_back, back_start = 0, side = side_to, last_ang = [nade['viewangles'][0], nade['viewangles'][0x1] + recovery_yaw, 0], speed = _0x35cae1 * 0x4, this['running'] = ![], this['ignore_input'] = !![], this['run_start'] = 0);
            } else this['running'] = !![], this['run_start'] == 0 && (this['run_start'] = Globals['Tickcount']()), Globals['Tickcount']() - this['run_start'] > ticks && (Globals['Tickcount']() - this['run_start'] > ticks + delay && (this['attacked'] = !![])), Globals['Tickcount']() - this['run_start'] > ticks_back + ticks + delay && (send = !![], send == !![] ? (UI['SetValue']('Anti-Aim', 'Fake-Lag', 'Enabled', 0), send = ![]) : UI['SetValue']('Anti-Aim', 'Fake-Lag', 'Enabled', 0x1), stop_attack(), this['running'] = ![], this['ignore_input'] = !![], this['run_start'] = 0);
        } else this['running'] = !![], this['run_start'] == 0 && (this['run_start'] = Globals['Tickcount']()), Cheat['ExecuteCommand']('+attack'), Globals['Tickcount']() - this['run_start'] > 0x1 && stop_attack(), Globals['Tickcount']() - this['run_start'] > 0x8 && (this['ignore_input'] = !![]);
    } else move_back_t = ![], grenade_thrown = ![], this['ignore_input'] = ![], this['next_tick_ang'] = [];
}

function on_local_connect() {
    Entity['IsLocalPlayer'](Entity['GetEntityFromUserID'](Event['GetInt']('userid'))) && (soft_map = data[World['GetMapName']()['toLowerCase']()]);
}

function degreesToRadians(_0x33e41b) {
    return _0x33e41b * Math['PI'] / 0xb4;
}

function calc_dist_notCamera(_0x35413f, _0x1229a4) {
    return x = _0x35413f[0] - _0x1229a4[0], y = _0x35413f[0x1] - _0x1229a4[0x1], z = _0x35413f[0x2] - _0x1229a4[0x2], Math['sqrt'](x * x + y * y + z * z);
}

function calc_dist(_0x2c349f, _0x8eb9cb) {
    return x = _0x2c349f[0] - _0x8eb9cb[0], y = _0x2c349f[0x1] - _0x8eb9cb[0x1], Math['sqrt'](x * x + y * y);
}

function move_to_target(_0x3e6c3b, _0x1db010) {
    var _0xf7bf5f = Entity['GetLocalPlayer'](),
        _0x1b61b9 = Entity['GetRenderOrigin'](_0xf7bf5f);
    _0x1b61b9[0x2] = Entity['GetEyePosition'](_0xf7bf5f)[0x2];
    if (duck2) var _0x5eb051 = [_0x3e6c3b[0] - _0x1b61b9[0], _0x3e6c3b[0x1] - _0x1b61b9[0x1], _0x3e6c3b[0x2] - (_0x1b61b9[0x2] - 0x2e)],
        _0x44a0de = Math['sqrt'](_0x5eb051[0] * _0x5eb051[0] + _0x5eb051[0x1] * _0x5eb051[0x1] + _0x5eb051[0x2] * _0x5eb051[0x2]);
    else var _0x5eb051 = [_0x3e6c3b[0] - _0x1b61b9[0], _0x3e6c3b[0x1] - _0x1b61b9[0x1]],
        _0x44a0de = Math['sqrt'](_0x5eb051[0] * _0x5eb051[0] + _0x5eb051[0x1] * _0x5eb051[0x1]);
    var _0x4a4798 = Local['GetViewAngles']()[0x1],
        _0x460e40 = [];
    _0x460e40[0] = (Math['sin'](_0x4a4798 / 0xb4 * Math['PI']) * _0x5eb051[0x1] + Math['cos'](_0x4a4798 / 0xb4 * Math['PI']) * _0x5eb051[0]) * 0x14, _0x460e40[0x1] = (Math['sin'](_0x4a4798 / 0xb4 * Math['PI']) * _0x5eb051[0] + Math['cos'](_0x4a4798 / 0xb4 * Math['PI']) * -_0x5eb051[0x1]) * 0x14, _0x460e40[0x2] = 0;
    var _0x4a798b = Entity['GetProp'](_0xf7bf5f, 'DT_CSPlayer', 'm_vecVelocity[0]'),
        _0x37dab8 = Math['sqrt'](_0x4a798b[0] * _0x4a798b[0] + _0x4a798b[0x1] * _0x4a798b[0x1] + _0x4a798b[0x2] * _0x4a798b[0x2]);
    return UserCMD['SetMovement'](_0x460e40), _0x44a0de < (_0x1db010 ? _0x1db010 : 0.5) && (_0x37dab8 < 0x2 || _0x1db010);
}

function angle_to_vec(_16d9b2, _0x1e8657) {
    var _0x4e21f9 = degreesToRadians(_16d9b2),
        _0x389402 = degreesToRadians(_0x1e8657),
        _0x3ebbfb = Math['sin'](_0x4e21f9),
        _0x9f757b = Math['cos'](_0x4e21f9),
        _0x2cf85e = Math['sin'](_0x389402),
        _0x32bf45 = Math['cos'](_0x389402);
    return [_0x9f757b * _0x32bf45, _0x9f757b * _0x2cf85e, -_0x3ebbfb];
}

function unload() {
    Cheat['ExecuteCommand']('bind mouse1 +attack'), Cheat['ExecuteCommand']('-attack'), Cheat['ExecuteCommand']('-attack2');
}

function callbacks() {
    Cheat['RegisterCallback']('Unload', 'unload'), Cheat['RegisterCallback']('grenade_thrown', 'on_grenade'), Cheat['RegisterCallback']('Draw', 'location_manager'), Cheat['RegisterCallback']('Draw', 'draw'), Cheat['RegisterCallback']('CreateMove', 'animate_alpha'), Cheat['RegisterCallback']('CreateMove', 'move_on_key'), Cheat['RegisterCallback']('player_connect_full', 'on_local_connect');
}
callbacks();