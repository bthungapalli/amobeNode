(function(){
	angular.module("amoeba.dashboard").directive('amoebaHeader', function(){
		
		var amoebaHeader={
				restrict:'E',
				templateUrl:'partials/dashboard/header.html'
			};
		
		return amoebaHeader;
	});
})();

