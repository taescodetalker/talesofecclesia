/*:
 * @target MZ
 * @plugindesc Displays an overlay with actor picture, HP, and MP bars.
 * @author Vincent Thieu
 *
 *
 * @help VT_ActorOverlay.js
 *
 * This plugin customizes overlay in RPG Maker MZ.
 *
 * Terms of Use: Commercial.
 *
 * Version: 1.0.1
 */

(() => {
	("use strict");
	var PLUGIN_NAME = "VT_ActorOverlay";
	var pluginParams = PluginManager.parameters(PLUGIN_NAME);

	var fontface = "Verdana";
	var fontsize = 48;
	var fontcolor = "white";

	var statBarWidth = 150;
	var statBarHeight = 20;

	class Sprite_ActorOverlay extends Sprite {
		constructor(actor) {
			super();
			this.actor = actor;
			this.initComponents();
		}

		initComponents() {
			this.createActorPicture();
			this.createHpBar();
			this.createMpBar();
			this.createLevel();
		}

		createActorPicture() {
			// Create a container for the frame and picture
			this.pictureContainer = new Sprite();
			this.addChild(this.pictureContainer);

			// Draw the diamond-shaped frame
			this.drawPictureFrame();

			// Load and crop the actor's picture
			this.actorPicture = new Sprite();
			this.actorPicture.bitmap = ImageManager.loadPicture(this.actor.actor().meta.picture || "Evil_8"); // Picture name from note tag <picture:Actor1_1>
			const mask = this.createMaskDiamond();
			this.actorPicture.addChild(mask);
			this.actorPicture.mask = mask;
			this.pictureContainer.addChild(this.actorPicture);
		}

		drawPictureFrame() {
			// Create a bitmap for the frame
			const frameSize = 200; // Original size of the diamond's side-to-side width
			const diagonalSize = Math.sqrt(2) * frameSize; // Calculate the required canvas size
			const borderSize = 10; // Thickness of the border

			// Create a bitmap large enough for the rotated frame
			const frameBitmap = new Bitmap(diagonalSize + borderSize * 2, diagonalSize + borderSize * 4);

			// Draw the diamond shape
			// Transparent background "rgba(0,0,0,0)"
			frameBitmap.fillRect(0, 0, diagonalSize + borderSize * 2, diagonalSize + borderSize * 2, "rgba(0,0,0,0)");
			frameBitmap.context.save();
			frameBitmap.context.translate(diagonalSize / 2, diagonalSize / 2); // Center the diamond
			frameBitmap.context.rotate((45 * Math.PI) / 180); // Rotate canvas by 45 degrees

			// Draw the inner diamond
			frameBitmap.context.fillStyle = "rgb(83, 45, 15)";
			frameBitmap.context.fillRect(-frameSize / 2 + borderSize * 2, -frameSize / 2 + borderSize, frameSize, frameSize);

			// Draw the border (white)
			frameBitmap.context.strokeStyle = "white";
			frameBitmap.context.lineWidth = borderSize;
			frameBitmap.context.strokeRect(-frameSize / 2 + borderSize * 2, -frameSize / 2 + borderSize, frameSize, frameSize);

			frameBitmap.context.restore();

			// Create the frame sprite and position it
			const frameSprite = new Sprite(frameBitmap);
			// frameSprite.x = -(diagonalSize - frameSize) / 2; // Adjust for larger canvas
			// frameSprite.y = -(diagonalSize - frameSize) / 2; // Adjust for larger canvas
			this.pictureContainer.addChild(frameSprite);
		}

		createHpBar() {
			var x = 150;
			var y = 240;

			this.hpBar = new Sprite();
			this.hpBar.bitmap = new Bitmap(statBarWidth, statBarHeight); // Adjust size as needed
			this.hpBar.x = x;
			this.hpBar.y = y;
			this.addChild(this.hpBar);

			// Create and position the "LP" label text using PIXI.Text
			this.hpText = new PIXI.Text("LP", {
				fontFamily: fontface,
				fontSize: 24,
				fill: "#FFFF00", // Yellow text
				align: "left",
				stroke: "#000000", // Black outline
				strokeThickness: 4, // Outline thickness
			});
			this.hpText.x = this.hpBar.x - 30; // Adjust as needed to position text
			this.hpText.y = this.hpBar.y + this.hpBar.bitmap.height / 2 - this.hpText.height / 2 - 15;
			this.addChild(this.hpText);

			// Create and position the HP value text using PIXI.Text
			this.hpValueText = new PIXI.Text("50/340", {
				fontFamily: fontface,
				fontSize: 24,
				fill: "#FFFF00", // Yellow text
				align: "right",
				stroke: "#000000", // Black outline
				strokeThickness: 4, // Outline thickness
			});
			this.hpValueText.x = this.hpBar.x + this.hpBar.bitmap.width - this.hpValueText.width; // Right-aligned
			this.hpValueText.y = this.hpText.y; // Align vertically with the bar
			this.addChild(this.hpValueText);

			// Update the hpBar display
			this.updateHpBar();
		}

		createMpBar() {
			var x = 150;
			var y = 280;

			this.mpBar = new Sprite();
			this.mpBar.bitmap = new Bitmap(statBarWidth, statBarHeight); // Adjust size as needed
			this.mpBar.x = x;
			this.mpBar.y = y;
			this.addChild(this.mpBar);

			// Create and position the "MP" label text using PIXI.Text
			this.mpText = new PIXI.Text("MP", {
				fontFamily: fontface,
				fontSize: 24,
				fill: "#FFFF00", // Yellow text
				align: "left",
				stroke: "#000000", // Black outline
				strokeThickness: 4, // Outline thickness
			});
			this.mpText.x = this.mpBar.x - 30; // Adjust as needed to position text
			this.mpText.y = this.mpBar.y + this.mpBar.bitmap.height / 2 - this.mpText.height / 2 - 15;
			this.addChild(this.mpText);

			// Create and position the HP value text using PIXI.Text
			this.mpValueText = new PIXI.Text("50/340", {
				fontFamily: fontface,
				fontSize: 24,
				fill: "#FFFF00", // Yellow text
				align: "right",
				stroke: "#000000", // Black outline
				strokeThickness: 4, // Outline thickness
			});
			this.mpValueText.x = this.mpBar.x + this.mpBar.bitmap.width - this.mpValueText.width; // Right-aligned
			this.mpValueText.y = this.mpText.y; // Align vertically with the bar
			this.addChild(this.mpValueText);

			this.updateMpBar();
		}

		update() {
			super.update();
			this.updateHpBar();
			this.updateMpBar();
		}

		updateHpBar() {
			const width = statBarWidth;
			const height = statBarHeight;
			const currentHP = this.actor.hp;
			const maxHP = this.actor.mhp;
			const rate = this.actor.hp / this.actor.mhp;
			this.hpBar.bitmap.clear();
			// outline
			this.hpBar.bitmap.fillRect(0, 0, width, height, "white");
			this.hpBar.bitmap.fillRect(2, 2, width - 4, height - 4, "#444444"); // Background color
			this.hpBar.bitmap.fillRect(2, 2, (width - 4) * rate, height - 4, "#ff4444"); // HP color

			this.hpValueText.text = `${currentHP}/${maxHP}`;
			this.hpValueText.x = this.hpBar.x + this.hpBar.bitmap.width - this.hpValueText.width; // Right-aligned
		}

		updateMpBar() {
			const width = statBarWidth;
			const height = statBarHeight;
			const currentMP = this.actor.mp;
			const maxMP = this.actor.mmp;
			const rate = this.actor.mp / this.actor.mmp;
			this.mpBar.bitmap.clear();
			// outline
			this.mpBar.bitmap.fillRect(0, 0, width, height, "white");
			this.mpBar.bitmap.fillRect(2, 2, width - 4, height - 4, "#444444"); // Background color
			this.mpBar.bitmap.fillRect(2, 2, width * rate - 4, height - 4, "#4444ff"); // MP color

			this.mpValueText.text = `${currentMP}/${maxMP}`;
			this.mpValueText.x = this.mpBar.x + this.mpBar.bitmap.width - this.mpValueText.width; // Right-aligned
		}

		createMaskCircle() {
			// Create a circular mask
			const mask = new PIXI.Graphics();
			mask.beginFill("white");
			mask.drawCircle(100, 100, 50); // Center (100, 100) with radius 50
			mask.endFill();

			// Position the mask relative to the sprite's center
			mask.x = this.actorPicture.bitmap.width / 2;
			mask.y = this.actorPicture.bitmap.height / 2;

			return mask;
		}

		createMaskDiamond() {
			const mask = new PIXI.Graphics();
			mask.beginFill("#4444ff");
			mask.drawPolygon([
				150,
				30, // Top
				282,
				162, // Right
				150,
				300, // Bottom
				15,
				162, // Left
			]);
			mask.endFill();
			return mask;
		}

		createLevel() {
			var x = 100;
			var level = this.actor.level;

			// Create and position the "HP" label text using PIXI.Text
			this.lvlText = new PIXI.Text("Lvl: " + level, {
				fontFamily: fontface,
				fontSize: 24,
				fill: "#FFFF00", // Yellow text
				align: "left",
				stroke: "#000000", // Black outline
				strokeThickness: 4, // Outline thickness
			});
			this.lvlText.x = x - 70; // Adjust as needed to position text
			this.lvlText.y = this.hpText.y;
			this.addChild(this.lvlText);

			this.updateLvlText();
		}
		updateLvlText() {
			this.lvlText.text = "Lvl: " + this.actor.level;
		}

		refresh() {
			// Ensure to remove previous drawing elements
			this.removeChild(this.hpBar); // Remove old HP/MP bars
			this.removeChild(this.mpBar);
			this.removeChild(this.pictureContainer); // Remove old actor picture, if needed

			// Redraw or reinitialize the actor data and overlays
			this.createHpBar(); // Redraw HP bars
			this.createMpBar();
			this.createActorPicture(); // Redraw actor picture, etc.
		}
	}

	const _Scene_Map_update = Scene_Map.prototype.update;
	Scene_Map.prototype.update = function () {
		// Call the original update method
		_Scene_Map_update.call(this);

		// Check for button press (e.g., TAB key)
		if (Input.isTriggered("tab")) {
			// Toggle sprite visibility
			this._spritesVisible = !this._spritesVisible;
			// Update the sprite visibility immediately
			if (this._partySpritesLayer) {
				this._partySpritesLayer.visible = this._spritesVisible;
			}
		}

		// Check if the party composition has changed
		if (this._partyCompositionChanged()) {
			this._refreshPartySprites();
		}
	};

	Scene_Map.prototype._partyCompositionChanged = function () {
		// Example: Compare current party members to stored list
		const currentPartyMembers = $gameParty.members();
		if (!this._lastPartyMembers || this._lastPartyMembers.length !== currentPartyMembers.length) {
			this._lastPartyMembers = [...currentPartyMembers];
			return true;
		}
		for (let i = 0; i < currentPartyMembers.length; i++) {
			if (this._lastPartyMembers[i] !== currentPartyMembers[i]) {
				this._lastPartyMembers = [...currentPartyMembers];
				return true;
			}
		}
		return false;
	};

	Scene_Map.prototype._refreshPartySprites = function () {
		// Clear existing sprites from the party layer
		if (this._partySpritesLayer) {
			this._partySpritesLayer.removeChildren();
		} else {
			// Create a dedicated container for party sprites
			this._partySpritesLayer = new PIXI.Container();
			this._spriteset._pictureContainer.addChildAt(this._partySpritesLayer, 0);
		}

		// Redraw sprites for current party members
		const partyMembers = $gameParty.members();

		const startX = 50; // Starting X position
		const startY = 750; // Starting Y position
		const spacingX = 300; // Vertical spacing between overlays

		for (let i = 0; i < partyMembers.length; i++) {
			const member = partyMembers[i];
			const overlay = new Sprite_ActorOverlay(member);
			overlay.x = startX + i * spacingX;
			overlay.y = startY;
			this._partySpritesLayer.addChild(overlay);
		}

		// Set visibility based on the current state
		this._partySpritesLayer.visible = this._spritesVisible;
	};

	const _Scene_Map_createSpriteset = Scene_Map.prototype.createSpriteset;
	Scene_Map.prototype.createSpriteset = function () {
		// Call the original method to create the spriteset
		_Scene_Map_createSpriteset.call(this);

		// Initialize the party sprites array and layer later, once everything is ready
		// this._partySprites = [];
		this._spritesVisible = true; // Track if sprites are visible
	};

	// Hook into Game_Actor's refresh method
	/*This method is automatically called whenever an actor's HP, MP , or other parameters are updated. 
	It now triggers a callback(onPartyMemberChanged) in Scene_Map */
	const _Game_Actor_refresh = Game_Actor.prototype.refresh;
	Game_Actor.prototype.refresh = function () {
		_Game_Actor_refresh.call(this); // Call the original refresh method

		// Notify Scene_Map of the change
		if (SceneManager._scene instanceof Scene_Map) {
			SceneManager._scene.onPartyMemberChanged();
		}
	};

	// Add a handler in Scene_Map to refresh party sprites
	Scene_Map.prototype.onPartyMemberChanged = function () {
		if (this._partySpritesLayer) {
			this._refreshPartySprites();
		}
	};

	// Hook into the recoverAll method of Game_Battler
	const _Game_Battler_recoverAll = Game_Battler.prototype.recoverAll;
	Game_Battler.prototype.recoverAll = function () {
		_Game_Battler_recoverAll.call(this); // Call the original recoverAll method

		// Notify Scene_Map of the change
		if (this instanceof Game_Actor && SceneManager._scene instanceof Scene_Map) {
			SceneManager._scene.onPartyMemberChanged();
		}
	};
})();
