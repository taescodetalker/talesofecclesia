/*:
 * @target MZ
 * @plugindesc Custom clock plugin that displays hours and minutes on screen.
 * @author Vincent Thieu
 *
 * @help
 * This plugin displays a real-time clock on the screen using RPG Maker MZ's variables
 * for hours and minutes.
 *
 * Make sure to create variables for hours and minutes (e.g., variable 1 for hours,
 * variable 2 for minutes) and update them as needed in parallel events.
 *
 * Terms of Use: Commercial.
 * Version: 1.0.1
 *
 * @param clockPositionX
 * @text Clock X Position
 * @desc Set the X position for the clock.
 * @type number
 * @default 1550
 *
 * @param clockPositionY
 * @text Clock Y Position
 * @desc Set the Y position for the clock.
 * @type number
 * @default 0
 *
 * @param fontSize
 * @text Font Size
 * @desc Set the font size for the clock text.
 * @type number
 * @default 34
 *
 * @param fontColor
 * @text Font Color
 * @desc Set the font color for the clock text (use hexadecimal color codes).
 * @type string
 * @default #FFD700
 *
 * @param outlineColor
 * @text Outline Color
 * @desc Set the outline color for the clock text (use hexadecimal color codes).
 * @type string
 * @default #000000
 *
 */

(() => {
	// Plugin parameters
	const parameters = PluginManager.parameters("VT_Map_Clock");
	const clockPositionX = Number(parameters["clockPositionX"] || 1550);
	const clockPositionY = Number(parameters["clockPositionY"] || 0);
	const fontSize = Number(parameters["fontSize"] || 34);
	const fontColor = String(parameters["fontColor"] || "#FFD700");
	const outlineColor = String(parameters["outlineColor"] || "#FFD700");

	const CLOCK_VARIABLE_ID = 21; // The variable ID to control visibility

	// Map the "T" key (key code 84) to a custom input symbol, e.g. "toggleClock"
	Input.keyMapper[84] = "toggleClock";

	// Extend the Scene_Map class to draw the clock
	const _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
	Scene_Map.prototype.createAllWindows = function () {
		_Scene_Map_createAllWindows.call(this);
		this.createClock();
	};

	Scene_Map.prototype.createClock = function () {
		this._clockWindow = new Window_Clock();
		this.addChild(this._clockWindow);
	};

	const _Scene_Map_update = Scene_Map.prototype.update;
	Scene_Map.prototype.update = function () {
		_Scene_Map_update.call(this);

		// Check if the "T" key is pressed
		if (Input.isTriggered("toggleClock")) {
			const currentValue = $gameVariables.value(CLOCK_VARIABLE_ID);
			$gameVariables.setValue(CLOCK_VARIABLE_ID, currentValue === 1 ? 0 : 1);
		}
		if (this._clockWindow) {
			// Update visibility based on the variable value
			const isVisible = $gameVariables.value(CLOCK_VARIABLE_ID) === 1;
			this._clockWindow.visible = isVisible;
		}
	};

	// Optional: Add script call to toggle variable for debugging
	const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function (command, args) {
		_Game_Interpreter_pluginCommand.call(this, command, args);

		if (command === "ToggleClock") {
			const currentValue = $gameVariables.value(CLOCK_VARIABLE_ID);
			$gameVariables.setValue(CLOCK_VARIABLE_ID, currentValue === 1 ? 0 : 1);
		}
	};

	// Keep track of last clock update
	let lastClockUpdate = 0;

	// Define the Gold Counter Window
	class Window_Clock extends Window_Base {
		initialize() {
			const x = clockPositionX;
			const y = clockPositionY;
			const rect = new Rectangle(x, y, 260, 64);
			super.initialize(rect);
			this.opacity = 180; // Set window opacity from parameters
			this.refresh();
		}

		refresh() {
			let currentMinutes = $gameVariables.value(23) || 0; // Use default 0 if not set
			let currentHours = $gameVariables.value(22) || 0; // Default to 0 if not set
			let currentDays = $gameVariables.value(24) || 0;
			currentMinutes++;

			if (currentMinutes >= 60) {
				currentMinutes = 0;
				currentHours++;
			}
			if (currentHours >= 24) {
				currentHours = 0;
				currentDays++;
			}
			$gameVariables.setValue(22, currentHours);
			$gameVariables.setValue(23, currentMinutes);
			$gameVariables.setValue(24, currentDays);

			const hours = String(currentHours).padStart(2, "0");
			const minutes = String(currentMinutes).padStart(2, "0");
			const days = String(currentDays).padStart(3, "0");

			const clockText = `Day ${days} - ${hours}:${minutes}`;

			this.contents.clear();
			this.contents.fontSize = fontSize;
			this.changeTextColor(fontColor);
			this.contents.outlineColor = outlineColor;

			this.drawText(clockText, 0, 0, this.contentsWidth(), "left");
			this.resetTextColor();
		}

		// Update the counter dynamically
		update() {
			super.update();
			const deltaTime = Graphics.app.ticker.lastTime - lastClockUpdate;
			if (deltaTime > 1000) {
				// Limit the clock update to once per second
				lastClockUpdate = Graphics.app.ticker.lastTime;
				this.refresh();
			}
		}
	}
})();
