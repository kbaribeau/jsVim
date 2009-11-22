var Mode = function() {
	this.INSERT_MODE = 0;
	this.COMMAND_MODE = 1;
	this.mode = this.INSERT_MODE;

	this.isInsert = function() { return this.mode == this.INSERT_MODE; };
	this.isCommand = function() { return this.mode == this.COMMAND_MODE; };
	this.setMode = function(mode) { this.mode = mode; };
};

var CommandModeHandler = function() {
	this.handle = function(e) {
			e.preventDefault(); // not under test
			if (e.keyCode == 73) { // 73 == 'i'
					return this.mode.INSERT_MODE;
			}
			else {
				textarea.value = '';
			}
	}
}

var Dispatcher = function(m, c) {
	this.mode = m;
	this.commandModeHandler = c;
	this.dispatch = function(e) {
		if (this.mode.isCommand()) {
			this.mode.setMode(
				this.commandModeHandler.handle(e));
		}
		else if (this.mode.isInsert()) {
			// ESC, 27
			// 91, [
			if (e.ctrlKey && e.keyCode == 91 || e.keyCode == 27) {
					this.mode.setMode(this.mode.COMMAND_MODE);
			}
		}
	};
};

var dispatcher = new Dispatcher(new Mode, new CommandModeHandler);
var textareaKeydown = function(e) {
	dispatcher.dispatch(e);
};

var textarea = document.getElementsByTagName("textarea")[0];
textarea.addEventListener("keydown", textareaKeydown, true);
