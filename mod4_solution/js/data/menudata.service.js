(function(){
	'use strict'

	angular.module('data')
	.service('MenuDataService', MenuDataService)
	.constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com'); 



	MenuDataService.$inject = ['$q', '$http' , 'ApiBasePath']; 

	function MenuDataService($q, $http, ApiBasePath){
		var service = this; 

		// Service function to get all categories
		service.getAllCategories = function(){
			var deferred = $q.defer(); 

			var response = $http({
				method : "GET", 
				url : (ApiBasePath + "/categories.json")
			})

			.then(function(result){
				deferred.resolve(result); 
			})

			.catch(function(error){
				deferred.reject(error); 
			})

			return deferred.promise; 
		};


		// Service function to get all Items 
		// param : category_name
		service.getItemsForCategory = function(category_name){
			var deferred = $q.defer(); 

			var response = $http({
				method : "GET", 
				url : (ApiBasePath + "/menu_items.json"), 
				params : {
					"category" : category_name
				}
			})

			.then(function(result){
				deferred.resolve(result); 
			})

			.catch(function(eror){
				deferred.reject(error); 
			})

			return deferred.promise; 
		};
	}

})(); 