var script = {}

script.build = 'beta'
script.name = 'chimera'

var bit = {}

bit.band = function(a, b) {return a & b }
bit.lshift = function(a, b) {return a << b }
bit.rshift = function(a, b) {return a >> b}
bit.bnot = function(a) {return ~a}

var   IN_ATTACK              = bit.lshift(1, 0) 
var   IN_JUMP                = bit.lshift(1, 1) 
var   IN_DUCK                = bit.lshift(1, 2) 
var   IN_FORWARD             = bit.lshift(1, 3) 
var   IN_BACK                = bit.lshift(1, 4) 
var   IN_USE                 = bit.lshift(1, 5) 
var   IN_CANCEL              = bit.lshift(1, 6) 
var   IN_LEFT                = bit.lshift(1, 7) 
var   IN_RIGHT               = bit.lshift(1, 8) 
var   IN_MOVELEFT            = bit.lshift(1, 9) 
var   IN_MOVERIGHT           = bit.lshift(1, 10) 
var   IN_ATTACK2             = bit.lshift(1, 11) 
var   IN_RUN                 = bit.lshift(1, 12)
var   IN_RELOAD              = bit.lshift(1, 13) 
var   IN_ALT1                = bit.lshift(1, 14)
var   IN_ALT2                = bit.lshift(1, 15)
var   IN_SCORE               = bit.lshift(1, 16)
var   IN_SPEED               = bit.lshift(1, 17)
var   IN_WALK                = bit.lshift(1, 18)
var   IN_ZOOM                = bit.lshift(1, 19) 
var   IN_WEAPON1             = bit.lshift(1, 20)
var   IN_WEAPON2             = bit.lshift(1, 21)
var   IN_BULLRUSH            = bit.lshift(1, 22)

var menu = {}

menu.vars = {}

var aux = {}

aux.override_alpha = function(color, alpha) {
    return [color[0], color[1], color[2], alpha * 255]
}

aux.multiply_alpha = function(color, alpha) {
    return [color[0], color[1], color[2], color[3] * alpha]
}

aux.in_bounds = function(vec_start, size, source) {
    return source[0] > vec_start[0] && source[0] < (vec_start[0] +  size[0]) && source[1] > vec_start[1] && source[1] < (vec_start[1] + size[1])
}

Math.lerp = function(value, min, max) {
    return min * (1 - value) + max * value
}

Math.lerp_reverse = function(value, min, max) {
    return (value - min) / (max - min)
}

Math.clamp = function(value, min, max) { 
    return Math.min(Math.max(min, value), max)
}

aux.lerp = function(time, start, end_pos) {

    if (time == undefined) {
        time = 0.095
    }

    time = Math.clamp(Globals.Frametime() * (time * 175), 0, 1)

    if (typeof(start) == 'object') {

        var start_color = start
        var end_color = end_pos

        start_color[0] = aux.lerp(time, start_color[0], end_color[0])
        start_color[1] = aux.lerp(time, start_color[1], end_color[1])
        start_color[2] = aux.lerp(time, start_color[2], end_color[2])
        start_color[3] = aux.lerp(time, start_color[3], end_color[3])
        return start_color
    }
    
    var delta = end_pos - start
    delta = delta * time
    delta = delta + start

    if (end_pos == 0 && delta < 0.01 && delta > -0.01) {
        delta = 0
    }
    else if (end_pos == 1 && delta < 1.01 && delta > 0.99) {
        delta = 1
    }

    return delta
}

aux.color_equals = function(firs_color, second_color) {
    return firs_color[0] == second_color[0] && firs_color[1] == second_color[1] && firs_color[2] == second_color[2] && firs_color[3] == second_color[3] 
}

aux.HSV_to_RGB = function(h,s,v,a) {

    if (h < 61) {
        r = 255;
        b = 0;
        g = (425 * h) / 100;
    }
    else if (h >= 61 && h < 121) {  
        r = 255 - ((425 * (h - 60)) / 100);
        g = 255;
        b = 0;
    }
    else if (h >= 121 && h < 181) {
        r = 0;
        g = 255;
        b = (425 * (h-120)) / 100;
    }
    else if (h >= 181 && h < 241) {
        r = 0;
        g = 255 - ((425 * (h-180))/100);
        b = 255;
    }
    else if (h >= 241 && h < 301) {
        r = (425 * (h-240))/100;
        g = 0;
        b = 255;
    }
    else if (h >= 241 && h < 360) {
        r = 255;
        g = 0;
        b = 255 - ((425 * (h-300))/100);
    }
    s = 100 - s;
    diff = ((255 - r) * s) / 100;
    r = r + diff;
    diff = ((255 - g) * s) / 100;
    g = g + diff;
    diff = ((255 - b) * s) / 100;
    b = b + diff;
    r = (r * v) / 100;
    g = (g * v) / 100;
    b = (b * v) / 100;
    return [r, g, b, a]
}

aux.RGB_to_HSV = function(r1, g1, b1, a1) {

    var result = {};
    var r = r1 / 255;
    var g = g1 / 255;
    var b = b1 / 255;
    var minVal = Math.min(r, g, b);
    var maxVal = Math.max(r, g, b);
    var delta = maxVal - minVal;

    result.v = maxVal;

    if (delta == 0) {
        result.h = 0;
        result.s = 0;
    } 
    else {
        result.s = delta / maxVal;
        var del_R = (((maxVal - r) / 6) + (delta / 2)) / delta;
        var del_G = (((maxVal - g) / 6) + (delta / 2)) / delta;
        var del_B = (((maxVal - b) / 6) + (delta / 2)) / delta;
        if (r == maxVal) {
            result.h = del_B - del_G;
        }
        else if (g == maxVal) { 
            result.h = (1 / 3) + del_R - del_B;
        }
        else if (b == maxVal) { 
            result.h = (2 / 3) + del_G - del_R; 
        }
        if (result.h < 0) { 
            result.h = result.h + 1; 
        }
        if (result.h > 1) { 
            result.h = result.h - 1; 
        }
    }

    result.h = Math.floor(result.h * 360);
    result.s = Math.floor(result.s * 100);
    result.v = 100 - Math.floor(result.v * 100);
    result.a = a1;

    return result
}

Render.LerpColor = function(value, min, max) {

    var r = min[0] * (1-value) + max[0] * value
    var g = min[1] * (1-value) + max[1] * value
    var b = min[2] * (1-value) + max[2] * value
    var a = min[3] * (1-value) + max[3] * value
    return [r, g, b, a]
}
//лень что то там делать мне пох45852фй
Render.Gradient = function(x, y, w, h, top_left, top_right, bottom_left, bottom_right) {
    if (h < w) {
        for (i = 0; i < h; i++) {
            Render.GradientRect(x, y + i, w, 1, 1, Render.LerpColor(i / h, top_left, bottom_left), Render.LerpColor(i / h, top_right, bottom_right))
        }
    }
    else {
        for (i = 0; i < w; i++) {
            Render.GradientRect(x + i, y, 1, h, 0, Render.LerpColor(i / w, top_left, top_right), Render.LerpColor(i / w, bottom_left , bottom_right))
        }
    }
}


var visuals = {}

visuals.screen_size = Render.GetScreenSize()

visuals.animation_speed = 0.095
visuals.is_rendering = false

visuals.animation_controller_items = []

visuals.update_animations = function() {

    for (k in visuals.animation_controller_items) {

        if (!visuals.animation_controller_items[k] || !visuals.animation_controller_items[k].called_this_frame) {

            if ( typeof(visuals.get_animation(k).number) == 'object') {
                if (aux.color_equals( visuals.new_animation(k, [0, 0, 0, 0], true), [0, 0, 0, 0])) {
                    visuals.animation_controller_items[k] = undefined
                }
            }
            else {
                if (visuals.new_animation(k, 0, true) == 0) {
                    visuals.animation_controller_items[k] = undefined
                }
            }
            continue
        }
        
        visuals.animation_controller_items[k].called_this_frame = false
    }
}

visuals.new_animation = function(name, new_value, removing) {

    if (!visuals.animation_controller_items[name]) {

        visuals.animation_controller_items[name] = {}
        visuals.animation_controller_items[name].color = [0, 0, 0, 0]
        visuals.animation_controller_items[name].number = 0
        visuals.animation_controller_items[name].called_this_frame = true
    }

    

    if (removing == undefined) {   
        visuals.animation_controller_items[name].called_this_frame = true
    }

    if (typeof(new_value) == 'object') {

        var lerping = aux.lerp(visuals.animation_speed, visuals.animation_controller_items[name].color, new_value)
        visuals.animation_controller_items[name].color = lerping

        return lerping
    }

    var lerping = aux.lerp(visuals.animation_speed, visuals.animation_controller_items[name].number, new_value)
    visuals.animation_controller_items[name].number = lerping

    return lerping
}

visuals.get_animation = function(name) {
    return !visuals.animation_controller_items[name] ? {number : 0, color : [0, 0, 0, 0], called_this_frame : false} : visuals.animation_controller_items[name]
}

