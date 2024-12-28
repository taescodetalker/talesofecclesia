//=============================================================================
// Plugin for RPG Maker MZ
// SimpleMsgSideViewMZ.js
//=============================================================================
// [Update History]
// This is the MZ version of SimpleMsgSideView the RMMV official plugin.
// 2020.Jul.XX Ver1.0.0 First Release
// 2022.Mar.22 Ver1.1.0 Add function: display item/skill's description
// 2022.May.15 Ver1.2.0 Resolve confliction with Keke_SpeedStarBattle.js

/*:
 * @target MZ
 * @plugindesc [Ver1.2.0]At sideview battle, only display item/skill names.
 * @author Sasuke KANNAZUKI
 *
 * @param displayAttack
 * @text Display Normal Attack?
 * @desc Whether to display normal attack.
 * @type boolean
 * @on Yes
 * @off No
 * @default false
 *
 * @param displayIcon
 * @text Display Icon?
 * @desc Whether to display icon with skill/item name.
 * @type boolean
 * @on Yes
 * @off No
 * @default true
 *
 * @param doesShowDesc
 * @text Show Description?
 * @desc Whether to display item/skill's description.
 * @type boolean
 * @on Yes
 * @off No
 * @default false
 *
 * @param descTiming
 * @parent doesShowDesc
 * @text Desc. Display Timing
 * @desc display description. 0:the same as item name, 1:after line wait
 * @type select
 * @option immidiate(0)
 * @value 0
 * @option after wait(1)
 * @value 1
 * @default 1
 *
 * @orderAfter Keke_SpeedStarBattle
 *
 * @help This plugin does not provide plugin commands.
 * This plugin runs under RPG Maker MZ.
 *
 * By introducing this plugin, at battle, display item/skill names alone,
 * not display battle logs.
 *
 * [Advanced Option: display one-line description]
 * When you set option 'Show Description?' true,
 * It displays not only item/skill name but also its description.
 * To define description, write at note following format.
 * <simpleDesc:*the description*>
 * When you don't write this, it lets second line of message be description.
 *
 * [Note]
 * - This plugin works also front view battle, but at the case,
 *  damage to ally is not displayed.
 * - By not displaying the log and only displaying the skill name,
 *  the speed of battle will increase slightly. 
 * - If you import this plugin with Keke_SpeedStarBattle.js,
 *  Put this plugin beneath the plugin in the plugin list.
 *
 * [License]
 * this plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */

/*:ja
 * @target MZ
 * @plugindesc [Ver1.2.0]サイドビューバトルでスキル/アイテムの名前のみ表示
 * @author 神無月サスケ
 *
 * @param displayAttack
 * @text 通常攻撃も表示
 * @desc 通常攻撃も表示する？
 * @type boolean
 * @on する
 * @off しない
 * @default false
 *
 * @param displayIcon
 * @text アイコン表示
 * @desc スキルやアイテムのアイコンも表示する？
 * @type boolean
 * @on する
 * @off しない
 * @default true
 *
 * @param doesShowDesc
 * @text 1行説明表示？
 * @desc スキルやアイテムの1行説明も表示する？
 * @type boolean
 * @on Yes
 * @off No
 * @default false
 *
 * @param descTiming
 * @parent doesShowDesc
 * @text 1行説明表示タイミング
 * @desc 0:アイテム名と同時, 1:1行ウェイトを挟んで表示
 * @type select
 * @option アイテム名と同時(0)
 * @value 0
 * @option 1行ウェイト後(1)
 * @value 1
 * @default 1
 *
 * @orderAfter Keke_SpeedStarBattle
 *
 * @help このプラグインには、プラグインコマンドはありません。
 * このプラグインは、RPGツクールMZに対応しています。
 *
 * このプラグインを導入すると、戦闘の際、バトルログが表示されず、
 * 使用したスキルやアイテムの名前のみが表示されるようになります。
 *
 * [拡張機能：1行説明表示]
 * オプションでこれをONにすると、スキルやアイテムの1行説明が表示されます。
 * 1行説明は、メモ欄に <simpleDesc:スキルの説明> の形式で定義します。
 * この記述がない時は、スキル/アイテム使用時のメッセージの2行目になります。
 *
 * ■注意
 * - フロントビューでの使用も可能ですが、味方のダメージが表示されません。
 * - ログを表示せず、技名のみを表示するため、戦闘のテンポが若干高速になります。
 * - このプラグインを Keke_SpeedStarBattle.js と併用して使う場合、
 *   このプラグインを後に置いて下さい。
 *
 * ■ライセンス表記
 * このプラグインは MIT ライセンスで配布されます。
 * ご自由にお使いください。
 * http://opensource.org/licenses/mit-license.php
 */

