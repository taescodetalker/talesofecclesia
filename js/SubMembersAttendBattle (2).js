//=============================================================================
// Plugin for RPG Maker MZ
// SubMembersAttendBattle.js
//=============================================================================
// [Update History]
// 2020.Jan.24: Ver0.0.1 First release to closed members
// 2020.Feb.15: Ver0.0.2 Fix bug : invoke error when member > 4 and open menu
// 2020.Jul.07: Ver1.0.0 First release
// 2020.Oct.09: Ver1.0.1 Fix bug : when sub member was attacked by counter,
//   the member might be dead and no method to revive.
// 2020.Nov.29: Ver1.1.0 Add plugin command that dynamically change an actor
//   whether to attend battle or not.

/*:
 * @target MZ
 * @plugindesc [Ver1.1.0]Make Sub Members(=NPC) Attend Battle and does auto actions.
 * @author Sasuke KANNAZUKI
 *
 * @param subMemberIdVal1
 * @text Var ID for sub member 1
 * @desc Variable ID for actor ID of sub member 1.
 * @type variable
 * @default 1
 *
 * @param subMemberIdVal2
 * @text Var ID for sub member 2
 * @desc Variable ID for actor ID of sub member 2.
 * @type variable
 * @default 2
 *
 * @param subMemberIdVal3
 * @text Var ID for sub member 3
 * @desc Variable ID for actor ID of sub member 3.
 * @type variable
 * @default 3
 *
 * @param subMemberIdVal4
 * @text Var ID for sub member 4
 * @desc Variable ID for actor ID of sub member 4.
 * @type variable
 * @default 4
 *
 * @command set
 * @text Set NPC Attend Battle
 * @desc Set whether to attend battle the sub member
 *
 * @arg settingMode
 * @text ActorId or NPC Position
 * @desc Which to set actor id.
 * @type select
 * @option Actor Id
 * @value actorId
 * @option NPC Position
 * @value followerId
 * @default actorId
 *
 * @arg actorId
 * @parent settingMode
 * @text Actor ID
 * @desc When you adopt NPC Position, this setting is ignored.
 * @type actor
 * @default 1
 *
 * @arg followerId
 * @parent settingMode
 * @text NPC Position
 * @desc Set between from 1 to 4. If you adopt Actor Id, this setting is ignored.
 * @type number
 * @max 4
 * @min 1
 * @default 1
 *
 * @arg doesAttend
 * @text Attend the battle?
 * @desc When you select 'reset', it'll be default(note description) setting.
 * @type select
 * @option Yes to attend
 * @value yes
 * @option No to attend
 * @value no
 * @option Reset the plugin setting
 * @value reset
 * @default reset
 *
 * @help
 * This plugin runs under RPG Maker MZ.
 * 
 * This plugin enables Sub Members(=NPC) attend battle.
 *
 * [Summary]
 * A sub member is an actor but not displayed actor list in menu,
 * because sum members are not included in the party.
 *
 * Since sub members are not party members...
 * - at battle scene, sub members' HP/MP and other status is not displayed.
 *   Actually, sub members never become attack target.
 * - Sub members never consume HP/MP.
 * (i.e. Sub members' hp and mp is not considered while all battle situations.)
 * - Sub members never get EXP at battle end.
 * 
 * [Recommended Usage]
 * Use together with MenuSubMembersMZ.js to display sub members on menu and
 * followers on map.
 * In that case, set the options 'Var ID for submember' at the same value
 * as that of MenuSubMembersMZ.js.
 *
 * [Advanced Option]
 * Write an actor's note <NonFightNPC> and the actor doesn't attend the battle
 * when the actor become sub member.
 *
 * [Plugin Command]
 * When you change the battle attending condition for any sub member,
 * You can do it by a plugin command.
 * NOTE: Please call this pluguin command on map event.
 * If you call the plugin command on battle, that doesn't work well.
 *
 * [License]
 * this plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */

