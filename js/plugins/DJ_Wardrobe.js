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
 * @command gainOutfit
 * @text Give Outfit to Actor
 * @desc Use this command to give an outfit to an actor. Actor will be able to access it using wardrobe. 
 * 
 * @arg actor
 * @text Actor gaining outfit
 * @desc Actor gaining outfit. Leave None for party leader.
 * @type actor
 * @default
 * 
 * @arg outfit
 * @text Outfit
 * @desc Outfit which will be gained by actor or party leader. 
 * 
 * @arg outfitName
 * @text Name
 * @desc Name of outfit
 * @parent outfit
 * @type string
 * @default Unnamed Outfit
 * 
 * @arg characterName
 * @text Character Name
 * @desc Name of file from img/characters without extension (Actor1 for img/characters/Actor1.png)
 * @parent outfit
 * @type string
 * @default Actor1
 * 
 * @arg characterIndex
 * @text Character Index
 * @desc Index of character to be used (one file contains 8 spritesets)
 * @parent outfit
 * @type string
 * @default 0
 * @max 7
 * @min 0
 * 
 * @arg faceName
 * @text Face Name
 * @desc Name of file from img/faces without extension (Actor1 for img/faces/Actor1.png)
 * @parent outfit
 * @type string
 * @default Actor1
 * 
 * @arg faceIndex
 * @text Face Index
 * @desc Index of face to be used (one file contains 8 faces)
 * @parent outfit
 * @type string
 * @default 0
 * @max 7
 * @min 0
 * 
 * @arg battlerName
 * @text Battler Name 
 * @desc Name of file from img/sv_actors without extension (Actor2_1 for img/sv_actors/Actor2_1.png)
 * @parent outfit
 * @type string
 * @default
 * 
 * @command equipOutfit
 * @text Equip Outfit
 * @desc Make actor equip an outfit
 * 
 * @arg actor
 * @text Actor
 * @desc actor that will equip outfit if it has one. Leave empty for party leader.
 * @type actor
 * @default
 * 
 * @arg outfitName
 * @text Outfit Name
 * @desc Name of the outfit to equip
 * @type string
 * @default
 * 
 * @command loseOutfit
 * @text Take away Outfit from Actor
 * @desc If actor has an outfit this command will take it away unless it is equipped.
 * 
 * @arg actor
 * @text Actor
 * @desc actor that will equip outfit if it has one. Leave empty for party leader.
 * @type actor
 * @default
 * 
 * @arg outfitName
 * @text Outfit Name
 * @desc Name of the outfit to equip
 * @type string
 * @default
 * 
 * @help
 * This plugin enables wardrobe access. Each actor now has a possibility of 
 * having 1 or more outfits. Outfit is collection of player character sprite,
 * face and battler. Each outfit has a name. Actor default outfit is what is 
 * set in the editor. Actor's outfits are saved in save files.
 * 
 * Wardrobe gives player an access to menu in which one can see available 
 * outfits and change them.
 * 
 * This plugin has 4 commands:
 * 1) Wardrobe processing:
 *    Displays a menu where player can change outfits.
 * 
 * 2) Give Outfit to Actor:
 *    Here the outfit is named and defined (sprites are selected) and given 
 *    to selected actor. Character sprite and Face are located on spritesheets
 *    and need index apart from file name. These indices are 0 based! from 
 *    top left to right bottom. Valid range is 0-7
 * 
 * 3) Take away Outfit from Actor:
 *    If outfit is not equipped it can be taken away using this command.
 * 
 * 4) Equip Outfit:
 *    Force actor to equip certain outfit if it has it available. 
 *
 * 
 * Terms of Use: Free
 *
 * Version: 1.0.0
 */

PluginManager.registerCommand(DJ.WRDB.pluginName, 'wardrobeProcessing', _ => {
    SceneManager.push(Scene_Wardrobe);
    SceneManager.prepareNextScene($gameParty.leader())
});

