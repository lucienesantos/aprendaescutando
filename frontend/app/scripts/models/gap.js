var Gap = function(word, start) {

  this.word = word;
  this.start = start;
  this.random = false;
  this.rightLetters = 0;

  this.isComplete = function() {
    return (this.word.length == this.rightLetters);
  };

  this.setRandom = function() {
    this.random = true;
    this.rightLetters = 0;
  };

  this.validate = function(letter) {
    if (this.word[this.rightLetters].toLowerCase() == letter.toLowerCase()) {
      this.rightLetters++;
    }
    if (this.word[this.rightLetters] == "'" || this.word[this.rightLetters] == ",") {
      this.rightLetters++;
    };
  };

  this.textToShow = function() {
    if (this.random) {
      return this.word.replaceForDots(this.rightLetters);
    } else {
      return word;
    }
  };

};