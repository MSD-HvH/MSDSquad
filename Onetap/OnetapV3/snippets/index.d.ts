/**
 * Сниппет для Onetap V3
 * 
 * @author Mased
 * @version 1.5.2
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
type UserID = number;

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
    function ChokedCommands(): number;

    /**
     * Returns the time, in seconds, since the game started.
     */
    function Realtime(): number;

    /**
     * Returns the time, in seconds, between the last and current frame.
     */
    function Frametime(): number;

    /**
     * Returns the time, in seconds, since the server started.
     */
    function Curtime(): number;

    /**
     * Returns the interval, in seconds, between each tick.
     */
    function TickInterval(): number;

    /**
     * Returns the server's amount of ticks/second.
     */
    function Tickrate(): number;

    /**
     * Returns the time, in ticks, since the server started.
     */
    function Tickcount(): number;

    /**
     * Returns the current FrameStageNotify stage.
     * @deprecated
     */
    function FrameStage(): number;
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
    function ToggleHotkey <T extends keyof Subtabs, S extends Subtabs[T]> (Tab: T, Subtab: S, Area: string, item: string): 1 | 0;

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
     * @param min minimum value of slider
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
     * @param min minimum value of slider
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
     * UI item searches are not explicit: the search will return the first found item. This means that UI.GetValue("Legit","Triggerbot", "Enabled") will return the same value as UI.GetValue("Legit", "GENERAL", "Triggerbot", "Enabled").
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
     * @param value value which should be set
     */
    function SetEnabled <T extends keyof Subtabs, S extends Subtabs[T], N extends string> (Tab: T, Subtab: S, Area: string, name: N, value: boolean): void;

    /**
     * Sets the value of an UI item's setting.
     * UI item searches are not explicit: the search will return the first found item. This means that
     * UI.SetValue("Legit", "Triggerbot", "Enabled", true) will return the same value as UI.SetValue("Legit", "GENERAL", "Triggerbot", "Enabled", true).
     * All script-added items are located in a groupbox within the misc tab, under javascript group called "Script items". Searching for ("Script Items", item name) is certain to return a script control.
     * 
     * @param name name of element
     * @param value value which should be set
     */
    function SetValue <T extends keyof Subtabs, S extends Subtabs[T], N extends string> (Tab: T, Subtab: S, Area: string, name: N, value: boolean | 1 | 0): void;

    /**
     * Returns the value of UI item's setting.
     * UI item searches are not explicit: the search will return the first found item. This means that UI.GetValue("Legit", "Triggerbot", "Enabled") will return the same value as UI.GetValue("Legit", "GENERAL", "Triggerbot", "Enabled").
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

    /**
     * Renders a gradient.
     * @param x The X position
     * @param y The Y position
     * @param w The gradient's width
     * @param h The gradient's height
     * @param is_horizontal The gradient's direction. Use '0' for vertical and '1' for horizontal.
     * @param color1 The gradient's first color
     * @param color2 The gradient's second color
     */
    function GradientRect(x: number, y: number, w: number, h: number, is_horizontal: 1 | 0, color1: Color, color2: Color): void;

    /**
     * Returns the width and height of your screen.
     */
    function GetScreenSize(): Size;

    /**
     * Converts a 3D point into a 2D point on your screen and returns its X and Y positions, and whether or not the point is behind you.
     * @param point The 3D point
     */
    function WorldToScreen(point: Vector): Size;

    /**
     * Renders a ring.
     * @param x The X position
     * @param y The Y position
     * @param radius The circle's radius
     * @param color The circle's color
     */
    function Circle(x: number, y: number, radius: number, color: Color): void;

    /**
     * Renders a rectangle.
     * @param x The X position
     * @param y The Y position
     * @param w The rectangle's width
     * @param h The rectangle's height
     * @param color The rectangle's color
     */
    function FilledRect(x: number, y: number, w: number, h: number, color: Color): void;

    /**
     * Renders a rectangle outline.
     * @param x The X position
     * @param y The Y position
     * @param w The rectangle's width
     * @param h The rectangle's height
     * @param color The rectangle's color
     */
    function Rect(x: number, y: number, w: number, h: number, color: Color): void;

    /**
     * Renders a line.
     * @param x1 The first X position
     * @param y1 The first Y position
     * @param x2 The second X position
     * @param y2 The second Y position
     * @param color The line's color
     */
    function Line(x1: number, y1: number, x2: number, y2: number, color: Color): void;
}

