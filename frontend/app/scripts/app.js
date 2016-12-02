'use strict';

/**
 * @ngdoc overview
 * @name frontApp
 * @description
 * # frontApp
 *
 * Main module of the application.
 */
var app = angular
  .module('frontApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'youtube-embed',
  ]);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
      })
      .state('level', {
        url:'/game/:id',
        templateUrl: 'views/level.html',
        controller: 'LevelCtrl',
        params: {
          id: null,
        }
      })
      .state('game', {
        url: '/game/:id/:level',
        templateUrl: 'views/game.html',
        controller: 'GameCtrl',
        params: {
          level: null,
          id: null,
        }

      });
  }]);
