(function(){
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', foundItems);

    function foundItems(){
    var ddo = {
      templateUrl : 'listItem.html',
      scope: {
        items: '<', 
        onRemove: '&'
      }, 
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true 

    }; 
    return ddo;
  } 

  function FoundItemsDirectiveController() {
    var list = this;

    list.emptyList = function(){
      if(list.items == undefined){
        return false; 
      }
      else if(list.items.length === 0){
        return true; 
      }
      else{
        return false; 
      }
    }; 
  }


  NarrowItDownController.$inject = ['MenuSearchService']; 
  function NarrowItDownController(MenuSearchService){
    var menu = this; 
    menu.getMatchedMenuItems = function(searchTerm){
        var promise = MenuSearchService.getMatchedMenuItems(searchTerm);  
        promise.then(function(result){
          menu.found = result; 
        });
    }; 


    menu.removeItem = function(index){
      menu.found.splice(index,1); 
    }; 

  }

  MenuSearchService.$inject = ['$http', '$q']; 
  function MenuSearchService($http, $q){
    var service = this;
    service.getMatchedMenuItems = function(searchTerm){
      var deferred = $q.defer(); 
      
      var response = $http({
        method : "GET", 
        url: ("https://davids-restaurant.herokuapp.com/menu_items.json"),
      })
      .then(function(result){
        // Processing Items with match found 
        var found = result.data.menu_items; 
        var filteredFound = found.filter(function(elem) {
          if(elem.description.indexOf(searchTerm) != -1){
            return true; 
          }
          return false;
        });
        
        deferred.resolve(filteredFound);   

      })

      .catch(function(error){
        deferred.reject(error); 
      })
      return deferred.promise 
    };
  }



})();
