# Constructor-Hangman   
    A hangman game that uses the command line for user interaction

## Functionality
* NPM is used to generate easier and safer user interface
* Code split into three files for better organization
    1. #### Letter.js: 
        Displays either an underline or a letter

    2. #### Words.js: 
        Creates object for the current word in the game being guessed against

    3. #### index.js: 
        Runs the game by selecting a random word and storing via word.js code

## Notes
*  By using fromCharCode(), it is easy to programmatically make an array of arrays that can be used to check previous user entries
Generated array takes the form [[`A`, letterObject], [`B`, letterObject], ... [`Z`, letterObject]]

    * After further development, the array of arrays was not a necessary addition. In fact it made the code more compicated. Instead During the loop, a variable was passed into the constructor giving the created object a property that could be referenced the same way.
    