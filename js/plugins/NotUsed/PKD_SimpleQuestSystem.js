/*
 * Copyright (c) 2022 Vladimir Skrypnikov (Pheonix KageDesu)
 * <http://kdworkshop.net/>
 *
* License: Creative Commons 4.0 Attribution, Share Alike, Non-Commercial
 */

/*:
 * @plugindesc (v.1.2.2)[BASIC] Simple quests system
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url http://kdworkshop.net/plugins/simple-quests-system
 *
 * 
 * @help
 * ---------------------------------------------------------------------------
 * This plugin add simple quest journal (similar to one in game TES Skyrim)
 * and quest tasks tracking system (on map)
 *
 * Script calls:
 * SQSM.OpenQuestJournal()

 * SQSM.AddQuest(ID)
 *      (all IDs should be in quotes "" )
 * SQSM.ShowDescriptionForQuest(ID, INDEX)
 *      (first quest description visible by default)
 * SQSM.ShowTaskForQuest(ID, INDEX)
 *      (first quest task visible by default)
 * SQSM.ShowAllTasksForQuest(ID)
 * SQSM.CompleteTaskForQuest(ID, INDEX)
 * SQSM.CompletQuest(ID)
 * SQSM.Reset(ID)
        (remove quest from Journal and reset quest progress)
 * 
 * SQSM.SetActiveQuest(ID, true \ false)
 *      activate \ deactivate quest tracking on map
 *
 * SQSM.isQuestComplete(ID) - return true if quest with ID is completed
 * SQSM.isQuestVisible(ID) - return true if quest with ID is added to journal
 * SQSM.isQuestActive(ID) - return true if quest with IDD is activated (tracked)
 *
 * SQSM.Reset(ID) - remove quest from Journal (and reset quest progress)
 *
 * Plugin not have plugin commands
 * 
 * Visual style can be customized via Plugin Parameters
 * Image files: img\pSQSystem
 * (don't forget to copy them in deployed project)
 * ---------------------------------------------------------------------------
 *
  * This is BASIC plugin version and have some restrictions: *    - You can set only ONE (active) quest to tracking on map *    - Only 4 (max) tasks per quest *    - Only 4 (max) descriptions per quest *    - NOT have quest difficulty level *    - NOT have journal notifications *    - NOT have new quest marks *  *  PRO version of plugin don't have this restrictions!
 * If you like my Plugins, want more and offten updates,
 * please support me on Patreon!
 * 
 * Patreon Page:
 *      https://www.patreon.com/KageDesu
 * YouTube Channel:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 * You can use this plugin in your game thanks to all my Patrons!
 *
 * Contains resources designed and drawn
 * by Ekaterina N. Stadnikova (MOSCOW RUSSIA)
 * https://stadnikova-ekaterina.itch.io/
 *
 * License: Creative Commons 4.0 Attribution, Share Alike, Non-Commercial
 * 

 * @param sqsQuests:structA
 * @text Quests
 * @type struct<Quest>[]
 * @default []
 * @desc Quests
 * 
 * @param sqsPointers:structA
 * @text Pointers
 * @type struct<Pointer>[]
 * @default []
 * @desc Pointers for quests
 * 
 * @param sqsQuestsCategories:structA
 * @text Categories
 * @type struct<CategoryButton>[]
 * @default ["{\"position:struct\":\"{\\\"x\\\":\\\"250\\\",\\\"y\\\":\\\"Graphics.height - 56\\\"}\",\"categoryId\":\"\",\"buttonImage:struct\":\"{\\\"main\\\":\\\"Cat_All_00\\\",\\\"hover\\\":\\\"Cat_All_01\\\",\\\"disabled\\\":\\\"Cat_All_03\\\"}\"}","{\"position:struct\":\"{\\\"x\\\":\\\"370\\\",\\\"y\\\":\\\"Graphics.height - 56\\\"}\",\"categoryId\":\"Main\",\"buttonImage:struct\":\"{\\\"main\\\":\\\"Cat_Main_00\\\",\\\"hover\\\":\\\"Cat_Main_01\\\",\\\"disabled\\\":\\\"Cat_Main_03\\\"}\"}","{\"position:struct\":\"{\\\"x\\\":\\\"510\\\",\\\"y\\\":\\\"Graphics.height - 56\\\"}\",\"categoryId\":\"Side\",\"buttonImage:struct\":\"{\\\"main\\\":\\\"Cat_Side_00\\\",\\\"hover\\\":\\\"Cat_Side_01\\\",\\\"disabled\\\":\\\"Cat_Side_03\\\"}\"}","{\"position:struct\":\"{\\\"x\\\":\\\"630\\\",\\\"y\\\":\\\"Graphics.height - 56\\\"}\",\"categoryId\":\"Other\",\"buttonImage:struct\":\"{\\\"main\\\":\\\"Cat_Other_00\\\",\\\"hover\\\":\\\"Cat_Other_01\\\",\\\"disabled\\\":\\\"Cat_Other_03\\\"}\"}"]
 * @desc [PRO] Categories for quests
 * 
 * @param isNeedMenuCommand:b
 * @type boolean
 * @text Command in menu?
 * @on Show
 * @off No
 * @default true
 * @desc Show open quests journal command in game menu?
 * 
 * @param isSortByNew:b
 * @type boolean
 * @text New quests first
 * @on Yes
 * @off No
 * @default false
 * @desc If true - new quests always will be at the top of the list
 * 
 * @param isSortByActive:b
 * @type boolean
 * @text Active quests first
 * @on Yes
 * @off No
 * @default false
 * @desc If true - active quests always will be at the top of the list
 * 
 * @param buttonForOpenJournal
 * @type text
 * @text Open Journal Button
 * @default j
 * @desc Button for open Quest Journal (on Map)
 * 
 * @param menuCommandText
 * @parent isNeedMenuCommand:b
 * @text Command title
 * @default Quests
 * @desc Title for open quests journal menu command
 * 
 * @param spacer|visualSettings @text‏‏‎ ‎@desc ===============================================
 * 
 * @param visualSettings
 * @text Visual Settings
 * 
 * @param questJournalBackground:struct
 * @parent visualSettings
 * @type struct<XY2>
 * @text Background Position
 * @default {"x":"(Graphics.width / 2) - 408","y":"(Graphics.height / 2) - 312"}
 * @desc Journal background image (JournalBackground.png) position
 * 
 * @param questJournalLine:struct
 * @parent visualSettings
 * @type struct<XY2>
 * @text Separate Line Position
 * @default {"x":"234","y":"140"}
 * @desc Separate line (Line.png) between quests lists and description position
 * 
 * @param questsListSettings:struct
 * @parent visualSettings
 * @text Quests List
 * @type struct<QuestsList>
 * @desc Quests List visual settings
 * @default {"position:struct":"{\"x\":\"20\",\"y\":\"176\"}","height:int":"360","textLine:struct":"{\"lineSize:struct\":\"{\\\"w\\\":\\\"200\\\",\\\"h\\\":\\\"36\\\"}\",\"face:str\":\"\",\"size:int\":\"20\"}"}
 * 
 * @param questsListCursor:struct
 * @parent questsListSettings:struct
 * @type struct<XY2>
 * @text Cursor Margins
 * @default {"x":"186","y":"18"}
 * @desc Cursor (Quest_Selected.png) margins relative list item
 * 
 * @param questsListActive:struct
 * @parent questsListSettings:struct
 * @type struct<XY2>
 * @text Active Icon Margins
 * @default {"x":"186","y":"18"}
 * @desc Active quest icon (Quest_Active.png) margins relative list item
 * 
 * @param questsListNewMark:struct
 * @parent questsListSettings:struct
 * @type struct<XY2>
 * @text New Quest Mark Margins
 * @default {"x":"2","y":"0"}
 * @desc [PRO] New quest mark (Quest_New.png) margins relative list item
 * 
 * @param questHeaderSettings:struct
 * @text Name Settings
 * @parent visualSettings
 * @type struct<QuestHeader>
 * @desc Quest Header (name) text settings
 * @default {"position:struct":"{\"x\":\"386\",\"y\":\"100\"}","position2:struct":"{\"x\":\"250\",\"y\":\"80\"}","textLine:struct":"{\"lineSize:struct\":\"{\\\"w\\\":\\\"256\\\",\\\"h\\\":\\\"84\\\"}\",\"face:str\":\"\",\"size:int\":\"20\"}"}
 * 
 * @param questDescSettings:struct
 * @text Description Settings
 * @parent visualSettings
 * @type struct<QuestDesc>
 * @desc Quest Description text settings
 * @default {"position:struct":"{\"x\":\"270\",\"y\":\"160\"}","textLine:struct":"{\"lineSize:struct\":\"{\\\"w\\\":\\\"460\\\",\\\"h\\\":\\\"140\\\"}\",\"face:str\":\"\",\"size:int\":\"14\"}"}
 * 
 * @param questTaskHeaderSettings:struct
 * @parent visualSettings
 * @type struct<XY2>
 * @text Tasks Header
 * @default {"x":"230","y":"300"}
 * @desc Tasks header image position (tasksHeader.png)
 * 
 * @param questGroupButtonA:struct
 * @parent visualSettings
 * @type struct<XY2>
 * @text Button Group A
 * @default {"x":"30","y":"80"}
 * @desc Currents quests group button position
 * 
 * @param questGroupButtonB:struct
 * @parent visualSettings
 * @type struct<XY2>
 * @text Button Group B
 * @default {"x":"140","y":"80"}
 * @desc Completed quests group button position
 * 
 * @param questsTasksSettings:struct
 * @parent visualSettings
 * @type struct<QuestTask>
 * @text Tasks texts settings
 * @default {"positions:structA":"[\"{\\\"x\\\":\\\"270\\\",\\\"y\\\":\\\"340\\\"}\",\"{\\\"x\\\":\\\"270\\\",\\\"y\\\":\\\"370\\\"}\",\"{\\\"x\\\":\\\"270\\\",\\\"y\\\":\\\"400\\\"}\",\"{\\\"x\\\":\\\"270\\\",\\\"y\\\":\\\"430\\\"}\",\"{\\\"x\\\":\\\"270\\\",\\\"y\\\":\\\"460\\\"}\",\"{\\\"x\\\":\\\"270\\\",\\\"y\\\":\\\"490\\\"}\",\"{\\\"x\\\":\\\"270\\\",\\\"y\\\":\\\"520\\\"}\",\"{\\\"x\\\":\\\"270\\\",\\\"y\\\":\\\"550\\\"}\"]","position:struct":"{\"x\":\"-24\",\"y\":\"4\"}","textLine:struct":"{\"lineSize:struct\":\"{\\\"w\\\":\\\"420\\\",\\\"h\\\":\\\"60\\\"}\",\"face:str\":\"\",\"size:int\":\"20\"}"}
 * @desc Quest tasks texts settings
 * 
 * @param questJournalActiveHelp:struct
 * @parent visualSettings
 * @type struct<XY2>
 * @text Activate help
 * @default {"x":"36","y":"Graphics.height - 56"}
 * @desc Set active quest help image (ActiveHelp.png) position
 * 
 * @param visualPointers:structA
 * @parent visualSettings
 * @type struct<VPointer>[]
 * @text Map Pointers
 * @default ["{\"image\":\"QuestArrow_A\",\"color:color\":\"#bfcc2f\"}","{\"image\":\"QuestArrow_A\",\"color:color\":\"#277fc2\"}","{\"image\":\"QuestArrow_A\",\"color:color\":\"#c7205d\"}"]
 * @desc Pointers for each active quest. (Pro only) -> pointers Count = Max. active quests
 * 
 * @param journalNotifyPosition:struct
 * @parent visualSettings
 * @type struct<XY2>
 * @text Notify settings
 * @default {"x":"Graphics.width / 2 - 200","y":"32"}
 * @desc Notify image (questJournalUpdated.png) position on screen
 * 
 * @param questDifficultyPosition:struct
 * @parent visualSettings
 * @type struct<XY2>
 * @text Difficulty settings
 * @default {"x":"Graphics.width - 104","y":"85"}
 * @desc [PRO] Active quest difficulty image (questDiff_X.png) position
 * 
 * 
 * 


 * 


 */
/*~struct~Quest:
 * @param id
 * @text ID
 * @default myQuest
 * @desc Unique ID for quest
  
 * @param title
 * @text Name
 * @default New Quest
 * @desc Full quest name for description

 * @param titleForList
 * @text Name for list
 * @default New Quest
 * @desc Quest name for quests list

 * @param titleImage
 * @text Title image
 * @type file
 * @dir img/pSQSystem 
 * @default questTitle
 * @require 1
 * @desc Title image for quest name (in description)

 * @param tasks:strA
 * @text Tasks
 * @type text[]
 * @default ["First task"]
 * @desc Tasks list for quest (should be at least one task)

 * @param descriptions:strA
 * @text Descriptions
 * @type note[]
 * @default ["This is example quest"]
 * @desc Descriptions list for quest (should be at least one)
 *
 * @param priority:int
 * @text Priority
 * @type number
 * @default 0
 * @desc Quest priority in list. More priority value -> more upper in quests list
 
 * @param difficulty:int
 * @text Difficulty
 * @type number
 * @default 0
 * @min 0
 * @desc [PRO] 0 - no difficulty. Value from 1 to X will show difficulty (questDiff_X image from img/pSQSSystem)

 * @param categoryId
 * @text Category ID
 * @default
 * @desc Quest category ID
*/

/*~struct~Pointer:
 * @param questId
 * @text Quest ID
 * @default myQuest
 * @desc Quest ID (for which the Pointer is)

 * @param pointsData:structA
 * @text Tasks Pointers
 * @type struct<TaskPointer>[]
 * @default []
 * @desc Pointers for each quest task (optional per task)
*/

/*~struct~TaskPointer:
* @param taskIndex:int
* @text Task Index
* @type number
* @default 1
* @min 1
* @desc Quest task index (for wich current Pointer is)

* @param points:structA
* @text Map Points
* @type struct<MapPoint>[]
* @default []
* @desc What event should the pointer point for this task on a certain map?
*/

/*~struct~MapPoint:
* @param mapId:int
* @text Map ID
* @type number
* @default 1
* @min 1

* @param evId:int
* @text Event ID
* @type number
* @default 1
* @min 1
* @desc Task goal event on this map
*/

/*~struct~QuestsList:
* @param position:struct
* @type struct<XY2>
* @text Position
* @default {"x":"20","y":"120"}
* @desc Quests list position

* @param height:int
* @text List height
* @type number
* @default 360
* @min 40
* @desc Quests list height in pixels (Width settings see in List Item settings)

* @param textLine:struct
* @type struct<TextLine>
* @text List Item
* @default {"lineSize:struct":"{\"w\":\"200\",\"h\":\"36\"}","face:str":"","size:int":"20"}
* @desc List item (quest name in list) settings
*/

/*~struct~QuestHeader:
* @param position:struct
* @type struct<XY2>
* @text Text Position
* @default {"x":"356","y":"100"}
* @desc Quest Name Position

* @param position2:struct
* @type struct<XY2>
* @text Image Position
* @default {"x":"220","y":"80"}
* @desc Quest title image position

* @param textLine:struct
* @type struct<TextLine>
* @text Text Settings
* @default {"lineSize:struct":"{\"w\":\"256\",\"h\":\"80\"}","face:str":"","size:int":"20"}
* @desc Quest Name text box settings
*/

/*~struct~QuestDesc:
* @param position:struct
* @type struct<XY2>
* @text Text Position
* @default {"x":"240","y":"160"}
* @desc Quest Description Position

* @param textLine:struct
* @type struct<TextLine>
* @text Text Settings
* @default {"lineSize:struct":"{\"w\":\"460\",\"h\":\"140\"}","face:str":"","size:int":"14"}
* @desc Quest Description text box settings
*/

/*~struct~QuestTask:
* @param positions:structA
* @type struct<XY2>[]
* @text Positions
* @default []
* @desc Positions for each task

* @param position:struct
* @type struct<XY2>
* @text Status Icon
* @default {"x":"-22","y":"4"}
* @desc Task status icon position (relative task text)

* @param textLine:struct
* @type struct<TextLine>
* @text Text Settings
* @default {"lineSize:struct":"{\"w\":\"420\",\"h\":\"60\"}","face:str":"","size:int":"20"}
* @desc Task text box settings
*/

/*~struct~TextLine:
* @param lineSize:struct
* @type struct<WH2>
* @text Line Size
* @default {"w":"200","h":"36"}
* @desc Text block size (width and height)

* @param face:str
* @text Font Face
* @default
* @desc Font face from fonts folder (your game should support custom fonts)
*
* @param size:int
* @text Font Size
* @type number
* @default 24
* @min 1
*/

/*~struct~CategoryButton:
* @param position:struct
* @type struct<XY2>
* @text Position
* @default {"x":"0","y":"0"}
* @desc Category button positon

* @param categoryId
* @text Category ID
* @default 
* @desc Category ID for show only quests with same Category ID (empty - all quests)

* @param buttonImage:struct
* @text Image Name
* @type struct<ButtonStates>
* @default {"main":"","hover":"","disabled":""}
* @desc [Required] Images for category button
*/

/*~struct~ButtonStates:
 * @param main
 * @text Main
 * @default
 * @desc Button image
 * @type file
 * @dir img/pSQSystem 
 * @require 1

 * @param hover
 * @text Hovered
 * @default
 * @desc Button image when hovered by cursor
 * @type file
 * @dir img/pSQSystem 
 * @require 1

 * @param disabled
 * @text Selected
 * @default
 * @desc Button image when selected
 * @type file
 * @dir img/pSQSystem 
 * @require 1
*/

 
/*~struct~XY2:
 * @param x
 * @text X
 * @type text
 * @default 0
 * @desc Number or script (example: Graphics.width / 2)
 *
 * @param y
 * @text Y
 * @type text
 * @default 0
 * @desc Number or script (example: $gameVariables.value(12) * 2)
 */

/*~struct~WH2:
 * @param w
 * @text W
 * @type text
 * @default 0
 * @desc Number or script (example: Graphics.width / 2)
 *
 * @param h
 * @text H
 * @type text
 * @default 0
 * @desc Number or script (example: $gameVariables.value(12) * 2)
 */

