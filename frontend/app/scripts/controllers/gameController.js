
'use strict';

/**
 * @ngdoc function
 * @name frontApp.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller of the frontApp
 */

 angular.module('frontApp')
   .controller('GameCtrl', ['$scope', '$state', '$RestApi', function($scope, $state, $RestApi){

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var videoPlayer;
    $scope.game;
    $scope.video;
 

    $scope.init = function(){
      $scope.level = $state.params.level;
      $scope.loadPromisse = $RestApi.getVideo($state.params.id);
      $scope.loadPromisse.success(function(data){
        $scope.video = data;
        $scope.onYouTubeIframeAPIReady();
      });
      
    };

    function onPlayerStateChange(event) {
      if(event.target.getPlayerState() == YT.PlayerState.PLAYING ){
        setInterval(function() {
          $scope.game.scanner();
        }, 40);
        $(window).focus();
      };
    };

    $scope.onYouTubeIframeAPIReady = function() {
      videoPlayer = new YT.Player('video_current', {
        height: '300',
        width: '540',
        videoId: $scope.video.id_youtuber,
        events: {
          'onReady': initialize,
          'onStateChange': onPlayerStateChange
        }
      });
    };

    function initialize(){
      readFile();
    };


    function readFile(){

      var textLines = Base64.decode($scope.video.subtitle_text).split("\n");
      var parser = new Parser(textLines);
      var subtitles = parser.processLines();

      var lyric = new Lyric(subtitles);
      lyric.selectWordsRandom($scope.level);
      $scope.game = new Game(lyric, videoPlayer);

    };



}]);