/*:
 * @target MZ
 * @plugindesc Customizes the battle status animation.
 * @author Vincent Thieu
 *
 * @help
 * This plugin customizes the battle status animation in RPG Maker MZ.
 *
 * Terms of Use: Commercial.
 *
 * Version: 1.0.0
 */

(() => {
	// Override the initialization to ensure the selection cursor is disabled
	const _Window_BattleStatus_initialize = Window_BattleStatus.prototype.initialize;
	Window_BattleStatus.prototype.initialize = function (rect) {
		_Window_BattleStatus_initialize.call(this, rect);

		this.deactivate(); // Deactivate the window so the selection cursor doesn't render
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

	// Override the initialize method of Window_BattleStatus
	Window_BattleStatus.prototype.initialize = function () {
		_Window_BattleStatus_initialize.call(this);
		console.log("initialize2");

		// Setup animation for cards
		this.setupCardAnimations();
	};

	// Setup individual card animations
	Window_BattleStatus.prototype.setupCardAnimations = function () {
		this._cardAnimationTicker = new PIXI.Ticker();
		this._cardAnimationTicker.add(() => {
			this.updateCardAnimations();
		});
		this._cardAnimationTicker.start();
	};

	// Update the animation for each card
	Window_BattleStatus.prototype.updateCardAnimations = function () {
		if (!this._actorCards) return;

		for (let i = 0; i < this._actorCards.length; i++) {
			const card = this._actorCards[i];

			// Calculate a wobble effect based on time
			const time = Date.now() / 1000;
			const rotation = Math.sin(time + i) * 0.05; // Offset each card's wobble slightly
			card.rotation = rotation;
		}
	};

	// Stop animation on destroy
	const _Window_BattleStatus_destroy = Window_BattleStatus.prototype.destroy;
	Window_BattleStatus.prototype.destroy = function (options) {
		if (this._cardAnimationTicker) {
			this._cardAnimationTicker.stop();
			this._cardAnimationTicker.destroy();
			this._cardAnimationTicker = null;
		}
		_Window_BattleStatus_destroy.call(this, options);
	};

	// Override update to handle the selection highlight
	const _Window_BattleStatus_update = Window_BattleStatus.prototype.update;
	Window_BattleStatus.prototype.update = function () {
		_Window_BattleStatus_update.call(this);

		this.updateSelectedActorHighlight();
	};

	// Update the selected actor's highlight
	Window_BattleStatus.prototype.updateSelectedActorHighlight = function () {
		const selectedActor = BattleManager.actor(); // Get the currently selected actor
		if (!this._actorCards || this._actorCards.length === 0) return;

		// Only proceed if the selected actor has changed
		if (this._lastSelectedActor === selectedActor) return;
		this._lastSelectedActor = selectedActor; // Update the last selected actor
		console.log("updateSelectedActorHighlight");

		for (let i = 0; i < this._actorCards.length; i++) {
			const card = this._actorCards[i];
			const actor = $gameParty.battleMembers()[i];
			const cardFrame = this._cardFrames[i];

			if (!card._originalY) {
				// Store the original Y position if not already stored
				card._originalY = card.y;
			}

			if (actor === selectedActor) {
				// Move the selected actor's card up
				card.y = card._originalY - 100; // Move up by 10 pixels (adjust as needed)
				this.updateGraphicsSettings(actor, cardFrame, 0xffffff, 0.8);
			} else {
				// Reset the position of non-selected actors
				card.y = card._originalY;
				this.resetGraphicsSettings(cardFrame);
			}
		}
	};

	Window_BattleStatus.prototype.updateGraphicsSettings = function (actor, graphics, color, alpha) {
		// console.log(actor.name());
		// console.log(graphics._id);
		const rect = graphics._rect || {}; // Retrieve stored rectangle dimensions
		const settings = graphics._settings || {}; // Retrieve stored settings

		// Clear the current drawing
		graphics.clear();

		// Reapply stored settings
		graphics.beginFill(color, alpha);
		graphics.lineStyle(settings.lineWidth || 0, settings.lineColor || 0x000000);
		graphics.drawRoundedRect(rect.x, rect.y, rect.width, rect.height, rect.radius || 0);
		graphics.endFill();
	};

	Window_BattleStatus.prototype.resetGraphicsSettings = function (graphics) {
		if (!graphics._settings) return;
		const settings = graphics._settings || {}; // Retrieve stored settings
		const rect = graphics._rect || {}; // Retrieve stored rectangle dimensions

		// Clear the current drawing
		graphics.clear();

		// Reapply stored settings
		graphics.beginFill(settings.fillColor, settings.fillAlpha);
		graphics.lineStyle(settings.lineWidth || 0, settings.lineColor || 0x000000);
		graphics.drawRoundedRect(rect.x, rect.y, rect.width, rect.height, rect.radius || 0);
		graphics.endFill();
	};
})();
