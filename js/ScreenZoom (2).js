//=============================================================================
// Plugin for RPG Maker MZ
// ScreenZoom.js
//=============================================================================
// [Update History]
// 2020.Jul.04 Ver1.0.0 First Release
// 2021.Jun.02 Ver1.1.0 When scene changes and return to map, resume zoom rate.
//  (ズーム中にメニューや戦闘、セーブが行われた際でも
//   マップに戻るとズームが維持されます）
// 2022.Sep.22 Ver1.1.1 Bug Fix: When screen fade out, picture wasn't it.

/*:
 * @target MZ
 * @plugindesc [Ver1.1.1]Zoom screen whose center is specified character or player.
 * @author Sasuke KANNAZUKI
 *
 * @command set
 * @text Set Zoom
 * @desc Start Zoom Up
 *
 * @arg EventId
 * @text Center Event ID
 * @desc Set -1 when it sets player. Set 0 to set current event.
 * @type number
 * @min -1
 * @default -1
 *
 * @arg OffsetX
 * @desc move center x-coord this pixel
 * @type number
 * @min -9999
 * @default 0
 *
 * @arg OffsetY
 * @desc move center y-coord this pixel
 * @type number
 * @min -9999
 * @default 0
 *
 * @arg scale
 * @text Scale
 * @desc It can set 2 place of decimals
 * @decimals 2
 * @type number
 * @min 1.00
 * @default 1.00
 *
 * @arg FramesToZoom
 * @desc Frames until zoom finisied.
 * Set 1 to zoom immidiately
 * @type number
 * @default 1
 *
 * @arg isPictureZoom
 * @text Zoom also pictures?
 * @desc 
 * @on Yes
 * @off No
 * @type boolean
 * @default false
 *
 * @command Zoom200
 * @text Zoom 200%
 * @desc Custom. display and vanish without wait.
 *
 * @arg EventId
 * @text Center Event ID
 * @desc Set -1 when it sets player. Set 0 to current event.
 * @type number
 * @min -1
 * @default -1
 *
 * @arg isPictureZoom
 * @text Zoom also pictures?
 * @desc 
 * @on Yes
 * @off No
 * @type boolean
 * @default false
 *
 * @command Zoom300
 * @text Zoom 300%
 * @desc Custom. display and vanish without wait.
 *
 * @arg EventId
 * @text Center Event ID
 * @desc Set -1 when it sets player. Set 0 to set current event.
 * @type number
 * @min -1
 * @default -1
 *
 * @arg isPictureZoom
 * @text Zoom also pictures?
 * @desc 
 * @on Yes
 * @off No
 * @type boolean
 * @default false
 *
 * @command reset
 * @text ResetZoom
 * @desc Reset Zoom immediately
 *
 * @help 
 * This plugin runs under RPG Maker MZ.
 * 
 * This plugin temporary chagens zoom of screen
 * whose center is specified event(or player).
 *
 * [Summary]
 * To set zoom of the screen, you must call plugin command.
 *
 * [Note]
 * After zoom end, be sure to call 'Reset Zoom' the plugin command.
 * Otherwise, it affects the picture priority.
 *
 * [License]
 * this plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */

/*:ja
 * @target MZ
 * @plugindesc [Ver1.1.1]プレイヤーや特定のイベントを中心に、画面をズームアップします。
 * @author 神無月サスケ
 *
 * @command set
 * @text ズーム開始
 * @desc 指定された中心点および倍率でズームします
 *
 * @arg EventId
 * @text 中心点イベントID
 * @desc プレイヤーの時は-1に、現在のイベントの時は0に
 * @type number
 * @min -1
 * @default -1
 *
 * @arg OffsetX
 * @text オフセットX
 * @desc 中心点よりずらすX座標
 * @type number
 * @min -9999
 * @default 0
 *
 * @arg OffsetY
 * @text オフセットY
 * @desc 中心点よりずらすY座標
 * @type number
 * @min -9999
 * @default 0
 *
 * @arg scale
 * @text ズーム倍率
 * @desc 小数点2桁まで指定可能です。
 * @decimals 2
 * @type number
 * @default 1.00
 * @min 1.00
 *
 * @arg FramesToZoom
 * @text フレーム数
 * @desc ズームにかかるフレーム数
 * 即座にズームさせるときは1に。
 * @type number
 * @default 1
 * 
 * @arg isPictureZoom
 * @text ピクチャもズームする？
 * @desc falseの時は、ピクチャをズームしません。
 * @on する
 * @off しない
 * @type boolean
 * @default false
 *
 * @command reset
 * @text ズーム終了
 * @desc 拡大を中止し、元の画面に戻す
 * 
 * @command Zoom200
 * @text 200%拡大
 * @desc カスタム。即ズーム表示
 *
 * @arg EventId
 * @text 中心点イベントID
 * @desc プレイヤーの時は-1に、現在のイベントの時は0に
 * @type number
 * @min -1
 * @default -1
 *
 * @arg isPictureZoom
 * @text ピクチャもズームする？
 * @desc falseの時は、ピクチャをズームしません。
 * @on する
 * @off しない
 * @type boolean
 * @default false
 *
 * @command Zoom300
 * @text 300%拡大
 * @desc カスタム。即ズーム表示
 *
 * @arg EventId
 * @text 中心点イベントID
 * @desc プレイヤーの時は-1に、現在のイベントの時は0に
 * @type number
 * @min -1
 * @default -1
 *
 * @arg isPictureZoom
 * @text ピクチャもズームする？
 * @desc falseの時は、ピクチャをズームしません。
 * @on する
 * @off しない
 * @type boolean
 * @default false
 *
 * @help
 * このプラグインは、RPGツクールMZに対応しています。
 *
 * このプラグインは、プレイヤーや特定のイベントを中心に、
 * 画面をズームアップする演出を行えます。
 *
 * ■概要
 * 設定はプラグインコマンドで行います。
 * ズームアップするフレーム数を1にした場合、即座にズームアップされます。
 * またオフセットを設定することで、拡大の中心をその座標分移動可能です。
 *
 * ■注意
 * ズームを終了するときは必ず「ズーム終了」を呼び出してください。
 * これを忘れると、ピクチャの表示レイヤに不具合が起こります。
 *
 * ■ライセンス表記
 * このプラグインは MIT ライセンスで配布されます。
 * ご自由にお使いください。
 * http://opensource.org/licenses/mit-license.php
 */

