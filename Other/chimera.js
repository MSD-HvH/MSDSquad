var chimera = {}

var on_load_screen_time = Globals.Realtime() //это максимально хуево выглядит, а еще и при каждой перезагрузке скрипта будет появляться

var ui_handler = {}
var defines = {}
var conditional_hitchance = {}
var visual_controller = {}
var bit = {}
var viewmodel_in_scope = {}
var math = {}
var anti_bruteforce = {}
var conditional_AntiAims = {}
var Utils = {}
var configs = {}
var hitlog = {}
var damage_marker = {}
var custom_scope = {}
var kill_say = {}
var menu_effects = {}
var clantag = {}

/*
Привет. Как видишь, я убрал тектс чуть ниже, чтобы не все его видели при скачивании в дискорде. 

Всегда кто-то откуда то уходит. Вот и мое время настало.
Мне было интересно здесь играть со всеми людьми, с которыми
меня свела жизнь. Всем пока, ребята! В этой жизни нельзя стоять на месте.

Vura, Keni, Morty, Ocean, Richard, Nevkoz, Humansuit, Krest, Aired, Forgotten,
Processor, Shredder, Johny, Sh1ma, Error, Wormeitor, Demon Slayer, Sabdeb,
Crpple, Dan, MaV, Shirazu, Yems, Monroe, Flawless, Tema Bebrikov, Sa1mon,
VK Fatality group and other guys ♥

rejunked is gone
*/

kill_say.phrases = [
    
    "1 пидорасина ебаная спи",
    "круто вчера туалет помыла шлюха",
    "игрок?",
    "парашыч ебаный",
    "1 животное ебаное ",
    "оттарабанен 150 сантиметровым фалосом",
    "обоссан",
    "by SANCHEZJ hvh boss",
    "але уебище химера джс гетни потом вырыгивай что то",
    "ебать ты на хуек присел нихуева",
    "заглотнул коки яки",
    "в сон нахуй",
    "уебашил дилдом по ебалу",
    "сбил пидораса обоссаного",
    "глотай овца",
    "трахнут",
    "поспи хуйсоска",
    "лови припиздок немощный",
    "слишком сочный для Chimera.javascript ",
    "sleep",
    "изи упал нищий",
    "посажен на хуй",
    "GLhf.exe Activated",
    "what you do dog??",
    "!medic НЮХАЙ БЭБРУ я полечился",
    "1 week lou doggo ownet",
    "l2p bot",
    "why you sleep dog???",
    "лови тапыча мусор",
    "1 мусор учись играть",
    "$$$ 1 TAP UFF YA $$$ ∩ ( ͡⚆ ͜ʖ ͡⚆) ∩",
    "че, пососал глупый даун?",
    "{ я ķ¤нɥåλ ϯβ¤£ü ɱåɱķ£ β Ƥ¤ϯ }",
    "улетаешь со своего ванвея хуесос",
    "0 iq",
    "сразу видно кфг иссуе мб конфиг у витмы прикупишь ?",
    "iq ? HAHAHA",
    "Best and free javascript for ot waiting for your download at ---> t.me/chimerajs",
    "ХАХАХАХАХХАХА НИЩИЙ УЛЕТЕЛ (◣_◢)",
    "земля те землей хуйло чиста еденицей отлетел))",
    "Создатель JS ГУРМАНЫЧ",
    "иди нахуй",
]

kill_say.get_phrase = function() {
    return kill_say.phrases[Utils.RandomInt(0, kill_say.phrases.length-1)]
}

kill_say.handle = function() {

    if (!ui_handler.elements['Misc']['enabled'].reference.value) {
        return
    }

    if (!ui_handler.elements['Misc']['kill_say'].reference.value) {
        return
    }

    var me = Entity.GetLocalPlayer()

    var victim = Entity.GetEntityFromUserID(Event.GetInt('userid'))
    var attacker = Entity.GetEntityFromUserID(Event.GetInt('attacker'))

    if (victim == attacker || attacker != me) {
        return
    }

    Cheat.ExecuteCommand( 'say "' + kill_say.get_phrase() + '"' );

}


defines.anti_aim_side = false
defines.body_yaw = 0
defines.miss_reasons = []
[0] = "hit"
[1] = "resolver"
[2] = "spread"
[3] = "occlusion"
[4] = "pred. error"
//нахуй это нужно?)))

defines.hitgroups = function(i) {
    switch(i) {
        case 0 : return 'generic'; break;
        case 1 : return 'head'; break;
        case 2 : return 'chest'; break;
        case 3 : return 'stomach'; break;
        case 4 : return 'left arm'; break;
        case 5 : return 'right arm'; break;
        case 6 : return 'left leg'; break;
        case 7 : return 'right leg'; break;
        case 10 : return 'gear'; break;
    }
}

defines.hitgroup_to_hitbox = [0, 5, 2, 13, 14, 7, 8]



defines.contains = function(object_, item_) {

    for (i = 0; object_.length < i; i++) {

        if (object_[i] == item_) return true
    }

    return false
}
Utils.RandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

Utils.RandomFloat = function(min, max) {
    return Math.random() * (max - min + 1) + min
}

var menu = {}

math.clamp = function(value, min, max) {
    return Math.min(max, Math.max(min, value))
}

math.lerp_staic = function(value, min, max) {
    return min * (1-value) + max * value
}

math.lerp_reverse = function(value, min, max) {
    return (value - min) / ( max - min)
}


math.dist_to = function(a, b) {
    
    var vector_length = function(a) {return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2])}
    return vector_length([a[0] - b[0], a[1] - b[1], a[2] - b[2]])
}

math.closest_point_on_ray = function(ray_from, ray_to, desired_point) {

    var vector_substract = function(a, b) {return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]}
    var vector_length = function(a) {return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2])}

    var to = vector_substract(desired_point, ray_from)
    var direction = vector_substract(ray_to, ray_from)
    var ray_length = vector_length(direction)

    direction[0] = direction[0] / ray_length
    direction[1] = direction[1] / ray_length
    direction[2] = direction[2] / ray_length

    var direction_along = direction[0] * to[0] + direction[1] * to[1] + direction[2] * to[2]
    if (direction_along < 0) return ray_from
    if (direction_along > ray_length) return ray_to
    
    return [ray_from[0] + direction[0] * direction_along, ray_from[1] + direction[1] * direction_along, ray_from[2] + direction[2] * direction_along]
}


Render.Text = function(x, y, center, string, color, font) {

    x = center == 1 ? x - Render.TextSize(string, font)[0]/2 : x

    y = center == 1 ? y - Render.TextSize(string, font)[1]/2 : y

    Render.String(x, y, 0, string, color, font)
        // эт чтобы хуйня которая центрирует и на Y применялась а то вантап хуйня сами понимаете

}

menu.colors = {
    orange_light : [255, 184, 116, 255],
    orange : [254, 124, 56, 255],
    background : [15, 28, 40, 255],
    light : [27, 38, 50, 255],
    extra : [37, 48, 60, 255]
}


menu.style = {
    width : 523,
    height : 420
}

menu.data = {
    is_dragging : false,
    drag : {
        x : 0,
        y : 0
    },
    pos : {
        x : 150, // почему оно было 750... вот нахуя? почему я один раз что то тестил и в итоге не поменял...
        y : 150
    },
    items : [

    ],
    current_tab : 'GLOBAL',
    input : {
        cache_pos : [0, 0],
        pos : [0, 0]
    },
    item_in_use : null

}

var pressed_keys = [], 
    last_pressed_keys = [], 
    input_system = []

menu.helpers = {
    GetCursorPosition : function() {
        //БЛЯТЬ НУ ПРСОТО ПОМОГИТЕ МНЕ С ЭТОЙ ХУЙНЕЙ ЕБАНОЙ
        

        //короче эта хуйня обновляет позицию мышки только если отжата м1


        if (Input.IsKeyPressed(0x01) == false) {
            menu.data.input.pos = menu.data.input.cache_pos
        }
        
        menu.data.input.cache_pos = Input.GetCursorPosition()

        return menu.data.input.pos
    },
    in_bounds : function(mouse, vec_start, vec_end) {
        menu.helpers.GetCursorPosition()
        return menu.data.input.pos[0] > vec_start[0] && menu.data.input.pos[0] < vec_end[0] && menu.data.input.pos[1] > vec_start[1] && menu.data.input.pos[1] < vec_end[1]
    },
    input_update : function() {
        for (i = 1; i < 255; i++) {
            last_pressed_keys[i] = pressed_keys[i]
            pressed_keys[i] = Input.IsKeyPressed(i)
        }
    },//klient ♥
    input_is_key_pressed : function(key) {
        return pressed_keys[key] && !last_pressed_keys[key]
    },
    input_is_key_released : function(key) {
        return !pressed_keys[key] && last_pressed_keys[key]
    },
    override_alpha : function(color, alpha) {
        return [Number(color[0]), Number(color[1]), Number(color[2]), Number(Math.round(alpha * 255))]
    }
}


