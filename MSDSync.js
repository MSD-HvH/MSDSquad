;
var Lerp = function (value, min, max) {
    return min * (1 - value) + max * value;
};
var AnimationBuiler = /** @class */ (function () {
    function AnimationBuiler() {
        var _this = this;
        this.animations = {};
        this.UpdateAnimations = function () {
            for (var k in _this.animations) {
                if (!_this.animations[k] || !_this.animations[k].called_this_frame) {
                    if (_this.NewAnimation(k, 0) == 0) {
                        _this.animations[k] = undefined;
                    }
                    continue;
                }
                _this.animations[k].called_this_frame = false;
            }
        };
        this.NewAnimation = function (name, value) {
            if (!_this.animations[name]) {
                _this.animations[name] = {
                    color: [0, 0, 0, 0],
                    value: 0,
                    called_this_frame: true
                };
            }
            var lerping = Lerp(0.095, _this.animations[name].value, value);
            _this.animations[name].value = lerping;
            return lerping;
        };
        this.GetAnimation = function (name) {
            var _a;
            return (_a = _this.animations[name]) !== null && _a !== void 0 ? _a : {
                color: [0, 0, 0, 0],
                value: 0,
                called_this_frame: true
            };
        };
        return this;
    }
    ;
    return AnimationBuiler;
}());
;
var globalAnimations = new AnimationBuiler();
var on_Draw = function () {
    globalAnimations.UpdateAnimations();
    var boxAnimation = globalAnimations.NewAnimation("boxAnimation", UI.IsMenuOpen() ? 1 : 0).toFixed(2);
    var box = Render.FilledRect(100 * Number(boxAnimation), 100, 100, 100, [255, 255, 255, 255]);
};
Cheat.RegisterCallback("Draw", "on_Draw");
