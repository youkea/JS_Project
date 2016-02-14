angular.module('pizzaPortal').controller('statusCtrl', function($scope, $http, $routeParams) {
	 $scope.orderId = $routeParams.id;
        $scope.getStatus = function () {
            $http.get('/order/' + $scope.orderId).success(function (response) {
                $scope.statusResponse = response;
            }).error(function (data, status) {
                    $scope.orderId = 'Request failed';
                });
    };
    
    
            window.WebSocket = window.WebSocket;
            var connect = new WebSocket('ws://localhost:8080', 'request');
            connect.onopen =  function (event) { 
                var data = new Date();
                var orderData = {
                    type: "Data złożenia zamówienia",
                    date: Date.now()
              };
                connectsend(JSON.stringify(orderData)); 
            };


            connect.addListener("message", function(e) {
                var orderData = e.data;
                document.getElementById('log').innerHTML += '<br>' + orderData;
            });
       

            connect.onmessage = function (message) {
                try {
                    var json = JSON.parse(message.data);

                } catch (e) {
                    console.log('error', message.data);
                    return;
                }
            };

});
        
                     

