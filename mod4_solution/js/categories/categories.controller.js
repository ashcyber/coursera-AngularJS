(function(){
	angular.module("MenuApp")
	.controller('CategoryController', CategoryController);


	CategoryController.$inject = ['MenuDataService', 'items']; 
	function CategoryController(MenuDataService, items){
		var categoryList = this; 
		categoryList.items = items;

	}
})(); 