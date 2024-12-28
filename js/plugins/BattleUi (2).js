/*:
 * @target MZ
 * @plugindesc Overhauls the battle UI: larger windows at the edges of the screen with a custom style.
 * @author Ai
 * @help
 * This plugin changes the battle UI by:
 * - Enlarging the party and actor command windows.
 * - Placing windows at the edges of the screen.
 * - Adding a custom style with new colors and transparency.
 *
 * No plugin commands are required.
 * 
 * Terms of Use:
 * - Free for commercial and non-commercial use. Credit appreciated!
 */

(() => {
    // Customizable settings for the new UI
    const SETTINGS = {
        windowOpacity: 180, // Opacity of windows (0-255)
        commandWindowHeight: 120, // Height of the command windows
        partyCommandY: Graphics.height - 140, // Party command window Y position
        actorCommandY: Graphics.height - 260, // Actor command window Y position
        backgroundColor: "rgba(30, 30, 30, 0.8)", // Background color for the windows
        borderColor: "rgba(255, 255, 255, 0.5)", // Border color
        textColor: "#FFFFFF", // Text color
    };

    // Resize and position the party command window
    const _Scene_Battle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow;
    Scene_Battle.prototype.createPartyCommandWindow = function() {
        _Scene_Battle_createPartyCommandWindow.call(this);
        const win = this._partyCommandWindow;
        win.width = Graphics.width; // Full screen width
        win.height = SETTINGS.commandWindowHeight;
        win.x = 0;
        win.y = SETTINGS.partyCommandY;
        win.opacity = SETTINGS.windowOpacity;
    };

    // Resize and position the actor command window
    const _Scene_Battle_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;
    Scene_Battle.prototype.createActorCommandWindow = function() {
        _Scene_Battle_createActorCommandWindow.call(this);
        const win = this._actorCommandWindow;
        win.width = Graphics.width; // Full screen width
        win.height = SETTINGS.commandWindowHeight;
        win.x = 0;
        win.y = SETTINGS.actorCommandY;
        win.opacity = SETTINGS.windowOpacity;
    };

    // Override the default Window styles
    const _Window_Base_initialize = Window_Base.prototype.initialize;
    Window_Base.prototype.initialize = function(rect) {
        _Window_Base_initialize.call(this, rect);

        // Apply custom background and border colors
        this._customBackColor = SETTINGS.backgroundColor;
        this._customBorderColor = SETTINGS.borderColor;
        this._customTextColor = SETTINGS.textColor;
    };

    const _Window_Base__drawFrame = Window_Base.prototype._drawFrame;
    Window_Base.prototype._drawFrame = function(bitmap, rect) {
        bitmap.clear(); // Clear existing frame
        bitmap.fillRect(rect.x, rect.y, rect.width, rect.height, this._customBackColor); // Custom background
        bitmap.drawRect(rect.x, rect.y, rect.width, rect.height, this._customBorderColor); // Custom border
    };

    const _Window_Base_drawText = Window_Base.prototype.drawText;
    Window_Base.prototype.drawText = function(text, x, y, maxWidth, align) {
        this.contents.textColor = this._customTextColor; // Custom text color
        _Window_Base_drawText.call(this, text, x, y, maxWidth, align);
    };
})();


