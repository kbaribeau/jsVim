Given 'I am on the test page' do
  @browser.open('file:///Users/kbaribeau/code/jsVim/test.html')
	@textarea_locator = "document.forms[0].elements[1]"
end

When /I type in "(.*)"/ do |text|
	@browser.type_keys(@textarea_locator, text)
end

And /press Escape/ do 
	@browser.key_press(@textarea_locator, 27)
end

And /type "(.*)"/ do |text|
	text.chars.each do |letter|
		@browser.key_press(@textarea_locator, letter)
	end
end

Then /the text box should be empty/ do
	@browser.get_value(@textarea_locator).should == "" 
end
