// #region Функциия для работы с битами
interface Bit {
	/**
	 * Побитовое И
	 *
	 * @param a Первое число
	 * @param b Второе число
	 */
	band: <F extends number, S extends number>(a: F, b: S) => number;
	/**
	 * Побитовый сдвиг влево
	 *
	 * @param a Первое число
	 * @param b Второе число
	 */
	lshift: <F extends number, S extends number>(a: F, b: S) => number;
	/**
	 * Побитовый сдвиг вправо
	 *
	 * @param a Первое число
	 * @param b Второе число
	 */
	rshift: <F extends number, S extends number>(a: F, b: S) => number;
	/**
	 * Побитовое НЕ
	 *
	 * @param a Первое число
	 * @param b Второе число
	 */
	bnot: <F extends number>(a: F) => number;
}

const band = <F extends number, S extends number>(a: F, b: S): number => a & b;
const lshift = <F extends number, S extends number>(a: F, b: S): number => a << b;
const rshift = <F extends number, S extends number>(a: F, b: S): number => a >> b;
const bnot = <F extends number>(a: F): number => ~a;

export const bit: Bit = { band, lshift, rshift, bnot };
// #endregion
// #region Побитовые переменные
export const IN_ATTACK = lshift(1, 0);
export const IN_JUMP = lshift(1, 1);
export const IN_DUCK = lshift(1, 2);
export const IN_FORWARD = lshift(1, 3);
export const IN_BACK = lshift(1, 4);
export const IN_USE = lshift(1, 5);
export const IN_CANCEL = lshift(1, 6);
export const IN_LEFT = lshift(1, 7);
export const IN_RIGHT = lshift(1, 8);
export const IN_MOVELEFT = lshift(1, 9);
export const IN_MOVERIGHT = lshift(1, 10);
export const IN_ATTACK2 = lshift(1, 11);
export const IN_RUN = lshift(1, 12);
export const IN_RELOAD = lshift(1, 13);
export const IN_ALT1 = lshift(1, 14);
export const IN_ALT2 = lshift(1, 15);
export const IN_SCORE = lshift(1, 16);
export const IN_SPEED = lshift(1, 17);
export const IN_WALK = lshift(1, 18);
export const IN_ZOOM = lshift(1, 19);
export const IN_WEAPON1 = lshift(1, 20);
export const IN_WEAPON2 = lshift(1, 21);
export const IN_BULLRUSH = lshift(1, 22);
// #endregion
// #region Переменные системы клавиш
export const pressedKeys: boolean[] | number[] = [];
export const lastPressedKeys: boolean[] | number[] = [];

export let cursorPosition = Input.GetCursorPosition();
export let cacheCursorPosition = Input.GetCursorPosition();
// #endregion
// #region Система клавиш
interface Input {
	/**
	 * Возвращает текущую позицию курсора и кеширует её.
	 */
	getCursorPosition: () => number[];
	/**
	 * Обновляет все нажатые клавиши
	 */
	update: () => void;
	/**
	 * Проверяет нажати ли клавиша
	 *
	 * @param key Клавиша
	 */
	isKeyPressed: <K extends number>(key: K) => boolean | number;
	/**
	 * Проверяет отжата ли клавиша
	 *
	 * @param key Клавиша
	 */
	isKeyReleased: <K extends number>(key: K) => boolean | number;
}

const getCursorPosition = () => {
	if (!Input.IsKeyPressed(0x01)) cursorPosition = cacheCursorPosition;

	cacheCursorPosition = Input.GetCursorPosition();

	return cursorPosition;
};

const update = () => {
	for (let i = 1; i < 255; i++) {
		lastPressedKeys[i] = pressedKeys[i];
		pressedKeys[i] = Input.IsKeyPressed(i);
	}
};

const isKeyPressed = <K extends number>(key: K) => pressedKeys[key] && !lastPressedKeys[key];
const isKeyReleased = <K extends number>(key: K) => !pressedKeys[key] && lastPressedKeys[key];

export const input: Input = { getCursorPosition, update, isKeyPressed, isKeyReleased };
// #endregion
