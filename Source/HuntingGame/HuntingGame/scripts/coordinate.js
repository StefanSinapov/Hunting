/*
*   Coordinate object. Holds x and y coordinates.
 */
function Coordinate(x, y) {
    this.x = x;
    this.y = y;
}

/*
*   Checks if a coordinate is equal to other coordinate.
 */
Coordinate.prototype.equals = function (other) {
    var result = false;

    if (other.x === this.x && other.y === this.y) {
        result = true;
    }

    return result;
};

/*
*   Prints the coordinate on the console.
 */
Coordinate.prototype.toString = function () {
    var result = "X: " + this.x + " Y: " + this.y;
    return result;
}