/*
 *   Eggman object. Inherits GameObject.
 */
function Eggman(coordinate) {
    console.log("Eggman constructor");
    GameObject.call(this, coordinate);
    this.onScreen = false;
    this.speed = 2;
    this.width = 20;
    this.height = 20;
}

Eggman.prototype = new GameObject();

Eggman.prototype.constructor = Eggman;

Eggman.prototype.toString = function () {
    var result = "Eggman:\n" + GameObject.prototype.toString.call(this);
    return result;
}

Eggman.prototype.Move = function () {
    this.position.x += this.speed;
    this.position.y += 0;
}

Eggman.prototype.MoveTo = function (coordinate) {
    this.position = coordinate;
}

Eggman.prototype.Hide = function () {
    this.onScreen = false;
}