/*~struct~VPointer:
 * @param image
 * @text Image
 * @default QuestArrow_A
 * @desc Pointer arrow image
 * @type file
 * @dir img/pSQSystem 
 * @require 1
  
 * @param color:color
 * @text Color
 * @default #FFFFFF
 * @desc Arrow blend color (optional) in HEX
*/

// * MAIN

var Imported = Imported || {};
Imported.PKD_SQS = true;

var PKD_SQS = {};
PKD_SQS.version = 122;

PKD_SQS.link = function (library) {
    this[library.name] = library;
};

// * For parameters
PKD_SQS.PP = {};

window.SQOpenQuestJournal = function() {
    try {
        window.SQSM.OpenQuestJournal();
    } catch (e) {
        console.warn(e);
    }
};

// Generated by CoffeeScript 2.5.1
// ==========================================================================
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ KDCore.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
// * LIBRARY WITH MZ AND MZ SUPPORT
//! {OUTER FILE}

//?rev 10.06.21
var KDCore;

KDCore = KDCore || {};

// * Двузначные числа нельзя в версии, сравнение идёт по первой цифре поулчается
KDCore._fileVersion = '2.5.1';

if ((KDCore.Version != null) && KDCore.Version > KDCore._fileVersion) {
  // * ПРОПУСКАЕМ ЗАГРУЗКУ, так как уже загруженна более новая
  console.log('XDev KDCore ' + KDCore._fileVersion + ' skipped by new version');
} else {
  KDCore.Version = KDCore._fileVersion;
  KDCore.LIBS = KDCore.LIBS || {};
  KDCore.register = function(library) {
    return this.LIBS[library.name] = library;
  };
  window.KDCore = KDCore;
  console.warn("XDev KDCore is loaded " + KDCore.Version);
  (function() {
    var BitmapSrc, Color, DevLog, Point, SDK, __TMP_LOGS__, ___Sprite_alias_Move_KDCORE_2, __alias_Bitmap_blt_kdCore, __alias_Bitmap_fillAll, i, l, m, o;
    // * Array Extension
    //------------------------------------------------------------------------------
    Array.prototype.delete = function() {
      var L, a, ax, what;
      what = void 0;
      a = arguments;
      L = a.length;
      ax = void 0;
      while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
          this.splice(ax, 1);
        }
      }
      return this;
    };
    Array.prototype.max = function() {
      return Math.max.apply(null, this);
    };
    Array.prototype.min = function() {
      return Math.min.apply(null, this);
    };
    Array.prototype.sample = function() {
      if (this.length === 0) {
        return [];
      }
      return this[SDK.rand(0, this.length - 1)];
    };
    Array.prototype.first = function() {
      return this[0];
    };
    Array.prototype.last = function() {
      return this[this.length - 1];
    };
    Array.prototype.shuffle = function() {
      var k, n, v;
      n = this.length;
      while (n > 1) {
        n--;
        k = SDK.rand(0, n + 1);
        v = this[k];
        this[k] = this[n];
        this[n] = v;
      }
    };
    Array.prototype.count = function() {
      return this.length;
    };
    Array.prototype.isEmpty = function() {
      return this.length === 0;
    };
    // * Number Extension
    //------------------------------------------------------------------------------
    Number.prototype.do = function(method) {
      return SDK.times(this, method);
    };
    Number.prototype.clamp = function(min, max) {
      return Math.min(Math.max(this, min), max);
    };
    Number.prototype.any = function(number) {
      return (number != null) && number > 0;
    };
    // * String Extension
    //------------------------------------------------------------------------------
    String.prototype.toCss = function() {
      return KDCore.Color.FromHex(this).CSS;
    };
    String.prototype.toCSS = function() {
      return this.toCss();
    };
    String.prototype.isEmpty = function() {
      return this.length === 0 || !this.trim();
    };
    String.isNullOrEmpty = function(str) {
      return (str == null) || str.isEmpty();
    };
    String.any = function(str) {
      return !String.isNullOrEmpty(str);
    };
    String.prototype.replaceAll = function(search, replacement) {
      var target;
      target = this;
      return target.split(search).join(replacement);
    };
    // * Sprite Extension
    //------------------------------------------------------------------------------
    Sprite.prototype.moveToCenter = function(dx = 0, dy = 0) {
      return this.move(-this.bitmap.width / 2 + dx, -this.bitmap.height / 2 + dy);
    };
    Sprite.prototype.setStaticAnchor = function(floatX = 1, floatY = 1) {
      this.x -= Math.round(this.width * floatX);
      this.y -= Math.round(this.height * floatY);
    };
    Sprite.prototype.moveToParentCenter = function() {
      if (!this.parent) {
        return;
      }
      return this.move(this.parent.width / 2, this.parent.height / 2);
    };
    ___Sprite_alias_Move_KDCORE_2 = Sprite.prototype.move;
    Sprite.prototype.move = function(x, y) {
      if (x instanceof Array) {
        return ___Sprite_alias_Move_KDCORE_2.call(this, x[0], x[1]);
      } else if (x instanceof KDCore.Point || ((x != null ? x.x : void 0) != null)) {
        return ___Sprite_alias_Move_KDCORE_2.call(this, x.x, x.y);
      } else if ((x != null) && (x._x != null)) {
        return ___Sprite_alias_Move_KDCORE_2.call(this, x._x, x._y);
      } else {
        return ___Sprite_alias_Move_KDCORE_2.call(this, x, y);
      }
    };
    Sprite.prototype.isContainsPoint = function(point) {
      var rect, rx, ry;
      if (this.width === 0 || this.height === 0) {
        return false;
      }
      rx = KDCore.SDK.toGlobalCoord(this, 'x');
      ry = KDCore.SDK.toGlobalCoord(this, 'y');
      rect = this._getProperFullRect(rx, ry);
      return rect.contains(point.x, point.y);
    };
    // * Возвращает Rect с учётом Scale и Anchor спрайта
    Sprite.prototype._getProperFullRect = function(rx, ry) {
      var height, width, x, y;
      width = this.width * Math.abs(this.scale.x);
      height = this.height * Math.abs(this.scale.y);
      x = rx - this.anchor.x * width;
      y = ry - this.anchor.y * height;
      if (this.anchor.x === 0 && this.scale.x < 0) {
        x += this.width * this.scale.x;
      }
      if (this.anchor.y === 0 && this.scale.y < 0) {
        y += this.height * this.scale.y;
      }
      return new PIXI.Rectangle(x, y, width, height);
    };
    Sprite.prototype.fillAll = function(color) {
      if (color != null) {
        return this.bitmap.fillAll(color);
      } else {
        return this.fillAll(KDCore.Color.WHITE);
      }
    };
    Sprite.prototype.removeFromParent = function() {
      if (this.parent != null) {
        return this.parent.removeChild(this);
      }
    };
    // * Bitmap Extension
    //------------------------------------------------------------------------------
    __alias_Bitmap_fillAll = Bitmap.prototype.fillAll;
    Bitmap.prototype.fillAll = function(color) {
      if (color instanceof KDCore.Color) {
        return this.fillRect(0, 0, this.width, this.height, color.CSS);
      } else {
        return __alias_Bitmap_fillAll.call(this, color);
      }
    };
    __alias_Bitmap_blt_kdCore = Bitmap.prototype.blt;
    Bitmap.prototype.blt = function(source, sx, sy, sw, sh, dx, dy, dw, dh) {
      if (this._needModBltDWH > 0) {
        dh = dw = this._needModBltDWH;
        __alias_Bitmap_blt_kdCore.call(this, source, sx, sy, sw, sh, dx, dy, dw, dh);
        this._needModBltDWH = null;
      } else {
        __alias_Bitmap_blt_kdCore.call(this, ...arguments);
      }
    };
    Bitmap.prototype.drawIcon = function(x, y, icon, size = 32) {
      var bitmap;
      bitmap = null;
      if (icon instanceof Bitmap) {
        bitmap = icon;
      } else {
        bitmap = BitmapSrc.LoadFromIconIndex(icon).bitmap;
      }
      return this.drawOnMe(bitmap, x, y, size, size);
    };
    Bitmap.prototype.drawOnMe = function(bitmap, x = 0, y = 0, sw = 0, sh = 0) {
      if (sw <= 0) {
        sw = bitmap.width;
      }
      if (sh <= 0) {
        sh = bitmap.height;
      }
      this.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, sw, sh);
    };
    Bitmap.prototype.drawInMe = function(bitmap) {
      return Bitmap.prototype.drawOnMe(bitmap, 0, 0, this.width, this.height);
    };
    Bitmap.prototype.drawTextFull = function(text, position = 'center') {
      return this.drawText(text, 0, 0, this.width, this.height, position);
    };
    // * Input Extension
    //------------------------------------------------------------------------------

    //TODO: Gamepad support
    Input.KeyMapperPKD = {};
//Numbers
    for (i = l = 48; l <= 57; i = ++l) {
      Input.KeyMapperPKD[i] = String.fromCharCode(i);
    }
//Letters Upper
    for (i = m = 65; m <= 90; i = ++m) {
      Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
    }
