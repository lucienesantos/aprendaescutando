var Lyric = function(subtitles) {

  this.subtitles = subtitles;
  this.totalWords = 0;
  this.selectedGaps = [];
  this.allLineGaps = [];


  this.countWords = function() {
    var gaps = [];
    for (var i = 0; i < subtitles.length; i++) {
      this.totalWords += subtitles[i].gaps.length;
      this.allLineGaps = { gaps: this.subtitles[i].gaps, line: i };
    }
  };

  this.selectRandomGap = function(selectedWordIndex) {
    var totalIndex = 0;
    for (var i = 0; i < this.subtitles.length; i++) {
      var subtitle = this.subtitles[i];
      if ((selectedWordIndex < subtitle.gaps.length + totalIndex)) {
        subtitle.addGapToRandom(selectedWordIndex - totalIndex);
        break;
      }
      totalIndex += subtitle.gaps.length;
    };
  };

  this.percentulParam = function(level){
    switch (level) {
      case 'beginner':
        return 10;
      case 'intermediate':
        return 25;
      case 'advenced':
        return 50;
      case 'expert':
        return 100;
      break;        
    };
  };

  this.selectWordsRandom = function(level) {
    var interval = parseInt(100/this.percentulParam(level));
    var totalRandomWords = Math.round(this.totalWords / interval);
    var initInterval = 0;
    var lastInterval = interval;
    var selectedWordIndex = Math.randomInRange(initInterval, lastInterval);
    var totalIndexes = 0;
    
    while (selectedWordIndex < this.totalWords) {
      this.selectRandomGap(selectedWordIndex);
      initInterval += interval;
      lastInterval += interval;
      if (lastInterval > this.totalWords) {
        lastInterval = this.totalWords;
      }
      selectedWordIndex = Math.randomInRange(initInterval, lastInterval);
      totalIndexes++;
    }
  };
  this.countWords();
  this.selectWordsRandom();
};