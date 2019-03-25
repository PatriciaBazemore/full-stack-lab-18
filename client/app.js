angular.module('chirper', ['ngRoute', 'chirper.controllers']) //names it chriper, pulls in route for whole app
.config(['$routeProvider', function($routeProvider) { //configs, calls for and receives it, must put in ng-route in html and above
    $routeProvider
    .when('/', {                            //when this is asked for
        templateUrl: 'views/welcome.html',  //go here
        //controller:  'WelcomeController'    //do this, dont' need on the welcome page
    })
    .when('/chirps', {
        templateUrl: 'views/list.html',
        controller: 'ChirpListController'
    })
    .when('/chirps/:someId', {
        templateUrl: 'views/single_view.html',
        controller: 'SingleChirpController'
    })
    .when('/chirps/:someId/update', {
        templateUrl: 'views/single_update.html',
        controller: 'UpdateChirpController'
    })
    .otherwise({
        redirectTo: '/'
    })
}])


