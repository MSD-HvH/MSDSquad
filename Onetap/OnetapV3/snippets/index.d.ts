/**
 * Сниппет для Onetap V3
 * 
 * @author Mased
 * @version 1.2.5
 * 
 * Полезные материалы:
 * @link https://github.com/ZaUserA/OneTap-v3-Js
 * @link https://gamesensical.gitbook.io/docs/developers/netprops
 * @link https://github.com/MasedMSD/MSDSquad
 * 
 * Thanks april's github btw <3
 * @link https://github.com/aprxl/scripting
 */

type LengthArray <T, N extends number, R extends T[] = []> = number extends N ? T[] : R['length'] extends N ? R : LengthArray<T, N, [T, ...R]>;

type Subtabs = {
    "Rage": "GENERAL" | "PISTOL" | "RIFLE" | "SNIPER" | "SMG";
    "Legit": "GENERAL" | "PISTOL" | "HEAVE PISTOL" | "SCOUT" | "AWP" | "AUTOSNIPER";
    "Anti-Aim": string;
    "Visual": "SELF" | "ENEMIES" | "FRIENDLIES" | "WORLD"; 
    "Misc": "GENERAL" | "PERFORMANCE & INFORMATION" | "SKINS" | "JAVASCRIPT";
}

/**
 * An array of numbers (RGBA color)
 */
type Color = LengthArray<number, 4>

/**
 * The index of an entity.
 */
type EntityID = number;

/**
 * The index of a user in an event.
 */
type UserID = Number;

/**
 * Adds a texture.
 * 
 * Path is relative to CSGO folder, so you don't need full path.
 * Supports the following formats:
 * .bmp
 * .dds
 * .dib
 * .hdr
 * .jpg
 * .pfm
 * .png
 * .ppm
 * .tga
 */
type Texture = string;

/**
 * Windows font
 * Default path: C:\Windows\Fonts
 */
type Font = string;

/**
 * An array containing three number corresponding to the X, Y and Z positions of a 3D point.
 * Or, alternatively, an array containing the pitch, yaw and roll of an Euler angle.
 */
type Vector = number[];

/**
 * Width, height size
 */
type Size = LengthArray<number, 2>;

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

declare namespace Entity {
    /**
     * Returns an array containing the data of a entity's bounding box: whether or not the box is valid, the box's top left corner X position,
     * the box's top left Y position, the box's bottom right X position and the box's bottom right Y position.
     * @param index The entity's index
     */
    function GetRenderBox(index: EntityID): number[];

    /**
     * Returns an array containing all of the weapon's entity indexes of a player.
     * @param index 
     */
    function GetWeapons(index: EntityID): EntityID[];

    /**
     * Returns an array containing all entities of a certain class.
     * @param class_index The class' index.
     */
    function GetEntitiesByClassID(class_index: number): EntityID[];

    /**
     * Returns the hitbox's position of an entity.
     * @param index The entity's index
     * @param hitbox_index The hitbox's index. Ranges from 0 to 18.
     * 
     * HITBOX_HEAD = 0
     * HITBOX_NECK = 1
     * HITBOX_PELVIS = 2
     * HITBOX_BODY = 3
     * HITBOX_THORAX = 4
     * HITBOX_CHEST = 5
     * HITBOX_UPPER_CHEST = 6
     * HITBOX_LEFT_THIGH = 7
     * HITBOX_RIGHT_THIGH = 8
     * HITBOX_LEFT_CALF = 9
     * HITBOX_RIGHT_CALF = 10
     * HITBOX_LEFT_FOOT = 11
     * HITBOX_RIGHT_FOOT = 12
     * HITBOX_LEFT_HAND = 13
     * HITBOX_RIGHT_HAND = 14
     * HITBOX_LEFT_UPPER_ARM = 15
     * HITBOX_LEFT_FOREARM = 16
     * HITBOX_RIGHT_UPPER_ARM = 17
     * HITBOX_RIGHT_FOREARM = 18
     */
    function GetHitboxPosition(index: EntityID, hitbox_index: number): Vector;

    /**
     * Returns the entity's eye position.
     * @param index The entity's index
     */
    function GetEyePosition(index: EntityID): Vector;

    /**
     * Returns the game's CCSGameRulesProxy entity.
     */
    function GetGameRulesProxy(): EntityID;

    /**
     * Returns whether or not the specified entity is a bot.
     * @param index The entity's index
     */
    function IsBot(index: EntityID): boolean;

    /**
     * Returns the weapon's entity index of a player.
     * @param index The player's index
     */
    function GetWeapon(index: EntityID): EntityID;

    /**
     * Overrides a property of an entity. Cannot be used on players.
     * @param index The entity's index
     * @param table The property's table
     * @param prop The property's name
     * @param value The new value
     */
    function SetProp(index: EntityID, table: string, prop: string, value: any): any;

    /**
     * Gets a property from an entity. Returns property's name on failure.
     * @param index The entity's index
     * @param table The property's table
     * @param prop The property's name
     */
    function GetProp(index: EntityID, table: string, prop: string): any;

    /**
     * Returns the entity's origin position.
     * @param index The entity's index
     */
    function GetRenderOrigin(index: EntityID): Vector;

    /**
     * Returns the entity's name.
     * @param index The entity's index
     */
    function GetName(index: EntityID): string;

    /**
     * Returns the entity's class name.
     * @param index The entity's index
     */
    function GetClassName(index: EntityID): string;

    /**
     * Returns the entity's class identifier.
     * @param index The entity's index
     */
    function GetClassID(index: EntityID): number;

