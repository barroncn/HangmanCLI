var Word = require("./word.js");
var inquirer = require("inquirer");

var alphabet1 = [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ];
//make a copy of the alphabet array (This way we don't have to manually reset alphabet evertime a game is over, we can just set it equal to a new copy of alphabe1)
var alphabet = alphabet1.slice(0);

//The following arrays contain word banks for each category
var animal = ["SHEEP DOG", "BARN CAT", "HORSE", "DONKEY", "BULL", "DUCKLING", "GOAT", "CHICKEN", "ROOSTER", "HEN", "CHICK", "PIG", "BARN OWL", "MOUSE", "PIGLET", "FLY", "RABBIT", "COLT", "CALF", "GOOSE"];
var landmark = ["GRAND CANYON", "EIFFEL TOWER", "LEANING TOWER OF PIZA", "GREAT WALL OF CHINA", "MOUNT RUSHMORE", "BIG BEN", "SPACE NEEDLE", "COLOSSEUM", "WHITE HOUSE"];
var movie = ["WOLF OF WALLSTREET", "MISSION IMPOSSIBLE", "GONE IN SIXTY SECONDS", "PRETTY WOMAN", "BIG", "DIE HARD", "LOVE ACTUALLY", "DJANGO UNCHAINED", "BLOW", "WALK THE LINE", "THE LION KING", "MAD MAX", "INTERSTELLAR", "DEADPOOL", "AMNITYVILLE HORROR", "CINDERELLA", "RESEVOIR DOGS", "SCARFACE", "DUMB AND DUMBER", "NO COUNTRY FOR OLD MEN", "ALL THE PRETTY HORSES", "IT"];

//Welcome Message
console.log("\n" + "\x1b[1m","Hello! Welcome to Hangman!\n");

function play(){
    inquirer.prompt([
        {
            name : "gameType",
            type : "list",
            message : "Which category would you like to guess from?",
            choices : ["\x1b[1m" + "   Farm Animals", "   Famous Landmarks", "   Movie Titles"]
        }
    ]).then(function(answers){
        
            //Depending on the users selection, the correct array is targeted
            var guessArray;
            if(answers.gameType === "\x1b[1m" + "   Farm Animals"){
                if(animal.length > 0){
                    guessArray = animal;
                }
            } 
            else if(answers.gameType === "   Famous Landmarks"){
                    guessArray = landmark;
            }
            else{
                    guessArray = movie;
            }
            
            //A random index from the array is chosen
            var index = Math.floor(Math.random() * guessArray.length);
            //The selected word is taken out of the array so it won't be given again in the same session
            var guess = guessArray.splice(index, 1).join();
            //The a new Word object called "guessIt" is created with the chosen word.
            var guessIt = new Word(guess);
            //Reset the alphabet array containing the users input options
            alphabet = alphabet1.slice(0);
            
            //The getLetterObjArr function creates the array of letter objects we'll use and initially writes blanks to the console
            guessIt.getLettObjArr();
            
            //The checkLetter function begins the guessing part of the game
            checkLetter(guessIt, 9);
    });
}

//The checkLetter function takes two arguments: the name for the new Word object and the number of guesses the user has left.
function checkLetter(wordVar, guessesLeft) { 
    //As long as the user has guesses left and the word has not been correctly guessed, they will be prompted to guess a new letter
    if(guessesLeft>-1 && !wordVar.isFinished){
            inquirer.prompt([
                        {
                            name : "letterGuess",
                            message : " Guess a letter! ",
                            validate: function(value) {
                                if(alphabet.indexOf(value.toUpperCase()) != -1){
                                    return true;
                                } 
                                return false;
                            }
                        }
            ]).then(function(answers){
                //Take the letter guessed out of the alphabet array so the user cannot guess it again
                alphabet.splice(alphabet.indexOf(answers.letterGuess.toUpperCase()),1);
                //The displayTheWord function in the Word object is called. It is passes the letter the user guessed, the type of the array, and the number of guessesLeft
                wordVar.displayTheWord(answers.letterGuess.toUpperCase(), guessesLeft);
                //If the minusOne key for the Word object is true (ie the user made an incorrect guess), the guessesLeft will decrease by one.
                if(wordVar.minusOne){
                    guessesLeft--;
                }
                //The checkLetter function is recursively called, passing it the Word object in question and the current number of wrong guesses left.
                checkLetter(wordVar, guessesLeft);
            });
    }
    //If the user has no guesses left or they have correctly guessed the word
    else{
        //If the user ran out of guesses the correct answer is displayed on the screen
        if(guessesLeft === -1){
            console.log("THE CORRECT ANSWER IS: " + "\x1b[1m",wordVar.wordArr.join("") + " ","\x1b[0m" + "\n");
        }
        
        //Whether the user guessed the answer or ran out of tries, they will be asked if they'd like to play again
        inquirer.prompt([
            {
                type : "confirm",
                name : "confirm",
                message : "Would you like to play again?",
                default : true
            }
        ]).then(function(answers){
            //If the user selects chooses to play again, the play function is called, so the user will be asked to select the category and a new word will be picked
            if(answers.confirm){
                play();
            }
            else{
                //If the user chooses not to play again a goodbye message is displayed.
                console.log("\nCome again soon!\n");
            }
        });
    }
}

//initialize game
play();