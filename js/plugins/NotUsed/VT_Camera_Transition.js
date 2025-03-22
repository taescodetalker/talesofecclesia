/*:
 * @target MZ
 * @plugindesc Adds smooth camera transitions and zoom to RPG Maker MZ.
 * @author Vincent Thieu
 *
 * @command SmoothTransition
 * @text Smooth Camera Transition
 * @desc Moves the camera smoothly to a target tile position with optional zoom.
 *
 * @arg targetX
 * @text Target X (Tile)
 * @type number
 * @min 0
 * @desc The target X tile position (map coordinate, not pixels).
 *
 * @arg targetY
 * @text Target Y (Tile)
 * @type number
 * @min 0
 * @desc The target Y tile position (map coordinate, not pixels).
 *
 * @arg zoomLevel
 * @text Zoom Level
 * @type number
 * @min 0.5
 * @max 3.0
 * @decimals 1
 * @default 1.0
 * @desc The target zoom level (1.0 = normal zoom, >1 zooms in, <1 zooms out).
 *
 * @arg duration
 * @text Duration (Frames)
 * @type number
 * @min 1
 * @default 60
 * @desc How many frames the transition should take.
 *
 * @command SnapBackToPlayer
 * @text Snap Back to Player
 * @desc Smoothly moves the camera back to follow the player, resetting zoom if desired.
 *
 * @arg zoomLevel
 * @text Final Zoom Level
 * @type number
 * @min 0.5
 * @max 3.0
 * @decimals 1
 * @default 1.0
 * @desc Zoom level to restore when snapping back to the player (1.0 = normal zoom).
 *
 * @arg duration
 * @text Duration (Frames)
 * @type number
 * @min 1
 * @default 60
 * @desc How many frames the snap back transition should take.
 */

(() => {
	PluginManager.registerCommand("VT_Camera_Transition", "SmoothTransition", (args) => {
		const targetX = Number(args.targetX);
		const targetY = Number(args.targetY);
		const zoomLevel = Number(args.zoomLevel);
		const duration = Number(args.duration);

		smoothCameraMove(targetX, targetY, zoomLevel, duration);
	});

	PluginManager.registerCommand("VT_Camera_Transition", "SnapBackToPlayer", (args) => {
		const zoomLevel = Number(args.zoomLevel);
		const duration = Number(args.duration);
		const playerX = $gamePlayer.x;
		const playerY = $gamePlayer.y;

		smoothCameraMove(playerX, playerY, zoomLevel, duration);
	});

	function smoothCameraMove(targetX, targetY, targetZoom, duration) {
		const startX = $gameMap.displayX();
		const startY = $gameMap.displayY();
		const startZoom = $gameScreen.zoomScale();

		const screenTileX = $gameMap.screenTileX();
		const screenTileY = $gameMap.screenTileY();

		let frame = 0;

		function update() {
			frame++;
			const t = frame / duration;
			const easedT = t * t * (3 - 2 * t);

			const currentZoom = startZoom + (targetZoom - startZoom) * easedT;

			// Calculate visible tile range at current zoom level
			const visibleTilesX = screenTileX / currentZoom;
			const visibleTilesY = screenTileY / currentZoom;

			// Target display position — this centers targetX/targetY
			let targetDisplayX = targetX - visibleTilesX / 2;
			let targetDisplayY = targetY - visibleTilesY / 2;

			// Interpolate between current and target display positions
			const currentDisplayX = startX + (targetDisplayX - startX) * easedT;
			const currentDisplayY = startY + (targetDisplayY - startY) * easedT;

			$gameMap.setDisplayPos(currentDisplayX, currentDisplayY);
			$gameScreen.setZoom(currentDisplayX, currentDisplayY, currentZoom);

			if (frame <= duration) {
				requestAnimationFrame(update);
			}
		}

		update();
	}
})();
