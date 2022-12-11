/** 
 * Сниппет для Onetap V3
 * 
 * @author Mased
 * @version 1.0.0
 */

/**
 * @type {string} path Massive of string, example: ("Rage", "GENERAL", "Exploits")
 * 
 * Massive of string, example: ("Rage", "GENERAL", "Exploits")
 */
type path = string;

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
    function AddLabel(text: string): void;

    /**
     * Can be used to toggle a hotkey or simulate key press.
     * Return Values: 1 is key is active, 0 if the key is inactive
     * 
     * @param path path to hotkey
     * @param item name of hotkey
     */
    function ToggleHotkey(path: path, item: string): 1 | 0;

    /**
     * Adds a textbox in which you can input text and read it later on.
     * Returns an path: string[].
     * 
     * @param name nmae of text
     */
    function AddTextbox(name: string): string[];
}