declare namespace Convar {
    /**
     * Gets a CVar's value in integer form.
     * @param cvar The CVar.
     */
    function GetInt(cvar: string): number;

    /**
     * Gets a CVar's value in float form.
     * @param cvar The CVar.
     */
    function GetFloat(cvar: string): number;

    /**
     * Gets a CVar's value in string form.
     * @param cvar The CVar.
     */
    function GetString(cvar: string): string;

    /**
     * Overrides a CVar's value to a specified integer.
     * @param cvar The CVar.
     */
    function SetInt(cvar: string, value: number): void;

    /**
     * Overrides a CVar's value to a specified float.
     * @param cvar The CVar.
     */
    function SetFloat(cvar: string, value: number): void;

    /**
     * Overrides a CVar's value to a specified string.
     * @param cvar The CVar.
     */
    function SetString(cvar: string, value: string): void;
}

declare namespace Event {
    /**
     * Gets a field's value in integer form.
     * @param field_name The field.
     */
    function GetInt(field_name: string): number;

    /**
     * Gets a field's value in float form.
     * @param field_name The field.
     */
    function GetFloat(field_name: string): number;

    /**
     * Gets a field's value in string form.
     * @param field_name The field.
     */
    function GetString(field_name: string): string;
}

declare namespace Trace {
    /**
     * Traces a line from a point to another and returns its data.
     * @param skip_entity The entity to be ignored
     * @param from The initial position
     * @param to The ending position
     * @returns The entity index of a hit entity or undefined, the fraction of the trace ('0' means it hit immediately, '1' means it went fully through).
     */
    function Line(skip_entity: EntityID, from: Vector, to: Vector): number[];

    /**
     * Traces a bullet from a point to another and returns its data.
     * @param attacker The entity who attacked
     * @param victim The entity who should be hit
     * @param from The initial position
     * @param to The ending position
     * @returns The entity index of a hit entity or undefined, the damage dealt, whether or not the ending position is visible and the hitbox that was hit. 
     */
    function Bullet(attacker: EntityID, victim: EntityID, from: Vector, to: Vector): number[];

    /**
     * Traces a line from a point to another with a custom mask and returns its data. For advanced users only.
     * @param skip_entity The entity to be ignored
     * @param from The initial position
     * @param to The ending position
     * @param mask The custom mask
     * @param type The type. '0' will trace everything, '1' will trace only the world and '2' will trace only the entities.
     * @returns The entity index of a hit entity or undefined, the fraction of the trace ('0' means it hit immediately, '1' means it went fully through).
     */
    function RawLine(skip_entity: EntityID, from: Vector, to: Vector, mask: number, type: number): number[];

    /**
     * Returns whether or not a line goes through a smoke. Breaks if smoke is removed.
     * @param from The initial position
     * @param to The ending position
     * 
     * @deprecated doesn't work in OTV3
     */
    function Smoke(from: Vector, to: Vector): number;
}

declare namespace UserCMD {
    /**
     * Returns an array containing forward, sideways and up movement.
     */
    function GetMovement(): LengthArray<number, 3>;

    /**
     * Returns a bit-mask of all buttons.
     */
    function GetButtons(): number;

    /**
     * Overrides the UserCMD's movement.
     * @param values 
     */
    function SetMovement(values: LengthArray<number, 3>): void;

    /**
     * Overrides the UserCMD's buttons.
     * @param buttons 
     */
    function SetButtons(buttons: number): void;

