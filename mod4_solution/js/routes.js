(function(){
	'use strict'; 

	angular.module("MenuApp")
	.config(RoutesConfig);

	RoutesConfig.$inject = ['$stateProvider',
	 '$urlRouterProvider'];



	function RoutesConfig($stateProvider, $urlRouterProvider){
  		// Redirect to home page if no other URL matches 
  		$urlRouterProvider.otherwise('/');



  		$stateProvider

      // State for home 
  		.state('home', {
  			url: '/', 
  			templateUrl: "/home.template.html"
  		})


      // State for categories 
  		.state('categories', {
  			url: '/categories', 
  			templateUrl: "/js/categories/categories.template.html",
        controller: "CategoryController as categoryList", 
        resolve : {
          items : ['MenuDataService', function(MenuDataService){
            // Menudata service returns a promise 
            // page is rendered only if the promise is resolved 
            // items is then passed into the controller 
            // in controller we set categoryList.items = items; 

            return MenuDataService.getAllCategories(); 
          }]
        }
      })


      .state('items', {
        url : '/items/{itemId}', 
        templateUrl: '/js/items/items.template.html', 
        controller: "ItemDetailController as itemDetail", 
      resolve: {
          items: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory($stateParams.itemId)
                .then(function (items) {
                  console.log($stateParams.itemId); 
                  return items.data.menu_items;
                });
            }]
    }
      }); 

	}	

})(); 