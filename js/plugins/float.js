/*:
 * @target MZ
 * @plugindesc Adds floating movement to enemy sprites in battle, making them more dynamic.
 * @author taescodetalker
 * @help
 * This plugin makes enemy sprites float smoothly up and down during battle.
 * 
 * Features:
 * - Configurable float speed and height.
 * - Automatically applies to all enemies in battle.
 * 
 * No plugin commands are required.
 * 
 * Terms of Use:
 * - Free for commercial and non-commercial use. Credit appreciated!
 */

(() => {
    // Configurable float settings
    const floatHeight = 15; // Maximum height the sprite will move up or down
    const floatSpeed = 60; // Speed of the float (higher is slower)

    // Extend the Sprite_Enemy class to include floating movement
    const _Sprite_Enemy_updatePosition = Sprite_Enemy.prototype.updatePosition;
    Sprite_Enemy.prototype.updatePosition = function() {
        _Sprite_Enemy_updatePosition.call(this);
        this.applyFloatingMotion();
    };

    // Add floating motion
    Sprite_Enemy.prototype.applyFloatingMotion = function() {
        const time = Graphics.frameCount; // Use the frame count for smooth animation
        const offset = Math.floor(Math.sin((time + this._enemy.index() * floatSpeed) / floatSpeed) * floatHeight);
        this.y += offset;
    };
})();
