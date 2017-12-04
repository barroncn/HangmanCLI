var Letter = require("./letter.js");

//Word constructor function. Takes a word as an argument
function Word(word){
    //isFinished will initially be false. If the user correctly guesses the word, this will be set to true to stop guessing letters
    this.isFinished = false;
    //minusOne will initially be true. GuessesLeft will decrease unless the user makes a correct guess
    this.minusOne = true;
    //letterObjArr will contain the letter objects for each letter of the word to guess
    this.letterObjArr = [];
    //writeBlanks will contain the correct number of blanks and spaces to initially write the word on the screen at the beginning of the play function
    this.writeBlanks = [];
    //wordArr will hold the correct word written out without extra spaces
    this.wordArr = word.split("");
    
    //Fills the array of letter objects and display blanks on the page
    this.getLettObjArr = function(){
        for(var i = 0; i < this.wordArr.length; i++){
             var lettObj = new Letter(this.wordArr[i]);
             this.letterObjArr.push(lettObj);
             this.writeBlanks.push(this.letterObjArr[i].appear());
        }
        console.log("\n" +this.writeBlanks.join(" ")+ "\n");
    };
    //displayTheWord function checks the users guess and displays appropriate informtaion. It takes the letter the user guessed and the number of guesses left as arguments
    this.displayTheWord = function(letterGuess, guessesLeft){
        //displayWord array will hold the correct blanks, values, and spaces to be displayed on the screen after each guess (always starts empty)
        var displayWord = [];
        //minusOne is set to true after each turn.
        this.minusOne = true;
                
        //Loop through the letterObjArr to see if the letter guessed matches the correct letter's value
        for(var j = 0; j < this.letterObjArr.length; j++){
            //if there is a match
            if (this.letterObjArr[j].value === letterGuess){
                //showing will be changed to true
                this.letterObjArr[j].showing = true;
                //the return value of the appear function(in Letter) gets pushed to the displayWord array
                displayWord.push(this.letterObjArr[j].appear());
                //Since there was a match, the user does not lose a guess
                this.minusOne = false;
            }
            
            //If there is not a match 
            else{
                //we stil want the appear return value to be pushed to the displayWord array. minusOne stays true
                displayWord.push(this.letterObjArr[j].appear());
            }
        }
                
        //If minusOne is false(the user made a correct guess)
        if(!this.minusOne){
            //display the correct guess message
            console.log("\n" + "\x1b[32m","\x1b[1m","'" + letterGuess + "'" + " IS CORRECT!","\x1b[0m" + "\n\n");
            }
        //If minusOne is true(the user didn't guess correctly)
        else if(this.minusOne){
            //If there is only one guess left we want to write GUESS instead of GUESSES in the incorrect guess message
            if(guessesLeft === 1){
                console.log("\n" + "\x1b[31m","\x1b[1m","'" + letterGuess + "'" + " IS INCORRECT!","\x1b[0m" + "\n   1 GUESS LEFT!" + "\n\n");
            }
            else{
            //any other guessesLeft value will be correct with "GUESSES"
            console.log("\n" + "\x1b[31m","\x1b[1m","'" + letterGuess + "'" + " IS INCORRECT!","\x1b[0m" + "\n   " + guessesLeft + " GUESSES LEFT!" + "\n\n");
            }
        }
        //The display word (with correct guesses revealed) gets logged
        console.log(displayWord.join(" ") + "\n\n");
        
        //If there are no more blanks in the word, log WIN message and the game is over
        if(displayWord.indexOf("_") === -1){
            console.log("YOU WIN!\n");
            this.isFinished = true;
        }
    };
}

module.exports = Word;
