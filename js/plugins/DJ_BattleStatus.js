function Window_DJBattleStatus() {
    this.initialize(...arguments);
};

Window_DJBattleStatus.prototype = Object.create(Window_StatusBase.prototype);
Window_DJBattleStatus.prototype.constructor = Window_DJBattleStatus;

Window_DJBattleStatus.prototype.initialize = function(rect) {
    Window_StatusBase.prototype.initialize.call(this, rect);
    this.frameVisible = false;
    this.openness = 255;
    this._bitmapsReady = 0;
    this.preparePartyRefresh();
};

Window_DJBattleStatus.prototype.loadFaceImages = function() {
    //Hide StatusBase function as we are loading pictures instead of faces.
};

Window_DJBattleStatus.prototype.drawActorFace = function(actor, x, y, width, height) {
    width = width || ImageManager.standardFaceWidth;
    height = height || ImageManager.standardFaceHeight;
    const bitmap = this.loadFace(actor);
    const pw = bitmap.width;
    const ph = bitmap.height;
    const sw = Math.min(width, pw);
    const sh = Math.min(height, ph);
    const dx = Math.floor(x + Math.max(width - pw, 0) / 2);
    const dy = Math.floor(y + Math.max(height - ph, 0) / 2);
    const sx = 0;
    const sy = 0;
    this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy);
};

Window_DJBattleStatus.prototype.extraHeight = function() {
    return 10;
};

Window_DJBattleStatus.prototype.maxCols = function() {
    return 4;
};

Window_DJBattleStatus.prototype.itemHeight = function() {
    return this.innerHeight;
};

Window_DJBattleStatus.prototype.maxItems = function() {
    return $gameParty.battleMembers().length;
};

Window_DJBattleStatus.prototype.rowSpacing = function() {
    return 0;
};

Window_DJBattleStatus.prototype.updatePadding = function() {
    this.padding = 8;
};

Window_DJBattleStatus.prototype.actor = function(index) {
    return $gameParty.battleMembers()[index];
};

Window_DJBattleStatus.prototype.selectActor = function(actor) {
    const members = $gameParty.battleMembers();
    this.select(members.indexOf(actor));
};

Window_DJBattleStatus.prototype.update = function() {
    Window_StatusBase.prototype.update.call(this);
    if ($gameTemp.isBattleRefreshRequested()) {
        this.preparePartyRefresh();
    }
};

Window_DJBattleStatus.prototype.getPictureName = function(actor) {
    const dataActor = actor.actor() || {};
    const meta = dataActor.meta || {};
    return meta.picture;
};

Window_DJBattleStatus.prototype.loadFace = function(actor) {
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

Window_DJBattleStatus.prototype.preparePartyRefresh = function() {
    $gameTemp.clearBattleRefreshRequest();
    this._bitmapsReady = 0;
    for (const actor of $gameParty.members()) {
        const bitmap = this.loadFace(actor);
        bitmap.addLoadListener(this.performPartyRefresh.bind(this));
    }
};

Window_DJBattleStatus.prototype.performPartyRefresh = function() {
    this._bitmapsReady++;
    if (this._bitmapsReady >= $gameParty.members().length) {
        this.refresh();
    }
};

Window_DJBattleStatus.prototype.drawItem = function(index) {
    this.drawItemImage(index);
    this.drawItemStatus(index);
};

Window_DJBattleStatus.prototype.drawItemImage = function(index) {
    const actor = this.actor(index);
    const rect = this.faceRect(index);
    this.drawActorFace(actor, rect.x, rect.y, rect.width, rect.height);
};

Window_DJBattleStatus.prototype.drawItemStatus = function(index) {
    const actor = this.actor(index);
    const rect = this.itemRectWithPadding(index);
    const nameX = this.nameX(rect);
    const nameY = this.nameY(rect);
    const stateIconX = this.stateIconX(rect);
    const stateIconY = this.stateIconY(rect);
    const basicGaugesX = this.basicGaugesX(rect);
    const basicGaugesY = this.basicGaugesY(rect);
    this.placeTimeGauge(actor, nameX, nameY);
    this.placeActorName(actor, nameX, nameY);
    this.placeStateIcon(actor, stateIconX, stateIconY);
    this.placeBasicGauges(actor, basicGaugesX, basicGaugesY);
};

Window_DJBattleStatus.prototype.faceRect = function(index) {
    const rect = this.itemRect(index);
    rect.pad(-1);
    rect.height = this.nameY(rect) + this.gaugeLineHeight() / 2 - rect.y;
    return rect;
};

Window_DJBattleStatus.prototype.nameX = function(rect) {
    return rect.x;
};

Window_DJBattleStatus.prototype.nameY = function(rect) {
    return this.basicGaugesY(rect) - this.gaugeLineHeight();
};

Window_DJBattleStatus.prototype.stateIconX = function(rect) {
    return rect.x + rect.width - ImageManager.standardIconWidth / 2 + 4;
};

Window_DJBattleStatus.prototype.stateIconY = function(rect) {
    return rect.y + ImageManager.standardIconHeight / 2 + 4;
};

Window_DJBattleStatus.prototype.basicGaugesX = function(rect) {
    return rect.x;
};

Window_DJBattleStatus.prototype.basicGaugesY = function(rect) {
    const bottom = rect.y + rect.height - this.extraHeight();
    const numGauges = $dataSystem.optDisplayTp ? 3 : 2;
    return bottom - this.gaugeLineHeight() * numGauges;
};

// ***** Scene_Battle *****
Scene_Battle.prototype.createStatusWindow = function() {
    const rect = this.statusWindowRect();
    const statusWindow = new Window_DJBattleStatus(rect);
    this.addWindow(statusWindow);
    this._statusWindow = statusWindow;
};