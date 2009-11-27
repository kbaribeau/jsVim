var INSERT_MODE = 0;
var NORMAL_MODE = 1;

var Mode = function() {
	this.mode = INSERT_MODE;

	this.isInsert = function() { return this.mode == INSERT_MODE; };
	this.isCommand = function() { return this.mode == NORMAL_MODE; };
	this.setMode = function(mode) { this.mode = mode; };
};

var NormalModeHandler = Class.create({
	initialize: function(e) {
		this.editor = e;
	},

	handle : function(evnt) {
			evnt.preventDefault(); // not under test
			this.doAction(evnt.keyCode);
			return this.checkMode(String.fromCharCode(evnt.keyCode));
	},

	checkMode : function(keyCode) {
			if (
				keyCode == 'I' || 
				keyCode == 'O' || 
				keyCode == 'A' 
				) {
					return INSERT_MODE;
			}
			else {
				return NORMAL_MODE;
			}
	},

	doAction : function(keyCode) {
			this.editor.value = '';
	}
});

var Dispatcher = Class.create({
	initialize: function(m, c) {
		this.mode = m;
		this.normalModeHandler = c;
	},
	dispatch : function(e) {
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
	}
});

var textarea = document.getElementsByTagName("textarea")[0];
var dispatcher = new Dispatcher(new Mode, new NormalModeHandler(textarea));

var textareaKeydown = function(e) {
	dispatcher.dispatch(e);
};
textarea.addEventListener("keydown", textareaKeydown, true);