menu.render = function() {

    var menu_alpha = visual_controller.new_animation('menu_alpha', UI.IsMenuOpen() ? 1 : 0)

    if (menu_alpha == 0) {
        return
    }

    menu.data.item_in_use = null

    var x_pos = menu.data.pos.x,
        y = menu.data.pos.y

    var w = menu.style.width,
        height = menu.style.height

    var menu_border = 45
    var tab_render = 0
    var tab_space = 70
    var font = {
        chimera : Render.GetFont('Segoeuib.ttf', 16, true),
        tab : Render.GetFont('Segoeuib.ttf', 12, true),
        tab_description : Render.GetFont('Segoeui.ttf', 9, true),
        default : Render.GetFont('Segoeui.ttf', 10, true),
        subtab : Render.GetFont('Segoeuib.ttf', 11, true),
        extra_small : Render.GetFont('Segoeuib.ttf', 8, true)
    }

    
    menu.colors.orange_light = ui_handler.elements['Configs']['main_light_color'].reference.color
    menu.colors.orange = ui_handler.elements['Configs']['main_color'].reference.color
    menu.colors.background = ui_handler.elements['Configs']['background_color'].reference.color
    menu.colors.light = ui_handler.elements['Configs']['light_color'].reference.color
    menu.colors.extra = ui_handler.elements['Configs']['extra_color'].reference.color
    

    var tabs = []

    var tab_description = [
        'rage tweaks',
        'visual additions',
        'AA advance',
        'anti bruteforce',
        'miscellaneous',
        'apply configs'

    ]

    var mouse_pos = Input.GetCursorPosition()

    //бекграунд бегин

    Render.FilledRect(x_pos, y, w, height, menu.helpers.override_alpha(menu.colors.background, menu_alpha) )//хули оно светлое такое : [25, 38, 50, 255]
    Render.FilledRect(x_pos, y, w, menu_border, menu.helpers.override_alpha(menu.colors.light, menu_alpha))
    
    Render.FilledRect(x_pos + 9, y + menu_border + 9, w / 2 - 9 * 2 + 9 * 0.5, (height - menu_border - 9 * 2) * menu_alpha, menu.helpers.override_alpha(menu.colors.light, menu_alpha)) //лайт ваще пиздецц [47, 58, 70, 255]
    Render.FilledRect(x_pos + w / 2 + 9 * 0.5, y + menu_border + 9, w / 2 - 9 * 2 + 9 * 0.5, (height - menu_border - 9 * 2) * menu_alpha, menu.helpers.override_alpha(menu.colors.light, menu_alpha)) // HARD MAT

    
    Render.FilledRect(x_pos + 9, y + menu_border + 9, w / 2 - 9 * 2 + 9 * 0.5, menu_border / 2, menu.helpers.override_alpha(menu.colors.extra, menu_alpha))
    Render.FilledRect(x_pos + w / 2 + 9 * 0.5, y + menu_border + 9, w / 2 - 9 * 2 + 9 * 0.5, menu_border / 2, menu.helpers.override_alpha(menu.colors.extra, menu_alpha))

    Render.String(x_pos + 9 + 5, y + menu_border + 9 + 2, 0, 'Main', menu.helpers.override_alpha(menu.colors.orange_light, menu_alpha), font.subtab)
    Render.String(x_pos + w / 2 + 9 * 0.5 + 5, y + menu_border + 9 + 2, 0, 'Other', menu.helpers.override_alpha(menu.colors.orange_light, menu_alpha), font.subtab)

    Render.Text(x_pos + 103 / 2, y + menu_border / 2, 1, 'CHIMERA', menu.helpers.override_alpha(menu.colors.orange, menu_alpha), font.chimera)

    if (mouse_pos[0] > x_pos && mouse_pos[0] < (x_pos + 103) && mouse_pos[1] > y && mouse_pos[1] < (y + menu_border)) { //так надо типо
        
        if (Input.IsKeyPressed(0x01) && !menu.data.is_dragging) {
            menu.data.is_dragging = true

            menu.data.drag.x = menu.data.pos.x - mouse_pos[0]
            menu.data.drag.y = menu.data.pos.y - mouse_pos[1]

        }


        
    } //это ебаный пиздец....................................................................................

    
    if (!Input.IsKeyPressed(0x01)) {
        menu.data.is_dragging = false
    }

    if (menu.data.is_dragging) {
        menu.data.pos.x = (menu.data.drag.x + mouse_pos[0])
        menu.data.pos.y = (menu.data.drag.y + mouse_pos[1])
    }

    
    for (j in menu.data.items) {

        if (!tabs[tab_render]) {
            tabs.push(j) //ЭТО ЧИСТО НАУЙ СУКА ТОПЧИК ТАБЫ ПО ИНДЕКСАМ 0 1 2 3 4 
        }

        /*
        if (menu.data.current_tab == j) {
            var color = menu.colors.orange
        } //по сути варом должно быть не
        else {
            var color = menu.helpers.override_alpha(menu.colors.orange_light, menu_alpha)        //ебать я долбаеб нахуй я два раза фунцкию вызывал
        }
    

        */

        var tab_name_color = visual_controller.new_animation(j + '_tab', menu.data.current_tab == j ? menu.colors.orange : menu.colors.orange_light, undefined, 0.5) // ебать я ахуенный 

        Render.Text(x_pos + 103 + tab_space * tab_render + tab_space / 2, y + menu_border / 2 - 5 , 1, j, menu.helpers.override_alpha(tab_name_color, menu_alpha), font.tab )
        Render.Text(x_pos + 103 + tab_space * tab_render + tab_space / 2, y + menu_border / 2 + 6, 1, tab_description[tab_render], menu.helpers.override_alpha(tab_name_color, menu_alpha), font.tab_description )
      //  Render.FilledRect(x + 103 + tab_space * tab_render, y, 1, menu_border, menu.colors.orange)

        if (menu.helpers.in_bounds(Input.GetCursorPosition(), [x_pos + 103 + tab_space * tab_render, y], [x_pos + 103 + tab_space * tab_render + tab_space, y + menu_border]) && menu.helpers.input_is_key_pressed(0x01) && menu_alpha == 1) {
            menu.data.current_tab = tabs[tab_render]
        }

        tab_render = tab_render + 1
    }

    var item_spacing = []

    

    for (h in menu.data.items) {

        if (!item_spacing[h]) {
            item_spacing[h] = {}
        }
        
        for (u in menu.data.items[h]) {

            if (!item_spacing[h][u]) {
                item_spacing[h][u] = 0
            }
            
            for (i in menu.data.items[h][u]) {
                

                var current_item = menu.data.items[h][u][i] //ахаха типо хуй поняли 

                
                var current_item_show_condition = current_item != undefined && (h == menu.data.current_tab) && current_item.enabled && visual_controller.get_animation('menu_alpha').number > 0.9//а нахуй я выебнулся типо ебать приблатненный через visual_controller.get_animation альфу получил я хуею

                if (current_item != undefined) {
                    menu.set_visible(h, u, i, current_item.visibility_condition())
                
                


                //долбаеб нахуй ты current_item_condition в каждом проверяешь если сразу один раз можно было или нет
                var x = u == '1' ? x_pos: x_pos + w / 2 - 9 * 0.5


                var alpha = visual_controller.new_animation(h + i, current_item_show_condition ? 1 : 0)

                var current_item_condition = alpha > 0

                //митсер долбаеб норм говна в коде
                switch (current_item.type) {

                    case 'checkbox' : 
                        
                        if (current_item_condition) {

                            
                            var visibility = visual_controller.new_animation(h + i + '_checkbox_height', (y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] + 12) < (y + menu_border + 9 + (height - menu_border - 9 * 2) * menu_alpha) ? 1 : 0 )
                            
                            Render.FilledRect(x + 9 + 10, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u], 12, 12, menu.helpers.override_alpha(menu.colors.background, alpha * visibility))

                            Render.String(x + 9 + 10 + 12 + 5 + 1, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] - 1.5 + 1, 0, current_item.name, [0, 0, 0, Math.round(alpha * 255 * visibility)], font.default)
                            Render.String(x + 9 + 10 + 12 + 5, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] - 1.5, 0, current_item.name, [255, 255, 255, Math.round(alpha * 255 * visibility)], font.default)

                            var name_sz = Render.TextSize(current_item.name, font.default)

                            var value_alpha = visual_controller.new_animation(h + i + '_checkbox', current_item.value ? 1 : 0)
    
                            if (menu.helpers.in_bounds(Input.GetCursorPosition(), [x + 9 + 10, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u]], [x + 9 + 10 + 12 + name_sz[0] + 5, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] + 12]) && menu.helpers.input_is_key_pressed(0x01) && (menu.data.item_in_use == null || menu.data.item_in_use == i) && alpha > 0.98 && visibility == 1) {
    
                                current_item.value = !current_item.value
                                
                                menu.data.item_in_use = i
                            }
    
                            if (value_alpha > 0) {
                                Render.FilledRect(x + 9 + 10 + 3, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] + 3, 6, 6,  menu.helpers.override_alpha(menu.colors.orange, alpha * value_alpha * visibility))
                            }
                            item_spacing[h][u] = item_spacing[h][u] + 22 * alpha 
                        }
                    
                    break;

                    case 'button' :

                        if (current_item_condition) {

                            var visibility = visual_controller.new_animation(h + i + '_button_height', (y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] + 12) < (y + menu_border + 9 + (height - menu_border - 9 * 2) * menu_alpha) ? 1 : 0)

                            var name_sz = Render.TextSize(current_item.name, font.default)
                            var alpha_button = visual_controller.new_animation(h + i + '_button', 0)

                            Render.FilledRect(x + 9 + 10, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u], name_sz[0] + 10, 12,  menu.helpers.override_alpha(menu.colors.orange, alpha))

                            if (menu.helpers.in_bounds(Input.GetCursorPosition(), [x + 9 + 10, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u]], [x + 9 + 10 + name_sz[0] + 10, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] + 12]) && Input.IsKeyPressed(0x01) && (menu.data.item_in_use == null || menu.data.item_in_use == i) && alpha > 0.98 ) {
                                Render.FilledRect(x + 9 + 10, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u], name_sz[0] + 10, 12,  menu.helpers.override_alpha([32, 32, 32, 255], alpha * 0.5))
                            }

                            Render.String(x + 9 + 10 + 5 + 1, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] - 2 + 1, 0, current_item.name, [0, 0, 0, Math.round(alpha * 255)], font.default)
                            Render.String(x + 9 + 10 + 5, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] - 2, 0, current_item.name, [255, 255, 255, Math.round(alpha * 255)], font.default)

                            if (menu.helpers.in_bounds(Input.GetCursorPosition(), [x + 9 + 10, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u]], [x + 9 + 10 + name_sz[0] + 10, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] + 12]) && menu.helpers.input_is_key_pressed(0x01) && (menu.data.item_in_use == null || menu.data.item_in_use == i) && alpha > 0.98 ) {

                                //Cheat.PrintLog('CLICKED ' + i, [255, 255, 255, 255])
                                current_item.func()
                                
                                menu.data.item_in_use = i
                            }
                            
                            


                            item_spacing[h][u] = item_spacing[h][u] + 22 * alpha

                        }

                    break;

                    case 'slider' : 
                        
                        if (current_item_condition) {

                            //(y + menu_border + 9 + (height - menu_border - 9 * 2) * menu_alpha) 
                            var visibility = visual_controller.new_animation(h + i + '_slider_height', (y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] + 12) < (y + menu_border + 9 + (height - menu_border - 9 * 2) * menu_alpha) ? 1 : 0)
                            
                            Render.FilledRect(x + 9 + 10 + (w / 2 - 9 * 2 + 9 * 0.5) / 2 - 9, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] + 3, (w / 2 - 9 * 2 + 9 * 0.5) / 2 - 18 , 6, menu.helpers.override_alpha(menu.colors.background, alpha * visibility))

                            Render.String(x + 9 + 10 + 1, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] - 2 + 1, 0, current_item.name, [0, 0, 0, Math.round(alpha * 255 * visibility)], font.default)
                            Render.String(x + 9 + 10, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] - 2, 0, current_item.name, [255, 255, 255, Math.round(alpha * 255 * visibility)], font.default)

                            var value_size = Render.TextSize( '' + current_item.value, font.extra_small )

                            if (menu.helpers.in_bounds(Input.GetCursorPosition(), [x + 9 + 10 + (w / 2 - 9 * 2 + 9 * 0.5) / 2 - 9, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] + 3], [x + 9 + 10 + (w / 2 - 9 * 2 + 9 * 0.5) / 2 - 9 + (w / 2 - 9 * 2 + 9 * 0.5) / 2 - 18, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] + 3 + 6]) && Input.IsKeyPressed(0x01) && (menu.data.item_in_use == null || menu.data.item_in_use == i) && alpha > 0.98 && visibility == 1) {
                                
                                pixel_value = (math.clamp(Input.GetCursorPosition()[0], x + 9 + 10 + (w / 2 - 9 * 2 + 9 * 0.5) / 2 - 9, x + 9 + 10 + (w / 2 - 9 * 2 + 9 * 0.5) / 2 - 9 + (w / 2 - 9 * 2 + 9 * 0.5) / 2 - 18) - (x + 9 + 10 + (w / 2 - 9 * 2 + 9 * 0.5) / 2 - 9)) / ((x + 9 + 10 + (w / 2 - 9 * 2 + 9 * 0.5) / 2 - 9 + (w / 2 - 9 * 2 + 9 * 0.5) / 2 - 18) - (x + 9 + 10 + (w / 2 - 9 * 2 + 9 * 0.5) / 2 - 9))

                                //Cheat.PrintLog('Using ' + i + ' to set value ', [255, 255, 255, 255])
                                current_item.value = Math.round(math.lerp_staic(pixel_value, current_item.min, current_item.max))

                                menu.data.item_in_use = i
                            }

                            
                            if (menu.helpers.in_bounds(Input.GetCursorPosition(), [x + 9 + 10 + (w / 2 - 9 * 2 + 9 * 0.5) / 2 - 9, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] + 3], [x + 9 + 10 + (w / 2 - 9 * 2 + 9 * 0.5) / 2 - 9 + (w / 2 - 9 * 2 + 9 * 0.5) / 2 - 18, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] + 3 + 6]) && (menu.data.item_in_use == null || menu.data.item_in_use == i) && alpha > 0.98 && visibility == 1) {
                                if (menu.helpers.input_is_key_pressed(0x25) && current_item.value > current_item.min) {
                                    current_item.value = current_item.value - 1
                                }
                                
                                if (menu.helpers.input_is_key_pressed(0x27) && current_item.value < current_item.max) {
                                    current_item.value = current_item.value + 1
                                }
                            }
                            


                            var pixel_value = math.lerp_reverse(current_item.value, current_item.min, current_item.max)
                            
                            Render.FilledRect(x + 9 + 10 + (w / 2 - 9 * 2 + 9 * 0.5) / 2 - 9 + 1, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] + 3 + 1, ((w / 2 - 9 * 2 + 9 * 0.5) / 2 - 18 - 2) * pixel_value, 6 - 2, menu.helpers.override_alpha(menu.colors.orange, alpha * visibility)) /// (x + 9 + 10 + (w / 2 - 9 * 2 + 9 * 0.5) / 2 - 9 + 1)

                            Render.String(x + 9 + 10 + (w / 2 - 9 * 2 + 9 * 0.5) / 2 - 9 - 5 + ((w / 2 - 9 * 2 + 9 * 0.5) / 2 - 18 - 2) * pixel_value + value_size[0] / 2 + 1, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] - 9 + 1, 1, '' + current_item.value, [0, 0, 0, Math.round(alpha * 255 * visibility)], font.extra_small)
                            Render.String(x + 9 + 10 + (w / 2 - 9 * 2 + 9 * 0.5) / 2 - 9 - 5 + ((w / 2 - 9 * 2 + 9 * 0.5) / 2 - 18 - 2) * pixel_value + value_size[0] / 2, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] - 9, 1, '' + current_item.value, [255, 255, 255, Math.round(alpha * 255 * visibility)], font.extra_small)
                            //current_item.value = math.clamp(math.lerp_staic(multiplier, min, max), min, max)
                            

                            
                            
                            

                           //Render.FilledRect(pixel_value, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] + 3, 1, 10, [255, 255, 255, 255])
                            
                            
                            

                            item_spacing[h][u] = item_spacing[h][u] + 22 * alpha
                        }

                    break;

                    case 'dropdown' :

                        if (current_item_condition) {

                            //(y + menu_border + 9 + (height - menu_border - 9 * 2) * menu_alpha)

                            var visibility = visual_controller.new_animation(h + i + '_dropdown_height', (y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] + 15 + 12) < (y + menu_border + 9 + (height - menu_border - 9 * 2) * menu_alpha) ? 1 : 0)

                            Render.String(x + 9 + 10 + 1, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] - 2 + 1, 0, current_item.name, [0, 0, 0, Math.round(alpha * 255 * visibility)], font.default)
                            Render.String(x + 9 + 10, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] - 2, 0, current_item.name, [255, 255, 255, Math.round(alpha * 255 * visibility)], font.default)
                            Render.FilledRect(x + 9 + 10, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] + 15, (w / 2 - 9 * 2 + 9 * 0.5) / 2 - 18, 12, menu.helpers.override_alpha(menu.colors.background, alpha * visibility))
                            Render.String(x + 9 + 10 + 5 + 1, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] + 15 - 2 + 1, 0, current_item.table[current_item.value], [0, 0, 0, Math.round(alpha * 255 * visibility)], font.default)
                            Render.String(x + 9 + 10 + 5, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] + 15 - 2, 0, current_item.table[current_item.value], [255, 255, 255, Math.round(alpha * 255 * visibility)], font.default)

                            
                            if (menu.helpers.in_bounds(Input.GetCursorPosition(), [x + 9 + 10, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] + 15], [x + 9 + 10 + (w / 2 - 9 * 2 + 9 * 0.5) / 2 - 18, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] + 15 + 12]) && menu.helpers.input_is_key_pressed(0x01) && (menu.data.item_in_use == null || menu.data.item_in_use == i) && alpha > 0.98 && visibility == 1) {

                                current_item.is_visible = !current_item.is_visible
                            }

                            var offset = 0

                            
                            var dropdown_alpha = visual_controller.new_animation(h + i + '_dropdown', current_item.is_visible ? 1 : 0)
                            
                            if (dropdown_alpha > 0) {



                                for (e in current_item.table) {
                                    
                                    Render.FilledRect(x + 9 + 10, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] + 15 + 12 + offset * dropdown_alpha, (w / 2 - 9 * 2 + 9 * 0.5) / 2 - 18, 12, menu.helpers.override_alpha(e == current_item.value ? menu.colors.orange : menu.colors.extra, alpha * dropdown_alpha))//я чо хуй знает как сделать
                                    Render.String(x + 9 + 10 + 5 + 1, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] - 2 + offset * dropdown_alpha + 27 + 1, 0, current_item.table[e], [0, 0, 0, Math.round(alpha * 255 * dropdown_alpha)], font.default)
                                    Render.String(x + 9 + 10 + 5, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] - 2 + offset * dropdown_alpha + 27, 0, current_item.table[e], [255, 255, 255, Math.round(alpha * 255 * dropdown_alpha)], font.default)

                                    if (menu.helpers.in_bounds(Input.GetCursorPosition(), [x + 9 + 10, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] + 15 + 12 + offset], [x + 9 + 10 + (w / 2 - 9 * 2 + 9 * 0.5) / 2 - 18, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] + 15 + 12 + offset + 12]) && menu.helpers.input_is_key_pressed(0x01) && alpha > 0.98 && dropdown_alpha > 0.98) {

                                        current_item.value = e
                                        current_item.is_visible = false
                                    }

                                    offset = offset + 12 * dropdown_alpha
                                }

                                if (menu.helpers.input_is_key_pressed(0x01) && !menu.helpers.in_bounds(Input.GetCursorPosition(), [x + 9 + 10, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] + 15], [x + 9 + 10 + (w / 2 - 9 * 2 + 9 * 0.5) / 2 - 18, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] + 15 + 12 + offset]) && alpha > 0.98) {
                                    current_item.is_visible = false
                                }
                                

                                
                            }



                            item_spacing[h][u] = item_spacing[h][u] + 22 * alpha + offset * alpha + 12 * alpha
                        }

                    break;

                    case 'colorpicker' : 
                    
                        if (current_item_condition) {

                            
                            //(y + menu_border + 9 + (height - menu_border - 9 * 2) * menu_alpha)

                            var visibility = visual_controller.new_animation(h + i + '_colorpicker_height', (y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] - 2 + 12 + 56) < (y + menu_border + 9 + (height - menu_border - 9 * 2) * menu_alpha) ? 1 : 0 )

                            var offset = 0

                            Render.String(x + 9 + 10 + 1, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] - 2 + 1, 0, current_item.name, [0, 0, 0, Math.round(255 * alpha * visibility)], font.default)
                            Render.String(x + 9 + 10, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] - 2, 0, current_item.name, [255, 255, 255, Math.round(255 * alpha * visibility)], font.default)

                            Render.FilledRect(x + 9 + 10 + (w / 2 - 9 * 2 + 9 * 0.5) - 27 - 20, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] + 3, 20, 6, menu.helpers.override_alpha(menu.colors.background, alpha * visibility))

                            Render.FilledRect(x + 9 + 10 + (w / 2 - 9 * 2 + 9 * 0.5) - 27 - 20 + 1, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] + 3 + 1, 18, 4, menu.helpers.override_alpha(current_item.color, alpha * visibility))

                            if (menu.helpers.in_bounds(Input.GetCursorPosition(), [x + 9 + 10, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u]], [x + 9 + 10 + (w / 2 - 9 * 2 + 9 * 0.5) - 27, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] + 12]) && menu.helpers.input_is_key_pressed(0x01) && alpha > 0.98 && visibility == 1) {
                                
                                current_item.is_visible = !current_item.is_visible
                            }

                            var colorpicker_alpha = visual_controller.new_animation(h + i + '_colorpicker', current_item.is_visible ? 1 : 0)

                            if (colorpicker_alpha > 0) {

                                var colors = [
                                    ['Red', [255, 70, 70, 255]],
                                    ['Green', [70, 255, 70, 255]],
                                    ['Blue', [70, 70, 255, 255]],
                                    ['Alpha', [255, 255, 255, 255]],
                                ]

                                for (f in colors) {
                                    Render.FilledRect(x + 9 + 10, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] + 12 + offset * colorpicker_alpha, (w / 2 - 9 * 2 + 9 * 0.5) - 18, 14, menu.helpers.override_alpha(menu.colors.extra, alpha * colorpicker_alpha * visibility))

                                    var pixel_value = math.lerp_reverse(current_item.color[f], 0, 255)

                                    Render.FilledRect(x + 9 + 10 + 35, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] + 3 + 12 + offset,  (w / 2 - 9 * 2 + 9 * 0.5) - 18 - 15 - 23, 6, menu.helpers.override_alpha(menu.colors.background, alpha * colorpicker_alpha * visibility))
                                    Render.FilledRect(x + 9 + 10 + 35 + 1, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] + 3 + 12 + offset + 1,  ((w / 2 - 9 * 2 + 9 * 0.5) - 18 - 15 - 23 - 2) * pixel_value, 6 - 2, menu.helpers.override_alpha(colors[f][1], alpha * colorpicker_alpha * visibility))
                                    Render.String(x + 9 + 10 + 3 + 1, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] + 11 + offset + 1, 0, colors[f][0], [0, 0, 0, Math.round(255 * alpha * colorpicker_alpha * visibility)], font.default)
                                    Render.String(x + 9 + 10 + 3, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] + 11 + offset, 0, colors[f][0], [255, 255, 255, Math.round(255 * alpha * colorpicker_alpha * visibility)], font.default)

                                    if (menu.helpers.in_bounds(Input.GetCursorPosition(), [x + 9 + 10 + 35, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] + 3 + 12 + offset], [x + 9 + 10 + 35 + (w / 2 - 9 * 2 + 9 * 0.5) - 18 - 15 - 23, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] + 3 + 12 + offset + 6]) && Input.IsKeyPressed(0x01) && alpha > 0.98 && colorpicker_alpha > 0.98 && visibility == 1) {

                                        value = (math.clamp(Input.GetCursorPosition()[0], x + 9 + 10 + 35, x + 9 + 10 + 35 + (w / 2 - 9 * 2 + 9 * 0.5) - 18 - 15 - 23)- (x + 9 + 10 + 35) ) / ((x + 9 + 10 + 35 + (w / 2 - 9 * 2 + 9 * 0.5) - 18 - 15 - 23) - (x + 9 + 10 + 35))
                                    
                                        current_item.color[f] = Math.round(math.lerp_staic(value, 0, 255))
                                    }


                                    offset = offset + 14 * colorpicker_alpha * alpha
                                    
                                }
                                

                                if (menu.helpers.input_is_key_pressed(0x01) && !menu.helpers.in_bounds(Input.GetCursorPosition(), [x + 9 + 10, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u]], [x + 9 + 10 + (w / 2 - 9 * 2 + 9 * 0.5) - 18, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] + 12 + offset]) && alpha > 0.98 && visibility == 1) {
                                    current_item.is_visible = false
                                }

                            }


                            item_spacing[h][u] = item_spacing[h][u] + 22 * alpha + offset * alpha
                        }
                    break;

                    case 'label' :
                        if (current_item_condition) {

                            //(y + menu_border + 9 + (height - menu_border - 9 * 2) * menu_alpha)

                            var visibility = visual_controller.new_animation(h + i + '_colorpicker_height', (y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] - 2 + 12) < (y + menu_border + 9 + (height - menu_border - 9 * 2) * menu_alpha) ? 1 : 0 )

                            var string_size = Render.TextSize(current_item.value, font.default)
                            Render.String(x + 9 + 10 + 1, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] - 2 + 1, 0, current_item.value, [0, 0, 0, Math.round(255 * alpha * visibility)], font.default)
                            Render.String(x + 9 + 10, y + menu_border * 1.5 + 9 + 10 + item_spacing[h][u] - 2, 0, current_item.value, [255, 255, 255, Math.round(255 * alpha * visibility)], font.default)

                            item_spacing[h][u] = item_spacing[h][u] + 22 * alpha
                        }

                    break

                }
                } //ахуенная скобочка чисто

                
            }
        }
    }
   // Render.FilledRect(menu.helpers.GetCursorPosition()[0], menu.helpers.GetCursorPosition()[1], 10, 10, [255, 255, 255, 255])
}


