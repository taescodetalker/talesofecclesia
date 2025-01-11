/*:
 * @target MZ
 * @plugindesc Displays a customizable gold counter with adjustable position, opacity, and font settings via the Plugin Manager.
 * @author Ai.2
 *
 * @param Window X Offset
 * @text Window X Offset
 * @type number
 * @min 0
 * @default 60
 * @desc The horizontal offset from the right edge of the screen.

 * @param Window Y Offset
 * @text Window Y Offset
 * @type number
 * @min 0
 * @default 60
 * @desc The vertical offset from the top of the screen (window height is automatically considered).

 * @param Window Opacity
 * @text Window Opacity
 * @type number
 * @min 0
 * @max 255
 * @default 180
 * @desc The opacity of the gold counter window (0 = fully transparent, 255 = fully opaque).

 * @param Font Size
 * @text Font Size
 * @type number
 * @min 10
 * @default 22
 * @desc The font size for the gold counter text.

 * @param Font Color
 * @text Font Color
 * @type string
 * @default #FFD700
 * @desc The color of the text. Use a valid hex color code (e.g., #FFD700 for gold).

 * @param Outline Color
 * @text Outline Color
 * @type string
 * @default #000000
 * @desc The color of the text outline. Use a valid hex color code (e.g., #000000 for black).

 * @help
 * This plugin displays the player's current gold in the top-right corner of the screen,
 * slightly offset downward. The position, opacity, font size, font color, and outline color
 * can all be customized via the Plugin Manager.
 *
 * Terms of Use: Free for use in non-commercial and commercial projects.
 */

(() => {
    const pluginName = "CustomGoldCounter";

    // Fetch plugin parameters
    const parameters = PluginManager.parameters(pluginName);
    const WINDOW_X_OFFSET = Number(parameters["Window X Offset"] || 110);
    const WINDOW_Y_OFFSET = Number(parameters["Window Y Offset"] || 60);
    const WINDOW_OPACITY = Number(parameters["Window Opacity"] || 200);
    const FONT_SIZE = Number(parameters["Font Size"] || 34);
    const FONT_COLOR = parameters["Font Color"] || "#FFD700"; // Default to gold
    const OUTLINE_COLOR = parameters["Outline Color"] || "#000000"; // Default to black

    const GOLD_WIDTH = 210;   // Fixed width of the gold display area
    const GOLD_HEIGHT = 64;   // Fixed height of the gold display area

    // Extend the Scene_Map class to draw the gold counter
    const _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function () {
        _Scene_Map_createAllWindows.call(this);
        this.createGoldCounter();
    };

    Scene_Map.prototype.createGoldCounter = function () {
        this._goldCounterWindow = new Window_GoldCounter();
        this.addChild(this._goldCounterWindow);
    };

    // Define the Gold Counter Window
    class Window_GoldCounter extends Window_Base {
        initialize() {
            const x = Graphics.width - GOLD_WIDTH - WINDOW_X_OFFSET;
            const y = WINDOW_Y_OFFSET;
            const rect = new Rectangle(x, y, GOLD_WIDTH, GOLD_HEIGHT);
            super.initialize(rect);
            this.opacity = WINDOW_OPACITY; // Set window opacity from parameters
            this.refresh();
        }

        refresh() {
            this.contents.clear();
            this.contents.fontSize = FONT_SIZE;
            this.changeTextColor(FONT_COLOR);
            this.contents.outlineColor = OUTLINE_COLOR;
            const goldText = `Gold: ${$gameParty.gold()}`;
            this.drawText(goldText, 0, 0, this.contentsWidth(), "left");
            this.resetTextColor();
        }

        // Update the counter dynamically
        update() {
            super.update();
            this.refresh();
        }
    }
})();
