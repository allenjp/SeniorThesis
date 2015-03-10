

var app = angular.module('createApp', []);

app.controller('CreateCtrl', ['$scope', '$http', function ($scope, $http, $document) {
    
    $scope.clearFields = function () {
        $scope.ballotData.position = "";
        $scope.ballotData.title = "";
    };
    
    $scope.resetForm = function () {
        $scope.ballotData = {};
    };
    
    //Ballot apps
    $scope.ballotData = {};
    $scope.electionData = {};
    
    var addedBallots = [];
    
    // function used to only append relavant info to list of ballots
    function appendBallot() {
        if (typeof ($scope.ballotData.title) !== "undefined") {
            $('#ballotHolder').append("<li>" + $scope.ballotData.title + "</li>");
        } else {
            $('#ballotHolder').append("<li>" + $scope.ballotData.position + "</li>");
        }
    }
    
    $scope.processBallot = function () {
        // push the current ballot to the addedBallots array
        addedBallots.push($scope.ballotData);
        
        // append the relevant information to the added ballots div
        appendBallot();
        
        //reset the form to its pristine state
        $scope.resetForm();
    };
    
    // Election apps
    
    $scope.submitElection = function () {
        $http.post('/api/create', $scope.electionData).
            success(function (data, status, headers, config) {
                console.log('post successful');
            }).
            error(function (data, status, headers, config) {
                console.log(status);
            });
    };
}]);