    /**
     * Overrides your UserCMD's angles.
     * @param angles The new angles
     * @param silent Whether or not you should visualize those angles.
     */
    function SetViewAngles(angles: Vector, silent: boolean): void;

    /**
     * Overrides the mouse's X position.
     * @param x The new position.
     * @deprecated
     */
    function SetMouseX(x: number): void;

    /**
     * Overrides the mouse's Y position.
     * @param y The new position.
     * @deprecated
     */
    function SetMouseY(y: number): void;

    /**
     * Forces the cheat to choke a tick.
     */
    function Choke(): void;

    /**
     * Forces the cheat to send a tick. 
     */
    function Send(): void;
}

declare namespace Sound {
    /**
     * Plays a sound.
     * @param path The path to the sound file.
     */
    function Play(path: string): void;

    /**
     * Plays a sound on your in-game microphone.
     * @param path The path to the sound file.
     */
    function PlayMicrophone(path: string): void;

    /**
     * Stops playing a sound on your microphone.
     */
    function StopMicrophone(): void;
}

declare namespace Local {
    /**
     * Returns your latency/ping in seconds.
     */
    function Latency(): number;

    /**
     * Returns a vector containing your pitch, yaw and roll.
     */
    function GetViewAngles(): Vector;

    /**
     * Overrides your engine's view angles.
     * @param angles The new angles
     */
    function SetViewAngles(angles: Vector): void;

    /**
     * Overrides your clan-tag.
     * @param tag The new clan-tag.
     */
    function SetClanTag(tag: string): void;

    /**
     * Returns your real anti-aim yaw.
     */
    function GetRealYaw(): number;

    /**
     * Returns your fake anti-aim yaw.
     */
    function GetFakeYaw(): number;

    /**
     * Gets your weapon's spread.
     */
    function GetSpread(): number;

    /**
     * Gets your weapon's inaccuracy.
     */
    function GetInaccuracy(): number;
}

declare namespace Cheat {
    /**
     * Prints a message to the console.
     * @param msg The message
     */
    function Print(msg: string): void;

    /**
     * Prints a colored message to the console.
     * @param color The color
     * @param msg The message
     */
    function PrintColor(color: Color, msg: string): void;

    /**
     * Prints a message to the in-game chat. Client-sided.
     * @param msg The message
     */
    function PrintChat(msg: string): void;

    /**
     * Executes a console command.
     * @param cmd The command
     */
    function ExecuteCommand(cmd: string): void;

    /**
     * Register a new callback
     * @param callback The callback's name
     * @param func The function's name
     */
    function RegisterCallback(callback: string, func: string): void;

    /**
     * Returns the user's name.
     */
    function GetUsername(): string;
}

declare namespace Input {
    /**
     * Returns whether or not a key is being held.
     * @param vkey_code The virtual-key code.
     * @link https://learn.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes
     */
    function IsKeyPressed(vkey_code: number): boolean;

    /**
     * Returns the X and Y positions of the cursor.
     */
    function GetCursorPosition(): Size;
}

declare namespace World {
    /**
     * Returns the server's IP.
     */
    function GetServerString(): string;

    /**
     * Returns the current map's name.
     */
    function GetMapName(): string;
}

declare namespace AntiAim {
    /**
     * Returns whether or not the anti-aim is being overriden.
     */
    function GetOverride(): boolean;

    /**
     * Starts/stops overriding the anti-aim.
     * @param active Whether or not the override is active.
     */
    function SetOverride(active: number): void;

    /**
     * Overrides your real (body) offset.
     * @param offset The new offset.
     */
    function SetRealOffset(offset: number): void;

    /**
     * Overrides your fake (yaw) offset.
     * @param offset The new offset.
     */
    function SetFakeOffset(offset: number): void;

    /**
     * Overrides your LBY (desync) offset.
     * @param offset The new offset.
     */
    function SetLBYOffset(offset: number): void;
}

