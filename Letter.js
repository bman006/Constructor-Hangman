var letter = `a`;
var guess = `f`;

function Letter() {
    //Generate an array for checking what was and wasn't already guessed by the user
    this.makeGuessedLog = function() {
        var tempArray = [];
        //Loop from characters A to Z in UTF-16
        for (var i = 65; i < 91; i++) {
            tempArray.push([
                String.fromCharCode(i),
                false
            ]);
        }
        return tempArray;
    }

    //Save the initial log of guessed statuses
    this.guessedLog = this.makeGuessedLog();

    //Function to check if a user guess matches a specific letter in the word
    this.checkGuess = function(letter, guess) {
        var charToDisplay;
        var placeholder = `_`;
        if (letter.toLowerCase() === guess.toLowerCase()) {
            charToDisplay = letter;
        }
        else {
            charToDisplay = placeholder;
        }
        return charToDisplay;
    }

    //Check if a user entry has or has not been guessed already
    this.guessedYet = function(guess) {
        for (var i = 0; i < this.guessedLog.length; i++) {
            if (guess.toLowerCase() === guessedLog[i][0].toLowerCase()) {
                var duplicate = false;
                if (guessedLog[i][1] === true) {
                    duplicate = true;
                }
                guessedLog[i][1] = true;
                return duplicate;
            }
        }
    }
}


module.exports = Letter;

var thing = new Letter();
console.log(thing.checkGuess(letter, guess));