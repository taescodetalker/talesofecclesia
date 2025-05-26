/*:
 * @target MZ
 * @plugindesc Event light shader for use in RPG Maker MZ
 * @author Vincent Thieu
 *
 * @param ShaderFolder
 * @desc Folder path where shaders are stored (relative to js/ folder).
 * @default shaders/
 *
 * @help
 * Event light shader for use in RPG Maker MZ
 *
 * Terms of Use: Commercial.
 * Version: 1.0.0
 */

(() => {
	const eventToLightMap = {}; // Maps event ID to light index

	Game_Event.prototype.lightRadius = function () {
		return this._lightRadius || 0;
	};

	const _Spriteset_Map_createCharacters = Spriteset_Map.prototype.createCharacters;
	Spriteset_Map.prototype.createCharacters = function () {
		_Spriteset_Map_createCharacters.call(this);

		// After creating characters, add lights for tagged events
		this.addEventLights();
	};

	Spriteset_Map.prototype.addEventLights = function () {
		// Loop through all events on the map
		$gameMap.events().forEach((event) => {
			const note = event.event().note; // Get the event's note field
			const lightTag = /<light:\s*(\w+)(?:,\s*radius=([\d.]+),\s*intensity=([\d.]+))?(?:,\s*color=#[0-9a-fA-F]{6})?>/i.exec(note);

			if (lightTag) {
				const lightType = lightTag[1].toLowerCase(); // Light type (e.g., "torch")
				const radius = parseFloat(lightTag[2]) || 0.3; // Default radius
				const intensity = parseFloat(lightTag[3]) || 0.7; // Default intensity

				event._lightRadius = radius;
				// Get the event's screen position
				const x = event.screenX();
				const y = event.screenY();

				let color = [1.0, 1.0, 1.0]; // default warm light
				const colorMatch = /color=#([0-9a-fA-F]{6})/.exec(note);
				if (colorMatch) {
					const hex = colorMatch[1];
					console.log(`Event ${event.eventId()} has color: #${hex}`);
					color = [parseInt(hex.slice(0, 2), 16) / 255, parseInt(hex.slice(2, 4), 16) / 255, parseInt(hex.slice(4, 6), 16) / 255];
				}

				// Add light source based on the tag
				console.log(`Adding light for event ${event.eventId()} (${lightType}) at (${x}, ${y})`);
				this.addLight(x, y, radius, intensity, color);

				eventToLightMap[event.eventId()] = SceneManager._scene.combinedUniforms.numLights - 1; // Map event to the last added light
			}
		});
	};

	Spriteset_Map.prototype.clearLights = function () {
		// Reset shader uniforms
		SceneManager._scene.combinedUniforms.lightPos.fill(0.0); // Clear all positions
		SceneManager._scene.combinedUniforms.lightRadius.fill(0.0); // Clear all radii
		SceneManager._scene.combinedUniforms.intensity.fill(0.0); // Clear all intensities
		SceneManager._scene.combinedUniforms.numLights = 0; // Reset light count

		// Clear the event-to-light mapping
		for (const key in eventToLightMap) {
			delete eventToLightMap[key];
		}

		playerLightIndex = null;

		console.log("All lights cleared!");
	};

	Spriteset_Map.prototype.zoomAwareLightsPositionUpdate = function (lightIndex, newX, newY) {
		if (!$gameScreen) return;
		const posIndex = lightIndex * 2; // Each light uses 2 slots for position (x, y)
		const zoomX = $gameScreen.zoomX();
		const zoomY = $gameScreen.zoomY();
		const zoomScale = $gameScreen.zoomScale();
		let x = newX;
		let y = newY;
		if (zoomX > 0) {
			x -= zoomX - Graphics.width / (2 * zoomScale);
		}
		if (zoomY > 0) {
			y -= zoomY - Graphics.height / (2 * zoomScale);
		}
		SceneManager._scene.combinedUniforms.lightPos[posIndex] = x / (Graphics.width / zoomScale); // Update X
		SceneManager._scene.combinedUniforms.lightPos[posIndex + 1] = y / (Graphics.height / zoomScale); // Update Y
	};

	Spriteset_Map.prototype.updateEventLights = function () {
		for (e of $gameMap.events()) {
			const lightIndex = eventToLightMap[e.eventId()];
			if (lightIndex !== undefined) {
				this.zoomAwareLightsPositionUpdate(lightIndex, e.screenX(), e.screenY());
				SceneManager._scene.combinedUniforms.lightRadius[lightIndex] = e.lightRadius() * $gameScreen.zoomScale();
			}
		}
	};

	let playerLightIndex = null; // Tracks the player's light index

	Spriteset_Map.prototype.updatePlayerLight = function () {
		const playerLightActive = $gameVariables.value(26); // Use variable #1 to control the light

		if (playerLightActive) {
			// Add the player's light if it doesn't exist
			if (playerLightIndex === null) {
				const playerX = $gamePlayer.screenX();
				const playerY = $gamePlayer.screenY();
				const radius = $gameVariables.value(27) || 0.5; // Variable #2 for radius
				const intensity = $gameVariables.value(28) || 1.0; // Variable #3 for intensity

				this.addLight(playerX, playerY, radius, intensity);
				playerLightIndex = SceneManager._scene.combinedUniforms.numLights - 1; // Track the player's light index
				console.log("Player light added.");
			} else {
				// Update the player's light position
				this.zoomAwareLightsPositionUpdate(playerLightIndex, $gamePlayer.screenX(), $gamePlayer.screenY());
			}
		} else {
			// Remove the player's light if it exists
			if (playerLightIndex !== null) {
				const posIndex = playerLightIndex * 2;
				SceneManager._scene.combinedUniforms.lightPos[posIndex] = 0.0;
				SceneManager._scene.combinedUniforms.lightPos[posIndex + 1] = 0.0;
				SceneManager._scene.combinedUniforms.lightRadius[playerLightIndex] = 0.0;
				SceneManager._scene.combinedUniforms.intensity[playerLightIndex] = 0.0;
				playerLightIndex = null; // Reset the player's light index
				console.log("Player light removed.");
			}
		}
	};

	const _Spriteset_Map_update = Spriteset_Map.prototype.update;
	Spriteset_Map.prototype.update = function () {
		_Spriteset_Map_update.call(this);

		// Call updateEventLights based on a timer
		this.checkLightUpdate();
	};

	Spriteset_Map.prototype.checkLightUpdate = function () {
		if (!this._lightUpdateTime) this._lightUpdateTime = performance.now(); // Initialize timer

		const now = performance.now();
		const updateInterval = 32; // Time interval in milliseconds (e.g., 100ms = 10 updates/sec)

		if (now - this._lightUpdateTime >= updateInterval) {
			this.updateEventLights();
			// Update player light position
			this.updatePlayerLight();
			this._lightUpdateTime = now; // Reset timer
		}
	};

	const _Scene_Map_terminate = Scene_Map.prototype.terminate;
	Scene_Map.prototype.terminate = function () {
		// Call the original method
		_Scene_Map_terminate.call(this);

		// Clear lights when leaving the map
		if (this._spriteset) {
			this._spriteset.clearLights();
		}
	};
})();