/*
visuals.drag = {}

visuals.group = ui.create('visuals drag')

visuals.drag_new = function(item_name, default_x, default_y)

    ui.new_element('General', 'General', item_name .. '_pos_x', visuals.group:slider(item_name .. '_pos_x', 0, visuals.screen_size.x, math.floor(default_x * visuals.screen_size.x)), function() 
        return false
    end, true)

    ui.new_element('General', 'General', item_name .. '_pos_y', visuals.group:slider(item_name .. '_pos_y', 0, visuals.screen_size.y, math.floor(default_y * visuals.screen_size.y)), function() 
        return false
    end, true)

    return
end

visuals.current_drugging_item = nil

visuals.drag_handle = function(x, y, w, h, item)

    if menu.vars['General']['General'][item .. '_pos_x'] == nil then
        error('Make sure that ' .. item .. ' dragging element was created')
    end

    if visuals.drag[item] == nil then
        visuals.drag[item] = {}
        visuals.drag[item].drag_position = vector(0,0)
        visuals.drag[item].is_dragging = false
    end

    if aux.in_bounds(vector(x, y), vector(x + w, y + h), input_system.get_cursor_position()) and aux.in_bounds(vector(0, 0), visuals.screen_size, ui.get_mouse_position()) then
        if common.is_button_down(0x01) and visuals.drag[item].is_dragging == false and ( visuals.current_drugging_item == nil or visuals.current_drugging_item == item) then
            visuals.drag[item].is_dragging = true
            visuals.current_drugging_item = item
            visuals.drag[item].drag_position = vector(x - ui.get_mouse_position().x, y - ui.get_mouse_position().y)
        end
    end

    if not aux.in_bounds(vector(0, 0), visuals.screen_size, ui.get_mouse_position()) then
        visuals.drag[item].is_dragging = false
    end

    if not common.is_button_down(0x01) then
        visuals.drag[item].is_dragging = false
        visuals.current_drugging_item = nil
    end

    if visuals.drag[item].is_dragging == true and ui.get_alpha() == 1 then
        menu.vars['General']['General'][item .. '_pos_x'].reference:set(aux.clamp(ui.get_mouse_position().x + visuals.drag[item].drag_position.x, 0, visuals.screen_size.x - w))
        menu.vars['General']['General'][item .. '_pos_y'].reference:set(aux.clamp(ui.get_mouse_position().y + visuals.drag[item].drag_position.y, 0, visuals.screen_size.y - h))
    end
    
end

visuals.get_draggable_item_position = function(item)
    return vector(menu.vars['General']['General'][item .. '_pos_x'].reference:get(), menu.vars['General']['General'][item .. '_pos_y'].reference:get())
end
*/



var input_system = {}

input_system.pressed_keys = []
input_system.last_pressed_keys = []

input_system.cursor_position = Input.GetCursorPosition()
input_system.cache_cursor_position = Input.GetCursorPosition()

input_system.get_cursor_position = function() {

    if (!Input.IsKeyPressed(0x01)) {
        input_system.cursor_position = input_system.cache_cursor_position
    }

    input_system.cache_cursor_position = Input.GetCursorPosition()

    return input_system.cursor_position
}

input_system.update = function() {
    for (i = 1; i < 255; i++) {
        input_system.last_pressed_keys[i] = input_system.pressed_keys[i]
        input_system.pressed_keys[i] = Input.IsKeyPressed(i)
    }
}

input_system.is_key_pressed = function(key) {
    return input_system.pressed_keys[key] && !input_system.last_pressed_keys[key]
}
    
input_system.is_key_released = function(key) {
    return !input_system.pressed_keys[key] && input_system.last_pressed_keys[key]
}

menu.position = [150, 150]

menu.items = []
menu.current_tab = 0

menu.colors = {}
menu.color_theme = {}

menu.colors.MENU_SIDEBAR = [0, 0, 0, 0]

menu.colors.current_theme = 'Default'

menu.color_theme['Default'] = {}
menu.color_theme['Default'].MAIN = [250, 166, 24, 255]
menu.color_theme['Default'].TAB_NOT_SELECTED = [124, 124, 124, 255]
menu.color_theme['Default'].MENU_SIDEBAR = [13, 13, 17, 255]
menu.color_theme['Default'].MENU_MAIN = [18, 18, 23, 255]
menu.color_theme['Default'].TEXT_SECOND = [124, 124, 124, 255]
menu.color_theme['Default'].ITEM_NAME = [124, 124, 124, 255]
menu.color_theme['Default'].ITEM_ENABLED = [230, 230, 230, 255]
menu.color_theme['Default'].CHECKBOX_DISABLED = menu.color_theme['Default'].MENU_SIDEBAR
menu.color_theme['Default'].CHECKBOX_ENABLED = menu.color_theme['Default'].MAIN
menu.color_theme['Default'].CHECKBOX_OUTLINE = [32, 32, 33, 255]
menu.color_theme['Default'].SLIDER_RECT = menu.color_theme['Default'].MENU_SIDEBAR
menu.color_theme['Default'].SLIDER_ENABLED = menu.color_theme['Default'].MAIN
menu.color_theme['Default'].SLIDER_OUTLINE = [32, 32, 33, 255]
menu.color_theme['Default'].DROPDOWN_RECT = menu.color_theme['Default'].MENU_SIDEBAR
menu.color_theme['Default'].DROPDOWN_OUTLINE = [32, 32, 33, 255]
menu.color_theme['Default'].COLORPICKER_OUTLINE = [32, 32, 33, 255]
menu.color_theme['Default'].COLORPICKER_PICKER = menu.color_theme['Default'].MENU_SIDEBAR
menu.color_theme['Default'].BUTTON_RECT = menu.color_theme['Default'].MENU_SIDEBAR
menu.color_theme['Default'].BUTTON_OUTLINE = [32, 32, 33, 255]

menu.color_theme['Midnight'] = {}
menu.color_theme['Midnight'].MAIN = [106, 142, 197, 255]
menu.color_theme['Midnight'].TAB_NOT_SELECTED = [124, 124, 124, 255]
menu.color_theme['Midnight'].MENU_SIDEBAR = [15, 15, 20, 255]
menu.color_theme['Midnight'].MENU_MAIN = [23, 23, 28, 255]
menu.color_theme['Midnight'].TEXT_SECOND = [124, 124, 124, 255]
menu.color_theme['Midnight'].ITEM_NAME = [124, 124, 124, 255]
menu.color_theme['Midnight'].ITEM_ENABLED = [230, 230, 230, 255]
menu.color_theme['Midnight'].CHECKBOX_DISABLED = menu.color_theme['Midnight'].MENU_SIDEBAR
menu.color_theme['Midnight'].CHECKBOX_ENABLED = menu.color_theme['Midnight'].MAIN
menu.color_theme['Midnight'].CHECKBOX_OUTLINE = [40, 40, 48, 255]
menu.color_theme['Midnight'].SLIDER_RECT = menu.color_theme['Midnight'].MENU_SIDEBAR
menu.color_theme['Midnight'].SLIDER_ENABLED = menu.color_theme['Midnight'].MAIN
menu.color_theme['Midnight'].SLIDER_OUTLINE = [40, 40, 48, 255]
menu.color_theme['Midnight'].DROPDOWN_RECT = menu.color_theme['Midnight'].MENU_SIDEBAR
menu.color_theme['Midnight'].DROPDOWN_OUTLINE = [40, 40, 48, 255]
menu.color_theme['Midnight'].COLORPICKER_OUTLINE = [40, 40, 48, 255]
menu.color_theme['Midnight'].COLORPICKER_PICKER = menu.color_theme['Midnight'].MENU_SIDEBAR
menu.color_theme['Midnight'].BUTTON_RECT = menu.color_theme['Midnight'].MENU_SIDEBAR
menu.color_theme['Midnight'].BUTTON_OUTLINE = [40, 40, 48, 255]

menu.fonts = {}

menu.dpi_scale = 1
menu.dpi_scales = []

menu.dpi_scales[0] = 0.5
menu.dpi_scales[1] = 1
menu.dpi_scales[2] = 1.5
menu.dpi_scales[3] = 2

menu.tab_size = []
menu.tab_offset = 0


