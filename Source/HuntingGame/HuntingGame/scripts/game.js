function Game(height, width) {
    console.log("Game constructor.");

    this.width = width;
    this.height = height;

    this.stage = new Kinetic.Stage({
        container: 'container',
        width: width,
        height: height
    });
}


Game.prototype.start = function () {

    var blazeInitialCoordinate = new Coordinate(this.width / 2, this.width / 2);
    var blaze = new Blaze(blazeInitialCoordinate);

    var controller = new Controller(this.stage);

    this.drawBackground();
    var layer = new Kinetic.Layer();

    var hexagon = new Kinetic.RegularPolygon({
        x: this.width / 2,
        y: this.height / 2,
        sides: 6,
        radius: 70,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 4
    });

    var width = this.width / 2;
    var amplitude = 150;
    var period = 2000;

    layer.add(hexagon);
    this.stage.add(layer);

    var anim = new Kinetic.Animation(function (frame) {
        blaze.position = controller.getMousePosition();
        hexagon.setX(amplitude * Math.sin(frame.time * 2 * Math.PI / period) + width);
    }, layer);

    anim.start();
};


Game.prototype.drawBackground = function () {
    var layer = new Kinetic.Layer();
    var rect = new Kinetic.Rect({
        x: 0,
        y: 0,
        width: this.width,
        height: this.height,
        fill: 'blue'
    });

    layer.add(rect);
    this.stage.add(layer);
}

