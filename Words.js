var Letter = require(`./Letter.js`);

function Word(newWord) {
    this.rawWord = newWord;
    
    //To make sure word is in all caps for function usage
    this.makeWordAllCaps = function() {
        var tempWord = ``;
        for (var i = 0; i < this.rawWord.length; i++) {
            var tempLetter = this.rawWord.charAt(i).toUpperCase();
            tempWord += tempLetter;
        }
        return tempWord;
    } 

    //Store the all upper case word for function usage
    this.word = this.makeWordAllCaps();

    //Generate an array to store all the letter objects
    //Create as an array of arrays for ease of reference
    this.makeLetterArray = function() {
        var tempArray = [];
        var letter = ``;
        //Loop from characters A to Z in UTF-16
        for (var i = 65; i < 91; i++) {
            letter = String.fromCharCode(i);
            tempArray.push(new Letter(letter));
        }
        return tempArray;
    }

    //Store the array of Letter objects
    this.letterArray = this.makeLetterArray();

    //Store the word to display
    this.displayWord = ``;
    
    //Create initial string for display word
    this.makeDisplayWord = function() {
        var tempWord = ``;
        for (var i = 0; i < this.word.length; i++) {
            //Check if this is a letter or space
            if(this.word.charCodeAt(i) === ` `.charCodeAt()) {
                tempWord += ` `;
            }
            else {
                //Find index of  letter array
                var index = this.word.charCodeAt(i) - 65;
                tempWord += this.letterArray[index].charUpdate();
            }
        }
        this.displayWord = tempWord;
    }

    //Update if guessed for this letter
    this.updateIfGuessed = function(guess) {
        var tempLetter = guess.toUpperCase();
        var index = tempLetter.charCodeAt(0) - 65;
        var wasThisGuessed = this.letterArray[index].wasGuessed;
        this.letterArray[index].checkGuess(guess);
        return wasThisGuessed;
    }

}

module.exports = Word;