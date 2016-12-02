
'use strict';

/**
 * @ngdoc function
 * @name frontApp.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller of the frontApp
 */

 angular.module('frontApp')
   .controller('GameCtrl', ['$scope', '$state', '$RestApi', function($scope, $state, $RestApi ){

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.videoPlayer;
    $scope.game;
    $scope.video;
    $scope.pai = "eu suo o scopo pai";
    $scope.interval;
    $scope.wasPaused = false;
    $scope.intervalScanner;
    $scope.playerVars = {
      controls: 0,
      autoplay: 0
    };


    $scope.init = function(){
      $scope.level = $state.params.level;
      $scope.loadPromisse = $RestApi.getVideo($state.params.id);
      $scope.loadPromisse.success(function(data){
        $scope.video = data;
        $scope.readFile();
        $scope.setingPlays = true;
      });
    };

    $scope.replay = function(){
      $scope.wasPaused = true;
      $scope.initLoadingBar();
      $scope.game.replay();

    };

    $scope.retry = function(){
      $("#retry").css("display", "none");
      $("#tag_video").css("display", "block");
      $scope.wasPaused = false;
      $scope.initializeLyrics();
      $scope.game.video.playVideo();
    }

    $scope.$on('youtube.player.ready', function ($event, player) {
      $scope.videoPlayer = player;
      $scope.game.video = player;
    });

    $scope.$on('youtube.player.playing', function ($event, player) {
      $scope = $event.currentScope;
      $scope.videoPlayer = player;
      $scope.initLoadingBar();

      if($scope.setingPlays){
        $scope.setPlays();
      }
      $scope.intervalScanner = setInterval(function() {
        $scope.game.scanner();
      }, 40);
      $(window).focus();
    });

    $scope.$on('youtube.player.paused', function ($event, player) {
      if ( !$scope.wasPaused ){
        $scope.percentBar = 100;
        $scope.wasPaused = true;
      };

      $scope.interval  = setInterval(function(){
        if($scope.percentBar > 0 ) {
          $scope.countingTime();
        }else{ 
         $scope.enableRestartGame(); 
        }
      }, 300);
    }); 

    // $scope.enableRestartGame = function(){
    //   $scope.initLoadingBar();
    //   $scope.game.video.stopVideo();
    //   $scope.hideVideo();
    //   $scope.showRetry();
    //   $scope.game.clearVariables();
    //   $scope.clearSubtitle();
    //   clearInterval($scope.intervalScanner);
    // };

    $scope.enableRestartGame = function(){
      $scope.percentBar = 0;
      $("#loading-bar").width($scope.percentBar + '%');

      $scope.wasPaused = false;
      clearInterval($scope.interval);
      $scope.hideReplay();
      $scope.game.video.stopVideo();
      $scope.hideVideo();
      $scope.showRetry();
      $scope.game.clearVariables();
      $scope.clearSubtitle();



    };

    $scope.initLoadingBar = function(){
      if(!$scope.wasPaused ){
        $scope.percentBar = 100;
      }
      $("#loading-bar").width($scope.percentBar + '%');
      clearInterval($scope.interval);
      $("#replay").css("display", "none");
    };   

    $scope.hideVideo = function(){
      $("#tag_video").css("display", "none");
    }

    $scope.showRetry = function(){
      $("#retry").css("display", "block");
    }

    $scope.hideReplay = function(){
      $("#replay").css("display", "none");
    }

    $scope.showReplay = function(){
      $("#replay").css("display", "block");
    }

    $scope.clearSubtitle = function(){
      $("#subtitle").text("");
    }

    $scope.countingTime = function(){
      $scope.showReplay();
      $("#loading-bar").width($scope.percentBar + '%')
      $scope.percentBar = $scope.percentBar - 2 ;
    }
 
    $scope.readFile = function(){
      var textLines = Base64.decode($scope.video.subtitle_text).split("\n");
      var parser = new Parser(textLines);
      $scope.subtitles = parser.processLines();
      $scope.initializeLyrics();
    };

    $scope.initializeLyrics = function(){
      $scope.lyric = new Lyric($scope.subtitles);
      $scope.lyric.selectWordsRandom($scope.level);
      $scope.game = new Game($scope.lyric, $scope.videoPlayer);
    }

    $scope.setPlays = function(){
      $scope.video.plays++;
      var params = {id: $scope.video.id, plays: $scope.video.plays };
      $RestApi.updateVideo(params).success(function(){
        $scope.setingPlays = false;
      });
    };

    $scope.$watch("game.hits", function(){
      $scope.wasPaused = false;
      $scope.initLoadingBar(); 
    });

}]);