//=============================================================================
// Plugin for RPG Maker MZ
// SVActorPositionMZ.js
//=============================================================================
// [Update History]
// This plugin is MZ version of SVActorPosition.js the KADOKAWA RMMV Plugin.
// 2019.Dec.29 Ver1.0.0 First Release
// 2021.Feb.04 Ver1.1.0 Enables to change weapon's position by plugin command.
// 2022.Feb.21 Ver1.1.1 Fix Bug: Moved Characters priority
// 2022.Feb.25 Ver1.1.2 Fix Bug: Popup Damages were displayed beneath actors.
// 2022.Feb.25 Ver1.1.3 Fix Bug: animations were displayed beneath actors.
// 2022.Apr.22 Ver1.1.4 Fix Bug: Damage popup at wrong position when screen
//                                 size is changed.
// 2022.Apr.24 Ver1.1.5 Fix Bug: fix above yet more

/*:
 * @target MZ
 * @plugindesc [Ver1.1.5]Change actors' position on screen at sideview battle.
 * @author Sasuke KANNAZUKI
 * 
 * @param actor1 Xpos
 * @desc X position formula of actor1's center. 
 * (default:600)
 * @type text
 * @default 600
 *
 * @param actor1 Ypos
 * @desc Y position formula of actor1's bottom. 
 * (default:280)
 * @type text
 * @default 280
 * 
 * @param actor2 Xpos
 * @desc X position formula of actor2's center. 
 * (default:600 + 32) =632
 * @type text
 * @default 600 + 32
 *
 * @param actor2 Ypos
 * @desc Y position formula of actor2's bottom. 
 * (default:280 + 48) =328
 * @type text
 * @default 280 + 48
 * 
 * @param actor3 Xpos
 * @desc X position formula of actor3's center. 
 * (default:600 + 32 * 2) =664
 * @type text
 * @default 600 + 32 * 2
 *
 * @param actor3 Ypos
 * @desc Y position formula of actor3's bottom. 
 * (default:280 + 48 * 2) =376
 * @type text
 * @default 280 + 48 * 2
 * 
 * @param actor4 Xpos
 * @desc X position formula of actor4's center. 
 * (default:600 + 32 * 3) =696
 * @type text
 * @default 600 + 32 * 3
 *
 * @param actor4 Ypos
 * @desc Y position formula of actor4's bottom. 
 * (default:280 + 48 * 3) =424
 * @type text
 * @default 280 + 48 * 3
 * 
 * @command set
 * @text SV Actor Set Position
 * @desc Set either x or y axis.
 * 
 * @arg actorPos
 * @text Actor Position
 * @desc 1=top 2,3,4...
 * Note: this isn't actor ID.
 * @max 99
 * @min 1
 * @type number
 * @default 1
 *
 * @arg axis
 * @desc X or Y
 * @type select
 * @option X
 * @value X
 * @option Y
 * @value Y
 * @default X
 *
 * @arg dispPos
 * @text Coord
 * @desc number or formula
 * @type text
 * @default 200
 *
 * @command setWeapon
 * @text Set Weapon's Position
 * @desc Move weapon's position
 *
 * @arg actorId
 * @text Actor ID
 * @desc The Actor to Move Weapon's Position
 * @type actor
 * @default 1
 *
 * @arg axis
 * @text X or Y
 * @desc Y(right) or X(up)
 * @type select
 * @option right
 * @option up
 * @default right
 *
 * @arg pixel
 * @text Distance From Default
 * @desc Distance From Default Weapon Position
 * @type number
 * @max 99999
 * @min -99999
 * @default 0
 *
 * @help 
 * This plugin runs under RPG Maker MZ.
 *
 * This plugin enables to change the positions of sideview actors.
 *
 * [Summary]
 * By option, you can set the position not only number but also formula.
 * (ex. 200 + $gameVarables.value(1) )
 * If your system's battle attend actor's number > 4,
 * then, set by plugin command.
 *
 * This plugin also assumes the use of diffrent (from specified) size
 * SV actor graphics.
 * 
 * [Plugin Command]
 * Set actor's position, XorY, and Coord.
 * Coord accepts not only number but also formula.
 * for example...
 * 640    # number
 * 472
 * $gameVariables.value(20)    # variable
 * 320 + 48 * $gameVariables.value(15)      #formula
 * 
 * [configuration at Actor's note]
 * <SVWeaponHeight:12>
 * Weapon animation's height of the sideview actor.
 * In this case, Y position is heigher 12px by the defalut.
 * - It also accepts minus value,
 *   because it assumes when you make smaller actor.
 * - If this isn't written, default value 0 is used.
 * 
 * Weapon animation's X position is automatically corrected
 *   according to the actor graphics size.
 * If you feel it isn't natural, you can optimize the X position.
 * <SVWeaponRight:20>
 * In this case weapon animation moves right 20 pixels.
 * If the value is minus, animation moves left.
 *
 * Weapon's position can change also from plugin command.
 *
 * [License]
 * this plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 *
 */