menu.begin = function() {
    var IS_MENU_OPEN = UI.IsMenuOpen()

    var global_alpha = visuals.new_animation('menu_alpha', IS_MENU_OPEN ? 1 : 0)
    
    if (global_alpha == 0) {
        return
    }

    for (name in menu.color_theme[menu.colors.current_theme]) {
        menu.colors[name] = visuals.new_animation(name, aux.multiply_alpha(menu.color_theme[menu.colors.current_theme][name], global_alpha))
    }

    //^ ^ ^ а это такая своя цветовая тема

    var CURSOR_POSITION = Input.GetCursorPosition()
    var HELD_CURSOR_POSITION = input_system.get_cursor_position() // короче эта хуйня обновляет позицию мышки только тогда, когда отжата кнопка 0x01 - ЛКМ, это для всяких слайдеров дергалок колорпикеров и тд, короче где надо мышкой водить

    var SCRIPT_NAME_TEXT_SECOND_FONT = Render.AddFont('Segoeui.ttf', 11 * menu.dpi_scale, 400)
    var TAB_TEXT_MAIN_FONT = Render.AddFont('Segoeuib.ttf', 18 * menu.dpi_scale, 400)
    var SHORT_TAB_NAME_FONT = Render.AddFont('Segoeuib.ttf', 11 * menu.dpi_scale, 400)
    var ITEM_NAME = Render.AddFont('Segoeui.ttf', 9 * menu.dpi_scale, 400)
    var SLIDER_VALUE = Render.AddFont('Segoeui.ttf', 9 * menu.dpi_scale, 400)

    //var MENU_SIDEBAR = [50 * menu.dpi_scale, 350 * menu.dpi_scale]
    //var MENU_MAIN = [200 * menu.dpi_scale, 350 * menu.dpi_scale]
    
    if (!menu.tab_size[menu.current_tab]) {
        menu.tab_size[menu.current_tab] = 0
    }

    var menu_size_anim = visuals.new_animation('menu size anim', Math.max(menu.tab_size[menu.current_tab], menu.tab_offset))

    var MENU_SIDEBAR = [50 * menu.dpi_scale, menu_size_anim]
    var MENU_MAIN = [200 * menu.dpi_scale, menu_size_anim]

    var TAB_SIZE = [MENU_SIDEBAR[0], 25 * menu.dpi_scale]
    var TAB_INDENT = 5 * menu.dpi_scale

    var MENU_MAIN_INDENT = 16 * menu.dpi_scale

    var CHECKBOX_SIZE = [16 * menu.dpi_scale, 16 * menu.dpi_scale]
    var CHECKBOX_NAME_INDENT = 8 * menu.dpi_scale
    var CHECKBOX_INDENT = CHECKBOX_SIZE[1] + 8 * menu.dpi_scale

    var SLIDER_SIZE = [MENU_MAIN[0] - MENU_MAIN_INDENT * 2, 8 * menu.dpi_scale]
    var SLIDER_TEXT_INDENT = 18 * menu.dpi_scale
    var SLIDER_INDENT = SLIDER_TEXT_INDENT + SLIDER_SIZE[1] + 8 * menu.dpi_scale

    var DROPDOWN_SIZE = [MENU_MAIN[0] - MENU_MAIN_INDENT * 2, 24 * menu.dpi_scale]
    var DROPDOWN_TEXT_INDENT = 18 * menu.dpi_scale
    var DROPDOWN_INDENT = DROPDOWN_TEXT_INDENT + DROPDOWN_SIZE[1] + 8 * menu.dpi_scale
    var DROPDOWN_VALUE_TEXT_INDENT = 8 * menu.dpi_scale

    var COLORPICKER_SIZE = [16 * menu.dpi_scale, 16 * menu.dpi_scale]
    var COLORPICKER_NAME_INDENT = 8 * menu.dpi_scale
    var COLORPICKER_INDENT = COLORPICKER_SIZE[1] + 8 * menu.dpi_scale

    var COLORPICKER_PICKER_COLOR_SIZE = [120 * menu.dpi_scale, 120 * menu.dpi_scale]
    var COLORPICKER_PICKER_ALPHA_SIZE = [9 * menu.dpi_scale, 120 * menu.dpi_scale]
    var COLORPICKER_PICKER_HUE_SIZE = [9 * menu.dpi_scale, 120 * menu.dpi_scale]
    var COLORPICKER_CROSSHAIR_SIZE = 5 * menu.dpi_scale
    var COLORPICKER_PICKER_SIZE = [COLORPICKER_PICKER_COLOR_SIZE[0] + COLORPICKER_PICKER_ALPHA_SIZE[0] + COLORPICKER_PICKER_HUE_SIZE[0] + MENU_MAIN_INDENT * 4, MENU_MAIN_INDENT * 2 + COLORPICKER_PICKER_COLOR_SIZE[1]]

    var BUTTON_SIZE = [MENU_MAIN[0] - MENU_MAIN_INDENT * 2, 24 * menu.dpi_scale]
    var BUTTON_NAME_INDENT = 8 * menu.dpi_scale
    var BUTTON_INDENT = BUTTON_SIZE[1] + 8 * menu.dpi_scale

    Render.FilledRect(menu.position[0], menu.position[1], MENU_SIDEBAR[0], MENU_SIDEBAR[1], menu.colors.MENU_SIDEBAR)
    Render.FilledRect(menu.position[0] + MENU_SIDEBAR[0], menu.position[1], MENU_MAIN[0], MENU_MAIN[1], menu.colors.MENU_MAIN)

    var SCRIPT_NAME_TEXT_SECOND_SIZE = Render.TextSizeCustom(script.name, SCRIPT_NAME_TEXT_SECOND_FONT)
    Render.StringCustom(menu.position[0] + MENU_SIDEBAR[0] + MENU_MAIN_INDENT, menu.position[1] + MENU_MAIN_INDENT - 2, 0, script.name, menu.colors.TEXT_SECOND, SCRIPT_NAME_TEXT_SECOND_FONT)

    var DROPDOWNS = []
    var COLORPICKERS = []

    var TAB_INTERACTION_PERMISSION = global_alpha > 0.5 && IS_MENU_OPEN

    var PER_TABS_OFFSET = TAB_INDENT

    for (i in menu.items) {

        var tab = menu.items[i]

        var SHORT_TAB_NAME_SIZE = Render.TextSizeCustom(tab.short_name, SHORT_TAB_NAME_FONT)

        Render.StringCustom(menu.position[0] + TAB_SIZE[0] / 2 - SHORT_TAB_NAME_SIZE[0] / 2, menu.position[1] + PER_TABS_OFFSET + TAB_SIZE[1] / 2 - SHORT_TAB_NAME_SIZE[1] / 2 - 2, 0, tab.short_name, menu.current_tab == i ? menu.colors.MAIN : menu.colors.TAB_NOT_SELECTED, SHORT_TAB_NAME_FONT)

        if (input_system.is_key_pressed(0x01) && TAB_INTERACTION_PERMISSION) {

            if (aux.in_bounds([menu.position[0], menu.position[1] + PER_TABS_OFFSET], TAB_SIZE, CURSOR_POSITION)) {
                menu.current_tab = i
            }

        }

        var TAB_NAME_ALPHA = visuals.new_animation(i + ' TAB NAME ALPHA', TAB_INTERACTION_PERMISSION && menu.current_tab == i ? 1 : 0)
        var TAB_NAME_TEXT = Render.TextSizeCustom(tab.name.toLowerCase(), TAB_TEXT_MAIN_FONT)
        Render.StringCustom(menu.position[0] + MENU_SIDEBAR[0] + MENU_MAIN_INDENT, menu.position[1] + MENU_MAIN_INDENT + SCRIPT_NAME_TEXT_SECOND_SIZE[1] - 2, 0, tab.name.toLowerCase(), aux.multiply_alpha(menu.colors.MAIN, TAB_NAME_ALPHA), TAB_TEXT_MAIN_FONT)

        var PER_ITEMS_OFFSET = 0
        var TAB_HEIGHT = 0

        for (j in tab.items) {

            var item = tab.items[j]

            //menu.set_visible(tab.name, item.name, item.visibility_condition()) //бля мне жалко ваш фпс но я долбаеб

            var VISIBILITY_CONDITION = item.visibility_condition()

            var ITEM_INTERACTION_PERMISSION = TAB_INTERACTION_PERMISSION && item.tab == menu.current_tab && VISIBILITY_CONDITION
            //Cheat.Print(ITEM_INTERACTION_PERMISSION + ' \n')
            var ITEM_ALPHA = visuals.new_animation(i + item.name + ' item alpha', ITEM_INTERACTION_PERMISSION ? 1 : 0)
            var ITEM_VISIBILITY_ALPHA = visuals.new_animation(i + item.name + ' item alpha visibility', VISIBILITY_CONDITION ? 1 : 0)

            var is_something_open = function() {
                return DROPDOWNS.length > 0 || COLORPICKERS.length > 0
            }
            
            if (item.type == 'checkbox') {

                var RECT_COLOR = visuals.new_animation(i + j + ' CHECKBOX RECT COLOR', aux.override_alpha(item.value ? menu.colors.CHECKBOX_ENABLED : menu.colors.CHECKBOX_DISABLED, ITEM_ALPHA))
                var TEXT_COLOR = visuals.new_animation(i + j + ' CHECKBOX TEXT COLOR', aux.override_alpha(item.value ? menu.colors.ITEM_ENABLED : menu.colors.ITEM_NAME, ITEM_ALPHA))
                var RECT_OUTLINE = visuals.new_animation(i + j + ' CHECKBOX RECT OUTLINE', aux.override_alpha(item.value ? [0, 0, 0, 255] : menu.colors.CHECKBOX_OUTLINE, ITEM_ALPHA))

                Render.FilledRect(menu.position[0] + MENU_SIDEBAR[0] + MENU_MAIN_INDENT, menu.position[1] + MENU_MAIN_INDENT + SCRIPT_NAME_TEXT_SECOND_SIZE[1] + TAB_NAME_TEXT[1] + MENU_MAIN_INDENT + PER_ITEMS_OFFSET, CHECKBOX_SIZE[0], CHECKBOX_SIZE[1], RECT_COLOR)
                Render.Rect(menu.position[0] + MENU_SIDEBAR[0] + MENU_MAIN_INDENT, menu.position[1] + MENU_MAIN_INDENT + SCRIPT_NAME_TEXT_SECOND_SIZE[1] + TAB_NAME_TEXT[1] + MENU_MAIN_INDENT + PER_ITEMS_OFFSET, CHECKBOX_SIZE[0], CHECKBOX_SIZE[1], RECT_OUTLINE)
                
                var CHECKBOX_NAME_SIZE = Render.TextSizeCustom(item.name, ITEM_NAME)
                Render.StringCustom(menu.position[0] + MENU_SIDEBAR[0] + MENU_MAIN_INDENT + CHECKBOX_SIZE[0] + CHECKBOX_NAME_INDENT, menu.position[1] + MENU_MAIN_INDENT + SCRIPT_NAME_TEXT_SECOND_SIZE[1] + TAB_NAME_TEXT[1] + MENU_MAIN_INDENT + PER_ITEMS_OFFSET, 0, item.name, TEXT_COLOR, ITEM_NAME)

                if (input_system.is_key_pressed(0x01) && ITEM_INTERACTION_PERMISSION && !is_something_open()) {
                    if (aux.in_bounds([menu.position[0] + MENU_SIDEBAR[0] + MENU_MAIN_INDENT, menu.position[1] + MENU_MAIN_INDENT + SCRIPT_NAME_TEXT_SECOND_SIZE[1] + TAB_NAME_TEXT[1] + MENU_MAIN_INDENT + PER_ITEMS_OFFSET], [CHECKBOX_NAME_SIZE[0] + CHECKBOX_NAME_INDENT + CHECKBOX_SIZE[0], CHECKBOX_SIZE[1]], CURSOR_POSITION)) {
                        item.value = !item.value
                    }
                }

                PER_ITEMS_OFFSET = PER_ITEMS_OFFSET + CHECKBOX_INDENT * ITEM_VISIBILITY_ALPHA
            }
            else if (item.type == 'slider') {

                var RECT_COLOR = visuals.new_animation(i + j + ' SLIDER RECT COLOR', aux.override_alpha(menu.colors.SLIDER_RECT, ITEM_ALPHA))
                var RECT_ENABLED = visuals.new_animation(i + j + ' SLIDER RECT ENABLED', aux.override_alpha(menu.colors.SLIDER_ENABLED, ITEM_ALPHA))
                var TEXT_COLOR = visuals.new_animation(i + j + ' SLIDER TEXT COLOR', aux.override_alpha(menu.colors.ITEM_ENABLED, ITEM_ALPHA))
                var RECT_OUTLINE = visuals.new_animation(i + j + ' SLIDER RECT OUTLINE', aux.override_alpha(menu.colors.SLIDER_OUTLINE, ITEM_ALPHA))

                var SLIDER_NAME_SIZE = Render.TextSizeCustom(item.name, ITEM_NAME)
                Render.StringCustom(menu.position[0] + MENU_SIDEBAR[0] + MENU_MAIN_INDENT, menu.position[1] + MENU_MAIN_INDENT + SCRIPT_NAME_TEXT_SECOND_SIZE[1] + TAB_NAME_TEXT[1] + MENU_MAIN_INDENT + PER_ITEMS_OFFSET - 2, 0, item.name, TEXT_COLOR, ITEM_NAME)

                var SLIDER_VALUE_SIZE = Render.TextSizeCustom((item.value).toString(), ITEM_NAME)
                Render.StringCustom(menu.position[0] + MENU_SIDEBAR[0] + MENU_MAIN_INDENT + SLIDER_SIZE[0] - SLIDER_VALUE_SIZE[0], menu.position[1] + MENU_MAIN_INDENT + SCRIPT_NAME_TEXT_SECOND_SIZE[1] + TAB_NAME_TEXT[1] + MENU_MAIN_INDENT + PER_ITEMS_OFFSET - 2, 0, (item.value).toString(), TEXT_COLOR, ITEM_NAME)

                Render.FilledRect(menu.position[0] + MENU_SIDEBAR[0] + MENU_MAIN_INDENT, menu.position[1] + MENU_MAIN_INDENT + SCRIPT_NAME_TEXT_SECOND_SIZE[1] + TAB_NAME_TEXT[1] + MENU_MAIN_INDENT + PER_ITEMS_OFFSET + SLIDER_TEXT_INDENT, SLIDER_SIZE[0], SLIDER_SIZE[1], RECT_COLOR)
                Render.Rect(menu.position[0] + MENU_SIDEBAR[0] + MENU_MAIN_INDENT, menu.position[1] + MENU_MAIN_INDENT + SCRIPT_NAME_TEXT_SECOND_SIZE[1] + TAB_NAME_TEXT[1] + MENU_MAIN_INDENT + PER_ITEMS_OFFSET + SLIDER_TEXT_INDENT, SLIDER_SIZE[0], SLIDER_SIZE[1], RECT_OUTLINE)

                var SLIDER_VALUE = Math.clamp(Math.lerp_reverse(item.value, item.min, item.max), 0, 1) // хз зачем но похуй вприницпе я думаю
                var ANIM_SLIDER_VALUE = visuals.new_animation(i + j + ' ANIM SLIDER VALUE', SLIDER_VALUE)

                Render.FilledRect(menu.position[0] + MENU_SIDEBAR[0] + MENU_MAIN_INDENT, menu.position[1] + MENU_MAIN_INDENT + SCRIPT_NAME_TEXT_SECOND_SIZE[1] + TAB_NAME_TEXT[1] + MENU_MAIN_INDENT + PER_ITEMS_OFFSET + SLIDER_TEXT_INDENT, SLIDER_SIZE[0] * ANIM_SLIDER_VALUE, SLIDER_SIZE[1], RECT_ENABLED)

                if (Input.IsKeyPressed(0x01) && ITEM_INTERACTION_PERMISSION && !is_something_open()) {
                    if (aux.in_bounds([menu.position[0] + MENU_SIDEBAR[0] + MENU_MAIN_INDENT, menu.position[1] + MENU_MAIN_INDENT + SCRIPT_NAME_TEXT_SECOND_SIZE[1] + TAB_NAME_TEXT[1] + MENU_MAIN_INDENT + PER_ITEMS_OFFSET + SLIDER_TEXT_INDENT], SLIDER_SIZE, HELD_CURSOR_POSITION)) {
                        
                        var value = (Math.clamp(CURSOR_POSITION[0], menu.position[0] + MENU_SIDEBAR[0] + MENU_MAIN_INDENT, menu.position[0] + MENU_SIDEBAR[0] + MENU_MAIN_INDENT + SLIDER_SIZE[0]) - (menu.position[0] + MENU_SIDEBAR[0] + MENU_MAIN_INDENT)) / SLIDER_SIZE[0]

                        item.value = Math.round(Math.lerp(value, item.min, item.max))
                    }
                }

                PER_ITEMS_OFFSET = PER_ITEMS_OFFSET + SLIDER_INDENT * ITEM_VISIBILITY_ALPHA
            }
            else if (item.type == 'dropdown') {

                var RECT_COLOR = visuals.new_animation(i + j + ' DROPDOWN RECT COLOR', aux.override_alpha(menu.colors.DROPDOWN_RECT, ITEM_ALPHA))
                var RECT_OUTLINE = visuals.new_animation(i + j + ' DROPDOWN RECT OUTLINE', aux.override_alpha(menu.colors.DROPDOWN_OUTLINE, ITEM_ALPHA))
                var TEXT_COLOR = visuals.new_animation(i + j + ' DROPDOWN TEXT COLOR', aux.override_alpha(menu.colors.ITEM_ENABLED, ITEM_ALPHA))
                var VALUE_COLOR = visuals.new_animation(i + j + ' DROPDOWN VALUE COLOR', aux.override_alpha(menu.colors.ITEM_NAME, ITEM_ALPHA))

                if (input_system.is_key_pressed(0x01) && ITEM_INTERACTION_PERMISSION && !is_something_open()) {

                    if (aux.in_bounds([menu.position[0] + MENU_SIDEBAR[0] + MENU_MAIN_INDENT, menu.position[1] + MENU_MAIN_INDENT + SCRIPT_NAME_TEXT_SECOND_SIZE[1] + TAB_NAME_TEXT[1] + MENU_MAIN_INDENT + PER_ITEMS_OFFSET + DROPDOWN_TEXT_INDENT, DROPDOWN_SIZE[0]], DROPDOWN_SIZE, CURSOR_POSITION)) {
                        item.visible = !item.visible
                    }
                }

                if (!ITEM_INTERACTION_PERMISSION) {
                    item.visible = false
                }

                var OPTIONS_OFFSET = 0
                var DROPDOWN_ALPHA = visuals.new_animation(i + j + ' DROPDOWN ALPHA', item.visible ? 1 : 0)

                var DROPDOWN_NAME_SIZE = Render.TextSizeCustom(item.name, ITEM_NAME)
                Render.StringCustom(menu.position[0] + MENU_SIDEBAR[0] + MENU_MAIN_INDENT, menu.position[1] + MENU_MAIN_INDENT + SCRIPT_NAME_TEXT_SECOND_SIZE[1] + TAB_NAME_TEXT[1] + MENU_MAIN_INDENT + PER_ITEMS_OFFSET - 2, 0, item.name, TEXT_COLOR, ITEM_NAME)

                Render.FilledRect(menu.position[0] + MENU_SIDEBAR[0] + MENU_MAIN_INDENT, menu.position[1] + MENU_MAIN_INDENT + SCRIPT_NAME_TEXT_SECOND_SIZE[1] + TAB_NAME_TEXT[1] + MENU_MAIN_INDENT + PER_ITEMS_OFFSET + DROPDOWN_TEXT_INDENT, DROPDOWN_SIZE[0], DROPDOWN_SIZE[1], RECT_COLOR)

                Render.Rect(menu.position[0] + MENU_SIDEBAR[0] + MENU_MAIN_INDENT, menu.position[1] + MENU_MAIN_INDENT + SCRIPT_NAME_TEXT_SECOND_SIZE[1] + TAB_NAME_TEXT[1] + MENU_MAIN_INDENT + PER_ITEMS_OFFSET + DROPDOWN_TEXT_INDENT, DROPDOWN_SIZE[0], DROPDOWN_SIZE[1], aux.multiply_alpha(RECT_OUTLINE, 1 - DROPDOWN_ALPHA))
                
                
                var DROPDOWN_VALUE_SIZE = Render.TextSizeCustom(item.options[item.value], ITEM_NAME)
                Render.StringCustom(menu.position[0] + MENU_SIDEBAR[0] + MENU_MAIN_INDENT + DROPDOWN_VALUE_TEXT_INDENT, menu.position[1] + MENU_MAIN_INDENT + SCRIPT_NAME_TEXT_SECOND_SIZE[1] + TAB_NAME_TEXT[1] + MENU_MAIN_INDENT + PER_ITEMS_OFFSET + DROPDOWN_TEXT_INDENT + DROPDOWN_SIZE[1] / 2 - DROPDOWN_VALUE_SIZE[1] / 2 - 2, 0, item.options[item.value], VALUE_COLOR, ITEM_NAME)

                if (DROPDOWN_ALPHA > 0) {

                    for (p in item.options) {
 
                        var IS_SELECTED = p == item.value

                        if (input_system.is_key_pressed(0x01) && ITEM_INTERACTION_PERMISSION) {

                            if (aux.in_bounds([menu.position[0] + MENU_SIDEBAR[0] + MENU_MAIN_INDENT, menu.position[1] + MENU_MAIN_INDENT + SCRIPT_NAME_TEXT_SECOND_SIZE[1] + TAB_NAME_TEXT[1] + MENU_MAIN_INDENT + PER_ITEMS_OFFSET + DROPDOWN_TEXT_INDENT + DROPDOWN_SIZE[1] + OPTIONS_OFFSET], DROPDOWN_SIZE, CURSOR_POSITION)) {
                                item.value = p
                                item.visible = false
                            }
                        }
                            
                        OPTIONS_OFFSET = OPTIONS_OFFSET + DROPDOWN_SIZE[1]
                    }
                    
                    if (input_system.is_key_pressed(0x01) && ITEM_INTERACTION_PERMISSION) {
                        
                        if (!aux.in_bounds([menu.position[0] + MENU_SIDEBAR[0] + MENU_MAIN_INDENT, menu.position[1] + MENU_MAIN_INDENT + SCRIPT_NAME_TEXT_SECOND_SIZE[1] + TAB_NAME_TEXT[1] + MENU_MAIN_INDENT + PER_ITEMS_OFFSET + DROPDOWN_TEXT_INDENT], [DROPDOWN_SIZE[0], DROPDOWN_SIZE[1] * (item.options.length + 1)], CURSOR_POSITION)) {
                            item.visible = false
                        }
                    }

                    DROPDOWNS.push({
                        position : [menu.position[0] + MENU_SIDEBAR[0] + MENU_MAIN_INDENT, menu.position[1] + MENU_MAIN_INDENT + SCRIPT_NAME_TEXT_SECOND_SIZE[1] + TAB_NAME_TEXT[1] + MENU_MAIN_INDENT + PER_ITEMS_OFFSET + DROPDOWN_TEXT_INDENT + DROPDOWN_SIZE[1]],
                        item : item,
                        RECT_COLOR : RECT_COLOR,
                        RECT_OUTLINE : RECT_OUTLINE,
                        ITEM_ALPHA : ITEM_ALPHA,
                        DROPDOWN_ALPHA : DROPDOWN_ALPHA
                    })                    
                }

                PER_ITEMS_OFFSET = PER_ITEMS_OFFSET + DROPDOWN_INDENT * ITEM_VISIBILITY_ALPHA
            }
            else if (item.type == 'multidropdown') {
                
                var RECT_COLOR = visuals.new_animation(i + j + ' DROPDOWN RECT COLOR', aux.override_alpha(menu.colors.DROPDOWN_RECT, ITEM_ALPHA))
                var RECT_OUTLINE = visuals.new_animation(i + j + ' DROPDOWN RECT OUTLINE', aux.override_alpha(menu.colors.DROPDOWN_OUTLINE, ITEM_ALPHA))
                var TEXT_COLOR = visuals.new_animation(i + j + ' DROPDOWN TEXT COLOR', aux.override_alpha(menu.colors.ITEM_ENABLED, ITEM_ALPHA))
                var VALUE_COLOR = visuals.new_animation(i + j + ' DROPDOWN VALUE COLOR', aux.override_alpha(menu.colors.ITEM_NAME, ITEM_ALPHA))

                if (input_system.is_key_pressed(0x01) && ITEM_INTERACTION_PERMISSION && !is_something_open()) {

                    if (aux.in_bounds([menu.position[0] + MENU_SIDEBAR[0] + MENU_MAIN_INDENT, menu.position[1] + MENU_MAIN_INDENT + SCRIPT_NAME_TEXT_SECOND_SIZE[1] + TAB_NAME_TEXT[1] + MENU_MAIN_INDENT + PER_ITEMS_OFFSET + DROPDOWN_TEXT_INDENT, DROPDOWN_SIZE[0]], DROPDOWN_SIZE, CURSOR_POSITION)) {
                        item.visible = !item.visible
                    }
                }

                if (!ITEM_INTERACTION_PERMISSION) {
                    item.visible = false
                }

                var OPTIONS_OFFSET = 0
                var DROPDOWN_ALPHA = visuals.new_animation(i + j + ' MULTIDROPDOWN ALPHA', item.visible ? 1 : 0)

                var DROPDOWN_NAME_SIZE = Render.TextSizeCustom(item.name, ITEM_NAME)
                Render.StringCustom(menu.position[0] + MENU_SIDEBAR[0] + MENU_MAIN_INDENT, menu.position[1] + MENU_MAIN_INDENT + SCRIPT_NAME_TEXT_SECOND_SIZE[1] + TAB_NAME_TEXT[1] + MENU_MAIN_INDENT + PER_ITEMS_OFFSET - 2, 0, item.name, TEXT_COLOR, ITEM_NAME)

                Render.FilledRect(menu.position[0] + MENU_SIDEBAR[0] + MENU_MAIN_INDENT, menu.position[1] + MENU_MAIN_INDENT + SCRIPT_NAME_TEXT_SECOND_SIZE[1] + TAB_NAME_TEXT[1] + MENU_MAIN_INDENT + PER_ITEMS_OFFSET + DROPDOWN_TEXT_INDENT, DROPDOWN_SIZE[0], DROPDOWN_SIZE[1], RECT_COLOR)

                Render.Rect(menu.position[0] + MENU_SIDEBAR[0] + MENU_MAIN_INDENT, menu.position[1] + MENU_MAIN_INDENT + SCRIPT_NAME_TEXT_SECOND_SIZE[1] + TAB_NAME_TEXT[1] + MENU_MAIN_INDENT + PER_ITEMS_OFFSET + DROPDOWN_TEXT_INDENT, DROPDOWN_SIZE[0], DROPDOWN_SIZE[1], aux.multiply_alpha(RECT_OUTLINE, 1 - DROPDOWN_ALPHA))
                
                var amount = 0
                var new_values = ''
                new_values = amount == 0 ? 'None' : new_values

                for (index = 0; index < item.options.length; index++) {

                    if (item.value[index]) {

                        if (amount > 0) {
                            new_values = new_values + ', '
                        }

                        new_values = new_values + item.options[index]
                        new_values = new_values.replace('None', '')

                        amount = amount + 1
                    }
                }
                
                var DROPDOWN_VALUE_SIZE = Render.TextSizeCustom(new_values, ITEM_NAME)
                new_values = DROPDOWN_VALUE_SIZE[0] > (DROPDOWN_SIZE[0] - DROPDOWN_VALUE_TEXT_INDENT * 2) ? new_values.substring(0, 30) + '...' : new_values
                Render.StringCustom(menu.position[0] + MENU_SIDEBAR[0] + MENU_MAIN_INDENT + DROPDOWN_VALUE_TEXT_INDENT, menu.position[1] + MENU_MAIN_INDENT + SCRIPT_NAME_TEXT_SECOND_SIZE[1] + TAB_NAME_TEXT[1] + MENU_MAIN_INDENT + PER_ITEMS_OFFSET + DROPDOWN_TEXT_INDENT + DROPDOWN_SIZE[1] / 2 - DROPDOWN_VALUE_SIZE[1] / 2 - 2, 0, new_values, VALUE_COLOR, ITEM_NAME)

                if (DROPDOWN_ALPHA > 0) {

                    for (p in item.options) {
 
                        var IS_SELECTED = p == item.value

                        if (input_system.is_key_pressed(0x01) && ITEM_INTERACTION_PERMISSION) {

                            if (aux.in_bounds([menu.position[0] + MENU_SIDEBAR[0] + MENU_MAIN_INDENT, menu.position[1] + MENU_MAIN_INDENT + SCRIPT_NAME_TEXT_SECOND_SIZE[1] + TAB_NAME_TEXT[1] + MENU_MAIN_INDENT + PER_ITEMS_OFFSET + DROPDOWN_TEXT_INDENT + DROPDOWN_SIZE[1] + OPTIONS_OFFSET], DROPDOWN_SIZE, CURSOR_POSITION)) {
                                item.value[p] = !item.value[p]
                            }
                        }
                            
                        OPTIONS_OFFSET = OPTIONS_OFFSET + DROPDOWN_SIZE[1]
                    }
                    
                    if (input_system.is_key_pressed(0x01) && ITEM_INTERACTION_PERMISSION) {
                        
                        if (!aux.in_bounds([menu.position[0] + MENU_SIDEBAR[0] + MENU_MAIN_INDENT, menu.position[1] + MENU_MAIN_INDENT + SCRIPT_NAME_TEXT_SECOND_SIZE[1] + TAB_NAME_TEXT[1] + MENU_MAIN_INDENT + PER_ITEMS_OFFSET + DROPDOWN_TEXT_INDENT], [DROPDOWN_SIZE[0], DROPDOWN_SIZE[1] * (item.options.length + 1)], CURSOR_POSITION)) {
                            item.visible = false
                        }
                    }

                    DROPDOWNS.push({
                        position : [menu.position[0] + MENU_SIDEBAR[0] + MENU_MAIN_INDENT, menu.position[1] + MENU_MAIN_INDENT + SCRIPT_NAME_TEXT_SECOND_SIZE[1] + TAB_NAME_TEXT[1] + MENU_MAIN_INDENT + PER_ITEMS_OFFSET + DROPDOWN_TEXT_INDENT + DROPDOWN_SIZE[1]],
                        item : item,
                        RECT_COLOR : RECT_COLOR,
                        RECT_OUTLINE : RECT_OUTLINE,
                        ITEM_ALPHA : ITEM_ALPHA,
                        DROPDOWN_ALPHA : DROPDOWN_ALPHA
                    })                    
                }

                PER_ITEMS_OFFSET = PER_ITEMS_OFFSET + DROPDOWN_INDENT * ITEM_VISIBILITY_ALPHA
            }
            else if (item.type == 'colorpicker') {
                
                var RECT_COLOR = visuals.new_animation(i + j + ' COLORPICKER RECT COLOR', aux.override_alpha(item.value, ITEM_ALPHA))
                var TEXT_COLOR = visuals.new_animation(i + j + ' COLORPICKER TEXT COLOR', aux.override_alpha(menu.colors.ITEM_ENABLED, ITEM_ALPHA))
                var RECT_OUTLINE = visuals.new_animation(i + j + ' COLORPICKER RECT OUTLINE', aux.override_alpha(menu.colors.COLORPICKER_OUTLINE, ITEM_ALPHA))
                var PICKER_COLOR = visuals.new_animation(i + j + ' COLORPICKER PICKER', aux.override_alpha(menu.colors.COLORPICKER_PICKER, ITEM_ALPHA))

                Render.FilledRect(menu.position[0] + MENU_SIDEBAR[0] + MENU_MAIN_INDENT, menu.position[1] + MENU_MAIN_INDENT + SCRIPT_NAME_TEXT_SECOND_SIZE[1] + TAB_NAME_TEXT[1] + MENU_MAIN_INDENT + PER_ITEMS_OFFSET, COLORPICKER_SIZE[0], COLORPICKER_SIZE[1], RECT_COLOR)
                Render.Rect(menu.position[0] + MENU_SIDEBAR[0] + MENU_MAIN_INDENT, menu.position[1] + MENU_MAIN_INDENT + SCRIPT_NAME_TEXT_SECOND_SIZE[1] + TAB_NAME_TEXT[1] + MENU_MAIN_INDENT + PER_ITEMS_OFFSET, COLORPICKER_SIZE[0], COLORPICKER_SIZE[1], RECT_OUTLINE)
                
                var COLORPICKER_NAME_SIZE = Render.TextSizeCustom(item.name, ITEM_NAME)
                Render.StringCustom(menu.position[0] + MENU_SIDEBAR[0] + MENU_MAIN_INDENT + COLORPICKER_SIZE[0] + COLORPICKER_NAME_INDENT, menu.position[1] + MENU_MAIN_INDENT + SCRIPT_NAME_TEXT_SECOND_SIZE[1] + TAB_NAME_TEXT[1] + MENU_MAIN_INDENT + PER_ITEMS_OFFSET, 0, item.name, TEXT_COLOR, ITEM_NAME)

                if (input_system.is_key_pressed(0x01) && ITEM_INTERACTION_PERMISSION && !is_something_open()) {
                    if (aux.in_bounds([menu.position[0] + MENU_SIDEBAR[0] + MENU_MAIN_INDENT, menu.position[1] + MENU_MAIN_INDENT + SCRIPT_NAME_TEXT_SECOND_SIZE[1] + TAB_NAME_TEXT[1] + MENU_MAIN_INDENT + PER_ITEMS_OFFSET], [COLORPICKER_NAME_SIZE[0] + COLORPICKER_NAME_INDENT + COLORPICKER_SIZE[0], COLORPICKER_SIZE[1]], CURSOR_POSITION)) {
                        item.visible = true
                    }
                }

                if (!ITEM_INTERACTION_PERMISSION) {
                    item.visible = false
                }

                var COLORPICKER_ALPHA = visuals.new_animation(i + j + ' COLORPICKER ALPHA', item.visible ? 1 : 0)

                if (COLORPICKER_ALPHA > 0) {

                    var COLORPICKER_TABLE = {
                        position : [menu.position[0] + MENU_SIDEBAR[0] + MENU_MAIN_INDENT, menu.position[1] + MENU_MAIN_INDENT + SCRIPT_NAME_TEXT_SECOND_SIZE[1] + TAB_NAME_TEXT[1] + MENU_MAIN_INDENT + PER_ITEMS_OFFSET + COLORPICKER_SIZE[1]],
                        item : item,
                        PICKER_COLOR : PICKER_COLOR,
                        RECT_COLOR : RECT_COLOR,
                        RECT_OUTLINE : RECT_OUTLINE,
                        ITEM_ALPHA : ITEM_ALPHA,
                        COLORPICKER_ALPHA : COLORPICKER_ALPHA
                    }

                    if (input_system.is_key_pressed(0x01) && ITEM_INTERACTION_PERMISSION) {
                        
                        if (!(aux.in_bounds(COLORPICKER_TABLE.position, COLORPICKER_PICKER_SIZE, CURSOR_POSITION) || aux.in_bounds([menu.position[0] + MENU_SIDEBAR[0] + MENU_MAIN_INDENT, menu.position[1] + MENU_MAIN_INDENT + SCRIPT_NAME_TEXT_SECOND_SIZE[1] + TAB_NAME_TEXT[1] + MENU_MAIN_INDENT + PER_ITEMS_OFFSET], [COLORPICKER_NAME_SIZE[0] + COLORPICKER_NAME_INDENT + COLORPICKER_SIZE[0], COLORPICKER_SIZE[1]], CURSOR_POSITION))) {
                            item.visible = false
                        }
                    }

                    if (Input.IsKeyPressed(0x01) && ITEM_INTERACTION_PERMISSION) {
                        //Render.GradientRect(COLORPICKER.position[0] + MENU_MAIN_INDENT * 2 + COLORPICKER_PICKER_COLOR_SIZE[0], COLORPICKER.position[1] + MENU_MAIN_INDENT + i * COLORPICKER_PICKER_HUE_SIZE[1] / 6, COLORPICKER_PICKER_HUE_SIZE[0], COLORPICKER_PICKER_HUE_SIZE[1] / 6, 0, colors[i], colors[i + 1])
                        
                        if (aux.in_bounds([COLORPICKER_TABLE.position[0] + MENU_MAIN_INDENT * 2 + COLORPICKER_PICKER_COLOR_SIZE[0], COLORPICKER_TABLE.position[1] + MENU_MAIN_INDENT], COLORPICKER_PICKER_HUE_SIZE, HELD_CURSOR_POSITION)) {
                            
                            var hue = (Math.clamp(CURSOR_POSITION[1], COLORPICKER_TABLE.position[1] + MENU_MAIN_INDENT, COLORPICKER_TABLE.position[1] + MENU_MAIN_INDENT + COLORPICKER_PICKER_HUE_SIZE[1]) - (COLORPICKER_TABLE.position[1] + MENU_MAIN_INDENT)) / COLORPICKER_PICKER_HUE_SIZE[1]

                            item.hsv.h = Math.round(Math.lerp(hue, 0, 359))
                        }

                        if (aux.in_bounds([COLORPICKER_TABLE.position[0] + MENU_MAIN_INDENT, COLORPICKER_TABLE.position[1] + MENU_MAIN_INDENT], COLORPICKER_PICKER_COLOR_SIZE, HELD_CURSOR_POSITION)) {

                            var saturation = (Math.clamp(CURSOR_POSITION[0], COLORPICKER_TABLE.position[0] + MENU_MAIN_INDENT, COLORPICKER_TABLE.position[0] + MENU_MAIN_INDENT + COLORPICKER_PICKER_COLOR_SIZE[0]) - (COLORPICKER_TABLE.position[0] + MENU_MAIN_INDENT)) / COLORPICKER_PICKER_COLOR_SIZE[0]
                        
                            item.hsv.s = Math.round(Math.lerp(saturation, 0, 100))

                            var value = (Math.clamp(CURSOR_POSITION[1], COLORPICKER_TABLE.position[1] + MENU_MAIN_INDENT, COLORPICKER_TABLE.position[1] + MENU_MAIN_INDENT + COLORPICKER_PICKER_COLOR_SIZE[1]) - (COLORPICKER_TABLE.position[1] + MENU_MAIN_INDENT)) / COLORPICKER_PICKER_COLOR_SIZE[1]
                        
                            item.hsv.v = Math.round(Math.lerp(value, 0, 100))
                        }
                        
                        if (aux.in_bounds([COLORPICKER_TABLE.position[0] + MENU_MAIN_INDENT * 3 + COLORPICKER_PICKER_COLOR_SIZE[0] + COLORPICKER_PICKER_ALPHA_SIZE[0], COLORPICKER_TABLE.position[1] + MENU_MAIN_INDENT], COLORPICKER_PICKER_ALPHA_SIZE, HELD_CURSOR_POSITION)) {
                            
                            var c_alpha = (Math.clamp(CURSOR_POSITION[1], COLORPICKER_TABLE.position[1] + MENU_MAIN_INDENT, COLORPICKER_TABLE.position[1] + MENU_MAIN_INDENT + COLORPICKER_PICKER_ALPHA_SIZE[1]) - (COLORPICKER_TABLE.position[1] + MENU_MAIN_INDENT)) / COLORPICKER_PICKER_ALPHA_SIZE[1]

                            item.hsv.a = Math.round(Math.lerp(c_alpha, 0, 255))
                        }

                        item.value = aux.HSV_to_RGB(item.hsv.h, item.hsv.s, 100 - item.hsv.v, 255 - item.hsv.a)
                    }

                    COLORPICKERS.push(COLORPICKER_TABLE)     
                }

                PER_ITEMS_OFFSET = PER_ITEMS_OFFSET + COLORPICKER_INDENT * ITEM_VISIBILITY_ALPHA
            }
            else if (item.type == 'button') {

                var RECT_COLOR = visuals.new_animation(i + j + ' BUTTON RECT COLOR', aux.override_alpha(menu.colors.BUTTON_RECT, ITEM_ALPHA))
                var RECT_OUTLINE = visuals.new_animation(i + j + ' BUTTON RECT OUTLINE', aux.override_alpha(menu.colors.BUTTON_OUTLINE, ITEM_ALPHA))
                var TEXT_COLOR = visuals.new_animation(i + j + ' BUTTON TEXT COLOR', aux.override_alpha(menu.colors.ITEM_ENABLED, ITEM_ALPHA))

                Render.FilledRect(menu.position[0] + MENU_SIDEBAR[0] + MENU_MAIN_INDENT, menu.position[1] + MENU_MAIN_INDENT + SCRIPT_NAME_TEXT_SECOND_SIZE[1] + TAB_NAME_TEXT[1] + MENU_MAIN_INDENT + PER_ITEMS_OFFSET, BUTTON_SIZE[0], BUTTON_SIZE[1], RECT_COLOR)
                Render.Rect(menu.position[0] + MENU_SIDEBAR[0] + MENU_MAIN_INDENT, menu.position[1] + MENU_MAIN_INDENT + SCRIPT_NAME_TEXT_SECOND_SIZE[1] + TAB_NAME_TEXT[1] + MENU_MAIN_INDENT + PER_ITEMS_OFFSET, BUTTON_SIZE[0], BUTTON_SIZE[1], RECT_OUTLINE)

                var NAME_SIZE = Render.TextSizeCustom(item.name, ITEM_NAME)
                Render.StringCustom(menu.position[0] + MENU_SIDEBAR[0] + MENU_MAIN_INDENT + BUTTON_NAME_INDENT, menu.position[1] + MENU_MAIN_INDENT + SCRIPT_NAME_TEXT_SECOND_SIZE[1] + TAB_NAME_TEXT[1] + MENU_MAIN_INDENT + PER_ITEMS_OFFSET + BUTTON_SIZE[1] / 2 - NAME_SIZE[1] / 2 - 2, 0, item.name, TEXT_COLOR, ITEM_NAME)


                PER_ITEMS_OFFSET = PER_ITEMS_OFFSET + BUTTON_INDENT * ITEM_VISIBILITY_ALPHA
            }

            menu.tab_size[i] = MENU_MAIN_INDENT + SCRIPT_NAME_TEXT_SECOND_SIZE[1] + TAB_NAME_TEXT[1] + MENU_MAIN_INDENT + PER_ITEMS_OFFSET + MENU_MAIN_INDENT / 2
        }

        PER_TABS_OFFSET = PER_TABS_OFFSET + TAB_INDENT + TAB_SIZE[1]
        menu.tab_offset = PER_TABS_OFFSET
    }

    for (DROPDOWN_ID in DROPDOWNS) {

        var DROPDOWN = DROPDOWNS[DROPDOWN_ID]

        var OPTIONS_OFFSET = 0

        for (i in DROPDOWN.item.options) {

            if (typeof(DROPDOWN.item.value) == 'object') {

                Render.FilledRect(DROPDOWN.position[0], DROPDOWN.position[1] + OPTIONS_OFFSET, DROPDOWN_SIZE[0], DROPDOWN_SIZE[1], aux.multiply_alpha(DROPDOWN.RECT_COLOR, DROPDOWN.DROPDOWN_ALPHA * DROPDOWN.ITEM_ALPHA))

                var OPTION_NAME_SIZE = Render.TextSizeCustom(DROPDOWN.item.options[i], ITEM_NAME)
                var OPTION_NAME_COLOR = aux.override_alpha(DROPDOWN.item.value[i] ? menu.colors.ITEM_ENABLED : menu.colors.ITEM_NAME, DROPDOWN.ITEM_ALPHA)
                Render.StringCustom(DROPDOWN.position[0] + DROPDOWN_VALUE_TEXT_INDENT, DROPDOWN.position[1] + DROPDOWN_SIZE[1] / 2 - OPTION_NAME_SIZE[1] / 2 - 2 + OPTIONS_OFFSET, 0, DROPDOWN.item.options[i], aux.multiply_alpha(OPTION_NAME_COLOR, DROPDOWN.DROPDOWN_ALPHA * DROPDOWN.ITEM_ALPHA), ITEM_NAME)
            }
            else {

                Render.FilledRect(DROPDOWN.position[0], DROPDOWN.position[1] + OPTIONS_OFFSET, DROPDOWN_SIZE[0], DROPDOWN_SIZE[1], aux.multiply_alpha(DROPDOWN.RECT_COLOR, DROPDOWN.DROPDOWN_ALPHA * DROPDOWN.ITEM_ALPHA))

                var OPTION_NAME_SIZE = Render.TextSizeCustom(DROPDOWN.item.options[i], ITEM_NAME)
                var OPTION_NAME_COLOR = aux.override_alpha(i == DROPDOWN.item.value ? menu.colors.ITEM_ENABLED : menu.colors.ITEM_NAME, DROPDOWN.ITEM_ALPHA)
                Render.StringCustom(DROPDOWN.position[0] + DROPDOWN_VALUE_TEXT_INDENT, DROPDOWN.position[1] + DROPDOWN_SIZE[1] / 2 - OPTION_NAME_SIZE[1] / 2 - 2 + OPTIONS_OFFSET, 0, DROPDOWN.item.options[i], aux.multiply_alpha(OPTION_NAME_COLOR, DROPDOWN.DROPDOWN_ALPHA * DROPDOWN.ITEM_ALPHA), ITEM_NAME)
            }
            
            
            OPTIONS_OFFSET = OPTIONS_OFFSET + DROPDOWN_SIZE[1]
        }

        Render.Rect(DROPDOWN.position[0], DROPDOWN.position[1] - DROPDOWN_SIZE[1], DROPDOWN_SIZE[0], DROPDOWN_SIZE[1] * (DROPDOWN.item.options.length + 1), aux.multiply_alpha(DROPDOWN.RECT_OUTLINE, DROPDOWN.DROPDOWN_ALPHA * DROPDOWN.ITEM_ALPHA), ITEM_NAME) //вот это пиздец окнечно получается :pizdec: :authordolbaeb:
    }

    for (COLORPICKER_ID in COLORPICKERS) {

        var COLORPICKER = COLORPICKERS[COLORPICKER_ID]
        
        Render.FilledRect(COLORPICKER.position[0], COLORPICKER.position[1], COLORPICKER_PICKER_SIZE[0], COLORPICKER_PICKER_SIZE[1], aux.multiply_alpha(COLORPICKER.PICKER_COLOR, COLORPICKER.COLORPICKER_ALPHA * COLORPICKER.ITEM_ALPHA))
        Render.Rect(COLORPICKER.position[0], COLORPICKER.position[1], COLORPICKER_PICKER_SIZE[0], COLORPICKER_PICKER_SIZE[1], aux.multiply_alpha(COLORPICKER.RECT_OUTLINE, COLORPICKER.COLORPICKER_ALPHA * COLORPICKER.ITEM_ALPHA))

        Render.Gradient(COLORPICKER.position[0] + MENU_MAIN_INDENT, (COLORPICKER.position[1] + MENU_MAIN_INDENT), COLORPICKER_PICKER_COLOR_SIZE[0], COLORPICKER_PICKER_COLOR_SIZE[1], [255, 255, 255, COLORPICKER.COLORPICKER_ALPHA * COLORPICKER.ITEM_ALPHA * 255], aux.HSV_to_RGB(COLORPICKER.item.hsv.h, 100, 100, COLORPICKER.COLORPICKER_ALPHA * COLORPICKER.ITEM_ALPHA * 255), [0, 0, 0, COLORPICKER.COLORPICKER_ALPHA * COLORPICKER.ITEM_ALPHA * 255], [0, 0, 0, COLORPICKER.COLORPICKER_ALPHA * COLORPICKER.ITEM_ALPHA * 255])
        Render.GradientRect(COLORPICKER.position[0] + MENU_MAIN_INDENT * 3 + COLORPICKER_PICKER_COLOR_SIZE[0] + COLORPICKER_PICKER_HUE_SIZE[0], COLORPICKER.position[1] + MENU_MAIN_INDENT, COLORPICKER_PICKER_ALPHA_SIZE[0], COLORPICKER_PICKER_ALPHA_SIZE[1], 0, [255, 255, 255, COLORPICKER.COLORPICKER_ALPHA * COLORPICKER.ITEM_ALPHA * 255], [0, 0, 0, COLORPICKER.COLORPICKER_ALPHA * COLORPICKER.ITEM_ALPHA * 255])
        
        var colors = [
            [255, 0, 0, COLORPICKER.COLORPICKER_ALPHA * COLORPICKER.ITEM_ALPHA * 255],
            [255, 255, 0, COLORPICKER.COLORPICKER_ALPHA * COLORPICKER.ITEM_ALPHA * 255],
            [0, 255, 0, COLORPICKER.COLORPICKER_ALPHA * COLORPICKER.ITEM_ALPHA * 255],
            [0, 255, 255, COLORPICKER.COLORPICKER_ALPHA * COLORPICKER.ITEM_ALPHA * 255],
            [0, 0, 255, COLORPICKER.COLORPICKER_ALPHA * COLORPICKER.ITEM_ALPHA * 255],
            [255, 0, 255, COLORPICKER.COLORPICKER_ALPHA * COLORPICKER.ITEM_ALPHA * 255],
            [255, 0, 0, COLORPICKER.COLORPICKER_ALPHA * COLORPICKER.ITEM_ALPHA * 255]
        ]

        for (i = 0; i < colors.length - 1; i++) {
            Render.GradientRect(COLORPICKER.position[0] + MENU_MAIN_INDENT * 2 + COLORPICKER_PICKER_COLOR_SIZE[0], COLORPICKER.position[1] + MENU_MAIN_INDENT + i * COLORPICKER_PICKER_HUE_SIZE[1] / 6, COLORPICKER_PICKER_HUE_SIZE[0], COLORPICKER_PICKER_HUE_SIZE[1] / 6, 0, colors[i], colors[i + 1])
        }
        Render.Rect(COLORPICKER.position[0] + MENU_MAIN_INDENT, (COLORPICKER.position[1] + MENU_MAIN_INDENT), COLORPICKER_PICKER_COLOR_SIZE[0], COLORPICKER_PICKER_COLOR_SIZE[1], aux.multiply_alpha(COLORPICKER.RECT_OUTLINE, COLORPICKER.COLORPICKER_ALPHA * COLORPICKER.ITEM_ALPHA))
        Render.Rect(COLORPICKER.position[0] + MENU_MAIN_INDENT * 3 + COLORPICKER_PICKER_COLOR_SIZE[0] + COLORPICKER_PICKER_HUE_SIZE[0], COLORPICKER.position[1] + MENU_MAIN_INDENT, COLORPICKER_PICKER_ALPHA_SIZE[0], COLORPICKER_PICKER_ALPHA_SIZE[1], aux.multiply_alpha(COLORPICKER.RECT_OUTLINE, COLORPICKER.COLORPICKER_ALPHA * COLORPICKER.ITEM_ALPHA))
        Render.Rect(COLORPICKER.position[0] + MENU_MAIN_INDENT * 2 + COLORPICKER_PICKER_COLOR_SIZE[0], COLORPICKER.position[1] + MENU_MAIN_INDENT, COLORPICKER_PICKER_HUE_SIZE[0], COLORPICKER_PICKER_HUE_SIZE[1], aux.multiply_alpha(COLORPICKER.RECT_OUTLINE, COLORPICKER.COLORPICKER_ALPHA * COLORPICKER.ITEM_ALPHA))
        
        Render.FilledCircle(COLORPICKER.position[0] + MENU_MAIN_INDENT + COLORPICKER_PICKER_COLOR_SIZE[0] * COLORPICKER.item.hsv.s / 100, COLORPICKER.position[1] + MENU_MAIN_INDENT + COLORPICKER_PICKER_COLOR_SIZE[1] * COLORPICKER.item.hsv.v / 100, COLORPICKER_CROSSHAIR_SIZE - 1, aux.override_alpha(COLORPICKER.item.value, COLORPICKER.COLORPICKER_ALPHA * COLORPICKER.ITEM_ALPHA))
        Render.Circle(COLORPICKER.position[0] + MENU_MAIN_INDENT + COLORPICKER_PICKER_COLOR_SIZE[0] * COLORPICKER.item.hsv.s / 100, COLORPICKER.position[1] + MENU_MAIN_INDENT + COLORPICKER_PICKER_COLOR_SIZE[1] * COLORPICKER.item.hsv.v / 100, COLORPICKER_CROSSHAIR_SIZE, [255, 255, 255, COLORPICKER.COLORPICKER_ALPHA * COLORPICKER.ITEM_ALPHA * 255])
        Render.Circle(COLORPICKER.position[0] + MENU_MAIN_INDENT + COLORPICKER_PICKER_COLOR_SIZE[0] * COLORPICKER.item.hsv.s / 100, COLORPICKER.position[1] + MENU_MAIN_INDENT + COLORPICKER_PICKER_COLOR_SIZE[1] * COLORPICKER.item.hsv.v / 100, COLORPICKER_CROSSHAIR_SIZE + 1, [0, 0, 0, COLORPICKER.COLORPICKER_ALPHA * COLORPICKER.ITEM_ALPHA * 255])
        
        Render.FilledCircle(COLORPICKER.position[0] + MENU_MAIN_INDENT * 2 + COLORPICKER_PICKER_COLOR_SIZE[0] + COLORPICKER_PICKER_HUE_SIZE[0] / 2, COLORPICKER.position[1] + MENU_MAIN_INDENT + COLORPICKER_PICKER_HUE_SIZE[1] * COLORPICKER.item.hsv.h / 360, COLORPICKER_CROSSHAIR_SIZE, [255, 255, 255, COLORPICKER.COLORPICKER_ALPHA * COLORPICKER.ITEM_ALPHA * 255])
        Render.Circle(COLORPICKER.position[0] + MENU_MAIN_INDENT * 2 + COLORPICKER_PICKER_COLOR_SIZE[0] + COLORPICKER_PICKER_HUE_SIZE[0] / 2, COLORPICKER.position[1] + MENU_MAIN_INDENT + COLORPICKER_PICKER_HUE_SIZE[1] * COLORPICKER.item.hsv.h / 360, COLORPICKER_CROSSHAIR_SIZE + 1, [0, 0, 0, COLORPICKER.COLORPICKER_ALPHA * COLORPICKER.ITEM_ALPHA * 255])
        
        Render.FilledCircle(COLORPICKER.position[0] + MENU_MAIN_INDENT * 3 + COLORPICKER_PICKER_COLOR_SIZE[0] + COLORPICKER_PICKER_HUE_SIZE[0] + COLORPICKER_PICKER_ALPHA_SIZE[0] / 2, COLORPICKER.position[1] + MENU_MAIN_INDENT + COLORPICKER_PICKER_ALPHA_SIZE[1] * COLORPICKER.item.hsv.a / 255, COLORPICKER_CROSSHAIR_SIZE - 1, [255 - COLORPICKER.item.hsv.a, 255 - COLORPICKER.item.hsv.a, 255 - COLORPICKER.item.hsv.a, COLORPICKER.COLORPICKER_ALPHA * COLORPICKER.ITEM_ALPHA * 255])
        Render.Circle(COLORPICKER.position[0] + MENU_MAIN_INDENT * 3 + COLORPICKER_PICKER_COLOR_SIZE[0] + COLORPICKER_PICKER_HUE_SIZE[0] + COLORPICKER_PICKER_ALPHA_SIZE[0] / 2, COLORPICKER.position[1] + MENU_MAIN_INDENT + COLORPICKER_PICKER_ALPHA_SIZE[1] * COLORPICKER.item.hsv.a / 255, COLORPICKER_CROSSHAIR_SIZE, [255, 255, 255, COLORPICKER.COLORPICKER_ALPHA * COLORPICKER.ITEM_ALPHA * 255])
        Render.Circle(COLORPICKER.position[0] + MENU_MAIN_INDENT * 3 + COLORPICKER_PICKER_COLOR_SIZE[0] + COLORPICKER_PICKER_HUE_SIZE[0] + COLORPICKER_PICKER_ALPHA_SIZE[0] / 2, COLORPICKER.position[1] + MENU_MAIN_INDENT + COLORPICKER_PICKER_ALPHA_SIZE[1] * COLORPICKER.item.hsv.a / 255, COLORPICKER_CROSSHAIR_SIZE + 1, [0, 0, 0, COLORPICKER.COLORPICKER_ALPHA * COLORPICKER.ITEM_ALPHA * 255])
    }
}

