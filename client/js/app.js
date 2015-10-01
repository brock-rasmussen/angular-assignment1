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
		main.congressType = 'reps'; // or sens
	
		main.loading = false;
	
		main.apis = [
			{
				label: 'Zip',
				method: function (zip) {
					main.loading = true;
					reps('all', 'zip', zip).then(function (data) {
						main.loading = false;
						main.reps = data;
					});
				}
			},
			{
				label: 'Last Name',
				method: function (name) {
					main.loading = true;
					reps(main.congressType, 'name', name).then(function (data) {
						main.loading = false;
						main.reps = data;
					});
				}
			},
			{
				label: 'State',
				method: function (state) {
					main.loading = true;
					reps(main.congressType, 'state', state).then(function (data) {
						main.loading = false;
						main.reps = data;
					});
				}
			}
		];
		main.criteria = main.apis[0];
	});

angular
	.module('usRepsService', [])
	.factory('reps', function ($http) {
		/**
		 * @function search
		 * @param {string} type - "all", "reps", or "sens"
		 * @param {string} criteria - "zip", "name" or "state"
		 * @param {string} query - any string
		 */
		function search(type, criteria, query) {
			return $http
				.get('http://dgm-representatives.herokuapp.com/' + type + '/by-' + criteria + '/' + query)
				.then(function (response) {
					return response.data;
				});
		}
		
		return search;
	});