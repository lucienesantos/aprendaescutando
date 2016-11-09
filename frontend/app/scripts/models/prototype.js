String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

String.prototype.replaceForDots = function(start) {
  var text = "";
  for (var i = 0; i < start; i++) {
    text += this.concat()[i];
  };
  for (var i = start; i < this.concat().length; i++) {
    if (this.concat()[i] == "'") {
      text += "'";  
    } else if (this.concat()[i] == ",") {
      text += ",";  
    } else {
      text += ".";
    }
  };
  return text;
};

String.prototype.insertTextAt = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

Array.prototype.last = function() {
    return this[this.length-1];
}

Math.randomInRange = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};