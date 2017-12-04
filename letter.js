//Letter constructor function. Takes a letter as an argument(this will be a letter in the word to be guessed)
function Letter(lett){
    //Showing will keep track of whether the should be shown on the screen as the value or as the blank
    this.showing = false;
    //the value is the letter itself
    this.value = lett;
    //The appear function will return what should be displayed 
    this.appear = function(){
        //if the value is a space, it should be displayed as a space
        if(this.value === " "){
            var space = " ";
            return space; //returning these variables allows us to use them in Word to fill the displayWord array
        }
        //if showing is true, the value of the letter should be displayed
        else if(this.showing){
            var displayed = this.value;
            return displayed;
        }
        //if showing is false, a blank should be displayed
        else{
            var blank = "_";
            return blank;
        }
    };
}

module.exports = Letter;