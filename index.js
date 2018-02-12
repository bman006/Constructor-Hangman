var Word = require(`./Words.js`);
var inquirer = require('inquirer');

var hangman = new Word(`Mudkips`);
console.log(hangman.displayWord);

function lineBreak() {
    console.log(`- - - - - - - - - - - - - - - - - - - - - - - -\n`);
}

function gamePrompt() {
    console.log(hangman.displayWord);
    inquirer.prompt([
        {
            type: `input`,
            name: `guess`,
            message: `Guess a letter!!!`,
            validate: function(value) {
                var charCheck = false;
                //Make sure a single character string that is a letter was entered
                if (typeof value === `string` && value.length === 1 && value.charCodeAt() >= 65 && value.charCodeAt() <= 122) {
                    charCheck = true;
                }
                return charCheck
            }
        }
    ]).then(answers => {
        var guess = answers.guess;
        var wasGuessed = hangman.updateIfGuessed(guess);
        if (wasGuessed === true) {
            console.log(`You already guessed ${answers.guess}`);
            lineBreak();
            gamePrompt();
        }
        else {
            console.log(`${answers.guess} was a fresh guess`);
            hangman.makeDisplayWord();
            lineBreak();
            if(hangman.word === hangman.displayWord) {
                console.log(`YOU WON!!! The word was ${hangman.displayWord}`);
                return
            }
            gamePrompt();
        }
    });
}

gamePrompt();