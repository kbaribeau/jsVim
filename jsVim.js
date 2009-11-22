var Mode = function() {
	this.INSERT_MODE = 0;
	this.COMMAND_MODE = 1;
	this.mode = this.INSERT_MODE;

	this.isInsert = function() { return this.mode == this.INSERT_MODE; };
	this.isCommand = function() { return this.mode == this.COMMAND_MODE; };
	this.setMode = function(mode) { this.mode = mode; };
}
var m = new Mode;

var textareaKeydown = function(e) {

	if (m.isCommand()) {
		e.preventDefault(); // not under test
		if (e.keyCode == 73) { // 73 == 'i'
				m.setMode(m.INSERT_MODE);
		}
		else {
			textarea.value = '';
		}
	}
	else if (m.isInsert()) {
		// ESC, 27
		// 91, [
		if (e.ctrlKey && e.keyCode == 91 || e.keyCode == 27) {
				m.setMode(m.COMMAND_MODE);
		}
	}
};

var textarea = document.getElementsByTagName("textarea")[0];
textarea.addEventListener("keydown", textareaKeydown, true);
