function Controller(stage) {

    var mousePosition;
    var mouseClick;

    stage.on("click", function () {
        var mousePos = stage.getPointerPosition();
        mouseClick = new Coordinate(mousePos.x, mousePos.y);
        //console.log("Click " + this.mouseClick.toString());
    });

    stage.on("mousemove", function () {
        var mousePos = stage.getPointerPosition();
        mousePosition = new Coordinate(mousePos.x, mousePos.y);
        // console.log("Mouse move " + this.mousePosition.toString());
    });


    this.getMousePosition = function () {
        return mousePosition;
    };

    this.getMouseClick = function () {
        return mouseClick;
    };
}