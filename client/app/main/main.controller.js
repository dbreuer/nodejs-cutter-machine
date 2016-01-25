'use strict';

(function() {

class MainController {
    
  constructor($http, $scope, socket) {
    var vm = this;
    vm.$http = $http;
    vm.awesomeThings = [];
    vm.options = {
      totalNumber: 12,
      number: 0,
      arrayNumber: 0,
      isCustom: 0,
      productionArray: [2300, 2500, 10500],
      wheelSize: 500,
      stepValue: 0
    };
    vm.process = [];
    this.output = {
      motor1: 0,
      motor2: 0,
      motor3: 0,
      isEmpty: false,
      bladeHeat: 80
    };
    vm.inProgress = false;
    vm.delay = 1000;
    vm.query = [];
    //$http.get('/api/things').then(response => {
    //  this.awesomeThings = response.data;
    //  socket.syncUpdates('thing', this.awesomeThings);
    //});
    //
    //$scope.$on('$destroy', function() {
    //  socket.unsyncUpdates('thing');
    //});
  }

    init() {

    if (this.options) {
      this.inProgress = true;
      this.process = [];
      //settings
      this.getStepValue();
      this.process.push({"name": "Setting", "type": "info", "key": "getStepValue"});
      //step1
      this.stepProcess();
        this.inProgress = false;
    }
  }

    stepProcess() {
        console.log("step start");
    if (this.options.totalNumber > this.options.number) {
      if (this.options.arrayNumber === this.options.productionArray.length-1) {
        this.options.arrayNumber = -1;
      }

        this.output.motor1 = 182;

        this.stepperAddProcess('motor3', 1);
        this.stepperAddProcess('motor1', 360);
        this.stepperAddProcess('motor2', this.options.productionArray[this.options.arrayNumber]/this.options.stepValue);
        this.stepperAddProcess('motor3', this.options.productionArray[this.options.arrayNumber]/this.options.stepValue);
        //
        console.log("end progress");

        this.options.number++;
        this.options.arrayNumber++;
        console.log("step end");
    }

  }

    stepperAddProcess(model, value) {
        this.process.push({"name": "Add query", "type": "warning", "key": model});
        this.output[model] = value;
        var pc = pausecomp(1500);
    }

    getStepValue() {
        if (this.options.wheelSize) {
            this.options.stepValue = this.options.wheelSize*Math.PI/360;
        }

    }

    deleteThing(thing) {
        this.$http.delete('/api/things/' + thing._id);
  }

}

    function pausecomp(ms) {
        ms += new Date().getTime();
        while (new Date() < ms){}
    }

    angular.module('faszaVagogepApp')
  .controller('MainController', MainController);

})();