/*:ja
 * @target MZ
 * @plugindesc [Ver1.1.0]同行者(NPC)を戦闘に参加させ、自動戦闘を行わせます
 * @author 神無月サスケ
 *
 * @param subMemberIdVal1
 * @text 同行者1用変数ID
 * @desc 同行者1のアクターIDを指定する変数ID
 * @type variable
 * @default 1
 *
 * @param subMemberIdVal2
 * @text 同行者2用変数ID
 * @desc 同行者2のアクターIDを指定する変数ID
 * @type variable
 * @default 2
 *
 * @param subMemberIdVal3
 * @text 同行者3用変数ID
 * @desc 同行者3のアクターIDを指定する変数ID
 * @type variable
 * @default 3
 *
 * @param subMemberIdVal4
 * @text 同行者4用変数ID
 * @desc 同行者4のアクターIDを指定する変数ID
 * @type variable
 * @default 4
 *
 * @command set
 * @text NPC戦闘参加設定
 * @desc 指定したアクターが同行者の時の戦闘参加の如何を動的に設定します。
 *
 * @arg settingMode
 * @text アクターID？同行者位置？
 * @desc 対象のアクターをどちらで設定するか
 * @type select
 * @option アクターID
 * @value actorId
 * @option 同行者位置
 * @value followerId
 * @default actorId
 *
 * @arg actorId
 * @parent settingMode
 * @text アクターID
 * @desc アクターIDで指定する場合、ここで設定。同行者位置の時は無視
 * @type actor
 * @default 1
 *
 * @arg followerId
 * @parent settingMode
 * @text 同行者位置
 * @desc 前から順に1～4の値で設定。アクターIDの時は無視
 * @type number
 * @max 4
 * @min 1
 * @default 1
 *
 * @arg doesAttend
 * @text 戦闘に参加？
 * @desc リセットを選ぶとメモの設定を参照するようになります。
 * @type select
 * @option 参加させる
 * @value yes
 * @option 参加させない
 * @value no
 * @option リセット
 * @value reset
 * @default reset
 *
 * @help
 * このプラグインは、RPGツクールMZに対応しています。
 *
 * このプラグインは、同行者(NPC)を戦闘にさせることが出来ます。
 *
 * ■概要
 * 同行者とは、パーティーメンバーに属さず、メニューのアクターリストにも
 * 表示されないが、同行しているアクターです。
 *
 * 同行者はパーティーメンバーではないため、戦闘中、ステータスは表示されません。
 * 敵からの攻撃の対象になることも、仲間の回復スキルで回復することもありません。
 * すなわち、同行者のHP/MPは一切考慮されないということです。
 * また、同行者は戦闘勝利時に経験値を得ることもありません。
 *
 * ■推奨される使用法
 * MenuSubMembersMZ.js はメニュー画面および隊列に同行者を表示させます。
 * こちらと併用する場合、同行者用の変数IDを同じように設定するといいでしょう。
 *
 * ■メモの記述
 * アクターのメモに <NonFightNPC> と書いた場合、そのアクターが同行者の時
 * 戦闘には参加しません。
 *
 * ■プラグインコマンド
 * 同行者の戦闘参加の是非を途中で変更したい時に呼び出してください。
 * デフォルト(メモの記述)に戻すことも可能です。
 * 注意：この設定は戦闘中は無効です。必ずマップ上で行ってください。
 *
 * ■ライセンス表記
 * このプラグインは MIT ライセンスで配布されます。
 * ご自由にお使いください。
 * http://opensource.org/licenses/mit-license.php
 */

