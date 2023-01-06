// #region Функциия для работы с битами
export const bit = {
	/**
	 * Побитовое И
	 *
	 * @param a Первое число
	 * @param b Второе число
	 */
	band: <F extends number, S extends number>(a: F, b: S): number => a & b,
	/**
	 * Побитовый сдвиг влево
	 *
	 * @param a Первое число
	 * @param b Второе число
	 */
	lshift: <F extends number, S extends number>(a: F, b: S): number => a << b,
	/**
	 * Побитовый сдвиг вправо
	 *
	 * @param a Первое число
	 * @param b Второе число
	 */
	rshift: <F extends number, S extends number>(a: F, b: S): number => a >> b,
	/**
	 * Побитовое НЕ
	 *
	 * @param a Первое число
	 * @param b Второе число
	 */
	bnot: <F extends number>(a: F): number => ~a,
};
// #endregion
// #region Побитовые переменные
export const IN_ATTACK = bit.lshift(1, 0);
export const IN_JUMP = bit.lshift(1, 1);
export const IN_DUCK = bit.lshift(1, 2);
export const IN_FORWARD = bit.lshift(1, 3);
export const IN_BACK = bit.lshift(1, 4);
export const IN_USE = bit.lshift(1, 5);
export const IN_CANCEL = bit.lshift(1, 6);
export const IN_LEFT = bit.lshift(1, 7);
export const IN_RIGHT = bit.lshift(1, 8);
export const IN_MOVELEFT = bit.lshift(1, 9);
export const IN_MOVERIGHT = bit.lshift(1, 10);
export const IN_ATTACK2 = bit.lshift(1, 11);
export const IN_RUN = bit.lshift(1, 12);
export const IN_RELOAD = bit.lshift(1, 13);
export const IN_ALT1 = bit.lshift(1, 14);
export const IN_ALT2 = bit.lshift(1, 15);
export const IN_SCORE = bit.lshift(1, 16);
export const IN_SPEED = bit.lshift(1, 17);
export const IN_WALK = bit.lshift(1, 18);
export const IN_ZOOM = bit.lshift(1, 19);
export const IN_WEAPON1 = bit.lshift(1, 20);
export const IN_WEAPON2 = bit.lshift(1, 21);
export const IN_BULLRUSH = bit.lshift(1, 22);
// #endregion
// #region Переменные системы клавиш
export const pressedKeys: boolean[] | number[] = [];
export const lastPressedKeys: boolean[] | number[] = [];

export let cursorPosition = Input.GetCursorPosition();
export let cacheCursorPosition = Input.GetCursorPosition();
// #endregion
// #region Система клавиш
export const input = {
	/**
	 * Возвращает текущую позицию курсора и кеширует её.
	 */
	getCursorPosition: () => {
		if (!Input.IsKeyPressed(0x01)) cursorPosition = cacheCursorPosition;

		cacheCursorPosition = Input.GetCursorPosition();

		return cursorPosition;
	},
	/**
	 * Обновляет все нажатые клавиши
	 */
	update: () => {
		for (let i = 1; i < 255; i++) {
			lastPressedKeys[i] = pressedKeys[i];
			pressedKeys[i] = Input.IsKeyPressed(i);
		}
	},
	/**
	 * Проверяет нажати ли клавиша
	 *
	 * @param key Клавиша
	 */
	isKeyPressed: <K extends number>(key: K) => pressedKeys[key] && !lastPressedKeys[key],
	/**
	 * Проверяет отжата ли клавиша
	 *
	 * @param key Клавиша
	 */
	isKeyReleased: <K extends number>(key: K) => !pressedKeys[key] && lastPressedKeys[key],
};
// #endregion
