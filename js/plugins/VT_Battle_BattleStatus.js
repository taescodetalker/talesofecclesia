/*:
 * @target MZ
 * @plugindesc Customizes the battle menu UI and functionality.
 * @author Vincent Thieu
 *
 * @help
 * This plugin customizes the battle menu in RPG Maker MZ.
 *
 * Terms of Use: Commercial.
 *
 * Version: 1.0.0
 */

(() => {
	// Override the parent window initialization
	Window_BattleStatus.prototype.initialize = function (rect) {
		console.log("initialize - menu ui");
		const actors = $gameParty.battleMembers(); // Ensure this is valid
		const newWidth = 1800; // Adjust the width to fit fewer stats and faces
		const newHeight = 600; // Dynamic height based on the number of actors
		const x = Graphics.boxWidth - newWidth - 20; // Position to the right with padding
		const y = Graphics.boxHeight - newHeight - 20; // Position to the bottom with padding
		const newRect = new Rectangle(x, y, newWidth, newHeight);
		Window_Selectable.prototype.initialize.call(this, newRect);

		// Make the background fully transparent
		this.opacity = 0;
		this.backOpacity = 0;
		this.openness = 255;

		this._cardWidth = 300; // Width of each card
		this._cardHeight = 400; // Height of each card
		this._padding = 15; // Padding between cards
		this._faceSize = this._cardWidth - this._padding * 2; // Size of the actor face inside the card
		this._cornerRadius = 15; // Rounded corner radius
		this._parentWindowYPadding = 150; // leave space at top for card animation

		this._actorCards = []; // Array to store individual card containers
		this._cardFrames = [];

		for (let i = 0; i < actors.length; i++) {
			const actor = actors[i];
			const x = this._padding + i * (this._cardWidth + this._padding * 2); // Horizontal positioning
			const y = this._padding + this._parentWindowYPadding; // Vertical positioning

			// Create a container for each actor card
			const cardContainer = new PIXI.Container();
			cardContainer.x = x;
			cardContainer.y = y;
			// console.log(`card: ${i} x: ${cardContainer.x}`);
			this._actorCards.push(cardContainer); // Add to the array
			this.addChild(cardContainer); // Add to the window

			this._cardFrames.push(this.drawCardFrame(i, cardContainer, 0, 0, this._cardWidth, this._cardHeight, this._cornerRadius)); // Draw card frame
			this.drawActorPicture(cardContainer, actor, 0 + this._padding, 0 + this._padding, this._faceSize); // Draw face
			this.drawActorStats(cardContainer, actor, 0 + this._padding, 0); // Draw stats
		}
	};

	// Draw text using PIXI.Text
	Window_Base.prototype.drawCustomText = function (container, text, x, y, options = {}) {
		// Default styling options
		const defaultStyle = {
			fontFamily: "Arial",
			fontSize: 24,
			fill: "white",
			align: "left",
			stroke: "black",
			strokeThickness: 2,
			dropShadow: true,
			dropShadowColor: "#000000",
			dropShadowBlur: 4,
			dropShadowDistance: 2,
			wordWrap: false,
			wordWrapWidth: 400,
		};

		// Merge user-defined options with defaults
		const style = Object.assign({}, defaultStyle, options);

		// Create PIXI.Text instance
		const pixiText = new PIXI.Text(text, style);

		// Set position
		pixiText.x = x; // Adjust for window padding
		pixiText.y = y; // Adjust for window padding

		// Add PIXI.Text to the window container
		container.addChild(pixiText);
		return pixiText;
	};

	// Draw a rounded rectangle as the card frame
	Window_BattleStatus.prototype.drawCardFrame = function (id, container, x, y, width, height, radius) {
		const graphics = new PIXI.Graphics();

		// Define initial settings
		const settings = {
			fillColor: 0xffffff,
			fillAlpha: 0.6,
			lineColor: 0xffffff,
			lineWidth: 2,
		};

		// Store settings and rectangle data for later use
		graphics._id = id;
		graphics._settings = settings;
		// console.log("store _settings");
		graphics._rect = { x, y, width, height, radius };
		// console.log("store _rect");

		// Apply initial fill and line styles
		graphics.beginFill(settings.fillColor, settings.fillAlpha);
		graphics.lineStyle(settings.lineWidth, settings.lineColor);
		graphics.drawRoundedRect(x, y, width, height, radius);
		graphics.endFill();

		// Add the graphics object to the container
		container.addChild(graphics);
		return graphics;
	};

	// Draw the actor's picture
	Window_BattleStatus.prototype.drawActorPicture = function (container, actor, x, y, targetSize) {
		const actorFace = new Sprite();
		const customFaceName = actor.actor().meta.picture || actor.faceName(); // Use metadata or default face
		actorFace.bitmap = ImageManager.loadPicture(actor.actor().meta.picture || "Evil_8");

		actorFace.bitmap.addLoadListener(() => {
			// Dynamically scale the image to fit the target size
			const originalWidth = actorFace.bitmap.width;
			const originalHeight = actorFace.bitmap.height;

			// Calculate scaling factors
			const scaleX = targetSize / originalWidth;
			const scaleY = targetSize / originalHeight;

			// Choose the smaller scale to maintain aspect ratio
			const scale = Math.min(scaleX, scaleY);

			// Apply the scale
			actorFace.scale.x = scale;
			actorFace.scale.y = scale;

			// Center the scaled image at the target position
			actorFace.x = x + (targetSize - actorFace.bitmap.width * scale) / 2;
			actorFace.y = y + (targetSize - actorFace.bitmap.height * scale) / 2;
		});

		container.addChild(actorFace);
	};

	// Draw the actor's stats
	Window_BattleStatus.prototype.drawActorStats = function (container, actor, x, y) {
		// Draw actor name using PIXI.Text
		this.drawCustomText(container, actor.name(), x + this.padding, y + 280 - 30, {
			fontFamily: "Verdana",
			fontSize: 24,
			fill: "yellow",
			stroke: "red",
			strokeThickness: 2,
		});

		// Draw actor level using PIXI.Text
		this.drawCustomText(container, "LV: " + actor.level, x + this.padding, y, {
			fontFamily: "Verdana",
			fontSize: 24,
			fill: "yellow",
			stroke: "red",
			strokeThickness: 2,
		});

		container._statBarWidth = this._faceSize;
		container._statBarHeight = 20;

		const hpBar = new Sprite();
		hpBar.bitmap = new Bitmap(container._statBarWidth, container._statBarHeight); // Adjust size as needed
		hpBar.x = x;
		hpBar.y = y + 310;
		container.addChild(hpBar);
		container._hpBar = hpBar;

		const mpBar = new Sprite();
		mpBar.bitmap = new Bitmap(container._statBarWidth, container._statBarHeight); // Adjust size as needed
		mpBar.x = x;
		mpBar.y = y + 310 + 30;
		container.addChild(mpBar);
		container._mpBar = mpBar;

		const tpBar = new Sprite();
		tpBar.bitmap = new Bitmap(container._statBarWidth, container._statBarHeight); // Adjust size as needed
		tpBar.x = x;
		tpBar.y = y + 310 + 60;
		container.addChild(tpBar);
		container._tpBar = tpBar;

		// Draw actor HP using PIXI.Text
		container._hpText = this.drawCustomText(container, `${actor.hp}/${actor.mhp}`, x + this.padding, y + 310, {
			fontFamily: "Verdana",
			fontSize: 24,
			fill: "#FFFF00", // Yellow text
			align: "right",
			stroke: "#000000", // Black outline
			strokeThickness: 4, // Outline thickness
		});

		// Draw actor MP using PIXI.Text
		container._mpText = this.drawCustomText(container, `${actor.mp}/${actor.mmp}`, x + this.padding, y + 310 + 30, {
			fontFamily: "Verdana",
			fontSize: 24,
			fill: "#FFFF00", // Yellow text
			align: "right",
			stroke: "#000000", // Black outline
			strokeThickness: 4, // Outline thickness
		});

		// Draw actor TP using PIXI.Text
		container._tpText = this.drawCustomText(container, `${actor.tp}/${actor.maxTp()}`, x + this.padding, y + 310 + 60, {
			fontFamily: "Verdana",
			fontSize: 24,
			fill: "#FFFF00", // Yellow text
			align: "right",
			stroke: "#000000", // Black outline
			strokeThickness: 4, // Outline thickness
		});

		this.updateActorStats(container, actor);
	};

	Window_BattleStatus.prototype.updateActorStats = function (container, actor) {
		if (!container._hpText || !container._mpText) return; // Ensure text objects exist

		const width = container._statBarWidth;
		const height = container._statBarHeight;

		var rate = actor.hp / actor.mhp;
		container._hpBar.bitmap.clear();
		container._hpBar.bitmap.fillRect(0, 0, width, height, "white");
		container._hpBar.bitmap.fillRect(2, 2, width - 4, height - 4, "#444444"); // Background color
		container._hpBar.bitmap.fillRect(2, 2, (width - 4) * rate, height - 4, "#ff4444"); // HP color

		rate = actor.mp / actor.mmp;
		container._mpBar.bitmap.clear();
		container._mpBar.bitmap.fillRect(0, 0, width, height, "white");
		container._mpBar.bitmap.fillRect(2, 2, width - 4, height - 4, "#444444"); // Background color
		container._mpBar.bitmap.fillRect(2, 2, width * rate - 4, height - 4, "rgb(0, 38, 255)"); // MP color

		rate = actor.tp / actor.maxTp();
		container._tpBar.bitmap.clear();
		container._tpBar.bitmap.fillRect(0, 0, width, height, "white");
		container._tpBar.bitmap.fillRect(2, 2, width - 4, height - 4, "#444444"); // Background color
		container._tpBar.bitmap.fillRect(2, 2, width * rate - 4, height - 4, "rgb(0, 173, 0)"); // TP color

		// Update HP and MP text
		container._hpText.text = `${actor.hp}/${actor.mhp}`;
		container._hpText.x = container._hpBar.x + container._hpBar.bitmap.width - container._hpText.width; // Right-aligned
		container._hpText.y = container._hpBar.y + container._hpBar.bitmap.height / 2 - container._hpText.height / 2 - 15;

		container._mpText.text = `${actor.mp}/${actor.mmp}`;
		container._mpText.x = container._mpBar.x + container._mpBar.bitmap.width - container._mpText.width; // Right-aligned
		container._mpText.y = container._mpBar.y + container._mpBar.bitmap.height / 2 - container._mpText.height / 2 - 15;

		container._tpText.text = `${actor.tp}/${actor.maxTp()}`;
		container._tpText.x = container._tpBar.x + container._tpBar.bitmap.width - container._tpText.width; // Right-aligned
		container._tpText.y = container._tpBar.y + container._tpBar.bitmap.height / 2 - container._tpText.height / 2 - 15;
	};

	const _Game_Actor_setHp = Game_Actor.prototype.setHp;
	Game_Actor.prototype.setHp = function (value) {
		_Game_Actor_setHp.call(this, value);

		// Update the corresponding actor card
		const scene = SceneManager._scene;

		if (scene._statusWindow && scene._statusWindow._actorCards) {
			const actorIndex = $gameParty.battleMembers().indexOf(this);
			if (actorIndex >= 0) {
				const container = scene._statusWindow._actorCards[actorIndex];
				scene._statusWindow.updateActorStats(container, this);
			}
		}
	};

	const _Game_Actor_setMp = Game_Actor.prototype.setMp;
	Game_Actor.prototype.setMp = function (value) {
		_Game_Actor_setMp.call(this, value);

		// Update the corresponding actor card
		const scene = SceneManager._scene;

		if (scene._statusWindow && scene._statusWindow._actorCards) {
			const actorIndex = $gameParty.battleMembers().indexOf(this);
			if (actorIndex >= 0) {
				const container = scene._statusWindow._actorCards[actorIndex];
				scene._statusWindow.updateActorStats(container, this);
			}
		}
	};

	Window_BattleStatus.prototype.updateHpBar = function (container) {
		const width = container._statBarWidth;
		const height = container._statBarHeight;
		const currentHP = this.actor.hp;
		const maxHP = this.actor.mhp;
		const rate = this.actor.hp / this.actor.mhp;
		container._hpBar.bitmap.clear();
		container._hpBar.bitmap.fillRect(0, 0, width, height, "white");
		container._hpBar.bitmap.fillRect(2, 2, width - 4, height - 4, "#444444"); // Background color
		container._hpBar.bitmap.fillRect(2, 2, (width - 4) * rate, height - 4, "#ff4444"); // HP color

		// this.hpValueText.text = `${currentHP}/${maxHP}`;
		// this.hpValueText.x = this.hpBar.x + this.hpBar.bitmap.width - this.hpValueText.width; // Right-aligned
	};

	let lastUpdate_Window_BattleStatus = 0;
	Window_BattleStatus.prototype.refresh = function () {
		if (!this._actorCards) return;
		const deltaTime = Graphics.app.ticker.lastTime - lastUpdate_Window_BattleStatus;

		console.log("refresh");
		// Limit updates to ~60 FPS
		if (deltaTime > 16) {
			lastUpdate = Graphics.app.ticker.lastTime;

			// this.updateHpBar();
			// this.updateMpBar();
		}
	};

	// During battle
	const _Game_Party_addActor = Game_Party.prototype.addActor;
	Game_Party.prototype.addActor = function (actorId) {
		_Game_Party_addActor.call(this, actorId);

		// Refresh the actor cards in the battle scene
		const scene = SceneManager._scene;
		if (scene._statusWindow && scene._statusWindow.refreshActorCards) {
			scene._statusWindow.refreshActorCards();
		}
	};

	Window_BattleStatus.prototype.refreshActorCards = function () {
		console.log("refreshActorCards");
		const actors = $gameParty.battleMembers();
		this._actorCards = this._actorCards || [];

		// Remove extra cards if actors are fewer than before
		while (this._actorCards.length > actors.length) {
			const card = this._actorCards.pop();
			this.removeChild(card); // Remove unused card containers
		}

		// Add new cards for additional actors
		for (let i = this._actorCards.length; i < actors.length; i++) {
			const actor = actors[i];
			const x = this._padding + i * (this._cardWidth + this._padding * 2); // Horizontal positioning
			const y = this._padding + this._parentWindowYPadding; // Vertical positioning

			// Create a container for each actor card
			const cardContainer = new PIXI.Container();
			cardContainer.x = x;
			cardContainer.y = y;
			// console.log(`card: ${i} x: ${cardContainer.x}`);
			this._actorCards.push(cardContainer); // Add to the array
			this.addChild(cardContainer); // Add to the window

			this._cardFrames.push(this.drawCardFrame(i, cardContainer, 0, 0, this._cardWidth, this._cardHeight, this._cornerRadius)); // Draw card frame
			this.drawActorPicture(cardContainer, actor, 0 + this._padding, 0 + this._padding, this._faceSize); // Draw face
			this.drawActorStats(cardContainer, actor, 0 + 10, 0); // Draw stats
		}
	};

	// Override the update method to ensure the cursor is not updated
	Window_BattleStatus.prototype.updateCursor = function () {
		this.setCursorRect(0, 0, 0, 0); // Completely hide the cursor
	};

	// Prevent the selection rectangle from being rendered
	Window_BattleStatus.prototype.select = function (index) {
		this._index = index; // Update the selected index but do not render the cursor
	};

	// Prevent drawing the selection background behind items
	Window_BattleStatus.prototype.drawItemBackground = function (index) {
		// Leave empty to disable the selection background rendering
	};

	// Prevent the highlight (focus rectangle) from being drawn
	Window_BattleStatus.prototype.drawActorSelect = function (index) {
		// Leave empty to disable the default highlight
	};

	// Prevent active state from causing visual highlights
	Window_BattleStatus.prototype.isCursorVisible = function () {
		return false; // Always return false to prevent the cursor from showing
	};
})();