//Letters Lower (for key code events)
    for (i = o = 97; o <= 122; i = ++o) {
      Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
    }
    (function() {
      var _input_onKeyDown, _input_onKeyUp;
      
      //@[ALIAS]
      _input_onKeyDown = Input._onKeyDown;
      Input._onKeyDown = function(event) {
        _input_onKeyDown.call(this, event);
        if (Input.keyMapper[event.keyCode]) {
          return;
        }
        Input._setStateWithMapperPKD(event.keyCode);
      };
      //@[ALIAS]
      _input_onKeyUp = Input._onKeyUp;
      Input._onKeyUp = function(event) {
        _input_onKeyUp.call(this, event);
        if (Input.keyMapper[event.keyCode]) {
          return;
        }
        Input._setStateWithMapperPKD(event.keyCode, false);
      };
      //?NEW
      Input._setStateWithMapperPKD = function(keyCode, state = true) {
        var symbol;
        symbol = Input.KeyMapperPKD[keyCode];
        if (symbol != null) {
          return this._currentState[symbol] = state;
        }
      };
      //?NEW
      Input.isCancel = function() {
        return Input.isTriggered('cancel') || TouchInput.isCancelled();
      };
      //?NEW
      TouchInput.toPoint = function() {
        return new KDCore.Point(TouchInput.x, TouchInput.y);
      };
    })();
    // * Window_Base Extension
    //------------------------------------------------------------------------------
    Window_Base.prototype.drawFaceWithCustomSize = function(faceName, faceIndex, x, y, finalSize) {
      this.contents._needModBltDWH = finalSize;
      this.drawFace(faceName, faceIndex, x, y);
    };
    // * SDK
    //------------------------------------------------------------------------------
    SDK = function() {
      throw new Error('This is a static class');
    };
    SDK.rand = function(min, max) {
      return Math.round(Math.random() * (max - min)) + min;
    };
    SDK.setConstantToObject = function(object, constantName, constantValue) {
      object[constantName] = constantValue;
      if (typeof object[constantName] === 'object') {
        Object.freeze(object[constantName]);
      }
      Object.defineProperty(object, constantName, {
        writable: false
      });
    };
    SDK.convertBitmapToBase64Data = function(bitmap) {
      return bitmap._canvas.toDataURL('image/png');
    };
    SDK.times = function(times, method) {
      var results;
      i = 0;
      results = [];
      while (i < times) {
        method(i);
        results.push(i++);
      }
      return results;
    };
    SDK.toGlobalCoord = function(layer, coordSymbol = 'x') {
      var node, t;
      t = layer[coordSymbol];
      node = layer;
      while (node) {
        t -= node[coordSymbol];
        node = node.parent;
      }
      return (t * -1) + layer[coordSymbol];
    };
    SDK.canvasToLocalX = function(layer, x) {
      while (layer) {
        x -= layer.x;
        layer = layer.parent;
      }
      return x;
    };
    SDK.canvasToLocalY = function(layer, y) {
      while (layer) {
        y -= layer.y;
        layer = layer.parent;
      }
      return y;
    };
    SDK.isInt = function(n) {
      return Number(n) === n && n % 1 === 0;
    };
    SDK.isFloat = function(n) {
      return Number(n) === n && n % 1 !== 0;
    };
    SDK.checkSwitch = function(switchValue) {
      if (switchValue === 'A' || switchValue === 'B' || switchValue === 'C' || switchValue === 'D') {
        return true;
      }
      return false;
    };
    SDK.toNumber = function(string, none = 0) {
      var number;
      if (string == null) {
        return none;
      }
      number = Number(string);
      if (isNaN(number)) {
        return none;
      }
      return number;
    };
    // * Color
    //------------------------------------------------------------------------------
    Color = class Color {
      constructor(r1 = 255, g1 = 255, b1 = 255, a1 = 255) {
        this.r = r1;
        this.g = g1;
        this.b = b1;
        this.a = a1;
      }

      getLightestColor(lightLevel) {
        var bf, newColor, p;
        bf = 0.3 * this.R + 0.59 * this.G + 0.11 * this.B;
        p = 0;
        newColor = [0, 0, 0, 0];
        if (bf - lightLevel >= 0) {
          if (bf >= 0) {
            p = Math.abs(bf - lightLevel) / lightLevel;
          }
          newColor = this.ARR.map(function(c) {
            return c - (p * c);
          });
        } else {
          if (bf >= 0) {
            p = (lightLevel - bf) / (255 - bf);
          }
          newColor = this.ARR.map(function(c) {
            return [(255 - c) * p + c, 255].min();
          });
        }
        return new Color(newColor[0], newColor[1], newColor[2], newColor[3]);
      }

      clone() {
        return this.reAlpha(this.a);
      }

      reAlpha(newAlpha) {
        return new Color(this.r, this.g, this.b, newAlpha || 255);
      }

      static AddConstantColor(name, color) {
        color.toHex();
        color.toArray();
        color.toCSS();
        SDK.setConstantToObject(Color, name, color);
      }

      toHex() {
        var b, g, r;
        if (this._colorHex != null) {
          return this._colorHex;
        }
        r = Math.floor(this.r).toString(16).padZero(2);
        g = Math.floor(this.g).toString(16).padZero(2);
        b = Math.floor(this.b).toString(16).padZero(2);
        return this._colorHex = '#' + r + g + b;
      }

      toArray() {
        if (this._colorArray != null) {
          return this._colorArray;
        }
        return this._colorArray = [this.r, this.g, this.b, this.a];
      }

      toCSS() {
        var na, nb, ng, nr;
        if (this._colorCss != null) {
          return this._colorCss;
        }
        nr = Math.round(this.r);
        ng = Math.round(this.g);
        nb = Math.round(this.b);
        na = this.a / 255;
        return this._colorCss = `rgba(${nr},${ng},${nb},${na})`;
      }

      toNumber() {
        return Number(this.toHex().replace("#", "0x"));
      }

      static Random() {
        var a, b, c;
        a = SDK.rand(1, 254);
        b = SDK.rand(1, 254);
        c = SDK.rand(1, 254);
        return new Color(a, b, c, 255);
      }

      static FromHex(hexString) {
        var color, result;
        result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexString);
        color = null;
        if (result != null) {
          color = {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
          };
        }
        if (color != null) {
          return new Color(color.r, color.g, color.b, 255);
        } else {
          return Color.NONE;
        }
      }

    };
    Object.defineProperties(Color.prototype, {
      R: {
        get: function() {
          return this.r;
        },
        configurable: true
      },
      G: {
        get: function() {
          return this.g;
        },
        configurable: true
      },
      B: {
        get: function() {
          return this.b;
        },
        configurable: true
      },
      A: {
        get: function() {
          return this.a;
        },
        configurable: true
      },
      ARR: {
        get: function() {
          return this.toArray();
        },
        configurable: true
      },
      CSS: {
        get: function() {
          return this.toCSS();
        },
        configurable: true
      },
      HEX: {
        get: function() {
          return this.toHex();
        },
        configurable: true
      },
      OX: {
        get: function() {
          return this.toNumber();
        },
        configurable: true
      }
    });
    Color.AddConstantColor('NONE', new Color(0, 0, 0, 0));
    Color.AddConstantColor('BLACK', new Color(0, 0, 0, 255));
    Color.AddConstantColor('WHITE', new Color(255, 255, 255, 255));
    Color.AddConstantColor('RED', new Color(255, 0, 0, 255));
    Color.AddConstantColor('GREEN', new Color(0, 255, 0, 255));
    Color.AddConstantColor('BLUE', new Color(0, 0, 255, 255));
    Color.AddConstantColor('AQUA', new Color(128, 255, 255, 255));
    Color.AddConstantColor('MAGENTA', new Color(128, 0, 128, 255));
    Color.AddConstantColor('YELLOW', new Color(255, 255, 0, 255));
    Color.AddConstantColor('ORANGE', new Color(255, 128, 0, 255));
    BitmapSrc = (function() {
      
        //BitmapSrc
      //------------------------------------------------------------------------------
      class BitmapSrc {
        constructor() {
          this.bitmap = null;
        }

        static LoadFromIconIndex(iconIndex) {
          var bs, icon_bitmap, iconset, ph, pw, sx, sy;
          bs = new BitmapSrc();
          if (BitmapSrc.CACHE[iconIndex] == null) {
            iconset = ImageManager.loadSystem('IconSet');
            if (KDCore.isMV()) {
              pw = Window_Base._iconWidth;
              ph = Window_Base._iconHeight;
            } else {
              pw = ImageManager.iconWidth;
              ph = ImageManager.iconHeight;
            }
            sx = iconIndex % 16 * pw;
            sy = Math.floor(iconIndex / 16) * ph;
            icon_bitmap = new Bitmap(pw, ph);
            icon_bitmap.addLoadListener(function() {
              icon_bitmap.blt(iconset, sx, sy, pw, ph, 0, 0);
            });
            BitmapSrc.CACHE[iconIndex] = icon_bitmap;
          }
          bs.bitmap = BitmapSrc.CACHE[iconIndex];
          return bs;
        }

        static LoadFromImageFolder(filename) {
          var bs;
          bs = new BitmapSrc();
          bs.bitmap = ImageManager.loadPicture(filename);
          return bs;
        }

        static LoadFromBase64(data, name) {
          var bs;
          bs = new BitmapSrc();
          if (name != null) {
            if (BitmapSrc.CACHE[name] != null) {
              bs.bitmap = BitmapSrc.CACHE[name];
            } else {
              BitmapSrc.CACHE[name] = Bitmap.load(data);
              bs.bitmap = BitmapSrc.CACHE[name];
            }
          } else {
            bs.bitmap = Bitmap.load(data);
          }
          return bs;
        }

        static LoadFromMemory(symbol) {
          var bs;
          bs = new BitmapSrc();
          if (BitmapSrc.CACHE[symbol] != null) {
            bs.bitmap = BitmapSrc.CACHE[symbol];
          } else {
            bs.bitmap = ImageManager.loadEmptyBitmap();
          }
          return bs;
        }

      };

      BitmapSrc.CACHE = {};

      return BitmapSrc;

    }).call(this);
    // * DevLog
    //------------------------------------------------------------------------------
    __TMP_LOGS__ = [];
    DevLog = class DevLog {
      constructor(prefix = "") {
        this.prefix = prefix;
        this._isShow = typeof DEV !== 'undefined';
        this._color = Color.BLACK;
        this._backColor = Color.WHITE;
        __TMP_LOGS__.push(this);
      }

      on() {
        this._isShow = true;
        return this;
      }

      off() {
        this._isShow = false;
        return this;
      }

      applyRandomColors() {
        this.applyRandomWithoutBackgroundColors();
        this.setBackColor(Color.Random());
        return this;
      }

      applyRandomWithoutBackgroundColors() {
        this.setColor(Color.Random());
        return this;
      }

      setColor(color) {
        this._color = color;
        return this;
      }

      setBackColor(backColor) {
        this._backColor = backColor;
        return this;
      }

      applyLibraryColors() {
        this.setColors(new Color(22, 120, 138, 0), Color.BLACK);
        return this;
      }

      setColors(color, backColor) {
        this.setColor(color);
        this.setBackColor(backColor);
        return this;
      }

      applyExtensionColors() {
        this.setColors(new Color(22, 143, 137, 0), Color.BLACK.getLightestColor(60));
        return this;
      }

      applyWarningColors() {
        this.setColors(Color.ORANGE, Color.BLACK.getLightestColor(100));
        return this;
      }

      p(text) {
        if (!this._isShow) {
          return;
        }
        if (text == null) {
          console.log("");
        }
        this._printText(text);
      }

      _printText(text) {
        text = this.prefix + " : " + text;
        if (this._isUsingColor()) {
          return this._printTextWithColors(text);
        } else {
          return console.log(text);
        }
      }

      _isUsingColor() {
        return this._color !== Color.BLACK || this._backColor !== Color.WHITE;
      }

      _printTextWithColors(text) {
        var args;
        args = ['%c' + text, `color: ${this._color.HEX} ; background: ${this._backColor.HEX};`];
        return window.console.log.apply(console, args);
      }

      static CreateForLib(library) {
        var dlog;
        dlog = new DevLog(library.name);
        dlog.applyLibraryColors();
        return dlog;
      }

      static EnableAllLogs() {
        return __TMP_LOGS__.forEach(function(log) {
          return log.on();
        });
      }

    };
    // * ParametersManager
    //------------------------------------------------------------------------------
    PluginManager.getPluginParametersByRoot = function(rootName) {
      var pluginParameters, property;
      for (property in this._parameters) {
        if (this._parameters.hasOwnProperty(property)) {
          pluginParameters = this._parameters[property];
          if (PluginManager.isPluginParametersContentKey(pluginParameters, rootName)) {
            return pluginParameters;
          }
        }
      }
      return PluginManager.parameters(rootName);
    };
    PluginManager.isPluginParametersContentKey = function(pluginParameters, key) {
      return pluginParameters[key] != null;
    };
    //@[AUTO EXTEND]
    //?[DEPRECATED]
    KDCore.ParametersManager = class ParametersManager {
      constructor(pluginName) {
        this.pluginName = pluginName;
        this._cache = {};
        this._parameters = PluginManager.getPluginParametersByRoot(this.pluginName);
      }

      isLoaded() {
        return (this._parameters != null) && this._parameters.hasOwnProperty(this.pluginName);
      }

      isHasParameter(name) {
        return this._parameters[name] != null;
      }

      getString(name) {
        return this._parameters[name];
      }

      convertField(object, fieldName) {
        var e;
        try {
          object[fieldName] = JSON.parse(object[fieldName] || 'false');
        } catch (error1) {
          e = error1;
          console.error('Error while convert field ' + e.name);
          object[fieldName] = false;
        }
        return object;
      }

      convertImage(object, fieldName) {
        return object[fieldName] = this.loadImage(object[fieldName]);
      }

      loadImage(filename, smooth) {
        var e, path;
        try {
          if (filename) {
            path = filename.split('/');
            filename = path.last();
            path = path.first() + '/';
            return ImageManager.loadBitmap('img/' + path, filename, 0, smooth || true);
          } else {
            return ImageManager.loadEmptyBitmap();
          }
        } catch (error1) {
          e = error1;
          console.error(e);
          return ImageManager.loadEmptyBitmap();
        }
      }

      getFromCacheOrInit(name, func) {
        var object;
        if (!this.isInCache(name)) {
          if (func != null) {
            object = func.call(this);
            this.putInCache(name, object);
          }
        }
        return this.getFromCache(name);
      }

      isInCache(name) {
        return this._cache.hasOwnProperty(name);
      }

      putInCache(name, object) {
        return this._cache[name] = object;
      }

      getFromCache(name) {
        return this._cache[name];
      }

      getNumber(name) {
        var number;
        number = this.getObject(name);
        if (SDK.isInt(number)) {
          return number;
        }
        return 0;
      }

      getObject(name) {
        if (this.isHasParameter(name)) {
          return JSON.parse(this.getString(name) || '{}');
        } else {
          return {};
        }
      }

      getBoolean(name) {
        if (this.isHasParameter(name)) {
          return JSON.parse(this.getString(name) || false);
        } else {
          return false;
        }
      }

      getBooleanFromCacheWithDefault(name, defaultValue) {
        if (this.isHasParameter(name)) {
          return this.getBooleanFromCache(name);
        } else {
          return defaultValue;
        }
      }

      getNumberFromCacheWithDefault(name, defaultValue) {
        if (this.isHasParameter(name)) {
          return this.getNumberFromCache(name);
        } else {
          return defaultValue;
        }
      }

      getStringFromCacheWithDefault(name, defaultValue) {
        if (this.isHasParameter(name)) {
          return this.getStringFromCache(name);
        } else {
          return defaultValue;
        }
      }

      getBooleanFromCache(name) {
        return this.getFromCacheOrInit(name, function() {
          return this.getBoolean(name);
        });
      }

      getNumberFromCache(name) {
        return this.getFromCacheOrInit(name, function() {
          return this.getNumber(name);
        });
      }

      getStringFromCache(name) {
        return this.getFromCacheOrInit(name, function() {
          return this.getString(name);
        });
      }

    };
    // * ParamLoader (ParametersManager alternative)

      //@[AUTO EXTEND]
    KDCore.ParamLoader = class ParamLoader {
      constructor(pluginName) {
        this.pluginName = pluginName;
        this.paramsRaw = PluginManager.getPluginParametersByRoot(this.pluginName);
        this.params = this.parseParameters(this.paramsRaw);
      }

      parseParameters(paramSet) {
        var clearKey, key, params, typeKey, value;
        params = {};
        for (key in paramSet) {
          value = paramSet[key];
          clearKey = this.parseKey(key);
          typeKey = this.parseKeyType(key);
          params[clearKey] = this.parseParamItem(typeKey, value);
        }
        return params;
      }

      parseKey(keyRaw) {
        return keyRaw.split(":")[0];
      }

      parseKeyType(keyRaw) {
        return keyRaw.split(":")[1];
      }

      // * Проверка, загружены ли параметры плагина
      isLoaded() {
        return (this.paramsRaw != null) && this.paramsRaw.hasOwnProperty(this.pluginName);
      }

      // * Имя параметра без ключа
      isHasParameter(paramName) {
        return this.params[paramName] != null;
      }

      
        // * Возвращает значение параметра (def - по умолчанию, если не найден)
      getParam(paramName, def) {
        if (this.isHasParameter(paramName)) {
          return this.params[paramName];
        } else {
          return def;
        }
      }

      // * Данные ключи должны идти после названия параметра через :
      // * Пример: @param ShowDelay:int, @param TestBool:bool
      // * Текстовые параметры, которые надо вернуть как есть, можно без типа (text, file, combo, ...)
      parseParamItem(type, item) {
        var e;
        if (type == null) {
          return item;
        }
        try {
          switch (type) {
            case "int":
            case "i":
              return parseInt(item);
            case "intA": // * массив чисел
              if (String.any(item)) {
                return JsonEx.parse(item).map((e) => {
                  return this.parseParamItem("int", e);
                });
              } else {
                return [];
              }
              break;
            case "bool":
            case "b":
            case "e":
              return eval(item);
            case "struct":
            case "s":
              if (String.any(item)) {
                return this.parseParameters(JsonEx.parse(item));
              } else {
                return null;
              }
              break;
            case "structA": // * массив структур
              return JsonEx.parse(item).map((e) => {
                return this.parseParameters(JsonEx.parse(e));
              });
            case "str":
              return item;
            case "strA":
              if (String.any(item)) {
                return JsonEx.parse(item).map((e) => {
                  return this.parseParamItem("str", e);
                });
              } else {
                return [];
              }
              break;
            case "note": // * если несколько строк в тексте
              return JsonEx.parse(item);
            case "css":
              return item.toCss();
            case "color":
              return KDCore.Color.FromHex(item);
            default:
              return item;
          }
        } catch (error1) {
          e = error1;
          console.warn(e);
          return item;
        }
      }

    };
    Point = (function() {
      // * Point
      //------------------------------------------------------------------------------
      class Point {
        constructor(_x = 0, _y = 0) {
          this._x = _x;
          this._y = _y;
        }

        clone() {
          return new Point(this._x, this._y);
        }

        toString() {
          return "[" + this._x + " ; " + this._y + "]";
        }

        isSame(anotherPoint) {
          return this.x === anotherPoint.x && this.y === anotherPoint.y;
        }

        convertToCanvas() {
          return new Point(Graphics.pageToCanvasX(this._x), Graphics.pageToCanvasY(this._y));
        }

        convertToMap() {
          return new Point($gameMap.canvasToMapX(this._x), $gameMap.canvasToMapY(this._y));
        }

        convertToScreen() {
          return new Point(this.screenX(), this.screenY());
        }

        screenX() {
          var t, tw;
          t = $gameMap.adjustX(this._x);
          tw = $gameMap.tileWidth();
          return Math.round(t * tw + tw / 2);
        }

        screenY() {
          var t, th;
          t = $gameMap.adjustY(this._y);
          th = $gameMap.tileHeight();
          return Math.round(t * th + th);
        }

        round() {
          return new Point(Math.round(this._x), Math.round(this._y));
        }

        floor() {
          return new Point(Math.floor(this._x), Math.floor(this._y));
        }

        mapPointOnScreen() {
          var nx, ny;
          nx = (this._x * $gameMap.tileWidth()) - ($gameMap.displayX() * $gameMap.tileWidth());
          ny = (this._y * $gameMap.tileHeight()) - ($gameMap.displayY() * $gameMap.tileHeight());
          return new Point(nx, ny);
        }

        multiplyBy(val) {
          return new Point(this._x * val, this._y * val);
        }

        simple() {
          return new PIXI.Point(this.x, this.y);
        }

        delta(point) {
          var dx, dy;
          dx = point.x - this._x;
          dy = point.y - this._y;
          return new KDCore.Point(dx, dy);
        }

        static _getEmpty() {
          if (Point._emptyPoint == null) {
            Point._emptyPoint = new Point(0, 0);
          }
          return Point._emptyPoint;
        }

      };

      Object.defineProperties(Point.prototype, {
        x: {
          get: function() {
            return this._x;
          },
          configurable: true
        },
        y: {
          get: function() {
            return this._y;
          },
          configurable: true
        }
      });

      Object.defineProperties(Point, {
        Empty: {
          get: function() {
            return Point._getEmpty();
          },
          configurable: false
        }
      });

      Array.prototype.toPoint = function() {
        return new Point(this[0], this[1]);
      };

      Sprite.prototype.toPoint = function() {
        return new Point(this.x, this.y);
      };

      Game_CharacterBase.prototype.toPoint = function() {
        return new Point(this.x, this.y);
      };

      return Point;

    }).call(this);
    // * Utils
    //------------------------------------------------------------------------------
    KDCore.Utils = {};
    (function() {
      var _;
      _ = KDCore.Utils;
      _.getJDataById = function(id, source) {
        var d, len, q;
        for (q = 0, len = source.length; q < len; q++) {
          d = source[q];
          if (d.id === id) {
            return d;
          }
        }
        return null;
      };
      _.hasMeta = function(symbol, obj) {
        return (obj.meta != null) && (obj.meta[symbol] != null);
      };
      _.getValueFromMeta = function(symbol, obj) {
        if (!_.hasMeta(symbol, obj)) {
          return null;
        }
        return obj.meta[symbol];
      };
      _.getNumberFromMeta = function(symbol, obj) {
        var value;
        if (!_.hasMeta(symbol, obj)) {
          return null;
        }
        if (obj.meta[symbol] === true) {
          return 0;
        } else {
          value = KDCore.SDK.toNumber(obj.meta[symbol], 0);
        }
        return value;
      };
      _.isSceneMap = function() {
        try {
          return SceneManager._scene instanceof Scene_Map;
        } catch (error1) {
          return false;
        }
      };
      _.isSceneBattle = function() {
        try {
          return SceneManager._scene instanceof Scene_Battle;
        } catch (error1) {
          return false;
        }
      };
      _.getEventCommentValue = function(commentCode, list) {
        var comment, e, item;
        try {
          if (list && list.length > 1) {
            i = 0;
            while (i < list.length) {
              item = list[i++];
              if (!item) {
                continue;
              }
              if (item.code === 108) {
                comment = item.parameters[0];
                if (comment.contains(commentCode)) {
                  return comment;
                }
              }
            }
          }
        } catch (error1) {
          e = error1;
          console.warn(e);
        }
        return null;
      };
      _.getPositionPointFromJSON = function(jsonSettings) {
        return _.convertPositionPointFromJSON(jsonSettings.position);
      };
      _.convertPositionPointFromJSON = function(position) {
        var e, x, y;
        try {
          x = position[0];
          y = position[1];
          if (!KDCore.SDK.isInt(x)) {
            x = eval(x);
          }
          if (!KDCore.SDK.isInt(y)) {
            y = eval(y);
          }
          return new KDCore.Point(x, y);
        } catch (error1) {
          e = error1;
          console.warn('Utils.getPositionPointFromJSON', e);
          return KDCore.Point.Empty;
        }
      };
      _.jsonPos = function(jsonPosition) {
        return _.convertPositionPointFromJSON(jsonPosition);
      };
      _.jsonPosXY = function(jsonPosition) {
        var e, x, y;
        try {
          ({x, y} = jsonPosition);
          return new KDCore.Point(eval(x), eval(y));
        } catch (error1) {
          e = error1;
          console.warn('Utils.jsonPosXY', e);
          return KDCore.Point.Empty;
        }
      };
      _.getVar = function(id) {
        return $gameVariables.value(id);
      };
      _.setVar = function(id, value) {
        return $gameVariables.setValue(id, value);
      };
      _.addToVar = function(id, value) {
        var prevVal;
        prevVal = _.getVar(id);
        return _.setVar(id, prevVal + value);
      };
      _.playSE = function(seFileName, pitch = 100, volume = 100) {
        var sound;
        if (seFileName == null) {
          return;
        }
        if (seFileName === "") {
          return;
        }
        sound = {
          name: seFileName,
          pan: 0,
          pitch: pitch,
          volume: volume
        };
        AudioManager.playStaticSe(sound);
      };
      _.getItemTypeId = function(item) {
        if (DataManager.isWeapon(item)) {
          return 1;
        } else if (DataManager.isArmor(item)) {
          return 2;
        }
        return 0;
      };
      _.getItemByType = function(itemId, typeId) {
        var data;
        data = [$dataItems, $dataWeapons, $dataArmors];
        return data[typeId][itemId];
      };
      _.loadFont = function(name) {
        if (!KDCore.isMZ()) {
          return;
        }
        if (String.isNullOrEmpty(name)) {
          return;
        }
        if (FontManager._states[name] != null) {
          return;
        }
        FontManager.load(name, name + ".ttf");
      };
      _.convertTimeShort = function(seconds) {
        var e;
        try {
          if (seconds > 59) {
            return Math.floor(seconds / 60) + 'm';
          } else {
            return seconds;
          }
        } catch (error1) {
          e = error1;
          console.warn(e);
          return seconds;
        }
      };
      _.isPointInScreen = function(point, margin = 10) {
        var maxH, maxW, screenMargin, x, y;
        ({x, y} = point);
        maxW = Graphics.width;
        maxH = Graphics.height;
        // * Граница от краёв экрана
        screenMargin = margin;
        if (x < screenMargin) {
          return false;
        }
        if (y < screenMargin) {
          return false;
        }
        if (x > (maxW - screenMargin)) {
          return false;
        }
        if (y > (maxH - screenMargin)) {
          return false;
        }
        return true;
      };
      // * Ассинхронная загрузка изображения, возвращает bitmap, когда загружен
      // * Пример использования loadImageAsync(a, b).then(метод)
      // в метод будет передан bitmap первым аргументом
      _.loadImageAsync = async function(folder, filename) {
        var promise;
        promise = new Promise(function(resolve, reject) {
          var b;
          b = ImageManager.loadBitmap("img/" + folder + "/", filename);
          return b.addLoadListener(function() {
            return resolve(b);
          });
        });
        return (await promise);
      };
    })();
    // * TimedUpdate
    //------------------------------------------------------------------------------
    //@[AUTO EXTEND]
    KDCore.TimedUpdate = class TimedUpdate {
      constructor(interval, method1) {
        this.interval = interval;
        this.method = method1;
        this._timer = 0;
        this._once = false;
      }

      update() {
        if (this.interval == null) {
          return;
        }
        if (this._timer++ >= this.interval) {
          this.call();
          this._timer = 0;
          if (this._once === true) {
            return this.stop();
          }
        }
      }

      once() {
        return this._once = true;
      }

      onUpdate(method1) {
        this.method = method1;
      }

      stop() {
        return this.interval = null;
      }

      isAlive() {
        return this.interval != null;
      }

      // * Рандомизировать интервал @interval (-min, +max)
      applyTimeRange(min, max) {
        var value;
        if (!this.isAlive()) {
          return;
        }
        value = SDK.rand(min, max);
        return this.interval += value;
      }

      call() {
        if (this.method != null) {
          return this.method();
        }
      }

    };
    // * Button (Sprite_XButton)
    //------------------------------------------------------------------------------
    //@[AUTO EXTEND]
    //?DEPRECATED
    KDCore.Button = class Button extends Sprite {
      constructor() {
        super();
        this._mouseIn = false;
        this._touching = false;
        this._slowUpdateActive = false;
        this._localMode = false;
        this._images = [];
        this._checkAlpha = false;
        this._textSprite = null;
        this._textPosition = 0;
        this._override = false; // * TouchClick in game messages not work anymore if TRUE
        this._clickHandlers = [];
        this._manualHided = false;
        this._manualDisabled = false;
        this._condition = null; // * Условие для Visible
        this._condition2 = null; // * Условие для Enable \ Disable
        this._disabled = false;
        this._infoData = null;
        this._isNeedShowText = false;
        return;
      }

      isMouseInButton() {
        return this._mouseIn === true;
      }

      isActive() {
        return this.visible === true;
      }

      activateSlowUpdate() {
        return this._slowUpdateActive = true;
      }

      setLocalMode() {
        this._realX = this.x;
        this._realY = this.y;
        return this._localMode = true;
      }

      setAlphaMode() {
        return this._checkAlpha = true;
      }

      // * above, below
      setTextPosition(position) {
        return this._textPosition = position;
      }

      setHelpText(text, size) {
        return this._createText(text, size);
      }

      setInfoData(data) {
        return this._infoData = data;
      }

      setOverrideMode() {
        return this._override = true;
      }

      isOverride() {
        return this._override === true && this.isActive() && this.touchInButton();
      }

      isDisabled() {
        return this._disabled === true;
      }

      isEnabled() {
        return !this.isDisabled();
      }

      isNeedShowText() {
        return this._isNeedShowText === true;
      }

      addClickHandler(method) {
        return this._clickHandlers.push(method);
      }

      clearClickHandlers() {
        return this._clickHandlers = [];
      }

      isLocalMode() {
        return this._localMode === true;
      }

      setCondition(method) {
        return this._condition = method;
      }

      setConditionForDisable(method) {
        return this._condition2 = method;
      }

      getInfoData() {
        return this._infoData;
      }

      simulateClick() { //?NEW
        return this.applyClickedState();
      }

      simulateClickManual() { //?NEW
        this.simulateClick();
        return setTimeout((() => {
          try {
            return this.applyNormalState();
          } catch (error1) {

          }
        }), 50);
      }

      prepare() { //?NEW
        return this.slowUpdate();
      }

      realX() {
        if (this.isLocalMode()) {
          return this._realX;
        } else {
          return this.x;
        }
      }

      realY() {
        if (this.isLocalMode()) {
          return this._realY;
        } else {
          return this.y;
        }
      }

      show() {
        this.visible = true;
        return this._manualHided = false;
      }

      hide() {
        this.visible = false;
        return this._manualHided = true;
      }

      disable() {
        this._disabled = true;
        this._manualDisabled = true;
        this.refreshEnDisState();
        return this._mouseIn = false;
      }

      enable() {
        this._disabled = false;
        this._manualDisabled = false;
        return this.refreshEnDisState();
      }

      update() {
        super.update();
        if (this._destroyed === true) {
          return;
        }
        this.updateMouseClick();
        this.updatePosition();
        if (!this._slowUpdateActive) {
          this.slowUpdate();
        }
        return this.updateComplexTextVisible();
      }

      slowUpdate() {
        if (this._destroyed === true) {
          return;
        }
        this.updateMouseTracking();
        this.updateConditionForVisible();
        return this.updateConditionForEnabling();
      }

      updateMouseTracking() {
        if (!this.isActive()) {
          return;
        }
        if (this.isDisabled()) {
          return;
        }
        if (this.cursorInButton()) {
          this._onMouseEnter();
          return this._mouseIn = true;
        } else {
          this._onMouseLeave();
          return this._mouseIn = false;
        }
      }

      // * In MZ TouchInput always have X,Y
      cursorInButton() {
        return this.touchInButton();
      }

      xyInButton(x, y) {
        var inRect, rect, rx, ry;
        rx = KDCore.SDK.toGlobalCoord(this, 'x');
        ry = KDCore.SDK.toGlobalCoord(this, 'y');
        rect = new PIXI.Rectangle(rx, ry, this._realWidth(), this._realHeight());
        inRect = rect.contains(x, y);
        if (inRect === true && this._checkAlpha === true) {
          return this._checkAlphaPixel(x - rx, y - ry);
        } else {
          return inRect;
        }
      }

      _realWidth() {
        if (this._hasImage()) {
          return this._mainImage().width;
        } else {
          return this.width;
        }
      }

      _hasImage() {
        return this._mainImage() != null;
      }

      _mainImage() {
        return this._images[0];
      }

      _realHeight() {
        if (this._hasImage()) {
          return this._mainImage().height;
        } else {
          return this.height;
        }
      }

      _checkAlphaPixel(x, y) {
        var pixel;
        pixel = this._hasImage() ? this._mainImage().bitmap.getAlphaPixel(x, y) : this.bitmap.getAlphaPixel(x, y);
        return pixel >= 200;
      }

      _onMouseEnter() {
        if (this._mouseIn === true) {
          return;
        }
        if (!this.isDisabled()) {
          this.applyCoverState();
        }
        this._showText();
        if (this.getInfoData() != null) {
          return this._startComplexTimer();
        }
      }

      _onMouseLeave() {
        if (this._mouseIn === false) {
          return;
        }
        if (!this.isDisabled()) {
          this.applyNormalState();
        }
        this._hideText();
        return this._stopComplexTimer();
      }

      _showText() {
        if (this._textSprite == null) {
          return;
        }
        this._updateTextPosition();
        return this._textSprite.visible = true;
      }

      _hideText() {
        if (this._textSprite == null) {
          return;
        }
        return this._textSprite.visible = false;
      }

      _startComplexTimer() {
        this._stopComplexTimer();
        return this._cTimer = setTimeout((() => {
          if (this._mouseIn === true) {
            return this._isNeedShowText = true;
          }
        }), 1000);
      }

      _stopComplexTimer() {
        if (this._cTimer != null) {
          clearTimeout(this._cTimer);
        }
        return this._isNeedShowText = false;
      }

      updateMouseClick() {
        if (!this.isActive()) {
          this._unTouch();
          return;
        }
        if (this.isDisabled()) {
          return;
        }
        if (TouchInput.isTriggered() && this.touchInButton()) {
          this._touching = true;
          this.applyClickedState();
        }
        if (this._touching === true) {
          if (TouchInput.isReleased() || !this.touchInButton()) {
            this._unTouch();
            if (TouchInput.isReleased()) {
              return this.callClickHandler();
            }
          }
        }
      }

      _unTouch() {
        this._touching = false;
        if (this.touchInButton()) {
          return this.applyCoverState();
        } else {
          return this.applyNormalState();
        }
      }

      touchInButton() {
        return this.xyInButton(TouchInput.x, TouchInput.y);
      }

      callClickHandler() {
        if (this._clickHandlers.length > 0) {
          return this._clickHandlers.forEach(function(method) {
            return method();
          });
        }
      }

      updatePosition() {
        var p;
        if (!this._localMode) {
          return;
        }
        p = new KDCore.Point(this._realX, this._realY);
        return this.move(p.screenX(), p.screenY());
      }

      updateConditionForVisible() {
        var result;
        if (this._condition == null) {
          return;
        }
        if (this._manualHided === true) {
          return;
        }
        try {
          result = this._condition();
          return this.visible = !result;
        } catch (error1) {
          console.warn('wrong condition in button');
          return this.visible = true;
        }
      }

      updateConditionForEnabling() {
        if (!this._condition2) {
          return;
        }
        if (this._manualDisabled === true) {
          return;
        }
        try {
          this._disabled = this._condition2();
          return this.refreshEnDisState();
        } catch (error1) {
          console.warn('wrong condition in button for enable state');
          return this.disable();
        }
      }

      setButtonImages(img1, img2, img3, img4) {
        if (this._images != null) {
          this._images.forEach(function(img) {
            if (img != null) {
              return img.parent.removeChild(img);
            }
          });
        }
        this._images = [new Sprite(img1), img2 != null ? new Sprite(img2) : void 0, img3 != null ? new Sprite(img3) : void 0, img4 != null ? new Sprite(img4) : void 0];
        this._images.forEach((img) => {
          if (img != null) {
            return this.addChild(img);
          }
        });
        return this.applyNormalState();
      }

      applyNormalState() {
        var ref;
        this.refreshImages();
        return (ref = this._images[0]) != null ? ref.visible = true : void 0;
      }

      refreshImages() {
        return this._images.forEach(function(img) {
          return img != null ? img.visible = false : void 0;
        });
      }

      applyCoverState() {
        this.refreshImages();
        if (this._images[1] != null) {
          return this._images[1].visible = true;
        } else {
          return this.applyNormalState();
        }
      }

      applyClickedState() {
        this.refreshImages();
        if (this._images[2] != null) {
          return this._images[2].visible = true;
        } else {
          return this.applyNormalState();
        }
      }

      _createText(text, size) {
        var h, w;
        if (this._textSprite) {
          this.removeChild(this._textSprite);
        }
        w = Math.round(((size / 10) + 1) * 5 * text.length);
        h = size + 4;
        this._textSprite = new Sprite(new Bitmap(w, h));
        this._textSprite.bitmap.fontSize = size;
        this._textSprite.bitmap.drawText(text, 0, h / 2, w, 1, 'center');
        this._textSprite.visible = false;
        return this.addChild(this._textSprite);
      }

      _updateTextPosition() {
        var nx, ny;
        if (!this._textSprite) {
          return;
        }
        nx = this._realWidth() / 2 - this._textSprite.width / 2;
        if (this._textPosition === 0) {
          ny = -this._textSprite.height;
        } else {
          ny = this._realHeight() + this._textSprite.height / 2;
        }
        return this._textSprite.move(nx, ny);
      }

      applyDisableState() {
        var ref;
        this.refreshImages();
        return (ref = this._images[3]) != null ? ref.visible = true : void 0;
      }

      refreshEnDisState() {
        if (this.isDisabled()) {
          this.applyDisableState();
          return this._hideText();
        } else {
          if (this._mouseIn === false) {
            return this.applyNormalState();
          }
        }
      }

      //else
      //    do @applyCoverState
      updateComplexTextVisible() {}

      applyScale(mod) {
        var img, len, q, ref;
        ref = this._images;
        for (q = 0, len = ref.length; q < len; q++) {
          img = ref[q];
          if (img != null) {
            img.scale.x = mod;
            img.scale.y = mod;
          }
        }
      }

      static FromSet(imgName, sourceFolder = null) {
        var button, getterFunc, img0, img1;
        getterFunc = function(filename) {
          return ImageManager.loadPicture(filename);
        };
        if (sourceFolder != null) {
          getterFunc = function(filename) {
            return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
          };
        }
        img0 = getterFunc(imgName + "_00");
        img1 = getterFunc(imgName + "_01");
        button = new KDCore.Button();
        button.setButtonImages(img0, img1, img0, img0);
        return button;
      }

      static FromSetFull(imgName, sourceFolder = null) {
        var button, getterFunc, img0, img1, img2, img3;
        getterFunc = function(filename) {
          return ImageManager.loadPicture(filename);
        };
        if (sourceFolder != null) {
          getterFunc = function(filename) {
            return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
          };
        }
        img0 = getterFunc(imgName + "_00");
        img1 = getterFunc(imgName + "_01");
        img2 = getterFunc(imgName + "_02");
        img3 = getterFunc(imgName + "_03");
        button = new KDCore.Button();
        button.setButtonImages(img0, img1, img2, img3);
        return button;
      }

    };
    KDCore.Sprite = (function(superClass) {
      // * Sprite
      //------------------------------------------------------------------------------
      //@[AUTO EXTEND]
      class Sprite extends superClass {
        constructor() {
          super(...arguments);
        }

        b() {
          return this.bitmap;
        }

        clear() {
          return this.bitmap.clear();
        }

        add(child) {
          return this.addChild(child);
        }

        bNew(w, h) {
          if (h == null) {
            h = w;
          }
          return this.bitmap = new Bitmap(w, h);
        }

        bImg(filename, sourceFolder) {
          var getterFunc;
          getterFunc = function(filename) {
            return ImageManager.loadPicture(filename);
          };
          if (sourceFolder != null) {
            getterFunc = function(filename) {
              return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
            };
          }
          return this.bitmap = getterFunc(filename);
        }

        onReady(method) {
          if (method != null) {
            return this.bitmap.addLoadListener(method);
          }
        }

        drawText() {
          return this.bitmap.drawText(...arguments);
        }

        drawTextFull(text, position = "center") {
          if (this.textSettingsPosition != null) {
            position = this.textSettingsPosition;
          }
          return this.bitmap.drawTextFull(text, position);
        }

        //?DEPRECATED
        drawTextWithSettings(text) {
          this.clear();
          this.drawTextFull(text, this.textSettingsPosition);
        }

        //? x, y, icon, size
        drawIcon() {
          return this.bitmap.drawIcon(...arguments);
        }

        moveByJson(settings) {
          var pos;
          pos = KDCore.Utils.getPositionPointFromJSON(settings);
          return this.move(pos.x, pos.y);
        }

        applyTextSettingsByJson(sprite, settings) {
          this.applyTextSettingsByExtraSettings(sprite, settings.text);
        }

        applyTextSettingsByExtraSettings(sprite, s) {
          sprite.move(s.marginX, s.marginY);
          sprite.b().fontSize = s.fontSize;
          sprite.b().textColor = KDCore.Color.FromHex(s.textColor).CSS;
          sprite.b().outlineWidth = s.outlineWidth;
          if (s.outlineColor != null) {
            sprite.b().outlineColor = KDCore.Color.FromHex(s.outlineColor).CSS;
          }
          if (s.fontFace != null) {
            sprite.b().fontFace = s.fontFace;
          }
          sprite.b().fontItalic = s.fontItalic;
          sprite.visible = s.visible;
        }

        isReady() {
          var q, ref;
          if (this.bitmap != null) {
            if (!this.bitmap.isReady()) {
              return false;
            }
          }
          for (i = q = 0, ref = this.children.length; (0 <= ref ? q < ref : q > ref); i = 0 <= ref ? ++q : --q) {
            if (!this.children[i].bitmap.isReady()) {
              return false;
            }
          }
          return true;
        }

        inPosition(point) {
          return this.isContainsPoint(point);
        }

        isUnderMouse() {
          return this.inPosition(TouchInput);
        }

        // * Из параметров плагина
        applyFontParam(font) {
          var b;
          if (font == null) {
            return;
          }
          b = this.b();
          if (font.size != null) {
            b.fontSize = font.size;
          }
          if (!String.isNullOrEmpty(font.face)) {
            b.fontFace = font.face;
          }
          if (font.italic != null) {
            b.fontItalic = font.italic;
          }
        }

        applyOutlineParam(outline) {
          var b;
          if (outline == null) {
            return;
          }
          b = this.b();
          if (outline.width != null) {
            b.outlineWidth = outline.width;
          }
          if (!String.isNullOrEmpty(outline.color)) {
            b.outlineColor = outline.color;
          }
        }

        static FromImg(filename, sourceFolder) {
          var s;
          s = new KDCore.Sprite();
          s.bImg(filename, sourceFolder);
          return s;
        }

        static FromBitmap(w, h) {
          var s;
          s = new KDCore.Sprite();
          s.bNew(w, h);
          return s;
        }

        static FromTextSettings(settings) {
          var s;
          s = KDCore.Sprite.FromBitmap(settings.textBoxWidth, settings.textBoxHeight);
          s.applyTextSettingsByExtraSettings(s, settings);
          s.textSettingsPosition = settings.position;
          return s;
        }

        // * Загрузчик из параметров плагина (безопасный)
        static FromParams(pluginParams) {
          var e, margins, s, size;
          try {
            size = pluginParams.size;
            s = KDCore.Sprite.FromBitmap(size.w, size.h);
            s.textSettingsPosition = pluginParams.alignment;
            margins = pluginParams.margins;
            if (margins != null) {
              s.move(margins.x, margins.y);
            }
            s.applyFontParam(pluginParams.font);
            s.applyOutlineParam(pluginParams.outline);
            if (!String.isNullOrEmpty(pluginParams.textColor)) {
              s.b().textColor = pluginParams.textColor;
            }
            if (pluginParams.visible != null) {
              s.visible = pluginParams.visible;
            }
            return s;
          } catch (error1) {
            e = error1;
            console.warn('Something wrong with Text Settings!', e);
            return KDCore.Sprite.FromBitmap(60, 30);
          }
        }

      };

      return Sprite;

    }).call(this, Sprite);
    // * Button M
    //------------------------------------------------------------------------------
    //@[AUTO EXTEND]
    // * Button Mini - упрощённый класс Sprite_XButton (KDCore.Button)

      // * Принимает название файла изображения кнопки без _00
    // * Названия изображения должны быть в стандартном формате _00, _01, [_03]
    // * _02 - не используются в этом классе

      // * Класс использует глобальную временную переменную для определения находится ли мышь в зоне кнопки

      // * Если isFull - true, значит нужен _03
    KDCore.ButtonM = class ButtonM extends KDCore.Sprite {
      constructor(filename, isFull = false, sourceFolder = null) {
        super();
        this._bitmaps = [];
        this._disabled = false;
        this._isTriggered = false;
        // * Когда произошло нажатие на кнопку
        this._handler = null;
        this._isCanBeClicked = true;
        this._isManualHoverMode = false;
        this._isManualSelected = false;
        this._loadBitmaps(filename, isFull, sourceFolder);
        this._setImageState(0);
        this._createThread();
      }

      setManualHover() {
        return this._isManualHoverMode = true;
      }

      disableManualHover() {
        return this._isManualHoverMode = false;
      }

      setManualSelected(_isManualSelected) {
        this._isManualSelected = _isManualSelected;
      }

      enableClick() {
        return this._isCanBeClicked = true;
      }

      disableClick() {
        return this._isCanBeClicked = false;
      }

      desaturate() {
        this.filters = [new PIXI.filters.ColorMatrixFilter()];
        this.filters[0].desaturate();
      }

      isMouseIn() {
        if (this._isManualHoverMode === true) {
          return this._isManualSelected;
        } else {
          return this.inPosition(TouchInput);
        }
      }

      isActive() {
        if (this._isCanBeClicked === false) {
          return false;
        }
        if (this.parent != null) {
          return this.parent.visible === true && this.visible === true;
        } else {
          return this.visible === true;
        }
      }

      isDisabled() {
        return this._disabled === true;
      }

      addClickHandler(_handler) {
        this._handler = _handler;
      }

      clearClickHandler() {
        return this._handler = null;
      }

      // * Воспроизводит визуальный эффект нажатия
      simulateClick() {
        if (!this.isActive()) {
          return;
        }
        if (this.isDisabled()) {
          return;
        }
        if (this.isMouseIn()) {
          return;
        }
        this._startSimulation();
      }

      isEnabled() {
        return !this.isDisabled();
      }

      refreshState(isEnable = true) {
        if (isEnable === true) {
          if (this.isDisabled()) {
            this.enable();
          }
        } else {
          if (this.isEnabled()) {
            this.disable();
          }
        }
      }

      disable() {
        this._disabled = true;
        return this._setImageState(2);
      }

      enable() {
        this._disabled = false;
        return this._setImageState(0);
      }

      click() {
        if (this._handler != null) {
          return this._handler();
        }
      }

      update() {
        super.update();
        return this._updateMain();
      }

    };
    (function() {      
      //╒═════════════════════════════════════════════════════════════════════════╛
      // ■ ButtonM Implementation
      //╒═════════════════════════════════════════════════════════════════════════╛
      //---------------------------------------------------------------------------
      var _, alias_SM_isAnyButtonPressed, alias_SM_onMapLoaded;
      //@[DEFINES]
      _ = KDCore.ButtonM.prototype;
      _._loadBitmaps = function(filename, isFull = false, sourceFolder = null) {
        var getterFunc;
        getterFunc = this._getGetter(sourceFolder);
        this._bitmaps.push(getterFunc(filename + '_00'));
        this._bitmaps.push(getterFunc(filename + '_01'));
        if (isFull) {
          this._bitmaps.push(getterFunc(filename + '_03'));
        }
      };
      _._getGetter = function(sourceFolder = null) {
        var getterFunc;
        getterFunc = function(filename) {
          return ImageManager.loadPicture(filename);
        };
        if (sourceFolder !== null) {
          getterFunc = function(filename) {
            return ImageManager.loadBitmap('img/' + sourceFolder + '/', filename);
          };
        }
        return getterFunc;
      };
      _._setImageState = function(index = 0) {
        if (this._bitmaps[index] == null) {
          index = 0;
        }
        this.bitmap = this._bitmaps[index];
        this._lastState = index;
      };
      _._createThread = function() {
        this.hoverThread = new KDCore.TimedUpdate(3, this._updateHover.bind(this));
        this.hoverThread.applyTimeRange(-1, 1);
        this.hoverThread.call();
      };
      //?[DYNAMIC]
      _._updateMain = function() {
        this._updateMouseLogic();
        if (!this.isActive()) {
          if (($gameTemp.kdButtonUnderMouse != null) && $gameTemp.kdButtonUnderMouse === this) {
            return $gameTemp.kdButtonUnderMouse = null;
          }
        }
      };
      _._updateMouseLogic = function() {
        this.hoverThread.update();
        return this._updateMouseClick();
      };
      _._updateHover = function() {
        if (!this.isActive()) {
          return;
        }
        // * чтобы эффект нажатия не прекратить
        if (this._isTriggered === true) {
          return;
        }
        if (this.isMouseIn()) {
          if (this._lastState !== 1) {
            if (!this.isDisabled()) {
              this._setImageState(1);
            }
            $gameTemp.kdButtonUnderMouse = this;
          }
        } else {
          if (this._lastState !== 0) {
            if (!this.isDisabled()) {
              this._setImageState(0);
            }
            if ($gameTemp.kdButtonUnderMouse === this) {
              $gameTemp.kdButtonUnderMouse = null;
            }
          } else if ($gameTemp.kdButtonUnderMouse === this) {
            $gameTemp.kdButtonUnderMouse = null;
          }
        }
      };
      _._updateMouseClick = function() {
        if (!this.isActive()) {
          return;
        }
        if (this.isDisabled()) {
          return;
        }
        if (TouchInput.isTriggered() && this.isMouseIn()) {
          this._isTriggered = true;
          this._setImageState(0);
        }
        if (this._isTriggered === true) {
          if (TouchInput.isReleased()) {
            this._isTriggered = false;
            if (this.isMouseIn()) {
              this.click();
            }
          }
        }
      };
      _._startSimulation = function() {
        this._setImageState(1);
        this._simulateThread = new KDCore.TimedUpdate(10, () => {
          return this._setImageState(0);
        });
        this._simulateThread.once();
        return this._updateMain = this._updateMouseClickSimulated;
      };
      _._updateMouseClickSimulated = function() {
        this._simulateThread.update();
        if (!this._simulateThread.isAlive()) {
          this._simulateThread = null;
          this._updateMain = this._updateMouseLogic;
        }
      };
      // * Теперь при нажатии на любую кнопку, игрок не будет ходить по карте

      //@[ALIAS]
      alias_SM_isAnyButtonPressed = Scene_Map.prototype.isAnyButtonPressed;
      Scene_Map.prototype.isAnyButtonPressed = function() {
        if ($gameTemp.kdButtonUnderMouse != null) {
          return true;
        } else {
          return alias_SM_isAnyButtonPressed.call(this);
        }
      };
      //@[ALIAS]
      alias_SM_onMapLoaded = Scene_Map.prototype.onMapLoaded;
      Scene_Map.prototype.onMapLoaded = function() {
        $gameTemp.kdButtonUnderMouse = null;
        return alias_SM_onMapLoaded.call(this);
      };
    })();
    // ■ END ButtonM Implementation
    //---------------------------------------------------------------------------

      // * Button Mini User - класс с определением файла каждого состояния отдельно
    // * Принимает теже аргументы, только заместо имени файла, три изображения (имени)
    // ? states = { main, hover, disabled }
    KDCore.ButtonMU = class ButtonMU extends KDCore.ButtonM {
      constructor() {
        super(...arguments);
      }

      //$[OVER]
      _loadBitmaps(states, isFull = true, sourceFolder = null) {
        var getterFunc;
        getterFunc = this._getGetter(sourceFolder);
        this._bitmaps.push(getterFunc(states.main));
        this._bitmaps.push(getterFunc(states.hover));
        // * Optional 03
        if (String.any(states.disabled)) {
          this._bitmaps.push(getterFunc(states.disabled));
        }
      }

    };
    
    //@[EXTENSION TO GLOBAL]
    //------------------------------------------------------------------------------
    KDCore.SDK = SDK;
    KDCore.Color = Color;
    KDCore.DevLog = DevLog;
    KDCore.Point = Point;
    KDCore.BitmapSrc = BitmapSrc;
    //? SOME KDCORE METHODS
    //--------------------------------------------------------------------------------
    KDCore.isMV = function() {
      return Utils.RPGMAKER_NAME.contains("MV");
    };
    KDCore.isMZ = function() {
      return !KDCore.isMV();
    };
    KDCore.warning = function(msg, error) {
      if (msg != null) {
        console.warn(msg);
      }
      if (error != null) {
        console.warn(error);
      }
    };
    (function() {      //--------------------------------------------------------------------------------
      // Word Wrapping =================================================================
      //--------------------------------------------------------------------------------
      //?NEW
      Window_Base.prototype.drawTextExWithWordWrap = function(text, x, y, width, maxLines) {
        var maxWidth, wrappedText;
        maxWidth = this.contentsWidth();
        wrappedText = Window_Message.prototype.pWordWrap.call(this, text, width || maxWidth, maxLines);
        this.drawTextEx(wrappedText, x, y);
      };
      //?NEW
      Window_Message.prototype.pWordWrap = function(text, maxWidth, maxLines) {
        var j, line, lines, newLines, q, ref, ref1, result, spaceLeft, spaceWidth, u, wordWidth, wordWidthWithSpace, words;
        lines = text.split('\n');
        maxWidth = maxWidth;
        spaceWidth = this.contents.measureTextWidth(' ');
        result = '';
        newLines = 1;
        for (i = q = 0, ref = lines.length; (0 <= ref ? q < ref : q > ref); i = 0 <= ref ? ++q : --q) {
          spaceLeft = maxWidth;
          line = lines[i];
          words = line.split(' ');
          for (j = u = 0, ref1 = words.length; (0 <= ref1 ? u < ref1 : u > ref1); j = 0 <= ref1 ? ++u : --u) {
            wordWidth = this.contents.measureTextWidth(words[j]);
            wordWidthWithSpace = wordWidth + spaceWidth;
            if (j === 0 || wordWidthWithSpace > spaceLeft) {
              if (j > 0) {
                if (maxLines === newLines) {
                  return result;
                }
                result += '\n';
                newLines++;
              }
              result += words[j];
              spaceLeft = maxWidth - wordWidth;
              if (j === 0 && line.match(/\\n\w*\s*<\s*\\n\[\w*\s*\]\s*>*/gi)) {
                spaceLeft += 200;
              }
            } else {
              spaceLeft -= wordWidthWithSpace;
              result += ' ' + words[j];
            }
          }
          if (i < lines.length - 1) {
            result += '\n';
          }
        }
        return result;
      };
    })();
    //--------------------------------------------------------------------------------
    // MV TouchInput Extension =======================================================
    //--------------------------------------------------------------------------------

    // * Для совместимости MV и MZ
    //TouchInput.getMousePosition = -> new KDCore.Point(TouchInput.x, TouchInput.y)
    TouchInput.toMapPoint = function() {
      return this.toPoint().convertToMap();
    };
    //?SMouse better alternative
    (function() {
      var alias_SM_processMapTouch, alias_TIOMM;
      if (KDCore.isMZ()) {
        return;
      }
      
      // * Для ButtonM
      //@[ALIAS]
      alias_SM_processMapTouch = Scene_Map.prototype.processMapTouch;
      Scene_Map.prototype.processMapTouch = function() {
        if ($gameTemp.kdButtonUnderMouse != null) {

        } else {
          return alias_SM_processMapTouch.call(this);
        }
      };
      //@[ALIAS]
      alias_TIOMM = TouchInput._onMouseMove;
      TouchInput._onMouseMove = function(event) {
        var x, y;
        alias_TIOMM.call(this, event);
        x = Graphics.pageToCanvasX(event.pageX);
        y = Graphics.pageToCanvasY(event.pageY);
        if (Graphics.isInsideCanvas(x, y)) {
          return this._onHover(x, y);
        }
      };
      
      //?NEW, from MZ
      TouchInput._onHover = function(_x, _y) {
        this._x = _x;
        this._y = _y;
      };
    })();
    (function() {      // * VirtualInput для RPG Maker MV
      //$[OVER]
      //TouchInput.getMousePosition = ->
      //    new KDCore.Point(TouchInput._x, TouchInput._y)
      var ALIAS__clear, ALIAS__update, _;
      if (KDCore.isMZ()) {
        return;
      }
      //@[DEFINES]
      _ = Input;
      //@[ALIAS]
      ALIAS__clear = _.clear;
      _.clear = function() {
        ALIAS__clear.call(this);
        return this._virtualButton = null;
      };
      //@[ALIAS]
      ALIAS__update = _.update;
      _.update = function() {
        ALIAS__update.call(this);
        if (this._virtualButton == null) {
          return;
        }
        this._latestButton = this._virtualButton;
        this._pressedTime = 0;
        return this._virtualButton = null;
      };
      _.virtualClick = function(buttonName) {
        return this._virtualButton = buttonName;
      };
    })();
    (function() {      // * Right mouse pressed
      // * Определение когда правая (вторая) кнопка мыши зажата и удерживается
      var ALIAS___onMouseUp, ALIAS___onRightButtonDown, ALIAS__clear, ALIAS__update, _;
      //@[DEFINES]
      _ = TouchInput;
      //@[ALIAS]
      ALIAS__clear = _.clear;
      _.clear = function() {
        ALIAS__clear.call(this);
        this._kdMousePressed2 = false;
        this._kdPressedTime2 = 0;
      };
      //@[ALIAS]
      ALIAS___onRightButtonDown = _._onRightButtonDown;
      _._onRightButtonDown = function(event) {
        var check;
        ALIAS___onRightButtonDown.call(this, event);
        // * Это значит что ALIAS метод прошёл (верные X и Y в Canvas)
        if (KDCore.isMZ()) {
          check = this._newState.cancelled === true;
        } else {
          check = this._events.cancelled === true;
        }
        if (check === true) {
          this._kdMousePressed2 = true;
          this._kdPressedTime2 = 0;
        }
      };
      //@[ALIAS]
      ALIAS___onMouseUp = _._onMouseUp;
      _._onMouseUp = function(event) {
        ALIAS___onMouseUp.call(this, event);
        if (event.button === 2) {
          this._kdMousePressed2 = false;
        }
      };
      //@[ALIAS]
      ALIAS__update = _.update;
      _.update = function() {
        ALIAS__update.call(this);
        if (this.kdIsPressed2()) {
          return this._kdPressedTime2++;
        }
      };
      //?[NEW]
      _.kdIsPressed2 = function() {
        return this._kdMousePressed2 === true;
      };
    })();
    (function() {      //--------------------------------------------------------------------------------
      // MV MZ Methods Extension =======================================================
      //--------------------------------------------------------------------------------
      if (KDCore.isMZ()) {
        return;
      }
      (function() {        //╒═════════════════════════════════════════════════════════════════════════╛
        // ■ Window_Base.coffee
        //╒═════════════════════════════════════════════════════════════════════════╛
        //---------------------------------------------------------------------------
        var ALIAS__initialize, _;
        //@[DEFINES]
        _ = Window_Base.prototype;
        // * Чтоб можно было Rectangle принимать в конструктор
        //@[ALIAS]
        ALIAS__initialize = _.initialize;
        _.initialize = function(x, y, w, h) {
          if (x instanceof PIXI.Rectangle) {
            return ALIAS__initialize.call(this, x.x, x.y, x.width, x.height);
          } else {
            return ALIAS__initialize.call(this, ...arguments);
          }
        };
      })();
      (function() {        // ■ END Window_Base.coffee
        //---------------------------------------------------------------------------

        //╒═════════════════════════════════════════════════════════════════════════╛
        // ■ Spriteset_Map.coffee
        //╒═════════════════════════════════════════════════════════════════════════╛
        //---------------------------------------------------------------------------
        var _;
        
        //@[DEFINES]
        _ = Spriteset_Map.prototype;
        _.findTargetSprite = function(target) {
          return this._characterSprites.find(function(sprite) {
            return sprite.checkCharacter(target);
          });
        };
      })();
      (function() {        // ■ END Spriteset_Map.coffee
        //---------------------------------------------------------------------------

        //╒═════════════════════════════════════════════════════════════════════════╛
        // ■ Sprite_Character.coffee
        //╒═════════════════════════════════════════════════════════════════════════╛
        //---------------------------------------------------------------------------
        var _;
        
        //@[DEFINES]
        _ = Sprite_Character.prototype;
        _.checkCharacter = function(character) {
          return this._character === character;
        };
      })();
    })();
  })();
}

