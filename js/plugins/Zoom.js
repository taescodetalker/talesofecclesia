/*:
 * @target MZ
 * @plugindesc v0.6.0 Map zoom
 * @author ScSWinter (edited by Arthran)
 *
 * @help
 * =======================================================
 * Information
 * =======================================================
 * This script allows you to show maps with a default zoom.
 * When activated the zoom of the map changes. Specify the
 * map zoom using in the map notetag box the notetag
 *    Zoom:X
 * where X is a number greater than 1. If the notetag is not
 * specified the default zoom is the one at the options.
 *
 *
 * =======================================================
 * Credits
 * =======================================================
 * Please, credit to "ScSWinter" and "Arthran" in the 
 * credits of your game.
 *
 * =======================================================
 * License: The MIT License
 * =======================================================
 * Copyright 2020 ScSWinter
 * This plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 *
 * @param Default zoom for maps
 * @type number
 * @min 1.00
 * @max 9.00
 * @decimals 2
 * @desc The default zoom when none is specified as notetag.
 * @default 1.50
 *
 * @param Always free camera
 * @type boolean
 * @parent --- General ---
 * @on Yes
 * @off No
 * @desc When activated, the camera will never be blocked by
 * the edges of the map.
 * @default false
 *
 * @param Fix sprite black lines
 * @type boolean
 * @on Yes
 * @off No
 * @desc Fix sprite black lines? This option will cut the
 * sprites one pixel in each side.
 * @default true
 *
 * @param Fix map encounter zoom
 * @type boolean
 * @on Yes
 * @off No
 * @desc Fix map encounter zoom? Deactivate this option if
 * you changed the default encounter zoom effect.
 * @default true
 *
 * @command Zoom
 * @text Zoom
 * @desc Custom. display and vanish without wait.
 *
 * @arg FramesToZoom
 * @text Frames to Zoom
 * @desc The number of frames needed to perform the zoom.
 * @type number
 * @default 1
 * @min 1
 * @max 300
 *
 * @arg ZoomValue
 * @text Zoom Value
 * @desc The zoom value that will be performed.
 * @type number
 * @min 1.00
 * @max 9.00
 * @decimals 2
 * @default 1.50
 *
 */
