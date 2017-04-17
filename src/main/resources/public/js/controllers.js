'use strict';


app.controller('PregnantCtrl', function($scope, $interval, pregnantService) {
	$scope.hoursAgo = 5;
	$scope.pregnants = pregnantService.getAllPregnants(function(data){
		if (data.length ===1) {
			$scope.pregnant = data[0];
			$scope.transformContractions($scope.pregnant);

		}
	});
	$scope.setPregnant = function(p) {
		$scope.pregnant = p;
		pregnantService.getPregnant({"pregnantId":$scope.pregnant.id}, function(data) {
			$scope.pregnant =  data;
			$scope.getFrequencies();
			$scope.transformContractions($scope.pregnant);

		});
	}
	$scope.pregnant = {};
	$scope.currentContraction = {};
	$scope.freqs = [];
	$scope.startContraction = function(delay){
		if (delay === undefined) {
			delay = 0;
		}
		$scope.currentContraction = {};
		var d = new Date();
		d = new Date(d.getTime() - delay*1000);
		$scope.currentContraction = {start:d};		
		$scope.count();
		$scope.lastStart = d;
		$scope.countLastFreq();
		$scope.stopCountLastFreq();
	}

	$scope.transformContractions = function(pregnant) {
		var cToKeep = [];

		for (var i =0; i < pregnant.contractions.length; i++) {
			pregnant.contractions[i].start = new Date(pregnant.contractions[i].start);
			pregnant.contractions[i].finish = new Date(pregnant.contractions[i].finish);

			if (Math.ceil(Math.abs(pregnant.contractions[i].start.getTime() - (new Date()).getTime())/1000) < $scope.hoursAgo *3600) {
				cToKeep.push(pregnant.contractions[i]);

			}
		}
		pregnant.contractions = cToKeep;

		pregnant.contractions.sort(function (a,b) {
			  return new Date(b.finish) - new Date(a.finish);
		});
		
		for (var i=0;i<pregnant.contractions.length-1;i++) {
			var s  = new Date($scope.pregnant.contractions[i].start);
			var f =  new Date($scope.pregnant.contractions[i+1].start);
			
			pregnant.contractions[i].frequency = $scope.getDiffInFormat(s, f, true);

		}
		if (pregnant.contractions.length >0) {
			var lastContraction = pregnant.contractions[0];
			$scope.lastStart = lastContraction.start;
			$scope.countLastFreq();
		}
		$scope.pregnant = pregnant;

	}
	$scope.stopContraction = function(delay){
		if (delay === undefined) {
			delay = 0;
		}
		var d = new Date();
		d = new Date(d.getTime() - delay*1000);
		$scope.currentContraction.finish = d;
		pregnantService.addContraction({"pregnantId":$scope.pregnant.id}, 
			$scope.currentContraction, function(data) {
						$scope.pregnant =  data;
						$scope.getFrequencies();
						$scope.transformContractions($scope.pregnant);
			
		});
		$scope.currentContraction = {};
		$scope.stopCount();
		$scope.countLastFreq();
	}
	$scope.getFrequencies = function () {
		var freqs = [];
		if ($scope.pregnant.contractions.length >2 ) {
			for (var i = 1; i < $scope.pregnant.contractions.length; i++) {
				var s  = new Date($scope.pregnant.contractions[i].start);
				var f =  new Date($scope.pregnant.contractions[i-1].start);

				var f = Math.ceil(Math.abs(s.getTime() - f.getTime())/1000);
				freqs.push(f);
			}

		}

		$scope.freqs = freqs;
		return freqs;

	}
	$scope.getDuration = function(start,finish) {
		start = new Date(start);
		finish = new Date(finish);
		
		return $scope.getDiffInFormat(start, finish, false);

	}

	$scope.getDiffInFormat = function(s, f, withHours) {
		var diff = Math.ceil(Math.abs(s.getTime() - f.getTime())/1000);
		var date = new Date(null);
		date.setSeconds(diff); 
		var result;
		if (withHours) {
			result = date.toISOString().substr(11, 8);
		} else {
			result = date.toISOString().substr(14, 5);
		}

		return result;
	}

	var stopFreq;
	$scope.countLastFreq = function() {
		 // Don't start a new fight if we are already fighting
          if ( angular.isDefined(stopFreq) ) return;

          stopFreq = $interval(function() {


            $scope.timeLapsedSinceLastFreq = $scope.getDiffInFormat(new Date(), $scope.lastStart, true);
          }, 100);
	}



	var stop;
        $scope.count = function() {
          // Don't start a new fight if we are already fighting
          if ( angular.isDefined(stop) ) return;

          stop = $interval(function() {
            
            $scope.timeLapsed = $scope.getDiffInFormat(new Date(), $scope.currentContraction.start, false);
          }, 100);
        };
	$scope.stopCount = function() {
          if (angular.isDefined(stop)) {
            $interval.cancel(stop);
            stop = undefined;
          }
          $scope.timeLapsed = undefined;
        };
	$scope.stopCountLastFreq = function() {
          if (angular.isDefined(stopFreq)) {
            $interval.cancel(stopFreq);
            stopFreq = undefined;
          }
         // $scope.timeLapsedSinceLastFreq = undefined;
        };
          $scope.$on('$destroy', function() {
          // Make sure that the interval is destroyed too
          $scope.stopCount();
          $scope.stopCountLastFreq();
        });
	$scope.getContractionLevel = function(c) {
          	var duration = $scope.getDuration(c.start, c.finish);
          	var frequency = c.frequency;
          	if ( frequency<=(3*60) && duration >=60 && duration <=90) {
          		return "bg-danger";
          	}
          	if (frequency<=(5*60) && duration >=50 && duration <=70) {
          		return "bg-warning";
          	}
          	if (frequency >=(4*60) && frequency<=(6*60) && duration >=25 && duration <=50) {
          		return "bg-success";
          	}
          	if (frequency >=(15*60) && frequency<=(21*60) && duration >=25 && duration <=50) {
          		return "bg-primary";
          	}
          	return "bg-success";
          }

});
/*
angular.module('contractionsFeApp')
  .controller('PregnantCtrl', ['$scope', 'pregnantService', function ($scope, pregnantService) {
  
  }]);
*/