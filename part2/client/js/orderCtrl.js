angular.module('pizzaPortal').controller('orderCtrl', function($scope, $http, orders, $location,ngDialog) {
        
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
    
     $scope.openPopup = function () {
         $scope.getExtras();
            var dialog = ngDialog.open({ 
                template: 'orderpopup.html',
                scope: $scope
            });
            
            dialog.closePromise.then( function () {
                $scope.addExtrasToOrders();
            });
     }
  
	$scope.goBack = function() {
            window.history.back();
        };
    
       $scope.getExtras  = function() {
		$http.get('/extras').success(function (response) {
			$scope.extras = response;
		});
       }
        $scope.orderedExtras = [];
    
        $scope.total = $scope.total();
    
        $scope.changePrice = function (price) {
            var total = parseFloat($scope.total);
            total += price;
            $scope.total = total.toFixed(2);
        };
    
        $scope.addExtrasToOrders = function () {
            var index = $scope.orders.length - 1;
            $scope.orders[index].extras = $scope.orderedExtras;
        };
    
        $scope.addExtra = function (extra) {
            $scope.orderedExtras.push(extra);
            $scope.changePrice(extra.price);
        };
    
        $scope.deleteExtra = function (extra) {
            $scope.changePrice(-Math.abs(extra.price));
            var index = $scope.orderedExtras.indexOf(extra);
            $scope.orderedExtras.splice(index, 1);
        };

});

