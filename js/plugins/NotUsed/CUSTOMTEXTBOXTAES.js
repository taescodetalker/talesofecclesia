(function() {
    const CUSTOM_TEXTBOX_VAR = 1; // Change this to the variable ID where you store the filename.
    
    const _Window_Message_initialize = Window_Message.prototype.initialize;
    Window_Message.prototype.initialize = function() {
        _Window_Message_initialize.call(this);
        this._customBackgroundSprite = new Sprite();
        this.addChildToBack(this._customBackgroundSprite);
    };

    Window_Message.prototype.updateBackground = function() {
        const bgName = $gameVariables.value(CUSTOM_TEXTBOX_VAR); // Get filename from variable
        if (bgName) {
            const bitmap = ImageManager.loadPicture(bgName);
            this._customBackgroundSprite.bitmap = bitmap;
            this._customBackgroundSprite.visible = true;
            this._customBackgroundSprite.x = this.x;
            this._customBackgroundSprite.y = this.y;
            this._customBackgroundSprite.opacity = this.opacity;
        } else {
            this._customBackgroundSprite.visible = false;
        }
    };

    const _Window_Message_update = Window_Message.prototype.update;
    Window_Message.prototype.update = function() {
        _Window_Message_update.call(this);
        this.updateBackground();
    };
})();