(() => {
  const pluginName = 'SimpleMsgSideViewMZ';

  //
  // process parameters
  //
  const parameters = PluginManager.parameters(pluginName);
  let display = String(parameters['displayAttack'] || 'false');
  const displayAttack = eval(display);
  display = String(parameters['displayIcon'] || 'true');
  const displayIcon = eval(display);
  display = String(parameters['doesShowDesc'] || 'false');
  const displayDesc = eval(display);
  display = null;
  const dispDescTiming = +(parameters['descTiming'] || '1');

  //
  // To resolve confliction with Keke_SpeedStarBattle.js
  //
  if (Game_System.prototype.initSpeedStarBattleKe) {
    // !!!revert!!!
    Scene_Battle.prototype.updateLogWindowVisibility = function() {
      this._logWindow.visible = !this._helpWindow.visible;
    };
    
    Window_BattleLog.prototype.waitAbs = function() {
      this._waitCount = 60; // this.messageSpeed();
    };

    const _BattleManager_endAction = BattleManager.endAction;
    BattleManager.endAction = function() {
      _BattleManager_endAction.call(this);
      BattleManager._battleWaitKe = Math.min(BattleManager._battleWaitKe, 20);
    }
  } else {
    Window_BattleLog.prototype.waitAbs = function() {
      this.wait();
    };
  }


  //
  // main routine
  //

  // !!!overwrite!!!
  Window_BattleLog.prototype.addText = function(text) {
    this.refresh();
    this.wait();
    // not display battle log
  };

 const itemDescription = item => {
    if (item) {
      const noteDesc = item.meta.simpleDesc;
      if (noteDesc) {
        return noteDesc === true ? '' : noteDesc;
      }
      return item.message2;
    }
    return '';
 }

  Window_BattleLog.prototype.addItemNameText = function(item) {
    this._lines.push(item.name);
    this._actionIconIndex = displayIcon ? item.iconIndex : 0;
    if (!displayDesc || dispDescTiming) {
      this.refresh();
      this.waitAbs();
    }
  };

  Window_BattleLog.prototype.addItemInfoText = function(item) {
    if (displayDesc) {
      const desc = itemDescription(item);
      if (desc) {
        this._lines.push('\x1f' + desc);
      }
      if (desc || dispDescTiming) {
        this.refresh();
        this.waitAbs();
      }
    }
  };

  // !!!overwrite!!!
  Window_BattleLog.prototype.displayAction = function(subject, item) {
    if (displayAttack ||
       !(DataManager.isSkill(item) && item.id === subject.attackSkillId())
    ) {
      this.push('addItemNameText', item);
      this.push('addItemInfoText', item);
    } else {
      this.push('wait');
    }
  };

  // !!!overwrite!!!
  Window_BattleLog.prototype.drawLineText = function(index) {
    let text = this._lines[index];
    const rect = this.lineRect(index);
    this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
    if (text[0] === '\x1f') { // item's description
      text = text.slice(1);
    } else if (this._actionIconIndex) {  // display item's icon
      const x = (rect.width - this.textWidth(text)) / 2 - 4;
      this.drawIcon(this._actionIconIndex, x, rect.y + 2);
    }
    this.drawText(text, rect.x, rect.y, Graphics.boxWidth, 'center');
  };

})();