menu.add_tab = function(name, short_name) {
    menu.items.push({
        name : name,
        short_name : short_name,
        items : []
    })
}

menu.add_checkbox = function(tab, name, def, visibility_condition) {
    if (visibility_condition == undefined) {
        visibility_condition = function() {
            return true
        }
    }

    for (i in menu.items) {
        var current_tab = menu.items[i]

        if (current_tab.name == tab) {
            current_tab.items.push({
                type : 'checkbox',
                tab : i,
                name : name,
                value : def,
                visibility_condition : visibility_condition
            })
        }
    }
}

menu.add_slider = function(tab, name, min, max, def, visibility_condition) {
    if (visibility_condition == undefined) {
        visibility_condition = function() {
            return true
        }
    }

    for (i in menu.items) {
        var current_tab = menu.items[i]

        if (current_tab.name == tab) {
            
            current_tab.items.push({
                type : 'slider',
                tab : i,
                name : name,
                value : def,
                min : min,
                max : max,
                visibility_condition : visibility_condition
            })
        }
    }
}

menu.add_dropdown = function(tab, name, options, def, visibility_condition) {
    if (visibility_condition == undefined) {
        visibility_condition = function() {
            return true
        }
    }

    for (i in menu.items) {
        var current_tab = menu.items[i]

        if (current_tab.name == tab) {
            current_tab.items.push({
                type : 'dropdown',
                tab : i,
                name : name,
                value : def,
                options : options,
                visibility_condition : visibility_condition,
                visible : false
            })
        }
    }
}

