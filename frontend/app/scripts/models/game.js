var Game = function(lyric, video) {

  this.lyric = lyric;
  this.video = video;
  this.currentSubtitleObj;
  this.currentSubtitleIndex = 0;
  this.indexWordExpected = 0;
  this.nextSubtitle;


  this.videoPlaying = function(){
    return (this.video != undefined && this.video.getPlayerState() == YT.PlayerState.PLAYING);
  };

  this.showCurrentSubtitle = function() {
    document.getElementById('subtitle').innerHTML = this.currentSubtitleObj.textToShow();
  };

  this.scanner = function(){
    $(window).focus();
    this.currentSubtitleObj = this.currentSubtitle();
    if (this.currentSubtitleObj != undefined) {
      this.showCurrentSubtitle();
      this.validateVideoState();
    }
  };

  this.setKeyUp = function() {
    var that = this;
    $(window).keyup(function(e){
      var letter = String.fromCharCode(e.keyCode);
      that.currentSubtitleObj.validateLetter(letter);
    });
  };

  this.replay = function() {
    this.video.seekTo(this.currentSubtitleObj.time);
    this.video.playVideo();
  };

  this.validateVideoState = function() {
    var currentTime = this.video.getCurrentTime();
    if ((currentTime + 40/100) >= this.nextSubtitle.time) {
      if (this.videoPlaying() && this.currentSubtitleObj.hasWordsToFill()) {
        this.video.pauseVideo();
      }
    }
    if (!this.videoPlaying() && !this.currentSubtitleObj.hasWordsToFill()) {
      this.video.playVideo();
    }
  };

  this.currentSubtitle = function(){
    var currentTime = this.video.getCurrentTime();
    for (var i = 0; i < lyric.subtitles.length - 1; i++) {
      var subtitle = lyric.subtitles[i];
      var nextSubtitle = lyric.subtitles[i+1];
      if (currentTime >= subtitle.time && currentTime <= nextSubtitle.time) {
        this.nextSubtitle = lyric.subtitles[i+1];
        return subtitle;
      }
    }
  };

  this.setKeyUp();  
}