(() => {
  const pluginName = 'SubMembersAttendBattle';
  //
  // process parameters
  //
  const parameters = PluginManager.parameters(pluginName);
  const submemberVar1 = Number(parameters['subMemberIdVal1'] || 1);
  const submemberVar2 = Number(parameters['subMemberIdVal2'] || 2);
  const submemberVar3 = Number(parameters['subMemberIdVal3'] || 3);
  const submemberVar4 = Number(parameters['subMemberIdVal4'] || 4);

  //
  // get sub members
  //
  const subMemberVarList = [submemberVar1, submemberVar2, submemberVar3,
    submemberVar4
  ];

  Game_Party.prototype.isBattleSubMember = function(actor) {
    // this._isBattleSubMember = { actorId => boolean or undefined }
    this._isBattleSubMember = this._isBattleSubMember || {};
    // when set by plugin commands
    const actorId = actor ? actor.id : 0;
    const isSub = actorId ? this._isBattleSubMember[actorId] : false;
    if (isSub != null) {
      return isSub;
    }
    // check the note description
    return actor && !actor.meta.NonFightNPC;
  };

  const _subMemberIds = () => {
    let members = [];
    for (const varId of subMemberVarList) {
      if (varId > 0) {
        const subMemberID = $gameVariables.value(varId);
        if (subMemberID > 0) {
          const actor = $dataActors[subMemberID];
          if ($gameParty.isBattleSubMember(actor)) {
            members.push(subMemberID);
          }
        }
      }
    }
    return members;
  };

  //
  // process plugin command
  //
  PluginManager.registerCommand(pluginName, 'set', args => {
    let actor = null;
    switch (args.settingMode) {
    case 'actorId':
      actor = $dataActors[+args.actorId];
      break;
    case 'followerId':
      const varIdForActor = subMemberVarList[+args.followerId - 1];
      if (varIdForActor) {
        const actorId = $gameVariables.value(varIdForActor);
        actor = $dataActors[actorId];
      }
    }
    if (actor) {
      const actorId2 = actor.id;
      $gameParty._isBattleSubMember = $gameParty._isBattleSubMember || {};
      switch (args.doesAttend) {
      case 'yes':
        $gameParty._isBattleSubMember[actorId2] = true;
        break;
      case 'no':
        $gameParty._isBattleSubMember[actorId2] = false;
        break;
      case 'reset':
        $gameParty._isBattleSubMember[actorId2] = null;
        break;
      }
    }
  });

  //--------------------------------------------------------------------------
  // Game_SubMembers
  // The third unit following Game_Party and Game_Troop.
  //
  function Game_SubMembers() {
    this.initialize(...arguments);
  }

  Game_SubMembers.prototype = Object.create(Game_Unit.prototype);
  Game_SubMembers.prototype.constructor = Game_SubMembers;

  Game_SubMembers.prototype.initialize = function() {
    Game_Unit.prototype.initialize.call(this);
    this._inBattle = true;
    this._subMembers = _subMemberIds();
  };

  Game_SubMembers.prototype.members = function() {
    return this._subMembers.map(id => $gameActors.actor(id));
  };

  //
  // define sub member variable used only in the battle
  //
  let $gameSubMembers = null;

  const hasSubMember = () => !!$gameSubMembers;

  const _Game_Party_onBattleStart = Game_Party.prototype.onBattleStart;
  Game_Party.prototype.onBattleStart = function(advantageous) {
    _Game_Party_onBattleStart.call(this, advantageous);
    $gameSubMembers = new Game_SubMembers();
    $gameSubMembers.onBattleStart(advantageous);
  };

  const _Scene_Battle_terminate = Scene_Battle.prototype.terminate;
  Scene_Battle.prototype.terminate = function() {
    _Scene_Battle_terminate.call(this);
    $gameSubMembers = null;
  };

  //
  // add sub members to battle members
  //
  const _BattleManager_allBattleMembers = BattleManager.allBattleMembers;
  BattleManager.allBattleMembers = function() {
    let battleMembers = _BattleManager_allBattleMembers.call(this);
    if (hasSubMember()) {
      battleMembers = battleMembers.concat($gameSubMembers.members());
    }
    return battleMembers;
  };

  const _BattleManager_makeActionOrders = BattleManager.makeActionOrders;
  BattleManager.makeActionOrders = function() {
    _BattleManager_makeActionOrders.call(this);
    const subMembers = hasSubMember() ? $gameSubMembers.members() : [];
    for (const battler of subMembers) {
      battler.makeSpeed();
    }
    const battlers = subMembers.concat(this._actionBattlers);
    battlers.sort((a, b) => b.speed() - a.speed());
    this._actionBattlers = battlers;
  };

  //
  // judge functions whether the actor is sub member or not.
  //
  Game_BattlerBase.prototype.isSubMember = function() {
    return false;
  };

  Game_Actor.prototype.isSubMember = function () {
    if (!hasSubMember()) {
      return false;
    }
    const actorId = this.actorId();
    return $gameSubMembers._subMembers.includes(actorId) &&
      !$gameParty._actors.includes(actorId);
  };

  const _Game_Actor_isBattleMember = Game_Actor.prototype.isBattleMember;
  Game_Actor.prototype.isBattleMember = function() {
    if (_Game_Actor_isBattleMember.call(this)) {
      return true;
    } else if (hasSubMember()) {
      return $gameSubMembers.members().includes(this);
    }
    return false;
  };


  //
  // sub members cannot accept input but decide action automatically
  //
  const _Game_BattlerBase_isAutoBattle =
    Game_BattlerBase.prototype.isAutoBattle;
  Game_BattlerBase.prototype.isAutoBattle = function() {
    if (this.isSubMember()) {
      return true;
    }
    return _Game_BattlerBase_isAutoBattle.call(this);
  };

  //
  // sub members doesn't consider HP/MP
  //
  const _Game_BattlerBase_canPaySkillCost =
    Game_BattlerBase.prototype.canPaySkillCost;
  Game_BattlerBase.prototype.canPaySkillCost = function(skill) {
    if (this.isSubMember()) {
      return true;
    }
    return _Game_BattlerBase_canPaySkillCost.call(this, skill);
  };

  const _Game_Battler_useItem = Game_Battler.prototype.useItem;
  Game_Battler.prototype.useItem = function(item) {
    if (this.isSubMember()) {
      return;
    }
    _Game_Battler_useItem.call(this, item);
  };

  //
  // make sub members' action on battle
  //
  const _Game_Party_makeActions = Game_Party.prototype.makeActions;
  Game_Party.prototype.makeActions = function() {
    _Game_Party_makeActions.call(this);
    if (hasSubMember()) {
      $gameSubMembers.makeActions();
    }
  };

  const _BattleManager_updateTpb = BattleManager.updateTpb;
  BattleManager.updateTpb = function() {
    if (hasSubMember()) {
      $gameSubMembers.updateTpb();
    }
    _BattleManager_updateTpb.call(this);
  };

  //
  // sub members aren't affected by counter attack and magic reflection
  //
  const _Game_Temp_initialize = Game_Temp.prototype.initialize;
  Game_Temp.prototype.initialize = function() {
    _Game_Temp_initialize.call(this);
    this.attackToSubMember = false;
  }

  const _BattleManager_invokeCounterAttack = BattleManager.invokeCounterAttack;
  BattleManager.invokeCounterAttack = function(subject, target) {
    $gameTemp.attackToSubMember = subject.isSubMember();
    _BattleManager_invokeCounterAttack.call(this, subject, target);
    $gameTemp.attackToSubMember = false;
  };

  const _BattleManager_invokeMagicReflection = BattleManager.invokeMagicReflection;
  BattleManager.invokeMagicReflection = function(subject, target) {
    $gameTemp.attackToSubMember = subject.isSubMember();
    _BattleManager_invokeMagicReflection.call(this, subject, target);
    $gameTemp.attackToSubMember = false;
  };

  const _Game_Action_apply = Game_Action.prototype.apply;
  Game_Action.prototype.apply = function(target) {
    // sub members supposed to have limitless HP.
    if ($gameTemp.attackToSubMember) {
      return;
    }
    _Game_Action_apply.call(this, target);
  };

})();
