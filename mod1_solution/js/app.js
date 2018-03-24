(function(){

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);
  function LunchCheckController($scope){



    $scope.lunchBtn = function(){
      // Clear Previous Data
      $scope.result = "";

      // Fetch Items
      var items = $scope.lunch;
      // If Data item is entered
      if(items){
        // Input Length Find
        var items_length = items.split(',').length;

        // Conditions
        if(items_length <= 3){
          $scope.result = 'Enjoy!';
        }else{
          $scope.result = 'Too much!';
        }
        $scope.colorValue = "green";
        $scope.borderValue = "border: 1px solid green" ;
        $scope.lunch = "";
      }
      // No data is entered
      else{
        $scope.result = "Please enter data first";
        $scope.colorValue = "red";
        $scope.borderValue = "border: 1px solid red"   ;
        $scope.lunch ="";
      }


    }
  };



})();
