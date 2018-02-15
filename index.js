var Word = require(`./Words.js`);
var inquirer = require('inquirer');
var randomWords = require('random-words');

var hangman;
var guessesLeft;

function startGame() {
    hangman = new Word(randomWords());
    // console.log(hangman.rawWord);    //Un-comment the code to the left if you want to make it easier to test the code working from the command line
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
        resolveGuess(guess, wasGuessed);
    });
}

function resolveGuess(guess, wasGuessed) {
    if (wasGuessed === true) {
        console.log(`You already tried ${guess}`);
        subtractAGuess();
        gamePrompt();
    }
    else {
        var tempWord = hangman.displayWord;
        hangman.makeDisplayWord();

        //If the display word didn't change, the guess is no good
        if (tempWord === hangman.displayWord) {
            subtractAGuess();
        }
        //and if not SUCCESS!!!
        else {
            console.log(`\nCORRECT!!!`);
            //Check for the win condition
            if(hangman.word === hangman.displayWord) {
                console.log(`\nYOU WON!!! The word was: ${hangman.rawWord}`);
                playAgain()
                return
            }
            //If you got here, then there is more game to go
            gamePrompt();
        }

    }
}

function playAgain() {

    //For some reason this prompt isn't working

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

function subtractAGuess() {
    guessesLeft--;
    if (guessesLeft === 0) {
        console.log(`You...lost                 (sigh)`);
        playAgain()
    }
    else {
        console.log(`\nINCORRECT!!!\nYOU ONLY HAVE ${guessesLeft} GUESSES LEFT!!!`);
        gamePrompt();
    }
}

startGame();