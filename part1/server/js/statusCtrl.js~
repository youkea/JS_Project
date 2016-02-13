angular.module('pizzaPortal').controller('statusCtrl', function($scope, $http) {
        $scope.getStatus = function () {
            $http.get('/order/' + $scope.orderId).success(function (response) {
                $scope.statusResponse = response;
            });
        };
    });
