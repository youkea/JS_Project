angular.module('pizzaPortal').controller('statusCtrl', function($scope, $http, $routeParams) {
	 $scope.orderId = $routeParams.id;
        $scope.getStatus = function () {
            $http.get('/order/' + $scope.orderId).success(function (response) {
                $scope.statusResponse = response;
            }).error(function (data, status) {
                    $scope.orderId = 'Request failed';
                });
    };

});
        
                     

