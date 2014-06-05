function Controller(renderer, blaze) {
    var s = renderer.stage;

    s.on("click", function () {

        var mousePos = s.getPointerPosition();
        var x = mousePos.x;
        var y = mousePos.y;
        var coordinate = new Coordinate(x, y);

        console.log("Click " + coordinate.toString());
    })

    s.on("mousemove", function () {

        var mousePos = s.getPointerPosition();
        var x = mousePos.x;
        var y = mousePos.y;
        var coordinate = new Coordinate(x, y);

        console.log("Mouse move " + coordinate.toString());
    })
}


Controller.prototype.getMouseCoordinates = function () {
    // var mousePosition = this.getMouseCoordinates();
    // var x = mousePosition.x;
    // var y = mousePosition.y;
    // var position = new Coordinate(x,y);
    // return position;
}
