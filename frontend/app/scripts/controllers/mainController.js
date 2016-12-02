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
  
  $scope.currentVideo;
  $scope.videoSelected;

  $scope.init = function(){

    $scope.loadPromisse = $RestApi.getVideos();
    $scope.loadPromisse.success(function(data){
      $scope.videosData = data;
      $scope.currentVideo = data.last();
    });
  };

  
  $scope.selectVideo = function(id){
    $scope.showViewLevel(id);
  };

  $scope.showViewLevel = function(id_youtuber){

  };

}]);
