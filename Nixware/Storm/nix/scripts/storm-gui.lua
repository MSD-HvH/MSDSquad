---@diagnostic disable: lowercase-global, unbalanced-assignments, deprecated, need-check-nil


-- для тебя, linius:

--⠀⠀⠀⠀⠀⠀⠀⣠⣤⣤⣤⣤⣤⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
--⠀⠀⠀⠀⠀⢰⡿⠋⠁⠀⠀⠈⠉⠙⠻⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
--⠀⠀⠀⠀⢀⣿⠇⠀⢀⣴⣶⡾⠿⠿⠿⢿⣿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
--⠀⠀⣀⣀⣸⡿⠀⠀⢸⣿⣇⠀⠀⠀⠀⠀⠀⠙⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
--⠀⣾⡟⠛⣿⡇⠀⠀⢸⣿⣿⣷⣤⣤⣤⣤⣶⣶⣿⠇⠀⠀⠀⠀⠀⠀⠀⣀⠀⠀
--⢀⣿⠀⢀⣿⡇⠀⠀⠀⠻⢿⣿⣿⣿⣿⣿⠿⣿⡏⠀⠀⠀⠀⢴⣶⣶⣿⣿⣿⣆
--⢸⣿⠀⢸⣿⡇⠀⠀⠀⠀⠀⠈⠉⠁⠀⠀⠀⣿⡇⣀⣠⣴⣾⣮⣝⠿⠿⠿⣻⡟
--⢸⣿⠀⠘⣿⡇⠀⠀⠀⠀⠀⠀⠀⣠⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠁⠉⠀
--⠸⣿⠀⠀⣿⡇⠀⠀⠀⠀⠀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠉⠀⠀⠀⠀
--⠀⠻⣷⣶⣿⣇⠀⠀⠀⢠⣼⣿⣿⣿⣿⣿⣿⣿⣛⣛⣻⠉⠁⠀⠀⠀⠀⠀⠀⠀
--⠀⠀⠀⠀⢸⣿⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀
--⠀⠀⠀⠀⢸⣿⣀⣀⣀⣼⡿⢿⣿⣿⣿⣿⣿⡿⣿⣿⣿

-- с любовью команда storm.lua