declare namespace Exploit {
    /**
     * Returns a fraction representing how much of the exploit is charged. '0' means it's completely uncharged and '1' means it's fully charged.
     */
    function GetCharge(): 1 | 0;

    /**
     * Forces the cheat to recharge.
     */
    function Recharge(): void;

    /**
     * Enables the cheat's automatic recharging.
     */
    function EnableRecharge(): void;

    /**
     * Disables the cheat's automatic recharging.
     */
    function DisableRecharge(): void;

    /**
     * Overrides the exploit's shift amount.
     * @param amount The new amount. The maximum recommended amount is 15.
     * 
     * @deprecated doesn't work in OTV3
     */
    function OverrideShift(amount: number): void;

    /**
     * Overrides the exploit's tolerance amount.
     * @param amount The new amount. The minimum amount is 1.
     * 
     * @deprecated doesn't work in OTV3
     */
    function OverrideTolerance(amount: number): void;
}

declare namespace RageBot {
    /**
     * Returns the current ragebot target. This only returns an entity right before shooting, so most of the
     * time it'll just return undefined.
     */
    function GetTarget(): EntityID;

    /**
     * Returns an array containing all possible ragebot targets.
     * 
     * @deprecated doesn't work in OTV3
     */
    function GetTargets(): EntityID[];

    /**
     * Returns the hitchance of the ragebot's target.
     * 
     * @deprecated doesn't work in OTV3
     */
    function GetTargetHitchance(): number;

    /**
     * Forces the ragebot to prioritize a certain player.
     * @param index The entity's index
     */
    function ForceTarget(index: EntityID): void;
    
    /**
     * Forces the ragebot to ignore a player.
     * @param index The entity's index
     */
    function IgnoreTarget(index: EntityID): void;

    /**
     * Forces the ragebot to ignore a hitbox on a specific player.
     * @param index The entity's index
     * @param hitbox The hitbox's index
     */
    function IgnoreTargetHitbox(index: EntityID, hitbox: number): void;

    /**
     * Forces the ragebot to target only safe points on a player.
     * @param index The entity's index
     */
    function ForceTargetSafety(index: EntityID): void;

    /**
     * Forces the ragebot to target a player for a certain hitchance.
     * @param index The entity's index
     * @param hitchance The new hitchance
     */
    function ForceTargetHitchance(index: EntityID, hitchance: number): void;

    /**
     * Forces the ragebot to target a player for a certain min. damage.
     * @param index The entity's index
     * @param dmg The new min. damage
     */
    function ForceTargetMinimumDamage(index: EntityID, dmg: number): void;

    /**
     * Forces the ragebot to target only safe points for a specific hitbox.
     * @param hitbox The hitbox's index
     */
    function ForceHitboxSafety(hitbox: number): void;
}

declare namespace Material {
    /**
     * Creates a new material and returns true on success.
     * @param name The material's name
     */
    function Create(name: string): boolean;

    /**
     * Deletes an existing material and returns true on success.
     * @param name The material's name
     */
    function Destroy(name: string): boolean;

    /**
     * Gets an existing material by the name and returns its index.
     * @param name The material's name
     */
    function Get(name: string): number;

    /**
     * Overrides a material shader's value and returns true on success. Can only be called in 'Material' callback.
     * @param index The material's index
     * @param shader The shader's name
     * @param value The shader's value
     * 
     * @link https://developer.valvesoftware.com/wiki/Category:List_of_Shader_Parameters
     * @link https://developer.valvesoftware.com/wiki/VertexLitGeneric
     */
    function SetKeyValue(index: number, shader: string, value: string): boolean;

    /**
     * Applies changes to a material and returns true on success. Can only be called in 'Material' callback.
     * @param index The material's index
     * 
     * @link https://developer.valvesoftware.com/wiki/Category:List_of_Shader_Parameters
     * @link https://developer.valvesoftware.com/wiki/VertexLitGeneric
     */
    function Refresh(index: number): boolean;
}