PluginManager.registerCommand(DJ.WRDB.pluginName, 'gainOutfit', args => {
    let actorId = Number(args.actor);
    if(!actorId) {
        const leader = $gameParty.leader();
        if(!leader) return;
        actorId = leader.actorId();
    }
    if(actorId) {
        const actor = $gameActors.actor(actorId);
        if(actor) {
            let outfit = new Game_Outfit();
            outfit.setName(args.outfitName);
            outfit.setCharacter(args.characterName, Number(args.characterIndex));
            outfit.setFace(args.faceName, Number(args.faceIndex));
            outfit.setBattler(args.battlerName);
            actor.gainOutfit(outfit)
        }
    }
});

PluginManager.registerCommand(DJ.WRDB.pluginName, 'equipOutfit', args => {
    let actorId = Number(args.actor);
    if(!actorId) {
        const leader = $gameParty.leader();
        if(!leader) return;
        actorId = leader.actorId();
    }
    if(actorId) {
        const actor = $gameActors.actor(actorId);
        if(actor) {
            actor.equipOutfit(args.outfitName);
        }
    }
});

PluginManager.registerCommand(DJ.WRDB.pluginName, 'loseOutfit', args => {
    let actorId = Number(args.actor);
    if(!actorId) {
        const leader = $gameParty.leader();
        if(!leader) return;
        actorId = leader.actorId();
    }
    if(actorId) {
        const actor = $gameActors.actor(actorId);
        if(actor) {
            actor.loseOutfit(args.outfitName);
        }
    }
});

// -----------------------------------------
// Game_Outfit
// -----------------------------------------

function Game_Outfit() {
    this.initialize(...arguments);
}

Game_Outfit.prototype.initialize = function() {
    this._name = "NoName";
    this._characterName = null;
    this._characterIndex = null;
    this._faceName = null;
    this._faceIndex = null;
    this._battlerName = null;
};

Game_Outfit.prototype.setName = function(name) {
    this._name = name;
};

Game_Outfit.prototype.name = function() {
    return this._name;
}

Game_Outfit.prototype.setCharacter = function(characterName, characterIndex) {
    this._characterName = characterName;
    this._characterIndex = characterIndex;
};

Game_Outfit.prototype.setFace = function(faceName, faceIndex) {
    this._faceName = faceName;
    this._faceIndex = faceIndex;
};

Game_Outfit.prototype.setBattler = function(battlerName) {
    this._battlerName = battlerName;
};

Game_Outfit.prototype.equipTo = function(actor) {
    actor.setCharacterImage(this._characterName, this._characterIndex);
    actor.setFaceImage(this._faceName, this._faceIndex);
    actor.setBattlerImage(this._battlerName);
    $gamePlayer.refresh();
};

// -----------------------------------------
// Game_Actor
// -----------------------------------------

DJ.WRDB.Game_Actor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
    DJ.WRDB.Game_Actor_initMembers.call(this);
    this._outfits = [];
    this._outfitIndex = -1;
};

DJ.WRDB.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    DJ.WRDB.Game_Actor_setup.call(this, actorId);
    this.initOutfits();
};

Game_Actor.prototype.initOutfits = function() {
    let outfit = new Game_Outfit();
    outfit.setName("Default");
    outfit.setCharacter(this._characterName, this._characterIndex);
    outfit.setFace(this._faceName, this._faceIndex);
    outfit.setBattler(this._battlerName);
    this._outfits.push(outfit);
    this._outfitIndex = 0;
};

Game_Actor.prototype.getOutfits = function() {
    return this._outfits.slice();
};

Game_Actor.prototype.getOutfitIndex = function() {
    return this._outfitIndex;
};

Game_Actor.prototype.gainOutfit = function(outfit) {
    this._outfits.push(outfit);
};

