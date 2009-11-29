Feature: Search
  In order to edit faster
  As a vim user
  I want to move my cursor using vim while browsing the web

  Scenario: Delete a line
    Given I am on the test page
    When I type in "asdf"
		And I press Escape
		And type "dd"
    Then the text box should be empty


	Scenario: Motion
		Given I am on the test page
		When I type in "asdf"
		And I press Escape
		And type "l"
		Then the cursor should have moved to the right one space
