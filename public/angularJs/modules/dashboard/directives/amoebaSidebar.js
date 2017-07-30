(function(){
	angular.module("amoeba.dashboard").directive('amoebaSidebar',function(){
		
		var amoebaSidebar={
				restrict:'E',
				templateUrl:'partials/dashboard/sidebar.html'
			};
		
		return amoebaSidebar;
	});
})();

