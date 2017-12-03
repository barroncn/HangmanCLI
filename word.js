var Letter = require("./letter.js");
var inquirer = require("inquirer");

function Word(word){
    this.isFinished = false;
    this.minusOne = false;
    this.letterObjArr = [];
    this.writeBlanks = [];
    this.wordArr = word.split("");
    
    //Creates the initial array of letters and display blanks onthe page
    this.getLettObjArr = function(){
        for(var i = 0; i < this.wordArr.length; i++){
             var lettObj = new Letter(this.wordArr[i]);
             this.letterObjArr.push(lettObj);
             this.writeBlanks.push(this.letterObjArr[i].appear());
        }
        console.log("\n" +this.writeBlanks.join(" ")+ "\n");
    };
    //This function checks the users guess and displays appropriate informtaion
    this.displayTheWord = function(letterGuess, gameType, guessesLeft){
        // if(guessesLeft>1){
        //   inquirer.prompt([
        //     {
        //         name : "letterGuess",
        //         message : "? GUESS A LETTER: "
        //     }
        //     ]).then(function(answers){
                var displayWord = [];
                this.minusOne = false;
                //onkey up to uppercase
                //if(onkeyup value)
                //onkey up....letguessed = value...
                
                var changed = false;
                for(var j = 0; j < this.letterObjArr.length; j++){
                    if (this.letterObjArr[j].value === letterGuess){
                        this.letterObjArr[j].showing = true;
                        displayWord.push(this.letterObjArr[j].appear());
                        changed = true;
                    }
                    else{
                        displayWord.push(this.letterObjArr[j].appear());
                    }
                }
                if(changed === true){
                    console.log("\n" + "\x1b[32m","'" + letterGuess + "'" + " IS CORRECT!","\x1b[0m" + "\n\n");
                    }
                else if(changed === false){
                    this.minusOne = true;
                    //guessesLeft--;
                    console.log("\n" + "\x1b[31m","'" + letterGuess + "'" + " IS INCORRECT: " + guessesLeft + " GUESSES LEFT","\x1b[0m" + "\n\n");
                }
                console.log(displayWord.join(" ") + "\n\n");
                if(displayWord.indexOf("_") === -1){
                    //guessesLeft = 0;
                    console.log("YOU WIN!");
                    this.isFinished = true;
                }
                // for(var n = 0; n < displayWord.length; n++){
                    
                // }
                //this.displayTheWord(guessesLeft);
           // }.bind(this));
        //}
        // else{
        //     console.log("\nTHE " + gameType + " IS: \n" + this.wordArr.join(" "));
        //     this.isFinished = true;
        //     // inquirer.prompt([
        //     //     {
        //     //         type : "confirm",
        //     //         message : "Would you like to play again?",
        //     //         default : true
        //     //     }
        //     // ]).then(function(answers){
                    
        //     // });
        // }
        
    };
}
// var newWord = new Word("sheep dog");
// newWord.getLettObjArr();
// newWord.displayTheWord("e");

module.exports = Word;
