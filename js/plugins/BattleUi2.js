/*:
 * @target MZ
 * @plugindesc Modern battle UI with a Yu-Gi-Oh! aesthetic: neon borders, sleek command windows, and futuristic vibes.
 * @author Ai
 * @help
 * This plugin gives your battle UI a **Yu-Gi-Oh! inspired** makeover, featuring:
 * - Neon glow borders and sleek techy aesthetics.
 * - Enlarged command windows at the edges of the screen.
 * - Dynamic futuristic visual effects.
 *
 * No plugin commands are required.
 * 
 * Terms of Use:
 * - Free for commercial and non-commercial use. Credit appreciated!
 */

(() => {
    // Customizable UI Settings
    const SETTINGS = {
        windowOpacity: 220, // Window opacity (0-255)
        commandWindowHeight: 120, // Height of command windows
        partyCommandY: Graphics.height - 140, // Party command window Y position
        actorCommandY: Graphics.height - 260, // Actor command window Y position
        backgroundColor: "rgba(0, 0, 0, 0.8)", // Background color (dark for a modern feel)
        neonBorderColor: "#00FF00", // Neon green border for a YGO vibe
        neonGlowColor: "rgba(0, 255, 0, 0.3)", // Neon glow effect color
        textColor: "#FFFFFF", // Text color
        fontSize: 28, // Font size for command windows
    };

    // Create and modify the party command window with modern style
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

    // Create and modify the actor command window with modern style
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

    // Modify the Window styles with a futuristic techy look
    const _Window_Base_initialize = Window_Base.prototype.initialize;
    Window_Base.prototype.initialize = function(rect) {
        _Window_Base_initialize.call(this, rect);

        // Apply custom background and border colors
        this._customBackColor = SETTINGS.backgroundColor;
        this._customBorderColor = SETTINGS.neonBorderColor;
        this._customTextColor = SETTINGS.textColor;
        this._fontSize = SETTINGS.fontSize;
    };

    // Draw the neon glow border and background for a sleek futuristic look
    const _Window_Base__drawFrame = Window_Base.prototype._drawFrame;
    Window_Base.prototype._drawFrame = function(bitmap, rect) {
        bitmap.clear(); // Clear existing frame
        bitmap.fillRect(rect.x, rect.y, rect.width, rect.height, this._customBackColor); // Custom background
        bitmap.drawRect(rect.x, rect.y, rect.width, rect.height, this._customBorderColor); // Neon border
        bitmap.fillRect(rect.x, rect.y, rect.width, rect.height, SETTINGS.neonGlowColor); // Neon glow effect
    };

    // Apply custom text color and size
    const _Window_Base_drawText = Window_Base.prototype.drawText;
    Window_Base.prototype.drawText = function(text, x, y, maxWidth, align) {
        this.contents.textColor = this._customTextColor; // Custom text color
        this.contents.fontSize = this._fontSize; // Custom font size
        _Window_Base_drawText.call(this, text, x, y, maxWidth, align);
    };
})();