Game_Actor.prototype.loseOutfit = function(outfitName) {
    const index = this.findOutfitIndex(outfitName);
    if(index >= 0) {
        if(index === this._outfitIndex) return false;
        if(index < this._outfitIndex) this._outfitIndex--;
        this._outfits.splice(index, 1);
        return true;
    }
    return false;
};

Game_Actor.prototype.findOutfitIndex = function(outfitName) {
    let index = -1;
    for(outfit of this._outfits) {
        ++index;
        if(outfit.name() === outfitName) {
            break;
        }
    }
    return index;
};

Game_Actor.prototype.equipOutfit = function(outfitName) {
    const index = this.findOutfitIndex(outfitName);
    if(index === -1) return false;
    this._outfitIndex = index;
    const outfit = this._outfits[this._outfitIndex];
    outfit.equipTo(this);
    return true;
};

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
    this._mainWindow.setHelpWindow(this._helpWindow);
    this._mainWindow.setStatusWindow(this._statusWindow);
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
    return 216;
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
    this._commandWindow.activate();
    this._mainWindow.hide();
    this._statusWindow.hide();
    this._dummyWindow.show();
    this._helpWindow.clear();
    const outfit = this._mainWindow.outfit();
    this._actor.equipOutfit(outfit.name());
    this._mainWindow.setupOutfits(this._actor);
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
    this.setActorName(actor);
    this._outfits = actor.getOutfits();
    this._outfitIndex = actor.getOutfitIndex();
    this.refresh();
    this.select(this._outfitIndex);
};

Window_WardrobeMain.prototype.setActorName = function(actor) {
    this._actorName = "";
    if(actor) {
        this._actorName += actor.name();
        const actorNickname = actor.nickname();
        if(actorNickname) {
            this._actorName += " (" + actorNickname + ")";
        }
    }
}

Window_WardrobeMain.prototype.maxItems = function() {
    return this._outfits ? this._outfits.length : 1;
};

Window_WardrobeMain.prototype.outfit = function() {
    return this.outfitAt(this.index());
};

Window_WardrobeMain.prototype.outfitAt = function(index) {
    return this._outfits && index >= 0 ? this._outfits[index] : null;
};

Window_WardrobeMain.prototype.isEnabled = function(outfit) {
    return (
        outfit && outfit !== this.outfitAt(this._outfitIndex)
    );
};

Window_WardrobeMain.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this.outfitAt(this.index()));
};

Window_WardrobeMain.prototype.drawItem = function(index) {
    const outfit = this.outfitAt(index);
    const rect = this.itemLineRect(index);
    this.changePaintOpacity(this.isEnabled(outfit));
    this.drawOutfitName(outfit, rect.x, rect.y, rect.width);
    this.changePaintOpacity(true);
};

Window_WardrobeMain.prototype.drawOutfitName = function(outfit, x, y, width) {
    if(outfit) {
        this.resetTextColor();
        this.drawText(outfit.name(), x, y, width);
    }
};

Window_WardrobeMain.prototype.setStatusWindow = function(statusWindow) {
    this._statusWindow = statusWindow;
    this.callUpdateHelp();
};

Window_WardrobeMain.prototype.updateHelp = function() {
    this._helpWindow.setText(this._actorName)
    if(this._statusWindow) {
        this._statusWindow.setOutfit(this.outfit());
    }
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
    this._outfit = null;
    this.refresh();
};

Window_WardrobeStatus.prototype.refresh = function() {
    this.contents.clear();
    if(this._outfit) {
        this.drawFace(
            this._outfit._faceName,
            this._outfit._faceIndex,
            10,
            10
        );
        this.drawCharacter(
            this._outfit._characterName,
            this._outfit._characterIndex,
            ImageManager.standardFaceWidth + 20,
            ImageManager.standardFaceHeight + 10
        )
    }
}

Window_WardrobeStatus.prototype.setOutfit = function(outfit) {
    this._outfit = outfit;
    this.refresh();
};