
'use strict';

/**
 * @ngdoc function
 * @name frontApp.controller:LevelCtrl
 * @description
 * # LevelCtrl
 * Controller of the frontApp
 */

angular.module('frontApp')
  .controller('LevelCtrl', ["$scope", '$state', '$RestApi', function($scope, $state, $RestApi){
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  
  $scope.video;

  const Percent = { BEGINNER: 10, INTEMEDIATE: 4, ADVENCED: 2}

  $scope.init = function(){
    $scope.loadPromisse = $RestApi.getVideo($state.params.id);
    $scope.loadPromisse.success(function(data){
      $scope.video = data;
      $scope.calculateWordsByLevel();
    });
  };

  $scope.calculateWordsByLevel = function(){

    $scope.countWordsRandomBeginner = parseInt($scope.video.total_words/Percent.BEGINNER );
    $scope.countWordsRandomIntermediate = parseInt($scope.video.total_words/Percent.INTEMEDIATE );
    $scope.countWordsRandomAdvanced = parseInt($scope.video.total_words/Percent.ADVENCED);

  };

}]);
