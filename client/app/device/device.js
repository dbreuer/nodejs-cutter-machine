//device.js
/**
 * Created by David Breuer on 25/01/2016.
 *
 * @file device.js
 * @description
 *
 */
'use strict';

angular.module('faszaVagogepApp')
    .config(function($routeProvider) {
        $routeProvider
            .when('/device', {
                templateUrl: 'app/device/device.html',
                controller: 'DeviceController',
                controllerAs: 'device'
            });
    });
