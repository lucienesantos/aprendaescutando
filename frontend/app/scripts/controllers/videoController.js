'use strict';

/**
 * @ngdoc function
 * @name frontApp.controller:VideoCtrl
 * @description
 * # VideoCtrl
 * Controller of the frontApp
 */

angular.module('frontApp')
  .controller('VideoCtrl', ["$scope", '$state', '$RestApi', function($scope, $state, $RestApi){
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  
  $scope.video;

  $scope.init = function(){
    console.log("chegou no controller")
    alert("oi");
  }


}]);