// ■ END KDCore.coffee
//---------------------------------------------------------------------------
//? КОНЕЦ KDCORE
// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------

(function(){

    //TODO: Вынести в KDCore

    // EXAMPLE:
    //var People = [
    //    {Name:"AAA", Surname:"ZZZ"},
    //    {Name: "Name", Surname: "AAA"}
    //];
    //People.sort(dynamicSort("Surname"));
    //People.sort(dynamicSort("-Surname"));
    function dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        };
    }

    KDCore.Utils.dynamicSort = dynamicSort; 

})();
(function(){
    
    PKD_SQS.LoadPluginSettings = () => {

        PKD_SQS.PP._loader = new KDCore.ParamLoader("sqsQuests:structA");

        /*if(KDCore.isMZ())
            RegisterPluginCommnadsMZ();
        else {
            RegisterPluginCommandsMV();
        }*/
        
    };

})();
// Generated by CoffeeScript 2.5.1
// * Общий класс для всех UI элементов
//? FROM AABSZ (rev 13.10.20), modified
(function() {
  var Sprite_UIElement;
  Sprite_UIElement = (function() {
    // * ABSTRACT значит что класс сам по себе ничего не создаёт, не хранит данные
    //@[ABSTRACT]
    class Sprite_UIElement extends KDCore.Sprite {
      constructor(params) {
        super();
        this.params = params;
        this._init();
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true
        };
      }

      // * Общий метод (есть у всех элементов)
      // * По умолчанию вызывает drawText, но потомки могут переопределить
      draw() {
        return this.drawText(...arguments);
      }

      // * Общий метод
      drawText() {} // * EMPTY

      
        // * Если изначально невидимый (из параметров), то не активный вообще
      isActive() {
        return this.params.visible === true;
      }

      rootImageFolder() {
        return Sprite_UIElement.RootImageFolder;
      }

      // * Сделать чёрно белым
      desaturate() {
        this.filters = [new PIXI.filters.ColorMatrixFilter()];
        this.filters[0].desaturate();
      }

      // * Общий метод (можно ли редактировать визуально)
      isCanBeEdited() {
        return false;
      }

      // * Общий метод (надо ли скрывать при игровом сообщнии)
      isHaveHideWithMessageFlag() {
        return false;
      }

      // * Общий метод (находится ли объект под мышкой)
      isUnderMouse() {
        var ref;
        return (ref = this.zeroChild()) != null ? ref.isUnderMouse() : void 0;
      }

      // * Параметры первого элемента (если он есть)
      realWidth() {
        var child;
        child = this.zeroChild();
        if (child != null) {
          if (child instanceof PKD_SQS.Sprite_UIElement) {
            return child.realWidth();
          } else {
            return child.width;
          }
        }
        return 0;
      }

      realHeight() {
        var child;
        child = this.zeroChild();
        if (child != null) {
          if (child instanceof PKD_SQS.Sprite_UIElement) {
            return child.realHeight();
          } else {
            return child.height;
          }
        }
        return 0;
      }

      // * Первый "физический" элемент (спрайт)
      zeroChild() {
        return this.children[0];
      }

      // * Метод восстановления значения на стандартные настройки
      reset(property) {
        var e;
        try {
          switch (property) {
            case "position":
              this._resetPosition();
              break;
            default:
              this[property] = this.params[property];
          }
        } catch (error) {
          e = error;
          KDCore.warning(e);
        }
      }

    };

    // * Корневая директория для изображений
    Sprite_UIElement.RootImageFolder = "pSQSystem";

    return Sprite_UIElement;

  }).call(this);
  PKD_SQS.link(Sprite_UIElement);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = PKD_SQS.Sprite_UIElement.prototype;
  _._init = function() {
    var e;
    this._prepare();
    try {
      return this._createContent();
    } catch (error) {
      e = error;
      KDCore.warning(e);
      // * Если при создании произошла ошибка, отключаем элемент
      return this.isActive = function() {
        return false;
      };
    }
  };
  
  // * Подготовка элемента (проверка параметров)
  _._prepare = function() {
    if (this.params == null) {
      this.params = this.defaultParams();
    }
    return this.visible = this.params.visible;
  };
  // * Наследники создают свои элементы в этом методе
  _._createContent = function() {}; // * EMPTY
  
  // * Сброс позиции
  _._resetPosition = function() {
    var x, y;
    ({x, y} = this.params.position);
    this.move(x, y);
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Plugin Paramters.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_SQS.PP;
  _.isNeedCommandInMenu = function() {
    return _._loader.getParam("isNeedMenuCommand", true);
  };
  _.isSortByNew = function() {
    return _._loader.getParam("isSortByNew", false);
  };
  _.isSortByActive = function() {
    return _._loader.getParam("isSortByActive", false);
  };
  _.menuCommandText = function() {
    return _._loader.getParam("menuCommandText", "Quests");
  };
  _.getQuestNotifyPosition = function() {
    return _._loader.getParam("journalNotifyPosition", {});
  };
  _.getQuestListWindowSettings = function() {
    return _._loader.getParam("questsListSettings", {});
  };
  _.getQuestHeaderSettings = function() {
    return _._loader.getParam("questHeaderSettings", {});
  };
  _.getQuestDescSettings = function() {
    return _._loader.getParam("questDescSettings", {});
  };
  _.getQuestTasksHeaderSettings = function() {
    return _._loader.getParam("questTaskHeaderSettings", {});
  };
  _.getGroupButtonA = function() {
    return _._loader.getParam("questGroupButtonA", {});
  };
  _.getGroupButtonB = function() {
    return _._loader.getParam("questGroupButtonB", {});
  };
  _.getQuestTasksSettings = function() {
    return _._loader.getParam("questsTasksSettings", {});
  };
  _.getQuestsArrows = function() {
    return _._loader.getParam("visualPointers", []);
  };
  _.getQuestListCursorMargins = function() {
    return _._loader.getParam("questsListCursor", {});
  };
  _.getQuestListActiveIconMargins = function() {
    return _._loader.getParam("questsListActive", {});
  };
  _.getQuestJournalBackImgPosition = function() {
    return _._loader.getParam("questJournalBackground", {});
  };
  _.getQuestActiveHelpImgPosition = function() {
    return _._loader.getParam("questJournalActiveHelp", {});
  };
  _.getQuestJournalSeparateLinePosition = function() {
    return _._loader.getParam("questJournalLine", {});
  };
  _.getQuestListNewMarkMargins = function() {
    return _._loader.getParam("questsListNewMark", {
      x: 2,
      y: 0
    });
  };
  _.getQuestJournalOpenButton = function() {
    return _._loader.getParam("buttonForOpenJournal", "j");
  };
  _.getDifficultyLevelSettings = function() {
    return _._loader.getParam("questDifficultyPosition", {
      x: "Graphics.width - 104",
      y: 85
    });
  };
  // * Это было добавлено с обновлением, поэтому параметров может и не быть, возвращаем null
  _.getQuestsCategories = function() {
    return _._loader.getParam("sqsQuestsCategories", null);
  };
  _.createAllQuests = function() {
    var i, len, q, quests, questsRaw;
    questsRaw = _._loader.getParam("sqsQuests", []);
    quests = [];
    for (i = 0, len = questsRaw.length; i < len; i++) {
      q = questsRaw[i];
      quests.push(new SQS_Quest(q));
    }
    return quests;
  };
  _.createAllPoints = function() {
    var i, len, p, points, questsPointsRaw;
    questsPointsRaw = _._loader.getParam("sqsPointers", []);
    points = [];
    for (i = 0, len = questsPointsRaw.length; i < len; i++) {
      p = questsPointsRaw[i];
      points.push(new SQS_Points(p));
    }
    return points;
  };
})();

