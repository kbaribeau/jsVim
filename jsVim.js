var INSERT_MODE = 0;
var NORMAL_MODE = 1;

var Mode = function() {
	this.mode = INSERT_MODE;

	this.isInsert = function() { return this.mode == INSERT_MODE; };
	this.isCommand = function() { return this.mode == NORMAL_MODE; };
	this.setMode = function(mode) { this.mode = mode; };
};

var NormalModeHandler = function(editor) {
	this.editor = editor
	this.handle = function(e) {
			e.preventDefault(); // not under test
			this.doAction(e.keyCode);
			return this.checkMode(e.keyCode);
	}

	this.checkMode = function(keyCode) {
			if (keyCode == 73) { // 73 == 'i'
					return INSERT_MODE;
			}
			else {
				return NORMAL_MODE;
			}
	}

	this.doAction = function(keyCode) {
			editor.value = '';
	}
}

var Dispatcher = function(m, c) {
	this.mode = m;
	this.normalModeHandler = c;
	this.dispatch = function(e) {
		if (this.mode.isCommand()) {
			this.mode.setMode(
				this.normalModeHandler.handle(e));
		}
		else if (this.mode.isInsert()) {
			// ESC, 27
			// 91, [
			if (e.ctrlKey && e.keyCode == 91 || e.keyCode == 27) {
					this.mode.setMode(NORMAL_MODE);
			}
		}
	};
};

var textarea = document.getElementsByTagName("textarea")[0];
var dispatcher = new Dispatcher(new Mode, new NormalModeHandler(textarea));

var textareaKeydown = function(e) {
	dispatcher.dispatch(e);
};
textarea.addEventListener("keydown", textareaKeydown, true);
