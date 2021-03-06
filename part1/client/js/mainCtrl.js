angular.module('pizzaPortal').controller('mainCtrl', function(orders, $location, $scope, $http) {
         $scope.getMenu = function () {
		$http.get('/menu').success(function (response) {
		$scope.menuResponse = response;
		});    
	};

         $scope.orders = orders;
	 $scope.deleteButton = "delete.png";
	 $scope.addButton = "add.png";
	 $scope.orderButton = "order.png";

	 $scope.addToBasket = function (itemMenu) {        
            var order = {};
	
	    order.name = itemMenu.name;
            order.id = itemMenu.id;
            if (typeof itemMenu.quantity !== 'undefined') {
                order.quantity = itemMenu.quantity;
            } 
            order.price = itemMenu.price * order.quantity;   
            if (order.price > 0) {
                $scope.orders.push(order);
            }
        };

	$scope.deleteFromBasket = function (index) {  
            $scope.orders.splice(index, 1);
        };

	$scope.sumPrice = function () {
		var sum = 0;
	angular.forEach($scope.orders, function(item) {
           	sum = sum + item.price; 
        })
	return sum.toFixed(2);
	};

         $scope.placeOrder = function () {
            $location.path("/order");
        };
	   
});