// ■ END Plugin Paramters.coffee
//---------------------------------------------------------------------------

(function(){
    
    //@[ALIAS]
    var _alias_DataManager_loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase = function () {
        PKD_SQS.LoadPluginSettings();
        _alias_DataManager_loadDatabase.call(this);
    };

})();
// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  _.sqGetQuestsData = function() {
    if (this.sqQData == null) {
      this.sqQData = new SQS_Keep();
    }
    return this.sqQData;
  };
  // * Перенёс в Game_Temp, чтобы пересоздавались после загрузки игры из сохранения
  _.sqGetAllQuests = function() {
    if ($gameTemp.sqQuests == null) {
      $gameTemp.sqQuests = PKD_SQS.PP.createAllQuests();
    }
    return $gameTemp.sqQuests;
  };
  _.sqGetAllPoints = function() {
    if ($gameTemp.sqPoints == null) {
      $gameTemp.sqPoints = PKD_SQS.PP.createAllPoints();
    }
    return $gameTemp.sqPoints;
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------

(function(){
    
    ImageManager.loadPKDSQS = function (filename) {
        return this.loadBitmap('img/pSQSystem/', filename, 0, false);
    };

})();
// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__onMapLoaded, ALIAS__update, _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  //@[ALIAS]
  ALIAS__onMapLoaded = _.onMapLoaded;
  _.onMapLoaded = function() {
    ALIAS__onMapLoaded.call(this);
    SQSM.init(); //?
    this.loadSQSPoints();
    return this.loadSQSOpenButton();
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    return this.updateSQSOpenByButton();
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  _.loadSQSOpenButton = function() {
    this.sqsOpenButton = PKD_SQS.PP.getQuestJournalOpenButton();
    if (String.any(this.sqsOpenButton)) {
      this.updateSQSOpenByButton = this.updateSQSOpenByButtonBody;
    }
  };
  //?DYNAMIC
  _.updateSQSOpenByButton = function() {}; // * EMPTY
  _.updateSQSOpenByButtonBody = function() {
    if ($gameMessage.isBusy()) {
      return;
    }
    if ($gameMap.isEventRunning()) {
      return;
    }
    if (Input.isTriggered(this.sqsOpenButton)) {
      SQOpenQuestJournal();
    }
  };
  _.loadSQSPoints = function() {
    var activeQuests, arrowData, arrows, i, len, q, qIndex, questsWithPoints;
    this._spriteset.sqClearQuestNavigator();
    activeQuests = SQSM.getActiveQuests();
    if (activeQuests.length === 0) {
      return;
    }
    questsWithPoints = activeQuests.filter(function(q) {
      return SQSM.isQuestHavePoints(q.id);
    });
    //console.info questsWithPoints
    // * Каждая стрелка имеет свой индекс
    // * Каждому активному квесту соответствует своя стрелка (по индексу)
    arrows = SQSM.getQuestsArrows();
    for (i = 0, len = questsWithPoints.length; i < len; i++) {
      q = questsWithPoints[i];
      qIndex = SQSM.getQuestActiveIndex(q.id);
      if (qIndex >= 0) {
        arrowData = arrows[qIndex];
        if (arrowData != null) {
          this._createSQSArrowsForQuest(q, arrowData);
        }
      }
    }
  };
  _._createSQSArrowsForQuest = function(quest, arrowData) {
    var i, len, point, points, task, tasks;
    points = SQSM.getPointsForQuest(quest.id);
    if (!points.isHaveAnyPoints()) {
      return;
    }
    
    // * Текущие (не выполненные и видимые) задачи квеста, которые имеют точки
    tasks = quest.getTasksForPointers().filter(function(t) {
      return points.isHavePointsOnCurrentMap(t.index);
    });
    for (i = 0, len = tasks.length; i < len; i++) {
      task = tasks[i];
      point = points.getPointOnCurrentMap(task.index);
      this._createSQSArrowForQuestTask(point, arrowData);
    }
  };
  _._createSQSArrowForQuestTask = function(point, arrowData) {
    var plSprite, sq;
    plSprite = this._spriteset.findTargetSprite($gamePlayer);
    sq = new SQSQuestArrow(plSprite, arrowData.image, arrowData.color);
    sq.setTargetEvId(point);
    this._spriteset.sqAddOnQuestNavigator(sq);
  };
  //?{VERSION}
  _.showSQSNotify = function() {};
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Menu.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__createCommandWindow, _;
  //@[DEFINES]
  _ = Scene_Menu.prototype;
  //@[ALIAS]
  ALIAS__createCommandWindow = _.createCommandWindow;
  _.createCommandWindow = function() {
    ALIAS__createCommandWindow.call(this);
    this._commandWindow.setHandler('sqsJournal', SQSM.OpenQuestJournal);
  };
})();

