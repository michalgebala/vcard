/**
 * Created by Michał on 2016-08-18.
 */
vcardApp.controller('PaintController', ['$scope', function ($scope) {
    $scope.colors = ['black','blue', 'red', 'yellow', 'green'];
    $scope.brushSizes = [1,2,3,4,5];
    $scope.selectedColor = null;
    $scope.selectedBrushSize = null

    //######### CANVAS
    // create a wrapper around native canvas element (with id="c")
    var canvas = document.__canvas = new fabric.Canvas('paint');

    $scope.paintRect = function () {
        canvas.isDrawingMode = false;
        var rect = new fabric.Rect({
            left: 100,
            top: 100,
            fill: $scope.selectedColor||'black',
            width: 30,
            height: 30
        });

// "add" rectangle onto canvas
        canvas.add(rect);

    };


    $scope.paintCircle = function () {
        canvas.isDrawingMode = false;
        var circle = new fabric.Circle({
            left: 100,
            top: 100,
            fill: $scope.selectedColor||'black',
            radius: 30
        });
        canvas.add(circle);
    };

    $scope.paintTriangle = function () {
        canvas.isDrawingMode = false;
        var triangle = new fabric.Triangle({
            left: 100,
            top: 100,
            fill: $scope.selectedColor||'black',
            width: 30,
            height: 30
        });
        canvas.add(triangle);
    };

    $scope.selectColor=function(color){
        canvas.freeDrawingBrush.color = color;
        $scope.selectedColor = color;
    };

    $scope.selectBrushSize=function(size){

        $scope.selectedBrushSize = size;
         canvas.freeDrawingBrush.width = size;

    };

    $scope.paintFreeDrawing = function () {
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush.color = $scope.selectedColor||'black';
        canvas.freeDrawingBrush.width = $scope.selectedBrushSize||1;
    };


}]);
