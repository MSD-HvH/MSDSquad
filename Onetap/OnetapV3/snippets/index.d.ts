/** 
 * Сниппет для Onetap V3
 * 
 * @author Mased
 * @version 1.1.0
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
     * 
     * @example
     * ```ts
     * UI.AddLabel("Test label");
     * ```
     */
    function AddLabel <T extends string> (text: T): void;

    /**
     * Can be used to toggle a hotkey or simulate key press.
     * Return Values: 1 is key is active, 0 if the key is inactive
     * 
     * @param item name of hotkey
     * 
     * @example
     * ```ts
     * UI.ToggleHotkey("Rage", "GENERAL", "Exploits", "Doubletap");
     * ```
     */
    function ToggleHotkey <T extends keyof Subtabs, S extends Subtabs[T]> (Tab: T, Subtab: S, item: string): 1 | 0;

    /**
     * Adds a textbox in which you can input text and read it later on.
     * Returns an path: string[].
     * 
     * @param name name of text
     * 
     * @example
     * ```ts
     * UI.AddTextbox("Test Textbox");
     * ```
     */
    function AddTextbox <T extends keyof Subtabs, S extends Subtabs[T], N extends string> (Tab: T, Subtab: S, Area: string, name: N): ["Misc", "JAVASCRIPT", "Script items", N];

    /**
     * Used to set precise RGBA color codes in color picker.
     * 
     * @param name name of element
     * @param color RGBA color
     * 
     * @example
     * ```ts
     * UI.SetColor("Visual", "ENEMIES", "ESP", "Glow", [255, 255, 255, 255]);
     * ```
     */
    function SetColor <T extends keyof Subtabs, S extends Subtabs[T], N extends string, C extends Color> (Tab: T, Subtab: S, Area: string, name: N, color: C): C;

    /**
     * Adds a color picker.
     * 
     * @param name name of color picker
     * 
     * @example
     * ```ts
     * UI.AddColorPicker("Test Colorpicker")
     * ```
     */
    function AddColorPicker <N extends string> (name: N): ["Misc", "JAVASCRIPT", "Script items", N];

    /**
     * Will create a dropdown in which you can select more items under Misc - JAVASCRIPT - Script items.
     * 
     * @param name name of multi drop down
     * @param elements Array of elements
     * 
     * @example
     * ```ts
     * UI.AddMultiDropdown("Test multidropdown", ["one", "two", "three", "four"]);
     * ```
     */
    function AddMultiDropdown <N extends string, E extends string[]> (name: N, elements: E): ["Misc", "JAVASCRIPT", "Script items", N];

    /**
     * Returns true if the menu is open, false otherwise.
     */
    function IsMenuOpen(): boolean;

    /**
     * Will create a dropdown with items under Misc - JAVASCRIPT - Script items.
     * 
     * @param name name of drop down
     * @param elements Array of elements
     * 
     * @example
     * ```ts
     * UI.AddMultiDropdown("Test dropdown", ["one", "two", "three", "four"]);
     * ```
     */
    function AddDropdown <N extends string, E extends string[]> (name: N, elements: E): ["Misc", "JAVASCRIPT", "Script items", N];

    /**
     * Create a label with a key picker control under Misc - JAVASCRIPT - Script items.
     * 
     * @param name name of hotkey
     * 
     * @example
     * ```ts
     * UI.AddHotkey("Test hotkey");
     * ```
     */
    function AddHotkey <N extends string> (name: N): ["Misc", "JAVASCRIPT", "Script items", N];

    /**
     * Create a floating point slider under Misc - JAVASCRIPT - Script items.
     * 
     * @param name name of slider
     * @param min mimimum value of slider
     * @param max maximum value of slider
     * 
     * @example
     * ```ts
     * UI.AddSliderFloat("Test float slider", 1.0, 10.0);
     * ```
     */
    function AddSliderFloat <N extends string, F extends number, S extends number> (name: N, min: F, max: S): ["Misc", "JAVASCRIPT", "Script items", N];

    /**
     * Create a integer slider under Misc - JAVASCRIPT - Script items.
     * 
     * @param name name of slider
     * @param min mimimum value of slider
     * @param max maximum value of slider
     * 
     * @example
     * ```ts
     * UI.AddSliderInt("Test", 0, 100);
     * ```
     */
    function AddSliderInt <N extends string, F extends number, S extends number> (name: N, min: F, max: S): ["Misc", "JAVASCRIPT", "Script items", N];

    /**
     * Create a checkbox control under Misc - JAVASCRIPT - Script items.
     * 
     * @param name name of checkbox
     * 
     * @example
     * ```ts
     * UI.AddCheckbox("Test checkbox");
     * ```
     */
    function AddCheckbox <N extends string> (name: N): ["Misc", "JAVASCRIPT", "Script items", N];

    /**
     * Can be used to determine whether or not hotkey is active.
     * Return values undefined if an item could not be found, or if the item doesn't contain a key picker; otherwise 1 if the key is active, 0 if the key is inactive.
     * 
     * @param name name of hotkey
     */
    function IsHotkeyActive <T extends keyof Subtabs, S extends Subtabs[T], N extends string> (Tab: T, Subtab: S, Area: string, name: N): 1 | 0;

    /**
     * Can be used to get precise RGBA color codes from color picker.
     * Return values undefined if an item could not be found, or if the item doesn't contain a color picker
     * 
     * @param name name of color picker
     */
    function GetColor <T extends keyof Subtabs, S extends Subtabs[T], N extends string> (Tab: T, Subtab: S, Area: string, name: N): Color;

    /**
     * Returns a string representation of an item's current value.
     * UI item searches are not explicit: the search will return the first found item. This means that UI.GetValue("Legit","Triggerbot", "Enabled") will return the same value as UI.GetValue( "Legit", "GENERAL", "Triggerbot", "Enabled" ).
     * All script-added items are located in a groupbox within the misc tab, under javascript group called "Script items". Searching for ("Script Items", item name) is certain to return a script control.
     * 
     * @param name name of text box
     */
    function GetString <T extends keyof Subtabs, S extends Subtabs[T], N extends string> (Tab: T, Subtab: S, Area: string, name: N): string;

    /**
     * Changes menu item(s) visibility.
     * UI item searches are not explicit: the search will return the first found item. This means that UI.GetValue("Legit", "Triggerbot", "Enabled") will return the same value as UI.GetValue("Legit", "GENERAL", "Triggerbot", "Enabled").
     * All script-added items are located in a groupbox within the misc tab, under javascript group called "Script items". Searching for ("Script Items", item name) is certain to return a script control.
     * UI.SetEnabled does not work on tabs/subtabs.
     * 
     * @param name name of element
     * @param value value which should be setted
     */
    function SetEnabled <T extends keyof Subtabs, S extends Subtabs[T], N extends string> (Tab: T, Subtab: S, Area: string, name: N, value: boolean): void;

    /**
     * Sets the value of an UI item's setting.
     * UI item searches are not explicit: the search will return the first found item. This means that
     * UI.SetValue("Legit", "Triggerbot", "Enabled", true) will return the same value as UI.SetValue("Legit", "GENERAL", "Triggerbot", "Enabled", true).
     * All script-added items are located in a groupbox within the misc tab, under javascript group called "Script items". Searching for ("Script Items", item name) is certain to return a script control.
     * 
     * @param name name of element
     * @param value value which should be setted
     */
    function SetValue <T extends keyof Subtabs, S extends Subtabs[T], N extends string> (Tab: T, Subtab: S, Area: string, name: N, value: boolean | 1 | 0): void;

    /**
     * Returns the value of UI item's setting.
     * UI item searches are not explicit: the search will return the first found item. This means that UI.GetValue("Legit", "Triggerbot", "Enabled") will return the same value as UI.GetValue( "Legit", "GENERAL", "Triggerbot", "Enabled" ).
     * All script-added items are located in a groupbox within the misc tab, under javascript group called "Script items". Searching for ("Script Items", item name) is certain to return a script control.
     * UI.SetEnabled does not work on tabs/subtabs.
     * 
     * @param name name of element
     */
    function GetValue <T extends keyof Subtabs, S extends Subtabs[T], N extends string> (Tab: T, Subtab: S, Area: string, name: N): boolean | 1 | 0;
}
