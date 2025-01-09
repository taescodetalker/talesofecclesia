/*:
 * @target MZ
 * @plugindesc Automatically starts the game in fullscreen mode and quit option.
 * @author Vincent Thieu
 * @help
 * This plugin forces the game to start in fullscreen mode.
 *
 * This plugin adds a "Quit Game" option to the main menu, allowing
 * players to exit the game.
 *
 * There are no plugin commands or parameters for this plugin.
 */

(() => {
	const _Scene_Boot_start = Scene_Boot.prototype.start;
	Scene_Boot.prototype.start = function () {
		_Scene_Boot_start.call(this);
		Graphics._requestFullScreen();
	};

	// Add Quit command to the main menu
	const _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
	Window_MenuCommand.prototype.addOriginalCommands = function () {
		_Window_MenuCommand_addOriginalCommands.call(this);
		this.addCommand("Quit Game", "quit", true);
	};

	// Handle the Quit command
	const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
	Scene_Menu.prototype.createCommandWindow = function () {
		_Scene_Menu_createCommandWindow.call(this);
		this._commandWindow.setHandler("quit", this.commandQuit.bind(this));
	};

	// Define the Quit behavior
	Scene_Menu.prototype.commandQuit = function () {
		SceneManager.push(Scene_QuitConfirm);
	};

	// Add Quit command to the title menu
	const _Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
	Window_TitleCommand.prototype.makeCommandList = function () {
		_Window_TitleCommand_makeCommandList.call(this);
		this.addCommand("Quit Game", "quit", true);
	};

	// Handle the Quit command in the title menu
	const _Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
	Scene_Title.prototype.createCommandWindow = function () {
		_Scene_Title_createCommandWindow.call(this);
		this._commandWindow.setHandler("quit", this.commandQuit.bind(this));
	};

	Scene_Title.prototype.commandQuit = function () {
		SceneManager.push(Scene_QuitConfirm);
	};

	// Create a new Scene for the Quit Confirmation
	function Scene_QuitConfirm() {
		this.initialize(...arguments);
	}

	Scene_QuitConfirm.prototype = Object.create(Scene_Base.prototype);
	Scene_QuitConfirm.prototype.constructor = Scene_QuitConfirm;

	Scene_QuitConfirm.prototype.initialize = function () {
		Scene_Base.prototype.initialize.call(this);
	};

	Scene_QuitConfirm.prototype.create = function () {
		Scene_Base.prototype.create.call(this);
		this.createBackground();
		this.createConfirmationWindow();
	};

	Scene_QuitConfirm.prototype.createBackground = function () {
		this._backgroundSprite = new Sprite();
		this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
		this.addChild(this._backgroundSprite);
	};

	Scene_QuitConfirm.prototype.createConfirmationWindow = function () {
		const rect = this.confirmWindowRect();
		this._confirmWindow = new Window_CommandConfirm(rect, this.onConfirm.bind(this), this.onCancel.bind(this));
		this.addChild(this._confirmWindow); // Fixed addChild call
	};

	Scene_QuitConfirm.prototype.confirmWindowRect = function () {
		const width = 400;
		const height = this.calcWindowHeight(3, true); // 2 commands + 1 title line
		const x = (Graphics.boxWidth - width) / 2;
		const y = (Graphics.boxHeight - height) / 2;
		return new Rectangle(x, y, width, height);
	};

	Scene_QuitConfirm.prototype.onConfirm = function () {
		SceneManager.exit();
	};

	Scene_QuitConfirm.prototype.onCancel = function () {
		SceneManager.pop();
	};

	// Create a Confirmation Window Class
	class Window_CommandConfirm extends Window_Command {
		constructor(rect, onConfirm, onCancel) {
			super(rect);
			this._onConfirm = onConfirm;
			this._onCancel = onCancel;
			this.select(0); // Default selection to "Yes"
		}

		makeCommandList() {
			this.addCommand("Yes", "confirm");
			this.addCommand("No", "cancel");
		}

		drawAllItems() {
			// Draw the title at the top
			const title = "Are you sure you want to quit?";
			this.drawText(title, 0, 0, this.contents.width, "center");

			// Draw the command items below the title
			const commandStartY = this.lineHeight(); // Start after the title
			for (let i = 0; i < this.maxItems(); i++) {
				const rect = this.itemRect(i);
				rect.y += commandStartY; // Offset each item by the title height
				this.drawItem(i);
			}
		}

		processOk() {
			if (this.currentSymbol() === "confirm") {
				this._onConfirm();
			} else if (this.currentSymbol() === "cancel") {
				this._onCancel();
			}
		}

		itemRect(index) {
			const rect = super.itemRect(index);
			rect.y += this.lineHeight(); // Push items down by one line to account for the title
			return rect;
		}
	}
})();
