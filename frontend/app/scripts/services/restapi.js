app.service('$RestApi', ['$http', function ($http) {

  var urlBase = 'http://localhost:3000';

  this.getVideos = function() {
      return $http.get(urlBase + '/v1/public/videos');
  };

  this.getVideo = function(id) {
      return $http.get(urlBase + '/v1/public/videos/' + id );
  };

  this.updateVideo = function(params){
    return $http.put(urlBase + '/v1/public/videos/' + params.id, params )
  }

  this.createVideo = function(params){
    return $http.post(urlBase + '/v1/public/videos/' + params)
  }

  // this.search = function(query){
  //   return $http.get(urlBase + '/v1/public/videos/_search' + query)
  // }

}]);