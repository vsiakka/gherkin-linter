@requiredfeaturetag
Feature: Feature with all of the required tags present

  Background:
    Given I have a Background

  Scenario: This is a Scenario with all of the required tags present
    Then I should not see an error

  Scenario Outline: This is a Scenario Outline with all of the required tags present
    Then I should not see an error

  Examples:
    | foo |
    | bar |
