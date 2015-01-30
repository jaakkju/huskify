var huskify = angular.module('huskify', ['ngRoute', 'LocalStorageModule', 'pascalprecht.translate', 'ngDialog', 'ui.sortable', 'huskifyControllers']);

huskify.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
   $routeProvider
     .when("/organizer", {
         templateUrl: 'organizer.html',
         controller: 'mainController'
     }) 
     .when("/print", {
         templateUrl: 'print.html',
         controller: 'printController'
     }).     
      otherwise({
        redirectTo: '/organizer'
      });
  }
]);


huskify.config(function($translateProvider) {

  $translateProvider.translations('en', {
    NAV_ABOUT: 'ABOUT',
    HEADLINE_DOG: 'DOGS',
    HEADLINE_SELECTED: 'SELECT A SLEDGE',
    HEADLINE_SLEDGE: 'SLEDGES',
    FORM_DOG: 'Add a dog',
    FORM_SLEDGE: 'Add a sledge',
    BTN_PRINT: 'Print',
    BTN_ORGANIZE: 'Organize'
  })

  .translations('fi', {
    NAV_ABOUT: 'INFO',
    HEADLINE_DOG: 'KOIRAT',
    HEADLINE_SELECTED: 'VALITSE VALJAKKO',
    HEADLINE_SLEDGE: 'VALJAKOT',
    FORM_DOG: 'Lisää koira',
    FORM_SLEDGE: 'Lisää valjakko',
    BTN_PRINT: 'Tulosta',
    BTN_ORGANIZE: 'Järjestä'
  })
  .determinePreferredLanguage()
  .fallbackLanguage('en');

});

huskify.filter('hasDogs', function () {
  return function (items) {
    return items.filter(function(item) {
      return item.dogs.length > 0;
    });
  };
});

huskify.factory('Shared', function (localStorageService) {
   return {
     dogs: localStorageService.get('dogs') || [],
     sledges: localStorageService.get('sledges') || [],
     selectedIdx: localStorageService.get('selectedIdx')
   };
});