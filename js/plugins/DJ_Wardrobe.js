var Imported = Imported || {};
Imported.DJ_BattleStatus = true;

var DJ = DJ || {};          
DJ.WRDB = DJ.WRDB || {};     
DJ.WRDB.pluginName = 'DJ_Wardrobe';

/*:
 * @target MZ
 * @plugindesc Make it possible to access wardrobe system via plugin commands.
 * @author Dawid Jurago
 * 
 * @command wardrobeProcessing
 * @text Wardrobe Processing
 * @desc Launch wardrobe menu where actor can change equipment from available ones.
 *
 *  
 * @help
 * This plugin enables wardrobe access. More help later.
 *
 * Terms of Use: Commercial.
 *
 * Version: 0.1.0
 */

PluginManager.registerCommand(DJ.WRDB.pluginName, 'wardrobeProcessing', args => {
    SceneManager.push(Scene_Wardrobe);
    SceneManager.prepareNextScene($gameParty.leader())
});

// -----------------------------------------
// Scene_Wardrobe
// -----------------------------------------

function Scene_Wardrobe() {
    this.initialize(...arguments);
}

Scene_Wardrobe.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Wardrobe.prototype.constructor = Scene_Wardrobe;

Scene_Wardrobe.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Wardrobe.prototype.prepare = function(actor) {
    this._actor = actor;
};

Scene_Wardrobe.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createHelpWindow();
    this.createCommandWindow();
    this.createDummyWindow();
    this.createStatusWindow();
    this.createWardrobeWindow();
};

Scene_Wardrobe.prototype.createCommandWindow = function() {
    const rect = this.commandWindowRect();
    this._commandWindow = new Window_WardrobeCommand(rect);
    this._commandWindow.y = this.mainAreaTop();
    this._commandWindow.setHandler("wardrobe", this.commandWardrobe.bind(this));
    this._commandWindow.setHandler("cancel", this.popScene.bind(this));
    this.addWindow(this._commandWindow);
};

Scene_Wardrobe.prototype.commandWindowRect = function() {
    const wx = 0;
    const wy = this.mainAreaTop();
    const ww = Graphics.boxWidth;
    const wh = this.calcWindowHeight(1, true);
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Wardrobe.prototype.createDummyWindow = function() {
    const rect = this.dummyWindowRect();
    this._dummyWindow = new Window_Base(rect);
    this.addWindow(this._dummyWindow);
};

Scene_Wardrobe.prototype.dummyWindowRect = function() {
    const wx = 0;
    const wy = this._commandWindow.y + this._commandWindow.height;
    const ww = Graphics.boxWidth;
    const wh = this.mainAreaHeight() - this._commandWindow.height;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Wardrobe.prototype.createStatusWindow = function() {
    const rect = this.statusWindowRect();
    this._statusWindow = new Window_WardrobeStatus(rect);
    this._statusWindow.hide();
    this.addWindow(this._statusWindow);
};

Scene_Wardrobe.prototype.statusWindowRect = function() {
    const ww = this.statusWidth();
    const wh = this._dummyWindow.height;
    const wx = Graphics.boxWidth - ww;
    const wy = this._dummyWindow.y;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Wardrobe.prototype.createWardrobeWindow = function() {
    const rect = this.wardrobeWindowRect();
    this._mainWindow = new Window_WardrobeMain(rect);
    this._mainWindow.setupOutfits(this._actor);
    //this._mainWindow.setHelpWindow(this._helpWindow);
    //this._mainWindow.setStatusWindow(this._statusWindow);
    this._mainWindow.hide();
    this._mainWindow.setHandler("ok", this.onChangeOk.bind(this));
    this._mainWindow.setHandler("cancel", this.onChangeCancel.bind(this));
    this.addWindow(this._mainWindow);
};

Scene_Wardrobe.prototype.wardrobeWindowRect = function() {
    const wx = 0;
    const wy = this._dummyWindow.y;
    const ww = Graphics.boxWidth - this.statusWidth();
    const wh = this._dummyWindow.height;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Wardrobe.prototype.statusWidth = function() {
    return Graphics.boxWidth / 2;
};

Scene_Wardrobe.prototype.activateMainWindow = function() {
    this._mainWindow.show();
    this._mainWindow.activate();
    this._statusWindow.show();
};

Scene_Wardrobe.prototype.commandWardrobe = function() {
    this._dummyWindow.hide();
    this.activateMainWindow();
};

Scene_Wardrobe.prototype.onChangeOk = function() {
    this._mainWindow.hide();
};

Scene_Wardrobe.prototype.onChangeCancel = function() {
    this._commandWindow.activate();
    this._dummyWindow.show();
    this._mainWindow.hide();
    this._statusWindow.hide();
    this._helpWindow.clear();
};

// -----------------------------------------
// Window_WardrobeCommand
// -----------------------------------------

function Window_WardrobeCommand() {
    this.initialize(...arguments);
}

Window_WardrobeCommand.prototype = Object.create(Window_HorzCommand.prototype);
Window_WardrobeCommand.prototype.constructor = Window_WardrobeCommand;

Window_WardrobeCommand.prototype.initialize = function(rect) {
    Window_HorzCommand.prototype.initialize.call(this, rect);
};

Window_WardrobeCommand.prototype.maxCols = function() {
    return 2;
};

Window_WardrobeCommand.prototype.makeCommandList = function() {
    this.addCommand("Wardrobe", "wardrobe");
    this.addCommand(TextManager.cancel, "cancel");
};

// -----------------------------------------
// Window_WardrobeMain
// -----------------------------------------

function Window_WardrobeMain() {
    this.initialize(...arguments);
}

Window_WardrobeMain.prototype = Object.create(Window_Selectable.prototype);
Window_WardrobeMain.prototype.constructor = Window_WardrobeMain;

Window_WardrobeMain.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
};

Window_WardrobeMain.prototype.setupOutfits = function(actor) {
    //
};

// -----------------------------------------
// Window_WardrobeStatus
// -----------------------------------------

function Window_WardrobeStatus() {
    this.initialize(...arguments);
}

Window_WardrobeStatus.prototype = Object.create(Window_StatusBase.prototype);
Window_WardrobeStatus.prototype.constructor = Window_WardrobeStatus;

Window_WardrobeStatus.prototype.initialize = function(rect) {
    Window_StatusBase.prototype.initialize.call(this, rect);
};