require("storm-api")
nix_path = _G.debug["getinfo"](1, "S")["source"]:match("(.+)/scripts/"):sub(2)
math.randomseed(os.time())
gui = {
    name = "storm",
    size = v(310, 170),
    pos = v(0, 0),
    fonts = {
        misc = render.font("C:/Windows/Fonts/verdana.ttf", 12, 144),
        main = render.font("C:/Windows/Fonts/verdana.ttf", 16, 0),
        small = render.font("C:/Windows/Fonts/verdana.ttf", 13, 0),
    },
    colors = {
        bg = col(14, 14, 14),
        border = col(7, 7, 5),
        tabs_bg = col(11, 11, 11),
        text = col(255, 255, 255),
        elements = col(220, 220, 220),
        storm = col(200, 220, 255),
    },
    drag = {
        dragging = false,
        old_cursor = renderer.get_cursor_pos(),
        block = false
    },
    anim = { main = 0 },
    selected_tab = 1,
    clicked = false,
    clicked_r = false,
    click_block = false,
    inter_el = false,
    inter = false,
    adding_options = false,
    clipboard = false,
    initialized = false,
    render_types = {},
    elements = {}
}
gui.keys = {
    'm1','m2',0,'m3','m4','m5',0,'bsp.','tab',0,0,0,'enter',0,0,'shift','ctrl','alt',
    'brk','caps',0,0,0,0,0,0,'esc',0,0,0,0,'space','pg up','pg dn','end',
    'home','<-','^','->','v',0,0,0,0,'ins','del',0,'0','1','2','3','4','5',
    '6','7','8','9',0,0,0,0,0,0,0,'a','b','c','d','e','f','g','h',
    'i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',0,0, 0,
    0,0,'n0','n1','n2','n3','n4','n5','n6','n7','n8','n9','n*','n+',0,'n-','n.','n/',
    'f1','f2','f3','f4','f5','f6','f7','f8','f9','f10','f11','f12'
}
gui.keys[161] = 'r.shift'
gui.keys[162] = 'ctrl'
gui.keys[163] = 'r.ctrl'
gui.keys[164] = 'alt'
gui.keys[165] = 'r.alt'
gui.keys[144] = 'n lock'
gui.keys[145] = 'sl'
gui.keys[192] = '`'
gui.keys[220] = '\\'
draggable.new = function (o, size, def_pos)
    local name = "storm_drag_" .. #draggable.list
    if size ~= nil then o.size = size end
    if def_pos == nil then o.pos = v(100 + draggable.widths, 100)
    elseif def_pos then o.pos = def_pos end
    o.drag = {
        elements = {
            x = ui.add_slider_int(name.."_x", name.."_x", -o.size.x / 2, ss.x + o.size.x / 2, o.pos.x),
            y = ui.add_slider_int(name.."_y", name.."_y", -o.size.y / 2, ss.y - o.size.y / 2, o.pos.y),
        },
        index = #draggable.list + 1,
        dragging = false,
        old_cursor = renderer.get_cursor_pos(),
        block = false,
        hover_anim = 0,
        set_pos = function(s, p)
            s.elements.x:set_value(p.x) s.elements.y:set_value(p.y) end,
        get_pos = function(s)
            return v(s.elements.x:get_value(), s.elements.y:get_value()) end,
        run = function (s, hover, offset_from, offset_to, size)
            offset_from = offset_from or v(0, 0)
            offset_to = offset_to or v(0, 0)
            o.pos = s:get_pos():clamp({-o.size.x / 2, -o.size.y / 2}, {ss.x + o.size.x / 2, ss.y - o.size.y / 2})
            local cursor = renderer.get_cursor_pos()
            local from, to = o.pos - offset_from, o.pos + o.size + offset_to
            local hovered
            if hover == nil then
                hovered = (cursor - from):each(function(a) return a>0 end) and (cursor - to):each(function(a) return a<0 end)
            else hovered = hover end
            local pressed = client.is_key_pressed(1)
            local visible = ui.is_visible()
            local another_is_dragging = false
            for i = 1, #draggable.list do
                local d = draggable.list[i]
                if d.dragging and d.index ~= s.index then
                    another_is_dragging = true break end
            end
            if pressed and not s.dragging and not hovered then
                s.block = true
            elseif (hovered or s.dragging) and pressed and visible and not s.block and not another_is_dragging then
                o.pos = (cursor - s.old_cursor + o.pos):clamp((-o.size / 2):table(), (ss - o.size / 2):table())
                s:set_pos(o.pos)
                s.dragging = true
            elseif not pressed or not visible then
                s.dragging = false
                s.block = false
            end
            if visible then s.old_cursor = renderer.get_cursor_pos() end
            s.hover_anim = render.anim(s.hover_anim, hovered and not pressed)
            return o.pos, o.size, function(size) return s:render_hint(offset_to, offset_from, size) end
        end,
        render_hint = function(s, offset_to, offset_from)
            if not ui.is_visible() then return end
            offset_from = offset_from or v(0, 0)
            offset_to = offset_to or v(0, 0)
            local from, to = o.pos - offset_from, o.pos + o.size + offset_to
            if ui.is_visible() then
                renderer.rect_filled(from, to, col('#B3B4DA'):alpha(s.hover_anim * 100))
            end
        end,
    }
    o.drag.elements.x:set_visible(false) o.drag.elements.y:set_visible(false)
    draggable.widths = draggable.widths + o.size.x + 4
    draggable.list[#draggable.list+1] = o.drag
    return o
end
gui = draggable.new(gui, nil, v(ss.x / 2 - gui.size.x / 2, ss.y / 2 + gui.size.y / 2))
function gui.animate()
    local is_animating = false
    for t = 1, #gui.elements do
        local tab = gui.elements[t]
        if tab.anim.main ~= 0 then
            is_animating = true end
    end
    local visible = ui.is_visible()
    gui.anim.main = render.anim(gui.anim.main, visible or (not visible and is_animating))
end
function gui.create_move(cmd)
    for t = 1, #gui.elements do
        local tab = gui.elements[t]
        for i = 1, #tab do
            gui.process_cm_callbacks(tab[i], cmd) end
    end
end
function gui.render()
    gui.animate()
    for t = 1, #gui.elements do
        local tab = gui.elements[t]
        for i = 1, #tab do
            gui.process_callbacks(tab[i]) end
    end
    if gui.anim.main == 0 then return end
    gui.drag:run()
    if not client.is_key_pressed(1) then gui.inter_el = false end
    local tab_list_width = 55
    local visible = ui.is_visible()
    local inter = not gui.inter_el
    for t = 1, #gui.elements do
        local tab = gui.elements[t]
        for c = 1, #tab do
            if gui.check_inter_elements(tab[c], true) then
                inter = false end end
    end
    local anim = gui.anim.main
    do local c = gui.colors.border:alp_self(anim)
        renderer.rect(gui.pos+ v(2, 2), gui.pos + gui.size - v(2, 2), c) --borders
        renderer.rect(gui.pos+ v(1, 1), gui.pos + gui.size - v(1, 1), c)
    end
    renderer.rect_filled(gui.pos + v(tab_list_width,3), gui.pos + gui.size - v(3,3), gui.colors.bg:alp_self(anim)) --bg
    renderer.rect_filled(gui.pos + v(3,3), gui.pos + v(tab_list_width, gui.size.y - 3), gui.colors.tabs_bg:alp_self(anim)) --tab list
    render.rect_smoothed(gui.pos, gui.pos + gui.size, col(0,0,0,0), gui.colors.border:alp_self(anim / 2.5)) --shadow
    local logo_texture = renderer.setup_texture("nix/storm/logo.png")
    render.texture(logo_texture, gui.pos - v(0, 2), gui.pos + v(60,60), col(255,255,255,anim*255))

    do --tabs
        local margin = gui.fonts.main[2] * 1.1
        local position = gui.pos + v(8, gui.size.y - #gui.elements * margin - 8)
        local y = 0
        for i = 1, #gui.elements do
            local tab = gui.elements[i]
            do
                local c = gui.colors.elements
                local anim = anim * tab.anim.main
                local p = position + v(-3, y + 10):func(math.floor)
                renderer.line(p + v(0, -8*anim), p + v(0, 6*anim), c:alp(anim))
                renderer.rect_filled_fade(p + v(0, -7*anim), p + v(tab_list_width - 6, 7*anim), c:alp(anim / 5), c:alp(0), c:alp(0), c:alp(anim / 5))
            end
            local text = render.text(tab.name, position + v(0,y), nil, gui.colors.text:alp(anim * (0.5 + tab.anim.text / 2)), true, {2, 3})
            text.hovered = text.hovered and inter
            local active = gui.selected_tab == i or text.hovered
            if text.hovered then
                if gui.clicked then gui.selected_tab = i end
                gui.drag.block = true
            end
            if gui.selected_tab == i then
                local is_animating = false
                for a = 1, #gui.elements do if gui.selected_tab ~= a then
                    t = gui.elements[a]
                    if t.anim.main ~= 0 then
                        is_animating = true
                        t.anim.main = render.anim(t.anim.main, false)
                    end
                end end
                if not is_animating then
                    tab.anim.main = render.anim(tab.anim.main, visible and anim == 1) end
            end
            tab.anim.text = render.anim(tab.anim.text, active)
            y = y + margin
        end
    end

    do --columns
        local pos = gui.pos + v(tab_list_width + 6,6)
        local extra = {}
        for t = 1, #gui.elements do
            local tab = gui.elements[t]
            if tab.anim.main ~= 0 then
                local x = 0
                local width = ((gui.size.x - tab_list_width - 10) / math.max(#tab, 2))
                for i = 1, #tab do
                    local column = tab[i]
                    local pos = pos + v(x, 0)
                    local c = gui.colors.text:alp(tab.anim.main * anim / 2) --поизон ты еблан
                    if column.name ~= "" then
                        local text = render.text(column.name, pos, gui.fonts.small, c)
                        pos = pos + v(0, text.size.y)
                        renderer.rect_filled_fade(pos, pos + v(width * 0.75, 1), c, c:alpha(0), c:alpha(0), c)
                    end

                    --elements
                    gui.render_elements(pos, column, tab, extra, false, inter, width)
                    x = width * i
                end
            end
        end
        for i = 1, #extra do
            local o = extra[i]
            if o[1]:render(unpack(o[2])).hovered then gui.drag.block = true end
        end
    end

    if client.is_key_pressed(1) or client.is_key_pressed(2) then
        if not gui.click_block and client.is_key_pressed(1) then
            gui.clicked, gui.click_block = true, true
        else gui.clicked = false end
        if not gui.click_block and client.is_key_pressed(2) then
            gui.clicked_r, gui.click_block = true, true
        else gui.clicked_r = false end
    else gui.click_block, gui.clicked = false, false end
end
function gui.process_callbacks(elements)
    for i = 1, #elements do
        local el = elements[i]
        if el.callbacks then
            for c = 1, #el.callbacks do
                el.callbacks[c]()
            end
        end
        if el.options then gui.process_callbacks(el.options.elements) end
    end
end
function gui.process_cm_callbacks(elements, cmd)
    for i = 1, #elements do
        local el = elements[i]
        if el.cm_callback then
            el.cm_callback(cmd, el) end
        if el.options then gui.process_cm_callbacks(el.options.elements, cmd) end
    end
end
function gui.render_elements(pos, elements, tab, extra, options, input, width)
    local y = 5
    local size = v(0, 0)
    for e = 1, #elements do
        local p = pos + v(0, y)
        local el = elements[e]
        local master = {}
        if el.mt then
            for i = 1, #el.mt do
                master[i] = true
                local mt = el.mt[i]
                if mt.i then
                    master[i] = false
                    if not mt.el.dropdown.multi then
                        local val = mt.el.val()
                        for i = 1, #mt.i do
                            if mt.i[i] == val then
                                master[i] = true
                            elseif mt.i[i] < 0 and val ~= -mt.i[i] - 1 then
                                master[i] = true
                            end
                        end
                    else
                        for i = 1, #mt.i do
                            if mt.el.val(mt.i[i]) then
                                master[i] = true
                            end
                        end
                    end
                else
                    if type(mt.el) == "function" then
                        master[i] = mt.el()
                    else
                        master[i] = mt.el.val and mt.el.val() or not mt.el.val
                    end
                end
            end
        end
        local show = true
        for i = 1, #master do
            if not master[i] and show then show = false end
        end
        if show then
            local anim = {
                main = width > 0 and (gui.anim.main * tab.anim.main) or 0,
                element = width > 0 and (gui.anim.main * tab.anim.main * el.anim.main) or 0,
                portion = function(s, a)
                    return s.main * (1 - (1 / a) + (el.anim.main / a)) end,
                hover = function(s, a)
                    a = a * 2
                    return s.main * (1 - ((1 / a) * 2) + (el.anim.hover / a) + (el.anim.main / a)) end,
            }
            if not options then
                p = p + v(0, 10 * render.easing(anim.main) - 10):func(math.floor)
            end
            local render = el:render(p, anim, input, options and width - 5 or 100)
            if render.hovered then gui.drag.block = true end
            if el.bind then render.size.x = render.size.x + 46 end
            if (el.dropdown or el.slider) and render.size.x < 100 then render.size.x = 100 end
            if el.color or el.options then render.size.x = render.size.x + 16 end
            local params = {p + v((width - 4), 0), anim, input, width}
            if el.bind then
                table.insert(extra, 1, {el.bind, params}) end
            if el.color then
                table.insert(extra, 1, {el.color, params}) end
            if el.options then
                table.insert(extra, 1, {el.options, params}) end
            if el.dropdown then
                params[1] = params[1] - v(width - 4, 0)
                table.insert(extra, 1, {el.dropdown, params}) end
            if options then
                if size.x < render.size.x then size.x = render.size.x end
                size.y = size.y + el.size
            end
            y = y + el.size
        end
    end
    return size + v(10, 9)
end
function gui.check_inter_elements(elements, check_options)
    for t = 1, #elements do
        local e = elements[t]
        if e.bind and (e.bind.changing or e.bind.opened) then return true end
        if e.dropdown and e.dropdown.opened then return true end
        if e.color and e.color.opened then return true end
        if e.options and e.options.opened and check_options then return true end
        if e.options and gui.check_inter_elements(e.options) then return true end
    end
end
function gui.tab(name)
    table.insert(gui.elements, {name = name, anim = {
        main = 0,
        text = 0
    }, columns = {}})
end
function gui.column(name)
    if name == nil then name = "" end
    table.insert(gui.elements[#gui.elements], {name = name, anim = {
        main = 0,
        text = 0
    }, elements = {}})
end
function gui.get_element_path()
    local columns = gui.elements[#gui.elements]
    local column = columns[#columns]
    if gui.adding_options then
        return gui.adding_options.elements end
    return column
end
function gui.get_element_id(name)
    local tab = gui.elements[#gui.elements]
    local column = tab[#tab]
    local options = ""
    if gui.adding_options then
        options = gui.adding_options.name:lower():gsub(" ","_") .. "_"
    end
    return (tab.name.."_"..column.name.."_"..options..name):lower():gsub(" ","_")
end
function gui.check_inter(el, extra)
    if extra then return (gui.inter_el ~= el and gui.clicked or (gui.inter_el == el and client.is_key_pressed(1))) end
    return gui.inter_el == false or gui.inter_el == el
end
function gui.check_parent(el)
    local parent = el.parent
    while parent ~= nil do
        if parent.main and parent.main.val and not parent.main.val() then return false end
        parent = parent.parent
    end
    return true
end
function gui.setup_element(el)
    el.master = function(s, e, i)
        if s.mt == nil then s.mt = {} end
        s.mt[#s.mt+1] = {el = e, i = i}
        return s
    end
    if not el.callbacks then el.callbacks = {} end
    if el.el then
        if el.el.get_value then
            el.change = gui.el_callbacks.change
            el.val = el.val or function(i)
                return gui.check_parent(el) and el.el:get_value(i)
            end
        end
        el.el:set_visible(false)
    end
    if el.get_value then
        el.val = el.val or function() return el.get_value() end end
    if el.dropdown and not el.dropdown.multi then
        el.change = function (e, fn)
            gui.el_callbacks.change(e, fn) end
    end
    el.full_name = function()
        local name = el.name
        local parent = el.parent
        while parent ~= nil do
            name = parent.name .. " -> " .. name
            parent = parent.parent
        end
        return name
    end
    el.paint = gui.el_callbacks.paint
    el.ncp = gui.el_callbacks.ncp --not conditionable paint
    el.cm = gui.el_callbacks.cmove
    el.cb = gui.el_callbacks.cb
    el.temp = {} --for functions info
    if gui.adding_options then
        el.parent = gui.adding_options end
    return el
end
gui.el_callbacks = {
    change = function(el, fn)
        table.insert(el.callbacks, function()
            local value = el.val()
            if el.old_value ~= value then pcall(fn, value, el, el) end
            el.old_value = value
            if el.options then
                for i = 1, #el.options.elements do
                    local e = el.options.elements[i]
                    if e.dropdown and not e.dropdown.multi or not e.dropdown and e.el then
                        local val = e.val()
                        if e.old_value ~= val then pcall(fn, val, el, e) end
                        e.old_value = val
                    end
                end
            end
        end)
        return el
    end,
    paint = function(el, fn)
        if only_open == nil then only_open = false end
        local id = el.full_name()
        table.insert(el.callbacks,
        el.val and
        function()
            if el.val() then
                performance.start(id)
                pcall(fn, el)
                performance.stop(id)
            end
        end or
        function()
            performance.start(id)
            pcall(fn, el)
            performance.stop(id)
        end)
        return el
    end,
    ncp = function(el, fn, only_open)
        local id = el.full_name()
        table.insert(el.callbacks,
        only_open and
        function()
            if gui.anim.main > 1 then
                performance.start(id)
                pcall(fn, el)
                performance.stop(id)
            end
        end or
        function()
            performance.start(id)
            pcall(fn, el)
            performance.stop(id)
        end)
        return el
    end,
    cmove = function(el, fn)
        local id = el.full_name() .. " create_move"
        el.cm_callback =
        el.val and
        function(cmd)
            if el.val() then
                performance.start(id)
                pcall(fn, cmd, el)
                performance.stop(id)
            end
        end or
        function(cmd)
            performance.start(id)
            pcall(fn, cmd, el)
            performance.stop(id)
        end
   
        return el
    end,
    cb = function(el, name, fn)
        cb(name,
        el.val and
        function(param)
            if el.val() then
                pcall(fn, param, el)
            end
        end or
        function(param)
            pcall(fn, param, el)
        end)
        return el
    end
}
function gui.checkbox(name, default)
    if default == nil then default = false end
    local id = gui.get_element_id(name)
    local path = gui.get_element_path()
    local el = {
        el = ui.add_check_box(id, id, default),
        name = name,
        anim = { main = 0, hover = 0 },
        size = 15,
        render = gui.render_types.checkbox,
    }
    el.set = function(val) el.el:set_value(val) end
    table.insert(path, el)
    return gui.setup_element(el)
end
gui.render_types.checkbox = function(el, pos, anim, input)
    if input == nil then input = true end
    local value = el.el:get_value()
    render.rect_smoothed(pos, pos + v(10, 10), gui.colors.elements:alp(anim:portion(1.05)), gui.colors.elements:alp(anim:hover(1.25)))
    local p = pos + v(5, 5)
    local a = v(5, 5) * anim:portion(1)
    if anim:portion(1) > 0.1 then
        render.rect_smoothed(p - a, p + a, gui.colors.elements:alp(anim:portion(1.1)), gui.colors.elements:alp(anim:hover(1.25)))
    end
    local text = render.text(el.name, pos + v(12, -2), gui.fonts.small, gui.colors.text:alp(anim:hover(2.5)))
    local hovered = render.hovered(pos, text.pos + text.size) and input and gui.check_inter(el)
    el.anim.main = render.anim(el.anim.main, value)
    el.anim.hover = render.anim(el.anim.hover, value or hovered)
    if hovered then
        if gui.clicked then
            el.el:set_value(not value)
            gui.inter_el = el
        end
    end
    return {size = text.pos + text.size - pos, hovered = hovered}
end
function gui.slider(name, min, max, default)
    if default == nil then default = min end
    local id = gui.get_element_id(name)
    local path = gui.get_element_path()
    local el = {
        el = ui.add_slider_int(id, id, min, max, default),
        name = name,
        anim = { main = 1, hover = 0 },
        min = min,
        max = max,
        slider = true,
        default = default,
        size = 22,
        render = gui.render_types.slider,
    }
    el.set = function(val) el.el:set_value(val) end
    table.insert(path, el)
    return gui.setup_element(el)
end
gui.render_types.slider = function(el, pos, anim, input, width)
    if input == nil then input = true end
    local value = el.el:get_value()
    local p = pos - v(0, 2)
    local size = v(width, 5)
    local c = gui.colors.text:alp(anim.element/1.75)
    local text = render.text(el.name, p, gui.fonts.small, c)
    local value_text_width = render.text_size(tostring(value), gui.fonts.small).x
    render.text(tostring(value), p + v(size.x, 0) - v(value_text_width, 0), gui.fonts.small, c)
    p = p + v(0, 14)
    render.rect_smoothed(p, p + size, gui.colors.elements:alp(anim.main * 0.1), gui.colors.elements:alp(anim:hover(0.66)))
    local percent = size.x / math.abs(el.min - el.max)
    local progress = (value * percent - (el.min * percent)) * render.easing(anim.element^2)
    c = gui.colors.elements:alp(anim.element)
    local offset = v(1, 1)
    local hovered = (render.hovered(p - offset, p + size + offset) or gui.inter_el == el) and (input or gui.inter_el == el) and gui.check_inter(el)
    if hovered then gui.drag.block = true end
    local active = gui.check_inter(el, true) and hovered
    local cursor_pos = renderer.get_cursor_pos()
    if active then progress = clamp((cursor_pos - p).x, 0, width) end
    if progress > 1 then
        render.rect_smoothed(p, p + v(progress, size.y), c) end
    if el.anim.hover then
        renderer.circle(p + v(progress, 2.5), 5 * el.anim.hover, 20, true, gui.colors.border:alp(anim.element / 2))
        renderer.circle(p + v(progress, 2.5), 4 * el.anim.hover, 20, true, c)
    end
    if active then
        gui.inter_el = el
        el.el:set_value(clamp(math.ceil(((cursor_pos.x - p.x - percent/2) / percent) + el.min), el.min, el.max))
    end
    if hovered then
        if gui.clicked_r then
            el.el:set_value(el.default)
        end
        if globalvars.get_frame_count() % 6 == 0 then
            local val = el.el:get_value()
            if client.is_key_pressed(37) then
                val = val - 1 end
            if client.is_key_pressed(39) then
                val = val + 1 end
            el.el:set_value(clamp(val, el.min, el.max))
        end
    end
    el.anim.hover = render.anim(el.anim.hover, hovered)
    return {size = text.pos + size + v(1, 0) - pos, hovered = hovered}
end
function gui.label(text)
    local path = gui.get_element_path()
    table.insert(path, {
        name = text,
        anim = { main = 1 },
        size = 15,
        shorter = true,
        render = function(el, pos, anim, input)
            return render.text(el.name, pos - v(0, 2), gui.fonts.small, gui.colors.text:alp(anim.element/1.75))
        end,
    })
    return gui.setup_element(path[#path])
end
function gui.bind(el, mode, key)
    if el == nil or el == "" then el = "bind" end
    if type(el) == "string" then el = gui.setup_element(gui.label(el)) end
    if mode == nil then mode = 1 end
    key = key or 0
    el.name = el.name
    local id = gui.get_element_id(el.name) .. (el.name ~= "bind" and "_bind" or "")
    el.on = function() return gui.check_parent(el)
        and el.bind.el:on() end
    el.get_key = function() return el.bind.el:get_key() end
    el.get_type = function() return el.bind.el:get_type() end
    el.get_mode = function() return el.bind.el:get_mode() end
    el.val = function()
        if el.get_type() > 0 then return el.get_key() ~= 0 else return true end
    end
    el.bind = {
        el = ui.add_key_bind(id, id, key, mode),
        anim = { main = 0, text = 0, modes = {0, 0, 0, 0} },
        opened = false,
        changing = false,
        render = gui.render_types.bind,
        main = el
    }
    gui.setup_element(el.bind)
    return el
end
gui.render_types.bind = function(s, pos, anim, input)
    local modes = {"on", "hold", "toggle", "off"}
    local el = s.main
    local active = (el.el and el.el:get_value() or not el.el)
    pos = pos + v(0, -2)
    local color = gui.colors.text:alp(anim.element * (0.5 + s.anim.text / 2))
    local key = gui.keys[s.el:get_key()] or "?"
    if s.el:get_key() == 0 then key = "none" end
    if s.changing and not gui.click_block then
        gui.inter_el = s
        key = "..."
        local key_set = false
        for i = 1, #gui.keys do
            if gui.keys[i] then client.is_key_pressed(i) end end
        for i = 1, #gui.keys do
            local k = gui.keys[i]
            if k and client.is_key_pressed(i) and not key_set then
                s.changing = false
                if i == 27 then s.el:set_key(0)
                else key = k s.el:set_key(i) end
                gui.click_block = true
                key_set = true
            end
        end
    end
    if s.el:get_type() == 0 then key = "on" end
    local text = "["..key.."]"
    pos = pos - v(render.text_size(text, gui.fonts.small).x, 0)
    text = render.text(text, pos, gui.fonts.small, color)
    local hovered = render.hovered(pos + v(-1, 3), text.pos + text.size + v(2, 4)) and input and gui.check_inter(s)
    if hovered and active then
        if gui.clicked_r then
            gui.inter_el = s
            s.opened = not s.opened
        end
    end
    s.anim.text = render.anim(s.anim.text, (hovered or s.opened or s.changing) and active)
    s.anim.main = render.anim(s.anim.main, s.opened)
    if hovered and gui.clicked and not s.opened then
        s.changing = true end
    if s.anim.main == 0 then return {hovered = hovered} end
    gui.drag.block = true
    gui.inter_el = s

    local margin = 3
    local height = #modes * (gui.fonts.small[2] + margin)
    local main_anim = anim.main * s.anim.main
    local menu = render.rect_smoothed(pos, pos + v(42, height), gui.colors.bg:alp_self(main_anim), gui.colors.border:alp_self(main_anim))
    for t = 1, #modes do
        local mode = modes[t]
        local p = pos + v(3, (t - 1) * (gui.fonts.small[2] + margin) + 1)
        local anim = (0.5 + s.anim.modes[t] / 2) * main_anim
        local text = render.text(mode, p, gui.fonts.small, gui.colors.text:alp(anim))
        s.anim.modes[t] = render.anim(s.anim.modes[t], text.hovered or (t == s.el:get_type() + 1))
        if gui.clicked and text.hovered then
            s.el:set_type(t-1)
            s.opened = false
        end
    end
    if not menu.hovered and gui.clicked and gui.check_inter(s, true) then
        s.opened = false
        gui.drag.block = true
    end
    return {hovered = hovered}
end
function gui.color(el, default)
    if el == nil or el == "" then el = "color" end
    if type(el) == "string" then el = gui.setup_element(gui.label(el)) end
    if default == nil then default = col(255,255,255) end
    local id = gui.get_element_id(el.name) .. (el.name ~= "color" and "_color" or "")
    el.color = {
        el = ui.add_color_edit(id, id, true, default),
        anim = { main = 0, text = 0, content = {0, 0} },
        active_el = 0,
        opened = false,
        render = gui.render_types.color,
        main = el
    }
    el.col = function() return el.color.el:get_value() end
    gui.setup_element(el.color)
    return el
end
gui.render_types.color = function(s, pos, anim, input)
    local el = s.main
    function hover_check(hover, num)
        local result = client.is_key_pressed(1) and ((hover and gui.clicked) and s.active_el == 0 or s.active_el == num)
        if result then s.active_el = num end
        return result end
    function render_grid(from, to, alpha, dens)
        local size = to - from
        dens = dens or 7
        for x = 0, math.ceil(size.x / dens - 1) do
            for y = 0, math.ceil(size.y / dens - 1)  do
                local c = (y % 2 ~= x % 2) and col(125, 125, 125) or col(255, 255, 255)
                renderer.rect_filled(from + v(x * dens, y * dens), from + v((x + 1) * dens, (y + 1) * dens), c:alp(alpha))
            end
        end
    end
    local active = (el.el and el.el:get_value() or not el.el)
    pos = pos - v(13, 1)
    local color = s.el:get_value()
    local text_anim = anim.main * anim.element
    render_grid(pos + v(1, 1), pos + v(11, 11), text_anim, 5)
    local text = render.rect_smoothed(pos, pos + v(12, 12), color:alp_self(render.easing(text_anim)), gui.colors.elements:alp(anim.element * (0.5 + s.anim.text / 2)))
    local hovered = text.hovered and input and gui.check_inter(s)
    s.anim.text = render.anim(s.anim.text, (hovered and active) or s.opened)
    s.anim.main = render.anim(s.anim.main, active and s.opened)
    if not client.is_key_pressed(1) then s.active_el = 0 end
    if hovered and gui.clicked and not s.opened and active then
        s.opened = true end
    if s.anim.main == 0 then return {hovered = hovered} end
    gui.drag.block = true
    gui.inter_el = s
    pos = pos + v(13, -1)
    local main_anim = anim.main * s.anim.main
    local size = v(187, 150)
    local menu = render.rect_smoothed(pos, pos + size, gui.colors.bg:alp_self(main_anim), gui.colors.border:alp_self(main_anim))
    pos = pos + v(5, 6)
    local cursor = renderer.get_cursor_pos()
    local hsv = render.RBGtoHSV(color)
    do
        local size = size.y - 12
        for i = 0, size do
            local c1 = render.HSVToRGB({hsv[1], 1, 1 - (i / size)}):alp(main_anim)
            local c2 = render.HSVToRGB({hsv[1], 0, 1 - (i / size)}):alp(main_anim)
            renderer.rect_filled_fade(pos + v(0, i), pos + v(size, i + 1), c2, c1, c1, c2)
        end
        if hover_check(render.hovered(pos, pos + v(size, size)), 1) then
            hsv[2] = clamp((cursor.x - pos.x) / size, 0, 1)
            hsv[3] = clamp(1 - ((cursor.y - pos.y) / size), 0, 1)
            s.el:set_value(render.HSVToRGB(hsv))
        end
        renderer.circle(pos + v(hsv[2] * (size - 1), (1 - hsv[3]) * size), 4, 10, false, col(255, 255, 255):alp(main_anim))
        pos = pos + v(size + 5, 0)
    end

    do
        local size = size.y - 38
        local width = 14
        local t = (1 / 3)
        local c = col(255,255,255):alp(main_anim)
        for h = 0, 2 do
            local c1 = render.HSVToRGB({h * t, 1, 1}):alp(main_anim)
            local c2 = render.HSVToRGB({(h + 1) * t, 1, 1}):alp(main_anim)
            local p = pos + v(0, h * (t * size))
            renderer.rect_filled_fade(p, p + v(width, size * t), c1, c1, c2, c2)
        end
        if hover_check(render.hovered(pos, pos + v(width, size)), 2) then
            hsv[1] = clamp((cursor.y - pos.y) / size, 0, 359 / 360)
            s.el:set_value(render.HSVToRGB(hsv))
        end
        render.rect_smoothed(pos + v(-1, -2 + hsv[1] * size), pos + v(width + 1, 2 + hsv[1] * size), c)
        local copy = render.text("copy", pos + v(-1, size+1), gui.fonts.small, gui.colors.text:alp((s.anim.content[1] / 2 + 0.5) * main_anim))
        s.anim.content[1] = render.anim(s.anim.content[1], copy.hovered)
        if copy.hovered and gui.clicked then
            gui.clipboard = color end
        pos = pos + v(width + 5, 0)

        size = size - 1
        do
            local c1 = color:alp(main_anim)
            local c2 = c1:alp(0)
            render_grid(pos, pos + v(width, size), main_anim)
            renderer.rect_filled_fade(pos, pos + v(width, size), c1, c1, c2, c2)
            local offset = (1 - (color.a / 255)) * size
            if hover_check(render.hovered(pos, pos + v(width, size)), 3) then
                color.a = clamp(1 - ((cursor.y - pos.y) / size), 0, 1) * 255
                s.el:set_value(color)
            end
            render.rect_smoothed(pos + v(-1, -2 + offset), pos + v(width + 1, 2 + offset), c)
        end

        local paste = render.text("paste", pos + v(-width-6, size+15), gui.fonts.small, gui.colors.text:alp((s.anim.content[2] / 2 + 0.5) * main_anim))
        s.anim.content[2] = render.anim(s.anim.content[2], paste.hovered)
        if paste.hovered and gui.clicked and gui.clipboard then
            s.el:set_value(gui.clipboard) end
    end

    if not menu.hovered and gui.clicked and gui.check_inter(s, true) then
        s.opened = false
        gui.drag.block = true
    end
    return {hovered = hovered}
end
gui.dropdown = function(name, elements, multi, default)
    local el = gui.label(name)
    if multi == nil then multi = false end
    local id = gui.get_element_id(name)
    local element
    if multi then
        element = ui.add_multi_combo_box(id, id, elements, default or table.fill(#elements, false))
    else
        element = ui.add_combo_box(id, id, elements, default or 0) end
    el.size = 30
    el.dropdown = {
        el = element,
        elements = elements,
        name = name,
        anim = { main = 0, hover = 0, elements = table.fill(#elements, 0) },
        multi = multi,
        opened = false,
        render = gui.render_types.dropdown,
        main = el
    }
    el.val = function(i)
        return gui.check_parent(el) and el.dropdown.el:get_value(i) end
    el.set = function(val)
        return el.dropdown.el:set_value(val) end
    gui.setup_element(el.dropdown)
    return gui.setup_element(el)
end
gui.render_types.dropdown = function(s, pos, anim, input, width)
    if input == nil then input = true end
    local p = pos - v(0, 2)
    local size = v(width - 5, 14)
    local value
    local value_shortened = false
    if s.multi then
        local values = {}
        for i = 1, #s.elements do if s.el:get_value(i - 1) then
            values[#values+1] = s.elements[i]
        end end
        value = table.concat(values, ", ")
        if #values == 0 then value = "none" end
    else
        value = s.elements[s.el:get_value() + 1] end
    while render.text_size(value, gui.fonts.small).x > size.x - 25 and size.x > 25 do
        value = value:sub(1, #value - 1) value_shortened = true end
    value = value .. (value_shortened and "..." or "")
    local c2 = gui.colors.elements:alp(s.anim.hover * 0.6 + anim.main * 0.25)
    p = p + v(0, 14)
    render.rect_smoothed(p, p + size, gui.colors.elements:alp(anim.main * 0.1), c2)
    render.text(".", v(p.x + size.x - 8, p.y - 3), gui.fonts.small, c2)
    render.text(value, p + v(3, 0), gui.fonts.small, gui.colors.text:alp(anim.main / 1.75))
    local offset = v(1, 0)
    local hovered = (render.hovered(p - offset, p + size + offset) or gui.inter_el == s) and input and gui.check_inter(s)
    if hovered then gui.drag.block = true end
    s.anim.hover = render.anim(s.anim.hover, hovered or s.opened)
    s.anim.main = render.anim(s.anim.main, s.opened)
    if hovered and not s.multi then
        local val = s.el:get_value()
        if extended.key_click(37) or extended.key_click(38) then
            val = val - 1
        end
        if extended.key_click(39) or extended.key_click(40) then
            val = val + 1
        end
        if val ~= s.el:get_value() then
            s.el:set_value(clamp(val, 0, #s.elements - 1))
        end
    end
    if hovered and gui.clicked then
        s.opened = true end
    if s.anim.main == 0 then return {hovered = hovered} end
    gui.drag.block = true
    gui.inter_el = s

    p = p + v(0, 14)
    local margin = gui.fonts.small[2] + 3
    local height = #s.elements * margin + 4
    local max_width = size.x
    local main_anim = anim.main * s.anim.main
    for i = 1, #s.elements do
        local width = render.text_size(s.elements[i], gui.fonts.small).x
        if max_width < width then max_width = width + 6 end
    end
    local menu = render.rect_smoothed(p, p + v(max_width, height), gui.colors.bg:alp_self(main_anim), gui.colors.border:alp_self(main_anim))
    p = p + v(3, 3)
    for i = 1, #s.elements do
        local active
        if s.multi then
            active = s.el:get_value(i-1)
        else
            active = s.el:get_value() == i - 1 end
        local active_anim = active and s.anim.main * 0.3 or 0
        local col = gui.colors.text:alp(s.anim.elements[i] * 0.4 + s.anim.main * 0.3 + active_anim)
        local elem = render.text(s.elements[i], p + v(0, margin * (i - 1)), gui.fonts.small, col, nil)
        elem.hovered = render.hovered(elem.pos + v(0, -2), elem.pos + v(max_width - 8, margin - 1))
        s.anim.elements[i] = render.anim(s.anim.elements[i], elem.hovered or active)
        if elem.hovered and gui.clicked then
            if s.multi then
                s.el:set_value(i-1, not s.el:get_value(i-1))
            else
                s.el:set_value(i-1)
            end
        end
    end

    if not menu.hovered and gui.clicked and gui.check_inter(s, true) then
        s.opened = false
        gui.drag.block = true
    end
    return {hovered = hovered, size = render.text_size(s.name, gui.fonts.small)}
end
function gui.options(el, options)
    if type(el) == "string" then el = gui.label(el) end
    el.options = {
        elements = {},
        anim = { main = 0, text = 0 },
        size = v(0, 0),
        opened = false,
        name = el.name,
        render = gui.render_types.options,
        main = el
    }
    local old_options = gui.adding_options
    gui.adding_options = el.options
    options(el)
    gui.adding_options = old_options
    el.elems = {}
    for i = 1, #el.options.elements do
        el.elems[el.options.elements[i].name] = el.options.elements[i]
    end
    return gui.setup_element(el)
end
gui.render_types.options = function(s, pos, anim, input)
    local el = s.main
    local active = (el.el and el.el:get_value() or not el.el)
    pos = pos - v(13, 5)
    local color = gui.colors.text:alp(anim.element / 2 + s.anim.text / 2)
    local text = render.text("...", pos, gui.fonts.small, color)
    local hovered = render.hovered(pos + v(-1, 3), text.pos + text.size + v(2, 4)) and input and gui.check_inter(s)
    s.anim.text = render.anim(s.anim.text, (hovered or s.opened) and active)
    if hovered and active then
        if gui.clicked then
            gui.inter_el = s
            s.opened = not s.opened
        end
    end
    if not active or gui.anim.main < 1 then s.opened = false end
    s.anim.main = render.anim(s.anim.main, s.opened)
    if s.anim.main == 0 then return {hovered = hovered} end
    gui.drag.block = true

    pos = pos + v(0, 6)
    local main_anim = anim.main * s.anim.main
    local menu = render.rect_smoothed(pos, pos + s.size, gui.colors.bg:alp_self(main_anim), gui.colors.border:alp_self(main_anim))

    local extra = {}
    local inter = gui.check_inter_elements(s.elements, true)
    s.size = gui.render_elements(pos + v(5, 2), s.elements, s, extra, true, not inter, s.size.x - 6)
    local can_hide = true
    for i = 1, #extra do
        local o = extra[i]
        if o[1]:render(unpack(o[2])).hovered then gui.drag.block, can_hide = true, false end
    end
    if not menu.hovered and gui.clicked and not gui.inter_el and can_hide then
        s.opened = false
        gui.drag.block = true
    end
    return {hovered = true}
end

gui.tab("rage")

gui.column("main")
m_idealpeek = gui.options(gui.checkbox("ideal peek"), function()
    gui.checkbox("adaptive min-dmg")
    --gui.checkbox("freestand")
end):cm(function(cmd, el)
    if not autopeek_bind:on() then return end
    local dmg = el.elems.adaptive:val()
    entitylist.for_enemies(function(i)
        ragebot.override_safe_point(i, 2)
        ragebot.override_head_scale(i, 0)
        ragebot.override_body_scale(i, 80)
        if dmg then ragebot.override_min_damage(i, 5) end
    end, true, true)
end)
do
    local function get_mode(ent)
        local mode = "standing"
        if ent:velocity() > 3 then mode = "moving" end
        if ent:in_air() then mode = "air" end
        return mode
    end
    local players = {}
    gui.checkbox("bruteforce+"):cm(function(cmd)
        entitylist.for_enemies(function(ent)
            local info = ent:info()
            if not info.is_bot and players[info.steam_id64] then
                local mode = get_mode(ent)
                ragebot.override_desync_correction(ent:get_index(), players[info.steam_id64].state[mode])
            end
        end, true)
    end)
    -- :paint(function()
        -- entitylist.for_enemies(function(ent)
            -- local info = ent:info()
            -- if not info.is_bot then
                -- local mode = get_mode(ent)
                -- local p = players[info.steam_id64]
                -- local correction = p and p.state[mode] or (not p and true)
                -- local misses = p and p.misses[mode] or 0
                -- local bbox = ent:get_bbox()
                -- if bbox then
                    -- local pos = v(bbox.right, bbox.top) - v(0, 5)
                    -- local text = (correction and "on" or "off") .. tostring(misses)
                    -- render.text(text, pos, gui.fonts.small, col(255,255,255), true)
                -- end
            -- end
        -- end, true)
    -- end)
    :cb("shot_fired", function(i)
        if i.manual then return end
        if not i.target then return end
        if i.result ~= "hit" and i.result ~= "desync" then return end
        local ent = i.target
        local info = ent:info()
        if info.is_bot then return end
        if not players[info.steam_id64] then players[info.steam_id64] = {
            state = {standing = true, moving = true, air = true},
            misses = {standing = 0, moving = 0, air = 0},
        } end
        local p = players[info.steam_id64]
        local mode = get_mode(ent)
        local count = 1
        if i.result == "hit" then count = -count end
        p.misses[mode] = p.misses[mode] + count
        if p.misses[mode] > 2 then
            p.misses[mode] = 0
            p.state[mode] = not p.state[mode]
        end
        players[info.steam_id64] = p
    end)
end
m_exploit_switch = gui.options(gui.checkbox("exploit switch"), function()
    gui.bind("doubletap", 2)
    gui.bind("hideshots", 2)
end):paint(function(el)
    if m_defensive_dt.val() then return end
    local hs, dt = el.elems.hideshots:on(), el.elems.doubletap:on()
    exploit_bind:set_key(3)
    if dt or hs then
        exploit_bind:set_type(0)
        if hs then return  active_exploit:set_value(1) end
        active_exploit:set_value(2)
    else exploit_bind:set_type(2) active_exploit:set_value(0) end
end)
gui.options(gui.checkbox("hp < ? then ?"), function()
    gui.slider("hp value", 0, 100, 100)
    gui.dropdown("then force", {"baim", "safepoint"}, true)
end):cm(function(cmd, el)
    if el.elems["then force"].val(0) then
        ragebot.force_hitboxes({false, true, true, true, false, false}, el.elems["hp value"].val())
    end
    if el.elems["then force"].val(1) then
        ragebot.force_safepoints(2, el.elems["hp value"].val())
    end
end)
local m_mindmg = gui.options(gui.checkbox("dmg override", false), function()
    gui.slider("value", 1, 101, 1)
    gui.bind(nil, 1, 70)
end):cm(function(cmd, el)
    if not el.elems.bind:on() then return end
    ragebot.force_mindmg(el.elems.value:val())
end)
local m_override_hbx = gui.options(gui.checkbox("hitbox override"), function ()
    gui.bind(nil, 2)
    gui.dropdown("hitboxes", {"head", "chest", "pelvis", "stomach", "legs", "feet"}, true)
end):cm(function(cmd, el)
    if not el.elems.bind:on() then return end
    ragebot.force_hitboxes(el.elems.hitboxes.dropdown.el:values(5))
end)
gui.options("improvements", function()
    gui.options(gui.checkbox("fakelag on hideshots"), function()
        gui.slider("ticks", 0, 8, 6)
    end):cm(function(cmd, el)
        local lp = entitylist.lp()
        if not lp or not lp:is_alive() then return end
        local off = extended.get_exploit() ~= "hs"
        fakelag_enable:set_value(off)
        if off then return end
        local choked = clientstate.get_choked_commands()
        if choked > el.elems.ticks.val() - 1 then
            cmd.send_packet = true
            return
        end
        cmd.send_packet = false
    end)
    gui.checkbox("adaptive autoscope [!]")
    gui.bind(gui.checkbox("dormant aim [!]"))
end)
local m_force_binds = gui.options('binds', function()
    gui.bind("force baim", 2)
    gui.bind("force head", 2)
    gui.bind("force backshoot  [!]", 2)
    local pingspike = gui.bind("pingspike", 2)
    gui.slider("ping value", 0, 200, 100):master(pingspike)
end):cm(function(cmd, el)
    local hitboxes
    if el.elems["force baim"]:on() then
        hitboxes = {false, false, true, true, false, false}
    elseif el.elems["force head"]:on() then
        hitboxes = {true, false, false, false, false, false} end
    if hitboxes then ragebot.force_hitboxes(hitboxes) end
    ping_spike_value:set_value(el.elems.pingspike:on() and el.elems["ping value"].val() or 0)
end)


gui.column("doubletap")
m_defensive_dt = false
do
    local cl_smooth = se.get_convar("cl_smooth")
    local cl_interp = se.get_convar("cl_interpolate")
    m_defensive_dt = gui.options(gui.checkbox("defensive"), function()
        gui.slider("predict ticks", 6, 16, 10)
        gui.slider("charge delay", 10, 200, 66)
        gui.dropdown("behaviour", {
            "scout/awp only autopeek",
            "disable deagle",
            "disable pistols",
            "disable dt on knife",
            "disable teleport fakelag",
        }, true)
    end):cm(function(cmd, el)
        local lp, hit, exploit = entitylist.lp(), false, extended.get_exploit()
        local time = time_in_dormant:get_value()
        local interval = globalvars.get_interval_per_tick()
        local behaviour = el.elems.behaviour
        el.temp.active = false
        exploit_bind:set_key(3)
        if not exploit then return exploit_bind:set_type(2) end
        exploit_bind:set_type(0)
        if behaviour.val(4) then
            fakelag_enable:set_value(true)
        end
        if globalvars.get_real_time() < el.temp.enable_on then
            if behaviour.val(4) then
                fakelag_enable:set_value(false)
            end
            return
        end
        if el.temp.shot then
            local stop = false
            entitylist.for_enemies(function(ent)
                if stop then return end
                if ent:dormant_ticks() * interval > time then return end
                if lp:hittable(ent, 0) then stop = true end
            end, true)
            if stop then return end
        end
        if exploit == "hs" then
            return active_exploit:set_value(1)
        end
        active_exploit:set_value(2)
        local predict = el.elems["predict ticks"].val()
        local origin = lp:origin()
        local weapon = lp:weapon()
        if behaviour.val(0)
            and not autopeek_bind:on()
            and set({"awp", "scout"})[weapon.group] then
            return
        end
        -- do not recharge if peeking
        if behaviour.val(1) and weapon.group == "deagle" then return end
        if behaviour.val(2) and weapon.group == "pistols" then return end
        if weapon.group == "knife" then
            return active_exploit:set_value(behaviour.val(3) and 1 or 2)
        end
        if set({"c4", "grenade", "taser"})[weapon.group] then return end
        el.temp.shot = false
        el.temp.active = true
        active_exploit:set_value(1)
        cl_smooth:set_int(0) cl_interp:set_int(0)
        if lp:velocity() > 10 then
            entitylist.for_enemies(function(ent)
                if ent:dormant_ticks() * interval > time then return end
                if hit then return end
                if ent:origin():dist_to(origin) > 5000 then return end
                if lp:hittable(ent, predict) then
                    el.temp.peek_ticks = el.temp.peek_ticks + 1
                    hit = true
                    cmd.send_packet = true
                    if el.temp.raw_hit < 16 then
                        if lp:hittable(ent, 0) then
                            el.temp.raw_hit = el.temp.raw_hit + 1 end
                        active_exploit:set_value(2)
                        lp:set_prop_int(m_.nTickBase, lp:get_prop_int(m_.nTickBase) + 15)
                        if el.temp.peek_ticks < 3 then
                            cmd.send_packet = true end
                        if clientstate.get_choked_commands() == 0 then
                            el.temp.lag_ticks = el.temp.lag_ticks + 1 end
                    end
                end
            end, true)
        end
        if not hit then
            el.temp.raw_hit = 0
            el.temp.peek_ticks = 0
            el.temp.lag_ticks = 0
            el.temp.shot = false
        end
    end):cb("shot_fired", function(i, el)
        local exploit = extended.get_exploit()
        if exploit == "hs" then return end
        if not el.temp.active then return end
        el.temp.enable_on = globalvars.get_real_time() + el.elems["charge delay"].val() / 100
        active_exploit:set_value(0)
        el.temp.shot = true
    end)
end
m_defensive_dt.temp = {raw_hit = 0, enable_on = 0, peek_ticks = 0, lag_ticks = 0, shot = false}
gui.checkbox("twoshot [!]")

gui.tab("aa")

gui.column("custom aa")
anti_aim = {
    legit_aa_active = false,
    in_use = false,
    manual = 1,
    jitter_side = 1,
    jitter_waiting = 0,
    should_invert = false,
    targeted_player = nil,
    last_target = nil,
    exploiting = false,
    fakeduck = false,
    prevent_e_ticks = 0,
    fakehead_next_tick = 0,
    last_best_angle = 0,
    types = {"default", "standing", "walk", "run", "air", "crouch"},
    presets = {},
    elements = {preset = nil},
}
do
    local presets = {
        {"default",{desync={false,37,37,false,37,37,false,37,37,false,37,37,false,37,37,false,37,37,},jitter={false,0,0,0,1,false,0,0,0,1,false,0,0,0,1,false,0,0,0,1,false,0,0,0,1,false,0,0,0,1,},yaw={0,0,false,0,0,false,0,0,false,0,0,false,0,0,false,0,0,},auto_invert={0,false,0,false,0,false,0,false,0,false,0,},},},
        {"storm",{desync={false,60,60,false,37,37,false,37,37,false,37,37,false,37,37,false,37,37,},jitter={false,1,0,0,1,false,0,0,0,1,false,0,0,0,1,false,0,0,0,1,false,0,0,0,1,false,0,0,0,1,},yaw={42,-42,false,0,0,false,0,0,false,0,0,true,40,-40,false,0,0,},auto_invert={1,false,0,false,0,false,0,false,0,false,0,},},},
        {"tank aa",{desync={false,44,44,true,33,33,false,37,37,false,37,37,true,5,3,true,60,60,},jitter={false,1,0,70,2,true,1,0,5,2,false,0,0,0,1,false,0,0,0,1,true,1,1,70,2,true,1,0,50,1,},yaw={0,0,false,0,0,false,0,0,false,0,0,false,0,0,false,0,0,},auto_invert={1,true,2,false,0,false,0,true,1,true,0,},},},
        {"c7",{desync={false,0,0,true,60,60,true,60,60,true,60,60,true,60,60,true,60,60,},jitter={false,1,0,0,1,true,1,0,45,1,true,1,0,70,1,true,1,0,66,1,false,1,1,70,2,true,1,0,50,1,},yaw={0,0,false,0,0,false,0,0,false,0,0,false,0,0,false,0,0,},auto_invert={0,true,0,false,0,false,0,true,0,true,0,},},},
        {"lexx0r",{desync={false,60,30,true,60,60,true,60,30,false,37,37,true,60,30,true,60,60,},jitter={false,1,0,0,1,true,1,0,26,1,true,1,0,24,1,false,0,0,0,1,true,1,0,0,1,true,1,0,18,1,},yaw={-35,35,true,-6,6,true,-35,35,false,0,0,true,-35,35,true,-6,6,},auto_invert={1,false,2,false,0,false,0,true,1,false,16,},},},
        {"eleven & vek",{desync={false,29,29,true,5,5,false,37,37,true,7,7,true,28,28,false,37,37,},jitter={false,1,1,44,1,true,1,1,70,1,true,0,1,20,1,true,1,1,35,1,true,1,0,24,1,false,0,0,0,1,},yaw={-7,7,true,0,0,true,-4,4,true,0,0,true,11,11,false,0,0,},auto_invert={0,false,0,true,1,false,0,false,0,false,0,},},},
    }
    local list = {"none", "custom"}
    for i = 1, #presets do
        local v = presets[i]
        if type(v) == "function" then
            if not v() then return end v = nil
        else
            anti_aim.presets[i] = v[2]
            list[#list + 1] = v[1]
        end
    end
    list[#list+1] = "-- click to export --"
    anti_aim.elements.preset = gui.dropdown("preset", list)
    anti_aim.elements.preset:change(function(val, el)
        if val + 1 == #el.dropdown.elements then return anti_aim:export() end
        if anti_aim.presets[val - 1] then anti_aim:import(anti_aim.presets[val - 1]) end
    end)
end
anti_aim.get_angle = function(s)
    if clientstate.get_choked_commands() ~= 0 then
        s.targeted_player = s.last_target
        return s.last_best_angle end
    local lowest_fov, best_player = 2147483647, nil
    local lp = entitylist.lp()
    local origin = lp:origin()
    if not origin then return 0 end
    local viewangles = engine.get_view_angles()
    if not viewangles then return 0 end
    local vecangles = viewangles:to_vec()
    local best_player_pos = nil
    local time = time_in_dormant:get_value()
    local interval = globalvars.get_interval_per_tick()
    entitylist.for_enemies(function(ent)
        if ent:dormant_ticks() * interval > time then
            return end
        local pos = ent:origin()
        if pos then
            local current_fov = (origin:angle_to(pos):to_vec() - vecangles):length()
            if current_fov < lowest_fov then
                lowest_fov = current_fov
                best_player = ent
                best_player_pos = pos
            end
        end
    end, true)
    s.targeted_player = best_player
    s.last_target = s.targeted_player
    local angle = 0
    if best_player_pos then
        local difference = origin:angle_to(best_player_pos)
        if difference then
            angle = difference.yaw
        end
    end
    if not best_player or not best_player_pos then
        s.targeted_player = nil
        angle = viewangles.yaw
    end
    s.last_best_angle = angle
    return angle
end
anti_aim.check = function(cmd)
    if not engine.is_connected()
        or not engine.is_in_game() then return true end
    local lp = entitylist.lp()
    if not lp:can_move() then antiaim_enable:set_value(false) return true end
    if anti_aim.elements.preset.val() == 0 then return true end
    local move_type = lp:get_prop_int(m_.netMoveType)
    if move_type == 8 or move_type == 9 or move_type == 0 then return true end
    local weapon = lp:weapon().group
    if weapon == "grenade" then
        return lp:is_throwing() end
    if hasbit(cmd.buttons, 0) then return true end
    if hasbit(cmd.buttons, 11) and weapon == "knife" then
        return true end
    return false
end
anti_aim.manuals = function(s, cmd)
    if not s.use then
        cmd.viewangles.yaw = cmd.viewangles.yaw + ({[0] = 0, 180, 90, 270})[s.manual]
    end
    if s.elements.manual.val() then
        for k, v in pairs({left = 2, right = 3, back = 1, forward = 0}) do
            if client.is_key_clicked(s.elements.manual.elems[k]:get_key())
                and extended:is_window_active() then
                if s.manual == v then s.manual = 1
                else s.manual = v end break
            end
        end
    end
    return s.manual
end
anti_aim.legit_aa = function(s, cmd)
    local lp = entitylist.lp()
    if not lp or not lp:is_alive() then return false end
    local in_use = hasbit(cmd.buttons, 5)
    s.in_use = in_use
    if in_use then
        local C4 = entitylist.get_entities_by_class("CPlantedC4")
        local origin = lp:origin()
        if lp:weapon().group == "c4" or (C4[1] and C4[1]:origin():dist_to(origin) <= 75) then return in_use end
        local hostages = entitylist.get_entities_by_class("CHostage")
        for i = 1, #hostages do
            if hostages[i]:origin():dist_to(pos) <= 75
                and lp:get_prop_int(m_.hCarriedHostage) == -1 then return in_use end
        end
    end
    if s.legit_aa_active then cmd.buttons = bit32.band(cmd.buttons, -33) end
    if s.legit_aa_active ~= in_use then s.legit_aa_active = in_use return in_use end
    if in_use then
        desync_roll_pitch:set_value(cmd.viewangles.pitch)
    end

    return in_use
end
--[[anti_aim.att = function(s, cmd)
    s.targeted_player = nil
    if not s.elements.att.val() or s.use or s.manual ~= 1 then return end
    if s.freestanding then return end
    cmd.viewangles.yaw = s:get_angle()
end]]
anti_aim.anti_backstab = function(s, cmd)
    local pos = entitylist.lp():origin()
    local enemy = {
        distance = math.huge,
        entity = nil,
    }
    entitylist.for_enemies(function(ent)
        local origin = ent:origin()
        local dist = origin:dist_to(pos)
        if not ent:is_dormant()
            and dist < 200
            and ent:weapon().group == "knife"
            then
            if dist < enemy.distance then
                enemy = {
                    distance = dist,
                    entity = ent,
                    origin = origin,
                }
            end
        end
    end, true)
    if not enemy.entity then return end
    table.sort(enemy, function(a, b)
        return a.distance < b.distance
    end)
    cmd.viewangles.yaw = enemy.origin:angle_to(pos).yaw + 180
    return true
end
anti_aim.prevent_e = function(s, cmd)
    at_targets:set_value(false)
    local exploit = extended.get_exploit() ~= false
    local fakeduck = fakeduck_bind:on()
    local prevent = (not exploit and s.exploiting ~= exploit)
        or (fakeduck and fakeduck ~= s.fakeduck)
    if prevent then
        s.prevent_e_ticks = math.max(fakelag_limit:get_value(), 2)
    end
    local run = s.prevent_e_ticks > 0
    if run then
        s.prevent_e_ticks = s.prevent_e_ticks - 1
        antiaim_pitch:set_value(1)
        antiaim_yaw:set_value(1)
    else
        if anti_aim.elements.preset.val() ~= 0 then
            antiaim_pitch:set_value(0)
            antiaim_yaw:set_value(0)
        end
    end
    s.exploiting = exploit
    s.fakeduck = fakeduck
    return run
end
anti_aim.restore_inverter = function(s)
    inverter_bind:set_key(s.elements.inverter:get_key())
    inverter_bind:set_type(s.elements.inverter:get_type())
end
anti_aim.get_custom = function(s, mov)
    local movement = anti_aim.types[mov + 2]
    local get = function(el, name)
        if el.elems["override " .. movement].val() then
            return el.elems[movement .. " " .. name].val()
        else
            return el.elems["default " .. name].val()
        end
    end
    local custom_values = {
        yaw = {"left", "right"},
        desync = {"left", "right"},
        jitter = {"direction", "type", "amnt", "speed"},
        auto_invert = {"speed"}
    }
    local values = {}
    for k, v in pairs(custom_values) do
        values[k] = {}
        local el = s.elements[k]
        for _, name in ipairs(v) do
            values[k][name] = get(el, name)
        end
    end
    return values
end
anti_aim.export = function(s)
    local value = s.elements.preset.val()
    if value + 1 ~= #s.elements.preset.dropdown.elements then return end
    s.elements.preset.dropdown.el:set_value(1)
    local values = {}
    local get
    get = function(elements, arr)
        for key, el in pairs(elements) do
            arr[key] = {}
            if el.options then
                pcall(get, el.options.elements, arr[key])
            elseif el.val then
                arr[key] = el.val()
            end
        end
    end
    get(s.elements, values)
    values.inverter, values.manual, values.preset, values.type, values.freestand = nil, nil, nil, nil, nil
    print(tostring(table.serialize({"preset name", values}, nil, true)) .. ",")
    engine.execute_client_cmd("showconsole")
end
anti_aim.import = function(s, array)
    local set
    set = function(elements, arr)
        for key, el in pairs(arr) do
            if type(el) == "table" then
                --print(tostring(elements[key].name))
                pcall(set, elements[key].options.elements, el)
            elseif elements[key].set then
                --print("    " .. elements[key].name .. " " .. tostring(key))
                elements[key].set(arr[key])
            end
        end
    end
    set(s.elements, array)
end
anti_aim.modifiers = function(s, cmd)
    local lp = entitylist.lp()
    local invert = inverter_bind:on()
    local values = anti_aim:get_custom(lp:movement_type())
    local desync_amount = invert and values.desync.left or values.desync.right
    if s.elements.desync.elems["anti-detect"].val() then
        if lp:velocity() > 4 then
            desync_amount = clamp(desync_amount, 0, 37)
            if lp:get_direction().x > 66 then
                desync_amount = clamp(desync_amount, 0, 25)
            end
        end
    end
    desync_length:set_value(desync_amount)
    if not s.use then
        cmd.viewangles.pitch = 89
    end
    local inverter = invert and -1 or 1
    local choked = clientstate.get_choked_commands()
    local type = values.jitter.type
    if ((choked ~= 0 and type == 1) or type == 0) and not s.use then
        local strength = values.jitter.amnt
        strength = (s.jitter_side == 1 and strength or 0) * inverter
        cmd.viewangles.yaw = cmd.viewangles.yaw + strength * s.jitter_side
    end

    local speed = values.auto_invert.speed
    if speed ~= 0 and cmd.tick_count % (speed * 2) == 0 then
        s.should_invert = true
    end

    if speed == 0 and not s.should_invert then s:restore_inverter() end
    if choked > 10 and values.jitter.speed > 1 then
        s.jitter_waiting = 99
    end
    if choked == 0 then
        if s.should_invert then
            inverter_bind:set_key(3)
            inverter_bind:set_type(inverter_bind:get_type() == 0 and 2 or 0)
            s.should_invert = false
        end
    elseif choked == 1 then
        s.jitter_waiting = s.jitter_waiting + 1
        if s.jitter_waiting >= values.jitter.speed then
            s.jitter_side = s.jitter_side * -1
            s.jitter_waiting = 0
        end
    end
    if not s.use then
        cmd.viewangles.yaw = cmd.viewangles.yaw + (invert and values.yaw.left or values.yaw.right)
        if values.jitter.direction == 1 then
            cmd.viewangles.yaw = math.normalize_yaw(cmd.viewangles.yaw - values.jitter.amnt * inverter / 2)
        end
    end
    cmd.viewangles.yaw = math.normalize_yaw(cmd.viewangles.yaw)
end
--[[anti_aim.freestand = function(s, cmd)
    if s.use then return end
    s.freestanding = false
    if not ((autopeek_bind:on() and m_idealpeek.val() and m_idealpeek.elems.freestand.val())
        or s.elements.freestand.on()) or s.manual ~= 1 then return end
    local lp, lp_index = entitylist.lp(), engine.get_local_player()
    if not s.targeted_player then s:get_angle() end
    if not s.targeted_player then return end
    if not s.targeted_player:is_alive() then return end
    if lp:hittable(s.targeted_player, 2) then return end
    local strength = 30
    local pos, origin = lp:predict_origin(6)
    pos.z = lp:get_player_hitbox_pos(0).z
    local yaw = cmd.viewangles.yaw
    local fractions = {}
    local player_origin = s.targeted_player:origin()
    player_origin.z = s.targeted_player:get_player_hitbox_pos(0).z
    for i = yaw - 90, yaw + 90, 45 do
        if i ~= yaw then
            local rad = math.rad(i)
            local cos, sin = math.cos(rad), math.sin(rad)
            local new_head_pos = pos + v(strength * cos, strength * sin, 0)
            local dest = origin + v(256 * cos, 256 * sin, 0)
            local trace1 = trace.line(lp_index, 0x46004003, new_head_pos, player_origin)
            local trace2 = trace.line(lp_index, 0x46004003, origin, dest)
            fractions[#fractions+1] = {i, trace1.fraction / 2 + trace2.fraction / 2}
        end
    end
    table.sort(fractions, function(a, b) return a[2] > b[2] end)
    if fractions[1][2] - fractions[#fractions][2] < 0.5 then return end
    if fractions[1][2] < 0.1 then return end
    cmd.viewangles.yaw = fractions[1][1]
    s.freestanding = true
end]]
anti_aim.fakehead = function(s, cmd)
    local fakehead = s.elements.fakehead
    if s.use or not fakehead.val() then return end
    local lp = entitylist.lp()
    local conditions = fakehead.elems.conditions
    local on = (conditions.val(0) and lp:velocity() < 4)
        or (conditions.val(1) and lp:velocity() > 4)
        or fakehead.elems.bind.on()
    antiaim_enable:set_value(true)
    if not on then s.fakehead_next_tick = 0 return end
    if globalvars.get_tick_count() < s.fakehead_next_tick
        or clientstate.get_choked_commands() == 0 then return end
    s.fakehead_next_tick = globalvars.get_tick_count() + fakehead.elems.speed.max - fakehead.elems.speed.val() + 5
    cmd.viewangles.yaw = cmd.viewangles.yaw + 180 + fakehead.elems.delta.val() * (s.elements.inverter.on() and -1 or 1)
    cmd.viewangles.pitch = 90
    cmd.send_packet = true
    antiaim_enable:set_value(false)
    fakelag_enable:set_value(false)
end
anti_aim.run = function(s, cmd)
    performance.start("anti-aim")
    if s.elements.preset.val() ~= 0 then
        antiaim_enable:set_value(true)
    end
    if s:prevent_e(cmd) then return end
    local lp = entitylist.lp()
    if not lp or not lp:is_alive() then return end
    if s:anti_backstab(cmd) then return end
    s.use = s:legit_aa(cmd)
    --s:freestand(cmd)
    if s.check(cmd) then return end
    --s:att(cmd)
    s:modifiers(cmd)
    s:fakehead(cmd)
    s:manuals(cmd)
    performance.stop("anti-aim")
end
create_move(function(cmd) anti_aim:run(cmd) end)
do
    local aa_type = gui.dropdown("type", anti_aim.types):master(anti_aim.elements.preset, {-1})
    anti_aim.elements.type = aa_type
    local create = function(elements)
        for k, v in pairs(anti_aim.types) do
            local override
            if k > 1 then override = gui.checkbox("override " .. v):master(aa_type, {k - 1}) end
            table.map(elements(v),
            function (e)
                e:master(aa_type, {k - 1})
                if override then e:master(override) end
            end)
        end
    end
    local aa_t = {
        --att = gui.checkbox("at targets"),
        yaw = gui.options("yaw", function()
            create(function(v)
                return {gui.slider(v .. " left", -180, 180, 0),
                        gui.slider(v .. " right", -180, 180, 0)}
            end)
        end),
        desync = gui.options("desync", function()
            gui.checkbox("anti-detect")
            create(function(v)
                return {gui.slider(v .. " left", 0, 60, 37),
                        gui.slider(v .. " right", 0, 60, 37)}
            end)
        end),
        jitter = gui.options("jitter", function()
            gui.checkbox("stabilize")
            create(function(v)
                return {gui.dropdown(v .. " direction", {"offset", "center"}),
                        gui.dropdown(v .. " type", {"body yaw", "eye yaw"}),
                        gui.slider(v .. " amnt", -90, 90, 0),
                        gui.slider(v .. " speed", 1, 16),
                    }
            end)
        end),
        auto_invert = gui.options("auto invert", function()
            create(function(v)
                return {gui.slider(v .. " speed", 0, 16)}
            end)
        end),
        inverter = gui.bind("inverter", 2),
    }
    for _, v in pairs(aa_t) do
        v:master(anti_aim.elements.preset, {-1}) end
    table.add(anti_aim.elements, aa_t)
end
cb("round_freeze_end", function() anti_aim.manual = 1 end)
gui.column("misc")
--local m_freestand = gui.bind("freestand", 2)
--anti_aim.elements.freestand = m_freestand
local m_fakehead = gui.options(gui.checkbox("fake head"), function()
    gui.dropdown("conditions", {"stand", "move", "on peek"}, true)
    gui.bind()
    gui.slider("delta", -140, 140, 79)
    gui.slider("speed", 1, 32, 16)
end)
anti_aim.elements.fakehead = m_fakehead
anti_aim.elements.manual = gui.options(gui.checkbox("manual aa"), function()
    gui.bind("left")
    gui.bind("back")
    gui.bind("right")
    gui.bind("forward")
end):change(function(on, el)
    if not el.val() then
        anti_aim.manual = 1
    end
end)
gui.options(gui.checkbox("roll"), function()
    gui.dropdown("triggers", {"stand", "move", "(fake)duck", "air"}, true)
end):cm(function(cmd, el)
    if anti_aim.in_use then return end
    local lp = entitylist.lp()
    local air = lp:in_air()
    local velocity = lp:velocity()
    local triggers = el.elems.triggers
    local inverter = (inverter_bind:on() and 1 or -1)
    desync_roll:set_value(0)
    if lp:weapon().group == "grenade" and (velocity > 5 or lp:is_throwing()) then
        return
    end
    desync_roll_pitch:set_value(90)
    if velocity > 50 and triggers.val(1) then
        desync_roll:set_value(66)
    end
    if (velocity < 4 and triggers.val(0)) then
        desync_roll:set_value(77 * inverter)
    end
    if air and triggers.val(3) then
        desync_roll:set_value(60 * inverter)
    end
    if entitylist.lp():movement_type() == 4 and triggers.val(2) then
        desync_roll:set_value(66 * inverter)
    end
end):change(function(state, el)
    if not el.val() then desync_roll:set_value(0) end
end):cb("shot_fired", function(i, el)
    el.temp.shoot = true
end)
m_skeet_legs = gui.options(gui.checkbox("skeet legs"), function()
    gui.checkbox("only visual")
end):cm(function(cmd, el)
    local lp = entitylist.lp()
    if not lp or not lp:is_alive() then return end
    lp:set_prop_float(m_.flPoseParameter, 1)
    local choked = clientstate.get_choked_commands()
    local send_packet = choked == 0
    local fakelag = fakelag_limit:get_value()
    local visual = el.elems["only visual"].val()
    if visual then return leg_movement:set_value(2) end
    if extended.get_exploit() or (not extended.get_exploit() and fakelag < 3 and fakelag > 1) then
        return leg_movement:set_value(send_packet and 2 or 1)
    elseif not visual then
        return leg_movement:set_value((send_packet or choked == fakelag - 1 or choked % 2 ~= fakelag % 2) and 2 or 1)
    end
end)
frame_stage(function()
    if not engine.is_connected() then return end
    if globalvars.get_frame_count() % 16 == 0 then
        entitylist.for_enemies(function(e)
            e:restore_poseparam()
        end, true)
    end
    local animbreaker = m_local_player_percs.elems.animbreaker
    local lp = entitylist.lp()
    if not lp then return end
    local alive = lp:is_alive()
    local in_air = lp:in_air() or client.is_key_pressed(32)
    local fakeduck = fakeduck_bind:on()
    local tickcount = globalvars.get_tick_count()
    if m_skeet_legs.val() and alive then
        lp:set_prop_float(m_.flPoseParameter, 1)
        lp:set_poseparam(0, {-180, -179})
    else
        lp:set_poseparam(0, {-180, 180}) end
    if in_air then
        animbreaker.temp.ticks = -1
    elseif animbreaker.temp.ticks < 0 and animbreaker.temp.ticks > -3 then
        animbreaker.temp.ticks = animbreaker.temp.ticks - 1
    elseif animbreaker.temp.ticks <= -3 then
        animbreaker.temp.ticks = tickcount + se.time_to_ticks(0.8)
    end
    if tickcount < animbreaker.temp.ticks and animbreaker.temp.ticks > 0
    and not in_air and not fakeduck and animbreaker.val(1) and alive
    and antiaim_enable:get_value() and not anti_aim.in_use then
        lp:set_poseparam(12, {0.999, 1}) else
        lp:set_poseparam(12, {-90, 90}) end
    if animbreaker.val(0) and in_air and alive then
        lp:set_poseparam(6, {0.9, 1}) else
        lp:set_poseparam(6, {0, 1, 0}) end
end, 5)
cb("unload", function()
    local lp = entitylist.lp()
    if engine.is_connected() or not lp then return end
    lp:restore_poseparam()
end)

gui.tab("visual")

gui.column("main")
gui.options(gui.checkbox("autopeek+"), function()
    local style = gui.dropdown("style", {"neverlose", "sket"})
    gui.color("default", col(255,0,0))
    gui.color("return", col(0,200,0))
    gui.slider("radius", 5, 50, 20)
    gui.slider("step", 1, 10, 3):master(style, {1})
    gui.checkbox("animation", true)
end):cb("frame_stage_notify", function(s, el)
    if s ~= 6 then return end
    local lp = entitylist.lp()
    if not lp or not lp:is_alive() then return end
    local active = autopeek_bind:on()
    if (active and active ~= el.temp.active) or (active and not el.temp.on) then
        el.temp.pos = lp:abs_origin()
        el.temp.on = true
    end
    if not active then el.temp.on = false end
end):paint(function(el)
    local lp = entitylist.lp()
    if not lp or not lp:is_alive() then return end
    local active = autopeek_bind:on()
    local pos = lp:origin()
    if el.temp.shoot and active then
        if pos:dist_to(el.temp.pos) < 7 then
            el.temp.shoot = false
        end
    end
    el.temp.active = active
    if el.temp.anim == nil then el.temp.anim = 0 end
    el.temp.anim = el.elems.animation.val() and render.anim(el.temp.anim, active, 15) or (active and 1 or 0)
    if el.temp.anim <= 0 then
        el.temp.shoot = false
        return
    end
    local anim =  render.easing(el.temp.anim)
    local color = (el.temp.shoot and el.elems["return"].col() or el.elems.default.col()):alp_self(anim)
    local radius = el.elems.radius.val() * anim
    local circle = render.circle_3d
    if el.elems.style.val() == 1 then
        local step = el.elems.step.val() / 100
        color = color:alp_self(15 / 255)
        for i = 0.5, 1, step do
            circle(el.temp.pos, 30 * i, radius * i, color)
        end
    else
        circle(el.temp.pos, 30 * (radius / 20), radius, color:alp_self(0.5), color)
    end
end):cb("shot_fired", function(shot, el)
    el.temp.shoot = true
end)
gui.options(gui.checkbox("3rd person+"), function()
    gui.slider("distance", 30, 200, 75)
    gui.slider("height offset", -15, 15, 0)
    gui.bind(gui.checkbox("animated"), 2)
end):paint(function(el)
    local lp = entitylist.lp()
    if not el.elems.animated.val() then return end
    if el.temp.anim == nil then el.temp.anim = 0 end
    el.temp.anim = render.anim(el.temp.anim, el.elems.animated:on() or not lp:is_alive(), 12)
    thirdperson_bind:set_key(3)
    thirdperson_bind:set_type(el.temp.anim <= 0 and 1 or 0)
    thirdperson:set_value(el.temp.anim > 0)
    se.get_convar("cam_idealdist"):set_int(el.elems.distance.val() * render.easing(el.temp.anim))
end):change(function(on, el)
    local bind = el.elems.animated
    if not el.val() or not bind.val() then
        if bind:get_key() ~= 0 then
            thirdperson_bind:set_key(bind:get_key())
            thirdperson_bind:set_type(bind:get_type())
        end
    end
    if bind.val() then return end
    el.temp.anim = 1
    se.get_convar("cam_idealdist"):set_int(el.elems.distance.val())
end):cb("override_view", function(view, el)
    local lp = entitylist.lp()
    if not lp or not lp:is_alive() then return end
    if not thirdperson_bind:on() then return end
    view.camera_pos = view.camera_pos + v(0, 0, el.elems["height offset"].val() * render.easing(el.temp.anim))
end)
gui.options(gui.checkbox("nade chams"), function()
    gui.checkbox("only for damaging nades")
    gui.checkbox("c4 chams")
end):cb("frame_stage_notify", function(s, el)
    local lp = entitylist.lp()
    if not lp or not lp:is_alive() then
        weapon_chams_enable:set_value(false)
    end
    local weapon = lp:weapon()
    local enable = el.elems["c4 chams"].val() and (weapon.group == "grenade" or weapon.group == "c4") or weapon.group == "grenade"
    if el.elems["only for damaging nades"].val() then
        enable = not not set({"hegrenade", "molotov", "incgrenade"})[weapon.name]
    end
    weapon_chams_enable:set_value(enable)
end)
m_local_player_percs = gui.options("local percs", function()
    gui.options(gui.checkbox("nimbus/hat"), function()
        local type = gui.dropdown("type", {"nimbus", "hat"})
        gui.checkbox("pulse"):master(type, {0})
        gui.color()
    end):paint(function(el)
        local lp = entitylist.lp()
        if not lp or not lp:is_alive() then return end
        if not thirdperson_bind:on() then return end
        local t, pulse = el.elems.type:val(), el.elems.pulse:val()
        local pos = lp:get_player_hitbox_pos(0)
        local high_pos = pos + v(0, 0, (t == 0 and 8 or 8))
        if t == 0 then pos = high_pos end
        local from = se.w2s(high_pos)
        if not from then return end
        local points, col = {from}, el.elems.color:col()
        local radius, last_point, primary, border =
            t == 1 and 10 or 4, nil, col:alpha(102), col:alpha(pulse and (render.easing(render.pulsate(5)) * 255) or 255)
        local velocity = lp:velocity()
        local step = math.pi * 2 / (velocity > 50 and 20 or 25)
        local sin, cos, line, w2s = math.sin, math.cos, renderer.line, se.w2s
        for a = 0, math.pi * 2, step do
            local start = w2s((v(cos(a), sin(a)) * radius + pos):to3(pos.z))
            if start then
                local endp = w2s((v(cos(a + step), sin(a + step)) * radius + pos):to3(pos.z))
                if endp then
                    line(start, endp, border)
                    points[#points+1] = start
                    last_point = endp
                end
            end
        end
        if t == 1 and last_point then
            points[#points+1] = last_point
            renderer.filled_polygon(points, primary)
        end
    end)
    local mask_paths = {
        'facemask_battlemask',
        'evil_clown',
        'facemask_anaglyph',
        'facemask_bunny',
        'facemask_bunny_gold',
        'facemask_chains',
        'facemask_chicken',
        'facemask_dallas',
        'facemask_devil_plastic',
        'facemask_hoxton',
        'facemask_porcelain_doll_kabuki',
        'facemask_pumpkin',
        'facemask_samurai',
        'facemask_sheep_bloody',
        'facemask_sheep_gold',
        'facemask_sheep_model',
        'facemask_skull',
        'facemask_skull_gold',
        'facemask_tiki',
        'facemask_wolf',
        'porcelain_doll',
    }
    local m_mask_changer = gui.options(gui.checkbox("mask changer"), function()
        gui.dropdown("mask", {
            'Battler Mask',
            'Evil Clown',
            'Anag Lyph',
            'Bunny',
            'Bunny Gold',
            'Chains',
            'Chicken',
            'Dallas',
            'Devil Plastic',
            'Hoxton',
            'Porcelain Doll Kabuki',
            'Pumpkin',
            'Samurai',
            'Sheep Bloody',
            'Sheep Gold',
            'Sheep Model',
            'Skull',
            'Skull Gold',
            'Tiki',
            'Wolf',
            'Doll'
        })
    end)
    frame_stage(function()
        local lp = entitylist.lp()
        if not lp or not lp:is_alive() then return end
        if not thirdperson_bind:on() then return end
        local addon_bits, bits = lp:get_prop_int(m_.iAddonBits), 0x10000
        if m_mask_changer.val() then
            lp:set_prop_int(m_.iAddonBits, bit32.bor(addon_bits, bits))
            local addr = ffi.cast("intptr_t*", lp:address())
            if not addr then return end
            local m_AddonModelsHead = ffi.cast("intptr_t*", addr + 0x462F) -- E8 ? ? ? ? A1 ? ? ? ? 8B CE 8B 40 10
            local i, next_model = m_AddonModelsHead[0], -1
            while i ~= -1 do
                next_model = ffi.cast("intptr_t*", addr + 0x462C)[0] + 0x18 * i
                i = ffi.cast("intptr_t*", next_model + 0x14)[0]
                local m_pEnt = ffi.cast("intptr_t**", next_model)[0]
                local m_iAddon = ffi.cast("intptr_t*", next_model + 0x4)[0]
                if tonumber(m_iAddon) == 16 then
                    local entity = ffp.get_ent_address_from_handle(m_pEnt)
                    local val = m_mask_changer.elems.mask.val() + 1
                    ffp.models.change(entity, "models/player/holiday/facemasks/" .. mask_paths[val] .. ".mdl")
                end
            end
        else
            lp:set_prop_int(m_.iAddonBits, bit32.band(addon_bits, bit32.bnot(bits)))
        end
    end, 5)
    local m_agent = {
        "professional_varj", "professional_vari", "professional_varh", "professional_varg",
        "professional_varf5", "professional_varf4", "professional_varf3", "professional_varf2",
        "professional_varf1", "professional_varf",
        "phoenix_varianti", "phoenix_varianth",  "phoenix_variantg", "phoenix_variantf",
        "leet_variantj", "leet_varianti", "leet_varianth",
        "leet_variantj", "leet_variantg", "leet_variantf",
        "jungle_raider_variantf2", "jungle_raider_variantf", "jungle_raider_variante", "jungle_raider_variantd",
        "jungle_raider_variant c", "jungle_raider_variantb2", "jungle_raider_variantb", "jungle_raider_varianta",
        "balkan_varianth", "balkan_variantj", "balkan_varianti", "balkan_variantf",
        "balkan_variantg", "balkan_variantk", "balkan_variantl",
        "jumpsuit_varianta", "jumpsuit_variantb", "jumpsuit_variantc"
    }
    local m_ctagent = {
        "diver_varianta", "diver_variantb", "diver_variantc",
        "fbi_varianth", "fbi_variantf", "fbi_variantb", "fbi_variantg",
        "gendarmerie_varianta", "gendarmerie_variantb", "gendarmerie_variantc",
        "gendarmerie_variantd", "gendarmerie_variante",
        "sas_variantg", "sas_variantf",
        "st6_variante", "st6_variantg",  "st6_varianti", "st6_variantj",
        "st6_variantk", "st6_variantl", "st6_variantm", "st6_variantn",
        "swat_variante",  "swat_variantf", "swat_variantg", "swat_varianth",
        "swat_varianti", "swat_variantj", "swat_variantk",
    }
    gui.options(gui.checkbox("agent changer"), function()
        local m_list = {
            "Getaway Sally | The Professionals",
            "Number K | The Professionals",
            "Little Kev | The Professionals",
            "Safecracker Voltzmann | The Professionals",
            "Bloody Darryl The Strapped | The Professionals",
            "Sir Bloody Loudmouth Darryl | The Professionals",
            "Sir Bloody Darryl Royale | The Professionals",
            "Sir Bloody Skullhead Darryl | The Professionals",
            "Sir Bloody Silent Darryl | The Professionals",
            "Sir Bloody Miami Darryl | The Professionals",
            "Street Soldier | Phoenix",
            "Soldier | Phoenix",
            "Slingshot | Phoenix",
            "Enforcer | Phoenix",
            "Mr. Muhlik | Elite Crew",
            "Prof. Shahmat | Elite Crew",
            "Osiris | Elite Crew",
            "Jungle Rebel | Elite Crew",
            "Ground Rebel | Elite Crew",
            "The Elite Mr. Muhlik | Elite Crew",
            "Trapper | Guerrilla Warfare",
            "Trapper Aggressor | Guerrilla Warfare",
            "Vypa Sista of the Revolution | Guerrilla Warfare",
            "Col. Mangos Dabisi | Guerrilla Warfare",
            "Arno The Overgrown | Guerrilla Warfare",
            "'Medium Rare' Crasswater | Guerrilla Warfare",
            "Crasswater The Forgotten | Guerrilla Warfare",
            "Elite Trapper Solman | Guerrilla Warfare",
            "'The Doctor' Romanov | Sabre",
            "Blackwolf | Sabre",
            "Maximus | Sabre",
            "Dragomir | Sabre",
            "Rezan The Ready | Sabre",
            "Rezan the Redshirt | Sabre",
            "Dragomir | Sabre Footsoldier",
            "Danger Zone | Variant A",
            "Danger Zone | Variant B",
            "Danger Zone | Variant C",
        }
        local m_ctlist = {
            "Cmdr. Davida 'Goggles' Fernandez | SEAL Frogman",
            "Cmdr. Frank 'Wet Sox' Baroud | SEAL Frogman",
            "Lieutenant Rex Krikey | SEAL Frogman",
            "Michael Syfers | FBI Sniper",
            "Operator | FBI SWAT",
            "Special Agent Ava | FBI",
            "Markus Delrow | FBI HRT",
            "Sous-Lieutenant Medic | Gendarmerie Nationale",
            "Chem-Haz Capitaine | Gendarmerie Nationale",
            "Chef d'Escadron Rouchard | Gendarmerie Nationale",
            "Aspirant | Gendarmerie Nationale",
            "Officer Jacques Beltram | Gendarmerie Nationale",
            "D Squadron Officer | NZSAS",
            "B Squadron Officer | SAS",
            "Seal Team 6 Soldier | NSWC SEAL",
            "Buckshot | NSWC SEAL",
            "Lt. Commander Ricksaw | NSWC SEAL",
            "'Blueberries' Buckshot | NSWC SEAL",
            "3rd Commando Company | KSK",
            "'Two Times' McCoy | TACP Cavalry",
            "'Two Times' McCoy | USAF TACP",
            "Primeiro Tenente | Brazilian 1st Battalion",
            "Cmdr. Mae 'Dead Cold' Jamison | SWAT",
            "1st Lieutenant Farlow | SWAT",
            "John 'Van Healen' Kask | SWAT",
            "Bio-Haz Specialist | SWAT",
            "Sergeant Bombson | SWAT",
            "Chem-Haz Specialist | SWAT",
            "Lieutenant 'Tree Hugger' Farlow | SWAT",
        }
        local based = gui.dropdown("agents", {"terrorist", "counter terrorist", "team based", "inverted"})
        gui.dropdown("terrorist", m_list):master(based, {-2})
        gui.dropdown("counter terrorist", m_ctlist):master(based, {-1})
    end):cb("frame_stage_notify", function (s, el)
        if s ~= 2 then return end
        local lp = entitylist.lp()
        if not lp or not lp:is_alive() then return end
        ct_agent:set_value(0)
        t_agent:set_value(0)
        local team = lp:get_prop_int(m_.iTeamNum)
        local agent = el.elems.agents.val()
        local modelst  = "tm_" .. m_agent[el.elems.terrorist.val() + 1]
        local modelsct = "ctm_" .. m_ctagent[el.elems["counter terrorist"].val() + 1]
        local model = ""
        if team == 2 then
            model = (agent == 1 or agent == 3) and modelsct or modelst
        elseif team == 3 then
            model = (agent == 0 or agent == 3) and modelst or modelsct
        end
        lp:change_model("models/player/custom_player/legacy/" .. model .. ".mdl")
    end)
    local local_chams_enable = ui.get_check_box("visuals_models_local_enable")
    local local_chams_color = ui.get_color_edit("visuals_models_local_color")
    local local_chams_cache = local_chams_color:get_value().a
    local local_chams_changed = false
    gui.options(gui.checkbox("scope transparency"), function()
        gui.slider("value", 0, 255, 175)
    end):paint(function(el)
        local_chams_enable:set_value(true)
        function backup()
            if not local_chams_changed then
                local_chams_cache = local_chams_color:get_value().a
            else
                local_chams_changed = false
                local_chams_color:set_value(local_chams_color:get_value():alpha(local_chams_cache))
            end
        end
        local lp = entitylist.lp()
        if not lp or not lp:is_alive() then return backup() end
        if ui.is_visible() then return backup() end
        if lp:is_scoped() then
            local_chams_changed = true
            local_chams_color:set_value(local_chams_color:get_value():alpha(el.elems.value.val()))
        else backup() end
    end):change(function(on, el)
        if not el.val() then
            local_chams_color:set_value(local_chams_color:get_value():alpha(local_chams_cache))
        end
    end)
    local trail_history = {}
    gui.options(gui.checkbox("trail"), function()
        gui.slider("length", 20, 500, 100)
        gui.color(gui.checkbox("custom color"))
        gui.checkbox("fade", true)
    end):paint(function(el)
        local lp = entitylist.lp()
        if not lp or not lp:is_alive() then trail_history = {} return end
        local trail_length = el.elems.length.val()
        local fade = el.elems.fade.val()
        local color = el.elems["custom color"]
        table.insert(trail_history, 1, {
            pos = lp:abs_origin(),
            color = color.val() and color:col() or render.HSVToRGB({globalvars.get_real_time(), 1, 1, 255})
        })
        if #trail_history < 1 then return end
        for i, trail in pairs(trail_history) do
            if i >= trail_length then
                table.remove(trail_history, i)
            elseif trail_history[i-1] then
                local alpha = fade and render.easing_in(clamp((trail_length - i) / trail_length, 0, 1)) or 1
                if alpha > 0 then
                    local pos = se.w2s(trail.pos)
                    trail_history[i].w2s = pos
                    local pos_next = trail_history[i-1].w2s or se.w2s(trail_history[i-1].pos)
                    if pos and pos_next then
                        renderer.line(pos, pos_next, trail.color:alp_self(alpha)) end
                end
            end
        end
    end)
    local animbreaker = gui.dropdown("animbreaker", {"static legs in air", "pitch 0 on land"}, true)
    animbreaker.temp.ticks = 0
    gui.dropdown("skin color", {"default", "black", "gray", "asian", "brown", "tattoo", "nigger", "white"}):change(function(on)
        se.get_convar("r_skin"):set_int(on)
    end)
end)
gui.options("hit visuals", function()
    local markers = {}
    local temp_marker = {positions = {}}
    gui.options(gui.checkbox("hit effect"), function ()
        gui.slider("duration", 10, 200, 50)
    end):cb("player_hurt", function(e, el)
        if se.player_hurt_check(e) ~= 1 then return end
        entitylist.lp():set_prop_float(m_.flHealthShotBoostExpirationTime, globalvars.get_current_time() +
            el.elems.duration.val() / (e:get_int("health", 0) <= 0 and 50 or 100))
    end)
    gui.options(gui.checkbox("hit marker"), function()
        gui.dropdown("type", {"default", "diagonal"})
        gui.slider("size", 1, 10, 2)
        gui.slider("offset", 0, 10)
        gui.color()
    end):paint(function(el)
        local color = el.elems.color:col()
        local type = el.elems.type.val()
        local s = el.elems.size.val()
        local o = el.elems.offset.val()
        for _, mark in pairs(markers) do
            pcall(function()
                if mark.not_shot then return end
                local anim = render.easing_in(mark.anim_long)
                local pos = se.w2s(mark.pos)
                local c = color:alp_self(1 - anim)
                if pos then
                    if type == 1 then
                        renderer.line(pos + v(s, s) + v(o, o), pos + v(o, o), c)
                        renderer.line(pos - v(o, o), pos - v(s, s) - v(o, o), c)
                        renderer.line(pos + v(-s, s) + v(-o, o), pos + v(-o, o), c)
                        renderer.line(pos + v(o, -o), pos + v(s, -s) + v(o, -o), c)
                    else
                        renderer.line(pos + v(s, 0) + v(o, 0), pos + v(o, 0), c)
                        renderer.line(pos + v(-s, 0) + v(-o, 0), pos + v(-o, 0), c)
                        renderer.line(pos + v(0, s) + v(0, o), pos + v(0, o), c)
                        renderer.line(pos + v(0, -s) + v(0, -o), pos + v(0, -o), c)
                    end
                end
            end)
        end
    end)
    -- local font = render.font("nix/storm/fonts/MuseoSansBlack.ttf", 11, 16)
    gui.options(gui.checkbox("damage marker"), function()
        gui.color("hit")
        gui.color("kill")
    end):paint(function (el)
        local colors = {el.elems.hit:col(), el.elems.kill:col()}
        --local kill_outline_color = render.contrast_color(colors[2])
        for _, mark in pairs(markers) do
            pcall(function()
                local anim = render.easing(mark.anim)
                local short_anim = render.easing(1 - mark.anim)
                local pos = se.w2s(mark.pos + v(0, 0, 150 * anim))
                --local outline = kill_outline_color:alpha(render.outline_alpha(short_anim))
                if pos and anim ~= 1 then
                    render.text_shadow(tostring(mark.dmg), pos, gui.fonts.misc, colors[mark.killed and 2 or 1]:alp_self(short_anim), v(1, 1), col(0,0,0,200))
                end
            end)
        end
    end)
    local m_lightning = gui.options(gui.checkbox("lightning"), function()
        gui.color()
        gui.slider("width", 0, 30, 10)
        gui.slider("radius", 0, 1000, 500)
        gui.slider("density", 0, 100, 12)
        gui.slider("time", 0, 500, 75)
        gui.dropdown("type", {"v1", "v2"})
    end)
    function create_tesla(pos)
        if not m_lightning.val() then return end
        local tesla = ffi.new("struct tesla_info_t")
        local c = m_lightning.elems.color.col()
        tesla.m_flbeamwidth = m_lightning.elems.width.val()
        tesla.m_flradius = m_lightning.elems.radius.val()
        tesla.m_color = {c.r/255, c.g/255, c.b/255}
        tesla.m_fltimevis = m_lightning.elems.time.val() / 100
        tesla.m_pos = pos:table()
        tesla.m_ang = {0, 0, 0}
        tesla.m_nbeams = m_lightning.elems.density.val()
        tesla.m_entindex = entitylist.lp():get_index()
        tesla.m_spritename = m_lightning.elems.type.val() == 1 and "sprites/physbeam.vmt"
            or "sprites/purplelaser1.vmt"
        ffp.create_tesla(tesla)
    end
    cb("bullet_impact", function(e)
        local lp = entitylist.lp()
        if not lp or not lp:is_alive() then return end
        local id  = lp:info().user_id
        if e:get_int("userid", 0) ~= id then return end
        local vec = v(e:get_float("x", 0), e:get_float("y", 0), e:get_float("z", 0))
        temp_marker.tickcount = globalvars.get_tick_count()
        temp_marker.positions[#temp_marker.positions + 1] = vec
        temp_marker.anim = 0
        temp_marker.anim_long = 0
        temp_marker.last_pos = vec
    end)
    cb("player_hurt", function (e)
        local lp = entitylist.lp()
        if not lp or not lp:is_alive() then return end
        if se.player_hurt_check(e) < 1 then return end
        local ent = entitylist.by_userid(e:get_int("userid", 0))
        local hitbox = se.hitgroup_to_hitbox(e:get_int("hitgroup", 0))
        if not hitbox then return end
        local pos = ent:get_player_hitbox_pos(hitbox)
        local dmg, health = e:get_int("dmg_health", 0), e:get_int("health", 0)
        if temp_marker.tickcount ~= globalvars.get_tick_count() then
            if temp_marker.tickcount == nil then
                markers[#markers+1] = {
                    anim = 0,
                    anim_long = 0,
                    pos = pos,
                    dmg = dmg,
                    not_shot = true,
                    killed = health <= 0
                }
            end return
        end
        temp_marker.dmg = dmg
        temp_marker.killed = health <= 0
        table.sort(temp_marker.positions, function(a, b) return a:dist_to(pos) < b:dist_to(pos) end)
        temp_marker.pos = temp_marker.positions[1]
        markers[#markers+1] = temp_marker
        create_tesla(temp_marker.pos)
        temp_marker = {positions = {}}
    end)
    paint(function()
        for index, mark in pairs(markers) do
            mark.anim = render.anim(mark.anim, true, 0.5)
            mark.anim_long = render.anim(mark.anim_long, true, 0.25)
            if mark.anim_long == 1 then table.remove(markers, index) end
        end
    end)
end)
-- paint(function() --hitbox debug
--     local lp = entitylist.lp()
--     for i = 0, 18 do
--         local pos = se.w2s(lp:get_player_hitbox_pos(i))
--         render.dot(pos)
--         render.text(se.hitbox_name(i) .. "[" .. tostring(i) .. "]", pos, gui.fonts.small, col(255,255,255))
--     end
-- end)
gui.options("world indicators", function()
    local csgo_icons = render.font("nix/storm/fonts/csgo_icons.ttf", 24, 0)
    local big_font = render.font("C:/Windows/Fonts/verdana.ttf", 27, 0)
    local function get_points(pos, points)
        for i = 1, 3 do
            local p = i * (360 / 3) * (math.pi / 200)
            table.insert(points, se.w2s(
                (v(math.cos(p), math.sin(p)) * 60 + pos):to3(pos.z)
            ))
        end
        return points
    end
    gui.color(gui.checkbox("bomb")):paint(function (el)
        local c4 = entitylist.get_entities_by_class("CPlantedC4")[1]
        if not c4 then return end
        local pos = se.w2s(c4:origin()):func(math.round)
        if not pos then return end
        local blow = c4:get_prop_float(m_.flC4Blow)
        local factor = clamp(1 - (blow + 1 - globalvars.get_current_time()) / (c4:get_prop_float(m_.flTimerLength) + 1), 0, 1)
        local defuse_factor = clamp(1 - (blow - 5 - globalvars.get_current_time()) / (c4:get_prop_float(m_.flTimerLength) - 5), 0, 1)
        if factor == 1 or c4:get_prop_int(m_.bBombDefused) == 1 then return end
        local defuse_length = c4:get_prop_float(m_.flDefuseLength)
        local faded_color = render.fade_color(el:col(), col(255, 40, 40), render.easing_in(defuse_factor))
        local countdown = c4:get_prop_float(m_.flDefuseCountDown)
        local defusing = c4:get_prop_int(m_.hBombDefuser) ~= -1
        if defusing then
            factor = clamp(1 - (countdown - globalvars.get_current_time()) / defuse_length, 0, 1)
            faded_color = render.fade_color(col(52, 143, 235), col(52, 235, 52), render.easing_in(factor))
        end
        local not_defusable = (globalvars.get_current_time() + 5 > blow) and (defusing and countdown > blow or not defusing)
        if not_defusable then
            faded_color = col(255, 0, 0) end
        render.arc(pos - v(0.5, 0.5), 15.5, 270, factor * 360, false, 100 + 100 * factor, faded_color)
        render.arc(pos - v(0.75, 0.5), 16, 270, factor * 360, false, 100 + 100 * factor, faded_color)
        renderer.circle(pos, 14, 50, true, col(30, 30, 30))
        if not_defusable then
            render.text("!", pos - v(4, 15), big_font, col(255, 255, 255))
        else
            render.text("M", pos - v(11, 12), csgo_icons, col(255, 255, 255)) end
    end)
    x_smoke = gui.options(gui.checkbox("smoke"), function()
        gui.color("color", col(152, 152, 152))
        gui.checkbox("filled", false)
    end):paint(function ()
        grenade_esp_enable:set_value(false)
        local el = x_smoke.elems
        local lp = entitylist.lp()
        local origin = lp:origin()
        local smokes = entitylist.get_entities_by_class("CSmokeGrenadeProjectile")
        if not smokes or #smokes == 0 then return end
        for i = 1, #smokes do
            pcall(function()
                local pos = smokes[i]:origin()
                if pos and smokes[i]:get_prop_bool(m_.bDidSmokeEffect) then
                    local time = smokes[i]:get_prop_int(m_.nSmokeEffectTickBegin) * globalvars.get_interval_per_tick()
                    local factor = clamp(1 - (time + 18 - globalvars.get_current_time()) / 18, 0, 1)
                    if factor ~= 1 then
                        local fade = clamp(factor * 180, 0, 1)
                        local color = el["color"].col():alp_self(fade)
                        local points = 35 / clamp(pos:dist_to(origin) / 400, 1, 3.5)
                        render.circle_3d(pos, points, 125, (el["filled"].val() and color:alp_self(fade / 2) or false), color)
                        pos = se.w2s(pos):func(math.round)
                        render.arc(pos - v(0.5, 0.5), 15.5, 270, factor * 360, false, 100 + 100 * factor, color)
                        render.arc(pos - v(0.75, 0.5), 16, 270, factor * 360, false, 100 + 100 * factor, color)
                        renderer.circle(pos, 14, 50, true, col(30, 30, 30, fade * 255))
                        render.text("I", pos - v(5.1, 13), csgo_icons, col(255, 255, 255, fade * 255))
                    end
                end
            end)
        end
    end)
    x_mol = gui.options(gui.checkbox("molotov"), function()
        gui.color("color", col(255, 110, 79))
        gui.checkbox("filled", true)
    end):paint(function ()
        grenade_esp_enable:set_value(false)
        local el = x_mol.elems
        local infernos = entitylist.get_entities_by_class("CInferno")
        if not infernos or #infernos == 0 then return end
        for i = 1, #infernos do
            pcall(function()
                local inf, fires, points = infernos[i], {}, {}
                local origin, count = inf:origin(), inf:get_prop_int(m_.fireCount) - 1
                for j = 0, count do
                    if inf:get_prop_bool(m_.bFireIsBurning + j) then
                        local pos = v(  inf:get_prop_int(m_.fireXDelta + j * 4) + origin.x,
                                        inf:get_prop_int(m_.fireYDelta + j * 4) + origin.y,
                                        inf:get_prop_int(m_.fireZDelta + j * 4) + origin.z)
                        if pos then table.insert(fires, pos) end
                    end
                end
                for j=1, #fires do points = get_points(fires[j], points) end
                points = render.convex_hull(points)
                local time = infernos[i]:get_prop_int(m_.nFireEffectTickBegin) * globalvars.get_interval_per_tick()
                local factor = clamp(1 - (time + 7 - globalvars.get_current_time()) / 7, 0, 1)
                local fade = clamp(factor * 40, 0, 1)
                if el["filled"].val() then renderer.filled_polygon(points, el["color"].col():alp_self(fade / 2)) end
                render.polygon_outline(points, el["color"].col():alp_self(fade))
                local pos = se.w2s(origin):func(math.round)
                local faded_color = render.fade_color(col(255, 40, 40), el["color"].col(), render.easing_in(factor)):alp_self(fade)
                render.arc(pos - v(0.5, 0.5), 15.5, 270, factor * 360, false, 100 + 50 * factor, faded_color)
                render.arc(pos - v(0.75, 0.5), 16, 270, factor * 360, false, 100 + 50 * factor, faded_color)
                renderer.circle(pos, 14, 50, true, col(30, 30, 30, fade * 255))
                local icon = renderer.setup_texture("nix/storm/inferno.png")
                render.texture(icon, pos - v(10, 11), pos + v(10, 9), col(255,255,255, fade * 255))
            end)
        end
    end)
    gui.options(gui.checkbox("bullet impacts"), function()
        local time = gui.slider("time", 1, 10, 4)
        gui.color(gui.checkbox("client"), col(255, 0, 0, 127)):cb("shot_fired", function(i, el)
            local lp = entitylist.lp()
            if not lp or not lp:is_alive() then return end
            render.add_box_overlay(i.aim_point, el.col(), time.val())
        end)
        gui.color(gui.checkbox("server"), col(0, 0, 255, 127)):cb("bullet_impact", function(e, el)
            local lp = entitylist.lp()
            if not lp or not lp:is_alive() then return end
            local id  = lp:info().user_id
            if e:get_int("userid", 0) ~= id then return end
            local pos = v(e:get_float("x", 0), e:get_float("y", 0), e:get_float("z", 0))
            render.add_box_overlay(pos, el.col(), time.val())
        end)
    end)
    local current_pos
    gui.options(gui.checkbox("bullet tracers"), function()
        gui.color()
        gui.slider("time", 1, 10, 4)
    end):cb("bullet_impact", function(e, el)
        local lp = entitylist.lp()
        if not lp then return end
        local id  = lp:info().user_id
        if e:get_int("userid", 0) ~= id then return end
        local pos = v(e:get_float("x", 0), e:get_float("y", 0), e:get_float("z", 0))
        current_pos = pos
    end):cm(function(cmd, el)
        local lp = entitylist.lp()
        if not lp or not lp:is_alive() then current_pos = nil return end
        render.add_line_overlay(lp:get_eye_pos(), current_pos, el.elems.color.col(), el.elems.time.val())
        current_pos = nil
    end)
end)
gui.options("world modulation", function()
    gui.options(gui.checkbox("fog [!]"), function()
        gui.color()
        gui.slider("start", 0, 2500, 0)
        gui.slider("end", 0, 2500, 2500)
        gui.slider("density", 0, 100, 33)
    end)
    gui.options(gui.checkbox("shadows"), function()
        gui.slider("x", -100, 100, 0)
        gui.slider("y", -100, 100, 0)
        --gui.slider("dist 1", 0, 5000, 5000)
        --gui.slider("dist 2", -1, 5000)
    end):change(function (on, el)
        se.get_convar("cl_csm_rot_override"):set_int(el.val() and 1 or 0)
        se.get_convar("cl_csm_rot_x"):set_int(el.elems.x.val())
        se.get_convar("cl_csm_rot_y"):set_int(el.elems.y.val())
        --se.get_convar("cl_csm_max_visible_dist"):set_int(el:find("1").val())
        --se.get_convar("cl_csm_max_shadow_dist"):set_int(el:find("2").val())
    end)
    local change_skybox = ffi.cast("void(__thiscall*)(const char*)", client.find_pattern("engine.dll", "55 8B EC 81 EC ? ? ? ? 56 57 8B F9 C7 45"))
    local skyboxes = {
        "cs_tibet",
        "embassy",
        "italy",
        "jungle",
        "office",
        "sky_cs15_daylight01_hdr",
        "sky_cs15_daylight02_hdr",
        "sky_cs15_daylight03_hdr",
        "sky_cs15_daylight04_hdr",
        "sky_csgo_cloudy01",
        "sky_csgo_night02",
        "sky_csgo_night02b",
        "sky_csgo_night_flat",
        "sky_day02_05",
        "sky_day02_05_hdr",
        "sky_dust",
        "sky_venice",
        "vertigo",
        "vertigo_hdr",
        "vertigoblue_hdr",
        "vietnam"
    }
    local skybox_files = extended.dir("csgo/materials/skybox/", ".vtf", true)
    do
        local custom_skyboxes = {}
        for i = 1, #skybox_files do
            custom_skyboxes[skybox_files[i]:sub(1, -3)] = true end
        for k, _ in pairs(custom_skyboxes) do
            skyboxes[#skyboxes+1] = k end
    end
    local cv_skyname = se.get_convar("sv_skyname")
    local cv_3dsky = se.get_convar("r_3dsky")
    local m_skybox, m_props, m_world
    local function skybox_update()
        if not m_skybox.val() then return end
        cv_3dsky:set_int(not m_skybox.elems["disable original"].val() and 1 or 0)
        change_skybox(skyboxes[m_skybox.elems.material.val()+1])
    end
    local update_all = true
    local old_colors = {
        sky = col(255, 255, 255),
        prop = col(255, 255, 255),
        world = col(255, 255, 255)
    }
    local function material_update()
        performance.start("material update")
        local i = ffp.material.first_material()
        local sky_color, prop_color, world_color =
            m_skybox.elems.color.col(), m_props.col(), m_world.col()
        if not m_skybox.val() then sky_color = col(255, 255, 255) end
        if not m_props.val() then prop_color = col(255, 255, 255) end
        if not m_world.val() then world_color = col(255, 255, 255) end
        while i ~= ffp.material.invalid_material() do
            local mat = ffi.cast("void***", ffp.material.find_material(i))
            local c_mat = ffi.cast("int*", mat)[0]
            if not ffp.material.functions[c_mat] then
                ffp.material.functions[c_mat] = {
                    get_group = ffi.cast("const char*(__thiscall*)(void*)", mat[0][1]),
                    mod_alpha = ffi.cast("void(__thiscall*)(void*, float)", mat[0][27]),
                    mod_color = ffi.cast("void(__thiscall*)(void*, float, float, float)", mat[0][28])
                }
                ffp.material.functions[c_mat].mod = function(s, m, c)
                    s.mod_color(m, c.r / 255, c.g / 255, c.b / 255)
                    s.mod_alpha(m, c.a / 255)
                end
            end
            local fns = ffp.material.functions[c_mat]
            local group = ffi.string(fns.get_group(mat))
            local sky, prop, world = group:find("Sky"), group:find("StaticProp"), group:find("World")
            if sky then
                fns:mod(mat, sky_color)
            end
            if prop then
                fns:mod(mat, prop_color, true)
            end
            if world then
                fns:mod(mat, world_color, true)
            end
            i = ffp.material.next_material(i)
        end
        performance.stop("material update")
    end
    m_skybox = gui.options(gui.checkbox("skybox"), function()
        gui.dropdown("material", skyboxes)
        gui.checkbox("disable original")
        gui.color()
    end):change(function(val, el)
        if not el.val() then
            return change_skybox(cv_skyname:get_string()) end
        if nightmode:get_value() then
            nightmode:set_value(false)
            m_world.el:set_value(true)
            m_world.color.el:set_value(nightmode_color:get_value())
        end
        pcall(skybox_update)
        pcall(material_update)
    end)
    m_world = gui.color(gui.checkbox("world")):change(function(val, el)
        pcall(material_update)
    end)
    local r_DrawSpecificStaticProp = se.get_convar("r_DrawSpecificStaticProp")
    m_props = gui.color(gui.checkbox("props")):change(function(val, el)
        r_DrawSpecificStaticProp:set_int(not el.val() and 1 or 0)
        pcall(material_update)
    end)
    local function handle_update() update_all = true end
    frame_stage(function()
        performance.start("modulation frame_stage")
        if not engine.is_connected() then return end
        local sky_color, prop_color, world_color =
            m_skybox.elems.color.col(), m_props.col(), m_world.col()
        if old_colors.sky ~= sky_color
            or old_colors.prop ~= prop_color
            or old_colors.world ~= world_color then
            update_all = true
        end
        old_colors = {
            sky = sky_color,
            prop = prop_color,
            world = world_color
        }
        performance.stop("modulation frame_stage")
        if not update_all then return end
        pcall(material_update)
        pcall(skybox_update)
        r_DrawSpecificStaticProp:set_int(not m_props.val() and 1 or 0)
        update_all = false
    end, 5)
    cb("cs_pre_restart", handle_update)
    cb("game_newmap", handle_update)
    cb("player_spawn", handle_update)
    cb("player_spawned", handle_update)
    cb("player_connect", handle_update)
end)

gui.column("interface")
indicators.fonts = {
    verdana = render.font("C:/Windows/Fonts/verdanab.ttf", 13, render.flags.NoAutoHint),
    verdana_small = render.font("C:/Windows/Fonts/verdanab.ttf", 9, render.flags.NoAutoHint),
    pixel = render.font("nix/storm/fonts/pixel.ttf", 10, render.flags.Monochrome),
}
local inverter_arrows = draggable.new({}, v(0, 0), ss / 2)
local damage_indicator = draggable.new({}, v(60, 14), ss / 2 - v(-4, 50))
m_indicators = gui.options(gui.checkbox("indicators", false), function()
    local styling = gui.dropdown("style", {"default", "new"})
    gui.dropdown("optimization", {"none", "shadow", "outline"}, false, 2):master(styling, {0})
    gui.checkbox("centered", true)
    gui.checkbox("move state", true):master(styling, {0})
    gui.checkbox("inverter based"):master(styling, {0})
    gui.checkbox("pulse"):master(styling, {0})
    gui.color(gui.checkbox("custom color")):master(styling, {0})
end):paint(function() indicators:render() end)
indicators = draggable.new(indicators, v(70, 45), ss / 2)
indicators:add(function(ind, pos, a)
    local inverter_based = m_indicators.elems["inverter based"].val()
    local invert = inverter_bind:on()
    local pulsate = m_indicators.elems.pulse.val()
    local pulse = pulsate and render.easing(render.pulsate(5)) or 1
    local custom = m_indicators.elems["custom color"]
    custom = custom.val() and custom.col()
    local fade_colors = {
        col(234, 234, 234),
        custom or gui.colors.storm,
    }
    local invert_anim = anim.lerp("indicators_invert_anim", invert and 255 or 0, 24) / 255
    if not pulsate then invert_anim = invert and 1 or 0 end
    local colors = {
        left = render.fade_color(fade_colors[1], fade_colors[2], invert_anim),
        right = render.fade_color(fade_colors[1], fade_colors[2], 1 - invert_anim),
    }
    local alp = {a, a}
    if not inverter_based then
        colors = {
            left = fade_colors[1],
            right = fade_colors[2]:alp(pulse),
        }
        alp[2] = 0.5 + pulse / 2
    end
    indicators.text(pos - v(1, 1), {
        {"o         ", col(234, 234, 234, a), alp[1]},
        {"           o", col(234, 234, 234, a), alp[1]}
    }, indicators.fonts.verdana_small)
    indicators.text(pos + v(6, 0) * (1 - indicators.anim), {
        {"sto", colors.left, alp[1]},
        {"rm", colors.right, alp[2]}
    }, indicators.fonts.verdana, 1 - a)
end, v(0, 12), function() return m_indicators.elems["style"].val() == 0 end)
indicators:add(function(ind, pos, a)
    local exploit = (exploit_bind:on() and active_exploit:get_value()) or 0
    local lp = entitylist.lp()
    local mode = ({"stand", "walk", "move", "air", "crouch"})[lp:movement_type() + 1]
    if anti_aim.manual ~= 1 then mode = "manual" end
    --if m_freestand.on() then mode = "freestand" end
    if m_fakehead.elems.bind.on() then mode = "fake-head" end
    if autopeek_bind:on() then mode = "peek" end
    if fakeduck_bind:on() and not lp:in_air() then mode = "fakeduck" end
    if autopeek_bind:on() and exploit == 2 then mode = "dt-peek" end
    --if autopeek_bind:on() and m_idealpeek.elems.freestand.val() then mode = "ideal-peek" end
    local custom = m_indicators.elems["custom color"]
    local color = (custom:val() and custom:col() or gui.colors.storm):alpha(a)
    indicators.text(pos, {
        {mode, color, a / 1.5},
    }, indicators.fonts.pixel, 1 - a)
end, v(0, 9), function() return m_indicators.elems["move state"].val() and m_indicators.elems["style"].val() == 0 end)
indicators:add(function(ind, pos, a)
    local def_c = col(100, 100, 100, a)
    local baim_on, head_on = m_force_binds.elems["force baim"].on(), m_force_binds.elems["force head"].on()
    local force_bind_text = head_on and "head " or "baim "
    indicators.text(pos, {
        {force_bind_text, (baim_on or head_on) and col(255, 255, 255) or def_c, a / 1.5},
        {"dmg ", m_mindmg.elems.bind:on() and col(255, 255, 255) or def_c, a / 1.5},
    }, indicators.fonts.pixel, 1 - a)
end, v(3, 9), function() return m_indicators.elems["style"].val() == 0 end)
indicators:add(function(ind, pos, a)
    local def_c, exploit = col(100, 100, 100, a), extended.get_exploit()
    indicators.text(pos, {
        {"dt ", exploit == "dt" and col(200, 255, 220, a) or def_c, a},
        {"os ", exploit == "hs" and col(200, 220, 255, a) or def_c, a}
    }, indicators.fonts.pixel, 1 - a)
end, v(3, 9), function() return m_indicators.elems["style"].val() == 0 end)
indicators:add(function(ind, pos, a)
    local logo_texture = renderer.setup_texture("nix/storm/logo.png")
    render.texture(logo_texture, pos + v(20, 0) * (1 - indicators.anim) - v(30, 7), pos + v(20, 0) * (1 - indicators.anim) + v(30,53), col(255,255,255,255))
end, v(0, 12), function() return m_indicators.elems["style"].val() == 1 end)
local m_windows = gui.options(gui.checkbox("windows"), function()
    local elements = gui.dropdown("options", {"keybinds", "spectators [!]", "watermark", "bomb info [!]", "holo panel [!]", "slowed down"}, true)
    info_box.styling = gui.options("styling", function()
        local style = gui.dropdown("style", {"solus 1.0", "solus 2.0", "solus 2.5"}, false, 2)
        gui.dropdown("font", {"gamesense", "primordial", "storm", "onetap"})
        gui.dropdown("glow direction", {"none", "left", "center", "right"}):master(style, {0})
        gui.slider("min. width", 0, 300, 120)
        -- gui.checkbox("diving line"):master(style, {-2})
        gui.slider("glow size", 0, 15, 5):master(style, {-2})
        gui.slider("line width", 1, 3, 2):master(style, {1})
        gui.slider("line length", 0, 25, 5):master(style, {1})
        gui.slider("radius", 1, 9, 6):master(style, {-1})
        gui.checkbox("list background"):master(style, {-2})
        gui.checkbox("gradient bottom"):master(style, {2})
        gui.color("color 1")
        gui.color("color 2", col(255,255,255,127)):master(style, {-2})
        gui.color("color 3", col(255,255,255,10)):master(style, {-2})
        gui.color("background color", col(15, 15, 15, 100)):master(style, {-2})
    end)
    gui.options("variables", function()    
        gui.dropdown("keybinds name style", {"storm", "standard", "1x1 2x2 skeet fanboy"}):master(elements, {0})
        gui.dropdown("avatars side", {"left", "right"}):master(elements, {1})
        gui.dropdown("watermark elements", {"script name", "nickname", "fps", "delay", "tickrate", "time"}, true,
            {true, false, false, false, false, false}):master(elements, {2})
        gui.checkbox("lowercase", false)
        gui.color("state panel"):master(elements, {6})
    end)
end)

do
    local function add(name, state)
        return {
            name = name,
            state = state,
            anim = 0,
        }
    end
    local function style(...)
        local args = {...}
        return function(s)
            return args[s + 1] or args[2] or args[1]
        end
    end
    local function info(el) return el:on(), el:get_mode() end
    local keybinds = {
        add(style("Pew-Pew", "Double tap"), function() return extended.get_exploit() == "dt", m_exploit_switch.elems.doubletap.get_mode() end),
        add(style("Hide pews", "Hide shots", "Onshot-AA"), function() return extended.get_exploit() == "hs", m_exploit_switch.elems.hideshots.get_mode() end),
        add(style("Dmg override", "Min-damage override"), function() return m_mindmg.elems.bind.on(), m_mindmg.elems.value.val() end),
        add("Hitbox override", function() return info(m_override_hbx.elems.bind) end),
        --add("Freestanding", function() return info(m_freestand) end),
        add(style("Inverter", "Anti-aim inverter", "Anti-aim side inverter"), function() return info(anti_aim.elements.inverter) end),
        add(style("Left manual", "Left yaw override"), function() return anti_aim.manual == 2, "<-" end),
        add(style("Right manual", "Right yaw override"), function() return anti_aim.manual == 3, "->" end),
        add(style("Forward manual", "Forward yaw override"), function() return anti_aim.manual == 0, "^" end),
        add("Force body aim", function() return info(m_force_binds.elems["force baim"]) end),
        add("Force head", function() return info(m_force_binds.elems["force head"]) end),
        --add("Force backshoot", function() return info(m_force_binds.elems["force backshoot"]) end),
        add("Pingspike", function() return m_force_binds.elems.pingspike.on(), m_force_binds.elems["ping value"].val() .. "ms" end),
        add(style("Auto peek", "Auto-peek", "Quick peek assist"), function() return info(autopeek_bind) end),
        add("Fake head", function() return info(m_fakehead.elems.bind) end),
        add(style("Fakeduck", "Fake duck", "Duck peek assist"), function() return info(fakeduck_bind) end),
        add("Third person", function() return thirdperson_bind:on(), "toggle" end),
        add("Edge jump", function() return edgejump_bind:on() and edgejump_bind:get_key() ~= 0, edgejump_bind:get_mode() end),
        add("Menu", function() return ui.is_visible(), "insert" end),
        --add("autothrow", function() return info(m_autothrow) end),
    }
    info_box:add(v(154, 22), nil, function(s, pos, size)
        local x, y = 4, size.y / 2 + 2
        local margin, margin_x = 13, 20
        local active = false
        local font = info_box.font()
        local width, height =
            render.text_size(s.text(), font).x,
            6 + math.ceil(info_box.styling.elems.radius.val() / 3)
        local styling = m_windows.elems.variables
        local style = styling.elems["keybinds name style"].val()
        local lowercase = styling.elems["lowercase"].val()
        for i = 1, #keybinds do
            local bind = keybinds[i]
            local state, mode = bind.state()
            bind.anim = render.anim(bind.anim, state)
            local anim = render.easing(bind.anim)
            if anim ~= 0 then
                active = true
                local pos = pos + v(x, y + margin)
                anim = anim * s.anim
                local name = type(bind.name) == "function" and bind.name(style) or bind.name
                if lowercase then name = name:lower() end
                s.draw[#s.draw+1] = function(size)
                    render.text(name, pos, font, col(255, 255, 255, anim * 255), true)
                    render.text("[" .. tostring(mode) .. "]", pos + v(size.x - x*2, 0), font, col(255, 255, 255, anim * 255), true, nil, nil, -1)
                end
                local w = render.text_size(name, font).x
                    + render.text_size("[" .. tostring(mode) .. "]", font).x + margin_x + x * 2
                if w > width then width = w end
                local h = margin * anim
                y = y + h
                height = height + h
            end
        end
        width = math.max(width, info_box.styling.elems["min. width"].val())
        return m_windows.elems.options.val(0) and (active or ui.is_visible()),
            v(anim.lerp("keybinds_width", width), anim.lerp("keybinds_height", height))
    end, function() return "keybinds" end, true)
end
do
    local fps_last_time = globalvars.get_real_time()
    local frametimes, latest_fps, fps_count, fps_delay = 0, 0, 0, 0.33
    local watermark_elements = {
        function() return "storm.lua [alpha]" end,
        function() return client.get_username() end,
        function()
            frametimes, fps_count = frametimes + globalvars.get_absolute_frametime(), fps_count + 1
            if globalvars.get_real_time() > fps_last_time + fps_delay then
                latest_fps = math.round(1 / (frametimes / (fps_count + 1)))
                fps_last_time = globalvars.get_real_time()
                fps_count, frametimes = 0, 0
            end
            return tostring(latest_fps) .. "fps"
        end,
        function() if not engine.is_connected() then return end return tostring(se.get_latency()) .. "ms" end,
        function() if not engine.is_connected() then return end return tostring(math.floor(1 / globalvars.get_interval_per_tick())) .. "tick" end,
        function() return os.date("%H:%M:%S") end
    }
    info_box:add(v(154, 22), nil, function(s, pos, size)
        local margin = 7
        local font = info_box.font()
        local elements = {}
        for i = 1, #watermark_elements do
            local element = watermark_elements[i]
            if m_windows.elems.variables.elems["watermark elements"].val(i - 1) then
                local el = element()
                if el then
                    elements[#elements+1] = el
                end
            end
        end
        local text = table.concat(elements, " | ")
        local text_size = render.text_size(text, font)
        s.size.x = text_size.x + margin * 2 + 1
        s.pos = v(ss.x - s.size.x, 0) + v(-3, 3)
        s.drag.block = true
        s.draw[#s.draw+1] = function()
            render.text(text, s.pos + v(margin, 5), font, col(255, 255, 255, s.anim * 255), true)
        end
        return m_windows.elems.options.val(2)
    end, function() return "" end, true)
end
info_box:add(v(90, 90), nil, function(s, pos, size)
    local value = 100
    local lp = entitylist.lp()
    local font = info_box.font()
    if lp and lp:is_alive() then
        value = lp:get_prop_float(m_.flVelocityModifier) * 100
    end
    value = math.min(anim.lerp("velocity_modifier", value), 100)
    local anim = value / 100
    s.draw[#s.draw+1] = function()
        local color = render.fade_color(col(255, 0, 0), col(255,255,255), anim):alp(s.anim)
        render.arc_width(pos + size / 2, 30, -90, 361 * anim, 10, color, 2, false, false)
        local icon = renderer.setup_texture("nix/storm/running.png")
        local icon_size, icon_pos = v(31, 31) / 2, pos - v(0, 7) + size / 2
        render.texture(icon, icon_pos - icon_size + v(1, 1), icon_pos + icon_size + v(1, 1), col(0,0,0, s.anim * 127))
        render.texture(icon, icon_pos - icon_size, icon_pos + icon_size, col(255,255,255, s.anim * 255))
        render.text_shadow(tostring(value) .. "%", icon_pos + v(0, icon_size.y), font,
            col(255, 255, 255, s.anim * 255), v(1, 1), col(0, 0, 0, s.anim * 127), true)
    end
    return m_windows.elems.options.val(5) and (value ~= 100 or ui.is_visible())
end, function() return "" end, true)
do
    local spectators = {}
    info_box:add(v(154, 22), nil, function(s, pos, size)
        local x, y = 1, size.y / 2 + 2
        local width = render.text_size(s.text(), font).x
        local size = v(14, 14)
        local margin = 15
        local active = false
        local lp = entitylist.lp()
        local player = lp and lp:observing() or lp
        local font = info_box.font()
        local styling = m_windows.elems.variables
        local style = styling.elems["avatars side"].val() == 1
        local lowercase = styling.elems["lowercase"].val()
        if lp then
            entitylist.for_all_entities(function(ent)
                local spectating = true
                local alive = ent:is_alive()
                if alive or ent:is_dormant() or ent == lp then spectating = false end
                local avatar, texture = ent:get_avatar()
                if avatar then texture = renderer.setup_texture(avatar) end
                local info = ent:info()
                local id, name = info.user_id, info.name
                if not spectators[id] then spectators[id] = 0 end
                if player ~= ent:observing() then spectating = false end
                spectators[id] = render.anim(spectators[id], spectating)
                if spectating then active = true end
                if spectators[id] ~= 0 then
                    local anim = render.easing(spectators[id]) * s.anim
                    local pos = pos + v(x + 5, y + margin)
                    if lowercase then name = name:lower() end
                    s.draw[#s.draw+1] = function(sizes)
                        render.text(name, pos + v((style and 0 or size.x + 3), 0), font, col(255, 255, 255, anim*255), true)
                        if texture then
                            if style then pos = pos + v(sizes.x - 25, 0) end
                            render.texture(texture, pos, pos + size, col(255,255,255,anim*255))
                        else
                            if style then pos = pos + v(sizes.x - 25, 0) end
                            renderer.rect_filled(pos, pos + size, col(0,0,0,anim*255))
                            render.text("?", pos + v(4.5, 0), gui.fonts.misc, col(255,255,255,anim*255))
                        end
                    end
                    local w = render.text_size(name, font).x + size.x + margin + x * 2
                    if w > width then width = w end
                    y = y + margin * anim
                end
            end)
        end
        width = math.max(width, info_box.styling.elems["min. width"].val())
        return m_windows.elems.options.val(1) and (ui.is_visible() or active),
            v(anim.lerp("spectators_width", width), y)
    end, function() return "spectators" end, true)
end
paint(function() info_box:render() end)

m_custom_scope = gui.options(gui.checkbox("custom scope"), function ()
    gui.color()
    gui.color("color 2", col(255, 255, 255, 0))
    gui.slider("anim speed", 5, 30, 15)
    gui.slider("offset", 0, 300, 15)
    gui.slider("size", 0, 400, 333)
    gui.slider("weight", 1, 3, 1)
    gui.checkbox("animate offset")
    gui.checkbox("disable scope", true)
end):paint(function(el)
    el.temp.anim = el.temp.anim or 0
    el.temp.scoped = el.temp.scoped or false
    local lp = entitylist.lp()
    local x, y = ss.x / 2 + 1, ss.y / 2 + 1
    local o = el.elems.offset.val()
    local s = el.elems.size.val() * el.temp.anim
    local w = el.elems.weight.val() / 2
    local c1 = el.elems.color.col():alp_self(el.temp.anim)
    local c2 = el.elems["color 2"].col():alp_self(el.temp.anim)
    local anim = el.temp.scoped and lp:is_alive()
    el.temp.anim = render.lerp(el.temp.anim, anim and 1 or 0, el.elems["anim speed"].val() * globalvars.get_frame_time())
    if el.temp.anim == 0 then return end
    o = el.elems["animate offset"].val() and o * el.temp.anim or o
    local r = renderer.rect_filled_fade
    r(v(x - o, y - w), v(x - o - s, y + w), c1, c2, c2, c1)
    r(v(x + o - 1, y - w), v(x + o + s - 1, y + w), c1, c2, c2, c1)
    r(v(x - w, y + o - 1), v(x + w, y + o + s - 1), c1, c1, c2, c2)
    r(v(x - w, y - o), v(x + w, y - o - s), c1, c1, c2, c2)
end):cb("frame_stage_notify", (function(s, el)
    if s ~= 5 or not el.val() then return end
    local lp = entitylist.lp()
    local is_scoped = lp:get_prop_bool(m_.bIsScoped)
    lp:set_prop_int(m_.bIsScoped, is_scoped and 1 or 0)
    el.temp.scoped = is_scoped and true or false
    if lp:get_prop_int(m_.bIsScoped) and el.elems["disable scope"].val() then
        lp:set_prop_int(m_.bIsScoped, 0)
    end
end))
m_rage_logs = gui.options(gui.checkbox("rage logs"), function()
    local xhair = draggable.new({}, v(100, 50), v(ss.x / 2, ss.y - 300))
    gui.options(gui.checkbox("under crosshair"), function ()
        gui.dropdown("style", {"default", "alternative"})
    end):paint(function()
        local pos, size, hint = xhair.drag:run(nil, v(xhair.size.x, 0))
        pos = v(ss.x / 2, pos.y)
        xhair.drag:set_pos(pos)
        if not engine.is_connected() then return end
        local time = globalvars.get_real_time()
        local y = 0
        for i = #ragelogs, 1, -1 do
            local log = ragelogs[i]
            if time < log.time + 10 then
                if not log.anims then
                    log.anims = {pos = v(-20, 0), alpha = 0} end
                log.anims = {
                    pos = v(
                        render.lerp(log.anims.pos.x, 0, render.smoothing()),
                        render.lerp(log.anims.pos.y, (time < log.time + 5) and 10 or 0, render.smoothing())
                    ),
                    alpha = render.lerp(log.anims.alpha, (time < log.time + 5) and 255 or 0, render.smoothing())
                }
                local alpha = math.ceil(log.anims.alpha)
                if log.anims.alpha > 0 then
                    render.multi_color_text(table.map(log.logtext, function(v)
                        return {v[1], v[2]:alpha(alpha)}
                    end),
                    gui.fonts.misc, pos + v(math.ceil(log.anims.pos.x), y), true, true)
                    y = y + math.ceil(log.anims.pos.y)
                end
            end
        end
        hint()
    end)
    gui.options(gui.checkbox("custom color"), function()
        gui.color("hit", col(139, 148, 188))
        gui.color("miss", col(200, 181, 121))
    end)
    gui.checkbox("mismatch logs", true)
    gui.dropdown("other info", {"on miss", "on hit"}, true, {true, true})
end)
cb("player_hurt", function(e)
    if se.player_hurt_check(e) < 1 then return end
    local custom_color = m_rage_logs.elems["custom color"]
    local killed = e:get_int("health", 0) < 1
    local color = custom_color.val() and custom_color.elems.hit.col() or col("#b0bd68")
    local white = col(255, 255, 255)
    local ent = entitylist.by_userid(e:get_int("userid", 0))
    local weapon = e:get_string("weapon", "")
    if not ("hegrenade,smokegrenade,inferno,decoy,flashbang,taser,knife,molotov")
        :find(weapon) then return end
    local friendly_weapon = ({
        ["hegrenade"] = "explosion",
        ["smokegrenade"] = "grenade punch (lol)",
        ["inferno"] = "fire",
        ["decoy"] = "decoy punch (lol) or decoy explosion",
        ["flashbang"] = "flashbang punch (lol)",
        ["taser"] = "taser",
        ["knife"] = "knife",
        ["molotov"] = "molotov punch (lol)"
    })[weapon] or weapon
    local short_text = {
        {"hit ", white},
        {ent:info().name:lower(), color},
        {" for ", white},
        {tostring(e:get_int("dmg_health", 0)), color},
        {" damage", white}
    }
    text = {unpack(short_text)}
    text[#text+1] = {" with ", white}
    text[#text+1] = {friendly_weapon, color}
    logtext = {unpack(text)}
    if m_rage_logs.elems["under crosshair"].elems["style"].val(1) == 1 then
        logtext[#logtext+1] = {" (", white}
        logtext[#logtext+1] = {tostring(e:get_int("health", 0)), color}
        logtext[#logtext+1] = {" health remaining)", white}
    end
    ragelogs[#ragelogs+1] = {
        text = text,
        logtext = logtext,
        short_text = short_text,
        time = globalvars.get_real_time(),
        tickcount = globalvars.get_tick_count()
    }
    if m_rage_logs.val() then extended.log_multi(text, color) end
end)
cb("shot_fired", function(i)
    if i.manual then return end
    local custom_color = m_rage_logs.elems["custom color"]
    local style = m_rage_logs.elems["under crosshair"].elems["style"].val(1) == 1
    local name, health, info, color, text, short_text =
        i.target:name():lower(), i.target:get_health(), {},
        custom_color.val() and custom_color.elems.hit.col():alpha(255) or col("#b0bd68"),
        {}, {}
    local colors = {
        red = (custom_color.val() and custom_color.elems.miss.col():alpha(255) or col(255, 0, 0)),
        white = col(255, 255, 255),
        blue = gui.colors.storm
    }
    function add_info(t, str, c)
        if #t == 0 then return str end
        str[#str+1] = {" [", colors.white}
        for a = 1, #t do
            str[#str+1] = {t[a][1] .. ": ", colors.white}
            str[#str+1] = {tostring(t[a][2]), c}
            if a ~= #t then
                str[#str+1] = {" | ", colors.white} end
        end
        str[#str+1] = {"]", colors.white}
        return str
    end
    if i.result ~= "hit" then
        if i.result == "unk" then i.result = "?" end
        if i.result == "desync" then i.result = "resolver" end
        if i.result == "spread" then
            info[#info+1] = {"hc", i.hitchance} end
        if i.result == "resolver" then
            info[#info+1] = {"safe", i.safe_point} end
        info[#info+1] = {"bt", i.backtrack}
        short_text = {
            {"missed ", colors.white},
            {name, colors.red},
            {"'s ", colors.white},
            {se.hitbox_name(i.hitbox+1), colors.red},
            {" due to ", colors.white},
            {i.result, colors.red},
        }
        color = colors.red
        text = {unpack(short_text)}
        if m_rage_logs.elems["other info"].val(0) then
            text = add_info(info, text, colors.red)
        end
        logtext = style and text or short_text
    else
        if i.server_hitgroup == 0 then return end
        local mismatch = {}
        local damage_mismatch = i.server_damage < 100 and math.abs(i.server_damage - i.client_damage) > 3
        local client_hitgroup = se.hitbox_to_hitgroup(i.hitbox)
        local hitgroup_mismatch = client_hitgroup ~= i.server_hitgroup
        if damage_mismatch then
            mismatch[#mismatch+1] = {"dmg", i.client_damage}
        end
        if hitgroup_mismatch then
            mismatch[#mismatch+1] = {"hitbox", se.hitgroup_name(client_hitgroup)}
        end
        if damage_mismatch or hitgroup_mismatch then
            info[#info+1] = {"hc", i.hitchance}
            info[#info+1] = {"safe", i.safe_point}
        end
        info[#info+1] = {"bt", i.backtrack}
        short_text = {
            {"hit ", colors.white},
            {name, color},
            {" in ", colors.white},
            {se.hitgroup_name(i.server_hitgroup), color},
            {" for ", colors.white},
            {tostring(i.server_damage), color},
            {" damage", colors.white},
        }
        text = {unpack(short_text)}
        if m_rage_logs.elems["mismatch logs"].val() and #mismatch > 0 then
            text[#text+1] = {". ", colors.white}
            text[#text+1] = {"mismatch", colors.red}
            text[#text+1] = {":", colors.white}
            text = add_info(mismatch, text, colors.red)
        end
        if m_rage_logs.elems["other info"].val(1) then
            text = add_info(info, text, color) 
        end
        logtext = {unpack(short_text)}
        if style then
            logtext[#logtext+1] = {" (", colors.white}
            logtext[#logtext+1] = {tostring(health), color}
            logtext[#logtext+1] = {" health remaining)", colors.white}
        end
    end
    ragelogs[#ragelogs+1] = {
        time = globalvars.get_real_time(),
        tickcount = globalvars.get_tick_count(),
        short_text = short_text,
        text = text,
        logtext = logtext
    }
    if m_rage_logs.val() then extended.log_multi(text, color) end
end)
gui.options("esp", function()
    local font = render.font("nix/storm/fonts/csgo_icons.ttf", 14, 0)
    local icons = {
        ["decoy"] = "F",
        ["flashbang"] = "G",
        ["hegrenade"] = "H",
        ["smokegrenade"] = "I",
        ["molotov"] = "J",
        ["incgrenade"] = "K",
    }
    gui.color(gui.checkbox("nade reveal")):paint(function(el)
        if not engine.is_connected() then return end
        local lp = entitylist.lp()
        if not lp then return end
        if lp:team() == 1 then return end
        local color = el.col()
        local time = time_in_dormant:get_value()
        local interval = globalvars.get_interval_per_tick()
        entitylist.for_enemies(function(ent)
            if ent:dormant_ticks() * interval > time then return end
            local bbox = ent:get_bbox()
            if not bbox then return end
            local nades = {}
            for i = 0, 15 do
                local weapon = ent:weapon(i)
                if weapon and weapon.group == "grenade" then
                    nades[#nades+1] = weapon.name
                end
            end
            local x = (bbox.left + bbox.right - (#nades - 1) * font[2]) / 2 - 2
            local c = color
            if ent:is_dormant() then c = c:alp_self(0.5) end
            for i = 1, #nades do
                render.text(icons[nades[i]], v(x + (i-1) * (font[2] - 2), bbox.top - 25):func(math.round), font, c, true)
            end
        end, true)
    end)
end)
gui.options("additional", function()
    gui.options(gui.checkbox("arrows"), function()
        gui.slider("offset", 0, 100, 20)
        gui.checkbox("rounded", true)
        gui.color("background", col(0, 0, 0, 100))
        gui.color("active", col(127, 140, 200))
    end):paint(function(el)
        local lp = entitylist.lp()
        if not lp or not lp:is_alive() then return end
        local offset = v(el.elems.offset:val() + 50, 0)
        local rounded = el.elems.rounded:val()
        local s, r = 22, rounded and 0.05 or 0.033
        local pos = inverter_arrows.pos
        local hovered = render.hovered(pos - offset, pos + v(s, s) - offset) or
            render.hovered(pos + offset - v(s, 0), pos + offset + v(0, s))
        pos, _size, hint = inverter_arrows.drag:run(hovered, offset + v(0, 0), offset + v(0, s))
        pos = v(ss.x / 2, pos.y)
        inverter_arrows.drag:set_pos(pos)
        local inverted = not inverter_bind:on()
        local color, active = el.elems.background:col(), el.elems.active:col()
        local side = anti_aim.manual
        local arrow = {v(s * (1-r), 0), v(s, s * r), v(s, s * (1-r)), v(s * (1-r), s), v(0, s/2 + s * (r/2)), v(0, s/2 - s * (r/2))}
            renderer.filled_polygon(table.map(arrow, function(t) return pos + t - v(offset.x, -offset.y) end), side == 2 and active or color)
            renderer.filled_polygon(table.map(arrow, function(t) return pos - v(t.x, t.y) + offset + v(0, s) end), side == 3 and active or color)
            local width = s
            if not rounded then offset = offset - v(1, 0) end
            if inverted then
                offset, width = -offset, -width end
            if rounded then
                render.rect_smoothed(pos + v(width - 3, 4) - offset, pos + v(width + 3, s - 4) - offset, active)
            else
                renderer.rect_filled(pos + v(width - 2, 0) - offset, pos + v(width + 2, s) - offset, active) end
        hint()
    end)
    gui.options(gui.checkbox("damage indicator"), function()
        gui.options(gui.checkbox("custom color"), function()
            gui.color("non-active", col(255, 255, 255))
            gui.color("active", col("#BBDCAD"))
        end)
        gui.checkbox("show dmg override")
        gui.checkbox("show hp+dmg")
        gui.checkbox("invert")
    end):paint(function(el)
        local to_left = el.elems.invert.val()
        local pos, _, hint = damage_indicator.drag:run(nil, v(to_left and 60 or 0, 0), v(to_left and -60 or 0, 0))
        local lp = entitylist.lp()
        if not lp or not lp:is_alive() then return end
        local weapon = lp:weapon()
        local name = weapon.group
        local dmg_el = ui.get_slider_int("rage_"..name.."_min_damage")
        if not dmg_el then return end

        local dmg = dmg_el:get_value()
        if dmg > 100 and el.elems["show hp+dmg"].val() then
            dmg = "hp+" .. (dmg - 100)
        else
            dmg = tostring(dmg)
        end
        local min_dmg = tostring(m_mindmg.elems.value:val())

        local color = el.elems["custom color"] and el.elems["custom color"].elems["non-active"].col() or col(255,255,255)
        local offset = v(to_left and -40 or 40, 0)
        if m_mindmg.elems.bind:on() then
            color = el.elems["custom color"] and el.elems["custom color"].elems["active"].col() or col("#BBDCAD")
            dmg = tostring(m_mindmg.elems.value:val())
        elseif el.elems["show dmg override"].val() then
            render.text(min_dmg, pos + offset, gui.fonts.misc, col(255, 255, 255), true, nil, false, to_left and -1 or false)
        end
        render.text(dmg, pos, gui.fonts.misc, color,  true, nil, false, to_left and -1 or false)
        hint()
    end)
    gui.color(gui.checkbox("console color [!]"))
    local m_killmarks = gui.checkbox("killmarks [!]"):paint(function(el)
        local km = el.temp
        local x, y = ss.x / 2 - 78, ss.y - ss.y /6
        local texture = renderer.setup_texture(string.format("nix/storm/killmarks/%s.png", km.count))
        if km.count > 0 and km.last + 2.0 > globalvars.get_current_time() and km.head == 1 then
            texture = renderer.setup_texture("nix/storm/killmarks/hs.png")
            render.texture(texture, vec2_t.new(x, y), vec2_t.new(x + 158, y + 158), color_t.new(255, 255, 255, 255))
        else if km.count > 0 and km.last + 2.0 > globalvars.get_current_time() and km.head == 0 then
            render.texture(texture, vec2_t.new(x, y), vec2_t.new(x + 158, y + 158), color_t.new(255, 255, 255, 255))
        end end
        if km.count > 0 and km.last + 2.0 < globalvars.get_current_time() then
            km.head = 0
        end
    end):cb("player_death", function(e, el)
        local km = el.temp
        local attacker = engine.get_player_for_user_id(e:get_int("attacker", 0))
        local dead = engine.get_player_for_user_id(e:get_int("userid", 0))
        local player = engine.get_local_player()
        if player == dead then
            km.count = 0
        end
        if attacker == player and player ~= dead then
            km.head = e:get_int("headshot", 0)
            km.count = km.count + 1
            km.last = globalvars.get_current_time()
            if km.count > 6 then km.count = 6 end
            if km.head == 0 then
                engine.execute_client_cmd(string.format("play killsound/%s.wav", ({"1", "second", "3", "4", "5", "6"})[km.count]))
            else
                engine.execute_client_cmd("play killsound/headkill")
            end
        end
    end)
    cb("client_disconnect", function() m_killmarks.temp.count = 0 end)
    cb("player_connect_full", function() m_killmarks.temp.count = 0 end)
    cb("round_prestart", function() m_killmarks.temp.count = 0 end)
    cb("round_start", function() m_killmarks.temp.count = 0 end)
end)

gui.tab("misc")
gui.column("main")
do
    local clantag = {"ϟ ", "storm.lua"}
    local mark = clantag[1]
    local clantag_array = extended.build_tag(clantag[2])
    local last_clantag = ""
    gui.checkbox("clantag"):paint(function()
        if not engine.is_in_game() then return end
        local latency = se.get_latency() / globalvars.get_interval_per_tick() / 100
        local tickcount_pred = globalvars.get_tick_count() + latency
        local speed = 20
        local i = math.floor((tickcount_pred / speed) % #clantag_array + 1)
        if last_clantag == clantag_array[i] then return end
        last_clantag = clantag_array[i]
        se.set_clantag(mark..last_clantag.."\n")
    end):change(function(on)
        if on then return end
        se.set_clantag("")
    end)
end
do
    local buybot_fn = function(param, el)
        local pistols_list = {
            ";",
            ".deagle;.revolver;",
            ".elite;", ".p250;",
            ".tec9;.fiveseven;",
            ".glock;.hkp2000;.usp_silencer;",
        }
        local weapons_list = {
            ";",
            ".ssg08;", ".awp;", ".scar20;.g3sg1;",
            ".galilar;.famas;", ".ak47;.m4a1;.m4a1_silencer;", ".sg556;.aug;",
            ".nova;", ".xm1014;", ".mag7;",
            ".m249;", ".negev;",
            ".mac10;.mp9;",
            ".mp7;", ".ump45;", ".p90;", ".bizon;"
        }
        local other_list = {
            ".vesthelm;",
            ".hegrenade;", ".molotov;.incgrenade;", ".smokegrenade;",
            ".taser;", ".defuser;"
        }
        local weapon = weapons_list[el.elems.primary:val()+1]
        local pistol = pistols_list[el.elems.secondary:val()+1]
        local other  = ""
        for i = 0, 5 do
            other = other..(el.elems.other.val(i) and other_list[i+1] or "") end
        engine.execute_client_cmd((weapon..pistol..other):gsub("%.", "buy "))
    end
    gui.options(gui.checkbox("buybot"), function()
        gui.dropdown("primary", {"none", "ssg08","awp","scar20 / g3sg1","galil / famas","ak47 / m4a1",
            "aug / sg556","nova","xm1014","mag7","m249","negev","mac10 / mp9","mp7","ump45","p90","bizon"})
        gui.dropdown("secondary", {"none", "deagle / r8","dualies","p250","tec9 / five7","glock / usp"})
        gui.dropdown("other", {"armor","he","molly","smoke","taser","defuse kit"}, true)
    end):cb("round_prestart", buybot_fn):cb("round_start", buybot_fn)
end

gui.options(gui.checkbox("ragdoll"), function()
    gui.dropdown("type", {"none", "neverlose", "storm"}):change(function(on)
        se.get_convar("cl_ragdoll_gravity"):set_int(on == 1 and -9999 or 600)
        se.get_convar("cl_ragdoll_physics_enable"):set_int(on == 2 and 0 or 1)
    end)
end)
gui.checkbox("autostrafer+"):cm(function(cmd)
    autostrafer:set_value(math.abs(cmd.forwardmove) + math.abs(cmd.sidemove) > 4
        or entitylist.lp():velocity() > 50)
end)
gui.checkbox("party zeus"):change(function(on) se.get_convar("sv_party_mode"):set_int(on and 1 or 0) end)
gui.checkbox("console filter"):change(function(on)
    se.get_convar("con_filter_enable"):set_float(on and 1 or 0)
    se.get_convar("con_filter_text"):set_string(on and "stormluadabest" or "")
    se.get_convar("con_filter_text_out"):set_string(on and "stormluadabested" or "")
end)
gui.checkbox("storm sound"):paint(function()
    if globalvars.get_tick_count() % se.time_to_ticks(20) == 1 then
        engine.execute_client_cmd("play ambient/playonce/weather/" .. ({
            "thunder4",
            "thunder5",
            "thunder6",
            "thunder_distant_01",
            "thunder_distant_02",
            "thunder_distant_06"
        })[math.random(1,6)] ..".wav")
    end
end)

gui.tab("menu")
gui.column("main")
gui.checkbox("alignment helper"):paint(function()
    renderer.line(v(0, ss.y / 2), v(ss.x, ss.y / 2), col(255, 255, 255))
    renderer.line(v(ss.x / 2, 0), v(ss.x / 2, ss.y), col(255, 255, 255))
end)
gui.label("[!] - function will be\nfixed/added soon")
gui.column("colors")
gui.color("background", col(17, 17, 17)):paint(function(el)
    gui.colors.bg = el:col() end, true)
gui.color("border", col(17, 17, 17)):paint(function(el)
    gui.colors.border = el:col() end, true)
gui.color("tabs background", col(11, 11, 11, 245)):paint(function(el)
    gui.colors.tabs_bg = el:col() end, true)
gui.color("elements", col(220, 220, 220)):paint(function(el)
    gui.colors.elements = el:col() end, true)
gui.color("text"):paint(function(el)
    gui.colors.text = el:col() end, true)
paint(gui.render)
create_move(gui.create_move)
create_move(entitylist.scan_dormant.cm)
cb("round_prestart", entitylist.scan_dormant.round_prestart)
unload(function()
    collectgarbage("collect")
end)
paint(function ()
    if m_performance_graph.val() then
        performance.render()
    end
end)
collectgarbage("collect")
engine.execute_client_cmd("clear")
if not entitylist.lp() then engine.execute_client_cmd("showconsole") end
engine.execute_client_cmd("play ambient/playonce/weather/thunder4.wav")
resources.release_notes()
