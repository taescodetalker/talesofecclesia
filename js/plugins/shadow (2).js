/*:
 * @target MZ
 * @plugindesc Adds a shadow effect beneath enemy sprites in battle for a more dynamic look.
 * @author Ai
 * @help
 * This plugin adds a shadow beneath the enemy sprites during battle. Shadows will appear
 * below each enemy sprite, giving them a more dynamic look and depth.
 *
 * Terms of Use:
 * - Free for commercial and non-commercial use. Credit appreciated!
 */

(() => {
    // Shadow settings
    const SHADOW_SETTINGS = {
        offsetX: 0, // Horizontal offset for shadow
        offsetY: 10, // Vertical offset for shadow
        opacity: 0.5, // Shadow opacity (0 to 1)
        radius: 10, // Shadow blur radius
        color: "rgba(0, 0, 0, 0.5)", // Shadow color
    };

    // Override the method that draws the enemy sprite in battle
    const _Sprite_Enemy_updateBitmap = Sprite_Enemy.prototype.updateBitmap;
    Sprite_Enemy.prototype.updateBitmap = function() {
        _Sprite_Enemy_updateBitmap.call(this);
        this.createShadow();
    };

    // Create shadow effect for the enemy sprite
    Sprite_Enemy.prototype.createShadow = function() {
        if (!this._shadowSprite) {
            this._shadowSprite = new Sprite();
            this.addChild(this._shadowSprite); // Add shadow as a child of the enemy sprite
        }
        
        // Set the shadow sprite's position and style
        this._shadowSprite.x = this.x + SHADOW_SETTINGS.offsetX;
        this._shadowSprite.y = this.y + SHADOW_SETTINGS.offsetY;

        // Set shadow color and opacity
        this._shadowSprite.bitmap = new Bitmap(this.bitmap.width, this.bitmap.height);
        this._shadowSprite.bitmap.fillRect(0, 0, this.bitmap.width, this.bitmap.height, SHADOW_SETTINGS.color);
        this._shadowSprite.bitmap.blur(SHADOW_SETTINGS.radius);
        this._shadowSprite.opacity = SHADOW_SETTINGS.opacity * 255; // Convert opacity to range 0-255
    };

    // Remove shadow when enemy is removed from screen
    const _Sprite_Enemy_removeChild = Sprite_Enemy.prototype.removeChild;
    Sprite_Enemy.prototype.removeChild = function(child) {
        if (child === this._shadowSprite) {
            this._shadowSprite.bitmap = null; // Remove shadow bitmap
            this._shadowSprite = null; // Clear the shadow sprite
        }
        _Sprite_Enemy_removeChild.call(this, child);
    };
})();
