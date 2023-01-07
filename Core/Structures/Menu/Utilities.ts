import { MathLIB } from "../../Modules/Useful";

// #region Функциия для работы с битами
/**
 * Побитовое И
 *
 * @param a Первое число
 * @param b Второе число
 */
export const BAnd = <F extends number, S extends number>(a: F, b: S): number => a & b;
/**
 * Побитовый сдвиг влево
 *
 * @param a Первое число
 * @param b Второе число
 */
export const LShift = <F extends number, S extends number>(a: F, b: S): number => a << b;
/**
 * Побитовый сдвиг вправо
 *
 * @param a Первое число
 * @param b Второе число
 */
export const RShift = <F extends number, S extends number>(a: F, b: S): number => a >> b;
/**
 * Побитовое НЕ
 *
 * @param a Первое число
 * @param b Второе число
 */
export const BNot = <F extends number>(a: F): number => ~a;
// #endregion
// #region Побитовые переменные
export const IN_ATTACK = LShift(1, 0);
export const IN_JUMP = LShift(1, 1);
export const IN_DUCK = LShift(1, 2);
export const IN_FORWARD = LShift(1, 3);
export const IN_BACK = LShift(1, 4);
export const IN_USE = LShift(1, 5);
export const IN_CANCEL = LShift(1, 6);
export const IN_LEFT = LShift(1, 7);
export const IN_RIGHT = LShift(1, 8);
export const IN_MOVELEFT = LShift(1, 9);
export const IN_MOVERIGHT = LShift(1, 10);
export const IN_ATTACK2 = LShift(1, 11);
export const IN_RUN = LShift(1, 12);
export const IN_RELOAD = LShift(1, 13);
export const IN_ALT1 = LShift(1, 14);
export const IN_ALT2 = LShift(1, 15);
export const IN_SCORE = LShift(1, 16);
export const IN_SPEED = LShift(1, 17);
export const IN_WALK = LShift(1, 18);
export const IN_ZOOM = LShift(1, 19);
export const IN_WEAPON1 = LShift(1, 20);
export const IN_WEAPON2 = LShift(1, 21);
export const IN_BULLRUSH = LShift(1, 22);
// #endregion
// #region Переменные системы клавиш
export const pressedKeys: boolean[] | number[] = [];
export const lastPressedKeys: boolean[] | number[] = [];

export let cursorPosition = Input.GetCursorPosition();
export let cacheCursorPosition = Input.GetCursorPosition();
// #endregion
// #region Система клавиш
/**
 * Возвращает текущую позицию курсора и кеширует её.
 */
export const GetCursorPosition = () => {
	if (!Input.IsKeyPressed(0x01)) cursorPosition = cacheCursorPosition;

	cacheCursorPosition = Input.GetCursorPosition();

	return cursorPosition;
};
/**
 * Обновляет все нажатые клавиши
 */
export const InputUpdate = () => {
	for (let i = 1; i < 255; i++) {
		lastPressedKeys[i] = pressedKeys[i];
		pressedKeys[i] = Input.IsKeyPressed(i);
	}
};
/**
 * Проверяет нажати ли клавиша
 *
 * @param key Клавиша
 */
export const IsKeyPressed = <K extends number>(key: K) => pressedKeys[key] && !lastPressedKeys[key];
/**
 * Проверяет отжата ли клавиша
 *
 * @param key Клавиша
 */
export const IsKeyReleased = <K extends number>(key: K) => !pressedKeys[key] && lastPressedKeys[key];
// #endregion
// #region Система анимаций
export interface Animation {
	color: number[];
	number: number;
	called_this_frame: boolean;
}

export const AnimationItems: Animation[] = [];

export const Lerp = function (time: number, start, end_pos) {
	if (time == undefined) time = 0.095;

	time = MathLIB.Clamp(Globals.Frametime() * (time * 175), 0, 1);

	if (typeof start == "object") {
		var start_color = start;
		var end_color = end_pos;

		start_color[0] = Lerp(time, start_color[0], end_color[0]);
		start_color[1] = Lerp(time, start_color[1], end_color[1]);
		start_color[2] = Lerp(time, start_color[2], end_color[2]);
		start_color[3] = Lerp(time, start_color[3], end_color[3]);
		return start_color;
	}

	var delta = end_pos - start;
	delta = delta * time;
	delta = delta + start;

	if (end_pos == 0 && delta < 0.01 && delta > -0.01) delta = 0;
	else if (end_pos == 1 && delta < 1.01 && delta > 0.99) delta = 1;

	return delta;
};

export const ColorEquals = function (firs_color: number[], second_color: number[]) {
	return firs_color[0] == second_color[0] && firs_color[1] == second_color[1] && firs_color[2] == second_color[2] && firs_color[3] == second_color[3];
};

export const UpdateAnimations = () => {
	for (var k in AnimationItems) {
		if (!AnimationItems[k] || !AnimationItems[k].called_this_frame) {
			if (typeof GetAnimation(k).number == "object") {
				if (ColorEquals(NewAnimation(k, [0, 0, 0, 0], true), [0, 0, 0, 0])) {
					AnimationItems[k] = undefined;
				}
			} else {
				if (NewAnimation(k, 0, true) == 0) {
					AnimationItems[k] = undefined;
				}
			}
			continue;
		}

		AnimationItems[k].called_this_frame = false;
	}
};

export const NewAnimation = (name: string, new_value, removing?) => {
	if (!AnimationItems[name]) {
		AnimationItems[name] = {
			color: [0, 0, 0, 0],
			number: 0,
			called_this_frame: true,
		};
	}

	if (removing == undefined) AnimationItems[name].called_this_frame = true;

	if (typeof new_value == "object") {
		var lerping = Lerp(0.095, AnimationItems[name].color, new_value);
		AnimationItems[name].color = lerping;

		return lerping;
	}

	var lerping = Lerp(0.095, AnimationItems[name].number, new_value);
	AnimationItems[name].number = lerping;

	return lerping;
};

export const GetAnimation = (name: string): Animation => {
	return !AnimationItems[name] ? { number: 0, color: [0, 0, 0, 0], called_this_frame: false } : AnimationItems[name];
};
// #endregion
// #region AUX
export const MultiplyAlpha = <C extends number[], A extends number>(color: C, alpha: A) => [color[0], color[1], color[2], color[3] * alpha];
export const InBounds = (vec_start, size, source) => {
	return source[0] > vec_start[0] && source[0] < vec_start[0] + size[0] && source[1] > vec_start[1] && source[1] < vec_start[1] + size[1];
};
// #endregion
