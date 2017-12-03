var Word = require("./word.js");
var inquirer = require("inquirer");

var theType = "";
var animal = ["SHEEP DOG", "BARN CAT", "HORSE", "DONKEY", "BULL", "DUCKLING", "GOAT", "CHICKEN", "ROOSTER", "HEN", "CHICK", "PIG"];
var landmark = ["GRAND CANYON", "EIFFEL TOWER", "LEANING TOWER OF PIZA", "GREAT WALL OF CHINA", "MOUNT RUSHMORE"];
var movie = ["WOLF OF WALLSTREET", "MISSION IMPOSSIBLE", "GONE IN SIXTY SECONDS", "PRETTY WOMAN", "BIG", "DIE HARD", "LOVE ACTUALLY", "DJANGO UNCHAINED", "BLOW", "WALK THE LINE", "THE LION KING", "MAD MAX", "INTERSTELLAR", "DEADPOOL", "AMNITYVILLE HORROR", "CINDERELLA", "RESEVOIR DOGS", "SCARFACE"];

console.log("Hello! Welcome to Hangman!");

function play(){
    inquirer.prompt([
        {
            name : "gameType",
            type : "list",
            message : "Which category would you like to guess from?",
            choices : ["Farm Animals", "Famous Landmarks", "Movie Titles"]
        }
    ]).then(function(answers){
            var guessArray;
            if(answers.gameType === "Farm Animals"){
                guessArray = animal;
                theType = "ANIMAL";
            } 
            else if(answers.gameType === "Famous Landmarks"){
                guessArray = landmark;
                theType = "LANDMARK";
            }
            else{
                guessArray = movie;
                theType = "MOVIE";
            }
            var index = Math.floor(Math.random() * guessArray.length);
            var guess = guessArray.splice(index, 1).join();
            var guessIt = new Word(guess);
            guessIt.getLettObjArr();
            //guessIt.displayTheWord("", theType);//.done(function(){
            checkLetter(guessIt, 9);
            
                
            // if(guessIt.isFinished){    
            //     inquirer.prompt([
            //         {
            //             type : "confirm",
            //             message : "Would you like to play again?",
            //             name : "confirm",
            //             default: true
            //         }
            //         ]).then(function(answers){
            //             if(confirm){
            //                 play();
            //             }
            //         });
            // }
            //})
            //console.log(guessIt.letterObjArr.appear());
            // var blanks = [];
            // for(var k = 0; k < guessIt.wordArr.length; k++){
            //     blanks.push("_");
            // }
            // console.log(blanks.join(" "));
            //guessIt.displayTheWord("");
            
            // inquirer.prompt([
            //     {
            //         name : "letterGuess",
            //         message : "? GUESS A LETTER: "
            //     }
            // ]).then(function(answers){
            //     guessIt.displayTheWord(answers.letterGuess, 10);
            // });
    });
}
function checkLetter(wordVar, guessesLeft) { 
    if(guessesLeft>-1 && !wordVar.isFinished){
            inquirer.prompt([
                        {
                            name : "letterGuess",
                            message : " GUESS A LETTER: "
                        }
            ]).then(function(answers){
                wordVar.displayTheWord(answers.letterGuess.toUpperCase(), theType, guessesLeft);
                if(wordVar.minusOne){
                    guessesLeft--;
                }
                checkLetter(wordVar, guessesLeft);
            });
    }
    else{
        console.log("\nTHE CORRECT ANSWER IS: " + "\x1b[4m",wordVar.wordArr.join("") + " ","\x1b[0m" + "\n");
        inquirer.prompt([
            {
                type : "confirm",
                name : "confirm",
                message : "Would you like to play again?",
                default : true
            }
        ]).then(function(answers){
            if(answers.confirm){
                play();
            }
            else{
                console.log("Come again soon!")
            }
        });
    }
}

//initialize game
play();





























// // Word: Used to create an object representing the current word the user is attempting to guess. This should contain word specific logic and data.
// var Letter = require("./letter.js");
// //Word constructor function
// var letterArr = [];
// function playGame (){
//     var wordArr = ["HORSE", "DONKEY", "PIG", "GOAT", "OSTERICH", "BISON", "COW", "SHEEP", "SHEEP DOG", "BARN CAT"];
//     var indexToPick = Math.floor(Math.random() * wordArr.length);
//     var guessWord = wordArr.splice(indexToPick,1)[0]; //takes a word out of wordArr
//     console.log(guessWord);
//     for(var i = 0; i < guessWord.length; i++){
//         var guessLetter = new Letter(guessWord[i]);
//         letterArr.push(guessLetter);
//     }
//     console.log(letterArr);
    
// }
// Word();

// module.export = Word;