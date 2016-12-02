app.service('$RestApi', ['$http', function ($http) {

  var urlBase = 'http://localhost:3000';

  this.getVideos = function() {
      return $http.get(urlBase + '/videos');
  };

  this.getVideo = function(id) {
      return $http.get(urlBase + '/videos/' + id );
  };

  this.updateVideo = function(params){
    return $http.put(urlBase + '/videos/' + params.id, params )
  }

}]);