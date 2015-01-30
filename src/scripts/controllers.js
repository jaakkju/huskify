var huskifyControllers = angular.module('huskifyControllers', []);

huskifyControllers.controller('mainController', function ($scope, $window, $location, Shared, localStorageService) {

  $scope.$on('$viewContentLoaded', function(event) {
    $window.ga('send', 'pageview', { page: $location.path() });
  });

  $scope.selected = null;

  $scope.unbindDogs = localStorageService.bind($scope, 'dogs');
  $scope.unbindSledges = localStorageService.bind($scope, 'sledges');
  $scope.unbindSelectedIdx = localStorageService.bind($scope, 'selectedIdx');
   
  $scope.dogs = Shared.dogs;
  $scope.sledges = Shared.sledges;
  $scope.selectedIdx = Shared.selectedIdx;

  if($scope.selectedIdx && $scope.sledges[$scope.selectedIdx]) {
    $scope.selected = $scope.sledges[$scope.selectedIdx];
  }
  
  $scope.createDog = function() {
        if ($scope.dog) {
          $scope.dogs.push({'name': this.dog, 'leader': false});
          $window.ga('send', 'event', 'create', 'dog', this.dog);
          $scope.dog = '';
        }
   };

  $scope.removeDog = function(dog, idx) {
      $window.ga('send', 'event', 'remove', 'dog', dog.name);
      $scope.dogs.splice(idx, 1);
   };

  $scope.clickDog = function(dog, idx) {
      if($scope.selected) {
        $scope.selected.dogs.push(dog);
        $scope.dogs.splice(idx, 1);
        $window.ga('send', 'event', 'click', 'dog', dog.name, idx);
      } else {
        console.log('Warning! Tried to insert dog into a sledge when sledge is not selected');
      }
   };

  $scope.toggleLeader = function(dog, idx) {
    $window.ga('send', 'event', 'click', 'toggleLeader', dog.name, idx);
    dog.leader = dog.leader ? false : true;
   };   

  $scope.clickSelected = function(dog, idx) {
    $scope.dogs.push(dog);
    $scope.selected.dogs.splice(idx, 1);
    $window.ga('send', 'event', 'click', 'selected', dog.name, idx);
   };


  $scope.createSledge = function() {
      if ($scope.sledge) {
        $scope.sledges.push({'sledge': this.sledge, dogs: []});
        $window.ga('send', 'event', 'create', 'sledge', this.sledge);
        $scope.sledge = '';
      }
   };   

  $scope.removeSledge = function(sledge, idx) {
      $scope.sledges.splice(idx, 1);
      $window.ga('send', 'event', 'remove', 'sledge', sledge.name);

      if($scope.selectedIdx === idx) {
        $scope.selected = null;
        $scope.selectedIdx = null;
      }
   };

    $scope.clickSledge = function(sledge, idx) {
      $scope.selected = $scope.sledges[idx];
      $scope.selectedIdx = idx;
      $window.ga('send', 'event', 'click', 'sledge', sledge.name, idx);
    };
  });

huskifyControllers.controller('printController', function($scope, $window, $location, Shared, localStorageService) {
  $scope.sledges = Shared.sledges;

  $scope.$on('$viewContentLoaded', function(event) {
    $window.ga('send', 'pageview', { page: $location.path() });
  });   
});

huskifyControllers.controller('aboutController', function($scope, $window) {
  $window.ga('send', 'pageview', '/about');
  $scope.year = new Date().getFullYear();
});