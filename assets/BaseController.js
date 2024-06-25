app.controller('BaseController', function($rootScope, $scope, $http, $controller) {
    angular.extend(this, $controller('FavoritosController', {$rootScope: $rootScope, $scope: $scope, $http: $http}));

});
