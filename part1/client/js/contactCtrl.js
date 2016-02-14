angular.module('pizzaPortal').controller('contactCtrl', function($scope, $http) {
        
        $scope.getContact = function () {
            $http.get('/contact').success(function (response) {
                $scope.contactResponse = response;
            });
        };
         
    });

