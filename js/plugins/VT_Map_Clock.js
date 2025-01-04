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
 * @default 600
 *
 * @param clockPositionY
 * @text Clock Y Position
 * @desc Set the Y position for the clock.
 * @type number
 * @default 10
 *
 * @param fontSize
 * @text Font Size
 * @desc Set the font size for the clock text.
 * @type number
 * @default 28
 *
 * @param fontColor
 * @text Font Color
 * @desc Set the font color for the clock text (use hexadecimal color codes).
 * @type string
 * @default #FFFF00
 *
 * @param updateInterval
 * @text Update Interval (Frames)
 * @desc The time in frames between updates of the clock (1 second = 60 frames).
 * @type number
 * @default 60
 */

(() => {
	// Plugin parameters
	const parameters = PluginManager.parameters("VT_Map_Clock");
	const clockPositionX = Number(parameters["clockPositionX"] || 1800);
	const clockPositionY = Number(parameters["clockPositionY"] || 10);
	const fontSize = Number(parameters["fontSize"] || 28);
	const fontColor = String(parameters["fontColor"] || "#FFFFFF");
	const updateInterval = Number(parameters["updateInterval"] || 60);

	// Variables for tracking time
	let clockUpdateCounter = 0;

	// Map the "T" key (key code 84) to a custom input symbol, e.g. "toggleClock"
	Input.keyMapper[84] = "toggleClock";
	//$gameVariables.setValue(21, 1); // Clock starts "on"

	// Scene_Map update method to handle the clock update
	const _Scene_Map_update = Scene_Map.prototype.update;
	Scene_Map.prototype.update = function () {
		_Scene_Map_update.call(this);

		// Check for button press (e.g., TAB key)
		// if (Input.isTriggered("T")) {
		// 	// Toggle sprite visibility
		// 	if ($gameVariables.value(21) != 0) {
		// 		$gameVariables.setValue(21, 0);
		// 	} else {
		// 		$gameVariables.setValue(21, 1);
		// 	}
		// 	console.log("T is pressed " + $gameVariables.value(21));
		// 	if (this._clockSpritesLayer) {
		// 		// Update the sprite visibility immediately
		// 		this._clockSpritesLayer.visible = $gameVariables.value(21) != 0;
		// 	}
		// }

		// Check if "T" was pressed
		if (Input.isTriggered("toggleClock")) {
			this.toggleClockVisibility();
		}

		// Update clock every defined interval
		clockUpdateCounter++;
		if (clockUpdateCounter >= updateInterval) {
			clockUpdateCounter = 0;
			// console.log("updateClock");
			this.updateClock();
		}
	};

	// Our toggle function
	Scene_Map.prototype.toggleClockVisibility = function () {
		// Read variable 21's current value (assume 0 or 1)
		const currentValue = $gameVariables.value(21);

		// Flip the value (if 0 -> 1, if 1 -> 0)
		const newValue = currentValue === 0 ? 1 : 0;
		$gameVariables.setValue(21, newValue);

		// Now adjust the clock layer visibility
		// We assume you created `this._clockSpritesLayer` in your drawClock function
		// or have a reference to clock sprites. We'll show one approach below.
		if (SceneManager._scene && SceneManager._scene._clockSpritesLayer) {
			SceneManager._scene._clockSpritesLayer.visible = newValue === 1;
		}
	};

	// Update the time (checking variables for hours and minutes)
	Scene_Map.prototype.updateClock = function () {
		try {
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

			// Draw the clock on screen
			// console.log("updateClock");
			this.drawClock(clockText);
		} catch (error) {
			console.error("Error updating time variables:", error);
		}
	};

	// Draw the clock on screen
	Scene_Map.prototype.drawClock = function (clockText) {
		// Initialize clock layer if it doesn't exist
		if (!this._clockSpritesLayer) {
			this._clockSpritesLayer = new PIXI.Container();
			this._spriteset._pictureContainer.addChildAt(this._clockSpritesLayer, 0);
		}

		// Check if the clock background and text objects already exist
		if (!this.clockBackground) {
			// Create a new PIXI.Graphics object for the background
			this.clockBackground = new PIXI.Graphics();
			const bgWidth = 220; // Background width
			const bgHeight = 50; // Background height
			const bgRadius = 10; // Corner radius

			// Draw the rounded rectangle
			this.clockBackground.lineStyle(4, 0x544643);
			this.clockBackground.beginFill(0x5c5d58);
			this.clockBackground.drawRoundedRect(0, 0, bgWidth, bgHeight, bgRadius);
			this.clockBackground.endFill();

			// Position the background
			this.clockBackground.x = clockPositionX - 5; // Slight offset for better alignment
			this.clockBackground.y = clockPositionY - 5;

			// Add the background to the clock layer
			this._clockSpritesLayer.addChild(this.clockBackground);
		}

		// Check if the clock text object already exists
		if (!this.clockTextObject) {
			// Create a new PIXI.Text object
			const style = new PIXI.TextStyle({
				fontFamily: "Verdana", // Font family
				fontSize: fontSize, // Font size (from plugin parameter)
				fill: fontColor, // Font color (from plugin parameter)
				align: "right",
				stroke: "#000000", // Black outline
				strokeThickness: 4, // Outline thickness
			});

			this.clockTextObject = new PIXI.Text(clockText, style);
			this.clockTextObject.x = clockPositionX; // X position (from plugin parameter)
			this.clockTextObject.y = clockPositionY; // Y position (from plugin parameter)

			// Add the PIXI.Text object to the map's sprite layer
			this._clockSpritesLayer.addChild(this.clockTextObject);
		} else {
			// Update the existing text
			this.clockTextObject.text = clockText;
		}
		this._clockSpritesLayer.visible = $gameVariables.value(21) === 0 ? 0 : 1;
	};
})();
