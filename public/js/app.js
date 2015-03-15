/*jslint plusplus: true */


var app = angular.module('createApp', []);

// Controller for create page
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
    
    $scope.addedBallots = [];
    
    // function used to only append relavant info to list of ballots
//    function appendBallot() {
//        if (typeof ($scope.ballotData.title) !== "undefined") {
//            $('#ballotHolder').append("<li>" + $scope.ballotData.title + "</li>");
//        } else {
//            $('#ballotHolder').append("<li>" + $scope.ballotData.position + "</li>");
//        }
//    }
    
    $scope.processBallot = function () {
        // push the current ballot to the addedBallots array
        $scope.addedBallots.push($scope.ballotData);
        
        // append the relevant information to the added ballots div
        // appendBallot();
        
        //reset the form to its pristine state
        $scope.resetForm();
    };
    
    // Election apps
    
    $scope.submitElection = function () {
        
        console.log($scope.addedBallots);
        
        $scope.electionData.ballots = [];
        
        var i;
        for (i = 0; i < $scope.addedBallots.length; i++) {
            
            $scope.electionData.ballots.push({
                "type": $scope.addedBallots[i].type,
                "position": $scope.addedBallots[i].position,
                "title": $scope.addedBallots[i].title
            });
        }
        
        console.log($scope.electionData);
        
        
        $http.post('/api/create', $scope.electionData).
            success(function (data, status, headers, config) {
                console.log(data);
            }).
            error(function (data, status, headers, config) {
                console.log(status);
            });
        
    };
}]);

// Global jQuery functions
$(document).ready(function () {
    $('.tooltip').tooltip();
});