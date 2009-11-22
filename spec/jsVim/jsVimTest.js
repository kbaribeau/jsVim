YUI({ 
	useBrowserConsole: true,
	logInclude: { TestRunner: true } }).use("test", function(Y){ 
     
	var testCase = new Y.Test.Case({ 

		name: "TestCase Name", 
			
		testSomething : function () { 
			Y.assert(5 == 4);
		}, 

	}); 
         
		Y.Test.Runner.add(testCase);
		Y.Test.Runner.run(); 
}); 
