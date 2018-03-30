(function(){
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService); 


  // Injecting to protect from minification 
  ToBuyController.$inject = ['$scope', 
  'ShoppingListCheckOffService']; 
  AlreadyBoughtController.$inject = ['$scope',
  'ShoppingListCheckOffService']; 


  function ToBuyController($scope, 
    ShoppingListCheckOffService){
    var buyList = this;

    buyList.items = ShoppingListCheckOffService.getBuyItems();
    console.log(buyList.items); 


    buyList.buyItem = function(itemIndex){
      ShoppingListCheckOffService.buyItem(itemIndex); 
    }

  }


  function AlreadyBoughtController($scope, 
    ShoppingListCheckOffService){
    var boughtList = this;

    boughtList.items = ShoppingListCheckOffService.getBoughtItems();
    console.log(boughtList.items); 

  }


  function ShoppingListCheckOffService(){
    // Keep track of buy and bought items at the same time 
    var service = this; 

    var buy_items = [
      { name: "cookies", quantity: 10 }, 
      { name: "colas", quantity: 2 },
      { name: "chocolates", quantity: 9 },
      { name: "juices", quantity: 5 },
      { name: "apples", quantity: 6 }
    ]; 

    var bought_items = []; 



    service.buyItem = function(itemIndex){
      // Remove from buy and put it in bought 
      var item = buy_items[itemIndex]; 
      buy_items.splice(itemIndex, 1); 
      bought_items.push(item); 
    }; 

    // Expose buy_items array 
    service.getBuyItems = function(){
      return buy_items; 
    }; 

    // Expose bought_items array 
    service.getBoughtItems = function(){
      return bought_items; 
    }; 
  }

})();
