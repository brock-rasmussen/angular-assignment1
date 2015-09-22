/*(function(){
	var app = angular.module('usReps',[]);
	
	app.controller('MainCtrl', function() {
		
	});
	
})();*/





angular.module('usReps', [
	'usRepsCtrls'
]);

angular
	.module('usRepsCtrls', [
		'usRepsService'
	])
	.controller('MainCtrl', function (reps) {
		var main = this;
		main.reps = [];
	
		main.searchByZip = function (zip) {
			reps.allByZip(zip).then(function (data) {
				main.reps = data;
			});
		};
	
		main.searchRepsByName = function (name) {
			reps.repsByName(name).then(function (data) {
				main.reps = data;
			});
		};
	
		main.searchRepsByState = function (state) {
			reps.repsByState(state).then(function (data) {
				main.reps = data;
			});
		};
	
		main.searchSensByName = function (name) {
			reps.sensByName(name).then(function (data) {
				main.reps = data;
			});
		};
	
		main.searchSensByState = function (state) {
			reps.sensByState(state).then(function (data) {
				main.reps = data;
			});
		};
	});

angular
	.module('usRepsService', [])
	.factory('reps', function ($http) {
		var host = 'http://dgm-representatives.herokuapp.com/';
		return {
			allByZip: function (zip) {
				return $http
					.get(host + 'all/by-zip/' + zip)
					.then(function (response) {
						return response.data;
					});
			},
			repsByName: function (name) {
				return $http
					.get(host + 'reps/by-name/' + name)
					.then(function (response) {
						return response.data;
					});
			},
			repsByState: function (state) {
				return $http
					.get(host + 'reps/by-state/' + state)
					.then(function (response) {
						return response.data;
					});
			},
			sensByName: function (name) {
				return $http
					.get(host + 'sens/by-name/' + name)
					.then(function (response) {
						return response.data;
					});
			},
			sensByState: function (state) {
				return $http
					.get(host + 'sens/by-state/' + state)
					.then(function (response) {
						return response.data;
					});
			}
		};
	});