//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.50;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.50] [SkillsStatesCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skills_and_States_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Skills & States Core plugin extends and builds upon the functionality of
 * RPG Maker MZ's inherent skill, state, and buff functionalities and allows
 * game devs to customize its various aspects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Assigning multiple Skill Types to Skills.
 * * Making custom Skill Cost Types (such as HP, Gold, and Items).
 * * Allowing Skill Costs to become percentile-based or dynamic either directly
 *   through the Skills themselves or through trait-like notetags.
 * * Replacing gauges for different classes to display different types of
 *   Skill Cost Type resources.
 * * Hiding/Showing and enabling/disabling skills based on switches, learned
 *   skills, and code.
 * * Setting rulings for states, including if they're cleared upon death, how
 *   reapplying the state affects their turn count, and more.
 * * Allowing states to be categorized and affected by categories, too.
 * * Displaying turn counts on states drawn in the window or on sprites.
 * * Manipulation of state, buff, and debuff turns through skill and item
 *   effect notetags.
 * * Create custom damage over time state calculations through notetags.
 * * Allow database objects to apply passive states to its user.
 * * Passive states can have conditions before they become active as well.
 * * Updated Skill Menu Scene layout to fit more modern appearances.
 * * Added bonus if Items & Equips Core is installed to utilize the Shop Status
 *   Window to display skill data inside the Skill Menu.
 * * Control over various aspects of the Skill Menu Scene.
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Action End Removal for States
 * 
 * - If your Plugin Parameter settings for "Action End Update" are enabled,
 * then "Action End" has been updated so that it actually applies per action
 * used instead of just being at the start of a battler's action set.
 * 
 * - However, there are side effects to this: if a state has the "Cannot Move"
 * restriction along with the "Action End" removal timing, then unsurprisingly,
 * the state will never wear off because it's now based on actual actions
 * ending. To offset this and remove confusion, "Action End" auto-removal
 * timings for states with "Cannot Move" restrictions will be turned into
 * "Turn End" auto-removal timings while the "Action End Update" is enabled.
 * 
 * - This automatic change won't make it behave like an "Action End" removal
 * timing would, but it's better than completely softlocking a battler.
 * 
 * EXAMPLE:
 * 
 * - The new state: "Fiery Blade" will allow the affected battler to deal fire
 * elemental damage. With Action End, this means for 5 actions, those attacks
 * will deal fire damage.
 * 
 * - This means that if no action is taken, due to a status effect like "Sleep"
 * or "Stun", then the duration count will not decrease.
 * 
 * - On the flip side, if the battler performs multiple actions a turn, then
 * the duration count drops faster because more actions have been spent.
 * 
 * - However, if this "Fiery Blade" state was using Turn End instead, it will
 * have its duration reduced by 1 each turn, regardless of "Sleep" or "Stun"
 * states, and regardless of how many actions are performed each turn.
 * 
 * ---
 *
 * Buff & Debuff Level Management
 *
 * - In RPG Maker MZ, buffs and debuffs when applied to one another will shift
 * the buff modifier level up or down. This plugin will add an extra change to
 * the mechanic by making it so that once the buff modifier level reaches a
 * neutral point, the buff or debuff is removed altogether and resets the buff
 * and debuff turn counter for better accuracy.
 *
 * ---
 *
 * Skill Costs
 *
 * - In RPG Maker MZ, skill costs used to be hard-coded. Now, all Skill Cost
 * Types are now moved to the Plugin Parameters, including MP and TP. This
 * means that from payment to checking for them, it's all done through the
 * options available.
 *
 * - By default in RPG Maker MZ, displayed skill costs would only display only
 * one type: TP if available, then MP. If a skill costs both TP and MP, then
 * only TP was displayed. This plugin changes that aspect by displaying all the
 * cost types available in order of the Plugin Parameter Skill Cost Types.
 *
 * - By default in RPG Maker MZ, displayed skill costs were only color-coded.
 * This plugin changes that aspect by displaying the Skill Cost Type's name
 * alongside the cost. This is to help color-blind players distinguish what
 * costs a skill has.
 *
 * ---
 *
 * Sprite Gauges
 *
 * - Sprite Gauges in RPG Maker MZ by default are hard-coded and only work for
 * HP, MP, TP, and Time (used for ATB). This plugin makes it possible for them
 * to be customized through the use of Plugin Parameters under the Skill Cost
 * Types and their related-JavaScript entries.
 *
 * ---
 * 
 * State Displays
 * 
 * - To put values onto states and display them separately from the state turns
 * you can use the following script calls.
 * 
 *   battler.getStateDisplay(stateId)
 *   - This returns whatever value is stored for the specified battler under
 *     that specific state value.
 *   - If there is no value to be returned it will return an empty string.
 * 
 *   battler.setStateDisplay(stateId, value)
 *   - This sets the display for the battler's specific state to whatever you
 *     declared as the value.
 *   - The value is best used as a number or a string.
 * 
 *   battler.clearStateDisplay(stateId)
 *   - This clears the display for the battler's specific state.
 *   - In short, this sets the stored display value to an empty string.
 * 
 * ---
 *
 * Window Functions Moved
 *
 * - Some functions found in RPG Maker MZ's default code for Window_StatusBase
 * and Window_SkillList are now moved to Window_Base to make the functions
 * available throughout all windows for usage.
 *
 * ---
 *
 * ============================================================================
 * Slip Damage Popup Clarification
 * ============================================================================
 * 
 * Slip Damage popups only show one popup for HP, MP, and TP each and it is the
 * grand total of all the states and effects combined regardless of the number
 * of states and effects on a battler. This is how it is in vanilla RPG Maker
 * MZ and this is how we intend for it to be with the VisuStella MZ library.
 * 
 * This is NOT a bug!
 * 
 * The reason we are not changing this is because it does not properly relay
 * information to the player accurately. When multiple popups appear, players
 * only have roughly a second and a half to calculate it all for any form of
 * information takeaway. We feel it is better suited for the player's overall
 * convenience to show a cummulative change and steer the experience towards a
 * more positive one.
 *
 * ============================================================================
 * Passive State Clarification
 * ============================================================================
 * 
 * This section will explain various misconceptions regarding passive states.
 * No, passive states do not work the same way as states code-wise. Yes, they
 * use the same effects as states mechanically, but there are differences.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
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
 * === General Skill Notetags ===
 *
 * The following are general notetags that are skill-related.
 *
 * ---
 *
 * <Skill Type: x>
 * <Skill Types: x,x,x>
 *
 * <Skill Type: name>
 * <Skill Types: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Marks the skill to have multiple Skill Types, meaning they would appear
 *   under different skill types without needing to create duplicate skills.
 * - Replace 'x' with a number value representing the Skill Type's ID.
 * - If using 'name' notetag variant, replace 'name' with the Skill Type(s)
 *   name desired to be added.
 *
 * ---
 * 
 * <List Name: name>
 * 
 * - Used for: Skill Notetags
 * - Makes the name of the skill appear different when show in the skill list.
 * - Using \V[x] as a part of the name will display that variable.
 * 
 * ---
 * 
 * <ID Sort Priority: x>
 * 
 * - Used for: Skill Notetags
 * - Used for Scene_Skill.
 * - Changes sorting priority by ID for skills to 'x'. 
 *   - Default priority level is '50'.
 * - Skills with higher priority values will be sorted higher up on the list
 *   while lower values will be lower on the list.
 * 
 * ---
 *
 * === Skill Cost Notetags ===
 *
 * The following are notetags that can be used to adjust skill costs. Some of
 * these notetags are added through the Plugin Parameter: Skill Cost Types and
 * can be altered there. This also means that some of these notetags can have
 * their functionality altered and/or removed.
 *
 * ---
 *
 * <type Cost: x>
 * <type Cost: x%>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to designate costs of custom or already existing
 *   types that cannot be made by the Database Editor.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the exact type cost value.
 *   This lets you bypass the Database Editor's limit of 9,999 MP and 100 TP.
 * - The 'x%' version is replaced with a percentile value to determine a cost
 *   equal to a % of the type's maximum quantity limit.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: 500>
 *   <MP Cost: 25%>
 *   <Gold Cost: 3000>
 *   <Potion Cost: 5>
 *
 * ---
 *
 * <type Cost Max: x>
 * <type Cost Min: x>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to ensure conditional and % costs don't become too
 *   large or too small.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the maximum or minimum values
 *   that the cost can be.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost Max: 1500>
 *   <MP Cost Min: 5>
 *   <Gold Cost Max: 10000>
 *   <Potion Cost Min: 3>
 *
 * ---
 *
 * <type Cost: +x>
 * <type Cost: -x>
 *
 * <type Cost: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will raise/lower the cost of any skill that uses the
 *   'type' cost by a specified amount.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a rate value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: +20>
 *   <MP Cost: -10>
 *   <Gold Cost: 50%>
 *   <Potion Cost: 200%>
 *
 * ---
 *
 * <Custom Cost Text>
 *  text
 * </Custom Cost Text>
 *
 * - Used for: Skill Notetags
 * - Allows you to insert custom text into the skill's cost area towards the
 *   end of the costs.
 * - Replace 'text' with the text you wish to display.
 * - Text codes may be used.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine any dynamic Skill Cost Types used for particular skills.
 *
 * ---
 *
 * <JS type Cost>
 *  code
 *  code
 *  cost = code;
 * </JS type Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'code' to determine the type 'cost' of the skill.
 * - Insert the final type cost into the 'cost' variable.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - Functionality for the notetag can be altered in the Plugin Parameters.
 *
 * ---
 *
 * === Gauge Replacement Notetags ===
 *
 * Certain classes can have their gauges swapped out for other Skill Cost
 * Types. This is especially helpful for the classes that don't utilize those
 * Skill Cost Types. You can mix and match them however you want.
 *
 * ---
 *
 * <Replace HP Gauge: type>
 * <Replace MP Gauge: type>
 * <Replace TP Gauge: type>
 *
 * - Used for: Class Notetags
 * - Replaces the HP (1st), MP (2nd), or TP (3rd) gauge with a different Skill
 *   Cost Type.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 *   - Does not work with 'Item Cost', 'Weapon Cost', or 'Armor Cost'.
 * - Replace 'type' with 'none' to not display any gauges there.
 * - The <Replace TP Gauge: type> will require 'Display TP in Window' setting
 *   to be on in the Database > System 1 tab.
 * - Functionality for the notetags can be altered by changes made to the
 *   Skill & States Core Plugin Parameters.
 *
 * ---
 * 
 * === Item Cost-Related Notetags ===
 * 
 * ---
 * 
 * <Item Cost: x name>
 * <Weapon Cost: x name>
 * <Armor Cost: x name>
 * 
 * - Used for: Skill Notetags
 * - The skill will consume items, weapons, and/or armors in order to be used.
 *   - Even non-consumable items will be consumed.
 * - Replace 'x' with a number representing the respective item cost.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * - Insert multiples of this notetag to consume multiple items, weapons,
 *   and/or armors.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 * 
 * Examples:
 * 
 *   <Item Cost: 5 Magic Water>
 *   <Item Cost: 2 Antidote>
 *   <Weapon Cost: 1 Short Sword>
 *   <Armor Cost: 3 Cloth Armor>
 * 
 * ---
 *
 * <Item Cost Max: x name>
 * <Item Cost Min: x name>
 *
 * <Weapon Cost Max: x name>
 * <Weapon Cost Min: x name>
 *
 * <Armor Cost Max: x name>
 * <Armor Cost Min: x name>
 * 
 * - Used for: Skill Notetags
 * - Sets up a maximum/minimum cost for the item, weapon, armor type costs.
 * - Replace 'x' with a number representing the maximum or minimum cost.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * 
 * Examples:
 * 
 *   <Item Cost Max: 10 Magic Water>
 *   <Item Cost Min: 2 Antidote>
 *   <Weapon Cost Max: 3 Short Sword>
 *   <Armor Cost Min: 1 Cloth Armor>
 * 
 * ---
 *
 * <Item Cost: +x name>
 * <Item Cost: -x name>
 *
 * <Weapon Cost: +x name>
 * <Weapon Cost: -x name>
 *
 * <Armor Cost: +x name>
 * <Armor Cost: -x name>
 * 
 * <Item Cost: x% name>
 * <Weapon Cost: x% name>
 * <Armor Cost: x% name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will raise/lower the item, weapon, and/or armor costs of
 *   any skill that costs those items, weapons, and/or armors by x%.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a rate value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * - Insert multiples of this notetag to consume multiple items, weapons,
 *   and/or armors.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 * 
 * Examples:
 * 
 *   <Item Cost: +1 Magic Water>
 *   <Item Cost: -2 Antidote>
 *   <Weapon Cost: 50% Short Sword>
 *   <Armor Cost: 200% Cloth Armor>
 * 
 * ---
 * 
 * <Replace Item name1 Cost: name2>
 * <Replace Weapon name1 Cost: name2>
 * <Replace Armor name1 Cost: name2>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will not consume 'name1' items, weapons, or armors.
 *   Instead, the cost will be redirected to 'name2' items, weapons, or armors.
 *   - Even non-consumable items will be consumed.
 * - Replace 'name1' with text representing the respective item, weapon, or
 *   armor that is the original cost type.
 * - Replace 'name2' with text representing the respective item, weapon, or
 *   armor that will be consumed instead.
 * 
 * Examples:
 * 
 *   <Replace Item Magic Water Cost: Potion>
 *   <Replace Item Antidote Cost: Dispel Herb>
 *   <Replace Weapon Short Sword Cost: Falchion>
 *   <Replace Armor Cloth Armor Cost: Leather Armor>
 * 
 * ---
 *
 * === Skill Accessibility Notetags ===
 *
 * Sometimes, you don't want all skills to be visible whether it be to hide
 * menu-only skills during battle, until certain switches are turned ON/OFF, or
 * until certain skills have been learned.
 *
 * ---
 *
 * <Hide in Battle>
 * <Hide outside Battle>
 *
 * - Used for: Skill Notetags
 * - Makes the specific skill visible or hidden depending on whether or not the
 *   player is currently in battle.
 *
 * ---
 *
 * <Show Switch: x>
 *
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 *
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if learned Skill: x>
 *
 * <Show if learned All Skills: x,x,x>
 * <Show if learned Any Skills: x,x,x>
 *
 * <Show if learned Skill: name>
 *
 * <Show if learned All Skills: name, name, name>
 * <Show if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if learned Skill: x>
 *
 * <Hide if learned All Skills: x,x,x>
 * <Hide if learned Any Skills: x,x,x>
 *
 * <Hide if learned Skill: name>
 *
 * <Hide if learned All Skills: name, name, name>
 * <Hide if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if has Skill: x>
 *
 * <Show if have All Skills: x,x,x>
 * <Show if have Any Skills: x,x,x>
 *
 * <Show if has Skill: name>
 *
 * <Show if have All Skills: name, name, name>
 * <Show if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if has Skill: x>
 *
 * <Hide if have All Skills: x,x,x>
 * <Hide if have Any Skills: x,x,x>
 *
 * <Hide if has Skill: name>
 *
 * <Hide if have All Skills: name, name, name>
 * <Hide if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, skill will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, skill will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a skill can be accessible visibly or through usage.
 *
 * ---
 *
 * <JS Skill Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Skill Visible>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on JavaScript code.
 * - Replace 'code' to determine the type visibility of the skill.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   skill will be visible or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other visibility conditions must be met for this code to count.
 *
 * ---
 *
 * <JS Skill Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Skill Enable>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the skill.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   skill will be enabled or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other skill conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === General State-Related Notetags ===
 *
 * The following notetags are centered around states, such as how their turn
 * counts are displayed, items and skills that affect state turns, if the state
 * can avoid removal by death state, etc.
 *
 * ---
 *
 * <No Death Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon death.
 * - This allows this state to be added to an already dead battler, too.
 *
 * ---
 *
 * <No Recover All Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon using the Recover All command.
 *
 * ---
 *
 * <Group Defeat>
 *
 * - Used for: State Notetags
 * - If an entire party is affected by states with the <Group Defeat> notetag,
 *   they are considered defeated.
 * - Usage for this includes party-wide petrification, frozen, etc.
 *
 * ---
 *
 * <Reapply Rules: Ignore>
 * <Reapply Rules: Reset>
 * <Reapply Rules: Greater>
 * <Reapply Rules: Add>
 *
 * - Used for: State Notetags
 * - Choose what kind of rules this state follows if the state is being applied
 *   to a target that already has the state. This affects turns specifically.
 * - 'Ignore' will bypass any turn changes.
 * - 'Reset' will recalculate the state's turns.
 * - 'Greater' will choose to either keep the current turn count if it's higher
 *   than the reset amount or reset it if the current turn count is lower.
 * - 'Add' will add the state's turn count to the applied amount.
 * - If this notetag isn't used, it will use the rules set in the States >
 *   Plugin Parameters.
 *
 * ---
 *
 * <Positive State>
 * <Negative State>
 *
 * - Used for: State Notetags
 * - Marks the state as a positive state or negative state, also altering the
 *   state's turn count color to match the Plugin Parameter settings.
 * - This also puts the state into either the 'Positive' category or
 *   'Negative' category.
 *
 * ---
 *
 * <Category: name>
 * <Category: name, name, name>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace 'name' with a category name to mark this state as.
 * - Insert multiples of this to mark the state with  multiple categories.
 *
 * ---
 *
 * <Categories>
 *  name
 *  name
 * </Categories>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace each 'name' with a category name to mark this state as.
 *
 * ---
 * 
 * <Bypass State Damage Removal: id>
 * <Bypass State Damage Removal: id, id, id>
 * 
 * <Bypass State Damage Removal: name>
 * <Bypass State Damage Removal: name, name, name>
 * 
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used to attack an enemy with the listed state that
 *   would normally have on damage removal (ie Sleep).
 * - For 'id' variant, replace each 'id' with a number representing the state's
 *   ID to bypass the damage removal for.
 * - For 'name' variant, replace each 'name' with the state's name to bypass
 *   the damage removal for.
 * - This can be used for attacks like "Dream Eater" that would prevent waking
 *   up a sleeping opponent.
 * 
 * ---
 * 
 * <Bypass State Damage Removal as Attacker: id>
 * <Bypass State Damage Removal as Attacker: id, id, id>
 * 
 * <Bypass State Damage Removal as Attacker: name>
 * <Bypass State Damage Removal as Attacker: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - When an attacker with an associated trait object that has this notetag
 *   would attack an enemy with the listed state, bypass on damage removal.
 * - For 'id' variant, replace each 'id' with a number representing the state's
 *   ID to bypass the damage removal for.
 * - For 'name' variant, replace each 'name' with the state's name to bypass
 *   the damage removal for.
 * - This can be used for effects like "Sleep Striker" that would prevent the
 *   attacker from waking up a sleeping opponent.
 * 
 * ---
 * 
 * <Bypass State Damage Removal as Target: id>
 * <Bypass State Damage Removal as Target: id, id, id>
 * 
 * <Bypass State Damage Removal as Target: name>
 * <Bypass State Damage Removal as Target: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - When a target with an associated trait object that has this notetag is
 *   attacked as the target with the listed state, bypass on damage removal.
 * - For 'id' variant, replace each 'id' with a number representing the state's
 *   ID to bypass the damage removal for.
 * - For 'name' variant, replace each 'name' with the state's name to bypass
 *   the damage removal for.
 * - This can be used for effects like "Deep Sleep" that would prevent the
 *   attacked target from waking up.
 * 
 * ---
 * 
 * <Resist State Category: name>
 * <Resist State Categories: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 * 
 * <Resist State Categories>
 *  name
 *  name
 *  name
 * </Resist State Categories>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 *
 * <State x Category Remove: y>
 * 
 * <State x Category Remove: All>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to remove 'y' states from specific category 'x'.
 * - Replace 'x' with a category name to remove from.
 * - Replace 'y' with the number of times to remove from that category.
 * - Use the 'All' variant to remove all of the states of that category.
 * - Insert multiples of this to remove different types of categories.
 *
 * ---
 * 
 * <Remove Other x States>
 * 
 * - Used for: State Notetags
 * - When the state with this notetag is added, remove other 'x' category
 *   states from the battler (except for the state being added).
 * - Replace 'x' with a category name to remove from.
 * - Insert multiples of this to remove different types of categories.
 * - Useful for thing state types like stances and forms that there is usually
 *   only one active at a time.
 * 
 * ---
 *
 * <Hide State Turns>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - This will by pass any Plugin Parameter settings.
 *
 * ---
 *
 * <Turn Color: x>
 * <Turn Color: #rrggbb>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - Determines the color of the state's turn count.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 * 
 * <Max Turns: x>
 * 
 * - Used for: State Notetags
 * - Determines the upper limit on the maximum number of turns for this state.
 * - Replace 'x' with a number representing the maximum number of turns used
 *   for this state.
 * - If no notetag is used, refer to the default setting found in the Plugin
 *   Parameters under "State Settings".
 * 
 * ---
 *
 * <State id Turns: +x>
 * <State id Turns: -x>
 *
 * <Set State id Turns: x>
 *
 * <State name Turns: +x>
 * <State name Turns: -x>
 *
 * <Set State name Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by state 'id' or state 'name', change the state
 *   turn duration for target.
 * - For 'id' variant, replace 'id' with the ID of the state to modify.
 * - For 'name' variant, replace 'name' with the name of the state to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple states at once.
 *
 * ---
 *
 * <param Buff Turns: +x>
 * <param Buff Turns: -x>
 *
 * <Set param Buff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' buff, change that buff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter buff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * <param Debuff Turns: +x>
 * <param Debuff Turns: -x>
 *
 * <Set param Debuff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' debuff, change that debuff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter debuff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * === JavaScript Notetags: On Add/Erase/Expire ===
 *
 * Using JavaScript code, you can use create custom effects that occur when a
 * state has bee added, erased, or expired.
 * 
 * ---
 *
 * <JS On Add State>
 *  code
 *  code
 * </JS On Add State>
 *
 * - Used for: State Notetags
 * - When a state is added, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Erase State>
 *  code
 *  code
 * </JS On Erase State>
 *
 * - Used for: State Notetags
 * - When a state is erased, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Expire State>
 *  code
 *  code
 * </JS On Expire State>
 *
 * - Used for: State Notetags
 * - When a state has expired, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * === JavaScript Notetags: Slip Damage/Healing ===
 *
 * Slip Damage, in RPG Maker vocabulary, refers to damage over time. The
 * following notetags allow you to perform custom slip damage/healing.
 *
 * ---
 *
 * <JS type Slip Damage>
 *  code
 *  code
 *  damage = code;
 * </JS type Slip Damage>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip damage is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip damage.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the damage.
 * - The 'state' variable refers to the current state being affected.
 * - The 'damage' variable is the finalized slip damage to be dealt.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 *
 * <JS type Slip Heal>
 *  code
 *  code
 *  heal = code;
 * </JS type Slip Heal>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip healing is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip healing.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the healing.
 * - The 'state' variable refers to the current state being affected.
 * - The 'heal' variable is the finalized slip healing to be recovered.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 * 
 * <JS Slip Refresh>
 * 
 * - Used for: State Notetags
 * - Refreshes the calculations made for the JS Slip Damage/Heal amounts at the
 *   start of each regeneration phase to allow for dynamic damage ranges.
 * 
 * ---
 *
 * === Passive State Notetags ===
 *
 * Passive States are states that are always applied to actors and enemies
 * provided that their conditions have been met. These can be granted through
 * database objects or through the Passive States Plugin Parameters.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * <Passive State: x>
 * <Passive States: x,x,x>
 *
 * <Passive State: name>
 * <Passive States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy Notetags
 * - Adds passive state(s) x to trait object, applying it to related actor or
 *   enemy unit(s).
 * - Replace 'x' with a number to determine which state to add as a passive.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive.
 * - Note: If you plan on applying a passive state through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 *
 * ---
 *
 * <Passive Stackable>
 *
 * - Used for: State Notetags
 * - Makes it possible for this passive state to be added multiple times.
 * - Otherwise, only one instance of the passive state can be available.
 *
 * ---
 *
 * <Passive Condition Class: id>
 * <Passive Condition Classes: id, id, id>
 *
 * <Passive Condition Class: name>
 * <Passive Condition Classes: name, name, name>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on the actor's
 *   current class. As long as the actor's current class matches one of the
 *   data entries, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Multiclass: id>
 * <Passive Condition Multiclass: id, id, id>
 *
 * <Passive Condition Multiclass: name>
 * <Passive Condition Multiclass: name, name, name>
 *
 * - Used for: State Notetags
 * - Requires VisuMZ_2_ClassChangeSystem!
 * - Determines the passive condition of the passive state based on the actor's
 *   multiclasses. As long as the actor has any of the matching classes
 *   assigned as a multiclass, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Switch ON: x>
 *
 * <Passive Condition All Switches ON: x,x,x>
 * <Passive Condition Any Switch ON: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are ON. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are ON. Otherwise, it would not be met.
 *
 * ---
 *
 * <Passive Condition Switch OFF: x>
 *
 * <Passive Condition All Switches OFF: x,x,x>
 * <Passive Condition Any Switch OFF: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are OFF. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are OFF. Otherwise, it would not be met.
 *
 * ---
 * 
 * === Aura & Miasma Notetags ===
 * 
 * Auras are a type passive that affects an allied party. Miasmas are a type of
 * passive that affects an opposing party. Auras and Miasmas only need to come
 * from a single source to give an entire party or troop a passive provided
 * that the battler emitting the aura/miasma is alive and in battle.
 * 
 * ---
 * 
 * <Aura State: x>
 * <Aura States: x, x, x>
 * 
 * <Aura State: name>
 * <Aura States: name, name, name>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy Notetags
 * - Emits an aura that affects the battler's allies and gives each affected
 *   member passive state(s) 'x'.
 * - Replace 'x' with a number to determine which state to add as a passive
 *   generated by this aura.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive generated by this aura.
 * - Note: If you plan on applying an aura effect through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 * 
 * ---
 * 
 * <Miasma State: x>
 * <Miasma States: x, x, x>
 * 
 * <Miasma State: name>
 * <Miasma States: name, name, name>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy Notetags
 * - Emits an miasma that affects the battler's opponents and gives each
 *   affected member passive state(s) 'x'.
 * - Miasmas do NOT apply outside of battle.
 * - Replace 'x' with a number to determine which state to add as a passive
 *   generated by this miasma.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive generated by this miasma.
 * - Note: If you plan on applying a miasma effect through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 * 
 * ---
 * 
 * <Not User Aura>
 * <Aura Not For User>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Prevents the emitting user from being affected by the related aura.
 * 
 * ---
 * 
 * <Allow Dead Aura>
 * <Allow Dead Miasma>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Allows aura/miasma to continue emitting even after the emitting user is
 *   in a dead state.
 * - When used with Actor, Class, Skill, Weapon, Armor, Enemy objects, it will
 *   only affect the auras/miasmas emitted from that object.
 * - When used with States, the effect will take place as long as it is used
 *   as an aura or miasma regardless of where it is emitting from.
 * - Takes priority over <Dead Aura Only> and <Dead Miasma Only> notetags.
 * 
 * ---
 * 
 * <Dead Aura Only>
 * <Dead Miasma Only>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Allows aura/miasma to only emit if the emitting user is in a dead state.
 * - When used with Actor, Class, Skill, Weapon, Armor, Enemy objects, it will
 *   only affect the auras/miasmas emitted from that object.
 * - When used with States, the effect will take place as long as it is used
 *   as an aura or miasma regardless of where it is emitting from.
 * 
 * ---
 *
 * === JavaScript Notetags: Passive State ===
 *
 * The following is a notetag made for users with JavaScript knowledge to
 * determine if a passive state's condition can be met.
 *
 * ---
 *
 * <JS Passive Condition>
 *  code
 *  code
 *  condition = code;
 * </JS Passive Condition>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the state based on JavaScript code.
 * - Replace 'code' to determine if a passive state's condition has been met.
 * - The 'condition' variable returns a boolean (true/false) to determine if
 *   the passive state's condition is met or not.
 * - The 'user' variable refers to the user affected by the passive state.
 * - The 'state' variable refers to the passive state being checked.
 * - All other passive conditions must be met for this code to count.
 * 
 * **NOTE** Not everything can be used as a custom JS Passive Condition due to
 * limitations of the code. There are failsafe checks to prevent infinite loops
 * and some passive conditions will not register for this reason and the
 * conditional checks will behave as if the passive states have NOT been
 * applied for this reason. Such examples include the following:
 * 
 * - A passive state that requires another passive state
 * - A passive state that requires a trait effect from another state
 * - A passive state that requires a parameter value altered by another state
 * - A passive state that requires equipment to be worn but its equipment type
 *   access is provided by another state.
 * - Anything else that is similar in style.
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
 * === Skill Cost Plugin Commands ===
 * 
 * ---
 * 
 * Skill Cost: Emulate Actor Pay
 * - Target actor(s) emulates paying for skill cost.
 * - 
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) will pay skill cost.
 * 
 *   Skill ID:
 *   - What is the ID of the skill to emulate paying the skill cost for?
 * 
 * ---
 * 
 * Skill Cost: Emulate Enemy Pay
 * - Target enemy(s) emulates paying for skill cost.
 * - 
 * 
 *   Enemy Index(es):
 *   - Select which enemy index(es) will pay skill cost.
 * 
 *   Skill ID:
 *   - What is the ID of the skill to emulate paying the skill cost for?
 * 
 * ---
 * 
 * === State Turns Plugin Commands ===
 * 
 * ---
 * 
 * State Turns: Actor State Turns Change By
 * - Changes actor(s) state turns by an amount.
 * - Only works on states that can have turns.
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns By:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 * State Turns: Actor State Turns Change To
 * - Changes actor(s) state turns to a specific value.
 * - Only works on states that can have turns.
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns To:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 * State Turns: Enemy State Turns Change By
 * - Changes enemy(s) state turns by an amount.
 * - Only works on states that can have turns.
 * 
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns By:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 * State Turns: Enemy State Turns Change To
 * - Changes enemy(s) state turns to a specific value.
 * - Only works on states that can have turns.
 * 
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns To:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 *
 * ============================================================================
 * Plugin Parameters: General Skill Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust various aspects of the game regarding skills
 * from the custom Skill Menu Layout to global custom effects made in code.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Skill Menu Layout provided by this plugin?
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
 * Skill Type Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Skill Type Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Skill Type Window.
 * 
 *   Window Width:
 *   - What is the desired pixel width of this window?
 *   - Default: 240
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Skill Menu?:
 *   - Show the Shop Status Window in the Skill Menu?
 *   - This is enabled if the Updated Layout is on.
 * 
 *   Adjust List Window?:
 *   - Automatically adjust the Skill List Window in the Skill Menu if using
 *     the Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Shop Status Window in the
 *     Skill Menu.
 *
 * ---
 *
 * Skill Types
 * 
 *   Hidden Skill Types:
 *   - Insert the ID's of the Skill Types you want hidden from view ingame.
 * 
 *   Hidden During Battle:
 *   - Insert the ID's of the Skill Types you want hidden during battle only.
 * 
 *   Icon: Normal Type:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Icon: Magic Type:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Sort: Alphabetical:
 *   - Insert the ID's of Skill Types you want sorted alphabetically.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Skill Conditions:
 *   - JavaScript code for a global-wide skill condition check.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Cost Types
 * ============================================================================
 *
 * Skill Cost Types are the resources that are used for your skills. These can
 * range from the default MP and TP resources to the newly added HP, Gold, and
 * Potion resources.
 *
 * ---
 *
 * Settings
 * 
 *   Name:
 *   - A name for this Skill Cost Type.
 * 
 *   Icon:
 *   - Icon used for this Skill Cost Type.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display this cost.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display this cost.
 *
 * ---
 *
 * Cost Processing
 * 
 *   JS: Cost Calculation:
 *   - Code on how to calculate this resource cost for the skill.
 * 
 *   JS: Can Pay Cost?:
 *   - Code on calculating whether or not the user is able to pay the cost.
 * 
 *   JS: Paying Cost:
 *   - Code for if met, this is the actual process of paying of the cost.
 *
 * ---
 *
 * Window Display
 * 
 *   JS: Show Cost?:
 *   - Code for determining if the cost is shown or not.
 * 
 *   JS: Cost Text:
 *   - Code to determine the text (with Text Code support) used for the
 *     displayed cost.
 *
 * ---
 *
 * Gauge Display
 * 
 *   JS: Maximum Value:
 *   - Code to determine the maximum value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Current Value:
 *   - Code to determine the current value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Draw Gauge:
 *   - Code to determine how to draw the Skill Cost resource for this 
 *     gauge type.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gauge Settings
 * ============================================================================
 *
 * Settings in regards to how skill cost gauges function and appear.
 *
 * ---
 *
 * Labels
 * 
 *   Font Type:
 *   - Which font type should be used for labels?
 * 
 *   Match Label Color:
 *   - Match the label color to the Gauge Color being used?
 * 
 *     Match: Gauge # ?:
 *     - Which Gauge Color should be matched?
 * 
 *     Preset: Gauge Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *   Solid Outline:
 *   - Make the label outline a solid black color?
 * 
 *   Outline Width:
 *   - What width do you wish to use for your outline?
 *   - Use 0 to not use an outline.
 *
 * ---
 *
 * Values
 * 
 *   Font Type:
 *   - Which font type should be used for values?
 * 
 *   Solid Outline:
 *   - Make the value outline a solid black color?
 * 
 *   Outline Width:
 *   - What width do you wish to use for your outline?
 *   - Use 0 to not use an outline.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General State Settings
 * ============================================================================
 *
 * These are general settings regarding RPG Maker MZ's state-related aspects
 * from how turns are reapplied to custom code that's ran whenever states are
 * added, erased, or expired.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying states.
 *   - Ignore: State doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let states go up to.
 *   - This can be changed with the <Max Turns: x> notetag.
 * 
 *   Action End Update:
 *   - Refer to "Major Changes" in Help File for explanation.
 * 
 *   Turn End on Map:
 *   - Update any state and buff turns on the map after this many steps.
 *   - Use 0 to disable.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display state turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Turn Color: Neutral:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Positive:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Negative:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Data Display
 * 
 *   Show Data?:
 *   - Display state data on top of window icons and sprites?
 * 
 *   Data Font Size:
 *   - Font size used for displaying state data.
 * 
 *   Offset X:
 *   - Offset the X position of the state data display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the state data display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is added.
 * 
 *   JS: On Erase State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is erased.
 * 
 *   JS: On Expire State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     has expired.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Buff/Debuff Settings
 * ============================================================================
 *
 * Buffs and debuffs don't count as states by RPG Maker MZ's mechanics, but
 * they do function close enough for them to be added to this plugin for
 * adjusting. Change these settings to make buffs and debuffs work to your
 * game's needs.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying buffs/debuffs.
 *   - Ignore: Buff/Debuff doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let buffs and debuffs go up to.
 *
 * ---
 *
 * Stacking
 * 
 *   Max Stacks: Buff:
 *   - Maximum number of stacks for buffs.
 * 
 *   Max Stacks: Debuff:
 *   - Maximum number of stacks for debuffs.
 * 
 *   JS: Buff/Debuff Rate:
 *   - Code to determine how much buffs and debuffs affect parameters.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display buff and debuff turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Color: Buffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Debuffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Rate Display
 * 
 *   Show Rate?:
 *   - Display buff and debuff rate on top of window icons and sprites?
 * 
 *   Rate Font Size:
 *   - Font size used for displaying rate.
 * 
 *   Offset X:
 *   - Offset the X position of the rate display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the rate display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Add Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Erase Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Erase Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Expire Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Expire Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Passive State Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust passive states that can affect all actors and
 * enemies as well as have global conditions.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * List
 * 
 *   Global Passives:
 *   - A list of passive states to affect actors and enemies.
 * 
 *   Actor-Only Passives:
 *   - A list of passive states to affect actors only.
 * 
 *   Enemy Passives:
 *   - A list of passive states to affect enemies only.
 *
 * ---
 * 
 * Cache
 * 
 *   Switch Refresh?:
 *   - Refresh all battle members when switches are changed in battle?
 *   - This is primarily used for passive state conditions involve parameters
 *     that do not update due to cached data until a refresh occurs.
 *   - If this is on, do not spam Switch changes during battle in order to
 *     prevent lag spikes.
 * 
 *   Variable Refresh?:
 *   - Refresh all battle members when variables are changed in battle?
 *   - This is primarily used for passive state conditions involve parameters
 *     that do not update due to cached data until a refresh occurs.
 *   - If this is on, do not spam Variable changes during battle in order to
 *     prevent lag spikes.
 * 
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Condition Check:
 *   - JavaScript code for a global-wide passive condition check.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.50: March 20, 2025
 * * Documentation Update!
 * ** Changed the description of Plugin Parameter 'Action End Update' to
 *    'Refer to "Major Changes" in Help File for explanation.'
 * ** Added examples of "Action End Update" under "Major Changes"
 * *** The new state: "Fiery Blade" will allow the affected battler to deal
 *     fire elemental damage. With Action End, this means for 5 actions, those
 *     attacks will deal fire damage.
 * *** This means that if no action is taken, due to a status effect like
 *     "Sleep" or "Stun", then the duration count will not decrease.
 * *** On the flip side, if the battler performs multiple actions a turn, then
 *     the duration count drops faster because more actions have been spent.
 * *** However, if this "Fiery Blade" state was using Turn End instead, it will
 *     have its duration reduced by 1 each turn, regardless of "Sleep" or
 *     "Stun" states, and regardless of how many actions are performed each
 *     turn.
 * 
 * Version 1.49: February 20, 2025
 * * Bug Fixes!
 * ** Fixed a bug where causing a dead battler to refresh afterwards would
 *    yield multiple death states on that battler. Fix made by Arisu.
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Better compatibility with different icon sizes.
 * 
 * Version 1.48: December 19, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Auras & Miasmas added by Olivia:
 * *** Auras are a type passive that affects an allied party. Miasmas are a
 *     type of passive that affects an opposing party. Auras and Miasmas only
 *     need to come from a single source to give an entire party or troop a
 *     passive provided that the battler emitting the aura/miasma is alive and
 *     in battle.
 * ** New Notetags added by Olivia:
 * *** <Aura State: x>
 * **** Emits an aura that affects the battler's allies and gives each affected
 *      member passive state(s) 'x'.
 * *** <Miasma State: x>
 * **** Emits an aura that affects the battler's opponents and gives each
 *      affected member passive state(s) 'x'.
 * *** <Not User Aura>
 * **** Prevents the emitting user from being affected by the related aura.
 * *** <Allow Dead Aura>
 * *** <Allow Dead Miasma>
 * **** Allows aura/miasma to continue emitting even after the emitting user is
 *      in a dead state.
 * *** <Dead Aura Only>
 * *** <Dead Miasma Only>
 * **** Allows aura/miasma to only emit if the emitting user is in a dead state
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.47: August 29, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Arisu:
 * *** <Bypass State Damage Removal: id/name>
 * **** When this skill/item is used to attack an enemy with the listed state
 *      that would normally have on damage removal (ie Sleep).
 * **** This can be used for attacks like "Dream Eater" that would prevent
 *      waking up a sleeping opponent.
 * *** <Bypass State Damage Removal as Attacker: id/name>
 * **** When an attacker with an associated trait object that has this notetag
 *      would attack an enemy with the listed state, bypass on damage removal.
 * **** This can be used for effects like "Sleep Striker" that would prevent
 *      the attacker from waking up a sleeping opponent.
 * *** <Bypass State Damage Removal as Target: id/name>
 * **** When a target with an associated trait object that has this notetag is
 *      attacked as the target with the listed state, bypass on damage removal.
 * **** This can be used for effects like "Deep Sleep" that would prevent the
 *      attacked target from waking up.
 * 
 * Version 1.46: July 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Parameters > Skill Settings > Skill Types > Sort: Alphabetical
 * **** Insert the ID's of Skill Types you want sorted alphabetically.
 * ** New notetags added by Irina:
 * *** <ID Sort Priority: x>
 * **** Used for Scene_Skill.
 * **** Changes sorting priority by ID for skill to 'x'. 
 * **** Default priority level is '50'.
 * **** Skills with higher priority values will be sorted higher up on the list
 *      while lower values will be lower on the list.
 * 
 * Version 1.45: May 16, 2024
 * * Bug Fixes!
 * ** Fixed a problem with passive state conditional notetags not working
 *    properly. Fix made by Irina.
 * 
 * Version 1.44: April 18, 2024
 * * Bug Fixes!
 * ** Fixed a bug where passive states would not appear. Fix made by Olivia.
 * ** Fixed a bug where a crash would occur if certain plugins cleared the
 *    passive state cache midway through trying to register it. Fix by Olivia.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * ** States with lots and lots of text data within their notes will no longer
 *    cause FPS drops.
 * 
 * Version 1.43: January 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Skill Cost: Emulate Actor Pay
 * *** Skill Cost: Emulate Enemy Pay
 * **** Target actor(s)/enemy(s) emulates paying for skill cost.
 * *** State Turns: Actor State Turns Change By
 * *** State Turns: Actor State Turns Change To
 * *** State Turns: Enemy State Turns Change By
 * *** State Turns: Enemy State Turns Change To
 * **** Changes actor(s)/enemy(s) state turns to a specific value/by an amount.
 * **** Only works on states that can have turns.
 * 
 * Version 1.42: November 16, 2023
 * * Bug Fixes!
 * ** 'origin' variable was not working properly for <JS On Expire State>
 *    JavaScript notetag. Should now be working properly. Fix made by Irina.
 * 
 * Version 1.41: September 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug that prevented <Max Turns: x> for states from working due to
 *    one of the recent updates. Fix made by Arisu.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Apparently, we never put <Max Turns: x> in the help notetag section.
 *    Woops... It's there now.
 * 
 * Version 1.40: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a bug involving the "Item Cost" skill cost type found in the Plugin
 *    Parameters when involving consumable items.
 * *** If you want to acquire these settings for an already-existing project,
 *     do either of the following:
 * **** Delete the existing VisuMZ_1_SkillsStatesCore.js in the Plugin Manager
 *      list and install the newest version.
 * **** Or create a new project, install VisuMZ_1_SkillsStatesCore.js there,
 *      then copy over the "Item Cost" plugin parameters found in the "Skill
 *      Cost Types" plugin parameter settings to your current project.
 * 
 * Version 1.39: July 13, 2023
 * * Feature Update!
 * ** Updated the "Item Cost" skill cost type found in the Plugin Parameters to
 *    no longer consume items that are key items or nonconsumable.
 * *** If you want to acquire these settings for an already-existing project,
 *     do either of the following:
 * **** Delete the existing VisuMZ_1_SkillsStatesCore.js in the Plugin Manager
 *      list and install the newest version.
 * **** Or create a new project, install VisuMZ_1_SkillsStatesCore.js there,
 *      then copy over the "Item Cost" plugin parameters found in the "Skill
 *      Cost Types" plugin parameter settings to your current project.
 * 
 * Version 1.38: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added segment to <Replace x Gauge: type> in documentation:
 * *** Does not work with 'Item Cost', 'Weapon Cost', or 'Armor Cost'.
 * * New Features!
 * ** New "Skill Cost Type" and notetags added by Arisu and sponsored by FAQ.
 * *** <Item Cost: x name>
 * *** <Weapon Cost: x name>
 * *** <Armor Cost: x name>
 * **** The skill will consume items, weapons, and/or armors in order to be
 *      used. Even non-consumable items will be consumed.
 * *** <Item Cost Max/Min: x name>
 * *** <Weapon Cost Max/Min: x name>
 * *** <Armor Cost Max/Min: x name>
 * **** Sets up a maximum/minimum cost for the item, weapon, armor type costs.
 * *** <Item Cost: x% name>
 * *** <Weapon Cost: x% name>
 * *** <Armor Cost: x% name>
 * **** Alters cost rate of skills that would consume item, weapon, or armor.
 * *** <Item Cost: +/-x name>
 * *** <Weapon Cost: +/-x name>
 * *** <Armor Cost: +/-x name>
 * **** Alters flat costs of skills that would consume item, weapon, or armor.
 * *** <Replace Item name1 Cost: name2>
 * *** <Replace Weapon name1 Cost: name2>
 * *** <Replace Armor name1 Cost: name2>
 * **** Replaces item, weapon, or armor to be consumed for another type.
 * *** Projects with the Skills and States Core already installed will not have
 *     this update, but you can copy over the settings from a new project with
 *     the following steps:
 * **** Create a new project. Install Skills and States Core. Open up the new
 *      project's 'Skill Cost Types'.
 * **** Right click the 'Item Cost' option(s) and click copy.
 * **** Go to the target project's Skills and States Core's 'Skill Cost Types'
 *      plugin parameter. Paste the command where you want it to go.
 * **** Only 'Item Cost' is needed as it encompasses all three types for item,
 *      weapon, and armor costs.
 * 
 * Version 1.38: February 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.37: January 20, 2023
 * * Bug Fixes!
 * ** Fixed a bug that caused equipment to unequip if the needed equipment
 *    traits came from passive states upon learning new skills. Fix by Irina.
 * 
 * Version 1.36: December 15, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** When enemies are defeated with their entire party having a state with the
 *    <Group Defeat> notetag, then the party will gain EXP, Gold, and Drops
 *    before when they wouldn't. Update made by Irina.
 * * New Features!
 * ** New Plugin Parameter added by Irina!
 * *** Plugin Parameters > Skill Settings > Skill Type Window > Window Width
 * **** What is the desired pixel width of this window? Default: 240
 * 
 * Verison 1.35: October 13, 2022
 * * Feature Update!
 * ** Default values for Passive States > Cache > Switch Refresh? and Variable
 *    Refresh? are now set to "false" in order to prevent sudden lag spikes for
 *    those who are unfamiliar with how this setting works.
 * ** Update made by Irina.
 * 
 * Version 1.34: September 29, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Gauge Settings
 * **** These settings allow you to make minor tweaks to how the gauges look
 *      ranging from the color used for the labels to the outline types used
 *      for the values.
 * 
 * Version 1.33: August 11, 2022
 * * Bug Fixes!
 * ** Fixed a crash that occurs when performing a custom action sequence
 *    without a skill attached to it. Fix made by Olivia.
 * 
 * Version 1.32: June 16, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Passive State Settings > Cache > Switch Refresh?
 * *** Plugin Parameters > Passive State Settings > Cache > Variable Refresh?
 * **** Refresh all battle members when switches/variables are changed in
 *      battle?
 * **** This is primarily used for passive state conditions involve parameters
 *      that do not update due to cached data until a refresh occurs.
 * **** If this is on, do not spam Switch/Variable changes during battle in
 *      order to prevent lag spikes.
 * 
 * Version 1.31: April 28, 2022
 * * Bug Fixes!
 * ** Custom Slip Damage JS is now totalled correctly into regular slip damage
 *    totals for damage popups. Fix made by Olivia.
 * 
 * Version 1.30: April 14, 2022
 * * Feature Update!
 * ** Changed the state data removal timing to be after JS notetag effects
 *    take place in order for data such as origin data to remain intact. Update
 *    made by Irina.
 * 
 * Version 1.29: March 31, 2022
 * * Bug Fixes!
 * ** Fixed an error with <State x Category Remove: y> not countaing correctly
 *    unless the state count matched the exact amount. The notetag effect
 *    should work properly now. Fix made by Olivia.
 * 
 * Version 1.28: March 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** <State x Category Remove: All> updated to allow multiple cases in a
 *    single notebox. Updated by Arisu.
 * * New Features!
 * ** New Notetag added by Arisu and sponsored by Archeia!
 * *** <Remove Other x States>
 * **** When the state with this notetag is added, remove other 'x' category
 *      states from the battler (except for the state being added).
 * **** Useful for thing state types like stances and forms that there is
 *      usually only one active at a time.
 * 
 * Version 1.27: January 27, 2022
 * * Bug Fixes!
 * ** Custom JS Slip Damage/Healing values should now be recalculated on
 *    demand. Fix made by Olivia.
 * 
 * Version 1.26: January 20, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Conditional Passive Bypass check is now stronger to prevent even more
 *    infinite loops from happening. Update made by Olivia.
 * * New Features!
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > State Settings > General > Turn End on Map
 * **** Update any state and buff turns on the map after this many steps.
 * **** Use 0 to disable.
 * 
 * Version 1.25: November 11, 2021
 * * Bug Fixes!
 * ** Hidden skill notetags should no longer crash upon not detecting actors
 *    for learned skills. Fix made by Olivia.
 * 
 * Version 1.24: November 4, 2021
 * * Documentation Update!
 * ** Added section: "Slip Damage Popup Clarification"
 * *** Slip Damage popups only show one popup for HP, MP, and TP each and it is
 *     the grand total of all the states and effects combined regardless of the
 *     number of states and effects on a battler. This is how it is in vanilla
 *     RPG Maker MZ and this is how we intend for it to be with the VisuStella
 *     MZ library.
 * *** This is NOT a bug!
 * *** The reason we are not changing this is because it does not properly
 *     relay information to the player accurately. When multiple popups appear,
 *     players only have roughly a second and a half to calculate it all for
 *     any form of information takeaway. We feel it is better suited for the
 *     player's overall convenience to show a cummulative change and steer the
 *     experience towards a more positive one.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.23: September 17, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * *** Skill Cost Types Plugin Parameters need to be updated for those who want
 *     the updated gauges. This can be done easily with the following steps:
 * **** Step 1: Create a new project.
 * **** Step 2: Install Skills and States Core version 1.23 into it.
 * **** Step 3: Copy the Plugin Parameter Settings for "Skill Cost Types".
 * **** Step 4: Return back to your original project.
 * **** Step 5: Paste Plugin Parameter Settings on top of "Skill Cost Types".
 * 
 * Version 1.22: August 6, 2021
 * * Documentation Update!
 * ** "Action End Removal for States" under Major Updates is changed to:
 * *** If your Plugin Parameter settings for "Action End Update" are enabled,
 *     then "Action End" has been updated so that it actually applies per
 *     action used instead of just being at the start of a battler's action
 *     set.
 * *** However, there are side effects to this: if a state has the "Cannot
 *     Move" restriction along with the "Action End" removal timing, then
 *     unsurprisingly, the state will never wear off because it's now based on
 *     actual actions ending. To offset this and remove confusion, "Action End"
 *     auto-removal timings for states with "Cannot Move" restrictions will be
 *     turned into "Turn End" auto-removal timings while the "Action End
 *     Update" is enabled.
 * *** This automatic change won't make it behave like an "Action End" removal
 *     timing would, but it's better than completely softlocking a battler.
 * * Feature Update!
 * ** Those using "Cannot Move" states with "Action End" auto-removal will now
 *    have be automatically converted into "Turn End" auto-removal if the
 *    plugin parameter "Action End Update" is set to true. Update by Irina.
 * 
 * Version 1.21: July 30, 2021
 * * Documentation Update!
 * ** Expanded "Action End Removal for States" section in Major Changes.
 * *** These changes have been in effect since Version 1.07 but have not been
 *     explained in excess detail in the documentation since.
 * **** Action End has been updated so that it actually applies per action used
 *      instead of just being at the start of a battler's action set. However,
 *      there are side effects to this: if a state has the "Cannot Move"
 *      restriction along with the "Action End" removal timing, then
 *      unsurprisingly, the state will never wear off because it's now based on
 *      actual actions ending. There are two solutions to this:
 * **** Don't make "Cannot Move" restriction states with "Action End". This is
 *      not a workaround. This is how the state removal is intended to work
 *      under the new change.
 * **** Go to the Skills & States Core Plugin Parameters, go to State
 *      Setttings, look for "Action End Update", and set it to false. You now
 *      reverted the removal timing system back to how it originally was in RPG
 *      Maker MZ's default battle system where it only updates based on an
 *      action set rather than per actual action ending.
 * 
 * Version 1.20: June 18, 2021
 * * Feature Update!
 * ** Updated automatic caching for conditional passive states to update more
 *    efficiently. Update made by Arisu.
 * 
 * Version 1.19: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.18: May 21, 2021
 * * Documentation Update
 * ** Added "Passive State Clarification" section.
 * *** As there is a lot of confusion regarding how passive states work and how
 *     people still miss the explanations found in the "Passive State Notetags"
 *     section AND the "Plugin Parameters: Passive State Settings", we are
 *     adding a third section to explain how they work.
 * *** All three sections will contain the full detailed explanation of how
 *     passive states work to clear common misconceptions about them.
 * 
 * Version 1.17: May 7, 2021
 * * Bug Fixes
 * ** State category removal is now usable outside of battle. Fix by Irina.
 * 
 * Version 1.16: April 30, 2021
 * * Bug Fixes!
 * ** When states with step removal have the <No Recover All Clear> or
 *    <No Death Clear> notetags, their step counter is no longer reset either.
 *    Fix made by Irina.
 * * New Features!
 * ** New notetag added by Arisu!
 * *** <List Name: name>
 * **** Makes the name of the skill appear different when show in the skill
 *      list. Using \V[x] as a part of the name will display that variable.
 * 
 * Version 1.15: March 19, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.14: March 12, 2021
 * * Bug Fixes!
 * ** Max HP Buff/Debuff should now display its turn counter. Fix by Yanfly.
 * * Documentation Update!
 * ** For the <JS Passive Condition>, we've added documentation on the
 *    limitations of passive conditions since they have been reported as bug
 *    reports, when in reality, they are failsafes to prevent infinite loops.
 *    Such limitations include the following:
 * *** A passive state that requires another passive state
 * *** A passive state that requires a trait effect from another state
 * *** A passive state that requires a parameter value altered by another state
 * *** A passive state that requires equipment to be worn but its equipment
 *     type access is provided by another state.
 * *** Anything else that is similar in style.
 * 
 * Version 1.13: February 26, 2021
 * * Documentation Update!
 * ** For <JS type Slip Damage> and <JS type Slip Heal> notetags, added the
 *    following notes:
 * *** When these states are applied via action effects, the slip calculations
 *     are one time calculations made upon applying and the damage is cached to
 *     be used for future on regeneration calculations.
 * *** For that reason, do not include game mechanics here such as adding
 *     states, buffs, debuffs, etc. as this notetag is meant for calculations
 *     only. Use the VisuStella Battle Core's <JS Pre-Regenerate> and
 *     <JS Post-Regenerate> notetags for game mechanics instead.
 * *** Passive states and states with the <JS Slip Refresh> notetag are exempt
 *     from the one time calculation and recalculated each regeneration phase.
 * * Feature Update!
 * ** Changed slip refresh requirements to entail <JS Slip Refresh> notetag for
 *    extra clarity. Update made by Olivia.
 * 
 * Version 1.12: February 19, 2021
 * * Feature Update
 * ** Changed the way passive state infinite stacking as a blanket coverage.
 *    Update made by Olivia.
 * 
 * Version 1.11: February 12, 2021
 * * Bug Fixes!
 * ** Added a check to prevent passive states from infinitely stacking. Fix
 *    made by Olivia.
 * 
 * Version 1.10: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Skill Settings > Background Type
 * 
 * Version 1.09: January 1, 2021
 * * Bug Fixes!
 * ** Custom JS TP slip damage and healing should now work properly.
 *    Fix made by Yanfly.
 * 
 * Version 1.08: December 25, 2020
 * * Bug Fixes!
 * ** <JS On Add State> should no longer trigger multiple times for the death
 *    state. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** <No Death Clear> can now allow the affected state to be added to an
 *    already dead battler. Update made by Yanfly.
 * 
 * Version 1.07: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Passive Condition Multiclass: id>
 * *** <Passive Condition Multiclass: id, id, id>
 * *** <Passive Condition Multiclass: name>
 * *** <Passive Condition Multiclass: name, name, name>
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > States > General > Action End Update
 * **** States with "Action End" auto-removal will also update turns at the end
 *      of each action instead of all actions.
 * ***** Turn this off if you wish for state turn updates to function like they
 *       do by default for "Action End".
 * 
 * Version 1.06: December 4, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.05: November 15, 2020
 * * Bug Fixes!
 * ** The alignment of the Skill Type Window is now fixed and will reflect upon
 *    the default settings. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** <State x Category Remove: All> notetag added by Yanfly.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: September 27, 2020
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.03: September 13, 2020
 * * Bug Fixes!
 * ** <JS type Slip Damage> custom notetags now work for passive states. Fix
 *    made by Olivia.
 * ** Setting the Command Window style to "Text Only" will no longer add in
 *    the icon text codes. Bug fixed by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** The JS Notetags for Add, Erase, and Expire states are now fixed. Fix made
 *    by Yanfly.
 * * Documentation Update!
 * ** <Show if learned Skill: x> and <Hide if learned Skill: x> notetags have
 *    the following added to their descriptions:
 * *** This does not apply to skills added by traits on actors, classes, any
 *     equipment, or states. These are not considered learned skills. They are
 *     considered temporary skills.
 * * New Features!
 * ** Notetags added by Yanfly:
 * *** <Show if has Skill: x>
 * *** <Show if have All Skills: x,x,x>
 * *** <Show if have Any Skills: x,x,x>
 * *** <Show if has Skill: name>
 * *** <Show if have All Skills: name, name, name>
 * *** <Show if have Any Skills: name, name, name>
 * *** <Hide if has Skill: x>
 * *** <Hide if have All Skills: x,x,x>
 * *** <Hide if have Any Skills: x,x,x>
 * *** <Hide if has Skill: name>
 * *** <Hide if have All Skills: name, name, name>
 * *** <Hide if have Any Skills: name, name, name>
 * *** These have been added to remove the confusion regarding learned skills
 *     as skills added through trait effects are not considered learned skills
 *     by RPG Maker MZ.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Passive states from Elements & Status Menu Core are now functional.
 *    Fix made by Olivia.
 * * Compatibility Update
 * ** Extended functions to allow for better compatibility.
 * * Updated documentation
 * ** Explains that passive states are not directly applied and are therefore
 *    not affected by code such as "a.isStateAffected(10)".
 * ** Instead, use "a.states().includes($dataStates[10])"
 * ** "Use #rrggbb for a hex color." lines now replaced with
 *    "For a hex color, use #rrggbb with VisuMZ_1_MessageCore"
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
 * @command SkillActorPaySkillCost
 * @text Skill Cost: Emulate Actor Pay
 * @desc Target actor(s) emulates paying for skill cost.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) will pay skill cost.
 * @default ["1"]
 *
 * @arg SkillID:num
 * @text Skill ID
 * @type skill
 * @desc What is the ID of the skill to emulate paying the skill cost for?
 * @default 99
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillEnemyPaySkillCost
 * @text Skill Cost: Emulate Enemy Pay
 * @desc Target enemy(s) emulates paying for skill cost.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) will pay skill cost.
 * @default ["1"]
 *
 * @arg SkillID:num
 * @text Skill ID
 * @type skill
 * @desc What is the ID of the skill to emulate paying the skill cost for?
 * @default 99
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_StateTurns
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsActorChangeBy
 * @text State Turns: Actor State Turns Change By
 * @desc Changes actor(s) state turns by an amount.
 * Only works on states that can have turns.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns By
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default +1
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if actor(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsActorChangeTo
 * @text State Turns: Actor State Turns Change To
 * @desc Changes actor(s) state turns to a specific value.
 * Only works on states that can have turns.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns To
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default 10
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if actor(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsEnemyChangeBy
 * @text State Turns: Enemy State Turns Change By
 * @desc Changes enemy(s) state turns by an amount.
 * Only works on states that can have turns.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns By
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default +1
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if enemy(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsEnemyChangeTo
 * @text State Turns: Enemy State Turns Change To
 * @desc Changes enemy(s) state turns to a specific value.
 * Only works on states that can have turns.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns To
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default 10
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if enemy(s) does not have it applied?
 * @default true
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
 * @param SkillsStatesCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Skills:struct
 * @text Skill Settings
 * @type struct<Skills>
 * @desc Adjust general skill settings here.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","SkillTypeWindow":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","ListWindow":"","ListWindowCols:num":"1","ShopStatusWindow":"","ShowShopStatus:eval":"true","SkillSceneAdjustSkillList:eval":"true","SkillMenuStatusRect:func":"\"const ww = this.shopStatusWidth();\\nconst wh = this._itemWindow.height;\\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\\nconst wy = this._itemWindow.y;\\nreturn new Rectangle(wx, wy, ww, wh);\"","SkillTypes":"","HiddenSkillTypes:arraynum":"[]","BattleHiddenSkillTypes:arraynum":"[]","IconStypeNorm:num":"78","IconStypeMagic:num":"79","CustomJS":"","SkillConditionJS:func":"\"// Declare Variables\\nconst skill = arguments[0];\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet enabled = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn enabled;\""}
 *
 * @param Costs:arraystruct
 * @text Skill Cost Types
 * @parent Skills:struct
 * @type struct<Cost>[]
 * @desc A list of all the skill cost types added by this plugin
 * and the code that controls them in-game.
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst label = TextManager.hpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst label = TextManager.mpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst label = TextManager.tpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Item Cost\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = {\\\\n    items: {},\\\\n    weapons: {},\\\\n    armors: {},\\\\n};\\\\n\\\\n// Gather Cost Notetags\\\\n{ // Item Costs\\\\n    const notetag = /<ITEM COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.items[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Weapon Costs\\\\n    const notetag = /<WEAPON COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.weapons[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Armor Costs\\\\n    const notetag = /<ARMOR COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.armors[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Declare Trait Objects\\\\nconst traitObjects = user.traitObjects();\\\\n\\\\n// Apply Cost Rate Modifiers\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Cost Rate Modifiers\\\\n        const notetag = /<ITEM COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id]) {\\\\n                    cost.items[entry.id] = Math.ceil(cost.items[entry.id] * rate);\\\\n                    if (cost.items[entry.id] <= 0) cost.items[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Cost Rate Modifiers\\\\n        const notetag = /<WEAPON COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id]) {\\\\n                    cost.weapons[entry.id] = Math.ceil(cost.weapons[entry.id] * rate);\\\\n                    if (cost.weapons[entry.id] <= 0) cost.weapons[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Cost Rate Modifiers\\\\n        const notetag = /<ARMOR COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id]) {\\\\n                    cost.armors[entry.id] = Math.ceil(cost.armors[entry.id] * rate);\\\\n                    if (cost.armors[entry.id] <= 0) cost.armors[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Apply Flat Cost Modifiers\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Flat Cost Modifiers\\\\n        const notetag = /<ITEM COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id]) {\\\\n                    cost.items[entry.id] += flat;\\\\n                    if (cost.items[entry.id] <= 0) cost.items[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Flat Cost Modifiers\\\\n        const notetag = /<WEAPON COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id]) {\\\\n                    cost.weapons[entry.id] += flat;\\\\n                    if (cost.weapons[entry.id] <= 0) cost.weapons[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Flat Cost Modifiers\\\\n        const notetag = /<ARMOR COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id]) {\\\\n                    cost.armors[entry.id] += flat;\\\\n                    if (cost.armors[entry.id] <= 0) cost.armors[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Set Cost Limits\\\\n{ // Item Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<ITEM COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id] !== undefined) {\\\\n                    cost.items[entry.id] = Math.min(max, cost.items[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<ITEM COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id] !== undefined) {\\\\n                    cost.items[entry.id] = Math.max(min, cost.items[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Weapon Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<WEAPON COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id] !== undefined) {\\\\n                    cost.weapons[entry.id] = Math.min(max, cost.weapons[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<WEAPON COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id] !== undefined) {\\\\n                    cost.weapons[entry.id] = Math.max(min, cost.weapons[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Armor Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<ARMOR COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id] !== undefined) {\\\\n                    cost.armors[entry.id] = Math.min(max, cost.armors[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<ARMOR COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id] !== undefined) {\\\\n                    cost.armors[entry.id] = Math.max(min, cost.armors[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Apply Replacement Costs\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Replacement Costs\\\\n        const notetag = /<REPLACE ITEM (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.items[entry1.id]) {\\\\n                    cost.items[entry2.id] = cost.items[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Replacement Costs\\\\n        const notetag = /<REPLACE WEAPON (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.weapons[entry1.id]) {\\\\n                    cost.weapons[entry2.id] = cost.weapons[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Replacement Costs\\\\n        const notetag = /<REPLACE ARMOR (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.armors[entry1.id]) {\\\\n                    cost.armors[entry2.id] = cost.armors[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Return cost data\\\\nreturn cost;\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Check Individual Costs\\\\n{ // Check Item Costs\\\\n    for (let id in cost.items) {\\\\n        const obj = $dataItems[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.items[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Weapon Costs\\\\n    for (let id in cost.weapons) {\\\\n        const obj = $dataWeapons[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.weapons[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Armor Costs\\\\n    for (let id in cost.armors) {\\\\n        const obj = $dataArmors[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.armors[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Return True\\\\nreturn true;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n{ // Check Item Costs\\\\n    for (let id in cost.items) {\\\\n        const obj = $dataItems[id];\\\\n        if (obj && obj.consumable) {\\\\n            if (obj.itypeId !== 2) {\\\\n                const costAmount = cost.items[id];\\\\n                $gameParty.loseItem(obj, costAmount);\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Weapon Costs\\\\n    for (let id in cost.weapons) {\\\\n        const obj = $dataWeapons[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.weapons[id];\\\\n            $gameParty.loseItem(obj, costAmount);\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Armor Costs\\\\n    for (let id in cost.armors) {\\\\n        const obj = $dataArmors[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.armors[id];\\\\n            $gameParty.loseItem(obj, costAmount);\\\\n        }\\\\n    }\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Check Keys\\\\nconst keys = ['items', 'weapons', 'armors'];\\\\n\\\\n// Return False\\\\nreturn keys.some(key => Object.keys(cost[key]).length > 0);\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nconst keys = ['items', 'weapons', 'armors'];\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\nfor (const key of keys) {\\\\n    const database = [$dataItems, $dataWeapons, $dataArmors][keys.indexOf(key)];\\\\n    const costData = cost[key];\\\\n    const idList = Object.keys(costData).sort((a, b) => a - b);\\\\n    for (const id of idList) {\\\\n        const obj = database[id];\\\\n        const iconIndex = obj.iconIndex;\\\\n        const costAmount = costData[id];\\\\n        text += '\\\\\\\\\\\\\\\\I[%1]×%2 '.format(iconIndex, costAmount);\\\\n    }\\\\n}\\\\n\\\\n// Return text\\\\nreturn text.trim();\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn 0;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn 0;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Don't Draw Anything\\\\n// This does not work as a gauge.\\\"\"}"]
 *
 * @param Gauge:struct
 * @text Gauge Settings
 * @parent Skills:struct
 * @type struct<Gauge>
 * @desc Settings in regards to how skill cost gauges function and appear.
 * @default {"Labels":"","LabelFontMainType:str":"main","MatchLabelColor:eval":"true","MatchLabelGaugeColor:num":"2","PresetLabelGaugeColor:num":"16","LabelOutlineSolid:eval":"true","LabelOutlineWidth:num":"3","Values":"","ValueFontMainType:str":"number","ValueOutlineSolid:eval":"true","ValueOutlineWidth:num":"3"}
 *
 * @param BreakSkills
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param States:struct
 * @text State Settings
 * @type struct<States>
 * @desc Adjust general state settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","ActionEndUpdate:eval":"true","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Buffs:struct
 * @text Buff/Debuff Settings
 * @parent States:struct
 * @type struct<Buffs>
 * @desc Adjust general buff/debuff settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Stacking":"","StackBuffMax:num":"2","StackDebuffMax:num":"2","MultiplierJS:func":"\"// Declare Variables\\nconst user = this;\\nconst paramId = arguments[0];\\nconst buffLevel = arguments[1];\\nlet rate = 1;\\n\\n// Perform Calculations\\nrate += buffLevel * 0.25;\\n\\n// Return Rate\\nreturn Math.max(0, rate);\"","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorBuff:str":"24","ColorDebuff:str":"27","Data":"","ShowData:eval":"false","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onAddDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param PassiveStates:struct
 * @text Passive States
 * @parent States:struct
 * @type struct<PassiveStates>
 * @desc Adjust passive state settings here.
 * @default {"List":"","Global:arraynum":"[]","Actor:arraynum":"[]","Enemy:arraynum":"[]","CustomJS":"","PassiveConditionJS:func":"\"// Declare Variables\\nconst state = arguments[0];\\nconst stateId = state.id;\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet condition = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn condition;\""}
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
 * General Skill Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Skills:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Skill Menu Layout provided by this plugin?
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
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent SkillTypeWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Skill Type Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent SkillTypeWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Skill Type Window.
 * @default left
 * 
 * @param CmdWidth:num
 * @text Window Width
 * @parent SkillTypeWindow
 * @type number
 * @min 1
 * @desc What is the desired pixel width of this window?
 * Default: 240
 * @default 240
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
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Skill Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Skill Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param SkillSceneAdjustSkillList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Skill List Window in the Skill Menu if using the Shop Status Window?
 * @default true
 *
 * @param SkillSceneStatusBgType:num
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
 * @param SkillMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Shop Status Window in the Skill Menu.
 * @default "const ww = this.shopStatusWidth();\nconst wh = this._itemWindow.height;\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\nconst wy = this._itemWindow.y;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param SkillTypes
 * @text Skill Types
 *
 * @param HiddenSkillTypes:arraynum
 * @text Hidden Skill Types
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden from view ingame.
 * @default []
 *
 * @param BattleHiddenSkillTypes:arraynum
 * @text Hidden During Battle
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden during battle only.
 * @default []
 *
 * @param IconStypeNorm:num
 * @text Icon: Normal Type
 * @parent SkillTypes
 * @desc Icon used for normal skill types that aren't assigned any icons.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Icon: Magic Type
 * @parent SkillTypes
 * @desc Icon used for magic skill types that aren't assigned any icons.
 * @default 79
 *
 * @param SortSkillTypesAbc:arraynum
 * @text Sort: Alphabetical
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of Skill Types you want sorted alphabetically.
 * @default []
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param SkillConditionJS:func
 * @text JS: Skill Conditions
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide skill condition check.
 * @default "// Declare Variables\nconst skill = arguments[0];\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet enabled = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn enabled;"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Cost Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param Name:str
 * @text Name
 * @desc A name for this Skill Cost Type.
 * @default Untitled
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for this Skill Cost Type.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display this cost.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display this cost.
 * @default 22
 *
 * @param Cost
 * @text Cost Processing
 *
 * @param CalcJS:func
 * @text JS: Cost Calculation
 * @parent Cost
 * @type note
 * @desc Code on how to calculate this resource cost for the skill.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nlet cost = 0;\n\n// Return cost value\nreturn Math.round(Math.max(0, cost));"
 *
 * @param CanPayJS:func
 * @text JS: Can Pay Cost?
 * @parent Cost
 * @type note
 * @desc Code on calculating whether or not the user is able to pay the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn true;"
 *
 * @param PayJS:func
 * @text JS: Paying Cost
 * @parent Cost
 * @type note
 * @desc Code for if met, this is the actual process of paying of the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Process Payment\n"
 *
 * @param Windows
 * @text Window Display
 *
 * @param ShowJS:func
 * @text JS: Show Cost?
 * @parent  Windows
 * @type note
 * @desc Code for determining if the cost is shown or not.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn cost > 0;"
 *
 * @param TextJS:func
 * @text JS: Cost Text
 * @parent  Windows
 * @type note
 * @desc Code to determine the text (with Text Code support) used for the displayed cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\nconst settings = arguments[2];\nconst fontSize = settings.FontSize;\nconst color = settings.FontColor;\nconst name = settings.Name;\nconst icon = settings.Icon;\nlet text = '';\n\n// Text: Change Font Size\ntext += '\\\\FS[%1]'.format(fontSize);\n\n// Text: Add Color\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\n    text += '\\\\HexColor<#%1>'.format(String(RegExp.$1));\n} else {\n    text += '\\\\C[%1]'.format(color);\n}\n\n// Text: Add Cost\ntext += '%1 %2'.format(cost, name);\n\n// Text: Add Icon\nif (icon  > 0) {\n    text += '\\\\I[%1]'.format(icon);\n}\n\n// Return text\nreturn text;"
 *
 * @param Gauges
 * @text Gauge Display
 *
 * @param GaugeMaxJS:func
 * @text JS: Maximum Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the maximum value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeCurrentJS:func
 * @text JS: Current Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the current value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeDrawJS:func
 * @text JS: Draw Gauge
 * @parent  Gauges
 * @type note
 * @desc Code to determine how to draw the Skill Cost resource for this gauge type.
 * @default "// Declare Variables\nconst sprite = this;\nconst settings = sprite._costSettings;\nconst bitmap = sprite.bitmap;\nconst user = sprite._battler;\nconst currentValue = sprite.currentDisplayedValue();\n\n// Draw Gauge\nconst color1 = ColorManager.textColor(30);\nconst color2 = ColorManager.textColor(31);\nconst gx = 0;\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\nconst gw = sprite.bitmapWidth() - gx;\nconst gh = sprite.gaugeHeight();\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\n\n// Draw Label\nconst label = settings.Name;\nconst lx = 4;\nconst ly = 0;\nconst lw = sprite.bitmapWidth();\nconst lh = sprite.bitmapHeight();\nsprite.setupLabelFont();\nbitmap.paintOpacity = 255;\nbitmap.drawText(label, lx, ly, lw, lh, \"left\");\n\n// Draw Value\nconst vw = sprite.bitmapWidth() - 2;\nconst vh = sprite.bitmapHeight();\nsprite.setupValueFont();\nbitmap.textColor = ColorManager.normalColor();\nbitmap.drawText(currentValue, 0, 0, vw, vh, \"right\");"
 *
 */
/* ----------------------------------------------------------------------------
 * Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gauge:
 *
 * @param Labels
 *
 * @param LabelFontMainType:str
 * @text Font Type
 * @parent Labels
 * @type select
 * @option main
 * @option number
 * @desc Which font type should be used for labels?
 * @default main
 *
 * @param MatchLabelColor:eval
 * @text Match Label Color
 * @parent Labels
 * @type boolean
 * @on Match
 * @off Preset
 * @desc Match the label color to the Gauge Color being used?
 * @default true
 *
 * @param MatchLabelGaugeColor:num
 * @text Match: Gauge # ?
 * @parent MatchLabelColor:eval
 * @type number
 * @min 1
 * @max 2
 * @desc Which Gauge Color should be matched?
 * @default 2
 *
 * @param PresetLabelGaugeColor:num
 * @text Preset: Gauge Color
 * @parent MatchLabelColor:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param LabelOutlineSolid:eval
 * @text Solid Outline
 * @parent Labels
 * @type boolean
 * @on Solid
 * @off Semi-Transparent
 * @desc Make the label outline a solid black color?
 * @default true
 *
 * @param LabelOutlineWidth:num
 * @text Outline Width
 * @parent Labels
 * @type number
 * @min 0
 * @desc What width do you wish to use for your outline?
 * Use 0 to not use an outline.
 * @default 3
 *
 * @param Values
 *
 * @param ValueFontMainType:str
 * @text Font Type
 * @parent Values
 * @type select
 * @option main
 * @option number
 * @desc Which font type should be used for values?
 * @default number
 *
 * @param ValueOutlineSolid:eval
 * @text Solid Outline
 * @parent Values
 * @type boolean
 * @on Solid
 * @off Semi-Transparent
 * @desc Make the value outline a solid black color?
 * @default true
 *
 * @param ValueOutlineWidth:num
 * @text Outline Width
 * @parent Values
 * @type number
 * @min 0
 * @desc What width do you wish to use for your outline?
 * Use 0 to not use an outline.
 * @default 3
 *
 */
/* ----------------------------------------------------------------------------
 * General State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: State doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying states.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let states go up to.
 * This can be changed with the <Max Turns: x> notetag.
 * @default 9999
 *
 * @param ActionEndUpdate:eval
 * @text Action End Update
 * @parent General
 * @type boolean
 * @on Update Each Action
 * @off Don't Change
 * @desc Refer to "Major Changes" in Help File for explanation.
 * @default true
 *
 * @param TurnEndOnMap:num
 * @text Turn End on Map
 * @parent General
 * @type number
 * @desc Update any state and buff turns on the map after
 * this many steps. Use 0 to disable.
 * @default 20
 *
 * @param Turns
 * @text Turn Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param ColorNeutral:str
 * @text Turn Color: Neutral
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorPositive:str
 * @text Turn Color: Positive
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorNegative:str
 * @text Turn Color: Negative
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Data Display
 *
 * @param ShowData:eval
 * @text Show Data?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state data on top of window icons and sprites?
 * @default true
 *
 * @param DataFontSize:num
 * @text Data Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying state data.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the state data display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the state data display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddStateJS:func
 * @text JS: On Add State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is added.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseStateJS:func
 * @text JS: On Erase State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is erased.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireStateJS:func
 * @text JS: On Expire State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state has expired.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * General Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Buffs:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: Buff/Debuff doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying buffs/debuffs.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let buffs and debuffs go up to.
 * @default 9999
 *
 * @param Stacking
 *
 * @param StackBuffMax:num
 * @text Max Stacks: Buff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for buffs.
 * @default 2
 *
 * @param StackDebuffMax:num
 * @text Max Stacks: Debuff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for debuffs.
 * @default 2
 *
 * @param MultiplierJS:func
 * @text JS: Buff/Debuff Rate
 * @parent Stacking
 * @type note
 * @desc Code to determine how much buffs and debuffs affect parameters.
 * @default "// Declare Variables\nconst user = this;\nconst paramId = arguments[0];\nconst buffLevel = arguments[1];\nlet rate = 1;\n\n// Perform Calculations\nrate += buffLevel * 0.25;\n\n// Return Rate\nreturn Math.max(0, rate);"
 *
 * @param Turns
 * @text Turns Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param ColorBuff:str
 * @text Turn Color: Buffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorDebuff:str
 * @text Turn Color: Debuffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Rate Display
 *
 * @param ShowData:eval
 * @text Show Rate?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff rate on top of window icons and sprites?
 * @default false
 *
 * @param DataFontSize:num
 * @text Rate Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying rate.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the rate display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the rate display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddBuffJS:func
 * @text JS: On Add Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onAddDebuffJS:func
 * @text JS: On Add Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseBuffJS:func
 * @text JS: On Erase Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseDebuffJS:func
 * @text JS: On Erase Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireBuffJS:func
 * @text JS: On Expire Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireDebuffJS:func
 * @text JS: On Expire Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Passive State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PassiveStates:
 *
 * @param List
 *
 * @param Global:arraynum
 * @text Global Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors and enemies.
 * @default []
 *
 * @param Actor:arraynum
 * @text Actor-Only Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors only.
 * @default []
 *
 * @param Enemy:arraynum
 * @text Enemy Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect enemies only.
 * @default []
 *
 * @param Cache
 *
 * @param RefreshCacheSwitch:eval
 * @text Switch Refresh?
 * @parent Cache
 * @type boolean
 * @on Refresh
 * @off No Changes
 * @desc Refresh all battle members when switches are changed in battle?
 * @default false
 *
 * @param RefreshCacheVar:eval
 * @text Variable Refresh?
 * @parent Cache
 * @type boolean
 * @on Refresh
 * @off No Changes
 * @desc Refresh all battle members when variables are changed in battle?
 * @default false
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param PassiveConditionJS:func
 * @text JS: Condition Check
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide passive condition check.
 * @default "// Declare Variables\nconst state = arguments[0];\nconst stateId = state.id;\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet condition = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn condition;"
 *
 */
//=============================================================================

const _0x4e163d=_0x15cc;(function(_0x3a0c4d,_0x177bab){const _0x1ca4b4=_0x15cc,_0x2c135b=_0x3a0c4d();while(!![]){try{const _0x2dfb9c=parseInt(_0x1ca4b4(0x1fb))/0x1*(parseInt(_0x1ca4b4(0x239))/0x2)+-parseInt(_0x1ca4b4(0x36c))/0x3*(-parseInt(_0x1ca4b4(0x211))/0x4)+-parseInt(_0x1ca4b4(0x315))/0x5+parseInt(_0x1ca4b4(0x336))/0x6*(parseInt(_0x1ca4b4(0x282))/0x7)+-parseInt(_0x1ca4b4(0x14a))/0x8*(-parseInt(_0x1ca4b4(0x1a4))/0x9)+parseInt(_0x1ca4b4(0x3ec))/0xa+parseInt(_0x1ca4b4(0x17b))/0xb*(-parseInt(_0x1ca4b4(0x3ad))/0xc);if(_0x2dfb9c===_0x177bab)break;else _0x2c135b['push'](_0x2c135b['shift']());}catch(_0x1e3534){_0x2c135b['push'](_0x2c135b['shift']());}}}(_0xf386,0x8e031));function _0x15cc(_0x453c81,_0x386f79){const _0xf38670=_0xf386();return _0x15cc=function(_0x15ccf3,_0x2d3020){_0x15ccf3=_0x15ccf3-0x136;let _0x3bdc1a=_0xf38670[_0x15ccf3];return _0x3bdc1a;},_0x15cc(_0x453c81,_0x386f79);}function _0xf386(){const _0x1de68a=['prototype','menuActor','normalColor','onEraseBuff','_turnDisplaySprite','height','innerHeight','endAction','mpDamage','bypassRemoveStatesByDamage','addNewState','Skill-%1-%2','allSwitchOff','canUse','getStateRetainType','ParseSkillChangessIntoData','maxItems','Window_SkillList_makeItemList','buffTurns','active','StateTurnsActorChangeTo','ARRAYEVAL','addPassiveStatesByNotetag','forgetSkill','changePaintOpacity','isStateRestrict','getSkillChangesFromState','exit','ConvertParams','createKeyJS','addChild','HiddenSkillTypes','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','test','shopStatusWindowRectSkillsStatesCore','Settings','labelFontSize','regenerateAll','name','drawIcon','ShowTurns','drawActorBuffTurns','GaugeMaxJS','<enemy-%1>','addState','8307KaVzgo','%1\x20%2\x20%3','Game_BattlerBase_skillMpCost','max','_battler','onExpireDebuffJS','calcWindowHeight','Gauge','ParseStateNotetags','isBuffOrDebuffAffected','trim','ValueOutlineWidth','right','drawItem','clearStateDisplay','ValueFontMainType','_checkingVisuMzPassiveStateObjects','initMembers','target','setup','_itemWindow','DataFontSize','Game_BattlerBase_resetStateCounts','icon','equipBattleSkills','_stateOrigin','getStateReapplyRulings','passiveStates','SkillSceneAdjustSkillList','_stypeId','Armor-%1-%2','getClassIdWithName','Sprite_Gauge_currentValue','CalcJS','_states','\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20','_bypassRemoveStateDamage_value','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_costSettings','STRUCT','recoverAll','isPlaytest','totalStateCategory','onEraseStateCustomJS','updateCommandNameWindow','isDead','Weapon-%1-%2','_checkingTraitsSetSkillsStatesCore','ARRAYFUNC','gaugeBackColor','executeHpDamage','helpWindowRectSkillsStatesCore','stateMpSlipHealJS','Sprite_StateIcon_loadBitmap','redrawSkillsStatesCore','maxCols','mpCost','BattleHiddenSkillTypes','colSpacing','Window_SkillList_drawItem','onEraseDebuff','_stateDisplay','applySkillsStatesCoreEffects','Parse_Notetags_State_SlipEffectJS','isSkillHidden','12UqjwcY','floor','labelOutlineWidth','allSwitchOn','onAddDebuffGlobalJS','ignore','onRemoveState','drawFullGauge','_skillChangesFromState','iconIndex','_checkingPassiveStates','isUseSkillsStatesCoreUpdatedLayout','VisuMZ_0_CoreEngine','deadMembers','refresh','Game_BattlerBase_addNewState','meetsPassiveStateConditionJS','hasSkill','makeResistedStateCategories','_stored_buffColor','ValueOutlineSolid','testApply','LUK','iconHeight','testSkillStatesCoreNotetags','parse','Game_Action_executeHpDamage_bypassStateDmgRemoval','autoRemovalTiming','getCurrentTroopUniqueID','Parse_Notetags_State_Category','GaugeCurrentJS','addStateTurns','MatchLabelColor','chanceByDamage','getAuraPassiveStatesFromObj','isStateRemoved','applyDebuffTurnManipulationEffects','Actor','\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','anySwitchOff','TurnFontSize','addPassiveStates','adjustItemWidthByShopStatus','call','ANY','user','AGI','isPartyAllAffectedByGroupDefeatStates','refreshAllMembers','MAXHP','stateData','replace','currentMaxValue','loadBitmap','hasStateCategory','indexOf','setBuffTurns','drawActorIcons','_stateSteps','LabelOutlineSolid','allowCreateShopStatusWindow','_cache_CheckBypassRemoveStatesByDamage','ShowShopStatus','7063860KVpTXx','commandStyleCheck','isAlive','currentClass','Game_BattlerBase_refresh','onAddBuffGlobalJS','ParseAllNotetags','clearStateRetainType','clearAllStateOrigins','boxWidth','getStateOrigin','onExpireStateCustomJS','multiClass','debuffColor','_buffs','makeAdditionalSkillCostText','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','ARRAYJSON','labelColor','meetsPassiveStateConditionClasses','onRegenerateCustomStateDamageOverTime','number','canClearState','isLearnedSkill','Window_StatusBase_placeGauge','textColor','GroupDigits','makeItemList','onAddDebuff','checkCacheKey','isBuffAffected','stateMpSlipDamageJS','changeTextColor','_tempBattler','SkillSceneStatusBgType','EnemyIndex','meetsPassiveStateGlobalConditionJS','_bypassRemoveStateDamage_action','ATK','PayJS','drawText','iconWidth','valueOutlineColor','isBuffExpired','removeStatesByDamage','onExpireDebuffGlobalJS','checkSkillConditionsSwitchNotetags','totalStateCategoryAffected','buffColor','13480yrZcnp','maxSlipDamage','Sprite_Gauge_currentMaxValue','drawActorBuffRates','traitsSet','stateHpSlipDamageJS','_stateData','isStateExpired','gaugeLineHeight','_commandNameWindow','checkShowHideJS','addPassiveStatesFromOtherPlugins','eraseBuff','isMaxDebuffAffected','gaugeRate','Game_Switches_onChange','getAuraPassiveStateIDs','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','multiclasses','usableSkills','#%1','aliveMembers','StateID','addPassiveStatesByPluginParameters','canSortSkillTypeList','groupDefeat','Sprite_Gauge_setup','concat','bitmap','uiMenuStyle','buffLength','outlineColor','NEGATIVE','addCommand','Window_SkillStatus_refresh','equipPassives','Enemy','SortByIDandPriority','resetStateCounts','ShowData','changeOutlineColor','onExpireBuffGlobalJS','meetsPassiveStateConditionSwitches','applyItemUserEffect','buttonAssistText1','rgba(0,\x200,\x200,\x201)','MatchLabelGaugeColor','recover\x20all','description','5768741wxSdfL','return\x200','Parse_Notetags_State_ApplyRemoveLeaveJS','_stateRetainType','CheckVisibleSwitchNotetags','_currentActor','itemWindowRect','createTurnDisplaySprite','prepareResetStateCounts','Game_Action_applyItemUserEffect','fontSize','StateTurnsEnemyChangeTo','gradientFillRect','stateHpSlipHealJS','currentMaxValueSkillsStatesCore','_bypassRemoveStateDamage_user','getPassiveStateConditionClassesData','randomInt','gainMp','note','drawSkillCost','onAddStateCustomJS','standardIconHeight','statusWindowRectSkillsStatesCore','Game_Action_testApply','drawTextEx','increaseBuff','CmdTextAlign','commandNameWindowDrawText','passiveStateObjects','skillMpCost','RefreshCacheVar','center','Game_Unit_isAllDead','Name','onExpireStateJS','createItemWindow','onEraseDebuffGlobalJS','Game_BattlerBase_isStateResist','process_VisuMZ_SkillsStatesCore_Skill_Notetags','applyStateCategoryRemovalEffects','1593uKFEVe','helpWindowRect','_cache','placeExactGauge','inBattle','isSkillCostShown','heal','meetsSkillConditionsEnableJS','ColorDebuff','die','LayoutStyle','Game_BattlerBase_meetsSkillConditions','removeStatesByCategoryAll','SkillsStatesCore','AURA_SYSTEM_ENABLED','isStateAddable','friendsUnit','onAddStateJS','addAuraPassiveStateIDs','skillTypeWindowRect','_skillTypeWindow','isUseModernControls','state','stepsForTurn','stateMaximumTurns','textSizeEx','learnSkill','setPassiveStateSlipDamageJS','drawActorIconsAllTurnCounters','eraseState','Scene_Skill_createItemWindow','recalculateSlipDamageJS','LabelFontMainType','Scene_Skill_helpWindowRect','LabelOutlineWidth','changeSkillsThroughStateEffects','_stateTurns','Game_BattlerBase_overwriteBuffTurns','VisuMZ_1_ItemsEquipsCore','<actor-%1>','isDebuffAffected','split','Game_Actor_skillTypes','fontBold','_scene','stateExpireJS','anySwitchOn','_passiveStateResults','applyBuffTurnManipulationEffects','shift','StackBuffMax','ARRAYSTRUCT','Game_BattlerBase_traitsSet','MeetsAuraNoteConditions','commandName','_cache_getPassiveStateConditionClassesData','_classIDs','onExpireBuff','traitObjects','numberFontFace','members','setStypeId','CoreEngine','skillCostSeparator','_hidden','VisuMZ_2_ClassChangeSystem','getCurrentStateActiveUser','skills','updatedLayoutStyle','setDebuffTurns','getStateDisplay','States','commandStyle','<member-%1>','checkShowHideNotetags','splice','getSkillTypes','width','_data','localeCompare','createCommandNameWindow','iconText','onChange','isTargetBypassRemoveStatesByDamage','getPassiveStatesFromObj','remove','FUNC','53CFKhWm','onEraseBuffGlobalJS','getStateOriginByKey','_endingBattle','uiHelpPosition','clearStatesWithStateRetain','_shopStatusWindow','Window_SkillList_updateHelp','Game_BattlerBase_skillTpCost','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','stateTurns','paySkillCost','ActionEndUpdate','rgba(0,\x200,\x200,\x200)','CheckIncompatibleStates','stateColor','onExpireState','SkillID','commandNameWindowCenter','buttonAssistSwitch','CheckVisibleSkillNotetags','paramBuffRate','52ZFGDIn','MAT','resetTextColor','constructor','_statusWindow','updateTurnDisplaySprite','getStateData','setStatusWindow','skill','updateStatesActionEnd','IconStypeNorm','getPassiveStateConditionSwitchData','setStateTurns','_cache_getAuraPassiveStatesFromObj','IconStypeMagic','opponentsUnit','Game_Unit_deadMembers','Game_Battler_addState','auraStateIDs','sort','PassiveStates','onEraseStateGlobalJS','item','clamp','removeState','meetsSkillConditions','stateAddJS','lineHeight','_cache_getPassiveStateConditionSwitchData','Game_BattlerBase_states','currentValueSkillsStatesCore','Game_Battler_isStateAddable','Game_BattlerBase_decreaseBuff','meetsStateCondition','redraw','_colorCache','VisuMZ_1_MainMenuCore','isActor','enemy','buff','5878VZzEjU','itemWindowRectSkillsStatesCore','Game_BattlerBase_die','_stateIDs','mainFontSize','Game_BattlerBase_clearStates','gainSilentTp','Class-%1-%2','setupSkillsStatesCore','isAllDead','contents','Game_BattlerBase_initMembers','text','clear','Game_Battler_regenerateAll','isBuffPrevented','onExpireDebuff','JSON','PresetLabelGaugeColor','Skills','ReapplyRules','isRightInputMode','Parse_Notetags_Skill_Sorting','setStateOrigin','setActor','isAppeared','match','Game_Actor_forgetSkill','Parse_Notetags_Skill_JS','deathStateId','value','categories','_buffTurns','includesSkillsStatesCore','Parse_Notetags_State_PassiveJS','createPassiveStatesCache','regenerateAllSkillsStatesCore','itemAt','skillVisibleJS','damage','convertPassiveStates','untitled','overwriteBuffTurns','_categoryWindow','addPassiveStatesTraitSets','_actor','createAllSkillCostText','Window_SkillList_setActor','CmdStyle','Global','process_VisuMZ_SkillsStatesCore_CheckForAuras','toLowerCase','scrollTo','_result','itemLineRect','stateTpSlipHealJS','innerWidth','onAddDebuffJS','retrieveStateColor','commandNameWindowDrawBackground','shopStatusWidth','miasmaStateIDs','getCurrentStateOriginKey','Scene_Boot_onDatabaseLoaded','BattleManager_endAction','shopStatusWindowRect','initMembersSkillsStatesCore','Game_BattlerBase_eraseState','onExpireBuffJS','makeCommandName','isSkillUsableForAutoBattle','index','Game_Actor_learnSkill','377419AFgrOg','Window_StatusBase_drawActorIcons','maxTurns','process_VisuMZ_SkillsStatesCore_Notetags','addDebuffTurns','slipHp','valueOutlineWidth','SkillActorPaySkillCost','MDF','success','meetsPassiveStateConditions','_lastStatesActionEndFrameCount','add','onAddState','registerCommand','addBuff','getColor','log','opacity','slipMp','ParseClassIDs','allBattleMembers','Parse_Notetags_Skill_Cost','onBattleEnd','Game_Player_refresh','getSkillIdWithName','toUpperCase','Window_SkillList_includes','format','placeGauge','drawActorStateData','State-%1-%2','action','stateTpSlipDamageJS','none','process_VisuMZ_SkillsStatesCore_State_Notetags','MeetsAuraObjConditions','isStateCategoryAffected','MaxTurns','removeStatesByCategory','Sprite_Gauge_initMembers','createSkillCostText','Window_SkillType_initialize','makeCurrentTroopUniqueID','onDatabaseLoaded','buffIconIndex','states','helpAreaTop','Sprite_Gauge_gaugeRate','standardIconWidth','statePassiveConditionJS','Buffs','RefreshCacheSwitch','Turns','callUpdateHelp','anchor','onAddStateMakeCustomSlipValues','onEraseBuffJS','isStateAffected','ListWindowCols','Costs','getStateIdWithName','isStateResist','length','convertTargetToStateOriginKey','greater','TurnOffsetX','skillLearn','frameCount','mainCommandWidth','Game_Battler_addBuff','Window_SkillList_maxCols','Game_Variables_onChange','stateCategoriesResisted','actorId','onExpireStateGlobalJS','mainAreaTop','Scene_Skill_itemWindowRect','hpDamage','map','adjustSkillCost','enemyId','ShowJS','updateFrame','EVAL','isSkillTypeMatchForUse','valueFontSize','clearStateOrigin','addWindow','makeCommandList','DEF','sortSkillList','hasState','TurnOffsetY','Scene_Skill_skillTypeWindowRect','windowPadding','getColorDataFromPluginParameters','debuffTurns','PassiveConditionJS','createShopStatusWindow','_cache_getPassiveStatesFromObj','setStateRetainType','decreaseBuff','valueFontFace','SortSkillTypesAbc','addDebuff','currentValue','removeBuff','GaugeDrawJS','mainFontFace','death','DataOffsetX','CheckBypassRemoveStatesByDamage','MeetsAuraStateConditions','_stypeIDs','slipTp','version','_skillIDs','makeSuccess','_stateMaxTurns','onAddStateGlobalJS','stateId','drawExtendedSkillsStatesCoreStatus','ColorBuff','gaugeColor1','SkillEnemyPaySkillCost','Game_Troop_setup','_subject','removeBuffsAuto','MAXMP','clearStates','setBackgroundType','_currentTroopUniqueID','Param','SkillConditionJS','ParseSkillNotetags','convertGaugeTypeSkillsStatesCore','MultiplierJS','ARRAYNUM','checkSkillTypeMatch','removeOtherStatesOfSameCategory','includes','checkSkillConditionsNotetags','actor','isUserBypassRemoveStatesByDamage','meetsSkillConditionsGlobalJS','drawParamText','721000YpeWic','alterSkillName','statesByCategory','VisuMZ_1_ElementStatusCore','push','clearStateData','drawActorStateTurns','sortPriority','removeStatesAuto','CmdWidth','statusWindowRect','_tempActor','CheckVisibleBattleNotetags','getStypeIdWithName','resetFontSettings','canChangeSkillsThroughStateEffects','Sprite_StateIcon_updateFrame','filter','skillTypes','_skills','DisplayedParams','allIcons','isPassiveStateStackable','initialize','AutoAddState','skillTpCost','DataOffsetY','onAddBuff','isSceneBattle','updateHelp','reset','gainHp','priority','6uYkXix','skillEnableJS','equips','applyStateTurnManipulationEffects','Scene_Skill_statusWindowRect','keys','setItem','itemTextAlign','isGroupDefeatStateAffected'];_0xf386=function(){return _0x1de68a;};return _0xf386();}var label='SkillsStatesCore',tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x28b71e){const _0x43c617=_0x15cc;return _0x28b71e['status']&&_0x28b71e[_0x43c617(0x17a)][_0x43c617(0x30f)]('['+label+']');})[0x0];VisuMZ[label][_0x4e163d(0x362)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x4e163d(0x35b)]=function(_0x27f553,_0x359644){const _0x9fac2e=_0x4e163d;for(const _0x5613fb in _0x359644){if(_0x5613fb[_0x9fac2e(0x253)](/(.*):(.*)/i)){const _0x21e30b=String(RegExp['$1']),_0x2a5d87=String(RegExp['$2'])['toUpperCase']()[_0x9fac2e(0x376)]();let _0x4043cb,_0x23c28a,_0xebe754;switch(_0x2a5d87){case'NUM':_0x4043cb=_0x359644[_0x5613fb]!==''?Number(_0x359644[_0x5613fb]):0x0;break;case _0x9fac2e(0x30c):_0x23c28a=_0x359644[_0x5613fb]!==''?JSON[_0x9fac2e(0x3c6)](_0x359644[_0x5613fb]):[],_0x4043cb=_0x23c28a[_0x9fac2e(0x2d1)](_0x220f9d=>Number(_0x220f9d));break;case _0x9fac2e(0x2d6):_0x4043cb=_0x359644[_0x5613fb]!==''?eval(_0x359644[_0x5613fb]):null;break;case _0x9fac2e(0x354):_0x23c28a=_0x359644[_0x5613fb]!==''?JSON['parse'](_0x359644[_0x5613fb]):[],_0x4043cb=_0x23c28a[_0x9fac2e(0x2d1)](_0x58a5df=>eval(_0x58a5df));break;case _0x9fac2e(0x24a):_0x4043cb=_0x359644[_0x5613fb]!==''?JSON[_0x9fac2e(0x3c6)](_0x359644[_0x5613fb]):'';break;case _0x9fac2e(0x3fd):_0x23c28a=_0x359644[_0x5613fb]!==''?JSON[_0x9fac2e(0x3c6)](_0x359644[_0x5613fb]):[],_0x4043cb=_0x23c28a[_0x9fac2e(0x2d1)](_0x417cfb=>JSON[_0x9fac2e(0x3c6)](_0x417cfb));break;case _0x9fac2e(0x1fa):_0x4043cb=_0x359644[_0x5613fb]!==''?new Function(JSON['parse'](_0x359644[_0x5613fb])):new Function(_0x9fac2e(0x17c));break;case _0x9fac2e(0x39c):_0x23c28a=_0x359644[_0x5613fb]!==''?JSON[_0x9fac2e(0x3c6)](_0x359644[_0x5613fb]):[],_0x4043cb=_0x23c28a[_0x9fac2e(0x2d1)](_0x539b71=>new Function(JSON[_0x9fac2e(0x3c6)](_0x539b71)));break;case'STR':_0x4043cb=_0x359644[_0x5613fb]!==''?String(_0x359644[_0x5613fb]):'';break;case'ARRAYSTR':_0x23c28a=_0x359644[_0x5613fb]!==''?JSON[_0x9fac2e(0x3c6)](_0x359644[_0x5613fb]):[],_0x4043cb=_0x23c28a[_0x9fac2e(0x2d1)](_0xd48f71=>String(_0xd48f71));break;case _0x9fac2e(0x393):_0xebe754=_0x359644[_0x5613fb]!==''?JSON[_0x9fac2e(0x3c6)](_0x359644[_0x5613fb]):{},_0x27f553[_0x21e30b]={},VisuMZ[_0x9fac2e(0x35b)](_0x27f553[_0x21e30b],_0xebe754);continue;case _0x9fac2e(0x1d7):_0x23c28a=_0x359644[_0x5613fb]!==''?JSON[_0x9fac2e(0x3c6)](_0x359644[_0x5613fb]):[],_0x4043cb=_0x23c28a[_0x9fac2e(0x2d1)](_0x3e3575=>VisuMZ[_0x9fac2e(0x35b)]({},JSON['parse'](_0x3e3575)));break;default:continue;}_0x27f553[_0x21e30b]=_0x4043cb;}}return _0x27f553;},(_0x3d324a=>{const _0x4ab1e9=_0x4e163d,_0x33e915=_0x3d324a['name'];for(const _0x269fcf of dependencies){if(!Imported[_0x269fcf]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x4ab1e9(0x29e)](_0x33e915,_0x269fcf)),SceneManager['exit']();break;}}const _0x569fff=_0x3d324a[_0x4ab1e9(0x17a)];if(_0x569fff['match'](/\[Version[ ](.*?)\]/i)){const _0x26d574=Number(RegExp['$1']);_0x26d574!==VisuMZ[label][_0x4ab1e9(0x2f6)]&&(alert(_0x4ab1e9(0x391)['format'](_0x33e915,_0x26d574)),SceneManager[_0x4ab1e9(0x35a)]());}if(_0x569fff['match'](/\[Tier[ ](\d+)\]/i)){const _0x247c99=Number(RegExp['$1']);_0x247c99<tier?(alert(_0x4ab1e9(0x15b)[_0x4ab1e9(0x29e)](_0x33e915,_0x247c99,tier)),SceneManager[_0x4ab1e9(0x35a)]()):tier=Math[_0x4ab1e9(0x36f)](_0x247c99,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x4ab1e9(0x362)],_0x3d324a['parameters']);})(pluginData),PluginManager[_0x4e163d(0x290)](pluginData[_0x4e163d(0x365)],_0x4e163d(0x289),_0x576acf=>{const _0x44e98b=_0x4e163d;VisuMZ['ConvertParams'](_0x576acf,_0x576acf);const _0x3907b2=_0x576acf['ActorIDs']||[],_0x196b12=Number(_0x576acf[_0x44e98b(0x20c)]),_0x11061d=$dataSkills[_0x196b12];if(!_0x11061d)return;for(const _0x4613d2 of _0x3907b2){const _0x5e1b9c=$gameActors['actor'](_0x4613d2);if(!_0x5e1b9c)continue;_0x5e1b9c[_0x44e98b(0x206)](_0x11061d);}}),PluginManager['registerCommand'](pluginData[_0x4e163d(0x365)],_0x4e163d(0x2ff),_0x362d67=>{const _0x507db8=_0x4e163d;VisuMZ[_0x507db8(0x35b)](_0x362d67,_0x362d67);const _0xa323e3=_0x362d67[_0x507db8(0x13c)]||[],_0x398fa4=Number(_0x362d67['SkillID']),_0x3e95b2=$dataSkills[_0x398fa4];if(!_0x3e95b2)return;for(const _0x33ec0d of _0xa323e3){const _0x21a4b4=$gameTroop[_0x507db8(0x1e0)]()[_0x33ec0d];if(!_0x21a4b4)continue;_0x21a4b4[_0x507db8(0x206)](_0x3e95b2);}}),PluginManager[_0x4e163d(0x290)](pluginData['name'],'StateTurnsActorChangeBy',_0x20b123=>{const _0x96286=_0x4e163d;VisuMZ['ConvertParams'](_0x20b123,_0x20b123);const _0x3ba803=_0x20b123['ActorIDs']||[],_0x956389=Number(_0x20b123['StateID']),_0xfc6fa5=Number(_0x20b123[_0x96286(0x2b7)]),_0x5029c1=_0x20b123[_0x96286(0x32d)];for(const _0x14a7d5 of _0x3ba803){const _0x52c062=$gameActors['actor'](_0x14a7d5);if(!_0x52c062)continue;_0x5029c1&&!_0x52c062[_0x96286(0x2bc)](_0x956389)?(_0x52c062['addState'](_0x956389),_0x52c062[_0x96286(0x21d)](_0x956389,_0xfc6fa5)):_0x52c062[_0x96286(0x3cc)](_0x956389,_0xfc6fa5);}}),PluginManager[_0x4e163d(0x290)](pluginData[_0x4e163d(0x365)],_0x4e163d(0x353),_0x2b4e45=>{const _0x1b237e=_0x4e163d;VisuMZ[_0x1b237e(0x35b)](_0x2b4e45,_0x2b4e45);const _0x51bf22=_0x2b4e45['ActorIDs']||[],_0x4bb471=Number(_0x2b4e45[_0x1b237e(0x160)]),_0x4984e8=Math[_0x1b237e(0x36f)](Number(_0x2b4e45[_0x1b237e(0x2b7)]),0x0),_0x2af103=_0x2b4e45['AutoAddState'];for(const _0x21a07f of _0x51bf22){const _0x7a5801=$gameActors['actor'](_0x21a07f);if(!_0x7a5801)continue;_0x2af103&&!_0x7a5801[_0x1b237e(0x2bc)](_0x4bb471)&&_0x7a5801[_0x1b237e(0x36b)](_0x4bb471),_0x7a5801[_0x1b237e(0x21d)](_0x4bb471,_0x4984e8);}}),PluginManager['registerCommand'](pluginData['name'],'StateTurnsEnemyChangeBy',_0x2a655f=>{const _0x48ea59=_0x4e163d;if(!$gameParty['inBattle']())return;VisuMZ[_0x48ea59(0x35b)](_0x2a655f,_0x2a655f);const _0x32e96b=_0x2a655f['EnemyIndex']||[],_0x57c8fa=Number(_0x2a655f[_0x48ea59(0x160)]),_0x59f000=Number(_0x2a655f[_0x48ea59(0x2b7)]),_0x31d1e9=_0x2a655f[_0x48ea59(0x32d)];for(const _0x5cfa23 of _0x32e96b){const _0x2941e5=$gameTroop[_0x48ea59(0x1e0)]()[_0x5cfa23];if(!_0x2941e5)continue;_0x31d1e9&&!_0x2941e5[_0x48ea59(0x2bc)](_0x57c8fa)?(_0x2941e5[_0x48ea59(0x36b)](_0x57c8fa),_0x2941e5['setStateTurns'](_0x57c8fa,_0x59f000)):_0x2941e5[_0x48ea59(0x3cc)](_0x57c8fa,_0x59f000);}}),PluginManager[_0x4e163d(0x290)](pluginData['name'],_0x4e163d(0x186),_0x96cd5f=>{const _0x2bb5d5=_0x4e163d;if(!$gameParty[_0x2bb5d5(0x1a8)]())return;VisuMZ[_0x2bb5d5(0x35b)](_0x96cd5f,_0x96cd5f);const _0x483419=_0x96cd5f[_0x2bb5d5(0x13c)]||[],_0x533d3e=Number(_0x96cd5f[_0x2bb5d5(0x160)]),_0x37dd5c=Math['max'](Number(_0x96cd5f[_0x2bb5d5(0x2b7)]),0x0),_0x2bfdf8=_0x96cd5f[_0x2bb5d5(0x32d)];for(const _0x1dcfa2 of _0x483419){const _0x1a5281=$gameTroop[_0x2bb5d5(0x1e0)]()[_0x1dcfa2];if(!_0x1a5281)continue;_0x2bfdf8&&!_0x1a5281[_0x2bb5d5(0x2bc)](_0x533d3e)&&_0x1a5281[_0x2bb5d5(0x36b)](_0x533d3e),_0x1a5281[_0x2bb5d5(0x21d)](_0x533d3e,_0x37dd5c);}}),VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x278)]=Scene_Boot[_0x4e163d(0x33f)][_0x4e163d(0x2ae)],Scene_Boot[_0x4e163d(0x33f)]['onDatabaseLoaded']=function(){const _0x1fc6e4=_0x4e163d;VisuMZ[_0x1fc6e4(0x1b1)][_0x1fc6e4(0x278)][_0x1fc6e4(0x3d8)](this),this[_0x1fc6e4(0x285)](),VisuMZ[_0x1fc6e4(0x1b1)][_0x1fc6e4(0x209)]();},Scene_Boot[_0x4e163d(0x33f)]['process_VisuMZ_SkillsStatesCore_Notetags']=function(){const _0x46b320=_0x4e163d;this[_0x46b320(0x26b)]();if(VisuMZ[_0x46b320(0x3f2)])return;this['process_VisuMZ_SkillsStatesCore_Skill_Notetags'](),this[_0x46b320(0x2a5)]();},Scene_Boot[_0x4e163d(0x33f)][_0x4e163d(0x1a2)]=function(){const _0x2a5dd5=_0x4e163d;for(const _0x1dfaeb of $dataSkills){if(!_0x1dfaeb)continue;VisuMZ[_0x2a5dd5(0x1b1)][_0x2a5dd5(0x298)](_0x1dfaeb),VisuMZ[_0x2a5dd5(0x1b1)][_0x2a5dd5(0x24f)](_0x1dfaeb),VisuMZ[_0x2a5dd5(0x1b1)][_0x2a5dd5(0x255)](_0x1dfaeb);}},Scene_Boot[_0x4e163d(0x33f)][_0x4e163d(0x2a5)]=function(){const _0x240ca7=_0x4e163d;for(const _0x2b2de3 of $dataStates){if(!_0x2b2de3)continue;VisuMZ[_0x240ca7(0x1b1)]['Parse_Notetags_State_Category'](_0x2b2de3),VisuMZ['SkillsStatesCore'][_0x240ca7(0x25b)](_0x2b2de3),VisuMZ[_0x240ca7(0x1b1)]['Parse_Notetags_State_SlipEffectJS'](_0x2b2de3),VisuMZ[_0x240ca7(0x1b1)]['Parse_Notetags_State_ApplyRemoveLeaveJS'](_0x2b2de3);}},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x309)]=VisuMZ[_0x4e163d(0x309)],VisuMZ[_0x4e163d(0x309)]=function(_0x4bba8a){const _0x381f19=_0x4e163d;VisuMZ[_0x381f19(0x1b1)]['ParseSkillNotetags'][_0x381f19(0x3d8)](this,_0x4bba8a),VisuMZ['SkillsStatesCore'][_0x381f19(0x298)](_0x4bba8a),VisuMZ[_0x381f19(0x1b1)][_0x381f19(0x24f)](_0x4bba8a),VisuMZ[_0x381f19(0x1b1)][_0x381f19(0x255)](_0x4bba8a);},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x374)]=VisuMZ['ParseStateNotetags'],VisuMZ[_0x4e163d(0x374)]=function(_0x198367){const _0x1053f7=_0x4e163d;VisuMZ[_0x1053f7(0x1b1)][_0x1053f7(0x374)]['call'](this,_0x198367),VisuMZ[_0x1053f7(0x1b1)][_0x1053f7(0x3ca)](_0x198367),VisuMZ[_0x1053f7(0x1b1)]['Parse_Notetags_State_PassiveJS'](_0x198367),VisuMZ['SkillsStatesCore']['Parse_Notetags_State_SlipEffectJS'](_0x198367),VisuMZ[_0x1053f7(0x1b1)][_0x1053f7(0x17d)](_0x198367);},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x298)]=function(_0x12b0b9){const _0x502927=_0x4e163d,_0x39f799=_0x12b0b9[_0x502927(0x18e)];_0x39f799[_0x502927(0x253)](/<MP COST:[ ](\d+)>/i)&&(_0x12b0b9[_0x502927(0x3a4)]=Number(RegExp['$1'])),_0x39f799[_0x502927(0x253)](/<TP COST:[ ](\d+)>/i)&&(_0x12b0b9['tpCost']=Number(RegExp['$1']));},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x24f)]=function(_0x5e1811){const _0x405fe8=_0x4e163d;if(!_0x5e1811)return;_0x5e1811['sortPriority']=0x32;const _0x402e00=_0x5e1811[_0x405fe8(0x18e)]||'';_0x402e00[_0x405fe8(0x253)](/<(?:|ID )SORT(?:|ING)[ ]PRIORITY:[ ](\d+)>/i)&&(_0x5e1811['sortPriority']=Number(RegExp['$1']));},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x337)]={},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x25f)]={},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x255)]=function(_0x48fe91){const _0x67b190=_0x4e163d,_0x11b318=_0x48fe91[_0x67b190(0x18e)];if(_0x11b318[_0x67b190(0x253)](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0x22401e=String(RegExp['$1']),_0x1d7b20=_0x67b190(0x3fc)[_0x67b190(0x29e)](_0x22401e);VisuMZ['SkillsStatesCore'][_0x67b190(0x337)][_0x48fe91['id']]=new Function(_0x67b190(0x219),_0x1d7b20);}if(_0x11b318[_0x67b190(0x253)](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){const _0x51eb14=String(RegExp['$1']),_0x52ab07=_0x67b190(0x35f)[_0x67b190(0x29e)](_0x51eb14);VisuMZ[_0x67b190(0x1b1)][_0x67b190(0x25f)][_0x48fe91['id']]=new Function(_0x67b190(0x219),_0x52ab07);}},VisuMZ['SkillsStatesCore'][_0x4e163d(0x3ca)]=function(_0x46e729){const _0x362c71=_0x4e163d;_0x46e729['categories']=['ALL',_0x362c71(0x3d9)];const _0x55b7ca=_0x46e729['note'],_0x1ce3ac=_0x55b7ca[_0x362c71(0x253)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x1ce3ac)for(const _0x5106ee of _0x1ce3ac){_0x5106ee[_0x362c71(0x253)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x1d37cf=String(RegExp['$1'])['toUpperCase']()['trim']()[_0x362c71(0x1cd)](',');for(const _0x479e4a of _0x1d37cf){_0x46e729[_0x362c71(0x258)][_0x362c71(0x319)](_0x479e4a[_0x362c71(0x376)]());}}if(_0x55b7ca[_0x362c71(0x253)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0xae5eb9=RegExp['$1']['split'](/[\r\n]+/);for(const _0x337bc7 of _0xae5eb9){_0x46e729[_0x362c71(0x258)][_0x362c71(0x319)](_0x337bc7[_0x362c71(0x29c)]()['trim']());}}_0x55b7ca['match'](/<POSITIVE STATE>/i)&&_0x46e729['categories'][_0x362c71(0x319)]('POSITIVE'),_0x55b7ca[_0x362c71(0x253)](/<NEGATIVE STATE>/i)&&_0x46e729[_0x362c71(0x258)][_0x362c71(0x319)](_0x362c71(0x16a));},VisuMZ['SkillsStatesCore'][_0x4e163d(0x2b4)]={},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x25b)]=function(_0x1b8ea3){const _0x2f1c38=_0x4e163d,_0x4b3769=_0x1b8ea3[_0x2f1c38(0x18e)];if(_0x4b3769[_0x2f1c38(0x253)](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0x35c7a8=String(RegExp['$1']),_0x3170b7=_0x2f1c38(0x204)[_0x2f1c38(0x29e)](_0x35c7a8);VisuMZ[_0x2f1c38(0x1b1)][_0x2f1c38(0x2b4)][_0x1b8ea3['id']]=new Function(_0x2f1c38(0x1ba),_0x3170b7);}},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x14f)]={},VisuMZ['SkillsStatesCore'][_0x4e163d(0x188)]={},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x138)]={},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x3a0)]={},VisuMZ[_0x4e163d(0x1b1)]['stateTpSlipDamageJS']={},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x270)]={},VisuMZ['SkillsStatesCore'][_0x4e163d(0x3ab)]=function(_0x1d2a4b){const _0x20e3ca=_0x4e163d,_0x262bb7=_0x1d2a4b['note'],_0x2d8afe=_0x20e3ca(0x38f);if(_0x262bb7['match'](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){const _0x156a5f=String(RegExp['$1']),_0x5df75b=_0x2d8afe[_0x20e3ca(0x29e)](_0x156a5f,_0x20e3ca(0x260),-0x1,_0x20e3ca(0x287));VisuMZ[_0x20e3ca(0x1b1)]['stateHpSlipDamageJS'][_0x1d2a4b['id']]=new Function(_0x20e3ca(0x2fb),_0x5df75b);}else{if(_0x262bb7[_0x20e3ca(0x253)](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){const _0x45accf=String(RegExp['$1']),_0x23dfaf=_0x2d8afe['format'](_0x45accf,_0x20e3ca(0x1aa),0x1,_0x20e3ca(0x287));VisuMZ[_0x20e3ca(0x1b1)][_0x20e3ca(0x188)][_0x1d2a4b['id']]=new Function('stateId',_0x23dfaf);}}if(_0x262bb7['match'](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){const _0x398124=String(RegExp['$1']),_0x49b013=_0x2d8afe[_0x20e3ca(0x29e)](_0x398124,_0x20e3ca(0x260),-0x1,_0x20e3ca(0x295));VisuMZ[_0x20e3ca(0x1b1)][_0x20e3ca(0x138)][_0x1d2a4b['id']]=new Function(_0x20e3ca(0x2fb),_0x49b013);}else{if(_0x262bb7[_0x20e3ca(0x253)](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){const _0x450a0=String(RegExp['$1']),_0x403234=_0x2d8afe[_0x20e3ca(0x29e)](_0x450a0,_0x20e3ca(0x1aa),0x1,'slipMp');VisuMZ[_0x20e3ca(0x1b1)][_0x20e3ca(0x3a0)][_0x1d2a4b['id']]=new Function('stateId',_0x403234);}}if(_0x262bb7['match'](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){const _0x1d3658=String(RegExp['$1']),_0x280a38=_0x2d8afe[_0x20e3ca(0x29e)](_0x1d3658,'damage',-0x1,_0x20e3ca(0x2f5));VisuMZ[_0x20e3ca(0x1b1)]['stateTpSlipDamageJS'][_0x1d2a4b['id']]=new Function(_0x20e3ca(0x2fb),_0x280a38);}else{if(_0x262bb7['match'](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){const _0x57961b=String(RegExp['$1']),_0x257c58=_0x2d8afe[_0x20e3ca(0x29e)](_0x57961b,_0x20e3ca(0x1aa),0x1,_0x20e3ca(0x2f5));VisuMZ['SkillsStatesCore']['stateTpSlipHealJS'][_0x1d2a4b['id']]=new Function(_0x20e3ca(0x2fb),_0x257c58);}}},VisuMZ['SkillsStatesCore'][_0x4e163d(0x22b)]={},VisuMZ[_0x4e163d(0x1b1)]['stateEraseJS']={},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x1d1)]={},VisuMZ['SkillsStatesCore'][_0x4e163d(0x17d)]=function(_0x2ae8f1){const _0x326b9=_0x4e163d,_0x57df95=_0x2ae8f1[_0x326b9(0x18e)],_0x1e4429=_0x326b9(0x3d3);if(_0x57df95[_0x326b9(0x253)](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){const _0x58c05e=String(RegExp['$1']),_0x54d9c6=_0x1e4429[_0x326b9(0x29e)](_0x58c05e);VisuMZ[_0x326b9(0x1b1)]['stateAddJS'][_0x2ae8f1['id']]=new Function(_0x326b9(0x2fb),_0x54d9c6);}if(_0x57df95[_0x326b9(0x253)](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){const _0x4ac754=String(RegExp['$1']),_0x3eeab9=_0x1e4429[_0x326b9(0x29e)](_0x4ac754);VisuMZ['SkillsStatesCore']['stateEraseJS'][_0x2ae8f1['id']]=new Function('stateId',_0x3eeab9);}if(_0x57df95[_0x326b9(0x253)](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){const _0x3ccb90=String(RegExp['$1']),_0x39f5de=_0x1e4429[_0x326b9(0x29e)](_0x3ccb90);VisuMZ[_0x326b9(0x1b1)][_0x326b9(0x1d1)][_0x2ae8f1['id']]=new Function(_0x326b9(0x2fb),_0x39f5de);}},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x209)]=function(){const _0x2f9b34=_0x4e163d;if(!VisuMZ['SkillsStatesCore'][_0x2f9b34(0x362)][_0x2f9b34(0x1eb)]['ActionEndUpdate'])return;for(const _0x14b314 of $dataStates){if(!_0x14b314)continue;_0x14b314['restriction']===0x4&&_0x14b314[_0x2f9b34(0x3c8)]===0x1&&(_0x14b314['autoRemovalTiming']=0x2);}},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x35c)]=function(_0x5c1d33,_0x515ee0){const _0x34a72a=_0x4e163d;if(VisuMZ[_0x34a72a(0x35c)])return VisuMZ['createKeyJS'](_0x5c1d33,_0x515ee0);let _0x248aa8='';if($dataActors['includes'](_0x5c1d33))_0x248aa8='Actor-%1-%2'[_0x34a72a(0x29e)](_0x5c1d33['id'],_0x515ee0);if($dataClasses['includes'](_0x5c1d33))_0x248aa8=_0x34a72a(0x240)[_0x34a72a(0x29e)](_0x5c1d33['id'],_0x515ee0);if($dataSkills[_0x34a72a(0x30f)](_0x5c1d33))_0x248aa8=_0x34a72a(0x34a)[_0x34a72a(0x29e)](_0x5c1d33['id'],_0x515ee0);if($dataItems[_0x34a72a(0x30f)](_0x5c1d33))_0x248aa8='Item-%1-%2'[_0x34a72a(0x29e)](_0x5c1d33['id'],_0x515ee0);if($dataWeapons[_0x34a72a(0x30f)](_0x5c1d33))_0x248aa8=_0x34a72a(0x39a)[_0x34a72a(0x29e)](_0x5c1d33['id'],_0x515ee0);if($dataArmors[_0x34a72a(0x30f)](_0x5c1d33))_0x248aa8=_0x34a72a(0x38a)['format'](_0x5c1d33['id'],_0x515ee0);if($dataEnemies[_0x34a72a(0x30f)](_0x5c1d33))_0x248aa8='Enemy-%1-%2'[_0x34a72a(0x29e)](_0x5c1d33['id'],_0x515ee0);if($dataStates[_0x34a72a(0x30f)](_0x5c1d33))_0x248aa8=_0x34a72a(0x2a1)[_0x34a72a(0x29e)](_0x5c1d33['id'],_0x515ee0);return _0x248aa8;},DataManager['getClassIdWithName']=function(_0x391223){const _0x53d102=_0x4e163d;_0x391223=_0x391223[_0x53d102(0x29c)]()[_0x53d102(0x376)](),this[_0x53d102(0x1dc)]=this[_0x53d102(0x1dc)]||{};if(this[_0x53d102(0x1dc)][_0x391223])return this[_0x53d102(0x1dc)][_0x391223];for(const _0x1733c5 of $dataClasses){if(!_0x1733c5)continue;let _0x5cbd39=_0x1733c5['name'];_0x5cbd39=_0x5cbd39[_0x53d102(0x3e0)](/\x1I\[(\d+)\]/gi,''),_0x5cbd39=_0x5cbd39[_0x53d102(0x3e0)](/\\I\[(\d+)\]/gi,''),this['_classIDs'][_0x5cbd39[_0x53d102(0x29c)]()[_0x53d102(0x376)]()]=_0x1733c5['id'];}return this['_classIDs'][_0x391223]||0x0;},DataManager['getSkillTypes']=function(_0x4cb7fd){const _0x2a1a61=_0x4e163d;this[_0x2a1a61(0x2f4)]=this[_0x2a1a61(0x2f4)]||{};if(this[_0x2a1a61(0x2f4)][_0x4cb7fd['id']])return this[_0x2a1a61(0x2f4)][_0x4cb7fd['id']];this[_0x2a1a61(0x2f4)][_0x4cb7fd['id']]=[_0x4cb7fd['stypeId']];if(_0x4cb7fd[_0x2a1a61(0x18e)][_0x2a1a61(0x253)](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x51855c=JSON[_0x2a1a61(0x3c6)]('['+RegExp['$1'][_0x2a1a61(0x253)](/\d+/g)+']');this[_0x2a1a61(0x2f4)][_0x4cb7fd['id']]=this[_0x2a1a61(0x2f4)][_0x4cb7fd['id']][_0x2a1a61(0x165)](_0x51855c);}else{if(_0x4cb7fd[_0x2a1a61(0x18e)][_0x2a1a61(0x253)](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0x41ca24=RegExp['$1']['split'](',');for(const _0x28e795 of _0x41ca24){const _0x138d0f=DataManager[_0x2a1a61(0x322)](_0x28e795);if(_0x138d0f)this['_stypeIDs'][_0x4cb7fd['id']][_0x2a1a61(0x319)](_0x138d0f);}}}return this[_0x2a1a61(0x2f4)][_0x4cb7fd['id']];},DataManager[_0x4e163d(0x322)]=function(_0x5b69a7){const _0x8e0ec7=_0x4e163d;_0x5b69a7=_0x5b69a7[_0x8e0ec7(0x29c)]()['trim'](),this['_stypeIDs']=this[_0x8e0ec7(0x2f4)]||{};if(this[_0x8e0ec7(0x2f4)][_0x5b69a7])return this[_0x8e0ec7(0x2f4)][_0x5b69a7];for(let _0x38778a=0x1;_0x38778a<0x64;_0x38778a++){if(!$dataSystem['skillTypes'][_0x38778a])continue;let _0x255ba1=$dataSystem[_0x8e0ec7(0x327)][_0x38778a]['toUpperCase']()[_0x8e0ec7(0x376)]();_0x255ba1=_0x255ba1[_0x8e0ec7(0x3e0)](/\x1I\[(\d+)\]/gi,''),_0x255ba1=_0x255ba1[_0x8e0ec7(0x3e0)](/\\I\[(\d+)\]/gi,''),this['_stypeIDs'][_0x255ba1]=_0x38778a;}return this[_0x8e0ec7(0x2f4)][_0x5b69a7]||0x0;},DataManager[_0x4e163d(0x29b)]=function(_0x40b22d){const _0xf2c38a=_0x4e163d;_0x40b22d=_0x40b22d[_0xf2c38a(0x29c)]()[_0xf2c38a(0x376)](),this['_skillIDs']=this[_0xf2c38a(0x2f7)]||{};if(this['_skillIDs'][_0x40b22d])return this[_0xf2c38a(0x2f7)][_0x40b22d];for(const _0x2a83a7 of $dataSkills){if(!_0x2a83a7)continue;this[_0xf2c38a(0x2f7)][_0x2a83a7[_0xf2c38a(0x365)]['toUpperCase']()[_0xf2c38a(0x376)]()]=_0x2a83a7['id'];}return this[_0xf2c38a(0x2f7)][_0x40b22d]||0x0;},DataManager[_0x4e163d(0x2bf)]=function(_0x2bbe42){const _0x3b68a8=_0x4e163d;_0x2bbe42=_0x2bbe42[_0x3b68a8(0x29c)]()[_0x3b68a8(0x376)](),this['_stateIDs']=this[_0x3b68a8(0x23c)]||{};if(this[_0x3b68a8(0x23c)][_0x2bbe42])return this['_stateIDs'][_0x2bbe42];for(const _0x373754 of $dataStates){if(!_0x373754)continue;this[_0x3b68a8(0x23c)][_0x373754[_0x3b68a8(0x365)][_0x3b68a8(0x29c)]()[_0x3b68a8(0x376)]()]=_0x373754['id'];}return this[_0x3b68a8(0x23c)][_0x2bbe42]||0x0;},DataManager['stateMaximumTurns']=function(_0x5a330d){const _0x341cdc=_0x4e163d;this['_stateMaxTurns']=this[_0x341cdc(0x2f9)]||{};if(this[_0x341cdc(0x2f9)][_0x5a330d])return this['_stateMaxTurns'][_0x5a330d];return $dataStates[_0x5a330d][_0x341cdc(0x18e)][_0x341cdc(0x253)](/<MAX TURNS:[ ](\d+)>/i)?this[_0x341cdc(0x2f9)][_0x5a330d]=Number(RegExp['$1']):this[_0x341cdc(0x2f9)][_0x5a330d]=VisuMZ[_0x341cdc(0x1b1)][_0x341cdc(0x362)][_0x341cdc(0x1eb)][_0x341cdc(0x2a8)],this[_0x341cdc(0x2f9)][_0x5a330d];},DataManager[_0x4e163d(0x359)]=function(_0x13a097){const _0x5d5adc=_0x4e163d;if(!_0x13a097)return{};this[_0x5d5adc(0x3b5)]=this[_0x5d5adc(0x3b5)]||{};if(this[_0x5d5adc(0x3b5)][_0x13a097['id']]!==undefined)return this['_skillChangesFromState'][_0x13a097['id']];const _0x3bd7c5=_0x13a097['note']||'',_0x4bd5e9={};{const _0x4f94d5=_0x3bd7c5[_0x5d5adc(0x253)](/<SKILL CHANGE(?:|S):[ ](.*)[ ]>>>[ ](.*)>/gi);if(_0x4f94d5)for(const _0x12ff94 of _0x4f94d5){_0x12ff94[_0x5d5adc(0x253)](/<SKILL CHANGE(?:|S):[ ](.*)[ ]>>>[ ](.*)>/gi);let _0x2d67ac=String(RegExp['$1']),_0x3c707f=String(RegExp['$2']);VisuMZ[_0x5d5adc(0x1b1)][_0x5d5adc(0x34e)](_0x4bd5e9,_0x2d67ac,_0x3c707f);}}if(_0x3bd7c5[_0x5d5adc(0x253)](/<SKILL CHANGE(?:|S)>\s*([\s\S]*)\s*<\/SKILL CHANGE(?:|S)>/i)){const _0x5f7710=String(RegExp['$1'])[_0x5d5adc(0x1cd)](/[\r\n]+/)[_0x5d5adc(0x1f9)]('');for(const _0x5a3e19 of _0x5f7710){if(_0x5a3e19[_0x5d5adc(0x253)](/(.*)[ ]>>>[ ](.*)/i)){let _0x266e41=String(RegExp['$1']),_0x1e79a2=String(RegExp['$2']);VisuMZ[_0x5d5adc(0x1b1)][_0x5d5adc(0x34e)](_0x4bd5e9,_0x266e41,_0x1e79a2);}}}return this[_0x5d5adc(0x3b5)][_0x13a097['id']]=_0x4bd5e9,this[_0x5d5adc(0x3b5)][_0x13a097['id']];},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x34e)]=function(_0x2db75f,_0x562195,_0x163e34){const _0x5d07f9=_0x4e163d;/^\d+$/[_0x5d07f9(0x360)](_0x562195)?_0x562195=Number(_0x562195):_0x562195=DataManager[_0x5d07f9(0x29b)](_0x562195),/^\d+$/[_0x5d07f9(0x360)](_0x163e34)?_0x163e34=Number(_0x163e34):_0x163e34=DataManager[_0x5d07f9(0x29b)](_0x163e34),_0x2db75f[_0x562195]=_0x163e34;},ColorManager[_0x4e163d(0x2e2)]=function(_0xd11cff,_0x3ff2d6){const _0x33b89b=_0x4e163d;return _0x3ff2d6=String(_0x3ff2d6),this[_0x33b89b(0x234)]=this[_0x33b89b(0x234)]||{},_0x3ff2d6[_0x33b89b(0x253)](/#(.*)/i)?this[_0x33b89b(0x234)][_0xd11cff]=_0x33b89b(0x15e)[_0x33b89b(0x29e)](String(RegExp['$1'])):this['_colorCache'][_0xd11cff]=this[_0x33b89b(0x405)](Number(_0x3ff2d6)),this[_0x33b89b(0x234)][_0xd11cff];},ColorManager[_0x4e163d(0x292)]=function(_0x4b1383){const _0x48b22f=_0x4e163d;return _0x4b1383=String(_0x4b1383),_0x4b1383[_0x48b22f(0x253)](/#(.*)/i)?_0x48b22f(0x15e)[_0x48b22f(0x29e)](String(RegExp['$1'])):this[_0x48b22f(0x405)](Number(_0x4b1383));},ColorManager[_0x4e163d(0x20a)]=function(_0x244756){const _0x8c076e=_0x4e163d;if(typeof _0x244756===_0x8c076e(0x401))_0x244756=$dataStates[_0x244756];const _0x9e9fbd='_stored_state-%1-color'[_0x8c076e(0x29e)](_0x244756['id']);this[_0x8c076e(0x234)]=this[_0x8c076e(0x234)]||{};if(this[_0x8c076e(0x234)][_0x9e9fbd])return this[_0x8c076e(0x234)][_0x9e9fbd];const _0x1fc606=this[_0x8c076e(0x273)](_0x244756);return this[_0x8c076e(0x2e2)](_0x9e9fbd,_0x1fc606);},ColorManager['retrieveStateColor']=function(_0x2ae060){const _0x204d35=_0x4e163d,_0x26b21c=_0x2ae060[_0x204d35(0x18e)];if(_0x26b21c['match'](/<TURN COLOR:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x26b21c[_0x204d35(0x253)](/<POSITIVE STATE>/i))return VisuMZ[_0x204d35(0x1b1)][_0x204d35(0x362)]['States']['ColorPositive'];else return _0x26b21c[_0x204d35(0x253)](/<NEGATIVE STATE>/i)?VisuMZ[_0x204d35(0x1b1)]['Settings']['States']['ColorNegative']:VisuMZ[_0x204d35(0x1b1)]['Settings'][_0x204d35(0x1eb)]['ColorNeutral'];}},ColorManager['buffColor']=function(){const _0x5a2ca8=_0x4e163d,_0x42de36=_0x5a2ca8(0x3c0);this['_colorCache']=this['_colorCache']||{};if(this['_colorCache'][_0x42de36])return this[_0x5a2ca8(0x234)][_0x42de36];const _0xa99f81=VisuMZ[_0x5a2ca8(0x1b1)][_0x5a2ca8(0x362)][_0x5a2ca8(0x2b5)][_0x5a2ca8(0x2fd)];return this[_0x5a2ca8(0x2e2)](_0x42de36,_0xa99f81);},ColorManager[_0x4e163d(0x3f9)]=function(){const _0x2b5965=_0x4e163d,_0x45f19e='_stored_debuffColor';this[_0x2b5965(0x234)]=this['_colorCache']||{};if(this[_0x2b5965(0x234)][_0x45f19e])return this[_0x2b5965(0x234)][_0x45f19e];const _0x51b726=VisuMZ[_0x2b5965(0x1b1)][_0x2b5965(0x362)][_0x2b5965(0x2b5)][_0x2b5965(0x1ac)];return this[_0x2b5965(0x2e2)](_0x45f19e,_0x51b726);},SceneManager[_0x4e163d(0x331)]=function(){const _0x302e3e=_0x4e163d;return this['_scene']&&this[_0x302e3e(0x1d0)]['constructor']===Scene_Battle;},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x279)]=BattleManager[_0x4e163d(0x346)],BattleManager[_0x4e163d(0x346)]=function(){const _0x105aad=_0x4e163d;this[_0x105aad(0x21a)](),VisuMZ['SkillsStatesCore'][_0x105aad(0x279)][_0x105aad(0x3d8)](this);},BattleManager['updateStatesActionEnd']=function(){const _0x26114b=_0x4e163d,_0x4c8237=VisuMZ[_0x26114b(0x1b1)][_0x26114b(0x362)][_0x26114b(0x1eb)];if(!_0x4c8237)return;if(_0x4c8237[_0x26114b(0x207)]===![])return;if(!this[_0x26114b(0x301)])return;this[_0x26114b(0x301)]['updateStatesActionEnd']();},Game_Battler[_0x4e163d(0x33f)]['updateStatesActionEnd']=function(){const _0x29d781=_0x4e163d;if(BattleManager['_phase']!==_0x29d781(0x2a2))return;if(this[_0x29d781(0x28d)]===Graphics[_0x29d781(0x2c6)])return;this[_0x29d781(0x28d)]=Graphics[_0x29d781(0x2c6)];for(const _0xe05231 of this['_states']){const _0x1f9591=$dataStates[_0xe05231];if(!_0x1f9591)continue;if(_0x1f9591[_0x29d781(0x3c8)]!==0x1)continue;this['_stateTurns'][_0xe05231]>0x0&&this['_stateTurns'][_0xe05231]--;}this[_0x29d781(0x31d)](0x1);},Game_BattlerBase[_0x4e163d(0x33f)]['updateStateTurns']=function(){const _0x3b94b6=_0x4e163d,_0x29ec68=VisuMZ[_0x3b94b6(0x1b1)]['Settings'][_0x3b94b6(0x1eb)];for(const _0x12c1b4 of this[_0x3b94b6(0x38e)]){const _0x2fe18a=$dataStates[_0x12c1b4];if(_0x29ec68&&_0x29ec68['ActionEndUpdate']!==![]){if(_0x2fe18a&&_0x2fe18a[_0x3b94b6(0x3c8)]===0x1)continue;}this['_stateTurns'][_0x12c1b4]>0x0&&this[_0x3b94b6(0x1c8)][_0x12c1b4]--;}},VisuMZ['SkillsStatesCore']['Game_Switches_onChange']=Game_Switches[_0x4e163d(0x33f)]['onChange'],Game_Switches[_0x4e163d(0x33f)]['onChange']=function(){const _0x2fde15=_0x4e163d;VisuMZ['SkillsStatesCore'][_0x2fde15(0x159)][_0x2fde15(0x3d8)](this);const _0x3d3a8d=VisuMZ[_0x2fde15(0x1b1)]['Settings']['PassiveStates'][_0x2fde15(0x2b6)]??!![];if(!_0x3d3a8d)return;if(SceneManager['isSceneBattle']())for(const _0x3a7f58 of BattleManager[_0x2fde15(0x297)]()){if(_0x3a7f58)_0x3a7f58['refresh']();}},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x2ca)]=Game_Variables[_0x4e163d(0x33f)][_0x4e163d(0x1f6)],Game_Variables[_0x4e163d(0x33f)][_0x4e163d(0x1f6)]=function(){const _0x563cfd=_0x4e163d;VisuMZ[_0x563cfd(0x1b1)][_0x563cfd(0x2ca)][_0x563cfd(0x3d8)](this);const _0x5f4297=VisuMZ[_0x563cfd(0x1b1)][_0x563cfd(0x362)][_0x563cfd(0x225)][_0x563cfd(0x19a)]??!![];if(!_0x5f4297)return;if(SceneManager[_0x563cfd(0x331)]())for(const _0x40403e of BattleManager[_0x563cfd(0x297)]()){if(_0x40403e)_0x40403e['refresh']();}},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x184)]=Game_Action[_0x4e163d(0x33f)][_0x4e163d(0x175)],Game_Action['prototype']['applyItemUserEffect']=function(_0xe882c){const _0x87be4c=_0x4e163d;VisuMZ[_0x87be4c(0x1b1)][_0x87be4c(0x184)]['call'](this,_0xe882c),this[_0x87be4c(0x3aa)](_0xe882c);},Game_Action['prototype'][_0x4e163d(0x3aa)]=function(_0x4efae8){const _0x500a0d=_0x4e163d;this[_0x500a0d(0x1a3)](_0x4efae8),this[_0x500a0d(0x339)](_0x4efae8),this[_0x500a0d(0x1d4)](_0x4efae8),this[_0x500a0d(0x3d1)](_0x4efae8);},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x193)]=Game_Action[_0x4e163d(0x33f)][_0x4e163d(0x3c2)],Game_Action[_0x4e163d(0x33f)]['testApply']=function(_0x5b1c8e){const _0x3b5f64=_0x4e163d;if(this[_0x3b5f64(0x3c5)](_0x5b1c8e))return!![];return VisuMZ['SkillsStatesCore'][_0x3b5f64(0x193)][_0x3b5f64(0x3d8)](this,_0x5b1c8e);},Game_Action['prototype'][_0x4e163d(0x3c5)]=function(_0x547956){const _0x57f44a=_0x4e163d;if(!this[_0x57f44a(0x227)]())return;const _0x8fc452=this[_0x57f44a(0x227)]()[_0x57f44a(0x18e)];if(_0x8fc452['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](.*)>/i)){const _0x130aa9=String(RegExp['$1']);if(_0x547956[_0x57f44a(0x2a7)](_0x130aa9))return!![];}if(_0x8fc452[_0x57f44a(0x253)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](.*)>/i)){const _0x48fb85=Number(RegExp['$1']);if(_0x547956[_0x57f44a(0x2bc)](_0x48fb85))return!![];}else{if(_0x8fc452['match'](/<SET STATE[ ](.*)[ ]TURNS:[ ](.*)>/i)){const _0x212e0f=DataManager['getStateIdWithName'](RegExp['$1']);if(_0x547956['isStateAffected'](_0x212e0f))return!![];}}return![];},Game_Action[_0x4e163d(0x33f)][_0x4e163d(0x1a3)]=function(_0x266e35){const _0x183562=_0x4e163d;if(_0x266e35[_0x183562(0x2b0)]()[_0x183562(0x2c1)]<=0x0)return;const _0x215c70=this[_0x183562(0x227)]()[_0x183562(0x18e)];{const _0x4ca5c6=_0x215c70[_0x183562(0x253)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/gi);if(_0x4ca5c6)for(const _0x419c16 of _0x4ca5c6){_0x419c16[_0x183562(0x253)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i);const _0xed3c07=String(RegExp['$1']);_0x266e35['removeStatesByCategoryAll'](_0xed3c07);}}{const _0x9c785b=_0x215c70[_0x183562(0x253)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x9c785b)for(const _0x37ffb4 of _0x9c785b){_0x37ffb4[_0x183562(0x253)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0xd81ec4=String(RegExp['$1']),_0x4a04d7=Number(RegExp['$2']);_0x266e35[_0x183562(0x2a9)](_0xd81ec4,_0x4a04d7);}}},Game_Action[_0x4e163d(0x33f)][_0x4e163d(0x339)]=function(_0x5baf32){const _0x1b4804=_0x4e163d,_0x28540b=this['item']()[_0x1b4804(0x18e)],_0x3aeda1=_0x28540b[_0x1b4804(0x253)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0x3aeda1)for(const _0x2c9e3f of _0x3aeda1){let _0x103bf8=0x0,_0x55408b=0x0;if(_0x2c9e3f[_0x1b4804(0x253)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x103bf8=Number(RegExp['$1']),_0x55408b=Number(RegExp['$2']);else _0x2c9e3f[_0x1b4804(0x253)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x103bf8=DataManager['getStateIdWithName'](RegExp['$1']),_0x55408b=Number(RegExp['$2']));_0x5baf32[_0x1b4804(0x21d)](_0x103bf8,_0x55408b),this[_0x1b4804(0x2f8)](_0x5baf32);}const _0xd84bf8=_0x28540b[_0x1b4804(0x253)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0xd84bf8)for(const _0x51e6a1 of _0xd84bf8){let _0x283a47=0x0,_0x29839e=0x0;if(_0x51e6a1[_0x1b4804(0x253)](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x283a47=Number(RegExp['$1']),_0x29839e=Number(RegExp['$2']);else _0x51e6a1[_0x1b4804(0x253)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x283a47=DataManager[_0x1b4804(0x2bf)](RegExp['$1']),_0x29839e=Number(RegExp['$2']));_0x5baf32[_0x1b4804(0x3cc)](_0x283a47,_0x29839e),this[_0x1b4804(0x2f8)](_0x5baf32);}},Game_Action[_0x4e163d(0x33f)]['applyBuffTurnManipulationEffects']=function(_0x4cd486){const _0x2bd87c=_0x4e163d,_0x286e1e=[_0x2bd87c(0x3de),_0x2bd87c(0x303),_0x2bd87c(0x13f),_0x2bd87c(0x2dc),_0x2bd87c(0x212),'MDF',_0x2bd87c(0x3db),_0x2bd87c(0x3c3)],_0x54c1c6=this[_0x2bd87c(0x227)]()[_0x2bd87c(0x18e)],_0x2ab341=_0x54c1c6['match'](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0x2ab341)for(const _0x2939ee of _0x2ab341){_0x2939ee[_0x2bd87c(0x253)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x4ca0fa=_0x286e1e[_0x2bd87c(0x3e4)](String(RegExp['$1'])[_0x2bd87c(0x29c)]()),_0x1b0d16=Number(RegExp['$2']);_0x4ca0fa>=0x0&&(_0x4cd486[_0x2bd87c(0x3e5)](_0x4ca0fa,_0x1b0d16),this[_0x2bd87c(0x2f8)](_0x4cd486));}const _0x104e5b=_0x54c1c6[_0x2bd87c(0x253)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x104e5b)for(const _0x4e1d5f of _0x2ab341){_0x4e1d5f['match'](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x234738=_0x286e1e[_0x2bd87c(0x3e4)](String(RegExp['$1'])[_0x2bd87c(0x29c)]()),_0x31fbcb=Number(RegExp['$2']);_0x234738>=0x0&&(_0x4cd486['addBuffTurns'](_0x234738,_0x31fbcb),this[_0x2bd87c(0x2f8)](_0x4cd486));}},Game_Action[_0x4e163d(0x33f)][_0x4e163d(0x3d1)]=function(_0x6271e1){const _0x4f1c8f=_0x4e163d,_0x562a33=[_0x4f1c8f(0x3de),_0x4f1c8f(0x303),_0x4f1c8f(0x13f),_0x4f1c8f(0x2dc),_0x4f1c8f(0x212),_0x4f1c8f(0x28a),_0x4f1c8f(0x3db),'LUK'],_0x5dee34=this[_0x4f1c8f(0x227)]()[_0x4f1c8f(0x18e)],_0x2dd2c8=_0x5dee34[_0x4f1c8f(0x253)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x2dd2c8)for(const _0x5e2fec of _0x2dd2c8){_0x5e2fec['match'](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x4fb834=_0x562a33[_0x4f1c8f(0x3e4)](String(RegExp['$1'])['toUpperCase']()),_0x16ca92=Number(RegExp['$2']);_0x4fb834>=0x0&&(_0x6271e1[_0x4f1c8f(0x1e9)](_0x4fb834,_0x16ca92),this[_0x4f1c8f(0x2f8)](_0x6271e1));}const _0xba4bdc=_0x5dee34['match'](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0xba4bdc)for(const _0x41110f of _0x2dd2c8){_0x41110f['match'](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x39a492=_0x562a33['indexOf'](String(RegExp['$1'])[_0x4f1c8f(0x29c)]()),_0x4ff87e=Number(RegExp['$2']);_0x39a492>=0x0&&(_0x6271e1[_0x4f1c8f(0x286)](_0x39a492,_0x4ff87e),this[_0x4f1c8f(0x2f8)](_0x6271e1));}},VisuMZ['SkillsStatesCore'][_0x4e163d(0x244)]=Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x37d)],Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x37d)]=function(){const _0x3f2d18=_0x4e163d;this[_0x3f2d18(0x1a6)]={},this[_0x3f2d18(0x27b)](),VisuMZ[_0x3f2d18(0x1b1)]['Game_BattlerBase_initMembers'][_0x3f2d18(0x3d8)](this);},Game_BattlerBase['prototype'][_0x4e163d(0x27b)]=function(){const _0x433b10=_0x4e163d;this[_0x433b10(0x17e)]='',this[_0x433b10(0x150)]={},this['_stateDisplay']={},this[_0x433b10(0x385)]={};},Game_BattlerBase[_0x4e163d(0x33f)]['checkCacheKey']=function(_0x3ef109){const _0x32e618=_0x4e163d;return this[_0x32e618(0x1a6)]=this['_cache']||{},this[_0x32e618(0x1a6)][_0x3ef109]!==undefined;},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x3f0)]=Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x3bb)],Game_BattlerBase['prototype'][_0x4e163d(0x3bb)]=function(){const _0x4a2643=_0x4e163d;this[_0x4a2643(0x1a6)]={},VisuMZ[_0x4a2643(0x1b1)][_0x4a2643(0x3f0)][_0x4a2643(0x3d8)](this);},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x27c)]=Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x1c1)],Game_BattlerBase['prototype'][_0x4e163d(0x1c1)]=function(_0x38e3b1){const _0x5af91a=_0x4e163d;let _0x89023e=this[_0x5af91a(0x2bc)](_0x38e3b1);VisuMZ[_0x5af91a(0x1b1)][_0x5af91a(0x27c)][_0x5af91a(0x3d8)](this,_0x38e3b1);if(_0x89023e&&!this[_0x5af91a(0x2bc)](_0x38e3b1))this[_0x5af91a(0x3b3)](_0x38e3b1);},Game_BattlerBase[_0x4e163d(0x33f)]['onRemoveState']=function(_0x4301b7){const _0x299e85=_0x4e163d;this['clearStateData'](_0x4301b7),this[_0x299e85(0x37a)](_0x4301b7);},VisuMZ[_0x4e163d(0x1b1)]['Game_Battler_onBattleEnd']=Game_Battler['prototype'][_0x4e163d(0x299)],Game_Battler[_0x4e163d(0x33f)][_0x4e163d(0x299)]=function(){const _0x317abc=_0x4e163d;VisuMZ[_0x317abc(0x1b1)]['Game_Battler_onBattleEnd'][_0x317abc(0x3d8)](this),this[_0x317abc(0x3f4)]();},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x382)]=Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x170)],Game_BattlerBase[_0x4e163d(0x33f)]['resetStateCounts']=function(_0x32bb17){const _0x5639b7=_0x4e163d,_0x129bcb=$dataStates[_0x32bb17],_0x18156f=this['stateTurns'](_0x32bb17),_0x3416c9=this[_0x5639b7(0x386)](_0x129bcb)[_0x5639b7(0x26c)]()['trim']();switch(_0x3416c9){case _0x5639b7(0x3b2):if(_0x18156f<=0x0)this[_0x5639b7(0x183)](_0x32bb17);break;case'reset':this[_0x5639b7(0x183)](_0x32bb17);break;case _0x5639b7(0x2c3):this[_0x5639b7(0x183)](_0x32bb17),this[_0x5639b7(0x1c8)][_0x32bb17]=Math[_0x5639b7(0x36f)](this[_0x5639b7(0x1c8)][_0x32bb17],_0x18156f);break;case _0x5639b7(0x28e):this[_0x5639b7(0x183)](_0x32bb17),this[_0x5639b7(0x1c8)][_0x32bb17]+=_0x18156f;break;default:this[_0x5639b7(0x183)](_0x32bb17);break;}if(this[_0x5639b7(0x2bc)](_0x32bb17)){const _0x672bb9=DataManager[_0x5639b7(0x1bc)](_0x32bb17);this[_0x5639b7(0x1c8)][_0x32bb17]=this[_0x5639b7(0x1c8)][_0x32bb17][_0x5639b7(0x228)](0x0,_0x672bb9);}},Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x183)]=function(_0x42e674){const _0x263872=_0x4e163d;VisuMZ[_0x263872(0x1b1)]['Game_BattlerBase_resetStateCounts'][_0x263872(0x3d8)](this,_0x42e674);},Game_BattlerBase[_0x4e163d(0x33f)]['getStateReapplyRulings']=function(_0x403617){const _0x37e63d=_0x4e163d,_0x1a6966=_0x403617['note'];return _0x1a6966[_0x37e63d(0x253)](/<REAPPLY RULES:[ ](.*)>/i)?String(RegExp['$1']):VisuMZ['SkillsStatesCore']['Settings'][_0x37e63d(0x1eb)]['ReapplyRules'];},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x1c9)]=Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x263)],Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x263)]=function(_0x43204b,_0x4ea11f){const _0x2af20f=_0x4e163d,_0x4208fa=VisuMZ['SkillsStatesCore'][_0x2af20f(0x362)][_0x2af20f(0x2b5)][_0x2af20f(0x24d)],_0x5cd43e=this[_0x2af20f(0x351)](_0x43204b);switch(_0x4208fa){case _0x2af20f(0x3b2):if(_0x5cd43e<=0x0)this[_0x2af20f(0x259)][_0x43204b]=_0x4ea11f;break;case _0x2af20f(0x333):this['_buffTurns'][_0x43204b]=_0x4ea11f;break;case _0x2af20f(0x2c3):this[_0x2af20f(0x259)][_0x43204b]=Math[_0x2af20f(0x36f)](_0x5cd43e,_0x4ea11f);break;case _0x2af20f(0x28e):this[_0x2af20f(0x259)][_0x43204b]+=_0x4ea11f;break;default:VisuMZ[_0x2af20f(0x1b1)]['Game_BattlerBase_overwriteBuffTurns']['call'](this,_0x43204b,_0x4ea11f);break;}const _0x46de9f=VisuMZ[_0x2af20f(0x1b1)][_0x2af20f(0x362)][_0x2af20f(0x2b5)][_0x2af20f(0x2a8)];this[_0x2af20f(0x259)][_0x43204b]=this['_buffTurns'][_0x43204b][_0x2af20f(0x228)](0x0,_0x46de9f);},Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x33e)]=function(){const _0x519820=_0x4e163d;if(this[_0x519820(0x1a6)][_0x519820(0x163)]!==undefined)return this[_0x519820(0x1a6)]['groupDefeat'];this[_0x519820(0x1a6)]['groupDefeat']=![];const _0x1eb13b=this[_0x519820(0x2b0)]();for(const _0x555345 of _0x1eb13b){if(!_0x555345)continue;if(_0x555345['note']['match'](/<GROUP DEFEAT>/i)){this[_0x519820(0x1a6)]['groupDefeat']=!![];break;}}return this[_0x519820(0x1a6)][_0x519820(0x163)];},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x221)]=Game_Unit[_0x4e163d(0x33f)][_0x4e163d(0x3ba)],Game_Unit[_0x4e163d(0x33f)]['deadMembers']=function(){const _0x4a5a51=_0x4e163d;let _0x2af3d0=VisuMZ[_0x4a5a51(0x1b1)]['Game_Unit_deadMembers']['call'](this);return BattleManager[_0x4a5a51(0x1fe)]&&(_0x2af3d0=_0x2af3d0['concat'](this['members']()[_0x4a5a51(0x326)](_0x581660=>_0x581660[_0x4a5a51(0x33e)]()))),_0x2af3d0;},VisuMZ['SkillsStatesCore'][_0x4e163d(0x23e)]=Game_BattlerBase['prototype'][_0x4e163d(0x304)],Game_BattlerBase['prototype'][_0x4e163d(0x304)]=function(){const _0x16914a=_0x4e163d;this[_0x16914a(0x34d)]()!==''?this[_0x16914a(0x200)]():(VisuMZ[_0x16914a(0x1b1)][_0x16914a(0x23e)]['call'](this),this[_0x16914a(0x27b)]());},Game_Actor[_0x4e163d(0x33f)][_0x4e163d(0x304)]=function(){const _0x9ec56c=_0x4e163d;this['_stateSteps']=this[_0x9ec56c(0x3e7)]||{},Game_Battler[_0x9ec56c(0x33f)][_0x9ec56c(0x304)][_0x9ec56c(0x3d8)](this);},Game_BattlerBase[_0x4e163d(0x33f)]['clearStatesWithStateRetain']=function(){const _0x5e47a5=_0x4e163d,_0x53568e=this[_0x5e47a5(0x2b0)]();for(const _0x595620 of _0x53568e){if(_0x595620&&this[_0x5e47a5(0x402)](_0x595620))this[_0x5e47a5(0x1c1)](_0x595620['id']);}this[_0x5e47a5(0x1a6)]={};},Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x402)]=function(_0x5ed795){const _0xee3707=_0x4e163d,_0x2ecd04=this[_0xee3707(0x34d)]();if(_0x2ecd04!==''){const _0x46b7d8=_0x5ed795['note'];if(_0x2ecd04==='death'&&_0x46b7d8[_0xee3707(0x253)](/<NO DEATH CLEAR>/i))return![];if(_0x2ecd04===_0xee3707(0x179)&&_0x46b7d8[_0xee3707(0x253)](/<NO RECOVER ALL CLEAR>/i))return![];}return this[_0xee3707(0x2bc)](_0x5ed795['id']);},Game_BattlerBase['prototype']['getStateRetainType']=function(){const _0x2b7f74=_0x4e163d;return this[_0x2b7f74(0x17e)];},Game_BattlerBase[_0x4e163d(0x33f)]['setStateRetainType']=function(_0x6c6642){this['_stateRetainType']=_0x6c6642;},Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x3f3)]=function(){const _0xd992a6=_0x4e163d;this[_0xd992a6(0x17e)]='';},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x23b)]=Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x1ad)],Game_BattlerBase['prototype'][_0x4e163d(0x1ad)]=function(){const _0x5393da=_0x4e163d;this[_0x5393da(0x2e7)](_0x5393da(0x2f0)),VisuMZ[_0x5393da(0x1b1)][_0x5393da(0x23b)][_0x5393da(0x3d8)](this),this[_0x5393da(0x3f3)]();},VisuMZ[_0x4e163d(0x1b1)]['Game_BattlerBase_recoverAll']=Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x394)],Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x394)]=function(){const _0x231a33=_0x4e163d;this['setStateRetainType'](_0x231a33(0x179)),VisuMZ[_0x231a33(0x1b1)]['Game_BattlerBase_recoverAll']['call'](this),this[_0x231a33(0x3f3)]();},Game_BattlerBase[_0x4e163d(0x33f)]['adjustSkillCost']=function(_0xb82fde,_0x341341,_0x56dda1){return _0x341341;},Game_BattlerBase[_0x4e163d(0x33f)]['canPaySkillCost']=function(_0x460779){const _0x527eff=_0x4e163d;for(settings of VisuMZ[_0x527eff(0x1b1)][_0x527eff(0x362)][_0x527eff(0x2be)]){let _0x129018=settings[_0x527eff(0x38d)][_0x527eff(0x3d8)](this,_0x460779);_0x129018=this[_0x527eff(0x2d2)](_0x460779,_0x129018,settings);if(!settings['CanPayJS'][_0x527eff(0x3d8)](this,_0x460779,_0x129018))return![];}return!![];},Game_BattlerBase['prototype']['paySkillCost']=function(_0x438a48){const _0x3feb01=_0x4e163d;for(settings of VisuMZ[_0x3feb01(0x1b1)][_0x3feb01(0x362)][_0x3feb01(0x2be)]){let _0x442850=settings['CalcJS'][_0x3feb01(0x3d8)](this,_0x438a48);_0x442850=this['adjustSkillCost'](_0x438a48,_0x442850,settings),settings[_0x3feb01(0x140)][_0x3feb01(0x3d8)](this,_0x438a48,_0x442850);}},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x1af)]=Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x22a)],Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x22a)]=function(_0x101dcb){const _0x2b48fe=_0x4e163d;if(!_0x101dcb)return![];if(!VisuMZ[_0x2b48fe(0x1b1)][_0x2b48fe(0x1af)][_0x2b48fe(0x3d8)](this,_0x101dcb))return![];if(!this[_0x2b48fe(0x310)](_0x101dcb))return![];if(!this['meetsSkillConditionsEnableJS'](_0x101dcb))return![];if(!this[_0x2b48fe(0x313)](_0x101dcb))return![];return!![];},Game_BattlerBase['prototype']['checkSkillConditionsNotetags']=function(_0x2ba42c){const _0x520875=_0x4e163d;if(!this[_0x520875(0x147)](_0x2ba42c))return![];return!![];},Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x147)]=function(_0x509aef){const _0x1aa133=_0x4e163d,_0x4ed79e=_0x509aef[_0x1aa133(0x18e)];if(_0x4ed79e[_0x1aa133(0x253)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x220eda=JSON[_0x1aa133(0x3c6)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3a8e42 of _0x220eda){if(!$gameSwitches['value'](_0x3a8e42))return![];}return!![];}if(_0x4ed79e[_0x1aa133(0x253)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2363f5=JSON[_0x1aa133(0x3c6)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x50a0ac of _0x2363f5){if(!$gameSwitches[_0x1aa133(0x257)](_0x50a0ac))return![];}return!![];}if(_0x4ed79e['match'](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5ef4ae=JSON[_0x1aa133(0x3c6)]('['+RegExp['$1'][_0x1aa133(0x253)](/\d+/g)+']');for(const _0x30c607 of _0x5ef4ae){if($gameSwitches[_0x1aa133(0x257)](_0x30c607))return!![];}return![];}if(_0x4ed79e[_0x1aa133(0x253)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x17363b=JSON[_0x1aa133(0x3c6)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x8936a of _0x17363b){if(!$gameSwitches[_0x1aa133(0x257)](_0x8936a))return!![];}return![];}if(_0x4ed79e['match'](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2bed67=JSON[_0x1aa133(0x3c6)]('['+RegExp['$1'][_0x1aa133(0x253)](/\d+/g)+']');for(const _0x38a9e0 of _0x2bed67){if(!$gameSwitches[_0x1aa133(0x257)](_0x38a9e0))return!![];}return![];}if(_0x4ed79e[_0x1aa133(0x253)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2e1ed3=JSON[_0x1aa133(0x3c6)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2a54ac of _0x2e1ed3){if($gameSwitches['value'](_0x2a54ac))return![];}return!![];}return!![];},Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x1ab)]=function(_0x1d95f3){const _0x44b443=_0x4e163d,_0x4710e8=_0x1d95f3['note'],_0x291b56=VisuMZ[_0x44b443(0x1b1)][_0x44b443(0x337)];return _0x291b56[_0x1d95f3['id']]?_0x291b56[_0x1d95f3['id']]['call'](this,_0x1d95f3):!![];},Game_BattlerBase['prototype'][_0x4e163d(0x313)]=function(_0x4a8d72){const _0x64d7a0=_0x4e163d;return VisuMZ['SkillsStatesCore'][_0x64d7a0(0x362)]['Skills'][_0x64d7a0(0x308)][_0x64d7a0(0x3d8)](this,_0x4a8d72);},VisuMZ['SkillsStatesCore'][_0x4e163d(0x36e)]=Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x199)],Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x199)]=function(_0x4f7f40){const _0x52ef27=_0x4e163d;for(settings of VisuMZ[_0x52ef27(0x1b1)][_0x52ef27(0x362)]['Costs']){if(settings[_0x52ef27(0x19d)][_0x52ef27(0x29c)]()==='MP'){let _0x313463=settings['CalcJS'][_0x52ef27(0x3d8)](this,_0x4f7f40);return _0x313463=this[_0x52ef27(0x2d2)](_0x4f7f40,_0x313463,settings),_0x313463;}}return VisuMZ[_0x52ef27(0x1b1)][_0x52ef27(0x36e)][_0x52ef27(0x3d8)](this,_0x4f7f40);},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x203)]=Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x32e)],Game_BattlerBase['prototype'][_0x4e163d(0x32e)]=function(_0x4806d3){const _0x56b2ec=_0x4e163d;for(settings of VisuMZ[_0x56b2ec(0x1b1)][_0x56b2ec(0x362)][_0x56b2ec(0x2be)]){if(settings[_0x56b2ec(0x19d)][_0x56b2ec(0x29c)]()==='TP'){let _0x456e3c=settings[_0x56b2ec(0x38d)][_0x56b2ec(0x3d8)](this,_0x4806d3);return _0x456e3c=this['adjustSkillCost'](_0x4806d3,_0x456e3c,settings),_0x456e3c;}}return VisuMZ[_0x56b2ec(0x1b1)][_0x56b2ec(0x203)]['call'](this,_0x4806d3);},Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x2de)]=function(_0x585111){const _0x563057=_0x4e163d;if(typeof _0x585111===_0x563057(0x401))_0x585111=$dataStates[_0x585111];return this[_0x563057(0x2b0)]()['includes'](_0x585111);},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x22e)]=Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x2b0)],Game_BattlerBase['prototype']['states']=function(){const _0x49432d=_0x4e163d;let _0x2074b9=VisuMZ[_0x49432d(0x1b1)][_0x49432d(0x22e)][_0x49432d(0x3d8)](this);if($gameTemp[_0x49432d(0x3b7)])return _0x2074b9;return $gameTemp[_0x49432d(0x3b7)]=!![],this[_0x49432d(0x3d6)](_0x2074b9),$gameTemp['_checkingPassiveStates']=undefined,_0x2074b9;},Game_BattlerBase['prototype']['addPassiveStates']=function(_0x4381ee){const _0x28acaf=_0x4e163d,_0x2e95e2=this[_0x28acaf(0x387)]();for(state of _0x2e95e2){if(!state)continue;if(!this[_0x28acaf(0x32b)](state)&&_0x4381ee[_0x28acaf(0x30f)](state))continue;_0x4381ee[_0x28acaf(0x319)](state);}_0x2e95e2[_0x28acaf(0x2c1)]>0x0&&_0x4381ee['sort']((_0x27fdba,_0x567324)=>{const _0x4afb54=_0x28acaf,_0x279734=_0x27fdba[_0x4afb54(0x335)],_0x38c82e=_0x567324['priority'];if(_0x279734!==_0x38c82e)return _0x38c82e-_0x279734;return _0x27fdba-_0x567324;});},Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x32b)]=function(_0x10aeb2){const _0x2ff6da=_0x4e163d;return _0x10aeb2[_0x2ff6da(0x18e)][_0x2ff6da(0x253)](/<PASSIVE STACKABLE>/i);},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x1d8)]=Game_BattlerBase['prototype'][_0x4e163d(0x14e)],Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x14e)]=function(_0x5570ed){const _0x55f040=_0x4e163d;this[_0x55f040(0x39b)]=!![];let _0x4970ec=VisuMZ['SkillsStatesCore']['Game_BattlerBase_traitsSet'][_0x55f040(0x3d8)](this,_0x5570ed);return this[_0x55f040(0x39b)]=undefined,_0x4970ec;},Game_BattlerBase[_0x4e163d(0x33f)]['convertPassiveStates']=function(){const _0x38d5ca=_0x4e163d;let _0xd72a89=[];this['_passiveStateResults']=this[_0x38d5ca(0x1d3)]||{};for(;;){_0xd72a89=[];let _0x3ad900=!![];for(const _0xca64d9 of this[_0x38d5ca(0x1a6)]['passiveStates']){const _0x5b4a37=$dataStates[_0xca64d9];if(!_0x5b4a37)continue;let _0x4f84f9=this['meetsPassiveStateConditions'](_0x5b4a37);this['_passiveStateResults'][_0xca64d9]!==_0x4f84f9&&(_0x3ad900=![],this[_0x38d5ca(0x1d3)][_0xca64d9]=_0x4f84f9);if(!_0x4f84f9)continue;_0xd72a89['push'](_0x5b4a37);}if(_0x3ad900)break;else{if(!this[_0x38d5ca(0x39b)])this[_0x38d5ca(0x3bb)]();this[_0x38d5ca(0x25c)]();}}return _0xd72a89;},Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x28c)]=function(_0x3d04e1){const _0x11f1e0=_0x4e163d;if(!this[_0x11f1e0(0x3ff)](_0x3d04e1))return![];if(!this[_0x11f1e0(0x174)](_0x3d04e1))return![];if(!this['meetsPassiveStateConditionJS'](_0x3d04e1))return![];if(!this[_0x11f1e0(0x13d)](_0x3d04e1))return![];return!![];},Game_BattlerBase[_0x4e163d(0x33f)]['meetsPassiveStateConditionClasses']=function(_0x1b54fb){return!![];},Game_Actor['prototype'][_0x4e163d(0x3ff)]=function(_0x2ae761){const _0x1cc288=_0x4e163d,_0x285dbe=DataManager[_0x1cc288(0x18b)](_0x2ae761);if(_0x285dbe[_0x1cc288(0x3ef)][_0x1cc288(0x2c1)]>0x0){const _0x4982c2=_0x285dbe[_0x1cc288(0x3ef)];if(!_0x4982c2[_0x1cc288(0x30f)](this[_0x1cc288(0x3ef)]()))return![];}if(_0x285dbe[_0x1cc288(0x3f8)][_0x1cc288(0x2c1)]>0x0){const _0x2d2b2c=_0x285dbe[_0x1cc288(0x3f8)];let _0x2334ad=[this[_0x1cc288(0x3ef)]()];Imported[_0x1cc288(0x1e5)]&&this[_0x1cc288(0x15c)]&&(_0x2334ad=this[_0x1cc288(0x15c)]());if(_0x2d2b2c['filter'](_0x4c8581=>_0x2334ad['includes'](_0x4c8581))[_0x1cc288(0x2c1)]<=0x0)return![];}return Game_BattlerBase[_0x1cc288(0x33f)]['meetsPassiveStateConditionClasses'][_0x1cc288(0x3d8)](this,_0x2ae761);},DataManager[_0x4e163d(0x18b)]=function(_0x7dc155){const _0x55d7a0=_0x4e163d,_0x3e3ab5={'currentClass':[],'multiClass':[]};if(!_0x7dc155)return _0x3e3ab5;this[_0x55d7a0(0x1db)]=this['_cache_getPassiveStateConditionClassesData']||{};if(this[_0x55d7a0(0x1db)][_0x7dc155['id']]!==undefined)return this[_0x55d7a0(0x1db)][_0x7dc155['id']];const _0x1c1346=_0x7dc155[_0x55d7a0(0x18e)]||'';if(_0x1c1346['match'](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){const _0x2e696b=String(RegExp['$1'])['split'](',')['map'](_0x536def=>_0x536def[_0x55d7a0(0x376)]());_0x3e3ab5[_0x55d7a0(0x3ef)]=VisuMZ[_0x55d7a0(0x1b1)][_0x55d7a0(0x296)](_0x2e696b);}if(_0x1c1346['match'](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){const _0x51854d=String(RegExp['$1'])[_0x55d7a0(0x1cd)](',')[_0x55d7a0(0x2d1)](_0x4aca10=>_0x4aca10['trim']());_0x3e3ab5[_0x55d7a0(0x3f8)]=VisuMZ[_0x55d7a0(0x1b1)][_0x55d7a0(0x296)](_0x51854d);}return this[_0x55d7a0(0x1db)][_0x7dc155['id']]=_0x3e3ab5,this[_0x55d7a0(0x1db)][_0x7dc155['id']];},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x296)]=function(_0x2ab112){const _0xac4a26=_0x4e163d,_0x314000=[];for(let _0x1bb34f of _0x2ab112){_0x1bb34f=(String(_0x1bb34f)||'')['trim']();const _0x3230da=/^\d+$/['test'](_0x1bb34f);_0x3230da?_0x314000[_0xac4a26(0x319)](Number(_0x1bb34f)):_0x314000['push'](DataManager[_0xac4a26(0x38b)](_0x1bb34f));}return _0x314000[_0xac4a26(0x2d1)](_0x4f0adc=>$dataClasses[Number(_0x4f0adc)])['remove'](null);},Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x174)]=function(_0x536436){const _0xb26858=_0x4e163d,_0xf09fce=DataManager[_0xb26858(0x21c)](_0x536436);if(_0xf09fce[_0xb26858(0x3b0)]&&_0xf09fce[_0xb26858(0x3b0)][_0xb26858(0x2c1)]>0x0){const _0xe28792=_0xf09fce[_0xb26858(0x3b0)];for(const _0x46bc5b of _0xe28792){if(!$gameSwitches[_0xb26858(0x257)](_0x46bc5b))return![];}}if(_0xf09fce[_0xb26858(0x1d2)]&&_0xf09fce[_0xb26858(0x1d2)]['length']>0x0){const _0x31fba8=_0xf09fce[_0xb26858(0x1d2)];let _0x227b89=!![];for(const _0x75df47 of _0x31fba8){if($gameSwitches[_0xb26858(0x257)](_0x75df47)){_0x227b89=![];break;}}if(_0x227b89)return![];}if(_0xf09fce['allSwitchOff']&&_0xf09fce[_0xb26858(0x34b)][_0xb26858(0x2c1)]>0x0){const _0x595d79=_0xf09fce[_0xb26858(0x34b)];for(const _0x5cf2ba of _0x595d79){if($gameSwitches[_0xb26858(0x257)](_0x5cf2ba))return![];}}if(_0xf09fce[_0xb26858(0x3d4)]&&_0xf09fce[_0xb26858(0x3d4)][_0xb26858(0x2c1)]>0x0){const _0x39fbc6=_0xf09fce[_0xb26858(0x3d4)];let _0x1316aa=!![];for(const _0x5d78dd of _0x39fbc6){if(!$gameSwitches[_0xb26858(0x257)](_0x5d78dd)){_0x1316aa=![];break;}}if(_0x1316aa)return![];}return!![];},DataManager[_0x4e163d(0x21c)]=function(_0x23059e){const _0x4f136a=_0x4e163d;let _0x771d5={'allSwitchOn':[],'anySwitchOn':[],'allSwitchOff':[],'anySwitchOff':[]};if(!_0x23059e)return _0x771d5;const _0x4a34e7=_0x23059e['id'];this[_0x4f136a(0x22d)]=this[_0x4f136a(0x22d)]||{};if(this[_0x4f136a(0x22d)][_0x4a34e7]!==undefined)return this['_cache_getPassiveStateConditionSwitchData'][_0x4a34e7];const _0x17e529=_0x23059e[_0x4f136a(0x18e)]||'';return _0x17e529[_0x4f136a(0x253)](/PASSIVE CONDITION(?:| ALL)[ ](?:SWITCH|SWITCHES)[ ]ON:[ ](.*)>/i)&&(_0x771d5[_0x4f136a(0x3b0)]=String(RegExp['$1'])[_0x4f136a(0x1cd)](',')[_0x4f136a(0x2d1)](_0x24af5d=>Number(_0x24af5d))),_0x17e529[_0x4f136a(0x253)](/PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ](.*)>/i)&&(_0x771d5[_0x4f136a(0x1d2)]=String(RegExp['$1'])[_0x4f136a(0x1cd)](',')[_0x4f136a(0x2d1)](_0x182d53=>Number(_0x182d53))),_0x17e529[_0x4f136a(0x253)](/PASSIVE CONDITION(?:| ALL)[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ](.*)>/i)&&(_0x771d5[_0x4f136a(0x34b)]=String(RegExp['$1'])[_0x4f136a(0x1cd)](',')[_0x4f136a(0x2d1)](_0x1f032c=>Number(_0x1f032c))),_0x17e529[_0x4f136a(0x253)](/PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ](.*)>/i)&&(_0x771d5['anySwitchOff']=String(RegExp['$1'])['split'](',')[_0x4f136a(0x2d1)](_0x30c2c7=>Number(_0x30c2c7))),this[_0x4f136a(0x22d)][_0x4a34e7]=_0x771d5,this['_cache_getPassiveStateConditionSwitchData'][_0x4a34e7];},Game_BattlerBase['prototype'][_0x4e163d(0x3bd)]=function(_0x1a8a12){const _0x47497c=_0x4e163d,_0x5c6c77=VisuMZ[_0x47497c(0x1b1)][_0x47497c(0x2b4)];if(_0x5c6c77[_0x1a8a12['id']]&&!_0x5c6c77[_0x1a8a12['id']][_0x47497c(0x3d8)](this,_0x1a8a12))return![];return!![];},Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x13d)]=function(_0x210cb1){const _0x4bfe37=_0x4e163d;return VisuMZ[_0x4bfe37(0x1b1)]['Settings'][_0x4bfe37(0x225)][_0x4bfe37(0x2e4)][_0x4bfe37(0x3d8)](this,_0x210cb1);},Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x387)]=function(){const _0x5d7ddf=_0x4e163d;if(this[_0x5d7ddf(0x136)](_0x5d7ddf(0x387)))return this[_0x5d7ddf(0x261)]();if(this[_0x5d7ddf(0x37c)])return[];return this[_0x5d7ddf(0x37c)]=!![],this[_0x5d7ddf(0x25c)](),this['_checkingVisuMzPassiveStateObjects']=undefined,this['convertPassiveStates']();},Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x25c)]=function(){const _0x15121e=_0x4e163d;this['_checkingVisuMzPassiveStateObjects']=!![],this[_0x15121e(0x1a6)][_0x15121e(0x387)]=[],this[_0x15121e(0x155)](),this[_0x15121e(0x355)](),this[_0x15121e(0x161)](),Game_BattlerBase['AURA_SYSTEM_ENABLED']&&this[_0x15121e(0x1b6)](),this[_0x15121e(0x1a6)][_0x15121e(0x387)]=this[_0x15121e(0x1a6)][_0x15121e(0x387)][_0x15121e(0x224)]((_0x3b5d65,_0x5cb363)=>_0x3b5d65-_0x5cb363),this['_checkingVisuMzPassiveStateObjects']=undefined;},Game_BattlerBase['prototype']['addPassiveStatesFromOtherPlugins']=function(){const _0x286523=_0x4e163d;if(Imported[_0x286523(0x318)])this[_0x286523(0x265)]();},Game_BattlerBase[_0x4e163d(0x33f)]['passiveStateObjects']=function(){return[];},Game_BattlerBase[_0x4e163d(0x33f)]['addPassiveStatesByNotetag']=function(){const _0x1073bd=_0x4e163d,_0x5ea042=this[_0x1073bd(0x1a6)][_0x1073bd(0x387)]||[],_0x3c6898=this[_0x1073bd(0x198)]();this[_0x1073bd(0x1a6)][_0x1073bd(0x387)]=_0x5ea042||[];for(const _0x389afd of _0x3c6898){if(!_0x389afd)continue;const _0x367952=DataManager[_0x1073bd(0x1f8)](_0x389afd);for(const _0x17b013 of _0x367952){this[_0x1073bd(0x1a6)][_0x1073bd(0x387)]['push'](_0x17b013);}}},DataManager[_0x4e163d(0x1f8)]=function(_0x4faff4){const _0x239905=_0x4e163d;if(!_0x4faff4)return[];const _0x63b37a=VisuMZ[_0x239905(0x1b1)][_0x239905(0x35c)](_0x4faff4,'passiveStateIDs');this['_cache_getPassiveStatesFromObj']=this[_0x239905(0x2e6)]||{};if(this['_cache_getPassiveStatesFromObj'][_0x63b37a]!==undefined)return this[_0x239905(0x2e6)][_0x63b37a];const _0x3b947f=[],_0x4ad5d3=_0x4faff4[_0x239905(0x18e)]||'',_0x27fb78=/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi,_0x31d77f=_0x4ad5d3[_0x239905(0x253)](_0x27fb78);if(_0x31d77f)for(const _0x10300b of _0x31d77f){_0x10300b[_0x239905(0x253)](_0x27fb78);const _0xd8b1e3=String(RegExp['$1'])[_0x239905(0x1cd)](',')[_0x239905(0x2d1)](_0x3d2aa7=>_0x3d2aa7['trim']());for(const _0x377856 of _0xd8b1e3){const _0x1a9047=/^\d+$/['test'](_0x377856);let _0x13b8a9=0x0;_0x1a9047?_0x13b8a9=Number(_0x377856):_0x13b8a9=DataManager[_0x239905(0x2bf)](_0x377856),_0x13b8a9&&_0x3b947f[_0x239905(0x319)](_0x13b8a9);}}return this[_0x239905(0x2e6)][_0x63b37a]=_0x3b947f,this['_cache_getPassiveStatesFromObj'][_0x63b37a];},Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x161)]=function(){const _0x1fcd24=_0x4e163d,_0x53f9b9=VisuMZ[_0x1fcd24(0x1b1)]['Settings'][_0x1fcd24(0x225)][_0x1fcd24(0x26a)];this[_0x1fcd24(0x1a6)][_0x1fcd24(0x387)]=this['_cache']['passiveStates'][_0x1fcd24(0x165)](_0x53f9b9);},Game_BattlerBase[_0x4e163d(0x1b2)]=![],Scene_Boot[_0x4e163d(0x33f)][_0x4e163d(0x26b)]=function(){const _0x4e2e3a=[$dataActors,$dataClasses,$dataSkills,$dataWeapons,$dataArmors,$dataEnemies];for(const _0x53abd0 of _0x4e2e3a){for(const _0xe9c378 of _0x53abd0){if(!_0xe9c378)continue;const _0x2a760d=_0xe9c378['note']||'';if(_0x2a760d['match'](/<(?:AURA|MIASMA) (?:STATE|STATES):[ ](.*)>/gi)){Game_BattlerBase['AURA_SYSTEM_ENABLED']=!![];break;}}}},Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x1b6)]=function(){const _0x3eedaf=_0x4e163d;if(this[_0x3eedaf(0x399)]())return;if(!this[_0x3eedaf(0x252)]())return;const _0x647d20=this[_0x3eedaf(0x1a6)][_0x3eedaf(0x387)]||[],_0x240949=this,_0x5c1a72=this[_0x3eedaf(0x1b4)]()[_0x3eedaf(0x15a)](!![],_0x240949),_0x59bdde=$gameParty[_0x3eedaf(0x1a8)]()?this[_0x3eedaf(0x220)]()[_0x3eedaf(0x15a)](![],_0x240949):[];this[_0x3eedaf(0x1a6)][_0x3eedaf(0x387)]=_0x647d20||[],this[_0x3eedaf(0x1a6)][_0x3eedaf(0x387)]=this[_0x3eedaf(0x1a6)][_0x3eedaf(0x387)][_0x3eedaf(0x165)](_0x5c1a72)[_0x3eedaf(0x165)](_0x59bdde);},Game_Unit['prototype'][_0x4e163d(0x15a)]=function(_0x14f03c,_0x2dbab5){const _0xb393a7=_0x4e163d;let _0x1bc752=[];const _0x2472ac=this===$gameParty?this['battleMembers']():this[_0xb393a7(0x1e0)]();for(const _0x4e54e8 of _0x2472ac){if(!_0x4e54e8)continue;if(!_0x4e54e8[_0xb393a7(0x252)]())continue;const _0x44e904=_0x4e54e8[_0xb393a7(0x198)]();for(const _0x58d364 of _0x44e904){if(!_0x58d364)continue;if(!VisuMZ[_0xb393a7(0x1b1)][_0xb393a7(0x2a6)](_0x58d364,_0x14f03c,_0x4e54e8,_0x2dbab5))continue;let _0x169860=DataManager[_0xb393a7(0x3cf)](_0x58d364,_0x14f03c);for(const _0x3c553b of _0x169860){if(!VisuMZ['SkillsStatesCore'][_0xb393a7(0x2f3)](_0x3c553b,_0x14f03c,_0x4e54e8,_0x2dbab5))continue;_0x1bc752[_0xb393a7(0x319)](_0x3c553b),!_0x2dbab5[_0xb393a7(0x2bc)](_0x3c553b)&&_0x2dbab5['setStateOrigin'](_0x3c553b,_0x4e54e8);}}}return _0x1bc752;},DataManager[_0x4e163d(0x3cf)]=function(_0x28dd51,_0x324de0){const _0x59aa9b=_0x4e163d;if(!_0x28dd51)return[];const _0x471968=_0x324de0?_0x59aa9b(0x223):_0x59aa9b(0x276),_0x2bf348=VisuMZ[_0x59aa9b(0x1b1)][_0x59aa9b(0x35c)](_0x28dd51,_0x471968);this[_0x59aa9b(0x21e)]=this[_0x59aa9b(0x21e)]||{};if(this[_0x59aa9b(0x21e)][_0x2bf348]!==undefined)return this[_0x59aa9b(0x21e)][_0x2bf348];const _0x3146da=[],_0x271eae=_0x28dd51[_0x59aa9b(0x18e)]||'',_0x3567cb=_0x324de0?/<AURA (?:STATE|STATES):[ ](.*)>/gi:/<MIASMA (?:STATE|STATES):[ ](.*)>/gi,_0x52fabb=_0x271eae['match'](_0x3567cb);if(_0x52fabb)for(const _0x160b5f of _0x52fabb){_0x160b5f[_0x59aa9b(0x253)](_0x3567cb);const _0x582e3d=String(RegExp['$1'])[_0x59aa9b(0x1cd)](',')[_0x59aa9b(0x2d1)](_0xebcc40=>_0xebcc40[_0x59aa9b(0x376)]());for(const _0x404cf0 of _0x582e3d){const _0x3b2770=/^\d+$/[_0x59aa9b(0x360)](_0x404cf0);let _0x565ba6=0x0;_0x3b2770?_0x565ba6=Number(_0x404cf0):_0x565ba6=DataManager['getStateIdWithName'](_0x404cf0),_0x565ba6&&_0x3146da[_0x59aa9b(0x319)](_0x565ba6);}}return this['_cache_getAuraPassiveStatesFromObj'][_0x2bf348]=_0x3146da,this[_0x59aa9b(0x21e)][_0x2bf348];},VisuMZ['SkillsStatesCore'][_0x4e163d(0x2a6)]=function(_0x99ebb3,_0x5e9448,_0x45afbd,_0x11e08c){const _0x29e879=_0x4e163d;if(!_0x99ebb3)return![];if(_0x99ebb3['autoRemovalTiming']!==undefined&&_0x99ebb3[_0x29e879(0x284)]!==undefined)return![];const _0x1aa65a=_0x99ebb3[_0x29e879(0x18e)]||'';if(!VisuMZ[_0x29e879(0x1b1)][_0x29e879(0x1d9)](_0x1aa65a,_0x5e9448,_0x45afbd,_0x11e08c))return![];return!![];},VisuMZ[_0x4e163d(0x1b1)]['MeetsAuraStateConditions']=function(_0x4f91d2,_0x3482dc,_0x49788b,_0x5eb832){const _0x2d8343=_0x4e163d,_0x2ea264=$dataStates[_0x4f91d2];if(!_0x2ea264)return![];const _0x553fa9=_0x2ea264[_0x2d8343(0x18e)]||'';if(!VisuMZ['SkillsStatesCore'][_0x2d8343(0x1d9)](_0x553fa9,_0x3482dc,_0x49788b,_0x5eb832))return![];return!![];},VisuMZ['SkillsStatesCore']['MeetsAuraNoteConditions']=function(_0xdac307,_0x21adca,_0x3becfb,_0x3c8127){const _0x6d14ef=_0x4e163d;_0xdac307=_0xdac307||'';if(_0x3becfb[_0x6d14ef(0x399)]()){if(_0x21adca&&_0xdac307[_0x6d14ef(0x253)](/<ALLOW DEAD AURA>/i)){}else{if(!_0x21adca&&_0xdac307['match'](/<ALLOW DEAD MIASMA>/i)){}else{if(_0x21adca&&_0xdac307[_0x6d14ef(0x253)](/<DEAD AURA ONLY>/i)){}else{if(!_0x21adca&&_0xdac307[_0x6d14ef(0x253)](/<DEAD MIASMA ONLY>/i)){}else return![];}}}}else{if(_0x21adca&&_0xdac307[_0x6d14ef(0x253)](/<DEAD AURA ONLY>/i))return![];else{if(!_0x21adca&&_0xdac307[_0x6d14ef(0x253)](/<DEAD MIASMA ONLY>/i))return![];}}if(_0x21adca){if(_0xdac307['match'](/<AURA NOT FOR USER>/i)){if(_0x3becfb===_0x3c8127)return![];}else{if(_0xdac307[_0x6d14ef(0x253)](/<NOT USER AURA>/i)){if(_0x3becfb===_0x3c8127)return![];}}}return!![];},Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x205)]=function(_0x42cf58){const _0x4a8493=_0x4e163d;if(typeof _0x42cf58!==_0x4a8493(0x401))_0x42cf58=_0x42cf58['id'];return this[_0x4a8493(0x1c8)][_0x42cf58]||0x0;},Game_BattlerBase['prototype'][_0x4e163d(0x21d)]=function(_0xbf82f5,_0x4ffa97){const _0x313ff3=_0x4e163d;if(typeof _0xbf82f5!==_0x313ff3(0x401))_0xbf82f5=_0xbf82f5['id'];if(this[_0x313ff3(0x2bc)](_0xbf82f5)){const _0x4d4635=DataManager[_0x313ff3(0x1bc)](_0xbf82f5);this[_0x313ff3(0x1c8)][_0xbf82f5]=_0x4ffa97[_0x313ff3(0x228)](0x0,_0x4d4635);if(this[_0x313ff3(0x1c8)][_0xbf82f5]<=0x0)this[_0x313ff3(0x229)](_0xbf82f5);}},Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x3cc)]=function(_0x36e8e3,_0x48545c){const _0x4913ba=_0x4e163d;if(typeof _0x36e8e3!==_0x4913ba(0x401))_0x36e8e3=_0x36e8e3['id'];this[_0x4913ba(0x2bc)](_0x36e8e3)&&(_0x48545c+=this['stateTurns'](_0x36e8e3),this[_0x4913ba(0x21d)](_0x36e8e3,_0x48545c));},VisuMZ[_0x4e163d(0x1b1)]['Game_BattlerBase_eraseBuff']=Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x156)],Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x156)]=function(_0x48c22d){const _0xb0c3bf=_0x4e163d,_0x4765a4=this[_0xb0c3bf(0x3fa)][_0x48c22d];VisuMZ[_0xb0c3bf(0x1b1)]['Game_BattlerBase_eraseBuff'][_0xb0c3bf(0x3d8)](this,_0x48c22d);if(_0x4765a4>0x0)this[_0xb0c3bf(0x342)](_0x48c22d);if(_0x4765a4<0x0)this[_0xb0c3bf(0x3a8)](_0x48c22d);},VisuMZ[_0x4e163d(0x1b1)]['Game_BattlerBase_increaseBuff']=Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x195)],Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x195)]=function(_0x3ec17f){const _0x22005b=_0x4e163d;VisuMZ[_0x22005b(0x1b1)]['Game_BattlerBase_increaseBuff'][_0x22005b(0x3d8)](this,_0x3ec17f);if(!this[_0x22005b(0x375)](_0x3ec17f))this['eraseBuff'](_0x3ec17f);},VisuMZ['SkillsStatesCore'][_0x4e163d(0x231)]=Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x2e8)],Game_BattlerBase[_0x4e163d(0x33f)]['decreaseBuff']=function(_0x4d13e0){const _0x46d8ea=_0x4e163d;VisuMZ[_0x46d8ea(0x1b1)][_0x46d8ea(0x231)][_0x46d8ea(0x3d8)](this,_0x4d13e0);if(!this[_0x46d8ea(0x375)](_0x4d13e0))this['eraseBuff'](_0x4d13e0);},Game_BattlerBase['prototype'][_0x4e163d(0x342)]=function(_0x210535){},Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x3a8)]=function(_0x58df16){},Game_BattlerBase[_0x4e163d(0x33f)]['isMaxBuffAffected']=function(_0x442569){const _0x11867b=_0x4e163d;return this[_0x11867b(0x3fa)][_0x442569]===VisuMZ[_0x11867b(0x1b1)][_0x11867b(0x362)][_0x11867b(0x2b5)][_0x11867b(0x1d6)];},Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x157)]=function(_0x3eaf15){const _0x307d48=_0x4e163d;return this[_0x307d48(0x3fa)][_0x3eaf15]===-VisuMZ[_0x307d48(0x1b1)]['Settings']['Buffs']['StackDebuffMax'];},VisuMZ['SkillsStatesCore']['Game_BattlerBase_buffIconIndex']=Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x2af)],Game_BattlerBase['prototype'][_0x4e163d(0x2af)]=function(_0x3e349c,_0x3365fd){const _0x290752=_0x4e163d;return _0x3e349c=_0x3e349c[_0x290752(0x228)](-0x2,0x2),VisuMZ[_0x290752(0x1b1)]['Game_BattlerBase_buffIconIndex'][_0x290752(0x3d8)](this,_0x3e349c,_0x3365fd);},Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x210)]=function(_0x8f9448){const _0x5282cd=_0x4e163d,_0x3254b7=this[_0x5282cd(0x3fa)][_0x8f9448];return VisuMZ[_0x5282cd(0x1b1)][_0x5282cd(0x362)]['Buffs'][_0x5282cd(0x30b)][_0x5282cd(0x3d8)](this,_0x8f9448,_0x3254b7);},Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x351)]=function(_0x11f4c7){const _0xb4a3ff=_0x4e163d;return this[_0xb4a3ff(0x259)][_0x11f4c7]||0x0;},Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x2e3)]=function(_0x4a4fe9){return this['buffTurns'](_0x4a4fe9);},Game_BattlerBase['prototype']['setBuffTurns']=function(_0x38a5b6,_0x21fcc4){const _0x512566=_0x4e163d;if(this[_0x512566(0x137)](_0x38a5b6)){const _0x22372a=VisuMZ[_0x512566(0x1b1)][_0x512566(0x362)][_0x512566(0x2b5)][_0x512566(0x2a8)];this[_0x512566(0x259)][_0x38a5b6]=_0x21fcc4[_0x512566(0x228)](0x0,_0x22372a);}},Game_BattlerBase[_0x4e163d(0x33f)]['addBuffTurns']=function(_0x1bd137,_0x5c99ed){const _0x25d4b4=_0x4e163d;this['isBuffAffected'](_0x1bd137)&&(_0x5c99ed+=this[_0x25d4b4(0x351)](stateId),this[_0x25d4b4(0x3e5)](_0x1bd137,_0x5c99ed));},Game_BattlerBase['prototype'][_0x4e163d(0x1e9)]=function(_0x4fd88b,_0x450543){const _0x38d73b=_0x4e163d;if(this[_0x38d73b(0x1cc)](_0x4fd88b)){const _0x326d1f=VisuMZ[_0x38d73b(0x1b1)][_0x38d73b(0x362)]['Buffs'][_0x38d73b(0x2a8)];this[_0x38d73b(0x259)][_0x4fd88b]=_0x450543[_0x38d73b(0x228)](0x0,_0x326d1f);}},Game_BattlerBase['prototype'][_0x4e163d(0x286)]=function(_0x356248,_0x541655){const _0x11305a=_0x4e163d;this['isDebuffAffected'](_0x356248)&&(_0x541655+=this[_0x11305a(0x351)](stateId),this[_0x11305a(0x1e9)](_0x356248,_0x541655));},Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x3df)]=function(_0x25f1dd){const _0x130f4a=_0x4e163d;if(typeof _0x25f1dd!==_0x130f4a(0x401))_0x25f1dd=_0x25f1dd['id'];return this[_0x130f4a(0x150)]=this[_0x130f4a(0x150)]||{},this[_0x130f4a(0x150)][_0x25f1dd]=this[_0x130f4a(0x150)][_0x25f1dd]||{},this['_stateData'][_0x25f1dd];},Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x217)]=function(_0x1dd24e,_0x3f8630){const _0xa82a28=_0x4e163d;if(typeof _0x1dd24e!==_0xa82a28(0x401))_0x1dd24e=_0x1dd24e['id'];const _0x264cb2=this[_0xa82a28(0x3df)](_0x1dd24e);return _0x264cb2[_0x3f8630];},Game_BattlerBase[_0x4e163d(0x33f)]['setStateData']=function(_0x3c2f8d,_0x5f0ee8,_0x595973){const _0x3b2eec=_0x4e163d;if(typeof _0x3c2f8d!==_0x3b2eec(0x401))_0x3c2f8d=_0x3c2f8d['id'];const _0x3ceca6=this['stateData'](_0x3c2f8d);_0x3ceca6[_0x5f0ee8]=_0x595973;},Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x31a)]=function(_0x790e4f){const _0x4dad3d=_0x4e163d;if(typeof _0x790e4f!==_0x4dad3d(0x401))_0x790e4f=_0x790e4f['id'];this[_0x4dad3d(0x150)]=this[_0x4dad3d(0x150)]||{},this[_0x4dad3d(0x150)][_0x790e4f]={};},Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x1ea)]=function(_0x331f3a){const _0xb76533=_0x4e163d;if(typeof _0x331f3a!=='number')_0x331f3a=_0x331f3a['id'];return this[_0xb76533(0x3a9)]=this[_0xb76533(0x3a9)]||{},this[_0xb76533(0x3a9)][_0x331f3a]===undefined&&(this[_0xb76533(0x3a9)][_0x331f3a]=''),this[_0xb76533(0x3a9)][_0x331f3a];},Game_BattlerBase[_0x4e163d(0x33f)]['setStateDisplay']=function(_0x5e7b99,_0x1f5730){const _0x3c48d4=_0x4e163d;if(typeof _0x5e7b99!==_0x3c48d4(0x401))_0x5e7b99=_0x5e7b99['id'];this[_0x3c48d4(0x3a9)]=this['_stateDisplay']||{},this['_stateDisplay'][_0x5e7b99]=_0x1f5730;},Game_BattlerBase['prototype'][_0x4e163d(0x37a)]=function(_0x48bc9a){const _0xff2025=_0x4e163d;if(typeof _0x48bc9a!==_0xff2025(0x401))_0x48bc9a=_0x48bc9a['id'];this[_0xff2025(0x3a9)]=this['_stateDisplay']||{},this[_0xff2025(0x3a9)][_0x48bc9a]='';},Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x3f6)]=function(_0x3a26e0){const _0x586ba5=_0x4e163d;if(typeof _0x3a26e0!==_0x586ba5(0x401))_0x3a26e0=_0x3a26e0['id'];this[_0x586ba5(0x385)]=this['_stateOrigin']||{},this[_0x586ba5(0x385)][_0x3a26e0]=this[_0x586ba5(0x385)][_0x3a26e0]||_0x586ba5(0x3da);const _0x4a24ea=this[_0x586ba5(0x385)][_0x3a26e0];return this[_0x586ba5(0x1fd)](_0x4a24ea);},Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x250)]=function(_0x10f071,_0x3a3f14){const _0x44e4e6=_0x4e163d;this[_0x44e4e6(0x385)]=this['_stateOrigin']||{};const _0x5d4d02=_0x3a3f14?this[_0x44e4e6(0x2c2)](_0x3a3f14):this[_0x44e4e6(0x277)]();this[_0x44e4e6(0x385)][_0x10f071]=_0x5d4d02;},Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x2d9)]=function(_0x239250){const _0x96f08c=_0x4e163d;this['_stateOrigin']=this[_0x96f08c(0x385)]||{},delete this['_stateOrigin'][_0x239250];},Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x3f4)]=function(){const _0x175cca=_0x4e163d;this[_0x175cca(0x385)]={};},Game_BattlerBase[_0x4e163d(0x33f)]['getCurrentStateOriginKey']=function(){const _0x171e87=_0x4e163d,_0x55f632=this[_0x171e87(0x1e6)]();return this[_0x171e87(0x2c2)](_0x55f632);},Game_BattlerBase['prototype'][_0x4e163d(0x1e6)]=function(){const _0x421f70=_0x4e163d;if($gameParty['inBattle']()){if(BattleManager[_0x421f70(0x301)])return BattleManager[_0x421f70(0x301)];else{if(BattleManager[_0x421f70(0x180)])return BattleManager['_currentActor'];}}else{const _0xb69731=SceneManager[_0x421f70(0x1d0)];if(![Scene_Map,Scene_Item][_0x421f70(0x30f)](_0xb69731[_0x421f70(0x214)]))return $gameParty[_0x421f70(0x340)]();}return this;},Game_BattlerBase[_0x4e163d(0x33f)]['convertTargetToStateOriginKey']=function(_0x338b48){const _0x25051c=_0x4e163d;if(!_0x338b48)return _0x25051c(0x3da);if(_0x338b48[_0x25051c(0x236)]())return _0x25051c(0x1cb)[_0x25051c(0x29e)](_0x338b48[_0x25051c(0x2cc)]());else{const _0x4f165f=_0x25051c(0x36a)[_0x25051c(0x29e)](_0x338b48[_0x25051c(0x2d3)]()),_0x5c2f66=_0x25051c(0x1ed)['format'](_0x338b48[_0x25051c(0x280)]()),_0x159a62='<troop-%1>'[_0x25051c(0x29e)]($gameTroop['getCurrentTroopUniqueID']());return _0x25051c(0x36d)[_0x25051c(0x29e)](_0x4f165f,_0x5c2f66,_0x159a62);}return _0x25051c(0x3da);},Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x1fd)]=function(_0x2912b0){const _0xc56ba5=_0x4e163d;if(_0x2912b0===_0xc56ba5(0x3da))return this;else{if(_0x2912b0[_0xc56ba5(0x253)](/<actor-(\d+)>/i))return $gameActors['actor'](Number(RegExp['$1']));else{if($gameParty[_0xc56ba5(0x1a8)]()&&_0x2912b0['match'](/<troop-(\d+)>/i)){const _0x34b366=Number(RegExp['$1']);if(_0x34b366===$gameTroop['getCurrentTroopUniqueID']()){if(_0x2912b0[_0xc56ba5(0x253)](/<member-(\d+)>/i))return $gameTroop['members']()[Number(RegExp['$1'])];}}if(_0x2912b0['match'](/<enemy-(\d+)>/i))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);}}return this;},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x222)]=Game_Battler['prototype'][_0x4e163d(0x36b)],Game_Battler['prototype'][_0x4e163d(0x36b)]=function(_0x2717b7){const _0x95a29a=_0x4e163d,_0x203e58=this[_0x95a29a(0x1b3)](_0x2717b7);VisuMZ['SkillsStatesCore']['Game_Battler_addState'][_0x95a29a(0x3d8)](this,_0x2717b7);if(_0x203e58&&this['hasState']($dataStates[_0x2717b7])){this[_0x95a29a(0x28f)](_0x2717b7);;}},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x230)]=Game_Battler[_0x4e163d(0x33f)][_0x4e163d(0x1b3)],Game_Battler[_0x4e163d(0x33f)][_0x4e163d(0x1b3)]=function(_0x2709f7){const _0x59ce8c=_0x4e163d,_0x387b76=$dataStates[_0x2709f7];if(_0x387b76&&_0x387b76[_0x59ce8c(0x18e)][_0x59ce8c(0x253)](/<NO DEATH CLEAR>/i))return!this[_0x59ce8c(0x2c0)](_0x2709f7)&&!this[_0x59ce8c(0x358)](_0x2709f7)&&!this['_result'][_0x59ce8c(0x3d0)](_0x2709f7);return VisuMZ['SkillsStatesCore']['Game_Battler_isStateAddable'][_0x59ce8c(0x3d8)](this,_0x2709f7);},VisuMZ['SkillsStatesCore'][_0x4e163d(0x3bc)]=Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x349)],Game_BattlerBase[_0x4e163d(0x33f)]['addNewState']=function(_0x66d60e){const _0x5eb945=_0x4e163d;VisuMZ[_0x5eb945(0x1b1)][_0x5eb945(0x3bc)][_0x5eb945(0x3d8)](this,_0x66d60e);if(_0x66d60e===this[_0x5eb945(0x256)]())while(this[_0x5eb945(0x38e)][_0x5eb945(0x326)](_0x4134fd=>_0x4134fd===this[_0x5eb945(0x256)]())[_0x5eb945(0x2c1)]>0x1){const _0x30d3fa=this[_0x5eb945(0x38e)]['indexOf'](this['deathStateId']());this[_0x5eb945(0x38e)][_0x5eb945(0x1ef)](_0x30d3fa,0x1);}},Game_Battler[_0x4e163d(0x33f)]['onAddState']=function(_0x505d9a){const _0x2df296=_0x4e163d;this[_0x2df296(0x250)](_0x505d9a),this[_0x2df296(0x30e)](_0x505d9a),this[_0x2df296(0x2ba)](_0x505d9a),this[_0x2df296(0x190)](_0x505d9a),this['onAddStateGlobalJS'](_0x505d9a);},Game_Battler[_0x4e163d(0x33f)][_0x4e163d(0x3b3)]=function(_0x5e68ff){const _0x500f62=_0x4e163d;this[_0x500f62(0x397)](_0x5e68ff),this[_0x500f62(0x226)](_0x5e68ff),Game_BattlerBase[_0x500f62(0x33f)][_0x500f62(0x3b3)]['call'](this,_0x5e68ff);},Game_Battler[_0x4e163d(0x33f)][_0x4e163d(0x31d)]=function(_0x39caa3){const _0x32be68=_0x4e163d;for(const _0x17c0e0 of this[_0x32be68(0x2b0)]()){this[_0x32be68(0x151)](_0x17c0e0['id'])&&_0x17c0e0[_0x32be68(0x3c8)]===_0x39caa3&&(this['removeState'](_0x17c0e0['id']),this['onExpireState'](_0x17c0e0['id']),this[_0x32be68(0x2cd)](_0x17c0e0['id']));}},Game_Battler[_0x4e163d(0x33f)][_0x4e163d(0x20b)]=function(_0x2e67b3){const _0x4f2e4c=_0x4e163d;this[_0x4f2e4c(0x3f7)](_0x2e67b3);},Game_Battler[_0x4e163d(0x33f)][_0x4e163d(0x190)]=function(_0x2f500a){const _0x90f3ff=_0x4e163d;if(this[_0x90f3ff(0x320)]||this[_0x90f3ff(0x13a)])return;const _0x34a116=VisuMZ[_0x90f3ff(0x1b1)][_0x90f3ff(0x22b)];if(_0x34a116[_0x2f500a])_0x34a116[_0x2f500a][_0x90f3ff(0x3d8)](this,_0x2f500a);},Game_Battler[_0x4e163d(0x33f)][_0x4e163d(0x397)]=function(_0xdadc4d){const _0x10ae57=_0x4e163d;if(this['_tempActor']||this[_0x10ae57(0x13a)])return;const _0x508790=VisuMZ['SkillsStatesCore']['stateEraseJS'];if(_0x508790[_0xdadc4d])_0x508790[_0xdadc4d]['call'](this,_0xdadc4d);},Game_Battler['prototype'][_0x4e163d(0x3f7)]=function(_0x270e2a){const _0x259090=_0x4e163d;if(this[_0x259090(0x320)]||this['_tempBattler'])return;const _0x1940df=VisuMZ[_0x259090(0x1b1)]['stateExpireJS'];if(_0x1940df[_0x270e2a])_0x1940df[_0x270e2a][_0x259090(0x3d8)](this,_0x270e2a);},Game_Battler[_0x4e163d(0x33f)][_0x4e163d(0x2fa)]=function(_0x307a99){const _0x4f374d=_0x4e163d;if(this[_0x4f374d(0x320)]||this[_0x4f374d(0x13a)])return;try{VisuMZ[_0x4f374d(0x1b1)][_0x4f374d(0x362)]['States'][_0x4f374d(0x1b5)][_0x4f374d(0x3d8)](this,_0x307a99);}catch(_0x2d5b70){if($gameTemp['isPlaytest']())console[_0x4f374d(0x293)](_0x2d5b70);}},Game_Battler[_0x4e163d(0x33f)][_0x4e163d(0x226)]=function(_0x3ac9b4){const _0x32bb30=_0x4e163d;if(this[_0x32bb30(0x320)]||this[_0x32bb30(0x13a)])return;try{VisuMZ[_0x32bb30(0x1b1)]['Settings'][_0x32bb30(0x1eb)]['onEraseStateJS'][_0x32bb30(0x3d8)](this,_0x3ac9b4);}catch(_0x593e89){if($gameTemp[_0x32bb30(0x395)]())console[_0x32bb30(0x293)](_0x593e89);}},Game_Battler['prototype']['onExpireStateGlobalJS']=function(_0xd5a677){const _0xd33b60=_0x4e163d;if(this['_tempActor']||this[_0xd33b60(0x13a)])return;try{VisuMZ[_0xd33b60(0x1b1)][_0xd33b60(0x362)][_0xd33b60(0x1eb)][_0xd33b60(0x19e)][_0xd33b60(0x3d8)](this,_0xd5a677);}catch(_0x2269f2){if($gameTemp[_0xd33b60(0x395)]())console['log'](_0x2269f2);}},Game_Battler['prototype'][_0x4e163d(0x317)]=function(_0x326519){const _0x5d884c=_0x4e163d;return _0x326519=_0x326519['toUpperCase']()[_0x5d884c(0x376)](),this[_0x5d884c(0x2b0)]()[_0x5d884c(0x326)](_0x1175bf=>_0x1175bf['categories'][_0x5d884c(0x30f)](_0x326519));},Game_Battler[_0x4e163d(0x33f)][_0x4e163d(0x2a9)]=function(_0x2f153d,_0xd65cc0){const _0x606729=_0x4e163d;_0x2f153d=_0x2f153d[_0x606729(0x29c)]()['trim'](),_0xd65cc0=_0xd65cc0||0x0;const _0x285b01=this[_0x606729(0x317)](_0x2f153d),_0x2d0b70=[];for(const _0x33c3b0 of _0x285b01){if(!_0x33c3b0)continue;if(_0xd65cc0<=0x0)break;_0x2d0b70[_0x606729(0x319)](_0x33c3b0['id']),this[_0x606729(0x26e)][_0x606729(0x28b)]=!![],_0xd65cc0--;}while(_0x2d0b70[_0x606729(0x2c1)]>0x0){this[_0x606729(0x229)](_0x2d0b70[_0x606729(0x1d5)]());}},Game_Battler[_0x4e163d(0x33f)]['removeStatesByCategoryAll']=function(_0x258953,_0x59037c){const _0x279feb=_0x4e163d;_0x258953=_0x258953[_0x279feb(0x29c)]()[_0x279feb(0x376)](),_0x59037c=_0x59037c||[];const _0x2c5e30=this[_0x279feb(0x317)](_0x258953),_0xb0db01=[];for(const _0x3852b5 of _0x2c5e30){if(!_0x3852b5)continue;if(_0x59037c['includes'](_0x3852b5))continue;_0xb0db01[_0x279feb(0x319)](_0x3852b5['id']),this[_0x279feb(0x26e)][_0x279feb(0x28b)]=!![];}while(_0xb0db01[_0x279feb(0x2c1)]>0x0){this[_0x279feb(0x229)](_0xb0db01[_0x279feb(0x1d5)]());}},Game_Battler[_0x4e163d(0x33f)]['isStateCategoryAffected']=function(_0x125edf){const _0x367720=_0x4e163d;return this[_0x367720(0x148)](_0x125edf)>0x0;},Game_Battler[_0x4e163d(0x33f)][_0x4e163d(0x3e3)]=function(_0x3b02bf){const _0x5a4d00=_0x4e163d;return this[_0x5a4d00(0x396)](_0x3b02bf)>0x0;},Game_Battler[_0x4e163d(0x33f)][_0x4e163d(0x148)]=function(_0x43b65b){const _0x23d45d=_0x4e163d,_0x1bd5a1=this[_0x23d45d(0x317)](_0x43b65b)[_0x23d45d(0x326)](_0x2a7c9f=>this[_0x23d45d(0x2bc)](_0x2a7c9f['id']));return _0x1bd5a1[_0x23d45d(0x2c1)];},Game_Battler[_0x4e163d(0x33f)][_0x4e163d(0x396)]=function(_0x33c8fb){const _0x1bb9e6=_0x4e163d,_0xe87b31=this[_0x1bb9e6(0x317)](_0x33c8fb);return _0xe87b31[_0x1bb9e6(0x2c1)];},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x1a1)]=Game_BattlerBase['prototype']['isStateResist'],Game_BattlerBase[_0x4e163d(0x33f)][_0x4e163d(0x2c0)]=function(_0x53e22e){const _0x45bfce=_0x4e163d,_0x2e6301=$dataStates[_0x53e22e];if(_0x2e6301&&_0x2e6301[_0x45bfce(0x258)][_0x45bfce(0x2c1)]>0x0)for(const _0x571473 of _0x2e6301[_0x45bfce(0x258)]){if(this['isStateCategoryResisted'](_0x571473))return!![];}return VisuMZ[_0x45bfce(0x1b1)][_0x45bfce(0x1a1)][_0x45bfce(0x3d8)](this,_0x53e22e);},Game_BattlerBase[_0x4e163d(0x33f)]['isStateCategoryResisted']=function(_0x53d491){const _0x38f91e=_0x4e163d;let _0x4054fd=_0x38f91e(0x2cb);if(this[_0x38f91e(0x136)](_0x4054fd))return this['_cache'][_0x4054fd]['includes'](_0x53d491);return this[_0x38f91e(0x1a6)][_0x4054fd]=this[_0x38f91e(0x3bf)](),this[_0x38f91e(0x1a6)][_0x4054fd]['includes'](_0x53d491);},Game_BattlerBase['prototype']['makeResistedStateCategories']=function(){const _0x3e090d=_0x4e163d,_0x561425=/<RESIST STATE (?:CATEGORY|CATEGORIES):[ ](.*)>/gi,_0x1ee51c=/<RESIST STATE (?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/RESIST STATE (?:CATEGORY|CATEGORIES)>/i;let _0x430405=[];for(const _0x51a6bd of this[_0x3e090d(0x1de)]()){if(!_0x51a6bd)continue;const _0x123259=_0x51a6bd[_0x3e090d(0x18e)],_0x5f93a=_0x123259['match'](_0x561425);if(_0x5f93a)for(const _0x3f8a75 of _0x5f93a){_0x3f8a75[_0x3e090d(0x253)](_0x561425);const _0x218120=String(RegExp['$1'])[_0x3e090d(0x1cd)](',')['map'](_0x1e5c5a=>String(_0x1e5c5a)[_0x3e090d(0x29c)]()[_0x3e090d(0x376)]());_0x430405=_0x430405[_0x3e090d(0x165)](_0x218120);}if(_0x123259[_0x3e090d(0x253)](_0x1ee51c)){const _0x444791=String(RegExp['$1'])[_0x3e090d(0x1cd)](/[\r\n]+/)[_0x3e090d(0x2d1)](_0x775ff6=>String(_0x775ff6)[_0x3e090d(0x29c)]()[_0x3e090d(0x376)]());_0x430405=_0x430405[_0x3e090d(0x165)](_0x444791);}}return _0x430405;},Game_BattlerBase['prototype'][_0x4e163d(0x30e)]=function(_0x564454){const _0x7f82a2=_0x4e163d,_0x59c83e=$dataStates[_0x564454];if(!_0x59c83e)return;const _0x9ad394=_0x59c83e['note']||'',_0x585d0a=_0x9ad394[_0x7f82a2(0x253)](/<REMOVE OTHER (.*) STATES>/gi);if(_0x585d0a){const _0x59f187=[_0x59c83e];for(const _0x5dc367 of _0x585d0a){_0x5dc367[_0x7f82a2(0x253)](/<REMOVE OTHER (.*) STATES>/i);const _0x53f91d=String(RegExp['$1']);this[_0x7f82a2(0x1b0)](_0x53f91d,_0x59f187);}}},Game_Battler[_0x4e163d(0x33f)][_0x4e163d(0x145)]=function(){const _0x4a3995=_0x4e163d;for(const _0x32fdbc of this[_0x4a3995(0x2b0)]()){if(!_0x32fdbc)continue;if(!this[_0x4a3995(0x2bc)](_0x32fdbc['id']))continue;if(!_0x32fdbc['removeByDamage'])continue;if(this['bypassRemoveStatesByDamage'](_0x32fdbc))continue;Math[_0x4a3995(0x18c)](0x64)<_0x32fdbc[_0x4a3995(0x3ce)]&&this[_0x4a3995(0x229)](_0x32fdbc['id']);}},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x3c7)]=Game_Action['prototype'][_0x4e163d(0x39e)],Game_Action[_0x4e163d(0x33f)]['executeHpDamage']=function(_0x2aec25,_0x41a42e){const _0x4901fb=_0x4e163d;$gameTemp[_0x4901fb(0x13e)]=this[_0x4901fb(0x227)](),$gameTemp['_bypassRemoveStateDamage_user']=this['subject'](),$gameTemp[_0x4901fb(0x390)]=_0x41a42e,VisuMZ[_0x4901fb(0x1b1)]['Game_Action_executeHpDamage_bypassStateDmgRemoval']['call'](this,_0x2aec25,_0x41a42e),$gameTemp[_0x4901fb(0x13e)]=undefined,$gameTemp[_0x4901fb(0x18a)]=undefined,$gameTemp[_0x4901fb(0x390)]=undefined;},Game_Battler[_0x4e163d(0x33f)][_0x4e163d(0x348)]=function(_0x57e67c){const _0x2baa6d=_0x4e163d;if($gameTemp[_0x2baa6d(0x13e)]){const _0x10a33c=$gameTemp[_0x2baa6d(0x13e)],_0x3cb7d5=/<BYPASS STATE DAMAGE REMOVAL:[ ](.*)>/gi;if(DataManager['CheckBypassRemoveStatesByDamage'](_0x57e67c,_0x10a33c,_0x3cb7d5,_0x2baa6d(0x2a2)))return!![];}if($gameTemp[_0x2baa6d(0x18a)]){const _0x4b0fd1=$gameTemp[_0x2baa6d(0x18a)];if(_0x4b0fd1[_0x2baa6d(0x312)](_0x57e67c))return!![];}if(this[_0x2baa6d(0x1f7)](_0x57e67c))return!![];return![];},Game_Battler['prototype'][_0x4e163d(0x312)]=function(_0x3a223b){const _0xf4fe33=_0x4e163d,_0x1098dd=/<BYPASS STATE DAMAGE REMOVAL AS (?:ATTACKER|USER):[ ](.*)>/gi;for(const _0x680bf4 of this['traitObjects']()){if(!_0x680bf4)continue;if(DataManager[_0xf4fe33(0x2f2)](_0x3a223b,_0x680bf4,_0x1098dd,'attacker'))return!![];}return![];},Game_Battler[_0x4e163d(0x33f)][_0x4e163d(0x1f7)]=function(_0x42bf3e){const _0x516fc4=_0x4e163d,_0x158dc4=/<BYPASS STATE DAMAGE REMOVAL AS (?:TARGET|VICTIM):[ ](.*)>/gi;for(const _0x4a6434 of this['traitObjects']()){if(!_0x4a6434)continue;if(DataManager[_0x516fc4(0x2f2)](_0x42bf3e,_0x4a6434,_0x158dc4,_0x516fc4(0x37e)))return!![];}return![];},DataManager['CheckBypassRemoveStatesByDamage']=function(_0xcad38,_0x40fe3b,_0x21e029,_0x543134){const _0xe6e981=_0x4e163d,_0xde6f71='%1-%2-%3'[_0xe6e981(0x29e)](_0x40fe3b[_0xe6e981(0x365)],_0x40fe3b['id'],_0x543134);this[_0xe6e981(0x3ea)]=this['_cache_CheckBypassRemoveStatesByDamage']||{};if(this[_0xe6e981(0x3ea)][_0xde6f71]!==undefined)return this[_0xe6e981(0x3ea)][_0xde6f71][_0xe6e981(0x30f)](_0xcad38['id']);const _0x172be0=[],_0x3c72eb=_0x40fe3b[_0xe6e981(0x18e)][_0xe6e981(0x253)](_0x21e029);if(_0x3c72eb)for(const _0x373a12 of _0x3c72eb){_0x373a12[_0xe6e981(0x253)](_0x21e029);const _0x21870a=String(RegExp['$1'])[_0xe6e981(0x1cd)](',')[_0xe6e981(0x2d1)](_0x1256e6=>_0x1256e6[_0xe6e981(0x376)]());for(let _0x161afc of _0x21870a){_0x161afc=(String(_0x161afc)||'')[_0xe6e981(0x376)]();if(_0x161afc[_0xe6e981(0x253)](/(\d+)[ ](?:THROUGH|to)[ ](\d+)/i)){const _0x3c0700=Math['min'](Number(RegExp['$1']),Number(RegExp['$2'])),_0x38fa7f=Math[_0xe6e981(0x36f)](Number(RegExp['$1']),Number(RegExp['$2']));for(let _0x557b81=_0x3c0700;_0x557b81<=_0x38fa7f;_0x557b81++)elements[_0xe6e981(0x319)](_0x557b81);continue;}const _0x127269=/^\d+$/[_0xe6e981(0x360)](_0x161afc);_0x127269?entryID=Number(_0x161afc):entryID=DataManager[_0xe6e981(0x2bf)](_0x161afc),entryID&&_0x172be0[_0xe6e981(0x319)](entryID);}}return this[_0xe6e981(0x3ea)][_0xde6f71]=_0x172be0,this[_0xe6e981(0x3ea)][_0xde6f71][_0xe6e981(0x30f)](_0xcad38['id']);},VisuMZ['SkillsStatesCore'][_0x4e163d(0x2c8)]=Game_Battler[_0x4e163d(0x33f)][_0x4e163d(0x291)],Game_Battler['prototype'][_0x4e163d(0x291)]=function(_0x258171,_0x3132d6){const _0x22dc5c=_0x4e163d;VisuMZ[_0x22dc5c(0x1b1)][_0x22dc5c(0x2c8)][_0x22dc5c(0x3d8)](this,_0x258171,_0x3132d6),this[_0x22dc5c(0x137)](_0x258171)&&this[_0x22dc5c(0x330)](_0x258171,_0x3132d6);},Game_Battler[_0x4e163d(0x33f)][_0x4e163d(0x248)]=function(_0x305668){},VisuMZ[_0x4e163d(0x1b1)]['Game_Battler_addDebuff']=Game_Battler[_0x4e163d(0x33f)][_0x4e163d(0x2eb)],Game_Battler[_0x4e163d(0x33f)]['addDebuff']=function(_0x2bd6b1,_0x273f14){const _0x300f2d=_0x4e163d;VisuMZ[_0x300f2d(0x1b1)]['Game_Battler_addDebuff'][_0x300f2d(0x3d8)](this,_0x2bd6b1,_0x273f14),this[_0x300f2d(0x1cc)](_0x2bd6b1)&&this[_0x300f2d(0x408)](_0x2bd6b1,_0x273f14);},Game_Battler[_0x4e163d(0x33f)][_0x4e163d(0x302)]=function(){const _0x2e5d8b=_0x4e163d;for(let _0x3ccd78=0x0;_0x3ccd78<this[_0x2e5d8b(0x168)]();_0x3ccd78++){if(this[_0x2e5d8b(0x144)](_0x3ccd78)){const _0x34dd6c=this[_0x2e5d8b(0x3fa)][_0x3ccd78];this[_0x2e5d8b(0x2ed)](_0x3ccd78);if(_0x34dd6c>0x0)this[_0x2e5d8b(0x1dd)](_0x3ccd78);if(_0x34dd6c<0x0)this[_0x2e5d8b(0x249)](_0x3ccd78);}}},Game_Battler['prototype'][_0x4e163d(0x330)]=function(_0x561af1,_0x27dcc4){const _0x570092=_0x4e163d;this[_0x570092(0x3f1)](_0x561af1,_0x27dcc4);},Game_Battler['prototype'][_0x4e163d(0x408)]=function(_0x29fb40,_0x228f9d){const _0x4c67f9=_0x4e163d;this[_0x4c67f9(0x3b1)](_0x29fb40,_0x228f9d);},Game_Battler[_0x4e163d(0x33f)][_0x4e163d(0x342)]=function(_0x5654a0){const _0x419c7c=_0x4e163d;Game_BattlerBase['prototype'][_0x419c7c(0x342)][_0x419c7c(0x3d8)](this,_0x5654a0),this[_0x419c7c(0x1fc)](_0x5654a0);},Game_Battler[_0x4e163d(0x33f)]['onEraseDebuff']=function(_0x2e589a){const _0x4008ff=_0x4e163d;Game_BattlerBase[_0x4008ff(0x33f)][_0x4008ff(0x3a8)][_0x4008ff(0x3d8)](this,_0x2e589a),this[_0x4008ff(0x1a0)](_0x2e589a);},Game_Battler['prototype'][_0x4e163d(0x1dd)]=function(_0x4cb3ca){const _0x3dc4df=_0x4e163d;this[_0x3dc4df(0x173)](_0x4cb3ca);},Game_Battler[_0x4e163d(0x33f)][_0x4e163d(0x249)]=function(_0x5f1c53){const _0x2ef5cb=_0x4e163d;this[_0x2ef5cb(0x146)](_0x5f1c53);},Game_Battler[_0x4e163d(0x33f)][_0x4e163d(0x3f1)]=function(_0x3c812a,_0x9e06aa){const _0x660460=_0x4e163d;VisuMZ[_0x660460(0x1b1)]['Settings'][_0x660460(0x2b5)]['onAddBuffJS'][_0x660460(0x3d8)](this,_0x3c812a,_0x9e06aa);},Game_Battler['prototype'][_0x4e163d(0x3b1)]=function(_0x3b2b2f,_0x2243c7){const _0x51f9a4=_0x4e163d;VisuMZ[_0x51f9a4(0x1b1)][_0x51f9a4(0x362)][_0x51f9a4(0x2b5)][_0x51f9a4(0x272)][_0x51f9a4(0x3d8)](this,_0x3b2b2f,_0x2243c7);},Game_BattlerBase['prototype'][_0x4e163d(0x1fc)]=function(_0x200339){const _0xe5db83=_0x4e163d;VisuMZ[_0xe5db83(0x1b1)]['Settings']['Buffs'][_0xe5db83(0x2bb)][_0xe5db83(0x3d8)](this,_0x200339);},Game_BattlerBase[_0x4e163d(0x33f)]['onEraseDebuffGlobalJS']=function(_0x4375e8){const _0x6e4372=_0x4e163d;VisuMZ[_0x6e4372(0x1b1)]['Settings'][_0x6e4372(0x2b5)]['onEraseDebuffJS'][_0x6e4372(0x3d8)](this,_0x4375e8);},Game_Battler[_0x4e163d(0x33f)][_0x4e163d(0x173)]=function(_0x1083e8){const _0x2ba9ee=_0x4e163d;VisuMZ[_0x2ba9ee(0x1b1)]['Settings']['Buffs'][_0x2ba9ee(0x27d)][_0x2ba9ee(0x3d8)](this,_0x1083e8);},Game_Battler['prototype'][_0x4e163d(0x146)]=function(_0x332ce3){const _0x4d2489=_0x4e163d;VisuMZ[_0x4d2489(0x1b1)][_0x4d2489(0x362)][_0x4d2489(0x2b5)][_0x4d2489(0x371)][_0x4d2489(0x3d8)](this,_0x332ce3);},Game_Battler[_0x4e163d(0x33f)][_0x4e163d(0x2ba)]=function(_0xa4fdaf){const _0x45153b=_0x4e163d,_0x38bd9e=VisuMZ['SkillsStatesCore'],_0x2bdb36=['stateHpSlipDamageJS',_0x45153b(0x188),_0x45153b(0x138),'stateMpSlipHealJS',_0x45153b(0x2a3),_0x45153b(0x270)];for(const _0x2966e8 of _0x2bdb36){_0x38bd9e[_0x2966e8][_0xa4fdaf]&&_0x38bd9e[_0x2966e8][_0xa4fdaf][_0x45153b(0x3d8)](this,_0xa4fdaf);}},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x247)]=Game_Battler[_0x4e163d(0x33f)][_0x4e163d(0x364)],Game_Battler[_0x4e163d(0x33f)][_0x4e163d(0x364)]=function(){const _0x564be5=_0x4e163d;this[_0x564be5(0x1c3)](),VisuMZ[_0x564be5(0x1b1)][_0x564be5(0x247)][_0x564be5(0x3d8)](this),this['setPassiveStateSlipDamageJS'](),this[_0x564be5(0x25d)]();},Game_Battler[_0x4e163d(0x33f)][_0x4e163d(0x1bf)]=function(){const _0x33cbca=_0x4e163d;for(const _0x3b0660 of this[_0x33cbca(0x387)]()){if(!_0x3b0660)continue;this[_0x33cbca(0x2ba)](_0x3b0660['id']);}},Game_Battler[_0x4e163d(0x33f)]['recalculateSlipDamageJS']=function(){const _0x5e3ca3=_0x4e163d;for(const _0x4786ca of this[_0x5e3ca3(0x2b0)]()){if(!_0x4786ca)continue;_0x4786ca[_0x5e3ca3(0x18e)][_0x5e3ca3(0x253)](/<JS SLIP REFRESH>/i)&&this[_0x5e3ca3(0x2ba)](_0x4786ca['id']);}},Game_Battler[_0x4e163d(0x33f)][_0x4e163d(0x25d)]=function(){const _0x2673f1=_0x4e163d;if(!this[_0x2673f1(0x3ee)]())return;const _0x25c227=this['states']();for(const _0x2eafce of _0x25c227){if(!_0x2eafce)continue;this[_0x2673f1(0x400)](_0x2eafce);}},Game_Battler[_0x4e163d(0x33f)][_0x4e163d(0x400)]=function(_0x3087c9){const _0xa4c4fc=_0x4e163d,_0x3cd280=this['getStateData'](_0x3087c9['id'],_0xa4c4fc(0x287))||0x0,_0x49e479=-this[_0xa4c4fc(0x14b)](),_0x10e7ee=Math['max'](_0x3cd280,_0x49e479);if(_0x10e7ee!==0x0){const _0x26c404=this[_0xa4c4fc(0x26e)][_0xa4c4fc(0x2d0)]||0x0;this[_0xa4c4fc(0x334)](_0x10e7ee),this[_0xa4c4fc(0x26e)][_0xa4c4fc(0x2d0)]+=_0x26c404;}const _0xa35d6b=this[_0xa4c4fc(0x217)](_0x3087c9['id'],'slipMp')||0x0;if(_0xa35d6b!==0x0){const _0xcd1c40=this[_0xa4c4fc(0x26e)]['mpDamage']||0x0;this[_0xa4c4fc(0x18d)](_0xa35d6b),this['_result'][_0xa4c4fc(0x347)]+=_0xcd1c40;}const _0x5b9bda=this[_0xa4c4fc(0x217)](_0x3087c9['id'],_0xa4c4fc(0x2f5))||0x0;_0x5b9bda!==0x0&&this[_0xa4c4fc(0x23f)](_0x5b9bda);},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x1ce)]=Game_Actor['prototype'][_0x4e163d(0x327)],Game_Actor[_0x4e163d(0x33f)]['skillTypes']=function(){const _0x1e65d2=_0x4e163d,_0x4e6490=VisuMZ[_0x1e65d2(0x1b1)][_0x1e65d2(0x1ce)][_0x1e65d2(0x3d8)](this),_0x19b9e3=VisuMZ[_0x1e65d2(0x1b1)][_0x1e65d2(0x362)]['Skills'];let _0x4c8e4a=_0x19b9e3[_0x1e65d2(0x35e)];return $gameParty[_0x1e65d2(0x1a8)]()&&(_0x4c8e4a=_0x4c8e4a['concat'](_0x19b9e3[_0x1e65d2(0x3a5)])),_0x4e6490[_0x1e65d2(0x326)](_0x45f648=>!_0x4c8e4a[_0x1e65d2(0x30f)](_0x45f648));},Game_Actor[_0x4e163d(0x33f)][_0x4e163d(0x15d)]=function(){const _0x11fd7b=_0x4e163d;return this[_0x11fd7b(0x1e7)]()['filter'](_0x5170c5=>this[_0x11fd7b(0x27f)](_0x5170c5));},Game_Actor[_0x4e163d(0x33f)]['isSkillUsableForAutoBattle']=function(_0x2bf433){const _0x491831=_0x4e163d;if(!this[_0x491831(0x34c)](_0x2bf433))return![];if(!_0x2bf433)return![];if(!this['isSkillTypeMatchForUse'](_0x2bf433))return![];if(this[_0x491831(0x3ac)](_0x2bf433))return![];return!![];},Game_Actor[_0x4e163d(0x33f)][_0x4e163d(0x2d7)]=function(_0x25ed5b){const _0x5cb52e=_0x4e163d,_0x4be0b7=this['skillTypes'](),_0x52e340=DataManager[_0x5cb52e(0x1f0)](_0x25ed5b),_0x3f91ae=_0x4be0b7[_0x5cb52e(0x326)](_0x540413=>_0x52e340[_0x5cb52e(0x30f)](_0x540413));return _0x3f91ae[_0x5cb52e(0x2c1)]>0x0;},Game_Actor[_0x4e163d(0x33f)]['isSkillHidden']=function(_0x50bc73){const _0x5eec94=_0x4e163d;if(!VisuMZ[_0x5eec94(0x1b1)][_0x5eec94(0x321)](this,_0x50bc73))return!![];if(!VisuMZ['SkillsStatesCore'][_0x5eec94(0x17f)](this,_0x50bc73))return!![];if(!VisuMZ[_0x5eec94(0x1b1)][_0x5eec94(0x20f)](this,_0x50bc73))return!![];return![];},Game_Actor[_0x4e163d(0x33f)][_0x4e163d(0x198)]=function(){const _0x31696f=_0x4e163d;let _0x308f8c=[this[_0x31696f(0x311)](),this[_0x31696f(0x3ef)]()];_0x308f8c=_0x308f8c[_0x31696f(0x165)](this[_0x31696f(0x338)]()[_0x31696f(0x326)](_0x430d4d=>_0x430d4d));for(const _0x44c15a of this[_0x31696f(0x328)]){const _0x4c2770=$dataSkills[_0x44c15a];if(!_0x4c2770)continue;_0x308f8c[_0x31696f(0x319)](_0x4c2770);}return _0x308f8c;},Game_Actor[_0x4e163d(0x33f)][_0x4e163d(0x161)]=function(){const _0x16f19a=_0x4e163d;Game_Battler[_0x16f19a(0x33f)][_0x16f19a(0x161)][_0x16f19a(0x3d8)](this);const _0x5f348b=VisuMZ[_0x16f19a(0x1b1)][_0x16f19a(0x362)][_0x16f19a(0x225)][_0x16f19a(0x3d2)];this['_cache']['passiveStates']=this[_0x16f19a(0x1a6)][_0x16f19a(0x387)][_0x16f19a(0x165)](_0x5f348b);},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x281)]=Game_Actor['prototype'][_0x4e163d(0x1be)],Game_Actor[_0x4e163d(0x33f)][_0x4e163d(0x1be)]=function(_0x6c6603){const _0x45f8d8=_0x4e163d;VisuMZ['SkillsStatesCore']['Game_Actor_learnSkill'][_0x45f8d8(0x3d8)](this,_0x6c6603),this[_0x45f8d8(0x1a6)]={},this[_0x45f8d8(0x387)]();},VisuMZ['SkillsStatesCore'][_0x4e163d(0x254)]=Game_Actor[_0x4e163d(0x33f)][_0x4e163d(0x356)],Game_Actor[_0x4e163d(0x33f)][_0x4e163d(0x356)]=function(_0x5ca49f){const _0x10fd17=_0x4e163d;VisuMZ[_0x10fd17(0x1b1)]['Game_Actor_forgetSkill'][_0x10fd17(0x3d8)](this,_0x5ca49f),this[_0x10fd17(0x1a6)]={},this[_0x10fd17(0x387)]();},Game_Actor[_0x4e163d(0x33f)][_0x4e163d(0x1bb)]=function(){const _0x18c56a=_0x4e163d;return VisuMZ[_0x18c56a(0x1b1)][_0x18c56a(0x362)][_0x18c56a(0x1eb)]['TurnEndOnMap']??0x14;},Game_Enemy['prototype'][_0x4e163d(0x198)]=function(){const _0x50af6c=_0x4e163d;let _0x330f8c=[this[_0x50af6c(0x237)]()];return _0x330f8c[_0x50af6c(0x165)](this[_0x50af6c(0x1e7)]());},Game_Enemy[_0x4e163d(0x33f)][_0x4e163d(0x161)]=function(){const _0x4bda3e=_0x4e163d;Game_Battler[_0x4bda3e(0x33f)]['addPassiveStatesByPluginParameters'][_0x4bda3e(0x3d8)](this);const _0x95b823=VisuMZ[_0x4bda3e(0x1b1)][_0x4bda3e(0x362)][_0x4bda3e(0x225)][_0x4bda3e(0x16e)];this[_0x4bda3e(0x1a6)][_0x4bda3e(0x387)]=this[_0x4bda3e(0x1a6)][_0x4bda3e(0x387)][_0x4bda3e(0x165)](_0x95b823);},Game_Enemy[_0x4e163d(0x33f)][_0x4e163d(0x1e7)]=function(){const _0x38bb74=_0x4e163d,_0x5c6e86=[];for(const _0x7f9780 of this[_0x38bb74(0x237)]()['actions']){const _0x4756d1=$dataSkills[_0x7f9780['skillId']];if(_0x4756d1&&!_0x5c6e86[_0x38bb74(0x30f)](_0x4756d1))_0x5c6e86[_0x38bb74(0x319)](_0x4756d1);}return _0x5c6e86;},Game_Enemy[_0x4e163d(0x33f)][_0x4e163d(0x232)]=function(_0x128059){const _0x114d8=_0x4e163d;return this[_0x114d8(0x2de)]($dataStates[_0x128059]);},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x19c)]=Game_Unit['prototype'][_0x4e163d(0x242)],Game_Unit[_0x4e163d(0x33f)]['isAllDead']=function(){const _0x13d276=_0x4e163d;if(this[_0x13d276(0x3dc)]())return!![];return VisuMZ['SkillsStatesCore'][_0x13d276(0x19c)][_0x13d276(0x3d8)](this);},Game_Unit[_0x4e163d(0x33f)]['isPartyAllAffectedByGroupDefeatStates']=function(){const _0x568b11=_0x4e163d,_0x49b46f=this[_0x568b11(0x15f)]();for(const _0x48519b of _0x49b46f){if(!_0x48519b['isGroupDefeatStateAffected']())return![];}return!![];},Game_Unit[_0x4e163d(0x33f)][_0x4e163d(0x3dd)]=function(){const _0x355c3c=_0x4e163d;for(const _0x199ee8 of this['members']()){if(!_0x199ee8)continue;_0x199ee8[_0x355c3c(0x3bb)]();}},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x29a)]=Game_Player[_0x4e163d(0x33f)][_0x4e163d(0x3bb)],Game_Player[_0x4e163d(0x33f)][_0x4e163d(0x3bb)]=function(){const _0x47c43f=_0x4e163d;VisuMZ['SkillsStatesCore'][_0x47c43f(0x29a)][_0x47c43f(0x3d8)](this),$gameParty[_0x47c43f(0x3dd)](),$gameParty[_0x47c43f(0x1a8)]()&&$gameTroop[_0x47c43f(0x3dd)]();},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x300)]=Game_Troop[_0x4e163d(0x33f)][_0x4e163d(0x37f)],Game_Troop['prototype'][_0x4e163d(0x37f)]=function(_0x4a1202){const _0x3e0fa9=_0x4e163d;VisuMZ[_0x3e0fa9(0x1b1)][_0x3e0fa9(0x300)][_0x3e0fa9(0x3d8)](this,_0x4a1202),this[_0x3e0fa9(0x2ad)]();},Game_Troop[_0x4e163d(0x33f)][_0x4e163d(0x2ad)]=function(){const _0x5c5180=_0x4e163d;this['_currentTroopUniqueID']=Graphics[_0x5c5180(0x2c6)];},Game_Troop[_0x4e163d(0x33f)][_0x4e163d(0x3c9)]=function(){const _0x2399fc=_0x4e163d;return this[_0x2399fc(0x306)]=this[_0x2399fc(0x306)]||Graphics[_0x2399fc(0x2c6)],this['_currentTroopUniqueID'];},Scene_Skill['prototype']['isBottomHelpMode']=function(){const _0x14129f=_0x4e163d;if(ConfigManager[_0x14129f(0x167)]&&ConfigManager[_0x14129f(0x1ff)]!==undefined)return ConfigManager[_0x14129f(0x1ff)];else{if(this['isUseSkillsStatesCoreUpdatedLayout']())return this[_0x14129f(0x1e8)]()[_0x14129f(0x253)](/LOWER/i);else Scene_ItemBase[_0x14129f(0x33f)][_0x14129f(0x24e)][_0x14129f(0x3d8)](this);}},Scene_Skill['prototype'][_0x4e163d(0x24e)]=function(){const _0xef83f2=_0x4e163d;if(ConfigManager[_0xef83f2(0x167)]&&ConfigManager['uiInputPosition']!==undefined)return ConfigManager['uiInputPosition'];else return this[_0xef83f2(0x3b8)]()?this[_0xef83f2(0x1e8)]()[_0xef83f2(0x253)](/RIGHT/i):Scene_ItemBase['prototype'][_0xef83f2(0x24e)][_0xef83f2(0x3d8)](this);},Scene_Skill[_0x4e163d(0x33f)][_0x4e163d(0x1e8)]=function(){const _0x2c1c41=_0x4e163d;return VisuMZ[_0x2c1c41(0x1b1)][_0x2c1c41(0x362)][_0x2c1c41(0x24c)][_0x2c1c41(0x1ae)];},Scene_Skill[_0x4e163d(0x33f)][_0x4e163d(0x1b9)]=function(){const _0x207b76=_0x4e163d;return this['_categoryWindow']&&this[_0x207b76(0x264)]['isUseModernControls']();},Scene_Skill[_0x4e163d(0x33f)][_0x4e163d(0x3b8)]=function(){const _0x11ace5=_0x4e163d;return VisuMZ[_0x11ace5(0x1b1)][_0x11ace5(0x362)][_0x11ace5(0x24c)]['EnableLayout'];},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x1c5)]=Scene_Skill[_0x4e163d(0x33f)][_0x4e163d(0x1a5)],Scene_Skill['prototype']['helpWindowRect']=function(){const _0x26d161=_0x4e163d;return this[_0x26d161(0x3b8)]()?this[_0x26d161(0x39f)]():VisuMZ['SkillsStatesCore'][_0x26d161(0x1c5)][_0x26d161(0x3d8)](this);},Scene_Skill['prototype'][_0x4e163d(0x39f)]=function(){const _0x63d908=_0x4e163d,_0x31f1a5=0x0,_0x3fe9a3=this[_0x63d908(0x2b1)](),_0x1a03c0=Graphics[_0x63d908(0x3f5)],_0x5b2586=this['helpAreaHeight']();return new Rectangle(_0x31f1a5,_0x3fe9a3,_0x1a03c0,_0x5b2586);},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x2e0)]=Scene_Skill[_0x4e163d(0x33f)]['skillTypeWindowRect'],Scene_Skill[_0x4e163d(0x33f)][_0x4e163d(0x1b7)]=function(){const _0xf531e9=_0x4e163d;return this[_0xf531e9(0x3b8)]()?this['skillTypeWindowRectSkillsStatesCore']():VisuMZ['SkillsStatesCore']['Scene_Skill_skillTypeWindowRect'][_0xf531e9(0x3d8)](this);},Scene_Skill['prototype'][_0x4e163d(0x2c7)]=function(){const _0x130c25=_0x4e163d;return VisuMZ[_0x130c25(0x1b1)][_0x130c25(0x362)][_0x130c25(0x24c)][_0x130c25(0x31e)]??Scene_MenuBase[_0x130c25(0x33f)]['mainCommandWidth'][_0x130c25(0x3d8)](this);},Scene_Skill['prototype']['skillTypeWindowRectSkillsStatesCore']=function(){const _0x11f050=_0x4e163d,_0x398750=this[_0x11f050(0x2c7)](),_0x1ea00f=this[_0x11f050(0x372)](0x3,!![]),_0xf1cd20=this[_0x11f050(0x24e)]()?Graphics[_0x11f050(0x3f5)]-_0x398750:0x0,_0x2b8454=this[_0x11f050(0x2ce)]();return new Rectangle(_0xf1cd20,_0x2b8454,_0x398750,_0x1ea00f);},VisuMZ['SkillsStatesCore'][_0x4e163d(0x33a)]=Scene_Skill[_0x4e163d(0x33f)][_0x4e163d(0x31f)],Scene_Skill[_0x4e163d(0x33f)]['statusWindowRect']=function(){const _0x4e4d72=_0x4e163d;return this[_0x4e4d72(0x3b8)]()?this[_0x4e4d72(0x192)]():VisuMZ[_0x4e4d72(0x1b1)][_0x4e4d72(0x33a)][_0x4e4d72(0x3d8)](this);},Scene_Skill[_0x4e163d(0x33f)]['statusWindowRectSkillsStatesCore']=function(){const _0x4af506=_0x4e163d,_0x380448=Graphics[_0x4af506(0x3f5)]-this[_0x4af506(0x2c7)](),_0x463997=this[_0x4af506(0x1b8)]['height'],_0x406af5=this['isRightInputMode']()?0x0:Graphics[_0x4af506(0x3f5)]-_0x380448,_0x559f70=this['mainAreaTop']();return new Rectangle(_0x406af5,_0x559f70,_0x380448,_0x463997);},VisuMZ[_0x4e163d(0x1b1)]['Scene_Skill_createItemWindow']=Scene_Skill[_0x4e163d(0x33f)][_0x4e163d(0x19f)],Scene_Skill[_0x4e163d(0x33f)][_0x4e163d(0x19f)]=function(){const _0x52bbc2=_0x4e163d;VisuMZ['SkillsStatesCore'][_0x52bbc2(0x1c2)][_0x52bbc2(0x3d8)](this),this['allowCreateShopStatusWindow']()&&this[_0x52bbc2(0x2e5)]();},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x2cf)]=Scene_Skill['prototype'][_0x4e163d(0x181)],Scene_Skill['prototype']['itemWindowRect']=function(){const _0x4ddbdf=_0x4e163d;if(this[_0x4ddbdf(0x3b8)]())return this[_0x4ddbdf(0x23a)]();else{const _0x29cc3e=VisuMZ[_0x4ddbdf(0x1b1)][_0x4ddbdf(0x2cf)][_0x4ddbdf(0x3d8)](this);return this['allowCreateShopStatusWindow']()&&this[_0x4ddbdf(0x3d7)]()&&(_0x29cc3e[_0x4ddbdf(0x1f1)]-=this[_0x4ddbdf(0x275)]()),_0x29cc3e;}},Scene_Skill[_0x4e163d(0x33f)][_0x4e163d(0x23a)]=function(){const _0x5314e2=_0x4e163d,_0x3c2b23=Graphics[_0x5314e2(0x3f5)]-this['shopStatusWidth'](),_0x22edae=this['mainAreaHeight']()-this[_0x5314e2(0x215)][_0x5314e2(0x344)],_0x101708=this['isRightInputMode']()?Graphics['boxWidth']-_0x3c2b23:0x0,_0x55185c=this[_0x5314e2(0x215)]['y']+this['_statusWindow'][_0x5314e2(0x344)];return new Rectangle(_0x101708,_0x55185c,_0x3c2b23,_0x22edae);},Scene_Skill[_0x4e163d(0x33f)][_0x4e163d(0x3e9)]=function(){const _0x502fa8=_0x4e163d;if(!Imported[_0x502fa8(0x1ca)])return![];else return this[_0x502fa8(0x3b8)]()?!![]:VisuMZ[_0x502fa8(0x1b1)][_0x502fa8(0x362)][_0x502fa8(0x24c)][_0x502fa8(0x3eb)];},Scene_Skill[_0x4e163d(0x33f)][_0x4e163d(0x3d7)]=function(){const _0x5a5aa0=_0x4e163d;return VisuMZ[_0x5a5aa0(0x1b1)]['Settings'][_0x5a5aa0(0x24c)][_0x5a5aa0(0x388)];},Scene_Skill['prototype']['createShopStatusWindow']=function(){const _0x5bfe03=_0x4e163d,_0x44b441=this[_0x5bfe03(0x27a)]();this[_0x5bfe03(0x201)]=new Window_ShopStatus(_0x44b441),this[_0x5bfe03(0x2da)](this['_shopStatusWindow']),this[_0x5bfe03(0x380)][_0x5bfe03(0x218)](this[_0x5bfe03(0x201)]);const _0x293030=VisuMZ[_0x5bfe03(0x1b1)][_0x5bfe03(0x362)]['Skills'][_0x5bfe03(0x13b)];this[_0x5bfe03(0x201)][_0x5bfe03(0x305)](_0x293030||0x0);},Scene_Skill[_0x4e163d(0x33f)][_0x4e163d(0x27a)]=function(){const _0x44fa5e=_0x4e163d;return this[_0x44fa5e(0x3b8)]()?this[_0x44fa5e(0x361)]():VisuMZ['SkillsStatesCore']['Settings'][_0x44fa5e(0x24c)]['SkillMenuStatusRect'][_0x44fa5e(0x3d8)](this);},Scene_Skill[_0x4e163d(0x33f)][_0x4e163d(0x361)]=function(){const _0x22bacc=_0x4e163d,_0x516166=this[_0x22bacc(0x275)](),_0x5ceeee=this[_0x22bacc(0x380)][_0x22bacc(0x344)],_0x3eb78e=this[_0x22bacc(0x24e)]()?0x0:Graphics[_0x22bacc(0x3f5)]-this['shopStatusWidth'](),_0x377ed=this[_0x22bacc(0x380)]['y'];return new Rectangle(_0x3eb78e,_0x377ed,_0x516166,_0x5ceeee);},Scene_Skill[_0x4e163d(0x33f)]['shopStatusWidth']=function(){const _0x5074f8=_0x4e163d;return Imported[_0x5074f8(0x1ca)]?Scene_Shop[_0x5074f8(0x33f)]['statusWidth']():0x0;},Scene_Skill['prototype'][_0x4e163d(0x176)]=function(){const _0x46b054=_0x4e163d;return this[_0x46b054(0x1b8)]&&this[_0x46b054(0x1b8)][_0x46b054(0x352)]?TextManager[_0x46b054(0x20e)]:'';},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x2aa)]=Sprite_Gauge[_0x4e163d(0x33f)][_0x4e163d(0x37d)],Sprite_Gauge[_0x4e163d(0x33f)][_0x4e163d(0x37d)]=function(){const _0x4b906e=_0x4e163d;VisuMZ[_0x4b906e(0x1b1)][_0x4b906e(0x2aa)][_0x4b906e(0x3d8)](this),this[_0x4b906e(0x392)]=null;},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x164)]=Sprite_Gauge[_0x4e163d(0x33f)][_0x4e163d(0x37f)],Sprite_Gauge[_0x4e163d(0x33f)][_0x4e163d(0x37f)]=function(_0x36fedb,_0x2682be){const _0x613371=_0x4e163d;this[_0x613371(0x241)](_0x36fedb,_0x2682be),_0x2682be=_0x2682be[_0x613371(0x26c)](),VisuMZ[_0x613371(0x1b1)][_0x613371(0x164)][_0x613371(0x3d8)](this,_0x36fedb,_0x2682be);},Sprite_Gauge['prototype'][_0x4e163d(0x241)]=function(_0x11e3a4,_0xcc0d2e){const _0x7df71a=_0x4e163d,_0x582d4a=VisuMZ[_0x7df71a(0x1b1)]['Settings'][_0x7df71a(0x2be)][_0x7df71a(0x326)](_0x33676b=>_0x33676b[_0x7df71a(0x19d)]['toUpperCase']()===_0xcc0d2e[_0x7df71a(0x29c)]());_0x582d4a[_0x7df71a(0x2c1)]>=0x1?this[_0x7df71a(0x392)]=_0x582d4a[0x0]:this[_0x7df71a(0x392)]=null;},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x38c)]=Sprite_Gauge[_0x4e163d(0x33f)][_0x4e163d(0x2ec)],Sprite_Gauge[_0x4e163d(0x33f)][_0x4e163d(0x2ec)]=function(){const _0x1d6699=_0x4e163d;return this[_0x1d6699(0x370)]&&this[_0x1d6699(0x392)]?this['currentValueSkillsStatesCore']():VisuMZ[_0x1d6699(0x1b1)][_0x1d6699(0x38c)][_0x1d6699(0x3d8)](this);},Sprite_Gauge[_0x4e163d(0x33f)][_0x4e163d(0x22f)]=function(){const _0x4a5827=_0x4e163d;return this[_0x4a5827(0x392)][_0x4a5827(0x3cb)][_0x4a5827(0x3d8)](this[_0x4a5827(0x370)]);},VisuMZ['SkillsStatesCore'][_0x4e163d(0x14c)]=Sprite_Gauge[_0x4e163d(0x33f)][_0x4e163d(0x3e1)],Sprite_Gauge[_0x4e163d(0x33f)][_0x4e163d(0x3e1)]=function(){const _0x355cd6=_0x4e163d;return this[_0x355cd6(0x370)]&&this[_0x355cd6(0x392)]?this[_0x355cd6(0x189)]():VisuMZ['SkillsStatesCore']['Sprite_Gauge_currentMaxValue'][_0x355cd6(0x3d8)](this);},Sprite_Gauge[_0x4e163d(0x33f)][_0x4e163d(0x189)]=function(){const _0x26ccc6=_0x4e163d;return this[_0x26ccc6(0x392)][_0x26ccc6(0x369)][_0x26ccc6(0x3d8)](this[_0x26ccc6(0x370)]);},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x2b2)]=Sprite_Gauge[_0x4e163d(0x33f)][_0x4e163d(0x158)],Sprite_Gauge['prototype'][_0x4e163d(0x158)]=function(){const _0x136820=_0x4e163d,_0x2b9916=VisuMZ['SkillsStatesCore'][_0x136820(0x2b2)]['call'](this);return _0x2b9916[_0x136820(0x228)](0x0,0x1);},VisuMZ['SkillsStatesCore']['Sprite_Gauge_redraw']=Sprite_Gauge[_0x4e163d(0x33f)]['redraw'],Sprite_Gauge[_0x4e163d(0x33f)][_0x4e163d(0x233)]=function(){const _0x4812f8=_0x4e163d;this[_0x4812f8(0x370)]&&this['_costSettings']?(this[_0x4812f8(0x166)][_0x4812f8(0x246)](),this[_0x4812f8(0x3a2)]()):VisuMZ['SkillsStatesCore']['Sprite_Gauge_redraw']['call'](this);},Sprite_Gauge['prototype']['currentDisplayedValue']=function(){const _0x3a1d1a=_0x4e163d;let _0x386cc8=this[_0x3a1d1a(0x2ec)]();return Imported[_0x3a1d1a(0x3b9)]&&this['useDigitGrouping']()&&(_0x386cc8=VisuMZ[_0x3a1d1a(0x406)](_0x386cc8)),_0x386cc8;},Sprite_Gauge[_0x4e163d(0x33f)][_0x4e163d(0x3a2)]=function(){const _0x375048=_0x4e163d;this[_0x375048(0x166)][_0x375048(0x246)](),this[_0x375048(0x392)][_0x375048(0x2ee)]['call'](this);},Sprite_Gauge[_0x4e163d(0x33f)][_0x4e163d(0x3b4)]=function(_0x436e0a,_0x1d5688,_0x5674a1,_0x28d1a2,_0x1d9ea1,_0xbb24e2){const _0x5e8256=_0x4e163d,_0x7c1761=this[_0x5e8256(0x158)](),_0x3f2438=Math[_0x5e8256(0x3ae)]((_0x1d9ea1-0x2)*_0x7c1761),_0x334ee0=_0xbb24e2-0x2,_0x14ed55=this[_0x5e8256(0x39d)]();this[_0x5e8256(0x166)]['fillRect'](_0x5674a1,_0x28d1a2,_0x1d9ea1,_0xbb24e2,_0x14ed55),this['bitmap'][_0x5e8256(0x187)](_0x5674a1+0x1,_0x28d1a2+0x1,_0x3f2438,_0x334ee0,_0x436e0a,_0x1d5688);},Sprite_Gauge[_0x4e163d(0x33f)]['labelFontFace']=function(){const _0x2e7352=_0x4e163d,_0x4ccbe0=VisuMZ[_0x2e7352(0x1b1)][_0x2e7352(0x362)][_0x2e7352(0x373)];return _0x4ccbe0['LabelFontMainType']===_0x2e7352(0x401)?$gameSystem[_0x2e7352(0x1df)]():$gameSystem['mainFontFace']();},Sprite_Gauge[_0x4e163d(0x33f)][_0x4e163d(0x363)]=function(){const _0x19db64=_0x4e163d,_0x50c456=VisuMZ[_0x19db64(0x1b1)][_0x19db64(0x362)][_0x19db64(0x373)];return _0x50c456[_0x19db64(0x1c4)]===_0x19db64(0x401)?$gameSystem[_0x19db64(0x23d)]()-0x6:$gameSystem['mainFontSize']()-0x2;},Sprite_Gauge[_0x4e163d(0x33f)][_0x4e163d(0x2e9)]=function(){const _0x48a2e4=_0x4e163d,_0x53a090=VisuMZ[_0x48a2e4(0x1b1)][_0x48a2e4(0x362)][_0x48a2e4(0x373)];return _0x53a090[_0x48a2e4(0x37b)]===_0x48a2e4(0x401)?$gameSystem[_0x48a2e4(0x1df)]():$gameSystem[_0x48a2e4(0x2ef)]();},Sprite_Gauge[_0x4e163d(0x33f)][_0x4e163d(0x2d8)]=function(){const _0x1369fa=_0x4e163d,_0x174514=VisuMZ['SkillsStatesCore'][_0x1369fa(0x362)][_0x1369fa(0x373)];return _0x174514[_0x1369fa(0x37b)]==='number'?$gameSystem[_0x1369fa(0x23d)]()-0x6:$gameSystem[_0x1369fa(0x23d)]()-0x2;},Sprite_Gauge[_0x4e163d(0x33f)][_0x4e163d(0x3fe)]=function(){const _0x451a5b=_0x4e163d,_0x53faa6=VisuMZ[_0x451a5b(0x1b1)][_0x451a5b(0x362)][_0x451a5b(0x373)];if(_0x53faa6[_0x451a5b(0x3cd)]){if(_0x53faa6[_0x451a5b(0x178)]===0x1)return this[_0x451a5b(0x2fe)]();else{if(_0x53faa6[_0x451a5b(0x178)]===0x2)return this['gaugeColor2']();}}const _0x1a038a=_0x53faa6[_0x451a5b(0x24b)];return ColorManager[_0x451a5b(0x292)](_0x1a038a);},Sprite_Gauge[_0x4e163d(0x33f)]['labelOutlineColor']=function(){const _0x51f4a7=_0x4e163d,_0x2b0e08=VisuMZ['SkillsStatesCore'][_0x51f4a7(0x362)][_0x51f4a7(0x373)];if(this[_0x51f4a7(0x3af)]()<=0x0)return _0x51f4a7(0x208);else return _0x2b0e08[_0x51f4a7(0x3e8)]?'rgba(0,\x200,\x200,\x201)':ColorManager[_0x51f4a7(0x169)]();},Sprite_Gauge['prototype'][_0x4e163d(0x3af)]=function(){const _0x4785d8=_0x4e163d;return VisuMZ[_0x4785d8(0x1b1)][_0x4785d8(0x362)]['Gauge'][_0x4785d8(0x1c6)]||0x0;},Sprite_Gauge[_0x4e163d(0x33f)][_0x4e163d(0x143)]=function(){const _0x165c5a=_0x4e163d,_0x4b6ba1=VisuMZ[_0x165c5a(0x1b1)][_0x165c5a(0x362)][_0x165c5a(0x373)];if(this[_0x165c5a(0x288)]()<=0x0)return _0x165c5a(0x208);else return _0x4b6ba1[_0x165c5a(0x3c1)]?'rgba(0,\x200,\x200,\x201)':ColorManager[_0x165c5a(0x169)]();},Sprite_Gauge[_0x4e163d(0x33f)][_0x4e163d(0x288)]=function(){const _0x53595b=_0x4e163d;return VisuMZ[_0x53595b(0x1b1)][_0x53595b(0x362)][_0x53595b(0x373)][_0x53595b(0x377)]||0x0;},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x3a1)]=Sprite_StateIcon[_0x4e163d(0x33f)][_0x4e163d(0x3e2)],Sprite_StateIcon['prototype']['loadBitmap']=function(){const _0x50f9a4=_0x4e163d;VisuMZ['SkillsStatesCore'][_0x50f9a4(0x3a1)][_0x50f9a4(0x3d8)](this),this[_0x50f9a4(0x182)]();},Sprite_StateIcon['prototype'][_0x4e163d(0x182)]=function(){const _0x4ee8e9=_0x4e163d,_0x50605c=Window_Base[_0x4ee8e9(0x33f)][_0x4ee8e9(0x22c)]();this['_turnDisplaySprite']=new Sprite(),this['_turnDisplaySprite'][_0x4ee8e9(0x166)]=new Bitmap(ImageManager[_0x4ee8e9(0x142)],_0x50605c),this['_turnDisplaySprite']['anchor']['x']=this[_0x4ee8e9(0x2b9)]['x'],this['_turnDisplaySprite']['anchor']['y']=this[_0x4ee8e9(0x2b9)]['y'],this['addChild'](this[_0x4ee8e9(0x343)]),this[_0x4ee8e9(0x243)]=this[_0x4ee8e9(0x343)][_0x4ee8e9(0x166)];},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x325)]=Sprite_StateIcon['prototype'][_0x4e163d(0x2d5)],Sprite_StateIcon[_0x4e163d(0x33f)][_0x4e163d(0x2d5)]=function(){const _0x423ce8=_0x4e163d;VisuMZ[_0x423ce8(0x1b1)][_0x423ce8(0x325)][_0x423ce8(0x3d8)](this),this[_0x423ce8(0x216)]();},Sprite_StateIcon[_0x4e163d(0x33f)]['drawText']=function(_0x491661,_0x22f430,_0xf51ebe,_0x27ac44,_0x315797){const _0x10e26a=_0x4e163d;this['contents'][_0x10e26a(0x141)](_0x491661,_0x22f430,_0xf51ebe,_0x27ac44,this['contents'][_0x10e26a(0x344)],_0x315797);},Sprite_StateIcon[_0x4e163d(0x33f)][_0x4e163d(0x216)]=function(){const _0x30e406=_0x4e163d;this[_0x30e406(0x323)](),this['contents']['clear']();const _0x1b2a15=this[_0x30e406(0x370)];if(!_0x1b2a15)return;const _0x3f6b8d=_0x1b2a15['states']()[_0x30e406(0x326)](_0xbb1ceb=>_0xbb1ceb[_0x30e406(0x3b6)]>0x0),_0xdae356=[...Array(0x8)[_0x30e406(0x33b)]()][_0x30e406(0x326)](_0x16bd94=>_0x1b2a15['buff'](_0x16bd94)!==0x0),_0x13e24c=this['_animationIndex'],_0x24783e=_0x3f6b8d[_0x13e24c];if(_0x24783e)Window_Base[_0x30e406(0x33f)][_0x30e406(0x31b)][_0x30e406(0x3d8)](this,_0x1b2a15,_0x24783e,0x0,0x0),Window_Base[_0x30e406(0x33f)][_0x30e406(0x2a0)][_0x30e406(0x3d8)](this,_0x1b2a15,_0x24783e,0x0,0x0);else{const _0x388ad1=_0xdae356[_0x13e24c-_0x3f6b8d[_0x30e406(0x2c1)]];if(_0x388ad1===undefined)return;Window_Base['prototype'][_0x30e406(0x368)][_0x30e406(0x3d8)](this,_0x1b2a15,_0x388ad1,0x0,0x0),Window_Base[_0x30e406(0x33f)][_0x30e406(0x14d)][_0x30e406(0x3d8)](this,_0x1b2a15,_0x388ad1,0x0,0x0);}},Sprite_StateIcon['prototype']['resetFontSettings']=function(){const _0x8a3e9e=_0x4e163d;this['contents']['fontFace']=$gameSystem['mainFontFace'](),this[_0x8a3e9e(0x243)][_0x8a3e9e(0x185)]=$gameSystem[_0x8a3e9e(0x23d)](),this[_0x8a3e9e(0x213)]();},Sprite_StateIcon['prototype'][_0x4e163d(0x213)]=function(){const _0x45767d=_0x4e163d;this[_0x45767d(0x139)](ColorManager[_0x45767d(0x341)]()),this[_0x45767d(0x172)](ColorManager['outlineColor']());},Sprite_StateIcon[_0x4e163d(0x33f)][_0x4e163d(0x139)]=function(_0x4a2c64){const _0x2830d0=_0x4e163d;this[_0x2830d0(0x243)][_0x2830d0(0x405)]=_0x4a2c64;},Sprite_StateIcon[_0x4e163d(0x33f)][_0x4e163d(0x172)]=function(_0x4ff49f){this['contents']['outlineColor']=_0x4ff49f;},Sprite_StateIcon[_0x4e163d(0x33f)]['hide']=function(){const _0x419b13=_0x4e163d;this[_0x419b13(0x1e4)]=!![],this['updateVisibility']();},Window_Base['prototype'][_0x4e163d(0x18f)]=function(_0x549bfc,_0x3c2d2d,_0x7f62bb,_0x5180cb,_0x1d4b97){const _0x407cb8=_0x4e163d,_0x1ce4b8=this[_0x407cb8(0x267)](_0x549bfc,_0x3c2d2d),_0x4318b2=this[_0x407cb8(0x1bd)](_0x1ce4b8,_0x7f62bb,_0x5180cb,_0x1d4b97),_0x216359=_0x7f62bb+_0x1d4b97-_0x4318b2['width'];this['drawTextEx'](_0x1ce4b8,_0x216359,_0x5180cb,_0x1d4b97),this[_0x407cb8(0x323)]();},Window_Base[_0x4e163d(0x33f)][_0x4e163d(0x267)]=function(_0x42f0dd,_0x12fb0b){const _0x293e35=_0x4e163d;let _0x21c107='';for(settings of VisuMZ[_0x293e35(0x1b1)]['Settings']['Costs']){if(!this[_0x293e35(0x1a9)](_0x42f0dd,_0x12fb0b,settings))continue;if(_0x21c107[_0x293e35(0x2c1)]>0x0)_0x21c107+=this[_0x293e35(0x1e3)]();_0x21c107+=this['createSkillCostText'](_0x42f0dd,_0x12fb0b,settings);}_0x21c107=this['makeAdditionalSkillCostText'](_0x42f0dd,_0x12fb0b,_0x21c107);if(_0x12fb0b[_0x293e35(0x18e)][_0x293e35(0x253)](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if(_0x21c107[_0x293e35(0x2c1)]>0x0)_0x21c107+=this[_0x293e35(0x1e3)]();_0x21c107+=String(RegExp['$1']);}return _0x21c107;},Window_Base['prototype'][_0x4e163d(0x3fb)]=function(_0x51fc77,_0x7e8d4b,_0x83f876){return _0x83f876;},Window_Base[_0x4e163d(0x33f)][_0x4e163d(0x1a9)]=function(_0x318854,_0x403af2,_0x2d8a85){const _0x7c3eac=_0x4e163d;let _0x4fa8f3=_0x2d8a85[_0x7c3eac(0x38d)][_0x7c3eac(0x3d8)](_0x318854,_0x403af2);return _0x4fa8f3=_0x318854['adjustSkillCost'](_0x403af2,_0x4fa8f3,_0x2d8a85),_0x2d8a85[_0x7c3eac(0x2d4)][_0x7c3eac(0x3d8)](_0x318854,_0x403af2,_0x4fa8f3,_0x2d8a85);},Window_Base[_0x4e163d(0x33f)][_0x4e163d(0x2ab)]=function(_0xfaaae1,_0x14e641,_0x464953){const _0xae3f43=_0x4e163d;let _0xfbfa6a=_0x464953['CalcJS'][_0xae3f43(0x3d8)](_0xfaaae1,_0x14e641);return _0xfbfa6a=_0xfaaae1[_0xae3f43(0x2d2)](_0x14e641,_0xfbfa6a,_0x464953),_0x464953['TextJS'][_0xae3f43(0x3d8)](_0xfaaae1,_0x14e641,_0xfbfa6a,_0x464953);},Window_Base[_0x4e163d(0x33f)][_0x4e163d(0x1e3)]=function(){return'\x20';},Window_Base[_0x4e163d(0x33f)][_0x4e163d(0x3e6)]=function(_0x26f88e,_0x2e471f,_0x5c9b0b,_0x3d870a){const _0x337245=_0x4e163d;if(!_0x26f88e)return;VisuMZ[_0x337245(0x1b1)][_0x337245(0x283)][_0x337245(0x3d8)](this,_0x26f88e,_0x2e471f,_0x5c9b0b,_0x3d870a),this[_0x337245(0x1c0)](_0x26f88e,_0x2e471f,_0x5c9b0b,_0x3d870a);},Window_Base[_0x4e163d(0x33f)][_0x4e163d(0x1c0)]=function(_0x5c1acc,_0x4aa63f,_0x1ec49f,_0x4e3b1a){const _0x18a62c=_0x4e163d;_0x4e3b1a=_0x4e3b1a||0x90;const _0x23b701=ImageManager[_0x18a62c(0x2b3)]||0x20,_0x3e89f2=ImageManager[_0x18a62c(0x191)]||0x20,_0x10e861=_0x23b701,_0x5ead63=_0x5c1acc[_0x18a62c(0x32a)]()['slice'](0x0,Math['floor'](_0x4e3b1a/_0x10e861)),_0x54ac09=_0x5c1acc[_0x18a62c(0x2b0)]()['filter'](_0x50abfe=>_0x50abfe['iconIndex']>0x0),_0x57205a=[...Array(0x8)[_0x18a62c(0x33b)]()]['filter'](_0x951e43=>_0x5c1acc[_0x18a62c(0x238)](_0x951e43)!==0x0),_0x233227=[];let _0x31dbbc=_0x4aa63f;for(let _0x115513=0x0;_0x115513<_0x5ead63[_0x18a62c(0x2c1)];_0x115513++){this[_0x18a62c(0x323)]();const _0x1069a=_0x54ac09[_0x115513];if(_0x1069a)!_0x233227[_0x18a62c(0x30f)](_0x1069a)&&this[_0x18a62c(0x31b)](_0x5c1acc,_0x1069a,_0x31dbbc,_0x1ec49f),this[_0x18a62c(0x2a0)](_0x5c1acc,_0x1069a,_0x31dbbc,_0x1ec49f),_0x233227[_0x18a62c(0x319)](_0x1069a);else{const _0x30b6b3=_0x57205a[_0x115513-_0x54ac09[_0x18a62c(0x2c1)]];this[_0x18a62c(0x368)](_0x5c1acc,_0x30b6b3,_0x31dbbc,_0x1ec49f),this['drawActorBuffRates'](_0x5c1acc,_0x30b6b3,_0x31dbbc,_0x1ec49f);}_0x31dbbc+=_0x10e861;}},Window_Base[_0x4e163d(0x33f)][_0x4e163d(0x31b)]=function(_0x1a0a6e,_0x32fe5b,_0x4a6309,_0x473fcf){const _0xb1216f=_0x4e163d;if(!VisuMZ[_0xb1216f(0x1b1)]['Settings'][_0xb1216f(0x1eb)][_0xb1216f(0x367)])return;if(!_0x1a0a6e[_0xb1216f(0x2bc)](_0x32fe5b['id']))return;if(_0x32fe5b['autoRemovalTiming']===0x0)return;if(_0x32fe5b[_0xb1216f(0x18e)]['match'](/<HIDE STATE TURNS>/i))return;const _0xa6fb62=ImageManager[_0xb1216f(0x2b3)]||0x20,_0x36a469=_0xa6fb62,_0x4e5d8e=_0x1a0a6e['stateTurns'](_0x32fe5b['id']),_0xa2464b=ColorManager['stateColor'](_0x32fe5b);this[_0xb1216f(0x139)](_0xa2464b),this[_0xb1216f(0x172)](_0xb1216f(0x177)),this['contents'][_0xb1216f(0x1cf)]=!![],this[_0xb1216f(0x243)][_0xb1216f(0x185)]=VisuMZ[_0xb1216f(0x1b1)]['Settings'][_0xb1216f(0x1eb)]['TurnFontSize'],_0x4a6309+=VisuMZ[_0xb1216f(0x1b1)][_0xb1216f(0x362)][_0xb1216f(0x1eb)][_0xb1216f(0x2c4)],_0x473fcf+=VisuMZ['SkillsStatesCore'][_0xb1216f(0x362)][_0xb1216f(0x1eb)][_0xb1216f(0x2df)],this[_0xb1216f(0x141)](_0x4e5d8e,_0x4a6309,_0x473fcf,_0x36a469,_0xb1216f(0x378)),this['contents'][_0xb1216f(0x1cf)]=![],this[_0xb1216f(0x323)]();},Window_Base[_0x4e163d(0x33f)]['drawActorStateData']=function(_0x5a75b3,_0x43fcef,_0x49f054,_0x80ef38){const _0x454bcf=_0x4e163d;if(!VisuMZ[_0x454bcf(0x1b1)][_0x454bcf(0x362)][_0x454bcf(0x1eb)][_0x454bcf(0x171)])return;const _0x373006=ImageManager[_0x454bcf(0x2b3)]||0x20,_0x355d76=ImageManager[_0x454bcf(0x191)]||0x20,_0x4bb050=_0x373006,_0x4de873=_0x355d76/0x2,_0x427eb5=ColorManager['normalColor']();this[_0x454bcf(0x139)](_0x427eb5),this[_0x454bcf(0x172)]('rgba(0,\x200,\x200,\x201)'),this[_0x454bcf(0x243)][_0x454bcf(0x1cf)]=!![],this[_0x454bcf(0x243)][_0x454bcf(0x185)]=VisuMZ[_0x454bcf(0x1b1)]['Settings']['States'][_0x454bcf(0x381)],_0x49f054+=VisuMZ[_0x454bcf(0x1b1)][_0x454bcf(0x362)][_0x454bcf(0x1eb)][_0x454bcf(0x2f1)],_0x80ef38+=VisuMZ['SkillsStatesCore'][_0x454bcf(0x362)]['States'][_0x454bcf(0x32f)];const _0x2ca020=String(_0x5a75b3[_0x454bcf(0x1ea)](_0x43fcef['id']));this[_0x454bcf(0x141)](_0x2ca020,_0x49f054,_0x80ef38,_0x4bb050,_0x454bcf(0x19b)),this[_0x454bcf(0x243)][_0x454bcf(0x1cf)]=![],this['resetFontSettings']();},Window_Base[_0x4e163d(0x33f)][_0x4e163d(0x368)]=function(_0x1b5472,_0x487487,_0x18ec63,_0x2378fb){const _0x5d308a=_0x4e163d;if(!VisuMZ['SkillsStatesCore']['Settings']['Buffs'][_0x5d308a(0x367)])return;const _0x32ec8f=_0x1b5472[_0x5d308a(0x238)](_0x487487);if(_0x32ec8f===0x0)return;const _0x393754=_0x1b5472['buffTurns'](_0x487487),_0x1b3ce7=ImageManager[_0x5d308a(0x142)],_0x3a8849=_0x32ec8f>0x0?ColorManager[_0x5d308a(0x149)]():ColorManager[_0x5d308a(0x3f9)]();this['changeTextColor'](_0x3a8849),this[_0x5d308a(0x172)](_0x5d308a(0x177)),this[_0x5d308a(0x243)][_0x5d308a(0x1cf)]=!![],this[_0x5d308a(0x243)]['fontSize']=VisuMZ[_0x5d308a(0x1b1)][_0x5d308a(0x362)]['Buffs'][_0x5d308a(0x3d5)],_0x18ec63+=VisuMZ[_0x5d308a(0x1b1)][_0x5d308a(0x362)][_0x5d308a(0x2b5)][_0x5d308a(0x2c4)],_0x2378fb+=VisuMZ['SkillsStatesCore'][_0x5d308a(0x362)][_0x5d308a(0x2b5)][_0x5d308a(0x2df)],this['drawText'](_0x393754,_0x18ec63,_0x2378fb,_0x1b3ce7,_0x5d308a(0x378)),this[_0x5d308a(0x243)][_0x5d308a(0x1cf)]=![],this[_0x5d308a(0x323)]();},Window_Base[_0x4e163d(0x33f)][_0x4e163d(0x14d)]=function(_0x3c4635,_0x40f73b,_0x190cf1,_0x254065){const _0x2442e7=_0x4e163d;if(!VisuMZ[_0x2442e7(0x1b1)][_0x2442e7(0x362)]['Buffs']['ShowData'])return;const _0xdd554c=_0x3c4635[_0x2442e7(0x210)](_0x40f73b),_0x2a169f=_0x3c4635['buff'](_0x40f73b),_0x4244f7=ImageManager[_0x2442e7(0x2b3)]||0x20,_0x2bb128=ImageManager[_0x2442e7(0x191)]||0x20,_0x1f0520=_0x4244f7,_0x2b8adf=_0x2bb128/0x2,_0x327b38=_0x2a169f>0x0?ColorManager['buffColor']():ColorManager[_0x2442e7(0x3f9)]();this[_0x2442e7(0x139)](_0x327b38),this['changeOutlineColor'](_0x2442e7(0x177)),this[_0x2442e7(0x243)][_0x2442e7(0x1cf)]=!![],this[_0x2442e7(0x243)][_0x2442e7(0x185)]=VisuMZ[_0x2442e7(0x1b1)][_0x2442e7(0x362)][_0x2442e7(0x2b5)][_0x2442e7(0x381)],_0x190cf1+=VisuMZ[_0x2442e7(0x1b1)]['Settings'][_0x2442e7(0x2b5)][_0x2442e7(0x2f1)],_0x254065+=VisuMZ[_0x2442e7(0x1b1)]['Settings'][_0x2442e7(0x2b5)]['DataOffsetY'];const _0x21363f='%1%'[_0x2442e7(0x29e)](Math['round'](_0xdd554c*0x64));this['drawText'](_0x21363f,_0x190cf1,_0x254065,_0x1f0520,_0x2442e7(0x19b)),this[_0x2442e7(0x243)][_0x2442e7(0x1cf)]=![],this[_0x2442e7(0x323)]();},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x404)]=Window_StatusBase[_0x4e163d(0x33f)][_0x4e163d(0x29f)],Window_StatusBase[_0x4e163d(0x33f)][_0x4e163d(0x29f)]=function(_0x221c78,_0x2e4514,_0x19a6d9,_0x3edd81){const _0xa78ff4=_0x4e163d;if(_0x221c78[_0xa78ff4(0x236)]())_0x2e4514=this['convertGaugeTypeSkillsStatesCore'](_0x221c78,_0x2e4514);this['placeExactGauge'](_0x221c78,_0x2e4514,_0x19a6d9,_0x3edd81);},Window_StatusBase['prototype'][_0x4e163d(0x1a7)]=function(_0x32f235,_0x5f589b,_0x56155e,_0x284d8d){const _0x8ca027=_0x4e163d;if([_0x8ca027(0x2a4),_0x8ca027(0x262)][_0x8ca027(0x30f)](_0x5f589b[_0x8ca027(0x26c)]()))return;VisuMZ[_0x8ca027(0x1b1)][_0x8ca027(0x404)]['call'](this,_0x32f235,_0x5f589b,_0x56155e,_0x284d8d);},Window_StatusBase[_0x4e163d(0x33f)][_0x4e163d(0x30a)]=function(_0x5bbbba,_0x2966b9){const _0x55d02b=_0x4e163d,_0x1a274a=_0x5bbbba[_0x55d02b(0x3ef)]()['note'];if(_0x2966b9==='hp'&&_0x1a274a[_0x55d02b(0x253)](/<REPLACE HP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x2966b9==='mp'&&_0x1a274a[_0x55d02b(0x253)](/<REPLACE MP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else return _0x2966b9==='tp'&&_0x1a274a['match'](/<REPLACE TP GAUGE:[ ](.*)>/i)?String(RegExp['$1']):_0x2966b9;}},VisuMZ['SkillsStatesCore']['Window_StatusBase_drawActorIcons']=Window_StatusBase[_0x4e163d(0x33f)][_0x4e163d(0x3e6)],Window_StatusBase[_0x4e163d(0x33f)][_0x4e163d(0x3e6)]=function(_0x476388,_0x221c8e,_0x2de445,_0x238a0a){const _0x4a19ec=_0x4e163d;if(!_0x476388)return;Window_Base[_0x4a19ec(0x33f)][_0x4a19ec(0x3e6)][_0x4a19ec(0x3d8)](this,_0x476388,_0x221c8e,_0x2de445,_0x238a0a);},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x2ac)]=Window_SkillType[_0x4e163d(0x33f)][_0x4e163d(0x32c)],Window_SkillType['prototype'][_0x4e163d(0x32c)]=function(_0x2fb099){const _0x398b6b=_0x4e163d;VisuMZ[_0x398b6b(0x1b1)][_0x398b6b(0x2ac)][_0x398b6b(0x3d8)](this,_0x2fb099),this[_0x398b6b(0x1f4)](_0x2fb099);},Window_SkillType[_0x4e163d(0x33f)][_0x4e163d(0x1f4)]=function(_0x1da3c2){const _0x1f394b=_0x4e163d,_0x4fe0c1=new Rectangle(0x0,0x0,_0x1da3c2[_0x1f394b(0x1f1)],_0x1da3c2['height']);this[_0x1f394b(0x153)]=new Window_Base(_0x4fe0c1),this[_0x1f394b(0x153)][_0x1f394b(0x294)]=0x0,this[_0x1f394b(0x35d)](this[_0x1f394b(0x153)]),this['updateCommandNameWindow']();},Window_SkillType['prototype'][_0x4e163d(0x2b8)]=function(){const _0x176cb2=_0x4e163d;Window_Command[_0x176cb2(0x33f)]['callUpdateHelp'][_0x176cb2(0x3d8)](this);if(this[_0x176cb2(0x153)])this[_0x176cb2(0x398)]();},Window_SkillType[_0x4e163d(0x33f)][_0x4e163d(0x398)]=function(){const _0x38fee3=_0x4e163d,_0x41407d=this[_0x38fee3(0x153)];_0x41407d['contents'][_0x38fee3(0x246)]();const _0x4bfa7c=this['commandStyleCheck'](this['index']());if(_0x4bfa7c===_0x38fee3(0x383)&&this[_0x38fee3(0x34f)]()>0x0){const _0x47c833=this[_0x38fee3(0x26f)](this[_0x38fee3(0x280)]());let _0x51ee89=this['commandName'](this['index']());_0x51ee89=_0x51ee89[_0x38fee3(0x3e0)](/\\I\[(\d+)\]/gi,''),_0x41407d['resetFontSettings'](),this[_0x38fee3(0x274)](_0x51ee89,_0x47c833),this[_0x38fee3(0x197)](_0x51ee89,_0x47c833),this['commandNameWindowCenter'](_0x51ee89,_0x47c833);}},Window_SkillType[_0x4e163d(0x33f)][_0x4e163d(0x274)]=function(_0x198bc5,_0x520c23){},Window_SkillType[_0x4e163d(0x33f)][_0x4e163d(0x197)]=function(_0x35cfa9,_0x2f8094){const _0x30fa9a=_0x4e163d,_0x357995=this['_commandNameWindow'];_0x357995['drawText'](_0x35cfa9,0x0,_0x2f8094['y'],_0x357995['innerWidth'],_0x30fa9a(0x19b));},Window_SkillType[_0x4e163d(0x33f)][_0x4e163d(0x20d)]=function(_0x4034d6,_0x5e0187){const _0x125f12=_0x4e163d,_0x1bef57=this[_0x125f12(0x153)],_0x1efcce=$gameSystem[_0x125f12(0x2e1)](),_0x543f22=_0x5e0187['x']+Math[_0x125f12(0x3ae)](_0x5e0187[_0x125f12(0x1f1)]/0x2)+_0x1efcce;_0x1bef57['x']=_0x1bef57[_0x125f12(0x1f1)]/-0x2+_0x543f22,_0x1bef57['y']=Math[_0x125f12(0x3ae)](_0x5e0187[_0x125f12(0x344)]/0x2);},Window_SkillType[_0x4e163d(0x33f)][_0x4e163d(0x1b9)]=function(){const _0x56ace9=_0x4e163d;return Imported[_0x56ace9(0x3b9)]&&Window_Command[_0x56ace9(0x33f)][_0x56ace9(0x1b9)][_0x56ace9(0x3d8)](this);},Window_SkillType[_0x4e163d(0x33f)][_0x4e163d(0x2db)]=function(){const _0x204c1a=_0x4e163d;if(!this['_actor'])return;const _0x3c622d=this[_0x204c1a(0x266)][_0x204c1a(0x327)]();for(const _0x52e1d9 of _0x3c622d){const _0xa0dd98=this[_0x204c1a(0x27e)](_0x52e1d9);this[_0x204c1a(0x16b)](_0xa0dd98,'skill',!![],_0x52e1d9);}},Window_SkillType[_0x4e163d(0x33f)][_0x4e163d(0x27e)]=function(_0x50c637){const _0x26cbd3=_0x4e163d;let _0x1dcbdc=$dataSystem[_0x26cbd3(0x327)][_0x50c637];if(_0x1dcbdc[_0x26cbd3(0x253)](/\\I\[(\d+)\]/i))return _0x1dcbdc;if(this[_0x26cbd3(0x1ec)]()===_0x26cbd3(0x245))return _0x1dcbdc;const _0x2ca9c8=VisuMZ[_0x26cbd3(0x1b1)][_0x26cbd3(0x362)][_0x26cbd3(0x24c)],_0x5a7717=$dataSystem['magicSkills'][_0x26cbd3(0x30f)](_0x50c637),_0xb7dbca=_0x5a7717?_0x2ca9c8[_0x26cbd3(0x21f)]:_0x2ca9c8[_0x26cbd3(0x21b)];return'\x5cI[%1]%2'[_0x26cbd3(0x29e)](_0xb7dbca,_0x1dcbdc);},Window_SkillType[_0x4e163d(0x33f)][_0x4e163d(0x33d)]=function(){const _0x383566=_0x4e163d;return VisuMZ[_0x383566(0x1b1)][_0x383566(0x362)]['Skills'][_0x383566(0x196)];},Window_SkillType[_0x4e163d(0x33f)]['drawItem']=function(_0x221855){const _0xeaed66=_0x4e163d,_0x1c220b=this[_0xeaed66(0x3ed)](_0x221855);if(_0x1c220b===_0xeaed66(0x1f5))this['drawItemStyleIconText'](_0x221855);else _0x1c220b==='icon'?this['drawItemStyleIcon'](_0x221855):Window_Command[_0xeaed66(0x33f)]['drawItem']['call'](this,_0x221855);},Window_SkillType['prototype'][_0x4e163d(0x1ec)]=function(){const _0x19aa00=_0x4e163d;return VisuMZ[_0x19aa00(0x1b1)][_0x19aa00(0x362)][_0x19aa00(0x24c)][_0x19aa00(0x269)];},Window_SkillType[_0x4e163d(0x33f)][_0x4e163d(0x3ed)]=function(_0x290e9a){const _0x5d98de=_0x4e163d;if(_0x290e9a<0x0)return _0x5d98de(0x245);const _0xffcd6f=this[_0x5d98de(0x1ec)]();if(_0xffcd6f!=='auto')return _0xffcd6f;else{if(this[_0x5d98de(0x34f)]()>0x0){const _0x4842be=this[_0x5d98de(0x1da)](_0x290e9a);if(_0x4842be[_0x5d98de(0x253)](/\\I\[(\d+)\]/i)){const _0x54c3ef=this['itemLineRect'](_0x290e9a),_0x1d4e75=this[_0x5d98de(0x1bd)](_0x4842be)[_0x5d98de(0x1f1)];return _0x1d4e75<=_0x54c3ef['width']?'iconText':_0x5d98de(0x383);}}}return'text';},Window_SkillType[_0x4e163d(0x33f)]['drawItemStyleIconText']=function(_0x49bf1c){const _0x32d6c9=_0x4e163d,_0x3dcfad=this[_0x32d6c9(0x26f)](_0x49bf1c),_0x35881c=this['commandName'](_0x49bf1c),_0x2ad287=this[_0x32d6c9(0x1bd)](_0x35881c)[_0x32d6c9(0x1f1)];this[_0x32d6c9(0x357)](this['isCommandEnabled'](_0x49bf1c));const _0x13e515=this[_0x32d6c9(0x33d)]();if(_0x13e515==='right')this[_0x32d6c9(0x194)](_0x35881c,_0x3dcfad['x']+_0x3dcfad['width']-_0x2ad287,_0x3dcfad['y'],_0x2ad287);else{if(_0x13e515===_0x32d6c9(0x19b)){const _0x29bf66=_0x3dcfad['x']+Math[_0x32d6c9(0x3ae)]((_0x3dcfad['width']-_0x2ad287)/0x2);this['drawTextEx'](_0x35881c,_0x29bf66,_0x3dcfad['y'],_0x2ad287);}else this[_0x32d6c9(0x194)](_0x35881c,_0x3dcfad['x'],_0x3dcfad['y'],_0x2ad287);}},Window_SkillType[_0x4e163d(0x33f)]['drawItemStyleIcon']=function(_0x15c6f4){const _0x29d1fe=_0x4e163d;this[_0x29d1fe(0x1da)](_0x15c6f4)[_0x29d1fe(0x253)](/\\I\[(\d+)\]/i);const _0x254a1c=Number(RegExp['$1'])||0x0,_0x4cd1c4=this['itemLineRect'](_0x15c6f4),_0x30dcd0=_0x4cd1c4['x']+Math[_0x29d1fe(0x3ae)]((_0x4cd1c4[_0x29d1fe(0x1f1)]-ImageManager[_0x29d1fe(0x142)])/0x2),_0x2d435e=_0x4cd1c4['y']+(_0x4cd1c4['height']-ImageManager[_0x29d1fe(0x3c4)])/0x2;this[_0x29d1fe(0x366)](_0x254a1c,_0x30dcd0,_0x2d435e);},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x16c)]=Window_SkillStatus[_0x4e163d(0x33f)][_0x4e163d(0x3bb)],Window_SkillStatus[_0x4e163d(0x33f)][_0x4e163d(0x3bb)]=function(){const _0x64d534=_0x4e163d;VisuMZ[_0x64d534(0x1b1)][_0x64d534(0x16c)]['call'](this);if(this[_0x64d534(0x266)])this[_0x64d534(0x2fc)]();},Window_SkillStatus[_0x4e163d(0x33f)][_0x4e163d(0x2fc)]=function(){const _0x506971=_0x4e163d;if(!Imported['VisuMZ_0_CoreEngine'])return;if(!Imported[_0x506971(0x235)])return;const _0x4c4ead=this[_0x506971(0x152)]();let _0x375256=this[_0x506971(0x3a6)]()/0x2+0xb4+0xb4+0xb4,_0xd3b041=this[_0x506971(0x271)]-_0x375256-0x2;if(_0xd3b041>=0x12c){const _0x283962=VisuMZ[_0x506971(0x1e2)][_0x506971(0x362)][_0x506971(0x307)][_0x506971(0x329)],_0xf422ea=Math[_0x506971(0x3ae)](_0xd3b041/0x2)-0x18;let _0x3dbbc5=_0x375256,_0x2deee6=Math[_0x506971(0x3ae)]((this[_0x506971(0x345)]-Math['ceil'](_0x283962[_0x506971(0x2c1)]/0x2)*_0x4c4ead)/0x2),_0x391af7=0x0;for(const _0x6cd9ae of _0x283962){this['drawExtendedParameter'](_0x3dbbc5,_0x2deee6,_0xf422ea,_0x6cd9ae),_0x391af7++,_0x391af7%0x2===0x0?(_0x3dbbc5=_0x375256,_0x2deee6+=_0x4c4ead):_0x3dbbc5+=_0xf422ea+0x18;}}this[_0x506971(0x323)]();},Window_SkillStatus['prototype']['drawExtendedParameter']=function(_0x5cde67,_0x4fb5be,_0x20a99e,_0x1e61c3){const _0x569f66=_0x4e163d,_0x1c5f73=this[_0x569f66(0x152)]();this['resetFontSettings'](),this[_0x569f66(0x314)](_0x5cde67,_0x4fb5be,_0x20a99e,_0x1e61c3,!![]),this['resetTextColor'](),this['contents'][_0x569f66(0x185)]-=0x8;const _0x59d472=this[_0x569f66(0x266)]['paramValueByName'](_0x1e61c3,!![]);this[_0x569f66(0x243)][_0x569f66(0x141)](_0x59d472,_0x5cde67,_0x4fb5be,_0x20a99e,_0x1c5f73,'right');},VisuMZ[_0x4e163d(0x1b1)]['Window_SkillList_includes']=Window_SkillList[_0x4e163d(0x33f)][_0x4e163d(0x30f)],Window_SkillList[_0x4e163d(0x33f)][_0x4e163d(0x30f)]=function(_0x6e6137){const _0x2ff63c=_0x4e163d;if(this['_stypeId']<=0x0)return![];return this[_0x2ff63c(0x25a)](_0x6e6137);},VisuMZ['SkillsStatesCore'][_0x4e163d(0x2c9)]=Window_SkillList[_0x4e163d(0x33f)][_0x4e163d(0x3a3)],Window_SkillList[_0x4e163d(0x33f)][_0x4e163d(0x3a3)]=function(){const _0x9c074d=_0x4e163d;return SceneManager[_0x9c074d(0x1d0)][_0x9c074d(0x214)]===Scene_Battle?VisuMZ['SkillsStatesCore'][_0x9c074d(0x2c9)][_0x9c074d(0x3d8)](this):VisuMZ[_0x9c074d(0x1b1)]['Settings'][_0x9c074d(0x24c)][_0x9c074d(0x2bd)];},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x268)]=Window_SkillList['prototype'][_0x4e163d(0x251)],Window_SkillList['prototype']['setActor']=function(_0x32e96a){const _0x78053e=_0x4e163d,_0x482cae=this[_0x78053e(0x266)]!==_0x32e96a;VisuMZ[_0x78053e(0x1b1)][_0x78053e(0x268)][_0x78053e(0x3d8)](this,_0x32e96a),_0x482cae&&(this[_0x78053e(0x215)]&&this[_0x78053e(0x215)][_0x78053e(0x214)]===Window_ShopStatus&&this[_0x78053e(0x215)][_0x78053e(0x33c)](this[_0x78053e(0x25e)](0x0)));},Window_SkillList['prototype'][_0x4e163d(0x1e1)]=function(_0x485a08){const _0x88aed=_0x4e163d;if(this[_0x88aed(0x389)]===_0x485a08)return;if(!_0x485a08)return;this[_0x88aed(0x389)]=_0x485a08,this[_0x88aed(0x3bb)](),this[_0x88aed(0x26d)](0x0,0x0),this[_0x88aed(0x215)]&&this[_0x88aed(0x215)][_0x88aed(0x214)]===Window_ShopStatus&&this[_0x88aed(0x215)][_0x88aed(0x33c)](this[_0x88aed(0x25e)](0x0));},Window_SkillList[_0x4e163d(0x33f)][_0x4e163d(0x25a)]=function(_0x119b5c){const _0x242bd2=_0x4e163d;if(!_0x119b5c)return VisuMZ[_0x242bd2(0x1b1)][_0x242bd2(0x29d)]['call'](this,_0x119b5c);if(!this['checkSkillTypeMatch'](_0x119b5c))return![];if(!this[_0x242bd2(0x1ee)](_0x119b5c))return![];if(!this[_0x242bd2(0x154)](_0x119b5c))return![];return!![];},Window_SkillList[_0x4e163d(0x33f)][_0x4e163d(0x30d)]=function(_0x8f32c5){const _0x59ff76=_0x4e163d;return DataManager['getSkillTypes'](_0x8f32c5)[_0x59ff76(0x30f)](this['_stypeId']);},Window_SkillList[_0x4e163d(0x33f)][_0x4e163d(0x1ee)]=function(_0x113d4f){const _0x4fae6c=_0x4e163d;if(!VisuMZ[_0x4fae6c(0x1b1)][_0x4fae6c(0x321)](this[_0x4fae6c(0x266)],_0x113d4f))return![];if(!VisuMZ[_0x4fae6c(0x1b1)][_0x4fae6c(0x17f)](this[_0x4fae6c(0x266)],_0x113d4f))return![];if(!VisuMZ[_0x4fae6c(0x1b1)][_0x4fae6c(0x20f)](this['_actor'],_0x113d4f))return![];return!![];},VisuMZ[_0x4e163d(0x1b1)]['CheckVisibleBattleNotetags']=function(_0x999ab7,_0x4817cc){const _0x59a219=_0x4e163d,_0x5175ad=_0x4817cc['note'];if(_0x5175ad[_0x59a219(0x253)](/<HIDE IN BATTLE>/i)&&$gameParty[_0x59a219(0x1a8)]())return![];else return _0x5175ad[_0x59a219(0x253)](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty['inBattle']()?![]:!![];},VisuMZ[_0x4e163d(0x1b1)]['CheckVisibleSwitchNotetags']=function(_0x47c15c,_0x211095){const _0x209bad=_0x4e163d,_0x370325=_0x211095['note'];if(_0x370325['match'](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x175b7e=JSON[_0x209bad(0x3c6)]('['+RegExp['$1'][_0x209bad(0x253)](/\d+/g)+']');for(const _0x217d94 of _0x175b7e){if(!$gameSwitches[_0x209bad(0x257)](_0x217d94))return![];}return!![];}if(_0x370325[_0x209bad(0x253)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x459921=JSON[_0x209bad(0x3c6)]('['+RegExp['$1'][_0x209bad(0x253)](/\d+/g)+']');for(const _0x2b1b20 of _0x459921){if(!$gameSwitches[_0x209bad(0x257)](_0x2b1b20))return![];}return!![];}if(_0x370325[_0x209bad(0x253)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x558dc9=JSON[_0x209bad(0x3c6)]('['+RegExp['$1'][_0x209bad(0x253)](/\d+/g)+']');for(const _0x261303 of _0x558dc9){if($gameSwitches['value'](_0x261303))return!![];}return![];}if(_0x370325['match'](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x521969=JSON[_0x209bad(0x3c6)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x48e676 of _0x521969){if(!$gameSwitches[_0x209bad(0x257)](_0x48e676))return!![];}return![];}if(_0x370325[_0x209bad(0x253)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x575c64=JSON[_0x209bad(0x3c6)]('['+RegExp['$1'][_0x209bad(0x253)](/\d+/g)+']');for(const _0x5a274d of _0x575c64){if(!$gameSwitches['value'](_0x5a274d))return!![];}return![];}if(_0x370325[_0x209bad(0x253)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x34b3fc=JSON[_0x209bad(0x3c6)]('['+RegExp['$1'][_0x209bad(0x253)](/\d+/g)+']');for(const _0x5a388e of _0x34b3fc){if($gameSwitches[_0x209bad(0x257)](_0x5a388e))return![];}return!![];}return!![];},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x20f)]=function(_0x4df0f4,_0x4edc75){const _0xc01e96=_0x4e163d,_0x367272=_0x4edc75['note'];if(_0x367272[_0xc01e96(0x253)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3f9d47=JSON['parse']('['+RegExp['$1'][_0xc01e96(0x253)](/\d+/g)+']');for(const _0x490ab0 of _0x3f9d47){if(!_0x4df0f4['isLearnedSkill'](_0x490ab0))return![];}return!![];}else{if(_0x367272[_0xc01e96(0x253)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x450e3a=RegExp['$1'][_0xc01e96(0x1cd)](',');for(const _0x14679c of _0x450e3a){const _0x2f03e1=DataManager[_0xc01e96(0x29b)](_0x14679c);if(!_0x2f03e1)continue;if(!_0x4df0f4[_0xc01e96(0x403)](_0x2f03e1))return![];}return!![];}}if(_0x367272['match'](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x32efcd=JSON[_0xc01e96(0x3c6)]('['+RegExp['$1'][_0xc01e96(0x253)](/\d+/g)+']');for(const _0x1d4548 of _0x32efcd){if(!_0x4df0f4[_0xc01e96(0x403)](_0x1d4548))return![];}return!![];}else{if(_0x367272[_0xc01e96(0x253)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x5cc63d=RegExp['$1'][_0xc01e96(0x1cd)](',');for(const _0x1af70e of _0x5cc63d){const _0x5ca044=DataManager[_0xc01e96(0x29b)](_0x1af70e);if(!_0x5ca044)continue;if(!_0x4df0f4[_0xc01e96(0x403)](_0x5ca044))return![];}return!![];}}if(_0x367272['match'](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x13f49f=JSON[_0xc01e96(0x3c6)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x1e4a17 of _0x13f49f){if(_0x4df0f4[_0xc01e96(0x403)](_0x1e4a17))return!![];}return![];}else{if(_0x367272[_0xc01e96(0x253)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x215d48=RegExp['$1'][_0xc01e96(0x1cd)](',');for(const _0x6a3871 of _0x215d48){const _0x31f93b=DataManager[_0xc01e96(0x29b)](_0x6a3871);if(!_0x31f93b)continue;if(_0x4df0f4['isLearnedSkill'](_0x31f93b))return!![];}return![];}}if(_0x367272[_0xc01e96(0x253)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1d6248=JSON['parse']('['+RegExp['$1'][_0xc01e96(0x253)](/\d+/g)+']');for(const _0x3e559c of _0x1d6248){if(!_0x4df0f4['isLearnedSkill'](_0x3e559c))return!![];}return![];}else{if(_0x367272[_0xc01e96(0x253)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x4c8cf9=RegExp['$1']['split'](',');for(const _0xfce35f of _0x4c8cf9){const _0x32279f=DataManager[_0xc01e96(0x29b)](_0xfce35f);if(!_0x32279f)continue;if(!_0x4df0f4[_0xc01e96(0x403)](_0x32279f))return!![];}return![];}}if(_0x367272[_0xc01e96(0x253)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3b58c2=JSON[_0xc01e96(0x3c6)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0xe0d10a of _0x3b58c2){if(!_0x4df0f4[_0xc01e96(0x403)](_0xe0d10a))return!![];}return![];}else{if(_0x367272[_0xc01e96(0x253)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x45d777=RegExp['$1'][_0xc01e96(0x1cd)](',');for(const _0x1d9b53 of _0x45d777){const _0xed35e4=DataManager[_0xc01e96(0x29b)](_0x1d9b53);if(!_0xed35e4)continue;if(!_0x4df0f4['isLearnedSkill'](_0xed35e4))return!![];}return![];}}if(_0x367272[_0xc01e96(0x253)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x273e42=JSON[_0xc01e96(0x3c6)]('['+RegExp['$1'][_0xc01e96(0x253)](/\d+/g)+']');for(const _0xd9ef26 of _0x273e42){if(_0x4df0f4[_0xc01e96(0x403)](_0xd9ef26))return![];}return!![];}else{if(_0x367272[_0xc01e96(0x253)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x27aa93=RegExp['$1'][_0xc01e96(0x1cd)](',');for(const _0x50e877 of _0x27aa93){const _0x33275c=DataManager[_0xc01e96(0x29b)](_0x50e877);if(!_0x33275c)continue;if(_0x4df0f4[_0xc01e96(0x403)](_0x33275c))return![];}return!![];}}if(_0x367272[_0xc01e96(0x253)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x16ca0d=JSON[_0xc01e96(0x3c6)]('['+RegExp['$1'][_0xc01e96(0x253)](/\d+/g)+']');for(const _0x343571 of _0x16ca0d){if(!_0x4df0f4[_0xc01e96(0x3be)](_0x343571))return![];}return!![];}else{if(_0x367272[_0xc01e96(0x253)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x4a6845=RegExp['$1']['split'](',');for(const _0x13c0b2 of _0x4a6845){const _0x53c292=DataManager[_0xc01e96(0x29b)](_0x13c0b2);if(!_0x53c292)continue;if(!_0x4df0f4[_0xc01e96(0x3be)](_0x53c292))return![];}return!![];}}if(_0x367272[_0xc01e96(0x253)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x287e45=JSON['parse']('['+RegExp['$1'][_0xc01e96(0x253)](/\d+/g)+']');for(const _0x1361ca of _0x287e45){if(!_0x4df0f4[_0xc01e96(0x3be)](_0x1361ca))return![];}return!![];}else{if(_0x367272['match'](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x40f52a=RegExp['$1']['split'](',');for(const _0x52826e of _0x40f52a){const _0x1368cf=DataManager[_0xc01e96(0x29b)](_0x52826e);if(!_0x1368cf)continue;if(!_0x4df0f4['hasSkill'](_0x1368cf))return![];}return!![];}}if(_0x367272[_0xc01e96(0x253)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4e4aff=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x46b213 of _0x4e4aff){if(_0x4df0f4['hasSkill'](_0x46b213))return!![];}return![];}else{if(_0x367272[_0xc01e96(0x253)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x36bfcf=RegExp['$1']['split'](',');for(const _0x40d845 of _0x36bfcf){const _0x26460d=DataManager[_0xc01e96(0x29b)](_0x40d845);if(!_0x26460d)continue;if(_0x4df0f4[_0xc01e96(0x3be)](_0x26460d))return!![];}return![];}}if(_0x367272['match'](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x557f42=JSON[_0xc01e96(0x3c6)]('['+RegExp['$1'][_0xc01e96(0x253)](/\d+/g)+']');for(const _0x1d4d64 of _0x557f42){if(!_0x4df0f4[_0xc01e96(0x3be)](_0x1d4d64))return!![];}return![];}else{if(_0x367272[_0xc01e96(0x253)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x4b2a24=RegExp['$1']['split'](',');for(const _0x113791 of _0x4b2a24){const _0x24908a=DataManager['getSkillIdWithName'](_0x113791);if(!_0x24908a)continue;if(!_0x4df0f4[_0xc01e96(0x3be)](_0x24908a))return!![];}return![];}}if(_0x367272['match'](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xe5d79d=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x1208d2 of _0xe5d79d){if(!_0x4df0f4[_0xc01e96(0x3be)](_0x1208d2))return!![];}return![];}else{if(_0x367272['match'](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x1053d1=RegExp['$1'][_0xc01e96(0x1cd)](',');for(const _0x90bc9c of _0x1053d1){const _0x5f1a64=DataManager[_0xc01e96(0x29b)](_0x90bc9c);if(!_0x5f1a64)continue;if(!_0x4df0f4[_0xc01e96(0x3be)](_0x5f1a64))return!![];}return![];}}if(_0x367272[_0xc01e96(0x253)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xf9d9c3=JSON[_0xc01e96(0x3c6)]('['+RegExp['$1'][_0xc01e96(0x253)](/\d+/g)+']');for(const _0x1e7e56 of _0xf9d9c3){if(_0x4df0f4[_0xc01e96(0x3be)](_0x1e7e56))return![];}return!![];}else{if(_0x367272['match'](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x470dfa=RegExp['$1'][_0xc01e96(0x1cd)](',');for(const _0xdfd264 of _0x470dfa){const _0x4992bd=DataManager[_0xc01e96(0x29b)](_0xdfd264);if(!_0x4992bd)continue;if(_0x4df0f4['hasSkill'](_0x4992bd))return![];}return!![];}}return!![];},Window_SkillList[_0x4e163d(0x33f)]['checkShowHideJS']=function(_0x3e9e1e){const _0x1cdcb4=_0x4e163d,_0x5112a5=_0x3e9e1e[_0x1cdcb4(0x18e)],_0x157aaf=VisuMZ[_0x1cdcb4(0x1b1)][_0x1cdcb4(0x25f)];return _0x157aaf[_0x3e9e1e['id']]?_0x157aaf[_0x3e9e1e['id']][_0x1cdcb4(0x3d8)](this,_0x3e9e1e):!![];},VisuMZ[_0x4e163d(0x1b1)]['Window_SkillList_makeItemList']=Window_SkillList[_0x4e163d(0x33f)][_0x4e163d(0x407)],Window_SkillList[_0x4e163d(0x33f)][_0x4e163d(0x407)]=function(){const _0x3584bc=_0x4e163d;VisuMZ[_0x3584bc(0x1b1)][_0x3584bc(0x350)][_0x3584bc(0x3d8)](this),this['canSortSkillTypeList']()&&this[_0x3584bc(0x2dd)](),this[_0x3584bc(0x324)]()&&this[_0x3584bc(0x1c7)]();},Window_SkillList[_0x4e163d(0x33f)][_0x4e163d(0x162)]=function(){return!![];},Window_SkillList[_0x4e163d(0x33f)][_0x4e163d(0x2dd)]=function(){const _0x2cdf1e=_0x4e163d,_0x133fc9=VisuMZ[_0x2cdf1e(0x1b1)][_0x2cdf1e(0x362)]['Skills'][_0x2cdf1e(0x2ea)]||[];return _0x133fc9&&_0x133fc9[_0x2cdf1e(0x30f)](this['_stypeId'])?this[_0x2cdf1e(0x1f2)][_0x2cdf1e(0x224)]((_0x4b1bbd,_0x2a1194)=>{const _0x50f3fc=_0x2cdf1e;if(!!_0x4b1bbd&&!!_0x2a1194)return _0x4b1bbd['name'][_0x50f3fc(0x1f3)](_0x2a1194['name']);return 0x0;}):VisuMZ['SkillsStatesCore'][_0x2cdf1e(0x16f)](this[_0x2cdf1e(0x1f2)]),this[_0x2cdf1e(0x1f2)];},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x16f)]=function(_0x2aceed){const _0x5c42a3=_0x4e163d;return _0x2aceed[_0x5c42a3(0x224)]((_0x10e19b,_0x3ab0af)=>{const _0x9473a7=_0x5c42a3;if(!!_0x10e19b&&!!_0x3ab0af){if(_0x10e19b[_0x9473a7(0x31c)]===undefined)VisuMZ['SkillsStatesCore'][_0x9473a7(0x24f)](_0x10e19b);if(_0x3ab0af['sortPriority']===undefined)VisuMZ[_0x9473a7(0x1b1)][_0x9473a7(0x24f)](_0x3ab0af);const _0x34b353=_0x10e19b[_0x9473a7(0x31c)],_0x57cda0=_0x3ab0af['sortPriority'];if(_0x34b353!==_0x57cda0)return _0x57cda0-_0x34b353;return _0x10e19b['id']-_0x3ab0af['id'];}return 0x0;}),_0x2aceed;},VisuMZ['SkillsStatesCore']['SortByIDandPriorityUsingIDs']=function(_0x860adb){const _0x310b6b=_0x4e163d;return _0x860adb[_0x310b6b(0x224)]((_0x59156d,_0x318d58)=>{const _0x3d883a=_0x310b6b,_0x3ee185=$dataSkills[_0x59156d],_0x3bb03c=$dataSkills[_0x318d58];if(!!_0x3ee185&&!!_0x3bb03c){if(_0x3ee185['sortPriority']===undefined)VisuMZ[_0x3d883a(0x1b1)]['Parse_Notetags_Skill_Sorting'](_0x3ee185);if(_0x3bb03c[_0x3d883a(0x31c)]===undefined)VisuMZ[_0x3d883a(0x1b1)][_0x3d883a(0x24f)](_0x3bb03c);const _0xb7eecb=_0x3ee185[_0x3d883a(0x31c)],_0x2f5748=_0x3bb03c[_0x3d883a(0x31c)];if(_0xb7eecb!==_0x2f5748)return _0x2f5748-_0xb7eecb;return _0x59156d-_0x318d58;}return 0x0;}),_0x860adb;},Window_SkillList[_0x4e163d(0x33f)]['canChangeSkillsThroughStateEffects']=function(){const _0x11ccb3=_0x4e163d;if(!this[_0x11ccb3(0x266)])return![];if([_0x11ccb3(0x2c5),_0x11ccb3(0x384),_0x11ccb3(0x16d)][_0x11ccb3(0x30f)](this[_0x11ccb3(0x389)]))return![];return!![];},Window_SkillList[_0x4e163d(0x33f)][_0x4e163d(0x1c7)]=function(){const _0x983ff1=_0x4e163d,_0x4073ff=this[_0x983ff1(0x266)][_0x983ff1(0x2b0)]();for(const _0x100211 of _0x4073ff){const _0x34f0e2=DataManager[_0x983ff1(0x359)](_0x100211);for(const _0x4a3753 in _0x34f0e2){const _0x336e70=$dataSkills[Number(_0x4a3753)]||null,_0xa21199=$dataSkills[Number(_0x34f0e2[_0x4a3753])]||null;while(this['_data'][_0x983ff1(0x30f)](_0x336e70)){const _0x1bcbf5=this[_0x983ff1(0x1f2)][_0x983ff1(0x3e4)](_0x336e70);this[_0x983ff1(0x1f2)][_0x1bcbf5]=_0xa21199;}}}},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x3a7)]=Window_SkillList[_0x4e163d(0x33f)][_0x4e163d(0x379)],Window_SkillList[_0x4e163d(0x33f)][_0x4e163d(0x379)]=function(_0x534b15){const _0x3a5cc6=_0x4e163d,_0xc775e3=this[_0x3a5cc6(0x25e)](_0x534b15),_0x5df9e5=_0xc775e3?_0xc775e3[_0x3a5cc6(0x365)]:'';if(_0xc775e3)this['alterSkillName'](_0xc775e3);VisuMZ['SkillsStatesCore'][_0x3a5cc6(0x3a7)][_0x3a5cc6(0x3d8)](this,_0x534b15);if(_0xc775e3)_0xc775e3[_0x3a5cc6(0x365)]=_0x5df9e5;},Window_SkillList[_0x4e163d(0x33f)][_0x4e163d(0x316)]=function(_0x4f75b6){const _0x2405d9=_0x4e163d;if(_0x4f75b6&&_0x4f75b6[_0x2405d9(0x18e)][_0x2405d9(0x253)](/<LIST NAME:[ ](.*)>/i)){_0x4f75b6[_0x2405d9(0x365)]=String(RegExp['$1'])[_0x2405d9(0x376)]();for(;;){if(_0x4f75b6[_0x2405d9(0x365)][_0x2405d9(0x253)](/\\V\[(\d+)\]/gi))_0x4f75b6[_0x2405d9(0x365)]=_0x4f75b6[_0x2405d9(0x365)][_0x2405d9(0x3e0)](/\\V\[(\d+)\]/gi,(_0x3b4f44,_0x274524)=>$gameVariables[_0x2405d9(0x257)](parseInt(_0x274524)));else break;}}},Window_SkillList[_0x4e163d(0x33f)]['drawSkillCost']=function(_0x5513fd,_0x4a5f33,_0x1ca626,_0x327ee1){const _0x46797f=_0x4e163d;Window_Base[_0x46797f(0x33f)][_0x46797f(0x18f)][_0x46797f(0x3d8)](this,this[_0x46797f(0x266)],_0x5513fd,_0x4a5f33,_0x1ca626,_0x327ee1);},Window_SkillList[_0x4e163d(0x33f)][_0x4e163d(0x218)]=function(_0x3cb580){const _0x385093=_0x4e163d;this[_0x385093(0x215)]=_0x3cb580,this[_0x385093(0x2b8)]();},VisuMZ[_0x4e163d(0x1b1)][_0x4e163d(0x202)]=Window_SkillList['prototype'][_0x4e163d(0x332)],Window_SkillList[_0x4e163d(0x33f)]['updateHelp']=function(){const _0xc73c29=_0x4e163d;VisuMZ[_0xc73c29(0x1b1)]['Window_SkillList_updateHelp']['call'](this),this[_0xc73c29(0x215)]&&this['_statusWindow'][_0xc73c29(0x214)]===Window_ShopStatus&&this[_0xc73c29(0x215)][_0xc73c29(0x33c)](this[_0xc73c29(0x227)]());};