(() => {
  const pluginName = 'ScreenZoom';

  //
  // when scene changes and return to map scene, resume zoom rate.
  //
  const _Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    _Game_System_initialize.call(this);
    this.zoomInfo = null;
  };

  const _Scene_Map_createDisplayObjects =
    Scene_Map.prototype.createDisplayObjects;
  Scene_Map.prototype.createDisplayObjects = function() {
    _Scene_Map_createDisplayObjects.call(this);
    setupMapZoomFirst();
  };

  const setupMapZoomFirst = () => {
    const info = $gameSystem.zoomInfo;
    if (info) {
      info.FramesToZoom = 1;
      setZoom(info);
    }
  };

  //
  // process plugin commands
  //
  let currentEventId = 0;
  let _offsetX = 0;
  let _offsetY = 0;
  let container = null;

  const currentSpriteset = () => SceneManager._scene._spriteset;

  const thisEventId = () => $gameMap._interpreter.eventId();

  const xFromEventId = eventId => {
    let x;
    if (!eventId) {
      eventId = thisEventId();
    }
    if (eventId === -1) {
      x = $gamePlayer.screenX();
    } else if (eventId > 0) {
      const event = $gameMap.event(eventId);
      if (event) {
        x = event.screenX();
      }
    }
    return x;
  };

  const yFromEventId = eventId => {
    let y;
    if (!eventId) {
      eventId = thisEventId();
    }
    if (eventId === -1) {
      y = $gamePlayer.screenY();
    } else if (eventId > 0) {
      const event = $gameMap.event(eventId);
      if (event) {
        y = event.screenY();
      }
    }
    return y;
  };

  const setZoom = args => {
    const eventId = +args.EventId;
    currentEventId = eventId ? eventId : thisEventId();
    const offsetX = +args.OffsetX;
    const offsetY = +args.OffsetY;
    const frameToZoom = +args.FramesToZoom;
    let x = xFromEventId(eventId);
    let y = yFromEventId(eventId);
    if (x != null && y != null) {
      x += _offsetX = offsetX;
      y += _offsetY = offsetY;
      $gameScreen.startZoom(x, y, +args.scale, +args.FramesToZoom);
      if (!container && !eval(args.isPictureZoom)) {
        SceneManager._scene.undertakeSpritePicture();
      }
      $gameSystem.zoomInfo = args;
    }
  };

  PluginManager.registerCommand(pluginName, 'set', args => {
    setZoom(args);
  });

  PluginManager.registerCommand(pluginName, 'Zoom200', args => {
    const args2 = {};
    args2.EventId = +args.EventId;
    args2.isPictureZoom = args.isPictureZoom;
    args2.OffsetX = 0;
    args2.OffsetY = 0;
    args2.scale = 2;
    args2.FramesToZoom = 1;
    setZoom(args2);
  });

  PluginManager.registerCommand(pluginName, 'Zoom300', args => {
    const args2 = {};
    args2.EventId = +args.EventId;
    args2.isPictureZoom = args.isPictureZoom;
    args2.OffsetX = 0;
    args2.OffsetY = 0;
    args2.scale = 3;
    args2.FramesToZoom = 1;
    setZoom(args2);
  });

  PluginManager.registerCommand(pluginName, 'reset' , args => {;
    if (currentEventId) {
      const x = xFromEventId(currentEventId);
      const y = yFromEventId(currentEventId);
      $gameScreen.startZoom(x, y, 1, 1);
      if (container) {
        SceneManager._scene.remandSpritePicture();
      }
      $gameSystem.zoomInfo = null;
    }
    currentEventId = 0;
  });

  //
  // pictures are not zoom
  //
  Scene_Map.prototype.undertakeSpritePicture = function () {
    const spriteset = currentSpriteset();
    spriteset.removePictureContainer();
    this.removeChild(this._windowLayer);
    this.addChild(container);
    this.addChild(this._windowLayer);
  };

  Scene_Map.prototype.remandSpritePicture = function () {
    const spriteset = currentSpriteset();
    this.removeChild(container);
    spriteset.addPictureContainerAgain();
  };

  Spriteset_Base.prototype.removePictureContainer = function () {
    this.removeChild(this._pictureContainer);
    container = this._pictureContainer;
  };

  Spriteset_Base.prototype.addPictureContainerAgain = function () {
     this.removeChild(this._timerSprite);
     this.addChild(this._pictureContainer);
     this.addChild(this._timerSprite);
     container = null;
  };

  const _Scene_Map_terminate = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function () {
    if (container) {
      this.removeChild(container);
      container = null;
    }
    _Scene_Map_terminate.call(this);
  };

  const _Sprite_Picture_updateOther = Sprite_Picture.prototype.updateOther;
  Sprite_Picture.prototype.updateOther = function() {
    _Sprite_Picture_updateOther.call(this);
    if (container) {
      const brightness = $gameScreen.brightness();
      if (brightness < 255) {
        const opacity = this.picture().opacity();
        this.opacity = opacity * (brightness / 256);
      }
    }
  };
})();
