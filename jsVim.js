var INSERT_MODE = 0;
var COMMAND_MODE = 1;

var Mode = function() {
	this.mode = INSERT_MODE;

	this.isInsert = function() { return this.mode == INSERT_MODE; };
	this.isCommand = function() { return this.mode == COMMAND_MODE; };
	this.setMode = function(mode) { this.mode = mode; };
};

var NormalModeHandler = function(editor) {
	this.editor = editor
	this.handle = function(e) {
			e.preventDefault(); // not under test
			if (e.keyCode == 73) { // 73 == 'i'
					return INSERT_MODE;
			}
			else {
				editor.value = '';
			}
			return COMMAND_MODE;
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
					this.mode.setMode(COMMAND_MODE);
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
