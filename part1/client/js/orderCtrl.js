angular.module('pizzaPortal').controller('orderCtrl', function($scope, $http, orders, $location) {
        
        $scope.orders = orders;
   
        $scope.getOrder = function () {
		$http.get('/order/' + $scope.orderId).success(function (response) {
			$scope.orderResponse = response;
		});
	};

	$scope.orderPizza = function () {
          $http({
              method  : 'POST',
              url     : '/order',
              data    : $scope.orders, 
              headers : {'Content-Type': 'application/json'} 
             }).success(function (data, status) {
                   $location.path('/status/'+data.id);
                }).error(function (data, status) {
                    $scope.orderId = 'Request failed';
                    $scope.orderStatus = status;
                });         
        };
  
	$scope.goBack = function() {
            window.history.back();
        };
});

