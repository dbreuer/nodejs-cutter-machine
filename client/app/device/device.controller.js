//device.controller.js
/**
 * Created by David Breuer on 25/01/2016.
 *
 * @file device.controller.js
 * @description
 *
 */
'use strict';

(function() {

    class DeviceController {

        constructor($http, $scope, socket) {
            this.$http = $http;
            this.awesomeThings = [];
            this.options = {
                totalNumber: 0,
                number: 0,
                arrayNumber: 0,
                isCustom: 0,
                productionArray: [2300, 2500, 10500],
                wheelSize: 500,
                stepValue: 0
            };
            this.process = [];
            this.output = {
                motor1: 0,
                motor2: 0,
                motor3: 0,
                isEmpty: false,
                bladeHeat: 80
            };
            this.inProgress = false;
            this.delay = 1000;

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
                this.options.stepValue = this.getStepValue();
                this.process.push({"name": "Setting", "type": "info", "key": "getStepValue"});
                //step1
                this.stepProcess();
                this.inProgress = false;
            }
        }

        stepProcess() {
            var o = this.output,
                opt = this.options,
                stepper = this.stepper,
                delay=this.delay;



            if (this.options.totalNumber > this.options.number) {
                if (this.options.arrayNumber >= this.options.productionArray.length) {
                    this.options.arrayNumber = 0;
                }

                o.motor1 = 180;
                console.log('step0');

                this.stepper(o.motor3, 1);
                console.log('step1');
                this.stepper(o.motor1, 360);
                console.log('step2');

                this.stepper(o.motor2, opt.productionArray[opt.arrayNumber]/o.stepValue);
                this.stepper(o.motor3, opt.productionArray[opt.arrayNumber]/o.stepValue);
                console.log('step3');


                opt.number++;
                opt.arrayNumber++;
            }

        }

        stepper(model, value) {
            $timeout( function(){
                return (model + value);
            }, 1500);

        }

        getStepValue() {
            if (this.options.wheelSize) {
                return this.options.wheelSize*Math.PI/360;
            }

        }


        deleteThing(thing) {
            this.$http.delete('/api/things/' + thing._id);
        }

    }

    angular.module('faszaVagogepApp')
        .controller('DeviceController', DeviceController);

})();
