/*:
 * @target MZ
 * @plugindesc Manages and loads custom shaders for use in RPG Maker MZ.
 * @author Vincent Thieu
 *
 * @param ShaderFolder
 * @desc Folder path where shaders are stored (relative to js/ folder).
 * @default shaders/
 *
 * @help VT_Shader_Manager.js
 *
 * This plugin dynamically loads and applies custom shaders in RPG Maker MZ.
 *
 * Example Usage:
 * const shader = ShaderManager.createShader("pulsate");
 * sprite.filters = [shader];
 *
 * Place GLSL files in the folder specified by ShaderFolder (default: js/shaders/).
 *
 * Terms of Use: Commercial.
 * Version: 1.0.0
 */

var ShaderManager = (function () {
	const params = PluginManager.parameters("VT_Shader_Manager");
	const shaderFolder = "js/" + (params["ShaderFolder"] || "shaders/");

	function loadFile(path) {
		console.log("loading file " + path);
		let xhr = new XMLHttpRequest();
		xhr.open("GET", path, false); // Synchronous request
		xhr.send();
		if (xhr.status < 400) {
			return xhr.responseText;
		} else {
			console.error(`Failed to load file: ${path}`);
			return "";
		}
	}

	function createShader(vertexName, fragmentName, uniforms = {}) {
		let vertexSrc = vertexName ? loadFile(`${shaderFolder}${vertexName}.vert`) : PIXI.Filter.defaultVertexSrc; // Use PIXI's default vertex shader
		const fragmentSrc = loadFile(`${shaderFolder}${fragmentName}.frag`);
		return new PIXI.Filter(vertexSrc, fragmentSrc, uniforms);
	}

	return {
		createShader: createShader,
	};
})();

// Retrieve shader tags from an event
function getShaderTags(event) {
	// Check if the event has a "shader" meta tag
	const shaderTag = event.event().meta["shader"];
	if (shaderTag) {
		// Split the tag into an array based on commas (e.g., "wind, wave")
		return shaderTag.split(",").map((tag) => tag.trim());
	}
	return []; // Return an empty array if no shader tag is found
}

// Update time dynamically
function updateDayNightShader(hour, minute) {
	const timeOfDay = (hour * 60 + minute) / 1440.0; // Normalize time (0.0 - 1.0)
	SceneManager._scene.dayNightShader.uniforms.timeOfDay = timeOfDay;
	SceneManager._scene.combinedShader.uniforms.timeOfDay = timeOfDay;
}

Graphics._renderer = new PIXI.Renderer({
	width: Graphics.width,
	height: Graphics.height,
	antialias: true,
	resolution: window.devicePixelRatio || 1,
	forceCanvas: false, // Forces WebGL if available
});

