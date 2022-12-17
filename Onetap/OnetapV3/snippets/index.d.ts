/** 
 * Сниппет для Onetap V3
 * 
 * @author Mased
 * @version 1.0.0
 */

type LengthArray <T, N extends number, R extends T[] = []> = number extends N ? T[] : R['length'] extends N ? R : LengthArray<T, N, [T, ...R]>;

type Subtabs = {
    "Rage": "GENERAL" | "PISTOL" | "RIFLE" | "SNIPER" | "SMG";
    "Legit": "GENERAL" | "PISTOL" | "HEAVE PISTOL" | "SCOUT" | "AWP" | "AUTOSNIPER";
    "Anti-Aim": string;
    "Visual": "SELF" | "ENEMIES" | "FRIENDLIES" | "WORLD"; 
    "Misc": "GENERAL" | "PERFORMANCE & INFORMATION" | "SKINS" | "JAVASCRIPT";
}

type Color = LengthArray<number, 4>

declare namespace Globals {
    /**
     * Returns the amount of choked ticks.
     * 
     * @deprecated Doesn't work in onetap V3
     */
    function ChokedCommands(): Number;

    /**
     * Returns the time, in seconds, since the game started.
     */
    function Realtime(): Number;

    /**
     * Returns the time, in seconds, between the last and current frame.
     */
    function Frametime(): Number;

    /**
     * Returns the time, in seconds, since the server started.
     */
    function Curtime(): Number;

    /**
     * Returns the interval, in seconds, between each tick.
     */
    function TickInterval(): Number;

    /**
     * Returns the server's amount of ticks/second.
     */
    function Tickrate(): Number;

    /**
     * Returns the time, in ticks, since the server started.
     */
    function Tickcount(): Number;

    /**
     * Returns the current FrameStageNotify stage.
     * @deprecated
     */
    function FrameStage(): Number;
}

declare namespace UI {
    /**
     * Creates a new label
     * 
     * @param text Text of label
     */
    function AddLabel <T extends string> (text: T): void;

    /**
     * Can be used to toggle a hotkey or simulate key press.
     * Return Values: 1 is key is active, 0 if the key is inactive
     * 
     * @param item name of hotkey
     */
    function ToggleHotkey <T extends keyof Subtabs, S extends Subtabs[T]> (Tab: T, Subtab: S, item: string): 1 | 0;

    /**
     * Adds a textbox in which you can input text and read it later on.
     * Returns an path: string[].
     * 
     * @param name name of text
     */
    function AddTextbox <T extends keyof Subtabs, S extends Subtabs[T], N extends string> (Tab: T, Subtab: S, Area: string, name: N): ["Misc", "JAVASCRIPT", "Script items", N];

    function SetColor <T extends keyof Subtabs, S extends Subtabs[T], N extends string> (Tab: T, Subtab: S, Area: string, name: N, color: Color): void;

    function AddColorPicker <T extends string> (name: T): void;

    function AddMultiDropdown <T extends string, E extends string[]> (name: T, elements: E): void;

    function IsMenuOpen(): boolean;

    function AddDropdown <T extends string, E extends string[]> (name: T, elements: E): void;

    function AddHotkey <T extends string> (name: T): void;

    function AddSliderFloat <T extends string, F extends number, S extends number> (name: T, min: F, max: S): void;

    function AddSliderInt <T extends string, F extends number, S extends number> (name: T, min: F, max: S): void;

    function AddCheckbox <T extends string> (name: T): void;

    function IsHotkeyActive <T extends keyof Subtabs, S extends Subtabs[T], N extends string> (Tab: T, Subtab: S, Area: string, name: N): 1 | 0;

    function GetColor <T extends keyof Subtabs, S extends Subtabs[T], N extends string> (Tab: T, Subtab: S, Area: string, name: N): Color;

    function GetString <T extends keyof Subtabs, S extends Subtabs[T], N extends string> (Tab: T, Subtab: S, Area: string, name: N): string;

    function SetEnabled <T extends keyof Subtabs, S extends Subtabs[T], N extends string> (Tab: T, Subtab: S, Area: string, name: N, value: boolean): void;

    function SetValue <T extends keyof Subtabs, S extends Subtabs[T], N extends string> (Tab: T, Subtab: S, Area: string, name: N, value: boolean | number): void;

    function GetValue <T extends keyof Subtabs, S extends Subtabs[T], N extends string> (Tab: T, Subtab: S, Area: string, name: N): boolean | number;
}
