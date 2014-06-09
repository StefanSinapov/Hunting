function Blaze(coordinate) {
    console.log("Blaze constructor.")
    GameObject.call(this, coordinate);

}

Blaze.prototype = new GameObject();

Blaze.prototype.constructor = Blaze;

Blaze.prototype.toString = function () {
    var result = "Blaze:\n" + GameObject.prototype.toString.call(this);
    return result;
}


Blaze.prototype.update = function (x, y) {

    var line1 = new Kinetic.Line({
        points: [50, 50, 50, 100],
        stroke: 'red',
        strokeWidth: 2,
        lineJoin: 'round'
    });

    var line2 = new Kinetic.Line({
        points: [50, 50, 0, 50],
        stroke: 'red',
        strokeWidth: 2,
        lineJoin: 'round'
    });

    var line3 = new Kinetic.Line({
        points: [50, 50, 50, 0],
        stroke: 'red',
        strokeWidth: 2,
        lineJoin: 'round'
    });

    var line4 = new Kinetic.Line({
        points: [50, 50, 100, 50],
        stroke: 'red',
        strokeWidth: 2,
        lineJoin: 'round'
    });


    line1.move({x:x, y:y});
    line2.move({x:x, y:y});
    line3.move({x:x, y:y});
    line4.move({x:x, y:y});

    this.layer.add(line1);
    this.layer.add(line1);
    this.layer.add(line1);
    this.layer.add(line1);
}