// ■ END Scene_Menu.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
var Scene_SQSJournal;

Scene_SQSJournal = class Scene_SQSJournal extends Scene_MenuBase {
  constructor() {
    super();
  }

  create() {
    super.create();
    this._createBackground();
    this._createSepLine();
    this._createWindows();
    this._createHelpText();
    return this._onGroupClick(0);
  }

  update() {
    super.update();
    this._refreshSelectedQuestInfo();
    return this._updateNavigation();
  }

  stop() {
    this.ql.clearQuestMarks();
    return super.stop();
  }

  setQuestInfo(questData) {
    this._clearQuestInfo();
    this.activeQuestData = questData;
    if (this.activeQuestData != null) {
      this._showActiveQuestData();
    }
  }

  _createBackground() {
    var backSprite, pos, x, y;
    pos = PKD_SQS.PP.getQuestJournalBackImgPosition();
    x = eval(pos.x);
    y = eval(pos.y);
    backSprite = new Sprite(ImageManager.loadPKDSQS("JournalBackground"));
    backSprite.move(x, y);
    return this.addChild(backSprite);
  }

  _createSepLine() {
    var lineSprite, pos, x, y;
    pos = PKD_SQS.PP.getQuestJournalSeparateLinePosition();
    x = eval(pos.x);
    y = eval(pos.y);
    lineSprite = new Sprite(ImageManager.loadPKDSQS("Line"));
    lineSprite.move(x, y);
    return this.addChild(lineSprite);
  }

  _createWindows() {
    this._createCategories(); //?part 2, это группы текущие \ выполненные
    this._createQuestsList();
    this._createQuestMain();
    this._createQuestsCategories(); //?part 3 [PRO only]
  }

  _createQuestsCategories() {} // * EMPTY

  _createQuestsList() {
    var params, rect, textLineSettings, x, y;
    params = PKD_SQS.PP.getQuestListWindowSettings();
    textLineSettings = {
      w: eval(params.textLine.lineSize.w),
      h: eval(params.textLine.lineSize.h),
      fontFace: params.textLine.face,
      fontSize: params.textLine.size
    };
    x = eval(params.position.x);
    y = eval(params.position.y);
    rect = new Rectangle(x, y, textLineSettings.w, params.height);
    this.ql = new Window_SQSQuestsList(rect);
    this.ql.setSettings(textLineSettings);
    this.ql.setHandler('cancel', this.popScene.bind(this));
    this.ql.setHandler('ok', this.changeActiveQuest.bind(this));
    this.ql.refresh();
    this.ql.activate();
    this._refreshEmptyJournalHolder();
    this.addChild(this.ql);
  }

  changeActiveQuest() {
    var q, state;
    if (!this.ql.isCurrentItemEnabled()) {
      return;
    }
    q = this.ql.quest();
    state = SQSM.isQuestActive(q.id);
    SQSM.SetActiveQuest(q.id, !state);
    this.ql.refresh();
    this.ql.activate();
  }

  _refreshSelectedQuestInfo() {
    var newSelectedQuest;
    if (this.ql == null) {
      return;
    }
    newSelectedQuest = this.ql.quest();
    if (this._lastSelectedQuest !== newSelectedQuest) {
      this.setQuestInfo(newSelectedQuest);
      this._lastSelectedQuest = newSelectedQuest;
    }
  }

  _createHelpText() {
    var pos, x, y;
    pos = PKD_SQS.PP.getQuestActiveHelpImgPosition();
    x = eval(pos.x);
    y = eval(pos.y);
    this._activeHelp = new Sprite(ImageManager.loadPKDSQS("ActiveHelp"));
    this._activeHelp.move(x, y);
    this._activeHelp.visible = false;
    return this.addChild(this._activeHelp);
  }

  _updateNavigation() {
    if (Input.isTriggered('left') || Input.isTriggered('right')) {
      this._onSwitchGroup();
    }
  }

  _onSwitchGroup() {
    if (this.groupA.isDisabled()) {
      this._onGroupClick(1);
    } else {
      this._onGroupClick(0);
    }
  }

};

// Generated by CoffeeScript 2.5.1
var SQSQuestArrow;

SQSQuestArrow = class SQSQuestArrow extends Sprite {
  constructor(plSprite, arrowImg, arrowColor) {
    super();
    this.plSprite = plSprite;
    this.bitmap = ImageManager.loadPKDSQS(arrowImg);
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.resetAfterTarget();
    if ((arrowColor != null) || String.any(arrowColor)) {
      this.applyArrowColor(arrowColor);
    }
    return;
  }

  setTargetEvId(id) {
    if (id <= 0) {
      this.tarEv = null;
    }
    this.tarEv = $gameMap.event(id);
    this.visible = this.tarEv != null;
    if (this.tarEv != null) {
      this.distThread = new KDCore.TimedUpdate(10, this.updateDistanceToTarget.bind(this));
    } else {
      this.resetAfterTarget();
    }
  }

  resetAfterTarget() {
    this.distThread = null;
    this.resetArrowOpacity();
    return this.visible = false;
  }

  applyArrowColor(arrowColor) {
    //arrowColor = KDCore.Color.FromHex(hexColor)
    this.arrColor = [...arrowColor.ARR];
    this.arrColor[3] = 150;
    this.setBlendColor(this.arrColor);
  }

  resetArrowOpacity() {
    return this.opacity = 120;
  }

  update() {
    super.update();
    if (this.visible === false) {
      return;
    }
    this.move(this.plSprite.x, this.plSprite.y - 24);
    if (this.tarEv == null) {
      return;
    }
    this.updateRotationToTarget();
    return this.distThread.update();
  }

  updateRotationToTarget() {
    if (this._rotTimer == null) {
      this._rotTimer = 2;
    }
    this._rotTimer--;
    if (this._rotTimer <= 0) {
      this.rotation = Math.atan2(this.y - this.tarEv.screenY(), this.x - this.tarEv.screenX());
      this._rotTimer = 2;
    }
  }

  updateDistanceToTarget() {
    var dist;
    dist = $gameMap.distance($gamePlayer.x, $gamePlayer.y, this.tarEv.x, this.tarEv.y);
    //console.log(dist)
    if (dist > 24) {
      this.resetArrowOpacity();
      return;
    }
    if (dist <= 1) {
      this.opacity = 0;
      return;
    }
    //@markTarget()
    if (dist < 2) {
      this.opacity = 255;
      return;
    }
    this.resetArrowOpacity();
    this.opacity += 200 / dist;
  }

  //console.log(@opacity)
  markTarget() {
    var original, targetSprite;
    targetSprite = SceneManager._scene._spriteset.findTargetSprite(this.tarEv);
    if (targetSprite == null) {
      return;
    }
    original = targetSprite.getBlendColor();
    targetSprite.setBlendColor(this.arrColor);
    targetSprite._sqBlended = true;
    setTimeout((function() {
      return targetSprite.setBlendColor(original);
    }), 200);
  }

};

// Generated by CoffeeScript 2.5.1
//1:41
var Sprite_SQSNotifyLine;

Sprite_SQSNotifyLine = class Sprite_SQSNotifyLine extends Sprite {
  constructor() {
    super(ImageManager.loadPKDSQS("questJournalUpdated"));
    this.opacity = 0;
    this.fullVisisble = false;
    this.fadeOutTimer = 140;
    this.isDone = false;
    this.moveByParameters();
    return;
  }

  moveByParameters() {
    var params, x, y;
    params = PKD_SQS.PP.getQuestNotifyPosition();
    x = eval(params.x);
    y = eval(params.y);
    return this.move(x, y);
  }

  update() {
    super.update();
    if (this.visible === false) {
      return;
    }
    if (this.fullVisisble === false) {
      return this.updateShowUpOpacity();
    } else {
      return this.updateFadeOutTimer();
    }
  }

  updateShowUpOpacity() {
    this.opacity += 6;
    if (this.opacity >= 255) {
      return this.fullVisisble = true;
    }
  }

  updateFadeOutTimer() {
    this.fadeOutTimer--;
    if (this.fadeOutTimer <= 40) {
      this.opacity -= 8;
    }
    if (this.fadeOutTimer <= 0) {
      this.opacity = 0;
      return this.visible = false;
    }
  }

};

// Generated by CoffeeScript 2.5.1
var Sprite_SQSTaskLine;

Sprite_SQSTaskLine = class Sprite_SQSTaskLine extends Sprite {
  constructor(task) {
    super();
    this.task = task;
    this.params = PKD_SQS.PP.getQuestTasksSettings();
    this._createTaskStatusIcon();
    this._createTaskText();
    return;
  }

  _createTaskStatusIcon() {
    var iconImage, taskIcon, x, y;
    x = eval(this.params.position.x);
    y = eval(this.params.position.y);
    iconImage = "Task_A";
    if (this.task.isComplete()) {
      iconImage = "Task_B";
    }
    taskIcon = new Sprite(ImageManager.loadPKDSQS(iconImage));
    this.addChild(taskIcon);
    taskIcon.move(x, y);
  }

  _createTaskText() {
    var taskText, textSize;
    textSize = this.params.textLine.lineSize;
    taskText = new Sprite_SQSTextLine(this.task.text, {
      w: eval(textSize.w),
      h: eval(textSize.h),
      fontFace: this.params.textLine.face,
      fontSize: this.params.textLine.size
    });
    // * Позиция задаётся в массиве поизиций, поэтому нет доп. смещения самого текста
    return this.addChild(taskText);
  }

};

