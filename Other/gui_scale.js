var screen = render.get_screen_size()
ui.add_slider("Position x", "x", 0, screen[0])
ui.add_slider("Position y", "y", 0, screen[1])
ui.add_slider("Size", "size", 1, 4)

var sizes = {
    1: 0.5, 2: 1.0, 3: 1.5, 4: 2.0
}
// no combobox, only slider *Злой демон смайл скачать без смс и регистрации*
// Слайдера float тоже нету, довольствуемся циклом

register_callback("render", function(){
    var x = vars.get_uint("js.x"), y = vars.get_uint("js.y"); 
    var size = vars.get_uint("js.size")
    for(i in sizes){ 
        if(size == i){ //если значение слайдера size == ключу
            render.filled_rect([x, y], [200 * sizes[i], 70 * sizes[i]], [255, 255, 255, 255], 0) 
            // Умножаем на данные переменной равные этому ключу
        }
    }
    //Не будет работать с текстом, т.к 3 -  максимальное значение размера,
    //После него текст не увеличивается
})

//Впринципе простейшая функция, но может хоть научаться скрипты
//под разные визуалы делать. Ненавижу всё громозткое
