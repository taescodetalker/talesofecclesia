//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.87;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.87] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Attack Seal Bypass
 * 
 * By default, if the attack skill is sealed via a trait and an actor has
 * auto-battle, the action can still be used via auto-battle. This is now fixed
 * and actors should not be able to attack via auto-battle if their attack
 * ability is sealed.
 * 
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Auto Save After New Game
 * 
 * Normally, when starting a new game through the "New Game" option, there is
 * no auto save trigger. However, if you start a new game or load a saved game,
 * then go to the Game End screen, return back to the title screen, then start
 * a New Game, the auto save trigger occurs when it shouldn't. The Core Engine
 * will now patch this and prevent the trigger from taking place.
 * 
 * ---
 * 
 * Battle Forced End Action Crash
 * 
 * Depending on various circumstances, currently active battlers can be cleared
 * from the battle system at will due to a number of reasons. However, if it
 * just so happens that the targets are cleared, too, with actions remaining,
 * then a crash will follow up. This plugin will prevent that change. Fix made
 * by Olivia.
 * 
 * ---
 * 
 * Debug Console Refresh Bug
 * 
 * When pressing F5 to refresh while the debug console (DevTools) is open,
 * some graphics will fail to load properly. This started occurring since the
 * RPG Maker MZ 1.5.0 update and the code for loading the images has now been
 * reverted to the 1.4.4 version where it was last stable.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 * 
 * Instant Text Discrepancy for Window_Message
 * 
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 * 
 * This can be disabled through the Plugin Parameters:
 * 
 * Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Overly-Protective Substitute
 * 
 * When an ally with critical health is being targeted by a friendly non-
 * Certain Hit skill (such as a heal or buff) and another ally has the
 * substitute state, the other ally would "protect" the originally targeted
 * ally and take the heal or buff.
 * 
 * The new changed behavior is that now, substitute will not trigger for any
 * actions whose scope targets allies.
 * 
 * ---
 * 
 * Skill List Active After Party Member Change
 * 
 * If the skill list is active (ie. the player can move the cursor around) and
 * the party member currently being viewed is changed via the button commands,
 * then previously, RPG Maker MZ would still have that window be active despite
 * having the cursor hidden temporarily. Upon pressing direction buttons, the
 * cursor reveals itself and both the skill type window and skill list window
 * are both active, making way for lots of potential problems to happen.
 * 
 * ---
 * 
 * Sprite Removal and Destroy Crash
 * 
 * A texture check will now occur for sprites that are being removed and
 * destroyed in order to prevent crashes. In the off chance that someone
 * creates a sprite through a script call and removes it through such, the
 * likelihood of this occurance becomes higher. This makes the "destroy"
 * property take into account a texture check in order to see if the sprite
 * removal is taking extra steps and will reduce those extra steps.
 * 
 * ---
 * 
 * Status Window Name Vertical Cutoffs
 * 
 * In the battle status windows, whenever actor names are displayed, the bitmap
 * used to display their name text do not extend vertically all the way,
 * causing letters like lowercase "Q" and "G" to be cut off, making them hard
 * to distinguish from one another. The Core Engine will remedy this by
 * extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Water Tile Bug
 * 
 * It seems like there's a new bug that occurs if you create a tileset from
 * scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 * does is it causes many tiles to become water tiles without intending to.
 * You can find this out by turning off all the plugins in your project,
 * putting a Ship or Boat on what are normally ground tiles, and then seeing
 * the Ship or Boat traverse through it.
 * 
 * There are two ways to fix this. We cannot fix it through code in this plugin
 * as it's a problem that involves the tileset json data there are ways to work
 * around it so that you can get the proper water-flags to go where they need
 * to be at.
 * 
 * 1. Copy a working un-bugged tileset onto the currently bugged one and
 *    reapply the tile features like passability, terrain tags, etc. This will
 *    make sure the water-passability tiles get copied over correctly.
 * 
 * 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *    un-bugged tileset (usually a pre-existing tileset when a new project is
 *    made), click the "Copy Page" button, go to the bugged tileset and press
 *    "Paste Page". You'll have to reapply any different properties like
 *    passabilities and terrain tags, but the water tile flags should now be
 *    working properly.
 * 
 * The plugin will not fix the problem itself since flag data is delicate and
 * should not be tampered with midgame as the changes made by the plugin might
 * not match the desired settings.
 * 
 * This plugin, however, will also send out an alert message when coming across
 * such a tile. Pay attention to it and do one of the following two steps above
 * to fix the problem.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
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
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
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
 * === Actors-Related Notetags ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes-Related Notetags ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies-Related Notetags ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations-Related Notetags ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 * 
 * <Rate: x>
 * 
 * - Used for: MV Animation Name Tags
 * - Allows you to adjust the update for this MV Animation.
 *   - Does NOT work with Effekseer animations.
 * - The lower the number, the faster.
 * - Replace 'x' with a number representing the animation update rate.
 *   - Default rate: 4.
 *   - Minimum rate: 1.
 *   - Maximum rate: 10.
 * 
 * ---
 *
 * === Quality of Life-Related Notetags ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 * 
 * <Scroll Lock X>
 * <Scroll Lock Y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - This will use the display nudge setting found in the Plugin Parameters.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 * 
 * <Scroll Lock X: x>
 * <Scroll Lock Y: y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present and will nudge the map camera slightly.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - Replace 'x' and 'y' with numbers between 0 and 1 to represent how much is
 *   being judged.
 *   - For example, for a 1280x720 resolution, a 27 tile wide map will benefit
 *     from a nudge of 0.15625. Play with these numbers to determine the best
 *     value for your maps.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 *
 * === Basic, X, and S Parameters-Related Notetags ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 * - This does NOT set the max cap to be lower than the default cap.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 * 
 * ---
 * 
 * === Tileset-Related Notetags ===
 * 
 * ---
 * 
 * <Taller By x: id>
 * 
 * - Used for: Tileset Notetags
 * - Changes any page B, C, D, E tile marked by terrain tag 'id' to be taller
 *   by 'x' tiles.
 *   - Replace 'x' with a number representing the tiles to be taller by.
 *   - Replace 'id' with a number representing the Terrain Tag you will use to
 *     mark this tile with in the Database editor.
 * - When placing these tiles on the map, all you have to do is just place the
 *   bottom tile.
 *   - ie.: For a tree that's one tile taller, just place the tile at the
 *     bottom where you see the trunk.
 *   - Then, in-game, the tree will appear taller by one tile as marked.
 * - Depending on the priority settings, the tile will appear on different
 *   layers.
 *   - O will place the tile on the below player layer.
 *   - X will place the tile on the same level as the player.
 *   - ★ will place the tile on the above player layer.
 *   - O/X layer tiles have a special property where tall sprites standing in
 *     front of it will no longer clip the top of the sprite, while sprites
 *     standing behind it will be covered by it.
 *   - The X layer sprite will only have a hitbox of 1x1 at the base.
 * - This does not work with events using tiles as graphics. Instead, if you
 *   want to do similar, use the Event & Movement Core's <Tile Expand> notetags
 *   for better control.
 * 
 * ---
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <Grid>
 * <Battle Grid>
 * 
 * <No Grid>
 * <No Battle Grid>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Requires VisuMZ_2_BattleGridSystem!
 * - Changes the battle system to utilize the Battle Grid System or not.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * - If none of these notetags or comment tags are found, refer to the default
 *   settings found in the Plugin Parameters.
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
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Audio Plugin Commands ===
 * 
 * ---
 * 
 * Audio: Change Current BGM Volume
 * - Changes the current BGM volume without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Volume:
 *   - Change the current BGM's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pitch
 * - Changes the current BGM pitch without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pitch:
 *   - Change the current BGM's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pan
 * - Changes the current BGM pan without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pan:
 *   - Change the current BGM's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGS Volume
 * - Changes the current BGS volume without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Volume:
 *   - Change the current BGS's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGS Pitch
 * - Changes the current BGS pitch without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Pitch:
 *   - Change the current BGS's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGS Pan
 * - Changes the current BGS pan without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Pan:
 *   - Change the current BGS's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * === Debug Plugin Commands ===
 * 
 * ---
 * 
 * Debug: Current Controller ID
 * - PLAY TEST ONLY.
 * - Shows current controller ID in debug console.
 * - If you press a key on the keyboard, this data will be erased.
 * - Also copies to computer clipboard if possible.
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 * 
 * Map: Once Parallel
 * - Plays a Common Event parallel to the event once without repeating itself
 *   when done.
 * - Map only!
 * 
 *   Common Event ID:
 *   - The ID of the parallel Common Event to play.
 *   - Does NOT repeat itself when finished.
 *   - When exiting map scene or changing maps, all Once Parallels are cleared.
 *   - Once Parallels are not retained upon reentering the scene or map.
 *   - Once Parallels are not stored in memory and cannot be saved.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Rotate by Angle
 * - Rotates target picture by a amount angle over a set duration instead of
 *   continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Adjust Angle:
 *   - What is the angle you wish to rotate the picture by?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Rotate to Angle
 * - Rotates target picture to a certain angle over a set duration
 *   instead of continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Target Angle:
 *   - What is the target angle you wish to rotate the picture?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 * 
 * === Text Popup Command ===
 * 
 * ---
 * 
 * Text Popup: Show Text
 * - Adds text to a text popup window to briefly appear.
 * - Multiple text popups will be queued.
 * - Does not halt the game and works parallel to game activity.
 * 
 *   Text:
 *   - Write the text that you want to appear here.
 *   - You may use text codes.
 * 
 * ---
 * 
 * === Variable Plugin Commands ===
 * 
 * ---
 * 
 * Variable: JS Eval
 * - Pick a variable ID and value to alter through JS.
 * - Allows one line of code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 * 
 * Variable: JS Block
 * - Pick a variable ID and value to alter through JS.
 * - Allows JS block code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 * 
 *   CTRL + n: Quick Load:
 *   - CTRL + a number from 1 to 9 will yield a quick load of that safe file.
 *   - Does not count auto saves.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 *   Shift+R: Recover All:
 *   - For Play Test only!
 *   - During battle, pressing SHIFT + R will refill the whole party's HP
 *     and MP and status.
 * 
 *   Shift+T: Full TP
 *   - For Play Test only! 
 *   - During battle, pressing SHIFT + T will refill the whole party's TP.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 * 
 * Picture-Related
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 * 
 *   Picture Containers > Detach in Battle:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the battle scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 *   Picture Containers > Detach in Map:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the map scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 * 
 *   Font Width Fix:
 *   - Fixes the font width issue with instant display non-monospaced fonts
 *     in the Message Window.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 * 
 *   Map Name Text Code:
 *   - If on, map names will use text codes.
 *   - If off, only the raw map name will be used.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   MV Animation Rate:
 *   - Adjusts the rate at which MV animations play.
 *   - Default: 4.
 *   - Lower for faster.
 *   - Higher for slower.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 * 
 *   Shortcut Scripts:
 *   - Enables shortcut-based script variables and functions that can be used
 *     for script calls.
 *   - Shortcut list enabled for this is as follows:
 * 
 *     $commonEvent(id)
 *     - Queues a common event.
 *     - This does not interrupt the current event to run the desired common
 *       event. Any queued common events will run after the current event list
 *       has finished.
 *     - Replace 'id' with the ID of the common event you wish to queue.
 *     - Common events only run in the map scene and battle scene.
 * 
 *     $onceParallel(id)
 *     - Runs a common event in the background as a once parallel event.
 *     - Once parallel events will run in the background like a parallel
 *       process, except that it does not repeat after finishing.
 *     - Replace 'id' with the ID of the common event you wish to run.
 *     - Only works in the map scene and battle scene. Battle scene usage will
 *       require VisuMZ_1_BattleCore.
 * 
 *     $scene
 *     - Returns current scene.
 * 
 *     $spriteset
 *     - Returns current scene's spriteset if there is one.
 * 
 *     $subject
 *     - Returns last recorded identity of the battle's subject/user.
 * 
 *     $targets
 *     - Returns last recorded targets marked in battle.
 * 
 *     $target
 *     - Returns last recorded target marked in battle.
 *     - If multiple targets are recorded, then the first of the recorded
 *       targets will be set for this variable.
 *     - Works better with VisuMZ_1_BattleCore.
 * 
 *     $event
 *     - Returns currently initiated map event.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 * 
 *   Subfolder Name Purge:
 *   - Purge subfolder name from Plugin Parameters when reading data to let
 *     Plugin Commands work properly.
 *   - This is for plugins (such as the VisuMZ library) that utilize dynamic
 *     name registrations for Plugin Commands. Turn this on if you plan on
 *     using subfolders with VisuMZ plugins.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Finish Entry:
 *   - Text used to describe finish entry.
 * 
 *   Page Change:
 *   - Text used to describe character page changing.
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 * 
 *   Blur Strength:
 *   - Strength used for menu background snapshots.
 *   - Default: 8. Higher is stronger. Lower is weaker.
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Split "Escape":
 *   - Used ONLY for those making their own custom keyboard key input maps.
 *     - This means you need to go to your own project's rmmz_core.js and
 *       modify Input.keyMapper to have buttons with "cancel" and "menu"
 *       instead of only "escape".
 *     - If there are none found, an error message will appear telling you to
 *       do so, or set the 'Split "Escape"' option to false.
 *     - If you are using Options Core's Rebind Keyboard option, be sure to
 *       have those have "cancel" and "menu" options inside there, too.
 *   - "Split" option makes separate instances of "Cancel" and "Menu" keys.
 *   - "Don't" option will consolidate both into "Escape" keys.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Controller Button Assist Settings
 * ============================================================================
 *
 * These are sub-settings for the Button Assist Window Plugin Parameters. Where
 * the Button Assist Window Plugin Parameters are focused on keyboard entries,
 * these sections are focused on gamepad controllers.
 * 
 * Add multiple gamepads to the list to give them different button assist text.
 * If a gamepad is being used but not listed here, the button assist text will
 * default to the keyboard version.
 * 
 * For those looking for more information regarding controllers, visit this
 * site: https://gamepad-tester.com/
 *
 * ---
 *
 * ID Information
 * 
 *   Controller ID Name:
 *   - Exact string used for this controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - Example: Xbox 360 Controller (XInput STANDARD GAMEPAD)
 * 
 *   Similarity Match:
 *   - Partial string used to check for controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - This check occurs secondary to the exact name.
 *   - Example: Xbox
 *
 * ---
 *
 * Directions
 * 
 *   Up:
 *   Left:
 *   Right:
 *   Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * Actions
 * 
 *   OK:
 *   Cancel:
 *   Menu:
 *   Shift:
 *   Page Up:
 *   Page Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *   - *NOTE*: Controllers use a different mapping scheme from keyboards.
 *     - The "cancel" button is separate from the "menu" button though, for the
 *       majority of the button assist window help text, we'll be referring to
 *       the cancel button usually.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 * 
 *   Show Actor Level?:
 *   - Show the actor level when displaying actors?
 *   - Affects for most windows in-game.
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 * 
 * Maps
 * 
 *   Scroll Lock Small X?:
 *   Scroll Lock Small Y?:
 *   - Automatically scroll lock X/Y scrolling if the map is too small?
 *   - Useful for 1280x720 resolutions when the map is 27 tiles wide.
 *     - This will get rid of the subtle scrolling when moving from one half of
 *       the screen to the other.
 *   - This setting will be disabled if the map is zoomed in.
 * 
 *   Locked Display X?:
 *   Locked Display Y?:
 *   - What display X/Y value do you want for auto-scroll locked maps?
 *   - Use a number between 0 and 1 for best results.
 * 
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 * 
 *   State Icons Non-Frame:
 *   - Replace sprite frame system for non-frame.
 *   - Better for any instances where icons are zoomed.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 * 
 * These settings also allow you to add scroll bars to scrollable windows,
 * letting the player know how much of the window's contents there are left for
 * scrolling. The scroll bar can be enabled, disabled, have its thickness
 * changed, colors changed, etc.
 *
 * ---
 *
 * Window Defaults
 * 
 *   Enable Masking:
 *   - Enable window masking (windows hide other windows behind them)?
 *   - WARNING: Turning it on can obscure data.
 * 
 *   Correct Skin Bleed:
 *   - Allows you to enable/disable the window skin bleeding correction for
 *     those who wish to use the 95 calculator instead of 96 to augment higher
 *     and larger screen resolutions.
 *   - Read the "Bug Fixes" section if you don't understand what the window
 *     skin bleeding problem is.
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Scroll Bar
 * 
 *   Show Scroll Bar?:
 *   - Show the scroll bar for scrollable windows?
 * 
 *   Thickness:
 *   - How thick do you want the scroll bar to be?
 * 
 *   Offset:
 *   - How much do you want to offset the scroll bar by?
 * 
 *   Bar Body Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Opacity:
 *   - What opacity value do you want the off bar opacity to be?
 *   - Use a number between 0 and 255.
 * 
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
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
 * Version 1.87: February 20, 2025
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Removed picture limit of 100 from Picture-related Plugin Commands.
 * *** Better compatibility with different icon sizes.
 * * Documentation Update!
 * ** Under Plugin Parameters: Menu Button Assist Window
 * *** Added text segments under Split "Escape"
 * **** This means you need to go to your own project's rmmz_core.js and
 *      modify Input.keyMapper to have buttons with "cancel" and "menu"
 *      instead of only "escape".
 * **** If there are none found, an error message will appear telling you to
 *      do so, or set the 'Split "Escape"' option to false.
 * **** If you are using Options Core's Rebind Keyboard option, be sure to
 *      have those have "cancel" and "menu" options inside there, too.
 * * Feature Update!
 * ** Plugin Parameters > Button Assist > Split "Escape" will now show an error
 *    message if a custom Input.keyMapper is not found with the "cancel" and
 *    "menu" keys implemented. Update made by Irina.
 * ** Updated Plugin Parameters > Button Assist > Split "Escape" description
 *    for Plugin Parameters to add in the following text: Requires custom
 *    Input.keyMapper with "cancel" and "menu".
 * ** Added better compatibility with WASD controls as to prioritize showing
 *    the arrow keys rather than the W, A, S, D keys. Also applies to any other
 *    rebindings.
 * 
 * Version 1.86: January 16, 2025
 * * Bug Fixes!
 * ** Fixed an issue where certain icons were not aligning properly at
 *    different line height settings. Fix made by Olivia.
 * 
 * Version 1.85: October 17, 2024
 * * Feature Updates!
 * ** Updated to fit RPG Maker MZ's updated 1.8.1 version better.
 * 
 * Version 1.84: August 29, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New notetags added by Arisu:
 * *** Tileset Notetag: <Taller By x: id>
 * **** Changes any page B, C, D, E tile marked by terrain tag 'id' to be
 *      taller by 'x' tiles.
 * **** When placing these tiles on the map, all you have to do is just place
 *      the bottom tile.
 * ***** ie.: For a tree that's one tile taller, just place the tile at the
 *       bottom where you see the trunk. Then, in-game, the tree will appear
 *       taller by one tile as marked.
 * **** O/X layer tiles have a special property where tall sprites standing in
 *      front of it will no longer clip the top of the sprite, while sprites
 *      standing behind it will be covered by it.
 * **** This does not work with events using tiles as graphics. Instead, if
 *      you want to do similar, use the Event & Movement Core's <Tile Expand>
 *      notetags for better control.
 * 
 * Version 1.83: June 13, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated documentation for <param Max: x> notetag.
 * *** This does not set the max cap to be lower than the default cap.
 * * New Feature!
 * ** New Plugin Parameters added by Olivia:
 * *** Plugin Parameters > UI Settings > State Icons Non-Frame
 * **** Replace sprite frame system for non-frame.
 * **** Better for any instances where icons are zoomed.
 * 
 * Version 1.82: April 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Added failsafe for $textPopup when some windows have not been initialized
 *    and requesting the text popup.
 * * New Feature!
 * ** New Plugin Parameter and playtest shortcut added by Arisu:
 * *** Plugin Parameters > QoL Settings > Playtest > CTRL + n: Quick Load
 * **** CTRL + a number from 1 to 9 will yield a quick load of that save file.
 * **** Does not count auto saves.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.81: February 15, 2024
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added for future plugin: VisuMZ_2_BattleGridSystem
 * *** <Grid>
 * *** <No Grid>
 * **** Requires the future plugin VisuMZ_2_BattleGridSystem!
 * **** Read the help section for more information on these.
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > Window > Correct Skin Bleed
 * **** Allows you to enable/disable the window skin bleeding correction for
 *      those who wish to use the 95 calculator instead of 96 to augment higher
 *      and larger screen resolutions.
 * **** Read the "Bug Fixes" section if you don't understand what the window
 *      skin bleeding problem is.
 * 
 * Version 1.80: January 18, 2024
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Auto Save After New Game
 * **** Normally, when starting a new game through the "New Game" option, there
 *      is no auto save trigger. However, if you start a new game or load a
 *      saved game, then go to the Game End screen, return back to the title
 *      screen, then start a New Game, the auto save trigger occurs when it
 *      shouldn't. The Core Engine will now patch this and prevent the trigger
 *      from taking place.
 * 
 * Version 1.79: November 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Plugin Command added by Arisu:
 * ** Text Popup: Show Text
 * *** Adds text to a text popup window to briefly appear.
 * *** Multiple text popups will be queued.
 * *** Does not halt the game and works parallel to game activity.
 * 
 * Version 1.78: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia and sponsored by AndyL:
 * *** QoL Settings > Battle Test > Shift+R: Recover All
 * **** For Play Test only! During battle, pressing SHIFT + R will refill the
 *      whole party's HP and MP and status.
 * *** QoL Settings > Battle Test > Shift+T: Full TP
 * **** For Play Test only! During battle, pressing SHIFT + T will refill the
 *      whole party's TP.
 * 
 * Version 1.77: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause the BGS related Plugin Commands to crash.
 *    Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Scroll-Linked Pictures now work if the image file are in a folder within
 *    the img/pictures/ folder without the folder needing a ! at the start.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Picture: Rotate by Angle
 * **** Rotates target picture by a amount angle over a set duration instead of
 *      continuously.
 * **** View help file for more information on the Plugin Command.
 * *** Picture: Rotate to Angle
 * **** Rotates target picture to a certain angle over a set duration instead
 *      of continuously.
 * **** View help file for more information on the Plugin Command.
 * ** New Plugin Parameter added by Irina:
 * *** Parameters > Menu Button Assist > General > Split "Escape":
 * **** Used ONLY for those making their own custom keyboard key input maps.
 * **** "Split" option makes separate instances of "Cancel" and "Menu" keys.
 * **** "Don't" option will consolidate both into "Escape" keys.
 * 
 * Version 1.76: June 15, 2023
 * * Bug Fixes!
 * ** Fixed a bug that displayed the incorrect button press key for name input
 *    processing's cancel action. Fix made by Olivia.
 * 
 * Version 1.75: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** In Scene_Name, when using the Keyboard Input, the button assist windows
 *    will no longer display the keyboard shortcuts for Ok and Cancel, but
 *    instead, show them for ENTER and BKSP. Update made by Arisu.
 * ** In Scene_Name, when manual inputting, the Page Up/Dn keys are now
 *    displayed to show changing character pages.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and sponsored by AndyL:
 * *** Params > Keyboard Input > Button Assist > Finish Entry
 * **** Text used to describe finish entry.
 * *** Params > Keyboard Input > Button Assist > Page Change
 * **** Text used to describe changing character pages.
 * *** Params > Window Settings > Scroll Bar
 * **** These settings also allow you to add scroll bars to scrollable windows,
 *      letting the player know how much of the window's contents there are
 *      left for scrolling. The scroll bar can be enabled, disabled, have its
 *      thickness changed, colors changed, etc.
 * 
 * Version 1.74: February 16, 2023
 * * Compatibility Update!
 * ** Plugin Commands for: Audio: Change Current BGM/BGS Volume/Pitch/Pan
 *    should now work properly with the updated RPG Maker MZ version and
 *    WebAudio changes. Update made by Arisu.
 * 
 * Version 1.73: January 20, 2023
 * * Compatibility Update!
 * ** Added better Effekseer version compatibility.
 * 
 * Version 1.72: December 15, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Skill List Active After Party Member Change
 * **** If the skill list is active (ie. the player can move the cursor around)
 *      and the party member currently being viewed is changed via the button
 *      commands, then previously, RPG Maker MZ would still have that window be
 *      active despite having the cursor hidden temporarily. Upon pressing
 *      direction buttons, the cursor reveals itself and both the skill type
 *      window and skill list window are both active, making way for lots of
 *      potential problems to happen.
 * ** Water Tile Bug
 * *** It seems like there's a new bug that occurs if you create a tileset from
 *     scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 *     does is it causes many tiles to become water tiles without intending to.
 *     You can find this out by turning off all the plugins in your project,
 *     putting a Ship or Boat on what are normally ground tiles, and then
 *     seeing the Ship or Boat traverse through it.
 * *** There are two ways to fix this. We cannot fix it through code in this
 *     plugin as it's a problem that involves the tileset json data there are
 *     ways to work around it so that you can get the proper water-flags to go
 *     where they need to be at.
 * **** 1. Copy a working un-bugged tileset onto the currently bugged one and
 *      reapply the tile features like passability, terrain tags, etc. This
 *      will make sure the water-passability tiles get copied over correctly.
 * **** 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *      un-bugged tileset (usually a pre-existing tileset when a new project is
 *      made), click the "Copy Page" button, go to the bugged tileset and press
 *      "Paste Page". You'll have to reapply any different properties like
 *      passabilities and terrain tags, but the water tile flags should now be
 *      working properly.
 * *** The plugin will not fix the problem itself since flag data is delicate
 *     and should not be tampered with midgame as the changes made by the
 *     plugin might not match the desired settings.
 * *** This plugin, however, will also send out an alert message when coming
 *     across such a tile. Pay attention to it and do one of the following two
 *     steps above to fix the problem.
 * * Documentation Update!
 * ** Added "Skill List Active After Party Member Change" section to the
 *    "Important Changes: Bug Fixes" section of the help file.
 * ** Added "Water Tile Bug" section to the "Important Changes: Bug Fixes"
 *    section of the help file.
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Menu Backgrounds > Blur Strength
 * **** Strength used for menu background snapshots.
 * 
 * Version 1.71: November 10, 2022
 * * Bug Fixes!
 * ** Title Command Window should now allow for more than 4 custom commands
 *    without hidden commands. Fix made by Irina.
 * ** Fixed a problem with repeating animations from Visual State Effects
 *    causing softlocks. Fix made by Olivia.
 * 
 * Version 1.70: October 6, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** A texture check will now occur for sprites that are being removed and
 *     destroyed in order to prevent crashes. In the off chance that someone
 *     creates a sprite through a script call and removes it through such, the
 *     likelihood of this occurance becomes higher. This makes the destroy
 *     property take into account a texture check in order to see if the sprite
 *     removal is taking extra steps and will reduce those extra steps.
 * * Documentation Update!
 * ** Added "Sprite Removal and Destroy Crash" section to the "Important
 *    Changes: Bug Fixes" section.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.69: September 8, 2022
 * * Bug Fixes!
 * ** Fixed the combination of Button Assist Location: Top with Help Location:
 *    Bottom combination not working properly. Fix made by Irina.
 * 
 * Version 1.68: August 4, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Olivia and sponsored by Archeia:
 * *** Audio: Change Current BGM Volume
 * *** Audio: Change Current BGM Pitch
 * *** Audio: Change Current BGM Pan
 * *** Audio: Change Current BGS Volume
 * *** Audio: Change Current BGS Pitch
 * *** Audio: Change Current BGS Pan
 * **** Changes the current BGM/BGS volume/pitch/pan without changing any of
 *      the current BGM/BGS's other properties and without restarting BGM/BGS.
 * 
 * Version 1.67: July 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added notes for Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * *** This setting will be disabled if the map is zoomed in.
 * * New Features!
 * ** New map notetags added by Irina and sponsored by AndyL:
 * *** <Scroll Lock X>
 * *** <Scroll Lock X: x>
 * *** <Scroll Lock Y>
 * *** <Scroll Lock Y: y>
 * **** Causes the map to not scroll left/right(x) or up/down(y). Useful for
 *      when maps are just slightly smaller than normal and the tiny scrolling
 *      is distracting.
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small X?
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small Y?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display X?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display Y?
 * **** Automatically scroll locks small maps to prevent them from scrolling
 *      horizontally/vertically. Useful for 1280x720 resolutions when the map
 *      is 27 tiles wide. This will get rid of the subtle scrolling when moving
 *      from one half of the screen to the other.
 * **** This setting will be disabled if the map is zoomed in.
 * * Feature Update!
 * ** Warnings added to Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 * Version 1.66: July 14, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Debug Console Refresh Bug
 * **** When pressing F5 to refresh while the debug console (DevTools) is open,
 *      some graphics will fail to load properly. This started occurring since
 *      the RPG Maker MZ 1.5.0 update and the code for loading the images has
 *      now been reverted to the 1.4.4 version where it was last stable.
 * * Documentation Update!
 * ** Help file updated for new major bug fix.
 * 
 * Version 1.65: June 30, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Parameter Settings > Show Actor Level?
 * **** Show the actor level when displaying actors?
 * **** Used for most windows in-game.
 * 
 * Version 1.64: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Debug: Current Controller ID
 * **** PLAY TEST ONLY. Shows current controller ID in debug console.
 * **** Also copies to computer clipboard if possible.
 * ** New Plugin Parameters made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Subsettings for Button Assist Window: Controller Button Assist
 * **** These are sub-settings for the Button Assist Window Plugin Parameters.
 *      Where the Button Assist Window Plugin Parameters are focused on
 *      keyboard entries, these sections are focused on gamepad controllers.
 * **** Add multiple gamepads to the list to give them different button assist
 *      text. If a gamepad is being used but not listed here, the button assist
 *      text will default to the keyboard version.
 * 
 * Version 1.63: May 2, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > QoL Settings > Misc > Map Name Text Code
 * **** If on, map names will use text codes.
 * **** If off, only the raw map name will be used.
 * * Feature Update!
 * ** The map name text code change will no longer be on forcefully. It is now
 *    something that can be toggled by Plugin Parameters. Update by Irina.
 * 
 * Version 1.62: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu and sponsored by Archeia:
 * *** Variable: JS Eval
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows one line of code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * *** Variable: JS Block
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows JS block code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * ** Map names can now use text codes. Made by Arisu and sponsored by Archeia.
 * 
 * Version 1.61: April 21, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Battle Forced End Action Crash
 * **** Depending on various circumstances, currently active battlers can be
 *      cleared from the battle system at will due to a number of reasons.
 *      However, if it just so happens that the targets are cleared, too, with
 *      actions remaining, then a crash will follow up. This plugin will
 *      prevent that change. Fix made by Olivia.
 * 
 * Version 1.60: April 14, 2022
 * * Bug Fixes!
 * ** Number Input window will now respond to Home/End keys properly.
 *    Fix made by Olivia.
 * 
 * Version 1.59: April 7, 2022
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.4 compatibility update!
 * *** "Shutdown" command should now be more compatible with other aspects of
 *     the client when running from Node JS client on other OS's.
 * 
 * Version 1.58: March 24, 2022
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.57: March 3, 2022
 * * Compatibility Update!
 * ** The "Shutdown" command from the title screen should now be compatible
 *    with RPG Maker MZ 1.4.4 and up. Update made by Olivia.
 * 
 * Version 1.56: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New features added by Arisu and sponsored by Anon:
 * *** Plugin Parameters > QoL > Misc > Shortcut Scripts
 * **** Enables shortcut-based script variables and functions that can be used
 *      for script calls.
 * **** Shortcut list enabled for this is as follows:
 * ***** $commonEvent(id), $onceParallel(id), $scene, $spriteset, $subject, 
 *       $targets, $target, $event
 * ***** For more information on how to use them, review the help file.
 * 
 * Version 1.55: January 27, 2022
 * * Feature Update!
 * ** Once Parallels for the map are now able to update even while other events
 *    are running. Update made by Arisu.
 * 
 * Version 1.54: January 13, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Overly-Protective Substitute
 * *** When an ally with critical health is being targeted by a friendly non-
 *     Certain Hit skill (such as a heal or buff) and another ally has the
 *     substitute state, the other ally would "protect" the originally targeted
 *     ally and take the heal or buff.
 * *** The new changed behavior is that now, substitute will not trigger for
 *     any actions whose scope targets allies.
 * *** Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new MZ Bug: Overly-Protective Substitute.
 * * Feature Update!
 * ** Added a failsafe for those who did not update the plugin parameter
 *    settings and are using MV Animations.
 * 
 * Version 1.53: December 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Olivia:
 * *** <Rate: x>
 * **** Allows you to adjust the update for this MV Animation.
 * ***** Does NOT work with Effekseer animations.
 * **** The lower the number, the faster.
 * **** Replace 'x' with a number representing the animation update rate.
 * ***** Default rate: 4.
 * ***** Minimum rate: 1.
 * ***** Maximum rate: 10.
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Qualify of Life Settings > MV Animation Rate
 * **** Adjusts the rate at which MV animations play.
 * **** Default: 4. Lower for faster. Higher for slower.
 * * Optimization Update!
 * ** MV Animations should run more optimized.
 * 
 * Version 1.52: December 16, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.0 compatibility update!
 * *** MV Animations played on screen level will now show up properly in the
 *     center of the screen.
 * 
 * Version 1.51: December 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** In the battle status windows, whenever actor names are displayed, the
 *     bitmap used to display their name text do not extend vertically all the
 *     way, causing letters like lowercase "Q" and "G" to be cut off, making
 *     them hard to distinguish from one another. The Core Engine will remedy
 *     this by extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * Version 1.50: November 4, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** By default, if the attack skill is sealed via a trait and an actor has
 *     auto-battle, the action can still be used via auto-battle. This is now
 *     fixed and actors should not be able to attack via auto-battle if their
 *     attack ability is sealed. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.49: October 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Map: Once Parallel
 * **** Plays a Common Event parallel to the event once without repeating
 *      itself when done. Map only!
 * **** When exiting map scene or changing maps, all Once Parallels are cleared
 * **** Once Parallels are not retained upon reentering the scene or map.
 * **** Once Parallels are not stored in memory and cannot be saved.
 * 
 * Version 1.48: October 21, 2021
 * * Feature Update!
 * ** Bitmap.blt function will now have source coordinates and destination X
 *    and Y coordinates rounded to prevent blurring. Update made by Olivia.
 * 
 * Version 1.47: October 14, 2021
 * * Bug Fixes!
 * ** Prevents Number Input window from having a NaN value due to holding down
 *    the fast forward key. Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * **** Fixes the font width issue with non-monospaced fonts in the Message
 *      Window. This is now an optional fix.
 * 
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 * 
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
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
 * @command Separator_Animation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Audio
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmVolume
 * @text Audio: Change Current BGM Volume
 * @desc Changes the current BGM volume without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGM's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPitch
 * @text Audio: Change Current BGM Pitch
 * @desc Changes the current BGM pitch without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGM's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPan
 * @text Audio: Change Current BGM Pan
 * @desc Changes the current BGM pan without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGM's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsVolume
 * @text Audio: Change Current BGS Volume
 * @desc Changes the current BGS volume without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGS's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPitch
 * @text Audio: Change Current BGS Pitch
 * @desc Changes the current BGS pitch without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGS's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPan
 * @text Audio: Change Current BGS Pan
 * @desc Changes the current BGS pan without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGS's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Debug
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DebugConsoleLastControllerID
 * @text Debug: Current Controller ID
 * @desc PLAY TEST ONLY. Shows current controller ID in debug console.
 * Also copies to computer clipboard if possible.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Export
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Game
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Gold
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold. You may use JS.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Map
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapOnceParallel
 * @text Map: Once Parallel
 * @desc Plays a Common Event parallel to the event once without
 * repeating itself when done. Map only!
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc The ID of the parallel Common Event to play.
 * Does NOT repeat itself when finished.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotateBy
 * @text Picture: Rotate By Angle
 * @desc Rotates target picture by a amount angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg AdjustAngle:eval
 * @text Adjust Angle
 * @desc What is the angle you wish to rotate the picture by?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotate
 * @text Picture: Rotate to Angle
 * @desc Rotates target picture to a certain angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg TargetAngle:eval
 * @text Target Angle
 * @desc What is the target angle you wish to rotate the picture?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_ScreenShake
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Switch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_TextPopup
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TextPopupShow
 * @text Text Popup: Show Text
 * @desc Adds text to a text popup window to briefly appear.
 * Multiple text popups will be queued.
 *
 * @arg text:json
 * @text Text
 * @type note
 * @desc Write the text that you want to appear here.
 * You may use text codes.
 * @default "Insert message here."
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Variable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableEvalReference
 * @text Variable: JS Eval
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:eval
 * @text Variable ID
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 1
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:eval
 * @text Operand Modifier
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableJsBlock
 * @text Variable: JS Block
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:func
 * @text Variable ID
 * @type note
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet varID = 1;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn varID;"
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:func
 * @text Operand Modifier
 * @type note
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet value = 0;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn value;"
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
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","BattleTest":"","BTestItems:eval":"true","BTestWeapons:eval":"true","BTestArmors:eval":"true","BTestAddedQuantity:num":"90","ShiftR_Toggle:eval":"true","ShiftT_Toggle:eval":"true","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Pictures":"","AntiZoomPictures:eval":"true","PictureContainers":"","DetachBattlePictureContainer:eval":"false","DetachMapPictureContainer:eval":"false","Misc":"","AnimationMirrorOffset:eval":"false","AutoStretch:str":"default","FontShadows:eval":"false","FontSmoothing:eval":"true","FontWidthFix:eval":"true","KeyItemProtect:eval":"true","MapNameTextCode:eval":"true","ModernControls:eval":"true","MvAnimationRate:num":"4","NewGameCommonEventAll:num":"0","NoTileShadows:eval":"false","PixelateImageRendering:eval":"false","RequireFocus:eval":"false","ShortcutScripts:eval":"true","SmartEventCollisionPriority:eval":"true","SubfolderParse:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param ControllerButtons:arraystruct
 * @text Controller Button Assist
 * @parent ButtonAssist:struct
 * @type struct<ControllerButtons>[]
 * @desc Make different icons appear for the Button Assist window when using different controllers.
 * @default []
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Maps":"","AutoScrollLockX:eval":"true","AutoScrollLockY:eval":"true","DisplayLockX:num":"0.15625","DisplayLockY:num":"0.00000","Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4","ScrollBar":"","ShowScrollBar:eval":"true","BarThickness:num":"2","BarOffset:num":"+2","BarBodyColor:str":"0","OffBarColor:str":"7","OffBarOpacity:num":"128","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","TextPopup":"","DurationPerChat:num":"1.5","MinDuration:num":"90","MaxDuration:num":"300"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomBetween(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
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
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param CtrlQuickLoad:eval
 * @text CTRL + n: Quick Load
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc CTRL + a number from 1 to 9 will yield a quick load of
 * that safe file. Does not count auto saves.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param ShiftR_Toggle:eval
 * @text Shift+R: Recover All
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + R will refill the whole party's HP and MP and status.
 * @default true
 *
 * @param ShiftT_Toggle:eval
 * @text Shift+T: Full TP
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + T will refill the whole party's TP.
 * @default true
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Pictures
 * @text Picture-Related
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Pictures
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 * 
 * @param PictureContainers
 * @text Picture Containers
 * @parent Pictures
 *
 * @param DetachBattlePictureContainer:eval
 * @text Detach in Battle
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the battle scene.
 * @default false
 *
 * @param DetachMapPictureContainer:eval
 * @text Detach in Map
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the map scene.
 * @default false
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param FontWidthFix:eval
 * @text Font Width Fix
 * @parent Misc
 * @type boolean
 * @on Fix
 * @off Default
 * @desc Fixes the font width issue with instant display
 * non-monospaced fonts in the Message Window.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param MapNameTextCode:eval
 * @text Map Name Text Code
 * @parent Misc
 * @type boolean
 * @on Text Codes
 * @off Raw Text
 * @desc If on, map names will use text codes.
 * If off, only the raw map name will be used.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param MvAnimationRate:num
 * @text MV Animation Rate
 * @parent Misc
 * @min 1
 * @max 10
 * @desc Adjusts the rate at which MV animations play.
 * Default: 4. Lower for faster. Higher for slower.
 * @default 4
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param ShortcutScripts:eval
 * @text Shortcut Scripts
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables shortcut-based scripts.
 * View the helpfile for more information.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 * @param SubfolderParse:eval
 * @text Subfolder Name Purge
 * @parent Misc
 * @type boolean
 * @on Purge Subfolders Names
 * @off Don't Purge Name
 * @desc Purge subfolder name from Plugin Parameters when reading
 * data to let Plugin Commands work properly.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Finish:str
 * @text Finish Entry
 * @parent ButtonAssist
 * @desc Text used to describe finish entry.
 * @default Finish
 * 
 * @param PageChange:str
 * @text Page Change
 * @parent ButtonAssist
 * @desc Text used to describe character page changing.
 * @default Page
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 * 
 * @param BlurStrength:num
 * @text Blur Strength
 * @desc Strength used for menu background snapshots.
 * Default: 8. Higher is stronger. Lower is weaker.
 * @default 8
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
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
 * @param SplitEscape:eval
 * @text Split "Escape"
 * @parent General
 * @type boolean
 * @on Split
 * @off Don't
 * @desc "Split" makes separate instances of "Cancel" and "Menu".
 * Requires custom Input.keyMapper with "cancel" and "menu".
 * @default false
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Controller Buttons Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ControllerButtons:
 *
 * @param ID
 * @text ID Information
 *
 * @param Name:str
 * @text Controller ID Name
 * @parent ID
 * @desc Exact string used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 *
 * @param Match:str
 * @text Similarity Match
 * @parent ID
 * @desc Similar text used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 * 
 * @param Directions
 *
 * @param up:str
 * @text Up
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param left:str
 * @text Left
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param right:str
 * @text Right
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param down:str
 * @text Down
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 * 
 * @param Actions
 *
 * @param ok:str
 * @text OK
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param cancel:str
 * @text Cancel
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param menu:str
 * @text Menu
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param shift:str
 * @text Shift
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pageup:str
 * @text Page Up
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pagedown:str
 * @text Page Down
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
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
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
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
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
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
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
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
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
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
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
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
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
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
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
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
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
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
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
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
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
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
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
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
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
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
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
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
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
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
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
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
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
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
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
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
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
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
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
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
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
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
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
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
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
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
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
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
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
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
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param ShowActorLevel:eval
 * @text Show Actor Level?
 * @parent BasicParameters
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor level when displaying actors?
 * Affects for most windows in-game.
 * @default true
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param StateIconsNonFrame:eval
 * @text State Icons Non-Frame
 * @parent UIArea
 * @type boolean
 * @on Non-Frame
 * @off Normal
 * @desc Replace sprite frame system for non-frame.
 * Better for any instances where icons are zoomed.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param CorrectSkinBleeding:eval
 * @text Correct Skin Bleed
 * @parent WindowDefaults
 * @type boolean
 * @on Correct
 * @off Don't Correct
 * @desc Corrects window skin bleeding bug when used with higher
 * screen resolutions?
 * @default true
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36. Avoid using odd numbers.
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param ScrollBar
 * @text Scroll Bar
 *
 * @param ShowScrollBar:eval
 * @text Show Scroll Bar?
 * @parent ScrollBar
 * @type boolean
 * @on Show Scroll Bar
 * @off Don't Show
 * @desc Show the scroll bar for scrollable windows?
 * @default true
 *
 * @param BarThickness:num
 * @text Thickness
 * @parent ScrollBar
 * @type number
 * @min 1
 * @desc How thick do you want the scroll bar to be?
 * @default 2
 *
 * @param BarOffset:num
 * @text Offset
 * @parent ScrollBar
 * @desc How much do you want to offset the scroll bar by?
 * @default +2
 *
 * @param BarBodyColor:str
 * @text Bar Body Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param OffBarColor:str
 * @text Off Bar Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 7
 *
 * @param OffBarOpacity:num
 * @text Off Bar Opacity
 * @parent ScrollBar
 * @type number
 * @min 1
 * @max 255
 * @desc What opacity value do you want the off bar opacity
 * to be? Use a number between 0 and 255.
 * @default 128
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No Backgrounds
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 *
 * @param TextPopup
 * @text Text Popup Window
 *
 * @param DurationPerChat:num
 * @text Duration Per Text
 * @parent TextPopup
 * @desc What is the increase in duration per text character?
 * @default 1.5
 *
 * @param MinDuration:num
 * @text Minimum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Minimum duration for window to stay on the screen.
 * @default 90
 *
 * @param MaxDuration:num
 * @text Maximum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Maximum duration for window to stay on the screen.
 * @default 300
 * 
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Maps
 * 
 * @param AutoScrollLockX:eval
 * @text Scroll Lock Small X?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock X scrolling if the map is too small?
 * @default true
 * 
 * @param AutoScrollLockY:eval
 * @text Scroll Lock Small Y?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock Y scrolling if the map is too small?
 * @default true
 * 
 * @param DisplayLockX:num
 * @text Locked Display X?
 * @parent Maps
 * @desc What display X value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.15625
 * 
 * @param DisplayLockY:num
 * @text Locked Display Y?
 * @parent Maps
 * @desc What display Y value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.00000
 * 
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

const _0x3beee9=_0x4666;(function(_0x178e5f,_0x226e30){const _0x578049=_0x4666,_0x42f42c=_0x178e5f();while(!![]){try{const _0x183b5b=parseInt(_0x578049(0x1b2))/0x1+parseInt(_0x578049(0x4ee))/0x2+-parseInt(_0x578049(0x57c))/0x3+-parseInt(_0x578049(0x13f))/0x4*(parseInt(_0x578049(0x6a7))/0x5)+-parseInt(_0x578049(0x64e))/0x6+-parseInt(_0x578049(0x36f))/0x7*(parseInt(_0x578049(0x78b))/0x8)+parseInt(_0x578049(0x76e))/0x9*(parseInt(_0x578049(0x2ea))/0xa);if(_0x183b5b===_0x226e30)break;else _0x42f42c['push'](_0x42f42c['shift']());}catch(_0x3d276e){_0x42f42c['push'](_0x42f42c['shift']());}}}(_0x18bf,0x39bce));var label=_0x3beee9(0x186),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x39e467){const _0x54a1c6=_0x3beee9;return _0x39e467[_0x54a1c6(0x704)]&&_0x39e467[_0x54a1c6(0x869)][_0x54a1c6(0x820)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x3beee9(0x46c)]||{},VisuMZ[_0x3beee9(0x783)]=function(_0x3457dc,_0x3a71f2){const _0x123831=_0x3beee9;for(const _0x14addc in _0x3a71f2){if(_0x14addc['match'](/(.*):(.*)/i)){const _0x562dc8=String(RegExp['$1']),_0x81741e=String(RegExp['$2'])[_0x123831(0x4d5)]()[_0x123831(0x42d)]();let _0x9bea54,_0x38da17,_0x1cef65;switch(_0x81741e){case _0x123831(0x247):_0x9bea54=_0x3a71f2[_0x14addc]!==''?Number(_0x3a71f2[_0x14addc]):0x0;break;case'ARRAYNUM':_0x38da17=_0x3a71f2[_0x14addc]!==''?JSON[_0x123831(0x646)](_0x3a71f2[_0x14addc]):[],_0x9bea54=_0x38da17[_0x123831(0x5c5)](_0x497624=>Number(_0x497624));break;case _0x123831(0x162):_0x9bea54=_0x3a71f2[_0x14addc]!==''?eval(_0x3a71f2[_0x14addc]):null;break;case _0x123831(0x3b3):_0x38da17=_0x3a71f2[_0x14addc]!==''?JSON[_0x123831(0x646)](_0x3a71f2[_0x14addc]):[],_0x9bea54=_0x38da17[_0x123831(0x5c5)](_0x1a6e94=>eval(_0x1a6e94));break;case'JSON':_0x9bea54=_0x3a71f2[_0x14addc]!==''?JSON['parse'](_0x3a71f2[_0x14addc]):'';break;case _0x123831(0x113):_0x38da17=_0x3a71f2[_0x14addc]!==''?JSON[_0x123831(0x646)](_0x3a71f2[_0x14addc]):[],_0x9bea54=_0x38da17['map'](_0x10936f=>JSON[_0x123831(0x646)](_0x10936f));break;case _0x123831(0x2e3):_0x9bea54=_0x3a71f2[_0x14addc]!==''?new Function(JSON[_0x123831(0x646)](_0x3a71f2[_0x14addc])):new Function(_0x123831(0x3f8));break;case'ARRAYFUNC':_0x38da17=_0x3a71f2[_0x14addc]!==''?JSON[_0x123831(0x646)](_0x3a71f2[_0x14addc]):[],_0x9bea54=_0x38da17[_0x123831(0x5c5)](_0x42c9dc=>new Function(JSON[_0x123831(0x646)](_0x42c9dc)));break;case _0x123831(0x43b):_0x9bea54=_0x3a71f2[_0x14addc]!==''?String(_0x3a71f2[_0x14addc]):'';break;case'ARRAYSTR':_0x38da17=_0x3a71f2[_0x14addc]!==''?JSON['parse'](_0x3a71f2[_0x14addc]):[],_0x9bea54=_0x38da17[_0x123831(0x5c5)](_0x47697d=>String(_0x47697d));break;case _0x123831(0x2f5):_0x1cef65=_0x3a71f2[_0x14addc]!==''?JSON['parse'](_0x3a71f2[_0x14addc]):{},_0x3457dc[_0x562dc8]={},VisuMZ['ConvertParams'](_0x3457dc[_0x562dc8],_0x1cef65);continue;case _0x123831(0x1f4):_0x38da17=_0x3a71f2[_0x14addc]!==''?JSON['parse'](_0x3a71f2[_0x14addc]):[],_0x9bea54=_0x38da17[_0x123831(0x5c5)](_0x1dbab7=>VisuMZ[_0x123831(0x783)]({},JSON[_0x123831(0x646)](_0x1dbab7)));break;default:continue;}_0x3457dc[_0x562dc8]=_0x9bea54;}}return _0x3457dc;},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x7f6)]=SceneManager[_0x3beee9(0x7da)],SceneManager[_0x3beee9(0x7da)]=function(){const _0x59264f=_0x3beee9;VisuMZ[_0x59264f(0x186)][_0x59264f(0x7f6)][_0x59264f(0x573)](this);if(Utils['RPGMAKER_VERSION']>=_0x59264f(0x3bb)){if(typeof nw===_0x59264f(0x71b))nw['App'][_0x59264f(0x26b)]();}},(_0x1cbf23=>{const _0xbfb81=_0x3beee9,_0x1c4f05=_0x1cbf23[_0xbfb81(0x148)];for(const _0x5dcb50 of dependencies){if(!Imported[_0x5dcb50]){alert(_0xbfb81(0x9e)[_0xbfb81(0x48d)](_0x1c4f05,_0x5dcb50)),SceneManager['exit']();break;}}const _0x24133e=_0x1cbf23[_0xbfb81(0x869)];if(_0x24133e[_0xbfb81(0x56a)](/\[Version[ ](.*?)\]/i)){const _0x28c0b2=Number(RegExp['$1']);_0x28c0b2!==VisuMZ[label][_0xbfb81(0x6c2)]&&(alert(_0xbfb81(0x15e)[_0xbfb81(0x48d)](_0x1c4f05,_0x28c0b2)),SceneManager[_0xbfb81(0x7da)]());}if(_0x24133e['match'](/\[Tier[ ](\d+)\]/i)){const _0x57bdfe=Number(RegExp['$1']);_0x57bdfe<tier?(alert(_0xbfb81(0x325)['format'](_0x1c4f05,_0x57bdfe,tier)),SceneManager[_0xbfb81(0x7da)]()):tier=Math['max'](_0x57bdfe,tier);}VisuMZ[_0xbfb81(0x783)](VisuMZ[label][_0xbfb81(0x46c)],_0x1cbf23[_0xbfb81(0x5fd)]);})(pluginData),((()=>{const _0x1558d3=_0x3beee9;if(VisuMZ['CoreEngine'][_0x1558d3(0x46c)]['QoL'][_0x1558d3(0x402)]??!![])for(const _0x4beb7c in $plugins){const _0x44e005=$plugins[_0x4beb7c];_0x44e005[_0x1558d3(0x148)]['match'](/(.*)\/(.*)/i)&&(_0x44e005[_0x1558d3(0x148)]=String(RegExp['$2']['trim']()));}})()),PluginManager['registerCommand'](pluginData[_0x3beee9(0x148)],_0x3beee9(0x5b1),_0x851559=>{const _0x39caf3=_0x3beee9;if(!SceneManager[_0x39caf3(0x854)])return;if(!SceneManager[_0x39caf3(0x854)][_0x39caf3(0x687)])return;VisuMZ[_0x39caf3(0x783)](_0x851559,_0x851559);const _0x26e88e=Math['round'](_0x851559[_0x39caf3(0x390)]),_0x158881=Math[_0x39caf3(0x368)](_0x851559['pointY']);$gameTemp[_0x39caf3(0x63e)](_0x26e88e,_0x158881,_0x851559['AnimationID'],_0x851559[_0x39caf3(0x38f)],_0x851559[_0x39caf3(0x356)]);}),PluginManager[_0x3beee9(0x722)](pluginData[_0x3beee9(0x148)],'AudioChangeBgmVolume',_0x5568b6=>{const _0x296cec=_0x3beee9;VisuMZ['ConvertParams'](_0x5568b6,_0x5568b6);const _0x5bf597=Math[_0x296cec(0x368)](_0x5568b6[_0x296cec(0x178)])[_0x296cec(0x3fd)](0x0,0x64),_0x1bbaca=AudioManager[_0x296cec(0x275)];_0x1bbaca&&(_0x1bbaca['volume']=_0x5bf597,_0x1bbaca['pos']=AudioManager['_bgmBuffer'][_0x296cec(0x73b)](),AudioManager[_0x296cec(0x4a2)](_0x1bbaca),AudioManager[_0x296cec(0x298)](_0x1bbaca,_0x1bbaca[_0x296cec(0xaf)]),AudioManager[_0x296cec(0x5bf)][_0x296cec(0x366)](_0x1bbaca[_0x296cec(0xaf)]));}),PluginManager['registerCommand'](pluginData[_0x3beee9(0x148)],'AudioChangeBgmPitch',_0x212847=>{const _0xbc48bd=_0x3beee9;VisuMZ['ConvertParams'](_0x212847,_0x212847);const _0x4383c6=Math[_0xbc48bd(0x368)](_0x212847['pitch'])[_0xbc48bd(0x3fd)](0x32,0x96),_0x98dc25=AudioManager[_0xbc48bd(0x275)];_0x98dc25&&(_0x98dc25[_0xbc48bd(0x867)]=_0x4383c6,_0x98dc25[_0xbc48bd(0xaf)]=AudioManager[_0xbc48bd(0x5bf)][_0xbc48bd(0x73b)](),AudioManager[_0xbc48bd(0x4a2)](_0x98dc25),AudioManager['playBgm'](_0x98dc25,_0x98dc25[_0xbc48bd(0xaf)]),AudioManager[_0xbc48bd(0x5bf)][_0xbc48bd(0x366)](_0x98dc25[_0xbc48bd(0xaf)]));}),PluginManager[_0x3beee9(0x722)](pluginData['name'],_0x3beee9(0x281),_0x52c88b=>{const _0xd731b1=_0x3beee9;VisuMZ[_0xd731b1(0x783)](_0x52c88b,_0x52c88b);const _0x564805=Math[_0xd731b1(0x368)](_0x52c88b[_0xd731b1(0x424)])[_0xd731b1(0x3fd)](-0x64,0x64),_0x4ffc72=AudioManager[_0xd731b1(0x275)];_0x4ffc72&&(_0x4ffc72[_0xd731b1(0x424)]=_0x564805,_0x4ffc72[_0xd731b1(0xaf)]=AudioManager[_0xd731b1(0x5bf)][_0xd731b1(0x73b)](),AudioManager[_0xd731b1(0x4a2)](_0x4ffc72),AudioManager[_0xd731b1(0x298)](_0x4ffc72,_0x4ffc72[_0xd731b1(0xaf)]),AudioManager['_bgmBuffer'][_0xd731b1(0x366)](_0x4ffc72[_0xd731b1(0xaf)]));}),PluginManager[_0x3beee9(0x722)](pluginData[_0x3beee9(0x148)],_0x3beee9(0x5be),_0x400fc5=>{const _0x148794=_0x3beee9;VisuMZ['ConvertParams'](_0x400fc5,_0x400fc5);const _0x743ee=Math[_0x148794(0x368)](_0x400fc5['volume'])[_0x148794(0x3fd)](0x0,0x64),_0x4b6263=AudioManager[_0x148794(0x670)];_0x4b6263&&(_0x4b6263[_0x148794(0x178)]=_0x743ee,_0x4b6263[_0x148794(0xaf)]=AudioManager[_0x148794(0x83a)][_0x148794(0x73b)](),AudioManager[_0x148794(0x644)](_0x4b6263),AudioManager['playBgs'](_0x4b6263,_0x4b6263[_0x148794(0xaf)]),AudioManager[_0x148794(0x83a)][_0x148794(0x366)](_0x4b6263[_0x148794(0xaf)]));}),PluginManager[_0x3beee9(0x722)](pluginData[_0x3beee9(0x148)],_0x3beee9(0x56b),_0x226dc8=>{const _0x129dbc=_0x3beee9;VisuMZ[_0x129dbc(0x783)](_0x226dc8,_0x226dc8);const _0x2ecc2c=Math[_0x129dbc(0x368)](_0x226dc8[_0x129dbc(0x867)])['clamp'](0x32,0x96),_0x56b1fc=AudioManager[_0x129dbc(0x670)];_0x56b1fc&&(_0x56b1fc[_0x129dbc(0x867)]=_0x2ecc2c,_0x56b1fc[_0x129dbc(0xaf)]=AudioManager[_0x129dbc(0x83a)][_0x129dbc(0x73b)](),AudioManager[_0x129dbc(0x644)](_0x56b1fc),AudioManager[_0x129dbc(0x681)](_0x56b1fc,_0x56b1fc[_0x129dbc(0xaf)]),AudioManager[_0x129dbc(0x83a)][_0x129dbc(0x366)](_0x56b1fc[_0x129dbc(0xaf)]));}),PluginManager[_0x3beee9(0x722)](pluginData[_0x3beee9(0x148)],_0x3beee9(0x51a),_0x981926=>{const _0x1ab276=_0x3beee9;VisuMZ['ConvertParams'](_0x981926,_0x981926);const _0xbcf9cb=Math['round'](_0x981926['pan'])[_0x1ab276(0x3fd)](-0x64,0x64),_0x47a1a5=AudioManager[_0x1ab276(0x670)];_0x47a1a5&&(_0x47a1a5[_0x1ab276(0x424)]=_0xbcf9cb,_0x47a1a5[_0x1ab276(0xaf)]=AudioManager[_0x1ab276(0x83a)][_0x1ab276(0x73b)](),AudioManager[_0x1ab276(0x644)](_0x47a1a5),AudioManager[_0x1ab276(0x681)](_0x47a1a5,_0x47a1a5[_0x1ab276(0xaf)]),AudioManager[_0x1ab276(0x83a)][_0x1ab276(0x366)](_0x47a1a5[_0x1ab276(0xaf)]));}),PluginManager[_0x3beee9(0x722)](pluginData['name'],'DebugConsoleLastControllerID',_0xbafb6c=>{const _0x2ad88b=_0x3beee9;if(!$gameTemp[_0x2ad88b(0x441)]())return;const _0x55fc3a=Input[_0x2ad88b(0x4c1)]();console['log'](_0x55fc3a);}),PluginManager[_0x3beee9(0x722)](pluginData[_0x3beee9(0x148)],_0x3beee9(0x351),_0x5e1205=>{const _0x15c087=_0x3beee9;if(!$gameTemp[_0x15c087(0x441)]())return;if(!Utils[_0x15c087(0x86e)]())return;SceneManager[_0x15c087(0x854)]['_active']=![],VisuMZ[_0x15c087(0x186)]['ExportStrFromAllMaps']();}),PluginManager['registerCommand'](pluginData[_0x3beee9(0x148)],_0x3beee9(0x647),_0x3183c1=>{const _0x1ce440=_0x3beee9;if(!$gameTemp[_0x1ce440(0x441)]())return;if(!Utils[_0x1ce440(0x86e)]())return;SceneManager[_0x1ce440(0x854)][_0x1ce440(0x774)]=![],VisuMZ[_0x1ce440(0x186)][_0x1ce440(0x358)]();}),PluginManager[_0x3beee9(0x722)](pluginData[_0x3beee9(0x148)],_0x3beee9(0x5ad),_0x5e9ea6=>{const _0x12e691=_0x3beee9;if(!$gameTemp[_0x12e691(0x441)]())return;if(!Utils[_0x12e691(0x86e)]())return;if(!$gameMap)return;if($gameMap[_0x12e691(0x80f)]()<=0x0)return;VisuMZ['ConvertParams'](_0x5e9ea6,_0x5e9ea6);const _0x219f0a=_0x12e691(0x50c)[_0x12e691(0x48d)]($gameMap['mapId']()[_0x12e691(0x334)](0x3)),_0x453de3=VisuMZ[_0x12e691(0x186)][_0x12e691(0x1c5)]($gameMap[_0x12e691(0x80f)]());VisuMZ['CoreEngine'][_0x12e691(0x7b6)](_0x453de3,_0x219f0a,!![]);}),PluginManager['registerCommand'](pluginData[_0x3beee9(0x148)],'ExportCurTroopText',_0x2763bd=>{const _0x5e4123=_0x3beee9;if(!$gameTemp[_0x5e4123(0x441)]())return;if(!Utils[_0x5e4123(0x86e)]())return;if(!$gameParty[_0x5e4123(0x811)]())return;VisuMZ[_0x5e4123(0x783)](_0x2763bd,_0x2763bd);const _0x272262=_0x5e4123(0x1eb)[_0x5e4123(0x48d)]($gameTroop[_0x5e4123(0x407)][_0x5e4123(0x334)](0x4)),_0x38c478=VisuMZ[_0x5e4123(0x186)]['ExtractStrFromTroop']($gameTroop[_0x5e4123(0x407)]);VisuMZ[_0x5e4123(0x186)]['ExportString'](_0x38c478,_0x272262,!![]);}),VisuMZ[_0x3beee9(0x186)]['ExportString']=function(_0x414032,_0x4e39e8,_0x26c940){const _0x2b29d3=_0x3beee9,_0x3bdfff=require('fs');let _0x444b3a=_0x2b29d3(0x469)['format'](_0x4e39e8||'0');_0x3bdfff[_0x2b29d3(0x1ee)](_0x444b3a,_0x414032,_0x24b967=>{const _0x755033=_0x2b29d3;if(_0x24b967)throw err;else _0x26c940&&alert(_0x755033(0x5e8)[_0x755033(0x48d)](_0x444b3a));});},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x7c1)]=function(){const _0x5a5f87=_0x3beee9,_0x26c6ec=[];for(const _0x1bd1af of $dataMapInfos){if(!_0x1bd1af)continue;_0x26c6ec['push'](_0x1bd1af['id']);}const _0xebeab3=_0x26c6ec[_0x5a5f87(0x228)]*0x64+Math[_0x5a5f87(0x4fe)](0x64);alert(_0x5a5f87(0x69f)[_0x5a5f87(0x48d)](_0xebeab3)),this[_0x5a5f87(0x777)]=[],this[_0x5a5f87(0x825)]=$dataMap;for(const _0xf48077 of _0x26c6ec){VisuMZ[_0x5a5f87(0x186)][_0x5a5f87(0x40c)](_0xf48077);}setTimeout(VisuMZ[_0x5a5f87(0x186)][_0x5a5f87(0x1cd)][_0x5a5f87(0x4d9)](this),_0xebeab3);},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x40c)]=function(_0x3c4cf1){const _0x108588=_0x3beee9,_0x33bf67=_0x108588(0x134)[_0x108588(0x48d)](_0x3c4cf1[_0x108588(0x334)](0x3)),_0x197a9c=new XMLHttpRequest(),_0x2df3c7=_0x108588(0x636)+_0x33bf67;_0x197a9c[_0x108588(0x458)](_0x108588(0x64b),_0x2df3c7),_0x197a9c[_0x108588(0x5ea)](_0x108588(0xb9)),_0x197a9c['onload']=()=>this[_0x108588(0x6c9)](_0x197a9c,_0x3c4cf1,_0x33bf67,_0x2df3c7),_0x197a9c[_0x108588(0x2e9)]=()=>DataManager[_0x108588(0x213)]('$dataMap',_0x33bf67,_0x2df3c7),_0x197a9c['send']();},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x6c9)]=function(_0x2cfcfe,_0x531d97,_0x542120,_0x1a6da4){const _0x4b4e36=_0x3beee9;$dataMap=JSON[_0x4b4e36(0x646)](_0x2cfcfe[_0x4b4e36(0x7e2)]),DataManager[_0x4b4e36(0x6a0)]($dataMap),this[_0x4b4e36(0x777)][_0x531d97]=VisuMZ[_0x4b4e36(0x186)]['ExtractStrFromMap'](_0x531d97),$dataMap=this[_0x4b4e36(0x825)];},VisuMZ['CoreEngine'][_0x3beee9(0x1cd)]=function(){const _0x41fe6d=_0x3beee9,_0x5a5c4f=_0x41fe6d(0x76d);this['_storedMapText'][_0x41fe6d(0x3c6)](undefined)['remove']('')['remove'](null);const _0x40e5ea=this[_0x41fe6d(0x777)][_0x41fe6d(0xdf)](_0x41fe6d(0x7e9))[_0x41fe6d(0x42d)]();VisuMZ[_0x41fe6d(0x186)][_0x41fe6d(0x7b6)](_0x40e5ea,_0x5a5c4f,!![]),SceneManager['_scene'][_0x41fe6d(0x774)]=!![];},VisuMZ['CoreEngine']['ExtractStrFromMap']=function(_0x52cdaa){const _0x31f28f=_0x3beee9;if(!$dataMap)return'';let _0x21e245='█'[_0x31f28f(0x72d)](0x46)+'\x0a\x0a',_0x883d4='═'[_0x31f28f(0x72d)](0x46)+'\x0a\x0a',_0x4897a9='';this[_0x31f28f(0x315)]=0x0;for(const _0x2c5bdf of $dataMap[_0x31f28f(0x587)]){if(!_0x2c5bdf)continue;let _0x5edc15=_0x2c5bdf['id'],_0x18855c=_0x2c5bdf[_0x31f28f(0x148)],_0x313752=_0x2c5bdf[_0x31f28f(0x371)];for(const _0xe1d53f of _0x313752){const _0x2cf341=_0x313752['indexOf'](_0xe1d53f)+0x1;let _0xd3ab1d=_0x883d4+_0x31f28f(0x376),_0xbeb051=VisuMZ[_0x31f28f(0x186)][_0x31f28f(0x4e4)](_0xe1d53f['list']);if(_0xbeb051['length']>0x0){if(_0x4897a9[_0x31f28f(0x228)]>0x0)_0x4897a9+=_0x883d4+_0x31f28f(0x7e9);else{const _0x98dbbd=$dataMapInfos[_0x52cdaa]['name'];_0x4897a9+=_0x21e245+_0x31f28f(0x102)[_0x31f28f(0x48d)](_0x52cdaa,_0x98dbbd||'Unnamed')+_0x21e245;}_0x4897a9+=_0xd3ab1d[_0x31f28f(0x48d)](_0x5edc15,_0x18855c,_0x2cf341,_0xbeb051);}}}return _0x4897a9[_0x31f28f(0x228)]>0x0&&(_0x4897a9+=_0x883d4),_0x4897a9;},VisuMZ[_0x3beee9(0x186)]['ExportStrFromAllTroops']=function(){const _0x595df=_0x3beee9,_0x5d8349=$dataTroops[_0x595df(0x228)]*0xa+Math[_0x595df(0x4fe)](0xa);alert(_0x595df(0x355)[_0x595df(0x48d)](_0x5d8349));const _0x2b7569=[];for(const _0x2c3bfb of $dataTroops){if(!_0x2c3bfb)continue;const _0x343522=_0x2c3bfb['id'];_0x2b7569[_0x343522]=VisuMZ[_0x595df(0x186)][_0x595df(0x537)](_0x343522);}setTimeout(VisuMZ[_0x595df(0x186)][_0x595df(0x6f6)]['bind'](this,_0x2b7569),_0x5d8349);},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x537)]=function(_0x386471){const _0x16b883=_0x3beee9;if(!$dataTroops[_0x386471])return'';let _0x4cef46='█'['repeat'](0x46)+'\x0a\x0a',_0x39be2b='═'[_0x16b883(0x72d)](0x46)+'\x0a\x0a',_0x260a0b='';this[_0x16b883(0x315)]=0x0;const _0x1dff16=$dataTroops[_0x386471];let _0x3fbb9b=_0x1dff16[_0x16b883(0x371)];for(const _0x2b3820 of _0x3fbb9b){const _0x4a8e4b=_0x3fbb9b['indexOf'](_0x2b3820)+0x1;let _0x1bac40=_0x39be2b+_0x16b883(0x418),_0x5d8b47=VisuMZ[_0x16b883(0x186)][_0x16b883(0x4e4)](_0x2b3820[_0x16b883(0x6ac)]);_0x5d8b47[_0x16b883(0x228)]>0x0&&(_0x260a0b[_0x16b883(0x228)]>0x0?_0x260a0b+=_0x39be2b+_0x16b883(0x7e9):_0x260a0b+=_0x4cef46+_0x16b883(0x6b2)[_0x16b883(0x48d)](_0x386471,_0x1dff16[_0x16b883(0x148)]||_0x16b883(0x4f1))+_0x4cef46,_0x260a0b+=_0x1bac40[_0x16b883(0x48d)](_0x4a8e4b,_0x5d8b47));}return _0x260a0b[_0x16b883(0x228)]>0x0&&(_0x260a0b+=_0x39be2b),_0x260a0b;},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x6f6)]=function(_0x3f123f){const _0x189c6d=_0x3beee9,_0x2c9ea1=_0x189c6d(0x497);_0x3f123f['remove'](undefined)[_0x189c6d(0x3c6)]('')[_0x189c6d(0x3c6)](null);const _0x3c9002=_0x3f123f[_0x189c6d(0xdf)](_0x189c6d(0x7e9))[_0x189c6d(0x42d)]();VisuMZ['CoreEngine'][_0x189c6d(0x7b6)](_0x3c9002,_0x2c9ea1,!![]),SceneManager[_0x189c6d(0x854)][_0x189c6d(0x774)]=!![];},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x4e4)]=function(_0x22a92d){const _0x34c6ab=_0x3beee9;let _0x34c26c='\x0a'+'─'[_0x34c6ab(0x72d)](0x46)+'\x0a',_0x1f2784='\x0a'+'┄'[_0x34c6ab(0x72d)](0x46)+'\x0a',_0x3b9d16='';for(const _0x14bbe2 of _0x22a92d){if(!_0x14bbe2)continue;if(_0x14bbe2['code']===0x65)_0x3b9d16+=_0x34c26c+'\x0a',_0x3b9d16+='〘Show\x20Text〙\x0a',_0x14bbe2[_0x34c6ab(0x5fd)][0x4]!==''&&_0x14bbe2[_0x34c6ab(0x5fd)][0x4]!==undefined&&(_0x3b9d16+=_0x34c6ab(0x1b7)[_0x34c6ab(0x48d)](_0x14bbe2[_0x34c6ab(0x5fd)][0x4]));else{if(_0x14bbe2[_0x34c6ab(0x215)]===0x191)_0x3b9d16+=_0x34c6ab(0x6f3)[_0x34c6ab(0x48d)](_0x14bbe2[_0x34c6ab(0x5fd)][0x0]);else{if(_0x14bbe2['code']===0x192)_0x3b9d16+=_0x34c26c,_0x3b9d16+='%1〘Choice\x20%2〙\x20%3%1'[_0x34c6ab(0x48d)](_0x1f2784,_0x14bbe2[_0x34c6ab(0x5fd)][0x0]+0x1,_0x14bbe2[_0x34c6ab(0x5fd)][0x1]);else{if(_0x14bbe2[_0x34c6ab(0x215)]===0x193)_0x3b9d16+=_0x34c26c,_0x3b9d16+=_0x34c6ab(0x6e2)['format'](_0x1f2784);else{if(_0x14bbe2[_0x34c6ab(0x215)]===0x194)_0x3b9d16+=_0x34c26c,_0x3b9d16+=_0x34c6ab(0x58b)[_0x34c6ab(0x48d)](_0x1f2784);else{if(_0x14bbe2[_0x34c6ab(0x215)]===0x69)_0x3b9d16+=_0x34c26c+'\x0a',_0x3b9d16+='〘Scrolling\x20Text〙\x0a';else{if(_0x14bbe2[_0x34c6ab(0x215)]===0x6c)_0x3b9d16+=_0x34c26c+'\x0a',_0x3b9d16+=_0x34c6ab(0x5cf)[_0x34c6ab(0x48d)](_0x14bbe2[_0x34c6ab(0x5fd)][0x0]);else{if(_0x14bbe2[_0x34c6ab(0x215)]===0x198)_0x3b9d16+=_0x34c6ab(0x6f3)['format'](_0x14bbe2[_0x34c6ab(0x5fd)][0x0]);else{if(_0x14bbe2[_0x34c6ab(0x215)]===0x75){const _0x33587b=$dataCommonEvents[_0x14bbe2[_0x34c6ab(0x5fd)][0x0]];if(_0x33587b&&this[_0x34c6ab(0x315)]<=0xa){this[_0x34c6ab(0x315)]++;let _0x2f0f69=VisuMZ[_0x34c6ab(0x186)][_0x34c6ab(0x4e4)](_0x33587b['list']);_0x2f0f69[_0x34c6ab(0x228)]>0x0&&(_0x3b9d16+=_0x34c26c,_0x3b9d16+=_0x1f2784,_0x3b9d16+=_0x34c6ab(0x7e8)[_0x34c6ab(0x48d)](_0x33587b['id'],_0x33587b[_0x34c6ab(0x148)]),_0x3b9d16+=_0x1f2784,_0x3b9d16+=_0x2f0f69,_0x3b9d16+=_0x1f2784,_0x3b9d16+=_0x34c6ab(0x299)['format'](_0x33587b['id'],_0x33587b['name']),_0x3b9d16+=_0x1f2784),this[_0x34c6ab(0x315)]--;}}}}}}}}}}}return _0x3b9d16[_0x34c6ab(0x228)]>0x0&&(_0x3b9d16+=_0x34c26c),_0x3b9d16;},PluginManager[_0x3beee9(0x722)](pluginData['name'],_0x3beee9(0x2f0),_0x5b0991=>{const _0x242da8=_0x3beee9;VisuMZ['ConvertParams'](_0x5b0991,_0x5b0991);const _0x51c188=_0x5b0991[_0x242da8(0x864)];VisuMZ['openURL'](_0x51c188);}),PluginManager[_0x3beee9(0x722)](pluginData[_0x3beee9(0x148)],'GoldChange',_0x3af2ef=>{const _0xd5f29b=_0x3beee9;VisuMZ[_0xd5f29b(0x783)](_0x3af2ef,_0x3af2ef);const _0x2c109a=_0x3af2ef[_0xd5f29b(0x31e)]||0x0;$gameParty[_0xd5f29b(0x3db)](_0x2c109a);}),PluginManager[_0x3beee9(0x722)](pluginData[_0x3beee9(0x148)],_0x3beee9(0x65a),_0x32ebce=>{const _0x15723c=_0x3beee9;if(!SceneManager[_0x15723c(0x799)]())return;VisuMZ['ConvertParams'](_0x32ebce,_0x32ebce);const _0x466219=_0x32ebce[_0x15723c(0x6ff)];SceneManager[_0x15723c(0x854)][_0x15723c(0x2e2)](_0x466219);}),PluginManager[_0x3beee9(0x722)](pluginData[_0x3beee9(0x148)],_0x3beee9(0x551),_0x12fb93=>{const _0xe4b640=_0x3beee9;if(!$gameTemp[_0xe4b640(0x441)]())return;if(!Utils[_0xe4b640(0x86e)]())return;VisuMZ[_0xe4b640(0x783)](_0x12fb93,_0x12fb93);const _0x1118b6=_0x12fb93[_0xe4b640(0x5e3)]||0x1;$gameTemp[_0xe4b640(0x163)]=_0x1118b6;}),PluginManager[_0x3beee9(0x722)](pluginData[_0x3beee9(0x148)],'PictureEasingType',_0x1ec9dd=>{const _0x5cb7ec=_0x3beee9;VisuMZ['ConvertParams'](_0x1ec9dd,_0x1ec9dd);const _0x40fd9a=_0x1ec9dd[_0x5cb7ec(0x57a)]||0x1,_0x541d48=_0x1ec9dd['easingType']||_0x5cb7ec(0x3c2),_0x52a194=$gameScreen[_0x5cb7ec(0x318)](_0x40fd9a);_0x52a194&&_0x52a194[_0x5cb7ec(0x5ee)](_0x541d48);}),PluginManager[_0x3beee9(0x722)](pluginData[_0x3beee9(0x148)],_0x3beee9(0x733),_0x35f19e=>{const _0x5537a5=_0x3beee9;for(let _0x4c9d4c=0x1;_0x4c9d4c<=$gameScreen[_0x5537a5(0x179)]();_0x4c9d4c++){$gameScreen[_0x5537a5(0x668)](_0x4c9d4c);}}),PluginManager[_0x3beee9(0x722)](pluginData[_0x3beee9(0x148)],_0x3beee9(0x3d5),_0x50ef26=>{const _0x2aaf2b=_0x3beee9;VisuMZ[_0x2aaf2b(0x783)](_0x50ef26,_0x50ef26);const _0x24552c=Math[_0x2aaf2b(0x142)](_0x50ef26['StartID'],_0x50ef26[_0x2aaf2b(0x23d)]),_0x385a2b=Math['max'](_0x50ef26[_0x2aaf2b(0x7b5)],_0x50ef26[_0x2aaf2b(0x23d)]);for(let _0x1205d8=_0x24552c;_0x1205d8<=_0x385a2b;_0x1205d8++){$gameScreen[_0x2aaf2b(0x668)](_0x1205d8);}}),PluginManager['registerCommand'](pluginData[_0x3beee9(0x148)],_0x3beee9(0x29b),_0x4e8db0=>{const _0x1a023c=_0x3beee9;VisuMZ[_0x1a023c(0x783)](_0x4e8db0,_0x4e8db0);const _0x338046=Math[_0x1a023c(0x368)](_0x4e8db0[_0x1a023c(0x5e3)])[_0x1a023c(0x3fd)](0x1,0x64),_0x1f7b55=-Number(_0x4e8db0['AdjustAngle']||0x0),_0x2e08b9=Math['max'](_0x4e8db0[_0x1a023c(0x164)]||0x0,0x0),_0x5d7ba=_0x4e8db0[_0x1a023c(0x762)]||_0x1a023c(0x3c2),_0x12b8e3=_0x4e8db0[_0x1a023c(0x30f)],_0x32d7ea=$gameScreen[_0x1a023c(0x318)](_0x338046);if(!_0x32d7ea)return;_0x32d7ea[_0x1a023c(0x270)](_0x1f7b55,_0x2e08b9,_0x5d7ba);if(_0x12b8e3){const _0x199722=$gameTemp['getLastPluginCommandInterpreter']();if(_0x199722)_0x199722[_0x1a023c(0x300)](_0x2e08b9);}}),PluginManager[_0x3beee9(0x722)](pluginData[_0x3beee9(0x148)],_0x3beee9(0x70b),_0x33302a=>{const _0x547479=_0x3beee9;VisuMZ[_0x547479(0x783)](_0x33302a,_0x33302a);const _0x141540=Math[_0x547479(0x368)](_0x33302a[_0x547479(0x5e3)])['clamp'](0x1,0x64),_0x23f271=-Number(_0x33302a[_0x547479(0x6b1)]||0x0),_0x8d00c3=Math[_0x547479(0x38a)](_0x33302a[_0x547479(0x164)]||0x0,0x0),_0x1b165e=_0x33302a[_0x547479(0x762)]||'Linear',_0x1431e1=_0x33302a['Wait'],_0x3dd7f6=$gameScreen[_0x547479(0x318)](_0x141540);if(!_0x3dd7f6)return;_0x3dd7f6['setAnglePlusData'](_0x23f271,_0x8d00c3,_0x1b165e);if(_0x1431e1){const _0x288410=$gameTemp[_0x547479(0x72b)]();if(_0x288410)_0x288410[_0x547479(0x300)](_0x8d00c3);}}),PluginManager[_0x3beee9(0x722)](pluginData[_0x3beee9(0x148)],'PictureShowIcon',_0x4a0752=>{const _0x5d6f73=_0x3beee9;VisuMZ[_0x5d6f73(0x783)](_0x4a0752,_0x4a0752);const _0x49d847=Math[_0x5d6f73(0x368)](_0x4a0752[_0x5d6f73(0x5e3)])[_0x5d6f73(0x3fd)](0x1,0x64),_0x116512=_0x4a0752[_0x5d6f73(0x46c)],_0x2c4148=_0x116512[_0x5d6f73(0x578)]['clamp'](0x0,0x1),_0x4ce238=Math['round'](_0x116512['PositionX']||0x0),_0x229648=Math[_0x5d6f73(0x368)](_0x116512[_0x5d6f73(0x778)]||0x0),_0x51ab3a=Math[_0x5d6f73(0x368)](_0x116512[_0x5d6f73(0x5bc)]||0x0),_0x32ac09=Math[_0x5d6f73(0x368)](_0x116512[_0x5d6f73(0x5a4)]||0x0),_0x2a13a1=Math[_0x5d6f73(0x368)](_0x116512[_0x5d6f73(0x728)])['clamp'](0x0,0xff),_0x3b9f8f=_0x116512[_0x5d6f73(0x552)],_0x301305=_0x5d6f73(0x72f),_0x367ce2=_0x4a0752['Smooth']?_0x5d6f73(0x175):_0x5d6f73(0x47f),_0x23e414=_0x301305['format'](_0x4a0752[_0x5d6f73(0x2c1)],_0x367ce2);$gameScreen['showPicture'](_0x49d847,_0x23e414,_0x2c4148,_0x4ce238,_0x229648,_0x51ab3a,_0x32ac09,_0x2a13a1,_0x3b9f8f);}),PluginManager['registerCommand'](pluginData[_0x3beee9(0x148)],'ScreenShake',_0x278235=>{const _0x5d7439=_0x3beee9;VisuMZ['ConvertParams'](_0x278235,_0x278235);const _0x4dc48d=_0x278235[_0x5d7439(0x23f)]||_0x5d7439(0x6fd),_0x542214=_0x278235['Power'][_0x5d7439(0x3fd)](0x1,0x9),_0x389af1=_0x278235[_0x5d7439(0x471)]['clamp'](0x1,0x9),_0x201051=_0x278235['Duration']||0x1,_0x33ad97=_0x278235[_0x5d7439(0x30f)];$gameScreen[_0x5d7439(0x781)](_0x4dc48d),$gameScreen[_0x5d7439(0x4f6)](_0x542214,_0x389af1,_0x201051);if(_0x33ad97){const _0x1762d4=$gameTemp[_0x5d7439(0x72b)]();if(_0x1762d4)_0x1762d4[_0x5d7439(0x300)](_0x201051);}}),PluginManager['registerCommand'](pluginData['name'],_0x3beee9(0x41e),_0x5c4f1e=>{const _0x3abcdf=_0x3beee9;if($gameParty[_0x3abcdf(0x811)]())return;VisuMZ[_0x3abcdf(0x783)](_0x5c4f1e,_0x5c4f1e);const _0x245d8f=_0x5c4f1e['IDs'],_0x8d91fd=(_0x5c4f1e['Chance']||0x0)/0x64;for(const _0x2ade3c of _0x245d8f){const _0x1cb8e3=Math[_0x3abcdf(0x6fd)]()<=_0x8d91fd;$gameSwitches[_0x3abcdf(0x410)](_0x2ade3c,_0x1cb8e3);}}),PluginManager[_0x3beee9(0x722)](pluginData[_0x3beee9(0x148)],_0x3beee9(0x7a5),_0x340761=>{const _0x55de8d=_0x3beee9;if($gameParty[_0x55de8d(0x811)]())return;VisuMZ[_0x55de8d(0x783)](_0x340761,_0x340761);const _0x4a951c=Math[_0x55de8d(0x142)](_0x340761[_0x55de8d(0x7b5)],_0x340761[_0x55de8d(0x23d)]),_0xafb0f5=Math[_0x55de8d(0x38a)](_0x340761['StartID'],_0x340761['EndingID']),_0x419805=(_0x340761['Chance']||0x0)/0x64;for(let _0x41c18a=_0x4a951c;_0x41c18a<=_0xafb0f5;_0x41c18a++){const _0x49acbd=Math['random']()<=_0x419805;$gameSwitches[_0x55de8d(0x410)](_0x41c18a,_0x49acbd);}}),PluginManager[_0x3beee9(0x722)](pluginData['name'],_0x3beee9(0x19f),_0x15bbc2=>{const _0x44d8fb=_0x3beee9;if($gameParty[_0x44d8fb(0x811)]())return;VisuMZ[_0x44d8fb(0x783)](_0x15bbc2,_0x15bbc2);const _0x180a88=_0x15bbc2[_0x44d8fb(0x5c2)];for(const _0x5cf5a0 of _0x180a88){const _0x40e462=$gameSwitches['value'](_0x5cf5a0);$gameSwitches['setValue'](_0x5cf5a0,!_0x40e462);}}),PluginManager[_0x3beee9(0x722)](pluginData['name'],_0x3beee9(0x467),_0x543361=>{const _0x4e533d=_0x3beee9;if($gameParty[_0x4e533d(0x811)]())return;VisuMZ[_0x4e533d(0x783)](_0x543361,_0x543361);const _0x530884=Math[_0x4e533d(0x142)](_0x543361[_0x4e533d(0x7b5)],_0x543361[_0x4e533d(0x23d)]),_0x3ddd67=Math[_0x4e533d(0x38a)](_0x543361[_0x4e533d(0x7b5)],_0x543361['EndingID']);for(let _0xc2d1c0=_0x530884;_0xc2d1c0<=_0x3ddd67;_0xc2d1c0++){const _0x45bba9=$gameSwitches['value'](_0xc2d1c0);$gameSwitches[_0x4e533d(0x410)](_0xc2d1c0,!_0x45bba9);}}),PluginManager[_0x3beee9(0x722)](pluginData['name'],_0x3beee9(0x546),_0x158d61=>{const _0x24dfe9=_0x3beee9;VisuMZ[_0x24dfe9(0x783)](_0x158d61,_0x158d61);const _0x5bd44e=_0x158d61[_0x24dfe9(0x727)]||0x1;$gameSystem[_0x24dfe9(0x7e3)](_0x5bd44e);}),PluginManager[_0x3beee9(0x722)](pluginData['name'],'SystemSetSideView',_0x55153a=>{const _0x34ca48=_0x3beee9;if($gameParty[_0x34ca48(0x811)]())return;VisuMZ['ConvertParams'](_0x55153a,_0x55153a);const _0x741e5d=_0x55153a['option'];if(_0x741e5d[_0x34ca48(0x56a)](/Front/i))$gameSystem['setSideView'](![]);else _0x741e5d[_0x34ca48(0x56a)](/Side/i)?$gameSystem[_0x34ca48(0x53f)](!![]):$gameSystem[_0x34ca48(0x53f)](!$gameSystem[_0x34ca48(0x52c)]());}),PluginManager['registerCommand'](pluginData['name'],_0x3beee9(0x324),_0x12e917=>{const _0x28fc05=_0x3beee9;if($gameParty[_0x28fc05(0x811)]())return;VisuMZ[_0x28fc05(0x783)](_0x12e917,_0x12e917);const _0xb0188=['bgm',_0x28fc05(0x1e3),'me','se'];for(const _0x458c16 of _0xb0188){const _0x26d3e5=_0x12e917[_0x458c16],_0x4c8727=_0x28fc05(0x715)[_0x28fc05(0x48d)](_0x458c16);for(const _0x23ad67 of _0x26d3e5){AudioManager['createBuffer'](_0x4c8727,_0x23ad67);}}}),PluginManager[_0x3beee9(0x722)](pluginData[_0x3beee9(0x148)],_0x3beee9(0x649),_0x161eab=>{const _0x1d9909=_0x3beee9;if($gameParty['inBattle']())return;VisuMZ['ConvertParams'](_0x161eab,_0x161eab);const _0x5d64a6=[_0x1d9909(0x522),_0x1d9909(0x4dd),_0x1d9909(0x180),'characters','enemies','faces','parallaxes','pictures','sv_actors',_0x1d9909(0x68a),'system',_0x1d9909(0xf3),'titles1',_0x1d9909(0x7e4)];for(const _0x5d4237 of _0x5d64a6){const _0x3fbe76=_0x161eab[_0x5d4237],_0x2e1c63='img/%1/'['format'](_0x5d4237);for(const _0x3b0fe7 of _0x3fbe76){ImageManager['loadBitmap'](_0x2e1c63,_0x3b0fe7);}}}),PluginManager[_0x3beee9(0x722)](pluginData[_0x3beee9(0x148)],_0x3beee9(0x2f7),_0x5f5a27=>{const _0x19e23f=_0x3beee9;if($gameParty[_0x19e23f(0x811)]())return;VisuMZ[_0x19e23f(0x783)](_0x5f5a27,_0x5f5a27);const _0x511115=_0x5f5a27[_0x19e23f(0x727)][_0x19e23f(0x4d5)]()['trim'](),_0x4fc4a4=VisuMZ[_0x19e23f(0x186)][_0x19e23f(0x735)](_0x511115);$gameSystem[_0x19e23f(0x1e1)](_0x4fc4a4);}),VisuMZ['CoreEngine'][_0x3beee9(0x735)]=function(_0x1a62fb){const _0x2262d8=_0x3beee9;_0x1a62fb=_0x1a62fb||'DATABASE',_0x1a62fb=String(_0x1a62fb)[_0x2262d8(0x4d5)]()[_0x2262d8(0x42d)]();switch(_0x1a62fb){case _0x2262d8(0x710):return 0x0;case _0x2262d8(0x45f):Imported[_0x2262d8(0x7b1)]&&(ConfigManager[_0x2262d8(0x593)]=!![]);return 0x1;case _0x2262d8(0x6c5):Imported[_0x2262d8(0x7b1)]&&(ConfigManager['atbActive']=![]);return 0x2;case _0x2262d8(0x604):if(Imported[_0x2262d8(0x5eb)])return _0x2262d8(0x604);break;case'STB':if(Imported[_0x2262d8(0x193)])return'STB';break;case _0x2262d8(0x685):if(Imported['VisuMZ_2_BattleSystemBTB'])return _0x2262d8(0x685);break;case'FTB':if(Imported[_0x2262d8(0x743)])return _0x2262d8(0x10a);break;case _0x2262d8(0x43d):if(Imported[_0x2262d8(0x116)])return _0x2262d8(0x43d);break;case _0x2262d8(0x339):if(Imported[_0x2262d8(0x46d)])return _0x2262d8(0x339);break;case _0x2262d8(0x127):if(Imported[_0x2262d8(0x317)])return _0x2262d8(0x127);break;}return $dataSystem[_0x2262d8(0x3d1)];},PluginManager[_0x3beee9(0x722)](pluginData[_0x3beee9(0x148)],_0x3beee9(0x223),_0x52e6d7=>{const _0x49639d=_0x3beee9;VisuMZ[_0x49639d(0x783)](_0x52e6d7,_0x52e6d7);const _0x455777=_0x52e6d7[_0x49639d(0x727)]||0x1;$gameSystem[_0x49639d(0x68f)](_0x455777);}),PluginManager[_0x3beee9(0x722)](pluginData[_0x3beee9(0x148)],'TextPopupShow',_0x5dadae=>{VisuMZ['ConvertParams'](_0x5dadae,_0x5dadae);const _0x35f92a=_0x5dadae['text']||'';$textPopup(_0x35f92a);}),PluginManager[_0x3beee9(0x722)](pluginData[_0x3beee9(0x148)],'VariableEvalReference',_0x26e788=>{const _0x2799b2=_0x3beee9;VisuMZ['ConvertParams'](_0x26e788,_0x26e788);const _0x49420c=_0x26e788['id']||0x1,_0x130600=_0x26e788[_0x2799b2(0x4c4)],_0x27eb1b=_0x26e788[_0x2799b2(0x504)]||0x0;let _0x258cbf=$gameVariables[_0x2799b2(0x31e)](_0x49420c)||0x0;switch(_0x130600){case'=':_0x258cbf=_0x27eb1b;break;case'+':_0x258cbf+=_0x27eb1b;break;case'-':_0x258cbf-=_0x27eb1b;break;case'*':_0x258cbf*=_0x27eb1b;break;case'/':_0x258cbf/=_0x27eb1b;break;case'%':_0x258cbf%=_0x27eb1b;break;}_0x258cbf=_0x258cbf||0x0,$gameVariables[_0x2799b2(0x410)](_0x49420c,_0x258cbf);}),PluginManager[_0x3beee9(0x722)](pluginData['name'],_0x3beee9(0x58d),_0x1a37ca=>{const _0x27f359=_0x3beee9;VisuMZ[_0x27f359(0x783)](_0x1a37ca,_0x1a37ca);const _0xa1b092=_0x1a37ca['id']()||0x1,_0x2aed47=_0x1a37ca[_0x27f359(0x4c4)],_0x3727f9=_0x1a37ca[_0x27f359(0x504)]()||0x0;let _0x471cb9=$gameVariables[_0x27f359(0x31e)](_0xa1b092)||0x0;switch(_0x2aed47){case'=':_0x471cb9=_0x3727f9;break;case'+':_0x471cb9+=_0x3727f9;break;case'-':_0x471cb9-=_0x3727f9;break;case'*':_0x471cb9*=_0x3727f9;break;case'/':_0x471cb9/=_0x3727f9;break;case'%':_0x471cb9%=_0x3727f9;break;}_0x471cb9=_0x471cb9||0x0,$gameVariables[_0x27f359(0x410)](_0xa1b092,_0x471cb9);}),VisuMZ['CoreEngine'][_0x3beee9(0x4ad)]=Scene_Boot[_0x3beee9(0x413)][_0x3beee9(0x5bb)],Scene_Boot[_0x3beee9(0x413)][_0x3beee9(0x5bb)]=function(){const _0x5ef3f8=_0x3beee9;VisuMZ['CoreEngine'][_0x5ef3f8(0x4ad)][_0x5ef3f8(0x573)](this),this[_0x5ef3f8(0x302)](),this['process_VisuMZ_CoreEngine_Notetags'](),this[_0x5ef3f8(0x32e)](),this[_0x5ef3f8(0x405)](),this['process_VisuMZ_CoreEngine_CustomParameters'](),this[_0x5ef3f8(0x1dc)](),VisuMZ[_0x5ef3f8(0x648)]();},VisuMZ['CoreEngine'][_0x3beee9(0x6fa)]={},Scene_Boot[_0x3beee9(0x413)]['process_VisuMZ_CoreEngine_RegExp']=function(){const _0x428a60=_0x3beee9,_0x219c04=[_0x428a60(0x64f),_0x428a60(0x27f),_0x428a60(0x309),_0x428a60(0x329),_0x428a60(0x2a0),_0x428a60(0x7b9),'AGI',_0x428a60(0xfc)],_0x333f14=[_0x428a60(0x56f),_0x428a60(0x720),'CRI',_0x428a60(0x4e2),_0x428a60(0x650),_0x428a60(0x107),_0x428a60(0x79e),_0x428a60(0x322),'MRG',_0x428a60(0x263)],_0xefd967=[_0x428a60(0x37e),'GRD','REC',_0x428a60(0x11d),_0x428a60(0x7bf),_0x428a60(0x667),_0x428a60(0x452),_0x428a60(0x3d7),_0x428a60(0x183),_0x428a60(0x7a3)],_0x15f967=[_0x219c04,_0x333f14,_0xefd967],_0x40fb2c=[_0x428a60(0x239),_0x428a60(0x2d4),'Plus2','Max',_0x428a60(0x40b),_0x428a60(0x2a3),_0x428a60(0x639),'Flat',_0x428a60(0x538),_0x428a60(0x3ac)];for(const _0xa8a4b8 of _0x15f967){let _0x4378df='';if(_0xa8a4b8===_0x219c04)_0x4378df=_0x428a60(0x225);if(_0xa8a4b8===_0x333f14)_0x4378df=_0x428a60(0x82e);if(_0xa8a4b8===_0xefd967)_0x4378df=_0x428a60(0x7fe);for(const _0x325d50 of _0x40fb2c){let _0x3d7d4c='%1%2'['format'](_0x4378df,_0x325d50);VisuMZ['CoreEngine']['RegExp'][_0x3d7d4c]=[],VisuMZ['CoreEngine'][_0x428a60(0x6fa)][_0x3d7d4c+'JS']=[];let _0x410ed8=_0x428a60(0x6b5);if([_0x428a60(0x239),_0x428a60(0x617)][_0x428a60(0x820)](_0x325d50))_0x410ed8+='([\x5c+\x5c-]\x5cd+)>';else{if([_0x428a60(0x2d4),_0x428a60(0x538)][_0x428a60(0x820)](_0x325d50))_0x410ed8+='([\x5c+\x5c-]\x5cd+)([%％])>';else{if([_0x428a60(0x572),_0x428a60(0x3ac)]['includes'](_0x325d50))_0x410ed8+=_0x428a60(0x637);else{if(_0x325d50===_0x428a60(0x3a4))_0x410ed8+=_0x428a60(0x453);else{if(_0x325d50===_0x428a60(0x2a3))_0x410ed8+=_0x428a60(0xf9);else _0x325d50===_0x428a60(0x639)&&(_0x410ed8+=_0x428a60(0x1d6));}}}}for(const _0x458173 of _0xa8a4b8){let _0x3767bc=_0x325d50[_0x428a60(0x6bf)](/[\d+]/g,'')['toUpperCase']();const _0x3842e9=_0x410ed8['format'](_0x458173,_0x3767bc);VisuMZ[_0x428a60(0x186)][_0x428a60(0x6fa)][_0x3d7d4c][_0x428a60(0x188)](new RegExp(_0x3842e9,'i'));const _0x450b38=_0x428a60(0x651)[_0x428a60(0x48d)](_0x458173,_0x3767bc);VisuMZ[_0x428a60(0x186)][_0x428a60(0x6fa)][_0x3d7d4c+'JS']['push'](new RegExp(_0x450b38,'i'));}}}},Scene_Boot[_0x3beee9(0x413)]['process_VisuMZ_CoreEngine_Notetags']=function(){const _0x4435e2=_0x3beee9;if(VisuMZ[_0x4435e2(0x648)])return;},Scene_Boot[_0x3beee9(0x413)][_0x3beee9(0x32e)]=function(){const _0x51299c=_0x3beee9,_0x53a90e=VisuMZ[_0x51299c(0x186)][_0x51299c(0x46c)];_0x53a90e[_0x51299c(0x72e)][_0x51299c(0x2f6)]&&VisuMZ['ShowDevTools'](!![]);_0x53a90e[_0x51299c(0x72e)]['ModernControls']&&(Input[_0x51299c(0x75a)][0x23]=_0x51299c(0x12f),Input[_0x51299c(0x75a)][0x24]=_0x51299c(0x844));if(_0x53a90e[_0x51299c(0x492)]){const _0x455fe4=_0x53a90e[_0x51299c(0x492)];_0x455fe4[_0x51299c(0x5de)]=_0x455fe4[_0x51299c(0x5de)]||'\x5c}❪SHIFT❫\x5c{',_0x455fe4[_0x51299c(0x5ff)]=_0x455fe4[_0x51299c(0x5ff)]||_0x51299c(0x866);}_0x53a90e[_0x51299c(0x545)][_0x51299c(0x688)]&&(Input['keyMapper'][0x57]='up',Input[_0x51299c(0x75a)][0x41]=_0x51299c(0x4a4),Input[_0x51299c(0x75a)][0x53]='down',Input[_0x51299c(0x75a)][0x44]=_0x51299c(0x216),Input[_0x51299c(0x75a)][0x45]=_0x51299c(0x1e2)),_0x53a90e[_0x51299c(0x545)][_0x51299c(0x861)]&&(Input[_0x51299c(0x75a)][0x52]=_0x51299c(0x5c3)),_0x53a90e[_0x51299c(0x234)][_0x51299c(0x4fc)]=_0x53a90e[_0x51299c(0x234)][_0x51299c(0x4fc)]['map'](_0x9f233a=>_0x9f233a[_0x51299c(0x4d5)]()[_0x51299c(0x42d)]()),_0x53a90e[_0x51299c(0x234)]['ExtDisplayedParams']=_0x53a90e['Param'][_0x51299c(0x340)][_0x51299c(0x5c5)](_0x5b0939=>_0x5b0939[_0x51299c(0x4d5)]()[_0x51299c(0x42d)]()),_0x53a90e[_0x51299c(0x72e)]['ShiftR_Toggle']=_0x53a90e[_0x51299c(0x72e)][_0x51299c(0x4b0)]??!![],_0x53a90e['QoL'][_0x51299c(0x166)]=_0x53a90e[_0x51299c(0x72e)][_0x51299c(0x166)]??!![],_0x53a90e[_0x51299c(0x492)]['SplitEscape']&&VisuMZ[_0x51299c(0x186)][_0x51299c(0x54c)]();},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x54c)]=function(){const _0x460156=_0x3beee9;let _0x5302d=![],_0x3062e6=![];for(let _0x304050 in Input[_0x460156(0x75a)]){const _0x33e7fa=Input[_0x460156(0x75a)][_0x304050];if(_0x33e7fa===_0x460156(0x3e4))_0x5302d=!![];if(_0x33e7fa==='cancel')_0x3062e6=!![];if(_0x5302d&&_0x3062e6)return;}let _0xf0876d=_0x460156(0x6de);_0xf0876d+=_0x460156(0x20e),_0xf0876d+='buttons!\x20Go\x20to\x20project\x27s\x20rmmz_core.js\x20and\x20modify\x20Input.keyMapper\x20',_0xf0876d+=_0x460156(0x1ab),_0xf0876d+=_0x460156(0x535),alert(_0xf0876d),SceneManager['exit']();},Scene_Boot[_0x3beee9(0x413)][_0x3beee9(0x405)]=function(){const _0x3ef075=_0x3beee9;this[_0x3ef075(0x387)]();},Scene_Boot[_0x3beee9(0x413)]['process_VisuMZ_CoreEngine_jsQuickFunctions']=function(){const _0x173c99=_0x3beee9,_0x258139=VisuMZ[_0x173c99(0x186)][_0x173c99(0x46c)][_0x173c99(0x177)];for(const _0x4f5a5c of _0x258139){const _0x2f5c38=_0x4f5a5c['FunctionName'][_0x173c99(0x6bf)](/[ ]/g,''),_0x7609d1=_0x4f5a5c[_0x173c99(0x2c5)];VisuMZ[_0x173c99(0x186)][_0x173c99(0x15f)](_0x2f5c38,_0x7609d1);}},VisuMZ[_0x3beee9(0x186)]['createJsQuickFunction']=function(_0x4442f0,_0x386654){const _0xacac6=_0x3beee9;if(!!window[_0x4442f0]){if($gameTemp[_0xacac6(0x441)]())console['log'](_0xacac6(0x1b9)['format'](_0x4442f0));}const _0x27969c=_0xacac6(0xe2)[_0xacac6(0x48d)](_0x4442f0,_0x386654);window[_0x4442f0]=new Function(_0x27969c);},Scene_Boot[_0x3beee9(0x413)][_0x3beee9(0x81f)]=function(){const _0x57cada=_0x3beee9,_0x6f5f54=VisuMZ['CoreEngine'][_0x57cada(0x46c)][_0x57cada(0x6d5)];if(!_0x6f5f54)return;for(const _0x4ab05c of _0x6f5f54){if(!_0x4ab05c)continue;VisuMZ['CoreEngine'][_0x57cada(0x250)](_0x4ab05c);}},VisuMZ[_0x3beee9(0x186)]['CustomParamNames']={},VisuMZ['CoreEngine']['CustomParamIcons']={},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x622)]={},VisuMZ['CoreEngine']['CustomParamAbb']={},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x250)]=function(_0x3b5752){const _0x2fd8a8=_0x3beee9,_0x56394a=_0x3b5752[_0x2fd8a8(0x384)],_0x400421=_0x3b5752[_0x2fd8a8(0x671)],_0x48cbad=_0x3b5752[_0x2fd8a8(0x119)],_0x3e2946=_0x3b5752[_0x2fd8a8(0x23f)],_0x1f2737=new Function(_0x3b5752[_0x2fd8a8(0x2f2)]);VisuMZ[_0x2fd8a8(0x186)][_0x2fd8a8(0x6f5)][_0x56394a[_0x2fd8a8(0x4d5)]()['trim']()]=_0x400421,VisuMZ[_0x2fd8a8(0x186)][_0x2fd8a8(0x312)][_0x56394a['toUpperCase']()[_0x2fd8a8(0x42d)]()]=_0x48cbad,VisuMZ[_0x2fd8a8(0x186)][_0x2fd8a8(0x622)][_0x56394a[_0x2fd8a8(0x4d5)]()[_0x2fd8a8(0x42d)]()]=_0x3e2946,VisuMZ[_0x2fd8a8(0x186)][_0x2fd8a8(0x67b)][_0x56394a[_0x2fd8a8(0x4d5)]()['trim']()]=_0x56394a,Object[_0x2fd8a8(0x192)](Game_BattlerBase[_0x2fd8a8(0x413)],_0x56394a,{'get'(){const _0x1d85e6=_0x2fd8a8,_0x3c643d=_0x1f2737[_0x1d85e6(0x573)](this);return _0x3e2946==='integer'?Math[_0x1d85e6(0x368)](_0x3c643d):_0x3c643d;}});},VisuMZ[_0x3beee9(0x186)]['ControllerButtons']={},VisuMZ['CoreEngine']['ControllerMatches']={},Scene_Boot[_0x3beee9(0x413)][_0x3beee9(0x1dc)]=function(){const _0x50af61=_0x3beee9,_0x4d51a7=VisuMZ['CoreEngine'][_0x50af61(0x46c)][_0x50af61(0x463)];for(const _0x2ba07f of _0x4d51a7){const _0x50a072=(_0x2ba07f[_0x50af61(0x60f)]||'')[_0x50af61(0xbc)]()[_0x50af61(0x42d)](),_0x52ba59=(_0x2ba07f['Match']||'')[_0x50af61(0xbc)]()[_0x50af61(0x42d)]();VisuMZ['CoreEngine'][_0x50af61(0x463)][_0x50a072]=_0x2ba07f,VisuMZ[_0x50af61(0x186)][_0x50af61(0x443)][_0x52ba59]=_0x50a072;}},VisuMZ[_0x3beee9(0x648)]=function(){const _0x692f26=_0x3beee9;for(const _0x4e568b of $dataActors){if(_0x4e568b)VisuMZ[_0x692f26(0x378)](_0x4e568b);}for(const _0xe12f80 of $dataClasses){if(_0xe12f80)VisuMZ['ParseClassNotetags'](_0xe12f80);}for(const _0x5200b4 of $dataSkills){if(_0x5200b4)VisuMZ[_0x692f26(0x3c5)](_0x5200b4);}for(const _0x330c99 of $dataItems){if(_0x330c99)VisuMZ['ParseItemNotetags'](_0x330c99);}for(const _0x206e32 of $dataWeapons){if(_0x206e32)VisuMZ[_0x692f26(0xb7)](_0x206e32);}for(const _0x1a332a of $dataArmors){if(_0x1a332a)VisuMZ[_0x692f26(0xd4)](_0x1a332a);}for(const _0x4fd9b9 of $dataEnemies){if(_0x4fd9b9)VisuMZ[_0x692f26(0x86a)](_0x4fd9b9);}for(const _0x400a65 of $dataStates){if(_0x400a65)VisuMZ['ParseStateNotetags'](_0x400a65);}for(const _0x8091bc of $dataTilesets){if(_0x8091bc)VisuMZ[_0x692f26(0x311)](_0x8091bc);}},VisuMZ[_0x3beee9(0x378)]=function(_0x6f879e){},VisuMZ[_0x3beee9(0x782)]=function(_0x4c5123){},VisuMZ[_0x3beee9(0x3c5)]=function(_0x5e5a09){},VisuMZ['ParseItemNotetags']=function(_0x17b315){},VisuMZ['ParseWeaponNotetags']=function(_0x28eb7f){},VisuMZ[_0x3beee9(0xd4)]=function(_0x43f9b9){},VisuMZ[_0x3beee9(0x86a)]=function(_0x3cdea2){},VisuMZ[_0x3beee9(0x3f5)]=function(_0x4a58d8){},VisuMZ[_0x3beee9(0x311)]=function(_0x130b9b){},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x378)]=VisuMZ[_0x3beee9(0x378)],VisuMZ[_0x3beee9(0x378)]=function(_0x11a3a3){const _0x1581b4=_0x3beee9;VisuMZ[_0x1581b4(0x186)][_0x1581b4(0x378)][_0x1581b4(0x573)](this,_0x11a3a3);const _0x346c34=_0x11a3a3['note'];if(_0x346c34['match'](/<MAX LEVEL:[ ](\d+)>/i)){_0x11a3a3[_0x1581b4(0x660)]=Number(RegExp['$1']);if(_0x11a3a3[_0x1581b4(0x660)]===0x0)_0x11a3a3[_0x1581b4(0x660)]=Number['MAX_SAFE_INTEGER'];}_0x346c34[_0x1581b4(0x56a)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x11a3a3['initialLevel']=Math[_0x1581b4(0x142)](Number(RegExp['$1']),_0x11a3a3[_0x1581b4(0x660)]));},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x782)]=VisuMZ[_0x3beee9(0x782)],VisuMZ[_0x3beee9(0x782)]=function(_0x307967){const _0x5668ed=_0x3beee9;VisuMZ['CoreEngine']['ParseClassNotetags'][_0x5668ed(0x573)](this,_0x307967);if(_0x307967[_0x5668ed(0x4af)])for(const _0x55959b of _0x307967['learnings']){_0x55959b[_0x5668ed(0x7ee)][_0x5668ed(0x56a)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x55959b['level']=Math['max'](Number(RegExp['$1']),0x1));}},VisuMZ[_0x3beee9(0x186)]['ParseEnemyNotetags']=VisuMZ[_0x3beee9(0x86a)],VisuMZ[_0x3beee9(0x86a)]=function(_0x39ecdd){const _0x398631=_0x3beee9;VisuMZ[_0x398631(0x186)][_0x398631(0x86a)][_0x398631(0x573)](this,_0x39ecdd),_0x39ecdd[_0x398631(0x245)]=0x1;const _0x2defcb=_0x39ecdd[_0x398631(0x7ee)];if(_0x2defcb['match'](/<LEVEL:[ ](\d+)>/i))_0x39ecdd[_0x398631(0x245)]=Number(RegExp['$1']);if(_0x2defcb[_0x398631(0x56a)](/<MAXHP:[ ](\d+)>/i))_0x39ecdd[_0x398631(0x3ee)][0x0]=Number(RegExp['$1']);if(_0x2defcb[_0x398631(0x56a)](/<MAXMP:[ ](\d+)>/i))_0x39ecdd[_0x398631(0x3ee)][0x1]=Number(RegExp['$1']);if(_0x2defcb[_0x398631(0x56a)](/<ATK:[ ](\d+)>/i))_0x39ecdd[_0x398631(0x3ee)][0x2]=Number(RegExp['$1']);if(_0x2defcb[_0x398631(0x56a)](/<DEF:[ ](\d+)>/i))_0x39ecdd[_0x398631(0x3ee)][0x3]=Number(RegExp['$1']);if(_0x2defcb[_0x398631(0x56a)](/<MAT:[ ](\d+)>/i))_0x39ecdd[_0x398631(0x3ee)][0x4]=Number(RegExp['$1']);if(_0x2defcb[_0x398631(0x56a)](/<MDF:[ ](\d+)>/i))_0x39ecdd['params'][0x5]=Number(RegExp['$1']);if(_0x2defcb[_0x398631(0x56a)](/<AGI:[ ](\d+)>/i))_0x39ecdd[_0x398631(0x3ee)][0x6]=Number(RegExp['$1']);if(_0x2defcb['match'](/<LUK:[ ](\d+)>/i))_0x39ecdd[_0x398631(0x3ee)][0x7]=Number(RegExp['$1']);if(_0x2defcb[_0x398631(0x56a)](/<EXP:[ ](\d+)>/i))_0x39ecdd[_0x398631(0x583)]=Number(RegExp['$1']);if(_0x2defcb[_0x398631(0x56a)](/<GOLD:[ ](\d+)>/i))_0x39ecdd[_0x398631(0x320)]=Number(RegExp['$1']);},VisuMZ['CoreEngine']['Graphics_defaultStretchMode']=Graphics[_0x3beee9(0x534)],Graphics['_defaultStretchMode']=function(){const _0x4f3d49=_0x3beee9;switch(VisuMZ['CoreEngine'][_0x4f3d49(0x46c)][_0x4f3d49(0x72e)][_0x4f3d49(0x205)]){case _0x4f3d49(0x7ce):return!![];case'normal':return![];default:return VisuMZ[_0x4f3d49(0x186)][_0x4f3d49(0x561)][_0x4f3d49(0x573)](this);}},VisuMZ['CoreEngine'][_0x3beee9(0x15b)]=Graphics[_0x3beee9(0x7ec)],Graphics[_0x3beee9(0x7ec)]=function(_0x253854,_0x4f2f5d,_0xb2234c=null){const _0x243c19=_0x3beee9;VisuMZ[_0x243c19(0x186)][_0x243c19(0x15b)][_0x243c19(0x573)](this,_0x253854,_0x4f2f5d,_0xb2234c),VisuMZ['ShowDevTools'](![]);},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x586)]=Graphics[_0x3beee9(0x699)],Graphics['_centerElement']=function(_0x3a3cdb){const _0x47a52c=_0x3beee9;VisuMZ['CoreEngine'][_0x47a52c(0x586)][_0x47a52c(0x573)](this,_0x3a3cdb),this[_0x47a52c(0x620)](_0x3a3cdb);},Graphics['_centerElementCoreEngine']=function(_0x1decb2){const _0x282018=_0x3beee9;VisuMZ['CoreEngine'][_0x282018(0x46c)][_0x282018(0x72e)][_0x282018(0x5e1)]&&(_0x1decb2[_0x282018(0x1df)][_0x282018(0x7cd)]=_0x282018(0x824));VisuMZ[_0x282018(0x186)][_0x282018(0x46c)][_0x282018(0x72e)]['PixelateImageRendering']&&(_0x1decb2[_0x282018(0x1df)][_0x282018(0x389)]=_0x282018(0x32c));const _0x458244=Math[_0x282018(0x38a)](0x0,Math['floor'](_0x1decb2[_0x282018(0x227)]*this[_0x282018(0x5c8)])),_0x1ab5df=Math[_0x282018(0x38a)](0x0,Math[_0x282018(0x171)](_0x1decb2[_0x282018(0x428)]*this['_realScale']));_0x1decb2[_0x282018(0x1df)]['width']=_0x458244+'px',_0x1decb2[_0x282018(0x1df)][_0x282018(0x428)]=_0x1ab5df+'px';},VisuMZ[_0x3beee9(0x186)]['Bitmap_initialize']=Bitmap[_0x3beee9(0x413)][_0x3beee9(0x59a)],Bitmap[_0x3beee9(0x413)][_0x3beee9(0x59a)]=function(_0x30491c,_0x32f3ac){const _0x2c99d6=_0x3beee9;VisuMZ[_0x2c99d6(0x186)]['Bitmap_initialize'][_0x2c99d6(0x573)](this,_0x30491c,_0x32f3ac),this['_smooth']=!(VisuMZ[_0x2c99d6(0x186)][_0x2c99d6(0x46c)][_0x2c99d6(0x72e)][_0x2c99d6(0x50e)]??!![]);},Bitmap[_0x3beee9(0x413)][_0x3beee9(0x1ec)]=function(){this['_customModified']=!![];},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x43a)]=Sprite[_0x3beee9(0x413)]['destroy'],Sprite[_0x3beee9(0x413)][_0x3beee9(0x3e3)]=function(){const _0x38f267=_0x3beee9;if(this[_0x38f267(0x749)])VisuMZ[_0x38f267(0x186)][_0x38f267(0x43a)][_0x38f267(0x573)](this);this['destroyCoreEngineMarkedBitmaps']();},Sprite[_0x3beee9(0x413)]['destroyCoreEngineMarkedBitmaps']=function(){const _0x1e177a=_0x3beee9;if(!this[_0x1e177a(0x3ad)])return;if(!this['bitmap'][_0x1e177a(0x523)])return;this[_0x1e177a(0x3ad)][_0x1e177a(0x42b)]&&!this['_bitmap']['_baseTexture'][_0x1e177a(0x3b0)]&&this[_0x1e177a(0x3ad)][_0x1e177a(0x3e3)]();},VisuMZ[_0x3beee9(0x186)]['Bitmap_resize']=Bitmap['prototype'][_0x3beee9(0x7f3)],Bitmap[_0x3beee9(0x413)]['resize']=function(_0x1b8c30,_0x37166a){const _0x1ebe97=_0x3beee9;VisuMZ[_0x1ebe97(0x186)][_0x1ebe97(0x756)][_0x1ebe97(0x573)](this,_0x1b8c30,_0x37166a),this[_0x1ebe97(0x1ec)]();},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x4d4)]=Bitmap[_0x3beee9(0x413)][_0x3beee9(0x274)],Bitmap[_0x3beee9(0x413)][_0x3beee9(0x274)]=function(_0x5701c1,_0x487d4e,_0x1bf1f1,_0x58182e,_0xecd551,_0x4b0676,_0x36e4d2,_0x36c493,_0x23d770){const _0x1e3e20=_0x3beee9;_0x487d4e=Math[_0x1e3e20(0x368)](_0x487d4e),_0x1bf1f1=Math[_0x1e3e20(0x368)](_0x1bf1f1),_0x58182e=Math['round'](_0x58182e),_0xecd551=Math[_0x1e3e20(0x368)](_0xecd551),_0x4b0676=Math[_0x1e3e20(0x368)](_0x4b0676),_0x36e4d2=Math[_0x1e3e20(0x368)](_0x36e4d2),VisuMZ['CoreEngine'][_0x1e3e20(0x4d4)]['call'](this,_0x5701c1,_0x487d4e,_0x1bf1f1,_0x58182e,_0xecd551,_0x4b0676,_0x36e4d2,_0x36c493,_0x23d770),this['markCoreEngineModified']();},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x6bd)]=Bitmap[_0x3beee9(0x413)][_0x3beee9(0x52e)],Bitmap[_0x3beee9(0x413)][_0x3beee9(0x52e)]=function(_0x2d405b,_0x496743,_0x2ef597,_0x5b6499){const _0x4b2c5b=_0x3beee9;VisuMZ[_0x4b2c5b(0x186)][_0x4b2c5b(0x6bd)][_0x4b2c5b(0x573)](this,_0x2d405b,_0x496743,_0x2ef597,_0x5b6499),this[_0x4b2c5b(0x1ec)]();},VisuMZ[_0x3beee9(0x186)]['Bitmap_fillRect']=Bitmap['prototype'][_0x3beee9(0x3d3)],Bitmap['prototype']['fillRect']=function(_0x3c38e2,_0x248551,_0x4a9484,_0x4a5a1a,_0x475ea0){const _0x4f3716=_0x3beee9;VisuMZ[_0x4f3716(0x186)][_0x4f3716(0x7e5)][_0x4f3716(0x573)](this,_0x3c38e2,_0x248551,_0x4a9484,_0x4a5a1a,_0x475ea0),this['markCoreEngineModified']();},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x442)]=Bitmap[_0x3beee9(0x413)]['strokeRect'],Bitmap[_0x3beee9(0x413)][_0x3beee9(0x33a)]=function(_0x27f7e5,_0x48c1b1,_0x375c87,_0x303c01,_0x4dc1af){const _0x3b669c=_0x3beee9;VisuMZ[_0x3b669c(0x186)]['Bitmap_strokeRect'][_0x3b669c(0x573)](this,_0x27f7e5,_0x48c1b1,_0x375c87,_0x303c01,_0x4dc1af),this[_0x3b669c(0x1ec)]();},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x6dd)]=Bitmap['prototype'][_0x3beee9(0x1fa)],Bitmap['prototype'][_0x3beee9(0x1fa)]=function(_0x450c3e,_0x2f0993,_0x31c3af,_0x178244,_0x36fa4f,_0x4cba33,_0x48dc1b){const _0x3767fb=_0x3beee9;VisuMZ[_0x3767fb(0x186)][_0x3767fb(0x6dd)][_0x3767fb(0x573)](this,_0x450c3e,_0x2f0993,_0x31c3af,_0x178244,_0x36fa4f,_0x4cba33,_0x48dc1b),this[_0x3767fb(0x1ec)]();},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x47b)]=Bitmap[_0x3beee9(0x413)][_0x3beee9(0x255)],Bitmap[_0x3beee9(0x413)][_0x3beee9(0x255)]=function(_0x1e5d27,_0x313390,_0x383c90,_0x1721e8){const _0x5621ec=_0x3beee9;_0x1e5d27=Math[_0x5621ec(0x368)](_0x1e5d27),_0x313390=Math[_0x5621ec(0x368)](_0x313390),_0x383c90=Math[_0x5621ec(0x368)](_0x383c90),VisuMZ['CoreEngine'][_0x5621ec(0x47b)][_0x5621ec(0x573)](this,_0x1e5d27,_0x313390,_0x383c90,_0x1721e8),this[_0x5621ec(0x1ec)]();},VisuMZ['CoreEngine'][_0x3beee9(0x157)]=Bitmap['prototype'][_0x3beee9(0x37c)],Bitmap[_0x3beee9(0x413)][_0x3beee9(0x37c)]=function(_0x46089f){const _0x2e21b9=_0x3beee9;return Math[_0x2e21b9(0x139)](VisuMZ['CoreEngine']['Bitmap_measureTextWidth'][_0x2e21b9(0x573)](this,_0x46089f));},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x837)]=Bitmap['prototype'][_0x3beee9(0x48f)],Bitmap[_0x3beee9(0x413)][_0x3beee9(0x48f)]=function(_0x1fe1b5,_0x4ed530,_0x460011,_0x1145b5,_0x5ce7a8,_0x11b67b){const _0x3ad7c3=_0x3beee9;_0x4ed530=Math[_0x3ad7c3(0x368)](_0x4ed530),_0x460011=Math[_0x3ad7c3(0x368)](_0x460011),_0x1145b5=Math[_0x3ad7c3(0x139)](_0x1145b5),_0x5ce7a8=Math[_0x3ad7c3(0x139)](_0x5ce7a8),VisuMZ[_0x3ad7c3(0x186)][_0x3ad7c3(0x837)]['call'](this,_0x1fe1b5,_0x4ed530,_0x460011,_0x1145b5,_0x5ce7a8,_0x11b67b),this['markCoreEngineModified']();},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x567)]=Bitmap[_0x3beee9(0x413)][_0x3beee9(0x2db)],Bitmap[_0x3beee9(0x413)][_0x3beee9(0x2db)]=function(_0x79954a,_0x4eed23,_0x530f8c,_0x71f0e){const _0x2e387d=_0x3beee9;VisuMZ[_0x2e387d(0x186)][_0x2e387d(0x46c)][_0x2e387d(0x72e)][_0x2e387d(0x2ce)]?this[_0x2e387d(0x46f)](_0x79954a,_0x4eed23,_0x530f8c,_0x71f0e):VisuMZ['CoreEngine']['Bitmap_drawTextOutline'][_0x2e387d(0x573)](this,_0x79954a,_0x4eed23,_0x530f8c,_0x71f0e);},Bitmap[_0x3beee9(0x413)][_0x3beee9(0x46f)]=function(_0x3d2629,_0x55bfec,_0x4a7ccb,_0x1adf3b){const _0x1f7e39=_0x3beee9,_0x16fdc6=this[_0x1f7e39(0x3a0)];_0x16fdc6['fillStyle']=this[_0x1f7e39(0x109)],_0x16fdc6[_0x1f7e39(0x66a)](_0x3d2629,_0x55bfec+0x2,_0x4a7ccb+0x2,_0x1adf3b);},VisuMZ[_0x3beee9(0x186)]['Input_clear']=Input[_0x3beee9(0x168)],Input[_0x3beee9(0x168)]=function(){const _0x117dec=_0x3beee9;VisuMZ['CoreEngine'][_0x117dec(0x16a)]['call'](this),this[_0x117dec(0x462)]=undefined,this[_0x117dec(0xc9)]=undefined,this['_gamepadWait']=Input[_0x117dec(0x2f1)];},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x326)]=Input['update'],Input['update']=function(){const _0x423996=_0x3beee9;VisuMZ[_0x423996(0x186)][_0x423996(0x326)][_0x423996(0x573)](this);if(this['_gamepadWait'])this[_0x423996(0x337)]--;},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x27e)]=Input[_0x3beee9(0x3c9)],Input[_0x3beee9(0x3c9)]=function(){const _0x4af1dd=_0x3beee9;if(this[_0x4af1dd(0x337)])return;VisuMZ[_0x4af1dd(0x186)][_0x4af1dd(0x27e)][_0x4af1dd(0x573)](this);},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x61b)]=Input[_0x3beee9(0x1b8)],Input[_0x3beee9(0x1b8)]=function(){const _0x57053a=_0x3beee9;VisuMZ[_0x57053a(0x186)][_0x57053a(0x61b)]['call'](this),document[_0x57053a(0x2d1)](_0x57053a(0x2da),this[_0x57053a(0x819)][_0x57053a(0x4d9)](this));},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x344)]=Input[_0x3beee9(0x858)],Input[_0x3beee9(0x858)]=function(_0x131ebb){const _0x57b603=_0x3beee9;this[_0x57b603(0xc9)]=_0x131ebb[_0x57b603(0x17f)],VisuMZ[_0x57b603(0x186)][_0x57b603(0x344)][_0x57b603(0x573)](this,_0x131ebb),this['setLastGamepadUsed'](null);},Input['_onKeyPress']=function(_0x2d8f51){const _0x5aa595=_0x3beee9;this[_0x5aa595(0x2f8)](_0x2d8f51);},Input[_0x3beee9(0x2f8)]=function(_0x3646cd){const _0x1941fe=_0x3beee9;this[_0x1941fe(0xc9)]=_0x3646cd[_0x1941fe(0x17f)];let _0x5b5e9c=String['fromCharCode'](_0x3646cd[_0x1941fe(0x2d9)]);this[_0x1941fe(0x462)]===undefined?this[_0x1941fe(0x462)]=_0x5b5e9c:this[_0x1941fe(0x462)]+=_0x5b5e9c;},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x129)]=Input[_0x3beee9(0x73a)],Input['_shouldPreventDefault']=function(_0xf23be2){const _0x208a73=_0x3beee9;if(_0xf23be2===0x8)return![];return VisuMZ[_0x208a73(0x186)]['Input_shouldPreventDefault'][_0x208a73(0x573)](this,_0xf23be2);},Input['isSpecialCode']=function(_0x2449e4){const _0x339321=_0x3beee9;if(_0x2449e4['match'](/backspace/i))return this[_0x339321(0xc9)]===0x8;if(_0x2449e4['match'](/enter/i))return this[_0x339321(0xc9)]===0xd;if(_0x2449e4[_0x339321(0x56a)](/escape/i))return this['_inputSpecialKeyCode']===0x1b;},Input['isNumpadPressed']=function(){const _0x4ce55a=_0x3beee9;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0x4ce55a(0x5a2)](this[_0x4ce55a(0xc9)]);},Input[_0x3beee9(0x14a)]=function(){const _0x1efbd9=_0x3beee9;return[0x25,0x26,0x27,0x28][_0x1efbd9(0x5a2)](this[_0x1efbd9(0xc9)]);},Input[_0x3beee9(0x6c6)]=function(){const _0x432fe7=_0x3beee9;if(navigator[_0x432fe7(0x60e)]){const _0x30f57c=navigator[_0x432fe7(0x60e)]();if(_0x30f57c)for(const _0x5b98d9 of _0x30f57c){if(_0x5b98d9&&_0x5b98d9[_0x432fe7(0x5a8)])return!![];}}return![];},Input[_0x3beee9(0x5a3)]=function(){const _0x5da0dc=_0x3beee9;if(navigator[_0x5da0dc(0x60e)]){const _0x449d51=navigator[_0x5da0dc(0x60e)]();if(_0x449d51)for(const _0x26f6f4 of _0x449d51){if(_0x26f6f4&&_0x26f6f4['connected']){if(this[_0x5da0dc(0x45d)](_0x26f6f4))return!![];if(this[_0x5da0dc(0x421)](_0x26f6f4))return!![];}}}return![];},Input[_0x3beee9(0x45d)]=function(_0x3ad1a5){const _0x2cffb3=_0x3beee9,_0x2673eb=_0x3ad1a5[_0x2cffb3(0x7cc)];for(let _0x10be4f=0x0;_0x10be4f<_0x2673eb[_0x2cffb3(0x228)];_0x10be4f++){if(_0x2673eb[_0x10be4f][_0x2cffb3(0xdb)])return!![];}return![];},Input['isGamepadAxisMoved']=function(_0x1472d3){const _0x3cf2d4=_0x3beee9,_0x4e8b4b=_0x1472d3[_0x3cf2d4(0x589)],_0x2087eb=0.5;if(_0x4e8b4b[0x0]<-_0x2087eb)return!![];if(_0x4e8b4b[0x0]>_0x2087eb)return!![];if(_0x4e8b4b[0x1]<-_0x2087eb)return!![];if(_0x4e8b4b[0x1]>_0x2087eb)return!![];return![];},Input[_0x3beee9(0x19d)]=function(){const _0x473339=_0x3beee9;return this[_0x473339(0x5e4)]||null;},Input[_0x3beee9(0x189)]=function(_0x5a6566){const _0x1f3a2b=_0x3beee9;this[_0x1f3a2b(0x5e4)]=_0x5a6566;},VisuMZ['CoreEngine'][_0x3beee9(0x38d)]=Input[_0x3beee9(0x3ea)],Input[_0x3beee9(0x3ea)]=function(_0x3db21e){const _0x5db373=_0x3beee9;VisuMZ['CoreEngine'][_0x5db373(0x38d)][_0x5db373(0x573)](this,_0x3db21e),(this[_0x5db373(0x45d)](_0x3db21e)||this['isGamepadAxisMoved'](_0x3db21e))&&this['setLastGamepadUsed'](_0x3db21e);},Input[_0x3beee9(0x4c1)]=function(){const _0xccc007=_0x3beee9;return this[_0xccc007(0x5e4)]?this[_0xccc007(0x5e4)]['id']:_0xccc007(0x5a5);},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x4e7)]=Tilemap['prototype']['_addShadow'],Tilemap[_0x3beee9(0x413)]['_addShadow']=function(_0xffd149,_0x5176a9,_0xa89449,_0x4ad293){const _0x51997d=_0x3beee9;if($gameMap&&$gameMap[_0x51997d(0x3fe)]())return;VisuMZ[_0x51997d(0x186)][_0x51997d(0x4e7)][_0x51997d(0x573)](this,_0xffd149,_0x5176a9,_0xa89449,_0x4ad293);},Tilemap[_0x3beee9(0x674)][_0x3beee9(0x413)][_0x3beee9(0x6e3)]=function(){const _0x52bb87=_0x3beee9;this[_0x52bb87(0x7d6)]();for(let _0x4025e9=0x0;_0x4025e9<Tilemap[_0x52bb87(0x21a)][_0x52bb87(0x842)];_0x4025e9++){const _0x21bd92=new PIXI[(_0x52bb87(0x59d))]();_0x21bd92['setSize'](0x800,0x800),VisuMZ[_0x52bb87(0x186)][_0x52bb87(0x46c)][_0x52bb87(0x72e)]['PixelateImageRendering']&&(_0x21bd92[_0x52bb87(0x433)]=PIXI['SCALE_MODES'][_0x52bb87(0x5aa)]),this[_0x52bb87(0x616)]['push'](_0x21bd92);}},WindowLayer[_0x3beee9(0x413)]['isMaskingEnabled']=function(){const _0x303b5f=_0x3beee9;return SceneManager&&SceneManager[_0x303b5f(0x854)]?SceneManager['_scene']['isWindowMaskingEnabled']():!![];},VisuMZ[_0x3beee9(0x186)]['WindowLayer_render']=WindowLayer['prototype'][_0x3beee9(0x16d)],WindowLayer[_0x3beee9(0x413)][_0x3beee9(0x16d)]=function render(_0x588983){const _0x5c087d=_0x3beee9;this[_0x5c087d(0x330)]()?VisuMZ[_0x5c087d(0x186)][_0x5c087d(0x6ad)][_0x5c087d(0x573)](this,_0x588983):this[_0x5c087d(0xfa)](_0x588983);},WindowLayer[_0x3beee9(0x413)][_0x3beee9(0xfa)]=function render(_0x159d14){const _0x47b159=_0x3beee9;if(!this[_0x47b159(0x1a1)])return;const _0x32b213=new PIXI['Graphics'](),_0x5355a2=_0x159d14['gl'],_0x1dcca6=this[_0x47b159(0x833)][_0x47b159(0x54d)]();_0x159d14[_0x47b159(0x74d)][_0x47b159(0x2e8)](),_0x32b213['transform']=this['transform'],_0x159d14[_0x47b159(0xec)][_0x47b159(0x686)](),_0x5355a2['enable'](_0x5355a2['STENCIL_TEST']);while(_0x1dcca6[_0x47b159(0x228)]>0x0){const _0x46bc8a=_0x1dcca6[_0x47b159(0x510)]();_0x46bc8a[_0x47b159(0x77a)]&&_0x46bc8a[_0x47b159(0x1a1)]&&_0x46bc8a[_0x47b159(0x1a9)]>0x0&&(_0x5355a2[_0x47b159(0x5f9)](_0x5355a2[_0x47b159(0x3f9)],0x0,~0x0),_0x5355a2['stencilOp'](_0x5355a2[_0x47b159(0xa9)],_0x5355a2['KEEP'],_0x5355a2[_0x47b159(0xa9)]),_0x46bc8a[_0x47b159(0x16d)](_0x159d14),_0x159d14[_0x47b159(0xec)][_0x47b159(0x686)](),_0x32b213['clear'](),_0x5355a2[_0x47b159(0x5f9)](_0x5355a2[_0x47b159(0x10e)],0x1,~0x0),_0x5355a2['stencilOp'](_0x5355a2[_0x47b159(0x3b9)],_0x5355a2[_0x47b159(0x3b9)],_0x5355a2['REPLACE']),_0x5355a2[_0x47b159(0x112)](_0x5355a2[_0x47b159(0x256)],_0x5355a2[_0x47b159(0x13e)]),_0x32b213['render'](_0x159d14),_0x159d14[_0x47b159(0xec)][_0x47b159(0x686)](),_0x5355a2['blendFunc'](_0x5355a2[_0x47b159(0x13e)],_0x5355a2[_0x47b159(0x5d2)]));}_0x5355a2['disable'](_0x5355a2[_0x47b159(0x2c7)]),_0x5355a2[_0x47b159(0x168)](_0x5355a2[_0x47b159(0x7ed)]),_0x5355a2[_0x47b159(0x2bf)](0x0),_0x159d14[_0x47b159(0xec)]['flush']();for(const _0x37337d of this['children']){!_0x37337d[_0x47b159(0x77a)]&&_0x37337d[_0x47b159(0x1a1)]&&_0x37337d[_0x47b159(0x16d)](_0x159d14);}_0x159d14['batch'][_0x47b159(0x686)]();},DataManager['isKeyItem']=function(_0x4c51c6){const _0x41d9b9=_0x3beee9;return this[_0x41d9b9(0x3a8)](_0x4c51c6)&&_0x4c51c6['itypeId']===0x2;},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x15a)]=DataManager[_0x3beee9(0x721)],DataManager[_0x3beee9(0x721)]=function(){const _0x161481=_0x3beee9;VisuMZ[_0x161481(0x186)][_0x161481(0x15a)][_0x161481(0x573)](this),this['reservePlayTestNewGameCommonEvent'](),this[_0x161481(0x181)]();},DataManager[_0x3beee9(0x6d3)]=function(){const _0x46d710=_0x3beee9;if($gameTemp['isPlaytest']()){const _0x2594a9=VisuMZ['CoreEngine'][_0x46d710(0x46c)][_0x46d710(0x72e)][_0x46d710(0x5b3)];if(_0x2594a9>0x0)$gameTemp[_0x46d710(0x338)](_0x2594a9);}},DataManager['reserveNewGameCommonEvent']=function(){const _0xbd808=_0x3beee9,_0x2d06b0=VisuMZ['CoreEngine'][_0xbd808(0x46c)][_0xbd808(0x72e)][_0xbd808(0x13a)]||0x0;if(_0x2d06b0>0x0)$gameTemp[_0xbd808(0x338)](_0x2d06b0);},DataManager[_0x3beee9(0x836)]=function(_0x20740c){const _0x785638=_0x3beee9,_0x2719ad=$dataTroops[_0x20740c];if(!_0x2719ad)return'';let _0x3af8a3='';_0x3af8a3+=_0x2719ad[_0x785638(0x148)];for(const _0xd98744 of _0x2719ad[_0x785638(0x371)]){for(const _0x216b4e of _0xd98744['list']){[0x6c,0x198]['includes'](_0x216b4e['code'])&&(_0x3af8a3+='\x0a',_0x3af8a3+=_0x216b4e[_0x785638(0x5fd)][0x0]);}}return _0x3af8a3;};(VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x46c)][_0x3beee9(0x72e)][_0x3beee9(0xc4)]??!![])&&($scene=null,VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x6c1)]=Scene_Base[_0x3beee9(0x413)][_0x3beee9(0x75c)],Scene_Base[_0x3beee9(0x413)][_0x3beee9(0x75c)]=function(){const _0x51a655=_0x3beee9;VisuMZ[_0x51a655(0x186)]['Scene_Base_create']['call'](this),$scene=this;},$spriteset=null,VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x52f)]=Scene_Map[_0x3beee9(0x413)][_0x3beee9(0x1d1)],Scene_Map[_0x3beee9(0x413)][_0x3beee9(0x1d1)]=function(){const _0x55cbfa=_0x3beee9;VisuMZ[_0x55cbfa(0x186)]['Scene_Map_createSpriteset'][_0x55cbfa(0x573)](this),$spriteset=this[_0x55cbfa(0x687)];},VisuMZ[_0x3beee9(0x186)]['Scene_Battle_createSpriteset']=Scene_Battle[_0x3beee9(0x413)]['createSpriteset'],Scene_Battle['prototype'][_0x3beee9(0x1d1)]=function(){const _0x3b140b=_0x3beee9;VisuMZ[_0x3b140b(0x186)]['Scene_Battle_createSpriteset'][_0x3b140b(0x573)](this),$spriteset=this[_0x3b140b(0x687)];},VisuMZ['CoreEngine'][_0x3beee9(0x200)]=Scene_Base['prototype'][_0x3beee9(0x372)],Scene_Base[_0x3beee9(0x413)][_0x3beee9(0x372)]=function(){const _0x4ecbba=_0x3beee9;VisuMZ[_0x4ecbba(0x186)]['Scene_Base_terminate'][_0x4ecbba(0x573)](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ[_0x3beee9(0x186)]['BattleManager_update']=BattleManager[_0x3beee9(0x682)],BattleManager[_0x3beee9(0x682)]=function(_0x3648d6){const _0x3a64ed=_0x3beee9;VisuMZ[_0x3a64ed(0x186)][_0x3a64ed(0x50b)][_0x3a64ed(0x573)](this,_0x3648d6),this['updateBattleVariables']();},BattleManager[_0x3beee9(0x7a1)]=function(){const _0x15cabd=_0x3beee9;$subject=this[_0x15cabd(0x37a)],$targets=this['_targets'],$target=this['_target']||this[_0x15cabd(0x568)][0x0];},$event=null,VisuMZ['CoreEngine'][_0x3beee9(0x29f)]=Game_Event['prototype'][_0x3beee9(0x51d)],Game_Event['prototype'][_0x3beee9(0x51d)]=function(){const _0x1ca62b=_0x3beee9;VisuMZ[_0x1ca62b(0x186)][_0x1ca62b(0x29f)][_0x1ca62b(0x573)](this),$event=this;},VisuMZ['CoreEngine'][_0x3beee9(0x828)]=Scene_Map[_0x3beee9(0x413)][_0x3beee9(0x682)],Scene_Map[_0x3beee9(0x413)][_0x3beee9(0x682)]=function(){const _0xcd1f97=_0x3beee9;VisuMZ['CoreEngine'][_0xcd1f97(0x828)][_0xcd1f97(0x573)](this),$gameMap[_0xcd1f97(0x803)]();},Game_Map[_0x3beee9(0x413)][_0x3beee9(0x803)]=function(){!this['isEventRunning']()&&$event!==null&&($event=null);},$commonEvent=function(_0x1f1b94){const _0x30ae71=_0x3beee9;if($gameTemp)$gameTemp[_0x30ae71(0x338)](_0x1f1b94);});;$onceParallel=function(_0x4d6eb9,_0x513f1b){const _0x224370=_0x3beee9;if(SceneManager[_0x224370(0x799)]())SceneManager[_0x224370(0x854)][_0x224370(0x2e2)](_0x4d6eb9,_0x513f1b);else{if(SceneManager[_0x224370(0x3dc)]()){if(Imported['VisuMZ_1_BattleCore'])SceneManager[_0x224370(0x854)]['playOnceParallelInterpreter'](_0x4d6eb9);else $gameTemp&&$gameTemp[_0x224370(0x441)]()&&alert('Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!');}else $gameTemp&&$gameTemp[_0x224370(0x441)]()&&alert(_0x224370(0x2b7));}},StorageManager[_0x3beee9(0x2b1)]=function(_0x5ccdac){return new Promise((_0x5a1290,_0x36baa9)=>{const _0x5a6a4b=_0x4666;try{const _0x4e3b3e=pako[_0x5a6a4b(0x61d)](_0x5ccdac,{'to':_0x5a6a4b(0x849),'level':0x1});if(_0x4e3b3e[_0x5a6a4b(0x228)]>=0xc350){}_0x5a1290(_0x4e3b3e);}catch(_0xe212ca){_0x36baa9(_0xe212ca);}});},TextManager['stringKeyMap']=['','','',_0x3beee9(0xe3),'','',_0x3beee9(0x7e6),'',_0x3beee9(0x92),_0x3beee9(0x210),'','',_0x3beee9(0x40a),_0x3beee9(0x4ec),_0x3beee9(0x3ae),'',_0x3beee9(0x4e3),'CTRL',_0x3beee9(0x665),'PAUSE',_0x3beee9(0x209),_0x3beee9(0x43f),'EISU',_0x3beee9(0x1a7),_0x3beee9(0x455),_0x3beee9(0x23c),'',_0x3beee9(0x501),_0x3beee9(0x8e),'NONCONVERT',_0x3beee9(0x73c),'MODECHANGE','SPACE','PGUP',_0x3beee9(0x7c7),_0x3beee9(0x86d),_0x3beee9(0x6af),_0x3beee9(0x83f),'UP',_0x3beee9(0x69c),'DOWN','SELECT',_0x3beee9(0x305),_0x3beee9(0x222),'PRINTSCREEN',_0x3beee9(0x786),'DELETE','','0','1','2','3','4','5','6','7','8','9',_0x3beee9(0x75b),_0x3beee9(0x7e0),_0x3beee9(0x509),_0x3beee9(0x712),_0x3beee9(0x420),'QUESTION_MARK','AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x3beee9(0x2cd),'',_0x3beee9(0x399),'',_0x3beee9(0x719),_0x3beee9(0xb4),'NUMPAD1','NUMPAD2',_0x3beee9(0x1cf),'NUMPAD4',_0x3beee9(0xe8),'NUMPAD6','NUMPAD7',_0x3beee9(0x319),_0x3beee9(0x570),_0x3beee9(0x35f),_0x3beee9(0x6b9),'SEPARATOR',_0x3beee9(0x56e),'DECIMAL',_0x3beee9(0x1f8),'F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x3beee9(0x3cd),_0x3beee9(0x13b),_0x3beee9(0x830),'F13','F14','F15',_0x3beee9(0x3cb),'F17',_0x3beee9(0x39f),_0x3beee9(0x1de),_0x3beee9(0xad),_0x3beee9(0x57e),_0x3beee9(0x62e),_0x3beee9(0x613),_0x3beee9(0x4b7),'','','','','','','','','NUM_LOCK',_0x3beee9(0x63f),'WIN_OEM_FJ_JISHO',_0x3beee9(0x448),'WIN_OEM_FJ_TOUROKU',_0x3beee9(0x427),_0x3beee9(0x304),'','','','','','','','','',_0x3beee9(0x6ca),_0x3beee9(0x1b6),_0x3beee9(0x1ba),'HASH',_0x3beee9(0x262),_0x3beee9(0x4c3),_0x3beee9(0x335),_0x3beee9(0xe7),_0x3beee9(0x385),_0x3beee9(0x64c),_0x3beee9(0x797),_0x3beee9(0x61c),_0x3beee9(0x580),_0x3beee9(0x4be),_0x3beee9(0x7ab),_0x3beee9(0x478),_0x3beee9(0xfb),'','','','',_0x3beee9(0x348),_0x3beee9(0x12a),_0x3beee9(0x359),'','',_0x3beee9(0x7e0),_0x3beee9(0x712),_0x3beee9(0xf2),_0x3beee9(0x6ae),'PERIOD',_0x3beee9(0x24c),'BACK_QUOTE','','','','','','','','','','','','','','','','','','','','','','','','','','',_0x3beee9(0x841),_0x3beee9(0x18b),_0x3beee9(0x290),_0x3beee9(0x49c),'',_0x3beee9(0x713),_0x3beee9(0x3c4),'',_0x3beee9(0x1b4),'WIN_ICO_00','',_0x3beee9(0x450),'','',_0x3beee9(0x2a4),_0x3beee9(0x6e7),_0x3beee9(0x12e),_0x3beee9(0x1ef),_0x3beee9(0x793),_0x3beee9(0x5e2),_0x3beee9(0x120),'WIN_OEM_ATTN',_0x3beee9(0x431),_0x3beee9(0x581),'WIN_OEM_AUTO','WIN_OEM_ENLW',_0x3beee9(0x528),_0x3beee9(0xf5),_0x3beee9(0x807),_0x3beee9(0x40f),_0x3beee9(0x812),_0x3beee9(0x78a),_0x3beee9(0x7d9),'',_0x3beee9(0x7bb),_0x3beee9(0x37d),''],TextManager[_0x3beee9(0x7e1)]=VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x46c)]['ButtonAssist']['OkText'],TextManager[_0x3beee9(0x15d)]=VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x46c)]['ButtonAssist'][_0x3beee9(0x532)],TextManager[_0x3beee9(0x7e7)]=VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x46c)][_0x3beee9(0x492)]['SwitchActorText'],VisuMZ['CoreEngine'][_0x3beee9(0x79a)]=TextManager[_0x3beee9(0x225)],TextManager['param']=function(_0x1c4486){const _0x18dbd3=_0x3beee9;return typeof _0x1c4486===_0x18dbd3(0x43c)?VisuMZ['CoreEngine'][_0x18dbd3(0x79a)][_0x18dbd3(0x573)](this,_0x1c4486):this['paramName'](_0x1c4486);},TextManager['paramName']=function(_0x17e5ca){const _0x46cf2e=_0x3beee9;_0x17e5ca=String(_0x17e5ca||'')[_0x46cf2e(0x4d5)]();const _0x4bfc12=VisuMZ[_0x46cf2e(0x186)]['Settings'][_0x46cf2e(0x234)];if(_0x17e5ca==='MAXHP')return $dataSystem[_0x46cf2e(0x4bc)][_0x46cf2e(0x3ee)][0x0];if(_0x17e5ca===_0x46cf2e(0x27f))return $dataSystem[_0x46cf2e(0x4bc)][_0x46cf2e(0x3ee)][0x1];if(_0x17e5ca===_0x46cf2e(0x309))return $dataSystem[_0x46cf2e(0x4bc)][_0x46cf2e(0x3ee)][0x2];if(_0x17e5ca===_0x46cf2e(0x329))return $dataSystem['terms'][_0x46cf2e(0x3ee)][0x3];if(_0x17e5ca==='MAT')return $dataSystem['terms'][_0x46cf2e(0x3ee)][0x4];if(_0x17e5ca===_0x46cf2e(0x7b9))return $dataSystem[_0x46cf2e(0x4bc)][_0x46cf2e(0x3ee)][0x5];if(_0x17e5ca===_0x46cf2e(0x67f))return $dataSystem[_0x46cf2e(0x4bc)]['params'][0x6];if(_0x17e5ca==='LUK')return $dataSystem[_0x46cf2e(0x4bc)][_0x46cf2e(0x3ee)][0x7];if(_0x17e5ca===_0x46cf2e(0x56f))return _0x4bfc12['XParamVocab0'];if(_0x17e5ca===_0x46cf2e(0x720))return _0x4bfc12[_0x46cf2e(0x82a)];if(_0x17e5ca===_0x46cf2e(0x246))return _0x4bfc12[_0x46cf2e(0x69a)];if(_0x17e5ca===_0x46cf2e(0x4e2))return _0x4bfc12['XParamVocab3'];if(_0x17e5ca==='MEV')return _0x4bfc12[_0x46cf2e(0x5fe)];if(_0x17e5ca===_0x46cf2e(0x107))return _0x4bfc12[_0x46cf2e(0x23a)];if(_0x17e5ca==='CNT')return _0x4bfc12['XParamVocab6'];if(_0x17e5ca==='HRG')return _0x4bfc12['XParamVocab7'];if(_0x17e5ca==='MRG')return _0x4bfc12['XParamVocab8'];if(_0x17e5ca===_0x46cf2e(0x263))return _0x4bfc12[_0x46cf2e(0x84e)];if(_0x17e5ca===_0x46cf2e(0x37e))return _0x4bfc12[_0x46cf2e(0x411)];if(_0x17e5ca===_0x46cf2e(0x62c))return _0x4bfc12['SParamVocab1'];if(_0x17e5ca===_0x46cf2e(0x49a))return _0x4bfc12[_0x46cf2e(0x5ba)];if(_0x17e5ca===_0x46cf2e(0x11d))return _0x4bfc12[_0x46cf2e(0x3e8)];if(_0x17e5ca===_0x46cf2e(0x7bf))return _0x4bfc12['SParamVocab4'];if(_0x17e5ca===_0x46cf2e(0x667))return _0x4bfc12[_0x46cf2e(0x5db)];if(_0x17e5ca===_0x46cf2e(0x452))return _0x4bfc12[_0x46cf2e(0x769)];if(_0x17e5ca==='MDR')return _0x4bfc12[_0x46cf2e(0x558)];if(_0x17e5ca===_0x46cf2e(0x183))return _0x4bfc12[_0x46cf2e(0x9d)];if(_0x17e5ca===_0x46cf2e(0x7a3))return _0x4bfc12[_0x46cf2e(0x432)];if(VisuMZ[_0x46cf2e(0x186)]['CustomParamNames'][_0x17e5ca])return VisuMZ[_0x46cf2e(0x186)][_0x46cf2e(0x6f5)][_0x17e5ca];return'';},TextManager[_0x3beee9(0x1dd)]=function(_0xcc63d2){const _0x346621=_0x3beee9,_0x1dc0a8=Input[_0x346621(0x4c1)]();return _0x1dc0a8===_0x346621(0x5a5)?this['getKeyboardInputButtonString'](_0xcc63d2):this[_0x346621(0x184)](_0x1dc0a8,_0xcc63d2);},TextManager[_0x3beee9(0x846)]=function(_0x24fd28){const _0x5e110b=_0x3beee9;let _0x354c11=VisuMZ[_0x5e110b(0x186)][_0x5e110b(0x46c)][_0x5e110b(0x492)][_0x5e110b(0x44b)];if(!_0x354c11){if(_0x24fd28==='cancel')_0x24fd28=_0x5e110b(0x1da);if(_0x24fd28==='menu')_0x24fd28='escape';}let _0x1a6840=[];for(let _0x1e9b54 in Input[_0x5e110b(0x75a)]){_0x1e9b54=Number(_0x1e9b54);if(_0x1e9b54>=0x60&&_0x1e9b54<=0x69)continue;if([0x12,0x20][_0x5e110b(0x820)](_0x1e9b54))continue;_0x24fd28===Input[_0x5e110b(0x75a)][_0x1e9b54]&&_0x1a6840[_0x5e110b(0x188)](_0x1e9b54);}for(let _0x1f0cc7=0x0;_0x1f0cc7<_0x1a6840['length'];_0x1f0cc7++){_0x1a6840[_0x1f0cc7]=TextManager[_0x5e110b(0x511)][_0x1a6840[_0x1f0cc7]];}return this[_0x5e110b(0x655)](_0x1a6840);},TextManager[_0x3beee9(0x655)]=function(_0x4d9318){const _0x585953=_0x3beee9,_0xb1bc1b=VisuMZ[_0x585953(0x186)][_0x585953(0x46c)][_0x585953(0x492)],_0x52b36c=_0xb1bc1b[_0x585953(0x53c)];let _0x624af='';if(_0x4d9318['includes']('UP'))_0x624af='UP';else{if(_0x4d9318[_0x585953(0x820)](_0x585953(0x406)))_0x624af='DOWN';else{if(_0x4d9318['includes'](_0x585953(0x83f)))_0x624af=_0x585953(0x83f);else _0x4d9318[_0x585953(0x820)]('RIGHT')?_0x624af='RIGHT':_0x624af=_0x4d9318[_0x585953(0x404)]();}}const _0x156154='Key%1'[_0x585953(0x48d)](_0x624af);return _0xb1bc1b[_0x156154]?_0xb1bc1b[_0x156154]:_0x52b36c[_0x585953(0x48d)](_0x624af);},TextManager[_0x3beee9(0x4de)]=function(_0x174369,_0x5a5099){const _0x416c89=_0x3beee9,_0xec0359=VisuMZ['CoreEngine'][_0x416c89(0x46c)][_0x416c89(0x492)],_0x2c1c1c=_0xec0359['MultiKeyFmt'],_0x5b0659=this[_0x416c89(0x1dd)](_0x174369),_0x2a776e=this['getInputButtonString'](_0x5a5099);return _0x2c1c1c['format'](_0x5b0659,_0x2a776e);},TextManager[_0x3beee9(0x184)]=function(_0x2bc921,_0x1ea09e){const _0x34ec8b=_0x3beee9,_0x494db5=_0x2bc921[_0x34ec8b(0xbc)]()['trim'](),_0xe94327=VisuMZ[_0x34ec8b(0x186)][_0x34ec8b(0x463)][_0x494db5];if(!_0xe94327)return this[_0x34ec8b(0x499)](_0x2bc921,_0x1ea09e);return _0xe94327[_0x1ea09e]||this[_0x34ec8b(0x846)](_0x2bc921,_0x1ea09e);},TextManager[_0x3beee9(0x499)]=function(_0x17f8b3,_0x147524){const _0x33b7c9=_0x3beee9,_0x223016=_0x17f8b3['toLowerCase']()[_0x33b7c9(0x42d)]();for(const _0x4aa6c1 in VisuMZ[_0x33b7c9(0x186)]['ControllerMatches']){if(_0x223016['includes'](_0x4aa6c1)){const _0x1a512c=VisuMZ[_0x33b7c9(0x186)][_0x33b7c9(0x443)][_0x4aa6c1],_0x559971=VisuMZ[_0x33b7c9(0x186)][_0x33b7c9(0x463)][_0x1a512c];return _0x559971[_0x147524]||this[_0x33b7c9(0x846)](_0x147524);}}return this['getKeyboardInputButtonString'](_0x147524);},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x489)]=ColorManager[_0x3beee9(0x7c4)],ColorManager[_0x3beee9(0x7c4)]=function(){const _0x118b77=_0x3beee9;VisuMZ[_0x118b77(0x186)]['ColorManager_loadWindowskin'][_0x118b77(0x573)](this),this[_0x118b77(0x236)]=this[_0x118b77(0x236)]||{};},ColorManager[_0x3beee9(0x5f7)]=function(_0x243181,_0x4cf5e2){const _0x53307a=_0x3beee9;return _0x4cf5e2=String(_0x4cf5e2),this[_0x53307a(0x236)]=this[_0x53307a(0x236)]||{},_0x4cf5e2[_0x53307a(0x56a)](/#(.*)/i)?this['_colorCache'][_0x243181]=_0x53307a(0x9b)['format'](String(RegExp['$1'])):this[_0x53307a(0x236)][_0x243181]=this[_0x53307a(0x508)](Number(_0x4cf5e2)),this[_0x53307a(0x236)][_0x243181];},ColorManager[_0x3beee9(0x286)]=function(_0x448395){const _0x1b26d1=_0x3beee9;return _0x448395=String(_0x448395),_0x448395['match'](/#(.*)/i)?'#%1'[_0x1b26d1(0x48d)](String(RegExp['$1'])):this['textColor'](Number(_0x448395));},ColorManager[_0x3beee9(0x741)]=function(){this['_colorCache']={};},ColorManager[_0x3beee9(0x7d3)]=function(){const _0x45ab0e=_0x3beee9,_0x1d6afe='_stored_normalColor';this[_0x45ab0e(0x236)]=this[_0x45ab0e(0x236)]||{};if(this[_0x45ab0e(0x236)][_0x1d6afe])return this[_0x45ab0e(0x236)][_0x1d6afe];const _0x34604b=VisuMZ[_0x45ab0e(0x186)][_0x45ab0e(0x46c)][_0x45ab0e(0x6ab)]['ColorNormal'];return this[_0x45ab0e(0x5f7)](_0x1d6afe,_0x34604b);},ColorManager[_0x3beee9(0x54e)]=function(){const _0x1648e2=_0x3beee9,_0x55b095=_0x1648e2(0x5e9);this[_0x1648e2(0x236)]=this[_0x1648e2(0x236)]||{};if(this['_colorCache'][_0x55b095])return this[_0x1648e2(0x236)][_0x55b095];const _0x17f7e6=VisuMZ[_0x1648e2(0x186)]['Settings']['Color'][_0x1648e2(0x701)];return this[_0x1648e2(0x5f7)](_0x55b095,_0x17f7e6);},ColorManager[_0x3beee9(0x72a)]=function(){const _0x5817a6=_0x3beee9,_0x10afc7=_0x5817a6(0x827);this[_0x5817a6(0x236)]=this[_0x5817a6(0x236)]||{};if(this[_0x5817a6(0x236)][_0x10afc7])return this['_colorCache'][_0x10afc7];const _0x3cce85=VisuMZ['CoreEngine'][_0x5817a6(0x46c)][_0x5817a6(0x6ab)][_0x5817a6(0x579)];return this['getColorDataFromPluginParameters'](_0x10afc7,_0x3cce85);},ColorManager['deathColor']=function(){const _0x5a4ad8=_0x3beee9,_0x2faa18=_0x5a4ad8(0x3b1);this[_0x5a4ad8(0x236)]=this['_colorCache']||{};if(this[_0x5a4ad8(0x236)][_0x2faa18])return this['_colorCache'][_0x2faa18];const _0x14ba32=VisuMZ['CoreEngine'][_0x5a4ad8(0x46c)][_0x5a4ad8(0x6ab)][_0x5a4ad8(0x45a)];return this['getColorDataFromPluginParameters'](_0x2faa18,_0x14ba32);},ColorManager[_0x3beee9(0x128)]=function(){const _0x48d84d=_0x3beee9,_0x401a44=_0x48d84d(0x55d);this[_0x48d84d(0x236)]=this[_0x48d84d(0x236)]||{};if(this['_colorCache'][_0x401a44])return this[_0x48d84d(0x236)][_0x401a44];const _0x5831c8=VisuMZ[_0x48d84d(0x186)][_0x48d84d(0x46c)][_0x48d84d(0x6ab)][_0x48d84d(0x331)];return this[_0x48d84d(0x5f7)](_0x401a44,_0x5831c8);},ColorManager[_0x3beee9(0xc5)]=function(){const _0x23ad12=_0x3beee9,_0x84323a=_0x23ad12(0x484);this[_0x23ad12(0x236)]=this[_0x23ad12(0x236)]||{};if(this[_0x23ad12(0x236)][_0x84323a])return this[_0x23ad12(0x236)][_0x84323a];const _0x23b1d3=VisuMZ[_0x23ad12(0x186)][_0x23ad12(0x46c)][_0x23ad12(0x6ab)][_0x23ad12(0x80c)];return this[_0x23ad12(0x5f7)](_0x84323a,_0x23b1d3);},ColorManager[_0x3beee9(0x42a)]=function(){const _0x5eac57=_0x3beee9,_0x8fefc8=_0x5eac57(0x4ba);this[_0x5eac57(0x236)]=this[_0x5eac57(0x236)]||{};if(this[_0x5eac57(0x236)][_0x8fefc8])return this[_0x5eac57(0x236)][_0x8fefc8];const _0x34f086=VisuMZ[_0x5eac57(0x186)]['Settings'][_0x5eac57(0x6ab)][_0x5eac57(0x1b3)];return this['getColorDataFromPluginParameters'](_0x8fefc8,_0x34f086);},ColorManager[_0x3beee9(0x137)]=function(){const _0x577218=_0x3beee9,_0x4aa6bd=_0x577218(0x365);this[_0x577218(0x236)]=this[_0x577218(0x236)]||{};if(this['_colorCache'][_0x4aa6bd])return this[_0x577218(0x236)][_0x4aa6bd];const _0x432f6a=VisuMZ[_0x577218(0x186)][_0x577218(0x46c)][_0x577218(0x6ab)][_0x577218(0x327)];return this[_0x577218(0x5f7)](_0x4aa6bd,_0x432f6a);},ColorManager[_0x3beee9(0x32a)]=function(){const _0x3bbbce=_0x3beee9,_0x5ac3b0=_0x3bbbce(0x60c);this[_0x3bbbce(0x236)]=this[_0x3bbbce(0x236)]||{};if(this[_0x3bbbce(0x236)][_0x5ac3b0])return this[_0x3bbbce(0x236)][_0x5ac3b0];const _0x352b22=VisuMZ[_0x3bbbce(0x186)][_0x3bbbce(0x46c)][_0x3bbbce(0x6ab)][_0x3bbbce(0x810)];return this[_0x3bbbce(0x5f7)](_0x5ac3b0,_0x352b22);},ColorManager[_0x3beee9(0x78f)]=function(){const _0x50d5a4=_0x3beee9,_0x350506='_stored_mpCostColor';this[_0x50d5a4(0x236)]=this[_0x50d5a4(0x236)]||{};if(this[_0x50d5a4(0x236)][_0x350506])return this[_0x50d5a4(0x236)][_0x350506];const _0x1c7476=VisuMZ[_0x50d5a4(0x186)][_0x50d5a4(0x46c)][_0x50d5a4(0x6ab)]['ColorMPCost'];return this['getColorDataFromPluginParameters'](_0x350506,_0x1c7476);},ColorManager['powerUpColor']=function(){const _0xd92338=_0x3beee9,_0x212dec=_0xd92338(0x1a2);this[_0xd92338(0x236)]=this['_colorCache']||{};if(this[_0xd92338(0x236)][_0x212dec])return this[_0xd92338(0x236)][_0x212dec];const _0x4010d7=VisuMZ[_0xd92338(0x186)][_0xd92338(0x46c)][_0xd92338(0x6ab)]['ColorPowerUp'];return this[_0xd92338(0x5f7)](_0x212dec,_0x4010d7);},ColorManager[_0x3beee9(0x5a9)]=function(){const _0x890933=_0x3beee9,_0x4e8de0=_0x890933(0x6f8);this[_0x890933(0x236)]=this[_0x890933(0x236)]||{};if(this['_colorCache'][_0x4e8de0])return this[_0x890933(0x236)][_0x4e8de0];const _0x30e17a=VisuMZ[_0x890933(0x186)][_0x890933(0x46c)][_0x890933(0x6ab)][_0x890933(0x576)];return this['getColorDataFromPluginParameters'](_0x4e8de0,_0x30e17a);},ColorManager['ctGaugeColor1']=function(){const _0x28fa38=_0x3beee9,_0x32d8ad=_0x28fa38(0x65c);this[_0x28fa38(0x236)]=this[_0x28fa38(0x236)]||{};if(this[_0x28fa38(0x236)][_0x32d8ad])return this['_colorCache'][_0x32d8ad];const _0x3341a1=VisuMZ[_0x28fa38(0x186)][_0x28fa38(0x46c)]['Color']['ColorCTGauge1'];return this[_0x28fa38(0x5f7)](_0x32d8ad,_0x3341a1);},ColorManager[_0x3beee9(0x5ef)]=function(){const _0x55c0fb=_0x3beee9,_0x4fafce='_stored_ctGaugeColor2';this[_0x55c0fb(0x236)]=this[_0x55c0fb(0x236)]||{};if(this[_0x55c0fb(0x236)][_0x4fafce])return this[_0x55c0fb(0x236)][_0x4fafce];const _0x64c1a5=VisuMZ[_0x55c0fb(0x186)]['Settings'][_0x55c0fb(0x6ab)]['ColorCTGauge2'];return this['getColorDataFromPluginParameters'](_0x4fafce,_0x64c1a5);},ColorManager[_0x3beee9(0x32d)]=function(){const _0x1eb35a=_0x3beee9,_0x591f2c=_0x1eb35a(0x491);this[_0x1eb35a(0x236)]=this[_0x1eb35a(0x236)]||{};if(this[_0x1eb35a(0x236)][_0x591f2c])return this[_0x1eb35a(0x236)][_0x591f2c];const _0x11557c=VisuMZ[_0x1eb35a(0x186)][_0x1eb35a(0x46c)]['Color'][_0x1eb35a(0x7fa)];return this[_0x1eb35a(0x5f7)](_0x591f2c,_0x11557c);},ColorManager['tpGaugeColor2']=function(){const _0x56352a=_0x3beee9,_0x45e47b=_0x56352a(0x592);this[_0x56352a(0x236)]=this[_0x56352a(0x236)]||{};if(this[_0x56352a(0x236)][_0x45e47b])return this[_0x56352a(0x236)][_0x45e47b];const _0x49361e=VisuMZ[_0x56352a(0x186)][_0x56352a(0x46c)][_0x56352a(0x6ab)][_0x56352a(0x2c0)];return this[_0x56352a(0x5f7)](_0x45e47b,_0x49361e);},ColorManager[_0x3beee9(0x7f4)]=function(){const _0x25e099=_0x3beee9,_0x3f0c52='_stored_tpCostColor';this[_0x25e099(0x236)]=this[_0x25e099(0x236)]||{};if(this['_colorCache'][_0x3f0c52])return this['_colorCache'][_0x3f0c52];const _0x43970d=VisuMZ[_0x25e099(0x186)][_0x25e099(0x46c)][_0x25e099(0x6ab)][_0x25e099(0x1ae)];return this[_0x25e099(0x5f7)](_0x3f0c52,_0x43970d);},ColorManager[_0x3beee9(0x1f6)]=function(){const _0x55ad29=_0x3beee9,_0x11d10d=_0x55ad29(0x49e);this[_0x55ad29(0x236)]=this[_0x55ad29(0x236)]||{};if(this[_0x55ad29(0x236)][_0x11d10d])return this[_0x55ad29(0x236)][_0x11d10d];const _0x554c25=VisuMZ[_0x55ad29(0x186)][_0x55ad29(0x46c)][_0x55ad29(0x6ab)][_0x55ad29(0x1ae)];return this[_0x55ad29(0x5f7)](_0x11d10d,_0x554c25);},ColorManager[_0x3beee9(0x4da)]=function(){const _0x3fc1cb=_0x3beee9,_0x521c20='_stored_expGaugeColor1';this['_colorCache']=this['_colorCache']||{};if(this[_0x3fc1cb(0x236)][_0x521c20])return this[_0x3fc1cb(0x236)][_0x521c20];const _0x4a5137=VisuMZ[_0x3fc1cb(0x186)]['Settings'][_0x3fc1cb(0x6ab)]['ColorExpGauge1'];return this[_0x3fc1cb(0x5f7)](_0x521c20,_0x4a5137);},ColorManager[_0x3beee9(0x291)]=function(){const _0x4cdf91=_0x3beee9,_0xc589d8=_0x4cdf91(0x3c3);this[_0x4cdf91(0x236)]=this['_colorCache']||{};if(this['_colorCache'][_0xc589d8])return this[_0x4cdf91(0x236)][_0xc589d8];const _0x58579d=VisuMZ[_0x4cdf91(0x186)]['Settings']['Color']['ColorExpGauge2'];return this[_0x4cdf91(0x5f7)](_0xc589d8,_0x58579d);},ColorManager[_0x3beee9(0x3f4)]=function(){const _0x319a12=_0x3beee9,_0x12016d=_0x319a12(0x457);this['_colorCache']=this[_0x319a12(0x236)]||{};if(this['_colorCache'][_0x12016d])return this[_0x319a12(0x236)][_0x12016d];const _0x35ee04=VisuMZ[_0x319a12(0x186)][_0x319a12(0x46c)]['Color'][_0x319a12(0x4e9)];return this[_0x319a12(0x5f7)](_0x12016d,_0x35ee04);},ColorManager['maxLvGaugeColor2']=function(){const _0x255103=_0x3beee9,_0x1da8f2='_stored_maxLvGaugeColor2';this['_colorCache']=this[_0x255103(0x236)]||{};if(this['_colorCache'][_0x1da8f2])return this['_colorCache'][_0x1da8f2];const _0x1a2ce1=VisuMZ['CoreEngine']['Settings'][_0x255103(0x6ab)][_0x255103(0x34b)];return this[_0x255103(0x5f7)](_0x1da8f2,_0x1a2ce1);},ColorManager[_0x3beee9(0x323)]=function(_0x5debd9){const _0xa5c3a=_0x3beee9;return VisuMZ['CoreEngine']['Settings'][_0xa5c3a(0x6ab)][_0xa5c3a(0x2cb)][_0xa5c3a(0x573)](this,_0x5debd9);},ColorManager[_0x3beee9(0x4fa)]=function(_0xc83a52){const _0x4e61a8=_0x3beee9;return VisuMZ[_0x4e61a8(0x186)][_0x4e61a8(0x46c)][_0x4e61a8(0x6ab)][_0x4e61a8(0x248)][_0x4e61a8(0x573)](this,_0xc83a52);},ColorManager[_0x3beee9(0x438)]=function(_0x4ad2d7){const _0xefe025=_0x3beee9;return VisuMZ[_0xefe025(0x186)][_0xefe025(0x46c)][_0xefe025(0x6ab)][_0xefe025(0x81b)][_0xefe025(0x573)](this,_0x4ad2d7);},ColorManager[_0x3beee9(0x7ea)]=function(_0x12b1a0){const _0x2fb652=_0x3beee9;return VisuMZ[_0x2fb652(0x186)][_0x2fb652(0x46c)][_0x2fb652(0x6ab)][_0x2fb652(0x818)][_0x2fb652(0x573)](this,_0x12b1a0);},ColorManager[_0x3beee9(0x3ef)]=function(_0x15538a){const _0x36752f=_0x3beee9;return VisuMZ[_0x36752f(0x186)]['Settings'][_0x36752f(0x6ab)][_0x36752f(0x79c)]['call'](this,_0x15538a);},ColorManager[_0x3beee9(0x109)]=function(){const _0x1378e7=_0x3beee9;return VisuMZ[_0x1378e7(0x186)][_0x1378e7(0x46c)][_0x1378e7(0x6ab)][_0x1378e7(0x77c)];},ColorManager['outlineColorDmg']=function(){const _0x8b7c82=_0x3beee9;return VisuMZ[_0x8b7c82(0x186)]['Settings'][_0x8b7c82(0x6ab)][_0x8b7c82(0x33e)]||'rgba(0,\x200,\x200,\x200.7)';},ColorManager[_0x3beee9(0x412)]=function(){const _0x584530=_0x3beee9;return VisuMZ['CoreEngine'][_0x584530(0x46c)][_0x584530(0x6ab)][_0x584530(0x367)]||_0x584530(0x2eb);},ColorManager[_0x3beee9(0x1ed)]=function(){const _0x1423ab=_0x3beee9;return VisuMZ['CoreEngine'][_0x1423ab(0x46c)][_0x1423ab(0x6ab)][_0x1423ab(0x4f5)];},ColorManager['dimColor2']=function(){const _0x37892e=_0x3beee9;return VisuMZ['CoreEngine'][_0x37892e(0x46c)][_0x37892e(0x6ab)]['DimColor2'];},ColorManager[_0x3beee9(0x856)]=function(){const _0x115a22=_0x3beee9;return VisuMZ[_0x115a22(0x186)]['Settings'][_0x115a22(0x6ab)][_0x115a22(0x5b7)];},ColorManager[_0x3beee9(0x625)]=function(){const _0x15d988=_0x3beee9;return VisuMZ[_0x15d988(0x186)][_0x15d988(0x46c)][_0x15d988(0x6ab)]['ItemBackColor2'];},SceneManager[_0x3beee9(0x709)]=[],SceneManager[_0x3beee9(0x3dc)]=function(){const _0x165596=_0x3beee9;return this[_0x165596(0x854)]&&this['_scene'][_0x165596(0x1b0)]===Scene_Battle;},SceneManager[_0x3beee9(0x799)]=function(){const _0x14770c=_0x3beee9;return this[_0x14770c(0x854)]&&this[_0x14770c(0x854)][_0x14770c(0x1b0)]===Scene_Map;},SceneManager[_0x3beee9(0x784)]=function(){return this['_scene']&&this['_scene']instanceof Scene_Map;},VisuMZ['CoreEngine']['SceneManager_initialize']=SceneManager[_0x3beee9(0x59a)],SceneManager[_0x3beee9(0x59a)]=function(){const _0xb284b1=_0x3beee9;VisuMZ[_0xb284b1(0x186)][_0xb284b1(0x1c4)][_0xb284b1(0x573)](this),this[_0xb284b1(0x2a6)]();},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x1d5)]=SceneManager[_0x3beee9(0x5f3)],SceneManager[_0x3beee9(0x5f3)]=function(_0x107e24){const _0x6a13d6=_0x3beee9;if($gameTemp)this[_0x6a13d6(0x7b2)](_0x107e24);VisuMZ[_0x6a13d6(0x186)][_0x6a13d6(0x1d5)][_0x6a13d6(0x573)](this,_0x107e24);},SceneManager['onKeyDownKeysF6F7']=function(_0xa4186a){const _0x3e1ff9=_0x3beee9;if(!_0xa4186a['ctrlKey']&&!_0xa4186a[_0x3e1ff9(0xdc)])switch(_0xa4186a[_0x3e1ff9(0x17f)]){case 0x52:this[_0x3e1ff9(0x364)]();break;case 0x54:this['playTestShiftT']();break;case 0x75:this[_0x3e1ff9(0x716)]();break;case 0x76:if(Input[_0x3e1ff9(0x642)](_0x3e1ff9(0x510))||Input[_0x3e1ff9(0x642)](_0x3e1ff9(0x1d0)))return;this[_0x3e1ff9(0x2c9)]();break;}else{if(_0xa4186a[_0x3e1ff9(0x4d6)]){let _0x248af1=_0xa4186a[_0x3e1ff9(0x17f)];if(_0x248af1>=0x31&&_0x248af1<=0x39){const _0x4ce80f=_0x248af1-0x30;return SceneManager[_0x3e1ff9(0x69e)](_0x4ce80f);}else{if(_0x248af1>=0x61&&_0x248af1<=0x69){const _0x1b6d80=_0x248af1-0x60;return SceneManager[_0x3e1ff9(0x69e)](_0x1b6d80);}}}}},SceneManager[_0x3beee9(0x716)]=function(){const _0x3a149d=_0x3beee9;if($gameTemp[_0x3a149d(0x441)]()&&VisuMZ[_0x3a149d(0x186)][_0x3a149d(0x46c)][_0x3a149d(0x72e)][_0x3a149d(0x81a)]){ConfigManager['seVolume']!==0x0?(ConfigManager[_0x3a149d(0x252)]=0x0,ConfigManager[_0x3a149d(0x4e1)]=0x0,ConfigManager[_0x3a149d(0x4d3)]=0x0,ConfigManager['seVolume']=0x0):(ConfigManager[_0x3a149d(0x252)]=0x64,ConfigManager['bgsVolume']=0x64,ConfigManager[_0x3a149d(0x4d3)]=0x64,ConfigManager[_0x3a149d(0x5d1)]=0x64);ConfigManager[_0x3a149d(0x167)]();if(this[_0x3a149d(0x854)][_0x3a149d(0x1b0)]===Scene_Options){if(this[_0x3a149d(0x854)][_0x3a149d(0x5c6)])this[_0x3a149d(0x854)]['_optionsWindow'][_0x3a149d(0x74e)]();if(this[_0x3a149d(0x854)]['_listWindow'])this[_0x3a149d(0x854)][_0x3a149d(0x645)][_0x3a149d(0x74e)]();}}},SceneManager[_0x3beee9(0x2c9)]=function(){const _0xd0f047=_0x3beee9;$gameTemp[_0xd0f047(0x441)]()&&VisuMZ[_0xd0f047(0x186)][_0xd0f047(0x46c)][_0xd0f047(0x72e)][_0xd0f047(0x104)]&&($gameTemp[_0xd0f047(0x520)]=!$gameTemp[_0xd0f047(0x520)]);},SceneManager[_0x3beee9(0x364)]=function(){const _0x2eef13=_0x3beee9;if(!VisuMZ[_0x2eef13(0x186)]['Settings'][_0x2eef13(0x72e)][_0x2eef13(0x4b0)])return;if(!$gameTemp['isPlaytest']())return;if(!SceneManager[_0x2eef13(0x3dc)]())return;if(!Input['isPressed']('shift'))return;for(const _0x2b98b3 of $gameParty[_0x2eef13(0x22f)]()){if(!_0x2b98b3)continue;_0x2b98b3[_0x2eef13(0x19e)]();}},SceneManager['playTestShiftT']=function(){const _0x3c1cc3=_0x3beee9;if(!VisuMZ[_0x3c1cc3(0x186)][_0x3c1cc3(0x46c)][_0x3c1cc3(0x72e)][_0x3c1cc3(0x166)])return;if(!$gameTemp[_0x3c1cc3(0x441)]())return;if(!SceneManager['isSceneBattle']())return;if(!Input[_0x3c1cc3(0x642)](_0x3c1cc3(0x510)))return;for(const _0x2c4a44 of $gameParty['members']()){if(!_0x2c4a44)continue;_0x2c4a44['gainSilentTp'](_0x2c4a44[_0x3c1cc3(0x444)]());}},SceneManager[_0x3beee9(0x69e)]=function(_0x1032c1){const _0x53e156=_0x3beee9;if(!$gameTemp[_0x53e156(0x441)]())return;if(!DataManager[_0x53e156(0x2d6)](_0x1032c1))return;if(!(VisuMZ[_0x53e156(0x186)]['Settings'][_0x53e156(0x72e)]['CtrlQuickLoad']??!![]))return;this['push'](Scene_QuickLoad),this[_0x53e156(0x739)](_0x1032c1);},SceneManager[_0x3beee9(0x2a6)]=function(){const _0x1b1471=_0x3beee9;this[_0x1b1471(0x21c)]=![],this[_0x1b1471(0x780)]=!VisuMZ[_0x1b1471(0x186)][_0x1b1471(0x46c)]['UI'][_0x1b1471(0x6cb)];},SceneManager[_0x3beee9(0x3d9)]=function(_0x58ccc7){const _0x1b4763=_0x3beee9;VisuMZ[_0x1b4763(0x186)][_0x1b4763(0x46c)]['UI']['SideButtons']&&(this[_0x1b4763(0x21c)]=_0x58ccc7);},SceneManager['isSideButtonLayout']=function(){const _0x16aeff=_0x3beee9;return this[_0x16aeff(0x21c)];},SceneManager[_0x3beee9(0x1af)]=function(){const _0x19bcc1=_0x3beee9;return this[_0x19bcc1(0x780)];},SceneManager['areButtonsOutsideMainUI']=function(){const _0xb72100=_0x3beee9;return this[_0xb72100(0x1af)]()||this['isSideButtonLayout']();},VisuMZ['CoreEngine'][_0x3beee9(0x729)]=SceneManager['isGameActive'],SceneManager[_0x3beee9(0x242)]=function(){const _0xc50e4=_0x3beee9;return VisuMZ['CoreEngine']['Settings'][_0xc50e4(0x72e)][_0xc50e4(0x20c)]?VisuMZ['CoreEngine']['SceneManager_isGameActive'][_0xc50e4(0x573)](this):!![];},SceneManager[_0x3beee9(0x61f)]=function(_0x4f5865){const _0x1e4624=_0x3beee9;if(_0x4f5865 instanceof Error)this[_0x1e4624(0x3ce)](_0x4f5865);else _0x4f5865 instanceof Array&&_0x4f5865[0x0]===_0x1e4624(0x50a)?this['catchLoadError'](_0x4f5865):this['catchUnknownError'](_0x4f5865);this['stop']();},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x70f)]=BattleManager['processEscape'],BattleManager[_0x3beee9(0x42e)]=function(){const _0x2e0d03=_0x3beee9;return VisuMZ[_0x2e0d03(0x186)][_0x2e0d03(0x46c)]['QoL'][_0x2e0d03(0x43e)]?this[_0x2e0d03(0x615)]():VisuMZ[_0x2e0d03(0x186)][_0x2e0d03(0x70f)][_0x2e0d03(0x573)](this);},BattleManager[_0x3beee9(0x615)]=function(){const _0x4c1876=_0x3beee9;return $gameParty[_0x4c1876(0x218)](),SoundManager[_0x4c1876(0x33b)](),this[_0x4c1876(0x7af)](),!![];},BattleManager[_0x3beee9(0x84b)]=function(){const _0xd8f70=_0x3beee9;return $gameSystem[_0xd8f70(0x108)]()>=0x1;},BattleManager[_0x3beee9(0x857)]=function(){return $gameSystem['getBattleSystem']()===0x1;},VisuMZ['CoreEngine'][_0x3beee9(0x1a8)]=Game_Temp[_0x3beee9(0x413)][_0x3beee9(0x59a)],Game_Temp[_0x3beee9(0x413)][_0x3beee9(0x59a)]=function(){const _0x1d08b5=_0x3beee9;VisuMZ[_0x1d08b5(0x186)]['Game_Temp_initialize'][_0x1d08b5(0x573)](this),this[_0x1d08b5(0x689)](),this[_0x1d08b5(0x6ed)](),this['createPointAnimationQueue']();},Game_Temp[_0x3beee9(0x413)]['forceOutOfPlaytest']=function(){const _0x76ee7b=_0x3beee9;VisuMZ['CoreEngine'][_0x76ee7b(0x46c)][_0x76ee7b(0x72e)]['ForceNoPlayTest']&&(this[_0x76ee7b(0x197)]=![]);},Game_Temp[_0x3beee9(0x413)][_0x3beee9(0x9f)]=function(_0xc6aa68){this['_lastPluginCommandInterpreter']=_0xc6aa68;},Game_Temp[_0x3beee9(0x413)]['getLastPluginCommandInterpreter']=function(){const _0x842274=_0x3beee9;return this[_0x842274(0x506)];},Game_Temp[_0x3beee9(0x413)][_0x3beee9(0x202)]=function(){const _0x1c5532=_0x3beee9;this[_0x1c5532(0x17a)]=undefined,this[_0x1c5532(0x416)]=undefined,this['_forcedBattleGridSystem']=undefined;},Game_Temp['prototype'][_0x3beee9(0x28b)]=function(_0xad7f1b){const _0x293d52=_0x3beee9;$gameMap&&$dataMap&&$dataMap[_0x293d52(0x7ee)]&&this[_0x293d52(0xbf)]($dataMap[_0x293d52(0x7ee)]);const _0x5e7fa9=$dataTroops[_0xad7f1b];if(_0x5e7fa9){let _0x20156a=DataManager[_0x293d52(0x836)](_0x5e7fa9['id']);this[_0x293d52(0xbf)](_0x20156a);}},Game_Temp[_0x3beee9(0x413)][_0x3beee9(0xbf)]=function(_0x1469d2){const _0x59450e=_0x3beee9;if(!_0x1469d2)return;if(_0x1469d2[_0x59450e(0x56a)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this[_0x59450e(0x17a)]='FV';else{if(_0x1469d2[_0x59450e(0x56a)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this[_0x59450e(0x17a)]='SV';else{if(_0x1469d2[_0x59450e(0x56a)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x46d828=String(RegExp['$1']);if(_0x46d828[_0x59450e(0x56a)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this['_forcedTroopView']='FV';else _0x46d828[_0x59450e(0x56a)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this[_0x59450e(0x17a)]='SV');}}}if(_0x1469d2[_0x59450e(0x56a)](/<(?:DTB)>/i))this[_0x59450e(0x416)]=0x0;else{if(_0x1469d2[_0x59450e(0x56a)](/<(?:TPB|ATB)[ ]ACTIVE>/i))this[_0x59450e(0x416)]=0x1;else{if(_0x1469d2['match'](/<(?:TPB|ATB)[ ]WAIT>/i))this[_0x59450e(0x416)]=0x2;else{if(_0x1469d2[_0x59450e(0x56a)](/<(?:TPB|ATB)>/i))this[_0x59450e(0x416)]=0x2;else{if(_0x1469d2['match'](/<(?:CTB)>/i))Imported[_0x59450e(0x5eb)]&&(this[_0x59450e(0x416)]='CTB');else{if(_0x1469d2[_0x59450e(0x56a)](/<(?:STB)>/i))Imported[_0x59450e(0x193)]&&(this[_0x59450e(0x416)]='STB');else{if(_0x1469d2[_0x59450e(0x56a)](/<(?:BTB)>/i))Imported[_0x59450e(0x563)]&&(this[_0x59450e(0x416)]=_0x59450e(0x685));else{if(_0x1469d2[_0x59450e(0x56a)](/<(?:FTB)>/i))Imported[_0x59450e(0x743)]&&(this[_0x59450e(0x416)]='FTB');else{if(_0x1469d2['match'](/<(?:OTB)>/i))Imported[_0x59450e(0x116)]&&(this['_forcedBattleSys']=_0x59450e(0x43d));else{if(_0x1469d2[_0x59450e(0x56a)](/<(?:ETB)>/i))Imported['VisuMZ_2_BattleSystemETB']&&(this['_forcedBattleSys']=_0x59450e(0x339));else{if(_0x1469d2[_0x59450e(0x56a)](/<(?:PTB)>/i))Imported[_0x59450e(0x317)]&&(this['_forcedBattleSys']=_0x59450e(0x127));else{if(_0x1469d2[_0x59450e(0x56a)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0xd2cd9a=String(RegExp['$1']);if(_0xd2cd9a[_0x59450e(0x56a)](/DTB/i))this['_forcedBattleSys']=0x0;else{if(_0xd2cd9a[_0x59450e(0x56a)](/(?:TPB|ATB)[ ]ACTIVE/i))this[_0x59450e(0x416)]=0x1;else{if(_0xd2cd9a[_0x59450e(0x56a)](/(?:TPB|ATB)[ ]WAIT/i))this[_0x59450e(0x416)]=0x2;else{if(_0xd2cd9a[_0x59450e(0x56a)](/CTB/i))Imported[_0x59450e(0x5eb)]&&(this[_0x59450e(0x416)]='CTB');else{if(_0xd2cd9a[_0x59450e(0x56a)](/STB/i))Imported['VisuMZ_2_BattleSystemSTB']&&(this['_forcedBattleSys']=_0x59450e(0x237));else{if(_0xd2cd9a[_0x59450e(0x56a)](/BTB/i))Imported[_0x59450e(0x563)]&&(this[_0x59450e(0x416)]='BTB');else{if(_0xd2cd9a[_0x59450e(0x56a)](/FTB/i))Imported[_0x59450e(0x743)]&&(this['_forcedBattleSys']='FTB');else{if(_0xd2cd9a['match'](/OTB/i))Imported[_0x59450e(0x116)]&&(this[_0x59450e(0x416)]=_0x59450e(0x43d));else{if(_0xd2cd9a[_0x59450e(0x56a)](/ETB/i))Imported[_0x59450e(0x46d)]&&(this[_0x59450e(0x416)]=_0x59450e(0x339));else _0xd2cd9a[_0x59450e(0x56a)](/PTB/i)&&(Imported[_0x59450e(0x317)]&&(this[_0x59450e(0x416)]='PTB'));}}}}}}}}}}}}}}}}}}}}if(_0x1469d2[_0x59450e(0x56a)](/<(?:|BATTLE )GRID>/i))this[_0x59450e(0x809)]=!![];else _0x1469d2[_0x59450e(0x56a)](/<NO (?:|BATTLE )GRID>/i)&&(this[_0x59450e(0x809)]=![]);},Game_Temp['prototype'][_0x3beee9(0x6ed)]=function(){const _0x279413=_0x3beee9;this[_0x279413(0x666)]=[];},Game_Temp[_0x3beee9(0x413)][_0x3beee9(0x36a)]=function(_0x5e2864,_0x52f0e8,_0x55fdf0,_0x456a0f){const _0x564cde=_0x3beee9;if(!this[_0x564cde(0x25a)]())return;_0x55fdf0=_0x55fdf0||![],_0x456a0f=_0x456a0f||![];if($dataAnimations[_0x52f0e8]){const _0x28e1aa={'targets':_0x5e2864,'animationId':_0x52f0e8,'mirror':_0x55fdf0,'mute':_0x456a0f};this[_0x564cde(0x666)][_0x564cde(0x188)](_0x28e1aa);for(const _0x57eede of _0x5e2864){_0x57eede[_0x564cde(0x8d)]&&_0x57eede[_0x564cde(0x8d)]();}}},Game_Temp['prototype'][_0x3beee9(0x25a)]=function(){return!![];},Game_Temp[_0x3beee9(0x413)][_0x3beee9(0x124)]=function(){const _0x225551=_0x3beee9;return this['_fauxAnimationQueue'][_0x225551(0x510)]();},Game_Temp[_0x3beee9(0x413)][_0x3beee9(0x182)]=function(){const _0x2fcd55=_0x3beee9;this[_0x2fcd55(0x742)]=[];},Game_Temp[_0x3beee9(0x413)][_0x3beee9(0x63e)]=function(_0x23e7b5,_0x5930d1,_0x142bbb,_0x2d038d,_0x19715f){const _0xfcb322=_0x3beee9;if(!this[_0xfcb322(0x6b3)]())return;_0x2d038d=_0x2d038d||![],_0x19715f=_0x19715f||![];if($dataAnimations[_0x142bbb]){const _0x5c9ce9={'x':_0x23e7b5,'y':_0x5930d1,'animationId':_0x142bbb,'mirror':_0x2d038d,'mute':_0x19715f};this[_0xfcb322(0x742)][_0xfcb322(0x188)](_0x5c9ce9);}},Game_Temp['prototype'][_0x3beee9(0x6b3)]=function(){return!![];},Game_Temp[_0x3beee9(0x413)][_0x3beee9(0x258)]=function(){const _0x3c5ec9=_0x3beee9;return this['_pointAnimationQueue'][_0x3c5ec9(0x510)]();},VisuMZ[_0x3beee9(0x186)]['Game_System_initialize']=Game_System[_0x3beee9(0x413)]['initialize'],Game_System['prototype'][_0x3beee9(0x59a)]=function(){const _0x27e149=_0x3beee9;VisuMZ[_0x27e149(0x186)][_0x27e149(0x2ca)][_0x27e149(0x573)](this),this[_0x27e149(0x66c)]();},Game_System[_0x3beee9(0x413)][_0x3beee9(0x66c)]=function(){const _0x32c4be=_0x3beee9;this[_0x32c4be(0xc8)]={'SideView':$dataSystem[_0x32c4be(0x7a4)],'BattleSystem':this[_0x32c4be(0x1fc)](),'FontSize':$dataSystem[_0x32c4be(0x6a3)]['fontSize'],'Padding':0xc};},Game_System['prototype'][_0x3beee9(0x52c)]=function(){const _0x4312fa=_0x3beee9;if($gameTemp[_0x4312fa(0x17a)]==='SV')return!![];else{if($gameTemp[_0x4312fa(0x17a)]==='FV')return![];}if(this['_CoreEngineSettings']===undefined)this[_0x4312fa(0x66c)]();if(this['_CoreEngineSettings'][_0x4312fa(0x4fd)]===undefined)this[_0x4312fa(0x66c)]();return this[_0x4312fa(0xc8)][_0x4312fa(0x4fd)];},Game_System[_0x3beee9(0x413)][_0x3beee9(0x53f)]=function(_0x21d99b){const _0x4d89ad=_0x3beee9;if(this[_0x4d89ad(0xc8)]===undefined)this['initCoreEngine']();if(this[_0x4d89ad(0xc8)]['SideView']===undefined)this[_0x4d89ad(0x66c)]();this[_0x4d89ad(0xc8)][_0x4d89ad(0x4fd)]=_0x21d99b;},Game_System[_0x3beee9(0x413)]['resetBattleSystem']=function(){const _0xac8465=_0x3beee9;if(this[_0xac8465(0xc8)]===undefined)this[_0xac8465(0x66c)]();this[_0xac8465(0xc8)][_0xac8465(0x395)]=this['initialBattleSystem']();},Game_System[_0x3beee9(0x413)][_0x3beee9(0x1fc)]=function(){const _0x224ebe=_0x3beee9,_0x18e080=(VisuMZ[_0x224ebe(0x186)][_0x224ebe(0x46c)]['BattleSystem']||'DATABASE')[_0x224ebe(0x4d5)]()[_0x224ebe(0x42d)]();return VisuMZ[_0x224ebe(0x186)][_0x224ebe(0x735)](_0x18e080);},Game_System[_0x3beee9(0x413)][_0x3beee9(0x108)]=function(){const _0x5e1851=_0x3beee9;if($gameTemp['_forcedBattleSys']!==undefined)return $gameTemp[_0x5e1851(0x416)];if(this[_0x5e1851(0xc8)]===undefined)this[_0x5e1851(0x66c)]();if(this[_0x5e1851(0xc8)][_0x5e1851(0x395)]===undefined)this[_0x5e1851(0x30e)]();return this[_0x5e1851(0xc8)][_0x5e1851(0x395)];},Game_System[_0x3beee9(0x413)]['setBattleSystem']=function(_0x1b2d39){const _0x33a314=_0x3beee9;if(this[_0x33a314(0xc8)]===undefined)this[_0x33a314(0x66c)]();if(this[_0x33a314(0xc8)][_0x33a314(0x395)]===undefined)this[_0x33a314(0x30e)]();this[_0x33a314(0xc8)]['BattleSystem']=_0x1b2d39;},Game_System[_0x3beee9(0x413)][_0x3beee9(0x400)]=function(){const _0x426443=_0x3beee9;if(this[_0x426443(0xc8)]===undefined)this['initCoreEngine']();if(this[_0x426443(0xc8)]['FontSize']===undefined)this[_0x426443(0x66c)]();return this[_0x426443(0xc8)][_0x426443(0x2ba)];},Game_System['prototype']['setMainFontSize']=function(_0x223c03){const _0x1399ad=_0x3beee9;if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this[_0x1399ad(0xc8)][_0x1399ad(0xda)]===undefined)this[_0x1399ad(0x66c)]();this[_0x1399ad(0xc8)][_0x1399ad(0x2ba)]=_0x223c03;},Game_System['prototype']['windowPadding']=function(){const _0x2a7ec5=_0x3beee9;if(this[_0x2a7ec5(0xc8)]===undefined)this[_0x2a7ec5(0x66c)]();if(this[_0x2a7ec5(0xc8)][_0x2a7ec5(0x6a2)]===undefined)this[_0x2a7ec5(0x66c)]();return this[_0x2a7ec5(0xc8)]['Padding'];},Game_System[_0x3beee9(0x413)][_0x3beee9(0x68f)]=function(_0x5406ab){const _0x5e2f39=_0x3beee9;if(this[_0x5e2f39(0xc8)]===undefined)this['initCoreEngine']();if(this[_0x5e2f39(0xc8)][_0x5e2f39(0xda)]===undefined)this[_0x5e2f39(0x66c)]();this['_CoreEngineSettings']['Padding']=_0x5406ab;},VisuMZ['CoreEngine'][_0x3beee9(0x1bd)]=Game_Screen[_0x3beee9(0x413)][_0x3beee9(0x59a)],Game_Screen[_0x3beee9(0x413)][_0x3beee9(0x59a)]=function(){const _0x312bfe=_0x3beee9;VisuMZ[_0x312bfe(0x186)][_0x312bfe(0x1bd)][_0x312bfe(0x573)](this),this[_0x312bfe(0x2fd)]();},Game_Screen[_0x3beee9(0x413)][_0x3beee9(0x2fd)]=function(){const _0x598b55=_0x3beee9,_0x563516=VisuMZ[_0x598b55(0x186)][_0x598b55(0x46c)][_0x598b55(0x740)];this[_0x598b55(0x6fc)]=_0x563516?.[_0x598b55(0x562)]||_0x598b55(0x6fd);},Game_Screen['prototype'][_0x3beee9(0x449)]=function(){const _0x42eccc=_0x3beee9;if(this['_coreEngineShakeStyle']===undefined)this[_0x42eccc(0x2fd)]();return this[_0x42eccc(0x6fc)];},Game_Screen[_0x3beee9(0x413)][_0x3beee9(0x781)]=function(_0x5b0a0b){const _0x27acbd=_0x3beee9;if(this['_coreEngineShakeStyle']===undefined)this[_0x27acbd(0x2fd)]();this['_coreEngineShakeStyle']=_0x5b0a0b[_0x27acbd(0xbc)]()[_0x27acbd(0x42d)]();},Game_Picture[_0x3beee9(0x413)][_0x3beee9(0x752)]=function(){const _0xdb86fc=_0x3beee9;if($gameParty[_0xdb86fc(0x811)]())return![];return this[_0xdb86fc(0x4ce)]()&&this[_0xdb86fc(0x4ce)]()['charAt'](0x0)==='!';},Game_Picture[_0x3beee9(0x413)][_0x3beee9(0x4ce)]=function(){const _0x24b2cf=_0x3beee9;return this['_name'][_0x24b2cf(0x5f4)]('/')['pop']();},VisuMZ['CoreEngine']['Game_Picture_x']=Game_Picture[_0x3beee9(0x413)]['x'],Game_Picture['prototype']['x']=function(){const _0x9a4fcf=_0x3beee9;return this['isMapScrollLinked']()?this[_0x9a4fcf(0xd8)]():VisuMZ[_0x9a4fcf(0x186)][_0x9a4fcf(0xaa)][_0x9a4fcf(0x573)](this);},Game_Picture['prototype'][_0x3beee9(0xd8)]=function(){const _0x10e086=_0x3beee9,_0x3f8adf=$gameMap[_0x10e086(0xa5)]()*$gameMap[_0x10e086(0xd1)]();return(this['_x']-_0x3f8adf)*$gameScreen[_0x10e086(0x46e)]();},VisuMZ[_0x3beee9(0x186)]['Game_Picture_y']=Game_Picture['prototype']['y'],Game_Picture[_0x3beee9(0x413)]['y']=function(){const _0x126cee=_0x3beee9;return this[_0x126cee(0x752)]()?this[_0x126cee(0x33d)]():VisuMZ[_0x126cee(0x186)]['Game_Picture_y'][_0x126cee(0x573)](this);},Game_Picture[_0x3beee9(0x413)]['yScrollLinkedOffset']=function(){const _0x262b40=_0x3beee9,_0x2c7beb=$gameMap[_0x262b40(0x473)]()*$gameMap['tileHeight']();return(this['_y']-_0x2c7beb)*$gameScreen[_0x262b40(0x46e)]();},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x730)]=Game_Picture[_0x3beee9(0x413)][_0x3beee9(0x437)],Game_Picture['prototype'][_0x3beee9(0x437)]=function(){const _0x1ba3c3=_0x3beee9;let _0x5d4ce1=VisuMZ[_0x1ba3c3(0x186)]['Game_Picture_scaleX'][_0x1ba3c3(0x573)](this);return this[_0x1ba3c3(0x752)]()&&(_0x5d4ce1*=$gameScreen[_0x1ba3c3(0x46e)]()),_0x5d4ce1;},VisuMZ[_0x3beee9(0x186)]['Game_Picture_scaleY']=Game_Picture[_0x3beee9(0x413)]['scaleY'],Game_Picture['prototype']['scaleY']=function(){const _0x14c73d=_0x3beee9;let _0x1db7df=VisuMZ['CoreEngine']['Game_Picture_scaleY'][_0x14c73d(0x573)](this);return this[_0x14c73d(0x752)]()&&(_0x1db7df*=$gameScreen[_0x14c73d(0x46e)]()),_0x1db7df;},Game_Picture['prototype'][_0x3beee9(0x5ee)]=function(_0x9b2e4e){this['_coreEasingType']=_0x9b2e4e;},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x37f)]=Game_Picture[_0x3beee9(0x413)][_0x3beee9(0x794)],Game_Picture[_0x3beee9(0x413)][_0x3beee9(0x794)]=function(_0xd11e7c){const _0x42eecf=_0x3beee9;return this['_coreEasingType']=this[_0x42eecf(0x1c2)]||0x0,[0x0,0x1,0x2,0x3][_0x42eecf(0x820)](this[_0x42eecf(0x1c2)])?VisuMZ[_0x42eecf(0x186)][_0x42eecf(0x37f)][_0x42eecf(0x573)](this,_0xd11e7c):VisuMZ[_0x42eecf(0x429)](_0xd11e7c,this[_0x42eecf(0x1c2)]);},VisuMZ['CoreEngine'][_0x3beee9(0x28d)]=Game_Picture[_0x3beee9(0x413)][_0x3beee9(0x536)],Game_Picture['prototype'][_0x3beee9(0x536)]=function(){const _0x4a3cae=_0x3beee9;VisuMZ[_0x4a3cae(0x186)][_0x4a3cae(0x28d)]['call'](this),this['initRotationCoreEngine']();},Game_Picture[_0x3beee9(0x413)]['initRotationCoreEngine']=function(){const _0x1840c0=_0x3beee9;this[_0x1840c0(0x663)]={'current':0x0,'target':0x0,'duration':0x0,'wholeDuration':0x0,'easingType':_0x1840c0(0x3c2)};},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x540)]=Game_Picture[_0x3beee9(0x413)][_0x3beee9(0x6e4)],Game_Picture[_0x3beee9(0x413)]['angle']=function(){const _0x3663e4=_0x3beee9;let _0x61f28f=VisuMZ[_0x3663e4(0x186)][_0x3663e4(0x540)][_0x3663e4(0x573)](this);return _0x61f28f+=this['anglePlus'](),_0x61f28f;},Game_Picture['prototype']['anglePlus']=function(){const _0x2f5a7f=_0x3beee9;if(this[_0x2f5a7f(0x663)]===undefined)this[_0x2f5a7f(0xd5)]();return this[_0x2f5a7f(0x663)]['current']||0x0;},Game_Picture[_0x3beee9(0x413)][_0x3beee9(0x66d)]=function(_0x537456,_0x472c42,_0x2fb157){const _0x12894e=_0x3beee9;if(this[_0x12894e(0x663)]===undefined)this['initRotationCoreEngine']();this[_0x12894e(0x663)][_0x12894e(0x3b5)]=_0x537456||0x0,this[_0x12894e(0x663)][_0x12894e(0x5af)]=_0x472c42||0x0,this['_anglePlus'][_0x12894e(0x11a)]=_0x472c42||0x0,this[_0x12894e(0x663)]['easingType']=_0x2fb157||_0x12894e(0x3c2),_0x472c42<=0x0&&(this[_0x12894e(0x663)]['current']=this['_anglePlus'][_0x12894e(0x3b5)]);},Game_Picture['prototype'][_0x3beee9(0x270)]=function(_0xfe01b0,_0x99ce0e,_0x4a0db1){const _0x4625f2=_0x3beee9;if(this[_0x4625f2(0x663)]===undefined)this['initRotationCoreEngine']();this[_0x4625f2(0x663)][_0x4625f2(0x3b5)]+=_0xfe01b0||0x0,this[_0x4625f2(0x663)][_0x4625f2(0x5af)]=_0x99ce0e||0x0,this[_0x4625f2(0x663)]['wholeDuration']=_0x99ce0e||0x0,this[_0x4625f2(0x663)][_0x4625f2(0x762)]=_0x4a0db1||_0x4625f2(0x3c2),_0x99ce0e<=0x0&&(this[_0x4625f2(0x663)][_0x4625f2(0x425)]=this[_0x4625f2(0x663)][_0x4625f2(0x3b5)]);},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x3b7)]=Game_Picture[_0x3beee9(0x413)][_0x3beee9(0x53d)],Game_Picture[_0x3beee9(0x413)][_0x3beee9(0x53d)]=function(){const _0x2e7c36=_0x3beee9;VisuMZ[_0x2e7c36(0x186)][_0x2e7c36(0x3b7)][_0x2e7c36(0x573)](this),this[_0x2e7c36(0x800)]();},Game_Picture[_0x3beee9(0x413)]['updateAnglePlus']=function(){const _0x40b7ce=_0x3beee9;if(this[_0x40b7ce(0x663)]===undefined)this['initRotationCoreEngine']();const _0x43c628=this['_anglePlus'];if(_0x43c628[_0x40b7ce(0x5af)]<=0x0)return;_0x43c628[_0x40b7ce(0x425)]=this['applyEasingAnglePlus'](_0x43c628['current'],_0x43c628['target']),_0x43c628[_0x40b7ce(0x5af)]--,_0x43c628['duration']<=0x0&&(_0x43c628[_0x40b7ce(0x425)]=_0x43c628['target']);},Game_Picture[_0x3beee9(0x413)]['applyEasingAnglePlus']=function(_0x58501f,_0x194276){const _0x1123bb=_0x3beee9,_0x53d131=this['_anglePlus'],_0x144a7e=_0x53d131['easingType'],_0x28694d=_0x53d131[_0x1123bb(0x5af)],_0x513a1c=_0x53d131[_0x1123bb(0x11a)],_0x38fc88=VisuMZ[_0x1123bb(0x429)]((_0x513a1c-_0x28694d)/_0x513a1c,_0x144a7e),_0x4f5f65=VisuMZ['ApplyEasing']((_0x513a1c-_0x28694d+0x1)/_0x513a1c,_0x144a7e),_0x49b08a=(_0x58501f-_0x194276*_0x38fc88)/(0x1-_0x38fc88);return _0x49b08a+(_0x194276-_0x49b08a)*_0x4f5f65;},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x71d)]=Game_Action['prototype'][_0x3beee9(0x539)],Game_Action[_0x3beee9(0x413)]['itemHit']=function(_0x19bf0d){const _0x2b1542=_0x3beee9;return VisuMZ[_0x2b1542(0x186)][_0x2b1542(0x46c)][_0x2b1542(0x72e)][_0x2b1542(0x843)]?this[_0x2b1542(0x65b)](_0x19bf0d):VisuMZ[_0x2b1542(0x186)][_0x2b1542(0x71d)][_0x2b1542(0x573)](this,_0x19bf0d);},Game_Action['prototype'][_0x3beee9(0x65b)]=function(_0x3aca3e){const _0xcc82a2=_0x3beee9,_0x2c4bdc=this['itemSuccessRate'](_0x3aca3e),_0x3e7a14=this['subjectHitRate'](_0x3aca3e),_0x499985=this[_0xcc82a2(0x7d0)](_0x3aca3e);return _0x2c4bdc*(_0x3e7a14-_0x499985);},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x791)]=Game_Action[_0x3beee9(0x413)]['itemEva'],Game_Action['prototype'][_0x3beee9(0x21f)]=function(_0x3cd6bf){const _0x182610=_0x3beee9;return VisuMZ[_0x182610(0x186)][_0x182610(0x46c)][_0x182610(0x72e)][_0x182610(0x843)]?0x0:VisuMZ[_0x182610(0x186)][_0x182610(0x791)][_0x182610(0x573)](this,_0x3cd6bf);},Game_Action[_0x3beee9(0x413)][_0x3beee9(0xce)]=function(_0x114d81){const _0x4fba15=_0x3beee9;return this[_0x4fba15(0x17e)]()['successRate']*0.01;},Game_Action[_0x3beee9(0x413)]['subjectHitRate']=function(_0x5bbe68){const _0x2d145d=_0x3beee9;if(VisuMZ['CoreEngine']['Settings'][_0x2d145d(0x72e)][_0x2d145d(0x67d)]&&this[_0x2d145d(0x3a8)]())return 0x1;return this[_0x2d145d(0x680)]()?VisuMZ[_0x2d145d(0x186)][_0x2d145d(0x46c)][_0x2d145d(0x72e)][_0x2d145d(0x67d)]&&this[_0x2d145d(0x294)]()[_0x2d145d(0x1bf)]()?this[_0x2d145d(0x294)]()[_0x2d145d(0xac)]+0.05:this['subject']()['hit']:0x1;},Game_Action[_0x3beee9(0x413)][_0x3beee9(0x7d0)]=function(_0xf6dcc7){const _0x5d1031=_0x3beee9;if(this['subject']()[_0x5d1031(0x1bf)]()===_0xf6dcc7['isActor']())return 0x0;if(this[_0x5d1031(0x680)]())return VisuMZ[_0x5d1031(0x186)][_0x5d1031(0x46c)][_0x5d1031(0x72e)]['AccuracyBoost']&&_0xf6dcc7[_0x5d1031(0x734)]()?_0xf6dcc7[_0x5d1031(0x7c3)]-0.05:_0xf6dcc7[_0x5d1031(0x7c3)];else return this[_0x5d1031(0x132)]()?_0xf6dcc7[_0x5d1031(0x249)]:0x0;},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x5d5)]=Game_Action[_0x3beee9(0x413)][_0x3beee9(0x149)],Game_Action[_0x3beee9(0x413)]['updateLastTarget']=function(_0x54ac32){const _0x404e24=_0x3beee9;VisuMZ[_0x404e24(0x186)][_0x404e24(0x5d5)][_0x404e24(0x573)](this,_0x54ac32);if(VisuMZ[_0x404e24(0x186)][_0x404e24(0x46c)][_0x404e24(0x72e)][_0x404e24(0x843)])return;const _0x129abf=_0x54ac32[_0x404e24(0x68e)]();_0x129abf[_0x404e24(0x6c8)]&&(0x1-this[_0x404e24(0x21f)](_0x54ac32)>this[_0x404e24(0x539)](_0x54ac32)&&(_0x129abf['missed']=![],_0x129abf[_0x404e24(0x7be)]=!![]));},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x597)]=Game_BattlerBase[_0x3beee9(0x413)][_0x3beee9(0x283)],Game_BattlerBase[_0x3beee9(0x413)][_0x3beee9(0x283)]=function(){const _0x479529=_0x3beee9;this[_0x479529(0x83b)]={},VisuMZ['CoreEngine']['Game_BattlerBase_initMembers']['call'](this);},VisuMZ['CoreEngine']['Game_BattlerBase_refresh']=Game_BattlerBase[_0x3beee9(0x413)][_0x3beee9(0x74e)],Game_BattlerBase[_0x3beee9(0x413)][_0x3beee9(0x74e)]=function(){const _0x26532e=_0x3beee9;this[_0x26532e(0x83b)]={},VisuMZ['CoreEngine']['Game_BattlerBase_refresh'][_0x26532e(0x573)](this);},Game_BattlerBase[_0x3beee9(0x413)]['checkCacheKey']=function(_0x191229){const _0xebc0c1=_0x3beee9;return this[_0xebc0c1(0x83b)]=this[_0xebc0c1(0x83b)]||{},this[_0xebc0c1(0x83b)][_0x191229]!==undefined;},Game_BattlerBase[_0x3beee9(0x413)][_0x3beee9(0x408)]=function(_0x634f7c){const _0x58f776=_0x3beee9,_0x519177=(_0x1508d1,_0x708d28)=>{const _0x38d384=_0x4666;if(!_0x708d28)return _0x1508d1;if(_0x708d28[_0x38d384(0x7ee)][_0x38d384(0x56a)](VisuMZ[_0x38d384(0x186)][_0x38d384(0x6fa)]['paramPlus'][_0x634f7c])){var _0x207daf=Number(RegExp['$1']);_0x1508d1+=_0x207daf;}if(_0x708d28[_0x38d384(0x7ee)][_0x38d384(0x56a)](VisuMZ['CoreEngine'][_0x38d384(0x6fa)][_0x38d384(0x277)][_0x634f7c])){var _0x15c3d0=String(RegExp['$1']);try{_0x1508d1+=eval(_0x15c3d0);}catch(_0x2a11c5){if($gameTemp['isPlaytest']())console[_0x38d384(0x772)](_0x2a11c5);}}return _0x1508d1;};return this[_0x58f776(0x5dc)]()[_0x58f776(0x653)](_0x519177,this[_0x58f776(0x114)][_0x634f7c]);},Game_BattlerBase[_0x3beee9(0x413)][_0x3beee9(0xd6)]=function(_0x5b3907){const _0x29d624=_0x3beee9;var _0x2dc459=_0x29d624(0x22a)+(this['isActor']()?_0x29d624(0x24d):'Enemy')+_0x29d624(0x2ae)+_0x5b3907;if(this[_0x29d624(0x76c)](_0x2dc459))return this[_0x29d624(0x83b)][_0x2dc459];this[_0x29d624(0x83b)][_0x2dc459]=eval(VisuMZ[_0x29d624(0x186)][_0x29d624(0x46c)][_0x29d624(0x234)][_0x2dc459]);const _0x49e88c=(_0x22c995,_0x113581)=>{const _0x129614=_0x29d624;if(!_0x113581)return _0x22c995;if(_0x113581[_0x129614(0x7ee)]['match'](VisuMZ[_0x129614(0x186)][_0x129614(0x6fa)][_0x129614(0xd6)][_0x5b3907])){var _0x27d8b9=Number(RegExp['$1']);if(_0x27d8b9===0x0)_0x27d8b9=Number[_0x129614(0x2cc)];_0x22c995=Math[_0x129614(0x38a)](_0x22c995,_0x27d8b9);}if(_0x113581['note'][_0x129614(0x56a)](VisuMZ[_0x129614(0x186)]['RegExp'][_0x129614(0x692)][_0x5b3907])){var _0x347ee9=String(RegExp['$1']);try{_0x22c995=Math[_0x129614(0x38a)](_0x22c995,Number(eval(_0x347ee9)));}catch(_0x44ee7f){if($gameTemp[_0x129614(0x441)]())console[_0x129614(0x772)](_0x44ee7f);}}return _0x22c995;};if(this[_0x29d624(0x83b)][_0x2dc459]===0x0)this[_0x29d624(0x83b)][_0x2dc459]=Number[_0x29d624(0x2cc)];return this[_0x29d624(0x83b)][_0x2dc459]=this[_0x29d624(0x5dc)]()[_0x29d624(0x653)](_0x49e88c,this[_0x29d624(0x83b)][_0x2dc459]),this[_0x29d624(0x83b)][_0x2dc459];},Game_BattlerBase[_0x3beee9(0x413)][_0x3beee9(0x280)]=function(_0x564843){const _0x35e473=_0x3beee9,_0x30d4a3=this[_0x35e473(0x48c)](Game_BattlerBase[_0x35e473(0x4ed)],_0x564843),_0x12debd=(_0x340d9e,_0x43e3ba)=>{const _0x87af38=_0x35e473;if(!_0x43e3ba)return _0x340d9e;if(_0x43e3ba[_0x87af38(0x7ee)][_0x87af38(0x56a)](VisuMZ[_0x87af38(0x186)][_0x87af38(0x6fa)][_0x87af38(0x2e6)][_0x564843])){var _0x9a75c1=Number(RegExp['$1'])/0x64;_0x340d9e*=_0x9a75c1;}if(_0x43e3ba[_0x87af38(0x7ee)][_0x87af38(0x56a)](VisuMZ[_0x87af38(0x186)][_0x87af38(0x6fa)]['paramRate2'][_0x564843])){var _0x9a75c1=Number(RegExp['$1']);_0x340d9e*=_0x9a75c1;}if(_0x43e3ba[_0x87af38(0x7ee)][_0x87af38(0x56a)](VisuMZ[_0x87af38(0x186)][_0x87af38(0x6fa)]['paramRateJS'][_0x564843])){var _0x541cb3=String(RegExp['$1']);try{_0x340d9e*=eval(_0x541cb3);}catch(_0x5417e5){if($gameTemp[_0x87af38(0x441)]())console[_0x87af38(0x772)](_0x5417e5);}}return _0x340d9e;};return this['traitObjects']()[_0x35e473(0x653)](_0x12debd,_0x30d4a3);},Game_BattlerBase[_0x3beee9(0x413)][_0x3beee9(0x285)]=function(_0x4e4815){const _0x1ae813=_0x3beee9,_0x26f18a=(_0x38285b,_0x1234df)=>{const _0x4ff366=_0x4666;if(!_0x1234df)return _0x38285b;if(_0x1234df[_0x4ff366(0x7ee)][_0x4ff366(0x56a)](VisuMZ[_0x4ff366(0x186)][_0x4ff366(0x6fa)][_0x4ff366(0x6b6)][_0x4e4815])){var _0x147c07=Number(RegExp['$1']);_0x38285b+=_0x147c07;}if(_0x1234df['note']['match'](VisuMZ[_0x4ff366(0x186)][_0x4ff366(0x6fa)][_0x4ff366(0x2a5)][_0x4e4815])){var _0xed039e=String(RegExp['$1']);try{_0x38285b+=eval(_0xed039e);}catch(_0x457204){if($gameTemp[_0x4ff366(0x441)]())console[_0x4ff366(0x772)](_0x457204);}}return _0x38285b;};return this[_0x1ae813(0x5dc)]()[_0x1ae813(0x653)](_0x26f18a,0x0);},Game_BattlerBase['prototype']['param']=function(_0x2cfbd4){const _0x47127e=_0x3beee9;let _0x9869cc=_0x47127e(0x225)+_0x2cfbd4+_0x47127e(0x11e);if(this[_0x47127e(0x76c)](_0x9869cc))return this['_cache'][_0x9869cc];return this['_cache'][_0x9869cc]=Math[_0x47127e(0x368)](VisuMZ[_0x47127e(0x186)]['Settings'][_0x47127e(0x234)][_0x47127e(0x3ff)][_0x47127e(0x573)](this,_0x2cfbd4)),this[_0x47127e(0x83b)][_0x9869cc];},Game_BattlerBase[_0x3beee9(0x413)][_0x3beee9(0x39d)]=function(_0x1f0618){const _0x26a449=_0x3beee9,_0x35529e=(_0x21780a,_0x7ae682)=>{const _0x56a703=_0x4666;if(!_0x7ae682)return _0x21780a;if(_0x7ae682['note'][_0x56a703(0x56a)](VisuMZ[_0x56a703(0x186)][_0x56a703(0x6fa)][_0x56a703(0x3e6)][_0x1f0618])){var _0x58f138=Number(RegExp['$1'])/0x64;_0x21780a+=_0x58f138;}if(_0x7ae682['note'][_0x56a703(0x56a)](VisuMZ[_0x56a703(0x186)][_0x56a703(0x6fa)][_0x56a703(0x13c)][_0x1f0618])){var _0x58f138=Number(RegExp['$1']);_0x21780a+=_0x58f138;}if(_0x7ae682['note'][_0x56a703(0x56a)](VisuMZ['CoreEngine'][_0x56a703(0x6fa)]['xparamPlusJS'][_0x1f0618])){var _0x248cee=String(RegExp['$1']);try{_0x21780a+=eval(_0x248cee);}catch(_0x35c5e5){if($gameTemp[_0x56a703(0x441)]())console['log'](_0x35c5e5);}}return _0x21780a;};return this[_0x26a449(0x5dc)]()[_0x26a449(0x653)](_0x35529e,0x0);},Game_BattlerBase['prototype'][_0x3beee9(0x502)]=function(_0x28db07){const _0x39ebef=_0x3beee9,_0x5409f0=(_0x21aa7b,_0x287a1a)=>{const _0x345c58=_0x4666;if(!_0x287a1a)return _0x21aa7b;if(_0x287a1a[_0x345c58(0x7ee)][_0x345c58(0x56a)](VisuMZ[_0x345c58(0x186)][_0x345c58(0x6fa)]['xparamRate1'][_0x28db07])){var _0x1dac2a=Number(RegExp['$1'])/0x64;_0x21aa7b*=_0x1dac2a;}if(_0x287a1a['note']['match'](VisuMZ[_0x345c58(0x186)][_0x345c58(0x6fa)]['xparamRate2'][_0x28db07])){var _0x1dac2a=Number(RegExp['$1']);_0x21aa7b*=_0x1dac2a;}if(_0x287a1a['note'][_0x345c58(0x56a)](VisuMZ[_0x345c58(0x186)]['RegExp'][_0x345c58(0x434)][_0x28db07])){var _0xb690d=String(RegExp['$1']);try{_0x21aa7b*=eval(_0xb690d);}catch(_0x23933c){if($gameTemp['isPlaytest']())console[_0x345c58(0x772)](_0x23933c);}}return _0x21aa7b;};return this[_0x39ebef(0x5dc)]()[_0x39ebef(0x653)](_0x5409f0,0x1);},Game_BattlerBase['prototype'][_0x3beee9(0x191)]=function(_0x5db20e){const _0x58996c=_0x3beee9,_0x256c86=(_0x31e186,_0x4db206)=>{const _0x3f9d36=_0x4666;if(!_0x4db206)return _0x31e186;if(_0x4db206[_0x3f9d36(0x7ee)]['match'](VisuMZ[_0x3f9d36(0x186)][_0x3f9d36(0x6fa)][_0x3f9d36(0x1e6)][_0x5db20e])){var _0x204a86=Number(RegExp['$1'])/0x64;_0x31e186+=_0x204a86;}if(_0x4db206[_0x3f9d36(0x7ee)][_0x3f9d36(0x56a)](VisuMZ[_0x3f9d36(0x186)][_0x3f9d36(0x6fa)][_0x3f9d36(0x69b)][_0x5db20e])){var _0x204a86=Number(RegExp['$1']);_0x31e186+=_0x204a86;}if(_0x4db206[_0x3f9d36(0x7ee)][_0x3f9d36(0x56a)](VisuMZ[_0x3f9d36(0x186)]['RegExp'][_0x3f9d36(0x823)][_0x5db20e])){var _0x273a8d=String(RegExp['$1']);try{_0x31e186+=eval(_0x273a8d);}catch(_0x5181ec){if($gameTemp[_0x3f9d36(0x441)]())console[_0x3f9d36(0x772)](_0x5181ec);}}return _0x31e186;};return this[_0x58996c(0x5dc)]()[_0x58996c(0x653)](_0x256c86,0x0);},Game_BattlerBase[_0x3beee9(0x413)][_0x3beee9(0x82e)]=function(_0x8b4bb0){const _0x39bb10=_0x3beee9;let _0x3e65c5=_0x39bb10(0x82e)+_0x8b4bb0+'Total';if(this[_0x39bb10(0x76c)](_0x3e65c5))return this[_0x39bb10(0x83b)][_0x3e65c5];return this[_0x39bb10(0x83b)][_0x3e65c5]=VisuMZ[_0x39bb10(0x186)][_0x39bb10(0x46c)][_0x39bb10(0x234)][_0x39bb10(0x490)]['call'](this,_0x8b4bb0),this[_0x39bb10(0x83b)][_0x3e65c5];},Game_BattlerBase[_0x3beee9(0x413)]['sparamPlus']=function(_0x3f9bc7){const _0x14abbb=_0x3beee9,_0x6e38b1=(_0x4499d9,_0x108cc0)=>{const _0x326963=_0x4666;if(!_0x108cc0)return _0x4499d9;if(_0x108cc0['note']['match'](VisuMZ[_0x326963(0x186)][_0x326963(0x6fa)][_0x326963(0x41c)][_0x3f9bc7])){var _0x10a72c=Number(RegExp['$1'])/0x64;_0x4499d9+=_0x10a72c;}if(_0x108cc0['note'][_0x326963(0x56a)](VisuMZ[_0x326963(0x186)][_0x326963(0x6fa)]['sparamPlus2'][_0x3f9bc7])){var _0x10a72c=Number(RegExp['$1']);_0x4499d9+=_0x10a72c;}if(_0x108cc0[_0x326963(0x7ee)]['match'](VisuMZ[_0x326963(0x186)][_0x326963(0x6fa)]['sparamPlusJS'][_0x3f9bc7])){var _0x19f94d=String(RegExp['$1']);try{_0x4499d9+=eval(_0x19f94d);}catch(_0x59e799){if($gameTemp[_0x326963(0x441)]())console[_0x326963(0x772)](_0x59e799);}}return _0x4499d9;};return this['traitObjects']()[_0x14abbb(0x653)](_0x6e38b1,0x0);},Game_BattlerBase[_0x3beee9(0x413)]['sparamRate']=function(_0x2c1f23){const _0x1420aa=_0x3beee9,_0x31d4f7=(_0x3ae1e7,_0x4e7b8a)=>{const _0x525d1d=_0x4666;if(!_0x4e7b8a)return _0x3ae1e7;if(_0x4e7b8a['note'][_0x525d1d(0x56a)](VisuMZ[_0x525d1d(0x186)][_0x525d1d(0x6fa)][_0x525d1d(0x31d)][_0x2c1f23])){var _0xc64304=Number(RegExp['$1'])/0x64;_0x3ae1e7*=_0xc64304;}if(_0x4e7b8a['note']['match'](VisuMZ[_0x525d1d(0x186)][_0x525d1d(0x6fa)][_0x525d1d(0x7fc)][_0x2c1f23])){var _0xc64304=Number(RegExp['$1']);_0x3ae1e7*=_0xc64304;}if(_0x4e7b8a[_0x525d1d(0x7ee)][_0x525d1d(0x56a)](VisuMZ[_0x525d1d(0x186)][_0x525d1d(0x6fa)][_0x525d1d(0x2f4)][_0x2c1f23])){var _0x515237=String(RegExp['$1']);try{_0x3ae1e7*=eval(_0x515237);}catch(_0x52bb98){if($gameTemp[_0x525d1d(0x441)]())console[_0x525d1d(0x772)](_0x52bb98);}}return _0x3ae1e7;};return this[_0x1420aa(0x5dc)]()[_0x1420aa(0x653)](_0x31d4f7,0x1);},Game_BattlerBase[_0x3beee9(0x413)][_0x3beee9(0x4d8)]=function(_0x441d80){const _0x37f698=_0x3beee9,_0x17d00d=(_0x542c91,_0xcad333)=>{const _0x3864a6=_0x4666;if(!_0xcad333)return _0x542c91;if(_0xcad333[_0x3864a6(0x7ee)][_0x3864a6(0x56a)](VisuMZ[_0x3864a6(0x186)][_0x3864a6(0x6fa)]['sparamFlat1'][_0x441d80])){var _0x7f8aa0=Number(RegExp['$1'])/0x64;_0x542c91+=_0x7f8aa0;}if(_0xcad333[_0x3864a6(0x7ee)][_0x3864a6(0x56a)](VisuMZ[_0x3864a6(0x186)][_0x3864a6(0x6fa)][_0x3864a6(0x2e4)][_0x441d80])){var _0x7f8aa0=Number(RegExp['$1']);_0x542c91+=_0x7f8aa0;}if(_0xcad333[_0x3864a6(0x7ee)][_0x3864a6(0x56a)](VisuMZ['CoreEngine'][_0x3864a6(0x6fa)]['sparamFlatJS'][_0x441d80])){var _0x19c3cf=String(RegExp['$1']);try{_0x542c91+=eval(_0x19c3cf);}catch(_0x1e4c64){if($gameTemp[_0x3864a6(0x441)]())console[_0x3864a6(0x772)](_0x1e4c64);}}return _0x542c91;};return this[_0x37f698(0x5dc)]()['reduce'](_0x17d00d,0x0);},Game_BattlerBase[_0x3beee9(0x413)][_0x3beee9(0x7fe)]=function(_0x4df461){const _0x3f59f1=_0x3beee9;let _0x3c55a8=_0x3f59f1(0x7fe)+_0x4df461+_0x3f59f1(0x11e);if(this[_0x3f59f1(0x76c)](_0x3c55a8))return this[_0x3f59f1(0x83b)][_0x3c55a8];return this[_0x3f59f1(0x83b)][_0x3c55a8]=VisuMZ['CoreEngine'][_0x3f59f1(0x46c)][_0x3f59f1(0x234)][_0x3f59f1(0x7c8)]['call'](this,_0x4df461),this[_0x3f59f1(0x83b)][_0x3c55a8];},Game_BattlerBase[_0x3beee9(0x413)]['paramValueByName']=function(_0x1e3c1c,_0x1886b3){const _0x49468c=_0x3beee9;if(typeof paramId===_0x49468c(0x43c))return this['param'](_0x1e3c1c);_0x1e3c1c=String(_0x1e3c1c||'')[_0x49468c(0x4d5)]();if(_0x1e3c1c===_0x49468c(0x64f))return this['param'](0x0);if(_0x1e3c1c===_0x49468c(0x27f))return this[_0x49468c(0x225)](0x1);if(_0x1e3c1c===_0x49468c(0x309))return this[_0x49468c(0x225)](0x2);if(_0x1e3c1c===_0x49468c(0x329))return this[_0x49468c(0x225)](0x3);if(_0x1e3c1c===_0x49468c(0x2a0))return this[_0x49468c(0x225)](0x4);if(_0x1e3c1c===_0x49468c(0x7b9))return this[_0x49468c(0x225)](0x5);if(_0x1e3c1c===_0x49468c(0x67f))return this[_0x49468c(0x225)](0x6);if(_0x1e3c1c==='LUK')return this[_0x49468c(0x225)](0x7);if(_0x1e3c1c===_0x49468c(0x56f))return _0x1886b3?String(Math[_0x49468c(0x368)](this['xparam'](0x0)*0x64))+'%':this[_0x49468c(0x82e)](0x0);if(_0x1e3c1c===_0x49468c(0x720))return _0x1886b3?String(Math[_0x49468c(0x368)](this[_0x49468c(0x82e)](0x1)*0x64))+'%':this[_0x49468c(0x82e)](0x1);if(_0x1e3c1c===_0x49468c(0x246))return _0x1886b3?String(Math['round'](this['xparam'](0x2)*0x64))+'%':this['xparam'](0x2);if(_0x1e3c1c===_0x49468c(0x4e2))return _0x1886b3?String(Math[_0x49468c(0x368)](this[_0x49468c(0x82e)](0x3)*0x64))+'%':this[_0x49468c(0x82e)](0x3);if(_0x1e3c1c==='MEV')return _0x1886b3?String(Math[_0x49468c(0x368)](this[_0x49468c(0x82e)](0x4)*0x64))+'%':this[_0x49468c(0x82e)](0x4);if(_0x1e3c1c===_0x49468c(0x107))return _0x1886b3?String(Math['round'](this[_0x49468c(0x82e)](0x5)*0x64))+'%':this[_0x49468c(0x82e)](0x5);if(_0x1e3c1c===_0x49468c(0x79e))return _0x1886b3?String(Math[_0x49468c(0x368)](this[_0x49468c(0x82e)](0x6)*0x64))+'%':this['xparam'](0x6);if(_0x1e3c1c===_0x49468c(0x322))return _0x1886b3?String(Math['round'](this[_0x49468c(0x82e)](0x7)*0x64))+'%':this[_0x49468c(0x82e)](0x7);if(_0x1e3c1c===_0x49468c(0x859))return _0x1886b3?String(Math['round'](this[_0x49468c(0x82e)](0x8)*0x64))+'%':this[_0x49468c(0x82e)](0x8);if(_0x1e3c1c===_0x49468c(0x263))return _0x1886b3?String(Math['round'](this[_0x49468c(0x82e)](0x9)*0x64))+'%':this[_0x49468c(0x82e)](0x9);if(_0x1e3c1c===_0x49468c(0x37e))return _0x1886b3?String(Math[_0x49468c(0x368)](this['sparam'](0x0)*0x64))+'%':this['sparam'](0x0);if(_0x1e3c1c===_0x49468c(0x62c))return _0x1886b3?String(Math['round'](this[_0x49468c(0x7fe)](0x1)*0x64))+'%':this['sparam'](0x1);if(_0x1e3c1c===_0x49468c(0x49a))return _0x1886b3?String(Math[_0x49468c(0x368)](this[_0x49468c(0x7fe)](0x2)*0x64))+'%':this['sparam'](0x2);if(_0x1e3c1c===_0x49468c(0x11d))return _0x1886b3?String(Math[_0x49468c(0x368)](this[_0x49468c(0x7fe)](0x3)*0x64))+'%':this[_0x49468c(0x7fe)](0x3);if(_0x1e3c1c===_0x49468c(0x7bf))return _0x1886b3?String(Math[_0x49468c(0x368)](this['sparam'](0x4)*0x64))+'%':this[_0x49468c(0x7fe)](0x4);if(_0x1e3c1c===_0x49468c(0x667))return _0x1886b3?String(Math['round'](this[_0x49468c(0x7fe)](0x5)*0x64))+'%':this[_0x49468c(0x7fe)](0x5);if(_0x1e3c1c===_0x49468c(0x452))return _0x1886b3?String(Math[_0x49468c(0x368)](this[_0x49468c(0x7fe)](0x6)*0x64))+'%':this[_0x49468c(0x7fe)](0x6);if(_0x1e3c1c===_0x49468c(0x3d7))return _0x1886b3?String(Math['round'](this[_0x49468c(0x7fe)](0x7)*0x64))+'%':this[_0x49468c(0x7fe)](0x7);if(_0x1e3c1c===_0x49468c(0x183))return _0x1886b3?String(Math['round'](this[_0x49468c(0x7fe)](0x8)*0x64))+'%':this[_0x49468c(0x7fe)](0x8);if(_0x1e3c1c===_0x49468c(0x7a3))return _0x1886b3?String(Math['round'](this[_0x49468c(0x7fe)](0x9)*0x64))+'%':this[_0x49468c(0x7fe)](0x9);if(VisuMZ[_0x49468c(0x186)][_0x49468c(0x67b)][_0x1e3c1c]){const _0x12bc76=VisuMZ[_0x49468c(0x186)][_0x49468c(0x67b)][_0x1e3c1c],_0x399d69=this[_0x12bc76];return VisuMZ[_0x49468c(0x186)][_0x49468c(0x622)][_0x1e3c1c]===_0x49468c(0x99)?_0x399d69:_0x1886b3?String(Math[_0x49468c(0x368)](_0x399d69*0x64))+'%':_0x399d69;}return'';},Game_BattlerBase[_0x3beee9(0x413)][_0x3beee9(0x174)]=function(){const _0x21a093=_0x3beee9;return this[_0x21a093(0x310)]()&&this[_0x21a093(0x35a)]<this[_0x21a093(0x6a6)]*VisuMZ[_0x21a093(0x186)][_0x21a093(0x46c)][_0x21a093(0x234)][_0x21a093(0x40e)];},Game_Battler[_0x3beee9(0x413)][_0x3beee9(0x77b)]=function(){const _0x4edbb1=_0x3beee9;SoundManager[_0x4edbb1(0x6cf)](),this['requestMotion'](_0x4edbb1(0x5f6));},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x90)]=Game_Actor['prototype'][_0x3beee9(0x217)],Game_Actor[_0x3beee9(0x413)][_0x3beee9(0x217)]=function(_0x1d07ba){const _0x495af3=_0x3beee9;if(this[_0x495af3(0x245)]>0x63)return this[_0x495af3(0x7a6)](_0x1d07ba);return VisuMZ[_0x495af3(0x186)][_0x495af3(0x90)][_0x495af3(0x573)](this,_0x1d07ba);},Game_Actor[_0x3beee9(0x413)][_0x3beee9(0x7a6)]=function(_0xf1bf83){const _0x3f1ede=_0x3beee9,_0x5cc1b8=this['currentClass']()[_0x3f1ede(0x3ee)][_0xf1bf83][0x63],_0x382892=this[_0x3f1ede(0x717)]()[_0x3f1ede(0x3ee)][_0xf1bf83][0x62];return _0x5cc1b8+(_0x5cc1b8-_0x382892)*(this[_0x3f1ede(0x245)]-0x63);},VisuMZ['CoreEngine']['Game_Actor_changeClass']=Game_Actor[_0x3beee9(0x413)]['changeClass'],Game_Actor['prototype']['changeClass']=function(_0x42db90,_0x2e1f7e){const _0x4bd457=_0x3beee9;$gameTemp[_0x4bd457(0x2dc)]=!![],VisuMZ[_0x4bd457(0x186)][_0x4bd457(0x7a0)][_0x4bd457(0x573)](this,_0x42db90,_0x2e1f7e),$gameTemp[_0x4bd457(0x2dc)]=undefined;},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x81e)]=Game_Actor[_0x3beee9(0x413)][_0x3beee9(0x3c0)],Game_Actor['prototype'][_0x3beee9(0x3c0)]=function(){const _0x27a032=_0x3beee9;VisuMZ[_0x27a032(0x186)][_0x27a032(0x81e)][_0x27a032(0x573)](this);if(!$gameTemp[_0x27a032(0x2dc)])this[_0x27a032(0x199)]();},Game_Actor[_0x3beee9(0x413)]['levelUpRecovery']=function(){const _0x52501a=_0x3beee9;this[_0x52501a(0x83b)]={};if(VisuMZ[_0x52501a(0x186)][_0x52501a(0x46c)][_0x52501a(0x72e)]['LevelUpFullHp'])this['_hp']=this[_0x52501a(0x6a6)];if(VisuMZ[_0x52501a(0x186)][_0x52501a(0x46c)][_0x52501a(0x72e)][_0x52501a(0x755)])this['_mp']=this[_0x52501a(0x6c7)];},Game_Actor['prototype'][_0x3beee9(0x3b6)]=function(){const _0x6d0102=_0x3beee9;if(this[_0x6d0102(0x45e)]())return 0x1;const _0x381db0=this['nextLevelExp']()-this[_0x6d0102(0x3f3)](),_0x3783d5=this[_0x6d0102(0x7ac)]()-this[_0x6d0102(0x3f3)]();return(_0x3783d5/_0x381db0)['clamp'](0x0,0x1);},Game_Actor[_0x3beee9(0x413)][_0x3beee9(0x5dc)]=function(){const _0x2b8d27=_0x3beee9,_0x2364e0=Game_Battler[_0x2b8d27(0x413)]['traitObjects'][_0x2b8d27(0x573)](this);for(const _0x5a8280 of this[_0x2b8d27(0x447)]()){_0x5a8280&&_0x2364e0[_0x2b8d27(0x188)](_0x5a8280);}return _0x2364e0[_0x2b8d27(0x188)](this[_0x2b8d27(0x717)](),this['actor']()),_0x2364e0;},Object['defineProperty'](Game_Enemy[_0x3beee9(0x413)],'level',{'get':function(){const _0x2453ce=_0x3beee9;return this[_0x2453ce(0x3b4)]();},'configurable':!![]}),Game_Enemy[_0x3beee9(0x413)]['getLevel']=function(){const _0x51243f=_0x3beee9;return this[_0x51243f(0x398)]()[_0x51243f(0x245)];},Game_Enemy['prototype'][_0x3beee9(0x4ac)]=function(){const _0x182c66=_0x3beee9;!this[_0x182c66(0x5e5)]&&(this[_0x182c66(0x474)]+=Math[_0x182c66(0x368)]((Graphics['height']-0x270)/0x2),this[_0x182c66(0x474)]-=Math[_0x182c66(0x171)]((Graphics['height']-Graphics['boxHeight'])/0x2),$gameSystem['isSideView']()?this[_0x182c66(0x125)]-=Math[_0x182c66(0x171)]((Graphics['width']-Graphics[_0x182c66(0x436)])/0x2):this[_0x182c66(0x125)]+=Math[_0x182c66(0x368)]((Graphics[_0x182c66(0x436)]-0x330)/0x2)),this['_repositioned']=!![];},Game_Party['prototype'][_0x3beee9(0x2b5)]=function(){const _0x2df5d1=_0x3beee9;return VisuMZ[_0x2df5d1(0x186)][_0x2df5d1(0x46c)][_0x2df5d1(0x544)][_0x2df5d1(0x82b)];},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x20b)]=Game_Party[_0x3beee9(0x413)][_0x3beee9(0x4eb)],Game_Party[_0x3beee9(0x413)][_0x3beee9(0x4eb)]=function(_0x4b7f94){const _0x16b7f8=_0x3beee9;if(VisuMZ[_0x16b7f8(0x186)]['Settings'][_0x16b7f8(0x72e)][_0x16b7f8(0x1f5)]&&DataManager[_0x16b7f8(0xf7)](_0x4b7f94))return;VisuMZ['CoreEngine']['Game_Party_consumeItem'][_0x16b7f8(0x573)](this,_0x4b7f94);},Game_Party[_0x3beee9(0x413)][_0x3beee9(0x3eb)]=function(){const _0x3f497b=_0x3beee9,_0x5b0dec=VisuMZ[_0x3f497b(0x186)]['Settings'][_0x3f497b(0x72e)],_0x542c48=_0x5b0dec[_0x3f497b(0x656)]??0x63;let _0x19a5e6=[];(_0x5b0dec[_0x3f497b(0x2e5)]??!![])&&(_0x19a5e6=_0x19a5e6[_0x3f497b(0x70d)]($dataItems));(_0x5b0dec[_0x3f497b(0x527)]??!![])&&(_0x19a5e6=_0x19a5e6[_0x3f497b(0x70d)]($dataWeapons));(_0x5b0dec[_0x3f497b(0x475)]??!![])&&(_0x19a5e6=_0x19a5e6['concat']($dataArmors));for(const _0x28ff7f of _0x19a5e6){if(!_0x28ff7f)continue;if(_0x28ff7f[_0x3f497b(0x148)]['trim']()<=0x0)continue;if(_0x28ff7f[_0x3f497b(0x148)][_0x3f497b(0x56a)](/-----/i))continue;this[_0x3f497b(0x44a)](_0x28ff7f,_0x542c48);}},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x5bd)]=Game_Troop[_0x3beee9(0x413)][_0x3beee9(0x53b)],Game_Troop['prototype'][_0x3beee9(0x53b)]=function(_0x5067b9){const _0x432e8d=_0x3beee9;$gameTemp[_0x432e8d(0x202)](),$gameTemp[_0x432e8d(0x28b)](_0x5067b9),VisuMZ['CoreEngine'][_0x432e8d(0x5bd)][_0x432e8d(0x573)](this,_0x5067b9);},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x57b)]=Game_Map['prototype']['setup'],Game_Map['prototype']['setup']=function(_0x50b476){const _0x4c0442=_0x3beee9;VisuMZ['CoreEngine'][_0x4c0442(0x57b)][_0x4c0442(0x573)](this,_0x50b476),this[_0x4c0442(0x2a7)](),this[_0x4c0442(0x865)](_0x50b476),this[_0x4c0442(0x272)]();},Game_Map[_0x3beee9(0x413)]['setupCoreEngine']=function(){const _0x3b04bc=_0x3beee9;this[_0x3b04bc(0x498)]=VisuMZ[_0x3b04bc(0x186)]['Settings'][_0x3b04bc(0x72e)][_0x3b04bc(0x3f0)]||![];const _0x31355a=VisuMZ[_0x3b04bc(0x186)][_0x3b04bc(0x46c)][_0x3b04bc(0x4c2)],_0x55fd78=$dataMap?$dataMap[_0x3b04bc(0x7ee)]||'':'';if(_0x55fd78[_0x3b04bc(0x56a)](/<SHOW TILE SHADOWS>/i))this[_0x3b04bc(0x498)]=![];else _0x55fd78[_0x3b04bc(0x56a)](/<HIDE TILE SHADOWS>/i)&&(this[_0x3b04bc(0x498)]=!![]);if(_0x55fd78[_0x3b04bc(0x56a)](/<SCROLL LOCK X>/i))this[_0x3b04bc(0x3fb)]()['centerX']=!![],this[_0x3b04bc(0x3fb)]()[_0x3b04bc(0xa5)]=_0x31355a[_0x3b04bc(0x2b0)];else _0x55fd78['match'](/<SCROLL LOCK X: (.*?)>/i)&&(this[_0x3b04bc(0x3fb)]()[_0x3b04bc(0x1ca)]=!![],this[_0x3b04bc(0x3fb)]()[_0x3b04bc(0xa5)]=Number(RegExp['$1']));if(_0x55fd78[_0x3b04bc(0x56a)](/<SCROLL LOCK Y>/i))this[_0x3b04bc(0x3fb)]()['centerY']=!![],this['centerCameraCheckData']()[_0x3b04bc(0x473)]=_0x31355a[_0x3b04bc(0x669)];else _0x55fd78['match'](/<SCROLL LOCK Y: (.*?)>/i)&&(this[_0x3b04bc(0x3fb)]()[_0x3b04bc(0x496)]=!![],this['centerCameraCheckData']()[_0x3b04bc(0x473)]=Number(RegExp['$1']));},Game_Map[_0x3beee9(0x413)][_0x3beee9(0x3fe)]=function(){const _0x2ff207=_0x3beee9;if(this[_0x2ff207(0x498)]===undefined)this[_0x2ff207(0x865)]();return this['_hideTileShadows'];},Game_Map[_0x3beee9(0x413)][_0x3beee9(0x2a7)]=function(){const _0x33a388=_0x3beee9,_0x58d499=VisuMZ[_0x33a388(0x186)][_0x33a388(0x46c)]['ScreenResolution'];this[_0x33a388(0x403)]={'centerX':![],'centerY':![],'displayX':0x0,'displayY':0x0};if(_0x58d499[_0x33a388(0x758)]){const _0x1da343=Graphics[_0x33a388(0x227)]/this['tileWidth']();_0x1da343%0x1!==0x0&&Math[_0x33a388(0x139)](_0x1da343)===this[_0x33a388(0x227)]()&&!this[_0x33a388(0x1c9)]()&&(this[_0x33a388(0x403)][_0x33a388(0x1ca)]=!![],this[_0x33a388(0x403)][_0x33a388(0xa5)]=_0x58d499[_0x33a388(0x2b0)]||0x0);}if(_0x58d499[_0x33a388(0x3d0)]){const _0x10cfd1=Graphics[_0x33a388(0x428)]/this[_0x33a388(0x868)]();_0x10cfd1%0x1!==0x0&&Math['ceil'](_0x10cfd1)===this[_0x33a388(0x428)]()&&!this['isLoopVertical']()&&(this[_0x33a388(0x403)][_0x33a388(0x496)]=!![],this[_0x33a388(0x403)][_0x33a388(0x473)]=_0x58d499[_0x33a388(0x669)]||0x0);}$gameScreen['zoomScale']()===0x1&&(this[_0x33a388(0x3fb)]()['centerX']&&(this['_displayX']=this[_0x33a388(0x3fb)]()[_0x33a388(0xa5)]),this[_0x33a388(0x3fb)]()['centerY']&&(this['_displayY']=this[_0x33a388(0x3fb)]()[_0x33a388(0x473)]));},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x5d3)]=Game_Map['prototype']['setDisplayPos'],Game_Map['prototype'][_0x3beee9(0xf8)]=function(_0x2342fb,_0x34ea79){const _0x40a6f1=_0x3beee9;VisuMZ[_0x40a6f1(0x186)]['Game_Map_setDisplayPos'][_0x40a6f1(0x573)](this,_0x2342fb,_0x34ea79),$gameScreen['zoomScale']()===0x1&&(!this[_0x40a6f1(0x1c9)]()&&this[_0x40a6f1(0x3fb)]()[_0x40a6f1(0x1ca)]&&(this[_0x40a6f1(0x26f)]=this[_0x40a6f1(0x3fb)]()[_0x40a6f1(0xa5)]),!this[_0x40a6f1(0x693)]()&&this[_0x40a6f1(0x3fb)]()[_0x40a6f1(0x496)]&&(this[_0x40a6f1(0x470)]=this[_0x40a6f1(0x3fb)]()[_0x40a6f1(0x473)]));},Game_Map[_0x3beee9(0x413)][_0x3beee9(0x3fb)]=function(){const _0x538ff0=_0x3beee9;if(this['_centerCameraCheck']===undefined)this[_0x538ff0(0x2a7)]();return this[_0x538ff0(0x403)];},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x1c7)]=Game_Map[_0x3beee9(0x413)]['scrollDown'],Game_Map['prototype'][_0x3beee9(0x82d)]=function(_0x157d29){const _0x4c611b=_0x3beee9;if(this[_0x4c611b(0x3fb)]()[_0x4c611b(0x496)]&&$gameScreen['zoomScale']()===0x1){this[_0x4c611b(0x470)]=this[_0x4c611b(0x3fb)]()[_0x4c611b(0x473)];return;}VisuMZ[_0x4c611b(0x186)]['Game_Map_scrollDown'][_0x4c611b(0x573)](this,_0x157d29);},VisuMZ['CoreEngine'][_0x3beee9(0x848)]=Game_Map[_0x3beee9(0x413)][_0x3beee9(0x66f)],Game_Map[_0x3beee9(0x413)][_0x3beee9(0x66f)]=function(_0x29b95c){const _0x45ae92=_0x3beee9;if(this[_0x45ae92(0x3fb)]()[_0x45ae92(0x1ca)]&&$gameScreen[_0x45ae92(0x46e)]()===0x1){this[_0x45ae92(0x26f)]=this[_0x45ae92(0x3fb)]()[_0x45ae92(0xa5)];return;}VisuMZ[_0x45ae92(0x186)][_0x45ae92(0x848)][_0x45ae92(0x573)](this,_0x29b95c);},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x26e)]=Game_Map['prototype'][_0x3beee9(0x4a3)],Game_Map[_0x3beee9(0x413)][_0x3beee9(0x4a3)]=function(_0x70618){const _0x52409e=_0x3beee9;if(this['centerCameraCheckData']()['centerX']&&$gameScreen[_0x52409e(0x46e)]()===0x1){this[_0x52409e(0x26f)]=this[_0x52409e(0x3fb)]()[_0x52409e(0xa5)];return;}VisuMZ[_0x52409e(0x186)][_0x52409e(0x26e)][_0x52409e(0x573)](this,_0x70618);},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x29d)]=Game_Map['prototype'][_0x3beee9(0x345)],Game_Map[_0x3beee9(0x413)][_0x3beee9(0x345)]=function(_0x4912b5){const _0x213610=_0x3beee9;if(this['centerCameraCheckData']()[_0x213610(0x496)]&&$gameScreen[_0x213610(0x46e)]()===0x1){this[_0x213610(0x470)]=this[_0x213610(0x3fb)]()[_0x213610(0x473)];return;}VisuMZ['CoreEngine'][_0x213610(0x29d)][_0x213610(0x573)](this,_0x4912b5);},Game_Map[_0x3beee9(0x413)][_0x3beee9(0x272)]=function(){const _0x1309e3=_0x3beee9;this[_0x1309e3(0x55b)]={};const _0x3006f1=this[_0x1309e3(0x5d4)]();if(!_0x3006f1)return{};const _0x34d74d=_0x3006f1['note']||'',_0x32f12e=/<(?:TALLER|EXT|EXTEND|RAISE)[ ]BY[ ](\d+):[ ](.*)>/gi;let _0x1f838f={};const _0x2e2542=_0x34d74d[_0x1309e3(0x56a)](_0x32f12e);if(_0x2e2542)for(const _0x593cd6 of _0x2e2542){_0x593cd6[_0x1309e3(0x56a)](_0x32f12e);const _0x3a12d6=Number(RegExp['$1'])[_0x1309e3(0x3fd)](0x1,0x10),_0x23ea6b=String(RegExp['$2'])['split'](',')[_0x1309e3(0x5c5)](_0x46d329=>Number(_0x46d329)['clamp'](0x1,0x7));for(const _0x1c1445 of _0x23ea6b){_0x1f838f[_0x1c1445]=_0x3a12d6;}}this[_0x1309e3(0x55b)]=_0x1f838f;},Game_Map['prototype'][_0x3beee9(0x2ef)]=function(){const _0x4bdb52=_0x3beee9;if(this['_tileExtendTerrainTags']===undefined)this[_0x4bdb52(0x272)]();return this['_tileExtendTerrainTags'];},Game_Map[_0x3beee9(0x413)]['isTileExtended']=function(_0x2a0afc){const _0x233a0d=_0x3beee9;if(_0x2a0afc>=0x400)return![];const _0x33e376=$gameMap[_0x233a0d(0x2ef)]();if(Object['keys'](_0x33e376)[_0x233a0d(0x228)]<=0x0)return![];const _0x11a1b1=this[_0x233a0d(0x73d)](),_0x50b80e=_0x11a1b1[_0x2a0afc]>>0xc,_0x904b13=_0x33e376[_0x50b80e]||0x0;return _0x904b13>0x0;},VisuMZ[_0x3beee9(0x186)]['Game_Map_changeTileset']=Game_Map[_0x3beee9(0x413)]['changeTileset'],Game_Map['prototype'][_0x3beee9(0x519)]=function(_0x4dbc65){const _0x78ed1b=_0x3beee9;VisuMZ['CoreEngine'][_0x78ed1b(0x9a)][_0x78ed1b(0x573)](this,_0x4dbc65),this[_0x78ed1b(0x6db)](),SceneManager[_0x78ed1b(0x854)][_0x78ed1b(0x687)]['update']();},Game_Map[_0x3beee9(0x413)]['refreshSpritesetForExtendedTiles']=function(){const _0x22d0a2=_0x3beee9,_0x477b05=this[_0x22d0a2(0x2ef)]();if(Object[_0x22d0a2(0x4dc)](_0x477b05)[_0x22d0a2(0x228)]<=0x0)return;const _0x57fd49=SceneManager[_0x22d0a2(0x854)][_0x22d0a2(0x687)];_0x57fd49&&(_0x57fd49['removeTileExtendSprites']&&_0x57fd49[_0x22d0a2(0x6f4)](),_0x57fd49[_0x22d0a2(0x25e)]&&_0x57fd49[_0x22d0a2(0x25e)]());},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x5b0)]=Game_Character[_0x3beee9(0x413)][_0x3beee9(0x6d1)],Game_Character[_0x3beee9(0x413)][_0x3beee9(0x6d1)]=function(_0x21fce9){const _0x222e8f=_0x3beee9;try{VisuMZ[_0x222e8f(0x186)]['Game_Character_processMoveCommand'][_0x222e8f(0x573)](this,_0x21fce9);}catch(_0x33d615){if($gameTemp[_0x222e8f(0x441)]())console[_0x222e8f(0x772)](_0x33d615);}},Game_Player[_0x3beee9(0x413)]['makeEncounterCount']=function(){const _0x49f828=_0x3beee9,_0x339623=$gameMap[_0x49f828(0x4a9)]();this[_0x49f828(0x6c0)]=Math['randomInt'](_0x339623)+Math[_0x49f828(0x4fe)](_0x339623)+this['encounterStepsMinimum']();},Game_Player['prototype'][_0x3beee9(0x1e0)]=function(){const _0x59ad64=_0x3beee9;return $dataMap&&$dataMap[_0x59ad64(0x7ee)]&&$dataMap[_0x59ad64(0x7ee)][_0x59ad64(0x56a)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ['CoreEngine'][_0x59ad64(0x46c)][_0x59ad64(0x72e)][_0x59ad64(0x24b)];},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x6b8)]=Game_Event[_0x3beee9(0x413)]['isCollidedWithEvents'],Game_Event[_0x3beee9(0x413)]['isCollidedWithEvents']=function(_0x1e3bfa,_0xfe6907){const _0x32f1cc=_0x3beee9;return this[_0x32f1cc(0x296)]()?this['checkSmartEventCollision'](_0x1e3bfa,_0xfe6907):VisuMZ[_0x32f1cc(0x186)][_0x32f1cc(0x6b8)]['call'](this,_0x1e3bfa,_0xfe6907);},Game_Event[_0x3beee9(0x413)][_0x3beee9(0x296)]=function(){const _0x3f9740=_0x3beee9;return VisuMZ[_0x3f9740(0x186)]['Settings'][_0x3f9740(0x72e)]['SmartEventCollisionPriority'];},Game_Event[_0x3beee9(0x413)]['checkSmartEventCollision']=function(_0x3be71b,_0x35a132){const _0x1186c5=_0x3beee9;if(!this[_0x1186c5(0x3ca)]())return![];else{const _0x3190f3=$gameMap[_0x1186c5(0x1f1)](_0x3be71b,_0x35a132)['filter'](_0x18bb5e=>_0x18bb5e[_0x1186c5(0x3ca)]());return _0x3190f3[_0x1186c5(0x228)]>0x0;}},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x251)]=Game_Interpreter[_0x3beee9(0x413)]['command105'],Game_Interpreter[_0x3beee9(0x413)]['command105']=function(_0x5a3e1b){const _0x1b9f69=_0x3beee9,_0x9ebc44=this[_0x1b9f69(0x7db)]();return _0x9ebc44['match'](/\/\/[ ]SCRIPT[ ]CALL/i)?this['runCombinedScrollingTextAsCode'](_0x9ebc44):VisuMZ['CoreEngine'][_0x1b9f69(0x251)][_0x1b9f69(0x573)](this,_0x5a3e1b);},Game_Interpreter['prototype']['getCombinedScrollingText']=function(){const _0x13fd09=_0x3beee9;let _0x374c7b='',_0x53b20f=this['_index']+0x1;while(this['_list'][_0x53b20f]&&this[_0x13fd09(0x342)][_0x53b20f]['code']===0x195){_0x374c7b+=this[_0x13fd09(0x342)][_0x53b20f][_0x13fd09(0x5fd)][0x0]+'\x0a',_0x53b20f++;}return _0x374c7b;},Game_Interpreter['prototype'][_0x3beee9(0x58f)]=function(_0x39cd8b){const _0x5df768=_0x3beee9;try{eval(_0x39cd8b);}catch(_0x2f541e){$gameTemp[_0x5df768(0x441)]()&&(console[_0x5df768(0x772)](_0x5df768(0x29a)),console[_0x5df768(0x772)](_0x2f541e));}return!![];},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x6eb)]=Game_Interpreter[_0x3beee9(0x413)][_0x3beee9(0x684)],Game_Interpreter[_0x3beee9(0x413)][_0x3beee9(0x684)]=function(_0x34e538){const _0x881887=_0x3beee9;try{VisuMZ[_0x881887(0x186)]['Game_Interpreter_command111']['call'](this,_0x34e538);}catch(_0x2298ac){$gameTemp[_0x881887(0x441)]()&&(console['log']('Conditional\x20Branch\x20Script\x20Error'),console['log'](_0x2298ac)),this[_0x881887(0x36d)]();}return!![];},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x4bb)]=Game_Interpreter[_0x3beee9(0x413)][_0x3beee9(0x51e)],Game_Interpreter[_0x3beee9(0x413)][_0x3beee9(0x51e)]=function(_0x52d3d9){const _0x3f53a7=_0x3beee9;try{VisuMZ[_0x3f53a7(0x186)]['Game_Interpreter_command122'][_0x3f53a7(0x573)](this,_0x52d3d9);}catch(_0x3f471b){$gameTemp[_0x3f53a7(0x441)]()&&(console[_0x3f53a7(0x772)](_0x3f53a7(0x67a)),console[_0x3f53a7(0x772)](_0x3f471b));}return!![];},VisuMZ[_0x3beee9(0x186)]['Game_Interpreter_command355']=Game_Interpreter['prototype'][_0x3beee9(0x51c)],Game_Interpreter['prototype'][_0x3beee9(0x51c)]=function(){const _0x34c941=_0x3beee9;try{VisuMZ[_0x34c941(0x186)][_0x34c941(0x2b2)][_0x34c941(0x573)](this);}catch(_0x1daffa){$gameTemp[_0x34c941(0x441)]()&&(console[_0x34c941(0x772)](_0x34c941(0x1c6)),console[_0x34c941(0x772)](_0x1daffa));}return!![];},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x481)]=Game_Interpreter[_0x3beee9(0x413)][_0x3beee9(0x10f)],Game_Interpreter[_0x3beee9(0x413)][_0x3beee9(0x10f)]=function(_0x174df4){const _0x31517b=_0x3beee9;return $gameTemp[_0x31517b(0x9f)](this),VisuMZ['CoreEngine'][_0x31517b(0x481)]['call'](this,_0x174df4);},Scene_Base['prototype'][_0x3beee9(0x788)]=function(){const _0x364f99=_0x3beee9;return VisuMZ['CoreEngine'][_0x364f99(0x46c)]['UI']['FadeSpeed'];},Scene_Base['prototype']['isBottomHelpMode']=function(){const _0x58b63d=_0x3beee9;return VisuMZ['CoreEngine'][_0x58b63d(0x46c)]['UI'][_0x58b63d(0x5d8)];},Scene_Base['prototype'][_0x3beee9(0x198)]=function(){const _0xe59dec=_0x3beee9;return VisuMZ[_0xe59dec(0x186)][_0xe59dec(0x46c)]['UI']['BottomButtons'];},Scene_Base[_0x3beee9(0x413)][_0x3beee9(0x383)]=function(){const _0x31002a=_0x3beee9;return VisuMZ[_0x31002a(0x186)][_0x31002a(0x46c)]['UI'][_0x31002a(0x8c)];},Scene_Base['prototype']['mainCommandWidth']=function(){const _0xc2cc5=_0x3beee9;return VisuMZ['CoreEngine'][_0xc2cc5(0x46c)]['UI']['CommandWidth'];},Scene_Base[_0x3beee9(0x413)][_0x3beee9(0x4f2)]=function(){const _0x2fd9f9=_0x3beee9;return VisuMZ[_0x2fd9f9(0x186)]['Settings']['UI'][_0x2fd9f9(0x332)];},Scene_Base[_0x3beee9(0x413)]['isWindowMaskingEnabled']=function(){const _0x594022=_0x3beee9;return VisuMZ[_0x594022(0x186)][_0x594022(0x46c)][_0x594022(0x1e8)][_0x594022(0x31c)];},VisuMZ[_0x3beee9(0x186)]['Scene_Base_createWindowLayer']=Scene_Base[_0x3beee9(0x413)][_0x3beee9(0x7de)],Scene_Base['prototype'][_0x3beee9(0x7de)]=function(){const _0x5b5dc6=_0x3beee9;VisuMZ[_0x5b5dc6(0x186)]['Scene_Base_createWindowLayer'][_0x5b5dc6(0x573)](this),this[_0x5b5dc6(0x122)](),this['createTextPopupWindow'](),this[_0x5b5dc6(0x136)]['x']=Math[_0x5b5dc6(0x368)](this[_0x5b5dc6(0x136)]['x']),this[_0x5b5dc6(0x136)]['y']=Math[_0x5b5dc6(0x368)](this['_windowLayer']['y']);},Scene_Base['prototype'][_0x3beee9(0x122)]=function(){},Scene_Base[_0x3beee9(0x413)][_0x3beee9(0x374)]=function(){const _0x20e7c1=_0x3beee9;this[_0x20e7c1(0x44c)]=new Window_TextPopup(),this[_0x20e7c1(0x343)](this[_0x20e7c1(0x44c)]);},$textPopup=function(_0x4a192e){const _0x159e03=_0x3beee9,_0x2276d1=SceneManager[_0x159e03(0x854)][_0x159e03(0x44c)];_0x2276d1&&_0x2276d1[_0x159e03(0x61a)](_0x4a192e);},Scene_Base[_0x3beee9(0x413)][_0x3beee9(0x79f)]=function(){const _0x264929=_0x3beee9;return TextManager['getInputMultiButtonStrings']('pageup',_0x264929(0x1e2));},Scene_Base[_0x3beee9(0x413)][_0x3beee9(0x115)]=function(){const _0x295fb1=_0x3beee9;return TextManager[_0x295fb1(0x1dd)]('tab');},Scene_Base[_0x3beee9(0x413)][_0x3beee9(0x3f2)]=function(){const _0x381640=_0x3beee9;return TextManager[_0x381640(0x1dd)]('shift');},Scene_Base['prototype'][_0x3beee9(0x4cd)]=function(){return TextManager['getInputButtonString']('ok');},Scene_Base[_0x3beee9(0x413)][_0x3beee9(0x19b)]=function(){const _0x1360b0=_0x3beee9;return TextManager[_0x1360b0(0x1dd)]('cancel');},Scene_Base[_0x3beee9(0x413)][_0x3beee9(0x138)]=function(){const _0x427583=_0x3beee9;return this['_pageupButton']&&this[_0x427583(0x417)]['visible']?TextManager[_0x427583(0x7e7)]:'';},Scene_Base[_0x3beee9(0x413)][_0x3beee9(0x70c)]=function(){return'';},Scene_Base[_0x3beee9(0x413)][_0x3beee9(0x271)]=function(){return'';},Scene_Base[_0x3beee9(0x413)]['buttonAssistText4']=function(){const _0x11dc1b=_0x3beee9;return TextManager[_0x11dc1b(0x7e1)];},Scene_Base[_0x3beee9(0x413)]['buttonAssistText5']=function(){return TextManager['buttonAssistCancel'];},Scene_Base['prototype']['buttonAssistOffset1']=function(){return 0x0;},Scene_Base[_0x3beee9(0x413)]['buttonAssistOffset2']=function(){return 0x0;},Scene_Base[_0x3beee9(0x413)]['buttonAssistOffset3']=function(){return 0x0;},Scene_Base[_0x3beee9(0x413)][_0x3beee9(0x683)]=function(){return 0x0;},Scene_Base['prototype'][_0x3beee9(0x1a5)]=function(){return 0x0;},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x17d)]=Scene_Boot[_0x3beee9(0x413)][_0x3beee9(0x41b)],Scene_Boot['prototype'][_0x3beee9(0x41b)]=function(){const _0x49c5e6=_0x3beee9;VisuMZ[_0x49c5e6(0x186)][_0x49c5e6(0x17d)][_0x49c5e6(0x573)](this),this[_0x49c5e6(0xb6)]();},Scene_Boot['prototype']['loadGameImagesCoreEngine']=function(){const _0xef26c2=_0x3beee9,_0x31b449=['animations',_0xef26c2(0x4dd),'battlebacks2','characters',_0xef26c2(0x2fe),_0xef26c2(0x5da),_0xef26c2(0x440),_0xef26c2(0x596),_0xef26c2(0x3cc),_0xef26c2(0x68a),_0xef26c2(0xa0),_0xef26c2(0xf3),_0xef26c2(0x640),_0xef26c2(0x7e4)];for(const _0x41678a of _0x31b449){const _0x2baf4a=VisuMZ[_0xef26c2(0x186)][_0xef26c2(0x46c)][_0xef26c2(0x547)][_0x41678a],_0x304706=_0xef26c2(0xdd)[_0xef26c2(0x48d)](_0x41678a);for(const _0xac0b59 of _0x2baf4a){ImageManager[_0xef26c2(0x41a)](_0x304706,_0xac0b59);}}},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x62b)]=Scene_Boot[_0x3beee9(0x413)]['startNormalGame'],Scene_Boot[_0x3beee9(0x413)][_0x3beee9(0x19c)]=function(){const _0x1210fe=_0x3beee9;Utils[_0x1210fe(0x46b)]('test')&&VisuMZ['CoreEngine'][_0x1210fe(0x46c)][_0x1210fe(0x72e)]['NewGameBoot']?this[_0x1210fe(0x631)]():VisuMZ[_0x1210fe(0x186)][_0x1210fe(0x62b)]['call'](this);},Scene_Boot[_0x3beee9(0x413)]['startAutoNewGame']=function(){const _0x3b0a55=_0x3beee9;this[_0x3b0a55(0x569)](),DataManager[_0x3b0a55(0x721)](),SceneManager[_0x3b0a55(0xba)](Scene_Map);},Scene_Boot[_0x3beee9(0x413)][_0x3beee9(0x863)]=function(){const _0x3a9c13=_0x3beee9,_0x5da513=$dataSystem[_0x3a9c13(0x6a3)][_0x3a9c13(0x77d)],_0x59f9b5=$dataSystem[_0x3a9c13(0x6a3)][_0x3a9c13(0x517)],_0x37ded5=VisuMZ['CoreEngine'][_0x3a9c13(0x46c)]['UI'][_0x3a9c13(0x574)];Graphics[_0x3a9c13(0x436)]=_0x5da513-_0x37ded5*0x2,Graphics[_0x3a9c13(0x6ec)]=_0x59f9b5-_0x37ded5*0x2,this[_0x3a9c13(0xb8)]();},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x847)]=Scene_Boot[_0x3beee9(0x413)]['updateDocumentTitle'],Scene_Boot['prototype'][_0x3beee9(0x73e)]=function(){const _0x54c867=_0x3beee9;this[_0x54c867(0x658)]()?this['makeDocumentTitle']():VisuMZ[_0x54c867(0x186)][_0x54c867(0x847)]['call'](this);},Scene_Boot[_0x3beee9(0x413)][_0x3beee9(0x658)]=function(){const _0x2682bd=_0x3beee9;if(Scene_Title[_0x2682bd(0x360)]==='')return![];if(Scene_Title['subtitle']===_0x2682bd(0x54b))return![];if(Scene_Title[_0x2682bd(0x6c2)]==='')return![];if(Scene_Title[_0x2682bd(0x6c2)]===_0x2682bd(0x154))return![];return!![];},Scene_Boot[_0x3beee9(0x413)]['makeDocumentTitle']=function(){const _0x1001fb=_0x3beee9,_0x294bf4=$dataSystem[_0x1001fb(0x5cb)],_0x56c169=Scene_Title['subtitle']||'',_0x3f193d=Scene_Title[_0x1001fb(0x6c2)]||'',_0x2edd86=VisuMZ[_0x1001fb(0x186)][_0x1001fb(0x46c)]['MenuLayout'][_0x1001fb(0xa6)][_0x1001fb(0x27b)],_0x57500b=_0x2edd86[_0x1001fb(0x48d)](_0x294bf4,_0x56c169,_0x3f193d);document[_0x1001fb(0x76b)]=_0x57500b;},Scene_Boot[_0x3beee9(0x413)][_0x3beee9(0xb8)]=function(){const _0x1d9b3a=_0x3beee9;if(VisuMZ['CoreEngine'][_0x1d9b3a(0x46c)]['UI'][_0x1d9b3a(0x4ea)]){const _0x5c9819=Graphics[_0x1d9b3a(0x227)]-Graphics[_0x1d9b3a(0x436)]-VisuMZ[_0x1d9b3a(0x186)]['Settings']['UI'][_0x1d9b3a(0x574)]*0x2,_0x1127ba=Sprite_Button[_0x1d9b3a(0x413)][_0x1d9b3a(0x565)]['call'](this)*0x4;if(_0x5c9819>=_0x1127ba)SceneManager[_0x1d9b3a(0x3d9)](!![]);}},Scene_Title[_0x3beee9(0x360)]=VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x46c)][_0x3beee9(0x7cf)][_0x3beee9(0xa6)]['Subtitle'],Scene_Title[_0x3beee9(0x6c2)]=VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x46c)]['MenuLayout']['Title'][_0x3beee9(0x12b)],Scene_Title[_0x3beee9(0x2b8)]=VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x46c)][_0x3beee9(0x5fc)],VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x1a3)]=Scene_Title[_0x3beee9(0x413)]['drawGameTitle'],Scene_Title[_0x3beee9(0x413)]['drawGameTitle']=function(){const _0x53d016=_0x3beee9;VisuMZ[_0x53d016(0x186)]['Settings']['MenuLayout'][_0x53d016(0xa6)]['drawGameTitle'][_0x53d016(0x573)](this);if(Scene_Title[_0x53d016(0x360)]!==''&&Scene_Title[_0x53d016(0x360)]!==_0x53d016(0x54b))this[_0x53d016(0x6fb)]();if(Scene_Title[_0x53d016(0x6c2)]!==''&&Scene_Title['version']!==_0x53d016(0x154))this[_0x53d016(0xc3)]();},Scene_Title[_0x3beee9(0x413)][_0x3beee9(0x6fb)]=function(){const _0x5221e8=_0x3beee9;VisuMZ[_0x5221e8(0x186)][_0x5221e8(0x46c)][_0x5221e8(0x7cf)][_0x5221e8(0xa6)]['drawGameSubtitle']['call'](this);},Scene_Title['prototype'][_0x3beee9(0xc3)]=function(){const _0x1c52df=_0x3beee9;VisuMZ[_0x1c52df(0x186)]['Settings']['MenuLayout']['Title'][_0x1c52df(0xc3)][_0x1c52df(0x573)](this);},Scene_Title[_0x3beee9(0x413)]['createCommandWindow']=function(){const _0x484af1=_0x3beee9;this['createTitleButtons']();const _0x3538eb=$dataSystem[_0x484af1(0x71e)]['background'],_0x15a15c=this[_0x484af1(0x282)]();this[_0x484af1(0x47a)]=new Window_TitleCommand(_0x15a15c),this[_0x484af1(0x47a)][_0x484af1(0x86c)](_0x3538eb);const _0x18d0a3=this[_0x484af1(0x282)]();this[_0x484af1(0x47a)][_0x484af1(0x22d)](_0x18d0a3['x'],_0x18d0a3['y'],_0x18d0a3[_0x484af1(0x227)],_0x18d0a3[_0x484af1(0x428)]),this[_0x484af1(0x47a)]['createContents'](),this[_0x484af1(0x47a)][_0x484af1(0x74e)](),this[_0x484af1(0x47a)][_0x484af1(0x1c0)](),this['addWindow'](this[_0x484af1(0x47a)]);},Scene_Title[_0x3beee9(0x413)]['commandWindowRows']=function(){const _0x417116=_0x3beee9;return this[_0x417116(0x47a)]?this[_0x417116(0x47a)]['maxItems']():VisuMZ[_0x417116(0x186)][_0x417116(0x46c)][_0x417116(0x1e4)][_0x417116(0x228)];},Scene_Title[_0x3beee9(0x413)][_0x3beee9(0x282)]=function(){const _0x5cdd0b=_0x3beee9;return VisuMZ[_0x5cdd0b(0x186)][_0x5cdd0b(0x46c)][_0x5cdd0b(0x7cf)][_0x5cdd0b(0xa6)]['CommandRect'][_0x5cdd0b(0x573)](this);},Scene_Title[_0x3beee9(0x413)][_0x3beee9(0x7a2)]=function(){const _0x57dc82=_0x3beee9;for(const _0x12dbab of Scene_Title[_0x57dc82(0x2b8)]){const _0x1137a6=new Sprite_TitlePictureButton(_0x12dbab);this[_0x57dc82(0x343)](_0x1137a6);}},VisuMZ[_0x3beee9(0x186)]['Scene_Map_initialize']=Scene_Map['prototype'][_0x3beee9(0x59a)],Scene_Map[_0x3beee9(0x413)][_0x3beee9(0x59a)]=function(){const _0x44ee09=_0x3beee9;VisuMZ['CoreEngine'][_0x44ee09(0x748)][_0x44ee09(0x573)](this),$gameTemp['clearForcedGameTroopSettingsCoreEngine'](),this[_0x44ee09(0x29c)]();},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x628)]=Scene_Map[_0x3beee9(0x413)][_0x3beee9(0x80b)],Scene_Map['prototype'][_0x3beee9(0x80b)]=function(){const _0x3e23b7=_0x3beee9;VisuMZ[_0x3e23b7(0x186)][_0x3e23b7(0x628)][_0x3e23b7(0x573)](this),$gameTemp[_0x3e23b7(0x520)]&&!$gameMessage[_0x3e23b7(0x391)]()&&(this[_0x3e23b7(0x697)](),SceneManager[_0x3e23b7(0x34e)]());},Scene_Map[_0x3beee9(0x413)][_0x3beee9(0x372)]=function(){const _0x252f86=_0x3beee9;Scene_Message[_0x252f86(0x413)][_0x252f86(0x372)][_0x252f86(0x573)](this),!SceneManager['isNextScene'](Scene_Battle)&&(this[_0x252f86(0x687)]['update'](),this['_mapNameWindow'][_0x252f86(0x85e)](),this['_windowLayer'][_0x252f86(0x1a1)]=![],SceneManager[_0x252f86(0x86f)]()),$gameScreen['clearZoom'](),this['clearOnceParallelInterpreters']();},VisuMZ['CoreEngine']['Scene_Map_createMenuButton']=Scene_Map[_0x3beee9(0x413)][_0x3beee9(0xbd)],Scene_Map[_0x3beee9(0x413)][_0x3beee9(0xbd)]=function(){const _0x5865c2=_0x3beee9;VisuMZ[_0x5865c2(0x186)]['Scene_Map_createMenuButton'][_0x5865c2(0x573)](this),SceneManager['isSideButtonLayout']()&&this[_0x5865c2(0x4d1)]();},Scene_Map[_0x3beee9(0x413)][_0x3beee9(0x4d1)]=function(){const _0x42314a=_0x3beee9;this[_0x42314a(0x4b3)]['x']=Graphics['boxWidth']+0x4;},VisuMZ['CoreEngine'][_0x3beee9(0x105)]=Scene_Map[_0x3beee9(0x413)]['updateScene'],Scene_Map['prototype'][_0x3beee9(0x2c4)]=function(){const _0x191fdc=_0x3beee9;VisuMZ[_0x191fdc(0x186)][_0x191fdc(0x105)]['call'](this),this[_0x191fdc(0x41d)]();},Scene_Map['prototype']['updateDashToggle']=function(){const _0x1bff90=_0x3beee9;Input[_0x1bff90(0x6ba)]('dashToggle')&&(ConfigManager[_0x1bff90(0x91)]=!ConfigManager[_0x1bff90(0x91)],ConfigManager['save']());},VisuMZ['CoreEngine'][_0x3beee9(0x13d)]=Scene_Map['prototype'][_0x3beee9(0x697)],Scene_Map[_0x3beee9(0x413)][_0x3beee9(0x697)]=function(){const _0x59c8dc=_0x3beee9;VisuMZ[_0x59c8dc(0x186)][_0x59c8dc(0x13d)][_0x59c8dc(0x573)](this),this[_0x59c8dc(0x6ce)]();},Scene_Map[_0x3beee9(0x413)]['clearOnceParallelInterpreters']=function(){const _0x167fc9=_0x3beee9;this[_0x167fc9(0x54a)]=[];},Scene_Map[_0x3beee9(0x413)][_0x3beee9(0x6ce)]=function(){const _0x203053=_0x3beee9;if(!this['_onceParallelInterpreters'])return;for(const _0x183a33 of this[_0x203053(0x54a)]){_0x183a33&&_0x183a33[_0x203053(0x682)]();}},Scene_Map[_0x3beee9(0x413)][_0x3beee9(0x2e2)]=function(_0x490a94,_0x58f759){const _0x271eb8=_0x3beee9,_0x51d0e5=$dataCommonEvents[_0x490a94];if(!_0x51d0e5)return;const _0x309849=new Game_OnceParallelInterpreter();this['addOnceParallelInterpreter'](_0x309849),_0x309849['setCommonEvent'](_0x490a94),_0x309849[_0x271eb8(0x591)](_0x58f759);},Scene_Map[_0x3beee9(0x413)]['addOnceParallelInterpreter']=function(_0x37b368){const _0x27e35b=_0x3beee9;this[_0x27e35b(0x54a)]=this['_onceParallelInterpreters']||[],this[_0x27e35b(0x54a)][_0x27e35b(0x188)](_0x37b368);},Scene_Map['prototype'][_0x3beee9(0x6be)]=function(_0x4a7971){const _0x6075f7=_0x3beee9;this[_0x6075f7(0x54a)]=this['_onceParallelInterpreters']||[],this[_0x6075f7(0x54a)][_0x6075f7(0x3c6)](_0x4a7971);};function _0x18bf(){const _0x333445=['isMapScrollLinked','filterArea','EquipMenu','LevelUpFullMp','Bitmap_resize','createEnemies','AutoScrollLockX','Sprite_AnimationMV_updatePosition','keyMapper','COLON','create','Window_NameInput_processHandling','_shakeSpeed','updateOpacity','_originalViewport','Scene_Battle_createSpriteset_detach','easingType','drawIcon','INBACK','processSoundTimings','setCoreEngineUpdateWindowBg','horizontal','itemLineRect','SParamVocab6','itemWindowRect','title','checkCacheKey','AllMaps','1098ODnvFs','_pagedownButton','useFontWidthFix','repositionCancelButtonSideButtonLayout','log','_categoryWindow','_active','_effectsContainer','createCommandWindow','_storedMapText','PositionY','QwertyLayout','_isWindow','performMiss','OutlineColor','uiAreaWidth','scrollY','ItemRect','_hideButtons','setCoreEngineScreenShakeStyle','ParseClassNotetags','ConvertParams','isInstanceOfSceneMap','targetSpritePosition','INSERT','IconSet','fadeSpeed','enableDigitGroupingEx','PLAY','2866632cGsgHC','setViewportCoreEngineFix','loading','processFauxAnimationRequests','mpCostColor','add','Game_Action_itemEva','_tileSprite','WIN_OEM_PA3','calcEasing','framesMin','_slotWindow','ASTERISK','createSubSprite','isSceneMap','TextManager_param','setActorHome','DamageColor','GroupDigits','CNT','buttonAssistKey1','Game_Actor_changeClass','updateBattleVariables','createTitleButtons','EXR','optSideView','SwitchRandomizeRange','paramBaseAboveLevel99','showIncompleteTilesetError','addLoadListener','animationShouldMirror','Sprite_Picture_updateOrigin','OPEN_CURLY_BRACKET','currentExp','redraw','canUse','onEscapeSuccess','platform','VisuMZ_1_OptionsCore','onKeyDownKeysF6F7','sqrt','INCUBIC','StartID','ExportString','MenuBg','buttonAssistKey%1','MDF','drawActorIcons','PA1','contentsOpacity','transform','evaded','MCR','createPointAnimationSprite','ExportStrFromAllMaps','colSpacing','eva','loadWindowskin','updatePositionCoreEngineShakeVert','drawActorNickname','PGDN','SParameterFormula','Scene_Shop_create','allTiles','offset','buttons','font-smooth','stretch','MenuLayout','targetEvaRate','helpAreaHeight','makeTargetSprites','normalColor','isSideButtonLayout','OUTQUAD','_destroyInternalTextures','BackOpacity','Window_NameInput_cursorRight','ZOOM','exit','getCombinedScrollingText','ShowDevTools','Manual','createWindowLayer','processTimingData','SEMICOLON','buttonAssistOk','responseText','setMainFontSize','titles2','Bitmap_fillRect','HELP','buttonAssistSwitch','〘Common\x20Event\x20%1:\x20%2〙\x20Start','\x0a\x0a\x0a\x0a\x0a','paramchangeTextColor','valueOutlineColor','printError','STENCIL_BUFFER_BIT','note','gaugeRate','checkPassage','initBasic','Window_NameInput_refresh','resize','tpCostColor','_rate','SceneManager_exit','Window_Base_createContents','isInputting','needsUpdate','ColorTPGauge1','processPointAnimationRequests','sparamRate2','filter','sparam','createKeyJS','updateAnglePlus','textSizeEx','isNumpadPressed','updateCurrentEvent','IconXParam3','_dummyWindow','Window_TitleCommand_selectLast','CRSEL','StatusMenu','_forcedBattleGridSystem','Window_Base_createTextState','updateMainMultiply','ColorHPGauge1','mainAreaHeight','setMute','mapId','ColorMPGauge2','inBattle','EREOF','Scene_MenuBase_createBackground','_eventId','_buttonType','1.3.0','initCoreEasing','ParamChange','_onKeyPress','F6key','ActorTPColor','Spriteset_Base_initialize','endAnimation','Game_Actor_levelUp','process_VisuMZ_CoreEngine_CustomParameters','includes','VIEWPORT','_closing','xparamFlatJS','none','_currentMap','goldWindowRect','_stored_crisisColor','Scene_Map_update','drawGauge','XParamVocab1','GoldMax','mainAreaBottom','scrollDown','xparam','IconXParam4','F12','coreEngineRepositionEnemies','setSkill','children','Sprite_AnimationMV_processTimingData','Game_Picture_updateMove','createTroopNote','Bitmap_drawText','rightArrowWidth','down2','_bgsBuffer','_cache','drawNewParam','Window_NameInput_cursorPageup','Click\x20\x22Copy\x20Page\x22\x20from\x20another\x20tileset\x27s\x20pages','LEFT','StatusParamsBgType','OPEN_BRACKET','MAX_GL_TEXTURES','ImprovedAccuracySystem','home','actorWindowRect','getKeyboardInputButtonString','Scene_Boot_updateDocumentTitle','Game_Map_scrollLeft','string','skillId','isTpb','Untitled','_loadingState','XParamVocab9','LoadMenu','font','enter','_logWindow','bitmapWidth','_scene','Window_Base_drawText','itemBackColor1','isActiveTpb','_onKeyDown','MRG','makeCoreEngineCommandList','substring','Window_Selectable_itemRect','Window_Selectable_cursorDown','hide','Window_StatusBase_drawActorLevel','usableSkills','DashToggleR','_mode','adjustBoxSize','URL','setupCoreEngine','\x5c}❪TAB❫\x5c{','pitch','tileHeight','description','ParseEnemyNotetags','processKeyboardHome','setBackgroundType','END','isNwjs','snapForBackground','updateShadow','RightMenus','startAnimation','CONVERT','drawParamText','Game_Actor_paramBase','alwaysDash','BACKSPACE','offColor','rowSpacing','Spriteset_Map_createTilemap','_shakeDuration','test','ButtonFadeSpeed','integer','Game_Map_changeTileset','#%1','isAnimationPlaying','SParamVocab8','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','setLastPluginCommandInterpreter','system','addWindow','_tile','createBackground','BlurStrength','displayX','Title','stypeId','processCursorMove','KEEP','Game_Picture_x','_downArrowSprite','hit','F20','updateOrigin','pos','adjustX','_destroyCanvas','addAnimationSpriteToContainer','Location','NUMPAD0','hideButtonFromView','loadGameImagesCoreEngine','ParseWeaponNotetags','determineSideButtonLayoutValid','application/json','goto','Scene_Status_create','toLowerCase','createMenuButton','OpenSpeed','parseForcedGameTroopSettingsCoreEngine','setTargetAnchor','DigitGroupingStandardText','moveCancelButtonSideButtonLayout','drawGameVersion','ShortcutScripts','hpGaugeColor1','AnimationMirrorOffset','OUTQUINT','_CoreEngineSettings','_inputSpecialKeyCode','updateFrame','OptionsMenu','IconParam5','SCROLLBAR','itemSuccessRate','VisuMZ_3_EventChainReact','TextCodeClassNames','tileWidth','animationNextDelay','INOUTELASTIC','ParseArmorNotetags','initRotationCoreEngine','paramMax','_cacheScaleY','xScrollLinkedOffset','smallParamFontSize','TimeProgress','pressed','altKey','img/%1/','Game_Interpreter_updateWaitMode','join','makeActionList','playBuzzer','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','CANCEL','RepositionEnemies130','CommandRect','active','UNDERSCORE','NUMPAD5','Scene_Map_createSpritesetFix','button','%2%1%3','batch','Window_Base_initialize','PreserveNumbers','requiredWtypeId1','_scrollDuration','skillTypes','COMMA','tilesets','backspace','ATTN','_playtestF7Looping','isKeyItem','setDisplayPos','(\x5cd+)([%％])>','renderNoMask','TILDE','LUK','GoldFontSize','_anchor','adjustY','Actor-%1-%2','Sprite_Gauge_currentValue','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','vertJS','F7key','Scene_Map_updateScene','thickness','MRF','getBattleSystem','outlineColor','FTB','buttonAssistText%1','buttonAssistWindowSideRect','changeTextColor','ALWAYS','command357','horz','innerWidth','blendFunc','ARRAYJSON','_paramPlus','buttonAssistKey2','VisuMZ_2_BattleSystemOTB','targetY','INOUTSINE','Icon','wholeDuration','DigitGroupingExText','INOUTEXPO','PHA','Total','IconSParam6','WIN_OEM_CUSEL','Scene_MenuBase_createPageButtons','createButtonAssistWindow','Sprite_Gauge_gaugeRate','retrieveFauxAnimation','_screenX','Window_NameInput_cursorDown','PTB','gaugeBackColor','Input_shouldPreventDefault','VOLUME_DOWN','Version','setupCustomRateCoreEngine','setGuard','WIN_OEM_PA1','end','StateIconsNonFrame','loadPicture','isMagical','Scene_Item_create','Map%1.json','INELASTIC','_windowLayer','mpGaugeColor1','buttonAssistText1','ceil','NewGameCommonEventAll','F11','xparamPlus2','Scene_Map_updateMain','ONE','4LUYpvN','isCancelled','setAnchor','min','padding','maxVisibleItems','ProfileRect','_viewportSize','RepositionActors','name','updateLastTarget','isArrowPressed','_showDevTools','_lastScrollBarValues','_image','Game_Action_setAttack','_pictureContainer','framesPerChar','_bypassCanCounterCheck','sellWindowRect','scrollbarHeight','0.00','OffBarColor','fontSize','Bitmap_measureTextWidth','processBack','Window_MapName_refresh','DataManager_setupNewGame','Graphics_printError','createScrollBarSprites','buttonAssistCancel','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','createJsQuickFunction','maxCols','BgFilename1','EVAL','_pictureCoordinatesMode','Duration','IconParam1','ShiftT_Toggle','save','clear','Window_NameInput_processTouch','Input_clear','isHandled','playCursor','render','onNameOk','MIN_SAFE_INTEGER','buttonAssistOffset%1','floor','close','Window_Selectable_processTouch','isDying','Smooth','NON_FRAME','jsQuickFunc','volume','maxPictures','_forcedTroopView','cancel','IconSParam2','Scene_Boot_loadSystemImages','item','keyCode','battlebacks2','reserveNewGameCommonEvent','createPointAnimationQueue','FDR','getControllerInputButtonString','_profileWindow','CoreEngine','scaleSprite','push','setLastGamepadUsed','Window_Base_drawFace','BACK_SLASH','Window_NameInput_initialize','isClosing','enableDigitGrouping','createFauxAnimation','isEnabled','xparamFlatBonus','defineProperty','VisuMZ_2_BattleSystemSTB','_opening','getButtonAssistLocation','_tilemap','_isPlaytest','isBottomButtonMode','levelUpRecovery','updatePictureSettings','buttonAssistKey5','startNormalGame','getLastGamepadUsed','recoverAll','SwitchToggleOne','MvAnimationRate','visible','_stored_powerUpColor','Scene_Title_drawGameTitle','BattleManager_invokeCounterAttack','buttonAssistOffset5','Scene_Menu_create','JUNJA','Game_Temp_initialize','openness','Window_ShopSell_isEnabled','keys\x20for\x20both\x20\x22cancel\x22\x20and\x20\x22menu\x22!\x0a\x0a','ItemPadding','_refreshBack','ColorTPCost','areButtonsHidden','constructor','Sprite_Animation_processSoundTimings','151876fmpxda','ColorHPGauge2','WIN_ICO_HELP','processTouchModernControls','EXCLAMATION','【%1】\x0a','_setupEventHandlers','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','DOUBLE_QUOTE','_movementDuration','updateMove','Game_Screen_initialize','openingSpeed','isActor','selectLast','INSINE','_coreEasingType','_makeFontNameText','SceneManager_initialize','ExtractStrFromMap','Script\x20Call\x20Error','Game_Map_scrollDown','isPlaying','isLoopHorizontal','centerX','setAction','_muteSound','exportAllMapStrings','playLoad','NUMPAD3','ctrl','createSpriteset','SaveMenu','scale','top','SceneManager_onKeyDown','(\x5cd+\x5c.?\x5cd+)>','endBattlerActions','_movementWholeDuration','Sprite_StateIcon_updateFrame','escape','loadTitle2','process_VisuMZ_CoreEngine_ControllerButtons','getInputButtonString','F19','style','encounterStepsMinimum','setBattleSystem','pagedown','bgs','TitleCommandList','_isButtonHidden','xparamFlat1','setHome','Window','Window_Base_destroyContents','updatePictureAntiZoom','Troop%1','markCoreEngineModified','dimColor1','writeFile','WIN_OEM_PA2','createChildSprite','eventsXyNt','drawActorClass','initialLevel','ARRAYSTRUCT','KeyItemProtect','pendingColor','_cacheScaleX','DIVIDE','DEFAULT_SHIFT_Y','gradientFillRect','faceHeight','initialBattleSystem','updateMotion','optionsWindowRect','_clientArea','Scene_Base_terminate','translucentOpacity','clearForcedGameTroopSettingsCoreEngine','updatePictureCoordinates','createCustomBackgroundImages','AutoStretch','%1:\x20Exit\x20','LINEAR','_refreshArrows','CAPSLOCK','tilesetNames','Game_Party_consumeItem','RequireFocus','dropItems','You\x20do\x20not\x20have\x20a\x20custom\x20Input.keyMapper\x20with\x20\x22cancel\x22\x20and\x20\x22menu\x22\x20','_addSpotTile','TAB','initMembersCoreEngine','findSymbol','onXhrError','arePageButtonsEnabled','code','right','paramBase','performEscape','buttonAssistWindowRect','Layer','_targetY','_sideButtonLayout','_saveFileID','MapNameTextCode','itemEva','EnableNameInput','updateFrameCoreEngine','EXECUTE','SystemSetWindowPadding','_onLoad','param','mainAreaTopSideButtonLayout','width','length','createTextState','Basic','isMVAnimation','backgroundBitmap','move','isScrollBarVisible','members','buttonY','evaluate','resetTextColor','viewport','Param','select','_colorCache','STB','defaultInputMode','Plus','XParamVocab5','drawAllParams','HANJA','EndingID','Upper\x20Left','Type','Window_Selectable_cursorUp','INQUAD','isGameActive','ListRect','setActorHomeRepositioned','level','CRI','NUM','ActorMPColor','mev','drawValue','EncounterRateMinimum','SLASH','Actor','nickname','_goldWindow','createCustomParameter','Game_Interpreter_command105','bgmVolume','_allTextHeight','isForFriend','drawCircle','ZERO','DrawIcons','retrievePointAnimation','_shiftY','showFauxAnimations','updatePositionCoreEngineShakeRand','cursorRight','RevertPreserveNumbers','createTileExtendSprites','applyCoreEasing','_backSprite2','drawCharacter','DOLLAR','TRG','canAttack','Scene_Name_onInputOk','_targetOffsetX','_lastIconIndex','pow','setFrame','_opacity','quit','maxBattleMembers','smooth','Game_Map_scrollRight','_displayX','changeAnglePlusData','buttonAssistText3','setupTileExtendTerrainTags','Class-%1-%2','blt','_currentBgm','windowRect','paramPlusJS','playCancel','helpAreaTop','buttonAssistWindowButtonRect','DocumentTitleFmt','createPointAnimationTargets','_animation','Input_pollGamepads','MAXMP','paramRate','AudioChangeBgmPan','commandWindowRect','initMembers','smoothSelect','paramFlatBonus','getColor','INEXPO','getPointAnimationLayer','Sprite_Button_initialize','_clickHandler','applyForcedGameTroopSettingsCoreEngine','drawActorSimpleStatus','Game_Picture_initRotation','Scene_Unlisted','offsetY','CLOSE_BRACKET','expGaugeColor2','toString','_tempActor','subject','_height','isSmartEventCollisionOn','index','playBgm','〘Common\x20Event\x20%1:\x20%2〙\x20End','Show\x20Scrolling\x20Text\x20Script\x20Error','PictureRotateBy','clearOnceParallelInterpreters','Game_Map_scrollUp','_battleField','Game_Event_start','MAT','type','_itemWindow','Rate1','WIN_OEM_RESET','paramFlatJS','initVisuMZCoreEngine','checkCoreEngineDisplayCenter','OUTCIRC','Scene_Battle_update','anchorCoreEasing','CategoryRect','_blank','setHandler','ParamMax','cursorPageup','DisplayLockX','jsonToZip','Game_Interpreter_command355','createDimmerSprite','drawing','maxGold','helpWindowRect','This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!','pictureButtons','cancelShowButton','FontSize','_lastCommandSymbol','Scene_MenuBase_mainAreaTop','toFixed','_targetOffsetY','clearStencil','ColorTPGauge2','IconIndex','Spriteset_Base_destroy','Scene_GameEnd_createBackground','updateScene','CodeJS','playCursorSound','STENCIL_TEST','keyboard','playTestF7','Game_System_initialize','ActorHPColor','MAX_SAFE_INTEGER','OS_KEY','FontShadows','INOUTCUBIC','PositionJS','addEventListener','displayName','updatePointAnimations','Plus1','numRepeats','savefileInfo','targetScaleX','_pauseSignSprite','charCode','keypress','_drawTextOutline','_changingClass','center','paintOpacity','Scene_Equip_create','updateKeyText','maxTurns','playOnceParallelInterpreter','FUNC','sparamFlat2','BTestItems','paramRate1','statusWindowRect','forceStencil','onerror','115890SDjbSE','rgba(0,\x200,\x200,\x201.0)','StatusRect','AntiZoomPictures','createPointAnimation','getTileExtendTerrainTags','OpenURL','keyRepeatWait','ValueJS','cursorUp','sparamRateJS','STRUCT','OpenConsole','SystemSetBattleSystem','_registerKeyInput','slice','showDevTools','InputRect','OUTEXPO','initCoreEngineScreenShake','enemies','BarThickness','wait','Game_Picture_move','process_VisuMZ_CoreEngine_RegExp','currentValue','WIN_OEM_FJ_ROYA','PRINT','_shakePower','_sellWindow','SkillMenu','ATK','endAction','GoldOverlap','guardSkillId','innerHeight','resetBattleSystem','Wait','isAlive','ParseTilesetNotetags','CustomParamIcons','processCursorMoveModernControls','Sprite_Actor_setActorHome','_commonEventLayers','_action','VisuMZ_2_BattleSystemPTB','picture','NUMPAD8','Center','expParams','EnableMasking','sparamRate1','value','targetScaleY','gold','_iconIndex','HRG','hpColor','SystemLoadAudio','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Input_update','ColorMPGauge1','updateSmoothScroll','DEF','mpGaugeColor2','removeChild','pixelated','tpGaugeColor1','process_VisuMZ_CoreEngine_Settings','processKeyboardEnd','isMaskingEnabled','ColorGaugeBack','ButtonHeight','updatePlayTestF7','padZero','AMPERSAND','randomJS','_gamepadWait','reserveCommonEvent','ETB','strokeRect','playEscape','gaugeLineHeight','yScrollLinkedOffset','OutlineColorDmg','createExtendedTileSprite','ExtDisplayedParams','Spriteset_Battle_createEnemies','_list','addChild','Input_onKeyDown','scrollUp','OUTCUBIC','loadTileBitmap','VOLUME_MUTE','processTouch','DurationPerChat','ColorMaxLvGauge2','_mapY','cursorLeft','updateEffekseer','removeAllFauxAnimations','_upArrowSprite','ExportAllMapText','_animationQueue','mainAreaTop','_onError','Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','Mute','targets','ExportStrFromAllTroops','VOLUME_UP','_hp','applyEasing','MainMenu','_lastY','getParameter','MULTIPLY','subtitle','text','UpdatePictureCoordinates','_actorWindow','playTestShiftR','_stored_mpGaugeColor1','_startPlaying','OutlineColorGauge','round','processHandling','requestFauxAnimation','updateScrollBarPosition','_lastX','skipBranch','Scene_MenuBase_helpAreaTop','7fyPZqt','windowOpacity','pages','terminate','standardIconHeight','createTextPopupWindow','updatePositionCoreEngine','《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a','TextStr','ParseActorNotetags','isRepeated','_subject','deactivate','measureTextWidth','WIN_OEM_CLEAR','TGR','Game_Picture_calcEasing','INOUTQUART','_updateFilterArea','inputWindowRect','isRightInputMode','Abbreviation','OPEN_PAREN','loadSystem','process_VisuMZ_CoreEngine_jsQuickFunctions','original','image-rendering','max','targetX','_buyWindow','Input_updateGamepadState','loadTitle1','Mirror','pointX','isBusy','_timeDuration','removeAnimation','makeFontSmaller','BattleSystem','onload','createCancelButton','enemy','CONTEXT_MENU','GetParamIcon','_numberWindow','ShowActorLevel','xparamPlus','makeFontBigger','F18','context','SkillTypeBgType','onMoveEnd','categoryWindowRect','Max','_phase','HelpRect','updateDuration','isItem','Spriteset_Base_update','IconXParam0','isMenuButtonAssistEnabled','Flat2','bitmap','ENTER_SPECIAL','numberWindowRect','destroyed','_stored_deathColor','statusEquipWindowRect','ARRAYEVAL','getLevel','target','expRate','Game_Picture_updateRotation','isPointAnimationPlaying','REPLACE','DETACH_PICTURE_CONTAINER','1.4.4','paramValueByName','currencyUnit','IconParam7','_hovered','levelUp','Spriteset_Base_updatePosition','Linear','_stored_expGaugeColor2','ALTGR','ParseSkillNotetags','remove','allIcons','createTilemap','_pollGamepads','isNormalPriority','F16','sv_actors','F10','catchNormalError','_buttonAssistWindow','AutoScrollLockY','battleSystem','mainAreaHeightSideButtonLayout','fillRect','_scrollBarHorz','PictureEraseRange','alignBottom','MDR','updateClose','setSideButtonLayout','X:\x20%1','gainGold','isSceneBattle','turn','alpha','overallHeight','IconXParam9','loadBitmapCoreEngine','etypeId','destroy','menu','Scene_MenuBase_mainAreaHeight','xparamPlus1','allowShiftScrolling','SParamVocab3','updatePositionCoreEngineShakeOriginal','_updateGamepadState','setupBattleTestItems','_actor','drawCurrencyValue','params','damageColor','NoTileShadows','lineHeight','buttonAssistKey3','currentLevelExp','maxLvGaugeColor1','ParseStateNotetags','EnableNumberInput','_srcBitmap','return\x200','EQUAL','horzJS','centerCameraCheckData','MinDuration','clamp','areTileShadowsHidden','BasicParameterFormula','mainFontSize','Window_SkillList_includes','SubfolderParse','_centerCameraCheck','pop','process_VisuMZ_CoreEngine_Functions','DOWN','_troopId','paramPlus','setupButtonImage','CLEAR','Rate','loadMapData','Scene_Options_create','CrisisRate','EXSEL','setValue','SParamVocab0','outlineColorGauge','prototype','isSpecialCode','NameInputMessage','_forcedBattleSys','_pageupButton','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','onInputBannedWords','loadBitmap','loadSystemImages','sparamPlus1','updateDashToggle','SwitchRandomizeOne','ExtJS','GREATER_THAN','isGamepadAxisMoved','attackSkillId','anchor','pan','current','IconSParam1','WIN_OEM_FJ_LOYA','height','ApplyEasing','hpGaugeColor2','_baseTexture','globalAlpha','trim','processEscape','DrawItemBackgroundJS','itemHeight','WIN_OEM_FINISH','SParamVocab9','scaleMode','xparamRateJS','dummyWindowRect','boxWidth','scaleX','tpColor','itypeId','Sprite_destroy','STR','number','OTB','EscapeAlways','KANA','parallaxes','isPlaytest','Bitmap_strokeRect','ControllerMatches','maxTp','startMove','shouldAutosave','equips','WIN_OEM_FJ_MASSHOU','getCoreEngineScreenShakeStyle','gainItem','SplitEscape','_textPopupWindow','ShowScrollBar','drawBackground','processKeyboardDelete','WIN_ICO_CLEAR','Symbol','PDR','(\x5cd+)>','INOUTBOUNCE','FINAL','updateWaitMode','_stored_maxLvGaugeColor1','open','LineHeight','ColorDeath','itemRect','_text','isGamepadButtonPressed','isMaxLevel','TPB\x20ACTIVE','setClickHandler','setupRate','_inputString','ControllerButtons','asin','maxScrollbar','isBottomHelpMode','SwitchToggleRange','removeAllPointAnimations','Exported_Script_%1.txt','setBackgroundOpacity','isOptionValid','Settings','VisuMZ_2_BattleSystemETB','zoomScale','_drawTextShadow','_displayY','Speed','_offsetX','displayY','_screenY','BTestArmors','onButtonImageLoad','Game_Picture_show','CLOSE_CURLY_BRACKET','_commandList','_commandWindow','Bitmap_drawCircle','src','popScene','initDigitGrouping','Pixelated','skills','Game_Interpreter_PluginCommand','listWindowRect','Window_NameInput_cursorUp','_stored_hpGaugeColor1','isCursorMovable','key%1','Window_refreshBack','destroyScrollBarBitmaps','ColorManager_loadWindowskin','setupValueFont','useDigitGrouping','traitsPi','format','offsetX','drawText','XParameterFormula','_stored_tpGaugeColor1','ButtonAssist','skillTypeWindowRect','outlineColorDmg','originalJS','centerY','AllTroops','_hideTileShadows','getControllerInputButtonMatch','REC','CommandList','QUOTE','Window_NameInput_cursorPagedown','_stored_pendingColor','scrollX','ItemHeight','_stypeId','updateBgmParameters','scrollRight','left','Window_Scrollable_update','isOpening','hasEncryptedImages','setEnemyAction','encounterStep','atypeId','OUTSINE','moveRelativeToResolutionChange','Scene_Boot_onDatabaseLoaded','removeFauxAnimation','learnings','ShiftR_Toggle','refreshScrollBarBitmap','IconXParam1','_menuButton','Y:\x20%1','_dimmerSprite','_patternHeight','F24','_tileExtendSprites','updateData','_stored_hpGaugeColor2','Game_Interpreter_command122','terms','setupCoreEasing','HYPHEN_MINUS','targetBackOpacity','_helpWindow','getLastUsedGamepadType','ScreenResolution','PERCENT','operation','_refreshPauseSign','focus','useDigitGroupingEx','restore','textAlign','Page','IconSParam3','slotWindowRect','buttonAssistKey4','onlyfilename','shake','_lastOrigin','moveMenuButtonSideButtonLayout','updatePositionCoreEngineShakeHorz','meVolume','Bitmap_blt','toUpperCase','ctrlKey','ShowJS','sparamFlatBonus','bind','expGaugeColor1','setAttack','keys','battlebacks1','getInputMultiButtonStrings','IconSParam9','executeLoad','bgsVolume','CEV','SHIFT','ExtractStrFromList','invokeCounterAttack','createPageButtons','Tilemap_addShadow','_coreEasing','ColorMaxLvGauge1','SideButtons','consumeItem','ENTER','TRAIT_PARAM','334984QqZJNr','isAutoColorAffected','IconParam0','Unnamed','buttonAreaHeight','_data','Enable','DimColor1','startShake','OUTBACK','ItemStyle','BlurFilter','mpColor','_mirror','DisplayedParams','SideView','randomInt','RepositionEnemies','overallWidth','ESC','xparamRate','Scene_Base_terminateAnimationClearBugFix','operand','Scene_TitleTransition','_lastPluginCommandInterpreter','origin','textColor','LESS_THAN','LoadError','BattleManager_update','Map%1','nah','PixelateImageRendering','darwin','shift','stringKeyMap','addChildToBack','_pointAnimationSprites','targetPosition','windowPadding','mute','uiAreaHeight','updateText','changeTileset','AudioChangeBgsPan','isTouchedInsideFrame','command355','start','command122','contents','_playTestFastMode','Window_NumberInput_processDigitChange','animations','_customModified','tab','get','show','BTestWeapons','WIN_OEM_BACKTAB','ItemMenu','SkillTypeRect','SETTINGS','isSideView','createFauxAnimationSprite','clearRect','Scene_Map_createSpriteset','_targetX','animationBaseDelay','CancelText','updatePosition','_defaultStretchMode','If\x20you\x20don\x27t\x20want\x20this\x20option,\x20set\x20Split\x20Escape\x20option\x20back\x20to\x20false.','initRotation','ExtractStrFromTroop','Flat1','itemHit','_cancelButton','setup','KeyUnlisted','updateRotation','_digitGrouping','setSideView','Game_Picture_angle','bodyColor','IconSParam7','movePageButtonSideButtonLayout','Gold','KeyboardInput','SystemSetFontSize','ImgLoad','drawActorLevel','OnLoadJS','_onceParallelInterpreters','Subtitle','CheckSplitEscape','clone','systemColor','Sprite_Battler_startMove','targetContentsOpacity','PictureCoordinatesMode','BlendMode','deselect','numActions','Window_Base_update','Window_NumberInput_start','_battlerName','SParamVocab7','iconHeight','GoldIcon','_tileExtendTerrainTags','Scene_Battle_createCancelButton','_stored_gaugeBackColor','itemPadding','Finish','ShopMenu','Graphics_defaultStretchMode','DefaultStyle','VisuMZ_2_BattleSystemBTB','CallHandlerJS','blockWidth','pageup','Bitmap_drawTextOutline','_targets','checkPlayerLocation','match','AudioChangeBgsPitch','_pictureName','_statusParamsWindow','SUBTRACT','HIT','NUMPAD9','drawSegment','Plus2','call','BoxMargin','DigitGroupingGaugeSprites','ColorPowerDown','_backgroundSprite','Origin','ColorCrisis','pictureId','Game_Map_setup','1224876IXovsy','updateFauxAnimations','F21','ActorRect','PIPE','WIN_OEM_COPY','adjustSprite','exp','saveViewport','GameEnd','Graphics_centerElement','events','_pressed','axes','_fauxAnimationSprites','%1〘End\x20Choice\x20Selection〙%1','cos','VariableJsBlock','backOpacity','runCombinedScrollingTextAsCode','StatusEquipRect','setEvent','_stored_tpGaugeColor2','atbActive','activate','processKeyboardBackspace','pictures','Game_BattlerBase_initMembers','cursorPagedown','maxScrollY','initialize','updatePadding','isFauxAnimationPlaying','BaseTexture','removePointAnimation','EnableJS','imageSmoothingEnabled','battlerHue','contains','isGamepadTriggered','ScaleY','Keyboard','consumable','enabled','connected','powerDownColor','NEAREST','_origin','maxVert','ExportCurMapText','maxLvGaugeColor2','duration','Game_Character_processMoveCommand','AnimationPoint','updateAnchor','NewGameCommonEvent','calcCoreEasing','targetObjects','_animationSprites','ItemBackColor1','BattleManager_checkSubstitute','IconSParam5','SParamVocab2','onDatabaseLoaded','ScaleX','Game_Troop_setup','AudioChangeBgsVolume','_bgmBuffer','_backSprite1','_textQueue','IDs','dashToggle','_statusWindow','map','_optionsWindow','IconSParam4','_realScale','maxHorz','Game_Picture_initBasic','gameTitle','touchUI','maxItems','isOpenAndActive','》Comment《\x0a%1\x0a','isClosed','seVolume','ONE_MINUS_SRC_ALPHA','Game_Map_setDisplayPos','tileset','Game_Action_updateLastTarget','setupScrollBarBitmap','INOUTQUINT','BottomHelp','apply','faces','SParamVocab5','traitObjects','Scene_Map_shouldAutosave','KeySHIFT','actor','_url','FontSmoothing','WIN_OEM_WSCTRL','PictureID','_lastGamepad','_repositioned','textHeight','StatusBgType','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','_stored_systemColor','overrideMimeType','VisuMZ_2_BattleSystemCTB','bitmapHeight','win32','setEasingType','ctGaugeColor2','BgFilename2','isExpGaugeDrawn','IconXParam5','onKeyDown','split','processCursorHomeEndTrigger','evade','getColorDataFromPluginParameters','_backgroundFilter','stencilFunc','onActorChange','isOpen','TitlePicButtons','parameters','XParamVocab4','KeyTAB','ItemBgType','waiting','pagedownShowButton','worldTransform','CTB','drawTextTopAligned','createContents','prepare','Window_Selectable_drawBackgroundRect','Sprite_StateIcon_loadBitmap','_mapX','buttonAssistText4','_stored_mpGaugeColor2','onClick','getGamepads','Name','ActorBgType','standardIconWidth','drawTextEx','F23','GoldBgType','processAlwaysEscape','_internalTextures','Flat','_maxDigits','addCommand','addQueue','Input_setupEventHandlers','PLUS','deflate','getCustomBackgroundSettings','catchException','_centerElementCoreEngine','en-US','CustomParamType','getBackgroundOpacity','autoRemovalTiming','itemBackColor2','Window_StatusBase_drawActorSimpleStatus','isUseModernControls','Scene_Map_updateMainMultiply','and\x20add\x20it\x20onto\x20this\x20one.','drawIconBySize','Scene_Boot_startNormalGame','GRD','DetachMapPictureContainer','F22','loadIconBitmap','StatusParamsRect','startAutoNewGame','toLocaleString','makeCommandList','opacity','IconXParam7','data/','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','DummyRect','Rate2','Scene_Battle_createSpritesetFix','refreshWithTextCodeSupport','repositionEnemiesByResolution','_scaleX','requestPointAnimation','SCROLL_LOCK','titles1','Spriteset_Base_isAnimationPlaying','isPressed','_mainSprite','updateBgsParameters','_listWindow','parse','ExportAllTroopText','ParseAllNotetags','SystemLoadImages','child_process','GET','CLOSE_PAREN','_backSprite','2225208elTKjI','MAXHP','MEV','<JS\x20%1\x20%2:[\x20](.*)>','CommandBgType','reduce','_statusEquipWindow','makeInputButtonString','BTestAddedQuantity','SnapshotOpacity','isFullDocumentTitle','OUTQUART','MapOnceParallel','itemHitImprovedAccuracy','_stored_ctGaugeColor1','createAnimationSprite','OUTBOUNCE','_duration','maxLevel','setCommonEvent','_moveEasingType','_anglePlus','Scene_Map_createSpriteset_detach','ALT','_fauxAnimationQueue','TCR','erasePicture','DisplayLockY','fillText','onInputOk','initCoreEngine','setAnglePlusData','refreshDimmerBitmap','scrollLeft','_currentBgs','ParamName','INBOUNCE','Game_Action_numRepeats','Renderer','offOpacity','Sprite_Animation_setViewport','updateOpen','layoutSettings','_inputWindow','Control\x20Variables\x20Script\x20Error','CustomParamAbb','framesMax','AccuracyBoost','HelpBgType','AGI','isPhysical','playBgs','update','buttonAssistOffset4','command111','BTB','flush','_spriteset','WASD','forceOutOfPlaytest','sv_enemies','IconXParam2','_drawTextBody','Scene_Skill_create','result','setWindowPadding','down','default','paramMaxJS','isLoopVertical','abs','_startLoading','alphabetic','updateMain','checkScrollBarBitmap','_centerElement','XParamVocab2','xparamFlat2','RIGHT','checkSubstitute','playtestQuickLoad','Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','onLoad','updateScrollBars','Padding','advanced','Scene_SingleLoadTransition','filters','mhp','1796215OXtYkD','doesNameContainBannedWords','_width','TextCodeNicknames','Color','list','WindowLayer_render','MINUS','HOME','numberShowButton','TargetAngle','〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','showPointAnimations','helpAreaTopSideButtonLayout','<%1\x20%2:[\x20]','paramFlat','_margin','Game_Event_isCollidedWithEvents','ADD','isTriggered','removeAnimationFromContainer','playOk','Bitmap_clearRect','removeOnceParallelInterpreter','replace','_encounterCount','Scene_Base_create','version','isEventTest','IconSParam8','TPB\x20WAIT','isGamepadConnected','mmp','missed','storeMapData','CIRCUMFLEX','ShowButtons','IconSParam0','LvExpGauge','updateOnceParallelInterpreters','playMiss','_skillTypeWindow','processMoveCommand','INOUTQUAD','reservePlayTestNewGameCommonEvent','_pictureCoordinatesWindow','CustomParam','Tilemap_addSpotTile','_editWindow','DetachBattlePictureContainer','setViewport','_digitGroupingEx','refreshSpritesetForExtendedTiles','iconWidth','Bitmap_gradientFillRect','ERROR!\x0a\x0aCore\x20Engine\x20>\x20Plugin\x20Parameters\x20>\x20Button\x20Assist\x20>\x20Split\x20Escape\x0a\x0a','MaxDuration','RPGMAKER_VERSION','sceneTerminationClearEffects','%1〘Choice\x20Cancel〙%1','_createInternalTextures','angle','gaugeHeight','outbounce','WIN_OEM_JUMP','sin','Scene_Title','_offsetY','Game_Interpreter_command111','boxHeight','createFauxAnimationQueue','InputBgType','switchModes','INOUTBACK','maxScrollX','drawBackgroundRect','%1\x0a','removeTileExtendSprites','CustomParamNames','exportAllTroopStrings','Scene_MenuBase_createCancelButton','_stored_powerDownColor','ListBgType','RegExp','drawGameSubtitle','_coreEngineShakeStyle','random','exec','CommonEventID','_windowskin','ColorSystem','ColSpacing','helpAreaBottom','status','processKeyboardHandling','editWindowRect','drawFace','setTileFrame','_storedStack','_number','PictureRotate','buttonAssistText2','concat','position','BattleManager_processEscape','DTB','drawCurrentParam','EQUALS','META','Scene_Name_create','%1/','playTestF6','currentClass','measureText','SLEEP','targetOpacity','object','_targetAnchor','Game_Action_itemHit','titleCommandWindow','SellBgType','EVA','setupNewGame','registerCommand','text%1','isAnimationForEach','Sprite_Picture_loadBitmap','BarBodyColor','option','Opacity','SceneManager_isGameActive','crisisColor','getLastPluginCommandInterpreter','adjustPictureAntiZoom','repeat','QoL','VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2','Game_Picture_scaleX','mirror','drawItem','PictureEraseAll','isEnemy','CreateBattleSystemID','RowSpacing','drawGoldItemStyle','_context','prepareNextScene','_shouldPreventDefault','seek','ACCEPT','tilesetFlags','updateDocumentTitle','ParamArrow','ScreenShake','clearCachedKeys','_pointAnimationQueue','VisuMZ_2_BattleSystemFTB','animationId','paramWidth','_scrollBarVert','cursorDown','Scene_Map_initialize','_texture','textWidth','resetFontSettings','measureTextWidthNoRounding','framebuffer','refresh','scrollbar','areButtonsOutsideMainUI','DigitGroupingLocale'];_0x18bf=function(){return _0x333445;};return _0x18bf();}function Game_OnceParallelInterpreter(){const _0x3d43e8=_0x3beee9;this[_0x3d43e8(0x59a)](...arguments);}Game_OnceParallelInterpreter['prototype']=Object[_0x3beee9(0x75c)](Game_Interpreter[_0x3beee9(0x413)]),Game_OnceParallelInterpreter[_0x3beee9(0x413)][_0x3beee9(0x1b0)]=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter[_0x3beee9(0x413)][_0x3beee9(0x661)]=function(_0x3bbfbd){const _0x536638=_0x3beee9,_0x1dd08a=$dataCommonEvents[_0x3bbfbd];_0x1dd08a?this[_0x536638(0x53b)](_0x1dd08a[_0x536638(0x6ac)],0x0):this['terminate']();},Game_OnceParallelInterpreter[_0x3beee9(0x413)][_0x3beee9(0x591)]=function(_0x5c80b8){const _0x4c50b3=_0x3beee9;this[_0x4c50b3(0x814)]=_0x5c80b8||0x0;},Game_OnceParallelInterpreter['prototype'][_0x3beee9(0x372)]=function(){const _0x10171b=_0x3beee9;if(!SceneManager[_0x10171b(0x799)]())return;SceneManager['_scene']['removeOnceParallelInterpreter'](this),Game_Interpreter[_0x10171b(0x413)]['terminate'][_0x10171b(0x573)](this);},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x36e)]=Scene_MenuBase[_0x3beee9(0x413)][_0x3beee9(0x279)],Scene_MenuBase[_0x3beee9(0x413)][_0x3beee9(0x279)]=function(){const _0x1fab79=_0x3beee9;let _0x30bd68=0x0;return SceneManager[_0x1fab79(0x750)]()?_0x30bd68=this[_0x1fab79(0x6b4)]():_0x30bd68=VisuMZ[_0x1fab79(0x186)][_0x1fab79(0x36e)][_0x1fab79(0x573)](this),_0x30bd68;},Scene_MenuBase[_0x3beee9(0x413)]['helpAreaTopSideButtonLayout']=function(){const _0x3f6d42=_0x3beee9;return this[_0x3f6d42(0x466)]()?this[_0x3f6d42(0x82c)]():0x0;},VisuMZ['CoreEngine'][_0x3beee9(0x2bc)]=Scene_MenuBase[_0x3beee9(0x413)][_0x3beee9(0x353)],Scene_MenuBase[_0x3beee9(0x413)][_0x3beee9(0x353)]=function(){const _0x2bd3e9=_0x3beee9;return SceneManager[_0x2bd3e9(0x750)]()?this[_0x2bd3e9(0x226)]():VisuMZ[_0x2bd3e9(0x186)][_0x2bd3e9(0x2bc)][_0x2bd3e9(0x573)](this);},Scene_MenuBase[_0x3beee9(0x413)][_0x3beee9(0x226)]=function(){const _0x3ce489=_0x3beee9;if(!this['isBottomHelpMode']())return this[_0x3ce489(0x703)]();else return this['isMenuButtonAssistEnabled']()&&this[_0x3ce489(0x195)]()==='top'?Window_ButtonAssist[_0x3ce489(0x413)][_0x3ce489(0x3f1)]():0x0;},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x3e5)]=Scene_MenuBase[_0x3beee9(0x413)]['mainAreaHeight'],Scene_MenuBase[_0x3beee9(0x413)][_0x3beee9(0x80d)]=function(){const _0x50aa97=_0x3beee9;let _0x223e73=0x0;return SceneManager[_0x50aa97(0x750)]()?_0x223e73=this[_0x50aa97(0x3d2)]():_0x223e73=VisuMZ[_0x50aa97(0x186)][_0x50aa97(0x3e5)][_0x50aa97(0x573)](this),this[_0x50aa97(0x3ab)]()&&this[_0x50aa97(0x195)]()!==_0x50aa97(0xea)&&(_0x223e73-=Window_ButtonAssist[_0x50aa97(0x413)][_0x50aa97(0x3f1)]()),_0x223e73;},Scene_MenuBase[_0x3beee9(0x413)][_0x3beee9(0x3d2)]=function(){return Graphics['boxHeight']-this['helpAreaHeight']();},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x813)]=Scene_MenuBase[_0x3beee9(0x413)]['createBackground'],Scene_MenuBase[_0x3beee9(0x413)][_0x3beee9(0xa3)]=function(){const _0x2c144a=_0x3beee9,_0x2ff701=VisuMZ[_0x2c144a(0x186)]['Settings'][_0x2c144a(0x7b7)][_0x2c144a(0xa4)]??0x8;this[_0x2c144a(0x5f8)]=new PIXI[(_0x2c144a(0x6a5))]['BlurFilter'](_0x2ff701),this[_0x2c144a(0x577)]=new Sprite(),this[_0x2c144a(0x577)][_0x2c144a(0x3ad)]=SceneManager['backgroundBitmap'](),this[_0x2c144a(0x577)]['filters']=[this[_0x2c144a(0x5f8)]],this[_0x2c144a(0x343)](this[_0x2c144a(0x577)]),this[_0x2c144a(0x46a)](0xc0),this[_0x2c144a(0x46a)](this[_0x2c144a(0x623)]()),this[_0x2c144a(0x204)]();},Scene_MenuBase[_0x3beee9(0x413)][_0x3beee9(0x623)]=function(){const _0x2e728e=_0x3beee9,_0x1382a4=String(this['constructor'][_0x2e728e(0x148)]),_0x4bd73a=this[_0x2e728e(0x61e)](_0x1382a4);return _0x4bd73a?_0x4bd73a[_0x2e728e(0x657)]:0xc0;},Scene_MenuBase[_0x3beee9(0x413)][_0x3beee9(0x204)]=function(){const _0x4afe9a=_0x3beee9,_0x569f22=String(this[_0x4afe9a(0x1b0)][_0x4afe9a(0x148)]),_0x8309b3=this[_0x4afe9a(0x61e)](_0x569f22);_0x8309b3&&(_0x8309b3[_0x4afe9a(0x161)]!==''||_0x8309b3[_0x4afe9a(0x5f0)]!=='')&&(this['_backSprite1']=new Sprite(ImageManager[_0x4afe9a(0x38e)](_0x8309b3[_0x4afe9a(0x161)])),this[_0x4afe9a(0x260)]=new Sprite(ImageManager[_0x4afe9a(0x1db)](_0x8309b3[_0x4afe9a(0x5f0)])),this[_0x4afe9a(0x343)](this[_0x4afe9a(0x5c0)]),this[_0x4afe9a(0x343)](this[_0x4afe9a(0x260)]),this['_backSprite1'][_0x4afe9a(0x3ad)][_0x4afe9a(0x7a8)](this[_0x4afe9a(0x582)][_0x4afe9a(0x4d9)](this,this[_0x4afe9a(0x5c0)])),this[_0x4afe9a(0x260)][_0x4afe9a(0x3ad)][_0x4afe9a(0x7a8)](this[_0x4afe9a(0x582)]['bind'](this,this[_0x4afe9a(0x260)])));},Scene_MenuBase[_0x3beee9(0x413)][_0x3beee9(0x61e)]=function(_0x2073b9){const _0x57ffa4=_0x3beee9;return VisuMZ['CoreEngine']['Settings'][_0x57ffa4(0x7b7)][_0x2073b9]||VisuMZ[_0x57ffa4(0x186)][_0x57ffa4(0x46c)]['MenuBg'][_0x57ffa4(0x28e)];},Scene_MenuBase[_0x3beee9(0x413)][_0x3beee9(0x582)]=function(_0x41bad6){const _0x51b835=_0x3beee9;this[_0x51b835(0x187)](_0x41bad6),this['centerSprite'](_0x41bad6);},VisuMZ['CoreEngine'][_0x3beee9(0x6f7)]=Scene_MenuBase[_0x3beee9(0x413)][_0x3beee9(0x397)],Scene_MenuBase[_0x3beee9(0x413)][_0x3beee9(0x397)]=function(){const _0x50b55c=_0x3beee9;VisuMZ[_0x50b55c(0x186)][_0x50b55c(0x6f7)][_0x50b55c(0x573)](this),SceneManager[_0x50b55c(0x7d4)]()&&this['moveCancelButtonSideButtonLayout']();},Scene_MenuBase['prototype'][_0x3beee9(0xc2)]=function(){const _0x3ed6f6=_0x3beee9;this['_cancelButton']['x']=Graphics[_0x3ed6f6(0x436)]+0x4;},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x121)]=Scene_MenuBase[_0x3beee9(0x413)][_0x3beee9(0x4e6)],Scene_MenuBase['prototype'][_0x3beee9(0x4e6)]=function(){const _0x4e5a75=_0x3beee9;VisuMZ[_0x4e5a75(0x186)]['Scene_MenuBase_createPageButtons']['call'](this),SceneManager['isSideButtonLayout']()&&this[_0x4e5a75(0x543)]();},Scene_MenuBase[_0x3beee9(0x413)][_0x3beee9(0x543)]=function(){const _0x2eb437=_0x3beee9;this['_pageupButton']['x']=-0x1*(this[_0x2eb437(0x417)][_0x2eb437(0x227)]+this['_pagedownButton'][_0x2eb437(0x227)]+0x8),this[_0x2eb437(0x76f)]['x']=-0x1*(this[_0x2eb437(0x76f)][_0x2eb437(0x227)]+0x4);},Scene_MenuBase[_0x3beee9(0x413)]['isMenuButtonAssistEnabled']=function(){const _0x1693b4=_0x3beee9;return VisuMZ[_0x1693b4(0x186)][_0x1693b4(0x46c)][_0x1693b4(0x492)][_0x1693b4(0x4f4)];},Scene_MenuBase[_0x3beee9(0x413)][_0x3beee9(0x195)]=function(){const _0x1f13a8=_0x3beee9;return SceneManager[_0x1f13a8(0x7d4)]()||SceneManager[_0x1f13a8(0x1af)]()?VisuMZ['CoreEngine'][_0x1f13a8(0x46c)][_0x1f13a8(0x492)][_0x1f13a8(0xb3)]:_0x1f13a8(0xea);},Scene_MenuBase['prototype'][_0x3beee9(0x122)]=function(){const _0x397014=_0x3beee9;if(!this[_0x397014(0x3ab)]())return;const _0x2665f6=this[_0x397014(0x219)]();this[_0x397014(0x3cf)]=new Window_ButtonAssist(_0x2665f6),this[_0x397014(0xa1)](this['_buttonAssistWindow']);},Scene_MenuBase[_0x3beee9(0x413)][_0x3beee9(0x219)]=function(){const _0x96298=_0x3beee9;return this[_0x96298(0x195)]()===_0x96298(0xea)?this[_0x96298(0x27a)]():this[_0x96298(0x10c)]();},Scene_MenuBase['prototype'][_0x3beee9(0x27a)]=function(){const _0x2b257a=_0x3beee9,_0x1d0040=ConfigManager[_0x2b257a(0x5cc)]?(Sprite_Button[_0x2b257a(0x413)][_0x2b257a(0x565)]()+0x6)*0x2:0x0,_0x5c2faf=this[_0x2b257a(0x230)](),_0x18110a=Graphics[_0x2b257a(0x436)]-_0x1d0040*0x2,_0x4862fc=this[_0x2b257a(0x4f2)]();return new Rectangle(_0x1d0040,_0x5c2faf,_0x18110a,_0x4862fc);},Scene_MenuBase[_0x3beee9(0x413)]['buttonAssistWindowSideRect']=function(){const _0x111dc6=_0x3beee9,_0x3ad35c=Graphics['boxWidth'],_0x3b40de=Window_ButtonAssist[_0x111dc6(0x413)]['lineHeight'](),_0x4ef58d=0x0;let _0x2c65cc=0x0;return this[_0x111dc6(0x195)]()===_0x111dc6(0x1d4)?_0x2c65cc=0x0:_0x2c65cc=Graphics['boxHeight']-_0x3b40de,new Rectangle(_0x4ef58d,_0x2c65cc,_0x3ad35c,_0x3b40de);},Scene_Menu['layoutSettings']=VisuMZ['CoreEngine']['Settings'][_0x3beee9(0x7cf)][_0x3beee9(0x35c)],VisuMZ[_0x3beee9(0x186)]['Scene_Menu_create']=Scene_Menu[_0x3beee9(0x413)][_0x3beee9(0x75c)],Scene_Menu[_0x3beee9(0x413)][_0x3beee9(0x75c)]=function(){const _0x231185=_0x3beee9;VisuMZ[_0x231185(0x186)][_0x231185(0x1a6)][_0x231185(0x573)](this),this[_0x231185(0x766)]();},Scene_Menu['prototype'][_0x3beee9(0x766)]=function(){const _0x3daa6b=_0x3beee9;this[_0x3daa6b(0x47a)]&&this[_0x3daa6b(0x47a)][_0x3daa6b(0x86c)](Scene_Menu['layoutSettings'][_0x3daa6b(0x652)]),this[_0x3daa6b(0x24f)]&&this[_0x3daa6b(0x24f)][_0x3daa6b(0x86c)](Scene_Menu[_0x3daa6b(0x678)][_0x3daa6b(0x614)]),this[_0x3daa6b(0x5c4)]&&this['_statusWindow'][_0x3daa6b(0x86c)](Scene_Menu[_0x3daa6b(0x678)][_0x3daa6b(0x5e7)]);},Scene_Menu['prototype']['commandWindowRect']=function(){const _0x57288e=_0x3beee9;return Scene_Menu['layoutSettings'][_0x57288e(0xe5)][_0x57288e(0x573)](this);},Scene_Menu[_0x3beee9(0x413)][_0x3beee9(0x826)]=function(){const _0x5c2ab7=_0x3beee9;return Scene_Menu[_0x5c2ab7(0x678)]['GoldRect'][_0x5c2ab7(0x573)](this);},Scene_Menu[_0x3beee9(0x413)][_0x3beee9(0x2e7)]=function(){const _0x56d12a=_0x3beee9;return Scene_Menu[_0x56d12a(0x678)][_0x56d12a(0x2ec)][_0x56d12a(0x573)](this);},Scene_Item[_0x3beee9(0x678)]=VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x46c)][_0x3beee9(0x7cf)][_0x3beee9(0x529)],VisuMZ['CoreEngine'][_0x3beee9(0x133)]=Scene_Item[_0x3beee9(0x413)][_0x3beee9(0x75c)],Scene_Item[_0x3beee9(0x413)][_0x3beee9(0x75c)]=function(){const _0x3c7398=_0x3beee9;VisuMZ[_0x3c7398(0x186)][_0x3c7398(0x133)][_0x3c7398(0x573)](this),this[_0x3c7398(0x766)]();},Scene_Item[_0x3beee9(0x413)][_0x3beee9(0x766)]=function(){const _0x2c8511=_0x3beee9;this[_0x2c8511(0x4c0)]&&this['_helpWindow'][_0x2c8511(0x86c)](Scene_Item['layoutSettings'][_0x2c8511(0x67e)]),this[_0x2c8511(0x773)]&&this[_0x2c8511(0x773)][_0x2c8511(0x86c)](Scene_Item[_0x2c8511(0x678)]['CategoryBgType']),this[_0x2c8511(0x2a2)]&&this[_0x2c8511(0x2a2)]['setBackgroundType'](Scene_Item[_0x2c8511(0x678)]['ItemBgType']),this[_0x2c8511(0x363)]&&this['_actorWindow']['setBackgroundType'](Scene_Item[_0x2c8511(0x678)]['ActorBgType']);},Scene_Item[_0x3beee9(0x413)]['helpWindowRect']=function(){const _0x4ae5ae=_0x3beee9;return Scene_Item['layoutSettings']['HelpRect'][_0x4ae5ae(0x573)](this);},Scene_Item[_0x3beee9(0x413)][_0x3beee9(0x3a3)]=function(){const _0x5e2c03=_0x3beee9;return Scene_Item[_0x5e2c03(0x678)][_0x5e2c03(0x2ab)]['call'](this);},Scene_Item['prototype'][_0x3beee9(0x76a)]=function(){const _0x39ab1a=_0x3beee9;return Scene_Item[_0x39ab1a(0x678)]['ItemRect'][_0x39ab1a(0x573)](this);},Scene_Item[_0x3beee9(0x413)][_0x3beee9(0x845)]=function(){const _0x5171be=_0x3beee9;return Scene_Item['layoutSettings'][_0x5171be(0x57f)][_0x5171be(0x573)](this);},Scene_Skill['layoutSettings']=VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x46c)]['MenuLayout'][_0x3beee9(0x308)],VisuMZ['CoreEngine'][_0x3beee9(0x68d)]=Scene_Skill[_0x3beee9(0x413)][_0x3beee9(0x75c)],Scene_Skill[_0x3beee9(0x413)][_0x3beee9(0x75c)]=function(){const _0x39e296=_0x3beee9;VisuMZ['CoreEngine'][_0x39e296(0x68d)][_0x39e296(0x573)](this),this[_0x39e296(0x766)]();},Scene_Skill[_0x3beee9(0x413)][_0x3beee9(0x766)]=function(){const _0x96532a=_0x3beee9;this[_0x96532a(0x4c0)]&&this[_0x96532a(0x4c0)][_0x96532a(0x86c)](Scene_Skill[_0x96532a(0x678)][_0x96532a(0x67e)]),this[_0x96532a(0x6d0)]&&this[_0x96532a(0x6d0)][_0x96532a(0x86c)](Scene_Skill[_0x96532a(0x678)][_0x96532a(0x3a1)]),this[_0x96532a(0x5c4)]&&this[_0x96532a(0x5c4)][_0x96532a(0x86c)](Scene_Skill['layoutSettings'][_0x96532a(0x5e7)]),this['_itemWindow']&&this[_0x96532a(0x2a2)][_0x96532a(0x86c)](Scene_Skill[_0x96532a(0x678)][_0x96532a(0x600)]),this[_0x96532a(0x363)]&&this['_actorWindow'][_0x96532a(0x86c)](Scene_Skill[_0x96532a(0x678)][_0x96532a(0x610)]);},Scene_Skill[_0x3beee9(0x413)]['helpWindowRect']=function(){const _0x4a5b05=_0x3beee9;return Scene_Skill[_0x4a5b05(0x678)]['HelpRect']['call'](this);},Scene_Skill[_0x3beee9(0x413)][_0x3beee9(0x493)]=function(){const _0x4f719c=_0x3beee9;return Scene_Skill[_0x4f719c(0x678)][_0x4f719c(0x52a)][_0x4f719c(0x573)](this);},Scene_Skill[_0x3beee9(0x413)][_0x3beee9(0x2e7)]=function(){const _0x3ff91f=_0x3beee9;return Scene_Skill['layoutSettings'][_0x3ff91f(0x2ec)][_0x3ff91f(0x573)](this);},Scene_Skill['prototype'][_0x3beee9(0x76a)]=function(){const _0x4dfdfc=_0x3beee9;return Scene_Skill['layoutSettings'][_0x4dfdfc(0x77f)]['call'](this);},Scene_Skill['prototype'][_0x3beee9(0x845)]=function(){const _0x2ac6a5=_0x3beee9;return Scene_Skill[_0x2ac6a5(0x678)][_0x2ac6a5(0x57f)][_0x2ac6a5(0x573)](this);},Scene_Equip[_0x3beee9(0x678)]=VisuMZ['CoreEngine']['Settings']['MenuLayout'][_0x3beee9(0x754)],VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x2df)]=Scene_Equip['prototype'][_0x3beee9(0x75c)],Scene_Equip[_0x3beee9(0x413)]['create']=function(){const _0x52b208=_0x3beee9;VisuMZ[_0x52b208(0x186)][_0x52b208(0x2df)][_0x52b208(0x573)](this),this[_0x52b208(0x766)]();},Scene_Equip[_0x3beee9(0x413)][_0x3beee9(0x766)]=function(){const _0x20f31c=_0x3beee9;this[_0x20f31c(0x4c0)]&&this[_0x20f31c(0x4c0)][_0x20f31c(0x86c)](Scene_Equip[_0x20f31c(0x678)][_0x20f31c(0x67e)]),this[_0x20f31c(0x5c4)]&&this[_0x20f31c(0x5c4)][_0x20f31c(0x86c)](Scene_Equip[_0x20f31c(0x678)][_0x20f31c(0x5e7)]),this[_0x20f31c(0x47a)]&&this['_commandWindow'][_0x20f31c(0x86c)](Scene_Equip[_0x20f31c(0x678)]['CommandBgType']),this[_0x20f31c(0x796)]&&this['_slotWindow']['setBackgroundType'](Scene_Equip[_0x20f31c(0x678)]['SlotBgType']),this[_0x20f31c(0x2a2)]&&this['_itemWindow'][_0x20f31c(0x86c)](Scene_Equip[_0x20f31c(0x678)]['ItemBgType']);},Scene_Equip[_0x3beee9(0x413)][_0x3beee9(0x2b6)]=function(){const _0x15b01c=_0x3beee9;return Scene_Equip['layoutSettings'][_0x15b01c(0x3a6)]['call'](this);},Scene_Equip[_0x3beee9(0x413)][_0x3beee9(0x2e7)]=function(){const _0x8bcf78=_0x3beee9;return Scene_Equip[_0x8bcf78(0x678)][_0x8bcf78(0x2ec)][_0x8bcf78(0x573)](this);},Scene_Equip['prototype'][_0x3beee9(0x282)]=function(){const _0x5a4b13=_0x3beee9;return Scene_Equip[_0x5a4b13(0x678)]['CommandRect'][_0x5a4b13(0x573)](this);},Scene_Equip[_0x3beee9(0x413)][_0x3beee9(0x4cc)]=function(){const _0x58977c=_0x3beee9;return Scene_Equip['layoutSettings']['SlotRect'][_0x58977c(0x573)](this);},Scene_Equip['prototype'][_0x3beee9(0x76a)]=function(){const _0x3f8bf4=_0x3beee9;return Scene_Equip['layoutSettings']['ItemRect'][_0x3f8bf4(0x573)](this);},Scene_Status['layoutSettings']=VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x46c)]['MenuLayout'][_0x3beee9(0x808)],VisuMZ[_0x3beee9(0x186)][_0x3beee9(0xbb)]=Scene_Status[_0x3beee9(0x413)]['create'],Scene_Status[_0x3beee9(0x413)][_0x3beee9(0x75c)]=function(){const _0x5b63fa=_0x3beee9;VisuMZ[_0x5b63fa(0x186)][_0x5b63fa(0xbb)][_0x5b63fa(0x573)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Status[_0x3beee9(0x413)][_0x3beee9(0x766)]=function(){const _0x37130e=_0x3beee9;this[_0x37130e(0x185)]&&this[_0x37130e(0x185)][_0x37130e(0x86c)](Scene_Status[_0x37130e(0x678)]['ProfileBgType']),this[_0x37130e(0x5c4)]&&this[_0x37130e(0x5c4)]['setBackgroundType'](Scene_Status['layoutSettings']['StatusBgType']),this['_statusParamsWindow']&&this[_0x37130e(0x56d)]['setBackgroundType'](Scene_Status[_0x37130e(0x678)][_0x37130e(0x840)]),this[_0x37130e(0x654)]&&this[_0x37130e(0x654)][_0x37130e(0x86c)](Scene_Status[_0x37130e(0x678)]['StatusEquipBgType']);},Scene_Status[_0x3beee9(0x413)]['profileWindowRect']=function(){const _0x2c1579=_0x3beee9;return Scene_Status[_0x2c1579(0x678)][_0x2c1579(0x145)][_0x2c1579(0x573)](this);},Scene_Status[_0x3beee9(0x413)]['statusWindowRect']=function(){const _0x4667b5=_0x3beee9;return Scene_Status['layoutSettings'][_0x4667b5(0x2ec)][_0x4667b5(0x573)](this);},Scene_Status[_0x3beee9(0x413)]['statusParamsWindowRect']=function(){const _0x1bb12b=_0x3beee9;return Scene_Status[_0x1bb12b(0x678)][_0x1bb12b(0x630)][_0x1bb12b(0x573)](this);},Scene_Status[_0x3beee9(0x413)][_0x3beee9(0x3b2)]=function(){const _0x43eda3=_0x3beee9;return Scene_Status[_0x43eda3(0x678)][_0x43eda3(0x590)]['call'](this);},Scene_Options[_0x3beee9(0x678)]=VisuMZ[_0x3beee9(0x186)]['Settings'][_0x3beee9(0x7cf)][_0x3beee9(0xcb)],VisuMZ['CoreEngine'][_0x3beee9(0x40d)]=Scene_Options[_0x3beee9(0x413)][_0x3beee9(0x75c)],Scene_Options['prototype'][_0x3beee9(0x75c)]=function(){const _0x91aa68=_0x3beee9;VisuMZ[_0x91aa68(0x186)][_0x91aa68(0x40d)][_0x91aa68(0x573)](this),this[_0x91aa68(0x766)]();},Scene_Options[_0x3beee9(0x413)]['setCoreEngineUpdateWindowBg']=function(){const _0x4b8832=_0x3beee9;this[_0x4b8832(0x5c6)]&&this[_0x4b8832(0x5c6)]['setBackgroundType'](Scene_Options[_0x4b8832(0x678)]['OptionsBgType']);},Scene_Options['prototype'][_0x3beee9(0x1fe)]=function(){const _0x5e1bd3=_0x3beee9;return Scene_Options[_0x5e1bd3(0x678)]['OptionsRect'][_0x5e1bd3(0x573)](this);},Scene_Save['layoutSettings']=VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x46c)][_0x3beee9(0x7cf)][_0x3beee9(0x1d2)],Scene_Save[_0x3beee9(0x413)][_0x3beee9(0x75c)]=function(){const _0x5e5ec5=_0x3beee9;Scene_File[_0x5e5ec5(0x413)]['create'][_0x5e5ec5(0x573)](this),this[_0x5e5ec5(0x766)]();},Scene_Save[_0x3beee9(0x413)][_0x3beee9(0x766)]=function(){const _0x5c2a9e=_0x3beee9;this[_0x5c2a9e(0x4c0)]&&this[_0x5c2a9e(0x4c0)][_0x5c2a9e(0x86c)](Scene_Save[_0x5c2a9e(0x678)]['HelpBgType']),this[_0x5c2a9e(0x645)]&&this[_0x5c2a9e(0x645)]['setBackgroundType'](Scene_Save['layoutSettings']['ListBgType']);},Scene_Save['prototype'][_0x3beee9(0x2b6)]=function(){const _0x4d498b=_0x3beee9;return Scene_Save[_0x4d498b(0x678)][_0x4d498b(0x3a6)][_0x4d498b(0x573)](this);},Scene_Save[_0x3beee9(0x413)][_0x3beee9(0x482)]=function(){const _0x1cfdfc=_0x3beee9;return Scene_Save[_0x1cfdfc(0x678)][_0x1cfdfc(0x243)][_0x1cfdfc(0x573)](this);},Scene_Load[_0x3beee9(0x678)]=VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x46c)][_0x3beee9(0x7cf)][_0x3beee9(0x84f)],Scene_Load[_0x3beee9(0x413)][_0x3beee9(0x75c)]=function(){const _0x313198=_0x3beee9;Scene_File[_0x313198(0x413)][_0x313198(0x75c)][_0x313198(0x573)](this),this[_0x313198(0x766)]();},Scene_Load[_0x3beee9(0x413)][_0x3beee9(0x766)]=function(){const _0x1b620=_0x3beee9;this[_0x1b620(0x4c0)]&&this['_helpWindow'][_0x1b620(0x86c)](Scene_Load['layoutSettings'][_0x1b620(0x67e)]),this[_0x1b620(0x645)]&&this['_listWindow'][_0x1b620(0x86c)](Scene_Load[_0x1b620(0x678)][_0x1b620(0x6f9)]);},Scene_Load[_0x3beee9(0x413)][_0x3beee9(0x2b6)]=function(){const _0x1a1e5f=_0x3beee9;return Scene_Load['layoutSettings'][_0x1a1e5f(0x3a6)][_0x1a1e5f(0x573)](this);},Scene_Load[_0x3beee9(0x413)][_0x3beee9(0x482)]=function(){const _0x4af35b=_0x3beee9;return Scene_Load[_0x4af35b(0x678)][_0x4af35b(0x243)][_0x4af35b(0x573)](this);};function Scene_QuickLoad(){this['initialize'](...arguments);}Scene_QuickLoad[_0x3beee9(0x413)]=Object['create'](Scene_Load[_0x3beee9(0x413)]),Scene_QuickLoad[_0x3beee9(0x413)][_0x3beee9(0x1b0)]=Scene_QuickLoad,Scene_QuickLoad[_0x3beee9(0x413)]['initialize']=function(){const _0x36470a=_0x3beee9;Scene_Load[_0x36470a(0x413)][_0x36470a(0x59a)][_0x36470a(0x573)](this);},Scene_QuickLoad[_0x3beee9(0x413)]['create']=function(){const _0x398a27=_0x3beee9;this[_0x398a27(0x4e0)](this['_saveFileID']);},Scene_QuickLoad[_0x3beee9(0x413)][_0x3beee9(0x607)]=function(_0xd62388){const _0x35bfef=_0x3beee9;this[_0x35bfef(0x21d)]=_0xd62388;},Scene_QuickLoad[_0x3beee9(0x413)]['start']=function(){const _0x1f85e7=_0x3beee9;Scene_MenuBase['prototype'][_0x1f85e7(0x51d)][_0x1f85e7(0x573)](this);},Scene_GameEnd['layoutSettings']=VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x46c)][_0x3beee9(0x7cf)][_0x3beee9(0x585)],VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x2c3)]=Scene_GameEnd['prototype']['createBackground'],Scene_GameEnd[_0x3beee9(0x413)]['createBackground']=function(){const _0x5bbc88=_0x3beee9;Scene_MenuBase[_0x5bbc88(0x413)][_0x5bbc88(0xa3)][_0x5bbc88(0x573)](this);},Scene_GameEnd[_0x3beee9(0x413)][_0x3beee9(0x776)]=function(){const _0x18ea6f=_0x3beee9,_0x52d4af=this['commandWindowRect']();this[_0x18ea6f(0x47a)]=new Window_GameEnd(_0x52d4af),this[_0x18ea6f(0x47a)]['setHandler'](_0x18ea6f(0x17b),this[_0x18ea6f(0x47d)][_0x18ea6f(0x4d9)](this)),this[_0x18ea6f(0xa1)](this[_0x18ea6f(0x47a)]),this[_0x18ea6f(0x47a)][_0x18ea6f(0x86c)](Scene_GameEnd[_0x18ea6f(0x678)][_0x18ea6f(0x652)]);},Scene_GameEnd[_0x3beee9(0x413)]['commandWindowRect']=function(){const _0x4157a6=_0x3beee9;return Scene_GameEnd[_0x4157a6(0x678)]['CommandRect'][_0x4157a6(0x573)](this);},Scene_Shop[_0x3beee9(0x678)]=VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x46c)][_0x3beee9(0x7cf)][_0x3beee9(0x560)],VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x7c9)]=Scene_Shop[_0x3beee9(0x413)]['create'],Scene_Shop[_0x3beee9(0x413)][_0x3beee9(0x75c)]=function(){const _0xbc2791=_0x3beee9;VisuMZ[_0xbc2791(0x186)][_0xbc2791(0x7c9)][_0xbc2791(0x573)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Shop[_0x3beee9(0x413)][_0x3beee9(0x766)]=function(){const _0x43b9e4=_0x3beee9;this[_0x43b9e4(0x4c0)]&&this[_0x43b9e4(0x4c0)][_0x43b9e4(0x86c)](Scene_Shop['layoutSettings'][_0x43b9e4(0x67e)]),this[_0x43b9e4(0x24f)]&&this[_0x43b9e4(0x24f)][_0x43b9e4(0x86c)](Scene_Shop[_0x43b9e4(0x678)][_0x43b9e4(0x614)]),this[_0x43b9e4(0x47a)]&&this[_0x43b9e4(0x47a)]['setBackgroundType'](Scene_Shop['layoutSettings']['CommandBgType']),this[_0x43b9e4(0x805)]&&this[_0x43b9e4(0x805)][_0x43b9e4(0x86c)](Scene_Shop[_0x43b9e4(0x678)]['DummyBgType']),this['_numberWindow']&&this[_0x43b9e4(0x39b)][_0x43b9e4(0x86c)](Scene_Shop[_0x43b9e4(0x678)]['NumberBgType']),this[_0x43b9e4(0x5c4)]&&this[_0x43b9e4(0x5c4)][_0x43b9e4(0x86c)](Scene_Shop[_0x43b9e4(0x678)][_0x43b9e4(0x5e7)]),this[_0x43b9e4(0x38c)]&&this['_buyWindow'][_0x43b9e4(0x86c)](Scene_Shop[_0x43b9e4(0x678)]['BuyBgType']),this[_0x43b9e4(0x773)]&&this['_categoryWindow']['setBackgroundType'](Scene_Shop[_0x43b9e4(0x678)]['CategoryBgType']),this['_sellWindow']&&this[_0x43b9e4(0x307)][_0x43b9e4(0x86c)](Scene_Shop[_0x43b9e4(0x678)][_0x43b9e4(0x71f)]);},Scene_Shop['prototype']['helpWindowRect']=function(){const _0x5a532f=_0x3beee9;return Scene_Shop['layoutSettings'][_0x5a532f(0x3a6)][_0x5a532f(0x573)](this);},Scene_Shop[_0x3beee9(0x413)][_0x3beee9(0x826)]=function(){const _0x3136b3=_0x3beee9;return Scene_Shop[_0x3136b3(0x678)]['GoldRect'][_0x3136b3(0x573)](this);},Scene_Shop[_0x3beee9(0x413)][_0x3beee9(0x282)]=function(){const _0x7c96b1=_0x3beee9;return Scene_Shop[_0x7c96b1(0x678)][_0x7c96b1(0xe5)]['call'](this);},Scene_Shop['prototype'][_0x3beee9(0x435)]=function(){const _0x2445e7=_0x3beee9;return Scene_Shop[_0x2445e7(0x678)][_0x2445e7(0x638)][_0x2445e7(0x573)](this);},Scene_Shop['prototype'][_0x3beee9(0x3af)]=function(){const _0x4de0ab=_0x3beee9;return Scene_Shop[_0x4de0ab(0x678)]['NumberRect'][_0x4de0ab(0x573)](this);},Scene_Shop[_0x3beee9(0x413)][_0x3beee9(0x2e7)]=function(){const _0xa579ec=_0x3beee9;return Scene_Shop[_0xa579ec(0x678)][_0xa579ec(0x2ec)]['call'](this);},Scene_Shop[_0x3beee9(0x413)]['buyWindowRect']=function(){const _0x4682b2=_0x3beee9;return Scene_Shop[_0x4682b2(0x678)]['BuyRect']['call'](this);},Scene_Shop[_0x3beee9(0x413)]['categoryWindowRect']=function(){const _0x264753=_0x3beee9;return Scene_Shop[_0x264753(0x678)][_0x264753(0x2ab)]['call'](this);},Scene_Shop[_0x3beee9(0x413)][_0x3beee9(0x152)]=function(){const _0x4854ec=_0x3beee9;return Scene_Shop[_0x4854ec(0x678)]['SellRect'][_0x4854ec(0x573)](this);},Scene_Name[_0x3beee9(0x678)]=VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x46c)][_0x3beee9(0x7cf)]['NameMenu'],VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x714)]=Scene_Name[_0x3beee9(0x413)]['create'],Scene_Name[_0x3beee9(0x413)][_0x3beee9(0x75c)]=function(){const _0x8fcbc3=_0x3beee9;VisuMZ['CoreEngine'][_0x8fcbc3(0x714)][_0x8fcbc3(0x573)](this),this[_0x8fcbc3(0x766)]();},Scene_Name[_0x3beee9(0x413)]['setCoreEngineUpdateWindowBg']=function(){const _0x2c6b2d=_0x3beee9;this[_0x2c6b2d(0x6d7)]&&this[_0x2c6b2d(0x6d7)][_0x2c6b2d(0x86c)](Scene_Name[_0x2c6b2d(0x678)]['EditBgType']),this[_0x2c6b2d(0x679)]&&this['_inputWindow'][_0x2c6b2d(0x86c)](Scene_Name[_0x2c6b2d(0x678)][_0x2c6b2d(0x6ee)]);},Scene_Name[_0x3beee9(0x413)][_0x3beee9(0x7d1)]=function(){return 0x0;},Scene_Name[_0x3beee9(0x413)][_0x3beee9(0x706)]=function(){return Scene_Name['layoutSettings']['EditRect']['call'](this);},Scene_Name[_0x3beee9(0x413)][_0x3beee9(0x382)]=function(){const _0x2dbe66=_0x3beee9;return Scene_Name[_0x2dbe66(0x678)][_0x2dbe66(0x2fb)][_0x2dbe66(0x573)](this);},Scene_Name[_0x3beee9(0x413)]['EnableNameInput']=function(){const _0x21fd7d=_0x3beee9;if(!this[_0x21fd7d(0x679)])return![];return VisuMZ['CoreEngine'][_0x21fd7d(0x46c)][_0x21fd7d(0x545)][_0x21fd7d(0x220)];},Scene_Name[_0x3beee9(0x413)][_0x3beee9(0x79f)]=function(){const _0x4e6ec2=_0x3beee9;if(this[_0x4e6ec2(0x220)]()&&this[_0x4e6ec2(0x679)][_0x4e6ec2(0x862)]!==_0x4e6ec2(0x2c8))return TextManager['getInputMultiButtonStrings'](_0x4e6ec2(0x566),'pagedown');return Scene_MenuBase[_0x4e6ec2(0x413)][_0x4e6ec2(0x79f)]['call'](this);},Scene_Name[_0x3beee9(0x413)][_0x3beee9(0x3f2)]=function(){const _0xc19911=_0x3beee9;return this[_0xc19911(0x220)]()?TextManager['getInputButtonString']('tab'):Scene_MenuBase[_0xc19911(0x413)]['buttonAssistKey3'][_0xc19911(0x573)](this);},Scene_Name[_0x3beee9(0x413)][_0x3beee9(0x4cd)]=function(){const _0x178e0a=_0x3beee9;if(this['EnableNameInput']()&&this[_0x178e0a(0x679)][_0x178e0a(0x862)]===_0x178e0a(0x2c8))return TextManager[_0x178e0a(0x655)]([_0x178e0a(0x4ec)]);return Scene_MenuBase[_0x178e0a(0x413)]['buttonAssistKey4']['call'](this);},Scene_Name['prototype'][_0x3beee9(0x19b)]=function(){const _0xd3ff9=_0x3beee9;if(this[_0xd3ff9(0x220)]()&&this[_0xd3ff9(0x679)]['_mode']===_0xd3ff9(0x2c8))return TextManager['makeInputButtonString'](['BKSP']);return Scene_MenuBase['prototype'][_0xd3ff9(0x19b)][_0xd3ff9(0x573)](this);},Scene_Name['prototype']['buttonAssistText1']=function(){const _0x190f59=_0x3beee9;if(this[_0x190f59(0x220)]()&&this[_0x190f59(0x679)][_0x190f59(0x862)]!==_0x190f59(0x2c8)){const _0x4e77ae=VisuMZ['CoreEngine']['Settings'][_0x190f59(0x545)];return _0x4e77ae['PageChange']||_0x190f59(0x4ca);}return Scene_MenuBase['prototype'][_0x190f59(0x138)]['call'](this);},Scene_Name[_0x3beee9(0x413)][_0x3beee9(0x271)]=function(){const _0x3908d4=_0x3beee9;if(this[_0x3908d4(0x220)]()){const _0x26329c=VisuMZ[_0x3908d4(0x186)][_0x3908d4(0x46c)][_0x3908d4(0x545)];return this[_0x3908d4(0x679)][_0x3908d4(0x862)]===_0x3908d4(0x2c8)?_0x26329c[_0x3908d4(0x5a5)]||_0x3908d4(0x5a5):_0x26329c[_0x3908d4(0x7dd)]||_0x3908d4(0x7dd);}else return Scene_MenuBase[_0x3908d4(0x413)][_0x3908d4(0x271)][_0x3908d4(0x573)](this);},Scene_Name[_0x3beee9(0x413)][_0x3beee9(0x60b)]=function(){const _0x5bdad2=_0x3beee9;if(this['EnableNameInput']()){const _0x2def84=VisuMZ[_0x5bdad2(0x186)][_0x5bdad2(0x46c)][_0x5bdad2(0x545)];if(this[_0x5bdad2(0x679)][_0x5bdad2(0x862)]===_0x5bdad2(0x2c8))return _0x2def84[_0x5bdad2(0x55f)]||'Finish';}return Scene_MenuBase['prototype'][_0x5bdad2(0x60b)][_0x5bdad2(0x573)](this);},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x265)]=Scene_Name[_0x3beee9(0x413)][_0x3beee9(0x66b)],Scene_Name[_0x3beee9(0x413)]['onInputOk']=function(){const _0x16d4ef=_0x3beee9;this[_0x16d4ef(0x6a8)]()?this[_0x16d4ef(0x419)]():VisuMZ['CoreEngine'][_0x16d4ef(0x265)][_0x16d4ef(0x573)](this);},Scene_Name[_0x3beee9(0x413)][_0x3beee9(0x6a8)]=function(){const _0x2db395=_0x3beee9,_0x5caf79=VisuMZ[_0x2db395(0x186)][_0x2db395(0x46c)][_0x2db395(0x545)];if(!_0x5caf79)return![];const _0x334cba=_0x5caf79['BannedWords'];if(!_0x334cba)return![];const _0xd0a478=this[_0x2db395(0x6d7)][_0x2db395(0x148)]()[_0x2db395(0xbc)]();for(const _0x44c086 of _0x334cba){if(_0xd0a478[_0x2db395(0x820)](_0x44c086[_0x2db395(0xbc)]()))return!![];}return![];},Scene_Name[_0x3beee9(0x413)][_0x3beee9(0x419)]=function(){const _0x2dbea4=_0x3beee9;SoundManager[_0x2dbea4(0xe1)]();},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x2a9)]=Scene_Battle['prototype']['update'],Scene_Battle['prototype'][_0x3beee9(0x682)]=function(){const _0x4f76d9=_0x3beee9;VisuMZ[_0x4f76d9(0x186)][_0x4f76d9(0x2a9)]['call'](this);if($gameTemp['_playTestFastMode'])this[_0x4f76d9(0x333)]();},Scene_Battle[_0x3beee9(0x413)][_0x3beee9(0x333)]=function(){const _0x3c1fb3=_0x3beee9;!BattleManager[_0x3c1fb3(0x7f8)]()&&!this[_0x3c1fb3(0xf6)]&&!$gameMessage[_0x3c1fb3(0x391)]()&&(this[_0x3c1fb3(0xf6)]=!![],this['update'](),SceneManager[_0x3c1fb3(0x34e)](),this[_0x3c1fb3(0xf6)]=![]);},VisuMZ['CoreEngine'][_0x3beee9(0x55c)]=Scene_Battle[_0x3beee9(0x413)][_0x3beee9(0x397)],Scene_Battle[_0x3beee9(0x413)][_0x3beee9(0x397)]=function(){const _0x55fc91=_0x3beee9;VisuMZ['CoreEngine'][_0x55fc91(0x55c)][_0x55fc91(0x573)](this),SceneManager[_0x55fc91(0x7d4)]()&&this['repositionCancelButtonSideButtonLayout']();},Scene_Battle[_0x3beee9(0x413)][_0x3beee9(0x771)]=function(){const _0x53dc71=_0x3beee9;this['_cancelButton']['x']=Graphics['boxWidth']+0x4,this[_0x53dc71(0x198)]()?this[_0x53dc71(0x53a)]['y']=Graphics[_0x53dc71(0x6ec)]-this[_0x53dc71(0x4f2)]():this[_0x53dc71(0x53a)]['y']=0x0;},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x289)]=Sprite_Button[_0x3beee9(0x413)][_0x3beee9(0x59a)],Sprite_Button['prototype'][_0x3beee9(0x59a)]=function(_0x590dd4){const _0x2f29b0=_0x3beee9;VisuMZ[_0x2f29b0(0x186)]['Sprite_Button_initialize']['call'](this,_0x590dd4),this['initButtonHidden']();},Sprite_Button[_0x3beee9(0x413)]['initButtonHidden']=function(){const _0x3d212f=_0x3beee9,_0x43d185=VisuMZ[_0x3d212f(0x186)][_0x3d212f(0x46c)]['UI'];this[_0x3d212f(0x1e5)]=![];switch(this[_0x3d212f(0x815)]){case _0x3d212f(0x17b):this['_isButtonHidden']=!_0x43d185[_0x3d212f(0x2b9)];break;case _0x3d212f(0x566):case _0x3d212f(0x1e2):this[_0x3d212f(0x1e5)]=!_0x43d185[_0x3d212f(0x602)];break;case _0x3d212f(0x690):case'up':case _0x3d212f(0x839):case'up2':case'ok':this[_0x3d212f(0x1e5)]=!_0x43d185[_0x3d212f(0x6b0)];break;case _0x3d212f(0x3e4):this[_0x3d212f(0x1e5)]=!_0x43d185['menuShowButton'];break;}},VisuMZ[_0x3beee9(0x186)]['Sprite_Button_updateOpacity']=Sprite_Button['prototype'][_0x3beee9(0x75f)],Sprite_Button[_0x3beee9(0x413)][_0x3beee9(0x75f)]=function(){const _0x26c32e=_0x3beee9;SceneManager[_0x26c32e(0x1af)]()||this['_isButtonHidden']?this[_0x26c32e(0xb5)]():VisuMZ[_0x26c32e(0x186)]['Sprite_Button_updateOpacity'][_0x26c32e(0x573)](this);},Sprite_Button[_0x3beee9(0x413)][_0x3beee9(0xb5)]=function(){const _0x33a316=_0x3beee9;this[_0x33a316(0x1a1)]=![],this['opacity']=0x0,this['x']=Graphics[_0x33a316(0x227)]*0xa,this['y']=Graphics[_0x33a316(0x428)]*0xa;},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x54f)]=Sprite_Battler['prototype']['startMove'],Sprite_Battler[_0x3beee9(0x413)][_0x3beee9(0x445)]=function(_0x3f80c3,_0x154b82,_0x301974){const _0x441dd1=_0x3beee9;(this['_targetOffsetX']!==_0x3f80c3||this[_0x441dd1(0x2be)]!==_0x154b82)&&(this['setMoveEasingType'](_0x441dd1(0x3c2)),this[_0x441dd1(0x1d8)]=_0x301974),VisuMZ[_0x441dd1(0x186)][_0x441dd1(0x54f)][_0x441dd1(0x573)](this,_0x3f80c3,_0x154b82,_0x301974);},Sprite_Battler['prototype']['setMoveEasingType']=function(_0x1efbf2){const _0x4cf417=_0x3beee9;this[_0x4cf417(0x662)]=_0x1efbf2;},Sprite_Battler[_0x3beee9(0x413)]['updateMove']=function(){const _0x1952b5=_0x3beee9;if(this[_0x1952b5(0x1bb)]<=0x0)return;const _0x362e89=this[_0x1952b5(0x1bb)],_0x3d6c08=this['_movementWholeDuration'],_0x564b0e=this[_0x1952b5(0x662)];this[_0x1952b5(0x472)]=this['applyEasing'](this[_0x1952b5(0x472)],this[_0x1952b5(0x266)],_0x362e89,_0x3d6c08,_0x564b0e),this[_0x1952b5(0x6ea)]=this[_0x1952b5(0x35b)](this[_0x1952b5(0x6ea)],this[_0x1952b5(0x2be)],_0x362e89,_0x3d6c08,_0x564b0e),this[_0x1952b5(0x1bb)]--;if(this[_0x1952b5(0x1bb)]<=0x0)this[_0x1952b5(0x3a2)]();},Sprite_Battler['prototype'][_0x3beee9(0x35b)]=function(_0x24d193,_0x600a66,_0x1b1dbf,_0x19302a,_0x355d92){const _0x5ed7f9=_0x3beee9,_0x14d846=VisuMZ[_0x5ed7f9(0x429)]((_0x19302a-_0x1b1dbf)/_0x19302a,_0x355d92||_0x5ed7f9(0x3c2)),_0x19c762=VisuMZ[_0x5ed7f9(0x429)]((_0x19302a-_0x1b1dbf+0x1)/_0x19302a,_0x355d92||'Linear'),_0x53111a=(_0x24d193-_0x600a66*_0x14d846)/(0x1-_0x14d846);return _0x53111a+(_0x600a66-_0x53111a)*_0x19c762;},VisuMZ[_0x3beee9(0x186)]['Sprite_Actor_setActorHome']=Sprite_Actor['prototype'][_0x3beee9(0x79b)],Sprite_Actor['prototype'][_0x3beee9(0x79b)]=function(_0xe6592f){const _0x1a9080=_0x3beee9;VisuMZ[_0x1a9080(0x186)][_0x1a9080(0x46c)]['UI'][_0x1a9080(0x147)]?this[_0x1a9080(0x244)](_0xe6592f):VisuMZ['CoreEngine'][_0x1a9080(0x314)][_0x1a9080(0x573)](this,_0xe6592f);},Sprite_Actor['prototype'][_0x3beee9(0x244)]=function(_0x2b01ff){const _0x42bdd1=_0x3beee9;let _0x12fd9a=Math[_0x42bdd1(0x368)](Graphics[_0x42bdd1(0x227)]/0x2+0xc0);_0x12fd9a-=Math[_0x42bdd1(0x171)]((Graphics['width']-Graphics['boxWidth'])/0x2),_0x12fd9a+=_0x2b01ff*0x20;let _0x4571d7=Graphics[_0x42bdd1(0x428)]-0xc8-$gameParty[_0x42bdd1(0x26c)]()*0x30;_0x4571d7-=Math[_0x42bdd1(0x171)]((Graphics['height']-Graphics[_0x42bdd1(0x6ec)])/0x2),_0x4571d7+=_0x2b01ff*0x30,this[_0x42bdd1(0x1e7)](_0x12fd9a,_0x4571d7);},Sprite_Actor[_0x3beee9(0x413)]['retreat']=function(){this['startMove'](0x4b0,0x0,0x78);},Sprite_Animation['prototype']['setMute']=function(_0x5254d7){const _0x4cbb7a=_0x3beee9;this[_0x4cbb7a(0x1cc)]=_0x5254d7;},VisuMZ['CoreEngine'][_0x3beee9(0x1b1)]=Sprite_Animation[_0x3beee9(0x413)]['processSoundTimings'],Sprite_Animation['prototype'][_0x3beee9(0x765)]=function(){const _0x3f910b=_0x3beee9;if(this[_0x3f910b(0x1cc)])return;VisuMZ['CoreEngine'][_0x3f910b(0x1b1)][_0x3f910b(0x573)](this);},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x676)]=Sprite_Animation[_0x3beee9(0x413)][_0x3beee9(0x6d9)],Sprite_Animation[_0x3beee9(0x413)][_0x3beee9(0x6d9)]=function(_0x3f5e64){const _0x4ec986=_0x3beee9;this['isAnimationOffsetXMirrored']()?this[_0x4ec986(0x78c)](_0x3f5e64):VisuMZ['CoreEngine'][_0x4ec986(0x676)][_0x4ec986(0x573)](this,_0x3f5e64);},Sprite_Animation[_0x3beee9(0x413)]['isAnimationOffsetXMirrored']=function(){const _0x386738=_0x3beee9;if(!this[_0x386738(0x27d)])return![];const _0xb5ae70=this[_0x386738(0x27d)]['name']||'';if(_0xb5ae70[_0x386738(0x56a)](/<MIRROR OFFSET X>/i))return!![];if(_0xb5ae70['match'](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x386738(0x186)]['Settings'][_0x386738(0x72e)][_0x386738(0xc6)];},Sprite_Animation['prototype'][_0x3beee9(0x78c)]=function(_0x103f5d){const _0x4f96c1=_0x3beee9,_0x55b740=this[_0x4f96c1(0x146)],_0x1581c6=this[_0x4f96c1(0x146)],_0x3d9f5a=this[_0x4f96c1(0x27d)][_0x4f96c1(0x48e)]*(this[_0x4f96c1(0x4fb)]?-0x1:0x1)-_0x55b740/0x2,_0x371363=this[_0x4f96c1(0x27d)][_0x4f96c1(0x28f)]-_0x1581c6/0x2,_0x24cd82=this[_0x4f96c1(0x514)](_0x103f5d);_0x103f5d['gl'][_0x4f96c1(0x233)](_0x3d9f5a+_0x24cd82['x'],_0x371363+_0x24cd82['y'],_0x55b740,_0x1581c6);},Sprite_Animation[_0x3beee9(0x413)][_0x3beee9(0x785)]=function(_0x10ab64){const _0x1640a3=_0x3beee9;if(_0x10ab64[_0x1640a3(0x643)]){}const _0x414948=this[_0x1640a3(0x27d)][_0x1640a3(0x148)];let _0x5b0ce7=_0x10ab64[_0x1640a3(0x428)]*_0x10ab64[_0x1640a3(0x1d3)]['y'],_0x2cc3ca=0x0,_0x32c534=-_0x5b0ce7/0x2;if(_0x414948[_0x1640a3(0x56a)](/<(?:HEAD|HEADER|TOP)>/i))_0x32c534=-_0x5b0ce7;if(_0x414948[_0x1640a3(0x56a)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x32c534=0x0;if(this[_0x1640a3(0x27d)][_0x1640a3(0x3d6)])_0x32c534=0x0;if(_0x414948[_0x1640a3(0x56a)](/<(?:LEFT)>/i))_0x2cc3ca=-_0x10ab64[_0x1640a3(0x227)]/0x2;if(_0x414948[_0x1640a3(0x56a)](/<(?:RIGHT)>/i))_0x2cc3ca=_0x10ab64[_0x1640a3(0x227)]/0x2;_0x414948[_0x1640a3(0x56a)](/<ANCHOR X:[ ](\d+\.?\d*)>/i)&&(_0x2cc3ca=Number(RegExp['$1'])*_0x10ab64[_0x1640a3(0x227)]);_0x414948[_0x1640a3(0x56a)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x32c534=(0x1-Number(RegExp['$1']))*-_0x5b0ce7);_0x414948['match'](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x2cc3ca=Number(RegExp['$1'])*_0x10ab64[_0x1640a3(0x227)],_0x32c534=(0x1-Number(RegExp['$2']))*-_0x5b0ce7);if(_0x414948[_0x1640a3(0x56a)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x2cc3ca+=Number(RegExp['$1']);if(_0x414948['match'](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x32c534+=Number(RegExp['$1']);_0x414948[_0x1640a3(0x56a)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x2cc3ca+=Number(RegExp['$1']),_0x32c534+=Number(RegExp['$2']));const _0x3e83b3=new Point(_0x2cc3ca,_0x32c534);return _0x10ab64['updateTransform'](),_0x10ab64['worldTransform'][_0x1640a3(0x5d9)](_0x3e83b3);},Sprite_AnimationMV[_0x3beee9(0x413)][_0x3beee9(0x461)]=function(){const _0x35ed4f=_0x3beee9;this[_0x35ed4f(0x7f5)]=VisuMZ[_0x35ed4f(0x186)]['Settings']['QoL'][_0x35ed4f(0x1a0)]??0x4,this[_0x35ed4f(0x12c)](),this['_rate']=this['_rate'][_0x35ed4f(0x3fd)](0x1,0xa);},Sprite_AnimationMV[_0x3beee9(0x413)][_0x3beee9(0x12c)]=function(){const _0x4a3392=_0x3beee9;if(!this[_0x4a3392(0x27d)]);const _0x2a374e=this[_0x4a3392(0x27d)][_0x4a3392(0x148)]||'';_0x2a374e[_0x4a3392(0x56a)](/<RATE:[ ](\d+)>/i)&&(this['_rate']=(Number(RegExp['$1'])||0x1)['clamp'](0x1,0xa));},Sprite_AnimationMV[_0x3beee9(0x413)][_0x3beee9(0x80e)]=function(_0x293f10){this['_muteSound']=_0x293f10;},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x834)]=Sprite_AnimationMV[_0x3beee9(0x413)][_0x3beee9(0x7df)],Sprite_AnimationMV[_0x3beee9(0x413)][_0x3beee9(0x7df)]=function(_0x25f4fe){const _0x5a33f3=_0x3beee9;this['_muteSound']&&(_0x25f4fe=JsonEx['makeDeepCopy'](_0x25f4fe),_0x25f4fe['se']&&(_0x25f4fe['se'][_0x5a33f3(0x178)]=0x0)),VisuMZ[_0x5a33f3(0x186)][_0x5a33f3(0x834)]['call'](this,_0x25f4fe);},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x759)]=Sprite_AnimationMV['prototype']['updatePosition'],Sprite_AnimationMV[_0x3beee9(0x413)][_0x3beee9(0x533)]=function(){const _0x56a3a5=_0x3beee9;VisuMZ[_0x56a3a5(0x186)][_0x56a3a5(0x759)][_0x56a3a5(0x573)](this);if(this[_0x56a3a5(0x27d)][_0x56a3a5(0x70e)]===0x3){if(this['x']===0x0)this['x']=Math[_0x56a3a5(0x368)](Graphics[_0x56a3a5(0x227)]/0x2);if(this['y']===0x0)this['y']=Math[_0x56a3a5(0x368)](Graphics['height']/0x2);}},Sprite_Damage[_0x3beee9(0x413)]['createDigits']=function(_0x1d4a75){const _0x676ec7=_0x3beee9;let _0x37d119=Math[_0x676ec7(0x694)](_0x1d4a75)[_0x676ec7(0x292)]();this[_0x676ec7(0x48b)]()&&(_0x37d119=VisuMZ['GroupDigits'](_0x37d119));const _0x1bdef8=this[_0x676ec7(0x156)](),_0xdb1a76=Math[_0x676ec7(0x171)](_0x1bdef8*0.75);for(let _0x3c934a=0x0;_0x3c934a<_0x37d119[_0x676ec7(0x228)];_0x3c934a++){const _0x3ac51c=this[_0x676ec7(0x1f0)](_0xdb1a76,_0x1bdef8);_0x3ac51c[_0x676ec7(0x3ad)][_0x676ec7(0x48f)](_0x37d119[_0x3c934a],0x0,0x0,_0xdb1a76,_0x1bdef8,'center'),_0x3ac51c['x']=(_0x3c934a-(_0x37d119[_0x676ec7(0x228)]-0x1)/0x2)*_0xdb1a76,_0x3ac51c['dy']=-_0x3c934a;}},Sprite_Damage['prototype'][_0x3beee9(0x48b)]=function(){const _0x1f2e12=_0x3beee9;return VisuMZ[_0x1f2e12(0x186)][_0x1f2e12(0x46c)][_0x1f2e12(0x72e)]['DigitGroupingDamageSprites'];},Sprite_Damage['prototype'][_0x3beee9(0x7eb)]=function(){const _0x5ceff4=_0x3beee9;return ColorManager[_0x5ceff4(0x494)]();},VisuMZ['CoreEngine'][_0x3beee9(0x123)]=Sprite_Gauge['prototype'][_0x3beee9(0x7ef)],Sprite_Gauge['prototype']['gaugeRate']=function(){const _0x1d26c5=_0x3beee9;return VisuMZ[_0x1d26c5(0x186)]['Sprite_Gauge_gaugeRate'][_0x1d26c5(0x573)](this)[_0x1d26c5(0x3fd)](0x0,0x1);},VisuMZ['CoreEngine'][_0x3beee9(0x101)]=Sprite_Gauge[_0x3beee9(0x413)][_0x3beee9(0x303)],Sprite_Gauge[_0x3beee9(0x413)][_0x3beee9(0x303)]=function(){const _0x437205=_0x3beee9;let _0x2653bb=VisuMZ[_0x437205(0x186)]['Sprite_Gauge_currentValue'][_0x437205(0x573)](this);return _0x2653bb;},Sprite_Gauge['prototype'][_0x3beee9(0x24a)]=function(){const _0x18e711=_0x3beee9;let _0x224aae=this[_0x18e711(0x303)]();this[_0x18e711(0x48b)]()&&(_0x224aae=VisuMZ[_0x18e711(0x79d)](_0x224aae));const _0x4b165b=this[_0x18e711(0x853)]()-0x1,_0x53aa99=this[_0x18e711(0x5e6)]?this[_0x18e711(0x5e6)]():this[_0x18e711(0x5ec)]();this[_0x18e711(0x48a)](),this['bitmap'][_0x18e711(0x48f)](_0x224aae,0x0,0x0,_0x4b165b,_0x53aa99,'right');},Sprite_Gauge[_0x3beee9(0x413)]['valueOutlineWidth']=function(){return 0x3;},Sprite_Gauge['prototype']['useDigitGrouping']=function(){const _0xaa6741=_0x3beee9;return VisuMZ['CoreEngine'][_0xaa6741(0x46c)][_0xaa6741(0x72e)][_0xaa6741(0x575)];},Sprite_Gauge[_0x3beee9(0x413)][_0x3beee9(0x7eb)]=function(){return ColorManager['outlineColorGauge']();},Sprite_StateIcon[_0x3beee9(0x176)]=VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x46c)]['UI'][_0x3beee9(0x130)]??!![],VisuMZ['CoreEngine'][_0x3beee9(0x609)]=Sprite_StateIcon[_0x3beee9(0x413)][_0x3beee9(0x41a)],Sprite_StateIcon[_0x3beee9(0x413)][_0x3beee9(0x41a)]=function(){const _0x5ac499=_0x3beee9;Sprite_StateIcon[_0x5ac499(0x176)]?this['loadBitmapCoreEngine']():VisuMZ[_0x5ac499(0x186)]['Sprite_StateIcon_loadBitmap']['call'](this);},Sprite_StateIcon[_0x3beee9(0x413)][_0x3beee9(0x3e1)]=function(){const _0x453116=_0x3beee9;this[_0x453116(0x3ad)]=new Bitmap(ImageManager['iconWidth'],ImageManager[_0x453116(0x559)]),this[_0x453116(0x3f7)]=ImageManager[_0x453116(0x386)](_0x453116(0x787));},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x1d9)]=Sprite_StateIcon[_0x3beee9(0x413)][_0x3beee9(0xca)],Sprite_StateIcon[_0x3beee9(0x413)][_0x3beee9(0xca)]=function(){const _0x538509=_0x3beee9;Sprite_StateIcon[_0x538509(0x176)]?this[_0x538509(0x221)]():VisuMZ[_0x538509(0x186)][_0x538509(0x1d9)][_0x538509(0x573)](this);},Sprite_StateIcon['prototype'][_0x3beee9(0x221)]=function(){const _0x30352d=_0x3beee9;if(this[_0x30352d(0x267)]===this[_0x30352d(0x321)])return;this[_0x30352d(0x267)]=this[_0x30352d(0x321)];const _0x274bd6=ImageManager['iconWidth'],_0x35b695=ImageManager[_0x30352d(0x559)],_0x3df6b4=this[_0x30352d(0x321)]%0x10*_0x274bd6,_0x36f402=Math[_0x30352d(0x171)](this['_iconIndex']/0x10)*_0x35b695,_0x285e11=this[_0x30352d(0x3f7)],_0x4c9810=this[_0x30352d(0x3ad)];_0x4c9810['clear'](),_0x4c9810[_0x30352d(0x274)](_0x285e11,_0x3df6b4,_0x36f402,_0x274bd6,_0x35b695,0x0,0x0,_0x4c9810['width'],_0x4c9810[_0x30352d(0x428)]);},VisuMZ['CoreEngine'][_0x3beee9(0x725)]=Sprite_Picture[_0x3beee9(0x413)]['loadBitmap'],Sprite_Picture[_0x3beee9(0x413)][_0x3beee9(0x41a)]=function(){const _0x3715f5=_0x3beee9;this[_0x3715f5(0x56c)]&&this[_0x3715f5(0x56c)][_0x3715f5(0x56a)](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this[_0x3715f5(0x62f)](Number(RegExp['$1'])):VisuMZ[_0x3715f5(0x186)][_0x3715f5(0x725)][_0x3715f5(0x573)](this);},Sprite_Picture[_0x3beee9(0x413)][_0x3beee9(0x62f)]=function(_0x1ec406){const _0xc19a56=_0x3beee9,_0x1996ac=ImageManager[_0xc19a56(0x6dc)],_0x221e61=ImageManager['iconHeight'],_0x2300a0=this['_pictureName']['match'](/SMOOTH/i);this['bitmap']=new Bitmap(_0x1996ac,_0x221e61);const _0x37211d=ImageManager[_0xc19a56(0x386)](_0xc19a56(0x787)),_0x117c3d=_0x1ec406%0x10*_0x1996ac,_0x547054=Math[_0xc19a56(0x171)](_0x1ec406/0x10)*_0x221e61;this[_0xc19a56(0x3ad)][_0xc19a56(0x26d)]=_0x2300a0,this[_0xc19a56(0x3ad)][_0xc19a56(0x274)](_0x37211d,_0x117c3d,_0x547054,_0x1996ac,_0x221e61,0x0,0x0,_0x1996ac,_0x221e61);};function Sprite_TitlePictureButton(){const _0x397662=_0x3beee9;this[_0x397662(0x59a)](...arguments);}Sprite_TitlePictureButton['prototype']=Object[_0x3beee9(0x75c)](Sprite_Clickable[_0x3beee9(0x413)]),Sprite_TitlePictureButton[_0x3beee9(0x413)]['constructor']=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x3beee9(0x413)][_0x3beee9(0x59a)]=function(_0x145593){const _0x184f3b=_0x3beee9;Sprite_Clickable[_0x184f3b(0x413)][_0x184f3b(0x59a)]['call'](this),this[_0x184f3b(0x4f3)]=_0x145593,this['_clickHandler']=null,this[_0x184f3b(0x53b)]();},Sprite_TitlePictureButton[_0x3beee9(0x413)]['setup']=function(){const _0x44ff19=_0x3beee9;this['x']=Graphics[_0x44ff19(0x227)],this['y']=Graphics[_0x44ff19(0x428)],this[_0x44ff19(0x1a1)]=![],this[_0x44ff19(0x409)]();},Sprite_TitlePictureButton[_0x3beee9(0x413)][_0x3beee9(0x409)]=function(){const _0x1c59e3=_0x3beee9;this['bitmap']=ImageManager[_0x1c59e3(0x131)](this[_0x1c59e3(0x4f3)]['PictureFilename']),this[_0x1c59e3(0x3ad)][_0x1c59e3(0x7a8)](this[_0x1c59e3(0x476)][_0x1c59e3(0x4d9)](this));},Sprite_TitlePictureButton[_0x3beee9(0x413)][_0x3beee9(0x476)]=function(){const _0x2a8b98=_0x3beee9;this['_data'][_0x2a8b98(0x549)][_0x2a8b98(0x573)](this),this[_0x2a8b98(0x4f3)][_0x2a8b98(0x2d0)]['call'](this),this[_0x2a8b98(0x460)](this[_0x2a8b98(0x4f3)][_0x2a8b98(0x564)][_0x2a8b98(0x4d9)](this));},Sprite_TitlePictureButton[_0x3beee9(0x413)]['update']=function(){const _0x207849=_0x3beee9;Sprite_Clickable[_0x207849(0x413)][_0x207849(0x682)][_0x207849(0x573)](this),this[_0x207849(0x75f)](),this[_0x207849(0x349)]();},Sprite_TitlePictureButton['prototype'][_0x3beee9(0x788)]=function(){const _0x49118f=_0x3beee9;return VisuMZ[_0x49118f(0x186)]['Settings'][_0x49118f(0x7cf)][_0x49118f(0xa6)][_0x49118f(0x98)];},Sprite_TitlePictureButton['prototype'][_0x3beee9(0x75f)]=function(){const _0x4b5df6=_0x3beee9;this[_0x4b5df6(0x588)]||this[_0x4b5df6(0x3bf)]?this[_0x4b5df6(0x634)]=0xff:(this[_0x4b5df6(0x634)]+=this['visible']?this['fadeSpeed']():-0x1*this[_0x4b5df6(0x788)](),this['opacity']=Math['min'](0xc0,this[_0x4b5df6(0x634)]));},Sprite_TitlePictureButton[_0x3beee9(0x413)][_0x3beee9(0x460)]=function(_0x472e11){this['_clickHandler']=_0x472e11;},Sprite_TitlePictureButton[_0x3beee9(0x413)][_0x3beee9(0x60d)]=function(){const _0x560c59=_0x3beee9;this[_0x560c59(0x28a)]&&this[_0x560c59(0x28a)]();};function Sprite_ExtendedTile(){this['initialize'](...arguments);}Sprite_ExtendedTile['prototype']=Object['create'](Sprite['prototype']),Sprite_ExtendedTile[_0x3beee9(0x413)][_0x3beee9(0x1b0)]=Sprite_ExtendedTile,Sprite_ExtendedTile[_0x3beee9(0x413)]['initialize']=function(_0x55a4b7,_0x3beca5,_0x5536f3,_0x2f580c){const _0x16498b=_0x3beee9;this[_0x16498b(0x259)]=Game_CharacterBase[_0x16498b(0x1f9)]||-0x6,this[_0x16498b(0x60a)]=_0x55a4b7,this['_mapY']=_0x3beca5,this[_0x16498b(0xa2)]=_0x5536f3,this['_patternHeight']=_0x2f580c,Sprite[_0x16498b(0x413)][_0x16498b(0x59a)]['call'](this),this[_0x16498b(0x798)](),this[_0x16498b(0x347)](),this[_0x16498b(0x708)](),this[_0x16498b(0x682)]();},Sprite_ExtendedTile['prototype'][_0x3beee9(0x798)]=function(){const _0x257f21=_0x3beee9;this[_0x257f21(0x792)]=new Sprite(),this[_0x257f21(0x792)][_0x257f21(0x423)]['x']=0.5,this['_tileSprite']['anchor']['y']=0x1,this[_0x257f21(0x792)]['y']=-this[_0x257f21(0x259)]+0x1,this[_0x257f21(0x343)](this[_0x257f21(0x792)]);},Sprite_ExtendedTile[_0x3beee9(0x413)][_0x3beee9(0x347)]=function(){const _0x379740=_0x3beee9,_0x20cf07=$gameMap['tileset'](),_0x496d51=0x5+Math[_0x379740(0x171)](this[_0x379740(0xa2)]/0x100);this[_0x379740(0x792)][_0x379740(0x3ad)]=ImageManager['loadTileset'](_0x20cf07[_0x379740(0x20a)][_0x496d51]);},Sprite_ExtendedTile[_0x3beee9(0x413)]['setTileFrame']=function(){const _0x26ccdf=_0x3beee9,_0x10ad6c=this[_0x26ccdf(0xa2)],_0xfeb95b=$gameMap[_0x26ccdf(0xd1)](),_0x2ac267=$gameMap[_0x26ccdf(0x868)](),_0xcee5a2=(Math[_0x26ccdf(0x171)](_0x10ad6c/0x80)%0x2*0x8+_0x10ad6c%0x8)*_0xfeb95b,_0xc32e68=Math[_0x26ccdf(0x171)](_0x10ad6c%0x100/0x8)%0x10*_0x2ac267,_0xe9309b=this[_0x26ccdf(0x4b6)]*_0x2ac267;this[_0x26ccdf(0x792)][_0x26ccdf(0x269)](_0xcee5a2,_0xc32e68-_0xe9309b,_0xfeb95b,_0x2ac267+_0xe9309b);},Sprite_ExtendedTile[_0x3beee9(0x413)][_0x3beee9(0x682)]=function(){const _0x7bf308=_0x3beee9;Sprite['prototype'][_0x7bf308(0x682)][_0x7bf308(0x573)](this),this[_0x7bf308(0x533)]();},Sprite_ExtendedTile[_0x3beee9(0x413)][_0x3beee9(0x533)]=function(){const _0x1c98b0=_0x3beee9,_0x2c0d1d=$gameMap['tileWidth'](),_0x371feb=$gameMap[_0x1c98b0(0x868)](),_0x36704c=this[_0x1c98b0(0x60a)],_0x16b72e=this[_0x1c98b0(0x34c)];this['x']=Math[_0x1c98b0(0x171)](($gameMap[_0x1c98b0(0xb0)](_0x36704c)+0.5)*_0x2c0d1d),this['y']=Math[_0x1c98b0(0x171)](($gameMap[_0x1c98b0(0xff)](_0x16b72e)+0x1)*_0x371feb)+this[_0x1c98b0(0x259)]-0x1;},VisuMZ['CoreEngine']['Spriteset_Base_initialize']=Spriteset_Base[_0x3beee9(0x413)][_0x3beee9(0x59a)],Spriteset_Base[_0x3beee9(0x413)][_0x3beee9(0x59a)]=function(){const _0x41704c=_0x3beee9;VisuMZ[_0x41704c(0x186)][_0x41704c(0x81c)][_0x41704c(0x573)](this),this[_0x41704c(0x211)]();},Spriteset_Base[_0x3beee9(0x413)][_0x3beee9(0x211)]=function(){const _0x4bd8d2=_0x3beee9;this[_0x4bd8d2(0x58a)]=[],this[_0x4bd8d2(0x513)]=[],this[_0x4bd8d2(0x1f7)]=this[_0x4bd8d2(0x1d3)]['x'],this[_0x4bd8d2(0xd7)]=this['scale']['y'];},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x2c2)]=Spriteset_Base['prototype'][_0x3beee9(0x3e3)],Spriteset_Base[_0x3beee9(0x413)]['destroy']=function(_0x58738b){const _0x483715=_0x3beee9;this[_0x483715(0x34f)](),this[_0x483715(0x468)](),VisuMZ['CoreEngine'][_0x483715(0x2c2)][_0x483715(0x573)](this,_0x58738b);},VisuMZ['CoreEngine'][_0x3beee9(0x3a9)]=Spriteset_Base['prototype'][_0x3beee9(0x682)],Spriteset_Base['prototype'][_0x3beee9(0x682)]=function(){const _0x1b52e5=_0x3beee9;VisuMZ[_0x1b52e5(0x186)][_0x1b52e5(0x3a9)][_0x1b52e5(0x573)](this),this[_0x1b52e5(0x19a)](),this[_0x1b52e5(0x1ea)](),this[_0x1b52e5(0x57d)](),this[_0x1b52e5(0x2d3)]();},Spriteset_Base[_0x3beee9(0x413)][_0x3beee9(0x19a)]=function(){},Spriteset_Base[_0x3beee9(0x413)][_0x3beee9(0x1ea)]=function(){const _0x4ba1b0=_0x3beee9;if(!VisuMZ['CoreEngine']['Settings'][_0x4ba1b0(0x72e)][_0x4ba1b0(0x2ed)])return;if(this[_0x4ba1b0(0x1f7)]===this['scale']['x']&&this[_0x4ba1b0(0xd7)]===this[_0x4ba1b0(0x1d3)]['y'])return;this[_0x4ba1b0(0x72c)](),this['_cacheScaleX']=this[_0x4ba1b0(0x1d3)]['x'],this[_0x4ba1b0(0xd7)]=this[_0x4ba1b0(0x1d3)]['y'];},Spriteset_Base['prototype'][_0x3beee9(0x72c)]=function(){const _0x44be59=_0x3beee9;if(SceneManager['isSceneMap']()&&Spriteset_Map['DETACH_PICTURE_CONTAINER'])return;else{if(SceneManager[_0x44be59(0x3dc)]()&&Spriteset_Battle['DETACH_PICTURE_CONTAINER'])return;}this['scale']['x']!==0x0&&(this[_0x44be59(0x14f)][_0x44be59(0x1d3)]['x']=0x1/this[_0x44be59(0x1d3)]['x'],this['_pictureContainer']['x']=-(this['x']/this['scale']['x'])),this[_0x44be59(0x1d3)]['y']!==0x0&&(this['_pictureContainer']['scale']['y']=0x1/this[_0x44be59(0x1d3)]['y'],this[_0x44be59(0x14f)]['y']=-(this['y']/this[_0x44be59(0x1d3)]['y']));},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x3c1)]=Spriteset_Base[_0x3beee9(0x413)][_0x3beee9(0x533)],Spriteset_Base['prototype'][_0x3beee9(0x533)]=function(){const _0x338922=_0x3beee9;VisuMZ[_0x338922(0x186)][_0x338922(0x3c1)][_0x338922(0x573)](this),this['updatePositionCoreEngine']();},Spriteset_Base[_0x3beee9(0x413)][_0x3beee9(0x375)]=function(){const _0x43446e=_0x3beee9;if(!$gameScreen)return;if($gameScreen[_0x43446e(0x96)]<=0x0)return;this['x']-=Math['round']($gameScreen['shake']());const _0x49efe8=$gameScreen[_0x43446e(0x449)]();switch($gameScreen[_0x43446e(0x449)]()){case _0x43446e(0x388):this[_0x43446e(0x3e9)]();break;case _0x43446e(0x767):this[_0x43446e(0x4d2)]();break;case'vertical':this[_0x43446e(0x7c5)]();break;default:this[_0x43446e(0x25b)]();break;}},Spriteset_Base['prototype'][_0x3beee9(0x3e9)]=function(){const _0x1a239b=_0x3beee9,_0x2d3250=VisuMZ[_0x1a239b(0x186)]['Settings'][_0x1a239b(0x740)];if(_0x2d3250&&_0x2d3250[_0x1a239b(0x495)])return _0x2d3250['originalJS']['call'](this);this['x']+=Math[_0x1a239b(0x368)]($gameScreen[_0x1a239b(0x4cf)]());},Spriteset_Base[_0x3beee9(0x413)][_0x3beee9(0x25b)]=function(){const _0xd3ee92=_0x3beee9,_0x596656=VisuMZ['CoreEngine'][_0xd3ee92(0x46c)][_0xd3ee92(0x740)];if(_0x596656&&_0x596656[_0xd3ee92(0x336)])return _0x596656[_0xd3ee92(0x336)]['call'](this);const _0x53d540=$gameScreen[_0xd3ee92(0x306)]*0.75,_0x49083f=$gameScreen[_0xd3ee92(0x75e)]*0.6,_0x4ac8d8=$gameScreen[_0xd3ee92(0x96)];this['x']+=Math[_0xd3ee92(0x368)](Math['randomInt'](_0x53d540)-Math[_0xd3ee92(0x4fe)](_0x49083f))*(Math[_0xd3ee92(0x142)](_0x4ac8d8,0x1e)*0.5),this['y']+=Math[_0xd3ee92(0x368)](Math[_0xd3ee92(0x4fe)](_0x53d540)-Math[_0xd3ee92(0x4fe)](_0x49083f))*(Math[_0xd3ee92(0x142)](_0x4ac8d8,0x1e)*0.5);},Spriteset_Base['prototype']['updatePositionCoreEngineShakeHorz']=function(){const _0x4ea250=_0x3beee9,_0x10ef7a=VisuMZ['CoreEngine']['Settings']['ScreenShake'];if(_0x10ef7a&&_0x10ef7a['horzJS'])return _0x10ef7a[_0x4ea250(0x3fa)][_0x4ea250(0x573)](this);const _0x4e9775=$gameScreen[_0x4ea250(0x306)]*0.75,_0x224bb0=$gameScreen[_0x4ea250(0x75e)]*0.6,_0x41e8ce=$gameScreen['_shakeDuration'];this['x']+=Math[_0x4ea250(0x368)](Math['randomInt'](_0x4e9775)-Math[_0x4ea250(0x4fe)](_0x224bb0))*(Math['min'](_0x41e8ce,0x1e)*0.5);},Spriteset_Base[_0x3beee9(0x413)]['updatePositionCoreEngineShakeVert']=function(){const _0x32edcb=_0x3beee9,_0x40fb70=VisuMZ[_0x32edcb(0x186)][_0x32edcb(0x46c)]['ScreenShake'];if(_0x40fb70&&_0x40fb70[_0x32edcb(0x103)])return _0x40fb70[_0x32edcb(0x103)][_0x32edcb(0x573)](this);const _0x49e794=$gameScreen['_shakePower']*0.75,_0x39b7c4=$gameScreen[_0x32edcb(0x75e)]*0.6,_0x5e3fa2=$gameScreen[_0x32edcb(0x96)];this['y']+=Math[_0x32edcb(0x368)](Math[_0x32edcb(0x4fe)](_0x49e794)-Math[_0x32edcb(0x4fe)](_0x39b7c4))*(Math[_0x32edcb(0x142)](_0x5e3fa2,0x1e)*0.5);},Spriteset_Base[_0x3beee9(0x413)][_0x3beee9(0x57d)]=function(){const _0x585f06=_0x3beee9;for(const _0x5ebafa of this[_0x585f06(0x58a)]){!_0x5ebafa['isPlaying']()&&this[_0x585f06(0x4ae)](_0x5ebafa);}this[_0x585f06(0x78e)]();},Spriteset_Base[_0x3beee9(0x413)][_0x3beee9(0x78e)]=function(){const _0x2a9dfc=_0x3beee9;for(;;){const _0x3fcf5d=$gameTemp[_0x2a9dfc(0x124)]();if(_0x3fcf5d)this[_0x2a9dfc(0x18f)](_0x3fcf5d);else break;}},Spriteset_Base[_0x3beee9(0x413)][_0x3beee9(0x18f)]=function(_0x271bf1){const _0x176382=_0x3beee9,_0x40ee73=$dataAnimations[_0x271bf1[_0x176382(0x744)]],_0x14f99b=_0x271bf1[_0x176382(0x357)],_0x166dca=_0x271bf1['mirror'],_0xec808f=_0x271bf1['mute'];let _0x333fe2=this[_0x176382(0x531)]();const _0x4e4a8a=this[_0x176382(0xd2)]();if(this[_0x176382(0x724)](_0x40ee73))for(const _0xe2cf3 of _0x14f99b){this['createFauxAnimationSprite']([_0xe2cf3],_0x40ee73,_0x166dca,_0x333fe2,_0xec808f),_0x333fe2+=_0x4e4a8a;}else this[_0x176382(0x52d)](_0x14f99b,_0x40ee73,_0x166dca,_0x333fe2,_0xec808f);},Spriteset_Base[_0x3beee9(0x413)][_0x3beee9(0x65d)]=function(_0x5805ad,_0x1f7728,_0x29a951,_0x31be72){const _0x156be3=_0x3beee9,_0xcbc4bc=this[_0x156be3(0x22b)](_0x1f7728),_0x18d583=new(_0xcbc4bc?Sprite_AnimationMV:Sprite_Animation)(),_0x5035c2=this[_0x156be3(0x7d2)](_0x5805ad),_0x2fa0b1=this[_0x156be3(0x531)](),_0x1b2fa7=_0x31be72>_0x2fa0b1?this['lastAnimationSprite']():null;this[_0x156be3(0x7a9)](_0x5805ad[0x0])&&(_0x29a951=!_0x29a951),_0x18d583[_0x156be3(0x5b5)]=_0x5805ad,_0x18d583[_0x156be3(0x53b)](_0x5035c2,_0x1f7728,_0x29a951,_0x31be72,_0x1b2fa7),this[_0x156be3(0xb2)](_0x18d583),this[_0x156be3(0x5b6)][_0x156be3(0x188)](_0x18d583);},Spriteset_Base[_0x3beee9(0x413)]['createFauxAnimationSprite']=function(_0x27216b,_0x4a56a3,_0x4a1579,_0x143e78,_0x54a18a){const _0x11c38d=_0x3beee9,_0x14908f=this[_0x11c38d(0x22b)](_0x4a56a3),_0x315991=new(_0x14908f?Sprite_AnimationMV:Sprite_Animation)(),_0x18b473=this[_0x11c38d(0x7d2)](_0x27216b);this[_0x11c38d(0x7a9)](_0x27216b[0x0])&&(_0x4a1579=!_0x4a1579);_0x315991[_0x11c38d(0x5b5)]=_0x27216b,_0x315991[_0x11c38d(0x53b)](_0x18b473,_0x4a56a3,_0x4a1579,_0x143e78),_0x315991[_0x11c38d(0x80e)](_0x54a18a),this['addAnimationSpriteToContainer'](_0x315991);if(this[_0x11c38d(0x5b6)])this[_0x11c38d(0x5b6)][_0x11c38d(0x3c6)](_0x315991);this[_0x11c38d(0x58a)]['push'](_0x315991);},Spriteset_Base[_0x3beee9(0x413)]['addAnimationSpriteToContainer']=function(_0x27f023){const _0x55ad0c=_0x3beee9;this[_0x55ad0c(0x775)][_0x55ad0c(0x343)](_0x27f023);},Spriteset_Base['prototype'][_0x3beee9(0x393)]=function(_0x25c4fa){const _0x17e372=_0x3beee9;this[_0x17e372(0x5b6)][_0x17e372(0x3c6)](_0x25c4fa),this[_0x17e372(0x6bb)](_0x25c4fa);for(const _0x57e956 of _0x25c4fa[_0x17e372(0x5b5)]){_0x57e956[_0x17e372(0x81d)]&&_0x57e956[_0x17e372(0x81d)]();}_0x25c4fa[_0x17e372(0x3e3)]();},Spriteset_Base[_0x3beee9(0x413)][_0x3beee9(0x4ae)]=function(_0x1dfb96){const _0x59a409=_0x3beee9;this[_0x59a409(0x58a)][_0x59a409(0x3c6)](_0x1dfb96),this['removeAnimationFromContainer'](_0x1dfb96);for(const _0x55d794 of _0x1dfb96[_0x59a409(0x5b5)]){_0x55d794['endAnimation']&&_0x55d794[_0x59a409(0x81d)]();}_0x1dfb96['destroy']();},Spriteset_Base[_0x3beee9(0x413)][_0x3beee9(0x6bb)]=function(_0x1c4d58){const _0x4381d4=_0x3beee9;this[_0x4381d4(0x775)][_0x4381d4(0x32b)](_0x1c4d58);},Spriteset_Base[_0x3beee9(0x413)][_0x3beee9(0x34f)]=function(){const _0xab681=_0x3beee9;for(const _0x2b7d7e of this['_fauxAnimationSprites']){this[_0xab681(0x4ae)](_0x2b7d7e);}},Spriteset_Base[_0x3beee9(0x413)][_0x3beee9(0x59c)]=function(){const _0x4ec411=_0x3beee9;return this[_0x4ec411(0x58a)][_0x4ec411(0x228)]>0x0;},Spriteset_Base['prototype'][_0x3beee9(0x2d3)]=function(){const _0x39a161=_0x3beee9;for(const _0x2c762d of this['_pointAnimationSprites']){!_0x2c762d[_0x39a161(0x1c8)]()&&this[_0x39a161(0x59e)](_0x2c762d);}this[_0x39a161(0x7fb)]();},Spriteset_Base[_0x3beee9(0x413)][_0x3beee9(0x7fb)]=function(){const _0x59cd3a=_0x3beee9;for(;;){const _0x400b6a=$gameTemp[_0x59cd3a(0x258)]();if(_0x400b6a)this[_0x59cd3a(0x2ee)](_0x400b6a);else break;}},Spriteset_Base[_0x3beee9(0x413)][_0x3beee9(0x2ee)]=function(_0x2102a6){const _0x5a0cfa=_0x3beee9,_0x2ea4d1=$dataAnimations[_0x2102a6[_0x5a0cfa(0x744)]],_0x1c3730=this[_0x5a0cfa(0x27c)](_0x2102a6),_0x4ec389=_0x2102a6[_0x5a0cfa(0x731)],_0x57e9d3=_0x2102a6[_0x5a0cfa(0x516)];let _0x377dd2=this['animationBaseDelay']();const _0x4b5035=this[_0x5a0cfa(0xd2)]();if(this[_0x5a0cfa(0x724)](_0x2ea4d1))for(const _0x35f7e6 of _0x1c3730){this[_0x5a0cfa(0x7c0)]([_0x35f7e6],_0x2ea4d1,_0x4ec389,_0x377dd2,_0x57e9d3),_0x377dd2+=_0x4b5035;}else this[_0x5a0cfa(0x7c0)](_0x1c3730,_0x2ea4d1,_0x4ec389,_0x377dd2,_0x57e9d3);},Spriteset_Base[_0x3beee9(0x413)][_0x3beee9(0x27c)]=function(_0x309136){const _0xc2c20=_0x3beee9,_0x5febd6=new Sprite_Clickable(),_0x542b23=this[_0xc2c20(0x288)]();_0x5febd6['x']=_0x309136['x']-_0x542b23['x'],_0x5febd6['y']=_0x309136['y']-_0x542b23['y'],_0x5febd6['z']=0x64;const _0x31935a=this['getPointAnimationLayer']();return _0x31935a[_0xc2c20(0x343)](_0x5febd6),[_0x5febd6];},Spriteset_Base[_0x3beee9(0x413)][_0x3beee9(0x288)]=function(){return this;},Spriteset_Map[_0x3beee9(0x413)][_0x3beee9(0x288)]=function(){const _0x23a4ea=_0x3beee9;return this[_0x23a4ea(0x196)]||this;},Spriteset_Battle[_0x3beee9(0x413)][_0x3beee9(0x288)]=function(){const _0x1aaf92=_0x3beee9;return this[_0x1aaf92(0x29e)]||this;},Spriteset_Base['prototype'][_0x3beee9(0x7c0)]=function(_0x90ddb0,_0x2303d7,_0x5bdaf2,_0x1bbbce,_0x13d996){const _0x2fefc2=_0x3beee9,_0x1aaa26=this[_0x2fefc2(0x22b)](_0x2303d7),_0x1dc959=new(_0x1aaa26?Sprite_AnimationMV:Sprite_Animation)();_0x1dc959['targetObjects']=_0x90ddb0,_0x1dc959[_0x2fefc2(0x53b)](_0x90ddb0,_0x2303d7,_0x5bdaf2,_0x1bbbce),_0x1dc959['setMute'](_0x13d996),this['addAnimationSpriteToContainer'](_0x1dc959),this[_0x2fefc2(0x513)][_0x2fefc2(0x188)](_0x1dc959);},Spriteset_Base['prototype']['removePointAnimation']=function(_0x5776c3){const _0x47abc8=_0x3beee9;this[_0x47abc8(0x513)][_0x47abc8(0x3c6)](_0x5776c3),this[_0x47abc8(0x775)]['removeChild'](_0x5776c3);for(const _0x57ad7f of _0x5776c3[_0x47abc8(0x5b5)]){_0x57ad7f['endAnimation']&&_0x57ad7f[_0x47abc8(0x81d)]();const _0x33ec2e=this['getPointAnimationLayer']();if(_0x33ec2e)_0x33ec2e['removeChild'](_0x57ad7f);}_0x5776c3['destroy']();},Spriteset_Base[_0x3beee9(0x413)][_0x3beee9(0x468)]=function(){const _0x2050b0=_0x3beee9;for(const _0x42dd03 of this[_0x2050b0(0x513)]){this[_0x2050b0(0x59e)](_0x42dd03);}},Spriteset_Base[_0x3beee9(0x413)][_0x3beee9(0x3b8)]=function(){const _0x68e222=_0x3beee9;return this[_0x68e222(0x513)][_0x68e222(0x228)]>0x0;},VisuMZ[_0x3beee9(0x186)]['Spriteset_Base_isAnimationPlaying']=Spriteset_Base[_0x3beee9(0x413)]['isAnimationPlaying'],Spriteset_Base[_0x3beee9(0x413)][_0x3beee9(0x9c)]=function(){const _0x39cd6b=_0x3beee9;return VisuMZ['CoreEngine'][_0x39cd6b(0x641)]['call'](this)||this[_0x39cd6b(0x3b8)]();},Spriteset_Map['DETACH_PICTURE_CONTAINER']=VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x46c)][_0x3beee9(0x72e)][_0x3beee9(0x62d)]||![],VisuMZ['CoreEngine'][_0x3beee9(0x664)]=Scene_Map[_0x3beee9(0x413)]['createSpriteset'],Scene_Map[_0x3beee9(0x413)][_0x3beee9(0x1d1)]=function(){const _0x2e2d46=_0x3beee9;VisuMZ[_0x2e2d46(0x186)]['Scene_Map_createSpriteset_detach'][_0x2e2d46(0x573)](this);if(!Spriteset_Map['DETACH_PICTURE_CONTAINER'])return;const _0x2085f2=this[_0x2e2d46(0x687)];if(!_0x2085f2)return;this[_0x2e2d46(0x14f)]=_0x2085f2[_0x2e2d46(0x14f)];if(!this[_0x2e2d46(0x14f)])return;this[_0x2e2d46(0x343)](this[_0x2e2d46(0x14f)]);},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x95)]=Spriteset_Map[_0x3beee9(0x413)][_0x3beee9(0x3c8)],Spriteset_Map[_0x3beee9(0x413)]['createTilemap']=function(){const _0x1bc9e6=_0x3beee9;VisuMZ[_0x1bc9e6(0x186)][_0x1bc9e6(0x95)][_0x1bc9e6(0x573)](this),this[_0x1bc9e6(0x25e)]();},Spriteset_Map[_0x3beee9(0x413)][_0x3beee9(0x25e)]=function(){const _0x298964=_0x3beee9,_0x51fbfc=$gameMap[_0x298964(0x5d4)]();if(!_0x51fbfc)return;const _0x59294b=$gameMap['getTileExtendTerrainTags']();if(Object[_0x298964(0x4dc)](_0x59294b)[_0x298964(0x228)]<=0x0)return;const _0x5e3273=$gameMap['tilesetFlags']();this['_tileExtendSprites']=this[_0x298964(0x4b8)]||[];for(let _0x561ac4=0x0;_0x561ac4<$gameMap['height']();_0x561ac4++){for(let _0x5effcd=0x0;_0x5effcd<$gameMap[_0x298964(0x227)]();_0x5effcd++){for(const _0x89c210 of $gameMap['layeredTiles'](_0x5effcd,_0x561ac4)){const _0x4220e7=_0x5e3273[_0x89c210]>>0xc,_0x4870c0=_0x59294b[_0x4220e7]||0x0;if(_0x4870c0<=0x0)continue;this[_0x298964(0x33f)](_0x5effcd,_0x561ac4,_0x89c210,_0x4870c0);}}}},Spriteset_Map[_0x3beee9(0x413)]['removeTileExtendSprites']=function(){const _0x57d6d0=_0x3beee9;this['_tileExtendSprites']=this['_tileExtendSprites']||[];for(const _0x3e840e of this[_0x57d6d0(0x4b8)]){this[_0x57d6d0(0x196)]['removeChild'](_0x3e840e);}this[_0x57d6d0(0x4b8)]=[];},Spriteset_Map[_0x3beee9(0x413)]['createExtendedTileSprite']=function(_0x3b7811,_0x9e9333,_0x28a0d7,_0x1a9010){const _0x87228b=_0x3beee9,_0x52f5d9=new Sprite_ExtendedTile(_0x3b7811,_0x9e9333,_0x28a0d7,_0x1a9010),_0x51e058=$gameMap[_0x87228b(0x73d)]();_0x51e058[_0x28a0d7]&0x10?_0x52f5d9['z']=0x4:_0x52f5d9['z']=0x3,this[_0x87228b(0x196)][_0x87228b(0x343)](_0x52f5d9),this['_tileExtendSprites'][_0x87228b(0x188)](_0x52f5d9);},VisuMZ[_0x3beee9(0x186)]['Tilemap_addSpotTile']=Tilemap[_0x3beee9(0x413)]['_addSpotTile'],Tilemap['prototype'][_0x3beee9(0x20f)]=function(_0x469976,_0x21aa73,_0x34cdca){const _0x1b5141=_0x3beee9;if($gameMap['isTileExtended'](_0x469976))return;VisuMZ['CoreEngine'][_0x1b5141(0x6d6)]['call'](this,_0x469976,_0x21aa73,_0x34cdca);},Spriteset_Battle['DETACH_PICTURE_CONTAINER']=VisuMZ[_0x3beee9(0x186)]['Settings'][_0x3beee9(0x72e)][_0x3beee9(0x6d8)]||![],VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x761)]=Scene_Battle[_0x3beee9(0x413)][_0x3beee9(0x1d1)],Scene_Battle[_0x3beee9(0x413)][_0x3beee9(0x1d1)]=function(){const _0x19eff6=_0x3beee9;VisuMZ[_0x19eff6(0x186)][_0x19eff6(0x761)][_0x19eff6(0x573)](this);if(!Spriteset_Battle[_0x19eff6(0x3ba)])return;const _0x44d4f9=this[_0x19eff6(0x687)];if(!_0x44d4f9)return;this[_0x19eff6(0x14f)]=_0x44d4f9[_0x19eff6(0x14f)];if(!this[_0x19eff6(0x14f)])return;this['addChild'](this['_pictureContainer']);},Spriteset_Battle[_0x3beee9(0x413)][_0x3beee9(0xa3)]=function(){const _0x5dbb5a=_0x3beee9;this['_backgroundFilter']=new PIXI[(_0x5dbb5a(0x6a5))][(_0x5dbb5a(0x4f9))](clamp=!![]),this['_backgroundSprite']=new Sprite(),this['_backgroundSprite'][_0x5dbb5a(0x3ad)]=SceneManager[_0x5dbb5a(0x22c)](),this[_0x5dbb5a(0x577)][_0x5dbb5a(0x6a5)]=[this['_backgroundFilter']],this['_baseSprite']['addChild'](this[_0x5dbb5a(0x577)]);},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x341)]=Spriteset_Battle[_0x3beee9(0x413)][_0x3beee9(0x757)],Spriteset_Battle[_0x3beee9(0x413)][_0x3beee9(0x757)]=function(){const _0x2c435c=_0x3beee9;this[_0x2c435c(0x831)]()&&this[_0x2c435c(0x63c)](),VisuMZ[_0x2c435c(0x186)]['Spriteset_Battle_createEnemies']['call'](this);},Spriteset_Battle[_0x3beee9(0x413)][_0x3beee9(0x831)]=function(){const _0x460c6f=_0x3beee9,_0x176c0f=VisuMZ[_0x460c6f(0x186)][_0x460c6f(0x46c)][_0x460c6f(0x4c2)];if(!_0x176c0f)return![];if(Utils[_0x460c6f(0x6e0)]>=_0x460c6f(0x816)&&!_0x176c0f[_0x460c6f(0xe4)])return![];return _0x176c0f[_0x460c6f(0x4ff)];},Spriteset_Battle[_0x3beee9(0x413)]['repositionEnemiesByResolution']=function(){const _0x1c0bfa=_0x3beee9;for(member of $gameTroop[_0x1c0bfa(0x22f)]()){member[_0x1c0bfa(0x4ac)]();}},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0xed)]=Window_Base['prototype'][_0x3beee9(0x59a)],Window_Base[_0x3beee9(0x413)]['initialize']=function(_0x41cee6){const _0x419bca=_0x3beee9;_0x41cee6['x']=Math[_0x419bca(0x368)](_0x41cee6['x']),_0x41cee6['y']=Math['round'](_0x41cee6['y']),_0x41cee6[_0x419bca(0x227)]=Math['round'](_0x41cee6[_0x419bca(0x227)]),_0x41cee6['height']=Math[_0x419bca(0x368)](_0x41cee6[_0x419bca(0x428)]),this[_0x419bca(0x47e)](),VisuMZ[_0x419bca(0x186)][_0x419bca(0xed)]['call'](this,_0x41cee6),this['initCoreEasing']();},Window_Base['prototype'][_0x3beee9(0x47e)]=function(){const _0x5ada18=_0x3beee9;this['_digitGrouping']=VisuMZ[_0x5ada18(0x186)][_0x5ada18(0x46c)]['QoL'][_0x5ada18(0xc1)],this['_digitGroupingEx']=VisuMZ[_0x5ada18(0x186)][_0x5ada18(0x46c)][_0x5ada18(0x72e)][_0x5ada18(0x11b)];},Window_Base[_0x3beee9(0x413)]['lineHeight']=function(){const _0x32109a=_0x3beee9;return VisuMZ[_0x32109a(0x186)][_0x32109a(0x46c)][_0x32109a(0x1e8)][_0x32109a(0x459)];},Window_Base[_0x3beee9(0x413)][_0x3beee9(0x55e)]=function(){const _0xcb95a6=_0x3beee9;return VisuMZ[_0xcb95a6(0x186)]['Settings'][_0xcb95a6(0x1e8)][_0xcb95a6(0x1ac)];},Window_Base[_0x3beee9(0x413)]['updateBackOpacity']=function(){const _0x19a422=_0x3beee9;$gameSystem[_0x19a422(0x370)]?this[_0x19a422(0x58e)]=$gameSystem[_0x19a422(0x370)]():this[_0x19a422(0x58e)]=VisuMZ[_0x19a422(0x186)]['Settings']['Window'][_0x19a422(0x7d7)];},Window_Base[_0x3beee9(0x413)][_0x3beee9(0x201)]=function(){const _0x503f23=_0x3beee9;return VisuMZ[_0x503f23(0x186)]['Settings']['Window']['TranslucentOpacity'];},Window_Base[_0x3beee9(0x413)][_0x3beee9(0x1be)]=function(){const _0x41b5a2=_0x3beee9;return VisuMZ[_0x41b5a2(0x186)][_0x41b5a2(0x46c)][_0x41b5a2(0x1e8)][_0x41b5a2(0xbe)];},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x555)]=Window_Base['prototype'][_0x3beee9(0x682)],Window_Base['prototype'][_0x3beee9(0x682)]=function(){const _0x23df39=_0x3beee9;VisuMZ[_0x23df39(0x186)][_0x23df39(0x555)][_0x23df39(0x573)](this),this['updateCoreEasing']();},Window_Base['prototype'][_0x3beee9(0x677)]=function(){const _0x502c52=_0x3beee9;this['_opening']&&(this['openness']+=this[_0x502c52(0x1be)](),this[_0x502c52(0x5fb)]()&&(this[_0x502c52(0x194)]=![]));},Window_Base[_0x3beee9(0x413)][_0x3beee9(0x3d8)]=function(){const _0x4ae22b=_0x3beee9;this[_0x4ae22b(0x822)]&&(this[_0x4ae22b(0x1a9)]-=this[_0x4ae22b(0x1be)](),this['isClosed']()&&(this[_0x4ae22b(0x822)]=![]));},VisuMZ[_0x3beee9(0x186)]['Window_Base_drawText']=Window_Base[_0x3beee9(0x413)][_0x3beee9(0x48f)],Window_Base['prototype'][_0x3beee9(0x48f)]=function(_0xdbff80,_0x36daf8,_0x375c5d,_0x59728a,_0x177a7a){const _0x4d52f4=_0x3beee9;if(this[_0x4d52f4(0x48b)]())_0xdbff80=VisuMZ['GroupDigits'](_0xdbff80);VisuMZ[_0x4d52f4(0x186)][_0x4d52f4(0x855)]['call'](this,_0xdbff80,_0x36daf8,_0x375c5d,_0x59728a,_0x177a7a);},Window_Base[_0x3beee9(0x413)][_0x3beee9(0x48b)]=function(){const _0x5f507a=_0x3beee9;return this[_0x5f507a(0x53e)];},VisuMZ['CoreEngine'][_0x3beee9(0x80a)]=Window_Base[_0x3beee9(0x413)][_0x3beee9(0x229)],Window_Base[_0x3beee9(0x413)][_0x3beee9(0x229)]=function(_0x5a4a57,_0x131f13,_0x2a1c22,_0x30eee2){const _0x554af6=_0x3beee9;var _0x21b124=VisuMZ[_0x554af6(0x186)]['Window_Base_createTextState'][_0x554af6(0x573)](this,_0x5a4a57,_0x131f13,_0x2a1c22,_0x30eee2);if(this[_0x554af6(0x4c7)]())_0x21b124[_0x554af6(0x361)]=String(VisuMZ[_0x554af6(0x79d)](_0x21b124[_0x554af6(0x361)]))||'';return _0x21b124;},Window_Base['prototype']['useDigitGroupingEx']=function(){const _0x40dae0=_0x3beee9;return this[_0x40dae0(0x6da)];},Window_Base['prototype'][_0x3beee9(0x18e)]=function(_0x5d42a5){const _0x2580ab=_0x3beee9;this[_0x2580ab(0x53e)]=_0x5d42a5;},Window_Base[_0x3beee9(0x413)][_0x3beee9(0x789)]=function(_0x5d2368){const _0x5d4992=_0x3beee9;this[_0x5d4992(0x6da)]=_0x5d2368;},VisuMZ[_0x3beee9(0x186)]['Window_Base_drawIcon']=Window_Base[_0x3beee9(0x413)]['drawIcon'],Window_Base['prototype']['drawIcon']=function(_0x2f0335,_0x1183d9,_0x59dd00){const _0xe2a77=_0x3beee9;_0x1183d9=Math['round'](_0x1183d9),_0x59dd00=Math[_0xe2a77(0x368)](_0x59dd00),VisuMZ[_0xe2a77(0x186)]['Window_Base_drawIcon'][_0xe2a77(0x573)](this,_0x2f0335,_0x1183d9,_0x59dd00);},VisuMZ[_0x3beee9(0x186)]['Window_Base_drawFace']=Window_Base[_0x3beee9(0x413)]['drawFace'],Window_Base['prototype'][_0x3beee9(0x707)]=function(_0x5222bc,_0x564a39,_0x36d6bf,_0xc8d0ed,_0x4e7c8c,_0x555e70){const _0x55f161=_0x3beee9;_0x4e7c8c=_0x4e7c8c||ImageManager['faceWidth'],_0x555e70=_0x555e70||ImageManager[_0x55f161(0x1fb)],_0x36d6bf=Math[_0x55f161(0x368)](_0x36d6bf),_0xc8d0ed=Math[_0x55f161(0x368)](_0xc8d0ed),_0x4e7c8c=Math[_0x55f161(0x368)](_0x4e7c8c),_0x555e70=Math[_0x55f161(0x368)](_0x555e70),VisuMZ[_0x55f161(0x186)][_0x55f161(0x18a)][_0x55f161(0x573)](this,_0x5222bc,_0x564a39,_0x36d6bf,_0xc8d0ed,_0x4e7c8c,_0x555e70);},VisuMZ[_0x3beee9(0x186)]['Window_Base_drawCharacter']=Window_Base[_0x3beee9(0x413)][_0x3beee9(0x261)],Window_Base['prototype']['drawCharacter']=function(_0x280e95,_0x5ae00f,_0x37c779,_0x2116e8){const _0x5720c7=_0x3beee9;_0x37c779=Math[_0x5720c7(0x368)](_0x37c779),_0x2116e8=Math['round'](_0x2116e8),VisuMZ['CoreEngine']['Window_Base_drawCharacter'][_0x5720c7(0x573)](this,_0x280e95,_0x5ae00f,_0x37c779,_0x2116e8);},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x85c)]=Window_Selectable[_0x3beee9(0x413)][_0x3beee9(0x45b)],Window_Selectable[_0x3beee9(0x413)][_0x3beee9(0x45b)]=function(_0x3cb1bc){const _0x5d90ce=_0x3beee9;let _0x168b73=VisuMZ[_0x5d90ce(0x186)][_0x5d90ce(0x85c)]['call'](this,_0x3cb1bc);return _0x168b73['x']=Math[_0x5d90ce(0x368)](_0x168b73['x']),_0x168b73['y']=Math[_0x5d90ce(0x368)](_0x168b73['y']),_0x168b73[_0x5d90ce(0x227)]=Math['round'](_0x168b73[_0x5d90ce(0x227)]),_0x168b73['height']=Math[_0x5d90ce(0x368)](_0x168b73[_0x5d90ce(0x428)]),_0x168b73;},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x626)]=Window_StatusBase[_0x3beee9(0x413)]['drawActorSimpleStatus'],Window_StatusBase[_0x3beee9(0x413)][_0x3beee9(0x28c)]=function(_0x17556b,_0x4b916e,_0x51358c){const _0x4810e2=_0x3beee9;_0x4b916e=Math['round'](_0x4b916e),_0x51358c=Math[_0x4810e2(0x368)](_0x51358c),VisuMZ[_0x4810e2(0x186)][_0x4810e2(0x626)][_0x4810e2(0x573)](this,_0x17556b,_0x4b916e,_0x51358c);},Window_Base[_0x3beee9(0x413)][_0x3beee9(0x817)]=function(){const _0x11d17a=_0x3beee9;this[_0x11d17a(0x4e8)]={'duration':0x0,'wholeDuration':0x0,'type':_0x11d17a(0x207),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this['scale']['x'],'targetScaleY':this[_0x11d17a(0x1d3)]['y'],'targetOpacity':this[_0x11d17a(0x634)],'targetBackOpacity':this[_0x11d17a(0x58e)],'targetContentsOpacity':this[_0x11d17a(0x7bc)]};},Window_Base[_0x3beee9(0x413)]['updateCoreEasing']=function(){const _0x513f8a=_0x3beee9;if(!this[_0x513f8a(0x4e8)])return;if(this[_0x513f8a(0x4e8)][_0x513f8a(0x5af)]<=0x0)return;this['x']=this['applyCoreEasing'](this['x'],this[_0x513f8a(0x4e8)][_0x513f8a(0x38b)]),this['y']=this[_0x513f8a(0x25f)](this['y'],this[_0x513f8a(0x4e8)][_0x513f8a(0x117)]),this[_0x513f8a(0x1d3)]['x']=this[_0x513f8a(0x25f)](this[_0x513f8a(0x1d3)]['x'],this[_0x513f8a(0x4e8)][_0x513f8a(0x2d7)]),this['scale']['y']=this[_0x513f8a(0x25f)](this[_0x513f8a(0x1d3)]['y'],this[_0x513f8a(0x4e8)][_0x513f8a(0x31f)]),this[_0x513f8a(0x634)]=this['applyCoreEasing'](this[_0x513f8a(0x634)],this[_0x513f8a(0x4e8)]['targetOpacity']),this[_0x513f8a(0x58e)]=this['applyCoreEasing'](this[_0x513f8a(0x58e)],this['_coreEasing']['targetBackOpacity']),this[_0x513f8a(0x7bc)]=this[_0x513f8a(0x25f)](this[_0x513f8a(0x7bc)],this['_coreEasing'][_0x513f8a(0x550)]),this['_coreEasing'][_0x513f8a(0x5af)]--;},Window_Base[_0x3beee9(0x413)][_0x3beee9(0x25f)]=function(_0x11d853,_0x318c91){const _0x28133f=_0x3beee9;if(!this[_0x28133f(0x4e8)])return _0x318c91;const _0x3983f7=this['_coreEasing']['duration'],_0x31746e=this[_0x28133f(0x4e8)]['wholeDuration'],_0x3df665=this['calcCoreEasing']((_0x31746e-_0x3983f7)/_0x31746e),_0x5c6b76=this[_0x28133f(0x5b4)]((_0x31746e-_0x3983f7+0x1)/_0x31746e),_0x229c96=(_0x11d853-_0x318c91*_0x3df665)/(0x1-_0x3df665);return _0x229c96+(_0x318c91-_0x229c96)*_0x5c6b76;},Window_Base[_0x3beee9(0x413)][_0x3beee9(0x5b4)]=function(_0x13d3c8){const _0x58d4cf=_0x3beee9;if(!this['_coreEasing'])return _0x13d3c8;return VisuMZ[_0x58d4cf(0x429)](_0x13d3c8,this[_0x58d4cf(0x4e8)][_0x58d4cf(0x2a1)]||_0x58d4cf(0x207));},Window_Base['prototype'][_0x3beee9(0x2aa)]=function(_0x112174,_0x517411){const _0x352f7d=_0x3beee9;if(!this['_coreEasing'])return;this['x']=this['_coreEasing']['targetX'],this['y']=this['_coreEasing'][_0x352f7d(0x117)],this[_0x352f7d(0x1d3)]['x']=this[_0x352f7d(0x4e8)][_0x352f7d(0x2d7)],this['scale']['y']=this[_0x352f7d(0x4e8)][_0x352f7d(0x31f)],this[_0x352f7d(0x634)]=this[_0x352f7d(0x4e8)][_0x352f7d(0x71a)],this[_0x352f7d(0x58e)]=this[_0x352f7d(0x4e8)][_0x352f7d(0x4bf)],this[_0x352f7d(0x7bc)]=this[_0x352f7d(0x4e8)][_0x352f7d(0x550)],this[_0x352f7d(0x4bd)](_0x112174,_0x517411,this['x'],this['y'],this[_0x352f7d(0x1d3)]['x'],this[_0x352f7d(0x1d3)]['y'],this[_0x352f7d(0x634)],this[_0x352f7d(0x58e)],this[_0x352f7d(0x7bc)]);},Window_Base['prototype'][_0x3beee9(0x4bd)]=function(_0x10a96f,_0x548247,_0x7df66c,_0x5cda23,_0x2dd5b2,_0x3ade41,_0x5cbb51,_0x38eeab,_0x5e3d0e){this['_coreEasing']={'duration':_0x10a96f,'wholeDuration':_0x10a96f,'type':_0x548247,'targetX':_0x7df66c,'targetY':_0x5cda23,'targetScaleX':_0x2dd5b2,'targetScaleY':_0x3ade41,'targetOpacity':_0x5cbb51,'targetBackOpacity':_0x38eeab,'targetContentsOpacity':_0x5e3d0e};},Window_Base[_0x3beee9(0x413)][_0x3beee9(0x3ed)]=function(_0x19d1a1,_0x240296,_0x27a4ea,_0x4601fd,_0x145170){const _0x1116ae=_0x3beee9;this[_0x1116ae(0x74b)](),this[_0x1116ae(0x51f)][_0x1116ae(0x156)]=VisuMZ[_0x1116ae(0x186)][_0x1116ae(0x46c)][_0x1116ae(0x544)]['GoldFontSize'];const _0x12eff9=VisuMZ[_0x1116ae(0x186)][_0x1116ae(0x46c)][_0x1116ae(0x544)][_0x1116ae(0x55a)];if(_0x12eff9>0x0&&_0x240296===TextManager[_0x1116ae(0x3bd)]){const _0x8f08ba=_0x4601fd+(this[_0x1116ae(0x3f1)]()-ImageManager[_0x1116ae(0x559)])/0x2;this['drawIcon'](_0x12eff9,_0x27a4ea+(_0x145170-ImageManager['iconWidth']),_0x8f08ba),_0x145170-=ImageManager['iconWidth']+0x4;}else this[_0x1116ae(0x10d)](ColorManager[_0x1116ae(0x54e)]()),this[_0x1116ae(0x48f)](_0x240296,_0x27a4ea,_0x4601fd,_0x145170,_0x1116ae(0x216)),_0x145170-=this[_0x1116ae(0x74a)](_0x240296)+0x6;this['resetTextColor']();const _0xce5564=this['textWidth'](this[_0x1116ae(0x53e)]?VisuMZ[_0x1116ae(0x79d)](_0x19d1a1):_0x19d1a1);_0xce5564>_0x145170?this[_0x1116ae(0x48f)](VisuMZ['CoreEngine'][_0x1116ae(0x46c)][_0x1116ae(0x544)]['GoldOverlap'],_0x27a4ea,_0x4601fd,_0x145170,_0x1116ae(0x216)):this[_0x1116ae(0x48f)](_0x19d1a1,_0x27a4ea,_0x4601fd,_0x145170,_0x1116ae(0x216)),this[_0x1116ae(0x74b)]();},Window_Base['prototype']['drawIconBySize']=function(_0x291e81,_0x29619d,_0x539727,_0x4a65b6,_0x5e9112){const _0x47fa66=_0x3beee9,_0x4e5374=ImageManager[_0x47fa66(0x386)](_0x47fa66(0x787)),_0x5d25bc=ImageManager['iconWidth'],_0x274666=ImageManager[_0x47fa66(0x559)],_0x872a5d=_0x291e81%0x10*_0x5d25bc,_0xc3ab13=Math[_0x47fa66(0x171)](_0x291e81/0x10)*_0x274666,_0x294133=_0x4a65b6,_0x13c4bd=_0x4a65b6;this['contents'][_0x47fa66(0x738)][_0x47fa66(0x5a0)]=_0x5e9112,this['contents'][_0x47fa66(0x274)](_0x4e5374,_0x872a5d,_0xc3ab13,_0x5d25bc,_0x274666,_0x29619d,_0x539727,_0x294133,_0x13c4bd),this[_0x47fa66(0x51f)]['_context'][_0x47fa66(0x5a0)]=!![];},Window_Base[_0x3beee9(0x413)]['drawGauge']=function(_0x241c73,_0x3ac8bf,_0x4713f9,_0x49af7b,_0x245c82,_0x20cf80){const _0x27c298=_0x3beee9,_0x5bf7d0=Math[_0x27c298(0x171)]((_0x4713f9-0x2)*_0x49af7b),_0x165089=Sprite_Gauge[_0x27c298(0x413)][_0x27c298(0x6e5)][_0x27c298(0x573)](this),_0xc980b3=_0x3ac8bf+this['lineHeight']()-_0x165089-0x2;this[_0x27c298(0x51f)][_0x27c298(0x3d3)](_0x241c73,_0xc980b3,_0x4713f9,_0x165089,ColorManager[_0x27c298(0x128)]()),this[_0x27c298(0x51f)][_0x27c298(0x1fa)](_0x241c73+0x1,_0xc980b3+0x1,_0x5bf7d0,_0x165089-0x2,_0x245c82,_0x20cf80);},Window_Scrollable[_0x3beee9(0xcd)]={'enabled':VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x46c)][_0x3beee9(0x1e8)][_0x3beee9(0x44d)]??!![],'thickness':VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x46c)][_0x3beee9(0x1e8)][_0x3beee9(0x2ff)]??0x2,'offset':VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x46c)][_0x3beee9(0x1e8)]['BarOffset']??0x2,'bodyColor':VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x46c)][_0x3beee9(0x1e8)][_0x3beee9(0x726)]??0x0,'offColor':VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x46c)][_0x3beee9(0x1e8)][_0x3beee9(0x155)]??0x7,'offOpacity':VisuMZ['CoreEngine'][_0x3beee9(0x46c)][_0x3beee9(0x1e8)]['OffBarOpacity']??0x80},Window_Base['prototype'][_0x3beee9(0x22e)]=function(){const _0x15e691=_0x3beee9;return Window_Scrollable[_0x15e691(0xcd)][_0x15e691(0x5a7)]&&Window_Scrollable[_0x15e691(0xcd)]['thickness']>0x0;},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x7f7)]=Window_Base['prototype'][_0x3beee9(0x606)],Window_Base['prototype'][_0x3beee9(0x606)]=function(){const _0x284c69=_0x3beee9;VisuMZ['CoreEngine'][_0x284c69(0x7f7)][_0x284c69(0x573)](this),this[_0x284c69(0x15c)](),this[_0x284c69(0x5d6)](!![]),this[_0x284c69(0x5d6)](![]);},Window_Base[_0x3beee9(0x413)][_0x3beee9(0x15c)]=function(){const _0x4511c7=_0x3beee9;if(!this[_0x4511c7(0x22e)]())return;if(this[_0x4511c7(0x3d4)]||this[_0x4511c7(0x746)])return;this[_0x4511c7(0x14c)]={'horz':null,'vert':null,'maxHorz':null,'maxVert':null},this['_scrollBarHorz']=new Sprite(),this['_scrollBarVert']=new Sprite(),this['addChild'](this['_scrollBarHorz']),this['addChild'](this[_0x4511c7(0x746)]);},Window_Base[_0x3beee9(0x413)]['setupScrollBarBitmap']=function(_0x49be53){const _0x19c3ef=_0x3beee9,_0x2a388b=_0x49be53?this['_scrollBarHorz']:this[_0x19c3ef(0x746)];if(!_0x2a388b)return;const _0x28c68e=Window_Scrollable['SCROLLBAR'],_0x2a48c1=_0x28c68e[_0x19c3ef(0x106)],_0x2b8697=_0x49be53?this['innerWidth']-_0x2a48c1*0x2:_0x2a48c1,_0x35f4a8=_0x49be53?_0x2a48c1:this[_0x19c3ef(0x30d)]-_0x2a48c1*0x2;_0x2a388b[_0x19c3ef(0x3ad)]=new Bitmap(_0x2b8697,_0x35f4a8),_0x2a388b[_0x19c3ef(0x269)](0x0,0x0,_0x2b8697,_0x35f4a8),this['updateScrollBarPosition'](_0x49be53);},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x1e9)]=Window_Base['prototype']['destroyContents'],Window_Base[_0x3beee9(0x413)]['destroyContents']=function(){const _0x2f540e=_0x3beee9;VisuMZ[_0x2f540e(0x186)][_0x2f540e(0x1e9)]['call'](this),this[_0x2f540e(0x488)]();},Window_Base['prototype'][_0x3beee9(0x488)]=function(){const _0x42b598=_0x3beee9,_0x51253e=[this[_0x42b598(0x3d4)],this['_scrollBarVert']];for(const _0x57649d of _0x51253e){if(_0x57649d&&_0x57649d[_0x42b598(0x3ad)])_0x57649d[_0x42b598(0x3ad)]['destroy']();}},VisuMZ['CoreEngine'][_0x3beee9(0x4a5)]=Window_Scrollable['prototype']['update'],Window_Scrollable[_0x3beee9(0x413)][_0x3beee9(0x682)]=function(){const _0x31b230=_0x3beee9;VisuMZ[_0x31b230(0x186)]['Window_Scrollable_update'][_0x31b230(0x573)](this),this[_0x31b230(0x6a1)]();},Window_Scrollable[_0x3beee9(0x413)][_0x3beee9(0x6a1)]=function(){const _0x3985a8=_0x3beee9;this['updateScrollBarVisibility'](),this[_0x3985a8(0x698)](!![]),this['checkScrollBarBitmap'](![]),this[_0x3985a8(0x36b)](!![]),this['updateScrollBarPosition'](![]);},Window_Scrollable[_0x3beee9(0x413)]['updateScrollBarVisibility']=function(){const _0x44dada=_0x3beee9,_0x473b99=[this['_scrollBarHorz'],this[_0x44dada(0x746)]];for(const _0x47f54e of _0x473b99){_0x47f54e&&(_0x47f54e[_0x44dada(0x1a1)]=this[_0x44dada(0x22e)]()&&this[_0x44dada(0x5fb)]());}},Window_Scrollable[_0x3beee9(0x413)][_0x3beee9(0x698)]=function(_0x4f5992){const _0x4f892b=_0x3beee9;if(!this[_0x4f892b(0x14c)])return;const _0x2909a1=this[_0x4f892b(0x74f)](_0x4f5992),_0x51564c=this[_0x4f892b(0x465)](_0x4f5992),_0xb0c8fd=_0x4f5992?_0x4f892b(0x110):'vert',_0x495aa0=_0x4f5992?_0x4f892b(0x5c9):_0x4f892b(0x5ac);(this[_0x4f892b(0x14c)][_0xb0c8fd]!==_0x2909a1||this[_0x4f892b(0x14c)][_0x495aa0]!==_0x51564c)&&(this[_0x4f892b(0x14c)][_0xb0c8fd]=_0x2909a1,this[_0x4f892b(0x14c)][_0x495aa0]=_0x51564c,this[_0x4f892b(0x4b1)](_0x4f5992,_0x2909a1,_0x51564c));},Window_Scrollable[_0x3beee9(0x413)][_0x3beee9(0x74f)]=function(_0x4f14dc){const _0x5a5aac=_0x3beee9;if(this['_allTextHeight']!==undefined)return _0x4f14dc?this['scrollX']():this[_0x5a5aac(0x507)]['y'];return _0x4f14dc?this[_0x5a5aac(0x49f)]():this[_0x5a5aac(0x77e)]();},Window_Scrollable[_0x3beee9(0x413)][_0x3beee9(0x465)]=function(_0x3cf990){const _0x5893d4=_0x3beee9;if(this[_0x5893d4(0x253)]!==undefined)return _0x3cf990?this[_0x5893d4(0x6f1)]():Math[_0x5893d4(0x38a)](0x0,this['_allTextHeight']-this[_0x5893d4(0x30d)]);return _0x3cf990?this['maxScrollX']():this[_0x5893d4(0x599)]();},Window_Scrollable['prototype']['scrollbarHeight']=function(){const _0x4480fb=_0x3beee9;if(this[_0x4480fb(0x253)]!==undefined)return Math[_0x4480fb(0x38a)](0x0,this['_allTextHeight']);return this[_0x4480fb(0x3df)]();},Window_Scrollable[_0x3beee9(0x413)][_0x3beee9(0x4b1)]=function(_0x352a51,_0x1c8602,_0x5b1f8f){const _0x1bc176=_0x3beee9,_0x4b1b92=_0x352a51?this[_0x1bc176(0x3d4)]:this[_0x1bc176(0x746)];if(!_0x4b1b92)return;if(!_0x4b1b92[_0x1bc176(0x3ad)])return;const _0x346a1d=_0x4b1b92[_0x1bc176(0x3ad)];_0x346a1d[_0x1bc176(0x168)]();if(_0x5b1f8f<=0x0)return;const _0x5b4b11=_0x352a51?this[_0x1bc176(0x111)]/this[_0x1bc176(0x500)]():this[_0x1bc176(0x30d)]/this[_0x1bc176(0x153)](),_0x4a6f7c=_0x352a51?Math[_0x1bc176(0x368)](_0x1c8602*_0x5b4b11):0x0,_0x547b5e=_0x352a51?0x0:Math['round'](_0x1c8602*_0x5b4b11),_0x5f37aa=_0x352a51?Math[_0x1bc176(0x368)](_0x346a1d[_0x1bc176(0x227)]*_0x5b4b11):_0x346a1d[_0x1bc176(0x227)],_0x479c36=_0x352a51?_0x346a1d[_0x1bc176(0x428)]:Math['round'](_0x346a1d[_0x1bc176(0x428)]*_0x5b4b11),_0x7e2b75=Window_Scrollable['SCROLLBAR'],_0x186ef8=ColorManager[_0x1bc176(0x286)](_0x7e2b75[_0x1bc176(0x93)]),_0x13cfa2=ColorManager[_0x1bc176(0x286)](_0x7e2b75[_0x1bc176(0x541)]),_0x339332=_0x7e2b75[_0x1bc176(0x675)];_0x346a1d[_0x1bc176(0x2de)]=_0x339332,_0x346a1d['fillAll'](_0x186ef8),_0x346a1d[_0x1bc176(0x2de)]=0xff,_0x346a1d[_0x1bc176(0x3d3)](_0x4a6f7c,_0x547b5e,_0x5f37aa,_0x479c36,_0x13cfa2);},Window_Base[_0x3beee9(0x413)]['updateScrollBarPosition']=function(_0x4d2bb6){const _0x3a1d0f=_0x3beee9,_0x395b48=_0x4d2bb6?this[_0x3a1d0f(0x3d4)]:this[_0x3a1d0f(0x746)];if(!_0x395b48)return;const _0x57b73b=Window_Scrollable[_0x3a1d0f(0xcd)],_0x4dabc2=_0x57b73b['thickness'],_0x17f25c=_0x57b73b[_0x3a1d0f(0x7cb)];if(!_0x395b48[_0x3a1d0f(0x7bd)])return;_0x395b48['x']=this[_0x3a1d0f(0x143)]+(_0x4d2bb6?_0x4dabc2:this[_0x3a1d0f(0x111)]+_0x17f25c),_0x395b48['y']=this[_0x3a1d0f(0x143)]+(_0x4d2bb6?this[_0x3a1d0f(0x30d)]+_0x17f25c:_0x4dabc2);},Window_Selectable[_0x3beee9(0x413)][_0x3beee9(0x747)]=function(_0x1a752a){const _0x4a7641=_0x3beee9;let _0x25d212=this[_0x4a7641(0x297)]();const _0x102966=this[_0x4a7641(0x5cd)](),_0x409f7c=this[_0x4a7641(0x160)]();if(this[_0x4a7641(0x627)]()&&(_0x25d212<_0x102966||_0x1a752a&&_0x409f7c===0x1)){_0x25d212+=_0x409f7c;if(_0x25d212>=_0x102966)_0x25d212=_0x102966-0x1;this[_0x4a7641(0x284)](_0x25d212);}else!this[_0x4a7641(0x627)]()&&((_0x25d212<_0x102966-_0x409f7c||_0x1a752a&&_0x409f7c===0x1)&&this[_0x4a7641(0x284)]((_0x25d212+_0x409f7c)%_0x102966));},VisuMZ[_0x3beee9(0x186)]['Window_Selectable_cursorDown']=Window_Selectable[_0x3beee9(0x413)][_0x3beee9(0x747)],Window_Selectable['prototype'][_0x3beee9(0x747)]=function(_0x4e1490){const _0x49b23d=_0x3beee9;this[_0x49b23d(0x627)]()&&_0x4e1490&&this[_0x49b23d(0x160)]()===0x1&&this[_0x49b23d(0x297)]()===this[_0x49b23d(0x5cd)]()-0x1?this[_0x49b23d(0x284)](0x0):VisuMZ[_0x49b23d(0x186)][_0x49b23d(0x85d)][_0x49b23d(0x573)](this,_0x4e1490);},Window_Selectable[_0x3beee9(0x413)][_0x3beee9(0x2f3)]=function(_0x51787d){const _0x3e7539=_0x3beee9;let _0x545a1f=Math['max'](0x0,this[_0x3e7539(0x297)]());const _0x1151ac=this[_0x3e7539(0x5cd)](),_0x574d05=this['maxCols']();if(this[_0x3e7539(0x627)]()&&_0x545a1f>0x0||_0x51787d&&_0x574d05===0x1){_0x545a1f-=_0x574d05;if(_0x545a1f<=0x0)_0x545a1f=0x0;this[_0x3e7539(0x284)](_0x545a1f);}else!this[_0x3e7539(0x627)]()&&((_0x545a1f>=_0x574d05||_0x51787d&&_0x574d05===0x1)&&this[_0x3e7539(0x284)]((_0x545a1f-_0x574d05+_0x1151ac)%_0x1151ac));},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x240)]=Window_Selectable['prototype'][_0x3beee9(0x2f3)],Window_Selectable[_0x3beee9(0x413)]['cursorUp']=function(_0x1aeb79){const _0x132dbf=_0x3beee9;this[_0x132dbf(0x627)]()&&_0x1aeb79&&this[_0x132dbf(0x160)]()===0x1&&this[_0x132dbf(0x297)]()===0x0?this[_0x132dbf(0x284)](this['maxItems']()-0x1):VisuMZ[_0x132dbf(0x186)][_0x132dbf(0x240)][_0x132dbf(0x573)](this,_0x1aeb79);},Window_Selectable['prototype'][_0x3beee9(0x627)]=function(){const _0x62b45a=_0x3beee9;return VisuMZ[_0x62b45a(0x186)]['Settings'][_0x62b45a(0x72e)]['ModernControls'];},VisuMZ[_0x3beee9(0x186)]['Window_Selectable_processCursorMove']=Window_Selectable['prototype'][_0x3beee9(0xa8)],Window_Selectable[_0x3beee9(0x413)][_0x3beee9(0xa8)]=function(){const _0x5cc735=_0x3beee9;this['isUseModernControls']()?(this[_0x5cc735(0x313)](),this[_0x5cc735(0x5f5)]()):VisuMZ[_0x5cc735(0x186)]['Window_Selectable_processCursorMove'][_0x5cc735(0x573)](this);},Window_Selectable[_0x3beee9(0x413)][_0x3beee9(0x3e7)]=function(){return!![];},Window_Selectable['prototype'][_0x3beee9(0x313)]=function(){const _0x8be837=_0x3beee9;if(this[_0x8be837(0x485)]()){const _0x5c3b34=this['index']();Input[_0x8be837(0x379)](_0x8be837(0x690))&&(Input[_0x8be837(0x642)]('shift')&&this['allowShiftScrolling']()?this[_0x8be837(0x598)]():this[_0x8be837(0x747)](Input['isTriggered'](_0x8be837(0x690)))),Input[_0x8be837(0x379)]('up')&&(Input[_0x8be837(0x642)](_0x8be837(0x510))&&this[_0x8be837(0x3e7)]()?this[_0x8be837(0x2af)]():this[_0x8be837(0x2f3)](Input[_0x8be837(0x6ba)]('up'))),Input[_0x8be837(0x379)](_0x8be837(0x216))&&this[_0x8be837(0x25c)](Input[_0x8be837(0x6ba)](_0x8be837(0x216))),Input['isRepeated'](_0x8be837(0x4a4))&&this['cursorLeft'](Input[_0x8be837(0x6ba)]('left')),!this['isHandled'](_0x8be837(0x1e2))&&Input[_0x8be837(0x379)](_0x8be837(0x1e2))&&this[_0x8be837(0x598)](),!this[_0x8be837(0x16b)](_0x8be837(0x566))&&Input['isRepeated'](_0x8be837(0x566))&&this[_0x8be837(0x2af)](),this[_0x8be837(0x297)]()!==_0x5c3b34&&this[_0x8be837(0x2c6)]();}},Window_Selectable[_0x3beee9(0x413)][_0x3beee9(0x5f5)]=function(){const _0x1e6d84=_0x3beee9;if(this[_0x1e6d84(0x485)]()){const _0x2a410f=this['index']();Input[_0x1e6d84(0x6ba)](_0x1e6d84(0x844))&&this[_0x1e6d84(0x284)](Math[_0x1e6d84(0x142)](this['index'](),0x0)),Input[_0x1e6d84(0x6ba)](_0x1e6d84(0x12f))&&this[_0x1e6d84(0x284)](Math[_0x1e6d84(0x38a)](this[_0x1e6d84(0x297)](),this[_0x1e6d84(0x5cd)]()-0x1)),this['index']()!==_0x2a410f&&this[_0x1e6d84(0x2c6)]();}},VisuMZ[_0x3beee9(0x186)]['Window_Selectable_processTouch']=Window_Selectable[_0x3beee9(0x413)][_0x3beee9(0x349)],Window_Selectable['prototype'][_0x3beee9(0x349)]=function(){const _0xfefa63=_0x3beee9;this[_0xfefa63(0x627)]()?this[_0xfefa63(0x1b5)]():VisuMZ[_0xfefa63(0x186)][_0xfefa63(0x173)][_0xfefa63(0x573)](this);},Window_Selectable[_0x3beee9(0x413)]['processTouchModernControls']=function(){const _0x748216=_0x3beee9;VisuMZ[_0x748216(0x186)]['Window_Selectable_processTouch'][_0x748216(0x573)](this);},Window_Selectable[_0x3beee9(0x413)][_0x3beee9(0x7c2)]=function(){const _0x39f7fc=_0x3beee9;return VisuMZ['CoreEngine'][_0x39f7fc(0x46c)][_0x39f7fc(0x1e8)][_0x39f7fc(0x702)];},Window_Selectable[_0x3beee9(0x413)][_0x3beee9(0x94)]=function(){const _0x1bdafe=_0x3beee9;return VisuMZ[_0x1bdafe(0x186)]['Settings']['Window'][_0x1bdafe(0x736)];},Window_Selectable[_0x3beee9(0x413)][_0x3beee9(0x430)]=function(){const _0x5b027e=_0x3beee9;return Window_Scrollable['prototype']['itemHeight'][_0x5b027e(0x573)](this)+VisuMZ[_0x5b027e(0x186)][_0x5b027e(0x46c)][_0x5b027e(0x1e8)][_0x5b027e(0x4a0)];;},VisuMZ['CoreEngine'][_0x3beee9(0x608)]=Window_Selectable[_0x3beee9(0x413)][_0x3beee9(0x6f2)],Window_Selectable['prototype'][_0x3beee9(0x6f2)]=function(_0xee8f2a){const _0x14a8c0=_0x3beee9,_0x6fbc91=VisuMZ[_0x14a8c0(0x186)]['Settings'][_0x14a8c0(0x1e8)];if(_0x6fbc91['ShowItemBackground']===![])return;_0x6fbc91[_0x14a8c0(0x42f)]?_0x6fbc91[_0x14a8c0(0x42f)][_0x14a8c0(0x573)](this,_0xee8f2a):VisuMZ[_0x14a8c0(0x186)][_0x14a8c0(0x608)][_0x14a8c0(0x573)](this,_0xee8f2a);},VisuMZ['CoreEngine']['Window_Gold_refresh']=Window_Gold[_0x3beee9(0x413)][_0x3beee9(0x74e)],Window_Gold['prototype']['refresh']=function(){const _0x1e7198=_0x3beee9;this['isItemStyle']()?this[_0x1e7198(0x737)]():VisuMZ[_0x1e7198(0x186)]['Window_Gold_refresh']['call'](this);},Window_Gold[_0x3beee9(0x413)]['isItemStyle']=function(){const _0xdef6f9=_0x3beee9;if(TextManager[_0xdef6f9(0x3bd)]!==this[_0xdef6f9(0x3bd)]())return![];return VisuMZ['CoreEngine']['Settings'][_0xdef6f9(0x544)][_0xdef6f9(0x4f8)];},Window_Gold[_0x3beee9(0x413)][_0x3beee9(0x737)]=function(){const _0x3eb373=_0x3beee9;this[_0x3eb373(0x74b)](),this[_0x3eb373(0x51f)]['clear'](),this[_0x3eb373(0x51f)]['fontSize']=VisuMZ[_0x3eb373(0x186)][_0x3eb373(0x46c)]['Gold'][_0x3eb373(0xfd)];const _0x1bef09=VisuMZ[_0x3eb373(0x186)][_0x3eb373(0x46c)][_0x3eb373(0x544)][_0x3eb373(0x55a)],_0x5d6d6e=this['itemLineRect'](0x0);if(_0x1bef09>0x0){const _0x4a0c05=ImageManager[_0x3eb373(0x611)]||0x20,_0x44f60b=_0x4a0c05-ImageManager['iconWidth'],_0x2f0a4c=_0x5d6d6e['y']+(this[_0x3eb373(0x3f1)]()-ImageManager[_0x3eb373(0x559)])/0x2;this[_0x3eb373(0x763)](_0x1bef09,_0x5d6d6e['x']+Math[_0x3eb373(0x139)](_0x44f60b/0x2),_0x2f0a4c);const _0x1c7b77=_0x4a0c05+0x4;_0x5d6d6e['x']+=_0x1c7b77,_0x5d6d6e[_0x3eb373(0x227)]-=_0x1c7b77;}this[_0x3eb373(0x10d)](ColorManager['systemColor']()),this[_0x3eb373(0x48f)](this[_0x3eb373(0x3bd)](),_0x5d6d6e['x'],_0x5d6d6e['y'],_0x5d6d6e[_0x3eb373(0x227)],'left');const _0x5df19d=this[_0x3eb373(0x74a)](this[_0x3eb373(0x3bd)]())+0x6;;_0x5d6d6e['x']+=_0x5df19d,_0x5d6d6e['width']-=_0x5df19d,this[_0x3eb373(0x232)]();const _0x352fef=this[_0x3eb373(0x31e)](),_0x4d6f35=this[_0x3eb373(0x74a)](this[_0x3eb373(0x53e)]?VisuMZ[_0x3eb373(0x79d)](this['value']()):this[_0x3eb373(0x31e)]());_0x4d6f35>_0x5d6d6e['width']?this[_0x3eb373(0x48f)](VisuMZ[_0x3eb373(0x186)][_0x3eb373(0x46c)][_0x3eb373(0x544)][_0x3eb373(0x30b)],_0x5d6d6e['x'],_0x5d6d6e['y'],_0x5d6d6e[_0x3eb373(0x227)],_0x3eb373(0x216)):this[_0x3eb373(0x48f)](this['value'](),_0x5d6d6e['x'],_0x5d6d6e['y'],_0x5d6d6e[_0x3eb373(0x227)],'right'),this[_0x3eb373(0x74b)]();},Window_StatusBase['prototype'][_0x3beee9(0x8f)]=function(_0x4f19f8,_0xd1b33e,_0x5c4577,_0x540c48,_0x231f23){const _0x10eafa=_0x3beee9;_0x540c48=String(_0x540c48||'')['toUpperCase']();if(VisuMZ[_0x10eafa(0x186)][_0x10eafa(0x46c)]['Param'][_0x10eafa(0x257)]){const _0x305da4=VisuMZ[_0x10eafa(0x39a)](_0x540c48);if(_0x231f23)this[_0x10eafa(0x62a)](_0x305da4,_0x4f19f8,_0xd1b33e,this['gaugeLineHeight']()),_0x5c4577-=this[_0x10eafa(0x33c)]()+0x2,_0x4f19f8+=this[_0x10eafa(0x33c)]()+0x2;else{const _0x35da48=ImageManager[_0x10eafa(0x611)]||0x20,_0xe39101=ImageManager[_0x10eafa(0x373)]||0x20,_0x190049=_0x35da48-ImageManager[_0x10eafa(0x6dc)],_0x289e02=_0xe39101-ImageManager[_0x10eafa(0x559)];let _0x24493b=0x2,_0x16cd72=0x2;this['lineHeight']()!==0x24&&(_0x16cd72=Math[_0x10eafa(0x171)]((this[_0x10eafa(0x3f1)]()-_0xe39101)/0x2));const _0x2916c5=_0x4f19f8+Math[_0x10eafa(0x171)](_0x190049/0x2)+_0x24493b,_0x5126a2=_0xd1b33e+Math[_0x10eafa(0x171)](_0x289e02/0x2)+_0x16cd72;this[_0x10eafa(0x763)](_0x305da4,_0x2916c5,_0x5126a2),_0x5c4577-=_0x35da48+0x4,_0x4f19f8+=_0x35da48+0x4;}}const _0x2242a1=TextManager[_0x10eafa(0x225)](_0x540c48);this['resetFontSettings'](),this['changeTextColor'](ColorManager[_0x10eafa(0x54e)]()),_0x231f23?(this[_0x10eafa(0x51f)]['fontSize']=this[_0x10eafa(0xd9)](),this['contents'][_0x10eafa(0x48f)](_0x2242a1,_0x4f19f8,_0xd1b33e,_0x5c4577,this[_0x10eafa(0x33c)](),_0x10eafa(0x4a4))):this[_0x10eafa(0x48f)](_0x2242a1,_0x4f19f8,_0xd1b33e,_0x5c4577),this[_0x10eafa(0x74b)]();},Window_StatusBase[_0x3beee9(0x413)][_0x3beee9(0xd9)]=function(){return $gameSystem['mainFontSize']()-0x8;},Window_StatusBase[_0x3beee9(0x413)][_0x3beee9(0x1f2)]=function(_0x498c0d,_0x431e5c,_0xed5945,_0x1c230d){const _0x4fecef=_0x3beee9;_0x1c230d=_0x1c230d||0xa8,this[_0x4fecef(0x232)]();if(VisuMZ['CoreEngine']['Settings']['UI'][_0x4fecef(0xd0)])this[_0x4fecef(0x612)](_0x498c0d[_0x4fecef(0x717)]()['name'],_0x431e5c,_0xed5945,_0x1c230d);else{const _0x2bd584=_0x498c0d[_0x4fecef(0x717)]()[_0x4fecef(0x148)]['replace'](/\\I\[(\d+)\]/gi,'');this[_0x4fecef(0x48f)](_0x2bd584,_0x431e5c,_0xed5945,_0x1c230d);}},Window_StatusBase[_0x3beee9(0x413)][_0x3beee9(0x7c6)]=function(_0x46d5aa,_0x25bb46,_0x55663f,_0x5cac9a){const _0x1c5916=_0x3beee9;_0x5cac9a=_0x5cac9a||0x10e,this[_0x1c5916(0x232)]();if(VisuMZ[_0x1c5916(0x186)]['Settings']['UI'][_0x1c5916(0x6aa)])this['drawTextEx'](_0x46d5aa['nickname'](),_0x25bb46,_0x55663f,_0x5cac9a);else{const _0x258e96=_0x46d5aa[_0x1c5916(0x24e)]()[_0x1c5916(0x6bf)](/\\I\[(\d+)\]/gi,'');this[_0x1c5916(0x48f)](_0x46d5aa['nickname'](),_0x25bb46,_0x55663f,_0x5cac9a);}},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x85f)]=Window_StatusBase[_0x3beee9(0x413)][_0x3beee9(0x548)],Window_StatusBase[_0x3beee9(0x413)]['drawActorLevel']=function(_0x186104,_0x479082,_0x3b910e){const _0x8e3324=_0x3beee9;if(VisuMZ[_0x8e3324(0x186)][_0x8e3324(0x46c)][_0x8e3324(0x234)][_0x8e3324(0x39c)]===![])return;if(this[_0x8e3324(0x5f1)]())this['drawActorExpGauge'](_0x186104,_0x479082,_0x3b910e);VisuMZ[_0x8e3324(0x186)][_0x8e3324(0x85f)]['call'](this,_0x186104,_0x479082,_0x3b910e);},Window_StatusBase['prototype'][_0x3beee9(0x5f1)]=function(){const _0x294f55=_0x3beee9;return VisuMZ[_0x294f55(0x186)][_0x294f55(0x46c)]['UI'][_0x294f55(0x6cd)];},Window_StatusBase[_0x3beee9(0x413)]['drawActorExpGauge']=function(_0x3b8f9a,_0x195fef,_0x252cf4){const _0x2674a8=_0x3beee9;if(!_0x3b8f9a)return;if(!_0x3b8f9a[_0x2674a8(0x1bf)]())return;const _0x42d11f=0x80,_0x25822f=_0x3b8f9a[_0x2674a8(0x3b6)]();let _0x3cd722=ColorManager[_0x2674a8(0x4da)](),_0x5eec98=ColorManager[_0x2674a8(0x291)]();_0x25822f>=0x1&&(_0x3cd722=ColorManager[_0x2674a8(0x3f4)](),_0x5eec98=ColorManager[_0x2674a8(0x5ae)]()),this[_0x2674a8(0x829)](_0x195fef,_0x252cf4,_0x42d11f,_0x25822f,_0x3cd722,_0x5eec98);},Window_EquipStatus[_0x3beee9(0x413)][_0x3beee9(0x23b)]=function(){const _0x4e7c40=_0x3beee9;let _0x4b2cad=0x0;for(const _0x1afc4a of VisuMZ[_0x4e7c40(0x186)]['Settings'][_0x4e7c40(0x234)][_0x4e7c40(0x4fc)]){const _0x5049c9=this['itemPadding'](),_0x4282ab=this['paramY'](_0x4b2cad);this[_0x4e7c40(0x732)](_0x5049c9,_0x4282ab,_0x1afc4a),_0x4b2cad++;}},Window_EquipStatus[_0x3beee9(0x413)]['drawParamName']=function(_0x4a0db7,_0x4090aa,_0x389ea5){const _0x27e1b1=_0x3beee9,_0x26e7c8=this['paramX']()-this[_0x27e1b1(0x55e)]()*0x2;this[_0x27e1b1(0x8f)](_0x4a0db7,_0x4090aa,_0x26e7c8,_0x389ea5,![]);},Window_EquipStatus[_0x3beee9(0x413)][_0x3beee9(0x711)]=function(_0x1e0023,_0x25f9be,_0x3b2da3){const _0x5efe1d=_0x3beee9,_0x265a69=this['paramWidth']();this[_0x5efe1d(0x232)](),this[_0x5efe1d(0x48f)](this['_actor']['paramValueByName'](_0x3b2da3,!![]),_0x1e0023,_0x25f9be,_0x265a69,'right');},Window_EquipStatus[_0x3beee9(0x413)]['drawRightArrow']=function(_0x3ceb5a,_0x3d11b6){const _0x3d7c34=_0x3beee9,_0x1d9fdd=this[_0x3d7c34(0x838)]();this[_0x3d7c34(0x10d)](ColorManager[_0x3d7c34(0x54e)]());const _0x35cada=VisuMZ['CoreEngine']['Settings']['UI'][_0x3d7c34(0x73f)];this['drawText'](_0x35cada,_0x3ceb5a,_0x3d11b6,_0x1d9fdd,'center');},Window_EquipStatus[_0x3beee9(0x413)][_0x3beee9(0x83c)]=function(_0x7e1d6a,_0x28bb6e,_0xf7b69b){const _0x4095f0=_0x3beee9,_0x561af2=this[_0x4095f0(0x745)](),_0x4ef046=this[_0x4095f0(0x293)][_0x4095f0(0x3bc)](_0xf7b69b),_0x5ebacb=_0x4ef046-this[_0x4095f0(0x3ec)][_0x4095f0(0x3bc)](_0xf7b69b);this[_0x4095f0(0x10d)](ColorManager[_0x4095f0(0x7ea)](_0x5ebacb)),this['drawText'](this['_tempActor'][_0x4095f0(0x3bc)](_0xf7b69b,!![]),_0x7e1d6a,_0x28bb6e,_0x561af2,'right');},VisuMZ[_0x3beee9(0x186)]['Window_EquipItem_isEnabled']=Window_EquipItem[_0x3beee9(0x413)][_0x3beee9(0x190)],Window_EquipItem[_0x3beee9(0x413)][_0x3beee9(0x190)]=function(_0x36b596){const _0x5958b9=_0x3beee9;return _0x36b596&&this[_0x5958b9(0x3ec)]?this[_0x5958b9(0x3ec)]['canEquip'](_0x36b596):VisuMZ[_0x5958b9(0x186)]['Window_EquipItem_isEnabled']['call'](this,_0x36b596);},Window_StatusParams[_0x3beee9(0x413)][_0x3beee9(0x5cd)]=function(){const _0xae05bf=_0x3beee9;return VisuMZ[_0xae05bf(0x186)]['Settings'][_0xae05bf(0x234)]['DisplayedParams'][_0xae05bf(0x228)];},Window_StatusParams[_0x3beee9(0x413)][_0x3beee9(0x732)]=function(_0x388826){const _0x58a7e3=_0x3beee9,_0x3ffbfe=this[_0x58a7e3(0x768)](_0x388826),_0x259820=VisuMZ['CoreEngine'][_0x58a7e3(0x46c)][_0x58a7e3(0x234)]['DisplayedParams'][_0x388826],_0x410d7a=TextManager['param'](_0x259820),_0x3d190f=this[_0x58a7e3(0x3ec)][_0x58a7e3(0x3bc)](_0x259820,!![]);this[_0x58a7e3(0x8f)](_0x3ffbfe['x'],_0x3ffbfe['y'],0xa0,_0x259820,![]),this[_0x58a7e3(0x232)](),this[_0x58a7e3(0x48f)](_0x3d190f,_0x3ffbfe['x']+0xa0,_0x3ffbfe['y'],0x3c,_0x58a7e3(0x216));};if(VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x46c)][_0x3beee9(0x545)]['EnableNameInput']){VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x46c)][_0x3beee9(0x545)][_0x3beee9(0x779)]&&(Window_NameInput['LATIN1']=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x3beee9(0x4ca),'OK']);;VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x18c)]=Window_NameInput[_0x3beee9(0x413)][_0x3beee9(0x59a)],Window_NameInput[_0x3beee9(0x413)][_0x3beee9(0x59a)]=function(_0x36faa7){const _0x315cde=_0x3beee9;this[_0x315cde(0x862)]=this['defaultInputMode'](),VisuMZ[_0x315cde(0x186)]['Window_NameInput_initialize'][_0x315cde(0x573)](this,_0x36faa7),this['_mode']===_0x315cde(0x691)?this[_0x315cde(0x235)](0x0):(Input['clear'](),this[_0x315cde(0x553)]());},Window_NameInput['prototype'][_0x3beee9(0x238)]=function(){const _0x3c79ca=_0x3beee9;if(Input[_0x3c79ca(0x6c6)]())return'default';return VisuMZ['CoreEngine']['Settings'][_0x3c79ca(0x545)]['DefaultMode']||_0x3c79ca(0x2c8);},VisuMZ[_0x3beee9(0x186)]['Window_NameInput_processHandling']=Window_NameInput['prototype'][_0x3beee9(0x369)],Window_NameInput['prototype'][_0x3beee9(0x369)]=function(){const _0x54b6a9=_0x3beee9;if(!this[_0x54b6a9(0x5fb)]())return;if(!this[_0x54b6a9(0xe6)])return;if(this[_0x54b6a9(0x862)]===_0x54b6a9(0x2c8)&&Input[_0x54b6a9(0x5a3)]())this[_0x54b6a9(0x6ef)](_0x54b6a9(0x691));else{if(Input[_0x54b6a9(0x414)]('backspace'))Input[_0x54b6a9(0x168)](),this[_0x54b6a9(0x158)]();else{if(Input[_0x54b6a9(0x6ba)](_0x54b6a9(0x524)))Input[_0x54b6a9(0x168)](),this[_0x54b6a9(0x862)]==='keyboard'?this[_0x54b6a9(0x6ef)](_0x54b6a9(0x691)):this[_0x54b6a9(0x6ef)]('keyboard');else{if(this[_0x54b6a9(0x862)]===_0x54b6a9(0x2c8))this['processKeyboardHandling']();else Input[_0x54b6a9(0x414)](_0x54b6a9(0x1da))?(Input['clear'](),this[_0x54b6a9(0x6ef)](_0x54b6a9(0x2c8))):VisuMZ[_0x54b6a9(0x186)][_0x54b6a9(0x75d)][_0x54b6a9(0x573)](this);}}}},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x169)]=Window_NameInput[_0x3beee9(0x413)]['processTouch'],Window_NameInput[_0x3beee9(0x413)]['processTouch']=function(){const _0x2f894a=_0x3beee9;if(!this[_0x2f894a(0x5ce)]())return;if(this[_0x2f894a(0x862)]===_0x2f894a(0x2c8)){if(TouchInput[_0x2f894a(0x6ba)]()&&this[_0x2f894a(0x51b)]())this[_0x2f894a(0x6ef)](_0x2f894a(0x691));else TouchInput[_0x2f894a(0x140)]()&&this['switchModes'](_0x2f894a(0x691));}else VisuMZ[_0x2f894a(0x186)][_0x2f894a(0x169)]['call'](this);},Window_NameInput['prototype'][_0x3beee9(0x705)]=function(){const _0x283168=_0x3beee9;if(Input[_0x283168(0x414)](_0x283168(0x851)))Input[_0x283168(0x168)](),this[_0x283168(0x16e)]();else{if(Input['_inputString']!==undefined){let _0x580b9f=Input[_0x283168(0x462)],_0x3439fc=_0x580b9f[_0x283168(0x228)];for(let _0x29cf2b=0x0;_0x29cf2b<_0x3439fc;++_0x29cf2b){this['_editWindow'][_0x283168(0x790)](_0x580b9f[_0x29cf2b])?SoundManager[_0x283168(0x6bc)]():SoundManager['playBuzzer']();}Input[_0x283168(0x168)]();}}},Window_NameInput['prototype']['switchModes']=function(_0x583471){const _0x506814=_0x3beee9;let _0x28a62a=this[_0x506814(0x862)];this[_0x506814(0x862)]=_0x583471,_0x28a62a!==this[_0x506814(0x862)]&&(this[_0x506814(0x74e)](),SoundManager[_0x506814(0x6bc)](),this[_0x506814(0x862)]===_0x506814(0x691)?this[_0x506814(0x235)](0x0):this['select'](-0x1));},VisuMZ[_0x3beee9(0x186)]['Window_NameInput_cursorDown']=Window_NameInput[_0x3beee9(0x413)][_0x3beee9(0x747)],Window_NameInput[_0x3beee9(0x413)][_0x3beee9(0x747)]=function(_0x42d7e8){const _0x35c680=_0x3beee9;if(this[_0x35c680(0x862)]===_0x35c680(0x2c8)&&!Input[_0x35c680(0x14a)]())return;if(Input[_0x35c680(0x802)]())return;VisuMZ[_0x35c680(0x186)][_0x35c680(0x126)]['call'](this,_0x42d7e8),this[_0x35c680(0x6ef)](_0x35c680(0x691));},VisuMZ[_0x3beee9(0x186)]['Window_NameInput_cursorUp']=Window_NameInput[_0x3beee9(0x413)][_0x3beee9(0x2f3)],Window_NameInput[_0x3beee9(0x413)][_0x3beee9(0x2f3)]=function(_0x40d03c){const _0xac992=_0x3beee9;if(this['_mode']==='keyboard'&&!Input[_0xac992(0x14a)]())return;if(Input['isNumpadPressed']())return;VisuMZ['CoreEngine'][_0xac992(0x483)]['call'](this,_0x40d03c),this[_0xac992(0x6ef)](_0xac992(0x691));},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x7d8)]=Window_NameInput['prototype'][_0x3beee9(0x25c)],Window_NameInput[_0x3beee9(0x413)][_0x3beee9(0x25c)]=function(_0x1dbf6d){const _0x4c35e6=_0x3beee9;if(this['_mode']===_0x4c35e6(0x2c8)&&!Input[_0x4c35e6(0x14a)]())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x4c35e6(0x186)][_0x4c35e6(0x7d8)]['call'](this,_0x1dbf6d),this['switchModes'](_0x4c35e6(0x691));},VisuMZ[_0x3beee9(0x186)]['Window_NameInput_cursorLeft']=Window_NameInput[_0x3beee9(0x413)][_0x3beee9(0x34d)],Window_NameInput[_0x3beee9(0x413)][_0x3beee9(0x34d)]=function(_0x54ab94){const _0x27756f=_0x3beee9;if(this[_0x27756f(0x862)]==='keyboard'&&!Input[_0x27756f(0x14a)]())return;if(Input[_0x27756f(0x802)]())return;VisuMZ['CoreEngine']['Window_NameInput_cursorLeft'][_0x27756f(0x573)](this,_0x54ab94),this[_0x27756f(0x6ef)](_0x27756f(0x691));},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x49d)]=Window_NameInput[_0x3beee9(0x413)][_0x3beee9(0x598)],Window_NameInput['prototype'][_0x3beee9(0x598)]=function(){const _0x457124=_0x3beee9;if(this[_0x457124(0x862)]===_0x457124(0x2c8))return;if(Input[_0x457124(0x802)]())return;VisuMZ[_0x457124(0x186)][_0x457124(0x49d)]['call'](this),this[_0x457124(0x6ef)](_0x457124(0x691));},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x83d)]=Window_NameInput[_0x3beee9(0x413)][_0x3beee9(0x2af)],Window_NameInput[_0x3beee9(0x413)][_0x3beee9(0x2af)]=function(){const _0x46d6a0=_0x3beee9;if(this[_0x46d6a0(0x862)]==='keyboard')return;if(Input[_0x46d6a0(0x802)]())return;VisuMZ[_0x46d6a0(0x186)][_0x46d6a0(0x83d)][_0x46d6a0(0x573)](this),this['switchModes'](_0x46d6a0(0x691));},VisuMZ['CoreEngine']['Window_NameInput_refresh']=Window_NameInput[_0x3beee9(0x413)]['refresh'],Window_NameInput[_0x3beee9(0x413)][_0x3beee9(0x74e)]=function(){const _0x371e86=_0x3beee9;if(this[_0x371e86(0x862)]===_0x371e86(0x2c8)){this[_0x371e86(0x51f)][_0x371e86(0x168)](),this['contentsBack'][_0x371e86(0x168)](),this[_0x371e86(0x232)]();let _0x270267=VisuMZ[_0x371e86(0x186)][_0x371e86(0x46c)][_0x371e86(0x545)][_0x371e86(0x415)][_0x371e86(0x5f4)]('\x0a'),_0x1e258a=_0x270267['length'],_0x5758ad=(this[_0x371e86(0x30d)]-_0x1e258a*this[_0x371e86(0x3f1)]())/0x2;for(let _0x35dd36=0x0;_0x35dd36<_0x1e258a;++_0x35dd36){let _0x11f2d0=_0x270267[_0x35dd36],_0x204ff2=this[_0x371e86(0x801)](_0x11f2d0)[_0x371e86(0x227)],_0x2b5c8c=Math['floor']((this[_0x371e86(0x51f)][_0x371e86(0x227)]-_0x204ff2)/0x2);this[_0x371e86(0x612)](_0x11f2d0,_0x2b5c8c,_0x5758ad),_0x5758ad+=this[_0x371e86(0x3f1)]();}}else VisuMZ[_0x371e86(0x186)][_0x371e86(0x7f2)]['call'](this);};};VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x1aa)]=Window_ShopSell[_0x3beee9(0x413)][_0x3beee9(0x190)],Window_ShopSell['prototype'][_0x3beee9(0x190)]=function(_0x66e55c){const _0x2f7654=_0x3beee9;return VisuMZ[_0x2f7654(0x186)]['Settings'][_0x2f7654(0x72e)][_0x2f7654(0x1f5)]&&DataManager['isKeyItem'](_0x66e55c)?![]:VisuMZ[_0x2f7654(0x186)][_0x2f7654(0x1aa)]['call'](this,_0x66e55c);},Window_NumberInput[_0x3beee9(0x413)][_0x3beee9(0x627)]=function(){return![];};VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x46c)][_0x3beee9(0x545)][_0x3beee9(0x3f6)]&&(VisuMZ['CoreEngine'][_0x3beee9(0x556)]=Window_NumberInput['prototype']['start'],Window_NumberInput[_0x3beee9(0x413)]['start']=function(){const _0x14a9ca=_0x3beee9;VisuMZ[_0x14a9ca(0x186)][_0x14a9ca(0x556)][_0x14a9ca(0x573)](this),this[_0x14a9ca(0x235)](this[_0x14a9ca(0x618)]-0x1),Input[_0x14a9ca(0x168)]();},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x521)]=Window_NumberInput['prototype']['processDigitChange'],Window_NumberInput[_0x3beee9(0x413)]['processDigitChange']=function(){const _0x1e1797=_0x3beee9;if(!this[_0x1e1797(0x5ce)]())return;if(Input[_0x1e1797(0x802)]())this['processKeyboardDigitChange']();else{if(Input[_0x1e1797(0x414)](_0x1e1797(0xf4)))this[_0x1e1797(0x595)]();else{if(Input[_0x1e1797(0xc9)]===0x2e)this[_0x1e1797(0x44f)]();else{if(Input[_0x1e1797(0xc9)]===0x24)this[_0x1e1797(0x86b)]();else Input[_0x1e1797(0xc9)]===0x23?this[_0x1e1797(0x32f)]():VisuMZ[_0x1e1797(0x186)][_0x1e1797(0x521)]['call'](this);}}}},Window_NumberInput['prototype'][_0x3beee9(0xa8)]=function(){const _0x3b812e=_0x3beee9;if(!this['isCursorMovable']())return;Input[_0x3b812e(0x802)]()?this['processKeyboardDigitChange']():Window_Selectable[_0x3b812e(0x413)]['processCursorMove'][_0x3b812e(0x573)](this);},Window_NumberInput[_0x3beee9(0x413)]['processCursorHomeEndTrigger']=function(){},Window_NumberInput[_0x3beee9(0x413)]['processKeyboardDigitChange']=function(){const _0x3d4fdf=_0x3beee9;if(String(this[_0x3d4fdf(0x70a)])['length']>=this[_0x3d4fdf(0x618)])return;const _0x133306=Number(String(this[_0x3d4fdf(0x70a)])+Input[_0x3d4fdf(0x462)]);if(isNaN(_0x133306))return;this[_0x3d4fdf(0x70a)]=_0x133306;const _0x5ba2ac='9'[_0x3d4fdf(0x72d)](this[_0x3d4fdf(0x618)]);this['_number']=this[_0x3d4fdf(0x70a)][_0x3d4fdf(0x3fd)](0x0,_0x5ba2ac),Input['clear'](),this[_0x3d4fdf(0x74e)](),SoundManager[_0x3d4fdf(0x16c)](),this[_0x3d4fdf(0x235)](this[_0x3d4fdf(0x618)]-0x1);},Window_NumberInput[_0x3beee9(0x413)][_0x3beee9(0x595)]=function(){const _0x4b964e=_0x3beee9;this[_0x4b964e(0x70a)]=Number(String(this[_0x4b964e(0x70a)])[_0x4b964e(0x2f9)](0x0,-0x1)),this[_0x4b964e(0x70a)]=Math[_0x4b964e(0x38a)](0x0,this[_0x4b964e(0x70a)]),Input[_0x4b964e(0x168)](),this[_0x4b964e(0x74e)](),SoundManager['playCursor'](),this['select'](this[_0x4b964e(0x618)]-0x1);},Window_NumberInput['prototype'][_0x3beee9(0x44f)]=function(){const _0x55d4d4=_0x3beee9;this[_0x55d4d4(0x70a)]=Number(String(this[_0x55d4d4(0x70a)])[_0x55d4d4(0x85b)](0x1)),this['_number']=Math[_0x55d4d4(0x38a)](0x0,this['_number']),Input['clear'](),this[_0x55d4d4(0x74e)](),SoundManager['playCursor'](),this[_0x55d4d4(0x235)](this['_maxDigits']-0x1);},Window_NumberInput['prototype'][_0x3beee9(0x86b)]=function(){const _0x13700a=_0x3beee9;if(this[_0x13700a(0x297)]()===0x0)return;Input['clear'](),this['refresh'](),SoundManager[_0x13700a(0x16c)](),this['select'](0x0);},Window_NumberInput[_0x3beee9(0x413)][_0x3beee9(0x32f)]=function(){const _0x1588d7=_0x3beee9;if(this['index']()===this[_0x1588d7(0x618)]-0x1)return;Input[_0x1588d7(0x168)](),this[_0x1588d7(0x74e)](),SoundManager[_0x1588d7(0x16c)](),this[_0x1588d7(0x235)](this[_0x1588d7(0x618)]-0x1);});;function _0x4666(_0x17af6e,_0x345efd){const _0x18bf7e=_0x18bf();return _0x4666=function(_0x4666df,_0x4e2d4b){_0x4666df=_0x4666df-0x8b;let _0x3853fe=_0x18bf7e[_0x4666df];return _0x3853fe;},_0x4666(_0x17af6e,_0x345efd);}VisuMZ['CoreEngine'][_0x3beee9(0x159)]=Window_MapName[_0x3beee9(0x413)]['refresh'],Window_MapName[_0x3beee9(0x413)][_0x3beee9(0x74e)]=function(){const _0x175776=_0x3beee9;VisuMZ[_0x175776(0x186)][_0x175776(0x46c)][_0x175776(0x72e)][_0x175776(0x21e)]?this['refreshWithTextCodeSupport']():VisuMZ[_0x175776(0x186)][_0x175776(0x159)][_0x175776(0x573)](this);},Window_MapName[_0x3beee9(0x413)][_0x3beee9(0x63b)]=function(){const _0x1ed766=_0x3beee9;this[_0x1ed766(0x51f)][_0x1ed766(0x168)]();if($gameMap[_0x1ed766(0x2d2)]()){const _0x175da7=this[_0x1ed766(0x111)];this[_0x1ed766(0x44e)](0x0,0x0,_0x175da7,this[_0x1ed766(0x3f1)]());const _0x1872ff=this[_0x1ed766(0x801)]($gameMap['displayName']())['width'];this[_0x1ed766(0x612)]($gameMap[_0x1ed766(0x2d2)](),Math['floor']((_0x175da7-_0x1872ff)/0x2),0x0);}},Window_TitleCommand[_0x3beee9(0x479)]=VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x46c)][_0x3beee9(0x1e4)],Window_TitleCommand[_0x3beee9(0x413)][_0x3beee9(0x633)]=function(){const _0x1a4655=_0x3beee9;this[_0x1a4655(0x85a)]();},Window_TitleCommand[_0x3beee9(0x413)][_0x3beee9(0x85a)]=function(){const _0x477381=_0x3beee9;for(const _0x13fb37 of Window_TitleCommand[_0x477381(0x479)]){if(_0x13fb37[_0x477381(0x4d7)][_0x477381(0x573)](this)){const _0x43a876=_0x13fb37[_0x477381(0x451)];let _0x14e845=_0x13fb37[_0x477381(0x377)];if(['',_0x477381(0x84c)]['includes'](_0x14e845))_0x14e845=_0x13fb37['TextJS'][_0x477381(0x573)](this);const _0x54c796=_0x13fb37[_0x477381(0x59f)]['call'](this),_0xfd56d5=_0x13fb37[_0x477381(0x41f)][_0x477381(0x573)](this);this[_0x477381(0x619)](_0x14e845,_0x43a876,_0x54c796,_0xfd56d5),this['setHandler'](_0x43a876,_0x13fb37[_0x477381(0x564)][_0x477381(0x4d9)](this,_0xfd56d5));}}},VisuMZ['CoreEngine'][_0x3beee9(0x806)]=Window_TitleCommand[_0x3beee9(0x413)][_0x3beee9(0x1c0)],Window_TitleCommand[_0x3beee9(0x413)]['selectLast']=function(){const _0x20f08c=_0x3beee9;VisuMZ[_0x20f08c(0x186)][_0x20f08c(0x806)][_0x20f08c(0x573)](this);if(!Window_TitleCommand['_lastCommandSymbol'])return;const _0x767603=this[_0x20f08c(0x212)](Window_TitleCommand[_0x20f08c(0x2bb)]),_0x59fcd3=Math[_0x20f08c(0x171)](this[_0x20f08c(0x144)]()/0x2)-0x1;this[_0x20f08c(0x284)](_0x767603),this[_0x20f08c(0xf0)]>0x1&&(this[_0x20f08c(0xf0)]=0x1,this[_0x20f08c(0x328)]()),this['setTopRow'](_0x767603-_0x59fcd3);},Window_GameEnd['_commandList']=VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x46c)]['MenuLayout'][_0x3beee9(0x585)][_0x3beee9(0x49b)],Window_GameEnd[_0x3beee9(0x413)][_0x3beee9(0x633)]=function(){const _0x3d58f1=_0x3beee9;this[_0x3d58f1(0x85a)]();},Window_GameEnd[_0x3beee9(0x413)][_0x3beee9(0x85a)]=function(){const _0x5c945f=_0x3beee9;for(const _0x2cfd7e of Window_GameEnd['_commandList']){if(_0x2cfd7e[_0x5c945f(0x4d7)][_0x5c945f(0x573)](this)){const _0x513f9f=_0x2cfd7e['Symbol'];let _0x5aa6bf=_0x2cfd7e['TextStr'];if(['',_0x5c945f(0x84c)][_0x5c945f(0x820)](_0x5aa6bf))_0x5aa6bf=_0x2cfd7e['TextJS'][_0x5c945f(0x573)](this);const _0x5addb1=_0x2cfd7e[_0x5c945f(0x59f)][_0x5c945f(0x573)](this),_0x125697=_0x2cfd7e[_0x5c945f(0x41f)][_0x5c945f(0x573)](this);this[_0x5c945f(0x619)](_0x5aa6bf,_0x513f9f,_0x5addb1,_0x125697),this[_0x5c945f(0x2ad)](_0x513f9f,_0x2cfd7e[_0x5c945f(0x564)]['bind'](this,_0x125697));}}};function Window_ButtonAssist(){const _0x400a86=_0x3beee9;this[_0x400a86(0x59a)](...arguments);}Window_ButtonAssist[_0x3beee9(0x413)]=Object[_0x3beee9(0x75c)](Window_Base[_0x3beee9(0x413)]),Window_ButtonAssist['prototype'][_0x3beee9(0x1b0)]=Window_ButtonAssist,Window_ButtonAssist['prototype']['initialize']=function(_0x5a849f){const _0x412129=_0x3beee9;this[_0x412129(0x4f3)]={},Window_Base[_0x412129(0x413)]['initialize'][_0x412129(0x573)](this,_0x5a849f),this[_0x412129(0x86c)](VisuMZ[_0x412129(0x186)][_0x412129(0x46c)][_0x412129(0x492)]['BgType']||0x0),this['refresh']();},Window_ButtonAssist[_0x3beee9(0x413)][_0x3beee9(0x3f1)]=function(){const _0x196b2e=_0x3beee9;return this[_0x196b2e(0x30d)]||Window_Base[_0x196b2e(0x413)]['lineHeight'][_0x196b2e(0x573)](this);},Window_ButtonAssist[_0x3beee9(0x413)][_0x3beee9(0x39e)]=function(){const _0xb68f94=_0x3beee9;this[_0xb68f94(0x51f)][_0xb68f94(0x156)]<=0x60&&(this['contents'][_0xb68f94(0x156)]+=0x6);},Window_ButtonAssist['prototype'][_0x3beee9(0x394)]=function(){const _0x5e5d73=_0x3beee9;this[_0x5e5d73(0x51f)][_0x5e5d73(0x156)]>=0x18&&(this[_0x5e5d73(0x51f)][_0x5e5d73(0x156)]-=0x6);},Window_ButtonAssist[_0x3beee9(0x413)][_0x3beee9(0x682)]=function(){const _0x29612e=_0x3beee9;Window_Base[_0x29612e(0x413)]['update'][_0x29612e(0x573)](this),this['updateKeyText']();},Window_ButtonAssist['prototype'][_0x3beee9(0x59b)]=function(){const _0x4c667a=_0x3beee9;this[_0x4c667a(0x143)]=SceneManager[_0x4c667a(0x854)]['getButtonAssistLocation']()!=='button'?0x0:0x8;},Window_ButtonAssist['prototype'][_0x3beee9(0x2e0)]=function(){const _0x481669=_0x3beee9,_0xf69ac6=SceneManager[_0x481669(0x854)];for(let _0x295dba=0x1;_0x295dba<=0x5;_0x295dba++){if(this[_0x481669(0x4f3)][_0x481669(0x486)[_0x481669(0x48d)](_0x295dba)]!==_0xf69ac6[_0x481669(0x7b8)[_0x481669(0x48d)](_0x295dba)]())return this[_0x481669(0x74e)]();if(this[_0x481669(0x4f3)]['text%1'[_0x481669(0x48d)](_0x295dba)]!==_0xf69ac6['buttonAssistText%1'['format'](_0x295dba)]())return this[_0x481669(0x74e)]();}},Window_ButtonAssist[_0x3beee9(0x413)][_0x3beee9(0x74e)]=function(){const _0x3fe197=_0x3beee9;this[_0x3fe197(0x51f)][_0x3fe197(0x168)]();for(let _0x3d9c46=0x1;_0x3d9c46<=0x5;_0x3d9c46++){this[_0x3fe197(0x571)](_0x3d9c46);}},Window_ButtonAssist[_0x3beee9(0x413)][_0x3beee9(0x571)]=function(_0x2bb554){const _0x416b9f=_0x3beee9,_0x432c67=this[_0x416b9f(0x111)]/0x5,_0x5d2c5a=SceneManager[_0x416b9f(0x854)],_0x4843b4=_0x5d2c5a[_0x416b9f(0x7b8)['format'](_0x2bb554)](),_0x1771b8=_0x5d2c5a[_0x416b9f(0x10b)[_0x416b9f(0x48d)](_0x2bb554)]();this[_0x416b9f(0x4f3)][_0x416b9f(0x486)[_0x416b9f(0x48d)](_0x2bb554)]=_0x4843b4,this[_0x416b9f(0x4f3)][_0x416b9f(0x723)['format'](_0x2bb554)]=_0x1771b8;if(_0x4843b4==='')return;if(_0x1771b8==='')return;const _0x1360f3=_0x5d2c5a[_0x416b9f(0x170)[_0x416b9f(0x48d)](_0x2bb554)](),_0x4fe47e=this[_0x416b9f(0x55e)](),_0x1992a9=_0x432c67*(_0x2bb554-0x1)+_0x4fe47e+_0x1360f3,_0x3c1559=VisuMZ[_0x416b9f(0x186)][_0x416b9f(0x46c)]['ButtonAssist']['TextFmt'];this['drawTextEx'](_0x3c1559[_0x416b9f(0x48d)](_0x4843b4,_0x1771b8),_0x1992a9,0x0,_0x432c67-_0x4fe47e*0x2);},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0xde)]=Game_Interpreter['prototype'][_0x3beee9(0x456)],Game_Interpreter[_0x3beee9(0x413)]['updateWaitMode']=function(){const _0xbd3955=_0x3beee9;if($gameTemp[_0xbd3955(0x163)]!==undefined)return VisuMZ['CoreEngine'][_0xbd3955(0x362)]();return VisuMZ[_0xbd3955(0x186)][_0xbd3955(0xde)][_0xbd3955(0x573)](this);},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x362)]=function(){const _0x42af79=_0x3beee9,_0x4b7f4a=$gameTemp[_0x42af79(0x163)]||0x0;(_0x4b7f4a<0x0||_0x4b7f4a>0x64||TouchInput[_0x42af79(0x140)]()||Input['isTriggered'](_0x42af79(0x17b)))&&($gameTemp[_0x42af79(0x163)]=undefined,Input[_0x42af79(0x168)](),TouchInput[_0x42af79(0x168)]());const _0x50c199=$gameScreen[_0x42af79(0x318)](_0x4b7f4a);return _0x50c199&&(_0x50c199['_x']=TouchInput['_x'],_0x50c199['_y']=TouchInput['_y']),VisuMZ[_0x42af79(0x186)][_0x42af79(0x203)](),$gameTemp[_0x42af79(0x163)]!==undefined;},VisuMZ['CoreEngine'][_0x3beee9(0x203)]=function(){const _0x18d232=_0x3beee9,_0x4accda=SceneManager['_scene'];if(!_0x4accda)return;!_0x4accda[_0x18d232(0x6d4)]&&(SoundManager[_0x18d232(0x1ce)](),_0x4accda[_0x18d232(0x6d4)]=new Window_PictureCoordinates(),_0x4accda[_0x18d232(0x343)](_0x4accda['_pictureCoordinatesWindow'])),$gameTemp['_pictureCoordinatesMode']===undefined&&(SoundManager[_0x18d232(0x278)](),_0x4accda[_0x18d232(0x32b)](_0x4accda[_0x18d232(0x6d4)]),_0x4accda['_pictureCoordinatesWindow']=undefined);};function Window_PictureCoordinates(){const _0x4fe613=_0x3beee9;this[_0x4fe613(0x59a)](...arguments);}Window_PictureCoordinates[_0x3beee9(0x413)]=Object['create'](Window_Base['prototype']),Window_PictureCoordinates[_0x3beee9(0x413)]['constructor']=Window_PictureCoordinates,Window_PictureCoordinates[_0x3beee9(0x413)][_0x3beee9(0x59a)]=function(){const _0x4beb9b=_0x3beee9;this[_0x4beb9b(0x4d0)]='nah',this[_0x4beb9b(0x36c)]='nah',this[_0x4beb9b(0x35d)]=_0x4beb9b(0x50d);const _0x46503d=this[_0x4beb9b(0x276)]();Window_Base[_0x4beb9b(0x413)][_0x4beb9b(0x59a)]['call'](this,_0x46503d),this[_0x4beb9b(0x86c)](0x2);},Window_PictureCoordinates[_0x3beee9(0x413)]['windowRect']=function(){const _0x403b13=_0x3beee9;let _0x417e30=0x0,_0x325d8c=Graphics[_0x403b13(0x428)]-this[_0x403b13(0x3f1)](),_0x435b36=Graphics[_0x403b13(0x227)],_0x1e7c15=this[_0x403b13(0x3f1)]();return new Rectangle(_0x417e30,_0x325d8c,_0x435b36,_0x1e7c15);},Window_PictureCoordinates[_0x3beee9(0x413)]['updatePadding']=function(){this['padding']=0x0;},Window_PictureCoordinates['prototype'][_0x3beee9(0x682)]=function(){const _0x2fb43f=_0x3beee9;Window_Base['prototype'][_0x2fb43f(0x682)][_0x2fb43f(0x573)](this),this[_0x2fb43f(0x4b9)]();},Window_PictureCoordinates['prototype'][_0x3beee9(0x4b9)]=function(){const _0x231555=_0x3beee9;if(!this[_0x231555(0x7f9)]())return;this[_0x231555(0x74e)]();},Window_PictureCoordinates[_0x3beee9(0x413)][_0x3beee9(0x7f9)]=function(){const _0x498636=_0x3beee9,_0x2efcd3=$gameTemp['_pictureCoordinatesMode'],_0x3cca65=$gameScreen[_0x498636(0x318)](_0x2efcd3);return _0x3cca65?this['_lastOrigin']!==_0x3cca65[_0x498636(0x5ab)]||this[_0x498636(0x36c)]!==_0x3cca65['_x']||this['_lastY']!==_0x3cca65['_y']:![];},Window_PictureCoordinates['prototype'][_0x3beee9(0x74e)]=function(){const _0x563e10=_0x3beee9;this[_0x563e10(0x51f)]['clear']();const _0x5825e4=$gameTemp[_0x563e10(0x163)],_0x496765=$gameScreen[_0x563e10(0x318)](_0x5825e4);if(!_0x496765)return;this[_0x563e10(0x4d0)]=_0x496765['_origin'],this[_0x563e10(0x36c)]=_0x496765['_x'],this[_0x563e10(0x35d)]=_0x496765['_y'];const _0xa920a0=ColorManager[_0x563e10(0x856)]();this[_0x563e10(0x51f)][_0x563e10(0x3d3)](0x0,0x0,this[_0x563e10(0x111)],this[_0x563e10(0x30d)],_0xa920a0);const _0x25531c='\x20Origin:\x20%1'['format'](_0x496765[_0x563e10(0x5ab)]===0x0?_0x563e10(0x23e):_0x563e10(0x31a)),_0xe4637e=_0x563e10(0x3da)['format'](_0x496765['_x']),_0x3b24fa=_0x563e10(0x4b4)[_0x563e10(0x48d)](_0x496765['_y']),_0x57acee=_0x563e10(0x206)[_0x563e10(0x48d)](TextManager[_0x563e10(0x1dd)](_0x563e10(0x17b)));let _0x499c6e=Math[_0x563e10(0x171)](this[_0x563e10(0x111)]/0x4);this['drawText'](_0x25531c,_0x499c6e*0x0,0x0,_0x499c6e),this[_0x563e10(0x48f)](_0xe4637e,_0x499c6e*0x1,0x0,_0x499c6e,_0x563e10(0x2dd)),this[_0x563e10(0x48f)](_0x3b24fa,_0x499c6e*0x2,0x0,_0x499c6e,_0x563e10(0x2dd));const _0x9c74ff=this[_0x563e10(0x801)](_0x57acee)[_0x563e10(0x227)],_0x144ff4=this[_0x563e10(0x111)]-_0x9c74ff;this[_0x563e10(0x612)](_0x57acee,_0x144ff4,0x0,_0x9c74ff);};function Window_TextPopup(){const _0xe284e3=_0x3beee9;this[_0xe284e3(0x59a)](...arguments);}Window_TextPopup[_0x3beee9(0x413)]=Object['create'](Window_Base[_0x3beee9(0x413)]),Window_TextPopup[_0x3beee9(0x413)][_0x3beee9(0x1b0)]=Window_TextPopup,Window_TextPopup[_0x3beee9(0x52b)]={'framesPerChar':VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x46c)][_0x3beee9(0x1e8)][_0x3beee9(0x34a)]??1.5,'framesMin':VisuMZ[_0x3beee9(0x186)]['Settings'][_0x3beee9(0x1e8)][_0x3beee9(0x3fc)]??0x5a,'framesMax':VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x46c)][_0x3beee9(0x1e8)][_0x3beee9(0x6df)]??0x12c},Window_TextPopup['prototype'][_0x3beee9(0x59a)]=function(){const _0x1b2732=_0x3beee9,_0x5c4e83=new Rectangle(0x0,0x0,0x1,0x1);Window_Base[_0x1b2732(0x413)]['initialize'][_0x1b2732(0x573)](this,_0x5c4e83),this['openness']=0x0,this[_0x1b2732(0x45c)]='',this[_0x1b2732(0x5c1)]=[],this[_0x1b2732(0x392)]=0x0;},Window_TextPopup['prototype'][_0x3beee9(0x4ef)]=function(){return!![];},Window_TextPopup[_0x3beee9(0x413)][_0x3beee9(0x61a)]=function(_0x3d2c5b){const _0x1123f0=_0x3beee9;if(this['_textQueue'][this[_0x1123f0(0x5c1)]['length']-0x1]===_0x3d2c5b)return;this[_0x1123f0(0x5c1)][_0x1123f0(0x188)](_0x3d2c5b),SceneManager[_0x1123f0(0x854)][_0x1123f0(0x343)](this);},Window_TextPopup[_0x3beee9(0x413)][_0x3beee9(0x682)]=function(){const _0x123c42=_0x3beee9;Window_Base[_0x123c42(0x413)][_0x123c42(0x682)][_0x123c42(0x573)](this),this[_0x123c42(0x518)](),this[_0x123c42(0x3a7)]();},Window_TextPopup[_0x3beee9(0x413)][_0x3beee9(0x518)]=function(){const _0xd50da3=_0x3beee9;if(this[_0xd50da3(0x45c)]!=='')return;if(this[_0xd50da3(0x5c1)][_0xd50da3(0x228)]<=0x0)return;if(!this[_0xd50da3(0x5d0)]())return;this[_0xd50da3(0x45c)]=this['_textQueue']['shift']();const _0x3a431a=Window_TextPopup[_0xd50da3(0x52b)],_0xb8a7fe=Math[_0xd50da3(0x139)](this['_text'][_0xd50da3(0x228)]*_0x3a431a[_0xd50da3(0x150)]);this[_0xd50da3(0x392)]=_0xb8a7fe[_0xd50da3(0x3fd)](_0x3a431a[_0xd50da3(0x795)],_0x3a431a[_0xd50da3(0x67c)]);const _0x577c89=this[_0xd50da3(0x801)](this[_0xd50da3(0x45c)]);let _0xfa8b32=_0x577c89[_0xd50da3(0x227)]+this[_0xd50da3(0x55e)]()*0x2;_0xfa8b32+=$gameSystem['windowPadding']()*0x2;let _0x3b08b1=Math[_0xd50da3(0x38a)](_0x577c89[_0xd50da3(0x428)],this[_0xd50da3(0x3f1)]());_0x3b08b1+=$gameSystem[_0xd50da3(0x515)]()*0x2;const _0x1be215=Math[_0xd50da3(0x368)]((Graphics['width']-_0xfa8b32)/0x2),_0x16ec31=Math[_0xd50da3(0x368)]((Graphics[_0xd50da3(0x428)]-_0x3b08b1)/0x2),_0x365730=new Rectangle(_0x1be215,_0x16ec31,_0xfa8b32,_0x3b08b1);this['move'](_0x365730['x'],_0x365730['y'],_0x365730[_0xd50da3(0x227)],_0x365730[_0xd50da3(0x428)]),this['createContents'](),this[_0xd50da3(0x74e)](),this[_0xd50da3(0x458)](),SceneManager[_0xd50da3(0x854)][_0xd50da3(0x343)](this);},Window_TextPopup[_0x3beee9(0x413)]['refresh']=function(){const _0x58809a=_0x3beee9,_0x5d9a1a=this['baseTextRect']();this[_0x58809a(0x51f)][_0x58809a(0x168)](),this[_0x58809a(0x612)](this[_0x58809a(0x45c)],_0x5d9a1a['x'],_0x5d9a1a['y'],_0x5d9a1a[_0x58809a(0x227)]);},Window_TextPopup[_0x3beee9(0x413)][_0x3beee9(0x3a7)]=function(){const _0x4ac65f=_0x3beee9;if(this[_0x4ac65f(0x4a6)]()||this[_0x4ac65f(0x18d)]())return;if(this[_0x4ac65f(0x392)]<=0x0)return;this[_0x4ac65f(0x392)]--,this['_timeDuration']<=0x0&&(this[_0x4ac65f(0x172)](),this['_text']='');},VisuMZ[_0x3beee9(0x7dc)]=function(_0x266c98){const _0x5332ff=_0x3beee9;if(Utils[_0x5332ff(0x46b)](_0x5332ff(0x97))){var _0x27437b=require('nw.gui')[_0x5332ff(0x1e8)][_0x5332ff(0x525)]();SceneManager['showDevTools']();if(_0x266c98)setTimeout(_0x27437b[_0x5332ff(0x4c6)][_0x5332ff(0x4d9)](_0x27437b),0x190);}},VisuMZ['ApplyEasing']=function(_0x2a7e39,_0x461dd1){const _0x36701b=_0x3beee9;_0x461dd1=_0x461dd1[_0x36701b(0x4d5)]();var _0x47cf5c=1.70158,_0xf68a0f=0.7;switch(_0x461dd1){case _0x36701b(0x207):return _0x2a7e39;case _0x36701b(0x1c1):return-0x1*Math[_0x36701b(0x58c)](_0x2a7e39*(Math['PI']/0x2))+0x1;case _0x36701b(0x4ab):return Math[_0x36701b(0x6e8)](_0x2a7e39*(Math['PI']/0x2));case _0x36701b(0x118):return-0.5*(Math[_0x36701b(0x58c)](Math['PI']*_0x2a7e39)-0x1);case _0x36701b(0x241):return _0x2a7e39*_0x2a7e39;case _0x36701b(0x7d5):return _0x2a7e39*(0x2-_0x2a7e39);case _0x36701b(0x6d2):return _0x2a7e39<0.5?0x2*_0x2a7e39*_0x2a7e39:-0x1+(0x4-0x2*_0x2a7e39)*_0x2a7e39;case _0x36701b(0x7b4):return _0x2a7e39*_0x2a7e39*_0x2a7e39;case _0x36701b(0x346):var _0x3efa66=_0x2a7e39-0x1;return _0x3efa66*_0x3efa66*_0x3efa66+0x1;case _0x36701b(0x2cf):return _0x2a7e39<0.5?0x4*_0x2a7e39*_0x2a7e39*_0x2a7e39:(_0x2a7e39-0x1)*(0x2*_0x2a7e39-0x2)*(0x2*_0x2a7e39-0x2)+0x1;case'INQUART':return _0x2a7e39*_0x2a7e39*_0x2a7e39*_0x2a7e39;case _0x36701b(0x659):var _0x3efa66=_0x2a7e39-0x1;return 0x1-_0x3efa66*_0x3efa66*_0x3efa66*_0x3efa66;case _0x36701b(0x380):var _0x3efa66=_0x2a7e39-0x1;return _0x2a7e39<0.5?0x8*_0x2a7e39*_0x2a7e39*_0x2a7e39*_0x2a7e39:0x1-0x8*_0x3efa66*_0x3efa66*_0x3efa66*_0x3efa66;case'INQUINT':return _0x2a7e39*_0x2a7e39*_0x2a7e39*_0x2a7e39*_0x2a7e39;case _0x36701b(0xc7):var _0x3efa66=_0x2a7e39-0x1;return 0x1+_0x3efa66*_0x3efa66*_0x3efa66*_0x3efa66*_0x3efa66;case _0x36701b(0x5d7):var _0x3efa66=_0x2a7e39-0x1;return _0x2a7e39<0.5?0x10*_0x2a7e39*_0x2a7e39*_0x2a7e39*_0x2a7e39*_0x2a7e39:0x1+0x10*_0x3efa66*_0x3efa66*_0x3efa66*_0x3efa66*_0x3efa66;case _0x36701b(0x287):if(_0x2a7e39===0x0)return 0x0;return Math[_0x36701b(0x268)](0x2,0xa*(_0x2a7e39-0x1));case _0x36701b(0x2fc):if(_0x2a7e39===0x1)return 0x1;return-Math[_0x36701b(0x268)](0x2,-0xa*_0x2a7e39)+0x1;case _0x36701b(0x11c):if(_0x2a7e39===0x0||_0x2a7e39===0x1)return _0x2a7e39;var _0x22a406=_0x2a7e39*0x2,_0x4195c4=_0x22a406-0x1;if(_0x22a406<0x1)return 0.5*Math[_0x36701b(0x268)](0x2,0xa*_0x4195c4);return 0.5*(-Math[_0x36701b(0x268)](0x2,-0xa*_0x4195c4)+0x2);case'INCIRC':var _0x22a406=_0x2a7e39/0x1;return-0x1*(Math[_0x36701b(0x7b3)](0x1-_0x22a406*_0x2a7e39)-0x1);case _0x36701b(0x2a8):var _0x3efa66=_0x2a7e39-0x1;return Math[_0x36701b(0x7b3)](0x1-_0x3efa66*_0x3efa66);case'INOUTCIRC':var _0x22a406=_0x2a7e39*0x2,_0x4195c4=_0x22a406-0x2;if(_0x22a406<0x1)return-0.5*(Math[_0x36701b(0x7b3)](0x1-_0x22a406*_0x22a406)-0x1);return 0.5*(Math['sqrt'](0x1-_0x4195c4*_0x4195c4)+0x1);case _0x36701b(0x764):return _0x2a7e39*_0x2a7e39*((_0x47cf5c+0x1)*_0x2a7e39-_0x47cf5c);case _0x36701b(0x4f7):var _0x22a406=_0x2a7e39/0x1-0x1;return _0x22a406*_0x22a406*((_0x47cf5c+0x1)*_0x22a406+_0x47cf5c)+0x1;break;case _0x36701b(0x6f0):var _0x22a406=_0x2a7e39*0x2,_0x1ec446=_0x22a406-0x2,_0x25c796=_0x47cf5c*1.525;if(_0x22a406<0x1)return 0.5*_0x22a406*_0x22a406*((_0x25c796+0x1)*_0x22a406-_0x25c796);return 0.5*(_0x1ec446*_0x1ec446*((_0x25c796+0x1)*_0x1ec446+_0x25c796)+0x2);case _0x36701b(0x135):if(_0x2a7e39===0x0||_0x2a7e39===0x1)return _0x2a7e39;var _0x22a406=_0x2a7e39/0x1,_0x4195c4=_0x22a406-0x1,_0x17ceba=0x1-_0xf68a0f,_0x25c796=_0x17ceba/(0x2*Math['PI'])*Math['asin'](0x1);return-(Math[_0x36701b(0x268)](0x2,0xa*_0x4195c4)*Math[_0x36701b(0x6e8)]((_0x4195c4-_0x25c796)*(0x2*Math['PI'])/_0x17ceba));case'OUTELASTIC':var _0x17ceba=0x1-_0xf68a0f,_0x22a406=_0x2a7e39*0x2;if(_0x2a7e39===0x0||_0x2a7e39===0x1)return _0x2a7e39;var _0x25c796=_0x17ceba/(0x2*Math['PI'])*Math[_0x36701b(0x464)](0x1);return Math[_0x36701b(0x268)](0x2,-0xa*_0x22a406)*Math[_0x36701b(0x6e8)]((_0x22a406-_0x25c796)*(0x2*Math['PI'])/_0x17ceba)+0x1;case _0x36701b(0xd3):var _0x17ceba=0x1-_0xf68a0f;if(_0x2a7e39===0x0||_0x2a7e39===0x1)return _0x2a7e39;var _0x22a406=_0x2a7e39*0x2,_0x4195c4=_0x22a406-0x1,_0x25c796=_0x17ceba/(0x2*Math['PI'])*Math[_0x36701b(0x464)](0x1);if(_0x22a406<0x1)return-0.5*(Math[_0x36701b(0x268)](0x2,0xa*_0x4195c4)*Math[_0x36701b(0x6e8)]((_0x4195c4-_0x25c796)*(0x2*Math['PI'])/_0x17ceba));return Math[_0x36701b(0x268)](0x2,-0xa*_0x4195c4)*Math[_0x36701b(0x6e8)]((_0x4195c4-_0x25c796)*(0x2*Math['PI'])/_0x17ceba)*0.5+0x1;case _0x36701b(0x65e):var _0x22a406=_0x2a7e39/0x1;if(_0x22a406<0x1/2.75)return 7.5625*_0x22a406*_0x22a406;else{if(_0x22a406<0x2/2.75){var _0x1ec446=_0x22a406-1.5/2.75;return 7.5625*_0x1ec446*_0x1ec446+0.75;}else{if(_0x22a406<2.5/2.75){var _0x1ec446=_0x22a406-2.25/2.75;return 7.5625*_0x1ec446*_0x1ec446+0.9375;}else{var _0x1ec446=_0x22a406-2.625/2.75;return 7.5625*_0x1ec446*_0x1ec446+0.984375;}}}case _0x36701b(0x672):var _0x5e4b20=0x1-VisuMZ[_0x36701b(0x429)](0x1-_0x2a7e39,_0x36701b(0x6e6));return _0x5e4b20;case _0x36701b(0x454):if(_0x2a7e39<0.5)var _0x5e4b20=VisuMZ[_0x36701b(0x429)](_0x2a7e39*0x2,'inbounce')*0.5;else var _0x5e4b20=VisuMZ[_0x36701b(0x429)](_0x2a7e39*0x2-0x1,'outbounce')*0.5+0.5;return _0x5e4b20;default:return _0x2a7e39;}},VisuMZ[_0x3beee9(0x39a)]=function(_0x3b97f6){const _0x108b98=_0x3beee9;_0x3b97f6=String(_0x3b97f6)[_0x108b98(0x4d5)]();const _0x11d158=VisuMZ['CoreEngine'][_0x108b98(0x46c)][_0x108b98(0x234)];if(_0x3b97f6===_0x108b98(0x64f))return _0x11d158[_0x108b98(0x4f0)];if(_0x3b97f6===_0x108b98(0x27f))return _0x11d158[_0x108b98(0x165)];if(_0x3b97f6===_0x108b98(0x309))return _0x11d158['IconParam2'];if(_0x3b97f6===_0x108b98(0x329))return _0x11d158['IconParam3'];if(_0x3b97f6==='MAT')return _0x11d158['IconParam4'];if(_0x3b97f6==='MDF')return _0x11d158[_0x108b98(0xcc)];if(_0x3b97f6===_0x108b98(0x67f))return _0x11d158['IconParam6'];if(_0x3b97f6==='LUK')return _0x11d158[_0x108b98(0x3be)];if(_0x3b97f6===_0x108b98(0x56f))return _0x11d158[_0x108b98(0x3aa)];if(_0x3b97f6===_0x108b98(0x720))return _0x11d158[_0x108b98(0x4b2)];if(_0x3b97f6===_0x108b98(0x246))return _0x11d158[_0x108b98(0x68b)];if(_0x3b97f6===_0x108b98(0x4e2))return _0x11d158[_0x108b98(0x804)];if(_0x3b97f6==='MEV')return _0x11d158[_0x108b98(0x82f)];if(_0x3b97f6===_0x108b98(0x107))return _0x11d158[_0x108b98(0x5f2)];if(_0x3b97f6===_0x108b98(0x79e))return _0x11d158['IconXParam6'];if(_0x3b97f6===_0x108b98(0x322))return _0x11d158[_0x108b98(0x635)];if(_0x3b97f6===_0x108b98(0x859))return _0x11d158['IconXParam8'];if(_0x3b97f6==='TRG')return _0x11d158[_0x108b98(0x3e0)];if(_0x3b97f6==='TGR')return _0x11d158[_0x108b98(0x6cc)];if(_0x3b97f6===_0x108b98(0x62c))return _0x11d158[_0x108b98(0x426)];if(_0x3b97f6===_0x108b98(0x49a))return _0x11d158[_0x108b98(0x17c)];if(_0x3b97f6===_0x108b98(0x11d))return _0x11d158[_0x108b98(0x4cb)];if(_0x3b97f6==='MCR')return _0x11d158[_0x108b98(0x5c7)];if(_0x3b97f6===_0x108b98(0x667))return _0x11d158[_0x108b98(0x5b9)];if(_0x3b97f6===_0x108b98(0x452))return _0x11d158[_0x108b98(0x11f)];if(_0x3b97f6===_0x108b98(0x3d7))return _0x11d158[_0x108b98(0x542)];if(_0x3b97f6===_0x108b98(0x183))return _0x11d158[_0x108b98(0x6c4)];if(_0x3b97f6===_0x108b98(0x7a3))return _0x11d158[_0x108b98(0x4df)];if(VisuMZ[_0x108b98(0x186)][_0x108b98(0x312)][_0x3b97f6])return VisuMZ[_0x108b98(0x186)][_0x108b98(0x312)][_0x3b97f6]||0x0;return 0x0;},VisuMZ['ConvertNumberToString']=function(_0x15f87f,_0x21d2fb,_0x166ee8){const _0x36cc76=_0x3beee9;if(_0x166ee8===undefined&&_0x15f87f%0x1===0x0)return _0x15f87f;if(_0x166ee8!==undefined&&[_0x36cc76(0x64f),_0x36cc76(0x27f),'ATK',_0x36cc76(0x329),_0x36cc76(0x2a0),_0x36cc76(0x7b9),_0x36cc76(0x67f),_0x36cc76(0xfc)][_0x36cc76(0x820)](String(_0x166ee8)['toUpperCase']()[_0x36cc76(0x42d)]()))return _0x15f87f;_0x21d2fb=_0x21d2fb||0x0;if(VisuMZ[_0x36cc76(0x186)][_0x36cc76(0x67b)][_0x166ee8])return VisuMZ[_0x36cc76(0x186)][_0x36cc76(0x622)][_0x166ee8]===_0x36cc76(0x99)?_0x15f87f:String((_0x15f87f*0x64)['toFixed'](_0x21d2fb))+'%';return String((_0x15f87f*0x64)[_0x36cc76(0x2bd)](_0x21d2fb))+'%';},VisuMZ['GroupDigits']=function(_0x219f9b){const _0x23ced0=_0x3beee9;_0x219f9b=String(_0x219f9b);if(!_0x219f9b)return _0x219f9b;if(typeof _0x219f9b!==_0x23ced0(0x849))return _0x219f9b;const _0x5ca8b6=VisuMZ[_0x23ced0(0x186)][_0x23ced0(0x46c)][_0x23ced0(0x72e)][_0x23ced0(0x751)]||_0x23ced0(0x621),_0x33431a={'maximumFractionDigits':0x6};_0x219f9b=_0x219f9b[_0x23ced0(0x6bf)](/\[(.*?)\]/g,(_0x3d0ff7,_0x2d92e4)=>{const _0x58c4bb=_0x23ced0;return VisuMZ[_0x58c4bb(0xee)](_0x2d92e4,'[',']');}),_0x219f9b=_0x219f9b[_0x23ced0(0x6bf)](/<(.*?)>/g,(_0x438b47,_0xc3b5d0)=>{return VisuMZ['PreserveNumbers'](_0xc3b5d0,'<','>');}),_0x219f9b=_0x219f9b[_0x23ced0(0x6bf)](/\{\{(.*?)\}\}/g,(_0x2af44f,_0x1c41ef)=>{return VisuMZ['PreserveNumbers'](_0x1c41ef,'','');}),_0x219f9b=_0x219f9b[_0x23ced0(0x6bf)](/(\d+\.?\d*)/g,(_0x17e577,_0x134d87)=>{const _0x234bad=_0x23ced0;let _0x915171=_0x134d87;if(_0x915171[0x0]==='0')return _0x915171;if(_0x915171[_0x915171[_0x234bad(0x228)]-0x1]==='.')return Number(_0x915171)['toLocaleString'](_0x5ca8b6,_0x33431a)+'.';else return _0x915171[_0x915171['length']-0x1]===','?Number(_0x915171)[_0x234bad(0x632)](_0x5ca8b6,_0x33431a)+',':Number(_0x915171)[_0x234bad(0x632)](_0x5ca8b6,_0x33431a);});let _0x25732d=0x3;while(_0x25732d--){_0x219f9b=VisuMZ[_0x23ced0(0x25d)](_0x219f9b);}return _0x219f9b;},VisuMZ[_0x3beee9(0xee)]=function(_0x4918d8,_0xdf769f,_0x209312){const _0x15e420=_0x3beee9;return _0x4918d8=_0x4918d8['replace'](/(\d)/gi,(_0x4d67f2,_0x87e91b)=>'PRESERVCONVERSION(%1)'[_0x15e420(0x48d)](Number(_0x87e91b))),_0x15e420(0xeb)[_0x15e420(0x48d)](_0x4918d8,_0xdf769f,_0x209312);},VisuMZ[_0x3beee9(0x25d)]=function(_0x1a3e41){const _0x1d995a=_0x3beee9;return _0x1a3e41=_0x1a3e41[_0x1d995a(0x6bf)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x4d8c58,_0x9882d8)=>Number(parseInt(_0x9882d8))),_0x1a3e41;},VisuMZ['openURL']=function(_0x5adfd7){const _0x5a3d93=_0x3beee9;SoundManager[_0x5a3d93(0x6bc)]();if(!Utils[_0x5a3d93(0x86e)]()){const _0xa2b7df=window[_0x5a3d93(0x458)](_0x5adfd7,_0x5a3d93(0x2ac));}else{const _0xb5573e=process[_0x5a3d93(0x7b0)]==_0x5a3d93(0x50f)?_0x5a3d93(0x458):process[_0x5a3d93(0x7b0)]==_0x5a3d93(0x5ed)?_0x5a3d93(0x51d):'xdg-open';require(_0x5a3d93(0x64a))[_0x5a3d93(0x6fe)](_0xb5573e+'\x20'+_0x5adfd7);}},VisuMZ[_0x3beee9(0x7ff)]=function(_0x154d60,_0x1fab15){const _0x1ad096=_0x3beee9;if(!_0x154d60)return'';const _0x4218c6=_0x154d60['baseId']||_0x154d60['id'];let _0x17c50b='';return _0x154d60[_0x1ad096(0x1f3)]!==undefined&&_0x154d60[_0x1ad096(0x24e)]!==undefined&&(_0x17c50b=_0x1ad096(0x100)[_0x1ad096(0x48d)](_0x4218c6,_0x1fab15)),_0x154d60[_0x1ad096(0x31b)]!==undefined&&_0x154d60['learnings']!==undefined&&(_0x17c50b=_0x1ad096(0x273)[_0x1ad096(0x48d)](_0x4218c6,_0x1fab15)),_0x154d60[_0x1ad096(0xa7)]!==undefined&&_0x154d60[_0x1ad096(0xef)]!==undefined&&(_0x17c50b='Skill-%1-%2'['format'](_0x4218c6,_0x1fab15)),_0x154d60[_0x1ad096(0x439)]!==undefined&&_0x154d60[_0x1ad096(0x5a6)]!==undefined&&(_0x17c50b='Item-%1-%2'[_0x1ad096(0x48d)](_0x4218c6,_0x1fab15)),_0x154d60['wtypeId']!==undefined&&_0x154d60[_0x1ad096(0x3e2)]===0x1&&(_0x17c50b='Weapon-%1-%2'[_0x1ad096(0x48d)](_0x4218c6,_0x1fab15)),_0x154d60[_0x1ad096(0x4aa)]!==undefined&&_0x154d60[_0x1ad096(0x3e2)]>0x1&&(_0x17c50b='Armor-%1-%2'[_0x1ad096(0x48d)](_0x4218c6,_0x1fab15)),_0x154d60[_0x1ad096(0x20d)]!==undefined&&_0x154d60[_0x1ad096(0x5a1)]!==undefined&&(_0x17c50b='Enemy-%1-%2'[_0x1ad096(0x48d)](_0x4218c6,_0x1fab15)),_0x154d60[_0x1ad096(0x624)]!==undefined&&_0x154d60[_0x1ad096(0x2e1)]!==undefined&&(_0x17c50b='State-%1-%2'[_0x1ad096(0x48d)](_0x4218c6,_0x1fab15)),_0x17c50b;},Window_Base[_0x3beee9(0x413)]['processDrawIcon']=function(_0x3fb29d,_0x415562){const _0x5e43a6=_0x3beee9,_0x3a2e76=ImageManager[_0x5e43a6(0x611)]||0x20,_0x48e692=ImageManager[_0x5e43a6(0x373)]||0x20;if(_0x415562[_0x5e43a6(0x2b4)]){const _0x55dffc=_0x3a2e76-ImageManager['iconWidth'],_0x564fea=_0x48e692-ImageManager[_0x5e43a6(0x559)];let _0x27fb85=0x2,_0x2d3db2=0x2;this[_0x5e43a6(0x3f1)]()!==0x24&&(_0x2d3db2=Math['floor']((this[_0x5e43a6(0x3f1)]()-_0x48e692)/0x2));const _0xcce5bc=_0x415562['x']+Math['floor'](_0x55dffc/0x2)+_0x27fb85,_0x5357c8=_0x415562['y']+Math[_0x5e43a6(0x171)](_0x564fea/0x2)+_0x2d3db2;this[_0x5e43a6(0x763)](_0x3fb29d,_0xcce5bc,_0x5357c8);}_0x415562['x']+=_0x3a2e76+0x4;},Window_StatusBase[_0x3beee9(0x413)][_0x3beee9(0x7ba)]=function(_0x58d870,_0x2e7cb0,_0x2f7f6a,_0x1f754d){const _0x4bd381=_0x3beee9;_0x1f754d=_0x1f754d||0x90;const _0x44000e=ImageManager[_0x4bd381(0x611)]||0x20,_0x2d2d4a=ImageManager['standardIconHeight']||0x20,_0x53babc=_0x44000e-ImageManager[_0x4bd381(0x6dc)],_0x21c390=_0x2d2d4a-ImageManager['iconHeight'],_0x39c77f=_0x44000e,_0x38daea=_0x58d870[_0x4bd381(0x3c7)]()[_0x4bd381(0x2f9)](0x0,Math[_0x4bd381(0x171)](_0x1f754d/_0x39c77f));let _0x5d30d5=_0x2e7cb0+Math[_0x4bd381(0x139)](_0x53babc/0x2),_0x4cdd64=_0x2f7f6a+Math[_0x4bd381(0x139)](_0x21c390/0x2);for(const _0x5c04fd of _0x38daea){this[_0x4bd381(0x763)](_0x5c04fd,_0x5d30d5,_0x4cdd64),_0x5d30d5+=_0x39c77f;}},Game_Picture[_0x3beee9(0x413)][_0x3beee9(0x423)]=function(){const _0x39976d=_0x3beee9;return this[_0x39976d(0xfe)];},VisuMZ[_0x3beee9(0x186)]['Game_Picture_initBasic']=Game_Picture[_0x3beee9(0x413)][_0x3beee9(0x7f1)],Game_Picture[_0x3beee9(0x413)][_0x3beee9(0x7f1)]=function(){const _0x374379=_0x3beee9;VisuMZ[_0x374379(0x186)][_0x374379(0x5ca)]['call'](this),this[_0x374379(0xfe)]={'x':0x0,'y':0x0},this[_0x374379(0x71c)]={'x':0x0,'y':0x0};},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x835)]=Game_Picture[_0x3beee9(0x413)][_0x3beee9(0x1bc)],Game_Picture[_0x3beee9(0x413)][_0x3beee9(0x1bc)]=function(){const _0x262d53=_0x3beee9;this[_0x262d53(0x5b2)]();const _0x4e43e6=this[_0x262d53(0x65f)];VisuMZ[_0x262d53(0x186)][_0x262d53(0x835)][_0x262d53(0x573)](this),_0x4e43e6>0x0&&this[_0x262d53(0x65f)]<=0x0&&(this['_x']=this[_0x262d53(0x530)],this['_y']=this[_0x262d53(0x21b)],this[_0x262d53(0x63d)]=this['_targetScaleX'],this['_scaleY']=this['_targetScaleY'],this[_0x262d53(0x26a)]=this['_targetOpacity'],this[_0x262d53(0xfe)]&&(this[_0x262d53(0xfe)]['x']=this['_targetAnchor']['x'],this[_0x262d53(0xfe)]['y']=this['_targetAnchor']['y']));},VisuMZ['CoreEngine'][_0x3beee9(0x477)]=Game_Picture['prototype']['show'],Game_Picture[_0x3beee9(0x413)][_0x3beee9(0x526)]=function(_0x1da4b6,_0x25eaf3,_0x4a049b,_0x8232d9,_0x4c4afc,_0x3ef2d7,_0xe0fc28,_0x5a52d2){const _0x2e9ef3=_0x3beee9;VisuMZ[_0x2e9ef3(0x186)][_0x2e9ef3(0x477)][_0x2e9ef3(0x573)](this,_0x1da4b6,_0x25eaf3,_0x4a049b,_0x8232d9,_0x4c4afc,_0x3ef2d7,_0xe0fc28,_0x5a52d2),this[_0x2e9ef3(0x141)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x25eaf3]||{'x':0x0,'y':0x0});},VisuMZ['CoreEngine']['Game_Picture_move']=Game_Picture[_0x3beee9(0x413)][_0x3beee9(0x22d)],Game_Picture[_0x3beee9(0x413)][_0x3beee9(0x22d)]=function(_0x2c5341,_0x28eb90,_0x5a2c86,_0x164a8d,_0x5923fe,_0x32ec61,_0x3371b2,_0x51d640,_0x169933){const _0x3a3d19=_0x3beee9;VisuMZ['CoreEngine'][_0x3a3d19(0x301)][_0x3a3d19(0x573)](this,_0x2c5341,_0x28eb90,_0x5a2c86,_0x164a8d,_0x5923fe,_0x32ec61,_0x3371b2,_0x51d640,_0x169933),this[_0x3a3d19(0xc0)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x2c5341]||{'x':0x0,'y':0x0});},Game_Picture[_0x3beee9(0x413)]['updateAnchor']=function(){const _0x1b7f4d=_0x3beee9;this[_0x1b7f4d(0x65f)]>0x0&&(this[_0x1b7f4d(0xfe)]['x']=this[_0x1b7f4d(0x35b)](this[_0x1b7f4d(0xfe)]['x'],this[_0x1b7f4d(0x71c)]['x']),this[_0x1b7f4d(0xfe)]['y']=this[_0x1b7f4d(0x35b)](this[_0x1b7f4d(0xfe)]['y'],this[_0x1b7f4d(0x71c)]['y']));},Game_Picture[_0x3beee9(0x413)]['setAnchor']=function(_0x12971a){const _0x2738eb=_0x3beee9;this[_0x2738eb(0xfe)]=_0x12971a,this['_targetAnchor']=JsonEx['makeDeepCopy'](this[_0x2738eb(0xfe)]);},Game_Picture[_0x3beee9(0x413)][_0x3beee9(0xc0)]=function(_0x485d06){const _0x577e13=_0x3beee9;this[_0x577e13(0x71c)]=_0x485d06;},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x7aa)]=Sprite_Picture[_0x3beee9(0x413)]['updateOrigin'],Sprite_Picture['prototype'][_0x3beee9(0xae)]=function(){const _0x53df0d=_0x3beee9,_0x2dae5b=this['picture']();!_0x2dae5b[_0x53df0d(0x423)]()?VisuMZ['CoreEngine'][_0x53df0d(0x7aa)]['call'](this):(this[_0x53df0d(0x423)]['x']=_0x2dae5b[_0x53df0d(0x423)]()['x'],this['anchor']['y']=_0x2dae5b[_0x53df0d(0x423)]()['y']);},Game_Action[_0x3beee9(0x413)][_0x3beee9(0x4a8)]=function(_0x23c6d6){const _0x430574=_0x3beee9;if(_0x23c6d6){const _0x4795da=_0x23c6d6[_0x430574(0x84a)];if(_0x4795da===0x1&&this[_0x430574(0x294)]()[_0x430574(0x422)]()!==0x1)this['setAttack']();else _0x4795da===0x2&&this[_0x430574(0x294)]()[_0x430574(0x30c)]()!==0x2?this[_0x430574(0x12d)]():this[_0x430574(0x832)](_0x4795da);}else this[_0x430574(0x168)]();},Game_Actor[_0x3beee9(0x413)][_0x3beee9(0x860)]=function(){const _0x3de521=_0x3beee9;return this[_0x3de521(0x480)]()[_0x3de521(0x7fd)](_0x56f597=>this[_0x3de521(0x7ae)](_0x56f597)&&this[_0x3de521(0xf1)]()[_0x3de521(0x820)](_0x56f597['stypeId']));},Window_Base[_0x3beee9(0x413)][_0x3beee9(0x2b3)]=function(){const _0x2a3a34=_0x3beee9;this[_0x2a3a34(0x4b5)]=new Sprite(),this['_dimmerSprite'][_0x2a3a34(0x3ad)]=new Bitmap(0x0,0x0),this['_dimmerSprite']['x']=0x0,this[_0x2a3a34(0x512)](this['_dimmerSprite']);},Window_Base['prototype'][_0x3beee9(0x66e)]=function(){const _0xd1c2b8=_0x3beee9;if(this[_0xd1c2b8(0x4b5)]){const _0x4633dc=this[_0xd1c2b8(0x4b5)]['bitmap'],_0x451cf8=this[_0xd1c2b8(0x227)],_0x18b477=this['height'],_0x1e8588=this['padding'],_0x5ef2a3=ColorManager[_0xd1c2b8(0x1ed)](),_0xd4013b=ColorManager['dimColor2']();_0x4633dc[_0xd1c2b8(0x7f3)](_0x451cf8,_0x18b477),_0x4633dc[_0xd1c2b8(0x1fa)](0x0,0x0,_0x451cf8,_0x1e8588,_0xd4013b,_0x5ef2a3,!![]),_0x4633dc['fillRect'](0x0,_0x1e8588,_0x451cf8,_0x18b477-_0x1e8588*0x2,_0x5ef2a3),_0x4633dc[_0xd1c2b8(0x1fa)](0x0,_0x18b477-_0x1e8588,_0x451cf8,_0x1e8588,_0x5ef2a3,_0xd4013b,!![]),this[_0xd1c2b8(0x4b5)][_0xd1c2b8(0x269)](0x0,0x0,_0x451cf8,_0x18b477);}},Game_Actor[_0x3beee9(0x413)]['makeAutoBattleActions']=function(){const _0x4ce4d8=_0x3beee9;for(let _0x479ebc=0x0;_0x479ebc<this['numActions']();_0x479ebc++){const _0x1e660e=this[_0x4ce4d8(0xe0)]();let _0x3181fc=Number[_0x4ce4d8(0x16f)];this[_0x4ce4d8(0x1cb)](_0x479ebc,_0x1e660e[0x0]);for(const _0x355377 of _0x1e660e){const _0x4f85ed=_0x355377[_0x4ce4d8(0x231)]();_0x4f85ed>_0x3181fc&&(_0x3181fc=_0x4f85ed,this[_0x4ce4d8(0x1cb)](_0x479ebc,_0x355377));}}this['setActionState'](_0x4ce4d8(0x601));},Window_BattleItem[_0x3beee9(0x413)][_0x3beee9(0x190)]=function(_0x28fc56){const _0x54bdd4=_0x3beee9;return BattleManager[_0x54bdd4(0x5df)]()?BattleManager[_0x54bdd4(0x5df)]()['canUse'](_0x28fc56):Window_ItemList[_0x54bdd4(0x413)][_0x54bdd4(0x190)][_0x54bdd4(0x573)](this,_0x28fc56);},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0xe9)]=Scene_Map[_0x3beee9(0x413)][_0x3beee9(0x1d1)],Scene_Map['prototype']['createSpriteset']=function(){const _0x181de1=_0x3beee9;VisuMZ['CoreEngine']['Scene_Map_createSpritesetFix'][_0x181de1(0x573)](this);const _0x2dcc0d=this[_0x181de1(0x687)]['_timerSprite'];if(_0x2dcc0d)this[_0x181de1(0x343)](_0x2dcc0d);},VisuMZ['CoreEngine'][_0x3beee9(0x63a)]=Scene_Battle[_0x3beee9(0x413)]['createSpriteset'],Scene_Battle[_0x3beee9(0x413)][_0x3beee9(0x1d1)]=function(){const _0x55a513=_0x3beee9;VisuMZ[_0x55a513(0x186)][_0x55a513(0x63a)][_0x55a513(0x573)](this);const _0x5bdf2c=this[_0x55a513(0x687)]['_timerSprite'];if(_0x5bdf2c)this[_0x55a513(0x343)](_0x5bdf2c);},Sprite_Actor[_0x3beee9(0x413)][_0x3beee9(0x682)]=function(){const _0x4f2e19=_0x3beee9;Sprite_Battler[_0x4f2e19(0x413)]['update'][_0x4f2e19(0x573)](this),this[_0x4f2e19(0x8b)]();if(this[_0x4f2e19(0x3ec)])this[_0x4f2e19(0x1fd)]();else this[_0x4f2e19(0x557)]!==''&&(this[_0x4f2e19(0x557)]='');},Window[_0x3beee9(0x413)][_0x3beee9(0x208)]=function(){const _0x2d5e9e=_0x3beee9,_0x18b7b5=this[_0x2d5e9e(0x6a9)],_0x515366=this[_0x2d5e9e(0x295)],_0x1c2c9b=0x18,_0x478575=_0x1c2c9b/0x2,_0x5dc3cd=0x60+_0x1c2c9b,_0x4522c6=0x0+_0x1c2c9b;this[_0x2d5e9e(0xab)]['bitmap']=this[_0x2d5e9e(0x700)],this[_0x2d5e9e(0xab)][_0x2d5e9e(0x423)]['x']=0.5,this['_downArrowSprite'][_0x2d5e9e(0x423)]['y']=0.5,this[_0x2d5e9e(0xab)][_0x2d5e9e(0x269)](_0x5dc3cd+_0x478575,_0x4522c6+_0x478575+_0x1c2c9b,_0x1c2c9b,_0x478575),this[_0x2d5e9e(0xab)]['move'](Math[_0x2d5e9e(0x368)](_0x18b7b5/0x2),Math['round'](_0x515366-_0x478575)),this[_0x2d5e9e(0x350)][_0x2d5e9e(0x3ad)]=this[_0x2d5e9e(0x700)],this[_0x2d5e9e(0x350)]['anchor']['x']=0.5,this['_upArrowSprite'][_0x2d5e9e(0x423)]['y']=0.5,this[_0x2d5e9e(0x350)][_0x2d5e9e(0x269)](_0x5dc3cd+_0x478575,_0x4522c6,_0x1c2c9b,_0x478575),this['_upArrowSprite'][_0x2d5e9e(0x22d)](Math[_0x2d5e9e(0x368)](_0x18b7b5/0x2),Math['round'](_0x478575));},Window[_0x3beee9(0x413)][_0x3beee9(0x4c5)]=function(){const _0x1a8756=_0x3beee9,_0x52acb3=0x90,_0x3a2a21=0x60,_0x896c36=0x18;this[_0x1a8756(0x2d8)][_0x1a8756(0x3ad)]=this[_0x1a8756(0x700)],this[_0x1a8756(0x2d8)][_0x1a8756(0x423)]['x']=0.5,this[_0x1a8756(0x2d8)][_0x1a8756(0x423)]['y']=0x1,this[_0x1a8756(0x2d8)][_0x1a8756(0x22d)](Math[_0x1a8756(0x368)](this['_width']/0x2),this[_0x1a8756(0x295)]),this[_0x1a8756(0x2d8)][_0x1a8756(0x269)](_0x52acb3,_0x3a2a21,_0x896c36,_0x896c36),this[_0x1a8756(0x2d8)][_0x1a8756(0x3de)]=0xff;},Window[_0x3beee9(0x413)][_0x3beee9(0x381)]=function(){const _0x59ee5f=_0x3beee9,_0x662b79=this[_0x59ee5f(0x1ff)][_0x59ee5f(0x603)][_0x59ee5f(0x5d9)](new Point(0x0,0x0)),_0x26fa8b=this[_0x59ee5f(0x1ff)][_0x59ee5f(0x753)];_0x26fa8b['x']=_0x662b79['x']+this[_0x59ee5f(0x507)]['x'],_0x26fa8b['y']=_0x662b79['y']+this['origin']['y'],_0x26fa8b['width']=Math['ceil'](this[_0x59ee5f(0x111)]*this[_0x59ee5f(0x1d3)]['x']),_0x26fa8b[_0x59ee5f(0x428)]=Math[_0x59ee5f(0x139)](this[_0x59ee5f(0x30d)]*this[_0x59ee5f(0x1d3)]['y']);},VisuMZ['CoreEngine'][_0x3beee9(0x487)]=Window[_0x3beee9(0x413)][_0x3beee9(0x1ad)],Window['prototype'][_0x3beee9(0x1ad)]=function(){const _0x44b2e7=_0x3beee9,_0x50c4b3=VisuMZ[_0x44b2e7(0x186)]['Settings'][_0x44b2e7(0x1e8)]['CorrectSkinBleeding']??!![];if(!_0x50c4b3)return VisuMZ[_0x44b2e7(0x186)][_0x44b2e7(0x487)]['call'](this);const _0x1a12b8=this[_0x44b2e7(0x6b7)],_0x14ac70=Math[_0x44b2e7(0x38a)](0x0,this[_0x44b2e7(0x6a9)]-_0x1a12b8*0x2),_0x1d8694=Math[_0x44b2e7(0x38a)](0x0,this['_height']-_0x1a12b8*0x2),_0x27bacf=this[_0x44b2e7(0x64d)],_0x5005ac=_0x27bacf['children'][0x0];_0x27bacf[_0x44b2e7(0x3ad)]=this[_0x44b2e7(0x700)],_0x27bacf['setFrame'](0x0,0x0,0x60,0x60),_0x27bacf['move'](_0x1a12b8,_0x1a12b8),_0x27bacf[_0x44b2e7(0x1d3)]['x']=_0x14ac70/0x60,_0x27bacf['scale']['y']=_0x1d8694/0x60,_0x5005ac['bitmap']=this[_0x44b2e7(0x700)],_0x5005ac[_0x44b2e7(0x269)](0x0,0x60,0x60,0x60),_0x5005ac[_0x44b2e7(0x22d)](0x0,0x0,_0x14ac70,_0x1d8694),_0x5005ac[_0x44b2e7(0x1d3)]['x']=0x1/_0x27bacf[_0x44b2e7(0x1d3)]['x'],_0x5005ac[_0x44b2e7(0x1d3)]['y']=0x1/_0x27bacf[_0x44b2e7(0x1d3)]['y'],_0x27bacf['setColorTone'](this['_colorTone']);},Game_Temp[_0x3beee9(0x413)][_0x3beee9(0x6e1)]=function(){const _0x285007=_0x3beee9;this[_0x285007(0x352)]=[],this[_0x285007(0x666)]=[],this[_0x285007(0x742)]=[],this['_balloonQueue']=[];},VisuMZ['CoreEngine'][_0x3beee9(0x503)]=Scene_Base['prototype'][_0x3beee9(0x372)],Scene_Base[_0x3beee9(0x413)][_0x3beee9(0x372)]=function(){const _0x5c2c33=_0x3beee9;if($gameTemp)$gameTemp[_0x5c2c33(0x6e1)]();VisuMZ['CoreEngine'][_0x5c2c33(0x503)][_0x5c2c33(0x573)](this);},Bitmap['prototype'][_0x3beee9(0x74c)]=function(_0x4ca6e4){const _0x52fb8d=_0x3beee9,_0xc9e3d3=this[_0x52fb8d(0x3a0)];_0xc9e3d3['save'](),_0xc9e3d3[_0x52fb8d(0x850)]=this[_0x52fb8d(0x1c3)]();const _0x44a218=_0xc9e3d3[_0x52fb8d(0x718)](_0x4ca6e4)[_0x52fb8d(0x227)];return _0xc9e3d3['restore'](),_0x44a218;},Window_Message['prototype'][_0x3beee9(0x74a)]=function(_0x358dd3){const _0x2a5f7a=_0x3beee9;return this[_0x2a5f7a(0x770)]()?this['contents'][_0x2a5f7a(0x74c)](_0x358dd3):Window_Base[_0x2a5f7a(0x413)]['textWidth'][_0x2a5f7a(0x573)](this,_0x358dd3);},Window_Message[_0x3beee9(0x413)][_0x3beee9(0x770)]=function(){const _0x2d58f2=_0x3beee9;return VisuMZ[_0x2d58f2(0x186)][_0x2d58f2(0x46c)]['QoL']['FontWidthFix']??!![];},VisuMZ[_0x3beee9(0x186)]['Game_Action_numRepeats']=Game_Action[_0x3beee9(0x413)]['numRepeats'],Game_Action['prototype'][_0x3beee9(0x2d5)]=function(){const _0x5a6b3e=_0x3beee9;return this[_0x5a6b3e(0x17e)]()?VisuMZ[_0x5a6b3e(0x186)][_0x5a6b3e(0x673)][_0x5a6b3e(0x573)](this):0x0;},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x14e)]=Game_Action['prototype']['setAttack'],Game_Action[_0x3beee9(0x413)][_0x3beee9(0x4db)]=function(){const _0x4f0054=_0x3beee9;if(this['subject']()&&this[_0x4f0054(0x294)]()[_0x4f0054(0x264)]())VisuMZ[_0x4f0054(0x186)][_0x4f0054(0x14e)][_0x4f0054(0x573)](this);else BattleManager[_0x4f0054(0x151)]?VisuMZ[_0x4f0054(0x186)][_0x4f0054(0x14e)]['call'](this):this[_0x4f0054(0x168)]();},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x1a4)]=BattleManager[_0x3beee9(0x4e5)],BattleManager[_0x3beee9(0x4e5)]=function(_0x2e0edb,_0x15a820){const _0x350d0e=_0x3beee9;this[_0x350d0e(0x151)]=!![],VisuMZ[_0x350d0e(0x186)][_0x350d0e(0x1a4)]['call'](this,_0x2e0edb,_0x15a820),this['_bypassCanCounterCheck']=undefined;},Sprite_Name['prototype']['bitmapHeight']=function(){return 0x24;},Sprite_Name[_0x3beee9(0x413)][_0x3beee9(0x7ad)]=function(){const _0x46bd54=_0x3beee9,_0x4fb862=this[_0x46bd54(0x148)](),_0x546306=this[_0x46bd54(0x853)](),_0x37075f=this[_0x46bd54(0x5ec)]();this['setupFont'](),this[_0x46bd54(0x3ad)]['clear'](),this['bitmap'][_0x46bd54(0x605)](_0x4fb862,0x4,0x0,_0x546306-0xa,_0x37075f,_0x46bd54(0x4a4));},Bitmap[_0x3beee9(0x413)]['drawTextTopAligned']=function(_0x1845f2,_0x528249,_0x3ade32,_0x23d4a2,_0x4f5e23,_0x1d842a){const _0xc6753b=_0x3beee9,_0x5a70c1=this['context'],_0xe2532e=_0x5a70c1[_0xc6753b(0x42c)];_0x23d4a2=_0x23d4a2||0xffffffff;let _0xfa2b45=_0x528249,_0x1b6dea=Math[_0xc6753b(0x368)](_0x3ade32+0x18/0x2+this['fontSize']*0.35);_0x1d842a===_0xc6753b(0x2dd)&&(_0xfa2b45+=_0x23d4a2/0x2),_0x1d842a==='right'&&(_0xfa2b45+=_0x23d4a2),_0x5a70c1[_0xc6753b(0x167)](),_0x5a70c1[_0xc6753b(0x850)]=this[_0xc6753b(0x1c3)](),_0x5a70c1[_0xc6753b(0x4c9)]=_0x1d842a,_0x5a70c1['textBaseline']=_0xc6753b(0x696),_0x5a70c1[_0xc6753b(0x42c)]=0x1,this[_0xc6753b(0x2db)](_0x1845f2,_0xfa2b45,_0x1b6dea,_0x23d4a2),_0x5a70c1[_0xc6753b(0x42c)]=_0xe2532e,this[_0xc6753b(0x68c)](_0x1845f2,_0xfa2b45,_0x1b6dea,_0x23d4a2),_0x5a70c1[_0xc6753b(0x4c8)](),this[_0xc6753b(0x42b)]['update']();},VisuMZ['CoreEngine'][_0x3beee9(0x5b8)]=BattleManager[_0x3beee9(0x69d)],BattleManager[_0x3beee9(0x69d)]=function(_0x147015){const _0x127f78=_0x3beee9;if(this[_0x127f78(0x316)][_0x127f78(0x254)]())return![];return VisuMZ[_0x127f78(0x186)][_0x127f78(0x5b8)][_0x127f78(0x573)](this,_0x147015);},BattleManager['endAction']=function(){const _0x2ef7dc=_0x3beee9;if(this[_0x2ef7dc(0x37a)])this[_0x2ef7dc(0x852)][_0x2ef7dc(0x30a)](this[_0x2ef7dc(0x37a)]);this[_0x2ef7dc(0x3a5)]=_0x2ef7dc(0x3dd),this[_0x2ef7dc(0x37a)]&&this['_subject'][_0x2ef7dc(0x554)]()===0x0&&(this[_0x2ef7dc(0x1d7)](this[_0x2ef7dc(0x37a)]),this['_subject']=null);},Bitmap[_0x3beee9(0x413)][_0x3beee9(0x695)]=function(){const _0x9f30a7=_0x3beee9;this[_0x9f30a7(0x14d)]=new Image(),this[_0x9f30a7(0x14d)][_0x9f30a7(0x396)]=this[_0x9f30a7(0x224)]['bind'](this),this['_image'][_0x9f30a7(0x2e9)]=this[_0x9f30a7(0x354)][_0x9f30a7(0x4d9)](this),this[_0x9f30a7(0xb1)](),this[_0x9f30a7(0x84d)]=_0x9f30a7(0x78d),Utils[_0x9f30a7(0x4a7)]()?this['_startDecrypting']():(this['_image'][_0x9f30a7(0x47c)]=this[_0x9f30a7(0x5e0)],![]&&this[_0x9f30a7(0x14d)][_0x9f30a7(0x227)]>0x0&&(this[_0x9f30a7(0x14d)]['onload']=null,this[_0x9f30a7(0x224)]()));},Scene_Skill['prototype'][_0x3beee9(0x5fa)]=function(){const _0x2c9d28=_0x3beee9;Scene_MenuBase[_0x2c9d28(0x413)][_0x2c9d28(0x5fa)]['call'](this),this['refreshActor'](),this[_0x2c9d28(0x2a2)][_0x2c9d28(0x37b)](),this[_0x2c9d28(0x2a2)][_0x2c9d28(0x553)](),this[_0x2c9d28(0x6d0)][_0x2c9d28(0x594)]();},Scene_Skill['prototype'][_0x3beee9(0x214)]=function(){const _0x1868a9=_0x3beee9;return this[_0x1868a9(0x6d0)]&&this[_0x1868a9(0x6d0)]['active'];},Game_Map[_0x3beee9(0x413)][_0x3beee9(0x7f0)]=function(_0x1641e4,_0x3612b6,_0x263489){const _0x249f9a=_0x3beee9,_0x3eb40b=this[_0x249f9a(0x73d)](),_0x2a4dfe=this[_0x249f9a(0x7ca)](_0x1641e4,_0x3612b6);for(const _0x38b1df of _0x2a4dfe){const _0x25069f=_0x3eb40b[_0x38b1df];if(_0x25069f===undefined||_0x25069f===null){if($gameTemp[_0x249f9a(0x441)]()&&!DataManager[_0x249f9a(0x6c3)]()){let _0xe33d48='Current\x20tileset\x20has\x20incomplete\x20flag\x20data.'+'\x0a';_0xe33d48+=_0x249f9a(0x83e)+'\x0a',_0xe33d48+=_0x249f9a(0x629),this[_0x249f9a(0x7a7)]()?(alert(_0xe33d48),SceneManager[_0x249f9a(0x7da)]()):(console[_0x249f9a(0x772)](_0xe33d48),!$gameTemp['_showDevTools']&&($gameTemp[_0x249f9a(0x14b)]=!![],SceneManager[_0x249f9a(0x2fa)]()));}}if((_0x25069f&0x10)!==0x0)continue;if((_0x25069f&_0x263489)===0x0)return!![];if((_0x25069f&_0x263489)===_0x263489)return![];}return![];},Game_Map[_0x3beee9(0x413)][_0x3beee9(0x7a7)]=function(){const _0x322d19=_0x3beee9;if(Imported[_0x322d19(0xcf)])return!![];if(Imported['VisuMZ_4_UniqueTileEffects'])return!![];return![];},Sprite_Animation[_0x3beee9(0x413)][_0x3beee9(0x584)]=function(_0x2c999b){const _0xf69e9b=_0x3beee9;!this['_originalViewport']&&(this[_0xf69e9b(0x760)]=_0x2c999b['gl'][_0xf69e9b(0x35e)](_0x2c999b['gl'][_0xf69e9b(0x821)]));},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x5dd)]=Scene_Map['prototype'][_0x3beee9(0x446)],Scene_Map[_0x3beee9(0x413)][_0x3beee9(0x446)]=function(){const _0x3d5550=_0x3beee9,_0x1bb3ed=SceneManager['_previousClass'][_0x3d5550(0x148)];if([_0x3d5550(0x6e9),'Scene_Load',_0x3d5550(0x505),_0x3d5550(0x6a4)]['includes'](_0x1bb3ed))return![];return VisuMZ[_0x3d5550(0x186)]['Scene_Map_shouldAutosave'][_0x3d5550(0x573)](this);},VisuMZ[_0x3beee9(0x186)][_0x3beee9(0x401)]=Window_SkillList[_0x3beee9(0x413)][_0x3beee9(0x820)],Window_SkillList[_0x3beee9(0x413)][_0x3beee9(0x820)]=function(_0x3597eb){const _0x1bd603=_0x3beee9;if(this[_0x1bd603(0x4a1)]<=0x0)return![];return VisuMZ[_0x1bd603(0x186)]['Window_SkillList_includes'][_0x1bd603(0x573)](this,_0x3597eb);};