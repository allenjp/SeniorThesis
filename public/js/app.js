var app = angular.module('createApp', []);

app.controller('CreateCtrl', ['$scope', '$http', function ($scope, $http) {
    
    //Ballot apps
    $scope.ballotData = {};
    $scope.addedBallots = [];
    
    $scope.processBallot = function () {
        
    };
    
    // Election apps
    $scope.electionData = {};
    $scope.submitElection = function () {
        
    };
}]);