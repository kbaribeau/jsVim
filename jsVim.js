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
			//evnt.stopPropagation(); //breaks mock
			evnt.preventDefault(); 
			this.doAction(String.fromCharCode(evnt.keyCode));
			return this.checkMode(String.fromCharCode(evnt.keyCode));
	},

	checkMode : function(key) {
			if (
				key == 'i' || 
				key == 'o' || 
				key == 'a' 
				) {
					return INSERT_MODE;
			}
			else {
				return NORMAL_MODE;
			}
	},

	doAction : function(key) {
			if (key == 'D') {
				this.editor.value = '';
			}
			else if (key == 'l') {
				this.editor.selectionStart += 1;
			}
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

//FIXME/TODO: keydown doesn't work for some reason, but keypress is deprecated in DOM level 3
//see: http://www.w3.org/TR/DOM-Level-3-Events/#event-type-keypress
textarea.addEventListener("keypress", textareaKeydown, true);