(function() {
    'use strict';

    window.ScSWinterZoom = window.ScSWinterZoom || {};
    ScSWinterZoom.params = PluginManager.parameters('Zoom');

    var s_extractNoteValue = function(notes, ntag) {
        var s_tags = notes.split(/[\r\n]+/); 
        var s_val = "0";

        for (var i = 0; i < s_tags.length; i++) {
            if (s_tags[i].indexOf(ntag) > -1) {
                var id = s_tags[i].split(':');
                s_val=id[1];
            }
        };

        return s_val;
    };

    /* Optional fixes */
    ScSWinterZoom.FixSprites = (ScSWinterZoom.params['Fix sprite black lines'] == "true");
    if(ScSWinterZoom.FixSprites) {
        Sprite_Character.prototype.setFrame = function(x, y, width, height) {
            width = (width == 0 ? 0 : width-1);
            height= (height == 0 ? 0 : height-1);
            Sprite.prototype.setFrame.call(this, x + 1, y + 1, width, height);
        };
    }

    ScSWinterZoom.FixEncounter = (ScSWinterZoom.params['Fix map encounter zoom'] == "true");
    if(ScSWinterZoom.FixEncounter) {
        Scene_Map.prototype.updateEncounterEffect = function() {
            if (this._encounterEffectDuration > 0) {
                this._encounterEffectDuration--;
                const speed = this.encounterEffectSpeed();
                const n = speed - this._encounterEffectDuration;
                const p = n / speed;
                var q = ((p - 1) * 20 * p + 5) * p + 1;
                q = q * $gameMap._currentZoom;
                const zoomX = $gamePlayer.screenX();
                const zoomY = $gamePlayer.screenY() - 24;

                if (n === 2) {
                    $gameScreen.setZoom(zoomX, zoomY, 1);
                    this.snapForBattleBackground();
                    this.startFlashForEncounter(speed / 2);
                }

                $gameScreen.setZoom(zoomX, zoomY, q);

                if (n === Math.floor(speed / 6)) {
                    this.startFlashForEncounter(speed / 2);
                }
                if (n === Math.floor(speed / 2)) {
                    BattleManager.playBattleBgm();
                    this.startFadeOut(this.fadeSpeed());
                }
            }
        };
    }

    ScSWinterZoom.FreeCamera = (ScSWinterZoom.params['Always free camera'] == "true");

    Game_Map.prototype.extraScreenTile = function(zoom) {
        var zoomTileX = Math.round((Graphics.width / (this.tileWidth() * zoom)) * 16) / 16;
        var zoomTileY = Math.round((Graphics.height / (this.tileHeight() * zoom)) * 16) / 16;
        this._extraScreenTileX = (this.screenTileX() - zoomTileX) / 2;
        this._extraScreenTileY = (this.screenTileY() - zoomTileY) / 2;
        this._currentZoom = zoom;
    };

    Game_Map.prototype.canvasToMapX = function(x) {
        const tileWidth = this.tileWidth() * this._currentZoom;
        const originX = (this._displayX + this._extraScreenTileX) * tileWidth;
        const mapX = Math.floor((originX + x) / tileWidth);
        return this.roundX(mapX);
    };

    Game_Map.prototype.canvasToMapY = function(y) {
        console.log(this._currentZoom);
        const tileHeight = this.tileHeight() * this._currentZoom;
        const originY = (this._displayY + this._extraScreenTileY) * tileHeight;
        const mapY = Math.floor((originY + y) / tileHeight);
        return this.roundY(mapY);
    };

    Game_Map.prototype.scrollLeft = function(distance) {
        if (this.isLoopHorizontal()) {
            this._displayX += $dataMap.width - distance;
            this._displayX %= $dataMap.width;
            if (this._parallaxLoopX) {
                this._parallaxX -= distance;
            }
        } else if (ScSWinterZoom.FreeCamera) {
            const lastX = this._displayX;
            this._displayX -= distance;
            this._parallaxX += this._displayX - lastX;
        } else if (this.width() + this._extraScreenTileX * 2 >= this.screenTileX()) {
            const lastX = this._displayX;
            this._displayX = Math.max(this._displayX - distance, this._extraScreenTileX * -1);
            this._parallaxX += this._displayX - lastX;
        }
    };
    
    Game_Map.prototype.scrollRight = function(distance) {
        if (this.isLoopHorizontal()) {
            this._displayX += distance;
            this._displayX %= $dataMap.width;
            if (this._parallaxLoopX) {
                this._parallaxX += distance;
            }
        } else if (ScSWinterZoom.FreeCamera) {
            const lastX = this._displayX;
            this._displayX += distance;
            this._parallaxX += this._displayX - lastX;
        } else if (this.width() + this._extraScreenTileX * 2 >= this.screenTileX()) {
            const lastX = this._displayX;
            this._displayX = Math.min(
                this._displayX + distance,
                this.width() - this.screenTileX() + this._extraScreenTileX
            );
            this._parallaxX += this._displayX - lastX;
        }
    };

    Game_Map.prototype.scrollUp = function(distance) {
        if (this.isLoopVertical()) {
            this._displayY += $dataMap.height - distance;
            this._displayY %= $dataMap.height;
            if (this._parallaxLoopY) {
                this._parallaxY -= distance;
            }
        } else if (ScSWinterZoom.FreeCamera) {
            const lastY = this._displayY;
            this._displayY -= distance;
            this._parallaxY += this._displayY - lastY;
        } else if (this.height() + this._extraScreenTileY * 2 >= this.screenTileY()) {
            const lastY = this._displayY;
            this._displayY = Math.max(this._displayY - distance, this._extraScreenTileY * -1);
            this._parallaxY += this._displayY - lastY;
        }
    };

    Game_Map.prototype.scrollDown = function(distance) {
        if (this.isLoopVertical()) {
            this._displayY += distance;
            this._displayY %= $dataMap.height;
            if (this._parallaxLoopY) {
                this._parallaxY += distance;
            }
        } else if (ScSWinterZoom.FreeCamera) {
            const lastY = this._displayY;
            this._displayY += distance;
            this._parallaxY += this._displayY - lastY;
        } else if (this.height() + this._extraScreenTileY * 2 >= this.screenTileY()) {
            const lastY = this._displayY;
            this._displayY = Math.min(
                this._displayY + distance,
                this.height() - this.screenTileY() + this._extraScreenTileY
            );
            this._parallaxY += this._displayY - lastY;
        }
    };

    Game_Map.prototype.setDisplayPos = function(x, y) {
        console.log(this._currentZoom);
        if (this.isLoopHorizontal()) {
            this._displayX = x.mod(this.width());
            this._parallaxX = x;
        } else if (ScSWinterZoom.FreeCamera) {
            this._displayX = x;
            this._parallaxX = x;
        } else {
            const endX = this.width() - this.screenTileX() + this._extraScreenTileX * 2;
            this._displayX = endX < 0 ? endX / 2 - this._extraScreenTileX : x.clamp(this._extraScreenTileX * -1, endX - this._extraScreenTileX);
            this._parallaxX = this._displayX;
        }
        if (this.isLoopVertical()) {
            this._displayY = y.mod(this.height());
            this._parallaxY = y;
        } else if (ScSWinterZoom.FreeCamera) {
            this._displayY = y;
            this._parallaxY = y;
        } else {
            const endY = this.height() - this.screenTileY() + this._extraScreenTileY * 2;
            this._displayY = endY < 0 ? endY / 2 - this._extraScreenTileY : y.clamp(this._extraScreenTileY * -1, endY - this._extraScreenTileY);
            this._parallaxY = this._displayY;
        }
    };

    /* Scene_Map */
    ScSWinterZoom.DefaultZoom = parseFloat(ScSWinterZoom.params['Default zoom for maps']) || 1.0;

    Scene_Map.prototype.onMapLoaded = function() {
        var s_zoom = parseFloat(s_extractNoteValue($dataMap.note,"Zoom:")) || 0.0;

        if (s_zoom < 0.5) 
            s_zoom = ScSWinterZoom.DefaultZoom;
        if (s_zoom > 1.0) 
            $gameMap.extraScreenTile(s_zoom);
        else 
            $gameMap.extraScreenTile(1);

        if (this._transfer) {
            $gamePlayer.performTransfer();
        }
        if (s_zoom > 1.0) {
            $gameScreen.setZoom(Graphics.width / 2, Graphics.height / 2, s_zoom);
        } else 
            $gameScreen.clearZoom();

        this.createDisplayObjects();
    };

    /* Game_Screen */
    Game_Screen.prototype.updateZoom = function() {
        if (this._zoomDuration > 0) {
            const d = this._zoomDuration;
            const t = this._zoomScaleTarget;
            this._zoomScale = (this._zoomScale * (d - 1) + t) / d;
            $gameMap.extraScreenTile(this._zoomScale);
            this._zoomDuration--;
        }
    };

    /* PluginManager */
    PluginManager.registerCommand('Zoom', 'Zoom', args => {
        const frameToZoom = +args.FramesToZoom;
        const valueZoom = +args.ZoomValue;
        $gameMap.extraScreenTile(valueZoom);
        $gameScreen.startZoom($gamePlayer.screenX(), $gamePlayer.screenY() - $gameMap.tileWidth() / 2, valueZoom, frameToZoom);
    });

})();
