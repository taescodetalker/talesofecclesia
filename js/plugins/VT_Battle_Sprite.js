/*:
 * @target MZ
 * @plugindesc Adjusts the side-view battle sprite positions for 1080p resolution.
 * @author Vincent Thieu
 *
 * @param SpriteXOffset
 * @text X Offset
 * @desc Adjust the horizontal position of the sprites.
 * @type number
 * @default 1000
 *
 * @param SpriteYOffset
 * @text Y Offset
 * @desc Adjust the vertical position of the sprites.
 * @type number
 * @default 600
 *
 * @param ScaleX
 * @text Scale X
 * @desc Adjust the horizontal scaling factor for the sprite.
 * @type number
 * @default 1
 *
 * @param ScaleY
 * @text Scale Y
 * @desc Adjust the vertical scaling factor for the sprite.
 * @type number
 * @default 1
 *
 * @param SpacingX
 * @text Spacing X
 * @desc Adjust the horizontal spacing between actors.
 * @type number
 * @default 100
 *
 * @param SpacingY
 * @text Spacing Y
 * @desc Adjust the vertical spacing between actors.
 * @type number
 * @default 100
 *
 * @help
 * This plugin overrides the default side-view sprite positions to match a 1080p
 * screen resolution. Adjust the X and Y offsets in the plugin parameters to
 * position your sprites correctly.
 * Terms of Use: Commercial.
 * Version: 1.0.0
 */

(() => {
	const parameters = PluginManager.parameters("VT_Battle_Sprite");
	const xOffset = Number(parameters["SpriteXOffset"] || 1000);
	const yOffset = Number(parameters["SpriteYOffset"] || 600);
	const scaleX = Number(parameters["ScaleX"] || 1); // Adjust horizontal scale
	const scaleY = Number(parameters["ScaleY"] || 1); // Adjust vertical scale
	const spacingX = Number(parameters["SpacingX"] || 100); // Adjust horizontal spacing between actors
	const spacingY = Number(parameters["SpacingY"] || 100); // Adjust vertical spacing between actors

	Sprite_Actor.prototype.setActorHome = function (index) {
		// Calculate the position based on both horizontal and vertical spacing
		this.setHome(xOffset + (index % 4) * spacingX, yOffset + Math.floor(index / 4) * spacingY); // Modifies both X and Y
		this.scale.x = scaleX; // Apply horizontal scaling
		this.scale.y = scaleY; // Apply vertical scaling
	};
})();
