type AnimationName = string;

interface AnimationStructure {
    color: [number, number, number, number],
    value: number;
    called_this_frame: boolean;
};

const Lerp = <V extends number, F extends number, S extends number> (value: V, min: F, max: S): number => {
    return min * (1 - value) + max * value;
};

class AnimationBuiler {
    public readonly animations: Record<AnimationName, AnimationStructure> = {};

    constructor() {
        return this;
    };

    public readonly UpdateAnimations = () => {
        for (const k in this.animations) {
            if (!this.animations[k] || !this.animations[k].called_this_frame) {
                if (this.NewAnimation(k, 0) == 0) {
                    this.animations[k] = undefined
                }
                
                continue;
            }
            
            this.animations[k].called_this_frame = false
        }
    };

    public readonly NewAnimation = <N extends string, V extends number> (name: N, value: V): number => {
        if(!this.animations[name]) {
            this.animations[name] = {
                color: [0, 0, 0, 0],
                value: 0,
                called_this_frame: true
            };
        }

        const lerping = Lerp(0.095, this.animations[name].value, value);
        this.animations[name].value = lerping;

        return lerping;
    };

    public readonly GetAnimation = <N extends string> (name: N): AnimationStructure => {
        return this.animations[name] ?? { 
            color: [0, 0, 0, 0],
            value: 0,
            called_this_frame: true
        };
    };
};

const globalAnimations = new AnimationBuiler();

const on_Draw = function () {
    globalAnimations.UpdateAnimations();
    const boxAnimation = globalAnimations.NewAnimation("boxAnimation", UI.IsMenuOpen() ? 1 : 0).toFixed(2);

    const box = Render.FilledRect(100 * Number(boxAnimation), 100, 100, 100, [255, 255, 255, 255]);
};

Cheat.RegisterCallback("Draw", "on_Draw");