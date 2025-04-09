//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.53;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.53] [MessageCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Message Core plugin extends and builds upon the message functionality of
 * RPG Maker MZ and allows you, the game dev, to customize the workflow for
 * your game's message system.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general message settings.
 * * Auto-Color key words and/or database entries.
 * * Increases the text codes available to perform newer functions/effects.
 * * Ability for you to implement custom Text Code actions.
 * * Ability for you to implement custom Text code string replacements.
 * * Invoke a macro system to speed up the dev process.
 * * Add a Text Speed option to the Options menu.
 * * Add the ever so useful Word Wrap to your message system.
 * * Extend the choice selection process to your liking.
 * * The ability to enable/disable as well as show/hide certain choices.
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
 * Dim Background Extension
 * 
 * Before, when using the Dim Background as a part of a Show Text event, its
 * size is only the same as the message window's width itself. This looked
 * really ugly because it had hard edges cutting off while gradients are seen
 * elsewhere. To make it look better, we extended the dimmed background to span
 * the width of the screen instead.
 * 
 * ---
 * 
 * Extended Messages
 * 
 * If you decide to expand the size of the message window to allow for more
 * rows to be displayed, you can type in the data for them by chaining together
 * Show Message events. They will take data from each other and display them in
 * the same message window as long as there are enough rows.
 * 
 * ---
 *
 * Extended Choice Lists
 * 
 * Choice lists can be extended by just chaining one Choice List event after
 * the other in succession along the same indentation. They do not extend if
 * there is any event other than a Choice List option between them on the same
 * indentation level.
 *
 * ---
 *
 * ============================================================================
 * Text Language Information
 * ============================================================================
 *
 * As of Message Core version 1.46, Text Language has been added. 
 * 
 * The "Text Language" feature allows your players to switch between different
 * languages for your game to allow people from around the globe to enjoy what
 * story you have to tell.
 * 
 * Disclaimers: This is not an automatic translation tool. Translations made
 * through the "Text Language" feature of the VisuStella MZ Message Core
 * will require manual input by the game developer.
 * 
 * As of Message Core version 1.53, we've decided to add support for TSV.
 * 
 * This is because we have done our research and decided that CSV's are too
 * restricted to use due to their default nature of wanting to use commas as
 * separators. Thus, we've decided to switch to TSV where the default separator
 * is a tab space, something that is almost never used in RPG Maker text.
 *
 * ---
 * 
 * === How to Enable Switching ===
 * 
 * Text Language is NOT enabled by default. Here's what you have to do:
 * 
 * #1. Open up the Message Core's Plugin Parameters
 * #2. Plugin Parameters > Text Language Settings > Enable Switching?
 * #3. Change the "Enable Switching?" parameter setting to "true".
 * #4. Adjust any other settings as needed.
 * #5. Save the Plugin Parameter changes.
 * #6. Save your game.
 * 
 * Now, it's time to get the CSV/TSV file that will contain all of the text
 * used to translate your game's script.
 * 
 * #1. Play test your game. Make sure Play test mode is NOT disabled.
 * #2. A popup will appear asking to create a language CSV/TSV file.
 * #3. Click "OK" and let the plugin do its thing.
 * #4. The project's /data/ folder will appear with Language.csv/tsv made.
 * #5. The plugin will then ask you to restart your game.
 * 
 * '''IMPORTANT!''' The separator used for the CSV file must be a semicolon (;)
 * and not a comma (,) as to reduce the amount of punctuation conflicts. Keep
 * this in mind as most CSV editors will default to comma (,) instead of the
 * semicolon (;) for their separator.
 * 
 * ---
 * 
 * === How to Edit the Language CSV/TSV ===
 * 
 * The Language CSV/TSV is structured as a normal CSV/TSV file would be, which
 * also means it can be modified in programs like Microsoft Excel or Google
 * Sheets. We recommend using either of those programs to modify the text.
 * 
 * We do not recommend modifying the CSV/TSV file in programs like notepad
 * directly due to the way certain things like commas (,) and tabs are handled
 * and how easy it is to be error-prone.
 * 
 * The table will appear something like this at first:
 * 
 *     Key        English    Chinese    Japanese     Korean
 *     Greeting   Hello      你好       こんにちは    안녕하세요
 *     Farewell   Good-bye   再见       さようなら    안녕히
 *     Wow        Wow        哇         ワオ          와우
 * 
 * The "Key" column refers to the reference key used to determine which lines
 * will be inserted into the text. The columns with the languages will utilize
 * the respective phrases for that language.
 * 
 * You can remove columns containing languages that you aren't planning to
 * translate for your game.
 * 
 * ---
 * 
 * === Things to Keep in Mind ===
 * 
 * When adding text to the CSV/TSV file via the spreadsheet editor (Excel or
 * Google Sheets), there's a few things to keep in mind.
 * 
 * ---
 * 
 * ==== How to Load the CSV/TSV in Google Sheets ====
 * 
 * If you are using Google Sheets and wish to edit the CSV/TSV without it
 * converting all the separators into commas, here's what you do:
 * 
 * #1. Go to "https://sheets.google.com"
 * #2. Create a "Blank spreadsheet"
 * #3. File > Import > Upload > Select the CSV/TSV file that was created in
 *     your game project's /data/ folder. You may need to select "All Files"
 *     for file type if uploading a TSV.
 * #4. For "Separator Type", if you are using CSV, change it to "Custom" and
 *     insert the Semicolon ";". Otherwise, if you are using TSV, select "tab"
 *     as your separator type.
 * #5. Uncheck "Convert text to numbers, dates, and formulas"
 * 
 * ==== How to Load the CSV/TSV in VS Code ===
 * 
 * #1. Go to "https://code.visualstudio.com/"
 * #2. Download and install it
 * #3. Open up VS Code and go to View > Extensions
 * #4. Search for an extension called "Edit CSV"
 * #5. Load the CSV/TSV file into VS Code and view with the CSV Editor
 * #6. Click the button that says "Edit CSV" in the upper right
 * 
 * ==== Line Breaks ====
 * 
 * When you want to insert line breaks into the translated phrases, use the
 * <br> text code. This is best used for text that is to be transferred into
 * the message window or help window.
 * 
 * ==== Text Codes ====
 * 
 * Text codes like \C[2] can be inserted normally. However, they only work in
 * windows that support text codes, such as the message window or help window.
 * Otherwise, the text codes will not transfer over properly.
 * 
 * ==== Semicolons (CSV Only) ====
 * 
 * Due to the nature of the CSV file, we used the semicolon (;) as the
 * separator. As such, semicolons should not be used in the text entries.
 * Though some sentences will work with the semicolon, not all of them will. If
 * you do want to use a semicolon, use the text code <semicolon> instead.
 * 
 *   Example:
 * 
 *   "The pancakes were delicious<semicolon> they were fluffy and sweet."
 * 
 * Other variations of the semicolon text code are <semi> and <semi-colon>.
 * The <semicolon> text code and variants only work with the Language CSV and
 * are ignored otherwise when typed in a regular message box entry.
 * 
 * ---
 * 
 * ==== Macros and Language Switches ====
 * 
 * For those using both text macros and text language switches, macros will be
 * converted to text before language switches as it allows for better text
 * transitions that way.
 * 
 * ---
 * 
 * === How to Use the Reference Keys ===
 * 
 * Remember the "Key" column and the reference keys? Those are used to
 * determine which lines will be inserted into the text for the message window
 * and just about any other window. However, there's a specific way these keys
 * must be used in order for them to work.
 * 
 * The "text code" format works like this. Use any of the following:
 * 
 *   \tl{keyName}
 *   \translate{keyName}
 *   \loc{keyName}
 *   \locale{keyName}
 *   \localize{keyName}
 * 
 * or for those coming from different translation plugins but want to switch
 * over to the VisuStella MZ Message Core's translation system:
 * 
 *   ${keyName}
 * 
 * For example, to use one of the default keys made with the Language CSV/TSV:
 * 
 *   \tl{Greeting}
 * 
 * This will yield "Hello" in English, "你好" in Chinese, "こんにちは" in
 * Japanese, and "안녕하세요" in Korean.
 * 
 * Key names are not case sensitive and any trailing spaces will be removed
 * from them in order to make sure the CSV/TSV table is stable to reference any
 * translated text from.
 * 
 * You can insert these language "text codes" into item names, skill names,
 * etc. as well as system entries like for Attack, Defense, etc.
 * 
 * ---
 * 
 * === Naming Weapon Types, Armor Types, Equip Types, Item Categories ===
 * 
 * You might have noticed that if you've decided to use \tl{keyName} for weapon
 * or other database types, other parts of the game will error out. Don't
 * worry, for these, you don't have to change the currently used database name.
 * Go straight to the CSV/TSV and insert in a new key for that particular
 * database name. For example, the equip type "Accessory" will use "Accessory"
 * as the automatic key to look for a translated phrase. If there isn't any in
 * the CSV/TSV file, then the default database text entry will be used.
 * 
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. Some of
 * these are original text codes provided by RPG Maker MZ, while others are
 * new text codes added through this plugin. You may even add your own text
 * codes through the plugin parameters.
 *
 * === RPG Maker MZ Text Codes ===
 *
 * The following are text codes that come with RPG Maker MZ. These text codes
 * cannot be edited through the Plugin Parameters.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \V[x]                Replaced by the value of variable 'x'.
 * \N[x]                Replaced by the name of actor 'x'.
 * \P[x]                Replaced by the name of party member 'x'.
 * \C[x]                Draw the subsequent text with window skin color 'x'.
 * \I[x]                Draw icon 'x'.
 *
 * \PX[x]               Moves text x position to 'x'.
 * \PY[x]               Moves text y position to 'y'.
 *
 * \G                   Replaced by the currency unit.
 *
 * \{                   Increase the text font size by one step.
 * \}                   Decrease the text font size by one step.
 * \FS[x]               Changes the text font size to 'x'.
 *
 * \\                   Replaced by the backslash character.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \$                   Opens the gold window.
 * \.                   Waits a 1/4 second.
 * \|                   Waits a full second.
 * \!                   Waits for button input.
 * \>                   Display remaining text on same line all at once.
 * \<                   Cancel the effect that displays text all at once.
 * \^                   Do not wait for input after displaying text to move on.
 *
 * ---
 *
 * === Message Core Hard-Coded Text Codes ===
 *
 * The following text codes are hard-coded into VisuStella MZ Message Core's
 * code. These text codes cannot be edited through the Plugin Parameters.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <b>                  Makes subsequent text bold.
 * </b>                 Removes bold from subsequent text.
 * <i>                  Makes subsequent text italic.
 * </i>                 Removes italic from subsequent text.
 * 
 * <left>               Makes subsequent text left-aligned. *Note1*
 * </left>              Removes left-alignment for subsequent text.
 * <center>             Makes subsequent text center-aligned. *Note1*
 * </center>            Removes center-alignment for subsequent text.
 * <right>              Makes subsequent text right-aligned. *Note1*
 * </right>             Removes right-alignment for subsequent text.
 *
 * Note1: Use at line-start. Does not work with Word Wrap.
 *
 * ---
 * 
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 *
 * <ColorLock>          Text codes can't change text color for subsequent text.
 * </ColorLock>         Removes Color Lock property.
 *
 * <WordWrap>           Enables Word Wrap for this window. *Note2*
 * </WordWrap>          Disables Word Wrap for this window. *Note2*
 * <br>                 Adds a line break. Requires Word Wrap enabled.
 * <line break>         Adds a line break. Requires Word Wrap enabled.
 *
 * Note2: Some windows cannot use Word Wrap such as the Choice Window.
 * Word Wrap also cannot be used together with <left>, <center>, or <right> and
 * will disable itself if text alignment text codes are detected.
 *
 * ---
 * 
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 *
 * \picture<x>          Draws picture x (filename) at current text position.
 * \CenterPicture<x>    Draws picture x (filename) centered at the window.
 * 
 * While these text codes are available globally, they are best suited for use
 * in the message window or any other window that does not change its contents.
 * The reason being is because the picture drawn is drawn into the background
 * of the window.
 * 
 * Therefore, we do not recommend using this in windows that change contents
 * often like Help Windows or Quest Descriptions. Instead, we recommend using
 * icons instead.
 * 
 * As of the version 1.53 update, the Help Window now supports both of these
 * text codes. However, we still recommend using icons over using pictures as
 * there will be loading delays.
 *
 * ---
 * 
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Map Name)
 * ------------------   -------------------------------------------------------
 * <left>               Makes map name align to left side of screen.
 * <center>             Makes map name align to horizontally center of screen.
 * <right>              Makes map name align to right side of screen.
 * 
 * <top>                Makes map name align to top of screen.
 * <middle>             Makes map name align to vertically middle of screen.
 * <bottom>             Makes map name align to bottom of screen.
 * 
 * <X: +n>              Adjusts the horizontal position of map name by n.
 * <X: -n>              Adjusts the horizontal position of map name by n.
 * 
 * <Y: +n>              Adjusts the vertical position of map name by n.
 * <Y: -n>              Adjusts the vertical position of map name by n.
 * 
 * Note: All of these text codes require VisuMZ_0_CoreEngine installed and its
 * "Map Name Text Code" plugin parameter enabled.
 * 
 * ---
 * 
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <Caps>               Makes all text after this capitalized.
 *                      Turns off other auto-text case modes.
 *                      ie: "hello world" becomes "HELLO WORLD"
 * </Caps>              Turns off auto text-casing effects.
 * 
 * <Upper>              Makes the first letter of any word after a space to be
 *                      capitalized. Other letters are left alone.
 *                      Turns off other auto-text case modes.
 *                      ie. "old mcDonald" becomes "Old McDonald"
 * </Upper>             Turns off auto text-casing effects.
 * 
 * <Lower>              Makes all text after this lowercase.
 *                      Turns off other auto-text case modes.
 *                      ie: "THE QUICK BROWN FOX" becomes "the quick brown fox"
 * </Lower>             Turns off auto text-casing effects.
 * 
 * <Alt>                Makes all text after this alternate between uppercase
 *                      and lowercase. Turns off other auto-text case modes.
 *                      ie: "Hello" becomes "HeLlO"
 * </Alt>               Turns off auto text-casing effects.
 * 
 * <Chaos>              Makes all text after this randomize between uppercase
 *                      and lowercase. Turns off other auto-text case modes.
 *                      ie: "Wassup" becomes "waSsUP" or "WasSuP"
 * </Chaos>             Turns off auto text-casing effects.
 * 
 * **Clarity:** In case you're wondering, the text codes </Caps>, </Upper>,
 * </Lower>, </Alt>, and </Chaos> all do the same thing and can be used
 * interchangeably with each other. For example, you can do this:
 * <Caps>hello world</Lower> and it would still accomplish the same effect, but
 * you won't do that because you're not a monster of a developer.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \CommonEvent[x]      Runs common event x when text code is reached.
 * \Wait[x]             Makes the message wait x frames before continuing.
 * 
 * <Next Page>          Ends the current message page at this line. This is
 *                      used for messages when rows are at 5 or above and the
 *                      message lines don't match the amount. This is used to
 *                      prevent grabbing message windows from following message
 *                      events. Any lines following <Next Page> in the same
 *                      message event will be ignored.
 * 
 * <Auto>               Resizes message window dimensions to fit text. *Note3*
 * <Auto Width>         Resizes message window width to fit text. *Note3*
 * <Auto Height>        Resizes message window height to fit text. *Note3*
 * 
 * <Auto Actor: x>      Resizes message window and positions it over actor x
 *                      sprite's head. *Note3*
 * <Auto Party: x>      Resizes message window and positions it over party
 *                      member x sprite's head. *Note3*
 * <Auto Player>        Map-Only. Resizes message window and positions it over
 *                      the player sprite's head. *Note3*
 * <Auto Event: x>      Map-Only. Resizes message window and positions it over
 *                      event x sprite's head. *Note3*
 * <Auto Enemy: x>      Battle-Only. Resizes message window and positions it
 *                      over enemy x sprite's head. *Note3*
 *
 * Note3: Upon using these text codes, the message window's settings will be
 * reset for the upcoming message. These effects do not work with Word Wrap.
 *
 * ---
 *
 * ----------------------------   ---------------------------------------------
 * Text Code                      Effect (Battle Only)
 * ----------------------------   ---------------------------------------------
 * <Current Battle Target>        Replaces text code with the current target of
 *                                an action in battle.
 * <Current Battle User>          Replaces text code with the currently active
 *                                user in battle.
 * <Current Battle Action>        Replaces text code with the current battle
 *                                action's name with an icon in front.
 * <Current Battle Action Name>   Replaces text code with the current battle
 *                                action's name without an icon.
 * 
 * If there is no battle, no target, no user, or no action, then the text code
 * will just be replaced with no text.
 * 
 * These text codes are NOT recommended to be used inside of Help Descriptions.
 * They are best used with "Show Text" event commands.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Effect (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * <Show>                         Choice is always shown.
 * <Show Switch: x>               Choice shown if switch x is ON.
 * <Show Switches: x,x,x>         Choice shown if the x switches are all ON.
 * <Show All Switches: x,x,x>     Choice shown if the x switches are all ON.
 * <Show Any Switches: x,x,x>     Choice shown if any of x switches are ON.
 *
 * <Hide>                         Choice is always hidden.
 * <Hide Switch: x>               Choice hidden if switch x is ON.
 * <Hide Switches: x,x,x>         Choice hidden if the x switches are all ON.
 * <Hide All Switches: x,x,x>     Choice hidden if the x switches are all ON.
 * <Hide Any Switches: x,x,x>     Choice hidden if any of x switches are ON.
 *
 * <Enable>                       Choice is always enabled.
 * <Enable Switch: x>             Choice enabled if switch x is ON.
 * <Enable Switches: x,x,x>       Choice enabled if the x switches are all ON.
 * <Enable All Switches: x,x,x>   Choice enabled if the x switches are all ON.
 * <Enable Any Switches: x,x,x>   Choice enabled if any of x switches are ON.
 *
 * <Disable>                      Choice is always disabled.
 * <Disable Switch: x>            Choice disabled if switch x is ON.
 * <Disable Switches: x,x,x>      Choice disabled if the x switches are all ON.
 * <Disable All Switches: x,x,x>  Choice disabled if the x switches are all ON.
 * <Disable Any Switches: x,x,x>  Choice disabled if any of x switches are ON.
 * 
 * <Choice Width: x>              Sets the minimum text area width to x.
 *                                Applies to whole choice window.
 * <Choice Indent: x>             Sets the indent to x value. Applies to
 *                                current choice selection only.
 * 
 * <BgColor: x>                   Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to 'x' text color. This
 *                                will be combined with a fading
 * <BgColor: x,y>                 Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to 'x' to 'y' gradient
 *                                text color.
 * <BgColor: #rrggbb>             Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to '#rrggbb' color using
 *                                hex color values.
 * <BgColor: #rrggbb, #rrggbb>    Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to '#rrggbb' gradient
 *                                using hex color values.
 * 
 * <Help> text </Help>            Makes a help window appear and have it show
 *                                'text' in its contents. The help window will
 *                                disappear if no text is displayed.
 * 
 * <Shuffle>                      Shuffles the order of all choices. Any cancel
 *                                shortcuts other than "Branch" will be undone.
 * <Shuffle: x>                   Shuffles the order of all choices and only
 *                                x number of them will appear. Any cancel
 *                                shortcuts other than "Branch" will be undone.
 *                                Hidden choices do not count towards x number.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Background Effects (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * 
 * <BgImg: filename>              Creates a background image from img/pictures/
 *                                stretched across the choice rectangle.
 * <BgImg LowerLeft: filename>    Creates a background image from img/pictures/
 *                                scaled to the lower left of choice rect.
 * <BgImg LowerCenter: filename>  Creates a background image from img/pictures/
 *                                scaled to the lower center of choice rect.
 * <BgImg LowerRight: filename>   Creates a background image from img/pictures/
 *                                scaled to the lower right of choice rect.
 * <BgImg MidLeft: filename>      Creates a background image from img/pictures/
 *                                scaled to the middle left of choice rect.
 * <BgImg Center: filename>       Creates a background image from img/pictures/
 *                                scaled to the center of choice rect.
 * <BgImg MidRight: filename>     Creates a background image from img/pictures/
 *                                scaled to the middle right of choice rect.
 * <BgImg UpperLeft: filename>    Creates a background image from img/pictures/
 *                                scaled to the upper left of choice rect.
 * <BgImg UpperCenter: filename>  Creates a background image from img/pictures/
 *                                scaled to the upper center of choice rect.
 * <BgImg UpperRight: filename>   Creates a background image from img/pictures/
 *                                scaled to the upper right of choice rect.
 * 
 * *Note:* For the <BgImg: filename> text code variants, even if the background
 * image is smaller than the choice contents, it will overscale to match its
 * choice rectangle dimensions.
 * 
 * *Note:* Using a background image will clear the dimmed background rectangle
 * that is normally behind each selectable choice.
 * 
 * *Note:* Each choice can only have one background image but can use a
 * combination of one background and one foreground image.
 * 
 * *Note:* Images in the background will appear behind the select cursor.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Foreground Effects (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * 
 * <FgImg: filename>              Creates a foreground image from img/pictures/
 *                                stretched across the choice rectangle.
 * <FgImg LowerLeft: filename>    Creates a foreground image from img/pictures/
 *                                scaled to the lower left of choice rect.
 * <FgImg LowerCenter: filename>  Creates a foreground image from img/pictures/
 *                                scaled to the lower center of choice rect.
 * <FgImg LowerRight: filename>   Creates a foreground image from img/pictures/
 *                                scaled to the lower right of choice rect.
 * <FgImg MidLeft: filename>      Creates a foreground image from img/pictures/
 *                                scaled to the middle left of choice rect.
 * <FgImg Center: filename>       Creates a foreground image from img/pictures/
 *                                scaled to the center of choice rect.
 * <FgImg MidRight: filename>     Creates a foreground image from img/pictures/
 *                                scaled to the middle right of choice rect.
 * <FgImg UpperLeft: filename>    Creates a foreground image from img/pictures/
 *                                scaled to the upper left of choice rect.
 * <FgImg UpperCenter: filename>  Creates a foreground image from img/pictures/
 *                                scaled to the upper center of choice rect.
 * <FgImg UpperRight: filename>   Creates a foreground image from img/pictures/
 *                                scaled to the upper right of choice rect.
 * 
 * *Note:* For the <FgImg: filename> text code variants, unlike the background
 * variant, the foreground image will not overscale past its original size.
 * Instead, it will maintain its original size or be smaller, so long as it can
 * be scaled to exist within the choice rectangle unless it is intended to be
 * stretched by using the <FgImg: filename> variant.
 * 
 * *Note:* Text is then written on top of the foreground image.
 * 
 * *Note:* Each choice can only have one foreground image but can use a
 * combination of one background and one foreground image.
 * 
 * *Note:* Images in the foreground will appear behind the select cursor.
 *
 * ---
 *
 * -----------------  ---------------------------------------------------------
 * Text Code          Effect (Name Window Only)
 * -----------------  ---------------------------------------------------------
 * <Left>             Positions the name box window to the left.
 * <Center>           Positions the name box window to the center.
 * <Right>            Positions the name box window to the right.
 * <Position: x>      Replace 'x' with a number from 0 to 10. This positions
 *                    the name box window on the screen relative to the
 *                    position of the value 'x' represents.
 * \NormalBG          Changes background type of window to normal type.
 * \DimBG             Changes background type of window to dim type.
 * \TransparentBG     Changes background type of window to transparent type.
 *
 * ---
 * 
 * -------------------------------   ------------------------------------------
 * Text Code                         Effect (Message Window Only)
 * -------------------------------   ------------------------------------------
 * 
 * <Position: x, y, width, height>   Forces the message window to exact listed
 *                                   coordinates and dimensions. Replace each
 *                                   of the arguments with numbers. *Note*
 * 
 * <Coordinates: x, y>               Forces the message window to the exact
 *                                   listed coordinates. Replace each of the
 *                                   arguments with numbers. *Note*
 * 
 * <Dimensions: width, height>       Forces the message window size to the
 *                                   exact listed dimensions. Replace each of
 *                                   the arguments with numbers. *Note*
 * 
 * <Offset: +x, +y>                  Quickly adjust the message window offset
 * <Offset: -x, -y>                  values to the x and y amounts. The values
 * <Offset: +x, -y>                  will replace the previous offset settings
 * <Offset: -x, +y>                  if there were any.
 * 
 * *NOTE* These text codes do not work with Word Wrap.
 * 
 * ---
 * 
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Requires VisuMZ_0_CoreEngine)
 * ------------------   -------------------------------------------------------
 * <Up Button>          Display's VisuMZ_0_CoreEngine's button assist text.
 * <Left Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * <Right Button>       Display's VisuMZ_0_CoreEngine's button assist text.
 * <Down Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * <Ok Button>          Display's VisuMZ_0_CoreEngine's button assist text.
 * <Cancel Button>      Display's VisuMZ_0_CoreEngine's button assist text.
 * <Shift Button>       Display's VisuMZ_0_CoreEngine's button assist text.
 * <Menu Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * <Page Up Button>     Display's VisuMZ_0_CoreEngine's button assist text.
 * <Page Down Button>   Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * ---
 * 
 * === Random Text Pool ===
 * 
 * <RNG> text1 | text2 | text3 </RNG>
 * 
 * Using the above text code format in a Show Message entry, you can get a
 * random result out of the various inserted texts. Use "|" (without quotes) as
 * a separator between text entries. You can have unlimited entries. The result
 * will have any excess white space trimmed.
 * 
 * This text code cannot be inserted into a macro and parsed properly.
 * 
 * ---
 *
 * === Message Core Customizable Text Codes ===
 *
 * The following text codes can be altered through the Message Core's various
 * Plugin Parameters to adjust replacements and actions.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \Class[x]            Draws class x's icon (if have) and name.
 * \ClassName[x]        Draws class x's name only.
 *
 * \Skill[x]            Draws skill x's icon (if have) and name.
 * \SkillName[x]        Draws skill x's name only.
 *
 * \Item[x]             Draws item x's icon (if have) and name.
 * \ItemName[x]         Draws item x's name only.
 * \ItemQuantity[x]     Inserts the number of item x's owned by the party.
 *
 * \Weapon[x]           Draws weapon x's icon (if have) and name.
 * \WeaponName[x]       Draws weapon x's name only.
 * \WeaponQuantity[x]   Inserts the number of weapon x's owned by the party.
 *
 * \Armor[x]            Draws armor x's icon (if have) and name.
 * \ArmorName[x]        Draws armor x's name only.
 * \ArmorQuantity[x]    Inserts the number of armor x's owned by the party.
 *
 * \LastGainObj         Draws the icon + name of the last party-gained object.
 * \LastGainObjName     Draws the name of the last party-gained object.
 * \LastGainObjQuantity Inserts the quantity of the last party-gained object.
 *
 * \State[x]            Draws state x's icon (if have) and name.
 * \StateName[x]        Draws state x's name only.
 *
 * \Enemy[x]            Draws enemy x's icon (if have) and name.
 * \EnemyName[x]        Draws enemy x's name only.
 *
 * \Troop[x]            Draws troop x's icon (if have) and name.
 * \TroopName[x]        Draws troop x's name only.
 *
 * \TroopMember[x]      Draws troop member x's icon (if have) and name. *Note1*
 * \TroopNameMember[x]  Draws troop member x's name only. *Note1*
 * 
 * Note1: Only works in battle.
 *
 * \NormalBG            Changes background type of window to normal type.
 * \DimBG               Changes background type of window to dim type.
 * \TransparentBG       Changes background type of window to transparent type.
 *
 * \FontChange<x>       Changes font face to x font name.
 * \ResetFont           Resets font settings.
 *
 * \ResetColor          Resets color settings.
 * \HexColor<x>         Changes text color to x hex color (ie. #123abc).
 * \OutlineColor[x]     Changes outline color to text color x.
 * \OutlineHexColor<x>  Changes outline color to x hex color (ie. #123abc).
 * \OutlineWidth[x]     Changes outline width to x thickness.
 * 
 * \WindowMoveTo<?>     Moves window to exact coordinates. *Note2*
 * \WindowMoveBy<?>     Moves window by relative values. *Note2*
 * \WindowReset         Resets window position to original position.
 *
 * Note2: Replace '?' with the following format:
 *   targetX, targetY, targetWidth, targetHeight, duration, easingType
 *   Only targetX and targetY are required arguments. These will only alter the
 *   window dimensions when the text has arrived at that point. They will not
 *   alter the window preemptively. This is not used as a window positioner.
 *   Use the <Position: x, y, width, height> text code for that.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \ActorFace[x]        Inserts actor x's face into the Message Window.
 * \PartyFace[x]        Inserts party member x's face into the Message Window.
 * \ChangeFace<x,y>     Changes message face to x filename, y index.
 * \FaceIndex[x]        Changes message face index to x.
 *
 * \TextDelay[x]        Sets delay in frames between characters to x frames.
 * 
 * Note: These text codes only work with the Message Window. Keep in mind that
 *   even if some windows might look like the Message Window, it may not
 *   necessarily be one.
 * 
 * ---
 * 
 * As these text codes can be added, removed, and/or altered, their functions
 * may or may not be the same depending on how you've altered them. VisuStella
 * is not responsible for any errors caused by changes made to pre-made text
 * codes nor any new text codes they did not make.
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
 * === Message Plugin Commands ===
 * 
 * ---
 *
 * Message: Properties
 *   Change the various properties of the Message Window.
 *
 *   Rows:
 *   - Change the number of Message Window rows.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Width: 
 *   - Change the Message Window width in pixels.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Word Wrap:
 *   - Enable or disable Word Wrap for the Message Window?
 *
 * ---
 * 
 * Message: X/Y Offsets
 * - Change the X and Y Offsets of the Message Window.
 * - The offset value(s) will be saved and stored.
 * 
 *   Offset X:
 *   - Offset Message Window horizontally.
 *   - Negative: Left; Positive: Right
 *   - Message Window coordinates are still restricted via clamping.
 * 
 *   Offset Y:
 *   - Offset Message Window vertically.
 *   - Negative: Up; Positive: Down
 *   - Message Window coordinates are still restricted via clamping.
 * 
 * ---
 * 
 * === Choice Plugin Commands ===
 * 
 * ---
 * 
 * Choices: Distance
 * - Change the distance from choice window to the message window.
 * 
 *   Distance:
 *   - Change distance between the choice and message windows.
 *   - Default distance is 0.
 *   - Use negative to center align with remaining space.
 * 
 * ---
 *
 * Choices: Properties
 * - Change the properties found in the Show Choices event command.
 *
 *   Line Height:
 *   - Change the line height for the show choices.
 *   - Leave at 0 to keep this unchanged.
 * 
 *   Minimum Choice Width:
 *   - What is the minimum width size for each choice?
 *   - 96 is the default width.
 *
 *   Max Rows:
 *   - Maximum number of choice rows to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Columns:
 *   - Maximum number of choice columns to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Text Alignment:
 *   - Text alignment for Show Choice window.
 *
 * ---
 * 
 * === Select Plugin Commands ===
 * 
 * ---
 * 
 * Select: Weapon
 * - Opens the Event Select Item Window to let the player pick a weapon to
 *   choose from.
 * - Can be opened while the Message Window is open.
 * 
 *   Variable ID:
 *   - This variable will be used to record the ID of the selected weapon.
 *   - It will result in 0 otherwise.
 * 
 *   Weapon Type ID:
 *   - Reduce all the weapons to a specific weapon type.
 *   - Leave at 0 to not use filters.
 * 
 * ---
 * 
 * Select: Armor
 * - Opens the Event Select Item Window to let the player pick an armor to
 *   choose from.
 * - Can be opened while the Message Window is open.
 * 
 *   Variable ID:
 *   - This variable will be used to record the ID of the selected armor.
 *   - It will result in 0 otherwise.
 * 
 *   Armor Type ID:
 *   - Reduce all the armors to a specific armor type.
 *   - Leave at 0 to not use filters.
 * 
 *   Equip Type ID:
 *   - Reduce all the armors to a specific equip type.
 *   - Leave at 0 to not use filters.
 * 
 * ---
 * 
 * Select: Skill
 * - Opens the Event Select Item Window to let the player pick a skill to
 *   choose from.
 * - Requires VisuMZ_1_SkillsStatesCore!
 * - Can be opened while the Message Window is open.
 * - Skills will not be listed if they are hidden by the actor.
 * - Skills will not be listed if the actor lacks access to their Skill Type.
 * 
 *   Variable ID:
 *   - This variable will be used to record the ID of the selected skill.
 *   - It will result in 0 otherwise.
 * 
 *   Actor ID:
 *   - Select an actor to get the skill list from.
 *   - Use 0 to select from the party leader.
 * 
 *   Skill Type ID:
 *   - Reduce all the skills to a specific skill type.
 *   - Leave at 0 to not use filters.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Change Text
 * - Change text for target picture(s) to show.
 * - You may use text codes.
 * - Text will adapt to picture's properties.
 * - Settings will be erased if picture is erased.
 * 
 *   Picture ID(s):
 *   - The ID(s) of the picture(s) to set text to.
 * 
 *   Padding:
 *   - How much padding from the sides should there be?
 * 
 *   Text:
 * 
 *     Upper Left:
 *     Upper Center:
 *     Upper Right:
 *     Middle Left:
 *     Middle Center:
 *     Middle Right:
 *     Lower Left:
 *     Lower Center:
 *     Lower Right:
 *     - The text that's aligned to this picture's side.
 *     - You may use text codes.
 * 
 * ---
 * 
 * Picture: Erase Text
 * - Erase all text for target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID(s) of the picture(s) to erase text for.
 * 
 * ---
 * 
 * Picture: Refresh Text
 * - Refreshes the text used for all on-screen pictures.
 * - To be used if any dynamic text codes are updated like \n[x].
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings involving the message system. These settings range from
 * adjust how the Message Window looks to more intricate settings like how
 * some of the default text codes work.
 *
 * ---
 *
 * Message Window
 *
 *   Default Rows:
 *   - Default number of rows to display for the Message Window.
 *
 *   Default Width:
 *   - Default Message Window width in pixels.
 *
 *   Fast Forward Key:
 *   - This is the key used for fast forwarding messages.
 *   - WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 *
 *   Text Delay:
 *   - How many frames to wait between characters drawn?
 *   - Use 0 for instant.
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset Message Window horizontally or vertically.
 *   - Horizontal: Left; Positive: Right
 *   - Veritcal: Negative: Up; Positive: Down
 * 
 *   Stretch Dimmed BG:
 *   - Stretch dimmed window background to fit the whole screen.
 * 
 *   Default Outline Width:
 *   - Changes the default outline width to this many pixels thick.
 * 
 *   Each Message Start:
 *   Each Message End:
 *   - This is text that is added at the start/end of each message.
 *   - You may use text codes.
 *   - Keep in mind that if a message extends to a different page (due to word
 *     wrap, excess lines, etc), that does not mean the starting text will
 *     be added to where the next page begins or the ending text will be added
 *     where the previous page ends.
 *   - Can be used for things like adding "<center>" to the start of each 
 *     message without having to type it every time.
 *
 * ---
 *
 * Name Box Window
 *
 *   Default Color:
 *   - Default color for the Name Box Window's text.
 *
 *   Offset X:
 *   - How much to offset the name box window X by
 *     (as long as it doesn't go offscreen).
 *
 *   Offset Y:
 *   - How much to offset the name box window Y by
 *     (as long as it doesn't go offscreen).
 *
 * ---
 *
 * Choice List Window
 *
 *   Line Height:
 *   - What is the default line height for Show Choices?
 * 
 *   Minimum Choice Width:
 *   - What is the minimum choice width for each choice?
 *   - 96 is the default width.
 *
 *   Max Rows:
 *   - Maximum number of rows to visibly display?
 *
 *   Max Columns:
 *   - Maximum number of columns to visibly display?
 *
 *   Text Alignment:
 *   - Default alignment for Show Choice window.
 *
 * ---
 *
 * Default Text Codes
 *
 *   Relative \PX \PY:
 *   - Make \PX[x] and \PY[x] adjust relative starting position than
 *     exact coordinates.
 *
 *   \{ Maximum:
 *   - Determine the maximum size that \{ can reach.
 *
 *   \} Minimum:
 *   - Determine the minimum size that \} can reach.
 *
 *   \{ Change \}
 *   - How much does \{ and \} change font size by?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Color Settings
 * ============================================================================
 *
 * For certain windows such as the Message Window, Help Window, and Choice
 * Window, Auto-Color is enabled to automatically highlight and color certain
 * database entries, keywords, and just about anything you, the game dev, wants
 * to be automatically colored. This is done to avoid typing out \C[6]Jack\C[0]
 * every time Jack's name is written out as it will be automatically colored in
 * those specific windows.
 *
 * The Plugin Parameters will give you full reign over which database entries
 * and keywords you want to be automatically colored as long as they follow a
 * few rules:
 * 
 * -----------------
 * Auto-Color Rules:
 * -----------------
 *
 * 1. Database names and keywords are case sensitive.
 *    This means if "Potion" is a marked keyword, typing out "potion" will not
 *    prompt the auto-color to highlight "potion". You must add the lowercase
 *    version of the word into the keyword list if you want it to count.
 *
 * 2. Database names and keywords are exact size (for Roman languages)
 *    This means if "Potion" is a marked keyword, typing out "potions" will not
 *    prompt the auto-color to highlight "potions". You must type out all of
 *    the variations of the words you want affected into the keyword list to
 *    prompt the auto-color highlight.
 * 
 *    This does not apply to Japanese, Korean, or Chinese languages.
 *
 * 3. Possessive cases and other language symbols aren't counted.
 *    Symbols such as periods, commas, quotes, parentheses, and similar symbols
 *    do no count towards Rule 2. This means if "Potion" is a marked keyword,
 *    the typing out "(Potion)" will still highlight the "Potion" part of the
 *    word according to the auto-color.
 * 
 * 4. Names with special characters like !, ?, [, ], etc. will be ignored.
 *    These cause conflicts with how auto-colors are detected.
 *
 * ---
 *
 * Database Highlighting
 *
 *   Actors:
 *   Classes:
 *   Skills:
 *   Items:
 *   Weapons:
 *   Armors:
 *   Enemies:
 *   States:
 *   - Any usage of a the selected database entry's name is auto-colored with
 *     the text code number.
 *   - Use 0 to not auto-color.
 *
 * ---
 *
 * Word Highlighting
 *
 *   \C[x]: Color
 *   - These are lists of all the words that will be automatically colored with
 *     the x text color.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Font Manager
 * ============================================================================
 *
 * Custom fonts that aren't the message or number fonts cannot be used without
 * registration. If you try to use custom fonts in RPG Maker MZ without
 * registering their font family first, you will find out that they will not
 * work. These plugin parameters allow you to register your game's custom fonts
 * here.
 * 
 * ---
 * 
 * Settings:
 * 
 *   Font Family:
 *   - This will be what's used by RPG Maker MZ and plugins to reference this
 *     specific font.
 *   - NO filename extensions!
 * 
 *   Filename:
 *   - What is the filename of the custom font you would like to use?
 *   - Located inside the project's "fonts" folder.
 * 
 * ---
 * 
 * Examples:
 * 
 *   Font Family: WildWords
 *   Filename: WildWords-Regular.ttf
 * 
 * How you would use this in other plugins as a preface to the font face or
 * font family would be to use "WildWords" as the font face/family name. Then
 * RPG Maker MZ will use its own innate FontManager to refer that to the
 * "WildWords-Regular.ttf" file found in the game's "fonts" folder.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Actions
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * performing actions. These actions can be done through each JavaScript or by
 * a common event (if it is used in the Message Window). Adequate knowledge of
 * both is recommended before attempting to modify and/or add new Text Code
 * Actions to the Plugin Parameters.
 *
 * Each of the Text Code Actions are formatted in such a way:
 *
 * ---
 *
 * Text Code Action
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   Common Event:
 *   - Select a common event to run when this text code is used in a message.
 *
 *   JS: Action:
 *   - JavaScript code used to perform an action when this text code appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Replacements
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * replacing the text codes with text data. Text data can be replaced with
 * an exact exchange of text or dynamically through JavaScript. Adding a new
 * Text Code Replacement is done through the Plugin Parameters.
 *
 * Each of the Text Code Replacements are formatted in such a way:
 *
 * ---
 *
 * Text Code Replacement
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   STR: Text:
 *   - The text that will appear if this match appears.
 *     If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     match appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Macros
 * ============================================================================
 *
 * Text macros are used in similar fashion to text codes replacements to
 * replace themselves with text data. The primary difference is that macros are
 * made in a different format with no conditional argument modifiers (ie the
 * [x] that follows a text code).
 *
 * To use a text macro, type in the matching keyword between two [brackets] and
 * it will be replaced by the string data or run the JavaScript code found in
 * the Plugin Parameter settings.
 *
 * For example, if you have the text macro "Leader", made to return the party
 * leader's name, you can type in [Leader] in the Message Window and it will be
 * replaced with the party leader's name. The output can also output text codes
 * into the resulting text.
 * 
 * This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 * Use the method stated before with the brackets to [MacroName] instead.
 *
 * Each of the Text Macros are formatted in such a way:
 *
 * ---
 *
 * Text Macro
 *
 *   Match:
 *   - This is what needs to be matched in order for this macro to work.
 *   - In [Leader], this would be the 'Leader' text.
 *
 *   STR: Text:
 *   - The replacement text that will appear from the macro.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     macro appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Language Settings
 * ============================================================================
 *
 * The "Text Language" feature allows your players to switch between different
 * languages for your game to allow people from around the globe to enjoy what
 * story you have to tell.
 * 
 * Disclaimers: This is not an automatic translation tool. Translations made
 * through the "Text Language" feature of the VisuStella MZ Message Core
 * will require manual input by the game developer.
 * 
 * See the "Text Language Information" for more information.
 *
 * ---
 * 
 * Main Settings:
 * 
 *   Enable Switching?:
 *   - Enable language switching settings for this plugin?
 * 
 *   File Type:
 *   - Which file type do you wish to use?
 *     - CSV (Legacy)
 *     - TSV (Recommended)
 * 
 *   CSV Filename:
 *   - What is the filename of the CSV file to read from?
 *   - Located within the project's /data/ folder.
 * 
 *   TSV Filename:
 *   - What is the filename of the TSV file to read from?
 *   - Located within the project's /data/ folder.
 * 
 * ---
 * 
 * Options:
 * 
 *   Add Option?:
 *   - Add the 'Text Language' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
 *   - Command name of the option.
 * 
 * ---
 * 
 * Languages:
 * 
 *   Default Language:
 *   - What is the default language used for this game?
 * 
 *   Supported Languages:
 *   - What are all the supported languages supported by this game's
 *     script?
 *   - Remove any that aren't translated.
 * 
 * ---
 * 
 * Language Names:
 * 
 *   Bengali:
 *   Chinese (Simplified):
 *   Chinese (Traditional):
 *   Czech:
 *   Danish:
 *   Dutch:
 *   English:
 *   Finnish:
 *   French:
 *   German:
 *   Greek:
 *   Hindi:
 *   Hungarian:
 *   Indonesian:
 *   Italian:
 *   Japanese:
 *   Korean:
 *   Norwegian:
 *   Polish:
 *   Portuguese:
 *   Romanian:
 *   Russian:
 *   Slovak:
 *   Spanish:
 *   Swedish:
 *   Tamil:
 *   Thai:
 *   Turkish:
 *   - How does this language appear in the in-game options?
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Language Fonts
 * ============================================================================
 *
 * Different default fonts used for different languages. This allows different
 * stylistic choices to be made for different languages in case the current
 * font you're using doesn't have support for other language types.
 * 
 * Keep in mind that players can override this with Options Core if they select
 * a text option other than 'Default' for the 'Text Font' option.
 * 
 * Make sure any new custom fonts used for different languages are registered
 * with the 'Custom Font Manager' found in this plugin's Plugin Parameters.
 *
 * ---
 * 
 * Languages:
 * 
 *   Bengali:
 *   Chinese (Simplified):
 *   Chinese (Traditional):
 *   Czech:
 *   Danish:
 *   Dutch:
 *   English:
 *   Finnish:
 *   French:
 *   German:
 *   Greek:
 *   Hindi:
 *   Hungarian:
 *   Indonesian:
 *   Italian:
 *   Japanese:
 *   Korean:
 *   Norwegian:
 *   Polish:
 *   Portuguese:
 *   Romanian:
 *   Russian:
 *   Slovak:
 *   Spanish:
 *   Swedish:
 *   Tamil:
 *   Thai:
 *   Turkish:
 *   - What font face is used for this language?
 *   - Make sure it is registered under Custom Font Manager.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Language Images
 * ============================================================================
 *
 * Allows different images to be used when different languages are used. This
 * is for images that have text on it that you want to appear in different
 * languages based on the text language selected by the player.
 * 
 * There are two ways this works:
 * 
 *   #1: Folder Name
 *   - The name of the folder containing those images will be named something
 *     like "Scrolls[XX]"
 *   - When a different language is picked, like English, it can reference
 *     the 'Scrolls[EN]' folder instead. If Japanese is used, it can refer to
 *     the 'Scrolls[JP]' folder as well.
 *   - The text used to replace the [XX] in the folder name can be determined
 *     in the Plugin Parameters.
 *     - Make sure you change the settings for each language you wish to use to
 *       have translated images for.
 * 
 *   #2: Filename
 *   - The filename of the image to be translated can be named something like
 *     ReidProfile[XX].png
 *   - When a different language is picked, like English, it will reference the
 *     'ReidProfile[EN].png' image instead. For Japanese, it will reference the
 *     'ReidProfile[JP].png' as well.
 *   - The text used to replace the [XX] in the filename can be determined in
 *     the Plugin Parameters.
 *     - Make sure you change the settings for each language you wish to use to
 *       have translated images for.
 *
 * ---
 * 
 * Settings
 * 
 *   Convert Default?
 *   - ON: Default language uses converted marker.
 *   - OFF: Default languages uses [XX] as marker.
 * 
 * Here's an explanation of what this does:
 * 
 *   - The default language picked is English and the player has English picked
 *     as their desired language.
 *   - If the "Convert Default?" Plugin Parameter is ON, then 'ReidProfile[XX]'
 *     will reference and look for the 'ReidProfile[EN]' image.
 *   - If the "Convert Default?" Plugin Parameter is OFF, 'ReidProfile[XX]' is
 *     then used for the English language instead of 'ReidProfile[EN]'.
 *     - This is to avoid duplicate images and save on file space.
 *   - The reasoning behind the [XX] is that there needs to be an anchor image
 *     used for the RPG Maker MZ client in order to have something to reference
 *     before branching out to different languages.
 * 
 * ---
 * 
 * Languages 
 * 
 *   Bengali:
 *   Chinese (Simplified):
 *   Chinese (Traditional):
 *   Czech:
 *   Danish:
 *   Dutch:
 *   English:
 *   Finnish:
 *   French:
 *   German:
 *   Greek:
 *   Hindi:
 *   Hungarian:
 *   Indonesian:
 *   Italian:
 *   Japanese:
 *   Korean:
 *   Norwegian:
 *   Polish:
 *   Portuguese:
 *   Romanian:
 *   Russian:
 *   Slovak:
 *   Spanish:
 *   Swedish:
 *   Tamil:
 *   Thai:
 *   Turkish:
 *   - This text will replace [XX] with in image folder names and filenames
 *     when this language is selected.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Speed Option Settings
 * ============================================================================
 *
 * Modern RPG's on the market have the option to adjust the message speed rate
 * for players. These Plugin Parameters allow you to add that option to the
 * Options Menu as well.
 *
 * ---
 *
 * Text Speed Option Settings
 *
 *   Add Option?:
 *   - Add the 'Text Speed' option to the Options menu?
 *
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - 1 - 10, slowest to fastest.
 *   - 11 is instant value.
 *
 *   Instant Speed:
 *   - Text to show "instant" text.
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Word Wrap Settings
 * ============================================================================
 *
 * Word wrap is a property that will cause any overflowing text to wrap around
 * and move into the next line. This property can only be enabled inside text
 * that accept text codes, such as the Message Window and Help Window. However,
 * word wrap is disabled for the Choice Window due to the nature of the Choice
 * Window's base properties.
 *
 * Word wrap can be enabled or disabled in three ways. One is by using the text
 * code <WordWrap> to enable it or </WordWrap> to disable it. The second method
 * is by enabling it with the Plugin Command: 'Message: Properties'. The third
 * method is by enabling it by default with the Plugin Parameters.
 * 
 * Word wrap only supports left-to-right alphabetical languages that utilize
 * spaces.
 * 
 * Word Wrap also cannot be used together with <left>, <center>, or <right> and
 * will disable itself if text alignment text codes are detected.
 * 
 * As of the v1.44 update, some Asian languages such as Chinese and Japanese
 * are now supported for word wrap. Korean language is only supported if spaces
 * are used.
 * 
 * ---
 *
 * Enable Word Wrap
 *
 *   Message Window:
 *   - Automatically enable Word Wrap for this window?
 *
 *   Help Window:
 *   - Automatically enable Word Wrap for this window?
 *
 * ---
 *
 * Rules
 *
 *   Link Break -> Space:
 *   - Convert manually placed (non tagged) line breaks with spaces?
 *   - Line breaks must be inserted using the <br> text code.
 *
 *   Tight Wrap:
 *   - If a face graphic is present in a message, word wrap will be tighter.
 * 
 *   End Padding:
 *   - Add extra padding to your window to make text wrap further away from the
 *     end of the window.
 *   - This will default to 0.
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
 * Version 1.53: February 20, 2025, 2025
 * * Bug Fixes!
 * ** Fixed an error with text language translations not working properly for
 *    the last listed language in the translation sheet. Fix made by Irina.
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Removed picture limit of 100 from Picture-related Plugin Commands.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Text Language Information section included for TSV.
 * ** Updated text code note for \picture<x> and \CenterPicture<x>
 * *** As of the version 1.53 update, the Help Window now supports both of
 *     these text codes. However, we still recommend using icons over using
 *     pictures as there will be loading delays.
 * * Plugin Parameters
 * ** New plugin parameters added by Irina:
 * *** Parameters > Text Language Settings > File Type:
 * **** Which file type do you wish to use?
 * ***** CSV (Legacy)
 * ***** TSV (Recommended)
 * *** Parameters > Text Language Settings > TSV Filename
 * **** What is the filename of the TSV file to read from?
 * **** Located within the project's /data/ folder.
 * * Feature Updates!
 * ** We have done our research and decided that CSV's are too restricted to
 *    use due to their default nature of wanting to use commas as separators.
 *    Thus, we've decided to switch to TSV where the default separator is a tab
 *    space, something that is almost never used in RPG Maker text.
 * ** CSV support will remain as a legacy option but TSV will be recommended as
 *    the main text languaging switching filetype.
 * ** When creating a new Language TSV, the plugin will check if a Language CSV
 *    exists and asks you if you wish to convert the existing CSV to TSV. The
 *    original CSV file will remain intact as a backup.
 * 
 * Version 1.52: December 19, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Text Codes added by Arisu:
 * *** <left>
 * *** <center>
 * *** <right>
 * **** When used in the Map Name, instead of aligning the text which is
 *      centered by default, the text code will align the horizontal position
 *      of the name displayed on the screen.
 * *** <top>
 * *** <middle>
 * *** <bottom>
 * **** When used in the Map Name, the text code will align the vertical
 *      position of the name displayed on the screen.
 * *** <X: +n>
 * *** <X: -n>
 * *** <Y: +n>
 * *** <Y: -n>
 * **** Adjusts the horizontal/vertical position of map name by 'n' value.
 * *** All of these text codes require VisuMZ_0_CoreEngine installed and its
 *     "Map Name Text Code" plugin parameter enabled.
 * 
 * Version 1.51: October 17, 2024
 * * Bug Fixes!
 * ** Fixed a bug where \LastGainObj text code did not work with text language
 *    key codes. Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added note to Text Language Information > How to Enable Switching
 * *** IMPORTANT! The separator used for the CSV file must be a semicolon (;)
 *     and not a comma (,) as to reduce the amount of punctuation conflicts.
 *     Keep this in mind as most CSV editors will default to comma (,) instead
 *     of the semicolon (;) for their separator.
 * ** Added note to Text Language Information > Naming Weapon Types, etc:
 * *** You might have noticed that if you've decided to use \tl{keyName} for
 *     weapon or other database types, other parts of the game will error out.
 *     Don't worry, for these, you don't have to change the currently used
 *     database name. Go straight to the CSV and insert in a new key for that
 *     particular database name. For example, the equip type "Accessory" will
 *     use "Accessory" as the automatic key to look for a translated phrase. If
 *     there isn't any in the CSV file, then the default database text entry
 *     will be used.
 * * New Features!
 * ** New Plugin Parameters added by Irina:
 * *** Parameters > Text Language Settings > Language Fonts
 * **** Different default fonts used for different languages. This allows
 *      different stylistic choices to be made for different languages in case
 *      the current font you're using doesn't have support for other language
 *      types.
 * **** Keep in mind that players can override this with Options Core if they
 *      select a text option other than 'Default' for the 'Text Font' option.
 * **** Make sure any new custom fonts used for different languages are
 *      registered with the 'Custom Font Manager' found in this plugin's Plugin
 *      Parameters.
 * *** Parameters > Text Language Settings > Language Images
 * **** Allows different images to be used when different languages are used.
 *      This is for images that have text on it that you want to appear in
 *      different languages based on the text language selected by the player.
 * 
 * Version 1.50: July 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New text codes added by Irina:
 * *** <Caps> </Caps>
 * *** <Upper> </Upper>
 * *** <Lower> </Lower>
 * **** Auto-text case textcodes will automatically adjust text inserted
 *      between them to respectively be completely capitalized, first-letter
 *      capitalized, or completely lowercase.
 * **** More information in the help file.
 * *** <Alt> </Alt>
 * **** Alternates between uppercase and lowercase for letters.
 * *** <Chaos> </Chaos>
 * **** Randomly uses uppercase and lowercase for letters.
 * 
 * 
 * Version 1.49: May 16, 2024
 * * Bug Fixes!
 * ** Fixed a problem where using text codes to get database object names did
 *    not apply translated text.
 * * Documentation Update!
 * ** Added note for Message Window Only text code effects:
 * *** These text codes only work with the Message Window. Keep in mind that
 *     even if some windows might look like the Message Window, it may not
 *     necessarily be one.
 * * Feature Update!
 * ** Added a failsafe for when Choice List Window doesn't have any viable
 *    options (due to being hidden or disabled). Update made by Irina.
 * ** Added a failsafe for Language CSV when empty rows are added.
 * ** Updated some default Text Code actions in order to make sure they're only
 *    used by the Message Window and not anything else. Update made by Irina.
 * 
 * Version 1.48: April 18, 2024
 * * Bug Fixes!
 * ** Added fail safe for help description checks parsing from objects without
 *    help descriptions normally. Fix made by Irina.
 * 
 * Version 1.47: February 15, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > Custom Font Manager
 * **** Register custom fonts here.
 * **** Custom fonts that aren't the message or number fonts cannot be used
 *      without registration.
 * **** See help file for more information.
 * 
 * Version 1.46: January 18, 2024
 * * Bug Fixes!
 * ** Fixed a bug where script calls used to create message choices would not
 *    work properly. Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Text Language Switching added by Irina:
 * *** Plugin Parameters > Text Language Settings
 * **** The "Text Language" feature allows your players to switch between
 *      different languages for your game to allow people from around the globe
 *      to enjoy what story you have to tell.
 * **** Disclaimers: This is not an automatic translation tool. Translations
 *      made through the "Text Language" feature of the VisuStella MZ Message
 *      Core will require manual input by the game developer.
 * **** Read more about it in detail within the "Text Language Information"
 *      section in the help file.
 * ** New Plugin Parameter added by Irina:
 * *** Choices: Distance
 * **** Change the distance from choice window to the message window.
 * ** New parameter added to Plugin Command "Choices: Properties" by Irina:
 * *** Minimum Choice Width
 * **** What is the minimum width size for each choice?
 * ** New Plugin Parameter for "Message Window" added by Irina:
 * *** Parameters > Message Window: Choice List Window> Minimum Choice Width
 * **** What is the minimum width size for each choice?
 * ** New Text Codes for Choice Window added by Irina:
 * *** <BgImg: filename> and variants
 * *** <FgImg: filename> and variants
 * **** These text codes allow adding a background or foreground image to a
 *      choice rectangle in stretched/scaled size.
 * 
 * Version 1.45: December 14, 2023
 * * Bug Fixes!
 * ** Punctuation was, for some reason, excluded when using Wordwrap with
 *    Japanese and Chinese languages. This should be fixed now. Fixed by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added clarity to the <left>, <center>, and <right> being unable to be
 *    used together with word wrap.
 * *** Word Wrap also cannot be used together with <left>, <center>, or <right>
 *     and will disable itself if text alignment text codes are detected.
 * * Feature Update!
 * ** Wordwrap <br> now works properly with Japanese and Chinese languages.
 * * New Features!
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > General Settings > Each Message Start
 * *** Plugin Parameters > General Settings > Each Message End
 * **** This is text that is added at the start/end of each message.
 * **** Keep in mind that if a message extends to a different page (due to word
 *      wrap, excess lines, etc), that does not mean the starting text will
 *      be added to where the next page begins or the ending text will be added
 *      where the previous page ends.
 * **** Can be used for things like adding "<center>" to the start of each 
 *      message without having to type it every time.
 * 
 * Version 1.44: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated "Plugin Parameters: Word Wrap Settings" section:
 * *** As of the v1.44 update, some Asian languages such as Chinese and
 *     Japanese are now supported for word wrap. Korean language is only
 *     supported if spaces are used.
 * * Feature Update!
 * ** Word Wrap is now supported for Japanese and Chinese languages.
 * ** Feature updated by Irina and sponsored by AndyL.
 * * New Features!
 * ** New text codes added by Irina for "Show Choices" event command.
 * *** <Shuffle>
 * **** Shuffles the order of all choices. Any cancel shortcuts other than
 *      "Branch" will be undone.
 * *** <Shuffle: x>
 * **** Shuffles the order of all choices and only x number of them appear. Any
 *      cancel shortcuts other than "Branch" will be undone. Hidden choices do
 *      not count towards x number.
 * 
 * Version 1.43: April 13, 2023
 * * Compatibility Update!
 * ** Fixed incompatibilities with auto message positioning with the Map Zoom
 *    plugin. Update made by Irina.
 * 
 * Version 1.42: March 16, 2023
 * * Bug Fixes!
 * ** Fixed some text codes that would capture way too much data than intended.
 *    Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New text code added by Irina for Show Choice Window only:
 * *** <Help> text </Help>
 * **** Makes a help window appear and have it show 'text' in its contents.
 * **** The help window will disappear if no text is displayed.
 * ** New Plugin Commands added by Arisu:
 * *** Select: Weapon
 * *** Select: Armor
 * *** Select: Skill
 * **** Opens the Event Select Item Window to let the player pick a weapon,
 *      armor, or skill to choose from. The selected object will have its ID
 *      recorded in a variable. These can be opened while the Message Window is
 *      opened just like the event "Select Item".
 * 
 * Version 1.41: December 15, 2022
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New text codes added by Irina!
 * *** For the Choice Window Only text codes:
 * **** <BgColor: x>
 * **** <BgColor: x, y>
 * **** <BgColor: #rrggbb>
 * **** <BgColor: #rrggbb, #rrggbb>
 * ***** Requires VisuMZ_0_CoreEngine! Sets the background color of this choice
 *       to 'x' text color, 'x' to 'y' gradient text color, or using '#rrggbb'
 *       hex color values.
 * 
 * Version 1.40: November 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New text code added by Irina:
 * *** <RNG> text1 | text2 | text3 </RNG>
 * **** Using the above text code format in a Show Message entry, you can get a
 *      random result out of the various inserted texts. Use "|" (without
 *      quotes) as a separator between text entries. You can have unlimited
 *      entries. The result will have any excess white space trimmed.
 * **** This text code cannot be inserted into a macro and parsed properly.
 * 
 * Version 1.39: September 22, 2022
 * * Bug Fixes!
 * ** Macros now support quotes (' and ") in the STR: Text. Fix made by Irina.
 * 
 * Version 1.38: July 21, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.37: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Picture texts with \v[x] text codes are now updated automatically.
 * ** This is the only dynamic text code that updates this way for optimization
 *    purposes and to prevent overabundant CPU usage.
 * ** Everything else will require the new Plugin Command.
 * * New Features!
 * ** New Plugin Command added by Irina:
 * *** Picture: Refresh Text
 * **** Refreshes the text used for all on-screen pictures.
 * **** To be used if any dynamic text codes are updated like \n[x].
 * * New Features!
 * ** New text codes added by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** <Up Button>, <Left Button>, <Right Button>, <Down Button>
 * *** <Ok Button>, <Cancel Button>, <Shift Button>, <Menu Button>
 * *** <Page Up Button>, <Page Down Button>
 * **** Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * Version 1.36: April 7, 2022
 * * Feature Update!
 * ** Auto size related text codes should now automatically disable word wrap
 *    effects as they should have before. Update made by Irina.
 * 
 * Version 1.35: March 31, 2022
 * * Bug Fixes!
 * ** Bug fixed where if autosizing is used and it goes from a message that is
 *    shorter to longer, an extra key press is needed. This should no longer be
 *    the case. Fix made by Irina.
 * 
 * Version 1.34: February 24, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Choice Window Text Codes made by Irina and sponsored by AndyL:
 * *** <Choice Width: x>
 * **** Sets the minimum text area width to x. Applies to whole choice window.
 * *** <Choice Indent: x>
 * **** Sets the indent to x value. Applies to current choice selection only.
 * 
 * Version 1.33: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Picture: Change Text
 * **** This new plugin command allows you to place text on top of pictures
 *      (usually in the form of empty pages or cards) to function as stationary
 *      or other uses. Text codes are allowed.
 * **** Text codes are supported.
 * *** Picture: Erase Text
 * **** Removes text from target picture(s).
 * 
 * Version 1.32: January 20, 2022
 * * Bug Fixes!
 * ** Extra Show Choice notetags will now be properly hidden. Fix by Irina.
 * * Compatibility Update!
 * ** Self Switches are now made compatible with work with Show Choices. Update
 *    made by Irina.
 * 
 * Version 1.31: December 9, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New hard-coded message-only text code added by Irina:
 * *** <Next Page>
 * **** Ends the current message page at this line. This is used for messages
 *      when rows are at 5 or above and the message lines don't match the
 *      amount. This is used to prevent grabbing message windows from following
 *      message events. Any lines following <Next Page> in the same message
 *      event will be ignored.
 * 
 * Version 1.30: November 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for removed "Center Window X" bit.
 * * Feature Update!
 * ** Message: Properties now has "Center Window X?" removed
 * *** Changes will now be automatically centered.
 * *** This change is made for the new Plugin Command added for offsets which
 *     more or less replaces them.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Puddor:
 * *** Message: X/Y Offsets
 * **** Change the X and Y Offsets of the Message Window.
 * **** The offset value(s) will be saved and stored.
 * ** New Plugin Parameters added by Irina and sponsored by Puddor:
 * *** Plugin Parameters > General Settings > Message Window > Offset X
 * *** Plugin Parameters > General Settings > Message Window > Offset Y
 * **** Allows you to offset the horizontal and/or vertical positions of the
 *      message window accordingly.
 * ** New Text Codes added by Irina and sponsored by Puddor:
 * *** <Offset: +x, +y>
 * *** <Offset: -x, -y>
 * *** <Offset: +x, -y>
 * *** <Offset: -x, +y>
 * **** Quickly adjust the message window offset values to the x and y amounts.
 *      The values will replace the previous offset settings if there were any.
 * 
 * Version 1.29: October 21, 2021
 * * Feature Update
 * ** Word Wrap flags are now properly adjusted when converting macros and
 *    adding bypasses towards regular messages. Update by Irina.
 * 
 * Version 1.28: October 14, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.27: October 7, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** Macros should now work properly with any \x<n> based text codes.
 *    Fix made by Irina.
 * 
 * Version 1.25: August 27, 2021
 * * Feature Update!
 * ** Macros should now work with the <WordWrap> text code. Update by Irina.
 * 
 * Version 1.24: August 20, 2021
 * * Feature Update!
 * ** Macros should now work with window placement and resize options.
 *    Update made by Irina.
 * ** Macros should now work with choice-related enable and visibility options.
 *    Update made by Irina.
 * 
 * Version 1.23: July 16, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Word Wrap Settings > End Padding
 * **** Add extra padding to your window to make text wrap further away from
 *      the end of the window. This will default to 0.
 * 
 * Version 1.22: July 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Text Codes added by Irina and sponsored by AndyL:
 * *** <Current Battle Target>
 * *** <Current Battle User>
 * **** Replaces the text code with the current target or current user's name
 *      in-battle. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * *** <Current Battle Action>
 * *** <Current Battle Action Name>
 * **** Replaces the text code with the current battle action's name with the
 *      icon or without it respectively. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * 
 * Version 1.21: June 4, 2021
 * * Documentation Update!
 * ** Added extra note to the new <Position: x, y, width, height> text codes
 *    that they do not work with Word Wrap.
 * * Feature Update!
 * ** Added fail safe for preventing Common Events that don't exist from being
 *    ran at all by the Message Window. Added by Arisu.
 * 
 * Version 1.20: May 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added additional clarity for \WindowMoveTo<?> and \WindowMoveBy<?> and
 *    \WindowReset text codes with "Note 2".
 * *** Replace '?' with the following format: targetX, targetY, targetWidth,
 *     targetHeight, duration, easingType. Only targetX and targetY are
 *     required arguments. These will only alter the window dimensions when the
 *     text has arrived at that point. They will not alter the window
 *     preemptively. This is not used as a window positioner. Use the
 *     <Position: x, y, width, height> text code for that.
 * * New Features!
 * ** New hard-coded text codes added for Message Window Only. Added by Irina.
 * *** <Position: x, y, width, height>
 * *** <Coordinates: x, y>
 * *** <Dimensions: width, height>
 * 
 * Version 1.19: May 14, 2021
 * * Feature Updates!
 * ** <br> line breaks can now be used by Show Choices. Make sure that there is
 *    enough room to contain the text through Plugin Commands. Update by Irina.
 * 
 * Version 1.18: April 30, 2021
 * * Bug Fixes!
 * ** Moving windows with 0 duration via text code should now instantly move
 *    the windows to the desired location with no delay. Fix made by Olivia.
 * 
 * Version 1.17: April 9, 2021
 * * Feature Update!
 * ** <Auto> text codes for message windows will round up calculations for the
 *    message width to the nearest even number for better calculations.
 * 
 * Version 1.16: April 2, 2021
 * * Bug Fixes!
 * ** \CommonEvent[x] text code will no longer run upon message window size
 *    calculation. Fix made by Arisu.
 * * Documentation Update!
 * ** Added further clarification for "Text Macros" section.
 * *** This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 *     Use the method stated before with the brackets to [MacroName] instead.
 * 
 * Version 1.15: March 5, 2021
 * * Bug Fixes!
 * ** Hidden choices by switches will no longer count towards the maximum line
 *    count for Show Choice options. Fix made by Irina.
 * 
 * Version 1.14: February 12, 2021
 * * Bug Fixes!
 * ** Auto positioned messages in battle will no longer cover the battler in
 *    question. Fix made by Irina.
 * 
 * Version 1.13: February 5, 2021
 * * Bug Fixes!
 * ** Choice List Window with a dimmed background should now have a more
 *    consistent sized dim sprite. Fix made by Irina.
 * 
 * Version 1.12: January 22, 2021
 * * Feature Update!
 * ** Name Box Window Default Color is now disabled by default to 0 because
 *    users do not understand why their names are showing up yellow and did not
 *    bother reading the documentation. If users want this feature turned on,
 *    they will have to do it manually from now on. Update made by Irina.
 * 
 * Version 1.11: January 15, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: January 8, 2021
 * * Bug Fixes!
 * ** <Auto Actor: x> and <Auto Party: x> text codes should now work properly.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Auto Color Plugin Parameters now have their default settings set to 0.
 *    This is due to an influx of "bug reports" from users who do not
 *    understand how this feature works, and the VisuStella team has decided it
 *    is better for the feature to default to an inactive state until users
 *    decide to search and utilize it themselves. Update made by Irina.
 * 
 * Version 1.09: January 1, 2021
 * * Feature Update!
 * ** Auto-color no longer applies to database names that are only numbers.
 *    Auto-color entries that are only numbers will also be ignored. This is to
 *    prevent breaking the text code parsing. Update made by Yanfly.
 * 
 * Version 1.08: November 15, 2020
 * * Documentation Update!
 * ** Some text codes left for the Name Box Window have been accidentally left
 *    out. These text codes allow for the positioning of the Name Box Window.
 *    Also, added to this section are the \NormalBG, \DimBG, and \TransparentBG
 *    text codes since people have been asking for how to change the name box
 *    window's background, but have skimmed over those text codes in different
 *    sections of the help file.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: November 8, 2020
 * * Bug Fixes!
 * ** When using auto size functions, the message pause symbol will no longer
 *    appear semi-transparent the whole time. Fix made by Irina.
 * 
 * Version 1.06: October 25, 2020
 * * Documentation Update!
 * ** Added a warning message to the Fast Forward Key plugin parameter:
 * *** WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 * ** Updated help file for new features.
 * * Feature Update!
 * ** The default Fast Forward Key setting has now been changed from "Shift" to
 *    "Page Down". Change made by Yanfly
 * * New Feature!
 * ** New Plugin Parameter added by Irina.
 * *** Plugin Parameters > General > Default Outline Width
 * **** Changes the default outline width to this many pixels thick.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Setting an actor's autocolor will now disable it from \N[x] and \P[x]
 *    text codes. Fix made by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Auto Position text codes not place positions properly if the screen width
 *    and height differ from the box width and box height. Fix made by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Word wrap no longer affects specific battle messages. Fix made by Irina.
 * ** Word wrap now updates properly after using the 'Message: Properties'
 *    Plugin Command. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Autoplacement of the name box window now takes its offset Y setting into
 *    account before sending it to the bottom of the message window. Fix made
 *    by Yanfly.
 * ** Added automatic feature setting to turn off word wrap when using the
 *    auto-size and auto-position text codes. This is because the auto-size and
 *    auto-position effects don't work properly with Word Wrap based on how
 *    they both clash when adjusting the window settings. Fix made by Irina.
 * ** New message pages after auto-sizing no longer put out empty messages.
 *    Fix made by Irina and Shiro.
 * * Documentation Update!
 * ** Extended the note for auto-size and auto-position text codes to include
 *    that they do not work with Word Wrap. Added by Irina.
 * 
 * Version 1.02: August 30, 2020
 * * New Features!
 * ** Added new hard-coded text codes for auto-sizing and auto-positioning:
 * *** <Auto>, <Auto Width>, <Auto Height>
 * *** <Auto Actor: x>, <Auto Party: x>, <Auto Enemy: x>
 * *** <Auto Player>, <Auto Actor: x>, <Auto Party: x>, <Auto Event: x>
 * **** New features added by Irina.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** </Wordwrap> now works.
 * ** \ActorFace[x] text code now fixed.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Text Code Replacements > ActorFace >
 *     JS: Text > and changing "$gameActors.actor(1)" to
 *     "$gameActors.actor(actorId)"
 * ** Actors with empty names would cause auto hightlight problems. Fixed!
 * ** Auto-colors now ignore names with special characters like !, ?, [, ], and
 *    so on.
 * ** Line break spacing fixed.
 * * New Features!
 * ** Wordwrap now works with <left>, <center> and <right> alignment tags.
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
 * @command MessageWindowProperties
 * @text Message: Properties
 * @desc Change the various properties of the Message Window.
 *
 * @arg Rows:num
 * @text Rows
 * @type number
 * @min 0
 * @desc Change the number of Message Window rows.
 * Leave at 0 to keep it unchanged.
 * @default 4
 *
 * @arg Width:num
 * @text Width
 * @type number
 * @min 0
 * @desc Change the Message Window width in pixels.
 * Leave at 0 to keep it unchanged.
 * @default 816
 *
 * @arg WordWrap:str
 * @text Word Wrap
 * @type select
 * @option No Change
 * @value No Change
 * @option Enable
 * @value true
 * @option Disable
 * @value false
 * @desc Enable or disable Word Wrap for the Message Window?
 * @default No Change
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageWindowXyOffsets
 * @text Message: X/Y Offsets
 * @desc Change the X and Y Offsets of the Message Window.
 * The offset value(s) will be saved and stored.
 *
 * @arg OffsetX:eval
 * @text Offset X
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @arg OffsetY:eval
 * @text Offset Y
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Choice
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowDistance
 * @text Choices: Distance
 * @desc Change the distance from choice window to the message window.
 *
 * @arg Distance:eval
 * @text Distance
 * @desc Change distance between the choice and message windows.
 * Default distance is 0. Use negative to center align.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowProperties
 * @text Choices: Properties
 * @desc Change the properties found in the Show Choices event command.
 *
 * @arg LineHeight:num
 * @text Choice Line Height
 * @type number
 * @min 0
 * @desc Change the line height for the show choices.
 * Leave at 0 to keep this unchanged.
 * @default 36
 *
 * @arg MinWidth:num
 * @text Minimum Choice Width
 * @type number
 * @min 0
 * @desc What is the minimum width size for each choice?
 * 96 is the default width.
 * @default 96
 *
 * @arg MaxRows:num
 * @text Max Rows
 * @type number
 * @min 0
 * @desc Maximum number of choice rows to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 8
 *
 * @arg MaxCols:num
 * @text Max Columns
 * @type number
 * @min 0
 * @desc Maximum number of choice columns to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 1
 *
 * @arg TextAlign:str
 * @text Text Alignment
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Text alignment for Show Choice window.
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Select
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelectWeapon
 * @text Select: Weapon
 * @desc Opens the Event Select Item Window to let the player
 * pick a weapon to choose from.
 *
 * @arg VariableID:num
 * @text Variable ID
 * @type number
 * @min 0
 * @desc This variable will be used to record the ID of the
 * selected weapon. It will result in 0 otherwise.
 * @default 1
 *
 * @arg WeaponTypeID:num
 * @text Weapon Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the weapons to a specific weapon type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelectArmor
 * @text Select: Armor
 * @desc Opens the Event Select Item Window to let the player
 * pick an armor to choose from.
 *
 * @arg VariableID:num
 * @text Variable ID
 * @type number
 * @min 0
 * @desc This variable will be used to record the ID of the
 * selected armor. It will result in 0 otherwise.
 * @default 1
 *
 * @arg ArmorTypeID:num
 * @text Armor Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the armors to a specific armor type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @arg EquipTypeID:num
 * @text Equip Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the armors to a specific equip type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelectSkill
 * @text Select: Skill
 * @desc Opens the Event Select Item Window to let the player
 * pick a skill to choose from. Requires VisuMZ_1_SkillsStatesCore!
 *
 * @arg VariableID:num
 * @text Variable ID
 * @type number
 * @min 0
 * @desc This variable will be used to record the ID of the
 * selected skill. It will result in 0 otherwise.
 * @default 1
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select an actor to get the skill list from.
 * Use 0 to select from the party leader.
 * @default 0
 *
 * @arg SkillTypeID:num
 * @text Skill Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the skills to a specific skill type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextChange
 * @text Picture: Change Text
 * @desc Change text for target picture(s) to show.
 * You may use text codes.
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @desc The ID(s) of the picture(s) to set text to.
 * @default ["1"]
 *
 * @arg Padding:eval
 * @text Padding
 * @parent PictureIDs:arraynum
 * @desc How much padding from the sides should there be?
 * @default $gameSystem.windowPadding()
 * 
 * @arg Text
 *
 * @arg upperleft:json
 * @text Upper Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg up:json
 * @text Upper Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg upperright:json
 * @text Upper Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg left:json
 * @text Middle Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg center:json
 * @text Middle Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg right:json
 * @text Middle Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg lowerleft:json
 * @text Lower Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg down:json
 * @text Lower Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg lowerright:json
 * @text Lower Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextErase
 * @text Picture: Erase Text
 * @desc Erase all text for target picture(s).
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @desc The ID(s) of the picture(s) to erase text for.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextRefresh
 * @text Picture: Refresh Text
 * @desc Refreshes the text used for all on-screen pictures.
 * To be used if any dynamic text codes are updated like \n[x].
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
 * @param MessageCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings involving the message system.
 * @default {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"pagedown","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","DefaultOutlineWidth:num":"3","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"0","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"}
 *
 * @param AutoColor:struct
 * @text Auto-Color Settings
 * @type struct<AutoColor>
 * @desc Automatically color certain keywords a specific way.
 * @default {"DatabaseHighlighting":"","Actors:str":"0","Classes:str":"0","Skills:str":"0","Items:str":"0","Weapons:str":"0","Armors:str":"0","Enemies:str":"0","States:str":"0","WordHighlighting":"","TextColor1:arraystr":"[]","TextColor2:arraystr":"[]","TextColor3:arraystr":"[]","TextColor4:arraystr":"[]","TextColor5:arraystr":"[]","TextColor6:arraystr":"[]","TextColor7:arraystr":"[]","TextColor8:arraystr":"[]","TextColor9:arraystr":"[]","TextColor10:arraystr":"[]","TextColor11:arraystr":"[]","TextColor12:arraystr":"[]","TextColor13:arraystr":"[]","TextColor14:arraystr":"[]","TextColor15:arraystr":"[]","TextColor16:arraystr":"[]","TextColor17:arraystr":"[]","TextColor18:arraystr":"[]","TextColor19:arraystr":"[]","TextColor20:arraystr":"[]","TextColor21:arraystr":"[]","TextColor22:arraystr":"[]","TextColor23:arraystr":"[]","TextColor24:arraystr":"[]","TextColor25:arraystr":"[]","TextColor26:arraystr":"[]","TextColor27:arraystr":"[]","TextColor28:arraystr":"[]","TextColor29:arraystr":"[]","TextColor30:arraystr":"[]","TextColor31:arraystr":"[]"}
 *
 * @param CustomFonts:arraystruct
 * @text Custom Font Manager
 * @type struct<CustomFont>[]
 * @desc Register custom fonts here. Custom fonts that aren't the
 * message or number fonts cannot be used without this.
 * @default []
 *
 * @param TextCodeActions:arraystruct
 * @text Text Code Actions
 * @type struct<TextCodeAction>[]
 * @desc Text codes that perform actions.
 * @default ["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (this instanceof Window_Message) {\\\\n    if (textState.drawing) {\\\\n        const filename = data[0].trim();\\\\n        const index = parseInt(data[1] || '0');\\\\n        $gameMessage.setFaceImage(filename, index);\\\\n        this.loadMessageFace();\\\\n        const rtl = $gameMessage.isRTL();\\\\n        const width = ImageManager.faceWidth;\\\\n        const height = this.innerHeight;\\\\n        const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n        this.contents.clearRect(x, 0, width, height);\\\\n        this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n    }\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (this instanceof Window_Message) {\\\\n    if (textState.drawing) {\\\\n        const filename = $gameMessage.faceName();\\\\n        $gameMessage.setFaceImage(filename, index);\\\\n        this.loadMessageFace();\\\\n        const rtl = $gameMessage.isRTL();\\\\n        const width = ImageManager.faceWidth;\\\\n        const height = this.innerHeight;\\\\n        const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n        this.contents.clearRect(x, 0, width, height);\\\\n        this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n    }\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (this instanceof Window_Message) {\\\\n    if (textState.drawing && this.constructor === Window_Message) {\\\\n        this.setTextDelay(delay);\\\\n    }\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"heart\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"3\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\"\"}"]
 *
 * @param TextCodeReplace:arraystruct
 * @text Text Code Replacements
 * @type struct<TextCodeReplace>[]
 * @desc Text codes that replace themselves with text.
 * @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjIcon\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectIcon();\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
 *
 * @param TextMacros:arraystruct
 * @text Text Code Macros
 * @type struct<TextMacro>[]
 * @desc Macros that are used to quickly write batches of text.
 * Format style: [MacroName]
 * @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
 *
 * @param Localization:struct
 * @text Text Language Settings
 * @type struct<Localization>
 * @desc Text Language settings for this plugin.
 * @default {"Main":"","Enable:eval":"false","CsvFilename:str":"Languages.csv","Options":"","AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Language","Localized":"","DefaultLocale:str":"English","Languages:arraystr":"[\"Bengali\",\"Chinese(Simplified)\",\"Chinese(Traditional)\",\"Czech\",\"Danish\",\"Dutch\",\"English\",\"Finnish\",\"French\",\"German\",\"Greek\",\"Hindi\",\"Hungarian\",\"Indonesian\",\"Italian\",\"Japanese\",\"Korean\",\"Norwegian\",\"Polish\",\"Portuguese\",\"Romanian\",\"Russian\",\"Slovak\",\"Spanish\",\"Swedish\",\"Tamil\",\"Thai\",\"Turkish\"]","LangNames":"","Bengali:str":"বাংলা","Chinese(Simplified):str":"简体中文","Chinese(Traditional):str":"繁體中文","Czech:str":"Čeština","Danish:str":"Dansk","Dutch:str":"Nederlands","English:str":"English","Finnish:str":"Suomi","French:str":"Français","German:str":"Deutsch","Greek:str":"Ελληνικά","Hindi:str":"हिन्दी","Hungarian:str":"Magyar","Indonesian:str":"Bahasa Indo","Italian:str":"Italiano","Japanese:str":"日本語","Korean:str":"한국어","Norwegian:str":"Norsk","Polish:str":"Polski","Portuguese:str":"Português","Romanian:str":"Română","Russian:str":"Русский","Slovak:str":"Slovenčina","Spanish:str":"Español","Swedish:str":"Svenska","Tamil:str":"தமிழ்","Thai:str":"ไทย","Turkish:str":"Türkçe"}
 *
 * @param LanguageFonts:struct
 * @text Language Fonts
 * @parent Localization:struct
 * @type struct<LanguageFonts>
 * @desc Different default fonts used for different languages.
 * Players can override this with Options Core.
 * @default {"Bengali:str":"rmmz-mainfont","Chinese(Simplified):str":"rmmz-mainfont","Chinese(Traditional):str":"rmmz-mainfont","Czech:str":"rmmz-mainfont","Danish:str":"rmmz-mainfont","Dutch:str":"rmmz-mainfont","English:str":"rmmz-mainfont","Finnish:str":"rmmz-mainfont","French:str":"rmmz-mainfont","German:str":"rmmz-mainfont","Greek:str":"rmmz-mainfont","Hindi:str":"rmmz-mainfont","Hungarian:str":"rmmz-mainfont","Indonesian:str":"rmmz-mainfont","Italian:str":"rmmz-mainfont","Japanese:str":"rmmz-mainfont","Korean:str":"rmmz-mainfont","Norwegian:str":"rmmz-mainfont","Polish:str":"rmmz-mainfont","Portuguese:str":"rmmz-mainfont","Romanian:str":"rmmz-mainfont","Russian:str":"rmmz-mainfont","Slovak:str":"rmmz-mainfont","Spanish:str":"rmmz-mainfont","Swedish:str":"rmmz-mainfont","Tamil:str":"rmmz-mainfont","Thai:str":"rmmz-mainfont","Turkish:str":"rmmz-mainfont"}
 *
 * @param LanguageImages:struct
 * @text Language Images
 * @parent Localization:struct
 * @type struct<LanguageImages>
 * @desc Allows different images to be used when different
 * languages are used. See help for more information.
 * @default {"ConvertDefault:eval":"false","Languages":"","Bengali:str":"[XX]","Chinese(Simplified):str":"[XX]","Chinese(Traditional):str":"[XX]","Czech:str":"[XX]","Danish:str":"[XX]","Dutch:str":"[XX]","English:str":"[XX]","Finnish:str":"[XX]","French:str":"[XX]","German:str":"[XX]","Greek:str":"[XX]","Hindi:str":"[XX]","Hungarian:str":"[XX]","Indonesian:str":"[XX]","Italian:str":"[XX]","Japanese:str":"[XX]","Korean:str":"[XX]","Norwegian:str":"[XX]","Polish:str":"[XX]","Portuguese:str":"[XX]","Romanian:str":"[XX]","Russian:str":"[XX]","Slovak:str":"[XX]","Spanish:str":"[XX]","Swedish:str":"[XX]","Tamil:str":"[XX]","Thai:str":"[XX]","Turkish:str":"[XX]"}
 *
 * @param TextSpeed:struct
 * @text Text Speed Option Settings
 * @type struct<TextSpeed>
 * @desc Text Speed Options Menu settings.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"}
 *
 * @param WordWrap:struct
 * @text Word Wrap Settings
 * @type struct<WordWrap>
 * @desc Settings involving Word Wrap.
 * @default {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false","EndPadding:num":"0"}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param MessageWindow
 * @text Message Window
 *
 * @param MessageRows:num
 * @text Default Rows
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default number of rows to display for the Message Window.
 * @default 4
 *
 * @param MessageWidth:num
 * @text Default Width
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default Message Window width in pixels.
 * @default 816
 *
 * @param FastForwardKey:str
 * @text Fast Forward Key
 * @parent MessageWindow
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for fast forwarding messages.
 * @default pagedown
 *
 * @param MessageTextDelay:num
 * @text Text Delay
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc How many frames to wait between characters drawn?
 * Use 0 for instant.
 * @default 1
 *
 * @param MsgWindowOffsetX:num
 * @text Offset X
 * @parent MessageWindow
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @param MsgWindowOffsetY:num
 * @text Offset Y
 * @parent MessageWindow
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @param StretchDimmedBg:eval
 * @text Stretch Dimmed BG
 * @parent MessageWindow
 * @type boolean
 * @on Stretch
 * @off Don't
 * @desc Stretch dimmed window background to fit the whole screen.
 * @default true
 *
 * @param DefaultOutlineWidth:num
 * @text Default Outline Width
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc Changes the default outline width to this many pixels thick.
 * @default 3
 *
 * @param EachMessageStart:json
 * @text Each Message Start
 * @parent MessageWindow
 * @type note
 * @desc This is text that is added at the start of each message.
 * You may use text codes.
 * @default ""
 *
 * @param EachMessageEnd:json
 * @text Each Message End
 * @parent MessageWindow
 * @type note
 * @desc This is text that is added at the end of each message.
 * You may use text codes.
 * @default ""
 *
 * @param NameBoxWindow
 * @text Name Box Window
 *
 * @param NameBoxWindowDefaultColor:num
 * @text Default Color
 * @parent NameBoxWindow
 * @min 0
 * @max 31
 * @desc Default color for the Name Box Window's text.
 * @default 0
 *
 * @param NameBoxWindowOffsetX:num
 * @text Offset X
 * @parent NameBoxWindow
 * @desc How much to offset the name box window X by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param NameBoxWindowOffsetY:num
 * @text Offset Y
 * @parent NameBoxWindow
 * @desc How much to offset the name box window Y by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param ChoiceListWindow
 * @text Choice List Window
 *
 * @param ChoiceWindowLineHeight:num
 * @text Line Height
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc What is the default line height for Show Choices?
 * @default 36
 *
 * @param ChoiceWindowMinWidth:num
 * @text Minimum Choice Width
 * @parent ChoiceListWindow
 * @type number
 * @min 0
 * @desc What is the minimum choice width for each choice?
 * 96 is the default width.
 * @default 96
 *
 * @param ChoiceWindowMaxRows:num
 * @text Max Rows
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of rows to visibly display?
 * @default 8
 *
 * @param ChoiceWindowMaxCols:num
 * @text Max Columns
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of columns to visibly display?
 * @default 1
 *
 * @param ChoiceWindowTextAlign:str
 * @text Text Alignment
 * @parent ChoiceListWindow
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Default alignment for Show Choice window.
 * @default rmmz-mainfont
 *
 * @param DefaultTextCodes
 * @text Default Text Codes
 *
 * @param RelativePXPY:eval
 * @text Relative \PX \PY
 * @parent DefaultTextCodes
 * @type boolean
 * @on Better
 * @off Normal
 * @desc Make \PX[x] and \PY[x] adjust relative starting position than exact coordinates.
 * @default true
 *
 * @param FontBiggerCap:eval
 * @text \{ Maximum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the maximum size that \{ can reach.
 * @default 108
 *
 * @param FontSmallerCap:eval
 * @text \} Minimum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the minimum size that \} can reach.
 * @default 12
 *
 * @param FontChangeValue:eval
 * @text \{ Change \}
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc How much does \{ and \} change font size by?
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoColor:
 *
 * @param DatabaseHighlighting
 * @text Database Highlighting
 *
 * @param Actors:str
 * @text Actors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Actor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Classes:str
 * @text Classes
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Class's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Skills:str
 * @text Skills
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Skill's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Items:str
 * @text Items
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Item's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Weapons:str
 * @text Weapons
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Weapon's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Armors:str
 * @text Armors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Armor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Enemies:str
 * @text Enemies
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Enemy's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param States:str
 * @text States
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a State's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param WordHighlighting
 * @text Word Highlighting
 *
 * @param TextColor1:arraystr
 * @text \C[1]: Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor2:arraystr
 * @text \C[2]: Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor3:arraystr
 * @text \C[3]: Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor4:arraystr
 * @text \C[4]: Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor5:arraystr
 * @text \C[5]: Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor6:arraystr
 * @text \C[6]: Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor7:arraystr
 * @text \C[7]: Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor8:arraystr
 * @text \C[8]: Light Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor9:arraystr
 * @text \C[9]: Dark Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor10:arraystr
 * @text \C[10]: Dark Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor11:arraystr
 * @text \C[11]: Dark Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor12:arraystr
 * @text \C[12]: Dark Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor13:arraystr
 * @text \C[13]: Dark Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor14:arraystr
 * @text \C[14]: Solid Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor15:arraystr
 * @text \C[15]: Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor16:arraystr
 * @text \C[16]: System Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor17:arraystr
 * @text \C[17]: Crisis Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor18:arraystr
 * @text \C[18]: Dead Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor19:arraystr
 * @text \C[19]: Outline Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor20:arraystr
 * @text \C[20]: HP Orange 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor21:arraystr
 * @text \C[21]: HP Orange 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor22:arraystr
 * @text \C[22]: MP Blue 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor23:arraystr
 * @text \C[23]: MP Blue 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor24:arraystr
 * @text \C[24]: Param Up Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor25:arraystr
 * @text \C[25]: Param Down Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor26:arraystr
 * @text \C[26]: System Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor27:arraystr
 * @text \C[27]: System Pink
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor28:arraystr
 * @text \C[28]: TP Green 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor29:arraystr
 * @text \C[29]: TP Green 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor30:arraystr
 * @text \C[30]: EXP Purple 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor31:arraystr
 * @text \C[31]: EXP Purple 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Font Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomFont:
 *
 * @param FontFamily:str
 * @text Font Family
 * @desc This will be what's used by RPG Maker MZ and plugins to
 * reference this specific font. NO filename extensions!
 * @default Unnamed
 *
 * @param Filename:str
 * @text Filename
 * @desc What is the filename of the font you would like to use?
 * Located inside the project's "fonts" folder.
 * @default Unnamed.ttf
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Actions
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeAction:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param CommonEvent:num
 * @text Common Event
 * @type common_event
 * @desc Select a common event to run when this text code is used in a message.
 * @default 0
 *
 * @param ActionJS:func
 * @text JS: Action
 * @type note
 * @desc JavaScript code used to perform an action when this text code appears.
 * @default "const textState = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Replacements
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeReplace:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The text that will appear if this match appears.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this match appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Macro
 * ----------------------------------------------------------------------------
 */
/*~struct~TextMacro:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this macro to work.
 * @default Key
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The replacement text that will appear from the macro.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this macro appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Localization Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Localization:
 *
 * @param Main
 * @text Main Settings
 *
 * @param Enable:eval
 * @text Enable Switching?
 * @parent Main
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Enable language switching settings for this plugin?
 * @default false
 *
 * @param LangFiletype:str
 * @text File Type
 * @parent Main
 * @type select
 * @option CSV (Legacy)
 * @value csv
 * @option TSV (Recommended)
 * @value tsv
 * @desc Which file type do you wish to use?
 * @default tsv
 *
 * @param CsvFilename:str
 * @text CSV Filename
 * @parent Main
 * @desc What is the filename of the CSV file to read from?
 * Located within the project's /data/ folder.
 * @default Languages.csv
 *
 * @param TsvFilename:str
 * @text TSV Filename
 * @parent Main
 * @desc What is the filename of the TSV file to read from?
 * Located within the project's /data/ folder.
 * @default Languages.tsv
 *
 * @param Options
 * @text Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Language' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Text Language
 *
 * @param Localized
 * @text Languages
 *
 * @param DefaultLocale:str
 * @text Default Language
 * @parent Localized
 * @type select
 * @option Bengali
 * @option Chinese(Simplified)
 * @option Chinese(Traditional)
 * @option Czech
 * @option Danish
 * @option Dutch
 * @option English
 * @option Finnish
 * @option French
 * @option German
 * @option Greek
 * @option Hindi
 * @option Hungarian
 * @option Indonesian
 * @option Italian
 * @option Japanese
 * @option Korean
 * @option Norwegian
 * @option Polish
 * @option Portuguese
 * @option Romanian
 * @option Russian
 * @option Slovak
 * @option Spanish
 * @option Swedish
 * @option Tamil
 * @option Thai
 * @option Turkish
 * @desc What is the default language used for this game?
 * @default English
 *
 * @param Languages:arraystr
 * @text Supported Languages
 * @parent Localized
 * @type select[]
 * @option Bengali
 * @option Chinese(Simplified)
 * @option Chinese(Traditional)
 * @option Czech
 * @option Danish
 * @option Dutch
 * @option English
 * @option Finnish
 * @option French
 * @option German
 * @option Greek
 * @option Hindi
 * @option Hungarian
 * @option Indonesian
 * @option Italian
 * @option Japanese
 * @option Korean
 * @option Norwegian
 * @option Polish
 * @option Portuguese
 * @option Romanian
 * @option Russian
 * @option Slovak
 * @option Spanish
 * @option Swedish
 * @option Tamil
 * @option Thai
 * @option Turkish
 * @desc What are all the supported languages supported by this
 * game's script? Remove any that aren't translated.
 * @default ["Bengali","Chinese(Simplified)","Chinese(Traditional)","Czech","Danish","Dutch","English","Finnish","French","German","Greek","Hindi","Hungarian","Indonesian","Italian","Japanese","Korean","Norwegian","Polish","Portuguese","Romanian","Russian","Slovak","Spanish","Swedish","Tamil","Thai","Turkish"]
 *
 * @param LangNames
 * @text Language Names
 *
 * @param Bengali:str
 * @text Bengali
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default বাংলা
 * 
 * @param Chinese(Simplified):str
 * @text Chinese (Simplified)
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 简体中文
 * 
 * @param Chinese(Traditional):str
 * @text Chinese (Traditional)
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 繁體中文
 * 
 * @param Czech:str
 * @text Czech
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Čeština
 * 
 * @param Danish:str
 * @text Danish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Dansk
 * 
 * @param Dutch:str
 * @text Dutch
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Nederlands
 * 
 * @param English:str
 * @text English
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default English
 * 
 * @param Finnish:str
 * @text Finnish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Suomi
 * 
 * @param French:str
 * @text French
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Français
 * 
 * @param German:str
 * @text German
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Deutsch
 * 
 * @param Greek:str
 * @text Greek
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Ελληνικά
 * 
 * @param Hindi:str
 * @text Hindi
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default हिन्दी
 * 
 * @param Hungarian:str
 * @text Hungarian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Magyar
 * 
 * @param Indonesian:str
 * @text Indonesian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Bahasa Indo
 * 
 * @param Italian:str
 * @text Italian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Italiano
 * 
 * @param Japanese:str
 * @text Japanese
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 日本語
 * 
 * @param Korean:str
 * @text Korean
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 한국어
 * 
 * @param Norwegian:str
 * @text Norwegian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Norsk
 * 
 * @param Polish:str
 * @text Polish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Polski
 * 
 * @param Portuguese:str
 * @text Portuguese
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Português
 * 
 * @param Romanian:str
 * @text Romanian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Română
 * 
 * @param Russian:str
 * @text Russian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Русский
 * 
 * @param Slovak:str
 * @text Slovak
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Slovenčina
 * 
 * @param Spanish:str
 * @text Spanish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Español
 * 
 * @param Swedish:str
 * @text Swedish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Svenska
 * 
 * @param Tamil:str
 * @text Tamil
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default தமிழ்
 * 
 * @param Thai:str
 * @text Thai
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default ไทย
 * 
 * @param Turkish:str
 * @text Turkish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Türkçe
 *
 */
/* ----------------------------------------------------------------------------
 * Language Fonts Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LanguageFonts:
 *
 * @param Bengali:str
 * @text Bengali
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Chinese(Simplified):str
 * @text Chinese (Simplified)
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Chinese(Traditional):str
 * @text Chinese (Traditional)
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Czech:str
 * @text Czech
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Danish:str
 * @text Danish
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Dutch:str
 * @text Dutch
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param English:str
 * @text English
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Finnish:str
 * @text Finnish
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param French:str
 * @text French
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param German:str
 * @text German
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Greek:str
 * @text Greek
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Hindi:str
 * @text Hindi
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Hungarian:str
 * @text Hungarian
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Indonesian:str
 * @text Indonesian
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Italian:str
 * @text Italian
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Japanese:str
 * @text Japanese
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Korean:str
 * @text Korean
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Norwegian:str
 * @text Norwegian
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Polish:str
 * @text Polish
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Portuguese:str
 * @text Portuguese
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Romanian:str
 * @text Romanian
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Russian:str
 * @text Russian
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Slovak:str
 * @text Slovak
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Spanish:str
 * @text Spanish
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Swedish:str
 * @text Swedish
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Tamil:str
 * @text Tamil
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Thai:str
 * @text Thai
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Turkish:str
 * @text Turkish
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 *
 */
/* ----------------------------------------------------------------------------
 * Language Images Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LanguageImages:
 *
 * @param ConvertDefault:eval
 * @text Convert Default?
 * @type boolean
 * @on Convert
 * @off Don't
 * @desc ON: Default language uses converted marker.
 * OFF: Default languages uses [XX] as marker.
 * @default false
 *
 * @param Languages
 * @text Languages
 *
 * @param Bengali:str
 * @text Bengali
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Chinese(Simplified):str
 * @text Chinese (Simplified)
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Chinese(Traditional):str
 * @text Chinese (Traditional)
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Czech:str
 * @text Czech
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Danish:str
 * @text Danish
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Dutch:str
 * @text Dutch
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param English:str
 * @text English
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Finnish:str
 * @text Finnish
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param French:str
 * @text French
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param German:str
 * @text German
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Greek:str
 * @text Greek
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Hindi:str
 * @text Hindi
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Hungarian:str
 * @text Hungarian
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Indonesian:str
 * @text Indonesian
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Italian:str
 * @text Italian
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Japanese:str
 * @text Japanese
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Korean:str
 * @text Korean
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Norwegian:str
 * @text Norwegian
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Polish:str
 * @text Polish
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Portuguese:str
 * @text Portuguese
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Romanian:str
 * @text Romanian
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Russian:str
 * @text Russian
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Slovak:str
 * @text Slovak
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Spanish:str
 * @text Spanish
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Swedish:str
 * @text Swedish
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Tamil:str
 * @text Tamil
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Thai:str
 * @text Thai
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Turkish:str
 * @text Turkish
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 *
 */
/* ----------------------------------------------------------------------------
 * Text Speed Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TextSpeed:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Speed' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Text Speed
 *
 * @param Default:num
 * @text Default Value
 * @type number
 * @min 1
 * @max 11
 * @desc 1 - 10, slowest to fastest.
 * 11 is instant value.
 * @default 10
 *
 * @param Instant:str
 * @text Instant Speed
 * @desc Text to show "instant" text.
 * @default Instant
 *
 */
/* ----------------------------------------------------------------------------
 * Word Wrap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WordWrap:
 *
 * @param EnableWordWrap
 * @text Enable Word Wrap
 *
 * @param MessageWindow:eval
 * @text Message Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param HelpWindow:eval
 * @text Help Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param Rules
 * @text Rules
 *
 * @param LineBreakSpace:eval
 * @text Link Break -> Space
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Convert manually placed (non tagged) line breaks with spaces?
 * @default true
 *
 * @param TightWrap:eval
 * @text Tight Wrap
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc If a face graphic is present in a message, word wrap will be tighter.
 * @default false
 *
 * @param EndPadding:num
 * @text End Padding
 * @parent Rules
 * @type number
 * @desc Add extra padding to your window to make text wrap further away from the end of the window.
 * @default 0
 *
 */
//=============================================================================

const _0x4b39fb=_0xa308;(function(_0x251088,_0x241490){const _0x1a8ca8=_0xa308,_0x3e834a=_0x251088();while(!![]){try{const _0x393145=parseInt(_0x1a8ca8(0x45c))/0x1+-parseInt(_0x1a8ca8(0x246))/0x2*(-parseInt(_0x1a8ca8(0x2ca))/0x3)+parseInt(_0x1a8ca8(0x3e9))/0x4+parseInt(_0x1a8ca8(0x29e))/0x5+-parseInt(_0x1a8ca8(0x55d))/0x6*(-parseInt(_0x1a8ca8(0x507))/0x7)+-parseInt(_0x1a8ca8(0x3a7))/0x8+-parseInt(_0x1a8ca8(0x299))/0x9;if(_0x393145===_0x241490)break;else _0x3e834a['push'](_0x3e834a['shift']());}catch(_0x1b4834){_0x3e834a['push'](_0x3e834a['shift']());}}}(_0x43a0,0x64e54));function _0xa308(_0x37c1ae,_0x5bc4da){const _0x43a022=_0x43a0();return _0xa308=function(_0xa30802,_0x35303e){_0xa30802=_0xa30802-0x182;let _0x4fd602=_0x43a022[_0xa30802];return _0x4fd602;},_0xa308(_0x37c1ae,_0x5bc4da);}var label=_0x4b39fb(0x18d),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x4b39fb(0x404)](function(_0x93f31e){const _0x111653=_0x4b39fb;return _0x93f31e[_0x111653(0x1fd)]&&_0x93f31e['description']['includes']('['+label+']');})[0x0];VisuMZ[label][_0x4b39fb(0x494)]=VisuMZ[label][_0x4b39fb(0x494)]||{},VisuMZ[_0x4b39fb(0x2fa)]=function(_0x10aaa4,_0x4d0bd9){const _0x269f73=_0x4b39fb;for(const _0xcdc9b7 in _0x4d0bd9){if(_0xcdc9b7[_0x269f73(0x204)](/(.*):(.*)/i)){const _0x24f7f7=String(RegExp['$1']),_0x3f683e=String(RegExp['$2'])[_0x269f73(0x451)]()[_0x269f73(0x317)]();let _0x23e49f,_0x1918e8,_0x56ab23;switch(_0x3f683e){case _0x269f73(0x19f):_0x23e49f=_0x4d0bd9[_0xcdc9b7]!==''?Number(_0x4d0bd9[_0xcdc9b7]):0x0;break;case'ARRAYNUM':_0x1918e8=_0x4d0bd9[_0xcdc9b7]!==''?JSON[_0x269f73(0x1f8)](_0x4d0bd9[_0xcdc9b7]):[],_0x23e49f=_0x1918e8[_0x269f73(0x22f)](_0x506928=>Number(_0x506928));break;case _0x269f73(0x350):_0x23e49f=_0x4d0bd9[_0xcdc9b7]!==''?eval(_0x4d0bd9[_0xcdc9b7]):null;break;case'ARRAYEVAL':_0x1918e8=_0x4d0bd9[_0xcdc9b7]!==''?JSON[_0x269f73(0x1f8)](_0x4d0bd9[_0xcdc9b7]):[],_0x23e49f=_0x1918e8[_0x269f73(0x22f)](_0xba02f2=>eval(_0xba02f2));break;case _0x269f73(0x553):_0x23e49f=_0x4d0bd9[_0xcdc9b7]!==''?JSON['parse'](_0x4d0bd9[_0xcdc9b7]):'';break;case _0x269f73(0x2bc):_0x1918e8=_0x4d0bd9[_0xcdc9b7]!==''?JSON[_0x269f73(0x1f8)](_0x4d0bd9[_0xcdc9b7]):[],_0x23e49f=_0x1918e8['map'](_0x169d53=>JSON[_0x269f73(0x1f8)](_0x169d53));break;case _0x269f73(0x566):_0x23e49f=_0x4d0bd9[_0xcdc9b7]!==''?new Function(JSON['parse'](_0x4d0bd9[_0xcdc9b7])):new Function('return\x200');break;case'ARRAYFUNC':_0x1918e8=_0x4d0bd9[_0xcdc9b7]!==''?JSON['parse'](_0x4d0bd9[_0xcdc9b7]):[],_0x23e49f=_0x1918e8[_0x269f73(0x22f)](_0xb72f8=>new Function(JSON[_0x269f73(0x1f8)](_0xb72f8)));break;case _0x269f73(0x245):_0x23e49f=_0x4d0bd9[_0xcdc9b7]!==''?String(_0x4d0bd9[_0xcdc9b7]):'';break;case _0x269f73(0x25a):_0x1918e8=_0x4d0bd9[_0xcdc9b7]!==''?JSON[_0x269f73(0x1f8)](_0x4d0bd9[_0xcdc9b7]):[],_0x23e49f=_0x1918e8[_0x269f73(0x22f)](_0xce398b=>String(_0xce398b));break;case _0x269f73(0x448):_0x56ab23=_0x4d0bd9[_0xcdc9b7]!==''?JSON['parse'](_0x4d0bd9[_0xcdc9b7]):{},_0x10aaa4[_0x24f7f7]={},VisuMZ['ConvertParams'](_0x10aaa4[_0x24f7f7],_0x56ab23);continue;case _0x269f73(0x347):_0x1918e8=_0x4d0bd9[_0xcdc9b7]!==''?JSON[_0x269f73(0x1f8)](_0x4d0bd9[_0xcdc9b7]):[],_0x23e49f=_0x1918e8[_0x269f73(0x22f)](_0x35bdfb=>VisuMZ[_0x269f73(0x2fa)]({},JSON[_0x269f73(0x1f8)](_0x35bdfb)));break;default:continue;}_0x10aaa4[_0x24f7f7]=_0x23e49f;}}return _0x10aaa4;},(_0x4fe03d=>{const _0x1daf3b=_0x4b39fb,_0x5671cb=_0x4fe03d['name'];for(const _0x159ee7 of dependencies){if(!Imported[_0x159ee7]){alert(_0x1daf3b(0x250)['format'](_0x5671cb,_0x159ee7)),SceneManager[_0x1daf3b(0x47d)]();break;}}const _0x427269=_0x4fe03d[_0x1daf3b(0x41e)];if(_0x427269[_0x1daf3b(0x204)](/\[Version[ ](.*?)\]/i)){const _0x29eac5=Number(RegExp['$1']);_0x29eac5!==VisuMZ[label]['version']&&(alert(_0x1daf3b(0x30b)['format'](_0x5671cb,_0x29eac5)),SceneManager[_0x1daf3b(0x47d)]());}if(_0x427269[_0x1daf3b(0x204)](/\[Tier[ ](\d+)\]/i)){const _0x466f4f=Number(RegExp['$1']);_0x466f4f<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x1daf3b(0x520)](_0x5671cb,_0x466f4f,tier)),SceneManager[_0x1daf3b(0x47d)]()):tier=Math[_0x1daf3b(0x1ea)](_0x466f4f,tier);}VisuMZ[_0x1daf3b(0x2fa)](VisuMZ[label]['Settings'],_0x4fe03d['parameters']);})(pluginData),PluginManager[_0x4b39fb(0x3e3)](pluginData[_0x4b39fb(0x56e)],_0x4b39fb(0x464),_0x354ef4=>{const _0x138fb4=_0x4b39fb;VisuMZ[_0x138fb4(0x2fa)](_0x354ef4,_0x354ef4);const _0x3b3242=Number(_0x354ef4['Distance'])||0x0;$gameSystem[_0x138fb4(0x2a4)](_0x3b3242);}),PluginManager[_0x4b39fb(0x3e3)](pluginData[_0x4b39fb(0x56e)],'ChoiceWindowProperties',_0x4a5c9a=>{const _0x3ea822=_0x4b39fb;VisuMZ[_0x3ea822(0x2fa)](_0x4a5c9a,_0x4a5c9a);const _0x4e8f6a=_0x4a5c9a[_0x3ea822(0x37d)]||$gameSystem['getChoiceListLineHeight']()||0x1,_0x574811=_0x4a5c9a[_0x3ea822(0x485)]??0x60,_0x5a9e65=_0x4a5c9a[_0x3ea822(0x435)]||$gameSystem['getChoiceListMaxRows']()||0x1,_0x49a835=_0x4a5c9a[_0x3ea822(0x554)]||$gameSystem['getChoiceListMaxColumns']()||0x1,_0x1f8d98=_0x4a5c9a[_0x3ea822(0x43d)][_0x3ea822(0x21c)]()||_0x3ea822(0x473);$gameSystem[_0x3ea822(0x3f7)](_0x4e8f6a),$gameSystem[_0x3ea822(0x2d1)](_0x574811),$gameSystem[_0x3ea822(0x486)](_0x5a9e65),$gameSystem[_0x3ea822(0x3fd)](_0x49a835),$gameSystem['setChoiceListTextAlign'](_0x1f8d98);}),PluginManager['registerCommand'](pluginData[_0x4b39fb(0x56e)],_0x4b39fb(0x3e2),_0xa88ab0=>{const _0x1bf63e=_0x4b39fb;VisuMZ[_0x1bf63e(0x2fa)](_0xa88ab0,_0xa88ab0);const _0x35038d=_0xa88ab0['Rows']||$gameSystem[_0x1bf63e(0x22d)]()||0x1,_0x1d4fc3=_0xa88ab0[_0x1bf63e(0x411)]||$gameSystem[_0x1bf63e(0x468)]()||0x1;$gameTemp['_centerMessageWindow']=!![];const _0xf21c10=_0xa88ab0['WordWrap'][_0x1bf63e(0x21c)]();$gameSystem[_0x1bf63e(0x40f)](_0x35038d),$gameSystem['setMessageWindowWidth'](_0x1d4fc3);[_0x1bf63e(0x429),'false'][_0x1bf63e(0x287)](_0xf21c10)&&$gameSystem[_0x1bf63e(0x207)](eval(_0xf21c10));const _0xea284e=SceneManager['_scene']['_messageWindow'];_0xea284e&&(_0xea284e[_0x1bf63e(0x54d)](),_0xea284e[_0x1bf63e(0x1c7)](),_0xea284e[_0x1bf63e(0x318)]());}),PluginManager['registerCommand'](pluginData[_0x4b39fb(0x56e)],_0x4b39fb(0x20d),_0xcb4a47=>{const _0x2497f4=_0x4b39fb;VisuMZ[_0x2497f4(0x2fa)](_0xcb4a47,_0xcb4a47),$gameSystem[_0x2497f4(0x3bd)](_0xcb4a47[_0x2497f4(0x1e9)],_0xcb4a47['OffsetY']);const _0x323998=SceneManager[_0x2497f4(0x1a0)][_0x2497f4(0x516)];_0x323998&&(_0x323998['resetWordWrap'](),_0x323998[_0x2497f4(0x1c7)](),_0x323998['createContents']());}),PluginManager[_0x4b39fb(0x3e3)](pluginData['name'],_0x4b39fb(0x41a),_0x12fe43=>{const _0xe8151d=_0x4b39fb;VisuMZ[_0xe8151d(0x2fa)](_0x12fe43,_0x12fe43),$gameMessage[_0xe8151d(0x23e)](_0x12fe43[_0xe8151d(0x46f)]||0x0,_0x12fe43[_0xe8151d(0x2bb)]||0x0);const _0x295613=$gameTemp['getLastPluginCommandInterpreter']();if(_0x295613)_0x295613[_0xe8151d(0x27a)]('message');}),PluginManager[_0x4b39fb(0x3e3)](pluginData[_0x4b39fb(0x56e)],_0x4b39fb(0x2fc),_0x734788=>{const _0xbf3640=_0x4b39fb;VisuMZ['ConvertParams'](_0x734788,_0x734788),$gameMessage['setArmorChoice'](_0x734788['VariableID']||0x0,_0x734788[_0xbf3640(0x300)]||0x0,_0x734788['EquipTypeID']||0x0);const _0xd72959=$gameTemp[_0xbf3640(0x214)]();if(_0xd72959)_0xd72959['setWaitMode'](_0xbf3640(0x312));}),PluginManager[_0x4b39fb(0x3e3)](pluginData['name'],_0x4b39fb(0x49d),_0x3e3254=>{const _0x6118c6=_0x4b39fb;VisuMZ[_0x6118c6(0x2fa)](_0x3e3254,_0x3e3254),$gameMessage[_0x6118c6(0x4f6)](_0x3e3254[_0x6118c6(0x46f)]||0x0,_0x3e3254[_0x6118c6(0x3f4)]||0x0,_0x3e3254['SkillTypeID']||0x0);const _0x32fdab=$gameTemp['getLastPluginCommandInterpreter']();if(_0x32fdab)_0x32fdab[_0x6118c6(0x27a)](_0x6118c6(0x312));}),PluginManager[_0x4b39fb(0x3e3)](pluginData[_0x4b39fb(0x56e)],_0x4b39fb(0x535),_0x276b10=>{const _0x340597=_0x4b39fb;VisuMZ[_0x340597(0x2fa)](_0x276b10,_0x276b10);const _0x210e5a=_0x276b10['PictureIDs']||[],_0x50ef2f=_0x276b10[_0x340597(0x27c)]||0x0,_0x2f7a31=[_0x340597(0x48a),'up',_0x340597(0x259),'left',_0x340597(0x51f),_0x340597(0x32a),_0x340597(0x2ac),_0x340597(0x4d6),_0x340597(0x547)];for(const _0xeff825 of _0x210e5a){$gameScreen[_0x340597(0x450)](_0xeff825,_0x50ef2f);for(const _0x6d3b64 of _0x2f7a31){if(_0x276b10[_0x6d3b64]===undefined)continue;$gameScreen[_0x340597(0x2df)](_0xeff825,_0x276b10[_0x6d3b64],_0x6d3b64);}}}),PluginManager[_0x4b39fb(0x3e3)](pluginData[_0x4b39fb(0x56e)],_0x4b39fb(0x3ae),_0x44c3c8=>{const _0x263ec0=_0x4b39fb;VisuMZ[_0x263ec0(0x2fa)](_0x44c3c8,_0x44c3c8);const _0x4108ca=_0x44c3c8[_0x263ec0(0x254)]||[];for(const _0x50b350 of _0x4108ca){$gameScreen[_0x263ec0(0x32e)](_0x50b350),$gameScreen[_0x263ec0(0x440)](_0x50b350);}}),PluginManager[_0x4b39fb(0x3e3)](pluginData[_0x4b39fb(0x56e)],_0x4b39fb(0x4e9),_0xf05140=>{$gameScreen['requestPictureTextRefreshAll']();}),VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x4fa)]=Scene_Boot['prototype'][_0x4b39fb(0x41b)],Scene_Boot[_0x4b39fb(0x46a)]['onDatabaseLoaded']=function(){const _0xf1889b=_0x4b39fb;VisuMZ[_0xf1889b(0x18d)][_0xf1889b(0x4fa)][_0xf1889b(0x408)](this),VisuMZ[_0xf1889b(0x18d)][_0xf1889b(0x23c)](),this[_0xf1889b(0x3af)](),this[_0xf1889b(0x563)](),this[_0xf1889b(0x381)](),this[_0xf1889b(0x452)]();},VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x23c)]=function(){const _0x6e153c=_0x4b39fb;if(Imported['VisuMZ_4_ExtraEnemyDrops']&&VisuMZ['ExtraEnemyDrops'][_0x6e153c(0x221)]<1.09){let _0x5d6389='';_0x5d6389+=_0x6e153c(0x427),_0x5d6389+=_0x6e153c(0x2b4),alert(_0x5d6389),SceneManager['exit']();}},VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x4f3)]=function(_0x15087d){const _0x45181b=_0x4b39fb,_0x495b3e=VisuMZ[_0x45181b(0x18d)][_0x45181b(0x494)][_0x15087d];_0x495b3e[_0x45181b(0x1fa)]((_0x21dcc1,_0x14ae1e)=>{const _0x7a498a=_0x45181b;if(!_0x21dcc1||!_0x14ae1e)return-0x1;return _0x14ae1e[_0x7a498a(0x540)][_0x7a498a(0x3d0)]-_0x21dcc1[_0x7a498a(0x540)][_0x7a498a(0x3d0)];});},Scene_Boot[_0x4b39fb(0x46a)][_0x4b39fb(0x3af)]=function(){const _0x2ffeea=_0x4b39fb;VisuMZ[_0x2ffeea(0x18d)][_0x2ffeea(0x4f3)](_0x2ffeea(0x3f0));for(const _0x1345cd of VisuMZ[_0x2ffeea(0x18d)][_0x2ffeea(0x494)]['TextCodeActions']){_0x1345cd[_0x2ffeea(0x540)]=_0x1345cd[_0x2ffeea(0x540)][_0x2ffeea(0x451)](),_0x1345cd[_0x2ffeea(0x4d5)]=new RegExp('\x1b'+_0x1345cd[_0x2ffeea(0x540)],'gi'),_0x1345cd['textCodeResult']='\x1b'+_0x1345cd[_0x2ffeea(0x540)];if(_0x1345cd[_0x2ffeea(0x1c5)]==='')_0x1345cd['textCodeResult']+=_0x2ffeea(0x3da);}},Scene_Boot[_0x4b39fb(0x46a)][_0x4b39fb(0x563)]=function(){const _0x28a411=_0x4b39fb;VisuMZ['MessageCore']['SortObjectByKeyLength'](_0x28a411(0x488));for(const _0x45efe9 of VisuMZ['MessageCore']['Settings']['TextCodeReplace']){_0x45efe9[_0x28a411(0x4d5)]=new RegExp('\x1b'+_0x45efe9[_0x28a411(0x540)]+_0x45efe9[_0x28a411(0x1c5)],'gi'),_0x45efe9['TextStr']!==''&&_0x45efe9[_0x28a411(0x1d6)]!==_0x28a411(0x28b)?_0x45efe9['textCodeResult']=new Function(_0x28a411(0x2c1)+_0x45efe9['TextStr'][_0x28a411(0x2fd)](/\\/g,'\x1b')+'\x27'):_0x45efe9[_0x28a411(0x183)]=_0x45efe9[_0x28a411(0x528)];}},Scene_Boot[_0x4b39fb(0x46a)][_0x4b39fb(0x381)]=function(){const _0x3bbfac=_0x4b39fb;for(const _0xd3cdd of VisuMZ['MessageCore'][_0x3bbfac(0x494)][_0x3bbfac(0x49f)]){_0xd3cdd[_0x3bbfac(0x4d5)]=new RegExp('\x5c['+_0xd3cdd[_0x3bbfac(0x540)]+'\x5c]','gi');if(_0xd3cdd['TextStr']!==''&&_0xd3cdd['TextStr']!==_0x3bbfac(0x28b)){let _0x1531d3=_0xd3cdd[_0x3bbfac(0x1d6)];_0x1531d3=_0x1531d3['replace'](/\\/g,'\x1b'),_0x1531d3=_0x1531d3[_0x3bbfac(0x2fd)]('\x27','\x5c\x27'),_0x1531d3=_0x1531d3['replace']('\x22','\x5c\x22'),_0xd3cdd[_0x3bbfac(0x183)]=new Function(_0x3bbfac(0x2c1)+_0x1531d3+'\x27');}else _0xd3cdd[_0x3bbfac(0x183)]=_0xd3cdd[_0x3bbfac(0x528)];}},Scene_Boot[_0x4b39fb(0x46a)][_0x4b39fb(0x452)]=function(){const _0x485f4c=_0x4b39fb,_0x279476=VisuMZ[_0x485f4c(0x18d)][_0x485f4c(0x494)][_0x485f4c(0x1d4)];!VisuMZ['ParseAllNotetags']&&(VisuMZ[_0x485f4c(0x18d)][_0x485f4c(0x3fc)]($dataClasses,_0x279476['Classes']),VisuMZ[_0x485f4c(0x18d)]['AddAutoColor']($dataSkills,_0x279476[_0x485f4c(0x392)]),VisuMZ['MessageCore']['AddAutoColor']($dataItems,_0x279476['Items']),VisuMZ[_0x485f4c(0x18d)][_0x485f4c(0x3fc)]($dataWeapons,_0x279476[_0x485f4c(0x1b2)]),VisuMZ[_0x485f4c(0x18d)][_0x485f4c(0x3fc)]($dataArmors,_0x279476[_0x485f4c(0x255)]),VisuMZ[_0x485f4c(0x18d)][_0x485f4c(0x3fc)]($dataEnemies,_0x279476[_0x485f4c(0x1e4)]),VisuMZ[_0x485f4c(0x18d)][_0x485f4c(0x3fc)]($dataStates,_0x279476[_0x485f4c(0x1a7)])),VisuMZ[_0x485f4c(0x18d)][_0x485f4c(0x487)]();},VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x49a)]=['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\x5c','$','.','|','!','<','>','^',_0x4b39fb(0x50a),_0x4b39fb(0x56d),_0x4b39fb(0x541),_0x4b39fb(0x544),_0x4b39fb(0x252),_0x4b39fb(0x1f2),_0x4b39fb(0x2d2),_0x4b39fb(0x552),_0x4b39fb(0x3c9),'</RIGHT>',_0x4b39fb(0x43b),_0x4b39fb(0x3c4),_0x4b39fb(0x4fb),_0x4b39fb(0x519),'<WORDWRAP>',_0x4b39fb(0x311),'<BR>',_0x4b39fb(0x2ff),'PICTURE',_0x4b39fb(0x2fe),'COMMONEVENT',_0x4b39fb(0x32d),'SHOW',_0x4b39fb(0x39d),'ENABLE',_0x4b39fb(0x52b),_0x4b39fb(0x1dc),_0x4b39fb(0x2dc),'ALL',_0x4b39fb(0x1f0)],VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x3fc)]=function(_0xf3a48e,_0x2ba2b4){const _0x49a2fa=_0x4b39fb;if(_0x2ba2b4<=0x0)return;const _0x1c9b86=_0xf3a48e;for(const _0x21ad0b of _0x1c9b86){if(!_0x21ad0b)continue;VisuMZ[_0x49a2fa(0x18d)][_0x49a2fa(0x53b)](_0x21ad0b,_0x2ba2b4);}},VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x487)]=function(){const _0x4a64df=_0x4b39fb;VisuMZ['MessageCore'][_0x4a64df(0x376)]=[];for(let _0x4796b9=0x1;_0x4796b9<=0x1f;_0x4796b9++){const _0xe6425b=_0x4a64df(0x345)['format'](_0x4796b9),_0x5b38c5=VisuMZ[_0x4a64df(0x18d)][_0x4a64df(0x494)][_0x4a64df(0x1d4)][_0xe6425b];_0x5b38c5[_0x4a64df(0x1fa)]((_0x12b005,_0xf02049)=>{const _0x119ec5=_0x4a64df;if(!_0x12b005||!_0xf02049)return-0x1;return _0xf02049[_0x119ec5(0x3d0)]-_0x12b005[_0x119ec5(0x3d0)];}),this[_0x4a64df(0x206)](_0x5b38c5,_0x4796b9);}},VisuMZ['MessageCore'][_0x4b39fb(0x206)]=function(_0x4239e5,_0x5d0df8){const _0x4b0edf=_0x4b39fb;for(const _0x2e3285 of _0x4239e5){if(_0x2e3285['length']<=0x0)continue;if(/^\d+$/[_0x4b0edf(0x431)](_0x2e3285))continue;let _0x329f3e=VisuMZ[_0x4b0edf(0x18d)][_0x4b0edf(0x531)](_0x2e3285);if(_0x2e3285['match'](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g))var _0x253e59=new RegExp(_0x329f3e,'i');else var _0x253e59=new RegExp('\x5cb'+_0x329f3e+'\x5cb','g');VisuMZ[_0x4b0edf(0x18d)][_0x4b0edf(0x376)][_0x4b0edf(0x1ee)]([_0x253e59,_0x4b0edf(0x354)['format'](_0x5d0df8,_0x2e3285)]);}},VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x531)]=function(_0x518700){const _0x6a43e1=_0x4b39fb;return _0x518700=_0x518700[_0x6a43e1(0x2fd)](/(\W)/gi,(_0xaab0c2,_0x3e8d0b)=>'\x5c%1'[_0x6a43e1(0x520)](_0x3e8d0b)),_0x518700;},VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x467)]=VisuMZ['ParseClassNotetags'],VisuMZ[_0x4b39fb(0x467)]=function(_0x25c892){const _0x1bc808=_0x4b39fb;VisuMZ[_0x1bc808(0x18d)]['ParseClassNotetags'][_0x1bc808(0x408)](this,_0x25c892);const _0x5d52fc=VisuMZ[_0x1bc808(0x18d)][_0x1bc808(0x494)]['AutoColor'];VisuMZ[_0x1bc808(0x18d)]['CreateAutoColorFor'](_0x25c892,_0x5d52fc['Classes']);},VisuMZ[_0x4b39fb(0x18d)]['ParseSkillNotetags']=VisuMZ[_0x4b39fb(0x2a1)],VisuMZ['ParseSkillNotetags']=function(_0x2edf17){const _0x21d679=_0x4b39fb;VisuMZ['MessageCore']['ParseSkillNotetags'][_0x21d679(0x408)](this,_0x2edf17);const _0x3a34d4=VisuMZ[_0x21d679(0x18d)][_0x21d679(0x494)][_0x21d679(0x1d4)];VisuMZ[_0x21d679(0x18d)]['CreateAutoColorFor'](_0x2edf17,_0x3a34d4[_0x21d679(0x392)]);},0x7,VisuMZ[_0x4b39fb(0x18d)]['ParseItemNotetags']=VisuMZ[_0x4b39fb(0x3ac)],VisuMZ[_0x4b39fb(0x3ac)]=function(_0x41b122){const _0x75201c=_0x4b39fb;VisuMZ[_0x75201c(0x18d)][_0x75201c(0x3ac)][_0x75201c(0x408)](this,_0x41b122);const _0x90042f=VisuMZ[_0x75201c(0x18d)][_0x75201c(0x494)][_0x75201c(0x1d4)];VisuMZ['MessageCore']['CreateAutoColorFor'](_0x41b122,_0x90042f[_0x75201c(0x1bf)]);},VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x3f6)]=VisuMZ[_0x4b39fb(0x3f6)],VisuMZ[_0x4b39fb(0x3f6)]=function(_0x4ab3dd){const _0x2067bc=_0x4b39fb;VisuMZ[_0x2067bc(0x18d)][_0x2067bc(0x3f6)][_0x2067bc(0x408)](this,_0x4ab3dd);const _0xe0267a=VisuMZ[_0x2067bc(0x18d)]['Settings'][_0x2067bc(0x1d4)];VisuMZ[_0x2067bc(0x18d)]['CreateAutoColorFor'](_0x4ab3dd,_0xe0267a['Weapons']);},VisuMZ['MessageCore']['ParseArmorNotetags']=VisuMZ[_0x4b39fb(0x4d3)],VisuMZ[_0x4b39fb(0x4d3)]=function(_0x2ac4da){const _0x4aaa0b=_0x4b39fb;VisuMZ[_0x4aaa0b(0x18d)][_0x4aaa0b(0x4d3)][_0x4aaa0b(0x408)](this,_0x2ac4da);const _0x4f32b0=VisuMZ[_0x4aaa0b(0x18d)]['Settings'][_0x4aaa0b(0x1d4)];VisuMZ['MessageCore'][_0x4aaa0b(0x53b)](_0x2ac4da,_0x4f32b0[_0x4aaa0b(0x255)]);},VisuMZ['MessageCore'][_0x4b39fb(0x4da)]=VisuMZ[_0x4b39fb(0x4da)],VisuMZ['ParseEnemyNotetags']=function(_0x518825){const _0x30fd62=_0x4b39fb;VisuMZ[_0x30fd62(0x18d)][_0x30fd62(0x4da)]['call'](this,_0x518825);const _0x3f7252=VisuMZ[_0x30fd62(0x18d)][_0x30fd62(0x494)][_0x30fd62(0x1d4)];VisuMZ['MessageCore'][_0x30fd62(0x53b)](_0x518825,_0x3f7252['Enemies']);},VisuMZ['MessageCore'][_0x4b39fb(0x4a3)]=VisuMZ[_0x4b39fb(0x4a3)],VisuMZ[_0x4b39fb(0x4a3)]=function(_0x16ef0){const _0x594ab2=_0x4b39fb;VisuMZ[_0x594ab2(0x18d)][_0x594ab2(0x4a3)][_0x594ab2(0x408)](this,_0x16ef0);const _0x2c0913=VisuMZ[_0x594ab2(0x18d)][_0x594ab2(0x494)][_0x594ab2(0x1d4)];VisuMZ[_0x594ab2(0x18d)]['CreateAutoColorFor'](_0x16ef0,_0x2c0913['States']);},VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x53b)]=function(_0x139b50,_0x25f625){const _0x3295df=_0x4b39fb;if(_0x25f625<=0x0)return;const _0x487820=VisuMZ['MessageCore'][_0x3295df(0x494)]['AutoColor'][_0x3295df(0x3c3)+_0x25f625];let _0x5ae942=_0x139b50[_0x3295df(0x56e)][_0x3295df(0x317)]();if(/^\d+$/[_0x3295df(0x431)](_0x5ae942))return;if(VisuMZ['MessageCore'][_0x3295df(0x49a)][_0x3295df(0x287)](_0x5ae942[_0x3295df(0x451)]()))return;_0x5ae942=_0x5ae942[_0x3295df(0x2fd)](/\\I\[(\d+)\]/gi,''),_0x5ae942=_0x5ae942[_0x3295df(0x2fd)](/\x1bI\[(\d+)\]/gi,'');if(_0x5ae942[_0x3295df(0x3d0)]<=0x0)return;if(_0x5ae942[_0x3295df(0x204)](/-----/i))return;_0x487820[_0x3295df(0x1ee)](_0x5ae942);},VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x2a3)]=Scene_Boot['prototype']['loadGameFonts'],Scene_Boot[_0x4b39fb(0x46a)][_0x4b39fb(0x4ef)]=function(){const _0x56c33b=_0x4b39fb;VisuMZ[_0x56c33b(0x18d)]['Scene_Boot_loadGameFonts'][_0x56c33b(0x408)](this),this[_0x56c33b(0x192)]();},Scene_Boot[_0x4b39fb(0x46a)][_0x4b39fb(0x192)]=function(){const _0x590fba=_0x4b39fb,_0x22498e=VisuMZ['MessageCore'][_0x590fba(0x494)][_0x590fba(0x48e)]||[];for(const _0xf4dfb8 of _0x22498e){if(!_0xf4dfb8)continue;const _0x3dfce8=_0xf4dfb8['FontFamily'];if(_0x3dfce8[_0x590fba(0x317)]()==='')continue;if(_0x3dfce8[_0x590fba(0x21c)]()[_0x590fba(0x317)]()===_0x590fba(0x2a2))continue;const _0x15fbac=_0xf4dfb8['Filename'];if(_0x15fbac==='Unnamed.ttf')continue;FontManager[_0x590fba(0x498)](_0x3dfce8,_0x15fbac);}},VisuMZ['MessageCore'][_0x4b39fb(0x1ae)]=VisuMZ['MessageCore']['Settings'][_0x4b39fb(0x235)][_0x4b39fb(0x40b)]??'tsv',VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x2b2)]=DataManager['loadDatabase'],DataManager[_0x4b39fb(0x2c9)]=function(){const _0x2fa28e=_0x4b39fb;VisuMZ[_0x2fa28e(0x18d)][_0x2fa28e(0x2b2)][_0x2fa28e(0x408)](this),this['loadLocalization']();},DataManager['loadLocalization']=function(){const _0x367496=_0x4b39fb;if(!TextManager['isVisuMzLocalizationEnabled']())return;const _0x2e48b8=VisuMZ[_0x367496(0x18d)]['Settings'][_0x367496(0x235)];let _0x4cf4c2='';const _0x34d0b9=VisuMZ[_0x367496(0x18d)][_0x367496(0x1ae)]??_0x367496(0x323);if(_0x34d0b9==='csv')_0x4cf4c2=(_0x2e48b8['CsvFilename']??'Languages.csv')||'';if(_0x34d0b9===_0x367496(0x323))_0x4cf4c2=(_0x2e48b8[_0x367496(0x20f)]??_0x367496(0x1cc))||'';if(!_0x4cf4c2)return;const _0x56905d=_0x367496(0x361),_0x113e23=new XMLHttpRequest(),_0x305d90=_0x367496(0x55a)+_0x4cf4c2;window[_0x56905d]=null,_0x113e23[_0x367496(0x28d)](_0x367496(0x463),_0x305d90),_0x113e23[_0x367496(0x44d)](_0x367496(0x3e8)[_0x367496(0x520)](_0x34d0b9['toLowerCase']())),_0x113e23[_0x367496(0x205)]=()=>this[_0x367496(0x218)](_0x113e23,_0x56905d),_0x113e23[_0x367496(0x3fa)]=()=>this['onLocalizationXhrError'](),_0x113e23[_0x367496(0x537)]();},DataManager['onLocalizationXhrLoad']=function(_0x4fc814,_0x13a8a3){const _0x3c1d63=_0x4b39fb;if(_0x4fc814[_0x3c1d63(0x1fd)]>=0x190)return;const _0x11590f=_0x4fc814[_0x3c1d63(0x2cc)];window[_0x13a8a3]=VisuMZ['MessageCore']['ParseLocalizationCsv'](_0x11590f);},VisuMZ[_0x4b39fb(0x18d)]['ParseLocalizationCsv']=function(_0x502e3b){const _0x5b5623=_0x4b39fb,_0x1c9cf9=VisuMZ['MessageCore']['LocalizationType']??_0x5b5623(0x323),_0x207d22=_0x1c9cf9===_0x5b5623(0x1c0)?';':'\x09',_0xc67dea=_0x502e3b[_0x5b5623(0x4cd)]('\x0a'),_0x1ca5db=_0xc67dea[0x0][_0x5b5623(0x4cd)](_0x207d22),_0x41bccd={};return _0xc67dea['slice'](0x1)[_0x5b5623(0x389)](_0x43b336=>{const _0x3e2f0b=_0x5b5623;let _0x49c624=[],_0x578e10='',_0x30f854=![];for(let _0x595536=0x0;_0x595536<_0x43b336['length'];_0x595536++){let _0x4c9b45=_0x43b336[_0x595536];if(_0x4c9b45==='\x22')_0x30f854&&_0x43b336[_0x595536+0x1]==='\x22'?(_0x578e10+=_0x4c9b45,_0x595536++):_0x30f854=!_0x30f854;else _0x4c9b45===_0x207d22&&!_0x30f854?(_0x49c624['push'](_0x578e10),_0x578e10=''):_0x578e10+=_0x4c9b45;}if(_0x578e10)_0x49c624[_0x3e2f0b(0x1ee)](_0x578e10);if(!_0x49c624[0x0])_0x49c624[0x0]='';const _0x36ebab=_0x49c624[0x0][_0x3e2f0b(0x2fd)](/^"|"$/g,'')['toLowerCase']()[_0x3e2f0b(0x317)]();_0x41bccd[_0x36ebab]=_0x1ca5db[_0x3e2f0b(0x1b9)](0x1)['reduce']((_0x128bf1,_0x574674,_0x9b0137)=>{const _0x27945d=_0x3e2f0b;return _0x128bf1[_0x574674[_0x27945d(0x317)]()]=(_0x49c624[_0x9b0137+0x1]||'')[_0x27945d(0x2fd)](/^"|"$/g,''),_0x128bf1;},{});}),_0x41bccd;},DataManager[_0x4b39fb(0x251)]=function(){const _0x3cd0ee=_0x4b39fb,_0x48af89=(VisuMZ['MessageCore'][_0x3cd0ee(0x1ae)]??_0x3cd0ee(0x323))[_0x3cd0ee(0x451)]();let _0x1adc0a='';_0x1adc0a+=_0x3cd0ee(0x4a4),_0x1adc0a+=_0x3cd0ee(0x19b),_0x1adc0a=_0x1adc0a[_0x3cd0ee(0x520)](_0x48af89);if(confirm(_0x1adc0a)){if(Utils[_0x3cd0ee(0x55e)](_0x3cd0ee(0x431))){if(_0x48af89===_0x3cd0ee(0x3ab))_0x1adc0a=_0x3cd0ee(0x442),_0x1adc0a=_0x1adc0a[_0x3cd0ee(0x520)](_0x48af89),alert(_0x1adc0a),this[_0x3cd0ee(0x545)](),this[_0x3cd0ee(0x4af)]();else return this[_0x3cd0ee(0x20a)]();_0x1adc0a='';}else _0x1adc0a='%1\x20file\x20cannot\x20be\x20created.\x0aPlease\x20enter\x20Playtest\x20mode.\x0a';}else _0x1adc0a='%1\x20file\x20has\x20not\x20been\x20made.\x0a';_0x1adc0a+='Please\x20restart\x20the\x20game.',_0x1adc0a=_0x1adc0a['format'](_0x48af89),alert(_0x1adc0a),SceneManager[_0x3cd0ee(0x47d)]();},DataManager[_0x4b39fb(0x20a)]=function(){const _0x3c9fe0=_0x4b39fb,_0x5d38f1=VisuMZ[_0x3c9fe0(0x18d)]['Settings'][_0x3c9fe0(0x235)],_0x4e4b55=_0x5d38f1[_0x3c9fe0(0x44f)]??_0x3c9fe0(0x4ba),_0x2758db=new XMLHttpRequest(),_0x4b62ae=_0x3c9fe0(0x55a)+_0x4e4b55;_0x2758db[_0x3c9fe0(0x28d)](_0x3c9fe0(0x463),_0x4b62ae),_0x2758db['overrideMimeType'](_0x3c9fe0(0x4a1)),_0x2758db['onload']=()=>this[_0x3c9fe0(0x1ec)](_0x2758db),_0x2758db[_0x3c9fe0(0x3fa)]=()=>this[_0x3c9fe0(0x304)](),_0x2758db['send']();},DataManager[_0x4b39fb(0x1ec)]=function(_0x2c5e59){const _0x272392=_0x4b39fb,_0x15a002=VisuMZ['MessageCore'][_0x272392(0x494)][_0x272392(0x235)],_0x358093=_0x15a002['CsvFilename']??_0x272392(0x4ba);let _0x1c588f=_0x272392(0x419)[_0x272392(0x520)](_0x358093);_0x1c588f+='Press\x20OK\x20to\x20convert\x20to\x20TSV.\x0a',_0x1c588f+=_0x272392(0x52d),confirm(_0x1c588f)?this[_0x272392(0x505)](_0x2c5e59):this[_0x272392(0x304)]();},DataManager['convertCsvToTsvFile']=function(_0x33777a){const _0x52baae=_0x4b39fb;if(_0x33777a[_0x52baae(0x1fd)]>=0x190)return;const _0x36c219=_0x33777a[_0x52baae(0x2cc)],_0x257e57=_0x36c219[_0x52baae(0x2fd)](/\;/gi,'\x09'),_0x1b5d42=VisuMZ[_0x52baae(0x18d)][_0x52baae(0x494)][_0x52baae(0x235)],_0x67cc43=_0x1b5d42[_0x52baae(0x20f)]||_0x52baae(0x1cc),_0x1e2fbb=require(_0x52baae(0x3b0)),_0x7ccb5e=_0x1e2fbb[_0x52baae(0x234)](process['mainModule'][_0x52baae(0x37e)]),_0x18c381=_0x1e2fbb['join'](_0x7ccb5e,_0x52baae(0x55a)),_0x4e388f=_0x18c381+_0x67cc43,_0x4d9652=require('fs');_0x4d9652[_0x52baae(0x332)](_0x4e388f,_0x257e57);let _0x5c7117=_0x52baae(0x1af);alert(_0x5c7117),_0x5c7117=_0x52baae(0x21d),alert(_0x5c7117),SceneManager['exit']();},DataManager[_0x4b39fb(0x304)]=function(){const _0x7869de=_0x4b39fb;let _0x11a41b='TSV\x20file\x20is\x20now\x20created\x20and\x20stored\x20in\x20data\x20folder.';alert(_0x11a41b),this[_0x7869de(0x545)](),this[_0x7869de(0x4af)](),_0x11a41b=_0x7869de(0x21d),alert(_0x11a41b),SceneManager[_0x7869de(0x47d)]();},DataManager[_0x4b39fb(0x545)]=function(){const _0x13e8a2=_0x4b39fb,_0x3cbcdd=[_0x13e8a2(0x474),_0x13e8a2(0x465),_0x13e8a2(0x446),_0x13e8a2(0x341),'Chinese(Traditional)',_0x13e8a2(0x44b),_0x13e8a2(0x1e7),'Dutch',_0x13e8a2(0x1a5),_0x13e8a2(0x42b),'German',_0x13e8a2(0x48b),_0x13e8a2(0x2b8),_0x13e8a2(0x53d),_0x13e8a2(0x2a5),'Italian',_0x13e8a2(0x423),'Korean',_0x13e8a2(0x223),_0x13e8a2(0x3a1),_0x13e8a2(0x356),_0x13e8a2(0x201),'Russian',_0x13e8a2(0x36c),_0x13e8a2(0x1ff),_0x13e8a2(0x367),'Tamil',_0x13e8a2(0x4cb),'Turkish'],_0x12aaef=[_0x13e8a2(0x186),_0x13e8a2(0x401),'হ্যালো','你好','你好','Ahoj',_0x13e8a2(0x406),_0x13e8a2(0x53e),_0x13e8a2(0x351),_0x13e8a2(0x1ba),'Hallo',_0x13e8a2(0x196),_0x13e8a2(0x4f5),_0x13e8a2(0x42c),_0x13e8a2(0x340),_0x13e8a2(0x368),_0x13e8a2(0x1ab),_0x13e8a2(0x27f),_0x13e8a2(0x351),_0x13e8a2(0x56a),'Olá',_0x13e8a2(0x2ce),'Привет',_0x13e8a2(0x51b),_0x13e8a2(0x35e),_0x13e8a2(0x406),_0x13e8a2(0x2e7),'สวัสดี',_0x13e8a2(0x502)],_0x3060da=[_0x13e8a2(0x562),_0x13e8a2(0x4c6),'বিদায়','再见','再見',_0x13e8a2(0x4b8),_0x13e8a2(0x3a9),_0x13e8a2(0x495),'Näkemiin',_0x13e8a2(0x4ad),_0x13e8a2(0x4d0),_0x13e8a2(0x4c7),_0x13e8a2(0x29a),_0x13e8a2(0x274),_0x13e8a2(0x55f),_0x13e8a2(0x50c),_0x13e8a2(0x360),'안녕히\x20가세요',_0x13e8a2(0x38f),_0x13e8a2(0x561),_0x13e8a2(0x30c),_0x13e8a2(0x37b),'До\x20свидания','Zbohom',_0x13e8a2(0x202),_0x13e8a2(0x2ae),_0x13e8a2(0x1c4),'ลาก่อน','Hoşça\x20kal'],_0x4e5cbf=[_0x13e8a2(0x315),_0x13e8a2(0x315),'ওহে','哇','哇','Ó',_0x13e8a2(0x315),_0x13e8a2(0x34a),_0x13e8a2(0x2ef),'Waouh',_0x13e8a2(0x315),_0x13e8a2(0x3ad),_0x13e8a2(0x2d0),_0x13e8a2(0x492),'Wah',_0x13e8a2(0x315),'ワオ','와우','Oi','O','Uau','Uau','Вау','Ó',_0x13e8a2(0x241),'Oj',_0x13e8a2(0x2c3),_0x13e8a2(0x233),_0x13e8a2(0x3b1)],_0x182c7b=[_0x3cbcdd,_0x12aaef,_0x3060da,_0x4e5cbf],_0x533035=VisuMZ[_0x13e8a2(0x18d)]['LocalizationType']??_0x13e8a2(0x323),_0x3d458b=_0x533035===_0x13e8a2(0x1c0)?';':'\x09',_0x2fec42=_0x182c7b[_0x13e8a2(0x22f)](_0x53d493=>_0x53d493['join'](_0x3d458b))[_0x13e8a2(0x30f)]('\x0a'),_0x19cdf2=VisuMZ['MessageCore'][_0x13e8a2(0x494)][_0x13e8a2(0x235)];let _0x1a3abc='';if(_0x533035===_0x13e8a2(0x1c0))_0x1a3abc=_0x19cdf2[_0x13e8a2(0x44f)]||_0x13e8a2(0x4ba);if(_0x533035==='tsv')_0x1a3abc=_0x19cdf2['TsvFilename']||_0x13e8a2(0x1cc);const _0x446158=require(_0x13e8a2(0x3b0)),_0x1c2eb7=_0x446158[_0x13e8a2(0x234)](process[_0x13e8a2(0x2b5)][_0x13e8a2(0x37e)]),_0x4ece26=_0x446158[_0x13e8a2(0x30f)](_0x1c2eb7,_0x13e8a2(0x55a)),_0x2cf25a=_0x4ece26+_0x1a3abc,_0x1a8845=require('fs');return _0x1a8845[_0x13e8a2(0x332)](_0x2cf25a,_0x2fec42),_0x2cf25a;},DataManager['openLocalizationFolder']=function(){const _0x2ad8b6=_0x4b39fb,{exec:_0x37ad14}=require('child_process');_0x37ad14(_0x2ad8b6(0x34e)),_0x37ad14(_0x2ad8b6(0x457));},VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x29b)]=ImageManager[_0x4b39fb(0x50b)],ImageManager[_0x4b39fb(0x50b)]=function(_0x114afe,_0x4488f6){const _0x184f67=_0x4b39fb;if(ConfigManager[_0x184f67(0x3b7)]!==undefined){const _0x8f44ff=VisuMZ['MessageCore']['Settings'][_0x184f67(0x235)]||{},_0x15cf2f=_0x8f44ff[_0x184f67(0x50d)]||_0x184f67(0x465),_0x371154=VisuMZ[_0x184f67(0x18d)]['Settings'][_0x184f67(0x377)]||{},_0x27306c=ConfigManager[_0x184f67(0x3b7)]||_0x15cf2f;if(_0x27306c===_0x15cf2f&&!_0x371154['ConvertDefault']){}else{const _0x509ca8=_0x371154[_0x27306c]||'[XX]';_0x114afe&&_0x114afe[_0x184f67(0x204)](/\[XX\]/g)&&console[_0x184f67(0x264)](_0x114afe,_0x4488f6),_0x4488f6&&_0x4488f6[_0x184f67(0x204)](/\[XX\]/g)&&(_0x4488f6=_0x4488f6[_0x184f67(0x2fd)](/\[XX\]/g,_0x509ca8));}}return VisuMZ['MessageCore'][_0x184f67(0x29b)][_0x184f67(0x408)](this,_0x114afe,_0x4488f6);},SceneManager['isSceneBattle']=function(){const _0x46f38f=_0x4b39fb;return this[_0x46f38f(0x1a0)]&&this[_0x46f38f(0x1a0)][_0x46f38f(0x1f5)]===Scene_Battle;},SceneManager[_0x4b39fb(0x3ea)]=function(){const _0x459e85=_0x4b39fb;return this[_0x459e85(0x1a0)]&&this[_0x459e85(0x1a0)][_0x459e85(0x1f5)]===Scene_Map;},ConfigManager[_0x4b39fb(0x3b7)]=VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x494)][_0x4b39fb(0x235)][_0x4b39fb(0x50d)]||_0x4b39fb(0x465),ConfigManager[_0x4b39fb(0x200)]=VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x494)][_0x4b39fb(0x1f7)][_0x4b39fb(0x275)],VisuMZ[_0x4b39fb(0x18d)]['ConfigManager_makeData']=ConfigManager[_0x4b39fb(0x286)],ConfigManager[_0x4b39fb(0x286)]=function(){const _0x11c1ed=_0x4b39fb,_0x4eb020=VisuMZ['MessageCore'][_0x11c1ed(0x357)][_0x11c1ed(0x408)](this);return TextManager[_0x11c1ed(0x386)]()&&(_0x4eb020[_0x11c1ed(0x3b7)]=this[_0x11c1ed(0x3b7)]),_0x4eb020[_0x11c1ed(0x200)]=this['textSpeed'],_0x4eb020;},VisuMZ[_0x4b39fb(0x18d)]['ConfigManager_applyData']=ConfigManager[_0x4b39fb(0x390)],ConfigManager[_0x4b39fb(0x390)]=function(_0x22768e){const _0x25d44e=_0x4b39fb;VisuMZ[_0x25d44e(0x18d)][_0x25d44e(0x4b2)][_0x25d44e(0x408)](this,_0x22768e),TextManager['isVisuMzLocalizationEnabled']()&&('textLocale'in _0x22768e?this['textLocale']=String(_0x22768e[_0x25d44e(0x3b7)]):this[_0x25d44e(0x3b7)]=VisuMZ[_0x25d44e(0x18d)][_0x25d44e(0x494)][_0x25d44e(0x235)]['DefaultLocale']||_0x25d44e(0x465)),_0x25d44e(0x200)in _0x22768e?this[_0x25d44e(0x200)]=Number(_0x22768e[_0x25d44e(0x200)])[_0x25d44e(0x195)](0x1,0xb):this[_0x25d44e(0x200)]=VisuMZ[_0x25d44e(0x18d)][_0x25d44e(0x494)][_0x25d44e(0x1f7)][_0x25d44e(0x275)];},TextManager['messageCoreLocalization']=VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x494)]['Localization'][_0x4b39fb(0x517)],TextManager['messageCoreTextSpeed']=VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x494)][_0x4b39fb(0x1f7)]['Name'],TextManager[_0x4b39fb(0x478)]=VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x494)]['TextSpeed'][_0x4b39fb(0x36d)],VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x36e)]=TextManager[_0x4b39fb(0x312)],TextManager[_0x4b39fb(0x312)]=function(_0x378e11){const _0x2d7488=_0x4b39fb,_0x313721=[_0x2d7488(0x359),'emerge',_0x2d7488(0x213),_0x2d7488(0x417),_0x2d7488(0x1e0),_0x2d7488(0x385),'escapeStart',_0x2d7488(0x2b9),'obtainGold',_0x2d7488(0x1be)];let _0x9e9948=VisuMZ[_0x2d7488(0x18d)][_0x2d7488(0x36e)][_0x2d7488(0x408)](this,_0x378e11);return _0x313721['includes'](_0x378e11)&&(_0x9e9948=_0x2d7488(0x311)+_0x9e9948),_0x9e9948;},TextManager[_0x4b39fb(0x386)]=function(){const _0xf0b7e8=_0x4b39fb;return VisuMZ[_0xf0b7e8(0x18d)][_0xf0b7e8(0x494)][_0xf0b7e8(0x235)][_0xf0b7e8(0x484)];},TextManager[_0x4b39fb(0x1d1)]=function(_0x238e09){const _0x4929da=_0x4b39fb;if(!this[_0x4929da(0x386)]())return _0x238e09;return _0x238e09=String(_0x238e09)['replace'](/\$(?:\[|\<|\{)(.*?)(?:\]|\>|\})/gi,(_0x3fe540,_0x529bb9)=>this[_0x4929da(0x454)](String(_0x529bb9))),_0x238e09=String(_0x238e09)[_0x4929da(0x2fd)](/\\(?:KEY|TL|TRANSLATE|LOC|LOCALIZE|LOCALE)(?:\[|\<|\{)(.*?)(?:\]|\>|\})/gi,(_0x5eef1c,_0x2f943e)=>this['getLocalizedText'](String(_0x2f943e))),_0x238e09=String(_0x238e09)[_0x4929da(0x2fd)](/\x1b(?:KEY|TL|TRANSLATE|LOC|LOCALIZE|LOCALE)(?:\[|\<|\{)(.*?)(?:\]|\>|\})/gi,(_0x4073cd,_0x3f11a8)=>this[_0x4929da(0x454)](String(_0x3f11a8))),_0x238e09;},TextManager[_0x4b39fb(0x454)]=function(_0x1153ea){const _0x37fd9c=_0x4b39fb;if(!$dataLocalization)return'';const _0x12f6cc=$dataLocalization[_0x1153ea[_0x37fd9c(0x21c)]()[_0x37fd9c(0x317)]()];if(!_0x12f6cc)return;const _0x3a5391=ConfigManager[_0x37fd9c(0x3b7)]||_0x37fd9c(0x465);let _0x35d4b7=_0x12f6cc[_0x3a5391]||_0x37fd9c(0x35a);return _0x35d4b7=_0x35d4b7[_0x37fd9c(0x2fd)](/\\/g,'\x1b'),_0x35d4b7=_0x35d4b7['replace'](/<SEMI(?:|-COLON|COLON)>/gi,';'),_0x35d4b7;},TextManager[_0x4b39fb(0x1c1)]=function(_0x2d7e14){const _0x155381=_0x4b39fb;return VisuMZ[_0x155381(0x18d)][_0x155381(0x494)]['Localization'][_0x2d7e14]||'';},TextManager[_0x4b39fb(0x438)]=function(){const _0x3607f5=_0x4b39fb,_0xc80823=ConfigManager['textLocale']||_0x3607f5(0x465);return this[_0x3607f5(0x1c1)](_0xc80823);},TextManager[_0x4b39fb(0x3c7)]=function(_0x5978f7){const _0x2ab324=_0x4b39fb,_0x4a11ef=VisuMZ[_0x2ab324(0x18d)][_0x2ab324(0x494)][_0x2ab324(0x235)][_0x2ab324(0x26a)]||[];let _0x5ac9bf=_0x4a11ef[_0x2ab324(0x365)](ConfigManager['textLocale']||'English');_0x5ac9bf+=_0x5978f7;const _0x2d2b84=_0x4a11ef[_0x5ac9bf]||'';return this[_0x2ab324(0x1c1)](_0x2d2b84);},VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x557)]=Game_System[_0x4b39fb(0x46a)][_0x4b39fb(0x26b)],Game_System[_0x4b39fb(0x46a)][_0x4b39fb(0x26b)]=function(){const _0x437595=_0x4b39fb;let _0x5d9437=VisuMZ['MessageCore']['Game_System_mainFontFace'][_0x437595(0x408)](this);if(ConfigManager&&ConfigManager[_0x437595(0x4a6)]!==undefined&&ConfigManager[_0x437595(0x4a6)]>0x0)return _0x5d9437;else{const _0x226703=ConfigManager[_0x437595(0x3b7)]||_0x437595(0x465),_0x3fa42a=VisuMZ[_0x437595(0x18d)][_0x437595(0x494)]['LanguageFonts'];return _0x3fa42a[_0x226703]!==undefined&&(_0x5d9437=_0x3fa42a[_0x226703]+',\x20'+$dataSystem[_0x437595(0x42e)][_0x437595(0x294)]),_0x5d9437;}},VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x46b)]=Window_Command[_0x4b39fb(0x46a)][_0x4b39fb(0x26c)],Window_Command[_0x4b39fb(0x46a)][_0x4b39fb(0x26c)]=function(_0x48988b,_0x27f62b,_0x39c792,_0x3f29a9){const _0x1cc312=_0x4b39fb;if(TextManager[_0x1cc312(0x1d1)]&&TextManager[_0x1cc312(0x386)]()){const _0x5134cb=String(_0x48988b)[_0x1cc312(0x21c)]()[_0x1cc312(0x317)]();if($dataLocalization[_0x5134cb]&&_0x5134cb[_0x1cc312(0x3d0)]>0x0){const _0x104204=ConfigManager[_0x1cc312(0x3b7)]||'English';_0x48988b=$dataLocalization[_0x5134cb][_0x104204]||_0x1cc312(0x35a);}}VisuMZ[_0x1cc312(0x18d)][_0x1cc312(0x46b)]['call'](this,_0x48988b,_0x27f62b,_0x39c792,_0x3f29a9);},Window_StatusBase[_0x4b39fb(0x46a)][_0x4b39fb(0x482)]=function(_0x418c84,_0x420ef8){const _0x334040=_0x4b39fb,_0x774c1d=_0x418c84['equipSlots']();let _0x4a4264=$dataSystem[_0x334040(0x41f)][_0x774c1d[_0x420ef8]];if(TextManager[_0x334040(0x1d1)]){const _0x4d7d50=String(_0x4a4264)[_0x334040(0x21c)]()[_0x334040(0x317)]();if(TextManager[_0x334040(0x386)]()&&$dataLocalization[_0x4d7d50]){const _0x1cdd69=ConfigManager['textLocale']||'English';_0x4a4264=$dataLocalization[_0x4d7d50][_0x1cdd69]||_0x334040(0x35a);}}return _0x4a4264;},Game_Temp['prototype'][_0x4b39fb(0x538)]=function(_0xcb94f0){const _0x1e3fcb=_0x4b39fb;this[_0x1e3fcb(0x3aa)]=_0xcb94f0;},Game_Temp[_0x4b39fb(0x46a)][_0x4b39fb(0x214)]=function(){const _0x4a2f68=_0x4b39fb;return this[_0x4a2f68(0x3aa)];},VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x546)]=Game_Interpreter['prototype'][_0x4b39fb(0x290)],Game_Interpreter[_0x4b39fb(0x46a)][_0x4b39fb(0x290)]=function(_0x2206e4){const _0x1c689e=_0x4b39fb;return $gameTemp[_0x1c689e(0x538)](this),VisuMZ['MessageCore'][_0x1c689e(0x546)]['call'](this,_0x2206e4);},VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x295)]=Game_System['prototype']['initialize'],Game_System[_0x4b39fb(0x46a)][_0x4b39fb(0x4f2)]=function(){const _0x53be22=_0x4b39fb;VisuMZ[_0x53be22(0x18d)][_0x53be22(0x295)][_0x53be22(0x408)](this),this[_0x53be22(0x384)]();},Game_System[_0x4b39fb(0x46a)][_0x4b39fb(0x384)]=function(){const _0x173847=_0x4b39fb,_0x518d88=VisuMZ[_0x173847(0x18d)]['Settings'][_0x173847(0x447)],_0x30ba6e=VisuMZ[_0x173847(0x18d)][_0x173847(0x494)][_0x173847(0x231)];this['_MessageCoreSettings']={'messageRows':_0x518d88[_0x173847(0x2d7)],'messageWidth':_0x518d88[_0x173847(0x4e0)],'messageWordWrap':_0x30ba6e[_0x173847(0x375)],'helpWordWrap':_0x30ba6e[_0x173847(0x405)],'choiceLineHeight':_0x518d88[_0x173847(0x321)],'choiceMinWidth':_0x518d88[_0x173847(0x1d2)]??0x60,'choiceRows':_0x518d88[_0x173847(0x324)],'choiceCols':_0x518d88['ChoiceWindowMaxCols'],'choiceTextAlign':_0x518d88[_0x173847(0x215)],'choiceDistance':0x0},this[_0x173847(0x303)]===undefined&&(this[_0x173847(0x303)]=_0x518d88[_0x173847(0x33c)],this['_messageOffsetY']=_0x518d88[_0x173847(0x24d)]);},Game_System['prototype'][_0x4b39fb(0x22d)]=function(){const _0x18d5ea=_0x4b39fb;if(this[_0x18d5ea(0x56b)]===undefined)this[_0x18d5ea(0x384)]();if(this['_MessageCoreSettings'][_0x18d5ea(0x43a)]===undefined)this['initMessageCore']();return this[_0x18d5ea(0x56b)]['messageRows'];},Game_System['prototype'][_0x4b39fb(0x40f)]=function(_0x46f735){const _0x56f57d=_0x4b39fb;if(this[_0x56f57d(0x56b)]===undefined)this['initMessageCore']();if(this[_0x56f57d(0x56b)][_0x56f57d(0x43a)]===undefined)this[_0x56f57d(0x384)]();this[_0x56f57d(0x56b)][_0x56f57d(0x43a)]=_0x46f735||0x1;},Game_System['prototype'][_0x4b39fb(0x468)]=function(){const _0x3d2efc=_0x4b39fb;if(this['_MessageCoreSettings']===undefined)this[_0x3d2efc(0x384)]();if(this[_0x3d2efc(0x56b)][_0x3d2efc(0x4f0)]===undefined)this[_0x3d2efc(0x384)]();return this[_0x3d2efc(0x56b)][_0x3d2efc(0x4f0)];},Game_System[_0x4b39fb(0x46a)][_0x4b39fb(0x2e1)]=function(_0x73dd44){const _0x4ea225=_0x4b39fb;if(this[_0x4ea225(0x56b)]===undefined)this['initMessageCore']();if(this[_0x4ea225(0x56b)][_0x4ea225(0x4f0)]===undefined)this[_0x4ea225(0x384)]();_0x73dd44=Math['ceil'](_0x73dd44);if(_0x73dd44%0x2!==0x0)_0x73dd44+=0x1;this[_0x4ea225(0x56b)][_0x4ea225(0x4f0)]=_0x73dd44||0x2;},Game_System['prototype']['isMessageWindowWordWrap']=function(){const _0x619295=_0x4b39fb;if(this[_0x619295(0x56b)]===undefined)this[_0x619295(0x384)]();if(this[_0x619295(0x56b)]['messageWordWrap']===undefined)this[_0x619295(0x384)]();return this[_0x619295(0x56b)][_0x619295(0x2dd)];},Game_System[_0x4b39fb(0x46a)][_0x4b39fb(0x207)]=function(_0x2bf5e5){const _0x3c55f0=_0x4b39fb;if(this[_0x3c55f0(0x56b)]===undefined)this[_0x3c55f0(0x384)]();if(this[_0x3c55f0(0x56b)]['messageWordWrap']===undefined)this[_0x3c55f0(0x384)]();this[_0x3c55f0(0x56b)][_0x3c55f0(0x2dd)]=_0x2bf5e5;},Game_System[_0x4b39fb(0x46a)][_0x4b39fb(0x372)]=function(){const _0x22c4fb=_0x4b39fb;if(this[_0x22c4fb(0x303)]===undefined){const _0x4068b8=VisuMZ[_0x22c4fb(0x18d)][_0x22c4fb(0x494)][_0x22c4fb(0x447)];this[_0x22c4fb(0x303)]=_0x4068b8['MsgWindowOffsetX'],this[_0x22c4fb(0x1f3)]=_0x4068b8[_0x22c4fb(0x24d)];}return{'x':this[_0x22c4fb(0x303)]||0x0,'y':this['_messageOffsetY']||0x0};},Game_System['prototype']['setMessageWindowXyOffsets']=function(_0x50a073,_0x38abf8){const _0x38fbf7=_0x4b39fb;if(this[_0x38fbf7(0x56b)]===undefined)this[_0x38fbf7(0x384)]();this['_messageOffsetX']=_0x50a073,this[_0x38fbf7(0x1f3)]=_0x38abf8;},Game_System['prototype'][_0x4b39fb(0x1b7)]=function(){const _0x54ea6c=_0x4b39fb;if(this[_0x54ea6c(0x56b)]===undefined)this[_0x54ea6c(0x384)]();if(this[_0x54ea6c(0x56b)][_0x54ea6c(0x4d2)]===undefined)this[_0x54ea6c(0x384)]();return this['_MessageCoreSettings'][_0x54ea6c(0x4d2)];},Game_System[_0x4b39fb(0x46a)]['setHelpWindowWordWrap']=function(_0x2fb921){const _0x190ab7=_0x4b39fb;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this['_MessageCoreSettings'][_0x190ab7(0x4d2)]===undefined)this[_0x190ab7(0x384)]();this['_MessageCoreSettings'][_0x190ab7(0x4d2)]=_0x2fb921;},Game_System[_0x4b39fb(0x46a)][_0x4b39fb(0x19e)]=function(){const _0x342ef4=_0x4b39fb;if(this[_0x342ef4(0x56b)]===undefined)this['initMessageCore']();if(this['_MessageCoreSettings'][_0x342ef4(0x224)]===undefined)this['initMessageCore']();return this[_0x342ef4(0x56b)][_0x342ef4(0x224)];},Game_System['prototype'][_0x4b39fb(0x3f7)]=function(_0x16a7a6){const _0x2aef01=_0x4b39fb;if(this['_MessageCoreSettings']===undefined)this[_0x2aef01(0x384)]();if(this['_MessageCoreSettings'][_0x2aef01(0x224)]===undefined)this[_0x2aef01(0x384)]();this[_0x2aef01(0x56b)][_0x2aef01(0x224)]=_0x16a7a6||0x1;},Game_System[_0x4b39fb(0x46a)][_0x4b39fb(0x4ec)]=function(){const _0x357852=_0x4b39fb;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();return this[_0x357852(0x56b)][_0x357852(0x3b6)]??0x60;},Game_System[_0x4b39fb(0x46a)][_0x4b39fb(0x2d1)]=function(_0x497e9a){const _0x480926=_0x4b39fb;if(this['_MessageCoreSettings']===undefined)this[_0x480926(0x384)]();this[_0x480926(0x56b)]['choiceMinWidth']=_0x497e9a||0x0;},Game_System[_0x4b39fb(0x46a)]['getChoiceListMaxRows']=function(){const _0x2eafa0=_0x4b39fb;if(this[_0x2eafa0(0x56b)]===undefined)this[_0x2eafa0(0x384)]();if(this[_0x2eafa0(0x56b)][_0x2eafa0(0x1ad)]===undefined)this['initMessageCore']();return this[_0x2eafa0(0x56b)][_0x2eafa0(0x1ad)];},Game_System[_0x4b39fb(0x46a)][_0x4b39fb(0x486)]=function(_0x45cb39){const _0x601607=_0x4b39fb;if(this[_0x601607(0x56b)]===undefined)this['initMessageCore']();if(this[_0x601607(0x56b)][_0x601607(0x1ad)]===undefined)this['initMessageCore']();this[_0x601607(0x56b)][_0x601607(0x1ad)]=_0x45cb39||0x1;},Game_System[_0x4b39fb(0x46a)]['getChoiceListMaxColumns']=function(){const _0x27aa78=_0x4b39fb;if(this[_0x27aa78(0x56b)]===undefined)this[_0x27aa78(0x384)]();if(this['_MessageCoreSettings'][_0x27aa78(0x388)]===undefined)this[_0x27aa78(0x384)]();return this[_0x27aa78(0x56b)][_0x27aa78(0x388)];},Game_System[_0x4b39fb(0x46a)][_0x4b39fb(0x3fd)]=function(_0x4130d3){const _0x3a4065=_0x4b39fb;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this['_MessageCoreSettings'][_0x3a4065(0x388)]===undefined)this[_0x3a4065(0x384)]();this[_0x3a4065(0x56b)][_0x3a4065(0x388)]=_0x4130d3||0x1;},Game_System[_0x4b39fb(0x46a)][_0x4b39fb(0x24a)]=function(){const _0x3a4b16=_0x4b39fb;if(this[_0x3a4b16(0x56b)]===undefined)this[_0x3a4b16(0x384)]();if(this[_0x3a4b16(0x56b)][_0x3a4b16(0x2e0)]===undefined)this[_0x3a4b16(0x384)]();return this[_0x3a4b16(0x56b)][_0x3a4b16(0x2e0)];},Game_System[_0x4b39fb(0x46a)][_0x4b39fb(0x37c)]=function(_0xf3de2a){const _0x296b61=_0x4b39fb;if(this[_0x296b61(0x56b)]===undefined)this['initMessageCore']();if(this[_0x296b61(0x56b)]['choiceTextAlign']===undefined)this['initMessageCore']();this[_0x296b61(0x56b)][_0x296b61(0x2e0)]=_0xf3de2a[_0x296b61(0x21c)]();},Game_System['prototype'][_0x4b39fb(0x29c)]=function(){const _0x3bd571=_0x4b39fb;if(this[_0x3bd571(0x56b)]===undefined)this[_0x3bd571(0x384)]();return this[_0x3bd571(0x56b)][_0x3bd571(0x38d)]||0x0;},Game_System[_0x4b39fb(0x46a)][_0x4b39fb(0x2a4)]=function(_0x3e8c13){const _0x1ee6aa=_0x4b39fb;if(this['_MessageCoreSettings']===undefined)this[_0x1ee6aa(0x384)]();this['_MessageCoreSettings'][_0x1ee6aa(0x38d)]=_0x3e8c13||0x0;},Game_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x23e)]=function(_0x3dcd71,_0x4fc15c){const _0x376c92=_0x4b39fb;this[_0x376c92(0x197)]=_0x3dcd71,this[_0x376c92(0x371)]=_0x376c92(0x230),this['_itemChoiceWtypeId']=_0x4fc15c,this[_0x376c92(0x1dd)]=0x0;},Game_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x285)]=function(){const _0x1437b8=_0x4b39fb;return this[_0x1437b8(0x4ed)]||0x0;},Game_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x2f0)]=function(_0x3ea3ef,_0x1f9e3b,_0x4e9075){const _0x255c91=_0x4b39fb;this[_0x255c91(0x197)]=_0x3ea3ef,this[_0x255c91(0x371)]=_0x255c91(0x3a6),this[_0x255c91(0x3df)]=_0x1f9e3b,this[_0x255c91(0x1dd)]=_0x4e9075;},Game_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x3c8)]=function(){return this['_itemChoiceAtypeId']||0x0;},Game_Message['prototype'][_0x4b39fb(0x1db)]=function(){const _0x184dae=_0x4b39fb;return this[_0x184dae(0x1dd)]||0x0;},Game_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x4f6)]=function(_0x34fb6f,_0x2b39f2,_0x450c91){const _0x953ddb=_0x4b39fb;this[_0x953ddb(0x197)]=_0x34fb6f,this['_itemChoiceItypeId']='skill',this[_0x953ddb(0x453)]=_0x2b39f2,this[_0x953ddb(0x268)]=_0x450c91;},Game_Message['prototype']['itemChoiceActorId']=function(){const _0x185757=_0x4b39fb;return this[_0x185757(0x453)]||0x0;},Game_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x48d)]=function(){const _0x298290=_0x4b39fb;return $gameActors['actor'](this[_0x298290(0x513)]())||$gameParty[_0x298290(0x3b4)]()||null;},Game_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x27e)]=function(){const _0x4421ce=_0x4b39fb;return this[_0x4421ce(0x268)]||0x0;},VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x3a3)]=Game_Message[_0x4b39fb(0x46a)]['setChoices'],Game_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x432)]=function(_0x380e13,_0x3d6757,_0x253c90){const _0x2a53e0=_0x4b39fb;this[_0x2a53e0(0x2c7)]=!![],VisuMZ[_0x2a53e0(0x18d)]['Game_Message_setChoices'][_0x2a53e0(0x408)](this,_0x380e13,_0x3d6757,_0x253c90);},Game_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x3f2)]=function(){const _0x2e5b5f=_0x4b39fb;this['_scriptCall']=![],this[_0x2e5b5f(0x36a)]=[];const _0x9c382c=this[_0x2e5b5f(0x476)]['length'];this[_0x2e5b5f(0x270)]=_0x9c382c;let _0x145182=![];for(let _0x1ceea7=0x0;_0x1ceea7<_0x9c382c;_0x1ceea7++){let _0x2877d2=this[_0x2e5b5f(0x476)][_0x1ceea7];_0x2877d2[_0x2e5b5f(0x204)](/<SHUFFLE>/gi)&&(_0x145182=!![],_0x2877d2=_0x2877d2['replace'](/<SHUFFLE>/gi,'')),_0x2877d2[_0x2e5b5f(0x204)](/<SHUFFLE:[ ](\d+)>/gi)&&(_0x145182=!![],this[_0x2e5b5f(0x270)]=Math[_0x2e5b5f(0x42a)](Number(RegExp['$1']),this[_0x2e5b5f(0x270)]),_0x2877d2=_0x2877d2[_0x2e5b5f(0x2fd)](/<SHUFFLE:[ ](\d+)>/gi,'')),_0x2877d2['match'](/<SHUFFLE: VAR[ ](\d+)>/gi)&&(_0x145182=!![],this['_maxShuffleChoices']=Math[_0x2e5b5f(0x42a)]($gameVariables[_0x2e5b5f(0x1c3)](Number(RegExp['$1']))||0x1,this['_maxShuffleChoices']),_0x2877d2=_0x2877d2['replace'](/<SHUFFLE:[ ]VAR (\d+)>/gi,'')),this['_choiceIndexArray'][_0x2e5b5f(0x1ee)](_0x1ceea7),this[_0x2e5b5f(0x476)][_0x1ceea7]=_0x2877d2;}if(_0x145182){this[_0x2e5b5f(0x36a)]=VisuMZ[_0x2e5b5f(0x18d)][_0x2e5b5f(0x37a)](this[_0x2e5b5f(0x36a)]);if(this[_0x2e5b5f(0x279)]()!==-0x2)this['_choiceCancelType']=-0x1;}},VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x37a)]=function(_0x2fc702){const _0x23c880=_0x4b39fb;var _0x28cebe,_0x40a96b,_0x2edb57;for(_0x2edb57=_0x2fc702[_0x23c880(0x3d0)]-0x1;_0x2edb57>0x0;_0x2edb57--){_0x28cebe=Math[_0x23c880(0x276)](Math[_0x23c880(0x3bc)]()*(_0x2edb57+0x1)),_0x40a96b=_0x2fc702[_0x2edb57],_0x2fc702[_0x2edb57]=_0x2fc702[_0x28cebe],_0x2fc702[_0x28cebe]=_0x40a96b;}return _0x2fc702;},Game_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x265)]=function(){const _0x395949=_0x4b39fb;if(!this[_0x395949(0x36a)])this[_0x395949(0x3f2)]();return this['_choiceIndexArray'];},Game_Message['prototype'][_0x4b39fb(0x4ac)]=function(){const _0x4cbff6=_0x4b39fb;if(this[_0x4cbff6(0x270)]===undefined)this[_0x4cbff6(0x3f2)]();return this[_0x4cbff6(0x270)];},VisuMZ['MessageCore'][_0x4b39fb(0x329)]=Game_Screen[_0x4b39fb(0x46a)]['clearPictures'],Game_Screen[_0x4b39fb(0x46a)][_0x4b39fb(0x349)]=function(){const _0xda6844=_0x4b39fb;VisuMZ['MessageCore']['Game_Screen_clearPictures'][_0xda6844(0x408)](this),this[_0xda6844(0x556)]();},Game_Screen['prototype'][_0x4b39fb(0x556)]=function(){const _0x40ece7=_0x4b39fb;this[_0x40ece7(0x2ab)]=[],this[_0x40ece7(0x2f3)]=[],this[_0x40ece7(0x2d5)]=[];},Game_Screen[_0x4b39fb(0x46a)]['getPictureTextData']=function(_0x15f1bf){const _0xac5e45=_0x4b39fb;if(this[_0xac5e45(0x2ab)]===undefined)this[_0xac5e45(0x556)]();const _0x566025=this[_0xac5e45(0x2e5)](_0x15f1bf);return this[_0xac5e45(0x2ab)][_0x566025]=this[_0xac5e45(0x2ab)][_0x566025]||{},this['_pictureText'][_0x566025];},Game_Screen[_0x4b39fb(0x46a)]['getPictureText']=function(_0x426f9f,_0x359819){const _0x24fa1f=_0x4b39fb;return _0x359819=_0x359819['toLowerCase']()[_0x24fa1f(0x317)](),this['getPictureTextData'](_0x426f9f)[_0x359819]||'';},Game_Screen[_0x4b39fb(0x46a)]['setPictureText']=function(_0x4ee4b9,_0x12dc9b,_0x12a477){const _0x3d7a7f=_0x4b39fb;_0x12a477=_0x12a477[_0x3d7a7f(0x21c)]()['trim'](),this[_0x3d7a7f(0x35d)](_0x4ee4b9)[_0x12a477]=_0x12dc9b||'',this[_0x3d7a7f(0x3d3)](_0x4ee4b9,!![]);},Game_Screen[_0x4b39fb(0x46a)][_0x4b39fb(0x32e)]=function(_0x181471){const _0x37ee83=_0x4b39fb;if(this[_0x37ee83(0x2ab)]===undefined)this['clearAllPictureTexts']();const _0xaaef3=this['realPictureId'](_0x181471);this[_0x37ee83(0x2ab)][_0xaaef3]=null,this[_0x37ee83(0x3d3)](_0x181471,!![]);},Game_Screen['prototype'][_0x4b39fb(0x4de)]=function(_0x38e341){const _0x29cc9e=_0x4b39fb;if(this[_0x29cc9e(0x2ab)]===undefined)this['clearAllPictureTexts']();const _0x87388d=this[_0x29cc9e(0x2e5)](_0x38e341);return this[_0x29cc9e(0x2f3)][_0x87388d]||0x0;},Game_Screen[_0x4b39fb(0x46a)]['setPictureTextBuffer']=function(_0x31d782,_0x48ca17){const _0x5dbe92=_0x4b39fb;if(this['_pictureText']===undefined)this[_0x5dbe92(0x556)]();const _0x50124d=this['realPictureId'](_0x31d782);this[_0x5dbe92(0x2f3)][_0x50124d]=Math[_0x5dbe92(0x1ea)](0x0,_0x48ca17);},Game_Screen[_0x4b39fb(0x46a)][_0x4b39fb(0x440)]=function(_0x4d9a37){const _0x32de0a=_0x4b39fb;if(this[_0x32de0a(0x2ab)]===undefined)this[_0x32de0a(0x556)]();const _0x2c0d94=this[_0x32de0a(0x2e5)](_0x4d9a37);this[_0x32de0a(0x2f3)][_0x2c0d94]=undefined;},VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x337)]=Game_Screen[_0x4b39fb(0x46a)]['erasePicture'],Game_Screen[_0x4b39fb(0x46a)][_0x4b39fb(0x348)]=function(_0xa76cc){const _0x64b202=_0x4b39fb;VisuMZ['MessageCore']['Game_Screen_erasePicture'][_0x64b202(0x408)](this,_0xa76cc),this[_0x64b202(0x32e)](_0xa76cc),this[_0x64b202(0x440)](_0xa76cc),this[_0x64b202(0x3d3)](_0xa76cc,!![]);},Game_Screen['prototype'][_0x4b39fb(0x2eb)]=function(){const _0x38cb62=_0x4b39fb;for(const _0x111e42 of this[_0x38cb62(0x4ae)]){if(_0x111e42){let _0x2632fc=this[_0x38cb62(0x4ae)][_0x38cb62(0x365)](_0x111e42);this[_0x38cb62(0x3d3)](_0x2632fc);}}},Game_Screen[_0x4b39fb(0x46a)]['requestPictureTextRefresh']=function(_0x4cb291,_0x247bb0){const _0x436803=_0x4b39fb;this[_0x436803(0x2d5)]=this[_0x436803(0x2d5)]||[],(this[_0x436803(0x2b7)](_0x4cb291)||_0x247bb0)&&this[_0x436803(0x2d5)]['push'](_0x4cb291);},Game_Screen[_0x4b39fb(0x46a)][_0x4b39fb(0x40e)]=function(_0x517e94){const _0x18bfc7=_0x4b39fb;return this[_0x18bfc7(0x2d5)]=this[_0x18bfc7(0x2d5)]||[],this[_0x18bfc7(0x2d5)][_0x18bfc7(0x287)](_0x517e94);},Game_Screen[_0x4b39fb(0x46a)][_0x4b39fb(0x469)]=function(_0x33c04e){const _0x4d88d0=_0x4b39fb;this['_pictureTextRefresh']=this[_0x4d88d0(0x2d5)]||[],this[_0x4d88d0(0x2d5)]['remove'](_0x33c04e);},Game_Screen[_0x4b39fb(0x46a)][_0x4b39fb(0x2b7)]=function(_0x136f97){const _0x386d75=_0x4b39fb,_0x5d66fe=['upperleft','up','upperright',_0x386d75(0x298),'center',_0x386d75(0x32a),_0x386d75(0x2ac),_0x386d75(0x4d6),_0x386d75(0x547)];return _0x5d66fe[_0x386d75(0x3d4)](_0x4f677f=>this[_0x386d75(0x555)](_0x136f97,_0x4f677f)!=='');},VisuMZ[_0x4b39fb(0x18d)]['Game_Party_initialize']=Game_Party[_0x4b39fb(0x46a)][_0x4b39fb(0x4f2)],Game_Party[_0x4b39fb(0x46a)][_0x4b39fb(0x4f2)]=function(){const _0x1fbe4c=_0x4b39fb;VisuMZ['MessageCore'][_0x1fbe4c(0x1e8)][_0x1fbe4c(0x408)](this),this[_0x1fbe4c(0x384)]();},Game_Party[_0x4b39fb(0x46a)]['initMessageCore']=function(){this['_lastGainedItemData']={'type':0x0,'id':0x0,'quantity':0x0};},Game_Party['prototype'][_0x4b39fb(0x47c)]=function(){const _0x3ca39e=_0x4b39fb;if(this[_0x3ca39e(0x39e)]===undefined)this[_0x3ca39e(0x384)]();return this[_0x3ca39e(0x39e)];},Game_Party['prototype']['setLastGainedItemData']=function(_0xb78cdc,_0x554f60){const _0x229291=_0x4b39fb;if(this[_0x229291(0x39e)]===undefined)this[_0x229291(0x384)]();if(!_0xb78cdc)return;if(DataManager[_0x229291(0x39c)](_0xb78cdc))this['_lastGainedItemData'][_0x229291(0x4c4)]=0x0;else{if(DataManager[_0x229291(0x4c5)](_0xb78cdc))this[_0x229291(0x39e)][_0x229291(0x4c4)]=0x1;else DataManager[_0x229291(0x2bd)](_0xb78cdc)&&(this['_lastGainedItemData'][_0x229291(0x4c4)]=0x2);}this[_0x229291(0x39e)]['id']=_0xb78cdc['id'],this[_0x229291(0x39e)][_0x229291(0x3f5)]=_0x554f60;},VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x47a)]=Game_Party[_0x4b39fb(0x46a)][_0x4b39fb(0x330)],Game_Party[_0x4b39fb(0x46a)][_0x4b39fb(0x330)]=function(_0x5938d0,_0x4836e2,_0x4dcfb1){const _0x3c7c13=_0x4b39fb;VisuMZ[_0x3c7c13(0x18d)][_0x3c7c13(0x47a)][_0x3c7c13(0x408)](this,_0x5938d0,_0x4836e2,_0x4dcfb1),_0x4836e2>0x0&&this[_0x3c7c13(0x1a9)](_0x5938d0,_0x4836e2);},VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x244)]=Game_Map[_0x4b39fb(0x46a)][_0x4b39fb(0x4f2)],Game_Map['prototype'][_0x4b39fb(0x4f2)]=function(){const _0x26cf14=_0x4b39fb;VisuMZ['MessageCore'][_0x26cf14(0x244)][_0x26cf14(0x408)](this),this['_messageCommonEvents']=[];},VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x3cc)]=Game_Map[_0x4b39fb(0x46a)]['setupEvents'],Game_Map[_0x4b39fb(0x46a)][_0x4b39fb(0x4b0)]=function(){const _0xd8e450=_0x4b39fb;VisuMZ[_0xd8e450(0x18d)][_0xd8e450(0x3cc)][_0xd8e450(0x408)](this),this['_messageCommonEvents']=[];},VisuMZ['MessageCore'][_0x4b39fb(0x4cf)]=Game_Map[_0x4b39fb(0x46a)][_0x4b39fb(0x1a1)],Game_Map[_0x4b39fb(0x46a)]['updateEvents']=function(){const _0xd978b1=_0x4b39fb;VisuMZ[_0xd978b1(0x18d)]['Game_Map_updateEvents'][_0xd978b1(0x408)](this),this[_0xd978b1(0x210)]();},Game_Map[_0x4b39fb(0x46a)][_0x4b39fb(0x4e7)]=function(_0x3cf4cd){const _0x2cfd5d=_0x4b39fb;if(!$dataCommonEvents[_0x3cf4cd])return;this['_messageCommonEvents']=this[_0x2cfd5d(0x1f4)]||[];const _0x44e85b=this[_0x2cfd5d(0x266)][_0x2cfd5d(0x458)],_0x38386b=new Game_MessageCommonEvent(_0x3cf4cd,_0x44e85b);this['_messageCommonEvents'][_0x2cfd5d(0x1ee)](_0x38386b);},Game_Map['prototype'][_0x4b39fb(0x210)]=function(){const _0x45ef59=_0x4b39fb;this[_0x45ef59(0x1f4)]=this[_0x45ef59(0x1f4)]||[];for(const _0x36ea14 of this['_messageCommonEvents']){!_0x36ea14[_0x45ef59(0x266)]?this[_0x45ef59(0x1f4)][_0x45ef59(0x497)](_0x36ea14):_0x36ea14['update']();}},VisuMZ[_0x4b39fb(0x18d)]['Game_Map_refresh']=Game_Map[_0x4b39fb(0x46a)]['refresh'],Game_Map[_0x4b39fb(0x46a)]['refresh']=function(){const _0x43c9ef=_0x4b39fb;VisuMZ[_0x43c9ef(0x18d)]['Game_Map_refresh'][_0x43c9ef(0x408)](this),$gameScreen[_0x43c9ef(0x2eb)]();},Game_Interpreter[_0x4b39fb(0x3ca)]=pluginData['name'],Game_Interpreter[_0x4b39fb(0x46a)][_0x4b39fb(0x1fc)]=function(_0xa9d4bd){const _0x4e3593=_0x4b39fb;if($gameMessage[_0x4e3593(0x4c3)]())return![];return this[_0x4e3593(0x2f8)](_0xa9d4bd),this[_0x4e3593(0x39f)](_0xa9d4bd),this[_0x4e3593(0x413)](_0xa9d4bd),this[_0x4e3593(0x27a)](_0x4e3593(0x312)),!![];},Game_Interpreter[_0x4b39fb(0x46a)]['prepareShowTextCommand']=function(_0x5fa11a){const _0x23d4e5=_0x4b39fb;$gameMessage[_0x23d4e5(0x38c)](_0x5fa11a[0x0],_0x5fa11a[0x1]),$gameMessage[_0x23d4e5(0x27b)](_0x5fa11a[0x2]),$gameMessage[_0x23d4e5(0x3e7)](_0x5fa11a[0x3]),$gameMessage[_0x23d4e5(0x25d)](_0x5fa11a[0x4]);},Game_Interpreter[_0x4b39fb(0x46a)][_0x4b39fb(0x39f)]=function(_0x11168b){const _0x4b85d6=_0x4b39fb;while(this[_0x4b85d6(0x20e)]()){this[_0x4b85d6(0x194)]++;if(this[_0x4b85d6(0x273)]()[_0x4b85d6(0x2cd)]===0x191){let _0x7afe3d=this[_0x4b85d6(0x273)]()[_0x4b85d6(0x26e)][0x0];_0x7afe3d=VisuMZ[_0x4b85d6(0x18d)]['ParseAddedText'](_0x7afe3d),$gameMessage[_0x4b85d6(0x460)](_0x7afe3d);}if(this[_0x4b85d6(0x4b7)]())break;}},Game_Interpreter[_0x4b39fb(0x46a)][_0x4b39fb(0x20e)]=function(){const _0x243b7e=_0x4b39fb;return this[_0x243b7e(0x443)]()===0x65&&$gameSystem[_0x243b7e(0x22d)]()>0x4?!![]:this[_0x243b7e(0x443)]()===0x191;},VisuMZ['MessageCore'][_0x4b39fb(0x1b3)]=function(_0x5419e0){const _0x4e5a40=_0x4b39fb,_0x31800b=VisuMZ[_0x4e5a40(0x18d)]['Settings']['General'];return _0x5419e0=(_0x31800b[_0x4e5a40(0x3cf)]||'')+_0x5419e0+(_0x31800b[_0x4e5a40(0x3c5)]||''),_0x5419e0=_0x5419e0['replace'](/<(?:NEXT PAGE|NEXTPAGE)>/gi,''),_0x5419e0=_0x5419e0[_0x4e5a40(0x2fd)](/<(?:RNG|RAND|RANDOM)>(.*?)<\/(?:RNG|RAND|RANDOM)>/gi,(_0x118561,_0xd6ac8e)=>this['getRandomTextFromPool'](_0xd6ac8e)),_0x5419e0;},VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x271)]=function(_0x29f9c2){const _0x566922=_0x4b39fb,_0xdded64=_0x29f9c2[_0x566922(0x4cd)]('|')[_0x566922(0x22f)](_0x1b19fc=>_0x1b19fc[_0x566922(0x317)]())[_0x566922(0x497)]('')[_0x566922(0x497)](null);return _0xdded64[Math[_0x566922(0x33b)](_0xdded64['length'])];},Game_Interpreter[_0x4b39fb(0x46a)][_0x4b39fb(0x4b7)]=function(){const _0x5659c5=_0x4b39fb;if(this[_0x5659c5(0x273)]()&&this[_0x5659c5(0x273)]()[_0x5659c5(0x26e)][0x0][_0x5659c5(0x204)](/<(?:NEXT PAGE|NEXTPAGE)>/gi))return!![];return $gameMessage[_0x5659c5(0x4b9)][_0x5659c5(0x3d0)]>=$gameSystem[_0x5659c5(0x22d)]()&&this['nextEventCode']()!==0x191;},Game_Interpreter[_0x4b39fb(0x46a)]['prepareShowTextFollowups']=function(_0x2edb73){const _0x4c4acd=_0x4b39fb;switch(this[_0x4c4acd(0x443)]()){case 0x66:this[_0x4c4acd(0x194)]++,this[_0x4c4acd(0x29f)](this[_0x4c4acd(0x273)]()[_0x4c4acd(0x26e)]);break;case 0x67:this['_index']++,this[_0x4c4acd(0x1ac)](this[_0x4c4acd(0x273)]()[_0x4c4acd(0x26e)]);break;case 0x68:this['_index']++,this[_0x4c4acd(0x2f4)](this['currentCommand']()[_0x4c4acd(0x26e)]);break;case 0x165:const _0x2dd457=this[_0x4c4acd(0x461)][this[_0x4c4acd(0x194)]+0x1],_0x5de5e2=_0x2dd457[_0x4c4acd(0x26e)];_0x5de5e2[0x0]===Game_Interpreter[_0x4c4acd(0x3ca)]&&this[_0x4c4acd(0x209)](_0x5de5e2);break;}},VisuMZ[_0x4b39fb(0x18d)]['Game_Interpreter_setupChoices']=Game_Interpreter[_0x4b39fb(0x46a)][_0x4b39fb(0x29f)],Game_Interpreter[_0x4b39fb(0x46a)][_0x4b39fb(0x29f)]=function(_0x54721d){const _0x46263a=_0x4b39fb;_0x54721d=this[_0x46263a(0x515)](),VisuMZ[_0x46263a(0x18d)][_0x46263a(0x309)][_0x46263a(0x408)](this,_0x54721d),$gameMessage[_0x46263a(0x3f2)]();},Game_Interpreter[_0x4b39fb(0x46a)][_0x4b39fb(0x515)]=function(){const _0x247312=_0x4b39fb,_0x7e1096=this[_0x247312(0x194)],_0x16a13e=[];let _0x5aefd9=0x0;this[_0x247312(0x194)]++;while(this[_0x247312(0x194)]<this[_0x247312(0x461)][_0x247312(0x3d0)]){if(this['currentCommand']()[_0x247312(0x428)]===this[_0x247312(0x49e)]){if(this[_0x247312(0x273)]()[_0x247312(0x2cd)]===0x194&&this[_0x247312(0x443)]()!==0x66)break;else{if(this[_0x247312(0x273)]()[_0x247312(0x2cd)]===0x66)this[_0x247312(0x237)](_0x5aefd9,this[_0x247312(0x273)](),_0x7e1096),this[_0x247312(0x194)]-=0x2;else this[_0x247312(0x273)]()[_0x247312(0x2cd)]===0x192&&(this[_0x247312(0x273)]()[_0x247312(0x26e)][0x0]=_0x5aefd9,_0x5aefd9++);}}this['_index']++;}return this[_0x247312(0x194)]=_0x7e1096,this[_0x247312(0x273)]()[_0x247312(0x26e)];},Game_Interpreter['prototype']['adjustShowChoiceExtension']=function(_0x1ab196,_0x25afb1,_0x25e5ac){const _0x1a52d7=_0x4b39fb;this[_0x1a52d7(0x248)](_0x1ab196,_0x25afb1,_0x25e5ac),this[_0x1a52d7(0x2b0)](_0x1ab196,_0x25afb1,_0x25e5ac),this['addExtraShowChoices'](_0x25afb1,_0x25e5ac);},Game_Interpreter[_0x4b39fb(0x46a)][_0x4b39fb(0x248)]=function(_0x141c40,_0x5cf10c,_0x3136fc){const _0x5df410=_0x4b39fb;if(_0x5cf10c['parameters'][0x2]<0x0)return;const _0x541d53=_0x5cf10c[_0x5df410(0x26e)][0x2]+_0x141c40;this[_0x5df410(0x461)][_0x3136fc][_0x5df410(0x26e)][0x2]=_0x541d53;},Game_Interpreter[_0x4b39fb(0x46a)][_0x4b39fb(0x2b0)]=function(_0x4d511c,_0x58c439,_0x4211aa){const _0x3f7f1f=_0x4b39fb;if(_0x58c439['parameters'][0x1]>=0x0){var _0x3a2ac0=_0x58c439[_0x3f7f1f(0x26e)][0x1]+_0x4d511c;this[_0x3f7f1f(0x461)][_0x4211aa][_0x3f7f1f(0x26e)][0x1]=_0x3a2ac0;}else _0x58c439[_0x3f7f1f(0x26e)][0x1]===-0x2&&(this['_list'][_0x4211aa]['parameters'][0x1]=_0x58c439[_0x3f7f1f(0x26e)][0x1]);},Game_Interpreter[_0x4b39fb(0x46a)][_0x4b39fb(0x3fe)]=function(_0x540212,_0x30ea12){const _0x375788=_0x4b39fb;for(const _0xf692d6 of _0x540212[_0x375788(0x26e)][0x0]){this[_0x375788(0x461)][_0x30ea12][_0x375788(0x26e)][0x0]['push'](_0xf692d6);}this['_list'][_0x375788(0x2f9)](this[_0x375788(0x194)]-0x1,0x2);},Game_Interpreter[_0x4b39fb(0x46a)]['prepareShowTextPluginCommandFollowups']=function(_0x4d8f47){const _0x4219fb=_0x4b39fb,_0x517d8b=_0x4d8f47[0x1];if(_0x517d8b===_0x4219fb(0x41a))this['_index']++,this[_0x4219fb(0x23e)](_0x4d8f47);else{if(_0x517d8b===_0x4219fb(0x2fc))this[_0x4219fb(0x194)]++,this['setArmorChoice'](_0x4d8f47);else _0x517d8b===_0x4219fb(0x49d)&&Imported[_0x4219fb(0x56f)]&&(this['_index']++,this[_0x4219fb(0x4f6)](_0x4d8f47));}},Game_Interpreter[_0x4b39fb(0x46a)]['setWeaponChoice']=function(_0xcf6025){const _0x430fb6=_0x4b39fb,_0x32e33a=JSON['parse'](JSON['stringify'](_0xcf6025[0x3]));VisuMZ[_0x430fb6(0x2fa)](_0x32e33a,_0x32e33a),$gameMessage[_0x430fb6(0x23e)](_0x32e33a[_0x430fb6(0x46f)]||0x0,_0x32e33a[_0x430fb6(0x2bb)]||0x0);},Game_Interpreter[_0x4b39fb(0x46a)][_0x4b39fb(0x2f0)]=function(_0x452d33){const _0x4e04f7=_0x4b39fb,_0x1d3013=JSON[_0x4e04f7(0x1f8)](JSON[_0x4e04f7(0x3e4)](_0x452d33[0x3]));VisuMZ[_0x4e04f7(0x2fa)](_0x1d3013,_0x1d3013),$gameMessage[_0x4e04f7(0x2f0)](_0x1d3013[_0x4e04f7(0x46f)]||0x0,_0x1d3013[_0x4e04f7(0x300)]||0x0,_0x1d3013['EquipTypeID']||0x0);},Game_Interpreter[_0x4b39fb(0x46a)][_0x4b39fb(0x4f6)]=function(_0x40cec8){const _0x3445ad=_0x4b39fb,_0x370690=JSON[_0x3445ad(0x1f8)](JSON[_0x3445ad(0x3e4)](_0x40cec8[0x3]));VisuMZ[_0x3445ad(0x2fa)](_0x370690,_0x370690),$gameMessage[_0x3445ad(0x4f6)](_0x370690[_0x3445ad(0x46f)]||0x0,_0x370690[_0x3445ad(0x3f4)]||0x0,_0x370690[_0x3445ad(0x3cb)]||0x0);};function Game_MessageCommonEvent(){const _0x329b53=_0x4b39fb;this[_0x329b53(0x4f2)](...arguments);}function _0x43a0(){const _0x3315ee=['Greek','lower-center','itemChoiceActor','CustomFonts','Window_NameBox_refresh','returnPreservedFontSettings','WORD_WRAP_PADDING','Hűha','onNewPageMessageCore','Settings','Tot\x20ziens','_moveTargetY','remove','load','battle\x20enemy','AutoColorBypassList','createChoiceListWindow','none','SelectSkill','_indent','TextMacros','drawBackCenteredPicture','application/csv','addChoiceDistance','ParseStateNotetags','You\x20do\x20not\x20have\x20a\x20language\x20%1\x20set\x20up.\x0a','resizePictureText','textFont','contents','requestChoiceForegroundImage','messageWindowRect','Window_Help_refresh','drawChoiceLocationImage','maxShuffleChoices','Au\x20revoir','_pictures','openLocalizationFolder','setupEvents','applyChoiceHelpDescriptions','ConfigManager_applyData','outputWidth','_targets','moveBy','map\x20actor','isBreakShowTextCommands','Sbohem','_texts','Languages.csv','lower-right','#f26c4f','updateHelp','innerHeight','_choiceListHelpWindow','_autoSizeCheck','defaultColor','_pictureTextWidth','isBusy','type','isWeapon','Good-bye','Αντίο','setup','requestChoiceBackgroundImage','_pictureTextHeight','Thai','processColorLock','split','#7cc576','Game_Map_updateEvents','Auf\x20Wiedersehen','obtainEscapeString','helpWordWrap','ParseArmorNotetags','setText','textCodeCheck','down','getPreservedFontSettings','zoomScale','crisisColor','ParseEnemyNotetags','addWrapBreakAfterPunctuation','_showFast','textSizeEx','getPictureTextBuffer','String_format','MessageWidth','createTextState','#ffffff','drawMessageFace','Sprite_Picture_update','_macroBypassWordWrap','AdjustRect','addMessageCommonEvent','processTextCasing','PictureTextRefresh','_pictureTextWindow','show','getChoiceListMinChoiceWidth','_itemChoiceWtypeId','isPressed','loadGameFonts','messageWidth','changePaintOpacity','initialize','SortObjectByKeyLength','_moveTargetHeight','नमस्ते','setSkillChoice','AddOption','\x1bTEXTALIGNMENT[0]','#fbaf5d','Scene_Boot_onDatabaseLoaded','(((','Window_Base_processAllText','Window_ItemList_drawItemNumber','Window_Message_isTriggered','_currentAutoSize','Window_Base_textSizeEx','_helpWindow','Merhaba','_autoColorActorNames','isRTL','convertCsvToTsvFile','registerSelfEvent','1666567IXTmUz','\x1bi[%1]','isAutoColorAffected','<B>','loadBitmap','Arrivederci','DefaultLocale','convertCasingEscapeCharacters','atypeId','fontItalic','Window_Options_isVolumeSymbol','easeOut','itemChoiceActorId','Sprite_Picture_updateBitmap','addContinuousShowChoices','_messageWindow','Name','updateMove',')))','powerDownColor','Ahoj','strokeRect','\x1bTEXTALIGNMENT[2]','Bitmap_drawText','center','format','easeInOut','VisuMZ_1_EventsMoveCore','convertVariableEscapeCharacters','drawPictureTextZone','setChoiceListHelpWindow','event','violet','TextJS','#c69c6d','_wordWrap','DISABLE','WRAPBREAK','Press\x20Cancel\x20to\x20create\x20new\x20TSV.','startX','itemChoiceItypeId','Window_EventItem_includes','ConvertTextAutoColorRegExpFriendly','_moveDuration','map\x20player','battleTargetName','PictureTextChange','choices','send','setLastPluginCommandInterpreter','itemBackColor1','Window_ChoiceList_updatePlacement','CreateAutoColorFor','makeCommandListScriptCall','Hungarian','Hallo','addMessageCoreLocalizationCommand','Match','<I>','addMessageCoreCommands','outputHeight','</I>','createLocalizationCsvFile','Game_Interpreter_PluginCommand','lowerright','processFailsafeChoice','Window_ChoiceList_callCancelHandler','activate','windowX','item','resetWordWrap','normalColor','getTextAlignment','canMove','refreshDimmerBitmap','</CENTER>','JSON','MaxCols','getPictureText','clearAllPictureTexts','Game_System_mainFontFace','resetTextColor','prepareWordWrapEscapeCharacters','data/','wtypeId','changeVisuMzTextLocale','12UrgQXi','isOptionValid','Selamat\x20tinggal','MessageTextDelay','Do\x20widzenia','Farewell','process_VisuMZ_MessageCore_TextCodes_Replace','startWait','_pictureTextCache','FUNC','updateForcedPlacement','_subject','convertButtonAssistText','Cześć','_MessageCoreSettings','parseChoiceText','</B>','name','VisuMZ_1_SkillsStatesCore','down-right','Window_Message_newPage','_pictureTextSprite','isClosing','textCodeResult','convertTextMacros','etypeId','Greeting','changeTextColor','addLoadListener','\x1bWrapBreak[0]','processDrawPicture','numVisibleRows','upper-left','MessageCore','unshift','getSkillTypes','yellow','NameBoxWindowOffsetY','loadCustomFontsMessageCore','processFontChangeItalic','_index','clamp','Γειά\x20σου','_itemChoiceVariableId','upright','_centerMessageWindow','_spriteset','Would\x20you\x20like\x20the\x20plugin\x20to\x20create\x20the\x20base\x20%1\x20file?\x0a\x0a','downcenter','Window_Message_terminateMessage','getChoiceListLineHeight','NUM','_scene','updateEvents','ITALIC','rtl','updateAutoPosition','Finnish','_data','States','textColor','setLastGainedItemData','follower','こんにちは','setupNumInput','choiceRows','LocalizationType','TSV\x20file\x20is\x20now\x20created\x20and\x20stored\x20in\x20data\x20folder.','makeCommandList','round','Weapons','ParseAddedText','up-center','down-center','anchor','isHelpWindowWordWrap','Window_NameBox_updatePlacement','slice','Bonjour','\x1bCASING[1]','choiceAlignText','_forcedPosition','obtainItem','Items','csv','getLanguageName','DefaultOutlineWidth','value','பிரியாவிடை','Type','_textCasingUpperState','updateDimensions','obtainEscapeParam','lineHeight','setHelpWindow','getChoiceIndent','Languages.tsv','_cancelButton','outlineWidth','middleright','processMessageCoreEscapeActions','parseLocalizedText','ChoiceWindowMinWidth','processTextAlignmentChange','AutoColor','changeChoiceBackgroundColor','TextStr','createPictureText','\x1bCASING[3]','convertFontSettingsEscapeCharacters','SplitJpCnCharacters','itemChoiceEtypeId','SWITCH','_itemChoiceEtypeId','updateBitmap','drawItemContents','victory','processNewLine','textSizeExWordWrap','processAutoPosition','Enemies','changeOutlineColor','statusText','Danish','Game_Party_initialize','OffsetX','max','iconIndex','confirmConvertCsvToTsv','inBattle','push','green','ANY','isPlaytest','</LEFT>','_messageOffsetY','_messageCommonEvents','constructor','_autoPosRegExp','TextSpeed','parse','exec','sort','WRAPJPBREAK','command101','status','processTextAlignmentX','Spanish','textSpeed','Romanian','Adiós','_pictureId','match','onload','CreateAutoColorRegExpListEntries','setMessageWindowWordWrap','update','prepareShowTextPluginCommandFollowups','checkConvertCsvToTsv','Window_MessageLog','NonSupportedTextCodes','MessageWindowXyOffsets','isContinuePrepareShowTextCommands','TsvFilename','updateMessageCommonEvents','midleft','#a186be','preemptive','getLastPluginCommandInterpreter','ChoiceWindowTextAlign','switchOutTextForLocalization','isSceneBattle','onLocalizationXhrLoad','drawTextTopAligned','clearActorNameAutoColor','registerResetRect','toLowerCase','Please\x20restart\x20the\x20game.','_refreshPauseSign','battle\x20party','\x1bWrapJpBreak[0]','version','enabled','Norwegian','choiceLineHeight','calcMoveEasing','anyPictureTextChanges','textSizeExTextAlignment','map\x20event','upper\x20left','convertTextAlignmentEscapeCharacters','resetFontSettings','addMessageCoreTextSpeedCommand','getMessageWindowRows','callCancelHandler','map','weapon','WordWrap','colSpacing','ว้าว','dirname','Localization','Classes','adjustShowChoiceExtension','#acacac','lastGainedObjectQuantity','messageCoreTextSpeed','textSpeedStatusText','CheckCompatibility','refresh','setWeaponChoice','clear','paintOpacity','Guau','battleActionName','messageCoreWindowX','Game_Map_initialize','STR','2TfdWPA','applyDatabaseAutoColor','adjustShowChoiceDefault','setColorLock','getChoiceListTextAlign','partyMemberName','isSkillTypeMatchForUse','MsgWindowOffsetY','Window_Base_initialize','yes','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','onLocalizationXhrError','<LEFT>','system','PictureIDs','Armors','Window_ChoiceList','Window_Message_updatePlacement','Scene_Message_createChoiceListWindow','upperright','ARRAYSTR','isChoiceEnabled','preFlushTextState','setSpeakerName','width','itemBackColor2','convertMessageCoreEscapeActions','choice','processAutoSize','maxCommands','log','choiceIndexArray','_interpreter','maxChoiceWidth','_itemChoiceStypeId','move','Languages','mainFontFace','addCommand','autoPositionOffsetX','parameters','setRelativePosition','_maxShuffleChoices','getRandomTextFromPool','clearFlags','currentCommand','Viszontlátásra','Default','floor','getChoiceListMaxColumns','selectDefault','choiceCancelType','setWaitMode','setBackground','Padding','getConfigValue','itemChoiceStypeId','안녕하세요','LineBreakSpace','changeValue','substr','powerUpColor','createChoiceListHelpWindow','itemChoiceWtypeId','makeData','includes','processCustomWait','setWordWrap','lower\x20center','Undefined','upcenter','open','Window_ChoiceList_windowX','gray','command357','_positionType','NameBoxWindowDefaultColor','text','fallbackFonts','Game_System_initialize','battleUserName','\x1bCOLORLOCK[1]','left','18018495vpbMSA','अलविदा','ImageManager_loadBitmap','getChoiceMessageDistance','commandSymbol','2706255BxGrqJ','setupChoices','EndPadding','ParseSkillNotetags','unnamed','Scene_Boot_loadGameFonts','setChoiceMessageDistance','Indonesian','_moveTargetWidth','lower\x20left','lastGainedObjectIcon','resetPositionX','itemRectWithPadding','_pictureText','lowerleft','downleft','Hejdå','\x1bITALIC[1]','adjustShowChoiceCancel','updateXyOffsets','DataManager_loadDatabase','Bitmap_drawTextTopAligned','in\x20order\x20for\x20VisuMZ_1_MessageCore\x20to\x20work.','mainModule','\x1bCASING[0]','hasPictureText','Hindi','obtainExp','makeSkillList','WeaponTypeID','ARRAYJSON','isArmor','close','synchronizeNameBox','Window_Base_processControlCharacter','return\x20\x27','TightWrap','ஆஹா','fontSize','processCharacter','choiceListHelpWindowRect','_scriptCall','drawPictureText','loadDatabase','336459knPkDd','COLORLOCK','responseText','code','Salut','crisis','वाह','setChoiceListMinChoiceWidth','<CENTER>','processWrapBreak','postFlushTextState','_pictureTextRefresh','startY','MessageRows','convertNewPageTextStateMacros','preConvertEscapeCharacters','windowPadding','convertHardcodedEscapeReplacements','SWITCHES','messageWordWrap','launchMessageCommonEvent','setPictureText','choiceTextAlign','setMessageWindowWidth','setTextDelay','terminateMessage','FontChangeValue','realPictureId','_textAlignment','வணக்கம்','needsNewPage','apply','skills','requestPictureTextRefreshAll','_dimmerSprite','pageup','innerWidth','Vau','setArmorChoice','blue','processDrawCenteredPicture','_pictureTextBuffer','setupItemChoice','drawItem','drawing','textWidth','prepareShowTextCommand','splice','ConvertParams','convertChoiceMacros','SelectArmor','replace','CENTERPICTURE','<LINE\x20BREAK>','ArmorTypeID','height','updateRelativePosition','_messageOffsetX','createTsvFile','StretchDimmedBg','visuMzTextLocaleStatusText','shift','faceWidth','Game_Interpreter_setupChoices','fontFace','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','Adeus','convertLockColorsEscapeCharacters','start','join','Scene_Options_maxCommands','</WORDWRAP>','message','Window_Base_changeTextColor','lastGainedObjectName','Wow','\x1bTEXTALIGNMENT','trim','createContents','processCommonEvent','callOkHandler','clearChoiceHelpDescriptions','addGeneralOptions','boxWidth','outlineColor','processAllText','index','ChoiceWindowLineHeight','postConvertEscapeCharacters','tsv','ChoiceWindowMaxRows','getInputButtonString','_colorLock','every','updateOffsetPosition','Game_Screen_clearPictures','right','\x1bTEXTALIGNMENT[1]','PICTURE','WAIT','eraseAllPictureTexts','scale','gainItem','convertBackslashCharacters','writeFileSync','currencyUnit','isVolumeSymbol','_moveEasingType','updateBackground','Game_Screen_erasePicture','changeVolume','clearRect','blt','randomInt','MsgWindowOffsetX','processFontChangeBold','FastForwardKey','_resetRect','Halo','Chinese(Simplified)','processPyTextCode','members','realignMapName','TextColor%1','currentExt','ARRAYSTRUCT','erasePicture','clearPictures','Wauw','updatePictureText','processActorNameAutoColorChanges','\x1bTEXTALIGNMENT[3]','start\x20.\x5cdata','drawItemNumber','EVAL','Hei','_autoSizeRegexp','grey','\x1bC[%1]%2\x1bPREVCOLOR[0]','addWindow','Portuguese','ConfigManager_makeData','processStoredAutoColorChanges','levelUp','UNDEFINED!','maxFontSizeInLine','isColorLocked','getPictureTextData','Hola','processAutoColorWords','さようなら','$dataLocalization','itemHeight','skill','VisuMZ_3_ActSeqCamera','indexOf','faceName','Swedish','Ciao','Window_Base_processNewLine','_choiceIndexArray','inputtingAction','Slovak','Instant','TextManager_message','_target','Window_Base_update','_itemChoiceItypeId','getMessageWindowXyOffsets','deactivate','applyMoveEasing','MessageWindow','AutoColorRegExp','LanguageImages','#ffc8e0','drawBackPicture','ShuffleArray','La\x20revedere','setChoiceListTextAlign','LineHeight','filename','anchorPictureText','_action','process_VisuMZ_MessageCore_TextMacros','CASING','charCodeAt','initMessageCore','defeat','isVisuMzLocalizationEnabled','makeDeepCopy','choiceCols','forEach','drawTextEx','_nameBoxWindow','setFaceImage','choiceDistance','dimColor2','Ha\x20det','applyData','isOpen','Skills','RelativePXPY','upper\x20center','isChoiceWindow','onChoice','bind','list','loadMessageFace','updateChoiceListHelpWindowPlacement','drawCustomBackgroundColor','isItem','HIDE','_lastGainedItemData','addContinuousShowTextCommands','actorName','Polish','Window_Base_processEscapeCharacter','Game_Message_setChoices','<%1>','getColor','armor','238472RNBhhq','_textColorStack','Farvel','_lastPluginCommandInterpreter','CSV','ParseItemNotetags','Ουάου','PictureTextErase','process_VisuMZ_MessageCore_TextCodes_Action','path','Vay','orange','substring','leader','actor','choiceMinWidth','textLocale','\x1bCASING[2]','flushTextState','\x1bI[%1]','isRunning','random','setMessageWindowXyOffsets','makeCommandListShuffle','gradientFillRect','initTextAlignement','midright','messagePositionReset','TextColor','</COLORLOCK>','EachMessageEnd','clearCommandList','getLanguageAt','itemChoiceAtypeId','<RIGHT>','MESSAGE_CORE_PLUGIN_NAME','SkillTypeID','Game_Map_setupEvents','processPreviousColor','updatePlacement','EachMessageStart','length','startPause','Actors','requestPictureTextRefresh','some','TEXTALIGNMENT','moveTo','_choiceListWindow','Window_Message_processEscapeCharacter','getStartingChoiceWidth','[0]','_wholeMoveDuration','padding','systemColor','uppercenter','_itemChoiceAtypeId','updateOverlappingY','down\x20right','MessageWindowProperties','registerCommand','stringify','lower-left','newPage','setPositionType','application/%1','3249628RCAdIp','isSceneMap','_textDelayCount','_textCasing','_textDelay','FontBiggerCap','maxLines','TextCodeActions','_messagePositionReset','setupShuffleChoices','buffer','ActorID','quantity','ParseWeaponNotetags','setChoiceListLineHeight','Window_Options_addGeneralOptions','_relativePosition','onerror','FontSmallerCap','AddAutoColor','setChoiceListMaxColumns','addExtraShowChoices','Window_Message_synchronizeNameBox','processPxTextCode','Hello','isClosed','drawText','filter','HelpWindow','Hej','_choiceHelpDescriptions','call','loadPicture','maxCols','LangFiletype','windowWidth','databaseObjectName','needsPictureTextRefresh','setMessageWindowRows','isSkill','Width','processControlCharacter','prepareShowTextFollowups','updateAutoSizePosition','_autoPositionTarget','addedHeight','surprise','changeTextSpeed','%1\x20file\x20detected.\x0a','SelectWeapon','onDatabaseLoaded','calcWindowHeight','pink','description','equipTypes','down\x20center','isSkillHidden','stretchDimmerSprite','Japanese','boxHeight','itemRect','ceil','VisuMZ_4_ExtraEnemyDrops\x20needs\x20to\x20be\x20updated\x20','indent','true','min','French','Szia','_moveTargetX','advanced','processEscapeCharacter','placeCancelButton','test','setChoices','convertButtonAssistEscapeCharacters','upper\x20right','MaxRows','_commonEventId','upper-right','getCurrentLanguage','\x1bi[%1]%2','messageRows','<COLORLOCK>','makeFontBigger','TextAlign','VisuMZ_0_CoreEngine','textSizeExRaw','erasePictureTextBuffer','isWordWrapEnabled','%1\x20file\x20is\x20now\x20created\x20and\x20stored\x20in\x20data\x20folder.\x0a','nextEventCode','isChoiceVisible','makeFontSmaller','Bengali','General','STRUCT','convertBaseEscapeCharacters','_textMacroFound','Czech','hide','overrideMimeType','_lastAltCase','CsvFilename','setPictureTextBuffer','toUpperCase','process_VisuMZ_MessageCore_AutoColor','_itemChoiceActorId','getLocalizedText','updateNameBoxMove','contentsHeight','open\x20.\x5cdata','_eventId','\x1bCASING[5]','#707070','Window_Message_needsNewPage','503159wPgqor','contentsBack','fontBold','isTriggered','add','_list','pagedown','GET','ChoiceWindowDistance','English','itemPadding','ParseClassNotetags','getMessageWindowWidth','clearPictureTextRefresh','prototype','Window_Command_addCommand','ActionJS','prepareAutoSizeEscapeCharacters','isInputting','VariableID','resetRect','drawSkillCost','isMessageWindowWordWrap','default','Key','setTextAlignment','_choices','commandName','instantTextSpeed','convertShowChoiceEscapeCodes','Game_Party_gainItem','charAt','getLastGainedItemData','exit','clampPlacementPosition','messageCoreLocalization','upleft','white','actorSlotName','registerActorNameAutoColorChanges','Enable','MinWidth','setChoiceListMaxRows','CreateAutoColorRegExpLists','TextCodeReplace','addedWidth','upperleft'];_0x43a0=function(){return _0x3315ee;};return _0x43a0();}Game_MessageCommonEvent[_0x4b39fb(0x46a)]['initialize']=function(_0x18ddce,_0x288f5c){const _0x4b1160=_0x4b39fb;this[_0x4b1160(0x436)]=_0x18ddce,this[_0x4b1160(0x458)]=_0x288f5c||0x0,this['refresh']();},Game_MessageCommonEvent[_0x4b39fb(0x46a)]['event']=function(){const _0x4a3851=_0x4b39fb;return $dataCommonEvents[this[_0x4a3851(0x436)]];},Game_MessageCommonEvent[_0x4b39fb(0x46a)]['list']=function(){const _0x4bc45d=_0x4b39fb;return this[_0x4bc45d(0x526)]()[_0x4bc45d(0x398)];},Game_MessageCommonEvent[_0x4b39fb(0x46a)]['refresh']=function(){const _0x385e5b=_0x4b39fb;this[_0x385e5b(0x266)]=new Game_Interpreter(),this[_0x385e5b(0x266)][_0x385e5b(0x4c8)](this[_0x385e5b(0x398)](),this['_eventId']);},Game_MessageCommonEvent[_0x4b39fb(0x46a)]['update']=function(){const _0x36474a=_0x4b39fb;this[_0x36474a(0x266)]&&(this[_0x36474a(0x266)][_0x36474a(0x3bb)]()?this[_0x36474a(0x266)]['update']():this[_0x36474a(0x23f)]());},Game_MessageCommonEvent[_0x4b39fb(0x46a)][_0x4b39fb(0x23f)]=function(){this['_interpreter']=null;},Scene_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x4a9)]=function(){const _0x49bb31=_0x4b39fb,_0x36f7e7=Math[_0x49bb31(0x42a)](Graphics[_0x49bb31(0x25e)],$gameSystem[_0x49bb31(0x468)]()),_0x73c569=$gameSystem[_0x49bb31(0x22d)](),_0x3330fd=this[_0x49bb31(0x41c)](_0x73c569,![]),_0x33c67d=(Graphics[_0x49bb31(0x31d)]-_0x36f7e7)/0x2,_0x45e1cc=0x0;return new Rectangle(_0x33c67d,_0x45e1cc,_0x36f7e7,_0x3330fd);},VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x258)]=Scene_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x49b)],Scene_Message[_0x4b39fb(0x46a)]['createChoiceListWindow']=function(){const _0x55c636=_0x4b39fb;VisuMZ[_0x55c636(0x18d)]['Scene_Message_createChoiceListWindow']['call'](this),this[_0x55c636(0x284)]();},Scene_Message[_0x4b39fb(0x46a)]['createChoiceListHelpWindow']=function(){const _0x46a9f7=_0x4b39fb,_0x3141bb=this[_0x46a9f7(0x2c6)](),_0x9843c7=new Window_Help(_0x3141bb);_0x9843c7[_0x46a9f7(0x44c)](),this[_0x46a9f7(0x3d7)][_0x46a9f7(0x1ca)](_0x9843c7),this[_0x46a9f7(0x516)][_0x46a9f7(0x525)](_0x9843c7),this[_0x46a9f7(0x355)](_0x9843c7),this[_0x46a9f7(0x4bf)]=_0x9843c7;},Scene_Message['prototype'][_0x4b39fb(0x2c6)]=function(){const _0x484e7d=_0x4b39fb,_0x4b785d=0x0,_0xc96873=0x0,_0x43c9d7=Graphics[_0x484e7d(0x31d)],_0x2d222b=this[_0x484e7d(0x41c)](0x2,![]);return new Rectangle(_0x4b785d,_0xc96873,_0x43c9d7,_0x2d222b);},Window_Message[_0x4b39fb(0x46a)]['setChoiceListHelpWindow']=function(_0x1587fe){const _0x10fa53=_0x4b39fb;this[_0x10fa53(0x4bf)]=_0x1587fe;},Window_Message[_0x4b39fb(0x46a)]['updateChoiceListHelpWindowPlacement']=function(){const _0x193df1=_0x4b39fb;if(!this[_0x193df1(0x4bf)])return;const _0x51cb9c=this[_0x193df1(0x4bf)];_0x51cb9c&&(_0x51cb9c['y']=this['y']>0x0?0x0:Graphics[_0x193df1(0x424)]-_0x51cb9c['height']);},VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x310)]=Scene_Options[_0x4b39fb(0x46a)][_0x4b39fb(0x263)],Scene_Options['prototype']['maxCommands']=function(){const _0x521fe4=_0x4b39fb;let _0x104671=VisuMZ['MessageCore'][_0x521fe4(0x310)][_0x521fe4(0x408)](this);const _0x411c34=VisuMZ[_0x521fe4(0x18d)][_0x521fe4(0x494)];if(_0x411c34['TextSpeed'][_0x521fe4(0x4e6)]){_0x411c34[_0x521fe4(0x235)][_0x521fe4(0x4f7)]&&TextManager[_0x521fe4(0x386)]()&&_0x104671++;if(_0x411c34[_0x521fe4(0x1f7)]['AddOption'])_0x104671++;}return _0x104671;},VisuMZ[_0x4b39fb(0x18d)]['Sprite_Picture_updateBitmap']=Sprite_Picture[_0x4b39fb(0x46a)]['updateBitmap'],Sprite_Picture['prototype'][_0x4b39fb(0x1de)]=function(){const _0xd285dd=_0x4b39fb;VisuMZ[_0xd285dd(0x18d)][_0xd285dd(0x514)][_0xd285dd(0x408)](this),this[_0xd285dd(0x1d7)]();},VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x4e4)]=Sprite_Picture[_0x4b39fb(0x46a)][_0x4b39fb(0x208)],Sprite_Picture[_0x4b39fb(0x46a)][_0x4b39fb(0x208)]=function(){const _0x2d4324=_0x4b39fb;VisuMZ[_0x2d4324(0x18d)][_0x2d4324(0x4e4)][_0x2d4324(0x408)](this),this[_0x2d4324(0x34b)]();},Sprite_Picture[_0x4b39fb(0x46a)]['updatePictureText']=function(){const _0x4fa97a=_0x4b39fb;if(!this['visible'])return;this[_0x4fa97a(0x4a5)](),this[_0x4fa97a(0x37f)](),this[_0x4fa97a(0x2c8)](),this['attachPictureText']();},Sprite_Picture['prototype'][_0x4b39fb(0x1d7)]=function(){const _0x1a591d=_0x4b39fb;if(this[_0x1a591d(0x4ea)])return;if(this[_0x1a591d(0x572)])return;const _0x300bfa=new Rectangle(0x0,0x0,0x0,0x0);this[_0x1a591d(0x4ea)]=new Window_Base(_0x300bfa),this[_0x1a591d(0x4ea)]['padding']=0x0,this[_0x1a591d(0x572)]=new Sprite(),this['addChildAt'](this[_0x1a591d(0x572)],0x0),this[_0x1a591d(0x4c2)]=0x0,this[_0x1a591d(0x4ca)]=0x0,this[_0x1a591d(0x565)]={};},Sprite_Picture['prototype'][_0x4b39fb(0x4a5)]=function(){const _0x114595=_0x4b39fb;if(!this[_0x114595(0x4ea)])return;if(this[_0x114595(0x4c2)]===this[_0x114595(0x25e)]&&this[_0x114595(0x4ca)]===this[_0x114595(0x301)])return;this[_0x114595(0x4c2)]=this[_0x114595(0x25e)],this[_0x114595(0x4ca)]=this['height'],this[_0x114595(0x565)]={},this[_0x114595(0x4ea)][_0x114595(0x269)](0x0,0x0,this['width'],this[_0x114595(0x301)]);},Sprite_Picture['prototype']['anchorPictureText']=function(){const _0x58efa2=_0x4b39fb;if(!this[_0x58efa2(0x572)])return;this[_0x58efa2(0x572)][_0x58efa2(0x1b6)]['x']=this[_0x58efa2(0x1b6)]['x'],this[_0x58efa2(0x572)]['anchor']['y']=this[_0x58efa2(0x1b6)]['y'];},Sprite_Picture[_0x4b39fb(0x46a)]['drawPictureText']=function(){const _0x188db9=_0x4b39fb;if(!this['_pictureTextWindow'])return;if(!this[_0x188db9(0x226)]())return;const _0x1ac8b3=[_0x188db9(0x48a),'up',_0x188db9(0x259),_0x188db9(0x298),'center',_0x188db9(0x32a),_0x188db9(0x2ac),_0x188db9(0x4d6),'lowerright'];this[_0x188db9(0x4ea)][_0x188db9(0x318)]();for(const _0x305d6a of _0x1ac8b3){this[_0x188db9(0x524)](_0x305d6a);}},Sprite_Picture['prototype'][_0x4b39fb(0x226)]=function(){const _0x6cd243=_0x4b39fb;if($gameScreen[_0x6cd243(0x40e)](this[_0x6cd243(0x203)]))return!![];const _0x133dfa=[_0x6cd243(0x48a),'up',_0x6cd243(0x259),'left','center',_0x6cd243(0x32a),_0x6cd243(0x2ac),_0x6cd243(0x4d6),_0x6cd243(0x547)];for(const _0x4b2faf of _0x133dfa){const _0x137cda=$gameScreen[_0x6cd243(0x555)](this['_pictureId'],_0x4b2faf);if(this[_0x6cd243(0x565)][_0x4b2faf]===_0x137cda)continue;return!![];}return![];},Sprite_Picture[_0x4b39fb(0x46a)][_0x4b39fb(0x524)]=function(_0x5d7201){const _0x512256=_0x4b39fb;$gameScreen[_0x512256(0x469)](this[_0x512256(0x203)]);const _0x5bbfbf=$gameScreen['getPictureText'](this['_pictureId'],_0x5d7201);this[_0x512256(0x565)][_0x5d7201]=_0x5bbfbf;const _0x50c155=this[_0x512256(0x4ea)][_0x512256(0x4dd)](_0x5bbfbf);let _0xd2ae14=$gameScreen[_0x512256(0x4de)](this[_0x512256(0x203)]),_0x2c2349=_0xd2ae14,_0x56ccd1=_0xd2ae14;if(['up',_0x512256(0x51f),_0x512256(0x4d6)][_0x512256(0x287)](_0x5d7201))_0x2c2349=Math[_0x512256(0x276)]((this[_0x512256(0x25e)]-_0x50c155[_0x512256(0x25e)])/0x2);else[_0x512256(0x259),'right',_0x512256(0x547)][_0x512256(0x287)](_0x5d7201)&&(_0x2c2349=Math[_0x512256(0x276)](this[_0x512256(0x25e)]-_0x50c155[_0x512256(0x25e)]-_0xd2ae14));if([_0x512256(0x298),'center','right'][_0x512256(0x287)](_0x5d7201))_0x56ccd1=Math[_0x512256(0x276)]((this['height']-_0x50c155[_0x512256(0x301)])/0x2);else[_0x512256(0x2ac),_0x512256(0x4d6),_0x512256(0x547)][_0x512256(0x287)](_0x5d7201)&&(_0x56ccd1=Math[_0x512256(0x276)](this[_0x512256(0x301)]-_0x50c155[_0x512256(0x301)]-_0xd2ae14));this[_0x512256(0x4ea)][_0x512256(0x38a)](_0x5bbfbf,_0x2c2349,_0x56ccd1);},Sprite_Picture[_0x4b39fb(0x46a)]['attachPictureText']=function(){const _0x5da3a2=_0x4b39fb;if(!this[_0x5da3a2(0x4ea)])return;if(!this[_0x5da3a2(0x572)])return;this[_0x5da3a2(0x572)]['bitmap']=this[_0x5da3a2(0x4ea)][_0x5da3a2(0x4a7)];},VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x24e)]=Window_Base['prototype'][_0x4b39fb(0x4f2)],Window_Base['prototype'][_0x4b39fb(0x4f2)]=function(_0x159fcf){const _0x95041b=_0x4b39fb;this['initMessageCore'](_0x159fcf),VisuMZ[_0x95041b(0x18d)][_0x95041b(0x24e)]['call'](this,_0x159fcf);},Window_Base[_0x4b39fb(0x46a)]['initMessageCore']=function(_0x4e9148){const _0x2243fb=_0x4b39fb;this[_0x2243fb(0x3c0)](),this['resetWordWrap'](),this['registerResetRect'](_0x4e9148);},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x3c0)]=function(){const _0x4e7695=_0x4b39fb;this[_0x4e7695(0x475)]('default');},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x475)]=function(_0x2149c8){this['_textAlignment']=_0x2149c8;},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x54f)]=function(){const _0x101a70=_0x4b39fb;return this[_0x101a70(0x2e6)];},VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x500)]=Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x4dd)],Window_Base[_0x4b39fb(0x46a)]['textSizeEx']=function(_0x2af978){const _0x599fc3=_0x4b39fb;return this[_0x599fc3(0x54d)](),VisuMZ[_0x599fc3(0x18d)][_0x599fc3(0x500)][_0x599fc3(0x408)](this,_0x2af978);},Window_Base[_0x4b39fb(0x46a)]['textSizeExRaw']=function(_0x1a0b2c){return VisuMZ['MessageCore']['Window_Base_textSizeEx']['call'](this,_0x1a0b2c);},VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x4fc)]=Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x31f)],Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x31f)]=function(_0x4e761b){const _0xaca520=_0x4b39fb;VisuMZ[_0xaca520(0x18d)][_0xaca520(0x4fc)][_0xaca520(0x408)](this,_0x4e761b);if(_0x4e761b[_0xaca520(0x2f6)])this[_0xaca520(0x475)](_0xaca520(0x473));},Window_Base[_0x4b39fb(0x46a)]['resetWordWrap']=function(){const _0x3949fd=_0x4b39fb;this[_0x3949fd(0x289)](![]);},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x441)]=function(){const _0x5a129e=_0x4b39fb;return this[_0x5a129e(0x52a)];},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x289)]=function(_0x452ac4){const _0x5866f9=_0x4b39fb;return this[_0x5866f9(0x52a)]=_0x452ac4,'';},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x21b)]=function(_0x408a13){this['_resetRect']=JsonEx['makeDeepCopy'](_0x408a13);},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x22b)]=function(){const _0x4a9cc0=_0x4b39fb;this['contents'][_0x4a9cc0(0x30a)]=$gameSystem['mainFontFace'](),this[_0x4a9cc0(0x4a7)][_0x4a9cc0(0x2c4)]=$gameSystem['mainFontSize'](),this['contents'][_0x4a9cc0(0x45e)]=![],this[_0x4a9cc0(0x4a7)][_0x4a9cc0(0x510)]=![],this[_0x4a9cc0(0x3ec)]=0x0,this['_textCasingUpperState']=!![],this['resetTextColor']();},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x558)]=function(){const _0x3597e4=_0x4b39fb;this['changeTextColor'](ColorManager['normalColor']()),this[_0x3597e4(0x1e5)](ColorManager[_0x3597e4(0x31e)]());const _0x1415c5=VisuMZ['MessageCore']['Settings'][_0x3597e4(0x447)];_0x1415c5[_0x3597e4(0x1c2)]===undefined&&(_0x1415c5[_0x3597e4(0x1c2)]=0x3),this[_0x3597e4(0x4a7)][_0x3597e4(0x1ce)]=_0x1415c5[_0x3597e4(0x1c2)],this[_0x3597e4(0x249)](![]);},Window_Base['prototype'][_0x4b39fb(0x249)]=function(_0x234e7b){this['_colorLock']=_0x234e7b;},Window_Base[_0x4b39fb(0x46a)]['isColorLocked']=function(){const _0x146f1b=_0x4b39fb;return this[_0x146f1b(0x326)];},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x509)]=function(){return![];},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x4d7)]=function(){const _0x23a62c=_0x4b39fb,_0x7afd24=[_0x23a62c(0x30a),_0x23a62c(0x2c4),'fontBold',_0x23a62c(0x510),_0x23a62c(0x1a8),'outLineColor',_0x23a62c(0x1ce),_0x23a62c(0x240)];let _0x8f2368={};for(const _0x4e1754 of _0x7afd24){_0x8f2368[_0x4e1754]=this[_0x23a62c(0x4a7)][_0x4e1754];}return _0x8f2368;},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x490)]=function(_0x38b530){for(const _0x4e276c in _0x38b530){this['contents'][_0x4e276c]=_0x38b530[_0x4e276c];}},VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x370)]=Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x208)],Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x208)]=function(){const _0x36977e=_0x4b39fb;VisuMZ[_0x36977e(0x18d)][_0x36977e(0x370)][_0x36977e(0x408)](this),this[_0x36977e(0x518)]();},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x550)]=function(){return![];},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x518)]=function(){const _0x1af115=_0x4b39fb;this[_0x1af115(0x532)]>0x0&&(this[_0x1af115(0x550)]()&&(this['x']=this['applyMoveEasing'](this['x'],this[_0x1af115(0x42d)]),this['y']=this[_0x1af115(0x374)](this['y'],this[_0x1af115(0x496)]),this[_0x1af115(0x25e)]=this['applyMoveEasing'](this['width'],this[_0x1af115(0x2a6)]),this[_0x1af115(0x301)]=this[_0x1af115(0x374)](this[_0x1af115(0x301)],this['_moveTargetHeight']),this[_0x1af115(0x47e)]()),this[_0x1af115(0x532)]--);},Window_Base[_0x4b39fb(0x46a)]['clampPlacementPosition']=function(_0x59f4dd,_0x31e9f6){const _0x40d10b=_0x4b39fb;!_0x59f4dd&&(this[_0x40d10b(0x25e)]=Math['min'](this[_0x40d10b(0x25e)],Graphics['width']),this[_0x40d10b(0x301)]=Math[_0x40d10b(0x42a)](this['height'],Graphics['height']));if(!_0x31e9f6){const _0x2030c4=-(Math[_0x40d10b(0x276)](Graphics[_0x40d10b(0x25e)]-Graphics['boxWidth'])/0x2),_0x2cf409=_0x2030c4+Graphics[_0x40d10b(0x25e)]-this[_0x40d10b(0x25e)],_0x2b22d5=-(Math[_0x40d10b(0x276)](Graphics['height']-Graphics['boxHeight'])/0x2),_0x553e81=_0x2b22d5+Graphics[_0x40d10b(0x301)]-this[_0x40d10b(0x301)];this['x']=this['x']['clamp'](_0x2030c4,_0x2cf409),this['y']=this['y'][_0x40d10b(0x195)](_0x2b22d5,_0x553e81);}},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x374)]=function(_0x3e0761,_0x1e043e){const _0xdb878a=_0x4b39fb,_0x4c1554=this[_0xdb878a(0x532)],_0xc0dd50=this[_0xdb878a(0x3db)],_0x2c74d6=this[_0xdb878a(0x225)]((_0xc0dd50-_0x4c1554)/_0xc0dd50),_0x248daa=this[_0xdb878a(0x225)]((_0xc0dd50-_0x4c1554+0x1)/_0xc0dd50),_0x58624a=(_0x3e0761-_0x1e043e*_0x2c74d6)/(0x1-_0x2c74d6);return _0x58624a+(_0x1e043e-_0x58624a)*_0x248daa;},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x225)]=function(_0x302779){const _0x98f067=_0x4b39fb,_0x102d3b=0x2;switch(this[_0x98f067(0x335)]){case 0x0:return _0x302779;case 0x1:return this['easeIn'](_0x302779,_0x102d3b);case 0x2:return this[_0x98f067(0x512)](_0x302779,_0x102d3b);case 0x3:return this[_0x98f067(0x521)](_0x302779,_0x102d3b);default:return Imported[_0x98f067(0x43e)]?VisuMZ[_0x98f067(0x374)](_0x302779,this['_moveEasingType']):_0x302779;}},Window_Base[_0x4b39fb(0x46a)]['moveTo']=function(_0x4cfef0,_0x3121eb,_0xad7258,_0x2af080,_0x331c1f,_0x54cdcc){const _0x5aaafd=_0x4b39fb;this['_moveTargetX']=_0x4cfef0,this['_moveTargetY']=_0x3121eb,this[_0x5aaafd(0x2a6)]=_0xad7258||this[_0x5aaafd(0x25e)],this[_0x5aaafd(0x4f4)]=_0x2af080||this[_0x5aaafd(0x301)],this['_moveDuration']=_0x331c1f||0x1;if(this['_moveDuration']<=0x0)this[_0x5aaafd(0x532)]=0x1;this[_0x5aaafd(0x3db)]=this[_0x5aaafd(0x532)],this[_0x5aaafd(0x335)]=_0x54cdcc||0x0;if(_0x331c1f<=0x0)this[_0x5aaafd(0x518)]();},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x4b5)]=function(_0x1e4b76,_0x1c0acf,_0x121802,_0x2425c9,_0xf22640,_0x182c6e){const _0x352093=_0x4b39fb;this['_moveTargetX']=this['x']+_0x1e4b76,this[_0x352093(0x496)]=this['y']+_0x1c0acf,this[_0x352093(0x2a6)]=this[_0x352093(0x25e)]+(_0x121802||0x0),this['_moveTargetHeight']=this[_0x352093(0x301)]+(_0x2425c9||0x0),this[_0x352093(0x532)]=_0xf22640||0x1;if(this['_moveDuration']<=0x0)this['_moveDuration']=0x1;this[_0x352093(0x3db)]=this[_0x352093(0x532)],this[_0x352093(0x335)]=_0x182c6e||0x0;if(_0xf22640<=0x0)this['updateMove']();},Window_Base['prototype'][_0x4b39fb(0x470)]=function(_0x59f644,_0x459712){const _0x1e1255=_0x4b39fb;this['moveTo'](this[_0x1e1255(0x33f)]['x'],this[_0x1e1255(0x33f)]['y'],this['_resetRect'][_0x1e1255(0x25e)],this[_0x1e1255(0x33f)]['height'],_0x59f644,_0x459712);},VisuMZ['MessageCore']['Window_Base_changeTextColor']=Window_Base['prototype']['changeTextColor'],Window_Base['prototype'][_0x4b39fb(0x187)]=function(_0x2479ca){const _0x350e7f=_0x4b39fb;if(this['isColorLocked']())return;_0x2479ca=_0x2479ca[_0x350e7f(0x2fd)](/\,/g,''),this['_textColorStack']=this['_textColorStack']||[],this[_0x350e7f(0x3a8)][_0x350e7f(0x18e)](this['contents']['textColor']),VisuMZ[_0x350e7f(0x18d)][_0x350e7f(0x313)][_0x350e7f(0x408)](this,_0x2479ca);},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x3cd)]=function(_0x4dbebf){const _0x2e2e4e=_0x4b39fb;this[_0x2e2e4e(0x1c8)](_0x4dbebf);if(this[_0x2e2e4e(0x35c)]())return;_0x4dbebf[_0x2e2e4e(0x2f6)]&&(this[_0x2e2e4e(0x3a8)]=this['_textColorStack']||[],this[_0x2e2e4e(0x4a7)][_0x2e2e4e(0x1a8)]=this['_textColorStack']['shift']()||ColorManager[_0x2e2e4e(0x54e)]());},Window_Base[_0x4b39fb(0x46a)]['convertEscapeCharacters']=function(_0x4e4f77){const _0x4355e2=_0x4b39fb;return _0x4e4f77=this[_0x4355e2(0x184)](_0x4e4f77),_0x4e4f77=this[_0x4355e2(0x331)](_0x4e4f77),_0x4e4f77=this['convertVariableEscapeCharacters'](_0x4e4f77),_0x4e4f77=this[_0x4355e2(0x433)](_0x4e4f77),_0x4e4f77=this['preConvertEscapeCharacters'](_0x4e4f77),_0x4e4f77=this[_0x4355e2(0x479)](_0x4e4f77),_0x4e4f77=this[_0x4355e2(0x1d9)](_0x4e4f77),_0x4e4f77=this[_0x4355e2(0x22a)](_0x4e4f77),_0x4e4f77=this['convertLockColorsEscapeCharacters'](_0x4e4f77),_0x4e4f77=this[_0x4355e2(0x50e)](_0x4e4f77),_0x4e4f77=this[_0x4355e2(0x449)](_0x4e4f77),_0x4e4f77=this[_0x4355e2(0x2db)](_0x4e4f77),_0x4e4f77=this[_0x4355e2(0x260)](_0x4e4f77),_0x4e4f77=this['convertMessageCoreEscapeReplacements'](_0x4e4f77),_0x4e4f77=this[_0x4355e2(0x322)](_0x4e4f77),_0x4e4f77=this[_0x4355e2(0x523)](_0x4e4f77),_0x4e4f77=this['processAutoColorWords'](_0x4e4f77),_0x4e4f77=this['prepareWordWrapEscapeCharacters'](_0x4e4f77),_0x4e4f77;},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x184)]=function(_0x2796cf){const _0x2737d4=_0x4b39fb;this[_0x2737d4(0x44a)]=![];for(const _0x363885 of VisuMZ['MessageCore'][_0x2737d4(0x494)]['TextMacros']){_0x2796cf&&_0x2796cf['match'](_0x363885['textCodeCheck'])&&(this['_textMacroFound']=!![],_0x2796cf=_0x2796cf[_0x2737d4(0x2fd)](_0x363885[_0x2737d4(0x4d5)],_0x363885[_0x2737d4(0x183)][_0x2737d4(0x397)](this)));}return _0x2796cf||'';},Window_Base[_0x4b39fb(0x46a)]['convertBackslashCharacters']=function(_0xcbfea4){const _0x1d9bf6=_0x4b39fb;return _0xcbfea4=_0xcbfea4[_0x1d9bf6(0x2fd)](/\\/g,'\x1b'),_0xcbfea4=_0xcbfea4[_0x1d9bf6(0x2fd)](/\x1b\x1b/g,'\x5c'),_0xcbfea4;},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x523)]=function(_0x4a692e){const _0x107e08=_0x4b39fb;for(;;){if(_0x4a692e[_0x107e08(0x204)](/\\V\[(\d+)\]/gi))_0x4a692e=_0x4a692e[_0x107e08(0x2fd)](/\\V\[(\d+)\]/gi,(_0x163e56,_0x4f0bc1)=>this[_0x107e08(0x331)](String($gameVariables[_0x107e08(0x1c3)](parseInt(_0x4f0bc1)))));else{if(_0x4a692e[_0x107e08(0x204)](/\x1bV\[(\d+)\]/gi))_0x4a692e=_0x4a692e['replace'](/\x1bV\[(\d+)\]/gi,(_0x4e0cdb,_0x1fe389)=>this[_0x107e08(0x331)](String($gameVariables['value'](parseInt(_0x1fe389)))));else break;}}return _0x4a692e;},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x433)]=function(_0x3b5a67){const _0x456161=_0x4b39fb;return Imported['VisuMZ_0_CoreEngine']&&(_0x3b5a67=_0x3b5a67[_0x456161(0x2fd)](/<Up (?:KEY|BUTTON)>/gi,this[_0x456161(0x569)]('up')),_0x3b5a67=_0x3b5a67[_0x456161(0x2fd)](/<Left (?:KEY|BUTTON)>/gi,this['convertButtonAssistText'](_0x456161(0x298))),_0x3b5a67=_0x3b5a67[_0x456161(0x2fd)](/<Right (?:KEY|BUTTON)>/gi,this[_0x456161(0x569)](_0x456161(0x32a))),_0x3b5a67=_0x3b5a67['replace'](/<Down (?:KEY|BUTTON)>/gi,this['convertButtonAssistText'](_0x456161(0x4d6))),_0x3b5a67=_0x3b5a67[_0x456161(0x2fd)](/<Ok (?:KEY|BUTTON)>/gi,this[_0x456161(0x569)]('ok')),_0x3b5a67=_0x3b5a67['replace'](/<Cancel (?:KEY|BUTTON)>/gi,this['convertButtonAssistText']('cancel')),_0x3b5a67=_0x3b5a67[_0x456161(0x2fd)](/<Menu (?:KEY|BUTTON)>/gi,this['convertButtonAssistText']('menu')),_0x3b5a67=_0x3b5a67[_0x456161(0x2fd)](/<Shift (?:KEY|BUTTON)>/gi,this[_0x456161(0x569)](_0x456161(0x307))),_0x3b5a67=_0x3b5a67[_0x456161(0x2fd)](/<(?:PAGEUP|PAGE UP) (?:KEY|BUTTON)>/gi,this[_0x456161(0x569)](_0x456161(0x2ed))),_0x3b5a67=_0x3b5a67[_0x456161(0x2fd)](/<(?:PAGEDOWN|PAGEDN|PAGE DOWN) (?:KEY|BUTTON)>/gi,this['convertButtonAssistText'](_0x456161(0x462)))),_0x3b5a67;},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x569)]=function(_0x5863e3){const _0x540fa5=_0x4b39fb;let _0x2f2f0a=TextManager[_0x540fa5(0x325)](_0x5863e3)||'';return _0x2f2f0a=this['convertBackslashCharacters'](_0x2f2f0a),_0x2f2f0a=this['convertVariableEscapeCharacters'](_0x2f2f0a),_0x2f2f0a[_0x540fa5(0x317)]();},Window_Base['prototype'][_0x4b39fb(0x2d9)]=function(_0x3bd8ec){const _0x53dba2=_0x4b39fb;return _0x3bd8ec=this[_0x53dba2(0x216)](_0x3bd8ec),this['registerActorNameAutoColorChanges'](),_0x3bd8ec;},Window_Base['prototype'][_0x4b39fb(0x216)]=function(_0x12ee59){const _0x4cef3f=_0x4b39fb;return _0x12ee59=TextManager[_0x4cef3f(0x1d1)](_0x12ee59),_0x12ee59;},VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x4df)]=String[_0x4b39fb(0x46a)]['format'],String['prototype'][_0x4b39fb(0x520)]=function(){const _0x2bd4e0=_0x4b39fb;let _0x56f3d2=this;return _0x56f3d2=TextManager[_0x2bd4e0(0x1d1)](_0x56f3d2),VisuMZ[_0x2bd4e0(0x18d)]['String_format'][_0x2bd4e0(0x2e9)](_0x56f3d2,arguments);},VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x51e)]=Bitmap[_0x4b39fb(0x46a)][_0x4b39fb(0x403)],Bitmap['prototype'][_0x4b39fb(0x403)]=function(_0x2d2e45,_0x4d71f2,_0xcdddc2,_0x28402c,_0x27c13c,_0x335ca7){const _0x482560=_0x4b39fb;_0x2d2e45=TextManager[_0x482560(0x1d1)](_0x2d2e45),VisuMZ[_0x482560(0x18d)][_0x482560(0x51e)][_0x482560(0x408)](this,_0x2d2e45,_0x4d71f2,_0xcdddc2,_0x28402c,_0x27c13c,_0x335ca7);},VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x2b3)]=Bitmap[_0x4b39fb(0x46a)][_0x4b39fb(0x219)],Bitmap['prototype'][_0x4b39fb(0x219)]=function(_0x3ab6b9,_0x13a352,_0x403933,_0x52ad06,_0x5829cc,_0x595771){const _0x43d503=_0x4b39fb;_0x3ab6b9=TextManager[_0x43d503(0x1d1)](_0x3ab6b9),VisuMZ[_0x43d503(0x18d)][_0x43d503(0x2b3)]['call'](this,_0x3ab6b9,_0x13a352,_0x403933,_0x52ad06,_0x5829cc,_0x595771);},Window_Base[_0x4b39fb(0x46a)]['postConvertEscapeCharacters']=function(_0x136a0d){return _0x136a0d;},Window_Base['prototype'][_0x4b39fb(0x479)]=function(_0x3d2718){const _0x4b38c3=_0x4b39fb;return this[_0x4b38c3(0x395)]()&&(_0x3d2718=_0x3d2718[_0x4b38c3(0x2fd)](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/gi,''),_0x3d2718=_0x3d2718[_0x4b38c3(0x2fd)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x3d2718=_0x3d2718[_0x4b38c3(0x2fd)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x3d2718=_0x3d2718[_0x4b38c3(0x2fd)](/<CHOICE WIDTH:[ ](\d+)>/gi,''),_0x3d2718=_0x3d2718[_0x4b38c3(0x2fd)](/<CHOICE INDENT:[ ](\d+)>/gi,''),_0x3d2718=_0x3d2718[_0x4b38c3(0x2fd)](/<(?:BGCOLOR|BG COLOR):[ ](.*?)>/gi,''),_0x3d2718=_0x3d2718[_0x4b38c3(0x2fd)](/<(?:FG|BG)(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/gi,''),_0x3d2718=_0x3d2718[_0x4b38c3(0x2fd)](/<(?:FG|BG)(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/gi,'')),_0x3d2718;},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x395)]=function(){const _0xefa6=_0x4b39fb,_0x5e3d7f=[_0xefa6(0x256),_0xefa6(0x20b)];return _0x5e3d7f[_0xefa6(0x287)](this[_0xefa6(0x1f5)][_0xefa6(0x56e)]);},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x1d9)]=function(_0x2b61da){const _0x5855c9=_0x4b39fb;return _0x2b61da=_0x2b61da[_0x5855c9(0x2fd)](/<B>/gi,'\x1bBOLD[1]'),_0x2b61da=_0x2b61da[_0x5855c9(0x2fd)](/<\/B>/gi,'\x1bBOLD[0]'),_0x2b61da=_0x2b61da[_0x5855c9(0x2fd)](/<I>/gi,_0x5855c9(0x2af)),_0x2b61da=_0x2b61da[_0x5855c9(0x2fd)](/<\/I>/gi,'\x1bITALIC[0]'),_0x2b61da;},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x22a)]=function(_0x2a3c30){const _0x5cf430=_0x4b39fb;return _0x2a3c30=_0x2a3c30[_0x5cf430(0x2fd)](/<LEFT>/gi,_0x5cf430(0x32b)),_0x2a3c30=_0x2a3c30[_0x5cf430(0x2fd)](/<\/LEFT>/gi,_0x5cf430(0x4f8)),_0x2a3c30=_0x2a3c30['replace'](/<CENTER>/gi,_0x5cf430(0x51d)),_0x2a3c30=_0x2a3c30[_0x5cf430(0x2fd)](/<\/CENTER>/gi,_0x5cf430(0x4f8)),_0x2a3c30=_0x2a3c30[_0x5cf430(0x2fd)](/<RIGHT>/gi,_0x5cf430(0x34d)),_0x2a3c30=_0x2a3c30[_0x5cf430(0x2fd)](/<\/RIGHT>/gi,_0x5cf430(0x4f8)),_0x2a3c30;},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x30d)]=function(_0x2cf2b7){const _0x50aa5f=_0x4b39fb;return _0x2cf2b7=_0x2cf2b7[_0x50aa5f(0x2fd)](/<COLORLOCK>/gi,_0x50aa5f(0x297)),_0x2cf2b7=_0x2cf2b7[_0x50aa5f(0x2fd)](/<\/COLORLOCK>/gi,'\x1bCOLORLOCK[0]'),_0x2cf2b7=_0x2cf2b7[_0x50aa5f(0x2fd)](/\(\(\(/gi,_0x50aa5f(0x297)),_0x2cf2b7=_0x2cf2b7[_0x50aa5f(0x2fd)](/\)\)\)/gi,'\x1bCOLORLOCK[0]'),_0x2cf2b7;},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x50e)]=function(_0x455abd){const _0xea32d6=_0x4b39fb;return _0x455abd=_0x455abd[_0xea32d6(0x2fd)](/<(?:LC|LOWERCASE|LOWER CASE|LOWER)>/gi,_0xea32d6(0x1bb)),_0x455abd=_0x455abd['replace'](/<\/(?:LC|LOWERCASE|LOWER CASE|LOWER)>/gi,_0xea32d6(0x2b6)),_0x455abd=_0x455abd[_0xea32d6(0x2fd)](/<(?:UC|UPPERCASE|UPPER CASE|UPPER)>/gi,_0xea32d6(0x3b8)),_0x455abd=_0x455abd[_0xea32d6(0x2fd)](/<\/(?:UC|UPPERCASE|UPPER CASE|UPPER)>/gi,_0xea32d6(0x2b6)),_0x455abd=_0x455abd[_0xea32d6(0x2fd)](/<(?:CAPS|CAPSLOCK|CAPS LOCK|CAP)>/gi,_0xea32d6(0x1d8)),_0x455abd=_0x455abd[_0xea32d6(0x2fd)](/<\/(?:CAPS|CAPSLOCK|CAPS LOCK|CAP)>/gi,_0xea32d6(0x2b6)),_0x455abd=_0x455abd['replace'](/<(?:ALT|ALTERNATE|ALT CASE)>/gi,'\x1bCASING[4]'),_0x455abd=_0x455abd[_0xea32d6(0x2fd)](/<\/(?:ALT|ALTERNATE|ALT CASE)>/gi,'\x1bCASING[0]'),_0x455abd=_0x455abd['replace'](/<(?:CHAOS|CHAOSCASE|CHAOS CASE)>/gi,_0xea32d6(0x459)),_0x455abd=_0x455abd[_0xea32d6(0x2fd)](/<\/(?:CHAOS|CHAOSCASE|CHAOS CASE)>/gi,_0xea32d6(0x2b6)),_0x455abd;},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x449)]=function(_0x3d7400){const _0x4e86b2=_0x4b39fb;return _0x3d7400=_0x3d7400[_0x4e86b2(0x2fd)](/\x1bN\[(\d+)\]/gi,(_0x846cc2,_0x5a50c1)=>this[_0x4e86b2(0x3a0)](parseInt(_0x5a50c1))),_0x3d7400=_0x3d7400[_0x4e86b2(0x2fd)](/\x1bP\[(\d+)\]/gi,(_0x10d44a,_0x29d0f1)=>this[_0x4e86b2(0x24b)](parseInt(_0x29d0f1))),_0x3d7400=_0x3d7400[_0x4e86b2(0x2fd)](/\x1bG/gi,TextManager[_0x4e86b2(0x333)]),_0x3d7400;},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x2db)]=function(_0x5a106a){const _0x65cde8=_0x4b39fb;return _0x5a106a=_0x5a106a[_0x65cde8(0x2fd)](/\<(?:BATTLE|CURRENT BATTLE) TARGET\>/gi,this[_0x65cde8(0x534)]()),_0x5a106a=_0x5a106a[_0x65cde8(0x2fd)](/\<(?:BATTLE|CURRENT BATTLE) (?:USER|SUBJECT)\>/gi,this['battleUserName']()),_0x5a106a=_0x5a106a[_0x65cde8(0x2fd)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION)\>/gi,this[_0x65cde8(0x242)](!![])),_0x5a106a=_0x5a106a[_0x65cde8(0x2fd)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION) NAME\>/gi,this[_0x65cde8(0x242)](![])),_0x5a106a;},Window_Base['prototype'][_0x4b39fb(0x534)]=function(){const _0x1620d8=_0x4b39fb;if(!SceneManager[_0x1620d8(0x217)]())return'';if(BattleManager[_0x1620d8(0x36f)])return BattleManager[_0x1620d8(0x36f)][_0x1620d8(0x56e)]();if(BattleManager[_0x1620d8(0x4b4)][0x0])return BattleManager[_0x1620d8(0x4b4)][0x0][_0x1620d8(0x56e)]();return'';},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x296)]=function(){const _0x50cc96=_0x4b39fb;if(!SceneManager[_0x50cc96(0x217)]())return'';let _0x1024e2=null;return _0x1024e2=BattleManager[_0x50cc96(0x568)],!_0x1024e2&&BattleManager[_0x50cc96(0x46e)]()&&(_0x1024e2=BattleManager['actor']()),_0x1024e2?_0x1024e2[_0x50cc96(0x56e)]():'';},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x242)]=function(_0x34fdf1){const _0x4f266d=_0x4b39fb;if(!SceneManager[_0x4f266d(0x217)]())return'';let _0x546b54=BattleManager[_0x4f266d(0x380)]||null;!_0x546b54&&BattleManager[_0x4f266d(0x46e)]()&&(_0x546b54=BattleManager[_0x4f266d(0x36b)]());if(_0x546b54&&_0x546b54['item']()){let _0x2678ec='';if(_0x34fdf1)_0x2678ec+=_0x4f266d(0x3ba)[_0x4f266d(0x520)](_0x546b54['item']()[_0x4f266d(0x1eb)]);return _0x2678ec+=_0x546b54[_0x4f266d(0x54c)]()[_0x4f266d(0x56e)],_0x2678ec;}return'';},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x260)]=function(_0x29235a){const _0x59e7e0=_0x4b39fb;for(const _0x2806fb of VisuMZ[_0x59e7e0(0x18d)]['Settings'][_0x59e7e0(0x3f0)]){_0x29235a[_0x59e7e0(0x204)](_0x2806fb[_0x59e7e0(0x4d5)])&&(_0x29235a=_0x29235a[_0x59e7e0(0x2fd)](_0x2806fb[_0x59e7e0(0x4d5)],_0x2806fb[_0x59e7e0(0x183)]),_0x29235a=this[_0x59e7e0(0x523)](_0x29235a));}return _0x29235a;},Window_Base[_0x4b39fb(0x46a)]['convertMessageCoreEscapeReplacements']=function(_0x2c3db4){const _0x295715=_0x4b39fb;for(const _0x3ca1a7 of VisuMZ[_0x295715(0x18d)][_0x295715(0x494)][_0x295715(0x488)]){_0x2c3db4[_0x295715(0x204)](_0x3ca1a7[_0x295715(0x4d5)])&&(_0x2c3db4=_0x2c3db4[_0x295715(0x2fd)](_0x3ca1a7[_0x295715(0x4d5)],_0x3ca1a7['textCodeResult'][_0x295715(0x397)](this)),_0x2c3db4=this[_0x295715(0x523)](_0x2c3db4));}return _0x2c3db4;},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x3a0)]=function(_0x2dcd66){const _0x2be70f=_0x4b39fb,_0x30a39a=_0x2dcd66>=0x1?$gameActors[_0x2be70f(0x3b5)](_0x2dcd66):null,_0x30fa59=_0x30a39a?_0x30a39a[_0x2be70f(0x56e)]():'',_0x383466=Number(VisuMZ[_0x2be70f(0x18d)][_0x2be70f(0x494)]['AutoColor']['Actors']);return this['isAutoColorAffected']()&&_0x383466!==0x0?_0x2be70f(0x354)[_0x2be70f(0x520)](_0x383466,_0x30fa59):_0x30fa59;},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x24b)]=function(_0x16c94a){const _0x13c3c9=_0x4b39fb,_0x22f965=_0x16c94a>=0x1?$gameParty[_0x13c3c9(0x343)]()[_0x16c94a-0x1]:null,_0x5b4f58=_0x22f965?_0x22f965[_0x13c3c9(0x56e)]():'',_0x1e82fd=Number(VisuMZ[_0x13c3c9(0x18d)]['Settings'][_0x13c3c9(0x1d4)][_0x13c3c9(0x3d2)]);return this[_0x13c3c9(0x509)]()&&_0x1e82fd!==0x0?_0x13c3c9(0x354)[_0x13c3c9(0x520)](_0x1e82fd,_0x5b4f58):_0x5b4f58;},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x35f)]=function(_0x5b5850){const _0x2432ba=_0x4b39fb;return this[_0x2432ba(0x509)]()&&(_0x5b5850=this[_0x2432ba(0x358)](_0x5b5850),_0x5b5850=this[_0x2432ba(0x34c)](_0x5b5850)),_0x5b5850;},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x358)]=function(_0x4fc61c){const _0x5ae9b3=_0x4b39fb;for(autoColor of VisuMZ[_0x5ae9b3(0x18d)][_0x5ae9b3(0x376)]){_0x4fc61c=_0x4fc61c[_0x5ae9b3(0x2fd)](autoColor[0x0],autoColor[0x1]);}return _0x4fc61c;},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x21a)]=function(){const _0x13fb20=_0x4b39fb;this[_0x13fb20(0x503)]=[];},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x483)]=function(){const _0x1cc953=_0x4b39fb;this[_0x1cc953(0x21a)]();const _0x1e077c=VisuMZ['MessageCore'][_0x1cc953(0x494)][_0x1cc953(0x1d4)],_0xe4d476=_0x1e077c['Actors'];if(_0xe4d476<=0x0)return;for(const _0x18855d of $gameActors[_0x1cc953(0x1a6)]){if(!_0x18855d)continue;const _0x325c36=_0x18855d['name']();if(_0x325c36['trim']()[_0x1cc953(0x3d0)]<=0x0)continue;if(/^\d+$/[_0x1cc953(0x431)](_0x325c36))continue;if(_0x325c36[_0x1cc953(0x204)](/-----/i))continue;let _0x26f2b3=VisuMZ[_0x1cc953(0x18d)][_0x1cc953(0x531)](_0x325c36);const _0x4ef2ef=new RegExp('\x5cb'+_0x26f2b3+'\x5cb','g'),_0x56978c=_0x1cc953(0x354)[_0x1cc953(0x520)](_0xe4d476,_0x325c36);this['_autoColorActorNames']['push']([_0x4ef2ef,_0x56978c]);}},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x34c)]=function(_0x2b8452){const _0x54d85b=_0x4b39fb;this[_0x54d85b(0x503)]===undefined&&this[_0x54d85b(0x483)]();for(autoColor of this[_0x54d85b(0x503)]){_0x2b8452=_0x2b8452[_0x54d85b(0x2fd)](autoColor[0x0],autoColor[0x1]);}return _0x2b8452;},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x40d)]=function(_0x3e6306,_0x45ead2,_0x3d1c5a){const _0x343c12=_0x4b39fb;if(!_0x3e6306)return'';const _0x333eba=_0x3e6306[_0x45ead2];let _0x456d20='';if(_0x333eba&&_0x3d1c5a&&_0x333eba[_0x343c12(0x1eb)]){const _0x4c6b58=_0x343c12(0x439);_0x456d20=_0x4c6b58[_0x343c12(0x520)](_0x333eba[_0x343c12(0x1eb)],_0x333eba['name']);}else _0x333eba?_0x456d20=_0x333eba['name']:_0x456d20='';return _0x456d20=TextManager['parseLocalizedText'](_0x456d20),this[_0x343c12(0x509)]()&&(_0x456d20=this[_0x343c12(0x247)](_0x456d20,_0x3e6306)),_0x456d20;},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x2a8)]=function(){const _0x3e63f1=_0x4b39fb,_0x29857c=$gameParty[_0x3e63f1(0x47c)]();if(_0x29857c['id']<0x0)return'';let _0x2f854a=null;if(_0x29857c[_0x3e63f1(0x4c4)]===0x0)_0x2f854a=$dataItems[_0x29857c['id']];if(_0x29857c[_0x3e63f1(0x4c4)]===0x1)_0x2f854a=$dataWeapons[_0x29857c['id']];if(_0x29857c['type']===0x2)_0x2f854a=$dataArmors[_0x29857c['id']];if(!_0x2f854a)return'';return _0x3e63f1(0x508)[_0x3e63f1(0x520)](_0x2f854a[_0x3e63f1(0x1eb)]);},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x314)]=function(_0x255d1f){const _0x6a2192=_0x4b39fb,_0x2cde6c=$gameParty[_0x6a2192(0x47c)]();if(_0x2cde6c['id']<0x0)return'';let _0x343382=null;if(_0x2cde6c['type']===0x0)_0x343382=$dataItems[_0x2cde6c['id']];if(_0x2cde6c[_0x6a2192(0x4c4)]===0x1)_0x343382=$dataWeapons[_0x2cde6c['id']];if(_0x2cde6c['type']===0x2)_0x343382=$dataArmors[_0x2cde6c['id']];if(!_0x343382)return'';let _0x3b5a3c=_0x343382[_0x6a2192(0x56e)]||'';return TextManager[_0x6a2192(0x386)]()&&(_0x3b5a3c=TextManager[_0x6a2192(0x1d1)](_0x3b5a3c)),_0x255d1f?_0x6a2192(0x439)[_0x6a2192(0x520)](_0x343382[_0x6a2192(0x1eb)],_0x3b5a3c):_0x3b5a3c;},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x239)]=function(){const _0x1f8a4e=_0x4b39fb,_0x2e78d9=$gameParty['getLastGainedItemData']();if(_0x2e78d9['id']<=0x0)return'';return _0x2e78d9[_0x1f8a4e(0x3f5)];},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x247)]=function(_0x764ace,_0x28c8a8){const _0x5076c3=_0x4b39fb,_0xe9250e=VisuMZ[_0x5076c3(0x18d)][_0x5076c3(0x494)][_0x5076c3(0x1d4)];let _0x38b382=0x0;if(_0x28c8a8===$dataActors)_0x38b382=_0xe9250e[_0x5076c3(0x3d2)];if(_0x28c8a8===$dataClasses)_0x38b382=_0xe9250e[_0x5076c3(0x236)];if(_0x28c8a8===$dataSkills)_0x38b382=_0xe9250e[_0x5076c3(0x392)];if(_0x28c8a8===$dataItems)_0x38b382=_0xe9250e[_0x5076c3(0x1bf)];if(_0x28c8a8===$dataWeapons)_0x38b382=_0xe9250e['Weapons'];if(_0x28c8a8===$dataArmors)_0x38b382=_0xe9250e[_0x5076c3(0x255)];if(_0x28c8a8===$dataEnemies)_0x38b382=_0xe9250e[_0x5076c3(0x1e4)];if(_0x28c8a8===$dataStates)_0x38b382=_0xe9250e[_0x5076c3(0x1a7)];return _0x38b382>0x0&&(_0x764ace=_0x5076c3(0x354)[_0x5076c3(0x520)](_0x38b382,_0x764ace)),_0x764ace;},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x559)]=function(_0x4db054){const _0x522470=_0x4b39fb;if(_0x4db054[_0x522470(0x287)](_0x522470(0x316)))return this[_0x522470(0x289)](![]),_0x4db054=_0x4db054['replace'](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a'),_0x4db054=_0x4db054[_0x522470(0x2fd)](/<(?:WORDWRAP|WORD WRAP)>/gi,''),_0x4db054=_0x4db054[_0x522470(0x2fd)](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,''),_0x4db054=_0x4db054[_0x522470(0x2fd)](/<\/(?:NOWORDWRAP|NO WORD WRAP)>/gi,''),_0x4db054;_0x4db054=_0x4db054[_0x522470(0x2fd)](/<(?:WORDWRAP|WORD WRAP)>/gi,(_0x5963ac,_0x47ab78)=>this[_0x522470(0x289)](!![])),_0x4db054=_0x4db054[_0x522470(0x2fd)](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,(_0x160449,_0x5cff9c)=>this[_0x522470(0x289)](![])),_0x4db054=_0x4db054[_0x522470(0x2fd)](/<\/(?:WORDWRAP|WORD WRAP)>/gi,(_0x21b6c9,_0x2ffb96)=>this[_0x522470(0x289)](![]));if(_0x4db054[_0x522470(0x204)](Window_Message[_0x522470(0x352)]))this['setWordWrap'](![]);else _0x4db054[_0x522470(0x204)](Window_Message[_0x522470(0x1f6)])&&this[_0x522470(0x289)](![]);if(!this[_0x522470(0x441)]())return _0x4db054=_0x4db054[_0x522470(0x2fd)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a'),_0x4db054;if(_0x4db054[_0x522470(0x3d0)]<=0x0)return _0x4db054;return _0x4db054[_0x522470(0x204)](/[\u3040-\u30FF\u4E00-\u9FFF]/g)&&(_0x4db054=VisuMZ[_0x522470(0x18d)][_0x522470(0x1da)](_0x4db054)[_0x522470(0x30f)]('')),VisuMZ[_0x522470(0x18d)][_0x522470(0x494)][_0x522470(0x231)][_0x522470(0x280)]?(_0x4db054=_0x4db054[_0x522470(0x2fd)](/[\n\r]+/g,'\x20'),_0x4db054=_0x4db054['replace'](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a')):(_0x4db054=_0x4db054[_0x522470(0x2fd)](/[\n\r]+/g,''),_0x4db054=_0x4db054[_0x522470(0x2fd)](/<(?:BR|LINEBREAK)>/gi,'\x0a')),_0x4db054=this[_0x522470(0x4db)](_0x4db054),_0x4db054=_0x4db054[_0x522470(0x4cd)]('\x20')['join'](_0x522470(0x189)),_0x4db054=_0x4db054[_0x522470(0x2fd)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x4db054=_0x4db054['replace'](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x4db054;},VisuMZ[_0x4b39fb(0x18d)]['SplitJpCnCharacters']=function(_0x572a05){const _0x3527b7=_0x4b39fb;let _0x5361d2=[],_0x4d3e35='';while(_0x572a05[_0x3527b7(0x3d0)]>0x0){const _0x35c89a=_0x572a05[_0x3527b7(0x47b)](0x0);_0x572a05=_0x572a05[_0x3527b7(0x1b9)](0x1),_0x35c89a[_0x3527b7(0x204)](/[\u3040-\u30FF\u4E00-\u9FFF]/g)?(_0x4d3e35[_0x3527b7(0x3d0)]>0x0&&(_0x5361d2[_0x3527b7(0x1ee)](_0x4d3e35),_0x4d3e35=''),_0x5361d2[_0x3527b7(0x1ee)](_0x35c89a+_0x3527b7(0x220))):_0x4d3e35+=_0x35c89a;}return _0x4d3e35[_0x3527b7(0x3d0)]>0x0&&(_0x5361d2[_0x3527b7(0x1ee)](_0x4d3e35),_0x4d3e35=''),_0x5361d2;},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x4db)]=function(_0x11b782){return _0x11b782;},VisuMZ['MessageCore']['Window_Base_processNewLine']=Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x1e1)],Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x1e1)]=function(_0x154322){const _0x35ba4b=_0x4b39fb;VisuMZ[_0x35ba4b(0x18d)][_0x35ba4b(0x369)][_0x35ba4b(0x408)](this,_0x154322),this[_0x35ba4b(0x1fe)](_0x154322);},Window_Base['prototype'][_0x4b39fb(0x2c5)]=function(_0x2918b2){const _0x3a4d4c=_0x4b39fb;let _0x22a497=_0x2918b2[_0x3a4d4c(0x293)][_0x2918b2[_0x3a4d4c(0x320)]++];if(_0x22a497[_0x3a4d4c(0x383)](0x0)<0x20)this[_0x3a4d4c(0x3b9)](_0x2918b2),this[_0x3a4d4c(0x412)](_0x2918b2,_0x22a497);else{if(this[_0x3a4d4c(0x3ec)]===0x1)_0x22a497=_0x22a497['toLowerCase']();if(this['_textCasing']===0x2){if(this[_0x3a4d4c(0x1c6)])_0x22a497=_0x22a497[_0x3a4d4c(0x451)]();this[_0x3a4d4c(0x1c6)]=/\s/[_0x3a4d4c(0x431)](_0x22a497);}if(this[_0x3a4d4c(0x3ec)]===0x3)_0x22a497=_0x22a497['toUpperCase']();this[_0x3a4d4c(0x3ec)]===0x4&&(_0x22a497=this[_0x3a4d4c(0x44e)]?_0x22a497[_0x3a4d4c(0x451)]():_0x22a497['toLowerCase'](),this[_0x3a4d4c(0x44e)]=!this[_0x3a4d4c(0x44e)]),this[_0x3a4d4c(0x3ec)]===0x5&&(_0x22a497=Math[_0x3a4d4c(0x3bc)]()<0.5?_0x22a497['toUpperCase']():_0x22a497[_0x3a4d4c(0x21c)]()),_0x2918b2[_0x3a4d4c(0x3f3)]+=_0x22a497;}},VisuMZ['MessageCore'][_0x4b39fb(0x2c0)]=Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x412)],Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x412)]=function(_0x5b0ceb,_0x31d73a){const _0x49cab9=_0x4b39fb;VisuMZ[_0x49cab9(0x18d)][_0x49cab9(0x2c0)]['call'](this,_0x5b0ceb,_0x31d73a);if(_0x31d73a===_0x49cab9(0x189))this['processWrapBreak'](_0x5b0ceb);else _0x31d73a===_0x49cab9(0x220)&&this[_0x49cab9(0x2d3)](_0x5b0ceb,!![]);},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x4d1)]=function(_0x433015){const _0x1594dc=_0x4b39fb;var _0x54dc61=/^\<(.*?)\>/['exec'](_0x433015[_0x1594dc(0x293)][_0x1594dc(0x1b9)](_0x433015[_0x1594dc(0x320)]));return _0x54dc61?(_0x433015[_0x1594dc(0x320)]+=_0x54dc61[0x0][_0x1594dc(0x3d0)],String(_0x54dc61[0x0][_0x1594dc(0x1b9)](0x1,_0x54dc61[0x0][_0x1594dc(0x3d0)]-0x1))):'';},VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x3a2)]=Window_Base[_0x4b39fb(0x46a)]['processEscapeCharacter'],Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x42f)]=function(_0x46da94,_0x46676f){const _0x5be347=_0x4b39fb;switch(_0x46da94){case'C':_0x46676f['drawing']?VisuMZ[_0x5be347(0x18d)][_0x5be347(0x3a2)][_0x5be347(0x408)](this,_0x46da94,_0x46676f):this[_0x5be347(0x1c8)](_0x46676f);break;case'I':case'{':case'}':VisuMZ[_0x5be347(0x18d)][_0x5be347(0x3a2)][_0x5be347(0x408)](this,_0x46da94,_0x46676f);break;case'FS':this['processFsTextCode'](_0x46676f);break;case'PX':this[_0x5be347(0x400)](_0x46676f);break;case'PY':this[_0x5be347(0x342)](_0x46676f);break;case'BOLD':this[_0x5be347(0x33d)](this[_0x5be347(0x1c8)](_0x46676f));break;case _0x5be347(0x382):this[_0x5be347(0x4e8)](_0x46676f);break;case _0x5be347(0x2fe):this[_0x5be347(0x2f2)](_0x46676f);break;case _0x5be347(0x2cb):this[_0x5be347(0x4cc)](_0x46676f);break;case'COMMONEVENT':this[_0x5be347(0x319)](_0x46676f);break;case _0x5be347(0x1a2):this[_0x5be347(0x193)](this[_0x5be347(0x1c8)](_0x46676f));break;case _0x5be347(0x32c):this[_0x5be347(0x18a)](_0x46676f);break;case'PREVCOLOR':this[_0x5be347(0x3cd)](_0x46676f);break;case _0x5be347(0x3d5):this[_0x5be347(0x1d3)](_0x46676f);break;case _0x5be347(0x32d):this[_0x5be347(0x288)](_0x46676f);break;case _0x5be347(0x52c):this[_0x5be347(0x2d3)](_0x46676f);break;case _0x5be347(0x1fb):this['processWrapBreak'](_0x46676f,!![]);break;default:this[_0x5be347(0x1d0)](_0x46da94,_0x46676f);}},Window_Base['prototype'][_0x4b39fb(0x1d0)]=function(_0x499289,_0x57e371){const _0x16e0f2=_0x4b39fb;for(const _0x33e324 of VisuMZ['MessageCore']['Settings']['TextCodeActions']){if(_0x33e324['Match']===_0x499289){if(_0x33e324[_0x16e0f2(0x1c5)]==='')this[_0x16e0f2(0x1c8)](_0x57e371);_0x33e324[_0x16e0f2(0x46c)][_0x16e0f2(0x408)](this,_0x57e371);if(this[_0x16e0f2(0x1f5)]===Window_Message){const _0x23440e=_0x33e324['CommonEvent']||0x0;if(_0x23440e>0x0)this[_0x16e0f2(0x2de)](_0x23440e);}}}},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x43c)]=function(){const _0x3cc3b6=_0x4b39fb;this[_0x3cc3b6(0x4a7)][_0x3cc3b6(0x2c4)]+=VisuMZ[_0x3cc3b6(0x18d)][_0x3cc3b6(0x494)]['General'][_0x3cc3b6(0x2e4)],this['contents']['fontSize']=Math['min'](this['contents'][_0x3cc3b6(0x2c4)],VisuMZ['MessageCore'][_0x3cc3b6(0x494)][_0x3cc3b6(0x447)][_0x3cc3b6(0x3ee)]);},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x445)]=function(){const _0x14f83e=_0x4b39fb;this[_0x14f83e(0x4a7)][_0x14f83e(0x2c4)]-=VisuMZ['MessageCore'][_0x14f83e(0x494)][_0x14f83e(0x447)][_0x14f83e(0x2e4)],this[_0x14f83e(0x4a7)][_0x14f83e(0x2c4)]=Math[_0x14f83e(0x1ea)](this[_0x14f83e(0x4a7)][_0x14f83e(0x2c4)],VisuMZ[_0x14f83e(0x18d)][_0x14f83e(0x494)][_0x14f83e(0x447)][_0x14f83e(0x3fb)]);},Window_Base[_0x4b39fb(0x46a)]['processFsTextCode']=function(_0x4e331f){const _0x4af746=_0x4b39fb,_0x5a0a7b=this['obtainEscapeParam'](_0x4e331f);this[_0x4af746(0x4a7)][_0x4af746(0x2c4)]=_0x5a0a7b['clamp'](VisuMZ[_0x4af746(0x18d)][_0x4af746(0x494)][_0x4af746(0x447)][_0x4af746(0x3fb)],VisuMZ[_0x4af746(0x18d)]['Settings']['General'][_0x4af746(0x3ee)]);},Window_Base['prototype'][_0x4b39fb(0x35b)]=function(_0x318f1a){const _0x55da22=_0x4b39fb;let _0x56da57=this[_0x55da22(0x4a7)]['fontSize'];const _0x3e6064=/\x1b({|}|FS)(\[(\d+)])?/gi;for(;;){const _0x100a57=_0x3e6064[_0x55da22(0x1f9)](_0x318f1a);if(!_0x100a57)break;const _0x1db438=String(_0x100a57[0x1])['toUpperCase']();if(_0x1db438==='{')this[_0x55da22(0x43c)]();else{if(_0x1db438==='}')this[_0x55da22(0x445)]();else _0x1db438==='FS'&&(this[_0x55da22(0x4a7)][_0x55da22(0x2c4)]=parseInt(_0x100a57[0x3])[_0x55da22(0x195)](VisuMZ[_0x55da22(0x18d)]['Settings'][_0x55da22(0x447)][_0x55da22(0x3fb)],VisuMZ[_0x55da22(0x18d)][_0x55da22(0x494)][_0x55da22(0x447)]['FontBiggerCap']));}this[_0x55da22(0x4a7)][_0x55da22(0x2c4)]>_0x56da57&&(_0x56da57=this[_0x55da22(0x4a7)][_0x55da22(0x2c4)]);}return _0x56da57;},Window_Base[_0x4b39fb(0x46a)]['processPxTextCode']=function(_0x5e3759){const _0x31d8e3=_0x4b39fb;_0x5e3759['x']=this[_0x31d8e3(0x1c8)](_0x5e3759),VisuMZ[_0x31d8e3(0x18d)][_0x31d8e3(0x494)][_0x31d8e3(0x447)][_0x31d8e3(0x393)]&&(_0x5e3759['x']+=_0x5e3759[_0x31d8e3(0x52e)]);},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x342)]=function(_0x28f773){const _0xaf294f=_0x4b39fb;_0x28f773['y']=this['obtainEscapeParam'](_0x28f773),VisuMZ[_0xaf294f(0x18d)][_0xaf294f(0x494)]['General'][_0xaf294f(0x393)]&&(_0x28f773['y']+=_0x28f773[_0xaf294f(0x2d6)]);},Window_Base['prototype']['processFontChangeBold']=function(_0x13a4d4){const _0x3af246=_0x4b39fb;this['contents'][_0x3af246(0x45e)]=!!_0x13a4d4;},Window_Base['prototype'][_0x4b39fb(0x193)]=function(_0x2e892c){const _0x8c1b16=_0x4b39fb;this[_0x8c1b16(0x4a7)]['fontItalic']=!!_0x2e892c;},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x1d3)]=function(_0x3be7aa){const _0x439aea=_0x4b39fb,_0x20ee99=this['obtainEscapeParam'](_0x3be7aa);if(!_0x3be7aa[_0x439aea(0x2f6)])return;switch(_0x20ee99){case 0x0:this[_0x439aea(0x475)](_0x439aea(0x473));return;case 0x1:this['setTextAlignment']('left');break;case 0x2:this[_0x439aea(0x475)]('center');break;case 0x3:this[_0x439aea(0x475)](_0x439aea(0x32a));break;}this[_0x439aea(0x1fe)](_0x3be7aa);},Window_Base['prototype']['processTextAlignmentX']=function(_0x46d9da){const _0x17cb45=_0x4b39fb;if(!_0x46d9da[_0x17cb45(0x2f6)])return;if(_0x46d9da[_0x17cb45(0x1a3)])return;if(this[_0x17cb45(0x54f)]()===_0x17cb45(0x473))return;let _0x523cda=_0x46d9da['text'][_0x17cb45(0x365)](_0x17cb45(0x316),_0x46d9da[_0x17cb45(0x320)]+0x1),_0xbe63b5=_0x46d9da['text']['indexOf']('\x0a',_0x46d9da[_0x17cb45(0x320)]+0x1);if(_0x523cda<0x0)_0x523cda=_0x46d9da[_0x17cb45(0x293)]['length']+0x1;if(_0xbe63b5>0x0)_0x523cda=Math['min'](_0x523cda,_0xbe63b5);const _0x4a0c50=_0x46d9da[_0x17cb45(0x293)][_0x17cb45(0x3b3)](_0x46d9da[_0x17cb45(0x320)],_0x523cda),_0x1c92c0=this[_0x17cb45(0x227)](_0x4a0c50)[_0x17cb45(0x25e)],_0x4ed853=_0x46d9da[_0x17cb45(0x25e)]||this['innerWidth']-0x8,_0x4c0fdd=this[_0x17cb45(0x1f5)]===Window_Message&&$gameMessage[_0x17cb45(0x366)]()!=='';switch(this[_0x17cb45(0x54f)]()){case _0x17cb45(0x298):_0x46d9da['x']=_0x46d9da['startX'];break;case _0x17cb45(0x51f):_0x46d9da['x']=_0x46d9da[_0x17cb45(0x52e)],_0x46d9da['x']+=Math[_0x17cb45(0x276)]((_0x4ed853-_0x1c92c0)/0x2);_0x4c0fdd&&(_0x46d9da['x']-=_0x46d9da[_0x17cb45(0x52e)]/0x2);break;case _0x17cb45(0x32a):_0x46d9da['x']=_0x4ed853-_0x1c92c0+_0x46d9da[_0x17cb45(0x52e)];_0x4c0fdd&&(_0x46d9da['x']-=_0x46d9da[_0x17cb45(0x52e)]);break;}},Window_Base['prototype'][_0x4b39fb(0x227)]=function(_0x2e5f25){const _0x1056ef=_0x4b39fb;_0x2e5f25=_0x2e5f25[_0x1056ef(0x2fd)](/\x1b!/g,''),_0x2e5f25=_0x2e5f25[_0x1056ef(0x2fd)](/\x1b\|/g,''),_0x2e5f25=_0x2e5f25['replace'](/\x1b\./g,'');const _0x487372=this[_0x1056ef(0x4e1)](_0x2e5f25,0x0,0x0,0x0),_0x1fc898=this['getPreservedFontSettings']();return _0x487372[_0x1056ef(0x2f6)]=![],this[_0x1056ef(0x31f)](_0x487372),this['returnPreservedFontSettings'](_0x1fc898),{'width':_0x487372[_0x1056ef(0x4b3)],'height':_0x487372['outputHeight']};},Window_Base['WORD_WRAP_PADDING']=VisuMZ[_0x4b39fb(0x18d)]['Settings']['WordWrap'][_0x4b39fb(0x2a0)]||0x0,Window_Base['prototype'][_0x4b39fb(0x2d3)]=function(_0x1c3302,_0x106f8d){const _0x106675=_0x4b39fb,_0x2ecdc5=(_0x1c3302['rtl']?-0x1:0x1)*this[_0x106675(0x2f7)]('\x20');if(!_0x106f8d)_0x1c3302['x']+=_0x2ecdc5;if(this[_0x106675(0x1c8)](_0x1c3302)>0x0&&!_0x106f8d)_0x1c3302['x']+=_0x2ecdc5;if(_0x1c3302[_0x106675(0x1a3)])return;let _0x574c8d;_0x106f8d?_0x574c8d=_0x1c3302['text'][_0x106675(0x365)](_0x106675(0x220),_0x1c3302[_0x106675(0x320)]+0x1):_0x574c8d=_0x1c3302[_0x106675(0x293)][_0x106675(0x365)](_0x106675(0x189),_0x1c3302[_0x106675(0x320)]+0x1);let _0x42cd33=_0x1c3302[_0x106675(0x293)][_0x106675(0x365)]('\x0a',_0x1c3302[_0x106675(0x320)]+0x1);if(_0x574c8d<0x0)_0x574c8d=_0x1c3302['text'][_0x106675(0x3d0)]+0x1;if(_0x42cd33>0x0)_0x574c8d=Math[_0x106675(0x42a)](_0x574c8d,_0x42cd33);const _0x54489b=_0x1c3302['text'][_0x106675(0x3b3)](_0x1c3302['index'],_0x574c8d),_0x5c84e3=this[_0x106675(0x1e2)](_0x54489b)[_0x106675(0x25e)];let _0x181152=_0x1c3302[_0x106675(0x25e)]||this[_0x106675(0x2ee)];_0x181152-=Window_Base[_0x106675(0x491)];if(this[_0x106675(0x1f5)]===Window_Message){const _0x421931=$gameMessage[_0x106675(0x366)]()===''?0x0:ImageManager[_0x106675(0x308)]+0x14;_0x181152-=_0x421931,VisuMZ['MessageCore'][_0x106675(0x494)][_0x106675(0x231)][_0x106675(0x2c2)]&&(_0x181152-=_0x421931);}let _0x2409e8=![];_0x1c3302['x']+_0x5c84e3>_0x1c3302[_0x106675(0x52e)]+_0x181152&&(_0x2409e8=!![]),_0x5c84e3===0x0&&(_0x2409e8=![]),_0x2409e8&&(_0x1c3302[_0x106675(0x293)]=_0x1c3302[_0x106675(0x293)]['slice'](0x0,_0x1c3302[_0x106675(0x320)])+'\x0a'+_0x1c3302[_0x106675(0x293)][_0x106675(0x282)](_0x1c3302[_0x106675(0x320)]));},Window_Base[_0x4b39fb(0x46a)]['textSizeExWordWrap']=function(_0xe94594){const _0x382dff=_0x4b39fb,_0x29036a=this['createTextState'](_0xe94594,0x0,0x0,0x0),_0xbfba55=this['getPreservedFontSettings']();return _0x29036a[_0x382dff(0x2f6)]=![],this[_0x382dff(0x289)](![]),this[_0x382dff(0x31f)](_0x29036a),this['setWordWrap'](!![]),this[_0x382dff(0x490)](_0xbfba55),{'width':_0x29036a[_0x382dff(0x4b3)],'height':_0x29036a[_0x382dff(0x543)]};},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x319)]=function(_0x948de){return this['obtainEscapeParam'](_0x948de);},Window_Base[_0x4b39fb(0x46a)]['processDrawPicture']=function(_0x3157b9){const _0x3b6f31=_0x4b39fb,_0x3d4d13=this[_0x3b6f31(0x4d1)](_0x3157b9)[_0x3b6f31(0x4cd)](',');if(!_0x3157b9[_0x3b6f31(0x2f6)])return;const _0x9e0f5f=_0x3d4d13[0x0][_0x3b6f31(0x317)](),_0x7054e7=_0x3d4d13[0x1]||0x0,_0x52bb81=_0x3d4d13[0x2]||0x0,_0x3d5e41=ImageManager[_0x3b6f31(0x409)](_0x9e0f5f),_0x5b30aa=this['contents'][_0x3b6f31(0x240)];_0x3d5e41[_0x3b6f31(0x188)](this['drawBackPicture'][_0x3b6f31(0x397)](this,_0x3d5e41,_0x3157b9['x'],_0x3157b9['y'],_0x7054e7,_0x52bb81,_0x5b30aa));},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x379)]=function(_0xc4b1af,_0x1aa69b,_0x2ae0ab,_0x129fd5,_0x3211e4,_0x413ca4){const _0x1a8e24=_0x4b39fb;_0x129fd5=_0x129fd5||_0xc4b1af['width'],_0x3211e4=_0x3211e4||_0xc4b1af[_0x1a8e24(0x301)],this['contentsBack'][_0x1a8e24(0x240)]=_0x413ca4,this[_0x1a8e24(0x45d)]['blt'](_0xc4b1af,0x0,0x0,_0xc4b1af[_0x1a8e24(0x25e)],_0xc4b1af['height'],_0x1aa69b,_0x2ae0ab,_0x129fd5,_0x3211e4),this[_0x1a8e24(0x45d)][_0x1a8e24(0x240)]=0xff;},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x2f2)]=function(_0x5c3ee2){const _0x2f3675=_0x4b39fb,_0x14078c=this['obtainEscapeString'](_0x5c3ee2)['split'](',');if(!_0x5c3ee2[_0x2f3675(0x2f6)])return;const _0x3bcc02=_0x14078c[0x0]['trim'](),_0x1c7f98=ImageManager[_0x2f3675(0x409)](_0x3bcc02),_0x5d1e10=JsonEx[_0x2f3675(0x387)](_0x5c3ee2),_0x477d6c=this[_0x2f3675(0x4a7)]['paintOpacity'];_0x1c7f98[_0x2f3675(0x188)](this[_0x2f3675(0x4a0)]['bind'](this,_0x1c7f98,_0x5d1e10,_0x477d6c));},Window_Base['prototype'][_0x4b39fb(0x4a0)]=function(_0x4931d7,_0x4fd99b,_0x578872){const _0x4df087=_0x4b39fb,_0x1954c7=_0x4fd99b[_0x4df087(0x25e)]||this[_0x4df087(0x2ee)],_0xe51c0b=this[_0x4df087(0x194)]!==undefined?this[_0x4df087(0x362)]():this[_0x4df087(0x4be)],_0x1ad3af=_0x1954c7/_0x4931d7['width'],_0xfed5b2=_0xe51c0b/_0x4931d7['height'],_0x3e4aad=Math['min'](_0x1ad3af,_0xfed5b2,0x1),_0x2b43b5=this[_0x4df087(0x194)]!==undefined?(this['itemRectWithPadding'](0x0)[_0x4df087(0x301)]-this['lineHeight']())/0x2:0x0,_0x342de4=_0x4931d7[_0x4df087(0x25e)]*_0x3e4aad,_0x503d61=_0x4931d7[_0x4df087(0x301)]*_0x3e4aad,_0x37b4a7=Math['floor']((_0x1954c7-_0x342de4)/0x2)+_0x4fd99b[_0x4df087(0x52e)],_0x1a1ac=Math[_0x4df087(0x276)]((_0xe51c0b-_0x503d61)/0x2)+_0x4fd99b[_0x4df087(0x2d6)]-_0x2b43b5*0x2;this['contentsBack'][_0x4df087(0x240)]=_0x578872,this[_0x4df087(0x45d)][_0x4df087(0x33a)](_0x4931d7,0x0,0x0,_0x4931d7[_0x4df087(0x25e)],_0x4931d7[_0x4df087(0x301)],_0x37b4a7,_0x1a1ac,_0x342de4,_0x503d61),this['contentsBack']['paintOpacity']=0xff;},Window_Base['prototype'][_0x4b39fb(0x4cc)]=function(_0x1320b2){const _0x583ab7=_0x4b39fb,_0x300925=this['obtainEscapeParam'](_0x1320b2);if(_0x1320b2['drawing'])this[_0x583ab7(0x249)](_0x300925>0x0);},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x288)]=function(_0x21a2bf){const _0x5e8903=_0x4b39fb,_0xc0a17e=this[_0x5e8903(0x1c8)](_0x21a2bf);this[_0x5e8903(0x1f5)]===Window_Message&&_0x21a2bf[_0x5e8903(0x2f6)]&&this[_0x5e8903(0x564)](_0xc0a17e);},Window_Base['prototype']['processTextCasing']=function(_0x4c2ef8){const _0x3e363a=_0x4b39fb;this[_0x3e363a(0x3ec)]=this['obtainEscapeParam'](_0x4c2ef8),this[_0x3e363a(0x1c6)]=!![],this[_0x3e363a(0x44e)]=!![];},VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x20c)]=function(_0x2e3c2f){const _0x366d7b=_0x4b39fb;if($gameTemp[_0x366d7b(0x1f1)]()){let _0x259046='%1,\x20does\x20not\x20support\x20attempted\x20text\x20code\x20usage.'[_0x366d7b(0x520)](_0x2e3c2f[_0x366d7b(0x1f5)]['name']);alert(_0x259046),SceneManager[_0x366d7b(0x47d)]();}},Window_Base[_0x4b39fb(0x46a)][_0x4b39fb(0x399)]=function(){const _0x73927=_0x4b39fb;VisuMZ[_0x73927(0x18d)][_0x73927(0x20c)](this);},Window_Base['prototype'][_0x4b39fb(0x4e3)]=function(){VisuMZ['MessageCore']['NonSupportedTextCodes'](this);},Window_Base[_0x4b39fb(0x46a)]['setTextDelay']=function(){const _0x4163d2=_0x4b39fb;VisuMZ['MessageCore'][_0x4163d2(0x20c)](this);},Window_Help[_0x4b39fb(0x46a)][_0x4b39fb(0x54d)]=function(){this['setWordWrap']($gameSystem['isHelpWindowWordWrap']());},Window_Help[_0x4b39fb(0x46a)]['isAutoColorAffected']=function(){return!![];},VisuMZ['MessageCore']['Window_Help_refresh']=Window_Help[_0x4b39fb(0x46a)][_0x4b39fb(0x23d)],Window_Help['prototype'][_0x4b39fb(0x23d)]=function(){const _0x1f5eea=_0x4b39fb;this['clearActorNameAutoColor']();if(this['contentsBack'])this[_0x1f5eea(0x45d)][_0x1f5eea(0x23f)]();VisuMZ['MessageCore'][_0x1f5eea(0x4aa)][_0x1f5eea(0x408)](this),this['resetWordWrap']();},VisuMZ['MessageCore'][_0x4b39fb(0x3f8)]=Window_Options[_0x4b39fb(0x46a)][_0x4b39fb(0x31c)],Window_Options['prototype'][_0x4b39fb(0x31c)]=function(){const _0x496d29=_0x4b39fb;VisuMZ[_0x496d29(0x18d)][_0x496d29(0x3f8)]['call'](this),this[_0x496d29(0x542)]();},Window_Options[_0x4b39fb(0x46a)][_0x4b39fb(0x542)]=function(){const _0x2d6dee=_0x4b39fb;VisuMZ[_0x2d6dee(0x18d)]['Settings']['Localization'][_0x2d6dee(0x4f7)]&&TextManager[_0x2d6dee(0x386)]()&&this[_0x2d6dee(0x53f)](),VisuMZ[_0x2d6dee(0x18d)][_0x2d6dee(0x494)][_0x2d6dee(0x1f7)][_0x2d6dee(0x4f7)]&&this[_0x2d6dee(0x22c)]();},Window_Options[_0x4b39fb(0x46a)][_0x4b39fb(0x53f)]=function(){const _0x5484ed=_0x4b39fb,_0x403d2d=TextManager[_0x5484ed(0x47f)],_0x3fa176=_0x5484ed(0x3b7);this[_0x5484ed(0x26c)](_0x403d2d,_0x3fa176);},Window_Options[_0x4b39fb(0x46a)]['addMessageCoreTextSpeedCommand']=function(){const _0x925e71=_0x4b39fb,_0x3d4d60=TextManager[_0x925e71(0x23a)],_0xa107fe=_0x925e71(0x200);this[_0x925e71(0x26c)](_0x3d4d60,_0xa107fe);},VisuMZ[_0x4b39fb(0x18d)]['Window_Options_statusText']=Window_Options['prototype'][_0x4b39fb(0x1e6)],Window_Options[_0x4b39fb(0x46a)][_0x4b39fb(0x1e6)]=function(_0x13b454){const _0x22c723=_0x4b39fb,_0xb6c25d=this[_0x22c723(0x29d)](_0x13b454);if(_0xb6c25d===_0x22c723(0x3b7))return this[_0x22c723(0x306)]();if(_0xb6c25d===_0x22c723(0x200))return this[_0x22c723(0x23b)]();return VisuMZ[_0x22c723(0x18d)]['Window_Options_statusText'][_0x22c723(0x408)](this,_0x13b454);},Window_Options[_0x4b39fb(0x46a)][_0x4b39fb(0x306)]=function(){const _0x2853df=_0x4b39fb,_0x38f0c7=ConfigManager[_0x2853df(0x3b7)];return TextManager[_0x2853df(0x1c1)](_0x38f0c7);},Window_Options[_0x4b39fb(0x46a)]['textSpeedStatusText']=function(){const _0x40c954=_0x4b39fb,_0x17a597=this[_0x40c954(0x27d)](_0x40c954(0x200));return _0x17a597>0xa?TextManager[_0x40c954(0x478)]:_0x17a597;},VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x511)]=Window_Options['prototype'][_0x4b39fb(0x334)],Window_Options[_0x4b39fb(0x46a)][_0x4b39fb(0x334)]=function(_0x40ee0e){const _0x37677a=_0x4b39fb;if(_0x40ee0e==='textLocale')return!![];if(_0x40ee0e==='textSpeed')return!![];return VisuMZ[_0x37677a(0x18d)]['Window_Options_isVolumeSymbol'][_0x37677a(0x408)](this,_0x40ee0e);},VisuMZ['MessageCore']['Window_Options_changeVolume']=Window_Options[_0x4b39fb(0x46a)][_0x4b39fb(0x338)],Window_Options[_0x4b39fb(0x46a)][_0x4b39fb(0x338)]=function(_0x29f8b9,_0x1a0a2c,_0x50a6c6){const _0x4570aa=_0x4b39fb;if(_0x29f8b9==='textLocale')return this[_0x4570aa(0x55c)](_0x1a0a2c,_0x50a6c6);if(_0x29f8b9===_0x4570aa(0x200))return this[_0x4570aa(0x418)](_0x29f8b9,_0x1a0a2c,_0x50a6c6);VisuMZ['MessageCore']['Window_Options_changeVolume'][_0x4570aa(0x408)](this,_0x29f8b9,_0x1a0a2c,_0x50a6c6);},Window_Options[_0x4b39fb(0x46a)][_0x4b39fb(0x55c)]=function(_0x2a48be,_0x3dbe70){const _0x460e3b=_0x4b39fb,_0x4ac28c=VisuMZ[_0x460e3b(0x18d)][_0x460e3b(0x494)]['Localization']['Languages']||[],_0x1980b8=ConfigManager['textLocale'];let _0x2347bf=_0x4ac28c[_0x460e3b(0x365)](_0x1980b8);_0x2347bf+=_0x2a48be?0x1:-0x1;if(_0x2347bf>=_0x4ac28c[_0x460e3b(0x3d0)])_0x2347bf=_0x3dbe70?0x0:_0x4ac28c[_0x460e3b(0x3d0)]-0x1;if(_0x2347bf<0x0)_0x2347bf=_0x3dbe70?_0x4ac28c['length']-0x1:0x0;this[_0x460e3b(0x281)](_0x460e3b(0x3b7),_0x4ac28c[_0x2347bf]);},Window_Options[_0x4b39fb(0x46a)][_0x4b39fb(0x418)]=function(_0x324718,_0x192b46,_0x2137e7){const _0x5ceaff=_0x4b39fb,_0x2df08f=this['getConfigValue'](_0x324718),_0x28ea0e=0x1,_0x33d12a=_0x2df08f+(_0x192b46?_0x28ea0e:-_0x28ea0e);_0x33d12a>0xb&&_0x2137e7?this[_0x5ceaff(0x281)](_0x324718,0x1):this[_0x5ceaff(0x281)](_0x324718,_0x33d12a[_0x5ceaff(0x195)](0x1,0xb));},Window_Message[_0x4b39fb(0x46a)]['contentsHeight']=function(){const _0x25d539=_0x4b39fb;let _0x281aa6=Window_Base[_0x25d539(0x46a)][_0x25d539(0x456)]['call'](this);return _0x281aa6-=this[_0x25d539(0x416)](),_0x281aa6;},Window_Message[_0x4b39fb(0x46a)]['refreshDimmerBitmap']=function(){const _0x388cf7=_0x4b39fb;Window_Base[_0x388cf7(0x46a)][_0x388cf7(0x551)]['call'](this),VisuMZ[_0x388cf7(0x18d)][_0x388cf7(0x494)][_0x388cf7(0x447)][_0x388cf7(0x305)]&&this[_0x388cf7(0x422)]();},Window_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x422)]=function(){const _0x27c17b=_0x4b39fb;this[_0x27c17b(0x2ec)]['x']=Math[_0x27c17b(0x1b1)](this[_0x27c17b(0x25e)]/0x2),this[_0x27c17b(0x2ec)][_0x27c17b(0x1b6)]['x']=0.5,this[_0x27c17b(0x2ec)]['scale']['x']=Graphics[_0x27c17b(0x25e)];},VisuMZ[_0x4b39fb(0x18d)]['Window_Message_clearFlags']=Window_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x272)],Window_Message[_0x4b39fb(0x46a)]['clearFlags']=function(){const _0x464895=_0x4b39fb;VisuMZ['MessageCore']['Window_Message_clearFlags']['call'](this),this['clearActorNameAutoColor'](),this[_0x464895(0x54d)](),this['setColorLock'](![]),this[_0x464895(0x475)](_0x464895(0x473)),this[_0x464895(0x2e2)](VisuMZ[_0x464895(0x18d)][_0x464895(0x494)][_0x464895(0x447)][_0x464895(0x560)]);},Window_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x54d)]=function(){const _0x32643f=_0x4b39fb;this[_0x32643f(0x289)]($gameSystem[_0x32643f(0x472)]());},Window_Message['prototype']['isAutoColorAffected']=function(){return!![];},Window_Message[_0x4b39fb(0x46a)]['setTextDelay']=function(_0x1f33dd){const _0x13a5a3=_0x4b39fb,_0x4dd736=0xb-ConfigManager[_0x13a5a3(0x200)];_0x1f33dd=Math['round'](_0x1f33dd*_0x4dd736),this[_0x13a5a3(0x3eb)]=_0x1f33dd,this['_textDelay']=_0x1f33dd;},VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x4fe)]=Window_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x45f)],Window_Message['prototype'][_0x4b39fb(0x45f)]=function(){const _0x4db56f=_0x4b39fb;return VisuMZ[_0x4db56f(0x18d)][_0x4db56f(0x4fe)]['call'](this)||Input[_0x4db56f(0x4ee)](VisuMZ['MessageCore']['Settings']['General'][_0x4db56f(0x33e)]);},VisuMZ['MessageCore'][_0x4b39fb(0x257)]=Window_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x3ce)],Window_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x3ce)]=function(){const _0x52ff0e=_0x4b39fb;let _0x43dabc=this['y'];this['x']=Math[_0x52ff0e(0x1b1)]((Graphics[_0x52ff0e(0x31d)]-this[_0x52ff0e(0x25e)])/0x2),VisuMZ[_0x52ff0e(0x18d)][_0x52ff0e(0x257)][_0x52ff0e(0x408)](this);if(this[_0x52ff0e(0x415)])this['y']=_0x43dabc;this[_0x52ff0e(0x2b1)](),this[_0x52ff0e(0x567)](),this[_0x52ff0e(0x47e)](),this[_0x52ff0e(0x39a)]();},VisuMZ['MessageCore'][_0x4b39fb(0x571)]=Window_Message[_0x4b39fb(0x46a)]['newPage'],Window_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x3e6)]=function(_0x45bb5a){const _0x55d7d1=_0x4b39fb;this[_0x55d7d1(0x2d8)](_0x45bb5a),this[_0x55d7d1(0x493)](_0x45bb5a),VisuMZ[_0x55d7d1(0x18d)][_0x55d7d1(0x571)][_0x55d7d1(0x408)](this,_0x45bb5a),this[_0x55d7d1(0x318)]();},Window_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x2d8)]=function(_0x1a956e){const _0xc2bbdd=_0x4b39fb;if(!_0x1a956e)return;this[_0xc2bbdd(0x4e5)]=![],_0x1a956e[_0xc2bbdd(0x293)]=this['convertTextMacros'](_0x1a956e['text']),this[_0xc2bbdd(0x44a)]&&(_0x1a956e[_0xc2bbdd(0x293)]=this[_0xc2bbdd(0x559)](_0x1a956e[_0xc2bbdd(0x293)]),this[_0xc2bbdd(0x4e5)]=!![]);},Window_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x559)]=function(_0x3b12cb){const _0xa465f5=_0x4b39fb;if(this[_0xa465f5(0x4e5)])return _0x3b12cb;return Window_Base[_0xa465f5(0x46a)][_0xa465f5(0x559)]['call'](this,_0x3b12cb);},Window_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x493)]=function(_0xf6b158){const _0x3d9e8a=_0x4b39fb;this['prepareForcedPositionEscapeCharacters'](_0xf6b158),this[_0x3d9e8a(0x46d)](_0xf6b158),this[_0x3d9e8a(0x1c7)]();},VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x19d)]=Window_Message['prototype'][_0x4b39fb(0x2e3)],Window_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x2e3)]=function(){const _0x1ab04a=_0x4b39fb;VisuMZ[_0x1ab04a(0x18d)][_0x1ab04a(0x19d)][_0x1ab04a(0x408)](this),this['clearFlags']();if(this['_messagePositionReset'])this[_0x1ab04a(0x3c2)]();},Window_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x1c7)]=function(){const _0x54c53e=_0x4b39fb;this[_0x54c53e(0x25e)]=$gameSystem['getMessageWindowWidth']()+this['addedWidth']();;this[_0x54c53e(0x25e)]=Math['min'](Graphics['width'],this[_0x54c53e(0x25e)]);const _0x3837df=$gameSystem[_0x54c53e(0x22d)]();this[_0x54c53e(0x301)]=SceneManager[_0x54c53e(0x1a0)][_0x54c53e(0x41c)](_0x3837df,![])+this['addedHeight'](),this[_0x54c53e(0x301)]=Math[_0x54c53e(0x42a)](Graphics[_0x54c53e(0x301)],this[_0x54c53e(0x301)]);if($gameTemp[_0x54c53e(0x199)])this[_0x54c53e(0x2a9)]();},Window_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x489)]=function(){return 0x0;},Window_Message[_0x4b39fb(0x46a)]['addedHeight']=function(){return 0x0;},Window_Message[_0x4b39fb(0x46a)]['resetPositionX']=function(){const _0x25dbcf=_0x4b39fb;this['x']=(Graphics[_0x25dbcf(0x31d)]-this[_0x25dbcf(0x25e)])/0x2,$gameTemp[_0x25dbcf(0x199)]=undefined,this[_0x25dbcf(0x47e)]();},Window_Message[_0x4b39fb(0x46a)]['updateMove']=function(){const _0x2062d3=_0x4b39fb,_0x30351c={'x':this['x'],'y':this['y']};Window_Base[_0x2062d3(0x46a)][_0x2062d3(0x518)][_0x2062d3(0x408)](this),this[_0x2062d3(0x455)](_0x30351c);},Window_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x550)]=function(){return!![];},Window_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x455)]=function(_0x3a294e){const _0x50088b=_0x4b39fb;this[_0x50088b(0x38b)]&&(this[_0x50088b(0x38b)]['x']+=this['x']-_0x3a294e['x'],this[_0x50088b(0x38b)]['y']+=this['y']-_0x3a294e['y']);},Window_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x470)]=function(_0x4c48a6,_0x4f1a6f){const _0x280daa=_0x4b39fb;this[_0x280daa(0x3d6)](this[_0x280daa(0x33f)]['x'],this[_0x280daa(0x291)]*(Graphics['boxHeight']-this['height'])/0x2,this['_resetRect'][_0x280daa(0x25e)],this['_resetRect'][_0x280daa(0x301)],_0x4c48a6,_0x4f1a6f);},Window_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x319)]=function(_0x13741f){const _0x3041af=_0x4b39fb,_0x1deaea=Window_Base['prototype'][_0x3041af(0x319)][_0x3041af(0x408)](this,_0x13741f);_0x13741f[_0x3041af(0x2f6)]&&this['launchMessageCommonEvent'](_0x1deaea);},Window_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x2de)]=function(_0x47c6a3){const _0x417aeb=_0x4b39fb;if($gameParty[_0x417aeb(0x1ed)]()){}else $gameMap['addMessageCommonEvent'](_0x47c6a3);},Window_Message[_0x4b39fb(0x46a)]['processCharacter']=function(_0x4fa38d){const _0x35b545=_0x4b39fb;this[_0x35b545(0x3eb)]--,this[_0x35b545(0x3eb)]<=0x0&&(this['onProcessCharacter'](_0x4fa38d),Window_Base['prototype'][_0x35b545(0x2c5)][_0x35b545(0x408)](this,_0x4fa38d));},Window_Message[_0x4b39fb(0x46a)]['onProcessCharacter']=function(_0x1757e7){const _0x3529cd=_0x4b39fb;this[_0x3529cd(0x3eb)]=this[_0x3529cd(0x3ed)];if(this[_0x3529cd(0x3ed)]<=0x0)this[_0x3529cd(0x4dc)]=!![];},VisuMZ['MessageCore'][_0x4b39fb(0x3d8)]=Window_Message[_0x4b39fb(0x46a)]['processEscapeCharacter'],Window_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x42f)]=function(_0x49fbed,_0x107801){const _0x1fe0b2=_0x4b39fb;!_0x107801['drawing']?Window_Base['prototype']['processEscapeCharacter'][_0x1fe0b2(0x408)](this,_0x49fbed,_0x107801):VisuMZ['MessageCore'][_0x1fe0b2(0x3d8)][_0x1fe0b2(0x408)](this,_0x49fbed,_0x107801);},VisuMZ[_0x4b39fb(0x18d)]['Window_Message_needsNewPage']=Window_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x2e8)],Window_Message['prototype'][_0x4b39fb(0x2e8)]=function(_0xf4cda9){const _0x259768=_0x4b39fb;if(this[_0x259768(0x4ff)])return![];return VisuMZ[_0x259768(0x18d)][_0x259768(0x45b)][_0x259768(0x408)](this,_0xf4cda9);},Window_Message['prototype']['prepareForcedPositionEscapeCharacters']=function(_0x22d8f8){const _0x39ca84=_0x4b39fb;let _0xd14174=_0x22d8f8[_0x39ca84(0x293)];this[_0x39ca84(0x1bd)]={};if(this[_0x39ca84(0x441)]())return _0xd14174;_0xd14174=_0xd14174[_0x39ca84(0x2fd)](/<POSITION:[ ]*(.*?)>/gi,(_0xd4e746,_0x2c0ffa)=>{const _0x126ce3=_0x39ca84,_0x27b76b=_0x2c0ffa[_0x126ce3(0x4cd)](',')[_0x126ce3(0x22f)](_0x56d576=>Number(_0x56d576)||0x0);if(_0x27b76b[0x0]!==undefined)this['_forcedPosition']['x']=Number(_0x27b76b[0x0]);if(_0x27b76b[0x1]!==undefined)this[_0x126ce3(0x1bd)]['y']=Number(_0x27b76b[0x1]);if(_0x27b76b[0x2]!==undefined)this[_0x126ce3(0x1bd)][_0x126ce3(0x25e)]=Number(_0x27b76b[0x2]);if(_0x27b76b[0x3]!==undefined)this[_0x126ce3(0x1bd)]['height']=Number(_0x27b76b[0x3]);return'';}),_0xd14174=_0xd14174[_0x39ca84(0x2fd)](/<COORDINATES:[ ]*(.*?)>/gi,(_0x3c00ea,_0x5d53e4)=>{const _0x483723=_0x39ca84,_0xfd091a=_0x5d53e4[_0x483723(0x4cd)](',')[_0x483723(0x22f)](_0x49132e=>Number(_0x49132e)||0x0);if(_0xfd091a[0x0]!==undefined)this[_0x483723(0x1bd)]['x']=Number(_0xfd091a[0x0]);if(_0xfd091a[0x1]!==undefined)this['_forcedPosition']['y']=Number(_0xfd091a[0x1]);return'';}),_0xd14174=_0xd14174[_0x39ca84(0x2fd)](/<DIMENSIONS:[ ]*(.*?)>/gi,(_0x1beaca,_0x40fdc2)=>{const _0x2ea25e=_0x39ca84,_0x5ddd50=_0x40fdc2['split'](',')['map'](_0x3a447f=>Number(_0x3a447f)||0x0);if(_0x5ddd50[0x0]!==undefined)this[_0x2ea25e(0x1bd)][_0x2ea25e(0x25e)]=Number(_0x5ddd50[0x2]);if(_0x5ddd50[0x1]!==undefined)this[_0x2ea25e(0x1bd)]['height']=Number(_0x5ddd50[0x3]);return'';}),_0xd14174=_0xd14174['replace'](/<OFFSET:[ ]*(.*?)>/gi,(_0x31475f,_0x1b83ca)=>{const _0x120b6f=_0x39ca84,_0x50845a=_0x1b83ca[_0x120b6f(0x4cd)](',')['map'](_0x22a070=>Number(_0x22a070)||0x0);let _0x2464ce=_0x50845a[0x0]||0x0,_0x2ec29b=_0x50845a[0x1]||0x0;return $gameSystem[_0x120b6f(0x3bd)](_0x2464ce,_0x2ec29b),'';}),_0x22d8f8[_0x39ca84(0x293)]=_0xd14174;},Window_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x2b1)]=function(){const _0x37fdb6=_0x4b39fb,_0x488100=$gameSystem[_0x37fdb6(0x372)]();this['x']+=_0x488100['x'],this['y']+=_0x488100['y'];},Window_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x567)]=function(){const _0xaaf268=_0x4b39fb;this[_0xaaf268(0x1bd)]=this['_forcedPosition']||{};const _0x12100e=['x','y',_0xaaf268(0x25e),_0xaaf268(0x301)];for(const _0x4c596b of _0x12100e){this[_0xaaf268(0x1bd)][_0x4c596b]!==undefined&&(this[_0x4c596b]=Number(this[_0xaaf268(0x1bd)][_0x4c596b]));}},Window_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x46d)]=function(_0x587cc0){const _0x302bfe=_0x4b39fb;this['_currentAutoSize']=![];let _0x2c65f1=_0x587cc0['text'];_0x2c65f1=_0x2c65f1['replace'](/<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi,()=>{const _0x44a784=_0xa308;return this[_0x44a784(0x262)](_0x2c65f1,!![],!![]),this[_0x44a784(0x1e3)]('none'),'';}),_0x2c65f1=_0x2c65f1['replace'](/<(?:AUTOWIDTH|AUTO WIDTH)>/gi,()=>{const _0x1fb5c0=_0xa308;return this[_0x1fb5c0(0x262)](_0x2c65f1,!![],![]),this[_0x1fb5c0(0x1e3)](_0x1fb5c0(0x49c)),'';}),_0x2c65f1=_0x2c65f1[_0x302bfe(0x2fd)](/<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi,()=>{const _0x489f4d=_0x302bfe;return this[_0x489f4d(0x262)](_0x2c65f1,![],!![]),this[_0x489f4d(0x1e3)](_0x489f4d(0x49c)),'';});if(SceneManager[_0x302bfe(0x217)]())_0x2c65f1=_0x2c65f1['replace'](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x287741,_0x293ba0)=>{const _0x328a0f=_0x302bfe;return this[_0x328a0f(0x262)](_0x2c65f1,!![],!![]),this[_0x328a0f(0x1e3)]('battle\x20actor',Number(_0x293ba0)||0x1),'';}),_0x2c65f1=_0x2c65f1[_0x302bfe(0x2fd)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0xf0198e,_0x2c3c4d)=>{const _0x5eb2fc=_0x302bfe;return this['processAutoSize'](_0x2c65f1,!![],!![]),this[_0x5eb2fc(0x1e3)](_0x5eb2fc(0x21f),Number(_0x2c3c4d)||0x0),'';}),_0x2c65f1=_0x2c65f1[_0x302bfe(0x2fd)](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0x37b077,_0x30cd71)=>{const _0x566acc=_0x302bfe;return this['processAutoSize'](_0x2c65f1,!![],!![]),this[_0x566acc(0x1e3)](_0x566acc(0x499),Number(_0x30cd71)||0x0),'';});else SceneManager[_0x302bfe(0x3ea)]()&&(_0x2c65f1=_0x2c65f1['replace'](/<(?:AUTOPLAYER|AUTO PLAYER)>/gi,(_0x208132,_0xf3a5d9)=>{const _0x453109=_0x302bfe;return this[_0x453109(0x262)](_0x2c65f1,!![],!![]),this[_0x453109(0x1e3)](_0x453109(0x533),0x0),'';}),_0x2c65f1=_0x2c65f1[_0x302bfe(0x2fd)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x2cc5b9,_0x38b1b7)=>{const _0x3fd982=_0x302bfe;return this[_0x3fd982(0x262)](_0x2c65f1,!![],!![]),this[_0x3fd982(0x1e3)](_0x3fd982(0x4b6),Number(_0x38b1b7)||0x1),'';}),_0x2c65f1=_0x2c65f1['replace'](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x316cca,_0x41ee2d)=>{const _0x17748c=_0x302bfe;return this[_0x17748c(0x262)](_0x2c65f1,!![],!![]),this[_0x17748c(0x1e3)]('map\x20party',Number(_0x41ee2d)||0x0),'';}),_0x2c65f1=_0x2c65f1[_0x302bfe(0x2fd)](/<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi,(_0x16db42,_0x32cf2d)=>{const _0x411546=_0x302bfe;return this[_0x411546(0x262)](_0x2c65f1,!![],!![]),this[_0x411546(0x1e3)](_0x411546(0x228),Number(_0x32cf2d)||0x0),'';}));_0x587cc0['text']=_0x2c65f1;},Window_Message['_autoSizeRegexp']=/<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi,Window_Message[_0x4b39fb(0x1f6)]=/<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,Window_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x262)]=function(_0x57fac6,_0x111775,_0xc2185){const _0x45532e=_0x4b39fb;_0x57fac6=_0x57fac6[_0x45532e(0x2fd)](Window_Message['_autoSizeRegexp'],''),_0x57fac6=_0x57fac6['replace'](Window_Message['_autoPosRegExp'],''),this[_0x45532e(0x4c0)]=!![],this['_currentAutoSize']=!![],this[_0x45532e(0x289)](![]);const _0xd92ee2=this[_0x45532e(0x43f)](_0x57fac6);if(_0x111775){let _0x2bf6bc=_0xd92ee2[_0x45532e(0x25e)]+$gameSystem[_0x45532e(0x2da)]()*0x2+0x6;const _0x2c4917=$gameMessage[_0x45532e(0x366)]()!=='',_0x54259c=ImageManager[_0x45532e(0x308)],_0x5276fd=0x14;_0x2bf6bc+=_0x2c4917?_0x54259c+_0x5276fd:0x4;if(_0x2bf6bc%0x2!==0x0)_0x2bf6bc+=0x1;$gameSystem[_0x45532e(0x2e1)](_0x2bf6bc);}if(_0xc2185){let _0x128a8e=Math['ceil'](_0xd92ee2[_0x45532e(0x301)]/this[_0x45532e(0x1c9)]());$gameSystem['setMessageWindowRows'](_0x128a8e);}this[_0x45532e(0x414)](),this[_0x45532e(0x21e)](),this['_autoSizeCheck']=![],this[_0x45532e(0x3f1)]=!![];},Window_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x414)]=function(){const _0x3081ab=_0x4b39fb;this[_0x3081ab(0x1c7)](),this[_0x3081ab(0x3ce)](),this[_0x3081ab(0x2a9)](),this['updateTransform'](),this[_0x3081ab(0x4a7)][_0x3081ab(0x23f)](),this[_0x3081ab(0x318)]();},Window_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x1e3)]=function(_0x369e23,_0x860759){const _0x25a745=_0x4b39fb;switch(_0x369e23['toLowerCase']()[_0x25a745(0x317)]()){case'battle\x20actor':this['_autoPositionTarget']=$gameActors[_0x25a745(0x3b5)](_0x860759);break;case'battle\x20party':this[_0x25a745(0x415)]=$gameParty[_0x25a745(0x343)]()[_0x860759-0x1];break;case _0x25a745(0x499):this['_autoPositionTarget']=$gameTroop[_0x25a745(0x343)]()[_0x860759-0x1];break;case _0x25a745(0x533):this[_0x25a745(0x415)]=$gamePlayer;break;case _0x25a745(0x4b6):const _0x497ad4=$gameActors[_0x25a745(0x3b5)](_0x860759)[_0x25a745(0x320)]();_0x497ad4===0x0?this['_autoPositionTarget']=$gamePlayer:this[_0x25a745(0x415)]=$gamePlayer['followers']()['follower'](_0x497ad4-0x1);break;case'map\x20party':_0x860759===0x1?this['_autoPositionTarget']=$gamePlayer:this[_0x25a745(0x415)]=$gamePlayer['followers']()[_0x25a745(0x1aa)](_0x860759-0x2);break;case _0x25a745(0x228):this[_0x25a745(0x415)]=$gameMap[_0x25a745(0x526)](_0x860759);break;}this[_0x25a745(0x415)]&&this[_0x25a745(0x1a4)]();},VisuMZ[_0x4b39fb(0x18d)]['Window_Message_synchronizeNameBox']=Window_Message['prototype'][_0x4b39fb(0x2bf)],Window_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x2bf)]=function(){const _0x2405e3=_0x4b39fb;this[_0x2405e3(0x1a4)](),VisuMZ['MessageCore'][_0x2405e3(0x3ff)][_0x2405e3(0x408)](this);},Window_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x1a4)]=function(){const _0x313109=_0x4b39fb;if(!this[_0x313109(0x415)])return;const _0x323a03=SceneManager[_0x313109(0x1a0)];if(!_0x323a03)return;const _0x4a30e8=_0x323a03[_0x313109(0x19a)];if(!_0x4a30e8)return;const _0x2b8668=_0x4a30e8['findTargetSprite'](this[_0x313109(0x415)]);if(!_0x2b8668)return;let _0x702949=_0x2b8668['x'];if(SceneManager[_0x313109(0x3ea)]())_0x702949*=$gameScreen[_0x313109(0x4d8)]();else{if(SceneManager[_0x313109(0x217)]()&&Imported[_0x313109(0x364)]){let _0x2fdaf2=_0x2b8668['x']-Graphics['boxWidth']*_0x4a30e8[_0x313109(0x1b6)]['x'];_0x702949+=_0x2fdaf2*(_0x4a30e8[_0x313109(0x32f)]['x']-0x1);}}_0x702949-=this[_0x313109(0x25e)]/0x2,_0x702949-=(Graphics[_0x313109(0x25e)]-Graphics[_0x313109(0x31d)])/0x2,_0x702949+=this[_0x313109(0x26d)]();let _0x118d3e=_0x2b8668['y'];if(SceneManager['isSceneMap']())_0x118d3e-=_0x2b8668[_0x313109(0x301)]+0x8,_0x118d3e*=$gameScreen[_0x313109(0x4d8)](),_0x118d3e-=this[_0x313109(0x301)]*$gameScreen[_0x313109(0x4d8)]();else{if(SceneManager['isSceneBattle']()&&Imported['VisuMZ_3_ActSeqCamera']){let _0x4b5f1c=_0x2b8668[_0x313109(0x301)]*_0x4a30e8[_0x313109(0x32f)]['y'];_0x118d3e-=this[_0x313109(0x301)]*_0x4a30e8[_0x313109(0x32f)]['y']+_0x4b5f1c+0x8;let _0x49a12f=_0x2b8668['y']-Graphics[_0x313109(0x424)]*_0x4a30e8['anchor']['y'];_0x118d3e+=_0x49a12f*(_0x4a30e8[_0x313109(0x32f)]['y']-0x1);}else _0x118d3e-=_0x2b8668['height']+0x8,_0x118d3e-=this[_0x313109(0x301)];}_0x118d3e-=(Graphics[_0x313109(0x301)]-Graphics[_0x313109(0x424)])/0x2,_0x118d3e+=this['autoPositionOffsetY']();const _0x558859=$gameSystem[_0x313109(0x372)]();_0x702949+=_0x558859['x'],_0x118d3e+=_0x558859['y'],this['x']=Math[_0x313109(0x1b1)](_0x702949),this['y']=Math[_0x313109(0x1b1)](_0x118d3e),this[_0x313109(0x47e)](!![],![]),this['_forcedPosition']=this[_0x313109(0x1bd)]||{},this['_forcedPosition']['x']=this['x'],this[_0x313109(0x1bd)]['y']=this['y'],this[_0x313109(0x1bd)][_0x313109(0x25e)]=this[_0x313109(0x25e)],this[_0x313109(0x1bd)][_0x313109(0x301)]=this[_0x313109(0x301)],this[_0x313109(0x38b)][_0x313109(0x3ce)]();},Window_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x26d)]=function(){return 0x0;},Window_Message[_0x4b39fb(0x46a)]['autoPositionOffsetY']=function(){return 0x0;},Window_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x3c2)]=function(){const _0x1beab6=_0x4b39fb;this['_messagePositionReset']=![],this[_0x1beab6(0x415)]=undefined,$gameSystem[_0x1beab6(0x384)](),this[_0x1beab6(0x414)](),this['openness']=0x0;},Window_Message['prototype'][_0x4b39fb(0x2d9)]=function(_0x21fede){return Window_Base['prototype']['preConvertEscapeCharacters']['call'](this,_0x21fede);},Window_Message[_0x4b39fb(0x46a)][_0x4b39fb(0x322)]=function(_0x310f94){const _0x5568e4=_0x4b39fb;return Window_Base['prototype'][_0x5568e4(0x322)]['call'](this,_0x310f94);},Window_Message[_0x4b39fb(0x46a)]['flushTextState']=function(_0x50f3f1){const _0x1adee3=_0x4b39fb;this[_0x1adee3(0x25c)](_0x50f3f1),Window_Base['prototype'][_0x1adee3(0x3b9)][_0x1adee3(0x408)](this,_0x50f3f1),this[_0x1adee3(0x2d4)](_0x50f3f1);},Window_Message['prototype'][_0x4b39fb(0x25c)]=function(_0x20727e){},Window_Message[_0x4b39fb(0x46a)]['postFlushTextState']=function(_0x11f78c){},Window_NameBox[_0x4b39fb(0x46a)][_0x4b39fb(0x509)]=function(){return![];},Window_NameBox['prototype'][_0x4b39fb(0x558)]=function(){const _0x165142=_0x4b39fb;Window_Base['prototype'][_0x165142(0x558)][_0x165142(0x408)](this),this[_0x165142(0x187)](this[_0x165142(0x4c1)]());},Window_NameBox[_0x4b39fb(0x46a)][_0x4b39fb(0x4c1)]=function(){const _0x2c3718=_0x4b39fb,_0x1dfc45=VisuMZ[_0x2c3718(0x18d)][_0x2c3718(0x494)][_0x2c3718(0x447)][_0x2c3718(0x292)];return ColorManager[_0x2c3718(0x1a8)](_0x1dfc45);},VisuMZ[_0x4b39fb(0x18d)]['Window_NameBox_updatePlacement']=Window_NameBox[_0x4b39fb(0x46a)][_0x4b39fb(0x3ce)],Window_NameBox[_0x4b39fb(0x46a)][_0x4b39fb(0x3ce)]=function(){const _0x23784d=_0x4b39fb;VisuMZ[_0x23784d(0x18d)][_0x23784d(0x1b8)]['call'](this),this[_0x23784d(0x302)](),this[_0x23784d(0x328)](),this[_0x23784d(0x47e)](),this['updateOverlappingY']();},Window_NameBox['prototype'][_0x4b39fb(0x2d9)]=function(_0x46ce75){const _0x5a6b2d=_0x4b39fb;return _0x46ce75=_0x46ce75[_0x5a6b2d(0x2fd)](/<LEFT>/gi,this['setRelativePosition'][_0x5a6b2d(0x397)](this,0x0)),_0x46ce75=_0x46ce75['replace'](/<CENTER>/gi,this[_0x5a6b2d(0x26f)][_0x5a6b2d(0x397)](this,0x5)),_0x46ce75=_0x46ce75[_0x5a6b2d(0x2fd)](/<RIGHT>/gi,this[_0x5a6b2d(0x26f)][_0x5a6b2d(0x397)](this,0xa)),_0x46ce75=_0x46ce75[_0x5a6b2d(0x2fd)](/<POSITION:[ ](\d+)>/gi,(_0xbf83fd,_0x6d9a3b)=>this[_0x5a6b2d(0x26f)](parseInt(_0x6d9a3b))),_0x46ce75=_0x46ce75[_0x5a6b2d(0x2fd)](/<\/LEFT>/gi,''),_0x46ce75=_0x46ce75[_0x5a6b2d(0x2fd)](/<\/CENTER>/gi,''),_0x46ce75=_0x46ce75['replace'](/<\/RIGHT>/gi,''),_0x46ce75=_0x46ce75[_0x5a6b2d(0x317)](),Window_Base[_0x5a6b2d(0x46a)][_0x5a6b2d(0x2d9)][_0x5a6b2d(0x408)](this,_0x46ce75);},Window_NameBox[_0x4b39fb(0x46a)][_0x4b39fb(0x26f)]=function(_0x2e744f){const _0x211410=_0x4b39fb;return this[_0x211410(0x3f9)]=_0x2e744f,'';},Window_NameBox[_0x4b39fb(0x46a)][_0x4b39fb(0x302)]=function(){const _0x30a44d=_0x4b39fb;if($gameMessage[_0x30a44d(0x504)]())return;this[_0x30a44d(0x3f9)]=this[_0x30a44d(0x3f9)]||0x0;const _0x2d7763=this[_0x30a44d(0x516)],_0x128c9c=Math[_0x30a44d(0x276)](_0x2d7763[_0x30a44d(0x25e)]*this[_0x30a44d(0x3f9)]/0xa);this['x']=_0x2d7763['x']+_0x128c9c-Math[_0x30a44d(0x276)](this[_0x30a44d(0x25e)]/0x2),this['x']=this['x']['clamp'](_0x2d7763['x'],_0x2d7763['x']+_0x2d7763[_0x30a44d(0x25e)]-this[_0x30a44d(0x25e)]);},Window_NameBox[_0x4b39fb(0x46a)][_0x4b39fb(0x328)]=function(){const _0xee35e4=_0x4b39fb;if($gameMessage['isRTL']())return;this[_0xee35e4(0x3f9)]=this['_relativePosition']||0x0;const _0x5478d0=VisuMZ[_0xee35e4(0x18d)][_0xee35e4(0x494)][_0xee35e4(0x447)]['NameBoxWindowOffsetX'],_0xfddc2c=VisuMZ['MessageCore'][_0xee35e4(0x494)]['General']['NameBoxWindowOffsetY'],_0xf746b0=(0x5-this[_0xee35e4(0x3f9)])/0x5;this['x']+=Math[_0xee35e4(0x276)](_0x5478d0*_0xf746b0),this['y']+=_0xfddc2c;},Window_NameBox[_0x4b39fb(0x46a)][_0x4b39fb(0x3e0)]=function(){const _0x49d039=_0x4b39fb,_0x210c0d=this[_0x49d039(0x516)],_0x206851=_0x210c0d['y'],_0xffee31=VisuMZ['MessageCore'][_0x49d039(0x494)][_0x49d039(0x447)][_0x49d039(0x191)];_0x206851>this['y']&&_0x206851<this['y']+this[_0x49d039(0x301)]-_0xffee31&&(this['y']=_0x210c0d['y']+_0x210c0d[_0x49d039(0x301)]);},VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x48f)]=Window_NameBox[_0x4b39fb(0x46a)][_0x4b39fb(0x23d)],Window_NameBox[_0x4b39fb(0x46a)][_0x4b39fb(0x23d)]=function(){const _0x428e0d=_0x4b39fb;this[_0x428e0d(0x3f9)]=0x0,VisuMZ['MessageCore'][_0x428e0d(0x48f)][_0x428e0d(0x408)](this);},Window_ChoiceList[_0x4b39fb(0x46a)][_0x4b39fb(0x441)]=function(){return![];},Window_ChoiceList[_0x4b39fb(0x46a)][_0x4b39fb(0x509)]=function(){return!![];},Window_ChoiceList[_0x4b39fb(0x46a)][_0x4b39fb(0x362)]=function(){return $gameSystem['getChoiceListLineHeight']()+0x8;},Window_ChoiceList[_0x4b39fb(0x46a)][_0x4b39fb(0x40a)]=function(){const _0x3bba49=_0x4b39fb;return $gameSystem[_0x3bba49(0x277)]();},Window_ChoiceList[_0x4b39fb(0x46a)][_0x4b39fb(0x30e)]=function(){const _0x510a4d=_0x4b39fb;this[_0x510a4d(0x23d)](),this[_0x510a4d(0x278)](),this['open'](),this[_0x510a4d(0x54a)](),this[_0x510a4d(0x548)]();},Window_ChoiceList['prototype'][_0x4b39fb(0x31a)]=function(){const _0xf4b9db=_0x4b39fb;$gameMessage[_0xf4b9db(0x396)](this[_0xf4b9db(0x346)]()),this[_0xf4b9db(0x516)]['terminateMessage'](),this['close'](),this['_helpWindow']&&(this[_0xf4b9db(0x501)][_0xf4b9db(0x23f)](),this['_helpWindow'][_0xf4b9db(0x44c)]());},VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x549)]=Window_ChoiceList[_0x4b39fb(0x46a)][_0x4b39fb(0x22e)],Window_ChoiceList[_0x4b39fb(0x46a)][_0x4b39fb(0x22e)]=function(){const _0x21d550=_0x4b39fb;VisuMZ[_0x21d550(0x18d)][_0x21d550(0x549)][_0x21d550(0x408)](this),this['_helpWindow']&&(this[_0x21d550(0x501)]['clear'](),this['_helpWindow']['hide']());},Window_ChoiceList[_0x4b39fb(0x46a)]['refresh']=function(){const _0x16983e=_0x4b39fb;this[_0x16983e(0x3c6)](),this['makeCommandList'](),this[_0x16983e(0x516)]&&(this['updatePlacement'](),this[_0x16983e(0x430)]()),this['createContents'](),this[_0x16983e(0x336)](),this[_0x16983e(0x551)](),Window_Selectable['prototype'][_0x16983e(0x23d)][_0x16983e(0x408)](this);},Window_ChoiceList['prototype'][_0x4b39fb(0x1b0)]=function(){const _0x4ff50c=_0x4b39fb;$gameMessage[_0x4ff50c(0x2c7)]?this['makeCommandListScriptCall']():this[_0x4ff50c(0x3be)](),this[_0x4ff50c(0x31b)](),this[_0x4ff50c(0x4b1)]();},Window_ChoiceList[_0x4b39fb(0x46a)][_0x4b39fb(0x53c)]=function(){const _0x575f8d=_0x4b39fb,_0x4840dc=$gameMessage[_0x575f8d(0x536)]();let _0xdcecb0=0x0;for(let _0x5a6c77 of _0x4840dc){_0x5a6c77=this[_0x575f8d(0x2fb)](_0x5a6c77);if(this[_0x575f8d(0x444)](_0x5a6c77)){const _0x1af587=this['parseChoiceText'](_0x5a6c77),_0x14d534=this[_0x575f8d(0x25b)](_0x5a6c77);this[_0x575f8d(0x26c)](_0x1af587,_0x575f8d(0x261),_0x14d534,_0xdcecb0);}_0xdcecb0++;}},Window_ChoiceList[_0x4b39fb(0x46a)][_0x4b39fb(0x3be)]=function(){const _0x15e48f=_0x4b39fb,_0x39b335=$gameMessage[_0x15e48f(0x536)](),_0x575a23=$gameMessage[_0x15e48f(0x265)](),_0x288252=$gameMessage['maxShuffleChoices'](),_0x250658=_0x39b335['length'];let _0x10c08e=0x0;for(let _0x15cfc8=0x0;_0x15cfc8<_0x250658;_0x15cfc8++){if(this[_0x15e48f(0x461)]['length']>=_0x288252)break;const _0x1ed7ec=_0x575a23[_0x15cfc8];let _0x2db3f2=_0x39b335[_0x1ed7ec];if(_0x2db3f2===undefined)continue;_0x2db3f2=this[_0x15e48f(0x2fb)](_0x2db3f2);if(this['isChoiceVisible'](_0x2db3f2)){const _0x49e9e0=this['parseChoiceText'](_0x2db3f2),_0x1a486c=this[_0x15e48f(0x25b)](_0x2db3f2);this[_0x15e48f(0x26c)](_0x49e9e0,_0x15e48f(0x261),_0x1a486c,_0x1ed7ec);}_0x10c08e++;}},Window_ChoiceList['prototype'][_0x4b39fb(0x2fb)]=function(_0x39528f){const _0x2d0232=_0x4b39fb;return Window_Base[_0x2d0232(0x46a)][_0x2d0232(0x184)][_0x2d0232(0x408)](this,_0x39528f);},Window_ChoiceList['prototype'][_0x4b39fb(0x444)]=function(_0x168692){const _0x2951b8=_0x4b39fb;if(Imported[_0x2951b8(0x522)])$gameMessage[_0x2951b8(0x506)]();if(_0x168692['match'](/<HIDE>/i))return![];if(_0x168692['match'](/<SHOW>/i))return!![];if(_0x168692[_0x2951b8(0x204)](/<SHOW[ ](?:|ALL )(?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x587223=RegExp['$1'][_0x2951b8(0x4cd)](',')['map'](_0x234cb5=>Number(_0x234cb5)||0x0);if(_0x587223[_0x2951b8(0x3d4)](_0x1ab44b=>!$gameSwitches[_0x2951b8(0x1c3)](_0x1ab44b)))return![];}if(_0x168692['match'](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x223091=RegExp['$1'][_0x2951b8(0x4cd)](',')['map'](_0x3fcda3=>Number(_0x3fcda3)||0x0);if(_0x223091['every'](_0x2a75cf=>!$gameSwitches[_0x2951b8(0x1c3)](_0x2a75cf)))return![];}if(_0x168692[_0x2951b8(0x204)](/<HIDE[ ](?:|ALL )(?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x133a96=RegExp['$1'][_0x2951b8(0x4cd)](',')[_0x2951b8(0x22f)](_0x3ea49c=>Number(_0x3ea49c)||0x0);if(_0x133a96[_0x2951b8(0x327)](_0x52dd1a=>$gameSwitches[_0x2951b8(0x1c3)](_0x52dd1a)))return![];}if(_0x168692[_0x2951b8(0x204)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x2ac6e0=RegExp['$1'][_0x2951b8(0x4cd)](',')[_0x2951b8(0x22f)](_0x998920=>Number(_0x998920)||0x0);if(_0x2ac6e0[_0x2951b8(0x3d4)](_0x3e2688=>$gameSwitches['value'](_0x3e2688)))return![];}return!![];},Window_ChoiceList[_0x4b39fb(0x46a)][_0x4b39fb(0x56c)]=function(_0x2c2039){let _0xd0262c=_0x2c2039;return _0xd0262c=_0xd0262c['replace'](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0xd0262c=_0xd0262c['replace'](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0xd0262c;},Window_ChoiceList['prototype'][_0x4b39fb(0x25b)]=function(_0x27d196){const _0x1f637a=_0x4b39fb;if(Imported[_0x1f637a(0x522)])$gameMessage[_0x1f637a(0x506)]();if(_0x27d196[_0x1f637a(0x204)](/<DISABLE>/i))return![];if(_0x27d196['match'](/<ENABLE>/i))return!![];if(_0x27d196['match'](/<ENABLE[ ](?:|ALL )(?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x102910=RegExp['$1']['split'](',')['map'](_0x2a26ab=>Number(_0x2a26ab)||0x0);if(_0x102910[_0x1f637a(0x3d4)](_0x4ace41=>!$gameSwitches[_0x1f637a(0x1c3)](_0x4ace41)))return![];}if(_0x27d196[_0x1f637a(0x204)](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x57e029=RegExp['$1'][_0x1f637a(0x4cd)](',')['map'](_0x4a2363=>Number(_0x4a2363)||0x0);if(_0x57e029[_0x1f637a(0x327)](_0x586448=>!$gameSwitches[_0x1f637a(0x1c3)](_0x586448)))return![];}if(_0x27d196[_0x1f637a(0x204)](/<DISABLE[ ](?:|ALL )(?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x57b3f5=RegExp['$1'][_0x1f637a(0x4cd)](',')[_0x1f637a(0x22f)](_0x45c8bd=>Number(_0x45c8bd)||0x0);if(_0x57b3f5['every'](_0x378eb2=>$gameSwitches[_0x1f637a(0x1c3)](_0x378eb2)))return![];}if(_0x27d196[_0x1f637a(0x204)](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x357d66=RegExp['$1'][_0x1f637a(0x4cd)](',')['map'](_0x3fa213=>Number(_0x3fa213)||0x0);if(_0x357d66[_0x1f637a(0x3d4)](_0x539d7b=>$gameSwitches[_0x1f637a(0x1c3)](_0x539d7b)))return![];}return!![];},Window_ChoiceList[_0x4b39fb(0x46a)][_0x4b39fb(0x31b)]=function(){const _0x5283c3=_0x4b39fb;this['_choiceHelpDescriptions']={},this[_0x5283c3(0x501)]&&(this['_helpWindow'][_0x5283c3(0x23f)](),this[_0x5283c3(0x501)]['hide']());},Window_ChoiceList['prototype'][_0x4b39fb(0x4b1)]=function(){const _0x4419c9=_0x4b39fb,_0x334b57=/<(?:HELP|HELP DESCRIPTION|DESCRIPTION)>\s*([\s\S]*)\s*<\/(?:HELP|HELP DESCRIPTION|DESCRIPTION)>/i;for(const _0xa3f215 of this[_0x4419c9(0x461)]){if(!_0xa3f215)continue;const _0x3c1fd2=this[_0x4419c9(0x461)][_0x4419c9(0x365)](_0xa3f215);if(_0xa3f215[_0x4419c9(0x56e)][_0x4419c9(0x204)](_0x334b57)){const _0x2da558=String(RegExp['$1']);this[_0x4419c9(0x407)][_0x3c1fd2]=_0x2da558[_0x4419c9(0x317)](),_0xa3f215['name']=_0xa3f215[_0x4419c9(0x56e)][_0x4419c9(0x2fd)](_0x334b57,'')[_0x4419c9(0x317)]();}else this[_0x4419c9(0x407)][_0x3c1fd2]='';}},Window_ChoiceList[_0x4b39fb(0x46a)][_0x4b39fb(0x548)]=function(){const _0x5a50ab=_0x4b39fb;if(this[_0x5a50ab(0x461)][_0x5a50ab(0x3d4)](_0x3c2eb3=>_0x3c2eb3[_0x5a50ab(0x222)]))return;this[_0x5a50ab(0x373)](),this[_0x5a50ab(0x2be)](),$gameMessage[_0x5a50ab(0x476)]=[],this[_0x5a50ab(0x516)][_0x5a50ab(0x391)]()&&this[_0x5a50ab(0x516)][_0x5a50ab(0x3d1)]();},VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x53a)]=Window_ChoiceList[_0x4b39fb(0x46a)][_0x4b39fb(0x3ce)],Window_ChoiceList['prototype'][_0x4b39fb(0x3ce)]=function(){const _0x1da161=_0x4b39fb;VisuMZ['MessageCore'][_0x1da161(0x53a)]['call'](this),this[_0x1da161(0x4a2)](),this[_0x1da161(0x47e)]();},Window_ChoiceList[_0x4b39fb(0x46a)]['placeCancelButton']=function(){const _0x573b03=_0x4b39fb;if(!this[_0x573b03(0x1cd)])return;const _0x5a02cd=0x8,_0x5a13bb=this['_cancelButton'],_0x18331b=this['x']+this['width'],_0x60f319=Math['floor']((Graphics[_0x573b03(0x25e)]-Graphics['boxWidth'])/0x2);_0x18331b>=Graphics[_0x573b03(0x31d)]+_0x60f319-_0x5a13bb[_0x573b03(0x25e)]+_0x5a02cd?_0x5a13bb['x']=-_0x5a13bb[_0x573b03(0x25e)]-_0x5a02cd:_0x5a13bb['x']=this[_0x573b03(0x25e)]+_0x5a02cd,_0x5a13bb['y']=this[_0x573b03(0x301)]/0x2-_0x5a13bb[_0x573b03(0x301)]/0x2;},VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x28e)]=Window_ChoiceList[_0x4b39fb(0x46a)][_0x4b39fb(0x54b)],Window_ChoiceList[_0x4b39fb(0x46a)][_0x4b39fb(0x54b)]=function(){const _0x488361=_0x4b39fb;return this[_0x488361(0x516)]?this[_0x488361(0x243)]():VisuMZ['MessageCore']['Window_ChoiceList_windowX'][_0x488361(0x408)](this);},Window_ChoiceList['prototype']['messageCoreWindowX']=function(){const _0x6fa2da=_0x4b39fb,_0x2691c1=$gameMessage['choicePositionType']();if(_0x2691c1===0x1)return(Graphics[_0x6fa2da(0x31d)]-this['windowWidth']())/0x2;else return _0x2691c1===0x2?this[_0x6fa2da(0x516)]['x']+this['_messageWindow']['width']-this[_0x6fa2da(0x40c)]():this[_0x6fa2da(0x516)]['x'];},Window_ChoiceList[_0x4b39fb(0x46a)]['windowWidth']=function(){const _0x1a92f9=_0x4b39fb,_0x23561f=(this[_0x1a92f9(0x267)]()+this[_0x1a92f9(0x232)]())*this[_0x1a92f9(0x40a)]()+this[_0x1a92f9(0x3dc)]*0x2;return Math[_0x1a92f9(0x42a)](_0x23561f,Graphics[_0x1a92f9(0x25e)]);},Window_ChoiceList[_0x4b39fb(0x46a)][_0x4b39fb(0x18b)]=function(){const _0x5b8b10=_0x4b39fb,_0x341b49=$gameMessage[_0x5b8b10(0x536)]()['map'](_0x430cc9=>this[_0x5b8b10(0x2fb)](_0x430cc9))[_0x5b8b10(0x404)](_0x39effe=>this[_0x5b8b10(0x444)](_0x39effe));let _0x35b790=Math[_0x5b8b10(0x426)](_0x341b49[_0x5b8b10(0x3d0)]/this[_0x5b8b10(0x40a)]());if(!$gameMessage['_scriptCall']){const _0x4f2c13=$gameMessage[_0x5b8b10(0x4ac)]();_0x35b790=Math[_0x5b8b10(0x426)](Math[_0x5b8b10(0x42a)](_0x4f2c13,_0x341b49[_0x5b8b10(0x3d0)])/this[_0x5b8b10(0x40a)]());}return Math[_0x5b8b10(0x1ea)](0x1,Math[_0x5b8b10(0x42a)](_0x35b790,this['maxLines']()));},Window_ChoiceList['prototype'][_0x4b39fb(0x3ef)]=function(){const _0x385075=_0x4b39fb,_0x9c2be5=this['_messageWindow'],_0x8c421a=_0x9c2be5?_0x9c2be5['y']:0x0,_0x537e67=_0x9c2be5?_0x9c2be5[_0x385075(0x301)]:0x0,_0x134347=Graphics[_0x385075(0x424)]/0x2;return _0x8c421a<_0x134347&&_0x8c421a+_0x537e67>_0x134347?0x4:$gameSystem['getChoiceListMaxRows']();},Window_ChoiceList[_0x4b39fb(0x46a)][_0x4b39fb(0x267)]=function(){const _0x44c9ef=_0x4b39fb;let _0x486ae8=this[_0x44c9ef(0x3d9)]();for(const _0x923ffa of this['_list']){const _0x21e61b=_0x923ffa[_0x44c9ef(0x56e)],_0x3d5e74=this[_0x44c9ef(0x1cb)](_0x21e61b),_0x2e862b=this[_0x44c9ef(0x4dd)](_0x21e61b)[_0x44c9ef(0x25e)]+_0x3d5e74,_0x758c7e=Math[_0x44c9ef(0x426)](_0x2e862b)+this[_0x44c9ef(0x466)]()*0x2;_0x486ae8=Math[_0x44c9ef(0x1ea)](_0x486ae8,_0x758c7e);}return _0x486ae8;},Window_ChoiceList[_0x4b39fb(0x46a)][_0x4b39fb(0x3d9)]=function(){const _0x1fbbe7=_0x4b39fb;let _0x553da1=$gameSystem[_0x1fbbe7(0x4ec)]();const _0x2b80d9=$gameMessage[_0x1fbbe7(0x536)]();for(const _0x1eb4d5 of _0x2b80d9){_0x1eb4d5[_0x1fbbe7(0x204)](/<CHOICE WIDTH:[ ](\d+)>/gi)&&(_0x553da1=Math[_0x1fbbe7(0x1ea)](_0x553da1,Number(RegExp['$1'])));}return Math[_0x1fbbe7(0x1ea)](_0x553da1,0x1);},Window_ChoiceList[_0x4b39fb(0x46a)]['addChoiceDistance']=function(){const _0x3eb24a=_0x4b39fb,_0x13cdb1=$gameSystem['getChoiceMessageDistance']()||0x0,_0x3dd39d=this[_0x3eb24a(0x516)]['y'],_0x4cf8c2=this[_0x3eb24a(0x516)]['height'],_0x5a310c=this[_0x3eb24a(0x516)]['_nameBoxWindow'],_0x349913=_0x5a310c['openness']>0x0&&_0x5a310c['width']>0x0,_0xe89b5c=_0x349913?_0x5a310c['height']:0x0;if(_0x13cdb1<0x0&&(this[_0x3eb24a(0x516)][_0x3eb24a(0x402)]()||this[_0x3eb24a(0x516)][_0x3eb24a(0x182)]()))this['y']=Math['round']((Graphics[_0x3eb24a(0x424)]-this['height'])/0x2);else{if(_0x3dd39d>=Graphics[_0x3eb24a(0x424)]/0x2)_0x13cdb1>=0x0?this['y']-=_0x13cdb1:this['y']=Math[_0x3eb24a(0x276)]((_0x3dd39d-this[_0x3eb24a(0x301)]-_0xe89b5c)/0x2);else{if(_0x13cdb1>=0x0)this['y']+=_0x13cdb1;else{const _0x32c1fd=Graphics[_0x3eb24a(0x424)]-(_0x3dd39d+_0x4cf8c2+_0xe89b5c);this['y']+=Math[_0x3eb24a(0x276)]((_0x32c1fd-this['height'])/0x2)+_0xe89b5c;}}}},Window_ChoiceList[_0x4b39fb(0x46a)][_0x4b39fb(0x2f5)]=function(_0x8c3821){const _0x2301b3=_0x4b39fb,_0x11cce0=this['requestChoiceForegroundImage'](_0x8c3821);if(_0x11cce0){const _0x3084f4=ImageManager['loadPicture'](_0x11cce0),_0x3b10ae=this['choiceAlignText'](),_0x430005=_0x3b10ae+this[_0x2301b3(0x477)](_0x8c3821),_0xf9f1fa=this[_0x2301b3(0x2aa)](_0x8c3821);_0x3084f4[_0x2301b3(0x188)](this[_0x2301b3(0x4ab)][_0x2301b3(0x397)](this,_0x8c3821,!![],_0x430005,_0xf9f1fa,_0x3084f4));return;}this['drawItemContents'](_0x8c3821);},Window_ChoiceList[_0x4b39fb(0x46a)][_0x4b39fb(0x1df)]=function(_0xf93449){const _0x32f865=_0x4b39fb,_0x39698c=this['itemRectWithPadding'](_0xf93449),_0x2c1a6d=this[_0x32f865(0x1bc)](),_0x25348a=_0x2c1a6d+this[_0x32f865(0x477)](_0xf93449);this[_0x32f865(0x4f1)](this['isCommandEnabled'](_0xf93449));const _0x36b43a=this[_0x32f865(0x4dd)](_0x25348a)[_0x32f865(0x301)],_0x47831b=_0x39698c['x']+this[_0x32f865(0x1cb)](_0x25348a),_0x50d276=Math['max'](_0x39698c['y'],_0x39698c['y']+Math[_0x32f865(0x1b1)]((_0x39698c[_0x32f865(0x301)]-_0x36b43a)/0x2));this[_0x32f865(0x38a)](_0x25348a,_0x47831b,_0x50d276,_0x39698c['width']),this[_0x32f865(0x1d5)](_0xf93449),this[_0x32f865(0x4c9)](_0xf93449,_0x25348a,_0x39698c);},Window_ChoiceList['prototype']['choiceAlignText']=function(){const _0x28ea2e=_0x4b39fb;return $gameSystem[_0x28ea2e(0x24a)]()!==_0x28ea2e(0x473)?_0x28ea2e(0x3a4)['format']($gameSystem[_0x28ea2e(0x24a)]()):'';},Window_ChoiceList[_0x4b39fb(0x46a)]['getChoiceIndent']=function(_0x3cd603){let _0x5c3eea=0x0;return _0x3cd603['match'](/<(?:CHOICE|CHOICE |)INDENT:[ ](\d+)>/gi)&&(_0x5c3eea=Number(RegExp['$1'])),_0x5c3eea;},Window_ChoiceList['prototype'][_0x4b39fb(0x1d5)]=function(_0x2b0587){const _0xa39832=_0x4b39fb;if(!Imported[_0xa39832(0x43e)])return;const _0x38e3d1=this[_0xa39832(0x477)](_0x2b0587);let _0x4d93b0=![],_0x2ef64a=![],_0x46a832=ColorManager[_0xa39832(0x539)](),_0x52d0b=ColorManager[_0xa39832(0x25f)]();if(_0x38e3d1[_0xa39832(0x204)](/<(?:BGCOLOR|BG COLOR):[ ](.*?),(.*?)>/gi))_0x46a832=ColorManager[_0xa39832(0x3a5)](RegExp['$1'])[_0xa39832(0x317)](),_0x52d0b=ColorManager[_0xa39832(0x3a5)](RegExp['$2'])[_0xa39832(0x317)](),_0x4d93b0=!![];else{if(_0x38e3d1['match'](/<(?:BGCOLOR|BG COLOR):[ ](.*?)>/gi)){let _0x198d83=String(RegExp['$1'])[_0xa39832(0x21c)]()[_0xa39832(0x317)]();switch(_0x198d83){case'red':_0x46a832=_0x52d0b=_0xa39832(0x4bc),_0x2ef64a=!![];break;case _0xa39832(0x3b2):_0x46a832=_0x52d0b=_0xa39832(0x4f9),_0x2ef64a=!![];break;case _0xa39832(0x190):_0x46a832=_0x52d0b='#fff799',_0x2ef64a=!![];break;case _0xa39832(0x1ef):_0x46a832=_0x52d0b=_0xa39832(0x4ce),_0x2ef64a=!![];break;case _0xa39832(0x2f1):_0x46a832=_0x52d0b='#6dcff6',_0x2ef64a=!![];break;case'purple':case _0xa39832(0x527):_0x46a832=_0x52d0b=_0xa39832(0x212),_0x2ef64a=!![];break;case'brown':_0x46a832=_0x52d0b=_0xa39832(0x529),_0x2ef64a=!![];break;case _0xa39832(0x41d):_0x46a832=_0x52d0b=_0xa39832(0x378),_0x2ef64a=!![];break;case _0xa39832(0x481):_0x46a832=_0x52d0b=_0xa39832(0x4e2),_0x2ef64a=!![];break;case _0xa39832(0x28f):case _0xa39832(0x353):_0x46a832=_0x52d0b=_0xa39832(0x238),_0x2ef64a=!![];break;case'black':_0x46a832=_0x52d0b=_0xa39832(0x45a),_0x2ef64a=!![];break;case _0xa39832(0x24f):_0x46a832=_0x52d0b=ColorManager[_0xa39832(0x283)](),_0x2ef64a=!![];break;case'no':_0x46a832=_0x52d0b=ColorManager[_0xa39832(0x51a)](),_0x2ef64a=!![];break;case _0xa39832(0x253):_0x46a832=_0x52d0b=ColorManager[_0xa39832(0x3dd)](),_0x2ef64a=!![];break;case _0xa39832(0x2cf):_0x46a832=_0x52d0b=ColorManager[_0xa39832(0x4d9)](),_0x2ef64a=!![];break;default:_0x46a832=_0x52d0b=ColorManager['getColor'](_0x198d83),_0x2ef64a=!![];break;}_0x4d93b0=!![];}}if(!_0x4d93b0)return;const _0x50a79d=this[_0xa39832(0x425)](_0x2b0587);this[_0xa39832(0x45d)][_0xa39832(0x339)](_0x50a79d['x'],_0x50a79d['y'],_0x50a79d[_0xa39832(0x25e)],_0x50a79d[_0xa39832(0x301)]),this[_0xa39832(0x39b)](_0x50a79d,_0x46a832,_0x52d0b,_0x2ef64a);},Window_ChoiceList['prototype'][_0x4b39fb(0x39b)]=function(_0x4b927e,_0xb0c147,_0x28540a,_0x1803c6){const _0x221ee2=_0x4b39fb,_0x541386=ColorManager[_0x221ee2(0x539)](),_0x326cd2=ColorManager[_0x221ee2(0x38e)](),_0x251dd0=_0xb0c147??ColorManager[_0x221ee2(0x539)](),_0x6a4ce4=_0x28540a??_0xb0c147,_0xada0b3=_0x4b927e['x'],_0x3736e4=_0x4b927e['y'],_0x3f82d5=_0x4b927e['width'],_0x1ef5f8=_0x4b927e['height'];this[_0x221ee2(0x45d)]['gradientFillRect'](_0xada0b3,_0x3736e4,_0x3f82d5,_0x1ef5f8,_0x251dd0,_0x6a4ce4,!![]),_0x1803c6&&this['contentsBack'][_0x221ee2(0x3bf)](_0xada0b3,_0x3736e4,_0x3f82d5,_0x1ef5f8,_0x541386,_0x6a4ce4,!![]),this[_0x221ee2(0x45d)][_0x221ee2(0x51c)](_0xada0b3,_0x3736e4,_0x3f82d5,_0x1ef5f8,_0x541386);},Window_ChoiceList[_0x4b39fb(0x46a)][_0x4b39fb(0x4a8)]=function(_0x1564a0){const _0x4df199=_0x4b39fb,_0xcdb93d=this['choiceAlignText'](),_0x16115d=_0xcdb93d+this[_0x4df199(0x477)](_0x1564a0);let _0x46fdef='';if(_0x16115d['match'](/<FG(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/i))_0x46fdef=String(RegExp['$1'])[_0x4df199(0x317)]();else _0x16115d[_0x4df199(0x204)](/<FG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i)&&(_0x46fdef=String(RegExp['$2'])[_0x4df199(0x317)]());return _0x46fdef;},Window_ChoiceList[_0x4b39fb(0x46a)]['requestChoiceBackgroundImage']=function(_0x3c5298,_0x64994,_0x15ef9c){const _0x3f0dc4=_0x4b39fb;let _0x14ea5c='';if(_0x64994['match'](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/i))_0x14ea5c=String(RegExp['$1'])[_0x3f0dc4(0x317)]();else _0x64994[_0x3f0dc4(0x204)](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i)&&(_0x14ea5c=String(RegExp['$2'])['trim']());if(_0x14ea5c){const _0x20efa1=ImageManager['loadPicture'](_0x14ea5c);_0x20efa1[_0x3f0dc4(0x188)](this['drawChoiceLocationImage'][_0x3f0dc4(0x397)](this,_0x3c5298,![],_0x64994,_0x15ef9c,_0x20efa1));}},Window_ChoiceList[_0x4b39fb(0x46a)]['drawChoiceLocationImage']=function(_0x1c9976,_0xa3b92e,_0x4ede69,_0x361204,_0x228b5c){const _0x107084=_0x4b39fb,_0x1e2d51=this[_0x107084(0x1bc)](),_0x613691=_0x1e2d51+this['commandName'](_0x1c9976);if(_0x4ede69!==_0x613691)return;const _0x52dfb6=this['itemRectWithPadding'](_0x1c9976);if(['x','y',_0x107084(0x25e),_0x107084(0x301)][_0x107084(0x3d4)](_0x17812a=>_0x52dfb6[_0x17812a]!==_0x361204[_0x17812a]))return;let _0x1cbc7e=0x0,_0x249fb0='';if(_0xa3b92e&&_0x613691[_0x107084(0x204)](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/i)){}else{if(_0xa3b92e&&_0x613691['match'](/<FG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i))_0x249fb0=String(RegExp['$1'])[_0x107084(0x21c)]()[_0x107084(0x317)]();else!_0xa3b92e&&_0x613691[_0x107084(0x204)](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i)&&(_0x249fb0=String(RegExp['$1'])[_0x107084(0x21c)]()['trim']());}switch(_0x249fb0){case _0x107084(0x2ac):case _0x107084(0x3e5):case _0x107084(0x2a7):case _0x107084(0x2ad):case'down-left':case'down\x20left':case'1':_0x1cbc7e=0x1;break;case'lowercenter':case _0x107084(0x48c):case _0x107084(0x28a):case _0x107084(0x19c):case _0x107084(0x1b5):case _0x107084(0x420):case'down':case'2':_0x1cbc7e=0x2;break;case'lowerright':case _0x107084(0x4bb):case'lower\x20right':case'downright':case _0x107084(0x570):case _0x107084(0x3e1):case'3':_0x1cbc7e=0x3;break;case _0x107084(0x211):case'middleleft':case _0x107084(0x298):case'4':_0x1cbc7e=0x4;break;case'midcenter':case'middlecenter':case _0x107084(0x51f):case'centered':case'5':_0x1cbc7e=0x5;break;case _0x107084(0x3c1):case _0x107084(0x1cf):case _0x107084(0x32a):case'6':_0x1cbc7e=0x6;break;case _0x107084(0x48a):case _0x107084(0x18c):case _0x107084(0x229):case _0x107084(0x480):case'up-left':case'up\x20left':case'7':_0x1cbc7e=0x7;break;case _0x107084(0x3de):case'upper-center':case _0x107084(0x394):case _0x107084(0x28c):case _0x107084(0x1b4):case'up\x20center':case'up':case'8':_0x1cbc7e=0x8;break;case _0x107084(0x259):case _0x107084(0x437):case _0x107084(0x434):case _0x107084(0x198):case'up-right':case'up\x20right':case'9':_0x1cbc7e=0x9;break;}const _0x1b5695=_0xa3b92e?this[_0x107084(0x4a7)]:this[_0x107084(0x45d)],_0x439c17=this[_0x107084(0x425)](_0x1c9976);!_0xa3b92e&&_0x1b5695['clearRect'](_0x439c17['x']-0x1,_0x439c17['y']-0x1,_0x439c17[_0x107084(0x25e)]+0x2,_0x439c17[_0x107084(0x301)]+0x2);const _0x26a5b6=_0x439c17['x']+0x2,_0x3fca2c=_0x439c17['y']+0x2,_0x260a3f=_0x439c17[_0x107084(0x25e)]-0x4,_0xfaf7d4=_0x439c17[_0x107084(0x301)]-0x4,_0x3cc944=_0x228b5c[_0x107084(0x25e)],_0x3386b2=_0x228b5c[_0x107084(0x301)];let _0x290612=_0x26a5b6,_0x1d3746=_0x3fca2c,_0xd6fdf8=_0x260a3f,_0x192cc8=_0xfaf7d4;const _0x65fb4a=_0x260a3f/_0x3cc944,_0x56c4e1=_0xfaf7d4/_0x3386b2;let _0x42f982=Math['min'](_0x65fb4a,_0x56c4e1);if(_0xa3b92e)_0x42f982=Math[_0x107084(0x42a)](_0x42f982,0x1);_0x1cbc7e!==0x0&&(_0xd6fdf8=Math[_0x107084(0x1b1)](_0x3cc944*_0x42f982),_0x192cc8=Math[_0x107084(0x1b1)](_0x3386b2*_0x42f982));switch(_0x1cbc7e){case 0x1:case 0x4:case 0x7:_0x290612=_0x26a5b6;break;case 0x2:case 0x5:case 0x8:_0x290612+=Math[_0x107084(0x1b1)]((_0x260a3f-_0xd6fdf8)/0x2);break;case 0x3:case 0x6:case 0x9:_0x290612+=_0x260a3f-_0xd6fdf8;break;}switch(_0x1cbc7e){case 0x7:case 0x8:case 0x9:_0x1d3746=_0x3fca2c;break;case 0x4:case 0x5:case 0x6:_0x1d3746+=Math['round']((_0xfaf7d4-_0x192cc8)/0x2);break;case 0x1:case 0x2:case 0x3:_0x1d3746+=_0xfaf7d4-_0x192cc8;break;}_0x1b5695[_0x107084(0x33a)](_0x228b5c,0x0,0x0,_0x3cc944,_0x3386b2,_0x290612,_0x1d3746,_0xd6fdf8,_0x192cc8),_0xa3b92e&&this['drawItemContents'](_0x1c9976);},Window_ChoiceList[_0x4b39fb(0x46a)][_0x4b39fb(0x4bd)]=function(){const _0x923db8=_0x4b39fb;this['_helpWindow']['clear']();if(!this[_0x923db8(0x407)])return;const _0x59e009=this[_0x923db8(0x320)]();this[_0x923db8(0x407)][_0x59e009]?(this[_0x923db8(0x501)][_0x923db8(0x4d4)](this['_choiceHelpDescriptions'][_0x59e009]),this[_0x923db8(0x501)][_0x923db8(0x4eb)]()):(this['_helpWindow'][_0x923db8(0x23f)](),this[_0x923db8(0x501)][_0x923db8(0x44c)]());},Window_EventItem[_0x4b39fb(0x46a)]['makeItemList']=function(){const _0x8c5efd=_0x4b39fb,_0x39d23c=$gameMessage[_0x8c5efd(0x52f)]();_0x39d23c===_0x8c5efd(0x363)&&Imported[_0x8c5efd(0x56f)]?this[_0x8c5efd(0x2ba)]():Window_ItemList[_0x8c5efd(0x46a)]['makeItemList'][_0x8c5efd(0x408)](this);},Window_EventItem['prototype']['makeSkillList']=function(){const _0x374c07=_0x4b39fb,_0x373703=$gameMessage[_0x374c07(0x48d)]();this[_0x374c07(0x1a6)]=_0x373703?_0x373703[_0x374c07(0x2ea)]()[_0x374c07(0x404)](_0x53d43f=>this[_0x374c07(0x287)](_0x53d43f)):[],this[_0x374c07(0x287)](null)&&this[_0x374c07(0x1a6)]['push'](null);},VisuMZ[_0x4b39fb(0x18d)][_0x4b39fb(0x530)]=Window_EventItem[_0x4b39fb(0x46a)][_0x4b39fb(0x287)],Window_EventItem[_0x4b39fb(0x46a)][_0x4b39fb(0x287)]=function(_0x369149){const _0x1ae9ad=_0x4b39fb,_0x2bf841=$gameMessage['itemChoiceItypeId']();if(_0x2bf841===_0x1ae9ad(0x230)){if(!DataManager[_0x1ae9ad(0x4c5)](_0x369149))return![];const _0xf052d9=$gameMessage[_0x1ae9ad(0x285)]();if(_0xf052d9>0x0){if(_0x369149[_0x1ae9ad(0x55b)]!==_0xf052d9)return![];}return!![];}else{if(_0x2bf841===_0x1ae9ad(0x3a6)){if(!DataManager[_0x1ae9ad(0x2bd)](_0x369149))return![];const _0x5bdc71=$gameMessage['itemChoiceAtypeId']();if(_0x5bdc71>0x0){if(_0x369149[_0x1ae9ad(0x50f)]!==_0x5bdc71)return![];}const _0x2386de=$gameMessage[_0x1ae9ad(0x1db)]();if(_0x2386de>0x0){if(_0x369149[_0x1ae9ad(0x185)]!==_0x2386de)return![];}return!![];}else{if(_0x2bf841==='skill'){if(!DataManager[_0x1ae9ad(0x410)](_0x369149))return![];const _0x42e93c=$gameMessage[_0x1ae9ad(0x48d)]();if(_0x42e93c[_0x1ae9ad(0x421)](_0x369149))return![];if(!_0x42e93c[_0x1ae9ad(0x24c)](_0x369149))return![];const _0x2c5d9f=$gameMessage[_0x1ae9ad(0x27e)]();if(_0x2c5d9f>0x0){const _0x2ee841=DataManager[_0x1ae9ad(0x18f)](_0x369149);if(!_0x2ee841[_0x1ae9ad(0x287)](_0x2c5d9f))return![];}return!![];}else return VisuMZ[_0x1ae9ad(0x18d)][_0x1ae9ad(0x530)][_0x1ae9ad(0x408)](this,_0x369149);}}},VisuMZ['MessageCore'][_0x4b39fb(0x4fd)]=Window_ItemList[_0x4b39fb(0x46a)][_0x4b39fb(0x34f)],Window_ItemList[_0x4b39fb(0x46a)]['drawItemNumber']=function(_0x2de45d,_0xd24416,_0x221bab,_0x45e12d){const _0xfc4eef=_0x4b39fb,_0x19e5e2=$gameMessage['itemChoiceItypeId']();if(_0x19e5e2===_0xfc4eef(0x363)){const _0x45d858=$gameMessage['itemChoiceActor']();this[_0xfc4eef(0x471)](_0x45d858,_0x2de45d,_0xd24416,_0x221bab,_0x45e12d);}else VisuMZ[_0xfc4eef(0x18d)][_0xfc4eef(0x4fd)][_0xfc4eef(0x408)](this,_0x2de45d,_0xd24416,_0x221bab,_0x45e12d);},Window_MapName[_0x4b39fb(0x46a)]['refreshWithTextCodeSupport']=function(){const _0x4f8cfc=_0x4b39fb;this[_0x4f8cfc(0x4a7)][_0x4f8cfc(0x23f)]();let _0x971d2d=$gameMap['displayName']();if(_0x971d2d){const _0x5e477b=this['innerWidth'];this['drawBackground'](0x0,0x0,_0x5e477b,this[_0x4f8cfc(0x1c9)]()),_0x971d2d=this[_0x4f8cfc(0x344)](_0x971d2d);const _0x397d8a=this[_0x4f8cfc(0x4dd)](_0x971d2d)[_0x4f8cfc(0x25e)];this['drawTextEx'](_0x971d2d,Math[_0x4f8cfc(0x276)]((_0x5e477b-_0x397d8a)/0x2),0x0);}},Window_MapName[_0x4b39fb(0x46a)][_0x4b39fb(0x344)]=function(_0x3f52e0){const _0x9bc1a=_0x4b39fb;if(_0x3f52e0[_0x9bc1a(0x204)](/<LEFT>/gi))this['x']=0x0;else{if(_0x3f52e0[_0x9bc1a(0x204)](/<CENTER>/gi))this['x']=Math['floor']((Graphics['boxWidth']-this[_0x9bc1a(0x25e)])/0x2);else _0x3f52e0[_0x9bc1a(0x204)](/<RIGHT>/gi)&&(this['x']=Graphics['boxWidth']-this[_0x9bc1a(0x25e)]);}_0x3f52e0=_0x3f52e0[_0x9bc1a(0x2fd)](/<(?:LEFT|CENTER|RIGHT)>/gi,''),_0x3f52e0=_0x3f52e0['replace'](/<\/(?:LEFT|CENTER|RIGHT)>/gi,'');if(_0x3f52e0[_0x9bc1a(0x204)](/<TOP>/gi))this['y']=0x0;else{if(_0x3f52e0[_0x9bc1a(0x204)](/<MIDDLE>/gi))this['y']=Math[_0x9bc1a(0x276)]((Graphics['boxHeight']-this['height'])/0x2);else _0x3f52e0[_0x9bc1a(0x204)](/<BOTTOM>/gi)&&(this['y']=Graphics['boxHeight']-this['height']);}return _0x3f52e0=_0x3f52e0[_0x9bc1a(0x2fd)](/<(?:TOP|MIDDLE|BOTTOM)>/gi,''),_0x3f52e0=_0x3f52e0[_0x9bc1a(0x2fd)](/<\/(?:TOP|MIDDLE|BOTTOM)>/gi,''),_0x3f52e0[_0x9bc1a(0x204)](/<X:[ ]([\+\-]\d+)>/gi)&&(this['x']+=Number(RegExp['$1']),_0x3f52e0=_0x3f52e0[_0x9bc1a(0x2fd)](/<X:[ ]([\+\-]\d+)>/gi,'')),_0x3f52e0[_0x9bc1a(0x204)](/<Y:[ ]([\+\-]\d+)>/gi)&&(this['y']+=Number(RegExp['$1']),_0x3f52e0=_0x3f52e0['replace'](/<Y:[ ]([\+\-]\d+)>/gi,'')),_0x3f52e0;};