require 'rubygems'
require "selenium"
require 'spec'

module JsVimSeleniumTest
	#fixme, rspec isn't really the right tool here, Cucumber probably makes more sense
	class JsVim
	end
	describe JsVim do
		before(:all) do
			@selenium = Selenium::SeleniumDriver.new("localhost", 4444, "*chrome", "file:///Users/kbaribeau/code/jsVim/test.html", 10000);
			@selenium.start
		end

		after(:all) do
			@selenium.stop 
		end
		
		it "should delete a line" do
			@selenium.open "file:///Users/kbaribeau/code/jsVim/test.html"
			textarea = "document.forms[0].elements[1]"
			@selenium.type textarea, "asdf"
			@selenium.type_keys textarea, "d"
			@selenium.get_value(textarea).should == "d" #works manually, not sure why selenium repots it differently 
		end
	end
end
