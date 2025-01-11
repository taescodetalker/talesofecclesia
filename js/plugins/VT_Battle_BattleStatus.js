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

		const cardWidth = 300; // Width of each card
		const cardHeight = 400; // Height of each card
		const padding = 15; // Padding between cards
		const faceSize = 260; // Size of the actor face inside the card
		const cornerRadius = 15; // Rounded corner radius
		const parentWindowYPadding = 150; // leave space at top for card animation

		this._actorCards = []; // Array to store individual card containers
		this._cardFrames = [];

		for (let i = 0; i < actors.length; i++) {
			const actor = actors[i];
			const x = padding + i * (cardWidth + padding * 2); // Horizontal positioning
			const y = padding + parentWindowYPadding; // Vertical positioning

			// Create a container for each actor card
			const cardContainer = new PIXI.Container();
			cardContainer.x = x;
			cardContainer.y = y;
			// console.log(`card: ${i} x: ${cardContainer.x}`);
			this._actorCards.push(cardContainer); // Add to the array
			this.addChild(cardContainer); // Add to the window

			this._cardFrames.push(this.drawCardFrame(i, cardContainer, 0, 0, cardWidth, cardHeight, cornerRadius)); // Draw card frame
			this.drawActorPicture(cardContainer, actor, 0 + padding, 0 + padding, faceSize); // Draw face
			this.drawActorStats(cardContainer, actor, 0 + 10, 0); // Draw stats
		}

		this.refresh();
	};

	Window_BattleStatus.prototype.refresh = function () {};

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
		pixiText.x = x + this.padding; // Adjust for window padding
		pixiText.y = y + this.padding; // Adjust for window padding

		// Add PIXI.Text to the window container
		container.addChild(pixiText);
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
		// Check if a custom face is specified in the actor's metadata
		if (actor.actor().meta.picture) {
			const actorFace = new Sprite();
			const customFaceName = actor.actor().meta.picture || actor.faceName(); // Use metadata or default face
			actorFace.bitmap = ImageManager.loadBitmap("img/faces/", customFaceName);

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
		} else {
			// Default face behavior
			const bitmap = ImageManager.loadFace(actor.faceName());
			const faceIndex = actor.faceIndex();
			const faceWidth = ImageManager.faceWidth;
			const faceHeight = ImageManager.faceHeight;

			const texture = PIXI.Texture.from(bitmap.baseTexture);
			const sprite = new PIXI.Sprite(texture);

			// Calculate the portion of the face sheet to use
			sprite.texture.frame = new PIXI.Rectangle((faceIndex % 4) * faceWidth, Math.floor(faceIndex / 4) * faceHeight, faceWidth, faceHeight);

			// Scale and position the sprite
			sprite.width = targetSize;
			sprite.height = targetSize;
			sprite.x = x;
			sprite.y = y;

			container.addChild(sprite);
		}
	};

	// Draw the actor's stats
	Window_BattleStatus.prototype.drawActorStats = function (container, actor, x, y) {
		// Draw actor name using PIXI.Text
		this.drawCustomText(container, actor.name(), x + 10, y + 280 - 30, {
			fontFamily: "Verdana",
			fontSize: 24,
			fill: "yellow",
			stroke: "red",
			strokeThickness: 2,
		});

		// Draw actor level using PIXI.Text
		this.drawCustomText(container, "LV: " + actor.level, x + 10, y, {
			fontFamily: "Verdana",
			fontSize: 24,
			fill: "yellow",
			stroke: "red",
			strokeThickness: 2,
		});

		// Draw actor HP using PIXI.Text
		this.drawCustomText(container, `HP: ${actor.hp}/${actor.mhp}`, x + 10, y + 280, {
			fontFamily: "Verdana",
			fontSize: 24,
			fill: "white",
			stroke: "black",
			strokeThickness: 1,
		});

		// Draw actor MP using PIXI.Text
		this.drawCustomText(container, `MP: ${actor.mp}/${actor.mmp}`, x + 10, y + 280 + 30, {
			fontFamily: "Verdana",
			fontSize: 24,
			fill: "cyan",
			stroke: "blue",
			strokeThickness: 1,
		});
	};
})();