menu.new_tab = function(name) {
    menu.data.items[name] = {}
}

menu.new_checkbox = function(tab, subtab, name, visibility_condition) {
    if (!menu.data.items[tab][subtab]) {
        menu.data.items[tab][subtab] = {}
    }
    
    if (!visibility_condition) {
        visibility_condition = function() { 
            return true
        }
    }
    
    if (!menu.data.items[tab][subtab][name]) {
        menu.data.items[tab][subtab][name] = {}
        menu.data.items[tab][subtab][name].name = name
        menu.data.items[tab][subtab][name].type = 'checkbox'
        menu.data.items[tab][subtab][name].enabled = true

        menu.data.items[tab][subtab][name].value = false
        
        menu.data.items[tab][subtab][name].visibility_condition = visibility_condition
    }
    
    return menu.data.items[tab][subtab][name]
}

menu.new_button = function(tab, subtab, name, func, visibility_condition) {
    if (!menu.data.items[tab][subtab]) {
        menu.data.items[tab][subtab] = {}
    }
    
    if (!visibility_condition) {
        visibility_condition = function() { 
            return true
        }
    }
    
    if (!menu.data.items[tab][subtab][name]) {
        menu.data.items[tab][subtab][name] = {}
        menu.data.items[tab][subtab][name].name = name
        menu.data.items[tab][subtab][name].type = 'button'
        menu.data.items[tab][subtab][name].enabled = func

        menu.data.items[tab][subtab][name].func = func

        menu.data.items[tab][subtab][name].visibility_condition = visibility_condition
    }
    return menu.data.items[tab][subtab][name]
}

menu.new_slider = function(tab, subtab, name, min, max, visibility_condition) {
    if (!menu.data.items[tab][subtab]) {
        menu.data.items[tab][subtab] = {}
    }
    
    if (!visibility_condition) {
        visibility_condition = function() { 
            return true
        }
    }

    if (!menu.data.items[tab][subtab][name]) {
        menu.data.items[tab][subtab][name] = {}
        menu.data.items[tab][subtab][name].name = name
        menu.data.items[tab][subtab][name].type = 'slider'
        menu.data.items[tab][subtab][name].enabled = true
    
        menu.data.items[tab][subtab][name].value = math.clamp(0, min, max)
        menu.data.items[tab][subtab][name].min = min
        menu.data.items[tab][subtab][name].max = max

        menu.data.items[tab][subtab][name].visibility_condition = visibility_condition
    }
    
    

    
    return menu.data.items[tab][subtab][name]
}

menu.new_dropdown = function(tab, subtab, name, table, visibility_condition) {
    if (!menu.data.items[tab][subtab]) {
        menu.data.items[tab][subtab] = {}
    }
    
    if (!visibility_condition) {
        visibility_condition = function() { 
            return true
        }
    }

    if (!menu.data.items[tab][subtab][name]) {
        menu.data.items[tab][subtab][name] = {}
        menu.data.items[tab][subtab][name].name = name
        menu.data.items[tab][subtab][name].type = 'dropdown'
        menu.data.items[tab][subtab][name].enabled = true

        menu.data.items[tab][subtab][name].table = table
        menu.data.items[tab][subtab][name].value = 0
        menu.data.items[tab][subtab][name].is_visible = false


        menu.data.items[tab][subtab][name].visibility_condition = visibility_condition
    }
    return menu.data.items[tab][subtab][name]
}


menu.new_colorpicker = function(tab, subtab, name, visibility_condition, default_val) {
    if (!menu.data.items[tab][subtab]) {
        menu.data.items[tab][subtab] = {}
    }
    
    if (!visibility_condition) {
        visibility_condition = function() { 
            return true
        }
    }

    if (!menu.data.items[tab][subtab][name]) {
        menu.data.items[tab][subtab][name] = {}
        menu.data.items[tab][subtab][name].name = name
        menu.data.items[tab][subtab][name].type = 'colorpicker'
        menu.data.items[tab][subtab][name].enabled = true

        menu.data.items[tab][subtab][name].color = !default_val ? [255, 255, 255, 255] : default_val
        menu.data.items[tab][subtab][name].default_value = default_val

        menu.data.items[tab][subtab][name].is_visible = false

        menu.data.items[tab][subtab][name].visibility_condition = visibility_condition
        


    }

    return menu.data.items[tab][subtab][name]
}

menu.new_label = function(tab, subtab, string, visibility_condition) {
    if (!menu.data.items[tab][subtab]) {
        menu.data.items[tab][subtab] = {}
    }
    
    if (!visibility_condition) {
        visibility_condition = function() { 
            return true
        }
    }

    if (!menu.data.items[tab][subtab][string]) {
        menu.data.items[tab][subtab][string] = {}
        menu.data.items[tab][subtab][string].name = string
        menu.data.items[tab][subtab][string].type = 'label'
        menu.data.items[tab][subtab][string].enabled = true

        menu.data.items[tab][subtab][string].value = string

        menu.data.items[tab][subtab][string].visibility_condition = visibility_condition
        


    }

    return menu.data.items[tab][subtab][string]
}

menu.set_visible = function(tab, subtab, name, value) {
    menu.data.items[tab][subtab][name].enabled = value
}

menu.destroy = function(tab, subtab, name) {
    menu.data.items[tab][subtab][name] = null
}

menu.get_value = function(tab, subtab, name) {
    return (!menu.data.items[tab][subtab][name]) ? Cheat.PrintLog('Facing a problem while getting ' + h + ' > ' + u + ' > ' + i + ' value.', [255, 150, 150, 255]) : menu.data.items[tab][subtab][name].value
}

menu.get_color = function(tab, subtab, name) {
    return menu.data.items[tab][subtab][name].color
}

menu.set_color = function(tab, subtab, name, color) {
    menu.data.items[tab][subtab][name].color = color
}

menu.set_value = function(tab, subtab, name, new_value) {
    //Cheat.Print('\n New ' + tab + ' -> ' + subtab + ' -> ' + name + ' value applied. New value is ' + value)
    menu.data.items[tab][subtab][name].value = new_value
}

menu.update_list = function(tab, subtab, name, new_table) {
    if (menu.data.items[tab][subtab][name].type == 'dropdown') {

        menu.data.items[tab][subtab][name].table = new_table
        menu.data.items[tab][subtab][name].value = 0

    }
}


menu.new_tab('GLOBAL')
menu.new_tab('VISUALS')
menu.new_tab('ANTI AIM')
menu.new_tab('ABF')
menu.new_tab('MISC.')
menu.new_tab('CONFIGS')




UI.AddSubTab(["Rage", "SUBTAB_MGR"], "Chimera.js")

defines.equals = function(a, b) {
    return a[0] == b[0] && a[1] == b[1] && a[2] == b[2] && a[3] == b[3] 
}

//'Forward','Backward','Right','Left','At Target','Freestanding'
conditional_AntiAims.get_yaw_base = function() {

    var at_target = UI.GetValue(["Rage","Anti Aim","Directions","At targets"]) == 1
    var auto_direction = UI.GetValue(["Rage","Anti Aim","Directions","Auto direction"]) == 1
    var left = UI.GetValue(["Rage","Anti Aim","General","Key assignment","Left direction"]) == 1
    var right = UI.GetValue(["Rage","Anti Aim","General","Key assignment","Right direction"]) == 1
    var backward = UI.GetValue(["Rage","Anti Aim","General","Key assignment","Back direction"]) == 1

    if (left || right || backward) {
        return 'manual'
    }

    if (at_target && !(left || right || backward)) {
        return 'at-target'
    }

    if (auto_direction && !(left || right || backward)) {
        return 'freestanding'
    }
    
    return 'backward'
}
/*
math.clamp = function(value, min, max) {
    return Math.min(max, Math.max(min, value))
}
*/
/*

math.lerp = function(time, a, b) {

    time = math.clamp(Globals.Frametime() * (time * 175), 0, 1)
    
    return a * (1-time) + b * time
}

math.lerp_color = function(time, a, b) {

    time = math.clamp(Globals.Frametime() * (time * 175), 0, 1)
    //эти ебаные Math.round просто трахал трахал
    return [
        Math.round(a[0] * (1-time) + b[0] * time),
        Math.round(a[1] * (1-time) + b[1] * time),
        Math.round(a[2] * (1-time) + b[2] * time),
        Math.round(a[3] * (1-time) + b[3] * time),
    ]
}
*/

Render.Text = function(x, y, center, string, color, font) {

    x = center == 1 ? x - Render.TextSize(string, font)[0]/2 : x

    y = center == 1 ? y - Render.TextSize(string, font)[1]/2 : y

    Render.String(x, y - 2, 0, string, color, font)
    

}

