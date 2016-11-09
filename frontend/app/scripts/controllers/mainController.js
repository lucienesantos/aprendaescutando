'use strict';

/**
 * @ngdoc function
 * @name frontApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontApp
 */
angular.module('frontApp')
  .controller('MainCtrl', ["$scope", '$RestApi', function ($scope, $RestApi) {

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


  $scope.init = function(){

    $scope.loadPromisse = $RestApi.getVideos();
    $scope.loadPromisse.success(function(data){
      $scope.videosData = data;
    });

    // $scope.videosData = [
    //   { id_video: '123', id_youtuber: 'hWEbcqZcXLA', artiste: 'Bruno Mars', music: "Uptown funk", total_words: 320},
    //   { id_video: '456', id_youtuber: 'ZbZSe6N_BXs', artiste: 'Pharell', music: "Happy", total_words: 396},
    //   { id_video: '789', id_youtuber: 'jGflUbPQfW8', artiste: 'Felix Jaeh', music: "Cheerleader", total_words: 384}
    //   ];
  };

  
  $scope.selectVideo = function(id){
    $scope.showViewLevel(id);
  };

  $scope.showViewLevel = function(id_youtuber){

  };

}]);