// Generated by CoffeeScript 2.5.1
var Sprite_SQSTextLine;

Sprite_SQSTextLine = class Sprite_SQSTextLine extends Sprite {
  //? settings = {w, h, fontSize, fontFace}
  constructor(text, textSettings) {
    super();
    this.textSettings = textSettings;
    this._createTextBaseWindow();
    this.setText(text);
    return;
  }

  setText(text1) {
    this.text = text1;
    return this.refreshText();
  }

  _createTextBaseWindow() {
    var fontFace, fontSize, h, w;
    ({w, h, fontSize, fontFace} = this.textSettings);
    this.tWindow = new Window_SQSTextBase(new Rectangle(0, 0, w, h), fontSize, fontFace);
    return this.addChild(this.tWindow);
  }

  refreshText() {
    this.tWindow.contents.clear();
    return this.tWindow.drawTextExWithWordWrap(this.text, 0, 0, this.tWindow.width);
  }

};

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__createTilemap, _;
  //@[DEFINES]
  _ = Spriteset_Map.prototype;
  //@[ALIAS]
  ALIAS__createTilemap = _.createTilemap;
  _.createTilemap = function() {
    ALIAS__createTilemap.call(this);
    return this.sqCreateQuestNavigatorLayer();
  };
})();

// ■ END Spriteset_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Spriteset_Map.prototype;
  _.sqAddOnQuestNavigator = function(sprite) {
    return this._sqLayer01.addChild(sprite);
  };
  _.sqCreateQuestNavigatorLayer = function() {
    this._sqLayer01 = new Sprite();
    this._sqLayer01.z = 1;
    this._tilemap.addChild(this._sqLayer01);
    // * Чтобы каждый кадр не считать, создадим переменные
    this.__tw = $gameMap.tileWidth();
    this.__tw2 = this.__tw / 2;
    this.__th = $gameMap.tileHeight();
  };
  _.sqClearQuestNavigator = function() {
    var c, i, len, ref;
    ref = this._sqLayer01.children;
    for (i = 0, len = ref.length; i < len; i++) {
      c = ref[i];
      if (c != null) {
        c.visible = false;
      }
      this._sqLayer01.removeChild(c);
    }
  };
})();

// ■ END Spriteset_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Данный класс отвечает за хранение данных у игрока (сохранение состояний)
var SQS_Keep;

SQS_Keep = class SQS_Keep {
  constructor() {
    this.reset();
  }

  reset() {
    this._completedQuests = [];
    this._visibleQuests = [];
    this._newQuests = [];
    // * ID квеста = массив выполненных задач
    this._questCompleteTasksStatuses = {};
    // * ID квеста = массив видимых задач
    this._questVisibleTasksStatuses = {};
    // * ID квеста = номер видимого описания
    this._questVisibleDescription = {};
    // * ID квестов, которые установленны активными
    // * Статический массив, т.е. работа с индексами
    this._activeQuests = [];
  }

  isAddedQuest(questId) {
    return this._visibleQuests.contains(questId);
  }

  isCompleteQuest(questId) {
    return this._completedQuests.contains(questId);
  }

  isActiveQuest(questId) {
    return this._activeQuests.contains(questId);
  }

  isTaskVisible(questId, index) {
    var data;
    if (index === 0) {
      // * Первая задача всегда видима!
      return true;
    }
    data = this._questVisibleTasksStatuses[questId];
    if (data == null) {
      return false;
    }
    return this._questVisibleTasksStatuses[questId].contains(index);
  }

  isTaskComplete(questId, index) {
    var data;
    data = this._questCompleteTasksStatuses[questId];
    if (data == null) {
      return false;
    }
    return this._questCompleteTasksStatuses[questId].contains(index);
  }

  getQuestDescriptionIndex(questId) {
    if (this._questVisibleDescription[questId] == null) {
      // * Первое описание видно всегда (базовое)
      return 0;
    }
    return this._questVisibleDescription[questId];
  }

  //{VERSION}
  setActiveQuest(questId) {
    if (this.isActiveQuest(questId)) {
      return;
    }
    this._activeQuests[0] = questId;
  }

  removeActiveQuest(questId) {
    var index;
    if (!this.isActiveQuest(questId)) {
      return;
    }
    index = this.getActiveQuestIndex(questId);
    if (index >= 0) {
      this._activeQuests[index] = null;
    }
  }

  getActiveQuestIndex(questId) {
    if (!this.isActiveQuest(questId)) {
      return -1;
    }
    return this._activeQuests.indexOf(questId);
  }

  addQuest(questId) {
    if (!this.isAddedQuest(questId)) {
      this._visibleQuests.push(questId);
      // * Пометка new
      return this.registerMarkForNewQuest(questId);
    }
  }

  registerMarkForNewQuest(questId) {
    if (this._newQuests == null) {
      // * Может и не быть, так как сохранение загруженно
      this._newQuests = [];
    }
    if (!this._newQuests.contains(questId)) {
      this._newQuests.push(questId);
    }
  }

  completeQuest(questId) {
    if (!this.isCompleteQuest(questId)) {
      return this._completedQuests.push(questId);
    }
  }

  setDescriptionForQuest(questId, index) {
    this._questVisibleDescription[questId] = index;
  }

  addVisibleTaskForQuest(questId, index) {
    if (this._questVisibleTasksStatuses[questId] == null) {
      this._questVisibleTasksStatuses[questId] = [];
    }
    if (!this._questVisibleTasksStatuses[questId].contains(index)) {
      this._questVisibleTasksStatuses[questId].push(index);
    }
  }

  completeTaskForQuest(questId, index) {
    if (this._questCompleteTasksStatuses[questId] == null) {
      this._questCompleteTasksStatuses[questId] = [];
    }
    if (!this._questCompleteTasksStatuses[questId].contains(index)) {
      this._questCompleteTasksStatuses[questId].push(index);
    }
  }

  clearMarkForNewQuest(questId) {
    if (this._newQuests == null) {
      return;
    }
    if (this._newQuests.contains(questId)) {
      this._newQuests.delete(questId);
    }
  }

  clearAllMarks() {
    return this._newQuests = [];
  }

  isQuestMarkedAsNew(questId) {
    if (this._newQuests == null) {
      return false;
    }
    return this._newQuests.contains(questId);
  }

};

// Generated by CoffeeScript 2.5.1
// * Главный менеджер квестов
window.SQSM = function() {};

SQSM.init = function() {
  $gamePlayer.sqGetAllQuests();
  $gamePlayer.sqGetQuestsData();
  $gamePlayer.sqGetAllPoints();
};

// * Все все квесты в игре
SQSM.quests = function() {
  return $gamePlayer.sqGetAllQuests();
};

// * Все квесты, которые есть у игрока (добавлены)
SQSM.playerCurrentQuests = function() {
  var e, quests;
  quests = SQSM.quests().filter(function(q) {
    return SQSM.isQuestVisible(q.id) && !SQSM.isQuestComplete(q.id);
  });
  try {
    quests.sort(KDCore.Utils.dynamicSort("-priority"));
  } catch (error) {
    e = error;
    console.warn(e);
  }
  return quests;
};

// * Все квесты, которые есть у игрока (добавленны) в определённой группе
SQSM.playerCurrentQuestsForCategory = function(catId) {
  var quests;
  quests = SQSM.playerCurrentQuests();
  // * Если пусто, без фильтра, все
  if (!String.any(catId)) {
    return quests;
  } else {
    // * Фильтр по группе
    return quests.filter(function(q) {
      return q.catId === catId;
    });
  }
};

// * Все квесты, которые есть у игрока (были выполнены)
SQSM.playerCompletedQuests = function() {
  var e, quests;
  quests = SQSM.quests().filter(function(q) {
    return SQSM.isQuestComplete(q.id);
  });
  try {
    quests.sort(KDCore.Utils.dynamicSort("-priority"));
  } catch (error) {
    e = error;
    console.warn(e);
  }
  return quests;
};

// * Все квесты, которые есть у игрока (были выполнены), в определённо группе
SQSM.playerCompletedQuestsForCategory = function(catId) {
  var quests;
  quests = SQSM.playerCompletedQuests();
  // * Если пусто, без фильтра, все
  if (!String.any(catId)) {
    return quests;
  } else {
    // * Фильтр по группе
    return quests.filter(function(q) {
      return q.catId === catId;
    });
  }
};

SQSM.keep = function() {
  return $gamePlayer.sqGetQuestsData();
};

SQSM.isQuestComplete = function(id) {
  return SQSM.keep().isCompleteQuest(id);
};

SQSM.isQuestVisible = function(id) {
  return SQSM.keep().isAddedQuest(id);
};

SQSM.isQuestActive = function(id) {
  return SQSM.keep().isActiveQuest(id);
};

SQSM.getActiveQuests = function() {
  return SQSM.playerCurrentQuests().filter(function(q) {
    return q.isActive();
  });
};

SQSM.getQuestActiveIndex = function(id) {
  if (SQSM.isQuestActive(id)) {
    return SQSM.keep().getActiveQuestIndex(id);
  } else {
    return -1;
  }
};

SQSM.points = function() {
  return $gamePlayer.sqGetAllPoints();
};

SQSM.getPointsForQuest = function(id) {
  return SQSM.points().find(function(p) {
    return p.questId === id;
  });
};

SQSM.isQuestHavePoints = function(id) {
  var points;
  points = SQSM.getPointsForQuest(id);
  if (points == null) {
    return false;
  }
  return points.isHaveAnyPoints();
};

SQSM.getQuestsArrows = function() {
  return PKD_SQS.PP.getQuestsArrows();
};

SQSM.onAnyQuestProgressChange = function() {
  // * not good way :)
  if (SceneManager._scene instanceof Scene_Map) {
    SceneManager._scene.loadSQSPoints();
    SQSM.showNotify();
  }
};

SQSM.showNotify = function() {
  var e;
  try {
    // * not good way
    if (!(SceneManager._scene instanceof Scene_Map)) {
      return;
    }
    SceneManager._scene.showSQSNotify();
  } catch (error) {
    e = error;
    console.warn(e);
  }
};

SQSM.clearQuestNewMark = function(id) {
  var e;
  try {
    SQSM.keep().clearMarkForNewQuest(id);
  } catch (error) {
    e = error;
    console.warn(e);
  }
};

SQSM.isQuestHaveNewMark = function(id) {
  var e;
  try {
    return SQSM.keep().isQuestMarkedAsNew(id);
  } catch (error) {
    e = error;
    console.warn(e);
  }
};

// * Вызовы скриптов
// * ============================================================================

// * Открыть журнал квестов
SQSM.OpenQuestJournal = function() {
  return SceneManager.push(Scene_SQSJournal);
};

// * Открыть (добавить) квест игроку
SQSM.AddQuest = function(id) {
  SQSM.keep().addQuest(id);
  SQSM.showNotify();
};

// * Начинаем с 1, а не с нуля
SQSM.ShowDescriptionForQuest = function(id, index) {
  SQSM.keep().setDescriptionForQuest(id, index - 1);
  SQSM.showNotify();
};

// * Начинаем с 1, а не с нуля
SQSM.ShowTaskForQuest = function(id, index) {
  SQSM.keep().addVisibleTaskForQuest(id, index - 1);
  SQSM.onAnyQuestProgressChange();
};

// * Начинаем с 1, а не с нуля
SQSM.CompleteTaskForQuest = function(id, index) {
  SQSM.keep().completeTaskForQuest(id, index - 1);
  if (SceneManager._scene instanceof Scene_Map) {
    if (SQSM.isQuestActive(id)) {
      SQSM.SetActiveQuest(id, false);
      SQSM.SetActiveQuest(id, true);
    }
  }
  SQSM.onAnyQuestProgressChange();
};

// * Добавить квест в группу выполненные квесты
SQSM.CompletQuest = function(id) {
  SQSM.keep().completeQuest(id);
  SQSM.SetActiveQuest(id, false);
  SQSM.onAnyQuestProgressChange();
};

// * Сделать квест активным (если true)
SQSM.SetActiveQuest = function(id, state = true) {
  if (state === true) {
    SQSM.keep().setActiveQuest(id);
  } else {
    SQSM.keep().removeActiveQuest(id);
  }
  SQSM.onAnyQuestProgressChange();
};

// * Удаляет квест (всю информацию, словно и не добавляли)
SQSM.ResetQuest = function(id) {
  var e, keep;
  try {
    if (this.isQuestActive(id)) {
      this.SetActiveQuest(id, false);
    }
    // * Remove all information about tasks
    keep = SQSM.keep();
    if ((keep._questVisibleTasksStatuses != null) && (keep._questVisibleTasksStatuses[id] != null)) {
      delete keep._questVisibleTasksStatuses[id];
    }
    if (keep._questCompleteTasksStatuses != null) {
      delete keep._questCompleteTasksStatuses[id];
    }
    // * Remove from completed
    keep._completedQuests.delete(id);
    // * Remove descriptions
    if (keep._questVisibleDescription != null) {
      delete keep._questVisibleDescription[id];
    }
    // * Remove other
    keep._visibleQuests.delete(id);
    keep._newQuests.delete(id);
  } catch (error) {
    e = error;
    KDCore.warning(e);
  }
};

// * Показать все задачи для квеста
SQSM.ShowAllTasksForQuest = function(id) {
  var e, i, j, quest, ref;
  try {
    quest = SQSM.quests().find(function(q) {
      return q.id === id;
    });
    for (i = j = 0, ref = quest.tasks.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
      SQSM.keep().addVisibleTaskForQuest(id, i);
    }
    SQSM.onAnyQuestProgressChange();
  } catch (error) {
    e = error;
    KDCore.warning(e);
  }
};

// Generated by CoffeeScript 2.5.1
var SQS_Points;

SQS_Points = class SQS_Points {
  constructor(questPointersData) {
    var i, len, ref, task;
    this.questId = questPointersData.questId;
    this.tasksPoints = [];
    ref = questPointersData.pointsData;
    for (i = 0, len = ref.length; i < len; i++) {
      task = ref[i];
      this.tasksPoints[task.taskIndex - 1] = task.points;
    }
    return;
  }

  isHavePointsForTask(taskIndex) {
    return this.tasksPoints[taskIndex] != null;
  }

  isHaveAnyPoints() {
    return this.tasksPoints.length > 0;
  }

  isHavePointsOnMapForTask(taskIndex, mapId) {
    var evId;
    if (this.isHavePointsForTask(taskIndex)) {
      evId = this.getPointOnMap(taskIndex, mapId);
      return evId > 0;
    }
    return false;
  }

  isHavePointsOnCurrentMap(taskIndex) {
    return this.isHavePointsOnMapForTask(taskIndex, $gameMap.mapId());
  }

  getPointOnMap(taskIndex, mapId) {
    var map, maps;
    if (this.isHavePointsForTask(taskIndex)) {
      maps = this.tasksPoints[taskIndex];
      map = maps.find(function(m) {
        return m.mapId === mapId;
      });
      if (map != null) {
        return map.evId;
      } else {
        return 0;
      }
    }
    return 0;
  }

  getPointOnCurrentMap(taskIndex) {
    return this.getPointOnMap(taskIndex, $gameMap.mapId());
  }

};

// Generated by CoffeeScript 2.5.1
var SQS_Quest;

SQS_Quest = class SQS_Quest {
  constructor(questData) {
    this.id = questData.id;
    this.title = questData.title;
    this.titleImage = questData.titleImage;
    this.titleForList = questData.titleForList;
    this.priority = questData.priority || 0;
    this.catId = questData.categoryId || "";
    this.difficulty = questData.difficulty || 0;
    this.tasks = [];
    this.createTasks(questData.tasks);
    this.createDescriptions(questData.descriptions);
    return;
  }

  //{VERSION}
  createTasks(tasksData) {
    var i, index, len, task;
    for (index = i = 0, len = tasksData.length; i < len; index = ++i) {
      task = tasksData[index];
      if (index < 4) {
        this.tasks.push(new SQS_Task(this.id, index, task));
      }
    }
  }

  //{VERSION}
  createDescriptions(descriptions) {
    this.descriptions = descriptions;
    if (this.descriptions.length > 4) {
      this.descriptions = this.descriptions.slice(0, 4);
    }
  }

  isComplete() {
    return SQSM.isQuestComplete(this.id);
  }

  isVisible() {
    return SQSM.isQuestVisible(this.id);
  }

  // * Активен в навигаторе (выбран для слежения)
  isActive() {
    return SQSM.isQuestActive(this.id);
  }

  getTask(index = 0) {
    return this.tasks[index];
  }

  getVisibleTasks() {
    return this.tasks.filter(function(t) {
      return t.isVisible();
    });
  }

  getTasksForPointers() {
    return this.getVisibleTasks().filter(function(t) {
      return !t.isComplete();
    });
  }

  getDescription(index = 0) {
    return this.descriptions[index];
  }

  getActiveDescription() {
    var description, index;
    index = SQSM.keep().getQuestDescriptionIndex(this.id);
    description = this.getDescription(index);
    if (String.any(description)) {
      return description;
    } else {
      return "You should add at least one description to Quest parameters!";
    }
  }

  getDifficulty() {
    return this.difficulty;
  }

};

// Generated by CoffeeScript 2.5.1
var SQS_Task;

SQS_Task = class SQS_Task {
  constructor(qid, index, text) {
    this.qid = qid;
    this.index = index;
    this.text = text;
  }

  isComplete() {
    return SQSM.keep().isTaskComplete(this.qid, this.index);
  }

  isVisible() {
    return SQSM.keep().isTaskVisible(this.qid, this.index);
  }

};

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_MenuCommand.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__addOriginalCommands, _;
  //@[DEFINES]
  _ = Window_MenuCommand.prototype;
  //@[ALIAS]
  ALIAS__addOriginalCommands = _.addOriginalCommands;
  _.addOriginalCommands = function() {
    ALIAS__addOriginalCommands.call(this);
    if (PKD_SQS.PP.isNeedCommandInMenu()) {
      this.addCommand(PKD_SQS.PP.menuCommandText(), 'sqsJournal', true);
    }
  };
})();

