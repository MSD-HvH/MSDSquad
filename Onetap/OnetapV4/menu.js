const Other = require("./useful.js")
const drag = {};
const IsAnimating = function(anim) {
    while(anim > 0.1 && anim < 0.9) {
        return true
    }

    return false
}

exports.CreateMenu = function(data, screen) {
    this.name = data.name;
    this.size = data.size;
    this.colors = data.colors;

    // UI Elements
    this.subtab = UI.AddSubTab(["Rage", "SUBTAB_MGR"], data.name);
    this.menu_path = ["Rage", data.name, data.name]

    UI.AddSliderInt(this.menu_path, "Menu_x", 0, screen[0]);
    UI.AddSliderInt(this.menu_path, "Menu_y", 0, screen[1]);

    // Menu Elements
    this.elements_size = {
        property: { width: 350, height: 20 },
        checkbox: { width: 20, height: 20 },
        button: { width: 335, height: 20 },
        slider: { width: 335, height: 7 }
    }

    this.active = [];

    this.checkboxes = [];
    this.sliders = [];
    this.buttons = [];
    this.colorPickers = [];

    // Pagination
    this.SubTab = "Rage";

    // Animating
    this.animations = {
        logo_alpha: 0,
        text_alpha: 0,
        menu_height: 0,
        fields_height: 0,
        checkbox_a_h: 0,
        button_a_h: 0,
    }

    this.DrawUI = function(x, y, fonts) {
        // Background
        Render.FilledRect(x, y, data.size.width, data.size.height * this.animations.menu_height, data.colors.background);

        // Logo
        Render.String(x + 10, y + 6, 0, data.name, [data.colors.text[0], data.colors.text[1], data.colors.text[2], data.colors.text[3] * this.animations.logo_alpha], fonts.logo)

        // Fields
        Render.FilledRect(x + 10, y + Render.TextSize(data.name, fonts.logo)[1] + 20, data.size.width / 2 - 15, (data.size.height - Render.TextSize(data.name, fonts.logo)[1] - 30) * this.animations.fields_height, data.colors.accent)
        Render.FilledRect(x + 5 + data.size.width / 2, y + Render.TextSize(data.name, fonts.logo)[1] + 20, data.size.width / 2 - 15, (data.size.height - Render.TextSize(data.name, fonts.logo)[1] - 30) * this.animations.fields_height, data.colors.accent)
    
        this.animations.menu_height = Other.Math.Lerp(this.animations.menu_height, UI.IsMenuOpen() ? 1 : 0, 0.2);
        this.animations.logo_alpha = Other.Math.Lerp(this.animations.logo_alpha, UI.IsMenuOpen() ? 1 : 0, 0.1);
        this.animations.text_alpha = Other.Math.Lerp(this.animations.text_alpha, UI.IsMenuOpen() ? 1 : 0, 0.5);
        this.animations.fields_height = Other.Math.Lerp(this.animations.fields_height, UI.IsMenuOpen() ? 1 : 0, 0.1);
        this.animations.checkbox_a_h = Other.Math.Lerp(this.animations.checkbox_a_h, UI.IsMenuOpen() ? 1 : 0, 0.1);
        this.animations.button_a_h = Other.Math.Lerp(this.animations.button_a_h, UI.IsMenuOpen() ? 1 : 0, 0.1);
    };

    this.DrawElements = function(x, y, fonts) {
        const anim_checkbox = this.animations.checkbox_a_h
        const anim_button = this.animations.button_a_h
        const anim_text = this.animations.text_alpha

        var add_height = { General: 0, Main: 0 };
        var subtab = this.SubTab;
        var sizes = this.elements_size;

        const draw_property = function(x, y, property) {
            if(property.checkbox.value) Render.FilledRect(x, y, 20, 20, [0, 0, 0, 255])

            if(property.value) {
                if(property.checkbox.propertys[0] == property) {
                    Render.FilledRect(x + 25, y, sizes.property.width, property.checkbox.property.height * property.checkbox.property.animation, [20, 20, 20, 255])
                    Render.Rect(x + 25, y, sizes.property.width, property.checkbox.property.height * property.checkbox.property.animation, [71, 71, 71, 255])
                    
                    Render.FilledRect(x + sizes.property.width + 30, y, 20, 20, [255, 91, 77, 255])
                }

                switch (property.data.type) {
                    case "Button":
                        draw_button(x + 18, y + property.property.height - 200, property.data)

                        if(property.add_height) {
                            property.checkbox.property.height += sizes.checkbox.height + 7
                            property.add_height = false

                            return;
                        }
                    break;

                    case "Checkbox":
                        draw_checkbox(x + 18, y + property.property.height - 200, property.data)

                        if(property.add_height) {
                            property.checkbox.property.height += sizes.checkbox.height + 7
                            property.add_height = false

                            return;
                        }
                    break;

                    case "Slider":
                        draw_slider(x + 18, y + property.property.height - 210, property.data)

                        if(property.add_height) {
                            property.checkbox.property.height += sizes.checkbox.height + 7
                            property.add_height = false

                            return;
                        }
                    break;
                }
            }

            if(Other.Other.CursorBox(Input.GetCursorPosition(), x, y, x + sizes.property.width, y + sizes.property.height) && !IsAnimating(property.animation)) {
                if(Input.IsKeyPressed(0x01)) property.value = true
            };

            if(Other.Other.CursorBox(Input.GetCursorPosition(), x + sizes.property.width + 30, y, x + sizes.property.width + 50, y + sizes.property.height) && !IsAnimating(property.animation)) {
                if(Input.IsKeyPressed(0x01)) property.value = false
            };

            property.checkbox.property.animation = Other.Math.Lerp(property.checkbox.property.animation, property.value ? 1 : 0, 0.2)
        }

        const draw_checkbox = function(x, y, checkbox) {
            if(checkbox.path[0] != subtab) return;

            // Внутренности
            if(checkbox.value) Render.FilledRect(
                x + (checkbox.path[1] == "General" ? 15 : data.size.width / 2 + 10), 
                y + Render.TextSize(data.name, fonts.logo)[1] + 25 + add_height[checkbox.path[1]], 
                sizes.checkbox.width, 
                sizes.checkbox.height * anim_checkbox + 0.1, 
                [data.colors.elements_in[0], data.colors.elements_in[1], data.colors.elements_in[2], Math.floor(255 * checkbox.animation)]
            );
            // Обводка
            Render.Rect(
                x + (checkbox.path[1] == "General" ? 15 : data.size.width / 2 + 10), 
                y + Render.TextSize(data.name, fonts.logo)[1] + 25 + add_height[checkbox.path[1]], 
                sizes.checkbox.width, 
                sizes.checkbox.height * anim_checkbox + 0.1, 
                [data.colors.elements_outline[0], data.colors.elements_outline[1], data.colors.elements_outline[2], data.colors.elements_outline[3] * anim_checkbox]
            );
            // Текст
            Render.String(
                x + (checkbox.path[1] == "General" ? sizes.checkbox.width + 20 : data.size.width / 2 + sizes.checkbox.width + 15), 
                y + Render.TextSize(data.name, fonts.logo)[1] + 25 + add_height[checkbox.path[1]], 
                0, 
                checkbox.name, 
                [data.colors.text[0], data.colors.text[1], data.colors.text[2], data.colors.text[3] * anim_text], 
                fonts.elements
            );

            if(Other.Other.CursorBox(
                Input.GetCursorPosition(),
                x + (checkbox.path[1] == "General" ? 15 : data.size.width / 2 + 10), 
                (y + Render.TextSize(data.name, fonts.logo)[1]) + 25 + add_height[checkbox.path[1]], 
                x + (checkbox.path[1] == "General" ? 15 : data.size.width / 2 + 10) + sizes.checkbox.width,
                (y + Render.TextSize(data.name, fonts.logo)[1]) + 25 + add_height[checkbox.path[1]] + sizes.checkbox.height 
            ) && !IsAnimating(checkbox.animation)) {
                if(Input.IsKeyPressed(0x01)) checkbox.value = !checkbox.value
            };
            
            if(checkbox.propertys && checkbox.propertys.length >= 1) {
                checkbox.propertys.forEach(function(property) {
                    draw_property(
                        x + (checkbox.path[1] == "General" ? 330 : data.size.width / 2 + 325), 
                        y + Render.TextSize(data.name, fonts.logo)[1] + 25 + add_height[checkbox.path[1]], 
                        property
                    )
                })
            }

            checkbox.animation = Other.Math.Lerp(checkbox.animation, checkbox.value ? 1 : 0, 0.2);

            if(checkbox.path.length <= 2) add_height[checkbox.path[1]] += sizes.checkbox.height + 5
        };

        const draw_button = function(x, y, button) {
            if(button.path[0] != subtab) return;

            Render.FilledRect(
                x + (button.path[1] == "General" ? 15 : data.size.width / 2 + 10), 
                y + Render.TextSize(data.name, fonts.logo)[1] + 25 + add_height[button.path[1]], 
                sizes.button.width, 
                sizes.button.height * anim_button + 0.1, 
                [data.colors.button_in[0], data.colors.button_in[1], data.colors.button_in[2], data.colors.button_in[3] * anim_button]
            );

            Render.Rect(
                x + (button.path[1] == "General" ? 15 : data.size.width / 2 + 10), 
                y + Render.TextSize(data.name, fonts.logo)[1] + 25 + add_height[button.path[1]], 
                sizes.button.width, 
                sizes.button.height * anim_button + 0.1, 
                [data.colors.button_outline[0], data.colors.button_outline[1], data.colors.button_outline[2], data.colors.button_outline[3] * anim_button]
            );

            Render.String(
                x + sizes.button.width / 2 + (button.path[1] == "General" ? 15 : data.size.width / 2 + 10), 
                y + Render.TextSize(data.name, fonts.logo)[1] + 26 + add_height[button.path[1]], 
                1, 
                button.name, 
                [data.colors.text[0], data.colors.text[1], data.colors.text[2], data.colors.text[3] * anim_text], 
                fonts.elements
            );

            if(Other.Other.CursorBox(
                Input.GetCursorPosition(),
                x + (button.path[1] == "General" ? 15 : data.size.width / 2 + 10), 
                (y + Render.TextSize(data.name, fonts.logo)[1]) + 25 + add_height[button.path[1]], 
                x + (button.path[1] == "General" ? 15 : data.size.width / 2 + 10) + sizes.button.width,
                (y + Render.TextSize(data.name, fonts.logo)[1]) + 25 + add_height[button.path[1]] + sizes.button.height 
            )&& !IsAnimating(button.animation)) {
                if(Input.IsKeyPressed(0x01)) {
                    button.value = true;
                    button.animation = Other.Math.Lerp(button.animation, button.value ? 1 : 0, 0.5);
                }
            };

            button.animation = Other.Math.Lerp(button.animation, button.value ? 1 : 0, 0.2);

            if(button.path.length <= 2) add_height[button.path[1]] += sizes.button.height + 5
        };

        const draw_slider = function(x, y, slider) {
            if(slider.path[0] != subtab) return;

            Render.FilledRect(
                x + (slider.path[1] == "General" ? 15 : data.size.width / 2 + 10), 
                y + 20 + Render.TextSize(data.name, fonts.logo)[1] + 25 + add_height[slider.path[1]], 
                sizes.slider.width, 
                sizes.slider.height, 
                [data.colors.slider_outline[0], data.colors.slider_outline[1], data.colors.slider_outline[2], data.colors.slider_outline[3]]
            );

            Render.FilledRect(
                x + 2 + (slider.path[1] == "General" ? 15 : data.size.width / 2 + 10), 
                y + 22 + Render.TextSize(data.name, fonts.logo)[1] + 25 + add_height[slider.path[1]], 
                sizes.slider.width - 4, 
                sizes.slider.height - 4, 
                [data.colors.slider_in[0], data.colors.slider_in[1], data.colors.slider_in[2], data.colors.slider_in[3]]
            );

            Render.String(
                x + (slider.path[1] == "General" ? 15 : data.size.width / 2 + 10), 
                y + 4 + Render.TextSize(data.name, fonts.logo)[1] + 20 + add_height[slider.path[1]], 
                0, 
                slider.name, 
                [data.colors.text[0], data.colors.text[1], data.colors.text[2], data.colors.text[3] * anim_text], 
                fonts.elements
            );

            Render.String(
                x + sizes.slider.width - Render.TextSize(slider.value.toString(), fonts.elements)[0] + (slider.path[1] == "General" ? 15 : data.size.width / 2 + 10), 
                y + 4 + Render.TextSize(data.name, fonts.logo)[1] + 20 + add_height[slider.path[1]], 
                0, 
                slider.value.toString(), 
                [data.colors.text[0], data.colors.text[1], data.colors.text[2], data.colors.text[3] * anim_text], 
                fonts.elements
            );

            Render.FilledRect(
                (x + (slider.value - slider.min) / (slider.max - slider.min) * (sizes.slider.width - 5)) + (slider.path[1] == "General" ? 15 : data.size.width / 2 + 10), 
                y + 18 + Render.TextSize(data.name, fonts.logo)[1] + 25 + add_height[slider.path[1]], 
                5, 
                11, 
                data.colors.elements_in
            );

            const percent = (sizes.slider.width - 10) / Math.abs(slider.min - slider.max)

            if(Other.Other.CursorBox(
                Input.GetCursorPosition(),
                x + 2 + (slider.path[1] == "General" ? 15 : data.size.width / 2 + 10), 
                (y + 20 + Render.TextSize(data.name, fonts.logo)[1]) + 25 + add_height[slider.path[1]], 
                x + 2 + (slider.path[1] == "General" ? 15 : data.size.width / 2 + 10) + sizes.slider.width - 5,
                (y + 20 +  Render.TextSize(data.name, fonts.logo)[1]) + 25 + add_height[slider.path[1]] + sizes.slider.height 
            )) {
                if(Input.IsKeyPressed(0x01)) {
                    const cursor = Input.GetCursorPosition()
                    const value = Other.Math.Clamp(Math.round(((cursor[0] - x - 20) / percent) + slider.min), slider.min, slider.max)
                    
                    slider.value = value
                }
            };

            if(slider.path.length <= 2) add_height[slider.path[1]] += sizes.slider.height + 30
        };
        
        // Ххехехе, а вот без колорпикера
        // const draw_color_picker = function(x, y, colorPicker) {
        //     if(colorPicker.path[0] != subtab) return;


        // }

        this.buttons.forEach(function(button) {
            if(button.path.length > 2 || button.path.length < 2) return;
            if(button.value == true) button.value = false;

            draw_button(button.x || x, button.y || y, button)
        });

        this.sliders.forEach(function(slider) {
            if(slider.path.length > 2 || slider.path.length < 2) return;

            draw_slider(slider.x || x, slider.y || y, slider)
        });

        this.checkboxes.forEach(function(checkbox) {
            if(checkbox.path.length > 2 || checkbox.path.length < 2) return;

            draw_checkbox(checkbox.x || x, checkbox.y || y, checkbox)
        });

        // this.colorPickers.forEach(function(colorPicker) {
        //     if(colorPicker.path.length > 2 || colorPicker.path.length < 2) return;

        //     draw_color_picker(colorPicker.x || x, colorPicker.y || y, colorPicker)
        // })
    };

    this.Drag = function(x, y, w, h, item) {
        if (!drag[item]) {
            drag[item] = {}
            drag[item].drag_position = [0, 0]
            drag[item].is_dragging = false
        }
    
        if (Other.Other.CursorBox(Input.GetCursorPosition(), x, y, x + w, y + h)) {
            if (Input.IsKeyPressed(0x01) && drag[item].is_dragging == false && (current_dragging_item == undefined || current_dragging_item == item)) {
                drag[item].is_dragging = true
                current_dragging_item = item
                drag[item].drag_position = [x - Input.GetCursorPosition()[0], y - Input.GetCursorPosition()[1]]
            }
        }
        
        if (!Input.IsKeyPressed(0x01)) {
            drag[item].is_dragging = false
            current_dragging_item = undefined
        }
    
        if (drag[item].is_dragging == true && UI.IsMenuOpen()) {
            UI.SetValue(['Rage', data.name, data.name, item + '_x'], Input.GetCursorPosition()[0] + drag[item].drag_position[0])
            UI.SetValue(['Rage', data.name, data.name, item + '_y'], Input.GetCursorPosition()[1] + drag[item].drag_position[1])
        }
    };

    this.AddCheckbox = function(path, name) {
        const checkbox = {
            path: path,
            name: name,
            value: false,
            animation: 0,
            propertys: [],
            property: {
                height: 0,
                animation: 0
            }
        };

        this.checkboxes.push(checkbox);

        return checkbox;
    };

    this.AddButton = function(path, name) {
        const button = {
            path: path,
            name: name,
            value: false,
            animation: 0
        };

        this.buttons.push(button);

        return button;
    };

    this.AddSlider = function(path, name, min, max) {
        const slider = {
            path: path,
            name: name,
            value: min,
            min: min,
            max: max,
            animation: 0
        };

        this.sliders.push(slider);

        return slider;
    };

    // this.AddColorPicker = function(path, name) {
    //     const colorPicker = {
    //         path: path,
    //         name: name,
    //         color: [255, 255, 255, 255],
    //         cached: [255, 255, 255, 255],
    //         animation: 0
    //     };

    //     this.colorPickers.push(colorPicker);

    //     return colorPicker;
    // }

    this.AddProperty = function(path, data) {
        const property = {
            path: path,
            height: 40,
            add_height: true,
            data: data,
        };

        property.data.value = data.min + "" ? data.min : false
        property.data.animation = 0;

        const name = path[2]
        const path_checkbox = [path[0], path[1]]

        property.data.path = path;
        property.property = property

        this.checkboxes.forEach(function(checkbox) {
            if(checkbox.path.toString() === path_checkbox.toString() && checkbox.name == name) {
                property.checkbox = checkbox
                checkbox.propertys.push(property)
            }

            if(checkbox.propertys && checkbox.propertys.length >= 1) {
                checkbox.propertys.forEach(function(property) {
                    property.height += data.type == "Slider" ? 35 : 25
                })
            }
        })

        return property;
    };

    this.GetValue = function(path, name, dev) {
        var result = undefined;

        [this.checkboxes, this.sliders, this.buttons].forEach(function(elements) {
            const element = elements.forEach(function(element) {
                if(!element) return undefined;

                if((element.path[0].toString() === path[0].toString()) && (element.name.toString() === name.toString())) result = dev ? element : element.value;
                if(element.propertys && element.propertys.length >= 1) {
                    element.propertys.forEach(function(property) {
                        if(
                            property.data.path.slice(0, 2).toString() === element.path.slice(0, 2).toString()
                            && property.data.path[2] === element.name
                        ) result = dev ? property : property.data.value
                    })
                }
            })
        })

        return result;
    };
}
