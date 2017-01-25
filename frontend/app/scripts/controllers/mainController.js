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
  $scope.stringSearch;

  $scope.init = function(){

    $scope.loadPromisse = $RestApi.getVideos();
    $scope.loadPromisse.success(function(data){
      $scope.videosData = data;
      $scope.currentVideo = data.last();
    });
  };

  $scope.videos = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
      url: 'http://localhost:3000/v1/public/videos?text=%QUERY',
      wildcard: '%QUERY'
    }
  });

  $scope.videosDataset = {
    displayKey: 'music',
    source: $scope.videos.ttAdapter(),
    templates: {
      empty: [
        '<div class="tt-suggestion tt-empty-message">',
        'No results were found ...',
        '</div>'
      ].join('\n'),
    }
  };  
  
  $scope.selectVideo = function(id){
    $scope.showViewLevel(id);
  };

  $scope.showViewLevel = function(id_youtuber){
  };

}]);
