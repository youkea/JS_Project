var pizzaPortal = angular.module('pizzaPortal', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('main', {
            url: '/main',
            templateUrl: 'main.html',
            controller: 'mainCtrl'
        })
        .state('order', {
            url: '/order',
            templateUrl: 'order.html',
            controller: 'orderCtrl'
        })
        .state('status', {
            url: '/status/:id',
            templateUrl: 'status.html',
            controller: 'statusCtrl'
        })
 	.state('contact', {
            url: '/contact',
            templateUrl: 'contact.html',
            controller: 'contactCtrl'
        });
	$urlRouterProvider.otherwise('/');
});

 pizzaPortal.factory('orders', function() {
        var orders = [];
        return orders;
    });

