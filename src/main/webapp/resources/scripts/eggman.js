/*
 *   Initializes a new instance of the Eggman class.
 */
function Eggman(coordinate) {
    GameObject.call(this, coordinate);
    this.onScreen = false;
    this.speed = 2;
    this.width = 20;
    this.height = 20;
}

/*
 *   Inherits GameObject
 */
Eggman.prototype = new GameObject();

/*
 *   Corrects the constructor pointer.
 */
Eggman.prototype.constructor = Eggman;

/*
 *   Prints the properties of eggman.
 */
Eggman.prototype.toString = function () {
    var result = "Eggman:\n" + GameObject.prototype.toString.call(this);
    return result;
};

// Moves eggman with own speed
Eggman.prototype.Move = function () {
    this.position.x += this.speed;
    this.position.y += 0;
};

Eggman.prototype.MoveTo = function (coordinate) {
    this.position = coordinate;
};

Eggman.prototype.Hide = function () {
    this.onScreen = false;
};