menu.add_multidropdown = function(tab, name, options, def, visibility_condition) {
    if (visibility_condition == undefined) {
        visibility_condition = function() {
            return true
        }
    }

    for (i in menu.items) {
        var current_tab = menu.items[i]

        if (current_tab.name == tab) {
            current_tab.items.push({
                type : 'multidropdown',
                tab : i,
                name : name,
                value : def,
                options : options,
                visibility_condition : visibility_condition,
                visible : false
            })
        }
    }
}

menu.add_colorpicker = function(tab, name, def, visibility_condition) {
    if (visibility_condition == undefined) {
        visibility_condition = function() {
            return true
        }
    }

    for (i in menu.items) {
        var current_tab = menu.items[i]

        if (current_tab.name == tab) {
            current_tab.items.push({
                type : 'colorpicker',
                tab : i,
                name : name,
                value : def,
                hsv : aux.RGB_to_HSV(def[0], def[1], def[2], 255 - def[3]),
                visibility_condition : visibility_condition,
                visible : false
            })
        }
    }
}

menu.add_button = function(tab, name, func, visibility_condition) {
    if (visibility_condition == undefined) {
        visibility_condition = function() {
            return true
        }
    }

    if (func == undefined) func = function() {}

    for (i in menu.items) {
        var current_tab = menu.items[i]

        if (current_tab.name == tab) {
            current_tab.items.push({
                type : 'button',
                tab : i,
                name : name,
                func : func,
                visibility_condition : visibility_condition
            })
        }
    }
}