/*:ja
 * @target MZ
 * @plugindesc [Ver1.1.5]サイドビュー戦闘においてアクター達の画面表示位置を設定します。
 * @author 神無月サスケ
 * 
 * @param actor1 Xpos
 * @desc アクター1の中心のX座標の式です。
 * (初期値:600)
 * @type text
 * @default 600
 *
 * @param actor1 Ypos
 * @desc アクター1の足元のY座標の式です。
 * (初期値:280)
 * @type text
 * @default 280
 * 
 * @param actor2 Xpos
 * @desc アクター2の中心のX座標の式です。
 * (初期値:600 + 32) =632
 * @type text
 * @default 600 + 32
 *
 * @param actor2 Ypos
 * @desc アクター2の足元のY座標の式です。
 * (初期値:280 + 48) =328
 * @type text
 * @default 280 + 48
 * 
 * @param actor3 Xpos
 * @desc アクター3の中心のX座標の式です。
 * (初期値:600 + 32 * 2) =664
 * @type text
 * @default 600 + 32 * 2
 *
 * @param actor3 Ypos
 * @desc アクター3の足元のY座標の式です。
 * (初期値:280 + 48 * 2) =376
 * @type text
 * @default 280 + 48 * 2
 * 
 * @param actor4 Xpos
 * @desc アクター4の中心のX座標の式です。
 * (初期値:600 + 32 * 3) =696
 * @type text
 * @default 600 + 32 * 3
 *
 * @param actor4 Ypos
 * @desc アクター4の足元のY座標の式です。
 * (初期値:280 + 48 * 3) =424
 * @type text
 * @default 280 + 48 * 3
 * 
 * @command set
 * @text SVアクター座標設定
 * @desc XかY座標のセット
 * 
 * @arg actorPos
 * @text アクター位置
 * @desc トップが1で何番目？
 * 注：アクターIDではない
 * @max 99
 * @min 1
 * @type number
 * @default 1
 *
 * @arg axis
 * @text XかY
 * @desc
 * @type select
 * @option X
 * @value X
 * @option Y
 * @value Y
 * @default X
 *
 * @arg dispPos
 * @text 座標
 * @desc 数値または式で指定
 * @type text
 * @default 200
 *
 * @command setWeapon
 * @text 武器表示位置変更
 * @desc 武器表示位置をデフォルトの位置からずらします。
 *
 * @arg actorId
 * @text アクターID
 * @desc 武器位置を変更するアクター
 * @type actor
 * @default 1
 *
 * @arg axis
 * @text 横方向？縦方向？
 * @desc 横(右方向)か縦(上方向)か
 * @type select
 * @option 右方向
 * @value right
 * @option 上方向
 * @value up
 * @default right
 *
 * @arg pixel
 * @text 原点からの距離
 * @desc 現在の位置ではなく原点からの位置であることに注意
 * @type number
 * @max 99999
 * @min -99999
 * @default 0
 *
 * @help 
 * このプラグインは、RPGツクールMZに対応しています。
 *
 * このプラグインは、サイドビュー戦闘でのアクターの座標を変更可能です。
 *
 * ■概要
 * 位置をオプションで指定する場合、数値の他に、数式での指定も可能です。
 *
 * また、プラグインコマンドでの変更も可能で、
 * 仮に５人以上のアクターがいるシステムでは、こちらで設定が出来ます。
 *
 * このプラグインは、標準素材とは異なったサイズのSVアクター画像での使用も
 * 想定しています。
 *
 * ■プラグインコマンド
 * アクターの位置、XまたはY、座標を設定します。
 * 座標は値か式にします。以下のような設定が可能です。
 * ・640 や 472 といった値
 * ・$gameVariables.value(20)
 * ・320 + 48 * $gameVariables.value(15)
 * 
 * ■アクターのメモによる設定
 * <SVWeaponHeight:12>
 * サイドビューアクターの武器アニメの表示Y座標の高さを設定します。
 * この例では、通常より12ピクセル高い位置に表示されます。
 * - 標準より小さなアクター画像の作成を想定して、マイナス値も受け付けます。
 * - 記述を省略した場合、デフォルトの0が採用されます。
 * 
 * 武器アニメのX座標は、アクター画像のサイズによって自動的に補正されます。
 * もしそれで不自然な場合は、以下の書式でメモに書いてください。
 * <SVWeaponRight:20>
 * サイドビューアクターの武器アニメの表示X座標を右寄りに補正します。
 * この例では、通常より20ピクセル右位置に表示されます。
 * マイナス値にすることで、左寄りの表示も可能です。
 *
 * また、これらの設定は、プラグインコマンド「武器表示位置変更」でも
 * 変更することが可能です。
 *
 * ■ライセンス表記
 * このプラグインは MIT ライセンスで配布されます。
 * ご自由にお使いください。
 * http://opensource.org/licenses/mit-license.php
 *
 */

