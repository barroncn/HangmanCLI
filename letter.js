// Letter: Used for each letter in the current word. Each letter object should either display an underlying character, or a blank placeholder (such as an underscore), depending on whether or not the user has guessed the letter. This should contain letter specific logic and data.
//Letter constructor function
function Letter(lett){
    this.showing = false;
    this.value = lett;
    this.appear = function(){
        if(this.value === " "){
            var space = " ";
            return space;
        }
        else if(this.showing){
            var displayed = this.value;
            return displayed;
        }
        else{
            var blank = "_";
            return blank;
        }
    };
}

module.exports = Letter;


// loop through array of objects...
// if newLetter.value === letter guessed
// newLetter.appear();