// var letter = `a`;
// var guess = `f`;

function Letter(letter) {
    this.letter = letter;
    //To save whether this letter was guessed yet or not
    this.wasGuessed = false;

    //Update a letter in a word depending on if the letter was guessed or not
    this.charUpdate = function() {
        var charToDisplay;
        var placeholder = `_`;
        if (this.wasGuessed == true) {
            charToDisplay = this.letter;
        }
        else {
            charToDisplay = placeholder;
        }
        return charToDisplay;
    }

    //Check if a user entry has or has not been guessed already
    this.checkGuess = function(guess) {
        if (guess.toUpperCase() === this.letter) {
            this.wasGuessed = true;
        }
    }
}

module.exports = Letter;