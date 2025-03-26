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

// -------------------------------------------------------
// Window_BattleStatus
// -------------------------------------------------------

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

// -------------------------------------------------------
// Scene_Battle
// -------------------------------------------------------

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

// -------------------------------------------------------
// Sprite_Gauge
// -------------------------------------------------------

Sprite_Gauge.prototype.bitmapWidth = function() {
    return DJ.BS.params["gaugesWidth"];
};

DJ.BS.Sprite_Gauge_gaugeColor1 = Sprite_Gauge.prototype.gaugeColor1;
Sprite_Gauge.prototype.gaugeColor1 = function() {
    switch (this._statusType) {
        case "hp":
            return DJ.BS.params["hpBarColor"];
        case "mp":
            return DJ.BS.params["mpBarColor"];
        case "tp":
            return DJ.BS.params["tpBarColor"];
        default:
            return DJ.BS.Sprite_Gauge_gaugeColor1.call(this);
    }
};

DJ.BS.Sprite_Gauge_gaugeColor2 = Sprite_Gauge.prototype.gaugeColor2;
Sprite_Gauge.prototype.gaugeColor2 = function() {
    switch (this._statusType) {
        case "hp":
            return DJ.BS.params["hpBarColor2"];
        case "mp":
            return DJ.BS.params["mpBarColor2"];
        case "tp":
            return DJ.BS.params["tpBarColor2"];
        default:
            return DJ.BS.Sprite_Gauge_gaugeColor2.call(this);
    }
};

// -------------------------------------------------------
// Sprite_ClickableStateIcon
// -------------------------------------------------------

function Sprite_ClickableStateIcon() {
    this.initialize(...arguments);
}

Sprite_ClickableStateIcon.prototype = Object.create(Sprite_Clickable.prototype);
Sprite_ClickableStateIcon.prototype.constructor = Sprite_ClickableStateIcon;

Sprite_ClickableStateIcon.prototype.initialize = function() {
    Sprite_Clickable.prototype.initialize.call(this);
    this.initMembers();
    this.loadBitmap();
};

Sprite_ClickableStateIcon.prototype.initMembers = function() {
    this._battler = null;
    this._stateIndex = 0;
    this._iconIndex = 0;
    this._waitCounter = 0;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
};

Sprite_ClickableStateIcon.prototype.loadBitmap = function() {
    this.bitmap = ImageManager.loadSystem("IconSet");
    this.setFrame(0, 0, 0, 0);
};

Sprite_ClickableStateIcon.prototype.setup = function(battler, stateIndex) {
    if(this.battler !== battler) {
        this._battler = battler;
        this._stateIndex = stateIndex;
        this._waitCounter = this.refreshWait();
    }
};

Sprite_ClickableStateIcon.prototype.update = function() {
    Sprite_Clickable.prototype.update.call(this);
    this._waitCounter++;
    if(this.waitCounter >= this.refreshWait()) {
        this.updateIcon();
        this.updateFrame();
        this._waitCounter = 0;
    }
};

Sprite_ClickableStateIcon.prototype.refreshWait = function() {
    return 30;
};

Sprite_ClickableStateIcon.prototype.updateIcon = function() {
    const states = [];
    if(this.shouldDisplay()) {
        states.push(...this._battler.states());
    }
    if(this._stateIndex < states.length) {
        this._iconIndex = states[this._stateIndex].iconIndex;   
    }
    else {
        const buffIndex = this._stateIndex - states.length;
        const buffIcons = this._battler.buffIcons();
        if(buffIndex < buffIcons.length) {
            this._iconIndex = buffIcons[buffIndex];
        }
        else {
            this._iconIndex = 0;
            this._waitCounter = 0;
        }
    }
};

Sprite_ClickableStateIcon.prototype.shouldDisplay = function() {
    const battler = this._battler;
    return battler && (battler.isActor() || battler.isAlive());
};

Sprite_ClickableStateIcon.prototype.updateFrame = function() {
    const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    const sx = (this._iconIndex % 16) * pw;;
    const sy = Math.floor(this._iconIndex / 16) * ph;
    this.setFrame(sx, sy, pw, ph);
}

// -------------------------------------------------------
// Spriteset_ClickableStateIcons
// -------------------------------------------------------

function Spriteset_ClickableStateIcons() {
    this.initialize(...arguments);
}

Spriteset_ClickableStateIcons.prototype = Object.create(Sprite.prototype);
Spriteset_ClickableStateIcons.prototype.constructor = Spriteset_ClickableStateIcons;

Spriteset_ClickableStateIcons.prototype.initialize = function(iconsX, iconsY) {
    Sprite.prototype.initialize.call(this);
    this.createClickableStateIcons(iconsX, iconsY);
};

Spriteset_ClickableStateIcons.prototype.createClickableStateIcons = function(iconsX, iconsY) {
    this._clickableIcons = [];
    for(let y = 0; y < iconsY; ++y) {
        for(let x = 0; x < iconsX; ++x) {
            const iconSprite = new Sprite_ClickableStateIcon();
            iconSprite.x = x * ImageManager.iconWidth;
            iconSprite.y = y * ImageManager.iconHeight;
            this.addChild(iconSprite);
            this._clickableIcons.push(iconSprite);
        }
    }
};

Spriteset_ClickableStateIcons.prototype.setup = function (battler) {
    for(let i = 0; i < this._clickableIcons.length; ++i) {
        this.clickableIcons[i].setup(battler, i);
    }
}