(() => {

  const pluginName = 'SVActorPositionMZ'

  //
  // process parameters
  //
  const parameters = PluginManager.parameters(pluginName);
  let SVActorX = new Array(4);
  let SVActorY = new Array(4);
  SVActorX[0] = eval(parameters['actor1 Xpos'] || '600');
  SVActorX[1] = eval(parameters['actor2 Xpos'] || '632');
  SVActorX[2] = eval(parameters['actor3 Xpos'] || '664');
  SVActorX[3] = eval(parameters['actor4 Xpos'] || '696');
  SVActorY[0] = eval(parameters['actor1 Ypos'] || '280');
  SVActorY[1] = eval(parameters['actor2 Ypos'] || '328');
  SVActorY[2] = eval(parameters['actor3 Ypos'] || '376');
  SVActorY[3] = eval(parameters['actor4 Ypos'] || '424');


  //
  // process plugin commands
  //
  PluginManager.registerCommand(pluginName, 'set', args => {
    // check whether sv array is already defined or not
    if(!$gameSystem.svActorArrayDefined()){
      $gameSystem.defineSvActorArray();
    }
    const pos = +args.actorPos;
    const value = eval(args.dispPos);
    switch (args.axis) {
    case 'X':
      $gameSystem.svActorX[pos-1] = value;
      break;
    case 'Y':
      $gameSystem.svActorY[pos-1] = value;
      break;
    }
  });

  PluginManager.registerCommand(pluginName, 'setWeapon', args => {
    if(!$gameSystem.svActorArrayDefined()){
      $gameSystem.defineSvActorArray();
    }
    const actor = $gameActors.actor(+args.actorId);
    if (actor) {
      switch (args.axis) {
      case 'right':
        $gameSystem.svWeaponX[+args.actorId] = +args.pixel;
        break;
      case 'up':
        $gameSystem.svWeaponY[+args.actorId] = +args.pixel;
        break;
      }
    }
  });

  // 
  // define arrays for save sv actors' position
  // 
  const _Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    _Game_System_initialize.call(this);
    this.defineSvActorArray();
  };

  Game_System.prototype.defineSvActorArray = function() {
    this.svActorX = new Array(4);
    this.svActorY = new Array(4);
    this.svWeaponX = [];
    this.svWeaponY = [];
  };

  Game_System.prototype.svActorArrayDefined = function() {
    return !!this.svActorX;
  };

  // --------------------
  // set display priority(z axis)
  // --------------------
  const _compareSprites = (a, b) => {
    if (a.y !== b.y) {
        return a.y - b.y;
    } else {
        return b.spriteId - a.spriteId;
    }
  };

  Spriteset_Battle.prototype.createActorContainer = function() {
    const width = Graphics.width;
    const height = Graphics.height;
    this._actorContainer = new Sprite();
    this._actorContainer.setFrame(0, 0, width, height);
    this._actorContainer.x = 0;
    this._actorContainer.y = 0;
    this._battleField.addChild(this._actorContainer);
  };

  Spriteset_Battle.prototype.sortActors = function() {
    for (const sprite of this._actorSprites) {
      this._actorContainer.removeChild(sprite);
      for (const damage of sprite._damages) {
        this._battleField.removeChild(damage);
      }
    }
    this._actorSprites.sort(_compareSprites.bind(this));
    for (const sprite of this._actorSprites) {
      this._actorContainer.addChild(sprite);
    }
    for (const sprite of this._actorSprites) {
      for (const damage of sprite._damages) {
        this._battleField.addChild(damage);
      }
    }
  };

  // ***overwrite!***
  Spriteset_Battle.prototype.createActors = function() {
    this._actorSprites = [];
    this.createActorContainer();
    if ($gameSystem.isSideView()) {
      for (let i = 0; i < $gameParty.maxBattleMembers(); i++) {
        const sprite = new Sprite_Actor();
        this._actorSprites.push(sprite);
        this._actorContainer.addChild(sprite);
      }
    }
    this._originActorSprites = this._actorSprites.clone();
    this.sortActors();
  };

  // ***overwrite!***
  Spriteset_Battle.prototype.updateActors = function() {
    const members = $gameParty.battleMembers();
    for (let i = 0; i < this._actorSprites.length; i++) {
        this._originActorSprites[i].setBattler(members[i]);
    }
    this.sortActors();
  };

  // --------------------
  // set actors' position (overwrited)
  // --------------------
  Sprite_Actor.prototype.setActorHome = function(index) {
    // check whether sv array is already defined or not
    if(!$gameSystem.svActorArrayDefined()){
      $gameSystem.defineSvActorArray();
    }
    // set default values
    let x = 600 + index * 32;
    let y = 280 + index * 48;
    // apply option values
    if (index < 4) {
      x = $gameSystem.svActorX[index] || SVActorX[index];
      y = $gameSystem.svActorY[index] || SVActorY[index];
    } else if (index < 100 && !!$gameSystem.svActorX[index]) {
      x = $gameSystem.svActorX[index];
      if (!!$gameSystem.svActorY[index]) {
        y = $gameSystem.svActorY[index];
      }
    }
    // set position
    this.setHome(x, y);
  };

  // --------------------
  // set weapon animation's position
  // --------------------
  const _Sprite_Weapon_setup = Sprite_Weapon.prototype.setup;
  Sprite_Weapon.prototype.setup = function(weaponImageId) {
    _Sprite_Weapon_setup.call(this, weaponImageId);
    this.setPosition();
  };

  Sprite_Weapon.prototype.setPosition = function() {
    // set X position by actor sprite size
    const actorBitmap = this.parent._mainSprite.bitmap;
    const actorSpriteWidth = actorBitmap ? actorBitmap.width / 9 : 64;
    this.x = -16 - (actorSpriteWidth - 64) / 2;
    // set Y default position
    this.y = 0;
    // change X,Y position by plugin command or actor's note
    const battler = this.parent._battler;
    const meta = battler.actor().meta;
    const actorId = battler.actorId();
    if(actorId && battler){
      const pixelX = $gameSystem.svWeaponX[actorId];
      const pixelY = $gameSystem.svWeaponY[actorId];
      this.x += pixelX != null ? pixelX : (+meta.SVWeaponRight || 0);
      this.y -= pixelY != null ? pixelY : (+meta.SVWeaponHeight || 0);
    }
  };

})();
