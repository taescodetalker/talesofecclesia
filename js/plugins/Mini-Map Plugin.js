// Mini-Map Plugin for RPG Maker MZ
/*:
 * @target MZ
 * @plugindesc Adds a mini-map system to your game.
 * @author Taescodetalker
 *
 * @param MapWidth
 * @text Map Width
 * @type number
 * @min 100
 * @max 500
 * @default 150
 *
 * @param MapHeight
 * @text Map Height
 * @type number
 * @min 100
 * @max 500
 * @default 150
 *
 * @param BackgroundColor
 * @text Background Color
 * @type text
 * @default #333
 *
 * @param PlayerColor
 * @text Player Marker Color
 * @type text
 * @default #0f0
 *
 * @param MarkerColor
 * @text Marker Color
 * @type text
 * @default #f00
 *
 * @param PositionTop
 * @text Position from Top
 * @type text
 * @default 20px
 *
 * @param PositionRight
 * @text Position from Right
 * @type text
 * @default 20px
 */

(() => {
    const parameters = PluginManager.parameters("MiniMap");

    class MiniMap {
        constructor() {
            this.config = {
                width: Number(parameters["MapWidth"] || 150),
                height: Number(parameters["MapHeight"] || 150),
                backgroundColor: parameters["BackgroundColor"] || "#333",
                playerColor: parameters["PlayerColor"] || "#0f0",
                markerColor: parameters["MarkerColor"] || "#f00",
                top: parameters["PositionTop"] || "20px",
                right: parameters["PositionRight"] || "20px"
            };
            this.mapCanvas = null;
            this.context = null;
            this.player = { x: 0, y: 0 }; // Default player position
            this.markers = []; // Points of interest
            this.init();
        }

        init() {
            // Create the canvas element
            this.mapCanvas = document.createElement('canvas');
            this.mapCanvas.width = this.config.width;
            this.mapCanvas.height = this.config.height;
            this.mapCanvas.style.position = 'absolute';
            this.mapCanvas.style.top = this.config.top;
            this.mapCanvas.style.right = this.config.right;
            this.mapCanvas.style.border = '2px solid #fff';
            document.body.appendChild(this.mapCanvas);

            this.context = this.mapCanvas.getContext('2d');
            this.draw();
        }

        setPlayerPosition(x, y) {
            this.player.x = x;
            this.player.y = y;
            this.draw();
        }

        addMarker(x, y) {
            this.markers.push({ x, y });
            this.draw();
        }

        clearMarkers() {
            this.markers = [];
            this.draw();
        }

        draw() {
            const ctx = this.context;
            ctx.clearRect(0, 0, this.mapCanvas.width, this.mapCanvas.height);

            // Draw the background
            ctx.fillStyle = this.config.backgroundColor;
            ctx.fillRect(0, 0, this.mapCanvas.width, this.mapCanvas.height);

            // Draw the player
            ctx.fillStyle = this.config.playerColor;
            const playerSize = 8;
            ctx.fillRect(
                this.player.x - playerSize / 2,
                this.player.y - playerSize / 2,
                playerSize,
                playerSize
            );

            // Draw the markers
            ctx.fillStyle = this.config.markerColor;
            this.markers.forEach(marker => {
                ctx.beginPath();
                ctx.arc(marker.x, marker.y, 5, 0, Math.PI * 2);
                ctx.fill();
            });
        }
    }

    // Make MiniMap accessible globally
    window.MiniMap = MiniMap;

    // Example Usage
    const miniMap = new MiniMap();

    // To update player position, use the following in a game event:
    // miniMap.setPlayerPosition(x, y);

    // To add markers dynamically, use:
    // miniMap.addMarker(x, y);
})();
