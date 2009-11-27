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

		testHandle_shouldCallCheckMode: function() {

		},

		testCheckMode_shouldMaintainNormalModeOnMotionKeys : function() {
			Y.Assert.areEqual(NORMAL_MODE, this.handler.checkMode('h'), 'h');
			Y.Assert.areEqual(NORMAL_MODE, this.handler.checkMode('j'), 'j');
			Y.Assert.areEqual(NORMAL_MODE, this.handler.checkMode('k'), 'k');
			Y.Assert.areEqual(NORMAL_MODE, this.handler.checkMode('l'), 'l');
		},

		testCheckMode_shouldFlipToInsertModeOnIOA : function() {
			//FIXME: having to use caps here is odd
			Y.Assert.areEqual(INSERT_MODE, this.handler.checkMode('I'), 'i');
			Y.Assert.areEqual(INSERT_MODE, this.handler.checkMode('O'), 'o');
			Y.Assert.areEqual(INSERT_MODE, this.handler.checkMode('A'), 'a');
		}


	}); 
	var yconsole = new Y.Console({ 
		newestOnTop: false                    
	}); 
	yconsole.render('#log'); 

	Y.Test.Runner.add(testCase);
	Y.Test.Runner.run(); 

}); 
