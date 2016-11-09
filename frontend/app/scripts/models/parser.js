var Parser = function(lines) {

  this.lines = lines;

  this.countSeconds = function(stringWithTime){
    var times = stringWithTime.split(":");
    return (parseFloat(times[0].substring(1,3)) * 60) + parseFloat(times[1].substring(0,4));
  };

  this.processLines = function() {
    var subtitles = [];
    for (var i = 0; i < this.lines.length - 1; i++) {
      var line = this.lines[i].split("]");
      var subtitle = new Subtitle(this.countSeconds(line[0]), line[1], i);
      subtitles.push(subtitle);
    };
    return subtitles;
  };

};