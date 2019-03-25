//.controller('WelcomeController', ['$scope', function($scope) {
//}])
angular.module('chirper.controllers', [])
.controller('ChirpListController', ['$scope', '$http', function($scope, $http) {
    getChirps();
    $http({
        method: 'GET',
        url: '/api/users'  
    }).then(function(response) {
        $scope.users = response.data;
    }), function(err) {
        console.log(err);
    }

$scope.createChirp = function() {
    var chirp = {           //payload
        message: $scope.newMessage, //gets whatever is typed in chirpField
        userid: $scope.newUserId // here, you would select the select box using JQuery and get its current value///value of select box
    }; 
    $http({
        method: 'POST',
        url: '/api/chirps',
        contentType: 'application/json',
        data: chirp //payload
    }).then(function(response) {
        $scope.newMessage = '';
        $scope.newUserId = '';
        getChirps();
    }, function(err) {
        console.log(err);
    })
    
}    
       
//     then(function(success) {
//         $http({
//             method: 'GET',
//             url: '/api/chirps'
//     }).then(function(response) {
//         $scope.chirps = response.data;
//         $scope.chirpfield ='';
//     }), function(err) {
//         console.log(err);
//         } 
//     });         
// }

function getChirps() {
        return $http({
            method: 'GET',
            url: '/api/chirps'
        }).then(function(response) {
            $scope.chirps = response.data;
        }, function(err) {
            console.log(err);
        });
    }

}])



.controller('SingleChirpController', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location) { 
    $http({
        method: 'GET',
        url: '/api/chirps/' + $routeParams.someId
    }).then(function(response) {
        $scope.chirp = response.data;
    }), function(err) {
        console.log(err);
    }

    $scope.editChirp = function() {
        $location.path('/chirps/' + $routeParams.someId + '/update');
        // window.location.pathname = '/chirps/' + $routeParams.id + '/update';
    }    
    $scope.deleteChirp = function() {
        if (confirm('Are you sure you want to delete this chirp?')) {
            $http({
                method: 'DELETE',
                url: '/api/chirps/' + $routeParams.someId
            }).then(function(response) {
                $location.replace().path('/chirps'); //takes us to chirps but cant come back to this page b/c it's been deleted
            }, function(err) {
                console.log(err);
               }
        );
    }          
}
}])
    //     
    //             $scope.chirp.$delete(function() { //kicks of request to delete currect pizza, probaby want to return to list view after this
    //                 window.history.back();
    //         }, function(err) {
    //         console.log(err);
    //         });
    //     }
    // }
    
.controller('UpdateChirpController', [ '$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) { 
    $http({
        url: '/api/chirps/' + $routeParams.someId,
        method: 'GET'
    }).then(function(response) {
        $scope.chirp = response.data;
    }, function(err) {
        console.log(err);
    });

    $scope.updateChirp = function() {
        var payload = {
            message: $scope.chirp.message //get what's currently in box
        };
        $http({
            method: 'PUT',
            url: '/api/chirps/' + $routeParams.someId,
            data: payload
        }).then(function(response) {
            //window.history.back(); //as if we clicked the back button..we update then go back
            $location.path('/chirps/' + $routeParams.someId);
        }, function(err) {
            console.log(err)
        });   
    }
}]);

