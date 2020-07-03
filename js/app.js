var typeAhead = angular.module('app', []);

typeAhead.controller('TypeAheadController', function ($scope, dataFactory) {
	dataFactory.get('states.json').then(function (data) {
		$scope.items = data;
	});
	$scope.name = "";
	// Service 
	$scope.onItemSelected = function () {
		$scope.label = $scope.name;
		console.log('selected=' + $scope.name);
	}

	$scope.fetchGoogle = function () {
		$scope.label = $scope.name;
		console.log('selected=' + $scope.name);
	}
});

typeAhead.directive('typeahead', function ($timeout) {
	return {
		restrict: 'AEC',
		scope: {
			items: '=',
			prompt: '@',
			title: '@',
			subtitle: '@',
			model: '=',
			onSelect: '&'
		},
		link: function (scope, elem, attrs) {
			scope.handleSelection = function (selectedItem) {
				scope.model = selectedItem;
				scope.current = 0;
				scope.selected = true;
				$timeout(function () {
					scope.onSelect();
				}, 200);
			};
			scope.computeCssClass = function (data) {
				// return true;
				if (data) {
					return ("pac-logo");
				}
				else {
					return ("");
				}
			}
			scope.current = 0;
			scope.selected = true;
			scope.isCurrent = function (index) {
				return scope.current == index;
			};
			scope.setCurrent = function (index) {
				scope.current = index;
			};
			scope.fetchGoogle = function (input) {
				scope.label = input;
				console.log('selected=' + input);
				// make the service call based on input and get results from places prediction and assign those directly
				// scope.items.push({name: input, abbreviation: input});
			}
		},
		templateUrl: 'templates/templateurl.html'
	}
});

typeAhead.factory('dataFactory', function ($http) {
	return {
		get: function (url) {
			return $http.get(url).then(function (resp) {
				return resp.data;
			});
		}
	};
});