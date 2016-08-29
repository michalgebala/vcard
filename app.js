'use strict';
var vcardApp = angular.module('vcard', ['ngSanitize']);
vcardApp.controller('VcardController', ['$scope','$timeout', '$sce', '$http', function ($scope, $timeout, $sce, $http) {
    $scope.mainact = function () {
        console.log('right click event');
    };

    var triggerKeyDown = function (element, keyCode) {
        var e = angular.element.event('keydown');

        e.which = keyCode;
        element.trigger(e);
    };
    $scope.linksUrl = 'http://demotywatory.pl/page/1';
    // $scope.linksUrl= 'http://www.refsnesdata.no/angular_include.asp';

    // $http.get('http://demotywatory.pl/page/1')
    //     .then(function (data) {
    //         $scope.contentDemotywatory = $sce.trustAsHtml(data.data.PageData);
    //         console.log('demotywatoryContent: ',$scope.contentDemotywatory);
    //     });
    $scope.startSplashVisible = true;
    $scope.showStartMenu = false;
    $scope.showReadMe = false;
    $scope.showLinks = false;
    $scope.showClosePage = false;
    $scope.showPaint = false;

    $scope.showingClosePage = function (elm, value) {
        $scope.showClosePage = value;
        $scope.showStartMenu = false;
        if( (screen.availHeight || screen.height-30) <= window.innerHeight) {

            triggerKeyDown(elm, 122);
        }

    };

    $scope.showingReadMe = function (value) {
        $scope.showReadMe = value;
    };

    $scope.showingPaint = function (value) {
        $scope.showPaint = value;
        $scope.showStartMenu = false;
    };
    $scope.sendMail = function () {
        window.location.href = "mailto:michal@gebala.net.pl";
    };

    $scope.showingStartMenu = function () {
        $scope.showStartMenu = !$scope.showStartMenu;
    };
    $scope.showingLinks = function (value) {
        $scope.showLinks = value;
    };

    $scope.clock = "loading"; // initialise the time variable
    $scope.tickInterval = 1000 //ms

    var tick = function() {
        $scope.clock = Date.now() // get the current time
        $timeout(tick, $scope.tickInterval); // reset the timer
    };
    $scope.showSplashScreen = function(){
        $timeout(changeSplashVisibility, 5000);
    };

    var changeSplashVisibility = function(){
        $scope.startSplashVisible = !$scope.startSplashVisible;
    };

    // Start the timer
    $timeout(tick, $scope.tickInterval);



}]);

vcardApp.directive('draggable', function ($document) {
    return function (scope, element, attr) {
        var startX = 0, startY = 0, x = 0, y = 0;
        element.css({
            position: 'relative',
            cursor: 'pointer',
            display: 'block',
        });
        element.on('mousedown', function (event) {
            // Prevent default dragging of selected content
            event.preventDefault();
            startX = event.screenX - x;
            startY = event.screenY - y;
            $document.on('mousemove', mousemove);
            $document.on('mouseup', mouseup);
        });

        function mousemove(event) {
            y = event.screenY - startY;
            x = event.screenX - startX;
            element.css({
                top: y + 'px',
                left: x + 'px'
            });
        }

        function mouseup() {
            $document.off('mousemove', mousemove);
            $document.off('mouseup', mouseup);
        }
    };
});

vcardApp.directive('ngRightClick', function ($parse) {
    return function (scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function (event) {
            scope.$apply(function () {
                event.preventDefault();
                fn(scope, {$event: event});
            });
        });
    };
});
vcardApp.filter('trustUrl', ['$sce', function ($sce) {

    return function (url) {
        // console.log('trustedUrl filter on: ',url);
        return $sce.trustAsResourceUrl(url);
    };
}]);

