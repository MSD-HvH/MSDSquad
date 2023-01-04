import { MathLIB } from "./index";

export interface Animation {
    color: number[];
    number: number;
    called_this_frame: boolean
};

export const AnimationItems: Animation[] = [];

export const Lerp = function(time: number, start, end_pos) {
    if (time == undefined) {
        time = 0.095
    }

    time = MathLIB.Clamp(Globals.Frametime() * (time * 175), 0, 1)

    if (typeof(start) == 'object') {
        var start_color = start
        var end_color = end_pos

        start_color[0] = Lerp(time, start_color[0], end_color[0])
        start_color[1] = Lerp(time, start_color[1], end_color[1])
        start_color[2] = Lerp(time, start_color[2], end_color[2])
        start_color[3] = Lerp(time, start_color[3], end_color[3])
        return start_color
    }
    
    var delta = end_pos - start
    delta = delta * time
    delta = delta + start

    if (end_pos == 0 && delta < 0.01 && delta > -0.01) delta = 0
    else if (end_pos == 1 && delta < 1.01 && delta > 0.99) delta = 1

    return delta
}

export const ColorEquals = function(firs_color: number[], second_color: number[]) {
    return firs_color[0] == second_color[0] && firs_color[1] == second_color[1] && firs_color[2] == second_color[2] && firs_color[3] == second_color[3] 
}

export const UpdateAnimations = function() {
    for (var k in AnimationItems) {
        if (!AnimationItems[k] || !AnimationItems[k].called_this_frame) {
            if (typeof(GetAnimation(k).number) == 'object') {
                if (ColorEquals(NewAnimation(k, [0, 0, 0, 0], true), [0, 0, 0, 0])) {
                    AnimationItems[k] = undefined
                }
            }
            else {
                if (NewAnimation(k, 0, true) == 0) {
                    AnimationItems[k] = undefined
                }
            }
            continue
        }
        
        AnimationItems[k].called_this_frame = false
    };
};

export const NewAnimation = function(name: string, new_value, removing) {
    if (!AnimationItems[name]) {
        AnimationItems[name] = {
            color: [0, 0, 0, 0],
            number: 0,
            called_this_frame: true
        };
    }

    if (removing == undefined) AnimationItems[name].called_this_frame = true;

    if (typeof(new_value) == 'object') {
        var lerping = Lerp(0.095, AnimationItems[name].color, new_value)
        AnimationItems[name].color = lerping

        return lerping
    }

    var lerping = Lerp(0.095, AnimationItems[name].number, new_value)
    AnimationItems[name].number = lerping

    return lerping
};

export const GetAnimation = function(name: string): Animation {
    return !AnimationItems[name] ? {number : 0, color : [0, 0, 0, 0], called_this_frame : false} : AnimationItems[name]
};