    /**
     * Returns whether or not the specified entity is dormant.
     * @param index The entity's index.
     */
    function IsDormant(index: EntityID): boolean;

    /**
     * Returns whether or not the specified entity is alive.
     * @param index The entity's index.
     */
    function IsAlive(index: EntityID): boolean;

    /**
     * Returns whether or not the specified entity is valid.
     * @param index The entity's index.
     */
    function IsValid(index: EntityID): boolean;

    /**
     * Returns whether or not the specified entity is ourselves.
     * @param index The entity's index.
     */
    function IsLocalPlayer(index: EntityID): boolean;

    /**
     * Returns whether or not the specified entity is an enemy.
     * @param index The entity's index.
     */
    function IsEnemy(index: EntityID): boolean;

    /**
     * Returns whether or not the specified entity is a teammate.
     * @param index The entity's index.
     */
    function IsTeammate(index: EntityID): boolean;

    /**
     * Returns the entity index of the entity equivalent to the specified user index.
     * @param index The user's index.
     */
    function GetEntityFromUserID(index: UserID): EntityID;

    /**
     * Returns the entity ID of the local player.
     */
    function GetLocalPlayer(): EntityID;

    /**
     * Returns an array with all teammates in the server.
     */
    function GetTeammates(): EntityID[];

    /**
     * Returns an array with all enemies in the server.
     */
    function GetEnemies(): EntityID[];

    /**
     * Returns an array with all players in the server.
     */
    function GetPlayers(): EntityID[];

    /**
     * Returns an array with all entities in the server.
     */
    function GetEntities(): EntityID[];

    /**
     * Returns an array of player entity indexes.
     */
    function GetPlayers(): EntityID[];
}

declare namespace Render {
    /**
     * Draws a filled circle with the given position, radius, and RGBA color.
     * 
     * @param x The X position
     * @param y The Y position
     * @param radius The circle's radius
     * @param color The circle's color
     */
    function FilledCircle(x: number, y: number, radius: number, color: Color): void;

    /**
     * Draws a textured rectangle with the given position, size, and texture.
     * @param x The X position
     * @param y The Y position
     * @param w The rectangle's width
     * @param h The rectangle's height
     * @param texture The rectangle's texture index
     */
    function TexturedRect(x: number, y: number, w: number, h: number, texture: Texture): void;

    /**
     * Adds a texture.
     * Returns texture identifier.
     * 
     * @param path The file's path relative to CSGO's folder. Supported files are .bmp, .dds, .dib, .hdr, .jpg, .pfm, .png, .ppm and .tga.
     */
    function AddTexture(path: string): Texture;

    /**
     * Finds the text width size of the given string with custom font.
     * 
     * @param text The actual string
     * @param font The string's font
     */
    function TextSizeCustom(text: string, font: Font): Size;

    /**
     * Finds the text width size of the given string with font.
     * 
     * @param text The actual string
     * @param font The string's font. 0 - default, 1 - bold, 2 - small, 3 - small bold, 4 - large, 5 - icon, 6 - small icon, 8 to 48 regular
     */
    function TextSize(text: string, font?: number): Size;

    /**
     * Draws a string with custom font.
     * 
     * @param x The X position
     * @param y The Y position
     * @param centered Whether or not it should be centered.
     * @param text The actual string
     * @param color The string's color
     * @param font The string's font.
     */
    function StringCustom(x: number, y: number, centered: 1 | 0, text: string, color: Color, font: number): void;

    /**
     * Draws a string with custom font.
     * 
     * @param x The X position
     * @param y The Y position
     * @param centered Whether or not it should be centered.
     * @param text The actual string
     * @param color The string's color
     * @param font The string's font. 0 - default, 1 - bold, 2 - small, 3 - small bold, 4 - large, 5 - icon, 6 - small icon, 8 to 48 regular
     */
    function String(x: number, y: number, centered: 1 | 0, text: string, color: Color, font: number): void;

    /**
     * Finds an already existing font by its parameters.
     * 
     * @param font The font's name
     * @param size The font's size
     * @param weight The font's weight.
     */
    function FindFont(font: Font, size: number, weight: number): number;

    /**
     * Creates a new font and returns its index.
     * 
     * @param font The font's name
     * @param size The font's size
     * @param weight The font's weight. Deprecated.
     * 
     * Argument weight defines from thickness. 
     * 100 Lightest. 
     * 200 Bolder than 100, 
     * lighter than 300. 
     * 300 Bolder than 200, 
     * lighter than 400. 
     * 400 Bolder than 300, 
     * lighter than 500. 
     * Equivalent of normal. 
     * 500 Bolder than 400, 
     * lighter than 600. 
     * 600 Bolder than 500, 
     * lighter than 700.
     * 700 Bolder than 600, 
     * lighter than 800. 
     * Equivalent of bold. 
     * 800 Bolder than 700, 
     * lighter than 900. 
     * 900 Boldest.
     */
    function AddFont(name: Font, size: number, weight: number): number;

    /**
     * Renders a polygon.
     * 
     * @param points A matrix of all 3 points of the polygon.
     * @param color The polygon's color.
     */
    function Polygon(points: [Size, Size, Size], color: Color): void;
}

declare namespace Convar {}

declare namespace Event {}

declare namespace Trace {}

declare namespace UserCMD {}

declare namespace Sound {}

declare namespace Local {}

declare namespace Cheat {}

declare namespace Input {}

declare namespace World {}

declare namespace AntiAim {}

declare namespace Exploit {}

declare namespace RageBot {}

declare namespace Material {}
