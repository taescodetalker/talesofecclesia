//=============================================================================
// VisuStella MZ - Items & Equips Core
// VisuMZ_1_ItemsEquipsCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_ItemsEquipsCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemsEquipsCore = VisuMZ.ItemsEquipsCore || {};
VisuMZ.ItemsEquipsCore.version = 1.58;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.58] [ItemsEquipsCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Items_and_Equips_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Items & Equips Core makes improvements to the RPG Maker MZ item and
 * equipment dedicated scenes (including the shop) and how they're handled.
 * From more item categories, better parameter control, rulings, and more, game
 * devs are able to take control over key aspects of their game's items.
 *
 * Features include all (but not limited to) the following:
 *
 * * Modifying the appearances to the Item Scene, Equip Scene, and Shop Scene.
 * * Categorizing items in unique and multiple categories.
 * * Item Scene and Shop Scene will now display detailed information on items.
 * * NEW! marker can be displayed over recently acquired items in-game.
 * * Equipment notetags to adjust parameters past the editor limitations.
 * * Equipment Rulings to adjust what slot types can and can't be unequipped
 *   and/or optimized.
 * * Equipment Type Handling offers more control over equipment loadouts.
 * * Items sold in shops can be hidden/shown based on Switches.
 * * Items sold in shops can have varying prices adjusted by notetags.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Equipment Type Handling
 *
 * - Characters will no longer have one universal equipment slot setting.
 * Classes can have different equipment type loadouts, made possible through
 * the usage of notetags. Also, equipment types of matching names would be
 * treated as the same type, where previously, they would be different types.
 * This means if you have two "Accessory" slots, be it in the form of notetags
 * or through the Database > Types tab, they can both equip the same type of
 * accessories.
 *
 * - The Change Equip event command is now updated to reflect this new change.
 * When processing an equip change, the slot changed will go to the first
 * empty slot of matching type. If all of the actor's matching slot types are
 * equipped, then the equip will replace the last slot available.
 *
 * ---
 *
 * Shop Status Window
 *
 * - The Status Window found in the Shop Scene was originally barren and did
 * not display much information at all. This is changed through this plugin's
 * new features. While the contents of the Shop Status Window can be customized
 * through the Plugin Parameters, it is a change that cannot be reversed and
 * for the better since it gives players the much needed information revolving
 * around the game's items.
 *
 * ---
 *
 * Core Engine Compatibility: Modern Controls
 *
 * - If the VisuStella Core Engine is added to your game with Modern Controls
 * enabled, then the Item Menu Scene, Equip Menu Scene, and Shop Menu Scene's
 * controls will be changed a bit.
 *
 * - The Item Menu Scene will automatically have the Item List Window active,
 * with using the Left/Right (for single column) or Page Up/Page Down (for
 * multi-columns) to navigate between the Item Categories. Similar will occur
 * when trying to sell items in the Shop Menu Scene.
 *
 * - The Equip Menu Scene will automatically have the Equip Slots Window active
 * and only activate the command window upon moving up to it.
 *
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 * 
 * ---
 * 
 * VisuMZ_1_BattleCore
 * 
 * Changing the "Damage Multiplier" or "Healing Multiplier" vocabulary for the
 * Item and Equip Core's Shop Status Window is not done with the Item and Equip
 * Core's Plugin Parameters if you have the Battle Core installed.
 * 
 * Instead, go to Battle Core's Plugin Parameters, Damage Settings, Damage
 * Styles, and adjust the style's version of the "Damage Multiplier" or
 * "Healing Multiplier" text instead.
 * 
 * Why does this work this way? Because not all damage styles work off
 * "Multipliers" so in order for it to convey the proper message to the player,
 * each damage style has its own vocabulary to be more accurate.
 * 
 * In case you forget about that, when you visit the Item and Equip Core's
 * plugin parameters for these, it should also remind you in the parameter's
 * description on where to change it.
 * 
 * ---
 *
 * VisuMZ_2_WeaponSwapSystem
 *
 * The custom equip slots feature from the VisuStella MZ Items and Equips Core
 * allowed you to add in extra weapon slots. This is now curated up to a max
 * of one weapon slot per character. This needs to be done to make the Weapon
 * Swap System viable.
 *
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 * 
 * ---
 *
 * === General ===
 * 
 * These notetags affect the Items, Weapons, and Armors on a general scale.
 *
 * ---
 *
 * <Max: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the maximum quantity that can be held for this item.
 * - Replace 'x' with a number value to determine the maximum amount.
 *
 * ---
 *
 * <Color: x>
 * <Color: #rrggbb>
 *
 * - Used for: Item, Weapon, Armor, Skill Notetags
 * - Determines the color of the object inside the in-game menus.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <Category: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace 'x' with a category name to mark this item as.
 *
 * ---
 *
 * <Categories>
 *  x
 *  x
 * </Categories>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace each 'x' with a category name to mark this item as.
 *
 * ---
 * 
 * <Conserve: x%>
 * 
 * - Used for: Item
 * - Gives the item a percent chance when used to not consume the item.
 * - Replace 'x' with a number representing the percent chance to successfully
 *   conserve the item.
 * - If an item cannot be consumed, conserve chance will be 100% regardless.
 * 
 * ---
 * 
 * <ID Sort Priority: x>
 * 
 * - Used for: Item, Weapon, and Armor Notetags
 * - Used for Scene_Item, Scene_Equip, Scene_Battle, and Scene_Shop's sell
 *   option (only when selling).
 * - Changes sorting priority by ID for item, weapon, or armor to 'x'. 
 *   - Default priority level is '50'.
 * - Items, weapons, and armors with higher priority values will be sorted
 *   higher up on the list while lower values will be lower on the list.
 * 
 * ---
 *
 * === Item Accessibility Notetags ===
 *
 * The following notetags allow you to choose when items can/cannot be used
 * based on switches.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, item will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, item will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Item Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if an item can be accessible by code.
 *
 * ---
 *
 * <JS Item Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Item Enable>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on JavaScript code.
 * - If the actor this is disabled for is the only party member, it will not be
 *   visible in the item list unless the VisuStella Battle Core is installed.
 *   - If the VisuStella Battle Core is installed, then all battle scope items
 *     will be visible even if they're disabled.
 * - Replace 'code' to determine the type enabled status of the item.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   item will be enabled or not.
 * - The 'user' variable refers to the user with the item.
 * - The 'item' variable refers to the item being checked.
 * - All other item conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === Equipment Notetags ===
 *
 * The following notetags provide equipment-related effects from deciding what
 * equip slots can be given to classes to the base parameter changes asigned
 * to weapons and armors.
 *
 * ---
 *
 * <Equip Slots>
 *  slotName
 *  slotName
 *  slotName
 * </Equip Slots>
 *
 * - Used for: Class Notetags
 * - Changes the equipment slot loadout for any actor who is that class.
 * - Replace 'slotName' with an Equipment Type name from Database > Types.
 *   This is case-sensitive.
 * - Insert or remove as many "slotName" equipment types as needed.
 *
 * ---
 *
 * <param: +x>
 * <param: -x>
 *
 * - Used for: Weapon, Armor Notetags
 * - Changes the base parameter value for the equip item.
 * - Replace 'param' with any of the following: 'MaxHP', 'MaxMP', 'ATK', 'DEF',
 *   'MAT', 'MDF', 'AGI', or 'LUK' to change that specific parameter's value.
 *   - These notetags do NOT work with X Parameters, S Parameters, or any
 *     custom parameters. These notetags ONLY work with the base parameters.
 * - Replace 'x' with a number value to set the parameter value to.
 * - This allows you to bypass the Database Editor's number limitations.
 *
 * ---
 * 
 * <Equip Copy Limit: x>
 * 
 * - Used for: Weapon, Armor Notetags
 * - Sets a maximum number of copies that the actor can wear of this equipment.
 * - Replace 'x' with a number value to determine the copy limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: Actors can only equip one copy of the "One-of-a-Kind Ring"
 *   on at any time despite having empty accessory slots because the ring has a
 *   <Equip Copy Limit: 1> notetag.
 * 
 * ---
 * 
 * <Equip Weapon Type Limit: x>
 * 
 * - Used for: Weapon
 * - This weapon cannot be equipped with other weapons of the same type once
 *   the limited amount has been reached.
 * - Replace 'x' with a number value to determine the weapon type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: A dualwielding warrior who can only equip one sword and a
 *   dagger but never two swords or two daggers because the swords and daggers
 *   all have the <Equip Weapon Type Limit: 1> notetags on them.
 * 
 * ---
 * 
 * <Equip Armor Type Limit: x>
 * 
 * - Used for: Armor
 * - This armor cannot be equipped with other armors of the same type once the
 *   limited amount has been reached.
 * - Replace 'x' with a number value to determine the armor type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: People cannot equip more than two glove accessories on at a
 *   time because the glove is a "Glove" armor-type and each glove item has the
 *   <Equip Armor Type Limit: 2> notetags on them.
 * 
 * ---
 * 
 * <Party Artifact>
 * <Troop Artifact>
 * 
 * <Stackable Party Artifact>
 * <Stackable Troop Artifact>
 * 
 * - Used for: Armor
 * - This armor cannot be equipped at all. However, by simply being in the
 *   party's inventory, its parameter bonuses and traits will be applied
 *   globally throughout the whole party or troop (depending on the notetag).
 * - Add both notetags to affect both groups.
 * - The normal versions of the notetag is only applied once regardless of the
 *   number of copies are found in the party's inventory.
 * - The stackable versions of the notetag will have the bonuses and traits
 *   stacked multiple times relative to the number of copies found in the
 *   party's inventory.
 * - This item will NOT be added during the setup phase for Battle Tests.
 *   - If you want to add the item, do it manually.
 * 
 * ---
 * 
 * <Equip For Class Only: x>
 * <Equip For Classes Only: x, x, x>
 * <Equip For Class Only: name>
 * <Equip For Classes Only: name, name, name>
 * 
 * - Used for: Weapon, Armor Notetags
 * - This piece of equipment can only be worn by members with 'x' as the main
 *   class. If there are multiple classes listed, at least one of them need to
 *   be the actor's main class.
 * - Replace 'x' with a number representing the ID of the class required.
 * - For the 'name' variant, replace 'name' with the name of the required class
 *   the actor needs to have in order to equip this object.
 * 
 * ---
 * 
 * <Equip Requirements>
 *  requirement
 *  requirement
 *  requirement
 * </Equip Requirements>
 * 
 * - Used for: Weapon, Armor Notetags
 * - Defines a requirement(s) for the actor to meet in order for the equip item
 *   to be equippable.
 * - Failure to meet these requirements will cause the equipment to unequip
 *   automatically.
 *   - Keep in mind that in some cases, this will not happen immediately.
 *     Things like switches will require the actor to meet its cache clear
 *     in order to trigger the automatic unequip.
 *   - Some ways to trigger a cache clear would be to change the actor's HP/MP,
 *     or adding and then removing a state for the actor (preferrably an unused
 *     state that has no real effect).
 * - Replace 'requirement' with one of the settings bellow:
 * - Add multiple 'requirement' lines for more requirements.
 * 
 *   Requirements:
 *
 *   param > x
 *   param >= x
 *   param === x
 *   param <= x
 *   param < x
 *   - Replace 'param' with 'level', 'maxhp', 'maxmp', 'atk', 'def', 'mat',
 *     'mdf', 'agi', or 'luk'.
 *   - This will make the piece of equipment require the actor's base parameter
 *     to be greater than (>), greater than or equal to (>=), equal to (===),
 *     less than or equal to (<=), or less than (<).
 *   - This is NOT the value for the total parameter, only the base parameter.
 *   - The base parameter is calculated by the user's class parameter value and
 *     any bonuses received through permanent stat increases.
 *
 *   learned skill: x
 *   learned skill: name
 *   - This will make the piece of equipment require the actor to have learned
 *     skill 'x'. 
 *   - If 'name' is used, priority will be given to the skill with the highest
 *     ID in the database.
 *   - The actor needs to have LEARNED the skill. This means that if you have
 *     added a skill to the actor's kit through a trait, it will not count.
 *
 *   switch: x
 *   - This will require switch X to be on.
 *   - If it isn't, the piece of equipment cannot be worn.
 *   - Insert multiple of these to add more switches that are are required to
 *     be on.
 * 
 *   ***NOTE 1***
 *   There is no "class: x" for these equip requirements. Instead, use the
 *   <Equip For Class Only: x> notetags.
 * 
 *   ***NOTE 2***
 *   For those wondering where "unique only" is, that does not exist in this
 *   plugin. Instead, use the <Equip Copy Limit: x> notetag listed above.
 * 
 *   Example A:
 * 
 *     <Equip Requirements>
 *     level >= 20
 *     </Equip Requirements>
 * 
 *     - Requires the user to be at least level 20 in order to equip.
 * 
 *   Example B:
 * 
 *     <Equip Requirements>
 *     atk >= 50
 *     def <= 50
 *     </Equip Requirements>
 *     - Requires the user have at least 50 base ATK to equip.
 *     - Requires the user to be under 50 base DEF to equip.
 * 
 * ---
 * 
 * <Added EType: x>
 * <Added ETypes: x, x, x>
 * 
 * - Used for: Armor Notetags
 * - This is for armors only and does NOT work with weapons!
 * - Allows a piece of armor to belong to multiple ETypes. This means a glove
 *   can be equipped as "Armgear" or as an "Accessory" if you so choose.
 * - Replace 'x' with a number representing the ID of the EType you wish to add
 *   to the list of ETypes.
 *   - Insert multiple 'x' entries to add more than one EType ID.
 * 
 * ---
 * 
 * <Cursed>
 * 
 * - Used for: Weapon, Armor Notetags
 * - If this weapon or armor is equipped, it cannot manually be removed by the
 *   player until it is purified.
 * - To remove it, it must be done by event commands, script calls, or through
 *   the Purify-related Plugin Commands provided by this plugin.
 * - Once purified, the weapon or armor will become unequipped unless it has a
 *   purify transformation.
 *   - If the newly transformed weapon/armor is equippable, it will remain in
 *     the actor's equipment slots.
 * - If you are using VisuMZ_2_WeaponSwapSystem, weapons cannot become cursed
 *   in order to allow free weapon swapping. Weaponry will not be cursed
 *   if VisuMZ_2_WeaponSwapSystem is installed.
 * 
 * ---
 * 
 * <Purify Transform: id>
 * <Purify Transform: name>
 * 
 * - Used for: Weapon, Armor Notetags
 * - If this notetag is present on a <Cursed> weapon or armor, then upon the
 *   actor receiving purification, the weapon or armor will transform into a
 *   different item.
 * - Replace 'id' with a number representing the transformed weapon/armor's ID.
 * - Replace 'name' with text representing the transformed weapon/armor's name.
 * - Weapons can only transform into weapons.
 * - Armors can only transform into armors.
 * 
 * ---
 *
 * === JavaScript Notetags: Equipment ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * adjust the parameter through code.
 *
 * ---
 *
 * <JS Parameters>
 *  MaxHP = code;
 *  MaxMP = code;
 *  ATK = code;
 *  DEF = code;
 *  MAT = code;
 *  MDF = code;
 *  AGI = code;
 *  LUK = code;
 * </JS Parameters>
 *
 * - Used for: Weapon, Armor Notetags
 * - Uses JavaScript to determine the values for the basic parameters based on
 *   the code used to calculate its value.
 * - The variables 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', and
 *   'LUK' are used to determine the finalized value of the parameter. This
 *   variable is case sensitive.
 * - If a parameter is not present, its value will be treated as +0.
 * 
 * '''WARNING!''' If you are trying to calculate a value based off a full
 * parameter value, such as "ATK = user.atk * 0.10", it's going to break and
 * will cause an infinite loop. Use base parameter values instead.
 *
 * ---
 *
 * === Status Window Notetags ===
 *
 * The following notetags will affect the Shop Status Window info. If for any
 * reason the data that is displayed is not to your liking or insufficient,
 * you can change it up using the following notetags.
 *
 * ---
 *
 * <Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Status Info>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - If you do not like the generated data that's displayed, you can change it
 *   using this notetag to display what you want.
 * - Replace 'key' with one of the following for skills and items:
 *   - Consumable
 *   - Quantity
 *   - Occasion
 *   - Scope
 *   - Speed
 *   - Success Rate
 *   - Repeat
 *   - Hit Type
 *   - Element
 *   - Damage Multiplier
 *   - HP Recovery
 *   - MP Recovery
 *   - TP Recovery
 *   - HP Damage
 *   - MP Damage
 *   - TP Damage
 *   - User TP Gain
 *   - Added Effects
 *   - Removed Effects
 * - Replace 'key' with one of the following for weapons and armors:
 *   - 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', or 'LUK'
 *   - For those with VisuMZ_0_CoreEngine:
 *     - 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT', 'HRG', 'MRG', 'TRG'
 *     - 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR', 'MDR', 'FDR', 'EXR'
 *   - Only relevant if the Draw Style for equipment is "classic" or "double".
 * - Replace 'data' with the text data you want to visually appear. You may use
 *   text codes for this.
 * - This only affects info entries that are already visible and won't make
 *   other categories suddenly appear.
 * - For clarity regarding "Damage Multiplier" and "HP Recovery"/"HP Damage":
 *   - "Damage Multiplier" refers to the amount determined by damage formulas.
 *   - "HP Recovery"/"HP Damage" refers to the "Recover HP" database effect.
 *   - Likewise, the same will apply to "MP Recovery"/"MP Damage" if the damage
 *     formula type is to deal MP recovery/damage instead.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * <Custom Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Custom Status Info>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - If you want custom categories and data to be displayed for your items that
 *   aren't provided by the Shop Status Window Info to begin with, you can use
 *   this notetag to add in your own entries.
 *   - When used with weapon or armor database objects, this information is
 *     only relevant if the Draw Style for equipment is "classic" or "double".
 * - Replace 'key' with text of the exact label you want. You may use text
 *   codes for this.
 * - Replace 'data' with text of the exact text data you want. You may use text
 *   codes for this.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 * 
 * <Status Style: Compare>
 * <Status Style: Classic>
 * <Status Style: Double>
 *
 * - Used for: Weapon, Armor Notetags
 * - Changes up the way the shop status window displays data for this database
 *   object in particular.
 *     - Compare - Compares selected equip to equipped gear
 *       - Lists all main party actors
 *       - Displays the parameter differences when equipped
 *       - Calculates custom JS values
 *     - Classic - Shows basic parameters of selected equip
 *       - Involves no actors, only shows the item's stats
 *       - Shows weapon or armor specific parameters
 *       - Does not show custom JS values as those are calculated per actor
 *       - Does not show custom parameters as those are calculated per actor
 *       - Use <Status Info> and <Custom Status Info> notetags to overwrite or
 *         add custom data to classic equip data
 *     - Double - Shows basic parameters in double columns
 *       - Involves no actors, only shows the item's stats
 *       - Shows weapon or armor specific parameters
 *       - Does not show custom JS values as those are calculated per actor
 *       - Does not show custom parameters as those are calculated per actor
 *       - Use <Status Info> and <Custom Status Info> notetags to overwrite or
 *         add custom data to classic equip data
 * 
 * ---
 * 
 * <Custom Status Parameters: name, name, name>
 * 
 * - Used for: Weapon, Armor Notetags
 * - Requires VisuMZ_0_CoreEngine!
 *   - This will not work otherwise!
 * - Customize which parameters are displayed for this equipment object's shop
 *   status window.
 *   - This ONLY applies to the shop status window and not other windows.
 * - Replace 'name' with any of the following to display custom parameters:
 *   - 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', and 'LUK'
 *   - 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT', 'HRG', 'MRG', 'TRG'
 *   - 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR', 'MDR', 'FDR', 'EXR'
 *   - Does not work with custom parameters as those are calculated per actor.
 * - Parameters will be displayed in the order inserted into the notetag.
 *
 * ---
 * 
 * <Shop Picture Name: filename>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Enables a shop picture for the status window. This image can be seen in
 *   the item scene, shop scene, and skill scene if enabled.
 * - If this notetag is not used, there will be no image.
 * - Replace 'filename' with the filename of the graphic to use from the game
 *   project's img/pictures/ folder. Filenames are case sensitive. Leave out
 *   the filename extension from the notetag.
 * - Use the supporting notetags to determine where the image appears. If not,
 *   they will default to the background, fit to the window dimensions,
 *   centered at the middle of the window.
 * 
 * ---
 * 
 * <Shop Picture Layer: Background>
 * <Shop Picture Layer: Foreground>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Determines which layer the graphic will be drawn on.
 * - If the background layer is selected, the picture will appear behind the
 *   data text.
 * - If the foreground layer is selected, the picture will appear in front of
 *   the data text.
 * - If this notetag is not used, it will default to the background layer.
 * 
 * ---
 * 
 * <Shop Picture Max Width: x>
 * <Shop Picture Max Height: y>
 * <Shop Picture Max Dimensions: x, y>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Determines the maximum width and/or height for the image.
 * - This means the image will be automatically scaled proportionally to that
 *   width or height as long as everything else does not break boundaries.
 * - Replace 'x' and 'y' with number values representing the maximum dimensions
 *   the image can be in pixels.
 * - If these notetags are not used, the image will be automatically scaled to
 *   the dimensions of the shop status window.
 * 
 * ---
 * 
 * <Shop Picture Alignment: Left>
 * <Shop Picture Alignment: Center>
 * <Shop Picture Alignment: Right>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the horizontal alignment for the image.
 * - Left, center, right determines how it's aligned horizontally if the
 *   image does not horizontally fit in the width of the window.
 * - If any of these notetags are not used, the image will default to the
 *   'center' alignment.
 * 
 * ---
 * 
 * <Shop Picture Position: Top>
 * <Shop Picture Position: Middle>
 * <Shop Picture Position: Bottom>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the vertical position for the image.
 * - Top, middle, bottom determines how it's positioned vertically if the
 *   image does not vertically fit in the width of the window.
 * - If any of these notetags are not used, the image will default to the
 *   'middle' position.
 * 
 * ---
 * 
 * <Shop Picture Offset X: +x>
 * <Shop Picture Offset X: -x>
 * 
 * <Shop Picture Offset Y: +y>
 * <Shop Picture Offset Y: -y>
 * 
 * <Shop Picture Offset: +x, +y>
 * <Shop Picture Offset: -y, -y>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Offsets the X and Y positions of the image in the shop status window.
 * - X offsets adjust the horizontal position by x pixels.
 *   - Positive goes right.
 *   - Negative goes left.
 * - Y offsets adjust the horizontal position by y pixels.
 *   - Positive goes down.
 *   - Negative goes up.
 * - Replace 'x' and 'y' with number values representing the pixels to offset
 *   the image by. The '+' and '-' signs are required.
 * - If none of these notetags are used, there will be no offsets.
 * 
 * ---
 * 
 * <Shop Picture Opacity: x>
 * <Shop Picture Opacity: x%>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the opacity of the image used.
 * - When using 'x' and not 'x%', use a number between 0 and 255.
 *   - The closer to 0, the more transparent the image is.
 *   - The closer to 255, the more opaque the image is.
 * - When using 'x%' and not 'x', use a number between 0% and 100%.
 *   - The closer to 0%, the more transparent the image is.
 *   - The closer to 100%, the more opaque the image is.
 * 
 * ---
 *
 * === Shop Menu Notetags ===
 *
 * These notetags adjust how prices and such are managed inside the Shop Menu
 * as well as whether or not some items are visible depending on switch states.
 *
 * ---
 *
 * <Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Adjusts the buying price for this item.
 * - Replace 'x' with a number depicting the desired value for the buy price.
 * - This allows you to bypass the RPG Maker MZ editor's limitation of 999,999.
 *
 * ---
 *
 * <Can Sell>
 * <Cannot Sell>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Makes the item either always sellable or cannot be sold.
 * - This bypasses the game's internal hard-coding to prevent items with a
 *   price of 0 from being able to be sold.
 * - This bypasses the game's internal hard-coding to always allow items with
 *   a price value of being able to be sold.
 *
 * ---
 *
 * <Sell Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Changes the sell price to be something different than the default amount.
 * - Replace 'x' with a number depicting the desired value for the sell price.
 *
 * ---
 *
 * <Show Shop Switch: x>
 *
 * <Show Shop All Switches: x,x,x>
 * <Show Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Shop Switch: x>
 *
 * <Hide Shop All Switches: x,x,x>
 * <Hide Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Cannot Sell Switch: x>
 *
 * <Cannot Sell All Switches: x,x,x>
 * <Cannot Sell Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the sellability of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's sellability.
 * - If 'All' notetag variant is used, item cannot be sold until all switches
 *   are ON. Otherwise, it can be sold.
 * - If 'Any' notetag variant is used, item cannot be sold if any of the
 *   switches are ON. Otherwise, it can be sold.
 *
 * ---
 * 
 * <Buy Turn On Switch: x>
 * <Buy Turn On Switches: x, x, x>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - When this item, weapon, or armor is bought in the shop scene, turn on the
 *   switch(es) 'x'.
 * - Replace 'x' with a number representing the ID of the switch to turn on.
 *   - Insert multiple 'x' values to turn on multiple switches upon buying.
 * 
 * ---
 * 
 * <Buy Turn Off Switch: x>
 * <Buy Turn Off Switches: x, x, x>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - When this item, weapon, or armor is bought in the shop scene, turn off the
 *   switch(es) 'x'.
 * - Replace 'x' with a number representing the ID of the switch to turn off.
 *   - Insert multiple 'x' values to turn off multiple switches upon buying.
 * 
 * ---
 * 
 * <Sell Turn On Switch: x>
 * <Sell Turn On Switches: x, x, x>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - When this item, weapon, or armor is sold in the shop scene, turn on the
 *   switch(es) 'x'.
 * - Replace 'x' with a number representing the ID of the switch to turn on.
 *   - Insert multiple 'x' values to turn on multiple switches upon selling.
 * 
 * ---
 * 
 * <Sell Turn Off Switch: x>
 * <Sell Turn Off Switches: x, x, x>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - When this item, weapon, or armor is sold in the shop scene, turn off the
 *   switch(es) 'x'.
 * - Replace 'x' with a number representing the ID of the switch to turn off.
 *   - Insert multiple 'x' values to turn off multiple switches upon selling.
 * 
 * ---
 *
 * === JavaScript Notetags: Shop Menu ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Buy and Sell prices.
 *
 * ---
 *
 * <JS Buy Price>
 *  code
 *  code
 *  price = code;
 * </JS Buy Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the buying 'price' of the item.
 * - Insert the final buy price into the 'price' variable.
 * - The 'item' variable refers to the item being bought.
 *
 * ---
 *
 * <JS Sell Price>
 *  code
 *  code
 *  price = code;
 * </JS Sell Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the selling 'price' of the item.
 * - Insert the final sell price into the 'price' variable.
 * - The 'item' variable refers to the item being sold.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change Equip Slots
 * - Forcefully change the actor(s) equip slots.
 * - These will persist through class changes.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Equip Slots:
 *   - Insert the equip slots you want the actor(s) to have.
 *   - These entries are case-sensitive.
 *
 * ---
 *
 * Actor: Reset Equip Slots
 * - Reset any forced equip slots for the actor(s).
 * - Equip slots will then be based on class.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Purify Plugin Commands ===
 * 
 * ---
 * 
 * Purify: Target Actor(s)
 * - Purifies target actor(s) of any cursed weapons or armors.
 * - Cannot be used in battle.
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 * 
 * ---
 * 
 * Purify: Whole Party
 * - Purifies whole party of any cursed weapons or armors.
 * - Cannot be used in battle.
 * 
 * ---
 * 
 * === Shop Plugin Commands ===
 * 
 * ---
 *
 * Shop: Advanced
 * - Make it easier to put together inventories for a shop.
 * - WARNING: Does not allow for event-specific prices.
 *
 *   Step 1: Item ID's
 *   - Select which Item ID ranges to add.
 *
 *   Step 2: Weapon ID's
 *   - Select which Weapon ID ranges to add.
 *
 *   Step 3: Armor ID's
 *   - Select which Armor ID ranges to add.
 *
 *   Step 4: Purchase Only?
 *   - Make the shop purchase-only?
 * 
 *   Optional:
 * 
 *     Blacklist
 *     - A list of categories to blacklist from the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 * 
 *     Whitelist
 *     - A list of categories to whitelist for the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 *
 * This Plugin Command primarily functions as an alternative to the editor's
 * "Shop Processing" event command as that one requires you to add items one at
 * a time, making it extremely tedious to add large amounts of items. This
 * Plugin Command will mitigate that by allowing ID ranges to determine which
 * items to make available.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Menu Settings
 * ============================================================================
 *
 * The Item Menu Settings allow you to adjust specifics on how key objects and
 * windows in the Item Menu Scene operate.
 *
 * ---
 *
 * General Window
 *
 *   Use Updated Layout:
 *   - Use the Updated Item Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *   - If you are using the VisuStella MZ Core Engine and the "Modern Controls"
 *     Plugin Parameter, please read through that section in case you have any
 *     questions about how to switch between categories when using multiple
 *     columns of items at a time.
 *
 * ---
 *
 * Item Quantity
 *
 *   Item Max:
 *   Weapon Max:
 *   Armor Max:
 *   - The default maximum quantity for items, weapons, and/or armors.
 * 
 *   Quantity Format:
 *   - How to display an item's quantity.
 *   - %1 - Item Quantity
 *
 *   Font Size:
 *   - Default font size for item quantity.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Item Menu?:
 *   - Show the Shop Status Window in the Item Menu?
 *   - This is enabled if the Updated Layout is on.
 *
 *   Adjust List Window?:
 *   - Automatically adjust the Item List Window in the Item Menu if using the
 *     Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 *
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Status Window in the
 *     Item Menu.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Switch Category:
 *   - Button assist text used for switching categories.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Categories
 * ============================================================================
 *
 * Item Categories appear both in the Item Menu Scene and Shop Menu Scene (but
 * only under the Sell command). These Plugin Parameters give you the ability
 * to add in the specific categories you want displayed, remove the ones you
 * don't, and associate them with icons.
 *
 * ---
 *
 * List
 *
 *   Category List
 *   - A list of the item categories displayed in the Item/Shop menus.
 * 
 *     Type:
 *     - A list of the item categories displayed in the Item/Shop menus.
 *     - Replace x with ID numbers or text.
 *     - AllItems, RegularItems, KeyItems
 *     - HiddenItemA, HiddenItemB
 *     - Consumable, Nonconsumable
 *     - AlwaysUsable, BattleUsable, FieldUsable, NeverUsable
 *     - AllWeapons, WType:x
 *     - AllArmors, AType:x, EType:x
 *     - Category:x
 * 
 *     Icon:
 *     - Icon used for this category.
 *     - Use 0 for no icon.
 * 
 *     Visibility Switch:
 *     - This Switch must be turned ON in order for the category to show.
 *     - Use 0 for no Switch requirement.
 * 
 *     Sort By:
 *     - Sort this category (in Scene_Item and Scene_Shop only) this way.
 *
 *   Style:
 *   - How do you wish to draw categorie entries in the Category Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 *
 *   Text Alignment
 *   - Decide how you want the text to be aligned.
 *
 * ---
 *
 * Vocabulary
 *
 *   Hidden Item A
 *   Hidden Item B
 *   Consumable
 *   Nonconsumable
 *   Always Usable
 *   Battle Usable
 *   Field Usable
 *   Never Usable
 *   - How these categories are named in the Item Menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: NEW! Labels
 * ============================================================================
 *
 * Whenever the player receives a new item(s), a NEW! Label can be placed on
 * top of the item's icon when browsing a menu displaying the item(s). This is
 * a quality of life addition from more modern RPG's to help players figure out
 * what they've recently received. The following are Plugin Parameters made to
 * adjust how the NEW! Labels are handled in-game.
 *
 * ---
 *
 * NEW! Labels
 * 
 *   Use NEW! Labels?:
 *   - Use the NEW! Labels or not?
 * 
 *   Icon:
 *   - The icon index used to represent the NEW! text.
 *   - Use 0 to not draw any icons.
 * 
 *   Text:
 *   - The text written on the NEW! Label.
 * 
 *     Font Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *     Font Size:
 *     - The font size used for the NEW! text.
 * 
 *   Fade Limit:
 *   - What's the upper opaque limit before reversing?
 * 
 *   Fade Speed:
 *   - What's the fade speed of the NEW! Label?
 * 
 *   Offset X:
 *   - How much to offset the NEW! Label's X position by.
 * 
 *   Offset Y:
 *   - How much to offset the NEW! Label's Y position by.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Equip Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust the Equipment Menu Scene, ranging from using
 * a more updated and modern layout, changing the styles of other windows, and
 * other key visual aspects of the Equip Menu Scene. Other settings here allow
 * you to adjust how equipment operate under certain rulings, too.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Equip Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 * 
 *     Param Font Size:
 *     - The font size used for parameter values.
 * 
 *     Show Menu Portraits?:
 *     - If Main Menu Core is installed, display the Menu Portraits instead of
 *       the actor's face in the status window?
 * 
 *     JS: Portrait Upper:
 *     - If Menu Portraits are available, this is code used to draw the upper
 *       data like this in the Status Window.
 * 
 *     JS: Face Upper:
 *     - If faces used used, this is code used to draw the upper data like this
 *       in the Status Window.
 * 
 *     JS: Parameter Lower:
 *     - Code to determine how parameters are drawn in the Status Window.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 * 
 *   Status Window Width:
 *   - The usual width of the status window if using the non-Updated Equip
 *     Menu Layout.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *   Cursed Equip Popup:
 *   - Text popup appears when an actor equips a cursed weapon/armor.
 *   - Text codes allowed.
 *   - Requires VisuMZ_0_CoreEngine!
 *   - Empty to not use.
 *   -  %1 - Actor, %2 - Equip, %3 - Icon.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Equip Icon:
 *   - The icon used for the Equip command.
 * 
 *     Help Description:
 *     - Help description used when this command is selected.
 *     - Text codes allowed.
 * 
 *   Add Optimize Command?:
 *   - Add the "Optimize" command to the Command Window?
 * 
 *     Help Description:
 *     - Help description used when this command is selected.
 *     - Text codes allowed.
 * 
 *     Optimize Icon:
 *     - The icon used for the Optimize command.
 * 
 *   Add Clear Command?:
 *   - Add the "Clear" command to the Command Window?
 * 
 *     Help Description:
 *     - Help description used when this command is selected.
 *     - Text codes allowed.
 * 
 *     Clear Icon:
 *     - The icon used for the Clear command.
 *
 * ---
 *
 * Remove Equip
 * 
 *   Icon:
 *   - Icon used for equipment removal.
 * 
 *   Text:
 *   - Text used for equipment removal.
 * 
 *   Use SHIFT Shortcut?:
 *   - Add the "Shift" button as a shortcut key to removing items?
 *
 * ---
 *
 * Rulings
 * 
 *   Equip-Adjust HP/MP:
 *   - Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * 
 *   Non-Removable Types:
 *   - Insert ID's of the Equipment Types that must always have an item
 *     equipped and cannot be empty.
 * 
 *   Non-Optimized Types:
 *   - Insert ID's of the Equipment Types that will be ignored when equipment
 *     is being optimized.
 *
 * ---
 *
 * Button Assist Window
 *
 *   SHIFT: Remove:
 *   - Button assist text used for the SHIFT Remove Shortcut.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you a number of options to adjust the Shop
 * Menu Scene. These options range from enabling an updated and modern layout,
 * adjust how various key visual aspects appear, and determine how prices can
 * be affected when it comes to selling them or buying them (for coders).
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Shop Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 * 
 * Switches:
 * 
 *   Switch: Buy:
 *   - Buying items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 *   Switch: Sell
 *   - Selling items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 * ---
 *
 * Command Window
 * 
 *   Hide Unavailable?:
 *   - Hide all unavailable commands like when a shop is set to Purchase Only?
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Buy Icon:
 *   - The icon used for the Buy command.
 * 
 *   Sell Icon:
 *   - The icon used for the Sell command.
 * 
 *   Cancel Icon:
 *   - The icon used for the Cancel command.
 * 
 *   Rename "Cancel":
 *   - Rename Cancel to something more logical for the Shop Menu Scene.
 *
 * ---
 *
 * Prices
 * 
 *   Sell Price Rate:
 *   - The default sell price rate.
 * 
 *   JS: Buy Price:
 *   - Modificatons made to the buy price before finalizing it.
 * 
 *   JS: Sell Price:
 *   - Modificatons made to the sell price before finalizing it.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Small Increment:
 *   Large Increment:
 *   - Text used for changing amount bought/sold.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Status Window
 * ============================================================================
 *
 * These Plugin Parameters focuses on the Shop Status Window and determines how
 * its data is displayed.
 *
 * ---
 *
 * General
 * 
 *   Window Width:
 *   - The usual width of the status window.
 * 
 *   Parameter Font Size:
 *   - Font size used for parameter changes.
 * 
 *   Translucent Opacity:
 *   - Opacity setting used for translucent window objects.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Equipment Data
 * 
 *   Data Style:
 *   - How do you wish to display equipment data?
 *     - Compare - Compares selected equip to equipped gear
 *       - Lists all main party actors
 *       - Displays the parameter differences when equipped
 *       - Calculates custom JS values
 *     - Classic - Shows basic parameters of selected equip
 *       - Involves no actors, only shows the item's stats
 *       - Shows weapon or armor specific parameters
 *       - Does not show custom JS values as those are calculated per actor
 *       - Does not show custom parameters as those are calculated per actor
 *       - Use <Status Info> and <Custom Status Info> notetags to overwrite or
 *         add custom data to classic equip data
 *     - Double - Shows basic parameters in double columns
 *       - Involves no actors, only shows the item's stats
 *       - Shows weapon or armor specific parameters
 *       - Does not show custom JS values as those are calculated per actor
 *       - Does not show custom parameters as those are calculated per actor
 *       - Use <Status Info> and <Custom Status Info> notetags to overwrite or
 *         add custom data to classic equip data
 * 
 *     Compare Style:
 * 
 *       Already Equipped:
 *       - Marker used to show an actor cannot equip an item.
 * 
 *       Can't Equip:
 *       - Marker used to show an actor cannot equip an item.
 * 
 *       No Changes:
 *       - Marker used to show no changes have occurred.
 * 
 *       JS: Draw Equip Data:
 *       - Code used to draw the equipment data for the Shop Status Window.
 * 
 *     Classic Style:
 * 
 *       Added Weapon Params:
 *       Added Armor Params:
 *       - Display these parameters when a weapon/armor is selected.
 *       - Requires VisuMZ_0_CoreEngine!
 * 
 *       JS: Draw Equip Data:
 *       - Code used to draw the equipment data for the Shop Status Window.
 * 
 *     Double Style:
 * 
 *       Added Weapon Params:
 *       Added Armor Params:
 *       - Display these parameters when a weapon/armor is selected.
 *       - Requires VisuMZ_0_CoreEngine!
 * 
 *       JS: Draw Equip Data:
 *       - Code used to draw the equipment data for the Shop Status Window.
 * 
 *   Delay MS:
 *   - How many milliseconds (MS) to delay the preview update?
 *   - This is to prevent lag spikes for equips only.
 *
 * ---
 *
 * Item Data
 * 
 *   Max State/Buff Icons:
 *   - Maximum number of icons that can be displayed for Add/Remove
 *     States/Buffs.
 * 
 *   Multiplier Standard:
 *   - Constant standard to filter out random values when calculating the
 *     damage multiplier.
 * 
 *   JS: Draw Item Data:
 *   - Code used to draw the item data for the Shop Status Window.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Consumable:
 *   Occasions:
 *   Scope:
 *   Speed:
 *   Success Rate:
 *   Repeats:
 *   Hit Type:
 *   Element:
 *   Damage Type:
 *   Effects:
 *   - Vocabulary used for these data entries.
 *   - Some of these have Plugin Parameters have sub-entries.
 * 
 *   NOTE: Regarding Damage Labels
 * 
 *   If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * 
 *   Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.58: February 20, 2025
 * * Bug Fixes!
 * ** Optimize no longer allows player to bypass the following notetags:
 *    <Equip Copy Limit: x>, <Equip Weapon Type Limit: x>, and
 *    <Equip Armor Type Limit: x>. Fix made by Arisu.
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Better compatibility with different icon sizes.
 * 
 * Version 1.57: January 16, 2025
 * * Bug Fixes!
 * ** Fixed an issue where certain icons were not aligning properly at
 *    different line height settings. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added extra clarity for <Status Info> notetag:
 * *** For clarity regarding "Damage Multiplier" and "HP Recovery"/"HP Damage":
 * **** "Damage Multiplier" refers to the amount determined by damage formulas.
 * **** "HP Recovery"/"HP Damage" refers to the "Recover HP" database effect.
 * **** Likewise, the same will apply to "MP Recovery"/"MP Damage" if the
 *      damage formula type is to deal MP recovery/damage instead.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Status Style: type>
 * **** Changes up the way the shop status window displays data for this
 *      database object in particular.
 * *** <Custom Status Parameters: name, name, name>
 * **** Customize which parameters are displayed for this equipment object's
 *      shop status window.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.56: December 19, 2024
 * * Bug Fixes!
 * ** Fixed a bug where newly added equipment would cause crashes upon
 *    interaction. Fix made by Irina.
 * 
 * Version 1.55: November 14, 2024
 * * Bug Fixes!
 * ** Fixed a bug where you can no longer attempt to equip an actor with zero
 *    equip slots and causing a crash. Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated <Status Info>
 * *** Used for: Skill, Item, Weapon, Armor Notetags
 * **** Replace 'key' with one of the following for weapons and armors:
 * ***** 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', or 'LUK'
 * ***** For those with VisuMZ_0_CoreEngine:
 * ****** 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT', 'HRG', 'MRG', 'TRG'
 * ****** 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR', 'MDR', 'FDR', 'EXR'
 * **** Only relevant if the Draw Style for equipment is "classic" or "double".
 * ** Updated <Custom Status Info> notetag:
 * *** Used for: Skill, Item, Weapon, Armor Notetags
 * **** When used with weapon or armor database objects, this information is
 *      only relevant if the Draw Style for equipment is "classic" or "double".
 * * New Feature!
 * ** New Plugin Parameters: 
 * *** Parameters > Shop Status Window > Data Style:
 * **** How do you wish to display equipment data?
 * ***** Compare - Compares selected equip to equipped gear
 * ****** Lists all main party actors
 * ****** Displays the parameter differences when equipped
 * ****** Calculates custom JS values
 * ***** Classic - Shows basic parameters of selected equip
 * ***** Double - Shows basic parameters in double columns
 * ****** Involves no actors, only shows the item's stats
 * ****** Shows weapon or armor specific parameters
 * ****** Does not show custom JS values as those are calculated per actor
 * ****** Does not show custom parameters as those are calculated per actor
 * ****** Use <Status Info> and <Custom Status Info> notetags to overwrite or
 *        add custom data to classic equip data
 * **** Data Style > Classic Style:
 * **** Data Style > Double Style:
 * ***** Added Weapon Params
 * ***** Added Armor Params
 * ****** Display these parameters when a weapon/armor is selected.
 * ****** Requires VisuMZ_0_CoreEngine!
 * 
 * Version 1.54: October 17, 2024
 * * Feature Update!
 * ** If "Modern Controls" is selected while "Remove Equip" and "Optimize" are
 *    gone from the Equip Menu, right click will exit the menu. Feature added
 *    by Arisu.
 * 
 * Version 1.53: July 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added warning to <JS Parameters>:
 * *** If you are trying to calculate a value based off a full parameter value,
 *     such as "ATK = user.atk * 0.10", it's going to break and will cause an
 *     infinite loop. Use base parameter values instead.
 * * New Features!
 * ** New notetags added by Irina:
 * *** <ID Sort Priority: x>
 * **** Used for Scene_Item, Scene_Equip, Scene_Battle, and Scene_Shop's sell
 *      option (only when selling).
 * **** Changes sorting priority by ID for item, weapon, or armor to 'x'. 
 * **** Default priority level is '50'.
 * **** Items, weapons, and armors with higher priority values will be sorted
 *      higher up on the list while lower values will be lower on the list.
 * 
 * Version 1.52: May 16, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Parameters > Item Categories > Category List > Category > Sorted By:
 * **** You can now sort specific item categories by ID or Name.
 * **** Only usable within Scene_Item and Scene_Shop.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.51: December 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug where if an item is unequipped, it may cause a crash. Fix
 *    made by Arisu.
 * ** Fixed a bug where <Proxy: id> did not properly give the proxy item. Fix
 *    made by Arisu.
 * 
 * Version 1.50: November 16, 2023
 * * Bug Fixes!
 * ** <JS Buy Price> and <JS Sell Price> was not working properly. Fix made
 *    by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Cursed>
 * **** If this weapon or armor is equipped, it cannot manually be removed by
 *      the player until it is purified.
 * **** To remove it, it must be done by event commands, script calls, or
 *     through the Purify-related Plugin Commands provided by this plugin.
 * **** Once purified, the weapon or armor will become unequipped unless it has
 *     a purify transformation.
 * **** If the newly transformed weapon/armor is equippable, it will remain in
 *     the actor's equipment slots.
 * **** If you are using VisuMZ_2_WeaponSwapSystem, weapons cannot become
 *      cursed in order to allow free weapon swapping. Weaponry will not be
 *      cursed if VisuMZ_2_WeaponSwapSystem is installed.
 * *** <Purify Transform: id>
 * *** <Purify Transform: name>
 * **** If this notetag is present on a <Cursed> weapon or armor, then upon the
 *      actor receiving purification, the weapon or armor will transform into a
 *      different item.
 * ** New Plugin Commands added by Arisu:
 * *** Purify: Target Actor(s)
 * **** Purifies target actor(s) of any cursed weapons or armors.
 * *** Purify: Whole Party
 * **** Purifies whole party of any cursed weapons or armors.
 * ** Added "Cursed Equip Popup" to Equip Scene Plugin Parameters.
 * *** Text popup appears when an actor equips a cursed weapon/armor.
 * ** Added "Ally or Enemy" or "Enemy or Ally" scopes to Shop Status Window
 *    Plugin Parameters.
 * *** If unused, will default to "1 Ally" or "1 Enemy" like usual.
 *     Added by Irina.
 * 
 * Version 1.49: October 12, 2023
 * * Bug Fixes!
 * ** Fixed a problem where for weapon types, all weapon types are listed in
 *    the equip menu even when the actor cannot equip them (though they would
 *    be disabled). Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Olivia and sponsored by AndyL:
 * *** <Added EType: x>
 * *** <Added ETypes: x, x, x>
 * **** This is for armors only and does NOT work with weapons!
 * **** Allows a piece of armor to belong to multiple ETypes. This means a
 *      glove can be equipped as "Armgear" or as an "Accessory" if you so
 *      choose.
 * 
 * Version 1.48: September 14, 2023
 * * Bug Fixes!
 * ** Fixed a problem where the help window position of the non-updated layout
 *    would appear in the wrong position. Fix made by Irina.
 * * Optimization Update!
 * ** Plugin should run more optimized when weapons and armors exceed 2000
 *    in database quantity.
 * 
 * Version 1.47: July 13, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause the shop status window to display incorrect
 *    removed buffs and debuffs. Fix made by Olivia.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Changes made to dynamic shop listings in order to update upon listing
 *    changes rather than having to enter and exit the shop again. Update made
 *    by Arisu.
 * * New Features!
 * ** New notetag effects added by Arisu and sponsored by AndyL:
 * *** <Conserve: x%>
 * **** Gives the item a percent chance when used to not consume the item.
 * *** <Buy Turn On Switches: x, x, x>
 * *** <Buy Turn Off Switches: x, x, x>
 * *** <Sell Turn On Switches: x, x, x>
 * *** <Sell Turn Off Switches: x, x, x>
 * **** When buying/selling an item, weapon, or armor with these notetags,
 *      turn on/off switch(es) 'x'.
 * *** New Plugin Parameters added by Arisu:
 * **** Params > Settings > Shop Status Window > Equipment Data > Delay MS:
 * ***** How many milliseconds (MS) to delay the preview update?
 * ***** This is to prevent lag spikes for equips only.
 * 
 * Version 1.46: June 15, 2023
 * * Bug Fixes!
 * ** Fixed a problem where the help and input modes are not adequately
 *    adjusted when not used with the updated layout or without the Options
 *    Core custom UI placement. Fix made by Arisu.
 * 
 * Version 1.45: May 18, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause equip slots to not be recognized properly if
 *    the equip slot name ends in a space.
 * 
 * Version 1.44: April 13, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag effects added by Arisu and sponsored by Anon:
 * *** <Equip For Class Only: x>
 * *** <Equip For Classes Only: x, x, x>
 * *** <Equip For Class Only: name>
 * *** <Equip For Classes Only: name, name, name>
 * **** The piece of equipment can only be worn by the listed classes.
 * *** <Equip Requirements> notetag added.
 * **** Define multiple requirements that the actor needs to meet in order for
 *      this equip item to be equippable.
 * **** See help file for more information on the types of requirements that
 *      can be added.
 * 
 * Version 1.43: March 16, 2023
 * * Bug Fixes!
 * ** Artifact armors should now update and refresh the party members' cache
 *    upon acquisition. Fix made by Olivia.
 * 
 * Version 1.42: February 16, 2023
 * * Bug Fixes!
 * ** Proxy items should no longer cause infinite loops if they're made to
 *    reference other proxy items in a circular fashion. Instead, they just
 *    give the exact first found proxy instead of cycling through others.
 *    Fix made by Arisu.
 * 
 * Version 1.41: December 15, 2022
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and sponsored by Anon:
 * *** Equip Scene > Equip Command > Help Description
 * *** Equip Scene > Optimize Command > Help Description
 * *** Equip Scene > Clear Command > Help Description
 * **** Help description used when these commands are selected.
 * 
 * Version 1.40: October 20, 2022
 * * Feature Update!
 * ** For the shop status window, when comparing equipment of a type where
 *    there are multiple equipment slots (such as accessories), the plugin will
 *    now check for an empty equipment slot first and then make calculations
 *    there. Otherwise, it will use the first available equipment slot of that
 *    type regardless of the equipped item. Update made by Arisu.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.39: September 29, 2022:
 * * Feature Update!
 * ** Changed the default code for the equip scene's status window display to
 *    prevent the face graphic and basic actor stats from going above the
 *    window boundaries if there are too many parameters displayed in the
 *    status window at a time.
 * ** If you already have this plugin installed the changes will not be
 *    reflected unless you do the following:
 * **** BACKUP your game project.
 * **** REMOVE this plugin from the Plugin Manager list.
 * **** REINSTALL this plugin into the Plugin Manager list.
 * **** SAVE the game project.
 * 
 * Version 1.38: March 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New mechanics and notetags added by Olivia and sponsored by Anon:
 * *** <Party Artifact>
 * *** <Troop Artifact>
 * *** <Stackable Party Artifact>
 * *** <Stackable Troop Artifact>
 * **** Armors only! This armor cannot be equipped at all. However, by simply
 *      being in the party's inventory, its parameter bonuses and traits will
 *      be applied globally throughout the whole party or troop (depending on
 *      the notetag). Add both notetags to affect both groups.
 * **** The normal versions of the notetag is only applied once regardless of
 *      the number of copies are found in the party's inventory.
 * **** The stackable versions of the notetag will have the bonuses and traits
 *      stacked multiple times relative to the number of copies found in the
 *      party's inventory.
 * **** This item will NOT be added during the setup phase for Battle Tests.
 * ***** If you want to add the item, do it manually.
 * 
 * Version 1.37: December 23, 2021
 * * Compatibility Update
 * ** Created foundation for proxy items to be used in any applicable system
 *    and extension plugins. Update made by Arisu.
 * 
 * Version 1.36: December 2, 2021
 * * Feature Update!
 * ** For those using custom parameters from the Core Engine and do not have
 *    the parameters all-capitalized, the plugin will automatically do it for
 *    you to prevent errors. Update made by Olivia.
 * 
 * Version 1.35: November 18, 2021
 * * Compatibility Update!
 * ** If this plugin's updated scene is disabled, the Help Window locations for
 *    the Item, Equip, and Shop Scenes should now be at their designated
 *    locations as calculated by the VisuMZ Core Engine instead of the RMMZ
 *    default location. Update made by Irina.
 * 
 * Version 1.34: October 28, 2021
 * * Feature Update
 * ** Added fail safe checks for projects that are using old data for starting
 *    equipment that no longer exist, thus preventing the game from opening.
 *    Update made by Arisu.
 * 
 * Version 1.33: August 6, 2021
 * * Documentation Update!
 * ** Removed "Weapon" and "Armor" from "Used For" for <Status Info>. This was
 *    an unintended piece of documentation.
 * 
 * Version 1.32: July 23, 2021
 * * Bug Fixes!
 * ** Fixed a bug that would cause armor duplication when changing to classes
 *    with unaligned equipment slot types. Fix made by Arisu.
 * 
 * Version 1.31: July 9, 2021
 * * Feature Update!
 * ** Added a failsafe for price manipulation JavaScript to never have prices
 *    drop below 0 if possible. Update made by Arisu.
 * 
 * Version 1.30: July 2, 2021
 * * Documentation Update!
 * ** Added an extra note to the help file for the following:
 *    Plugin Parameters > Item Menu Settings > List Window > Columns
 * *** If you are using the VisuStella MZ Core Engine and the "Modern Controls"
 *     Plugin Parameter, please read through that section in case you have any
 *     questions about how to switch between categories when using multiple
 *     columns of items at a time.
 *    
 * 
 * Version 1.29: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Feature Update!
 * ** Phantom data when changing equipment types in the database should no
 *    longer affect actors with cached equip ID's. Update made by Arisu.
 * 
 * Version 1.28: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.27: May 21, 2021
 * * Bug Fixes!
 * ** Using the mouse right click in the Equip Scene while inside of the item
 *    to slot window will no longer exit the Equip Scene. Fix made by Yanfly.
 * 
 * Version 1.26: April 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** "VisuStella MZ Compatibility" added VisuMZ_1_BattleCore section regarding
 *    Damage Multiplier and Healing Multiplier vocabulary settings to reduce
 *    commonly asked questions.
 * * New Features!
 * ** New notetags added by Irina and sponsored by Archeia:
 * *** <Shop Picture Name: filename>
 * *** <Shop Picture Layer: x>
 * *** <Shop Picture Max Width: x>
 * *** <Shop Picture Max Height: y>
 * *** <Shop Picture Max Dimensions: x, y>
 * *** <Shop Picture Alignment: x>
 * *** <Shop Picture Position: y>
 * *** <Shop Picture Offset X: +x>
 * *** <Shop Picture Offset X: -x>
 * *** <Shop Picture Offset Y: +y>
 * *** <Shop Picture Offset Y: -y>
 * *** <Shop Picture Offset: +x, +y>
 * *** <Shop Picture Offset: -x, -y>
 * *** <Shop Picture Opacity: x>
 * *** <Shop Picture Opacity: x%>
 * **** Add images from the game project's img/pictures/ folder to display in
 *      the Shop Status Window.
 * 
 * Version 1.25: April 23, 2021
 * * Documentation Update!
 * ** Added clarity to the <param: +x> and <param: -x> notetags:
 * *** These notetags do NOT work with X Parameters, S Parameters, or any
 *     custom parameters. These notetags ONLY work with the base parameters.
 * 
 * Version 1.24: April 16, 2021
 * * Bug Fixes!
 * ** Changing an actor's equipment slots to past their original amount will no
 *    longer yield errors with duplicate slot types. Fix made by Arisu.
 * ** Completely selling an item should now refresh the help window to the new
 *    selected item's help description. Fix made by Arisu.
 * * Optimization Update!
 * ** Non-removable equipment restrictions for the equipment scene are now
 *    better optimized. Update made by Olivia.
 * 
 * Version 1.23: April 2, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: March 26, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_4_BreakShields plugin.
 * 
 * Version 1.21: March 5, 2021
 * * Feature Update!
 * ** Custom equipment slots are disabled during Battle Testing for better
 *    accuracy and results.
 * 
 * Version 1.20: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Buy
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Sell
 * **** Buying/selling items in the Shop Scene turns this Switch to ON.
 * **** Switch reverts to OFF whenever the Shop Scene opens.
 * **** These switches can be used after a "Shop Processing" event command to
 *      determine if the player has bought an item, bought and sold an item,
 *      sold an item, or neither.
 * 
 * Version 1.19: January 29, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Irina.
 * *** <Equip Copy Limit: x>
 * **** Sets a maximum number of copies that the actor can wear of this
 *      equipment. Usage Example: Actors can only equip one copy of the
 *      "One-of-a-Kind Ring" on at any time despite having empty accessory
 *      slots because the ring has a <Equip Copy Limit: 1> notetag.
 * *** <Equip Weapon Type Limit: x>
 * **** This weapon cannot be equipped with other weapons of the same type once
 *      the limited amount has been reached. Usage Example: A dualwielding
 *      warrior who can only equip one sword and a dagger but never two swords
 *      or two daggers because the swords and daggers all have the
 *      <Equip Weapon Type Limit: 1> notetags on them.
 * *** <Equip Armor Type Limit: x>
 * **** This armor cannot be equipped with other armors of the same type once
 *      the limited amount has been reached. Usage Example: People cannot equip
 *      more than two glove accessories on at a time because the glove is a
 *      "Glove" armor-type and each glove item has the
 *      <Equip Armor Type Limit: 2> notetags on them.
 * 
 * Version 1.18: January 15, 2021
 * * Bug Fixes!
 * ** Pressing "Shift" to remove equipment will now refresh the status window
 *    unlike before. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Item Menu Settings > Background Type
 * 
 * Version 1.17: January 1, 2021
 * * Bug Fixes!
 * ** Equipping should be working properly again. Fix made by Yanfly.
 * 
 * Version 1.16: December 25, 2020
 * * Bug Fixes!
 * ** Equip-Adjust HP/MP should work properly now. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that if the VisuStella
 *    Battle Core is installed, then all battle scope items are visible, but
 *    not necessarily enabled if they are disabled otherwise.
 * 
 * Version 1.15: December 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that it removes the
 *    usable item from visibility as well if the actor unable to use it is the
 *    only person in the party.
 * 
 * Version 1.14: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.13: December 4, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Actor: Change Equip Slots
 * *** Actor: Reset Equip Slots
 * **** These plugin commands allow you to forcefully change the equip slots
 *      available to an actor regardless of the slots provided by its class as
 *      well as reset them.
 * 
 * Version 1.12: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 8, 2020
 * * Bug Fix!
 * ** Font size ratio for the shop status window now scales to a hard coded
 *    value to prevent smaller font sizes from expanding icon sizes. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Currency display in the shop menu is now reflected upon how the plugin
 *    parameters set them to display. Update made by Arisu.
 * 
 * Version 1.10: November 1, 2020
 * * Feature Update!
 * ** Modern Controls compatibility with Core Engine no longer enables the
 *    Item Categories window and child classes to utilize the Home/End keys.
 * 
 * Version 1.09: October 25, 2020
 * * Bug Fixes!
 * ** "All Items" category should now display the "Items" text. Fix by Irina.
 * ** WType, AType, and EType categories now work with text. Fix by Irina.
 *
 * Version 1.08: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.07: October 11, 2020
 * * Bug Fixes!
 * ** XParams and SParams in the Window_EquipStatus window will no longer show
 *    a non-percentile difference if the original value is not a whole value.
 *    Fix made by Yanfly.
 * 
 * Version 1.06: October 4, 2020
 * * Bug Fixes!
 * ** Select Item event command now displays the default amount of columns
 *    instead of whatever setting is made with the plugin parameters.
 * 
 * Version 1.05: September 27, 2020
 * * Bug Fixes!
 * ** When using the updated shop layout, leaving the sell option will no
 *    longer cause the dummy window to appear.
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Pressing Shift to quickly remove equipment should no longer crash the
 *    game. This will also clear the help window text. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** If both Optimize and Clear commands have been removed and using modern
 *    controls, pressing up at the top of the slot window list will not go to
 *    the window. Fix made by Yanfly.
 * ** If both Optimize and Clear commands have been removed, the window will no
 *    longer appear and the slot window will be moved upward to fill any empty
 *    spaces. Fix made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added in NEW! Label to let you adjust the font face.
 * ** New Plugin Parameters added in Equip Menu Scene Settings for disabling
 *    the back rectangles and/or changing their colors.
 * ** New Plugin Parameters added in Shop Status Window Settings for disabling
 *    the back rectangles and/or changing their colors.
 * 
 * Version 1.02: August 30, 2020
 * * Documentation Fix!
 * ** Added: NOTE: Regarding Damage Labels
 * *** If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * *** Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
 * *** Documentation update added by Yanfly.
 * 
 * Version 1.01: August 23, 2020
 * * Added failsafe to prevent non-existent equipment (because the database
 *   entries have been deleted) from being equipped as initial equipment.
 *   Fix made by Olivia.
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeEquipSlots
 * @text Actor: Change Equip Slots
 * @desc Forcefully change the actor(s) equip slots.
 * These will persist through class changes.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 * 
 * @arg Slots:arraystr
 * @text Equip Slots
 * @type string[]
 * @desc Insert the equip slots you want the actor(s) to have.
 * These entries are case-sensitive.
 * @default ["Weapon","Shield","Head","Body","Accessory"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorResetEquipSlots
 * @text Actor: Reset Equip Slots
 * @desc Reset any forced equip slots for the actor(s).
 * Equip slots will then be based on class.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Purify
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PurifyActors
 * @text Purify: Target Actor(s)
 * @desc Purifies target actor(s) of any cursed weapons or armors.
 * Cannot be used in battle.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PurifyParty
 * @text Purify: Whole Party
 * @desc Purifies whole party of any cursed weapons or armors.
 * Cannot be used in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Shop
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BatchShop
 * @text Shop: Advanced
 * @desc Make it easier to put together inventories for a shop.
 * WARNING: Does not allow for event-specific prices.
 *
 * @arg Step1
 * @text Step 1: Item ID's
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type item
 * @desc Select which Item ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type item
 * @desc Select which Item ID to end at.
 * @default 4
 *
 * @arg Step2
 * @text Step 2: Weapon ID's
 *
 * @arg Step2Start:num
 * @text Range Start
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to start from.
 * @default 1
 *
 * @arg Step2End:num
 * @text Range End
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to end at.
 * @default 4
 *
 * @arg Step3
 * @text Step 3: Armor ID's
 *
 * @arg Step3Start:num
 * @text Range Start
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to start from.
 * @default 1
 *
 * @arg Step3End:num
 * @text Range End
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to end at.
 * @default 4
 *
 * @arg PurchaseOnly:eval
 * @text Step 4: Purchase Only?
 * @type boolean
 * @on Purchase-Only
 * @off Sell Accessible
 * @desc Make the shop purchase-only?
 * @default false
 * 
 * @arg Optional
 * 
 * @arg Blacklist:arraystr
 * @text Blacklisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to blacklist from the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 * 
 * @arg Whitelist:arraystr
 * @text Whitelisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to whitelist for the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemsEquipsCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemScene:struct
 * @text Item Menu Settings
 * @type struct<ItemScene>
 * @desc Change the Item Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","ListWindow":"","ListWindowCols:num":"1","ItemQt":"","MaxItems:num":"99","MaxWeapons:num":"99","MaxArmors:num":"99","ItemQuantityFmt:str":"×%1","ItemQuantityFontSize:num":"22","ShopStatusWindow":"","ShowShopStatus:eval":"true","ItemSceneAdjustItemList:eval":"true","ItemMenuStatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._itemWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._itemWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","ButtonAssist":"","buttonAssistCategory:str":"Switch Category"}
 *
 * @param Categories:struct
 * @text Item Categories
 * @parent ItemScene:struct
 * @type struct<Categories>
 * @desc Change the categories displayed in the Item/Shop menus.
 * @default {"MainList":"","List:arraystruct":"[\"{\\\"Type:str\\\":\\\"FieldUsable\\\",\\\"Icon:num\\\":\\\"208\\\"}\",\"{\\\"Type:str\\\":\\\"BattleUsable\\\",\\\"Icon:num\\\":\\\"218\\\"}\",\"{\\\"Type:str\\\":\\\"NeverUsable\\\",\\\"Icon:num\\\":\\\"302\\\"}\",\"{\\\"Type:str\\\":\\\"AllWeapons\\\",\\\"Icon:num\\\":\\\"97\\\"}\",\"{\\\"Type:str\\\":\\\"EType:2\\\",\\\"Icon:num\\\":\\\"128\\\"}\",\"{\\\"Type:str\\\":\\\"EType:3\\\",\\\"Icon:num\\\":\\\"131\\\"}\",\"{\\\"Type:str\\\":\\\"EType:4\\\",\\\"Icon:num\\\":\\\"137\\\"}\",\"{\\\"Type:str\\\":\\\"EType:5\\\",\\\"Icon:num\\\":\\\"145\\\"}\",\"{\\\"Type:str\\\":\\\"KeyItems\\\",\\\"Icon:num\\\":\\\"195\\\"}\"]","Style:str":"icon","TextAlign:str":"center","Vocabulary":"","HiddenItemA:str":"Special Items","HiddenItemB:str":"Unique Items","Consumable:str":"Consumable","Nonconsumable:str":"Nonconsumable","AlwaysUsable:str":"Usable","BattleUsable:str":"Battle","FieldUsable:str":"Field","NeverUsable:str":"Materials"}
 *
 * @param New:struct
 * @text NEW! Labels
 * @parent ItemScene:struct
 * @type struct<NewLabel>
 * @desc Change how NEW! Labels apply to your game project.
 * @default {"Enable:eval":"true","Icon:num":"0","Text:str":"NEW!","FontColor:str":"17","FontFace:str":"Verdana","FontSize:str":"16","FadeLimit:num":"360","FadeSpeed:num":"4","OffsetX:num":"0","OffsetY:num":"4"}
 *
 * @param EquipScene:struct
 * @text Equip Menu Settings
 * @type struct<EquipScene>
 * @desc Adjust the settings regarding the Equip Menu Scene.
 * @default {"General":"","EnableLayout:eval":"true","ParamValueFontSize:num":"22","MenuPortraits:eval":"true","DrawPortraitJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth - 128 - padding;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);\"","DrawFaceJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.max(0, Math.floor((limitHeight - ImageManager.faceHeight) / 2));\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.max(0, Math.floor((limitHeight - dataHeight) / 2));\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\\nif (this.innerHeight > 444) {\\n    this.drawActorClass(this._actor, x, dataY + lineHeight * 2);\\n    this.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);\\n} else {\\n    this.placeBasicGauges(this._actor, x, dataY + lineHeight * 2);\\n}\"","DrawParamJS:func":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    const standardWidth = ImageManager.standardIconWidth || 32;\\n    paramNameWidth += standardWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides > 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","LayoutStyle:str":"upper/right","StatusWindowWidth:num":"312","DrawBackRect:eval":"true","BackRectColor:str":"19","CursedTextPopup:json":"\"%1 is cursed by %3%2!\"","Command":"","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconEquip:num":"136","equipCmdDesc:json":"\"Pick and choose equipment to change.\"","CommandAddOptimize:eval":"true","optimizeCmdDesc:json":"\"Equip the strongest available equipment.\"","CmdIconOptimize:num":"137","CommandAddClear:eval":"true","clearCmdDesc:json":"\"Remove all available equipment.\"","CmdIconClear:num":"135","RemoveEquip":"","RemoveEquipIcon:num":"16","RemoveEquipText:str":"Remove","ShiftShortcutKey:eval":"true","Rulings":"","EquipAdjustHpMp:eval":"true","NonRemoveETypes:arraynum":"[]","NonOptimizeETypes:arraynum":"[]","ButtonAssist":"","buttonAssistRemove:str":"Unequip"}
 *
 * @param ShopScene:struct
 * @text Shop Menu Settings
 * @type struct<ShopScene>
 * @desc Change the Shop Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","Command":"","CmdHideDisabled:eval":"true","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconBuy:num":"208","CmdIconSell:num":"314","CmdIconCancel:num":"82","CmdCancelRename:str":"Exit","Prices":"","SellPriceRate:num":"0.50","BuyPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","SellPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","ButtonAssist":"","buttonAssistSmallIncrement:str":"-1/+1","buttonAssistLargeIncrement:str":"-10/+10"}
 *
 * @param StatusWindow:struct
 * @text Shop Status Window
 * @parent ShopScene:struct
 * @type struct<StatusWindow>
 * @desc Change the Item Status Window settings.
 * @default {"General":"","Width:num":"352","ParamChangeFontSize:num":"22","Translucent:num":"64","DrawBackRect:eval":"true","BackRectColor:str":"19","EquipData":"","EquipDataStyle:str":"compare","EquipDataCompare":"","AlreadyEquipMarker:str":"E","CannotEquipMarker:str":"-","NoChangeMarker:str":"-","DrawEquipData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nconst paramheight = this.gaugeLineHeight() + 8;\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Parameter Names\\nconst params = this.actorParams();\\nconst backY = y;\\ny = height - (params.length * paramheight) - 4;\\nlet paramX = x;\\nlet paramWidth = 0;\\nlet tableY = y;\\nfor (const paramId of params) {\\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\\n    y += paramheight;\\n}\\n\\n// Draw Actor Data\\nconst actorMax = $gameParty.maxBattleMembers();\\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\\nparamWidth = width - (actorWidth * actorMax);\\nfor (const actor of $gameParty.battleMembers()) {\\n    const index = $gameParty.battleMembers().indexOf(actor);\\n    const actorX = paramX + paramWidth + (index * actorWidth);\\n    this.changePaintOpacity(actor.canEquip(this._item));\\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\\n    let actorY = tableY;\\n\\n    // Draw Parameter Changes\\n    for (const paramId of params) {\\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\\n        actorY += paramheight;\\n    }\\n}\\n\\n// Draw Back Rectangles\\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\\nfor (let i = 0; i < actorMax; i++) {\\n    const actorX = paramX + paramWidth + (i * actorWidth);\\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\\n}\\nfor (const paramId of params) {\\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\\n    for (let i = 0; i < actorMax; i++) {\\n        const actorX = paramX + paramWidth + (i * actorWidth);\\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\\n    }\\n    tableY += paramheight;\\n}\"","EquipDataClassic":"","ClassicWeaponParameters:arraystr":"[\"HIT\"]","ClassicArmorParameters:arraystr":"[\"EVA\"]","DrawEquipClassicData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Item Weapon Type or Armor Type\\nif (this.drawItemEquipSubType(x, y, width)) y += lineHeight;\\n\\n// Draw Parameter Values\\nconst params = this.actorParams();\\nfor (const paramId of params) {\\n    if (this.isCustomParameter(paramId)) continue;\\n    this.drawActorParamClassic(paramId, x, y, width);\\n    y += lineHeight;\\n}\\n\\n// Draw Custom Entries\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","EquipDataDouble":"","DoubleWeaponParameters:arraystr":"[\"HIT\",\"CNT\"]","DoubleArmorParameters:arraystr":"[\"EVA\",\"GRD\"]","DrawEquipDoubleData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Item Weapon Type or Armor Type\\nif (this.drawItemEquipSubType(x, y, width)) y += lineHeight;\\n\\n// Draw Parameter Values\\nconst params = this.actorParams();\\nfor (const paramId of params) {\\n    if (this.isCustomParameter(paramId)) continue;\\n    this.drawActorParamClassic(paramId, x, y, hw);\\n    if (x === hw) {\\n        y += lineHeight;\\n        x = 0;\\n    } else {\\n        x = hw;\\n    }\\n}\\n// Realign\\nif (x === hw) {\\n    this.drawItemDarkRect(hw, y, hw, lineHeight);\\n    y += lineHeight;\\n    x = 0;\\n}\\n\\n// Draw Custom Entries\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","EquipDelayMS:num":"240","ItemData":"","ItemGeneral":"","MaxIcons:num":"8","MultiplierStandard:num":"1000000","DrawItemData:func":"\"const lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\n\\n// Draw Main Item Properties\\nif (this.drawItemConsumable(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\nif (this._item.occasion < 3) {\\n    y = this.drawItemDamage(x, y, width);\\n    y = this.drawItemEffects(x, y, width);\\n}\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Draw Remaining Item Properties\\nif (this._item.occasion < 3) {\\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemHitType(x, y, hw)) y += 0;\\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\\n}\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","Vocabulary":"","LabelConsume:str":"Consumable","Consumable:str":"✔","NotConsumable:str":"✘","Occasions":"","Occasion0:str":"Anytime Use","Occasion1:str":"Battle-Only","Occasion2:str":"Field-Only","Occasion3:str":"-","Scope":"","Scope0:str":"No Target","Scope1:str":"1 Foe","Scope2:str":"All Foes","Scope3:str":"Random Foe","Scope4:str":"2 Random Foes","Scope5:str":"3 Random Foes","Scope6:str":"4 Random Foes","Scope7:str":"1 Ally","Scope8:str":"Alive Allies","Scope9:str":"Dead Ally","Scope10:str":"Dead Allies","Scope11:str":"User","Scope12:str":"Any Ally","Scope13:str":"All Allies","Scope14:str":"Everybody","BattleCore":"","ScopeRandomAny:str":"%1 Random Units","ScopeRandomEnemies:str":"%1 Random Foes","ScopeRandomAllies:str":"%1 Random Allies","ScopeAlliesButUser:str":"Other Allies","ScopeAllyOrEnemy:str":"Ally/Enemy","ScopeEnemyOrAlly:str":"Enemy/Ally","LabelSpeed:str":"Speed","Speed2000:str":"Fastest","Speed1000:str":"Faster","Speed1:str":"Fast","Speed0:str":"Normal","SpeedNeg999:str":"Slow","SpeedNeg1999:str":"Slower","SpeedNeg2000:str":"Slowest","LabelSuccessRate:str":"Accuracy","LabelRepeats:str":"Hits","LabelHitType:str":"Type","HitType0:str":"Neutral","HitType1:str":"Physical","HitType2:str":"Magical","LabelElement:str":"Element","ElementWeapon:str":"\\I[97]Weapon","ElementNone:str":"\\I[160]No Element","DamageType":"","DamageType1:str":"%1 Damage Multiplier","DamageType2:str":"%1 Damage Multiplier","DamageType3:str":"%1 Recovery Multiplier","DamageType4:str":"%1 Recovery Multiplier","DamageType5:str":"%1 Drain Multiplier","DamageType6:str":"%1 Drain Multiplier","Effects":"","LabelRecoverHP:str":"%1 Recovery","LabelRecoverMP:str":"%1 Recovery","LabelRecoverTP:str":"%1 Recovery","LabelSelfGainTP:str":"User %1","LabelDamageHP:str":"%1 Damage","LabelDamageMP:str":"%1 Damage","LabelDamageTP:str":"%1 Damage","LabelApply:str":"Applies","LabelRemove:str":"Removes","EquipType":"","WeaponType:str":"Weapon Type","ArmorType:str":"Armor Type","NoEquipTypeResult:str":"-"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Item Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ItemQt
 * @text Item Quantity
 *
 * @param MaxItems:num
 * @text Item Max
 * @parent ItemQt
 * @desc The default maximum quantity for items.
 * @default 99
 *
 * @param MaxWeapons:num
 * @text Weapon Max
 * @parent ItemQt
 * @desc The default maximum quantity for weapons.
 * @default 99
 *
 * @param MaxArmors:num
 * @text Armor Max
 * @parent ItemQt
 * @desc The default maximum quantity for armors.
 * @default 99
 *
 * @param ItemQuantityFmt:str
 * @text Quantity Format
 * @parent ItemQt
 * @desc How to display an item's quantity.
 * %1 - Item Quantity
 * @default ×%1
 *
 * @param ItemQuantityFontSize:num
 * @text Font Size
 * @parent ItemQt
 * @desc Default font size for item quantity.
 * @default 22
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Item Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Item Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param ItemSceneAdjustItemList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Item List Window in the Item Menu if using the Shop Status Window?
 * @default true
 *
 * @param ItemMenuStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Status Window in the Item Menu.
 * @default "const width = this.statusWidth();\nconst height = this._itemWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._itemWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistCategory:str
 * @text Switch Category
 * @parent ButtonAssist
 * @desc Button assist text used for switching categories.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Switch Category
 *
 */
/* ----------------------------------------------------------------------------
 * Item Categories
 * ----------------------------------------------------------------------------
 */
/*~struct~Categories:
 *
 * @param MainList
 * @text List
 * 
 * @param List:arraystruct
 * @text Category List
 * @parent MainList
 * @type struct<Category>[]
 * @desc A list of the item categories displayed in the Item/Shop menus.
 * @default ["{\"Type:str\":\"RegularItems\",\"Icon:num\":\"208\"}","{\"Type:str\":\"AllWeapons\",\"Icon:num\":\"97\"}","{\"Type:str\":\"AllArmors\",\"Icon:num\":\"137\"}","{\"Type:str\":\"KeyItems\",\"Icon:num\":\"195\"}"]
 *
 * @param Style:str
 * @text Category Style
 * @parent MainList
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw categorie entries in the Category Window?
 * @default icon
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @parent MainList
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Vocabulary
 *
 * @param HiddenItemA:str
 * @text Hidden Item A
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Special Items
 *
 * @param HiddenItemB:str
 * @text Hidden Item B
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Unique Items
 *
 * @param Consumable:str
 * @text Consumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Consumable
 *
 * @param Nonconsumable:str
 * @text Nonconsumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Nonconsumable
 *
 * @param AlwaysUsable:str
 * @text Always Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Usable
 *
 * @param BattleUsable:str
 * @text Battle Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Battle
 *
 * @param FieldUsable:str
 * @text Field Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Field
 *
 * @param NeverUsable:str
 * @text Never Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Materials
 *
 */
/* ----------------------------------------------------------------------------
 * Category Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Category:
 *
 * @param Type:str
 * @text Type
 * @type combo
 * @option AllItems
 * @option 
 * @option RegularItems
 * @option KeyItems
 * @option HiddenItemA
 * @option HiddenItemB
 * @option 
 * @option Consumable
 * @option Nonconsumable
 * @option 
 * @option AlwaysUsable
 * @option BattleUsable
 * @option FieldUsable
 * @option NeverUsable
 * @option 
 * @option AllWeapons
 * @option WType:x
 * @option 
 * @option AllArmors
 * @option AType:x
 * @option 
 * @option EType:x
 * @option 
 * @option Category:x
 * @option
 * @desc A list of the item categories displayed in the Item/Shop
 * menus. Replace x with ID numbers or text.
 * @default RegularItems
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this category.
 * Use 0 for no icon.
 * @default 0
 *
 * @param SwitchID:num
 * @text Visibility Switch
 * @type switch
 * @desc This Switch must be turned ON in order for the category to show.
 * Use 0 for no Switch requirement.
 * @default 0
 *
 * @param SortBy:str
 * @text Sorted By
 * @type select
 * @option ID
 * @option Name
 * @desc Sort this category (in Scene_Item and Scene_Shop only) this way.
 * @default ID
 *
 */
/* ----------------------------------------------------------------------------
 * New Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NewLabel:
 *
 * @param Enable:eval
 * @text Use NEW! Labels?
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the NEW! Labels or not?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @desc The icon index used to represent the NEW! text.
 * Use 0 to not draw any icons.
 * @default 0
 *
 * @param Text:str
 * @text Text
 * @desc The text written on the NEW! Label.
 * @default NEW!
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param FontFace:str
 * @text Font Face
 * @parent Text:str
 * @desc Font face used for the NEW! Label.
 * @default Verdana
 *
 * @param FontSize:str
 * @text Font Size
 * @parent Text:str
 * @desc The font size used for the NEW! text.
 * @default 16
 *
 * @param FadeLimit:num
 * @text Fade Limit
 * @desc What's the upper opaque limit before reversing?
 * @default 360
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @desc What's the fade speed of the NEW! Label?
 * @default 4
 *
 * @param OffsetX:num
 * @text Offset X
 * @desc How much to offset the NEW! Label's X position by.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @desc How much to offset the NEW! Label's Y position by.
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Equip Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/right
 *
 * @param ParamValueFontSize:num
 * @text Param Font Size
 * @parent EnableLayout:eval
 * @desc The font size used for parameter values.
 * @default 22
 *
 * @param MenuPortraits:eval
 * @text Show Menu Portraits?
 * @parent EnableLayout:eval
 * @type boolean
 * @on Use Portraits
 * @off Use Faces
 * @desc If Main Menu Core is installed, display the Menu Portraits
 * instead of the actor's face in the status window?
 * @default true
 *
 * @param DrawPortraitJS:func
 * @text JS: Portrait Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If Menu Portraits are available, this is code used to draw
 * the upper data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth - 128 - padding;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);"
 *
 * @param DrawFaceJS:func
 * @text JS: Face Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If faces used used, this is code used to draw the upper
 * data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.max(0, Math.floor((limitHeight - ImageManager.faceHeight) / 2));\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.max(0, Math.floor((limitHeight - dataHeight) / 2));\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\nif (this.innerHeight > 444) {\n    this.drawActorClass(this._actor, x, dataY + lineHeight * 2);\n    this.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);\n} else {\n    this.placeBasicGauges(this._actor, x, dataY + lineHeight * 2);\n}"
 *
 * @param DrawParamJS:func
 * @text JS: Parameter Lower
 * @parent EnableLayout:eval
 * @type note
 * @desc Code to determine how parameters are drawn in the
 * Status Window.
 * @default "// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    const standardWidth = ImageManager.standardIconWidth || 32;\n    paramNameWidth += standardWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nlet alter = 2;\nfor (const paramId of params) {\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides > 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n    alter = alter === 2 ? 1 : 2;\n}"
 *
 * @param StatusWindowWidth:num
 * @text Status Window Width
 * @parent General
 * @desc The usual width of the status window if using the 
 * non-Updated Equip Menu Layout.
 * @default 312
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param CursedTextPopup:json
 * @text Cursed Equip Popup
 * @parent General
 * @type note
 * @desc %1 - Actor, %2 - Equip, %3 - Icon. Text codes allowed.
 * Requires VisuMZ_0_CoreEngine! Empty to not use.
 * @default "%1 is cursed by %3%2!"
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconEquip:num
 * @text Equip Icon
 * @parent Command
 * @desc The icon used for the Equip command.
 * @default 136
 *
 * @param equipCmdDesc:json
 * @text Help Description
 * @parent CmdIconEquip:num
 * @type note
 * @desc Help description used when this command is selected.
 * Text codes allowed.
 * @default "Pick and choose equipment to change."
 *
 * @param CommandAddOptimize:eval
 * @text Add Optimize Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Optimize" command to the Command Window?
 * @default true
 *
 * @param optimizeCmdDesc:json
 * @text Help Description
 * @parent CommandAddOptimize:eval
 * @type note
 * @desc Help description used when this command is selected.
 * Text codes allowed.
 * @default "Equip the strongest available equipment."
 *
 * @param CmdIconOptimize:num
 * @text Optimize Icon
 * @parent CommandAddOptimize:eval
 * @desc The icon used for the Optimize command.
 * @default 137
 *
 * @param CommandAddClear:eval
 * @text Add Clear Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Clear" command to the Command Window?
 * @default true
 *
 * @param clearCmdDesc:json
 * @text Help Description
 * @parent CommandAddClear:eval
 * @type note
 * @desc Help description used when this command is selected.
 * Text codes allowed.
 * @default "Remove all available equipment."
 *
 * @param CmdIconClear:num
 * @text Clear Icon
 * @parent CommandAddClear:eval
 * @desc The icon used for the Clear command.
 * @default 135
 *
 * @param RemoveEquip
 * @text Remove Equip
 *
 * @param RemoveEquipIcon:num
 * @text Icon
 * @parent RemoveEquip
 * @desc Icon used for equipment removal.
 * @default 16
 *
 * @param RemoveEquipText:str
 * @text Text
 * @parent RemoveEquip
 * @desc Text used for equipment removal.
 * @default Remove
 *
 * @param ShiftShortcutKey:eval
 * @text Use SHIFT Shortcut?
 * @parent RemoveEquip
 * @type boolean
 * @on Use
 * @off Don't
 * @desc Add the "Shift" button as a shortcut key to removing items?
 * @default true

 * @param Rulings
 *
 * @param EquipAdjustHpMp:eval
 * @text Equip-Adjust HP/MP
 * @parent Rulings
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * @default true
 * 
 * @param NonRemoveETypes:arraynum
 * @text Non-Removable Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that must always have
 * an item equipped and cannot be empty.
 * @default []
 *
 * @param NonOptimizeETypes:arraynum
 * @text Non-Optimized Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that will be ignored
 * when equipment is being optimized.
 * @default []
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistRemove:str
 * @text SHIFT: Remove
 * @parent ButtonAssist
 * @desc Button assist text used for the SHIFT Remove Shortcut.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Unequip
 * 
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Shop Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param Switches
 *
 * @param SwitchBuy:num
 * @text Switch: Buy
 * @parent Switches
 * @type switch
 * @desc Buying items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param SwitchSell:num
 * @text Switch: Sell
 * @parent Switches
 * @type switch
 * @desc Selling items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdHideDisabled:eval
 * @text Hide Unavailable?
 * @parent Command
 * @type boolean
 * @on Hide
 * @off Default
 * @desc Hide all unavailable commands like when a shop is set to Purchase Only?
 * @default true
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconBuy:num
 * @text Buy Icon
 * @parent Command
 * @desc The icon used for the Buy command.
 * @default 208
 *
 * @param CmdIconSell:num
 * @text Sell Icon
 * @parent Command
 * @desc The icon used for the Sell command.
 * @default 314
 *
 * @param CmdIconCancel:num
 * @text Cancel Icon
 * @parent Command
 * @desc The icon used for the Cancel command.
 * @default 82
 *
 * @param CmdCancelRename:str
 * @text Rename "Cancel"
 * @parent Command
 * @desc Rename Cancel to something more logical for the Shop Menu Scene.
 * @default Exit
 *
 * @param Prices
 *
 * @param SellPriceRate:num
 * @text Sell Price Rate
 * @parent Prices
 * @desc The default sell price rate.
 * @default 0.50
 *
 * @param BuyPriceJS:func
 * @text JS: Buy Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the buy price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 *
 * @param SellPriceJS:func
 * @text JS: Sell Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the sell price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 * 
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistSmallIncrement:str
 * @text Small Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -1/+1
 *
 * @param buttonAssistLargeIncrement:str
 * @text Large Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -10/+10
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Status Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusWindow:
 *
 * @param General
 *
 * @param Width:num
 * @text Window Width
 * @parent General
 * @desc The usual width of the status window.
 * @default 352
 *
 * @param ParamChangeFontSize:num
 * @text Parameter Font Size
 * @parent General
 * @desc Font size used for parameter changes.
 * @default 22
 *
 * @param Translucent:num
 * @text Translucent Opacity
 * @parent General
 * @desc Opacity setting used for translucent window objects.
 * @default 64
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EquipData
 * @text Equipment Data
 * 
 * @param EquipDataStyle:str
 * @text Data Style
 * @parent EquipData
 * @type select
 * @option Compare - Compares selected equip to equipped gear
 * @value compare
 * @option Classic - Shows basic parameters of selected equip
 * @value classic
 * @option Double - Shows basic parameters in double columns
 * @value double
 * @desc How do you wish to display equipment data?
 * @default compare
 *
 * @param EquipDataCompare
 * @text Compare Style
 * @parent EquipDataStyle:str
 *
 * @param AlreadyEquipMarker:str
 * @text Already Equipped
 * @parent EquipDataCompare
 * @desc Marker used to show an actor cannot equip an item.
 * @default E
 *
 * @param CannotEquipMarker:str
 * @text Can't Equip
 * @parent EquipDataCompare
 * @desc Marker used to show an actor cannot equip an item.
 * @default -
 *
 * @param NoChangeMarker:str
 * @text No Changes
 * @parent EquipDataCompare
 * @desc Marker used to show no changes have occurred.
 * @default -
 *
 * @param DrawEquipData:func
 * @text JS: Draw Equip Data
 * @parent EquipDataCompare
 * @type note
 * @desc Code used to draw the equipment data for the Shop Status Window.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nconst paramheight = this.gaugeLineHeight() + 8;\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Parameter Names\nconst params = this.actorParams();\nconst backY = y;\ny = height - (params.length * paramheight) - 4;\nlet paramX = x;\nlet paramWidth = 0;\nlet tableY = y;\nfor (const paramId of params) {\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\n    y += paramheight;\n}\n\n// Draw Actor Data\nconst actorMax = $gameParty.maxBattleMembers();\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\nparamWidth = width - (actorWidth * actorMax);\nfor (const actor of $gameParty.battleMembers()) {\n    const index = $gameParty.battleMembers().indexOf(actor);\n    const actorX = paramX + paramWidth + (index * actorWidth);\n    this.changePaintOpacity(actor.canEquip(this._item));\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\n    let actorY = tableY;\n\n    // Draw Parameter Changes\n    for (const paramId of params) {\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\n        actorY += paramheight;\n    }\n}\n\n// Draw Back Rectangles\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\nfor (let i = 0; i < actorMax; i++) {\n    const actorX = paramX + paramWidth + (i * actorWidth);\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\n}\nfor (const paramId of params) {\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\n    for (let i = 0; i < actorMax; i++) {\n        const actorX = paramX + paramWidth + (i * actorWidth);\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\n    }\n    tableY += paramheight;\n}"
 *
 * @param EquipDataClassic
 * @text Classic Style
 * @parent EquipDataStyle:str
 *
 * @param ClassicWeaponParameters:arraystr
 * @text Added Weapon Params
 * @parent EquipDataClassic
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc Display these parameters when a weapon is selected.
 * Requires VisuMZ_0_CoreEngine!
 * @default ["HIT"]
 *
 * @param ClassicArmorParameters:arraystr
 * @text Added Armor Params
 * @parent EquipDataClassic
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc Display these parameters when an armor is selected.
 * Requires VisuMZ_0_CoreEngine!
 * @default ["EVA"]
 *
 * @param DrawEquipClassicData:func
 * @text JS: Draw Equip Data
 * @parent EquipDataClassic
 * @type note
 * @desc Code used to draw the equipment data for the Shop Status Window.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Item Weapon Type or Armor Type\nif (this.drawItemEquipSubType(x, y, width)) y += lineHeight;\n\n// Draw Parameter Values\nconst params = this.actorParams();\nfor (const paramId of params) {\n    if (this.isCustomParameter(paramId)) continue;\n    this.drawActorParamClassic(paramId, x, y, width);\n    y += lineHeight;\n}\n\n// Draw Custom Entries\ny = this.drawItemCustomEntries(x, y, width);\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 *
 * @param EquipDataDouble
 * @text Double Style
 * @parent EquipDataStyle:str
 *
 * @param DoubleWeaponParameters:arraystr
 * @text Added Weapon Params
 * @parent EquipDataDouble
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc Display these parameters when a weapon is selected.
 * Requires VisuMZ_0_CoreEngine!
 * @default ["HIT","CNT"]
 *
 * @param DoubleArmorParameters:arraystr
 * @text Added Armor Params
 * @parent EquipDataDouble
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc Display these parameters when an armor is selected.
 * Requires VisuMZ_0_CoreEngine!
 * @default ["EVA","GRD"]
 *
 * @param DrawEquipDoubleData:func
 * @text JS: Draw Equip Data
 * @parent EquipDataDouble
 * @type note
 * @desc Code used to draw the equipment data for the Shop Status Window.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Item Weapon Type or Armor Type\nif (this.drawItemEquipSubType(x, y, width)) y += lineHeight;\n\n// Draw Parameter Values\nconst params = this.actorParams();\nfor (const paramId of params) {\n    if (this.isCustomParameter(paramId)) continue;\n    this.drawActorParamClassic(paramId, x, y, hw);\n    if (x === hw) {\n        y += lineHeight;\n        x = 0;\n    } else {\n        x = hw;\n    }\n}\n// Realign\nif (x === hw) {\n    this.drawItemDarkRect(hw, y, hw, lineHeight);\n    y += lineHeight;\n    x = 0;\n}\n\n// Draw Custom Entries\ny = this.drawItemCustomEntries(x, y, width);\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 *
 * @param EquipDelayMS:num
 * @text Delay MS
 * @parent EquipData
 * @type number
 * @min 1
 * @max 999
 * @desc How many milliseconds (MS) to delay the preview update?
 * This is to prevent lag spikes for equips only.
 * @default 240
 *
 * @param ItemData
 * @text Item Data
 *
 * @param ItemGeneral
 * @parent ItemData
 * @text Data Settings
 *
 * @param MaxIcons:num
 * @text Max State/Buff Icons
 * @parent ItemGeneral
 * @desc Maximum number of icons that can be displayed for Add/Remove States/Buffs.
 * @default 8
 *
 * @param MultiplierStandard:num
 * @text Multiplier Standard
 * @parent ItemGeneral
 * @desc Constant standard to filter out random values when calculating the damage multiplier.
 * @default 1000000
 *
 * @param DrawItemData:func
 * @text JS: Draw Item Data
 * @parent ItemGeneral
 * @type note
 * @desc Code used to draw the item data for the Shop Status Window.
 * @default "const lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\n\n// Draw Main Item Properties\nif (this.drawItemConsumable(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\nif (this._item.occasion < 3) {\n    y = this.drawItemDamage(x, y, width);\n    y = this.drawItemEffects(x, y, width);\n}\ny = this.drawItemCustomEntries(x, y, width);\n\n// Draw Remaining Item Properties\nif (this._item.occasion < 3) {\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\n    if (this.drawItemHitType(x, y, hw)) y += 0;\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\n}\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 *
 * @param Vocabulary
 * @parent ItemData
 *
 * @param LabelConsume:str
 * @text Consumable
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Consumable
 *
 * @param Consumable:str
 * @text Yes
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✔
 *
 * @param NotConsumable:str
 * @text No
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✘
 *
 * @param Occasions
 * @parent Vocabulary
 *
 * @param Occasion0:str
 * @text Always
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Anytime Use
 *
 * @param Occasion1:str
 * @text Battle Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Battle-Only
 *
 * @param Occasion2:str
 * @text Menu Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Field-Only
 *
 * @param Occasion3:str
 * @text Never
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default -
 *
 * @param Scope
 * @parent Vocabulary
 *
 * @param Scope0:str
 * @text None
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default No Target
 *
 * @param Scope1:str
 * @text 1 Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Foe
 *
 * @param Scope2:str
 * @text All Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Foes
 *
 * @param Scope3:str
 * @text 1 Random Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Random Foe
 *
 * @param Scope4:str
 * @text 2 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 2 Random Foes
 *
 * @param Scope5:str
 * @text 3 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 3 Random Foes
 *
 * @param Scope6:str
 * @text 4 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 4 Random Foes
 *
 * @param Scope7:str
 * @text 1 Ally
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Ally
 *
 * @param Scope8:str
 * @text All Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Alive Allies
 *
 * @param Scope9:str
 * @text 1 Ally (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Ally
 *
 * @param Scope10:str
 * @text All Allies (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Allies
 *
 * @param Scope11:str
 * @text The User
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default User
 *
 * @param Scope12:str
 * @text 1 Ally (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Any Ally
 *
 * @param Scope13:str
 * @text All Allies (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Allies
 *
 * @param Scope14:str
 * @text Enemies & Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Everybody
 *
 * @param BattleCore
 * @text Battle Core Support
 * @parent Vocabulary
 *
 * @param ScopeRandomAny:str
 * @text x Random Any
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Any> notetag.
 * @default %1 Random Units
 *
 * @param ScopeRandomEnemies:str
 * @text x Random Enemies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Enemies> notetag.
 * @default %1 Random Foes
 *
 * @param ScopeRandomAllies:str
 * @text x Random Allies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Allies> notetag.
 * @default %1 Random Allies
 *
 * @param ScopeAlliesButUser:str
 * @text All Allies But User
 * @parent BattleCore
 * @desc Vocabulary used for <Target: All Allies But User> notetag.
 * @default Other Allies
 *
 * @param ScopeAllyOrEnemy:str
 * @text Ally or Enemy
 * @parent BattleCore
 * @desc Vocabulary used for <Target: Ally or Enemy> notetag.
 * @default Ally/Enemy
 *
 * @param ScopeEnemyOrAlly:str
 * @text Enemy or Ally
 * @parent BattleCore
 * @desc Vocabulary used for <Target: Enemy or Ally> notetag.
 * @default Enemy/Ally
 *
 * @param LabelSpeed:str
 * @text Speed
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Speed
 *
 * @param Speed2000:str
 * @text >= 2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fastest
 *
 * @param Speed1000:str
 * @text >= 1000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Faster
 *
 * @param Speed1:str
 * @text >= 1 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fast
 *
 * @param Speed0:str
 * @text == 0 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Normal
 *
 * @param SpeedNeg999:str
 * @text >= -999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slow
 *
 * @param SpeedNeg1999:str
 * @text >= -1999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slower
 *
 * @param SpeedNeg2000:str
 * @text <= -2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slowest
 *
 * @param LabelSuccessRate:str
 * @text Success Rate
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Accuracy
 *
 * @param LabelRepeats:str
 * @text Repeats
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Hits
 *
 * @param LabelHitType:str
 * @text Hit Type
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Type
 *
 * @param HitType0:str
 * @text Certain Hit
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Neutral
 *
 * @param HitType1:str
 * @text Physical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Physical
 *
 * @param HitType2:str
 * @text Magical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Magical
 *
 * @param LabelElement:str
 * @text Element
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Element
 *
 * @param ElementWeapon:str
 * @text Weapon-Based
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[97]Weapon
 *
 * @param ElementNone:str
 * @text Nonelement Element
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[160]No Element
 *
 * @param DamageType
 * @text Damage Type
 * @parent Vocabulary
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param Effects
 * @parent Vocabulary
 *
 * @param LabelRecoverHP:str
 * @text Recover HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverMP:str
 * @text Recover MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverTP:str
 * @text Recover TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelSelfGainTP:str
 * @text Self Gain TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default User %1
 *
 * @param LabelDamageHP:str
 * @text Damage HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageMP:str
 * @text Damage MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageTP:str
 * @text Damage TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelApply:str
 * @text Add State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Applies
 *
 * @param LabelRemove:str
 * @text Remove State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Removes
 *
 * @param EquipType
 * @parent Vocabulary
 * @text Equip Type
 *
 * @param WeaponType:str
 * @text Weapon Type
 * @parent EquipType
 * @desc Vocabulary used for this data entry.
 * @default Weapon Type
 *
 * @param ArmorType:str
 * @text Armor Type
 * @parent EquipType
 * @desc Vocabulary used for this data entry.
 * @default Armor Type
 *
 * @param NoEquipTypeResult:str
 * @text No Equip Type
 * @parent EquipType
 * @desc Marker used to show an unlisted equip type.
 * @default -
 *
 */
//=============================================================================

const _0x59ef57=_0x5677;(function(_0x1074d1,_0x510b21){const _0x2b1c8b=_0x5677,_0x5ca2bb=_0x1074d1();while(!![]){try{const _0x487d73=parseInt(_0x2b1c8b(0x152))/0x1+parseInt(_0x2b1c8b(0x1e7))/0x2+-parseInt(_0x2b1c8b(0x17b))/0x3+-parseInt(_0x2b1c8b(0x33b))/0x4*(parseInt(_0x2b1c8b(0x32f))/0x5)+-parseInt(_0x2b1c8b(0x4d7))/0x6+-parseInt(_0x2b1c8b(0x1f2))/0x7+-parseInt(_0x2b1c8b(0x46f))/0x8*(-parseInt(_0x2b1c8b(0x2d8))/0x9);if(_0x487d73===_0x510b21)break;else _0x5ca2bb['push'](_0x5ca2bb['shift']());}catch(_0x3df0a7){_0x5ca2bb['push'](_0x5ca2bb['shift']());}}}(_0x4ea6,0xbfdd6));var label=_0x59ef57(0x3a2),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x3d530f){const _0x31b1a1=_0x59ef57;return _0x3d530f[_0x31b1a1(0x161)]&&_0x3d530f[_0x31b1a1(0x471)][_0x31b1a1(0x291)]('['+label+']');})[0x0];VisuMZ[label][_0x59ef57(0x16f)]=VisuMZ[label][_0x59ef57(0x16f)]||{},VisuMZ['ConvertParams']=function(_0x2d6d51,_0x5a2644){const _0x1345ae=_0x59ef57;for(const _0x4edaa9 in _0x5a2644){if(_0x4edaa9[_0x1345ae(0xf0)](/(.*):(.*)/i)){const _0x58d8e3=String(RegExp['$1']),_0x13676e=String(RegExp['$2'])[_0x1345ae(0x4f2)]()[_0x1345ae(0x298)]();let _0x3afeb4,_0x1ca650,_0x5e999c;switch(_0x13676e){case _0x1345ae(0x245):_0x3afeb4=_0x5a2644[_0x4edaa9]!==''?Number(_0x5a2644[_0x4edaa9]):0x0;break;case _0x1345ae(0x1c6):_0x1ca650=_0x5a2644[_0x4edaa9]!==''?JSON[_0x1345ae(0x21a)](_0x5a2644[_0x4edaa9]):[],_0x3afeb4=_0x1ca650[_0x1345ae(0x2ed)](_0x594ea8=>Number(_0x594ea8));break;case _0x1345ae(0x2d9):_0x3afeb4=_0x5a2644[_0x4edaa9]!==''?eval(_0x5a2644[_0x4edaa9]):null;break;case _0x1345ae(0x226):_0x1ca650=_0x5a2644[_0x4edaa9]!==''?JSON['parse'](_0x5a2644[_0x4edaa9]):[],_0x3afeb4=_0x1ca650[_0x1345ae(0x2ed)](_0x1ca52b=>eval(_0x1ca52b));break;case _0x1345ae(0x145):_0x3afeb4=_0x5a2644[_0x4edaa9]!==''?JSON['parse'](_0x5a2644[_0x4edaa9]):'';break;case'ARRAYJSON':_0x1ca650=_0x5a2644[_0x4edaa9]!==''?JSON[_0x1345ae(0x21a)](_0x5a2644[_0x4edaa9]):[],_0x3afeb4=_0x1ca650[_0x1345ae(0x2ed)](_0x346379=>JSON['parse'](_0x346379));break;case _0x1345ae(0x200):_0x3afeb4=_0x5a2644[_0x4edaa9]!==''?new Function(JSON[_0x1345ae(0x21a)](_0x5a2644[_0x4edaa9])):new Function(_0x1345ae(0x3f0));break;case _0x1345ae(0x305):_0x1ca650=_0x5a2644[_0x4edaa9]!==''?JSON[_0x1345ae(0x21a)](_0x5a2644[_0x4edaa9]):[],_0x3afeb4=_0x1ca650[_0x1345ae(0x2ed)](_0x477f12=>new Function(JSON[_0x1345ae(0x21a)](_0x477f12)));break;case _0x1345ae(0x28d):_0x3afeb4=_0x5a2644[_0x4edaa9]!==''?String(_0x5a2644[_0x4edaa9]):'';break;case _0x1345ae(0xa8):_0x1ca650=_0x5a2644[_0x4edaa9]!==''?JSON[_0x1345ae(0x21a)](_0x5a2644[_0x4edaa9]):[],_0x3afeb4=_0x1ca650[_0x1345ae(0x2ed)](_0x468f3f=>String(_0x468f3f));break;case _0x1345ae(0x354):_0x5e999c=_0x5a2644[_0x4edaa9]!==''?JSON[_0x1345ae(0x21a)](_0x5a2644[_0x4edaa9]):{},_0x2d6d51[_0x58d8e3]={},VisuMZ[_0x1345ae(0x22d)](_0x2d6d51[_0x58d8e3],_0x5e999c);continue;case _0x1345ae(0x19b):_0x1ca650=_0x5a2644[_0x4edaa9]!==''?JSON['parse'](_0x5a2644[_0x4edaa9]):[],_0x3afeb4=_0x1ca650[_0x1345ae(0x2ed)](_0x395024=>VisuMZ[_0x1345ae(0x22d)]({},JSON['parse'](_0x395024)));break;default:continue;}_0x2d6d51[_0x58d8e3]=_0x3afeb4;}}return _0x2d6d51;},(_0x2a4018=>{const _0x3942f8=_0x59ef57,_0x4563db=_0x2a4018[_0x3942f8(0x26b)];for(const _0x3d848a of dependencies){if(!Imported[_0x3d848a]){alert(_0x3942f8(0x413)[_0x3942f8(0x46e)](_0x4563db,_0x3d848a)),SceneManager[_0x3942f8(0xb4)]();break;}}const _0x5d12d0=_0x2a4018['description'];if(_0x5d12d0[_0x3942f8(0xf0)](/\[Version[ ](.*?)\]/i)){const _0x449f6b=Number(RegExp['$1']);_0x449f6b!==VisuMZ[label][_0x3942f8(0x1cf)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x3942f8(0x46e)](_0x4563db,_0x449f6b)),SceneManager[_0x3942f8(0xb4)]());}if(_0x5d12d0[_0x3942f8(0xf0)](/\[Tier[ ](\d+)\]/i)){const _0x6546c8=Number(RegExp['$1']);_0x6546c8<tier?(alert(_0x3942f8(0x4f6)[_0x3942f8(0x46e)](_0x4563db,_0x6546c8,tier)),SceneManager[_0x3942f8(0xb4)]()):tier=Math[_0x3942f8(0xca)](_0x6546c8,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x3942f8(0x16f)],_0x2a4018[_0x3942f8(0xb7)]);})(pluginData),PluginManager[_0x59ef57(0x30e)](pluginData['name'],_0x59ef57(0x15f),_0x28bfa2=>{const _0x247e41=_0x59ef57;VisuMZ['ConvertParams'](_0x28bfa2,_0x28bfa2);const _0x2c9915=_0x28bfa2[_0x247e41(0x276)][_0x247e41(0x2ed)](_0x59c4ae=>$gameActors['actor'](_0x59c4ae)),_0x47f966=_0x28bfa2[_0x247e41(0x262)][_0x247e41(0x2ed)](_0x4e46a7=>$dataSystem[_0x247e41(0x376)]['indexOf'](_0x4e46a7['trim']()));for(const _0x394113 of _0x2c9915){if(!_0x394113)continue;_0x394113['forceChangeEquipSlots'](_0x47f966);}}),PluginManager[_0x59ef57(0x30e)](pluginData[_0x59ef57(0x26b)],_0x59ef57(0x45a),_0x52225c=>{const _0x305997=_0x59ef57;VisuMZ[_0x305997(0x22d)](_0x52225c,_0x52225c);const _0x2ee60e=_0x52225c[_0x305997(0x276)]['map'](_0x5e31c3=>$gameActors[_0x305997(0x481)](_0x5e31c3));for(const _0x585ca7 of _0x2ee60e){if(!_0x585ca7)continue;_0x585ca7[_0x305997(0x220)]();}}),PluginManager[_0x59ef57(0x30e)](pluginData[_0x59ef57(0x26b)],_0x59ef57(0x4bf),_0x1c2729=>{const _0x49246d=_0x59ef57;if($gameParty['inBattle']())return;VisuMZ[_0x49246d(0x22d)](_0x1c2729,_0x1c2729);const _0x6d42f6=_0x1c2729[_0x49246d(0x276)][_0x49246d(0x2ed)](_0x1085be=>$gameActors[_0x49246d(0x481)](_0x1085be));for(const _0x168f76 of _0x6d42f6){if(!_0x168f76)continue;_0x168f76[_0x49246d(0x49f)]();}}),PluginManager['registerCommand'](pluginData[_0x59ef57(0x26b)],_0x59ef57(0x4a7),_0x50c6df=>{const _0x5f52ae=_0x59ef57;if($gameParty[_0x5f52ae(0x4da)]())return;$gameParty[_0x5f52ae(0x49f)]();}),PluginManager['registerCommand'](pluginData[_0x59ef57(0x26b)],_0x59ef57(0x199),_0x462abf=>{const _0x1f42ac=_0x59ef57;VisuMZ[_0x1f42ac(0x22d)](_0x462abf,_0x462abf);const _0x435cc8=[],_0x69c6cd=_0x462abf['Blacklist']['map'](_0x35eea2=>_0x35eea2[_0x1f42ac(0x4f2)]()['trim']()),_0x2dd3b0=_0x462abf[_0x1f42ac(0x407)][_0x1f42ac(0x2ed)](_0x1c8a6f=>_0x1c8a6f[_0x1f42ac(0x4f2)]()['trim']()),_0x42a429=_0x462abf[_0x1f42ac(0x3bf)]>=_0x462abf[_0x1f42ac(0x47f)]?_0x462abf['Step1Start']:_0x462abf['Step1End'],_0x44b689=_0x462abf[_0x1f42ac(0x3bf)]>=_0x462abf[_0x1f42ac(0x47f)]?_0x462abf['Step1End']:_0x462abf[_0x1f42ac(0x47f)],_0x248efb=Array(_0x44b689-_0x42a429+0x1)[_0x1f42ac(0x4a4)]()[_0x1f42ac(0x2ed)]((_0x15c2bd,_0x3fab6e)=>_0x42a429+_0x3fab6e);for(const _0x858eba of _0x248efb){const _0x21769a=$dataItems[_0x858eba];if(!_0x21769a)continue;if(!VisuMZ[_0x1f42ac(0x3a2)][_0x1f42ac(0x29d)](_0x21769a,_0x69c6cd,_0x2dd3b0))continue;_0x435cc8['push']([0x0,_0x858eba,0x0,_0x21769a[_0x1f42ac(0x45e)]]);}const _0x55d41d=_0x462abf[_0x1f42ac(0x1c4)]>=_0x462abf[_0x1f42ac(0x345)]?_0x462abf['Step2Start']:_0x462abf[_0x1f42ac(0x1c4)],_0x1ea07e=_0x462abf[_0x1f42ac(0x1c4)]>=_0x462abf['Step2Start']?_0x462abf['Step2End']:_0x462abf[_0x1f42ac(0x345)],_0x110b91=Array(_0x1ea07e-_0x55d41d+0x1)['fill']()[_0x1f42ac(0x2ed)]((_0x22fce1,_0x113bc8)=>_0x55d41d+_0x113bc8);for(const _0x3f1cc9 of _0x110b91){const _0x122e60=$dataWeapons[_0x3f1cc9];if(!_0x122e60)continue;if(!VisuMZ[_0x1f42ac(0x3a2)]['IncludeShopItem'](_0x122e60,_0x69c6cd,_0x2dd3b0))continue;_0x435cc8['push']([0x1,_0x3f1cc9,0x0,_0x122e60[_0x1f42ac(0x45e)]]);}const _0x27dda4=_0x462abf['Step3End']>=_0x462abf[_0x1f42ac(0x12c)]?_0x462abf['Step3Start']:_0x462abf[_0x1f42ac(0x265)],_0x14d6ba=_0x462abf[_0x1f42ac(0x265)]>=_0x462abf[_0x1f42ac(0x12c)]?_0x462abf[_0x1f42ac(0x265)]:_0x462abf['Step3Start'],_0x4be276=Array(_0x14d6ba-_0x27dda4+0x1)['fill']()[_0x1f42ac(0x2ed)]((_0x4a50a8,_0x48f6d3)=>_0x27dda4+_0x48f6d3);for(const _0x241f93 of _0x4be276){const _0x399667=$dataArmors[_0x241f93];if(!_0x399667)continue;if(!VisuMZ[_0x1f42ac(0x3a2)][_0x1f42ac(0x29d)](_0x399667,_0x69c6cd,_0x2dd3b0))continue;_0x435cc8[_0x1f42ac(0x2a9)]([0x2,_0x241f93,0x0,_0x399667[_0x1f42ac(0x45e)]]);}SceneManager[_0x1f42ac(0x2a9)](Scene_Shop),SceneManager[_0x1f42ac(0x35f)](_0x435cc8,_0x462abf['PurchaseOnly']);}),VisuMZ['ItemsEquipsCore'][_0x59ef57(0x29d)]=function(_0x163ce1,_0x4bc012,_0x4b983e){const _0x2d8e8b=_0x59ef57;if(_0x163ce1[_0x2d8e8b(0x26b)]['trim']()==='')return![];if(_0x163ce1[_0x2d8e8b(0x26b)][_0x2d8e8b(0xf0)](/-----/i))return![];const _0x48c560=_0x163ce1[_0x2d8e8b(0x293)];if(_0x4bc012[_0x2d8e8b(0x104)]>0x0)for(const _0x3a4d15 of _0x4bc012){if(!_0x3a4d15)continue;if(_0x48c560['includes'](_0x3a4d15))return![];}if(_0x4b983e[_0x2d8e8b(0x104)]>0x0){for(const _0x453c84 of _0x4b983e){if(!_0x453c84)continue;if(_0x48c560[_0x2d8e8b(0x291)](_0x453c84))return!![];}return![];}return!![];},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x2ad)]=Scene_Boot[_0x59ef57(0x263)][_0x59ef57(0x2d1)],Scene_Boot[_0x59ef57(0x263)][_0x59ef57(0x2d1)]=function(){const _0x47ae6f=_0x59ef57;this['process_VisuMZ_ItemsEquipsCore_RegExp'](),VisuMZ['ItemsEquipsCore'][_0x47ae6f(0x2ad)][_0x47ae6f(0x36e)](this),this[_0x47ae6f(0x363)](),VisuMZ[_0x47ae6f(0x3a2)][_0x47ae6f(0x1f7)](),VisuMZ[_0x47ae6f(0x3a2)]['SetupArtifactItemIDs']();},Scene_Boot[_0x59ef57(0x263)][_0x59ef57(0x433)]=function(){const _0x19f793=_0x59ef57;VisuMZ[_0x19f793(0x3a2)][_0x19f793(0x1f4)]={},VisuMZ[_0x19f793(0x3a2)][_0x19f793(0x1f4)][_0x19f793(0xde)]=[],VisuMZ[_0x19f793(0x3a2)][_0x19f793(0x1f4)][_0x19f793(0x41b)]=[];const _0x3f8cb1=[_0x19f793(0x404),_0x19f793(0x3ba),_0x19f793(0x3d6),'DEF','MAT','MDF',_0x19f793(0x365),_0x19f793(0x341)];for(const _0x3ff7e5 of _0x3f8cb1){const _0x1b4875=_0x19f793(0x1b1)['format'](_0x3ff7e5);VisuMZ[_0x19f793(0x3a2)][_0x19f793(0x1f4)][_0x19f793(0xde)]['push'](new RegExp(_0x1b4875,'i'));const _0x2934da=_0x19f793(0x230)[_0x19f793(0x46e)](_0x3ff7e5);VisuMZ[_0x19f793(0x3a2)]['RegExp']['BorderRegExp']['push'](new RegExp(_0x2934da,'g'));}},Scene_Boot[_0x59ef57(0x263)][_0x59ef57(0x363)]=function(){const _0x10f837=_0x59ef57;if(VisuMZ[_0x10f837(0x159)])return;this['process_VisuMZ_ItemsEquipsCore_EquipSlots']();const _0x4edbbe=[$dataItems,$dataWeapons,$dataArmors];for(const _0x3e959a of _0x4edbbe){for(const _0x557d9c of _0x3e959a){if(!_0x557d9c)continue;VisuMZ[_0x10f837(0x3a2)][_0x10f837(0x42a)](_0x557d9c,_0x3e959a),VisuMZ['ItemsEquipsCore']['Parse_Notetags_Prices'](_0x557d9c,_0x3e959a),VisuMZ[_0x10f837(0x3a2)]['Parse_Notetags_ParamValues'](_0x557d9c,_0x3e959a),VisuMZ[_0x10f837(0x3a2)]['Parse_Notetags_ParamJS'](_0x557d9c,_0x3e959a),VisuMZ[_0x10f837(0x3a2)][_0x10f837(0x269)](_0x557d9c,_0x3e959a);}}},Scene_Boot['prototype'][_0x59ef57(0x444)]=function(){for(const _0x1def11 of $dataClasses){if(!_0x1def11)continue;VisuMZ['ItemsEquipsCore']['Parse_Notetags_EquipSlots'](_0x1def11);}},VisuMZ['ItemsEquipsCore'][_0x59ef57(0x303)]=VisuMZ[_0x59ef57(0x303)],VisuMZ[_0x59ef57(0x303)]=function(_0x3f3052){const _0x36c830=_0x59ef57;VisuMZ[_0x36c830(0x3a2)]['ParseClassNotetags'][_0x36c830(0x36e)](this,_0x3f3052),VisuMZ['ItemsEquipsCore'][_0x36c830(0x3a9)](_0x3f3052);},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x1b6)]=VisuMZ['ParseItemNotetags'],VisuMZ[_0x59ef57(0x1b6)]=function(_0xf5a4e5){const _0x59d560=_0x59ef57;VisuMZ[_0x59d560(0x3a2)]['ParseItemNotetags'][_0x59d560(0x36e)](this,_0xf5a4e5),VisuMZ[_0x59d560(0x3a2)]['Parse_Notetags_Batch'](_0xf5a4e5,$dataItems);},VisuMZ[_0x59ef57(0x3a2)]['ParseWeaponNotetags']=VisuMZ['ParseWeaponNotetags'],VisuMZ[_0x59ef57(0x4f3)]=function(_0x3d9464){const _0x137cb0=_0x59ef57;VisuMZ[_0x137cb0(0x3a2)][_0x137cb0(0x4f3)][_0x137cb0(0x36e)](this,_0x3d9464),VisuMZ[_0x137cb0(0x3a2)][_0x137cb0(0x170)](_0x3d9464,$dataWeapons);},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x39a)]=VisuMZ[_0x59ef57(0x39a)],VisuMZ[_0x59ef57(0x39a)]=function(_0x969dfc){const _0x8fd3a2=_0x59ef57;VisuMZ['ItemsEquipsCore']['ParseArmorNotetags']['call'](this,_0x969dfc),VisuMZ[_0x8fd3a2(0x3a2)][_0x8fd3a2(0x170)](_0x969dfc,$dataArmors);},VisuMZ['ItemsEquipsCore']['Parse_Notetags_EquipSlots']=function(_0x47edc3){const _0x57775c=_0x59ef57;_0x47edc3[_0x57775c(0x204)]=[];const _0x50d718=$dataSystem['equipTypes'][_0x57775c(0x2ed)](_0x35655c=>_0x35655c?_0x35655c[_0x57775c(0x298)]():'');if(!BattleManager[_0x57775c(0x4ad)]()&&_0x47edc3[_0x57775c(0x278)][_0x57775c(0xf0)](/<EQUIP SLOTS>\s*([\s\S]*)\s*<\/EQUIP SLOTS>/i)){const _0xbe354=String(RegExp['$1'])[_0x57775c(0x15b)](/[\r\n]+/);for(const _0x5e6fd3 of _0xbe354){const _0x3769c5=_0x50d718[_0x57775c(0x179)](_0x5e6fd3['trim']());if(_0x3769c5>0x0)_0x47edc3[_0x57775c(0x204)][_0x57775c(0x2a9)](_0x3769c5);}}else for(const _0xfa07cd of _0x50d718){const _0x5c756d=_0x50d718['indexOf'](_0xfa07cd[_0x57775c(0x298)]());if(_0x5c756d>0x0)_0x47edc3[_0x57775c(0x204)][_0x57775c(0x2a9)](_0x5c756d);}},VisuMZ['ItemsEquipsCore'][_0x59ef57(0x170)]=function(_0x37208a,_0x5817c2){const _0x439843=_0x59ef57;VisuMZ[_0x439843(0x3a2)][_0x439843(0x42a)](_0x37208a,_0x5817c2),VisuMZ['ItemsEquipsCore']['Parse_Notetags_Prices'](_0x37208a,_0x5817c2),VisuMZ[_0x439843(0x3a2)][_0x439843(0x329)](_0x37208a,_0x5817c2),VisuMZ[_0x439843(0x3a2)][_0x439843(0x34b)](_0x37208a,_0x5817c2),VisuMZ['ItemsEquipsCore'][_0x439843(0x269)](_0x37208a,_0x5817c2);},VisuMZ['ItemsEquipsCore']['Parse_Notetags_Category']=function(_0x4888cd,_0x42e71e){const _0x4557f6=_0x59ef57;_0x4888cd[_0x4557f6(0x293)]=[];const _0x277ed8=_0x4888cd['note']||'',_0x73e516=_0x277ed8[_0x4557f6(0xf0)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x73e516)for(const _0x189a4b of _0x73e516){_0x189a4b[_0x4557f6(0xf0)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x3bd7e7=String(RegExp['$1'])['toUpperCase']()[_0x4557f6(0x298)]()[_0x4557f6(0x15b)](',');for(const _0x236d28 of _0x3bd7e7){_0x4888cd[_0x4557f6(0x293)][_0x4557f6(0x2a9)](_0x236d28[_0x4557f6(0x298)]());}}if(_0x277ed8[_0x4557f6(0xf0)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x12383c=RegExp['$1'][_0x4557f6(0x15b)](/[\r\n]+/);for(const _0x3a5b98 of _0x12383c){_0x4888cd[_0x4557f6(0x293)][_0x4557f6(0x2a9)](_0x3a5b98[_0x4557f6(0x4f2)]()['trim']());}}},VisuMZ[_0x59ef57(0x3a2)]['Parse_Notetags_Sorting']=function(_0x3a5a20,_0x5036a){const _0x4c1262=_0x59ef57;if(!_0x3a5a20)return;_0x3a5a20[_0x4c1262(0x4b1)]=0x32;const _0x4021f2=_0x3a5a20[_0x4c1262(0x278)]||'';_0x4021f2[_0x4c1262(0xf0)](/<(?:|ID )SORT(?:|ING)[ ]PRIORITY:[ ](\d+)>/i)&&(_0x3a5a20[_0x4c1262(0x4b1)]=Number(RegExp['$1']));},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x174)]=function(_0x5bd1bc,_0x126648){const _0x1498ff=_0x59ef57;_0x5bd1bc[_0x1498ff(0x278)][_0x1498ff(0xf0)](/<PRICE:[ ](\d+)>/i)&&(_0x5bd1bc[_0x1498ff(0x45e)]=Number(RegExp['$1']));},VisuMZ['ItemsEquipsCore'][_0x59ef57(0x329)]=function(_0x470f70,_0x1fded0){const _0x55cc94=_0x59ef57;if(_0x1fded0===$dataItems)return;for(let _0x3c3808=0x0;_0x3c3808<0x8;_0x3c3808++){const _0xd4cc73=VisuMZ[_0x55cc94(0x3a2)][_0x55cc94(0x1f4)][_0x55cc94(0xde)][_0x3c3808];_0x470f70[_0x55cc94(0x278)][_0x55cc94(0xf0)](_0xd4cc73)&&(_0x470f70[_0x55cc94(0xc3)][_0x3c3808]=parseInt(RegExp['$1']));}},VisuMZ[_0x59ef57(0x3a2)]['paramJS']={},VisuMZ[_0x59ef57(0x3a2)]['Parse_Notetags_ParamJS']=function(_0x380806,_0x44d633){const _0x5b8635=_0x59ef57;if(_0x44d633===$dataItems)return;if(_0x380806[_0x5b8635(0x278)]['match'](/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)){const _0x83def7=String(RegExp['$1']),_0x369e77=(_0x44d633===$dataWeapons?_0x5b8635(0x307):_0x5b8635(0x3de))['format'](_0x380806['id']),_0x5c0d23=_0x5b8635(0x1c7)[_0x5b8635(0x46e)](_0x83def7);for(let _0x51741b=0x0;_0x51741b<0x8;_0x51741b++){if(_0x83def7[_0x5b8635(0xf0)](VisuMZ['ItemsEquipsCore'][_0x5b8635(0x1f4)][_0x5b8635(0x41b)][_0x51741b])){const _0x4587d2=_0x5b8635(0x27f)['format'](_0x369e77,_0x51741b);VisuMZ[_0x5b8635(0x3a2)][_0x5b8635(0x257)][_0x4587d2]=new Function(_0x5b8635(0x1bb),_0x5b8635(0xcf),_0x5c0d23);}}}},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0xf9)]={},VisuMZ[_0x59ef57(0x3a2)]['Parse_Notetags_EnableJS']=function(_0x321527,_0x4626ff){const _0x572626=_0x59ef57;if(_0x4626ff!==$dataItems)return;if(_0x321527['note'][_0x572626(0xf0)](/<JS ITEM ENABLE>\s*([\s\S]*)\s*<\/JS ITEM ENABLE>/i)){const _0x27a481=String(RegExp['$1']),_0x2d3cb4=_0x572626(0x48f)['format'](_0x27a481);VisuMZ[_0x572626(0x3a2)][_0x572626(0xf9)][_0x321527['id']]=new Function(_0x572626(0x1bb),_0x2d3cb4);}},DataManager[_0x59ef57(0x2f3)]=function(_0x591169){const _0x1d97fa=_0x59ef57;return this[_0x1d97fa(0x327)](_0x591169)&&_0x591169['itypeId']===0x2;},DataManager[_0x59ef57(0x3b7)]=function(_0x3a1542){const _0x19ad73=_0x59ef57;if(!_0x3a1542)return 0x63;else return _0x3a1542['note'][_0x19ad73(0xf0)](/<MAX:[ ](\d+)>/i)?parseInt(RegExp['$1']):this[_0x19ad73(0x4d8)](_0x3a1542);},DataManager['defaultItemMax']=function(_0x4cdb6c){const _0x4638d3=_0x59ef57;if(this[_0x4638d3(0x327)](_0x4cdb6c))return VisuMZ[_0x4638d3(0x3a2)]['Settings'][_0x4638d3(0xb6)][_0x4638d3(0xd5)];else{if(this[_0x4638d3(0x189)](_0x4cdb6c))return VisuMZ[_0x4638d3(0x3a2)]['Settings'][_0x4638d3(0xb6)]['MaxWeapons'];else{if(this[_0x4638d3(0x3d8)](_0x4cdb6c))return VisuMZ['ItemsEquipsCore'][_0x4638d3(0x16f)][_0x4638d3(0xb6)][_0x4638d3(0x460)];}}},DataManager[_0x59ef57(0x3a1)]=function(_0x29d451){const _0x48af3d=_0x59ef57;_0x29d451=_0x29d451[_0x48af3d(0x4f2)]()[_0x48af3d(0x298)](),this['_classIDs']=this['_classIDs']||{};if(this['_classIDs'][_0x29d451])return this[_0x48af3d(0x3da)][_0x29d451];for(const _0x2c465c of $dataClasses){if(!_0x2c465c)continue;let _0x44cf99=_0x2c465c['name'];_0x44cf99=_0x44cf99['replace'](/\x1I\[(\d+)\]/gi,''),_0x44cf99=_0x44cf99[_0x48af3d(0xd7)](/\\I\[(\d+)\]/gi,''),this[_0x48af3d(0x3da)][_0x44cf99[_0x48af3d(0x4f2)]()['trim']()]=_0x2c465c['id'];}return this[_0x48af3d(0x3da)][_0x29d451]||0x0;},DataManager[_0x59ef57(0x185)]=function(_0x24298f){const _0x41b179=_0x59ef57;_0x24298f=_0x24298f['toUpperCase']()[_0x41b179(0x298)](),this[_0x41b179(0x46a)]=this['_skillIDs']||{};if(this[_0x41b179(0x46a)][_0x24298f])return this[_0x41b179(0x46a)][_0x24298f];for(const _0x50c053 of $dataSkills){if(!_0x50c053)continue;this[_0x41b179(0x46a)][_0x50c053[_0x41b179(0x26b)]['toUpperCase']()[_0x41b179(0x298)]()]=_0x50c053['id'];}return this[_0x41b179(0x46a)][_0x24298f]||0x0;},DataManager[_0x59ef57(0x4d1)]=function(_0x5922e0){const _0x24f426=_0x59ef57;_0x5922e0=_0x5922e0[_0x24f426(0x4f2)]()['trim'](),this[_0x24f426(0x120)]=this[_0x24f426(0x120)]||{};if(this[_0x24f426(0x120)][_0x5922e0])return this[_0x24f426(0x120)][_0x5922e0];for(const _0x51558a of $dataItems){if(!_0x51558a)continue;this['_itemIDs'][_0x51558a[_0x24f426(0x26b)][_0x24f426(0x4f2)]()['trim']()]=_0x51558a['id'];}return this[_0x24f426(0x120)][_0x5922e0]||0x0;},DataManager[_0x59ef57(0x403)]=function(_0x3cbd13){const _0x2f97d2=_0x59ef57;_0x3cbd13=_0x3cbd13['toUpperCase']()[_0x2f97d2(0x298)](),this['_weaponIDs']=this[_0x2f97d2(0x3b0)]||{};if(this[_0x2f97d2(0x3b0)][_0x3cbd13])return this['_weaponIDs'][_0x3cbd13];for(const _0x15d35e of $dataWeapons){if(!_0x15d35e)continue;this[_0x2f97d2(0x3b0)][_0x15d35e['name']['toUpperCase']()[_0x2f97d2(0x298)]()]=_0x15d35e['id'];}return this[_0x2f97d2(0x3b0)][_0x3cbd13]||0x0;},DataManager[_0x59ef57(0x452)]=function(_0x3b7456){const _0x1c3f53=_0x59ef57;_0x3b7456=_0x3b7456[_0x1c3f53(0x4f2)]()[_0x1c3f53(0x298)](),this[_0x1c3f53(0x17a)]=this[_0x1c3f53(0x17a)]||{};if(this['_armorIDs'][_0x3b7456])return this['_armorIDs'][_0x3b7456];for(const _0x3942c9 of $dataArmors){if(!_0x3942c9)continue;this[_0x1c3f53(0x17a)][_0x3942c9[_0x1c3f53(0x26b)]['toUpperCase']()[_0x1c3f53(0x298)]()]=_0x3942c9['id'];}return this[_0x1c3f53(0x17a)][_0x3b7456]||0x0;},DataManager['getEtypeIdWithName']=function(_0x2e4c5e){const _0x295231=_0x59ef57;_0x2e4c5e=_0x2e4c5e[_0x295231(0x4f2)]()['trim'](),this['_etypeIDs']=this['_etypeIDs']||{};if(this['_etypeIDs'][_0x2e4c5e])return this['_etypeIDs'][_0x2e4c5e];for(const _0x56d643 of $dataSystem['equipTypes']){this['_etypeIDs'][_0x56d643['toUpperCase']()[_0x295231(0x298)]()]=$dataSystem[_0x295231(0x376)][_0x295231(0x179)](_0x56d643);}return this[_0x295231(0x3d0)][_0x2e4c5e]||0x0;},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x1f7)]=function(){const _0xb12564=_0x59ef57;VisuMZ[_0xb12564(0x3a2)][_0xb12564(0x449)]($dataItems),VisuMZ[_0xb12564(0x3a2)][_0xb12564(0x449)]($dataWeapons),VisuMZ['ItemsEquipsCore']['SetupProxyItemGroup']($dataArmors);},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x449)]=function(_0x469840){const _0x243f1d=_0x59ef57;for(const _0x52d5c2 of _0x469840){if(!_0x52d5c2)continue;if(!DataManager[_0x243f1d(0x16e)](_0x52d5c2))continue;const _0x443f52=DataManager['getProxyItem'](_0x52d5c2),_0x4a7e11=[_0x243f1d(0x26b),_0x243f1d(0x33c),_0x243f1d(0x471)];for(const _0x22967d of _0x4a7e11){_0x52d5c2[_0x22967d]=_0x443f52[_0x22967d];}}},DataManager[_0x59ef57(0x16e)]=function(_0x5eef1a){const _0x6135f8=_0x59ef57;if(!_0x5eef1a)return![];if(!_0x5eef1a[_0x6135f8(0x278)])return![];return _0x5eef1a&&_0x5eef1a[_0x6135f8(0x278)]['match'](/<PROXY:[ ](.*)>/i);},DataManager[_0x59ef57(0x400)]=function(_0x17538b){const _0x13e436=_0x59ef57;return this[_0x13e436(0x16e)](_0x17538b)?this[_0x13e436(0x3ed)](_0x17538b)||_0x17538b:_0x17538b;},DataManager[_0x59ef57(0x3ed)]=function(_0x17d87f){const _0x1dc66b=_0x59ef57;_0x17d87f[_0x1dc66b(0x278)]['match'](/<PROXY:[ ](.*)>/i);const _0x229f96=RegExp['$1'][_0x1dc66b(0x298)](),_0x2c14c7=/^\d+$/[_0x1dc66b(0x24e)](_0x229f96);if(this[_0x1dc66b(0x327)](_0x17d87f)){const _0x2bf95e=_0x2c14c7?Number(_0x229f96):DataManager[_0x1dc66b(0x4d1)](_0x229f96);return $dataItems[_0x2bf95e]||_0x17d87f;}else{if(this[_0x1dc66b(0x189)](_0x17d87f)){const _0x4e00a2=_0x2c14c7?Number(_0x229f96):DataManager[_0x1dc66b(0x403)](_0x229f96);return $dataWeapons[_0x4e00a2]||_0x17d87f;}else{if(this[_0x1dc66b(0x3d8)](_0x17d87f)){const _0x2cbf95=_0x2c14c7?Number(_0x229f96):DataManager[_0x1dc66b(0x452)](_0x229f96);return $dataArmors[_0x2cbf95]||_0x17d87f;}}}return _0x17d87f;},VisuMZ[_0x59ef57(0x3a2)]['Window_ItemList_item']=Window_ItemList['prototype'][_0x59ef57(0x1bb)],Window_ItemList[_0x59ef57(0x263)][_0x59ef57(0x1bb)]=function(){const _0x532a88=_0x59ef57;if($gameTemp[_0x532a88(0x323)])return VisuMZ['ItemsEquipsCore']['Window_ItemList_item'][_0x532a88(0x36e)](this);return DataManager[_0x532a88(0x400)](VisuMZ[_0x532a88(0x3a2)]['Window_ItemList_item'][_0x532a88(0x36e)](this));},Window_ItemList[_0x59ef57(0x263)]['proxyItem']=function(){const _0x3959d8=_0x59ef57;return VisuMZ[_0x3959d8(0x3a2)][_0x3959d8(0x30d)][_0x3959d8(0x36e)](this);},VisuMZ['ItemsEquipsCore'][_0x59ef57(0x1c8)]=Window_ShopBuy['prototype'][_0x59ef57(0x1bb)],Window_ShopBuy[_0x59ef57(0x263)][_0x59ef57(0x1bb)]=function(){const _0x1fd26a=_0x59ef57;if($gameTemp[_0x1fd26a(0x323)])return VisuMZ['ItemsEquipsCore'][_0x1fd26a(0x1c8)]['call'](this);return DataManager[_0x1fd26a(0x400)](VisuMZ[_0x1fd26a(0x3a2)][_0x1fd26a(0x1c8)]['call'](this));},Window_ShopBuy[_0x59ef57(0x263)][_0x59ef57(0x180)]=function(){const _0x1cfe4f=_0x59ef57;return VisuMZ['ItemsEquipsCore'][_0x1cfe4f(0x1c8)][_0x1cfe4f(0x36e)](this);},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x1e0)]=Game_Item[_0x59ef57(0x263)][_0x59ef57(0x21b)],Game_Item['prototype'][_0x59ef57(0x21b)]=function(_0x5a0b94){const _0x22273e=_0x59ef57;if(DataManager[_0x22273e(0x16e)](_0x5a0b94))return;VisuMZ[_0x22273e(0x3a2)][_0x22273e(0x1e0)]['call'](this,_0x5a0b94);},VisuMZ['ItemsEquipsCore']['SetupArtifactItemIDs']=function(){const _0x2bf5c0=_0x59ef57;this['artifactIDs']={'partyArtifactIDs':[],'troopArtifactIDs':[]};for(const _0x12820f of $dataArmors){if(!_0x12820f)continue;if(!DataManager['isArtifact'](_0x12820f))continue;DataManager[_0x2bf5c0(0x1df)](_0x12820f)&&this[_0x2bf5c0(0x2a3)]['partyArtifactIDs'][_0x2bf5c0(0x2a9)](_0x12820f['id']),DataManager[_0x2bf5c0(0xbf)](_0x12820f)&&this[_0x2bf5c0(0x2a3)]['troopArtifactIDs'][_0x2bf5c0(0x2a9)](_0x12820f['id']);}},DataManager['isArtifact']=function(_0x6e4e7b){const _0x4b4b26=_0x59ef57;if(!this[_0x4b4b26(0x3d8)](_0x6e4e7b))return![];const _0x5698b6=_0x6e4e7b['note'];if(!_0x5698b6)return![];if(_0x5698b6[_0x4b4b26(0xf0)](/<(?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x5698b6[_0x4b4b26(0xf0)](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x5698b6[_0x4b4b26(0xf0)](/<(?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x5698b6[_0x4b4b26(0xf0)](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];},DataManager[_0x59ef57(0x15d)]=function(_0x5cd0a0){const _0x373172=_0x59ef57;if(!this['isArtifact'](_0x5cd0a0))return![];const _0x79c7fc=_0x5cd0a0[_0x373172(0x278)];if(!_0x79c7fc)return![];if(_0x79c7fc['match'](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x79c7fc[_0x373172(0xf0)](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];},DataManager[_0x59ef57(0x1df)]=function(_0xa687ea){const _0xa45b55=_0x59ef57;if(!this['isArtifact'](_0xa687ea))return![];const _0x31dd47=_0xa687ea[_0xa45b55(0x278)];if(!_0x31dd47)return![];if(_0x31dd47[_0xa45b55(0xf0)](/<(?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x31dd47[_0xa45b55(0xf0)](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];return![];},DataManager[_0x59ef57(0xbf)]=function(_0x558d70){const _0x43a379=_0x59ef57;if(!this['isArtifact'](_0x558d70))return![];const _0x411cbc=_0x558d70[_0x43a379(0x278)];if(!_0x411cbc)return![];if(_0x411cbc[_0x43a379(0xf0)](/<(?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x411cbc[_0x43a379(0xf0)](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x451)]=Game_BattlerBase[_0x59ef57(0x263)][_0x59ef57(0x191)],Game_BattlerBase[_0x59ef57(0x263)]['canEquip']=function(_0x511def){const _0x2d8d2e=_0x59ef57;if(DataManager['isArtifact'](_0x511def))return![];if(!DataManager[_0x2d8d2e(0x24c)](this,_0x511def))return![];if(!DataManager[_0x2d8d2e(0x36c)](this,_0x511def))return![];return VisuMZ['ItemsEquipsCore']['Game_BattlerBase_canEquip_artifact'][_0x2d8d2e(0x36e)](this,_0x511def);},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x358)]=Game_BattlerBase[_0x59ef57(0x263)][_0x59ef57(0x238)],Game_BattlerBase[_0x59ef57(0x263)]['param']=function(_0x279674){const _0x4449f2=_0x59ef57;this[_0x4449f2(0x4b5)]=!![];const _0x293d17=VisuMZ[_0x4449f2(0x3a2)]['Game_BattlerBase_param_artifact']['call'](this,_0x279674);return this[_0x4449f2(0x4b5)]=undefined,_0x293d17;},VisuMZ[_0x59ef57(0x3a2)]['Game_Actor_artifact']=Game_Actor['prototype'][_0x59ef57(0x28a)],Game_Actor[_0x59ef57(0x263)]['traitObjects']=function(){const _0x55c9cc=_0x59ef57;this['_allowArtifactTraitObjects']=!![];const _0x47ddde=VisuMZ[_0x55c9cc(0x3a2)][_0x55c9cc(0x3d3)]['call'](this);return this[_0x55c9cc(0x18b)]=undefined,_0x47ddde;},VisuMZ[_0x59ef57(0x3a2)]['Game_Actor_equips_artifacts']=Game_Actor[_0x59ef57(0x263)][_0x59ef57(0x19a)],Game_Actor[_0x59ef57(0x263)][_0x59ef57(0x19a)]=function(){const _0x4bfbfc=_0x59ef57,_0x16a875=VisuMZ['ItemsEquipsCore'][_0x4bfbfc(0x36d)][_0x4bfbfc(0x36e)](this);if(this['_allowArtifactTraitObjects']||this[_0x4bfbfc(0x4b5)]){const _0x2ddb55=_0x16a875['concat']($gameParty[_0x4bfbfc(0x356)]());return _0x2ddb55;}else return _0x16a875;},VisuMZ['ItemsEquipsCore'][_0x59ef57(0x26e)]=Game_BattlerBase[_0x59ef57(0x263)][_0x59ef57(0x192)],Game_BattlerBase[_0x59ef57(0x263)][_0x59ef57(0x192)]=function(_0x44fa6a){const _0x1450f9=_0x59ef57;let _0x18ce88=VisuMZ[_0x1450f9(0x3a2)][_0x1450f9(0x26e)][_0x1450f9(0x36e)](this,_0x44fa6a);if(this[_0x1450f9(0x183)]===Game_Enemy)for(const _0x5f1694 of $gameParty[_0x1450f9(0x308)]()){if(_0x5f1694)_0x18ce88+=_0x5f1694[_0x1450f9(0xc3)][_0x44fa6a];}return _0x18ce88;},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x280)]=Game_Enemy[_0x59ef57(0x263)][_0x59ef57(0x28a)],Game_Enemy[_0x59ef57(0x263)]['traitObjects']=function(){const _0x5e86d2=_0x59ef57;let _0x4f6a04=VisuMZ['ItemsEquipsCore'][_0x5e86d2(0x280)][_0x5e86d2(0x36e)](this);return _0x4f6a04[_0x5e86d2(0x415)]($gameParty[_0x5e86d2(0x308)]());},VisuMZ['ItemsEquipsCore'][_0x59ef57(0x1fc)]=Game_Party[_0x59ef57(0x263)][_0x59ef57(0x361)],Game_Party['prototype'][_0x59ef57(0x361)]=function(_0x1e7c0f,_0x24770d,_0x29c869){const _0x25823a=_0x59ef57;VisuMZ[_0x25823a(0x3a2)][_0x25823a(0x1fc)][_0x25823a(0x36e)](this,_0x1e7c0f,_0x24770d,_0x29c869);if(DataManager[_0x25823a(0x38e)](_0x1e7c0f)){let _0x4bb1a6=$gameParty[_0x25823a(0x450)]();if($gameParty[_0x25823a(0x4da)]())_0x4bb1a6=_0x4bb1a6[_0x25823a(0x415)]($gameTroop['members']());for(const _0xb319a0 of _0x4bb1a6){if(!_0xb319a0)continue;_0xb319a0['_cache']={};}}},Game_Party[_0x59ef57(0x263)][_0x59ef57(0x356)]=function(){const _0xf4efda=_0x59ef57;let _0x58b810=[];const _0x40682a=VisuMZ[_0xf4efda(0x3a2)]['artifactIDs'][_0xf4efda(0x34e)];if(_0x40682a)for(const _0x4046d9 of _0x40682a){const _0x4a8b7b=$dataArmors[_0x4046d9];if(!_0x4a8b7b)continue;if(!this[_0xf4efda(0x1dd)](_0x4a8b7b))continue;let _0x57836e=0x1;if(DataManager[_0xf4efda(0x15d)](_0x4a8b7b))_0x57836e=this['numItems'](_0x4a8b7b);while(_0x57836e--)_0x58b810['push'](_0x4a8b7b);}return _0x58b810;},Game_Party[_0x59ef57(0x263)][_0x59ef57(0x308)]=function(){const _0x22274b=_0x59ef57;let _0x54d5f0=[];const _0x2d4e81=VisuMZ['ItemsEquipsCore'][_0x22274b(0x2a3)]['troopArtifactIDs'];if(_0x2d4e81)for(const _0x162ff6 of _0x2d4e81){const _0x4b6a65=$dataArmors[_0x162ff6];if(!_0x4b6a65)continue;if(!this[_0x22274b(0x1dd)](_0x4b6a65))continue;let _0x312b25=0x1;if(DataManager[_0x22274b(0x15d)](_0x4b6a65))_0x312b25=this[_0x22274b(0x36a)](_0x4b6a65);while(_0x312b25--)_0x54d5f0['push'](_0x4b6a65);}return _0x54d5f0;},Game_Party['prototype'][_0x59ef57(0x1e9)]=function(){const _0x2eb329=_0x59ef57;return this[_0x2eb329(0x356)]()['concat'](this['troopArtifacts']());},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x4e2)]=Game_Party[_0x59ef57(0x263)][_0x59ef57(0x438)],Game_Party[_0x59ef57(0x263)][_0x59ef57(0x438)]=function(){const _0x35f07f=_0x59ef57;VisuMZ['ItemsEquipsCore'][_0x35f07f(0x4e2)][_0x35f07f(0x36e)](this),this['removeBattleTestArtifacts']();},Game_Party[_0x59ef57(0x263)]['removeBattleTestArtifacts']=function(){const _0x2b728c=_0x59ef57,_0x2f5ff9=$gameParty['armors']()[_0x2b728c(0x2df)](_0x4005ef=>DataManager[_0x2b728c(0x38e)](_0x4005ef));for(const _0x1f61d1 of _0x2f5ff9){const _0x5a0f96=this[_0x2b728c(0x36a)](_0x1f61d1);if(_0x5a0f96)this[_0x2b728c(0x4e3)](_0x1f61d1,_0x5a0f96);}},DataManager[_0x59ef57(0x24c)]=function(_0xc02d14,_0x4cab3e){const _0x3a82c6=_0x59ef57;if(this[_0x3a82c6(0x327)](_0x4cab3e))return![];if(!_0xc02d14)return![];if($gameTemp[_0x3a82c6(0x439)])return!![];if(BattleManager[_0x3a82c6(0x4ad)]())return!![];const _0x5a28b1=this[_0x3a82c6(0x464)](_0x4cab3e);if(_0x5a28b1[_0x3a82c6(0x104)]<=0x0)return!![];return _0x5a28b1[_0x3a82c6(0x291)](_0xc02d14[_0x3a82c6(0x2be)]()['id']);},DataManager[_0x59ef57(0x464)]=function(_0x4b67c9){const _0x34a2c2=_0x59ef57;if(!_0x4b67c9)return[];this['_getClassRequirements']=this[_0x34a2c2(0x3fa)]||{};const _0xd9712a=_0x34a2c2(0x27f)[_0x34a2c2(0x46e)](this[_0x34a2c2(0x189)](_0x4b67c9)?_0x34a2c2(0x301):_0x34a2c2(0x14b),_0x4b67c9['id']);if(this['_getClassRequirements'][_0xd9712a]!==undefined)return this[_0x34a2c2(0x3fa)][_0xd9712a];let _0x4b1ad6=[];const _0x42a30f=_0x4b67c9[_0x34a2c2(0x278)]||'';if(_0x42a30f[_0x34a2c2(0xf0)](/<EQUIP FOR CLASS(?:|ES) ONLY:[ ](.*)>/i)){const _0x4d4d6c=String(RegExp['$1'])['split'](',')['map'](_0x282116=>_0x282116[_0x34a2c2(0x298)]());for(const _0x203b16 of _0x4d4d6c){const _0x582a07=/^\d+$/['test'](_0x203b16);_0x582a07?_0x4b1ad6[_0x34a2c2(0x2a9)](Number(_0x203b16)):_0x4b1ad6[_0x34a2c2(0x2a9)](DataManager['getClassIdWithName'](_0x203b16));}}return this[_0x34a2c2(0x3fa)][_0xd9712a]=_0x4b1ad6,this[_0x34a2c2(0x3fa)][_0xd9712a];},DataManager[_0x59ef57(0x36c)]=function(_0x3c93df,_0x2ab700){const _0x18c74a=_0x59ef57;if(this[_0x18c74a(0x327)](_0x2ab700))return![];if(!_0x3c93df)return![];if($gameTemp[_0x18c74a(0x439)])return!![];if(BattleManager[_0x18c74a(0x4ad)]())return!![];const _0x1eff46=this['getEquipRequirements'](_0x2ab700);for(const _0x401250 of _0x1eff46){if(!this[_0x18c74a(0x3e2)](_0x3c93df,_0x401250))return![];}return!![];},DataManager[_0x59ef57(0x44b)]=function(_0xfcd022){const _0x21f063=_0x59ef57;if(!_0xfcd022)return[];this[_0x21f063(0x4b2)]=this[_0x21f063(0x4b2)]||{};const _0x1e5320=_0x21f063(0x27f)[_0x21f063(0x46e)](this['isWeapon'](_0xfcd022)?_0x21f063(0x301):_0x21f063(0x14b),_0xfcd022['id']);if(this[_0x21f063(0x4b2)][_0x1e5320]!==undefined)return this[_0x21f063(0x4b2)][_0x1e5320];let _0x3a0bf8=[];const _0x29e7fc=_0xfcd022[_0x21f063(0x278)]||'';return _0x29e7fc['match'](/<EQUIP(?:|MENT)[ ]REQUIREMENT(?:|S)>\s*([\s\S]*)\s*<\/EQUIP(?:|MENT)[ ]REQUIREMENT(?:|S)>/i)&&(_0x3a0bf8=String(RegExp['$1'])[_0x21f063(0x15b)](/[\r\n]+/)),this['_getEquipRequirements'][_0x1e5320]=_0x3a0bf8,this['_getEquipRequirements'][_0x1e5320];},DataManager[_0x59ef57(0x3e2)]=function(_0x542f1a,_0x4a8b1a){const _0x4c3c76=_0x59ef57;if(_0x4a8b1a['match'](/(?:LEVEL|LV|LVL)[ ](>|>=|===|<=|<)[ ](\d+)/i)){const _0x957670=String(RegExp['$1'])[_0x4c3c76(0x298)](),_0x329725=Number(RegExp['$2']);switch(_0x957670){case'>':return _0x542f1a['level']>_0x329725;case'>=':return _0x542f1a[_0x4c3c76(0x470)]>=_0x329725;case _0x4c3c76(0x4ae):return _0x542f1a['level']===_0x329725;case'<=':return _0x542f1a[_0x4c3c76(0x470)]<=_0x329725;case'<':return _0x542f1a[_0x4c3c76(0x470)]<_0x329725;}return![];}if(_0x4a8b1a['match'](/(MAXHP|MAXMP|MHP|MMP)[ ](>|>=|===|<=|<)[ ](\d+)/i)){const _0x14c79a=String(RegExp['$1'])['toLowerCase']()[_0x4c3c76(0x298)](),_0x8c90e8=String(RegExp['$2'])[_0x4c3c76(0x298)](),_0x5ac541=Number(RegExp['$3']);let _0x28ceae=0x0;if([_0x4c3c76(0x1bc),_0x4c3c76(0x3fd)]['includes'](_0x14c79a))_0x28ceae=0x1;const _0x414c15=_0x542f1a[_0x4c3c76(0x2e4)][_0x28ceae]||0x0;switch(_0x8c90e8){case'>':return _0x542f1a['paramBase'](_0x28ceae)+_0x414c15>_0x5ac541;case'>=':return _0x542f1a[_0x4c3c76(0x162)](_0x28ceae)+_0x414c15>=_0x5ac541;case _0x4c3c76(0x4ae):return _0x542f1a[_0x4c3c76(0x162)](_0x28ceae)+_0x414c15===_0x5ac541;case'<=':return _0x542f1a[_0x4c3c76(0x162)](_0x28ceae)+_0x414c15<=_0x5ac541;case'<':return _0x542f1a['paramBase'](_0x28ceae)+_0x414c15<_0x5ac541;}return![];}if(_0x4a8b1a[_0x4c3c76(0xf0)](/(ATK|DEF|MAT|MDF|AGI|LUK)[ ](>|>=|===|<=|<)[ ](\d+)/i)){const _0xc05d79=String(RegExp['$1'])[_0x4c3c76(0x367)]()['trim'](),_0x1eded4=String(RegExp['$2'])[_0x4c3c76(0x298)](),_0x3fcd82=Number(RegExp['$3']),_0x34eba2=[_0x4c3c76(0x30a),_0x4c3c76(0x108),'mat',_0x4c3c76(0x186),'agi','luk'];let _0x471997=_0x34eba2[_0x4c3c76(0x179)](_0xc05d79)+0x2;if(_0x471997<0x2)return![];const _0x8bc570=_0x542f1a[_0x4c3c76(0x2e4)][_0x471997]||0x0;switch(_0x1eded4){case'>':return _0x542f1a[_0x4c3c76(0x162)](_0x471997)+_0x8bc570>_0x3fcd82;case'>=':return _0x542f1a[_0x4c3c76(0x162)](_0x471997)+_0x8bc570>=_0x3fcd82;case _0x4c3c76(0x4ae):return _0x542f1a[_0x4c3c76(0x162)](_0x471997)+_0x8bc570===_0x3fcd82;case'<=':return _0x542f1a[_0x4c3c76(0x162)](_0x471997)+_0x8bc570<=_0x3fcd82;case'<':return _0x542f1a[_0x4c3c76(0x162)](_0x471997)+_0x8bc570<_0x3fcd82;}return![];}if(_0x4a8b1a[_0x4c3c76(0xf0)](/LEARNED SKILL:[ ](\d+)/i)){const _0x3c1eec=Number(RegExp['$1']);return _0x542f1a['isLearnedSkill'](_0x3c1eec);}else{if(_0x4a8b1a[_0x4c3c76(0xf0)](/LEARNED SKILL:[ ](.*)/i)){const _0x17d0e7=String(RegExp['$1']),_0x185bd0=this[_0x4c3c76(0x185)](_0x17d0e7);return _0x542f1a[_0x4c3c76(0x462)](_0x185bd0);}}if(_0x4a8b1a['match'](/SWITCH:[ ](\d+)/i)){const _0x125dcb=Number(RegExp['$1']);return $gameSwitches[_0x4c3c76(0x41e)](_0x125dcb);}return!![];},DataManager['getEtypeIDs']=function(_0x1ce695){const _0x35f729=_0x59ef57;return this[_0x35f729(0x3d8)](_0x1ce695)?this[_0x35f729(0x3a3)](_0x1ce695):[_0x1ce695[_0x35f729(0x352)]||0x0];},DataManager['getEtypeIDsCache']=function(_0x3419e2){const _0x3c592c=_0x59ef57;this[_0x3c592c(0x30b)]=this[_0x3c592c(0x30b)]||{};if(this[_0x3c592c(0x30b)][_0x3419e2['id']]!==undefined)return this[_0x3c592c(0x30b)][_0x3419e2['id']];this['_cache_etypeIDs'][_0x3419e2['id']]=[_0x3419e2['etypeId']||0x0];const _0x84619e=_0x3419e2[_0x3c592c(0x278)]||'';if(_0x84619e[_0x3c592c(0xf0)](/<ADDED ETYPE(?:|S):[ ](.*)>/i)){const _0x12c009=String(RegExp['$1'])[_0x3c592c(0x15b)](',')[_0x3c592c(0x2ed)](_0x4558d9=>_0x4558d9[_0x3c592c(0x298)]());for(const _0x186c47 of _0x12c009){const _0x2813bf=/^\d+$/[_0x3c592c(0x24e)](_0x186c47);let _0x20dd4c=0x0;_0x2813bf?_0x20dd4c=Number(_0x186c47):_0x20dd4c=this[_0x3c592c(0x33a)](_0x186c47),_0x20dd4c>0x1&&this[_0x3c592c(0x30b)][_0x3419e2['id']][_0x3c592c(0x2a9)](_0x20dd4c);}}return this['_cache_etypeIDs'][_0x3419e2['id']];},Game_BattlerBase[_0x59ef57(0x263)][_0x59ef57(0x40b)]=function(_0x429fb9){const _0x402668=_0x59ef57;return this[_0x402668(0x419)](_0x429fb9[_0x402668(0x22b)])&&!this[_0x402668(0x240)](_0x429fb9[_0x402668(0x352)])&&DataManager['getEtypeIDs'](_0x429fb9)[_0x402668(0x1fd)](_0x4cf483=>!this['isEquipTypeSealed'](_0x4cf483));},DataManager[_0x59ef57(0xe6)]=function(_0x54830d){const _0x14a324=_0x59ef57;if(!this['isWeapon'](_0x54830d)&&!this[_0x14a324(0x3d8)](_0x54830d))return![];if(Imported[_0x14a324(0x3c3)]&&this[_0x14a324(0x189)](_0x54830d))return![];if(!_0x54830d['note'])return![];return _0x54830d[_0x14a324(0x278)][_0x14a324(0xf0)](/<CURSED>/i);},DataManager['getPurifyTransformation']=function(_0x3b572a){const _0x371717=_0x59ef57;if(!_0x3b572a)return _0x3b572a;if(!this[_0x371717(0x189)](_0x3b572a)&&!this['isArmor'](_0x3b572a))return _0x3b572a;if(_0x3b572a[_0x371717(0x278)]['match'](/<PURIFY TRANSFORM:[ ](.*)>/i)){const _0x53018b=String(RegExp['$1'])[_0x371717(0x298)](),_0x4c78c2=/^\d+$/['test'](_0x53018b);if(_0x4c78c2){if(this[_0x371717(0x189)](_0x3b572a))return $dataWeapons[Number(_0x53018b)];if(this['isArmor'](_0x3b572a))return $dataArmors[Number(_0x53018b)];}else{if(this[_0x371717(0x189)](_0x3b572a))return $dataWeapons[this[_0x371717(0x403)](_0x53018b)];if(this[_0x371717(0x3d8)](_0x3b572a))return $dataArmors[this[_0x371717(0x452)](_0x53018b)];}}return _0x3b572a;},Game_Party[_0x59ef57(0x263)][_0x59ef57(0x49f)]=function(){const _0x3f4e02=_0x59ef57,_0x4d937f=this['allMembers']();for(const _0x47074b of _0x4d937f){if(!_0x47074b)continue;_0x47074b[_0x3f4e02(0x49f)]();}},Game_Actor['prototype'][_0x59ef57(0x49f)]=function(){const _0x406b53=_0x59ef57,_0x3f84b2=this['equipSlots']()[_0x406b53(0x104)];for(let _0x228ea5=0x0;_0x228ea5<_0x3f84b2;_0x228ea5++){const _0x46675b=this['_equips'][_0x228ea5];if(!_0x46675b)continue;const _0x2816fe=_0x46675b[_0x406b53(0xd9)]();if(!DataManager[_0x406b53(0xe6)](_0x2816fe))continue;let _0x3f733f=DataManager['getPurifyTransformation'](_0x2816fe);this[_0x406b53(0x437)](_0x2816fe,_0x3f733f)?(!this[_0x406b53(0x112)][_0x228ea5]&&(this[_0x406b53(0x112)][_0x228ea5]=new Game_Item()),this[_0x406b53(0x112)][_0x228ea5]['setObject'](_0x3f733f),this[_0x406b53(0x3d1)]()):this['changeEquip'](_0x228ea5,null);}},Game_Actor['prototype']['isPurifyItemSwapOk']=function(_0x5b581e,_0x40d30f){const _0x50354d=_0x59ef57;if(_0x5b581e===_0x40d30f)return![];const _0x4faafc=DataManager[_0x50354d(0x2c3)](_0x40d30f);if(!_0x4faafc[_0x50354d(0x291)](_0x5b581e[_0x50354d(0x352)]))return![];if(DataManager['isWeapon'](_0x40d30f))return this[_0x50354d(0x333)](_0x40d30f[_0x50354d(0x45f)]);else{if(DataManager['isArmor'](_0x40d30f))return this[_0x50354d(0x419)](_0x40d30f[_0x50354d(0x22b)]);}return![];},TextManager[_0x59ef57(0x3c7)]={'helpDesc':{'equip':VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x16f)][_0x59ef57(0x4b0)][_0x59ef57(0xdf)]??_0x59ef57(0x430),'optimize':VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x16f)][_0x59ef57(0x4b0)][_0x59ef57(0x41c)]??'Equip\x20the\x20strongest\x20available\x20equipment.','clear':VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x16f)][_0x59ef57(0x4b0)][_0x59ef57(0x330)]??'Remove\x20all\x20available\x20equipment.'}},ColorManager[_0x59ef57(0x282)]=function(_0x242548){const _0x506f19=_0x59ef57;if(!_0x242548)return this[_0x506f19(0x154)]();else{if(_0x242548[_0x506f19(0x278)][_0x506f19(0xf0)](/<COLOR:[ ](\d+)>/i))return this['textColor'](Number(RegExp['$1'])[_0x506f19(0xa7)](0x0,0x1f));else return _0x242548['note'][_0x506f19(0xf0)](/<COLOR:[ ]#(.*)>/i)?'#'+String(RegExp['$1']):this[_0x506f19(0x154)]();}},ColorManager['getColor']=function(_0x5c670b){const _0x4dadb8=_0x59ef57;return _0x5c670b=String(_0x5c670b),_0x5c670b[_0x4dadb8(0xf0)](/#(.*)/i)?_0x4dadb8(0x3f9)[_0x4dadb8(0x46e)](String(RegExp['$1'])):this[_0x4dadb8(0x2bf)](Number(_0x5c670b));},SceneManager[_0x59ef57(0x426)]=function(){const _0x7f18f0=_0x59ef57;return this[_0x7f18f0(0xd8)]&&this['_scene'][_0x7f18f0(0x183)]===Scene_Shop;},Game_Temp[_0x59ef57(0x263)][_0x59ef57(0x33f)]=function(){const _0x386756=_0x59ef57;if(this[_0x386756(0x1e4)])return![];return VisuMZ[_0x386756(0x3a2)][_0x386756(0x16f)][_0x386756(0x4ec)][_0x386756(0x4f9)];},VisuMZ['ShopMenuStatusStandard']=VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x16f)][_0x59ef57(0x372)][_0x59ef57(0x2a2)],VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x2e1)]=Game_BattlerBase[_0x59ef57(0x263)][_0x59ef57(0x238)],Game_BattlerBase['prototype'][_0x59ef57(0x238)]=function(_0x5c3d76){const _0x42941c=_0x59ef57;return this[_0x42941c(0x360)]?this[_0x42941c(0x173)]?VisuMZ[_0x42941c(0x4c4)]:0x1:VisuMZ[_0x42941c(0x3a2)]['Game_BattlerBase_param'][_0x42941c(0x36e)](this,_0x5c3d76);},VisuMZ['ItemsEquipsCore']['Game_BattlerBase_meetsItemConditions']=Game_BattlerBase['prototype'][_0x59ef57(0x1a8)],Game_BattlerBase[_0x59ef57(0x263)]['meetsItemConditions']=function(_0x109e94){const _0x335ed7=_0x59ef57;if(!_0x109e94)return![];if(!VisuMZ[_0x335ed7(0x3a2)][_0x335ed7(0x42d)][_0x335ed7(0x36e)](this,_0x109e94))return![];if(!this['meetsItemConditionsNotetags'](_0x109e94))return![];if(!this[_0x335ed7(0x422)](_0x109e94))return![];return!![];},Game_BattlerBase['prototype']['meetsItemConditionsNotetags']=function(_0x453d82){const _0x11e7ef=_0x59ef57;if(!this[_0x11e7ef(0x37f)](_0x453d82))return![];return!![];},Game_BattlerBase[_0x59ef57(0x263)][_0x59ef57(0x37f)]=function(_0x237c79){const _0x21f4c7=_0x59ef57,_0x405187=_0x237c79['note'];if(_0x405187[_0x21f4c7(0xf0)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1337f0=JSON[_0x21f4c7(0x21a)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x78f5cb of _0x1337f0){if(!$gameSwitches[_0x21f4c7(0x41e)](_0x78f5cb))return![];}return!![];}if(_0x405187['match'](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x31fd5d=JSON['parse']('['+RegExp['$1'][_0x21f4c7(0xf0)](/\d+/g)+']');for(const _0x4b78ad of _0x31fd5d){if(!$gameSwitches[_0x21f4c7(0x41e)](_0x4b78ad))return![];}return!![];}if(_0x405187[_0x21f4c7(0xf0)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x192c6e=JSON[_0x21f4c7(0x21a)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x1904c6 of _0x192c6e){if($gameSwitches[_0x21f4c7(0x41e)](_0x1904c6))return!![];}return![];}if(_0x405187[_0x21f4c7(0xf0)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x288efa=JSON[_0x21f4c7(0x21a)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x551b22 of _0x288efa){if(!$gameSwitches['value'](_0x551b22))return!![];}return![];}if(_0x405187[_0x21f4c7(0xf0)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x28887=JSON['parse']('['+RegExp['$1'][_0x21f4c7(0xf0)](/\d+/g)+']');for(const _0x294c87 of _0x28887){if(!$gameSwitches[_0x21f4c7(0x41e)](_0x294c87))return!![];}return![];}if(_0x405187[_0x21f4c7(0xf0)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1c3866=JSON[_0x21f4c7(0x21a)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x4ccba1 of _0x1c3866){if($gameSwitches[_0x21f4c7(0x41e)](_0x4ccba1))return![];}return!![];}return!![];},Game_BattlerBase[_0x59ef57(0x263)][_0x59ef57(0x422)]=function(_0x385266){const _0x14ec79=_0x59ef57,_0x5c5e3a=_0x385266[_0x14ec79(0x278)],_0x195ae8=VisuMZ[_0x14ec79(0x3a2)][_0x14ec79(0xf9)];return _0x195ae8[_0x385266['id']]?_0x195ae8[_0x385266['id']][_0x14ec79(0x36e)](this,_0x385266):!![];},Game_Actor['prototype']['clearEquipments']=function(){const _0x35586b=_0x59ef57,_0xa7cca1=this[_0x35586b(0x204)]()[_0x35586b(0x104)];for(let _0x566c58=0x0;_0x566c58<_0xa7cca1;_0x566c58++){if(this['isClearEquipOk'](_0x566c58))this[_0x35586b(0x39b)](_0x566c58,null);}},Game_Actor[_0x59ef57(0x263)][_0x59ef57(0x3cf)]=function(_0x423db7){const _0x3072d9=_0x59ef57;return this['nonRemovableEtypes']()[_0x3072d9(0x291)](this['equipSlots']()[_0x423db7])?![]:this['isEquipChangeOk'](_0x423db7);},Game_Actor[_0x59ef57(0x263)][_0x59ef57(0x3e1)]=function(){const _0x5d07f1=_0x59ef57;return VisuMZ[_0x5d07f1(0x3a2)][_0x5d07f1(0x16f)]['EquipScene'][_0x5d07f1(0x3fc)];},Game_Actor[_0x59ef57(0x263)][_0x59ef57(0x211)]=function(){const _0x5dd703=_0x59ef57,_0x4a7d98=this[_0x5dd703(0x204)]()[_0x5dd703(0x104)];for(let _0x4b172a=0x0;_0x4b172a<_0x4a7d98;_0x4b172a++){if(this['isOptimizeEquipOk'](_0x4b172a))this[_0x5dd703(0x39b)](_0x4b172a,null);}for(let _0x40972c=0x0;_0x40972c<_0x4a7d98;_0x40972c++){if(this[_0x5dd703(0x1e8)](_0x40972c))this[_0x5dd703(0x39b)](_0x40972c,this['bestEquipItem'](_0x40972c));}},Game_Actor[_0x59ef57(0x263)][_0x59ef57(0x1e8)]=function(_0x360bff){const _0x5942ff=_0x59ef57;return this[_0x5942ff(0x316)]()[_0x5942ff(0x291)](this[_0x5942ff(0x204)]()[_0x360bff])?![]:this['isEquipChangeOk'](_0x360bff);},VisuMZ['ItemsEquipsCore'][_0x59ef57(0x105)]=Game_Actor[_0x59ef57(0x263)][_0x59ef57(0x387)],Game_Actor['prototype'][_0x59ef57(0x387)]=function(_0x292e9c){const _0x2232ba=_0x59ef57;!this[_0x2232ba(0x112)][_0x292e9c]&&(this[_0x2232ba(0x112)][_0x292e9c]=new Game_Item());const _0x2f812d=this[_0x2232ba(0x112)][_0x292e9c];if(_0x2f812d){const _0x14a8dc=_0x2f812d[_0x2232ba(0xd9)]();if(DataManager['isCursedItem'](_0x14a8dc))return![];}return VisuMZ['ItemsEquipsCore'][_0x2232ba(0x105)][_0x2232ba(0x36e)](this,_0x292e9c);},Game_Actor[_0x59ef57(0x263)]['nonOptimizeEtypes']=function(){const _0x42213=_0x59ef57;return VisuMZ['ItemsEquipsCore'][_0x42213(0x16f)][_0x42213(0x4b0)]['NonOptimizeETypes'];},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0xf7)]=Game_Actor[_0x59ef57(0x263)][_0x59ef57(0x134)],Game_Actor[_0x59ef57(0x263)][_0x59ef57(0x134)]=function(_0x4059b5,_0x2cee4e){const _0x4bd9a5=_0x59ef57;if(this[_0x4bd9a5(0x34f)])return![];$gameTemp['_bypassNewLabel']=!![];const _0x537996=VisuMZ['ItemsEquipsCore'][_0x4bd9a5(0xf7)][_0x4bd9a5(0x36e)](this,_0x4059b5,_0x2cee4e);return $gameTemp[_0x4bd9a5(0x1e4)]=![],_0x537996;},Game_Actor[_0x59ef57(0x263)][_0x59ef57(0x224)]=function(_0x1012c8,_0x448360){const _0x51e9c5=_0x59ef57,_0x52d2e9=this[_0x51e9c5(0x2ab)](_0x1012c8);if(_0x52d2e9<0x0)return;const _0x55770f=_0x1012c8===0x1?$dataWeapons[_0x448360]:$dataArmors[_0x448360];this[_0x51e9c5(0x39b)](_0x52d2e9,_0x55770f);},Game_Actor['prototype'][_0x59ef57(0x2ab)]=function(_0x5b59cf){const _0x38ed45=_0x59ef57;let _0x5c23c2=0x0;const _0x1193b5=this['equipSlots'](),_0x2f1650=this['equips']();for(let _0x14b38b=0x0;_0x14b38b<_0x1193b5[_0x38ed45(0x104)];_0x14b38b++){if(_0x1193b5[_0x14b38b]===_0x5b59cf){_0x5c23c2=_0x14b38b;if(!_0x2f1650[_0x14b38b])return _0x5c23c2;}}return _0x5c23c2;},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x311)]=Game_Actor['prototype']['paramPlus'],Game_Actor['prototype']['paramPlus']=function(_0x317a5f){const _0x27b7a6=_0x59ef57;let _0x53ef9b=VisuMZ[_0x27b7a6(0x3a2)][_0x27b7a6(0x311)][_0x27b7a6(0x36e)](this,_0x317a5f);for(const _0x21563e of this['equips']()){if(_0x21563e)_0x53ef9b+=this[_0x27b7a6(0x1ee)](_0x21563e,_0x317a5f);}return _0x53ef9b;},Game_Actor[_0x59ef57(0x263)]['paramPlusItemsEquipsCoreCustomJS']=function(_0x478750,_0x10fcdc){const _0x1ceec0=_0x59ef57;if(this[_0x1ceec0(0x3b5)])return 0x0;const _0x398eb2=(DataManager[_0x1ceec0(0x189)](_0x478750)?_0x1ceec0(0x307):'A%1')[_0x1ceec0(0x46e)](_0x478750['id']),_0x10c694='%1-%2'['format'](_0x398eb2,_0x10fcdc);if(VisuMZ['ItemsEquipsCore'][_0x1ceec0(0x257)][_0x10c694]){this[_0x1ceec0(0x3b5)]=!![];const _0xc023cd=VisuMZ['ItemsEquipsCore']['paramJS'][_0x10c694][_0x1ceec0(0x36e)](this,_0x478750,_0x10fcdc);return this[_0x1ceec0(0x3b5)]=![],_0xc023cd;}else return 0x0;},Game_Actor[_0x59ef57(0x263)][_0x59ef57(0x4ce)]=function(_0x3e4d1e){const _0x40f292=_0x59ef57;this[_0x40f292(0x360)]=!![],this[_0x40f292(0x173)]=_0x3e4d1e;},Game_Actor[_0x59ef57(0x263)][_0x59ef57(0x20d)]=function(_0x5d0e93){const _0x3a80dd=_0x59ef57;_0x5d0e93=this[_0x3a80dd(0x39f)](_0x5d0e93);const _0xd8d113=this[_0x3a80dd(0x204)]();this[_0x3a80dd(0x112)]=[];for(let _0x98e969=0x0;_0x98e969<_0xd8d113[_0x3a80dd(0x104)];_0x98e969++){this[_0x3a80dd(0x112)][_0x98e969]=new Game_Item();}for(let _0x31e7db=0x0;_0x31e7db<_0xd8d113[_0x3a80dd(0x104)];_0x31e7db++){const _0x36c488=_0xd8d113[_0x31e7db],_0x5995f5=this[_0x3a80dd(0x169)](_0x5d0e93,_0x36c488);if(this[_0x3a80dd(0x191)](_0x5995f5))this['_equips'][_0x31e7db][_0x3a80dd(0x21b)](_0x5995f5);}this[_0x3a80dd(0x2a0)](!![]),this[_0x3a80dd(0x3d1)]();},Game_Actor[_0x59ef57(0x263)][_0x59ef57(0x39f)]=function(_0x3f92e6){const _0x5187c9=_0x59ef57,_0x40c55e=[];for(let _0x4a6baa=0x0;_0x4a6baa<_0x3f92e6[_0x5187c9(0x104)];_0x4a6baa++){const _0x26b0c9=_0x3f92e6[_0x4a6baa];if(_0x26b0c9<=0x0)continue;const _0x169998=$dataSystem[_0x5187c9(0x376)][_0x4a6baa+0x1];if(_0x169998===$dataSystem['equipTypes'][0x1]||_0x4a6baa===0x1&&this[_0x5187c9(0x182)]())_0x40c55e[_0x5187c9(0x2a9)]($dataWeapons[_0x26b0c9]);else{if(BattleManager[_0x5187c9(0x4ad)]()){const _0x4ac935=$dataArmors[_0x26b0c9];_0x4ac935&&_0x4ac935[_0x5187c9(0x352)]===_0x4a6baa+0x1&&_0x40c55e['push'](_0x4ac935);}else{const _0x14da5d=$dataArmors[_0x26b0c9];_0x14da5d&&_0x14da5d[_0x5187c9(0x352)]===_0x4a6baa+0x1&&_0x40c55e[_0x5187c9(0x2a9)](_0x14da5d);}}}return _0x40c55e;},Game_Actor['prototype'][_0x59ef57(0x169)]=function(_0x4b8b0a,_0xbd4039){const _0x88c8e2=_0x59ef57;for(const _0x4a48cc of _0x4b8b0a){if(!_0x4a48cc)continue;if(_0x4a48cc[_0x88c8e2(0x352)]===_0xbd4039)return _0x4b8b0a[_0x88c8e2(0x1eb)](_0x4b8b0a[_0x88c8e2(0x179)](_0x4a48cc),0x1),_0x4a48cc;}return null;},Game_Actor[_0x59ef57(0x263)]['equipSlots']=function(){const _0x777652=_0x59ef57,_0x63625d=VisuMZ[_0x777652(0x3a2)][_0x777652(0x287)](this[_0x777652(0x2c2)]||this['currentClass']()[_0x777652(0x204)]);if(_0x63625d[_0x777652(0x104)]>=0x2&&this[_0x777652(0x182)]())_0x63625d[0x1]=0x1;return _0x63625d;},Game_Actor[_0x59ef57(0x263)]['forceChangeEquipSlots']=function(_0x15f405){const _0x4ae987=_0x59ef57;_0x15f405[_0x4ae987(0x115)](0x0),_0x15f405[_0x4ae987(0x115)](-0x1),this[_0x4ae987(0x2c2)]=_0x15f405,this[_0x4ae987(0x3d1)](),this[_0x4ae987(0xfd)]();},Game_Actor[_0x59ef57(0x263)][_0x59ef57(0x220)]=function(){const _0x2bf9aa=_0x59ef57;this['_forcedSlots']=undefined,this[_0x2bf9aa(0x3d1)](),this[_0x2bf9aa(0xfd)]();},Game_Actor[_0x59ef57(0x263)]['updateChangedSlots']=function(){const _0x55a689=_0x59ef57;let _0x31647b=this[_0x55a689(0x204)]()[_0x55a689(0x104)];while(this[_0x55a689(0x112)]['length']>_0x31647b){const _0x550d21=this['_equips'][this[_0x55a689(0x112)][_0x55a689(0x104)]-0x1];_0x550d21&&_0x550d21['object']()&&$gameParty[_0x55a689(0x361)](_0x550d21['object'](),0x1),this[_0x55a689(0x112)][_0x55a689(0x3f8)]();}while(_0x31647b>this['_equips']['length']){this[_0x55a689(0x112)][_0x55a689(0x2a9)](new Game_Item());}},VisuMZ['ItemsEquipsCore'][_0x59ef57(0x3d9)]=Game_Actor[_0x59ef57(0x263)]['changeClass'],Game_Actor[_0x59ef57(0x263)][_0x59ef57(0x2aa)]=function(_0x47cba9,_0x45ec7c){const _0xc9f77=_0x59ef57;VisuMZ[_0xc9f77(0x3a2)][_0xc9f77(0x3d9)][_0xc9f77(0x36e)](this,_0x47cba9,_0x45ec7c),this['updateChangedSlots']();},Game_Actor[_0x59ef57(0x263)][_0x59ef57(0x440)]=function(){const _0x3248e9=_0x59ef57,_0x313620=this[_0x3248e9(0x204)]();for(let _0x3a109c=0x0;_0x3a109c<_0x313620[_0x3248e9(0x104)];_0x3a109c++){if(!this[_0x3248e9(0x112)][_0x3a109c])this[_0x3248e9(0x112)][_0x3a109c]=new Game_Item();}this['releaseUnequippableItems'](![]),this[_0x3248e9(0x3d1)]();},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0xcc)]=Game_Actor[_0x59ef57(0x263)][_0x59ef57(0x39b)],Game_Actor[_0x59ef57(0x263)]['changeEquip']=function(_0xf13643,_0x5a4a3b){const _0x372927=_0x59ef57;if(!this['_tempActor']){const _0x1faaf0=JsonEx[_0x372927(0x15c)](this);_0x1faaf0['_tempActor']=!![],this['changeEquipBase'](_0xf13643,_0x5a4a3b),this['equipAdjustHpMp'](_0x1faaf0);}else this[_0x372927(0x25e)](_0xf13643,_0x5a4a3b);},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x2b8)]=Game_Actor[_0x59ef57(0x263)][_0x59ef57(0x3f7)],Game_Actor[_0x59ef57(0x263)]['forceChangeEquip']=function(_0x2d288b,_0x5a347e){const _0x34ce43=_0x59ef57;!this[_0x34ce43(0x112)][_0x2d288b]&&(this[_0x34ce43(0x112)][_0x2d288b]=new Game_Item());if(!this[_0x34ce43(0x34f)]){const _0x940439=JsonEx[_0x34ce43(0x15c)](this);_0x940439[_0x34ce43(0x34f)]=!![],VisuMZ['ItemsEquipsCore'][_0x34ce43(0x2b8)][_0x34ce43(0x36e)](this,_0x2d288b,_0x5a347e),this[_0x34ce43(0x1c2)](_0x940439);}else VisuMZ[_0x34ce43(0x3a2)][_0x34ce43(0x2b8)][_0x34ce43(0x36e)](this,_0x2d288b,_0x5a347e);},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x315)]=Game_Actor['prototype'][_0x59ef57(0x1f5)],Game_Actor['prototype'][_0x59ef57(0x1f5)]=function(_0x18d15c){const _0x282326=_0x59ef57;if(!this[_0x282326(0x34f)]){const _0x2755c0=JsonEx[_0x282326(0x15c)](this);_0x2755c0[_0x282326(0x34f)]=!![],VisuMZ[_0x282326(0x3a2)][_0x282326(0x315)][_0x282326(0x36e)](this,_0x18d15c),this[_0x282326(0x1c2)](_0x2755c0);}else VisuMZ[_0x282326(0x3a2)][_0x282326(0x315)][_0x282326(0x36e)](this,_0x18d15c);},Game_Actor[_0x59ef57(0x263)][_0x59ef57(0x2a0)]=function(_0xdc005f){const _0x2dddef=_0x59ef57;if(this[_0x2dddef(0x43e)])return;let _0x1b08e5=0x0;for(;;){_0x1b08e5++;if(_0x1b08e5>0x3)break;const _0x34473c=this[_0x2dddef(0x204)](),_0x1a8942=this[_0x2dddef(0x19a)](),_0x31fb30=_0x1a8942[_0x2dddef(0x104)];let _0x1d86a2=![];for(let _0x4b7630=0x0;_0x4b7630<_0x31fb30;_0x4b7630++){const _0x41028b=_0x1a8942[_0x4b7630];if(!_0x41028b)continue;const _0x861887=DataManager[_0x2dddef(0x2c3)](_0x41028b);if(!this['canEquip'](_0x41028b)||!_0x861887[_0x2dddef(0x291)](_0x34473c[_0x4b7630])){!_0xdc005f&&this[_0x2dddef(0x134)](null,_0x41028b);if(!this[_0x2dddef(0x34f)]){const _0x484cab=JsonEx[_0x2dddef(0x15c)](this);_0x484cab[_0x2dddef(0x34f)]=!![],this[_0x2dddef(0x112)][_0x4b7630][_0x2dddef(0x21b)](null),this[_0x2dddef(0x43e)]=!![],this['equipAdjustHpMp'](_0x484cab),this[_0x2dddef(0x43e)]=undefined;}else{if(this['_equips'][_0x4b7630])this[_0x2dddef(0x112)][_0x4b7630][_0x2dddef(0x21b)](null);else continue;}_0x1d86a2=!![];}}if(!_0x1d86a2)break;}},Game_Actor['prototype'][_0x59ef57(0x1c2)]=function(_0x5f4f36){const _0x55d3b4=_0x59ef57;if(this[_0x55d3b4(0x34f)])return;if(!VisuMZ['ItemsEquipsCore'][_0x55d3b4(0x16f)][_0x55d3b4(0x4b0)][_0x55d3b4(0x175)])return;const _0x3999b4=Math[_0x55d3b4(0x2ce)](_0x5f4f36['hpRate']()*this[_0x55d3b4(0x4fc)]),_0x1e1f6d=Math[_0x55d3b4(0x2ce)](_0x5f4f36[_0x55d3b4(0x4f7)]()*this[_0x55d3b4(0x3fd)]);if(this['hp']>0x0)this[_0x55d3b4(0x386)](_0x3999b4);if(this['mp']>0x0)this[_0x55d3b4(0xc0)](_0x1e1f6d);},Game_Actor[_0x59ef57(0x263)][_0x59ef57(0x25e)]=function(_0x20c76e,_0x3ee1ee){const _0x256715=_0x59ef57;if(!this['tradeItemWithParty'](_0x3ee1ee,this['equips']()[_0x20c76e]))return;if(_0x3ee1ee){const _0x126652=DataManager['getEtypeIDs'](_0x3ee1ee);if(!_0x126652[_0x256715(0x291)](this[_0x256715(0x204)]()[_0x20c76e]))return;}!this[_0x256715(0x112)][_0x20c76e]&&(this[_0x256715(0x112)][_0x20c76e]=new Game_Item());this[_0x256715(0x112)][_0x20c76e]['setObject'](_0x3ee1ee);if(VisuMZ[_0x256715(0x3a2)][_0x256715(0x3c1)](_0x3ee1ee)){const _0x4c2bc7=VisuMZ[_0x256715(0x3a2)][_0x256715(0x16f)][_0x256715(0x4b0)]['CursedTextPopup']||'',_0x589f64=this[_0x256715(0x26b)](),_0x2d293c='\x5cI[%1]'[_0x256715(0x46e)](_0x3ee1ee[_0x256715(0x33c)]),_0x2efdc9=_0x3ee1ee[_0x256715(0x26b)]||'';let _0x7fb3b8=_0x4c2bc7['format'](_0x589f64,_0x2d293c,_0x2efdc9);if(VisuMZ[_0x256715(0x294)][_0x256715(0x1cf)]>=1.79&&_0x7fb3b8['length']>0x0)$textPopup(_0x7fb3b8);}this[_0x256715(0x3d1)]();},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x3c1)]=function(_0x4cfdeb){const _0x1157d5=_0x59ef57;if(!_0x4cfdeb)return![];if(!Imported['VisuMZ_0_CoreEngine'])return![];if(VisuMZ['CoreEngine'][_0x1157d5(0x1cf)]<1.79)return![];return DataManager[_0x1157d5(0xe6)](_0x4cfdeb);},Game_Actor['prototype']['bestEquipItem']=function(_0x277aab){const _0x3e4775=_0x59ef57,_0x4ffa32=this[_0x3e4775(0x204)]()[_0x277aab],_0x8a333c=$gameParty[_0x3e4775(0x4ee)]()[_0x3e4775(0x2df)](_0xc887fc=>DataManager[_0x3e4775(0x2c3)](_0xc887fc)[_0x3e4775(0x291)](_0x4ffa32)&&this[_0x3e4775(0x191)](_0xc887fc)&&!DataManager[_0x3e4775(0xe6)](_0xc887fc));let _0x3a012d=null,_0x549a1a=-0x3e8;for(let _0x189906=0x0;_0x189906<_0x8a333c[_0x3e4775(0x104)];_0x189906++){const _0x526111=_0x8a333c[_0x189906];if(!this[_0x3e4775(0x4e6)](_0x526111))continue;const _0x520406=this[_0x3e4775(0xb8)](_0x526111);_0x520406>_0x549a1a&&(_0x549a1a=_0x520406,_0x3a012d=_0x526111);}return _0x3a012d;},Game_Actor[_0x59ef57(0x263)][_0x59ef57(0x4e6)]=function(_0x4dffd3){const _0x1605eb=_0x59ef57;if(!_0x4dffd3)return![];const _0x1148b4=_0x4dffd3?_0x4dffd3[_0x1605eb(0x278)]:'';if(_0x1148b4[_0x1605eb(0xf0)](/<EQUIP COPY LIMIT:[ ](\d+)>/i)){const _0x197b7f=Number(RegExp['$1'])||0x1,_0x45be1a=this['equips']()[_0x1605eb(0x2df)](_0x2c9031=>_0x2c9031===_0x4dffd3);if(_0x45be1a[_0x1605eb(0x104)]>=_0x197b7f)return![];}if(DataManager[_0x1605eb(0x189)](_0x4dffd3)){if(_0x1148b4[_0x1605eb(0xf0)](/<EQUIP WEAPON TYPE LIMIT:[ ](\d+)>/i)){const _0x13b553=Number(RegExp['$1'])||0x1,_0x228a46=this[_0x1605eb(0x1d0)]()['remove'](null)[_0x1605eb(0x2df)](_0x5d8656=>_0x5d8656[_0x1605eb(0x45f)]===_0x4dffd3[_0x1605eb(0x45f)]);if(_0x228a46[_0x1605eb(0x104)]>=_0x13b553)return![];}{const _0x5bc222=this['weapons']()[_0x1605eb(0x115)](null)['filter'](_0x5f3295=>_0x5f3295[_0x1605eb(0x45f)]===_0x4dffd3[_0x1605eb(0x45f)]);if(_0x5bc222['length']>0x0){let _0x57a300=0x270f;for(const _0x58b34d of _0x5bc222){_0x58b34d['note'][_0x1605eb(0xf0)](/<EQUIP WEAPON TYPE LIMIT:[ ](\d+)>/i)&&(_0x57a300=Math[_0x1605eb(0x497)](_0x57a300,Number(RegExp['$1'])));}if(_0x5bc222['length']>=_0x57a300)return![];}}}if(DataManager[_0x1605eb(0x3d8)](_0x4dffd3)){if(_0x1148b4['match'](/<EQUIP ARMOR TYPE LIMIT:[ ](\d+)>/i)){const _0x345ef6=Number(RegExp['$1'])||0x1,_0x477e53=this[_0x1605eb(0x4c7)]()[_0x1605eb(0x115)](null)[_0x1605eb(0x2df)](_0x2c1a0d=>_0x2c1a0d[_0x1605eb(0x22b)]===_0x4dffd3['atypeId']);if(_0x477e53[_0x1605eb(0x104)]>=_0x345ef6)return![];}{const _0x24e9cb=this[_0x1605eb(0x4c7)]()[_0x1605eb(0x115)](null)['filter'](_0x277d2d=>_0x277d2d[_0x1605eb(0x22b)]===_0x4dffd3[_0x1605eb(0x22b)]);if(_0x24e9cb[_0x1605eb(0x104)]>0x0){let _0x4d7022=0x270f;for(const _0x4dc1ec of _0x24e9cb){_0x4dc1ec['note'][_0x1605eb(0xf0)](/<EQUIP ARMOR TYPE LIMIT:[ ](\d+)>/i)&&(_0x4d7022=Math[_0x1605eb(0x497)](_0x4d7022,Number(RegExp['$1'])));}if(_0x24e9cb['length']>=_0x4d7022)return![];}}}return!![];},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x2b2)]=Game_Party[_0x59ef57(0x263)][_0x59ef57(0x40e)],Game_Party['prototype'][_0x59ef57(0x40e)]=function(){const _0x402ca9=_0x59ef57;VisuMZ[_0x402ca9(0x3a2)][_0x402ca9(0x2b2)][_0x402ca9(0x36e)](this),this['initNewItemsList'](),this[_0x402ca9(0x166)]();},Game_Party['prototype']['initNewItemsList']=function(){this['_newItemsList']=[];},Game_Party['prototype'][_0x59ef57(0xc5)]=function(_0x4ef45c){const _0x117e69=_0x59ef57;if(!$gameTemp['newLabelEnabled']())return![];if(this[_0x117e69(0x476)]===undefined)this[_0x117e69(0x409)]();let _0x3e1996='';if(DataManager['isItem'](_0x4ef45c))_0x3e1996=_0x117e69(0x246)[_0x117e69(0x46e)](_0x4ef45c['id']);else{if(DataManager['isWeapon'](_0x4ef45c))_0x3e1996=_0x117e69(0x1b4)[_0x117e69(0x46e)](_0x4ef45c['id']);else{if(DataManager['isArmor'](_0x4ef45c))_0x3e1996=_0x117e69(0x4e4)[_0x117e69(0x46e)](_0x4ef45c['id']);else return;}}return this[_0x117e69(0x476)][_0x117e69(0x291)](_0x3e1996);},Game_Party[_0x59ef57(0x263)][_0x59ef57(0x1a0)]=function(_0x25873c){const _0x53df3a=_0x59ef57;if(!$gameTemp['newLabelEnabled']())return;if(this[_0x53df3a(0x476)]===undefined)this[_0x53df3a(0x409)]();let _0xde3eba='';if(DataManager['isItem'](_0x25873c))_0xde3eba='item-%1'['format'](_0x25873c['id']);else{if(DataManager[_0x53df3a(0x189)](_0x25873c))_0xde3eba=_0x53df3a(0x1b4)[_0x53df3a(0x46e)](_0x25873c['id']);else{if(DataManager[_0x53df3a(0x3d8)](_0x25873c))_0xde3eba=_0x53df3a(0x4e4)['format'](_0x25873c['id']);else return;}}if(!this[_0x53df3a(0x476)][_0x53df3a(0x291)](_0xde3eba))this['_newItemsList'][_0x53df3a(0x2a9)](_0xde3eba);},Game_Party[_0x59ef57(0x263)][_0x59ef57(0x4c5)]=function(_0x59c85f){const _0x35bba8=_0x59ef57;if(!$gameTemp[_0x35bba8(0x33f)]())return;if(this[_0x35bba8(0x476)]===undefined)this['initNewItemsList']();let _0x55fd8e='';if(DataManager[_0x35bba8(0x327)](_0x59c85f))_0x55fd8e=_0x35bba8(0x246)[_0x35bba8(0x46e)](_0x59c85f['id']);else{if(DataManager['isWeapon'](_0x59c85f))_0x55fd8e=_0x35bba8(0x1b4)[_0x35bba8(0x46e)](_0x59c85f['id']);else{if(DataManager[_0x35bba8(0x3d8)](_0x59c85f))_0x55fd8e=_0x35bba8(0x4e4)[_0x35bba8(0x46e)](_0x59c85f['id']);else return;}}this[_0x35bba8(0x476)]['includes'](_0x55fd8e)&&this[_0x35bba8(0x476)]['splice'](this[_0x35bba8(0x476)][_0x35bba8(0x179)](_0x55fd8e),0x1);},VisuMZ['ItemsEquipsCore'][_0x59ef57(0x3fb)]=Game_Party[_0x59ef57(0x263)][_0x59ef57(0x36a)],Game_Party[_0x59ef57(0x263)][_0x59ef57(0x36a)]=function(_0x52a94a){const _0x5bce98=_0x59ef57;if(DataManager[_0x5bce98(0x16e)](_0x52a94a))_0x52a94a=DataManager[_0x5bce98(0x400)](_0x52a94a);return VisuMZ[_0x5bce98(0x3a2)][_0x5bce98(0x3fb)][_0x5bce98(0x36e)](this,_0x52a94a);},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x392)]=Game_Party[_0x59ef57(0x263)]['gainItem'],Game_Party[_0x59ef57(0x263)][_0x59ef57(0x361)]=function(_0x38fc29,_0x706d2a,_0x3d9e36){const _0x2c4eac=_0x59ef57;if(DataManager[_0x2c4eac(0x16e)](_0x38fc29))_0x38fc29=null;const _0x3ca5f0=this[_0x2c4eac(0x36a)](_0x38fc29);VisuMZ['ItemsEquipsCore'][_0x2c4eac(0x392)][_0x2c4eac(0x36e)](this,_0x38fc29,_0x706d2a,_0x3d9e36);if(this[_0x2c4eac(0x36a)](_0x38fc29)>_0x3ca5f0)this['setNewItem'](_0x38fc29);},Game_Party['prototype']['maxItems']=function(_0x4b5326){const _0x136699=_0x59ef57;if(DataManager['isProxyItem'](_0x4b5326))_0x4b5326=DataManager[_0x136699(0x400)](_0x4b5326);return DataManager[_0x136699(0x3b7)](_0x4b5326);},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x32a)]=Game_Party[_0x59ef57(0x263)][_0x59ef57(0xec)],Game_Party['prototype'][_0x59ef57(0xec)]=function(_0x377e45){const _0x1ec2c0=_0x59ef57;if(_0x377e45){const _0x20ddfd=_0x377e45[_0x1ec2c0(0x278)]||'';if(_0x20ddfd[_0x1ec2c0(0xf0)](/<(?:CONSERVE|PRESERVE):[ ](\d+)([%％])>/i)){const _0x96f4df=Number(RegExp['$1'])*0.01;if(Math[_0x1ec2c0(0x3b8)]()<_0x96f4df)return;}}VisuMZ[_0x1ec2c0(0x3a2)][_0x1ec2c0(0x32a)][_0x1ec2c0(0x36e)](this,_0x377e45);},Game_Party['prototype'][_0x59ef57(0x166)]=function(){const _0x5869be=_0x59ef57;this[_0x5869be(0x167)]={'buy':{'gold':0x0,'items':{}},'sell':{'gold':0x0,'items':{}}};},Game_Party[_0x59ef57(0x263)][_0x59ef57(0x37a)]=function(){const _0x11c4e6=_0x59ef57;return this[_0x11c4e6(0x167)]===undefined&&this[_0x11c4e6(0x166)](),this[_0x11c4e6(0x167)];},Game_Party[_0x59ef57(0x263)][_0x59ef57(0x1c5)]=function(_0x10f00e,_0x10915a){const _0x40e91f=_0x59ef57;if(!_0x10915a)return 0x0;this[_0x40e91f(0x167)]===undefined&&this[_0x40e91f(0x166)]();const _0x1abf97=this[_0x40e91f(0x37a)]();if(!_0x1abf97[_0x10f00e])return 0x0;if(_0x10915a===_0x40e91f(0x2e0))return _0x1abf97[_0x10f00e][_0x40e91f(0x2e0)]=_0x1abf97[_0x10f00e][_0x40e91f(0x2e0)]||0x0,_0x1abf97[_0x10f00e][_0x40e91f(0x2e0)];else{if(DataManager[_0x40e91f(0x327)](_0x10915a))key=_0x40e91f(0x246)[_0x40e91f(0x46e)](_0x10915a['id']);else{if(DataManager[_0x40e91f(0x189)](_0x10915a))key=_0x40e91f(0x1b4)[_0x40e91f(0x46e)](_0x10915a['id']);else{if(DataManager[_0x40e91f(0x3d8)](_0x10915a))key=_0x40e91f(0x4e4)['format'](_0x10915a['id']);else return 0x0;}}}return _0x1abf97[_0x10f00e][_0x40e91f(0x4b6)][key]=_0x1abf97[_0x10f00e][_0x40e91f(0x4b6)][key]||0x0,_0x1abf97[_0x10f00e]['items'][key];},Game_Party[_0x59ef57(0x263)]['getShopTrackingItemBuy']=function(_0x389ffd){const _0x10463b=_0x59ef57;return this[_0x10463b(0x1c5)](_0x10463b(0x489),_0x389ffd);},Game_Party[_0x59ef57(0x263)][_0x59ef57(0x119)]=function(_0x5649ac){const _0x1b25ef=_0x59ef57;return this[_0x1b25ef(0x1c5)](_0x1b25ef(0x46b),_0x5649ac);},Game_Party[_0x59ef57(0x263)][_0x59ef57(0x151)]=function(){const _0x362f04=_0x59ef57;return this[_0x362f04(0x1c5)]('buy',_0x362f04(0x2e0));},Game_Party['prototype'][_0x59ef57(0x2de)]=function(){const _0x11dcae=_0x59ef57;return this[_0x11dcae(0x1c5)](_0x11dcae(0x46b),'gold');},Game_Party[_0x59ef57(0x263)]['addShopTrackingItem']=function(_0x206723,_0x3462f0,_0x141c7e){const _0x23f34b=_0x59ef57;if(!_0x3462f0)return;if(_0x141c7e<=0x0)return;this[_0x23f34b(0x167)]===undefined&&this[_0x23f34b(0x166)]();const _0x2f824c=this[_0x23f34b(0x37a)]();if(!_0x2f824c[_0x206723])return;if(_0x3462f0===_0x23f34b(0x2e0)){_0x2f824c[_0x206723][_0x23f34b(0x2e0)]=_0x2f824c[_0x206723]['gold']||0x0,_0x2f824c[_0x206723]['gold']+=_0x141c7e;return;}else{if(DataManager[_0x23f34b(0x327)](_0x3462f0))key=_0x23f34b(0x246)[_0x23f34b(0x46e)](_0x3462f0['id']);else{if(DataManager[_0x23f34b(0x189)](_0x3462f0))key='weapon-%1'['format'](_0x3462f0['id']);else{if(DataManager['isArmor'](_0x3462f0))key=_0x23f34b(0x4e4)[_0x23f34b(0x46e)](_0x3462f0['id']);else return;}}}_0x2f824c[_0x206723]['items'][key]=_0x2f824c[_0x206723][_0x23f34b(0x4b6)][key]||0x0,_0x2f824c[_0x206723][_0x23f34b(0x4b6)][key]+=_0x141c7e;},Game_Party[_0x59ef57(0x263)]['addShopTrackingItemBuy']=function(_0x33a74b,_0x40d3bd){const _0x5933cf=_0x59ef57;this[_0x5933cf(0x3cc)](_0x5933cf(0x489),_0x33a74b,_0x40d3bd);},Game_Party[_0x59ef57(0x263)][_0x59ef57(0x4d0)]=function(_0x410e05,_0x4ad2ac){const _0x319fa7=_0x59ef57;this[_0x319fa7(0x3cc)](_0x319fa7(0x46b),_0x410e05,_0x4ad2ac);},Game_Party['prototype'][_0x59ef57(0x45c)]=function(_0x405e61){const _0x15ae69=_0x59ef57;this[_0x15ae69(0x3cc)](_0x15ae69(0x489),_0x15ae69(0x2e0),_0x405e61);},Game_Party['prototype'][_0x59ef57(0x10b)]=function(_0x1f0519){const _0x5d7c3d=_0x59ef57;this[_0x5d7c3d(0x3cc)](_0x5d7c3d(0x46b),_0x5d7c3d(0x2e0),_0x1f0519);},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x24a)]=Scene_ItemBase['prototype'][_0x59ef57(0x148)],Scene_ItemBase['prototype'][_0x59ef57(0x148)]=function(){const _0xb7356e=_0x59ef57;VisuMZ[_0xb7356e(0x3a2)][_0xb7356e(0x24a)][_0xb7356e(0x36e)](this),this[_0xb7356e(0x442)][_0xb7356e(0x453)]();},Scene_Item[_0x59ef57(0x263)][_0x59ef57(0x4d2)]=function(){const _0x236e4d=_0x59ef57;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x236e4d(0x42e)]!==undefined)return ConfigManager[_0x236e4d(0x42e)];else return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x236e4d(0x43c)]()['match'](/LOWER/i):Scene_ItemBase[_0x236e4d(0x263)]['isBottomHelpMode']['call'](this);},Scene_Item['prototype'][_0x59ef57(0x346)]=function(){const _0x7c3f71=_0x59ef57;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x7c3f71(0x33d)]!==undefined)return ConfigManager['uiInputPosition'];else return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x7c3f71(0x43c)]()['match'](/RIGHT/i):Scene_ItemBase['prototype'][_0x7c3f71(0x346)][_0x7c3f71(0x36e)](this);},Scene_Item[_0x59ef57(0x263)][_0x59ef57(0x43c)]=function(){const _0x3effaa=_0x59ef57;return VisuMZ[_0x3effaa(0x3a2)][_0x3effaa(0x16f)][_0x3effaa(0xb6)]['LayoutStyle'];},Scene_Item[_0x59ef57(0x263)][_0x59ef57(0x1ae)]=function(){const _0x2a3086=_0x59ef57;return this[_0x2a3086(0x447)]&&this['_categoryWindow'][_0x2a3086(0x1ae)]();},Scene_Item[_0x59ef57(0x263)][_0x59ef57(0x138)]=function(){const _0x2f0dd1=_0x59ef57;return VisuMZ['ItemsEquipsCore'][_0x2f0dd1(0x16f)]['ItemScene'][_0x2f0dd1(0x499)];},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x19e)]=Scene_Item['prototype'][_0x59ef57(0x132)],Scene_Item[_0x59ef57(0x263)]['create']=function(){const _0x5a198c=_0x59ef57;VisuMZ[_0x5a198c(0x3a2)]['Scene_Item_create']['call'](this),this[_0x5a198c(0x1ae)]()&&this['onCategoryOk']();},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x10c)]=Scene_Item[_0x59ef57(0x263)][_0x59ef57(0x4b9)],Scene_Item[_0x59ef57(0x263)][_0x59ef57(0x4b9)]=function(){const _0x23ad87=_0x59ef57;return this['isUseItemsEquipsCoreUpdatedLayout']()?this['helpWindowRectItemsEquipsCore']():VisuMZ[_0x23ad87(0x3a2)][_0x23ad87(0x10c)][_0x23ad87(0x36e)](this);},Scene_Item[_0x59ef57(0x263)][_0x59ef57(0x215)]=function(){const _0x406397=_0x59ef57,_0x39d273=0x0,_0x5296b4=this[_0x406397(0x3b9)](),_0x2d6275=Graphics[_0x406397(0x4c6)],_0x23c542=this[_0x406397(0x23b)]();return new Rectangle(_0x39d273,_0x5296b4,_0x2d6275,_0x23c542);},VisuMZ[_0x59ef57(0x3a2)]['Scene_Item_createCategoryWindow']=Scene_Item['prototype']['createCategoryWindow'],Scene_Item[_0x59ef57(0x263)][_0x59ef57(0x3af)]=function(){const _0x526e30=_0x59ef57;VisuMZ[_0x526e30(0x3a2)][_0x526e30(0x202)][_0x526e30(0x36e)](this),this[_0x526e30(0x1ae)]()&&this[_0x526e30(0x3d7)]();},Scene_Item[_0x59ef57(0x263)]['postCreateCategoryWindowItemsEquipsCore']=function(){const _0xcc8771=_0x59ef57;delete this['_categoryWindow']['_handlers']['ok'],delete this[_0xcc8771(0x447)][_0xcc8771(0x342)]['cancel'];},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x394)]=Scene_Item[_0x59ef57(0x263)][_0x59ef57(0x242)],Scene_Item[_0x59ef57(0x263)][_0x59ef57(0x242)]=function(){const _0x4ce4cd=_0x59ef57;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x4ce4cd(0x121)]():VisuMZ[_0x4ce4cd(0x3a2)][_0x4ce4cd(0x394)][_0x4ce4cd(0x36e)](this);},Scene_Item[_0x59ef57(0x263)][_0x59ef57(0x121)]=function(){const _0x3a7af1=_0x59ef57,_0x2e108f=0x0,_0x25b6d2=this['mainAreaTop'](),_0x260931=Graphics[_0x3a7af1(0x4c6)],_0x14728b=this[_0x3a7af1(0x124)](0x1,!![]);return new Rectangle(_0x2e108f,_0x25b6d2,_0x260931,_0x14728b);},VisuMZ[_0x59ef57(0x3a2)]['Scene_Item_createItemWindow']=Scene_Item[_0x59ef57(0x263)][_0x59ef57(0x1fb)],Scene_Item['prototype'][_0x59ef57(0x1fb)]=function(){const _0x35896f=_0x59ef57;VisuMZ[_0x35896f(0x3a2)][_0x35896f(0x118)]['call'](this),this[_0x35896f(0x1ae)]()&&this[_0x35896f(0x19f)](),this[_0x35896f(0x4cb)]()&&this[_0x35896f(0x3ca)]();},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x3d5)]=Scene_Item[_0x59ef57(0x263)][_0x59ef57(0x362)],Scene_Item[_0x59ef57(0x263)][_0x59ef57(0x362)]=function(){const _0x198aaf=_0x59ef57;if(this[_0x198aaf(0x138)]())return this['itemWindowRectItemsEquipsCore']();else{const _0x15c0f9=VisuMZ['ItemsEquipsCore'][_0x198aaf(0x3d5)][_0x198aaf(0x36e)](this);return this[_0x198aaf(0x4cb)]()&&this[_0x198aaf(0x3a7)]()&&(_0x15c0f9[_0x198aaf(0x1e6)]-=this[_0x198aaf(0x37c)]()),_0x15c0f9;}},Scene_Item[_0x59ef57(0x263)][_0x59ef57(0x414)]=function(){const _0x222152=_0x59ef57,_0x1d09ec=this['isRightInputMode']()?this[_0x222152(0x37c)]():0x0,_0x39984c=this[_0x222152(0x447)]['y']+this[_0x222152(0x447)][_0x222152(0x388)],_0x319234=Graphics[_0x222152(0x4c6)]-this[_0x222152(0x37c)](),_0x2db201=this[_0x222152(0x37e)]()-_0x39984c;return new Rectangle(_0x1d09ec,_0x39984c,_0x319234,_0x2db201);},Scene_Item[_0x59ef57(0x263)][_0x59ef57(0x19f)]=function(){const _0x252e07=_0x59ef57;this[_0x252e07(0x442)]['setHandler'](_0x252e07(0x49e),this['popScene'][_0x252e07(0x4eb)](this));},Scene_Item[_0x59ef57(0x263)][_0x59ef57(0x4cb)]=function(){const _0x1aa693=_0x59ef57;return this[_0x1aa693(0x138)]()?!![]:VisuMZ[_0x1aa693(0x3a2)][_0x1aa693(0x16f)][_0x1aa693(0xb6)]['ShowShopStatus'];},Scene_Item['prototype']['adjustItemWidthByStatus']=function(){const _0x528ff0=_0x59ef57;return VisuMZ[_0x528ff0(0x3a2)][_0x528ff0(0x16f)][_0x528ff0(0xb6)][_0x528ff0(0x350)];},Scene_Item['prototype']['createStatusWindow']=function(){const _0x11d722=_0x59ef57,_0x4d4f73=this[_0x11d722(0x172)]();this['_statusWindow']=new Window_ShopStatus(_0x4d4f73),this[_0x11d722(0x2ca)](this['_statusWindow']),this[_0x11d722(0x442)]['setStatusWindow'](this[_0x11d722(0xe7)]);const _0x321f6c=VisuMZ[_0x11d722(0x3a2)]['Settings']['ItemScene'][_0x11d722(0xc9)];this[_0x11d722(0xe7)]['setBackgroundType'](_0x321f6c||0x0);},Scene_Item[_0x59ef57(0x263)]['statusWindowRect']=function(){const _0x164f39=_0x59ef57;return this[_0x164f39(0x138)]()?this['statusWindowRectItemsEquipsCore']():VisuMZ[_0x164f39(0x3a2)][_0x164f39(0x16f)]['ItemScene'][_0x164f39(0x1a5)]['call'](this);},Scene_Item[_0x59ef57(0x263)][_0x59ef57(0x456)]=function(){const _0x5cdf40=_0x59ef57,_0x2a046f=this[_0x5cdf40(0x37c)](),_0x3a7539=this['_itemWindow'][_0x5cdf40(0x388)],_0x3aeb4c=this[_0x5cdf40(0x346)]()?0x0:Graphics['boxWidth']-this[_0x5cdf40(0x37c)](),_0x1f4926=this[_0x5cdf40(0x442)]['y'];return new Rectangle(_0x3aeb4c,_0x1f4926,_0x2a046f,_0x3a7539);},Scene_Item[_0x59ef57(0x263)][_0x59ef57(0x37c)]=function(){const _0xaae958=_0x59ef57;return Scene_Shop[_0xaae958(0x263)][_0xaae958(0x37c)]();},Scene_Item[_0x59ef57(0x263)][_0x59ef57(0x3f5)]=function(){const _0x1f08fa=_0x59ef57;if(!this[_0x1f08fa(0x43c)]())return![];if(!this['isUseModernControls']())return![];if(!this[_0x1f08fa(0x442)])return![];if(!this[_0x1f08fa(0x442)][_0x1f08fa(0x158)])return![];return this[_0x1f08fa(0x43c)]()&&this[_0x1f08fa(0x1ae)]();},Scene_Item[_0x59ef57(0x263)][_0x59ef57(0x101)]=function(){const _0x5e21ad=_0x59ef57;if(this[_0x5e21ad(0x3f5)]())return this[_0x5e21ad(0x442)][_0x5e21ad(0x487)]()===0x1?TextManager[_0x5e21ad(0x10f)](_0x5e21ad(0xc7),_0x5e21ad(0x34c)):TextManager[_0x5e21ad(0x10f)]('pageup','pagedown');return Scene_ItemBase[_0x5e21ad(0x263)]['buttonAssistKey1']['call'](this);},Scene_Item[_0x59ef57(0x263)]['buttonAssistText1']=function(){const _0x59f292=_0x59ef57;if(this[_0x59f292(0x3f5)]())return VisuMZ[_0x59f292(0x3a2)][_0x59f292(0x16f)][_0x59f292(0xb6)][_0x59f292(0x4f1)];return Scene_ItemBase['prototype'][_0x59f292(0x40c)][_0x59f292(0x36e)](this);},Scene_Equip[_0x59ef57(0x263)][_0x59ef57(0x16c)]=function(){const _0x36ae40=_0x59ef57;Scene_ItemBase['prototype'][_0x36ae40(0x16c)]['call'](this),this['refreshActor']();},Scene_Equip['prototype']['isBottomHelpMode']=function(){const _0x10ce08=_0x59ef57;if(ConfigManager[_0x10ce08(0x434)]&&ConfigManager[_0x10ce08(0x42e)]!==undefined)return ConfigManager[_0x10ce08(0x42e)];else{if(this['isUseItemsEquipsCoreUpdatedLayout']())return this[_0x10ce08(0x43c)]()[_0x10ce08(0xf0)](/LOWER/i);else Scene_MenuBase[_0x10ce08(0x263)][_0x10ce08(0x346)][_0x10ce08(0x36e)](this);}},Scene_Equip[_0x59ef57(0x263)][_0x59ef57(0x346)]=function(){const _0x5ccb10=_0x59ef57;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x5ccb10(0x33d)]!==undefined)return ConfigManager[_0x5ccb10(0x33d)];else{if(this[_0x5ccb10(0x138)]())return this['updatedLayoutStyle']()[_0x5ccb10(0xf0)](/RIGHT/i);else Scene_MenuBase[_0x5ccb10(0x263)][_0x5ccb10(0x346)][_0x5ccb10(0x36e)](this);}},Scene_Equip[_0x59ef57(0x263)][_0x59ef57(0x43c)]=function(){const _0x27341c=_0x59ef57;return VisuMZ[_0x27341c(0x3a2)]['Settings']['EquipScene'][_0x27341c(0x4bb)];},Scene_Equip['prototype'][_0x59ef57(0x1ae)]=function(){const _0x211461=_0x59ef57;return this[_0x211461(0x100)]&&this[_0x211461(0x100)]['isUseModernControls']();},Scene_Equip[_0x59ef57(0x263)][_0x59ef57(0x138)]=function(){const _0xe93112=_0x59ef57;return VisuMZ[_0xe93112(0x3a2)][_0xe93112(0x16f)][_0xe93112(0x4b0)]['EnableLayout'];},VisuMZ['ItemsEquipsCore'][_0x59ef57(0x299)]=Scene_Equip['prototype'][_0x59ef57(0x132)],Scene_Equip[_0x59ef57(0x263)]['create']=function(){const _0x462e9=_0x59ef57;VisuMZ[_0x462e9(0x3a2)][_0x462e9(0x299)][_0x462e9(0x36e)](this),this[_0x462e9(0x1ae)]()&&this[_0x462e9(0x458)]();},VisuMZ['ItemsEquipsCore'][_0x59ef57(0x4ab)]=Scene_Equip[_0x59ef57(0x263)]['helpWindowRect'],Scene_Equip[_0x59ef57(0x263)][_0x59ef57(0x4b9)]=function(){const _0x2aec5c=_0x59ef57;return this[_0x2aec5c(0x138)]()?this['helpWindowRectItemsEquipsCore']():VisuMZ[_0x2aec5c(0x3a2)][_0x2aec5c(0x4ab)][_0x2aec5c(0x36e)](this);},Scene_Equip[_0x59ef57(0x263)]['helpWindowRectItemsEquipsCore']=function(){const _0x34e135=_0x59ef57,_0x371edf=0x0,_0x5eb27f=this['helpAreaTop'](),_0x2dc115=Graphics[_0x34e135(0x4c6)],_0x8bbf1f=this[_0x34e135(0x23b)]();return new Rectangle(_0x371edf,_0x5eb27f,_0x2dc115,_0x8bbf1f);},VisuMZ[_0x59ef57(0x3a2)]['Scene_Equip_statusWindowRect']=Scene_Equip[_0x59ef57(0x263)]['statusWindowRect'],Scene_Equip['prototype'][_0x59ef57(0x172)]=function(){const _0x5e39bd=_0x59ef57;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x5e39bd(0x456)]():VisuMZ[_0x5e39bd(0x3a2)][_0x5e39bd(0x20a)]['call'](this);},Scene_Equip[_0x59ef57(0x263)][_0x59ef57(0x456)]=function(){const _0x55d9a4=_0x59ef57,_0x551ee7=this[_0x55d9a4(0x346)]()?0x0:Graphics['boxWidth']-this[_0x55d9a4(0x37c)](),_0x8ec0a6=this[_0x55d9a4(0x475)](),_0x1eecd9=this['statusWidth'](),_0x5cd91d=this[_0x55d9a4(0x314)]();return new Rectangle(_0x551ee7,_0x8ec0a6,_0x1eecd9,_0x5cd91d);},VisuMZ[_0x59ef57(0x3a2)]['Scene_Equip_createCommandWindow']=Scene_Equip[_0x59ef57(0x263)][_0x59ef57(0x2ec)],Scene_Equip[_0x59ef57(0x263)][_0x59ef57(0x2ec)]=function(){const _0x31114b=_0x59ef57;VisuMZ[_0x31114b(0x3a2)][_0x31114b(0x4cd)]['call'](this);if(this[_0x31114b(0xb2)])this[_0x31114b(0x100)][_0x31114b(0x247)](this[_0x31114b(0xb2)]);},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x4d6)]=Scene_Equip[_0x59ef57(0x263)]['commandWindowRect'],Scene_Equip['prototype']['commandWindowRect']=function(){const _0x48476d=_0x59ef57;return this[_0x48476d(0x138)]()?this[_0x48476d(0x272)]():VisuMZ['ItemsEquipsCore']['Scene_Equip_commandWindowRect'][_0x48476d(0x36e)](this);},Scene_Equip[_0x59ef57(0x263)][_0x59ef57(0x203)]=function(){const _0x1ce743=_0x59ef57,_0x1e418e=VisuMZ['ItemsEquipsCore']['Settings']['EquipScene'];return _0x1e418e['CommandAddOptimize']||_0x1e418e[_0x1ce743(0x1f1)];},Scene_Equip[_0x59ef57(0x263)][_0x59ef57(0x272)]=function(){const _0xb6bb01=_0x59ef57,_0x56621=this[_0xb6bb01(0x203)](),_0x40f63d=this[_0xb6bb01(0x346)]()?this[_0xb6bb01(0x37c)]():0x0,_0xc79519=this[_0xb6bb01(0x475)](),_0x496db7=Graphics['boxWidth']-this[_0xb6bb01(0x37c)](),_0x2ac2a7=_0x56621?this['calcWindowHeight'](0x1,!![]):0x0;return new Rectangle(_0x40f63d,_0xc79519,_0x496db7,_0x2ac2a7);},VisuMZ['ItemsEquipsCore'][_0x59ef57(0x38b)]=Scene_Equip[_0x59ef57(0x263)][_0x59ef57(0x1bf)],Scene_Equip[_0x59ef57(0x263)]['createSlotWindow']=function(){const _0x53affc=_0x59ef57;VisuMZ[_0x53affc(0x3a2)]['Scene_Equip_createSlotWindow'][_0x53affc(0x36e)](this),this[_0x53affc(0x1ae)]()&&this[_0x53affc(0x2bd)]();},VisuMZ['ItemsEquipsCore'][_0x59ef57(0xc2)]=Scene_Equip[_0x59ef57(0x263)][_0x59ef57(0xaa)],Scene_Equip['prototype'][_0x59ef57(0xaa)]=function(){const _0xb02e5b=_0x59ef57;return this[_0xb02e5b(0x138)]()?this[_0xb02e5b(0x194)]():VisuMZ[_0xb02e5b(0x3a2)]['Scene_Equip_slotWindowRect'][_0xb02e5b(0x36e)](this);},Scene_Equip[_0x59ef57(0x263)][_0x59ef57(0x194)]=function(){const _0x118b2f=_0x59ef57,_0x266884=this[_0x118b2f(0x258)](),_0x1456af=this['isRightInputMode']()?this['statusWidth']():0x0,_0x301157=_0x266884['y']+_0x266884[_0x118b2f(0x388)],_0xcd0d50=Graphics[_0x118b2f(0x4c6)]-this['statusWidth'](),_0x5284e2=this['mainAreaHeight']()-_0x266884[_0x118b2f(0x388)];return new Rectangle(_0x1456af,_0x301157,_0xcd0d50,_0x5284e2);},VisuMZ[_0x59ef57(0x3a2)]['Scene_Equip_itemWindowRect']=Scene_Equip['prototype']['itemWindowRect'],Scene_Equip[_0x59ef57(0x263)][_0x59ef57(0x362)]=function(){const _0x2ce633=_0x59ef57;return this[_0x2ce633(0x138)]()?this[_0x2ce633(0xaa)]():VisuMZ['ItemsEquipsCore'][_0x2ce633(0x227)][_0x2ce633(0x36e)](this);},Scene_Equip[_0x59ef57(0x263)][_0x59ef57(0x37c)]=function(){const _0x26bbcd=_0x59ef57;return this['isUseItemsEquipsCoreUpdatedLayout']()?this['geUpdatedLayoutStatusWidth']():VisuMZ[_0x26bbcd(0x3a2)][_0x26bbcd(0x16f)][_0x26bbcd(0x4b0)][_0x26bbcd(0x201)];},Scene_Equip[_0x59ef57(0x263)][_0x59ef57(0x187)]=function(){const _0x4c5214=_0x59ef57;return Math[_0x4c5214(0x4bd)](Graphics[_0x4c5214(0x4c6)]/0x2);},Scene_Equip['prototype'][_0x59ef57(0x2bd)]=function(){const _0x5b79aa=_0x59ef57;this[_0x5b79aa(0x4a2)]['setHandler'](_0x5b79aa(0x49e),this[_0x5b79aa(0x3ae)][_0x5b79aa(0x4eb)](this)),this[_0x5b79aa(0x4a2)]['setHandler'](_0x5b79aa(0x22a),this[_0x5b79aa(0x143)]['bind'](this)),this[_0x5b79aa(0x4a2)][_0x5b79aa(0x102)](_0x5b79aa(0xfb),this[_0x5b79aa(0x382)][_0x5b79aa(0x4eb)](this));},VisuMZ['ItemsEquipsCore'][_0x59ef57(0x25f)]=Scene_Equip[_0x59ef57(0x263)][_0x59ef57(0x458)],Scene_Equip['prototype'][_0x59ef57(0x458)]=function(){const _0x585030=_0x59ef57;this[_0x585030(0x1ae)]()&&(this['_commandWindow'][_0x585030(0xdb)](),this[_0x585030(0x100)][_0x585030(0x37b)]()),VisuMZ[_0x585030(0x3a2)][_0x585030(0x25f)][_0x585030(0x36e)](this);},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x42f)]=Scene_Equip[_0x59ef57(0x263)][_0x59ef57(0x4cf)],Scene_Equip[_0x59ef57(0x263)][_0x59ef57(0x4cf)]=function(){const _0x3f57e1=_0x59ef57;this[_0x3f57e1(0x4a2)][_0x3f57e1(0x1a7)]()>=0x0?(VisuMZ[_0x3f57e1(0x3a2)][_0x3f57e1(0x42f)]['call'](this),this[_0x3f57e1(0xf1)]()):(this['_slotWindow']['smoothSelect'](0x0),this['_slotWindow']['activate']());},Scene_Equip[_0x59ef57(0x263)][_0x59ef57(0xf1)]=function(){const _0x3bc183=_0x59ef57;this['_itemWindow'][_0x3bc183(0x3d1)]();const _0x513055=this['_slotWindow']['item'](),_0xf84666=this[_0x3bc183(0x442)][_0x3bc183(0x111)][_0x3bc183(0x179)](_0x513055),_0x51a098=Math[_0x3bc183(0x4bd)](this[_0x3bc183(0x442)][_0x3bc183(0x1a9)]()/0x2)-0x1;this[_0x3bc183(0x442)][_0x3bc183(0x190)](_0xf84666>=0x0?_0xf84666:0x0),this[_0x3bc183(0x442)][_0x3bc183(0x1ac)]>0x1&&(this[_0x3bc183(0x442)]['_scrollDuration']=0x1,this[_0x3bc183(0x442)][_0x3bc183(0x29b)]()),this[_0x3bc183(0x442)][_0x3bc183(0x25d)](this[_0x3bc183(0x442)]['index']()-_0x51a098);},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0xb5)]=Scene_Equip[_0x59ef57(0x263)]['onSlotCancel'],Scene_Equip[_0x59ef57(0x263)][_0x59ef57(0x2fd)]=function(){const _0x4ebfaf=_0x59ef57;VisuMZ['ItemsEquipsCore'][_0x4ebfaf(0xb5)]['call'](this),this['isUseModernControls']()&&(this[_0x4ebfaf(0x100)][_0x4ebfaf(0x190)](0x0),this[_0x4ebfaf(0x4a2)]['deactivate']());},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x40a)]=Scene_Equip[_0x59ef57(0x263)][_0x59ef57(0x160)],Scene_Equip[_0x59ef57(0x263)][_0x59ef57(0x160)]=function(){const _0x5ae254=_0x59ef57;VisuMZ[_0x5ae254(0x3a2)][_0x5ae254(0x40a)][_0x5ae254(0x36e)](this),this[_0x5ae254(0x1ae)]()&&(this[_0x5ae254(0x100)]['deactivate'](),this[_0x5ae254(0x100)][_0x5ae254(0xdb)](),this[_0x5ae254(0x4a2)][_0x5ae254(0x190)](0x0),this['_slotWindow'][_0x5ae254(0x300)]());},Scene_Equip[_0x59ef57(0x263)]['buttonAssistSlotWindowShift']=function(){const _0x3920b0=_0x59ef57;if(!this['_slotWindow'])return![];if(!this['_slotWindow'][_0x3920b0(0x158)])return![];return this[_0x3920b0(0x4a2)]['isShiftRemoveShortcutEnabled']();},Scene_Equip[_0x59ef57(0x263)][_0x59ef57(0x2a5)]=function(){const _0x14e988=_0x59ef57;if(this['buttonAssistSlotWindowShift']())return TextManager['getInputButtonString'](_0x14e988(0x427));return Scene_MenuBase['prototype']['buttonAssistKey3']['call'](this);},Scene_Equip[_0x59ef57(0x263)]['buttonAssistText3']=function(){const _0x56badf=_0x59ef57;if(this[_0x56badf(0x1d9)]())return VisuMZ[_0x56badf(0x3a2)]['Settings']['EquipScene']['buttonAssistRemove'];return Scene_MenuBase[_0x56badf(0x263)][_0x56badf(0x49b)][_0x56badf(0x36e)](this);},Scene_Equip[_0x59ef57(0x263)][_0x59ef57(0x128)]=function(){const _0x3b810f=_0x59ef57;if(this[_0x3b810f(0x1d9)]())return this[_0x3b810f(0x48c)][_0x3b810f(0x1e6)]/0x5/-0x3;return Scene_MenuBase[_0x3b810f(0x263)][_0x3b810f(0x128)][_0x3b810f(0x36e)](this);},Scene_Equip[_0x59ef57(0x263)][_0x59ef57(0x3ae)]=function(){const _0x5105b2=_0x59ef57;SceneManager[_0x5105b2(0x3f8)]();},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x2e6)]=Scene_Load[_0x59ef57(0x263)][_0x59ef57(0x3ab)],Scene_Load['prototype'][_0x59ef57(0x3ab)]=function(){const _0x25f741=_0x59ef57;VisuMZ[_0x25f741(0x3a2)][_0x25f741(0x2e6)][_0x25f741(0x36e)](this),this[_0x25f741(0xd0)]();},Scene_Load['prototype'][_0x59ef57(0xd0)]=function(){const _0x4d9cc7=_0x59ef57;if($gameSystem[_0x4d9cc7(0x4e0)]()!==$dataSystem['versionId'])for(const _0x2b46fa of $gameActors[_0x4d9cc7(0x111)]){if(_0x2b46fa)_0x2b46fa['prepareNewEquipSlotsOnLoad']();}},Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x4d2)]=function(){const _0x378735=_0x59ef57;if(ConfigManager['uiMenuStyle']&&ConfigManager['uiHelpPosition']!==undefined)return ConfigManager[_0x378735(0x42e)];else{if(this[_0x378735(0x138)]())return this[_0x378735(0x43c)]()['match'](/LOWER/i);else Scene_MenuBase[_0x378735(0x263)]['isRightInputMode'][_0x378735(0x36e)](this);}},Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x346)]=function(){const _0x28a623=_0x59ef57;if(ConfigManager[_0x28a623(0x434)]&&ConfigManager[_0x28a623(0x33d)]!==undefined)return ConfigManager['uiInputPosition'];else{if(this['isUseItemsEquipsCoreUpdatedLayout']())return this[_0x28a623(0x43c)]()[_0x28a623(0xf0)](/RIGHT/i);else Scene_MenuBase[_0x28a623(0x263)][_0x28a623(0x346)][_0x28a623(0x36e)](this);}},Scene_Shop['prototype']['updatedLayoutStyle']=function(){const _0x2566db=_0x59ef57;return VisuMZ[_0x2566db(0x3a2)][_0x2566db(0x16f)][_0x2566db(0x18e)]['LayoutStyle'];},Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x1ae)]=function(){const _0x524db9=_0x59ef57;return this[_0x524db9(0x447)]&&this[_0x524db9(0x447)][_0x524db9(0x1ae)]();},Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x138)]=function(){const _0x2513d6=_0x59ef57;return VisuMZ[_0x2513d6(0x3a2)]['Settings'][_0x2513d6(0x18e)][_0x2513d6(0x499)];},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0xf3)]=Scene_Shop['prototype'][_0x59ef57(0x15e)],Scene_Shop[_0x59ef57(0x263)]['prepare']=function(_0x1d349c,_0xdc4472){const _0x33ae76=_0x59ef57;_0x1d349c=VisuMZ[_0x33ae76(0x3a2)][_0x33ae76(0x287)](_0x1d349c),VisuMZ[_0x33ae76(0x3a2)][_0x33ae76(0xf3)]['call'](this,_0x1d349c,_0xdc4472),this['adjustHiddenShownGoods']();},Scene_Shop['prototype'][_0x59ef57(0x2f8)]=function(){const _0xf52c8e=_0x59ef57;this[_0xf52c8e(0xdd)]=0x0;const _0x52ecbc=[];for(const _0x621412 of this['_goods']){this[_0xf52c8e(0x113)](_0x621412)?this[_0xf52c8e(0xdd)]++:_0x52ecbc[_0xf52c8e(0x2a9)](_0x621412);}for(const _0x56b4f1 of _0x52ecbc){this[_0xf52c8e(0x4de)][_0xf52c8e(0x115)](_0x56b4f1);}},Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x113)]=function(_0x473eb8){if(_0x473eb8[0x0]>0x2||_0x473eb8[0x0]<0x0)return![];const _0x5907b7=[$dataItems,$dataWeapons,$dataArmors][_0x473eb8[0x0]][_0x473eb8[0x1]];if(!_0x5907b7)return![];return!![];},VisuMZ[_0x59ef57(0x3a2)]['Scene_Shop_create']=Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x132)],Scene_Shop[_0x59ef57(0x263)]['create']=function(){const _0x33f09f=_0x59ef57;VisuMZ[_0x33f09f(0x3a2)][_0x33f09f(0x326)][_0x33f09f(0x36e)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x33f09f(0x10d)](),this['resetShopSwitches']();},Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x10d)]=function(){const _0x8f6274=_0x59ef57;this[_0x8f6274(0x114)][_0x8f6274(0x2fb)](),this[_0x8f6274(0x4d9)][_0x8f6274(0x3e5)](),this[_0x8f6274(0x4d9)][_0x8f6274(0xdb)](),this[_0x8f6274(0xe7)]['show']();},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x3c4)]=Scene_Shop[_0x59ef57(0x263)]['helpWindowRect'],Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x4b9)]=function(){const _0x596885=_0x59ef57;return this[_0x596885(0x138)]()?this[_0x596885(0x215)]():VisuMZ[_0x596885(0x3a2)][_0x596885(0x3c4)][_0x596885(0x36e)](this);},Scene_Shop['prototype'][_0x59ef57(0x215)]=function(){const _0xdf3ea4=_0x59ef57,_0x6bbf1e=0x0,_0x2b5f5b=this[_0xdf3ea4(0x3b9)](),_0x40d7ec=Graphics[_0xdf3ea4(0x4c6)],_0xb82021=this['helpAreaHeight']();return new Rectangle(_0x6bbf1e,_0x2b5f5b,_0x40d7ec,_0xb82021);},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x2d3)]=Scene_Shop['prototype']['goldWindowRect'],Scene_Shop[_0x59ef57(0x263)]['goldWindowRect']=function(){const _0x5ee9d9=_0x59ef57;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x5ee9d9(0x219)]():VisuMZ[_0x5ee9d9(0x3a2)][_0x5ee9d9(0x2d3)][_0x5ee9d9(0x36e)](this);},Scene_Shop[_0x59ef57(0x263)]['goldWindowRectItemsEquipsCore']=function(){const _0x5479a9=_0x59ef57,_0x3a5b23=this[_0x5479a9(0x41d)](),_0x458d5e=this[_0x5479a9(0x124)](0x1,!![]),_0xb0b1e6=this[_0x5479a9(0x346)]()?0x0:Graphics[_0x5479a9(0x4c6)]-_0x3a5b23,_0xf18879=this[_0x5479a9(0x475)]();return new Rectangle(_0xb0b1e6,_0xf18879,_0x3a5b23,_0x458d5e);},VisuMZ['ItemsEquipsCore'][_0x59ef57(0xad)]=Scene_Shop[_0x59ef57(0x263)]['commandWindowRect'],Scene_Shop[_0x59ef57(0x263)]['commandWindowRect']=function(){const _0x2ff3b1=_0x59ef57;return this[_0x2ff3b1(0x138)]()?this[_0x2ff3b1(0x272)]():VisuMZ[_0x2ff3b1(0x3a2)][_0x2ff3b1(0xad)][_0x2ff3b1(0x36e)](this);},Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x272)]=function(){const _0x469b3c=_0x59ef57,_0x20243f=this[_0x469b3c(0x346)]()?this[_0x469b3c(0x41d)]():0x0,_0xb715c=this[_0x469b3c(0x475)](),_0x206e73=Graphics['boxWidth']-this[_0x469b3c(0x41d)](),_0x22ad2b=this['calcWindowHeight'](0x1,!![]);return new Rectangle(_0x20243f,_0xb715c,_0x206e73,_0x22ad2b);},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x420)]=Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x244)],Scene_Shop[_0x59ef57(0x263)]['numberWindowRect']=function(){const _0x36aa80=_0x59ef57;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x36aa80(0x31f)]():VisuMZ[_0x36aa80(0x3a2)]['Scene_Shop_numberWindowRect'][_0x36aa80(0x36e)](this);},Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x31f)]=function(){const _0x339c97=_0x59ef57,_0x37294d=this['_commandWindow']['y']+this[_0x339c97(0x100)][_0x339c97(0x388)],_0x4c8342=Graphics[_0x339c97(0x4c6)]-this[_0x339c97(0x37c)](),_0x44c7cb=this['isRightInputMode']()?Graphics[_0x339c97(0x4c6)]-_0x4c8342:0x0,_0x42b4cb=this['mainAreaHeight']()-this['_commandWindow'][_0x339c97(0x388)];return new Rectangle(_0x44c7cb,_0x37294d,_0x4c8342,_0x42b4cb);},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x221)]=Scene_Shop[_0x59ef57(0x263)]['statusWindowRect'],Scene_Shop[_0x59ef57(0x263)]['statusWindowRect']=function(){const _0x2ce1c1=_0x59ef57;return this[_0x2ce1c1(0x138)]()?this[_0x2ce1c1(0x456)]():VisuMZ[_0x2ce1c1(0x3a2)][_0x2ce1c1(0x221)][_0x2ce1c1(0x36e)](this);},Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x456)]=function(){const _0x52a726=_0x59ef57,_0x410069=this[_0x52a726(0x37c)](),_0x102f0d=this[_0x52a726(0x314)]()-this['_commandWindow'][_0x52a726(0x388)],_0x1dc09f=this[_0x52a726(0x346)]()?0x0:Graphics[_0x52a726(0x4c6)]-_0x410069,_0x1e548f=this[_0x52a726(0x100)]['y']+this[_0x52a726(0x100)][_0x52a726(0x388)];return new Rectangle(_0x1dc09f,_0x1e548f,_0x410069,_0x102f0d);},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x1dc)]=Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0xf4)],Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0xf4)]=function(){const _0x2fb600=_0x59ef57;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x2fb600(0x1d3)]():VisuMZ[_0x2fb600(0x3a2)]['Scene_Shop_buyWindowRect']['call'](this);},Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x1d3)]=function(){const _0x4c4696=_0x59ef57,_0x75d13f=this[_0x4c4696(0x100)]['y']+this[_0x4c4696(0x100)]['height'],_0x182fe6=Graphics['boxWidth']-this[_0x4c4696(0x37c)](),_0x4de1a9=this['mainAreaHeight']()-this[_0x4c4696(0x100)][_0x4c4696(0x388)],_0x48b3a4=this['isRightInputMode']()?Graphics['boxWidth']-_0x182fe6:0x0;return new Rectangle(_0x48b3a4,_0x75d13f,_0x182fe6,_0x4de1a9);},VisuMZ['ItemsEquipsCore'][_0x59ef57(0x49d)]=Scene_Shop[_0x59ef57(0x263)]['createCategoryWindow'],Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x3af)]=function(){const _0x326fca=_0x59ef57;VisuMZ[_0x326fca(0x3a2)][_0x326fca(0x49d)][_0x326fca(0x36e)](this),this[_0x326fca(0x1ae)]()&&this['postCreateCategoryWindowItemsEquipsCore']();},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x1b7)]=Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x242)],Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x242)]=function(){const _0x56f2e8=_0x59ef57;return this[_0x56f2e8(0x138)]()?this['categoryWindowRectItemsEquipsCore']():VisuMZ[_0x56f2e8(0x3a2)][_0x56f2e8(0x1b7)][_0x56f2e8(0x36e)](this);},Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x121)]=function(){const _0x2dfc85=_0x59ef57,_0x3f8097=this[_0x2dfc85(0x100)]['y'],_0x4f563a=this[_0x2dfc85(0x100)][_0x2dfc85(0x1e6)],_0x3b1c4f=this[_0x2dfc85(0x124)](0x1,!![]),_0x120997=this[_0x2dfc85(0x346)]()?Graphics[_0x2dfc85(0x4c6)]-_0x4f563a:0x0;return new Rectangle(_0x120997,_0x3f8097,_0x4f563a,_0x3b1c4f);},Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x3d7)]=function(){const _0x38ca54=_0x59ef57;delete this[_0x38ca54(0x447)][_0x38ca54(0x342)]['ok'],delete this[_0x38ca54(0x447)][_0x38ca54(0x342)][_0x38ca54(0x49e)];},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0xb1)]=Scene_Shop['prototype']['createSellWindow'],Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x366)]=function(){const _0x62e268=_0x59ef57;VisuMZ[_0x62e268(0x3a2)][_0x62e268(0xb1)][_0x62e268(0x36e)](this),this[_0x62e268(0x138)]()&&this[_0x62e268(0x37d)]();},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x3c5)]=Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x39c)],Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x39c)]=function(){const _0x3d82f9=_0x59ef57;return this[_0x3d82f9(0x138)]()?this['sellWindowRectItemsEquipsCore']():VisuMZ[_0x3d82f9(0x3a2)][_0x3d82f9(0x3c5)][_0x3d82f9(0x36e)](this);},Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x43f)]=function(){const _0x292b62=_0x59ef57,_0x510f1e=this[_0x292b62(0x447)]['y']+this[_0x292b62(0x447)][_0x292b62(0x388)],_0x16cd85=Graphics[_0x292b62(0x4c6)]-this[_0x292b62(0x37c)](),_0x6c54a1=this[_0x292b62(0x314)]()-this[_0x292b62(0x447)][_0x292b62(0x388)],_0x51a40a=this[_0x292b62(0x346)]()?Graphics[_0x292b62(0x4c6)]-_0x16cd85:0x0;return new Rectangle(_0x51a40a,_0x510f1e,_0x16cd85,_0x6c54a1);},Scene_Shop[_0x59ef57(0x263)]['postCreateSellWindowItemsEquipsCore']=function(){const _0xf82ab0=_0x59ef57;this[_0xf82ab0(0x109)][_0xf82ab0(0x10a)](this['_statusWindow']);},Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x37c)]=function(){const _0x68080f=_0x59ef57;return VisuMZ[_0x68080f(0x3a2)]['Settings'][_0x68080f(0x372)][_0x68080f(0x368)];},VisuMZ['ItemsEquipsCore'][_0x59ef57(0x494)]=Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0xfc)],Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0xfc)]=function(){const _0x5502a=_0x59ef57;VisuMZ[_0x5502a(0x3a2)]['Scene_Shop_activateSellWindow'][_0x5502a(0x36e)](this),this[_0x5502a(0x138)]()&&this['_statusWindow'][_0x5502a(0x3e5)](),this[_0x5502a(0x109)][_0x5502a(0x410)]();},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x29c)]=Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x353)],Scene_Shop[_0x59ef57(0x263)]['commandBuy']=function(){const _0x533df7=_0x59ef57;VisuMZ[_0x533df7(0x3a2)][_0x533df7(0x29c)][_0x533df7(0x36e)](this),this[_0x533df7(0x138)]()&&this['commandBuyItemsEquipsCore']();},Scene_Shop[_0x59ef57(0x263)]['commandBuyItemsEquipsCore']=function(){const _0x949928=_0x59ef57;this[_0x949928(0x3d4)]=this[_0x949928(0x3d4)]||0x0,this[_0x949928(0x4d9)][_0x949928(0x190)](this[_0x949928(0x3d4)]);},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x1d7)]=Scene_Shop[_0x59ef57(0x263)]['commandSell'],Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x1ab)]=function(){const _0x100bf9=_0x59ef57;VisuMZ['ItemsEquipsCore'][_0x100bf9(0x1d7)][_0x100bf9(0x36e)](this),this[_0x100bf9(0x138)]()&&this[_0x100bf9(0x334)](),this[_0x100bf9(0x1ae)]()&&(this[_0x100bf9(0x447)][_0x100bf9(0x190)](0x0),this[_0x100bf9(0x11e)]());},Scene_Shop['prototype'][_0x59ef57(0x334)]=function(){const _0x4a0644=_0x59ef57;this[_0x4a0644(0x4d9)][_0x4a0644(0x2fb)](),this[_0x4a0644(0x100)][_0x4a0644(0x2fb)]();},VisuMZ['ItemsEquipsCore'][_0x59ef57(0x474)]=Scene_Shop[_0x59ef57(0x263)]['onBuyCancel'],Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x3e7)]=function(){const _0x31e488=_0x59ef57;VisuMZ[_0x31e488(0x3a2)]['Scene_Shop_onBuyCancel'][_0x31e488(0x36e)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x31e488(0x1d4)]();},Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x1d4)]=function(){const _0xd9a1de=_0x59ef57;this[_0xd9a1de(0x3d4)]=this[_0xd9a1de(0x4d9)][_0xd9a1de(0x1a7)](),this['_buyWindow'][_0xd9a1de(0x3e5)](),this[_0xd9a1de(0x4d9)][_0xd9a1de(0xdb)](),this[_0xd9a1de(0x4d9)][_0xd9a1de(0x2cc)](0x0,0x0),this[_0xd9a1de(0xe7)]['show'](),this['_dummyWindow'][_0xd9a1de(0x2fb)]();},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x1b2)]=Scene_Shop[_0x59ef57(0x263)]['onCategoryCancel'],Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x4d3)]=function(){const _0x5c31c3=_0x59ef57;VisuMZ[_0x5c31c3(0x3a2)][_0x5c31c3(0x1b2)][_0x5c31c3(0x36e)](this),this[_0x5c31c3(0x138)]()&&this[_0x5c31c3(0x335)]();},Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x335)]=function(){const _0x85be5c=_0x59ef57;this[_0x85be5c(0x4d9)][_0x85be5c(0x3e5)](),this[_0x85be5c(0x100)][_0x85be5c(0x3e5)]();},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x2b9)]=Scene_Shop['prototype'][_0x59ef57(0x355)],Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x355)]=function(){const _0x22d393=_0x59ef57;$gameTemp[_0x22d393(0x323)]=!![],VisuMZ['ItemsEquipsCore'][_0x22d393(0x2b9)][_0x22d393(0x36e)](this),$gameTemp[_0x22d393(0x323)]=![],this[_0x22d393(0x436)]=this[_0x22d393(0x4d9)]['item']();},VisuMZ['ItemsEquipsCore'][_0x59ef57(0x21d)]=Scene_Shop['prototype'][_0x59ef57(0x2e7)],Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x2e7)]=function(){const _0x1f8a30=_0x59ef57;$gameTemp['_bypassProxy']=!![],this[_0x1f8a30(0x436)]=this[_0x1f8a30(0x4d9)][_0x1f8a30(0x1bb)]();const _0x51353a=VisuMZ[_0x1f8a30(0x3a2)][_0x1f8a30(0x21d)][_0x1f8a30(0x36e)](this);return $gameTemp[_0x1f8a30(0x323)]=![],this['_item']=this['_buyWindow'][_0x1f8a30(0x1bb)](),_0x51353a;},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x412)]=Scene_Shop[_0x59ef57(0x263)]['onSellOk'],Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x261)]=function(){const _0x753e8=_0x59ef57;VisuMZ['ItemsEquipsCore'][_0x753e8(0x412)][_0x753e8(0x36e)](this),this[_0x753e8(0x138)]()&&this[_0x753e8(0x332)]();},Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x332)]=function(){const _0x23138d=_0x59ef57;this[_0x23138d(0x447)][_0x23138d(0x3e5)]();},VisuMZ['ItemsEquipsCore'][_0x59ef57(0x35c)]=Scene_Shop[_0x59ef57(0x263)]['onSellCancel'],Scene_Shop[_0x59ef57(0x263)]['onSellCancel']=function(){const _0x803b56=_0x59ef57;VisuMZ[_0x803b56(0x3a2)][_0x803b56(0x35c)]['call'](this),this[_0x803b56(0x1ae)]()&&this['onCategoryCancel'](),this[_0x803b56(0x138)]()&&this[_0x803b56(0x114)][_0x803b56(0x2fb)]();},Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x468)]=function(_0x252c3d){const _0x1d224e=_0x59ef57,_0x564e12=this['_item'];this[_0x1d224e(0x436)]=_0x252c3d;const _0x4e9067=this[_0x1d224e(0x2ee)]();return this['_item']=_0x564e12,_0x4e9067;},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x4dc)]=Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x2ee)],Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x2ee)]=function(){const _0x18af5e=_0x59ef57;let _0x17b39e=this[_0x18af5e(0x479)]();const _0x3b2855=this[_0x18af5e(0x436)];return _0x17b39e=VisuMZ[_0x18af5e(0x3a2)][_0x18af5e(0x16f)][_0x18af5e(0x18e)][_0x18af5e(0xa9)][_0x18af5e(0x36e)](this,_0x3b2855,_0x17b39e),_0x17b39e;},Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x479)]=function(){const _0x196d84=_0x59ef57;let _0x27a750=this[_0x196d84(0x436)][_0x196d84(0x45e)];if(!this[_0x196d84(0x436)])return 0x0;else{if(this[_0x196d84(0x436)][_0x196d84(0x278)][_0x196d84(0xf0)](/<JS SELL PRICE>\s*([\s\S]*)\s*<\/JS SELL PRICE>/i)){const _0x1d3d83=String(RegExp['$1']);window['item']=this[_0x196d84(0x436)],window[_0x196d84(0x45e)]=_0x27a750*this['sellPriceRate']();try{eval(_0x1d3d83);}catch(_0x37e48b){if($gameTemp['isPlaytest']())console[_0x196d84(0x137)](_0x37e48b);}let _0x13e00c=window[_0x196d84(0x45e)];window[_0x196d84(0x1bb)]=undefined,window[_0x196d84(0x45e)]=undefined;if(isNaN(_0x13e00c))_0x13e00c=0x0;return Math[_0x196d84(0x4bd)](_0x13e00c);}else return this[_0x196d84(0x436)][_0x196d84(0x278)][_0x196d84(0xf0)](/<SELL PRICE:[ ](\d+)>/i)?parseInt(RegExp['$1']):Math[_0x196d84(0x4bd)](this[_0x196d84(0x2f2)]());}},Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x2f2)]=function(){const _0x248bcb=_0x59ef57;return this[_0x248bcb(0x436)][_0x248bcb(0x45e)]*this[_0x248bcb(0x2ba)]();},Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x2ba)]=function(){const _0x5d767d=_0x59ef57;return VisuMZ[_0x5d767d(0x3a2)][_0x5d767d(0x16f)][_0x5d767d(0x18e)]['SellPriceRate'];},Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x3f5)]=function(){const _0x12794b=_0x59ef57;if(!this[_0x12794b(0x43c)]())return![];if(!this[_0x12794b(0x1ae)]())return![];if(!this[_0x12794b(0x109)])return![];if(!this[_0x12794b(0x109)][_0x12794b(0x158)])return![];return this[_0x12794b(0x43c)]()&&this[_0x12794b(0x1ae)]();},Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x101)]=function(){const _0x54246=_0x59ef57;if(this['buttonAssistItemListRequirement']())return this[_0x54246(0x109)][_0x54246(0x487)]()===0x1?TextManager[_0x54246(0x10f)](_0x54246(0xc7),'right'):TextManager[_0x54246(0x10f)]('pageup',_0x54246(0x22a));else{if(this[_0x54246(0x398)]&&this[_0x54246(0x398)][_0x54246(0x158)])return TextManager[_0x54246(0x10f)]('left','right');}return Scene_MenuBase[_0x54246(0x263)][_0x54246(0x101)]['call'](this);},Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x252)]=function(){const _0x5722af=_0x59ef57;if(this[_0x5722af(0x398)]&&this[_0x5722af(0x398)]['active'])return TextManager[_0x5722af(0x10f)]('up',_0x5722af(0x310));return Scene_MenuBase[_0x5722af(0x263)][_0x5722af(0x252)][_0x5722af(0x36e)](this);},Scene_Shop[_0x59ef57(0x263)]['buttonAssistText1']=function(){const _0x2f84cb=_0x59ef57;if(this[_0x2f84cb(0x3f5)]())return VisuMZ[_0x2f84cb(0x3a2)]['Settings'][_0x2f84cb(0xb6)]['buttonAssistCategory'];else{if(this[_0x2f84cb(0x398)]&&this['_numberWindow'][_0x2f84cb(0x158)])return VisuMZ['ItemsEquipsCore'][_0x2f84cb(0x16f)][_0x2f84cb(0x18e)][_0x2f84cb(0x4b7)];}return Scene_MenuBase[_0x2f84cb(0x263)][_0x2f84cb(0x40c)][_0x2f84cb(0x36e)](this);},Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x1e3)]=function(){const _0x25e393=_0x59ef57;if(this[_0x25e393(0x398)]&&this[_0x25e393(0x398)]['active'])return VisuMZ[_0x25e393(0x3a2)][_0x25e393(0x16f)][_0x25e393(0x18e)][_0x25e393(0x274)];return Scene_MenuBase[_0x25e393(0x263)][_0x25e393(0x1e3)][_0x25e393(0x36e)](this);},Scene_Shop['prototype'][_0x59ef57(0x249)]=function(){const _0x1562ab=_0x59ef57;if(!SceneManager[_0x1562ab(0x426)]())return;const _0x5494f9=VisuMZ[_0x1562ab(0x3a2)][_0x1562ab(0x16f)]['ShopScene'];_0x5494f9['SwitchBuy']&&$gameSwitches[_0x1562ab(0xc1)](_0x5494f9['SwitchBuy'],![]),_0x5494f9[_0x1562ab(0x3c2)]&&$gameSwitches[_0x1562ab(0xc1)](_0x5494f9[_0x1562ab(0x3c2)],![]);},VisuMZ[_0x59ef57(0x3a2)]['Scene_Shop_doBuy']=Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x2c1)],Scene_Shop['prototype'][_0x59ef57(0x2c1)]=function(_0x432ac9){const _0x1e1419=_0x59ef57;VisuMZ[_0x1e1419(0x3a2)][_0x1e1419(0x417)]['call'](this,_0x432ac9),this[_0x1e1419(0x2b7)](this[_0x1e1419(0x436)],_0x432ac9);if(_0x432ac9<=0x0)return;const _0x25f703=VisuMZ['ItemsEquipsCore'][_0x1e1419(0x16f)][_0x1e1419(0x18e)];_0x25f703[_0x1e1419(0x2b0)]&&$gameSwitches[_0x1e1419(0xc1)](_0x25f703['SwitchBuy'],!![]),this['_buyWindow'][_0x1e1419(0x3d1)](),this[_0x1e1419(0x109)][_0x1e1419(0x3d1)]();},Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x2b7)]=function(_0x5c9d4b,_0x572cc7){const _0x3d6baf=_0x59ef57;this[_0x3d6baf(0x14e)](_0x5c9d4b,_0x572cc7),$gameParty[_0x3d6baf(0x212)](_0x5c9d4b,_0x572cc7),$gameParty[_0x3d6baf(0x45c)](_0x572cc7*this[_0x3d6baf(0x2e7)]());},Scene_Shop[_0x59ef57(0x263)]['processShopCondListingOnBuyItem']=function(_0x3fab10,_0x4a86bc){const _0x2141f7=_0x59ef57;if(!_0x3fab10)return;if(!_0x4a86bc)return;const _0x2a4330=VisuMZ[_0x2141f7(0x3a2)][_0x2141f7(0x375)],_0x5383ac=_0x3fab10[_0x2141f7(0x278)]||'';if(_0x5383ac[_0x2141f7(0xf0)](_0x2a4330[_0x2141f7(0x467)])){const _0x588625=String(RegExp['$1'])[_0x2141f7(0x15b)](',')[_0x2141f7(0x2ed)](_0x4fb7c4=>Number(_0x4fb7c4));for(const _0x5ef523 of _0x588625){$gameSwitches[_0x2141f7(0xc1)](_0x5ef523,!![]);}}if(_0x5383ac[_0x2141f7(0xf0)](_0x2a4330[_0x2141f7(0x469)])){const _0x32151b=String(RegExp['$1'])[_0x2141f7(0x15b)](',')[_0x2141f7(0x2ed)](_0x4acf37=>Number(_0x4acf37));for(const _0x5f55d0 of _0x32151b){$gameSwitches[_0x2141f7(0xc1)](_0x5f55d0,![]);}}},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0xf8)]=Scene_Shop['prototype'][_0x59ef57(0x317)],Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x317)]=function(_0x52d3a4){const _0x2ea747=_0x59ef57;VisuMZ[_0x2ea747(0x3a2)][_0x2ea747(0xf8)]['call'](this,_0x52d3a4),this[_0x2ea747(0x3dd)](this[_0x2ea747(0x436)],_0x52d3a4);if(_0x52d3a4<=0x0)return;const _0x38f927=VisuMZ[_0x2ea747(0x3a2)][_0x2ea747(0x16f)][_0x2ea747(0x18e)];_0x38f927[_0x2ea747(0x2b0)]&&$gameSwitches[_0x2ea747(0xc1)](_0x38f927[_0x2ea747(0x3c2)],!![]),this['_buyWindow'][_0x2ea747(0x3d1)](),this[_0x2ea747(0x109)]['refresh']();},Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x3dd)]=function(_0x796f3d,_0x492c6e){const _0x3309ad=_0x59ef57;this[_0x3309ad(0x213)](_0x796f3d,_0x492c6e),$gameParty[_0x3309ad(0x4d0)](_0x796f3d,_0x492c6e),$gameParty[_0x3309ad(0x10b)](_0x492c6e*this[_0x3309ad(0x2ee)]());},Scene_Shop[_0x59ef57(0x263)][_0x59ef57(0x213)]=function(_0x401ecb,_0x12c8ba){const _0x1f1455=_0x59ef57;if(!_0x401ecb)return;if(!_0x12c8ba)return;const _0x1b8d2a=VisuMZ[_0x1f1455(0x3a2)][_0x1f1455(0x375)],_0x58da87=_0x401ecb[_0x1f1455(0x278)]||'';if(_0x58da87[_0x1f1455(0xf0)](_0x1b8d2a[_0x1f1455(0x47b)])){const _0x3693aa=String(RegExp['$1'])[_0x1f1455(0x15b)](',')[_0x1f1455(0x2ed)](_0x2bae3a=>Number(_0x2bae3a));for(const _0x670a6e of _0x3693aa){$gameSwitches['setValue'](_0x670a6e,!![]);}}if(_0x58da87[_0x1f1455(0xf0)](_0x1b8d2a[_0x1f1455(0x3ff)])){const _0x4c5aa2=String(RegExp['$1'])[_0x1f1455(0x15b)](',')[_0x1f1455(0x2ed)](_0x40af1c=>Number(_0x40af1c));for(const _0x3a9981 of _0x4c5aa2){$gameSwitches[_0x1f1455(0xc1)](_0x3a9981,![]);}}};function Sprite_NewLabel(){const _0x5a377d=_0x59ef57;this[_0x5a377d(0x40e)](...arguments);}function _0x5677(_0x22b147,_0x598221){const _0x4ea692=_0x4ea6();return _0x5677=function(_0x5677fe,_0x469d15){_0x5677fe=_0x5677fe-0xa7;let _0x5bb7cc=_0x4ea692[_0x5677fe];return _0x5bb7cc;},_0x5677(_0x22b147,_0x598221);}Sprite_NewLabel[_0x59ef57(0x263)]=Object[_0x59ef57(0x132)](Sprite[_0x59ef57(0x263)]),Sprite_NewLabel[_0x59ef57(0x263)][_0x59ef57(0x183)]=Sprite_NewLabel,Sprite_NewLabel['prototype'][_0x59ef57(0x40e)]=function(){const _0x6528c0=_0x59ef57;Sprite[_0x6528c0(0x263)][_0x6528c0(0x40e)][_0x6528c0(0x36e)](this),this['createBitmap']();},Sprite_NewLabel[_0x59ef57(0x263)]['createBitmap']=function(){const _0x4a3c9c=_0x59ef57,_0x362e66=0x20,_0x608661=0x20;this[_0x4a3c9c(0xe8)]=new Bitmap(_0x362e66,_0x608661),this['drawNewLabelIcon'](),this[_0x4a3c9c(0x106)]();},Sprite_NewLabel['prototype']['drawNewLabelIcon']=function(){const _0x4837bf=_0x59ef57,_0x4855af=VisuMZ[_0x4837bf(0x3a2)][_0x4837bf(0x16f)][_0x4837bf(0x4ec)][_0x4837bf(0x325)];if(_0x4855af<=0x0)return;const _0x4f09fb=ImageManager['loadSystem'](_0x4837bf(0x47d)),_0x6b5648=ImageManager[_0x4837bf(0x1a2)],_0x208599=ImageManager['iconHeight'],_0x336028=_0x4855af%0x10*_0x6b5648,_0x4c507f=Math[_0x4837bf(0x4bd)](_0x4855af/0x10)*_0x208599;this[_0x4837bf(0xe8)]['blt'](_0x4f09fb,_0x336028,_0x4c507f,_0x6b5648,_0x208599,0x0,0x0);},Sprite_NewLabel[_0x59ef57(0x263)][_0x59ef57(0x106)]=function(){const _0x250078=_0x59ef57,_0x4016f4=VisuMZ[_0x250078(0x3a2)][_0x250078(0x16f)]['New'],_0x48adbe=_0x4016f4[_0x250078(0x4a8)];if(_0x48adbe==='')return;const _0x3973fb=0x20,_0x409e8a=0x20;this[_0x250078(0xe8)][_0x250078(0x2a1)]=_0x4016f4[_0x250078(0x1ba)]||$gameSystem[_0x250078(0x277)](),this[_0x250078(0xe8)][_0x250078(0x2bf)]=this['getTextColor'](),this[_0x250078(0xe8)][_0x250078(0xf2)]=_0x4016f4[_0x250078(0x496)],this[_0x250078(0xe8)][_0x250078(0x207)](_0x48adbe,0x0,_0x409e8a/0x2,_0x3973fb,_0x409e8a/0x2,'center');},Sprite_NewLabel['prototype'][_0x59ef57(0x26a)]=function(){const _0x465c4c=_0x59ef57,_0x544d8e=VisuMZ[_0x465c4c(0x3a2)][_0x465c4c(0x16f)][_0x465c4c(0x4ec)]['FontColor'];return _0x544d8e['match'](/#(.*)/i)?'#'+String(RegExp['$1']):ColorManager[_0x465c4c(0x2bf)](_0x544d8e);},Window_Base[_0x59ef57(0x263)]['drawItemName']=function(_0x55a01f,_0x21808a,_0x38f17a,_0x5cae47){const _0x51a09f=_0x59ef57;if(_0x55a01f){const _0x501f23=ImageManager[_0x51a09f(0x127)]||0x20,_0x20ccd0=_0x501f23-ImageManager[_0x51a09f(0x1a2)],_0x464f3d=_0x501f23+0x4,_0x1cc918=_0x38f17a+(this[_0x51a09f(0x482)]()-ImageManager['iconHeight'])/0x2,_0x29b764=Math['max'](0x0,_0x5cae47-_0x464f3d);this['changeTextColor'](ColorManager[_0x51a09f(0x282)](_0x55a01f)),this[_0x51a09f(0x177)](_0x55a01f[_0x51a09f(0x33c)],_0x21808a+Math[_0x51a09f(0x14d)](_0x20ccd0/0x2),_0x1cc918),this[_0x51a09f(0x207)](_0x55a01f[_0x51a09f(0x26b)],_0x21808a+_0x464f3d,_0x38f17a,_0x29b764),this[_0x51a09f(0xfe)]();}},Window_Base[_0x59ef57(0x263)][_0x59ef57(0x130)]=function(_0x11f7b8,_0x57d85d,_0x369db0,_0x33ee4c){const _0x19f310=_0x59ef57;if(this['isDrawItemNumber'](_0x11f7b8)){this['resetFontSettings']();const _0x1996b3=VisuMZ['ItemsEquipsCore'][_0x19f310(0x16f)]['ItemScene'],_0x5136d9=_0x1996b3['ItemQuantityFmt'],_0x4e19da=_0x5136d9[_0x19f310(0x46e)]($gameParty['numItems'](_0x11f7b8));this[_0x19f310(0x10e)][_0x19f310(0xf2)]=_0x1996b3[_0x19f310(0x4aa)],this[_0x19f310(0x207)](_0x4e19da,_0x57d85d,_0x369db0,_0x33ee4c,_0x19f310(0x34c)),this[_0x19f310(0x389)]();}},Window_Base[_0x59ef57(0x263)][_0x59ef57(0x4c8)]=function(_0x140cfc){const _0x4bcb6d=_0x59ef57;if(DataManager[_0x4bcb6d(0x2f3)](_0x140cfc))return $dataSystem[_0x4bcb6d(0x3ac)];return!![];},Window_Base[_0x59ef57(0x263)][_0x59ef57(0x3e0)]=function(_0x3ba2e0,_0x5d48ca,_0x308a80,_0x13d460,_0x3b104a){const _0x1460e3=_0x59ef57;_0x3b104a=Math['max'](_0x3b104a||0x1,0x1);while(_0x3b104a--){_0x13d460=_0x13d460||this[_0x1460e3(0x482)](),this[_0x1460e3(0x12e)]['paintOpacity']=0xa0;const _0x92c190=ColorManager[_0x1460e3(0x24d)]();this[_0x1460e3(0x12e)]['fillRect'](_0x3ba2e0+0x1,_0x5d48ca+0x1,_0x308a80-0x2,_0x13d460-0x2,_0x92c190),this[_0x1460e3(0x12e)][_0x1460e3(0x425)]=0xff;}},VisuMZ['ItemsEquipsCore'][_0x59ef57(0x235)]=Window_Selectable['prototype'][_0x59ef57(0x40e)],Window_Selectable[_0x59ef57(0x263)][_0x59ef57(0x40e)]=function(_0xdb0c1d){const _0x5c8cdd=_0x59ef57;this[_0x5c8cdd(0x14f)](),VisuMZ[_0x5c8cdd(0x3a2)][_0x5c8cdd(0x235)][_0x5c8cdd(0x36e)](this,_0xdb0c1d);},Window_Selectable[_0x59ef57(0x263)][_0x59ef57(0x14f)]=function(){const _0x4cea89=_0x59ef57;this[_0x4cea89(0x4ba)]={},this['_newLabelOpacity']=0xff,this[_0x4cea89(0x2b4)]=VisuMZ['ItemsEquipsCore'][_0x4cea89(0x16f)][_0x4cea89(0x4ec)][_0x4cea89(0x43a)],this['_newLabelOpacityUpperLimit']=VisuMZ[_0x4cea89(0x3a2)]['Settings'][_0x4cea89(0x4ec)][_0x4cea89(0x275)];},Window_Selectable[_0x59ef57(0x263)][_0x59ef57(0x13d)]=function(){return![];},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0xf5)]=Window_Selectable[_0x59ef57(0x263)][_0x59ef57(0x44d)],Window_Selectable[_0x59ef57(0x263)][_0x59ef57(0x44d)]=function(_0x347d3){const _0x337a81=_0x59ef57;VisuMZ[_0x337a81(0x3a2)][_0x337a81(0xf5)]['call'](this,_0x347d3);if(this[_0x337a81(0x13d)]())this['clearNewLabelFromItem'](_0x347d3);},Window_Selectable[_0x59ef57(0x263)][_0x59ef57(0x357)]=function(_0x3f2842){const _0x52bc26=_0x59ef57;if(!_0x3f2842)return;$gameParty[_0x52bc26(0x4c5)](_0x3f2842);let _0x3e0959='';if(DataManager[_0x52bc26(0x327)](_0x3f2842))_0x3e0959=_0x52bc26(0x246)[_0x52bc26(0x46e)](_0x3f2842['id']);else{if(DataManager[_0x52bc26(0x189)](_0x3f2842))_0x3e0959=_0x52bc26(0x1b4)[_0x52bc26(0x46e)](_0x3f2842['id']);else{if(DataManager[_0x52bc26(0x3d8)](_0x3f2842))_0x3e0959=_0x52bc26(0x4e4)[_0x52bc26(0x46e)](_0x3f2842['id']);else return;}}const _0x27157b=this[_0x52bc26(0x4ba)][_0x3e0959];if(_0x27157b)_0x27157b[_0x52bc26(0x2fb)]();},VisuMZ[_0x59ef57(0x3a2)]['Window_Selectable_refresh']=Window_Selectable['prototype']['refresh'],Window_Selectable[_0x59ef57(0x263)][_0x59ef57(0x3d1)]=function(){const _0x26c651=_0x59ef57;this[_0x26c651(0xe9)](),VisuMZ[_0x26c651(0x3a2)][_0x26c651(0x3b3)][_0x26c651(0x36e)](this);},Window_Selectable[_0x59ef57(0x263)][_0x59ef57(0xe9)]=function(){const _0x256961=_0x59ef57;for(const _0x60ef50 of Object[_0x256961(0x1d2)](this[_0x256961(0x4ba)])){_0x60ef50[_0x256961(0x2fb)]();}},VisuMZ['ItemsEquipsCore'][_0x59ef57(0x3a0)]=Window_Selectable[_0x59ef57(0x263)][_0x59ef57(0x271)],Window_Selectable[_0x59ef57(0x263)]['update']=function(){const _0x5460ac=_0x59ef57;this['updateNewLabelOpacity'](),VisuMZ[_0x5460ac(0x3a2)]['Window_Selectable_update']['call'](this);},Window_Selectable[_0x59ef57(0x263)][_0x59ef57(0x18a)]=function(){const _0xb75167=_0x59ef57;if(!this[_0xb75167(0x13d)]())return;const _0x13666f=this[_0xb75167(0x347)];this[_0xb75167(0x163)]+=this['_newLabelOpacityChange'];(this[_0xb75167(0x163)]>=_0x13666f||this[_0xb75167(0x163)]<=0x0)&&(this[_0xb75167(0x2b4)]*=-0x1);this['_newLabelOpacity']=this['_newLabelOpacity'][_0xb75167(0xa7)](0x0,_0x13666f);for(const _0x4882bc of Object['values'](this['_newLabelSprites'])){_0x4882bc[_0xb75167(0x164)]=this[_0xb75167(0x163)];}},Window_Selectable[_0x59ef57(0x263)][_0x59ef57(0xb9)]=function(_0x3a76d8){const _0x37b940=_0x59ef57,_0x99d9d7=this['_newLabelSprites'];if(_0x99d9d7[_0x3a76d8])return _0x99d9d7[_0x3a76d8];else{const _0x592fc7=new Sprite_NewLabel();return _0x99d9d7[_0x3a76d8]=_0x592fc7,this[_0x37b940(0x2e5)](_0x592fc7),_0x592fc7;}},Window_Selectable[_0x59ef57(0x263)]['placeNewLabel']=function(_0xb02428,_0x43412a,_0x3539bf){const _0x59d431=_0x59ef57;let _0x14551d='';if(DataManager[_0x59d431(0x327)](_0xb02428))_0x14551d=_0x59d431(0x246)[_0x59d431(0x46e)](_0xb02428['id']);else{if(DataManager[_0x59d431(0x189)](_0xb02428))_0x14551d='weapon-%1'['format'](_0xb02428['id']);else{if(DataManager[_0x59d431(0x3d8)](_0xb02428))_0x14551d='armor-%1'['format'](_0xb02428['id']);else return;}}const _0x5aa16b=this[_0x59d431(0xb9)](_0x14551d);_0x5aa16b[_0x59d431(0x3eb)](_0x43412a,_0x3539bf),_0x5aa16b['show'](),_0x5aa16b[_0x59d431(0x164)]=this[_0x59d431(0x163)];},Window_ItemCategory[_0x59ef57(0x4c1)]=VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x16f)]['Categories'][_0x59ef57(0x126)],Window_ItemCategory['categoryItemTypes']=[_0x59ef57(0x34d),_0x59ef57(0xe1),_0x59ef57(0x1fa),_0x59ef57(0x12b),_0x59ef57(0x17f),'BattleUsable',_0x59ef57(0x4ed),_0x59ef57(0x47c)],VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x14c)]=Window_ItemCategory[_0x59ef57(0x263)]['initialize'],Window_ItemCategory['prototype']['initialize']=function(_0x28cc41){const _0x24b010=_0x59ef57;VisuMZ[_0x24b010(0x3a2)][_0x24b010(0x14c)][_0x24b010(0x36e)](this,_0x28cc41),this[_0x24b010(0x1be)](_0x28cc41);},Window_ItemCategory[_0x59ef57(0x263)]['createCategoryNameWindow']=function(_0x3b9dfa){const _0x4f31df=_0x59ef57,_0x5b2ea2=new Rectangle(0x0,0x0,_0x3b9dfa[_0x4f31df(0x1e6)],_0x3b9dfa[_0x4f31df(0x388)]);this['_categoryNameWindow']=new Window_Base(_0x5b2ea2),this[_0x4f31df(0x369)]['opacity']=0x0,this[_0x4f31df(0x1ca)](this[_0x4f31df(0x369)]),this['updateCategoryNameWindow']();},Window_ItemCategory['prototype'][_0x59ef57(0x1ae)]=function(){const _0x5631b3=_0x59ef57;return Imported['VisuMZ_0_CoreEngine']&&Window_HorzCommand[_0x5631b3(0x263)]['isUseModernControls'][_0x5631b3(0x36e)](this);},Window_ItemCategory[_0x59ef57(0x263)][_0x59ef57(0x399)]=function(){},Window_ItemCategory[_0x59ef57(0x263)][_0x59ef57(0x4fd)]=function(){const _0x2f6f79=_0x59ef57;if(!this[_0x2f6f79(0x1ae)]())Window_HorzCommand['prototype']['playOkSound'][_0x2f6f79(0x36e)](this);},Window_ItemCategory[_0x59ef57(0x263)]['maxCols']=function(){const _0x592bfa=_0x59ef57;return this['_list']?this[_0x592bfa(0x1e1)]():0x4;},Window_ItemCategory[_0x59ef57(0x263)][_0x59ef57(0x271)]=function(){const _0x15c29d=_0x59ef57;Window_HorzCommand[_0x15c29d(0x263)][_0x15c29d(0x271)][_0x15c29d(0x36e)](this),this[_0x15c29d(0x442)]&&this['_itemWindow'][_0x15c29d(0x393)](this[_0x15c29d(0x43d)]());},Window_ItemCategory[_0x59ef57(0x263)][_0x59ef57(0x28e)]=function(){const _0x4dfd97=_0x59ef57;if(this[_0x4dfd97(0xcd)]()){const _0x49c1e6=this[_0x4dfd97(0x1a7)]();if(this[_0x4dfd97(0x442)]&&this['_itemWindow'][_0x4dfd97(0x487)]()<=0x1)Input[_0x4dfd97(0x216)](_0x4dfd97(0x34c))&&this[_0x4dfd97(0x214)](Input[_0x4dfd97(0x2cb)](_0x4dfd97(0x34c))),Input[_0x4dfd97(0x216)]('left')&&this[_0x4dfd97(0x32e)](Input[_0x4dfd97(0x2cb)](_0x4dfd97(0xc7)));else this[_0x4dfd97(0x442)]&&this[_0x4dfd97(0x442)][_0x4dfd97(0x487)]()>0x1&&(Input['isRepeated'](_0x4dfd97(0x22a))&&!Input[_0x4dfd97(0x218)](_0x4dfd97(0x427))&&this[_0x4dfd97(0x214)](Input[_0x4dfd97(0x2cb)]('pagedown')),Input[_0x4dfd97(0x216)](_0x4dfd97(0xfb))&&!Input[_0x4dfd97(0x218)](_0x4dfd97(0x427))&&this[_0x4dfd97(0x32e)](Input[_0x4dfd97(0x2cb)]('pageup')));this[_0x4dfd97(0x1a7)]()!==_0x49c1e6&&this[_0x4dfd97(0x411)]();}},Window_ItemCategory[_0x59ef57(0x263)][_0x59ef57(0x3f1)]=function(){const _0x3342ae=_0x59ef57;if(this[_0x3342ae(0x1ae)]())return;Window_HorzCommand[_0x3342ae(0x263)]['processHandling'][_0x3342ae(0x36e)](this);},Window_ItemCategory[_0x59ef57(0x263)][_0x59ef57(0x371)]=function(){const _0x826cc0=_0x59ef57;return this[_0x826cc0(0x1ae)]()?![]:Window_HorzCommand[_0x826cc0(0x263)][_0x826cc0(0x371)][_0x826cc0(0x36e)](this);},Window_ItemCategory[_0x59ef57(0x263)]['processTouchModernControls']=function(){const _0x4aa9ef=_0x59ef57;if(this[_0x4aa9ef(0x485)]()){TouchInput['isTriggered']()&&this[_0x4aa9ef(0x45b)](!![]);if(TouchInput[_0x4aa9ef(0x432)]())this[_0x4aa9ef(0x2bc)]();else TouchInput['isCancelled']()&&this[_0x4aa9ef(0x2db)]();}},Window_ItemCategory[_0x59ef57(0x263)][_0x59ef57(0x45b)]=function(_0x3012b5){const _0x58b794=_0x59ef57;this['isUseModernControls']()?this[_0x58b794(0xf6)](!![]):Window_HorzCommand[_0x58b794(0x263)][_0x58b794(0x45b)][_0x58b794(0x36e)](this,_0x3012b5);},Window_ItemCategory[_0x59ef57(0x263)][_0x59ef57(0xf6)]=function(_0x11a0e8){const _0x29412e=_0x59ef57;this[_0x29412e(0xac)]=![];if(this[_0x29412e(0xcd)]()){const _0x4a09ae=this['index'](),_0x1f3952=this[_0x29412e(0x49c)]();_0x1f3952>=0x0&&_0x1f3952!==this[_0x29412e(0x1a7)]()&&this[_0x29412e(0x195)](_0x1f3952),_0x11a0e8&&this[_0x29412e(0x1a7)]()!==_0x4a09ae&&this[_0x29412e(0x411)]();}},Window_ItemCategory['prototype'][_0x59ef57(0x441)]=function(){const _0x37b79f=_0x59ef57;this[_0x37b79f(0x343)](),this[_0x37b79f(0x195)](this[_0x37b79f(0x1a7)]());},Window_ItemCategory[_0x59ef57(0x263)][_0x59ef57(0x343)]=function(){const _0x9e3d73=_0x59ef57;for(const _0x459736 of Window_ItemCategory['categoryList']){this[_0x9e3d73(0x26d)](_0x459736);}},Window_ItemCategory[_0x59ef57(0x263)][_0x59ef57(0x26d)]=function(_0x12cb5a){const _0x263f7f=_0x59ef57,_0x4a9ca7=_0x12cb5a['Type'],_0x57d286=_0x12cb5a[_0x263f7f(0x325)],_0x236463=_0x12cb5a['SwitchID']||0x0;if(_0x236463>0x0&&!$gameSwitches[_0x263f7f(0x41e)](_0x236463))return;let _0x64737b='',_0x177ac5='category',_0x5cb9da=_0x4a9ca7;if(_0x4a9ca7[_0x263f7f(0xf0)](/Category:(.*)/i))_0x64737b=String(RegExp['$1'])['trim']();else{if(Window_ItemCategory[_0x263f7f(0x2c7)][_0x263f7f(0x291)](_0x4a9ca7))_0x64737b=VisuMZ['ItemsEquipsCore'][_0x263f7f(0x16f)]['Categories'][_0x4a9ca7];else{if(['AllItems',_0x263f7f(0x2a4)][_0x263f7f(0x291)](_0x4a9ca7))_0x64737b=TextManager[_0x263f7f(0x1bb)];else{if(_0x4a9ca7===_0x263f7f(0x1cc))_0x64737b=TextManager[_0x263f7f(0xbd)];else{if(_0x4a9ca7==='AllWeapons')_0x64737b=TextManager[_0x263f7f(0x306)];else{if(_0x4a9ca7===_0x263f7f(0x17e))_0x64737b=TextManager[_0x263f7f(0x27e)];else{if(_0x4a9ca7[_0x263f7f(0xf0)](/WTYPE:(\d+)/i))_0x64737b=$dataSystem[_0x263f7f(0x408)][Number(RegExp['$1'])]||'';else{if(_0x4a9ca7[_0x263f7f(0xf0)](/ATYPE:(\d+)/i))_0x64737b=$dataSystem['armorTypes'][Number(RegExp['$1'])]||'';else _0x4a9ca7['match'](/ETYPE:(\d+)/i)&&(_0x64737b=$dataSystem['equipTypes'][Number(RegExp['$1'])]||'');}}}}}}}if(TextManager['parseLocalizedText']&&TextManager[_0x263f7f(0x1ea)]()){const _0x563cc4=_0x64737b[_0x263f7f(0x367)]()['trim']();if($dataLocalization[_0x563cc4]&&_0x563cc4['length']>0x0){const _0x1369d7=ConfigManager[_0x263f7f(0x12d)]||_0x263f7f(0x309);_0x64737b=$dataLocalization[_0x563cc4][_0x1369d7]||_0x263f7f(0x344);}}_0x57d286>0x0&&this[_0x263f7f(0x44e)]()!==_0x263f7f(0x32d)&&(_0x64737b=_0x263f7f(0x320)[_0x263f7f(0x46e)](_0x57d286,_0x64737b)),this['addCommand'](_0x64737b,_0x177ac5,!![],_0x5cb9da);},Window_ItemCategory['prototype'][_0x59ef57(0xd1)]=function(){const _0x1e55f2=_0x59ef57;return VisuMZ[_0x1e55f2(0x3a2)][_0x1e55f2(0x16f)][_0x1e55f2(0x454)][_0x1e55f2(0x3f4)];},Window_ItemCategory['prototype'][_0x59ef57(0x23d)]=function(_0x405940){const _0x86ce55=_0x59ef57,_0xab51d3=this[_0x86ce55(0xe4)](_0x405940);if(_0xab51d3==='iconText')this['drawItemStyleIconText'](_0x405940);else _0xab51d3==='icon'?this[_0x86ce55(0xbe)](_0x405940):Window_HorzCommand[_0x86ce55(0x263)][_0x86ce55(0x23d)][_0x86ce55(0x36e)](this,_0x405940);},Window_ItemCategory[_0x59ef57(0x263)][_0x59ef57(0x44e)]=function(){const _0x313d27=_0x59ef57;return VisuMZ['ItemsEquipsCore'][_0x313d27(0x16f)][_0x313d27(0x454)]['Style'];},Window_ItemCategory['prototype']['categoryStyleCheck']=function(_0x415bca){const _0x8f0a90=_0x59ef57;if(_0x415bca<0x0)return _0x8f0a90(0x32d);const _0x1f2d43=this['categoryStyle']();if(_0x1f2d43!==_0x8f0a90(0x13e))return _0x1f2d43;else{const _0x7c4f31=this['commandName'](_0x415bca);if(_0x7c4f31['match'](/\\I\[(\d+)\]/i)){const _0x38d839=this[_0x8f0a90(0x1e2)](_0x415bca),_0xeb6e0=this[_0x8f0a90(0x349)](_0x7c4f31)[_0x8f0a90(0x1e6)];return _0xeb6e0<=_0x38d839['width']?_0x8f0a90(0x4c3):_0x8f0a90(0x279);}else return _0x8f0a90(0x32d);}},Window_ItemCategory['prototype'][_0x59ef57(0x233)]=function(_0x5bffe6){const _0x11bc17=_0x59ef57,_0x23e0d2=this[_0x11bc17(0x1e2)](_0x5bffe6),_0x26adac=this[_0x11bc17(0x2f6)](_0x5bffe6),_0x143b5e=this[_0x11bc17(0x349)](_0x26adac)[_0x11bc17(0x1e6)];this['changePaintOpacity'](this[_0x11bc17(0x4c0)](_0x5bffe6));const _0x4660b1=this[_0x11bc17(0xd1)]();if(_0x4660b1==='right')this[_0x11bc17(0x2c8)](_0x26adac,_0x23e0d2['x']+_0x23e0d2[_0x11bc17(0x1e6)]-_0x143b5e,_0x23e0d2['y'],_0x143b5e);else{if(_0x4660b1===_0x11bc17(0x206)){const _0x3663f7=_0x23e0d2['x']+Math[_0x11bc17(0x4bd)]((_0x23e0d2[_0x11bc17(0x1e6)]-_0x143b5e)/0x2);this[_0x11bc17(0x2c8)](_0x26adac,_0x3663f7,_0x23e0d2['y'],_0x143b5e);}else this[_0x11bc17(0x2c8)](_0x26adac,_0x23e0d2['x'],_0x23e0d2['y'],_0x143b5e);}},Window_ItemCategory['prototype'][_0x59ef57(0xbe)]=function(_0x1fec2f){const _0x3fd6e0=_0x59ef57,_0x32aaa8=this[_0x3fd6e0(0x2f6)](_0x1fec2f);if(_0x32aaa8[_0x3fd6e0(0xf0)](/\\I\[(\d+)\]/i)){const _0x174060=Number(RegExp['$1'])||0x0,_0xb47285=this[_0x3fd6e0(0x1e2)](_0x1fec2f),_0x37093b=_0xb47285['x']+Math[_0x3fd6e0(0x4bd)]((_0xb47285['width']-ImageManager[_0x3fd6e0(0x1a2)])/0x2),_0x294588=_0xb47285['y']+(_0xb47285['height']-ImageManager[_0x3fd6e0(0xce)])/0x2;this['drawIcon'](_0x174060,_0x37093b,_0x294588);}},VisuMZ['ItemsEquipsCore']['Window_ItemCategory_setItemWindow']=Window_ItemCategory[_0x59ef57(0x263)][_0x59ef57(0xda)],Window_ItemCategory[_0x59ef57(0x263)][_0x59ef57(0xda)]=function(_0x155790){const _0xd5eb16=_0x59ef57;VisuMZ[_0xd5eb16(0x3a2)][_0xd5eb16(0x198)][_0xd5eb16(0x36e)](this,_0x155790),_0x155790[_0xd5eb16(0x447)]=this;},Window_ItemCategory[_0x59ef57(0x263)][_0x59ef57(0x453)]=function(){const _0x33da1a=_0x59ef57;Window_HorzCommand[_0x33da1a(0x263)][_0x33da1a(0x453)][_0x33da1a(0x36e)](this);if(this[_0x33da1a(0x369)])this['updateCategoryNameWindow']();},Window_ItemCategory['prototype'][_0x59ef57(0x253)]=function(){const _0x3adb74=_0x59ef57,_0x35bd67=this['_categoryNameWindow'];_0x35bd67[_0x3adb74(0x10e)][_0x3adb74(0x4b8)]();const _0x493bb7=this['categoryStyleCheck'](this[_0x3adb74(0x1a7)]());if(_0x493bb7==='icon'){const _0x42ba37=this['itemLineRect'](this['index']());let _0x3ff1ab=this['commandName'](this[_0x3adb74(0x1a7)]());_0x3ff1ab=_0x3ff1ab[_0x3adb74(0xd7)](/\\I\[(\d+)\]/gi,''),_0x35bd67['resetFontSettings'](),this[_0x3adb74(0x147)](_0x3ff1ab,_0x42ba37),this['categoryNameWindowDrawText'](_0x3ff1ab,_0x42ba37),this['categoryNameWindowCenter'](_0x3ff1ab,_0x42ba37);}},Window_ItemCategory[_0x59ef57(0x263)][_0x59ef57(0x147)]=function(_0x122a72,_0x4f5d2d){},Window_ItemCategory[_0x59ef57(0x263)][_0x59ef57(0x28c)]=function(_0x38d7e5,_0x3e1b04){const _0x1160eb=_0x59ef57,_0x14c04e=this[_0x1160eb(0x369)];_0x14c04e[_0x1160eb(0x207)](_0x38d7e5,0x0,_0x3e1b04['y'],_0x14c04e[_0x1160eb(0xd2)],_0x1160eb(0x206));},Window_ItemCategory[_0x59ef57(0x263)][_0x59ef57(0x39e)]=function(_0x64a114,_0xb65882){const _0x234453=_0x59ef57,_0x3ff540=this[_0x234453(0x369)],_0x3c8a3a=$gameSystem[_0x234453(0x19c)](),_0x71b149=_0xb65882['x']+Math[_0x234453(0x4bd)](_0xb65882[_0x234453(0x1e6)]/0x2)+_0x3c8a3a;_0x3ff540['x']=_0x3ff540[_0x234453(0x1e6)]/-0x2+_0x71b149,_0x3ff540['y']=Math[_0x234453(0x4bd)](_0xb65882['height']/0x2);},Window_ItemList[_0x59ef57(0x263)][_0x59ef57(0x28e)]=function(){const _0x3012f4=_0x59ef57;if(this[_0x3012f4(0xcd)]()){const _0x375308=this[_0x3012f4(0x1a7)]();if(this['maxCols']()<=0x1)!this[_0x3012f4(0x251)](_0x3012f4(0x22a))&&Input[_0x3012f4(0x2cb)](_0x3012f4(0x22a))&&this[_0x3012f4(0x1c1)](),!this[_0x3012f4(0x251)](_0x3012f4(0xfb))&&Input[_0x3012f4(0x2cb)](_0x3012f4(0xfb))&&this[_0x3012f4(0x23c)]();else this[_0x3012f4(0x487)]()>0x1&&(Input[_0x3012f4(0x216)]('right')&&this['cursorRight'](Input[_0x3012f4(0x2cb)](_0x3012f4(0x34c))),Input[_0x3012f4(0x216)](_0x3012f4(0xc7))&&this[_0x3012f4(0x32e)](Input[_0x3012f4(0x2cb)](_0x3012f4(0xc7))),this[_0x3012f4(0x2c5)]()?(Input[_0x3012f4(0x2cb)](_0x3012f4(0x22a))&&Input[_0x3012f4(0x218)]('shift')&&this[_0x3012f4(0x1c1)](),Input['isTriggered'](_0x3012f4(0xfb))&&Input['isPressed'](_0x3012f4(0x427))&&this[_0x3012f4(0x23c)]()):(Input['isTriggered']('pagedown')&&this[_0x3012f4(0x1c1)](),Input[_0x3012f4(0x2cb)](_0x3012f4(0xfb))&&this[_0x3012f4(0x23c)]()));Input[_0x3012f4(0x216)](_0x3012f4(0x310))&&(Input[_0x3012f4(0x218)](_0x3012f4(0x427))&&this[_0x3012f4(0x283)]()?this[_0x3012f4(0x1c1)]():this[_0x3012f4(0x477)](Input[_0x3012f4(0x2cb)](_0x3012f4(0x310)))),Input[_0x3012f4(0x216)]('up')&&(Input[_0x3012f4(0x218)](_0x3012f4(0x427))&&this[_0x3012f4(0x283)]()?this['cursorPageup']():this[_0x3012f4(0x385)](Input['isTriggered']('up'))),Imported[_0x3012f4(0x492)]&&this[_0x3012f4(0x399)](),this[_0x3012f4(0x1a7)]()!==_0x375308&&this[_0x3012f4(0x411)]();}},Window_ItemList['prototype'][_0x59ef57(0x2c5)]=function(){const _0x54ce2d=_0x59ef57,_0x46ca95=SceneManager[_0x54ce2d(0xd8)],_0x3ef53d=[Scene_Item,Scene_Shop];return _0x3ef53d['includes'](_0x46ca95[_0x54ce2d(0x183)]);},Window_ItemList[_0x59ef57(0x263)]['activate']=function(){const _0x51dad6=_0x59ef57;Window_Selectable[_0x51dad6(0x263)][_0x51dad6(0x300)][_0x51dad6(0x36e)](this),this['_categoryWindow']&&this[_0x51dad6(0x447)]['isUseModernControls']()&&this[_0x51dad6(0x447)][_0x51dad6(0x300)]();},Window_ItemList[_0x59ef57(0x263)][_0x59ef57(0x37b)]=function(){const _0x132bfb=_0x59ef57;Window_Selectable[_0x132bfb(0x263)][_0x132bfb(0x37b)][_0x132bfb(0x36e)](this),this['_categoryWindow']&&this[_0x132bfb(0x447)]['isUseModernControls']()&&this[_0x132bfb(0x447)]['deactivate']();},Window_ItemList[_0x59ef57(0x263)]['setCategory']=function(_0x5a8d8a){const _0x540e18=_0x59ef57;this['_category']!==_0x5a8d8a&&(this[_0x540e18(0x4ca)]=_0x5a8d8a,this[_0x540e18(0x3d1)](),this[_0x540e18(0x447)]&&this[_0x540e18(0x447)][_0x540e18(0x1ae)]()?this['smoothSelect'](0x0):this[_0x540e18(0x31b)](0x0,0x0));},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x402)]=Window_ItemList[_0x59ef57(0x263)][_0x59ef57(0x487)],Window_ItemList[_0x59ef57(0x263)][_0x59ef57(0x487)]=function(){const _0x31e9e=_0x59ef57;if(SceneManager[_0x31e9e(0xd8)][_0x31e9e(0x183)]===Scene_Battle)return VisuMZ[_0x31e9e(0x3a2)][_0x31e9e(0x402)][_0x31e9e(0x36e)](this);else return SceneManager[_0x31e9e(0xd8)][_0x31e9e(0x183)]===Scene_Map?VisuMZ[_0x31e9e(0x3a2)][_0x31e9e(0x402)]['call'](this):VisuMZ[_0x31e9e(0x3a2)]['Settings'][_0x31e9e(0xb6)]['ListWindowCols'];},VisuMZ[_0x59ef57(0x3a2)]['Window_ItemList_colSpacing']=Window_ItemList[_0x59ef57(0x263)][_0x59ef57(0x13c)],Window_ItemList['prototype'][_0x59ef57(0x13c)]=function(){const _0x30f9b1=_0x59ef57;return this[_0x30f9b1(0x487)]()<=0x1?Window_Selectable[_0x30f9b1(0x263)][_0x30f9b1(0x13c)][_0x30f9b1(0x36e)](this):VisuMZ[_0x30f9b1(0x3a2)][_0x30f9b1(0x44c)][_0x30f9b1(0x36e)](this);},Window_ItemList['prototype']['includes']=function(_0x452d07){const _0x3affa6=_0x59ef57;switch(this['_category']){case _0x3affa6(0x239):return DataManager[_0x3affa6(0x327)](_0x452d07);case'RegularItems':return DataManager[_0x3affa6(0x327)](_0x452d07)&&_0x452d07[_0x3affa6(0x1ed)]===0x1;case _0x3affa6(0x1cc):return DataManager[_0x3affa6(0x327)](_0x452d07)&&_0x452d07[_0x3affa6(0x1ed)]===0x2;case _0x3affa6(0x34d):return DataManager['isItem'](_0x452d07)&&_0x452d07['itypeId']===0x3;case'HiddenItemB':return DataManager['isItem'](_0x452d07)&&_0x452d07['itypeId']===0x4;case _0x3affa6(0x12b):return DataManager[_0x3affa6(0x327)](_0x452d07)&&_0x452d07[_0x3affa6(0x405)];case'Nonconsumable':return DataManager[_0x3affa6(0x327)](_0x452d07)&&!_0x452d07[_0x3affa6(0x405)];case _0x3affa6(0x17f):return DataManager[_0x3affa6(0x327)](_0x452d07)&&[0x0][_0x3affa6(0x291)](_0x452d07['occasion']);case _0x3affa6(0xb0):return DataManager[_0x3affa6(0x327)](_0x452d07)&&[0x0,0x1][_0x3affa6(0x291)](_0x452d07[_0x3affa6(0x40f)]);case _0x3affa6(0x4ed):return DataManager[_0x3affa6(0x327)](_0x452d07)&&[0x0,0x2]['includes'](_0x452d07[_0x3affa6(0x40f)]);case _0x3affa6(0x47c):return DataManager['isItem'](_0x452d07)&&[0x3][_0x3affa6(0x291)](_0x452d07[_0x3affa6(0x40f)]);case _0x3affa6(0x110):return DataManager[_0x3affa6(0x189)](_0x452d07);case _0x3affa6(0x17e):return DataManager['isArmor'](_0x452d07);default:if(this[_0x3affa6(0x4ca)][_0x3affa6(0xf0)](/WTYPE:(\d+)/i))return DataManager['isWeapon'](_0x452d07)&&_0x452d07[_0x3affa6(0x45f)]===Number(RegExp['$1']);else{if(this[_0x3affa6(0x4ca)][_0x3affa6(0xf0)](/WTYPE:(.*)/i)){const _0x5b2f81=$dataSystem['weaponTypes'][_0x3affa6(0x179)](String(RegExp['$1'])[_0x3affa6(0x298)]());return DataManager[_0x3affa6(0x189)](_0x452d07)&&_0x452d07[_0x3affa6(0x45f)]===_0x5b2f81;}else{if(this[_0x3affa6(0x4ca)]['match'](/ATYPE:(\d+)/i))return DataManager['isArmor'](_0x452d07)&&_0x452d07[_0x3affa6(0x22b)]===Number(RegExp['$1']);else{if(this['_category'][_0x3affa6(0xf0)](/ATYPE:(.*)/i)){const _0x3f457f=$dataSystem[_0x3affa6(0x3e4)][_0x3affa6(0x179)](String(RegExp['$1'])[_0x3affa6(0x298)]());return DataManager[_0x3affa6(0x3d8)](_0x452d07)&&_0x452d07[_0x3affa6(0x22b)]===_0x3f457f;}else{if(this[_0x3affa6(0x4ca)]['match'](/ETYPE:(\d+)/i))return!!_0x452d07&&_0x452d07[_0x3affa6(0x352)]===Number(RegExp['$1']);else{if(this[_0x3affa6(0x4ca)][_0x3affa6(0xf0)](/ETYPE:(.*)/i)){const _0x21829d=$dataSystem['equipTypes'][_0x3affa6(0x179)](String(RegExp['$1'])[_0x3affa6(0x298)]());return DataManager[_0x3affa6(0x3d8)](_0x452d07)&&_0x452d07[_0x3affa6(0x352)]===_0x21829d;}else{if(this[_0x3affa6(0x4ca)]['match'](/Category:(.*)/i))return!!_0x452d07&&_0x452d07[_0x3affa6(0x293)]['includes'](String(RegExp['$1'])[_0x3affa6(0x4f2)]()['trim']());}}}}}}}return![];},VisuMZ['ItemsEquipsCore']['Window_ItemList_makeItemList']=Window_ItemList[_0x59ef57(0x263)][_0x59ef57(0x4cc)],Window_ItemList[_0x59ef57(0x263)]['makeItemList']=function(){const _0x4acdac=_0x59ef57;VisuMZ[_0x4acdac(0x3a2)][_0x4acdac(0x25c)][_0x4acdac(0x36e)](this);if(this['canSortListItemScene']())this['sortListItemScene']();},Window_ItemList[_0x59ef57(0x263)]['canSortListItemScene']=function(){const _0x524048=_0x59ef57,_0x2dd7fb=[_0x524048(0x12f),_0x524048(0x21f),_0x524048(0x338),_0x524048(0x3f2)],_0x103873=SceneManager[_0x524048(0xd8)];return _0x2dd7fb[_0x524048(0x291)](_0x103873[_0x524048(0x183)]['name']);},Window_ItemList[_0x59ef57(0x263)]['sortListItemScene']=function(){const _0x51b5ef=_0x59ef57,_0x58c79b=Window_ItemCategory[_0x51b5ef(0x4c1)],_0x52a865=_0x58c79b[_0x51b5ef(0x1ce)](_0x160117=>_0x160117['Type']===this[_0x51b5ef(0x4ca)]);if(!_0x52a865){VisuMZ[_0x51b5ef(0x3a2)][_0x51b5ef(0x328)](this[_0x51b5ef(0x111)]);return;}const _0x2bc054=((_0x52a865[_0x51b5ef(0x4af)]??'ID')||'ID')['toUpperCase']()[_0x51b5ef(0x298)]();_0x2bc054===_0x51b5ef(0x4e1)?this[_0x51b5ef(0x111)][_0x51b5ef(0x2af)]((_0x852539,_0x3b0772)=>{const _0x547c7c=_0x51b5ef;if(!!_0x852539&&!!_0x3b0772)return _0x852539['name'][_0x547c7c(0x290)](_0x3b0772[_0x547c7c(0x26b)]);return 0x0;}):VisuMZ[_0x51b5ef(0x3a2)][_0x51b5ef(0x328)](this[_0x51b5ef(0x111)]);},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x328)]=function(_0x356fb1){const _0x136e0f=_0x59ef57;return _0x356fb1[_0x136e0f(0x2af)]((_0x3af775,_0x50f973)=>{const _0x5a205a=_0x136e0f;if(!!_0x3af775&&!!_0x50f973){if(_0x3af775[_0x5a205a(0x4b1)]===undefined)VisuMZ[_0x5a205a(0x3a2)][_0x5a205a(0x44a)](_0x3af775);if(_0x50f973[_0x5a205a(0x4b1)]===undefined)VisuMZ[_0x5a205a(0x3a2)][_0x5a205a(0x44a)](_0x50f973);const _0x19feae=_0x3af775['sortPriority'],_0x59f9ea=_0x50f973[_0x5a205a(0x4b1)];if(_0x19feae!==_0x59f9ea)return _0x59f9ea-_0x19feae;return _0x3af775['id']-_0x50f973['id'];}return 0x0;}),_0x356fb1;},Window_ItemList[_0x59ef57(0x263)]['isShowNew']=function(){return!![];},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x117)]=Window_ItemList[_0x59ef57(0x263)][_0x59ef57(0x23d)],Window_ItemList[_0x59ef57(0x263)][_0x59ef57(0x23d)]=function(_0x5a5cb2){const _0x42151f=_0x59ef57;VisuMZ[_0x42151f(0x3a2)][_0x42151f(0x117)][_0x42151f(0x36e)](this,_0x5a5cb2),this['placeItemNewLabel'](_0x5a5cb2);},Window_ItemList[_0x59ef57(0x263)]['drawItemNumber']=function(_0x5ad350,_0x44d03f,_0xf03eb5,_0x5f107e){const _0x55684d=_0x59ef57;Window_Selectable['prototype'][_0x55684d(0x130)][_0x55684d(0x36e)](this,_0x5ad350,_0x44d03f,_0xf03eb5,_0x5f107e);},Window_ItemList[_0x59ef57(0x263)]['placeItemNewLabel']=function(_0x339a7e){const _0x55ff6d=_0x59ef57,_0x77eda6=this[_0x55ff6d(0x4e7)](_0x339a7e);if(!_0x77eda6||!this[_0x55ff6d(0x13d)]())return;if(!$gameParty[_0x55ff6d(0xc5)](_0x77eda6))return;const _0x310da4=this['itemLineRect'](_0x339a7e),_0x228d44=_0x310da4['x'],_0x1a4687=_0x310da4['y']+(this[_0x55ff6d(0x482)]()-0x20)/0x2,_0x53e213=VisuMZ[_0x55ff6d(0x3a2)][_0x55ff6d(0x16f)]['New'][_0x55ff6d(0x2f5)],_0x57a967=VisuMZ['ItemsEquipsCore']['Settings']['New'][_0x55ff6d(0x284)];this[_0x55ff6d(0x2b6)](_0x77eda6,_0x228d44+_0x53e213,_0x1a4687+_0x57a967);},Window_ItemList[_0x59ef57(0x263)][_0x59ef57(0x10a)]=function(_0xc9398b){const _0x3633f7=_0x59ef57;this[_0x3633f7(0xe7)]=_0xc9398b,this[_0x3633f7(0x453)]();},VisuMZ[_0x59ef57(0x3a2)]['Window_ItemList_updateHelp']=Window_ItemList[_0x59ef57(0x263)]['updateHelp'],Window_ItemList[_0x59ef57(0x263)][_0x59ef57(0x410)]=function(){const _0xb27a56=_0x59ef57;VisuMZ[_0xb27a56(0x3a2)][_0xb27a56(0xed)]['call'](this),this[_0xb27a56(0xe7)]&&this['_statusWindow'][_0xb27a56(0x183)]===Window_ShopStatus&&this[_0xb27a56(0xe7)][_0xb27a56(0x228)](this[_0xb27a56(0x1bb)]());},Window_BattleItem[_0x59ef57(0x263)][_0x59ef57(0x13f)]=function(_0x27117b){const _0xfbcc19=_0x59ef57;return BattleManager[_0xfbcc19(0x481)]()?BattleManager['actor']()['canUse'](_0x27117b):Window_ItemList[_0xfbcc19(0x263)]['isEnabled'][_0xfbcc19(0x36e)](this,_0x27117b);},Window_EventItem[_0x59ef57(0x263)][_0x59ef57(0x13d)]=function(){return![];},Window_EquipStatus['prototype'][_0x59ef57(0x138)]=function(){const _0x449f4b=_0x59ef57;return VisuMZ[_0x449f4b(0x3a2)][_0x449f4b(0x16f)][_0x449f4b(0x4b0)][_0x449f4b(0x499)];},VisuMZ['ItemsEquipsCore'][_0x59ef57(0x22e)]=Window_EquipStatus[_0x59ef57(0x263)][_0x59ef57(0x3d1)],Window_EquipStatus[_0x59ef57(0x263)][_0x59ef57(0x3d1)]=function(){const _0x1dedc8=_0x59ef57;this[_0x1dedc8(0x2cd)](),this[_0x1dedc8(0x389)]();if(this[_0x1dedc8(0x478)])this['_actor'][_0x1dedc8(0x3d1)]();this[_0x1dedc8(0x138)]()?this['prepareRefreshItemsEquipsCoreLayout']():VisuMZ[_0x1dedc8(0x3a2)]['Window_EquipStatus_refresh'][_0x1dedc8(0x36e)](this);},Window_EquipStatus['prototype'][_0x59ef57(0x285)]=function(){const _0xfc567a=_0x59ef57;this['contents'][_0xfc567a(0x4b8)]();if(!this['_actor'])return;if(this[_0xfc567a(0x140)]()){const _0x5898cc=ImageManager[_0xfc567a(0x2e9)](this[_0xfc567a(0x478)]['getMenuImage']());_0x5898cc[_0xfc567a(0x3ea)](this[_0xfc567a(0x2ae)][_0xfc567a(0x4eb)](this));}else this['refreshItemsEquipsCoreNoMenuImage']();},Window_EquipStatus[_0x59ef57(0x263)]['isMainMenuCoreMenuImageOptionAvailable']=function(){const _0x143a59=_0x59ef57;return Imported[_0x143a59(0x225)]&&this[_0x143a59(0x478)][_0x143a59(0x2b1)]()!==''&&VisuMZ[_0x143a59(0x3a2)]['Settings']['EquipScene'][_0x143a59(0x11a)];},Window_EquipStatus['prototype'][_0x59ef57(0x2ae)]=function(){const _0xd287=_0x59ef57;VisuMZ['ItemsEquipsCore'][_0xd287(0x16f)][_0xd287(0x4b0)][_0xd287(0x135)][_0xd287(0x36e)](this),this[_0xd287(0x22f)]();},Window_EquipStatus[_0x59ef57(0x263)]['refreshItemsEquipsCoreNoMenuImage']=function(){const _0x446d6c=_0x59ef57;VisuMZ['ItemsEquipsCore'][_0x446d6c(0x16f)]['EquipScene']['DrawFaceJS'][_0x446d6c(0x36e)](this),this[_0x446d6c(0x22f)]();},Window_EquipStatus[_0x59ef57(0x263)][_0x59ef57(0x22f)]=function(){const _0x4a8d99=_0x59ef57;this[_0x4a8d99(0x389)](),VisuMZ[_0x4a8d99(0x3a2)][_0x4a8d99(0x16f)][_0x4a8d99(0x4b0)][_0x4a8d99(0x29a)]['call'](this);},Window_EquipStatus[_0x59ef57(0x263)][_0x59ef57(0x31c)]=function(_0x26f7cb,_0x5971f8,_0x1678b3,_0x29e30f,_0x2aa9b3){const _0x137898=_0x59ef57,_0x179f8e=ImageManager[_0x137898(0x2e9)](_0x26f7cb[_0x137898(0x2b1)]()),_0x5e2b08=this[_0x137898(0xd2)]-_0x179f8e[_0x137898(0x1e6)];_0x5971f8+=_0x5e2b08/0x2;if(_0x5e2b08<0x0)_0x29e30f-=_0x5e2b08;Window_StatusBase[_0x137898(0x263)][_0x137898(0x31c)]['call'](this,_0x26f7cb,_0x5971f8,_0x1678b3,_0x29e30f,_0x2aa9b3);},Window_EquipStatus[_0x59ef57(0x263)][_0x59ef57(0x11c)]=function(){const _0x375c9d=_0x59ef57;return Imported[_0x375c9d(0x492)]?VisuMZ[_0x375c9d(0x294)]['Settings']['Param'][_0x375c9d(0x3cd)]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_EquipStatus[_0x59ef57(0x263)][_0x59ef57(0x248)]=function(){const _0x3e9ee4=_0x59ef57;return VisuMZ['ItemsEquipsCore']['Settings']['EquipScene'][_0x3e9ee4(0x4a6)];},Window_EquipStatus['prototype'][_0x59ef57(0x260)]=function(){const _0x2465d1=_0x59ef57;return Imported[_0x2465d1(0x492)]&&VisuMZ['CoreEngine'][_0x2465d1(0x16f)][_0x2465d1(0x267)]['DrawIcons'];},Window_EquipStatus[_0x59ef57(0x263)][_0x59ef57(0x2a7)]=function(_0xd72315,_0x5acfd2,_0x3cc43b,_0x54bbfc){const _0x1d7471=_0x59ef57,_0x48716f=this[_0x1d7471(0x324)]();Imported[_0x1d7471(0x492)]?this[_0x1d7471(0x1db)](_0x5acfd2+_0x48716f,_0x3cc43b,_0x54bbfc,_0xd72315,![]):this[_0x1d7471(0x207)](TextManager[_0x1d7471(0x238)](_0xd72315),_0x5acfd2+_0x48716f,_0x3cc43b,_0x54bbfc);},Window_EquipStatus[_0x59ef57(0x263)][_0x59ef57(0x107)]=function(_0x10f2a8,_0xdb9b69,_0x1afb2a,_0x28e89a){const _0x4e5387=_0x59ef57,_0x4f5897=this[_0x4e5387(0x324)]();let _0x4fd48c=0x0;Imported[_0x4e5387(0x492)]?_0x4fd48c=this[_0x4e5387(0x478)][_0x4e5387(0x150)](_0x10f2a8,!![]):_0x4fd48c=this[_0x4e5387(0x478)][_0x4e5387(0x238)](_0x10f2a8);const _0x3e29a9=_0x4fd48c;this[_0x4e5387(0x207)](_0x4fd48c,_0xdb9b69,_0x1afb2a,_0x28e89a-_0x4f5897,_0x4e5387(0x34c));},Window_EquipStatus[_0x59ef57(0x263)][_0x59ef57(0x2d0)]=function(_0x165ea7,_0x52a417,_0x168bae,_0x54e402){const _0x4e60a7=_0x59ef57,_0x37e776=this[_0x4e60a7(0x324)]();let _0x3d6309=0x0,_0x99e05e=0x0,_0x2123ca='';if(this['_tempActor']){Imported[_0x4e60a7(0x492)]?(_0x3d6309=this['_actor'][_0x4e60a7(0x150)](_0x165ea7,![]),_0x99e05e=this[_0x4e60a7(0x34f)][_0x4e60a7(0x150)](_0x165ea7,![]),_0x2123ca=this[_0x4e60a7(0x34f)][_0x4e60a7(0x150)](_0x165ea7,!![])):(_0x3d6309=this[_0x4e60a7(0x478)][_0x4e60a7(0x238)](_0x165ea7),_0x99e05e=this['_tempActor']['param'](_0x165ea7),_0x2123ca=this[_0x4e60a7(0x34f)][_0x4e60a7(0x238)](_0x165ea7));const _0x387342=_0x3d6309,_0x476400=_0x99e05e;diffValue=_0x476400-_0x387342,this[_0x4e60a7(0x1bd)](ColorManager[_0x4e60a7(0x3f6)](diffValue)),this['drawText'](_0x2123ca,_0x52a417,_0x168bae,_0x54e402-_0x37e776,'right');}},Window_EquipStatus[_0x59ef57(0x263)][_0x59ef57(0x3b4)]=function(_0x172cfe,_0x1f95cd,_0x536102,_0x10e653){const _0x197701=_0x59ef57,_0x39b2f3=this[_0x197701(0x324)]();let _0x1c4514=0x0,_0xda39a=0x0,_0x423f8e=![];if(this['_tempActor']){Imported[_0x197701(0x492)]?(_0x1c4514=this[_0x197701(0x478)][_0x197701(0x150)](_0x172cfe,![]),_0xda39a=this[_0x197701(0x34f)][_0x197701(0x150)](_0x172cfe,![]),_0x423f8e=String(this['_actor'][_0x197701(0x150)](_0x172cfe,!![]))[_0x197701(0xf0)](/([%％])/i)):(_0x1c4514=this[_0x197701(0x478)][_0x197701(0x238)](_0x172cfe),_0xda39a=this['_tempActor'][_0x197701(0x238)](_0x172cfe),_0x423f8e=_0x1c4514%0x1!==0x0||_0xda39a%0x1!==0x0);const _0xba620=_0x1c4514,_0x1c661c=_0xda39a,_0x1dd1df=_0x1c661c-_0xba620;let _0x5b5189=_0x1dd1df;if(_0x423f8e)_0x5b5189=Math[_0x197701(0x2ce)](_0x1dd1df*0x64)+'%';_0x1dd1df!==0x0&&(this[_0x197701(0x1bd)](ColorManager['paramchangeTextColor'](_0x1dd1df)),_0x5b5189=(_0x1dd1df>0x0?_0x197701(0xff):_0x197701(0x491))['format'](_0x5b5189),this['drawText'](_0x5b5189,_0x1f95cd+_0x39b2f3,_0x536102,_0x10e653,'left'));}},Window_EquipStatus[_0x59ef57(0x263)][_0x59ef57(0x3e0)]=function(_0x1aa90d,_0x18b139,_0x5b0b1e,_0x19f72a,_0x461ebb){const _0x49353f=_0x59ef57;if(VisuMZ['ItemsEquipsCore'][_0x49353f(0x16f)]['EquipScene'][_0x49353f(0x2cf)]===![])return;_0x461ebb=Math[_0x49353f(0xca)](_0x461ebb||0x1,0x1);while(_0x461ebb--){_0x19f72a=_0x19f72a||this['lineHeight'](),this[_0x49353f(0x10e)]['paintOpacity']=0xa0;const _0x325073=ColorManager[_0x49353f(0x319)]();this[_0x49353f(0x10e)][_0x49353f(0x339)](_0x1aa90d+0x1,_0x18b139+0x1,_0x5b0b1e-0x2,_0x19f72a-0x2,_0x325073),this[_0x49353f(0x10e)][_0x49353f(0x425)]=0xff;}},ColorManager['getItemsEquipsCoreBackColor2']=function(){const _0x19a607=_0x59ef57,_0x33bd2d=VisuMZ[_0x19a607(0x3a2)][_0x19a607(0x16f)]['EquipScene'];let _0x2d41d5=_0x33bd2d[_0x19a607(0x38f)]!==undefined?_0x33bd2d[_0x19a607(0x38f)]:0x13;return ColorManager[_0x19a607(0x232)](_0x2d41d5);},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x1d1)]=Window_EquipCommand['prototype'][_0x59ef57(0x40e)],Window_EquipCommand[_0x59ef57(0x263)][_0x59ef57(0x40e)]=function(_0x38e6db){const _0x1df8eb=_0x59ef57;VisuMZ[_0x1df8eb(0x3a2)][_0x1df8eb(0x1d1)][_0x1df8eb(0x36e)](this,_0x38e6db),this[_0x1df8eb(0x4a3)](_0x38e6db);},Window_EquipCommand[_0x59ef57(0x263)][_0x59ef57(0x4a3)]=function(_0x380e01){const _0x20ac2b=_0x59ef57,_0x2029be=new Rectangle(0x0,0x0,_0x380e01[_0x20ac2b(0x1e6)],_0x380e01[_0x20ac2b(0x388)]);this['_commandNameWindow']=new Window_Base(_0x2029be),this[_0x20ac2b(0x443)][_0x20ac2b(0x164)]=0x0,this[_0x20ac2b(0x1ca)](this['_commandNameWindow']),this[_0x20ac2b(0x331)]();},Window_EquipCommand[_0x59ef57(0x263)][_0x59ef57(0x453)]=function(){const _0x567e77=_0x59ef57;Window_HorzCommand[_0x567e77(0x263)]['callUpdateHelp'][_0x567e77(0x36e)](this);if(this[_0x567e77(0x443)])this[_0x567e77(0x331)]();},Window_EquipCommand[_0x59ef57(0x263)][_0x59ef57(0x331)]=function(){const _0x555f02=_0x59ef57,_0x5c40e4=this[_0x555f02(0x443)];_0x5c40e4[_0x555f02(0x10e)][_0x555f02(0x4b8)]();const _0x2011a2=this['commandStyleCheck'](this[_0x555f02(0x1a7)]());if(_0x2011a2==='icon'){const _0x2ac1d6=this[_0x555f02(0x1e2)](this['index']());let _0xf204ee=this[_0x555f02(0x2f6)](this['index']());_0xf204ee=_0xf204ee[_0x555f02(0xd7)](/\\I\[(\d+)\]/gi,''),_0x5c40e4[_0x555f02(0x389)](),this[_0x555f02(0x33e)](_0xf204ee,_0x2ac1d6),this[_0x555f02(0x36b)](_0xf204ee,_0x2ac1d6),this[_0x555f02(0x28f)](_0xf204ee,_0x2ac1d6);}},Window_EquipCommand[_0x59ef57(0x263)][_0x59ef57(0x33e)]=function(_0xd35f42,_0x1e211b){},Window_EquipCommand[_0x59ef57(0x263)][_0x59ef57(0x36b)]=function(_0x541cb2,_0x563a1b){const _0x4b5f4b=_0x59ef57,_0x43322f=this[_0x4b5f4b(0x443)];_0x43322f[_0x4b5f4b(0x207)](_0x541cb2,0x0,_0x563a1b['y'],_0x43322f[_0x4b5f4b(0xd2)],'center');},Window_EquipCommand['prototype'][_0x59ef57(0x28f)]=function(_0x5b9677,_0x61665a){const _0x3a6e1c=_0x59ef57,_0x2383de=this[_0x3a6e1c(0x443)],_0x2a9142=$gameSystem[_0x3a6e1c(0x19c)](),_0x32b910=_0x61665a['x']+Math[_0x3a6e1c(0x4bd)](_0x61665a[_0x3a6e1c(0x1e6)]/0x2)+_0x2a9142;_0x2383de['x']=_0x2383de[_0x3a6e1c(0x1e6)]/-0x2+_0x32b910,_0x2383de['y']=Math[_0x3a6e1c(0x4bd)](_0x61665a[_0x3a6e1c(0x388)]/0x2);},Window_EquipCommand[_0x59ef57(0x263)][_0x59ef57(0x1ae)]=function(){const _0x2110f3=_0x59ef57;return Imported[_0x2110f3(0x492)]&&Window_HorzCommand[_0x2110f3(0x263)][_0x2110f3(0x1ae)]['call'](this);},Window_EquipCommand['prototype'][_0x59ef57(0x4fd)]=function(){const _0xc1f38e=_0x59ef57;if(this[_0xc1f38e(0x19d)]()===_0xc1f38e(0x1d8))Window_HorzCommand[_0xc1f38e(0x263)]['playOkSound'][_0xc1f38e(0x36e)](this);},Window_EquipCommand[_0x59ef57(0x263)][_0x59ef57(0x28e)]=function(){const _0x4b12e3=_0x59ef57;!this[_0x4b12e3(0x24b)]()&&Window_HorzCommand[_0x4b12e3(0x263)][_0x4b12e3(0x28e)][_0x4b12e3(0x36e)](this);},Window_EquipCommand[_0x59ef57(0x263)][_0x59ef57(0x24b)]=function(){const _0x52d303=_0x59ef57;if(!this[_0x52d303(0xcd)]())return![];if(SceneManager['_scene'][_0x52d303(0x183)]!==Scene_Equip)return![];return Input['isTriggered']('down')&&this[_0x52d303(0x292)](),![];},Window_EquipCommand[_0x59ef57(0x263)][_0x59ef57(0x292)]=function(){const _0x4e1b28=_0x59ef57;this[_0x4e1b28(0x411)](),SceneManager[_0x4e1b28(0xd8)]['commandEquip'](),SceneManager[_0x4e1b28(0xd8)][_0x4e1b28(0x4a2)]['smoothSelect'](-0x1);},Window_EquipCommand[_0x59ef57(0x263)][_0x59ef57(0x487)]=function(){const _0x29b9d7=_0x59ef57;return this[_0x29b9d7(0x1d6)]?this['_list'][_0x29b9d7(0x104)]:0x3;},Window_EquipCommand['prototype'][_0x59ef57(0x20e)]=function(){const _0x350ebb=_0x59ef57;if(this['isOpen']()&&this[_0x350ebb(0x39d)]&&SceneManager[_0x350ebb(0xd8)][_0x350ebb(0x183)]===Scene_Equip){if(this[_0x350ebb(0x371)]()&&TouchInput[_0x350ebb(0x133)]())this['onTouchSelectModernControls'](![]);else TouchInput[_0x350ebb(0x2cb)]()&&this[_0x350ebb(0x17c)](!![]);TouchInput[_0x350ebb(0x432)]()&&this[_0x350ebb(0x2bc)]();}},Window_EquipCommand[_0x59ef57(0x263)][_0x59ef57(0x17c)]=function(_0x3d9958){const _0x12811e=_0x59ef57;this[_0x12811e(0xac)]=![];const _0x440112=this['index'](),_0x4b6899=this['hitIndex'](),_0x1d1c6c=SceneManager[_0x12811e(0xd8)][_0x12811e(0x4a2)];if(_0x1d1c6c['isOpen']()&&_0x1d1c6c[_0x12811e(0x39d)]){if(_0x4b6899>=0x0)_0x4b6899===this[_0x12811e(0x1a7)]()&&(this[_0x12811e(0xac)]=!![]),this[_0x12811e(0x300)](),this[_0x12811e(0x195)](_0x4b6899);else _0x1d1c6c[_0x12811e(0x49c)]()>=0x0&&(this['deactivate'](),this['deselect']());}_0x3d9958&&this[_0x12811e(0x1a7)]()!==_0x440112&&this['playCursorSound']();},Window_EquipCommand[_0x59ef57(0x263)][_0x59ef57(0x441)]=function(){const _0x2eaccd=_0x59ef57;this[_0x2eaccd(0x41a)](),this[_0x2eaccd(0x1f8)](),this[_0x2eaccd(0x123)]();},Window_EquipCommand['prototype']['refresh']=function(){const _0x22f1aa=_0x59ef57;Window_HorzCommand['prototype']['refresh'][_0x22f1aa(0x36e)](this),this[_0x22f1aa(0xfa)]();},Window_EquipCommand[_0x59ef57(0x263)][_0x59ef57(0x41a)]=function(){const _0x4f4981=_0x59ef57;if(!this[_0x4f4981(0x156)]())return;const _0x114188=this[_0x4f4981(0x4e8)](),_0x53dd97=VisuMZ[_0x4f4981(0x3a2)]['Settings'][_0x4f4981(0x4b0)][_0x4f4981(0x255)],_0x1a6b9e=_0x114188===_0x4f4981(0x32d)?TextManager[_0x4f4981(0x23a)]:_0x4f4981(0x320)[_0x4f4981(0x46e)](_0x53dd97,TextManager[_0x4f4981(0x23a)]),_0x29dd42=this['isEquipCommandEnabled']();this['addCommand'](_0x1a6b9e,_0x4f4981(0x1d8),_0x29dd42);},Window_EquipCommand[_0x59ef57(0x263)][_0x59ef57(0x156)]=function(){const _0x547d05=_0x59ef57;return!this[_0x547d05(0x1ae)]();},Window_EquipCommand[_0x59ef57(0x263)][_0x59ef57(0x1b3)]=function(){return!![];},Window_EquipCommand[_0x59ef57(0x263)]['addOptimizeCommand']=function(){const _0x54dfa9=_0x59ef57;if(!this['isOptimizeCommandAdded']())return;const _0x190bcd=this[_0x54dfa9(0x4e8)](),_0x54e882=VisuMZ[_0x54dfa9(0x3a2)]['Settings']['EquipScene'][_0x54dfa9(0x490)],_0xec6217=_0x190bcd===_0x54dfa9(0x32d)?TextManager['optimize']:_0x54dfa9(0x320)['format'](_0x54e882,TextManager[_0x54dfa9(0x3e8)]),_0x4138fa=this[_0x54dfa9(0x155)]();this[_0x54dfa9(0x3cb)](_0xec6217,_0x54dfa9(0x3e8),_0x4138fa);},Window_EquipCommand[_0x59ef57(0x263)]['isOptimizeCommandAdded']=function(){const _0x2a3b69=_0x59ef57;return VisuMZ[_0x2a3b69(0x3a2)][_0x2a3b69(0x16f)][_0x2a3b69(0x4b0)][_0x2a3b69(0x2f1)];},Window_EquipCommand[_0x59ef57(0x263)][_0x59ef57(0x155)]=function(){return!![];},Window_EquipCommand['prototype'][_0x59ef57(0x123)]=function(){const _0xebad27=_0x59ef57;if(!this[_0xebad27(0x48e)]())return;const _0x5617c6=this['commandStyle'](),_0x289f62=VisuMZ[_0xebad27(0x3a2)][_0xebad27(0x16f)][_0xebad27(0x4b0)][_0xebad27(0x351)],_0x42f18b=_0x5617c6===_0xebad27(0x32d)?TextManager[_0xebad27(0x4b8)]:_0xebad27(0x320)[_0xebad27(0x46e)](_0x289f62,TextManager[_0xebad27(0x4b8)]),_0xfc9099=this[_0xebad27(0x3a8)]();this[_0xebad27(0x3cb)](_0x42f18b,_0xebad27(0x4b8),_0xfc9099);},Window_EquipCommand['prototype'][_0x59ef57(0x48e)]=function(){const _0x2db0d6=_0x59ef57;return VisuMZ[_0x2db0d6(0x3a2)][_0x2db0d6(0x16f)][_0x2db0d6(0x4b0)][_0x2db0d6(0x1f1)];},Window_EquipCommand[_0x59ef57(0x263)][_0x59ef57(0x3a8)]=function(){return!![];},Window_EquipCommand[_0x59ef57(0x263)][_0x59ef57(0xd1)]=function(){const _0x862f9=_0x59ef57;return VisuMZ[_0x862f9(0x3a2)][_0x862f9(0x16f)][_0x862f9(0x4b0)][_0x862f9(0x20b)];},Window_EquipCommand[_0x59ef57(0x263)][_0x59ef57(0x23d)]=function(_0xe26c0b){const _0x25b717=_0x59ef57,_0x3f83d7=this[_0x25b717(0x3e6)](_0xe26c0b);if(_0x3f83d7===_0x25b717(0x4c3))this[_0x25b717(0x233)](_0xe26c0b);else _0x3f83d7===_0x25b717(0x279)?this[_0x25b717(0xbe)](_0xe26c0b):Window_HorzCommand[_0x25b717(0x263)][_0x25b717(0x23d)][_0x25b717(0x36e)](this,_0xe26c0b);},Window_EquipCommand[_0x59ef57(0x263)][_0x59ef57(0x4e8)]=function(){const _0x411b2c=_0x59ef57;return VisuMZ['ItemsEquipsCore'][_0x411b2c(0x16f)][_0x411b2c(0x4b0)][_0x411b2c(0x250)];},Window_EquipCommand[_0x59ef57(0x263)][_0x59ef57(0x3e6)]=function(_0x3b0ebc){const _0x20013a=_0x59ef57;if(_0x3b0ebc<0x0)return _0x20013a(0x32d);const _0x245a79=this[_0x20013a(0x4e8)]();if(_0x245a79!=='auto')return _0x245a79;else{if(this[_0x20013a(0x1e1)]()>0x0){const _0x2eff34=this[_0x20013a(0x2f6)](_0x3b0ebc);if(_0x2eff34[_0x20013a(0xf0)](/\\I\[(\d+)\]/i)){const _0x560bc2=this[_0x20013a(0x1e2)](_0x3b0ebc),_0x5b4dea=this[_0x20013a(0x349)](_0x2eff34)[_0x20013a(0x1e6)];return _0x5b4dea<=_0x560bc2[_0x20013a(0x1e6)]?'iconText':_0x20013a(0x279);}}}return _0x20013a(0x32d);},Window_EquipCommand[_0x59ef57(0x263)][_0x59ef57(0x233)]=function(_0x5ae9d2){const _0x28c393=_0x59ef57,_0x4eb9ad=this[_0x28c393(0x1e2)](_0x5ae9d2),_0x49cdce=this[_0x28c393(0x2f6)](_0x5ae9d2),_0x58f400=this[_0x28c393(0x349)](_0x49cdce)['width'];this[_0x28c393(0x3d2)](this[_0x28c393(0x4c0)](_0x5ae9d2));const _0x41ec78=this['itemTextAlign']();if(_0x41ec78==='right')this[_0x28c393(0x2c8)](_0x49cdce,_0x4eb9ad['x']+_0x4eb9ad[_0x28c393(0x1e6)]-_0x58f400,_0x4eb9ad['y'],_0x58f400);else{if(_0x41ec78==='center'){const _0x24373b=_0x4eb9ad['x']+Math[_0x28c393(0x4bd)]((_0x4eb9ad['width']-_0x58f400)/0x2);this[_0x28c393(0x2c8)](_0x49cdce,_0x24373b,_0x4eb9ad['y'],_0x58f400);}else this[_0x28c393(0x2c8)](_0x49cdce,_0x4eb9ad['x'],_0x4eb9ad['y'],_0x58f400);}},Window_EquipCommand[_0x59ef57(0x263)][_0x59ef57(0xbe)]=function(_0x2b6dfc){const _0x5c5790=_0x59ef57;this[_0x5c5790(0x2f6)](_0x2b6dfc)[_0x5c5790(0xf0)](/\\I\[(\d+)\]/i);const _0x1fd6cc=Number(RegExp['$1'])||0x0,_0x59a94c=this['itemLineRect'](_0x2b6dfc),_0x29f5eb=_0x59a94c['x']+Math[_0x5c5790(0x4bd)]((_0x59a94c[_0x5c5790(0x1e6)]-ImageManager['iconWidth'])/0x2),_0x4e477a=_0x59a94c['y']+(_0x59a94c[_0x5c5790(0x388)]-ImageManager[_0x5c5790(0xce)])/0x2;this['drawIcon'](_0x1fd6cc,_0x29f5eb,_0x4e477a);},Window_EquipCommand[_0x59ef57(0x263)][_0x59ef57(0x481)]=function(){const _0x5d7e2a=_0x59ef57,_0x33e527=SceneManager['_scene'];if(_0x33e527&&_0x33e527['user'])return _0x33e527[_0x5d7e2a(0x35e)]();return null;},Window_EquipCommand[_0x59ef57(0x263)][_0x59ef57(0x410)]=function(){const _0x4094cc=_0x59ef57;Window_Command[_0x4094cc(0x263)][_0x4094cc(0x410)][_0x4094cc(0x36e)](this),this[_0x4094cc(0xb2)]['setText'](this[_0x4094cc(0x2ac)]());},Window_EquipCommand[_0x59ef57(0x263)][_0x59ef57(0x2ac)]=function(){const _0x2490d7=_0x59ef57,_0x2c9ab5=this[_0x2490d7(0x19d)]();switch(_0x2c9ab5){case _0x2490d7(0x1d8):return TextManager[_0x2490d7(0x3c7)][_0x2490d7(0x4e5)]['equip'];case _0x2490d7(0x3e8):return TextManager[_0x2490d7(0x3c7)]['helpDesc'][_0x2490d7(0x3e8)];case _0x2490d7(0x4b8):return TextManager[_0x2490d7(0x3c7)]['helpDesc'][_0x2490d7(0x4b8)];default:return'';}},Window_EquipSlot['prototype'][_0x59ef57(0x1ae)]=function(){const _0x1e1c3f=_0x59ef57;return Imported[_0x1e1c3f(0x492)]&&Window_HorzCommand[_0x1e1c3f(0x263)][_0x1e1c3f(0x1ae)][_0x1e1c3f(0x36e)](this);},Window_EquipSlot[_0x59ef57(0x263)]['activate']=function(){const _0x3474f7=_0x59ef57;Window_StatusBase['prototype']['activate']['call'](this),this[_0x3474f7(0x453)]();},Window_EquipSlot[_0x59ef57(0x263)][_0x59ef57(0x165)]=function(){const _0x261866=_0x59ef57;Window_StatusBase[_0x261866(0x263)][_0x261866(0x165)][_0x261866(0x36e)](this),this[_0x261866(0x2dc)]();},Window_EquipSlot[_0x59ef57(0x263)][_0x59ef57(0x2dc)]=function(){const _0x496a31=_0x59ef57;if(!this[_0x496a31(0x46c)]())return;if(Input[_0x496a31(0x2cb)](_0x496a31(0x427))&&this['item']()){const _0x357523=SceneManager['_scene'][_0x496a31(0x478)];_0x357523&&(this[_0x496a31(0xc8)](this[_0x496a31(0x1a7)]())?(this[_0x496a31(0x24f)](),this[_0x496a31(0x410)]()):this['playBuzzerSound']());}},Window_EquipSlot['prototype']['canShiftRemoveEquipment']=function(_0x2dd374){const _0x40d441=_0x59ef57,_0x1b7113=SceneManager['_scene']['_actor'];if(!_0x1b7113)return;if(!_0x1b7113['isEquipChangeOk'](_0x2dd374))return![];const _0x56a75f=_0x1b7113[_0x40d441(0x204)]()[_0x2dd374];if(_0x1b7113['nonRemovableEtypes']()[_0x40d441(0x291)](_0x56a75f))return![];return!![];;},Window_EquipSlot[_0x59ef57(0x263)][_0x59ef57(0x24f)]=function(){const _0xb6c26=_0x59ef57;SoundManager['playEquip']();const _0xac1544=SceneManager[_0xb6c26(0xd8)][_0xb6c26(0x478)];_0xac1544['changeEquip'](this[_0xb6c26(0x1a7)](),null),this['refresh'](),this[_0xb6c26(0x442)]['refresh'](),this['callUpdateHelp']();const _0x1a6d34=SceneManager['_scene']['_statusWindow'];if(_0x1a6d34)_0x1a6d34[_0xb6c26(0x3d1)]();},Window_EquipSlot[_0x59ef57(0x263)][_0x59ef57(0x46c)]=function(){const _0x225a83=_0x59ef57;if(!this[_0x225a83(0x158)])return![];if(!VisuMZ[_0x225a83(0x3a2)][_0x225a83(0x16f)]['EquipScene'][_0x225a83(0x229)])return![];return!![];},Window_EquipSlot[_0x59ef57(0x263)][_0x59ef57(0x28e)]=function(){const _0x19e67e=_0x59ef57;!this[_0x19e67e(0x24b)]()&&Window_StatusBase[_0x19e67e(0x263)]['processCursorMoveModernControls'][_0x19e67e(0x36e)](this);},Window_EquipSlot[_0x59ef57(0x263)][_0x59ef57(0x24b)]=function(){const _0x2c25f1=_0x59ef57;if(!this['isCursorMovable']())return![];if(SceneManager[_0x2c25f1(0xd8)][_0x2c25f1(0x183)]!==Scene_Equip)return![];if(this[_0x2c25f1(0x181)]())return this[_0x2c25f1(0x411)](),Input[_0x2c25f1(0x4b8)](),SceneManager[_0x2c25f1(0xd8)][_0x2c25f1(0x2fd)](),![];else{if(Input[_0x2c25f1(0x216)]('down')){const _0x5a565d=this[_0x2c25f1(0x1a7)]();return Input[_0x2c25f1(0x218)](_0x2c25f1(0x427))?this[_0x2c25f1(0x1c1)]():this[_0x2c25f1(0x477)](Input['isTriggered'](_0x2c25f1(0x310))),this['index']()!==_0x5a565d&&this[_0x2c25f1(0x411)](),!![];}else{if(this['isShiftShortcutKeyForRemove']()&&Input[_0x2c25f1(0x2cb)](_0x2c25f1(0x427)))return!![];}}return![];},Window_EquipSlot[_0x59ef57(0x263)][_0x59ef57(0x181)]=function(){const _0xf2d1c9=_0x59ef57;if(this['index']()!==0x0)return![];const _0x16b0e8=VisuMZ[_0xf2d1c9(0x3a2)][_0xf2d1c9(0x16f)][_0xf2d1c9(0x4b0)];if(!_0x16b0e8[_0xf2d1c9(0x2f1)]&&!_0x16b0e8[_0xf2d1c9(0x1f1)])return![];return Input[_0xf2d1c9(0x2cb)]('up');},Window_EquipSlot[_0x59ef57(0x263)]['isShiftShortcutKeyForRemove']=function(){const _0x11507c=_0x59ef57;return VisuMZ[_0x11507c(0x3a2)][_0x11507c(0x16f)][_0x11507c(0x4b0)][_0x11507c(0x229)];},Window_EquipSlot[_0x59ef57(0x263)][_0x59ef57(0x20e)]=function(){const _0x3e394e=_0x59ef57;if(this[_0x3e394e(0x1ec)]()&&this['visible']&&SceneManager[_0x3e394e(0xd8)]['constructor']===Scene_Equip){if(this['isHoverEnabled']()&&TouchInput[_0x3e394e(0x133)]())this[_0x3e394e(0x17c)](![]);else TouchInput[_0x3e394e(0x2cb)]()&&this[_0x3e394e(0x17c)](!![]);if(TouchInput[_0x3e394e(0x432)]())this[_0x3e394e(0x2bc)]();else{if(TouchInput[_0x3e394e(0x188)]()){const _0x17139b=VisuMZ['ItemsEquipsCore'][_0x3e394e(0x16f)][_0x3e394e(0x4b0)];this[_0x3e394e(0x1ae)]()&&this[_0x3e394e(0x158)]&&!_0x17139b[_0x3e394e(0x2f1)]&&!_0x17139b[_0x3e394e(0x1f1)]?(SoundManager[_0x3e394e(0x49a)](),SceneManager[_0x3e394e(0x3f8)]()):this[_0x3e394e(0x2db)]();}}}},Window_EquipSlot[_0x59ef57(0x263)][_0x59ef57(0x17c)]=function(_0x52eae0){const _0x2c020d=_0x59ef57;this['_doubleTouch']=![];const _0x5f4470=this['index'](),_0x473456=this[_0x2c020d(0x49c)](),_0x56c928=SceneManager['_scene'][_0x2c020d(0x100)];if(_0x56c928[_0x2c020d(0x1ec)]()&&_0x56c928[_0x2c020d(0x39d)]){if(_0x473456>=0x0)_0x473456===this[_0x2c020d(0x1a7)]()&&(this['_doubleTouch']=!![]),this[_0x2c020d(0x300)](),this['select'](_0x473456),_0x56c928[_0x2c020d(0x37b)]();else _0x56c928[_0x2c020d(0x49c)]()>=0x0&&(this[_0x2c020d(0x37b)](),this['deselect'](),_0x56c928['activate']());}_0x52eae0&&this['index']()!==_0x5f4470&&this[_0x2c020d(0x411)]();},Window_EquipSlot[_0x59ef57(0x263)]['equipSlotIndex']=function(){const _0x420588=_0x59ef57;return this[_0x420588(0x1a7)]();},VisuMZ['ItemsEquipsCore'][_0x59ef57(0x48d)]=Window_EquipSlot[_0x59ef57(0x263)][_0x59ef57(0x13f)],Window_EquipSlot[_0x59ef57(0x263)][_0x59ef57(0x13f)]=function(_0x555dba){const _0x2cd668=_0x59ef57;if(this['maxItems']()<=0x0)return![];return VisuMZ[_0x2cd668(0x3a2)][_0x2cd668(0x48d)][_0x2cd668(0x36e)](this,_0x555dba);},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x495)]=Window_EquipItem['prototype']['includes'],Window_EquipItem[_0x59ef57(0x263)][_0x59ef57(0x291)]=function(_0x3b6f80){const _0x522039=_0x59ef57;if(_0x3b6f80===null&&this[_0x522039(0x3e1)]()['includes'](this[_0x522039(0x352)]()))return![];else{$gameTemp[_0x522039(0x439)]=!![];let _0x373780=VisuMZ['ItemsEquipsCore'][_0x522039(0x495)][_0x522039(0x36e)](this,_0x3b6f80);if(!_0x373780&&_0x3b6f80&&DataManager['isArmor'](_0x3b6f80)){const _0xb41cef=_0x3b6f80[_0x522039(0x22b)]||0x0;if(this[_0x522039(0x478)]&&this[_0x522039(0x478)][_0x522039(0x419)](_0xb41cef)){const _0x5d15ee=DataManager['getEtypeIDs'](_0x3b6f80);_0x5d15ee[_0x522039(0x291)](this[_0x522039(0x352)]())&&(_0x373780=!![]);}}return $gameTemp[_0x522039(0x439)]=undefined,_0x373780;}},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x34a)]=Window_EquipItem[_0x59ef57(0x263)][_0x59ef57(0x13f)],Window_EquipItem[_0x59ef57(0x263)][_0x59ef57(0x13f)]=function(_0x56acbb){const _0x4aae71=_0x59ef57;if(_0x56acbb&&this[_0x4aae71(0x478)]){if(this[_0x4aae71(0x1cb)](_0x56acbb))return![];if(this[_0x4aae71(0x448)](_0x56acbb))return![];if(this[_0x4aae71(0x231)](_0x56acbb))return![];if(!this['_actor']['canEquip'](_0x56acbb))return![];}if(!_0x56acbb)return!this[_0x4aae71(0x3e1)]()[_0x4aae71(0x291)](this['etypeId']());return VisuMZ[_0x4aae71(0x3a2)][_0x4aae71(0x34a)]['call'](this,_0x56acbb);},Window_EquipItem['prototype'][_0x59ef57(0x1cb)]=function(_0x5ed37c){const _0x33eb4b=_0x59ef57,_0x387226=_0x5ed37c[_0x33eb4b(0x278)];if(_0x387226['match'](/<EQUIP COPY LIMIT:[ ](\d+)>/i)){const _0x4c8ae0=Number(RegExp['$1'])||0x1;let _0x1fb739=0x0;const _0x39ed27=this[_0x33eb4b(0x478)][_0x33eb4b(0x19a)](),_0x20afa8=SceneManager[_0x33eb4b(0xd8)]['_slotWindow'][_0x33eb4b(0x1aa)]();_0x39ed27[_0x20afa8]=null;for(const _0x2ea39a of _0x39ed27){if(!_0x2ea39a)continue;if(DataManager[_0x33eb4b(0x189)](_0x5ed37c)===DataManager[_0x33eb4b(0x189)](_0x2ea39a)){if(_0x5ed37c['id']===_0x2ea39a['id'])_0x1fb739+=0x1;}}return _0x1fb739>=_0x4c8ae0;}else return![];},Window_EquipItem['prototype'][_0x59ef57(0x448)]=function(_0x1d5988){const _0x362ab7=_0x59ef57;if(!DataManager[_0x362ab7(0x189)](_0x1d5988))return![];const _0x5df484=/<EQUIP WEAPON TYPE LIMIT:[ ](\d+)>/i;let _0x10eaaa=0x0;const _0x46d763=this[_0x362ab7(0x478)]['equips'](),_0x55fa7c=SceneManager['_scene'][_0x362ab7(0x4a2)][_0x362ab7(0x1aa)]();_0x46d763[_0x55fa7c]=null;for(const _0x588cce of _0x46d763){if(!_0x588cce)continue;if(!DataManager[_0x362ab7(0x189)](_0x588cce))continue;if(_0x1d5988['wtypeId']===_0x588cce[_0x362ab7(0x45f)]){_0x10eaaa+=0x1;if(_0x1d5988[_0x362ab7(0x278)][_0x362ab7(0xf0)](_0x5df484)){const _0x2fedf3=Number(RegExp['$1'])||0x1;if(_0x10eaaa>=_0x2fedf3)return!![];}if(_0x588cce[_0x362ab7(0x278)][_0x362ab7(0xf0)](_0x5df484)){const _0x257102=Number(RegExp['$1'])||0x1;if(_0x10eaaa>=_0x257102)return!![];}}}return![];},Window_EquipItem[_0x59ef57(0x263)]['isSoleArmorType']=function(_0x105d46){const _0x4c7c56=_0x59ef57;if(!DataManager['isArmor'](_0x105d46))return![];const _0x3765c0=/<EQUIP ARMOR TYPE LIMIT:[ ](\d+)>/i;let _0x230a40=0x0;const _0x3d6ba4=this[_0x4c7c56(0x478)]['equips'](),_0x3bb60b=SceneManager['_scene'][_0x4c7c56(0x4a2)][_0x4c7c56(0x1aa)]();_0x3d6ba4[_0x3bb60b]=null;for(const _0x35ebde of _0x3d6ba4){if(!_0x35ebde)continue;if(!DataManager[_0x4c7c56(0x3d8)](_0x35ebde))continue;if(_0x105d46[_0x4c7c56(0x22b)]===_0x35ebde[_0x4c7c56(0x22b)]){_0x230a40+=0x1;if(_0x105d46[_0x4c7c56(0x278)][_0x4c7c56(0xf0)](_0x3765c0)){const _0x591b4e=Number(RegExp['$1'])||0x1;if(_0x230a40>=_0x591b4e)return!![];}if(_0x35ebde[_0x4c7c56(0x278)][_0x4c7c56(0xf0)](_0x3765c0)){const _0x530291=Number(RegExp['$1'])||0x1;if(_0x230a40>=_0x530291)return!![];}}}return![];},Window_EquipItem[_0x59ef57(0x263)][_0x59ef57(0x3e1)]=function(){const _0x192f25=_0x59ef57;return VisuMZ['ItemsEquipsCore']['Settings'][_0x192f25(0x4b0)][_0x192f25(0x3fc)];},Window_EquipItem['prototype'][_0x59ef57(0x23d)]=function(_0xf9f8f9){const _0xceedeb=_0x59ef57,_0x3f2bd6=this[_0xceedeb(0x4e7)](_0xf9f8f9);_0x3f2bd6?Window_ItemList['prototype'][_0xceedeb(0x23d)][_0xceedeb(0x36e)](this,_0xf9f8f9):this[_0xceedeb(0x35d)](_0xf9f8f9);},Window_EquipItem[_0x59ef57(0x263)]['drawRemoveItem']=function(_0x248d13){const _0x304ea1=_0x59ef57;this['changePaintOpacity'](this['isEnabled'](null));const _0x138b03=ImageManager['standardIconWidth']||0x20,_0x56d8f5=_0x138b03-ImageManager[_0x304ea1(0x1a2)],_0x1d1427=_0x138b03+0x4,_0x7bf83a=VisuMZ[_0x304ea1(0x3a2)][_0x304ea1(0x16f)]['EquipScene'],_0x17325c=this[_0x304ea1(0x1e2)](_0x248d13),_0x5824fe=_0x17325c['y']+(this['lineHeight']()-ImageManager[_0x304ea1(0xce)])/0x2,_0x3fc761=Math[_0x304ea1(0xca)](0x0,_0x17325c['width']-_0x1d1427);this['resetTextColor'](),this[_0x304ea1(0x177)](_0x7bf83a[_0x304ea1(0x23e)],_0x17325c['x']+Math[_0x304ea1(0x14d)](_0x56d8f5/0x2),_0x5824fe),this[_0x304ea1(0x207)](_0x7bf83a[_0x304ea1(0x3ef)],_0x17325c['x']+_0x1d1427,_0x17325c['y'],_0x3fc761),this[_0x304ea1(0x3d2)](!![]);},Window_EquipItem[_0x59ef57(0x263)][_0x59ef57(0x410)]=function(){const _0x1d3e3e=_0x59ef57;Window_ItemList[_0x1d3e3e(0x263)][_0x1d3e3e(0x410)][_0x1d3e3e(0x36e)](this);if(this[_0x1d3e3e(0x478)]&&this[_0x1d3e3e(0xe7)]&&this[_0x1d3e3e(0x41f)]>=0x0){const _0x540288=JsonEx['makeDeepCopy'](this['_actor']);_0x540288[_0x1d3e3e(0x34f)]=!![],_0x540288[_0x1d3e3e(0x3f7)](this['_slotId'],this['item']()),this[_0x1d3e3e(0xe7)][_0x1d3e3e(0x2a6)](_0x540288);}},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x205)]=Window_ShopCommand[_0x59ef57(0x263)][_0x59ef57(0x40e)],Window_ShopCommand['prototype']['initialize']=function(_0x38b49f){const _0x5eabc9=_0x59ef57;VisuMZ[_0x5eabc9(0x3a2)]['Window_ShopCommand_initialize'][_0x5eabc9(0x36e)](this,_0x38b49f),this[_0x5eabc9(0x4a3)](_0x38b49f);},Window_ShopCommand[_0x59ef57(0x263)]['createCommandNameWindow']=function(_0x1c3144){const _0x5a5868=_0x59ef57,_0x47a320=new Rectangle(0x0,0x0,_0x1c3144['width'],_0x1c3144[_0x5a5868(0x388)]);this['_commandNameWindow']=new Window_Base(_0x47a320),this[_0x5a5868(0x443)]['opacity']=0x0,this[_0x5a5868(0x1ca)](this['_commandNameWindow']),this[_0x5a5868(0x331)]();},Window_ShopCommand[_0x59ef57(0x263)]['callUpdateHelp']=function(){const _0x315d76=_0x59ef57;Window_HorzCommand['prototype'][_0x315d76(0x453)][_0x315d76(0x36e)](this);if(this['_commandNameWindow'])this[_0x315d76(0x331)]();},Window_ShopCommand[_0x59ef57(0x263)][_0x59ef57(0x331)]=function(){const _0x1df768=_0x59ef57,_0x2e8056=this[_0x1df768(0x443)];_0x2e8056['contents']['clear']();const _0x397ab4=this[_0x1df768(0x3e6)](this[_0x1df768(0x1a7)]());if(_0x397ab4===_0x1df768(0x279)){const _0x3d73fc=this[_0x1df768(0x1e2)](this[_0x1df768(0x1a7)]());let _0x563142=this[_0x1df768(0x2f6)](this[_0x1df768(0x1a7)]());_0x563142=_0x563142[_0x1df768(0xd7)](/\\I\[(\d+)\]/gi,''),_0x2e8056['resetFontSettings'](),this[_0x1df768(0x33e)](_0x563142,_0x3d73fc),this[_0x1df768(0x36b)](_0x563142,_0x3d73fc),this[_0x1df768(0x28f)](_0x563142,_0x3d73fc);}},Window_ShopCommand[_0x59ef57(0x263)][_0x59ef57(0x33e)]=function(_0x4e5d81,_0x1c61bd){},Window_ShopCommand[_0x59ef57(0x263)][_0x59ef57(0x36b)]=function(_0x4bb64b,_0x37a32a){const _0x2e3c57=_0x59ef57,_0x8487e7=this[_0x2e3c57(0x443)];_0x8487e7[_0x2e3c57(0x207)](_0x4bb64b,0x0,_0x37a32a['y'],_0x8487e7[_0x2e3c57(0xd2)],_0x2e3c57(0x206));},Window_ShopCommand['prototype'][_0x59ef57(0x28f)]=function(_0x5927d9,_0x41499c){const _0x1c5fde=_0x59ef57,_0xbf378a=this[_0x1c5fde(0x443)],_0x3242db=$gameSystem['windowPadding'](),_0x8fc159=_0x41499c['x']+Math['floor'](_0x41499c[_0x1c5fde(0x1e6)]/0x2)+_0x3242db;_0xbf378a['x']=_0xbf378a['width']/-0x2+_0x8fc159,_0xbf378a['y']=Math[_0x1c5fde(0x4bd)](_0x41499c[_0x1c5fde(0x388)]/0x2);},Window_ShopCommand[_0x59ef57(0x263)][_0x59ef57(0x487)]=function(){return this['_list']?this['_list']['length']:0x3;},Window_ShopCommand[_0x59ef57(0x263)]['hideDisabledCommands']=function(){const _0x2ad1d4=_0x59ef57;return VisuMZ[_0x2ad1d4(0x3a2)][_0x2ad1d4(0x16f)][_0x2ad1d4(0x18e)]['CmdHideDisabled'];},Window_ShopCommand[_0x59ef57(0x263)][_0x59ef57(0x441)]=function(){const _0x9086dd=_0x59ef57;this[_0x9086dd(0x264)](),this['addSellCommand'](),this[_0x9086dd(0x1e5)]();},Window_ShopCommand[_0x59ef57(0x263)]['refresh']=function(){const _0x21e926=_0x59ef57;Window_HorzCommand['prototype'][_0x21e926(0x3d1)]['call'](this),this['refreshCursor']();},Window_ShopCommand[_0x59ef57(0x263)]['addBuyCommand']=function(){const _0x38405a=_0x59ef57,_0x3f9e82=this['commandStyle'](),_0x5686b7=VisuMZ['ItemsEquipsCore']['Settings'][_0x38405a(0x18e)]['CmdIconBuy'],_0x377ebf=_0x3f9e82===_0x38405a(0x32d)?TextManager[_0x38405a(0x489)]:_0x38405a(0x320)[_0x38405a(0x46e)](_0x5686b7,TextManager[_0x38405a(0x489)]),_0xb2d1d7=this['isBuyCommandEnabled']();if(this[_0x38405a(0x297)]()&&!_0xb2d1d7)return;this[_0x38405a(0x3cb)](_0x377ebf,_0x38405a(0x489),_0xb2d1d7);},Window_ShopCommand[_0x59ef57(0x263)][_0x59ef57(0x3ce)]=function(){const _0x554c74=_0x59ef57;return SceneManager[_0x554c74(0xd8)]['constructor']===Scene_Shop?SceneManager[_0x554c74(0xd8)]['_goodsCount']>0x0:!![];},Window_ShopCommand[_0x59ef57(0x263)]['addSellCommand']=function(){const _0x1b79f9=_0x59ef57,_0x2bec9a=this[_0x1b79f9(0x4e8)](),_0x4988b3=VisuMZ[_0x1b79f9(0x3a2)][_0x1b79f9(0x16f)][_0x1b79f9(0x18e)][_0x1b79f9(0x2e2)],_0x53b4eb=_0x2bec9a===_0x1b79f9(0x32d)?TextManager['sell']:'\x5cI[%1]%2'[_0x1b79f9(0x46e)](_0x4988b3,TextManager[_0x1b79f9(0x46b)]),_0x4ae218=this['isSellCommandEnabled']();if(this[_0x1b79f9(0x297)]()&&!_0x4ae218)return;this['addCommand'](_0x53b4eb,'sell',_0x4ae218);},Window_ShopCommand[_0x59ef57(0x263)][_0x59ef57(0x3bd)]=function(){const _0x182744=_0x59ef57;return!this[_0x182744(0x466)];},Window_ShopCommand[_0x59ef57(0x263)][_0x59ef57(0x1e5)]=function(){const _0x5ce88a=_0x59ef57,_0x2ff52c=this[_0x5ce88a(0x4e8)](),_0x221152=VisuMZ[_0x5ce88a(0x3a2)][_0x5ce88a(0x16f)][_0x5ce88a(0x18e)]['CmdIconCancel'],_0x2a7e04=VisuMZ[_0x5ce88a(0x3a2)][_0x5ce88a(0x16f)][_0x5ce88a(0x18e)]['CmdCancelRename'],_0x51e19e=_0x2ff52c===_0x5ce88a(0x32d)?_0x2a7e04:_0x5ce88a(0x320)[_0x5ce88a(0x46e)](_0x221152,_0x2a7e04);this[_0x5ce88a(0x3cb)](_0x51e19e,_0x5ce88a(0x49e));},Window_ShopCommand[_0x59ef57(0x263)][_0x59ef57(0xd1)]=function(){const _0x5bc530=_0x59ef57;return VisuMZ[_0x5bc530(0x3a2)]['Settings'][_0x5bc530(0x18e)][_0x5bc530(0x20b)];},Window_ShopCommand[_0x59ef57(0x263)][_0x59ef57(0x23d)]=function(_0xac5e8b){const _0x25bd5b=_0x59ef57,_0x219b78=this[_0x25bd5b(0x3e6)](_0xac5e8b);if(_0x219b78===_0x25bd5b(0x4c3))this[_0x25bd5b(0x233)](_0xac5e8b);else _0x219b78===_0x25bd5b(0x279)?this[_0x25bd5b(0xbe)](_0xac5e8b):Window_HorzCommand['prototype'][_0x25bd5b(0x23d)][_0x25bd5b(0x36e)](this,_0xac5e8b);},Window_ShopCommand[_0x59ef57(0x263)][_0x59ef57(0x4e8)]=function(){const _0x2de290=_0x59ef57;return VisuMZ['ItemsEquipsCore'][_0x2de290(0x16f)][_0x2de290(0x18e)][_0x2de290(0x250)];},Window_ShopCommand[_0x59ef57(0x263)][_0x59ef57(0x3e6)]=function(_0x5caf89){const _0x855f20=_0x59ef57;if(_0x5caf89<0x0)return _0x855f20(0x32d);const _0x4b46d1=this['commandStyle']();if(_0x4b46d1!==_0x855f20(0x13e))return _0x4b46d1;else{if(this[_0x855f20(0x1e1)]()>0x0){const _0x1fb212=this[_0x855f20(0x2f6)](_0x5caf89);if(_0x1fb212[_0x855f20(0xf0)](/\\I\[(\d+)\]/i)){const _0x4b0e0b=this[_0x855f20(0x1e2)](_0x5caf89),_0x1c4ff1=this[_0x855f20(0x349)](_0x1fb212)[_0x855f20(0x1e6)];return _0x1c4ff1<=_0x4b0e0b['width']?'iconText':_0x855f20(0x279);}}}return'text';},Window_ShopCommand[_0x59ef57(0x263)]['drawItemStyleIconText']=function(_0x19ae06){const _0x550b2e=_0x59ef57,_0x308825=this[_0x550b2e(0x1e2)](_0x19ae06),_0xc8773d=this['commandName'](_0x19ae06),_0x2edbbb=this[_0x550b2e(0x349)](_0xc8773d)[_0x550b2e(0x1e6)];this[_0x550b2e(0x3d2)](this[_0x550b2e(0x4c0)](_0x19ae06));const _0x43593e=this[_0x550b2e(0xd1)]();if(_0x43593e===_0x550b2e(0x34c))this[_0x550b2e(0x2c8)](_0xc8773d,_0x308825['x']+_0x308825[_0x550b2e(0x1e6)]-_0x2edbbb,_0x308825['y'],_0x2edbbb);else{if(_0x43593e===_0x550b2e(0x206)){const _0x299583=_0x308825['x']+Math[_0x550b2e(0x4bd)]((_0x308825[_0x550b2e(0x1e6)]-_0x2edbbb)/0x2);this[_0x550b2e(0x2c8)](_0xc8773d,_0x299583,_0x308825['y'],_0x2edbbb);}else this[_0x550b2e(0x2c8)](_0xc8773d,_0x308825['x'],_0x308825['y'],_0x2edbbb);}},Window_ShopCommand['prototype']['drawItemStyleIcon']=function(_0x48874c){const _0x37d1fc=_0x59ef57;this['commandName'](_0x48874c)[_0x37d1fc(0xf0)](/\\I\[(\d+)\]/i);const _0x1769c8=Number(RegExp['$1'])||0x0,_0x1eb39c=this['itemLineRect'](_0x48874c),_0x55414e=_0x1eb39c['x']+Math[_0x37d1fc(0x4bd)]((_0x1eb39c[_0x37d1fc(0x1e6)]-ImageManager['iconWidth'])/0x2),_0x5d1bf4=_0x1eb39c['y']+(_0x1eb39c['height']-ImageManager[_0x37d1fc(0xce)])/0x2;this[_0x37d1fc(0x177)](_0x1769c8,_0x55414e,_0x5d1bf4);},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x23f)]=Window_ShopBuy[_0x59ef57(0x263)][_0x59ef57(0x3d1)],Window_ShopBuy['prototype'][_0x59ef57(0x3d1)]=function(){const _0x3bfd13=_0x59ef57;this['updateMoneyAmount'](),VisuMZ['ItemsEquipsCore']['Window_ShopBuy_refresh'][_0x3bfd13(0x36e)](this);},Window_ShopBuy[_0x59ef57(0x263)][_0x59ef57(0x157)]=function(){const _0x185802=_0x59ef57;SceneManager[_0x185802(0xd8)][_0x185802(0x183)]===Scene_Shop&&(this[_0x185802(0x480)]=SceneManager[_0x185802(0xd8)][_0x185802(0xb3)]());},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x236)]=Window_ShopBuy[_0x59ef57(0x263)][_0x59ef57(0x45e)],Window_ShopBuy[_0x59ef57(0x263)][_0x59ef57(0x45e)]=function(_0x528e34){const _0x5477ab=_0x59ef57;if(!_0x528e34)return 0x0;let _0x1ae2e0=VisuMZ[_0x5477ab(0x3a2)][_0x5477ab(0x236)]['call'](this,_0x528e34);return Math[_0x5477ab(0xca)](0x0,this[_0x5477ab(0x421)](_0x528e34,_0x1ae2e0));},Window_ShopBuy['prototype'][_0x59ef57(0x421)]=function(_0x4462a8,_0x57efff){const _0x45ac4d=_0x59ef57,_0x1f6058=_0x4462a8['note']||'';if(_0x1f6058[_0x45ac4d(0xf0)](/<JS BUY PRICE>\s*([\s\S]*)\s*<\/JS BUY PRICE>/i)){const _0x287db7=String(RegExp['$1']);window[_0x45ac4d(0x45e)]=_0x57efff,window['item']=_0x4462a8;try{eval(_0x287db7);}catch(_0x86f4cc){if($gameTemp[_0x45ac4d(0x498)]())console['log'](_0x86f4cc);}_0x57efff=window['price'],window[_0x45ac4d(0x45e)]=undefined,window[_0x45ac4d(0x1bb)]=undefined;}_0x57efff=VisuMZ[_0x45ac4d(0x3a2)]['Settings'][_0x45ac4d(0x18e)][_0x45ac4d(0x28b)]['call'](this,_0x4462a8,_0x57efff);if(isNaN(_0x57efff))_0x57efff=0x0;return Math[_0x45ac4d(0x4bd)](_0x57efff);},VisuMZ[_0x59ef57(0x3a2)]['Window_ShopBuy_goodsToItem']=Window_ShopBuy[_0x59ef57(0x263)][_0x59ef57(0x38a)],Window_ShopBuy[_0x59ef57(0x263)]['goodsToItem']=function(_0x2b4457){const _0x45d812=_0x59ef57,_0x1381b8=VisuMZ[_0x45d812(0x3a2)]['Window_ShopBuy_goodsToItem']['call'](this,_0x2b4457);return _0x1381b8&&!this[_0x45d812(0x3c0)](_0x1381b8)?null:_0x1381b8;},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x375)]={'ShowAllSwitches':/<SHOW SHOP (?:ALL |)SWITCH(?:|ES):[ ](.*)>/i,'ShowAnySwitches':/<SHOW SHOP ANY SWITCH(?:|ES):[ ](.*)>/i,'HideAllSwitches':/<HIDE SHOP (?:ALL |)SWITCH(?:|ES):[ ](.*)>/i,'HideAnySwitches':/<HIDE SHOP ANY SWITCH(?:|ES):[ ](.*)>/i,'BuyTurnSwitchOn':/<BUY TURN ON SWITCH(?:|ES):[ ](.*)>/i,'BuyTurnSwitchOff':/<BUY TURN OFF SWITCH(?:|ES):[ ](.*)>/i,'SellTurnSwitchOn':/<SELL TURN ON SWITCH(?:|ES):[ ](.*)>/i,'SellTurnSwitchOff':/<SELL TURN OFF SWITCH(?:|ES):[ ](.*)>/i},Window_ShopBuy['prototype']['meetsShopListingConditions']=function(_0x5cf145){const _0x2c371f=_0x59ef57;if(!_0x5cf145)return![];const _0x4c2b63=VisuMZ[_0x2c371f(0x3a2)]['ShopListingRegExp'],_0x1003d4=_0x5cf145?_0x5cf145[_0x2c371f(0x278)]||'':'';if(_0x1003d4[_0x2c371f(0xf0)](_0x4c2b63['ShowAllSwitches'])){const _0x204fc6=String(RegExp['$1'])[_0x2c371f(0x15b)](',')[_0x2c371f(0x2ed)](_0x1f4dc5=>Number(_0x1f4dc5));if(_0x204fc6[_0x2c371f(0x459)](_0x2ab127=>!$gameSwitches[_0x2c371f(0x41e)](_0x2ab127)))return![];}if(_0x1003d4['match'](_0x4c2b63[_0x2c371f(0x268)])){const _0x1c1e9d=String(RegExp['$1'])[_0x2c371f(0x15b)](',')[_0x2c371f(0x2ed)](_0x1e6f0b=>Number(_0x1e6f0b));if(_0x1c1e9d[_0x2c371f(0x1fd)](_0x12cd6a=>!$gameSwitches[_0x2c371f(0x41e)](_0x12cd6a)))return![];}if(_0x1003d4[_0x2c371f(0xf0)](_0x4c2b63[_0x2c371f(0x4fb)])){const _0x4c36f0=String(RegExp['$1'])[_0x2c371f(0x15b)](',')[_0x2c371f(0x2ed)](_0x3ec0f5=>Number(_0x3ec0f5));if(_0x4c36f0['every'](_0x339a16=>$gameSwitches[_0x2c371f(0x41e)](_0x339a16)))return![];}if(_0x1003d4[_0x2c371f(0xf0)](_0x4c2b63[_0x2c371f(0x243)])){const _0x5e7305=String(RegExp['$1'])[_0x2c371f(0x15b)](',')[_0x2c371f(0x2ed)](_0x1741fd=>Number(_0x1741fd));if(_0x5e7305[_0x2c371f(0x459)](_0x44edbe=>$gameSwitches[_0x2c371f(0x41e)](_0x44edbe)))return![];}return!![];},Window_ShopBuy['prototype']['drawItem']=function(_0x4664ad){const _0xf83b05=_0x59ef57;this[_0xf83b05(0x389)]();const _0x30604c=this[_0xf83b05(0x4e7)](_0x4664ad),_0x539b13=this[_0xf83b05(0x1e2)](_0x4664ad),_0x45674d=_0x539b13['width'];this[_0xf83b05(0x3d2)](this['isEnabled'](_0x30604c)),this['drawItemName'](_0x30604c,_0x539b13['x'],_0x539b13['y'],_0x45674d),this[_0xf83b05(0x48a)](_0x30604c,_0x539b13),this[_0xf83b05(0x3d2)](!![]);},Window_ShopBuy[_0x59ef57(0x263)][_0x59ef57(0x48a)]=function(_0x31e5b4,_0x656f6c){const _0x28dcbb=_0x59ef57,_0x41405c=this['price'](_0x31e5b4);this['drawCurrencyValue'](_0x41405c,TextManager[_0x28dcbb(0x3df)],_0x656f6c['x'],_0x656f6c['y'],_0x656f6c[_0x28dcbb(0x1e6)]);},Window_ShopSell['prototype'][_0x59ef57(0x487)]=function(){const _0x2900d6=_0x59ef57;return SceneManager['_scene'][_0x2900d6(0x138)]()?0x1:0x2;},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x2ea)]=Window_ShopSell['prototype'][_0x59ef57(0x13f)],Window_ShopSell[_0x59ef57(0x263)]['isEnabled']=function(_0x23898f){const _0x7f2216=_0x59ef57;if(!_0x23898f)return![];const _0x195ed8=_0x23898f[_0x7f2216(0x278)];if(_0x195ed8[_0x7f2216(0xf0)](/<CANNOT SELL>/i))return![];if(_0x195ed8[_0x7f2216(0xf0)](/<CAN SELL>/i))return!![];if(_0x195ed8[_0x7f2216(0xf0)](/<CANNOT SELL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x492119=JSON[_0x7f2216(0x21a)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x18d4fa of _0x492119){if(!$gameSwitches['value'](_0x18d4fa))return![];}}if(_0x195ed8[_0x7f2216(0xf0)](/<CANNOT SELL ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x596e3c=JSON[_0x7f2216(0x21a)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x485158 of _0x596e3c){if(!$gameSwitches[_0x7f2216(0x41e)](_0x485158))return![];}}if(_0x195ed8[_0x7f2216(0xf0)](/<CANNOT SELL ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x29eb8a=JSON[_0x7f2216(0x21a)]('['+RegExp['$1'][_0x7f2216(0xf0)](/\d+/g)+']');for(const _0x2b6df7 of _0x29eb8a){if($gameSwitches[_0x7f2216(0x41e)](_0x2b6df7))return![];}}return VisuMZ[_0x7f2216(0x3a2)]['Window_ShopSell_isEnabled']['call'](this,_0x23898f);},Window_ShopStatus[_0x59ef57(0x153)]=VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x16f)][_0x59ef57(0x372)]['EquipDelayMS']??0xf0,VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x2c0)]=Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x228)],Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x228)]=function(_0x5c297d){const _0xfc48a1=_0x59ef57;_0x5c297d=DataManager[_0xfc48a1(0x400)](_0x5c297d),DataManager[_0xfc48a1(0x189)](_0x5c297d)||DataManager[_0xfc48a1(0x3d8)](_0x5c297d)?this['setItemDelay'](_0x5c297d):VisuMZ[_0xfc48a1(0x3a2)][_0xfc48a1(0x2c0)][_0xfc48a1(0x36e)](this,_0x5c297d);},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x31e)]=function(_0x3bab0a){const _0x48c453=_0x59ef57;this[_0x48c453(0x436)]=_0x3bab0a;const _0x58838c=Window_ShopStatus[_0x48c453(0x153)];setTimeout(this[_0x48c453(0x2bb)][_0x48c453(0x4eb)](this,_0x3bab0a),_0x58838c);},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x2bb)]=function(_0x2f3586){const _0x2ef5d9=_0x59ef57;this[_0x2ef5d9(0x436)]===_0x2f3586&&this['refresh']();},Window_ShopStatus[_0x59ef57(0x263)]['isPageChangeRequested']=function(){return![];},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0xba)]=function(){const _0x2b2674=_0x59ef57;Window_StatusBase[_0x2b2674(0x263)][_0x2b2674(0xba)][_0x2b2674(0x36e)](this);for(const _0x4620f1 of $gameParty['members']()){ImageManager['loadCharacter'](_0x4620f1['characterName']());}},Window_ShopStatus[_0x59ef57(0x263)]['translucentOpacity']=function(){const _0xd3f545=_0x59ef57;return VisuMZ[_0xd3f545(0x3a2)][_0xd3f545(0x16f)][_0xd3f545(0x372)][_0xd3f545(0x4df)];},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x3d1)]=function(){const _0x4c2ae2=_0x59ef57;this['contents'][_0x4c2ae2(0x4b8)](),this[_0x4c2ae2(0x12e)]['clear'](),this[_0x4c2ae2(0x436)]&&(this[_0x4c2ae2(0x389)](),this[_0x4c2ae2(0x3d2)](!![]),this['prepareItemCustomData'](),this['isEquipItem']()?this[_0x4c2ae2(0x390)]():this[_0x4c2ae2(0x488)](),this[_0x4c2ae2(0xab)]());},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x12a)]=function(_0x344ab3,_0x310c51){const _0x260bcf=_0x59ef57;if(!this[_0x260bcf(0x18f)]()&&!DataManager[_0x260bcf(0x327)](this[_0x260bcf(0x436)]))return;const _0x583a99=this['innerWidth']-this[_0x260bcf(0x324)]()-_0x344ab3,_0xecaba2=this[_0x260bcf(0x26c)](_0x260bcf(0x1ef));this[_0x260bcf(0x1bd)](ColorManager['systemColor']()),this[_0x260bcf(0x207)](TextManager[_0x260bcf(0x2ef)],_0x344ab3+this[_0x260bcf(0x324)](),_0x310c51,_0x583a99-_0xecaba2),this[_0x260bcf(0xfe)](),this[_0x260bcf(0x130)](this[_0x260bcf(0x436)],_0x344ab3,_0x310c51,_0x583a99);},Window_ShopStatus[_0x59ef57(0x263)]['drawItemDarkRect']=function(_0x261ee7,_0x1e6c3c,_0x200b55,_0x152378,_0x57835e){const _0x284d1d=_0x59ef57;if(VisuMZ[_0x284d1d(0x3a2)][_0x284d1d(0x16f)][_0x284d1d(0x372)][_0x284d1d(0x2cf)]===![])return;_0x57835e=Math[_0x284d1d(0xca)](_0x57835e||0x1,0x1);while(_0x57835e--){_0x152378=_0x152378||this[_0x284d1d(0x482)](),this[_0x284d1d(0x12e)][_0x284d1d(0x425)]=0xa0;const _0x24ccb6=ColorManager[_0x284d1d(0x3c8)]();this[_0x284d1d(0x12e)]['fillRect'](_0x261ee7+0x1,_0x1e6c3c+0x1,_0x200b55-0x2,_0x152378-0x2,_0x24ccb6),this['contentsBack'][_0x284d1d(0x425)]=0xff;}},ColorManager['getItemsEquipsCoreBackColor1']=function(){const _0x1941f4=_0x59ef57,_0x5d9b8a=VisuMZ[_0x1941f4(0x3a2)][_0x1941f4(0x16f)][_0x1941f4(0x372)];let _0x1ab2d6=_0x5d9b8a[_0x1941f4(0x38f)]!==undefined?_0x5d9b8a[_0x1941f4(0x38f)]:0x13;return ColorManager[_0x1941f4(0x232)](_0x1ab2d6);},Window_ShopStatus['prototype'][_0x59ef57(0x390)]=function(){const _0x3d89d5=_0x59ef57,_0x36e924=this['getEquipDataStyle']();if(_0x36e924===_0x3d89d5(0x17d))this[_0x3d89d5(0x4ac)]();else _0x36e924===_0x3d89d5(0x26f)?this['drawEquipDataDouble']():this[_0x3d89d5(0x2d2)]();},Window_ShopStatus['prototype'][_0x59ef57(0x103)]=function(){const _0x4c1cbd=_0x59ef57;let _0x33d7b4=VisuMZ[_0x4c1cbd(0x3a2)][_0x4c1cbd(0x16f)][_0x4c1cbd(0x372)]['EquipDataStyle']??_0x4c1cbd(0x17d);const _0x271a57=/<STATUS STYLE:[ ](.*)>/i;return this[_0x4c1cbd(0x436)]&&this[_0x4c1cbd(0x436)][_0x4c1cbd(0x278)]&&this['_item']['note'][_0x4c1cbd(0xf0)](_0x271a57)&&(_0x33d7b4=String(RegExp['$1'])['toLowerCase']()[_0x4c1cbd(0x298)]()),_0x33d7b4;},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x4ac)]=function(){const _0xa0c368=_0x59ef57;this[_0xa0c368(0x34f)]=null;if(VisuMZ[_0xa0c368(0x3a2)][_0xa0c368(0x16f)]['StatusWindow'][_0xa0c368(0x196)]){VisuMZ[_0xa0c368(0x3a2)][_0xa0c368(0x16f)][_0xa0c368(0x372)][_0xa0c368(0x196)][_0xa0c368(0x36e)](this);return;}const _0x2cbe73=this['lineHeight'](),_0x2bd582=this['gaugeLineHeight']()+0x8;let _0x56b2a3=0x0,_0x2ab165=0x0,_0x1334d2=this[_0xa0c368(0xd2)],_0xcf07c2=this[_0xa0c368(0x2ff)],_0x2b0a9c=Math['floor'](_0x1334d2/0x2),_0xea3326=_0x56b2a3+_0x1334d2-_0x2b0a9c;this[_0xa0c368(0x2f0)](this['_item'],_0x56b2a3+this[_0xa0c368(0x324)](),_0x2ab165,_0x1334d2-this['itemPadding']()*0x2),this['drawItemDarkRect'](_0x56b2a3,_0x2ab165,_0x1334d2),_0x2ab165+=_0x2cbe73;if(this['drawItemEquipType'](_0x56b2a3,_0x2ab165,_0x2b0a9c))_0x2ab165+=0x0;if(this[_0xa0c368(0xd3)](_0xea3326,_0x2ab165,_0x2b0a9c))_0x2ab165+=_0x2cbe73;const _0x3ccea0=this[_0xa0c368(0x11c)](),_0x393b31=_0x2ab165;_0x2ab165=_0xcf07c2-_0x3ccea0[_0xa0c368(0x104)]*_0x2bd582-0x4;let _0x333387=_0x56b2a3,_0x53e520=0x0,_0x41a592=_0x2ab165;for(const _0x3504e4 of _0x3ccea0){_0x53e520=Math[_0xa0c368(0xca)](this[_0xa0c368(0x21e)](_0x3504e4,_0x56b2a3+0x4,_0x2ab165+0x4,_0x1334d2),_0x53e520),_0x2ab165+=_0x2bd582;}const _0xb9caf=$gameParty['maxBattleMembers'](),_0x321b4b=Math[_0xa0c368(0x4bd)]((_0x1334d2-_0x53e520)/_0xb9caf);_0x53e520=_0x1334d2-_0x321b4b*_0xb9caf;for(const _0x18124b of $gameParty[_0xa0c368(0x1b8)]()){const _0x499b20=$gameParty['battleMembers']()[_0xa0c368(0x179)](_0x18124b),_0x2e2113=_0x333387+_0x53e520+_0x499b20*_0x321b4b;this[_0xa0c368(0x3d2)](_0x18124b['canEquip'](this['_item'])),this[_0xa0c368(0x1f3)](_0x18124b,_0x2e2113+_0x321b4b/0x2,_0x41a592);let _0x418094=_0x41a592;for(const _0x5c5442 of _0x3ccea0){const _0x1256ee=_0x418094-(_0x2cbe73-_0x2bd582)/0x2;this[_0xa0c368(0x318)](_0x18124b,_0x5c5442,_0x2e2113,_0x1256ee,_0x321b4b),_0x418094+=_0x2bd582;}}this['drawItemDarkRect'](_0x333387,_0x393b31,_0x53e520,_0x41a592-_0x393b31);for(let _0x4f27b0=0x0;_0x4f27b0<_0xb9caf;_0x4f27b0++){const _0x5b243d=_0x333387+_0x53e520+_0x4f27b0*_0x321b4b;this[_0xa0c368(0x3e0)](_0x5b243d,_0x393b31,_0x321b4b,_0x41a592-_0x393b31);}for(const _0x5f564d of _0x3ccea0){this[_0xa0c368(0x3e0)](_0x333387,_0x41a592,_0x53e520,_0x2bd582);for(let _0x148b4c=0x0;_0x148b4c<_0xb9caf;_0x148b4c++){const _0x332f51=_0x333387+_0x53e520+_0x148b4c*_0x321b4b;this[_0xa0c368(0x3e0)](_0x332f51,_0x41a592,_0x321b4b,_0x2bd582);}_0x41a592+=_0x2bd582;}},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x2d2)]=function(){const _0x36852f=_0x59ef57;this[_0x36852f(0x34f)]=null;if(VisuMZ['ItemsEquipsCore'][_0x36852f(0x16f)]['StatusWindow'][_0x36852f(0xae)]){VisuMZ[_0x36852f(0x3a2)][_0x36852f(0x16f)][_0x36852f(0x372)][_0x36852f(0xae)][_0x36852f(0x36e)](this);return;}const _0x37b8cd=this[_0x36852f(0x482)]();let _0x25b61b=0x0,_0x137aac=0x0,_0x208189=this[_0x36852f(0xd2)],_0x17c378=this[_0x36852f(0x2ff)],_0x4e750d=Math['floor'](_0x208189/0x2),_0x39ade7=_0x25b61b+_0x208189-_0x4e750d;this[_0x36852f(0x2f0)](this[_0x36852f(0x436)],_0x25b61b+this[_0x36852f(0x324)](),_0x137aac,_0x208189-this[_0x36852f(0x324)]()*0x2),this['drawItemDarkRect'](_0x25b61b,_0x137aac,_0x208189),_0x137aac+=_0x37b8cd;if(this[_0x36852f(0x3f3)](_0x25b61b,_0x137aac,_0x4e750d))_0x137aac+=0x0;if(this['drawItemQuantity'](_0x39ade7,_0x137aac,_0x4e750d))_0x137aac+=_0x37b8cd;if(this[_0x36852f(0x473)](_0x25b61b,_0x137aac,_0x208189))_0x137aac+=_0x37b8cd;const _0x142822=this['actorParams']();for(const _0x3e2725 of _0x142822){if(this[_0x36852f(0x406)](_0x3e2725))continue;this[_0x36852f(0x2d6)](_0x3e2725,_0x25b61b,_0x137aac,_0x208189),_0x137aac+=_0x37b8cd;}_0x137aac=this[_0x36852f(0x30f)](_0x25b61b,_0x137aac,_0x208189),this['drawItemDarkRect'](_0x25b61b,_0x137aac,_0x208189,_0x17c378-_0x137aac);},Window_ShopStatus['prototype'][_0x59ef57(0x129)]=function(){const _0x434fab=_0x59ef57;this[_0x434fab(0x34f)]=null;if(VisuMZ[_0x434fab(0x3a2)][_0x434fab(0x16f)]['StatusWindow'][_0x434fab(0x416)]){VisuMZ[_0x434fab(0x3a2)][_0x434fab(0x16f)][_0x434fab(0x372)][_0x434fab(0x416)][_0x434fab(0x36e)](this);return;}const _0x4957e2=this['lineHeight']();let _0x592d99=0x0,_0x3c2cff=0x0,_0x145aa3=this[_0x434fab(0xd2)],_0x21c084=this['innerHeight'],_0xff72db=Math[_0x434fab(0x4bd)](_0x145aa3/0x2),_0x2823e7=_0x592d99+_0x145aa3-_0xff72db;this[_0x434fab(0x2f0)](this['_item'],_0x592d99+this['itemPadding'](),_0x3c2cff,_0x145aa3-this['itemPadding']()*0x2),this[_0x434fab(0x3e0)](_0x592d99,_0x3c2cff,_0x145aa3),_0x3c2cff+=_0x4957e2;if(this[_0x434fab(0x3f3)](_0x592d99,_0x3c2cff,_0xff72db))_0x3c2cff+=0x0;if(this['drawItemQuantity'](_0x2823e7,_0x3c2cff,_0xff72db))_0x3c2cff+=_0x4957e2;if(this[_0x434fab(0x473)](_0x592d99,_0x3c2cff,_0x145aa3))_0x3c2cff+=_0x4957e2;const _0x282b04=this[_0x434fab(0x11c)]();for(const _0xaf20ef of _0x282b04){if(this['isCustomParameter'](_0xaf20ef))continue;this[_0x434fab(0x2d6)](_0xaf20ef,_0x592d99,_0x3c2cff,_0xff72db),_0x592d99===_0xff72db?(_0x3c2cff+=_0x4957e2,_0x592d99=0x0):_0x592d99=_0xff72db;}_0x592d99===_0xff72db&&(this['drawItemDarkRect'](_0xff72db,_0x3c2cff,_0xff72db,_0x4957e2),_0x3c2cff+=_0x4957e2,_0x592d99=0x0),_0x3c2cff=this[_0x434fab(0x30f)](_0x592d99,_0x3c2cff,_0x145aa3),this[_0x434fab(0x3e0)](_0x592d99,_0x3c2cff,_0x145aa3,_0x21c084-_0x3c2cff);},Window_ShopStatus['prototype'][_0x59ef57(0x3f3)]=function(_0x240e88,_0x3da95f,_0x521311){const _0x1fff51=_0x59ef57;if(!this[_0x1fff51(0x18f)]())return![];const _0x32bb66=$dataSystem[_0x1fff51(0x376)][this[_0x1fff51(0x436)][_0x1fff51(0x352)]];return this['drawItemKeyData'](_0x32bb66,_0x240e88,_0x3da95f,_0x521311,!![]),this[_0x1fff51(0x3e0)](_0x240e88,_0x3da95f,_0x521311),this[_0x1fff51(0x389)](),!![];},Window_ShopStatus[_0x59ef57(0x263)]['drawItemEquipSubType']=function(_0x3dff53,_0x2ec43a,_0x29fc0a){const _0x109554=_0x59ef57;if(!this[_0x109554(0x18f)]())return![];let _0x404330='',_0x52af92='';const _0x2d874c=VisuMZ['ItemsEquipsCore'][_0x109554(0x16f)][_0x109554(0x372)];return DataManager[_0x109554(0x189)](this[_0x109554(0x436)])?(_0x404330=_0x2d874c[_0x109554(0x32b)]??'Weapon\x20Type',_0x52af92=$dataSystem[_0x109554(0x408)][this[_0x109554(0x436)][_0x109554(0x45f)]]||_0x2d874c[_0x109554(0x1a4)]||'-'):(_0x404330=_0x2d874c['ArmorType']??_0x109554(0x2fc),_0x52af92=$dataSystem[_0x109554(0x3e4)][this[_0x109554(0x436)][_0x109554(0x22b)]]||_0x2d874c['NoEquipTypeResult']||'-'),this[_0x109554(0x125)](_0x404330,_0x3dff53,_0x2ec43a,_0x29fc0a,!![]),this['drawItemKeyData'](_0x52af92,_0x3dff53,_0x2ec43a,_0x29fc0a,![],'right'),this[_0x109554(0x3e0)](_0x3dff53,_0x2ec43a,_0x29fc0a),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x380)]=function(){const _0x2a1b8a=_0x59ef57,_0x563978=VisuMZ[_0x2a1b8a(0x3a2)][_0x2a1b8a(0x16f)][_0x2a1b8a(0xb6)][_0x2a1b8a(0x35b)];return _0x563978[_0x2a1b8a(0x46e)]($gameParty[_0x2a1b8a(0x36a)](this[_0x2a1b8a(0x436)]));},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x11c)]=function(){const _0x4656ac=_0x59ef57;let _0x429355=[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];if(Imported[_0x4656ac(0x492)]){_0x429355=VisuMZ[_0x4656ac(0x294)][_0x4656ac(0x16f)]['Param'][_0x4656ac(0x3cd)];if(this['equipHasCustomParams']())return this[_0x4656ac(0x46d)]();const _0x29377f=VisuMZ[_0x4656ac(0x3a2)][_0x4656ac(0x16f)][_0x4656ac(0x372)];if(this['getEquipDataStyle']()===_0x4656ac(0xbb)){if(DataManager[_0x4656ac(0x189)](this[_0x4656ac(0x436)]))_0x429355=_0x429355[_0x4656ac(0x415)](_0x29377f[_0x4656ac(0x3a4)]||[]);if(DataManager['isArmor'](this[_0x4656ac(0x436)]))_0x429355=_0x429355[_0x4656ac(0x415)](_0x29377f[_0x4656ac(0x18d)]||[]);}else{if(this['getEquipDataStyle']()===_0x4656ac(0x26f)){if(DataManager[_0x4656ac(0x189)](this['_item']))_0x429355=_0x429355[_0x4656ac(0x415)](_0x29377f[_0x4656ac(0x4db)]||[]);if(DataManager[_0x4656ac(0x3d8)](this['_item']))_0x429355=_0x429355[_0x4656ac(0x415)](_0x29377f[_0x4656ac(0x3ec)]||[]);}}}return _0x429355=_0x429355[_0x4656ac(0x2ed)](_0x12a64c=>typeof _0x12a64c===_0x4656ac(0x27a)?_0x12a64c:_0x12a64c[_0x4656ac(0x4f2)]()['trim']()),_0x429355;},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x116)]=function(){const _0x20296b=_0x59ef57;return VisuMZ[_0x20296b(0x3a2)][_0x20296b(0x16f)][_0x20296b(0x372)]['ParamChangeFontSize'];},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x21e)]=function(_0x224648,_0x37ad69,_0x27078f,_0x5a766a){const _0x1a4b60=_0x59ef57;this[_0x1a4b60(0x389)](),this[_0x1a4b60(0x10e)]['fontSize']=this['smallParamFontSize']();let _0xa55320=this[_0x1a4b60(0x26c)](TextManager[_0x1a4b60(0x238)](_0x224648))+0x4+_0x37ad69;return Imported['VisuMZ_0_CoreEngine']?(this[_0x1a4b60(0x1db)](_0x37ad69,_0x27078f,_0x5a766a,_0x224648,!![]),VisuMZ[_0x1a4b60(0x294)][_0x1a4b60(0x16f)][_0x1a4b60(0x267)][_0x1a4b60(0x2e3)]&&(_0xa55320+=ImageManager[_0x1a4b60(0x1a2)]+0x4)):(this[_0x1a4b60(0x1bd)](ColorManager[_0x1a4b60(0x1d5)]()),this['drawText'](TextManager[_0x1a4b60(0x238)](_0x224648),_0x37ad69,_0x27078f,_0x5a766a)),this[_0x1a4b60(0x389)](),_0xa55320;},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x318)]=function(_0x18e563,_0x3feba8,_0x24db8c,_0x141ea2,_0x552143){const _0x2f3b24=_0x59ef57;_0x24db8c+=this[_0x2f3b24(0x324)](),_0x552143-=this[_0x2f3b24(0x324)]()*0x2;const _0x5c0b41=VisuMZ[_0x2f3b24(0x3a2)][_0x2f3b24(0x16f)][_0x2f3b24(0x372)];this[_0x2f3b24(0x10e)][_0x2f3b24(0xf2)]=_0x5c0b41[_0x2f3b24(0x2f7)],this[_0x2f3b24(0x3d2)](_0x18e563[_0x2f3b24(0x191)](this[_0x2f3b24(0x436)]));if(_0x18e563['isEquipped'](this[_0x2f3b24(0x436)])&&!_0x18e563[_0x2f3b24(0x48b)](this[_0x2f3b24(0x436)])){const _0x1abe43=_0x5c0b41[_0x2f3b24(0x288)];this[_0x2f3b24(0x207)](_0x1abe43,_0x24db8c,_0x141ea2,_0x552143,_0x2f3b24(0x206));}else{if(_0x18e563[_0x2f3b24(0x191)](this[_0x2f3b24(0x436)])){const _0x3d5c02=this[_0x2f3b24(0x27d)](_0x18e563);let _0x378144=0x0,_0x30c52c=0x0,_0x1e9cef=0x0;Imported['VisuMZ_0_CoreEngine']?(_0x378144=_0x3d5c02['paramValueByName'](_0x3feba8),_0x30c52c=_0x378144-_0x18e563[_0x2f3b24(0x150)](_0x3feba8),this[_0x2f3b24(0x1bd)](ColorManager[_0x2f3b24(0x3f6)](_0x30c52c)),_0x1e9cef=(_0x30c52c>=0x0?'+':'')+VisuMZ['ConvertNumberToString'](_0x30c52c,0x0,_0x3feba8)):(_0x378144=_0x3d5c02[_0x2f3b24(0x238)](_0x3feba8),_0x30c52c=_0x378144-_0x18e563[_0x2f3b24(0x238)](_0x3feba8),this[_0x2f3b24(0x1bd)](ColorManager[_0x2f3b24(0x3f6)](_0x30c52c)),_0x1e9cef=(_0x30c52c>=0x0?'+':'')+_0x30c52c),_0x1e9cef==='+0'&&(_0x1e9cef=_0x5c0b41[_0x2f3b24(0x1b9)]),this[_0x2f3b24(0x207)](_0x1e9cef,_0x24db8c,_0x141ea2,_0x552143,_0x2f3b24(0x206));}else{const _0x4c46df=_0x5c0b41[_0x2f3b24(0x374)];this[_0x2f3b24(0x207)](_0x4c46df,_0x24db8c,_0x141ea2,_0x552143,'center');}}this[_0x2f3b24(0x389)](),this[_0x2f3b24(0x3d2)](!![]);},Window_ShopStatus[_0x59ef57(0x263)]['createTempActorEquips']=function(_0x38c766){const _0xd70f02=_0x59ef57;if(this['needsNewTempActor'](_0x38c766)){const _0x4de181=JsonEx[_0xd70f02(0x15c)](_0x38c766);_0x4de181[_0xd70f02(0x34f)]=!![];const _0x4fdda7=_0x4de181[_0xd70f02(0x47a)](this[_0xd70f02(0x436)]);_0x4fdda7>=0x0&&_0x4de181[_0xd70f02(0x3f7)](_0x4fdda7,this[_0xd70f02(0x436)]),this['_tempActor']=_0x4de181;}return this[_0xd70f02(0x34f)];},Window_ShopStatus[_0x59ef57(0x263)]['needsNewTempActor']=function(_0xcaafbb){const _0x5b7102=_0x59ef57;if(!this[_0x5b7102(0x34f)])return!![];return this[_0x5b7102(0x34f)][_0x5b7102(0x3b2)]()!==_0xcaafbb[_0x5b7102(0x3b2)]();},Game_Actor[_0x59ef57(0x263)][_0x59ef57(0x48b)]=function(_0x428911){const _0x55fa2d=_0x59ef57;if(!_0x428911)return![];const _0x7a8210=_0x428911[_0x55fa2d(0x352)],_0x52d21d=this[_0x55fa2d(0x204)]();for(let _0x507bed=0x0;_0x507bed<_0x52d21d['length'];_0x507bed++){const _0x4dbf1f=_0x52d21d[_0x507bed];if(_0x4dbf1f!==_0x7a8210)continue;if(!this[_0x55fa2d(0x19a)]()[_0x507bed])return!![];}return![];},Game_Actor[_0x59ef57(0x263)][_0x59ef57(0x47a)]=function(_0x31d9db){const _0x50e01d=_0x59ef57;if(!_0x31d9db)return-0x1;const _0x56d691=_0x31d9db[_0x50e01d(0x352)],_0x30dd50=this[_0x50e01d(0x204)]();let _0x4a78b0=-0x1;for(let _0x12990a=0x0;_0x12990a<_0x30dd50[_0x50e01d(0x104)];_0x12990a++){const _0x2a3c00=_0x30dd50[_0x12990a];if(_0x2a3c00!==_0x56d691)continue;if(!this['equips']()[_0x12990a])return _0x12990a;if(_0x4a78b0<0x0)_0x4a78b0=_0x12990a;}return _0x4a78b0;},Window_ShopStatus['prototype'][_0x59ef57(0x2d6)]=function(_0x5f216d,_0x37b7a8,_0x2bcf99,_0x3247f5){const _0x1bbdf0=_0x59ef57,_0x2b1755=TextManager['param'](_0x5f216d);this[_0x1bbdf0(0x125)](_0x2b1755,_0x37b7a8,_0x2bcf99,_0x3247f5,!![]);let _0x4f00c1='+0';Imported[_0x1bbdf0(0x492)]?_0x4f00c1=this[_0x1bbdf0(0xcb)](_0x5f216d):_0x4f00c1=this[_0x1bbdf0(0x222)](_0x5f216d),this[_0x1bbdf0(0x125)](_0x4f00c1,_0x37b7a8,_0x2bcf99,_0x3247f5,![],_0x1bbdf0(0x34c)),this[_0x1bbdf0(0x3e0)](_0x37b7a8,_0x2bcf99,_0x3247f5);},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x406)]=function(_0x55fae2){const _0x72373f=_0x59ef57;return Imported[_0x72373f(0x492)]?!!VisuMZ['CoreEngine'][_0x72373f(0x16d)][_0x55fae2]:![];},Window_ShopStatus['prototype'][_0x59ef57(0xcb)]=function(_0x48d4c5){const _0x596040=_0x59ef57;if(this[_0x596040(0x21c)][_0x48d4c5])return this[_0x596040(0x21c)][_0x48d4c5];const _0x1c9eb5=['MAXHP',_0x596040(0x1c0),_0x596040(0x3d6),_0x596040(0x4a9),_0x596040(0x273),'MDF','AGI',_0x596040(0x341)],_0x13e3d8=[_0x596040(0x270),'EVA',_0x596040(0x486),_0x596040(0xdc),'MEV',_0x596040(0x11d),_0x596040(0x3ad),_0x596040(0x378),_0x596040(0x3dc),'TRG'],_0xa47ccd=['TGR',_0x596040(0x31d),_0x596040(0x322),'PHA',_0x596040(0x11b),_0x596040(0x286),_0x596040(0x31a),_0x596040(0x4bc),_0x596040(0x302),'EXR'];if(_0x1c9eb5[_0x596040(0x291)](_0x48d4c5)){const _0x3689b5=_0x1c9eb5['indexOf'](_0x48d4c5),_0x2320c6=this[_0x596040(0x436)][_0x596040(0xc3)][_0x3689b5]||0x0;return this['changeTextColor'](ColorManager[_0x596040(0x3f6)](_0x2320c6)),(_0x2320c6>=0x0?'+':'')+String(_0x2320c6);}else{if(_0x13e3d8['includes'](_0x48d4c5)){const _0x58f06=_0x13e3d8[_0x596040(0x179)](_0x48d4c5);let _0x36fd07=0x0;for(const _0x5b0d0e of this[_0x596040(0x436)][_0x596040(0x184)]){if(_0x5b0d0e[_0x596040(0x4c9)]!==0x16)continue;_0x5b0d0e['dataId']===_0x58f06&&(_0x36fd07+=_0x5b0d0e[_0x596040(0x41e)]||0x0);}return this[_0x596040(0x1bd)](ColorManager[_0x596040(0x3f6)](_0x36fd07)),_0x36fd07*=0x64,(_0x36fd07>=0x0?'+':'')+String(_0x36fd07)+'%';}else{if(_0xa47ccd[_0x596040(0x291)](_0x48d4c5)){const _0x59ae40=_0xa47ccd[_0x596040(0x179)](_0x48d4c5);let _0x5a649b=0x1;for(const _0x27a23e of this[_0x596040(0x436)][_0x596040(0x184)]){if(_0x27a23e[_0x596040(0x4c9)]!==0x17)continue;_0x27a23e[_0x596040(0x142)]===_0x59ae40&&(_0x5a649b*=_0x27a23e[_0x596040(0x41e)]||0x0);}let _0x4bb9cc=0x1;if([_0x596040(0x1ad),_0x596040(0x11b),_0x596040(0x31a),_0x596040(0x4bc),_0x596040(0x302)][_0x596040(0x291)](_0x48d4c5))_0x4bb9cc=-0x1;return this[_0x596040(0x1bd)](ColorManager[_0x596040(0x3f6)]((_0x5a649b-0x1)*_0x4bb9cc)),_0x5a649b*=0x64,String(_0x5a649b)+'%';}}}return'';},Window_ShopStatus[_0x59ef57(0x263)]['getParamValueClassicNoCore']=function(_0x42d580){const _0x265484=_0x59ef57,_0x1e8ff8=['MAXHP',_0x265484(0x1c0),'ATK',_0x265484(0x4a9),_0x265484(0x273),_0x265484(0x428),_0x265484(0x365),'LUK'],_0x305b9d=_0x1e8ff8[_0x42d580]||_0x265484(0x1a6);if(this[_0x265484(0x21c)][_0x305b9d])return this[_0x265484(0x21c)][_0x305b9d];const _0x26edf8=Number(this['_item'][_0x265484(0xc3)][_0x42d580]||0x0);return this[_0x265484(0x1bd)](ColorManager['paramchangeTextColor'](_0x26edf8)),(_0x26edf8>=0x0?'+':'')+String(_0x26edf8);},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x304)]=function(){const _0x179100=_0x59ef57,_0xeebcba=/<CUSTOM STATUS PARAM(?:|S|ETERS):[ ](.*)>/i;return this[_0x179100(0x436)]&&this['_item'][_0x179100(0x278)]&&this['_item'][_0x179100(0x278)][_0x179100(0xf0)](_0xeebcba);},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x46d)]=function(){const _0x4d41a6=_0x59ef57,_0x2ba4a8=/<CUSTOM STATUS PARAM(?:|S|ETERS):[ ](.*)>/i;this[_0x4d41a6(0x436)][_0x4d41a6(0x278)]['match'](_0x2ba4a8);const _0x5333bf=String(RegExp['$1'])[_0x4d41a6(0x15b)](',')[_0x4d41a6(0x2ed)](_0x42a461=>_0x42a461[_0x4d41a6(0x4f2)]()[_0x4d41a6(0x298)]()),_0x53935f=[_0x4d41a6(0x313),'MAXMP','ATK',_0x4d41a6(0x4a9),_0x4d41a6(0x273),_0x4d41a6(0x428),_0x4d41a6(0x365),'LUK'],_0x581fe6=[_0x4d41a6(0x270),_0x4d41a6(0xc4),_0x4d41a6(0x486),_0x4d41a6(0xdc),_0x4d41a6(0x210),_0x4d41a6(0x11d),'CNT',_0x4d41a6(0x378),_0x4d41a6(0x3dc),_0x4d41a6(0x25a)],_0x4250dc=['TGR',_0x4d41a6(0x31d),_0x4d41a6(0x322),_0x4d41a6(0x237),_0x4d41a6(0x11b),_0x4d41a6(0x286),_0x4d41a6(0x31a),_0x4d41a6(0x4bc),_0x4d41a6(0x302),_0x4d41a6(0xd4)];let _0x1c0d79=[];for(const _0x1717c3 of _0x5333bf){if(_0x53935f[_0x4d41a6(0x291)](_0x1717c3))_0x1c0d79[_0x4d41a6(0x2a9)](_0x1717c3);if(_0x581fe6[_0x4d41a6(0x291)](_0x1717c3))_0x1c0d79['push'](_0x1717c3);if(_0x4250dc[_0x4d41a6(0x291)](_0x1717c3))_0x1c0d79[_0x4d41a6(0x2a9)](_0x1717c3);}return _0x1c0d79;},Window_ShopStatus[_0x59ef57(0x263)]['drawItemData']=function(){const _0x9b494c=_0x59ef57;VisuMZ['ItemsEquipsCore'][_0x9b494c(0x16f)]['StatusWindow']['DrawItemData'][_0x9b494c(0x36e)](this);},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x2f0)]=function(_0x27a287,_0x323022,_0x41af08,_0x53a87f){const _0xd6d56a=_0x59ef57,_0x1b0fdf=DataManager['isSkill'](_0x27a287,_0x323022,_0x41af08,_0x53a87f)&&Imported[_0xd6d56a(0x4ef)],_0x319400=_0x27a287?_0x27a287[_0xd6d56a(0x26b)]:'';if(_0x1b0fdf)Window_SkillList['prototype'][_0xd6d56a(0x3be)][_0xd6d56a(0x36e)](this,_0x27a287);Window_Base[_0xd6d56a(0x263)][_0xd6d56a(0x2f0)][_0xd6d56a(0x36e)](this,_0x27a287,_0x323022,_0x41af08,_0x53a87f);if(_0x1b0fdf)_0x27a287['name']=_0x319400;},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x2b3)]=function(){const _0x469f56=_0x59ef57;this[_0x469f56(0x21c)]={};if(!this['_item'])return;const _0x4a89ed=this[_0x469f56(0x436)][_0x469f56(0x278)];if(_0x4a89ed[_0x469f56(0xf0)](/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)){const _0x162920=String(RegExp['$1'])[_0x469f56(0x15b)](/[\r\n]+/);for(const _0xd0f7b9 of _0x162920){if(_0xd0f7b9[_0x469f56(0xf0)](/(.*):[ ](.*)/i)){const _0x1ea114=String(RegExp['$1'])[_0x469f56(0x4f2)]()['trim'](),_0x246ec7=String(RegExp['$2'])[_0x469f56(0x298)]();this[_0x469f56(0x21c)][_0x1ea114]=_0x246ec7;}}}},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x178)]=function(){const _0x4cabad=_0x59ef57;return Math[_0x4cabad(0xca)](0x1,$gameSystem['mainFontSize']()-0x4);},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x389)]=function(){const _0x5aa1b0=_0x59ef57;Window_StatusBase[_0x5aa1b0(0x263)][_0x5aa1b0(0x389)][_0x5aa1b0(0x36e)](this),this['contents']['fontSize']=this[_0x5aa1b0(0x2c9)]||this['contents'][_0x5aa1b0(0xf2)],this[_0x5aa1b0(0x10e)][_0x5aa1b0(0x2bf)]=this[_0x5aa1b0(0x3a6)]||this[_0x5aa1b0(0x10e)][_0x5aa1b0(0x2bf)];},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x4ea)]=function(){const _0x523726=_0x59ef57;return this[_0x523726(0x10e)][_0x523726(0xf2)]/$gameSystem['mainFontSize']();},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x177)]=function(_0x4b16d2,_0x4a84ab,_0x351f33){const _0x1703da=_0x59ef57,_0x475791=ImageManager[_0x1703da(0x348)]('IconSet'),_0x103888=ImageManager[_0x1703da(0x1a2)],_0x1fba18=ImageManager[_0x1703da(0xce)],_0xbce44e=_0x4b16d2%0x10*_0x103888,_0x3bf486=Math[_0x1703da(0x4bd)](_0x4b16d2/0x10)*_0x1fba18,_0x50ddc5=Math[_0x1703da(0x14d)](_0x103888*this[_0x1703da(0x4ea)]()),_0x6b073a=Math[_0x1703da(0x14d)](_0x1fba18*this['fontSizeRatio']());this['contents'][_0x1703da(0xd6)](_0x475791,_0xbce44e,_0x3bf486,_0x103888,_0x1fba18,_0x4a84ab,_0x351f33,_0x50ddc5,_0x6b073a);},Window_ShopStatus[_0x59ef57(0x263)]['processDrawIcon']=function(_0x340bc3,_0x524e48){const _0x35a035=_0x59ef57,_0x463f3d=ImageManager[_0x35a035(0x127)]||0x20,_0x552391=ImageManager[_0x35a035(0x45d)]||0x20;if(_0x524e48[_0x35a035(0x256)]){const _0x202db7=_0x463f3d-ImageManager['iconWidth'],_0x6123b3=_0x552391-ImageManager[_0x35a035(0xce)];let _0x1dd583=0x2,_0xd1d054=0x2;this[_0x35a035(0x482)]()!==0x24&&(_0xd1d054=Math['floor']((this[_0x35a035(0x482)]()-_0x552391)/0x2));const _0x52570b=_0x524e48['x']+Math['ceil'](Math['floor'](_0x202db7/0x2)*this[_0x35a035(0x4ea)]())+_0x1dd583,_0x5799cf=_0x524e48['y']+Math[_0x35a035(0x14d)](Math[_0x35a035(0x4bd)](_0x6123b3/0x2)*this[_0x35a035(0x4ea)]())+_0xd1d054;this[_0x35a035(0x177)](_0x340bc3,_0x52570b,_0x5799cf);}_0x524e48['x']+=Math[_0x35a035(0x14d)](_0x463f3d*this[_0x35a035(0x4ea)]()),_0x524e48['x']+=Math['ceil'](0x4*this[_0x35a035(0x4ea)]());},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x125)]=function(_0x268eae,_0x14a8db,_0x20fbc0,_0x5bd6ed,_0x21a05b,_0x2ed86c){const _0x23e26f=_0x59ef57;_0x268eae=_0x268eae||'',_0x2ed86c=_0x2ed86c||_0x23e26f(0xc7),this[_0x23e26f(0x2c9)]=this[_0x23e26f(0x178)](),this[_0x23e26f(0x3a6)]=_0x21a05b?ColorManager[_0x23e26f(0x1d5)]():this[_0x23e26f(0x10e)]['textColor'],_0x14a8db+=this['itemPadding'](),_0x5bd6ed-=this[_0x23e26f(0x324)]()*0x2;const _0x21d00e=this['textSizeEx'](_0x268eae);if(_0x2ed86c===_0x23e26f(0x206))_0x14a8db=_0x14a8db+Math['floor']((_0x5bd6ed-_0x21d00e[_0x23e26f(0x1e6)])/0x2);else _0x2ed86c===_0x23e26f(0x34c)&&(_0x14a8db=_0x14a8db+_0x5bd6ed-_0x21d00e['width']);_0x20fbc0+=(this['lineHeight']()-_0x21d00e[_0x23e26f(0x388)])/0x2,this['drawTextEx'](_0x268eae,_0x14a8db,_0x20fbc0,_0x5bd6ed),this[_0x23e26f(0x2c9)]=undefined,this[_0x23e26f(0x3a6)]=undefined,this[_0x23e26f(0x389)]();},Window_ShopStatus['prototype'][_0x59ef57(0x4b3)]=function(_0x2df3ac,_0x12fd0e,_0xbb1c64){const _0x3a2be2=_0x59ef57;if(!DataManager[_0x3a2be2(0x327)](this['_item']))return![];const _0x4349fc=this['getItemConsumableLabel']();this[_0x3a2be2(0x125)](_0x4349fc,_0x2df3ac,_0x12fd0e,_0xbb1c64,!![]);const _0x12c828=this['getItemConsumableText']();return this['drawItemKeyData'](_0x12c828,_0x2df3ac,_0x12fd0e,_0xbb1c64,![],_0x3a2be2(0x34c)),this[_0x3a2be2(0x3e0)](_0x2df3ac,_0x12fd0e,_0xbb1c64),this[_0x3a2be2(0x389)](),!![];},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x36f)]=function(){return VisuMZ['ItemsEquipsCore']['Settings']['StatusWindow']['LabelConsume'];},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x29e)]=function(){const _0x49a205=_0x59ef57,_0x2ab355=_0x49a205(0x42b);if(this[_0x49a205(0x21c)][_0x2ab355])return this[_0x49a205(0x21c)][_0x2ab355];return this[_0x49a205(0x337)]()?VisuMZ['ItemsEquipsCore'][_0x49a205(0x16f)][_0x49a205(0x372)][_0x49a205(0x12b)]:VisuMZ[_0x49a205(0x3a2)][_0x49a205(0x16f)][_0x49a205(0x372)][_0x49a205(0x40d)];},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x337)]=function(){const _0x1c3988=_0x59ef57;return VisuMZ['CoreEngine']&&VisuMZ[_0x1c3988(0x294)][_0x1c3988(0x16f)][_0x1c3988(0x13a)][_0x1c3988(0x455)]&&DataManager[_0x1c3988(0x2f3)](this[_0x1c3988(0x436)])?![]:this['_item']['consumable'];},Window_ShopStatus[_0x59ef57(0x263)]['drawItemQuantity']=function(_0x4449fb,_0x8284a3,_0x28ed0d){const _0xf5ad1e=_0x59ef57;if(!this[_0xf5ad1e(0x18f)]()&&!DataManager[_0xf5ad1e(0x327)](this['_item']))return![];if(DataManager['isKeyItem'](this['_item'])&&!$dataSystem[_0xf5ad1e(0x3ac)]){const _0x3bf055=TextManager[_0xf5ad1e(0xbd)];this[_0xf5ad1e(0x125)](_0x3bf055,_0x4449fb,_0x8284a3,_0x28ed0d,!![],_0xf5ad1e(0x206));}else{const _0x577a68=TextManager[_0xf5ad1e(0x2ef)];this['drawItemKeyData'](_0x577a68,_0x4449fb,_0x8284a3,_0x28ed0d,!![]);const _0x2a8228=this[_0xf5ad1e(0x380)]();this[_0xf5ad1e(0x125)](_0x2a8228,_0x4449fb,_0x8284a3,_0x28ed0d,![],_0xf5ad1e(0x34c));}return this[_0xf5ad1e(0x3e0)](_0x4449fb,_0x8284a3,_0x28ed0d),this[_0xf5ad1e(0x389)](),!![];},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x380)]=function(){const _0x3e347c=_0x59ef57,_0x18723a=_0x3e347c(0x424);if(this[_0x3e347c(0x21c)][_0x18723a])return this[_0x3e347c(0x21c)][_0x18723a];const _0x58e982=VisuMZ[_0x3e347c(0x3a2)][_0x3e347c(0x16f)]['ItemScene'][_0x3e347c(0x35b)];return _0x58e982['format']($gameParty[_0x3e347c(0x36a)](this[_0x3e347c(0x436)]));},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x463)]=function(_0x44d8e2,_0x59ef6e,_0x1cd237){const _0x55634c=_0x59ef57,_0x1c997a=this['getItemOccasionText']();return this[_0x55634c(0x125)](_0x1c997a,_0x44d8e2,_0x59ef6e,_0x1cd237,![],_0x55634c(0x206)),this[_0x55634c(0x3e0)](_0x44d8e2,_0x59ef6e,_0x1cd237),this[_0x55634c(0x389)](),!![];},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0xbc)]=function(){const _0x313104=_0x59ef57,_0x5ccd60='OCCASION';if(this['_customItemInfo'][_0x5ccd60])return this[_0x313104(0x21c)][_0x5ccd60];const _0x1fe9bd=VisuMZ['ItemsEquipsCore'][_0x313104(0x16f)][_0x313104(0x372)],_0x32f1e6=_0x313104(0x2c4)[_0x313104(0x46e)](this[_0x313104(0x436)]['occasion']);return _0x1fe9bd[_0x32f1e6];},Window_ShopStatus[_0x59ef57(0x263)]['drawItemScope']=function(_0x2c3cdb,_0x3bd246,_0x33fdc3){const _0x19967f=_0x59ef57,_0x4b778c=this[_0x19967f(0x1fe)]();return this['drawItemKeyData'](_0x4b778c,_0x2c3cdb,_0x3bd246,_0x33fdc3,![],_0x19967f(0x206)),this['drawItemDarkRect'](_0x2c3cdb,_0x3bd246,_0x33fdc3),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x1fe)]=function(){const _0x488e3c=_0x59ef57,_0x17d258=_0x488e3c(0x42c);if(this[_0x488e3c(0x21c)][_0x17d258])return this[_0x488e3c(0x21c)][_0x17d258];const _0x8513e9=VisuMZ['ItemsEquipsCore'][_0x488e3c(0x16f)][_0x488e3c(0x372)];if(Imported[_0x488e3c(0x20f)]){const _0x28486e=this[_0x488e3c(0x436)][_0x488e3c(0x278)];if(_0x28486e['match'](/<TARGET:[ ](.*)>/i)){const _0x5d2bb9=String(RegExp['$1']);if(_0x5d2bb9['match'](/(\d+) RANDOM ANY/i))return _0x8513e9[_0x488e3c(0x1f6)][_0x488e3c(0x46e)](Number(RegExp['$1']));else{if(_0x5d2bb9[_0x488e3c(0xf0)](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i))return _0x8513e9[_0x488e3c(0x2fe)][_0x488e3c(0x46e)](Number(RegExp['$1']));else{if(_0x5d2bb9[_0x488e3c(0xf0)](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i))return _0x8513e9[_0x488e3c(0x2f9)]['format'](Number(RegExp['$1']));else{if(_0x5d2bb9[_0x488e3c(0xf0)](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i))return _0x8513e9['ScopeAlliesButUser'];else{if(_0x5d2bb9[_0x488e3c(0xf0)](/ALLY OR ENEMY/i))return _0x8513e9['ScopeAllyOrEnemy']||_0x8513e9[_0x488e3c(0x396)];else{if(_0x5d2bb9[_0x488e3c(0xf0)](/ENEMY OR ALLY/i))return _0x8513e9[_0x488e3c(0x401)]||_0x8513e9[_0x488e3c(0x44f)];}}}}}}}const _0x1e4730=_0x488e3c(0x254)[_0x488e3c(0x46e)](this[_0x488e3c(0x436)][_0x488e3c(0x3ee)]);return _0x8513e9[_0x1e4730];},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x336)]=function(_0x4e5b6d,_0xf675c,_0x100353){const _0x154b12=_0x59ef57,_0x3f7061=this[_0x154b12(0xaf)]();this['drawItemKeyData'](_0x3f7061,_0x4e5b6d,_0xf675c,_0x100353,!![]);const _0x4d8bfd=this[_0x154b12(0x1c9)]();return this[_0x154b12(0x125)](_0x4d8bfd,_0x4e5b6d,_0xf675c,_0x100353,![],_0x154b12(0x34c)),this[_0x154b12(0x3e0)](_0x4e5b6d,_0xf675c,_0x100353),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x59ef57(0x263)]['getItemSpeedLabel']=function(){const _0x203925=_0x59ef57;return VisuMZ[_0x203925(0x3a2)]['Settings'][_0x203925(0x372)][_0x203925(0x217)];},Window_ShopStatus['prototype']['getItemSpeedText']=function(){const _0x2d83ab=_0x59ef57,_0x371b35=_0x2d83ab(0x13b);if(this[_0x2d83ab(0x21c)][_0x371b35])return this[_0x2d83ab(0x21c)][_0x371b35];const _0x261fcd=this['_item'][_0x2d83ab(0x1a3)];if(_0x261fcd>=0x7d0)return VisuMZ[_0x2d83ab(0x3a2)]['Settings'][_0x2d83ab(0x372)][_0x2d83ab(0x32c)];else{if(_0x261fcd>=0x3e8)return VisuMZ[_0x2d83ab(0x3a2)][_0x2d83ab(0x16f)]['StatusWindow'][_0x2d83ab(0x321)];else{if(_0x261fcd>0x0)return VisuMZ['ItemsEquipsCore']['Settings']['StatusWindow'][_0x2d83ab(0x3a5)];else{if(_0x261fcd===0x0)return VisuMZ[_0x2d83ab(0x3a2)]['Settings']['StatusWindow']['Speed0'];else{if(_0x261fcd>-0x3e8)return VisuMZ[_0x2d83ab(0x3a2)][_0x2d83ab(0x16f)][_0x2d83ab(0x372)][_0x2d83ab(0x209)];else{if(_0x261fcd>-0x7d0)return VisuMZ['ItemsEquipsCore'][_0x2d83ab(0x16f)][_0x2d83ab(0x372)][_0x2d83ab(0x27c)];else return _0x261fcd<=-0x7d0?VisuMZ['ItemsEquipsCore'][_0x2d83ab(0x16f)]['StatusWindow'][_0x2d83ab(0x4a0)]:_0x2d83ab(0x295);}}}}}},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x29f)]=function(_0x554320,_0x52d669,_0x298b32){const _0x23dd01=_0x59ef57,_0x5e6a0f=this['getItemSuccessRateLabel']();this[_0x23dd01(0x125)](_0x5e6a0f,_0x554320,_0x52d669,_0x298b32,!![]);const _0x1b45dd=this[_0x23dd01(0x3e3)]();return this[_0x23dd01(0x125)](_0x1b45dd,_0x554320,_0x52d669,_0x298b32,![],'right'),this[_0x23dd01(0x3e0)](_0x554320,_0x52d669,_0x298b32),this[_0x23dd01(0x389)](),!![];},Window_ShopStatus['prototype']['getItemSuccessRateLabel']=function(){const _0x460046=_0x59ef57;return VisuMZ[_0x460046(0x3a2)][_0x460046(0x16f)][_0x460046(0x372)][_0x460046(0x16a)];},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x3e3)]=function(){const _0x5cd3ed=_0x59ef57,_0x20c9c8=_0x5cd3ed(0x259);if(this['_customItemInfo'][_0x20c9c8])return this[_0x5cd3ed(0x21c)][_0x20c9c8];if(Imported['VisuMZ_1_BattleCore']){const _0x4741c5=this[_0x5cd3ed(0x436)]['note'];if(_0x4741c5[_0x5cd3ed(0xf0)](/<ALWAYS HIT>/i))return'100%';else{if(_0x4741c5[_0x5cd3ed(0xf0)](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return _0x5cd3ed(0x391)[_0x5cd3ed(0x46e)](Number(RegExp['$1']));}}return'%1%'[_0x5cd3ed(0x46e)](this['_item']['successRate']);},Window_ShopStatus['prototype'][_0x59ef57(0x1c3)]=function(_0x2db6f9,_0x46fe44,_0x246f8b){const _0x27eaad=_0x59ef57,_0x130115=this[_0x27eaad(0x131)]();this[_0x27eaad(0x125)](_0x130115,_0x2db6f9,_0x46fe44,_0x246f8b,!![]);const _0x4cb849=this[_0x27eaad(0x4f4)]();return this[_0x27eaad(0x125)](_0x4cb849,_0x2db6f9,_0x46fe44,_0x246f8b,![],_0x27eaad(0x34c)),this[_0x27eaad(0x3e0)](_0x2db6f9,_0x46fe44,_0x246f8b),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x59ef57(0x263)]['getItemRepeatsLabel']=function(){const _0x305673=_0x59ef57;return VisuMZ[_0x305673(0x3a2)][_0x305673(0x16f)][_0x305673(0x372)]['LabelRepeats'];},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x4f4)]=function(){const _0x377706=_0x59ef57,_0x399f49=_0x377706(0x2c6);if(this['_customItemInfo'][_0x399f49])return this[_0x377706(0x21c)][_0x399f49];const _0x529108=_0x377706(0x1af);return _0x529108[_0x377706(0x46e)](this[_0x377706(0x436)][_0x377706(0x395)]);},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x359)]=function(_0x21576d,_0x370b12,_0x323c5b){const _0x525d59=_0x59ef57,_0x36e01e=this[_0x525d59(0x2dd)]();this[_0x525d59(0x125)](_0x36e01e,_0x21576d,_0x370b12,_0x323c5b,!![]);const _0x36ad9d=this[_0x525d59(0x457)]();return this['drawItemKeyData'](_0x36ad9d,_0x21576d,_0x370b12,_0x323c5b,![],_0x525d59(0x34c)),this[_0x525d59(0x3e0)](_0x21576d,_0x370b12,_0x323c5b),this[_0x525d59(0x389)](),!![];},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x2dd)]=function(){const _0x17b3c7=_0x59ef57;return VisuMZ[_0x17b3c7(0x3a2)]['Settings']['StatusWindow'][_0x17b3c7(0x1cd)];},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x457)]=function(){const _0x482514=_0x59ef57,_0x6ddebd=_0x482514(0x2a8);if(this[_0x482514(0x21c)][_0x6ddebd])return this[_0x482514(0x21c)][_0x6ddebd];if(DataManager['isToggleSkill']&&DataManager['isToggleSkill'](this[_0x482514(0x436)]))return TextManager[_0x482514(0x431)];const _0x54df2=VisuMZ[_0x482514(0x3a2)][_0x482514(0x16f)]['StatusWindow'],_0x3ad15f=_0x482514(0x3b1)[_0x482514(0x46e)](this[_0x482514(0x436)]['hitType']);return _0x54df2[_0x3ad15f];},Window_ShopStatus[_0x59ef57(0x263)]['drawItemDamage']=function(_0x44cc3a,_0x44866b,_0x40f193){const _0x221985=_0x59ef57;if(this[_0x221985(0x436)][_0x221985(0x43b)][_0x221985(0x136)]<=0x0)return _0x44866b;if(this[_0x221985(0x472)](_0x44cc3a,_0x44866b,_0x40f193))_0x44866b+=this['lineHeight']();if(this[_0x221985(0x3c6)](_0x44cc3a,_0x44866b,_0x40f193))_0x44866b+=this[_0x221985(0x482)]();return this[_0x221985(0x389)](),_0x44866b;},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x472)]=function(_0x21c445,_0x159e1f,_0x3365b7){const _0x13eb32=_0x59ef57,_0x1ca459=this[_0x13eb32(0x4d5)]();this[_0x13eb32(0x125)](_0x1ca459,_0x21c445,_0x159e1f,_0x3365b7,!![]);const _0x507796=this['getItemDamageElementText']();return this[_0x13eb32(0x125)](_0x507796,_0x21c445,_0x159e1f,_0x3365b7,![],_0x13eb32(0x34c)),this['drawItemDarkRect'](_0x21c445,_0x159e1f,_0x3365b7),this[_0x13eb32(0x389)](),!![];},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x4d5)]=function(){const _0x5916cc=_0x59ef57;return VisuMZ['ItemsEquipsCore'][_0x5916cc(0x16f)][_0x5916cc(0x372)][_0x5916cc(0x2d4)];},Window_ShopStatus[_0x59ef57(0x263)]['getItemDamageElementText']=function(){const _0xa0be21=_0x59ef57,_0x404830=_0xa0be21(0x2eb);if(this['_customItemInfo'][_0x404830])return this[_0xa0be21(0x21c)][_0x404830];if(this[_0xa0be21(0x436)][_0xa0be21(0x43b)]['elementId']<=-0x1)return VisuMZ[_0xa0be21(0x3a2)][_0xa0be21(0x16f)]['StatusWindow'][_0xa0be21(0x364)];else return this[_0xa0be21(0x436)][_0xa0be21(0x43b)]['elementId']===0x0?VisuMZ['ItemsEquipsCore'][_0xa0be21(0x16f)]['StatusWindow'][_0xa0be21(0x223)]:$dataSystem['elements'][this[_0xa0be21(0x436)][_0xa0be21(0x43b)][_0xa0be21(0x146)]];},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x3c6)]=function(_0x4bb831,_0x369260,_0x77577d){const _0x5d8323=_0x59ef57,_0x7d4e8f=this[_0x5d8323(0x4fa)]();this[_0x5d8323(0x125)](_0x7d4e8f,_0x4bb831,_0x369260,_0x77577d,!![]),this['setupItemDamageTempActors']();const _0x2835ef=this[_0x5d8323(0xc6)](),_0xe841df=ColorManager[_0x5d8323(0x435)]([0x0,0x0,0x2,0x1,0x3,0x1,0x3][this[_0x5d8323(0x436)][_0x5d8323(0x43b)]['type']]);return this[_0x5d8323(0x1bd)](_0xe841df),this['drawItemKeyData'](_0x2835ef,_0x4bb831,_0x369260,_0x77577d,![],'right'),this[_0x5d8323(0x3e0)](_0x4bb831,_0x369260,_0x77577d),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x4fa)]=function(){const _0x410262=_0x59ef57;return Imported['VisuMZ_1_BattleCore']&&DataManager[_0x410262(0x383)](this[_0x410262(0x436)])!=='MANUAL'?this['getItemDamageAmountLabelBattleCore']():this[_0x410262(0x20c)]();},Window_ShopStatus['prototype']['getItemDamageAmountLabelOriginal']=function(){const _0x2c6bf4=_0x59ef57,_0x1ec07a=VisuMZ[_0x2c6bf4(0x3a2)][_0x2c6bf4(0x16f)][_0x2c6bf4(0x372)],_0x4c00f7=_0x2c6bf4(0x144)['format'](this[_0x2c6bf4(0x436)][_0x2c6bf4(0x43b)][_0x2c6bf4(0x136)]),_0x581018=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this[_0x2c6bf4(0x436)][_0x2c6bf4(0x43b)][_0x2c6bf4(0x136)]];return _0x1ec07a[_0x4c00f7][_0x2c6bf4(0x46e)](_0x581018);},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x1a1)]=function(){const _0x18e698=_0x59ef57,_0x354712=$gameActors[_0x18e698(0x481)](0x1);this[_0x18e698(0x38d)]=JsonEx[_0x18e698(0x15c)](_0x354712),this['_tempActorB']=JsonEx[_0x18e698(0x15c)](_0x354712);},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0xc6)]=function(){const _0x503e17=_0x59ef57,_0x3acbe3='DAMAGE\x20MULTIPLIER';if(this[_0x503e17(0x21c)][_0x3acbe3])return this[_0x503e17(0x21c)][_0x3acbe3];return Imported[_0x503e17(0x20f)]&&DataManager['getDamageStyle'](this[_0x503e17(0x436)])!==_0x503e17(0x2f4)?this[_0x503e17(0x47e)]():this[_0x503e17(0x289)]();},Window_ShopStatus[_0x59ef57(0x263)]['getItemDamageAmountTextOriginal']=function(){const _0x3c83d5=_0x59ef57;window['a']=this[_0x3c83d5(0x38d)],window['b']=this[_0x3c83d5(0x1b5)],this['_tempActorA']['setShopStatusWindowMode'](!![]),this['_tempActorB'][_0x3c83d5(0x4ce)]([0x3,0x4][_0x3c83d5(0x291)](this[_0x3c83d5(0x436)][_0x3c83d5(0x43b)][_0x3c83d5(0x136)]));let _0x5029ea=this[_0x3c83d5(0x436)][_0x3c83d5(0x43b)][_0x3c83d5(0x397)];try{const _0x17cb79=Math[_0x3c83d5(0xca)](eval(_0x5029ea),0x0)/window['a'][_0x3c83d5(0x30a)];return this[_0x3c83d5(0x25b)](),isNaN(_0x17cb79)?_0x3c83d5(0x295):'%1%'[_0x3c83d5(0x46e)](Math[_0x3c83d5(0x2ce)](_0x17cb79*0x64));}catch(_0x293008){return $gameTemp[_0x3c83d5(0x498)]()&&(console[_0x3c83d5(0x137)](_0x3c83d5(0x3e9)[_0x3c83d5(0x46e)](this[_0x3c83d5(0x436)]['name'])),console['log'](_0x293008)),this['revertGlobalNamespaceVariables'](),_0x3c83d5(0x295);}},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x25b)]=function(){window['a']=undefined,window['b']=undefined;},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x168)]=function(_0x237cab,_0x40a548,_0x3caa3e){const _0x16ba58=_0x59ef57;if(!this['makeItemData']())return _0x40a548;if(this[_0x16ba58(0x18c)](_0x237cab,_0x40a548,_0x3caa3e))_0x40a548+=this['lineHeight']();if(this['drawItemEffectsMpRecovery'](_0x237cab,_0x40a548,_0x3caa3e))_0x40a548+=this[_0x16ba58(0x482)]();if(this['drawItemEffectsTpRecovery'](_0x237cab,_0x40a548,_0x3caa3e))_0x40a548+=this['lineHeight']();if(this[_0x16ba58(0x4d4)](_0x237cab,_0x40a548,_0x3caa3e))_0x40a548+=this[_0x16ba58(0x482)]();if(this[_0x16ba58(0x2d7)](_0x237cab,_0x40a548,_0x3caa3e))_0x40a548+=this[_0x16ba58(0x482)]();if(this[_0x16ba58(0x373)](_0x237cab,_0x40a548,_0x3caa3e))_0x40a548+=this[_0x16ba58(0x482)]();if(this['drawItemEffectsSelfTpGain'](_0x237cab,_0x40a548,_0x3caa3e))_0x40a548+=this[_0x16ba58(0x482)]();if(this[_0x16ba58(0x312)](_0x237cab,_0x40a548,_0x3caa3e))_0x40a548+=this[_0x16ba58(0x482)]();if(this['drawItemEffectsRemovedStatesBuffs'](_0x237cab,_0x40a548,_0x3caa3e))_0x40a548+=this[_0x16ba58(0x482)]();return this['resetFontSettings'](),_0x40a548;},Window_ShopStatus['prototype'][_0x59ef57(0xef)]=function(){const _0x3100f6=_0x59ef57;return this[_0x3100f6(0x436)][_0x3100f6(0x11f)];},Window_ShopStatus['prototype'][_0x59ef57(0x4a5)]=function(){const _0x473f14=_0x59ef57;let _0x46e313=![];this[_0x473f14(0x4f0)]={'rateHP':0x0,'flatHP':0x0,'rateMP':0x0,'flatMP':0x0,'gainTP':0x0,'selfTP':0x0,'addState':[],'removeState':[],'changeBuff':[0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0],'removeBuff':[],'removeDebuff':[],'addStateBuffChanges':![],'removeStateBuffChanges':![]};const _0x49a955=this[_0x473f14(0xef)]();for(const _0x4caab0 of _0x49a955){switch(_0x4caab0[_0x473f14(0x4c9)]){case Game_Action['EFFECT_RECOVER_HP']:this[_0x473f14(0x4f0)]['rateHP']+=_0x4caab0['value1'],this[_0x473f14(0x4f0)]['flatHP']+=_0x4caab0[_0x473f14(0x3aa)],_0x46e313=!![];break;case Game_Action['EFFECT_RECOVER_MP']:this[_0x473f14(0x4f0)][_0x473f14(0xe0)]+=_0x4caab0[_0x473f14(0x3bc)],this['_itemData'][_0x473f14(0xee)]+=_0x4caab0[_0x473f14(0x3aa)],_0x46e313=!![];break;case Game_Action[_0x473f14(0x4a1)]:this['_itemData'][_0x473f14(0xe5)]+=_0x4caab0[_0x473f14(0x3bc)],_0x46e313=!![];break;case Game_Action['EFFECT_ADD_STATE']:this['_itemData'][_0x473f14(0x4f8)]['push'](_0x4caab0[_0x473f14(0x142)]),_0x46e313=!![];break;case Game_Action[_0x473f14(0x340)]:this[_0x473f14(0x4f0)]['removeState'][_0x473f14(0x2a9)](_0x4caab0['dataId']),this[_0x473f14(0x4f0)][_0x473f14(0x139)]=!![],_0x46e313=!![];break;case Game_Action[_0x473f14(0x296)]:this[_0x473f14(0x4f0)]['changeBuff'][_0x4caab0[_0x473f14(0x142)]]+=0x1,_0x46e313=!![];break;case Game_Action[_0x473f14(0x1b0)]:this[_0x473f14(0x4f0)]['changeBuff'][_0x4caab0[_0x473f14(0x142)]]-=0x1,_0x46e313=!![];break;case Game_Action[_0x473f14(0x3fe)]:this['_itemData']['removeBuff'][_0x473f14(0x2a9)](_0x4caab0[_0x473f14(0x142)]),this[_0x473f14(0x4f0)][_0x473f14(0x139)]=!![],_0x46e313=!![];break;case Game_Action[_0x473f14(0x3bb)]:this[_0x473f14(0x4f0)][_0x473f14(0x241)][_0x473f14(0x2a9)](_0x4caab0[_0x473f14(0x142)]),this[_0x473f14(0x4f0)]['removeStateBuffChanges']=!![],_0x46e313=!![];break;}}if(this[_0x473f14(0x4f0)][_0x473f14(0x4f8)][_0x473f14(0x104)]>0x0)this[_0x473f14(0x4f0)]['addStateBuffChanges']=!![];for(let _0x2aea08=0x0;_0x2aea08<this['_itemData'][_0x473f14(0x461)][_0x473f14(0x104)];_0x2aea08++){if(this[_0x473f14(0x4f0)]['changeBuff'][_0x2aea08]!==0x0)this[_0x473f14(0x4f0)][_0x473f14(0x384)]=!![];}this['_item'][_0x473f14(0x15a)]!==0x0&&(this['_itemData'][_0x473f14(0x4e9)]=this['_item'][_0x473f14(0x15a)],_0x46e313=!![]);const _0x201ae3=[_0x473f14(0xeb),_0x473f14(0x176),_0x473f14(0x14a),'HP\x20DAMAGE',_0x473f14(0x370),_0x473f14(0x141),'USER\x20TP\x20GAIN',_0x473f14(0x4f5),'REMOVED\x20EFFECTS'];for(const _0x19c261 of _0x201ae3){if(this[_0x473f14(0x21c)][_0x19c261]){_0x46e313=!![];break;}}return _0x46e313;},Window_ShopStatus['prototype'][_0x59ef57(0x18c)]=function(_0x3e86a4,_0x144397,_0x30c30a){const _0x384e8d=_0x59ef57,_0x5512ae='HP\x20RECOVERY';if(this[_0x384e8d(0x4f0)][_0x384e8d(0x493)]<=0x0&&this[_0x384e8d(0x4f0)]['flatHP']<=0x0&&!this['_customItemInfo'][_0x5512ae])return![];const _0x2901eb=this[_0x384e8d(0x423)]();this[_0x384e8d(0x125)](_0x2901eb,_0x3e86a4,_0x144397,_0x30c30a,!![]);const _0x732f8d=this[_0x384e8d(0x379)]();return this[_0x384e8d(0x1bd)](ColorManager[_0x384e8d(0x435)](0x1)),this[_0x384e8d(0x125)](_0x732f8d,_0x3e86a4,_0x144397,_0x30c30a,![],_0x384e8d(0x34c)),this[_0x384e8d(0x3e0)](_0x3e86a4,_0x144397,_0x30c30a),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x423)]=function(){const _0x237042=_0x59ef57,_0x31f686=VisuMZ['ItemsEquipsCore'][_0x237042(0x16f)]['StatusWindow'][_0x237042(0x429)];return _0x31f686[_0x237042(0x46e)](TextManager['hp']);},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x379)]=function(){const _0x41fdb9=_0x59ef57,_0x3ad528=_0x41fdb9(0xeb);if(this[_0x41fdb9(0x21c)][_0x3ad528])return this[_0x41fdb9(0x21c)][_0x3ad528];let _0x193e1c='';if(this[_0x41fdb9(0x4f0)][_0x41fdb9(0x493)]>0x0)_0x193e1c+='+%1%'[_0x41fdb9(0x46e)](Math[_0x41fdb9(0x4bd)](this[_0x41fdb9(0x4f0)]['rateHP']*0x64));if(this[_0x41fdb9(0x4f0)][_0x41fdb9(0x493)]>0x0&&this[_0x41fdb9(0x4f0)]['flatHP']>0x0)_0x193e1c+='\x20';if(this[_0x41fdb9(0x4f0)][_0x41fdb9(0x22c)]>0x0)_0x193e1c+='+%1'['format'](this[_0x41fdb9(0x4f0)][_0x41fdb9(0x22c)]);return _0x193e1c;},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x4c2)]=function(_0x823585,_0x33532d,_0x4050d5){const _0x12cb30=_0x59ef57,_0x2a1fc9=_0x12cb30(0x176);if(this[_0x12cb30(0x4f0)][_0x12cb30(0xe0)]<=0x0&&this['_itemData'][_0x12cb30(0xee)]<=0x0&&!this[_0x12cb30(0x21c)][_0x2a1fc9])return![];const _0x8e5825=this[_0x12cb30(0x484)]();this[_0x12cb30(0x125)](_0x8e5825,_0x823585,_0x33532d,_0x4050d5,!![]);const _0x3a28bb=this[_0x12cb30(0x1f9)]();return this[_0x12cb30(0x1bd)](ColorManager[_0x12cb30(0x435)](0x3)),this[_0x12cb30(0x125)](_0x3a28bb,_0x823585,_0x33532d,_0x4050d5,![],'right'),this['drawItemDarkRect'](_0x823585,_0x33532d,_0x4050d5),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x484)]=function(){const _0x2ccd9e=_0x59ef57,_0x2696c5=VisuMZ[_0x2ccd9e(0x3a2)][_0x2ccd9e(0x16f)]['StatusWindow'][_0x2ccd9e(0x122)];return _0x2696c5[_0x2ccd9e(0x46e)](TextManager['mp']);},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x1f9)]=function(){const _0x3715e2=_0x59ef57,_0x1c6928=_0x3715e2(0x176);if(this['_customItemInfo'][_0x1c6928])return this[_0x3715e2(0x21c)][_0x1c6928];let _0xac62b4='';if(this[_0x3715e2(0x4f0)][_0x3715e2(0xe0)]>0x0)_0xac62b4+='+%1%'[_0x3715e2(0x46e)](Math[_0x3715e2(0x4bd)](this[_0x3715e2(0x4f0)]['rateMP']*0x64));if(this[_0x3715e2(0x4f0)][_0x3715e2(0xe0)]>0x0&&this[_0x3715e2(0x4f0)]['flatMP']>0x0)_0xac62b4+='\x20';if(this['_itemData'][_0x3715e2(0xee)]>0x0)_0xac62b4+=_0x3715e2(0x208)['format'](this['_itemData'][_0x3715e2(0xee)]);return _0xac62b4;},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x3db)]=function(_0x19b5b0,_0x5bf9bd,_0x24c288){const _0x2fecec=_0x59ef57,_0x4b60b4=_0x2fecec(0x14a);if(this['_itemData'][_0x2fecec(0xe5)]<=0x0&&!this[_0x2fecec(0x21c)][_0x4b60b4])return![];const _0x160076=this[_0x2fecec(0x1da)]();this[_0x2fecec(0x125)](_0x160076,_0x19b5b0,_0x5bf9bd,_0x24c288,!![]);const _0x361894=this[_0x2fecec(0xe3)]();return this[_0x2fecec(0x1bd)](ColorManager[_0x2fecec(0x418)]()),this[_0x2fecec(0x125)](_0x361894,_0x19b5b0,_0x5bf9bd,_0x24c288,![],'right'),this[_0x2fecec(0x3e0)](_0x19b5b0,_0x5bf9bd,_0x24c288),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x1da)]=function(){const _0x1db5f1=_0x59ef57,_0x81b5ba=VisuMZ[_0x1db5f1(0x3a2)]['Settings']['StatusWindow'][_0x1db5f1(0x35a)];return _0x81b5ba[_0x1db5f1(0x46e)](TextManager['tp']);},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0xe3)]=function(){const _0x58500d=_0x59ef57,_0xa53184=_0x58500d(0x14a);if(this[_0x58500d(0x21c)][_0xa53184])return this[_0x58500d(0x21c)][_0xa53184];let _0x434cfe='';return _0x434cfe+=_0x58500d(0x208)[_0x58500d(0x46e)](this['_itemData']['gainTP']),_0x434cfe;},Window_ShopStatus['prototype']['drawItemEffectsSelfTpGain']=function(_0x54658f,_0x30d3b4,_0x8b1f2e){const _0x174759=_0x59ef57,_0x26a8d5=_0x174759(0x2e8);if(this['_itemData'][_0x174759(0x4e9)]===0x0&&!this[_0x174759(0x21c)][_0x26a8d5])return![];const _0x46deab=this['getItemEffectsSelfTpGainLabel']();this[_0x174759(0x125)](_0x46deab,_0x54658f,_0x30d3b4,_0x8b1f2e,!![]);const _0x570522=this[_0x174759(0x4dd)]();return this[_0x174759(0x4f0)][_0x174759(0x4e9)]>0x0?this[_0x174759(0x1bd)](ColorManager['powerUpColor']()):this[_0x174759(0x1bd)](ColorManager[_0x174759(0x171)]()),this['drawItemKeyData'](_0x570522,_0x54658f,_0x30d3b4,_0x8b1f2e,![],'right'),this[_0x174759(0x3e0)](_0x54658f,_0x30d3b4,_0x8b1f2e),this[_0x174759(0x389)](),!![];},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x281)]=function(){const _0x5c3fb6=VisuMZ['ItemsEquipsCore']['Settings']['StatusWindow']['LabelSelfGainTP'];return _0x5c3fb6['format'](TextManager['tp']);},Window_ShopStatus[_0x59ef57(0x263)]['getItemEffectsSelfTpGainText']=function(){const _0x522bbf=_0x59ef57,_0x2fbbf1=_0x522bbf(0x2e8);if(this[_0x522bbf(0x21c)][_0x2fbbf1])return this['_customItemInfo'][_0x2fbbf1];let _0x584cb6='';return this['_itemData'][_0x522bbf(0x4e9)]>0x0?_0x584cb6+=_0x522bbf(0x208)[_0x522bbf(0x46e)](this[_0x522bbf(0x4f0)]['selfTP']):_0x584cb6+='%1'['format'](this[_0x522bbf(0x4f0)]['selfTP']),_0x584cb6;},Window_ShopStatus['prototype'][_0x59ef57(0x4d4)]=function(_0x46b2de,_0x6160b9,_0x5062cd){const _0x5f00d9=_0x59ef57,_0x2b287b='HP\x20DAMAGE';if(this[_0x5f00d9(0x4f0)][_0x5f00d9(0x493)]>=0x0&&this[_0x5f00d9(0x4f0)][_0x5f00d9(0x22c)]>=0x0&&!this[_0x5f00d9(0x21c)][_0x2b287b])return![];const _0xd5bd1f=this['getItemEffectsHpDamageLabel']();this['drawItemKeyData'](_0xd5bd1f,_0x46b2de,_0x6160b9,_0x5062cd,!![]);const _0x2194e1=this[_0x5f00d9(0xe2)]();return this[_0x5f00d9(0x1bd)](ColorManager[_0x5f00d9(0x435)](0x0)),this['drawItemKeyData'](_0x2194e1,_0x46b2de,_0x6160b9,_0x5062cd,![],_0x5f00d9(0x34c)),this[_0x5f00d9(0x3e0)](_0x46b2de,_0x6160b9,_0x5062cd),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x445)]=function(){const _0x230116=_0x59ef57,_0x215421=VisuMZ[_0x230116(0x3a2)][_0x230116(0x16f)][_0x230116(0x372)][_0x230116(0x1f0)];return _0x215421['format'](TextManager['hp']);},Window_ShopStatus['prototype'][_0x59ef57(0xe2)]=function(){const _0x5f1624=_0x59ef57,_0xc974e5=_0x5f1624(0x4b4);if(this[_0x5f1624(0x21c)][_0xc974e5])return this[_0x5f1624(0x21c)][_0xc974e5];let _0x457738='';if(this['_itemData']['rateHP']<0x0)_0x457738+=_0x5f1624(0x391)[_0x5f1624(0x46e)](Math[_0x5f1624(0x4bd)](this['_itemData'][_0x5f1624(0x493)]*0x64));if(this['_itemData'][_0x5f1624(0x493)]<0x0&&this[_0x5f1624(0x4f0)][_0x5f1624(0x22c)]<0x0)_0x457738+='\x20';if(this[_0x5f1624(0x4f0)][_0x5f1624(0x22c)]<0x0)_0x457738+='%1'[_0x5f1624(0x46e)](this['_itemData'][_0x5f1624(0x22c)]);return _0x457738;},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x2d7)]=function(_0x4af7a6,_0x3cc898,_0x291c8b){const _0x2a9dd1=_0x59ef57,_0x2092e0=_0x2a9dd1(0x370);if(this[_0x2a9dd1(0x4f0)]['rateMP']>=0x0&&this[_0x2a9dd1(0x4f0)][_0x2a9dd1(0xee)]>=0x0&&!this['_customItemInfo'][_0x2092e0])return![];const _0x4b8b14=this['getItemEffectsMpDamageLabel']();this[_0x2a9dd1(0x125)](_0x4b8b14,_0x4af7a6,_0x3cc898,_0x291c8b,!![]);const _0x1689ea=this[_0x2a9dd1(0x197)]();return this[_0x2a9dd1(0x1bd)](ColorManager[_0x2a9dd1(0x435)](0x2)),this['drawItemKeyData'](_0x1689ea,_0x4af7a6,_0x3cc898,_0x291c8b,![],_0x2a9dd1(0x34c)),this['drawItemDarkRect'](_0x4af7a6,_0x3cc898,_0x291c8b),this[_0x2a9dd1(0x389)](),!![];},Window_ShopStatus['prototype']['getItemEffectsMpDamageLabel']=function(){const _0x5dd83a=_0x59ef57,_0x53e93f=VisuMZ['ItemsEquipsCore'][_0x5dd83a(0x16f)][_0x5dd83a(0x372)][_0x5dd83a(0x1de)];return _0x53e93f[_0x5dd83a(0x46e)](TextManager['mp']);},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x197)]=function(){const _0x42c212=_0x59ef57,_0xaf5ca7=_0x42c212(0x370);if(this[_0x42c212(0x21c)][_0xaf5ca7])return this[_0x42c212(0x21c)][_0xaf5ca7];let _0x4ac24a='';if(this[_0x42c212(0x4f0)][_0x42c212(0xe0)]<0x0)_0x4ac24a+=_0x42c212(0x391)[_0x42c212(0x46e)](Math[_0x42c212(0x4bd)](this[_0x42c212(0x4f0)][_0x42c212(0xe0)]*0x64));if(this[_0x42c212(0x4f0)][_0x42c212(0xe0)]<0x0&&this['_itemData'][_0x42c212(0xee)]<0x0)_0x4ac24a+='\x20';if(this['_itemData'][_0x42c212(0xee)]<0x0)_0x4ac24a+='%1'[_0x42c212(0x46e)](this[_0x42c212(0x4f0)][_0x42c212(0xee)]);return _0x4ac24a;},Window_ShopStatus['prototype'][_0x59ef57(0x373)]=function(_0x297a0d,_0x226296,_0x4665ef){const _0x39482b=_0x59ef57,_0x519d7b='TP\x20DAMAGE';if(this[_0x39482b(0x4f0)][_0x39482b(0xe5)]>=0x0&&!this[_0x39482b(0x21c)][_0x519d7b])return![];const _0x235e58=this[_0x39482b(0x38c)]();this[_0x39482b(0x125)](_0x235e58,_0x297a0d,_0x226296,_0x4665ef,!![]);const _0x4dd6fb=this[_0x39482b(0x465)]();return this[_0x39482b(0x1bd)](ColorManager[_0x39482b(0x171)]()),this['drawItemKeyData'](_0x4dd6fb,_0x297a0d,_0x226296,_0x4665ef,![],_0x39482b(0x34c)),this[_0x39482b(0x3e0)](_0x297a0d,_0x226296,_0x4665ef),this[_0x39482b(0x389)](),!![];},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x38c)]=function(){const _0x42ca84=_0x59ef57,_0x5a48fa=VisuMZ[_0x42ca84(0x3a2)][_0x42ca84(0x16f)][_0x42ca84(0x372)][_0x42ca84(0x27b)];return _0x5a48fa[_0x42ca84(0x46e)](TextManager['tp']);},Window_ShopStatus['prototype'][_0x59ef57(0x465)]=function(){const _0x5ed8e7=_0x59ef57,_0x38a4df=_0x5ed8e7(0x141);if(this[_0x5ed8e7(0x21c)][_0x38a4df])return this[_0x5ed8e7(0x21c)][_0x38a4df];let _0x2abccb='';return _0x2abccb+='%1'[_0x5ed8e7(0x46e)](this[_0x5ed8e7(0x4f0)][_0x5ed8e7(0xe5)]),_0x2abccb;},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x312)]=function(_0x264d20,_0x4fa021,_0x6ca4fd){const _0x4f23c1=_0x59ef57,_0x5dad40=_0x4f23c1(0x4f5);if(!this[_0x4f23c1(0x4f0)][_0x4f23c1(0x384)]&&!this[_0x4f23c1(0x21c)][_0x5dad40])return![];const _0x4e4468=this[_0x4f23c1(0x377)]();if(_0x4e4468['length']<=0x0)return![];const _0x3f3e19=this[_0x4f23c1(0x446)]();return this['drawItemKeyData'](_0x3f3e19,_0x264d20,_0x4fa021,_0x6ca4fd,!![]),this['drawItemKeyData'](_0x4e4468,_0x264d20,_0x4fa021,_0x6ca4fd,![],_0x4f23c1(0x34c)),this[_0x4f23c1(0x3e0)](_0x264d20,_0x4fa021,_0x6ca4fd),this[_0x4f23c1(0x389)](),!![];},Window_ShopStatus[_0x59ef57(0x263)]['getItemEffectsAddedStatesBuffsLabel']=function(){const _0x309e6d=_0x59ef57;return VisuMZ[_0x309e6d(0x3a2)][_0x309e6d(0x16f)][_0x309e6d(0x372)]['LabelApply'];},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x377)]=function(){const _0x170452=_0x59ef57,_0x4e6221=_0x170452(0x4f5);if(this[_0x170452(0x21c)][_0x4e6221])return this[_0x170452(0x21c)][_0x4e6221];let _0x12d6c0='',_0x323ec1=0x0;const _0x2c4875=0x8;for(const _0x33033a of this[_0x170452(0x4f0)]['addState']){const _0x5856fe=$dataStates[_0x33033a];if(_0x5856fe&&_0x5856fe['iconIndex']>0x0){_0x12d6c0+=_0x170452(0x3b6)[_0x170452(0x46e)](_0x5856fe['iconIndex']),_0x323ec1++;if(_0x323ec1>=_0x2c4875)return _0x12d6c0;}}for(let _0x6cd93c=0x0;_0x6cd93c<this[_0x170452(0x4f0)][_0x170452(0x461)][_0x170452(0x104)];_0x6cd93c++){const _0x2790ea=this['_itemData']['changeBuff'][_0x6cd93c],_0x21e942=Game_BattlerBase[_0x170452(0x263)]['buffIconIndex'](_0x2790ea,_0x6cd93c);if(_0x21e942>0x0){_0x12d6c0+=_0x170452(0x3b6)['format'](_0x21e942),_0x323ec1++;if(_0x323ec1>=_0x2c4875)return _0x12d6c0;}}return _0x12d6c0;},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x2fa)]=function(_0x3f0a8c,_0x21073c,_0x4e6c15){const _0x47c94f=_0x59ef57,_0x361e84='REMOVED\x20EFFECTS';if(!this[_0x47c94f(0x4f0)][_0x47c94f(0x139)]&&!this[_0x47c94f(0x21c)][_0x361e84])return![];const _0x39bd0e=this['getItemEffectsRemovedStatesBuffsLabel']();this[_0x47c94f(0x125)](_0x39bd0e,_0x3f0a8c,_0x21073c,_0x4e6c15,!![]);const _0x24c149=this[_0x47c94f(0x4be)]();return this[_0x47c94f(0x125)](_0x24c149,_0x3f0a8c,_0x21073c,_0x4e6c15,![],_0x47c94f(0x34c)),this[_0x47c94f(0x3e0)](_0x3f0a8c,_0x21073c,_0x4e6c15),this[_0x47c94f(0x389)](),!![];},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x2d5)]=function(){const _0xee8aca=_0x59ef57;return VisuMZ[_0xee8aca(0x3a2)]['Settings'][_0xee8aca(0x372)][_0xee8aca(0x193)];},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x4be)]=function(){const _0x509461=_0x59ef57,_0x348d48='REMOVED\x20EFFECTS';if(this['_customItemInfo'][_0x348d48])return this['_customItemInfo'][_0x348d48];let _0x90cc16='',_0x48d955=0x0;const _0x244350=VisuMZ[_0x509461(0x3a2)]['Settings'][_0x509461(0x372)][_0x509461(0x266)];for(const _0x2b1f06 of this[_0x509461(0x4f0)][_0x509461(0x2da)]){const _0x9abd0=$dataStates[_0x2b1f06];if(_0x9abd0&&_0x9abd0[_0x509461(0x33c)]>0x0){_0x90cc16+=_0x509461(0x3b6)[_0x509461(0x46e)](_0x9abd0['iconIndex']),_0x48d955++;if(_0x48d955>=_0x244350)return _0x90cc16;}}for(let _0x569e3b=0x0;_0x569e3b<this[_0x509461(0x4f0)][_0x509461(0x483)][_0x509461(0x104)];_0x569e3b++){const _0x5ec40f=this[_0x509461(0x4f0)][_0x509461(0x483)][_0x569e3b],_0x33134e=Game_BattlerBase['prototype'][_0x509461(0x16b)](0x1,_0x5ec40f);if(_0x33134e>0x0){_0x90cc16+='\x5cI[%1]'[_0x509461(0x46e)](_0x33134e),_0x48d955++;if(_0x48d955>=_0x244350)return _0x90cc16;}}for(let _0x4ae383=0x0;_0x4ae383<this[_0x509461(0x4f0)][_0x509461(0x241)][_0x509461(0x104)];_0x4ae383++){const _0xd52671=this[_0x509461(0x4f0)][_0x509461(0x241)][_0x4ae383],_0x514b91=Game_BattlerBase[_0x509461(0x263)][_0x509461(0x16b)](-0x1,_0xd52671);if(_0x514b91>0x0){_0x90cc16+=_0x509461(0x3b6)[_0x509461(0x46e)](_0x514b91),_0x48d955++;if(_0x48d955>=_0x244350)return _0x90cc16;}}return _0x90cc16;},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x30f)]=function(_0x2409e0,_0x4e2a3c,_0x54f641){const _0xbe9fa7=_0x59ef57;if(this['_item'][_0xbe9fa7(0x278)][_0xbe9fa7(0xf0)](/<CUSTOM STATUS INFO>\s*([\s\S]*)\s*<\/CUSTOM STATUS INFO>/i)){const _0x5441fe=String(RegExp['$1'])[_0xbe9fa7(0x15b)](/[\r\n]+/);for(const _0x35221c of _0x5441fe){if(_0x35221c['match'](/(.*):[ ](.*)/i)){const _0x295415=String(RegExp['$1'])[_0xbe9fa7(0x298)](),_0x1122c6=String(RegExp['$2'])[_0xbe9fa7(0x298)]();this[_0xbe9fa7(0x3c9)](_0x295415,_0x1122c6,_0x2409e0,_0x4e2a3c,_0x54f641),_0x4e2a3c+=this[_0xbe9fa7(0x482)]();}}}return this[_0xbe9fa7(0x389)](),_0x4e2a3c;},Window_ShopStatus['prototype'][_0x59ef57(0x3c9)]=function(_0x2aacf0,_0x110fba,_0x3bba6a,_0x2cc36a,_0x218c53){const _0x1a4981=_0x59ef57;this['drawItemKeyData'](_0x2aacf0,_0x3bba6a,_0x2cc36a,_0x218c53,!![]),this[_0x1a4981(0x125)](_0x110fba,_0x3bba6a,_0x2cc36a,_0x218c53,![],_0x1a4981(0x34c)),this[_0x1a4981(0x3e0)](_0x3bba6a,_0x2cc36a,_0x218c53),this[_0x1a4981(0x389)]();},Window_ShopStatus[_0x59ef57(0x263)]['drawCustomShopGraphic']=function(){const _0x3776b5=_0x59ef57;if(!this[_0x3776b5(0x436)])return;const _0x146b88=this['_item'][_0x3776b5(0x278)],_0x537b30=/<SHOP (?:PICTURE|IMAGE|PICTURE NAME|PICTURE FILENAME|IMAGE NAME|IMAGE FILENAME):[ ](.*)>/gi,_0x34188d=_0x146b88[_0x3776b5(0xf0)](_0x537b30);if(_0x34188d)for(const _0x22aefd of _0x34188d){_0x22aefd[_0x3776b5(0xf0)](_0x537b30);const _0x229df8=String(RegExp['$1'])[_0x3776b5(0x298)]()||'';if(_0x229df8==='')continue;const _0x1bcd5d=ImageManager[_0x3776b5(0x2e9)](_0x229df8);_0x1bcd5d[_0x3776b5(0x3ea)](this[_0x3776b5(0x381)][_0x3776b5(0x4eb)](this,_0x1bcd5d,this[_0x3776b5(0x436)]));}},Window_ShopStatus[_0x59ef57(0x263)][_0x59ef57(0x381)]=function(_0x1c1481,_0x14121b){const _0x35b191=_0x59ef57;if(this[_0x35b191(0x436)]!==_0x14121b)return;if(!_0x1c1481)return;if(_0x1c1481[_0x35b191(0x1e6)]<=0x0||_0x1c1481[_0x35b191(0x388)]<=0x0)return;const _0x449672=_0x14121b[_0x35b191(0x278)];let _0x469400=_0x35b191(0xea);_0x449672[_0x35b191(0xf0)](/<SHOP (?:PICTURE|IMAGE) LAYER:[ ]FOREGROUND>/i)&&(_0x469400=_0x35b191(0x149));const _0x57b65c=_0x469400===_0x35b191(0xea)?this[_0x35b191(0x12e)]:this[_0x35b191(0x10e)];let _0x2698f4=this[_0x35b191(0xd2)],_0x3fa465=this[_0x35b191(0x2ff)];_0x449672['match'](/<SHOP (?:PICTURE|IMAGE) MAX WIDTH:[ ](\d+)>/i)&&(_0x2698f4=Number(RegExp['$1']));_0x449672['match'](/<SHOP (?:PICTURE|IMAGE) MAX HEIGHT:[ ](\d+)>/i)&&(_0x3fa465=Number(RegExp['$1']));_0x449672[_0x35b191(0xf0)](/<SHOP (?:PICTURE|IMAGE) MAX DIMENSIONS:[ ](\d+),[ ]*(\d+)>/i)&&(_0x2698f4=Number(RegExp['$1']),_0x3fa465=Number(RegExp['$2']));const _0x2d0198=Math[_0x35b191(0x497)](0x1,_0x2698f4/_0x1c1481['width'],_0x3fa465/_0x1c1481[_0x35b191(0x388)]);let _0x15f0a1=0x0,_0x383067=0x0,_0x3199db=Math[_0x35b191(0x4bd)](_0x1c1481['width']*_0x2d0198),_0x1c1640=Math[_0x35b191(0x4bd)](_0x1c1481[_0x35b191(0x388)]*_0x2d0198),_0x19a2a2=_0x35b191(0x206);_0x449672[_0x35b191(0xf0)](/<SHOP (?:PICTURE|IMAGE) (?:ALIGN|ALIGNMENT):[ ](LEFT|CENTER|RIGHT)>/i)&&(_0x19a2a2=String(RegExp['$1'])[_0x35b191(0x367)]()[_0x35b191(0x298)]());if(_0x19a2a2==='left')_0x15f0a1=0x0;else _0x19a2a2===_0x35b191(0x206)?_0x15f0a1=Math[_0x35b191(0x2ce)]((this['innerWidth']-_0x3199db)/0x2):_0x15f0a1=this[_0x35b191(0xd2)]-_0x3199db;let _0x4d75fb=_0x35b191(0x30c);_0x449672[_0x35b191(0xf0)](/<SHOP (?:PICTURE|IMAGE) POSITION:[ ](TOP|MIDDLE|BOTTOM)>/i)&&(_0x4d75fb=String(RegExp['$1'])[_0x35b191(0x367)]()['trim']());if(_0x4d75fb===_0x35b191(0x1ff))_0x383067=0x0;else _0x4d75fb===_0x35b191(0x30c)?_0x383067=Math['round']((this[_0x35b191(0x2ff)]-_0x1c1640)/0x2):_0x383067=this['innerHeight']-_0x1c1640;_0x449672[_0x35b191(0xf0)](/<SHOP (?:PICTURE|IMAGE) OFFSET X:[ ]([\+\-]\d+)>/i)&&(_0x15f0a1+=Number(RegExp['$1']));_0x449672[_0x35b191(0xf0)](/<SHOP (?:PICTURE|IMAGE) OFFSET Y:[ ]([\+\-]\d+)>/i)&&(_0x383067+=Number(RegExp['$1']));_0x449672[_0x35b191(0xf0)](/<SHOP (?:PICTURE|IMAGE) OFFSET:[ ]([\+\-]\d+),[ ]*([\+\-]\d+)>/i)&&(_0x15f0a1+=Number(RegExp['$1']),_0x383067+=Number(RegExp['$2']));let _0xd752e6=0xff;if(_0x449672['match'](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)>/i))_0xd752e6=Number(RegExp['$1']);else _0x449672['match'](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)([%％])>/i)&&(_0xd752e6=Math[_0x35b191(0x2ce)](Number(RegExp['$1'])*0.01*0xff)[_0x35b191(0xa7)](0x0,0xff));_0x57b65c['paintOpacity']=_0xd752e6,_0x57b65c['blt'](_0x1c1481,0x0,0x0,_0x1c1481[_0x35b191(0x1e6)],_0x1c1481[_0x35b191(0x388)],_0x15f0a1,_0x383067,_0x3199db,_0x1c1640),_0x57b65c[_0x35b191(0x425)]=0xff;},VisuMZ[_0x59ef57(0x3a2)][_0x59ef57(0x287)]=function(_0x225fdc){const _0x5a40e9=_0x59ef57;if(_0x225fdc===null||typeof _0x225fdc!==_0x5a40e9(0xd9))return _0x225fdc;const _0x52ba67=Array['isArray'](_0x225fdc)?[]:Object[_0x5a40e9(0x132)](Object[_0x5a40e9(0x234)](_0x225fdc));for(const _0x2b01df in _0x225fdc){Object['prototype'][_0x5a40e9(0x2b5)][_0x5a40e9(0x36e)](_0x225fdc,_0x2b01df)&&(_0x52ba67[_0x2b01df]=typeof _0x225fdc[_0x2b01df]==='object'&&_0x225fdc[_0x2b01df]!==null?VisuMZ['ItemsEquipsCore']['deepCopy'](_0x225fdc[_0x2b01df]):_0x225fdc[_0x2b01df]);}return _0x52ba67;};function _0x4ea6(){const _0x5e78ae=['value1','isSellCommandEnabled','alterSkillName','Step1End','meetsShopListingConditions','CheckCursedItemMsg','SwitchSell','VisuMZ_2_WeaponSwapSystem','Scene_Shop_helpWindowRect','Scene_Shop_sellWindowRect','drawItemDamageAmount','ITEMS_EQUIPS_CORE','getItemsEquipsCoreBackColor1','drawItemCustomEntryLine','createStatusWindow','addCommand','addShopTrackingItem','ExtDisplayedParams','isBuyCommandEnabled','isClearEquipOk','_etypeIDs','refresh','changePaintOpacity','Game_Actor_artifact','_buyWindowLastIndex','Scene_Item_itemWindowRect','ATK','postCreateCategoryWindowItemsEquipsCore','isArmor','Game_Actor_changeClass','_classIDs','drawItemEffectsTpRecovery','MRG','onSellItem','A%1','currencyUnit','drawItemDarkRect','nonRemovableEtypes','meetsEquipRequirement','getItemSuccessRateText','armorTypes','show','commandStyleCheck','onBuyCancel','optimize','Damage\x20Formula\x20Error\x20for\x20%1','addLoadListener','move','DoubleArmorParameters','switchProxyItem','scope','RemoveEquipText','return\x200','processHandling','Scene_Shop','drawItemEquipType','TextAlign','buttonAssistItemListRequirement','paramchangeTextColor','forceChangeEquip','pop','#%1','_getClassRequirements','Game_Party_numItems','NonRemoveETypes','mmp','EFFECT_REMOVE_BUFF','SellTurnSwitchOff','getProxyItem','ScopeEnemyOrAlly','Window_ItemList_maxCols','getWeaponIdWithName','MaxHP','consumable','isCustomParameter','Whitelist','weaponTypes','initNewItemsList','Scene_Equip_onActorChange','canEquipArmor','buttonAssistText1','NotConsumable','initialize','occasion','updateHelp','playCursorSound','Scene_Shop_onSellOk','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','itemWindowRectItemsEquipsCore','concat','DrawEquipDoubleData','Scene_Shop_doBuy','powerUpColor','isEquipAtypeOk','addEquipCommand','BorderRegExp','optimizeCmdDesc','mainCommandWidth','value','_slotId','Scene_Shop_numberWindowRect','modifiedBuyPriceItemsEquipsCore','meetsItemConditionsJS','getItemEffectsHpRecoveryLabel','QUANTITY','paintOpacity','isSceneShop','shift','MDF','LabelRecoverHP','Parse_Notetags_Category','CONSUMABLE','SCOPE','Game_BattlerBase_meetsItemConditions','uiHelpPosition','Scene_Equip_onSlotOk','Pick\x20and\x20choose\x20equipment\x20to\x20change.','toggleType','isClicked','process_VisuMZ_ItemsEquipsCore_RegExp','uiMenuStyle','damageColor','_item','isPurifyItemSwapOk','setupBattleTestItems','_checkEquipRequirements','FadeSpeed','damage','updatedLayoutStyle','currentExt','_bypassReleaseUnequippableItemsItemsEquipsCore','sellWindowRectItemsEquipsCore','prepareNewEquipSlotsOnLoad','makeCommandList','_itemWindow','_commandNameWindow','process_VisuMZ_ItemsEquipsCore_EquipSlots','getItemEffectsHpDamageLabel','getItemEffectsAddedStatesBuffsLabel','_categoryWindow','isSoleWeaponType','SetupProxyItemGroup','Parse_Notetags_Sorting','getEquipRequirements','Window_ItemList_colSpacing','setHelpWindowItem','categoryStyle','Scope1','allMembers','Game_BattlerBase_canEquip_artifact','getArmorIdWithName','callUpdateHelp','Categories','KeyItemProtect','statusWindowRectItemsEquipsCore','getItemHitTypeText','commandEquip','some','ActorResetEquipSlots','onTouchSelect','addShopTrackingGoldBuy','standardIconHeight','price','wtypeId','MaxArmors','changeBuff','isLearnedSkill','drawItemOccasion','getClassRequirements','getItemEffectsTpDamageText','_purchaseOnly','BuyTurnSwitchOn','sellPriceOfItem','BuyTurnSwitchOff','_skillIDs','sell','isShiftRemoveShortcutEnabled','customEquipParams','format','11327928RBVfCy','level','description','drawItemDamageElement','drawItemEquipSubType','Scene_Shop_onBuyCancel','mainAreaTop','_newItemsList','cursorDown','_actor','determineBaseSellingPrice','getEmptyEquipSlotOfSameEtype','SellTurnSwitchOn','NeverUsable','IconSet','getItemDamageAmountTextBattleCore','Step1Start','_money','actor','lineHeight','removeBuff','getItemEffectsMpRecoveryLabel','isOpenAndActive','CRI','maxCols','drawItemData','buy','drawItemCost','anyEmptyEquipSlotsOfSameEtype','_buttonAssistWindow','Window_EquipSlot_isEnabled','isClearCommandAdded','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','CmdIconOptimize','(%1)','VisuMZ_0_CoreEngine','rateHP','Scene_Shop_activateSellWindow','Window_EquipItem_includes','FontSize','min','isPlaytest','EnableLayout','playCancel','buttonAssistText3','hitIndex','Scene_Shop_createCategoryWindow','cancel','purifyCursedEquips','SpeedNeg2000','EFFECT_GAIN_TP','_slotWindow','createCommandNameWindow','fill','makeItemData','ParamValueFontSize','PurifyParty','Text','DEF','ItemQuantityFontSize','Scene_Equip_helpWindowRect','drawEquipDataCompare','isBattleTest','===','SortBy','EquipScene','sortPriority','_getEquipRequirements','drawItemConsumable','HP\x20DAMAGE','_allowArtifactParamBase','items','buttonAssistSmallIncrement','clear','helpWindowRect','_newLabelSprites','LayoutStyle','MDR','floor','getItemEffectsRemovedStatesBuffsText','PurifyActors','isCommandEnabled','categoryList','drawItemEffectsMpRecovery','iconText','ShopMenuStatusStandard','clearNewItem','boxWidth','armors','isDrawItemNumber','code','_category','allowCreateStatusWindow','makeItemList','Scene_Equip_createCommandWindow','setShopStatusWindowMode','onSlotOk','addShopTrackingItemSell','getItemIdWithName','isBottomHelpMode','onCategoryCancel','drawItemEffectsHpDamage','getItemDamageElementLabel','Scene_Equip_commandWindowRect','852372xxUaEX','defaultItemMax','_buyWindow','inBattle','DoubleWeaponParameters','Scene_Shop_sellingPrice','getItemEffectsSelfTpGainText','_goods','Translucent','versionId','NAME','Game_Party_setupBattleTestItems_artifact','loseItem','armor-%1','helpDesc','canEquipWithOptimize','itemAt','commandStyle','selfTP','fontSizeRatio','bind','New','FieldUsable','equipItems','VisuMZ_1_SkillsStatesCore','_itemData','buttonAssistCategory','toUpperCase','ParseWeaponNotetags','getItemRepeatsText','ADDED\x20EFFECTS','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','mpRate','addState','Enable','getItemDamageAmountLabel','HideAllSwitches','mhp','playOkSound','clamp','ARRAYSTR','SellPriceJS','slotWindowRect','drawCustomShopGraphic','_doubleTouch','Scene_Shop_commandWindowRect','DrawEquipClassicData','getItemSpeedLabel','BattleUsable','Scene_Shop_createSellWindow','_helpWindow','money','exit','Scene_Equip_onSlotCancel','ItemScene','parameters','calcEquipItemPerformance','createNewLabelSprite','loadFaceImages','classic','getItemOccasionText','keyItem','drawItemStyleIcon','isTroopArtifact','setMp','setValue','Scene_Equip_slotWindowRect','params','EVA','isNewItem','getItemDamageAmountText','left','canShiftRemoveEquipment','ItemMenuStatusBgType','max','getParamValueClassicCore','Game_Actor_changeEquip','isCursorMovable','iconHeight','paramId','refreshActorEquipSlotsIfUpdated','itemTextAlign','innerWidth','drawItemQuantity','EXR','MaxItems','blt','replace','_scene','object','setItemWindow','deselect','CEV','_goodsCount','EquipParams','equipCmdDesc','rateMP','HiddenItemB','getItemEffectsHpDamageText','getItemEffectsTpRecoveryText','categoryStyleCheck','gainTP','isCursedItem','_statusWindow','bitmap','hideNewLabelSprites','background','HP\x20RECOVERY','consumeItem','Window_ItemList_updateHelp','flatMP','getItemEffects','match','onSlotOkAutoSelect','fontSize','Scene_Shop_prepare','buyWindowRect','Window_Selectable_setHelpWindowItem','onTouchSelectModern','Game_Actor_tradeItemWithParty','Scene_Shop_doSell','itemEnableJS','refreshCursor','pageup','activateSellWindow','updateChangedSlots','resetTextColor','(+%1)','_commandWindow','buttonAssistKey1','setHandler','getEquipDataStyle','length','Game_Actor_isEquipChangeOk','drawNewLabelText','drawUpdatedBeforeParamValue','def','_sellWindow','setStatusWindow','addShopTrackingGoldSell','Scene_Item_helpWindowRect','postCreateItemsEquipsCore','contents','getInputMultiButtonStrings','AllWeapons','_data','_equips','isGoodShown','_dummyWindow','remove','smallParamFontSize','Window_ItemList_drawItem','Scene_Item_createItemWindow','getShopTrackingItemSell','MenuPortraits','MCR','actorParams','MRF','onCategoryOk','effects','_itemIDs','categoryWindowRectItemsEquipsCore','LabelRecoverMP','addClearCommand','calcWindowHeight','drawItemKeyData','List','standardIconWidth','buttonAssistOffset3','drawEquipDataDouble','drawPossession','Consumable','Step3Start','textLocale','contentsBack','Scene_Battle','drawItemNumber','getItemRepeatsLabel','create','isHovered','tradeItemWithParty','DrawPortraitJS','type','log','isUseItemsEquipsCoreUpdatedLayout','removeStateBuffChanges','QoL','SPEED','colSpacing','isShowNew','auto','isEnabled','isMainMenuCoreMenuImageOptionAvailable','TP\x20DAMAGE','dataId','nextActor','DamageType%1','JSON','elementId','categoryNameWindowDrawBackground','activateItemWindow','foreground','TP\x20RECOVERY','ARMOR','Window_ItemCategory_initialize','ceil','processShopCondListingOnBuyItem','initNewLabelSprites','paramValueByName','getShopTrackingGoldBuy','1509397UbvUcb','EQUIP_DELAY_MS','normalColor','isOptimizeCommandEnabled','isEquipCommandAdded','updateMoneyAmount','active','ParseAllNotetags','tpGain','split','makeDeepCopy','isStackableArtifact','prepare','ActorChangeEquipSlots','onActorChange','status','paramBase','_newLabelOpacity','opacity','processCursorMove','initShopTrackingData','_shopTrackingData','drawItemEffects','getMatchingInitEquip','LabelSuccessRate','buffIconIndex','start','CustomParamNames','isProxyItem','Settings','Parse_Notetags_Batch','powerDownColor','statusWindowRect','_shopStatusMenuAlly','Parse_Notetags_Prices','EquipAdjustHpMp','MP\x20RECOVERY','drawIcon','itemDataFontSize','indexOf','_armorIDs','4392870TKVOlt','onTouchSelectModernControls','compare','AllArmors','AlwaysUsable','proxyItem','allowCommandWindowCursorUp','isDualWield','constructor','traits','getSkillIdWithName','mdf','geUpdatedLayoutStatusWidth','isCancelled','isWeapon','updateNewLabelOpacity','_allowArtifactTraitObjects','drawItemEffectsHpRecovery','ClassicArmorParameters','ShopScene','isEquipItem','smoothSelect','canEquip','paramPlus','LabelRemove','slotWindowRectItemsEquipsCore','select','DrawEquipData','getItemEffectsMpDamageText','Window_ItemCategory_setItemWindow','BatchShop','equips','ARRAYSTRUCT','windowPadding','currentSymbol','Scene_Item_create','postCreateItemWindowModernControls','setNewItem','setupItemDamageTempActors','iconWidth','speed','NoEquipTypeResult','ItemMenuStatusRect','n/a','index','meetsItemConditions','maxVisibleItems','equipSlotIndex','commandSell','_scrollDuration','TGR','isUseModernControls','×%1','EFFECT_ADD_DEBUFF','<%1:[\x20]([\x5c+\x5c-]\x5cd+)>','Scene_Shop_onCategoryCancel','isEquipCommandEnabled','weapon-%1','_tempActorB','ParseItemNotetags','Scene_Shop_categoryWindowRect','battleMembers','NoChangeMarker','FontFace','item','maxmp','changeTextColor','createCategoryNameWindow','createSlotWindow','MAXMP','cursorPagedown','equipAdjustHpMp','drawItemRepeats','Step2End','getShopTrackingItem','ARRAYNUM','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MaxHP\x20=\x200;\x20let\x20MaxMP\x20=\x200;\x20let\x20ATK\x20=\x200;\x20let\x20DEF\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MAT\x20=\x200;\x20let\x20MDF\x20=\x200;\x20let\x20AGI\x20=\x200;\x20let\x20LUK\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20[MaxHP,\x20MaxMP,\x20ATK,\x20DEF,\x20MAT,\x20MDF,\x20AGI,\x20LUK][paramId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','Window_ShopBuy_item','getItemSpeedText','addChild','itemHasEquipLimit','KeyItems','LabelHitType','find','version','weapons','Window_EquipCommand_initialize','values','buyWindowRectItemsEquipsCore','onBuyCancelItemsEquipsCore','systemColor','_list','Scene_Shop_commandSell','equip','buttonAssistSlotWindowShift','getItemEffectsTpRecoveryLabel','drawParamText','Scene_Shop_buyWindowRect','hasItem','LabelDamageMP','isPartyArtifact','Game_Item_setObject','maxItems','itemLineRect','buttonAssistText2','_bypassNewLabel','addCancelCommand','width','1473060Tjtgob','isOptimizeEquipOk','artifacts','isVisuMzLocalizationEnabled','splice','isOpen','itypeId','paramPlusItemsEquipsCoreCustomJS','0000','LabelDamageHP','CommandAddClear','2042957xbVpuZ','drawActorCharacter','RegExp','discardEquip','ScopeRandomAny','SetupProxyItemGroups','addOptimizeCommand','getItemEffectsMpRecoveryText','Nonconsumable','createItemWindow','Game_Party_gainItem_artifact','every','getItemScopeText','top','FUNC','StatusWindowWidth','Scene_Item_createCategoryWindow','shouldCommandWindowExist','equipSlots','Window_ShopCommand_initialize','center','drawText','+%1','SpeedNeg999','Scene_Equip_statusWindowRect','CmdTextAlign','getItemDamageAmountLabelOriginal','initEquips','processTouchModernControls','VisuMZ_1_BattleCore','MEV','optimizeEquipments','addShopTrackingItemBuy','processShopCondListingOnSellItem','cursorRight','helpWindowRectItemsEquipsCore','isRepeated','LabelSpeed','isPressed','goldWindowRectItemsEquipsCore','parse','setObject','_customItemInfo','Scene_Shop_buyingPrice','drawParamName','Scene_Item','forceResetEquipSlots','Scene_Shop_statusWindowRect','getParamValueClassicNoCore','ElementNone','changeEquipById','VisuMZ_1_MainMenuCore','ARRAYEVAL','Scene_Equip_itemWindowRect','setItem','ShiftShortcutKey','pagedown','atypeId','flatHP','ConvertParams','Window_EquipStatus_refresh','drawParamsItemsEquipsCore','\x5cb%1\x5cb','isSoleArmorType','getColor','drawItemStyleIconText','getPrototypeOf','Window_Selectable_initialize','Window_ShopBuy_price','PHA','param','AllItems','equip2','helpAreaHeight','cursorPageup','drawItem','RemoveEquipIcon','Window_ShopBuy_refresh','isEquipTypeSealed','removeDebuff','categoryWindowRect','HideAnySwitches','numberWindowRect','NUM','item-%1','setHelpWindow','paramValueFontSize','resetShopSwitches','Scene_ItemBase_activateItemWindow','processCursorSpecialCheckModernControls','meetsClassRequirements','gaugeBackColor','test','processShiftRemoveShortcut','CmdStyle','isHandled','buttonAssistKey2','updateCategoryNameWindow','Scope%1','CmdIconEquip','drawing','paramJS','commandWindowRect','SUCCESS\x20RATE','TRG','revertGlobalNamespaceVariables','Window_ItemList_makeItemList','setTopRow','changeEquipBase','Scene_Equip_commandEquip','isUseParamNamesWithIcons','onSellOk','Slots','prototype','addBuyCommand','Step3End','MaxIcons','Param','ShowAnySwitches','Parse_Notetags_EnableJS','getTextColor','name','textWidth','addItemCategory','Game_BattlerBase_paramPlus_artifact','double','HIT','update','commandWindowRectItemsEquipsCore','MAT','buttonAssistLargeIncrement','FadeLimit','Actors','mainFontFace','note','icon','number','LabelDamageTP','SpeedNeg1999','createTempActorEquips','armor','%1-%2','Game_Enemy_traitObjects_artifact','getItemEffectsSelfTpGainLabel','getItemColor','allowShiftScrolling','OffsetY','prepareRefreshItemsEquipsCoreLayout','TCR','deepCopy','AlreadyEquipMarker','getItemDamageAmountTextOriginal','traitObjects','BuyPriceJS','categoryNameWindowDrawText','STR','processCursorMoveModernControls','commandNameWindowCenter','localeCompare','includes','processDownCursorSpecialCheckModernControls','categories','CoreEngine','?????','EFFECT_ADD_BUFF','hideDisabledCommands','trim','Scene_Equip_create','DrawParamJS','updateSmoothScroll','Scene_Shop_commandBuy','IncludeShopItem','getItemConsumableText','drawItemSuccessRate','releaseUnequippableItems','fontFace','MultiplierStandard','artifactIDs','RegularItems','buttonAssistKey3','setTempActor','drawUpdatedParamName','HIT\x20TYPE','push','changeClass','getNextAvailableEtypeId','helpDescriptionText','Scene_Boot_onDatabaseLoaded','onMenuImageLoad','sort','SwitchBuy','getMenuImage','Game_Party_initialize','prepareItemCustomData','_newLabelOpacityChange','hasOwnProperty','placeNewLabel','onBuyItem','Game_Actor_forceChangeEquip','Scene_Shop_onBuyOk','sellPriceRate','refreshDelay','onTouchOk','postCreateSlotWindowItemsEquipsCore','currentClass','textColor','Window_ShopStatus_setItem','doBuy','_forcedSlots','getEtypeIDs','Occasion%1','limitedPageUpDownSceneCheck','REPEAT','categoryItemTypes','drawTextEx','_resetFontSize','addWindow','isTriggered','smoothScrollTo','hideAdditionalSprites','round','DrawBackRect','drawUpdatedAfterParamValue','onDatabaseLoaded','drawEquipDataClassic','Scene_Shop_goldWindowRect','LabelElement','getItemEffectsRemovedStatesBuffsLabel','drawActorParamClassic','drawItemEffectsMpDamage','9hWfMAZ','EVAL','removeState','onTouchCancel','checkShiftRemoveShortcut','getItemHitTypeLabel','getShopTrackingGoldSell','filter','gold','Game_BattlerBase_param','CmdIconSell','DrawIcons','_paramPlus','addInnerChild','Scene_Load_reloadMapIfUpdated','buyingPrice','USER\x20TP\x20GAIN','loadPicture','Window_ShopSell_isEnabled','ELEMENT','createCommandWindow','map','sellingPrice','possession','drawItemName','CommandAddOptimize','baseSellingPrice','isKeyItem','MANUAL','OffsetX','commandName','ParamChangeFontSize','adjustHiddenShownGoods','ScopeRandomAllies','drawItemEffectsRemovedStatesBuffs','hide','Armor\x20Type','onSlotCancel','ScopeRandomEnemies','innerHeight','activate','WEAPON','FDR','ParseClassNotetags','equipHasCustomParams','ARRAYFUNC','weapon','W%1','troopArtifacts','English','atk','_cache_etypeIDs','middle','Window_ItemList_item','registerCommand','drawItemCustomEntries','down','Game_Actor_paramPlus','drawItemEffectsAddedStatesBuffs','MAXHP','mainAreaHeight','Game_Actor_discardEquip','nonOptimizeEtypes','doSell','drawActorParamDifference','getItemsEquipsCoreBackColor2','PDR','scrollTo','drawItemActorMenuImage','GRD','setItemDelay','numberWindowRectItemsEquipsCore','\x5cI[%1]%2','Speed1000','REC','_bypassProxy','itemPadding','Icon','Scene_Shop_create','isItem','SortByIDandPriority','Parse_Notetags_ParamValues','Game_Party_consumeItem','WeaponType','Speed2000','text','cursorLeft','5PjVcgJ','clearCmdDesc','updateCommandNameWindow','onSellOkItemsEquipsCore','isEquipWtypeOk','commandSellItemsEquipsCore','onCategoryCancelItemsEquipsCore','drawItemSpeed','canConsumeItem','Scene_Equip','fillRect','getEtypeIdWithName','3911348cfuNGX','iconIndex','uiInputPosition','commandNameWindowDrawBackground','newLabelEnabled','EFFECT_REMOVE_STATE','LUK','_handlers','addItemCategories','UNDEFINED!','Step2Start','isRightInputMode','_newLabelOpacityUpperLimit','loadSystem','textSizeEx','Window_EquipItem_isEnabled','Parse_Notetags_ParamJS','right','HiddenItemA','partyArtifactIDs','_tempActor','ItemSceneAdjustItemList','CmdIconClear','etypeId','commandBuy','STRUCT','onBuyOk','partyArtifacts','clearNewLabelFromItem','Game_BattlerBase_param_artifact','drawItemHitType','LabelRecoverTP','ItemQuantityFmt','Scene_Shop_onSellCancel','drawRemoveItem','user','prepareNextScene','_shopStatusMenuMode','gainItem','itemWindowRect','process_VisuMZ_ItemsEquipsCore_Notetags','ElementWeapon','AGI','createSellWindow','toLowerCase','Width','_categoryNameWindow','numItems','commandNameWindowDrawText','meetsEquipRequirements','Game_Actor_equips_artifacts','call','getItemConsumableLabel','MP\x20DAMAGE','isHoverEnabled','StatusWindow','drawItemEffectsTpDamage','CannotEquipMarker','ShopListingRegExp','equipTypes','getItemEffectsAddedStatesBuffsText','HRG','getItemEffectsHpRecoveryText','getShopTrackingData','deactivate','statusWidth','postCreateSellWindowItemsEquipsCore','mainAreaBottom','checkItemConditionsSwitchNotetags','getItemQuantityText','drawCustomShopGraphicLoad','previousActor','getDamageStyle','addStateBuffChanges','cursorUp','setHp','isEquipChangeOk','height','resetFontSettings','goodsToItem','Scene_Equip_createSlotWindow','getItemEffectsTpDamageLabel','_tempActorA','isArtifact','BackRectColor','drawEquipData','%1%','Game_Party_gainItem','setCategory','Scene_Item_categoryWindowRect','repeats','Scope7','formula','_numberWindow','processCursorHomeEndTrigger','ParseArmorNotetags','changeEquip','sellWindowRect','visible','categoryNameWindowCenter','convertInitEquipsToItems','Window_Selectable_update','getClassIdWithName','ItemsEquipsCore','getEtypeIDsCache','ClassicWeaponParameters','Speed1','_resetFontColor','adjustItemWidthByStatus','isClearCommandEnabled','Parse_Notetags_EquipSlots','value2','reloadMapIfUpdated','optKeyItemsNumber','CNT','popScene','createCategoryWindow','_weaponIDs','HitType%1','actorId','Window_Selectable_refresh','drawUpdatedParamValueDiff','_calculatingJSParameters','\x5cI[%1]','maxItemAmount','random','helpAreaTop','MaxMP','EFFECT_REMOVE_DEBUFF'];_0x4ea6=function(){return _0x5e78ae;};return _0x4ea6();}