menu.get_value = function(tab, name) {
    for (i in menu.items) {
        var current_tab = menu.items[i]

        if (current_tab.name == tab) {
            for (j in current_tab.items) {
                var current_item = current_tab.items[j]

                if (current_item.name == name) {
                    return current_item.value
                }
            }
        }
    }
}

menu.get = function(tab, name) {
    for (i in menu.items) {

        var current_tab = menu.items[i]

        if (current_tab.name == tab) {
            for (j in current_tab.items) {
                var current_item = current_tab.items[j]

                if (current_item.name == name) return current_item
            }
        }
    }
}

menu.add_tab('ragebot', 'r')
menu.add_checkbox('ragebot', 'Enable', false)
menu.add_colorpicker('ragebot', 'Colorpicker 1', [255, 255, 200, 255], function() {
    return menu.get_value('ragebot', 'Enable')
})
menu.add_slider('ragebot', 'Slider', -5442, 5284, 0)
menu.add_checkbox('ragebot', 'Enabled', false)
menu.add_multidropdown('ragebot', 'Dropdown', ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 5', 'Value 6'], [false, false, false, true, false, true])
menu.add_checkbox('ragebot', 'Test', false)
menu.add_colorpicker('ragebot', 'Colorpicker 2', [255, 0, 150, 255])
menu.add_button('ragebot', 'Button')

menu.add_tab('Anti Aim', 'aa')

menu.add_checkbox('Anti Aim', 'Enable', false)
menu.add_colorpicker('Anti Aim', 'Colorpicker 1', [255, 255, 200, 255])
menu.add_slider('Anti Aim', 'Slider', -5442, 5284, 0)
menu.add_checkbox('Anti Aim', 'Enabled', false)
menu.add_dropdown('Anti Aim', 'Dropdown', ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 5', 'Value 6'], 0)
menu.add_checkbox('Anti Aim', 'Test', false)
menu.add_colorpicker('Anti Aim', 'Colorpicker 2', [255, 0, 150, 255])

menu.add_tab('settings', 's')
menu.add_dropdown('settings', 'theme', ['Midnight', 'Default'], 0)

visuals.start_render = function() {
    var theme = ['Midnight', 'Default']
    menu.colors.current_theme = theme[menu.get_value('settings', 'theme')]

    if (!World.GetMapName()) {
        visuals.is_rendering = false
        return
    }

    var me = Entity.GetLocalPlayer()

    if (!me) {
        visuals.is_rendering = false
        return
    }

    if (!Entity.IsAlive(me)) {
        visuals.is_rendering = false
        return
    }

    visuals.is_rendering = true
}

visuals.end_render = function() {
    visuals.update_animations()
    visuals.is_rendering = false
}

Cheat.RegisterCallback('Draw', 'visuals.start_render')
Cheat.RegisterCallback('Draw', 'menu.begin')
Cheat.RegisterCallback('Draw', 'visuals.end_render')
Cheat.RegisterCallback('Draw', 'input_system.update')