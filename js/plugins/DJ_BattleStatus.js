var Imported = Imported || {};
Imported.DJ_BattleStatus = true;

var DJ = DJ || {};          
DJ.BS = DJ.BS || {};     
DJ.BS.pluginName = 'DJ_BattleStatus';

/*:
 * @target MZ
 * @plugindesc Customizes the battle status menu.
 * @author Dawid Jurago
 *
 * @param hpBarColor
 * @text Hp Color
 * @desc Hp bar color in menus
 * @default rgb(255, 68, 68)
 * 
 * @param mpBarColor
 * @text Mp Color
 * @desc Mp bar color in menus
 * @default rgb(0, 38, 255)
 * 
 * @param tpBarColor
 * @text Tp Color
 * @desc Tp bar color in menus
 * @default rgb(0, 173, 0)
 * 
 * @param hpBarColor2
 * @text Hp Color 2
 * @desc Hp bar second color in menus (If gradient required)
 * @default rgb(255, 68, 68)
 * 
 * @param mpBarColor2
 * @text Mp Color 2
 * @desc Mp bar second color in menus (If gradient required)
 * @default rgb(0, 38, 255)
 * 
 * @param tpBarColor2
 * @text Tp Color 2
 * @desc Tp bar second color in menus (If gradient required)
 * @default rgb(0, 173, 0)
 * 
 * @param gaugesWidth
 * @text Gauges Width
 * @desc Widht of the gauges visible in menus
 * @default 256
 * 
 * @help
 * This plugin customizes the battle status menu in RPG Maker MZ.
 *
 * Terms of Use: Commercial.
 *
 * Version: 0.1.0
 */

DJ.BS.params = PluginManager.parameters(DJ.BS.pluginName);

DJ.BS.Window_BattleStatus_initialize = Window_BattleStatus.prototype.initialize;
Window_BattleStatus.prototype.initialize = function(rect) {
    DJ.BS.Window_BattleStatus_initialize.call(this, rect);
    this.backOpacity = 0;
};

Window_BattleStatus.prototype.loadFaceImages = function() {
    //Hide StatusBase function as we are loading pictures instead of faces.
};

Window_BattleStatus.prototype.drawActorFace = function(actor, x, y, width, height) {
    const pictureName = this.getPictureName(actor);
    if(!pictureName) {
        Window_StatusBase.prototype.drawActorFace.call(this, actor, x, y, width, height);
        return;
    }
    
    width = width || ImageManager.standardFaceWidth;
    height = height || ImageManager.standardFaceHeight;
    const targetSize = width - this.padding * 2;
    const bitmap = this.loadFace(actor);

    // Dynamically scale the image to fit the target size
	const originalWidth = bitmap.width;
	const originalHeight = bitmap.height;

	// Calculate scaling factors
	const scaleX = targetSize / originalWidth;
	const scaleY = targetSize / originalHeight;

	// Choose the smaller scale to maintain aspect ratio
	const scale = Math.min(scaleX, scaleY);

    const sw = originalWidth;
    const sh = originalHeight;
    const dw = sw * scale;
    const dh = sh * scale;
    const dx = x + this.padding
    const dy = y + this.padding
    const sx = 0;
    const sy = 0;
    this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, dw, dh);
};

Window_BattleStatus.prototype.maxCols = function() {
    return 6;
};

Window_BattleStatus.prototype.getPictureName = function(actor) {
    const dataActor = actor.actor() || {};
    const meta = dataActor.meta || {};
    return meta.picture;
};

Window_BattleStatus.prototype.loadFace = function(actor) {
    const pictureName = this.getPictureName(actor);
    let bitmap = null;
    if(pictureName) {
		bitmap = ImageManager.loadPicture(pictureName);
    }
    else {
        bitmap = ImageManager.loadFace(actor.faceName());
    }
    return bitmap;
};

Window_BattleStatus.prototype.preparePartyRefresh = function() {
    $gameTemp.clearBattleRefreshRequest();
    this._bitmapsReady = 0;
    for (const actor of $gameParty.members()) {
        const bitmap = this.loadFace(actor);
        bitmap.addLoadListener(this.performPartyRefresh.bind(this));
    }
};

DJ.BS.Window_BattleStatus_drawItemStatus = Window_BattleStatus.prototype.drawItemStatus;
Window_BattleStatus.prototype.drawItemStatus = function(index) {
    DJ.BS.Window_BattleStatus_drawItemStatus.call(this, index);
    const faceRect = this.faceRect(index);
    this.drawActorLevel(this.actor(index), faceRect.x + this.padding, faceRect.y + this.padding);
};

Window_BattleStatus.prototype.drawActorLevel = function(actor, x, y) {
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(TextManager.levelA, x, y - 16, 48);
    this.resetTextColor();
    this.drawText(actor.level, x + 36, y - 16, 36, "left");
};

// ***** Scene_Battle *****

Scene_Battle.prototype.statusWindowRect = function() {
    const extra = 40;
    const ww = Graphics.boxWidth - 192;
    const wh = this.windowAreaHeight() + extra;
    const wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;
    const wy = Graphics.boxHeight - wh - 4;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.windowAreaHeight = function() {
    return this.calcWindowHeight(7, true);
};

// ***** Sprite_Gauge *****
Sprite_Gauge.prototype.bitmapWidth = function() {
    return DJ.BS.params["gaugesWidth"];
};

_DJ_BattleStatus_Sprite_Gauge_gaugeColor1 = Sprite_Gauge.prototype.gaugeColor1;
Sprite_Gauge.prototype.gaugeColor1 = function() {
    switch (this._statusType) {
        case "hp":
            return DJ.BS.params["hpBarColor"];
        case "mp":
            return DJ.BS.params["mpBarColor"];
        case "tp":
            return DJ.BS.params["tpBarColor"];
        default:
            return _DJ_BattleStatus_Sprite_Gauge_gaugeColor1.call(this);
    }
};

_DJ_BattleStatus_Sprite_Gauge_gaugeColor2 = Sprite_Gauge.prototype.gaugeColor2;
Sprite_Gauge.prototype.gaugeColor2 = function() {
    switch (this._statusType) {
        case "hp":
            return DJ.BS.params["hpBarColor2"];
        case "mp":
            return DJ.BS.params["mpBarColor2"];
        case "tp":
            return DJ.BS.params["tpBarColor2"];
        default:
            return _DJ_BattleStatus_Sprite_Gauge_gaugeColor2.call(this);
    }
};