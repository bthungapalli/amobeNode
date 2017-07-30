(function(){
	
	function location(){
		
		location={
				restrict:'E',
				template:' <input id="register_password" class="form-control" type="text" placeholder="Zip Code" ng-model="loginDetails.zipcode" required>',
				replace:true,
				compile: function(element, attributes){  
				     return {
				             pre: function(scope, element, attributes){

				             },
				             post: function(scope, element, attributes){
				            	
				            	 element.bind('blur',function(){
				            		 geocoder = new google.maps.Geocoder();
				                     var zipcode = scope.$parent.loginDetails.zipcode;
				                     geocoder.geocode({ 'address': zipcode }, function (results, status) {
				                         if (status == google.maps.GeocoderStatus.OK && results[0].address_components.length>=4) {             
				                        	 scope.$parent.clearErrorMessage();
				                        	var locationDetails= results[0].address_components; 
				                        	var location={
				                        			"zipcode":locationDetails[0].long_name,
				                        			"city":locationDetails[1].long_name,
				                        			"state":locationDetails[2].long_name,
				                        			"country":locationDetails[3].long_name,
				                        	};
				                            angular.extend(scope.$parent.loginDetails,location);  
				                         } else {
				                        	 scope.$parent.loginMessageDetails.errorMessage={"zipcode":"Invalid Zipcode"};
				                         }
				                     });
				            		
				            	 });
				             }
				         }
				     }
		}
		
		return location;
	};
	
	location.$inject=[];
	
	angular.module('amoeba.home').directive('location',location);
	
})();



