/**
 * Текущая версия репозитория
 * 
 * @type {string}
 * @since 21.03.2023
 */
export const version: string = "1.0.0";

/**
 * Имена пользователей, билд которых будет Dev
 * 
 * @type {string[]}
 * @since 1.0.0
 */
export const devUsers: string[] = [
    "Mased",
    "★scorpy_sterr★", "scropy_sterr",
];

/**
 * Текущий билд всех файлов в вантапе
 * 
 * @type {"dev" | "release"}
 * @since 1.0.0
 */
export const build: "dev" | "release" = (devUsers.join(" ")).match(Cheat.GetUsername()) ? "dev" : "release";

/**
 * Возвращает разрешение экрана которое было получено при запуске файла
 * 
 * @type {[number,number]}
 * @since 1.0.0
 */
export const screen: [number, number] = Render.GetScreenSize();