(() => {
	// Create wave shader using the ShaderManager
	const waveShader = ShaderManager.createShader("wave", "wave", {
		time: 0.0,
		amplitude: 0.02, // Wave height
		frequency: 10.0, // Number of waves
		speed: 2.0, // Speed of animation
	});
	// Create wind shader using ShaderManager
	const windShader = ShaderManager.createShader("wind", "wind", {
		time: 0.0,
		amplitude: 0.01, // Wave height (adjust for subtle vs strong effect)
		frequency: 30.0, // Number of waves
		speed: 3.5, // Speed of movement
		direction: -1.0, // 1.0 for right, -1.0 for left
	});

	// Create the wind_2 shader using ShaderManager
	const wind2Shader = ShaderManager.createShader("wind_2", "wind_2", {
		time: 0.0,
		amplitude: 0.1, // Max bending at the top
		frequency: 2, // Oscillation speed
		stiffness: 3, // How quickly bending fades downward
	});
	const pulsateShader = ShaderManager.createShader("pulsate", "pulsate", { time: 0.0 });

	const uniforms = {
		timeOfDay: 0.0, // Default time
	};

	const dayNightShader = ShaderManager.createShader(
		null, // Use default vertex shader
		"daynight", // Fragment shader filename (without extension)
		uniforms
	);

	// Cave shader
	const caveUniforms = {
		caveTint: [0.1, 0.1, 0.15], // Default dark blue tint
	};

	const caveShader = ShaderManager.createShader(
		null, // Use default vertex shader
		"cave", // Fragment shader filename (without extension)
		caveUniforms
	);

	// Light shader
	const lightUniforms = {
		lightPos: [0.5, 0.5], // Center position (normalized)
		lightRadius: 0.2, // Radius of light (adjust based on source)
		intensity: 1.0, // Brightness (1.0 = full brightness)
		ambientColor: [0.05, 0.05, 0.15], // Ambient darkness (default)
	};

	const lightShader = ShaderManager.createShader(
		null, // Default vertex shader
		"light", // Fragment shader filename
		lightUniforms
	);

	// Combined shader
	const MAX_LIGHTS = 100;

	const combinedUniforms = {
		// Day-night uniforms
		timeOfDay: 0.0,
		morningColor: [1.0, 0.85, 0.7],
		dayColor: [1.0, 1.0, 1.0],
		eveningColor: [0.9, 0.6, 0.4],
		nightColor: [0.0, 0.0, 0.33],

		// Light source uniforms
		lightPos: new Float32Array(MAX_LIGHTS * 2), // Flattened vec2 array
		lightRadius: Array(MAX_LIGHTS).fill(0.2),
		intensity: Array(MAX_LIGHTS).fill(1.0),
		numLights: 0,

		// Ambient darkness
		useAmbient: false,
		ambientColor: [0.05, 0.05, 0.1], // Default cave darkness

		// Light colors for each light source
		lightColor: new Float32Array(MAX_LIGHTS * 3), // RGB values flattened
	};

	// Create the combined shader
	const combinedShader = ShaderManager.createShader(
		null,
		"daynightlight", // Filename for the shader
		combinedUniforms
	);

	const _Spriteset_Map_createCharacters = Spriteset_Map.prototype.createCharacters;
	Spriteset_Map.prototype.createCharacters = function () {
		_Spriteset_Map_createCharacters.call(this);

		SceneManager._scene.waveShader = waveShader;
		SceneManager._scene.windShader = windShader;
		SceneManager._scene.wind2Shader = wind2Shader;
		SceneManager._scene.pulsateShader = pulsateShader;
		SceneManager._scene.dayNightShader = dayNightShader;
		SceneManager._scene.caveShader = caveShader;
		SceneManager._scene.lightShader = lightShader;
		SceneManager._scene.combinedShader = combinedShader;
		SceneManager._scene.combinedUniforms = combinedUniforms;

		// Apply the shader to the entire map
		// SceneManager._scene._spriteset.filters = [SceneManager._scene.dayNightShader];

		this._characterSprites.forEach((sprite) => {
			const character = sprite._character;
			if (character instanceof Game_Event) {
				// Get shader tags from the event's note
				const shaders = getShaderTags(character);

				// Load shaders based on tags
				const filters = [];
				shaders.forEach((tag) => {
					if (tag === "wind") {
						filters.push(SceneManager._scene.windShader);
					} else if (tag === "wind_2") {
						filters.push(SceneManager._scene.wind2Shader);
					} else if (tag === "pulsate") {
						filters.push(SceneManager._scene.pulsateShader);
					} else if (tag === "wave") {
						filters.push(SceneManager._scene.waveShader);
					}
				});

				// Apply all selected shaders to the sprite
				if (filters.length > 0) {
					sprite.filters = filters;
				}
			}
		});
	};

	let enterCaveCheck = 0;
	function updateCaveShader() {
		const caveShaderCheck = $gameVariables.value(25);
		if (enterCaveCheck == caveShaderCheck) return;
		enterCaveCheck = caveShaderCheck;
		if (caveShaderCheck) {
			SceneManager._scene._spriteset.filters = [SceneManager._scene.caveShader];
		} else {
			SceneManager._scene._spriteset.filters = [SceneManager._scene.dayNightShader]; // Restore day-night shader
		}
	}

	// Update all shaders in the game loop
	let lastUpdate = 0;
	const _Spriteset_Map_update = Spriteset_Map.prototype.update;
	Spriteset_Map.prototype.update = function () {
		_Spriteset_Map_update.call(this);

		const deltaTime = Graphics.app.ticker.lastTime - lastUpdate;
		if (deltaTime > 16) {
			// Limit updates to ~60 FPS
			lastUpdate = Graphics.app.ticker.lastTime;
			// console.log("updating shader");
			SceneManager._scene.waveShader.uniforms.time += deltaTime / 1000;
			SceneManager._scene.windShader.uniforms.time += deltaTime / 1000;
			SceneManager._scene.wind2Shader.uniforms.time += deltaTime / 1000;
			SceneManager._scene.pulsateShader.uniforms.time += deltaTime / 1000;

			// Get time data from variables
			const hour = $gameVariables.value(22); // Replace 1 with your hour variable ID
			const minute = $gameVariables.value(23); // Replace 2 with your minute variable ID
			updateDayNightShader(hour, minute);

			updateCaveShader();
		}
	};

	Spriteset_Map.prototype.addLight = function (x, y, radius, intensity) {
		const numLights = combinedUniforms.numLights;

		// Check if we can add more lights
		if (numLights >= MAX_LIGHTS) {
			console.warn("Maximum number of lights reached!");
			return false; // Prevent adding more lights
		}

		// Calculate the index in the flattened array
		const posIndex = numLights * 2;
		const colorIndex = numLights * 3; // Each color is a vec3 (RGB)

		// Add light properties
		combinedUniforms.lightPos[posIndex] = x / Graphics.width; // Normalized X position
		combinedUniforms.lightPos[posIndex + 1] = y / Graphics.height; // Normalized Y position
		combinedUniforms.lightRadius[numLights] = radius; // Set light radius
		combinedUniforms.intensity[numLights] = intensity; // Set light intensity

		// Set RGB color
		combinedUniforms.lightColor[colorIndex] = color[0];
		combinedUniforms.lightColor[colorIndex + 1] = color[1];
		combinedUniforms.lightColor[colorIndex + 2] = color[2];
		
		// Increment the number of active lights
		combinedUniforms.numLights++;

		console.log(`Light ${numLights} added at (${x}, ${y}) with radius ${radius} and intensity ${intensity}`);
		return true; // Light successfully added
	};

	const updateLightPosition = (index, x, y) => {
		const posIndex = index * 2; // Each vec2 takes 2 consecutive slots
		combinedUniforms.lightPos[posIndex] = x; // Set X
		combinedUniforms.lightPos[posIndex + 1] = y; // Set Y
	};

	// Hook into Scene_Map's start method
	const _Scene_Map_start = Scene_Map.prototype.start;
	Scene_Map.prototype.start = function () {
		_Scene_Map_start.call(this); // Call the original start method

		// Ensure the map's spriteset is ready
		if (this._spriteset && combinedShader) {
			// this._spriteset.filters = [dayNightShader, lightShader]; // Apply the shader filter
			this._spriteset._baseSprite.filters = [combinedShader];

			//const centerX = Graphics.width / 2; // Middle of the screen (X)
			//const centerY = Graphics.height / 2; // Middle of the screen (Y)

			// Add the light
			//const lightRadius = 0.15; // Light radius (normalized size)
			//const lightIntensity = 1.0; // Light brightness

			// addLight(centerX, centerY, lightRadius, lightIntensity);
		}
	};
})();
