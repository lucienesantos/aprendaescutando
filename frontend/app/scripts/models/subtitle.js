var Subtitle = function(time, text, index) {

  this.index = index;
  this.time = time;
  this.text = text;
  this.gaps = [];
  this.randomGaps = [];
  this.invalidGaps = [];

  this.textToShow = function() {
    var text = [];
    for (var i = 0; i < this.gaps.length; i++) {
      text.push(this.gaps[i].textToShow());
    };
    var joinedText = text.join(" ");
    for (var i = 0; i < this.invalidGaps.length; i++) {
      var invalidGap = this.invalidGaps[i];
      joinedText = " " + joinedText.insertTextAt(invalidGap.start, 0, invalidGap.word + " ");
    };
    return joinedText;
  };

  this.createGaps = function() {
    var BREAK_CHARS = ["(", ")", ","];
    var word = "";
    var invalidWord = "";
    var cursor = 0;
    var parenthesisOpen = false;
    while (cursor < this.text.length) {
      if (this.text[cursor] == BREAK_CHARS[0]) {
        parenthesisOpen = true;
        invalidWord += this.text[cursor];
      } else if (this.text[cursor] == BREAK_CHARS[1]) {
        parenthesisOpen = false;
        invalidWord += this.text[cursor];
        this.invalidGaps.push(new Gap(invalidWord, cursor + 1 - invalidWord.length));
        invalidWord = "";
      } else if (this.text[cursor] == " ") {
        if (word != "") {
          this.gaps.push(new Gap(word, cursor - word.length));
          word = "";
        } else if (invalidWord != "") {
          invalidWord += " ";
        }
      } else {
        if (!parenthesisOpen) {
          word += this.text[cursor];
        } else {
          invalidWord += this.text[cursor];
        }
      }
      cursor++;
    }
    if (word != "") {
      this.gaps.push(new Gap(word, cursor - word.length));
    }
  };

  this.addGapToRandom = function(index) {
    this.randomGaps.push(this.gaps[index]);
    this.gaps[index].setRandom();
  };

  this.hasWordsToFill = function() {
    return this.randomGaps.length > 0;
  };

  this.validateLetter = function(letter) {
    if (this.randomGaps.length > 0) {
      this.randomGaps[0].validate(letter);
      if (this.randomGaps[0].isComplete()) {
        this.randomGaps.splice(0,1);
      }
    }
  };

  this.createGaps();

  return this;

};