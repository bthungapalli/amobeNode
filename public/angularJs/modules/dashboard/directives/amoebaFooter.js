(function(){
	angular.module("amoeba.dashboard").directive('amoebaFooter',function(){
		
		var amoebaFooter={
				restrict:'E',
				templateUrl:'partials/dashboard/footer.html'
			};
		
		return amoebaFooter;
		
	});
})();