math.lerp = function(time, start, end_pos) {

    time = math.clamp(Globals.Frametime() * (time * 175), 0, 1)

    if (typeof(start) == 'object') {
        var r = start[0],
            g = start[1],
            b = start[2],
            a = start[3]

        var e_r = end_pos[0],
            e_g = end_pos[1],
            e_b = end_pos[2],
            e_a = end_pos[3]

        r = math.lerp(time, r, e_r)
        g = math.lerp(time, g, e_g)
        b = math.lerp(time, b, e_b)
        a = math.lerp(time, a, e_a)

        return [r, g, b, a]
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
//ЕБАНЫЙ ПИЗДЕЦ АЛО
var   FL_ONGROUND            = bit.lshift(1, 0)
var   FL_DUCKING             = bit.lshift(1, 1)
var   FL_WATERJUMP           = bit.lshift(1, 3)
var   FL_ONTRAIN             = bit.lshift(1, 4)
var   FL_INRAIN              = bit.lshift(1, 5)
var   FL_FROZEN              = bit.lshift(1, 6)
var   FL_ATCONTROLS          = bit.lshift(1, 7)
var   FL_CLIENT              = bit.lshift(1, 8)
var   FL_FAKECLIENT          = bit.lshift(1, 9)
var   FL_INWATER             = bit.lshift(1, 10)

ui_handler.elements = {}
ui_handler.tab_controller = UI.AddDropdown(['Rage', 'Chimera.js', 'Chimera.js'], 'Tab Selection', ['???'], 0) // эллект спасибо за эту хуйню
ui_handler.tab_list = []
ui_handler.current_tab = ''


ui_handler.new_element = function(tab, name, item, stuff) { //стафф я хотел короче сделать кое че и эт тип опциональный аргумент в котором можно было бы указать че то) короче нахуй идите


    if ( !ui_handler.elements[tab] ) {
        ui_handler.elements[tab] = {}
    }

    ui_handler.elements[tab][name] = {
        reference : item
    }   
   
    return item
}

 //я ебал эту хуйню писать UserInterface.I_Want_To_Get_My_Menu_Element_Value()   *ui_handler.set* пошел я нахуй

//ебаный

defines.screen_size = Render.GetScreenSize()

defines.noscope_weapons = []

defines.noscope_weapons[38] = true
defines.noscope_weapons[11] = true
defines.noscope_weapons[9] = true
defines.noscope_weapons[40] = true

anti_bruteforce.menu_elements = []

anti_bruteforce.global_switch = ui_handler.new_element('Anti Bruteforce', 'global_switch', menu.new_checkbox('ABF', '1', 'Enable'))

anti_bruteforce.ui_condition = function() {
    return ui_handler.elements['Anti Bruteforce']['global_switch'].reference.value == true
}

anti_bruteforce.hidden_value = ui_handler.new_element('Anti Bruteforce', 'slider_antibrute_visuals', menu.new_slider('ABF', '1', 'я ебал просто какая же она ахуенная... ее лицо... ее руки... ее тело... я не могу сдерживать свои эмоции', 2, 20, function() { return false}))

ui_handler.new_element('Global', 'global_switch', menu.new_checkbox('GLOBAL', '1', 'Enable'))

ui_handler.new_element('Global', 'air_hitchance', menu.new_checkbox('GLOBAL', '1', 'Custom Air Hitchance', function() {
    return menu.get_value('GLOBAL', '1', 'Enable')
}))

ui_handler.new_element('Global', 'air_hitchance_value', menu.new_slider('GLOBAL', '1', 'Air Hitchance', 0, 100, function() {
    return menu.get_value('GLOBAL', '1', 'Enable') && menu.get_value('GLOBAL', '1', 'Custom Air Hitchance')
}))

ui_handler.new_element('Global', 'noscope_hitchance', menu.new_checkbox('GLOBAL', '1', 'Custom Noscope Hitchance', function() {
    return menu.get_value('GLOBAL', '1', 'Enable')
}))

ui_handler.new_element('Global', 'noscope_hitchance_value', menu.new_slider('GLOBAL', '1', 'Noscope Hitchance', 0, 100, function() {
    return menu.get_value('GLOBAL', '1', 'Enable') && menu.get_value('GLOBAL', '1', 'Custom Noscope Hitchance')
}))



ui_handler.new_element('Visuals', 'global_switch', menu.new_checkbox('VISUALS', '1', 'Enable'))

ui_handler.new_element('Visuals', 'indicators', menu.new_dropdown('VISUALS', '1', 'Indicators', ['Disabled', 'Default', 'Alternative'], function() {
    return menu.get_value('VISUALS', '1', 'Enable')
}))

ui_handler.new_element('Visuals', 'indicators_logo_color', menu.new_colorpicker('VISUALS', '1', 'Logo Color', function() {
    return menu.get_value('VISUALS', '1', 'Enable') && menu.get_value('VISUALS', '1', 'Indicators') == 2
}))

ui_handler.new_element('Visuals', 'indicators_desync_color', menu.new_colorpicker('VISUALS', '1', 'Logo Desync Color', function() {
    return menu.get_value('VISUALS', '1', 'Enable') && menu.get_value('VISUALS', '1', 'Indicators') == 2
}))

ui_handler.new_element('Visuals', 'indicators_bar_color', menu.new_colorpicker('VISUALS', '1', 'Desync Bar Color', function() {
    return menu.get_value('VISUALS', '1', 'Enable') && menu.get_value('VISUALS', '1', 'Indicators') == 2
}))
ui_handler.new_element('Visuals', 'custom_scope', menu.new_checkbox('VISUALS', '1', 'Custom Scope', function() {
    return menu.get_value('VISUALS', '1', 'Enable')
}))

ui_handler.new_element('Visuals', 'custom_scope_color', menu.new_colorpicker('VISUALS', '1', 'Custom Scope Color', function() {
    return menu.get_value('VISUALS', '1', 'Enable') && menu.get_value('VISUALS', '1', 'Custom Scope')
}))

ui_handler.new_element('Visuals', 'custom_scope_size', menu.new_slider('VISUALS', '1', 'Custom Scope Size', 50, defines.screen_size[1] / 2, function() {
    return menu.get_value('VISUALS', '1', 'Enable') && menu.get_value('VISUALS', '1', 'Custom Scope')
}))
ui_handler.new_element('Visuals', 'custom_scope_gap', menu.new_slider('VISUALS', '1', 'Custom Scope Gap', 0, defines.screen_size[1] / 2, function() {
    return menu.get_value('VISUALS', '1', 'Enable') && menu.get_value('VISUALS', '1', 'Custom Scope')
}))

ui_handler.new_element('Visuals', 'damage_marker', menu.new_checkbox('VISUALS', '1', 'Damage Marker', function() {
    return menu.get_value('VISUALS', '1', 'Enable')
}))

ui_handler.new_element('Visuals', 'hitlog', menu.new_checkbox('VISUALS', '1', 'Hit Log', function() {
    return menu.get_value('VISUALS', '1', 'Enable')
}))


ui_handler.new_element('Misc', 'enabled', menu.new_checkbox('MISC.', '1', 'Enable Misc'))

ui_handler.new_element('Misc', 'menu_effects', menu.new_checkbox('MISC.', '1', 'Menu Effects', function() {
    return menu.get_value('MISC.', '1', 'Enable Misc')
}))

ui_handler.new_element('Misc', 'kill_say', menu.new_checkbox('MISC.', '1', 'Kill Say', function() {
    return menu.get_value('MISC.', '1', 'Enable Misc')
}))


conditional_hitchance.air = function() {

    if (!ui_handler.elements['Global']['global_switch'].reference.value || !ui_handler.elements['Global']['air_hitchance'].reference.value) {
        return
    }
    
    var player = Entity.GetLocalPlayer()

    if (!player) {
        return
    }

    var flags = Entity.GetProp(player, 'CBasePlayer', 'm_fFlags')
    var is_on_ground = bit.band(flags, FL_ONGROUND)

    if (is_on_ground) {
        return
    }

    for (i = 0; i < 64; i++) { //вроде бы как я понял в даваскрипте от 0 идет подобная хуйн ПОХУЙЙЙЙ 
        Ragebot.ForceTargetHitchance(i, ui_handler.elements['Global']['air_hitchance_value'].reference.value)
    }

   // Render.String(0, 0, 0, 'Test Text', [255, 255, 255, 255], Render.GetFont("Verdana.ttf",11,true)) короче в вантапе рендерит +3 пикселя, в неверлузе +2

}


conditional_hitchance.no_scope = function() {


    //defines.noscope_weapons[

    if (!ui_handler.elements["Global"]["global_switch"].reference.value || !ui_handler.elements["Global"]["noscope_hitchance"].reference.value) {
        return
    }
    
    var player = Entity.GetLocalPlayer()

    if (!player) {
        return
    }
    
    var is_scoped = Entity.GetProp(player, "CCSPlayer", "m_bIsScoped")

    if (is_scoped) {
        return
    }

    var weapon = Entity.GetProp(Entity.GetWeapon(Entity.GetLocalPlayer()), "CBaseAttributableItem", "m_iItemDefinitionIndex")

    if (!weapon) {
        return
    }

    if (!defines.noscope_weapons[bit.band(weapon, 0xFFFF)]) {
        return
    }

    for (i = 0; i < 64; i++) { //вроде бы как я понял в даваскрипте от 0 идет подобная хуйн ПОХУЙЙЙЙ 
        Ragebot.ForceTargetHitchance(i, ui_handler.elements["Global"]["noscope_hitchance_value"].reference.value)
    }
    
}


visual_controller.start_offset = 15
visual_controller.non_lerp_offset = visual_controller.start_offset

visual_controller.animation_speed = 0.095
visual_controller.item_list = []
visual_controller.font = function() { return Render.GetFont('Verdana.ttf', 11, true) }
visual_controller.text_size = 12
visual_controller.is_rendering = false

visual_controller.animation_controller_items = []

visual_controller.update_animations = function() {

    for (k in visual_controller.animation_controller_items) {

        if (!visual_controller.animation_controller_items[k] || !visual_controller.animation_controller_items[k].called_this_frame) {

            if ( typeof(visual_controller.get_animation(k).number) == 'object') {

                if (defines.colors.equals( visual_controller.new_animation(k, [0, 0, 0, 0], true), [0, 0, 0, 0])) {
                    visual_controller.animation_controller_items[k] = undefined
                }

            }
            else {

                if (visual_controller.new_animation(k, 0, true) == 0) {
                    visual_controller.animation_controller_items[k] = undefined
                }

            }
            continue
        }
        

        visual_controller.animation_controller_items[k].called_this_frame = false
    }
}

visual_controller.new_animation = function(name, new_value, removing, speed_multiplier) {

    if (!visual_controller.animation_controller_items[name]) {

        visual_controller.animation_controller_items[name] = {}
        visual_controller.animation_controller_items[name].color = [0, 0, 0, 0]
        visual_controller.animation_controller_items[name].number = 0
        visual_controller.animation_controller_items[name].called_this_frame = true


    }

    if (speed_multiplier == undefined) {
        speed_multiplier = 1
    }

    if (removing == undefined) {   
        visual_controller.animation_controller_items[name].called_this_frame = true
    }

    if (typeof(new_value) == 'object') {  //ну я не знаю, анимировать векторы я не планировал, так что  П О Х У Й

        var lerping = math.lerp(visual_controller.animation_speed * speed_multiplier, visual_controller.animation_controller_items[name].color, new_value)
        visual_controller.animation_controller_items[name].color = lerping

        return lerping
    }

    var lerping = math.lerp(visual_controller.animation_speed * speed_multiplier, visual_controller.animation_controller_items[name].number, new_value)
    visual_controller.animation_controller_items[name].number = lerping

    return lerping
}

visual_controller.get_animation = function(name) {

    return !visual_controller.animation_controller_items[name] ? {number : 0, color : [0, 0, 0, 0], called_this_frame : false} : visual_controller.animation_controller_items[name]
}

visual_controller.extend = function(value) {

    if (typeof(value) != 'number') {
        return visual_controller.non_lerp_offset
    }

    visual_controller.non_lerp_offset = visual_controller.non_lerp_offset + value
    return visual_controller.non_lerp_offset
}


visual_controller.start_render = function() {
    
    if (ui_handler.elements["Visuals"]["global_switch"].reference.value == false) {
        visual_controller.is_rendering = false
        return
    }

    if (!World.GetMapName()) {
        visual_controller.is_rendering = false
        return
    }

    var localplayer = Entity.GetLocalPlayer()

    if (!localplayer) {
        visual_controller.is_rendering = false
        return
    }

    if (Entity.GetProp(localplayer, 'CBasePlayer', 'm_iHealth') < 1) {
        visual_controller.is_rendering = false
        return
    }

    visual_controller.is_rendering = true
}




visual_controller.default_indicators = function() {

    if (ui_handler.elements["Visuals"]["indicators"].reference.value != 1) {
        return 
    }

    var center = [defines.screen_size[0] / 2, defines.screen_size[1] / 2]

    visual_controller.extend(visual_controller.text_size + 12)

    var chimera_yaw_colors = [255, 255, 255, 255]

    var chimera_yaw_text = conditional_AntiAims.is_manual_enabled() ? 'FAKE YAW' : 'CHIMERA YAW'

    if (chimera_yaw_text == 'CHIMERA YAW') {

        var is_brute_active = math.clamp((anti_bruteforce.reset_time - Globals.Realtime()) / anti_bruteforce.timer, 0, 1) > 0

        if (is_brute_active) {
            chimera_yaw_colors = visual_controller.new_animation('chimera_yaw_colors', [39, 115, 39, 255])
        }
        else {
            chimera_yaw_colors = visual_controller.new_animation('chimera_yaw_colors', [218, 118, 0, 255])
        }
    }
    else {
        chimera_yaw_colors = visual_controller.new_animation('chimera_yaw_colors', [177, 151, 255, 255])
    }

    Render.Text(center[0] + 1, center[1] + visual_controller.extend() + 1, 1, chimera_yaw_text, [0, 0, 0, 255], visual_controller.font())
    Render.Text(center[0], center[1] + visual_controller.extend(), 1, chimera_yaw_text, chimera_yaw_colors, visual_controller.font())

    visual_controller.extend(visual_controller.text_size)

    var yaw_base = conditional_AntiAims.get_yaw_base()
    var dynamic_aa_text = (yaw_base == 'at-target' || yaw_base == 'freestanding') ? 'DYNAMIC' : 'DEFAULT'
    var dynamic_aa_color = [255, 255, 255, 255]

    if (dynamic_aa_text == 'DYNAMIC') {
        dynamic_aa_color = visual_controller.new_animation('dynamic_aa_color', [209, 139, 230, 255])
    }
    else {
        dynamic_aa_color = visual_controller.new_animation('dynamic_aa_color', [255, 0, 0, 255])
    }

    Render.Text(center[0] + 1, center[1] + 1 + visual_controller.extend(), 1, dynamic_aa_text, [0, 0, 0, 255], visual_controller.font())
    Render.Text(center[0], center[1] + visual_controller.extend(), 1, dynamic_aa_text, dynamic_aa_color, visual_controller.font())

    visual_controller.extend(visual_controller.text_size)

    var is_hide_shots = UI.GetValue(["Rage","Exploits","Keys","Key assignment","Hide shots"]) == 1
    var is_double_tap = UI.GetValue(["Rage","Exploits","Keys","Key assignment","Double tap"]) == 1

    var doubletap_animation = visual_controller.new_animation('doubletap_ind', is_double_tap ? 1 : 0)
    var hideshot_animation = visual_controller.new_animation('hideshot_ind', (is_hide_shots && !is_double_tap) ? 1 : 0)

    if (doubletap_animation != 0) {
        var charge = Exploit.GetCharge()

        Render.Text(center[0] + 1, center[1] + 1 + visual_controller.extend(), 1, 'DT', [0, 0, 0, Math.round(doubletap_animation * 255)], visual_controller.font())
        Render.Text(center[0], center[1] + visual_controller.extend(), 1, 'DT', [255 - Math.round(charge * 255), Math.round(charge * 255), 0, Math.round(doubletap_animation * 255)], visual_controller.font())

        visual_controller.extend(visual_controller.text_size * doubletap_animation)
    }

    if (hideshot_animation != 0) {
        var charge = Exploit.GetCharge()

        Render.Text(center[0] + 1, center[1] + 1 + visual_controller.extend(), 1, 'AA', [0, 0, 0, Math.round(hideshot_animation * 255)], visual_controller.font())
        Render.Text(center[0], center[1] + visual_controller.extend(), 1, 'AA', [209, 139, 230, Math.round(hideshot_animation * 255)], visual_controller.font())

        visual_controller.extend(visual_controller.text_size * hideshot_animation)
    }

}

visual_controller.alternative_indicators = function() {
    

    if (ui_handler.elements["Visuals"]["indicators"].reference.value != 2) {
        return 
    }

    var indicators_logo_color = ui_handler.elements["Visuals"]["indicators_logo_color"].reference.color
    var indicators_desync_color = ui_handler.elements["Visuals"]["indicators_desync_color"].reference.color

    var indicators_bar_color = visual_controller.new_animation('indicators_bar_color', ui_handler.elements["Visuals"]["indicators_bar_color"].reference.color)
    var indicators_bar_color_transparent = visual_controller.new_animation('indicators_bar_color_transparent', [indicators_bar_color[0], indicators_bar_color[1], indicators_bar_color[2], 0])

    var offset = 0

    var center = [defines.screen_size[0] / 2, defines.screen_size[1] / 2]

    visual_controller.extend(visual_controller.new_animation('desync_angle', 15))

    var desync_angle = math.clamp(Math.floor(Math.abs((Math.abs(Local.GetRealYaw() - Local.GetFakeYaw()) / 2) - Math.abs(defines.body_yaw))), 0, 60) //ШАХ И МАТ ДОЛБАЕБЫ Я ТУТ ДОЛБАЕБ

    Render.Text(center[0] + 1, center[1] + 1 + visual_controller.extend(), 1, '' + desync_angle, [0, 0, 0, 255], visual_controller.font())
    Render.Text(center[0], center[1] + visual_controller.extend(), 1, '' + desync_angle, [255, 255, 255, 255], visual_controller.font())

    visual_controller.extend(visual_controller.new_animation('desync_bar', 10))

    offset = visual_controller.extend()

    Render.GradientRect(center[0] - desync_angle, center[1] - ( 1 - offset), desync_angle, 1, 1, indicators_bar_color_transparent, indicators_bar_color)
    Render.GradientRect(center[0], center[1] - ( 1 - offset), desync_angle, 1, 1, indicators_bar_color, indicators_bar_color_transparent)

    visual_controller.extend(visual_controller.new_animation('chimera_yaw_text', 10))

    var chimera_text = conditional_AntiAims.is_manual_enabled() ? 'MANUAL AA' : 'CHIMERA YAW'

    if (conditional_AntiAims.is_legit_aa()) {
        chimera_text = 'LEGIT AA'
    }

    if (chimera_text == 'CHIMERA YAW') {
        var current_inverter = defines.anti_aim_side
        var chimera_sz = [Render.TextSize('CHIMERA YAW', visual_controller.font())[0] / 2, Render.TextSize('CHIMERA YAW', visual_controller.font())[1] / 2]
        var yaw_sz = Render.TextSize('YAW', visual_controller.font()) 

        var non_active_color = indicators_logo_color
        var active_color = indicators_desync_color

        var current_color = non_active_color

        if (current_inverter) {
            current_color = active_color
        }
        else {
            current_color = non_active_color    
        }

        var chimera_color = visual_controller.new_animation('chimera_color', current_color)
        
        Render.Text(center[0] + 1 - chimera_sz[0], center[1] + visual_controller.extend() - chimera_sz[1] + 1, 0, 'CHIMERA', [0, 0, 0, chimera_color[3]], visual_controller.font())
        Render.Text(center[0] - chimera_sz[0], center[1] + visual_controller.extend() - chimera_sz[1], 0, 'CHIMERA', chimera_color, visual_controller.font())
        
        if (!current_inverter) {
            current_color = active_color
        }
        else {
            current_color = non_active_color    
        }

        var yaw_color = visual_controller.new_animation('yaw_color', current_color)

        Render.Text(center[0] + 1 + chimera_sz[0] - yaw_sz[0], center[1] + visual_controller.extend() - chimera_sz[1] + 1, 0, 'YAW', [0, 0, 0, yaw_color[3]], visual_controller.font())
        Render.Text(center[0] + chimera_sz[0] - yaw_sz[0], center[1] + visual_controller.extend() - chimera_sz[1], 0, 'YAW', yaw_color, visual_controller.font())

    }
    else {
        Render.Text(center[0] + 1, center[1] + visual_controller.extend() + 1, 1, chimera_text, [0, 0, 0, 255], visual_controller.font())
        Render.Text(center[0], center[1] + visual_controller.extend(), 1, chimera_text, [255, 255, 255, 255], visual_controller.font())
    }
    

    var brute_time_remains = math.clamp((anti_bruteforce.reset_time - Globals.Realtime()) / anti_bruteforce.timer, 0, 1)
    
    if (brute_time_remains > 0) {
        visual_controller.new_animation('antibrute_line', 8)
    }

    var brute_anim = visual_controller.get_animation('antibrute_line').number
    var is_brute_available = brute_anim > 0

    if (is_brute_available) {

        visual_controller.extend(brute_anim)

        var offseter = visual_controller.extend()

        var vec1 = [center[0] - 30, center[1] + offseter]
        var vec2 = [60, 1]

        Render.FilledRect(vec1[0] - 1, vec1[1] - 1, vec2[0] + 2, vec2[1] + 2, [0, 0, 0, Math.round(255 * 0.5 * brute_anim / 8)] )
        Render.FilledRect(vec1[0], vec1[1], vec2[0] - (60 - (60 * brute_time_remains)), vec2[1], [255, 255, 255, Math.round(255 * 0.8 * brute_anim / 8)] )
    }

    visual_controller.extend(visual_controller.text_size)

    var is_hide_shots = UI.GetValue(["Rage","Exploits","Keys","Key assignment","Hide shots"]) == 1
    var is_double_tap = UI.GetValue(["Rage","Exploits","Keys","Key assignment","Double tap"]) == 1

    var doubletap_animation = visual_controller.new_animation('doubletap_ind', is_double_tap ? 1 : 0)
    var hideshot_animation = visual_controller.new_animation('hideshot_ind', (is_hide_shots && !is_double_tap) ? 1 : 0)

    if (doubletap_animation != 0) {
        var charge = Exploit.GetCharge()

        Render.Text(center[0] + 1, center[1] + 1 + visual_controller.extend(), 1, 'DT', [0, 0, 0, Math.round(doubletap_animation * 255)], visual_controller.font())
        Render.Text(center[0], center[1] + visual_controller.extend(), 1, 'DT', [255 - Math.round(charge * 255), Math.round(charge * 255), 0, Math.round(doubletap_animation * 255)], visual_controller.font())

        visual_controller.extend(visual_controller.text_size * doubletap_animation)
    }

    if (hideshot_animation != 0) {
        var charge = Exploit.GetCharge()

        Render.Text(center[0] + 1, center[1] + 1 + visual_controller.extend(), 1, 'ON-SHOT', [0, 0, 0, Math.round(hideshot_animation * 255)], visual_controller.font())
        Render.Text(center[0], center[1] + visual_controller.extend(), 1, 'ON-SHOT', [255 - Math.round(charge * 255), Math.round(charge * 255), 0, Math.round(hideshot_animation * 255)], visual_controller.font())
    
        visual_controller.extend(visual_controller.text_size * hideshot_animation)
    }

    var min_damage = UI.GetValue(["Rage","General","General","Key assignment","Damage override"]) == 1
    var min_damage_state = visual_controller.new_animation('min_damage_state', min_damage ? 1 : 0)

    if (min_damage_state != 0) {
        Render.Text(center[0] + 1, center[1] + 1 + visual_controller.extend(), 1, 'DMG', [0, 0, 0, Math.round(min_damage_state * 255)], visual_controller.font())
        Render.Text(center[0], center[1] + visual_controller.extend(), 1, 'DMG', [0, 255, 0, Math.round(min_damage_state * 255)], visual_controller.font())
    
        visual_controller.extend(visual_controller.text_size * min_damage_state)
    
    }

 
}




visual_controller.end_render = function() {

      

    visual_controller.update_animations()
    visual_controller.non_lerp_offset = visual_controller.start_offset
    visual_controller.is_rendering = false
}

conditional_AntiAims.conditions = []

conditional_AntiAims.is_legit_aa = function() {
    return false
}
/*
conditional_AntiAims.fake_jitter = true
conditional_AntiAims.yaw_jitter = true
conditional_AntiAims.side_jitter = true
conditional_AntiAims.sway_offset = 0
conditional_AntiAims.sway = false
*/
conditional_AntiAims.offsets = []


conditional_AntiAims.is_manual_enabled = function() {
    return conditional_AntiAims.get_yaw_base() == 'manual' && UI.GetValue(["Rage","Anti Aim","General","Key assignment","Back direction"]) != 1
}

conditional_AntiAims.separator = ui_handler.new_element('Anti Aims', 'conditional_separator', menu.new_checkbox('ANTI AIM', '1', 'Conditions'))

conditional_AntiAims.condition_list = []
conditional_AntiAims.current_condition = ui_handler.new_element('Anti Aims', 'conditional_current',menu.new_dropdown('ANTI AIM', '1', 'Current Condition', ['loading...'], function() {
    return ui_handler.elements['Anti Aims']['conditional_separator'].reference.value
}))

conditional_AntiAims.default = {}

conditional_AntiAims.default.condition = function() {
    return !ui_handler.elements['Anti Aims']['conditional_separator'].reference.value
}

conditional_AntiAims.default.yaw_add_left = ui_handler.new_element("Anti Aims", "default_yaw_add_left", menu.new_slider('ANTI AIM', '2', 'Yaw Add Left', -180, 180, conditional_AntiAims.default.condition))
conditional_AntiAims.default.yaw_add_right = ui_handler.new_element("Anti Aims", "default_yaw_add_right", menu.new_slider('ANTI AIM', '2', 'Yaw Add Right', -180, 180, conditional_AntiAims.default.condition))

conditional_AntiAims.default.yaw_modifier = ui_handler.new_element("Anti Aims", "default_yaw_modifier", menu.new_dropdown('ANTI AIM', '2', 'Yaw Modifier', ['Disabled', 'Center', 'Offset', 'Random'], conditional_AntiAims.default.condition))
conditional_AntiAims.default.modifier_degree = ui_handler.new_element("Anti Aims", "default_yaw_degree", menu.new_slider('ANTI AIM', '2', 'Modifier Degree', -180, 180, conditional_AntiAims.default.condition))

conditional_AntiAims.default.fake_limit_combo = ui_handler.new_element("Anti Aims", "default_fake_limit_combo", menu.new_dropdown('ANTI AIM', '2', 'Body Yaw', ['Static', 'Jitter'], conditional_AntiAims.default.condition))
conditional_AntiAims.default.fake_limit = ui_handler.new_element("Anti Aims", "default_fake_limit", menu.new_slider('ANTI AIM', '2', 'Fake Yaw Limit', 0, 60, conditional_AntiAims.default.condition))

conditional_AntiAims.default.lby_mode = ui_handler.new_element("Anti Aims", "default_lby_mode", menu.new_dropdown('ANTI AIM', '2', 'Lower Body Yaw', ['Disabled', 'Opposite', 'Sway'], conditional_AntiAims.default.condition))
//conditional_AntiAims.default.freestanding_desync = ui_handler.new_element("Anti Aims", "default_freestanding_desync", menu.new_dropdown('ANTI AIM', '2', 'Freestanding Desync', ['Off', 'Peek Fake', 'Peek Real'], conditional_AntiAims.default.condition))

conditional_AntiAims.default.slowmotion_limit = ui_handler.new_element("Anti Aims", "default_slowwalk_fake_limit", menu.new_slider('ANTI AIM', '2', 'Slow Motion Limit', 0, 45, conditional_AntiAims.default.condition))


conditional_AntiAims.default_type = function() {

    if (ui_handler.elements['Anti Aims']['conditional_separator'].reference.value) {
        return
    }
    AntiAim.SetOverride(1)

    var is_brute_active = math.clamp((anti_bruteforce.reset_time - Globals.Realtime()) / anti_bruteforce.timer, 0, 1)
    
    if (conditional_AntiAims.offsets['default'] == undefined) {
        
        conditional_AntiAims.offsets['default'] = {}
        conditional_AntiAims.offsets['default'].fake_jitter = true
        conditional_AntiAims.offsets['default'].yaw_jitter = true
        conditional_AntiAims.offsets['default'].side_jitter = true
        conditional_AntiAims.offsets['default'].sway_offset = 0
        conditional_AntiAims.offsets['default'].sway = false     
    }
    


    var angle_to_override = 0 //это пиздец конечно полностью антиаимы писать 
    var yaw_to_override = 0

    var yaw_jitter = 0

    if (conditional_AntiAims.default.yaw_modifier.value == 0) {
        yaw_jitter = 0
        conditional_AntiAims.offsets['default'].yaw_jitter = false
    }
    else if (conditional_AntiAims.default.yaw_modifier.value == 1) {
    
        yaw_jitter = conditional_AntiAims.offsets['default'].yaw_jitter ? -conditional_AntiAims.default.modifier_degree.value/2 : conditional_AntiAims.default.modifier_degree.value/2
    }
    else if (conditional_AntiAims.default.yaw_modifier.value == 2) {

        yaw_jitter = conditional_AntiAims.offsets['default'].yaw_jitter ? 0 : conditional_AntiAims.default.modifier_degree.value
    
    }
    else if (conditional_AntiAims.default.yaw_modifier.value == 3) {

        var random = Math.random()
        
        yaw_jitter = conditional_AntiAims.offsets['default'].yaw_jitter ? -(conditional_AntiAims.default.modifier_degree.value/2) * random : (conditional_AntiAims.default.modifier_degree.value/2) * random
    
    }

    var is_slow_walk = UI.GetValue(['Rage', 'Anti Aim', 'General', 'Key assignment', 'Slow walk']) == 1

    var yaw = ['Rage', 'Anti Aim', 'Directions', 'Yaw offset']
    var lby = ['Rage', 'Anti Aim', 'Fake', 'Lower body yaw mode']

    if (Globals.ChokedCommands() == 0) {
        
        conditional_AntiAims.offsets['default'].yaw_jitter = !conditional_AntiAims.offsets['default'].yaw_jitter

        if (!is_slow_walk) {

            if (ui_handler.elements['Anti Aims']['default_fake_limit_combo'].reference.value == 0) {
                angle_to_override = ui_handler.elements['Anti Aims']['default_fake_limit'].reference.value
            }
            else {
                
                angle_to_override = conditional_AntiAims.offsets['default'].fake_jitter ? 18 : ui_handler.elements['Anti Aims']['default_fake_limit'].reference.value

                conditional_AntiAims.offsets['default'].fake_jitter = !conditional_AntiAims.offsets['default'].fake_jitter
            }

        }
        else {

            var limit_tmp = ui_handler.elements['Anti Aims']['default_slowwalk_fake_limit'].reference.value
            var random = Math.abs(Utils.RandomInt(limit_tmp - 10, limit_tmp + 10))

            angle_to_override = random

        }
        
        defines.body_yaw = angle_to_override
    }

    var inverter = is_brute_active ? anti_bruteforce.angle > 0 : UI.GetValue(['Rage', 'Anti Aim', 'General', 'Key assignment', 'AA direction inverter']) == 1

    if (inverter) {
        yaw_to_override = ui_handler.elements["Anti Aims"]["default_yaw_add_left"].reference.value
    }
    else {   
        yaw_to_override = ui_handler.elements["Anti Aims"]["default_yaw_add_right"].reference.value
    }

    if (!is_brute_active) {
        AntiAim.SetRealOffset(angle_to_override * (inverter ? 1 : -1))
    }
    //вроде разницы нет 90 и 180 не увидел как минимум

    if (conditional_AntiAims.default.lby_mode.value == 0) {
        conditional_AntiAims.offsets['default'].sway_offset = 0
    }
    else if (conditional_AntiAims.default.lby_mode.value == 1) {
        
        conditional_AntiAims.offsets['default'].sway_offset = 90
    }
    else if (conditional_AntiAims.default.lby_mode.value == 2) {
        

        if (conditional_AntiAims.offsets['default'].sway == false) {
    
            conditional_AntiAims.offsets['default'].sway_offset += 2
            if (conditional_AntiAims.offsets['default'].sway_offset >= 90) conditional_AntiAims.offsets['default'].sway = true
        }
        else if(conditional_AntiAims.offsets['default'].sway == true) {
    
            conditional_AntiAims.offsets['default'].sway_offset -= 2
            if (conditional_AntiAims.offsets['default'].sway_offset <= -90) conditional_AntiAims.offsets['default'].sway_offset = false
        }
 
    }

    
    if (anti_bruteforce.reset_time < Globals.Realtime()) {
        AntiAim.SetLBYOffset(conditional_AntiAims.offsets['default'].sway_offset * (inverter ? -1 : 1))
    }
    

    UI.SetValue(yaw, yaw_to_override + yaw_jitter)

    //короче с оверрайдом антиаимов это не работает ............. ебал рот трахать секс
    //UI.SetValue(lby, Number(conditional_AntiAims.default.lby_mode.value)) //не знаю почему что за хуйня почему оно стало строкой а не цифрой ?????? [onetap] [AAAAAAchimera javascript.js:1504] script error: number required, found '1' (stack index 1)

    if (conditional_AntiAims.is_manual_enabled()) {
        AntiAim.SetRealOffset(58)
    }


    defines.anti_aim_side = inverter

}

conditional_AntiAims.new_condition = function(name, fn) {

    var id = conditional_AntiAims.conditions.length
    conditional_AntiAims.conditions.push({})

    conditional_AntiAims.condition_list.push(name)
    menu.update_list('ANTI AIM', '1', 'Current Condition', conditional_AntiAims.condition_list)
    var current_condition = {}


    var show_condition = function() {
        return ui_handler.elements['Anti Aims']['conditional_separator'].reference.value && (ui_handler.elements['Anti Aims']['conditional_current'].reference.value == id)
    }

    if (name != 'Shared') {
        current_condition.is_override = ui_handler.new_element('Anti Aims', name + '_override', menu.new_checkbox('ANTI AIM', '2', 'Override ' + name, show_condition))
    }

    current_condition.yaw_add_left = ui_handler.new_element('Anti Aims', name + '_yaw_add_left', menu.new_slider('ANTI AIM', '2', 'Yaw Add Left' + ' '.repeat(id + 1), -180, 180, show_condition))
    current_condition.yaw_add_right = ui_handler.new_element('Anti Aims', name + '_yaw_add_right', menu.new_slider('ANTI AIM', '2', 'Yaw Add Right' + ' '.repeat(id + 1), -180, 180, show_condition))
    
    current_condition.yaw_modifier = ui_handler.new_element('Anti Aims', name + '_yaw_modifier', menu.new_dropdown('ANTI AIM', '2', 'Yaw Modifier' + ' '.repeat(id + 1), ['Disabled', 'Center', 'Offset', 'Random'], show_condition))
    current_condition.modifier_degree = ui_handler.new_element('Anti Aims', name + '_modifier_degree', menu.new_slider('ANTI AIM', '2', 'Modifier Degree' + ' '.repeat(id + 1), -180, 180, show_condition))

    current_condition.fake_limit_combo = ui_handler.new_element('Anti Aims', name + '_fake_limit_combo', menu.new_dropdown('ANTI AIM', '2', 'Fake Limit Type' + ' '.repeat(id + 1), ['Static', 'Jitter'], show_condition))
    current_condition.fake_limit_right = ui_handler.new_element('Anti Aims', name + '_fake_limit_right', menu.new_slider('ANTI AIM', '2', 'Fake Limit Right' + ' '.repeat(id + 1), 0, 60, show_condition))
    current_condition.fake_limit_left = ui_handler.new_element('Anti Aims', name + '_fake_limit_left', menu.new_slider('ANTI AIM', '2', 'Fake Limit Left' + ' '.repeat(id + 1), 0, 60, show_condition))

    if (name == 'Slowwalk') {
        current_condition.slowwalk_custom = ui_handler.new_element("Anti Aims", name + "_custom_slowwalk_switch", menu.new_checkbox('ANTI AIM', '2', 'Custom Slowwalk Fake Limit', show_condition))
        current_condition.slowwalk_limit = ui_handler.new_element("Anti Aims", name + "_custom_slowwalk", menu.new_slider('ANTI AIM', '2', 'Slowwalk Fake Limit', 5, 45, function() {
            return show_condition() && ui_handler.elements["Anti Aims"][name + "_custom_slowwalk_switch"].reference.value
        }))
    }

    var fake_options_list = ["Jitter", "Randomize Jitter"]
    conditional_AntiAims.fake_options = ui_handler.new_element('Anti Aims', name + '_fake_options', menu.new_checkbox('ANTI AIM', '2', 'Jitter' + ' '.repeat(id + 1), show_condition))
    conditional_AntiAims.fake_options_randomize = ui_handler.new_element('Anti Aims', name + '_fake_options_randomize', menu.new_checkbox('ANTI AIM', '2', 'Randomize Jitter' + ' '.repeat(id + 1), function() {
        return show_condition() && ui_handler.elements['Anti Aims'][name + '_fake_options'].reference.value
    }))
    conditional_AntiAims.lby_mode = ui_handler.new_element('Anti Aims', name + '_lby_mode', menu.new_dropdown('ANTI AIM', '2', 'LBY Mode' + ' '.repeat(id + 1), ["Disabled", "Opposite", "Sway"], show_condition))

    conditional_AntiAims.conditions[id] = {conditions : current_condition, fn : fn}


    return true, conditional_AntiAims[id]
}


conditional_AntiAims.apply_condition = function(name) {

    var is_brute_active = math.clamp((anti_bruteforce.reset_time - Globals.Realtime()) / anti_bruteforce.timer, 0, 1)
    var inverter = false 

    AntiAim.SetOverride(1)

    if (conditional_AntiAims.offsets[name] == undefined) {
        
        conditional_AntiAims.offsets[name] = {}
        conditional_AntiAims.offsets[name].fake_jitter = true
        conditional_AntiAims.offsets[name].yaw_jitter = false
        conditional_AntiAims.offsets[name].side_jitter = true
        conditional_AntiAims.offsets[name].sway_offset = 0
        conditional_AntiAims.offsets[name].sway = false   
        conditional_AntiAims.offsets[name].inverter = false  
    }

    if (Globals.ChokedCommands() == 0) {

        if (is_brute_active) {
            conditional_AntiAims.offsets[name].inverter = anti_bruteforce.angle > 0
        }
        else {
            if (ui_handler.elements['Anti Aims'][name + '_fake_options'].reference.value) {

                conditional_AntiAims.offsets[name].inverter = conditional_AntiAims.offsets[name].side_jitter
    
                if (ui_handler.elements['Anti Aims'][name + '_fake_options_randomize'].reference.value) {
                    conditional_AntiAims.offsets[name].inverter = Math.random() > 0.5
                }
    
            }
            else {

                conditional_AntiAims.offsets[name].inverter = UI.GetValue(['Rage', 'Anti Aim', 'General', 'Key assignment', 'AA direction inverter']) == 1
    
            }
        }
    }
    
    var angle_to_override = 0 //это пиздец конечно полностью антиаимы писать 
    var yaw_to_override = 0

    var yaw_jitter = 0
    // ИНВЕРТЕР = ТРУ ТОГДА ЛЕВО ЕБАНОЕ

    var is_slow_walk = UI.GetValue(['Rage', 'Anti Aim', 'General', 'Key assignment', 'Slow walk']) == 1

    var yaw = ['Rage', 'Anti Aim', 'Directions', 'Yaw offset']

    if (Globals.ChokedCommands() == 0) {

        conditional_AntiAims.offsets[name].yaw_jitter = !conditional_AntiAims.offsets[name].yaw_jitter
        conditional_AntiAims.offsets[name].side_jitter = !conditional_AntiAims.offsets[name].side_jitter
        conditional_AntiAims.offsets[name].fake_jitter = !conditional_AntiAims.offsets[name].fake_jitter

        if (name == 'Slowwalk' && ui_handler.elements['Anti Aims'][name + '_custom_slowwalk_switch'].reference.value && is_slow_walk) {

            var angle = ui_handler.elements['Anti Aims'][name + '_custom_slowwalk'].reference.value
            angle = Utils.RandomInt(angle - 5, angle + 5)

            angle_to_override = angle
        }
        else {

            if (ui_handler.elements['Anti Aims'][name + '_fake_limit_combo'].reference.value == 0) {
                if (conditional_AntiAims.offsets[name].inverter) {
                    angle_to_override = ui_handler.elements['Anti Aims'][name + '_fake_limit_left'].reference.value 
                }
                else {
                    angle_to_override = -ui_handler.elements['Anti Aims'][name + '_fake_limit_right'].reference.value 
                }
            }
            else {
                if (conditional_AntiAims.offsets[name].inverter) {
                    angle_to_override = conditional_AntiAims.offsets[name].fake_jitter ? 18 : ui_handler.elements['Anti Aims'][name + '_fake_limit_left'].reference.value 
                }
                else {
                    angle_to_override = conditional_AntiAims.offsets[name].fake_jitter ? -18 : -ui_handler.elements['Anti Aims'][name + '_fake_limit_right'].reference.value 
                }


            }
        }

        defines.body_yaw = angle_to_override
    }

    
    var modifier_degree = ui_handler.elements['Anti Aims'][name + '_modifier_degree'].reference.value

    if (ui_handler.elements['Anti Aims'][name + '_yaw_modifier'].reference.value == 0) {
        yaw_jitter = 0
    }
    else if (ui_handler.elements['Anti Aims'][name + '_yaw_modifier'].reference.value == 1) {

        yaw_jitter = conditional_AntiAims.offsets[name].yaw_jitter ? -modifier_degree/2 : modifier_degree/2
    }
    else if (ui_handler.elements['Anti Aims'][name + '_yaw_modifier'].reference.value == 2) {
        yaw_jitter = conditional_AntiAims.offsets[name].yaw_jitter ? 0 : modifier_degree
        
    }
    else if (ui_handler.elements['Anti Aims'][name + '_yaw_modifier'].reference.value == 3) {

        var random = Math.random()

        yaw_jitter = conditional_AntiAims.offsets[name].yaw_jitter ? (-modifier_degree/2) * random : (modifier_degree/2) * random
        
    }

    if (ui_handler.elements['Anti Aims'][name + '_lby_mode'].reference.value == 0) {
        conditional_AntiAims.offsets[name].sway_offset = 0
    }
    else if (ui_handler.elements['Anti Aims'][name + '_lby_mode'].reference.value == 1) {
        
        conditional_AntiAims.offsets[name].sway_offset = 90
    }
    else if (ui_handler.elements['Anti Aims'][name + '_lby_mode'].reference.value == 2) {
        

        if (conditional_AntiAims.offsets[name].sway == false) {
    
            conditional_AntiAims.offsets[name].sway_offset += 2
            if (conditional_AntiAims.offsets[name].sway_offset >= 90) conditional_AntiAims.offsets[name].sway = true
        }
        else if(conditional_AntiAims.offsets[name].sway == true) {
    
            conditional_AntiAims.offsets[name].sway_offset -= 2
            if (conditional_AntiAims.offsets[name].sway_offset <= -90) conditional_AntiAims.offsets[name].sway = false
        }
 
    }




    if (conditional_AntiAims.offsets[name].inverter) {
        yaw_to_override = ui_handler.elements['Anti Aims'][name + '_yaw_add_left'].reference.value 
    }
    else {
        yaw_to_override = ui_handler.elements['Anti Aims'][name + '_yaw_add_right'].reference.value 
    }

    
    if (anti_bruteforce.reset_time < Globals.Realtime()) {
        AntiAim.SetRealOffset(angle_to_override)
    }
    
    AntiAim.SetLBYOffset(conditional_AntiAims.offsets[name].sway_offset * (conditional_AntiAims.offsets[name].inverter ? -1 : 1))

    defines.anti_aim_side = conditional_AntiAims.offsets[name].inverter


    UI.SetValue(yaw, yaw_to_override + yaw_jitter)

    return true
}

conditional_AntiAims.update_conditions = function() {

    if (!conditional_AntiAims.separator.value) {
        return
    }

    var is_applied = false

    var localplayer = Entity.GetLocalPlayer()

    if (!localplayer) {
        return
    }

    var localplayer_flags = Entity.GetProp(localplayer, 'CBasePlayer', 'm_fFlags')
    
    if (!localplayer_flags) { //эллект не знает, могут ли они вообще быть нил
        return
    }

    for (i in conditional_AntiAims.conditions) {

        if (i != 0) {

            var state = conditional_AntiAims.conditions[i].fn(ui_handler.elements['Anti Aims'][conditional_AntiAims.condition_list[i] + '_override'].reference.value, localplayer_flags)
            
            if (state) {
                is_applied = conditional_AntiAims.apply_condition(conditional_AntiAims.condition_list[i])

                break
            }
        }
    }


    if (!is_applied) {
        is_applied = conditional_AntiAims.apply_condition('Shared')
    }

}


conditional_AntiAims.new_condition('Shared', function(key, flags) {
    return true
})


conditional_AntiAims.new_condition('Standing', function(key, flags) {

    if (!key) {
        return false
    }

    var is_crouching = bit.band(flags, FL_DUCKING) != 0
    var on_ground = bit.band(flags, FL_ONGROUND) != 0

    return on_ground && !is_crouching && UserCMD.GetMovement()[0] == 0 && UserCMD.GetMovement()[1] == 0 && UserCMD.GetMovement()[2] == 0
})


conditional_AntiAims.new_condition('Crouching', function(key, flags) {
    
    if (!key) {
        return false
    }

    var is_crouching = bit.band(flags, FL_DUCKING) != 0
    var on_ground = bit.band(flags, FL_ONGROUND) != 0

    return on_ground && is_crouching
})


conditional_AntiAims.new_condition('Slowwalk', function(key, flags) {
    
    if (!key) {
        return false
    }

    var on_ground = bit.band(flags, FL_ONGROUND) != 0

    return on_ground && UI.GetValue(['Rage', 'Anti Aim', 'General', 'Key assignment', 'Slow walk']) == 1
})


conditional_AntiAims.new_condition('Moving', function(key, flags) {
    if (!key) {
        return false
    }

    var is_crouching = bit.band(flags, FL_DUCKING) != 0
    var on_ground = bit.band(flags, FL_ONGROUND) != 0
  
    return on_ground && !is_crouching && (UserCMD.GetMovement()[0] != 0 || UserCMD.GetMovement()[1] != 0) && UI.GetValue(['Rage', 'Anti Aim', 'General', 'Key assignment', 'Slow walk']) != 1 && !Input.IsKeyPressed(0x20)
})

conditional_AntiAims.new_condition('Air', function(key, flags) {
    
    if (!key) {
        return false
    }

    var on_ground = bit.band(flags, FL_ONGROUND) != 0

    return !on_ground
})



anti_bruteforce.new_button = ui_handler.new_element('Anti Bruteforce', 'Create New Phase', menu.new_button('ABF', '1', 'Add', function() {anti_bruteforce.create_new_phase()}, anti_bruteforce.ui_condition))
anti_bruteforce.remove_button = ui_handler.new_element('Anti Bruteforce', 'Remove Phase', menu.new_button('ABF', '1', 'Remove', function() {anti_bruteforce.remove_phase()}, anti_bruteforce.ui_condition))
//menu.destroy
anti_bruteforce.create_new_phase = function() {
    if (anti_bruteforce.menu_elements.length > 11) {
        Cheat.PrintLog('Я В АХУЕ тебе что 12 не хватает ебанат', [255, 0, 0, 255])
        return
    }

    //Cheat.PrintLog('Added new phase. Index ' + (anti_bruteforce.menu_elements.length + 1), [230, 255, 230, 255])

    var element = ui_handler.new_element('Anti Bruteforce', 'abphase' + anti_bruteforce.menu_elements.length + 1, menu.new_slider('ABF', '1', '[Phase ' + (anti_bruteforce.menu_elements.length + 1) + '] Fake Limit', -60, 60, anti_bruteforce.ui_condition))

    anti_bruteforce.menu_elements.push(element)
    menu.set_value('ABF', '1', 'я ебал просто какая же она ахуенная... ее лицо... ее руки... ее тело... я не могу сдерживать свои эмоции', anti_bruteforce.menu_elements.length)
}

anti_bruteforce.remove_phase = function() {
    if (anti_bruteforce.menu_elements.length <= 2) {
        Cheat.PrintLog('ИДИ НАХУЙ долбаеб как ты собрался с одной фазой играть', [255, 0, 0, 255])
        return
    }

    //Cheat.PrintLog('Removed a phase. Index ' + anti_bruteforce.menu_elements.length, [255, 230, 230, 255])
    ui_handler.elements['Anti Bruteforce']['abphase' + anti_bruteforce.menu_elements.length] = undefined

    anti_bruteforce.menu_elements.pop()
    menu.destroy('ABF', '1', '[Phase ' + (anti_bruteforce.menu_elements.length + 1) + '] Fake Limit')
    //menu.de('ABF', '1', 'я ебал просто какая же она ахуенная... ее лицо... ее руки... ее тело... я не могу сдерживать свои эмоции', anti_bruteforce.menu_elements.length)
}

for ( i = 0; i < 2; i ++) {
    anti_bruteforce.create_new_phase()
}


anti_bruteforce.state = false
anti_bruteforce.reset_time = 0
anti_bruteforce.last_tick_triggered = 0
anti_bruteforce.work_distance = 75
anti_bruteforce.timer = 5
anti_bruteforce.current_phase = 1
anti_bruteforce.angle = 0

anti_bruteforce.bullet_impact = function(impact_vector, enemy_eye_position, eye_position) {

    var distance = math.dist_to(math.closest_point_on_ray(impact_vector, enemy_eye_position, eye_position), eye_position)



    if (distance > anti_bruteforce.work_distance) {
        return
    }

    
    if (anti_bruteforce.reset_time < Globals.Realtime()) {
        for (i = 1; i < anti_bruteforce.menu_elements.length; i ++) {
            anti_bruteforce.current_phase = i
            break
        }
    }
    else {
        anti_bruteforce.current_phase = 1 + (anti_bruteforce.current_phase % anti_bruteforce.menu_elements.length)
    }

    anti_bruteforce.reset_time = Globals.Realtime() + anti_bruteforce.timer
    anti_bruteforce.angle = menu.get_value('ABF', '1', '[Phase ' + anti_bruteforce.current_phase + '] Fake Limit')

    
    anti_bruteforce.last_tick_triggered = Globals.Tickcount()

}


anti_bruteforce.pre_bullet_impact = function() {

    if (!ui_handler.elements['Anti Bruteforce']['global_switch'].reference.value) {
        return
    }
    
    if (anti_bruteforce.last_tick_triggered == Globals.Tickcount()) {
        return
    }

    //о да, эллект нахуярил 3 километра проверок
    //эллект думает, что в теории, на Custom серверах может вызываться этот каллбек и без переменных в ней, что вызовет отключение скрипта блинба

    var me = Entity.GetLocalPlayer()
    if (!me) {
        return
    }

    var health = Entity.GetProp(me, 'CBasePlayer', 'm_iHealth')

    if (!health) {
        return
    }

    if (health < 1) {
        return
    }

    var userid = Event.GetInt('userid')

    if(!userid) {
        return
    }

    var player_object = Entity.GetEntityFromUserID(userid)

    if (!player_object) {
        return
    }

    if (Entity.IsDormant(player_object) || Entity.IsTeammate(player_object)) {
        return
    }

    var eye_position = Entity.GetEyePosition(me)

    if (!eye_position) {
        return
    }

    var enemy_eye_position = Entity.GetEyePosition(player_object)

    if (!enemy_eye_position) {
        return
    }

    var x = Event.GetInt('x')
    var y = Event.GetInt('y')
    var z = Event.GetInt('z')

    if (!x || !y || !z) {
        return
    }

    var impact_vector = [x, y, z]

    return anti_bruteforce.bullet_impact(impact_vector, enemy_eye_position, eye_position)
}

anti_bruteforce.handle = function() {

    
    if (!ui_handler.elements['Anti Bruteforce']['global_switch'].reference.value) {
        return
    }
    
    if (anti_bruteforce.reset_time < Globals.Realtime()) {
        return
    }
    
    AntiAim.SetOverride(1)
    AntiAim.SetRealOffset(anti_bruteforce.angle)
}


configs.parse = function() {

    var config_name = [
        'chimera.config',
        'chimera2.config',
        'chimera3.config',
        'chimera4.config',
        'chimera5.config'
    ]

    var current_value = menu.get_value('CONFIGS', '1', 'Slot')
    var current_name = config_name[current_value]

    DataFile.Save(current_name)

    for (h in menu.data.items) {

        for (u in menu.data.items[h]) {
            
            for (i in menu.data.items[h][u]) {

                if (i.indexOf('Color') == -1) {
                    
                    DataFile.SetKey(current_name, h + '|' + u + '|' + i , String(menu.get_value(h, u, i)))
                   // Cheat.Print(h + '|' + u + '|' + '[Phase ' + i + '] Fake Limit' + ' | ' + Number(DataFile.GetKey(current_name, h + '|' + u + '|' + '[Phase ' + i + '] Fake Limit')) + '\n')
                }
                else {
                    DataFile.SetKey(current_name, h + '|' + u + '|' + i , String(menu.get_color(h, u, i)))
                }

            }
        }
    }

    DataFile.Save(current_name)
}

configs.load = function() {

    var config_name = [
        'chimera.config',
        'chimera2.config',
        'chimera3.config',
        'chimera4.config',
        'chimera5.config'
    ]

    var current_value = menu.get_value('CONFIGS', '1', 'Slot')
    var current_name = config_name[current_value]
    
    DataFile.Load(current_name)

    var antibrute_phases = -1

    for (h in menu.data.items) {

        for (u in menu.data.items[h]) {
            
            for (i in menu.data.items[h][u]) {
                
                if (menu.data.items[h][u][i] == undefined) {
                    Cheat.PrintLog('[!] Looks like this config hasnt got ' + i + ' value. Skipping...', [255, 255, 255, 255])
                    continue
                }
                

                if (i.indexOf('Color') == -1) {
                    var key = DataFile.GetKey(current_name, h + '|' + u + '|' + i)
                    
                    var item = menu.data.items[h][u][i]
                    var type = item.type
                    
                                        

                    switch (type) {

                        case 'checkbox' :
                            menu.set_value(h, u, i, key === 'true')
                           // Cheat.Print('Applied `' + String(key === 'true') + '` (' + key + ') value to ' + h + ' ' + u + ' ' + i + ' | type = ' + type + ' \n')
                        break

                        case 'dropdown' : 
                            menu.set_value(h, u, i, Number(key))
                            //Cheat.Print('\n ' + typeof(Number(key)))
                            //Cheat.Print('Applied `' + String(key === 'true') + '` (' + key + ') value to ' + h + ' ' + u + ' ' + i + ' | type = ' + type + ' \n')
                        break

                        case 'multi_dropdown' : 
                            /**
                             * после установки значения таблицы в меню происходит пиздец - горят все элементы, если выводить в консоль значение каждого то все как надо
                             * то есть по переменным вроде бы все окей, но на деле хуйня (как я понял я просто долбаеб и все)
                             * TODO : переделать мультидропдауны
                             */
                        break

                        case 'slider' :
                            menu.set_value(h, u, i, Number(key))
                        break

                        
                    }

                    if (i == 'я ебал просто какая же она ахуенная... ее лицо... ее руки... ее тело... я не могу сдерживать свои эмоции') {
                        antibrute_phases = Number(key)
                    }
                }
                else {

                    var color = [0, 0, 0, 0]
                    var value_string = DataFile.GetKey(current_name, h + '|' + u + '|' + i)
                    

                    if (value_string.length == 0) {
                        var value_table = menu.data.items[h][u][i].default_value
                    }
                    else {
                        
                        var value_table = value_string.split(',')
                    }
                    
                    menu.set_color(h, u, i, value_table)
                }

            }
        }
    }

    if (anti_bruteforce.menu_elements.length > antibrute_phases) {
        while (anti_bruteforce.menu_elements.length > antibrute_phases) {
            anti_bruteforce.remove_phase()
        }
    }
    else {
        while (anti_bruteforce.menu_elements.length < antibrute_phases) {
            anti_bruteforce.create_new_phase()
        }
    }

    for (j = 1; j < antibrute_phases + 1; j ++) {
        //Cheat.Print('[Phase ' + j + '] Fake Limit' + ' | ' + Number(DataFile.GetKey('chimera.config', 'ABF' + '|' + '1' + '|' + '[Phase ' + j + '] Fake Limit')) + '\n')
        menu.set_value('ABF', '1', '[Phase ' + j + '] Fake Limit', Number(DataFile.GetKey('chimera.config', 'ABF' + '|' + '1' + '|' + '[Phase ' + j + '] Fake Limit')))
    }
}
//menu.new_dropdown('ANTI AIM', '2', 'LBY Mode' + ' '.repeat(id + 1), ["Disabled", "Opposite", "Sway"]
ui_handler.new_element('Configs', 'export_config', menu.new_dropdown('CONFIGS', '1', 'Slot', ["Slot 1", "Slot 2", "Slot 3", "Slot 4", "Slot 5"]))

ui_handler.new_element('Configs', 'export_config', menu.new_button('CONFIGS', '1', 'Save config to scirpts derictory', function() {configs.parse()}))

ui_handler.new_element('Configs', 'import_config', menu.new_button('CONFIGS', '1', 'Import config from scirpts derictory', function() {configs.load()}))

ui_handler.new_element('Configs', 'label_info', menu.new_label('CONFIGS', '1', 'To load config first put it into scripts folder.\nSlot 1 - chimera.config. Slot X - chimeraX.config\n\nNOTICE: Dont try to load config whenever you dont\nhave it. You could create files manually. Also you\ncould select required config and press "Save" button\nto create it. File MUST be with .config extension\notherwise cheat wont accept it. Visit our discord\nserver to get help if necessary.\n\ndsc.gg/chimerajs'))

ui_handler.new_element('Configs', 'main_light_color', menu.new_colorpicker('CONFIGS', '2', 'Main Light Color', undefined, [255, 184, 116, 255]))

ui_handler.new_element('Configs', 'main_color', menu.new_colorpicker('CONFIGS', '2', 'Main Color', undefined, [254, 124, 56, 255]))

ui_handler.new_element('Configs', 'background_color', menu.new_colorpicker('CONFIGS', '2', 'Background Color', undefined, [15, 28, 40, 255]))

ui_handler.new_element('Configs', 'light_color', menu.new_colorpicker('CONFIGS', '2', 'Light Color', undefined, [27, 38, 50, 255]))

ui_handler.new_element('Configs', 'extra_color', menu.new_colorpicker('CONFIGS', '2', 'Extra Color', undefined, [37, 48, 60, 255]))

damage_marker.array = []
damage_marker.show_time = 2


damage_marker.render = function() {

    if (!ui_handler.elements['Visuals']['damage_marker'].reference.value) {
        return
    }

    var font = Render.GetFont('Verdana.ttf', 12, true)

    var realtime = Globals.Realtime()
    var frametime = Globals.Frametime()

    for (i in damage_marker.array) {
        var v = damage_marker.array[i]

        if (realtime < v.time) {
            v.state = visual_controller.new_animation(v.name + v.time, 1)
        }
        else {
            v.state = visual_controller.get_animation(v.name + v.time).number
        }

        if (v.state == 0) {
            damage_marker.array.shift(i)
            continue
        }

        v.position[2] = v.position[2] + 50 * frametime

        var color = [255, 255, 255, 255]

        if (v.remains <= 0) {
            color = [155, 200, 21, 255]
        }

        color[3] = Math.round(v.state * 255)

        var screen_position = Render.WorldToScreen(v.position)

        if(!screen_position) {
            continue
        }
        
        Render.Text(screen_position[0] + 1, screen_position[1] + 1, 1, '-' + v.damage, [0, 0, 0, Math.round(v.state * 255)], font)
        Render.Text(screen_position[0], screen_position[1], 1, '-' + v.damage, color, font)
    }



}


hitlog.indicators_offset = 13


hitlog.show_time = 10
hitlog.array = []

hitlog.handle = function() {

    if (!ui_handler.elements['Visuals']['hitlog'].reference.value) {
        return
    }

    var font = Render.GetFont('Verdana.ttf', 12, true)

    visual_controller.extend(hitlog.indicators_offset)

    var realtime = Globals.Realtime()

    for (i = hitlog.array.length; i > 0 ; i--) {

        //что за говно я придумал 
        
        var v = hitlog.array[i-1]


        if (realtime < v.time && !(hitlog.array.length > 6 && i == 0)) {
            v.state = visual_controller.new_animation(v.name + v.time, 1)
        }
        else {
            v.state = visual_controller.get_animation(v.name + v.time).number
        }

        if (v.state == 0) {
            hitlog.array.shift(i)
        }

        var color = [255, 255, 255, 255]

        if (v.remains <= 0) {
            color = [255, 0, 0, 255]
        }

        color[3] = Math.round(v.state * 255)

        var text_for_render = v.name + ' ' + v.hitgroup + ' -' + v.damage + ' (' + v.remains + ')' 

        var render_pos = [defines.screen_size[0] / 2, defines.screen_size[1] / 2 + visual_controller.extend()]

        Render.Text(render_pos[0] + 1, render_pos[1] + 1, 1, text_for_render, [0, 0, 0, Math.round(v.state * 255)], font)
        Render.Text(render_pos[0], render_pos[1], 1, text_for_render, color, font)
        //Render.FilledRect(render_pos[0], render_pos[1], 10, 10, color)

        visual_controller.extend(v.state * 13)
    }
}


damage_marker.event = function() {

    var victim = Event.GetInt('userid')
    var attacker = Event.GetInt('attacker')

    attacker = Entity.GetEntityFromUserID(attacker)
    victim = Entity.GetEntityFromUserID(victim)

    if (!attacker || !victim) {
        return
    }

    if (!Entity.IsLocalPlayer(attacker)) {
        return
    }

    var hitgroup = Event.GetInt('hitgroup')
    var hitbox = defines.hitgroup_to_hitbox[hitgroup]

    if (!hitbox) {
        hitbox = 5
    }

    var position = Entity.GetRenderOrigin(victim)

    position[2] = position[2] + 60
    
    var targetName = Entity.GetName(victim)

    if (targetName.length > 10) {
        targetName = targetName.substring(0, 10)
        targetName = targetName + '...'
    }

   // Cheat.Print(targetName + (Globals.Realtime() + hitlog.show_time) + '' + Event.GetInt('dmg_health') + '' + Event.GetInt('health') + '\n')

    hitlog.array.push({
        name : targetName,
        time : Globals.Realtime() + hitlog.show_time,
        damage : Event.GetInt('dmg_health'),
        remains : Event.GetInt('health'),
        state : 0.01,
        position : position,
        hitgroup : defines.hitgroups(hitgroup)
    })


    damage_marker.array.push({
        name : targetName,
        time : Globals.Realtime() + damage_marker.show_time,
        damage : Event.GetInt('dmg_health'),
        remains : Event.GetInt('health'),
        state : 0.01,
        position : position,
        hitgroup : defines.hitgroups(hitgroup)
    })
}

custom_scope.animation_state = 0

custom_scope.render = function() {
    var set_dropdown_value = function (value, index, enable) {
        var mask = 1 << index;
        
        return enable ? ( value | mask ) : ( value & ~mask );
    }

    var local_player = Entity.GetLocalPlayer()
    var removals_path = ['Visuals', 'Extra','Removals', 'Removals']

    if (!World.GetMapName()) {
        UI.SetValue(removals_path, set_dropdown_value(UI.GetValue(removals_path), 2, 1))
        Convar.SetInt("r_drawvgui", 1)
        return
    }

    if (!local_player) {
        UI.SetValue(removals_path, set_dropdown_value(UI.GetValue(removals_path), 2, 1))
        Convar.SetInt("r_drawvgui", 1)
        return
    }

    if (Entity.GetProp(local_player, 'CBasePlayer', 'm_iHealth') < 1) {
        UI.SetValue(removals_path, set_dropdown_value(UI.GetValue(removals_path), 2, 1))
        Convar.SetInt("r_drawvgui", 1)
        return
    }



    var is_enabled = ui_handler.elements['Visuals']['custom_scope'].reference.value && Entity.GetProp(local_player, 'CCSPlayer', 'm_bIsScoped')

    var planted_c4_table = Entity.GetEntitiesByClassID(129)[0]
    var is_c4_planted = planted_c4_table != undefined
    var bomb_distance = 100

    if (is_c4_planted || !is_enabled || Input.IsConsoleOpen()) {
        UI.SetValue(removals_path, set_dropdown_value(UI.GetValue(removals_path), 2, 1))
        Convar.SetInt("r_drawvgui", 1)
    }
    else {
        UI.SetValue(removals_path, set_dropdown_value(UI.GetValue(removals_path), 2, 0))
        Convar.SetInt("r_drawvgui", 0)
    }
    


    if (is_enabled) {
        custom_scope.animation_state = visual_controller.new_animation('custom_scope.animation_state', 1)
    }
    else { 
        custom_scope.animation_state = visual_controller.get_animation('custom_scope.animation_state').number
    }
    

    if (custom_scope.animation_state == 0 ) {
        return
    }

    var center_offset = ui_handler.elements['Visuals']['custom_scope_gap'].reference.value * custom_scope.animation_state

    var length = ui_handler.elements['Visuals']['custom_scope_size'].reference.value * custom_scope.animation_state
    var color = ui_handler.elements['Visuals']['custom_scope_color'].reference.color


    //Cheat.Print(typeof(menu.helpers.override_alpha(color, 0)[0]) + ' | ' + (menu.helpers.override_alpha(color, 0)[0]) + '\n')
    Render.GradientRect(defines.screen_size[0] / 2 + center_offset + 1, defines.screen_size[1] / 2, length, 1, 1, menu.helpers.override_alpha(color, custom_scope.animation_state), menu.helpers.override_alpha(color, 0) )
    Render.GradientRect(defines.screen_size[0] / 2 - center_offset - length, defines.screen_size[1] / 2, length, 1, 1, menu.helpers.override_alpha(color, 0), menu.helpers.override_alpha(color, custom_scope.animation_state) )
    
    Render.GradientRect(defines.screen_size[0] / 2, defines.screen_size[1] / 2 - center_offset - length, 1, length, 0, menu.helpers.override_alpha(color, 0), menu.helpers.override_alpha(color, custom_scope.animation_state) )
    Render.GradientRect(defines.screen_size[0] / 2, defines.screen_size[1] / 2 + center_offset + 1, 1, length, 0, menu.helpers.override_alpha(color, custom_scope.animation_state), menu.helpers.override_alpha(color, 0) )
    

}

 
menu_effects.number_of_dots = 150
menu_effects.connection_distance = 150
menu_effects.speed = 25
menu_effects.alpha = [0.75,1]
menu_effects.size = [1,2]
menu_effects.velocity = [-2,2]
menu_effects.dots = []
menu_effects.c_velocity = []
menu_effects.c_connections = []


menu_effects.generate = function(value) {
    
    menu_effects.dots = []

    for (i = 0; i < value; i++) {

        var particle_settings = []

        particle_settings[0] = Math.round(Math.random() * defines.screen_size[0])
        particle_settings[1] = Math.round(Math.random() * defines.screen_size[1])

        particle_settings[2] = menu_effects.alpha[1] - Math.random() * (menu_effects.alpha[1] - menu_effects.alpha[0])

        particle_settings[3] = menu_effects.size[1]
        
        particle_settings[4] = 10 - (20 * Math.random())
        particle_settings[5] = 10 - (20 * Math.random())

        menu_effects.dots[i] = particle_settings
    }


}

menu_effects.color = [255, 255, 255, 255]
menu_effects.c_velocity = []
menu_effects.c_connections = []

menu_effects.generate(150)

menu_effects.handle = function() {

    if (!ui_handler.elements['Misc']['enabled'].reference.value || !UI.IsMenuOpen()) {
        return
    }

    if (!ui_handler.elements['Misc']['menu_effects'].reference.value || !UI.IsMenuOpen()) {
        return
    }

    var menu_pos = [menu.data.pos.x, menu.data.pos.y]
    var menu_size = [menu.style.width, menu.style.height]
    var mouse_pos = Input.GetCursorPosition()

    menu_effects.c_connections[0] = mouse_pos[0]
    menu_effects.c_connections[1] = mouse_pos[1]

    menu_effects.c_connections[2] = menu_pos[0]
    menu_effects.c_connections[3] = menu_pos[1]

    menu_effects.c_connections[4] = menu_pos[0] + menu_size[0]
    menu_effects.c_connections[5] = menu_pos[1]

    menu_effects.c_connections[6] = menu_pos[0] + menu_size[0]
    menu_effects.c_connections[7] = menu_pos[1] + menu_size[1]

    menu_effects.c_connections[8] = menu_pos[0]
    menu_effects.c_connections[9] = menu_pos[1] + menu_size[1]

    var frame_time = Globals.Frametime()

    var color = menu_effects.color

    for (i = 0; i < menu_effects.number_of_dots; i++) {

        var current_element = menu_effects.dots[i]

        menu_effects.c_velocity[0] = current_element[4] * frame_time
        menu_effects.c_velocity[1] = current_element[5] * frame_time

        if (current_element[0] + menu_effects.c_velocity[0] > defines.screen_size[0] || current_element[0] + menu_effects.c_velocity[0] < 0) {
            menu_effects.dots[i][4] = -current_element[4]
            menu_effects.c_velocity[0] = -menu_effects.c_velocity[0]  
        }

        if (current_element[1] + menu_effects.c_velocity[1] > defines.screen_size[1] || current_element[1] + menu_effects.c_velocity[1] < 0) {
            menu_effects.dots[i][5] = -current_element[5]
            menu_effects.c_velocity[1] = -menu_effects.c_velocity[1]
        }

        menu_effects.dots[i][0] = current_element[0] + menu_effects.c_velocity[0]
        menu_effects.dots[i][1] = current_element[1] + menu_effects.c_velocity[1]

        color[3] = Math.round(current_element[2]*255)

        Render.FilledCircle(current_element[0], current_element[1], current_element[3], [255 ,255 ,255, 255])

        for (j = 0; j < 9; j++) {
            if (j % 2 != 0) {
                continue
            }

            var current_distance = Math.abs(current_element[0] - menu_effects.c_connections[j]) + Math.abs(current_element[1] - menu_effects.c_connections[j+1])

            if (current_distance < menu_effects.connection_distance) {
                color[3] = 255 - (current_distance / menu_effects.connection_distance) * 255
                Render.Line(menu_effects.c_connections[j], menu_effects.c_connections[j+1], current_element[0], current_element[1], color)
            }
        }
    }
}

Cheat.RegisterCallback('bullet_impact', 'anti_bruteforce.pre_bullet_impact')
Cheat.RegisterCallback('player_hurt', 'damage_marker.event')
Cheat.RegisterCallback('player_death', 'kill_say.handle')
Cheat.RegisterCallback('CreateMove', 'anti_bruteforce.handle')
Cheat.RegisterCallback('CreateMove', 'conditional_hitchance.air')
Cheat.RegisterCallback('CreateMove', 'conditional_hitchance.no_scope')

Cheat.RegisterCallback('CreateMove', 'conditional_AntiAims.default_type')
Cheat.RegisterCallback('CreateMove', 'conditional_AntiAims.update_conditions')


function draw_kalbek() {
    var set_dropdown_value = function (value, index, enable) {
        var mask = 1 << index;
        
        return enable ? ( value | mask ) : ( value & ~mask );
    }

    var removals_path = ['Visuals', 'Extra','Removals', 'Removals']
    if (visual_controller.is_rendering) {
        
        damage_marker.render()
        custom_scope.render()

        visual_controller.default_indicators()
        visual_controller.alternative_indicators()
        hitlog.handle()
        
    }
    else {
        
        UI.SetValue(removals_path, set_dropdown_value(UI.GetValue(removals_path), 2, 1))
        Convar.SetInt("r_drawvgui", 1)
    }
}
Cheat.RegisterCallback('Draw', 'visual_controller.start_render')

Cheat.RegisterCallback('Draw', 'draw_kalbek')

Cheat.RegisterCallback('Draw', 'visual_controller.end_render')

Cheat.RegisterCallback('Draw', 'menu_effects.handle')

Cheat.RegisterCallback('Draw', 'menu.render')
Cheat.RegisterCallback('Draw', 'menu.helpers.input_update')
