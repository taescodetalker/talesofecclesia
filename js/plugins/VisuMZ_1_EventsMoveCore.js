//=============================================================================
// VisuStella MZ - Events & Movement Core
// VisuMZ_1_EventsMoveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_EventsMoveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventsMoveCore = VisuMZ.EventsMoveCore || {};
VisuMZ.EventsMoveCore.version = 1.60;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.60] [EventsMoveCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Events_and_Movement_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Events & Movement Core plugin adds a lot of new functionality in terms
 * of event flexibility and movement options to RPG Maker MZ. These range from
 * adding in old capabilities from previous iterations of RPG Maker to more
 * mainstream techniques found in other game engines. Movement options are also
 * expanded to support 8-directional movement as well as sprite sheets provided
 * that the VisuStella 8 format is used.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Event commands expanded upon to include old and new functions.
 * * Event templates for Copying Events, Morphing Events, and Spawning Events.
 * * 8-directional movement option available and sprite sheet support.
 * * Aesthetics for tilting the sprite when dashing and having shadows below.
 * * Pathfinding support for event movement through custom Move Route commands.
 * * Advanced switches and variable support to run code automatically.
 * * Turn regular Switches and Variables into Self Switches and Self Variables.
 * * Put labels and icons over events.
 * * Allow numerous ways to trigger events, through clicking, proximity, or by
 *   usage of Regions.
 * * Change the hitbox sizes of events to larger in any direction.
 * * Synchronize event movement options to move when player/other events move.
 * * The ability for the player to turn in place.
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
 * Features: Advanced Switches and Variables
 * ============================================================================
 *
 * Switches and variables can now run JavaScript code and return values
 * instantly. While at first glance, this may seem no different from using
 * the Control Variables event command's Script option, this can be used to
 * instantly set up Switch and/or Variable conditions for Parallel Common
 * Events, Event Page Conditions, Enemy Skill Conditions, and Troop Page
 * Conditions instantly without needing to make an event command to do so.
 *
 * ---
 *
 * <JS> code </JS>
 * - Used for: Switch and Variable names
 * - Replace 'code' with JavaScript code on what value to return.
 *
 * ---
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 *
 * ============================================================================
 * Features: Self Switches and Variables
 * ============================================================================
 *
 * RPG Maker MZ by default has 4 Self Switches: A, B, C, D. For some types of
 * games, this isn't enough. This plugin gives you the ability convert regular
 * Switches into Self Switches so you could have more.
 *
 * Self Variables also do not exist in RPG Maker MZ by default. Just like with
 * Switches, you can turn regular Variables into Self Variables.
 *
 * ---
 *
 * <Self>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Self Switch/Variable.
 *
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Self> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that event.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Self Switch or Self Variable's
 * value, you can use the following script calls.
 * 
 *   ---
 * 
 *   Get Self Switch Values:
 * 
 *   getSelfSwitchValue(mapID, eventID, switchID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - This will return the true/false value of the Self Switch.
 *   - Example: getSelfSwitchValue(12, 34, 56)
 *   - Example: getSelfSwitchValue(12, 34, 'B')
 * 
 *   ---
 * 
 *   Get Self Variable Values:
 * 
 *   getSelfVariableValue(mapID, eventID, variableID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - This will return whatever stored value is found in the Self Variable.
 *   - Example: getSelfVariableValue(12, 34, 56)
 * 
 *   ---
 * 
 *   Set Self Switch Values:
 * 
 *   setSelfSwitchValue(mapID, eventID, switchID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - This will change the Self Switch's value to true/false.
 *     - Example: setSelfSwitchValue(12, 34, 56, false)
 *     - Example: setSelfSwitchValue(12, 34, 'B', true)
 * 
 *   ---
 * 
 *   Set Self Variable Values:
 * 
 *   setSelfVariableValue(mapID, eventID, variableID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - Replace 'value' with the value you want to set the Self Variable to.
 *   - Example: setSelfVariableValue(12, 34, 56, 88888)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: Map Switches and Variables
 * ============================================================================
 * 
 * Similar to Self Switches and Self Variables, Map Switches and Map Variables
 * are switches and variables that retain data based on the map the player is
 * currently located in. In other words, they're self switches and variables
 * but for maps instead!
 * 
 * These features do not exist in RPG Maker MZ by default. Just like with the
 * Self Switches and Self Variables, you can turn regular Switches or Variables
 * into Map Switches and Map Variables using the following name tag:
 * 
 * ---
 * 
 * <Map>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Map Switch/Variable.
 * 
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Map> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that map.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Map Switch or Map Variable's
 * value, you can use the following script calls:
 * 
 *   ---
 * 
 *   Get Map Switch Values:
 * 
 *   getMapSwitchValue(mapID, switchID)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'switchID' with the ID number of the switch to get data.
 *   - Example: getMapSwitchValue(4, 20)
 * 
 *   ---
 * 
 *   Get Variable Switch Values:
 * 
 *   getMapVariableValue(mapID, variableID)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'variableID' with the ID number of the variable to get data.
 *   - Example: getMapVariableValue(6, 9)
 * 
 *   ---
 * 
 *   Set Map Switch Values:
 * 
 *   setMapSwitchValue(mapID, switchID, value)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'switchID' with the ID number of the switch to get data.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - Example: setMapSwitchValue(4, 20, true)
 *   - Example: setMapSwitchValue(6, 9, false)
 * 
 *   ---
 * 
 *   Set Map Variable Values:
 * 
 *   setMapVariableValue(mapID, variableID, value)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'variableID' with the ID number of the variable to get data.
 *   - Replace 'value' with the value you want to set the Map Variable to.
 *   - Example: setMapVariableValue(6, 9, 420)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: Character Sprite Filename Tags
 * ============================================================================
 * 
 * For the files located inside of your project's /img/characters/ folder, if
 * the filenames themselves have specific "tags" in them, special properties
 * will be applied to them. These tags can be combined together with a few
 * exceptions.
 * 
 * Some of these are new to VisuStella MZ, while others are default to MZ.
 * 
 * ---
 * 
 *   !filename.png
 *   - Tag: !
 *   - Causes this character's sprite to align with the tile grid instead of
 *     being lifted a few pixels higher.
 *   - This is primarily used for things like doors, chests, and floor plates.
 *   - Default to RPG Maker MZ.
 * 
 * ---
 * 
 *   $filename.png
 *   - Tag: $
 *   - Causes this character's sprite to use the "big character" format.
 *   - Primarily used for sprites like the big monsters and such which only
 *     have 3x4 cells as opposed to 12x8 cells that regular sprite sheets have.
 *   - Cannot be combined with the [VS8] tag.
 *   - Default to RPG Maker MZ.
 * 
 * ---
 * 
 *   filename[Invisible].png
 *   - Tag: [Invisible] or [Inv]
 *   - This character's sprite will become invisible on the map screen in-game
 *     while almost everything else about it is visible.
 *   - This is used for those who wish to use sprite labels for things such as
 *     autorun and parallel events.
 * 
 * ---
 * 
 *   filename[VS8].png
 *   - Tag: [VS8]
 *   - Converts this sprite into a VisuStella-Style 8-Direction Sprite Sheet.
 *   - Refer to the section below.
 *   - Cannot be combined with the $ tag.
 * 
 * ---
 *
 * ============================================================================
 * Features: VisuStella-Style 8-Directional Sprite Sheets
 * ============================================================================
 *
 * This plugin provides support for the VisuStella-Style 8-Directional Sprite
 * Sheets, also know as VS8. VS8 sprite sheets offer support for walking
 * frames, dashing frames, carrying frames, and emotes.
 *
 * ---
 *
 * To designate a sprite sheet as VS8, simply add [VS8] to the filename.
 * Something like Actor1.png would become Actor1_[VS8].png.
 *
 * ---
 *
 * VS8 sprites are formatted as such. Each block below is a set of 3 frames.
 *
 * Walk Down    Walk DL     Dash Down   Dash DL
 * Walk Left    Walk DR     Dash Left   Dash DR
 * Walk Right   Walk UL     Dash Right  Dash UL
 * Walk Up      Walk UR     Dash Up     Dash UR
 *
 * Carry Down   Carry DL    Ladder      Emotes 3
 * Carry Left   Carry DR    Rope        Emotes 4
 * Carry Right  Carry UL    Emotes 1    Emotes 5
 * Carry Up     Carry UR    Emotes 2    Emotes 6
 *
 * ---
 *
 * Here are how each of the emote sets are grouped from left to right.
 *
 * Emotes 1: Item, Hmph, Victory
 * Emotes 2: Hurt, Kneel, Collapse
 * Emotes 3: !, ?, Music Note
 * Emotes 4: Heart, Anger, Sweat
 * Emotes 5: Cobweb, ..., Light Bulb
 * Emotes 6: Sleep0, Sleep1, Sleep2
 *
 * ---
 *
 * ============================================================================
 * Features: Weighted Random Movement
 * ============================================================================
 * 
 * When creating events to place on the map, you can determine what type of
 * autonomous movement the event will have. When selecting "Random", the event
 * will move randomly across the map.
 * 
 * However, with the way "Random" movement works with the RPG Maker MZ default
 * code, the event is more likely to hit a wall and then hug the said wall as
 * it maps laps around the map's outer borders making it feel very unnatural
 * for any player who's been on the map long enough.
 * 
 * This is where "Weighted Random Movement" comes in. It changes up the random
 * movement behavior to function where the farther the event is, the more
 * likely the event is to step back towards its "home" position (aka where it
 * spawned upon loading the map). This is so that a housewife NPC doesn't
 * suddenly wander off into the middle of an army's training grounds on the
 * same town map.
 * 
 * The event will stay closer to its home value depending on how high the
 * weight's value is. There are a number of ways to adjust the weighted value.
 * 
 * ---
 * 
 * Plugin Parameters > Movement > Event Movement > Random Move Weight
 * 
 * This Plugin Parameter setting allows you to set the default weight for all
 * events with "Random" autonomous movement. It is set at a default value of
 * 0.10 to give the event an understandable degree of freedom.
 * 
 * Lower numbers give events more freedom to move. Larger numbers will make the
 * events stick closer to home.
 * 
 * Change this value to 0 to disable it.
 * 
 * ---
 * 
 * You can customize this individually per event by using Notetags and/or
 * Comment Tags for the events.
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * ============================================================================
 * Notetags and Comment Tags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * Some of these are comment tags. Comment tags are used for events to mark and
 * affect individual event pages rather than the whole event.
 *
 * === Map Notetags ===
 *
 * The following notetags are used for maps only. While some of these options
 * are also available in the Plugin Parameters, some of these notetags extend
 * usage to specific maps marked by these notetags as well.
 *
 * ---
 *
 * <Diagonal Movement: On>
 * <Diagonal Movement: Off>
 *
 * - Used for: Map Notetags
 * - Turns on/off diagonal movement for those maps.
 * - If notetag isn't present, use Plugin Parameter setting.
 *
 * ---
 *
 * <type Allow Region: x>
 * <type Allow Region: x, x, x>
 *
 * <type Forbid Region: x>
 * <type Forbid Region: x, x, x>
 *
 * <type Dock Region: x>
 * <type Dock Region: x, x, x>
 *
 * - Used for: Map Notetags
 * - Replace 'type' with 'All', 'Walk', 'Player', 'Event', 'Vehicle', 'Boat',
 *   'Ship', or 'Airship'.
 * - 'Allow' notetag variants allow that type to pass through them no matter
 *   what other passability settings are in place.
 * - 'Forbid' notetag variants forbid that type from passing through at all.
 * - 'Dock' notetag variants allow vehicles to dock there. Boats and ships must
 *   face the region direction while airships must land directly on top.
 *
 * ---
 * 
 * <Map Load Common Event: x>
 * <Map Load Common Events: x, x, x>
 * 
 * - Used for: Map Notetags
 * - When this map is loaded, run the specified Common Events once available.
 *   - Does NOT trigger if you transfer to a different part of the same map.
 * - Replace 'x' with a number representing the ID of the Common Event you wish
 *   to reserve and run once ready.
 * 
 * ---
 *
 * <Save Event Locations>
 *
 * - Used for: Maps Notetags
 * - Saves the locations of all events on the map so that when you return to
 *   that map at a later point, the events will be in the position they were
 *   last in.
 *
 * ---
 * 
 * <Hide Player>
 * <Show Player>
 * 
 * - Used for: Map Notetags
 * - Forcefully hides or shows the player sprite. This is so you don't need to
 *   manually turn the setting on/off each time you enter a specific map.
 * - These settings will take priority over the event commands.
 * - If the player sprite is hidden, so are the player's followers.
 * - If the player sprite is visible, the player's followers will still depend
 *   on their settings.
 * - These notetags are mutually exclusive from each other.
 * 
 * ---
 * 
 * <Hide Followers>
 * <Show Followers>
 * 
 * - Used for: Map Notetags
 * - Forcefully hides or shows the player's followers. This is so you don't
 *   need to manually turn them on/off each time you enter a specific map.
 * - These settings will take priority over the event commands.
 * - These notetags are mutually exclusive from each other.
 * 
 * ---
 * 
 * === Page Comment Tags ===
 * 
 * The following comment tags are to be put inside of the pages of events,
 * troops, and common events for them to work!
 * 
 * ---
 * 
 * <Page Conditions>
 *   conditions
 *   conditions
 *   conditions
 * </Page Conditions>
 * 
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - This allows you to create custom page conditions that utilize the
 *   Conditional Branch event command to see if the additional page conditions
 *   are met.
 * 
 * ---
 * 
 * <Conditions Met>
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - If used between the <Page Conditions> and </Page Conditions> comment tag,
 *   upon reaching this part of event command list, the custom page conditions
 *   will be considered met.
 * 
 * ---
 * 
 * Example:
 * 
 * ◆Comment：<Page Conditions>
 * ◆If：Reid has equipped Potion Sword
 *   ◆Comment：If Reid has equipped the Potion Sword
 * ：       ：<Condition Met>
 *   ◆
 * ：End
 * ◆Comment：</Page Conditions>
 * 
 * If Reid has the "Potion Sword" weapon equipped, then the additional custom
 * page conditions are met and the event page will be present/active.
 * 
 * If this is a troop condition, the troop page event will activate.
 * 
 * If this is a common event, there will be a parallel common event active.
 * 
 * ---
 *
 * === Event and Event Page Notetags ===
 *
 * The following notetags have comment tag variants (with a few exceptions).
 * If a notetag is used for an event, it will affect the event constantly.
 * If a comment tag is used, it will only affect the page the comment tag is
 * on and only that page.
 *
 * ---
 *
 * <Activation Region: x>
 * <Activation Regions: x,x,x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   standing within a tile marked by a designated region.
 * - Replace 'x' with the regions you wish to remotely activate this event in.
 *   - Action Button: Player must press OK while being in the region.
 *   - Player/Event Touch: Player must step onto the region.
 *   - Autorun/Parallel: Player be in the region.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Activation Square: x>
 * <Activation Circle: x>
 * <Activation Delta: x>
 * <Activation Row: x>
 * <Activation Column: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   within range of its activation type.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Circle: A circle-shaped range with the event at the center.
 *   - Delta: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Always Update Movement>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Events normally have to be within screen range for them to update their
 *   self movement. If this tag is present, the event is always updating.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Click Trigger>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to activate upon being clicked on with the mouse.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Copy Event: Map x, Event y>
 * <Copy Event: x, y>
 *
 * <Copy Event: template>
 *
 * - Used for: Event Notetags ONLY
 * - Makes this event copy all of the event settings from a different event
 *   that can be found on a different map (as long as that map is registered
 *   inside of Plugin Parameters => Event Template Settings => Preloaded Maps).
 * - Replace 'x' with a number representing the copied event's Map ID.
 *   - If '0' is used for the Map ID, reference the current map.
 * - Replace 'y' with a number representing the copied event's Event ID.
 * - For the 'template' variant, replace 'template' with the name of the
 *   template made in Plugin Parameters => Event Template Settings =>
 *   Event Template List.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 *
 * ---
 * 
 * <Custom Z: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number value to determine the event sprite's Z value
 *   relative to the tilemap.
 * - For reference from rmmz_core.js:
 *   - 0 : Lower tiles
 *   - 1 : Lower characters
 *   - 3 : Normal characters
 *   - 4 : Upper tiles
 *   - 5 : Upper characters
 *   - 6 : Airship shadow
 *   - 7 : Balloon
 *   - 8 : Animation
 *   - 9 : Destination
 * - You can use numbers below 0 and above 9.
 *   - Values under 0 go below the tilemap.
 *   - Values above 9 go above everything else on the tilemap.
 *   - These values do NOT go below or above other screen objects that are
 *     NOT attached to the tilemap layer such as parallaxes or weather or
 *     windows because that's simply not how z-axis work with sprite layers.
 * 
 * ---
 * 
 * <Encounter Half Square: x>
 * <Encounter Half Circle: x>
 * <Encounter Half Delta: x>
 * <Encounter Half Row: x>
 * <Encounter Half Column: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If the player is within the 'x' area effect of this event, the random
 *   encounter rate will be halved.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Circle: A circle-shaped range with the event at the center.
 *   - Delta: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * Script Call Check:
 * 
 *   $isTileEncounterHalf(x, y)
 * 
 * - This can be used to check if a certain map tile (x, y) has an encounter
 *   rate halving effect on it.
 * - Returns a boolean (true or false) when used.
 * 
 * ---
 * 
 * <Encounter None Square: x>
 * <Encounter None Circle: x>
 * <Encounter None Delta: x>
 * <Encounter None Row: x>
 * <Encounter None Column: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If the player is within the 'x' area effect of this event, the random
 *   encounter rate will be suppressed completely.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Circle: A circle-shaped range with the event at the center.
 *   - Delta: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * Script Call Check:
 * 
 *   $isTileEncounterNone(x, y)
 * 
 * - This can be used to check if a certain map tile (x, y) has an encounter
 *   rate suppression effect on it.
 * - Returns a boolean (true or false) when used.
 * 
 * ---
 * 
 * <Erase if Encounter Half>
 * <Erase if Encounter None>
 * 
 * - Used for: Event Notetags ONLY
 * - Automatically erase this event if the player's party has an encounter half
 *   or encounter none effect, or if the event has spawned in an encounter half
 *   or encounter none area.
 * - This check only occurs in two situations: when the map is first loaded
 *   after being teleported into or when the player leaves a menu and returns
 *   back to the map.
 * - Events that have been erased due to this effect will NOT return even if
 *   the encounter half/none effect is removed while the player is still on the
 *   map. The event will return if the player exits the map and comes back.
 * 
 * ---
 * 
 * <Exit Reset Self Data>
 * 
 * - Used for: Event Notetags ONLY
 * - When the player leaves the current map, all Self Switches and Self
 *   Variables related to this event will be reset.
 * 
 * ---
 *
 * <Hitbox Left: x>
 * <Hitbox Right: x>
 * <Hitbox Up: x>
 * <Hitbox Down: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number to extend the hitbox of the event by that many
 *   tiles towards the listed direction.
 * - Use multiples of this notetag to extend them to different directions.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with the Icon ID you wish to put above this event.
 * - This will not override any Icons designated to the ID through a
 *   Plugin Command.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Buffer X: +x>
 * <Icon Buffer X: -x>
 *
 * <Icon Buffer Y: +x>
 * <Icon Buffer Y: -x>
 *
 * <Icon Buffer: +x, +y>
 * <Icon Buffer: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the icon on the envent by buffers.
 * - Replace 'x' and 'y' with the values to adjust the position buffers by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label: text>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - Text codes can be used.
 *   - If text codes are used, avoid text codes that use < and > wrappers.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label>
 * text
 * text
 * </Label>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - This can display multiple lines.
 * - Text codes can be used.
 *   - You can use text codes with < and > wrappers.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Range: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets a range requirement for the player to be in order for the event's
 *   label to appear.
 * - Replace 'x' with a number value depicting the range in tiles.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - If this tag is not used, refer to the default plugin parameter settings.
 *
 * ---
 * 
 * <Label Range Type: Square>
 * <Label Range Type: Circle>
 * <Label Range Type: Diamond>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets a range type for the label to appear visible for.
 *   - Square: A square-shaped range with the event at the center.
 *   - Circle: A circle-shaped range with the event at the center.
 *   - Diamond: A diamond-shaped range with the event at the center.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - If this tag is not used, refer to the default plugin parameter settings.
 * 
 * ---
 *
 * <Label Offset X: +x>
 * <Label Offset X: -x>
 *
 * <Label Offset Y: +x>
 * <Label Offset Y: -x>
 *
 * <Label Offset: +x, +y>
 * <Label Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the label on the envent by offsets.
 * - Replace 'x' and 'y' with the values to adjust the position offsets by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Label Hue Shift: +x>
 * <Label Hue Shift: -x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the hue of the event label by +x or -x every frame.
 *   - Keep in mind that since this is changing hue, this will appear to have
 *     no effect if you are using black and white labels.
 *   - Use labels with text codes that add color to them like '\C[4]text'
 * - This only works with the sprite version of event labels and does not work
 *   with the legacy version.
 * 
 * ---
 * 
 * <Location X: +x>
 * <Location X: -x>
 * 
 * <Location Y: +x>
 * <Location Y: -x>
 * 
 * <Location: +x, +y>
 * <Location: +x, -y>
 * <Location: -x, +y>
 * <Location: -x, -y>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts the initial location of this event by +x and +y (or -x and -y).
 * - This allows you to stack events on top of each other or even move them to
 *   various places of the map.
 * - Replace 'x' with a number that represents the horizontal tiles to adjust
 *   the initial starting location by.
 * - Replace 'y' with a number that represents the vertical tiles to adjust
 *   the initial starting location by.
 * 
 * ---
 * 
 * <Mirror Sprite>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - The event sprite's visual appearance is mirrored.
 * 
 * ---
 * 
 * <Move Only Region: x>
 * <Move Only Regions: x,x,x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the move range of this event to only the region(s) marked by the
 *   notetag(s) or comment tag(s).
 * - This will bypass terrain passability.
 * - This will not bypass event collision.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Move Synch Target: Player>
 *
 * <Move Synch Target: Event x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Synchronizes the movement of this event with a target (either the player
 *   or another event). This event will only move whenever the synchronized
 *   target moves.
 * - For 'Event x' variant, replace 'x' with the ID of the event to synch to.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Type: Random>
 * <Move Synch Type: Approach>
 * <Move Synch Type: Away>
 * <Move Synch Type: Custom>
 *
 * <Move Synch Type: Mimic>
 * <Move Synch Type: Reverse Mimic>
 *
 * <Move Synch Type: Mirror Horizontal>
 * <Move Synch Type: Mirror Vertical>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Choose the type of movement the event will have if it is synchronized to
 *   a target.
 *   - Random: Move to a random position.
 *   - Approach: Approaches target.
 *   - Away: Flees from target.
 *   - Custom: Follows a custom move route.
 *   - Mimic: Imitates the target's movement style.
 *   - Reverse Mimic: Does the opposite of the target's movement.
 *   - Mirror Horizontal: Moves as if a mirror is placed horizontally.
 *   - Mirror Vertical: Moves as if a mirror is placed vertically.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Delay: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is present, the event will wait a bit after each move before
 *   moving again.
 * - Replace 'x' with the number of movement instances in between.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Move Synch Distance Opacity: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the opacity of the event based on the distance between it and its
 *   move synched target. Closer means more opaque. Further away means more
 *   transparent.
 * - Replace 'x' with a number representing the opacity change per pixel
 *   distance away. 'x' can use decimal values like 1.05 and 1.5.
 * 
 * ---
 * 
 * <Picture Filename: filename>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Applies a picture graphic from the /img/pictures/ folder of your project.
 * - This graphic will be on top of the character sprite but below the event
 *   icon sprite.
 *   - The picture priority will be the same as the event's priority.
 *   - If it is "below characters", the player can walk on top of it.
 *   - If it is "above characters", the player will behind it.
 *   - If it is "same as characters", the priority will be based on the
 *     current relative Y position. This also means, if the picture is big
 *     enough, it can clip into the top of tree tiles and such.
 * - Replace 'filename' with a filename from the game project's /img/pictures/
 *   folder. This is case sensitive. Do NOT include the file extension.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 * 
 * <Picture Type: Enemy>
 * <Picture Type: SV Enemy>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - Will use /img/enemies/ or /img/sv_enemies/ instead of /img/pictures/ to
 *   grab a picture graphic from.
 * - Other picture graphic sprite related notetags will apply as normal.
 * 
 * ---
 * 
 * <Picture Max Size: x>
 * <Picture Scale: y%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - If the "Max Size" or "Scale" supplementary notetags are used, the picture
 *   graphic will be scaled proportionally to fit either the exact pixel size
 *   for "Max Size" or the "Scale" ratio.
 *   - Both the "Max Size" and "Scale" notetags require the "Filename" notetag.
 * - Replace 'x' with a number value representing the exact pixel size for the
 *   "Max Size" notetag.
 * - Replace 'y' with a number value representing the scale on which to shrink
 *   or enlarge the picture. 100% is normal size. 50% is half size. 200% is
 *   double size.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Picture Offset X: +x>
 * <Picture Offset X: -x>
 *
 * <Picture Offset Y: +x>
 * <Picture Offset Y: -x>
 *
 * <Picture Offset: +x, +y>
 * <Picture Offset: -x, -y>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - Offsets the X and Y position of the event picture relative to the event
 *   sprite's own position.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 * 
 * <Picture Wait Frames: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - Requires VisuMZ_4_AnimatedPictures!
 * - "Wait Frames" is used with VisuMZ's Animated Pictures plugin. This
 *   determines the delay inbetween frame changes.
 * - Replace 'x' with a number representing the amount of frames to wait
 *   inbetween frame changes.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 * 
 * <Playtest>
 * 
 * - Used for: Event Notetags.
 * - This does NOT work when it's in the Event Page Comment Tags.
 * - If this notetag is found in the event's notebox (NOT comments), then the
 *   event will only appear during a playtest session. It will not appear in a
 *   deployed game where the playtest flag is not on.
 * 
 * ---
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * ---
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * <Save Event Location>
 *
 * - Used for: Event Notetags ONLY
 * - Saves the locations of the event on the map so that when you return to
 *   that map at a later point, the event will be in the position it was
 *   last in.
 *
 * ---
 *
 * <Hide Shadow>
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Hides the shadow for the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Scale: x%>
 * 
 * <Scale X: x%>
 * <Scale Y: y%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the scale of the sprite to the designated size.
 * - For <Scale: x%> variant: replace 'x' with a number representing the
 *   scaling overall percentage to be used.
 * - For <Scale X: x%> variant, replace 'x' with a number representing the x
 *   factor for the horizontal scaling percentage to be used.
 * - For <Scale Y: y%> variant, replace 'y' with a number representing the y
 *   factor for the vertical scaling percentage to be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Shadow Filename: filename>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replaces the shadow graphic used with 'filename' found in the
 *   img/system/ project folder.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Sprite Offset X: +x>
 * <Sprite Offset X: -x>
 *
 * <Sprite Offset Y: +x>
 * <Sprite Offset Y: -x>
 *
 * <Sprite Offset: +x, +y>
 * <Sprite Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes how much the event's sprite is visibly offset by.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Step Pattern: Left to Right>
 * <Step Pattern: Right to Left>
 *
 * <Step Pattern: Spin Clockwise>
 * <Step Pattern: Spin CW>
 *
 * <Step Pattern: Spin CounterClockwise>
 * <Step Pattern: Spin CCW>
 * <Step Pattern: Spin AntiClockwise>
 * <Step Pattern: Spin ACW>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the way the event animates if a tag is present.
 *   - Left to Right: Makes the event sprite's step behavior go from frame 0 to
 *     1 to 2, then back to 0 instead of looping backward.
 *   - Right to Left: Makes the event sprite's step behavior go from frame 2 to
 *     1 to 0, then back to 2 instead of looping forward.
 *   - Spin Clockwise: Makes the event sprite's step behavior spin CW.
 *   - Spin CounterClockwise: Makes the event sprite's step behavior spin CCW.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Tile Expand Up: x>
 * <Tile Expand Down: x>
 * <Tile Expand Left: x>
 * <Tile Expand Right: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used for events with tile graphics. Expands the graphic up, down, left, or
 *   right from the spritesheet.
 *   - This does NOT expand the hitbox.
 * - The graphic will be anchored to the tile it's expanded from. This means
 *   even if you expanded downward, the actual event's position will still be
 *   the current event's X/Y coordinates. It's just grown more vertically and
 *   is still centered horizontally.
 * - This is primarily used to save on having to use too many events for tiles
 *   that expanded past 1x1 tile sizes.
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
 * === Auto Movement Plugin Commands ===
 * 
 * ---
 *
 * Auto Movement: Events
 * - Allow/stop events from auto movement.
 *
 *   Value:
 *   - Allow events to move automatically?
 *
 * ---
 * 
 * === Call Event Plugin Commands ===
 * 
 * ---
 *
 * Call Event: Remote Read
 * - Runs the page of a different event remotely.
 * - This will run the page of the target event on the CURRENT event.
 * - This means that any "This Event" commands will be applied to the event
 *   using this Plugin Command and NOT the target event that page data is being
 *   retrieved from.
 * - Think of it as the current event using the target called event as a
 *   Common Event ala how RPG Maker 2003 works (for those familiar with it).
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Page ID:
 *   - The page of the remote event to run.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Dash Plugin Commands ===
 * 
 * ---
 *
 * Dash Enable: Toggle
 * - Enable/Disable Dashing on maps.
 *
 *   Value:
 *   - What do you wish to change dashing to?
 *
 * ---
 * 
 * === Event Icon Plugin Commands ===
 * 
 * ---
 *
 * Event Icon: Change (Temporary)
 * - Change the icon that appears on an event.
 * - This change is temporary and resets upon new events.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Event Icon: Change (Forced)
 * - Change the icon that appears on an event.
 * - This change is forced and needs to be restored.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Event Icon: Delete
 * - Delete the icon that appears on an event.
 * - This will remain deleted and invisible for events.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * Event Icon: Restore
 * - Restores a deleted or forced icon that appears on an event.
 * 
 *   Map ID: 
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * === Event Label Plugin Commands ===
 * 
 * ---
 *
 * Event Label: Refresh
 * - Refresh all Event Labels on screen.
 * - This is used to refresh page conditions for map changes that don't
 *   force a refresh.
 *
 * ---
 *
 * Event Label: Visible
 * - Change the visibility of Event Labels.
 *
 *   Visibility:
 *   - What do you wish to change visibility to?
 *
 * ---
 * 
 * === Event Location Plugin Commands ===
 * 
 * ---
 *
 * Event Location: Save
 * - Memorize an event's map location so it reappears there the next time the
 *   map is loaded.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Delete
 * - Deletes an event's saved map location.
 * - The event will reappear at its default location.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *   
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Create
 * - Creates a custom spawn location for a specific map's event so it appears
 *   there the next time the map is loaded.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   X Coordinate:
 *   - The X coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - The Y coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Direction:
 *   - The direction the event will be facing.
 *
 *   Optional:
 *
 *     Page ID:
 *     - The page of the event to set the move route to.
 *     - You may use JavaScript code.
 *
 *     Move Route Index:
 *     - The point in the move route for this event to be at if the page ID
 *       matches the rest of the page conditions.
 *
 * ---
 * 
 * === Event Popup Plugin Commands ===
 * 
 * ---
 * 
 * Event Popup: Player
 * - Makes a centered event popup on the player sprite.
 * - Requires VisuMZ_1_MessageCore!
 * - Cannot be used in battle!
 * 
 *   Message Text:
 *   - Insert the text to be displayed.
 *   - Text codes can be used.
 * 
 *   Message Duration:
 *   - What is the frame duration of the event popup?
 *   - 60 frames = 1 second. You may use code.
 * 
 *   Popup Settings:
 *   - These settings let you adjust how the popup animates.
 *   - See "Popup Settings" section below.
 * 
 * ---
 * 
 * Event Popup: Follower
 * - Makes a centered event popup on target follower sprite.
 * - Requires VisuMZ_1_MessageCore!
 * - Cannot be used in battle!
 * 
 *   Follower Index:
 *   - Which follower index to play popup?
 *   - Index starts at 0.
 *   - You may use JavaScript code.
 * 
 *   Message Text:
 *   - Insert the text to be displayed.
 *   - Text codes can be used.
 * 
 *   Message Duration:
 *   - What is the frame duration of the event popup?
 *   - 60 frames = 1 second.
 *   - You may use code.
 * 
 *   Popup Settings:
 *   - These settings let you adjust how the popup animates.
 *   - See "Popup Settings" section below.
 * 
 * ---
 * 
 * Event Popup: Event
 * - Makes a centered event popup on target event sprite.
 * - Requires VisuMZ_1_MessageCore!
 * - Cannot be used in battle!
 * 
 *   Event ID:
 *   - The ID of the event to play popup on.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Message Text:
 *   - Insert the text to be displayed.
 *   - Text codes can be used.
 * 
 *   Message Duration:
 *   - What is the frame duration of the event popup?
 *   - 60 frames = 1 second. You may use code.
 * 
 *   Popup Settings:
 *   - These settings let you adjust how the popup animates.
 *   - See "Popup Settings" section below.
 * 
 * ---
 * 
 * Event Popup: Target Tile
 * - Makes a centered event popup on target tile.
 * - Requires VisuMZ_1_MessageCore!
 * - Cannot be used in battle!
 * 
 *   Map Tile X:
 *   Map Tile Y:
 *   - The x/y coordinate of the map tile.
 *   - You may use JavaScript code.
 * 
 *   Message Text:
 *   - Insert the text to be displayed.
 *   - Text codes can be used.
 * 
 *   Message Duration:
 *   - What is the frame duration of the event popup?
 *   - 60 frames = 1 second. You may use code.
 * 
 *   Popup Settings:
 *   - These settings let you adjust how the popup animates.
 *   - See "Popup Settings" section below.
 * 
 * ---
 * 
 * Popup Settings
 * 
 *   Fade Settings:
 * 
 *     Fade In Duration:
 *     - How many frames does it take to fade in?
 *     - 60 frames = 1 second.
 * 
 *     Fade Out Duration:
 *     - How many frames does it take to fade out?
 *     - 60 frames = 1 second.
 * 
 *   Offset Settings:
 * 
 *     Starting Offset X:
 *     - Offsets the starting x position.
 *     - Negative: left. Positive: right.
 *     - You may use code.
 * 
 *     Starting Offset Y:
 *     - Offsets the starting y position. 
 *     - Negative: up. Positive: down.
 *     - You may use code.
 * 
 *     Ending Offset X:
 *     - Offsets the ending x position. 
 *     - Negative: left. Positive: right.
 *     - You may use code.
 * 
 *     Ending Offset Y:
 *     - Offsets the ending y position. 
 *     - Negative: up. Positive: down.
 *     - You may use code.
 * 
 *   Scaling Settings:
 * 
 *     Starting Scale X:
 *     - What is the starting scale x?
 *     - 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 *     - You may use code.
 * 
 *     Starting Scale Y:
 *     - What is the starting scale y?
 *     - 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 *     - You may use code.
 * 
 *     Ending Scale X:
 *     - What is the ending scale x?
 *     - 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 *     - You may use code.
 * 
 *     Ending Scale Y:
 *     - What is the ending scale y?
 *     - 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 *     - You may use code.
 * 
 *   Angle Settings:
 * 
 *     Starting Offset Angle:
 *     - What is the starting angle offset?
 *     - Use numbers between 0 and 360.
 *     - You may use code.
 * 
 *     Ending Offset Angle:
 *     - What is the ending angle offset?
 *     - Use numbers between 0 and 360.
 *     - You may use code.
 * 
 *   Misc Settings:
 * 
 *     Arc Peak:
 *     - This is the height of the popup's trajectory arc in pixels.
 *     - Positive: up. Negative: down.
 *     - You may use code.
 * 
 * ---
 * 
 * === Event Timer Plugin Commands ===
 * 
 * ---
 *
 * Event Timer: Change Speed
 * - Changes the timer frame decrease (or increase) speed.
 *
 *   Speed:
 *   - How many 1/60ths of a second does each frame increase or decrease by?
 *   - Negative decreases.
 *   - Positive increases.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Expire Event Assign
 * - Sets a Common Event to run upon expiration.
 * - Bypasses the default code if one is set.
 *
 *   Common Event ID:
 *   - Select the Common Event to run upon the timer's expiration.
 *
 * ---
 *
 * Event Timer: Expire Event Clear
 * - Clears any set to expire Common Event and instead, run the default
 *   Game_Timer expiration code.
 *
 * ---
 *
 * Event Timer: Frames Gain
 * - Chooses how many frames, seconds, minutes, or hours are gained or lost for
 *   the event timer.
 *
 *   Frames:
 *   - How many 1/60ths of a second are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - How many seconds are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - How many minutes are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - How many hours are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Frames Set
 * - Chooses how many frames, seconds, minutes, or hours are set for the event
 *   timer.
 *
 *   Frames:
 *   - Set frame count to this value.
 *   - Each frame is 1/60th of a second.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - Set seconds to this value.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - Set minutes to this value.
 *   - Each minute is 60 seconds.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - Set hours to this value.
 *   - Each hour is 60 minutes.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Pause
 * - Pauses the current event timer, but does not stop it.
 *
 * ---
 *
 * Event Timer: Resume
 * - Resumes the current event timer from the paused state.
 *
 * ---
 * 
 * === Follower Control Plugin Commands ===
 * 
 * ---
 *
 * Follower: Set Global Chase
 * - Disables all followers from chasing the player or reenables it.
 *
 *   Chase:
 *   - Sets all followers to chase the player or not.
 *
 * ---
 *
 * Follower: Set Target Chase
 * - Disables target follower from chasing the player or reenables it.
 *
 *   Follower ID:
 *   - Select which follower ID to disable/reenable chasing for.
 *
 *   Chase:
 *   - Sets target follower to chase its target or not.
 *
 * ---
 *
 * Follower: Set Control
 * - Sets the event commands to target a follower when "Player" is selected as
 *   the target.
 *
 *   Follower ID:
 *   - Select which follower ID to control.
 *   - 0 is the player.
 *
 * ---
 *
 * Follower: Reset
 * - Resets all follower controls. Event Commands that target the "Player"
 *   return to normal and followers chase again.
 *
 * ---
 * 
 * === Global Switch Plugin Commands ===
 * 
 * ---
 * 
 * Global Switch: Get Self Switch A B C D
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Letter:
 *   - Letter of the target event's Self Switch to obtain data from.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * Global Switch: Get Self Switch ID
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Switch ID:
 *   - The ID of the source switch.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * === Global Variable Plugin Commands ===
 * 
 * ---
 * 
 * Global Variable: Get Self Variable ID
 * - Gets the current stored value from a Self Variable and stores it onto a
 *   Global Variable.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Variable ID:
 *   - The ID of the source variable.
 * 
 *   -
 * 
 *   Target Variable ID:
 *   - The ID of the target variable.
 * 
 * ---
 * 
 * === Morph Event Plugin Commands ===
 * 
 * ---
 *
 * Morph Event: Change
 * - Runs the page of a different event remotely.
 *
 *   Step 1:
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Template Name:
 *     - Name of the target event template to morph into.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *     Preserve Morph:
 *     - Is the morph effect preserved?
 *     - Or does it expire upon leaving the map?
 *
 * ---
 *
 * Morph Event: Remove
 * - Remove the morph status of an event.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Remove Preservation:
 *   - Also remove the preservation effect?
 *
 * ---
 * 
 * === Player Icon Plugin Commands ===
 * 
 * ---
 *
 * Player Icon: Change
 * - Change the icon that appears on on the player.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Player Icon: Delete
 * - Delete the icon that appears on the player.
 *
 * ---
 * 
 * === Player Movement Plugin Commands ===
 * 
 * ---
 * 
 * Player Movement: Control
 * - Enable or disable player control over the player character's movement.
 * 
 *   Enable?:
 *   - Let the player control where the player character moves?
 * 
 * ---
 * 
 * Player Movement: Diagonal
 * - Override settings to for player diagonal movement.
 * 
 *   Setting:
 *   - How do you want to change diagonal movement?
 *   - Default: Whatever the Map Uses
 *   - Forcefully Disable Diagonal Movement
 *   - Forcefully Enable Diagonal Movement
 * 
 * ---
 * 
 * === Self Data Plugin Commands ===
 * 
 * ---
 * 
 * Self Data: Reset All
 * - Reset the Self Switch and Self Variable data of all events within the
 *   specified map.
 * 
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * === Self Switch Plugin Commands ===
 * 
 * ---
 *
 * Self Switch: A B C D
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Letter:
 *   - Letter of the target event's Self Switch to change.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 *
 * Self Switch: Switch ID
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Switch ID:
 *   - The ID of the target switch.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Self Variable Plugin Commands ===
 * 
 * ---
 *
 * Self Variable: Variable ID
 * - Change the Self Variable of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Variable ID:
 *   - The ID of the target variable.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Spawn Event Plugin Commands ===
 * 
 * ---
 *
 * Spawn Event: Spawn At X, Y
 * - Spawns desired event at X, Y location on the current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     X Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Y Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Region
 * - Spawns desired event at a random region-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Region ID(s):
 *     - Pick region(s) to spawn this event at.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Terrain Tag
 * - Spawns desired event at a random terrain tag-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Terrain Tag(s):
 *     - Pick terrain tag(s) to spawn this event at.
 *     - Insert numbers between 0 and 7.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Despawn Event ID
 * - Despawns the selected Event ID on the current map.
 *
 *   Event ID
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn At X, Y
 * - Despawns any spawned event(s) at X, Y location on the current map.
 *
 *   X Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn Region(s)
 * - Despawns the selected Region(s) on the current map.
 *
 *   Region ID(s):
 *   - Pick region(s) and despawn everything inside it.
 *
 * ---
 *
 * Spawn Event: Despawn Terrain Tag(s)
 * - Despawns the selected Terrain Tags(s) on the current map.
 *
 *   Terrain Tag(s):
 *   - Pick terrain tag(s) and despawn everything inside it.
 *   - Insert numbers between 0 and 7.
 *
 * ---
 *
 * Spawn Event: Despawn Everything
 * - Despawns all spawned events on the current map.
 *
 * ---
 *
 * ============================================================================
 * Move Route Custom Commands
 * ============================================================================
 *
 * Some custom commands have been added to the "Set Movement Route" event
 * command. These can be accessed by pressing the "Script..." command and
 * typing in the following, which don't need to be in code form.
 *
 * Keep in mind that since these are custom additions and RPG Maker MZ does not
 * allow plugins to modify the editor, the "Preview" button will not factor in
 * the effects of these commands.
 * 
 * If you wish to use a value from a variable, insert $gameVariables.value(x)
 * or \V[x] in place of the x in any of the below.
 * 
 * If you wish to use a value from a self variable, insert \SelfVar[x] in place
 * of the x in any of the below. This will only draw from the current event. If
 * you wish to draw data from outside event self variables, we recommend you
 * use the \V[x] variant after using the Plugin Commands to draw data from them
 * for the best accuracy.
 *
 * ---
 * 
 * Animation: x
 * - Replace 'x' with the ID of the animation to play on moving unit.
 *
 * ---
 * 
 * Balloon: name
 * - Replace 'name' with any of the following to play a balloon on that the
 *   target moving unit.
 * - '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep', 'User-Defined 1', 'User-Defined 2',
 *   'User-Defined 3', 'User-Defined 4', 'User-Defined 5'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: !
 *   - Balloon: Sleep
 *   - Balloon: Heart
 *
 * ---
 * 
 * Fade In: x
 * Fade Out: x
 * - Fades in/out the sprite's opacity.
 * - Fade In will continuously raise the opacity level until it reaches 255.
 * - Fade Out will continuously lower the opacity level until it reaches 0.
 * - Replace 'x' with the speed to fade in/out the sprite.
 * 
 * ---
 * 
 * Force Carry: On
 * Force Carry: Off
 * - For usage with the VS8 sprite sheet.
 * - Use ON to turn force carrying on.
 * - Use OFF to turn force carrying off.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Carry frames.
 * 
 * ---
 * 
 * Force Dash: On
 * Force Dash: Off
 * - Use ON to turn force dashing on.
 * - Use OFF to turn force dashing off.
 * - Forces dashing will prompt the player or event to be in the dashing state.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Dashing frames.
 * 
 * ---
 * 
 * Hug: Left
 * Hug: Right
 * - Causes the moving unit to hug the left/right side of the wall.
 *
 * ---
 * 
 * Index: x
 * - Replace 'x' with a number depicting the character index to change the
 *   moving unit's sprite to.
 *
 * ---
 * 
 * Index: +x
 * Index: -x
 * - Replace 'x' with the value to change the character index of the moving
 *   unit's sprite by.
 *
 * ---
 * 
 * Jump Forward: x
 * - Replace 'x' with the number of tiles for the unit to jump forward by.
 *
 * ---
 * 
 * Jump To: x, y
 * - Replace 'x' and 'y' with the coordinates for the unit to jump to.
 *
 * ---
 * 
 * Jump to Event: x
 * - Replace 'x' with the ID of the event for the unit to jump to.
 *
 * ---
 * 
 * Jump to Player
 * - Causes the moving unit to jump to the player.
 *
 * ---
 * 
 * Jump To Home
 * - Causes the event to jump to its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Move Lower Left Until Stop
 * Move Down Until Stop
 * Move Lower Right Until Stop
 * Move Left Until Stop
 * Move Right Until Stop
 * Move Upper Left Until Stop
 * Move Up Until Stop
 * Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events will stop moving before they make contact with the player.
 *
 * ---
 * 
 * Crash Move Lower Left Until Stop
 * Crash Move Down Until Stop
 * Crash Move Lower Right Until Stop
 * Crash Move Left Until Stop
 * Crash Move Right Until Stop
 * Crash Move Upper Left Until Stop
 * Crash Move Up Until Stop
 * Crash Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Player
 * - Moves the unit to the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Crash Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 * 
 * ---
 * 
 * Move Lower Left: x
 * Move Down: x
 * Move Lower Right: x
 * Move Left: x
 * Move Right: x
 * Move Upper Left: x
 * Move Up: x
 * Move Upper Right: x
 * - Replace 'x' with the number of times to move the unit by in the designated
 *   direction on the map.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Opacity: x%
 * - Replace 'x' with the percentage to change the unit's sprite opacity to.
 *
 * ---
 * 
 * Opacity: +x
 * Opacity: -x
 * - Replace 'x' with the increment to change the unit's sprite opacity by.
 *
 * ---
 *
 * Pattern Lock: x
 * - Replace 'x' with the step pattern to lock the unit's sprite to.
 *
 * ---
 *
 * Pattern Unlock
 * - Removes pattern lock effect.
 *
 * ---
 * 
 * Pose: name
 * - If using a VS8 sprite, this will cause the unit to strike a pose.
 * - Replace 'name' with any the following:
 * - 'Item', 'Hmph', 'Victory', 'Hurt', 'Kneel', 'Collapse',
 *   '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: Item
 *   - Balloon: Victory
 *   - Balloon: ?
 *
 * ---
 * 
 * Step Toward: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step towards.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Player
 * - Causes event to take one step towards the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Home
 * - Causes the event to take one step towards its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Step Away From: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step away from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Player
 * - Causes event to take one step away from the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Home
 * - Causes the event to take one step away from its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Turn To: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Event: x
 * - Replace 'x' with the ID of the event to turn the unit towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Player
 * - Causes the unit to turn towards the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Home
 * - Causes the event to turn towards its home position.
 * - This refers to the original position's X/Y on the map.
 * - The event will turn and face the tile that is its original X/Y location.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Away From: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Event: x
 * - Replace 'x' with the ID of the event to turn the unit away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Player
 * - Causes the unit to turn away from the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Home
 * - Causes the event to turn away from its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Lower Left
 * Turn Lower Right
 * Turn Upper Left
 * Turn Upper Right
 * - Causes the unit to turn to one of the diagonal directions.
 *
 * ---
 * 
 * Self Switch x: On
 * Self Switch x: Off
 * Self Switch x: Toggle
 * - Replace 'x' with 'A', 'B', 'C', 'D', or a <Self> Switch ID to adjust the
 *   unit's Self Switch.
 *
 * ---
 * 
 * Self Variable x: y
 * - Replace 'x' with a <Self> Variable ID to adjust the unit's Self Variable.
 * - Replace 'y' with a number value to set the Self Variable to.
 *
 * ---
 * 
 * Teleport To: x, y
 * - Replace 'x' and 'y' with the coordinates to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Event: x
 * - Replace 'x' with the ID of the event to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Player
 * - Instantly moves the unit to the player's location.
 *
 * ---
 * 
 * Teleport to Home
 * - Instantly teleports an event to its home position on the map.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * If none of the commands are detected above, then a script call will be ran.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Label Settings
 * ============================================================================
 *
 * Event Labels are small windows created to display text over an event's head.
 * They're set up using the <Label> notetags and/or comment tags. Event Labels
 * are a great way to instantly relay information about the event's role to
 * the player.
 *
 * ---
 *
 * Event Labels
 * 
 *   Sprite Based?:
 *   - Use sprite-based labels instead of legacy-window version.
 *   - Legacy-window version will not be supported in future.
 *   - Sprite-based labels are more memory efficient and work better
 *     compatibility-wise.
 * 
 *   Mobile-Enabled?:
 *   - Enable event labels for mobile devices?
 * 
 *   Font Size:
 *   - The font size used for the Event Labels.
 * 
 *   Icon Size:
 *   - The size of the icons used in the Event Labels.
 * 
 *   Line Height:
 *   - The line height used for the Event Labels.
 * 
 *   Offset X:
 *   - Globally offset all labels horizontally by this amount.
 * 
 *   Offset Y:
 *   - Globally offset all labels vertically by this amount.
 * 
 *   Fade Speed:
 *   - Fade speed for labels.
 * 
 *   Visible Range:
 *   - Range the player has to be within the event to make its label visible.
 * 
 *     Range Type:
 *     - What do you want the default label visible range type?
 *       - Square
 *       - Diamond
 *       - Circle
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Icon Settings
 * ============================================================================
 *
 * Icons can be displayed over an event's head through the <Icon> notetags
 * and/or comment tags. These can be used for a variety of things such as
 * making them look like they're carrying an item or to indicate they have a
 * specific role.
 *
 * ---
 *
 * Event Icon
 * 
 *   Buffer X:
 *   - Default X position buffer for event icons.
 * 
 *   Buffer Y:
 *   - Default Y position buffer for event icons.
 * 
 *   Blend Mode:
 *   - Default blend mode for even icons.
 *     - 0 - Normal
 *     - 1 - Additive
 *     - 2 - Multiply
 *     - 3 - Screen
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Template Settings
 * ============================================================================
 *
 * Event Templates allow you to store specific maps and/or event data to bring
 * out on need while having a premade set base. They're similar to prefabs but
 * aren't things that can be altered individually as one setting for an event
 * template will serve as a blueprint for all of them that use them.
 *
 * Event Templates are used for the <Copy Event> notetags, the Morph Event and
 * Spawn Event Plugin Commands.
 *
 * ---
 *
 * Settings
 * 
 *   Preloaded Maps:
 *   - A list of all the ID's of the maps that will be preloaded to serve as
 *     template maps for this plugin.
 *
 * ---
 *
 * Templates
 * - A list of all the Event Templates used by this project. Used for notetags
 *   and Plugin Commands.
 * 
 *     Name:
 *     - Name of the template. It'll be used as anchor points for notetags and
 *       Plugin Commands.
 * 
 *     Map ID:
 *     - ID of the map the template event is stored on.
 *     - This will automatically add this ID to preloaded list.
 * 
 *     Event ID:
 *     - ID of the event the template event is based on.
 * 
 *     JavaScript:
 *       JS: Pre-Copy:
 *       JS: Post-Copy:
 *       JS: Pre-Morph:
 *       JS: Post-Morph:
 *       JS: Pre-Spawn:
 *       JS: Post-Spawn:
 *       - Code that's ran during certain circumstances.
 *       - The code will occur at the same time as the ones listed in the main
 *         Event Template Settings Plugin Parameters. However, the ones listed
 *         in these individual entries will only occur for these specific
 *         templates and only if the templates are used.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Pre-Copy:
 *   JS: Post-Copy:
 *   JS: Pre-Morph:
 *   JS: Post-Morph:
 *   JS: Pre-Spawn:
 *   JS: Post-Spawn:
 *   - Code that's ran during certain circumstances.
 *   - These are global and are ran for all copies, morphs, and/or spawns.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Movement Settings
 * ============================================================================
 *
 * These plugin parameters allow you to control how movement works in your
 * game, toggling it from 4-directional to 8-directional, setting up rules to
 * stop self-movement from events while an event or message is present, and
 * other aesthetics such as tilting the sprite while dashing, setting shadows
 * beneath the sprites, and allow for turning in place.
 *
 * ---
 *
 * 8 Directional Movement
 * 
 *   Enable:
 *   - Allow 8-directional movement by default? Players can move diagonally.
 * 
 *   Strict Collision:
 *   - Enforce strict collission rules where the player must be able to pass
 *     both cardinal directions?
 * 
 *   Favor Horizontal:
 *   - Favor horizontal if cannot pass diagonally but can pass both
 *     horizontally and vertically?
 * 
 *   Slower Diagonals?
 *   - Enforce a slower movement speed when moving diagonally?
 * 
 *     Speed Multiplier
 *     - What's the multiplier to adjust movement speed when moving diagonally?
 *
 * ---
 *
 * Automatic Movement
 * 
 *   Stop During Events:
 *   - Stop automatic event movement while events are running.
 * 
 *   Stop During Messages:
 *   - Stop automatic event movement while a message is running.
 *
 * ---
 * 
 * Bitmap
 * 
 *   Smoothing:
 *   - Do you want to smooth or pixelate the map sprites?
 *   - Pixelating them is better for zooming and tilting.
 * 
 * ---
 *
 * Dash
 * 
 *   Dash Modifier:
 *   - Alters the dash speed modifier.
 * 
 *   Dash on Ladder?
 *   - Allow dashing while on a ladder or rope?
 * 
 *   Enable Dash Tilt?:
 *   - Tilt any sprites that are currently dashing?
 * 
 *     Tilt Left Amount:
 *     - Amount in radians when moving left (upper left, left, lower left).
 * 
 *     Tilt Right Amount:
 *     - Amount in radians when moving right (upper right, right, lower right).
 * 
 *     Tilt Vertical Amount:
 *     - Amount in radians when moving vertical (up, down).
 *
 * ---
 * 
 * Event Movement
 * 
 *   Random Move Weight:
 *   - Use numbers between 0 and 1.
 *   - Numbers closer to 1 stay closer to their home position.
 *   - 0 to disable it.
 * 
 *   Shift Y:
 *   - How many pixels should non-tile characters be shifted by?
 *   - Negative: up. Positive: down.
 * 
 * ---
 * 
 * Path Finding
 * 
 *   Mobile-Enabled?:
 *   - Enable diagonal pathfinding for mobile devices?
 * 
 * ---
 *
 * Shadows
 * 
 *   Show:
 *   - Show shadows on all events and player-related sprites.
 * 
 *   Default Filename:
 *   - Default filename used for shadows found in img/system/ folder.
 *
 * ---
 *
 * Turn in Place
 * 
 *   Enable:
 *   - When not dashing, player will turn in place before moving.
 *   - This only applies with keyboard inputs.
 * 
 *   Delay in Frames:
 *   - The number of frames to wait before moving.
 *
 * ---
 * 
 * Vehicle Speeds
 * 
 *   Boat Speed:
 *   - Allows you to adjust the base speed of the boat vehicle.
 * 
 *   Ship Speed:
 *   - Allows you to adjust the base speed of the ship vehicle.
 * 
 *   Airship Speed:
 *   - Allows you to adjust the base speed of the airship vehicle.
 * 
 * ---
 * 
 * Wall Bump
 * 
 *   Enable?:
 *   - Enable the sound effect to be played when bumping into a wall?
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: VisuStella 8-Dir Settings
 * ============================================================================
 *
 * These are settings for sprite sheets using the VS8 format.
 * For more information on the VS8 format, look in the help section above.
 *
 * ---
 *
 * Balloon Icon Settings
 * 
 *   Auto-Balloon Poses:
 *   - Automatically pose VS8 sprites when using balloon icons.
 * 
 *   Balloon Offset X:
 *   - Offset balloon icons on VS8 sprites by x pixels.
 * 
 *   Balloon Offset Y:
 *   - Offset balloon icons on VS8 sprites by y pixels.
 *
 * ---
 *
 * Icons
 * 
 *   Auto Buffer:
 *   - Automatically buffer the X and Y coordinates of VS8 sprites?
 * 
 *   Use Carry Pose:
 *   - Use the carry pose when moving with an icon overhead.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Region Rulings
 * ============================================================================
 *
 * These settings allow you to decide the passability of the player, events,
 * and various vehicles through the usage of Regions.
 *
 * ---
 *
 * Allow Regions
 * 
 *   All Allow:
 *   Walk Allow:
 *   Player Allow:
 *   Event Allow:
 *   Vehicle Allow:
 *   Boat Allow:
 *   Ship Allow:
 *   Airship Allow:
 *   - Insert Region ID's where the affected unit type can enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Forbid Regions
 * 
 *   All Forbid:
 *   Walk Forbid:
 *   Player Forbid:
 *   Event Forbid:
 *   Vehicle Forbid:
 *   Boat Forbid:
 *   Ship Forbid:
 *   Airship Forbid:
 *   - Insert Region ID's where the affected unit type cannot enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Dock Regions
 * 
 *   Vehicle Dock:
 *   Boat Dock:
 *   Ship Dock:
 *   Airship Dock:
 *   - Insert Region ID's where the affected vehicle can dock
 *   - Region ID's range from 0 to 255.
 * 
 *   Only Region Dockable:
 *   - Vehicles are only able to dock at designated regions.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on OK Button
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that activate using
 * Regions when pressing the OK button while standing on top of them or in
 * front of them. These let you create near universally interactable objects
 * using Regions, such as rivers to start up fishing events or locations to
 * places items on.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * Target Tile
 * 
 *   Target Tile:
 *   - Which tile should be checked for Common Event on OK Button?
 *     - Tile in front of player.
 *     - Tile player is standing on top of.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on Touch
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that trigger when
 * stepping onto Region-marked tiles. These let you create custom effects that
 * will occur such as customized damage floors, traps, and/or events.
 * 
 * Areas marked with these regions will not allow random encounters to occur.
 * This is how RPG Maker works. Assuming you are not using plugins at all, by
 * putting on touch events all over the map, tiles with those on touch events
 * will not let random encounters trigger.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Terrain Tag Settings
 * ============================================================================
 *
 * Terrain Tags are used in Database => Tilesets to mark certain tiles and
 * give them unique properties through terrain tags.
 *
 * ---
 *
 * Terrain Tag ID's
 * 
 *   Rope:
 *   - Which terrain tag number to use for ropes?
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
 * Version 1.60: August 29, 2024
 * * Bug Fixes!
 * ** Fixed a bug where events with large hitboxes do not work with crash move.
 *    Fix made by Arisu.
 * ** Fixed a bug where single-mode save games by Save Core would freeze after
 *    executed event movements. Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Event Labels will adjust their vertical position to the picture of any
 *    attached event picture if one is present. Update by Arisu.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Picture Type: Enemy>
 * *** <Picture Type: SV Enemy>
 * **** Will use /img/enemies/ or /img/sv_enemies/ instead of /img/pictures/ to
 *      grab a picture graphic from.
 * **** Other picture graphic sprite related notetags will apply as normal.
 * *** <Label Range Type: Square>
 * *** <Label Range Type: Circle>
 * *** <Label Range Type: Diamond>
 * **** Sets a range type for the label to appear visible for.
 * ** New Plugin Parameters added by Arisu:
 * *** Parameters > Event Label Settings > Visible Range > Range Type:
 * **** What do you want the default label visible range type?
 * 
 * Version 1.59: June 13, 2024
 * * Bug Fixes!
 * ** Added a cache check for character sprite tag names to reduce frame drops.
 *    Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Arisu:
 * *** <Location X: +x>, <Location X: -x>
 * *** <Location Y: +y>, <Location Y: -y>
 * *** <Location: +x, +y>, <Location: +x, -y>
 * *** <Location: -x, +y>, <Location: -x, -y>
 * **** Adjusts the initial location of this event by +x and +y (or -x and -y).
 * **** This allows you to stack events on top of each other or even move them
 *      to various places of the map.
 * *** <Tile Expand Up: x>
 * *** <Tile Expand Down: x>
 * *** <Tile Expand Left: x>
 * *** <Tile Expand Right: x>
 * **** Used for events with tile graphics. Expands the graphic up, down, left,
 *      or right from the spritesheet.
 * **** This does NOT expand the hitbox.
 * **** The graphic will be anchored to the tile it's expanded from. This means
 *      even if you expanded downward, the actual event's position will still
 *      be the current event's X/Y coordinates. It's just grown more vertically
 *      and is still centered horizontally.
 * **** This is primarily used to save on having to use too many events for
 *      tiles that expanded past 1x1 tile sizes.
 * 
 * Version 1.58: May 16, 2024
 * * Documentation Update!
 * ** Added "Features: Character Sprite Filename Tags" section.
 * * New Features!
 * ** [Invisible] tag added to character sprite filenames.
 * *** If a character sprite's filename has [invisible] in it, it will become
 *     invisible on the map screen in-game while almost everything else about
 *     it is visible. This is used for those who wish to use sprite labels for
 *     things such as autorun and parallel events.
 * 
 * Version 1.57: March 14, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Plugin Command: "Event Icon: Delete" will now keep an event icon cleared
 *    until the newly added Plugin Command: "Event Icon: Restore" is used.
 *    Update made by Arisu.
 * ** Plugin Command: "Event Icon: Change" is now renamed to have "(Temporary)"
 *    after its name in order to clarify the temporary changes made to it.
 * * New Features!
 * ** New Plugin Command added by Arisu:
 * *** Event Icon: Event Icon: Change (Forced)
 * **** Change the icon that appears on an event.
 * **** This change is forced and needs to be restored.
 * *** Event Icon: Restore
 * **** Restores a deleted or forced icon that appears on an event.
 * 
 * Version 1.56: February 15, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Added fail safes for activation proximity notetags when loaded from past
 *    save files without Events and Movement Core installed. Added by Arisu.
 * * New Features!
 * ** New notetags added by Arisu:
 * *** <Encounter Half Square: x>
 * *** <Encounter Half Circle: x>
 * *** <Encounter Half Delta: x>
 * *** <Encounter Half Row: x>
 * *** <Encounter Half Column: x>
 * *** <Encounter None Square: x>
 * *** <Encounter None Circle: x>
 * *** <Encounter None Delta: x>
 * *** <Encounter None Row: x>
 * *** <Encounter None Column: x>
 * **** If the player is within the 'x' area effect of this event, the random
 *      encounter rate will be halved or suppressed completely depending on the
 *      notetag used.
 * **** These include script call checks.
 * *** <Erase if Encounter Half>
 * *** <Erase if Encounter None>
 * **** Automatically erase this event if the player's party has an encounter
 *      half or encounter none effect, or if the event has spawned in an
 *      encounter half or encounter none area.
 * **** This check only occurs in two situations: when the map is first loaded
 *      after being teleported into or when the player leaves a menu and
 *      returns back to the map.
 * **** Events that have been erased due to this effect will NOT return even if
 *      the encounter half/none effect is removed while the player is still on
 *      the map. The event will return if the player exits the map and comes
 *      back.
 * 
 * Version 1.55: December 14, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Event Popup: Player
 * *** Event Popup: Follower
 * *** Event Popup: Event
 * *** Event Popup: Target Tile
 * **** Makes a centered event popup on the player sprite, target follower
 *      sprite, target event sprite, or target tile.
 * **** All of these new Plugin Commands require VisuMZ_1_MessageCore and
 *      cannot be used in battle.
 * 
 * Version 1.54: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated to reduce confusion:
 * *** Call Event: Remote Read
 * **** This will run the page of the target event on the current event.
 * **** This means that any "This Event" commands will be applied to the event
 *      using this Plugin Command and NOT the target event that page data is
 *      being retrieved from.
 * **** Think of it as the current event using the target called event as a
 *      Common Event ala how RPG Maker 2003 works (for those familiar with it).
 * * Feature Update!
 * ** Renamed "Call Event: Remote Activation" to "Call Event: Remote Read" to
 *    reduce confusion.
 * * Feature Update!
 * ** <Activation Radius: x> notetag is now defined as <Activation Delta: x>
 * *** 'Radius' variant will still work and function as 'Delta' but will no
 *     longer be listed in the help file as 'Radius'
 * *** This is changed to avoid confusion with the new notetag.
 * * New Features!
 * ** New notetag added by Arisu and sponsored by AndyL:
 * *** <Activation Circle: x>
 * **** A circle-shaped range with the event at the center.
 * **** 'x' represents the distance from the center.
 * 
 * Version 1.53: August 17, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** <Map Load Common Event: x>
 * ** <Map Load Common Events: x, x, x>
 * *** When this map is loaded, run the specified Common Events once available.
 * **** Does NOT trigger if you transfer to a different part of the same map.
 * 
 * Version 1.52: July 13, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated help file for <Label: text> notetags:
 * *** If text codes are used, avoid text codes that use < and > wrappers.
 * ** Updated help file for <Label> sandwich notetags:
 * *** You can use text codes with < and > wrappers.
 * * Feature Update!
 * ** Event labels now work properly with scaling sprites.
 * * New Features!
 * ** New notetag added by Arisu and sponsored by Anon:
 * *** <Label Hue Shift: +x>
 * *** <Label Hue Shift: -x>
 * **** Changes the hue of the event label by +x or -x every frame.
 * **** Keep in mind that since this is changing hue, this will appear to have
 *      no effect if you are using black and white labels.
 * **** Use labels with text codes that add color to them like '\C[4]text'
 * **** This only works with the sprite version of event labels and does not
 *      work with the legacy version.
 * 
 * Version 1.51: June 15, 2023
 * * Bug Fixes!
 * ** Provided a fail safe for plugins using the scaling options from this
 *    plugin but do not have scaling parameters identified. The scaling ratio
 *    should now default to 1.0. Fix made by Olivia.
 * * Feature Update!
 * ** Diagonal pathfinding is now improved as to not get stuck on tight corners
 *    on the map. Feature update made by Arisu.
 * 
 * Version 1.50: April 13, 2023
 * * Bug Fixes!
 * ** <Icon: x> should now update correctly when changing pages through self
 *    switches or other event conditions. Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Event Labels > Mobile-Enabled?
 * *** Plugin Parameters > Movement > Pathfinding > Mobile-Enabled?
 * **** These settings allow you to enable or disable certain features when
 *      played on mobile devices for better performance.
 * 
 * Version 1.49: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Event Notetag and Comment Tags added by Arisu:
 * *** <Scale: x%>
 * *** <Scale X: x%>
 * *** <Scale Y: y%>
 * **** Changes the scale of the sprite to the designated size.
 * 
 * Version 1.48: January 20, 2023
 * * Feature Update!
 * ** <Move Synch> for certain types will also copy facing directions even if
 *    there are no tile movements (ie changing directions when pressed up
 *    against and obstacle). Update made by Arisu.
 * 
 * Version 1.47: November 10, 2022
 * * Feature Update!
 * ** If "Follower: Set Global Chase" is set to false, followers will no longer
 *    jump towards the player location when the player jumps. This does NOT
 *    apply to gather or location changing players. Followers will still have
 *    to synchronize their positions there regardless in order to maintain
 *    consistency. Update made by Olivia.
 * 
 * Version 1.46: September 29, 2022
 * * Bug Fixes!
 * ** Altered the self switch auto-reset timing to reduce errors. Fix by Arisu.
 * * Feature Update!
 * ** Added self-movement prevention whenever scenes are deactivated. Update
 *    made by Arisu.
 * 
 * Version 1.45: August 18, 2022
 * * Bug Fixes!
 * ** Fixed a bug that caused event labels with variables from refreshing
 *    properly. Fix made by Arisu.
 * 
 * Version 1.44: July 21, 2022
 * * Bug Fixes!
 * ** Fixed a problem that caused <Exit Reset Self Data> notetag to not work.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Diagonal pathfinding is now disabled when there are too many events on a
 *    map, causing extra collission checks. This value is set to 100 for the
 *    time being until we can figure out a better way to calculate diagonal
 *    pathfinding. Update made by Irina.
 * 
 * Version 1.43: July 14, 2022
 * * Bug Fixes!
 * ** Move to Player for events should no longer cause hang ups. Fix by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Added caching function for pathfinding when using touch movement for a
 *    smoother experience. When touch movement is held down, pathfinding will
 *    utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Update made by Arisu.
 * * New Features!
 * ** New notetag added by Arisu:
 * *** <Playtest>
 * **** If this notetag is found in the event's notebox (NOT comments), then
 *      the event will only appear during a playtest session. It will not
 *      appear in a deployed game where the playtest flag is not on.
 * 
 * Version 1.42: June 23, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added to <Copy Event: x, y> notetag help:
 * *** - If '0' is used for the Map ID, reference the current map.
 * * Feature Update!
 * ** Default MZ behavior would have "below characters" trigger events with
 *    only comments lock out facing "same as characters" trigger events. This
 *    is now bypassed. Update made by Arisu.
 * ** The <Copy Event: mapID, eventID> notetags now allow usage of '0' for the
 *    mapID to reference the current map. Update made by Arisu.
 * ** <Save Event Location> should now work more efficiently. Update by Arisu.
 * ** Dashing animations for followers will no longer look weird after having
 *    gathered up and then proceeding to dash. Update made by Irina.
 * * New Features!
 * ** New event notetag added by Arisu:
 * *** <Exit Reset Self Data>
 * **** When the player leaves the current map, all Self Switches and Self
 *      Variables related to this event will be reset.
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Self Data: Reset All
 * **** Reset the Self Switch and Self Variable data of all events within the
 *      specified map.
 * ** New Plugin Parameter added by Arisu and sponsored by Anon:
 * *** Plugin Params > Movement Settings > Dash > Dash on Ladder?
 * **** Allow dashing while on a ladder or rope?
 * 
 * Version 1.41: June 1, 2022
 * * Bug Fixes!
 * ** Parallel Process Common Events above 1000 should no longer crash the
 *    game. Bug fixed by Irina.
 * 
 * Version 1.40: May 19, 2022
 * * Bug Fixes!
 * ** Sprite Event Labels with distance properties will now work properly
 *    when changing from a non-met page condition to a met page condition.
 *    Fix made by Arisu.
 * 
 * Version 1.39: May 5, 2022
 * * Bug Fixes!
 * ** Save event location should now work properly with Set Event Location
 *    command. Fix made by Arisu.
 * ** Sprite Event Labels with distance properties will no longer be visible
 *    when constantly entering/exiting the Main Menu. Fix made by Arisu.
 * 
 * Version 1.38: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu and sponsored by Archeia:
 * *** Plugin Parameters > Movement Settings > Event Movement > Shift Y
 * **** How many pixels should non-tile characters be shifted by?
 * ** New Notetags added by Arisu and sponsored by Archeia:
 * *** <Picture Filename: filename>
 * **** applies a picture graphic from the /img/pictures/ folder of your
 *      game project.
 * **** This graphic will be on top of the character sprite but below the event
 *      icon sprite.
 * **** The picture priority will be the same as the event's priority. If it is
 *      "below characters", the player can walk on top of it. If it is "above
 *      characters", the player will behind it. If it is "same as characters",
 *      the priority will be based on the current relative Y position.
 * *** <Picture Max Size: x>
 * *** <Picture Scale: y%>
 * **** If the "Max Size" or "Scale" supplementary notetags are used, the
 *      picture graphic will be scaled proportionally to fit either the exact
 *      pixel size for "Max Size" or the "Scale" ratio.
 * *** <Picture Offset: +x, +y>
 * *** <Picture Offset: -x, -y>
 * **** Offsets the X and Y position of the event picture relative to the event
 *      sprite's own position.
 * *** <Picture Wait Frames: x>
 * **** Requires VisuMZ_4_AnimatedPictures! "Wait Frames" is used with VisuMZ's
 *      Animated Pictures plugin. This determines the delay inbetween
 *      frame changes.
 * 
 * Version 1.37: March 24, 2022
 * * Documentation Update!
 * ** Added extra clarity to "Turn to Home" Movement Command.
 * *** This refers to the original position's X/Y on the map.
 * *** The event will turn and face the tile that is its original X/Y location.
 * 
 * Version 1.36: March 17, 2022
 * * Bug Fixes!
 * ** "Turn To Home" movement command now properly faces the home position.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.35: March 3, 2022
 * * IMPORTANT! Compatibility Update!
 * ** Compatibility Update with RPG Maker MZ 1.4.4.
 * *** For some reason this update broke any saves made before 1.4.4 was
 *     updated and they cannot be loaded. The only way saves would load is if
 *     you made a safe after 1.4.4 was done. This should be fixed and saves
 *     made with 1.4.3 and before should now be working. Update made by Irina.
 * 
 * Version 1.34: February 17, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * * New Features!
 * ** Arisu has created new event notetag/comment tags:
 * *** <Custom Z: x>
 * **** Replace 'x' with a number value to determine the event sprite's Z value
 *      relative to the tilemap.
 * **** View the helpfile for more information.
 * *** <Mirror Sprite>
 * **** The event sprite's visual appearance is mirrored.
 * *** <Move Synch Distance Opacity: x>
 * **** Changes the opacity of the event based on the distance between it and
 *      its move synched target. Closer means more opaque. Further away means
 *      more transparent.
 * ** Irina has created a more memory efficient version of Event Labels.
 * *** Plugin Parameters > Event Label Settings > Sprite Based?
 * **** Use sprite-based labels instead of legacy-window version.
 * **** Legacy-window version will not be supported in future.
 * 
 * Version 1.33: February 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu!
 * *** <Hide Player>
 * *** <Show Player>
 * **** Map Notetag. Forcefully hides or shows the player sprite. This is so
 *      you don't need to manually turn the setting on/off each time you enter
 *      a specific map.
 * *** <Hide Followers>
 * *** <Show Followers>
 * **** Map Notetag. Forcefully hides or shows the player's followers. This is
 *      so you don't need to manually turn them on/off each time you enter a
 *      specific map.
 * 
 * Version 1.32: January 20, 2022
 * * Bug Fixes!
 * ** Self Variable changes from custom move routes should no longer cause
 *    crashes. Fix made by Arisu.
 * ** Self Switch custom move route toggles should now work properly. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Better shadow tracking algorithm to remove any shadow twitching.
 *    Update made by Yanfly.
 * 
 * Version 1.31: January 6, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.30: November 25, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Map Switches and Map Variables added by Arisu:
 * *** Map Switches are self-switches for maps. Instead of using <Self>, use
 *     <Map> in the Switch name to designate it as a Map Switch. The ON/OFF
 *     data for that Switch will vary depending on the map the player is
 *     currently on.
 * *** Map Variables are self-variables for maps. Instead of using <Self>, use
 *     <Map> in the Variable name to designate it as a Map Switch. The number
 *     data for that Variable will vary depending on the map the player is
 *     currently on.
 * *** Script Calls have been added for these features as well.
 * **** See help file for them.
 * 
 * Version 1.29: October 7, 2021
 * * Bug Fixes!
 * ** Same map event spawning should now work properly without the need to add
 *    the current map ID to the preloaded map array. Update made by Arisu.
 * 
 * Version 1.28: September 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New move route commands added by Arisu:
 * *** Jump to Home
 * *** Move to Home
 * *** Crash Move to Home
 * *** Step Toward Home
 * *** Step Away From Home
 * *** Turn to Home
 * *** Turn Away From Home
 * *** Teleport to Home
 * **** These only work on events. Their actions should be reflective of what
 *      their command names suggest.
 * 
 * Version 1.27: September 17, 2021
 * * Bug Fixes!
 * ** Fixed event spawn templates so that they can work properly with Common
 *    Events. Fix made by Arisu.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** "Step Towards Player" custom command should now work properly. Fix made
 *    by Arisu.
 * ** Having multiple region restriction notetags for a map will no longer
 *    cause others to lock out. Fix made by Arisu.
 * 
 * Version 1.25: July 30, 2021
 * * Bug Fixes!
 * ** Fixed a problem that caused the 'setSelfSwitchValue' and
 *    'setSelfVariableValue' functions to not work properly. Fix made by Irina.
 * 
 * Version 1.24: June 4, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added extra clarification on which commands will go around the player
 *    character and which ones won't.
 * * New Move Route Custom Commands added by Arisu:
 * ** Crash Move (direction) Until Stop
 * ** Crash Move To: x, y
 * ** Crash Move To Event: x
 * *** These allow events to collide with the player character and trigger
 *     Event Touch events.
 * 
 * Version 1.23: May 21, 2021
 * * Bug Fixes!
 * ** Morphing by templates should no longer cause a crash. Fix made by Arisu.
 * 
 * Version 1.22: May 7, 2021
 * * Bug Fixes!
 * ** Plugin Commands for Event Label Visibility should now update without
 *    needing to take steps as per distance detection. Fix made by Arisu.
 * * Documentation Update!
 * ** Added clarity to "Common Event on Touch" Plugin Parameters.
 * *** Areas marked with these regions will not allow random encounters to
 *     occur. This is how RPG Maker works. Assuming you are not using plugins
 *     at all, by putting on touch events all over the map, tiles with those on
 *     touch events will not let random encounters trigger.
 * 
 * Version 1.21: March 12, 2021
 * * Bug Fixes!
 * ** Move until stop custom move routes should no longer cause crashes.
 *    Fix made by Arisu.
 * 
 * Version 1.20: February 26, 2021
 * * Bug Fixes!
 * ** Region Restrictions regarding Player Allow will no longer affect vehicle
 *    passability. Update made by Arisu.
 * 
 * Version 1.19: February 12, 2021
 * * Bug Fixes!
 * ** "Self Variable: Variable ID" plugin command's Map ID should now be able
 *    to use "0" to self reference the current map. Fix made by Olivia.
 * 
 * Version 1.18: February 5, 2021
 * * Bug Fixes!
 * ** Event icon plugin commands should now work properly. Fix made by Arisu.
 * * Documentation Update!
 * ** Added new "Features: Weighted Random Movement" section.
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Random Move Weight: x>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then the event will stick closer to their home location (where they are
 *      located upon spawning on the map). How close they stick to their home
 *      location will depend on the weighted 'x' value.
 * *** <True Random Move>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then that event will ignore the effects of weighted randomized
 *      movement.
 * ** New Plugin Commands added by Arisu and sponsored by AndyL:
 * *** Event Timer: Change Speed
 * *** Event Timer: Expire Event Assign
 * *** Event Timer: Expire Event Clear
 * *** Event Timer: Frames Gain
 * *** Event Timer: Frames Set
 * *** Event Timer: Pause
 * *** Event Timer: Resume
 * **** The above Plugin Commands allow you to control the game timer better.
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Movement > Event Movement > Random Move Weight
 * **** Use numbers between 0 and 1. Numbers closer to 1 stay closer to their
 *      home position.
 * 
 * Version 1.17: January 29, 2021
 * * Documentation Update!
 * ** Added "Do NOT insert quotes" to "Balloon: name" and "Pose: name".
 * ** Added Examples for extra clarification.
 * * Optimization Update!
 * ** When touch clicking an event on a map with multiple events, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.16: January 22, 2021
 * * Optimization Update!
 * ** When touch clicking multiple times on an impassable tile, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.15: January 1, 2021
 * * Bug Fixes!
 * ** Spawned events should now resume their automated self movement after
 *    being interacted with. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for updated features.
 * * Feature Updates!
 * ** Collission checks for the Spawn Event Plugin Commands now account for
 *    the spawning event's Hitbox, too. Update made by Yanfly.
 * ** Spawn Event Plugin Commands adds a new parameter "Success Switch ID" to
 *    check if the spawning has been successful or not.
 * * New Features!
 * ** New Plugin Commands added by Yanfly!
 * *** Spawn Event: Spawn At Terrain Tag
 * *** Spawn Event: Despawn Terrain Tag(s)
 * **** These function similar to their region counterparts except they target
 *      terrain tags instead.
 * 
 * Version 1.14: December 18, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for page index.
 *    Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the new features!
 * * New Features!
 * ** New Plugin Commands added by Irina.
 * *** Follower: Set Global Chase
 * *** Follower: Set Target Chase
 * *** Follower: Set Control
 * *** Follower: Reset
 * **** These plugin commands allow you to change whether or not the followers
 *      will chase their intended targets and/or shift control over their
 *      movement route from the "Player" to the target follower.
 * 
 * Version 1.13: December 4, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for one-screen maps.
 *    Fix made by Arisu.
 * 
 * Version 1.12: November 29, 2020
 * * Bug Fixes!
 * ** Click Triggers no longer work on erased events. Fix made by Arisu.
 * ** Erased events no longer have icons appear above their heads.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Initialization of the plugin's effects no only occur if the event's
 *    current page settings have been altered. Change made by Arisu.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 15, 2020
 * * Bug Fixes!
 * ** Morph plugin command should no longer cause crashes. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the updated features!
 * * Feature Updates!
 * ** Updates to these Plugin Commands made by Yanfly:
 * *** Call Event: Remote Activation
 * *** Event Icon: Change
 * *** Event Icon: Delete
 * *** Event Location: Create
 * *** Event Location: Delete
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * *** Morph Event: Change
 * *** Morph Event: Remove
 * *** Self Switch: A B C D
 * *** Self Switch: Switch ID
 * *** Self Variable: Variable ID
 * **** All of the above Plugin Commands can now use 0 for their Event ID's in
 *      order to refer to the running event's ID value.
 * 
 * Version 1.10: November 1, 2020
 * * Bug Fixes!
 * ** Spawned Event preserve function now works properly. Fix made by Arisu.
 * 
 * Version 1.09: October 25, 2020
 * * Documentation Update
 * ** Added clarity on the notetags and comment tags on when their effects
 *    are present.
 * * Feature Update!
 * ** Event icons now have an unsmoothing property to them to make them
 *    look better. Update made by Irina.
 * 
 * Version 1.08: October 11, 2020
 * * Compatibility Update
 * ** Added failsafes for better compatibility.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** Updated for the new features!
 * * Feature Update!
 * ** Data from deleted events will now be cleared and removed from maps if the
 *    events do not exist to prevent conflict with plugins from the VisuStella
 *    MZ library and other plugins. Feature added by Irina.
 * ** Move Route Custom Commands now support self variable values! If you wish
 *    to use a value from a self variable, insert \SelfVar[x] in place of the x
 *    in any of the below. This will only draw from the current event. If you 
 *    wish to draw data from outside event self variables, we recommend you
 *    use the \V[x] variant after using the Plugin Commands to draw data from
 *    them for the best accuracy.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly!
 * *** Movement > Bitmap > Smoothing
 * **** Do you want to smooth or pixelate the map sprites? Pixelating them is
 *      better for zooming and tilting.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Events & Movement Core no longer disables the Core Engine's Smart Event
 *    Collision plugin parameter. Fix made by Yanfly.
 * * Documentation Update!
 * ** Move Route Custom Commands updated with the new feature for inserting
 *    variable values.
 * * Feature Update!
 * ** Move Route Custom Commands now support $gameVariable.value(x) values.
 *    You can also just use \V[x] for variable values, too. Added by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** If player movement is disabled, mouse movement is disabled, too.
 *    Fix made by Arisu.
 * ** The region restriction notetags should be fixed and work again.
 *    Fix made by Arisu.
 * 
 * Version 1.04: September 13, 2020
 * * Feature Update!
 * * Some Move Route Custom Commands are updated to ignore spaces:
 * ** Jump To: x, y
 * ** Move To: x, y
 * ** Step Toward: x, y
 * ** Step Away From: x, y
 * ** Turn To: x, y
 * ** Turn Away From: x, y
 * ** Teleport To: x, y
 * *** These can now be written as x,y. There still needs to be a space between
 *     the : and x for parsing clarity, however.
 * *** Feature updated by Arisu with help from BlueMoon and Zeriab.
 * * New Features!
 * ** New 'Move Route Custom Commands' added by Arisu.
 * *** Fade In: x
 * *** Fade Out: x
 * *** Force Carry: On
 * *** Force Carry: Off
 * *** Force Dash: On
 * *** Force Dash: Off
 * ** New Plugin Commands added by Arisu.
 * *** Player Movement: Control
 * **** Enable or disable player control over the player character's movement.
 * *** Player Movement: Diagonal
 * **** Override settings to for player diagonal movement.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Sleeping pose is now fixed and working! Fix made by Yanfly.
 * * Documentation Update!
 * ** Extended "Features: Self Switches and Variables" to explain how to use
 *    script calls to grab self switch information.
 * * New Features!
 * ** New Plugin Commands added by Yanfly:
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * **** These plugin commands allow you to transfer data stored in a self
 *      switch or Self Variable into a global switch or global variable.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** <Diagonal Movement: Off> notetag now works properly. Fix made by Yanfly.
 * ** Plugin Command "Event Label: Visible" now works properly. Fix made by
 *    Shaz.
 * ** Custom Move Route commands should now be working properly. Fix made by
 *    Shaz.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Event Cache issues fixed upon loading a saved game. Fix made by Yanfly.
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
 * @command Separator_AutoMove
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutoMoveEvents
 * @text Auto Movement: Events
 * @desc Allow/stop events from auto movement.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Allow
 * @value Allow
 * @option Stop
 * @value Stop
 * @option Toggle
 * @value Toggle
 * @desc Allow events to move automatically?
 * @default Allow
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_CallEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CallEvent
 * @text Call Event: Remote Read
 * @desc Runs the page of a different event remotely. This will run
 * the page of the target event on the CURRENT event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the event to remotely run. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg PageId:eval
 * @text Page ID
 * @desc The page of the remote event to run.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_DashEnable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DashEnableToggle
 * @text Dash Enable: Toggle
 * @desc Enable/Disable Dashing on maps.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Enable
 * @value Enable
 * @option Disable
 * @value Disable
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change dashing to?
 * @default Enable
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventIcon
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconChange
 * @text Event Icon: Change (Temporary)
 * @desc Change the icon that appears on an event.
 * This change is temporary and resets upon new events.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.  Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconChangeForced
 * @text Event Icon: Change (Forced)
 * @desc Change the icon that appears on an event.
 * This change is forced and needs to be restored.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.  Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconDelete
 * @text Event Icon: Delete
 * @desc Delete the icon that appears on an event.
 * This will remain deleted and invisible for events.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconRestore
 * @text Event Icon: Restore
 * @desc Restores a deleted or forced icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventLabel
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelRefresh
 * @text Event Label: Refresh
 * @desc Refresh all Event Labels on screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelVisible
 * @text Event Label: Visible
 * @desc Change the visibility of Event Labels.
 *
 * @arg Visibility:str
 * @text Visibility
 * @type select
 * @option Visible
 * @value Visible
 * @option Hidden
 * @value Hidden
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change visibility to?
 * @default Visible
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventLocation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationSave
 * @text Event Location: Save
 * @desc Memorize an event's map location so it reappears there
 * the next time the map is loaded.
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationCreate
 * @text Event Location: Create
 * @desc Creates a custom spawn location for a specific map's event
 * so it appears there the next time the map is loaded.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent MapId:eval
 * @desc The X coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent MapId:eval
 * @desc The Y coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Direction:num
 * @text Direction
 * @parent MapId:eval
 * @type select
 * @option 1 - Lower Left
 * @value 1
 * @option 2 - Down
 * @value 2
 * @option 3 - Lower Right
 * @value 3
 * @option 4 - Left
 * @value 4
 * @option 6 - Right
 * @value 6
 * @option 7 - Upper Left
 * @value 7
 * @option 8 - Up
 * @value 8
 * @option 9 - Upper Right
 * @value 9
 * @desc The direction the event will be facing.
 * @default 2
 *
 * @arg Optional
 *
 * @arg PageId:eval
 * @text Page ID
 * @parent Optional
 * @desc The page of the event to set the move route to.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg MoveRouteIndex:eval
 * @text Move Route Index
 * @parent Optional
 * @desc The point in the move route for this event to be at
 * if the page ID matches the rest of the page conditions.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationDelete
 * @text Event Location: Delete
 * @desc Deletes an event's saved map location.
 * The event will reappear at its default location.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventPopup
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MsgPopupPlayer
 * @text Event Popup: Player
 * @desc Makes a centered event popup on the player sprite.
 * Requires VisuMZ_1_MessageCore! Cannot be used in battle!
 *
 * @arg MessageText:json
 * @text Message Text
 * @type note
 * @desc Insert the text to be displayed.
 * Text codes can be used.
 * @default "+\\LastGainObjQuantity\\LastGainObj"
 * 
 * @arg MsgDuration:eval
 * @text Message Duration
 * @parent MessageText:json
 * @desc What is the frame duration of the event popup?
 * 60 frames = 1 second. You may use code.
 * @default 60
 *
 * @arg PopupExtra:struct
 * @text Popup Settings
 * @type struct<PopupExtra>
 * @desc These settings let you adjust how the popup animates.
 * @default {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-48","endOffsetX:eval":"+0","endOffsetY:eval":"-96","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MsgPopupFollower
 * @text Event Popup: Follower
 * @desc Makes a centered event popup on target follower sprite.
 * Requires VisuMZ_1_MessageCore! Cannot be used in battle!
 *
 * @arg FollowerIndex:eval
 * @text Follower Index
 * @desc Which follower index to play popup?
 * Index starts at 0. You may use JavaScript code.
 * @default 0
 *
 * @arg MessageText:json
 * @text Message Text
 * @type note
 * @desc Insert the text to be displayed.
 * Text codes can be used.
 * @default "\\I[23]"
 * 
 * @arg MsgDuration:eval
 * @text Message Duration
 * @parent MessageText:json
 * @desc What is the frame duration of the event popup?
 * 60 frames = 1 second. You may use code.
 * @default 60
 *
 * @arg PopupExtra:struct
 * @text Popup Settings
 * @type struct<PopupExtra>
 * @desc These settings let you adjust how the popup animates.
 * @default {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-48","endOffsetX:eval":"+0","endOffsetY:eval":"-96","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MsgPopupEvent
 * @text Event Popup: Event
 * @desc Makes a centered event popup on target event sprite.
 * Requires VisuMZ_1_MessageCore! Cannot be used in battle!
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the event to play popup on.
 * Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg MessageText:json
 * @text Message Text
 * @type note
 * @desc Insert the text to be displayed.
 * Text codes can be used.
 * @default "Line1\nLine2"
 * 
 * @arg MsgDuration:eval
 * @text Message Duration
 * @parent MessageText:json
 * @desc What is the frame duration of the event popup?
 * 60 frames = 1 second. You may use code.
 * @default 60
 *
 * @arg PopupExtra:struct
 * @text Popup Settings
 * @type struct<PopupExtra>
 * @desc These settings let you adjust how the popup animates.
 * @default {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-48","endOffsetX:eval":"+0","endOffsetY:eval":"-96","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MsgPopupTargetTile
 * @text Event Popup: Target Tile
 * @desc Makes a centered event popup on target tile.
 * Requires VisuMZ_1_MessageCore! Cannot be used in battle!
 *
 * @arg TileX:eval
 * @text Map Tile X
 * @desc The x coordinate of the map tile.
 * You may use JavaScript code.
 * @default $gameMap.width() / 2
 *
 * @arg TileY:eval
 * @text Map Tile Y
 * @desc The y coordinate of the map tile.
 * You may use JavaScript code.
 * @default $gameMap.height() / 2
 *
 * @arg MessageText:json
 * @text Message Text
 * @type note
 * @desc Insert the text to be displayed.
 * Text codes can be used.
 * @default "\\I[87]"
 * 
 * @arg MsgDuration:eval
 * @text Message Duration
 * @parent MessageText:json
 * @desc What is the frame duration of the event popup?
 * 60 frames = 1 second. You may use code.
 * @default 60
 *
 * @arg PopupExtra:struct
 * @text Popup Settings
 * @type struct<PopupExtra>
 * @desc These settings let you adjust how the popup animates.
 * @default {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-24","endOffsetX:eval":"+0","endOffsetY:eval":"-24","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventTimer
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireEvent
 * @text Event Timer: Expire Event Assign
 * @desc Sets a Common Event to run upon expiration.
 * Bypasses the default code if one is set.
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc Select the Common Event to run upon the timer's expiration.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerSpeed
 * @text Event Timer: Change Speed
 * @desc Changes the timer frame decrease (or increase) speed.
 *
 * @arg Speed:eval
 * @text Speed
 * @desc How many 1/60ths of a second does each frame increase or
 * decrease by? Negative decreases. Positive increases.
 * @default -1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireClear
 * @text Event Timer: Expire Event Clear
 * @desc Clears any set to expire Common Event and instead,
 * run the default Game_Timer expiration code.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesGain
 * @text Event Timer: Frames Gain
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are gained or lost for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc How many 1/60ths of a second are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc How many seconds are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc How many minutes are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc How many hours are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesSet
 * @text Event Timer: Frames Set
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are set for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc Set frame count to this value.
 * Each frame is 1/60th of a second. JavaScript allowed.
 * @default 0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc Set seconds to this value.
 * JavaScript allowed.
 * @default 0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc Set minutes to this value.
 * Each minute is 60 seconds. JavaScript allowed.
 * @default 0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc Set hours to this value.
 * Each hour is 60 minutes. JavaScript allowed.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerPause
 * @text Event Timer: Pause
 * @desc Pauses the current event timer, but does not stop it.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerResume
 * @text Event Timer: Resume
 * @desc Resumes the current event timer from the paused state.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Follower
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetGlobalChase
 * @text Follower: Set Global Chase
 * @desc Disables all followers from chasing the player
 * or reenables it.
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets all followers to chase the player or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetTargetChase
 * @text Follower: Set Target Chase
 * @desc Disables target follower from chasing the player
 * or reenables it.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to disable/reenable chasing for.
 * @default 1
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets target follower to chase its target or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetControl
 * @text Follower: Set Control
 * @desc Sets the event commands to target a follower when "Player"
 * is selected as the target.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to control.
 * 0 is the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerReset
 * @text Follower: Reset
 * @desc Resets all follower controls. Event Commands that target
 * the "Player" return to normal and followers chase again.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_GlobalSwitch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchABCD
 * @text Global Switch: Get Self Switch A B C D
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to obtain data from.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchID
 * @text Global Switch: Get Self Switch ID
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the source switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_GlobalVar
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableGetSelfVariableID
 * @text Global Variable: Get Self Variable ID
 * @desc Gets the current stored value from a Self Variable and
 * stores it onto a Global Variable.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the source variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetVariableId:num
 * @text Target Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_MorphEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventTo
 * @text Morph Event: Change
 * @desc Runs the page of a different event remotely.
 *
 * @arg Step1
 * @text Step 1: To Be Changed
 *
 * @arg Step1MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step1EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2
 * @text Step 2: Change Into
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step2
 * @desc Name of the target event template to morph into.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg Step2MapId:eval
 * @text Map ID
 * @parent Step2
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2EventId:eval
 * @text Event ID
 * @parent Step2
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2Preserve:eval
 * @text Preserve Morph
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the morph effect preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventRemove
 * @text Morph Event: Remove
 * @desc Remove the morph status of an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the event to remove morph from. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg RemovePreserve:eval
 * @text Remove Preservation
 * @parent Step2
 * @type boolean
 * @on Remove
 * @off Contain
 * @desc Also remove the preservation effect?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_PlayerIcon
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconChange
 * @text Player Icon: Change
 * @desc Change the icon that appears on on the player.
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconDelete
 * @text Player Icon: Delete
 * @desc Delete the icon that appears on the player.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_PlayerMovement
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementChange
 * @text Player Movement: Control
 * @desc Enable or disable player control over the player character's movement.
 *
 * @arg Enable:eval
 * @text Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Let the player control where the player character moves?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementDiagonal
 * @text Player Movement: Diagonal
 * @desc Override settings to for player diagonal movement.
 *
 * @arg Setting:str
 * @text Setting
 * @type select
 * @option Default: Whatever the Map Uses
 * @value default
 * @option Forcefully Disable Diagonal Movement
 * @value disable
 * @option Forcefully Enable Diagonal Movement
 * @value enable
 * @desc How do you want to change diagonal movement?
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfData
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfDataResetAll
 * @text Self Data: Reset All
 * @desc Reset the Self Switch and Self Variable data of all events
 * within the specified map.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfSwitch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchABCD
 * @text Self Switch: A B C D
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to change.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchID
 * @text Self Switch: Switch ID
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfVar
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfVariableID
 * @text Self Variable: Variable ID
 * @desc Change the Self Variable of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Operation:str
 * @text Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Break2
 * @text -
 *
 * @arg Value:eval
 * @text Value
 * @desc Insert the value to modify the Self Variable by.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SpawnEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtXY
 * @text Spawn Event: Spawn At X, Y
 * @desc Spawns desired event at X, Y location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtRegion
 * @text Spawn Event: Spawn At Region
 * @desc Spawns desired event at a random region-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) to spawn this event at.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtTerrainTag
 * @text Spawn Event: Spawn At Terrain Tag
 * @desc Spawns desired event at a random terrain tag-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) to spawn this event at.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEventID
 * @text Spawn Event: Despawn Event ID
 * @desc Despawns the selected Event ID on the current map.
 *
 * @arg EventID:eval
 * @text Event ID
 * @type combo
 * @option $gameMap.firstSpawnedEventID()
 * @option $gameMap.lastSpawnedEventID()
 * @option 1001
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default $gameMap.lastSpawnedEventID()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnAtXY
 * @text Spawn Event: Despawn At X, Y
 * @desc Despawns any spawned event(s) at X, Y location on the current map.
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnRegions
 * @text Spawn Event: Despawn Region(s)
 * @desc Despawns the selected Region(s) on the current map.
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) and despawn everything inside it.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnTerrainTags
 * @text Spawn Event: Despawn Terrain Tag(s)
 * @desc Despawns the selected Terrain Tags(s) on the current map.
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) and despawn everything inside it.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEverything
 * @text Spawn Event: Despawn Everything
 * @desc Despawns all spawned events on the current map.
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
 * @param EventsMoveCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Label:struct
 * @text Event Label Settings
 * @type struct<Label>
 * @desc Choose settings regarding the Event Labels.
 * @default {"FontSize:num":"22","IconSize:num":"26","LineHeight:num":"30","OffsetX:num":"0","OffsetY:num":"12","OpacitySpeed:num":"16","VisibleRange:num":"30"}
 *
 * @param Icon:struct
 * @text Event Icon Settings
 * @type struct<Icon>
 * @desc Choose settings regarding the Event Icons.
 * @default {"BufferX:num":"0","BufferY:num":"12","BlendMode:num":"0"}
 *
 * @param Template:struct
 * @text Event Template Settings
 * @type struct<Template>
 * @desc Choose settings regarding Event Templates.
 * @default {"Settings":"","PreloadMaps:arraynum":"[\"1\"]","Prefabs":"","List:arraystruct":"[]","JavaScript":"","PreCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\""}
 *
 * @param EventBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Movement:struct
 * @text Movement Settings
 * @type struct<Movement>
 * @desc Change the rules regarding movement in the game.
 * @default {"Dir8":"","EnableDir8:eval":"true","StrictCollision:eval":"true","FavorHorz:eval":"true","SlowerSpeed:eval":"false","DiagonalSpeedMultiplier:num":"0.85","AutoMove":"","StopAutoMoveEvents:eval":"true","StopAutoMoveMessages:eval":"true","Bitmap":"","BitmapSmoothing:eval":"false","Dash":"","DashModifier:num":"+1.0","EnableDashTilt:eval":"true","TiltLeft:num":"-0.15","TiltRight:num":"0.15","TiltVert:num":"0.05","EventMove":"","RandomMoveWeight:num":"0.10","Shadows":"","ShowShadows:eval":"true","DefaultShadow:str":"Shadow1","TurnInPlace":"","EnableTurnInPlace:eval":"false","TurnInPlaceDelay:num":"10","Vehicle":"","BoatSpeed:num":"4.0","ShipSpeed:num":"5.0","AirshipSpeed:num":"6.0"}
 *
 * @param VS8:struct
 * @text VisuStella 8-Dir Settings
 * @type struct<VS8>
 * @desc Choose settings regarding VisuStella 8-Directional Sprites.
 * @default {"Balloons":"","AutoBalloon:eval":"true","BalloonOffsetX:num":"0","BalloonOffsetY:num":"12","Icons":"","AutoBuffer:eval":"true","CarryPose:eval":"true"}
 *
 * @param MovementBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Region:struct
 * @text Region Rulings
 * @type struct<Region>
 * @desc Choose settings regarding regions.
 * @default {"Allow":"","AllAllow:arraynum":"[]","WalkAllow:arraynum":"[]","PlayerAllow:arraynum":"[]","EventAllow:arraynum":"[]","VehicleAllow:arraynum":"[]","BoatAllow:arraynum":"[]","ShipAllow:arraynum":"[]","AirshipAllow:arraynum":"[]","Forbid":"","AllForbid:arraynum":"[]","WalkForbid:arraynum":"[]","PlayerForbid:arraynum":"[]","EventForbid:arraynum":"[]","VehicleForbid:arraynum":"[]","BoatForbid:arraynum":"[]","ShipForbid:arraynum":"[]","AirshipForbid:arraynum":"[]","Dock":"","VehicleDock:arraynum":"[]","BoatDock:arraynum":"[]","BoatDockRegionOnly:eval":"false","ShipDock:arraynum":"[]","ShipDockRegionOnly:eval":"false","AirshipDock:arraynum":"[]","AirshipDockRegionOnly:eval":"false"}
 *
 * @param RegionOk:struct
 * @text Common Event on OK Button
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon pressing the
 * OK button while standing on top of designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param RegionOkTarget:str
 * @text Target Tile
 * @parent RegionOk:struct
 * @type select
 * @option Tile in front of player.
 * @value front
 * @option Tile player is standing on top of.
 * @value standing
 * @desc Which tile should be checked for
 * Common Event on OK Button?
 * @default front
 *
 * @param RegionTouch:struct
 * @text Common Event on Touch
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon stepping the tiles
 * marked by the designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param TerrainTag:struct
 * @text Terrain Tag Settings
 * @type struct<TerrainTag>
 * @desc Choose settings regarding terrain tags.
 * @default {"TerrainTag":"","Rope:num":"1"}
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
 * Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Label:
 *
 * @param SpriteBased:eval
 * @text Sprite Based?
 * @type boolean
 * @on Sprite-Based
 * @off Legacy-Window
 * @desc Use sprite-based labels instead of legacy-window version.
 * Legacy-window version will not be supported in future.
 * @default true
 *
 * @param MobileEnabled:eval
 * @text Mobile-Enabled?
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @desc Enable event labels for mobile devices?
 * @default true
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc The font size used for the Event Labels.
 * @default 22
 *
 * @param IconSize:num
 * @text Icon Size
 * @type number
 * @min 1
 * @desc The size of the icons used in the Event Labels.
 * @default 26
 *
 * @param LineHeight:num
 * @text Line Height
 * @type number
 * @min 1
 * @desc The line height used for the Event Labels.
 * @default 26
 *
 * @param OffsetX:num
 * @text Offset X
 * @type number
 * @min 0
 * @desc Globally offset all labels horizontally by this amount.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @type number
 * @min 0
 * @desc Globally offset all labels vertically by this amount.
 * @default 12
 *
 * @param OpacitySpeed:num
 * @text Fade Speed
 * @type number
 * @min 1
 * @desc Fade speed for labels.
 * @default 16
 *
 * @param VisibleRange:num
 * @text Visible Range
 * @type number
 * @min 1
 * @desc Range the player has to be within the event to make its label visible.
 * @default 30
 *
 * @param RangeType:str
 * @text Range Type
 * @parent VisibleRange:num
 * @type select
 * @option square
 * @option circle
 * @option diamond
 * @desc What do you want the default label visible range type?
 * @default square
 *
 */
/* ----------------------------------------------------------------------------
 * Icon Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Icon:
 *
 * @param BufferX:num
 * @text Buffer X
 * @desc Default X position buffer for event icons.
 * @default 0
 *
 * @param BufferY:num
 * @text Buffer Y
 * @desc Default Y position buffer for event icons.
 * @default 12
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc Default blend mode for even icons.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Template Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Template:
 *
 * @param Settings
 *
 * @param PreloadMaps:arraynum
 * @text Preloaded Maps
 * @parent Settings
 * @type number[]
 * @desc A list of all the ID's of the maps that will be preloaded
 * to serve as template maps for this plugin.
 * @default ["1"]
 *
 * @param Templates
 *
 * @param List:arraystruct
 * @text Event Template List
 * @parent Templates
 * @type struct<EventTemplate>[]
 * @desc A list of all the Event Templates used by this project.
 * Used for notetags and Plugin Commands.
 * @default []
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Event Template
 * ----------------------------------------------------------------------------
 */
/*~struct~EventTemplate:
 *
 * @param Name:str
 * @text Name
 * @desc Name of the template. It'll be used as anchor points for
 * notetags and Plugin Commands.
 * @default Untitled
 *
 * @param MapID:num
 * @text Map ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the map the template event is stored on.
 * This will automatically add this ID to preloaded list.
 * @default 1
 *
 * @param EventID:num
 * @text Event ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the event the template event is based on.
 * @default 1
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Movement Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Movement:
 *
 * @param Dir8
 * @text 8 Directional Movement
 *
 * @param EnableDir8:eval
 * @text Enable
 * @parent Dir8
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Allow 8-directional movement by default? Players can move diagonally.
 * @default true
 *
 * @param StrictCollision:eval
 * @text Strict Collision
 * @parent Dir8
 * @type boolean
 * @on Strict
 * @off Flexible
 * @desc Enforce strict collission rules where the player must be able to pass both cardinal directions?
 * @default true
 *
 * @param FavorHorz:eval
 * @text Favor Horizontal
 * @parent StrictCollision:eval
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Favor horizontal if cannot pass diagonally but can pass both horizontally and vertically?
 * @default true
 *
 * @param SlowerSpeed:eval
 * @text Slower Diagonals?
 * @parent Dir8
 * @type boolean
 * @on Slower
 * @off Normal
 * @desc Enforce a slower movement speed when moving diagonally?
 * @default false
 *
 * @param DiagonalSpeedMultiplier:num
 * @text Speed Multiplier
 * @parent SlowerSpeed:eval
 * @desc What's the multiplier to adjust movement speed when moving diagonally?
 * @default 0.85
 *
 * @param AutoMove
 * @text Automatic Movement
 *
 * @param StopAutoMoveEvents:eval
 * @text Stop During Events
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while events are running.
 * @default true
 *
 * @param StopAutoMoveMessages:eval
 * @text Stop During Messages
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while a message is running.
 * @default true
 *
 * @param Bitmap
 *
 * @param BitmapSmoothing:eval
 * @text Smoothing
 * @parent Bitmap
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Do you want to smooth or pixelate the map sprites?
 * Pixelating them is better for zooming and tilting.
 * @default false
 *
 * @param Dash
 * @text Dash
 *
 * @param DashModifier:num
 * @text Dash Modifier
 * @parent Dash
 * @desc Alters the dash speed modifier.
 * @default +1.0
 *
 * @param DashOnLadder:eval
 * @text Dash On Ladder?
 * @parent Dash
 * @type boolean
 * @on Allow
 * @off Disallow
 * @desc Allow dashing while on a ladder or rope?
 * @default false
 *
 * @param EnableDashTilt:eval
 * @text Enable Dash Tilt?
 * @parent Dash
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Tilt any sprites that are currently dashing?
 * @default true
 *
 * @param TiltLeft:num
 * @text Tilt Left Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving left (upper left, left, lower left).
 * @default -0.15
 *
 * @param TiltRight:num
 * @text Tilt Right Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving right (upper right, right, lower right).
 * @default 0.15
 *
 * @param TiltVert:num
 * @text Tilt Vertical Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving vertical (up, down).
 * @default 0.05
 * 
 * @param EventMove
 * @text Event Movement
 *
 * @param RandomMoveWeight:num
 * @text Random Move Weight
 * @parent EventMove
 * @desc Use numbers between 0 and 1. Numbers closer to 1 stay
 * closer to their home position. 0 to disable it.
 * @default 0.10
 *
 * @param ShiftY:num
 * @text Shift Y
 * @parent EventMove
 * @desc How many pixels should non-tile characters be shifted by?
 * Negative: up. Positive: down.
 * @default -6
 *
 * @param PathFind
 * @text Path Finding
 *
 * @param PathfindMobileEnabled:eval
 * @text Mobile-Enabled?
 * @parent PathFind
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @desc Enable diagonal pathfinding for mobile devices?
 * @default false
 *
 * @param Shadows
 *
 * @param ShowShadows:eval
 * @text Show
 * @parent Shadows
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show shadows on all events and player-related sprites.
 * @default true
 *
 * @param DefaultShadow:str
 * @text Default Filename
 * @parent Shadows
 * @type file
 * @dir img/system/
 * @desc Default filename used for shadows found in img/system/ folder.
 * @default Shadow1
 *
 * @param TurnInPlace
 * @text Turn in Place
 *
 * @param EnableTurnInPlace:eval
 * @text Enable
 * @parent TurnInPlace
 * @type boolean
 * @on Turn in Place
 * @off Skip
 * @desc When not dashing, player will turn in place before moving.
 * This only applies with keyboard inputs.
 * @default false
 *
 * @param TurnInPlaceDelay:num
 * @text Delay in Frames
 * @parent TurnInPlace
 * @type number
 * @min 0
 * @desc The number of frames to wait before moving.
 * @default 10
 *
 * @param Vehicle
 * @text Vehicle Speeds
 *
 * @param BoatSpeed:num
 * @text Boat Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the boat vehicle.
 * @default 4.0
 *
 * @param ShipSpeed:num
 * @text Ship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the ship vehicle.
 * @default 5.0
 *
 * @param AirshipSpeed:num
 * @text Airship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the airship vehicle.
 * @default 6.0
 *
 */
/* ----------------------------------------------------------------------------
 * Region Rulings
 * ----------------------------------------------------------------------------
 */
/*~struct~Region:
 *
 * @param Allow
 * @text Allow Regions
 *
 * @param AllAllow:arraynum
 * @text All Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkAllow:arraynum
 * @text Walk Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerAllow:arraynum
 * @text Player Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventAllow:arraynum
 * @text Event Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleAllow:arraynum
 * @text Vehicle Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatAllow:arraynum
 * @text Boat Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipAllow:arraynum
 * @text Ship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipAllow:arraynum
 * @text Airship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Forbid
 * @text Forbid Regions
 *
 * @param AllForbid:arraynum
 * @text All Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkForbid:arraynum
 * @text Walk Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerForbid:arraynum
 * @text Player Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventForbid:arraynum
 * @text Event Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleForbid:arraynum
 * @text Vehicle Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where vehicles cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatForbid:arraynum
 * @text Boat Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipForbid:arraynum
 * @text Ship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipForbid:arraynum
 * @text Airship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Dock
 * @text Dock Regions
 *
 * @param VehicleDock:arraynum
 * @text Vehicle Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDock:arraynum
 * @text Boat Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent BoatDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Boats can only dock at designated regions.
 * @default false
 *
 * @param ShipDock:arraynum
 * @text Ship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent ShipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Ships can only dock at designated regions.
 * @default false
 *
 * @param AirshipDock:arraynum
 * @text Airship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent AirshipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Airships can only dock at designated regions.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Region Common Events
 * ----------------------------------------------------------------------------
 */
/*~struct~RegionCommonEvent:
 *
 * @param Region1:num
 * @text Region 1
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region2:num
 * @text Region 2
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region3:num
 * @text Region 3
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region4:num
 * @text Region 4
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region5:num
 * @text Region 5
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region6:num
 * @text Region 6
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region7:num
 * @text Region 7
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region8:num
 * @text Region 8
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region9:num
 * @text Region 9
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region10:num
 * @text Region 10
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region11:num
 * @text Region 11
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region12:num
 * @text Region 12
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region13:num
 * @text Region 13
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region14:num
 * @text Region 14
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region15:num
 * @text Region 15
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region16:num
 * @text Region 16
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region17:num
 * @text Region 17
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region18:num
 * @text Region 18
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region19:num
 * @text Region 19
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region20:num
 * @text Region 20
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region21:num
 * @text Region 21
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region22:num
 * @text Region 22
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region23:num
 * @text Region 23
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region24:num
 * @text Region 24
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region25:num
 * @text Region 25
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region26:num
 * @text Region 26
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region27:num
 * @text Region 27
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region28:num
 * @text Region 28
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region29:num
 * @text Region 29
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region30:num
 * @text Region 30
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region31:num
 * @text Region 31
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region32:num
 * @text Region 32
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region33:num
 * @text Region 33
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region34:num
 * @text Region 34
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region35:num
 * @text Region 35
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region36:num
 * @text Region 36
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region37:num
 * @text Region 37
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region38:num
 * @text Region 38
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region39:num
 * @text Region 39
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region40:num
 * @text Region 40
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region41:num
 * @text Region 41
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region42:num
 * @text Region 42
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region43:num
 * @text Region 43
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region44:num
 * @text Region 44
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region45:num
 * @text Region 45
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region46:num
 * @text Region 46
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region47:num
 * @text Region 47
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region48:num
 * @text Region 48
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region49:num
 * @text Region 49
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region50:num
 * @text Region 50
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region51:num
 * @text Region 51
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region52:num
 * @text Region 52
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region53:num
 * @text Region 53
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region54:num
 * @text Region 54
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region55:num
 * @text Region 55
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region56:num
 * @text Region 56
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region57:num
 * @text Region 57
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region58:num
 * @text Region 58
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region59:num
 * @text Region 59
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region60:num
 * @text Region 60
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region61:num
 * @text Region 61
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region62:num
 * @text Region 62
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region63:num
 * @text Region 63
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region64:num
 * @text Region 64
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region65:num
 * @text Region 65
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region66:num
 * @text Region 66
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region67:num
 * @text Region 67
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region68:num
 * @text Region 68
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region69:num
 * @text Region 69
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region70:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region71:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region72:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region73:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region74:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region75:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region76:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region77:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region78:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region79:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 90
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 91
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 92
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 93
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 94
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 95
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 96
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 97
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 98
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 99
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region100:num
 * @text Region 100
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region101:num
 * @text Region 101
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region102:num
 * @text Region 102
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region103:num
 * @text Region 103
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region104:num
 * @text Region 104
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region105:num
 * @text Region 105
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region106:num
 * @text Region 106
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region107:num
 * @text Region 107
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region108:num
 * @text Region 108
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region109:num
 * @text Region 109
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region110:num
 * @text Region 110
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region111:num
 * @text Region 111
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region112:num
 * @text Region 112
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region113:num
 * @text Region 113
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region114:num
 * @text Region 114
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region115:num
 * @text Region 115
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region116:num
 * @text Region 116
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region117:num
 * @text Region 117
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region118:num
 * @text Region 118
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region119:num
 * @text Region 119
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region120:num
 * @text Region 120
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region121:num
 * @text Region 121
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region122:num
 * @text Region 122
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region123:num
 * @text Region 123
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region124:num
 * @text Region 124
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region125:num
 * @text Region 125
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region126:num
 * @text Region 126
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region127:num
 * @text Region 127
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region128:num
 * @text Region 128
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region129:num
 * @text Region 129
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region130:num
 * @text Region 130
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region131:num
 * @text Region 131
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region132:num
 * @text Region 132
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region133:num
 * @text Region 133
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region134:num
 * @text Region 134
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region135:num
 * @text Region 135
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region136:num
 * @text Region 136
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region137:num
 * @text Region 137
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region138:num
 * @text Region 138
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region139:num
 * @text Region 139
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region140:num
 * @text Region 140
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region141:num
 * @text Region 141
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region142:num
 * @text Region 142
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region143:num
 * @text Region 143
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region144:num
 * @text Region 144
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region145:num
 * @text Region 145
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region146:num
 * @text Region 146
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region147:num
 * @text Region 147
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region148:num
 * @text Region 148
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region149:num
 * @text Region 149
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region150:num
 * @text Region 150
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region151:num
 * @text Region 151
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region152:num
 * @text Region 152
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region153:num
 * @text Region 153
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region154:num
 * @text Region 154
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region155:num
 * @text Region 155
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region156:num
 * @text Region 156
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region157:num
 * @text Region 157
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region158:num
 * @text Region 158
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region159:num
 * @text Region 159
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region160:num
 * @text Region 160
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region161:num
 * @text Region 161
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region162:num
 * @text Region 162
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region163:num
 * @text Region 163
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region164:num
 * @text Region 164
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region165:num
 * @text Region 165
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region166:num
 * @text Region 166
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region167:num
 * @text Region 167
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region168:num
 * @text Region 168
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region169:num
 * @text Region 169
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region170:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region171:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region172:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region173:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region174:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region175:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region176:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region177:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region178:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region179:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 190
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 191
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 192
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 193
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 194
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 195
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 196
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 197
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 198
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 199
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region200:num
 * @text Region 200
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region201:num
 * @text Region 201
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region202:num
 * @text Region 202
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region203:num
 * @text Region 203
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region204:num
 * @text Region 204
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region205:num
 * @text Region 205
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region206:num
 * @text Region 206
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region207:num
 * @text Region 207
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region208:num
 * @text Region 208
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region209:num
 * @text Region 209
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region210:num
 * @text Region 210
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region211:num
 * @text Region 211
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region212:num
 * @text Region 212
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region213:num
 * @text Region 213
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region214:num
 * @text Region 214
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region215:num
 * @text Region 215
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region216:num
 * @text Region 216
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region217:num
 * @text Region 217
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region218:num
 * @text Region 218
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region219:num
 * @text Region 219
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region220:num
 * @text Region 220
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region221:num
 * @text Region 221
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region222:num
 * @text Region 222
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region223:num
 * @text Region 223
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region224:num
 * @text Region 224
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region225:num
 * @text Region 225
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region226:num
 * @text Region 226
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region227:num
 * @text Region 227
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region228:num
 * @text Region 228
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region229:num
 * @text Region 229
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region230:num
 * @text Region 230
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region231:num
 * @text Region 231
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region232:num
 * @text Region 232
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region233:num
 * @text Region 233
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region234:num
 * @text Region 234
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region235:num
 * @text Region 235
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region236:num
 * @text Region 236
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region237:num
 * @text Region 237
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region238:num
 * @text Region 238
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region239:num
 * @text Region 239
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region240:num
 * @text Region 240
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region241:num
 * @text Region 241
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region242:num
 * @text Region 242
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region243:num
 * @text Region 243
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region244:num
 * @text Region 244
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region245:num
 * @text Region 245
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region246:num
 * @text Region 246
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region247:num
 * @text Region 247
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region248:num
 * @text Region 248
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region249:num
 * @text Region 249
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region250:num
 * @text Region 250
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region251:num
 * @text Region 251
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region252:num
 * @text Region 252
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region253:num
 * @text Region 253
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region254:num
 * @text Region 254
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region255:num
 * @text Region 255
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Terrain Tag Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TerrainTag:
 *
 * @param TerrainTag
 * @text Terrain Tag ID's
 *
 * @param Rope:num
 * @text Rope
 * @parent TerrainTag
 * @type number
 * @min 0
 * @max 7
 * @desc Which terrain tag number to use for ropes?
 * @default 1
 *
 */
/* ----------------------------------------------------------------------------
 * VisuStella 8-Dir Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~VS8:
 *
 * @param Balloons
 * @text Balloon Icon Settings
 *
 * @param AutoBalloon:eval
 * @text Auto-Balloon Poses
 * @parent Balloons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically pose VS8 sprites when using balloon icons.
 * @default true
 *
 * @param BalloonOffsetX:num
 * @text Balloon Offset X
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by x pixels.
 * @default 0
 *
 * @param BalloonOffsetY:num
 * @text Balloon Offset Y
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by y pixels.
 * @default 10
 *
 * @param Icons
 * 
 * @param AutoBuffer:eval
 * @text Auto Buffer
 * @parent Icons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically buffer the X and Y coordinates of
 * VS8 sprites?
 * @default true
 * 
 * @param CarryPose:eval
 * @text Use Carry Pose
 * @parent Icons
 * @type boolean
 * @on Carry Pose
 * @off Normal
 * @desc Use the carry pose when moving with an icon overhead.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Popup Extra Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PopupExtra:
 *
 * @param Fade
 * @text Fade Settings
 *
 * @param fadeInDuration:eval
 * @text Fade In Duration
 * @parent Fade
 * @desc How many frames does it take to fade in?
 * 60 frames = 1 second.
 * @default 8
 *
 * @param fadeOutDuration:eval
 * @text Fade Out Duration
 * @parent Fade
 * @desc How many frames does it take to fade out?
 * 60 frames = 1 second.
 * @default 8
 *
 * @param Offset
 * @text Offset Settings
 *
 * @param startOffsetX:eval
 * @text Starting Offset X
 * @parent Offset
 * @desc Offsets the starting x position. You may use code.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param startOffsetY:eval
 * @text Starting Offset Y
 * @parent Offset
 * @desc Offsets the starting y position. You may use code.
 * Negative: up. Positive: down.
 * @default -48
 *
 * @param endOffsetX:eval
 * @text Ending Offset X
 * @parent Offset
 * @desc Offsets the ending x position. You may use code.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param endOffsetY:eval
 * @text Ending Offset Y
 * @parent Offset
 * @desc Offsets the ending y position. You may use code.
 * Negative: up. Positive: down.
 * @default -96
 *
 * @param Scale
 * @text Scaling Settings
 *
 * @param startScaleX:eval
 * @text Starting Scale X
 * @parent Scale
 * @desc What is the starting scale x? You may use code.
 * 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 * @default 0.8
 *
 * @param startScaleY:eval
 * @text Starting Scale Y
 * @parent Scale
 * @desc What is the starting scale y? You may use code.
 * 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 * @default 0.8
 *
 * @param endScaleX:eval
 * @text Ending Scale X
 * @parent Scale
 * @desc What is the ending scale x? You may use code.
 * 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 * @default 0.8
 *
 * @param endScaleY:eval
 * @text Ending Scale Y
 * @parent Scale
 * @desc What is the ending scale y? You may use code.
 * 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 * @default 0.8
 *
 * @param Angle
 * @text Angle Settings
 *
 * @param startAngle:eval
 * @text Starting Offset Angle
 * @parent Angle
 * @desc What is the starting angle offset?
 * Use numbers between 0 and 360. You may use code.
 * @default +0
 *
 * @param endAngle:eval
 * @text Ending Offset Angle
 * @parent Angle
 * @desc What is the ending angle offset?
 * Use numbers between 0 and 360. You may use code.
 * @default +0
 * 
 * @param Misc
 * @text Misc Settings
 * 
 * @param Arc:eval
 * @text Arc Peak
 * @parent Misc
 * @desc This is the height of the popup's trajectory arc
 * in pixels. Positive: up. Negative: down. Code allowed.
 * @default +0
 *
 */
//=============================================================================

const _0x19393c=_0x2d8a;(function(_0x1d1e92,_0x197793){const _0x3d5bdf=_0x2d8a,_0x3aa4ff=_0x1d1e92();while(!![]){try{const _0x2bdc80=-parseInt(_0x3d5bdf(0x3ae))/0x1+parseInt(_0x3d5bdf(0x1e9))/0x2+parseInt(_0x3d5bdf(0x3f1))/0x3*(parseInt(_0x3d5bdf(0x2bc))/0x4)+-parseInt(_0x3d5bdf(0x186))/0x5+-parseInt(_0x3d5bdf(0x409))/0x6*(-parseInt(_0x3d5bdf(0x185))/0x7)+parseInt(_0x3d5bdf(0x378))/0x8*(-parseInt(_0x3d5bdf(0x5e5))/0x9)+parseInt(_0x3d5bdf(0x24f))/0xa;if(_0x2bdc80===_0x197793)break;else _0x3aa4ff['push'](_0x3aa4ff['shift']());}catch(_0x17f98a){_0x3aa4ff['push'](_0x3aa4ff['shift']());}}}(_0x5ef3,0xa45f0));var label=_0x19393c(0x532),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x19393c(0x166)](function(_0x2c4839){const _0x358f33=_0x19393c;return _0x2c4839['status']&&_0x2c4839['description'][_0x358f33(0x239)]('['+label+']');})[0x0];function _0x2d8a(_0x1cc3a0,_0x30a6c4){const _0x5ef35c=_0x5ef3();return _0x2d8a=function(_0x2d8ae8,_0x1f2737){_0x2d8ae8=_0x2d8ae8-0x165;let _0x3d434c=_0x5ef35c[_0x2d8ae8];return _0x3d434c;},_0x2d8a(_0x1cc3a0,_0x30a6c4);}VisuMZ[label][_0x19393c(0x329)]=VisuMZ[label][_0x19393c(0x329)]||{},VisuMZ[_0x19393c(0x404)]=function(_0x2550c1,_0xbc9f4a){const _0x28eea2=_0x19393c;for(const _0xd31522 in _0xbc9f4a){if(_0xd31522['match'](/(.*):(.*)/i)){const _0x2c4465=String(RegExp['$1']),_0x388404=String(RegExp['$2'])[_0x28eea2(0x62f)]()[_0x28eea2(0x1d6)]();let _0x447c47,_0x935a91,_0x13afcb;switch(_0x388404){case _0x28eea2(0x588):_0x447c47=_0xbc9f4a[_0xd31522]!==''?Number(_0xbc9f4a[_0xd31522]):0x0;break;case _0x28eea2(0x1af):_0x935a91=_0xbc9f4a[_0xd31522]!==''?JSON['parse'](_0xbc9f4a[_0xd31522]):[],_0x447c47=_0x935a91[_0x28eea2(0x3a7)](_0x4aefcb=>Number(_0x4aefcb));break;case _0x28eea2(0x1b6):_0x447c47=_0xbc9f4a[_0xd31522]!==''?eval(_0xbc9f4a[_0xd31522]):null;break;case _0x28eea2(0x53e):_0x935a91=_0xbc9f4a[_0xd31522]!==''?JSON[_0x28eea2(0x29e)](_0xbc9f4a[_0xd31522]):[],_0x447c47=_0x935a91['map'](_0x219484=>eval(_0x219484));break;case _0x28eea2(0x500):_0x447c47=_0xbc9f4a[_0xd31522]!==''?JSON[_0x28eea2(0x29e)](_0xbc9f4a[_0xd31522]):'';break;case _0x28eea2(0x35d):_0x935a91=_0xbc9f4a[_0xd31522]!==''?JSON['parse'](_0xbc9f4a[_0xd31522]):[],_0x447c47=_0x935a91[_0x28eea2(0x3a7)](_0x11982e=>JSON[_0x28eea2(0x29e)](_0x11982e));break;case _0x28eea2(0x397):_0x447c47=_0xbc9f4a[_0xd31522]!==''?new Function(JSON[_0x28eea2(0x29e)](_0xbc9f4a[_0xd31522])):new Function('return\x200');break;case _0x28eea2(0x5a8):_0x935a91=_0xbc9f4a[_0xd31522]!==''?JSON['parse'](_0xbc9f4a[_0xd31522]):[],_0x447c47=_0x935a91[_0x28eea2(0x3a7)](_0x57b30c=>new Function(JSON[_0x28eea2(0x29e)](_0x57b30c)));break;case'STR':_0x447c47=_0xbc9f4a[_0xd31522]!==''?String(_0xbc9f4a[_0xd31522]):'';break;case _0x28eea2(0x5e0):_0x935a91=_0xbc9f4a[_0xd31522]!==''?JSON[_0x28eea2(0x29e)](_0xbc9f4a[_0xd31522]):[],_0x447c47=_0x935a91[_0x28eea2(0x3a7)](_0x352f97=>String(_0x352f97));break;case'STRUCT':_0x13afcb=_0xbc9f4a[_0xd31522]!==''?JSON[_0x28eea2(0x29e)](_0xbc9f4a[_0xd31522]):{},_0x2550c1[_0x2c4465]={},VisuMZ['ConvertParams'](_0x2550c1[_0x2c4465],_0x13afcb);continue;case _0x28eea2(0x5a0):_0x935a91=_0xbc9f4a[_0xd31522]!==''?JSON['parse'](_0xbc9f4a[_0xd31522]):[],_0x447c47=_0x935a91['map'](_0x38bcd9=>VisuMZ['ConvertParams']({},JSON[_0x28eea2(0x29e)](_0x38bcd9)));break;default:continue;}_0x2550c1[_0x2c4465]=_0x447c47;}}return _0x2550c1;},(_0x4cde14=>{const _0x5b0a9c=_0x19393c,_0x2d1ee3=_0x4cde14[_0x5b0a9c(0x4ec)];for(const _0x2478f0 of dependencies){if(!Imported[_0x2478f0]){alert(_0x5b0a9c(0x635)['format'](_0x2d1ee3,_0x2478f0)),SceneManager[_0x5b0a9c(0x61f)]();break;}}const _0x5a2778=_0x4cde14[_0x5b0a9c(0x206)];if(_0x5a2778['match'](/\[Version[ ](.*?)\]/i)){const _0x104893=Number(RegExp['$1']);_0x104893!==VisuMZ[label][_0x5b0a9c(0x451)]&&(alert(_0x5b0a9c(0x17b)[_0x5b0a9c(0x2ea)](_0x2d1ee3,_0x104893)),SceneManager[_0x5b0a9c(0x61f)]());}if(_0x5a2778['match'](/\[Tier[ ](\d+)\]/i)){const _0x32f445=Number(RegExp['$1']);_0x32f445<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x2d1ee3,_0x32f445,tier)),SceneManager[_0x5b0a9c(0x61f)]()):tier=Math[_0x5b0a9c(0x31e)](_0x32f445,tier);}VisuMZ[_0x5b0a9c(0x404)](VisuMZ[label]['Settings'],_0x4cde14[_0x5b0a9c(0x313)]);})(pluginData),VisuMZ[_0x19393c(0x4bc)]=function(_0x2a6f36,_0x13827c,_0x3c108c){switch(_0x3c108c){case'=':return _0x13827c;break;case'+':return _0x2a6f36+_0x13827c;break;case'-':return _0x2a6f36-_0x13827c;break;case'*':return _0x2a6f36*_0x13827c;break;case'/':return _0x2a6f36/_0x13827c;break;case'%':return _0x2a6f36%_0x13827c;break;}return _0x2a6f36;},PluginManager[_0x19393c(0x4db)](pluginData[_0x19393c(0x4ec)],_0x19393c(0x225),_0xf8691d=>{const _0x36d54f=_0x19393c;VisuMZ['ConvertParams'](_0xf8691d,_0xf8691d);switch(_0xf8691d[_0x36d54f(0x22d)]){case _0x36d54f(0x285):$gameSystem[_0x36d54f(0x3fc)](!![]);break;case _0x36d54f(0x3d5):$gameSystem[_0x36d54f(0x3fc)](![]);break;case _0x36d54f(0x5d0):$gameSystem[_0x36d54f(0x3fc)](!$gameSystem[_0x36d54f(0x218)]());break;}}),PluginManager[_0x19393c(0x4db)](pluginData['name'],'CallEvent',_0x1b0dfb=>{const _0x3e8517=_0x19393c;VisuMZ[_0x3e8517(0x404)](_0x1b0dfb,_0x1b0dfb);const _0x22db92=$gameTemp[_0x3e8517(0x5e8)](),_0x385e42={'mapId':_0x1b0dfb[_0x3e8517(0x1a2)],'eventId':_0x1b0dfb[_0x3e8517(0x23b)]||_0x22db92[_0x3e8517(0x2ed)](),'pageId':_0x1b0dfb[_0x3e8517(0x4a2)]};if(_0x385e42[_0x3e8517(0x473)]<=0x0)_0x385e42[_0x3e8517(0x473)]=$gameMap?$gameMap['mapId']():0x1;$gameTemp[_0x3e8517(0x5e8)]()['pluginCommandCallEvent'](_0x385e42);}),PluginManager[_0x19393c(0x4db)](pluginData['name'],_0x19393c(0x641),_0x2145ee=>{const _0x3e1d82=_0x19393c;VisuMZ['ConvertParams'](_0x2145ee,_0x2145ee);switch(_0x2145ee[_0x3e1d82(0x22d)]){case'Enable':$gameSystem[_0x3e1d82(0x26a)](!![]);break;case _0x3e1d82(0x2f9):$gameSystem[_0x3e1d82(0x26a)](![]);break;case _0x3e1d82(0x5d0):$gameSystem[_0x3e1d82(0x26a)](!$gameSystem[_0x3e1d82(0x468)]());break;}}),PluginManager[_0x19393c(0x4db)](pluginData[_0x19393c(0x4ec)],_0x19393c(0x175),_0x135814=>{const _0x18292b=_0x19393c;VisuMZ[_0x18292b(0x404)](_0x135814,_0x135814);const _0x34b350=$gameTemp[_0x18292b(0x5e8)]();_0x135814['MapId']=_0x135814['MapId']||$gameMap[_0x18292b(0x473)](),$gameSystem[_0x18292b(0x250)](_0x135814[_0x18292b(0x1a2)],_0x135814[_0x18292b(0x23b)]||_0x34b350['eventId'](),_0x135814['IconIndex'],_0x135814[_0x18292b(0x272)],_0x135814[_0x18292b(0x1f4)],_0x135814['IconBlendMode'],![]);}),PluginManager[_0x19393c(0x4db)](pluginData['name'],_0x19393c(0x18f),_0x2c7cda=>{const _0x5dfdf5=_0x19393c;VisuMZ[_0x5dfdf5(0x404)](_0x2c7cda,_0x2c7cda);const _0xc06e9d=$gameTemp[_0x5dfdf5(0x5e8)]();_0x2c7cda[_0x5dfdf5(0x1a2)]=_0x2c7cda[_0x5dfdf5(0x1a2)]||$gameMap[_0x5dfdf5(0x473)](),$gameSystem[_0x5dfdf5(0x250)](_0x2c7cda[_0x5dfdf5(0x1a2)],_0x2c7cda[_0x5dfdf5(0x23b)]||_0xc06e9d['eventId'](),_0x2c7cda['IconIndex'],_0x2c7cda[_0x5dfdf5(0x272)],_0x2c7cda['IconBufferY'],_0x2c7cda[_0x5dfdf5(0x4d6)],!![]);}),PluginManager['registerCommand'](pluginData[_0x19393c(0x4ec)],_0x19393c(0x1cd),_0x2700a5=>{const _0xcbb732=_0x19393c;VisuMZ[_0xcbb732(0x404)](_0x2700a5,_0x2700a5);const _0xeac0fe=$gameTemp[_0xcbb732(0x5e8)]();_0x2700a5[_0xcbb732(0x1a2)]=_0x2700a5['MapId']||$gameMap[_0xcbb732(0x473)](),$gameSystem[_0xcbb732(0x33b)](_0x2700a5[_0xcbb732(0x1a2)],_0x2700a5[_0xcbb732(0x23b)]||_0xeac0fe[_0xcbb732(0x2ed)]());}),PluginManager[_0x19393c(0x4db)](pluginData[_0x19393c(0x4ec)],_0x19393c(0x29c),_0x1a1519=>{const _0x58feb2=_0x19393c;VisuMZ[_0x58feb2(0x404)](_0x1a1519,_0x1a1519);const _0x4fdf2a=$gameTemp[_0x58feb2(0x5e8)]();_0x1a1519['MapId']=_0x1a1519['MapId']||$gameMap[_0x58feb2(0x473)](),$gameSystem['restoreIconsOnEventsDataKey'](_0x1a1519[_0x58feb2(0x1a2)],_0x1a1519['EventId']||_0x4fdf2a[_0x58feb2(0x2ed)]());}),PluginManager[_0x19393c(0x4db)](pluginData[_0x19393c(0x4ec)],_0x19393c(0x1c6),_0x17b6e4=>{const _0x4e24e3=_0x19393c;if($gameMap)for(const _0x1c189f of $gameMap[_0x4e24e3(0x3c6)]()){_0x1c189f[_0x4e24e3(0x464)](),_0x1c189f[_0x4e24e3(0x273)]();}if(SceneManager[_0x4e24e3(0x462)]()){const _0x5ada6f=SceneManager[_0x4e24e3(0x4ee)]['_spriteset'];if(_0x5ada6f)_0x5ada6f[_0x4e24e3(0x62b)]();}}),PluginManager[_0x19393c(0x4db)](pluginData[_0x19393c(0x4ec)],_0x19393c(0x639),_0x412b17=>{const _0x5575eb=_0x19393c;VisuMZ['ConvertParams'](_0x412b17,_0x412b17);switch(_0x412b17['Visibility']){case _0x5575eb(0x2c4):$gameSystem['setEventLabelsVisible'](!![]);break;case _0x5575eb(0x28c):$gameSystem[_0x5575eb(0x288)](![]);break;case _0x5575eb(0x5d0):$gameSystem[_0x5575eb(0x288)](!$gameSystem[_0x5575eb(0x50e)]());break;}}),PluginManager[_0x19393c(0x4db)](pluginData[_0x19393c(0x4ec)],'EventLocationSave',_0x13c9dc=>{const _0x5871e5=_0x19393c;VisuMZ['ConvertParams'](_0x13c9dc,_0x13c9dc);const _0x1b6a09=$gameTemp[_0x5871e5(0x5e8)]();if(!$gameMap)return;const _0x243455=$gameMap[_0x5871e5(0x5ab)](_0x13c9dc[_0x5871e5(0x23b)]||_0x1b6a09[_0x5871e5(0x2ed)]());if(_0x243455)_0x243455[_0x5871e5(0x5a9)]();}),PluginManager[_0x19393c(0x4db)](pluginData[_0x19393c(0x4ec)],_0x19393c(0x4ac),_0x4a317a=>{const _0xe5dbce=_0x19393c;VisuMZ[_0xe5dbce(0x404)](_0x4a317a,_0x4a317a);const _0x3e5fdd=$gameTemp[_0xe5dbce(0x5e8)](),_0x4dd5f6=_0x4a317a[_0xe5dbce(0x1a2)]||$gameMap[_0xe5dbce(0x473)](),_0x4118d2=_0x4a317a['EventId']||_0x3e5fdd['eventId'](),_0x3bb645=_0x4a317a[_0xe5dbce(0x545)]||0x0,_0x5c8b9b=_0x4a317a['PosY']||0x0,_0x2dea61=_0x4a317a[_0xe5dbce(0x5c1)]||0x2,_0x24fddb=((_0x4a317a[_0xe5dbce(0x4a2)]||0x1)-0x1)[_0xe5dbce(0x176)](0x0,0x13),_0xf50484=_0x4a317a['MoveRouteIndex']||0x0;$gameSystem['createSaveEventLocationData'](_0x4dd5f6,_0x4118d2,_0x3bb645,_0x5c8b9b,_0x2dea61,_0x24fddb,_0xf50484);}),PluginManager[_0x19393c(0x4db)](pluginData[_0x19393c(0x4ec)],_0x19393c(0x537),_0x46dac8=>{const _0x324162=_0x19393c;VisuMZ[_0x324162(0x404)](_0x46dac8,_0x46dac8);const _0x5d88b1=$gameTemp[_0x324162(0x5e8)](),_0x4d3fb1=_0x46dac8[_0x324162(0x1a2)]||$gameMap['mapId'](),_0x3f80db=_0x46dac8[_0x324162(0x23b)]||_0x5d88b1[_0x324162(0x2ed)]();$gameSystem[_0x324162(0x25c)](_0x4d3fb1,_0x3f80db);}),VisuMZ[_0x19393c(0x532)][_0x19393c(0x620)]=function(_0x3eac3c,_0x1df9e1){const _0x2cf383=_0x19393c;_0x1df9e1=_0x1df9e1||{},_0x3eac3c[_0x2cf383(0x16a)]={'fadeIn':_0x1df9e1[_0x2cf383(0x2a7)]||0x0,'fadeOut':_0x1df9e1[_0x2cf383(0x364)]||0x0},_0x3eac3c[_0x2cf383(0x446)]={'x':_0x1df9e1[_0x2cf383(0x2f6)]||0x0,'y':_0x1df9e1[_0x2cf383(0x40d)]||0x0},_0x3eac3c['endOffset']={'x':_0x1df9e1[_0x2cf383(0x42c)]||0x0,'y':_0x1df9e1[_0x2cf383(0x290)]||0x0},_0x3eac3c[_0x2cf383(0x4a7)]={'x':_0x1df9e1[_0x2cf383(0x5ed)]||0x0,'y':_0x1df9e1[_0x2cf383(0x43a)]||0x0},_0x3eac3c[_0x2cf383(0x4cc)]={'x':_0x1df9e1[_0x2cf383(0x583)]||0x0,'y':_0x1df9e1[_0x2cf383(0x345)]||0x0},_0x3eac3c[_0x2cf383(0x340)]={'start':_0x1df9e1[_0x2cf383(0x41a)]||0x0,'end':_0x1df9e1[_0x2cf383(0x293)]||0x0},_0x3eac3c['misc']={'arc':_0x1df9e1['Arc']||0x0};},PluginManager[_0x19393c(0x4db)](pluginData[_0x19393c(0x4ec)],'MsgPopupPlayer',_0xd7d342=>{const _0x5e20d9=_0x19393c;if(!SceneManager['isInstanceOfSceneMap']())return;if(!Imported[_0x5e20d9(0x1a1)]){$gameTemp[_0x5e20d9(0x56e)]()&&alert(_0x5e20d9(0x3f2)+_0x5e20d9(0x429));return;}VisuMZ[_0x5e20d9(0x404)](_0xd7d342,_0xd7d342);const _0x14ba7e={'text':_0xd7d342[_0x5e20d9(0x571)]||'','duration':Math[_0x5e20d9(0x31e)](_0xd7d342[_0x5e20d9(0x4b5)]||0x3c,0xc)},_0x21a9a9=_0xd7d342['PopupExtra']||{};VisuMZ[_0x5e20d9(0x532)]['ApplyPopupExtraSettings'](_0x14ba7e,_0x21a9a9);const _0x207ea1=SceneManager[_0x5e20d9(0x4ee)][_0x5e20d9(0x46a)];if(_0x207ea1){const _0x430cca=$gamePlayer;_0x207ea1['createEventsMoveCoreMessagePopup'](_0x430cca,_0x14ba7e);}}),PluginManager['registerCommand'](pluginData['name'],_0x19393c(0x453),_0x1ef7b2=>{const _0x514107=_0x19393c;if(!SceneManager[_0x514107(0x440)]())return;if(!Imported[_0x514107(0x1a1)]){$gameTemp[_0x514107(0x56e)]()&&alert(_0x514107(0x3f2)+'\x22Event\x20Popup:\x20Player\x22\x20plugin\x20command!');return;}VisuMZ[_0x514107(0x404)](_0x1ef7b2,_0x1ef7b2);const _0x33d632=_0x1ef7b2['FollowerIndex']||0x0,_0x1495f6={'text':_0x1ef7b2[_0x514107(0x571)]||'','duration':Math[_0x514107(0x31e)](_0x1ef7b2[_0x514107(0x4b5)]||0x3c,0xc)},_0x186e5d=_0x1ef7b2['PopupExtra']||{};VisuMZ['EventsMoveCore'][_0x514107(0x620)](_0x1495f6,_0x186e5d);const _0x103041=SceneManager['_scene']['_spriteset'];if(_0x103041){const _0x4a9712=$gamePlayer['followers']()['follower'](_0x33d632);_0x103041[_0x514107(0x2f2)](_0x4a9712,_0x1495f6);}}),PluginManager['registerCommand'](pluginData[_0x19393c(0x4ec)],_0x19393c(0x4e8),_0x7b76d3=>{const _0x2c4ccd=_0x19393c;if(!SceneManager[_0x2c4ccd(0x440)]())return;if(!Imported[_0x2c4ccd(0x1a1)]){$gameTemp[_0x2c4ccd(0x56e)]()&&alert('VisuMZ_1_MessageCore\x20is\x20required\x20to\x20run\x20'+'\x22Event\x20Popup:\x20Player\x22\x20plugin\x20command!');return;}VisuMZ[_0x2c4ccd(0x404)](_0x7b76d3,_0x7b76d3);const _0xd27862=$gameTemp[_0x2c4ccd(0x5e8)](),_0x5b9b6b=_0x7b76d3[_0x2c4ccd(0x23b)]||(_0xd27862?_0xd27862['eventId']():0x1),_0x2ea2d5={'text':_0x7b76d3[_0x2c4ccd(0x571)]||'','duration':Math[_0x2c4ccd(0x31e)](_0x7b76d3[_0x2c4ccd(0x4b5)]||0x3c,0xc)},_0x5b6bc6=_0x7b76d3['PopupExtra']||{};VisuMZ['EventsMoveCore']['ApplyPopupExtraSettings'](_0x2ea2d5,_0x5b6bc6);const _0x42df7b=SceneManager[_0x2c4ccd(0x4ee)]['_spriteset'];if(_0x42df7b){const _0x3053c4=$gameMap[_0x2c4ccd(0x5ab)](_0x5b9b6b);_0x42df7b['createEventsMoveCoreMessagePopup'](_0x3053c4,_0x2ea2d5);}}),PluginManager[_0x19393c(0x4db)](pluginData[_0x19393c(0x4ec)],_0x19393c(0x401),_0x3f244e=>{const _0x84244f=_0x19393c;if(!SceneManager['isInstanceOfSceneMap']())return;if(!Imported[_0x84244f(0x1a1)]){$gameTemp[_0x84244f(0x56e)]()&&alert(_0x84244f(0x3f2)+'\x22Event\x20Popup:\x20Player\x22\x20plugin\x20command!');return;}VisuMZ[_0x84244f(0x404)](_0x3f244e,_0x3f244e);const _0x50e8ca={'text':_0x3f244e[_0x84244f(0x571)]||'','duration':Math[_0x84244f(0x31e)](_0x3f244e[_0x84244f(0x4b5)]||0x3c,0xc),'tileCoordinates':{'x':Math[_0x84244f(0x25f)](_0x3f244e[_0x84244f(0x3bc)]||0x0),'y':Math['round'](_0x3f244e[_0x84244f(0x322)]||0x0)}},_0x1d1ce1=_0x3f244e[_0x84244f(0x59e)]||{};VisuMZ[_0x84244f(0x532)]['ApplyPopupExtraSettings'](_0x50e8ca,_0x1d1ce1);const _0x33b039=SceneManager['_scene'][_0x84244f(0x46a)];_0x33b039&&_0x33b039[_0x84244f(0x301)](_0x50e8ca);}),PluginManager[_0x19393c(0x4db)](pluginData[_0x19393c(0x4ec)],'EventTimerExpireEvent',_0x12b0df=>{const _0x255cb5=_0x19393c;VisuMZ[_0x255cb5(0x404)](_0x12b0df,_0x12b0df);const _0x3febb0=_0x12b0df[_0x255cb5(0x44f)];$gameTimer[_0x255cb5(0x197)](_0x3febb0);}),PluginManager[_0x19393c(0x4db)](pluginData[_0x19393c(0x4ec)],'EventTimerExpireClear',_0x437110=>{const _0x59690b=_0x19393c;$gameTimer[_0x59690b(0x197)](0x0);}),PluginManager[_0x19393c(0x4db)](pluginData[_0x19393c(0x4ec)],'EventTimerFramesGain',_0x3649ce=>{const _0x1591c7=_0x19393c;if(!$gameTimer[_0x1591c7(0x3f6)]())return;VisuMZ[_0x1591c7(0x404)](_0x3649ce,_0x3649ce);let _0x12b9d3=0x0;_0x12b9d3+=_0x3649ce[_0x1591c7(0x2af)],_0x12b9d3+=_0x3649ce[_0x1591c7(0x2a2)]*0x3c,_0x12b9d3+=_0x3649ce['Minutes']*0x3c*0x3c,_0x12b9d3+=_0x3649ce['Hours']*0x3c*0x3c*0x3c,$gameTimer['gainFrames'](_0x12b9d3);}),PluginManager[_0x19393c(0x4db)](pluginData[_0x19393c(0x4ec)],_0x19393c(0x54e),_0x5020bc=>{const _0x10e9a8=_0x19393c;if(!$gameTimer[_0x10e9a8(0x3f6)]())return;VisuMZ[_0x10e9a8(0x404)](_0x5020bc,_0x5020bc);let _0x104977=0x0;_0x104977+=_0x5020bc[_0x10e9a8(0x2af)],_0x104977+=_0x5020bc[_0x10e9a8(0x2a2)]*0x3c,_0x104977+=_0x5020bc[_0x10e9a8(0x62c)]*0x3c*0x3c,_0x104977+=_0x5020bc[_0x10e9a8(0x172)]*0x3c*0x3c*0x3c,$gameTimer[_0x10e9a8(0x173)](_0x104977);}),PluginManager[_0x19393c(0x4db)](pluginData[_0x19393c(0x4ec)],_0x19393c(0x5af),_0x1d0c19=>{const _0x4aacd5=_0x19393c;if(!$gameTimer[_0x4aacd5(0x3f6)]())return;$gameTimer['pause']();}),PluginManager[_0x19393c(0x4db)](pluginData[_0x19393c(0x4ec)],_0x19393c(0x184),_0x444229=>{const _0xd6a02a=_0x19393c;if(!$gameTimer[_0xd6a02a(0x3f6)]())return;$gameTimer['resume']();}),PluginManager[_0x19393c(0x4db)](pluginData[_0x19393c(0x4ec)],_0x19393c(0x23d),_0x2969d0=>{const _0x5bd883=_0x19393c;VisuMZ[_0x5bd883(0x404)](_0x2969d0,_0x2969d0);const _0x452540=_0x2969d0[_0x5bd883(0x3e0)]||0x0;$gameTimer['changeSpeed'](_0x452540);}),PluginManager[_0x19393c(0x4db)](pluginData[_0x19393c(0x4ec)],_0x19393c(0x60d),_0x237912=>{const _0xe8ff16=_0x19393c;VisuMZ[_0xe8ff16(0x404)](_0x237912,_0x237912);const _0x124a48=!_0x237912[_0xe8ff16(0x39c)];$gameSystem['setStopFollowerChasing'](_0x124a48);}),PluginManager[_0x19393c(0x4db)](pluginData[_0x19393c(0x4ec)],'FollowerSetTargetChase',_0x347566=>{const _0x11504d=_0x19393c;VisuMZ[_0x11504d(0x404)](_0x347566,_0x347566);const _0x5d2bc7=(_0x347566[_0x11504d(0x554)]||0x0)-0x1,_0x315257=!_0x347566[_0x11504d(0x39c)],_0x2dec08=$gamePlayer[_0x11504d(0x396)]()[_0x11504d(0x618)](_0x5d2bc7);if(_0x2dec08)_0x2dec08['setChaseOff'](_0x315257);}),PluginManager[_0x19393c(0x4db)](pluginData[_0x19393c(0x4ec)],_0x19393c(0x604),_0x538274=>{const _0xc02cfc=_0x19393c;VisuMZ[_0xc02cfc(0x404)](_0x538274,_0x538274);const _0x501a0c=_0x538274[_0xc02cfc(0x554)];$gameSystem['setControlledFollowerID'](_0x501a0c);}),PluginManager[_0x19393c(0x4db)](pluginData['name'],_0x19393c(0x441),_0x437a40=>{const _0x2aa0d1=_0x19393c;VisuMZ['ConvertParams'](_0x437a40,_0x437a40),$gameSystem[_0x2aa0d1(0x2f4)](0x0),$gameSystem[_0x2aa0d1(0x3ef)](![]);for(const _0x6a9ad4 of $gamePlayer[_0x2aa0d1(0x396)]()[_0x2aa0d1(0x1f1)]){if(_0x6a9ad4)_0x6a9ad4[_0x2aa0d1(0x426)](![]);}}),PluginManager['registerCommand'](pluginData[_0x19393c(0x4ec)],_0x19393c(0x5e6),_0x351ac1=>{const _0x4ffba9=_0x19393c;VisuMZ['ConvertParams'](_0x351ac1,_0x351ac1);const _0x437410=$gameTemp[_0x4ffba9(0x5e8)]();_0x351ac1['MapId']=_0x351ac1['MapId']||$gameMap[_0x4ffba9(0x473)]();const _0x34cc55=[_0x351ac1['MapId'],_0x351ac1['EventId']||_0x437410[_0x4ffba9(0x2ed)](),_0x351ac1['Letter']],_0x30d114=_0x351ac1['TargetSwitchId'],_0x1d7f13=$gameSelfSwitches['value'](_0x34cc55)||![];$gameSwitches[_0x4ffba9(0x443)](_0x30d114,_0x1d7f13);}),PluginManager[_0x19393c(0x4db)](pluginData[_0x19393c(0x4ec)],'SwitchGetSelfSwitchID',_0x330b24=>{const _0x3b8f45=_0x19393c;VisuMZ['ConvertParams'](_0x330b24,_0x330b24);const _0x59cabf=$gameTemp[_0x3b8f45(0x5e8)]();_0x330b24[_0x3b8f45(0x1a2)]=_0x330b24[_0x3b8f45(0x1a2)]||$gameMap[_0x3b8f45(0x473)]();const _0x4f785b=[_0x330b24[_0x3b8f45(0x1a2)],_0x330b24[_0x3b8f45(0x23b)]||_0x59cabf['eventId'](),'Self\x20Switch\x20%1'[_0x3b8f45(0x2ea)](_0x330b24['SwitchId'])],_0x39f137=_0x330b24[_0x3b8f45(0x562)],_0x5335a0=$gameSelfSwitches['value'](_0x4f785b)||![];$gameSwitches[_0x3b8f45(0x443)](_0x39f137,_0x5335a0);}),PluginManager[_0x19393c(0x4db)](pluginData[_0x19393c(0x4ec)],_0x19393c(0x1bb),_0x538a10=>{const _0x22f435=_0x19393c;VisuMZ['ConvertParams'](_0x538a10,_0x538a10);const _0x85ebc8=$gameTemp[_0x22f435(0x5e8)]();_0x538a10['MapId']=_0x538a10[_0x22f435(0x1a2)]||$gameMap[_0x22f435(0x473)]();const _0x1ae362=[_0x538a10['MapId'],_0x538a10[_0x22f435(0x23b)]||_0x85ebc8[_0x22f435(0x2ed)](),_0x22f435(0x2e0)['format'](_0x538a10[_0x22f435(0x4ed)])],_0x57375b=_0x538a10['TargetVariableId'],_0x5bf941=$gameSelfSwitches[_0x22f435(0x2bb)](_0x1ae362)||![];$gameVariables['setValue'](_0x57375b,_0x5bf941);}),PluginManager[_0x19393c(0x4db)](pluginData['name'],_0x19393c(0x565),_0x555347=>{const _0x30c351=_0x19393c;VisuMZ['ConvertParams'](_0x555347,_0x555347);if(!$gameMap)return;const _0x5e6f29=$gameTemp[_0x30c351(0x5e8)](),_0x5ca89a=_0x555347[_0x30c351(0x2d9)];_0x555347[_0x30c351(0x26f)]=_0x555347[_0x30c351(0x26f)]||$gameMap[_0x30c351(0x473)](),_0x555347[_0x30c351(0x54a)]=_0x555347[_0x30c351(0x54a)]||$gameMap[_0x30c351(0x473)](),_0x555347[_0x30c351(0x611)]=_0x555347['TemplateName'][_0x30c351(0x62f)]()[_0x30c351(0x1d6)]();if(!_0x5ca89a&&_0x555347[_0x30c351(0x26f)]!==$gameMap[_0x30c351(0x473)]())return;if($gameMap[_0x30c351(0x473)]()===_0x555347['Step1MapId']){const _0x43932c=$gameMap[_0x30c351(0x5ab)](_0x555347[_0x30c351(0x41f)]||_0x5e6f29['eventId']());if(!_0x43932c)return;_0x555347['TemplateName']!==_0x30c351(0x30b)?_0x43932c['morphIntoTemplate'](_0x555347[_0x30c351(0x611)]):_0x43932c['morphInto'](_0x555347[_0x30c351(0x54a)],_0x555347[_0x30c351(0x4b0)]||_0x5e6f29['eventId']());}_0x5ca89a&&$gameSystem[_0x30c351(0x40f)](_0x555347[_0x30c351(0x26f)],_0x555347[_0x30c351(0x41f)],_0x555347[_0x30c351(0x611)],_0x555347[_0x30c351(0x54a)],_0x555347[_0x30c351(0x4b0)]);}),PluginManager[_0x19393c(0x4db)](pluginData[_0x19393c(0x4ec)],'MorphEventRemove',_0x43b2d4=>{const _0x406a98=_0x19393c;VisuMZ['ConvertParams'](_0x43b2d4,_0x43b2d4);if(!$gameMap)return;const _0x805a08=$gameTemp['getLastPluginCommandInterpreter']();_0x43b2d4[_0x406a98(0x1a2)]=_0x43b2d4[_0x406a98(0x1a2)]||$gameMap['mapId']();if($gameMap[_0x406a98(0x473)]()===_0x43b2d4[_0x406a98(0x1a2)]){const _0x26ce01=$gameMap[_0x406a98(0x5ab)](_0x43b2d4[_0x406a98(0x23b)]||_0x805a08['eventId']());_0x26ce01[_0x406a98(0x264)]();}_0x43b2d4[_0x406a98(0x35b)]&&$gameSystem[_0x406a98(0x44a)](_0x43b2d4[_0x406a98(0x1a2)],_0x43b2d4[_0x406a98(0x23b)]||_0x805a08[_0x406a98(0x2ed)]());}),PluginManager['registerCommand'](pluginData[_0x19393c(0x4ec)],'PlayerIconChange',_0x3467b9=>{const _0x49a4c=_0x19393c;VisuMZ[_0x49a4c(0x404)](_0x3467b9,_0x3467b9),$gameSystem[_0x49a4c(0x60a)]($gamePlayer,_0x3467b9[_0x49a4c(0x35c)],_0x3467b9[_0x49a4c(0x272)],_0x3467b9[_0x49a4c(0x1f4)],_0x3467b9[_0x49a4c(0x4d6)]);}),PluginManager[_0x19393c(0x4db)](pluginData['name'],'PlayerIconDelete',_0x13d6fe=>{const _0x581c72=_0x19393c;VisuMZ[_0x581c72(0x404)](_0x13d6fe,_0x13d6fe),$gameSystem[_0x581c72(0x48f)]($gamePlayer);}),PluginManager[_0x19393c(0x4db)](pluginData[_0x19393c(0x4ec)],'PlayerMovementChange',_0x3bf0c2=>{const _0x43118c=_0x19393c;VisuMZ[_0x43118c(0x404)](_0x3bf0c2,_0x3bf0c2),$gameSystem[_0x43118c(0x3ed)](!_0x3bf0c2[_0x43118c(0x3e1)]);}),PluginManager['registerCommand'](pluginData[_0x19393c(0x4ec)],'PlayerMovementDiagonal',_0x58487d=>{const _0x18a1e7=_0x19393c;VisuMZ[_0x18a1e7(0x404)](_0x58487d,_0x58487d),$gameSystem[_0x18a1e7(0x4ae)](_0x58487d['Setting']);}),PluginManager[_0x19393c(0x4db)](pluginData[_0x19393c(0x4ec)],_0x19393c(0x31f),_0x5b615f=>{const _0x5f0cfa=_0x19393c;VisuMZ[_0x5f0cfa(0x404)](_0x5b615f,_0x5b615f);const _0x498dc2=_0x5b615f[_0x5f0cfa(0x1a2)]||$gameMap[_0x5f0cfa(0x473)]();$gameSelfSwitches[_0x5f0cfa(0x460)](_0x498dc2);}),PluginManager['registerCommand'](pluginData[_0x19393c(0x4ec)],_0x19393c(0x3c4),_0x2c57ce=>{const _0x2100ef=_0x19393c;VisuMZ[_0x2100ef(0x404)](_0x2c57ce,_0x2c57ce);const _0x3fc6c6=$gameTemp['getLastPluginCommandInterpreter']();_0x2c57ce[_0x2100ef(0x1a2)]=_0x2c57ce['MapId']||$gameMap[_0x2100ef(0x473)]();const _0x2e76f9=[_0x2c57ce['MapId'],_0x2c57ce[_0x2100ef(0x23b)]||_0x3fc6c6['eventId'](),_0x2c57ce[_0x2100ef(0x348)]];switch(_0x2c57ce[_0x2100ef(0x22d)]){case'ON':$gameSelfSwitches[_0x2100ef(0x443)](_0x2e76f9,!![]);break;case'OFF':$gameSelfSwitches[_0x2100ef(0x443)](_0x2e76f9,![]);break;case _0x2100ef(0x5d0):$gameSelfSwitches[_0x2100ef(0x443)](_0x2e76f9,!$gameSelfSwitches[_0x2100ef(0x2bb)](_0x2e76f9));break;}}),PluginManager[_0x19393c(0x4db)](pluginData[_0x19393c(0x4ec)],_0x19393c(0x5a3),_0x39407e=>{const _0x20b1df=_0x19393c;VisuMZ[_0x20b1df(0x404)](_0x39407e,_0x39407e);const _0x5d0640=$gameTemp[_0x20b1df(0x5e8)]();_0x39407e['MapId']=_0x39407e['MapId']||$gameMap[_0x20b1df(0x473)]();const _0x546d11=[_0x39407e[_0x20b1df(0x1a2)],_0x39407e['EventId']||_0x5d0640[_0x20b1df(0x2ed)](),_0x20b1df(0x37b)['format'](_0x39407e[_0x20b1df(0x39e)])];switch(_0x39407e[_0x20b1df(0x22d)]){case'ON':$gameSelfSwitches[_0x20b1df(0x443)](_0x546d11,!![]);break;case _0x20b1df(0x388):$gameSelfSwitches[_0x20b1df(0x443)](_0x546d11,![]);break;case _0x20b1df(0x5d0):$gameSelfSwitches[_0x20b1df(0x443)](_0x546d11,!$gameSelfSwitches[_0x20b1df(0x2bb)](_0x546d11));break;}}),PluginManager[_0x19393c(0x4db)](pluginData[_0x19393c(0x4ec)],'SelfVariableID',_0x199714=>{const _0x5c305e=_0x19393c;VisuMZ[_0x5c305e(0x404)](_0x199714,_0x199714);const _0x22a5c8=$gameTemp['getLastPluginCommandInterpreter']();_0x199714['MapId']=_0x199714[_0x5c305e(0x1a2)]||$gameMap[_0x5c305e(0x473)]();const _0x30629a=[_0x199714[_0x5c305e(0x1a2)],_0x199714[_0x5c305e(0x23b)]||_0x22a5c8['eventId'](),_0x5c305e(0x2e0)[_0x5c305e(0x2ea)](_0x199714['VariableId'])],_0xf4aad6=VisuMZ[_0x5c305e(0x4bc)]($gameSelfSwitches[_0x5c305e(0x2bb)](_0x30629a),_0x199714[_0x5c305e(0x22d)],_0x199714[_0x5c305e(0x5e4)]);$gameSelfSwitches['setValue'](_0x30629a,_0xf4aad6);}),PluginManager[_0x19393c(0x4db)](pluginData[_0x19393c(0x4ec)],'SpawnEventAtXY',_0x4b9a65=>{const _0x3e6e89=_0x19393c;VisuMZ[_0x3e6e89(0x404)](_0x4b9a65,_0x4b9a65);const _0x3d7108=$gameTemp[_0x3e6e89(0x5e8)](),_0xe003b7={'template':_0x4b9a65[_0x3e6e89(0x611)],'mapId':_0x4b9a65[_0x3e6e89(0x1a2)]||$gameMap[_0x3e6e89(0x473)](),'eventId':_0x4b9a65['EventId']||_0x3d7108[_0x3e6e89(0x2ed)](),'x':_0x4b9a65['PosX'],'y':_0x4b9a65[_0x3e6e89(0x41d)],'spawnPreserved':_0x4b9a65[_0x3e6e89(0x4fc)],'spawnEventId':$gameMap[_0x3e6e89(0x540)][_0x3e6e89(0x5b3)]+0x3e8},_0x3067b4=_0x4b9a65['SuccessSwitchId']||0x0;if(!VisuMZ[_0x3e6e89(0x46d)][_0xe003b7[_0x3e6e89(0x473)]]&&_0xe003b7['mapId']!==$gameMap['mapId']()){let _0x1f3e89=_0x3e6e89(0x236)[_0x3e6e89(0x2ea)](_0xe003b7['mapId']);_0x1f3e89+=_0x3e6e89(0x3f4),_0x1f3e89+=_0x3e6e89(0x3e2),_0x1f3e89+=_0x3e6e89(0x168),_0x1f3e89+=_0x3e6e89(0x58b)[_0x3e6e89(0x2ea)](_0xe003b7[_0x3e6e89(0x473)]),alert(_0x1f3e89);return;}const _0x48c235=$gameMap[_0x3e6e89(0x3e3)](_0xe003b7,_0x4b9a65[_0x3e6e89(0x5ce)],_0x4b9a65[_0x3e6e89(0x25e)]);_0x3067b4&&$gameSwitches[_0x3e6e89(0x443)](_0x3067b4,!!_0x48c235);}),PluginManager['registerCommand'](pluginData[_0x19393c(0x4ec)],_0x19393c(0x1fb),_0x391e73=>{const _0x1c3d8c=_0x19393c;VisuMZ[_0x1c3d8c(0x404)](_0x391e73,_0x391e73);const _0x3f9084=$gameTemp[_0x1c3d8c(0x5e8)](),_0x432ba8={'template':_0x391e73['TemplateName'],'mapId':_0x391e73['MapId']||$gameMap['mapId'](),'eventId':_0x391e73[_0x1c3d8c(0x23b)]||_0x3f9084[_0x1c3d8c(0x2ed)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x391e73[_0x1c3d8c(0x4fc)],'spawnEventId':$gameMap['_spawnedEvents'][_0x1c3d8c(0x5b3)]+0x3e8},_0x3731ee=_0x391e73[_0x1c3d8c(0x55d)]||0x0;if(!VisuMZ[_0x1c3d8c(0x46d)][_0x432ba8[_0x1c3d8c(0x473)]]&&_0x432ba8[_0x1c3d8c(0x473)]!==$gameMap['mapId']()){let _0x2787e1=_0x1c3d8c(0x236)['format'](_0x432ba8['mapId']);_0x2787e1+=_0x1c3d8c(0x3f4),_0x2787e1+=_0x1c3d8c(0x3e2),_0x2787e1+=_0x1c3d8c(0x168),_0x2787e1+='Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1'[_0x1c3d8c(0x2ea)](_0x432ba8[_0x1c3d8c(0x473)]),alert(_0x2787e1);return;}const _0x5148ed=$gameMap[_0x1c3d8c(0x2b6)](_0x432ba8,_0x391e73[_0x1c3d8c(0x18d)],_0x391e73[_0x1c3d8c(0x5ce)],_0x391e73[_0x1c3d8c(0x25e)]);_0x3731ee&&$gameSwitches[_0x1c3d8c(0x443)](_0x3731ee,!!_0x5148ed);}),PluginManager[_0x19393c(0x4db)](pluginData['name'],_0x19393c(0x3a4),_0x15ebe8=>{const _0x58ae3b=_0x19393c;VisuMZ[_0x58ae3b(0x404)](_0x15ebe8,_0x15ebe8);const _0x22e4a7=$gameTemp['getLastPluginCommandInterpreter'](),_0x3c5cac={'template':_0x15ebe8[_0x58ae3b(0x611)],'mapId':_0x15ebe8[_0x58ae3b(0x1a2)]||$gameMap[_0x58ae3b(0x473)](),'eventId':_0x15ebe8[_0x58ae3b(0x23b)]||_0x22e4a7['eventId'](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x15ebe8['Preserve'],'spawnEventId':$gameMap[_0x58ae3b(0x540)][_0x58ae3b(0x5b3)]+0x3e8},_0x1337fb=_0x15ebe8[_0x58ae3b(0x55d)]||0x0;if(!VisuMZ[_0x58ae3b(0x46d)][_0x3c5cac['mapId']]&&_0x3c5cac[_0x58ae3b(0x473)]!==$gameMap['mapId']()){let _0x5671f5=_0x58ae3b(0x236)['format'](_0x3c5cac['mapId']);_0x5671f5+='of\x20Preloaded\x20Maps.\x0a\x0a',_0x5671f5+=_0x58ae3b(0x3e2),_0x5671f5+='Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a',_0x5671f5+=_0x58ae3b(0x58b)['format'](_0x3c5cac[_0x58ae3b(0x473)]),alert(_0x5671f5);return;}const _0x33f1ad=$gameMap['prepareSpawnedEventAtTerrainTag'](_0x3c5cac,_0x15ebe8[_0x58ae3b(0x1e2)],_0x15ebe8['Collision'],_0x15ebe8['Passability']);_0x1337fb&&$gameSwitches[_0x58ae3b(0x443)](_0x1337fb,!!_0x33f1ad);}),PluginManager[_0x19393c(0x4db)](pluginData[_0x19393c(0x4ec)],_0x19393c(0x3d8),_0x5bdc21=>{const _0x2989dd=_0x19393c;VisuMZ[_0x2989dd(0x404)](_0x5bdc21,_0x5bdc21);const _0x2ebd86=$gameTemp['getLastPluginCommandInterpreter']();$gameMap[_0x2989dd(0x502)](_0x5bdc21[_0x2989dd(0x30a)]||_0x2ebd86['eventId']());}),PluginManager[_0x19393c(0x4db)](pluginData['name'],_0x19393c(0x515),_0x3814cd=>{const _0x2419a4=_0x19393c;VisuMZ[_0x2419a4(0x404)](_0x3814cd,_0x3814cd);const _0x4e6376=_0x3814cd[_0x2419a4(0x545)],_0x375fee=_0x3814cd['PosY'];$gameMap[_0x2419a4(0x32f)](_0x4e6376,_0x375fee);}),PluginManager[_0x19393c(0x4db)](pluginData[_0x19393c(0x4ec)],_0x19393c(0x1a8),_0x5c5285=>{const _0x182269=_0x19393c;VisuMZ[_0x182269(0x404)](_0x5c5285,_0x5c5285),$gameMap[_0x182269(0x334)](_0x5c5285[_0x182269(0x18d)]);}),PluginManager[_0x19393c(0x4db)](pluginData[_0x19393c(0x4ec)],_0x19393c(0x34b),_0x2c51b8=>{const _0x274bad=_0x19393c;VisuMZ[_0x274bad(0x404)](_0x2c51b8,_0x2c51b8),$gameMap['despawnTerrainTags'](_0x2c51b8[_0x274bad(0x1e2)]);}),PluginManager[_0x19393c(0x4db)](pluginData[_0x19393c(0x4ec)],_0x19393c(0x4be),_0x3f3c68=>{const _0x1ed9d0=_0x19393c;VisuMZ['ConvertParams'](_0x3f3c68,_0x3f3c68),$gameMap[_0x1ed9d0(0x215)]();}),VisuMZ[_0x19393c(0x532)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot['prototype']['onDatabaseLoaded'],Scene_Boot[_0x19393c(0x495)]['onDatabaseLoaded']=function(){const _0x151fad=_0x19393c;VisuMZ[_0x151fad(0x532)][_0x151fad(0x4f9)][_0x151fad(0x496)](this),this[_0x151fad(0x29b)](),this['process_VisuMZ_EventsMoveCore_Switches_Variables']();if(VisuMZ[_0x151fad(0x532)]['CustomPageConditions'])VisuMZ[_0x151fad(0x532)][_0x151fad(0x1a5)][_0x151fad(0x46e)]();},VisuMZ['PreloadedMaps']=[],VisuMZ['EventTemplates']={},Scene_Boot[_0x19393c(0x495)]['process_VisuMZ_EventsMoveCore_LoadTemplateMaps']=function(){const _0x5a7ecc=_0x19393c;if(DataManager['isBattleTest']()||DataManager[_0x5a7ecc(0x4ab)]())return;const _0x31f039=VisuMZ[_0x5a7ecc(0x532)][_0x5a7ecc(0x329)][_0x5a7ecc(0x5d7)],_0x4311ad=_0x31f039['PreloadMaps'][_0x5a7ecc(0x5f3)](0x0);for(const _0x30f950 of _0x31f039[_0x5a7ecc(0x633)]){_0x30f950[_0x5a7ecc(0x1a9)]=_0x30f950[_0x5a7ecc(0x1a9)][_0x5a7ecc(0x62f)]()[_0x5a7ecc(0x1d6)](),VisuMZ[_0x5a7ecc(0x50a)][_0x30f950[_0x5a7ecc(0x1a9)]]=_0x30f950;if(!_0x4311ad[_0x5a7ecc(0x239)](_0x30f950[_0x5a7ecc(0x3ce)]))_0x4311ad[_0x5a7ecc(0x19c)](_0x30f950[_0x5a7ecc(0x3ce)]);}for(const _0x4d559b of _0x4311ad){if(VisuMZ[_0x5a7ecc(0x46d)][_0x4d559b])continue;const _0x4a7215=_0x5a7ecc(0x2a3)[_0x5a7ecc(0x2ea)](_0x4d559b[_0x5a7ecc(0x3b8)](0x3)),_0x2c0e7d=_0x5a7ecc(0x615)[_0x5a7ecc(0x2ea)](_0x4d559b);DataManager[_0x5a7ecc(0x269)](_0x2c0e7d,_0x4a7215),setTimeout(this['VisuMZ_Setup_Preload_Map'][_0x5a7ecc(0x2b5)](this,_0x4d559b,_0x2c0e7d),0x64);}},Scene_Boot['prototype'][_0x19393c(0x60f)]=function(_0x1c9090,_0x5489a7){const _0x1e85bd=_0x19393c;window[_0x5489a7]?(VisuMZ[_0x1e85bd(0x46d)][_0x1c9090]=window[_0x5489a7],window[_0x5489a7]=undefined):setTimeout(this[_0x1e85bd(0x60f)]['bind'](this,_0x1c9090,_0x5489a7),0x64);},VisuMZ['AdvancedSwitches']=[],VisuMZ[_0x19393c(0x2be)]=[],VisuMZ['MapSwitches']=[],VisuMZ[_0x19393c(0x242)]=[],VisuMZ[_0x19393c(0x47c)]=[],VisuMZ['MapVariables']=[],Scene_Boot['prototype'][_0x19393c(0x416)]=function(){const _0x168221=_0x19393c;for(let _0x4870f6=0x1;_0x4870f6<$dataSystem[_0x168221(0x54b)][_0x168221(0x5b3)];_0x4870f6++){if($dataSystem[_0x168221(0x54b)][_0x4870f6][_0x168221(0x1cb)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ['AdvancedSwitches'][_0x168221(0x19c)](_0x4870f6);if($dataSystem[_0x168221(0x54b)][_0x4870f6]['match'](/<SELF>/i))VisuMZ[_0x168221(0x2be)]['push'](_0x4870f6);if($dataSystem[_0x168221(0x54b)][_0x4870f6][_0x168221(0x1cb)](/<MAP>/i))VisuMZ[_0x168221(0x2ec)][_0x168221(0x19c)](_0x4870f6);}for(let _0x4cbdc8=0x1;_0x4cbdc8<$dataSystem['variables'][_0x168221(0x5b3)];_0x4cbdc8++){if($dataSystem['variables'][_0x4cbdc8][_0x168221(0x1cb)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ['AdvancedVariables']['push'](_0x4cbdc8);if($dataSystem[_0x168221(0x16d)][_0x4cbdc8][_0x168221(0x1cb)](/<SELF>/i))VisuMZ[_0x168221(0x47c)][_0x168221(0x19c)](_0x4cbdc8);if($dataSystem[_0x168221(0x16d)][_0x4cbdc8][_0x168221(0x1cb)](/<MAP>/i))VisuMZ[_0x168221(0x28b)][_0x168221(0x19c)](_0x4cbdc8);}},VisuMZ[_0x19393c(0x532)][_0x19393c(0x1a5)]={},VisuMZ[_0x19393c(0x532)]['CustomPageConditions'][_0x19393c(0x46e)]=function(){const _0x443056=_0x19393c;this[_0x443056(0x31b)]=new Game_CPCInterpreter(),this[_0x443056(0x330)]();},VisuMZ[_0x19393c(0x532)][_0x19393c(0x1a5)]['determineCommonEventsWithCPC']=function(){const _0x4970c9=_0x19393c;this[_0x4970c9(0x2d6)]=[];for(const _0x208087 of $dataCommonEvents){if(!_0x208087)continue;VisuMZ[_0x4970c9(0x532)][_0x4970c9(0x1a5)]['loadCPC'](_0x208087);if(_0x208087[_0x4970c9(0x506)][_0x4970c9(0x5b3)]>0x0)this['_commonEvents']['push'](_0x208087['id']);}},VisuMZ[_0x19393c(0x532)][_0x19393c(0x1a5)][_0x19393c(0x276)]=function(_0x313af6,_0x3d5859,_0x576aba){const _0x3ed4e3=_0x19393c;return this[_0x3ed4e3(0x31b)][_0x3ed4e3(0x2f0)](_0x313af6,_0x3d5859),_0x576aba?this[_0x3ed4e3(0x31b)][_0x3ed4e3(0x45d)](_0x576aba):this[_0x3ed4e3(0x31b)][_0x3ed4e3(0x2fe)](),this['_interpreter'][_0x3ed4e3(0x1c7)];},VisuMZ[_0x19393c(0x532)][_0x19393c(0x1a5)][_0x19393c(0x43c)]=function(_0x45ca78){const _0x18095e=_0x19393c;let _0x2ea7f4=![];_0x45ca78[_0x18095e(0x506)]=[];for(const _0x45be35 of _0x45ca78[_0x18095e(0x344)]){if([0x6c,0x198][_0x18095e(0x239)](_0x45be35['code'])){const _0x583af7=_0x45be35['parameters'][0x0];if(_0x583af7[_0x18095e(0x1cb)](/<PAGE (?:CONDITION|CONDITIONS)>/i))_0x2ea7f4=!![];else _0x583af7['match'](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)&&(_0x2ea7f4=![]);}_0x2ea7f4&&_0x45ca78[_0x18095e(0x506)][_0x18095e(0x19c)](_0x45be35);}},getSelfSwitchValue=function(_0x3bdd8f,_0x49b9d0,_0x586115){const _0x4f4da7=_0x19393c;let _0x1dbf1d=[_0x3bdd8f,_0x49b9d0,_0x4f4da7(0x37b)[_0x4f4da7(0x2ea)](_0x586115)];return typeof _0x586115===_0x4f4da7(0x454)&&(_0x1dbf1d=[_0x3bdd8f,_0x49b9d0,_0x586115['toUpperCase']()['trim']()]),$gameSelfSwitches[_0x4f4da7(0x2bb)](_0x1dbf1d);},getMapSwitchValue=function(_0x301083,_0x1a91c0){const _0x3ea18e=_0x19393c;let _0x3bbffa=[0x0,0x0,'Map\x20%1\x20Switch\x20%2'[_0x3ea18e(0x2ea)](_0x301083,_0x1a91c0)];return $gameSelfSwitches[_0x3ea18e(0x2bb)](_0x3bbffa);},getMapVariableValue=function(_0x27d043,_0x121919){const _0x529272=_0x19393c;let _0x5cd5a0=[0x0,0x0,_0x529272(0x5a6)[_0x529272(0x2ea)](_0x27d043,_0x121919)];return $gameSelfSwitches['value'](_0x5cd5a0);},getSelfVariableValue=function(_0x450e80,_0x22c4ab,_0x4c10e6){const _0x2b301c=_0x19393c,_0x2b11d1=[_0x450e80,_0x22c4ab,'Self\x20Variable\x20%1'[_0x2b301c(0x2ea)](_0x4c10e6)];return $gameSelfSwitches[_0x2b301c(0x2bb)](_0x2b11d1);},setSelfSwitchValue=function(_0x39a65b,_0x5aac4a,_0x174b73,_0x5228c4){const _0x5060f0=_0x19393c;let _0x9d0180=[_0x39a65b,_0x5aac4a,_0x5060f0(0x37b)[_0x5060f0(0x2ea)](_0x174b73)];typeof _0x174b73===_0x5060f0(0x454)&&(_0x9d0180=[_0x39a65b,_0x5aac4a,_0x174b73[_0x5060f0(0x62f)]()['trim']()]),$gameSelfSwitches[_0x5060f0(0x443)](_0x9d0180,_0x5228c4);},setSelfVariableValue=function(_0x12e498,_0xd3adf3,_0x10c6cd,_0x78d929){const _0x522f7e=_0x19393c,_0x432650=[_0x12e498,_0xd3adf3,'Self\x20Variable\x20%1'['format'](_0x10c6cd)];$gameSelfSwitches[_0x522f7e(0x443)](_0x432650,_0x78d929);},setMapSwitchValue=function(_0x4486d0,_0x5eb812,_0x10e6ff){const _0x479638=_0x19393c;let _0x599e30=[0x0,0x0,_0x479638(0x2ef)[_0x479638(0x2ea)](_0x4486d0,_0x5eb812)];$gameSelfSwitches[_0x479638(0x443)](_0x599e30,_0x10e6ff);},setMapVariableValue=function(_0x35a617,_0x220a8c,_0x48b5bf){const _0x534451=_0x19393c;let _0x17d7c1=[0x0,0x0,_0x534451(0x5a6)[_0x534451(0x2ea)](_0x35a617,_0x220a8c)];$gameSelfSwitches[_0x534451(0x443)](_0x17d7c1,_0x48b5bf);},DataManager[_0x19393c(0x601)]=function(_0x14a80f){const _0x1ba16d=_0x19393c;if(SceneManager[_0x1ba16d(0x4ee)][_0x1ba16d(0x5e9)]===Scene_Debug)return![];return VisuMZ[_0x1ba16d(0x30f)][_0x1ba16d(0x239)](_0x14a80f);},DataManager[_0x19393c(0x4aa)]=function(_0x357254){const _0x3d902b=_0x19393c;if(SceneManager[_0x3d902b(0x4ee)][_0x3d902b(0x5e9)]===Scene_Debug)return![];return VisuMZ[_0x3d902b(0x242)][_0x3d902b(0x239)](_0x357254);},DataManager[_0x19393c(0x55c)]=function(_0x1d6f17){const _0x1d8b39=_0x19393c;if(SceneManager[_0x1d8b39(0x4ee)][_0x1d8b39(0x5e9)]===Scene_Debug)return![];return VisuMZ[_0x1d8b39(0x2be)][_0x1d8b39(0x239)](_0x1d6f17);},DataManager[_0x19393c(0x32e)]=function(_0x2c8b87){const _0x1e3592=_0x19393c;if(SceneManager[_0x1e3592(0x4ee)]['constructor']===Scene_Debug)return![];return VisuMZ[_0x1e3592(0x47c)]['includes'](_0x2c8b87);},DataManager[_0x19393c(0x568)]=function(_0x209c8f){const _0x36ea7f=_0x19393c;if(BattleManager[_0x36ea7f(0x2e5)]())return![];return VisuMZ[_0x36ea7f(0x2ec)]['includes'](_0x209c8f);},DataManager[_0x19393c(0x2ae)]=function(_0x4c0c7b){const _0x4fcf99=_0x19393c;if(BattleManager[_0x4fcf99(0x2e5)]())return![];return VisuMZ[_0x4fcf99(0x28b)][_0x4fcf99(0x239)](_0x4c0c7b);},ImageManager[_0x19393c(0x572)]=function(_0x135318){const _0x43ca5c=_0x19393c;return _0x135318[_0x43ca5c(0x1cb)](/\[INV(?:|ISIBLE)\]/i);},SceneManager[_0x19393c(0x462)]=function(){const _0x158b1a=_0x19393c;return this['_scene']&&this[_0x158b1a(0x4ee)][_0x158b1a(0x5e9)]===Scene_Map;},SceneManager[_0x19393c(0x440)]=function(){const _0x3309ea=_0x19393c;return this[_0x3309ea(0x4ee)]&&this[_0x3309ea(0x4ee)]instanceof Scene_Map;},VisuMZ[_0x19393c(0x532)]['Game_Temp_setDestination']=Game_Temp['prototype'][_0x19393c(0x497)],Game_Temp['prototype']['setDestination']=function(_0x2948e3,_0x7a6218){const _0xfe6062=_0x19393c;if(this[_0xfe6062(0x362)](_0x2948e3,_0x7a6218))return;VisuMZ[_0xfe6062(0x532)][_0xfe6062(0x55e)][_0xfe6062(0x496)](this,_0x2948e3,_0x7a6218);},Game_Temp[_0x19393c(0x495)][_0x19393c(0x362)]=function(_0x323433,_0x35fa06){const _0xe72cbd=_0x19393c,_0x215893=$gameMap[_0xe72cbd(0x5d9)](_0x323433,_0x35fa06);for(const _0x5be2d2 of _0x215893){if(_0x5be2d2&&_0x5be2d2[_0xe72cbd(0x4b3)]())return _0x5be2d2['onClickTrigger'](),!![];}return TouchInput[_0xe72cbd(0x576)]()&&_0x215893[_0xe72cbd(0x5b3)]>0x0&&TouchInput['clear'](),![];},Game_Temp['prototype'][_0x19393c(0x44c)]=function(_0x26c51a){const _0xcc273c=_0x19393c;this[_0xcc273c(0x2ca)]=_0x26c51a;},Game_Temp[_0x19393c(0x495)][_0x19393c(0x5e8)]=function(){const _0x25d707=_0x19393c;return this[_0x25d707(0x2ca)];},Game_Temp[_0x19393c(0x495)]['registerSelfTarget']=function(_0x51dff3){const _0x477865=_0x19393c;this[_0x477865(0x36c)]=_0x51dff3;},Game_Temp[_0x19393c(0x495)][_0x19393c(0x1a6)]=function(){const _0x5dbee7=_0x19393c;this[_0x5dbee7(0x36c)]=undefined;},Game_Temp[_0x19393c(0x495)][_0x19393c(0x3f8)]=function(){const _0xdc1a6e=_0x19393c;return this[_0xdc1a6e(0x36c)];},VisuMZ[_0x19393c(0x532)][_0x19393c(0x3cc)]=Game_System[_0x19393c(0x495)]['initialize'],Game_System['prototype']['initialize']=function(){const _0x28bef7=_0x19393c;VisuMZ['EventsMoveCore'][_0x28bef7(0x3cc)][_0x28bef7(0x496)](this),this[_0x28bef7(0x188)](),this[_0x28bef7(0x2e6)]();},Game_System[_0x19393c(0x495)][_0x19393c(0x188)]=function(){const _0x4cedc1=_0x19393c;this[_0x4cedc1(0x37f)]={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this[_0x4cedc1(0x50b)]={},this[_0x4cedc1(0x509)]=[],this[_0x4cedc1(0x419)]={},this[_0x4cedc1(0x3a9)]={},this[_0x4cedc1(0x2ee)]=![],this[_0x4cedc1(0x597)]='default';},Game_System['prototype'][_0x19393c(0x468)]=function(){const _0x20e99c=_0x19393c;if(this['_EventsMoveCoreSettings']===undefined)this[_0x20e99c(0x188)]();if(this[_0x20e99c(0x37f)][_0x20e99c(0x1f6)]===undefined)this['initEventsMoveCore']();return this[_0x20e99c(0x37f)]['DashingEnable'];},Game_System[_0x19393c(0x495)][_0x19393c(0x26a)]=function(_0x4334a1){const _0x571b64=_0x19393c;if(this['_EventsMoveCoreSettings']===undefined)this[_0x571b64(0x188)]();if(this[_0x571b64(0x37f)][_0x571b64(0x1f6)]===undefined)this['initEventsMoveCore']();this[_0x571b64(0x37f)][_0x571b64(0x1f6)]=_0x4334a1;},Game_System[_0x19393c(0x495)][_0x19393c(0x218)]=function(){const _0x2829da=_0x19393c;if(this[_0x2829da(0x37f)]===undefined)this[_0x2829da(0x188)]();if(this[_0x2829da(0x37f)]['EventAutoMovement']===undefined)this[_0x2829da(0x188)]();return this[_0x2829da(0x37f)][_0x2829da(0x3b7)];},Game_System[_0x19393c(0x495)]['setAllowEventAutoMovement']=function(_0x42efe9){const _0x372841=_0x19393c;if(this[_0x372841(0x37f)]===undefined)this['initEventsMoveCore']();if(this[_0x372841(0x37f)]['EventAutoMovement']===undefined)this[_0x372841(0x188)]();this[_0x372841(0x37f)][_0x372841(0x3b7)]=_0x42efe9;},Game_System[_0x19393c(0x495)]['eventLabelsVisible']=function(){const _0x2f3acb=_0x19393c;if(this[_0x2f3acb(0x37f)]===undefined)this[_0x2f3acb(0x188)]();if(this[_0x2f3acb(0x37f)][_0x2f3acb(0x2d8)]===undefined)this[_0x2f3acb(0x188)]();return this[_0x2f3acb(0x37f)]['VisibleEventLabels'];},Game_System[_0x19393c(0x495)]['setEventLabelsVisible']=function(_0x59568c){const _0x1ada65=_0x19393c;if(this[_0x1ada65(0x37f)]===undefined)this[_0x1ada65(0x188)]();if(this['_EventsMoveCoreSettings'][_0x1ada65(0x2d8)]===undefined)this[_0x1ada65(0x188)]();this[_0x1ada65(0x37f)][_0x1ada65(0x2d8)]=_0x59568c;},Game_System[_0x19393c(0x495)][_0x19393c(0x375)]=function(){const _0x186da4=_0x19393c;return this[_0x186da4(0x2ee)]===undefined&&(this[_0x186da4(0x2ee)]=![]),this['_DisablePlayerControl'];},Game_System[_0x19393c(0x495)][_0x19393c(0x3ed)]=function(_0x10a7aa){const _0x555098=_0x19393c;this[_0x555098(0x2ee)]=_0x10a7aa;},Game_System['prototype']['getPlayerDiagonalSetting']=function(){const _0x55ee18=_0x19393c;return this[_0x55ee18(0x597)];},Game_System[_0x19393c(0x495)]['setPlayerDiagonalSetting']=function(_0x137df1){const _0x556ba6=_0x19393c;this[_0x556ba6(0x597)]=String(_0x137df1)[_0x556ba6(0x1f8)]()[_0x556ba6(0x1d6)]();},Game_System[_0x19393c(0x495)][_0x19393c(0x439)]=function(_0x404530){const _0x2ed424=_0x19393c;if(this[_0x2ed424(0x50b)]===undefined)this['initEventsMoveCore']();if(!_0x404530)return null;if(_0x404530===$gamePlayer)return this[_0x2ed424(0x50b)]['Player'];else{const _0x1cb246=VisuMZ[_0x2ed424(0x532)][_0x2ed424(0x329)],_0x3847ed=_0x2ed424(0x33e)[_0x2ed424(0x2ea)](_0x404530['_mapId'],_0x404530[_0x2ed424(0x3ba)]);return this['_EventIcons'][_0x3847ed]=this[_0x2ed424(0x50b)][_0x3847ed]||{'iconIndex':0x0,'bufferX':_0x1cb246[_0x2ed424(0x622)][_0x2ed424(0x1ae)],'bufferY':_0x1cb246[_0x2ed424(0x622)][_0x2ed424(0x4dc)],'blendMode':_0x1cb246['Icon']['BlendMode']},this[_0x2ed424(0x50b)][_0x3847ed];}},Game_System[_0x19393c(0x495)][_0x19393c(0x60a)]=function(_0x57e372,_0x5b32c2,_0x5a8a34,_0x56d4f3,_0x89aa8b){const _0x5ea02d=_0x19393c;if(this[_0x5ea02d(0x50b)]===undefined)this[_0x5ea02d(0x188)]();const _0x5c02fe=_0x57e372===$gamePlayer?_0x5ea02d(0x406):_0x5ea02d(0x33e)[_0x5ea02d(0x2ea)](_0x57e372[_0x5ea02d(0x4e6)],_0x57e372[_0x5ea02d(0x3ba)]);this[_0x5ea02d(0x50b)][_0x5c02fe]={'iconIndex':_0x5b32c2,'bufferX':_0x5a8a34,'bufferY':_0x56d4f3,'blendMode':_0x89aa8b};},Game_System[_0x19393c(0x495)][_0x19393c(0x250)]=function(_0x50b17a,_0x189d5e,_0x47e48b,_0x4830ed,_0x29d40f,_0x876fea,_0x2aeefd){const _0xde3203=_0x19393c;if(this[_0xde3203(0x50b)]===undefined)this['initEventsMoveCore']();const _0x1582c3='Map%1-Event%2'[_0xde3203(0x2ea)](_0x50b17a,_0x189d5e);this[_0xde3203(0x50b)][_0x1582c3]={'iconIndex':_0x47e48b,'forced':_0x2aeefd,'bufferX':_0x4830ed,'bufferY':_0x29d40f,'blendMode':_0x876fea};},Game_System[_0x19393c(0x495)][_0x19393c(0x48f)]=function(_0x5d0904){const _0x395594=_0x19393c;if(this[_0x395594(0x50b)]===undefined)this[_0x395594(0x188)]();if(!_0x5d0904)return null;_0x5d0904===$gamePlayer?delete this[_0x395594(0x50b)]['Player']:this[_0x395594(0x33b)](_0x5d0904[_0x395594(0x4e6)],_0x5d0904[_0x395594(0x3ba)]);},Game_System[_0x19393c(0x495)][_0x19393c(0x33b)]=function(_0x3bc111,_0x3fa70f){const _0x3c0aa1=_0x19393c;if(this[_0x3c0aa1(0x50b)]===undefined)this[_0x3c0aa1(0x188)]();this[_0x3c0aa1(0x250)](_0x3bc111,_0x3fa70f,-0x1,0x0,0x0,0x0,![]);},Game_System[_0x19393c(0x495)][_0x19393c(0x544)]=function(_0x10aaec){const _0x2f1b77=_0x19393c;if(this[_0x2f1b77(0x50b)]===undefined)this['initEventsMoveCore']();if(!_0x10aaec)return null;_0x10aaec===$gamePlayer?delete this[_0x2f1b77(0x50b)][_0x2f1b77(0x406)]:this[_0x2f1b77(0x2f5)](_0x10aaec[_0x2f1b77(0x4e6)],_0x10aaec[_0x2f1b77(0x3ba)]);},Game_System['prototype']['resetIconsOnEventsDataKey']=function(_0x104047,_0x2e4073){const _0x302b1d=_0x19393c;if(this[_0x302b1d(0x50b)]===undefined)this[_0x302b1d(0x188)]();const _0x29e25c=_0x302b1d(0x33e)[_0x302b1d(0x2ea)](_0x104047,_0x2e4073);if(this[_0x302b1d(0x50b)][_0x29e25c]){if(this['_EventIcons'][_0x29e25c][_0x302b1d(0x407)]<0x0)return;if(this['_EventIcons'][_0x29e25c][_0x302b1d(0x1a0)])return;}delete this[_0x302b1d(0x50b)][_0x29e25c];},Game_System['prototype'][_0x19393c(0x36a)]=function(_0x594127,_0xde9978){const _0x1ba31a=_0x19393c;if(this[_0x1ba31a(0x50b)]===undefined)this[_0x1ba31a(0x188)]();const _0x4fbfbc='Map%1-Event%2'[_0x1ba31a(0x2ea)](_0x594127,_0xde9978);delete this[_0x1ba31a(0x50b)][_0x4fbfbc];if(_0x594127!==$gameMap[_0x1ba31a(0x473)]())return;const _0x52cd4e=$gameMap[_0x1ba31a(0x5ab)](_0xde9978);if(!_0x52cd4e)return;_0x52cd4e[_0x1ba31a(0x5d2)]();},Game_System['prototype'][_0x19393c(0x383)]=function(_0xa7af94){const _0x3e8cb2=_0x19393c;if(this[_0x3e8cb2(0x3a9)]===undefined)this['initEventsMoveCore']();if(!_0xa7af94)return null;const _0x3db8db=_0x3e8cb2(0x33e)[_0x3e8cb2(0x2ea)](_0xa7af94[_0x3e8cb2(0x4e6)],_0xa7af94[_0x3e8cb2(0x3ba)]);return this['_SavedEventLocations'][_0x3db8db];},Game_System[_0x19393c(0x495)][_0x19393c(0x5a9)]=function(_0x177dd1){const _0x2cec0e=_0x19393c;if(this['_SavedEventLocations']===undefined)this[_0x2cec0e(0x188)]();if(!_0x177dd1)return;const _0x4cca22=_0x2cec0e(0x33e)[_0x2cec0e(0x2ea)](_0x177dd1[_0x2cec0e(0x4e6)],_0x177dd1[_0x2cec0e(0x3ba)]);this[_0x2cec0e(0x3a9)][_0x4cca22]={'direction':_0x177dd1[_0x2cec0e(0x4c5)](),'x':Math[_0x2cec0e(0x25f)](_0x177dd1['x']),'y':Math['round'](_0x177dd1['y']),'pageIndex':_0x177dd1[_0x2cec0e(0x432)],'moveRouteIndex':_0x177dd1[_0x2cec0e(0x408)]};},Game_System['prototype'][_0x19393c(0x458)]=function(_0x521c86){const _0xf23020=_0x19393c;if(this[_0xf23020(0x3a9)]===undefined)this['initEventsMoveCore']();if(!_0x521c86)return;this['deleteSavedEventLocationKey'](_0x521c86[_0xf23020(0x4e6)],_0x521c86['_eventId']);},Game_System[_0x19393c(0x495)][_0x19393c(0x25c)]=function(_0x1826f1,_0x20be94){const _0x5f4d00=_0x19393c;if(this[_0x5f4d00(0x3a9)]===undefined)this[_0x5f4d00(0x188)]();const _0x16e79d='Map%1-Event%2'[_0x5f4d00(0x2ea)](_0x1826f1,_0x20be94);delete this[_0x5f4d00(0x3a9)][_0x16e79d];},Game_System[_0x19393c(0x495)][_0x19393c(0x582)]=function(_0x376170,_0x173723,_0x36ad48,_0x13fdec,_0x119a82,_0x5dc81f,_0x18c781){const _0x5e7b7a=_0x19393c;if(this['_SavedEventLocations']===undefined)this[_0x5e7b7a(0x188)]();const _0x4ff0a1=_0x5e7b7a(0x33e)[_0x5e7b7a(0x2ea)](_0x376170,_0x173723);this[_0x5e7b7a(0x3a9)][_0x4ff0a1]={'direction':_0x119a82,'x':Math['round'](_0x36ad48),'y':Math[_0x5e7b7a(0x25f)](_0x13fdec),'pageIndex':_0x5dc81f,'moveRouteIndex':_0x18c781};},Game_System[_0x19393c(0x495)][_0x19393c(0x3f7)]=function(_0x156e29){const _0x22cb89=_0x19393c;if(this[_0x22cb89(0x419)]===undefined)this[_0x22cb89(0x188)]();if(!_0x156e29)return;const _0x4d4e6a=_0x22cb89(0x33e)[_0x22cb89(0x2ea)](_0x156e29[_0x22cb89(0x4e6)],_0x156e29[_0x22cb89(0x3ba)]);return this[_0x22cb89(0x419)][_0x4d4e6a];},Game_System[_0x19393c(0x495)]['savePreservedMorphEventDataKey']=function(_0x364390,_0x118879,_0x4260cf,_0x3b22aa,_0x17882e){const _0x57b96f=_0x19393c;if(this[_0x57b96f(0x419)]===undefined)this[_0x57b96f(0x188)]();const _0x45a9ae=_0x57b96f(0x33e)[_0x57b96f(0x2ea)](_0x364390,_0x118879);this[_0x57b96f(0x419)][_0x45a9ae]={'template':_0x4260cf,'mapId':_0x3b22aa,'eventId':_0x17882e};},Game_System[_0x19393c(0x495)][_0x19393c(0x44a)]=function(_0x175ba7,_0x1f5047){const _0x50177c=_0x19393c;if(this[_0x50177c(0x419)]===undefined)this['initEventsMoveCore']();const _0x30d17f=_0x50177c(0x33e)[_0x50177c(0x2ea)](_0x175ba7,_0x1f5047);delete this['_PreservedEventMorphData'][_0x30d17f];},Game_System[_0x19393c(0x495)]['getMapSpawnedEventData']=function(_0x3b96f0){const _0x99e481=_0x19393c;if(this['_MapSpawnedEventData']===undefined)this[_0x99e481(0x188)]();return this[_0x99e481(0x509)][_0x3b96f0]=this['_MapSpawnedEventData'][_0x3b96f0]||[],this[_0x99e481(0x509)][_0x3b96f0];},Game_System['prototype'][_0x19393c(0x4a9)]=function(_0x25e410){const _0x2ba6ff=_0x19393c,_0x21f133=this[_0x2ba6ff(0x1d8)](_0x25e410);for(const _0x1b1c0d of _0x21f133){if(!_0x1b1c0d)continue;if(_0x1b1c0d[_0x2ba6ff(0x281)])continue;const _0x15562a=_0x21f133[_0x2ba6ff(0x254)](_0x1b1c0d);_0x21f133[_0x15562a]=null;}},Game_System['prototype'][_0x19393c(0x2e6)]=function(){const _0x23ccc6=_0x19393c;this[_0x23ccc6(0x258)]=0x0,this[_0x23ccc6(0x195)]=![];},Game_System[_0x19393c(0x495)][_0x19393c(0x640)]=function(){const _0x4e1402=_0x19393c;if(this[_0x4e1402(0x258)]===undefined)this[_0x4e1402(0x2e6)]();return this[_0x4e1402(0x258)];},Game_System['prototype'][_0x19393c(0x2f4)]=function(_0x1f1e26){const _0xf431b4=_0x19393c;if(this['_followerControlID']===undefined)this[_0xf431b4(0x2e6)]();this[_0xf431b4(0x258)]=_0x1f1e26;;},VisuMZ['EventsMoveCore'][_0x19393c(0x5ea)]=Game_Interpreter[_0x19393c(0x495)][_0x19393c(0x372)],Game_Interpreter['prototype'][_0x19393c(0x372)]=function(_0x32b044){const _0x11a611=_0x19393c;if(!$gameParty[_0x11a611(0x56f)]()&&_0x32b044<0x0){let _0x318e69=$gameSystem[_0x11a611(0x640)]();if(_0x318e69>0x0)return $gamePlayer['followers']()[_0x11a611(0x618)](_0x318e69-0x1);}return VisuMZ[_0x11a611(0x532)][_0x11a611(0x5ea)][_0x11a611(0x496)](this,_0x32b044);},Game_System[_0x19393c(0x495)][_0x19393c(0x47a)]=function(){const _0x182c6e=_0x19393c;if(this[_0x182c6e(0x195)]===undefined)this[_0x182c6e(0x2e6)]();return this['_followerChaseOff'];},Game_System[_0x19393c(0x495)][_0x19393c(0x3ef)]=function(_0x28b86f){const _0x2e027a=_0x19393c;if(this[_0x2e027a(0x195)]===undefined)this[_0x2e027a(0x2e6)]();this[_0x2e027a(0x195)]=_0x28b86f;;},VisuMZ['EventsMoveCore']['Game_Followers_jumpAll']=Game_Followers['prototype'][_0x19393c(0x3a0)],Game_Followers[_0x19393c(0x495)][_0x19393c(0x3a0)]=function(){const _0x341913=_0x19393c;if($gameSystem['isStopFollowerChasing']())return;VisuMZ[_0x341913(0x532)][_0x341913(0x2d0)][_0x341913(0x496)](this);},VisuMZ['EventsMoveCore'][_0x19393c(0x25d)]=Game_Timer[_0x19393c(0x495)][_0x19393c(0x46e)],Game_Timer[_0x19393c(0x495)]['initialize']=function(){const _0x17b6d9=_0x19393c;VisuMZ['EventsMoveCore'][_0x17b6d9(0x25d)][_0x17b6d9(0x496)](this),this[_0x17b6d9(0x188)]();},Game_Timer[_0x19393c(0x495)][_0x19393c(0x188)]=function(){const _0xa6bd5d=_0x19393c;this[_0xa6bd5d(0x205)]=![],this[_0xa6bd5d(0x343)]=-0x1,this[_0xa6bd5d(0x52b)]=0x0;},Game_Timer['prototype']['update']=function(_0x2a00e9){const _0x158d58=_0x19393c;if(!_0x2a00e9)return;if(!this[_0x158d58(0x238)])return;if(this[_0x158d58(0x205)])return;if(this[_0x158d58(0x373)]<=0x0)return;if(this['_speed']===undefined)this['initEventsMoveCore']();this['_frames']+=this[_0x158d58(0x343)],this[_0x158d58(0x373)]<=0x0&&this[_0x158d58(0x2c6)]();},VisuMZ[_0x19393c(0x532)][_0x19393c(0x445)]=Game_Timer[_0x19393c(0x495)][_0x19393c(0x53f)],Game_Timer[_0x19393c(0x495)][_0x19393c(0x53f)]=function(_0x466945){const _0x1e5d41=_0x19393c;VisuMZ[_0x1e5d41(0x532)][_0x1e5d41(0x445)][_0x1e5d41(0x496)](this,_0x466945);if(this[_0x1e5d41(0x205)]===undefined)this[_0x1e5d41(0x188)]();this[_0x1e5d41(0x205)]=![];},VisuMZ[_0x19393c(0x532)][_0x19393c(0x38a)]=Game_Timer[_0x19393c(0x495)][_0x19393c(0x256)],Game_Timer[_0x19393c(0x495)][_0x19393c(0x256)]=function(){const _0x47efa2=_0x19393c;VisuMZ[_0x47efa2(0x532)][_0x47efa2(0x38a)][_0x47efa2(0x496)](this);if(this[_0x47efa2(0x205)]===undefined)this[_0x47efa2(0x188)]();this[_0x47efa2(0x205)]=![];},Game_Timer['prototype'][_0x19393c(0x44d)]=function(){const _0x3f278f=_0x19393c;if(this[_0x3f278f(0x373)]<=0x0)return;this[_0x3f278f(0x205)]=!![],this['_working']=!![];},Game_Timer[_0x19393c(0x495)][_0x19393c(0x18a)]=function(){const _0x282caa=_0x19393c;if(this[_0x282caa(0x373)]<=0x0)return;this[_0x282caa(0x205)]=![],this[_0x282caa(0x238)]=!![];},Game_Timer[_0x19393c(0x495)]['gainFrames']=function(_0x28bc64){const _0x4e62fd=_0x19393c;this[_0x4e62fd(0x373)]=this[_0x4e62fd(0x373)]||0x0,this['_frames']+=_0x28bc64,this['_working']=!![],this[_0x4e62fd(0x373)]=Math[_0x4e62fd(0x31e)](0x1,this[_0x4e62fd(0x373)]);},Game_Timer[_0x19393c(0x495)][_0x19393c(0x173)]=function(_0x3aff92){const _0x9dfa9b=_0x19393c;this[_0x9dfa9b(0x373)]=this[_0x9dfa9b(0x373)]||0x0,this['_frames']=_0x3aff92,this[_0x9dfa9b(0x238)]=!![],this[_0x9dfa9b(0x373)]=Math[_0x9dfa9b(0x31e)](0x1,this[_0x9dfa9b(0x373)]);},Game_Timer[_0x19393c(0x495)][_0x19393c(0x3ee)]=function(_0x157748){const _0x50fdca=_0x19393c;this[_0x50fdca(0x343)]=_0x157748,this['_working']=!![],_0x157748>0x0&&(this[_0x50fdca(0x373)]=Math[_0x50fdca(0x31e)](this[_0x50fdca(0x373)],0x1));},Game_Timer[_0x19393c(0x495)][_0x19393c(0x197)]=function(_0x506434){const _0x2837df=_0x19393c;if(this[_0x2837df(0x52b)]===undefined)this[_0x2837df(0x188)]();this[_0x2837df(0x52b)]=_0x506434;},VisuMZ[_0x19393c(0x532)]['Game_Timer_onExpire']=Game_Timer[_0x19393c(0x495)][_0x19393c(0x2c6)],Game_Timer[_0x19393c(0x495)][_0x19393c(0x2c6)]=function(){const _0x5616b9=_0x19393c;if(this[_0x5616b9(0x52b)]===undefined)this[_0x5616b9(0x188)]();this[_0x5616b9(0x52b)]?$gameTemp[_0x5616b9(0x38f)](this[_0x5616b9(0x52b)]):VisuMZ[_0x5616b9(0x532)][_0x5616b9(0x606)][_0x5616b9(0x496)](this);},VisuMZ['EventsMoveCore']['Game_Message_add']=Game_Message[_0x19393c(0x495)][_0x19393c(0x30e)],Game_Message[_0x19393c(0x495)]['add']=function(_0x456256){const _0x1f95b6=_0x19393c;VisuMZ[_0x1f95b6(0x532)][_0x1f95b6(0x187)][_0x1f95b6(0x496)](this,_0x456256),this['_selfEvent']=$gameTemp[_0x1f95b6(0x3f8)]();},Game_Message[_0x19393c(0x495)][_0x19393c(0x1e4)]=function(){const _0x2da9e3=_0x19393c;$gameTemp[_0x2da9e3(0x261)](this[_0x2da9e3(0x2b8)]);},VisuMZ['EventsMoveCore'][_0x19393c(0x297)]=Game_Switches[_0x19393c(0x495)]['value'],Game_Switches[_0x19393c(0x495)][_0x19393c(0x2bb)]=function(_0x20c04d){const _0x3f00ed=_0x19393c;if(DataManager[_0x3f00ed(0x601)](_0x20c04d))return!!this[_0x3f00ed(0x222)](_0x20c04d);else{if(DataManager[_0x3f00ed(0x55c)](_0x20c04d))return!!this[_0x3f00ed(0x2d7)](_0x20c04d);else return DataManager[_0x3f00ed(0x568)](_0x20c04d)?!!this[_0x3f00ed(0x27e)](_0x20c04d):VisuMZ['EventsMoveCore'][_0x3f00ed(0x297)][_0x3f00ed(0x496)](this,_0x20c04d);}},Game_Switches[_0x19393c(0x3f3)]={},Game_Switches['prototype']['advancedValue']=function(_0x3d17d4){const _0xfff046=_0x19393c;if(!Game_Switches[_0xfff046(0x3f3)][_0x3d17d4]){$dataSystem[_0xfff046(0x54b)][_0x3d17d4][_0xfff046(0x1cb)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x25183a=_0xfff046(0x341)[_0xfff046(0x2ea)](String(RegExp['$1']));Game_Switches['advancedFunc'][_0x3d17d4]=new Function(_0xfff046(0x519),_0x25183a);}const _0xb9c214=$gameTemp[_0xfff046(0x3f8)]()||this;return Game_Switches[_0xfff046(0x3f3)][_0x3d17d4][_0xfff046(0x496)](_0xb9c214,_0x3d17d4);},Game_Switches['prototype'][_0x19393c(0x2d7)]=function(_0x333984){const _0x2ec164=_0x19393c,_0x5dac41=$gameTemp['getSelfTarget']()||this;if(_0x5dac41[_0x2ec164(0x5e9)]!==Game_Event)return VisuMZ['EventsMoveCore'][_0x2ec164(0x297)]['call'](this,_0x333984);else{const _0x739a18=[_0x5dac41[_0x2ec164(0x4e6)],_0x5dac41[_0x2ec164(0x3ba)],_0x2ec164(0x37b)[_0x2ec164(0x2ea)](_0x333984)];return $gameSelfSwitches[_0x2ec164(0x2bb)](_0x739a18);}},Game_Switches[_0x19393c(0x495)][_0x19393c(0x27e)]=function(_0x1e58fa){const _0x3628ef=_0x19393c,_0x2a98ef=$gameMap?$gameMap['mapId']():0x0,_0x34bfdb=[0x0,0x0,_0x3628ef(0x2ef)[_0x3628ef(0x2ea)](_0x2a98ef,_0x1e58fa)];return $gameSelfSwitches['value'](_0x34bfdb);},VisuMZ[_0x19393c(0x532)][_0x19393c(0x4d9)]=Game_Switches['prototype'][_0x19393c(0x443)],Game_Switches[_0x19393c(0x495)][_0x19393c(0x443)]=function(_0x6533dc,_0x4cdc3f){const _0x1379ac=_0x19393c;if(DataManager['isSelfSwitch'](_0x6533dc))this[_0x1379ac(0x1e6)](_0x6533dc,_0x4cdc3f);else DataManager[_0x1379ac(0x568)](_0x6533dc)?this[_0x1379ac(0x43e)](_0x6533dc,_0x4cdc3f):VisuMZ[_0x1379ac(0x532)][_0x1379ac(0x4d9)][_0x1379ac(0x496)](this,_0x6533dc,_0x4cdc3f);},Game_Switches[_0x19393c(0x495)][_0x19393c(0x1e6)]=function(_0x43e01a,_0x46fe99){const _0x5733da=_0x19393c,_0x39553d=$gameTemp[_0x5733da(0x3f8)]()||this;if(_0x39553d['constructor']!==Game_Event)VisuMZ[_0x5733da(0x532)][_0x5733da(0x4d9)]['call'](this,_0x43e01a,_0x46fe99);else{const _0x334be6=[_0x39553d[_0x5733da(0x4e6)],_0x39553d[_0x5733da(0x3ba)],_0x5733da(0x37b)[_0x5733da(0x2ea)](_0x43e01a)];$gameSelfSwitches[_0x5733da(0x443)](_0x334be6,_0x46fe99);}},Game_Switches[_0x19393c(0x495)][_0x19393c(0x43e)]=function(_0x923dd8,_0x144952){const _0x4ffe3a=_0x19393c,_0x227f23=$gameMap?$gameMap[_0x4ffe3a(0x473)]():0x0,_0x2d4818=[0x0,0x0,_0x4ffe3a(0x2ef)[_0x4ffe3a(0x2ea)](_0x227f23,_0x923dd8)];return $gameSelfSwitches[_0x4ffe3a(0x443)](_0x2d4818,_0x144952);},VisuMZ[_0x19393c(0x532)][_0x19393c(0x477)]=Game_Variables[_0x19393c(0x495)]['value'],Game_Variables[_0x19393c(0x495)]['value']=function(_0x5a4acb){const _0x3a2696=_0x19393c;if(DataManager[_0x3a2696(0x4aa)](_0x5a4acb))return this[_0x3a2696(0x222)](_0x5a4acb);else{if(DataManager[_0x3a2696(0x32e)](_0x5a4acb))return this[_0x3a2696(0x2d7)](_0x5a4acb);else return DataManager['isMapVariable'](_0x5a4acb)?this[_0x3a2696(0x27e)](_0x5a4acb):VisuMZ[_0x3a2696(0x532)][_0x3a2696(0x477)][_0x3a2696(0x496)](this,_0x5a4acb);}},Game_Variables[_0x19393c(0x3f3)]={},Game_Variables[_0x19393c(0x495)][_0x19393c(0x222)]=function(_0x3e66c2){const _0x40c9a1=_0x19393c;if(!Game_Variables[_0x40c9a1(0x3f3)][_0x3e66c2]){$dataSystem[_0x40c9a1(0x16d)][_0x3e66c2][_0x40c9a1(0x1cb)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x1c24b1=_0x40c9a1(0x341)['format'](String(RegExp['$1']));Game_Variables[_0x40c9a1(0x3f3)][_0x3e66c2]=new Function(_0x40c9a1(0x354),_0x1c24b1);}const _0x3beff7=$gameTemp[_0x40c9a1(0x3f8)]()||this;return Game_Variables[_0x40c9a1(0x3f3)][_0x3e66c2]['call'](_0x3beff7,_0x3e66c2);},Game_Variables[_0x19393c(0x495)][_0x19393c(0x2d7)]=function(_0x24c33b){const _0x3dc61e=_0x19393c,_0x208250=$gameTemp[_0x3dc61e(0x3f8)]()||this;if(_0x208250[_0x3dc61e(0x5e9)]!==Game_Event)return VisuMZ[_0x3dc61e(0x532)]['Game_Variables_value'][_0x3dc61e(0x496)](this,_0x24c33b);else{const _0x5478db=[_0x208250['_mapId'],_0x208250[_0x3dc61e(0x3ba)],'Self\x20Variable\x20%1'[_0x3dc61e(0x2ea)](_0x24c33b)];return $gameSelfSwitches[_0x3dc61e(0x2bb)](_0x5478db);}},Game_Variables[_0x19393c(0x495)][_0x19393c(0x27e)]=function(_0x4cea84){const _0x33ccc1=_0x19393c,_0x3b6803=$gameMap?$gameMap['mapId']():0x0,_0x4ca36c=[0x0,0x0,'Map\x20%1\x20Variable\x20%2'[_0x33ccc1(0x2ea)](_0x3b6803,_0x4cea84)];return $gameSelfSwitches[_0x33ccc1(0x2bb)](_0x4ca36c)||0x0;},VisuMZ[_0x19393c(0x532)][_0x19393c(0x57e)]=Game_Variables['prototype'][_0x19393c(0x443)],Game_Variables[_0x19393c(0x495)][_0x19393c(0x443)]=function(_0x3a63c4,_0x204b85){const _0x583098=_0x19393c;if(DataManager[_0x583098(0x32e)](_0x3a63c4))this[_0x583098(0x1e6)](_0x3a63c4,_0x204b85);else DataManager[_0x583098(0x2ae)](_0x3a63c4)?this['setMapValue'](_0x3a63c4,_0x204b85):VisuMZ[_0x583098(0x532)]['Game_Variables_setValue'][_0x583098(0x496)](this,_0x3a63c4,_0x204b85);},Game_Variables[_0x19393c(0x495)][_0x19393c(0x1e6)]=function(_0x4f01b8,_0x548bfb){const _0x35c100=_0x19393c,_0x2dd27a=$gameTemp[_0x35c100(0x3f8)]()||this;if(_0x2dd27a[_0x35c100(0x5e9)]!==Game_Event)VisuMZ[_0x35c100(0x532)][_0x35c100(0x57e)][_0x35c100(0x496)](this,_0x4f01b8,_0x548bfb);else{const _0x3980fd=[_0x2dd27a[_0x35c100(0x4e6)],_0x2dd27a[_0x35c100(0x3ba)],_0x35c100(0x2e0)['format'](_0x4f01b8)];$gameSelfSwitches[_0x35c100(0x443)](_0x3980fd,_0x548bfb);}},Game_Variables[_0x19393c(0x495)][_0x19393c(0x43e)]=function(_0x13d654,_0x4a6eda){const _0x4ac6a0=_0x19393c,_0x1fa29c=$gameMap?$gameMap[_0x4ac6a0(0x473)]():0x0,_0x148579=[0x0,0x0,'Map\x20%1\x20Variable\x20%2'['format'](_0x1fa29c,_0x13d654)];$gameSelfSwitches[_0x4ac6a0(0x443)](_0x148579,_0x4a6eda);},VisuMZ[_0x19393c(0x532)][_0x19393c(0x1be)]=Game_SelfSwitches[_0x19393c(0x495)]['value'],Game_SelfSwitches[_0x19393c(0x495)][_0x19393c(0x2bb)]=function(_0x171049){const _0x341b48=_0x19393c;if(_0x171049[0x2][_0x341b48(0x1cb)](/(?:SELF|MAP)/i))return this[_0x341b48(0x2d7)](_0x171049);else{return VisuMZ[_0x341b48(0x532)][_0x341b48(0x1be)]['call'](this,_0x171049);;}},Game_SelfSwitches[_0x19393c(0x495)][_0x19393c(0x2d7)]=function(_0x208cd1){const _0x10170b=_0x19393c;return _0x208cd1[0x2][_0x10170b(0x1cb)](/VAR/i)?this[_0x10170b(0x1f1)][_0x208cd1]||0x0:!!this[_0x10170b(0x1f1)][_0x208cd1];},VisuMZ['EventsMoveCore'][_0x19393c(0x16b)]=Game_SelfSwitches[_0x19393c(0x495)][_0x19393c(0x443)],Game_SelfSwitches[_0x19393c(0x495)][_0x19393c(0x443)]=function(_0x3543e8,_0x5ff1f9){const _0x2e64c4=_0x19393c;_0x3543e8[0x2][_0x2e64c4(0x1cb)](/(?:SELF|MAP)/i)?this[_0x2e64c4(0x1e6)](_0x3543e8,_0x5ff1f9):VisuMZ['EventsMoveCore'][_0x2e64c4(0x16b)][_0x2e64c4(0x496)](this,_0x3543e8,_0x5ff1f9);},Game_SelfSwitches['prototype'][_0x19393c(0x1e6)]=function(_0x6b157e,_0x31778b){const _0x88c620=_0x19393c;this['_data'][_0x6b157e]=_0x6b157e[0x2]['match'](/VAR/i)?_0x31778b:!!_0x31778b,this[_0x88c620(0x5b9)]();},VisuMZ[_0x19393c(0x532)][_0x19393c(0x4c0)]=Scene_Map[_0x19393c(0x495)][_0x19393c(0x4bd)],Scene_Map[_0x19393c(0x495)]['createDisplayObjects']=function(){const _0x1ae8d4=_0x19393c;$gameMap[_0x1ae8d4(0x5dd)](),VisuMZ[_0x1ae8d4(0x532)][_0x1ae8d4(0x4c0)]['call'](this);},Game_Map[_0x19393c(0x495)][_0x19393c(0x5dd)]=function(){const _0x397523=_0x19393c;if(this[_0x397523(0x1c3)]===this[_0x397523(0x473)]())return;this[_0x397523(0x1c3)]=this['mapId'](),this['_eventCache']=undefined;const _0xb89eec=this['events']();for(const _0x175d0f of _0xb89eec){if(_0x175d0f)$gameSelfSwitches[_0x397523(0x437)](_0x175d0f);}},Game_SelfSwitches['prototype'][_0x19393c(0x437)]=function(_0xadf26f){const _0x36e3c6=_0x19393c;if(!_0xadf26f)return;if(!_0xadf26f[_0x36e3c6(0x5ab)]())return;const _0x185be7=_0xadf26f['event']()[_0x36e3c6(0x58c)]||'';if(_0x185be7[_0x36e3c6(0x1cb)](/<(?:EXIT RESET|EXIT|TEMP|TEMPORARY) (?:SELF|SELF SWITCH|SELF SWITCHES|SELF DATA)>/i)){const _0x5282c3=_0x36e3c6(0x5da)[_0x36e3c6(0x2ea)]($gameMap[_0x36e3c6(0x4e6)],_0xadf26f[_0x36e3c6(0x3ba)]),_0x4a4286=Object[_0x36e3c6(0x381)](this[_0x36e3c6(0x1f1)])['filter'](_0x253210=>_0x253210[_0x36e3c6(0x3be)](_0x5282c3));while(_0x4a4286['length']>0x0){const _0x383fa4=_0x4a4286[_0x36e3c6(0x365)]();delete this[_0x36e3c6(0x1f1)][_0x383fa4];}}},Game_SelfSwitches[_0x19393c(0x495)]['resetSelfSwitchesForMap']=function(_0x20edde){const _0x2c2216=_0x19393c,_0x2e0e0c=_0x2c2216(0x3dd)[_0x2c2216(0x2ea)]($gameMap[_0x2c2216(0x4e6)]),_0x2551de=Object[_0x2c2216(0x381)](this[_0x2c2216(0x1f1)])[_0x2c2216(0x166)](_0x5976fe=>_0x5976fe[_0x2c2216(0x3be)](_0x2e0e0c));while(_0x2551de['length']>0x0){const _0xd23f22=_0x2551de[_0x2c2216(0x365)]();delete this['_data'][_0xd23f22];}_0x20edde===$gameMap[_0x2c2216(0x473)]()&&$gameMap['requestRefresh']();},VisuMZ[_0x19393c(0x532)]['Game_Enemy_meetsSwitchCondition']=Game_Enemy[_0x19393c(0x495)][_0x19393c(0x37e)],Game_Enemy[_0x19393c(0x495)]['meetsSwitchCondition']=function(_0x3cc0ef){const _0xb7fe32=_0x19393c;$gameTemp['registerSelfTarget'](this);const _0x41e966=VisuMZ[_0xb7fe32(0x532)][_0xb7fe32(0x47b)][_0xb7fe32(0x496)](this,_0x3cc0ef);return $gameTemp[_0xb7fe32(0x1a6)](),_0x41e966;},VisuMZ[_0x19393c(0x532)][_0x19393c(0x39b)]=Game_Party[_0x19393c(0x495)][_0x19393c(0x5ae)],Game_Party[_0x19393c(0x495)][_0x19393c(0x5ae)]=function(){const _0x102270=_0x19393c;if(this['isPlayerWithinEncounterHalfEvents']())return!![];return VisuMZ['EventsMoveCore'][_0x102270(0x39b)][_0x102270(0x496)](this);},Game_Party[_0x19393c(0x495)]['isPlayerWithinEncounterHalfEvents']=function(){const _0x469206=_0x19393c;if(this[_0x469206(0x527)])return![];return $isTileEncounterHalf($gamePlayer['x'],$gamePlayer['y']);},VisuMZ[_0x19393c(0x532)][_0x19393c(0x251)]=Game_Party[_0x19393c(0x495)][_0x19393c(0x36d)],Game_Party['prototype'][_0x19393c(0x36d)]=function(){const _0x5df3c1=_0x19393c;if(this[_0x5df3c1(0x22c)]())return!![];return VisuMZ['EventsMoveCore'][_0x5df3c1(0x251)][_0x5df3c1(0x496)](this);},Game_Party['prototype'][_0x19393c(0x22c)]=function(){const _0x4de6fa=_0x19393c;if(this[_0x4de6fa(0x527)])return![];return $isTileEncounterNone($gamePlayer['x'],$gamePlayer['y']);};function _0x5ef3(){const _0x4a1d7=['_forceDashing','direction','setMoveRoute','processMoveRouteMoveUntilStop','checkSmartEventCollision','Game_Interpreter_executeCommand','isRunning','VS8','startScale','Boat','roundYWithDirection','attachPictureType','getEventIconIndex','width','isMapPassable','startMapCommonEventOnTouch','_spriteOffsetX','VisibleRange','IconBlendMode','VehicleAllow','processMoveSynchMimic','Game_Switches_setValue','moveDiagonally','registerCommand','BufferY','moveTowardCharacter','away','checkEventTriggerAuto','_labelWindow','boxWidth','_mirrorSprite','isEventOverloaded','SLEEP','arc','_mapId','DiagonalSpeedMultiplier','MsgPopupEvent','turn180','circle','update','name','VariableId','_scene','Window_NumberInput_start','square','template','Game_CharacterBase_canPass','Game_CharacterBase_initMembers','meetActivationRegionConditions','_moveRoute','processMoveRoutePatternLock','_visiblePlayerY','_characterSprites','Scene_Boot_onDatabaseLoaded','down','Game_Event_canPass','Preserve','FALSE','needsUpdate','region','JSON','characterPatternY','despawnEventId','_eventSpawnData','isSpawnHitboxCollisionOk','MessageCore','CPC','StopAutoMoveEvents','NOTE','_MapSpawnedEventData','EventTemplates','_EventIcons','initMoveSpeed','clearStepPattern','eventLabelsVisible','_advancedSwitchVariable','_characterName','_targetY','_requestSaveEventLocation','_lastAttachPictureMaxSize','_commonEventId','SpawnEventDespawnAtXY','updateDuration','createLabelWindowForTarget','player','switchId','left','ship','page','_offsetY','regionId','_selfTargetItemChoice','splice','checkEventTriggerHere','forceMoveRoute','executeMoveDir8','Game_Followers_isVisible','_screenParallel','PathfindMobileEnabled','_checkEncounterRaw','Game_Player_checkEventTriggerThere','RandomMoveWeight','drawIcon','_expireCommonEvent','getDirectionFromPoint','pow','TiltRight','updateBitmapSmoothing','processMoveRouteMoveToCharacter','_regionRules','EventsMoveCore','firstSpawnedEventID','spriteId','Game_Player_increaseSteps','processMoveRouteMoveTo','EventLocationDelete','createSpawnedEventWithData','_hidden','_trigger','_settings','isShadowVisible','Sprite_Character_initMembers','ARRAYEVAL','start','_spawnedEvents','_shadowGraphic','setHue','hasStepAnime','resetIconsOnEventsData','PosX','updateParallel','processMoveSynchAway','updateWaitMode','meetsCPC','Step2MapId','switches','_tilemap','smooth','EventTimerFramesSet','LIGHT\x20BULB','_eventIconSprite','RangeType','isActive','FastForwardKey','FollowerID','fadeIn','_arcPeak','updatePeriodicRefresh','Game_CharacterBase_screenX','DOWN','Scene_Map_onMapLoadedEncErase','mirror\x20horizontal','isSelfSwitch','SuccessSwitchId','Game_Temp_setDestination','createShadow','HEART','Game_Interpreter_updateWaitMode','TargetSwitchId','FontSize','updateVS8BalloonOffsets','MorphEventTo','_opacity','processMoveSynchRandom','isMapSwitch','hueShift','CallEvent','isSpriteVS8dir','DefaultShadow','clear','isPlaytest','inBattle','createAttachPictureSprite','MessageText','isInvisibleCharacter','%1DockRegionOnly','initEventsMoveCoreEffects','Game_Interpreter_PluginCommand','isLongPressed','visible','shadowX','_scaleY','ALLOW_LADDER_DASH','moveTypeRandom','QUESTION','activationProximityType','Game_Variables_setValue','_erased','charAt','MULTIPLY','createSaveEventLocationData','startScaleX','Game_CharacterBase_bushDepth','onLoadAttachPicture','isEventRunning','turnRight90','NUM','Movement','copy','Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1','note','clearDestination','_patternLocked','processDrawIcon','scale','_lastAttachPictureFilename','padding','parallelCommonEvents','Game_Map_setupEvents','rangeType','roundY','_PlayerDiagonalSetting','canPass','random','getPosingCharacterDirection','getPosingCharacterIndex','_hue','RIGHT\x20TO\x20LEFT','PopupExtra','switch2Valid','ARRAYSTRUCT','timerText','lastMovedDirection','SelfSwitchID','_targetScaleY','isDashDisabled','Map\x20%1\x20Variable\x20%2','isObjectCharacter','ARRAYFUNC','saveEventLocation','Game_CharacterBase_realMoveSpeed','event','addChild','processMoveRouteMoveRepeat','hasEncounterHalf','EventTimerPause','processMoveRouteSelfVariable','Window_EventItem_onCancel','setDiagonalDirection','length','PostSpawnJS','_diagonalSupport','RegionTouch','_moveSynch','BitmapSmoothing','onChange','PostCopyJS','Dock','Game_Event_clearPageSettings','CarryPose','lastSpawnedEvent','ADDITIVE','clearAttachPictureSettings','Direction','isAirshipPassable','RegionOkTarget','updateTextScale','LEFT','autosaveEventLocation','isTransparent','processOk','code','updateTextAngle','Game_Follower_initialize','_callEventData','bufferY','Collision','_screenZoomScale','Toggle','labelWindowRangeType','setupPageSettings','loadPicture','processMoveRouteStepToCharacter','_moveSpeed','diamond','Template','turnAwayFromCharacter','eventsXy','%1,%2,','_displayY','isRegionForbidPass','resetExitSelfSwitches','isMoving','_stepPattern','ARRAYSTR','Game_Player_isDashing','_saveEventLocations','_lastAttachPictureType','Operation','27SXhdXQ','SwitchGetSelfSwitchABCD','SWEAT','getLastPluginCommandInterpreter','constructor','Game_Interpreter_character','_cacheVisibility','unlockEvent','endScaleX','turnLeft90','NORMAL','text','referEvent','createShadows','slice','deleteEventLocation','_cacheSystemVisible','updateOpacity','clearDashing','processMoveSynchReverseMimic','isInsideLabelRange','blendMode','UPPER\x20LEFT','_fadeOutStart','_proxyWindow','characterPatternYBasic','_pose','setDirection','isAdvancedSwitch','labelWindowText','useCarryPoseForIcons','FollowerSetControl','COBWEB','Game_Timer_onExpire','getPlayerDiagonalSetting','_customZ','setupChild','setEventIconData','executeCommandCommonEvent','isMobileDevice','FollowerSetGlobalChase','Game_Event_start','VisuMZ_Setup_Preload_Map','Spriteset_Map_createLowerLayer','TemplateName','processEraseEncounterEvents','isAnyEventStarting','moveBackToRandomHome','$preloadedMap_%1','processMoveRouteStepTo','Game_Event_checkEventTriggerAuto','follower','_scaleBaseX','sv\x20enemy','type','shadowY','_startScaleX','_targetAngle','exit','ApplyPopupExtraSettings','Airship','Icon','trigger','roundXWithDirection','forceDashing','setCharacterSpriteSheetInvisible','_forceHidePlayer','mainFontSize','_eventOverload','Spriteset_Map_createShadow','refreshEventLabels','Minutes','innerWidth','chaseCharacter','toUpperCase','findDiagonalDirectionTo','StrictCollision','Game_Map_event','List','_checkRelocateNotetag','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','RIGHT','TiltVert','_attachPictureSprite','EventLabelVisible','maxSize','command108','Game_CharacterBase_setDirection','lock','Label','processMoveCommand','getControlledFollowerID','DashEnableToggle','_startScaleY','filter','eraseEvent','Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a','PlayerAllow','fadeDuration','Game_SelfSwitches_setValue','WalkAllow','variables','_stopCount','ShipSpeed','_seconds','_chaseOff','Hours','setFrames','setItemChoice','EventIconChange','clamp','tileWidth','$callEventMap','_scaleX','getPose','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','OffsetX','getAttachPictureBitmapHeight','updateSpritePosition','iconSize','Game_Message_setItemChoice','HMPH','iconWidth','opacity','EventTimerResume','15603ynLDZO','1342990ZsIVDw','Game_Message_add','initEventsMoveCore','checkValidEventerMap','resume','Window_ScrollText_startMessage','_actuallyMoving','Region','visibleRange','EventIconChangeForced','setupEventsMoveCoreNotetags','endOffset','updateAttachPictureBitmap','createSpawnedEvent','min','_followerChaseOff','makeDeepCopy','setCommonEvent','correctFacingDirection','_currentArc','_text','Sprite_Balloon_updatePosition','push','ROUTE_SCRIPT','some','originalText','forced','VisuMZ_1_MessageCore','MapId','_offsetX','horz\x20mirror','CustomPageConditions','clearSelfTarget','processMoveRouteAnimation','SpawnEventDespawnRegions','Name','_alwaysUpdateMove','MobileEnabled','isTargetEventValidForLabelWindow','tileHeight','BufferX','ARRAYNUM','isMovementSucceeded','getDirectionToPoint','updateMoveSynch','updateFadeIn','_isCharacterSpriteSheetInvisible','_visiblePlayerX','EVAL','shadowFilename','initMembers','ShowShadows','processMoveSynchApproach','VariableGetSelfVariableID','isSmartEventCollisionOn','Game_Event_event','Game_SelfSwitches_value','updatePose','processMoveSynchMirrorHorz','LEFT\x20TO\x20RIGHT','_selfTargetNumberInput','_lastSesetExitSelfSwitchesMapId','resizeWindow','IconSet','EventLabelRefresh','_cpc','EnableTurnInPlace','isDestinationValid','getPosingCharacterPattern','match','_screenParallelOnce','EventIconDelete','COLLAPSE','General','AutoBuffer','Scene_Load_onLoadSuccess','clearPageSettings','adjustX','updateShadowChanges','isEventsMoveCoreInvisible','trim','isValid','getMapSpawnedEventData','floor','setTileBitmap','_moveAllowPlayerCollision','hasMoveOnlyRegions','apply','_lastAttachPictureScale','Game_Map_events','itemPadding','DEFAULT_SHIFT_Y','TerrainTags','_realX','registerSelfEvent','createCharacterShadow','setSelfValue','_eventErased','clearPose','96566rqajvk','move','isSpawnedEvent','isNearTheScreen','autoEventIconBuffer','SPIN\x20CW','_characterIndex','isBoat','_data','Game_Event_isCollidedWithPlayerCharacters','findTargetSprite','IconBufferY','updateFadeOut','DashingEnable','filename','toLowerCase','_realY','attachPictureScale','SpawnEventAtRegion','_filename','Game_Event_locate','directionOnLadderSpriteVS8dir','opacitySpeed','absDistance','moveTowardPoint','setupAttachPictureBitmap','refreshIfNeeded','row','_paused','description','patternWidth','increaseSteps','_event','getTileExpandData','_addedHitbox','bufferX','Game_Event_checkEventTriggerTouch','split','processMoveRouteSetIndex','blt','attachPictureMaxSize','activationRegionList','ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20remove\x20usage.','checkActivationProximity','despawnEverything','vert\x20mirror','executeCommand','isAllowEventAutoMovement','checkNeedForPeriodicRefresh','picture','Game_Event_meetsConditionsCPC','turnTowardPoint','_waitMode','Game_Troop_meetsConditionsCPC','LOWER\x20RIGHT','startMapCommonEventOnOK','createLabelWindows','advancedValue','%1%2','setCharacterBitmap','AutoMoveEvents','updatePosition','VehicleDock','tileCoordinates','processMoveRouteStepFrom','CPCsMet','checkEventTriggerThere','isPlayerWithinEncounterNoneEvents','Value','Scene_Map_startEncounterEffect','bushDepth','_lastMovedDirection','erase','reverseDir','posEventsMoveCore','characterIndexVS8','turnAwayFromPoint','You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a','Window_Message_startMessage','_working','includes','TurnInPlaceDelay','EventId','eventsXyNt','EventTimerSpeed','isJumping','processSaveEventLocation','GetMoveSynchTarget','turnTowardCharacter','AdvancedVariables','zoomScale','_eventScreenY','_forceShowPlayer','front','EXCLAMATION','iconHeight','isPassableByAnyDirection','canUpdate','meetsConditions','isPassable','processMoveCommandEventsMoveCore','_inputTime','7300210mgrjyc','setEventIconDataKey','Game_Party_hasEncounterNone','isPosing','Game_CharacterBase_isDashing','indexOf','_attachPicture','stop','_CPCs','_followerControlID','command357','isMoveOnlyRegionPassable','opacityDelta','deleteSavedEventLocationKey','Game_Timer_initialize','Passability','round','Sprite_Character_update','registerSelfTarget','areFollowersForceShown','_eventCache','removeMorph','MUSIC','isAirship','updateEventMirrorSprite','characterIndex','loadDataFile','setDashingEnabled','drawText','processMoveSynch','Game_Follower_chaseCharacter','Game_Player_checkEventTriggerHere','Step1MapId','frontX','_eventLabelOffsetX','IconBufferX','updateEventLabelText','reverse\x20copy','screenY','metCPC','regionList','EventForbid','isPlayerForceHidden','reverse\x20mimic','setPosition','isLandOk','processMoveRouteFadeIn','mapValue','canStartLocalEvents','_eventCopyData','_spawnPreserved','USER-DEFINED\x205','isBusy','DashModifier','Allow','frontY','_fadeOutDuration','setEventLabelsVisible','EnableDir8','drawing','MapVariables','Hidden','processMoveSynchCustom','clearEventCache','PostMorphJS','endOffsetY','createIconSprite','updateText','endAngle','processMoveRouteJumpForward','_forceCarrying','contentsOpacity','Game_Switches_value','MOBILE_DIAGONAL_PATHFINDING','Forbid','rotation','process_VisuMZ_EventsMoveCore_LoadTemplateMaps','EventIconRestore','updateStop','parse','onClickTrigger','_poseDuration','convertSelfVariableValuesInScriptCall','Seconds','Map%1.json','isSaveEventLocations','forceCarrying','deltaYFrom','fadeInDuration','offsetY','Game_CharacterBase_isTransparent','updateScale','destinationX','checkEventsMoveCoreStringTags','textSizeEx','isMapVariable','Frames','_needsPeriodicRefresh','Game_Player_isMapPassable','OffsetY','PreCopyJS','createProxyWindow','bind','prepareSpawnedEventAtRegion','_callEventMap','_selfEvent','_direction','setWaitMode','value','12ybkfKE','Game_CharacterBase_increaseSteps','SelfSwitches','switch1Valid','updateEventIconSprite','_vehicleType','approach','Game_Message_setNumberInput','Visible','morphInto','onExpire','Window_EventItem_onOk','requestRefresh','ccwX','_lastPluginCommandInterpreter','Game_Troop_meetsConditions','setupSaveEventLocations','sqrt','_eventIcon','processMoveRouteSelfSwitch','Game_Followers_jumpAll','_startY','USER-DEFINED\x203','pos','labelWindowRange','_type','_commonEvents','selfValue','VisibleEventLabels','Step2Preserve','Game_Character_processMoveCommand','updateTileFrame','loadSvEnemy','getInputDir8','prepareSpawnedEventAtTerrainTag','fontSize','Self\x20Variable\x20%1','checkRegionEventTrigger','hasCPCs','fittingHeight','Ship','isBattleTest','initFollowerController','moveStraight','MUSIC-NOTE','switch1Id','format','jump','MapSwitches','eventId','_DisablePlayerControl','Map\x20%1\x20Switch\x20%2','setup','LOVE','createEventsMoveCoreMessagePopup','duration','setControlledFollowerID','resetIconsOnEventsDataKey','startOffsetX','BalloonOffsetY','_forceHideFollower','Disable','_moveOnlyRegions','attachPictureSettings','moveAwayFromCharacter','Game_Vehicle_isLandOk','execute','log','processMoveRouteFadeOut','createEventsMoveCoreTileMessagePopup','PlayerForbid','firstSpawnedEvent','isPressed','_clickTrigger','executeMove','Walk','updateHueShift','cwY','EventID','UNTITLED','hasDragonbones','updateEventsAndMovementCore','add','AdvancedSwitches','concat','Game_CommonEvent_isActive','_textSprite','parameters','isSupportDiagonalMovement','restoreSavedEventPosition','HURT','backY','setupSpawnTest','isInVehicle','addLoadListener','_interpreter','VisuMZ_0_CoreEngine','areFollowersForceHidden','max','SelfDataResetAll','%1:%2','pageIndex','TileY','findDirectionTo','setupSpawnedEvents','isTile','moveAwayFromPoint','isLabelVisible','BoatSpeed','Settings','setFrame','_startAngle','hasAdvancedSwitchVariable','clearCarrying','isSelfVariable','despawnAtXY','determineCommonEventsWithCPC','processMoveRouteJumpTo','delta','isCollidedWithEvents','despawnRegions','AllAllow','Game_Player_getInputDirection','_encounterEffectDuration','_encounterNoneProximity','_visibleEventX','offsetX','deleteIconsOnEventsDataKey','createContents','ITEM','Map%1-Event%2','removeChild','angle','return\x20%1','ANGER','_speed','list','startScaleY','remove','_shadowSprite','Letter','updateMove','_activationProximity','SpawnEventDespawnTerrainTags','moveForward','locate','hideShadows','setupDiagonalSupport','TRUE','drawTextEx','Game_Event_setupPageSettings','Game_Map_parallelCommonEvents','variableId','_wholeDuration','SPIN\x20COUNTERCLOCKWISE','updateScaleBase','parent','adjustMoveSynchOpacityDelta','processMoveRouteHugWall','RemovePreserve','IconIndex','ARRAYJSON','_shadowOpacity','_eventPageIndex','ZZZ','Game_Vehicle_initMoveSpeed','isEventClickTriggered','initEventsMoveCoreSettings','fadeOutDuration','shift','Game_Event_update','destinationY','_dragonbones','Game_Map_setup','restoreIconsOnEventsDataKey','onOk','_selfTarget','hasEncounterNone','startCallEvent','_fadeInDuration','startMapCommonEventOnOKTarget','Window_NumberInput_processOk','character','_frames','KNEEL','isPlayerControlDisabled','abs','Game_Event_moveTypeRandom','3070168cmVEOW','determineEventOverload','conditions','Self\x20Switch\x20%1','isAllowCharacterTilt','posNt','meetsSwitchCondition','_EventsMoveCoreSettings','checkEventTriggerTouch','keys','Sprite_Character_setTileBitmap','getSavedEventLocation','bitmap','mirror\x20horz','_tileId','misc','OFF','_randomMoveWeight','Game_Timer_stop','_periodicRefreshTimer','isRegionAllowPass','horizontal\x20mirror','Rope','reserveCommonEvent','VICTORY','_comments','terrainTag','pageId','updatePattern','Event','followers','FUNC','DIAGONAL_PATHFINDING_EVENT_LIMIT','processEraseEncounterSpawn','_visibleEventY','Game_Party_hasEncounterHalf','Chase','Game_Map_update','SwitchId','attachPictureBlendMode','jumpAll','_saveEventLocation','Game_CharacterBase_updatePattern','Vehicle','SpawnEventAtTerrainTag','realMoveSpeed','_encounterHalfProximity','map','destroy','_SavedEventLocations','isPlayerForceShown','Game_CharacterBase_moveStraight','timer','updatePatternEventsMoveCore','417197vTIXZO','createDummyWindow','_eventLabelOffsetY','setupEventsMoveCoreCommentTags','end','distance','StopAutoMoveMessages','getDiagonalDestination','screenX','EventAutoMovement','padZero','disable','_eventId','setMovementSuccess','TileX','_character','startsWith','updateTextPosition','setupRegionRestrictions','SlowerSpeed','setupPlayerVisibilityOverrides','convertVariableValuesInScriptCall','SelfSwitchABCD','setOpacity','events','BlendMode','startEncounterEffect','_targetScaleX','processMoveSynchDirection','updateMoveSynchDirection','Game_System_initialize','setMoveSpeed','MapID','updateEventCustomZ','updateSelfMovement','deltaXFrom','cwX','replace','isTriggerIn','Stop','processMoveRouteBalloon','startMessage','SpawnEventDespawnEventID','_forceShowFollower','height','Region%1','updateSaveEventLocation','%1,','setNumberInput','_startX','Speed','Enable','Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a','prepareSpawnedEventAtXY','_active','setImage','moveRouteIndex','setupSpawn','SPIN\x20CCW','encounterProximityDistance','setupCopyEvent','moveSynchType','create','setPlayerControlDisable','changeSpeed','setStopFollowerChasing','reverse','570759cUpYzR','VisuMZ_1_MessageCore\x20is\x20required\x20to\x20run\x20','advancedFunc','of\x20Preloaded\x20Maps.\x0a\x0a','needsAttachPictureUpdate','isWorking','getPreservedMorphEventData','getSelfTarget','Game_Event_updateSelfMovement','moveSynchTarget','_duration','setAllowEventAutoMovement','MoveAllSynchTargets','loadSystem','setPattern','shiftY','MsgPopupTargetTile','isShip','processMoveRouteTeleportTo','ConvertParams','clearSpriteOffsets','Player','iconIndex','_moveRouteIndex','3126rFEFcO','SPIN\x20CLOCKWISE','fadeOut','checkCollisionKeywords','startOffsetY','none','savePreservedMorphEventDataKey','attachPictureFilename','Game_Vehicle_isMapPassable','_randomHomeY','isNormalPriority','Game_CharacterBase_characterIndex','requestMapLoadCommonEvents','process_VisuMZ_EventsMoveCore_Switches_Variables','LIGHT-BULB','_screenActivated','_PreservedEventMorphData','startAngle','getAttachPictureBitmapWidth','checkAdvancedSwitchVariablePresent','PosY','isOnLadder','Step1EventId','lineHeight','PreMorphJS','isShadowShrink','isDashingAndMoving','delay','_screenActivation','setChaseOff','_tileExpand','loadEnemy','\x22Event\x20Popup:\x20Player\x22\x20plugin\x20command!','updateShadow','mimic','endOffsetX','isRegionDockable','Game_CharacterBase_opacity','characterName','moveByInput','Game_Event_findProperPageIndex','_pageIndex','setupEvents','encounterProximityType','LIGHT','isTurnInPlace','resetSelfSwitchesForEvent','_target','getEventIconData','endScaleY','spawnEventId','loadCPC','Game_CharacterBase_pattern','setMapValue','MUSIC\x20NOTE','isInstanceOfSceneMap','FollowerReset','PreSpawnJS','setValue','Game_CharacterBase_update','Game_Timer_start','startOffset','adjustDir8MovementSpeed','vehicle','checkEventTriggerEventsMoveCore','deletePreservedMorphEventDataKey','SCREEN','setLastPluginCommandInterpreter','pause','onCancel','CommonEventID','attachPictureOffsetX','version','FRUSTRATION','MsgPopupFollower','string','Game_System_onAfterLoad','onLoadSuccess','ccwY','deleteSavedEventLocation','setPose','LIGHTBULB','updateAttachPictureSprite','pages','executeCommonEvent','Game_Event_updateParallel','_eventOverloadThreshold','resetSelfSwitchesForMap','spawnPreserved','isSceneMap','isVisible','refresh','target','right','_pattern','isDashingEnabled','anchor','_spriteset','checkExistingEntitiesAt','randomInt','PreloadedMaps','initialize','setupFollowerVisibilityOverrides','pluginCommandCallEvent','ANNOYED','FaceSynchAllSynchTargets','mapId','Game_Map_isDashDisabled','_activationProximityAutoTriggerBypass','TOGGLE','Game_Variables_value','Sprite_Balloon_setup','setupMorphEvent','isStopFollowerChasing','Game_Enemy_meetsSwitchCondition','SelfVariables','lastSpawnedEventID','processMoveRouteJumpToCharacter','_dummyWindow','_spawnData','AutoBalloon','_targetX','isPreventSelfMovement','processMoveRouteTeleportToCharacter','getInputDirection','Game_Character_forceMoveRoute','_labelWindows','isOnRope','isOnScreen','contents','_scaleBaseY','isAutoBufferIcon','windowPadding','_isObjectCharacter','deleteIconsOnEventsData','screenTileY','activationProximityDistance','isDiagonalDirection','createTextSprite','Game_CharacterBase_screenY','prototype','call','setDestination','patternHeight','isDashing','morphIntoTemplate','AirshipSpeed','meetActivationProximityConditions','hasEventIcon','%1Dock','fontFace','resetFontSettings','updateEventsMoveCoreTagChanges','PageId','_spriteOffsetY','_eventScreenX','vertical\x20mirror','_eventMorphData','endScale','isSaveEventLocation','removeTemporaryMapSpawnedEvents','isAdvancedVariable','isEventTest','EventLocationCreate','SPIN\x20ANTICLOCKWISE','setPlayerDiagonalSetting','Button','Step2EventId','setBalloonPose','findProperPageIndex','hasClickTrigger','_randomHomeX','MsgDuration','deltaX','checkEventProximity','enemy','Game_Event_initialize','mirror\x20vertical','pattern','OperateValues','createDisplayObjects','SpawnEventDespawnEverything','SILENCE','Scene_Map_createDisplayObjects','TerrainTag','EnableDashTilt','onAfterLoad'];_0x5ef3=function(){return _0x4a1d7;};return _0x5ef3();}var $isTileEncounterHalf=function(_0x3ea51a,_0x130fbb){const _0x110498=_0x19393c;if(!$gameMap)return![];_0x3ea51a=Math[_0x110498(0x25f)](_0x3ea51a||0x0),_0x130fbb=Math[_0x110498(0x25f)](_0x130fbb||0x0);const _0x25426c=$gameMap[_0x110498(0x3c6)]();for(const _0x2a12f2 of _0x25426c){if(!_0x2a12f2)continue;if(_0x2a12f2[_0x110498(0x57f)])continue;const _0x2bfdb0=_0x2a12f2[_0x110498(0x434)](!![]),_0x3dcb0f=_0x2a12f2[_0x110498(0x3e9)](!![]);if($gameMap[_0x110498(0x4b7)](_0x3ea51a,_0x130fbb,_0x2a12f2,_0x2bfdb0,_0x3dcb0f))return!![];}return![];},$isTileEncounterNone=function(_0xb990a2,_0x56cc56){const _0x4be44e=_0x19393c;if(!$gameMap)return![];_0xb990a2=Math[_0x4be44e(0x25f)](_0xb990a2||0x0),_0x56cc56=Math[_0x4be44e(0x25f)](_0x56cc56||0x0);const _0x3de0e1=$gameMap[_0x4be44e(0x3c6)]();for(const _0x490faf of _0x3de0e1){if(!_0x490faf)continue;if(_0x490faf[_0x4be44e(0x57f)])continue;const _0x4f9863=_0x490faf[_0x4be44e(0x434)](![]),_0x217a73=_0x490faf[_0x4be44e(0x3e9)](![]);if($gameMap[_0x4be44e(0x4b7)](_0xb990a2,_0x56cc56,_0x490faf,_0x4f9863,_0x217a73))return!![];}return![];};VisuMZ[_0x19393c(0x532)][_0x19393c(0x2cb)]=Game_Troop['prototype'][_0x19393c(0x24b)],Game_Troop[_0x19393c(0x495)][_0x19393c(0x24b)]=function(_0x383c3e){const _0x4ed1ac=_0x19393c;$gameTemp[_0x4ed1ac(0x261)](this);const _0x369c06=VisuMZ[_0x4ed1ac(0x532)][_0x4ed1ac(0x2cb)][_0x4ed1ac(0x496)](this,_0x383c3e);return $gameTemp['clearSelfTarget'](),_0x369c06;},VisuMZ[_0x19393c(0x532)][_0x19393c(0x369)]=Game_Map[_0x19393c(0x495)][_0x19393c(0x2f0)],Game_Map[_0x19393c(0x495)][_0x19393c(0x2f0)]=function(_0x56cdab){const _0x3c6c19=_0x19393c;this[_0x3c6c19(0x4a9)](_0x56cdab),this[_0x3c6c19(0x28e)](),VisuMZ[_0x3c6c19(0x532)][_0x3c6c19(0x369)][_0x3c6c19(0x496)](this,_0x56cdab),this[_0x3c6c19(0x28e)](),this['setupDiagonalSupport'](),this[_0x3c6c19(0x3c0)](),this[_0x3c6c19(0x2cc)](),this[_0x3c6c19(0x324)](),this[_0x3c6c19(0x3c2)](),this[_0x3c6c19(0x46f)](),this[_0x3c6c19(0x612)](),this[_0x3c6c19(0x415)](),this[_0x3c6c19(0x28e)]();},VisuMZ[_0x19393c(0x532)][_0x19393c(0x594)]=Game_Map[_0x19393c(0x495)][_0x19393c(0x433)],Game_Map[_0x19393c(0x495)][_0x19393c(0x433)]=function(){const _0x2b5218=_0x19393c;VisuMZ[_0x2b5218(0x532)][_0x2b5218(0x594)][_0x2b5218(0x496)](this),this[_0x2b5218(0x203)]();},Game_Map[_0x19393c(0x45f)]=0xc8,Game_Map[_0x19393c(0x495)][_0x19393c(0x379)]=function(){const _0xb2af71=_0x19393c,_0x1287a1=Game_Map[_0xb2af71(0x45f)];this[_0xb2af71(0x629)]=this[_0xb2af71(0x3c6)]()[_0xb2af71(0x5b3)]>_0x1287a1;if(this[_0xb2af71(0x629)]&&$gameTemp['isPlaytest']()){}},Game_Map[_0x19393c(0x495)][_0x19393c(0x4e3)]=function(){const _0x277fba=_0x19393c;return this[_0x277fba(0x629)];},Game_Map[_0x19393c(0x495)][_0x19393c(0x28e)]=function(){const _0x5d0495=_0x19393c;this[_0x5d0495(0x263)]=undefined;},Game_Map['prototype']['setupDiagonalSupport']=function(){const _0x9cc343=_0x19393c;this['_diagonalSupport']=VisuMZ[_0x9cc343(0x532)][_0x9cc343(0x329)][_0x9cc343(0x589)][_0x9cc343(0x289)];const _0x8b27af=$dataMap[_0x9cc343(0x58c)]||'';if(_0x8b27af[_0x9cc343(0x1cb)](/<DIAGONAL MOVEMENT: ON>/i))this[_0x9cc343(0x5b5)]=!![];else _0x8b27af['match'](/<DIAGONAL MOVEMENT: OFF>/i)&&(this['_diagonalSupport']=![]);},Game_Map[_0x19393c(0x298)]=VisuMZ['EventsMoveCore'][_0x19393c(0x329)]['Movement'][_0x19393c(0x526)]??![],Game_Map[_0x19393c(0x495)][_0x19393c(0x314)]=function(){const _0x1caf70=_0x19393c;if(Utils[_0x1caf70(0x60c)]()){if(!Game_Map['MOBILE_DIAGONAL_PATHFINDING'])return![];}const _0x5bbea4=$gameSystem[_0x1caf70(0x607)]();if(_0x5bbea4==='enable')return!![];if(_0x5bbea4===_0x1caf70(0x3b9))return![];if(this['_diagonalSupport']===undefined)this[_0x1caf70(0x34f)]();return this[_0x1caf70(0x5b5)];},Game_Map[_0x19393c(0x495)][_0x19393c(0x624)]=function(_0x389290,_0x54c749){const _0x2b7932=_0x19393c;if([0x1,0x4,0x7][_0x2b7932(0x239)](_0x54c749))_0x389290-=0x1;if([0x3,0x6,0x9][_0x2b7932(0x239)](_0x54c749))_0x389290+=0x1;return this['roundX'](_0x389290);},Game_Map['prototype'][_0x19393c(0x4ce)]=function(_0x147e95,_0xe564a2){const _0x21fc0b=_0x19393c;if([0x1,0x2,0x3][_0x21fc0b(0x239)](_0xe564a2))_0x147e95+=0x1;if([0x7,0x8,0x9]['includes'](_0xe564a2))_0x147e95-=0x1;return this[_0x21fc0b(0x596)](_0x147e95);},Game_Map[_0x19393c(0x495)][_0x19393c(0x200)]=function(_0x5e7b25,_0x20f924,_0x120701,_0x4e7a67){const _0x1ac124=_0x19393c;return Math['max'](Math[_0x1ac124(0x376)](this[_0x1ac124(0x4b6)](_0x5e7b25,_0x120701)),Math[_0x1ac124(0x376)](this['deltaY'](_0x20f924,_0x4e7a67)));},Game_Map[_0x19393c(0x495)][_0x19393c(0x3c0)]=function(){const _0x53a112=_0x19393c,_0x3ef229=VisuMZ[_0x53a112(0x532)][_0x53a112(0x329)][_0x53a112(0x18d)],_0x240814={},_0x19c37f=[_0x53a112(0x285),_0x53a112(0x299),_0x53a112(0x5bb)],_0x5d5e51=['All',_0x53a112(0x307),_0x53a112(0x406),_0x53a112(0x395),_0x53a112(0x3a3),_0x53a112(0x4cd),_0x53a112(0x2e4),_0x53a112(0x621)];for(const _0x31de2 of _0x19c37f){for(const _0x4f84c7 of _0x5d5e51){const _0x52d3c5=_0x53a112(0x223)[_0x53a112(0x2ea)](_0x4f84c7,_0x31de2);_0x3ef229[_0x52d3c5]&&(_0x240814[_0x52d3c5]=_0x3ef229[_0x52d3c5][_0x53a112(0x5f3)](0x0));}}const _0x7db770=$dataMap[_0x53a112(0x58c)]||'',_0x373c7c=_0x7db770[_0x53a112(0x1cb)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/gi);if(_0x373c7c)for(const _0x1a506a of _0x373c7c){_0x1a506a[_0x53a112(0x1cb)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x3ec0d7=String(RegExp['$1'])[_0x53a112(0x1f8)]()['trim'](),_0x4e6196=String(RegExp['$2'])[_0x53a112(0x1f8)]()['trim']();const _0x1bca22=JSON['parse']('['+RegExp['$3'][_0x53a112(0x1cb)](/\d+/g)+']');_0x3ec0d7=_0x3ec0d7[_0x53a112(0x580)](0x0)[_0x53a112(0x62f)]()+_0x3ec0d7[_0x53a112(0x5f3)](0x1),_0x4e6196=_0x4e6196[_0x53a112(0x580)](0x0)[_0x53a112(0x62f)]()+_0x4e6196[_0x53a112(0x5f3)](0x1);const _0x589609=_0x53a112(0x223)[_0x53a112(0x2ea)](_0x3ec0d7,_0x4e6196);if(_0x240814[_0x589609])_0x240814[_0x589609]=_0x240814[_0x589609][_0x53a112(0x310)](_0x1bca22);}this[_0x53a112(0x531)]=_0x240814;},Game_Map[_0x19393c(0x495)][_0x19393c(0x38c)]=function(_0x19bcae,_0x1bc1ef,_0x23563e,_0x2f54b4){const _0x5b96ee=_0x19393c,_0xca1f5=this[_0x5b96ee(0x624)](_0x19bcae,_0x23563e),_0x5d5a3a=this[_0x5b96ee(0x4ce)](_0x1bc1ef,_0x23563e),_0x22fb38=this['regionId'](_0xca1f5,_0x5d5a3a),_0x526013=this[_0x5b96ee(0x531)];if(_0x526013[_0x5b96ee(0x335)][_0x5b96ee(0x239)](_0x22fb38))return!![];else{if(_0x2f54b4===_0x5b96ee(0x518))return _0x526013[_0x5b96ee(0x169)][_0x5b96ee(0x239)](_0x22fb38)||_0x526013['WalkAllow']['includes'](_0x22fb38);else{if(_0x2f54b4===_0x5b96ee(0x5ab))return _0x526013['EventAllow']['includes'](_0x22fb38)||_0x526013[_0x5b96ee(0x16c)]['includes'](_0x22fb38);else{if(_0x526013[_0x5b96ee(0x4d7)][_0x5b96ee(0x239)](_0x22fb38))return!![];else{const _0x1e4489='%1Allow'[_0x5b96ee(0x2ea)](_0x2f54b4[_0x5b96ee(0x580)](0x0)[_0x5b96ee(0x62f)]()+_0x2f54b4[_0x5b96ee(0x5f3)](0x1));if(_0x526013[_0x1e4489])return _0x526013[_0x1e4489][_0x5b96ee(0x239)](_0x22fb38);}}}}return![];},Game_Map[_0x19393c(0x495)][_0x19393c(0x5dc)]=function(_0x35f88e,_0x546d03,_0x537758,_0x428683){const _0x43b06d=_0x19393c,_0x3b8040=this[_0x43b06d(0x624)](_0x35f88e,_0x537758),_0x5a6c17=this[_0x43b06d(0x4ce)](_0x546d03,_0x537758),_0x29bc07=this[_0x43b06d(0x51e)](_0x3b8040,_0x5a6c17),_0x484824=this['_regionRules'];if(_0x484824['AllForbid']['includes'](_0x29bc07))return!![];else{if(_0x428683===_0x43b06d(0x518))return _0x484824[_0x43b06d(0x302)][_0x43b06d(0x239)](_0x29bc07)||_0x484824['WalkForbid'][_0x43b06d(0x239)](_0x29bc07);else{if(_0x428683===_0x43b06d(0x5ab))return _0x484824[_0x43b06d(0x278)][_0x43b06d(0x239)](_0x29bc07)||_0x484824['WalkForbid'][_0x43b06d(0x239)](_0x29bc07);else{if(_0x484824['VehicleForbid'][_0x43b06d(0x239)](_0x29bc07))return!![];else{const _0x19897b='%1Forbid'['format'](_0x428683['charAt'](0x0)[_0x43b06d(0x62f)]()+_0x428683[_0x43b06d(0x5f3)](0x1));if(_0x484824[_0x19897b])return _0x484824[_0x19897b][_0x43b06d(0x239)](_0x29bc07);}}}}return![];},Game_Map[_0x19393c(0x495)][_0x19393c(0x42d)]=function(_0x1cc2dc,_0x37d3ac,_0x5149d6,_0x472b13){const _0x485002=_0x19393c;_0x5149d6=_0x472b13==='airship'?0x5:_0x5149d6;const _0x2d5845=this[_0x485002(0x624)](_0x1cc2dc,_0x5149d6),_0x49880c=this[_0x485002(0x4ce)](_0x37d3ac,_0x5149d6),_0x14d20b=this['regionId'](_0x2d5845,_0x49880c),_0xf4bb05=this['_regionRules'];if(_0xf4bb05[_0x485002(0x227)][_0x485002(0x239)](_0x14d20b))return!![];else{const _0x18fb01=_0x485002(0x49e)[_0x485002(0x2ea)](_0x472b13[_0x485002(0x580)](0x0)[_0x485002(0x62f)]()+_0x472b13[_0x485002(0x5f3)](0x1));if(_0xf4bb05[_0x18fb01])return _0xf4bb05[_0x18fb01][_0x485002(0x239)](_0x14d20b);}return![];},VisuMZ[_0x19393c(0x532)]['Game_Map_refresh']=Game_Map[_0x19393c(0x495)]['refresh'],Game_Map[_0x19393c(0x495)][_0x19393c(0x464)]=function(){const _0x5ccf97=_0x19393c;VisuMZ[_0x5ccf97(0x532)]['Game_Map_refresh'][_0x5ccf97(0x496)](this),this[_0x5ccf97(0x219)]();},Game_Map[_0x19393c(0x495)][_0x19393c(0x219)]=function(){const _0x1089df=_0x19393c;this[_0x1089df(0x2b0)]=![];if(this[_0x1089df(0x3c6)]()[_0x1089df(0x19e)](_0x15ab4a=>_0x15ab4a[_0x1089df(0x32c)]())){this['_needsPeriodicRefresh']=!![];return;}if(this[_0x1089df(0x3c6)]()[_0x1089df(0x19e)](_0x323a85=>_0x323a85['hasCPCs']())){this['_needsPeriodicRefresh']=!![];return;}if(this[_0x1089df(0x2d6)][_0x1089df(0x19e)](_0x50776a=>_0x50776a[_0x1089df(0x32c)]())){this[_0x1089df(0x2b0)]=!![];return;}if(this[_0x1089df(0x2d6)][_0x1089df(0x19e)](_0x3b78f2=>_0x3b78f2[_0x1089df(0x2e2)]())){this[_0x1089df(0x2b0)]=!![];return;}},VisuMZ[_0x19393c(0x532)][_0x19393c(0x39d)]=Game_Map[_0x19393c(0x495)][_0x19393c(0x4eb)],Game_Map['prototype'][_0x19393c(0x4eb)]=function(_0xdeca1a){const _0x3b0acf=_0x19393c;this['updatePeriodicRefresh'](),VisuMZ[_0x3b0acf(0x532)][_0x3b0acf(0x39d)][_0x3b0acf(0x496)](this,_0xdeca1a);},Game_Map['prototype'][_0x19393c(0x557)]=function(){const _0x56a76a=_0x19393c;if(!this['_needsPeriodicRefresh'])return;this[_0x56a76a(0x38b)]=this['_periodicRefreshTimer']||0x3c,this['_periodicRefreshTimer']--,this[_0x56a76a(0x38b)]<=0x0&&(this[_0x56a76a(0x2c8)](),this[_0x56a76a(0x38b)]=0x3c);},VisuMZ['EventsMoveCore'][_0x19393c(0x474)]=Game_Map['prototype'][_0x19393c(0x5a5)],Game_Map['prototype'][_0x19393c(0x5a5)]=function(){const _0x4db36e=_0x19393c;if(!$gameSystem[_0x4db36e(0x468)]())return!![];return VisuMZ['EventsMoveCore'][_0x4db36e(0x474)]['call'](this);},Game_Map[_0x19393c(0x495)]['setupSaveEventLocations']=function(){const _0x3095b6=_0x19393c;this[_0x3095b6(0x5e2)]=![];const _0x11fc80=$dataMap[_0x3095b6(0x58c)]||'';_0x11fc80[_0x3095b6(0x1cb)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0x3095b6(0x5e2)]=!![]);},Game_Map[_0x19393c(0x495)][_0x19393c(0x2a4)]=function(){const _0x4c105a=_0x19393c;if(this[_0x4c105a(0x5e2)]===undefined)this[_0x4c105a(0x2cc)]();return this[_0x4c105a(0x5e2)];},Game_Map[_0x19393c(0x495)][_0x19393c(0x4a9)]=function(_0x515215){const _0xd00d26=_0x19393c;_0x515215!==this['mapId']()&&$gamePlayer&&$gameSystem[_0xd00d26(0x4a9)](this['mapId']());},Game_Map[_0x19393c(0x495)][_0x19393c(0x324)]=function(){const _0x253299=_0x19393c;this[_0x253299(0x540)]=$gameSystem[_0x253299(0x1d8)](this[_0x253299(0x473)]()),this['_needsRefresh']=!![];},VisuMZ[_0x19393c(0x532)]['Game_Map_events']=Game_Map[_0x19393c(0x495)][_0x19393c(0x3c6)],Game_Map[_0x19393c(0x495)][_0x19393c(0x3c6)]=function(){const _0x122b96=_0x19393c;if(this[_0x122b96(0x263)])return this[_0x122b96(0x263)];const _0x35ec1b=VisuMZ[_0x122b96(0x532)][_0x122b96(0x1df)][_0x122b96(0x496)](this),_0x52dd1e=_0x35ec1b[_0x122b96(0x310)](this['_spawnedEvents']||[]);return this['_eventCache']=_0x52dd1e['filter'](_0x4a651e=>!!_0x4a651e),this[_0x122b96(0x263)];},VisuMZ[_0x19393c(0x532)][_0x19393c(0x632)]=Game_Map[_0x19393c(0x495)][_0x19393c(0x5ab)],Game_Map[_0x19393c(0x495)]['event']=function(_0x351d0f){const _0x1c238a=_0x19393c;return _0x351d0f>=0x3e8?(_0x351d0f-=0x3e8,this[_0x1c238a(0x540)][_0x351d0f]):VisuMZ['EventsMoveCore']['Game_Map_event']['call'](this,_0x351d0f);},Game_Map[_0x19393c(0x495)]['eraseEvent']=function(_0x2db63b){const _0x343706=_0x19393c,_0x15f195=this['event'](_0x2db63b);if(_0x15f195)_0x15f195[_0x343706(0x231)]();},Game_Map['prototype'][_0x19393c(0x318)]=function(){const _0x29b3ab=_0x19393c,_0x58c2c3={'template':_0x29b3ab(0x4af),'mapId':0x1,'eventId':0xc,'x':$gamePlayer['x']+0x1,'y':$gamePlayer['y']+0x1,'spawnPreserved':!![],'spawnEventId':this[_0x29b3ab(0x540)][_0x29b3ab(0x5b3)]+0x3e8};this[_0x29b3ab(0x538)](_0x58c2c3);},Game_Map[_0x19393c(0x495)][_0x19393c(0x46b)]=function(_0x289359,_0x2f6869){const _0x213e69=_0x19393c;if(this[_0x213e69(0x5d9)](_0x289359,_0x2f6869)[_0x213e69(0x5b3)]>0x0)return!![];if($gamePlayer['x']===_0x289359&&$gamePlayer['y']===_0x2f6869)return!![];if(this['boat']()[_0x213e69(0x37d)](_0x289359,_0x2f6869))return!![];if(this[_0x213e69(0x51b)]()[_0x213e69(0x37d)](_0x289359,_0x2f6869))return!![];return![];},Game_Map['prototype']['isSpawnHitboxCollisionOk']=function(_0x4c8ac8,_0x6948dd,_0x5b307d){const _0x2c3db3=_0x19393c;$gameTemp[_0x2c3db3(0x480)]=_0x4c8ac8;const _0x151be8=new Game_Event(_0x4c8ac8[_0x2c3db3(0x473)],_0x4c8ac8['eventId']);$gameTemp[_0x2c3db3(0x480)]=undefined,_0x151be8['refresh']();let _0x6e7be9=_0x6948dd-_0x151be8['_addedHitbox'][_0x2c3db3(0x51a)],_0x27e49f=_0x6948dd+_0x151be8['_addedHitbox'][_0x2c3db3(0x466)],_0x57b348=_0x5b307d-_0x151be8[_0x2c3db3(0x20b)]['up'],_0x2aedf5=_0x5b307d+_0x151be8[_0x2c3db3(0x20b)]['down'];for(let _0x3a0604=_0x6e7be9;_0x3a0604<=_0x27e49f;_0x3a0604++){for(let _0x196836=_0x57b348;_0x196836<=_0x2aedf5;_0x196836++){if(this[_0x2c3db3(0x46b)](_0x3a0604,_0x196836))return![];}}return!![];},Game_Map[_0x19393c(0x495)][_0x19393c(0x538)]=function(_0x450db6){const _0x332d63=_0x19393c;$gameTemp['_spawnData']=_0x450db6;const _0x3a8064=new Game_Event(_0x450db6[_0x332d63(0x473)],_0x450db6[_0x332d63(0x2ed)]);$gameTemp['_spawnData']=undefined,this['_spawnedEvents'][_0x332d63(0x19c)](_0x3a8064),_0x3a8064[_0x332d63(0x3e7)](_0x450db6),this[_0x332d63(0x28e)]();},Game_Map[_0x19393c(0x495)]['prepareSpawnedEventAtXY']=function(_0x390d61,_0x1c5426,_0x1a3be6){const _0x2e9f46=_0x19393c,_0x56d783=_0x390d61['template'][_0x2e9f46(0x62f)]()[_0x2e9f46(0x1d6)]();if(_0x56d783!==_0x2e9f46(0x30b)){const _0x385f55=VisuMZ['EventTemplates'][_0x56d783];_0x385f55&&(_0x390d61['mapId']=_0x385f55[_0x2e9f46(0x3ce)],_0x390d61['eventId']=_0x385f55['EventID']);}const _0x16b0d9=_0x390d61['x'],_0x397edd=_0x390d61['y'];if(!this['isValid'](_0x16b0d9,_0x397edd))return![];if(_0x1c5426){if(this['checkExistingEntitiesAt'](_0x16b0d9,_0x397edd))return![];if(!this['isSpawnHitboxCollisionOk'](_0x390d61,_0x16b0d9,_0x397edd))return![];}if(_0x1a3be6){if(!this[_0x2e9f46(0x249)](_0x16b0d9,_0x397edd))return![];}return this[_0x2e9f46(0x538)](_0x390d61),!![];},Game_Map['prototype'][_0x19393c(0x2b6)]=function(_0x5e8176,_0x1696d5,_0x1fd181,_0x1c23e0){const _0xa7c2b3=_0x19393c,_0x34f2b9=_0x5e8176['template'][_0xa7c2b3(0x62f)]()[_0xa7c2b3(0x1d6)]();if(_0x34f2b9!==_0xa7c2b3(0x30b)){const _0x256014=VisuMZ[_0xa7c2b3(0x50a)][_0x34f2b9];_0x256014&&(_0x5e8176[_0xa7c2b3(0x473)]=_0x256014[_0xa7c2b3(0x3ce)],_0x5e8176[_0xa7c2b3(0x2ed)]=_0x256014[_0xa7c2b3(0x30a)]);}const _0x486019=[],_0x549485=this['width'](),_0xded2da=this['height']();for(let _0x5388ad=0x0;_0x5388ad<_0x549485;_0x5388ad++){for(let _0xb532d8=0x0;_0xb532d8<_0xded2da;_0xb532d8++){if(!_0x1696d5[_0xa7c2b3(0x239)](this[_0xa7c2b3(0x51e)](_0x5388ad,_0xb532d8)))continue;if(!this[_0xa7c2b3(0x1d7)](_0x5388ad,_0xb532d8))continue;if(_0x1fd181){if(this[_0xa7c2b3(0x46b)](_0x5388ad,_0xb532d8))continue;if(!this[_0xa7c2b3(0x504)](_0x5e8176,_0x5388ad,_0xb532d8))continue;}if(_0x1c23e0){if(!this[_0xa7c2b3(0x249)](_0x5388ad,_0xb532d8))continue;}_0x486019[_0xa7c2b3(0x19c)]([_0x5388ad,_0xb532d8]);}}if(_0x486019[_0xa7c2b3(0x5b3)]>0x0){const _0x5781f2=_0x486019[Math[_0xa7c2b3(0x46c)](_0x486019[_0xa7c2b3(0x5b3)])];return _0x5e8176['x']=_0x5781f2[0x0],_0x5e8176['y']=_0x5781f2[0x1],this[_0xa7c2b3(0x538)](_0x5e8176),!![];}return![];},Game_Map[_0x19393c(0x495)][_0x19393c(0x2de)]=function(_0x57d424,_0x2a3f52,_0xfde882,_0x289df9){const _0x12ef39=_0x19393c,_0x535baf=_0x57d424[_0x12ef39(0x4f1)][_0x12ef39(0x62f)]()['trim']();if(_0x535baf!==_0x12ef39(0x30b)){const _0x3435b2=VisuMZ[_0x12ef39(0x50a)][_0x535baf];_0x3435b2&&(_0x57d424[_0x12ef39(0x473)]=_0x3435b2[_0x12ef39(0x3ce)],_0x57d424[_0x12ef39(0x2ed)]=_0x3435b2[_0x12ef39(0x30a)]);}const _0x591ce9=[],_0x598084=this[_0x12ef39(0x4d1)](),_0x2de88b=this[_0x12ef39(0x3da)]();for(let _0xef6fad=0x0;_0xef6fad<_0x598084;_0xef6fad++){for(let _0x47089e=0x0;_0x47089e<_0x2de88b;_0x47089e++){if(!_0x2a3f52[_0x12ef39(0x239)](this[_0x12ef39(0x392)](_0xef6fad,_0x47089e)))continue;if(!this['isValid'](_0xef6fad,_0x47089e))continue;if(_0xfde882){if(this[_0x12ef39(0x46b)](_0xef6fad,_0x47089e))continue;if(!this[_0x12ef39(0x504)](_0x57d424,_0xef6fad,_0x47089e))continue;}if(_0x289df9){if(!this['isPassableByAnyDirection'](_0xef6fad,_0x47089e))continue;}_0x591ce9[_0x12ef39(0x19c)]([_0xef6fad,_0x47089e]);}}if(_0x591ce9[_0x12ef39(0x5b3)]>0x0){const _0x4de8db=_0x591ce9[Math[_0x12ef39(0x46c)](_0x591ce9[_0x12ef39(0x5b3)])];return _0x57d424['x']=_0x4de8db[0x0],_0x57d424['y']=_0x4de8db[0x1],this['createSpawnedEventWithData'](_0x57d424),!![];}return![];},Game_Map[_0x19393c(0x495)][_0x19393c(0x249)]=function(_0x5671e4,_0x538b06){const _0xadd833=_0x19393c;if(this['isPassable'](_0x5671e4,_0x538b06,0x2))return!![];if(this[_0xadd833(0x24c)](_0x5671e4,_0x538b06,0x4))return!![];if(this[_0xadd833(0x24c)](_0x5671e4,_0x538b06,0x6))return!![];if(this[_0xadd833(0x24c)](_0x5671e4,_0x538b06,0x8))return!![];return![];},Game_Map[_0x19393c(0x495)][_0x19393c(0x502)]=function(_0xb8a7af){const _0x29794c=_0x19393c;if(_0xb8a7af<0x3e8)return;if(!this[_0x29794c(0x540)])return;const _0x26f6b5=this[_0x29794c(0x5ab)](_0xb8a7af);_0x26f6b5['locate'](-0x1,-0x1),_0x26f6b5[_0x29794c(0x231)](),this[_0x29794c(0x540)][_0xb8a7af-0x3e8]=null,this['clearEventCache']();},Game_Map[_0x19393c(0x495)][_0x19393c(0x303)]=function(){const _0x3627a1=_0x19393c;for(const _0x3401de of this[_0x3627a1(0x540)]){if(_0x3401de)return _0x3401de;}return null;},Game_Map[_0x19393c(0x495)][_0x19393c(0x533)]=function(){const _0xa504f7=_0x19393c,_0x45acc9=this[_0xa504f7(0x303)]();return _0x45acc9?_0x45acc9[_0xa504f7(0x3ba)]:0x0;},Game_Map[_0x19393c(0x495)][_0x19393c(0x5be)]=function(){const _0x398d70=_0x19393c,_0x573669=this[_0x398d70(0x540)][_0x398d70(0x5f3)](0x0)[_0x398d70(0x3f0)]();for(const _0x50536f of _0x573669){if(_0x50536f)return _0x50536f;}return null;},Game_Map['prototype'][_0x19393c(0x47d)]=function(){const _0x3b8fdc=_0x19393c,_0x4bd1bb=this['lastSpawnedEvent']();return _0x4bd1bb?_0x4bd1bb[_0x3b8fdc(0x3ba)]:0x0;},Game_Map['prototype'][_0x19393c(0x32f)]=function(_0x5afe5d,_0x5f21af){const _0x503bb9=_0x19393c,_0x3652af=this[_0x503bb9(0x5d9)](_0x5afe5d,_0x5f21af);for(const _0x180225 of _0x3652af){if(!_0x180225)continue;if(_0x180225[_0x503bb9(0x1eb)]())this[_0x503bb9(0x502)](_0x180225['_eventId']);}},Game_Map[_0x19393c(0x495)][_0x19393c(0x334)]=function(_0x1c3b30){const _0x1f0804=_0x19393c;for(const _0x1a27d3 of this[_0x1f0804(0x540)]){if(!_0x1a27d3)continue;_0x1c3b30['includes'](_0x1a27d3[_0x1f0804(0x51e)]())&&this[_0x1f0804(0x502)](_0x1a27d3[_0x1f0804(0x3ba)]);}},Game_Map['prototype']['despawnTerrainTags']=function(_0x410cd7){const _0x18f63c=_0x19393c;for(const _0x5122b5 of this['_spawnedEvents']){if(!_0x5122b5)continue;_0x410cd7[_0x18f63c(0x239)](_0x5122b5[_0x18f63c(0x392)]())&&this['despawnEventId'](_0x5122b5[_0x18f63c(0x3ba)]);}},Game_Map[_0x19393c(0x495)]['despawnEverything']=function(){const _0x1ae777=_0x19393c;for(const _0x5471bb of this[_0x1ae777(0x540)]){if(!_0x5471bb)continue;this[_0x1ae777(0x502)](_0x5471bb[_0x1ae777(0x3ba)]);}},VisuMZ[_0x19393c(0x532)]['Game_Map_unlockEvent']=Game_Map[_0x19393c(0x495)]['unlockEvent'],Game_Map['prototype'][_0x19393c(0x5ec)]=function(_0x5dade5){const _0x5782f8=_0x19393c;VisuMZ[_0x5782f8(0x532)]['Game_Map_unlockEvent']['call'](this,_0x5dade5);if(_0x5dade5>=0x3e8){const _0x2e4feb=this['event'](_0x5dade5);if(_0x2e4feb)_0x2e4feb['unlock']();}},Game_Map[_0x19393c(0x495)][_0x19393c(0x3c2)]=function(){const _0x1a1d4e=_0x19393c;this[_0x1a1d4e(0x245)]=![],this[_0x1a1d4e(0x627)]=![];if(!$dataMap)return;const _0x2fe050=$dataMap[_0x1a1d4e(0x58c)]||'';if(_0x2fe050[_0x1a1d4e(0x1cb)](/<HIDE PLAYER>/i))this[_0x1a1d4e(0x245)]=![],this[_0x1a1d4e(0x627)]=!![];else _0x2fe050[_0x1a1d4e(0x1cb)](/<SHOW PLAYER>/i)&&(this[_0x1a1d4e(0x245)]=!![],this[_0x1a1d4e(0x627)]=![]);},Game_Map['prototype']['isPlayerForceShown']=function(){const _0x485cad=_0x19393c;return this[_0x485cad(0x245)]===undefined&&this['setupPlayerVisibilityOverrides'](),this[_0x485cad(0x245)];},Game_Map['prototype']['isPlayerForceHidden']=function(){const _0x29bb8f=_0x19393c;return this[_0x29bb8f(0x627)]===undefined&&this[_0x29bb8f(0x3c2)](),this[_0x29bb8f(0x627)];},VisuMZ['EventsMoveCore'][_0x19393c(0x2a9)]=Game_CharacterBase['prototype']['isTransparent'],Game_CharacterBase['prototype'][_0x19393c(0x5c7)]=function(){const _0x7b044c=_0x19393c;if(this===$gamePlayer){if($gameMap[_0x7b044c(0x3aa)]())return![];if($gameMap[_0x7b044c(0x279)]())return!![];}return VisuMZ['EventsMoveCore'][_0x7b044c(0x2a9)][_0x7b044c(0x496)](this);},Game_Map[_0x19393c(0x495)][_0x19393c(0x46f)]=function(){const _0x40b788=_0x19393c;this[_0x40b788(0x3d9)]=![],this[_0x40b788(0x2f8)]=![];if(!$dataMap)return;const _0x3caab7=$dataMap[_0x40b788(0x58c)]||'';if(_0x3caab7[_0x40b788(0x1cb)](/<HIDE FOLLOWERS>/i))this['_forceShowFollower']=![],this['_forceHideFollower']=!![];else _0x3caab7['match'](/<SHOW FOLLOWERS>/i)&&(this[_0x40b788(0x3d9)]=!![],this[_0x40b788(0x2f8)]=![]);},Game_Map[_0x19393c(0x495)]['areFollowersForceShown']=function(){const _0x430646=_0x19393c;return this[_0x430646(0x3d9)]===undefined&&this[_0x430646(0x46f)](),this[_0x430646(0x3d9)];},Game_Map[_0x19393c(0x495)][_0x19393c(0x31d)]=function(){const _0x114f4a=_0x19393c;return this['_forceHideFollower']===undefined&&this[_0x114f4a(0x46f)](),this[_0x114f4a(0x2f8)];},VisuMZ[_0x19393c(0x532)]['Game_Followers_isVisible']=Game_Followers[_0x19393c(0x495)][_0x19393c(0x463)],Game_Followers[_0x19393c(0x495)]['isVisible']=function(){const _0x57771e=_0x19393c;if($gameMap[_0x57771e(0x262)]())return!![];if($gameMap['areFollowersForceHidden']())return![];return VisuMZ[_0x57771e(0x532)][_0x57771e(0x524)][_0x57771e(0x496)](this);},Game_Map[_0x19393c(0x495)]['processEraseEncounterEvents']=function(){const _0x251ed7=_0x19393c,_0x33708e=this['events'](),_0x13cf21=[];$gameParty[_0x251ed7(0x527)]=!![];for(const _0x1e91ba of _0x33708e){if(!_0x1e91ba)continue;if(_0x1e91ba[_0x251ed7(0x57f)])continue;_0x1e91ba[_0x251ed7(0x399)]()&&_0x13cf21[_0x251ed7(0x19c)](_0x1e91ba);}$gameParty['_checkEncounterRaw']=undefined;for(const _0x5419d8 of _0x13cf21){if(!_0x5419d8)continue;if(_0x5419d8[_0x251ed7(0x57f)])continue;this[_0x251ed7(0x167)](_0x5419d8[_0x251ed7(0x2ed)]());}},Game_Event[_0x19393c(0x495)][_0x19393c(0x399)]=function(){const _0x206409=_0x19393c,_0x31750f=this[_0x206409(0x5ab)]()['note']||'';if(_0x31750f[_0x206409(0x1cb)](/<ERASE IF ENC(?:|OUNTER) HALF>/i)){if($gameParty[_0x206409(0x5ae)]())return!![];if($isTileEncounterHalf(this['x'],this['y']))return!![];}if(_0x31750f['match'](/<ERASE IF ENC(?:|OUNTER) NONE>/i)){if($gameParty[_0x206409(0x36d)]())return!![];if($isTileEncounterNone(this['x'],this['y']))return!![];}return![];},VisuMZ[_0x19393c(0x532)][_0x19393c(0x55a)]=Scene_Map[_0x19393c(0x495)]['onMapLoaded'],Scene_Map[_0x19393c(0x495)]['onMapLoaded']=function(){const _0x3ccb54=_0x19393c;VisuMZ[_0x3ccb54(0x532)][_0x3ccb54(0x55a)][_0x3ccb54(0x496)](this),$gameMap[_0x3ccb54(0x612)]();},Game_Map[_0x19393c(0x495)][_0x19393c(0x415)]=function(){const _0x29570a=_0x19393c;if(!$dataMap)return;if(!$dataMap['note'])return;const _0x11fccd=$dataMap[_0x29570a(0x58c)];if(_0x11fccd[_0x29570a(0x1cb)](/<MAP LOAD COMMON EVENT(?:|S):[ ](.*)>/i)){const _0x1fd601=String(RegExp['$1'])[_0x29570a(0x20e)](',')[_0x29570a(0x3a7)](_0x3493c7=>Number(_0x3493c7));for(const _0x4b2be6 of _0x1fd601){$gameTemp['reserveCommonEvent'](_0x4b2be6);}}},Game_CommonEvent['prototype'][_0x19393c(0x32c)]=function(){const _0x233e1d=_0x19393c,_0x9dc96e=this[_0x233e1d(0x5ab)]();return this[_0x233e1d(0x552)]()&&_0x9dc96e[_0x233e1d(0x623)]>=0x1&&DataManager[_0x233e1d(0x601)](_0x9dc96e[_0x233e1d(0x519)]);},Game_CommonEvent[_0x19393c(0x495)][_0x19393c(0x2e2)]=function(){const _0x33bff9=_0x19393c;return VisuMZ['EventsMoveCore']['CustomPageConditions'][_0x33bff9(0x2d6)][_0x33bff9(0x239)](this[_0x33bff9(0x514)]);},VisuMZ[_0x19393c(0x532)][_0x19393c(0x311)]=Game_CommonEvent['prototype'][_0x19393c(0x552)],Game_CommonEvent[_0x19393c(0x495)]['isActive']=function(){const _0x13177a=_0x19393c;if(VisuMZ['EventsMoveCore']['Game_CommonEvent_isActive'][_0x13177a(0x496)](this))return!![];else{const _0x1a8c14=this[_0x13177a(0x5ab)]();return VisuMZ[_0x13177a(0x532)][_0x13177a(0x1a5)]['metCPC'](this[_0x13177a(0x5ab)]()[_0x13177a(0x506)],this[_0x13177a(0x514)],_0x1a8c14);}},VisuMZ[_0x19393c(0x532)][_0x19393c(0x353)]=Game_Map[_0x19393c(0x495)][_0x19393c(0x593)],Game_Map[_0x19393c(0x495)][_0x19393c(0x593)]=function(){const _0x30507e=_0x19393c,_0x3bad50=VisuMZ[_0x30507e(0x532)][_0x30507e(0x353)][_0x30507e(0x496)](this),_0x1b9e64=VisuMZ[_0x30507e(0x532)][_0x30507e(0x1a5)][_0x30507e(0x2d6)][_0x30507e(0x3a7)](_0x516cb3=>$dataCommonEvents[_0x516cb3]);return _0x3bad50[_0x30507e(0x310)](_0x1b9e64)[_0x30507e(0x166)]((_0x5c8a50,_0x5201af,_0x66a706)=>_0x66a706[_0x30507e(0x254)](_0x5c8a50)===_0x5201af);},Game_CharacterBase[_0x19393c(0x57a)]=VisuMZ['EventsMoveCore'][_0x19393c(0x329)][_0x19393c(0x589)]['DashOnLadder']??![],VisuMZ[_0x19393c(0x532)]['Game_CharacterBase_initMembers']=Game_CharacterBase[_0x19393c(0x495)]['initMembers'],Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x1b8)]=function(){const _0x5b0279=_0x19393c;VisuMZ[_0x5b0279(0x532)][_0x5b0279(0x4f3)][_0x5b0279(0x496)](this),this[_0x5b0279(0x363)]();},Game_CharacterBase['prototype'][_0x19393c(0x363)]=function(){const _0x1f2279=_0x19393c;this['_scaleBaseX']=0x1,this[_0x1f2279(0x48b)]=0x1,this[_0x1f2279(0x58e)]=![],this[_0x1f2279(0x1e8)](),this[_0x1f2279(0x5f7)](),this['clearSpriteOffsets'](),this['clearStepPattern']();},VisuMZ[_0x19393c(0x532)]['Game_CharacterBase_opacity']=Game_CharacterBase['prototype'][_0x19393c(0x183)],Game_CharacterBase['prototype'][_0x19393c(0x183)]=function(){const _0x3406ac=_0x19393c;let _0x2704fa=VisuMZ[_0x3406ac(0x532)][_0x3406ac(0x42e)][_0x3406ac(0x496)](this);return _0x2704fa=this[_0x3406ac(0x359)](_0x2704fa),_0x2704fa;},Game_CharacterBase['prototype'][_0x19393c(0x359)]=function(_0x351162){return _0x351162;},Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x56b)]=function(){const _0x4df5cd=_0x19393c;if(this[_0x4df5cd(0x5e9)]===Game_Player&&this[_0x4df5cd(0x319)]())return this[_0x4df5cd(0x448)]()[_0x4df5cd(0x42f)]()['match'](/\[VS8\]/i);else return Imported['VisuMZ_2_DragonbonesUnion']&&this[_0x4df5cd(0x30c)]()?!![]:this[_0x4df5cd(0x42f)]()['match'](/\[VS8\]/i);},VisuMZ['EventsMoveCore']['Game_CharacterBase_direction']=Game_CharacterBase[_0x19393c(0x495)]['direction'],Game_CharacterBase[_0x19393c(0x495)]['direction']=function(){const _0x33e2a9=_0x19393c;if(!$dataMap)return this[_0x33e2a9(0x2b9)]||0x2;if(this[_0x33e2a9(0x41e)]()&&!this[_0x33e2a9(0x23e)]()&&this[_0x33e2a9(0x56b)]())return this[_0x33e2a9(0x1fe)]();else{if(this['isOnLadder']()&&!this[_0x33e2a9(0x23e)]())return 0x8;else return this[_0x33e2a9(0x252)]()&&this['isSpriteVS8dir']()?this[_0x33e2a9(0x59a)]():VisuMZ['EventsMoveCore']['Game_CharacterBase_direction'][_0x33e2a9(0x496)](this);}},VisuMZ[_0x19393c(0x532)][_0x19393c(0x63c)]=Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x600)],Game_CharacterBase['prototype'][_0x19393c(0x600)]=function(_0x1755f6){const _0x54d65e=_0x19393c;if(!this['isSpriteVS8dir']())_0x1755f6=this[_0x54d65e(0x198)](_0x1755f6);VisuMZ[_0x54d65e(0x532)][_0x54d65e(0x63c)]['call'](this,_0x1755f6),this['updateMoveSynchDirection']();},Game_CharacterBase['prototype'][_0x19393c(0x198)]=function(_0x3182c8){const _0x45aebc=_0x19393c;if(_0x3182c8===0x1)return this[_0x45aebc(0x598)](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0x3182c8===0x3)return this['canPass'](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0x3182c8===0x7)return this[_0x45aebc(0x598)](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0x3182c8===0x9)return this[_0x45aebc(0x598)](this['_x'],this['_y'],0x6)?0x6:0x8;return _0x3182c8;},Game_CharacterBase[_0x19393c(0x495)]['isDiagonalDirection']=function(_0x5d5eb1){const _0xa6ed8a=_0x19393c;return[0x1,0x3,0x5,0x7,0x9][_0xa6ed8a(0x239)](_0x5d5eb1);},Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x5a2)]=function(){const _0x204fe3=_0x19393c;return this[_0x204fe3(0x230)]||0x0;},VisuMZ[_0x19393c(0x532)][_0x19393c(0x3ab)]=Game_CharacterBase['prototype'][_0x19393c(0x2e7)],Game_CharacterBase['prototype'][_0x19393c(0x2e7)]=function(_0x5cc0ab){const _0x35f640=_0x19393c;this[_0x35f640(0x230)]=_0x5cc0ab,VisuMZ[_0x35f640(0x532)][_0x35f640(0x3ab)][_0x35f640(0x496)](this,_0x5cc0ab);},Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x523)]=function(_0x3e1b0a){const _0x3f3dbd=_0x19393c;if(!this[_0x3f3dbd(0x492)](_0x3e1b0a))return this[_0x3f3dbd(0x2e7)](_0x3e1b0a);let _0x319a13=0x0,_0x51e4a3=0x0;switch(_0x3e1b0a){case 0x1:_0x319a13=0x4,_0x51e4a3=0x2;break;case 0x3:_0x319a13=0x6,_0x51e4a3=0x2;break;case 0x7:_0x319a13=0x4,_0x51e4a3=0x8;break;case 0x9:_0x319a13=0x6,_0x51e4a3=0x8;break;}if(VisuMZ[_0x3f3dbd(0x532)]['Settings']['Movement'][_0x3f3dbd(0x631)]){if(!this[_0x3f3dbd(0x598)](this['_x'],this['_y'],_0x319a13))return this['moveStraight'](_0x51e4a3);if(!this[_0x3f3dbd(0x598)](this['_x'],this['_y'],_0x51e4a3))return this[_0x3f3dbd(0x2e7)](_0x319a13);if(!this['canPassDiagonally'](this['_x'],this['_y'],_0x319a13,_0x51e4a3)){let _0x28fefa=VisuMZ['EventsMoveCore']['Settings'][_0x3f3dbd(0x589)]['FavorHorz']?_0x319a13:_0x51e4a3;return this[_0x3f3dbd(0x2e7)](_0x28fefa);}}this['_lastMovedDirection']=_0x3e1b0a,this['moveDiagonally'](_0x319a13,_0x51e4a3);},VisuMZ['EventsMoveCore'][_0x19393c(0x5aa)]=Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x3a5)],Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x3a5)]=function(){const _0xcd1d1d=_0x19393c;let _0x341b0b=this[_0xcd1d1d(0x5d5)];return this[_0xcd1d1d(0x499)]()&&(_0x341b0b+=this['dashSpeedModifier']()),this[_0xcd1d1d(0x447)](_0x341b0b);},Game_CharacterBase[_0x19393c(0x495)]['dashSpeedModifier']=function(){const _0x15cfd7=_0x19393c,_0x16f46b=VisuMZ[_0x15cfd7(0x532)][_0x15cfd7(0x329)]['Movement'];return _0x16f46b[_0x15cfd7(0x284)]!==undefined?_0x16f46b[_0x15cfd7(0x284)]:VisuMZ[_0x15cfd7(0x532)][_0x15cfd7(0x5aa)][_0x15cfd7(0x496)](this)-this[_0x15cfd7(0x5d5)];},Game_CharacterBase[_0x19393c(0x495)]['adjustDir8MovementSpeed']=function(_0x4a621e){const _0x2252ee=_0x19393c,_0x17b683=VisuMZ[_0x2252ee(0x532)][_0x2252ee(0x329)][_0x2252ee(0x589)];if(!_0x17b683[_0x2252ee(0x3c1)])return _0x4a621e;return[0x1,0x3,0x7,0x9][_0x2252ee(0x239)](this[_0x2252ee(0x230)])&&(_0x4a621e*=_0x17b683[_0x2252ee(0x4e7)]||0.01),_0x4a621e;},VisuMZ[_0x19393c(0x532)][_0x19393c(0x253)]=Game_CharacterBase['prototype'][_0x19393c(0x499)],Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x499)]=function(){const _0x5e8792=_0x19393c;if(!Game_CharacterBase[_0x5e8792(0x57a)]&&this[_0x5e8792(0x41e)]())return![];if(this[_0x5e8792(0x4c4)])return!![];return VisuMZ[_0x5e8792(0x532)][_0x5e8792(0x253)]['call'](this);},Game_CharacterBase[_0x19393c(0x495)]['isDashingAndMoving']=function(){const _0xb6fcb6=_0x19393c;return this[_0xb6fcb6(0x499)]()&&this['_stopCount']===0x0;},VisuMZ['EventsMoveCore'][_0x19393c(0x43d)]=Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x4bb)],Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x4bb)]=function(){const _0x3fa16c=_0x19393c;return this[_0x3fa16c(0x252)]()?this[_0x3fa16c(0x1ca)]():VisuMZ[_0x3fa16c(0x532)][_0x3fa16c(0x43d)]['call'](this);},VisuMZ[_0x19393c(0x532)][_0x19393c(0x2bd)]=Game_CharacterBase['prototype'][_0x19393c(0x208)],Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x208)]=function(){const _0x89b92=_0x19393c;VisuMZ[_0x89b92(0x532)]['Game_CharacterBase_increaseSteps']['call'](this),this['clearPose']();},VisuMZ[_0x19393c(0x532)][_0x19393c(0x414)]=Game_CharacterBase[_0x19393c(0x495)]['characterIndex'],Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x268)]=function(){const _0x496f0a=_0x19393c;if(this[_0x496f0a(0x56b)]())return this[_0x496f0a(0x234)]();return VisuMZ[_0x496f0a(0x532)][_0x496f0a(0x414)][_0x496f0a(0x496)](this);},Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x234)]=function(){const _0x172a5c=_0x19393c,_0xc7cd=this[_0x172a5c(0x4c5)]();if(this[_0x172a5c(0x23e)]()){if([0x2,0x4,0x6,0x8][_0x172a5c(0x239)](_0xc7cd))return 0x4;if([0x1,0x3,0x7,0x9][_0x172a5c(0x239)](_0xc7cd))return 0x5;}else{if(this[_0x172a5c(0x41e)]())return 0x6;else{if(this[_0x172a5c(0x252)]())return this[_0x172a5c(0x59b)]();else{if(this['_forceCarrying']){if([0x2,0x4,0x6,0x8][_0x172a5c(0x239)](_0xc7cd))return 0x4;if([0x1,0x3,0x7,0x9]['includes'](_0xc7cd))return 0x5;}else{if(this[_0x172a5c(0x49d)]()&&this[_0x172a5c(0x603)]()){if([0x2,0x4,0x6,0x8][_0x172a5c(0x239)](_0xc7cd))return 0x4;if([0x1,0x3,0x7,0x9]['includes'](_0xc7cd))return 0x5;}else{if(this['isDashingAndMoving']()){if([0x2,0x4,0x6,0x8][_0x172a5c(0x239)](_0xc7cd))return 0x2;if([0x1,0x3,0x7,0x9][_0x172a5c(0x239)](_0xc7cd))return 0x3;}else{if([0x2,0x4,0x6,0x8]['includes'](_0xc7cd))return 0x0;if([0x1,0x3,0x7,0x9][_0x172a5c(0x239)](_0xc7cd))return 0x1;}}}}}}},Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x603)]=function(){const _0x51e1af=_0x19393c;return VisuMZ[_0x51e1af(0x532)][_0x51e1af(0x329)][_0x51e1af(0x4cb)][_0x51e1af(0x5bd)];},Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x488)]=function(){const _0x3c8859=_0x19393c;return this['isOnLadder']()&&this[_0x3c8859(0x392)]()===VisuMZ[_0x3c8859(0x532)][_0x3c8859(0x329)][_0x3c8859(0x4c1)][_0x3c8859(0x38e)];},Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x1fe)]=function(){const _0x440ff5=_0x19393c;return this[_0x440ff5(0x488)]()?0x4:0x2;},VisuMZ[_0x19393c(0x532)][_0x19393c(0x444)]=Game_CharacterBase['prototype']['update'],Game_CharacterBase[_0x19393c(0x495)]['update']=function(){const _0x19a947=_0x19393c;this['updateScaleBase'](),VisuMZ[_0x19a947(0x532)][_0x19a947(0x444)]['call'](this),this['updatePose']();},Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x357)]=function(){const _0x293e06=_0x19393c;this[_0x293e06(0x179)]=this[_0x293e06(0x619)]??0x1,this[_0x293e06(0x579)]=this['_scaleBaseY']??0x1;},VisuMZ[_0x19393c(0x532)]['Game_CharacterBase_bushDepth']=Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x22f)],Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x22f)]=function(){const _0x45a686=_0x19393c;let _0x2f3a54=VisuMZ[_0x45a686(0x532)][_0x45a686(0x584)][_0x45a686(0x496)](this);return this[_0x45a686(0x579)]!==undefined&&(_0x2f3a54/=Math[_0x45a686(0x31e)](this[_0x45a686(0x579)],0.00001)),Math[_0x45a686(0x1d9)](_0x2f3a54);},Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x1bf)]=function(){const _0xc046af=_0x19393c;this[_0xc046af(0x2a0)]=this['_poseDuration']||0x0;if(this[_0xc046af(0x2a0)]>0x0){this['_poseDuration']--;if(this[_0xc046af(0x2a0)]<=0x0&&this[_0xc046af(0x5ff)]!==_0xc046af(0x360))this[_0xc046af(0x1e8)]();}},VisuMZ[_0x19393c(0x532)]['Game_CharacterBase_moveDiagonally']=Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x4da)],Game_CharacterBase['prototype'][_0x19393c(0x4da)]=function(_0xd04db6,_0x16d0ba){const _0x432b74=_0x19393c;VisuMZ[_0x432b74(0x532)]['Game_CharacterBase_moveDiagonally'][_0x432b74(0x496)](this,_0xd04db6,_0x16d0ba);if(this[_0x432b74(0x56b)]())this[_0x432b74(0x5b2)](_0xd04db6,_0x16d0ba);},Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x5b2)]=function(_0xca3827,_0x163f8f){const _0x23e541=_0x19393c;if(_0xca3827===0x4&&_0x163f8f===0x2)this[_0x23e541(0x600)](0x1);if(_0xca3827===0x6&&_0x163f8f===0x2)this[_0x23e541(0x600)](0x3);if(_0xca3827===0x4&&_0x163f8f===0x8)this[_0x23e541(0x600)](0x7);if(_0xca3827===0x6&&_0x163f8f===0x8)this[_0x23e541(0x600)](0x9);},VisuMZ['EventsMoveCore']['Game_CharacterBase_hasStepAnime']=Game_CharacterBase[_0x19393c(0x495)]['hasStepAnime'],Game_CharacterBase[_0x19393c(0x495)]['hasStepAnime']=function(){const _0x51e7a5=_0x19393c;if(this[_0x51e7a5(0x252)]()&&this[_0x51e7a5(0x17a)]()===_0x51e7a5(0x360))return!![];return VisuMZ[_0x51e7a5(0x532)]['Game_CharacterBase_hasStepAnime']['call'](this);},Game_CharacterBase['prototype']['setPose']=function(_0xfdcb49,_0x121f9b){const _0x49a8d0=_0x19393c;if(_0xfdcb49[_0x49a8d0(0x1cb)](/Z/i))_0xfdcb49=_0x49a8d0(0x360);if(_0xfdcb49[_0x49a8d0(0x1cb)](/SLEEP/i))_0xfdcb49=_0x49a8d0(0x360);this[_0x49a8d0(0x56b)]()&&(this['_pose']=_0xfdcb49[_0x49a8d0(0x62f)]()[_0x49a8d0(0x1d6)](),this[_0x49a8d0(0x2a0)]=_0x121f9b||Infinity);},Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x17a)]=function(){const _0x31d9d5=_0x19393c;return this[_0x31d9d5(0x56b)]()?(this['_pose']||'')['toUpperCase']()[_0x31d9d5(0x1d6)]():''['toUpperCase']()[_0x31d9d5(0x1d6)]();},Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x4b1)]=function(_0x3c13e5,_0x34fc7){const _0x4333c4=_0x19393c;if(this[_0x4333c4(0x56b)]()){const _0x3295ec=['',_0x4333c4(0x247),_0x4333c4(0x57c),_0x4333c4(0x43f),_0x4333c4(0x560),'ANGER',_0x4333c4(0x5e7),_0x4333c4(0x605),_0x4333c4(0x4bf),_0x4333c4(0x54f),'ZZZ','','','','',''][_0x3c13e5];this[_0x4333c4(0x459)](_0x3295ec,_0x34fc7);}},Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x1e8)]=function(){const _0x3a4e8d=_0x19393c;this[_0x3a4e8d(0x5ff)]='',this[_0x3a4e8d(0x2a0)]=0x0;},Game_CharacterBase['prototype']['isPosing']=function(){const _0x2d8c27=_0x19393c;return this[_0x2d8c27(0x56b)]()&&!!this['_pose'];},Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x59b)]=function(){const _0x3fd171=_0x19393c,_0x5d026a=this[_0x3fd171(0x5ff)][_0x3fd171(0x62f)]();switch(this[_0x3fd171(0x5ff)][_0x3fd171(0x62f)]()[_0x3fd171(0x1d6)]()){case _0x3fd171(0x33d):case _0x3fd171(0x181):case'VICTORY':case _0x3fd171(0x316):case'KNEEL':case _0x3fd171(0x1ce):return 0x6;break;default:return 0x7;break;}},Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x59a)]=function(){const _0x3c01f4=_0x19393c;switch(this[_0x3c01f4(0x5ff)][_0x3c01f4(0x62f)]()){case _0x3c01f4(0x247):case'QUESTION':case _0x3c01f4(0x43f):case'!':case'?':return 0x2;break;case _0x3c01f4(0x560):case _0x3c01f4(0x342):case _0x3c01f4(0x5e7):return 0x4;break;case _0x3c01f4(0x33d):case _0x3c01f4(0x181):case'VICTORY':case _0x3c01f4(0x605):case _0x3c01f4(0x4bf):case _0x3c01f4(0x54f):return 0x6;break;case _0x3c01f4(0x316):case _0x3c01f4(0x374):case _0x3c01f4(0x1ce):case'ZZZ':case _0x3c01f4(0x4e4):return 0x8;break;default:return VisuMZ['EventsMoveCore'][_0x3c01f4(0x63c)][_0x3c01f4(0x496)](this);break;}},Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x1ca)]=function(){const _0x269b37=_0x19393c;switch(this['_pose'][_0x269b37(0x62f)]()){case _0x269b37(0x33d):case _0x269b37(0x316):case _0x269b37(0x247):case'!':case _0x269b37(0x560):case _0x269b37(0x605):return 0x0;break;case _0x269b37(0x181):case'KNEEL':case _0x269b37(0x57c):case'?':case'ANGER':case _0x269b37(0x4bf):return 0x1;break;case _0x269b37(0x390):case _0x269b37(0x1ce):case _0x269b37(0x43f):case _0x269b37(0x5e7):case _0x269b37(0x54f):return 0x2;break;default:return VisuMZ[_0x269b37(0x532)]['Game_CharacterBase_pattern'][_0x269b37(0x496)](this);break;}},Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x2a5)]=function(){const _0x5d146f=_0x19393c;this[_0x5d146f(0x295)]=!![];},Game_CharacterBase['prototype'][_0x19393c(0x32d)]=function(){const _0x1a6ffa=_0x19393c;this[_0x1a6ffa(0x295)]=![];},Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x625)]=function(){const _0x5a1d10=_0x19393c;this[_0x5a1d10(0x4c4)]=!![];},Game_CharacterBase['prototype'][_0x19393c(0x5f7)]=function(){this['_forceDashing']=![];},Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x53c)]=function(){const _0x25fc73=_0x19393c;if(this[_0x25fc73(0x325)]())return![];if(this[_0x25fc73(0x48e)])return![];if(this[_0x25fc73(0x510)]==='')return![];if(this[_0x25fc73(0x5e9)]===Game_Vehicle)return![];if(this['isTransparent']())return![];return!![];},Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x422)]=function(){const _0x35e653=_0x19393c;if(this[_0x35e653(0x41e)]())return!![];if(this[_0x35e653(0x5e9)]===Game_Player&&this[_0x35e653(0x319)]())return!![];return![];},Game_CharacterBase['prototype'][_0x19393c(0x1b7)]=function(){const _0xe0b3ab=_0x19393c;return VisuMZ[_0xe0b3ab(0x532)]['Settings']['Movement'][_0xe0b3ab(0x56c)];},Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x578)]=function(){return this['screenX']();},Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x61c)]=function(){const _0x2cb2ad=_0x19393c,_0x1d76a0=$gameMap['tileHeight']();return Math[_0x2cb2ad(0x1d9)](this['scrolledY']()*_0x1d76a0+_0x1d76a0);},Game_CharacterBase[_0x19393c(0x398)]=0x64,Game_CharacterBase[_0x19393c(0x495)]['getDiagonalDestination']=function(_0x2525d4,_0x3e417a){const _0x392256=_0x19393c;if(TouchInput['isPressed']())return![];if(!$gameMap['isSupportDiagonalMovement']())return![];if($gameMap[_0x392256(0x23c)](_0x2525d4,_0x3e417a)['length']>0x0)return![];if(!$gameMap[_0x392256(0x249)](_0x2525d4,_0x3e417a))return![];const _0x511dea=$gameMap['_events'][_0x392256(0x5b3)];if(_0x511dea>=Game_CharacterBase[_0x392256(0x398)])return![];return!![];},Game_Character[_0x19393c(0x495)]['findDiagonalDirectionTo']=function(_0x57a254,_0xd257ca){const _0x358863=_0x19393c;let _0x17c4f3=this[_0x358863(0x323)](_0x57a254,_0xd257ca);if(!this['getDiagonalDestination'](_0x57a254,_0xd257ca))return _0x17c4f3;if(this[_0x358863(0x333)](_0x57a254,_0xd257ca))return _0x17c4f3;const _0x16cd8a=_0x17c4f3;if(_0x17c4f3===0x2){if(_0x57a254>this['x']&&this[_0x358863(0x598)](this['x'],this['y'],0x6))_0x17c4f3=0x3;if(_0x57a254<this['x']&&this[_0x358863(0x598)](this['x'],this['y'],0x4))_0x17c4f3=0x1;}else{if(_0x17c4f3===0x4){if(_0xd257ca>this['y']&&this['canPass'](this['x'],this['y'],0x4))_0x17c4f3=0x1;if(_0xd257ca<this['y']&&this[_0x358863(0x598)](this['x'],this['y'],0x6))_0x17c4f3=0x7;}else{if(_0x17c4f3===0x6){if(_0xd257ca>this['y']&&this[_0x358863(0x598)](this['x'],this['y'],0x4))_0x17c4f3=0x3;if(_0xd257ca<this['y']&&this[_0x358863(0x598)](this['x'],this['y'],0x6))_0x17c4f3=0x9;}else{if(_0x17c4f3===0x8){if(_0x57a254>this['x']&&this[_0x358863(0x598)](this['x'],this['y'],0x6))_0x17c4f3=0x9;if(_0x57a254<this['x']&&this[_0x358863(0x598)](this['x'],this['y'],0x4))_0x17c4f3=0x7;}}}}if(!this[_0x358863(0x598)](this['x'],this['y'],_0x17c4f3))return _0x16cd8a;const _0x1a97d8=$gameMap[_0x358863(0x624)](this['x'],_0x17c4f3),_0x19b777=$gameMap[_0x358863(0x4ce)](this['y'],_0x17c4f3);if(this[_0x358863(0x333)](_0x1a97d8,_0x19b777))_0x17c4f3=_0x16cd8a;return _0x17c4f3;},VisuMZ[_0x19393c(0x532)]['Game_CharacterBase_canPass']=Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x598)],Game_CharacterBase[_0x19393c(0x495)]['canPass']=function(_0x4435ec,_0x2d2087,_0x2dc17c){const _0x10071a=_0x19393c;return this[_0x10071a(0x2c1)]==='airship'?this['vehicle']()[_0x10071a(0x5c2)](_0x4435ec,_0x2d2087,_0x2dc17c):VisuMZ[_0x10071a(0x532)][_0x10071a(0x4f2)][_0x10071a(0x496)](this,_0x4435ec,_0x2d2087,_0x2dc17c);},Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x405)]=function(){const _0x17344d=_0x19393c;this[_0x17344d(0x4d4)]=0x0,this[_0x17344d(0x4a3)]=0x0;},VisuMZ['EventsMoveCore'][_0x19393c(0x558)]=Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x3b6)],Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x3b6)]=function(){const _0x2b730d=_0x19393c;return VisuMZ[_0x2b730d(0x532)]['Game_CharacterBase_screenX'][_0x2b730d(0x496)](this)+(this[_0x2b730d(0x4d4)]||0x0);},VisuMZ['EventsMoveCore'][_0x19393c(0x494)]=Game_CharacterBase['prototype'][_0x19393c(0x275)],Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x275)]=function(){const _0x3aca84=_0x19393c;return VisuMZ[_0x3aca84(0x532)][_0x3aca84(0x494)]['call'](this)+(this['_spriteOffsetY']||0x0);},Game_CharacterBase[_0x19393c(0x1e1)]=VisuMZ[_0x19393c(0x532)][_0x19393c(0x329)][_0x19393c(0x589)]['ShiftY']??-0x6,Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x400)]=function(){const _0xc95b0d=_0x19393c;let _0x317675=this[_0xc95b0d(0x5a7)]()?0x0:-Game_CharacterBase[_0xc95b0d(0x1e1)];return this['_scaleY']&&(_0x317675*=this[_0xc95b0d(0x579)]),Math[_0xc95b0d(0x25f)](_0x317675);},Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x50d)]=function(){const _0x5335ed=_0x19393c;this[_0x5335ed(0x5df)]='';},VisuMZ[_0x19393c(0x532)][_0x19393c(0x3a2)]=Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x394)],Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x394)]=function(){const _0x283699=_0x19393c;if(this['_patternLocked'])return;if(this[_0x283699(0x3ad)]())return;VisuMZ[_0x283699(0x532)][_0x283699(0x3a2)]['call'](this);},Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x3ad)]=function(){const _0x4c0e59=_0x19393c;if(!this[_0x4c0e59(0x543)]()&&this[_0x4c0e59(0x16e)]>0x0)return![];switch(String(this['_stepPattern'])[_0x4c0e59(0x62f)]()[_0x4c0e59(0x1d6)]()){case _0x4c0e59(0x1c1):this[_0x4c0e59(0x467)]+=0x1;if(this['_pattern']>0x2)this['setPattern'](0x0);break;case _0x4c0e59(0x59d):this[_0x4c0e59(0x467)]-=0x1;if(this[_0x4c0e59(0x467)]<0x0)this[_0x4c0e59(0x3ff)](0x2);break;case _0x4c0e59(0x40a):case _0x4c0e59(0x1ee):this[_0x4c0e59(0x587)]();break;case _0x4c0e59(0x356):case _0x4c0e59(0x3e8):case _0x4c0e59(0x4ad):case'SPIN\x20ACW':this[_0x4c0e59(0x5ee)]();break;default:return![];}return!![];},Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x439)]=function(){return $gameSystem['getEventIconData'](this);},Game_CharacterBase[_0x19393c(0x495)]['hasEventIcon']=function(){const _0xe05ee1=_0x19393c,_0xba1d0b=this[_0xe05ee1(0x439)]();if(!_0xba1d0b)return![];return _0xba1d0b[_0xe05ee1(0x407)]>0x0;},Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x270)]=function(){const _0x4b86c9=_0x19393c,_0x26ac9d=this[_0x4b86c9(0x4c5)]();return $gameMap[_0x4b86c9(0x624)](this['x'],_0x26ac9d);},Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x286)]=function(){const _0x3c8674=_0x19393c,_0x2d3b08=this[_0x3c8674(0x4c5)]();return $gameMap['roundYWithDirection'](this['y'],_0x2d3b08);},Game_CharacterBase[_0x19393c(0x495)]['backX']=function(){const _0xa5d806=_0x19393c,_0x299526=this[_0xa5d806(0x232)](this[_0xa5d806(0x4c5)]());return $gameMap[_0xa5d806(0x624)](this['x'],_0x299526);},Game_CharacterBase['prototype'][_0x19393c(0x317)]=function(){const _0x377bad=_0x19393c,_0x46fd05=this[_0x377bad(0x232)](this[_0x377bad(0x4c5)]());return $gameMap[_0x377bad(0x4ce)](this['y'],_0x46fd05);},Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x2c9)]=function(){const _0x5e8ddb=_0x19393c,_0x1fc6be=[0x0,0x3,0x6,0x9,0x2,0x5,0x8,0x1,0x4,0x7][this[_0x5e8ddb(0x4c5)]()];return $gameMap[_0x5e8ddb(0x624)](this['x'],_0x1fc6be);},Game_CharacterBase['prototype'][_0x19393c(0x457)]=function(){const _0x502c20=_0x19393c,_0x3ccd63=[0x0,0x3,0x6,0x9,0x2,0x5,0x8,0x1,0x4,0x7][this[_0x502c20(0x4c5)]()];return $gameMap[_0x502c20(0x4ce)](this['y'],_0x3ccd63);},Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x3d2)]=function(){const _0x197865=_0x19393c,_0x4c8b81=[0x0,0x7,0x4,0x1,0x8,0x5,0x2,0x9,0x6,0x3][this[_0x197865(0x4c5)]()];return $gameMap[_0x197865(0x624)](this['x'],_0x4c8b81);},Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x309)]=function(){const _0x4d8246=_0x19393c,_0x405874=[0x0,0x7,0x4,0x1,0x8,0x5,0x2,0x9,0x6,0x3][this[_0x4d8246(0x4c5)]()];return $gameMap[_0x4d8246(0x4ce)](this['y'],_0x405874);},VisuMZ[_0x19393c(0x532)]['Game_Character_setMoveRoute']=Game_Character[_0x19393c(0x495)][_0x19393c(0x4c6)],Game_Character[_0x19393c(0x495)][_0x19393c(0x4c6)]=function(_0x824b7){const _0x1e6a46=_0x19393c;route=JsonEx[_0x1e6a46(0x196)](_0x824b7),VisuMZ['EventsMoveCore']['Game_Character_setMoveRoute'][_0x1e6a46(0x496)](this,route);},VisuMZ[_0x19393c(0x532)]['Game_Character_forceMoveRoute']=Game_Character[_0x19393c(0x495)]['forceMoveRoute'],Game_Character['prototype'][_0x19393c(0x522)]=function(_0x17213d){const _0x1aa2a5=_0x19393c;route=JsonEx['makeDeepCopy'](_0x17213d),VisuMZ['EventsMoveCore'][_0x1aa2a5(0x486)][_0x1aa2a5(0x496)](this,route);},VisuMZ[_0x19393c(0x532)][_0x19393c(0x2da)]=Game_Character[_0x19393c(0x495)]['processMoveCommand'],Game_Character[_0x19393c(0x495)][_0x19393c(0x63f)]=function(_0x27dbfb){const _0x4d74fe=_0x19393c,_0x18a982=Game_Character,_0x3398db=_0x27dbfb['parameters'];if(_0x27dbfb[_0x4d74fe(0x5c9)]===_0x18a982[_0x4d74fe(0x19d)]){let _0x41a26e=_0x27dbfb[_0x4d74fe(0x313)][0x0];_0x41a26e=this[_0x4d74fe(0x3c3)](_0x41a26e),_0x41a26e=this[_0x4d74fe(0x2a1)](_0x41a26e),this[_0x4d74fe(0x24d)](_0x27dbfb,_0x41a26e);}else VisuMZ[_0x4d74fe(0x532)]['Game_Character_processMoveCommand']['call'](this,_0x27dbfb);},Game_Character[_0x19393c(0x495)][_0x19393c(0x3c3)]=function(_0x2223d2){const _0x23e3fe=_0x19393c,_0x279eca=/\$gameVariables\.value\((\d+)\)/gi,_0x2e9964=/\\V\[(\d+)\]/gi;while(_0x2223d2['match'](_0x279eca)){_0x2223d2=_0x2223d2[_0x23e3fe(0x3d3)](_0x279eca,(_0x3dce67,_0xa42eef)=>$gameVariables[_0x23e3fe(0x2bb)](parseInt(_0xa42eef)));}while(_0x2223d2['match'](_0x2e9964)){_0x2223d2=_0x2223d2['replace'](_0x2e9964,(_0x6408a1,_0x17fa4b)=>$gameVariables[_0x23e3fe(0x2bb)](parseInt(_0x17fa4b)));}return _0x2223d2;},Game_Character[_0x19393c(0x495)]['convertSelfVariableValuesInScriptCall']=function(_0x4d7e27){const _0x1649fe=_0x19393c,_0x33b5d4=/\\SELFVAR\[(\d+)\]/gi;while(_0x4d7e27[_0x1649fe(0x1cb)](_0x33b5d4)){_0x4d7e27=_0x4d7e27[_0x1649fe(0x3d3)](_0x33b5d4,(_0x44e081,_0x21dda3)=>getSelfVariableValue(this[_0x1649fe(0x4e6)],this['_eventId'],parseInt(_0x21dda3)));}return _0x4d7e27;},Game_Character['prototype'][_0x19393c(0x24d)]=function(_0x8b9b9e,_0x148df3){const _0xa4a547=_0x19393c;if(_0x148df3[_0xa4a547(0x1cb)](/ANIMATION:[ ](\d+)/i))return this['processMoveRouteAnimation'](Number(RegExp['$1']));if(_0x148df3[_0xa4a547(0x1cb)](/BALLOON:[ ](.*)/i))return this[_0xa4a547(0x3d6)](String(RegExp['$1']));if(_0x148df3[_0xa4a547(0x1cb)](/FADE IN:[ ](\d+)/i))return this[_0xa4a547(0x27d)](Number(RegExp['$1']));if(_0x148df3[_0xa4a547(0x1cb)](/FADE OUT:[ ](\d+)/i))return this[_0xa4a547(0x300)](Number(RegExp['$1']));if(_0x148df3[_0xa4a547(0x1cb)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:TRUE|ON)/i))return this[_0xa4a547(0x2a5)]();if(_0x148df3['match'](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:FALSE|OFF)/i))return this[_0xa4a547(0x32d)]();if(_0x148df3[_0xa4a547(0x1cb)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:TRUE|ON)/i))return this[_0xa4a547(0x625)]();if(_0x148df3[_0xa4a547(0x1cb)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:FALSE|OFF)/i))return this[_0xa4a547(0x5f7)]();if(_0x148df3[_0xa4a547(0x1cb)](/HUG:[ ]LEFT/i))return this['processMoveRouteHugWall'](_0xa4a547(0x51a));if(_0x148df3[_0xa4a547(0x1cb)](/HUG:[ ]RIGHT/i))return this['processMoveRouteHugWall'](_0xa4a547(0x466));if(_0x148df3['match'](/INDEX:[ ](\d+)/i))return this['processMoveRouteSetIndex'](Number(RegExp['$1']));if(_0x148df3[_0xa4a547(0x1cb)](/INDEX:[ ]([\+\-]\d+)/i)){const _0x4c02a8=this[_0xa4a547(0x1ef)]+Number(RegExp['$1']);return this[_0xa4a547(0x20f)](_0x4c02a8);}if(_0x148df3[_0xa4a547(0x1cb)](/JUMP FORWARD:[ ](\d+)/i))return this['processMoveRouteJumpForward'](Number(RegExp['$1']));if(_0x148df3['match'](/JUMP TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0xa4a547(0x331)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x148df3['match'](/JUMP TO EVENT:[ ](\d+)/i)){const _0x4b8c9d=$gameMap['event'](Number(RegExp['$1']));return this['processMoveRouteJumpToCharacter'](_0x4b8c9d);}if(_0x148df3['match'](/JUMP TO PLAYER/i))return this[_0xa4a547(0x47e)]($gamePlayer);if(_0x148df3[_0xa4a547(0x1cb)](/JUMP TO HOME/i)&&this[_0xa4a547(0x2ed)]){const _0x14d0d8=this[_0xa4a547(0x4b4)],_0x5adf96=this[_0xa4a547(0x412)];return this[_0xa4a547(0x331)](_0x14d0d8,_0x5adf96);}if(_0x148df3[_0xa4a547(0x1cb)](/MOVE[ ](.*)[ ]UNTIL STOP/i)){const _0x246489=String(RegExp['$1']),_0x296704=this[_0xa4a547(0x40c)](_0x148df3);return this[_0xa4a547(0x4c7)](_0x246489,_0x296704);}if(_0x148df3[_0xa4a547(0x1cb)](/MOVE TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x4ed7e5=Number(RegExp['$1']),_0x5753dd=Number(RegExp['$2']),_0x18ca7f=this[_0xa4a547(0x40c)](_0x148df3);return this[_0xa4a547(0x536)](_0x4ed7e5,_0x5753dd,_0x18ca7f);}if(_0x148df3[_0xa4a547(0x1cb)](/MOVE TO EVENT:[ ](\d+)/i)){const _0x1c6b53=$gameMap['event'](Number(RegExp['$1'])),_0x56c57d=this[_0xa4a547(0x40c)](_0x148df3);return this[_0xa4a547(0x530)](_0x1c6b53,_0x56c57d);}if(_0x148df3[_0xa4a547(0x1cb)](/MOVE TO PLAYER/i)){const _0x2966fd=this[_0xa4a547(0x40c)](_0x148df3);return this[_0xa4a547(0x530)]($gamePlayer,_0x2966fd);}if(_0x148df3[_0xa4a547(0x1cb)](/MOVE TO HOME/i)&&this['eventId']){const _0x13574a=this[_0xa4a547(0x4b4)],_0x4ebc03=this[_0xa4a547(0x412)],_0x3f8d29=this['checkCollisionKeywords'](_0x148df3);return this[_0xa4a547(0x536)](_0x13574a,_0x4ebc03,_0x3f8d29);}if(_0x148df3[_0xa4a547(0x1cb)](/MOVE LOWER LEFT:[ ](\d+)/i))return this[_0xa4a547(0x5ad)](0x1,Number(RegExp['$1']));if(_0x148df3[_0xa4a547(0x1cb)](/MOVE DOWN:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x2,Number(RegExp['$1']));if(_0x148df3[_0xa4a547(0x1cb)](/MOVE LOWER RIGHT:[ ](\d+)/i))return this[_0xa4a547(0x5ad)](0x3,Number(RegExp['$1']));if(_0x148df3[_0xa4a547(0x1cb)](/MOVE LEFT:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x4,Number(RegExp['$1']));if(_0x148df3[_0xa4a547(0x1cb)](/MOVE RIGHT:[ ](\d+)/i))return this[_0xa4a547(0x5ad)](0x6,Number(RegExp['$1']));if(_0x148df3['match'](/MOVE UPPER LEFT:[ ](\d+)/i))return this[_0xa4a547(0x5ad)](0x7,Number(RegExp['$1']));if(_0x148df3['match'](/MOVE UP:[ ](\d+)/i))return this[_0xa4a547(0x5ad)](0x8,Number(RegExp['$1']));if(_0x148df3[_0xa4a547(0x1cb)](/MOVE UPPER RIGHT:[ ](\d+)/i))return this[_0xa4a547(0x5ad)](0x9,Number(RegExp['$1']));if(_0x148df3[_0xa4a547(0x1cb)](/OPACITY:[ ](\d+)([%％])/i)){const _0xc69974=Math[_0xa4a547(0x25f)](Number(RegExp['$1'])/0x64*0xff);return this[_0xa4a547(0x3c5)](_0xc69974[_0xa4a547(0x176)](0x0,0xff));}if(_0x148df3[_0xa4a547(0x1cb)](/OPACITY:[ ]([\+\-]\d+)([%％])/i)){const _0x15f9f6=this[_0xa4a547(0x566)]+Math[_0xa4a547(0x25f)](Number(RegExp['$1'])/0x64*0xff);return this['setOpacity'](_0x15f9f6[_0xa4a547(0x176)](0x0,0xff));}if(_0x148df3['match'](/OPACITY:[ ]([\+\-]\d+)/i)){const _0x2ffd9d=this[_0xa4a547(0x566)]+Number(RegExp['$1']);return this['setOpacity'](_0x2ffd9d[_0xa4a547(0x176)](0x0,0xff));}if(_0x148df3[_0xa4a547(0x1cb)](/PATTERN LOCK:[ ](\d+)/i))return this[_0xa4a547(0x4f6)](Number(RegExp['$1']));if(_0x148df3['match'](/PATTERN UNLOCK/i))return this[_0xa4a547(0x58e)]=![];if(_0x148df3[_0xa4a547(0x1cb)](/POSE:[ ](.*)/i)){const _0x3cce1e=String(RegExp['$1'])[_0xa4a547(0x62f)]()['trim']();return this[_0xa4a547(0x459)](_0x3cce1e);}if(_0x148df3[_0xa4a547(0x1cb)](/STEP TOWARD:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x52e8dc=Number(RegExp['$1']),_0x2cea43=Number(RegExp['$2']);return this[_0xa4a547(0x616)](_0x52e8dc,_0x2cea43);}if(_0x148df3['match'](/STEP TOWARD EVENT:[ ](\d+)/i)){const _0x184161=$gameMap[_0xa4a547(0x5ab)](Number(RegExp['$1']));return this[_0xa4a547(0x5d4)](_0x184161);}if(_0x148df3['match'](/STEP TOWARD PLAYER/i))return this[_0xa4a547(0x5d4)]($gamePlayer);if(_0x148df3[_0xa4a547(0x1cb)](/STEP TOWARD HOME/i)&&this['eventId']){const _0x37e2a2=this[_0xa4a547(0x4b4)],_0x48c97f=this['_randomHomeY'];return this[_0xa4a547(0x616)](_0x37e2a2,_0x48c97f);}if(_0x148df3['match'](/STEP AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0xa4a547(0x326)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x148df3[_0xa4a547(0x1cb)](/STEP AWAY FROM EVENT:[ ](\d+)/i)){const _0x195551=$gameMap[_0xa4a547(0x5ab)](Number(RegExp['$1']));return this['moveAwayFromCharacter'](_0x195551);}if(_0x148df3[_0xa4a547(0x1cb)](/STEP AWAY FROM PLAYER/i))return this[_0xa4a547(0x2fc)]($gamePlayer);if(_0x148df3[_0xa4a547(0x1cb)](/STEP AWAY FROM HOME/i)&&this['eventId']){const _0x8450e6=this[_0xa4a547(0x4b4)],_0x240e63=this[_0xa4a547(0x412)];return this[_0xa4a547(0x326)](_0x8450e6,_0x240e63);}if(_0x148df3['match'](/TURN TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0xa4a547(0x201)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x148df3[_0xa4a547(0x1cb)](/TURN TO EVENT:[ ](\d+)/i)){const _0x3bc8a0=$gameMap[_0xa4a547(0x5ab)](Number(RegExp['$1']));return this[_0xa4a547(0x241)](_0x3bc8a0);}if(_0x148df3['match'](/TURN TO PLAYER/i))return this[_0xa4a547(0x241)]($gamePlayer);if(_0x148df3[_0xa4a547(0x1cb)](/TURN TO HOME/i)&&this[_0xa4a547(0x2ed)]){const _0x208ad8=this[_0xa4a547(0x4b4)],_0x10a9e3=this[_0xa4a547(0x412)];return this[_0xa4a547(0x21c)](_0x208ad8,_0x10a9e3);}if(_0x148df3['match'](/TURN AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this['turnAwayFromPoint'](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x148df3[_0xa4a547(0x1cb)](/TURN AWAY FROM EVENT:[ ](\d+)/i)){const _0x578f13=$gameMap[_0xa4a547(0x5ab)](Number(RegExp['$1']));return this[_0xa4a547(0x5d8)](_0x578f13);}if(_0x148df3[_0xa4a547(0x1cb)](/TURN AWAY FROM PLAYER/i))return this['turnAwayFromCharacter']($gamePlayer);if(_0x148df3[_0xa4a547(0x1cb)](/TURN AWAY FROM HOME/i)&&this[_0xa4a547(0x2ed)]){const _0x28b41e=this[_0xa4a547(0x4b4)],_0x21fb9d=this['_randomHomeY'];return this[_0xa4a547(0x235)](_0x28b41e,_0x21fb9d);}if(_0x148df3[_0xa4a547(0x1cb)](/TURN LOWER LEFT/i))return this[_0xa4a547(0x600)](0x1);if(_0x148df3[_0xa4a547(0x1cb)](/TURN LOWER RIGHT/i))return this[_0xa4a547(0x600)](0x3);if(_0x148df3[_0xa4a547(0x1cb)](/TURN UPPER LEFT/i))return this[_0xa4a547(0x600)](0x7);if(_0x148df3[_0xa4a547(0x1cb)](/TURN UPPER RIGHT/i))return this[_0xa4a547(0x600)](0x9);if(_0x148df3[_0xa4a547(0x1cb)](/Self Switch[ ](.*):[ ](.*)/i))return this['processMoveRouteSelfSwitch'](RegExp['$1'],RegExp['$2']);if(_0x148df3['match'](/Self Variable[ ](.*):[ ](.*)/i))return this[_0xa4a547(0x5b0)](RegExp['$1'],RegExp['$2']);if(_0x148df3[_0xa4a547(0x1cb)](/TELEPORT TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0xa4a547(0x403)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x148df3[_0xa4a547(0x1cb)](/TELEPORT TO EVENT:[ ](\d+)/i)){const _0x258090=$gameMap[_0xa4a547(0x5ab)](Number(RegExp['$1']));return this[_0xa4a547(0x484)](_0x258090);}if(_0x148df3[_0xa4a547(0x1cb)](/TELEPORT TO PLAYER/i))return this[_0xa4a547(0x484)]($gamePlayer);if(_0x148df3[_0xa4a547(0x1cb)](/TELEPORT TO HOME/i)&&this[_0xa4a547(0x2ed)]){const _0x9160ac=this[_0xa4a547(0x4b4)],_0x365633=this[_0xa4a547(0x412)];return this[_0xa4a547(0x403)](_0x9160ac,_0x365633);}try{VisuMZ['EventsMoveCore'][_0xa4a547(0x2da)][_0xa4a547(0x496)](this,_0x8b9b9e);}catch(_0x2cdafb){if($gameTemp[_0xa4a547(0x56e)]())console[_0xa4a547(0x2ff)](_0x2cdafb);}},Game_Character['prototype'][_0x19393c(0x1a7)]=function(_0x428165){$gameTemp['requestAnimation']([this],_0x428165);},Game_Character[_0x19393c(0x495)]['processMoveRouteBalloon']=function(_0x780b0b){const _0x15a220=_0x19393c;let _0x259594=0x0;switch(_0x780b0b[_0x15a220(0x62f)]()[_0x15a220(0x1d6)]()){case'!':case _0x15a220(0x247):_0x259594=0x1;break;case'?':case _0x15a220(0x57c):_0x259594=0x2;break;case _0x15a220(0x265):case _0x15a220(0x508):case'MUSIC\x20NOTE':case _0x15a220(0x2e8):case'MUSICNOTE':_0x259594=0x3;break;case _0x15a220(0x560):case _0x15a220(0x2f1):_0x259594=0x4;break;case _0x15a220(0x342):_0x259594=0x5;break;case _0x15a220(0x5e7):_0x259594=0x6;break;case _0x15a220(0x605):case _0x15a220(0x471):case _0x15a220(0x452):_0x259594=0x7;break;case _0x15a220(0x4bf):case'...':_0x259594=0x8;break;case _0x15a220(0x435):case'BULB':case _0x15a220(0x54f):case _0x15a220(0x417):case _0x15a220(0x45a):_0x259594=0x9;break;case'Z':case'ZZ':case _0x15a220(0x360):case _0x15a220(0x4e4):_0x259594=0xa;break;case'USER-DEFINED\x201':_0x259594=0xb;break;case'USER-DEFINED\x202':_0x259594=0xc;break;case _0x15a220(0x2d2):_0x259594=0xd;break;case'USER-DEFINED\x204':_0x259594=0xe;break;case _0x15a220(0x282):_0x259594=0xf;break;}$gameTemp['requestBalloon'](this,_0x259594);},Game_Character['prototype']['processMoveRouteFadeIn']=function(_0x43882d){const _0x56a528=_0x19393c;_0x43882d+=this[_0x56a528(0x566)],this[_0x56a528(0x3c5)](_0x43882d[_0x56a528(0x176)](0x0,0xff));if(this[_0x56a528(0x566)]<0xff)this['_moveRouteIndex']--;},Game_Character[_0x19393c(0x495)]['processMoveRouteFadeOut']=function(_0x346aac){const _0x30ec40=_0x19393c;_0x346aac=this[_0x30ec40(0x566)]-_0x346aac,this['setOpacity'](_0x346aac[_0x30ec40(0x176)](0x0,0xff));if(this[_0x30ec40(0x566)]>0x0)this[_0x30ec40(0x408)]--;},Game_Character[_0x19393c(0x495)][_0x19393c(0x35a)]=function(_0x1f47a4){const _0x3cc7eb=_0x19393c,_0x4d3bde=[0x0,0x3,0x6,0x9,0x2,0x0,0x8,0x1,0x4,0x7],_0x3c4cf6=[0x0,0x7,0x4,0x1,0x8,0x0,0x2,0x9,0x6,0x3],_0x1562c2=this['direction'](),_0x2a0448=(_0x1f47a4===_0x3cc7eb(0x51a)?_0x4d3bde:_0x3c4cf6)[_0x1562c2],_0x35cb7e=(_0x1f47a4===_0x3cc7eb(0x51a)?_0x3c4cf6:_0x4d3bde)[_0x1562c2];if(this[_0x3cc7eb(0x598)](this['x'],this['y'],_0x2a0448))_0x1f47a4===_0x3cc7eb(0x51a)?this[_0x3cc7eb(0x5ee)]():this[_0x3cc7eb(0x587)]();else!this[_0x3cc7eb(0x598)](this['x'],this['y'],this['direction']())&&(this[_0x3cc7eb(0x598)](this['x'],this['y'],_0x35cb7e)?_0x1f47a4===_0x3cc7eb(0x51a)?this['turnRight90']():this[_0x3cc7eb(0x5ee)]():this[_0x3cc7eb(0x4e9)]());this[_0x3cc7eb(0x598)](this['x'],this['y'],this[_0x3cc7eb(0x4c5)]())&&this[_0x3cc7eb(0x34c)]();},Game_Character[_0x19393c(0x495)][_0x19393c(0x20f)]=function(_0x289bd3){const _0x58e1aa=_0x19393c;if(ImageManager['isBigCharacter'](this[_0x58e1aa(0x510)]))return;_0x289bd3=_0x289bd3[_0x58e1aa(0x176)](0x0,0x7),this[_0x58e1aa(0x3e5)](this[_0x58e1aa(0x510)],_0x289bd3);},Game_Character[_0x19393c(0x495)][_0x19393c(0x294)]=function(_0x3292c2){const _0x572c8f=_0x19393c;switch(this[_0x572c8f(0x4c5)]()){case 0x1:this[_0x572c8f(0x2eb)](-_0x3292c2,_0x3292c2);break;case 0x2:this[_0x572c8f(0x2eb)](0x0,_0x3292c2);break;case 0x3:this['jump'](_0x3292c2,_0x3292c2);break;case 0x4:this[_0x572c8f(0x2eb)](-_0x3292c2,0x0);break;case 0x6:this[_0x572c8f(0x2eb)](_0x3292c2,0x0);break;case 0x7:this[_0x572c8f(0x2eb)](-_0x3292c2,-_0x3292c2);break;case 0x8:this[_0x572c8f(0x2eb)](0x0,-_0x3292c2);break;case 0x9:this[_0x572c8f(0x2eb)](_0x3292c2,-_0x3292c2);break;}},Game_Character[_0x19393c(0x495)][_0x19393c(0x331)]=function(_0x409b8a,_0x38d96c){const _0x3dbbe4=_0x19393c,_0x372c6c=Math[_0x3dbbe4(0x25f)](_0x409b8a-this['x']),_0x3b6b0a=Math[_0x3dbbe4(0x25f)](_0x38d96c-this['y']);this[_0x3dbbe4(0x2eb)](_0x372c6c,_0x3b6b0a);},Game_Character['prototype'][_0x19393c(0x47e)]=function(_0x4b1eb6){const _0x4e5060=_0x19393c;if(_0x4b1eb6)this[_0x4e5060(0x331)](_0x4b1eb6['x'],_0x4b1eb6['y']);},Game_Character['prototype'][_0x19393c(0x616)]=function(_0x4d4116,_0x4d51ae,_0x5c6038){const _0x282bd1=_0x19393c;let _0x627b77=0x0;if(_0x5c6038)$gameTemp[_0x282bd1(0x1db)]=!![];$gameMap[_0x282bd1(0x314)]()?_0x627b77=this[_0x282bd1(0x630)](_0x4d4116,_0x4d51ae):_0x627b77=this['findDirectionTo'](_0x4d4116,_0x4d51ae);if(_0x5c6038)$gameTemp[_0x282bd1(0x1db)]=![];this[_0x282bd1(0x523)](_0x627b77),this[_0x282bd1(0x3bb)](!![]);},Game_Character['prototype']['processMoveRouteStepToCharacter']=function(_0x2c3edb){const _0x1dc15b=_0x19393c;if(_0x2c3edb)this[_0x1dc15b(0x616)](_0x2c3edb['x'],_0x2c3edb['y']);},Game_Character['prototype'][_0x19393c(0x229)]=function(_0x881836,_0x280acc){const _0xc70ec9=_0x19393c,_0x63d2b4=this[_0xc70ec9(0x3d1)](_0x881836),_0x491dc7=this[_0xc70ec9(0x2a6)](_0x280acc);},Game_Character['prototype'][_0x19393c(0x40c)]=function(_0x4cac94){const _0x572911=_0x19393c;if(_0x4cac94[_0x572911(0x1cb)](/(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH)/i))return!![];else return _0x4cac94['match'](/(?:AVOID|EVADE|DODGE)/i)?![]:![];},VisuMZ[_0x19393c(0x532)][_0x19393c(0x1f2)]=Game_Event[_0x19393c(0x495)]['isCollidedWithPlayerCharacters'],Game_Event[_0x19393c(0x495)]['isCollidedWithPlayerCharacters']=function(_0x57b73b,_0x48cde0){const _0x4b7387=_0x19393c;if($gameTemp[_0x4b7387(0x1db)])return![];return VisuMZ[_0x4b7387(0x532)]['Game_Event_isCollidedWithPlayerCharacters'][_0x4b7387(0x496)](this,_0x57b73b,_0x48cde0);},Game_Character['prototype'][_0x19393c(0x4c7)]=function(_0x45fe84,_0x37f682){const _0x2c1d25=_0x19393c,_0x366d0c=['','LOWER\x20LEFT',_0x2c1d25(0x559),_0x2c1d25(0x21f),_0x2c1d25(0x5c5),'',_0x2c1d25(0x636),_0x2c1d25(0x5fb),'UP','UPPER\x20RIGHT'],_0x3a71db=_0x366d0c['indexOf'](_0x45fe84['toUpperCase']()[_0x2c1d25(0x1d6)]());if(_0x3a71db<=0x0)return;_0x37f682&&($gameTemp['_moveAllowPlayerCollision']=!![]),this['canPass'](this['x'],this['y'],_0x3a71db)&&(_0x37f682&&($gameTemp[_0x2c1d25(0x1db)]=![]),this[_0x2c1d25(0x523)](_0x3a71db),this[_0x2c1d25(0x408)]-=0x1),_0x37f682&&($gameTemp['_moveAllowPlayerCollision']=![]);},VisuMZ[_0x19393c(0x532)][_0x19393c(0x20d)]=Game_Event[_0x19393c(0x495)][_0x19393c(0x380)],Game_Event[_0x19393c(0x495)]['checkEventTriggerTouch']=function(_0x118087,_0x2c8f96){const _0x44daa1=_0x19393c;if(VisuMZ[_0x44daa1(0x532)][_0x44daa1(0x20d)]['call'](this,_0x118087,_0x2c8f96))return!![];if($gameMap[_0x44daa1(0x586)]())return![];for(let _0x7899b7=-this[_0x44daa1(0x20b)][_0x44daa1(0x51a)];_0x7899b7<=this[_0x44daa1(0x20b)][_0x44daa1(0x466)];_0x7899b7++){for(let _0x200384=-this[_0x44daa1(0x20b)]['up'];_0x200384<=this[_0x44daa1(0x20b)][_0x44daa1(0x4fa)];_0x200384++){if(VisuMZ[_0x44daa1(0x532)]['Game_Event_checkEventTriggerTouch'][_0x44daa1(0x496)](this,_0x118087+_0x7899b7,_0x2c8f96+_0x200384))return!![];}}return![];},Game_Character[_0x19393c(0x495)][_0x19393c(0x536)]=function(_0x3bafa9,_0x430fdf,_0x3d96f3){const _0x5672e2=_0x19393c;this[_0x5672e2(0x616)](_0x3bafa9,_0x430fdf,_0x3d96f3);if(this['x']!==_0x3bafa9||this['y']!==_0x430fdf)this[_0x5672e2(0x408)]--;},Game_Character[_0x19393c(0x495)]['processMoveRouteMoveToCharacter']=function(_0x138ead,_0x1688e4){const _0x2317a4=_0x19393c;if(_0x138ead&&!_0x138ead[_0x2317a4(0x57f)]){this[_0x2317a4(0x536)](_0x138ead['x'],_0x138ead['y'],_0x1688e4);if(_0x138ead[_0x2317a4(0x413)]()&&this[_0x2317a4(0x413)]()){const _0x28dcab=$gameMap[_0x2317a4(0x3b3)](this['x'],this['y'],_0x138ead['x'],_0x138ead['y']);if(_0x28dcab<=0x1)this[_0x2317a4(0x408)]++;}}},Game_Character['prototype'][_0x19393c(0x5ad)]=function(_0x51cb32,_0x52232f){const _0x51849e=_0x19393c;_0x52232f=_0x52232f||0x0;const _0x3cf68a={'code':0x1,'indent':null,'parameters':[]};_0x3cf68a['code']=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x51cb32],this[_0x51849e(0x4f5)][_0x51849e(0x344)][this['_moveRouteIndex']][_0x51849e(0x313)][0x0]='';while(_0x52232f--){this['_moveRoute'][_0x51849e(0x344)][_0x51849e(0x520)](this['_moveRouteIndex']+0x1,0x0,_0x3cf68a);}},Game_Character['prototype']['processMoveRoutePatternLock']=function(_0x17173e){const _0x30a2ee=_0x19393c;this[_0x30a2ee(0x58e)]=!![],this[_0x30a2ee(0x3ff)](_0x17173e);},Game_Character[_0x19393c(0x495)][_0x19393c(0x2cf)]=function(_0x5877c5,_0x6b5a62){const _0x26267a=_0x19393c;if(this===$gamePlayer)return;const _0x536b13=[this[_0x26267a(0x4e6)],this['_eventId'],'A'];_0x5877c5['match'](/\b[ABCD]\b/i)?_0x536b13[0x2]=String(_0x5877c5)[_0x26267a(0x580)](0x0)[_0x26267a(0x62f)]()[_0x26267a(0x1d6)]():_0x536b13[0x2]=_0x26267a(0x37b)['format'](_0x5877c5);switch(_0x6b5a62[_0x26267a(0x62f)]()[_0x26267a(0x1d6)]()){case'ON':case _0x26267a(0x350):$gameSelfSwitches[_0x26267a(0x443)](_0x536b13,!![]);break;case _0x26267a(0x388):case _0x26267a(0x4fd):$gameSelfSwitches['setValue'](_0x536b13,![]);break;case _0x26267a(0x476):$gameSelfSwitches[_0x26267a(0x443)](_0x536b13,!$gameSelfSwitches[_0x26267a(0x2bb)](_0x536b13));break;}},Game_Character[_0x19393c(0x495)]['processMoveRouteSelfVariable']=function(_0x727dc1,_0x388316){const _0x37a299=_0x19393c;if(this===$gamePlayer)return;const _0x5dec4c=[this['_mapId'],this[_0x37a299(0x3ba)],'Self\x20Variable\x20%1'['format'](_0x727dc1)];$gameSelfSwitches[_0x37a299(0x443)](_0x5dec4c,Number(_0x388316));},Game_Character[_0x19393c(0x495)]['processMoveRouteTeleportTo']=function(_0x385724,_0x5215d0){const _0x12abcd=_0x19393c;this[_0x12abcd(0x34d)](_0x385724,_0x5215d0);},Game_Character[_0x19393c(0x495)][_0x19393c(0x484)]=function(_0x415aa4){const _0x3911b6=_0x19393c;if(_0x415aa4)this[_0x3911b6(0x403)](_0x415aa4['x'],_0x415aa4['y']);},Game_Character[_0x19393c(0x495)][_0x19393c(0x587)]=function(){const _0x5d2f76=_0x19393c;switch(this['direction']()){case 0x1:this[_0x5d2f76(0x600)](0x7);break;case 0x2:this[_0x5d2f76(0x600)](0x4);break;case 0x3:this[_0x5d2f76(0x600)](0x1);break;case 0x4:this[_0x5d2f76(0x600)](0x8);break;case 0x6:this[_0x5d2f76(0x600)](0x2);break;case 0x7:this['setDirection'](0x9);break;case 0x8:this['setDirection'](0x6);break;case 0x9:this[_0x5d2f76(0x600)](0x3);break;}},Game_Character[_0x19393c(0x495)][_0x19393c(0x5ee)]=function(){const _0x5af2c9=_0x19393c;switch(this[_0x5af2c9(0x4c5)]()){case 0x1:this[_0x5af2c9(0x600)](0x3);break;case 0x2:this[_0x5af2c9(0x600)](0x6);break;case 0x3:this['setDirection'](0x9);break;case 0x4:this[_0x5af2c9(0x600)](0x2);break;case 0x6:this[_0x5af2c9(0x600)](0x8);break;case 0x7:this[_0x5af2c9(0x600)](0x1);break;case 0x8:this[_0x5af2c9(0x600)](0x4);break;case 0x9:this['setDirection'](0x7);break;}},Game_Character[_0x19393c(0x495)]['getDirectionToPoint']=function(_0x4fb493,_0x152f77,_0x1df670){const _0x2a04b5=_0x19393c,_0x5551d0=this[_0x2a04b5(0x3d1)](_0x4fb493),_0x3fd578=this['deltaYFrom'](_0x152f77);if($gameMap['isSupportDiagonalMovement']()){if(_0x1df670||this[_0x2a04b5(0x56b)]()){if(_0x5551d0>0x0&&_0x3fd578<0x0)return 0x1;if(_0x5551d0<0x0&&_0x3fd578<0x0)return 0x3;if(_0x5551d0>0x0&&_0x3fd578>0x0)return 0x7;if(_0x5551d0<0x0&&_0x3fd578>0x0)return 0x9;}}if(Math[_0x2a04b5(0x376)](_0x5551d0)>Math[_0x2a04b5(0x376)](_0x3fd578))return _0x5551d0>0x0?0x4:0x6;else{if(_0x3fd578!==0x0)return _0x3fd578>0x0?0x8:0x2;}return 0x0;},Game_Character[_0x19393c(0x495)][_0x19393c(0x52c)]=function(_0x4ae0f9,_0x33b31a,_0x3dc662){const _0x272cd0=_0x19393c,_0x474517=this['deltaXFrom'](_0x4ae0f9),_0x5ab421=this[_0x272cd0(0x2a6)](_0x33b31a);if($gameMap['isSupportDiagonalMovement']()){if(_0x3dc662||this[_0x272cd0(0x56b)]()){if(_0x474517>0x0&&_0x5ab421<0x0)return 0x9;if(_0x474517<0x0&&_0x5ab421<0x0)return 0x7;if(_0x474517>0x0&&_0x5ab421>0x0)return 0x3;if(_0x474517<0x0&&_0x5ab421>0x0)return 0x1;}}if(Math[_0x272cd0(0x376)](_0x474517)>Math[_0x272cd0(0x376)](_0x5ab421))return _0x474517>0x0?0x6:0x4;else{if(_0x5ab421!==0x0)return _0x5ab421>0x0?0x2:0x8;}return 0x0;},Game_Character[_0x19393c(0x495)][_0x19393c(0x201)]=function(_0x2b9978,_0x12fabc){const _0x2a7a7c=_0x19393c,_0x44dc29=this[_0x2a7a7c(0x1b1)](_0x2b9978,_0x12fabc,!![]);if(_0x44dc29)this['executeMoveDir8'](_0x44dc29);},Game_Character['prototype'][_0x19393c(0x326)]=function(_0x4261f2,_0x119f84){const _0x187ae8=_0x19393c,_0xda5f85=this[_0x187ae8(0x52c)](_0x4261f2,_0x119f84,!![]);if(_0xda5f85)this['executeMoveDir8'](_0xda5f85);},Game_Character[_0x19393c(0x495)]['turnTowardPoint']=function(_0x2980b3,_0x54ac9d){const _0x1fe139=_0x19393c,_0x4e495a=this[_0x1fe139(0x1b1)](_0x2980b3,_0x54ac9d,![]);if(_0x4e495a)this[_0x1fe139(0x600)](_0x4e495a);},Game_Character[_0x19393c(0x495)][_0x19393c(0x235)]=function(_0x3c2f58,_0x3da250){const _0x1e6810=this['getDirectionFromPoint'](_0x3c2f58,_0x3da250,![]);if(_0x1e6810)this['setDirection'](_0x1e6810);},Game_Character[_0x19393c(0x495)][_0x19393c(0x4dd)]=function(_0x36c702){const _0x265b68=_0x19393c;if(_0x36c702)this[_0x265b68(0x201)](_0x36c702['x'],_0x36c702['y']);},Game_Character[_0x19393c(0x495)][_0x19393c(0x2fc)]=function(_0x44de08){if(_0x44de08)this['moveAwayFromPoint'](_0x44de08['x'],_0x44de08['y']);},Game_Character['prototype'][_0x19393c(0x241)]=function(_0x5950d1){const _0x4dc99c=_0x19393c;if(_0x5950d1)this[_0x4dc99c(0x21c)](_0x5950d1['x'],_0x5950d1['y']);},Game_Character[_0x19393c(0x495)][_0x19393c(0x5d8)]=function(_0x3ba361){if(_0x3ba361)this['turnAwayFromPoint'](_0x3ba361['x'],_0x3ba361['y']);},VisuMZ[_0x19393c(0x532)][_0x19393c(0x5e1)]=Game_Player[_0x19393c(0x495)][_0x19393c(0x499)],Game_Player[_0x19393c(0x495)]['isDashing']=function(){const _0xe1f110=_0x19393c;if(!Game_CharacterBase['ALLOW_LADDER_DASH']&&this['isOnLadder']())return![];if(this['_forceDashing'])return!![];return VisuMZ[_0xe1f110(0x532)][_0xe1f110(0x5e1)][_0xe1f110(0x496)](this);},VisuMZ['EventsMoveCore'][_0x19393c(0x336)]=Game_Player[_0x19393c(0x495)][_0x19393c(0x485)],Game_Player[_0x19393c(0x495)]['getInputDirection']=function(){const _0x390413=_0x19393c;return $gameMap[_0x390413(0x314)]()?this[_0x390413(0x2dd)]():VisuMZ[_0x390413(0x532)][_0x390413(0x336)]['call'](this);},Game_Player['prototype']['getInputDir8']=function(){return Input['dir8'];},Game_Player[_0x19393c(0x495)][_0x19393c(0x430)]=function(){const _0x1e01b4=_0x19393c;if($gameSystem[_0x1e01b4(0x375)]())return 0x0;if(!this[_0x1e01b4(0x5de)]()&&this['canMove']()){let _0x3c6fd2=this[_0x1e01b4(0x485)]();if(_0x3c6fd2>0x0)$gameTemp['clearDestination']();else{if($gameTemp[_0x1e01b4(0x1c9)]()){const _0x98bf99=$gameTemp[_0x1e01b4(0x2ab)](),_0x1088f8=$gameTemp[_0x1e01b4(0x367)]();this[_0x1e01b4(0x3b5)](_0x98bf99,_0x1088f8)?_0x3c6fd2=this[_0x1e01b4(0x630)](_0x98bf99,_0x1088f8):_0x3c6fd2=this[_0x1e01b4(0x323)](_0x98bf99,_0x1088f8);}}_0x3c6fd2>0x0?(this['_inputTime']=this[_0x1e01b4(0x24e)]||0x0,this[_0x1e01b4(0x436)]()?this['setDirection'](_0x3c6fd2):this[_0x1e01b4(0x306)](_0x3c6fd2),this['_inputTime']++):this[_0x1e01b4(0x24e)]=0x0;}},Game_Player[_0x19393c(0x495)][_0x19393c(0x436)]=function(){const _0x5a6467=_0x19393c,_0x10fe37=VisuMZ[_0x5a6467(0x532)][_0x5a6467(0x329)][_0x5a6467(0x589)];if(!_0x10fe37[_0x5a6467(0x1c8)])return![];if($gameTemp['isDestinationValid']())return![];if(this[_0x5a6467(0x499)]()||this[_0x5a6467(0x5de)]()||this[_0x5a6467(0x41e)]())return![];return this[_0x5a6467(0x24e)]<_0x10fe37[_0x5a6467(0x23a)];},VisuMZ[_0x19393c(0x532)]['Game_Player_executeMove']=Game_Player[_0x19393c(0x495)]['executeMove'],Game_Player[_0x19393c(0x495)][_0x19393c(0x306)]=function(_0x47360d){const _0x22e261=_0x19393c;$gameMap[_0x22e261(0x314)]()?this[_0x22e261(0x523)](_0x47360d):VisuMZ[_0x22e261(0x532)]['Game_Player_executeMove'][_0x22e261(0x496)](this,_0x47360d);},VisuMZ[_0x19393c(0x532)][_0x19393c(0x2b1)]=Game_Player['prototype'][_0x19393c(0x4d2)],Game_Player[_0x19393c(0x495)]['isMapPassable']=function(_0x39f983,_0x5309b3,_0x2bb09e){const _0x457230=_0x19393c;if($gameMap['isRegionAllowPass'](_0x39f983,_0x5309b3,_0x2bb09e,_0x457230(0x518)))return this[_0x457230(0x319)]()&&this[_0x457230(0x448)]()?this[_0x457230(0x448)]()[_0x457230(0x4d2)](_0x39f983,_0x5309b3,_0x2bb09e):!![];if($gameMap[_0x457230(0x5dc)](_0x39f983,_0x5309b3,_0x2bb09e,_0x457230(0x518)))return![];return VisuMZ[_0x457230(0x532)][_0x457230(0x2b1)][_0x457230(0x496)](this,_0x39f983,_0x5309b3,_0x2bb09e);},VisuMZ[_0x19393c(0x532)][_0x19393c(0x26e)]=Game_Player[_0x19393c(0x495)][_0x19393c(0x521)],Game_Player[_0x19393c(0x495)][_0x19393c(0x521)]=function(_0x2484f5){const _0xa6a078=_0x19393c;VisuMZ['EventsMoveCore'][_0xa6a078(0x26e)][_0xa6a078(0x496)](this,_0x2484f5);if(this[_0xa6a078(0x27f)]()){this[_0xa6a078(0x449)](_0x2484f5);if(_0x2484f5[_0xa6a078(0x239)](0x0)&&this['startMapCommonEventOnOKTarget']()==='standing')this[_0xa6a078(0x220)](this['x'],this['y']);else(_0x2484f5['includes'](0x1)||_0x2484f5[_0xa6a078(0x239)](0x2))&&this[_0xa6a078(0x4d3)]();}},VisuMZ['EventsMoveCore'][_0x19393c(0x528)]=Game_Player[_0x19393c(0x495)][_0x19393c(0x22b)],Game_Player['prototype'][_0x19393c(0x22b)]=function(_0x4142da){const _0x459b15=_0x19393c;VisuMZ[_0x459b15(0x532)][_0x459b15(0x528)][_0x459b15(0x496)](this,_0x4142da);if(this[_0x459b15(0x27f)]()&&_0x4142da[_0x459b15(0x239)](0x0)&&this[_0x459b15(0x370)]()===_0x459b15(0x246)){const _0x4192fd=this[_0x459b15(0x4c5)](),_0x3bc3fa=$gameMap[_0x459b15(0x624)](this['x'],_0x4192fd),_0x50d51b=$gameMap['roundYWithDirection'](this['y'],_0x4192fd);this[_0x459b15(0x220)](_0x3bc3fa,_0x50d51b);}},Game_Player['prototype'][_0x19393c(0x449)]=function(_0x18d2b9){const _0x37ee7a=_0x19393c;if($gameMap[_0x37ee7a(0x586)]())return;if($gameMap[_0x37ee7a(0x613)]())return;const _0xf120c1=$gameMap[_0x37ee7a(0x3c6)]();for(const _0x1da180 of _0xf120c1){if(!_0x1da180)continue;if(!_0x1da180[_0x37ee7a(0x3d4)](_0x18d2b9))continue;if(this['meetActivationRegionConditions'](_0x1da180))return _0x1da180[_0x37ee7a(0x53f)]();if(this[_0x37ee7a(0x49c)](_0x1da180))return _0x1da180[_0x37ee7a(0x53f)]();}},Game_Player[_0x19393c(0x495)][_0x19393c(0x4f4)]=function(_0x88998c){const _0x17634d=_0x19393c;if($gameMap['isEventRunning']())return![];if($gameMap['isAnyEventStarting']())return![];return _0x88998c[_0x17634d(0x212)]()[_0x17634d(0x239)](this[_0x17634d(0x51e)]());},Game_Player[_0x19393c(0x495)][_0x19393c(0x49c)]=function(_0x1341a2){const _0x468152=_0x19393c;if($gameMap['isEventRunning']())return![];if($gameMap['isAnyEventStarting']())return![];if([_0x468152(0x40e),_0x468152(0x4ff)][_0x468152(0x239)](_0x1341a2['activationProximityType']()))return![];const _0x4158c6=_0x1341a2['activationProximityType'](),_0x42f4c5=_0x1341a2[_0x468152(0x491)]();return this[_0x468152(0x4b7)](_0x1341a2,_0x4158c6,_0x42f4c5);},Game_Map[_0x19393c(0x495)][_0x19393c(0x4b7)]=function(_0x3aea86,_0x2279a9,_0xce07dc,_0x4f8a05,_0x238fe7){const _0x39cf70=_0x19393c;switch(_0x4f8a05){case _0x39cf70(0x4f0):return _0x238fe7>=Math[_0x39cf70(0x376)](_0xce07dc['deltaXFrom'](_0x3aea86))&&_0x238fe7>=Math[_0x39cf70(0x376)](_0xce07dc['deltaYFrom'](_0x2279a9));break;case _0x39cf70(0x4ea):const _0x215221=Math[_0x39cf70(0x52d)](_0xce07dc['x']-_0x3aea86,0x2),_0x243b81=Math[_0x39cf70(0x52d)](_0xce07dc['y']-_0x2279a9,0x2);return _0x238fe7>=Math[_0x39cf70(0x25f)](Math[_0x39cf70(0x2cd)](_0x215221+_0x243b81));break;case'radius':case _0x39cf70(0x332):case _0x39cf70(0x5d6):const _0x4c1934=$gameMap['distance'](_0x3aea86,_0x2279a9,_0xce07dc['x'],_0xce07dc['y']);return _0x238fe7>=_0x4c1934;break;case _0x39cf70(0x204):return _0x238fe7>=Math['abs'](_0xce07dc[_0x39cf70(0x2a6)](_0x2279a9));break;case'column':return _0x238fe7>=Math['abs'](_0xce07dc[_0x39cf70(0x3d1)](_0x3aea86));break;}return![];},Game_Player[_0x19393c(0x495)][_0x19393c(0x4b7)]=function(_0x5223d3,_0x3313a6,_0x46368c){const _0x43c5a3=_0x19393c,_0x5662e9=this['x'],_0x4f18c5=this['y'];return $gameMap[_0x43c5a3(0x4b7)](_0x5662e9,_0x4f18c5,_0x5223d3,_0x3313a6,_0x46368c);},Game_Player[_0x19393c(0x495)][_0x19393c(0x220)]=function(_0x8346c6,_0x5a6fee){const _0x5c9dbe=_0x19393c;if($gameMap[_0x5c9dbe(0x586)]())return;if($gameMap[_0x5c9dbe(0x613)]())return;let _0x5f3699=VisuMZ[_0x5c9dbe(0x532)][_0x5c9dbe(0x329)]['RegionOk'],_0x2f0f5e=$gameMap['regionId'](_0x8346c6,_0x5a6fee);const _0xcf30dd=_0x5c9dbe(0x3db)[_0x5c9dbe(0x2ea)](_0x2f0f5e);_0x5f3699[_0xcf30dd]&&$gameTemp[_0x5c9dbe(0x38f)](_0x5f3699[_0xcf30dd]);},Game_Player[_0x19393c(0x495)][_0x19393c(0x370)]=function(){const _0x31ad27=_0x19393c;return VisuMZ[_0x31ad27(0x532)][_0x31ad27(0x329)][_0x31ad27(0x5c3)];},Game_Player['prototype'][_0x19393c(0x4d3)]=function(){const _0x311579=_0x19393c;if($gameMap[_0x311579(0x586)]())return;if($gameMap['isAnyEventStarting']())return;let _0x4c6c6a=VisuMZ[_0x311579(0x532)]['Settings'][_0x311579(0x5b6)];const _0x29dd4b=_0x311579(0x3db)['format'](this['regionId']());_0x4c6c6a[_0x29dd4b]&&$gameTemp[_0x311579(0x38f)](_0x4c6c6a[_0x29dd4b]);},VisuMZ[_0x19393c(0x532)]['Game_Player_increaseSteps']=Game_Player[_0x19393c(0x495)][_0x19393c(0x208)],Game_Player[_0x19393c(0x495)][_0x19393c(0x208)]=function(){const _0x36cb13=_0x19393c;VisuMZ[_0x36cb13(0x532)][_0x36cb13(0x535)][_0x36cb13(0x496)](this),VisuMZ[_0x36cb13(0x3fd)](0x0);},Game_Player[_0x19393c(0x495)][_0x19393c(0x3cb)]=function(){const _0x730030=_0x19393c;VisuMZ[_0x730030(0x472)](0x0);},VisuMZ[_0x19393c(0x532)]['Game_Follower_initialize']=Game_Follower[_0x19393c(0x495)][_0x19393c(0x46e)],Game_Follower[_0x19393c(0x495)][_0x19393c(0x46e)]=function(_0x4be8a5){const _0x5227d2=_0x19393c;VisuMZ['EventsMoveCore'][_0x5227d2(0x5cb)][_0x5227d2(0x496)](this,_0x4be8a5),this[_0x5227d2(0x171)]=![];},Game_Follower['prototype'][_0x19393c(0x499)]=function(){const _0x43993a=_0x19393c;if(this[_0x43993a(0x171)])return Game_Character['prototype'][_0x43993a(0x499)][_0x43993a(0x496)](this);return $gamePlayer[_0x43993a(0x499)]();},Game_Follower['prototype']['isDashingAndMoving']=function(){const _0x1e2e97=_0x19393c;if(this[_0x1e2e97(0x171)])return Game_Character[_0x1e2e97(0x495)][_0x1e2e97(0x423)][_0x1e2e97(0x496)](this);return $gamePlayer[_0x1e2e97(0x423)]()&&this['_actuallyMoving'];},Game_Follower[_0x19393c(0x495)][_0x19393c(0x3a5)]=function(){const _0x4dc3a6=_0x19393c;return $gamePlayer[_0x4dc3a6(0x3a5)]();},Game_Follower[_0x19393c(0x495)][_0x19393c(0x29d)]=function(){const _0x2c8efa=_0x19393c;Game_Character['prototype'][_0x2c8efa(0x29d)]['call'](this),this[_0x2c8efa(0x16e)]>0x0&&(this[_0x2c8efa(0x18c)]=![]);},Game_Follower[_0x19393c(0x495)]['setChaseOff']=function(_0x515493){const _0x5dc8dd=_0x19393c;this[_0x5dc8dd(0x171)]=_0x515493;},VisuMZ['EventsMoveCore'][_0x19393c(0x26d)]=Game_Follower[_0x19393c(0x495)][_0x19393c(0x62e)],Game_Follower[_0x19393c(0x495)][_0x19393c(0x62e)]=function(_0x56946a){const _0x282395=_0x19393c;if(this['_chaseOff'])return;if($gameSystem['isStopFollowerChasing']())return;VisuMZ['EventsMoveCore'][_0x282395(0x26d)]['call'](this,_0x56946a),this[_0x282395(0x18c)]=!![];},VisuMZ[_0x19393c(0x532)]['Game_Vehicle_isMapPassable']=Game_Vehicle[_0x19393c(0x495)][_0x19393c(0x4d2)],Game_Vehicle['prototype']['isMapPassable']=function(_0xd44ba1,_0x64b540,_0x28979a){const _0x23e1df=_0x19393c;if($gameMap['isRegionAllowPass'](_0xd44ba1,_0x64b540,_0x28979a,this[_0x23e1df(0x2d5)]))return!![];if($gameMap[_0x23e1df(0x5dc)](_0xd44ba1,_0x64b540,_0x28979a,this[_0x23e1df(0x2d5)]))return![];return VisuMZ[_0x23e1df(0x532)][_0x23e1df(0x411)][_0x23e1df(0x496)](this,_0xd44ba1,_0x64b540,_0x28979a);},Game_Vehicle[_0x19393c(0x495)][_0x19393c(0x5c2)]=function(_0x36f11a,_0x1ee1e9,_0x3b36df){const _0x11fcc2=_0x19393c;if($gameMap[_0x11fcc2(0x38c)](_0x36f11a,_0x1ee1e9,_0x3b36df,this['_type']))return!![];if($gameMap['isRegionForbidPass'](_0x36f11a,_0x1ee1e9,_0x3b36df,this['_type']))return![];return VisuMZ['EventsMoveCore']['Game_CharacterBase_canPass'][_0x11fcc2(0x496)]($gamePlayer,_0x36f11a,_0x1ee1e9,_0x3b36df);},VisuMZ[_0x19393c(0x532)]['Game_Vehicle_isLandOk']=Game_Vehicle['prototype']['isLandOk'],Game_Vehicle[_0x19393c(0x495)][_0x19393c(0x27c)]=function(_0x465f3a,_0x45e28d,_0x3cd0fe){const _0x5d5ae1=_0x19393c;if($gameMap[_0x5d5ae1(0x42d)](_0x465f3a,_0x45e28d,_0x3cd0fe,this[_0x5d5ae1(0x2d5)]))return!![];const _0x5735ad=this['_type']['charAt'](0x0)[_0x5d5ae1(0x62f)]()+this['_type']['slice'](0x1),_0x457ba3=_0x5d5ae1(0x573)[_0x5d5ae1(0x2ea)](_0x5735ad);return VisuMZ[_0x5d5ae1(0x532)][_0x5d5ae1(0x329)][_0x5d5ae1(0x18d)][_0x457ba3]?![]:VisuMZ[_0x5d5ae1(0x532)][_0x5d5ae1(0x2fd)]['call'](this,_0x465f3a,_0x45e28d,_0x3cd0fe);},VisuMZ[_0x19393c(0x532)][_0x19393c(0x361)]=Game_Vehicle[_0x19393c(0x495)][_0x19393c(0x50c)],Game_Vehicle[_0x19393c(0x495)][_0x19393c(0x50c)]=function(){const _0x4086d6=_0x19393c;VisuMZ['EventsMoveCore'][_0x4086d6(0x361)]['call'](this);const _0x3d27fa=VisuMZ[_0x4086d6(0x532)]['Settings'][_0x4086d6(0x589)];if(this[_0x4086d6(0x1f0)]()){if(_0x3d27fa[_0x4086d6(0x328)])this[_0x4086d6(0x3cd)](_0x3d27fa[_0x4086d6(0x328)]);}else{if(this[_0x4086d6(0x402)]()){if(_0x3d27fa[_0x4086d6(0x16f)])this[_0x4086d6(0x3cd)](_0x3d27fa[_0x4086d6(0x16f)]);}else{if(this[_0x4086d6(0x266)]()){if(_0x3d27fa[_0x4086d6(0x49b)])this[_0x4086d6(0x3cd)](_0x3d27fa[_0x4086d6(0x49b)]);}}}},VisuMZ[_0x19393c(0x532)][_0x19393c(0x4b9)]=Game_Event['prototype'][_0x19393c(0x46e)],Game_Event[_0x19393c(0x495)][_0x19393c(0x46e)]=function(_0x341480,_0x1fa405){const _0x2bc40b=_0x19393c;this[_0x2bc40b(0x634)]=!![],VisuMZ['EventsMoveCore']['Game_Event_initialize'][_0x2bc40b(0x496)](this,_0x341480,_0x1fa405),this[_0x2bc40b(0x634)]=undefined,this[_0x2bc40b(0x3ea)](),this[_0x2bc40b(0x479)](),this[_0x2bc40b(0x315)]();},Game_Map[_0x19393c(0x495)][_0x19393c(0x5f1)]=function(_0xefa039,_0x583c84){const _0x3f9f5e=_0x19393c;return _0xefa039===$gameMap[_0x3f9f5e(0x473)]()?$dataMap['events'][_0x583c84]:VisuMZ[_0x3f9f5e(0x46d)][_0xefa039][_0x3f9f5e(0x3c6)][_0x583c84];},VisuMZ[_0x19393c(0x532)][_0x19393c(0x1bd)]=Game_Event[_0x19393c(0x495)][_0x19393c(0x5ab)],Game_Event['prototype']['event']=function(){const _0x3b4708=_0x19393c;if(this[_0x3b4708(0x4a6)]!==undefined){const _0x85a6df=this[_0x3b4708(0x4a6)][_0x3b4708(0x473)],_0x64f301=this[_0x3b4708(0x4a6)][_0x3b4708(0x2ed)];return $gameMap[_0x3b4708(0x5f1)](_0x85a6df,_0x64f301);}if(this[_0x3b4708(0x280)]!==undefined){const _0x39447b=this['_eventCopyData'][_0x3b4708(0x473)],_0x5c491a=this['_eventCopyData'][_0x3b4708(0x2ed)];return $gameMap[_0x3b4708(0x5f1)](_0x39447b,_0x5c491a);}if(this[_0x3b4708(0x503)]!==undefined){const _0x4fe8d6=this['_eventSpawnData'][_0x3b4708(0x473)],_0x1f0f44=this['_eventSpawnData'][_0x3b4708(0x2ed)];return $gameMap[_0x3b4708(0x5f1)](_0x4fe8d6,_0x1f0f44);}if($gameTemp[_0x3b4708(0x480)]!==undefined){const _0x44b57e=$gameTemp['_spawnData'][_0x3b4708(0x473)],_0x5a5bd5=$gameTemp[_0x3b4708(0x480)]['eventId'];return $gameMap[_0x3b4708(0x5f1)](_0x44b57e,_0x5a5bd5);}return VisuMZ[_0x3b4708(0x532)][_0x3b4708(0x1bd)][_0x3b4708(0x496)](this);},Game_Event['prototype'][_0x19393c(0x189)]=function(_0x463cc5,_0x375f3b){const _0x47adec=_0x19393c;if(_0x463cc5===0x0||_0x375f3b===0x0)return![];if(_0x463cc5===$gameMap['mapId']())return!![];if(!VisuMZ[_0x47adec(0x46d)][_0x463cc5]&&_0x463cc5!==$gameMap[_0x47adec(0x473)]())return $gameTemp[_0x47adec(0x56e)]()&&console[_0x47adec(0x2ff)](_0x47adec(0x213)['format'](_0x463cc5)),![];return!![];},VisuMZ[_0x19393c(0x532)][_0x19393c(0x60e)]=Game_Event[_0x19393c(0x495)]['start'],Game_Event[_0x19393c(0x495)][_0x19393c(0x53f)]=function(){const _0x37dc0c=_0x19393c;VisuMZ[_0x37dc0c(0x532)]['Game_Event_start']['call'](this),Imported[_0x37dc0c(0x1a1)]&&Input[_0x37dc0c(0x304)](VisuMZ[_0x37dc0c(0x505)]['Settings'][_0x37dc0c(0x1cf)][_0x37dc0c(0x553)])&&Input[_0x37dc0c(0x56d)]();},Game_Event['prototype']['setupCopyEvent']=function(){const _0x2541cf=_0x19393c,_0xf44afd=this[_0x2541cf(0x5ab)]()[_0x2541cf(0x58c)];if(_0xf44afd==='')return;if(DataManager[_0x2541cf(0x2e5)]()||DataManager[_0x2541cf(0x4ab)]())return;const _0x50bf23=VisuMZ[_0x2541cf(0x532)][_0x2541cf(0x329)]['Template'];let _0x5bea99=null,_0x4d7bf4=0x0,_0x9f9c7f=0x0;if(_0xf44afd[_0x2541cf(0x1cb)](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i)){_0x4d7bf4=Number(RegExp['$1']),_0x9f9c7f=Number(RegExp['$2']);if(_0x4d7bf4===0x0)_0x4d7bf4=$gameMap[_0x2541cf(0x473)]();}else{if(_0xf44afd['match'](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i)){_0x4d7bf4=Number(RegExp['$1']),_0x9f9c7f=Number(RegExp['$2']);if(_0x4d7bf4===0x0)_0x4d7bf4=$gameMap[_0x2541cf(0x473)]();}else{if(_0xf44afd[_0x2541cf(0x1cb)](/<COPY EVENT:[ ](.*?)>/i)){const _0x4ac457=String(RegExp['$1'])[_0x2541cf(0x62f)]()[_0x2541cf(0x1d6)]();_0x5bea99=VisuMZ['EventTemplates'][_0x4ac457];if(!_0x5bea99)return;_0x4d7bf4=_0x5bea99[_0x2541cf(0x3ce)],_0x9f9c7f=_0x5bea99[_0x2541cf(0x30a)];}}}if(!this[_0x2541cf(0x189)](_0x4d7bf4,_0x9f9c7f))return;_0x50bf23[_0x2541cf(0x2b3)]['call'](this,_0x4d7bf4,_0x9f9c7f,this);if(_0x5bea99)_0x5bea99[_0x2541cf(0x2b3)][_0x2541cf(0x496)](this,_0x4d7bf4,_0x9f9c7f,this);this['_eventCopyData']={'mapId':_0x4d7bf4,'eventId':_0x9f9c7f},this[_0x2541cf(0x432)]=-0x2,this[_0x2541cf(0x464)](),_0x50bf23[_0x2541cf(0x5ba)][_0x2541cf(0x496)](this,_0x4d7bf4,_0x9f9c7f,this);if(_0x5bea99)_0x5bea99[_0x2541cf(0x5ba)][_0x2541cf(0x496)](this,_0x4d7bf4,_0x9f9c7f,this);$gameMap['clearEventCache']();},Game_Event[_0x19393c(0x495)][_0x19393c(0x479)]=function(){const _0x4529c9=_0x19393c,_0x334d9c=$gameSystem[_0x4529c9(0x3f7)](this);if(!_0x334d9c)return;const _0x2dec9c=_0x334d9c[_0x4529c9(0x4f1)][_0x4529c9(0x62f)]()['trim']();_0x2dec9c!==_0x4529c9(0x30b)?this[_0x4529c9(0x49a)](_0x2dec9c,!![]):this[_0x4529c9(0x2c5)](_0x334d9c['mapId'],_0x334d9c[_0x4529c9(0x2ed)],!![]);},Game_Event[_0x19393c(0x495)][_0x19393c(0x2c5)]=function(_0x398f04,_0x1d4977,_0x8bc2a5){const _0xdd625f=_0x19393c;if(!this[_0xdd625f(0x189)](_0x398f04,_0x1d4977))return;const _0x21231a=VisuMZ[_0xdd625f(0x532)][_0xdd625f(0x329)][_0xdd625f(0x5d7)];if(!_0x8bc2a5)_0x21231a[_0xdd625f(0x421)][_0xdd625f(0x496)](this,_0x398f04,_0x1d4977,this);this['_eventMorphData']={'mapId':_0x398f04,'eventId':_0x1d4977},this[_0xdd625f(0x432)]=-0x2,this[_0xdd625f(0x464)]();if(!_0x8bc2a5)_0x21231a[_0xdd625f(0x28f)][_0xdd625f(0x496)](this,_0x398f04,_0x1d4977,this);$gameMap[_0xdd625f(0x28e)]();},Game_Event['prototype'][_0x19393c(0x49a)]=function(_0x1ad201,_0x18d86e){const _0x820d17=_0x19393c;_0x1ad201=_0x1ad201['toUpperCase']()[_0x820d17(0x1d6)]();const _0x1fe540=VisuMZ[_0x820d17(0x50a)][_0x1ad201];if(!_0x1fe540)return;const _0x742959=_0x1fe540['MapID'],_0x139d45=_0x1fe540[_0x820d17(0x30a)];if(!this[_0x820d17(0x189)](_0x742959,_0x139d45))return;if(!_0x18d86e)_0x1fe540[_0x820d17(0x421)][_0x820d17(0x496)](this,_0x742959,_0x139d45,this);this[_0x820d17(0x2c5)](_0x742959,_0x139d45,_0x18d86e);if(!_0x18d86e)_0x1fe540[_0x820d17(0x28f)][_0x820d17(0x496)](this,_0x742959,_0x139d45,this);if($gameMap)$gameMap[_0x820d17(0x28e)]();},Game_Event[_0x19393c(0x495)][_0x19393c(0x264)]=function(){const _0x27c505=_0x19393c;this[_0x27c505(0x4a6)]=undefined,this['_pageIndex']=-0x2,this[_0x27c505(0x464)]();},Game_Event['prototype'][_0x19393c(0x3e7)]=function(_0x512627){const _0x5535fc=_0x19393c,_0xfd5717=VisuMZ[_0x5535fc(0x532)][_0x5535fc(0x329)]['Template'],_0x82afbf=_0x512627[_0x5535fc(0x4f1)]['toUpperCase']()['trim'](),_0x273ddd=!['',_0x5535fc(0x30b)][_0x5535fc(0x239)](_0x82afbf);let _0x134657=0x0,_0x423127=0x0;if(_0x273ddd){const _0xef06d3=VisuMZ[_0x5535fc(0x50a)][_0x82afbf];if(!_0xef06d3)return;_0x134657=_0xef06d3[_0x5535fc(0x3ce)],_0x423127=_0xef06d3[_0x5535fc(0x30a)];}else _0x134657=_0x512627['mapId'],_0x423127=_0x512627[_0x5535fc(0x2ed)];if(!this[_0x5535fc(0x189)](_0x134657,_0x423127))return;if(_0x273ddd){const _0x210277=VisuMZ[_0x5535fc(0x50a)][_0x82afbf];_0x210277[_0x5535fc(0x442)][_0x5535fc(0x496)](this,_0x134657,_0x423127,this);}_0xfd5717['PreSpawnJS']['call'](this,_0x134657,_0x423127,this),this[_0x5535fc(0x503)]=_0x512627,this['_pageIndex']=-0x2,this[_0x5535fc(0x4e6)]=$gameMap[_0x5535fc(0x473)](),this['_eventId']=_0x512627[_0x5535fc(0x43b)],this[_0x5535fc(0x281)]=_0x512627[_0x5535fc(0x461)],this[_0x5535fc(0x34d)](_0x512627['x'],_0x512627['y']),this[_0x5535fc(0x600)](_0x512627[_0x5535fc(0x4c5)]),this[_0x5535fc(0x464)]();if(_0x273ddd){const _0x19a97b=VisuMZ[_0x5535fc(0x50a)][_0x82afbf];if(!_0x19a97b)return;_0x19a97b[_0x5535fc(0x5b4)][_0x5535fc(0x496)](this,_0x134657,_0x423127,this);}_0xfd5717[_0x5535fc(0x5b4)]['call'](this,_0x134657,_0x423127,this);const _0x21f31d=SceneManager[_0x5535fc(0x4ee)];if(_0x21f31d&&_0x21f31d[_0x5535fc(0x46a)])_0x21f31d[_0x5535fc(0x46a)][_0x5535fc(0x193)](this);},Game_Event['prototype'][_0x19393c(0x1eb)]=function(){const _0x23a22c=_0x19393c;return!!this[_0x23a22c(0x503)];},Game_Event[_0x19393c(0x495)][_0x19393c(0x53f)]=function(){const _0x4c9d36=_0x19393c;if(!this[_0x4c9d36(0x344)]())return;const _0x1fb904=this['list']()[_0x4c9d36(0x166)](_0x308830=>_0x308830[_0x4c9d36(0x5c9)]!==0x6c&&_0x308830[_0x4c9d36(0x5c9)]!==0x198);_0x1fb904['length']>0x1&&(this['_starting']=!![],this[_0x4c9d36(0x3d4)]([0x0,0x1,0x2])&&this[_0x4c9d36(0x63d)]());},VisuMZ['EventsMoveCore']['Game_Event_clearPageSettings']=Game_Event['prototype'][_0x19393c(0x1d2)],Game_Event[_0x19393c(0x495)][_0x19393c(0x1d2)]=function(){const _0x5bcc92=_0x19393c;VisuMZ[_0x5bcc92(0x532)][_0x5bcc92(0x5bc)][_0x5bcc92(0x496)](this),this[_0x5bcc92(0x574)](),this[_0x5bcc92(0x5c6)]();},VisuMZ[_0x19393c(0x532)][_0x19393c(0x352)]=Game_Event[_0x19393c(0x495)][_0x19393c(0x5d2)],Game_Event['prototype'][_0x19393c(0x5d2)]=function(){const _0x5df8d2=_0x19393c;this[_0x5df8d2(0x475)]=!![],VisuMZ[_0x5df8d2(0x532)][_0x5df8d2(0x352)][_0x5df8d2(0x496)](this),this['setupEventsMoveCoreEffects'](),this[_0x5df8d2(0x5c6)](),this[_0x5df8d2(0x475)]=![];},Game_Event['prototype']['setupEventsMoveCoreEffects']=function(){const _0x4d43e1=_0x19393c;if(!this[_0x4d43e1(0x5ab)]())return;this['initEventsMoveCoreEffects'](),this[_0x4d43e1(0x190)](),this[_0x4d43e1(0x3b1)](),this[_0x4d43e1(0x4a1)]();},Game_Event[_0x19393c(0x495)][_0x19393c(0x190)]=function(){const _0x2a9987=_0x19393c,_0xb9820d=this[_0x2a9987(0x5ab)]()[_0x2a9987(0x58c)];if(_0xb9820d==='')return;this[_0x2a9987(0x2ac)](_0xb9820d);},Game_Event[_0x19393c(0x495)]['setupEventsMoveCoreCommentTags']=function(){const _0x3799db=_0x19393c;if(!this[_0x3799db(0x51c)]())return;const _0x567d5f=this[_0x3799db(0x344)]();let _0x5b3a58='';for(const _0x4dcbd9 of _0x567d5f){if([0x6c,0x198][_0x3799db(0x239)](_0x4dcbd9[_0x3799db(0x5c9)])){if(_0x5b3a58!=='')_0x5b3a58+='\x0a';_0x5b3a58+=_0x4dcbd9[_0x3799db(0x313)][0x0];}}this['checkEventsMoveCoreStringTags'](_0x5b3a58);},Game_Event['prototype'][_0x19393c(0x574)]=function(){const _0x325c95=_0x19393c,_0x276761=VisuMZ[_0x325c95(0x532)][_0x325c95(0x329)];this[_0x325c95(0x34a)]={'type':'none','distance':0x0,'regionList':[]},this['_alwaysUpdateMove']=![],this[_0x325c95(0x5c0)](),this['_clickTrigger']=![],this[_0x325c95(0x608)]=![],this['_addedHitbox']={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this['_encounterHalfProximity']={'type':_0x325c95(0x40e),'distance':0x0},this[_0x325c95(0x338)]={'type':_0x325c95(0x40e),'distance':0x0},$gameSystem[_0x325c95(0x544)](this),this[_0x325c95(0x2ce)]=$gameSystem[_0x325c95(0x439)](this),this[_0x325c95(0x4e0)]={'originalText':'','text':'','visibleRange':_0x276761[_0x325c95(0x63e)][_0x325c95(0x4d5)],'rangeType':_0x276761[_0x325c95(0x63e)][_0x325c95(0x551)],'offsetX':_0x276761[_0x325c95(0x63e)][_0x325c95(0x17c)],'offsetY':_0x276761[_0x325c95(0x63e)][_0x325c95(0x2b2)],'hueShift':0x0},this[_0x325c95(0x4e2)]=![],this[_0x325c95(0x2fa)]=[],this[_0x325c95(0x5b7)]={'target':-0x1,'type':_0x325c95(0x599),'delay':0x1,'opacityDelta':0x0},this[_0x325c95(0x389)]=_0x276761[_0x325c95(0x589)][_0x325c95(0x529)]??0x0,this[_0x325c95(0x3a1)]=![],this[_0x325c95(0x619)]=0x1,this[_0x325c95(0x48b)]=0x1,this[_0x325c95(0x425)]=![],this[_0x325c95(0x525)]=![],this[_0x325c95(0x1cc)]=![],this['_shadowGraphic']={'visible':!![],'filename':_0x276761[_0x325c95(0x589)][_0x325c95(0x56c)]},this[_0x325c95(0x427)]={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this[_0x325c95(0x405)](),this['clearStepPattern']();},Game_Event[_0x19393c(0x495)][_0x19393c(0x2ac)]=function(_0xef9f26){const _0x1349fa=_0x19393c;if(_0xef9f26[_0x1349fa(0x1cb)](/<ACTIVATION[ ](?:REGION|REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i))this[_0x1349fa(0x34a)]['regionList']=JSON[_0x1349fa(0x29e)]('['+RegExp['$1'][_0x1349fa(0x1cb)](/\d+/g)+']'),this['_activationProximity'][_0x1349fa(0x61b)]=_0x1349fa(0x4ff);else _0xef9f26['match'](/<ACTIVATION[ ](.*?):[ ](\d+)>/i)&&(type=String(RegExp['$1'])[_0x1349fa(0x1f8)]()[_0x1349fa(0x1d6)](),this['_activationProximity'][_0x1349fa(0x61b)]=type,this[_0x1349fa(0x34a)][_0x1349fa(0x3b3)]=Number(RegExp['$2']));_0xef9f26[_0x1349fa(0x1cb)](/<(?:ATTACH |)PICTURE FILENAME:[ ](.*?)>/i)&&(this[_0x1349fa(0x255)][_0x1349fa(0x1f7)]=String(RegExp['$1']),this[_0x1349fa(0x255)]['type']='picture');if(_0xef9f26[_0x1349fa(0x1cb)](/<(?:ATTACH |)(?:PICTURE|ENEMY|SV ENEMY) BLEND MODE:[ ](.*?)>/i)){const _0x5a2242=String(RegExp['$1'])[_0x1349fa(0x62f)]()[_0x1349fa(0x1d6)](),_0x2d27a0=[_0x1349fa(0x5ef),_0x1349fa(0x5bf),'MULTIPLY',_0x1349fa(0x44b)];this[_0x1349fa(0x255)][_0x1349fa(0x5fa)]=_0x2d27a0[_0x1349fa(0x254)](_0x5a2242)[_0x1349fa(0x176)](0x0,0x3);}_0xef9f26[_0x1349fa(0x1cb)](/<(?:ATTACH |)(?:PICTURE|ENEMY|SV ENEMY) (?:SIZE|MAX SIZE|MAX):[ ](\d+)>/i)&&(this['_attachPicture'][_0x1349fa(0x63a)]=Number(RegExp['$1']));_0xef9f26[_0x1349fa(0x1cb)](/<(?:ATTACH |)(?:PICTURE|ENEMY|SV ENEMY) OFFSET X:[ ]([\+\-]\d+)>/i)&&(this[_0x1349fa(0x255)]['offsetX']=Number(RegExp['$1']));_0xef9f26['match'](/<(?:ATTACH |)(?:PICTURE|ENEMY|SV ENEMY) OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this[_0x1349fa(0x255)][_0x1349fa(0x2a8)]=Number(RegExp['$1']));_0xef9f26[_0x1349fa(0x1cb)](/<(?:ATTACH |)(?:PICTURE|ENEMY|SV ENEMY) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this['_attachPicture'][_0x1349fa(0x33a)]=Number(RegExp['$1']),this[_0x1349fa(0x255)][_0x1349fa(0x2a8)]=Number(RegExp['$2']));_0xef9f26['match'](/<(?:ATTACH |)(?:PICTURE|ENEMY|SV ENEMY) SCALE:[ ](\d+)([%％])>/i)&&(this[_0x1349fa(0x255)][_0x1349fa(0x590)]=Number(RegExp['$1'])*0.01);_0xef9f26[_0x1349fa(0x1cb)](/<(?:ATTACH |)PICTURE TYPE:[ ](.*?)>/i)&&(this[_0x1349fa(0x255)][_0x1349fa(0x61b)]=String(RegExp['$1'])[_0x1349fa(0x1f8)]()[_0x1349fa(0x1d6)]());_0xef9f26[_0x1349fa(0x1cb)](/<(?:ATTACH |)ENEMY FILENAME:[ ](.*?)>/i)&&(this[_0x1349fa(0x255)][_0x1349fa(0x1f7)]=String(RegExp['$1']),this[_0x1349fa(0x255)][_0x1349fa(0x61b)]=_0x1349fa(0x4b8));_0xef9f26[_0x1349fa(0x1cb)](/<(?:ATTACH |)SV ENEMY FILENAME:[ ](.*?)>/i)&&(this[_0x1349fa(0x255)][_0x1349fa(0x1f7)]=String(RegExp['$1']),this[_0x1349fa(0x255)][_0x1349fa(0x61b)]=_0x1349fa(0x61a));_0xef9f26[_0x1349fa(0x1cb)](/<ALWAYS UPDATE MOVEMENT>/i)&&(this[_0x1349fa(0x1aa)]=!![]);_0xef9f26['match'](/<CLICK TRIGGER>/i)&&(this[_0x1349fa(0x305)]=!![]);_0xef9f26['match'](/<CUSTOM Z:[ ](.*?)>/i)&&(this[_0x1349fa(0x608)]=Number(RegExp['$1'])||0x0);_0xef9f26[_0x1349fa(0x1cb)](/<ENC(?:|OUNTER) HALF[ ](.*?):[ ](\d+)>/i)&&(type=String(RegExp['$1'])[_0x1349fa(0x1f8)]()[_0x1349fa(0x1d6)](),this[_0x1349fa(0x3a6)][_0x1349fa(0x61b)]=type,this[_0x1349fa(0x3a6)][_0x1349fa(0x3b3)]=Number(RegExp['$2']));_0xef9f26[_0x1349fa(0x1cb)](/<ENC(?:|OUNTER) NONE[ ](.*?):[ ](\d+)>/i)&&(type=String(RegExp['$1'])['toLowerCase']()[_0x1349fa(0x1d6)](),this[_0x1349fa(0x338)][_0x1349fa(0x61b)]=type,this[_0x1349fa(0x338)]['distance']=Number(RegExp['$2']));const _0x26813d=_0xef9f26[_0x1349fa(0x1cb)](/<HITBOX[ ](.*?):[ ](\d+)>/gi);if(_0x26813d)for(const _0x39f759 of _0x26813d){if(_0x39f759[_0x1349fa(0x1cb)](/<HITBOX[ ](.*?):[ ](\d+)>/i)){const _0xb44d2c=String(RegExp['$1'])['toLowerCase']()['trim'](),_0x37332f=Number(RegExp['$2']);this[_0x1349fa(0x20b)][_0xb44d2c]=_0x37332f;}}if(this[_0x1349fa(0x2ce)][_0x1349fa(0x407)]>=0x0&&!this[_0x1349fa(0x2ce)][_0x1349fa(0x1a0)]){_0xef9f26[_0x1349fa(0x1cb)](/<ICON:[ ](\d+)>/i)&&(this[_0x1349fa(0x2ce)][_0x1349fa(0x407)]=Number(RegExp['$1']));_0xef9f26[_0x1349fa(0x1cb)](/<ICON (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x1349fa(0x2ce)][_0x1349fa(0x20c)]=Number(RegExp['$1']));_0xef9f26[_0x1349fa(0x1cb)](/<ICON (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x1349fa(0x2ce)][_0x1349fa(0x5cd)]=Number(RegExp['$1']));_0xef9f26[_0x1349fa(0x1cb)](/<ICON (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x1349fa(0x2ce)]['bufferX']=Number(RegExp['$1']),this['_eventIcon'][_0x1349fa(0x5cd)]=Number(RegExp['$2']));if(_0xef9f26[_0x1349fa(0x1cb)](/<ICON BLEND MODE:[ ](.*?)>/i)){const _0x1396d6=String(RegExp['$1'])[_0x1349fa(0x62f)]()[_0x1349fa(0x1d6)](),_0x4dfcef=['NORMAL','ADDITIVE',_0x1349fa(0x581),'SCREEN'];this[_0x1349fa(0x2ce)]['blendMode']=_0x4dfcef['indexOf'](_0x1396d6)[_0x1349fa(0x176)](0x0,0x3);}$gameSystem[_0x1349fa(0x60a)](this,this['_eventIcon'][_0x1349fa(0x407)],this[_0x1349fa(0x2ce)][_0x1349fa(0x20c)],this[_0x1349fa(0x2ce)]['bufferY'],this[_0x1349fa(0x2ce)]['blendMode']);}if(_0xef9f26['match'](/<LABEL:[ ](.*?)>/i)){let _0xde7688=String(RegExp['$1'])['trim']();this['_labelWindow']['text']=_0xde7688,this['_labelWindow'][_0x1349fa(0x19f)]=_0xde7688;}if(_0xef9f26['match'](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)){let _0x124eb1=String(RegExp['$1'])['trim']();this[_0x1349fa(0x4e0)][_0x1349fa(0x5f0)]=_0x124eb1,this['_labelWindow']['originalText']=_0x124eb1;}_0xef9f26[_0x1349fa(0x1cb)](/<LABEL (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x1349fa(0x4e0)]['offsetX']=Number(RegExp['$1']));_0xef9f26[_0x1349fa(0x1cb)](/<LABEL (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x1349fa(0x4e0)][_0x1349fa(0x2a8)]=Number(RegExp['$1']));_0xef9f26[_0x1349fa(0x1cb)](/<LABEL (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x1349fa(0x4e0)]['offsetX']=Number(RegExp['$1']),this[_0x1349fa(0x4e0)][_0x1349fa(0x2a8)]=Number(RegExp['$2']));_0xef9f26[_0x1349fa(0x1cb)](/<LABEL HUE SHIFT:[ ](.*?)>/i)&&(this[_0x1349fa(0x4e0)][_0x1349fa(0x569)]=Number(RegExp['$1']));_0xef9f26[_0x1349fa(0x1cb)](/<LABEL RANGE:[ ](\d+)>/i)&&(this[_0x1349fa(0x4e0)][_0x1349fa(0x18e)]=Number(RegExp['$1']));_0xef9f26[_0x1349fa(0x1cb)](/<LABEL RANGE TYPE: SQUARE>/i)&&(this[_0x1349fa(0x4e0)][_0x1349fa(0x595)]='square');_0xef9f26[_0x1349fa(0x1cb)](/<LABEL RANGE TYPE: (?:RADIUS|DELTA|DIAMOND)>/i)&&(this[_0x1349fa(0x4e0)][_0x1349fa(0x595)]=_0x1349fa(0x332));_0xef9f26[_0x1349fa(0x1cb)](/<LABEL RANGE TYPE: CIRCLE>/i)&&(this[_0x1349fa(0x4e0)][_0x1349fa(0x595)]=_0x1349fa(0x4ea));this[_0x1349fa(0x273)]();_0xef9f26['match'](/<MIRROR SPRITE>/i)&&(this[_0x1349fa(0x4e2)]=!![]);if(_0xef9f26[_0x1349fa(0x1cb)](/<MOVE ONLY (?:REGION|REGIONS):[ ](\d+(?:\s*,\s*\d+)*)>/i)){const _0x4208ce=JSON[_0x1349fa(0x29e)]('['+RegExp['$1'][_0x1349fa(0x1cb)](/\d+/g)+']');this[_0x1349fa(0x2fa)]=this['_moveOnlyRegions'][_0x1349fa(0x310)](_0x4208ce),this['_moveOnlyRegions'][_0x1349fa(0x346)](0x0);}if(_0xef9f26[_0x1349fa(0x1cb)](/<MOVE SYNCH TARGET:[ ](.*?)>/i)){const _0x39b658=String(RegExp['$1']);if(_0x39b658[_0x1349fa(0x1cb)](/PLAYER/i))this[_0x1349fa(0x5b7)]['target']=0x0;else _0x39b658[_0x1349fa(0x1cb)](/EVENT[ ](\d+)/i)&&(this['_moveSynch'][_0x1349fa(0x465)]=Number(RegExp['$1']));}_0xef9f26['match'](/<MOVE SYNCH TYPE:[ ](.*?)>/i)&&(this[_0x1349fa(0x5b7)]['type']=String(RegExp['$1'])[_0x1349fa(0x1f8)]()[_0x1349fa(0x1d6)]());_0xef9f26[_0x1349fa(0x1cb)](/<MOVE SYNCH DELAY:[ ](\d+)>/i)&&(this[_0x1349fa(0x5b7)][_0x1349fa(0x424)]=Number(RegExp['$1']));_0xef9f26[_0x1349fa(0x1cb)](/<MOVE SYNCH DISTANCE OPACITY:[ ](.*?)>/i)&&(this['_moveSynch']['opacityDelta']=Number(RegExp['$1']));if(_0xef9f26[_0x1349fa(0x1cb)](/<TRUE RANDOM MOVE>/i))this[_0x1349fa(0x389)]=0x0;else _0xef9f26[_0x1349fa(0x1cb)](/<RANDOM MOVE WEIGHT:[ ](.*?)>/i)&&(this['_randomMoveWeight']=Number(RegExp['$1'])||0x0);_0xef9f26['match'](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0x1349fa(0x3a1)]=!![]);_0xef9f26[_0x1349fa(0x1cb)](/<SCALE X:[ ](\d+)([%％])>/i)&&(this[_0x1349fa(0x619)]=Number(RegExp['$1'])*0.01);_0xef9f26[_0x1349fa(0x1cb)](/<SCALE Y:[ ](\d+)([%％])>/i)&&(this[_0x1349fa(0x48b)]=Number(RegExp['$1'])*0.01);if(_0xef9f26[_0x1349fa(0x1cb)](/<SCALE:[ ](\d+)([%％])>/i)){const _0x283ec3=Number(RegExp['$1'])*0.01;this[_0x1349fa(0x619)]=_0x283ec3,this[_0x1349fa(0x48b)]=_0x283ec3;}_0xef9f26[_0x1349fa(0x1cb)](/<SCREEN ACTIVATION>/i)&&(this[_0x1349fa(0x425)]=!![],this[_0x1349fa(0x525)]=![],this[_0x1349fa(0x1cc)]=![]);if(_0xef9f26[_0x1349fa(0x1cb)](/<SCREEN PARALLEL>/i))this[_0x1349fa(0x425)]=![],this[_0x1349fa(0x525)]=!![],this[_0x1349fa(0x1cc)]=![];else _0xef9f26[_0x1349fa(0x1cb)](/<SCREEN PARALLEL ONCE>/i)&&(this[_0x1349fa(0x425)]=![],this[_0x1349fa(0x525)]=!![],this[_0x1349fa(0x1cc)]=!![]);_0xef9f26[_0x1349fa(0x1cb)](/<HIDE SHADOW>/i)&&(this[_0x1349fa(0x541)][_0x1349fa(0x577)]=![]),_0xef9f26['match'](/<SHADOW FILENAME:[ ](.*?)>/i)&&(this[_0x1349fa(0x541)][_0x1349fa(0x1f7)]=String(RegExp['$1'])),_0xef9f26['match'](/<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i)&&(this['_spriteOffsetX']=Number(RegExp['$1'])),_0xef9f26[_0x1349fa(0x1cb)](/<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this[_0x1349fa(0x4a3)]=Number(RegExp['$1'])),_0xef9f26[_0x1349fa(0x1cb)](/<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this['_spriteOffsetX']=Number(RegExp['$1']),this[_0x1349fa(0x4a3)]=Number(RegExp['$2'])),_0xef9f26['match'](/<STEP PATTERN:[ ](.*)>/i)&&(this[_0x1349fa(0x5df)]=String(RegExp['$1'])[_0x1349fa(0x62f)]()[_0x1349fa(0x1d6)]()),_0xef9f26['match'](/<(?:TILE EXPAND|EXPAND TILE) UP:[ ](\d+)>/i)&&(this[_0x1349fa(0x427)]=this[_0x1349fa(0x427)]||{},this[_0x1349fa(0x427)]['up']=Number(RegExp['$1'])),_0xef9f26[_0x1349fa(0x1cb)](/<(?:TILE EXPAND|EXPAND TILE) DOWN:[ ](\d+)>/i)&&(this[_0x1349fa(0x427)]=this[_0x1349fa(0x427)]||{},this[_0x1349fa(0x427)][_0x1349fa(0x4fa)]=Number(RegExp['$1'])),_0xef9f26[_0x1349fa(0x1cb)](/<(?:TILE EXPAND|EXPAND TILE) LEFT:[ ](\d+)>/i)&&(this[_0x1349fa(0x427)]=this['_tileExpand']||{},this[_0x1349fa(0x427)][_0x1349fa(0x51a)]=Number(RegExp['$1'])),_0xef9f26['match'](/<(?:TILE EXPAND|EXPAND TILE) RIGHT:[ ](\d+)>/i)&&(this[_0x1349fa(0x427)]=this['_tileExpand']||{},this[_0x1349fa(0x427)][_0x1349fa(0x466)]=Number(RegExp['$1']));},Game_Event[_0x19393c(0x495)][_0x19393c(0x273)]=function(){const _0x2fe547=_0x19393c;$gameTemp['registerSelfTarget'](this),this[_0x2fe547(0x4e0)][_0x2fe547(0x5f0)]=this[_0x2fe547(0x4e0)][_0x2fe547(0x19f)];for(;;){if(this[_0x2fe547(0x4e0)][_0x2fe547(0x5f0)][_0x2fe547(0x1cb)](/\\V\[(\d+)\]/gi))this['_labelWindow'][_0x2fe547(0x5f0)]=this[_0x2fe547(0x4e0)][_0x2fe547(0x19f)][_0x2fe547(0x3d3)](/\\V\[(\d+)\]/gi,(_0x521b4d,_0x1672a0)=>$gameVariables['value'](parseInt(_0x1672a0)));else break;}$gameTemp[_0x2fe547(0x1a6)]();},Game_Event[_0x19393c(0x495)][_0x19393c(0x4a1)]=function(){const _0x2ebeb2=_0x19393c;this[_0x2ebeb2(0x1d4)]();},Game_Event[_0x19393c(0x495)][_0x19393c(0x1ec)]=function(){const _0x1c65e8=_0x19393c;if(this[_0x1c65e8(0x1aa)])return!![];return Game_Character['prototype']['isNearTheScreen'][_0x1c65e8(0x496)](this);},VisuMZ['EventsMoveCore'][_0x19393c(0x3f9)]=Game_Event['prototype'][_0x19393c(0x3d0)],Game_Event[_0x19393c(0x495)][_0x19393c(0x3d0)]=function(){const _0x2ad1b1=_0x19393c;if(this[_0x2ad1b1(0x483)]())return;VisuMZ['EventsMoveCore']['Game_Event_updateSelfMovement'][_0x2ad1b1(0x496)](this),this[_0x2ad1b1(0x5de)]()&&VisuMZ[_0x2ad1b1(0x3fd)](this['_eventId']);},Game_Event['prototype'][_0x19393c(0x483)]=function(){const _0x493551=_0x19393c,_0x2327fd=VisuMZ['EventsMoveCore'][_0x493551(0x329)][_0x493551(0x589)];if($gameMap[_0x493551(0x586)]()&&_0x2327fd[_0x493551(0x507)])return!![];if($gameMessage[_0x493551(0x283)]()&&_0x2327fd[_0x493551(0x3b4)])return!![];if(!$gameSystem[_0x493551(0x218)]())return!![];if(this[_0x493551(0x3fa)]()>=0x0)return!![];if(!SceneManager[_0x493551(0x4ee)][_0x493551(0x3e4)])return!![];return![];},Game_Event['prototype'][_0x19393c(0x1d4)]=function(){const _0x2adfd7=_0x19393c,_0x56f512=SceneManager[_0x2adfd7(0x4ee)][_0x2adfd7(0x46a)];if(_0x56f512){const _0x5b6049=_0x56f512[_0x2adfd7(0x1f3)](this);_0x5b6049&&_0x5b6049[_0x2adfd7(0x347)]&&_0x5b6049[_0x2adfd7(0x347)]['_filename']!==this['shadowFilename']()&&(_0x5b6049[_0x2adfd7(0x347)][_0x2adfd7(0x1fc)]=this[_0x2adfd7(0x1b7)](),_0x5b6049[_0x2adfd7(0x347)][_0x2adfd7(0x384)]=ImageManager[_0x2adfd7(0x3fe)](_0x5b6049['_shadowSprite'][_0x2adfd7(0x1fc)]));}},Game_Event['prototype']['shadowFilename']=function(){const _0x53e74b=_0x19393c;return this[_0x53e74b(0x541)][_0x53e74b(0x1f7)];},Game_Event[_0x19393c(0x495)][_0x19393c(0x53c)]=function(){const _0xa72a4d=_0x19393c;if(!this['_shadowGraphic'][_0xa72a4d(0x577)])return![];return Game_CharacterBase[_0xa72a4d(0x495)]['isShadowVisible'][_0xa72a4d(0x496)](this);},Game_Event[_0x19393c(0x495)][_0x19393c(0x602)]=function(){const _0x16f4d0=_0x19393c;return this[_0x16f4d0(0x4e0)][_0x16f4d0(0x5f0)];},Game_Event[_0x19393c(0x495)][_0x19393c(0x2d4)]=function(){const _0x450372=_0x19393c;return this[_0x450372(0x4e0)][_0x450372(0x18e)]??VisuMZ[_0x450372(0x532)]['Settings'][_0x450372(0x63e)][_0x450372(0x4d5)];},Game_Event[_0x19393c(0x495)][_0x19393c(0x5d1)]=function(){const _0x59fd05=_0x19393c;return this[_0x59fd05(0x4e0)]['rangeType']??VisuMZ[_0x59fd05(0x532)]['Settings'][_0x59fd05(0x63e)][_0x59fd05(0x551)]??_0x59fd05(0x4f0);},VisuMZ[_0x19393c(0x532)][_0x19393c(0x5f9)]=function(_0x5cb1c1){const _0xbcc85f=_0x19393c,_0x4738fe=_0x5cb1c1[_0xbcc85f(0x5d1)](),_0x19839c=_0x5cb1c1[_0xbcc85f(0x2d4)]();return $gameMap[_0xbcc85f(0x4b7)]($gamePlayer['x'],$gamePlayer['y'],_0x5cb1c1,_0x4738fe,_0x19839c);},Game_Event['prototype'][_0x19393c(0x4d2)]=function(_0x245a66,_0x25a1b6,_0x4114c1){const _0x41553a=_0x19393c;if(this[_0x41553a(0x1dc)]())return this[_0x41553a(0x25a)](_0x245a66,_0x25a1b6,_0x4114c1);if($gameMap['isRegionAllowPass'](_0x245a66,_0x25a1b6,_0x4114c1,_0x41553a(0x5ab)))return!![];if($gameMap[_0x41553a(0x5dc)](_0x245a66,_0x25a1b6,_0x4114c1,_0x41553a(0x5ab)))return![];return Game_Character[_0x41553a(0x495)][_0x41553a(0x4d2)]['call'](this,_0x245a66,_0x25a1b6,_0x4114c1);},Game_Event[_0x19393c(0x495)][_0x19393c(0x1dc)]=function(){const _0x314307=_0x19393c;if(this['_moveOnlyRegions']===undefined)this['initEventsMoveCoreEffects']();return this['_moveOnlyRegions'][_0x314307(0x5b3)]>0x0;},Game_Event['prototype'][_0x19393c(0x25a)]=function(_0x5de800,_0x4f1432,_0x194bcc){const _0x279eb4=_0x19393c,_0x4784db=$gameMap[_0x279eb4(0x624)](_0x5de800,_0x194bcc),_0x35e049=$gameMap[_0x279eb4(0x4ce)](_0x4f1432,_0x194bcc),_0xcd62c5=$gameMap['regionId'](_0x4784db,_0x35e049);return this[_0x279eb4(0x2fa)][_0x279eb4(0x239)](_0xcd62c5);},VisuMZ[_0x19393c(0x532)][_0x19393c(0x431)]=Game_Event[_0x19393c(0x495)]['findProperPageIndex'],Game_Event[_0x19393c(0x495)][_0x19393c(0x4b2)]=function(){const _0x4ccb28=_0x19393c;if(this[_0x4ccb28(0x5ab)]()&&!$gameTemp[_0x4ccb28(0x56e)]()){if(this['event']()[_0x4ccb28(0x58c)]['match'](/<(?:PLAYTEST|PLAY TEST)>/i))return-0x1;}return this[_0x4ccb28(0x50f)]=![],this[_0x4ccb28(0x257)]=![],this[_0x4ccb28(0x5ab)]()?VisuMZ['EventsMoveCore']['Game_Event_findProperPageIndex'][_0x4ccb28(0x496)](this):-0x1;},VisuMZ[_0x19393c(0x532)]['Game_Event_meetsConditions']=Game_Event[_0x19393c(0x495)]['meetsConditions'],Game_Event[_0x19393c(0x495)]['meetsConditions']=function(_0xab359c){const _0x322094=_0x19393c;this[_0x322094(0x41c)](_0xab359c),$gameTemp['registerSelfTarget'](this);const _0x261b70=VisuMZ[_0x322094(0x532)]['Game_Event_meetsConditions'][_0x322094(0x496)](this,_0xab359c);return $gameTemp['clearSelfTarget'](),_0x261b70;},Game_Event['prototype'][_0x19393c(0x32c)]=function(){const _0x3ab7cc=_0x19393c;return this[_0x3ab7cc(0x50f)];},Game_Event['prototype'][_0x19393c(0x41c)]=function(_0x4e8e84){const _0x7a9d2c=_0x19393c,_0x5185f3=_0x4e8e84[_0x7a9d2c(0x37a)];if(_0x5185f3[_0x7a9d2c(0x2bf)]&&DataManager['isAdvancedSwitch'](_0x5185f3[_0x7a9d2c(0x2e9)]))this[_0x7a9d2c(0x50f)]=!![];else{if(_0x5185f3[_0x7a9d2c(0x59f)]&&DataManager[_0x7a9d2c(0x601)](_0x5185f3['switch2Id']))this['_advancedSwitchVariable']=!![];else _0x5185f3['variableValid']&&DataManager[_0x7a9d2c(0x4aa)](_0x5185f3[_0x7a9d2c(0x354)])&&(this['_advancedSwitchVariable']=!![]);}},Game_Event[_0x19393c(0x495)]['hasClickTrigger']=function(){const _0x5576ee=_0x19393c;if(this[_0x5576ee(0x57f)])return![];return this[_0x5576ee(0x305)];},Game_Event['prototype'][_0x19393c(0x29f)]=function(){const _0x2bf7e2=_0x19393c;$gameTemp[_0x2bf7e2(0x58d)](),this[_0x2bf7e2(0x53f)]();},Game_Event['prototype']['pos']=function(_0x4154fc,_0x2a177c){const _0x394b7d=_0x19393c;return this[_0x394b7d(0x20b)]?this[_0x394b7d(0x233)](_0x4154fc,_0x2a177c):Game_Character['prototype'][_0x394b7d(0x2d3)][_0x394b7d(0x496)](this,_0x4154fc,_0x2a177c);},Game_Event[_0x19393c(0x495)][_0x19393c(0x233)]=function(_0xdcafff,_0xb5fed8){const _0x390cd2=_0x19393c;var _0x24b0c2=this['x']-this[_0x390cd2(0x20b)][_0x390cd2(0x51a)],_0x1b9251=this['x']+this['_addedHitbox']['right'],_0x369ae3=this['y']-this[_0x390cd2(0x20b)]['up'],_0x367cc1=this['y']+this[_0x390cd2(0x20b)]['down'];return _0x24b0c2<=_0xdcafff&&_0xdcafff<=_0x1b9251&&_0x369ae3<=_0xb5fed8&&_0xb5fed8<=_0x367cc1;},VisuMZ[_0x19393c(0x532)][_0x19393c(0x4fb)]=Game_Event[_0x19393c(0x495)]['canPass'],Game_Event[_0x19393c(0x495)][_0x19393c(0x598)]=function(_0x298ac3,_0x313244,_0x24feff){const _0x174a5b=_0x19393c;for(let _0x371d8c=-this['_addedHitbox'][_0x174a5b(0x51a)];_0x371d8c<=this[_0x174a5b(0x20b)][_0x174a5b(0x466)];_0x371d8c++){for(let _0x36f432=-this[_0x174a5b(0x20b)]['up'];_0x36f432<=this[_0x174a5b(0x20b)]['down'];_0x36f432++){if(!Game_Character['prototype'][_0x174a5b(0x598)][_0x174a5b(0x496)](this,_0x298ac3+_0x371d8c,_0x313244+_0x36f432,_0x24feff))return![];}}return!![];},Game_Event[_0x19393c(0x495)][_0x19393c(0x333)]=function(_0x3451ed,_0x1e6361){const _0x1427e6=_0x19393c;if(Imported[_0x1427e6(0x31c)]&&this[_0x1427e6(0x1bc)]())return this[_0x1427e6(0x4c8)](_0x3451ed,_0x1e6361);else{const _0x421f20=$gameMap['eventsXyNt'](_0x3451ed,_0x1e6361)[_0x1427e6(0x166)](_0x13f5d6=>_0x13f5d6!==this);return _0x421f20[_0x1427e6(0x5b3)]>0x0;}},Game_Event['prototype'][_0x19393c(0x4c8)]=function(_0x4e04d6,_0x19725b){const _0x558f99=_0x19393c;if(!this[_0x558f99(0x413)]())return![];else{const _0x3716e2=$gameMap['eventsXyNt'](_0x4e04d6,_0x19725b)[_0x558f99(0x166)](_0x3c614c=>_0x3c614c!==this&&_0x3c614c[_0x558f99(0x413)]());return _0x3716e2[_0x558f99(0x5b3)]>0x0;}},Game_Event[_0x19393c(0x495)][_0x19393c(0x57d)]=function(){const _0x579edb=_0x19393c;if(!this['_activationProximity'])return _0x579edb(0x40e);return this[_0x579edb(0x34a)][_0x579edb(0x61b)]||_0x579edb(0x40e);},Game_Event[_0x19393c(0x495)][_0x19393c(0x491)]=function(){const _0x3353be=_0x19393c;if(!this[_0x3353be(0x34a)])return 0x0;return this[_0x3353be(0x34a)]['distance']||0x0;},Game_Event[_0x19393c(0x495)]['activationRegionList']=function(){const _0x44365b=_0x19393c;if(!this[_0x44365b(0x34a)])return[];return this['_activationProximity'][_0x44365b(0x277)]||[];},Game_Event['prototype'][_0x19393c(0x208)]=function(){const _0x3a43fd=_0x19393c;Game_Character[_0x3a43fd(0x495)]['increaseSteps']['call'](this);if(['none',_0x3a43fd(0x4ff)][_0x3a43fd(0x239)](this[_0x3a43fd(0x57d)]()))return;$gamePlayer['checkEventTriggerEventsMoveCore']([0x2]);},Game_Event[_0x19393c(0x495)][_0x19393c(0x489)]=function(){const _0xc1aa08=_0x19393c,_0x4888c0=Math['round']($gameMap['_displayX']),_0x52091a=_0x4888c0+Math['ceil']($gameMap['screenTileX']())-0x1,_0x26d89e=Math[_0xc1aa08(0x25f)]($gameMap[_0xc1aa08(0x5db)]),_0x32b901=_0x26d89e+Math['ceil']($gameMap[_0xc1aa08(0x490)]())-0x1;return this['x']>=_0x4888c0&&this['x']<=_0x52091a&&this['y']>=_0x26d89e&&this['y']<=_0x32b901;},VisuMZ['EventsMoveCore'][_0x19393c(0x617)]=Game_Event[_0x19393c(0x495)][_0x19393c(0x4df)],Game_Event[_0x19393c(0x495)]['checkEventTriggerAuto']=function(){const _0x127adf=_0x19393c;if(this[_0x127adf(0x425)]||this[_0x127adf(0x525)]){if(this[_0x127adf(0x489)]()){if(!this['_screenActivated']){this[_0x127adf(0x418)]=!![];if(this['_screenActivation'])this[_0x127adf(0x53f)]();else this[_0x127adf(0x525)]&&(!this[_0x127adf(0x31b)]&&(this[_0x127adf(0x31b)]=new Game_Interpreter()),this[_0x127adf(0x31b)][_0x127adf(0x2f0)](this['list'](),this[_0x127adf(0x3ba)]));}return;}else{this[_0x127adf(0x418)]=![];return;}}if(this[_0x127adf(0x53a)]!==0x3)return;if(this[_0x127adf(0x475)])return;if(!this[_0x127adf(0x2e1)](![]))return;if(!this[_0x127adf(0x214)](![]))return;VisuMZ[_0x127adf(0x532)][_0x127adf(0x617)][_0x127adf(0x496)](this);},VisuMZ[_0x19393c(0x532)][_0x19393c(0x45e)]=Game_Event[_0x19393c(0x495)][_0x19393c(0x546)],Game_Event['prototype'][_0x19393c(0x546)]=function(){const _0x2c2c1b=_0x19393c;if(!this['_interpreter'])return;if(!this[_0x2c2c1b(0x2e1)](!![]))return;if(!this[_0x2c2c1b(0x214)](!![]))return;if(this[_0x2c2c1b(0x31b)]&&!this['_interpreter']['isRunning']()&&this[_0x2c2c1b(0x525)]){!this[_0x2c2c1b(0x1cc)]&&(this[_0x2c2c1b(0x418)]=![]);return;}VisuMZ[_0x2c2c1b(0x532)][_0x2c2c1b(0x45e)]['call'](this);},Game_Event[_0x19393c(0x495)][_0x19393c(0x2e1)]=function(_0x5b304a){const _0x755e5a=_0x19393c;if(!_0x5b304a&&$gameMap['isEventRunning']())return![];if(!_0x5b304a&&$gameMap[_0x755e5a(0x613)]())return![];if(this['activationRegionList']()<=0x0)return!![];return $gamePlayer[_0x755e5a(0x4f4)](this);},Game_Event[_0x19393c(0x495)]['checkActivationProximity']=function(_0x550df7){const _0x1d4d32=_0x19393c;if(!_0x550df7&&$gameMap[_0x1d4d32(0x586)]())return![];if(!_0x550df7&&$gameMap['isAnyEventStarting']())return![];if(['none','region']['includes'](this[_0x1d4d32(0x57d)]()))return!![];return $gamePlayer[_0x1d4d32(0x49c)](this);},Game_Event[_0x19393c(0x495)]['encounterProximityType']=function(_0x1f1b4e){const _0x24eba8=_0x19393c,_0x5795c0=_0x1f1b4e?this[_0x24eba8(0x3a6)]:this[_0x24eba8(0x338)];return _0x5795c0?_0x5795c0[_0x24eba8(0x61b)]:_0x24eba8(0x40e);},Game_Event[_0x19393c(0x495)][_0x19393c(0x3e9)]=function(_0x43938b){const _0x32d481=_0x19393c,_0x3d6656=_0x43938b?this['_encounterHalfProximity']:this[_0x32d481(0x338)];return _0x3d6656?_0x3d6656['distance']:0x0;},VisuMZ[_0x19393c(0x3fd)]=function(_0xf3055b){const _0x591b20=_0x19393c;for(const _0x157d18 of $gameMap['events']()){if(!_0x157d18)continue;_0x157d18[_0x591b20(0x3fa)]()===_0xf3055b&&_0x157d18[_0x591b20(0x1b2)]();}},VisuMZ[_0x19393c(0x240)]=function(_0x5abf5a){if(_0x5abf5a===0x0)return $gamePlayer;return $gameMap['event'](_0x5abf5a);},Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x3cb)]=function(){},Game_Event['prototype']['updateMoveSynchDirection']=function(){const _0x44a17f=_0x19393c;VisuMZ[_0x44a17f(0x472)](this[_0x44a17f(0x3ba)]);},VisuMZ[_0x19393c(0x472)]=function(_0x36c1b3){const _0x29a217=_0x19393c;for(const _0x484858 of $gameMap['events']()){if(!_0x484858)continue;_0x484858['moveSynchTarget']()===_0x36c1b3&&_0x484858[_0x29a217(0x3ca)]();}},Game_Event['prototype'][_0x19393c(0x3fa)]=function(){const _0x3ecb21=_0x19393c;return this[_0x3ecb21(0x5b7)][_0x3ecb21(0x465)];},Game_Event[_0x19393c(0x495)][_0x19393c(0x3eb)]=function(){const _0x610664=_0x19393c;return this[_0x610664(0x5b7)][_0x610664(0x61b)];},Game_Event[_0x19393c(0x495)][_0x19393c(0x3a5)]=function(){const _0x2b684d=_0x19393c;if(this[_0x2b684d(0x3fa)]()>=0x0){const _0x134ef0=VisuMZ[_0x2b684d(0x240)](this[_0x2b684d(0x3fa)]());if(_0x134ef0)return _0x134ef0[_0x2b684d(0x3a5)]();}return Game_Character[_0x2b684d(0x495)][_0x2b684d(0x3a5)][_0x2b684d(0x496)](this);},Game_Event['prototype']['updateMoveSynch']=function(){const _0x461f30=_0x19393c;this[_0x461f30(0x5b7)][_0x461f30(0x3ac)]=this[_0x461f30(0x5b7)]['timer']||0x0,this[_0x461f30(0x5b7)][_0x461f30(0x3ac)]--;if(this['_moveSynch']['timer']>0x0)return;this[_0x461f30(0x5b7)][_0x461f30(0x3ac)]=this[_0x461f30(0x5b7)][_0x461f30(0x424)],this[_0x461f30(0x26c)]();},Game_Event['prototype'][_0x19393c(0x359)]=function(_0x422b45){const _0xea6acd=_0x19393c;if(this['moveSynchTarget']()>=0x0){const _0x162004=VisuMZ[_0xea6acd(0x240)](this['moveSynchTarget']());if(_0x162004){const _0x2285ab=$gameMap['distance'](this['_realX'],this[_0xea6acd(0x1f9)],_0x162004[_0xea6acd(0x1e3)],_0x162004[_0xea6acd(0x1f9)])-0x1,_0x414cc9=Math[_0xea6acd(0x194)]($gameMap[_0xea6acd(0x177)](),$gameMap[_0xea6acd(0x1ad)]()),_0x7370ac=this[_0xea6acd(0x5b7)][_0xea6acd(0x25b)]||0x0;_0x422b45-=Math[_0xea6acd(0x31e)](0x0,_0x2285ab)*_0x414cc9*_0x7370ac;}}return _0x422b45;},Game_Event['prototype'][_0x19393c(0x26c)]=function(){const _0x4e90d6=_0x19393c;switch(this[_0x4e90d6(0x3eb)]()){case _0x4e90d6(0x599):this['processMoveSynchRandom']();break;case _0x4e90d6(0x2c2):this[_0x4e90d6(0x1ba)]();break;case _0x4e90d6(0x4de):this[_0x4e90d6(0x547)]();break;case'custom':this['processMoveSynchCustom']();break;case _0x4e90d6(0x42b):case _0x4e90d6(0x58a):this[_0x4e90d6(0x4d8)]();break;case'reverse\x20mimic':case'reverse\x20copy':this[_0x4e90d6(0x5f8)]();break;case _0x4e90d6(0x55b):case'horizontal\x20mirror':case _0x4e90d6(0x385):case _0x4e90d6(0x1a4):this[_0x4e90d6(0x1c0)]();break;case'mirror\x20vertical':case _0x4e90d6(0x4a5):case'mirror\x20vert':case _0x4e90d6(0x216):this['processMoveSynchMirrorVert']();break;default:this[_0x4e90d6(0x567)]();break;}this['update']();},Game_Event[_0x19393c(0x495)]['processMoveSynchRandom']=function(){const _0x101070=_0x19393c,_0x59145d=[0x2,0x4,0x6,0x8];$gameMap[_0x101070(0x314)]()&&_0x59145d[_0x101070(0x19c)](0x1,0x3,0x7,0x9);const _0x499ac9=[];for(const _0x2c2cdb of _0x59145d){if(this[_0x101070(0x598)](this['x'],this['y'],_0x2c2cdb))_0x499ac9[_0x101070(0x19c)](_0x2c2cdb);}if(_0x499ac9[_0x101070(0x5b3)]>0x0){const _0x1dcdcc=_0x499ac9[Math[_0x101070(0x46c)](_0x499ac9['length'])];this[_0x101070(0x523)](_0x1dcdcc);}},Game_Event[_0x19393c(0x495)][_0x19393c(0x1ba)]=function(){const _0x539459=_0x19393c,_0x3a3211=VisuMZ[_0x539459(0x240)](this[_0x539459(0x3fa)]());this['moveTowardCharacter'](_0x3a3211);},Game_Event[_0x19393c(0x495)]['processMoveSynchAway']=function(){const _0x4e36b6=_0x19393c,_0x27248d=VisuMZ['GetMoveSynchTarget'](this[_0x4e36b6(0x3fa)]());this[_0x4e36b6(0x2fc)](_0x27248d);},Game_Event[_0x19393c(0x495)][_0x19393c(0x28d)]=function(){this['updateRoutineMove']();},Game_Event['prototype'][_0x19393c(0x4d8)]=function(){const _0x5a42f9=_0x19393c,_0x1e5169=VisuMZ['GetMoveSynchTarget'](this[_0x5a42f9(0x3fa)]());this[_0x5a42f9(0x523)](_0x1e5169[_0x5a42f9(0x5a2)]());},Game_Event[_0x19393c(0x495)][_0x19393c(0x5f8)]=function(){const _0x352ee7=_0x19393c,_0x3baa3a=VisuMZ[_0x352ee7(0x240)](this['moveSynchTarget']());this['executeMoveDir8'](this[_0x352ee7(0x232)](_0x3baa3a[_0x352ee7(0x5a2)]()));},Game_Event['prototype'][_0x19393c(0x1c0)]=function(){const _0x31b019=_0x19393c,_0x1e3865=VisuMZ[_0x31b019(0x240)](this[_0x31b019(0x3fa)]()),_0x4e6675=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x1e3865[_0x31b019(0x5a2)]()];this['executeMoveDir8'](_0x4e6675);},Game_Event[_0x19393c(0x495)]['processMoveSynchMirrorVert']=function(){const _0x2794f7=_0x19393c,_0x75a98f=VisuMZ[_0x2794f7(0x240)](this[_0x2794f7(0x3fa)]()),_0x3dbb9c=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x75a98f['lastMovedDirection']()];this[_0x2794f7(0x523)](_0x3dbb9c);},Game_Event[_0x19393c(0x495)][_0x19393c(0x3ca)]=function(){const _0x578f9d=_0x19393c,_0x378be6=VisuMZ['GetMoveSynchTarget'](this[_0x578f9d(0x3fa)]()),_0x2c606e=_0x378be6[_0x578f9d(0x4c5)]();switch(this[_0x578f9d(0x3eb)]()){case _0x578f9d(0x42b):case _0x578f9d(0x58a):this[_0x578f9d(0x600)](_0x2c606e);break;case _0x578f9d(0x27a):case _0x578f9d(0x274):this['setDirection'](this[_0x578f9d(0x232)](_0x2c606e));break;case _0x578f9d(0x55b):case _0x578f9d(0x38d):case'mirror\x20horz':case _0x578f9d(0x1a4):this[_0x578f9d(0x600)]([0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x2c606e]);break;case _0x578f9d(0x4ba):case _0x578f9d(0x4a5):case'mirror\x20vert':case _0x578f9d(0x216):this[_0x578f9d(0x600)]([0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x2c606e]);break;default:return;}this[_0x578f9d(0x4eb)]();},Game_Event[_0x19393c(0x495)]['restoreSavedEventPosition']=function(){const _0x43c981=_0x19393c,_0x34578f=$gameSystem['getSavedEventLocation'](this);if(!_0x34578f)return;this[_0x43c981(0x27b)](_0x34578f['x'],_0x34578f['y']),this['refreshBushDepth'](),this['setDirection'](_0x34578f[_0x43c981(0x4c5)]),this[_0x43c981(0x432)]===_0x34578f[_0x43c981(0x321)]&&(this[_0x43c981(0x408)]=_0x34578f[_0x43c981(0x3e6)]);},VisuMZ[_0x19393c(0x532)][_0x19393c(0x366)]=Game_Event[_0x19393c(0x495)][_0x19393c(0x4eb)],Game_Event[_0x19393c(0x495)][_0x19393c(0x4eb)]=function(){const _0x2fa0aa=_0x19393c;VisuMZ[_0x2fa0aa(0x532)][_0x2fa0aa(0x366)][_0x2fa0aa(0x496)](this),!Utils['isMobileDevice']()&&this['updateSaveEventLocation']();},Game_Event[_0x19393c(0x495)]['updateMove']=function(){const _0x46b7da=_0x19393c;Game_Character[_0x46b7da(0x495)][_0x46b7da(0x349)][_0x46b7da(0x496)](this),this[_0x46b7da(0x5c6)]();},Game_Event['prototype'][_0x19393c(0x4a8)]=function(){const _0x19f242=_0x19393c;if($gameMap[_0x19f242(0x2a4)]())return!![];return this['_saveEventLocation'];},Game_Event[_0x19393c(0x495)]['autosaveEventLocation']=function(){const _0x46eca5=_0x19393c;if(!this[_0x46eca5(0x4a8)]())return;this[_0x46eca5(0x5a9)]();},Game_Event[_0x19393c(0x495)][_0x19393c(0x5a9)]=function(){this['_requestSaveEventLocation']=!![];},Game_Event['prototype'][_0x19393c(0x3dc)]=function(){const _0x41cd6c=_0x19393c;this[_0x41cd6c(0x512)]&&this['processSaveEventLocation']();},Game_Event[_0x19393c(0x495)][_0x19393c(0x23f)]=function(){this['_requestSaveEventLocation']=![],$gameSystem['saveEventLocation'](this);},Game_Event[_0x19393c(0x495)][_0x19393c(0x5f4)]=function(){const _0x9bc779=_0x19393c;$gameSystem[_0x9bc779(0x458)](this);},Game_Event['prototype'][_0x19393c(0x439)]=function(){const _0x4072d4=_0x19393c;return $gameSystem['getEventIconData'](this)?Game_Character['prototype'][_0x4072d4(0x439)][_0x4072d4(0x496)](this):{'iconIndex':0x0,'bufferX':settings[_0x4072d4(0x622)][_0x4072d4(0x1ae)],'bufferY':settings[_0x4072d4(0x622)][_0x4072d4(0x4dc)],'blendMode':settings[_0x4072d4(0x622)][_0x4072d4(0x3c7)]};},Game_Event[_0x19393c(0x495)][_0x19393c(0x2e2)]=function(){const _0x484332=_0x19393c;return this[_0x484332(0x257)];},VisuMZ[_0x19393c(0x532)][_0x19393c(0x21b)]=Game_Event['prototype']['meetsConditions'],Game_Event[_0x19393c(0x495)][_0x19393c(0x24b)]=function(_0x1f1966){const _0x355e6b=_0x19393c,_0x530a04=VisuMZ['EventsMoveCore'][_0x355e6b(0x21b)][_0x355e6b(0x496)](this,_0x1f1966);if(!_0x530a04)return![];return this['meetsCPC'](_0x1f1966);},Game_Event[_0x19393c(0x495)][_0x19393c(0x549)]=function(_0xae1bc1){const _0x23185a=_0x19393c;VisuMZ[_0x23185a(0x532)][_0x23185a(0x1a5)][_0x23185a(0x43c)](_0xae1bc1),this[_0x23185a(0x257)]=_0xae1bc1[_0x23185a(0x506)][_0x23185a(0x5b3)]>0x0;_0xae1bc1[_0x23185a(0x506)]===undefined&&VisuMZ[_0x23185a(0x532)][_0x23185a(0x1a5)]['loadCPC'](_0xae1bc1);if(_0xae1bc1[_0x23185a(0x506)]['length']>0x0)return $gameMap[_0x23185a(0x5ab)](this['_eventId'])&&VisuMZ[_0x23185a(0x532)]['CustomPageConditions']['metCPC'](_0xae1bc1[_0x23185a(0x506)],this['_eventId']);return!![];},VisuMZ[_0x19393c(0x532)][_0x19393c(0x21e)]=Game_Troop[_0x19393c(0x495)]['meetsConditions'],Game_Troop['prototype']['meetsConditions']=function(_0x16985b){const _0x547de8=_0x19393c;var _0x56dede=VisuMZ[_0x547de8(0x532)][_0x547de8(0x21e)][_0x547de8(0x496)](this,_0x16985b);return _0x56dede&&this[_0x547de8(0x22a)](_0x16985b);},Game_Troop['prototype'][_0x19393c(0x22a)]=function(_0x36fbeb){const _0x1de42d=_0x19393c;_0x36fbeb[_0x1de42d(0x506)]===undefined&&VisuMZ['EventsMoveCore'][_0x1de42d(0x1a5)][_0x1de42d(0x43c)](_0x36fbeb);if(_0x36fbeb[_0x1de42d(0x506)]['length']>0x0)return VisuMZ['EventsMoveCore']['CustomPageConditions'][_0x1de42d(0x276)](_0x36fbeb[_0x1de42d(0x506)],0x0);return!![];},VisuMZ['EventsMoveCore'][_0x19393c(0x1fd)]=Game_Event['prototype'][_0x19393c(0x34d)],Game_Event[_0x19393c(0x495)][_0x19393c(0x34d)]=function(_0x22df53,_0x5ea06b){const _0x344c03=_0x19393c;if(this[_0x344c03(0x634)]){const _0x533304=this[_0x344c03(0x5ab)]()[_0x344c03(0x58c)]||'';if(_0x533304[_0x344c03(0x1cb)](/<(?:LOCATION|START|START LOCATION):[ ](.*?)>/i)){const _0xd36878=String(RegExp['$1'])[_0x344c03(0x20e)](',')[_0x344c03(0x3a7)](_0x59dc5d=>Number(_0x59dc5d));_0x22df53+=Number(_0xd36878[0x0]||0x0)||0x0,_0x5ea06b+=Number(_0xd36878[0x1]||0x0)||0x0;}_0x533304[_0x344c03(0x1cb)](/<(?:LOCATION|START|START LOCATION) X:[ ](.*?)>/i)&&(_0x22df53+=Number(RegExp['$1'])),_0x533304['match'](/<(?:LOCATION|START|START LOCATION) Y:[ ](.*?)>/i)&&(_0x5ea06b+=Number(RegExp['$1']));}VisuMZ[_0x344c03(0x532)]['Game_Event_locate']['call'](this,_0x22df53,_0x5ea06b),this[_0x344c03(0x4b4)]=_0x22df53,this[_0x344c03(0x412)]=_0x5ea06b,this[_0x344c03(0x5c6)]();},VisuMZ[_0x19393c(0x532)][_0x19393c(0x377)]=Game_Event[_0x19393c(0x495)]['moveTypeRandom'],Game_Event['prototype'][_0x19393c(0x57b)]=function(){const _0x32628d=_0x19393c,_0x536b79=$gameMap[_0x32628d(0x3b3)](this['x'],this['y'],this['_randomHomeX'],this[_0x32628d(0x412)]),_0x20fc3f=_0x536b79*(this[_0x32628d(0x389)]||0x0);Math['random']()>=_0x20fc3f?VisuMZ[_0x32628d(0x532)][_0x32628d(0x377)]['call'](this):this[_0x32628d(0x614)]();},Game_Event[_0x19393c(0x495)][_0x19393c(0x614)]=function(){const _0x133a94=_0x19393c,_0x16abfc=this[_0x133a94(0x3d1)](this[_0x133a94(0x4b4)]),_0x1bdd0f=this['deltaYFrom'](this['_randomHomeY']);if(Math['abs'](_0x16abfc)>Math['abs'](_0x1bdd0f))this[_0x133a94(0x2e7)](_0x16abfc>0x0?0x4:0x6),!this[_0x133a94(0x1b0)]()&&_0x1bdd0f!==0x0&&this[_0x133a94(0x2e7)](_0x1bdd0f>0x0?0x8:0x2);else _0x1bdd0f!==0x0&&(this[_0x133a94(0x2e7)](_0x1bdd0f>0x0?0x8:0x2),!this[_0x133a94(0x1b0)]()&&_0x16abfc!==0x0&&this[_0x133a94(0x2e7)](_0x16abfc>0x0?0x4:0x6));},Game_CharacterBase['prototype'][_0x19393c(0x5c0)]=function(){const _0x54a3c9=_0x19393c;this['_attachPicture']={'filename':'','type':_0x54a3c9(0x21a),'blendMode':0x0,'maxSize':0x0,'offsetX':0x0,'offsetY':0x0,'scale':0x1};},Game_CharacterBase['prototype']['attachPictureSettings']=function(){const _0x5e178a=_0x19393c;if(this[_0x5e178a(0x255)]===undefined)this[_0x5e178a(0x5c0)]();return this[_0x5e178a(0x255)];},Game_CharacterBase['prototype'][_0x19393c(0x410)]=function(){const _0x20dd69=_0x19393c;return this['attachPictureSettings']()[_0x20dd69(0x1f7)]??'';},Game_CharacterBase['prototype'][_0x19393c(0x4cf)]=function(){const _0x182e58=_0x19393c;return this[_0x182e58(0x2fb)]()[_0x182e58(0x21a)]??_0x182e58(0x21a);},Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x39f)]=function(){const _0x239bc1=_0x19393c;return this[_0x239bc1(0x2fb)]()[_0x239bc1(0x5fa)]??0x0;},Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x211)]=function(){const _0x3e95d7=_0x19393c;return this[_0x3e95d7(0x2fb)]()['maxSize']??0x0;},Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x450)]=function(){const _0x2dace9=_0x19393c;return this['attachPictureSettings']()[_0x2dace9(0x33a)]??0x0;},Game_CharacterBase[_0x19393c(0x495)]['attachPictureOffsetY']=function(){return this['attachPictureSettings']()['offsetY']??0x0;},Game_CharacterBase[_0x19393c(0x495)][_0x19393c(0x1fa)]=function(){const _0x3f5c03=_0x19393c;return this[_0x3f5c03(0x2fb)]()[_0x3f5c03(0x590)]??0x1;},VisuMZ[_0x19393c(0x532)][_0x19393c(0x561)]=Game_Interpreter['prototype'][_0x19393c(0x548)],Game_Interpreter[_0x19393c(0x495)][_0x19393c(0x548)]=function(){const _0x4fdef2=_0x19393c;if(this['_waitMode']==='CallEvent'){if(window[this['_callEventMap']])this[_0x4fdef2(0x21d)]='',this['startCallEvent']();else return!![];}else return VisuMZ[_0x4fdef2(0x532)][_0x4fdef2(0x561)][_0x4fdef2(0x496)](this);},VisuMZ['EventsMoveCore']['Game_Interpreter_executeCommand']=Game_Interpreter[_0x19393c(0x495)][_0x19393c(0x217)],Game_Interpreter[_0x19393c(0x495)][_0x19393c(0x217)]=function(){const _0x5d66da=_0x19393c,_0x2346d3=$gameMap&&this[_0x5d66da(0x3ba)]?$gameMap[_0x5d66da(0x5ab)](this[_0x5d66da(0x3ba)]):null;$gameTemp[_0x5d66da(0x261)](_0x2346d3);const _0x651c14=VisuMZ[_0x5d66da(0x532)][_0x5d66da(0x4c9)][_0x5d66da(0x496)](this);return $gameTemp['clearSelfTarget'](),_0x651c14;},VisuMZ[_0x19393c(0x532)][_0x19393c(0x575)]=Game_Interpreter[_0x19393c(0x495)][_0x19393c(0x259)],Game_Interpreter[_0x19393c(0x495)][_0x19393c(0x259)]=function(_0x1fde70){const _0x124234=_0x19393c;return $gameTemp[_0x124234(0x44c)](this),VisuMZ['EventsMoveCore']['Game_Interpreter_PluginCommand'][_0x124234(0x496)](this,_0x1fde70);},Game_Interpreter[_0x19393c(0x495)][_0x19393c(0x470)]=function(_0x479ca3){const _0x564982=_0x19393c;this[_0x564982(0x5cc)]=_0x479ca3;const _0x30f044=_0x564982(0x2a3)[_0x564982(0x2ea)](_0x479ca3[_0x564982(0x473)]['padZero'](0x3));this[_0x564982(0x2b7)]=_0x564982(0x178)+Graphics['frameCount']+'_'+this[_0x564982(0x2ed)](),DataManager[_0x564982(0x269)](this['_callEventMap'],_0x30f044),window[this[_0x564982(0x2b7)]]?this[_0x564982(0x36e)]():this[_0x564982(0x2ba)](_0x564982(0x56a));},Game_Interpreter[_0x19393c(0x495)][_0x19393c(0x36e)]=function(){const _0x50e7d9=_0x19393c,_0x5047af=this[_0x50e7d9(0x5cc)],_0x3666e2=window[this[_0x50e7d9(0x2b7)]],_0x2fccbb=_0x3666e2[_0x50e7d9(0x3c6)][_0x5047af[_0x50e7d9(0x2ed)]];if(_0x2fccbb&&_0x2fccbb[_0x50e7d9(0x45c)][_0x5047af['pageId']-0x1]){const _0x15ced6=_0x2fccbb[_0x50e7d9(0x45c)][_0x5047af[_0x50e7d9(0x393)]-0x1][_0x50e7d9(0x344)];this[_0x50e7d9(0x609)](_0x15ced6,this[_0x50e7d9(0x2ed)]());}window[this[_0x50e7d9(0x2b7)]]=undefined,this[_0x50e7d9(0x2b7)]=undefined,this[_0x50e7d9(0x5cc)]=undefined;};function Game_CPCInterpreter(){const _0x3b6967=_0x19393c;this['initialize'][_0x3b6967(0x1dd)](this,arguments);};Game_CPCInterpreter[_0x19393c(0x495)]=Object[_0x19393c(0x3ec)](Game_Interpreter[_0x19393c(0x495)]),Game_CPCInterpreter['prototype'][_0x19393c(0x5e9)]=Game_CPCInterpreter,Game_CPCInterpreter[_0x19393c(0x495)][_0x19393c(0x56d)]=function(){const _0x28a4ff=_0x19393c;Game_Interpreter['prototype'][_0x28a4ff(0x56d)][_0x28a4ff(0x496)](this),this['_cpc']=![];},Game_CPCInterpreter[_0x19393c(0x495)]['execute']=function(){const _0x1289e9=_0x19393c;while(this[_0x1289e9(0x4ca)]()){this['executeCommand']();}},Game_CPCInterpreter['prototype']['executeCommonEvent']=function(_0x48f40d){while(this['isRunning']()){this['executeCommandCommonEvent'](_0x48f40d);}},Game_CPCInterpreter[_0x19393c(0x495)][_0x19393c(0x60b)]=function(_0xddaa4f){const _0x3b9a5b=_0x19393c,_0x3b417a=_0xddaa4f;$gameTemp[_0x3b9a5b(0x261)](_0x3b417a);const _0x380fd8=VisuMZ['EventsMoveCore'][_0x3b9a5b(0x4c9)][_0x3b9a5b(0x496)](this);return $gameTemp[_0x3b9a5b(0x1a6)](),_0x380fd8;},Game_CPCInterpreter[_0x19393c(0x495)]['command108']=function(_0x59cb21){const _0x20f3a5=_0x19393c;return Game_Interpreter[_0x20f3a5(0x495)][_0x20f3a5(0x63b)][_0x20f3a5(0x496)](this,_0x59cb21),this[_0x20f3a5(0x391)]['some'](_0x2886ae=>_0x2886ae[_0x20f3a5(0x1cb)](/<(?:CONDITION|CONDITIONS) MET>/i))&&(this[_0x20f3a5(0x1c7)]=!![]),!![];},VisuMZ['EventsMoveCore']['Scene_Map_startEncounterEffect']=Scene_Map[_0x19393c(0x495)][_0x19393c(0x3c8)],Scene_Map['prototype'][_0x19393c(0x3c8)]=function(){const _0x2bacc3=_0x19393c;VisuMZ[_0x2bacc3(0x532)][_0x2bacc3(0x22e)]['call'](this),this['_spriteset'][_0x2bacc3(0x34e)]();},VisuMZ[_0x19393c(0x532)][_0x19393c(0x1d1)]=Scene_Load[_0x19393c(0x495)][_0x19393c(0x456)],Scene_Load[_0x19393c(0x495)][_0x19393c(0x456)]=function(){const _0x3653ec=_0x19393c;if($gameMap)$gameMap[_0x3653ec(0x28e)]();VisuMZ['EventsMoveCore'][_0x3653ec(0x1d1)][_0x3653ec(0x496)](this);},VisuMZ[_0x19393c(0x532)][_0x19393c(0x455)]=Game_System[_0x19393c(0x495)][_0x19393c(0x4c3)],Game_System[_0x19393c(0x495)]['onAfterLoad']=function(){const _0x52a3dd=_0x19393c;VisuMZ['EventsMoveCore'][_0x52a3dd(0x455)][_0x52a3dd(0x496)](this);if($gameMap)$gameMap[_0x52a3dd(0x28e)]();},VisuMZ[_0x19393c(0x532)][_0x19393c(0x53d)]=Sprite_Character[_0x19393c(0x495)][_0x19393c(0x1b8)],Sprite_Character[_0x19393c(0x495)][_0x19393c(0x1b8)]=function(){const _0x173ca0=_0x19393c;VisuMZ[_0x173ca0(0x532)][_0x173ca0(0x53d)]['call'](this),this['initMembersEventsMoveCore'](),this[_0x173ca0(0x570)](),this[_0x173ca0(0x291)]();},Sprite_Character[_0x19393c(0x495)]['initMembersEventsMoveCore']=function(){const _0x3b873b=_0x19393c;this[_0x3b873b(0x35e)]=0xff,this[_0x3b873b(0x1b4)]=![];},Sprite_Character[_0x19393c(0x495)][_0x19393c(0x56b)]=function(){const _0x15d492=_0x19393c;return this['_characterName']&&this[_0x15d492(0x510)][_0x15d492(0x1cb)](/\[VS8\]/i);},Sprite_Character['prototype'][_0x19393c(0x48c)]=function(){const _0x4e045b=_0x19393c;return this[_0x4e045b(0x56b)]()&&VisuMZ[_0x4e045b(0x532)][_0x4e045b(0x329)][_0x4e045b(0x4cb)][_0x4e045b(0x1d0)];},Sprite_Character['prototype'][_0x19393c(0x570)]=function(){const _0x58f3e7=_0x19393c;this['_attachPictureSprite']=new Sprite(),this['_attachPictureSprite']['anchor']['x']=0.5,this[_0x58f3e7(0x638)]['anchor']['y']=0x1,this[_0x58f3e7(0x5ac)](this[_0x58f3e7(0x638)]),this['updateAttachPictureSprite']();},Sprite_Character['prototype'][_0x19393c(0x291)]=function(){const _0x44a84e=_0x19393c;this['_eventIconSprite']=new Sprite(),this[_0x44a84e(0x550)]['bitmap']=ImageManager[_0x44a84e(0x3fe)](_0x44a84e(0x1c5)),this[_0x44a84e(0x550)]['bitmap'][_0x44a84e(0x54d)]=![],this[_0x44a84e(0x550)][_0x44a84e(0x32a)](0x0,0x0,0x0,0x0),this['_eventIconSprite'][_0x44a84e(0x469)]['x']=0.5,this[_0x44a84e(0x550)]['anchor']['y']=0x1,this[_0x44a84e(0x5ac)](this[_0x44a84e(0x550)]);},VisuMZ[_0x19393c(0x532)][_0x19393c(0x260)]=Sprite_Character[_0x19393c(0x495)]['update'],Sprite_Character[_0x19393c(0x495)]['update']=function(){const _0x45ee18=_0x19393c;VisuMZ['EventsMoveCore'][_0x45ee18(0x260)][_0x45ee18(0x496)](this),this['updateEventsAndMovementCore']();},Sprite_Character[_0x19393c(0x495)]['updateVisibility']=function(){const _0x33f607=_0x19393c;Sprite['prototype']['updateVisibility'][_0x33f607(0x496)](this),this[_0x33f607(0x1d5)]()&&(this[_0x33f607(0x577)]=![]);},Sprite_Character[_0x19393c(0x495)][_0x19393c(0x1d5)]=function(){const _0x31c085=_0x19393c;if(this[_0x31c085(0x4d0)]()>0x0)return![];if(this['_character']){if(this[_0x31c085(0x3bd)][_0x31c085(0x410)]()!=='')return![];}return this['isEmptyCharacter']()||this['_character']&&this['_character'][_0x31c085(0x5c7)]();},Sprite_Character[_0x19393c(0x495)][_0x19393c(0x52f)]=function(){const _0x2f085a=_0x19393c;if(!this[_0x2f085a(0x384)])return;this[_0x2f085a(0x384)][_0x2f085a(0x54d)]=!!VisuMZ[_0x2f085a(0x532)][_0x2f085a(0x329)]['Movement'][_0x2f085a(0x5b8)];},Sprite_Character['prototype'][_0x19393c(0x30d)]=function(){const _0x514cb4=_0x19393c;this['updateScaleBase'](),this['updateTilt'](),this[_0x514cb4(0x42a)](),this[_0x514cb4(0x2c0)](),this[_0x514cb4(0x3cf)](),this[_0x514cb4(0x267)](),this['updateAttachPictureSprite']();},VisuMZ[_0x19393c(0x532)][_0x19393c(0x382)]=Sprite_Character['prototype'][_0x19393c(0x1da)],Sprite_Character[_0x19393c(0x495)]['setTileBitmap']=function(){const _0x2267ec=_0x19393c;VisuMZ[_0x2267ec(0x532)][_0x2267ec(0x382)]['call'](this),this[_0x2267ec(0x384)][_0x2267ec(0x31a)](this[_0x2267ec(0x52f)][_0x2267ec(0x2b5)](this));},Sprite_Character[_0x19393c(0x495)][_0x19393c(0x2db)]=function(){const _0x95702a=_0x19393c,_0x9a31ef=this[_0x95702a(0x386)],_0x52ac77=this[_0x95702a(0x207)](),_0xc0aea4=this[_0x95702a(0x498)](),_0x402e30=(Math[_0x95702a(0x1d9)](_0x9a31ef/0x80)%0x2*0x8+_0x9a31ef%0x8)*_0x52ac77,_0x368e0c=Math[_0x95702a(0x1d9)](_0x9a31ef%0x100/0x8)%0x10*_0xc0aea4,_0x9637b=this[_0x95702a(0x20a)]();let _0x28a377=_0x402e30,_0x1d5b56=_0x368e0c,_0x3ecdd9=_0x52ac77,_0x304e63=_0xc0aea4;_0x9637b['up']&&_0x9637b['up']>0x0&&(_0x1d5b56-=_0xc0aea4*_0x9637b['up'],_0x304e63+=_0xc0aea4*_0x9637b['up']),_0x9637b[_0x95702a(0x4fa)]&&_0x9637b[_0x95702a(0x4fa)]>0x0&&(_0x304e63+=_0xc0aea4*_0x9637b[_0x95702a(0x4fa)]),_0x9637b['left']&&_0x9637b[_0x95702a(0x51a)]>0x0&&(_0x28a377-=_0x52ac77*_0x9637b['left'],_0x3ecdd9+=_0x52ac77*_0x9637b[_0x95702a(0x51a)]),_0x9637b[_0x95702a(0x466)]&&_0x9637b[_0x95702a(0x466)]>0x0&&(_0x3ecdd9+=_0x52ac77*_0x9637b['right']),this['setFrame'](_0x28a377,_0x1d5b56,_0x3ecdd9,_0x304e63);},Sprite_Character[_0x19393c(0x495)]['getTileExpandData']=function(){const _0x129c44=_0x19393c;return this[_0x129c44(0x3bd)]?this[_0x129c44(0x3bd)][_0x129c44(0x427)]||{}:{};},VisuMZ[_0x19393c(0x532)]['Sprite_Character_setCharacterBitmap']=Sprite_Character[_0x19393c(0x495)][_0x19393c(0x224)],Sprite_Character[_0x19393c(0x495)][_0x19393c(0x224)]=function(){const _0x36b743=_0x19393c;VisuMZ['EventsMoveCore']['Sprite_Character_setCharacterBitmap'][_0x36b743(0x496)](this),this['bitmap']['addLoadListener'](this[_0x36b743(0x52f)]['bind'](this)),this[_0x36b743(0x1b4)]=ImageManager['isInvisibleCharacter'](this['_characterName']),this[_0x36b743(0x1b4)]&&this[_0x36b743(0x384)][_0x36b743(0x31a)](this[_0x36b743(0x626)][_0x36b743(0x2b5)](this));},Sprite_Character[_0x19393c(0x495)][_0x19393c(0x626)]=function(){const _0x21f6a6=_0x19393c;this[_0x21f6a6(0x384)]=new Bitmap(this[_0x21f6a6(0x384)][_0x21f6a6(0x4d1)],this['bitmap'][_0x21f6a6(0x3da)]);},VisuMZ[_0x19393c(0x532)]['Sprite_Character_characterPatternY']=Sprite_Character[_0x19393c(0x495)][_0x19393c(0x501)],Sprite_Character['prototype'][_0x19393c(0x501)]=function(){const _0x592e46=_0x19393c;return this['isSpriteVS8dir']()?this['characterPatternYVS8']():this[_0x592e46(0x5fe)]();},Sprite_Character[_0x19393c(0x495)]['characterPatternYVS8']=function(){const _0x46592a=_0x19393c,_0x292981=this[_0x46592a(0x3bd)][_0x46592a(0x4c5)]();let _0x2cbfe3=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];return this[_0x46592a(0x3bd)][_0x46592a(0x4e2)]&&(_0x2cbfe3=[0x2,0x4,0x2,0x2,0x6,0x2,0x4,0x8,0x8,0x6]),(_0x2cbfe3[_0x292981]-0x2)/0x2;},Sprite_Character[_0x19393c(0x495)][_0x19393c(0x5fe)]=function(){const _0x3c4d19=_0x19393c;let _0x301ae1=this[_0x3c4d19(0x3bd)][_0x3c4d19(0x4c5)]();if(this[_0x3c4d19(0x3bd)][_0x3c4d19(0x4e2)]){if(_0x301ae1===0x4)_0x301ae1=0x6;else _0x301ae1===0x6&&(_0x301ae1=0x4);}return(_0x301ae1-0x2)/0x2;},Sprite_Character[_0x19393c(0x495)]['updateScaleBase']=function(){const _0x11e010=_0x19393c;this[_0x11e010(0x590)]['x']=this[_0x11e010(0x3bd)][_0x11e010(0x179)]??0x1,this[_0x11e010(0x590)]['y']=this[_0x11e010(0x3bd)]['_scaleY']??0x1;},Sprite_Character[_0x19393c(0x495)]['updateTilt']=function(){const _0x881539=_0x19393c;if(!VisuMZ[_0x881539(0x532)][_0x881539(0x329)]['Movement'][_0x881539(0x4c2)])return;this[_0x881539(0x29a)]=0x0;if(this[_0x881539(0x37c)]()){const _0x5e6dcb=VisuMZ['EventsMoveCore']['Settings'][_0x881539(0x589)],_0x31fe44=this['_character'][_0x881539(0x4c5)]();let _0x2e572c=0x0;if([0x1,0x4,0x7][_0x881539(0x239)](_0x31fe44))_0x2e572c=_0x5e6dcb['TiltLeft'];if([0x3,0x6,0x9][_0x881539(0x239)](_0x31fe44))_0x2e572c=_0x5e6dcb[_0x881539(0x52e)];[0x2,0x8][_0x881539(0x239)](_0x31fe44)&&(_0x2e572c=[-_0x5e6dcb[_0x881539(0x637)],0x0,_0x5e6dcb[_0x881539(0x637)]][this['_character'][_0x881539(0x4bb)]()]);if(this['_reflection'])_0x2e572c*=-0x1;this[_0x881539(0x29a)]=_0x2e572c;}},Sprite_Character[_0x19393c(0x495)][_0x19393c(0x37c)]=function(){const _0x31beb8=_0x19393c;if(this[_0x31beb8(0x368)])return![];return this[_0x31beb8(0x3bd)]['isDashingAndMoving']()&&!this[_0x31beb8(0x3bd)]['isOnLadder']()&&!this['_character'][_0x31beb8(0x252)]()&&this[_0x31beb8(0x4d0)]()===0x0;},Sprite_Character[_0x19393c(0x495)][_0x19393c(0x42a)]=function(){const _0x55107c=_0x19393c;if(!this[_0x55107c(0x347)])return;this['_shadowSprite']['x']=this['_character']['shadowX'](),this['_shadowSprite']['y']=this['_character']['shadowY'](),this[_0x55107c(0x347)][_0x55107c(0x183)]=this[_0x55107c(0x183)],this[_0x55107c(0x347)]['visible']=this[_0x55107c(0x3bd)][_0x55107c(0x53c)](),this[_0x55107c(0x347)][_0x55107c(0x539)]=this['_hidden'];if(this[_0x55107c(0x3bd)]['isShadowShrink']())this[_0x55107c(0x347)][_0x55107c(0x590)]['x']=Math['max'](0x0,this['_shadowSprite']['scale']['x']-0.1),this[_0x55107c(0x347)][_0x55107c(0x590)]['y']=Math[_0x55107c(0x31e)](0x0,this[_0x55107c(0x347)][_0x55107c(0x590)]['y']-0.1);else{if(this['_shadowSprite']['scale']['x']!==this[_0x55107c(0x590)]['x']){if(this[_0x55107c(0x347)][_0x55107c(0x590)]['x']>this[_0x55107c(0x590)]['x'])this['_shadowSprite']['scale']['x']=Math[_0x55107c(0x194)](this[_0x55107c(0x347)]['scale']['x']+0.1,this[_0x55107c(0x590)]['x']);if(this[_0x55107c(0x347)][_0x55107c(0x590)]['x']<this['scale']['x'])this[_0x55107c(0x347)][_0x55107c(0x590)]['x']=Math['max'](this[_0x55107c(0x347)][_0x55107c(0x590)]['x']-0.1,this[_0x55107c(0x590)]['x']);}if(this[_0x55107c(0x347)][_0x55107c(0x590)]['y']!==this[_0x55107c(0x590)]['y']){if(this[_0x55107c(0x347)]['scale']['y']>this['scale']['y'])this[_0x55107c(0x347)][_0x55107c(0x590)]['y']=Math[_0x55107c(0x194)](this[_0x55107c(0x347)]['scale']['y']+0.1,this[_0x55107c(0x590)]['y']);if(this[_0x55107c(0x347)][_0x55107c(0x590)]['y']<this['scale']['y'])this[_0x55107c(0x347)]['scale']['y']=Math[_0x55107c(0x31e)](this['_shadowSprite'][_0x55107c(0x590)]['y']-0.1,this['scale']['y']);}}},Sprite_Character[_0x19393c(0x495)]['updateEventIconSprite']=function(){const _0x1a8532=_0x19393c;if(!this[_0x1a8532(0x550)])return;const _0x14b907=this[_0x1a8532(0x550)],_0x54c05c=this[_0x1a8532(0x4d0)]();if(_0x54c05c<=0x0)return _0x14b907[_0x1a8532(0x32a)](0x0,0x0,0x0,0x0);else{const _0x470fd0=ImageManager['iconWidth'],_0x3a529a=ImageManager[_0x1a8532(0x248)],_0x255465=_0x54c05c%0x10*_0x470fd0,_0x540e64=Math[_0x1a8532(0x1d9)](_0x54c05c/0x10)*_0x3a529a;_0x14b907[_0x1a8532(0x32a)](_0x255465,_0x540e64,_0x470fd0,_0x3a529a),this[_0x1a8532(0x577)]=!![];}const _0x4745b4=this[_0x1a8532(0x3bd)][_0x1a8532(0x439)]();this['isAutoBufferIcon']()?this[_0x1a8532(0x1ed)](_0x14b907):(_0x14b907['x']=_0x4745b4?_0x4745b4['bufferX']:0x0,_0x14b907['y']=_0x4745b4?-this[_0x1a8532(0x3da)]+_0x4745b4[_0x1a8532(0x5cd)]:0x0),_0x14b907[_0x1a8532(0x5fa)]=_0x4745b4?_0x4745b4[_0x1a8532(0x5fa)]:0x0,this[_0x1a8532(0x33f)](_0x14b907),this['addChild'](_0x14b907),_0x14b907['rotation']=-this[_0x1a8532(0x29a)];},Sprite_Character[_0x19393c(0x495)][_0x19393c(0x1ed)]=function(_0x1b9741){const _0x1bac16=_0x19393c;_0x1b9741['x']=0x0,_0x1b9741['y']=-this[_0x1bac16(0x3da)]+this[_0x1bac16(0x3da)]*0x2/0x5,this[_0x1bac16(0x3bd)][_0x1bac16(0x4bb)]()!==0x1&&(_0x1b9741['y']+=0x1);},Sprite_Character[_0x19393c(0x495)][_0x19393c(0x4d0)]=function(){const _0xbb3f04=_0x19393c;if(!this['_character'])return 0x0;if(this[_0xbb3f04(0x3bd)]['_erased'])return 0x0;const _0x1221c3=this[_0xbb3f04(0x3bd)][_0xbb3f04(0x439)]();return _0x1221c3?_0x1221c3[_0xbb3f04(0x407)]||0x0:0x0;},Sprite_Character[_0x19393c(0x495)]['updateEventCustomZ']=function(){const _0x5af79a=_0x19393c;if(!this[_0x5af79a(0x3bd)])return;if(this[_0x5af79a(0x3bd)]['_customZ']===undefined)return;if(this['_character']['_customZ']===![])return;this['z']=this[_0x5af79a(0x3bd)][_0x5af79a(0x608)],this[_0x5af79a(0x347)]&&(this['z']<0x0?this[_0x5af79a(0x347)]['z']=this['z']-0x1:this[_0x5af79a(0x347)]['z']=0x0);},Sprite_Character[_0x19393c(0x495)][_0x19393c(0x267)]=function(){const _0x5411af=_0x19393c;if(!this[_0x5411af(0x3bd)])return;let _0x137509=!!this[_0x5411af(0x3bd)][_0x5411af(0x4e2)];this['scale']['x']=Math[_0x5411af(0x376)](this[_0x5411af(0x590)]['x'])*(_0x137509?-0x1:0x1);},Sprite_Character[_0x19393c(0x495)][_0x19393c(0x45b)]=function(){const _0x1b9b40=_0x19393c;if(!this[_0x1b9b40(0x638)])return;if(!this[_0x1b9b40(0x3bd)])return;this[_0x1b9b40(0x202)](),this[_0x1b9b40(0x192)]();},Sprite_Character[_0x19393c(0x495)][_0x19393c(0x202)]=function(){const _0x2bfa3c=_0x19393c;if(!this[_0x2bfa3c(0x3f5)]())return;const _0xd9328d=this[_0x2bfa3c(0x3bd)][_0x2bfa3c(0x2fb)]();this[_0x2bfa3c(0x591)]=_0xd9328d[_0x2bfa3c(0x1f7)],this['_lastAttachPictureType']=_0xd9328d['type'],this['_lastAttachPictureMaxSize']=_0xd9328d[_0x2bfa3c(0x63a)],this[_0x2bfa3c(0x1de)]=_0xd9328d[_0x2bfa3c(0x590)];if(_0xd9328d[_0x2bfa3c(0x1f7)]!==''){if(_0xd9328d[_0x2bfa3c(0x61b)]==='enemy'){const _0x36fdc4=ImageManager[_0x2bfa3c(0x428)](_0xd9328d['filename']);_0x36fdc4[_0x2bfa3c(0x31a)](this[_0x2bfa3c(0x585)]['bind'](this,_0x36fdc4));}else{if(_0xd9328d[_0x2bfa3c(0x61b)]===_0x2bfa3c(0x61a)){const _0x3492a5=ImageManager[_0x2bfa3c(0x2dc)](_0xd9328d[_0x2bfa3c(0x1f7)]);_0x3492a5[_0x2bfa3c(0x31a)](this[_0x2bfa3c(0x585)][_0x2bfa3c(0x2b5)](this,_0x3492a5));}else{const _0xb64e8c=ImageManager[_0x2bfa3c(0x5d3)](_0xd9328d[_0x2bfa3c(0x1f7)]);_0xb64e8c[_0x2bfa3c(0x31a)](this[_0x2bfa3c(0x585)][_0x2bfa3c(0x2b5)](this,_0xb64e8c));}}}else this[_0x2bfa3c(0x638)]['bitmap']=new Bitmap(0x1,0x1);},Sprite_Character[_0x19393c(0x495)][_0x19393c(0x192)]=function(){const _0x4cda74=_0x19393c,_0x4aa52f=this['_attachPictureSprite'];_0x4aa52f['x']=this[_0x4cda74(0x3bd)][_0x4cda74(0x450)](),_0x4aa52f['y']=this[_0x4cda74(0x3bd)]['attachPictureOffsetY'](),_0x4aa52f['blendMode']=this[_0x4cda74(0x3bd)][_0x4cda74(0x39f)]();},Sprite_Character[_0x19393c(0x495)]['needsAttachPictureUpdate']=function(){const _0x91c886=_0x19393c,_0x2eabab=this[_0x91c886(0x3bd)]['attachPictureSettings']();if(_0x2eabab){if(this['_lastAttachPictureFilename']!==_0x2eabab[_0x91c886(0x1f7)])return!![];if(this[_0x91c886(0x5e3)]!==_0x2eabab[_0x91c886(0x61b)])return!![];if(this[_0x91c886(0x513)]!==_0x2eabab['maxSize'])return!![];if(this[_0x91c886(0x1de)]!==_0x2eabab[_0x91c886(0x590)])return!![];}return![];},Sprite_Character[_0x19393c(0x495)]['onLoadAttachPicture']=function(_0x59c4ab){const _0x3264ae=_0x19393c,_0x31b6d6=this[_0x3264ae(0x638)];_0x31b6d6[_0x3264ae(0x384)]=_0x59c4ab;const _0xea6eb5=this[_0x3264ae(0x3bd)][_0x3264ae(0x2fb)](),_0x399228=_0xea6eb5[_0x3264ae(0x63a)],_0x3e1149=_0xea6eb5[_0x3264ae(0x590)];let _0x21e170=0x1;if(_0x399228>0x0){let _0x1c4b2e=this[_0x3264ae(0x41b)]()||0x1,_0xe3c340=this[_0x3264ae(0x17d)]()||0x1;const _0x544ad4=Math['max'](0x1,_0x1c4b2e,_0xe3c340);_0x21e170=_0x399228/_0x544ad4;}_0x21e170*=_0x3e1149,_0x21e170!==0x1&&(this[_0x3264ae(0x638)][_0x3264ae(0x384)][_0x3264ae(0x54d)]=!![]),_0x31b6d6[_0x3264ae(0x590)]['x']=_0x21e170,_0x31b6d6[_0x3264ae(0x590)]['y']=_0x21e170,this[_0x3264ae(0x577)]=!![],this[_0x3264ae(0x192)]();},Sprite_Character[_0x19393c(0x495)][_0x19393c(0x41b)]=function(){const _0x414529=_0x19393c,_0x39b2e9=this[_0x414529(0x638)];if(!_0x39b2e9)return 0x0;return _0x39b2e9[_0x414529(0x384)]['width'];},Sprite_Character['prototype']['getAttachPictureBitmapHeight']=function(){const _0x175bb9=_0x19393c,_0x205636=this['_attachPictureSprite'];if(!_0x205636)return 0x0;return _0x205636['bitmap'][_0x175bb9(0x3da)];},VisuMZ[_0x19393c(0x532)]['Sprite_Balloon_setup']=Sprite_Balloon[_0x19393c(0x495)][_0x19393c(0x2f0)],Sprite_Balloon[_0x19393c(0x495)][_0x19393c(0x2f0)]=function(_0x102447,_0xbd74a0){const _0x40d1b1=_0x19393c;VisuMZ[_0x40d1b1(0x532)][_0x40d1b1(0x478)]['call'](this,_0x102447,_0xbd74a0),VisuMZ[_0x40d1b1(0x532)][_0x40d1b1(0x329)][_0x40d1b1(0x4cb)][_0x40d1b1(0x481)]&&this[_0x40d1b1(0x438)]['_character'][_0x40d1b1(0x4b1)](_0xbd74a0,this['_duration']);},VisuMZ[_0x19393c(0x532)][_0x19393c(0x19b)]=Sprite_Balloon[_0x19393c(0x495)][_0x19393c(0x226)],Sprite_Balloon[_0x19393c(0x495)][_0x19393c(0x226)]=function(){const _0x58773a=_0x19393c;VisuMZ[_0x58773a(0x532)][_0x58773a(0x19b)][_0x58773a(0x496)](this),this[_0x58773a(0x564)]();},Sprite_Balloon[_0x19393c(0x495)][_0x19393c(0x564)]=function(){const _0x1db452=_0x19393c;this['_target'][_0x1db452(0x3bd)][_0x1db452(0x56b)]()&&(this['x']+=VisuMZ[_0x1db452(0x532)][_0x1db452(0x329)]['VS8']['BalloonOffsetX'],this['y']+=VisuMZ[_0x1db452(0x532)][_0x1db452(0x329)][_0x1db452(0x4cb)][_0x1db452(0x2f7)]);},Sprite_Timer[_0x19393c(0x495)]['createBitmap']=function(){const _0x371d4b=_0x19393c;this[_0x371d4b(0x384)]=new Bitmap(Math['round'](Graphics[_0x371d4b(0x4e1)]/0x2),0x30),this['bitmap'][_0x371d4b(0x49f)]=this[_0x371d4b(0x49f)](),this['bitmap'][_0x371d4b(0x2df)]=this[_0x371d4b(0x2df)](),this[_0x371d4b(0x384)]['outlineColor']=ColorManager['outlineColor']();},Sprite_Timer[_0x19393c(0x495)][_0x19393c(0x5a1)]=function(){const _0x372461=_0x19393c,_0x243b2f=Math[_0x372461(0x1d9)](this[_0x372461(0x170)]/0x3c/0x3c),_0x53547a=Math['floor'](this[_0x372461(0x170)]/0x3c)%0x3c,_0x506205=this[_0x372461(0x170)]%0x3c;let _0x16929b=_0x53547a[_0x372461(0x3b8)](0x2)+':'+_0x506205[_0x372461(0x3b8)](0x2);if(_0x243b2f>0x0)_0x16929b=_0x372461(0x320)[_0x372461(0x2ea)](_0x243b2f,_0x16929b);return _0x16929b;};function Sprite_EventLabel(){const _0x127b9c=_0x19393c;this[_0x127b9c(0x46e)](...arguments);}Sprite_EventLabel[_0x19393c(0x495)]=Object[_0x19393c(0x3ec)](Sprite[_0x19393c(0x495)]),Sprite_EventLabel[_0x19393c(0x495)][_0x19393c(0x5e9)]=Sprite_EventLabel,Sprite_EventLabel['prototype'][_0x19393c(0x46e)]=function(_0xac7061){const _0x3664e1=_0x19393c;this[_0x3664e1(0x209)]=_0xac7061,Sprite[_0x3664e1(0x495)]['initialize'][_0x3664e1(0x496)](this),this[_0x3664e1(0x1b8)](),this[_0x3664e1(0x2b4)]();},Sprite_EventLabel[_0x19393c(0x495)][_0x19393c(0x1b8)]=function(){const _0x16b4b3=_0x19393c;this[_0x16b4b3(0x469)]['x']=0.5,this['anchor']['y']=0x1;},Sprite_EventLabel[_0x19393c(0x495)][_0x19393c(0x2b4)]=function(){const _0x16390f=_0x19393c,_0x4188fa=new Rectangle(0x0,0x0,0x1,0x1);this[_0x16390f(0x5fd)]=new Window_Base(_0x4188fa),this[_0x16390f(0x5fd)][_0x16390f(0x592)]=0x0,this[_0x16390f(0x183)]=this[_0x16390f(0x327)]()?0xff:0x0;},Sprite_EventLabel['prototype'][_0x19393c(0x4eb)]=function(){const _0x12ff17=_0x19393c;Sprite['prototype'][_0x12ff17(0x4eb)][_0x12ff17(0x496)](this),this[_0x12ff17(0x292)](),this['updateScale'](),this['updatePosition'](),this['updateOpacity'](),this[_0x12ff17(0x308)]();},Sprite_EventLabel[_0x19393c(0x495)][_0x19393c(0x292)]=function(){const _0x3423d7=_0x19393c;this[_0x3423d7(0x209)][_0x3423d7(0x602)]()!==this[_0x3423d7(0x19a)]&&(this['_text']=this[_0x3423d7(0x209)][_0x3423d7(0x602)](),this[_0x3423d7(0x464)]());},Sprite_EventLabel[_0x19393c(0x495)][_0x19393c(0x464)]=function(){const _0x24a033=_0x19393c;if(!this['_proxyWindow'])return;this[_0x24a033(0x1c4)](),this[_0x24a033(0x26b)]();},Sprite_EventLabel['prototype'][_0x19393c(0x1c4)]=function(){const _0x32acc7=_0x19393c,_0x79a6f0=this[_0x32acc7(0x5fd)][_0x32acc7(0x2ad)](this[_0x32acc7(0x19a)]),_0x20d9d1=this[_0x32acc7(0x5fd)][_0x32acc7(0x1e0)](),_0x245c1d=_0x79a6f0[_0x32acc7(0x4d1)]+_0x20d9d1*0x2,_0x3750be=_0x79a6f0['height'];this[_0x32acc7(0x5fd)][_0x32acc7(0x1ea)](0x0,0x0,_0x245c1d,_0x3750be),this[_0x32acc7(0x5fd)][_0x32acc7(0x33c)](),this['bitmap']=this[_0x32acc7(0x5fd)][_0x32acc7(0x48a)];},Sprite_EventLabel[_0x19393c(0x495)][_0x19393c(0x26b)]=function(){const _0x3a04ea=_0x19393c,_0x4a21fe=this[_0x3a04ea(0x5fd)][_0x3a04ea(0x1e0)]();this['_proxyWindow'][_0x3a04ea(0x351)](this[_0x3a04ea(0x19a)],_0x4a21fe,0x0);},Sprite_EventLabel[_0x19393c(0x495)][_0x19393c(0x2aa)]=function(){const _0x237561=_0x19393c,_0x35ccf9=VisuMZ[_0x237561(0x532)][_0x237561(0x329)]['Label'][_0x237561(0x563)],_0x4c2acc=$gameSystem[_0x237561(0x628)]()||0x1;this['scale']['x']=this[_0x237561(0x590)]['y']=_0x35ccf9/_0x4c2acc;},Sprite_EventLabel['prototype'][_0x19393c(0x226)]=function(){const _0x1835fa=_0x19393c;if(!SceneManager[_0x1835fa(0x4ee)])return;if(!SceneManager[_0x1835fa(0x4ee)][_0x1835fa(0x46a)])return;const _0x9a0cf1=SceneManager['_scene']['_spriteset'][_0x1835fa(0x1f3)](this[_0x1835fa(0x209)]);if(!_0x9a0cf1)return;this['x']=this[_0x1835fa(0x209)][_0x1835fa(0x3b6)](),this['x']+=this[_0x1835fa(0x209)][_0x1835fa(0x4e0)]['offsetX'];if(_0x9a0cf1['_lastAttachPictureFilename']){const _0x5a20ee=_0x9a0cf1[_0x1835fa(0x638)];this['y']=this[_0x1835fa(0x209)][_0x1835fa(0x275)]()-_0x5a20ee[_0x1835fa(0x3da)]*_0x5a20ee[_0x1835fa(0x590)]['y'];}else this['y']=this['_event'][_0x1835fa(0x275)]()-_0x9a0cf1[_0x1835fa(0x3da)]*_0x9a0cf1[_0x1835fa(0x590)]['y'];this['y']+=$gameSystem[_0x1835fa(0x48d)]()*-0.5,this['y']+=this[_0x1835fa(0x209)][_0x1835fa(0x4e0)][_0x1835fa(0x2a8)];},Sprite_EventLabel[_0x19393c(0x495)][_0x19393c(0x5f6)]=function(){const _0x52095b=_0x19393c;if(this['isLabelVisible']())this[_0x52095b(0x183)]+=this[_0x52095b(0x1ff)]();else SceneManager[_0x52095b(0x4ee)][_0x52095b(0x337)]>0x0?this[_0x52095b(0x183)]=0x0:this[_0x52095b(0x183)]-=this[_0x52095b(0x1ff)]();},Sprite_EventLabel[_0x19393c(0x495)]['updateHueShift']=function(){const _0x2d6cef=_0x19393c;if(this[_0x2d6cef(0x327)]()&&this[_0x2d6cef(0x209)]&&this[_0x2d6cef(0x209)][_0x2d6cef(0x4e0)][_0x2d6cef(0x569)]){const _0x559308=this[_0x2d6cef(0x59c)]+(this['_event']['_labelWindow']['hueShift']||0x0);this[_0x2d6cef(0x542)](_0x559308);}},Sprite_EventLabel[_0x19393c(0x495)][_0x19393c(0x327)]=function(){const _0x2a7b01=_0x19393c;if(!$gameSystem[_0x2a7b01(0x50e)]())return![];if(this[_0x2a7b01(0x209)]?.[_0x2a7b01(0x57f)])return![];if(this[_0x2a7b01(0x209)]&&this[_0x2a7b01(0x209)][_0x2a7b01(0x432)]<0x0)return![];if(SceneManager[_0x2a7b01(0x4ee)][_0x2a7b01(0x337)]>0x0)return![];const _0x3b82a5=$gamePlayer['x'],_0x4271de=$gamePlayer['y'],_0x558b35=this[_0x2a7b01(0x209)]['x'],_0x558083=this[_0x2a7b01(0x209)]['y'];if(this[_0x2a7b01(0x1b5)]===_0x3b82a5&&this['_visiblePlayerY']===_0x4271de&&this[_0x2a7b01(0x339)]===_0x558b35&&this[_0x2a7b01(0x39a)]===_0x558083)return this[_0x2a7b01(0x5eb)];this['_visiblePlayerX']=$gamePlayer['x'],this[_0x2a7b01(0x4f7)]=$gamePlayer['y'],this[_0x2a7b01(0x339)]=this[_0x2a7b01(0x209)]['x'],this[_0x2a7b01(0x39a)]=this['_event']['y'];if(!VisuMZ[_0x2a7b01(0x532)]['isInsideLabelRange'](this[_0x2a7b01(0x209)]))return this[_0x2a7b01(0x5eb)]=![],![];return this[_0x2a7b01(0x5eb)]=!![],!![];},Sprite_EventLabel['prototype'][_0x19393c(0x1ff)]=function(){const _0x3f967d=_0x19393c;return VisuMZ[_0x3f967d(0x532)][_0x3f967d(0x329)][_0x3f967d(0x63e)]['OpacitySpeed'];};function Sprite_VisuMz_MessagePopup(){const _0x363711=_0x19393c;this[_0x363711(0x46e)](...arguments);}Sprite_VisuMz_MessagePopup[_0x19393c(0x495)]=Object[_0x19393c(0x3ec)](Sprite['prototype']),Sprite_VisuMz_MessagePopup['prototype'][_0x19393c(0x5e9)]=Sprite_VisuMz_MessagePopup,Sprite_VisuMz_MessagePopup[_0x19393c(0x495)][_0x19393c(0x46e)]=function(_0x4ab3c8){const _0x492c95=_0x19393c;this['_settings']=_0x4ab3c8,Sprite[_0x492c95(0x495)][_0x492c95(0x46e)][_0x492c95(0x496)](this),this[_0x492c95(0x1b8)](),this['createDummyWindow'](),this[_0x492c95(0x493)](),this[_0x492c95(0x4eb)]();},Sprite_VisuMz_MessagePopup[_0x19393c(0x495)][_0x19393c(0x1b8)]=function(){const _0x58305f=_0x19393c;this[_0x58305f(0x3fb)]=this['_settings'][_0x58305f(0x2f3)],this[_0x58305f(0x355)]=this['_settings'][_0x58305f(0x2f3)],this['z']=0x6,this[_0x58305f(0x36f)]=this[_0x58305f(0x53b)]['fadeDuration'][_0x58305f(0x555)],this['_fadeInDuration']>0x0&&this[_0x58305f(0x36f)]>=Math[_0x58305f(0x1d9)](this['_duration']*0.48)&&(this[_0x58305f(0x36f)]=Math[_0x58305f(0x1d9)](this[_0x58305f(0x3fb)]*0.48)),this[_0x58305f(0x183)]=this[_0x58305f(0x36f)]>0x0?0x0:0xff,this[_0x58305f(0x287)]=this[_0x58305f(0x53b)][_0x58305f(0x16a)][_0x58305f(0x40b)],this[_0x58305f(0x287)]>0x0&&this[_0x58305f(0x287)]>=Math[_0x58305f(0x1d9)](this[_0x58305f(0x3fb)]*0.48)&&(this[_0x58305f(0x287)]=Math[_0x58305f(0x1d9)](this[_0x58305f(0x3fb)]*0.48)),this[_0x58305f(0x5fc)]=this['_fadeOutDuration'],this['_startX']=this[_0x58305f(0x53b)][_0x58305f(0x446)]['x'],this[_0x58305f(0x2d1)]=this[_0x58305f(0x53b)][_0x58305f(0x446)]['y'],this[_0x58305f(0x482)]=this[_0x58305f(0x53b)][_0x58305f(0x191)]['x'],this[_0x58305f(0x511)]=this[_0x58305f(0x53b)][_0x58305f(0x191)]['y'],this[_0x58305f(0x1a3)]=this[_0x58305f(0x3df)],this[_0x58305f(0x51d)]=this[_0x58305f(0x2d1)],this[_0x58305f(0x61d)]=this[_0x58305f(0x53b)]['startScale']['x'],this['_startScaleY']=this['_settings'][_0x58305f(0x4cc)]['y'],this['_targetScaleX']=this[_0x58305f(0x53b)]['endScale']['x'],this['_targetScaleY']=this[_0x58305f(0x53b)][_0x58305f(0x4a7)]['y'],this[_0x58305f(0x32b)]=-this[_0x58305f(0x53b)][_0x58305f(0x340)][_0x58305f(0x53f)],this[_0x58305f(0x61e)]=-this[_0x58305f(0x53b)][_0x58305f(0x340)][_0x58305f(0x3b2)],this[_0x58305f(0x556)]=-this[_0x58305f(0x53b)][_0x58305f(0x387)][_0x58305f(0x4e5)],this[_0x58305f(0x199)]=0x0;},Sprite_VisuMz_MessagePopup[_0x19393c(0x495)][_0x19393c(0x3af)]=function(){const _0x4b9407=_0x19393c,_0x3d53e1=this['_settings'],_0x4dae6b=new Rectangle(0x0,0x0,Graphics['width'],Graphics[_0x4b9407(0x3da)]);this[_0x4b9407(0x47f)]=new Window_Base(_0x4dae6b);const _0x52ebe6=this['_dummyWindow'][_0x4b9407(0x2ad)](_0x3d53e1['text']),_0x1ac883=_0x52ebe6[_0x4b9407(0x4d1)],_0x29d367=_0x52ebe6[_0x4b9407(0x3da)],_0x3d2e41=_0x1ac883+$gameSystem['windowPadding']()*0x2,_0x2eb188=_0x29d367+$gameSystem[_0x4b9407(0x48d)]()*0x2;this[_0x4b9407(0x47f)][_0x4b9407(0x1ea)](0x0,0x0,_0x3d2e41,_0x2eb188),this[_0x4b9407(0x47f)][_0x4b9407(0x33c)](),this['_dummyWindow'][_0x4b9407(0x351)](_0x3d53e1[_0x4b9407(0x5f0)],0x0,0x0);},Sprite_VisuMz_MessagePopup[_0x19393c(0x495)][_0x19393c(0x493)]=function(){const _0x46b2cb=_0x19393c;this[_0x46b2cb(0x312)]=new Sprite(),this[_0x46b2cb(0x312)][_0x46b2cb(0x384)]=this[_0x46b2cb(0x47f)]['contents'],this[_0x46b2cb(0x312)][_0x46b2cb(0x469)]['x']=0.5,this[_0x46b2cb(0x312)][_0x46b2cb(0x469)]['y']=0.5,this[_0x46b2cb(0x312)]['x']=this[_0x46b2cb(0x3df)],this[_0x46b2cb(0x312)]['y']=this[_0x46b2cb(0x2d1)],this[_0x46b2cb(0x312)][_0x46b2cb(0x590)]['x']=this[_0x46b2cb(0x61d)],this[_0x46b2cb(0x312)][_0x46b2cb(0x590)]['y']=this[_0x46b2cb(0x165)],this['_textSprite']['angle']=this[_0x46b2cb(0x32b)],this['addChild'](this[_0x46b2cb(0x312)]);},Sprite_VisuMz_MessagePopup[_0x19393c(0x495)][_0x19393c(0x4eb)]=function(){const _0x4698ed=_0x19393c;Sprite[_0x4698ed(0x495)][_0x4698ed(0x4eb)][_0x4698ed(0x496)](this);if(!this['canUpdate']())return;this['updateSpritePosition'](),this[_0x4698ed(0x3bf)](),this[_0x4698ed(0x5c4)](),this['updateTextAngle'](),this[_0x4698ed(0x5f6)](),this[_0x4698ed(0x516)]();},Sprite_VisuMz_MessagePopup['prototype'][_0x19393c(0x24a)]=function(){const _0x1a09b1=_0x19393c;return!!this[_0x1a09b1(0x312)];},Sprite_VisuMz_MessagePopup[_0x19393c(0x495)][_0x19393c(0x17e)]=function(){const _0x6c48c6=_0x19393c,_0x425385=this[_0x6c48c6(0x53b)];{const _0x289152=$gameMap['tileWidth'](),_0x32ebbc=_0x425385[_0x6c48c6(0x228)]['x'],_0x4bbf3b=$gameMap[_0x6c48c6(0x1d3)](_0x32ebbc);this['x']=Math['floor'](_0x4bbf3b*_0x289152+_0x289152/0x2);}{const _0x4a26aa=$gameMap['tileHeight'](),_0x2bed90=_0x425385[_0x6c48c6(0x228)]['y'],_0x274483=$gameMap['adjustY'](_0x2bed90);this['y']=Math[_0x6c48c6(0x1d9)](_0x274483*_0x4a26aa+_0x4a26aa);}},Sprite_VisuMz_MessagePopup[_0x19393c(0x495)][_0x19393c(0x3bf)]=function(){const _0x14174a=_0x19393c;if(this[_0x14174a(0x3fb)]<=0x0)return;const _0x5b315b=this['_duration'],_0x4516f5=this['_wholeDuration'];{this[_0x14174a(0x1a3)]=(this[_0x14174a(0x1a3)]*(_0x5b315b-0x1)+this[_0x14174a(0x482)])/_0x5b315b,this[_0x14174a(0x51d)]=(this[_0x14174a(0x51d)]*(_0x5b315b-0x1)+this[_0x14174a(0x511)])/_0x5b315b;}{const _0x59a549=_0x4516f5-_0x5b315b,_0x47c946=_0x4516f5/0x2,_0xcca665=this['_arcPeak'],_0x5cf236=-_0xcca665/Math['pow'](_0x47c946,0x2);this['_currentArc']=_0x5cf236*Math[_0x14174a(0x52d)](_0x59a549-_0x47c946,0x2)+_0xcca665;}this[_0x14174a(0x312)]['x']=this[_0x14174a(0x1a3)],this[_0x14174a(0x312)]['y']=this['_offsetY']+this[_0x14174a(0x199)];},Sprite_VisuMz_MessagePopup['prototype'][_0x19393c(0x5c4)]=function(){const _0x4aefb7=_0x19393c;if(this['_duration']<=0x0)return;const _0x2926da=this[_0x4aefb7(0x3fb)];this['_textSprite'][_0x4aefb7(0x590)]['x']=(this['_textSprite'][_0x4aefb7(0x590)]['x']*(_0x2926da-0x1)+this[_0x4aefb7(0x3c9)])/_0x2926da,this[_0x4aefb7(0x312)][_0x4aefb7(0x590)]['y']=(this[_0x4aefb7(0x312)]['scale']['y']*(_0x2926da-0x1)+this[_0x4aefb7(0x5a4)])/_0x2926da;},Sprite_VisuMz_MessagePopup[_0x19393c(0x495)][_0x19393c(0x5ca)]=function(){const _0x133825=_0x19393c;if(this[_0x133825(0x3fb)]<=0x0)return;const _0x5616d3=this['_duration'];this[_0x133825(0x312)][_0x133825(0x340)]=(this['_textSprite'][_0x133825(0x340)]*(_0x5616d3-0x1)+this[_0x133825(0x61e)])/_0x5616d3;},Sprite_VisuMz_MessagePopup['prototype'][_0x19393c(0x5f6)]=function(){const _0x3123e3=_0x19393c;this[_0x3123e3(0x1b3)](),this[_0x3123e3(0x1f5)]();},Sprite_VisuMz_MessagePopup['prototype']['updateFadeIn']=function(){const _0xf3347f=_0x19393c;if(this[_0xf3347f(0x36f)]<=0x0)return;const _0x6be498=this[_0xf3347f(0x36f)];this['opacity']=(this['opacity']*(_0x6be498-0x1)+0xff)/_0x6be498,this[_0xf3347f(0x36f)]--,this[_0xf3347f(0x36f)]<=0x0&&(this[_0xf3347f(0x183)]=0xff);},Sprite_VisuMz_MessagePopup[_0x19393c(0x495)][_0x19393c(0x1f5)]=function(){const _0x546941=_0x19393c;if(this[_0x546941(0x287)]<=0x0)return;if(this[_0x546941(0x3fb)]>this['_fadeOutStart'])return;const _0x3fa37a=this['_fadeOutDuration'];this[_0x546941(0x183)]=(this['opacity']*(_0x3fa37a-0x1)+0x0)/_0x3fa37a,this[_0x546941(0x287)]--,this[_0x546941(0x287)]<=0x0&&(this['opacity']=0x0);},Sprite_VisuMz_MessagePopup[_0x19393c(0x495)][_0x19393c(0x516)]=function(){const _0x19b7f7=_0x19393c;if(this[_0x19b7f7(0x3fb)]<=0x0)return;this[_0x19b7f7(0x3fb)]--;if(this[_0x19b7f7(0x3fb)]<=0x0){if(this[_0x19b7f7(0x358)])this['parent']['removeChild'](this);this['_textSprite']['bitmap']&&this[_0x19b7f7(0x312)]['bitmap'][_0x19b7f7(0x3a8)]();}},VisuMZ[_0x19393c(0x532)]['Spriteset_Map_createLowerLayer']=Spriteset_Map[_0x19393c(0x495)]['createLowerLayer'],Spriteset_Map[_0x19393c(0x495)]['createLowerLayer']=function(){const _0x37620a=_0x19393c;VisuMZ['EventsMoveCore'][_0x37620a(0x610)][_0x37620a(0x496)](this),this[_0x37620a(0x221)]();},VisuMZ[_0x19393c(0x532)]['Spriteset_Map_createShadow']=Spriteset_Map['prototype']['createShadow'],Spriteset_Map[_0x19393c(0x495)][_0x19393c(0x55f)]=function(){const _0xac731c=_0x19393c;VisuMZ[_0xac731c(0x532)][_0xac731c(0x62a)][_0xac731c(0x496)](this),this[_0xac731c(0x5f2)]();},Spriteset_Map['prototype'][_0x19393c(0x5f2)]=function(){const _0x137334=_0x19393c;if(!VisuMZ[_0x137334(0x532)][_0x137334(0x329)]['Movement'][_0x137334(0x1b9)])return;for(const _0x26f53a of this[_0x137334(0x4f8)]){this[_0x137334(0x1e5)](_0x26f53a);}},Spriteset_Map[_0x19393c(0x495)]['createCharacterShadow']=function(_0x257640){const _0x25c4da=_0x19393c;_0x257640[_0x25c4da(0x347)]=new Sprite(),_0x257640[_0x25c4da(0x347)]['_filename']=_0x257640[_0x25c4da(0x3bd)][_0x25c4da(0x1b7)](),_0x257640['_shadowSprite'][_0x25c4da(0x384)]=ImageManager['loadSystem'](_0x257640[_0x25c4da(0x347)][_0x25c4da(0x1fc)]),_0x257640[_0x25c4da(0x347)][_0x25c4da(0x469)]['x']=0.5,_0x257640[_0x25c4da(0x347)][_0x25c4da(0x469)]['y']=0x1,_0x257640[_0x25c4da(0x347)]['z']=0x0,this[_0x25c4da(0x54c)][_0x25c4da(0x5ac)](_0x257640['_shadowSprite']);},Spriteset_Map[_0x19393c(0x495)][_0x19393c(0x34e)]=function(){const _0x16efec=_0x19393c;if(!VisuMZ[_0x16efec(0x532)][_0x16efec(0x329)]['Movement'][_0x16efec(0x1b9)])return;for(const _0x372bd4 of this[_0x16efec(0x4f8)]){this['_tilemap'][_0x16efec(0x33f)](_0x372bd4[_0x16efec(0x347)]);}},Spriteset_Map[_0x19393c(0x495)][_0x19393c(0x221)]=function(){const _0x1df46e=_0x19393c;this[_0x1df46e(0x487)]=[];for(const _0x5dae9c of $gameMap[_0x1df46e(0x3c6)]()){this[_0x1df46e(0x517)](_0x5dae9c);}},Spriteset_Map['MOBILE_EVENT_LABELS']=VisuMZ['EventsMoveCore'][_0x19393c(0x329)][_0x19393c(0x63e)][_0x19393c(0x1ab)]??!![],Spriteset_Map['prototype'][_0x19393c(0x517)]=function(_0x38af69){const _0x4c3498=_0x19393c;if(!this[_0x4c3498(0x1ac)](_0x38af69))return;if(Utils[_0x4c3498(0x60c)]()){if(!Spriteset_Map['MOBILE_EVENT_LABELS'])return;}let _0x38bad0;const _0x52e67a=VisuMZ[_0x4c3498(0x532)]['Settings'][_0x4c3498(0x63e)]['SpriteBased']??!![];_0x38bad0=_0x52e67a?new Sprite_EventLabel(_0x38af69):new Window_EventLabel(_0x38af69),_0x38bad0['z']=0x8,_0x38bad0[_0x4c3498(0x534)]=Sprite['_counter']++,this[_0x4c3498(0x54c)][_0x4c3498(0x5ac)](_0x38bad0),this[_0x4c3498(0x487)][_0x4c3498(0x19c)](_0x38bad0);},Spriteset_Map[_0x19393c(0x495)][_0x19393c(0x1ac)]=function(_0x4b4a85){const _0x32b191=_0x19393c,_0x41f970=_0x4b4a85['event']();if(_0x41f970[_0x32b191(0x58c)][_0x32b191(0x1cb)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x41f970[_0x32b191(0x58c)]['match'](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];for(const _0x4db040 of _0x41f970[_0x32b191(0x45c)]){let _0x3b73e4='';for(const _0x42670a of _0x4db040[_0x32b191(0x344)]){[0x6c,0x198][_0x32b191(0x239)](_0x42670a[_0x32b191(0x5c9)])&&(_0x3b73e4+=_0x42670a[_0x32b191(0x313)][0x0]);}if(_0x3b73e4[_0x32b191(0x1cb)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x3b73e4[_0x32b191(0x1cb)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];}return![];},Spriteset_Map[_0x19393c(0x495)]['createSpawnedEvent']=function(_0x202d5b){const _0x2d766d=_0x19393c;this['_characterSprites']=this[_0x2d766d(0x4f8)]||[];const _0x237d32=new Sprite_Character(_0x202d5b);this['_characterSprites']['push'](_0x237d32),this[_0x2d766d(0x54c)][_0x2d766d(0x5ac)](_0x237d32),this[_0x2d766d(0x1e5)](_0x237d32),this[_0x2d766d(0x517)](_0x202d5b),_0x237d32[_0x2d766d(0x4eb)]();},Spriteset_Map[_0x19393c(0x495)][_0x19393c(0x62b)]=function(){const _0x449e51=_0x19393c;if(!this['_labelWindows'])return;for(const _0x239ff3 of this['_labelWindows']){_0x239ff3&&(_0x239ff3[_0x449e51(0x1b5)]=undefined,_0x239ff3[_0x449e51(0x464)]());}},Spriteset_Map[_0x19393c(0x495)][_0x19393c(0x2f2)]=function(_0x134505,_0x3faaab){const _0x34668a=_0x19393c;if(!_0x134505)return;_0x3faaab[_0x34668a(0x228)]={'x':_0x134505['x'],'y':_0x134505['y']},this[_0x34668a(0x301)](_0x3faaab);},Spriteset_Map[_0x19393c(0x495)][_0x19393c(0x301)]=function(_0x56cfa8){const _0x5afffa=_0x19393c;if(!this[_0x5afffa(0x54c)])return;const _0x5988c9=new Sprite_VisuMz_MessagePopup(_0x56cfa8);this[_0x5afffa(0x54c)][_0x5afffa(0x5ac)](_0x5988c9);},VisuMZ[_0x19393c(0x532)]['Game_Message_setNumberInput']=Game_Message[_0x19393c(0x495)][_0x19393c(0x3de)],Game_Message['prototype'][_0x19393c(0x3de)]=function(_0x3aeea2,_0x5eaa2a){const _0x281f24=_0x19393c;this['_selfTargetNumberInput']=$gameTemp[_0x281f24(0x3f8)](),VisuMZ[_0x281f24(0x532)][_0x281f24(0x2c3)][_0x281f24(0x496)](this,_0x3aeea2,_0x5eaa2a);},VisuMZ['EventsMoveCore'][_0x19393c(0x4ef)]=Window_NumberInput[_0x19393c(0x495)][_0x19393c(0x53f)],Window_NumberInput['prototype'][_0x19393c(0x53f)]=function(){const _0x5024d9=_0x19393c;$gameTemp[_0x5024d9(0x261)]($gameMessage['_selfTargetNumberInput']),VisuMZ[_0x5024d9(0x532)][_0x5024d9(0x4ef)][_0x5024d9(0x496)](this),$gameTemp[_0x5024d9(0x1a6)]();},VisuMZ[_0x19393c(0x532)]['Window_NumberInput_processOk']=Window_NumberInput[_0x19393c(0x495)][_0x19393c(0x5c8)],Window_NumberInput[_0x19393c(0x495)][_0x19393c(0x5c8)]=function(){const _0x3efe06=_0x19393c;$gameTemp[_0x3efe06(0x261)]($gameMessage[_0x3efe06(0x1c2)]),VisuMZ[_0x3efe06(0x532)][_0x3efe06(0x371)][_0x3efe06(0x496)](this),$gameTemp['clearSelfTarget'](),$gameMessage[_0x3efe06(0x1c2)]=undefined;},VisuMZ[_0x19393c(0x532)][_0x19393c(0x180)]=Game_Message[_0x19393c(0x495)][_0x19393c(0x174)],Game_Message['prototype'][_0x19393c(0x174)]=function(_0x434160,_0x49e7f5){const _0x561187=_0x19393c;this[_0x561187(0x51f)]=$gameTemp['getSelfTarget'](),VisuMZ[_0x561187(0x532)][_0x561187(0x180)]['call'](this,_0x434160,_0x49e7f5);},VisuMZ[_0x19393c(0x532)][_0x19393c(0x2c7)]=Window_EventItem[_0x19393c(0x495)]['onOk'],Window_EventItem[_0x19393c(0x495)][_0x19393c(0x36b)]=function(){const _0x488054=_0x19393c;$gameTemp[_0x488054(0x261)]($gameMessage[_0x488054(0x51f)]),VisuMZ[_0x488054(0x532)][_0x488054(0x2c7)][_0x488054(0x496)](this),$gameTemp[_0x488054(0x1a6)](),$gameMessage['_selfTargetItemChoice']=undefined;},VisuMZ['EventsMoveCore'][_0x19393c(0x5b1)]=Window_EventItem['prototype'][_0x19393c(0x44e)],Window_EventItem[_0x19393c(0x495)][_0x19393c(0x44e)]=function(){const _0x3866b2=_0x19393c;$gameTemp['registerSelfTarget']($gameMessage[_0x3866b2(0x51f)]),VisuMZ['EventsMoveCore'][_0x3866b2(0x5b1)][_0x3866b2(0x496)](this),$gameTemp['clearSelfTarget'](),$gameMessage[_0x3866b2(0x51f)]=undefined;},VisuMZ[_0x19393c(0x532)][_0x19393c(0x237)]=Window_Message['prototype'][_0x19393c(0x3d7)],Window_Message[_0x19393c(0x495)]['startMessage']=function(){const _0x38d817=_0x19393c;$gameMessage[_0x38d817(0x1e4)](),VisuMZ[_0x38d817(0x532)][_0x38d817(0x237)][_0x38d817(0x496)](this),$gameTemp[_0x38d817(0x1a6)]();},VisuMZ[_0x19393c(0x532)]['Window_ScrollText_startMessage']=Window_ScrollText[_0x19393c(0x495)][_0x19393c(0x3d7)],Window_ScrollText[_0x19393c(0x495)]['startMessage']=function(){const _0x21875d=_0x19393c;$gameMessage[_0x21875d(0x1e4)](),VisuMZ[_0x21875d(0x532)][_0x21875d(0x18b)][_0x21875d(0x496)](this),$gameTemp[_0x21875d(0x1a6)]();};function Window_EventLabel(){const _0x211934=_0x19393c;this[_0x211934(0x46e)](...arguments);}Window_EventLabel[_0x19393c(0x495)]=Object[_0x19393c(0x3ec)](Window_Base[_0x19393c(0x495)]),Window_EventLabel['prototype'][_0x19393c(0x5e9)]=Window_EventLabel,Window_EventLabel['prototype'][_0x19393c(0x46e)]=function(_0x248cf8){const _0x44c7b3=_0x19393c;this[_0x44c7b3(0x209)]=_0x248cf8;const _0x15500b=new Rectangle(0x0,0x0,Graphics[_0x44c7b3(0x4e1)]/0x4,this[_0x44c7b3(0x2e3)](0x1));this['initMembers'](),Window_Base[_0x44c7b3(0x495)][_0x44c7b3(0x46e)]['call'](this,_0x15500b),this['contentsOpacity']=0x0,this['setBackgroundType'](0x2),this['_text']='';},Window_EventLabel[_0x19393c(0x495)][_0x19393c(0x1b8)]=function(){const _0x2b12a9=_0x19393c;this['_eventErased']=![],this['_screenZoomScale']=$gameScreen[_0x2b12a9(0x243)](),this[_0x2b12a9(0x4a4)]=this[_0x2b12a9(0x209)][_0x2b12a9(0x3b6)](),this['_eventScreenY']=this[_0x2b12a9(0x209)][_0x2b12a9(0x275)](),this['_eventLabelOffsetX']=this['_event'][_0x2b12a9(0x4e0)][_0x2b12a9(0x33a)],this[_0x2b12a9(0x3b0)]=this[_0x2b12a9(0x209)][_0x2b12a9(0x4e0)][_0x2b12a9(0x2a8)],this[_0x2b12a9(0x35f)]=this[_0x2b12a9(0x209)]['_pageIndex'],this[_0x2b12a9(0x5eb)]=this[_0x2b12a9(0x327)](),this[_0x2b12a9(0x5f5)]=$gameSystem[_0x2b12a9(0x50e)](),this[_0x2b12a9(0x1b5)]=$gamePlayer['x'],this[_0x2b12a9(0x4f7)]=$gamePlayer['y'],this[_0x2b12a9(0x339)]=this[_0x2b12a9(0x209)]['x'],this[_0x2b12a9(0x39a)]=this[_0x2b12a9(0x209)]['y'];},Window_EventLabel['prototype'][_0x19393c(0x4eb)]=function(){const _0x4e6a88=_0x19393c;Window_Base[_0x4e6a88(0x495)]['update'][_0x4e6a88(0x496)](this);if(!this[_0x4e6a88(0x4fe)]())return;this[_0x4e6a88(0x292)](),this[_0x4e6a88(0x2aa)](),this[_0x4e6a88(0x226)](),this['updateOpacity']();},Window_EventLabel['prototype']['needsUpdate']=function(){const _0x1a4256=_0x19393c;if(!this[_0x1a4256(0x209)])return![];if(!this[_0x1a4256(0x209)][_0x1a4256(0x4e0)])return![];if(this['_eventPageIndex']!==this[_0x1a4256(0x209)][_0x1a4256(0x432)])return!![];if(this[_0x1a4256(0x209)][_0x1a4256(0x57f)]&&!this[_0x1a4256(0x1e7)])return!![];if(this[_0x1a4256(0x209)][_0x1a4256(0x4e0)][_0x1a4256(0x5f0)]==='')return![];if(this[_0x1a4256(0x5cf)]!==$gameScreen[_0x1a4256(0x243)]())return!![];if(this[_0x1a4256(0x4a4)]!==this[_0x1a4256(0x209)]['screenX']())return!![];if(this['_eventScreenY']!==this[_0x1a4256(0x209)][_0x1a4256(0x275)]())return!![];if(this[_0x1a4256(0x271)]!==this[_0x1a4256(0x209)][_0x1a4256(0x4e0)][_0x1a4256(0x33a)])return!![];if(this[_0x1a4256(0x3b0)]!==this['_event'][_0x1a4256(0x4e0)][_0x1a4256(0x2a8)])return!![];if(this[_0x1a4256(0x1b5)]!==$gamePlayer['x'])return!![];if(this[_0x1a4256(0x4f7)]!==$gamePlayer['y'])return!![];if(this[_0x1a4256(0x339)]!==this[_0x1a4256(0x209)]['x'])return!![];if(this[_0x1a4256(0x39a)]!==this['_event']['y'])return!![];if(this['_cacheSystemVisible']!==$gameSystem[_0x1a4256(0x50e)]())return!![];if(this[_0x1a4256(0x5eb)]&&this[_0x1a4256(0x296)]<0xff)return!![];if(!this[_0x1a4256(0x5eb)]&&this[_0x1a4256(0x296)]>0x0)return!![];if(SceneManager['_scene'][_0x1a4256(0x337)]>0x0)return!![];return![];},Window_EventLabel[_0x19393c(0x495)]['updateText']=function(){const _0x23f6ea=_0x19393c;this[_0x23f6ea(0x209)]['labelWindowText']()!==this[_0x23f6ea(0x19a)]&&(this[_0x23f6ea(0x19a)]=this[_0x23f6ea(0x209)]['labelWindowText'](),this['refresh']());},Window_EventLabel[_0x19393c(0x495)][_0x19393c(0x2aa)]=function(){const _0x5ee545=_0x19393c;this[_0x5ee545(0x590)]['x']=0x1/$gameScreen[_0x5ee545(0x243)](),this[_0x5ee545(0x590)]['y']=0x1/$gameScreen[_0x5ee545(0x243)](),this[_0x5ee545(0x5cf)]=$gameScreen['zoomScale']();},Window_EventLabel[_0x19393c(0x495)][_0x19393c(0x226)]=function(){const _0x5d0a15=_0x19393c;if(!SceneManager['_scene'])return;if(!SceneManager['_scene'][_0x5d0a15(0x46a)])return;const _0x5f467a=SceneManager[_0x5d0a15(0x4ee)]['_spriteset'][_0x5d0a15(0x1f3)](this[_0x5d0a15(0x209)]);if(!_0x5f467a)return;this['x']=Math[_0x5d0a15(0x25f)](this['_event']['screenX']()-Math[_0x5d0a15(0x1d9)](this[_0x5d0a15(0x4d1)]*this['scale']['x']/0x2)),this['x']+=this[_0x5d0a15(0x209)][_0x5d0a15(0x4e0)]['offsetX'],this['y']=this['_event'][_0x5d0a15(0x275)]()-_0x5f467a['height'],this['y']+=Math[_0x5d0a15(0x25f)]($gameSystem[_0x5d0a15(0x48d)]()*0.5),this['y']-=Math[_0x5d0a15(0x25f)](this[_0x5d0a15(0x3da)]*this[_0x5d0a15(0x590)]['y']),this['y']+=this[_0x5d0a15(0x209)][_0x5d0a15(0x4e0)][_0x5d0a15(0x2a8)],this[_0x5d0a15(0x1e7)]=this[_0x5d0a15(0x209)][_0x5d0a15(0x57f)],this[_0x5d0a15(0x4a4)]=this[_0x5d0a15(0x209)][_0x5d0a15(0x3b6)](),this[_0x5d0a15(0x244)]=this[_0x5d0a15(0x209)]['screenY'](),this[_0x5d0a15(0x271)]=this['_event']['_labelWindow']['offsetX'],this['_eventLabelOffsetY']=this[_0x5d0a15(0x209)][_0x5d0a15(0x4e0)][_0x5d0a15(0x2a8)],this[_0x5d0a15(0x35f)]=this['_event'][_0x5d0a15(0x432)],this['_eventErased']&&(this[_0x5d0a15(0x296)]=0x0);},Window_EventLabel[_0x19393c(0x495)][_0x19393c(0x5f6)]=function(){const _0x2f593e=_0x19393c;if(this[_0x2f593e(0x327)]())this[_0x2f593e(0x296)]+=this[_0x2f593e(0x1ff)]();else SceneManager['_scene'][_0x2f593e(0x337)]>0x0?this[_0x2f593e(0x296)]=0x0:this[_0x2f593e(0x296)]-=this[_0x2f593e(0x1ff)]();},Window_EventLabel[_0x19393c(0x495)][_0x19393c(0x327)]=function(){const _0x76f175=_0x19393c;if(!$gameSystem[_0x76f175(0x50e)]())return![];if(this['_event']?.[_0x76f175(0x57f)])return![];if(SceneManager[_0x76f175(0x4ee)][_0x76f175(0x337)]>0x0)return![];const _0x5c24ff=$gamePlayer['x'],_0xc7fb5c=$gamePlayer['y'],_0x5528bb=this[_0x76f175(0x209)]['x'],_0x5a6818=this['_event']['y'];if(this[_0x76f175(0x1b5)]===_0x5c24ff&&this[_0x76f175(0x4f7)]===_0xc7fb5c&&this[_0x76f175(0x339)]===_0x5528bb&&this[_0x76f175(0x39a)]===_0x5a6818)return this[_0x76f175(0x5eb)];this[_0x76f175(0x1b5)]=$gamePlayer['x'],this[_0x76f175(0x4f7)]=$gamePlayer['y'],this['_visibleEventX']=this[_0x76f175(0x209)]['x'],this[_0x76f175(0x39a)]=this['_event']['y'];if(!VisuMZ['EventsMoveCore'][_0x76f175(0x5f9)](this[_0x76f175(0x209)]))return this[_0x76f175(0x5eb)]=![],![];return this[_0x76f175(0x5eb)]=!![],!![];},Window_EventLabel['prototype']['opacitySpeed']=function(){const _0x170aa4=_0x19393c;return VisuMZ[_0x170aa4(0x532)]['Settings'][_0x170aa4(0x63e)]['OpacitySpeed'];},Window_EventLabel[_0x19393c(0x495)][_0x19393c(0x1c4)]=function(){const _0x32b48b=_0x19393c,_0x9824f5=this[_0x32b48b(0x2ad)](this['_text']);this[_0x32b48b(0x4d1)]=_0x9824f5[_0x32b48b(0x4d1)]+($gameSystem[_0x32b48b(0x48d)]()+this[_0x32b48b(0x1e0)]())*0x2,this[_0x32b48b(0x3da)]=Math[_0x32b48b(0x31e)](this[_0x32b48b(0x420)](),_0x9824f5[_0x32b48b(0x3da)])+$gameSystem['windowPadding']()*0x2,this[_0x32b48b(0x33c)]();},Window_EventLabel[_0x19393c(0x495)][_0x19393c(0x420)]=function(){return VisuMZ['EventsMoveCore']['Settings']['Label']['LineHeight'];},Window_EventLabel['prototype'][_0x19393c(0x4a0)]=function(){const _0x2dd3f0=_0x19393c;Window_Base[_0x2dd3f0(0x495)][_0x2dd3f0(0x4a0)][_0x2dd3f0(0x496)](this),this[_0x2dd3f0(0x48a)][_0x2dd3f0(0x2df)]=this['defaultFontSize']();},Window_EventLabel['prototype']['defaultFontSize']=function(){const _0x110580=_0x19393c;return VisuMZ[_0x110580(0x532)][_0x110580(0x329)][_0x110580(0x63e)][_0x110580(0x563)];},Window_EventLabel[_0x19393c(0x495)][_0x19393c(0x464)]=function(){const _0x5e8a86=_0x19393c;this[_0x5e8a86(0x1c4)](),this[_0x5e8a86(0x48a)][_0x5e8a86(0x56d)]();const _0x3c75aa=this['_text'][_0x5e8a86(0x20e)](/[\r\n]+/);let _0x4e2e39=0x0;for(const _0x22a786 of _0x3c75aa){const _0x247204=this[_0x5e8a86(0x2ad)](_0x22a786),_0x31a4dc=Math[_0x5e8a86(0x1d9)]((this[_0x5e8a86(0x62d)]-_0x247204[_0x5e8a86(0x4d1)])/0x2);this[_0x5e8a86(0x351)](_0x22a786,_0x31a4dc,_0x4e2e39),_0x4e2e39+=_0x247204[_0x5e8a86(0x3da)];}},Window_EventLabel[_0x19393c(0x495)][_0x19393c(0x58f)]=function(_0x22ba93,_0x582c9d){const _0x41d5cd=_0x19393c;_0x582c9d[_0x41d5cd(0x28a)]&&this[_0x41d5cd(0x52a)](_0x22ba93,_0x582c9d['x']+0x2,_0x582c9d['y']),_0x582c9d['x']+=Math[_0x41d5cd(0x194)](this[_0x41d5cd(0x17f)](),ImageManager['iconWidth'])+0x4;},Window_EventLabel[_0x19393c(0x495)][_0x19393c(0x52a)]=function(_0x4092b9,_0x46ed83,_0x3bc389){const _0x167e85=_0x19393c,_0x50c80f=ImageManager['loadSystem'](_0x167e85(0x1c5)),_0x542386=ImageManager[_0x167e85(0x182)],_0x5a878d=ImageManager['iconHeight'],_0x18b7b7=_0x4092b9%0x10*_0x542386,_0xbc3e41=Math[_0x167e85(0x1d9)](_0x4092b9/0x10)*_0x5a878d,_0xce2e0b=Math[_0x167e85(0x194)](this['iconSize']()),_0x5109c7=Math[_0x167e85(0x194)](this[_0x167e85(0x17f)]());this[_0x167e85(0x48a)][_0x167e85(0x210)](_0x50c80f,_0x18b7b7,_0xbc3e41,_0x542386,_0x5a878d,_0x46ed83,_0x3bc389,_0xce2e0b,_0x5109c7);},Window_EventLabel['prototype'][_0x19393c(0x17f)]=function(){const _0x96b7b7=_0x19393c;return VisuMZ[_0x96b7b7(0x532)]['Settings'][_0x96b7b7(0x63e)]['IconSize'];};