// ■ END Window_MenuCommand.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
var Window_SQSQuestsList;

Window_SQSQuestsList = class Window_SQSQuestsList extends Window_Selectable {
  constructor(rect, textLineSettings) {
    super(rect);
    this._group = 0;
    this._category = ""; // * All
    this._data = [];
    this._prepareParams();
    this.setBackgroundType(2);
    this._createExtraCursor();
    return;
  }

  setGroup(_group) {
    this._group = _group;
    this.refresh();
    if (this.maxItems() === 0) {
      return this.select(-1);
    } else {
      return this.select(0);
    }
  }

  setCategory(_category) {
    this._category = _category;
    return this.setGroup(this._group);
  }

  maxItems() {
    if (this._data != null) {
      return this._data.length;
    } else {
      return 0;
    }
  }

  rowSpacing() {
    return 0;
  }

  select(index) {
    super.select(index);
    this._checkMarkViewedForClear(index);
    return this.refresh();
  }

  quest() {
    return this.questAt(this.index());
  }

  questAt(index) {
    if ((this._data != null) && index >= 0) {
      return this._data[index];
    } else {
      return null;
    }
  }

  isCurrentItemEnabled() {
    return this.isEnabled(this.quest());
  }

  drawItemBackground(index) {} // * nothing

  
    // * Если мы в текущих заданиях, то используется для проверки можно ли задать квест активным
  // * т.е. если у него путевые точки
  isEnabled(quest) {
    if (quest == null) {
      return false;
    }
    if (this._group === 0) {
      return SQSM.isQuestHavePoints(quest.id);
    } else {
      return false;
    }
  }

  makeItemList() {
    if (this._group === 0) {
      this._data = SQSM.playerCurrentQuestsForCategory(this._category);
    } else {
      this._data = SQSM.playerCompletedQuestsForCategory(this._category);
    }
    this._applySortings();
  }

  drawItem(index) {
    var quest, rect;
    quest = this.questAt(index);
    if (quest == null) {
      return;
    }
    if (this.index() !== index) {
      this.contents.paintOpacity = 120;
    } else {
      this.changePaintOpacity(true); //@isEnabled(quest)
    }
    rect = this.itemRect(index);
    this.drawTextEx(quest.titleForList, rect.x, rect.y, rect.width);
    if (SQSM.isQuestActive(quest.id)) {
      this.drawQuestActiveSymbol(quest, rect);
    }
    if (SQSM.isQuestHaveNewMark(quest.id) && this._group === 0) {
      this.drawQuestNewMark(rect);
    }
  }

  drawQuestActiveSymbol(quest, rect) {
    var actSym, arrow, bc, dx, dy, index;
    dx = rect.x + this._activeQuestMargins.x;
    dy = rect.y + this._activeQuestMargins.y;
    actSym = new Sprite(this._curActBitmap);
    actSym.x = dx;
    actSym.y = dy;
    this.addChild(actSym);
    this._activeSymbols.push(actSym);
    index = SQSM.getQuestActiveIndex(quest.id);
    if (index < 0) {
      return;
    }
    arrow = SQSM.getQuestsArrows()[index];
    bc = [...arrow.color.ARR];
    bc[3] = 150;
    actSym.setBlendColor(bc);
  }

  drawQuestNewMark(rect) {} // * EMPTY, PRO only

  refresh() {
    this._clearActiveFlags();
    this._clearNewMarks();
    this.makeItemList();
    return super.refresh();
  }

  // * Вызывается, когда сцена закрывается (из сцены)
  clearQuestMarks() {
    var i, len, q, ref;
    if (this._questsForClearMarks == null) {
      return;
    }
    ref = this._questsForClearMarks;
    for (i = 0, len = ref.length; i < len; i++) {
      q = ref[i];
      SQSM.clearQuestNewMark(q);
    }
  }

  resetFontSettings() {
    super.resetFontSettings();
    if (this.textLineSettings == null) {
      return;
    }
    if (String.any(this.textLineSettings.fontFace)) {
      this.contents.fontFace = this.textLineSettings.fontFace;
    }
    if (this.textLineSettings.fontSize > 0) {
      this.contents.fontSize = this.textLineSettings.fontSize;
    }
  }

  _refreshCursor() {} // * EMPTY

  _updateCursor() {
    super._updateCursor();
    this._curSpr.visible = this._cursorSprite.visible;
    if (this._curSpr.visible === true) {
      this._curSpr.visible = this.maxItems() > 0;
    }
    this._curSpr.y = this._cursorSprite.y + this._cursorMargins.y;
    this._curSpr.x = this._cursorSprite.x + this._cursorMargins.x;
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Window_SQSQuestsList.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Window_SQSQuestsList.prototype;
  _._prepareParams = function() {
    var _activeQuestMargins, _cursorMargins, _newMarkMargins;
    _cursorMargins = PKD_SQS.PP.getQuestListCursorMargins();
    _activeQuestMargins = PKD_SQS.PP.getQuestListActiveIconMargins();
    _newMarkMargins = PKD_SQS.PP.getQuestListNewMarkMargins();
    this._cursorMargins = {
      x: eval(_cursorMargins.x),
      y: eval(_cursorMargins.y)
    };
    this._activeQuestMargins = {
      x: eval(_activeQuestMargins.x),
      y: eval(_activeQuestMargins.y)
    };
    this._newMarkMargins = {
      x: eval(_newMarkMargins.x),
      y: eval(_newMarkMargins.y)
    };
  };
  _._clearActiveFlags = function() {
    var i, item, len, ref;
    if (this._activeSymbols == null) {
      this._activeSymbols = [];
    }
    ref = this._activeSymbols;
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      item.visible = false;
      this.removeChild(item);
    }
    this._activeSymbols = [];
  };
  _._clearNewMarks = function() {
    var i, item, len, ref;
    if (this._newMarks == null) {
      this._newMarks = [];
    }
    ref = this._newMarks;
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      item.visible = false;
      this.removeChild(item);
    }
    this._newMarks = [];
  };
  _.setSettings = function(textLineSettings1) {
    var h;
    this.textLineSettings = textLineSettings1;
    this.resetFontSettings();
    h = this.textLineSettings.h;
    this.lineHeight = function() {
      return h;
    };
  };
  _._createExtraCursor = function() {
    if (KDCore.isMV()) {
      this._cursorSprite = this._windowCursorSprite;
    }
    this._curActBitmap = ImageManager.loadPKDSQS("Quest_Active");
    this._curMarkNewBitmap = ImageManager.loadPKDSQS("Quest_New");
    this._curMarkNewBitmap.addLoadListener(() => {
      var e;
      try {
        return this.refresh();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    });
    this._curSpr = new Sprite(ImageManager.loadPKDSQS("Quest_Selected"));
    this.addChild(this._curSpr);
  };
  // * Отмечаем, что данный квест был просмотрен, т.е. надо снять с него статус "новый"
  _._checkMarkViewedForClear = function(index) {
    var quest;
    if (index < 0) {
      return;
    }
    quest = this.questAt(index);
    if (quest == null) {
      return;
    }
    if (this._questsForClearMarks == null) {
      this._questsForClearMarks = [];
    }
    this._questsForClearMarks.push(quest.id);
  };
  _._applySortings = function() {
    if (PKD_SQS.PP.isSortByNew()) {
      this._sortByNewQuests();
    }
    if (PKD_SQS.PP.isSortByActive()) {
      this._sortByActiveFirst();
    }
  };
  _._sortByNewQuests = function() {
    var i, j, k, lastAddedQuests, len, len1, len2, newDataPre, q, ref, ref1;
    // * Сортировка (новые сперва вверху)
    lastAddedQuests = [];
    newDataPre = [];
    ref = this._data;
    for (i = 0, len = ref.length; i < len; i++) {
      q = ref[i];
      if (SQSM.isQuestHaveNewMark(q.id)) {
        lastAddedQuests.push(q);
      }
    }
    for (j = 0, len1 = lastAddedQuests.length; j < len1; j++) {
      q = lastAddedQuests[j];
      newDataPre.push(q);
    }
    ref1 = this._data;
    for (k = 0, len2 = ref1.length; k < len2; k++) {
      q = ref1[k];
      if (!newDataPre.contains(q)) {
        newDataPre.push(q);
      }
    }
    this._data = newDataPre;
  };
  _._sortByActiveFirst = function() {
    var activateQuests, i, j, k, len, len1, len2, newData, q, ref, ref1;
    // * Сортировка (aктивные вверху)
    activateQuests = [];
    newData = [];
    ref = this._data;
    for (i = 0, len = ref.length; i < len; i++) {
      q = ref[i];
      if (SQSM.isQuestActive(q.id)) {
        activateQuests.push(q);
      }
    }
    for (j = 0, len1 = activateQuests.length; j < len1; j++) {
      q = activateQuests[j];
      newData.push(q);
    }
    ref1 = this._data;
    for (k = 0, len2 = ref1.length; k < len2; k++) {
      q = ref1[k];
      if (!newData.contains(q)) {
        newData.push(q);
      }
    }
    this._data = newData;
  };
})();

// ■ END Window_SQSQuestsList.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
var Window_SQSTextBase;

Window_SQSTextBase = class Window_SQSTextBase extends Window_Base {
  constructor(rect, fontSize, fontFace) {
    super(rect);
    this.fontSize = fontSize;
    this.fontFace = fontFace;
    this.createContents();
    this.setBackgroundType(2);
  }

  updatePadding() {
    return this.padding = 0;
  }

  itemPadding() {
    return 0;
  }

  resetFontSettings() {
    super.resetFontSettings();
    if (String.any(this.fontFace)) {
      this.contents.fontFace = this.fontFace;
    }
    if (this.fontSize > 0) {
      this.contents.fontSize = this.fontSize;
    }
  }

};

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_SQSJournal.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_SQSJournal.prototype;
  _._clearQuestInfo = function() {
    var ref, ref1;
    this.qiTitleImage.visible = false;
    this.qiTitleText.setText("");
    this.qiDesc.setText("");
    this.qiTasksHeader.visible = false;
    if (this.qiTasks != null) {
      this.removeChild(this.qiTasks);
      this._createQuestTasks(); // * Пересоздаём холдер
    }
    if ((ref = this._activeHelp) != null) {
      ref.visible = false;
    }
    if ((ref1 = this._difficultyLevel) != null) {
      ref1.visible = false;
    }
  };
  _._showActiveQuestData = function() {
    var descText, descrpt, e, e2;
    if (String.any(this.activeQuestData.titleImage)) {
      this.qiTitleImage.visible = true;
      this.qiTitleImage.bitmap = ImageManager.loadPKDSQS(this.activeQuestData.titleImage);
    }
    this.qiTitleText.setText(this.activeQuestData.title);
    descrpt = this.activeQuestData.getActiveDescription();
    try {
      descText = JsonEx.parse(descrpt);
    } catch (error) {
      e = error;
      try {
        descText = JsonEx.parse('"' + descrpt + '"');
      } catch (error) {
        e2 = error;
        descText = "Something wrong with Description text, maybe you lost quotes";
      }
    }
    this.qiDesc.setText(descText);
    this.qiTasksHeader.visible = true;
    this._showActiveTasks();
    this._showQuestDifficulty();
    this._refreshActiveHelp();
  };
  //?VERSION
  _._showQuestDifficulty = function() {}; // * EMPTY
  _._showActiveTasks = function() {
    var i, index, len, params, posArray, task, tasks;
    params = PKD_SQS.PP.getQuestTasksSettings();
    posArray = params.positions.map(function(p) {
      return [eval(p.x), eval(p.y)];
    });
    tasks = this.activeQuestData.getVisibleTasks();
    //TODO: Сортировка по выполненным? Или просто по добавленным
    tasks.reverse();
    for (index = i = 0, len = tasks.length; i < len; index = ++i) {
      task = tasks[index];
      if (index < posArray.length) {
        this._showNextTask(task, posArray[index]);
      }
    }
  };
  _._showNextTask = function(task, pos) {
    var taskItem;
    taskItem = new Sprite_SQSTaskLine(task);
    taskItem.move(pos[0], pos[1]);
    return this.qiTasks.addChild(taskItem);
  };
  _._createQuestMain = function() {
    this._createQuestTitle();
    this._createQuestDescription();
    this._createQuestTasksHeader();
    this._createQuestTasks();
    this._createDifficultyLevel();
    return this._clearQuestInfo();
  };
  _._createQuestTitle = function() {
    var imgX, imgY, params, textSize, x, y;
    params = PKD_SQS.PP.getQuestHeaderSettings();
    this.qiTitleImage = new Sprite();
    imgX = eval(params.position2.x);
    imgY = eval(params.position2.y);
    this.qiTitleImage.move(imgX, imgY);
    this.addChild(this.qiTitleImage);
    textSize = params.textLine.lineSize;
    this.qiTitleText = new Sprite_SQSTextLine("", {
      w: eval(textSize.w),
      h: eval(textSize.h),
      fontFace: params.textLine.face,
      fontSize: params.textLine.size
    });
    x = eval(params.position.x);
    y = eval(params.position.y);
    this.qiTitleText.move(x, y);
    this.addChild(this.qiTitleText);
  };
  _._createQuestDescription = function() {
    var params, textSize, x, y;
    params = PKD_SQS.PP.getQuestDescSettings();
    //TODO: Проверял область описания, 140 высоты хватило
    //@xx = KDCore.Sprite.FromBitmap(460, 140)
    //@xx.fillAll()
    //@xx.move 240, 160
    //@addChild @xx
    textSize = params.textLine.lineSize;
    this.qiDesc = new Sprite_SQSTextLine("", {
      w: eval(textSize.w),
      h: eval(textSize.h),
      fontFace: params.textLine.face,
      fontSize: params.textLine.size
    });
    x = eval(params.position.x);
    y = eval(params.position.y);
    this.qiDesc.move(x, y);
    return this.addChild(this.qiDesc);
  };
  _._createQuestTasksHeader = function() {
    var params, x, y;
    params = PKD_SQS.PP.getQuestTasksHeaderSettings();
    this.qiTasksHeader = new Sprite(ImageManager.loadPKDSQS("tasksHeader"));
    x = eval(params.x);
    y = eval(params.y);
    this.qiTasksHeader.move(x, y);
    this.addChild(this.qiTasksHeader);
  };
  _._createQuestTasks = function() {
    this.qiTasks = new Sprite(); // * holder
    this.addChild(this.qiTasks);
  };
  _._createDifficultyLevel = function() {
    var params, x, y;
    this._difficultyLevel = new Sprite();
    params = PKD_SQS.PP.getDifficultyLevelSettings();
    x = eval(params.x);
    y = eval(params.y);
    this._difficultyLevel.move(x, y);
    this.addChild(this._difficultyLevel);
  };
  _._refreshActiveHelp = function() {
    return this._activeHelp.visible = this.ql.isCurrentItemEnabled();
  };
})();

// ■ END Scene_SQSJournal.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_SQSJournal.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_SQSJournal.prototype;
  _._createCategories = function() {
    var paramsA, paramsB, x, y;
    this.groupA = new KDCore.ButtonM("GroupA", true, "pSQSystem");
    this.groupB = new KDCore.ButtonM("GroupB", true, "pSQSystem");
    this.addChild(this.groupA);
    this.addChild(this.groupB);
    this.groupA.addClickHandler(() => {
      return this._onGroupClick(0);
    });
    this.groupB.addClickHandler(() => {
      return this._onGroupClick(1);
    });
    // * По умолчанию включена (выбрана)
    this.groupA.disable();
    paramsA = PKD_SQS.PP.getGroupButtonA();
    x = eval(paramsA.x);
    y = eval(paramsA.y);
    this.groupA.move(x, y);
    paramsB = PKD_SQS.PP.getGroupButtonB();
    x = eval(paramsB.x);
    y = eval(paramsB.y);
    this.groupB.move(x, y);
  };
  _._onGroupClick = function(index) {
    if (index === 0) {
      this.groupA.disable();
      this.groupB.enable();
    } else {
      this.groupB.disable();
      this.groupA.enable();
    }
    this.ql.setGroup(index);
    this._refreshEmptyJournalHolder();
  };
  _._refreshEmptyJournalHolder = function() {
    if (this.ql.maxItems() <= 0) {
      return this._showEmptyJournalHolder();
    } else {
      return this._hideEmptyJournalHolder();
    }
  };
  _._showEmptyJournalHolder = function() {
    var image;
    if (this.emptyJournalHolder == null) {
      this.emptyJournalHolder = new Sprite();
      image = ImageManager.loadPKDSQS("noQuestsHolder");
      image.addLoadListener(() => {
        this.emptyJournalHolder.x = Graphics.width / 2 - image.width / 2;
        return this.emptyJournalHolder.y = Graphics.height / 2 - image.height / 2;
      });
      this.emptyJournalHolder.bitmap = image;
      this.addChild(this.emptyJournalHolder);
    }
    return this.emptyJournalHolder.visible = true;
  };
  _._hideEmptyJournalHolder = function() {
    if (this.emptyJournalHolder == null) {
      return;
    }
    return this.emptyJournalHolder.visible = false;
  };
})();

// ■ END Scene_SQSJournal.coffee
//---------------------------------------------------------------------------

(function(){
    
        // * В MV в этом методе позиция присваивается
        Window_SQSQuestsList.prototype._refreshCursor = function() {
            if(!KDCore.isMV()) return;
            var pad = this._padding;
            var x = this._cursorRect.x + pad - this.origin.x;
            var y = this._cursorRect.y + pad - this.origin.y;
            var w = this._cursorRect.width;
            var h = this._cursorRect.height;
            var m = 4;
            var x2 = Math.max(x, pad);
            var y2 = Math.max(y, pad);
            var ox = x - x2;
            var oy = y - y2;
            var w2 = Math.min(w, this._width - pad - x2);
            var h2 = Math.min(h, this._height - pad - y2);
            var bitmap = new Bitmap(w2, h2);

            this._windowCursorSprite.bitmap = bitmap;
            this._windowCursorSprite.setFrame(0, 0, w2, h2);
            this._windowCursorSprite.move(x2, y2);
    };

})();
//Plugin PKD_SimpleQuestSystem automatic build by PKD PluginBuilder 1.9.2 03.02.2022
