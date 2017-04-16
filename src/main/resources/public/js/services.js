'use strict';
app.factory('pregnantService',[ '$resource', function($resource) {
     return $resource('/api/contractions/', {} , {
		createPregnant 		: {method:'POST',	url:'/api/contractions/', isArray:false},
		getPregnant	 	: {method:'GET', 	url:'/api/contractions/:pregnantId', isArray:false},
		getAllPregnants	 	: {method:'GET', 	url:'/api/contractions', isArray:true},
		addContraction	 	: {method:'POST', 	url:'/api/contractions/:pregnantId'}
     }); 

}]);
