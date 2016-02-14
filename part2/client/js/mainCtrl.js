angular.module('pizzaPortal').controller('mainCtrl', function(orders, $location, $scope, $http, ngDialog) {
        $scope.getMenu = function () {
		$http.get('/menu').success(function (response) {
		$scope.menuResponse = response;
		}).then(function(data){
                for(var i=0;i<$scope.menuResponse.length;i++){
                      $scope.menuResponse[i].names=[];  
                }
           
            $scope.getIngredients();
             $scope.menuResponse =  $scope.group();
                });
        }; 
    
    $scope.total = function () {
            var total = 0;
      
            for (var i=0; i < $scope.orders.length; i++) {
                var price = $scope.orders[i].price;
                total += price; 
            }
            return total.toFixed(2);
        };
	   
	
   // $scope.menuResponse.names = [];
    $scope.getIngredients = function () {
		$http.get('/ingredients').success(function (response) {
		$scope.ingredientsResponse = response;
            
		}).then(function(){
            
             for(var i=0;i<$scope.menuResponse.length;i++){
                 for(var j=0;j<$scope.menuResponse[i].ingredients.length;j++){
                    var index = $scope.menuResponse[i].ingredients[j];
                     for(var k=0;k<$scope.ingredientsResponse.length;k++){
                          if($scope.ingredientsResponse[k].id==j){
                                $scope.menuResponse[i].names.push($scope.ingredientsResponse[k].label);
                            }   
                     }
                 }
                 
               
        }
            console.log('sf');
        }); 
	   
	};
    
    $scope.convert  = function(idd){
        for(var i=0;i<$scope.ingredientsResponse.length;i++){
            if($scope.ingredientsResponse[i].id==idd){
                return $scope.ingredientsResponse[i].label;
            }
        }
    }


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
         order.ingredients = itemMenu.names;
         $scope.actualOrder = order;
         $scope.openPopup();
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
    
    $scope.extraIngredients = [];
        $scope.extraCost = 0;
        
        $scope.actualOrder = {};
    
     $scope.openPopup = function () {
            var dialog = ngDialog.open({ 
                template: 'popup.html',
                scope: $scope
            });
            
            dialog.closePromise.then( function () {
                index = $scope.currentIndex-1;

                $scope.orders[index].extraIngredients = $scope.extraIngredients;
                $scope.extraIngredients = [];
            });
        };
	   
    $scope.extraIngredients = [];
    $scope.extraCost = 0;
   
    
    $scope.addIngredient = function (ingredient) {
            $scope.extraCost += ingredient.price;
            $scope.extraIngredients.push(ingredient);
            $scope.calculateExtraPrice(ingredient);
        };
    
    $scope.deleteExtraIngr= function (ingredient) {
            var index = $scope.extraIngredients.indexOf(ingredient);
            ingredient.price = -Math.abs(ingredient.price);
            $scope.calculateExtraPrice(ingredient);
            $scope.extraIngredients.splice(index, 1);
            ingredient.price = Math.abs(ingredient.price);
        };
        
        $scope.calculateExtraPrice = function (ingredient) {
            $scope.actualOrder.price += ingredient.price;
        };
    

    
        $scope.deleteBaseIngr = function (ingredient) {
            var ingredients = $scope.actualOrder.ingredients;
            var index = ingredients.indexOf(ingredient);
            ingredients.splice(index, 1);
        };
    
     $scope.group = function () {
         var theBiggest = 0;
           for(var i=0;i<$scope.menuResponse.length;i++){
                 var j = $scope.menuResponse[i].ingredients.length;
                     if(j>theBiggest){
                         theBiggest = j;
                     }
                     
                 }
           
         $scope.groupPizza = [];
         for(var i=1; i<=theBiggest; i++){
             for(var j=0;j<$scope.menuResponse.length;j++){
                 var k = $scope.menuResponse[j].ingredients.length;
                 if(i == k){
                     $scope.groupPizza.push($scope.menuResponse[j]);
                 }
            
             }
         }
         return $scope.groupPizza;
     };
});




