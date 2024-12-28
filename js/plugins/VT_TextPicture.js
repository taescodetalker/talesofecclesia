//=============================================================================
// Vincent Thieu - Text Picture
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Displays text as a picture.
 * @author Vincent Thieu
 *
 * @help VT_TextPicture.js
 *
 * This plugin provides a command to show text as a picture.
 *
 * Use it in the following procedure.
 *   1. Call the plugin command "Set Text Picture".
 *   2. Execute "Show Picture" without specifying an image.
 *
 * @command set
 * @text Set Text Picture
 * @desc Sets text to display as a picture.
 *       After this, execute "Show Picture" without specifying an image.
 *
 * @arg text
 * @type multiline_string
 * @text Text
 * @desc Text to display as a picture.
 *       Control characters are allowed.
 *
 * @arg bg_color
 * @type Text
 * @default black
 * @text Background color
 * @desc Background color
 *
 * @arg bg_opacity
 * @type Number
 * @default 192
 * @min 0
 * @max 255
 * @text Background opacity
 * @desc Background opacity
 *
 * @help
 * This plugin let you display large amount of text as picture in RPG Maker MZ.
 *
 * Terms of Use: Commercial.
 *
 * Version: 1.0.0
 */

(() => {
	const pluginName = "VT_TextPicture";
	let textPictureText = "";
	let backgroundOpacity = 0;
	let backgroundColor = "";
	let cornerRadius = 15;
	let padding = 15;

	PluginManager.registerCommand(pluginName, "set", (args) => {
		textPictureText = String(args.text);
		backgroundColor = String(args.bg_color);
		backgroundOpacity = Number(args.bg_opacity);
	});

	const _Game_Picture_show = Game_Picture.prototype.show;
	Game_Picture.prototype.show = function () {
		_Game_Picture_show.apply(this, arguments);
		if (this._name === "" && textPictureText) {
			this.mzkp_text = textPictureText;
			this.mzkp_textChanged = true;
			textPictureText = "";
		}
	};

	const _Sprite_Picture_destroy = Sprite_Picture.prototype.destroy;
	Sprite_Picture.prototype.destroy = function () {
		destroyTextPictureBitmap(this.bitmap);
		_Sprite_Picture_destroy.apply(this, arguments);
	};

	const _Sprite_Picture_updateBitmap = Sprite_Picture.prototype.updateBitmap;
	Sprite_Picture.prototype.updateBitmap = function () {
		_Sprite_Picture_updateBitmap.apply(this, arguments);
		if (this.visible && this._pictureName === "") {
			const picture = this.picture();
			const text = picture ? picture.mzkp_text || "" : "";
			const textChanged = picture && picture.mzkp_textChanged;
			if (this.mzkp_text !== text || textChanged) {
				this.mzkp_text = text;
				destroyTextPictureBitmap(this.bitmap);
				this.bitmap = createTextPictureBitmap(text);
				picture.mzkp_textChanged = false;
			}
		} else {
			this.mzkp_text = "";
		}
	};

	function createTextPictureBitmap(text) {
		const tempWindow = new Window_Base(new Rectangle());
		const textSize = tempWindow.textSizeEx(text);

		// Adjust dimensions to include padding
		const width = textSize.width + padding * 2;
		const height = textSize.height + padding * 2;

		tempWindow.padding = 0;
		tempWindow.move(0, 0, width, height + padding * 2);
		tempWindow.createContents();

		const bitmap = tempWindow.contents;

		// Save current paint opacity
		const originalOpacity = bitmap.paintOpacity;

		// Set paint opacity for background
		bitmap.paintOpacity = backgroundOpacity;

		// Draw rounded background
		drawRoundedBackground(bitmap, 0, 0, width, height, cornerRadius, backgroundColor);

		// Restore original paint opacity
		bitmap.paintOpacity = originalOpacity;

		// Draw the text with padding offset
		tempWindow.drawTextEx(text, padding, padding, width - padding * 2);

		tempWindow.contents = null;
		tempWindow.destroy();
		bitmap.mzkp_isTextPicture = true;
		return bitmap;
	}

	function destroyTextPictureBitmap(bitmap) {
		if (bitmap && bitmap.mzkp_isTextPicture) {
			bitmap.destroy();
		}
	}

	// Helper function to draw a rounded rectangle
	function drawRoundedBackground(bitmap, x, y, width, height, radius, color) {
		const context = bitmap.context;

		context.save();
		context.fillStyle = color;
		context.beginPath();
		context.moveTo(x + radius, y);
		context.lineTo(x + width - radius, y);
		context.quadraticCurveTo(x + width, y, x + width, y + radius);
		context.lineTo(x + width, y + height - radius);
		context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
		context.lineTo(x + radius, y + height);
		context.quadraticCurveTo(x, y + height, x, y + height - radius);
		context.lineTo(x, y + radius);
		context.quadraticCurveTo(x, y, x + radius, y);
		context.closePath();
		context.fill();
		context.restore();
	}
})();
