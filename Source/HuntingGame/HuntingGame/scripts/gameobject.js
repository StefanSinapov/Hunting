/*
 *   Initializes  a new instance of the GameObject class.
 */
function GameObject(coordinate) {
    this.position = coordinate;
}

/*
 *   Prints the properties of the game object on the console.
 */
GameObject.prototype.toString = function () {
    var result = "Current position = " + this.position.toString();
    return result;
}