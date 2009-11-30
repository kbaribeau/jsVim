YUI({ 
	useBrowserConsole: true,
	logInclude: { TestRunner: true } }).  use("test", "console", function(Y){ 
     
	var testCase = new Y.Test.Case({ 

		name: "Normal Mode Handler", 

		setUp: function() {
			this.handler = new NormalModeHandler(''); //baggage
		},

		testHandle_shouldCallPreventDefault : function () { 
			var mockEvent = Y.Mock(); 
			Y.Mock.expect(mockEvent, {method: "preventDefault", args: []}); 
			
			this.handler.handle(mockEvent);

			Y.Mock.verify(mockEvent); 
		}, 

		testCheckMode_shouldMaintainNormalModeOnMotionKeys : function() {
			Y.Assert.areEqual(NORMAL_MODE, this.handler.checkMode('h'), 'h');
			Y.Assert.areEqual(NORMAL_MODE, this.handler.checkMode('j'), 'j');
			Y.Assert.areEqual(NORMAL_MODE, this.handler.checkMode('k'), 'k');
			Y.Assert.areEqual(NORMAL_MODE, this.handler.checkMode('l'), 'l');
		},

		testCheckMode_shouldFlipToInsertModeOnIOA : function() {
			//oddly, when we're bound to keydown instead of keypress, only caps work here
			Y.Assert.areEqual(INSERT_MODE, this.handler.checkMode('i'), 'i');
			Y.Assert.areEqual(INSERT_MODE, this.handler.checkMode('o'), 'o');
			Y.Assert.areEqual(INSERT_MODE, this.handler.checkMode('a'), 'a');
		},

		testDoAction_shouldDeleteOnD: function() {
			var MockElement = Class.create({
				initialize: function(v) {
					this.value = v;
				}
			});

			var handler = new NormalModeHandler(new MockElement('asdf'));

			handler.doAction('D');

			Y.Assert.areEqual('', handler.editor.value);
		},


	}); 
	var yconsole = new Y.Console({ 
		newestOnTop: false                    
	}); 
	yconsole.render('#log'); 

	Y.Test.Runner.add(testCase);
	Y.Test.Runner.run(); 

}); 
