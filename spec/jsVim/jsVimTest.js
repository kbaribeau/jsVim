YUI({ 
	useBrowserConsole: true,
	logInclude: { TestRunner: true } }).  use("test", "console", function(Y){ 
     
	var testCase = new Y.Test.Case({ 

		name: "TestCase Name", 
			
		testSomething : function () { 
			Y.assert(5 == 4);
		}, 

		testSuccess : function () { 
			Y.assert(5 == 5);
		}, 

	}); 
	var yconsole = new Y.Console({ 
		newestOnTop: false                    
	}); 
	yconsole.render('#log'); 

	Y.Test.Runner.add(testCase);
	Y.Test.Runner.run(); 

}); 
