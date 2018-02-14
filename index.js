var Word = require(`./Words.js`);
var inquirer = require('inquirer');
var randomWords = require('random-words');

var hangman;
var guessesLeft;

function startGame() {
    // hangman = new Word(randomWords());
    hangman = new Word(`word`);
    hangman.makeDisplayWord();
    guessesLeft = 12;
    gamePrompt();
}


function gamePrompt() {
    console.log(`   ${hangman.displayWord}\n`);
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
            console.log(`You already tried ${answers.guess}`);
            subtractAGuess();
            gamePrompt();
        }
        else {
            var tempWord = hangman.displayWord;
            hangman.makeDisplayWord();

            //If the display word didn't change, the guess no good
            if (tempWord === hangman.displayWord) {
                subtractAGuess();
            }
            //and if not SUCCESS!!!
            else {
                console.log(`\nCORRECT!!!`);
            }

            //Check for the win condition
            if(hangman.word === hangman.displayWord) {
                console.log(`\nYOU WON!!! The word was: ${hangman.rawWord}`);
                playAgain()
            }
            
            //If you got here, then there is more game to go
            gamePrompt();
        }
    });
}

function subtractAGuess() {
    guessesLeft--;
    if (guessesLeft === 0) {
        console.log(`You...lost                 (sigh)`);
        playAgain()
    }
    else {
        console.log(`\nINCORRECT!!!\nYOU ONLY HAVE ${guessesLeft} GUESSES LEFT!!!`);
    }
}

function playAgain() {
    inquirer.prompt([
        {
            type: `confirm`,
            name: `playAgain`,
            message: `Would you like to play again?`
        }
    ]).then(answers => {
        if (answers.playAgain) {
            console.log(`\n`);
            startGame();
        }
    });
}

startGame();