var INSERT_MODE = 0;
var COMMAND_MODE = 1;
var mode = INSERT_MODE;
var textareaKeydown = function(e) {
	if (mode == COMMAND_MODE) {
		e.preventDefault(); // not under test
		if (e.keyCode == 73) { // 73 == 'i'
				mode = INSERT_MODE;
		}
		else {
			textarea.value = '';
		}
	}
	else if (mode == INSERT_MODE) {
		// ESC, 27
		// 91, [
		if (e.ctrlKey && e.keyCode == 91 || e.keyCode == 27) {
				mode = COMMAND_MODE;
		}
	}
};

var textarea = document.getElementsByTagName("textarea")[0];
textarea.addEventListener("keydown", textareaKeydown, true);
