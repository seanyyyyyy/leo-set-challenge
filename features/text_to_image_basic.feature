Feature: Text-to-image
  Basic text-to-image flow

  Scenario: Basic text-to-image flow
    Given a logged in user
    And the Image Generation page
    And the "Leonardo Lightning" preset
    And Fast mode turned on
    And a prompt of "a successful end to end test"
    And image dimensions of "Small"
    And aspect ratio is 1:1
    And Number of images is 4
    When the generate button is clicked
    Then the generated image displays successfully